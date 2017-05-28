/**
 * Created by Ningersan on 2017/2/1.
 */
function $(ele) {
    return document.querySelector(ele);
}

/**
 * 检查输入
 * @param {string} value --  检查的值
 */
function checkValue(value) {
    var tips = $("p");
    var input = $("#meaning");

    if (value === "" || value === null) {
        tips.textContent = "姓名不能为空";
        input.className = "error";
    } else if (getLength(value) >= 4 && getLength(value) <= 16) {
        tips.textContent = "名称格式正确";
        input.className = "success";
    } else {
        tips.textContent = "字符数应为4-16位，中文占两位";
        input.className = "error";
    }
}

/**
 * 获取字符串长度，中文算两字节
 * @param {string} str -- 获取的字符串 
 */
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

// 绑定事件
$("#check").addEventListener("click", function () {
    var value = $("#meaning").value;
    checkValue(value);
});
