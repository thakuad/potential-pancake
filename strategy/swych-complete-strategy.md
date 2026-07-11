# Swych — Complete Growth & SEO/Content Strategy (All-in-One)

> Single-file copy of the full strategy. Companion visual report is `report.html`
> (also published as an Artifact). Prepared July 2026 for swych.com.au.
> Sections below are the individual working docs, concatenated.

## Contents
1. Handoff / Start Here (quickstart + ordered task list)
2. Strategy (competitors, geographic gap, niches)
3. Live-Site Audit & Reconciled Actions (fix-first bugs)
4. SEO Page-by-Page Plan
5. 90-Day Action Checklist
6. Blog Content Calendar & Keyword Plan (first 12 posts, deep)
7. 100 Rankable Blog Post Ideas

---



<!-- ================================================================ -->
# ══ SECTION 1) HANDOFF / START HERE ══
<!-- ================================================================ -->

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


---


<!-- ================================================================ -->
# ══ SECTION 2) STRATEGY ══
<!-- ================================================================ -->

# Swych — Mortgage Broker Growth Strategy

**Prepared:** July 2026 · **For:** swych.com.au · **Base:** Canberra, ACT
**Objective:** Find an underserved geography × niche, plant a *mobile broker*
flag, and build a moat to outrank incumbents — without a multi-year fight for
the saturated "mortgage broker Canberra" head term.

---

## 1. Executive summary — the one-sentence thesis

> **The Canberra commuter growth belt (Yass Valley, Bungendore, Googong,
> Queanbeyan) is booming with public-service, Defence and medical earners
> buying and building — yet it is served almost entirely by rural/agri finance
> brokers and satellite Canberra offices. A residential, niche-specialist,
> genuinely *mobile* broker owns that gap that nobody is fighting for.**

Three moves win it:

1. **Geo wedge** — stop competing in metro Canberra's head term; own the ring of
   high-growth NSW commuter towns as a *residential* specialist.
2. **Niche architecture** — lead with **Defence/DHOAS → APS → new builds →
   medical**; keep a full-service fallback (commercial, agri, asset/car) so no
   enquiry is turned away.
3. **Authority engine** — Google Business Profile + a systematic review engine +
   long-tail location×niche landing pages + builder/display-village partnerships.
   You rank for terms the incumbents don't target, so their review moat doesn't
   matter.

**Top 3 things to do first:** (1) build the **DHOAS** page + Google Business
Profile as a *service-area* (mobile) business; (2) publish **Googong,
Murrumbateman, Bungendore** location pages; (3) turn on a **review-generation
system** from day one.

---

## 2. The competitive landscape — a review-moat fortress

Canberra's generic "mortgage broker" term is dominated by review-rich incumbents.
Attacking it head-on is low-ROI.

| Broker | Scale / moat | Model | What they DON'T own |
|---|---|---|---|
| **Clarity Home Loans** | **1,300+ 5★ Google reviews**, 19,000+ clients, 50+ lenders, 5× AFG Regional Brokerage of the Year | Salaried, no-commission, office-based (Canberra City) | Growth-town residential SEO; DHOAS-specialist positioning; "mobile/we-come-to-you" |
| **Fairbanks Financial** | 90+ lenders, award-winning, targets APS/public service | Office-based | Owns no town-level SEO; APS niche not locked down |
| **Zanda Wealth** | Est. 2006, many 5★, WOM Service Award | Office-based | Commuter belt, niche pages |
| **Loan Market Canberra** | 60+ lenders, AMA finalist | Franchise, office | Town-level & niche long-tail |
| **Trilogy / Electrum** | Investor & complex-loan reputations | Office | Residential first-home / new-build in growth towns |
| **Agri brokers** (Regional & Rural Finance, Aglend, Rivendell) | 20+ yrs, own the *town* keywords | Rural/agribusiness focus | **Residential, first-home, commuter, new-build buyers** |

**Takeaway:** the incumbents optimise for the ACT metro head term; the agri
brokers own the town names but serve farms, not families. **The residential ×
growth-town intersection is empty.**

---

## 3. The geographic gap — where demand outruns the right brokers

The NSW towns ringing Canberra are exploding with **Canberra-income earners**
(APS, Defence, medical) buying and building — and they're under-served by
*residential* brokers.

| Town | Trajectory | Current broker coverage | Opportunity |
|---|---|---|---|
| **Googong** | Master-planned estate, thousands of new dwellings | Canberra satellite offices; no local residential specialist | ★★★★★ (new builds + FHB) |
| **Murrumbateman** | 3,607 → planned **10,000** | Agri brokers; wineries region | ★★★★★ |
| **Bungendore** | ~5,000 → planned **12,000** | Agri + Canberra satellites | ★★★★★ |
| **Yass / Yass Valley** | **+~10,000 by 2036**, 4,858 new dwellings | Agri brokers (Regional & Rural, Rivendell) | ★★★★☆ |
| **Queanbeyan** | Established, high volume, ACT-NSW border | Some brokers (Casa, Aussie, Nexa) | ★★★★☆ (Defence + volume) |
| **Sutton / Gundaroo** | Semi-rural commuter, growing | Thin | ★★★☆☆ |
| **Snowy / Monaro** (Jindabyne, Cooma) | Tree-change, holiday/investment | **Already 2-3 active locals** (Thunderbolt, Monaro, Greenline) | ★★☆☆☆ (defended) |
| **Albury / Wodonga** | Established regional city | **Saturated** (MRM, Swift, Humble, Unconditional +) & 3.5 hrs away | ★☆☆☆☆ (deprioritise) |

**Why "mobile" wins here specifically:** these buyers are time-poor professionals
building on the edge of town. A broker who **comes to the kitchen table evenings
& weekends, and sits at the display-village on Saturdays**, is a service wedge no
office-bound Canberra firm can copy without changing its model. That wedge is
*wasted* on far-away, saturated Albury — it's decisive in the commuter belt.

---

## 4. The niche architecture — hero niches pull, full-service catches

Lead with four hero niches (easy to rank, high referral value); keep everything
else as a full-service safety net so no lead leaks.

| Niche | Demand driver | Local competition | Swych's angle |
|---|---|---|---|
| **① Defence / DHOAS** *(flagship)* | Russell, Duntroon, ADFA, HMAS Harman, Queanbeyan ADF | **None locally** — only national/veteran-owned specialists | Own "DHOAS broker Canberra/Queanbeyan"; explain the subsidy + posting paperwork |
| **② APS / public service** | Canberra's core workforce; job-security lending perks (85% LVR no-LMI for some) | Fairbanks competes; nobody *owns* it | Sharpen existing signal; content on allowances, contract/EL income |
| **③ New builds / house & land** | Growth estates (Googong, Murrumbateman, Bungendore) | Agri brokers ignore it | Construction-loan expertise + display-village presence |
| **④ Medical / healthcare** | LMI waivers up to 95% LVR no-LMI | National only (Medimortgage, MediPro) — not Canberra-local | Local + digital; complex healthcare income |
| **Full-service fallback** | Commercial, agri/rural, SMSF, asset & car finance, personal | — | "Whatever the loan, one broker who comes to you" |

**Why DHOAS is the flagship:** highest complexity (subsidy tiers, posting
churn, service-history paperwork) = highest broker value, and it is the single
niche with **no dominant local player**. It's the sharpest wedge you have.

---

## 5. How to out-rank the incumbents (without matching 1,300 reviews)

You will **not** beat Clarity on reviews soon — so don't compete where reviews
decide the winner. Compete where they aren't playing.

1. **Long-tail location × niche pages** — `DHOAS mortgage broker Queanbeyan`,
   `construction loan Googong`, `first home buyer Murrumbateman`. Low
   competition, high buyer intent. (Full blueprint: `seo-page-plan.md`.)
