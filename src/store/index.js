import Vue from 'vue'
import Vuex from 'vuex'

import draggable from './modules/draggable'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        drag: draggable,
    },
})

export default store
