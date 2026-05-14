<template>
  <v-container style="max-width: 1100px;" class="py-16">
    <h1 class="fade-up text-h3 font-weight-black mb-2">Get in Touch</h1>
    <p class="fade-up delay-1 text-body-1 text-medium-emphasis mb-12">Let's connect</p>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <div class="d-flex flex-column align-center ga-6">
          <!-- Email -->
          <v-card v-if="content.contact.email" color="surface" rounded="xl" class="pa-5 glow-card w-100" style="border: 1px solid rgba(125,211,252,0.06);">
            <a :href="'mailto:' + content.contact.email" class="d-flex align-center text-decoration-none" style="color: inherit;">
              <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
                <v-icon>mdi-email-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">Email</div>
                <div class="text-body-1 font-weight-medium">{{ content.contact.email }}</div>
              </div>
              <v-spacer />
              <v-icon color="primary" size="20">mdi-arrow-top-right</v-icon>
            </a>
          </v-card>

          <!-- GitHub -->
          <v-card v-if="content.contact.github" color="surface" rounded="xl" class="pa-5 glow-card w-100" style="border: 1px solid rgba(125,211,252,0.06);">
            <a :href="content.contact.github" target="_blank" class="d-flex align-center text-decoration-none" style="color: inherit;">
              <v-avatar color="primary" variant="tonal" size="48" class="mr-4">
                <v-icon>mdi-github</v-icon>
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">GitHub</div>
                <div class="text-body-1 font-weight-medium">{{ content.contact.github.replace('https://', '') }}</div>
              </div>
              <v-spacer />
              <v-icon color="primary" size="20">mdi-arrow-top-right</v-icon>
            </a>
          </v-card>

          <!-- LinkedIn -->
          <v-card v-if="content.contact.linkedin" color="surface" rounded="xl" class="pa-5 glow-card w-100" style="border: 1px solid rgba(125,211,252,0.06);">
            <a :href="content.contact.linkedin" target="_blank" class="d-flex align-center text-decoration-none" style="color: inherit;">
              <v-avatar color="secondary" variant="tonal" size="48" class="mr-4">
                <v-icon>mdi-linkedin</v-icon>
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">LinkedIn</div>
                <div class="text-body-1 font-weight-medium">{{ content.contact.linkedin.replace('https://', '') }}</div>
              </div>
              <v-spacer />
              <v-icon color="primary" size="20">mdi-arrow-top-right</v-icon>
            </a>
          </v-card>

          <!-- Location -->
          <v-card v-if="content.contact.location" color="surface" rounded="xl" class="pa-5 w-100" style="border: 1px solid rgba(125,211,252,0.06);">
            <div class="d-flex align-center">
              <v-avatar color="accent" variant="tonal" size="48" class="mr-4">
                <v-icon>mdi-map-marker-outline</v-icon>
              </v-avatar>
              <div>
                <div class="text-caption text-medium-emphasis">Location</div>
                <div class="text-body-1 font-weight-medium">{{ content.contact.location }}</div>
              </div>
            </div>
          </v-card>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { useContent } from '@/composables/useContent'
const { content } = useContent()
</script>
