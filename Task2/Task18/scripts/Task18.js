var numInput = document.getElementById("num-input");
var btnList = document.getElementsByTagName("button");
var numArea = document.getElementById("num-area");

//初始化队列
var queue = [];

//给每个按钮绑定事件
var functs = [addFromLeft, addFromRight, delFromLeft, delFromRight];
for (var i = 0; i < 4; i++) {
    btnList[i].addEventListener("click", functs[i]);
}

function addFromLeft() {
    var item = "<div>"+numInput.value+"</div>";
    var temp = queue; //临时存放队列
    queue = [];
    queue[0] = item;
    for (var i in temp) {
        queue.push(temp[i]);
    }
    renderQueue();
}

function addFromRight() {
    var item = "<div>"+numInput.value+"</div>";
    queue.push(item);
    renderQueue();
}

function delFromLeft() {
    queue.shift();
    renderQueue();
}

function delFromRight() {
    queue.pop();
    renderQueue();
}

function renderQueue() {
    var items = "";
    for (var i in queue) {
        items += queue[i];
    }
    numArea.innerHTML = items;
}