2. **Google Business Profile as a *service-area* business** — list the towns you
   travel to, not a single office pin. This is how mobile brokers rank in the map
   pack for multiple towns.
3. **A review engine from day one** — automated post-settlement review request
   (SMS + email), respond to every review. Reviews are your weakest metric vs
   incumbents; close the gap deliberately.
4. **Local authority & PR** — get listed in *Region Canberra* / *Canberra Times*
   "best broker" round-ups; guest content on ACT-vs-NSW stamp duty & FHB schemes
   (a stated Swych strength).
5. **Referral partnerships in the growth towns** — builders & display villages,
   buyers' agents, conveyancers, real estate agents in Googong / Yass Valley /
   Bungendore. These drive both leads *and* local backlinks.

---

## 6. Prioritised roadmap (summary)

| Phase | Focus | Headline actions |
|---|---|---|
| **Days 0–30** | Foundation | GBP (service-area), review engine live, DHOAS page + Googong/Murrumbateman/Bungendore pages, homepage repositioning |
| **Days 31–60** | Expand | Remaining location + niche pages, ACT-vs-NSW & DHOAS explainer content, builder/display-village outreach |
| **Days 61–90** | Authority | Local PR & backlinks, referral partnerships, review milestone, measure rankings |

Full detail: **`90-day-plan.md`**.

---

## 7. What I couldn't verify (be aware)

- **The live swych.com.au was not analysed — a research-environment limit, not a
  site problem.** The HTTP 403 seen while researching came from *this analysis
  session's own network egress policy* (it blocks outbound connections to all
  external hosts equally — verified against example.com, google.com and
  competitor sites, which fail identically), **not** from anything on
  swych.com.au. No evidence of any crawlability issue with the site exists; assume
  it is fine until Google Search Console says otherwise. The SEO plan is therefore
  built to an ideal structure — share your current nav/sitemap (or paste the page
  HTML) and it'll be mapped to your real URLs, flagging overlaps/cannibalisation.
- **Search-volume figures are directional** (the research tool is US-scoped).
  Opportunities are ranked by *competition + buyer intent*, not exact volumes —
  validate with Google Keyword Planner / a Search Console pull before committing
  budget.
- **Population/growth figures** are from NSW planning strategies and council
  forecasts (Yass Valley Settlement Strategy 2036, Canberra Times, id.com.au) —
  directional planning numbers, not guarantees.

---

*Companion documents: `seo-page-plan.md` (page-by-page blueprint) ·
`90-day-plan.md` (sequenced action checklist).*


---


<!-- ================================================================ -->
# ══ SECTION 3) LIVE-SITE AUDIT & ACTIONS ══
<!-- ================================================================ -->

# Swych — Live-Site Audit & Reconciled Actions

Based on a real crawl of swych.com.au (27 pages, July 2026). This reconciles the
strategy (`README.md`) and the ideal SEO blueprint (`seo-page-plan.md`) with what
actually exists on the live site. **Read this first** — it overrides the
"build everything" assumption in `seo-page-plan.md` where pages already exist.

**Overall verdict:** the site is technically solid — Next.js, server-rendered,
clean titles/meta/canonical/OG on every page, `index,follow`, and a deliberate
AI-crawler allow-list in robots.txt. This is a **targeted-additions** job, not a
rebuild. The gaps are specific and the wins are concrete.

---

## 🔴 URGENT — fix this week (real bugs, not strategy)

1. **Broken canonical → 404 on the commercial page.**
   `/services/commercial-asset-finance` (the live, working page) declares its
   `rel=canonical` as `/services/commercial-loans` — **which 404s.** A canonical
   pointing at a dead URL can cause Google to drop/deprioritise the working page.
   - **Fix:** set the canonical to the page's own URL
     (`/services/commercial-asset-finance`), OR create `/services/commercial-loans`
     as the real URL and 301 the other to it. Pick one canonical home and make
     every link agree.
2. **The `/services` hub CTA ("Explore Commercial Finance") links to the same
   404** (`/services/commercial-loans`). Repoint it to the live page.
3. **Empty/broken list item** in the footer "Locations We Serve" (a stray blank
   bullet between "Inner South Prestige" and "Queanbeyan"). Remove it.
4. **Terms-of-service URL mismatch.** The XML sitemap lists `/terms-of-service`
   (plural "terms"), but the live page is at `/term-of-service` (singular). The
   sitemap is feeding Google a URL that likely 404s. Pick one slug, make the page
   live there, 301 the other, and correct the sitemap + footer link to match.

These are quick, high-value hygiene fixes — do them before any content work.

---

## 🟠 The real content gaps (highest ROI)

### 1. Defence / DHOAS — MISSING entirely (your flagship)
Zero pages, zero mentions of Defence/ADF/DHOAS anywhere on the site. This is the
single biggest opportunity from the strategy — highest complexity, highest broker
value, no dominant local player, huge Canberra/Queanbeyan ADF base.
- **Build:** `/services/defence-dhoas-home-loans` (niche page) — see
  `seo-page-plan.md` §1 for the outline.
- Add "Defence Force / ADF (DHOAS)" explicitly to `/services/professional-essential-loans`
  and to the Queanbeyan location page in the interim.

### 2. Three growth-belt towns — MISSING location pages
You already have Queanbeyan, Googong, Yass ✅ (good — ahead of plan). Missing the
highest-growth commuter towns from the strategy:
- **Build:** `/locations/murrumbateman`, `/locations/bungendore`,
  `/locations/sutton` (or `/locations/sutton-gundaroo`).
- These are the doubling-population towns; own them before another broker does.

### 3. No guides/blog section at all — MISSING content moat
No blog, guides, or articles exist. Stamp-duty and LMI content lives *inline*
inside service pages but has no standalone, linkable, backlink-earning home.
- **Build a `/guides/` section** with the three link-magnets:
  `act-vs-nsw-stamp-duty-first-home-buyer`, `dhoas-explained`,
  `lmi-waivers-medical-aps`. (You already have the raw material inline — promote
  it to standalone guides and interlink.)

### 4. Rural / agri — MISSING (full-service coverage)
You wanted "any loan." No rural/agri/farm finance mention exists. Low priority vs
the above, but add a lean `/services/rural-agri-finance` page so those enquiries
convert (and it supports the acreage/lifestyle angle on the Yass Valley towns).

---

## 🟡 Cannibalisation & structure to fix

