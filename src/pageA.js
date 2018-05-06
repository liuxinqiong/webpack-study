// import './subPageA'
// import './subPageB'

import * as _ from 'lodash'

// 单entry公共代码提取
// require.include('./moduleA')

const page = 'subPageA'

if (page === 'subPageA') {
    // 魔法注释设置名称 
    import(/* webpackChunkName: 'subPageA'*/'./subPageA').then(function (subPageA) {
        console.log(subPageA)
    })
    // require.ensure(['./subPageA'], function () {
    //     var subPageA = require('./subPageA')
    // }, 'subPageA')
} else if (page === 'subPageB') {
    require.ensure(['./subPageB'], function () {
        var subPageB = require('./subPageB')
    }, 'subPageB')
}

// require.ensure(['lodash'], function () {
//     // var _ = require('lodash')
//     // _.join(['1', '2'], '3')
// }, 'vendor')

export default 'pageA'