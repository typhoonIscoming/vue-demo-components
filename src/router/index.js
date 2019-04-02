import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: '/home',
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
      component: () => import('@/pages/pageB.vue')
    },
    {
      path: '/C',
      name: 'pageC',
      component: () => import('@/pages/pageC.vue')
    },
    {
      path: '/D',
      name: 'pageD',
      component: resolve => require([/* webpackChunkName: "pageA" */ '@/pages/pageD.vue'], resolve)
    },
  ]
})
