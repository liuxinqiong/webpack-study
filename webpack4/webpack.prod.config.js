const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')
const UglifyjsPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
    mode: 'production',
    entry: {
        app: './src/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[chunkhash:5].min.js'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [
                    path.resolve(__dirname, 'src')
                ],
                use: [
                    {
                        loader: 'babel-loader'
                    }
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            inject: true,
            template: path.resolve(__dirname, 'index.html')
        })
    ],

    optimization: {
        // minimize: false /* 关闭正式环境压缩 */
        minimizer: [
            // new UglifyjsPlugin({
            //     uglifyOptions: {
            //         keep_classnames: true,
            //         keep_fnames: true,
            //         ecma: 6,
            //         cache: true,
            //         parallel: true
            //     }

            // })
        ],
        /* 提取runtime */
        runtimeChunk: true,

        splitChunks: {
            name: true,
            minSize: 0,
            cacheGroups: {
                // preact: {
                //     test: /(preact)|(lodash)/,
                //     chunks: 'initial'
                // }
                preact: {
                    test: /preact/,
                    chunks: 'initial'
                },
                lodash: {
                    test: /lodash/,
                    chunks: 'all'
                }
            }
        }
    }
}