- **Homepage vs `/locations/canberra`** both target *"Mortgage Broker Canberra"*
  in the title — they compete for the same head term. Differentiate: let the
  **homepage own "mortgage broker Canberra"**; retitle the location page to a
  local-intent variant (e.g. *"Mortgage Broker in Canberra ACT — Local, Mobile &
  After-Hours"*) and lean it toward the service-area / "we come to you" angle.
- **`/services/specialist-lending`** (title: "Specialist Home Loans Canberra |
  Medical, Nurse & Professional") overlaps its own children
  (`doctor-medical-loans`, `nurse-allied-health-loans`,
  `professional-essential-loans`). Make it a true **hub**: short, links down to
  the children, targets the generic "specialist lending" term only — don't let it
  duplicate the medical/nurse keywords the child pages need to win.
- **Top nav hides two hero niches.** APS (`professional-essential-loans`) and
  Commercial aren't in the top nav — only reachable via the `/services` hub. Your
  **APS page is a hero niche and should be one click from the homepage.** Add APS
  (and Defence/DHOAS once built) to the nav; surface Commercial too.

---

## 🟢 Positioning & authority (the compounding work)

- **"Mobile / we come to you" is under-signalled.** The strategy's core wedge
  barely shows on the site. Put it in the homepage H1/subhead, the nav or header
  strap, and every location page ("I come to your kitchen table across Yass
  Valley, Googong & Queanbeyan — evenings & weekends").
- **No reviews, testimonials, or Google Business Profile anywhere on the site.**
  This confirms the #1 authority gap. Add: a review/testimonial section,
  `AggregateRating` once you have reviews, and a GBP link/embed. Pair with the
  day-one review engine in `90-day-plan.md`.
- **Verify structured data.** Couldn't confirm schema types from the crawl.
  Check (view-source / Rich Results Test) that every page has `MortgageBroker`/
  `LocalBusiness` with `areaServed` listing all towns, `FAQPage` on Q&A blocks,
  and add `Review`/`AggregateRating` when live. This is how a *service-area*
  business ranks across multiple town map-packs.

---

## Reconciled build/rewrite/leave list

| Plan item | Live status | Action |
|---|---|---|
| Defence / DHOAS | Missing | **BUILD** (flagship, first) |
| Murrumbateman / Bungendore / Sutton-Gundaroo | Missing | **BUILD** (growth belt) |
| `/guides/` stamp-duty · DHOAS · LMI | Missing (only inline) | **BUILD** section |
| Rural / agri | Missing | **BUILD** (lean, lower priority) |
| APS / professional-essential | Exists | **KEEP** + add to nav + name Defence |
| Medical / nurse / specialist | Exist | **KEEP**; de-dupe specialist hub |
| Construction / house & land | Exists | **KEEP**; link from growth-town pages |
| Queanbeyan / Googong / Yass | Exist | **KEEP**; add DHOAS + mobile angle |
| Canberra location page | Exists | **REWRITE** title (de-cannibalise vs home) |
| Commercial / asset-car / SMSF | Exist | **KEEP** + fix the canonical/404 bug |
| Homepage | Exists | **REWRITE** to lead with mobile + Defence |

---

## Revised "first 5 things"

1. **Fix the commercial canonical/404 bug** + the hub CTA + footer blank bullet.
2. **Build the Defence/DHOAS page** and add it (+ APS) to the top nav.
3. **Build Murrumbateman, Bungendore, Sutton** location pages.
4. **Add reviews/testimonials + GBP** to the site; switch on the review engine.
5. **Rewrite the homepage + `/locations/canberra`** to lead with "mobile, we come
   to you" and de-cannibalise the "Mortgage Broker Canberra" term.

> Source: live crawl of swych.com.au, July 2026 (link-crawl of 27 pages),
> reconciled against `sitemap-index.xml` → `sitemap-pages.xml`. The sitemap is
> healthy (28 URLs, valid lastmod/changefreq/priority, no orphans) and confirms
> the gaps above: no Defence/DHOAS, Murrumbateman, Bungendore, Sutton, guides, or
> rural-agri URLs exist. It also confirms `/services/commercial-loans` (the broken
> canonical target) is not a real page, and exposed the `/terms-of-service` vs
> `/term-of-service` slug mismatch. A `/locations` hub page also exists.


---


<!-- ================================================================ -->
# ══ SECTION 4) SEO PAGE-BY-PAGE PLAN ══
<!-- ================================================================ -->

# Swych — SEO Page-by-Page Plan

> **Reconciled with the live site → see `site-audit-actions.md` first.** A July
> 2026 crawl showed several of these pages already exist (Queanbeyan, Googong,
> Yass, Medical, APS, Construction, SMSF, Commercial). This blueprint remains the
> reference for *how* each page should be built; `site-audit-actions.md` says
> which to **build vs rewrite vs leave**, and flags urgent fixes (a broken
> commercial canonical→404, nav gaps, cannibalisation).

The blueprint for the long-tail moat. The strategy (`README.md`) says: don't
fight for "mortgage broker Canberra" — win **town × niche** intersections where
incumbents aren't playing. This file specifies every page to build, its target
keyword, intent, competition, and outline.

**How to read the competition rating:** ★ = wide open (agri brokers or nobody);
★★★ = a few local players; ★★★★★ = review-moat incumbents. **Prioritise the
low-competition, high-intent pages first.**

---

## Site architecture (recommended)

```
/                                   Home — repositioned (mobile + growth belt + niches)
/home-loans/                        Service hub
  /first-home-buyers/
  /refinancing/
  /construction-house-and-land/     ← ties to growth estates
  /investment/
/who-we-help/                       Niche hub
  /defence-dhoas/                   ★ FLAGSHIP
  /aps-public-service/
  /medical-healthcare/
/locations/                         Location hub
  /mortgage-broker-queanbeyan/
  /mortgage-broker-googong/
  /mortgage-broker-yass/
  /mortgage-broker-murrumbateman/
  /mortgage-broker-bungendore/
  /mortgage-broker-sutton-gundaroo/
/other-loans/                       Full-service fallback
  /commercial/  /rural-agri/  /asset-car-finance/  /smsf/
/guides/                            Money-topic content (link magnets)
  /act-vs-nsw-stamp-duty-first-home-buyer/
  /dhoas-explained/
  /lmi-waivers-medical-aps/
```

Rule: **every location page links to the niche pages and vice-versa** (internal
linking is how the intersection ranks). Intersection long-tails (e.g. "building
in Googong") live as sections within the relevant location/service page and as
guide posts — not as thin standalone pages.

---

## TIER 1 — build first (low competition × high intent)

### 1. `/who-we-help/defence-dhoas/` — FLAGSHIP
- **Primary keyword:** `DHOAS mortgage broker Canberra` / `Defence home loans Queanbeyan`
- **Secondary:** `DHOAS explained`, `ADF home loan broker Canberra`, `defence force home loan Duntroon`
- **Intent:** transactional + informational (DHOAS is confusing → people search to understand *and* to find a broker)
- **Competition:** ★ (only national/veteran-owned specialists; no local player)
- **Title/H1:** *Defence & DHOAS Home Loan Broker — Canberra & Queanbeyan | Swych*
- **Outline:** What DHOAS is & subsidy tiers · how it stacks with the Home Loan panel · what a posting/PCS means for your application · payslip allowances lenders accept · Russell/Duntroon/ADFA/HMAS Harman local mentions · "I come to you on base-town time" · FAQ · CTA
- **CTA:** "Book a kitchen-table DHOAS review"

### 2. `/locations/mortgage-broker-googong/`
- **Primary:** `mortgage broker Googong` · **Secondary:** `Googong construction loan`, `house and land loan Googong`
- **Intent:** transactional, new-build heavy
- **Competition:** ★ (Canberra satellites only)
- **Title/H1:** *Mortgage Broker Googong — House & Land / Construction Loan Specialist | Swych*
- **Outline:** Googong estate context (staged builds) · construction loan how-to (progress payments) · FHB in NSW vs ACT note · "on-site at the display village Saturdays" · link → `/construction-house-and-land/` + `/who-we-help/defence-dhoas/` · CTA

### 3. `/locations/mortgage-broker-murrumbateman/`
- **Primary:** `mortgage broker Murrumbateman` · **Secondary:** `Murrumbateman home loan`, `acreage/lifestyle block loan Yass Valley`
- **Competition:** ★ (agri brokers only)
- **Angle:** lifestyle/acreage + commuter build; note lender rules on land size/zoning; link → rural-agri fallback for hobby farms.

### 4. `/locations/mortgage-broker-bungendore/`
- **Primary:** `mortgage broker Bungendore` · **Secondary:** `Bungendore home loan`, `building in Bungendore`
- **Competition:** ★★ · **Angle:** doubling-town growth, commuter + defence (Bungendore ADF families), new estates.

### 5. `/who-we-help/aps-public-service/`
- **Primary:** `APS home loan` / `public service home loan Canberra` · **Secondary:** `home loan for government employees ACT`, `EL2 / contract income home loan`
- **Intent:** transactional + reassurance
- **Competition:** ★★★ (Fairbanks, Loan Market content — but nobody *owns* it)
- **Angle:** job-security lending perks (85% LVR no-LMI for eligible), how lenders read APS allowances / higher-duties / non-ongoing contracts, ACT-specific.

---

## TIER 2 — build second

### 6. `/who-we-help/medical-healthcare/`
- **Primary:** `home loans for doctors Canberra` / `home loan for nurses ACT`
- **Competition:** ★★★ (national specialists, not Canberra-local)
- **Angle:** LMI waivers up to 95% LVR no-LMI, which roles qualify (AHPRA), locum/allowance income; local + digital process.

### 7. `/locations/mortgage-broker-queanbeyan/`
- **Primary:** `mortgage broker Queanbeyan` · **Competition:** ★★★★ (Casa, Aussie, Nexa active here)
- **Angle:** high-volume border town → lead with **Defence + ACT-vs-NSW** differentiation, not generic; strongest internal-link hub to DHOAS page.

### 8. `/locations/mortgage-broker-yass/`
- **Primary:** `mortgage broker Yass` · **Competition:** ★★ (agri brokers own it for farms)
- **Angle:** explicitly *residential/first-home* to contrast the agri incumbents; Yass Valley growth stats.

### 9. `/home-loans/construction-house-and-land/`
- **Primary:** `construction loan broker Canberra region` / `house and land loan ACT NSW`
- **Competition:** ★★★ · **Angle:** the service page all growth-town pages funnel into; progress-draw mechanics, builder tie-ins, fixed-vs-variable during build.

### 10. `/locations/mortgage-broker-sutton-gundaroo/`
- **Primary:** `mortgage broker Sutton` / `Gundaroo home loan` · **Competition:** ★ · thinner volume, easy win, semi-rural commuter angle.

---

## TIER 3 — content link-magnets (build authority, earn backlinks)

These `/guides/` posts target informational intent, earn links, and feed the
transactional pages. High value because they showcase a *stated Swych strength*
(ACT-vs-NSW knowledge).

| Guide | Primary keyword | Why it wins |
|---|---|---|
| `/guides/act-vs-nsw-stamp-duty-first-home-buyer/` | `stamp duty ACT vs NSW first home buyer` | The exact confusion for commuter-belt buyers straddling the border; nobody covers it cleanly |
| `/guides/dhoas-explained/` | `how does DHOAS work` | Feeds the flagship page; evergreen, high dwell time |
| `/guides/lmi-waivers-medical-aps/` | `LMI waiver doctors nurses public servants` | Converts two hero niches; links to both niche pages |
| `/guides/building-in-googong-finance-guide/` | `financing a build in Googong` | Pure intersection gold; links Googong + construction pages |

---

## Full-service fallback pages (thin but present — catch every lead)

`/other-loans/commercial/`, `/rural-agri/`, `/asset-car-finance/`, `/smsf/` —
one concise page each, so a searcher for "car loan Queanbeyan" or "commercial
loan Canberra" finds you and converts. Keep them lean; their job is coverage +
"one broker for every loan", not ranking battles.

---

## On-page & technical SEO checklist (apply to every page)

- **Title:** `<Primary keyword> — <benefit> | Swych` · **H1** matches intent, one per page.
- **URL:** short, keyword-first, lowercase-hyphenated (as above).
- **Meta description:** benefit + "mobile / we come to you" + town + CTA.
- **Schema:** `MortgageBroker` / `LocalBusiness` with `areaServed` listing every
  town (this is how a *service-area* business ranks in multiple map packs),
  `FinancialProduct` for loan types, `FAQPage` for the FAQ blocks, `Review`/
  `AggregateRating` once reviews exist.
- **GBP alignment:** page town list must match Google Business Profile
  service-area towns exactly (NAP consistency).
- **Internal links:** every location page → relevant niche page(s) + service
  page; every niche page → the towns it's strongest in. Contextual anchor text.
- **Unique local content:** each location page needs genuinely different copy
  (estate names, local stats, ACT-vs-NSW notes) — duplicated template pages get
  filtered by Google.
- **Speed/mobile:** these buyers search on phones at inspections — Core Web
  Vitals matter.
- **Review markup + testimonials** surfaced on location pages as they accrue.

---

## Prioritisation summary

| Priority | Pages | Rationale |
|---|---|---|
| **Now (wk 1–4)** | DHOAS, Googong, Murrumbateman, Bungendore, APS | Lowest competition × highest intent; flagship + growth belt |
| **Next (wk 5–8)** | Medical, Queanbeyan, Yass, Construction hub, Sutton/Gundaroo | Fills the map; higher-competition towns need the niche differentiation first |
| **Ongoing** | Guides + full-service fallback | Authority, backlinks, lead-catching |

> ⚠️ Built to an *ideal* structure — swych.com.au blocked crawling. Share the
> current sitemap/nav and this maps onto real URLs (with 301s where needed) to
> avoid keyword cannibalisation. Validate keywords in Google Keyword Planner /
> Search Console before committing.


---


<!-- ================================================================ -->
# ══ SECTION 5) 90-DAY ACTION CHECKLIST ══
<!-- ================================================================ -->

# Swych — 90-Day Action Checklist

Sequenced, lean, do-this-in-order. Ties directly to the strategy (`README.md`)
and page plan (`seo-page-plan.md`). Owner = you unless noted. Effort tags:
🟢 quick · 🟡 half-day+ · 🔴 multi-day / ongoing.

---

## Phase 1 — Foundation (Days 0–30)
*Goal: get found for the wedge terms, and never lose a review again.*

### Google Business Profile (the #1 gap vs incumbents)
- [ ] 🟡 Convert/verify GBP as a **service-area business** (mobile) — no single
      office pin; list travel-to towns: Queanbeyan, Googong, Yass, Murrumbateman,
      Bungendore, Sutton, Gundaroo.
- [ ] 🟢 Categories: primary **Mortgage Broker**; add Loan Agency, Financial
      Consultant. Fill services (DHOAS, APS, medical, construction, refinance…).
- [ ] 🟢 Description leads with **"mobile mortgage broker — we come to you,
      evenings & weekends"** + hero niches.
- [ ] 🟢 Add photos (you at a kitchen table / display village), booking link, hours.

### Review engine (close the moat gap deliberately)
- [ ] 🔴 Stand up an **automated post-settlement review request** (SMS + email);
      one-tap link to Google review. Fire at settlement + a nudge 3 days later.
- [ ] 🟢 Ask every past happy client (last 12 mo) for a Google review this month —
      seed the profile.
- [ ] 🟢 Set a rule: **respond to every review within 48 h** (SEO + trust signal).
- [ ] 🟢 Target: **first 15–20 reviews in 90 days** (you won't hit Clarity's 1,300;
      you don't need to — you're ranking for terms they don't target).

### Positioning & the flagship pages
- [ ] 🟡 Rewrite **homepage** to the positioning line: mobile + growth belt +
      Defence/DHOAS/APS/medical/new-build + "and every other loan too."
- [ ] 🔴 Publish **DHOAS page** (flagship — see page plan §1).
- [ ] 🔴 Publish **Googong**, **Murrumbateman**, **Bungendore** location pages.
- [ ] 🟡 Publish **APS / public service** niche page.
- [ ] 🟢 Add `MortgageBroker` + `areaServed` schema to every page; match GBP towns.

### Measurement baseline
- [ ] 🟢 Google Search Console + GA4 verified; note starting positions for the
      target keywords so you can prove movement.

---

## Phase 2 — Expand (Days 31–60)
*Goal: fill out the map and the funnel; get in front of buyers where they build.*

### Content & pages
- [ ] 🔴 Publish **Medical/healthcare**, **Queanbeyan**, **Yass**,
      **Construction/House-and-Land hub**, **Sutton/Gundaroo** pages.
- [ ] 🔴 Publish guide: **ACT vs NSW stamp duty & first-home-buyer schemes**
      (your differentiator — commuter buyers straddle the border).
- [ ] 🟡 Publish guide: **DHOAS explained** (feeds the flagship page).
- [ ] 🟢 Interlink everything (location ↔ niche ↔ service ↔ guide).

### Partnerships & local presence (leads + backlinks)
- [ ] 🔴 Outreach to **builders & display villages** in Googong, Murrumbateman,
      Bungendore — offer to be the "finance person on site Saturdays."
- [ ] 🟡 Introduce yourself to **real estate agents & conveyancers** in the
      growth towns (referral + a backlink from their "preferred partners" page).
- [ ] 🟡 Join & be useful in **local Facebook/community groups** (Yass Valley,
      Googong, Bungendore) — answer finance questions, don't spam.
- [ ] 🟢 List on directories with consistent NAP: Region Canberra, WordOfMouth,
      Yellow/True Local, brokerpages, RateMyAgent.

---

## Phase 3 — Authority (Days 61–90)
*Goal: become the name that comes up for the region + niches.*

- [ ] 🔴 Pitch to get into the **"best mortgage brokers"** round-ups
      (Region Canberra, Canberra Times, Canberra Daily) — these rank for the head
      term you're avoiding, so a listing borrows their authority.
- [ ] 🟡 Publish guide: **LMI waivers for medical & public servants** (converts
      two niches, earns links).
- [ ] 🟡 Formalise **referral partnerships** — buyers' agents, accountants,
      financial planners in the region; a simple reciprocal arrangement.
- [ ] 🟢 Ask for a **Google review after every Phase-2 settlement**; hit the
      15–20 milestone; start collecting written testimonials for location pages.
- [ ] 🟡 **Measure & iterate:** pull Search Console — which town/niche pages moved?
      Double down on the risers; refresh the laggards. Re-check competitor gaps.
- [ ] 🟢 Consider a **"building in Googong" finance guide** (intersection gold)
      once the display-village relationships are warm.

---

## The scoreboard (what "winning" looks like at Day 90)

| Metric | Day 0 | Day 90 target |
|---|---|---|
| Google reviews | (low) | 15–20, all responded to |
| GBP | office/none | service-area, 7 towns, optimised |
| Ranking pages live | homepage | 10+ location/niche + 3 guides |
| Map-pack appearances | Canberra only | Queanbeyan, Googong, Yass +others |
| Referral partners | — | 3–5 builders/agents in growth towns |
| Flagship term (`DHOAS broker Canberra/Queanbeyan`) | not ranking | page 1 (low competition) |

---

## The 3 things that matter most (if you only do three)

1. **DHOAS page + service-area GBP** — your least-contested, highest-value wedge.
2. **Googong / Murrumbateman / Bungendore pages** — own the growth belt before
   anyone else bothers.
3. **Review engine from day one** — the one metric you're behind on; make it
   automatic so it compounds.

> Reminder: figures & competitor facts are from July 2026 research (see
> `README.md` §7 for caveats). Validate keyword volumes and confirm your live
> URL structure before building pages.


---


<!-- ================================================================ -->
# ══ SECTION 6) BLOG CONTENT CALENDAR & KEYWORD PLAN ══
<!-- ================================================================ -->

# Swych — Blog Content Calendar & Keyword Plan

A keyword-researched, ranking-focused editorial plan for the `/guides/` section.
12 posts across 4 clusters, prioritised, each with title, keywords (short + long
-tail), a directional volume/difficulty read, the angle that makes it rankable,
internal links, and a promotion play.

---

## ⚠️ How to read the numbers (important)

Exact monthly search volumes come from **Google Keyword Planner, Ahrefs, or
SEMrush localised to Australia** — this plan's volumes are **directional
estimates from search research + reasoning, not tool-pulled figures.** Validate
before betting budget (method at the bottom). Volume bands used:

- 🔥 **High** — strong national demand (1k+/mo national). Competitive; you win by
  *localising* ("…in Canberra / ACT / Queanbeyan").
- ◆ **Medium** — meaningful demand (≈100–1k/mo), often winnable directly.
- ○ **Low / niche** — small volume (≈10–100/mo) but **near-zero competition and
  high conversion intent** — these are your fastest first-page wins.

**The ranking strategy in one line:** national head terms are owned by banks and
big brokers — so you publish the *pillar* to build authority, but you **rank and
convert on the localised long-tail** (town + niche + scheme). Low-competition
local intent is where a solo broker gets to page one fast.

---

## Publish in this order

| # | Post | Cluster | Why this slot |
|---|---|---|---|
| **1** | ACT stamp duty abolished 2026 | First-home | 🕒 **TIMELY** — law changed 1 Jul 2026; ride the wave now |
| **2** | First Home Guarantee 2026 (localised) | First-home | 🕒 **TIMELY** — scheme expanded Oct 2025; high volume |
| **3** | DHOAS explained (pillar) | Defence | Flagship niche; evergreen; low local competition |
| **4** | Canberra vs Queanbeyan cost compare | First-home | Unique local angle, cross-border intent |
| **5** | LMI waivers — doctors/nurses/APS (pillar) | Medical/APS | High volume, ties 2 hero niches |
| **6** | Construction loans & progress payments | New-build | High volume, feeds growth-belt pages |
| 7 | Home loans for APS & public servants | APS | Core Canberra audience |
| 8 | Nurse & midwife 90% no-LMI (new 2026) | Medical | Fresh policy, low competition |
| 9 | Building in Googong finance guide | New-build | Intersection gold, zero competition |
| 10 | DHOAS + First Home Guarantee together | Defence | Zero competition, pure conversion |
| 11 | Moving to Murrumbateman (finance) | New-build | Growth town, zero competition |
| 12 | Using DHOAS in Canberra & Queanbeyan | Defence | Local conversion → service page |

Cadence: publish the two timely posts **this week**, then ~1/week. Pillars first
in each cluster, clusters link up to their pillar and across to money pages.

---

## CLUSTER A — First Home Buyer & Schemes (highest volume + timely)

### Post 1 — ACT stamp duty abolished 🕒 TIMELY FLAGSHIP
- **Title:** *ACT Stamp Duty Abolished for First Home Buyers (2026): What It Actually Means*
- **Primary keyword:** `ACT stamp duty first home buyer` · `stamp duty ACT 2026`
- **Long-tail cluster:** `does ACT have stamp duty for first home buyers 2026` ·
  `ACT home buyer concession scheme 2026 eligibility` · `no stamp duty ACT first
  home` · `when did ACT abolish stamp duty` · `ACT stamp duty changes July 2026`
- **Volume / difficulty:** 🔥 High & *surging* (news-driven) / Medium — news &
  gov sites rank, but a clear local broker explainer with a calculator + "what it
  means for your borrowing" wins the how-does-this-affect-me intent.
- **Angle to rank:** be the fastest *plain-English + what-to-do-next* guide.
  Cover eligibility (18+, live in it 12 months, no income/price cap now), worked
  examples, and how it changes deposit maths. Freshness + local authority.
- **Internal links:** → `/services/first-home-buyer-loans`, `/locations/canberra`,
  Post 2 (First Home Guarantee), Post 4 (vs Queanbeyan).
- **Promote:** pitch as expert comment to Region Canberra / allhomes / Canberra
  Times (they're covering this now); post in Canberra first-home-buyer & suburb
  Facebook groups; a short explainer reel; email any warm leads "this changes
  your numbers."

### Post 2 — First Home Guarantee 2026 (localised) 🕒 TIMELY
- **Title:** *First Home Guarantee 2026: 5% Deposit, No Income Cap — A Canberra Buyer's Guide*
- **Primary:** `first home guarantee scheme` · `5% deposit first home buyer`
- **Long-tail:** `first home guarantee 2026 changes` · `first home guarantee
  income cap removed` · `how to apply first home guarantee` · `first home
  guarantee price cap NSW 2026` · `5% deposit no LMI government scheme`
- **Volume / difficulty:** 🔥 High (national) / High → **win by localising**:
  target "Canberra / ACT / Queanbeyan" variants and the *2026 changes* freshness
  angle (no income cap, no place cap, NSW cap to $1.5M, gov covers LMI).
- **Angle:** "what changed in 2026 + how it stacks with the ACT stamp duty change
  + you can only access it via a lender/broker" (positions you as the gateway).
- **Internal links:** → `/services/first-home-buyer-loans`, Post 1, `/contact-us`.
- **Promote:** same FHB groups; a "5% deposit myths" carousel; guest paragraph on
  a local real-estate agent's blog (they want FHB buyers too).

### Post 4 — Canberra vs Queanbeyan compared
- **Title:** *Buying in Canberra vs Queanbeyan: Stamp Duty & First-Home Costs Compared (2026)*
- **Primary:** `stamp duty ACT vs NSW` · `buying in Queanbeyan vs Canberra`
- **Long-tail:** `is it cheaper to buy in Queanbeyan or Canberra` · `Queanbeyan
  first home buyer stamp duty` · `cross border ACT NSW home loan` · `Queanbeyan vs
  Canberra first home buyer 2026`
- **Volume / difficulty:** ◆ Medium, very high local intent / **Low–Medium** —
  almost nobody covers the cross-border comparison cleanly. Strong ownable niche.
- **Angle:** the definitive side-by-side (now that ACT abolished FHB stamp duty,
  the historic Queanbeyan advantage flipped — that's a genuinely fresh, useful
  take). Comparison table + worked $700k/$900k examples.
- **Internal links:** → `/locations/queanbeyan`, `/locations/canberra`, Posts 1 & 2.
- **Promote:** Queanbeyan community groups; pitch to allhomes (they've run this
  exact story angle before).

---

## CLUSTER B — Defence / DHOAS (flagship niche, low competition)

### Post 3 — DHOAS explained (pillar)
- **Title:** *DHOAS Explained (2026): How Defence Home-Loan Subsidies Actually Work*
- **Primary:** `DHOAS` · `how does DHOAS work`
- **Long-tail:** `DHOAS subsidy tiers 2026` · `how much is the DHOAS subsidy` ·
  `DHOAS eligibility 2 years service` · `DHOAS loan limit` · `is DHOAS worth it` ·
  `DHOAS vs first home buyer`
- **Volume / difficulty:** ◆–🔥 Medium-high, evergreen / Medium — gov & the 3
  DHOAS banks rank, but they **won't tell you how DHOAS interacts with the whole
  market** — that's the broker gap. Own the "what they don't explain" angle.
- **Angle:** concrete 2026 tier table (Tier 1 loans ≤ $413,690 → up to $490/mo;
  Tier 2 ≤ $620,535 → $736; Tier 3 ≤ $827,380 → $981), eligibility, the 12-month
  live-in rule, and *how to actually use it well*. Big FAQ block → FAQ schema.
- **Internal links:** → (new) `/services/defence-dhoas-home-loans`, Posts 10 & 12,
  `/locations/queanbeyan`.
- **Promote:** Defence community & partner Facebook groups, base/mess noticeboards,
  transition/veteran networks; answer DHOAS questions on r/AusFinance &
  r/CanberraAU (helpful, not spammy, link only when it truly answers).

### Post 10 — DHOAS + First Home Guarantee together
- **Title:** *Can You Combine DHOAS with the First Home Guarantee? (2026)*
- **Long-tail:** `DHOAS and first home guarantee together` · `DHOAS first home
  buyer` · `can you use DHOAS with other grants` · `DHOAS first home owner grant`
- **Volume / difficulty:** ○ Low / **Near-zero competition** — a precise answer to
  a real question nobody's targeting. Fast ranking + high intent.
- **Internal links:** → Post 3, Post 2, `/services/defence-dhoas-home-loans`.
- **Promote:** link from Post 3; Defence forums when the question comes up.

### Post 12 — Using DHOAS in Canberra & Queanbeyan (local)
- **Title:** *Using DHOAS to Buy in Canberra & Queanbeyan: A Local Broker's Guide*
- **Long-tail:** `DHOAS broker Canberra` · `Defence home loan Queanbeyan` · `DHOAS
  home loan Canberra` · `ADF home loan Canberra`
- **Volume / difficulty:** ○ Low / Near-zero — **pure conversion**, maps straight
  to the service + location pages. This is a "money" post, not a traffic post.
- **Internal links:** → `/services/defence-dhoas-home-loans`, `/locations/queanbeyan`,
  Post 3, `/contact-us`.
- **Promote:** local Defence networks; link from the DHOAS service page.

---

## CLUSTER C — Medical / APS (LMI waivers)

### Post 5 — LMI waivers pillar
- **Title:** *LMI Waivers in 2026: How Doctors, Nurses & Public Servants Skip Mortgage Insurance*
- **Primary:** `LMI waiver` · `no LMI home loan professionals`
- **Long-tail:** `LMI waiver doctors 95%` · `LMI waiver nurses 2026` · `which
  professions are exempt from LMI` · `how much does an LMI waiver save` · `LMI
  waiver eligibility`
- **Volume / difficulty:** 🔥 High / Medium-High — many brokers target this, so
  win with **specificity + freshness + local** (2026 lender list behaviour,
  "saves $15k–$45k", AHPRA rules) and localised variants.
- **Angle:** the key insight from research — *the same nurse is quoted $0 at one
  lender and $18k at another; a broker's job is knowing which* — makes the case
  for using you, not a bank.
- **Internal links:** → `/services/doctor-medical-loans`,
  `/services/nurse-allied-health-loans`, `/services/professional-essential-loans`,
  Posts 8 & 7.
- **Promote:** hospital/clinic staff groups, allied-health associations, LinkedIn.

### Post 8 — Nurse & midwife 90% no-LMI (new 2026)
- **Title:** *Home Loans for Nurses & Midwives: The New 90% No-LMI Waiver (2026)*
- **Long-tail:** `LMI waiver nurses` · `nurse home loan no LMI` · `midwife home
  loan deposit` · `home loan for nurses 10% deposit`
- **Volume / difficulty:** ◆ Medium & growing (fresh policy — select lenders added
  nurses in 2026) / Low-Medium. Freshness advantage.
- **Internal links:** → `/services/nurse-allied-health-loans`, Post 5.
- **Promote:** nursing/midwifery Facebook & union groups, Canberra Health Services
  staff networks.

### Post 7 — Home loans for APS & public servants
- **Title:** *Home Loans for APS & Public Servants: Rate Discounts, LMI Waivers & Borrowing Power*
- **Primary:** `home loan public servants` · `APS home loan`
- **Long-tail:** `public servant home loan discount` · `APS LMI waiver` ·
  `government employee home loan benefits` · `salary packaging home loan
  borrowing power`
- **Volume / difficulty:** ◆ Medium / Medium — huge Canberra audience; localise
  ("APS in Canberra") to separate from national pages.
- **Angle:** rate discounts (0.1–0.5%+), 85% LVR no-LMI paths, how lenders read
  allowances / higher-duties / non-ongoing contracts, salary packaging in
  borrowing power.
- **Internal links:** → `/services/professional-essential-loans`, `/locations/canberra`,
  Post 5.
- **Promote:** APS-heavy LinkedIn, Canberra professional groups (careful with
  workplace group rules — keep it genuinely helpful).

---

## CLUSTER D — Construction / New Builds / Growth belt

### Post 6 — Construction loans & progress payments
- **Title:** *Construction Loans Explained: How Progress Payments Work When You Build (2026)*
- **Primary:** `construction loan progress payments` · `how do construction loans work`
- **Long-tail:** `construction loan stages Australia` · `progress payment schedule
  building` · `construction loan deposit` · `interest only during construction` ·
  `land and construction loan`
- **Volume / difficulty:** 🔥 High / High → localise to Canberra/Googong/growth
  estates to rank; the pillar builds authority for the town posts.
- **Angle:** the 5 stages (slab 20% → frame → lockup → fit-out → completion 10%),
  interest-only-on-drawn-funds, inspection thresholds ($600k), ACT Land Rent angle.
- **Internal links:** → `/services/construction-loans`, Posts 9 & 11, `/locations/googong`.
- **Promote:** house-and-land / builder audiences; display-village partners.

### Post 9 — Building in Googong finance guide (intersection gold)
- **Title:** *Building in Googong: A Complete Finance Guide (Land, Construction & Costs)*
- **Long-tail:** `building in Googong` · `Googong house and land` · `Googong
  construction loan` · `land loan Googong` · `first home buyer Googong`
- **Volume / difficulty:** ○ Low / **Near-zero competition** — nobody owns Googong
  finance content. Pure local conversion + feeds `/locations/googong`.
- **Internal links:** → `/locations/googong`, `/services/construction-loans`, Post 6.
- **Promote:** Googong community Facebook group, Googong display village, local
  agents/builders.

### Post 11 — Moving to Murrumbateman (finance)
- **Title:** *Moving to Murrumbateman: What Canberra Buyers Should Know About Finance*
- **Long-tail:** `buying in Murrumbateman` · `Murrumbateman house and land` ·
  `mortgage broker Murrumbateman` · `acreage loan Yass Valley`
- **Volume / difficulty:** ○ Low & growing / Near-zero. (Clone this format for
  Bungendore & Sutton once live.)
- **Internal links:** → (new) `/locations/murrumbateman`, `/services/construction-loans`.
- **Promote:** Yass Valley / Murrumbateman community groups; wineries/lifestyle
  angle; local agents.

---

## Reusable promotion playbook (run for EVERY post)

1. **On-page first (owned).** Interlink up to the pillar + across to 2–3 money
   pages; add to the `/guides` hub and topic page; ensure `Article` + `FAQPage` +
   `BreadcrumbList` schema; submit the URL in **Google Search Console → URL
   Inspection → Request Indexing** the day it goes live.
2. **Google Business Profile.** Post every guide as a GBP "What's new" update with
   a link — fast indexing + local relevance signal.
3. **Community (where your buyers already are).** Share in the *specific* Facebook/
   community groups per post above. Lead with the helpful answer, link second.
   Never drop a bare link.
4. **Email.** Send new guides to your list / warm leads with a one-line "why this
   affects you." (Research: newsletters are a top blog-traffic source.)
5. **Social snackable.** One reel/carousel per post (a "3 things you didn't know
   about DHOAS" beats reposting the article link).
6. **Local backlinks (the ranking multiplier).** Pitch expert commentary to
   *Region Canberra, allhomes, Canberra Times, Canberra Daily* — the timely posts
   (1, 2, 4) are your best hooks. Get listed by referral partners (builders,
   agents, conveyancers) as their "finance guy" with a link. Chamber of commerce /
   local directories with consistent NAP.
7. **Answer engines.** Your robots.txt already invites AI crawlers — write clear,
   quotable, well-structured answers with a direct summary up top so ChatGPT/
   Perplexity/Gemini cite you. FAQ schema helps here too.
8. **Refresh.** Update the `dateModified` and figures each time policy/rates move
   (stamp duty, DHOAS tiers, guarantee caps). Freshness is a real ranking factor
   for these YMYL topics — and you'll be the most current source.

---

## Validate the volumes in ~10 minutes (do this before writing)

1. **Google Keyword Planner** (free with a Google Ads account) — set location to
   **Australia**, paste each primary + long-tail keyword, read the monthly ranges.
2. **Google autocomplete + "People also ask" + "Related searches"** on each
   primary term — free source of real long-tail phrasing to add as H2s.
3. **Google Search Console** (once posts are live) — the *Performance → Queries*
   report shows the real terms you're getting impressions for; write follow-ups
   for the ones on page 2 to push them to page 1.
4. Optional: a free Ahrefs/SEMrush trial or **Keywords Everywhere** (cheap) for
   AU volume + difficulty overlays while you browse.

> Sources for the policy facts above (verify currency at publish time): ACT
> Revenue Office / ACT Budget 2026-27 (stamp duty abolition, 1 Jul 2026);
> dhoas.gov.au (2025-26 tiers & subsidy rates); Housing Australia / First Home
> Guarantee (Oct 2025 expansion); NAB/Westpac/Aussie/Canstar (LMI waivers, 2026).


---


<!-- ================================================================ -->
# ══ SECTION 7) 100 RANKABLE POST IDEAS ══
<!-- ================================================================ -->

# Swych — 100 Rankable Blog Post Ideas

Built to **outrank Canberra competitors** (Clarity, Fairbanks, Zanda, Loan Market
and the agri brokers) by attacking where they're thin: DHOAS depth, growth-town
content, cross-border ACT/NSW nuance, occupation × location intersections, and
fresh 2026 policy. Big brokers own generic head terms — you win the **localised,
niche, and timely long-tail** they ignore.

**Tags:** 🕒 timely (ride a 2026 policy change) · 🎯 zero/low-competition (fast
first-page win) · 📍 local intent (maps to a money page) · ⭐ pillar (comprehensive
hub; cluster posts link up to it). Full keyword clusters, volumes and promotion
for the first 12 are in `blog-content-calendar.md`.

**Start with these 15** (highest ROI): #1, #2, #3, #12, #13, #19, #23, #25, #33,
#43, #44, #53, #66, #93, #96.

---

## A. First-home buyers & government schemes (timely, high intent)
1. ACT Stamp Duty Abolished for First Home Buyers (2026): What It Actually Means 🕒⭐
2. First Home Guarantee 2026: 5% Deposit, No Income Cap — A Canberra Guide 🕒
3. Buying in Canberra vs Queanbeyan: Stamp Duty & First-Home Costs Compared (2026) 🎯📍
4. ACT Home Buyer Concession Scheme 2026: Full Eligibility Guide 🕒
5. Every First Home Buyer Grant & Scheme in the ACT (2026): The Complete List ⭐
6. First Home Buyer Schemes in NSW for Canberra-Region Buyers (2026)
7. How Much Deposit Do First Home Buyers Really Need in Canberra? (2026)
8. First Home Super Saver Scheme Explained: Using Your Super for a Deposit
9. Buying Your First Home in Canberra: A Step-by-Step 2026 Roadmap ⭐
10. 10 First Home Buyer Mistakes to Avoid in the ACT
11. Can You Use the First Home Guarantee to Build a House? (2026) 🎯

## B. Defence / DHOAS (flagship niche — near-zero local competition)
12. DHOAS Explained (2026): How Defence Home-Loan Subsidies Actually Work ⭐
13. DHOAS Subsidy Tiers & Rates 2026: How Much Will You Actually Get?
14. DHOAS Eligibility: Do You Qualify? (Permanent & Reserve Service)
15. How to Apply for DHOAS: Step-by-Step (Subsidy Certificate to Settlement)
16. Can You Combine DHOAS with the First Home Guarantee? (2026) 🎯
17. DHOAS vs HPAS vs HPSEA: Which Defence Housing Benefit Is Right for You? 🎯
18. Using DHOAS to Build a New Home: What You Need to Know
19. DHOAS Home Loans in Canberra & Queanbeyan: A Local Broker's Guide 🎯📍
20. Is DHOAS Worth It? Real Numbers on the Interest Subsidy
21. DHOAS After You Leave the ADF: Rules for Ex-Serving Members 🎯
22. Posted to Canberra with the ADF? A Relocation & Home-Loan Guide 📍

## C. Medical, nurses & allied health (LMI waivers)
23. LMI Waivers 2026: How Doctors, Nurses & Public Servants Skip Mortgage Insurance ⭐
24. Home Loans for Doctors: 95% No-LMI Explained (2026)
25. Home Loans for Nurses & Midwives: The New 90% No-LMI Waiver (2026) 🕒
26. LMI Waivers for Allied Health: Physios, Pharmacists, Vets & More
27. Which Professions Get an LMI Waiver in Australia? (2026 List)
28. Home Loans for Junior Doctors & Registrars: Borrowing on a Training Salary 🎯
29. How Much Does an LMI Waiver Actually Save You? Worked Examples
30. Home Loans for Locum & Contract Health Workers: How Income Is Assessed 🎯
31. Medical Home Loans in Canberra: A Local Guide for Hospital Staff 📍
32. Home Loans for Dentists & Dental Specialists (2026)

## D. APS / public servants / government employees
33. Home Loans for APS & Public Servants: Discounts, Waivers & Borrowing Power ⭐
34. APS Home Loan Benefits in Canberra: What Lenders Offer in 2026 📍
35. How Salary Packaging Affects Your Borrowing Power (Public Servants) 🎯
36. Home Loan on a Non-Ongoing / Contract APS Role: What Lenders Think 🎯
37. Higher Duties & Allowances: How Lenders Assess APS Income 🎯
38. Home Loans for EL1, EL2 & SES Officers: Borrowing at a Higher Income
39. Home Loans for Teachers in the ACT: Discounts & Schemes
40. Home Loans for Police & Emergency Services Workers (ACT & NSW)
41. From Public Servant to First Home: The Fastest Path in Canberra 📍
42. Do Public Servants Really Get Cheaper Interest Rates? (2026)

## E. Construction, house & land, new builds (growth belt)
43. Construction Loans Explained: How Progress Payments Work (2026) ⭐
44. Building in Googong: A Complete Finance Guide (Land, Construction & Costs) 🎯📍
45. House & Land vs Buying Established in the Canberra Region: Cost Compared
46. The ACT Land Rent Scheme Explained: Is It Right for You? 🎯
47. Construction Loan vs Owner-Builder Loan: Which One Do You Need?
48. How Much Deposit Do You Need for a House & Land Package? (2026)
49. Building in the Yass Valley: Finance for Acreage & Lifestyle Blocks 🎯📍
50. New-Build Finance in Denman Prospect, Whitlam & Molonglo 📍
51. Knockdown Rebuild Finance in Canberra: How It Works 🎯
52. Fixed vs Variable While You Build: What to Choose During Construction

## F. Location / suburb / town guides
53. Mortgage Broker Murrumbateman: Buying & Building in the Yass Valley 🎯📍
54. Buying in Bungendore: A Finance & Market Guide (2026) 🎯📍
55. Moving to Sutton & Gundaroo: A Semi-Rural Finance Guide 🎯📍
56. Buying in Googong: First Home Buyer & Land Guide 📍
57. Buying in Queanbeyan: The Cross-Border First Home Guide 📍
58. Buying in Gungahlin: Suburbs, Prices & Finance (2026) 📍
59. Buying in Belconnen: Apartments vs Houses — Finance Guide 📍
60. Buying in Tuggeranong: A First Home Buyer Guide 📍
61. Canberra's Inner South: Prestige Property & Complex-Income Lending 📍
62. Buying in Yass: A Guide for Canberra Commuters 📍
63. The Best Canberra Suburbs for First Home Buyers (2026)
64. Canberra Property Market Update (2026) — refresh each quarter
65. Where Canberra's Public Servants Are Buying in 2026

## G. Refinancing & equity
66. When Should You Refinance in 2026? A Canberra Owner's Guide ⭐
67. How to Refinance Your Home Loan: Step-by-Step (2026)
68. Refinancing to Access Equity for a Renovation
69. Debt Consolidation Through Refinancing: Pros, Cons & Traps
70. The "Loyalty Tax": Why Your Bank's New Customers Pay Less Than You
71. Cashback Refinance Offers in 2026: Are They Actually Worth It? 🕒
72. How Much Equity Do You Need to Refinance?
73. Beating the Fixed-Rate Cliff: Refinancing After Your Fixed Term Ends
74. Refinance With a New Lender or Just Renegotiate? How to Decide

## H. Investment property & SMSF
75. Investment Loans in the Canberra Region: ACT vs NSW Considerations 📍
76. Interest-Only vs Principal & Interest for Investors (2026)
77. Using Your Equity to Buy Your First Investment Property
78. SMSF Property Loans Explained: LRBAs & the Rules (2026) 🎯
79. Can Your SMSF Buy a Commercial Property? A Plain-English Guide 🎯
80. Rentvesting in Canberra: Buy Where You Can, Live Where You Want 📍
81. Land Tax in the ACT vs NSW for Property Investors 🎯📍
82. Positive vs Negative Gearing: What It Means for Your Loan
83. Structuring Your Loans to Build a Property Portfolio

## I. Self-employed, commercial & asset/car finance
84. Home Loans for the Self-Employed: Low-Doc Options in 2026
85. Commercial Property Loans in Canberra: Low-Doc & Lease-Doc Explained 📍
86. Business Loans vs Overdraft vs Line of Credit: What to Use When
87. Car & Equipment Finance in Canberra: Chattel Mortgage vs Lease 📍
88. How Lenders Assess Self-Employed Income (One Year vs Two)
89. Financing a Ute, Van or Truck for Your Trade (Asset Finance)
90. Commercial Finance for Buying Your Business Premises
91. Novated Lease vs Car Loan: Which Is Better for APS Staff? 🎯
92. Low-Doc Home Loans: Who They're For and What They Really Cost

## J. Buying process, borrowing power & FAQs (top-of-funnel)
93. How Much Can I Borrow? What Really Drives Your Borrowing Power (2026) ⭐
94. Home Loan Pre-Approval Explained: How Long It Lasts & Why It Matters
95. How Rate Rises (or Cuts) Change What You Can Borrow 🕒
96. Mortgage Broker or Go Direct to the Bank? The Honest Answer
97. How a Bad Credit Score Affects Your Home Loan (and How to Fix It)
98. Guarantor Home Loans: How a Family Guarantee Works (2026)
99. HECS/HELP Debt and Your Home Loan: How Much It Really Matters 🎯
100. The Full Home Loan Journey: From First Enquiry to Settlement (8 Steps)

---

## Why this list out-ranks the competitors

- **Localisation everywhere.** Big brokers write "home loans for nurses"; you
  write "medical home loans in Canberra for hospital staff." Google ranks the
  specific, intent-matched page for local searchers.
- **Occupation × location intersections** (DHOAS×Queanbeyan, APS×Canberra,
  medical×hospital) are terms almost no competitor targets — 🎯 fast wins.
- **Growth-town content** (Googong, Murrumbateman, Bungendore, Yass Valley) is a
  near-empty field — the agri brokers who "cover" those towns write about farms.
- **Timely policy posts** (🕒) ride demand spikes and earn local backlinks/press
  before competitors update — freshness is a real ranking factor for these YMYL
  finance topics.
- **Topic-cluster interlinking.** Each cluster's ⭐ pillar plus its supporting
  posts, all linking up and across to your service/location pages, signals
  topical authority the way a pile of disconnected posts never will.

## How to use it
1. Publish in cluster order, **pillar (⭐) first**, then its cluster posts.
2. Lead with the **15 priority posts** above; front-load the 🕒 timely ones.
3. Before writing each, validate keywords (Keyword Planner + "People also ask")
   per `blog-content-calendar.md`, and lift real long-tail phrasings into your H2s.
4. Interlink every post up to its pillar + across to 2–3 money pages; request
   indexing in Search Console on publish; run the promotion playbook.
5. Refresh the 🕒 and market-update posts whenever policy/rates move — you stay
   the most current source and hold the ranking.

> Grounding & caveats: topics and angles are grounded in July 2026 search
> research (see `blog-content-calendar.md` sources). Volumes/competition are
> directional — confirm in Google Keyword Planner (AU) before committing. Verify
> policy figures (stamp duty, DHOAS tiers, guarantee caps, LMI rules) are current
> at each post's publish date.


---
