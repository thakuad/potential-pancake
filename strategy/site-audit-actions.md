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

These three are quick, high-value hygiene fixes — do them before any content work.

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

> Source: live crawl of swych.com.au, July 2026 (link-crawl of 27 pages; the XML
> sitemap itself returned unreadable/gzipped and couldn't be parsed directly —
> worth confirming it lists the same URLs and no orphans).
