import { reactive, watch } from 'vue'
import defaults from '@/data/defaults.json'

const STORAGE_KEY = 'portfolio-content'

function loadContent() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) return JSON.parse(stored)
  } catch (e) { /* ignore */ }
  return JSON.parse(JSON.stringify(defaults))
}

const content = reactive(loadContent())

export function useContent() {
  function saveContent() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content))
  }

  function resetContent() {
    const fresh = JSON.parse(JSON.stringify(defaults))
    Object.assign(content, fresh)
    localStorage.removeItem(STORAGE_KEY)
  }

  return { content, saveContent, resetContent }
}

