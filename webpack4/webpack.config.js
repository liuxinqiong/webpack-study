const path = require('path')

module.exports = {
    entry: {
        main: './src/index.js'
    },
    output: {
        path: path.resolve('./dist'),
        filename: '[name].[chunkhash:5].min.js'
    }
}