var BOTTOM = 0
var LEFT = 90
var TOP = 180
var RIGHT = 270

/**
 * 听指令的小方块
 * @constructor
 */
function Boxbot(grid) {
    this.map = new Map(grid, grid);
    this.finder = new Finder(this.map);
    this.init();
    this.$robot = $(".boxbot");
    this.grid = grid;
    this.gridWidth = this.$robot.clientWidth;
}

/**
 * 初始化小方块的位置和键盘事件
 */
Boxbot.prototype.init = function() {
    var robot = document.createElement("img");
    robot.className = "boxbot"
    robot.src = "img/bot.png";

    robot.style.top = $("td").clientWidth + "px";
    robot.style.left = $("td").clientHeight + "px";
    robot.style.transform = "rotate(0deg)";

    $("tbody").appendChild(robot);

    addEvent(document, "keydown", this.control.bind(this));
};

/**
 * 控制小方块转向
 * @param {number} byAngle - 要旋转的角度
 * @param {number} toAngle - 转向到的角度
 */
Boxbot.prototype.turn = function(byAngle, toAngle) {
    var angle = null;
    var curAngle = parseInt(/-?\d*\.?\d/.exec(this.$robot.style.transform));
    var currentDirection = this.getCurrentDirection();
    var rotateMap = {
        0: { 0: 0, 90: 90, 180: 180, 270: -90 },
        90: { 90: 0, 180: 90, 270: 180, 0: -90 },
        180: { 180: 0, 270: 90, 0: 180, 90: -90 },
        270: { 270: 0, 0: 90, 90: 180, 180: -90 },
    }

    angle = byAngle ? (curAngle + byAngle) : curAngle + rotateMap[currentDirection][toAngle];
    this.$robot.style.transform = "rotate(" + angle + "deg)";
};

/**
 * 获取小方块当前朝向
 * @returns {Number} 0-360之间的角度
 */
Boxbot.prototype.getCurrentDirection = function() {
    // 旋转角度
    var angle = parseFloat(/-?\d*\.?\d/.exec(this.$robot.style.transform));

    // 将旋转角度范围转换在0-360之间
    angle %= 360;
    return angle >= 0 ? angle : angle + 360;
};

/**
 * 获取小方块当前坐标位置
 * @returns {Object} 坐标对象
 */
Boxbot.prototype.getCurrentPosition = function() {
    var $robot = this.$robot
    var offsetTop = $robot.style.top.replace('px', '');
    var offsetLeft = $robot.style.left.replace('px', '');

    return {
        x: Math.round(offsetLeft / $robot.clientWidth),
        y: Math.round(offsetTop / $robot.clientHeight),
    }
}

/**
 * 根据当前方向获取偏移值
 * @param {number} direction - 方向
 * @param {number} grid - 前进的格数
 */
Boxbot.prototype.getOffsetPosition = function (direction, grid) {
    var sign = {
        0: [0, 1],
        90: [-1, 0],
        180: [0, -1],
        270: [1, 0],
    }[direction];

    return {
        x: sign[0] * grid,
        y: sign[1] * grid,
    };
}

/**
 * 获取目的坐标
 * @param {number} direction - 方向
 * @param {number} grid - 前进的格数
 * @return {array} - 目的坐标
 */
Boxbot.prototype.getPosition = function(direction, grid) {
    // direction 可能为0， 不能直接判断if（direction)
    if (direction === null) {
        direction = this.getCurrentDirection();
    }

    var currentPosition = this.getCurrentPosition()
    var offsetPosition = this.getOffsetPosition(direction, grid)
    return {
        x: currentPosition.x + offsetPosition.x,
        y: currentPosition.y + offsetPosition.y,
    }
}

/**
 * 移动小方块
 * @param {number} angle - 朝向角度
 * @param {number} grid - 前进的格数
 * @return {boolean} - 返回是否执行状态
 */
Boxbot.prototype.move = function(direction, grid) {
    this.checkPath(direction, grid);

    var destination = this.getPosition(direction, grid);
    return this.moveTo(destination, false);
};

/**
 * 移动小方块到指定坐标位置
 * @param {array} destination - 目的坐标
 * @param {boolean} isTurn - 是否转向
 */
Boxbot.prototype.moveTo = function(destination, isTurn) {
    isTurn = typeof isTurn === 'undefined' ? true : isTurn;

    if (isTurn) {
        var position = this.getCurrentPosition()
        var distance = [parseInt(destination.x) - position.x, parseInt(destination.y) - position.y]

        if (distance[0] < 0) {
            this.turn(null, LEFT);
        } else if (distance[0] > 0) {
            this.turn(null, RIGHT);
        } else if (distance[1] < 0) {
            this.turn(null, TOP);
        } else if (distance[1] > 0) {
            this.turn(null, BOTTOM);
        }
    }

    this.$robot.style.left = destination.x * this.gridWidth + 'px';
    this.$robot.style.top = destination.y * this.gridWidth + 'px';
}

Boxbot.prototype.search = function(destination) {
    var self = this;
    var tasks = [];
    var path = this.finder.findWay(this.getCurrentPosition(), { x: parseInt(destination[0]), y: parseInt(destination[1]) });
    return path;
    var timer = setInterval(function() {
        if (path.length === 0) {
            clearInterval(timer);
            return;
        }

        self.moveTo(path.shift(), true);
    }, 300);
}

Boxbot.prototype.build = function() {
    var position = this.getPosition(this.getCurrentDirection(), 1);
    if (!this.map.getType(position)) {
        this.map.setClassName(position, 'wall');
    } else {
        throw '前方无法修墙';
    }
}

Boxbot.prototype.setColor = function(color) {
    var position = this.getPosition(this.getCurrentDirection(), 1);
    if (this.map.getType(position) === 'wall') {
        this.map.setColor(position, color);
    } else {
        throw '前方没有墙';
    }
}

Boxbot.prototype.checkPath = function (direction, grid) {
    var position = this.getCurrentPosition();
    var offsetPosition = this.getOffsetPosition(direction, 1);

    for (var i = 1; i <= grid; i++) {
        var x = position.x + i * offsetPosition.x;
        var y = position.y + i * offsetPosition.y;

        if (this.map.getType({'x': x, 'y': y}) !== '') {
            throw '无法到达[' + x + ',' + y + ']';
        }
    }
}

/**
 * 键盘控制事件
 * @param event
 */
Boxbot.prototype.control = function(event) {
    var e = event || window.event;

    switch (e.keyCode) {
        case 13:
            this.build();
            break;
        case 37:
            this.turn(90);
            break;
        case 38:
            this.move(this.getCurrentDirection(), 1);
            e.preventDefault();
            break;
        case 39:
            this.turn(-90);
            break;
        case 40:
            this.turn(180);
            break;
    }
};
