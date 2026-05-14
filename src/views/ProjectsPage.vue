<template>
  <v-container style="max-width: 1100px;" class="py-16">
    <h1 class="fade-up text-h3 font-weight-black mb-2">Projects</h1>
    <p class="fade-up delay-1 text-body-1 text-medium-emphasis mb-8">Things I've built</p>

    <div class="fade-up delay-2 d-flex ga-2 mb-10">
      <v-btn :variant="selectedCat === 'All' ? 'flat' : 'outlined'" :color="selectedCat === 'All' ? 'primary' : undefined" rounded="pill" class="text-none" @click="selectedCat = 'All'">All</v-btn>
      <v-btn :variant="selectedCat === 'Work' ? 'flat' : 'outlined'" :color="selectedCat === 'Work' ? 'primary' : undefined" rounded="pill" class="text-none" @click="selectedCat = 'Work'"><v-icon start size="18">mdi-briefcase-outline</v-icon> Work</v-btn>
      <v-btn :variant="selectedCat === 'Personal' ? 'flat' : 'outlined'" :color="selectedCat === 'Personal' ? 'secondary' : undefined" rounded="pill" class="text-none" @click="selectedCat = 'Personal'"><v-icon start size="18">mdi-lightbulb-outline</v-icon> Personal</v-btn>
    </div>

    <v-row>
      <v-col v-for="(project, i) in filteredProjects" :key="project.title + i" cols="12" sm="6" lg="4">
        <v-card rounded="2xl" class="project-card glow-card h-100 fade-up" :style="{ animationDelay: `${i * 0.08}s` }" color="surface">
          <!-- Device previews -->
          <div class="devices-wrap pa-4 pb-0">
            <!-- Desktop -->
            <div class="desktop-frame">
              <div class="desktop-bar">
                <span class="dot" style="background:#ff5f57"></span>
                <span class="dot" style="background:#ffbd2e"></span>
                <span class="dot" style="background:#28c840"></span>
              </div>
              <v-img :src="project.image" height="130" cover class="desktop-screen" />
            </div>
            <!-- Mobile -->
            <div class="mobile-frame">
              <div class="mobile-notch"></div>
              <v-img :src="project.image" cover class="mobile-screen" />
            </div>
          </div>

          <v-card-text class="pa-5 pt-3">
            <div class="d-flex align-center mb-2">
              <v-chip :color="project.category === 'Work' ? 'primary' : 'secondary'" size="x-small" variant="flat" class="mr-2">{{ project.category }}</v-chip>
              <h3 class="text-body-1 font-weight-bold">{{ project.title }}</h3>
            </div>
            <p class="text-body-2 text-medium-emphasis mb-4" style="line-height: 1.6; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">
              {{ project.description }}
            </p>
            <div class="d-flex flex-wrap ga-1 mb-4">
              <v-chip v-for="tag in project.tags" :key="tag" size="small" variant="tonal" color="primary" class="text-none">{{ tag }}</v-chip>
            </div>
            <div class="d-flex ga-2">
              <v-btn v-if="project.link" :href="project.link" target="_blank" size="x-small" variant="flat" color="primary" rounded="pill" class="text-none"><v-icon start size="12">mdi-open-in-new</v-icon> Live</v-btn>
              <v-btn v-if="project.github" :href="project.github" target="_blank" size="x-small" variant="outlined" rounded="pill" class="text-none"><v-icon start size="12">mdi-github</v-icon> Code</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContent } from '@/composables/useContent'
const { content } = useContent()
const selectedCat = ref('All')
const filteredProjects = computed(() => {
  if (selectedCat.value === 'All') return content.projects
  return content.projects.filter(p => p.category === selectedCat.value)
})
</script>

<style scoped>
.project-card {
  border: 1px solid rgba(125,211,252,0.06);
  overflow: hidden;
}

.devices-wrap {
  position: relative;
  min-height: 160px;
}

/* Desktop mockup */
.desktop-frame {
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid rgba(125,211,252,0.1);
  background: rgb(var(--v-theme-surface-variant));
}
.desktop-bar {
  display: flex;
  align-items: center;
  padding: 5px 8px;
  gap: 4px;
  background: rgba(0,0,0,0.3);
}
.dot { width: 6px; height: 6px; border-radius: 50%; }

/* Mobile mockup */
.mobile-frame {
  position: absolute;
  bottom: -25px;
  right: 7px;
  width: 52px;
  height: 90px;
  border-radius: 10px;
  overflow: hidden;
  border: 2px solid rgba(125,211,252,0.15);
  background: rgb(var(--v-theme-surface));
  box-shadow: 0 8px 24px rgba(0,0,0,0.3);
  z-index: 2;
  transition: transform 0.3s ease;
}
.project-card:hover .mobile-frame {
  transform: translateY(-4px);
}
.mobile-notch {
  width: 20px; height: 3px;
  background: rgba(128,128,128,0.3);
  border-radius: 2px;
  margin: 4px auto 2px;
}
.mobile-screen {
  height: calc(100% - 9px);
}
</style>
