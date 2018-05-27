const merge = require('webpack-merge')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpack = require('clean-webpack-plugin')
const path = require('path')
const ExtractTextWebpack = require('extract-text-webpack-plugin')

const baseConfig = {
    entry: {
        react: 'react'
    },

    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].[chunkhash].js'
    },

    module: {
        rules: [
            {
                test: /\.css$/,
                use: ExtractTextWebpack.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                })
            }
        ]
    },

    plugins: [
        new ExtractTextWebpack({
            filename: 'css/[name].[hash].css'
        }),

        new CleanWebpack(path.resolve(__dirname, 'dist')),

        new webpack.optimize.CommonsChunkPlugin({
            name: 'react',
            minChunks: Infinity // 保证只有react
        })
    ]
}

const generatePage = function ({
    title = '',
    entry = '',
    template = './src/index.html',
    name = '',
    chunks = []
} = {}) {
    return {
        entry,
        plugins: [
            new HtmlWebpackPlugin({
                chunks,
                template,
                title,
                filename: name + '.html'
            })
        ]
    }
}

const pages = [
    generatePage({
        title: 'page A',
        entry: {
            a: './src/pages/a'
        },
        name: 'a',
        // 公用代码 + 自有chunk
        chunks: ['react', 'a']
    }),
    generatePage({
        title: 'page B',
        entry: {
            b: './src/pages/b'
        },
        name: 'b',
        // 公用代码 + 自有chunk
        chunks: ['react', 'b']
    }),
    generatePage({
        title: 'page C',
        entry: {
            c: './src/pages/c'
        },
        name: 'c',
        // 公用代码 + 自有chunk
        chunks: ['react', 'c']
    })
]

// 合成一个配置
module.exports = merge([baseConfig].concat(pages))