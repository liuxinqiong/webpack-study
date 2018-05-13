var webpack = require('webpack')
var path = require('path')
var extractTextWebpackPlugin = require('extract-text-webpack-plugin')
var purifyCSS = require('purifycss-webpack')
var glob = require('glob-all')
var htmlWebpackPlugin = require('html-webpack-plugin')
var htmlInlineChunkPlugin = require('html-webpack-inline-chunk-plugin')
var cleanWebpackPlugin = require('clean-webpack-plugin')

// path.join 连接任意多个路径字符串，同时也会对路径进行规范化
// path.resolve 类似于对这些路径逐一进行cd操作，cd操作时和join的区别

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
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/',// 或者使用CDN，对于按需加载很关键，不然会找不到资源
        filename: 'js/[name]-bundle-[hash:5].js',
        chunkFilename: 'js/[name]-bundle-[hash:5].js' // 代码分隔名称
    },
    resolve: {
        alias: {
            // 美元符结尾表示准确匹配
            jquery$: path.resolve(__dirname, 'src/lib/jquery.min.js')
        }
    },

    devtool: 'cheap-module-eval-source-map',

    devServer: {
        // inline: false,// 在顶部显示加载状态，否则在控制台显示
        port: 9001,
        proxy: {
            "/": {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',// 打印有关代理的信息
                pathRewrite: {
                    '^/comments': '/api/comments'
                },
                // 如果需要登录呢
                // headers: {
                //     'cookie': ''
                // }
            }
        },
        hot: true,
        hotOnly: true,// 不要刷新
        // historyApiFallback: ture,// 对于不存在的路径直接返回本地的index.html
        // 指定定义规则
        historyApiFallback: {
            rewrites: [
                {
                    from: /^\/([a-zA-Z0-9]+\/?)([a-zA-Z0-9]+)/, // 可以正则匹配
                    // 可以是函数
                    to: function (context) {
                        return '/' + context.match[1] + context.match[2] + '.html'
                    }
                }
            ]
        }
    },

    module: {
        rules: [
            {
                test: /\.js$/,
                // use: 'babel-loader',
                use: [
                    {
                        loader: 'babel-loader',
                        // options: {} babelrc下单独配置
                    },
                    {
                        loader: 'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter')
                        }
                    }
                ],
                exclude: [path.resolve(__dirname, 'src/libs'), '/node_modules/'],
                include: [path.resolve(__dirname, 'src')]
            },
            // {
            //     test: /\.ts$/,
            //     use: 'ts-loader',
            //     exclude: '/node_modules/'
            // },
            {
                test: /\.less$/,
                use: extractTextWebpackPlugin.extract({
                    // 不提取的话，使用什么方式呢
                    fallback: {
                        // loader: 'style-loader/url'
                        // loader: 'style-loader/useable'
                        loader: 'style-loader',
                        options: {
                            // singleton: true,// 开启会导致sourceMap失效
                            sourceMap: true,
                            // insertInto: '#app',
                            transform: './css.transform.js'
                        }
                    },
                    // publicPath: './',
                    use: [
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: true,
                                // minimize: true,
                                // modules: true,
                                // localIdentName: '[path][name]_[local]_[hash:base64:5]'
                            }
                            // loader: 'file-loader'
                        },
                        {
                            loader: 'postcss-loader',
                            options: {
                                sourceMap: true,
                                // 执行插件是给postcss使用的
                                ident: 'postcss',
                                plugins: [
                                    require('postcss-sprites')({
                                        spritePath: 'dist/assets/imgs/sprites',
                                        retina: true
                                    }),
                                    // require('autoprefixer')(),
                                    require('postcss-cssnext')()// 内置autoprefixer
                                ]
                            }
                        },
                        {
                            loader: 'less-loader',
                            options: {
                                sourceMap: true,
                            }
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
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/,
                use: [
                    {
                        // loader: 'file-loader',
                        // options: {
                        //     // publicPath: '', // 版本更新，有问题
                        //     // outputPath: 'dist/',
                        //     useRelativePath: true
                        // }
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            limit: 1024 * 100,
                            outputPath: 'assets/imgs/'// 将图片整合到一起
                            // useRelativePath: true
                        }
                    },
                    {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    }
                ]
            },
            {
                // 处理字体文件
                test: /\.(eot|woff2?|ttf|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: '[name]-[hash:5].[ext]',
                            outputPath: 'assets/fonts/',
                            // useRelativePath: true,
                            limit: 5000
                        }
                    }
                ]
            },
            {
                test: path.resolve(__dirname, 'src/app.js'),
                use: [
                    {
                        loader: 'imports-loader',
                        options: {
                            $: 'jquery'
                        }
                    }
                ]
            },
            // {
            //     test: /\.html$/,
            //     use: {
            //         loader: 'html-loader',
            //         options: {
            //             attrs: ['img:src', 'img:data-src']
            //         }
            //     }
            // }
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

        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest'
        }),

        new htmlInlineChunkPlugin({
            inlineChunks: ['manifest']
        }),

        new extractTextWebpackPlugin({
            filename: 'css/[name].bundle-[hash:5].css',
            // 指定提取范围，默认false，只会提出初始化的css，后期异步加载的不会提取
            // 可以指定范围声明哪些提取到初始化代码中，否则跟随组件动态加载
            allChunks: false
        }),

        new purifyCSS({
            paths: glob.sync([
                path.join(__dirname, './*.html'),
                path.join(__dirname, './src/*.js')
            ])
        }),

        new htmlWebpackPlugin({
            filename: 'index.html',
            template: './index.html',
            chunks: ['app', 'manifest'], // 如果不指定，会将entry入口相关的全载入
            // 借助第三方 html-minify
            minify: {
                collapseWhitespace: true
            }
        }),
        // new webpack.ProvidePlugin({
        //     $: 'jquery'
        // }),

        // JS压缩
        // new webpack.optimize.UglifyJsPlugin()

        new cleanWebpackPlugin(['dist']),

        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin()
    ]
}