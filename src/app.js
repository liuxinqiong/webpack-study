import base from './css/base.less'
import common from './css/common.less'

import { a } from './common/util'
import { chunk } from 'lodash-es'
console.log(a)
chunk([1, 2, 3, 4, 5, 6], '7')

import { renderA, componentA } from './components/a'

// base.use()
// base.unuse()

// renderA()

import(/* webpackChunkName:'a'*/'./components/a').then(function (a) {
    console.log(a)
})

var app = document.getElementById('app')
var div = document.createElement('div')
div.className = 'box'
app.appendChild(div)
// app.innerHTML = "<div class='" + base.box + "'></div>";

var one = document.getElementById('one')
var list = componentA();
one.appendChild(list)

$('div').addClass('new')

$.get('/comments/show', {
    id: '4193586758833502',
    page: 1
}, function (data) {
    console.log(data)
})

$.get('/msg/index', {
    format: 'cards'
}, function (data) {
    console.log(data);
})

if (module.hot) {
    // module.hot.accept()
    module.hot.accept('./components/a', function () {
        one.removeChild(list)
        let componentA = require('./components/a').componentA;
        let newList = componentA()
        one.appendChild(newList)
        list = newList
    })
}