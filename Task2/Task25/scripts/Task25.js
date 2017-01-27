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
    },

    deleteNode: function () {
        this.selfElement.parentNode.removeChild(this.selfElement);
    },

    toggleFold: function () {
        var icon = this.selfElement.children[0].children[0];
        if (this.isLeaf()) return this;
        for (var i = 0; i < this.childs.length; i++) {
            if (this.childs[i].selfElement.className == "node-visible") {
                this.childs[i].selfElement.className = "node-hidden";
            } else {
                this.childs[i].selfElement.className = "node-visible";
            }
        }
        if (!this.isFolded()) icon.className = "icon-to-right";
    }
}

var root = new TreeNode({parent : null, childs: [], data: "前端程序猿的修炼之路", selfElement: $(".root")});
root.addNode("基本功");
root.childs[0].addNode("html");
root.childs[0].addNode("css");
root.childs[0].addNode("js");

root.selfElement.addEventListener("click", function (e) {
    var targetNode = e.target;
    var selectedNode = targetNode.parentNode.parentNode;
    if (targetNode.className.indexOf("to") != -1 || targetNode.className.indexOf("title") != -1) {
        selectedNode.TreeNode.toggleFold();
    } else if (targetNode.className == "icon-add") {
        selectedNode.TreeNode.addNode("hha");
    } else if (targetNode.className == "icon-del") {
        selectedNode.TreeNode.deleteNode();
    }
})

