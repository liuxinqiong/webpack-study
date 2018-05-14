module.exports = {
    htmlAcceptHeaders: ['text/html', 'applicaiton/xhtml+xml'],
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