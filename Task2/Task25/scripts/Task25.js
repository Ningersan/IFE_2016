function $(ele) {
    return document.querySelector(ele);
}

function TreeNode(node) {
    this.parent = node.parent;
    this.childs = node.childs;
    this.data = node.data;
    this.selfElement = node.selfElement;
    this.selfElement.TreeNode = this;
}

TreeNode.prototype = {
    constructor: TreeNode,

    isLeaf: function () {
        return this.childs.length === 0;
    },

    isFolded: function () {
        if (this.isLeaf()) return false;
        if (this.childs[0].selfElement.className == "node-visible") return false;
        return true;
    },

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
        return this;
    },

    deleteNode: function () {
        this.selfElement.parentNode.removeChild(this.selfElement);
    },

    toggleFold: function () {
        var icon = this.selfElement.children[0].children[0];
        if (this.isLeaf()) return this;
        for (var i = 0; i < this.childs.length; i++) {
            this.childs[i].selfElement.className = this.childs[i].selfElement.className == "node-visible"? "node-hidden" : "node-visible";
        }
        icon.className = this.isFolded()? "icon-to-right" : "icon-to-bottom";
        return this;
    }
}

var root = new TreeNode({parent : null, childs: [], data: "前端程序猿的修炼之路", selfElement: $(".root")});
root.addNode("基本功");
root.childs[0].addNode("html").addNode("css").addNode("js").toggleFold();
root.addNode("框架");
root.childs[1].addNode("jQuery").addNode("react").addNode("vue.js").toggleFold();
root.addNode("计算机基础");
root.childs[2].addNode("操作系统").addNode("编译原理").addNode("网络基础").addNode("计算机组成").toggleFold();
root.childs[0].childs[1].addNode("css权威指南").toggleFold();
root.childs[0].childs[2].addNode("JavaScript Dom 编程艺术").addNode("JavaScript高级程序设计").addNode("JavaScript权威指南").toggleFold();
root.childs[2].childs[0].addNode("深入了解计算机系统").addNode("现代操作系统").toggleFold();
root.childs[2].childs[1].addNode("龙书").addNode("虎书").addNode("鲸书").toggleFold();
root.childs[2].childs[2].addNode("计算机网络：自定向上方法").toggleFold();
root.childs[2].childs[3].addNode("编码").addNode("计算机组成原理").toggleFold();

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

