var numInput = document.getElementById("num-input");
var btnList = document.getElementsByTagName("button");
var numArea = document.getElementById("num-area");

//初始化队列
var queue = {
    items: [],

    leftPush: function () {
        if (getValue()) {
            queue.items.unshift(getValue());
            queue.render();
        }
    },

    rightPush: function () {
        if (getValue()) {
            queue.items.push(getValue());
            queue.render();
        }
    },

    leftPop: function () {
        alert(queue.items.shift());
        queue.render();
    },

    rightPop: function () {
        alert(queue.items.pop());
        queue.render();
    },

    deleteId: function (id) {
        queue.items.splice(id, 1);
        queue.render();
    },

    render: function () {
        var item = "";
        for (var i in queue.items) {
            item += "<div>"+queue.items[i]+"</div>";
        }
        numArea.innerHTML = item;
        divEvent();
    }
}

function getValue() {
    if (!isNaN(numInput.value) && numInput.value != "") {
        return numInput.value;
    }
    else {
        alert("please enter a number");
    }
}

//给每个按钮绑定事件
function btnEvent() {
    var functs = [queue.leftPush, queue.rightPush, queue.leftPop, queue.rightPop];
    for (var i = 0; i < 4; i++) {
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

