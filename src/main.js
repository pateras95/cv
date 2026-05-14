import { createApp } from 'vue'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'
import App from './App.vue'
import router from './router'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'dark',
    themes: {
      dark: {
        dark: true,
        colors: {
          primary: '#7dd3fc',
          secondary: '#fda4af',
          accent: '#c4b5fd',
          warning: '#fcd34d',
          info: '#67e8f9',
          error: '#fca5a5',
          success: '#86efac',
          background: '#0f0f0f',
          surface: '#171717',
          'surface-variant': '#262626',
          'on-background': '#e5e5e5',
          'on-surface': '#e5e5e5',
          'on-primary': '#0f0f0f',
          'on-secondary': '#0f0f0f',
        },
      },
      light: {
        dark: false,
        colors: {
          primary: '#0369a1',
          secondary: '#be123c',
          accent: '#6d28d9',
          warning: '#b45309',
          info: '#0e7490',
          error: '#b91c1c',
          success: '#15803d',
          background: '#fafafa',
          surface: '#ffffff',
          'surface-variant': '#f5f5f5',
          'on-background': '#171717',
          'on-surface': '#171717',
          'on-primary': '#ffffff',
          'on-secondary': '#ffffff',
        },
      },
    },
  },
})

const app = createApp(App)
app.use(vuetify)
app.use(router)
app.mount('#app')
