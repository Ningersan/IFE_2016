function $(ele) {
    return document.querySelector(ele);
}

function TreeNode(node) {
    this.parent = node.parent;
    this.childs = node.childs;
    this.data = node.data;
    this.selfElement = node.selfElement;  //访问对应dom节点（div）
    this.selfElement.TreeNode = this;  //从dom节点返回
}

TreeNode.prototype = {
    constructor: TreeNode,

    //判断该节点是否是叶节点
    isLeaf: function () {
        return this.childs.length === 0;
    },

    //判断该节点是否处于折叠状态
    isFolded: function () {
        if (this.isLeaf()) return false;
        if (this.childs[0].selfElement.className == "node-visible") return false;
        return true;
    },

    //添加节点
    addNode: function (str) {
        if (!str || str.trim() == "") {
            alert("节点内容不得为空");
            return this;
        }
        var newNode = document.createElement("div");
        newNode.className = "node-visible";
        newNode.innerHTML = "<label><i class='icon-to-bottom'></i><span class='title'>" + str + "</span><i class='icon-add'></i><i class='icon-del'></i></label>"
        this.selfElement.appendChild(newNode);
        this.childs.push(new TreeNode({parent:this, childs: [], data: str, selfElement: newNode}));
        //返回自身，以便链式操作
        return this;
    },

    //删除节点
    deleteNode: function () {
        this.selfElement.parentNode.removeChild(this.selfElement);
    },

    //展开，收缩节点
    toggleFold: function () {
        var icon = this.selfElement.children[0].children[0];
        if (this.isLeaf()) return this;
        for (var i = 0; i < this.childs.length; i++) {
            this.childs[i].selfElement.className = this.childs[i].selfElement.className == "node-visible"? "node-hidden" : "node-visible";
        }
        icon.className = this.isFolded()? "icon-to-right" : "icon-to-bottom";
        //返还自身，以便链式操作
        return this;
    }
}

//初始化节点
var root = new TreeNode({parent : null, childs: [], data: "前端程序猿的修炼之路", selfElement: $(".root")});
root.addNode("基本功");
root.childs[0].addNode("html").addNode("css").addNode("js").toggleFold();
root.addNode("框架");
root.childs[1].addNode("jQuery").addNode("react").addNode("vue.js").addNode("bootstrap").toggleFold();
root.addNode("计算机基础");
root.childs[2].addNode("操作系统").addNode("编译原理").addNode("网络基础").addNode("计算机组成").toggleFold();
root.childs[0].childs[1].addNode("css权威指南").toggleFold();
root.childs[0].childs[2].addNode("JavaScript Dom 编程艺术").addNode("JavaScript高级程序设计").addNode("JavaScript权威指南").toggleFold();
root.childs[2].childs[0].addNode("深入了解计算机系统").addNode("现代操作系统").toggleFold();
root.childs[2].childs[1].addNode("龙书").addNode("虎书").addNode("鲸书").toggleFold();
root.childs[2].childs[2].addNode("计算机网络：自定向上方法").toggleFold();
root.childs[2].childs[3].addNode("编码").addNode("计算机组成原理").toggleFold();

//使用广度优先搜索
root.search = function (str) {
    var queue = [];  //存储当前节点
    var resultList = [];
    var current;
    queue.push(this);
    //广度优先搜索
    while (queue.length > 0) {
        current = queue.shift();
        current.selfElement.style.color = "#000";  //重置遍历节点的字体颜色
        if (current.data == str) resultList.push(current);
        for (var i = 0; i < current.childs.length; i++) {
            queue.push(current.childs[i]);
        }
    }
    return resultList;
}

//绑定事件
root.selfElement.addEventListener("click", function (e) {
    var targetNode = e.target;
    var selectedNode = targetNode.parentNode.parentNode;
    if (targetNode.className.indexOf("to") != -1 || targetNode.className.indexOf("title") != -1) {
        selectedNode.TreeNode.toggleFold();
    } else if (targetNode.className == "icon-add") {
        selectedNode.TreeNode.addNode(prompt("请输入子节点内容："));
    } else if (targetNode.className == "icon-del") {
        selectedNode.TreeNode.deleteNode();
    }
})

$("button").addEventListener("click", function () {
    var searchValue = $("input").value.trim();
    if (!searchValue) {
        alert("请输入查询内容！");
        return;
    }
    root.search(null);  //重置背景色
    var resultList = root.search(searchValue);
    var pathNode;
    if (resultList.length == 0) alert("sorry，没有找到，换个词试试？QAQ");
    for (var i = 0; i < resultList.length; i++) {
        pathNode = resultList[i];
        while (pathNode.parent != null) {
            if (pathNode.selfElement.className == "node-hidden") pathNode.parent.toggleFold();
            pathNode = pathNode.parent;
        }
        resultList[i].selfElement.style.color = "red";
    }
})
