define(['utils'], function(utils) {
    /**
     * 寻路器
     * @constructor
     */
    function Finder(map) {
        this.map = map

        // 开启列表，存放等待检查的元素
        this.openList = []

        // 关闭列表，存放不需要检查的元素
        this.closeList = []

        // 结果数组，存放寻址路径
        this.result = []
    }

    /**
     * 获取坐标点周围（上下左右）的坐标
     * @param {object} point - 坐标
     * @return {array}
     */
    Finder.prototype.getRounds = function(point) {
        var up = { x: point.x, y: point.y - 1 }
        var right = { x: point.x + 1, y: point.y }
        var down = { x: point.x, y: point.y + 1 }
        var left = { x: point.x - 1, y: point.y }

        return [up, right, down, left]
    }

    /**
     * 过滤掉四周点的墙和外界坐标
     * @param {array} rounds - 四周点坐标数组
     */
    Finder.prototype.filter = function(rounds) {
        var self = this

        return rounds.filter(function(point) {
            return !self.map.getType({ x: point.x, y: point.y }) && !utils.inList(point, self.closeList)
        })
    }

    Finder.prototype.getPath = function(start, current) {
        if (current.x === start.x && current.y === start.y) {
            console.log(this.result)
            return this.result
        }

        this.result.unshift({ x: current.x, y: current.y })
        return this.getPath(start, current.parent)
    }

    Finder.prototype.findWay = function(start, end, algorithm) {
        algorithm = { 'A*': this.AStar, 'BFS': this.bfs }[algorithm]
        return algorithm.call(this, start, end)
    }

    /**
     * 广度优先算法
     * @param {object} start - 起点
     * @param {object} end - 终点
     * @return {array} - 路径
     */
    Finder.prototype.bfs = function (start, end) {
        var self = this

        // 重置数据
        this.openList = []
        this.closeList = []
        this.result = []

        this.openList = [start]

        while (this.openList.length) {
            var filter = null
            var children = null
            var currentPoint = this.openList.shift()

            if (!utils.inList(currentPoint, this.closeList)) {
                this.closeList.push(currentPoint)
            }

            if (currentPoint.x === end.x && currentPoint.y === end.y) {
                return this.getPath(start, currentPoint)
            }

            filter = this.getRounds(currentPoint).filter(function (point) {
                return !self.map.getType({ x: point.x, y: point.y }) && !utils.inList(point, self.closeList) && !utils.inList(point, self.openList)
            })

            children = filter.map(function (point) {
                point.parent = currentPoint
                return point
            })

            Array.prototype.push.apply(this.openList, children)
        }

        // 如果开启列表没有值，表示找不到路径
        throw new Error('无法寻路')
    }

    /**
     * Finder.prototype.dfs = function(path, target) {
        path = [path]

        var current = path.pop()
        this.closeList.push(current)

        if (current.x === target.x && current.y === target.y) {
            return path
        }
    }
     */

    /**
     * A star 算法，不可沿着斜方向移动
     * @param {object} start - 起点
     * @param {object} end - 终点
     * @return {array} - 路径
     */
    Finder.prototype.AStar = function(start, end) {
        console.log(this)
        // 结果索引, 在开启列表中的终点
        var resultIndex = null

        // 路径点，沿着parent上朔可得到路径
        var currentPos = null

        // 重置数据
        this.openList = []
        this.closeList = []
        this.result = []

        // 如果目标点在地图外或者有墙，结束寻路
        if (this.map.getType(end)) {
            throw new Error('无法到达 ' + '[' + end.x + ',' + end.y + ']')
        }

        // 如果目标点与起点在同一个位置，什么都不做
        if (start.x === end.x && start.y === end.y) {
            return
        }

        // 向开启列表存入起点
        this.openList.push({ x: start.x, y: start.y, G: 0 })

        // 结果索引为开启列表中出现的终点
        while (!(resultIndex = utils.getTargetIndex({ x: end.x, y: end.y }, this.openList))) {
            // 当前节点为开启列表中F值最小的点
            var currentPoint = this.openList.pop()

            // 向关闭列表存入当前点
            this.closeList.push(currentPoint)

            var filter = this.filter(this.getRounds(currentPoint))

            // 计算开启列表中点的G, H, F值
            var openList = filter.map(function (point) {
                // 设置父节点
                point.parent = currentPoint
                // G点表示起点到该点的移动耗费（假设为10），不可沿着对角线走
                point.G = currentPoint.G + 10
                // H点表示该点移动到终点的预计耗费（假设为10），不可沿着对角线走
                point.H = Math.abs(end.x - point.x) * 10 + Math.abs(end.y - point.y) * 10
                // F点表示G点加上H点的值
                point.F = point.G + point.H
                return point
            })

            this.openList = this.openList.concat(openList)

            // 如果开启列表没有值，表示找不到路径
            if (!this.openList.length) {
                throw new Error('无法寻路')
            }

            // 降序排列开启列表
            this.openList.sort(utils.comparisonByProperty('F'))
        }

        // 结果列表是否为空
        if (!resultIndex) {
            return []
        }

        // 根据结果索引，找到路径点
        currentPos = this.openList[resultIndex]

        // 沿着路径点的父节点上朔即可获得完整路径
        return this.getPath(start, currentPos)
    }

    return {
        Finder: Finder,
    }
})
