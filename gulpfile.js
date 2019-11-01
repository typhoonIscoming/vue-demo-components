// 根目录下面新建gulpfile.js的文件
// 同时下载gulp、 gulp.spritesmith
// npm i gulp 、 gulp.spritesmith --save-dev
const gulp = require('gulp')
const spriteSmith = require('gulp.spritesmith')
const path = require('path')
const fs = require('fs')
const mkdirp = require('mkdirp')

const icons = path.resolve(__dirname, 'src/assets/icons')

const spriteDest = path.resolve(__dirname, 'src/assets/sprites')

const scssDest = path.resolve(__dirname, 'src/theme/sprites')

gulp.task('default', () => {
    spriteFctory(icons)
    function spriteFctory(dir) {
        const files = fs.readdirSync(dir)
        const pngs = files.filter(item => /\.png/.test(item))
        console.log(pngs)
        if (pngs.length > 0) {
            const currentFileRelativePath = path.relative(icons, dir)
            console.log('currentFileRelativePath', currentFileRelativePath)
            const scssImagePath = path.resolve(spriteDest, currentFileRelativePath)
            console.log('scssImagePath', scssImagePath)
            const imageRelativePath = path.relative(__dirname, scssImagePath).replace(/^src\//ig, '~')
            console.log('imageRelativePath', imageRelativePath)
            const scssPath = path.resolve(scssDest, currentFileRelativePath)
            console.log('scssPath', scssPath)
            gulp.src(`${dir}/*.png`)
                .pipe(spriteSmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.scss',
                    padding: 4,
                    imgPath: `${imageRelativePath}/sprite.png`,
                    cssTemplate: 'gulp_templates/scss.2x.template.handlebars',
                    algorithms: 'diagonal'
                }))
                .pipe(gulp.dest(scssImagePath))
                .on('finish', () => {
                    const oldPath = path.join(scssImagePath, 'sprite.scss')
                    const newPath = path.join(scssPath, 'sprite.scss')
                    if (!fs.existsSync(scssPath)) mkdirp.sync(scssPath)
                    fs.renameSync(oldPath, newPath)
                })
        }
        files.forEach(item => {
            const currentPath = `${dir}/${item}`
            const info = fs.statSync(currentPath)
            if (info.isDirectory()) spriteFctory(currentPath)
        })
    }
})