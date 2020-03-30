
// 第二参数ture表示是否查找这个目录下的子目录
const requiredComponents = require.context('./', false, /\.vue$/);

console.log('requiredComponents', requiredComponents)
function upperFileName(fileName) {
    return fileName.charAt(0) + fileName.slice(1)
}

const install = (Vue) => {
    // 通过这种方式也能管理routes，根据业务来将很大的routes分割成多个文件，这样方便维护
    // 拿到引入的文件的所有的name
    requiredComponents.keys().forEach(fileName => {
        // 此时的filename是一个带相对路径的字符串：./childOne.vue
        const realFileName = fileName.replace(/\.\//, '').replace(/\.\w+$/, '');
        const formatterFileName = upperFileName(realFileName)
        console.log('filename', fileName)
        // 获得组件对象
        const componentInstance = requiredComponents(fileName)
        console.log('componentInstance', componentInstance)
        Vue.component(formatterFileName, componentInstance.default || componentInstance)
    });
}


export default {
    install
}
