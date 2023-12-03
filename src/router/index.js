import { createRouter, createWebHistory } from 'vue-router'
import LogIn from '../views/LogIn.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'LogIn',
      component: LogIn
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: () => import('../views/SignUp.vue')
    },
    {
      path: '/ExpenseTracker',
      name: 'ExpenseTracker',
      component: () => import('../views/ExpenseTracker.vue'),
    },
  ]
})

export default router
