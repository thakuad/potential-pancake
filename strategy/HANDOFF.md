# 🧭 START HERE — Session Handoff: Swych SEO/Content Build

**Read this first.** It carries the full context from the strategy/research
session into a new session that will edit the **real swych.com.au codebase**
(a separate Next.js repo). Everything referenced lives in this `strategy/`
folder — copy the whole folder into the real project (see "Carrying files across"
at the bottom).

---

## What this is
Growth strategy + SEO/content plan for **Swych** (swych.com.au), a Canberra
mortgage broker (sole broker: Thakur Adhikari). Goal: rank and win in an
underserved market without fighting review-moat incumbents head-on.

## The strategy in 3 lines
1. **Geo:** own the Canberra commuter growth belt (Yass Valley, Googong,
   Bungendore, Queanbeyan) as a *mobile* residential specialist.
2. **Niche:** lead with **Defence/DHOAS → APS → new builds → medical**;
   full-service fallback (commercial, SMSF, asset/car) so no lead leaks.
3. **Authority:** service-area Google Business Profile + a review engine +
   long-tail town×niche pages + a `/guides` blog. Rank for what incumbents ignore.

## The document set (in this folder)
| File | Purpose |
|---|---|
| `HANDOFF.md` | This file — read first |
| `report.html` | Visual strategy report (also published as an Artifact) |
| `README.md` | Full written strategy (competitors, gap, niches) |
| `seo-page-plan.md` | Page-by-page SEO blueprint (build spec per page) |
| `site-audit-actions.md` | **Live-site audit — the fix-first bug list + build/rewrite/leave** |
| `90-day-plan.md` | Sequenced action checklist |
| `blog-content-calendar.md` | Deep keyword plan for the first 12 posts + promotion |
| `100-post-ideas.md` | 100 rankable post ideas, tagged & prioritised |

---

## Current live-site state (crawled July 2026)
- **Stack:** Next.js (App Router assumed), server-rendered, clean meta/canonical/
  OG on every page, `index,follow`, healthy sitemap, smart robots.txt (AI crawlers
  allow-listed). **Technically solid — this is targeted additions, not a rebuild.**
- **27 pages exist**, including services (first-home, construction, refinance,
  investment, medical/doctor, nurse/allied-health, professional-essential=APS,
  specialist, SMSF, commercial-asset-finance, bridging) and locations (canberra,
  gungahlin, belconnen, tuggeranong, inner-south, queanbeyan, googong, yass).
- **No blog/guides section exists. No reviews/testimonials/GBP on the site.**

---

## THE WORK — do in this order (for the real repo)

### 1. 🔴 Urgent bug fixes (do first — real SEO bugs)
- **Commercial canonical → 404:** `/services/commercial-asset-finance` sets its
  `rel=canonical` to `/services/commercial-loans`, which 404s and isn't in the
  sitemap. Fix the canonical to the page's own URL (or create `/commercial-loans`
  and 301). Also repoint the `/services` hub "Explore Commercial Finance" CTA
  (currently → the 404).
- **Terms slug mismatch:** sitemap lists `/terms-of-service`; live page is
  `/term-of-service`. Pick one slug, 301 the other, fix sitemap + footer link.
- **Footer:** remove the stray empty bullet in "Locations We Serve".

### 2. 🟠 Build missing pages
- **Defence/DHOAS service page** → `/services/defence-dhoas-home-loans` (flagship;
  spec in `seo-page-plan.md` §1). Add "Defence/ADF (DHOAS)" mention to the APS page
  and Queanbeyan page in the meantime.
- **Location pages:** `/locations/murrumbateman`, `/locations/bungendore`,
  `/locations/sutton` (+ optionally rural/agri service page).

### 3. 🟡 Structure & nav
- Add **APS** (`professional-essential-loans`) and **Defence/DHOAS** to the top
  nav; surface **Commercial** too (currently only in the /services hub).
