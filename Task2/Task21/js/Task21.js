/**
 * 通过id获取元素
 * @param {string} id - 元素的id 
 */
function get(id) {
    return document.getElementById(id);
}

/**
 * 处理关于标签的输入逻辑
 */
function dealTagInput() {
    var tagArea = get("tag-area");

    if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
        var str = get("tagInput").value.replace(/(^\s*)|(\s*$)|,|，$/g, "").trim();

        if (str !== "" && !checkRep(str, "tag-area")) {
            addNode(str, tagArea, "#fb6b0b");
            get("tagInput").value = "";
        }

        get("tagInput").value = "";
        checkNum(tagArea);
    }
}

/**
 * 处理关于文本的输入逻辑
 */
function dealTextInput() {
    var TextArea = get("text-area");
    var str = document.querySelector("textarea").value.trim().split(/,|，|、|\s|\n|\r|\t/);

    for (var i in str) {
        str[i].replace(/,|，|、|\s|\n|\r|\t $/g, "");
        if (str[i] !== "" && !checkRep(str[i], "text-area")) {
            addNode(str[i], TextArea, "#0dc1c1");
        }
    }

    checkNum(TextArea);
}

/**
 * 添加节点，并给每个节点绑定事件
 * @param {string} str  - 要添加的节点的文本节点
 * @param {node} parents - 添加节点的父节点
 * @param {string} color - 渲染节点的颜色 
 */
function addNode(str, parents, color) {
    var node = document.createTextNode(str);
    var newEle = document.createElement("div");
    newEle.appendChild(node);
    parents.appendChild(newEle);

    //给每个node绑定事件
    newEle.addEventListener("mouseover", function () {
        this.textContent = "delete: " + this.textContent;
        this.style.backgroundColor = color;
    });

    newEle.addEventListener("mouseout", function () {
        this.textContent = this.textContent.replace(/delete: /, "");
        this.style.backgroundColor = "";
    });

    newEle.addEventListener("click", function () {
        parents.removeChild(this);
    });
}

/**
 * 检查元素，保持元素的数量在10个，如果大于10个，就删除第一个元素
 * @param {node} ele 
 */
function checkNum(ele) {
    var childs = ele.childNodes;

    if (childs.length > 10) {
        var len = childs.length;
        alert("Elements is full, remove the first one");

        for (var i = 10; i < len; i++) {
            ele.removeChild(ele.firstChild);
        }
    }
}

/**
 * 判断是否具有重复元素,如果重复返回True
 * @param {string} str - 要检查的文本 
 * @param {string} id  - 检查的区域id
 */
function checkRep(str, id) {
    var childs = get(id).childNodes;

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

//绑定事件
get("tagInput").onkeyup = dealTagInput;
get("confirm").onclick = dealTextInput;
