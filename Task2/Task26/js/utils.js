/**
 * Created by Ningersan on 2017/2/22.
 */

function $(ele) {
    return document.querySelector(ele);
}

function $a(ele) {
    return document.querySelectorAll(ele);
}

//根据飞船型号获取该飞船对象所在数组中的索引
function getCraftIndex(array, id) {
    for (var i in array) {
        if (id === array[i].id) {
            return i;
        }
    }
}

//事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false);
    }
    else if (element.attachEvent) {
        element.attachEvent("on" + event, listener);
    }
    else {
        element["on" + event] = listener;
    }
}
