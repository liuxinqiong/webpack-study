var cleanWebpackPlugin = require('clean-webpack-plugin')
var htmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var purifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
var path = require('path')
var webpack = require('webpack')


module.exports = {
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),

        new cleanWebpackPlugin(['dist']),

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
        }),
    ]
}