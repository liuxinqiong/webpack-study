var cleanWebpackPlugin = require('clean-webpack-plugin')
var htmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var purifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
var path = require('path')
var webpack = require('webpack')
// 打包结果分析
var webpackBundleAnalyzer = require('webpack-bundle-analyzer').BundleAnalyzerPlugin

module.exports = {
    plugins: [
        new cleanWebpackPlugin(['dist'], {
            root: path.resolve(__dirname, '../'),
            verbose: true
        }),

        new webpack.NamedChunksPlugin(),

        new webpack.NamedModulesPlugin(),

        new webpack.optimize.UglifyJsPlugin(),

        // plugins 也是有顺序的，这里vendor要在mainifest之前，否则会找不到vendor
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        }),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new htmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new purifyCSS({
            paths: glob.sync([
                path.join(__dirname, '../*.html'),
                path.join(__dirname, '../src/*.js')
            ])
        })

        // new webpackBundleAnalyzer()
    ]
}