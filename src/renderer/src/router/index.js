import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('@/views/AboutView.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('@/views/SettingsView.vue')
  },
  {
    path: '/favorites',
    name: 'Favorites',
    component: () => import('@/views/FavoritesView.vue')
  },
  {
    path: '/docs',
    name: 'docs',
    component: () => import('@/views/DocPageView.vue')
  },
  {
    path: '/docslsit',
    name: 'docslsit',
    component: () => import('@/views/docs/DocListView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
