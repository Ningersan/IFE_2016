/* eslint-disable no-unused-vars */

/**
 * 判断坐标点是否在列表中
 * @param {object} point - 坐标点
 * @param {array} list - 列表
 * @return {boolean}
 */
function inList(point, list) {
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i]
        if (item.x === point.x && item.y === point.y) {
            return i
        }
    }

    return false
}

/**
 * 根据指定属性值降序排列数组
 * @param {string} property - 属性
 * @return {boolean}
 */
function comparisonByProperty(property) {
    return function(object1, object2) {
        return object2[property] - object1[property]
    }
}

/**
 * 查找第一个匹配的元素
 * @param {string} ele - 选择器
 */
function $(ele) {
    return document.querySelector(ele)
}

/**
 * 查找所有匹配的元素
 * @param {string} ele - 选择器
 */
function $a(ele) {
    return document.querySelectorAll(ele)
}

/**
 * 事件绑定函数，兼容浏览器差异
 */
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener)
    } else {
        element['on' + event] = listener
    }
}

/**
 * @constructor
 * @param {int} columns
 * @param {int} rows
 */
function Map(rows, columns) {
    this.rows = rows
    this.columns = columns
    this.$element = $('.boxbot-map')
    this.init()
    this.$boxs = $a('td')
}

/**
 * 初始化地图
 */
Map.prototype.init = function() {
    var table = document.createElement('table')
    var tbody = document.createElement('tbody')

    table.className = this.rows === 20 ? 'map-20x20' : 'map-30x30'

    // 创建表格
    for (var i = 0; i < this.rows + 1; i++) {
        tbody.insertRow(i)

        for (var j = 0; j < this.columns + 1; j++) {
            var cell = tbody.rows[i].insertCell(j)

            if (i === 0 && j === 0) {
                cell.className = 'x-axis'
            } else if (i === 0) {
                cell.innerText = j
                cell.className = 'x-axis'
            } else if (j === 0) {
                cell.innerText = i
                cell.className = 'y-axis'
            }
        }
    }

    table.appendChild(tbody)
    this.$element.appendChild(table)
}

/**
 * 随机获取一组坐标
 */
Map.prototype.random = function () {
    var x = Math.floor(Math.random() * this.rows + 1)
    var y = Math.floor(Math.random() * this.columns + 1)

    return { 'x': x, 'y': y }
}

/**
 * 根据位置坐标获取当前节点
* @param {object} position - 位置坐标
* @return {node} - 返回对应节点
 */
Map.prototype.getNode = function(position) {
    return this.$boxs[position.y * (this.rows + 1) + position.x]
}

/**
 * 根据位置坐标获取当前节点类型
* @param {object} position - 位置坐标
* @return {string} - 返回类名
 */
Map.prototype.getType = function(position) {
    return this.getNode(position).className
}

/**
 * 根据位置坐标获修墙
* @param {object} position - 位置坐标
 */
Map.prototype.setWall = function(position) {
    this.getNode(position).className = 'wall'
}

/**
 * 设置墙的颜色
 * @param {node} node - 节点
 * @param {string} color - 颜色
 */
Map.prototype.setColor = function(position, color) {
    this.getNode(position).style.backgroundColor = color
}

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

var BOTTOM = 0
var LEFT = 90
var TOP = 180
var RIGHT = 270

/**
 * @constructor
 * 听指令的小方块
 */
function Boxbot(grid) {
    this.map = new Map(grid, grid)
    this.finder = new Finder(this.map)
    this.init()
    this.$robot = $('.boxbot')
    this.gridWidth = this.$robot.clientWidth
    this.gridHeight = this.$robot.clientHeight
}

/**
 * 初始化小方块的位置和键盘事件
 */
Boxbot.prototype.init = function() {
    var robot = document.createElement('img')
    robot.className = 'boxbot'
    robot.src = 'img/bot.png'

    robot.style.top = $('td').clientWidth + 'px'
    robot.style.left = $('td').clientHeight + 'px'
    robot.style.transform = 'rotate(0deg)'

    $('tbody').appendChild(robot)
    addEvent(document, 'keydown', this.control.bind(this))
}

