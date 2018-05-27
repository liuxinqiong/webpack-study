webpack的诞生，从这里可以看到牛人的定义
* 作者是Java开发者，使用GWT（Google Web Toolkit，Java2JavaScript编译器），有一个非常棒的代码分隔功能
* 向社区已有的打包工具，提交PR，但是并没有被接受
* 自己开发webpack

变化
* 开发分工变化：前后端分离，前端越来越复杂
* 框架的变化
  * JS（jQuery）--》MVC（backbone）--》MV*（MVVM Angular Vue React）
* 语言的变化
  * CSS 发展（预处理器、后处理器）
  * ES6/7/8 TypeScript 需要编译才能在浏览器中运行
* 环境的变化
  * 服务端
  * 移动端
* 社区的变化
  * Github
  * npm
* 工具的变化
  * gulp
  * webpack

为什么需要构建
* 开发复杂化
* 框架去中心化：不再是大而全，而是以解决某一个问题为主
* 语言编译化
* 开发模块化

为什么webpack
* 三大框架都选择它
* 代码分隔
* 天生支持模块化
* ...

基于webpack 3.10+

JS 模块化
* 命名空间：库名.类别名.方法名
* CommonJS
  * 诞生于node社区
  * 同步执行
* AMD/CMD/UMD
  * AMD（Async Module Definition），RequireJS，依赖前置，提前执行
  * CMD（Common Module Definition），SeaJS，尽可能懒执行
  * UMD（Unicersal Module Definition），通用解决方案，三个步骤
    1. 判断是否支持AMD
    2. 判断是否支持CommonJS
    3. 如果都没有，使用全局变量
* ES6 module
  * export * from 'module'，相当于两句，先import再export

环境准备
* 命令行工具：iTerm2、Zsh
* Node、Npm
* Webpack：npm i webpack -g

webpack简介

webpack概述

webpack版本更迭
* v1.0.0 2014.2.20
  * 编译、打包
  * HMR（模块热更新）
  * 代码分隔
  * 文件处理
* v2.2.0 2017.1.18
  * Tree Shaking（优化体积）
  * ES module
  * 动态 Import
  * 新的文档
* v3.0.0 2017.6.19
  * Scope Hoisting（作用域提升，减少闭包）
  * Magic Comments（配合动态import使用）
* v4.0.0 2018.2.25

v1 -> v2
* breaking change
* 不兼容，因此提供了迁移指南https://webpack.js.org/guides/migrating
* 中文版：https://doc.webpack-china.org/guides/migrating

v2 -> v3
* 没有配置上的breaking change
* 向社区承诺，以后版本更新不会改变之前的API，尽可能向前兼容

参与社区投票：https://webpack.js.org/vote

webpack功能进化

中文官网：https://doc.webpack-china.org

webpack 核心概念
* entry
* output
* loaders
* plugins

entry
* 代码的入口
* 打包的入口
* 可以一个或多个

output
* 打包成的文件
* 一个或多个
* 自定义规则
* 配合CDN

loaders
* 处理文件
* 转换为模块
* 常用loader
  * 编译相关：babel-loader、ts-loader
  * 样式相关：style-loader、css-loader、less-loader、postcss-loader
  * 文件相关：file-loader、url-loader

plugins
* 参与打包整个过程
* 打包优化和压缩
* 配置编译时变量
* 常用Plugins
  * 优化相关：CommonsChunkPlugin、UglifyjsWebpackPlugin
  * 功能相关：ExtractTextWebpackPlugin、HtmlWebpackPlugin、HotModuleReplacementPlugin、CopyWebpackPlugin

名词
* Chunk：代码块
* Bundle：打包后的
* Module：模块

使用 webpack 方式
* webpack 命令：webpack -h
* webpack 配置：CommonJS 规范
* 第三方脚手架

webpack-cli
* init命令交互式的初始化项目
  * 应用的入口
  * 公有代码块（vendor）
* 迁移项目 v1 -> v2
* 观望的态度

打包JS
* webpack entry output
* webpack config-file

编译es6/7
* babel
* babel-presets
* babel-plugin

webpack loader：babel-loader
官网：babeljs.io

安装：npm i --save-dev babel-loader babel-core

