const productionConfig = require('./webpack.prod.conf')
const developmentConfig = require('./webpack.dev.conf')
const merge = require('webpack-merge')
var path = require('path')

const htmlWebpackPlugin = require('html-webpack-plugin')
const extractTextWebpackPlugin = require('extract-text-webpack-plugin')

var webpack = require('webpack')

const generateConfig = env => {

    const ectractLess = new extractTextWebpackPlugin({
        filename: 'css/[name]-bundle-[hash:5].css'
    })

    const scriptLoader = [{
        loader: 'babel-loader',
    }].concat(env === 'production' ? [] : {
        loader: 'eslint-loader',
        options: {
            formatter: require('eslint-friendly-formatter')
        }
    });

    const cssLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: env === 'development',
                // minimize: true,
                // modules: true,
                // localIdentName: '[path][name]_[local]_[hash:base64:5]'
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: env === 'development',
                // 执行插件是给postcss使用的
                ident: 'postcss',
                plugins: [
                    require('postcss-cssnext')()// 内置autoprefixer
                ].concat(env === 'production' ? require('postcss-sprites')({
                    spritePath: 'dist/assets/imgs/sprites',
                    retina: true
                }) : [])
            }
        },
        {
            loader: 'less-loader',
            options: {
                sourceMap: env === 'development',
            }
        }
    ]

    const styleLoader = env === 'production' ? extractTextWebpackPlugin.extract({
        fallback: 'style-loader',
        use: cssLoaders
    }) : [{
        loader: 'style-loader'
    }].concat(cssLoaders);

    const fileLoader = env === 'development' ? [{
        loader: 'file-loader',
        options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'assets/imgs/'
        }
    }] : [{
        loader: 'url-loader',
        options: {
            name: '[name]-[hash:5].[ext]',
            outputPath: 'assets/imgs/',
            limit: 1000
        }
    }]

    return {
        entry: {
            app: './src/app.js'
        },
        output: {
            path: path.resolve(__dirname, '../dist'),
            publicPath: '/',// 或者使用CDN，对于按需加载很关键，不然会找不到资源
            filename: 'js/[name]-bundle-[hash:5].js',
            chunkFilename: 'js/[name]-bundle-[hash:5].js' // 代码分隔名称
        },
        resolve: {
            alias: {
                // 美元符结尾表示准确匹配
                jquery$: path.resolve(__dirname, '../src/lib/jquery.min.js')
            }
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: [path.resolve(__dirname, '../src/libs'), '/node_modules/'],
                    include: [path.resolve(__dirname, '../src')],
                    use: scriptLoader
                },
                {
                    test: /\.less$/,
                    use: styleLoader
                },
                {
                    test: /\.(png|jpe?g|gif|svg)$/,
                    use: fileLoader.concat(env === 'production' ? {
                        loader: 'img-loader',
                        options: {
                            pngquant: {
                                quality: 80
                            }
                        }
                    } : [])
                },
                {
                    // 处理字体文件
                    test: /\.(eot|woff2?|ttf|svg)$/,
                    use: fileLoader
                }
            ]
        },
        plugins: [
            ectractLess,

            new htmlWebpackPlugin({
                filename: 'index.html',
                template: './index.html',
                // 借助第三方 html-minify
                minify: {
                    collapseWhitespace: true
                }
            }),
            new webpack.ProvidePlugin({
                $: 'jquery'
            }),
        ]
    }
}

module.exports = env => {
    const config = env === 'production' ? productionConfig : developmentConfig
    return merge(generateConfig(env), config)
}