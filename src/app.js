import base from './css/base.less'
import common from './css/common.less'

import { a } from './common/util'
import { chunk } from 'lodash-es'

console.log(a)

chunk([1, 2, 3, 4, 5, 6], '7')

// base.use()
// base.unuse()

import(/* webpackChunkName:'a'*/'./components/a').then(function (a) {
    console.log(a)
})

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)
// app.innerHTML = "<div class='" + base.box + "'></div>";