/**
 * @constructor
 */
function Application() {
    this.taskQueue = [];    
    this.robot = new Boxbot();
    this.editor = new Editor();
    this.$startBtn = $(".execute");
    addEvent(this.$startBtn, "click", this.start.bind(this));
}

/**
 * @param {function} func - 目标指令
 */
Application.prototype.addTaskQueue = function (func) {
    this.taskQueue.push(func);
};

/**
 * 代码执行和动画设置
 */
Application.prototype.codeExcute = function () {
    var i = 0;
    var self = this;
    var lastNum = null;    
    var codes = this.editor.$editor.value;
    var keyArr = codes.split("\n");

    var timer = setInterval(function () {
        if (i === self.taskQueue.length) {
            clearInterval(timer);
            return;
        }

        // 消除前一个节点的标记
        if (i >= 1) {
            self.editor.setMark(i - 1, "commander-lines-item");
        }

        self.editor.setMark(i, "success");
        lastNum = parseInt(keyArr[i].match(/(\d+)?$/)[0]);
        self.taskQueue[i++](self.robot, lastNum);
    }, 300);
};

/**
 * 依次执行代码
 */
Application.prototype.start = function () {
    var self = this;

    // 记录错误的行号
    var errorLines = [];
    var codeLines = $(".commander-editor").value.split("\n");

    // 清空当前任务队列
    this.taskQueue = [];

    // 检查指令是否合法
    codeLines.forEach(function (element, index) {
        if (!self.editor.isTrue(element, self.addTaskQueue)) {
            errorLines.push(index);
        }
    });

    if (errorLines.length === 0) {
        this.codeExcute();
    } else {
        for (var i = 0, len = errorLines.length; i < len; i++) {
            this.editor.setMark(errorLines[i], "error");
        }
    }
};

// 实例化
var app = new Application();
