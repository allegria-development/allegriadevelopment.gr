<script setup lang="ts">
import Reveal from './Reveal.vue'

defineProps<{
  headings: {
    processTitle: string
    processSubtitle: string
    stackTitle: string
    stackSubtitle: string
  }
  process: { title: string; body: string }[]
  stack: { group: string; items: string[] }[]
}>()
</script>

<template>
  <section id="work" class="section section--soft">
    <div class="container">
      <Reveal class="section-head">
        <h2 class="section-title">{{ headings.processTitle }}</h2>
        <p class="section-subtitle">{{ headings.processSubtitle }}</p>
      </Reveal>

      <ol class="steps">
        <Reveal
          v-for="(step, i) in process"
          :key="step.title"
          as="li"
          class="step"
          :delay="i * 90"
        >
          <span class="step__num">{{ String(i + 1).padStart(2, '0') }}</span>
          <h3 class="step__title">{{ step.title }}</h3>
          <p class="step__body">{{ step.body }}</p>
        </Reveal>
      </ol>

      <Reveal class="stack-head">
        <h3 class="stack-title">{{ headings.stackTitle }}</h3>
        <p class="section-subtitle">{{ headings.stackSubtitle }}</p>
      </Reveal>

      <div class="stack">
        <Reveal
          v-for="(group, i) in stack"
          :key="group.group"
          class="stack__group"
          :delay="i * 80"
        >
          <span class="stack__label">{{ group.group }}</span>
          <ul class="badges">
            <li v-for="item in group.items" :key="item" class="badge">{{ item }}</li>
          </ul>
        </Reveal>
      </div>
    </div>
  </section>
</template>

<style scoped>
.steps {
  list-style: none;
  margin: 0 0 64px;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
  counter-reset: step;
}
.step {
  position: relative;
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 28px;
  box-shadow: var(--shadow);
}
.step__num {
  font-family: var(--font-head);
  font-weight: 700;
  font-size: 1rem;
  color: #fff;
  background: var(--accent);
  width: 40px;
  height: 40px;
  border-radius: 12px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 16px;
}
.step__title {
  font-size: 1.2rem;
  margin-bottom: 6px;
}
.step__body {
  color: var(--muted);
}

.stack-head {
  margin-bottom: 26px;
}
.stack-title {
  font-family: var(--font-head);
  font-size: 1.5rem;
}
.stack {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}
.stack__label {
  display: block;
  font-family: var(--font-head);
  font-weight: 500;
  font-size: 0.78rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--muted);
  margin-bottom: 14px;
}
.badges {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.badge {
  font-family: var(--font-head);
  font-weight: 500;
  font-size: 0.92rem;
  color: var(--ink);
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: 999px;
  padding: 8px 15px;
  transition: border-color 0.18s var(--ease), color 0.18s var(--ease);
}
.badge:hover {
  border-color: var(--accent);
  color: var(--accent-strong);
}

@media (max-width: 860px) {
  .steps,
  .stack {
    grid-template-columns: 1fr;
  }
}
</style>
