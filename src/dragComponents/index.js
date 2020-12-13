
// 处理首字母大写 abc => Abc
function upperFileName(str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
}

const requireComponent = require.context('./', true, /\.vue$/)
const install = function install(Vue) {
    requireComponent.keys().forEach((filePath) => {
        const file = requireComponent(filePath)
        const index = filePath.lastIndexOf('/')
        const fileName = filePath.substring(index + 1)
        const componentName = upperFileName(fileName.replace(/\.\//, '').replace(/\.\w+$/, ''))
        Vue.component(componentName, file.default || file) // 动态注册该目录下的所有.vue文件
    })
}

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
    install(window.Vue)
}
export default {
    install,
}
