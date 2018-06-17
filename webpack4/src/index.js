import 'preact'
import 'lodash'

export default 'i am index.js'

class Hello {
    constructor(x, y) {
        console.log('hello world')
    }
}

import(/* webpackChunkName: 'moduleA' */'./modules/moduleA.js')
import(/* webpackChunkName: 'moduleB' */'./modules/moduleB.js')
import(/* webpackChunkName: 'moduleC' */'./modules/moduleC.js')
import(/* webpackChunkName: 'moduleD' */'./modules/moduleD.js')