/**
 * 控制小方块转向
 * @param {number} byAngle - 要旋转的角度
 * @param {number} toAngle - 转向到的角度
 */
Boxbot.prototype.turn = function(byAngle, toAngle) {
    var angle = null
    var curAngle = parseInt(/-?\d*\.?\d/.exec(this.$robot.style.transform))
    var currentDirection = this.getCurrentDirection()
    var rotateMap = {
        0: { 0: 0, 90: 90, 180: 180, 270: -90 },
        90: { 90: 0, 180: 90, 270: 180, 0: -90 },
        180: { 180: 0, 270: 90, 0: 180, 90: -90 },
        270: { 270: 0, 0: 90, 90: 180, 180: -90 },
    }

    angle = byAngle ? (curAngle + byAngle) : curAngle + rotateMap[currentDirection][toAngle]
    this.$robot.style.transform = 'rotate(' + angle + 'deg)'
}

/**
 * 获取小方块当前朝向
 * @returns {Number} 0-360之间的角度
 */
Boxbot.prototype.getCurrentDirection = function() {
    // 旋转角度
    var angle = parseFloat(/-?\d*\.?\d/.exec(this.$robot.style.transform))

    // 将旋转角度范围转换在0-360之间
    angle %= 360
    return angle >= 0 ? angle : angle + 360
}

/**
 * 获取小方块当前坐标位置
 * @returns {Object} 坐标对象
 */
Boxbot.prototype.getCurrentPosition = function() {
    var $robot = this.$robot
    var offsetTop = $robot.style.top.replace('px', '')
    var offsetLeft = $robot.style.left.replace('px', '')

    return {
        x: Math.round(offsetLeft / $robot.clientWidth),
        y: Math.round(offsetTop / $robot.clientHeight),
    }
}

/**
 * 根据当前方向获取偏移值
 * @param {number} direction - 方向
 * @param {number} step - 前进的格数
 */
Boxbot.prototype.getOffsetPosition = function (direction, step) {
    var sign = {
        0: [0, 1],
        90: [-1, 0],
        180: [0, -1],
        270: [1, 0],
    }[direction]

    return {
        x: sign[0] * step,
        y: sign[1] * step,
    }
}

/**
 * 获取目的坐标
 * @param {number} direction - 方向
 * @param {number} step - 前进的格数
 * @return {array} - 目的坐标
 */
Boxbot.prototype.getPosition = function(direction, step) {
    var currentPosition = null
    var offsetPosition = null

    // direction 可能为0， 不能直接判断if（direction)
    if (direction === null) {
        direction = this.getCurrentDirection()
    }

    currentPosition = this.getCurrentPosition()
    offsetPosition = this.getOffsetPosition(direction, step)

    return {
        x: currentPosition.x + offsetPosition.x,
        y: currentPosition.y + offsetPosition.y,
    }
}

/**
 * 移动小方块
 * @param {number} angle - 朝向角度
 * @param {number} step - 前进的格数
 * @return {boolean} - 返回是否执行状态
 */
Boxbot.prototype.move = function(direction, step) {
    var destination = null

    this.checkPath(direction, step)
    destination = this.getPosition(direction, step)

    return this.moveTo(destination, false)
}

/**
 * 移动小方块到指定坐标位置
 * @param {array} destination - 目的坐标
 * @param {boolean} isTurn - 是否转向
 */
Boxbot.prototype.moveTo = function(destination, isTurn) {
    isTurn = typeof isTurn === 'undefined' ? true : isTurn

    if (isTurn) {
        var position = this.getCurrentPosition()
        var distance = [destination.x - position.x, destination.y - position.y]

        if (distance[0] < 0) {
            this.turn(null, LEFT)
        } else if (distance[0] > 0) {
            this.turn(null, RIGHT)
        } else if (distance[1] < 0) {
            this.turn(null, TOP)
        } else if (distance[1] > 0) {
            this.turn(null, BOTTOM)
        }
    }

    this.$robot.style.left = destination.x * this.gridWidth + 'px'
    this.$robot.style.top = destination.y * this.gridHeight + 'px'
}

