/**
 * Created by Ningersan on 2017/1/29.
 */
function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

function craftProduct(num) {
    this.num = num;
    this.orbite = $(".orbite-" + num);
    this.readyStop = false;
}

craftProduct.prototype = {
    launch: function () {
        var newEle = document.createElement("div");
        newEle.className = "craft-model";
        newEle.id = "craft-1";
        newEle.innerHTML = "<div class='craft-inner'><span class='energy-num'>100</span><div class='energy'></div></div>"
        this.orbite.appendChild(newEle);
    },
    
    fly: function () {
        var angle = 0;
        this.readyStop = false;
        var craftFly = this.orbite.children[0];
        var i = setInterval(function () {
            if (angle === 360) {
                clearInterval(i);
            }
            if (this.readyStop) {
                clearInterval(i);
            }
            angle += 0.5;
            craftFly.style.transform = "rotate(" + angle + "deg)";
        }, 100)
    },

    stop : function () {
        this.readyStop = true;
    },
    
    destroy: function () {
        this.orbite.removeChild(this.orbite.children[0]);
    }
}

//初始化飞船模型
var craft1 = new craftProduct(1);
var craft2 = new craftProduct(2);
craft1.launch();
craft1.fly();
craft2.launch();

/************************绑定事件区********************************/
for (var i = 0, len = $a(".craft").length; i < len; i++) {
    $a(".craft")[i].addEventListener("click", function () {
        var operate = this.children[1];
        operate.style.display = operate.style.display === "" ? "inline-block" : "";
    })
}

for (var i = 0, len = $a(".operates").length; i < len; i++) {
    $a(".operates")[i].addEventListener("click", function () {

    })
}

$("#craft-add").addEventListener("click", function () {
    var num = $(".hidden").children[0].textContent.slice(0, 1);
    var newCraft = new craftProduct(num);
    newCraft.launch();
    $(".hidden").className = "craft";
})
