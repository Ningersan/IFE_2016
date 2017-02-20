/**
 * Created by Ningersan on 2017/1/29.
 */
function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

function craftDirector(num) {
    this.num = num;
    this.orbite = $(".orbite-" + num);
    this.energy = 100;
    this.readyStop = false;
}

craftDirector.prototype = {
    launch: function () {
        var newEle = document.createElement("div");
        newEle.className = "craft-model";
        newEle.id = "craft-" + this.num;
        newEle.innerHTML = "<div class='craft-inner'><span class='energy-num'>100</span><div class='energy'></div></div>"
        this.orbite.appendChild(newEle);

        var director = document.createElement("p");
        director.textContent = "[指挥官]：" + this.num + "号轨道添加飞船的指令已经发送";
        var massage = document.createElement("p");
        massage.textContent = "[消息]：" + this.num + "号轨道添加飞船成功";
        $(".console").appendChild(director);
        $(".console").appendChild(massage);
    },
    
    fly: function () {
        this.readyStop = false;
        var self = this;
        var angle = 0;
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

            angle += 0.5;
            self.energy -= 1;

            craft.style.transform = "rotate(" + angle + "deg)";
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
        //飞船在三秒后将被摧毁
        setTimeout(function () {
            console.log($a(".craft-control")[self.num - 1]);
            self.orbite.removeChild(self.orbite.children[0]);
        }, 3000)
    }
}

//初始化飞船模型
var craft1 = new craftDirector(1);
var craft2 = new craftDirector(2);
craft1.launch();
craft2.launch();

/************************绑定事件区********************************/
for (var i = 0, len = $a(".craft-control").length; i < len; i++) {
    $a(".craft-control")[i].addEventListener("click", function () {
        var operate = this.children[1];
        operate.style.display = operate.style.display === "" ? "inline-block" : "";
    })
}


for (var i = 0, len = $a(".operates").length; i < len; i++) {
    $a(".operates")[i].addEventListener("click", function (e) {
        console.log(event.currentTarget);
        var operate = e.target.parentNode.parentNode.className;
        switch (operate) {
            case "operate-fly":
                craft1.fly();
                break;
            case "operate-stop":
                craft1.stop();
                break;
            case "operate-destory":
                craft1.destroy();
                break;
        }
    })
}

$("#craft-add").addEventListener("click", function () {
    var num = $(".hidden").children[0].textContent.slice(0, 1);
    var newCraft = new craftDirector(num);
    newCraft.launch();
    $(".hidden").className = "craft-control";
})
