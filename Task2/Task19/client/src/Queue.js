import { MAX_ELEMENTS } from './utils'

class Queue {
    constructor() {
        this.dataStore = []
    }

    enqueue(element) {
        this.dataStore.push(element)
    }

    dequeue() {
        this.dataStore.shift()
    }

    delete(index) {
        this.dataStore.splice(index, 1)
    }

    swap(a, b) {
        let dataStore = this.dataStore
        const temp = dataStore[a]
        dataStore[a] = dataStore[b]
        dataStore[b] = temp
    }

    getQueue() {
        return this.dataStore
    }

    setQueue(arr) {
        this.dataStore = JSON.parse(JSON.stringify(arr))
    }

    isEmpty() {
        return this.dataStore.length === 0 ? true : false
    }

    isFull() {
        return this.dataStore.length > MAX_ELEMENTS ? true : false
    }
}

export default Queue