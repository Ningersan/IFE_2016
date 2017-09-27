/**
 * 指令编辑器
 * @constructor
 */
function Editor() {
    this.taskQueue = []
    this.$editor = $('.commander-editor')
    this.$lineArea = $('.commander-lines')
    this.init()
}

/**
 * 初始化事件
 */
Editor.prototype.init = function () {
    this.update()
    addEvent(this.$editor, 'input', this.update.bind(this))
    addEvent(this.$editor, 'scroll', this.scroll.bind(this))
}

/**
 * 实现指令区和行号区的同步滚动
 * @param event
 */
Editor.prototype.scroll = function(event) {
    this.$lineArea.style.top = -this.$editor.scrollTop + 'px'
}

/**
 * 输入指令，实现行号的更新
 */
Editor.prototype.update = function() {
    var text = ''
    var enter = this.$editor.value.match(/\n/g)
    var lineNum = enter ? enter.length + 1 : 1

    for (var i = 1; i <= lineNum; i++) {
        text += "<div class='commander-lines-item'>" + i + '</div>'
    }

    this.$lineArea.innerHTML = text
}

/**
 * 检查当前行代码的指令是否合法
 * @param {string} command - 目标指令
 * @param {function} callback - 如果存在，执行回调函数
 * @return {boolean} - 正确返回true
 */
Editor.prototype.isTrue = function(command, callback) {
    for (var key in commands) {
        if (commands[key].pattern.test(command)) {
            if (typeof callback === 'function') {
                var func = commands[key].run
                var params = command.match(commands[key].pattern).slice(1)
                callback.call(app, {run: func, params: params})
            }

            return true
        }
    }

    return false
}

/**
 * 给行号添加标记
 * @param {number} index - 行号索引
 * @param {string} index - 设置类名(success||error)
 */
Editor.prototype.setMark = function(index, className) {
    if (index < 0) {
        return
    }

    this.$lineArea.children[index].className = className
}
