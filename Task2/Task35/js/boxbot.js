
// 初始化表格
(function init() {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");
    var boxbotMap = $(".boxbot-map");

    // 创建10*10表格
    for (var i = 0; i < 9; i++) {
        tbody.insertRow(i);
        for (var j = 0; j < 9; j++) {
            tbody.rows[i].insertCell(j);
        }
    }

    table.appendChild(tbody);
    boxbotMap.appendChild(table);
})();

/**
 * 听指令的小方块
 * @constructor
 */
function Boxbot() {
    this.robot = null;
    this.init();
    addEvent(document, "keydown", this.control.bind(this));
}

/**
 * 创建并初始化小方块
 */
Boxbot.prototype.init = function () {
    var robot = document.createElement("img");

    robot.style.top = "0";
    robot.style.left = "0";
    robot.style.transform = "rotate(0deg)";
    robot.src = "img/bot.png";

    this.robot = robot;
    $("tbody").appendChild(robot);
};

/**
 * 控制小方块转向
 * @param {number} byAngle - 要旋转的角度
 * @param {number} toAngle - 转向到的角度
 */
Boxbot.prototype.turn = function (byAngle, toAngle) {
    var curAngle = parseFloat(/-?\d*\.?\d/.exec(this.robot.style.transform));
    var angle = byAngle ? (curAngle + byAngle) : toAngle;

    this.robot.style.transform = "rotate(" + angle + "deg)";
};

/**
 * 获取小方块当前朝向
 * @returns {Number} 0-360之间的角度
 */
Boxbot.prototype.getDirection = function () {
    // 旋转角度
    var angle = parseFloat(/-?\d*\.?\d/.exec(this.robot.style.transform));

    // 将旋转角度范围转换在0-360之间
    angle %= 360;
    return angle >= 0 ? angle : angle + 360;
};

/**
 * 移动小方块
 * @param {number} angle -  朝向角度
 * @param {number} grid - 前进的格数
 */
Boxbot.prototype.move = function (angle, grid) {
    // 更新小方块当前状态

    // x轴偏移量
    var posX = parseInt(this.robot.style.left);
    // y轴偏移量
    var posY = parseInt(this.robot.style.top);

    var offset = grid ? grid * 42 : 42;

    switch (angle) {
        case 0:
            if (posY + offset > 336) break;
            this.robot.style.top = (posY + offset).toString() + "px";
            break;
        case 90:
            if (posX - offset < 0) break;
            this.robot.style.left = (posX - offset).toString() + "px";
            break;
        case 180:
            if (posY - offset < 0) break;
            this.robot.style.top = (posY - offset).toString() + "px";
            break;
        case 270:
            if (posX + offset > 336) break;
            this.robot.style.left = (posX + offset).toString() + "px";
    }
};

/**
 * 键盘控制事件
 * @param event
 */
Boxbot.prototype.control = function (event) {
    var e = event || window.event;

    switch (e.keyCode) {
        case 37:
            this.turn(90);
            break;
        case 38:
            this.move(this.getDirection());
            break;
        case 39:
            this.turn(-90);
            break;
        case 40:
            this.turn(180);
            break;
    }
};
