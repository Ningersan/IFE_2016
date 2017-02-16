//通过id获取元素
function $(id) {
    return document.getElementById(id);
}

function tagCreator(id) {
	this.id = id;
    this.ele = $(id);
	this.area = $(id.slice(0, id.indexOf("-")) + "-area");
    this.class = (id === "tag-input")? "style-2" : "style-1";
    this.confirm = $("confirm");
	this.init();
}

tagCreator.prototype = {
	init: function () {
        this.ele.onkeyup = this.dealInput.bind(this);
		this.confirm.onclick = this.render.bind(this);
	},

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

	dealInput: function () {
        if (this.id === "tag-input") {
            if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
                this.render();
            }
        }
	},

	render: function () {
	    var strArr = this.getData();
		for (var i = 0, len = strArr.length; i < len; i++) {
			if (strArr[i] != "" && !this.checkRep(strArr[i])) {
				this.addNode(strArr[i]);
                this.checkNum();
			}
		}
        this.ele.value = "";
	},

	addNode: function (str) {
        var self = this;
        var node = document.createTextNode(str);
        var newEle = document.createElement("div");
        newEle.appendChild(node);
        this.area.appendChild(newEle);
        //给每个node绑定事件
        console.log(this.color);
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

var hobby = new tagCreator("text-input");
hobby.init();
