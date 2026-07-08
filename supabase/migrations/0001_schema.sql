-- ============================================================
-- Privacy-first messenger: core schema
--
-- Although the initial release has exactly two users and one
-- conversation, the schema is conversation-based so unlimited
-- users / conversations / groups can be added later without a
-- rewrite.
--
-- Messages are stored as ciphertext ONLY. Encryption keys are
-- never stored here; the server cannot read any message.
-- ============================================================

-- ------------------------------------------------------------
-- profiles: one row per auth user, auto-created by trigger.
-- ------------------------------------------------------------
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  display_name text not null default '',
  -- ECDH P-256 public key (JWK JSON). Public by design; useless without
  -- the private key, which never leaves the owner's browser.
  public_key text,
  last_seen_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Auto-create a profile whenever an auth user is created (users are
-- created manually in the Supabase dashboard — there is no signup API).
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data ->> 'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- Backfill profiles for users created before this migration ran.
insert into public.profiles (id, display_name)
select id, coalesce(raw_user_meta_data ->> 'display_name', split_part(email, '@', 1))
from auth.users
on conflict (id) do nothing;

-- Keep updated_at fresh.
create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_touch_updated_at
  before update on public.profiles
  for each row execute function public.touch_updated_at();

-- ------------------------------------------------------------
-- conversations + participants
-- ------------------------------------------------------------
create table public.conversations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now()
);

create table public.conversation_participants (
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  user_id uuid not null references public.profiles (id) on delete cascade,
  joined_at timestamptz not null default now(),
  primary key (conversation_id, user_id)
);

alter table public.conversations enable row level security;
alter table public.conversation_participants enable row level security;

-- SECURITY DEFINER helper so RLS policies can check membership without
-- recursing into conversation_participants' own policies.
create or replace function public.is_conversation_participant(p_conversation_id uuid, p_user_id uuid)
returns boolean
language sql
security definer
set search_path = public
stable
as $$
  select exists (
    select 1
    from public.conversation_participants
    where conversation_id = p_conversation_id
      and user_id = p_user_id
  );
$$;

-- ------------------------------------------------------------
-- messages: ciphertext only, plus delivery/read/urgent metadata.
-- ------------------------------------------------------------
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  conversation_id uuid not null references public.conversations (id) on delete cascade,
  sender_id uuid not null references public.profiles (id) on delete cascade,
  -- base64(iv || AES-GCM ciphertext), encrypted in the sender's browser.
  encrypted_message text not null,
  is_urgent boolean not null default false,
  delivered_at timestamptz,
  seen_at timestamptz,
  urgent_acknowledged_at timestamptz,
  created_at timestamptz not null default now(),
  -- Ciphertext of a short text message should never be huge; this also
  -- caps abuse if a client misbehaves.
  constraint encrypted_message_size check (char_length(encrypted_message) <= 16384)
);

create index messages_conversation_created_idx
  on public.messages (conversation_id, created_at);

alter table public.messages enable row level security;

-- ------------------------------------------------------------
-- Lightweight server-side rate limit: max 30 messages per 10 s
-- per sender. Defence in depth on top of client behaviour.
-- ------------------------------------------------------------
create or replace function public.enforce_message_rate_limit()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  recent_count int;
begin
  select count(*) into recent_count
  from public.messages
  where sender_id = new.sender_id
    and created_at > now() - interval '10 seconds';

  if recent_count >= 30 then
    raise exception 'rate limit exceeded: too many messages, slow down';
  end if;

  return new;
end;
$$;

create trigger messages_rate_limit
  before insert on public.messages
  for each row execute function public.enforce_message_rate_limit();

-- ------------------------------------------------------------
-- Row Level Security policies
-- ------------------------------------------------------------

-- profiles: any authenticated user may read profiles (needed to find the
-- peer and their public key); users may update only their own row.
create policy "profiles are readable by authenticated users"
  on public.profiles for select
  to authenticated
  using (true);

create policy "users can update their own profile"
  on public.profiles for update
  to authenticated
  using (id = (select auth.uid()))
  with check (id = (select auth.uid()));

-- conversations: visible only to participants. Creation happens through
-- the get_or_create_direct_conversation() RPC (security definer), so no
-- direct insert policy is required.
create policy "participants can view their conversations"
  on public.conversations for select
  to authenticated
  using (public.is_conversation_participant(id, (select auth.uid())));

create policy "participants can view membership of their conversations"
  on public.conversation_participants for select
  to authenticated
  using (public.is_conversation_participant(conversation_id, (select auth.uid())));

-- messages: participants can read; senders can insert into their own
-- conversations; ONLY the recipient may update, and column-level grants
-- below restrict updates to the status columns.
create policy "participants can read messages"
  on public.messages for select
  to authenticated
  using (public.is_conversation_participant(conversation_id, (select auth.uid())));

create policy "participants can send messages as themselves"
  on public.messages for insert
  to authenticated
  with check (
    sender_id = (select auth.uid())
    and public.is_conversation_participant(conversation_id, (select auth.uid()))
  );

create policy "recipients can update message status"
  on public.messages for update
  to authenticated
  using (
    sender_id <> (select auth.uid())
    and public.is_conversation_participant(conversation_id, (select auth.uid()))
  )
  with check (
    sender_id <> (select auth.uid())
    and public.is_conversation_participant(conversation_id, (select auth.uid()))
  );

-- Column-level privileges: recipients may only touch status columns —
-- never the ciphertext, sender, or timestamps.
revoke update on public.messages from authenticated;
grant update (delivered_at, seen_at, urgent_acknowledged_at)
  on public.messages to authenticated;

-- Nothing is ever deleted by clients; the midnight job (superuser-owned)
-- handles deletion. No delete policy = deletes denied.

-- ------------------------------------------------------------
-- RPC: find or create the direct conversation between the caller
-- and another user. Idempotent and safe under concurrency thanks
-- to the advisory lock. Works unchanged when more users exist.
-- ------------------------------------------------------------
create or replace function public.get_or_create_direct_conversation(other_user_id uuid)
returns uuid
language plpgsql
security definer
set search_path = public
as $$
declare
  me uuid := auth.uid();
  convo_id uuid;
begin
  if me is null then
    raise exception 'not authenticated';
  end if;

  if other_user_id is null or other_user_id = me then
    raise exception 'invalid peer';
  end if;

  if not exists (select 1 from public.profiles where id = other_user_id) then
    raise exception 'peer profile not found';
  end if;

  -- Serialise concurrent calls for the same pair.
  perform pg_advisory_xact_lock(
    hashtext(least(me::text, other_user_id::text) || greatest(me::text, other_user_id::text))
  );

  -- A direct conversation = exactly these two participants.
  select cp.conversation_id into convo_id
  from public.conversation_participants cp
  where cp.user_id in (me, other_user_id)
  group by cp.conversation_id
  having count(distinct cp.user_id) = 2
     and count(*) = (
       select count(*)
       from public.conversation_participants all_cp
       where all_cp.conversation_id = cp.conversation_id
     )
  limit 1;

  if convo_id is null then
    insert into public.conversations default values returning id into convo_id;
    insert into public.conversation_participants (conversation_id, user_id)
    values (convo_id, me), (convo_id, other_user_id);
  end if;

  return convo_id;
end;
$$;

-- ------------------------------------------------------------
-- Realtime: broadcast message changes (INSERT + status UPDATEs).
-- RLS is enforced on realtime reads, so only participants receive them.
-- ------------------------------------------------------------
alter publication supabase_realtime add table public.messages;
-- Profiles too: live peer updates for public_key rotation and last_seen.
alter publication supabase_realtime add table public.profiles;
