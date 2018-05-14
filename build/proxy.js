module.exports = {
    "/.+": {
        target: 'https://m.weibo.cn',
        changeOrigin: true,
        logLevel: 'debug',// 打印有关代理的信息
        pathRewrite: {
            '^/comments': '/api/comments'
        }
    }
}