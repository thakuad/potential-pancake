-- ============================================================
-- Midnight reset: every day at 12:00 AM (local time), delete
-- every message. Server-side, automatic, no backups.
--
-- pg_cron runs in UTC and cannot express daylight-saving local
-- time directly, so the job runs at the top of EVERY hour and a
-- wrapper function deletes only when it is midnight in the
-- configured timezone. This stays correct across DST changes.
-- ============================================================

create extension if not exists pg_cron;

-- Change this timezone if you move; see README.
create or replace function public.purge_messages_at_local_midnight()
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  local_hour int;
begin
  local_hour := extract(hour from (now() at time zone 'Australia/Sydney'));
  if local_hour = 0 then
    delete from public.messages;
  end if;
end;
$$;

-- Run at minute 0 of every hour; the function decides whether it is
-- local midnight. (Re-running this migration re-schedules cleanly.)
select cron.unschedule(jobid)
from cron.job
where jobname = 'midnight-message-reset';

select cron.schedule(
  'midnight-message-reset',
  '0 * * * *',
  $$select public.purge_messages_at_local_midnight()$$
);
