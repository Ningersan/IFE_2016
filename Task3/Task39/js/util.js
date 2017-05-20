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
    var total = 0;

    for (var i = 0; i < n; i++) {
        var num = Math.floor(Math.random() * 61 + 40);

        total += num;
        arr.push(num);
    }

    arr.push(total);
    return arr;
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