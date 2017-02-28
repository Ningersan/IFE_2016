/**
 * Created by Ningersan on 2017/2/22.
 */

function Commander(id, command) {
    //记录飞船id
    this.id = id;
    //记录命令
    this.command = command;
    //传输介质BUS
    this.bus = BUS;
}

Commander.prototype = {
    //初始化执行命令，发送信号，介质接收信号...
    init: function () {
        this.performCommand();
        this.sendSignal();
        this.bus.sendSignal();
    },

    //定义传输信号的数据格式
    Adapter: function () {
        var patch = (this.id - 1).toString(2).length === 2 ? "00" : "000";
        var craftId = patch + (this.id - 1).toString(2);
        var transition = {
            "fly": "0000",
            "stop": "0001",
            "destroy": "0010"
        }
        var signal = craftId + transition[this.command];
        return signal;
    },

    performCommand: function () {
        var text = "";
        switch (this.command) {
            case "launch":
                text = "[指挥官]：" + this.id + "号轨道添加飞船的指令已经发送";
                break;
            case "fly":
                text = "[指挥官]:" + this.id +"号飞船飞行指令已发送";
                break;
            case "stop":
                text = "[指挥官]:" + this.id +"号飞船停止指令已发送";
                break;
            case "destroy":
                text = "[指挥官]:" + this.id +"号飞船摧毁指令已发送";
                $a(".craft-control")[this.id - 1].className = "craft-control hidden";
                break;
        }
        BUS.renderConsole(text, false);
    },

    //向介质发送信号
    sendSignal: function () {
        this.bus.setSignal(this.Adapter());
    }
}
