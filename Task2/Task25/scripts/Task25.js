function $(ele) {
    return document.querySelector(ele);
}

/**
 * 节点对象
 * @constructor
 * @param {Node} node - DOM节点 
 */
function TreeNode(node) {
    // 保存节点数据
    this.data = node.data;
    // 记录子节点对象
    this.childs = node.childs;
    // 记录父节点对象
    this.parent = node.parent;
    //访问对应DOM节点
    this.selfElement = node.selfElement;  
    //节点指向对象本身
    this.selfElement.TreeNode = this;     
}

TreeNode.prototype = {
    constructor: TreeNode,

    //判断该节点是否是叶节点
    isLeaf: function () {
        return this.childs.length === 0;
    },

    //判断该节点是否处于折叠状态
    isFolded: function () {
        return !(this.isLeaf() || this.childs[0].selfElement.className === "node-visible");
    },

    /**
     * 添加节点
     * @param {string} str - 要添加的节点名称
     * @return {object} 返回自身对象，以便链式操作
     */
    addNode: function (str) {
        if (str.trim() === "") {
            alert("节点内容不得为空");
            return this;
        }

        var newNode = document.createElement("div");

        newNode.className = "node-visible";
        newNode.innerHTML = "<label><i class='icon-to-bottom'></i><span class='title'>" + str + "</span><i class='icon-add'></i><i class='icon-del'></i></label>";
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
        var selfElement = null;
        var icon = this.selfElement.children[0].children[0];

        if (this.isLeaf()) {
            return this;
        }

        for (var i = 0, len = this.childs.length; i < len; i++) {
            selfElement = this.childs[i].selfElement;
            selfElement.className = selfElement.className == "node-visible" ? "node-hidden" : "node-visible";
        }

        icon.className = this.isFolded() ? "icon-to-right" : "icon-to-bottom";

        //返还自身，以便链式操作
        return this;
    }
};

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

/**
 * 使用广度优先搜索
 * @param {string} str - 搜索的节点名称
 * @return {array} resultList - 返回找到的节点数组
 */
root.search = function (str) {
    var current = null;    

    //存储当前节点
    var queue = [];
    var resultList = [];

    queue.push(this);

    while (queue.length > 0) {
        current = queue.shift();

        //重置遍历节点的字体颜色
        current.selfElement.style.color = "#000";  

        // 找到节点后， 存储到数组中
        if (current.data === str) {
            resultList.push(current);
        }

        // 如节点有子节点， 将子节点压入队列中
        for (var i = 0, len = current.childs.length; i < len; i++) {
            queue.push(current.childs[i]);
        }
    }

    return resultList;
};

//绑定操作事件
root.selfElement.addEventListener("click", function (e) {
    var targetNode = e.target;
    var selectedNode = targetNode.parentNode.parentNode;

    if (targetNode.className.indexOf("to") != -1 || targetNode.className.indexOf("title") != -1) {
        selectedNode.TreeNode.toggleFold();
    } else if (targetNode.className === "icon-add") {
        selectedNode.TreeNode.addNode(prompt("请输入子节点内容："));
    } else if (targetNode.className === "icon-del") {
        selectedNode.TreeNode.deleteNode();
    }
});

//绑定查找事件
$("button").addEventListener("click", function () {
    var pathNode = null;    
    var searchValue = $("input").value.trim();

    if (!searchValue) {
        alert("请输入查询内容！");
        return;
    }

    var resultList = root.search(searchValue);
    
    //重置背景色
    root.search(null);  

    if (resultList.length === 0) {
        alert("sorry，没有找到，换个词试试？QAQ");
    }

    // 展开找到目标的路径，并使用不同颜色来显示节点
    for (var i = 0, len = resultList.length; i < len; i++) {
        pathNode = resultList[i];
        while (pathNode.parent !== null) {
            if (pathNode.selfElement.className == "node-hidden") {
                pathNode.parent.toggleFold();
            }
            pathNode = pathNode.parent;
        }
        resultList[i].selfElement.style.color = "red";
    }
});
