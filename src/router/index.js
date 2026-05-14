import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'Home', component: () => import('@/views/HomePage.vue') },
  { path: '/skills', name: 'Skills', component: () => import('@/views/SkillsPage.vue') },
  { path: '/projects', name: 'Projects', component: () => import('@/views/ProjectsPage.vue') },
  { path: '/contact', name: 'Contact', component: () => import('@/views/ContactPage.vue') },
  { path: '/admin', name: 'Admin', component: () => import('@/views/AdminPage.vue') },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

