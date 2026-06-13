# Allegria Development — Marketing Website Spec

> One-page, bilingual (EN/EL) marketing site for **Allegria Development**, a software
> development agency specializing in web, blockchain, and consulting work.
> Built with VitePress + a custom marketing theme, content as markdown in git,
> deployed to Netlify.

_Status: Draft v1 — derived from interview on 2026-06-13. Next step: scaffold the project._

---

## 1. At a glance

| Decision | Choice |
| --- | --- |
| **Type** | Single-page marketing site (one scrolling page + minimal sub-pages) |
| **Framework** | VitePress (Vue 3, SSG) |
| **Content model** | Markdown in the git repo (structured frontmatter), edit → push → deploy |
| **Theme** | Fully custom marketing theme (custom `Layout.vue`, not the docs theme) |
| **Languages** | Bilingual EN + EL, toggle in nav (VitePress native i18n) |
| **Visual style** | Light, clean, minimal; teal/emerald accent |
| **Tone of voice** | Playful / "Allegria" (joy) — warm, human, optimistic, still credible |
| **Hosting** | Netlify (static + CDN, deploy on git push) |
| **Domain** | `allegriadevelopment.gr` (owned) → DNS to Netlify |
| **Primary CTA** | Get in touch → contact form (`info@allegriadevelopment.gr`) |
| **Form backend** | Netlify Forms |
| **Analytics** | Cookieless (Plausible or Umami), no consent banner |
| **Motion** | Rich — geometric parallax hero + tasteful section reveals |
| **Next step** | Write spec → **scaffold the VitePress project** |

---

## 2. Goals & audience

- **Primary goal:** lead generation — get prospective clients to send an enquiry via the contact form.
- **Audience:** founders/teams needing a dev partner for **web apps**, **blockchain/web3**, and **technical consulting**. Mixed local (Greek) + international (blockchain is a global market) — hence bilingual.
- **Positioning:** a small, credible, joyful engineering studio that ships production software. Blockchain capability is a key differentiator and should be visible, not buried.
- **Tone:** lean into "Allegria" = joy/cheerfulness. Warm and human, never corporate-stiff, but still signals real engineering competence (no fluff, no buzzword soup).

---

## 3. Tech stack & architecture

### 3.1 Stack
- **VitePress** (latest 1.x) — Vue 3 + Vite, static-site generation.
- **Vue 3 SFCs** for all section components.
- **TypeScript** for theme/config code.
- **CSS:** custom CSS with CSS variables (design tokens). No heavy UI framework. (Tailwind optional but not required; default to hand-rolled CSS + tokens to keep the bundle tiny.)
- **Self-hosted fonts** via `@fontsource` packages (no Google Fonts network calls → privacy + perf).
- **Package manager:** pnpm (recommended) — npm acceptable.

### 3.2 Why VitePress (and the caveat)
VitePress is docs-oriented; we deliberately **replace the default theme** with a custom marketing `Layout.vue` so it reads as an agency landing page, not a documentation site. We use VitePress for: fast Vite dev/build, Vue-in-markdown, built-in i18n, built-in sitemap, and clean SSG output.

### 3.3 Content model
Content lives in markdown in the repo and is edited in an editor / GitHub, then `git push` triggers a Netlify build.

Structured page copy lives in **frontmatter** of the locale index files (clean to edit, bilingual-friendly), rendered by Vue section components:

```
docs/
  index.md            # EN — structured frontmatter (hero, services, process, etc.)
  el/
    index.md          # EL — same structure, Greek copy
```

Each `index.md` frontmatter holds structured data, e.g.:

