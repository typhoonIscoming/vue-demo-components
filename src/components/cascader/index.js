import Main from './main';

const inst = (Vue) => {
    Vue.components('Cascader', Main)
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    inst(window.Vue);
}

export default Main

export const install = inst
