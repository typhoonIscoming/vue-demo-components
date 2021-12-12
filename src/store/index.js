import Vue from 'vue'
import Vuex from 'vuex'

import draggable from './modules/draggable'
import dragList from './modules/dragList'
import dictionary from './modules/dictionary'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules: {
        drag: draggable,
        dragList,
        dictionary,
    },
})

export default store
