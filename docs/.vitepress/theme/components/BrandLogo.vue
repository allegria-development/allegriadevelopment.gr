<script setup lang="ts">
defineProps<{
  name?: string
  suffix?: string
  href?: string
  label?: string
}>()
</script>

<template>
  <component :is="href ? 'a' : 'span'" :href="href" class="brand" :aria-label="label">
    <svg class="brand__mark" viewBox="0 0 48 48" aria-hidden="true">
      <!-- Bloom: six petals swept into a pinwheel (each tilted 12° about its tip) -->
      <path d="M24 7 C20 13 20 19 24 24 C28 19 28 13 24 7 Z" fill="#f59e0b" transform="rotate(12 24 7)" />
      <path d="M24 7 C20 13 20 19 24 24 C28 19 28 13 24 7 Z" fill="#0d9488" transform="rotate(60 24 24) rotate(12 24 7)" />
      <path d="M24 7 C20 13 20 19 24 24 C28 19 28 13 24 7 Z" fill="#14b8a6" transform="rotate(120 24 24) rotate(12 24 7)" />
      <path d="M24 7 C20 13 20 19 24 24 C28 19 28 13 24 7 Z" fill="#0d9488" transform="rotate(180 24 24) rotate(12 24 7)" />
      <path d="M24 7 C20 13 20 19 24 24 C28 19 28 13 24 7 Z" fill="#14b8a6" transform="rotate(240 24 24) rotate(12 24 7)" />
      <path d="M24 7 C20 13 20 19 24 24 C28 19 28 13 24 7 Z" fill="#0d9488" transform="rotate(300 24 24) rotate(12 24 7)" />
      <circle cx="24" cy="24" r="3.5" fill="#fff" />
    </svg>
    <span v-if="name" class="brand__text">{{ name
      }}<span v-if="suffix" class="brand__suffix">{{ suffix }}</span></span>
  </component>
</template>

<style scoped>
.brand {
  display: inline-flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-head);
  font-weight: 700;
  font-size: var(--brand-size, 1.15rem);
  line-height: 1;
  color: var(--ink);
}
.brand__mark {
  width: 1.7em;
  height: 1.7em;
  flex: none;
}
.brand__suffix {
  color: var(--muted);
  font-weight: 500;
  margin-left: 6px;
}
</style>
