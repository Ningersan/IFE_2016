var numInput = document.getElementById('num-input')
var btnArea = document.getElementsByTagName('label')[0]
var columnsArea = document.getElementById('num-area')

var strategy = {
    'left-in': function () {
        queue.leftPush()
    },
    'right-in': function () {
        queue.rightPush()
    },
    'left-out': function () {
        queue.leftPop()
    },
    'right-out': function () {
        queue.rightPop()
    },
    'random': function () {
        queue.CreatNumberRandom()
    },
    'bubble-sort': function () {
        queue.bubbleSort()
        queue.renderSort(updateSwap)
    },
    'select-sort': function () {
        queue.selectSort()
        queue.renderSort(updateSwap)
    },
    'insert-sort': function () {
        queue.insertSort()
        queue.renderSort(setColumnInfo)
    },
    'quick-sort': function () {
        queue.items = queue.quickSort(queue.items, 0, queue.items.length - 1)
        queue.renderSort(updateSwap)
    },
    'heap-sort': function () {
        queue.heapSort()
        queue.renderSort(updateSwap)
    },
}

// 初始化队列
var queue = {
    items: [],

    animations: [],

    isEmpty: function() {
        return this.items.length === 0
    },

    // 元素大于60检查
    isFull: function() {
        if (queue.items.length > 60) {
            alert('The queue is full.')
            return false
        }
    },

    leftPush: function() {
        var value = getValue()

        if (!queue.isFull()) {
            this.items.unshift(value)
            this.update()
        }
    },

    rightPush: function() {
        var value = getValue()

        if (!queue.isFull()) {
            this.items.push(value)
            this.update()
        }
    },

    leftPop: function() {
        alert(this.items.shift())
        this.update()
    },

    rightPop: function() {
        alert(this.items.pop())
        this.update()
    },

    delete: function(index) {
        this.items.splice(index, 1)
        this.update()
    },

    CreatNumberRandom: function() {
        // init queue
        this.items = []
        var number = null

        for (var i = 0; i < 20; i++) {
            number = Math.floor(Math.random() * 90 + 10)
            this.items.push(number)
        }

        this.update()
    },

    swap: function(a, b) {
        var items = this.items
        var temp = items[a]

        items[a] = items[b]
        items[b] = temp
    },

    update: function() {
        columnsArea.innerHTML = this.items.map(function (item, index) {
            return "<div data-index='" + index + "' title='" + item + "' style='height: " + item * 2 + "px'></div>"
        }).join('')
    },

    renderSort: function(func) {
        var animations = this.animations
        var timer = setTimeout(function performAnimation() {
            if (animations.length) {
                var params = animations.shift()

                disableAllBtn(true)
                resetAllColor()
                func(params[0], params[1])
                timer = setTimeout(performAnimation, 150)
            } else {
                disableAllBtn(false)
                resetAllColor()
            }
        }, 150)
    },

    bubbleSort: function() {
        var items = this.items

        if (items.length <= 1) {
            return
        }

        for (var i = 0, len = items.length; i < len - 2; i++) {
            for (var j = len - 1; j > i; j--) {
                if (items[j] < items[j - 1]) {
                    this.swap(j, j - 1)
                    this.animations.push([j, j - 1])
                }
            }
        }
    },

    selectSort: function() {
        var items = this.items

        if (items.length <= 1) {
            return
        }

        for (var i = 0, len = items.length; i < len - 2; i++) {
            var min = i
            for (var j = i + 1; j < len; j++) {
                if (items[j] < items[min]) {
                    min = j
                }
            }
            this.swap(min, i)
            this.animations.push([min, i])
        }
    },

    insertSort: function() {
        var items = this.items
        var divs = columnsArea.querySelectorAll('div')

        if (items.length <= 1) {
            return
        }

        for (var i = 1, len = items.length; i < len; i++) {
            var key = items[i]
            var keyInfo = {
                title: divs[i].title,
                height: divs[i].offsetHeight,
            }
            var j = i - 1

            while (j >= 0 && items[j] > key) {
                items[j + 1] = items[j]
                this.animations.push([j, j + 1])
                j--
            }

            items[j + 1] = key
            this.animations.push([keyInfo, j + 1])
        }
    },

    quickSort: function(arr, left, right) {
        var self = this

        if (left < right) {
            var mid = partition(arr, left, right)

            this.quickSort(arr, left, mid - 1)
            this.quickSort(arr, mid + 1, right)
        }

        return arr

        function partition(arr, left, right) {
            var key = arr[right]
            var i = left - 1

            for (var j = left; j < right; j++) {
                if (arr[j] <= key) {
                    self.swap(++i, j)
                    self.animations.push([i, j])
                }
            }

            self.swap(i + 1, right)
            self.animations.push([i + 1, right])
            return i + 1
        }
    },

    heapSort: function() {
        var self = this
        // 建堆
        var heapSize = this.items.length
        for (var i = Math.floor(heapSize / 2) - 1; i >= 0; i--) {
            maxHeapify(this.items, i, heapSize)
        }

        // 堆排序
        for (var j = heapSize - 1; j >= 1; j--) {
            this.swap(0, j)
            this.animations.push([0, j])
            maxHeapify(this.items, 0, --heapSize)
        }

        // 维护堆的性质
        function maxHeapify(arr, x, len) {
            var l = 2 * x + 1
            var r = 2 * x + 2
            var largest = x
            if (l < len && arr[l] > arr[largest]) {
                largest = l
            }
            if (r < len && arr[r] > arr[largest]) {
                largest = r
            }
            if (largest !== x) {
                self.swap(x, largest)
                self.animations.push([x, largest])
                maxHeapify(arr, largest, len)
            }
        }
    },
}

