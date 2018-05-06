// 不是webpack编译时执行，而是在浏览器环境下执行
// 对每个import的css文件都会执行一遍
// 插入浏览器时执行
module.exports = function (css) {
    console.log(css)
    return css
}