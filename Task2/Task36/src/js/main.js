define(['editor', 'boxbot', 'utils'], function(editor, boxbot, utils) {
    /**
     * @constructor
     */
    function Main() {
        this.speed = 300
        this.algorithm = 'A*'
        this.taskQueue = []
        this.editor = new editor.Editor()
        this.robot = new boxbot.Boxbot()
        this.$speedBtn = utils.$('.speed')
        this.$sizeBtn = utils.$('.map-size')
        this.$runBtn = utils.$('.execute-btn')
        this.$buildBtn = utils.$('.random-btn')
        this.$resetBtn = utils.$('.reset-btn')
        this.init()
    }

    /**
     * 初始化事件
     */
    Main.prototype.init = function() {
        utils.addEvent(this.$runBtn, 'click', this.run.bind(this))
        utils.addEvent(this.$buildBtn, 'click', this.build.bind(this))
        utils.addEvent(this.$sizeBtn, 'change', this.setSize.bind(this))
        utils.addEvent(this.$speedBtn, 'change', this.setSpeed.bind(this))
        utils.addEvent(this.$resetBtn, 'click', this.reset.bind(this))
        utils.addEvent(document, 'keydown', this.robot.control.bind(this.robot))
    }

    /**
     * 设置地图大小
     */
    Main.prototype.setSize = function(e) {
        e = e || event

        var size = parseInt(e.target.value)
        utils.$('article').className = {
            20: 'map-20x20',
            30: 'map-30x30',
        }[size]

        this.taskQueue = []
        this.robot.map.init(size, size)
        this.robot.init()
    }

    /**
     * 获取并设置动画速度
     */
    Main.prototype.setSpeed = function(e) {
        e = e || event
        this.speed = e.target.value
    }

    /**
     * 随机修墙
     */
    Main.prototype.build = function() {
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
    Main.prototype.reset = function() {
        var walls = utils.$a('.wall')
        for (var i = 0, len = walls.length; i < len; i++) {
            walls[i].removeAttribute('class')
        }
    }

    /**
     * 获取代码
     * @return {array} - 指令数组
     */
    Main.prototype.getCommands = function() {
        return this.editor.$editor.value.split('\n')
    }

    /**
     * @param {function} func - 目标指令
     */
    Main.prototype.addTaskQueue = function(task) {
        this.taskQueue.push(task)
    }

    /**
     * 代码执行和动画设置
     */
    Main.prototype.start = function() {
        var i = 0
        var self = this
        var step = null

        var timer = setInterval(function() {
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
                    path = path.map(function (item) {
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
    Main.prototype.run = function() {
        var self = this
        var isLegal = true
        var commands = this.getCommands()

        // 清空当前任务队列
        this.taskQueue = []

        commands.forEach(function(command, index) {
            var task = self.editor.getTask(command)
            console.log(task)
            if (task) {
                self.addTaskQueue(task)
            } else {
                isLegal = false
                self.editor.setMark(index, 'error')
            }
        })

        if (isLegal) {
            this.start()
        }
    }

    return {
        Main: Main,
    }
})
