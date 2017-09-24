function Finder(map) {
    this.map = map;
    this.openList = [];
    this.closeList = [];
    this.result = [];
}

Finder.prototype.getRounds = function(point) {
    var up = {x: point.x, y: point.y - 1};
    var right = {x: point.x + 1, y: point.y};
    var down = {x: point.x, y: point.y + 1};
    var left = {x: point.x - 1, y: point.y};

    return [up, right, down, left];
}

Finder.prototype.filter = function(rounds) {
    var self = this;

    return rounds.filter(function(point) {
        return !self.map.getType({x: point.x, y: point.y}) && !inList(point, self.closeList);
    })
}

Finder.prototype.findWay = function(start, end) {
    var resultIndex = null;
    var currentPath = null;

    this.openList = [];
    this.closeList = [];
    this.result = [];

    if (this.map.getType(end)) {
        throw '无法到达 ' + '[' + end.x + ',' + end.y + ']';
    }

    if (start.x === end.x && start.y === end.y) {
        return;
    }

    this.openList.push({x: start.x, y: start.y, G: 0});

    while (!(resultIndex = inList({ x: end.x, y: end.y }, this.openList))) {
        var currentPoint = this.openList.pop();
        this.closeList.push(currentPoint);

        var filter = this.filter(this.getRounds(currentPoint));

        var openList = filter.map(function(point) {
            point.parent = currentPoint;
            point.G = currentPoint.G + 10;
            point.H = Math.abs(end.x - point.x) * 10 + Math.abs(end.y - point.y) * 10;
            point.F = point.G + point.H;
            return point;
        });

        this.openList = this.openList.concat(openList);

        if (!this.openList.length) {
            throw '无法寻路';
        }

        this.openList.sort(comparisonByProperty('F'));
    }

    if (!resultIndex) {
        return [];
    }

    currentPath = this.openList[resultIndex];

    while (currentPath.x !== start.x || currentPath.y != start.y) {
        this.result.unshift({x: currentPath.x, y: currentPath.y});
        currentPath = currentPath.parent;
    }

    return this.result;
}
