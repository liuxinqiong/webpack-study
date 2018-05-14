const express = require('express')
const webpack = require('webpack')
const opn = require('opn')

const app = express()
const port = 3000

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const proxyMiddleware = require('http-proxy-middleware')
const historyApiFallback = require('connect-history-api-fallback')

const config = require('./webpack.common.conf')('development')
const compiler = webpack(config)

console.log(compiler.hooks)

const proxyTable = require('./proxy')
const historyfallback = require('./historyfallback')

for (let context in proxyTable) {
    app.use(proxyMiddleware(context, proxyTable[context]))
}

app.use(webpackDevMiddleware(compiler, {
    publicPath: config.output.publicPath
}))

app.use(historyApiFallback(historyfallback))

app.use(webpackHotMiddleware(compiler))

app.listen(port, function () {
    console.log('success listen to ' + port)
    opn('http://localhost:' + port)
})