babel-presets 指定打包规范
* 针对语法
* 需要安装：eg：npm i babel-preset-env --save-dev
* ES2015：2015规范汇总
* ES2016：2016规范汇总
* ES2017：2017规范汇总
* env：开发常用，包括上述三者和最近的
* 自定义的
  * babel-preset-react
  * babel-preset-stage：还没正式发布的
* targets，指定目标
  * targets.browser
    * 最近两个版本：last 2 versions
    * 占有率 > 1%
  * targets.node
  * 数据来源：开源项目browserlist，Can I use

babel-plugin
* 针对函数和方法
  * Generator
  * Set
  * Map
  * Array.form
  * Array.prototype.includes
  * ...
* babel polyfill
  * 全局垫片
  * 为应用准备
  * npm install babel-polyfill -save
  * 使用：代码最前端 import 'babel-polyfill'
* babel runtime transform
  * 局部垫片，不会污染全局
  * 为开发框架准备
  * npm install babel-plugin-transform-runtime --save-dev
  * npm install babel-runtime -save
  * .babelrc 文件进行配置

编译TypeScript
* JS的超集
* 官网：typescriptlang.org/tslang.cn
* 安装
```shell
# 官方
npm i typescript ts-loader --save-dev
# 第三方 做了优化，使用是一样的
npm i typescript awesome-typescript-loader --save-dev
```
* 配置：tsconfig.json
  * 配置选项：官网/doc/handbook/compiler-options.html
  * 常用配置 compilerOptions、include、exclude
* 声明文件（常d.ts结尾），比如使用loadash，此时语法没有按照类型使用，不会报错，如果需要报错提示，则需要安装声明文件
```shell
# loadash
npm install @types/loadash
# vue
npm install @types/vue
```
* typings工具安装声明文件，会在根目录增加typings.json配置文件，和typings文件夹存放配置文件
```shell
# 全局安装typings工具，以后直接使用typings安装
typings install loadash
# tsconfig.json配置文件中compilerOptions增加配置指定声明文件存放位置
"typeRoots": [
    "./node_modules/@types",
    "./typings/modules"
]
```

提取公用代码
* 减少代码冗余
* 提高加载速度
* webpack.optimize.CommonsChunkPlugin
```js
{
  plugins:[
    new webpack.optimize.CommonsChunkPlugin(option)
  ]
}
```
* options.name 指定已知chunk名词
* options.names 根据数组每一项，新建插件实例多次
* options.filename 公用代码文件名
* options.minChunks 数值、Infinite或函数，表示多次出现几次就进行提取
* options.chunks 指定提取代码的范围
* options.children
* options.deepChildren
* options.async：异步的公共代码块

场景
* 单页应用
* 单页应用 + 第三方依赖
* 多页用用 + 第三方依赖 + webpack生成代码

场景分析
* 如果不设置CommonsChunkPlugin，则公共代码会直接打包入口的bundle中，且每个入口bundle中都会存在，包括webpack生成的代码
* 设置CommonsChunkPlugin，name任意取名，如果和entry的name相同，则公共代码打入对应的bundle中，否则根据另起新文件存储公共代码（webpack生成的代码 + 满足要求的模块代码）
* 如果将业务公用代码和第三方类库代码分开抽离，此时将第三方代码加入entry中，比如：'vendor':['lodash','vue']，此时我们需要多个CommonsChunkPlugin实例，一个指定name为vendor，minChunks必须指定为Infinite（否则会将业务代码也打包进），用来负责打包第三方类库，这里有个奇怪的现象不能理解
  * 另一个name自定义（eg：common），minChunks指定为2，负责提取业务公共代码，则common中存储了webpack生成的代码，而entry之间业务公用代码并没有抽离
  * 此时通过chunks指定提取公共代码的entry目标，entry之间业务公用代码抽离抽来了，但是webpack生成的代码到了vendor中，可是我想将webpack部分代码从vendor中抽离出来怎么办
  * 在添加一个CommonsChunkPlugin实例，随意指定一个名字（eg：manifest），此时webpack代码就被抽离出来了

公共代码提取是针对多entry的，在单一entry下是体现不出来的

单页面 懒加载 代码分隔

代码分隔和懒加载
* 目的：减少用户带宽下载，提高加载速度
* 虽然是webpack的功能，但并不是通过配置实现，而是改变写代码的方式
* 实现方式一：webpack methods
  * require.ensure：引入等到需要的时候才执行
  * require.include：手动将共同依赖项前置打包，避免模块之间重复打包，减少冗余