```yaml
---
layout: home-allegria          # our custom layout
hero:
  eyebrow: Software, with joy
  title: We build software that ships.
  subtitle: Web, blockchain & consulting — done right, done cheerfully.
  ctaLabel: Get in touch
services:
  - icon: web
    title: Web development
    body: Web apps, SaaS, frontends & APIs that scale.
  - icon: chain
    title: Blockchain development
    body: Smart contracts, EVM/web3, audited and production-ready.
  - icon: spark
    title: Consulting
    body: Architecture, code review, and hands-on technical guidance.
process:
  - title: Scope
    body: We dig into the problem and agree on what "done" means.
  - title: Build
    body: Short iterations, real demos, no surprises.
  - title: Launch
    body: We ship to production and support the rollout.
stack:
  - { group: Frontend, items: [Vue, React, TypeScript, Nuxt, Tailwind] }
  - { group: Backend & data, items: [Node, Go, Python, PostgreSQL] }
  - { group: Blockchain, items: [Solidity, EVM, Rust, web3.js/ethers] }
---
```

> Editors change copy by editing these two files only. No CMS UI, fully version-controlled.

### 3.4 Directory structure (target)

```
www/
├── SPEC.md
├── package.json
├── netlify.toml
├── public/                      # static assets served at root
│   ├── favicon.svg
│   ├── og-image.png             # 1200×630 social card (shipped)
│   └── forms.html               # static form for Netlify form detection (see §6.2)
└── docs/
    ├── index.md                 # EN content (frontmatter-driven)
    ├── el/
    │   └── index.md             # EL content
    ├── privacy.md               # TODO (see §9)
    └── .vitepress/
        ├── config.ts            # site config + i18n locales + sitemap + head/meta
        └── theme/
            ├── index.ts         # registers custom theme + layouts
            ├── Layout.vue       # top-level custom layout (nav + slots + footer)
            ├── styles/
            │   ├── tokens.css   # design tokens (colors, type, spacing)
            │   └── base.css     # resets + globals
            ├── components/
            │   ├── SiteNav.vue        # logo + nav + EN/EL toggle
            │   ├── HeroParallax.vue   # geometric parallax hero
            │   ├── Services.vue
            │   ├── Process.vue
            │   ├── TechStack.vue
            │   ├── ContactForm.vue    # Netlify form
            │   ├── SiteFooter.vue
            │   └── Reveal.vue         # scroll-reveal wrapper (IntersectionObserver)
            └── composables/
                └── useLocaleContent.ts # pulls frontmatter for the active locale
```

---

## 4. Page structure (sections, in order)

1. **Sticky nav** — wordmark (left); anchor links (Services · Work/Process · Contact); **EN/EL toggle**; "Get in touch" button (right). Condensed/blur background on scroll.
2. **Hero** — eyebrow + headline + subtitle + primary CTA, over the **geometric parallax** background (see §5.3). Secondary "See what we do" anchor scroll.
3. **Services** — 3 cards: **Web development**, **Blockchain development**, **Consulting**. Icon + title + one-line body each.
4. **How we work + Tech stack** — lean **3-step process: Scope → Build → Launch**, followed by tech-stack badges grouped by **Frontend**, **Backend & data**, **Blockchain**.
5. **Contact** — short joyful invite + **Netlify contact form** (fields in §6.1) + `info@allegriadevelopment.gr` shown as fallback.
6. **Footer** — wordmark, **GitHub** link, **email + location (Greece)**, copyright. (Privacy link added when the page exists — §9.)

> Deliberately **omitted** (per interview): portfolio/case studies, about/team, testimonials/clients. The page is short and high-signal. Structure leaves room to add these later.

---

## 5. Design system

### 5.1 Brand (name only today — proposing the following)
Allegria has a name but no logo/colors/fonts yet. Proposed starting point (refine later):

- **Logo:** **"Bloom"** mark — six petals swept into a gentle pinwheel (allegria = joy / motion), with one warm-amber accent petal and a white hub. Ships as `BrandLogo.vue` (live) + `docs/public/logo-mark.svg`, `logo.svg` (lockup), and the `favicon.svg` (white bloom on a teal squircle). Wordmark set in Manrope.
- **Palette** (teal/emerald primary + a warm secondary for the "joy" accents in the parallax shapes):

