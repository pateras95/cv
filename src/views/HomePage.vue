<template>
  <v-container style="max-width: 1100px;" class="py-16">
    <v-row align="center" style="min-height: 78vh;">
      <v-col cols="12" md="7">
        <div class="fade-up text-body-1 text-secondary font-weight-bold mb-4" style="letter-spacing: 1.5px;">HELLO WORLD 👋</div>
        <h1 class="fade-up delay-1 text-h2 text-md-h1 font-weight-black mb-4" style="line-height: 1.05;">
          I'm <span class="gradient-text">{{ content.about.name }}</span>
        </h1>
        <p class="fade-up delay-2 text-h5 font-weight-regular text-medium-emphasis mb-6">{{ content.about.title }}</p>
        <p class="fade-up delay-3 text-body-1 text-medium-emphasis mb-10" style="max-width: 520px; line-height: 1.9;">
          {{ content.about.bio }}
        </p>
        <div class="fade-up delay-4 d-flex flex-wrap ga-3 mb-8">
          <v-btn color="primary" size="x-large" rounded="pill" to="/projects" variant="flat" class="text-none px-10 font-weight-bold">
            View Projects
          </v-btn>
          <v-btn size="x-large" rounded="pill" to="/contact" variant="outlined" class="text-none px-10">Contact</v-btn>
          <v-btn v-if="content.about.resumeUrl" size="x-large" rounded="pill" :href="content.about.resumeUrl" target="_blank" variant="tonal" color="secondary" class="text-none px-8">
            <v-icon start>mdi-file-download-outline</v-icon> CV
          </v-btn>
        </div>
        <div class="fade-up delay-4 d-flex ga-3">
          <v-btn v-if="content.contact.github" icon variant="tonal" color="primary" :href="content.contact.github" target="_blank"><v-icon>mdi-github</v-icon></v-btn>
          <v-btn v-if="content.contact.linkedin" icon variant="tonal" color="primary" :href="content.contact.linkedin" target="_blank"><v-icon>mdi-linkedin</v-icon></v-btn>
        </div>
      </v-col>
      <v-col cols="12" md="5" class="text-center d-none d-md-block">
        <div class="fade-up delay-2 hero-glow">
          <v-avatar size="280" class="hero-avatar"><v-img :src="content.about.avatar" cover /></v-avatar>
        </div>
      </v-col>
    </v-row>

    <v-row class="fade-up delay-4 my-16 py-8" style="border-top: 1px solid rgba(125,211,252,0.08); border-bottom: 1px solid rgba(125,211,252,0.08);">
      <v-col v-for="stat in content.stats" :key="stat.label" cols="6" md="3">
        <div class="text-center">
          <div class="text-h3 font-weight-black gradient-text">{{ stat.value }}</div>
          <div class="text-body-2 text-medium-emphasis mt-2">{{ stat.label }}</div>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useContent } from '@/composables/useContent'
const { content } = useContent()
</script>

<style scoped>
.hero-glow { position: relative; display: inline-block; }
.hero-glow::before {
  content: ''; position: absolute; inset: -24px; border-radius: 50%;
  background: radial-gradient(circle, rgba(125,211,252,0.12) 0%, rgba(253,164,175,0.08) 50%, transparent 70%);
  animation: pulse 4s ease-in-out infinite;
}
.hero-avatar { position: relative; border: 3px solid rgba(125,211,252,0.3); }
@keyframes pulse { 0%,100% { transform: scale(1); opacity: 0.6; } 50% { transform: scale(1.08); opacity: 1; } }
</style>
