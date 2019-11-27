import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

import draggable from './modules/draggable'


const store = new Vuex.Store({
    modules: {
        drag: draggable,
    },
})

export default store