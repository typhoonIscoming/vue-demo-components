
const initState = {
    list: [
        { name: 'Jesus', id: 1 },
        { name: 'Paul', id: 2 },
        { name: 'Peter', id: 3 },
        { name: 'xie', id: 4 },
        { name: 'Tse', id: 5 },
        { name: 'hang', id: 6 },
    ],
}

const getters = {
    getList: state => state.list,
}

const actions = {
    addListItem({ commit }, item) {
        commit('ADD_LIST_ITEM', item)
    },
    updateList({ commit }, list) {
        commit('UPDATE_LIST', list)
    },
}

const mutations = {
    ADD_LIST_ITEM(state, item) {
        state.list.push(item)
    },
    UPDATE_LIST(state, list) {
        state.list = list
    },
}

export default {
    state: initState,
    getters,
    actions,
    mutations,
    namespaced: true,
}
