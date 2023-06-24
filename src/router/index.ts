import { createRouter, createWebHistory } from 'vue-router'
import { RouterName } from './const'
import { useStore } from '@/stores'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: RouterName.WECOME,
      component: () => import('@/views/WelcomeView.vue'),
      redirect: { name: RouterName.LOGIN },
      children: [
        {
          path: '/login',
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
      path: '/admin',
      name: RouterName.HOME,
      component: () => import('@/views/IndexView.vue'),
      redirect: { name: RouterName.HOME_DASHBOARDL },
      children: [
        {
          name: RouterName.HOME_DASHBOARDL,
          path: 'Dashboard',
          component: () => import('@/components/home/DashboardPage.vue'),
        },
        {
          name: RouterName.HOME_USER_QUERY,
          path: 'user/query',
          component: () => import('@/components/home/UserQuery.vue'),
        },
      ],
    },
  ],
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  if (store.auth.user != null && to.name?.toString().startsWith('welcome-'))

    next('/admin')

  else if (store.auth.user == null && to.fullPath.startsWith('/admin'))
    next('/')

  else if (to.matched.length === 0)
    next('/admin')

  else
    next()
})

export default router
