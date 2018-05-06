var webpack = require('webpack')
var path = require('path')
var extractTextWebpackPlugin = require('extract-text-webpack-plugin')

module.exports = {
    entry: {
        app: './src/app.js'
        // app: './src/app.ts'
        // 'pageA': './src/pageA',
        // 'pageB': './src/pageB',
        // 'vendor': ['lodash']
    },
    output: {
        // filename: '[name].[hash:8].js'
        path: path.resolve(__dirname, './dist'),
        publicPath: './dist/',
        filename: '[name].bundle.js',
        chunkFilename: '[name].chunk.js' // 代码分隔名称
    },
    module: {
        rules: [
            // {
            //     test: /\.js$/,
            //     // use: 'babel-loader',
            //     use: {
            //         loader: 'babel-loader',
            //         // options: {} babelrc下单独配置
            //     },
            //     exclude: '/node_modules/'
            // },
            // {
            //     test: /\.ts$/,
            //     use: 'ts-loader',
            //     exclude: '/node_modules/'
            // },
            {
                test: /\.(css|less)$/,
                use: extractTextWebpackPlugin.extract({
                    // 不提取的话，使用什么方式呢
                    fallback: {
                        // loader: 'style-loader/url'
                        // loader: 'style-loader/useable'
                        loader: 'style-loader',
                        options: {
                            singleton: true,
                            // insertInto: '#app',
                            transform: './css.transform.js'
                        }
                    },
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                // minimize: true,
                                modules: true,
                                localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                            // loader: 'file-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                // 执行插件是给postcss使用的
                                ident: 'postcss',
                                plugins: [
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')()// 内置autoprefixer
                                ]
                            }
                        },
                        {
                            loader: 'less-loader'
                        }
                    ]
                })
                // use: [
                //     {
                //         // loader: 'style-loader/url'
                //         // loader: 'style-loader/useable'
                //         loader: 'style-loader',
                //         options: {
                //             singleton: true,
                //             // insertInto: '#app',
                //             transform: './css.transform.js'
                //         }
                //     },
                //     {
                //         loader: 'css-loader',
                //         options: {
                //             minimize: true,
                //             modules: true,
                //             localIdentName: '[path][name]_[local]_[hash:base64:5]'
                //         }
                //         // loader: 'file-loader'
                //     },
                //     {
                //         loader: 'less-loader'
                //     }
                // ]
            }
        ]
    },

    plugins: [
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest'],
        //     minChunks: Infinity
        // }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     async: true,
        //     children: true,// 子依赖
        //     minChunks: 2
        // }),

        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'common',
        //     minChunks: 2,
        //     chunks: ['pageA', 'pageB']
        // }),
        // new webpack.optimize.CommonsChunkPlugin({
        //     names: ['vendor', 'manifest'],
        //     minChunks: Infinity
        // }),

        new extractTextWebpackPlugin({
            filename: '[name].min.css',
            // 指定提取范围，默认false，只会提出初始化的css，后期异步加载的不会提取
            // 可以指定范围声明哪些提取到初始化代码中，否则跟随组件动态加载
            allChunks: false
        })
    ]
}