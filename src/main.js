// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 可拖拽组件
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.use(VueAwesomeSwiper)

// 工程化引入所有的组件
import webpackComponents from '@/webpackComponents'
Vue.use(webpackComponents)

import VueI18n from 'vue-i18n'
import { ConfirmPlugin } from 'vux'

Vue.use(ConfirmPlugin)
Vue.use(VueI18n)

Vue.component('vue-draggable-resizable', VueDraggableResizable)

const i18n = new VueI18n({
    locale: 'zh-CN',
    messages: {
        'en': require('@/language/en'),
        'zh-CN': require('@/language/zh-CN')
    },
})



Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    i18n,
    store,
    components: { App },
    template: '<App/>'
})