* 实现方式二：ES6 Loader 动态import
  * System.import() -> import()，返回Promise
  * 不同于ensure，import时就已经执行
  * 需要安装babel-plugin-syntax-dynamic-import插件，并在babelrc的plugins中添加syntax-dynamic-import，否则报错提示import只能出现在头部
  * 通过魔法注释设置chunkname，指定相同name会将内容合并到一个chunk中
* 场景
  * 分离业务代码和第三方依赖
  * 分离业务代码和业务公共代码和第三方依赖
  * 分离首次加载和访问后加载的代码
* 使用总结
```js
// 当前依赖A和B，A和B共同依赖moduleA，此时需要使用include，避免moduleA在A和B中重复打包
require.include('./moduleA')

// 1. 自定义chunkName需要在webpack配置文件中通过chunkFilename指定规则，否则由webpack生成
// 2. dependencies指定的话，资源会被分隔，浏览器会下载，是否执行取决于require，不指定，则完全指望require
require.ensure(['./a'],function(){
  var a = require('./a')
},'chunkName')

// 魔法注释设置chunkname
import(/* webpackChunkName: 'a'*/'./a').then(function (a) {
    console.log(a)
})
```

代码分隔优化

上述我们使用require.include语法将moudleA子依赖中提取出来，但这有个两个缺点：
1. 手动去知晓依赖并声明
2. 子依赖共同模块当前页面可能并不立即需要

我们可以使用CommonsChunkPlugin实现自动分隔，使用async配合children实现
```js
new webpack.optimize.CommonsChunkPlugin({
    async: 'async-common', // async可以设置true(webpack分配名称)，也可直接指定名称
    children: true,// 子依赖
    minChunks: 2
})
```

处理css
* style-loader：创建style标签载入内容，可以使用options进行配置
  * insertAt(head or body)
  * insertInto(dom)
  * singleton(是否只使用一个style标签)
  * transform(转换，浏览器环境下，插入页面前)
* style-loader/url：通过link标签资源（还需要将css-loader换成file-loader），比较小众，因为会创建多个资源会创建多个link标签
* style-loader/useable：可以通过代码控制use还是unuse
* css-loader 将css模块化，同样可以使用options进行配置
  * alias 解析的别名
  * importLoader(@import)：取决与前面是否还存在其他的loader
  * minimize 是否压缩
  * modules：启用css-modules
  * localIndentName：自定义样式名称，可以使用占位符，[path][name][local][hash:base64:5]
* css modules
  * :local 本地样式
  * :global 全局样式
  * compose 继承样式
  * compose ... from path 从文件中引入样式，会导致引入的文件提前加载，可能会有优先级的问题，因此一般将compose语法放在其他样式之前
* less/sass：安装配置即可
  * npm install less-loader less --save-dev
  * npm install sass-loader node-sass --save-dev
* 提取css
  * extract-loader
  * ExtracTextWebpackPlugin：主流方式
  * npm install extract-text-webpack-plugin --save-dev
* PostCSS：转换css的工具
  * 安装：postcss,postcss-loader,autoprefixer,cssnano,postcss-next
  * Autoprefixer：添加浏览器前缀
  * CSS-nano：优化和压缩css，css-loader的minimize功能就是通过cssnano
  * CSS-next：使用未来的css语法（css变量，自定义选择器，calc）
* browserslist 目标浏览器
  * package.json
  * .browserslistrc
* 其他
  * postcss-import
  * postcss-url
  * postcss-assets

Tree Shaking
* 使用场景
  * 常规优化
  * 引入第三方库的某一个功能
* JS Tree Shaking
  * webpack.optimize.uglifyJS
  * webpack打包后，会将用到的和没用到的通过注释的方式进行标注
  * 优化第三方库时，如果不是采用ES6 Module的方式，则可以压缩，但是无法取出无效代码，此时可以寻找第三方库对应的ES6版本，如果还是不行，那就善用搜索，不同库解决方法不一致
* CSS Tree Shaking
  * purify css（purifycss-webpack），options有
  * paths:glob.sync([])
  * glob-all：同时处理多个路径
  * 安装：npm install purifycss-webpack glob-all --save-dev
  * 插件也是有顺序之分的，purify要在extract后面
  * 搞了好久，我好像不生效

