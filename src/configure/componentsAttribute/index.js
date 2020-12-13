
const requireconfigure = require.context('./attributesConfig', false, /\.js$/)
const attribute = {}

requireconfigure.keys().forEach((filePath) => {
    const file = requireconfigure(filePath)
    const index = filePath.lastIndexOf('/')
    const fileName = filePath.substring(index + 1)
    const name = fileName.replace(/\.\w+$/, '')
    attribute[name] = file.default
})


export const componentAttribute = attribute
