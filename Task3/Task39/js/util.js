/**
 * 升序排列
 * @param {*number} index - 排序所根据的列索引
 */
function ascSort(index) {
    return function (array1, array2) {
        return array1[index] - array2[index];
    };
}

/**
 * 降序排列
 * @param {*number} index - 排序所根据的列索引
 */
function desSort(index) {
    return function (array1, array2) {
        return array2[index] - array1[index];
    };
}

/**
 * 随机生成分数
 * @param {*number} n - 随机生成数据的个数
 * @return {*array} arr - 随机生成的分数数组
 */
function randomScore(n) {
    var arr = [];
    var num = null;

    for (var i = 0; i < n; i++) {
        num = Math.floor(Math.random() * 61 + 40);
        arr.push(num);
    }

    return arr;
}

/**
 * 判断参数是否是数组
 * @param {*array} arr - 判断对象
 */
function isArray(arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
}

/**
 * 深度拷贝
 * @param {*Object || array} obj 数组或者对象
 */
function deepCopy(obj) {
    var newObj = null;

    if (typeof obj !== 'object' && typeof obj !== 'function') {
        return obj;
    }

    newObj = isArray(obj) ? [] : {};

    for (var i in obj) {
        if (obj.hasOwnProperty(i)) {
            newObj[i] = typeof obj[i] === 'object' ? deepCopy(obj[i]) : obj[i];
        }
    }

    return newObj;
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