<template>
  <v-app>
    <v-app-bar flat color="transparent" elevation="0" class="nav-glass">
      <v-container class="d-flex align-center py-0" style="max-width: 1100px;">
        <router-link to="/" class="text-decoration-none d-flex align-center">
          <div class="logo-box"><span class="logo-text">KK</span></div>
        </router-link>
        <v-spacer />
        <div class="d-none d-md-flex align-center ga-1">
          <v-btn v-for="item in navItems" :key="item.to" :to="item.to" variant="text" class="text-none">{{ item.label }}</v-btn>
        </div>
        <v-btn icon variant="text" class="ml-2" @click="toggleTheme">
          <v-icon>{{ isDark ? 'mdi-white-balance-sunny' : 'mdi-moon-waning-crescent' }}</v-icon>
        </v-btn>
      </v-container>
    </v-app-bar>

    <v-bottom-navigation class="d-md-none mobile-nav" grow color="primary" bg-color="surface">
      <v-btn v-for="item in navItems" :key="item.to" :to="item.to" :value="item.to">
        <v-icon>{{ item.icon }}</v-icon>
        <span class="text-caption">{{ item.label }}</span>
      </v-btn>
    </v-bottom-navigation>

    <v-main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </v-main>

    <v-footer class="pa-10 d-none d-md-block" color="transparent">
      <v-container style="max-width: 1100px;" class="text-center">
        <div class="d-flex justify-center ga-4 mb-4">
          <v-btn icon variant="tonal" color="primary" size="small" href="https://github.com/kkalyvas" target="_blank"><v-icon>mdi-github</v-icon></v-btn>
          <v-btn icon variant="tonal" color="primary" size="small" href="https://linkedin.com/in/kkalyvas" target="_blank"><v-icon>mdi-linkedin</v-icon></v-btn>
          <v-btn icon variant="tonal" color="primary" size="small" href="mailto:hello@kkalyvas.dev"><v-icon>mdi-email-outline</v-icon></v-btn>
        </div>
        <div class="text-body-2 text-medium-emphasis">© {{ new Date().getFullYear() }} Konstantinos Kalyvas</div>
      </v-container>
    </v-footer>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { useTheme } from 'vuetify'
const theme = useTheme()
const isDark = ref(true)
const navItems = [
  { label: 'Home', to: '/', icon: 'mdi-home-outline' },
  { label: 'Skills', to: '/skills', icon: 'mdi-code-braces' },
  { label: 'Projects', to: '/projects', icon: 'mdi-briefcase-outline' },
  { label: 'Contact', to: '/contact', icon: 'mdi-at' },
]
function toggleTheme() {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;900&display=swap');
html { scroll-behavior: smooth; }
body, .v-application { font-family: 'Inter', sans-serif !important; }

.page-enter-active { transition: opacity 0.3s ease, transform 0.3s ease; }
.page-leave-active { transition: opacity 0.15s ease; }
.page-enter-from { opacity: 0; transform: translateY(16px); }
.page-leave-to { opacity: 0; }

.nav-glass {
  backdrop-filter: blur(20px);
  background: rgba(15,15,15,0.75) !important;
  border-bottom: 1px solid rgba(125,211,252,0.05) !important;
}
.mobile-nav { border-top: 1px solid rgba(125,211,252,0.06) !important; }

.logo-box {
  width: 38px; height: 38px; border-radius: 10px;
  background: linear-gradient(135deg, #7dd3fc, #fda4af);
  display: flex; align-items: center; justify-content: center;
  transition: transform 0.2s;
}
.logo-box:hover { transform: scale(1.08); }
.logo-text { font-weight: 900; font-size: 15px; color: #0f0f0f; }

.gradient-text {
  background: linear-gradient(135deg, #7dd3fc, #fda4af);
  -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
}

/* Fade-in animation */
.fade-up { opacity: 0; transform: translateY(24px); animation: fadeUp 0.6s ease forwards; }
@keyframes fadeUp { to { opacity: 1; transform: translateY(0); } }
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
.delay-4 { animation-delay: 0.4s; }

.glow-card {
  position: relative; overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.glow-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 16px 48px rgba(125,211,252,0.06);
}
.glow-card::before {
  content: ''; position: absolute; inset: -1px; border-radius: inherit; padding: 1px;
  background: linear-gradient(135deg, rgba(125,211,252,0.2), rgba(253,164,175,0.15));
  -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
  -webkit-mask-composite: xor; mask-composite: exclude;
  opacity: 0; transition: opacity 0.3s ease;
}
.glow-card:hover::before { opacity: 1; }

@media (max-width: 960px) {
  .v-container { text-align: center; }
  .d-flex.flex-wrap, .d-flex.ga-3, .d-flex.ga-2, .d-flex.ga-4 { justify-content: center; }
}
</style>
