var webpack = require('webpack')
const proxy = require('./proxy')
const historyfallback = require('./historyfallback')

module.exports = {
    devtool: 'cheap-module-eval-source-map',

    devServer: {
        port: 9001,
        proxy: proxy,
        hot: true,
        // 不要刷新
        hotOnly: true,
        // 指定定义规则
        historyApiFallback: historyfallback
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),

        new webpack.NamedModulesPlugin()
    ]
}