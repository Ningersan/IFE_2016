var delay = 500;
var lock = false;
var root = $(".tree");
var btn = document.getElementsByTagName("button");

function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

//设置控件禁用
function setDisabled(flag) {
    for (var i = 0; i < btn.length; i++) {
        btn[i].disabled = flag;
    }
}

/**
 * 给树添加节点
 */
function addElement() {
    var focusEle = $a(".focus");
    var str = $("#add-input").value.trim();

    if (!$(".focus")) {
        alert("请选择一个元素");
    }

    for (var i = 0, len = focusEle.length; i < len; i++) {
        focusEle[i].innerHTML += "<div>" + str + "</div>";
    }
}

/**
 *删除选定的树节点 
 */
function delElement() {
    var delEle = $a(".focus");

    for (var i = 0, len = delEle.length; i < len; i++) {
        delEle[i].parentNode.removeChild(delEle[i]);
    }
}

function renderTreeNode(nodeList) {
    var node;
    var preNode = null;  //记录上个遍历的节点

    //查找比较元素
    function isEqual(node) {
        var input = $("#search-input").value.trim();
        return input === node.firstChild.nodeValue.trim();
    }

    setDisabled(true);

    var timer = setInterval(function () {

        //取消上个节点的颜色
        if (preNode) {
            preNode.style.backgroundColor = "";
        }

        //遍历完成后退出
        if (nodeList.length === 0) {
            setDisabled(false);
            clearInterval(timer);
            return;
        }
        node = nodeList.shift();

        //找到元素后退出
        if (lock && isEqual(node)) {
            node.style.backgroundColor = "#F04C57";
            setDisabled(false);
            clearInterval(timer);
            return;
        }

        node.style.backgroundColor = "#0dc1c1";
        preNode = node;
    }, delay);
}

function dealTree(value) {
    //广度遍历时的索引
    var BFSindex = 0;  
    var nodeList = [];

    // 深度优先搜素
    function depthFirstSearch(node) {
        if (node) {
            nodeList.push(node);
            depthFirstSearch(node.firstElementChild);
            depthFirstSearch(node.nextElementSibling);
        }
    }

    // 广度优先搜索
    function breadthFirstSearch(node) {
        if (node) {
            nodeList.push(node);
            breadthFirstSearch(node.nextElementSibling);
            node = nodeList[BFSindex++];
            breadthFirstSearch(node.firstElementChild);
        }
    }

    switch(value) {
        //当遍历时，lock关闭；搜索元素时，lock打开
        case "add":
            addElement();
            break;
        case "del":
            delElement();
            break;
        case "DFT":
            lock = false;
            depthFirstSearch(root);
            break;
        case "BFT":
            lock = false;
            breadthFirstSearch(root);
            break;
        case "DFS":
            lock = true;
            depthFirstSearch(root);
            break;
        case "BFS":
            lock = true;
            breadthFirstSearch(root);
            break;
    }

    renderTreeNode(nodeList);
}

//绑定点击焦点事件
addEvent($(".tree"), "click", function(event) {
    if (!event.target.className) {
        event.target.className = "focus";
    } else {
        event.target.removeAttribute("class");
    }
});

//给按钮设置监听事件
for (var i = 0; i < btn.length; i++) {    
    addEvent(btn[i], "click", function() {
        var value = event.target.value;
        dealTree(value);
    });
}

/**
 * 事件绑定函数，兼容浏览器差异
 * @param {Node} element - 被绑定的dom节点 
 * @param {string} event - 绑定事件的名称
 * @param {Function} listener - 绑定的函数
 */
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}