/**
 * 搜素路径
 * @@param {object} destination - 目的坐标
 * @return {array} - 路径数组
 */
Boxbot.prototype.search = function(destination) {
    var start = this.getCurrentPosition()
    var end = { x: parseInt(destination[0]), y: parseInt(destination[1]) }
    var path = this.finder.findWay(start, end)

    return path
}

/**
 * 在朝向上修墙
 */
Boxbot.prototype.build = function() {
    var position = this.getPosition(this.getCurrentDirection(), 1)

    if (!this.map.getType(position)) {
        this.map.setWall(position)
    } else {
        throw new Error('前方无法修墙')
    }
}

/**
 * 给墙设置颜色
 * @param {string} color - 颜色号
 */
Boxbot.prototype.setColor = function(color) {
    var position = this.getPosition(this.getCurrentDirection(), 1)

    if (this.map.getType(position) === 'wall') {
        this.map.setColor(position, color)
    } else {
        throw new Error('前方没有墙')
    }
}

/**
 * 检查路径是否可到达
 * @param {number} direction - 方向
 * @param {number} step - 前进格数
 */
Boxbot.prototype.checkPath = function (direction, step) {
    var position = this.getCurrentPosition()
    var offsetPosition = this.getOffsetPosition(direction, 1)

    for (var i = 1; i <= step; i++) {
        var x = position.x + i * offsetPosition.x
        var y = position.y + i * offsetPosition.y

        if (this.map.getType({'x': x, 'y': y})) {
            throw new Error('无法到达[' + x + ',' + y + ']')
        }
    }
}

/**
 * 键盘控制事件
 * @param {event}
 */
Boxbot.prototype.control = function(event) {
    var e = event || window.event

    switch (e.keyCode) {
        case 13:
            this.build()
            break
        case 37:
            this.turn(90)
            break
        case 38:
            this.move(this.getCurrentDirection(), 1)
            e.preventDefault()
            break
        case 39:
            this.turn(-90)
            break
        case 40:
            this.turn(180)
            break
    }
}

/**
 * 寻路器
 * @constructor
 */
function Finder(map) {
    this.map = map

    // 开启列表，存放等待检查的元素
    this.openList = []

    // 关闭列表，存放不需要检查的元素
    this.closeList = []

    // 结果数组，存放寻址路径
    this.result = []
}

/**
 * 获取坐标点周围（上下左右）的坐标
 * @param {object} point - 坐标
 * @return {array}
 */
Finder.prototype.getRounds = function(point) {
    var up = {x: point.x, y: point.y - 1}
    var right = {x: point.x + 1, y: point.y}
    var down = {x: point.x, y: point.y + 1}
    var left = {x: point.x - 1, y: point.y}

    return [up, right, down, left]
}

/**
 * 过滤掉四周点的墙和外界坐标
 * @param {array} rounds - 四周点坐标数组
 */
Finder.prototype.filter = function(rounds) {
    var self = this

    return rounds.filter(function(point) {
        return !self.map.getType({x: point.x, y: point.y}) && !inList(point, self.closeList)
    })
}

/**
 * A star 算法，不可沿着斜方向移动
 * @param {object} start - 起点
 * @param {object} end - 终点
 * @return {array} - 路径
 */
