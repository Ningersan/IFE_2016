class Sort {
    constructor(arrElements, arrAnimations) {
        this.arrElements = JSON.parse(JSON.stringify(arrElements))
        this.arrAnimations = JSON.parse(JSON.stringify(arrAnimations))
    }

    bubbleSort() {
        let arrElements = this.arrElements
        let arrAnimations = this.arrAnimations

        const len = arrElements.length
        for (let i = 0; i < len; i++) {
            for (let j = 0; j < len - i - 1; j++) {
                if (arrElements[j] > arrElements[j + 1]) {
                    this.swap(j, j + 1)
                    this.arrAnimations.push([j, j + 1])
                }
            }
        }
    }

    selectSort() {
        let arrElements = this.arrElements
        let arrAnimations = this.arrAnimations

        const len = arrElements.length
        for (let i = 0; i < len - 1; i++) {
            let min = i
            for (let j = i + 1; j < len; j++) {
                if (arrElements[j] < arrElements[min]) {
                    min = j
                }
            }
            this.swap(i, min)
            this.arrAnimations.push([i, min])
        }
    }

    insertSort() {
        let arrElements = this.arrElements
        let arrAnimations = this.arrAnimations

        const len = arrElements.length
        for (let i = 1; i < len; i++) {
            const key = arrElements[i]
            let j = i - 1
            while (j >= 0 && arrElements[j] > key) {
                arrElements[j + 1] = arrElements[j]
                this.arrAnimations.push([j, j + 1])
                j--
            }
            arrElements[j + 1] = key
        }

    }

    quickSort() {
        let arrElements = this.arrElements
        let arrAnimations = this.arrAnimations
        this.partition(arrElements, 0, arrElements.length - 1)

    }

    /**
     * 以key为基准 一般设数组最右元素
     * 比key小的都放左边 比key大的都放右边
     * 用i标记比key小的位置
     * 循环完一次后将key与i+1位置交换 完成第一次分治
     */
    partition(arr, left, right) {
        const key = arr[right]
        let i = left - 1
        for (let j = left; j < right; j++) {
            if (arr[j] < key) {
                this.swap(++i, j)
                this.arrAnimations.push([i, j])
            }
        }
        this.swap(++i, right)
        this.arrAnimations.push([i, right])
        if (left < i - 1) {
            this.partition(arr, left, i - 1)
        }
        if (right > i + 1) {
            this.partition(arr, i + 1, right)
        }
    }

    /**
     * maxHeapify建立最大堆
     * 最大堆建成后将堆堆顶和堆底交换
     * 剩下的元素继续建立最大堆
     */
    heapSort() {
        let heapSize = this.arrElements.length
        // 建堆
        for (let i = Math.floor(heapSize / 1) - 1; i >= 0; i--) {
            this.maxHeapify(this.arrElements, i, heapSize)
        }

        //排序
        for (var j = heapSize - 1; j >= 1; j--) {
            this.swap(0, j)
            this.arrAnimations.push([0, j])
            this.maxHeapify(this.arrElements, 0, --heapSize)
        }

    }

    maxHeapify(arr, x, len) {
        const l = 2 * x + 1
        const r = 2 * x + 2
        let largest = x
        if (l < len && arr[l] > arr[largest]) {
            largest = l
        }
        if (r < len && arr[r] > arr[largest]) {
            largest = r
        }
        if (largest !== x) {
            this.swap(x, largest)
            this.arrAnimations.push([x, largest])
            this.maxHeapify(arr, largest, len)
        }
    }


    swap(index1, index2) {
        let temp = null
        let arrElements = this.arrElements
        temp = arrElements[index1]
        arrElements[index1] = arrElements[index2]
        arrElements[index2] = temp
    }

    getElements() {
        return this.arrElements
    }

    getAnimations() {
        return this.arrAnimations
    }
}

export default Sort