文件处理
* 图片文件，字体文件，第三方JS库
* 图片处理
  * CSS中引入图片
  * 自动合成雪碧图
  * 压缩图片
  * base64编码
  * file-loader
  * url-loader：对于低于limit值的图片采用base64
  * img-loader：压缩图片
  * postcss-sprites：合成雪碧图
* postcss-sprites作为postcss-loader的plugin使用，可以通过spritePath设置生成的位置，会有两张图片，压缩和不压缩的区别。还有一个有意思的参数是retina，设置为true会自动帮助我们处理retina屏的效果，但是对文件需要命名为@2x结尾，css需要修改尺寸为之前的一半

处理第三方JS库（CDN形式或通用库，不愿意每次import）
* 插件方式：webpack.ProvidePlugin，options为k-v的形式，k表示对象，v表示模块
* loader方式：imports-loader，options为k-v的形式，k表示对象，v表示模块
* window对象

对于 npm 安装的库 webpack 可以直接找到，如果是我们自己的库呢，则需要使用resolve字段的别名功能指定模块名和模块位置
```js
resolve: {
    alias: {
        // 美元符结尾表示准确匹配
        jquery$: path.resolve(__dirname, 'src/lib/jquery.min.js')
    }
},
```


HTML in Webpack
* 自动生成HTML
  * HtmlWebpackPlugin，npm install html-webpack-plugin --save-dev
  * 常用options
    * template
    * filename
    * minify
    * chunks
    * inject
* HTML引入图片
  * html-loader：npm install html-loader --save-dev
  * 常用options
    * attrs:[img:src]
  * 其他方式：不用html-loader也可以，只是写法比较麻烦，在html中使用${require('path-to-img')}
* 提前载入webpack加载代码
  * ~~inline-manifest-webpack-plugin~~
  * html-webpack-inline-chunk-plugin


babel "transform-runtime"插件？ 添加报错 $export is not a function

搭建本地开发环境，有三种方式
* webpack watch mode
  * 直接添加 --watch(-w)参数即可，webpack --watch
  * 检测文件改动，自动重新打包
  * 本质并没有开web服务器，只能用打开本地文件的方式打开html
  * npm脚本："dev": "webpack -w --progress --display-reasons --color"
* webpack-dev-server
  * 官方提供的开发服务器
  * live reload
  * 不可以打包文件，内存中运行
  * 路径重定向
  * https
  * 浏览器中直接显示编译错误
  * 接口代理
  * 模块热更新
    * 保持应用数据状态
    * 节省调试时间
    * 样式调试更快
    * hot置为true
    * 模块热更新处理代码：module.hot module.hot.accept module.hot.decline（loader集成）
      * css通过style-loader
      * js框架相关loader集成
      * react -> react-hot-loader
      * vue -> vue-loader
      * angular -> angular-hot-loader
    * webpack.HotModuleReplacementPlugin
    * webpack.NamedModulesPlugin 查看模块相对路径
  * devServer字段
    * inline
    * contentBase
    * port
    * historyApiFallback
    * https
    * proxy：集成的第三方，http-proxy-middleware，options常用有
      * target
      * changeOrigin：默认false
      * headers
      * logLevel
      * pathRewrite
    * hot
    * openpage
    * lazy
    * overlay：错误提示遮照
  * 需要单独安装：npm install webpack-dev-server --save-dev
  * 有版本对应关系，否则报错，webpack 3.x 对应 webpack-dev-server 2.x，4.x 对应 3.x
* express + webpack-dev-middleware

Source Map调试（JS、CSS），两种方式
* 设置Devtool（主要有7种可能的值）
  * 开发环境 development
    * eval 最快的
    * eval-source-map
    * cheap-eval-source-map
    * cheap-module-eval-source-map：折中推荐方案
  * production（线上bug）
    * source-map
    * hidden-source-map
    * nosource-source-map
* 通过插件（了解即可）
  * webpack.SourceMapDevToolPlugin
  * webpack.EvalSourceMapDevToolPlugin
* CSS处理开启Devtool，还需要开启对应loader
  * css-loader.options.sourcemap
  * less-loader.options.sourcemap
  * sass-loader.options.sourcemap

clean-webpack-plugin：保证每次只有最新打包的文件

EsLint 代码检查
* 安装eslint、eslint-loader，eslint-plugin-html、eslint-friendly-formatter
* 配置eslint
  * webpack config新增eslint-loader
  * .eslintrc.* 或 package.json 中的 eslintConfig
