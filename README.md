# Duet — a private messenger for two

A privacy-first, end-to-end encrypted messaging app for exactly two people.
No registration, no contacts, no groups — one conversation, encrypted in the
browser, wiped clean every midnight.

**Privacy first. Simplicity second. Reliability third.**

## Tech stack

- **Next.js 16** (App Router) · React 19 · TypeScript (strict)
- **Tailwind CSS v4** + **shadcn/ui**
- **TanStack Query**, **React Hook Form**, **Zod**
- **Supabase**: Auth, Postgres, Realtime, Row Level Security, pg_cron
- **Web Crypto API** for end-to-end encryption
- Installable **PWA** with offline shell

## How the end-to-end encryption works

1. On first sign-in, each browser generates an **ECDH P-256 key pair** with the
   Web Crypto API.
2. The **private key never leaves the device** (stored in `localStorage`,
   never sent anywhere).
3. The **public key** is published to the user's `profiles` row.
4. Both devices independently derive the **same AES-GCM 256 key** via ECDH
   (`my private key × their public key`). The server only ever sees two public
   keys and ciphertext — it mathematically cannot derive the shared secret.
5. Every message is encrypted locally with AES-GCM (fresh random IV per
   message) before insert. Supabase stores **only ciphertext**.

Consequences to be aware of:

- Clearing a browser's site data deletes that device's private key. The app
  transparently generates a new pair and republishes the public key; messages
  sent *before* the rotation can no longer be decrypted on either side. Since
  everything is erased at midnight anyway, this is at most a one-day loss.
- One device per user at a time (multi-device key sync is a future feature —
  the key exchange is per-profile, so the schema already accommodates it).

## Setup

### 1. Create a Supabase project

Create a project at [supabase.com](https://supabase.com), then copy the
project URL and anon key into your env file:

```bash
cp .env.example .env.local
# fill in NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
```

### 2. Run the migrations

In the Supabase dashboard → **SQL Editor**, run these files in order:

1. `supabase/migrations/0001_schema.sql` — tables, RLS, rate limiting,
   realtime, the `get_or_create_direct_conversation` RPC
2. `supabase/migrations/0002_midnight_reset.sql` — pg_cron job that deletes
   every message at **midnight Australia/Sydney time** (edit the timezone in
   the function if needed; the job runs hourly and fires only at local
   midnight, so daylight saving is handled correctly)

(Or use the Supabase CLI: `supabase db push`.)

### 3. Create the two accounts (there is no signup page — by design)

Dashboard → **Authentication → Users → Add user**, twice — one account for
each of you. Tick *auto-confirm email*. A `profiles` row is created
automatically by trigger; the display name defaults to the part of the email
before the `@`. To set nicer names:

```sql
update public.profiles set display_name = 'Alex' where id = 'FIRST-USER-UUID';
update public.profiles set display_name = 'Sam'  where id = 'SECOND-USER-UUID';
```

### 4. Configure auth settings

- **Authentication → Sign In / Up**: disable **"Allow new users to sign up"**
  so nobody can self-register even via the API.
- **Authentication → URL Configuration**: set the Site URL to your deployed
  domain so password-reset emails link back correctly.

### 5. Run it

```bash
npm install
npm run dev
```

Sign in on each of your devices. The first sign-in publishes each device's
encryption key; once both keys exist the conversation unlocks automatically.

## Features

- 🔐 End-to-end encryption (zero-knowledge: Supabase sees only ciphertext)
- ⚡ Realtime messaging over Supabase Realtime
- 🟢 Online status, last seen, and typing indicators (Realtime presence)
- ✓✓ Sent / delivered / seen ticks
- 🚨 **Urgent messages** — distinct style, stronger notification, pinned in a
  banner until explicitly acknowledged
- 🌙 **Midnight reset** — a server-side pg_cron job deletes every message at
  local midnight; no backups, no archives
- 🔔 Browser/desktop notifications, unread badge (tab title + PWA app badge),
  optional notification sounds (toggle in the header menu)
- 📱 Installable PWA with offline fallback page
- 🌗 Dark and light mode

## Security posture

- **RLS everywhere** — every table denies access by default; only
  conversation participants can read/write their conversation.
- Recipients can update *only* the status columns (`delivered_at`, `seen_at`,
  `urgent_acknowledged_at`) via Postgres column-level grants — never message
  content. Clients cannot delete anything; only the cron job can.
- Server-side **rate limiting** (max 30 messages / 10 s per sender) via
  trigger, plus client-side validation with Zod.
- Strict **Content-Security-Policy**, HSTS, `X-Frame-Options: DENY`,
  nosniff, referrer and permissions policies (see `next.config.ts`).
- Sessions are cookie-based (`@supabase/ssr`); the middleware revalidates the
  JWT on every request and guards all routes.
- React escapes all rendered message content (XSS-safe); no HTML is ever
  rendered from message bodies.

## Project structure

```
src/
  app/                    # Next.js routes (login, chat, password reset)
  components/
    ui/                   # shadcn/ui primitives
  features/
    auth/                 # login / reset forms + schemas
    chat/                 # chat screen, hooks (session, messages, presence)
    notifications/        # notification + sound + badge logic
  lib/
    crypto/               # ECDH key management, AES-GCM encrypt/decrypt
    supabase/             # browser/server/middleware clients
  types/                  # database row types
supabase/
  migrations/             # schema, RLS, cron job
```

## Designed to grow

The two-user constraint lives in exactly one place (the chat session hook
picks "the other profile" as the peer). Everything underneath is a normal
messaging data model:

- `conversations` + `conversation_participants` + `messages` — ready for
  unlimited users, multiple conversations, and group chats
- `get_or_create_direct_conversation(other_user_id)` works for any pair
- Per-conversation encryption keys derive from participant key pairs — the
  same ECDH scheme extends to per-conversation keys and multi-device sync
- Feature-based folders keep new features (reactions, editing, calls,
  shared lists) isolated

## Future work

- **Web push while the app is closed** requires a push service round-trip
  (VAPID keys + a Supabase Edge Function). The service worker already handles
  `notificationclick`; wiring up a push subscription is the natural next step.
- Multi-device support needs key sync between a user's devices (e.g. QR-code
  key transfer), which the per-profile public key model supports.
