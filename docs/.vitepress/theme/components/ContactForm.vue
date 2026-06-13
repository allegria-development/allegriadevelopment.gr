<script setup lang="ts">
import { reactive, ref } from 'vue'
import Reveal from './Reveal.vue'

const props = defineProps<{
  contact: {
    title: string
    subtitle: string
    email: string
    emailLabel: string
    form: {
      name: string
      email: string
      company: string
      projectType: string
      projectTypes: { value: string; label: string }[]
      message: string
      messagePlaceholder: string
      submit: string
      sending: string
      success: string
      error: string
    }
  }
}>()

type Status = 'idle' | 'sending' | 'success' | 'error'
const status = ref<Status>('idle')

const model = reactive({
  name: '',
  email: '',
  company: '',
  projectType: '',
  message: '',
  'bot-field': '',
})

function encode(data: Record<string, string>) {
  return Object.keys(data)
    .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(data[k])}`)
    .join('&')
}

async function onSubmit() {
  if (status.value === 'sending') return
  status.value = 'sending'
  try {
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contact', ...model }),
    })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    status.value = 'success'
  } catch {
    status.value = 'error'
  }
}
</script>

<template>
  <section id="contact" class="section">
    <div class="container contact">
      <Reveal class="contact__intro">
        <p class="eyebrow">{{ contact.title }}</p>
        <h2 class="section-title">{{ contact.subtitle }}</h2>
        <p class="contact__email">
          {{ contact.emailLabel }}
          <a :href="`mailto:${contact.email}`">{{ contact.email }}</a>
        </p>
      </Reveal>

      <Reveal class="contact__card">
        <p v-if="status === 'success'" class="note note--ok" role="status">
          {{ contact.form.success }}
        </p>

        <form
          v-else
          name="contact"
          method="POST"
          data-netlify="true"
          netlify-honeypot="bot-field"
          @submit.prevent="onSubmit"
        >
          <input type="hidden" name="form-name" value="contact" />
          <p class="hp" aria-hidden="true">
            <label>Don’t fill this out: <input v-model="model['bot-field']" name="bot-field" tabindex="-1" autocomplete="off" /></label>
          </p>

          <div class="row">
            <label class="field">
              <span>{{ contact.form.name }}</span>
              <input v-model="model.name" name="name" type="text" required autocomplete="name" />
            </label>
            <label class="field">
              <span>{{ contact.form.email }}</span>
              <input v-model="model.email" name="email" type="email" required autocomplete="email" />
            </label>
          </div>

          <div class="row">
            <label class="field">
              <span>{{ contact.form.company }}</span>
              <input v-model="model.company" name="company" type="text" autocomplete="organization" />
            </label>
            <label class="field">
              <span>{{ contact.form.projectType }}</span>
              <select v-model="model.projectType" name="projectType">
                <option value="" disabled>—</option>
                <option v-for="opt in contact.form.projectTypes" :key="opt.value" :value="opt.value">
                  {{ opt.label }}
                </option>
              </select>
            </label>
          </div>

          <label class="field">
            <span>{{ contact.form.message }}</span>
            <textarea
              v-model="model.message"
              name="message"
              rows="5"
              required
              :placeholder="contact.form.messagePlaceholder"
            ></textarea>
          </label>

          <button class="btn btn-primary" type="submit" :disabled="status === 'sending'">
            {{ status === 'sending' ? contact.form.sending : contact.form.submit }}
          </button>

          <p v-if="status === 'error'" class="note note--err" role="alert">
            {{ contact.form.error }}
          </p>
        </form>
      </Reveal>
    </div>
  </section>
</template>

<style scoped>
.contact {
  display: grid;
  grid-template-columns: 0.9fr 1.1fr;
  gap: 48px;
  align-items: start;
}
.contact__intro {
  position: sticky;
  top: calc(var(--nav-h) + 24px);
}
.contact__email {
  margin-top: 20px;
  color: var(--muted);
}
.contact__email a {
  font-weight: 600;
}

.contact__card {
  background: var(--bg);
  border: 1px solid var(--line);
  border-radius: var(--radius);
  padding: 30px;
  box-shadow: var(--shadow);
}
.row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;
}
.field {
  display: block;
  margin-bottom: 16px;
}
.field > span {
  display: block;
  font-family: var(--font-head);
  font-weight: 500;
  font-size: 0.88rem;
  margin-bottom: 7px;
}
.field input,
.field select,
.field textarea {
  width: 100%;
  font: inherit;
  color: var(--ink);
  background: var(--bg-soft);
  border: 1px solid var(--line);
  border-radius: var(--radius-sm);
  padding: 11px 13px;
  transition: border-color 0.15s var(--ease), box-shadow 0.15s var(--ease),
    background 0.15s var(--ease);
}
.field textarea {
  resize: vertical;
}
.field input:focus,
.field select:focus,
.field textarea:focus {
  outline: none;
  background: var(--bg);
  border-color: var(--accent);
  box-shadow: 0 0 0 3px var(--accent-tint);
}
.contact__card .btn {
  width: 100%;
  margin-top: 4px;
}

.hp {
  position: absolute;
  left: -9999px;
  width: 1px;
  height: 1px;
  overflow: hidden;
}

.note {
  margin-top: 16px;
  padding: 13px 15px;
  border-radius: var(--radius-sm);
  font-size: 0.95rem;
}
.note--ok {
  margin-top: 0;
  background: var(--accent-tint);
  color: var(--accent-strong);
}
.note--err {
  background: #fef2f2;
  color: #b91c1c;
}

@media (max-width: 860px) {
  .contact {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .contact__intro {
    position: static;
  }
  .row {
    grid-template-columns: 1fr;
  }
}
</style>
