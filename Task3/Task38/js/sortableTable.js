function $(ele) {
    return document.querySelector(ele);
}

function SortableTable(ele, tableHead, data) {
    this.ele = ele;
    this.head = tableHead;
    this.data = data;
}

SortableTable.prototype.init = function() {
    this.getData();
    this.render();
};

// 处理数据为生成表格的格式
SortableTable.prototype.getData = function() {
    var data = [];

    data.push(this.head);

    for (var name in this.data) {
        var score = 0;
        var rowData = this.data[name];

        // 计算总分
        for (var i = 0, len = rowData.length; i < len; i++) {
            score += rowData[i];
        }

        rowData.push(score);
        rowData.unshift(name);
        data.push(rowData);
    }

    this.data = data;
};

SortableTable.prototype.sortData = function(orderFunc, index) {
    var data = this.data.slice(1);

    data.sort(orderFunc(index));
    data.unshift(this.head);
    this.data = data;
    this.render();
};

SortableTable.prototype.render = function() {
    var text = [];
    var self = this;

    text.push("<table><tbody>");

    this.data.forEach(function(element, index) {
        text.push("<tr>");
        self.data[index].forEach(function(value) {
            text.push("<td>" + value + "</td>");
        });

        text.push("</tr>");
    });

    text.push("</tbody></table>");
    this.ele.innerHTML = text.join("");
    this.insertSortEle();
};

SortableTable.prototype.insertSortEle = function() {
    var tableHeadEle = $("#container tr");
    var td = tableHeadEle.children;
    var text = "";

    for (var i = 1, len = td.length; i < len; i++) {
        text = "<div class='triangle' data-index='" + i + "'><div class='triangle-top'></div><div class='triangle-bottom'></div></div>";
        td[i].innerHTML += text;
    }
};

var head = ["姓名", "语文", "数学", "英语", "总分"];
var objData = {
    "小明": [89, 98, 95],
    "小红": [91, 94, 98],
    "小亮": [88, 100, 80]
};

var table = new SortableTable($("#container"), head, objData);
table.init();

addEvent($("#container"), "click", function(event) {
    var targetClass = event.target.className;
    var targetIndex = event.target.parentNode.dataset.index;

    if (targetClass === "triangle-top") {
        instance.sortData(ascSort, targetIndex);
    } else {
        instance.sortData(desSort, targetIndex);
    }
});

function ascSort(index) {
    return function(array1, array2) {
        return array1[index] - array2[index];
    };
}

function desSort(index) {
    return function(array1, array2) {
        return array2[index] - array1[index];
    };
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
