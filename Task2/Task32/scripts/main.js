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
    var targetId = e.target.id;

    //同步配置名称
    $("#name").value = e.target.nextSibling.nextSibling.textContent;
})

$("#btn-add").onclick = function () {
    var data = test.getData();
    test.addForm(data);
    test.submitBtn.className = "btn-sub";
    var inputEles = $(".result-form").getElementsByTagName("input");
    for (var i = 0; i < inputEles.length; i++) {
        //绑定焦点事件
        inputEles[i].addEventListener("focus", function (e) {
            var target = e.target;
            var tip = target.nextSibling;
            tip.innerHTML = data.remainder;
            tip.className = "remainder";
            target.style.borderColor = "#0dc1c1";
        })

        //绑定离开焦点事件
        inputEles[i].addEventListener("blur", function (e) {
            var isTrue = data.validator(e.target, data);
            if (isTrue) {
                e.target.nextSibling.innerHTML = data.successRemainder;
                e.target.nextSibling.style.color = "#0dc1c1";
            } else {
                e.target.style.borderColor = "#F04C57";
                e.target.nextSibling.className = "error";
                e.target.nextSibling.innerHTML = data.failRemainder;
            }
        })
    }
};


