/**
 * Created by Ningersan on 2017/2/3.
 */
function $(ele) {
    return document.querySelector(ele);
}

//联动表单
function showOption(flag) {
    if (flag) {
        $(".choice").className = "choice";
        $(".rule").className = "rule hidden";
        $(".length-rule").className = "length-rule hidden";
    } else {
        $(".choice").className = "choice hidden";
        $(".rule").className = "rule";
        $(".length-rule").className = "length-rule";
    }
}

//获取表单类型和规则
function getType(ele) {
    var items = ele.getElementsByTagName("input");
    for (var i = 0; i < items.length; i++) {
        if (items[i].checked) {
            return items[i].id;
        }
    }
}

//获取单选多选下拉的选项
function getOptions() {
    var items = [];
    var childs = $(".tag-area").childNodes;
    var childsLen = childs.length;
    if (childsLen === 0) {
        alert("请输入选项");
        return;
    }
    if (childsLen === 1) {
        alert("请再次输入一个选项");
        return;
    }
    for (var i = 0; i < childsLen; i++) {
        items.push(childs[i].innerText);
    }
    return items;
}


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

function dataProduct() {

}

dataProduct.prototype = {
    name: $("#name"),
    type: $(".type"),
    rule: $(".rule"),
    submitBtn: $(".btn-sub"),
    resultForm: $(".result-form"),

    init: function () {
        this.addEvent();
    },

    getData: function () {
        var data = {
            label: "",
            type: "",
            inputType: "",
            items: [],
            necessary: true,
            validator: function () {
            }  //表单验证规则
        }
        data = this.getBaseData(data);
        return data;
    },

    getBaseData: function (data) {
        data.label = this.name.value;
        data.type = getType(this.type);
        data.inputType = getType(this.rule);
        if (data.type != "input" && data.type != "textarea") data.items = getOptions();
        return data;
    },

    addEvent: function () {
        this.type.addEventListener("change", function (e) {
            var targetId = e.target.id;

            //同步配置名称
            $("#name").value = e.target.nextSibling.nextSibling.textContent;

            //表单联动
            switch (targetId) {
                case "input":
                    showOption(false);
                    break;
                case "radio":
                case "checkbox":
                case "pulldown":
                    showOption(true);
                    break;
                case "textarea":
                    showOption(false);
                    $(".rule").className = "rule hidden";
                    break;
            }
        })

        $("#tag-input").onkeyup = dealTag;

        $(".rule").addEventListener("change", function (e) {
            var targetId = e.target.id;
            switch (targetId) {
                case "text":
                    break;
                case "number":
                    break;
                case "email":
                    break;
                case "tel":
                    break;
                case "password":
                    break;
            }
        })
    },

    addForm : function (data) {
        switch (data.type) {
            case "input":
                this.addInputForm(data);
                break;
            case "radio":
                this.addRadioForm(data);
                break;
            case "checkbox":
                this.addCheckboxForm(data);
                break;
            case "pulldown":
                this.addPulldownForm(data);
                break;
            case "textarea":
                this.addTextareaForm(data);
                break;
        }
    },

    addInputForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = "<label>" + data.label + "</label><input type='" + data.inputType + "'>";
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addRadioForm: function (data) {
        var text = "";
        var box = document.createElement("div");
        text = "<label>" + data.label + "</label>";
        for (var i = 0; i < data.items.length; i++) {
            text += "<input type='radio' name='option'><label>" + data.items[i] + "</label>";
        }
        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addCheckboxForm: function (data) {
        var text = ""
        var box = document.createElement("div");
        text = "<label>" + data.label + "</label>";
        for (var i = 0; i < data.items.length; i++) {
            text += "<input type='checkbox' name='option'><label>" + data.items[i] + "</label>";
        }
        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addPulldownForm: function (data) {
        var text = "";
        var box = document.createElement("div");
        text = "<label>" + data.label + "</label><select>";
        for (var i = 0; i < data.items.length; i++) {
            text += "<option>" + data.items[i] + "</option>";
        }
        text += "</select>";
        box.innerHTML = text;
        this.resultForm.insertBefore(box, this.submitBtn);
    },

    addTextareaForm: function (data) {
        var box = document.createElement("div");
        box.innerHTML = "<label>" + data.label + "</label><textarea></textarea>"
        this.resultForm.insertBefore(box, this.submitBtn);
    }
}

var test = new dataProduct();
test.init();

$("#btn-add").onclick = function () {
    var data = test.getData();
    test.addForm(data);
    test.submitBtn.className = "btn-sub";
};