| Token | Hex | Use |
| --- | --- | --- |
| `--accent` | `#0d9488` | primary teal (links, buttons, mark) |
| `--accent-strong` | `#0f766e` | hover/active |
| `--accent-soft` | `#14b8a6` | lighter teal, gradients |
| `--joy` | `#f59e0b` | warm secondary — sparingly, in hero shapes |
| `--ink` | `#0f172a` | primary text |
| `--muted` | `#475569` | secondary text |
| `--line` | `#e2e8f0` | borders/dividers |
| `--bg` | `#ffffff` | base background |
| `--bg-soft` | `#f8fafc` | alternating section background |

- **Type:** **Manrope** (headings) + **IBM Plex Sans** (body), self-hosted via `@fontsource`. Both ship a **Greek subset** — required since the site is bilingual (Space Grotesk/Sora/Lexend/Inter were considered; the heading set was rejected for lacking Greek glyphs, Inter swapped for IBM Plex Sans for a more engineering-credible body).

### 5.2 Layout & feel
- Light, airy, generous whitespace; max content width ~1100–1200px; comfortable line length.
- Cards with soft shadows + 1px `--line` borders; rounded corners (~12–16px).
- Mobile-first responsive; nav collapses to a simple menu on small screens.

### 5.3 Hero animation — geometric parallax
- Floating geometric shapes (circles, triangles, rounded rects) in teal + warm accent tints behind the headline.
- Parallax on **scroll** and subtle **mouse-move**; gentle idle float (CSS transforms / `requestAnimationFrame`).
- Pure CSS/canvas — **no Three.js / heavy libs**. Keep it GPU-cheap.
- **Accessibility:** fully honor `prefers-reduced-motion: reduce` → freeze to a static composition. Shapes are decorative (`aria-hidden`).

### 5.4 Motion elsewhere
- Section content fades/slides in on scroll via an `IntersectionObserver` `Reveal` wrapper.
- Hover transitions on buttons/cards/links.
- All motion respects `prefers-reduced-motion`.

---

## 6. Contact form

### 6.1 Fields
| Field | Type | Required | Notes |
| --- | --- | --- | --- |
| Name | text | ✅ | |
| Email | email | ✅ | reply address |
| Company | text | — | optional |
| Project type | select | — | Web / Blockchain / Consulting / Other |
| Message | textarea | ✅ | "Tell us about your project" |

### 6.2 Backend — Netlify Forms
- Form posts to Netlify; submissions go to the Netlify dashboard and email notification → route to `info@allegriadevelopment.gr`.
- Because the form is rendered by Vue (not in static HTML at build), include a **static hidden HTML form** (e.g. `public/forms.html`) with matching `name` + fields so Netlify's build-time bot detects it; the live Vue form carries `data-netlify="true"`, `name`, and the hidden `form-name` input.
- **Spam protection:** Netlify honeypot field (`netlify-honeypot`) — no reCAPTCHA (keeps it cookieless/clean). Revisit if spam appears.
- **UX:** client-side validation, disabled state on submit, success + error states (inline thank-you, no full page reload where possible), graceful fallback to `mailto:` if JS fails.
- Free tier ~100 submissions/month — sufficient; note the ceiling.

---

## 7. Internationalization (EN + EL)

- VitePress native i18n via `locales` in `config.ts`. **English = root** (`/`), **Greek = `/el/`**.
- Per-locale: `title`, `description`, nav labels, and all section copy (in each `index.md` frontmatter).
- **EN/EL toggle** in nav preserves the user on the equivalent page.
- SEO: per-locale `<html lang>`, `hreflang` alternates (`en`, `el`, `x-default`), localized meta/OG.
- Content discipline: both `index.md` files must stay structurally identical (same frontmatter keys) — only the copy differs. Document this in a short `CONTRIBUTING`/README note.

---

## 8. SEO, performance, accessibility

