var btn = document.getElementsByTagName("button");
var root = get(".tree");
var nodeList = [];
var lock = false;
var delay = 500;

function get(ele) {
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
    function isEqual() {
        var input = get("input").value.trim();
        if (input == node.firstChild.nodeValue.trim()) {
            return true;
        } else {
            return false;
        }
    }

    setDisabled(true);

    var time = setInterval(function () {
        if (nodeList.length === 0) {
            preNode.style.backgroundColor = "";
            setDisabled(false);
            clearTimeout(time);
            return;
        }
        node = nodeList.shift();
        if (isEqual() && lock) {
            node.style.backgroundColor = "#F04C57";
            //设置找到节点的子节点背景色为白色
            for (var i = 0; i < node.children.length; i++) {
                node.children[i].style.backgroundColor = "#fff";
            }
            preNode.style.backgroundColor = "";
            setDisabled(false);
            clearTimeout(time);
            return;
        }

        //取消上个节点的颜色
        if (preNode) {
            preNode.style.backgroundColor = "";
        }
        node.style.backgroundColor = "#0dc1c1";
        //设置正在遍历时节点的子节点背景色为白色
        for (var i = 0; i < node.children.length; i++) {
            node.children[i].style.backgroundColor = "#fff";
        }
        preNode = node;
    }, delay)
}

function traverseTree(value) {
    var BFSindex = 0;  //广度遍历时的索引

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
