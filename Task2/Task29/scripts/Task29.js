/**
 * Created by Ningersan on 2017/2/1.
 */
function $(ele) {
    return document.querySelector(ele);
}

function checkValue(value) {
    var input = $("#meaning");
    var tips = $("p");
    if (value == "" || value == null) {
        tips.innerHTML = "姓名不能为空";
        tips.style.color = "red";
        input.style.borderColor = "red";
    } else if (getLength(value) >= 4 && getLength(value) <= 16) {
        tips.innerHTML = "名称格式正确";
        tips.style.color = "lightgreen";
        input.style.borderColor = "lightgreen";
    } else {
        tips.innerHTML = "字符数应为4-16位，中文占两位";
        tips.style.color = "red";
        input.style.borderColor = "red";
    }
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

$("#check").addEventListener("click", function () {
    var value = $("#meaning").value;
    checkValue(value);
})
