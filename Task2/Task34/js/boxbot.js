(function () {
    var input = document.querySelector("input");
    var btn = document.querySelector("button");
    var boxbotMap = document.querySelector(".boxbot");

    // 初始化表格和小方块
    (function init() {
        var robot = document.createElement("img");
        var table = document.createElement("table");
        var tbody = document.createElement("tbody");

        robot.style.top = "0";
        robot.style.left = "0";
        robot.style.transform = "rotate(0deg)";
        robot.src = "img/bot.png";

        // 创建10*10表格
        for (var i = 0; i < 9; i++) {
            tbody.insertRow(i);
            for (var j = 0; j < 9; j++) {
                tbody.rows[i].insertCell(j);
            }
        }
        tbody.appendChild(robot);
        table.appendChild(tbody);
        boxbotMap.appendChild(table);
    })();

    var boxbot = {
        robot: document.querySelector("img"),

        /**
         * 控制小方块转向
         * @param {number} byAngle - 要旋转的角度
         * @param {number} toAngle - 转向到的角度
         */
        turn: function (byAngle, toAngle) {
            var curAngle = parseFloat(/-?\d*\.?\d/.exec(this.robot.style.transform));
            var angle = byAngle ? (curAngle + byAngle) : toAngle; 
            this.robot.style.transform = "rotate(" + angle + "deg)";
        },

        getDirection: function () {
            // 旋转角度
            var angle = parseFloat(/-?\d*\.?\d/.exec(this.robot.style.transform));

            // 将旋转角度范围转换在0-360之间
            angle %= 360;
            return angle >= 0 ? angle : angle + 360;
        },

        move: function (angle) {
            // 更新小方块当前状态
            // x轴偏移量
            var posX = parseInt(this.robot.style.left);
            // y轴偏移量
            var posY = parseInt(this.robot.style.top);

            switch (angle) {
                case 0:
                    if (posY === 352) break;
                    this.robot.style.top = (posY + 44).toString() + "px";
                    break;
                case 90:
                    if (posX === 0) break;
                    this.robot.style.left = (posX - 44).toString() + "px";
                    break;
                case 180:
                    if (posY === 0) break;
                    this.robot.style.top = (posY - 44).toString() + "px";
                    break;
                case 270:
                    if (posX === 352) break;
                    this.robot.style.left = (posX + 44).toString() + "px";
            }
        }
    };

    // 绑定执行事件
    btn.addEventListener("click", function () {
        var value = input.value.trim().toLowerCase();
        switch (value) {
            case "go":
                boxbot.move(boxbot.getDirection());
                break;
            case "turn lef":
                boxbot.turn(90);
                break;
            case "turn rig":
                boxbot.turn(-90);
                break;
            case "turn bas":
                boxbot.turn(180);
                break;
            case "tra lef":
                boxbot.move(90);
                break;
            case "tra top":
                boxbot.move(180);
                break;
            case "tra rig":
                boxbot.move(270);
                break;
            case "tra bot":
                boxbot.move(0);
                break;
            case "mov lef":
                boxbot.turn(null, 90);
                boxbot.move(90);
                break;
            case "mov top":
                boxbot.turn(null, 180);
                boxbot.move(180);
                break;
            case "mov rig":
                boxbot.turn(null, 270);
                boxbot.move(270);
                break;
            case "mov bot":
                boxbot.turn(null, 0);
                boxbot.move(0);
                break;
            default:
                alert("sorry，请检查输入。\n输入'GO', 'TUN LEF', 'TUN RIG', 'TUN BAC'指令来控制小方块");
                break;
        }
    });

    // 绑定键盘控制事件
    document.addEventListener("keydown", function (event) {
        var e = event || window.event;
        switch (e.keyCode) {
            case 37:
                boxbot.turn(90);
                break;
            case 38:
                boxbot.move(boxbot.getDirection());
                break;
            case 39:
                boxbot.turn(-90);
                break;
            case 40:
                boxbot.turn(180);
                break;
        }
    });
})();