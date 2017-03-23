//通过id获取元素
function $(id) {
    return document.getElementById(id);
}

/**
 * tag生成器，根据输入生成相应的dom节点
 * @constructor
 * @param {string} id 
 */
function TagCreator(id) {
    this.id = id;
    this.ele = $(id);
    this.area = $(id.slice(0, id.indexOf("-")) + "-area");
    this.class = (id === "tag-input")? "style-2" : "style-1";
    this.confirm = $("confirm");
    this.init();
}

TagCreator.prototype = {
    // 初始化事件
    init: function () {
        var self = this;

        // 绑定键盘事件
        this.ele.onkeyup = this.dealKeyCode.bind(this);

        // 绑定确认按钮事件
        this.confirm.onclick = this.render.bind(this);

        // 事件委托，处理标签事件
        this.area.addEventListener("mouseover", function (e) {
            if (e.target.className === "tag") {
                e.target.textContent = "delete: " + e.target.textContent;
                e.target.className = self.class;
            }
        });

        this.area.addEventListener("mouseout", function (e) {
            if (e.target.className === self.class) {
                e.target.textContent = e.target.textContent.replace(/delete: /, "");
                e.target.className = "tag";
            }
        });

        this.area.addEventListener("click", function (e) {
            if (e.target.className === self.class) {
                self.area.removeChild(e.target);
            }
        });
    },

    // 获取输入框输入数据
    getData: function () {
        var strArr = [];

        switch (this.id) {
            case "tag-input":
                strArr.push(this.ele.value.replace(/(^\s*)|(\s*$)|,|，$/g, "").trim());
                break;
            case "text-input":
                strArr = this.ele.value.trim().split(/,|，|、|\s|\n|\r|\t/);
                break;
        }

        return strArr;
    },

    // 当输入空格，逗号，回车时，生成tag
    dealKeyCode: function () {
        if (this.id === "tag-input") {
            if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
                this.render();
            }
        }
    },

    render: function () {
        var strArr = this.getData();

        for (var i = 0, len = strArr.length; i < len; i++) {
            if (strArr[i] !== "" && !this.checkRep(strArr[i])) {
                this.addNode(strArr[i]);
                this.checkNum();
            }
        }

        this.ele.value = "";
    },
    
    addNode: function (str) {
        var node = document.createTextNode(str);
        var newEle = document.createElement("div");

        newEle.className = "tag";
        newEle.appendChild(node);
        this.area.appendChild(newEle);
    },

    // 检查tag数量是否超过10个，如超过则删除
    checkNum: function () {
        var childs = this.area.childNodes;

        if (childs.length > 10) {
            alert("Elements is full, remove the first one");

            for (var i = 10, len = childs.length; i < len; i++) {
                this.area.removeChild(this.area.firstChild);
            }
        }
    },

    // 检查是否有重复的元素
    checkRep: function (str) {
        var childs = this.area.childNodes;

        if (!childs) {
            return false;
        }

        for (var i = childs.length - 1; i >= 0; i--) {
            if (str === childs[i].innerText) {
                return true;
            }
        }
        
        return false;
    }
};

//实例化
var tag = new TagCreator("tag-input");
var hobby = new TagCreator("text-input");