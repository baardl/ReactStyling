var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require("path");
// const bourbon = require('node-bourbon').includePaths
// const neat = require('node-neat').includePaths

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: 'react-styling.bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: ['css-loader','sass-loader'],
                    publicPath: '/dist'
                })
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ['babel-loader'],
                enforce: 'pre'
            },
        ]
    },
    devServer: {
        contentBase: path.join(__dirname, "dist"),
        compress: true,
        stats: "errors-only",
        open: true
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'ReactStyling',
            hash: true,
            template: './src/index.html',
        }),
        new ExtractTextPlugin({
            filename: 'app.css',
            disable: false,
            allChunks: true
        }),
        // Hack to avoid loading all locales to moment
        new webpack.ContextReplacementPlugin(/^\.\/locale$/, context => {
            if (!/\/moment$/.test(context.context)) {
                return;
            }
            // context needs to be modified in place
            Object.assign(context, {
            // include only this locale
                regExp: /^\.\/(nb)/,
            })
        }),
    ]
}