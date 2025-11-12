import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import User from '@/views/user/User.vue'
import Test from '@/views/test/Test.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true },
      children: [
        {
          path: '/user',
          name: 'User',
          component: User,
          meta: { requiresAuth: true }
        },
        {
          path: '/test',
          name: 'Test',
          component: Test,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ],
})

router.beforeEach((to, from, next) => {
  // 假设用 localStorage 存储登录状态
  const isLoggedIn = !!localStorage.getItem('token')
  // 需要登录的页面可以用 meta 字段标记
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login' }) // 跳转到登录页
  } else {
    next()
  }
})
export default router
