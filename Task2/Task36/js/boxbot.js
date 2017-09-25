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
