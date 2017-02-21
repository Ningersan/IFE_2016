/**
 * Created by Ningersan on 2017/1/29.
 */
function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

function CraftDirector(num) {
    this.num = num;
    this.orbite = $(".orbite-" + num);
    this.angle = 0;
    this.energy = 100;
    this.readyStop = false;
    this.msg = {
        id: this.num,
        commond: null,
    }
}

CraftDirector.prototype = {
    launch: function () {
        var newEle = document.createElement("div");
        newEle.className = "craft-model";
        newEle.id = "craft-" + this.num;
        newEle.innerHTML = "<div class='craft-inner'><span class='energy-num'>100</span><div class='energy'></div></div>"
        this.orbite.appendChild(newEle);

        var director = document.createElement("p");
        director.textContent = "[指挥官]：" + this.num + "号轨道添加飞船的指令已经发送";
        $(".console").appendChild(director);

        this.msg.commond = "launch";
        Mediator(this.msg);
    },
    
    fly: function () {
        this.readyStop = false;
        var self = this;
        var craft = $("#craft-" + self.num);
        var energyText = craft.querySelector(".energy-num");
        var energyBar = craft.querySelector(".energy");

        var i = setInterval(function () {
            if (self.energy === 0 || self.readyStop) {
                self.stop();
                clearInterval(i);
                return;
            }
            if (self.energy < 30) {
                energyBar.style.backgroundColor = "#c83b38";
            }

            self.angle += 0.5;
            self.energy -= 1;

            craft.style.transform = "rotate(" + self.angle + "deg)";
            energyText.textContent = self.energy;
            energyBar.style.height = self.energy + "%";
        }, 100)
    },

    stop : function () {
        this.readyStop = true;
        var self =this;
        var energyText = this.orbite.querySelector(".energy-num");
        var energyBar = this.orbite.querySelector(".energy");

        var i = setInterval(function () {
            if (self.energy === 100 || this.readyStop) {
                clearInterval(i);
                return;
            }
            if (self.energy >= 30) {
                energyBar.style.backgroundColor = "#2fa06c";
            }

            self.energy += 1;
            //更新能量值
            energyText.textContent = self.energy;
            //更新能量条
            energyBar.style.height = self.energy + "%";
        }, 200)
    },
    
    destroy: function () {
        var self = this;
        this.msg.commond = "destory";

        if (Mediator(this.msg)) {
            return;
        }

        //飞船在三秒后将被摧毁
        setTimeout(function () {
            self.orbite.removeChild(self.orbite.children[0]);
        }, 3000)
    }
}

/************************绑定事件区********************************/
for (var i = 0, len = $a(".craft-control").length; i < len; i++) {
    $a(".craft-control")[i].addEventListener("click", function () {
        var operate = this.children[1];
        operate.style.display = operate.style.display === "" ? "inline-block" : "";
    })
}

var msg = {
    id: null,
    command: null
}

for (var i = 0, len = $a(".operates").length; i < len; i++) {
    $a(".operates")[i].addEventListener("click", function (e) {
        var id = this.previousElementSibling.textContent.slice(0, 1);
        var operate = e.target.parentNode.parentNode;
        switch (operate.className) {
            case "operate-fly":
                msg.command = "fly"
                break;
            case "operate-stop":
                msg.command = "stop"
                break;
            case "operate-destory":
                msg.command = "destory"
                operate.parentNode.parentNode.className = "craft-control hidden";
                break;
        }
        msg.id = id;
        Mediator(msg);
    })
}

var craftArr = [];

$("#craft-add").addEventListener("click", function () {
    msg.id =  $(".hidden").children[0].textContent.slice(0, 1);
    msg.command = "launch";
    Mediator(msg);
    $(".hidden").className = "craft-control";
})
