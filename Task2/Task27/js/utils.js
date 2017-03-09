/**
 * Created by Ningersan on 2017/2/22.
 */

function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

//获取飞船系统的信息
function getSystemInfo(ele) {
    var items = ele.getElementsByTagName("input");
    for (var i = 0, len = items.length; i < len; i++) {
        if (items[i].checked) {
            return items[i].value;
        }
    }
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