- De-cannibalise: homepage vs `/locations/canberra` both title-target "Mortgage
  Broker Canberra" — retitle the location page toward local/"mobile, after-hours".
- Make `/services/specialist-lending` a lean hub (don't duplicate the medical/
  nurse child keywords).

### 4. 🟢 Positioning, authority, schema
- Put the **"mobile — we come to you, evenings & weekends"** wedge on the homepage
  and every location page.
- Add **reviews/testimonials + a GBP link/embed**; add `AggregateRating` when live.
- Verify/add schema: `MortgageBroker`/`LocalBusiness` with `areaServed` (all
  towns), `FAQPage` on Q&A blocks.

### 5. 📝 Build the blog (`/guides`) + write posts
- Scaffold per the architecture we discussed: `app/guides/` routes (`page.tsx`,
  `[slug]/page.tsx`, `topic/[topic]/page.tsx`), MDX + frontmatter in `content/
  guides/`, `lib/guides.ts`, and components: `ArticleSchema` (Article + FAQPage +
  BreadcrumbList), `AuthorBio` (E-E-A-T: Thakur + credit-rep/licence no. + MFAA/
  FBAA), `RelatedLinks`, and a reusable **general-advice disclaimer**. Wire guides
  into `sitemap.ts`.
- **Write the priority 15 posts** from `100-post-ideas.md`, pillar-first. Publish
  the two 🕒 timely ones immediately: **#1 ACT stamp duty abolished (1 Jul 2026)**
  and **#2 First Home Guarantee 2026**. Deep keyword/promotion detail for the
  first 12 is in `blog-content-calendar.md`.

---

## Key facts to reuse (verify currency at publish)
- **ACT abolished stamp duty for ALL first home buyers from 1 Jul 2026** — no price
  cap, no income test (ACT Budget 26-27 / ACT Revenue Office).
- **First Home Guarantee** expanded Oct 2025: no income caps, no place caps, NSW
  price cap $1.5M, 5% deposit, govt covers LMI.
- **DHOAS 2025-26 tiers:** T1 ≤ $413,690 → up to $490/mo; T2 ≤ $620,535 → $736;
  T3 ≤ $827,380 → $981. Min 2 yrs permanent (or 4 yrs reserve) service; live-in
  12 months. 3 DHOAS lenders: Australian Military Bank, Defence Bank, NAB.
- **LMI waivers:** doctors up to 95% LVR no-LMI; nurses/midwives up to 90% (new
  in 2026); saves ~$15k–$45k. AHPRA registration required.

## Constraints & caveats
- Zero exact search volumes — validate in Google Keyword Planner (AU) /
  Search Console before betting on a keyword. Numbers in the docs are directional.
- All finance content is **YMYL** — needs author E-E-A-T, dated/updated stamps,
  and an Australian general-advice disclaimer on every post.
- This session ran behind a locked-down proxy (couldn't reach live sites); the
  live-site facts came from a crawl the user pasted in.

---

## Carrying files across to the real repo
These docs are committed to `potential-pancake`, branch
`claude/mortgage-broker-strategy-d4w1et`, under `strategy/`. To use them in the
real swych.com.au project, either:
- **Copy the `strategy/` folder** into the real repo (e.g. as `docs/seo/`), commit
  it there, and point the new session at `docs/seo/HANDOFF.md`; **or**
- Open the new session on the real repo and **paste the kickoff prompt** (the user
  has it) which summarises this handoff, then paste any specific doc as needed.

## Kickoff prompt for the next session
> "We're implementing an SEO/content plan for swych.com.au (this repo). Read
> `docs/seo/HANDOFF.md` (I've copied the strategy folder in) for full context and
> the ordered task list. Start with the 🔴 urgent bug fixes (commercial
> canonical→404, terms slug mismatch, footer bullet), confirm the fixes, then
> build the Defence/DHOAS service page. Ask me before large refactors."
