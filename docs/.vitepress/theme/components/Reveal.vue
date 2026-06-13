<script setup lang="ts">
import { ref, onMounted } from 'vue'

withDefaults(defineProps<{ as?: string; delay?: number }>(), {
  as: 'div',
  delay: 0,
})

const el = ref<HTMLElement | null>(null)
const shown = ref(false)

onMounted(() => {
  if (
    typeof IntersectionObserver === 'undefined' ||
    matchMedia('(prefers-reduced-motion: reduce)').matches
  ) {
    shown.value = true
    return
  }
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          shown.value = true
          io.disconnect()
        }
      })
    },
    { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
  )
  if (el.value) io.observe(el.value)
})
</script>

<template>
  <component
    :is="as"
    ref="el"
    class="reveal"
    :class="{ 'is-visible': shown }"
    :style="{ transitionDelay: delay ? `${delay}ms` : undefined }"
  >
    <slot />
  </component>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(18px);
  transition: opacity 0.6s var(--ease), transform 0.6s var(--ease);
  will-change: opacity, transform;
}
.reveal.is-visible {
  opacity: 1;
  transform: none;
}
@media (prefers-reduced-motion: reduce) {
  .reveal {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
</style>
