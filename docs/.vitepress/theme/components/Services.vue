<script setup lang="ts">
import Reveal from './Reveal.vue'

defineProps<{
  heading: { title: string; subtitle: string }
  services: { icon: string; title: string; body: string }[]
}>()
</script>

<template>
  <section id="services" class="section">
    <div class="container">
      <Reveal class="section-head">
        <h2 class="section-title">{{ heading.title }}</h2>
        <p class="section-subtitle">{{ heading.subtitle }}</p>
      </Reveal>

      <div class="grid">
        <Reveal
          v-for="(service, i) in services"
          :key="service.title"
          class="card"
          :delay="i * 90"
        >
          <span class="card__icon" aria-hidden="true">
            <svg v-if="service.icon === 'web'" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="4" width="18" height="14" rx="2" stroke="currentColor" stroke-width="1.8" />
              <path d="M3 8h18M8 21h8M12 18v3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <svg v-else-if="service.icon === 'chain'" viewBox="0 0 24 24" fill="none">
              <path d="M9 12a3 3 0 0 1 3-3h3a3 3 0 0 1 0 6h-1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
              <path d="M15 12a3 3 0 0 1-3 3H9a3 3 0 0 1 0-6h1.5" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
            </svg>
            <svg v-else viewBox="0 0 24 24" fill="none">
              <path d="M12 3l2.2 5.3L20 9l-4 3.9.9 5.6L12 16l-4.9 2.5L8 12.9 4 9l5.8-.7L12 3z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round" />
            </svg>
          </span>
          <h3 class="card__title">{{ service.title }}</h3>
          <p class="card__body">{{ service.body }}</p>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 30px 28px;
  box-shadow: var(--shadow);
  transition: transform 0.2s var(--ease), box-shadow 0.2s var(--ease),
    border-color 0.2s var(--ease);
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-hover);
  border-color: var(--accent-soft);
}
.card__icon {
  display: inline-flex;
  width: 48px;
  height: 48px;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  background: var(--accent-tint);
  color: var(--accent-strong);
  margin-bottom: 18px;
}
.card__icon svg {
  width: 26px;
  height: 26px;
}
.card__title {
  font-size: 1.25rem;
  margin-bottom: 8px;
}
.card__body {
  color: var(--muted);
}

@media (max-width: 860px) {
  .grid {
    grid-template-columns: 1fr;
  }
  .card:hover {
    transform: none;
  }
}
</style>
