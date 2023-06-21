import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from '@/stores'
import { RouterName } from './const'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouterName.WECOME,
      component: () => import('@/views/WelcomeView.vue'),
      children: [
        {
          path: '',
          name: RouterName.LOGIN,
          component: () => import('@/components/welcome/LoginPage.vue'),
        }, {
          path: 'register',
          name: RouterName.REGISTER,
          component: () => import('@/components/welcome/RegisterPage.vue'),
        }, {
          path: 'forget',
          name: RouterName.FORGET_PASSWORD,
          component: () => import('@/components/welcome/ForgetPage.vue'),
        },
      ],
    }, {
      path: '/index',
      name: RouterName.HOME,
      component: () => import('@/views/IndexView.vue'),
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (store.auth.user != null && to.name?.toString().startsWith('welcome-'))
    next('/index')

  else if (store.auth.user == null && to.fullPath.startsWith('/index'))
    next('/')

  else if (to.matched.length === 0)
    next('/index')

  else
    next()
})

export default router
