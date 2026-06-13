import { defineConfig } from 'vitepress'

const HOSTNAME = 'https://www.allegriadevelopment.gr'

export default defineConfig({
  cleanUrls: true,
  lastUpdated: false,
  sitemap: { hostname: HOSTNAME },

  // Bilingual: English at root, Greek under /el/
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      title: 'Allegria Development',
      description:
        'We build software that ships — web, blockchain & consulting, done cheerfully.',
    },
    el: {
      label: 'Ελληνικά',
      lang: 'el',
      link: '/el/',
      title: 'Allegria Development',
      description:
        'Φτιάχνουμε λογισμικό που παραδίδεται — web, blockchain & consulting, με μεράκι.',
    },
  },

  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#0d9488' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:site_name', content: 'Allegria Development' }],
    ['meta', { property: 'og:image', content: `${HOSTNAME}/og-image.png` }],
    ['meta', { property: 'og:image:width', content: '1200' }],
    ['meta', { property: 'og:image:height', content: '630' }],
    ['meta', { property: 'og:image:alt', content: 'Allegria Development — we build software that ships.' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    // Keep scroll-reveal content visible when JS is disabled.
    ['noscript', {}, '<style>.reveal{opacity:1!important;transform:none!important}</style>'],
    // Cookieless analytics — Plausible (GDPR-friendly, no consent banner).
    // Collects data once "allegriadevelopment.gr" is added in your Plausible
    // dashboard. To use Umami instead, swap for its script + data-website-id.
    ['script', { defer: '', 'data-domain': 'allegriadevelopment.gr', src: 'https://plausible.io/js/script.js' }],
  ],

  transformHead({ pageData, siteData }) {
    const path = pageData.relativePath
      .replace(/(^|\/)index\.md$/, '$1')
      .replace(/\.md$/, '')
    const url = `${HOSTNAME}/${path}`
    const title =
      pageData.frontmatter.title || pageData.title || siteData.title
    const description =
      pageData.frontmatter.description ||
      pageData.description ||
      siteData.description

    return [
      ['link', { rel: 'canonical', href: url }],
      ['meta', { property: 'og:title', content: title }],
      ['meta', { property: 'og:description', content: description }],
      ['meta', { property: 'og:url', content: url }],
      ['link', { rel: 'alternate', hreflang: 'en', href: `${HOSTNAME}/` }],
      ['link', { rel: 'alternate', hreflang: 'el', href: `${HOSTNAME}/el/` }],
      ['link', { rel: 'alternate', hreflang: 'x-default', href: `${HOSTNAME}/` }],
    ]
  },
})
