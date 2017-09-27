/**
 * @constructor
 * @param {int} columns
 * @param {int} rows
 */
function Map() {
    this.rows = 20
    this.columns = 20
    this.$boxs = null
    this.$element = $('.boxbot-map')
    this.init(20, 20)
}

/**
 * 初始化地图和属性
 */
Map.prototype.init = function(rows, columns) {
    this.create(rows, columns)
    this.rows = rows
    this.columns = columns
    this.$boxs = $a('td')
}

/**
 * 初始化地图
 */
Map.prototype.create = function(rows, columns) {
    var table = document.createElement('table')
    var tbody = document.createElement('tbody')

    // 如果地图生成过就先销毁
    if (this.$element.innerHTML) {
        this.$element.innerHTML = ''
    }

    // 创建表格
    for (var i = 0; i < rows + 1; i++) {
        tbody.insertRow(i)

        for (var j = 0; j < columns + 1; j++) {
            var cell = tbody.rows[i].insertCell(j)

            if (i === 0 && j === 0) {
                cell.className = 'x-axis'
            } else if (i === 0) {
                cell.innerText = j
                cell.className = 'x-axis'
            } else if (j === 0) {
                cell.innerText = i
                cell.className = 'y-axis'
            }
        }
    }

    table.appendChild(tbody)
    this.$element.appendChild(table)
}

/**
 * 随机获取一组坐标
 */
Map.prototype.random = function () {
    var x = Math.floor(Math.random() * this.rows + 1)
    var y = Math.floor(Math.random() * this.columns + 1)

    return { 'x': x, 'y': y }
}

/**
 * 根据位置坐标获取当前节点
* @param {object} position - 位置坐标
* @return {node} - 返回对应节点
 */
Map.prototype.getNode = function(position) {
    return this.$boxs[position.y * (this.rows + 1) + position.x]
}

/**
 * 根据位置坐标获取当前节点类型
* @param {object} position - 位置坐标
* @return {string} - 返回类名
 */
Map.prototype.getType = function(position) {
    var node = this.getNode(position)
    return node ? node.className : null
}

/**
 * 根据位置坐标获修墙
* @param {object} position - 位置坐标
 */
Map.prototype.setWall = function(position) {
    this.getNode(position).className = 'wall'
}

/**
 * 设置墙的颜色
 * @param {node} node - 节点
 * @param {string} color - 颜色
 */
Map.prototype.setColor = function(position, color) {
    this.getNode(position).style.backgroundColor = color
}
