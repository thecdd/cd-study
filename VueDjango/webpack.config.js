var path = require("path");
var webpack = require('webpack');
var BundleTracker = require('webpack-bundle-tracker');

module.exports = {
    context: __dirname,
    entry: {
        freeMapMain:'./modules/free_map/app/main/main.js',
        dashboardMain: './modules/dashboard/app/main/main.js',
        index: './modules/index/app/index/index.js'
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
        new BundleTracker({filename: './webpack-stats.json'}),
        new webpack.ProvidePlugin({
          $: "jquery",
          jQuery: "jquery",
          "window.jQuery": "jquery"
        })
    ]
}