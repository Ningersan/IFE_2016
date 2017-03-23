var delay = 500;
var lock = false;
var BFSindex = 0;    //广度遍历时的索引 
var root = $(".tree");
var btn = document.getElementsByTagName("button");

function $(ele) {
    return document.querySelector(ele);
}

/**
 * 设置控件禁用
 * @param {string} flag -  接受true或false
 */
function setDisabled(flag) {
    for (var i = 0; i < btn.length; i++) {
        btn[i].disabled = flag;
    }
}

/**
 * 查找比较元素
 * @param {Node} node - 要比较的dom节点
 */
function isEqual(node) {
    var input = $("input").value.trim();
    return input == node.firstChild.nodeValue.trim();
}

/**
 * 深度优先搜索
 * @param {Node} node - dom节点 
 * @param {Array} nodeList - 存储dom节点的数组
 */
function depthFirstSearch(node, nodeList) {
    if (node) {
        nodeList.push(node);
        depthFirstSearch(node.firstElementChild, nodeList);
        depthFirstSearch(node.nextElementSibling, nodeList);
    }
}

/**
 * 广度优先搜索
 * @param {Node} node - dom节点 
 * @param {Array} nodeList - 存储dom节点的数组
 */
function breadthFirstSearch(node, nodeList) {
    if (node) {
        nodeList.push(node);
        breadthFirstSearch(node.nextElementSibling, nodeList);
        node = nodeList[BFSindex++];
        breadthFirstSearch(node.firstElementChild, nodeList);
    }
}

/**
 * 根据节点在数组中的位置来完成遍历的动画
 * @param {Array} nodeList - 目标dom节点数组
 */
function renderTreeNode(nodeList) {
    var node;

    //记录上个遍历的节点
    var preNode = null;  

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

    setDisabled(true);
}

/**
 * 根据选择的方法来遍历树，将遍历经过的节点存储在nodeList数组中
 * @param {string} value - 选择遍历的方式 
 */
function traverseTree(value) { 
    var nodeList = [];

    switch(value) {
        //当遍历时，lock关闭；搜索元素时，lock打开
        case "DFT":
            depthFirstSearch(root, nodeList);
            lock = false;
            break;
        case "BFT":
            BFSindex = 0;
            breadthFirstSearch(root, nodeList);
            lock = false;
            break;
        case "DFS":
            depthFirstSearch(root, nodeList);
            lock = true;
            break;
        case "BFS":
            BFSindex = 0;
            breadthFirstSearch(root, nodeList);
            lock = true;
            break;
    }
    
    renderTreeNode(nodeList);
}

//给按钮设置监听事件
for (var i = 0; i < btn.length; i++) {
    addEvent(btn[i], "click", function(event) {
        var value = event.target.value;
        traverseTree(value);
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