var numInput = document.getElementById("num-input");
var btnList = document.getElementsByTagName("button");
var numArea = document.getElementById("num-area");

//初始化队列
var queue = {
    items: [],

    leftPush: function () {
        var newDiv = document.createElement("div");
        var oldDiv = numArea.querySelector("div");
        if (getValue()) {
            newDiv.style.height = getValue() + "px";
            if (oldDiv) {
                numArea.insertBefore(newDiv, oldDiv);
            } else {
                numArea.appendChild(newDiv);
            }
            divEvent(); //给每个div添加事件
        }
    },

    rightPush: function () {
        var newDiv = document.createElement("div");
        if (getValue()) {
            newDiv.style.height = getValue() + "px";
            numArea.appendChild(newDiv);
            divEvent(); //给每个div添加事件
        }
    },

    leftPop: function () {
        var firstEle = numArea.querySelector("div");
        if (firstEle) {
            numArea.removeChild(firstEle);
        } else {
            alert("Queue is empyt.");
        }
    },

    rightPop: function () {
        var lastEle = numArea.lastElementChild;
        if (lastEle) {
            numArea.removeChild(lastEle);
        } else {
            alert("Queue is full");
        }
    },

    deleteId: function (id) {
        numArea.removeChild(numArea.childNodes[id]);
    },

    numRandom: function () {
        var items = "";
        for (var i = 0; i < 20; i++ ) {
            var nums = Math.floor(Math.random() * 90 + 10);
            items += "<div style='height: "+nums * 2+"px'></div>";
        }
        numArea.innerHTML = items;
        divEvent();
    },

    bubbleSort: function () {
        var len = numArea.childElementCount;
        var divs = numArea.querySelectorAll("div");
        var i = 0;
        var timer = setInterval(function () {
            if (i == (len - 1)) {
                clearInterval(timer);
            }
            for (var j = (len - 1); j > i; j--) {
                if (divs[j].offsetHeight < divs[j - 1].offsetHeight) {
                    swap(divs[j], divs[j - 1]);
                }
            }
            divs[i].style.backgroundColor = "#55bcbc";
            divs[i].style.opacity = "0.9";
            ++i;
        }, 150);
    }
}

//交换两个数据，并修改div的高度
function swap(ele1, ele2) {
    var temp = ele1.offsetHeight;
    ele1.style.height = ele2.offsetHeight + "px";
    ele2.style.height = temp + "px";
    //改变颜色
}

//获取input的值
function getValue() {
    var result = numInput.value;
    //元素大于60检查
    if (queue.items.length > 60) {
        alert("The queue is full.");
        return false;
    }
    //输入检测
    if (!isNaN(result) && result != "") {
        if (result > 10 && result < 100) {
            return result * 2;
        } else {
            alert("out of range")
        }
    } else {
        alert("please enter a number");
    }

}

//给每个按钮绑定事件
function btnEvent() {
    var functs = [queue.leftPush, queue.rightPush, queue.leftPop, queue.rightPop, queue.numRandom, queue.bubbleSort];
    for (var i in functs) {
        btnList[i].addEventListener("click", functs[i]);
    }
}

//给num-area中的每个div绑定事件
function divEvent() {
    var len = numArea.childNodes.length;
    for (var i = 0; i < len; i++) {
        numArea.childNodes[i].addEventListener("click", (function (i) {
            return function(){return queue.deleteId(i)};
        })(i));
    }
}

btnEvent();


