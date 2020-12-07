import Vue from 'vue'
import Vuex from 'vuex'

import draggable from './modules/draggable'
import dragList from './modules/dragList'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        drag: draggable,
        dragList,
    },
})

export default store
