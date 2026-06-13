<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useRoute } from 'vitepress'
import BrandLogo from './BrandLogo.vue'

const props = defineProps<{
  nav: { services: string; process: string; contact: string; cta: string }
  brand: { name: string; suffix: string }
  lang: string
}>()

const route = useRoute()
const scrolled = ref(false)
const menuOpen = ref(false)

const homeHref = computed(() => (props.lang === 'el' ? '/el/' : '/'))
const otherLabel = computed(() => (props.lang === 'el' ? 'EN' : 'ΕΛ'))
const otherHref = computed(() => {
  const p = route.path
  if (props.lang === 'el') {
    const stripped = p.replace(/^\/el(\/|$)/, '/')
    return stripped || '/'
  }
  return p === '/' ? '/el/' : `/el${p}`
})

function onScroll() {
  scrolled.value = window.scrollY > 8
}
function close() {
  menuOpen.value = false
}

onMounted(() => {
  onScroll()
  window.addEventListener('scroll', onScroll, { passive: true })
})
onBeforeUnmount(() => window.removeEventListener('scroll', onScroll))
</script>

<template>
  <header class="nav" :class="{ 'is-scrolled': scrolled }">
    <div class="container nav__inner">
      <BrandLogo
        :name="brand.name"
        :suffix="brand.suffix"
        :href="homeHref"
        :label="`${brand.name} ${brand.suffix} — home`"
      />

      <nav class="links" :class="{ 'is-open': menuOpen }" aria-label="Primary">
        <a href="#services" @click="close">{{ nav.services }}</a>
        <a href="#work" @click="close">{{ nav.process }}</a>
        <a href="#contact" @click="close">{{ nav.contact }}</a>
        <a class="lang" :href="otherHref" :hreflang="lang === 'el' ? 'en' : 'el'">
          {{ otherLabel }}
        </a>
        <a class="btn btn-primary nav__cta" href="#contact" @click="close">{{ nav.cta }}</a>
      </nav>

      <button
        class="burger"
        :aria-expanded="menuOpen"
        aria-label="Menu"
        @click="menuOpen = !menuOpen"
      >
        <span></span><span></span><span></span>
      </button>
    </div>
  </header>
</template>

<style scoped>
.nav {
  position: sticky;
  top: 0;
  z-index: 50;
  height: var(--nav-h);
  display: flex;
  align-items: center;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: saturate(180%) blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color 0.25s var(--ease), background 0.25s var(--ease);
}
.nav.is-scrolled {
  background: rgba(255, 255, 255, 0.85);
  border-bottom-color: var(--line);
}
.nav__inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.links {
  display: flex;
  align-items: center;
  gap: 26px;
}
.links > a:not(.btn):not(.lang) {
  font-family: var(--font-head);
  font-weight: 500;
  color: var(--ink);
  font-size: 0.98rem;
}
.links > a:not(.btn):not(.lang):hover {
  color: var(--accent-strong);
}
.lang {
  font-family: var(--font-head);
  font-weight: 600;
  font-size: 0.85rem;
  color: var(--muted);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 5px 11px;
}
.lang:hover {
  color: var(--accent-strong);
  border-color: var(--accent);
}

.burger {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: 0;
  cursor: pointer;
  padding: 8px;
}
.burger span {
  width: 24px;
  height: 2px;
  background: var(--ink);
  border-radius: 2px;
}

@media (max-width: 820px) {
  .burger {
    display: flex;
  }
  .nav__cta {
    width: 100%;
  }
  .links {
    position: absolute;
    top: var(--nav-h);
    left: 0;
    right: 0;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    padding: 20px 24px 26px;
    background: #fff;
    border-bottom: 1px solid var(--line);
    box-shadow: var(--shadow);
    transform: translateY(-12px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s var(--ease), transform 0.2s var(--ease);
  }
  .links.is-open {
    transform: none;
    opacity: 1;
    pointer-events: auto;
  }
  .lang {
    align-self: flex-start;
  }
}
</style>
