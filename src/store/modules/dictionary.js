
const initState = {
    list: [],
}


const getters = {
    getList: state => state.list,
}

const actions = {
    setState({ commit }, data) {
        commit('SET_STATE', data)
    },
}

const mutations = {
    SET_STATE(state, data = {}) {
        const { name = '', list = [] } = data
        if (state[name]) {
            state[name] = list;
        }
    },
}

export default {
    state: initState,
    getters,
    actions,
    mutations,
    namespaced: true,
}
