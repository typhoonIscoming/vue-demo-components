# 使用webpack.DllPlugin
```bash
在windows操作系统中，动态链接库（dll）是一种很常见的思想。一个dll包，就是一个很纯净的库，它本身不能运行，是用来给你的app或者业务代码引用的。
同样的 Webpack最近也新加入了这个功能：webpack.DllPlugin。 使用这个功能需要把打包过程分成两步：

```
- 打包dll包
- 引用dll包，打包业务代码

## 配置 dll.config.js:
```
const path = require('path');
const webpack = require('webpack');

const vendors = [
    'vue',
    'vue-i18n',
    // ...其它库
];

module.exports = {
    output: {
        path: path.resolve(__dirname, './public'),
        filename: '[name].js',
        library: '[name]',
    },
    entry: {
        "lib": vendors,
    },
    plugins: [
        new webpack.DllPlugin({
            path: 'manifest.json',
            name: '[name]',
            context: __dirname,
        }),
    ],
};
```
## webpack.DllPlugin 的选项中

- path 是 manifest.json 文件的输出路径，这个文件会用于后续的业务代码打包
- name 是dll暴露的对象名，要跟 output.library 保持一致；
- context 是解析包路径的上下文，这个要跟接下来配置的 webpack.config.js 一致。

## 配置 package.json :
```
"dll": "webpack --config dll.config.js"
```
## 运行
```
npm run dll
// 生成lib.js文件和manifest.json文件
```

## 接下来打包webpack.config.js:
```
const webpack = require('webpack');

module.exports = {
    devtool: 'eval-source-map',
    // externals: {
    //  'react': 'window.React',
    //  'react-dom': 'window.ReactDOM'
    // },
    entry: __dirname + "/app/main.js",
    output: {
        path: __dirname + "/public",
        filename: "bundle.js"
    },

    module: {
        loaders: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        }]
    },
    /********************************/
    plugins: [
        new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require('./manifest.json'),
        })
    ],
    /********************************/
    devServer: {} // Omitted for brevity
}
```

## webpack.DllReferencePlugin 的选项中：
- context 需要跟之前保持一致，这个用来指导 Webpack 匹配 manifest 中库的路径
- manifest 用来引入刚才输出的 manifest.json 文件
## 然后，在页面中引用lib.js和bundle.js就可以了。
