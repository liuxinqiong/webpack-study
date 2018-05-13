var webpack = require('webpack')

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        port: 9001,
        proxy: {
            "/": {
                target: 'https://m.weibo.cn',
                changeOrigin: true,
                logLevel: 'debug',// 打印有关代理的信息
                pathRewrite: {
                    '^/comments': '/api/comments'
                }
            }
        },
        hot: true,
        // 不要刷新
        hotOnly: true,
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

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin()
    ]
}