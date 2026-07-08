# Duet — agent notes

Private, end-to-end encrypted messenger for exactly two users, built with
Next.js 16 (App Router), Tailwind v4, shadcn/ui, TanStack Query, and Supabase
(Auth, Postgres, Realtime, RLS, pg_cron). See README.md for full setup.

## Commands

- `npm run dev` — dev server
- `npm run build` — production build (needs `.env.local`, see `.env.example`)
- `npm run lint` — ESLint

## Architecture rules

- **Zero-knowledge encryption is non-negotiable.** Messages are encrypted in
  the browser (`src/lib/crypto/`) before insert; Supabase stores ciphertext
  only. Never log, store, or transmit plaintext or private keys.
- Private ECDH keys live in `localStorage` only; public keys are published to
  `profiles.public_key`. The shared AES-GCM key is derived per device pair.
- All data access goes through Supabase with RLS (`supabase/migrations/`).
  No custom backend. Schema is conversation-based — don't hard-code the
  two-user assumption outside `use-chat-session.ts`.
- Feature-based structure: `src/features/{auth,chat,notifications}`, shared
  primitives in `src/components/ui` (shadcn — the registry CLI may be
  network-blocked; add components by hand in the same style).
- Route protection happens in `src/proxy.ts` (Next 16 proxy convention) via
  `src/lib/supabase/middleware.ts`.
