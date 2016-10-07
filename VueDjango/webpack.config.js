var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: {
        main:'./FreeMap/app/main/main.js'
    },
    output: {
        path: path.resolve('./static/bundles/'),
        filename: "[name]-[hash].js"
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: "babel"
            },
            {
                test:/\.css$/,
                loader: "style!css"
            },
            {
                test:/\.(png)|(jpg)|(svg)$/,
                loader: "url?limit=50000"
            }
        ]
    },
    plugins: [
        new BundleTracker({filename: './webpack-stats.json'})
    ]
}