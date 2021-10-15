import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router)

export default new Router({
    mode: 'hash',
    base: '/microvue/',
    linkActiveClass: 'is-active',
    routes: [
        {
            path: '/',
            name: 'HelloWorld',
            redirect: {
                name: 'pageA',
            },
        },
        {
            path: '/A',
            name: 'pageA',
            component: () => import(/* webpackChunkName: "pageA" */ '@/pages/pageA'),
        },
        {
            path: '/subA',
            name: 'subA',
            component: () => import(/* webpackChunkName: "subA" */ '@/pages/subA'),
        },
        {
            path: '/subAa',
            name: 'subAa',
            component: () => import(/* webpackChunkName: "subAa" */ '@/pages/subAa'),
        },
        {
            path: '/draggable',
            name: 'draggable',
            component: () => import(/* webpackChunkName: "draggable" */ '@/pages/draggable'),
        },
        {
            path: '/B',
            name: 'pageB',
            component: () => import(/* webpackChunkName: "pageB" */ '@/pages/pageB.vue'),
        },
        {
            path: '/subB',
            name: 'subB',
            component: () => import(/* webpackChunkName: "subB" */ '@/pages/subB.vue'),
        },
        {
            path: '/C',
            name: 'pageC',
            component: () => import(/* webpackChunkName: "pageC" */ '@/pages/pageC.vue'),
        },
        {
            path: '/subC',
            name: 'subC',
            component: () => import(/* webpackChunkName: "subC" */ '@/pages/subC.vue'),
        },
        {
            path: '/D',
            name: 'pageD',
            component: () => import(/* webpackChunkName: "pageD" */ '@/pages/pageD.vue'),
        },
        {
            path: '/E',
            name: 'pageE',
            component: () => import(/* webpackChunkName: "pageE" */ '@/pages/pageE.vue'),
        },
        {
            path: '/F',
            name: 'pageF',
            component: () => import(/* webpackChunkName: "pageF" */ '@/pages/pageF.vue'),
        },
    ],
})
