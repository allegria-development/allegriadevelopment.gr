import type { Theme } from 'vitepress'
import Layout from './Layout.vue'

import './styles/tokens.css'
import './styles/base.css'

// Self-hosted fonts (no third-party network calls → privacy + perf).
// Both families ship a Greek subset — required for the EL site.
import '@fontsource/manrope/500.css'
import '@fontsource/manrope/600.css'
import '@fontsource/manrope/700.css'
import '@fontsource/ibm-plex-sans/400.css'
import '@fontsource/ibm-plex-sans/500.css'
import '@fontsource/ibm-plex-sans/600.css'

export default {
  Layout,
} satisfies Theme