* 规则：Javascript Standard Style
  * 需要安装 eslint-config-standard
  * 其他
    * eslint-plugin-promise
    * eslint-plugin-standard
    * eslint-plugin-import
    * eslint-plugin-node
  * 或者你可以使用其他规范，eslint-config-xxx
    * arbnb
* eslint-loader
  * options.failOnWarning
  * options.failOnError
  * options.formatter
  * options.outputReport
* npm install eslint eslint-loader eslint-plugin-html eslint-friendly-formatter --save-dev
* npm install eslint-config-standard eslint-plugin-promise eslint-plugin-node eslint-plugin-import eslint-plugin-standard --save-dev

开发环境和生产环境

开发环境
* 模块热更新
* sourceMap
* 接口代理
* 代码规范检查

生产环境
* 提取公用代码
* 压缩混淆
* 文件压缩 或 Base64 编码
* tree-shaking 去除无用代码

共同点
* 同样的入口
* 同样的代码处理（loader处理）
* 同样的解析配置

how to do
* webpack-merge
* webpack.dev.conf.js
* webpack.prod.conf.js
* webpack.common.conf.js

middleware搭建开发环境
* express or koa
* webpack-dev-middleware
  * 在webpack 3.x中只能用2.x版本，否则报错
* webpack-hot-middleware
* http-proxy-middleware
* connect-history-api-fallback
* opn：自动打开浏览器

打包结果分析
* 官方工具：office analyse tool
  * chunk信息
  * 优化建议
  * mac：webpack --profile --json > stats.json
  * windows：webpack --profile --json | Out-file 'stats.json' -Encoding OEM
  * 将json上传到地址：http://webpack.github.io/analyse
* 社区工具：webpack-bundle-analyzer
  * 可视化的看到是如何打包的
  * 方式一：BundleAnalyzerPlugin
  * 方式二：webpack-bundle-analyzer stats.json
* 更好的帮助我们提取公用代码和打包策略

打包速度优化
* 文件多？依赖多？页面多？使用loader的方式和范围
* 原则
  * 并行化
  * 减少任务量（限定范围）
  * 缓存
  * 跟进版本
* 分开 vendor 和 app
  * DllPlugin
  * DllReferencePlugin
* UglifyJsPlugin 非常耗时，开启并行配置
  * parallel
  * cache
* HappyPack
  * 串行转并行
  * HappyPack.ThreadPool
* babel-loader 非常耗时
  * cacheDirectory 开启缓存
  * include
  * exclude
* 其他
  * 减少resolve
  * Devtool：去除sourcemap，耗时
  * cache-loader
  * 升级node和webpack

长缓存优化
* 场景一：业务代码变化、vendor变化
  * 提取vendor
  * hash -> chunkhash
  * 提取 webpack runtime（其实可以直接inline到html中）
* 场景二：当业务import新的模块，模块顺序发生变化，vendor chunkhash也会变化
  * 原因，webpack会给每个chunk一个ID，当顺序发生改变时，ID也会改变，导致chunkhash发生变化
  * 不使用ID，使用name
  * NamedChunksPlugin
  * NamedModulesPlugin
* 场景三：动态引入模块时，vendor hash变化
  * 定义动态模块的chunkName

多页面配置
* 可能需要配合老项目使用
* 特点
  * 多入口entry
  * 多页面html
  * 每个页面不同的chunk
  * 每个页面不同的参数
* 实现方式
  * 多配置
    * webpack 3.1.0 支持
    * parallel-webpack：并行处理没有关系的多份配置
    * 优点
      * 可以使用parallel-webpack提高速度
        * parallel-webpack --watch
        * parallel-webpack --config
        * ...和官方webpack差不多
      * 配置更加灵活独立
    * 缺点
      * 不能多页面之间共享代码（公共代码提取）
  * 单配置
    * 优点
      * 共享各个entry之间的公共代码
    * 缺点
      * 打包速度慢
      * 输出内容比较复杂

vue 和 webpack
* 脚手架：vue-cli
* 项目模板
  * simple
  * webpack
  * webpack-simple
  * browserify
  * browserify-simple
* 如何使用
  * vue init templateName projectName
  * vue init gitRepo projectName
* 配置文件

static 文件夹用来放置不需要 webpack 处理的文件

vue-cli提供的项目模板直接集成了打包代码分析功能，运行 npm run build --report

