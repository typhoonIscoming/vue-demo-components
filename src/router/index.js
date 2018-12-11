import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/home/',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      redirect: {
        name: 'pageA'
      },
    },
    {
      path: '/A',
      name: 'pageA',
      component: () => import('@/pages/pageA')
    },
    {
      path: '/B',
      name: 'pageB',
      component: () => import('@/pages/pageB')
    },
    {
      path: '/C',
      name: 'pageC',
      component: () => import('@/pages/pageC')
    },
    {
      path: '/D',
      name: 'pageD',
      component: () => import('@/pages/pageD')
    },
  ]
})
