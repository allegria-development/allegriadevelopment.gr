<script setup lang="ts">
const props = defineProps<{
  footer: {
    tagline: string
    location: string
    github: string
    email: string
    rights: string
  }
  brand: { name: string; suffix: string }
  lang: string
}>()

import BrandLogo from './BrandLogo.vue'

const year = new Date().getFullYear()
</script>

<template>
  <footer class="footer">
    <div class="container footer__inner">
      <div class="footer__brand">
        <BrandLogo :name="brand.name" :suffix="brand.suffix" />
        <p class="footer__tagline">{{ footer.tagline }}</p>
      </div>

      <nav class="footer__links" aria-label="Footer">
        <a :href="footer.github" target="_blank" rel="noopener" class="footer__link">
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" fill="currentColor">
            <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.7c-2.78.6-3.37-1.34-3.37-1.34-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.6.07-.6 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.34 1.09 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.94 0-1.09.39-1.98 1.03-2.68-.1-.26-.45-1.27.1-2.65 0 0 .84-.27 2.75 1.02a9.5 9.5 0 0 1 5 0c1.91-1.29 2.75-1.02 2.75-1.02.55 1.38.2 2.39.1 2.65.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.69-4.57 4.94.36.31.68.92.68 1.85v2.74c0 .27.18.58.69.48A10 10 0 0 0 12 2z" />
          </svg>
          GitHub
        </a>
        <a :href="`mailto:${footer.email}`" class="footer__link">{{ footer.email }}</a>
        <span class="footer__link footer__loc">{{ footer.location }}</span>
      </nav>
    </div>

    <div class="container footer__legal">
      <span>© {{ year }} {{ brand.name }} {{ brand.suffix }}. {{ footer.rights }}</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  background: var(--bg-soft);
  border-top: 1px solid var(--line);
  padding-block: 48px 28px;
}
.footer__inner {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  justify-content: space-between;
  align-items: flex-start;
}
.footer__brand {
  --brand-size: 1.1rem;
}
.footer__tagline {
  margin-top: 12px;
  color: var(--muted);
  max-width: 24em;
}
.footer__links {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: flex-end;
}
.footer__link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-head);
  font-weight: 500;
  color: var(--ink);
}
.footer__link:hover {
  color: var(--accent-strong);
}
.footer__loc {
  color: var(--muted);
}
.footer__legal {
  margin-top: 36px;
  padding-top: 20px;
  border-top: 1px solid var(--line);
  color: var(--muted);
  font-size: 0.88rem;
}

@media (max-width: 640px) {
  .footer__links {
    align-items: flex-start;
  }
}
</style>
