/**
 * Created by Ningersan on 2017/2/3.
 */
function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
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

//===============================表单联动=========================================
$(".type").addEventListener("change", function (e) {
    var targetId = e.target.id;

    //同步配置名称
    $("#name").value = e.target.nextSibling.nextSibling.textContent;

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

$(".rule").addEventListener("change", function (e) {
    //同步配置名称
    $("#name").value = e.target.nextSibling.nextSibling.textContent;
})

//存储生成的表单信息
var formStack = [];
//添加按钮绑定事件
$("#btn-add").onclick = function () {
    var data = test.getData();
    test.addForm(data);
    formStack.push(new formDealer(data));
    //当类型为单选或多选时，默认显示提示
    if (data.type === "radio" || data.type === "checkbox") {
        formStack[formStack.length - 1].remainderTip();
    }
    test.submitBtn.className = "btn-sub";
};

//提交按钮绑定事件
$(".btn-sub").onclick = function () {
    var text = "";
    for (var i = 0; i < formStack.length; i++) {
        text += !formStack[i].validator() ? formStack[i].tip.textContent + "\n" : "";
    }
    text == "" ? alert("提交成功") : alert(text);
}


