// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'

// 可拖拽组件
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import VueI18n from 'vue-i18n'
import  { ConfirmPlugin } from 'vux'

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
