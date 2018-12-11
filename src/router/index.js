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
      component: resolve => require([/* webpackChunkName: "pageA" */ '@/pages/pageB.vue'], resolve)
    },
    {
      path: '/C',
      name: 'pageC',
      component: resolve => require([/* webpackChunkName: "pageA" */ '@/pages/pageC.vue'], resolve)
    },
    {
      path: '/D',
      name: 'pageD',
      component: resolve => require([/* webpackChunkName: "pageA" */ '@/pages/pageD.vue'], resolve)
    },
  ]
})
