/**
 * Created by Ningersan on 2017/2/24.
 */

//飞船工厂
function CraftCreator(id, speed, energyConsume ,energySystem) {
    //记录创建飞船的id
    this.id = id;
    //记录创建飞船的轨道
    this.orbite = $(".orbite-" + id);
    //根据型号，速度，动力系统，能源系统创建飞船对象
    this.craft = new SpaceCraft(id, speed, energyConsume, energySystem);
}

//飞船登录
CraftCreator.prototype.launch = function () {
    var newEle = document.createElement("div");
    newEle.className = "craft-model";
    newEle.id = "craft-" + this.id;
    newEle.innerHTML = "<div class='craft-inner'><span class='energy-num'>100</span><div class='energy'></div></div>"
    newEle.style.transform = "rotate(0deg)";
    this.orbite.appendChild(newEle);

    //保存飞机对象
    BUS.addCraft(this.craft, this.id - 1);
}


function SpaceCraft(id, speed, energyConsume, energySystem) {
    //飞船型号
    this.id = id;
    //飞船当前状态
    this.state = null;
    //飞船速度
    this.speed = speed;
    //飞船动力系统
    this.energyConsume = energyConsume;
    //飞船能量系统
    this.energySystem = energySystem;
    //飞船能源
    this.energy = 100;
}

SpaceCraft.prototype = {
    fly: function () {
        this.state = "fly";
        var self = this;

        var craft = $("#craft-" + self.id);
        var energyText = craft.querySelector(".energy-num");
        var energyBar = craft.querySelector(".energy");

        var i = setInterval(function () {
            if (Math.floor(self.energy) <= 0 || self.state === "stop") {
                self.stop();
                clearInterval(i);
                return;
            }
            if (self.energy < 30) {
                energyBar.style.backgroundColor = "#c83b38";
            }

            //更新飞船飞行路径
            var angle = /\d*\.?\d/.exec(craft.style.transform);
            angle = parseFloat(angle);
            angle += self.speed;

            craft.style.transform = "rotate(" + angle + "deg)";
            //更新飞船能量条
            self.energy -= self.energyConsume - self.energySystem;
            energyText.textContent = Math.floor(self.energy);
            energyBar.style.height = self.energy + "%";
        }, 50);
    },

    stop : function () {
        this.state = "stop";
        var self =this;

        var craft = $("#craft-" + self.id);
        var energyText = craft.querySelector(".energy-num");
        var energyBar = craft.querySelector(".energy");

        var i = setInterval(function () {
            if (self.energy >= 100 || this.state === "fly") {
                clearInterval(i);
                return;
            }
            if (self.energy >= 30) {
                energyBar.style.backgroundColor = "#2fa06c";
            }

            self.energy += self.energySystem;
            //更新能量值
            energyText.textContent = Math.floor(self.energy);
            //更新能量条
            energyBar.style.height = self.energy + "%";
        }, 200)
    },

    destroy: function () {
        var self = this;
        //删除飞船数组中的当前飞船对象
        BUS.addCraft[this.id - 1] = null;
        //飞船在三秒后将被摧毁
        setTimeout(function () {
            var orbite = $(".orbite-" + self.id);
            orbite.removeChild(orbite.children[0]);
        }, 300)
    },

    //接收信号系统
    receive: function () {
        var signal = this.Adapter();

        switch (signal.command) {
            case "fly":
                this.fly();
                break;
            case "stop":
                this.stop();
                break;
            case "destroy":
                this.destroy();
                break;
        }
    },

    //转换信号格式系统
    Adapter: function () {
        var result = {};
        var command = ["fly", "stop", "destroy"];

        //如果丢包，重新执行模拟程序
        while (!BUS.simulateDrop()) {}

        var signal = BUS.getSignal();
        var index = parseInt(signal.slice(4), 2);
        //解析信号为JSON格式
        result.id = parseInt(signal.slice(0, 4), 2);
        result.command = command[index];
        return result;
    }
}
