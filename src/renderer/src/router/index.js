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
    path: '/doc',
    name: 'Doc',
    component: () => import('@/views/DocPageView.vue')
  },
  {
    path: '/doclist',
    name: 'Doclsist',
    component: () => import('@/views/docs/DocListView.vue')
  },
  {
    path: '/docdot',
    name: 'Docdot',
    component: () => import('@/views/docs/DocDotView.vue')
  },
  {
    path: '/docmap',
    name: 'Docmap',
    component: () => import('@/views/docs/DocMapView.vue')
  },
  {
    path: '/readdoc',
    name: 'Readdoc',
    component: () => import('@/views/docs/ReadDocView.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
