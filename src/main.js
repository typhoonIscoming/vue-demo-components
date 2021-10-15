import './public-path'
/* eslint-disable import/first */
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import 'babel-polyfill'
import Vue from 'vue'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

// 可拖拽组件
import VueDraggableResizable from 'vue-draggable-resizable';
import 'vue-draggable-resizable/dist/VueDraggableResizable.css'

import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

// 工程化引入所有的组件
import webpackComponents from '@/webpackComponents'

import VueI18n from 'vue-i18n'
import { ConfirmPlugin } from 'vux'

import './components/svg'

import App from './App'
import router from './router'
import store from './store'

import './assets/styles/index.css';

Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper)
Vue.use(webpackComponents)

Vue.use(ConfirmPlugin)
Vue.use(VueI18n)

Vue.component('vue-draggable-resizable', VueDraggableResizable)

const i18n = new VueI18n({
    locale: 'zh-CN',
    messages: {
        en: require('@/language/en'), // eslint-disable-line
        'zh-CN': require('@/language/zh-CN'), // eslint-disable-line
    },
})


Vue.config.productionTip = false

let root = null;
/* eslint-disable no-new */
const microController = {
    initialApp: () => {
        window.__globalVueEntity = new Vue({
            router,
            i18n,
            store,
            components: { App },
            template: '<App/>',
        })
        return window.__globalVueEntity
    },
    microAppRender: (props) => {
        root.$mount('#root')
        console.log('微应用的子应用渲染页面', props)
    },
    injectMainAppDate: (props) => {
        console.log('微应用框架传递的数据', props)
    },
}

// 不在微应用框架环境中
if (!window.__POWERED_BY_QIANKUN__) {
    console.log('not in microapplication')
    root = microController.initialApp()
    microController.microAppRender()
}

export async function bootstrap() {
    console.log('vue app bootstraped');
}

export async function mount(props) {
    console.log('props from main framework', props.data);
    root = microController.initialApp()
    microController.injectMainAppDate(props)
    microController.microAppRender(props)
}

export async function unmount() {
    root.$destroy();
    root.$el.innerHTML = '';
    root = undefined;
}
