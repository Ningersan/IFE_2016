function $(ele) {
    return document.querySelector(ele);
}

/**
 * 生成可排序的表格
 * @constructor
 * @param {*Node} ele - 生成表格的父容器
 * @param {*array} tableHead - 表头
 * @param {*Object} data - 数据
 */
function SortableTable(ele, tableHead, data) {
    this.ele = ele;
    this.head = tableHead;
    this.data = data;
}

SortableTable.prototype.init = function() {
    this.getData();
    this.render();
};

/**
 * 处理数据为表格需要的格式
 */
SortableTable.prototype.getData = function() {
    var data = [];

    data.push(this.head);

    for (var name in this.data) {
        var rowData = this.data[name];

        rowData.unshift(name);
        data.push(rowData);
    }

    this.data = data;
};

/**
 * 根据索引来排序当前类别的数据
 * @param {*function} orderFunc - 排序方法（升序，降序）
 * @param {*number} index - 记录第几列的数据
 */
SortableTable.prototype.sortData = function(orderFunc, index) {
    var data = this.data.slice(1);

    data.sort(orderFunc(index));
    data.unshift(this.head);
    this.data = data;
    this.render();
};

/**
 * 渲染生成表格
 */
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

/**
 * 插入可排序按钮到表格中
 */
SortableTable.prototype.insertSortEle = function() {
    var tableHeadEle = $("#container tr");
    var td = tableHeadEle.children;
    var text = "";

    for (var i = 1, len = td.length; i < len; i++) {
        text = "<div class='triangle' data-index='" + i + "'><div class='triangle-top'></div><div class='triangle-bottom'></div></div>";
        td[i].innerHTML += text;
    }
};
