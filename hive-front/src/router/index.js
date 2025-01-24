import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import TestPage from '@/components/TestPage.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: App,
    },
    {
      path: '/test',
      name: 'test',      
      component: TestPage,
    },
    {
      path: '/__/auth/handler', 
      redirect: '/' 
    },
  ],
})

export default router
