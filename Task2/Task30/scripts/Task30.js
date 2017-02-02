/**
 * Created by Ningersan on 2017/2/1.
 */
var right = true;  //检验全部输入正确

function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

function getLength(str) {
    var count = 0;
    for (var i = 0; i < str.length; i++) {
        var charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128) {
            count += 1;
        } else {
            count += 2;
        }
    }
    return count;
}

function checkValue(target) {
    var check;
    var id = target.id;
    var value = target.value.trim();
    var tips = target.nextSibling.nextSibling;

    function render(str, isAlert) {
        if (isAlert) {
            tips.innerHTML = str;
            tips.style.color = "lightgreen";
            target.style.borderColor = "lightgreen";
        } else {
            tips.innerHTML = str;
            tips.style.color = "red";
            target.style.borderColor = "red";
            right = false;
        }
    }

    if (id === "name") {
        check = function checkName() {
            if (getLength(value) >= 4 && getLength(value) <= 16) {
                render("名称格式正确！", true);
            } else {
                render("请检查字符数！", false);
            }
        }
    } else if (id === "password") {
        check = function checkPassword() {
            if (value.match(/^[a-zA-Z0-9]{6,18}$/)) {
                render("密码格式正确！", true);
            } else {
                render("格式错误，请重新输入密码", false);
            }
        }

    } else if (id === "password-checked") {
        check = function checkRePassword() {
            if ($a("input")[1].value.trim() === value) {
                render("密码正确！", true);
            } else {
                render("两次输入密码不一致，请重新检查", false);
            }
        }
    } else if(id === "email") {
        check = function checkEmail() {
            var myrReg = /^[a-zA-Z0-9_\.\-]+@[^\.@]+\.[a-z]+$/;
            if (value.match(myrReg)) {
                render("邮箱格式正确！", true);
            } else {
                render("邮箱格式错误，请重新检查", false);
            }
        }
    } else {
        check = function checkTel() {
            if (value.match(/^1\d{10}$/)) {
                render("手机格式正确！", true);
            } else {
                render("手机格式错误，请重新检查", false);
            }
        }
    }

    if (value === "" || value === null) {
        render("内容不能为空", false);
        tips.style.display = "block";
        return;
    }
    check();
}


//绑定事件区
var inputEle = $a("input");
for (var i = 0; i < inputEle.length; i++) {
    //绑定焦点事件
    inputEle[i].addEventListener("focus", function (e) {
        var target = e.target;
        var tips = target.nextSibling.nextSibling;
        target.style.borderColor = "#0dc1c1";
        tips.style.display = "block";
        tips.style.color = "#a8a8a8";
        tips.innerHTML = tips.parentNode.getAttribute("data-info");
    })

    //绑定离开焦点事件
    inputEle[i].addEventListener("blur", function (e) {
        checkValue(e.target);
    })
}

$("button").addEventListener("click", function () {
    for (var i = 0; i < inputEle.length; i++) {
        checkValue(inputEle[i]);
    }
    if (right) {
        alert("提交成功");
    } else {
        alert("提交失败，请检查各项输入");
    }
})