Note：vue-cli生成了css相关loader的配置，仅仅是没有安装相关的loader，使用时根据自己喜好安装即可

react 和 webpack
* 官方脚手架：create-react-app 
* react-scripts：封装了npm和webpack，不能直接修改，需要运行 npm run eject 弹出配置
* 功能
  * 支持es6和jsx
  * 动态import
  * fetch(polyfill)
  * 支持proxy
  * 支持postcss
  * 支持eslint
  * 支持测试
  * 不支持 react hot-reloading(修改css可以热更新)
  * 弱支持css预处理器
* 命令
  * npm start 启动开发服务器
  * npm run build 打包发布
  ```shell
  # 基于打包结果启动本地服务器
  npm install -g serve
  serve -s build
  ```
  * npm run test
  * npm run eject 不可逆操作
* config/env.js：帮助我们直接在项目根目录下添加.env文件来达到直接修改环境变量的目的
* config/polyfill.js：提供promise、fetch、Object.assign
* 自定义配置
  * proxy 配置：直接在package.json中增加proxy属性，配置个webpack-dev-server是一样的
  * less 配置
    1. 安装loader
    2. 修改dev和prod的规则即可
  * 热更新配置
    1. 安装react-hot-loader
    2. 增加 react-hot-loader/patch entry
    3. babel-loader 增加 react-hot-loader/babel plugin
    4. entry入口js增加代码

NOTE：不知道是不是因为版本问题，现在开启热更新无需上述这么多配置，只需要在entry入口添加如下代码即可
```js
if(module.hot){
  module.hot.accept()
}
```

Angular 和 Webpack
* Angular-cli
  * Angular 最佳实践代码
  * 所有项目依赖
  * Typescript 和测试
  * 环境变量
* npm install -g @angular/cli
* 非常灵活
```shell
ng help
ng new ng-project
ng new ng-project --style=less --directory=src
ng g/generate
ng serve(webpack dev server)
ng build
ng test
ng e2e
ng lint
ng eject
```
* 接口请求代理
```shell
# 添加proxy.conf.json
ng serve --proxy-config proxy.conf.json
```
* css预处理器
```shell
ng new project --style=less
ng set defaults.styleExt less
```
* 第三方依赖
```shell
# 源文件
npm install lodash --save
# 声明文件
npm install @type/lodash --save-dev
```

面试点
* 概念
  * webpack 和 gulp、grunt 区别
    * 模块打包器，递归打包
    * code-splitting
    * 模块化（AMD/CommonJs）
    * 全局分析
  * 什么是bundle，什么是chunk，什么是module
    * bundle是webpack打包出来的文件
    * chunk时在进行模块依赖分析时，代码分割出来的代码块（代码分隔，动态加载）
    * module是开发的单个模块
  * 什么是loader，什么是plugin
    * loader是用来告诉webpack如何转换处理某一类型的文件，并且引入到打包的文件中
    * plugin是用来自定义webpack打包过程的方式，一个插件是含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程
* 配置
  * 如何自动生成webpack配置
    * webpack-cli
    * 官方脚手架
* 开发环境
  * webpack-dev-server和http服务如nginx有什么区别
    * webpack-dev-server使用内存来存储webpack开发环境下的打包文件，并且可以使用模块热更新
  * 什么是模块热更新
    * 使得代码不用刷新浏览器就可以更新，是高级版的自动刷新浏览器
    * websocket
* 优化
  * 什么是长缓存，如何做到长缓存
    * 浏览器会自动缓存静态资源，如果代码升级或更新，最方便的方式引入新的文件名词
    * webpack通过在output给输出的文件执行chunkhash
    * 分离经常更新的业务代码和框架代码
    * 通过NamedModulePlugin或是HashedModuleIdsPlugin使再次打包文件名不变
  * 什么是tree-shaking？css可以吗？
    * tree-shaking时指在打包中取出了那些引入了，但是在代码中没有用到的死代码
    * uglifyJSPlugin Purify-CSS

总结
* 工程化功能
  * 实时编译
  * 开发服务
  * 自动优化
* 工程化思想
  * 一切皆模块
  * 极速的调试响应速度
  * 优化应该自动完成
* 工程化未来
  * 零配置？
  * 更快，更小？
  * breaking change
* 学到了啥
  * webpack的使用
  * 现在前端正确开发姿势
  * 前端优化的思想