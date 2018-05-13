module.exports = {
    root: true,
    extends: 'standard',
    plugins: ['html'],
    env: {
        browsers: true,
        node: true
    },
    globals: {
        $: true
    },
    rules: {
        indent: ['error', 4],
        'eol-last': ['error', 'nerver'],// 文件结尾换行
    }
}