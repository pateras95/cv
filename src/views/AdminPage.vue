<template>
  <v-container style="max-width: 900px;" class="py-10">
    <div v-if="!authenticated" class="d-flex align-center justify-center" style="min-height: 60vh;">
      <v-card variant="outlined" rounded="xl" class="pa-8" style="max-width: 380px; width: 100%;">
        <div class="text-center mb-6">
          <v-icon size="40" color="primary" class="mb-3">mdi-lock-outline</v-icon>
          <h2 class="text-h5 font-weight-bold">Admin</h2>
          <div class="text-caption text-medium-emphasis mt-1">v{{ appVersion }}</div>
        </div>
        <v-text-field v-model="codeInput" label="Access Code" variant="outlined" type="password" @keyup.enter="checkCode" :error-messages="codeError" />
        <v-btn color="primary" variant="flat" rounded="lg" class="text-none mt-2" block @click="checkCode">Enter</v-btn>
      </v-card>
    </div>

    <div v-if="authenticated">
      <div class="d-flex align-center justify-center mb-6">
        <h1 class="text-h5 font-weight-bold">Content Manager</h1>
        <v-chip size="x-small" variant="tonal" class="ml-3">v{{ appVersion }}</v-chip>
        <v-spacer />
        <v-btn variant="text" size="small" class="text-none" @click="authenticated = false"><v-icon start>mdi-logout</v-icon> Lock</v-btn>
      </div>

      <div class="d-flex flex-wrap ga-2 mb-8 justify-center">
        <v-btn v-for="t in tabs" :key="t" :variant="tab === t ? 'flat' : 'tonal'" :color="tab === t ? 'primary' : undefined" size="small" rounded="pill" class="text-none" @click="tab = t">{{ t }}</v-btn>
      </div>

      <!-- ABOUT -->
      <div v-show="tab === 'About'">
        <v-row justify="center">
          <v-col cols="12" md="8">
            <v-text-field v-model="content.about.name" label="Full Name" variant="outlined" class="mb-2" />
            <v-text-field v-model="content.about.title" label="Job Title" variant="outlined" class="mb-2" />
            <v-text-field v-model="content.about.tagline" label="Tagline" variant="outlined" class="mb-2" />
            <v-textarea v-model="content.about.bio" label="Bio" variant="outlined" rows="5" class="mb-2" />
            <label class="text-body-2 text-medium-emphasis">Profile Photo</label>
            <div class="d-flex align-center ga-3 mt-1 mb-3">
              <v-avatar size="48"><v-img :src="content.about.avatar" /></v-avatar>
              <v-text-field v-model="content.about.avatar" label="URL" variant="outlined" density="compact" hide-details style="flex:1;" />
              <v-btn variant="tonal" color="primary" size="small" class="text-none" @click="pickFile('avatar')"><v-icon>mdi-upload</v-icon></v-btn>
            </div>
            <label class="text-body-2 text-medium-emphasis">CV / Resume</label>
            <div class="d-flex align-center ga-3 mt-1">
              <v-text-field v-model="content.about.resumeUrl" label="URL" variant="outlined" density="compact" hide-details style="flex:1;" />
              <v-btn variant="tonal" color="primary" size="small" class="text-none" @click="pickFile('cv')"><v-icon>mdi-upload</v-icon></v-btn>
            </div>
            <input ref="fileInput" type="file" hidden @change="onFileChange" />
          </v-col>
          <v-col cols="12" md="4">
            <v-card variant="outlined" rounded="lg" class="pa-4 text-center">
              <div class="text-caption text-medium-emphasis mb-2">Preview</div>
              <v-avatar size="80" class="mb-2"><v-img :src="content.about.avatar" /></v-avatar>
              <div class="text-body-1 font-weight-bold">{{ content.about.name }}</div>
              <div class="text-caption text-medium-emphasis">{{ content.about.title }}</div>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- STATS -->
      <div v-show="tab === 'Stats'">
        <div class="text-center mb-4">
          <v-btn color="primary" variant="tonal" size="small" class="text-none" @click="content.stats.push({ value: '0', label: 'New' })"><v-icon start>mdi-plus</v-icon> Add</v-btn>
        </div>
        <v-row justify="center">
          <v-col v-for="(s, i) in content.stats" :key="'s'+i" cols="6" md="3">
            <v-card variant="outlined" rounded="lg" class="pa-4 text-center">
              <div class="text-h5 font-weight-black text-primary mb-1">{{ s.value }}</div>
              <div class="text-caption text-medium-emphasis mb-3">{{ s.label }}</div>
              <v-text-field v-model="s.value" label="Value" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-text-field v-model="s.label" label="Label" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-btn icon="mdi-close" size="x-small" variant="text" color="error" @click="content.stats.splice(i,1)" />
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- SKILLS -->
      <div v-show="tab === 'Skills'">
        <div class="d-flex align-center justify-center ga-3 mb-4">
          <v-btn color="primary" variant="tonal" size="small" class="text-none" @click="content.skills.push({name:'',icon:'mdi-code-tags',color:'#7dd3fc',category:'Other'})"><v-icon start>mdi-plus</v-icon> Add Skill</v-btn>
        </div>
        <p class="text-caption text-medium-emphasis mb-4 text-center">Drag to reorder · Click the icon button to pick an icon</p>
        <draggable v-model="content.skills" item-key="name" handle=".drag-handle">
          <template #item="{ element, index }">
            <v-card variant="outlined" rounded="lg" class="pa-3 mb-2">
              <v-row dense align="center">
                <v-col cols="auto"><v-icon class="drag-handle" style="cursor:grab;">mdi-drag</v-icon></v-col>
                <v-col cols="auto">
                  <v-btn variant="tonal" :color="element.color" size="small" rounded="lg" @click="openIconPicker(index)" class="text-none">
                    <v-icon>{{ element.icon }}</v-icon>
                  </v-btn>
                </v-col>
                <v-col><v-text-field v-model="element.name" label="Name" variant="outlined" density="compact" hide-details /></v-col>
                <v-col cols="auto">
                  <input type="color" v-model="element.color" style="width:32px;height:32px;border:none;border-radius:6px;cursor:pointer;background:transparent;" />
                </v-col>
                <v-col cols="3" sm="2"><v-text-field v-model="element.category" label="Category" variant="outlined" density="compact" hide-details /></v-col>
                <v-col cols="auto"><v-btn icon="mdi-close" variant="text" size="x-small" color="error" @click="content.skills.splice(index,1)" /></v-col>
              </v-row>
            </v-card>
          </template>
        </draggable>
      </div>

      <!-- BOOKS -->
      <div v-show="tab === 'Books'">
        <div class="text-center mb-4">
          <v-btn color="primary" variant="tonal" size="small" class="text-none" @click="content.books.push({title:'',author:'',cover:'',notes:''})"><v-icon start>mdi-plus</v-icon> Add</v-btn>
        </div>
        <v-row justify="center">
          <v-col v-for="(b, i) in content.books" :key="'b'+i" cols="12" sm="6" md="4">
            <v-card variant="outlined" rounded="lg" class="pa-4">
              <div class="d-flex align-start mb-3">
                <v-img v-if="b.cover" :src="b.cover" width="45" height="65" cover rounded class="mr-3 flex-shrink-0" />
                <div class="flex-grow-1"><div class="text-body-2 font-weight-bold">{{ b.title || 'New' }}</div><div class="text-caption text-medium-emphasis">{{ b.author }}</div></div>
                <v-btn icon="mdi-close" variant="text" size="x-small" color="error" @click="content.books.splice(i,1)" />
              </div>
              <v-text-field v-model="content.books[i].title" label="Title" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-text-field v-model="content.books[i].author" label="Author" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-text-field v-model="content.books[i].cover" label="Cover URL" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-text-field v-model="content.books[i].notes" label="Notes" variant="outlined" density="compact" hide-details />
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- CERTS -->
      <div v-show="tab === 'Certs'">
        <div class="text-center mb-4">
          <v-btn color="primary" variant="tonal" size="small" class="text-none" @click="content.certifications.push({title:'',issuer:'',date:'',url:''})"><v-icon start>mdi-plus</v-icon> Add</v-btn>
        </div>
        <v-row justify="center">
          <v-col v-for="(c, i) in content.certifications" :key="'c'+i" cols="12" sm="6">
            <v-card variant="outlined" rounded="lg" class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-icon color="secondary" class="mr-2" size="20">mdi-medal</v-icon>
                <span class="text-body-2 font-weight-bold text-truncate">{{ c.title || 'New' }}</span>
                <v-spacer />
                <v-btn icon="mdi-close" variant="text" size="x-small" color="error" @click="content.certifications.splice(i,1)" />
              </div>
              <v-text-field v-model="content.certifications[i].title" label="Title" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-text-field v-model="content.certifications[i].issuer" label="Issuer" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-row dense>
                <v-col cols="6"><v-text-field v-model="content.certifications[i].date" label="Date" variant="outlined" density="compact" hide-details /></v-col>
                <v-col cols="6"><v-text-field v-model="content.certifications[i].url" label="URL" variant="outlined" density="compact" hide-details /></v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- PROJECTS -->
      <div v-show="tab === 'Projects'">
        <div class="text-center mb-4">
          <v-btn color="primary" variant="tonal" size="small" class="text-none" @click="content.projects.push({title:'',description:'',image:'',tags:[],link:'',github:'',category:'Personal'})"><v-icon start>mdi-plus</v-icon> Add</v-btn>
        </div>
        <v-row justify="center">
          <v-col v-for="(p, i) in content.projects" :key="'p'+i" cols="12" sm="6" md="4">
            <v-card variant="outlined" rounded="lg" class="pa-4">
              <div class="d-flex align-center mb-3">
                <v-chip :color="p.category==='Work'?'primary':'secondary'" size="x-small" variant="flat" class="mr-2">{{ p.category }}</v-chip>
                <span class="text-body-2 font-weight-bold text-truncate">{{ p.title || 'New' }}</span>
                <v-spacer />
                <v-btn icon="mdi-close" variant="text" size="x-small" color="error" @click="content.projects.splice(i,1)" />
              </div>
              <v-img v-if="p.image" :src="p.image" height="70" cover rounded class="mb-3" />
              <v-text-field v-model="p.title" label="Title" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-textarea v-model="p.description" label="Description" variant="outlined" density="compact" rows="2" hide-details class="mb-2" />
              <v-text-field v-model="p.image" label="Image URL" variant="outlined" density="compact" hide-details class="mb-2" />
              <v-row dense>
                <v-col cols="6"><v-text-field v-model="p.link" label="Live URL" variant="outlined" density="compact" hide-details /></v-col>
                <v-col cols="6"><v-text-field v-model="p.github" label="GitHub" variant="outlined" density="compact" hide-details /></v-col>
              </v-row>
              <v-text-field v-model="p.category" label="Category (Work/Personal)" variant="outlined" density="compact" hide-details class="mt-2" />
              <v-combobox v-model="p.tags" label="Tags" variant="outlined" density="compact" hide-details multiple chips closable-chips class="mt-2" />
            </v-card>
          </v-col>
        </v-row>
      </div>

      <!-- CONTACT -->
      <div v-show="tab === 'Contact'">
        <v-row justify="center"><v-col cols="12" md="8">
          <v-text-field v-model="content.contact.email" label="Email" variant="outlined" prepend-inner-icon="mdi-email-outline" class="mb-2" />
          <v-text-field v-model="content.contact.github" label="GitHub" variant="outlined" prepend-inner-icon="mdi-github" class="mb-2" />
          <v-text-field v-model="content.contact.linkedin" label="LinkedIn" variant="outlined" prepend-inner-icon="mdi-linkedin" class="mb-2" />
          <v-text-field v-model="content.contact.twitter" label="Twitter" variant="outlined" prepend-inner-icon="mdi-twitter" class="mb-2" />
          <v-text-field v-model="content.contact.location" label="Location" variant="outlined" prepend-inner-icon="mdi-map-marker-outline" />
        </v-col></v-row>
      </div>

      <!-- THEME -->
      <div v-show="tab === 'Theme'">
        <v-row justify="center">
          <v-col v-for="tn in ['dark','light']" :key="tn" cols="12" md="6">
            <h3 class="text-body-1 font-weight-bold mb-4 text-capitalize">{{ tn }} Theme</h3>
            <div v-for="(val, key) in themeColors[tn]" :key="key" class="d-flex align-center ga-3 mb-3">
              <input type="color" :value="val" @input="updateColor(tn,key,$event.target.value)" style="width:36px;height:36px;border:none;border-radius:8px;cursor:pointer;background:transparent;" />
              <div><div class="text-body-2 font-weight-medium">{{ key }}</div><div class="text-caption text-medium-emphasis">{{ val }}</div></div>
            </div>
          </v-col>
        </v-row>
      </div>

      <!-- Save -->
      <v-card variant="flat" color="surface-variant" rounded="xl" class="pa-4 mt-8 d-flex align-center justify-center">
        <v-btn variant="text" color="error" size="small" class="text-none mr-4" @click="handleReset">Reset All</v-btn>
        <v-btn color="primary" variant="flat" rounded="lg" class="text-none px-8" @click="handleSave"><v-icon start>mdi-content-save</v-icon> Save</v-btn>
      </v-card>
    </div>

    <!-- Icon Picker Dialog -->
    <v-dialog v-model="iconDialog" max-width="600" scrollable>
      <v-card rounded="xl">
        <v-card-title class="d-flex align-center pa-4">
          <span class="text-body-1 font-weight-bold">Pick an Icon</span>
          <v-spacer />
          <v-btn icon="mdi-close" variant="text" size="small" @click="iconDialog = false" />
        </v-card-title>
        <div class="px-4 pb-2">
          <v-text-field v-model="iconSearch" label="Search icons..." variant="outlined" density="compact" hide-details prepend-inner-icon="mdi-magnify" clearable />
        </div>
        <v-card-text style="max-height: 400px;" class="pa-4">
          <div class="d-flex flex-wrap ga-2 justify-center">
            <v-btn v-for="ic in filteredIcons" :key="ic" :variant="iconPickTarget >= 0 && content.skills[iconPickTarget]?.icon === ic ? 'flat' : 'tonal'" :color="iconPickTarget >= 0 && content.skills[iconPickTarget]?.icon === ic ? 'primary' : undefined" icon size="42" rounded="lg" @click="selectIcon(ic)">
              <v-icon size="22">{{ ic }}</v-icon>
            </v-btn>
          </div>
          <div v-if="filteredIcons.length === 0" class="text-center text-medium-emphasis py-8">No icons match "{{ iconSearch }}"</div>
        </v-card-text>
      </v-card>
    </v-dialog>

    <v-snackbar v-model="snackbar" :color="snackbarColor" timeout="2000" location="bottom right">{{ snackbarText }}</v-snackbar>
  </v-container>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useContent } from '@/composables/useContent'
