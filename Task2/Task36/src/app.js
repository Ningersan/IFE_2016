/* eslint no-new:0 */

requirejs.config({
    baseUrl: './js',
    paths: {
        main: 'main',
        map: 'map',
        boxbot: 'boxbot',
        command: 'command',
        editor: 'editor',
        finder: 'finder',
        utils: 'utils',
    },
})

requirejs(['main'], function(main) {
    // 实例化
    new main.Main()
})
