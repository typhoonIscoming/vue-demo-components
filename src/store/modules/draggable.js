import hashStringFactory from '@/utils/hashString';

const componentInfo = (config) => {
    const {
        componentType = '',
        componentId = '',
        x = 0,
        y = 0,
        width = 100,
        height = 100,
    } = config
    return {
        componentType,
        componentId,
        x,
        y,
        width,
        height,
    }
}

const initState = {
    components: [],
    currentActivitedComponentId: '',
    currentDragElementType: '',
}

const getters = {
    getComponents(state) {
        return state.components
    },
    getActivited(state) {
        return state.currentActivitedComponentId
    },
    // 获取当前拖得元素的type
    getCurrentDragType: state => state.currentDragElementType,
}

const actions = {
    addComponent({ commit }, obj) {
        // 生成 componentId
        const componentId = hashStringFactory(6)
        const initObj = {
            ...componentInfo({
                componentId,
                componentType: obj.componentType,
                x: obj.x,
                y: obj.y,
            }),
        }
        commit('ADD_COMPONENT_MUTATION', initObj)
    },
    deleteComponent({ commit }, componentId) {
        commit('DELETE_COMPONENT_MUTATION', componentId)
    },
    setActivitedComponent({ commit }, id) {
        commit('SET_ACTIVITED_COMPONENT_ID', id)
    },
    setDeactivitedComponent({ commit }) {
        commit('SET_DEACTIVITED_COMPONENT_ID')
    },
    // 设置当前拖动的元素的信息，这里主要是获取拖动元素的 componentType
    setCurrentDragElementType({ commit }, type) {
        commit('SET_CURRENT_DRAG_ELEMENT_TYPE', type)
    },
    // 改变当前组件的大小时，保存改变之后的大小
    setCurrentComponentSize({ commit }, data) {
        commit('SET_CURRENT_COMPONENT_SIZE', data)
    },
    setCurrentComponentLocation({ commit }, data) {
        commit('SET_CURRENT_COMPONENT_LOCATION', data)
    },
}

const mutations = {
    // 添加一个新的组件
    ADD_COMPONENT_MUTATION(state, obj) {
        state.components = state.components.concat([obj])
    },
    // 根据 componentId 删除组件
    DELETE_COMPONENT_MUTATION(state, id) {
        const index = state.components.findIndex(item => item.componentId === id)
        state.components.splice(index, 1)
    },
    SET_ACTIVITED_COMPONENT_ID(state, id) {
        state.currentActivitedComponentId = id
    },
    SET_DEACTIVITED_COMPONENT_ID(state) {
        state.currentActivitedComponentId = ''
    },
    SET_CURRENT_DRAG_ELEMENT_TYPE(state, type) {
        state.currentDragElementType = type
    },
    // 保存改变当前组件的大小
    SET_CURRENT_COMPONENT_SIZE(state, data) {
        const index = state.components.findIndex(item => item.componentId === state.currentActivitedComponentId)
        state.components[index] = Object.assign(state.components[index], { ...data })
    },
    SET_CURRENT_COMPONENT_LOCATION(state, data) {
        const index = state.components.findIndex(item => item.componentId === state.currentActivitedComponentId)
        state.components[index] = Object.assign(state.components[index], { ...data })
    },
}

export default {
    state: initState,
    getters,
    actions,
    mutations,
    namespaced: true,
}
