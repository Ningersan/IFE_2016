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
    this.data.sort(orderFunc(index));
    this.render();
};

/**
 * 渲染生成表格
 */
SortableTable.prototype.render = function() {
    var text = [];
    var self = this;

    // 处理表头
    text.push("<table><thead><tr>");

    this.head.forEach(function(item) {
        text.push("<th style='position: relative'>" + item + "</th>");
    });
    text.push("</tr></thead><tbody>");

    this.data.forEach(function(rowData, index) {
        text.push("<tr>");

        rowData.forEach(function(item) {
            text.push("<td>" + item + "</td>");
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
        var div = document.createElement("div");
        div.dataset.index = i;
        div.style.cssText = "display: inline-block; position: absolute; top: 4px; margin-left: 10px;";

        for (var j = 0; j < 2; j++) {
            var arrow = document.createElement("div");
            arrow.className = j === 0 ? "arrow-up" : "arrow-down";
            arrow.style.cssText = "border-left: 6px solid transparent; border-right: 6px solid transparent; cursor: pointer";
            arrow.style.cssText += j === 0 ? "border-bottom: 6px solid #fff; margin-bottom: 3px" : "border-top: 6px solid #fff";
            div.appendChild(arrow);
        }

        td[i].appendChild(div);
    }
};