// 交换两个dom节点的信息
function updateSwap(index1, index2) {
    var columns = columnsArea.querySelectorAll('div')
    var temp = {}
    var ele1 = columns[index1]
    var ele2 = columns[index2]

    temp.title = ele1.title
    temp.height = ele1.offsetHeight

    // 交换title
    ele1.title = ele2.title
    ele2.title = temp.title

    // 交换高度
    ele1.style.height = ele2.offsetHeight + 'px'
    ele2.style.height = temp.height + 'px'

    // 改变颜色
    ele1.style.backgroundColor = '#55bcbc'
    ele2.style.backgroundColor = '#55bcbc'
}

/**
 * 给dom传递信息，插入排序使用
 * @param {*number} source - 源元素
 * @param {*number || *node } target -目标元素
 */
function setColumnInfo(source, target) {
    var columns = columnsArea.querySelectorAll('div')

    target = columns[target]

    target.title = typeof source === 'number' ? columns[source].title : source.title
    target.style.height = typeof source === 'number' ? columns[source].offsetHeight + 'px' : source.height + 'px'

    target.style.backgroundColor = '#55bcbc'
}

// clear doms color
function resetAllColor() {
    var columns = columnsArea.querySelectorAll('div')
    Array.prototype.forEach.call(columns, function(element) {
        element.style.backgroundColor = '#ed7d31'
    })
}

function disableAllBtn(flag) {
    var buttons = document.querySelectorAll('button')
    for (var i = 0, len = buttons.length; i < len; i++) {
        buttons[i].disabled = flag
    }
}

// 获取input的值
function getValue() {
    var value = numInput.value.trim()

    // 输入检测
    if (value !== '' && !isNaN(value)) {
        if (value > 10 && value < 100) {
            return value
        } else {
            alert('out of range')
        }
    } else {
        alert('please enter a number')
    }
}

function initEvent() {
    // 给每个按钮绑定事件
    addEvent(btnArea, 'click', function (event) {
        strategy[event.target.id]()
    })

    // 事件委托，给队列显示区绑定事件
    addEvent(columnsArea, 'click', function () {
        if (event.target.dataset.index) {
            queue.delete(event.target.dataset.index)
        }
    })
}

// 事件绑定函数，兼容浏览器差异
function addEvent(element, event, listener) {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener)
    } else {
        element['on' + event] = listener
    }
}

// 初始化事件
(function () {
    initEvent()
})()
