// use require keyword to import by nodeJS module system
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

// use require keyword to export by nodeJS module system
module.exports = {
    mode: 'development',
    devtool: 'eval', // dev
    resolve: {
        extensions: ['.js','.vue'], // can drop extension in entry
    },
    entry: {
        app: path.join(__dirname, 'main.js'),
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
            },
            {
                test: /\.css$/,
                use: [
                    'vue-style-loader',
                    'css-loader',
                ]
            },
        ],
    },
    plugins: [
        new VueLoaderPlugin(),
    ],
    output: {
        publicPath: '/dist',
        filename: '[name].js',
        path: path.join(__dirname, 'dist'),
    }
};