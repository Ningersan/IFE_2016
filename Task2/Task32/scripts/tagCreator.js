/**
 * Created by Ningersan on 2017/2/11.
 */
function dealTag() {
    var tagArea = $(".tag-area");
    if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
        var str = $("#tag-input").value.replace(/(^\s*)|(\s*$)|,|，$/g, "").trim();
        if (str != "" && !checkRep(str, "tag-area")) {
            addNode(str, tagArea, "#fb6b0b");
            $("#tag-input").value = "";
        }
        $("#tag-input").value = "";
    }
    checkNum(tagArea);
}

//添加节点，并给每个节点绑定事件
function addNode(str, parents, color) {
    var node = document.createTextNode(str);
    var newEle = document.createElement("div");
    newEle.appendChild(node);
    parents.appendChild(newEle);
    //给每个node绑定事件
    newEle.addEventListener("mouseover", function () {
        this.textContent = "delete: " + this.textContent;
        this.style.backgroundColor = color;
    })
    newEle.addEventListener("mouseout", function () {
        this.textContent = this.textContent.replace(/delete: /, "");
        this.style.backgroundColor = "";
    })
    newEle.addEventListener("click", function () {
        parents.removeChild(this);
    })
}

//判断是否具有重复元素,如果重复返回True
function checkRep(str, id) {
    var childs = $("." + id).childNodes;
    if (!childs) return false;
    for (var i = childs.length - 1; i >= 0; i--) {
        if (str === childs[i].innerText) {
            return true;
        }
    }
    return false;
}

//保持元素的数量在10个，如果大于10个，就删除第一个元素
function checkNum(ele) {
    var childs = ele.childNodes;
    if (childs.length === 0) {
        console.log("请输入选项");
    }
    if (childs.length > 10) {
        var len = childs.length;
        alert("Elements is full, remove the first one");
        for (var i = 10; i < len; i++) {
            ele.removeChild(ele.firstChild);
        }
    }
}

$("#tag-input").onkeyup = dealTag;