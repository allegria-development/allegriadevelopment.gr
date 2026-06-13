<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

defineProps<{
  hero: {
    eyebrow: string
    title: string
    subtitle: string
    ctaLabel: string
    secondaryLabel: string
  }
}>()

const stage = ref<HTMLElement | null>(null)
let raf = 0
let mx = 0
let my = 0
let reduce = false

function schedule() {
  if (!raf) raf = requestAnimationFrame(apply)
}

function apply() {
  raf = 0
  const el = stage.value
  if (!el) return
  const scroll = window.scrollY
  const shapes = el.querySelectorAll<HTMLElement>('[data-depth]')
  shapes.forEach((shape) => {
    const depth = parseFloat(shape.dataset.depth || '0')
    const x = mx * 24 * depth
    const y = my * 24 * depth + scroll * 0.12 * depth
    shape.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(2)}px, 0)`
  })
}

function onMove(e: MouseEvent) {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  mx = (e.clientX - cx) / cx
  my = (e.clientY - cy) / cy
  schedule()
}

onMounted(() => {
  reduce = matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduce) return
  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('scroll', schedule, { passive: true })
})

onBeforeUnmount(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('scroll', schedule)
  if (raf) cancelAnimationFrame(raf)
})
</script>

<template>
  <section class="hero">
    <div ref="stage" class="hero__shapes" aria-hidden="true">
      <span class="shape shape--ring" data-depth="1.4"></span>
      <span class="shape shape--tri" data-depth="2.2"></span>
      <span class="shape shape--blob" data-depth="0.8"></span>
      <span class="shape shape--square" data-depth="1.8"></span>
      <span class="shape shape--dot" data-depth="2.6"></span>
      <span class="shape shape--pill" data-depth="1.1"></span>
    </div>

    <div class="container hero__inner">
      <p class="eyebrow">{{ hero.eyebrow }}</p>
      <h1 class="hero__title">{{ hero.title }}</h1>
      <p class="hero__subtitle">{{ hero.subtitle }}</p>
      <div class="hero__actions">
        <a class="btn btn-primary" href="#contact">{{ hero.ctaLabel }}</a>
        <a class="btn btn-ghost" href="#services">{{ hero.secondaryLabel }}</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  overflow: hidden;
  padding-block: clamp(96px, 16vw, 180px);
  background:
    radial-gradient(60% 60% at 75% 10%, var(--accent-tint) 0%, transparent 60%),
    radial-gradient(50% 50% at 10% 90%, var(--joy-tint) 0%, transparent 55%),
    var(--bg);
}

.hero__inner {
  position: relative;
  z-index: 2;
  max-width: 760px;
}
.hero__title {
  font-size: clamp(2.4rem, 6.2vw, 4.1rem);
  margin-top: 22px;
}
.hero__subtitle {
  margin-top: 22px;
  font-size: clamp(1.1rem, 2.4vw, 1.3rem);
  color: var(--muted);
  max-width: 36em;
}
.hero__actions {
  margin-top: 34px;
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}

/* --- Floating geometry --- */
.hero__shapes {
  position: absolute;
  inset: 0;
  z-index: 1;
}
.shape {
  position: absolute;
  display: block;
  will-change: transform;
  animation: float 9s ease-in-out infinite;
}
.shape--ring {
  top: 14%;
  right: 12%;
  width: 130px;
  height: 130px;
  border-radius: 50%;
  border: 14px solid var(--accent-soft);
  opacity: 0.5;
}
.shape--tri {
  top: 58%;
  right: 22%;
  width: 0;
  height: 0;
  border-left: 38px solid transparent;
  border-right: 38px solid transparent;
  border-bottom: 64px solid var(--joy);
  opacity: 0.55;
  animation-delay: -2s;
}
.shape--blob {
  bottom: 8%;
  right: 6%;
  width: 220px;
  height: 220px;
  border-radius: 46% 54% 60% 40% / 48% 42% 58% 52%;
  background: linear-gradient(135deg, var(--accent), var(--accent-soft));
  opacity: 0.16;
  animation-delay: -4s;
}
.shape--square {
  top: 24%;
  right: 38%;
  width: 56px;
  height: 56px;
  border-radius: 14px;
  background: var(--accent);
  opacity: 0.16;
  animation-delay: -1s;
}
.shape--dot {
  top: 72%;
  left: 8%;
  width: 22px;
  height: 22px;
  border-radius: 50%;
  background: var(--joy);
  opacity: 0.7;
  animation-delay: -3s;
}
.shape--pill {
  top: 12%;
  left: 4%;
  width: 90px;
  height: 34px;
  border-radius: 999px;
  background: var(--accent-tint);
  opacity: 0.8;
  animation-delay: -5s;
}

@keyframes float {
  0%,
  100% {
    translate: 0 0;
  }
  50% {
    translate: 0 -14px;
  }
}

@media (max-width: 700px) {
  .shape--ring,
  .shape--tri,
  .shape--square {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .shape {
    animation: none;
  }
}
</style>
