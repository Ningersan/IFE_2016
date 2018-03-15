import Queue from './Queue'
import Sort from './Sort'
import {
    renderColumns,
    createRandomNumbers,
    getValue,
    addEvent,
    renderSwap,
    renderAnimation,
    resetAllColor,
    disableAllBtn
} from './utils'

const columnsArea = document.querySelector('#num-area')
const columns = columnsArea.children
const inputArea = document.querySelector('.num-input')
const btnsArea = document.querySelectorAll('.control')[0]
const arrBtns = btnsArea.children
let arrCurrent = []
let arrAnimations = []


const strategy = {
    'random': function () {
        const randomNumbers = createRandomNumbers(20)
        queue.setQueue(randomNumbers)
        arrCurrent = queue.getQueue()
    },
    'rightIn': function () {
        const value = getValue(inputArea)
        if (value && !queue.isFull()) {
            queue.enqueue(value)
            arrCurrent = queue.getQueue()
            inputArea.value = ''
        }
    },
    'leftOut': function () {
        if (!queue.isEmpty()) {
            queue.dequeue()
            arrCurrent = queue.getQueue()
        } else {
            alert('the queue is empty')
        }
    },
    'sort': function (type) {
        if (!queue.isEmpty()) {
            // 排序
            const sort = new Sort(queue.getQueue(), arrAnimations)
            sort[type]()
            queue.setQueue(sort.getElements())

            // 根据排序结果渲染视图
            const options = {
                queue,
                columnsArea,
                renderSwap,
                setArrCurrent,
                arrElements: arrCurrent,
                arrAnimation: sort.getAnimations(),
                disableBtns: () => { return disableAllBtn(arrBtns) },
                resetColor: () => { resetAllColor(columns) }
            }
            renderAnimation(options)
        } else {
            alert('the queue is empty')
        }
    }
}

// disableAllBtn(arrBtns)(true)

function init() {
    addEvent(btnsArea, 'click', function (event) {
        if (event.target.className === 'sort') {
            strategy[event.target.className](event.target.id)
            refresh()
        } else if (event.target.className && strategy[event.target.className]) {
            strategy[event.target.className]()
            refresh()
        }
    })
}

function refresh() {
    renderColumns(columnsArea, arrCurrent)
}

function setArrCurrent(arr) {
    console.log(arr)
    arrCurrent = arr
}

let queue = new Queue()
strategy['random']()
refresh()
init()

