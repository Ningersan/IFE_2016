/**
 * @constructor
 */
function Application() {
    this.speed = 300
    this.taskQueue = []
    this.editor = new Editor()
    this.robot = new Boxbot()
    this.$speedBtn = $('.speed')
    this.$sizeBtn = $('.map-size')
    this.$runBtn = $('.execute-btn')
    this.$buildBtn = $('.random-btn')
    this.$resetBtn = $('.reset-btn')
    this.init()
}

/**
 * 初始化事件
 */
Application.prototype.init = function() {
    addEvent(this.$runBtn, 'click', this.run.bind(this))
    addEvent(this.$buildBtn, 'click', this.build.bind(this))
    addEvent(this.$sizeBtn, 'change', this.setSize.bind(this))
    addEvent(this.$speedBtn, 'change', this.setSpeed.bind(this))
    addEvent(this.$resetBtn, 'click', this.reset.bind(this))
    addEvent(document, 'keydown', this.robot.control.bind(this.robot))
}

/**
 * 设置地图大小
 */
Application.prototype.setSize = function (e) {
    e = e || event

    var size = parseInt(e.target.value)
    $('article').className = { 20: 'map-20x20', 30: 'map-30x30' }[size]

    this.taskQueue = []
    this.robot.map.init(size, size)
    this.robot.init()
}

/**
 * 随机修墙
 */
Application.prototype.build = function() {
    var map = this.robot.map
    var coordinate = map.random()

    while (map.getType(coordinate)) {
        coordinate = map.random()
    }

    map.setWall(coordinate)
}

/**
 * 清除所有墙
 */
Application.prototype.reset = function() {
    var walls = $a('.wall')
    for (var i = 0, len = walls.length; i < len; i++) {
        walls[i].removeAttribute('class')
    }
}

/**
 * 获取并设置动画速度
 */
Application.prototype.setSpeed = function(e) {
    e = e || event
    this.speed = e.target.value
}

/**
 * 获取代码
 * @return {array} - 指令数组
 */
Application.prototype.getCommands = function() {
    return this.editor.$editor.value.split('\n')
}

/**
 * @param {function} func - 目标指令
 */
Application.prototype.addTaskQueue = function(task) {
    this.taskQueue.push(task)
}

/**
 * 代码执行和动画设置
 */
Application.prototype.start = function() {
    var i = 0
    var self = this
    var step = null

    var timer = setInterval(function () {
        if (!self.taskQueue.length) {
            clearInterval(timer)
            return
        }

        // 如果处于寻路状态，维持i不变
        if (step) {
            i--
            step--
        }

        // 消除前一个节点的标记
        if (i >= 1) {
            self.editor.setMark(i - 1, 'commander-lines-item')
        }

        var task = self.taskQueue.shift()

        try {
            var path = task.run.call(self.robot, task.params)

            if (path) {
                step = path.length
                path = path.map(function(item) {
                    return {
                        run: self.robot.moveTo,
                        params: item,
                    }
                })

                // 添加动画到任务队列
                Array.prototype.unshift.apply(self.taskQueue, path)
            }

            self.editor.setMark(i++, 'success')
        } catch (ex) {
            self.editor.setMark(i, 'error')
            clearInterval(timer)
            console.log(ex)
        }
    }, self.speed)
}

/**
 * 检查，确认无误后执行代码
 */
Application.prototype.run = function() {
    var self = this
    var isLegal = true
    var commands = this.getCommands()

    // 清空当前任务队列
    this.taskQueue = []

    commands.forEach(function(command, index) {
        if (!self.editor.isTrue(command, self.addTaskQueue)) {
            isLegal = false
            self.editor.setMark(index, 'error')
        }
    })

    if (isLegal) {
        this.start()
    }
}

// 实例化
/* eslint-disable no-unused-vars */
var app = new Application()
