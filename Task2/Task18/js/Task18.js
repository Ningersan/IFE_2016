var numInput = document.getElementById("num-input");
var btnArea = document.getElementsByTagName("label")[0];
var numArea = document.getElementById("num-area");

//初始化队列
var queue = {
    items: [],

    // 从输入框获取数据
    getValue: function() {
        var value = numInput.value;
        if (!isNaN(value) && value !== "") {
            // 清空输入框
            numInput.value = "";
            return value;
        }
        else {
            alert("please enter a number");
        }
    },

    leftPush: function () {
        var value = this.getValue();
        if (value) {
            this.items.unshift(value);
            this.render();
        }
    },
 
    rightPush: function () {
        var value = this.getValue();
        if (value) {
            this.items.push(value);
            this.render();
        }
    },

    leftPop: function () {
        alert(this.items.shift());
        this.render();
    },

    rightPop: function () {
        alert(this.items.pop());
        this.render();
    },

    delete: function (index) {
        this.items.splice(index, 1);
        this.render();
    },

    render: function () {
        numArea.innerHTML = this.items.map(function (item, index) {
            return "<div data-index='" + index + "'>" + item + "</div>";
        }).join("");
    }
}

//事件委托，给四个按钮绑定事件
function btnEvent() {
    addEvent(btnArea, "click", function(event) {
        switch(event.target.id) {
            case "from-left":
                queue.leftPush();
                break;
            case "from-right":
                queue.rightPush();
                break;
            case "to-left":
                queue.leftPop();
                break;
            case "to-right":
                queue.rightPop();
                break;
        }
    })
}

// 事件委托，给队列显示区绑定事件
function divEvent() {
    addEvent(numArea, "click", function() {
        if (event.target.dataset.index) {
            queue.delete(event.target.dataset.index);
        }
    })
}

// 初始化事件
(function() {
    btnEvent();
    divEvent();
})();

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}
