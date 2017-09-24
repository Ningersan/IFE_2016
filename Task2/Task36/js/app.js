/**
 * @constructor
 */
function Application() {
    this.speed = 300;
    this.taskQueue = [];
    this.robot = new Boxbot(20);
    this.editor = new Editor();
    this.$runBtn = $(".execute-btn");
    this.$buildBtn = $(".random-btn");
    addEvent(this.$runBtn, "click", this.run.bind(this));
    addEvent(this.$buildBtn, "click", this.build.bind(this));
}

Application.prototype.build = function() {
    var map = this.robot.map;
    var coordinate = map.random();

    while (map.getType(coordinate)) {
        coordinate = map.random();
    }

    map.setClassName(coordinate, 'wall');
}

/**
 * 获取代码
 * @return {array} - 指令数组
 */
Application.prototype.getCommands = function() {
    return this.editor.$editor.value.split("\n");
};

/**
 * @param {function} func - 目标指令
 */
Application.prototype.addTaskQueue = function(task) {
    this.taskQueue.push(task);
};

/**
 * 代码执行和动画设置
 */
Application.prototype.start = function() {
    var i = 0;
    var self = this;
    var step = null;

    var timer = setInterval(function () {
        if (!self.taskQueue.length) {
            clearInterval(timer);
            return;
        }

        if (step) {
            i--;
            step--;
        }

        // 消除前一个节点的标记
        if (i >= 1) {
            self.editor.setMark(i - 1, "commander-lines-item");
        }

        var task = self.taskQueue.shift();

        try {
            var path = task.run.call(self.robot, task.params);

            if (path) {
                step = path.length;
                path = path.map(function(item) {
                    return {
                        run: self.robot.moveTo,
                        params: item,
                    }
                })
                Array.prototype.unshift.apply(self.taskQueue, path);
            }

            self.editor.setMark(i++, "success");
        } catch (ex) {
            self.editor.setMark(i, "error");
            clearInterval(timer);
            console.log(ex)
        }
    }, self.speed);
};

/**
 * 检查，确认无误后执行代码
 */
Application.prototype.run = function() {
    var self = this;
    var isLegal = true;
    var commands = this.getCommands();

    // 清空当前任务队列
    this.taskQueue = [];

    commands.forEach(function(command, index) {
        if (!self.editor.isTrue(command, self.addTaskQueue)) {
            isLegal = false;
            self.editor.setMark(index, "error");
        }
    })

    if (isLegal) {
        this.start();
    }
};

// 实例化
var app = new Application();
