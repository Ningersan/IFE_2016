function $(ele) {
    return document.querySelector(ele);
}

/**
 * 生成可排序的表格
 * @constructor
 * @param {*Node} opts.append - 生成表格的父容器
 * @param {*array} opts.thead - 表头
 * @param {*Object} opts.tbody - 表内数据
 * @param {*boolean} opts.isToal - 合计
 * @param {*boolean} opts.isSortable - 排序功能
 * @param {*boolean} opts.isFrozen - 首行冻结功能
 */
function tableCreator(opts) {
    this.append = opts.append;
    this.thead = deepCopy(opts.tableHead);
    this.tbody = deepCopy(opts.tableBody);
    this.isTotal = typeof opts.isTotal === 'boolean' ? opts.isTotal : true;
    this.isSortable = typeof opts.isSortable === 'boolean' ? opts.isSortable : true;
    this.isFrozen = typeof opts.isFrozen === 'boolean' ? opts.isFrozen : true;
    this.theadStyle = typeof opts.tableHeadStyle === 'object' ? opts.tableHeadStyle : {background: '#555', color: '#fff', arrowColor: '#fff'};
    this.init();
}

tableCreator.prototype.init = function() {
    this.getData();
    this.render();
    this.initEvent();
};

/**
 * 初始化事件
 */
tableCreator.prototype.initEvent = function() {
    var self = this;

    // sort table
    if (this.isSortable) {
        addEvent(this.append, "click", function (event) {
            var targetClass = event.target.className;
            var targetIndex = event.target.parentNode.dataset.index;

            if (targetClass === "arrow-up") {
                self.sortData(ascSort, targetIndex);
            } else if (targetClass === "arrow-down") {
                self.sortData(desSort, targetIndex);
            }

            if (self.isFrozen) {
                self.freezeTableHead();
            }
        });
    }

    // freeze table head
    if (this.isFrozen) {
        addEvent(document, "scroll", self.freezeTableHead.bind(this));
    }
};

/**
 * 处理数据为表格需要的格式
 */
tableCreator.prototype.getData = function() {
    var data = [];
    var total = null;

    if (this.isTotal) {
        for (var name in this.tbody) {
            total = 0;
            
            this.tbody[name].forEach(function (value) {
                total += value;
            });

            this.tbody[name].push(total);
        }
    }

    for (var rowName in this.tbody) {
        var rowData = this.tbody[rowName];

        rowData.unshift(rowName);
        data.push(rowData);
    }

    this.tbody = data;
};

/**
 * 根据索引来排序当前类别的数据
 * @param {*function} orderFunc - 排序方法（升序，降序）
 * @param {*number} index - 记录第几列的数据
 */
tableCreator.prototype.sortData = function(orderFunc, index) {
    this.tbody.sort(orderFunc(index));
    this.render();
};

/**
 * 渲染生成表格
 */
tableCreator.prototype.render = function() {
    var text = [];
    var tableHeadStyle = "";
    var self = this;

    // 处理表头
    if (this.isTotal && this.thead.indexOf('合计') === -1) {
        this.thead.push('合计');
    }

    text.push("<table><thead><tr>");
    tableHeadStyle = "background: " + this.theadStyle.background + "; color: " + this.theadStyle.color + ";";

    this.thead.forEach(function(item) {
        text.push("<th style='position: relative;" + tableHeadStyle + "'>" + item + "</th>");
    });

    text.push("</tr></thead><tbody>");

    this.tbody.forEach(function(rowData, index) {
        text.push("<tr>");

        rowData.forEach(function(item) {
            text.push("<td>" + item + "</td>");
        });

        text.push("</tr>");
    });

    text.push("</tbody></table>");
    this.append.innerHTML = text.join("");

    if (this.isSortable) {
        this.insertSortEle();
    }

    if (this.isFrozen) {
        this.insertTableHead();
    }
};

/**
 * 插入可排序按钮到表格中
 */
tableCreator.prototype.insertSortEle = function() {
    var arrowColor = this.theadStyle.arrowColor;
    var tr = this.append.querySelector("tr");
    var td = tr.children;
    var text = "";

    for (var i = 1, len = td.length; i < len; i++) {
        var div = document.createElement("div");

        div.dataset.index = i;
        div.style.cssText = "display: inline-block; position: absolute; top: 7px; margin-left: 10px;";

        for (var j = 0; j < 2; j++) {
            var arrow = document.createElement("div");
    
            arrow.className = j === 0 ? "arrow-up" : "arrow-down";
            arrow.style.cssText = "border-left: 6px solid transparent; border-right: 6px solid transparent; cursor: pointer";
            arrow.style.cssText += j === 0 ? "border-bottom: 6px solid" + arrowColor + "; margin-bottom: 3px" : "border-top: 6px solid " + arrowColor + ";";
            div.appendChild(arrow);
        }

        td[i].appendChild(div);
    }
};

/**
 * 在首行冻结时，使用两个表头来防止滚动表格的位移
 */
tableCreator.prototype.insertTableHead = function() {
    var table = this.append.children[0];
    var thead = table.children[0];
    var newThead = thead.cloneNode(true); 

    newThead.style.display = "none";
    table.insertBefore(newThead, thead);
};

/**
 * 首行冻结
 */
tableCreator.prototype.freezeTableHead = function() {
    var table = this.append.children[0];

    // 隐藏起来的表头，防止表格偏移
    var thead1 = table.children[0];

    // 显示的表头
    var thead2 = table.children[1];

    // 表格距离视口的距离
    var tableOffsetTop = table.getBoundingClientRect().top;

    // 表格高度
    var tableHight = table.offsetHeight;

    if (tableOffsetTop < 0 && tableOffsetTop >= -tableHight) {
        thead1.style.cssText = "display: table-head-group";
        thead2.style.cssText = "position: fixed; top: 0;";
    } else {
        thead1.style.cssText = "display: none";
        thead2.style.cssText = "";
    }
};
