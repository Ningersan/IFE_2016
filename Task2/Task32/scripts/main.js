/**
 * Created by Ningersan on 2017/2/3.
 */

function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    } else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    } else {
        element["on" + event] = listener;
    }
}

//联动表单
function linkage(flag) {
    $(".choice").className      = flag ? "choice" : "choice hidden";
    $(".rule").className        = flag ? "rule hidden" : "rule";
    $(".length-rule").className = flag ? "length-rule hidden" : "length-rule";
}

//获取表单类型和规则
function getInputType(ele) {
    var $inputs = ele.getElementsByTagName("input");
    for (var i = 0, len = $inputs.length; i < len; i++) {
        if ($inputs[i].checked) {
            return $inputs[i].id;
        }
    }
}

(function init() {
    //存储生成的表单信息
    var formStack = [];

    //表单联动
    addEvent($(".type"), "change", function (e) {
        var targetId = e.target.id;

        switch (targetId) {
            case "input":
                linkage(false);
                break;
            case "radio":
            case "checkbox":
            case "pulldown":
                linkage(true);
                break;
            case "textarea":
                linkage(false);
                $(".rule").className = "rule hidden";
                break;
        }

        //同步配置名称
        $("#name").value = e.target.nextElementSibling.textContent;
    });

    $(".rule").addEventListener("change", function (e) {
        //同步配置名称
        $("#name").value = e.target.nextElementSibling.textContent;
    });

    //添加按钮绑定事件
    addEvent($("#btn-add"), "click", function () {
        var data = form.getData();

        form.addForm(data);
        formStack.push(new Form(data));

        //当类型为单选或多选时，默认显示提示
        if (data.type === "radio" || data.type === "checkbox") {
            formStack[formStack.length - 1].remainderTip();
        }

        form.submitBtn.className = "btn-sub";
    });

    //提交按钮绑定事件
    addEvent($(".btn-sub"), "click", function () {
        var text = "";
        for (var i = 0; i < formStack.length; i++) {
            text += !formStack[i].validator() ? formStack[i].tip.textContent + "\n" : "";
        }
        text === "" ? alert("提交成功") : alert(text);
    });
})();