import { useTheme } from 'vuetify'
import draggable from 'vuedraggable'
import pkgJson from '../../package.json'

const appVersion = pkgJson.version
const ADMIN_CODE = import.meta.env.VITE_ADMIN_CODE || 'admin123'
const vuetifyTheme = useTheme()
const { content, saveContent, resetContent } = useContent()

const tab = ref('About')
const tabs = ['About','Stats','Skills','Books','Certs','Projects','Contact','Theme']
const snackbar = ref(false)
const snackbarText = ref('')
const snackbarColor = ref('primary')
const authenticated = ref(false)
const codeInput = ref('')
const codeError = ref('')
const fileInput = ref(null)
let fileTarget = 'avatar'

// Icon picker
const iconDialog = ref(false)
const iconSearch = ref('')
const iconPickTarget = ref(-1)

const allIcons = [
  'mdi-vuejs','mdi-react','mdi-angular','mdi-language-javascript','mdi-language-typescript',
  'mdi-language-python','mdi-language-java','mdi-language-csharp','mdi-language-cpp',
  'mdi-language-go','mdi-language-rust','mdi-language-swift','mdi-language-kotlin',
  'mdi-language-php','mdi-language-ruby','mdi-language-html5','mdi-language-css3',
  'mdi-nodejs','mdi-docker','mdi-kubernetes','mdi-git','mdi-github','mdi-gitlab',
  'mdi-aws','mdi-google-cloud','mdi-microsoft-azure','mdi-firebase',
  'mdi-database','mdi-api','mdi-graphql','mdi-linux','mdi-apple','mdi-windows',
  'mdi-tailwind','mdi-sass','mdi-webpack','mdi-npm','mdi-server','mdi-cloud',
  'mdi-shield-check','mdi-test-tube','mdi-cellphone','mdi-monitor','mdi-web',
  'mdi-robot','mdi-brain','mdi-chart-line','mdi-code-braces','mdi-code-tags',
  'mdi-console','mdi-terminal','mdi-electron-framework','mdi-unity',
  'mdi-gamepad-variant','mdi-cog','mdi-wrench','mdi-puzzle','mdi-flash',
  'mdi-earth','mdi-sitemap','mdi-lan','mdi-layers','mdi-palette',
  'mdi-camera','mdi-video','mdi-music','mdi-image','mdi-file-document',
  'mdi-chart-bar','mdi-chart-pie','mdi-trending-up','mdi-wifi',
  'mdi-bluetooth','mdi-nfc','mdi-chip','mdi-memory','mdi-cpu-64-bit',
  'mdi-application-braces','mdi-application-cog','mdi-bug','mdi-math-compass',
  'mdi-telescope','mdi-atom','mdi-flask','mdi-lightbulb','mdi-rocket',
  'mdi-tools','mdi-hammer','mdi-screwdriver','mdi-ab-testing',
]

