/**
 * Created by Ningersan on 2017/2/21.
 */

var BUS = function () {
    //私有变量，记录传输信号
    var signal = null;
    //私有变量，保存飞船队列
    var craftObjArr = [null, null, null, null];

    //公有方法
    return {
        //向飞船队列添加对象
        getSignal: function () {
            return signal;
        },

        setSignal: function (value) {
            signal = value;
        },

        //获取飞船对象数组
        getCraft: function () {
            return craftObjArr;
        },

        //向飞船队列添加对象
        addCraft: function (craft, index) {
            this.getCraft()[index] = craft;
        },

        //模拟丢包率
        simulateDrop: function () {
            var text = "";
            var id = parseInt(this.getSignal().slice(2, 4), 2) + 1;

            if (Math.floor(Math.random() * 10) > 1) {
                switch (this.getSignal().slice(4)) {
                    case "0000":
                        text = "[消息]：" + id + "号飞船启动成功";
                        break;
                    case "0001":
                        text = "[消息]：" + id + "号飞船停止成功";
                        break;
                    case "0010":
                        text = "[消息]：" + id + "号飞船摧毁成功";
                        break;
                }
                this.renderConsole(text, false);
                return true;
            } else {
                switch (this.getSignal().slice(4)) {
                    case "0000":
                        text = "[注意]:" + id + "号飞船的飞行命令丢包了!!!!";
                        break;
                    case "0001":
                        text = "[注意]:" + id + "号飞船的停止命令丢包了!!!!";
                        break;
                    case "0010":
                        text = "[注意]:" + id + "号飞船的摧毁命令丢包了!!!!";
                        break;
                }
                this.renderConsole(text, true);
                return false;
            }
        },

        //向飞船发送信号
        sendSignal: function () {
            var self = this;
            var id = parseInt(this.getSignal().slice(2, 4), 2);
            setTimeout(function () {
                //飞船接受信号
                self.getCraft()[id].receive();
            }, 300)
        },

        //渲染控制台
        renderConsole: function (text, fail) {
            var consoleEle = $(".console");
            var massage = document.createElement("p");
            massage.textContent = text;
            if (fail) {
                massage.className = "fail";
            }
            //更新控制台信息
            consoleEle.appendChild(massage);
            //控制栏滚动条自动滚动到底部
            consoleEle.scrollTop = consoleEle.scrollHeight;
        }
    }
}();