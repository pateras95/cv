<template>
  <v-container style="max-width: 1100px;" class="py-16">
    <h1 class="fade-up text-h3 font-weight-black mb-2">Skills & Knowledge</h1>
    <p class="fade-up delay-1 text-body-1 text-medium-emphasis mb-14">My toolkit, credentials, and learning journey</p>

    <!-- Tech Stack -->
    <section class="mb-16">
      <div class="d-flex align-center flex-wrap ga-3 mb-8">
        <h2 class="text-h5 font-weight-bold mr-auto">Tech Stack</h2>
        <v-chip v-for="cat in categories" :key="cat" :variant="selectedCategory === cat ? 'flat' : 'text'" :color="selectedCategory === cat ? 'primary' : undefined" size="small" @click="selectedCategory = cat" class="text-none">{{ cat }}</v-chip>
      </div>
      <div class="d-flex flex-wrap ga-3">
        <div v-for="skill in filteredSkills" :key="skill.name" class="skill-pill">
          <v-icon :color="skill.color" size="20" class="mr-2">{{ skill.icon }}</v-icon>
          <span class="text-body-1 font-weight-medium">{{ skill.name }}</span>
        </div>
      </div>
    </section>

    <!-- Certifications -->
    <section class="mb-16">
      <h2 class="text-h5 font-weight-bold mb-8">Certifications</h2>
      <v-row>
        <v-col v-for="cert in content.certifications" :key="cert.title" cols="12" sm="6" md="4">
          <v-card color="surface" rounded="xl" class="pa-5 h-100 glow-card" style="border: 1px solid rgba(125,211,252,0.06);">
            <v-chip size="x-small" variant="flat" color="secondary" class="mb-3">{{ cert.date }}</v-chip>
            <div class="text-body-1 font-weight-bold mb-1">{{ cert.title }}</div>
            <div class="text-body-2 text-medium-emphasis">{{ cert.issuer }}</div>
          </v-card>
        </v-col>
      </v-row>
      <v-btn v-if="content.contact.linkedin" :href="content.contact.linkedin" target="_blank" variant="tonal" color="primary" rounded="pill" class="text-none mt-6 px-6">
        <v-icon start size="18">mdi-linkedin</v-icon> View on LinkedIn
      </v-btn>
    </section>

    <!-- Reading List -->
    <section>
      <h2 class="text-h5 font-weight-bold mb-8">Reading List</h2>
      <div class="books-grid">
        <div v-for="book in content.books" :key="book.title" class="book-item">
          <div class="book-3d">
            <v-img :src="book.cover" cover class="book-cover-img" />
          </div>
          <div class="mt-3">
            <div class="text-body-2 font-weight-bold" style="line-height: 1.3;">{{ book.title }}</div>
            <div class="text-caption text-medium-emphasis">{{ book.author }}</div>
            <div v-if="book.notes" class="text-caption text-medium-emphasis mt-1" style="opacity: 0.7; font-style: italic;">{{ book.notes }}</div>
          </div>
        </div>
      </div>
    </section>
  </v-container>
</template>

<script setup>
import { ref, computed } from 'vue'
import { useContent } from '@/composables/useContent'

const { content } = useContent()
const selectedCategory = ref('All')

const categories = computed(() => ['All', ...new Set(content.skills.map(s => s.category))])
const filteredSkills = computed(() => {
  if (selectedCategory.value === 'All') return content.skills
  return content.skills.filter(s => s.category === selectedCategory.value)
})
</script>

<style scoped>
.skill-pill {
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  border-radius: 100px;
  border: 1px solid rgba(125,211,252,0.08);
  background: rgb(var(--v-theme-surface));
  transition: all 0.25s ease;
}
.skill-pill:hover {
  border-color: rgba(125,211,252,0.4);
  transform: translateY(-3px);
  box-shadow: 0 8px 24px rgba(125,211,252,0.08);
}

/* Books modern 3D grid */
.books-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 24px;
}

.book-item {
  text-align: center;
  transition: transform 0.3s ease;
}
.book-item:hover {
  transform: translateY(-6px);
}

.book-3d {
  width: 100%;
  aspect-ratio: 2/3;
  border-radius: 8px;
  overflow: hidden;
  box-shadow:
    4px 4px 12px rgba(0,0,0,0.3),
    -2px 0 6px rgba(125,211,252,0.06);
  transition: box-shadow 0.3s ease, transform 0.3s ease;
  transform: perspective(800px) rotateY(-3deg);
}
.book-item:hover .book-3d {
  transform: perspective(800px) rotateY(0deg);
  box-shadow:
    8px 8px 24px rgba(0,0,0,0.4),
    0 0 20px rgba(125,211,252,0.1);
}
.book-cover-img {
  width: 100%;
  height: 100%;
}
</style>
