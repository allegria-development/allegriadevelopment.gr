# Allegria Development — marketing site

One-page, bilingual (EN/EL) marketing site for **Allegria Development**.
Built with [VitePress](https://vitepress.dev/) + a custom marketing theme, content as
markdown in git, deployed to Netlify. Full decisions live in [`SPEC.md`](./SPEC.md).

## Develop

```bash
pnpm install
pnpm dev        # http://localhost:5173
pnpm build      # static output → docs/.vitepress/dist
pnpm preview    # preview the production build
```

## Editing content

All copy lives in the **frontmatter** of two files — no CMS, just markdown in git:

- `docs/index.md` — English (served at `/`)
- `docs/el/index.md` — Greek (served at `/el/`)

Keep both files **structurally identical** (same frontmatter keys); only the words differ.
Edit → commit → push → Netlify rebuilds and deploys.

## Structure

```
docs/
├── index.md                     # EN content (frontmatter-driven)
├── el/index.md                  # EL content
├── public/                      # favicon.svg, og-image.png (TODO), forms.html
└── .vitepress/
    ├── config.ts                # site meta, i18n, SEO/head, sitemap
    └── theme/                   # custom marketing theme (Layout + components)
```

## Contact form (Netlify Forms)

The live form (`ContactForm.vue`) posts to Netlify with `name="contact"`. A static copy in
`docs/public/forms.html` ensures Netlify's build bot registers the form. Spam is blocked with
a honeypot field (`bot-field`). Set the notification email in the Netlify dashboard to
`info@allegriadevelopment.gr`.

## Open items (see SPEC.md §9, §12)

- Logo / OG image / final palette + fonts
- Privacy policy page + footer business details (ΑΦΜ/VAT) — **required before launch** (form collects data)
- Real GitHub org URL in footer
- Choose Plausible vs Umami and enable the analytics snippet in `config.ts`
