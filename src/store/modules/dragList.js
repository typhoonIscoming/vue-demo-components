
const initState = {
    list: [],
    activedItem: {},
}

const getters = {
    getList: state => state.list,
    getActivedItem: state => state.activedItem,
}

const actions = {
    addListItem({ commit }, payload) {
        commit('ADD_LIST_ITEM', payload)
    },
    updateList({ commit }, list) {
        commit('UPDATE_LIST', list)
        // console.log('list', list)
    },
    setActivedItem({ commit }, item) {
        commit('SET_ACTIVED_ITEM', item)
    },
    deleteItem({ commit }, index) {
        commit('DELETE_ITEM', index)
    },
}

const mutations = {
    ADD_LIST_ITEM(state, { item, index }) {
        if (index > -1) {
            state.list.splice(index + 1, 0, item)
        } else {
            state.list.push(item)
        }
    },
    UPDATE_LIST(state, list) {
        state.list = list
    },
    SET_ACTIVED_ITEM(state, item) {
        state.activedItem = item || {}
    },
    DELETE_ITEM(state, index) {
        state.list.splice(index, 1)
    },
}

export default {
    state: initState,
    getters,
    actions,
    mutations,
    namespaced: true,
}
