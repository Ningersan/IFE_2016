var btn = document.getElementsByTagName("button");
var root = $(".tree");
var lock = false;
var delay = 500;

function $(ele) {
    return document.querySelector(ele);
}

//设置控件禁用
function setDisabled(flag) {
    for (var i = 0; i < btn.length; i++) {
        btn[i].disabled = flag;
    }
}

function renderTreeNode(nodeList) {
    var node;
    var preNode = null;  //记录上个遍历的节点

    //查找比较元素
    function isEqual(node) {
        var input = $("input").value.trim();
        if (input == node.firstChild.nodeValue.trim()) {
            return true;
        } else {
            return false;
        }
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
    }, delay)
}

function traverseTree(value) {
    var BFSindex = 0;  //广度遍历时的索引
    var nodeList = [];

    function depthFirstSearch(node) {
        if (node) {
            nodeList.push(node);
            depthFirstSearch(node.firstElementChild);
            depthFirstSearch(node.nextElementSibling);
        }
    }

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
        case "DFT":
            depthFirstSearch(root);
            lock = false;
            break;
        case "BFT":
            breadthFirstSearch(root);
            lock = false;
            break;
        case "DFS":
            depthFirstSearch(root);
            lock = true;
            break;
        case "BFS":
            breadthFirstSearch(root);
            lock = true;
            break;
    }
    renderTreeNode(nodeList);
}

//给按钮设置监听事件
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (event) {
        var value = event.target.value;
        traverseTree(value);
    });
}
