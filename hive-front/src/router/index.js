import { createRouter, createWebHistory } from 'vue-router'
import App from '@/App.vue'
import SignUp from '@/components/SignUp.vue'
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
      path: '/signup',
      name: 'signup',      
      component: SignUp,
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
