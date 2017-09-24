/**
 * @constructor
 * @param {int} columns
 * @param {int} rows
 */
function Map(rows, columns) {
    this.rows = rows;
    this.columns = columns;
    this.$element = $(".boxbot-map");
    this.init();
    this.$boxs = $a('td');
}

/**
 * 初始化地图
 */
Map.prototype.init = function() {
    var table = document.createElement("table");
    var tbody = document.createElement("tbody");

    table.className = this.rows === 20 ? "map-20x20" : "map-30x30"

    // 创建表格
    for (var i = 0; i < this.rows + 1; i++) {
        tbody.insertRow(i);

        for (var j = 0; j < this.columns + 1; j++) {
            var cell = tbody.rows[i].insertCell(j);

            if (i === 0 && j === 0) {
                cell.className = "x-axis"
            } else if (i === 0) {
                cell.innerText = j
                cell.className = "x-axis"
            } else if (j === 0) {
                cell.innerText = i
                cell.className = "y-axis"
            }
        }
    }

    table.appendChild(tbody);
    this.$element.appendChild(table);
}

/**
 * 随机获取一组坐标
 */
Map.prototype.random = function () {
    var x = Math.floor(Math.random() * this.rows + 1);
    var y = Math.floor(Math.random() * this.columns + 1);

    return { 'x': x, 'y': y };
}

/**
 * 根据位置坐标获取当前节点
* @param {object} position - 位置坐标
* @return {node} - 返回对应节点
 */
Map.prototype.getNode = function(position) {
    return this.$boxs[position.y * (this.rows + 1) + position.x];
}

/**
 * 根据位置坐标获取当前节点类型
* @param {object} position - 位置坐标
* @return {string} - 返回类名
 */
Map.prototype.getType = function(position) {
    return this.getNode(position).className;
}

/**
 * 根据位置坐标获修墙
* @param {object} position - 位置坐标
 */
Map.prototype.setWall = function(position) {
    this.getNode(position).className = 'wall';
}

/**
 * 设置墙的颜色
 * @param {node} node - 节点
 * @param {string} color - 颜色
 */
Map.prototype.setColor = function(position, color) {
    this.getNode(position).style.backgroundColor = color;
}
