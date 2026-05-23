# Baseline Analytics Stakeholder Portal — V4 Rebuild

**Last updated:** May 22, 2026
**Status:** Phase 1 foundation — scaffold ready, components pending

---

## Where you left off

You spun up the dev Supabase. The Phase 1 scaffold is ready (this folder). Tomorrow's pickup:

1. Push this to a new private GitHub repo
2. Run `npm install`
3. Add Supabase URL + anon key to `.env.local`
4. Run the schema SQL in Supabase Dashboard → SQL Editor
5. Run `npm run dev` — should boot at localhost:3000
6. Continue with Phase 2 (page scaffolds with V4 components)

---

## Setup steps

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Fill in your dev Supabase credentials (Project Settings → API in the Supabase dashboard).

### 3. Run the schema

Open Supabase Dashboard → SQL Editor → New query. Paste the contents of `supabase/migrations/001_initial_schema.sql` and run. Creates all tables, RLS policies, and the documents storage bucket.

### 4. Create your admin user

In Supabase Dashboard → Authentication → Users → Add user. Enter your email and a temporary password. After the user is created, in SQL Editor run:

```sql
UPDATE public.profiles
SET role = 'admin'
WHERE email = 'your-email@example.com';
```

### 5. Run the dev server

```bash
npm run dev
```

Visit http://localhost:3000 → should redirect to /login.

---

## What's in this scaffold

```
baseline-portal/
├── src/
│   ├── app/
│   │   ├── layout.tsx              ← Root layout, fonts, metadata
│   │   ├── page.tsx                ← Redirect logic
│   │   └── globals.css             ← V4 design tokens
│   ├── lib/
│   │   ├── supabase/
│   │   │   ├── client.ts           ← Browser Supabase client
│   │   │   ├── server.ts           ← Server + admin clients
│   │   │   └── middleware.ts       ← Auth + role check logic
│   │   └── types.ts                ← TypeScript types matching schema
│   └── components/                  ← (empty — Phase 2)
├── supabase/
│   └── migrations/
│       └── 001_initial_schema.sql  ← Full schema with RLS
├── middleware.ts                    ← Next.js middleware (auth gate)
├── next.config.ts                   ← Security headers (CSP, HSTS, etc)
├── package.json
├── tsconfig.json                    ← Strict mode on
└── .env.example
```

---

## Security baked in

- CSP, HSTS, X-Frame-Options, X-Content-Type-Options headers
- Strict TypeScript
- RLS on every table
- Service role key server-only
- Robots disabled (no SEO indexing)
- Skip-to-content link for accessibility
- prefers-reduced-motion respected

---

## Phase 2 — Next session

What we'll build next:

```
- /login (V4 styled)
- /forgot-password, /reset-password
- /overview (V4 hero + stat row)
- /meetings (V4 timeline + rolling summary block)
- /deal-intel (V4 comparison matrix)
- /team (executive)
- /advisory-board (initials only, no logos)
- /milestones (progress ladder)
- /vault (documents)
- /ask (Ask the Portal)
- /admin (CMS for all content)
```

---

## Deferred / for later

- Real V4 motion (Framer Motion is installed, components needed)
- Mobile responsive pass
- Sentry / error tracking integration
- Rate limiting on login + Ask the Portal
- Seed data SQL file
- Migration to Chase's production Supabase + Vercel
