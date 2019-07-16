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