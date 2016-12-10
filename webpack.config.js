'use strict';
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const NODE_ENV = process.env.NODE_ENV || "development";
const webpack = require('webpack');
var autoprefixer = require('autoprefixer');

module.exports = {

    devtool: NODE_ENV == "development" ? "cheap-source-map" : null,
    context: __dirname + '/dev',
    entry: {
        index: "./js/main.js",
        style: "./css/bem.css",
        admin: "./js/admin_page.js"
    },
    output: {
        path: __dirname + '/public/',
        filename: "js/[name].js"
    },


    module: {
        loaders: [
            {
                test: /\.(js|jsx)$/,
                loader: 'babel',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.css/,
                loader: ExtractTextPlugin.extract('style', 'css!postcss',{publicPath: '../'})
            }
        ]
    },
    postcss: [ autoprefixer({ browsers: ['last 2 versions'] }) ],
    plugins : [
        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery"
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({
            NODE_ENV : JSON.stringify(NODE_ENV)
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "common"
        }),
        new ExtractTextPlugin('./styles/[name].css', {allChunks: true})
    ]

};