Finder.prototype.findWay = function(start, end) {
    // 结果索引, 在开启列表中的终点
    var resultIndex = null

    // 路径点，沿着parent上朔可得到路径
    var dotCur = null

    // 重置数据
    this.openList = []
    this.closeList = []
    this.result = []

    // 如果目标点在地图外或者有墙，结束寻路
    if (this.map.getType(end)) {
        throw new Error('无法到达 ' + '[' + end.x + ',' + end.y + ']')
    }

    // 如果目标点与起点在同一个位置，什么都不做
    if (start.x === end.x && start.y === end.y) {
        return
    }

    // 向开启列表存入起点
    this.openList.push({x: start.x, y: start.y, G: 0})

    // 结果索引为开启列表中出现的终点
    while (!(resultIndex = inList({ x: end.x, y: end.y }, this.openList))) {
        // 当前节点为开启列表中F值最小的点
        var currentPoint = this.openList.pop()

        // 向关闭列表存入当前点
        this.closeList.push(currentPoint)

        var filter = this.filter(this.getRounds(currentPoint))

        // 计算开启列表中点的G, H, F值
        var openList = filter.map(function(point) {
            // 设置父节点
            point.parent = currentPoint
            // G点表示起点到该点的移动耗费（假设为10），不可沿着对角线走
            point.G = currentPoint.G + 10
            // H点表示该点移动到终点的预计耗费（假设为10），不可沿着对角线走
            point.H = Math.abs(end.x - point.x) * 10 + Math.abs(end.y - point.y) * 10
            // F点表示G点加上H点的值
            point.F = point.G + point.H
            return point
        })

        this.openList = this.openList.concat(openList)

        // 如果开启列表没有值，表示找不到路径
        if (!this.openList.length) {
            throw new Error('无法寻路')
        }

        // 降序排列开启列表
        this.openList.sort(comparisonByProperty('F'))
    }

    // 结果列表是否为空
    if (!resultIndex) {
        return []
    }

    // 根据结果索引，找到路径点
    dotCur = this.openList[resultIndex]

    // 沿着路径点的父节点上朔即可获得完整路径
    while (dotCur.x !== start.x || dotCur.y !== start.y) {
        this.result.unshift({x: dotCur.x, y: dotCur.y})
        dotCur = dotCur.parent
    }

    return this.result
}

/* eslint-disable no-unused-vars */

/**
 * 记录指令的正则匹配规则和方法
 * @namespace
 */
var commands = {
    'go': {
        pattern: /^go(\s+)?(\d+)?$/i,
        run: function(grid) {
            return this.move(this.getCurrentDirection(), grid[1] || 1)
        },
    },
    'tun': {
        pattern: /^tun\s+(lef|rig|bac)$/i,
        run: function(direction) {
            return this.turn({ lef: -90, rig: 90, bac: 180 }[direction[0].toLowerCase()])
        },
    },
    'tra': {
        pattern: /^tra\s+(top|rig|bot|lef)(\s+)?(\d+)?$/i,
        run: function(params) {
            var direction = {top: TOP, rig: RIGHT, bot: BOTTOM, lef: LEFT}[params[0].toLowerCase()]
            return this.move(direction, params[2] || 1)
        },
    },
    'mov': {
        pattern: /^mov\s+(top|rig|bot|lef)(\s+)?(\d+)?$/i,
        run: function(params) {
            var direction = { top: TOP, rig: RIGHT, bot: BOTTOM, lef: LEFT }[params[0].toLowerCase()]
            this.turn(null, direction)
            return this.move(direction, params[2] || 1)
        },
    },
    'mov to': {
        pattern: /^mov\s+to\s+(\d+)?,(\d+)?$/i,
        run: function(coordinate) {
            return this.search(coordinate)
        },
    },
    'build': {
        pattern: /^build$/i,
        run: function() {
            return this.build()
        },
    },
    'bru': {
        pattern: /^bru\s+?(.*)$/i,
        run: function(color) {
            return this.setColor(color)
        },
    },
}

/**
 * @constructor
 */
function Application() {
    this.speed = 300
    this.taskQueue = []
    this.editor = new Editor()
    this.robot = new Boxbot(20)
    this.$runBtn = $('.execute-btn')
    this.$buildBtn = $('.random-btn')
    this.init()
}

/**
 * 初始化事件
 */
Application.prototype.init = function() {
    addEvent(this.$runBtn, 'click', this.run.bind(this))
    addEvent(this.$buildBtn, 'click', this.build.bind(this))
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
        console.log('sss')
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
