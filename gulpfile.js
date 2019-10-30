const gulp = require('gulp')
const spriteSmith = require('gulp.spritesmith')
const fs = require('fs')
const path = require('path')
const mkdirp = require('mkdirp')

const icons = path.resolve(__dirname, 'src/assets/icons')
console.log('icon', icons)
const spriteImagePath = path.resolve(__dirname, 'src/assets/sprites')

const scssPath = path.resolve(__dirname, 'src/theme/sprites')

if (!fs.existsSync(spriteImagePath)) mkdirp.sync(spriteImagePath)
if (!fs.existsSync(scssPath)) mkdirp.sync(scssPath)

// algorithm: 'binary-tree',

gulp.task('sprite', () => {
    spriteFactory(icons)
    function spriteFactory(dir) {
        const files = fs.readdirSync(dir)
        const pngs = files.filter(item => /\.png/.test(item))
        console.log('pngs', pngs)
        if (pngs.length > 0) {
            // 获取文件路径及设置生成的精灵图片的路径和样式文件的路径
            const currentFileRelativePath = path.relative(icons, dir)
            console.log('currentFileRelativePath', currentFileRelativePath)
            // 生成的精灵图片的位置
            const spriteDestPath = path.resolve(spriteImagePath, currentFileRelativePath)
            const scssUsedImgFilePath = path.relative(__dirname, spriteDestPath).replace(/src\//ig, '~')
            console.log('scssUsedImgPath', scssUsedImgFilePath)
            const scssFilePath = path.resolve(scssPath, currentFileRelativePath)
            gulp.src(`${dir}/*.png`)
                .pipe(spriteSmith({
                    imgName: 'sprite.png',
                    cssName: 'sprite.scss',
                    padding: 4,
                    imgPath: `${scssUsedImgFilePath}/sprite.png`,
                    cssTemplate: 'gulp_templates/scss.2x.template.handlebars',
                    algorithm: 'diagonal',
                }))
                .pipe(gulp.dest(spriteDestPath))
                .on('finish', () => {
                    console.log('finish')
                    const oldPath = path.join(spriteDestPath, 'sprite.scss')
                    const newPath = path.join(scssFilePath, 'sprite.scss')
                    if (!fs.existsSync(scssFilePath)) mkdirp.sync(scssFilePath)
                    fs.renameSync(oldPath, newPath)
                })
        }
        files.forEach(item => {
            const currentPath = `${dir}/${item}`
            const info = fs.statSync(currentPath)
            if (info.isDirectory()) spriteFactory(currentPath)
        })
    }
})