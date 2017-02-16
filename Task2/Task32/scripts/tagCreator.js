/**
 * Created by Ningersan on 2017/2/11.
 */

//通过id获取元素
function $id(id) {
    return document.getElementById(id);
}

function tagCreator(id) {
    this.id = id;
    this.ele = $id(id);
    this.area = $id(id.slice(0, id.indexOf("-")) + "-area");
    this.class = "color-change";
    this.init();
}

tagCreator.prototype = {
    init: function () {
        this.ele.onkeyup = this.dealInput.bind(this);
    },

    getStr: function () {
        return this.ele.value.replace(/(^\s*)|(\s*$)|,|，$/g, "").trim();
    },

    dealInput: function () {
        var str = this.getStr();
        console.log(event.keyCode);
        if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
            if (str != "" && !this.checkRep(str)) {
                console.log(str);
                this.addNode(str);
                this.checkNum();
            }
            this.ele.value = "";
        }
    },

    addNode: function (str) {
        var self = this;
        var node = document.createTextNode(str);
        var newEle = document.createElement("div");
        newEle.appendChild(node);
        this.area.appendChild(newEle);
        //给每个node绑定事件
        newEle.addEventListener("mouseover", function () {
            this.textContent = "delete: " + this.textContent;
            this.className = self.class;
        })
        newEle.addEventListener("mouseout", function () {
            this.textContent = this.textContent.replace(/delete: /, "");
            this.className = "";
        })
        newEle.addEventListener("click", function () {
            self.area.removeChild(this);
        })
    },

    checkNum: function () {
        var childs = this.area.childNodes;
        if (childs.length > 10) {
            var len = childs.length;
            alert("Elements is full, remove the first one");
            for (var i = 10; i < len; i++) {
                this.area.removeChild(this.area.firstChild);
            }
        }
    },

    checkRep: function (str) {
        var childs = this.area.childNodes;
        if (!childs) return false;
        for (var i = childs.length - 1; i >= 0; i--) {
            if (str === childs[i].innerText) {
                return true;
            }
        }
        return false;
    }
}

//实例化
var tag = new tagCreator("tag-input");
tag.init();



