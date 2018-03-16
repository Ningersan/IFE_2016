import { MAX_VALUE, MIN_VALUE, SORT_SPEED } from './constants'

export const getValue = element => {
    const value = element.value.trim()

    if (value !== '' && !isNaN(value)) {
        if (value > MIN_VALUE && value < MAX_VALUE) {
            return value
        } else {
            alert('out of range')
        }
    } else {
        alert('please enter a number')
    }
}


export const addEvent = (element, event, listener) => {
    if (element.addEventListener) {
        element.addEventListener(event, listener, false)
    } else if (element.attachEvent) {
        element.attachEvent('on' + event, listener)
    } else {
        element['on' + event] = listener
    }
}

export const createRandomNumbers = amount => {
    let arr = []
    let num = null
    for (let i = 0; i < amount; i++) {
        num = parseInt(Math.random() * (MAX_VALUE - MIN_VALUE)) + MIN_VALUE
        arr.push(num)
    }
    return arr
}

export const renderColumns = (columnsArea, arr) => {
    columnsArea.innerHTML = arr.map((item, index) => `<div data-index="${index}" title="${item}" class="normal" style="height:${item * 2}px;"></div>`).join('')
}


export const renderSwap = (columnsArea, arrElements, index1, index2) => {
    let temp = {}
    const ele1 = columnsArea.children[index1]
    const ele2 = columnsArea.children[index2]
    temp.title = ele1.title
    temp.height = ele1.offsetHeight
    temp.title = ele1.title
    temp.height = ele1.offsetHeight

    // title
    ele1.title = ele2.title
    ele2.title = temp.title

    // height
    ele1.style.height = ele2.offsetHeight + 'px'
    ele2.style.height = temp.height + 'px'

    // color
    ele1.className = 'active'
    ele2.className = 'active'
}

/**
 * options:{
 *      columnsArea 渲染动画堆栈的容器
 *      arrElements 待排序数组
 *      arrAnimation 动画堆栈
 *      renderSwap 交换顺序动画
 *      resetColor 重置颜色函数
 *      disableBtns 控制按钮开关函数
 * }
 * columnsArea, arrElements, arrAnimation, renderSwap, resetColor
 */
export const renderAnimation = (options) => {
    let params = null
    let {
        queue,
        columnsArea,
        arrElements,
        arrAnimation,
        renderSwap,
        resetColor,
        disableBtns,
        setArrCurrent
    } = options

    const promise = new Promise((resolve, reject) => {
        let timer = setTimeout(function performAnimation() {
            if (arrAnimation.length) {
                resetColor()
                params = arrAnimation.shift()
                disableBtns()(true)
                renderSwap(columnsArea, arrElements, params[0], params[1])
                timer = setTimeout(performAnimation, SORT_SPEED)
            } else {
                resetColor()
                disableBtns()(false)
                resolve()
            }
        }, SORT_SPEED)
    })
    promise.then(() => {
        setArrCurrent(queue.getQueue())
    })


}


export const disableAllBtn = arrBtns => {
    const len = arrBtns.length
    return function (flag) {
        for (let i = 0; i < len; i++) {
            arrBtns[i].disabled = flag
        }
    }
}

export const resetAllColor = columns => {
    Array.prototype.forEach.call(columns, function (element) {
        element.className = 'normal'
    })
}