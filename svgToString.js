const path = require('path')
const fs = require('fs')
// const mkdirp = require('mkdirp')
const readline = require('readline')

function resolve(dir) {
    return path.resolve(__dirname, 'src/assets', dir)
}

const writeFileName = resolve('tinyIcons.js')


const svgDir = resolve('svgsOutput'); // 存放svg的源文件
const fileContent = {}


function svgToString() {
    const files = fs.readdirSync(svgDir)
    const svgs = files.filter(item => /\.svg/.test(item))
    // console.log(svgs)
    if (svgs.length > 0) {
        svgs.forEach((filename) => {
            const filedir = path.join(svgDir, filename);
            const content = fs.readFileSync(filedir, 'utf-8');
            // console.log('content', content);
            fileContent[filename] = content
        })
    }
}

// console.log('writeFileName', writeFileName)
fs.stat(writeFileName, (err) => {
    if (err) {
        fs.writeFileSync(writeFileName, '')
    } else {
        fs.unlinkSync(writeFileName)
        fs.writeFileSync(writeFileName, '')
    }
    svgToString()
    let str = '\n'
    let tempstr = JSON.stringify(fileContent).slice(1, -1).split(',')
    // let tempstr = JSON.stringify(fileContent).replace(/\\/g, '')
    // console.log('===', tempstr)
    tempstr.forEach((item) => {
        const itemStr = item.split(/:(?=[^//])/)
        str += itemStr[0] + `:'${itemStr[1]}',\n`
    })
    // console.log(`{${str.replace(/\\/g, '').replace(/('"|"')/g, "'")}}`)
    const res = `{${str.replace(/\\/g, '').replace(/('"|"')/g, "'")}}`

    const writeString = "window.tinymce.IconManager.add('default', {\n icons: " + res + "\n})"

    fs.writeFileSync(writeFileName, writeString)
})