- **SEO:** unique per-locale `<title>`/meta description; Open Graph + Twitter card tags; `og-image.png` (1200×630, shipped); canonical URLs on `allegriadevelopment.gr`; `hreflang`; VitePress-generated `sitemap.xml`; sensible `robots.txt`.
- **Performance targets:** Lighthouse ≥ 95 (Perf/SEO/Best-Practices/A11y). Self-hosted fonts with `font-display: swap`; preload critical font; lazy-mount/IO for below-fold; no render-blocking 3rd-party JS; hero animation budgeted to stay smooth on mobile.
- **Accessibility:** WCAG 2.1 AA intent — semantic landmarks, keyboard-navigable nav + form, visible focus states, labelled form fields, color contrast checked against the palette, `prefers-reduced-motion` honored, decorative shapes `aria-hidden`.

---

## 9. Privacy / legal — **known gap (TODO)**

Per interview, legal pages are **deferred**, but the contact form collects personal data, so this is a flagged open item, not "not needed":

- [ ] **Privacy policy** page (`/privacy`, EN + EL) covering contact-form data: what's collected, why, where it's stored (Netlify), retention, and contact for data requests. _Recommended before public launch given GDPR._
- [ ] **Footer business details** for Greek compliance — legal company name, **ΑΦΜ/VAT**, registered location — once available.
- Analytics chosen is cookieless (no consent banner required), which keeps the immediate compliance surface small — but the form still warrants a privacy notice/link near the submit button.

---

## 10. Analytics

- **Cookieless** analytics — **Plausible** or **Umami** (self-host or cloud). No cookies → **no consent banner** (GDPR-friendly).
- Single lightweight script in `config.ts` head; track only page views + the "form submitted" event.
- Leave it trivially removable/swappable.

---

## 11. Hosting & deploy

- **Netlify**, building the VitePress site to static output, served via CDN.
- `netlify.toml`: build command (`pnpm build` / `vitepress build docs`), publish dir (`docs/.vitepress/dist`), Node version, and security headers.
- **Domain:** point `allegriadevelopment.gr` DNS at Netlify (apex + `www` redirect), provision Netlify-managed TLS. Enforce HTTPS + HSTS.
- Auto-deploy on push to `main`; deploy previews on PRs.

---

## 12. Open items / assets needed from client

- [x] **Logo** (SVG) — "Bloom" mark shipped (`BrandLogo.vue` + `logo.svg`/`logo-mark.svg`/`favicon.svg`).
- [ ] Confirm/adjust **palette + fonts** (proposed in §5.1).
- [x] **OG/social image** (`og-image.png`, 1200×630) + **favicon** — shipped.
- [ ] Real **service descriptions** / any nuance per service (current copy is drafted, editable).
- [ ] **GitHub org URL** for the footer; confirm **location** string (e.g. city, Greece).
- [ ] Choose **Plausible vs Umami** + account/site key.
- [ ] Decide on **privacy policy** content + **ΑΦΜ/VAT/legal name** for footer (§9).
- [ ] Confirm **Netlify** account + form notification email.

---

## 13. Build plan (scaffold — next step)

1. `package.json` + install VitePress, Vue, TS, `@fontsource/*`.
2. `docs/.vitepress/config.ts` — site meta, **i18n locales (en root + el)**, head/OG, sitemap.
3. Custom theme: `theme/index.ts`, `Layout.vue`, design tokens (`tokens.css`), base styles.
4. Section components: `SiteNav` (+ EN/EL toggle), `HeroParallax`, `Services`, `Process`, `TechStack`, `ContactForm`, `SiteFooter`, `Reveal`.
5. Content: `docs/index.md` (EN) + `docs/el/index.md` (EL) with structured frontmatter + **drafted playful copy** (EN now; EL translation to follow/confirm).
6. Netlify wiring: `netlify.toml`, hidden static form for detection, honeypot.
7. Cookieless analytics snippet (placeholder site key).
8. Polish: responsive passes, `prefers-reduced-motion`, Lighthouse check, favicon/OG placeholders.
9. (Deferred) `/privacy` page + footer legal details when content is provided.

---

_Contact: info@allegriadevelopment.gr · Domain: allegriadevelopment.gr_