const filteredIcons = computed(() => {
  if (!iconSearch.value) return allIcons
  const q = iconSearch.value.toLowerCase()
  return allIcons.filter(ic => ic.toLowerCase().includes(q))
})

function openIconPicker(skillIndex) {
  iconPickTarget.value = skillIndex
  iconSearch.value = ''
  iconDialog.value = true
}

function selectIcon(ic) {
  if (iconPickTarget.value >= 0 && content.skills[iconPickTarget.value]) {
    content.skills[iconPickTarget.value].icon = ic
  }
  iconDialog.value = false
}

const themeColors = reactive({
  dark: { primary: vuetifyTheme.themes.value.dark.colors.primary, secondary: vuetifyTheme.themes.value.dark.colors.secondary, background: vuetifyTheme.themes.value.dark.colors.background, surface: vuetifyTheme.themes.value.dark.colors.surface },
  light: { primary: vuetifyTheme.themes.value.light.colors.primary, secondary: vuetifyTheme.themes.value.light.colors.secondary, background: vuetifyTheme.themes.value.light.colors.background, surface: vuetifyTheme.themes.value.light.colors.surface },
})

function updateColor(t, k, v) { themeColors[t][k] = v; vuetifyTheme.themes.value[t].colors[k] = v }
function checkCode() { codeInput.value === ADMIN_CODE ? (authenticated.value = true, codeError.value = '') : (codeError.value = 'Invalid code') }

function pickFile(type) { fileTarget = type; fileInput.value?.click() }
function onFileChange(e) {
  const f = e.target.files?.[0]; if (!f) return
  if (fileTarget === 'avatar') {
    const r = new FileReader(); r.onload = ev => { content.about.avatar = ev.target.result }; r.readAsDataURL(f)
  } else {
    content.about.resumeUrl = URL.createObjectURL(f)
    snackbarText.value = 'CV loaded (session only)'; snackbarColor.value = 'info'; snackbar.value = true
  }
  e.target.value = ''
}

function handleSave() { saveContent(); localStorage.setItem('portfolio-theme', JSON.stringify(themeColors)); snackbarText.value = '✓ Saved'; snackbarColor.value = 'success'; snackbar.value = true }
function handleReset() { resetContent(); localStorage.removeItem('portfolio-theme'); snackbarText.value = 'Reset'; snackbarColor.value = 'warning'; snackbar.value = true }
</script>

<style scoped>
:deep(.v-field__input),
:deep(.v-field__field),
:deep(.v-label) {
  color: rgb(var(--v-theme-on-surface)) !important;
}
</style>
