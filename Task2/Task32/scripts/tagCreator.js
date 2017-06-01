/**
 * Created by Ningersan on 2017/2/11.
 */

//通过id获取元素
function $id(id) {
    return document.getElementById(id);
}

function TagCreator($input, $append) {
    this.$input = $input;
    this.$container = $append;
    this.init();
}

TagCreator.prototype = {
    init: function () {
        this.$input.onkeyup = this.dealInput.bind(this);
    },

    getStr: function () {
        return this.$input.value.replace(/(^\s*)|(\s*$)|,|，$/g, "").trim();
    },

    dealInput: function () {
        var str = this.getStr();

        if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
            if (str !== "" && !this.isRepeated(str)) {
                this.addNode(str);
                this.checkNum();
            }

            this.$input.value = "";
        }
    },

    addNode: function (str) {
        var self = this;
        var text = document.createTextNode(str);
        var $tag = document.createElement("div");

        $tag.appendChild(text);
        this.$container.appendChild($tag);

        //给每个node绑定事件
        addEvent($tag, "mouseover", function () {
            this.textContent = "delete: " + this.textContent;
            this.className = "delete";
        });

        addEvent($tag, "mouseout", function () {
            this.textContent = this.textContent.replace(/delete: /, "");
            this.className = "";
        });

        addEvent($tag, "click", function () {
            self.$container.removeChild(this);
        });
    },

    checkNum: function () {
        var $tags = this.$container.children;
        var tagsLen = $tags.length;

        if (tagsLen > 10) {
            alert("Elements is full, remove the first one");
            for (var i = 10; i < tagsLen; i++) {
                this.$container.removeChild(this.$container.firstElementChild);
            }
        }
    },

     isRepeated: function (str) {
        var flag = null;
        var tags = Array.prototype.slice.call(this.$container.children);

        if (!tags) {
            return false;
        }

        flag = tags.some(function(tag) {
            return str === tag.textContent;
        });

        return flag;
    }
};

//实例化
var tag = new TagCreator($('#tag-input'), $('#tag-area'));
