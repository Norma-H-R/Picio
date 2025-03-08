import { createApp } from 'vue'
import App from './App.vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { createPinia } from 'pinia'
import axios from 'axios'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    { path: '/', component: () => import('./views/HomeView.vue') },
    { path: '/about', component: () => import('./views/AboutView.vue') }
  ]
})

const pinia = createPinia()

const app = createApp(App)
app.use(router)
app.use(pinia)

app.config.globalProperties.$http = axios.create({
  baseURL: process.env.VITE_API_URL,
  timeout: 5000
})

app.mount('#app')