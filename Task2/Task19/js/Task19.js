var numInput = document.getElementById("num-input");
var btnArea = document.getElementsByTagName("label")[0];
var numArea = document.getElementById("num-area");

//初始化队列
var queue = {
    items: [],

    isEmpty: function () {
        return this.items.length === 0;    
    },

    //元素大于60检查
    isFull: function () {
        if (queue.items.length > 60) {
            alert("The queue is full.");
            return false;
        }
    },

    leftPush: function () {
        var value = getValue();

        if (value && !queue.isFull()) {
            this.items.unshift(value);
            this.render();
        }
    },

    rightPush: function () {
        var value = getValue();

        if (value && !queue.isFull()) {
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

    CreatNumberRandom: function () {
        // init queue
        this.items = [];
        var number = null;

        for (var i = 0; i < 20; i++) {
            number = Math.floor(Math.random() * 90 + 10);
            this.items.push(number);
        }

        this.render();
    },

    render: function() {
        numArea.innerHTML = this.items.map(function (item, index) {
            return "<div data-index='" + index + "' title='" + item + "' style='height: " + item * 2 + "px'></div>";
        }).join("");
    },

    bubbleSort: function () {
        var i = 0;
        var self = this;
        var len = this.items.length;
        var divs = numArea.querySelectorAll("div");

        var timer = setInterval(function () {
            if (i === (len - 1)) {
                clearInterval(timer);
            }

            for (var j = (len - 1); j > i; j--) {
                if (self.items[j] < self.items[j - 1]) {
                    swapData(j, j - 1);
                    swapDomHight(divs[j], divs[j - 1]);
                }
            }

            divs[i++].style.backgroundColor = "#55bcbc";
        }, 150);
    },
};

// 交换两个数据顺序
function swapData(a, b) {
    var temp = queue.items[a];

    queue.items[a] = queue.items[b];
    queue.items[b] = temp;
}

//交换两个dom节点的高度
function swapDomHight(ele1, ele2) {
    var temp = ele1.offsetHeight;

    ele1.style.height = ele2.offsetHeight + "px";
    ele2.style.height = temp + "px";
    //改变颜色
}

//获取input的值
function getValue() {
    var value = numInput.value.trim();
    
    //输入检测
    if (!isNaN(value) && value !== "") {
        if (value > 10 && value < 100) {
            return value;
        } else {
            alert("out of range");
        }
    } else {
        alert("please enter a number");
    }

}

//给每个按钮绑定事件
function btnEvent() {
    addEvent(btnArea, "click", function (event) {
        switch (event.target.id) {
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
            case "num-random":
                queue.CreatNumberRandom();
                break;
            case "bubble-sort":
                queue.bubbleSort();
                break;
        }
    });
}

// 事件委托，给队列显示区绑定事件
function divEvent() {
    addEvent(numArea, "click", function () {
        if (event.target.dataset.index) {
            queue.delete(event.target.dataset.index);
        }
    });
}

// 初始化事件
(function () {
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
