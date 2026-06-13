<script setup lang="ts">
import { computed } from 'vue'
import { useData } from 'vitepress'
import { Content } from 'vitepress'
import SiteNav from './components/SiteNav.vue'
import HeroParallax from './components/HeroParallax.vue'
import Services from './components/Services.vue'
import Process from './components/Process.vue'
import ContactForm from './components/ContactForm.vue'
import SiteFooter from './components/SiteFooter.vue'

const { frontmatter, lang } = useData()

// Fallbacks so chrome (nav/footer) still renders on pages without full
// frontmatter — e.g. the built-in 404 page.
const brand = computed(() => frontmatter.value.brand ?? { name: 'Allegria', suffix: 'Development' })
const nav = computed(
  () =>
    frontmatter.value.nav ?? {
      services: 'Services',
      process: 'How we work',
      contact: 'Contact',
      cta: 'Get in touch',
    },
)
const footer = computed(
  () =>
    frontmatter.value.footer ?? {
      tagline: 'A cheerful engineering studio.',
      location: 'Made in Greece',
      github: 'https://github.com/allegria-development',
      email: 'info@allegriadevelopment.gr',
      rights: 'All rights reserved.',
    },
)
</script>

<template>
  <div class="allegria-app">
    <SiteNav :nav="nav" :brand="brand" :lang="lang" />

    <template v-if="frontmatter.layout === 'home-allegria'">
      <main id="top">
        <HeroParallax :hero="frontmatter.hero" />
        <Services :heading="frontmatter.servicesHeading" :services="frontmatter.services" />
        <Process
          :headings="frontmatter.workHeadings"
          :process="frontmatter.process"
          :stack="frontmatter.stack"
        />
        <ContactForm :contact="frontmatter.contact" />
      </main>
    </template>

    <template v-else>
      <main class="doc">
        <div class="container">
          <Content />
        </div>
      </main>
    </template>

    <SiteFooter :footer="footer" :brand="brand" :lang="lang" />
  </div>
</template>

<style scoped>
.doc {
  padding-block: clamp(48px, 8vw, 96px);
}
.doc :deep(h1) {
  font-size: clamp(1.9rem, 4vw, 2.6rem);
  margin-bottom: 0.6em;
}
.doc :deep(h2) {
  font-size: 1.4rem;
  margin: 1.6em 0 0.5em;
}
.doc :deep(p) {
  margin: 0 0 1em;
  color: var(--muted);
}
</style>
