/**
 * Created by Ningersan on 2017/2/22.
 */

function inList(point, list) {
    // console.log(point)
    for (var i = 0, len = list.length; i < len; i++) {
        var item = list[i];
        if (item.x === point.x && item.y === point.y) {
            return i;
        }
    }

    return false;
}

function comparisonByProperty(property) {
    return function(object1, object2) {
        return object2[property] - object1[property];
    }
}

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
