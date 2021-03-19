// 考察数据结构能力

class EventEmitter {
  constructor(maxListeners) {
    this.events = {}
    this.maxListeners = maxListeners || Infinity
  }

  emit(event, ...args) {
    const cbs = this.events[event]

    if (!cbs) {
      console.log('没有这个事件')
      return this
    }

    cbs.forEach(cb => cb.apply(this, args))

    return this
  }

  on(event, cb) {
    if (!this.events[event]) {
      this.events[event] = []
    }

    // TODO 拦截最大监听
    if (this.maxListeners !== Infinity && this.events[event].length >= this.maxListeners) {
      console.warn(`当前事件${event}超过最大监听数`)
      return this
    }

    this.events[event].push(cb)
    return this
  }

  once(event, cb) {
    const func = (...args) => {
      this.off(event, func)
      cb.apply(this, args)
    }

    this.on(event, func)

    return this
  }

  off(event, cb) {
    if (!cb) {
      this.events[event] = null
    } else {
      this.events[event] = this.events[event].filter(item => item !== cb)
    }

    return this
  }
}

const add = (a, b) => console.log(a + b)
const log = (...args) => console.log(...args)
const event = new EventEmitter()

event.on('add', add)
event.on('log', log)
event.emit('add', 1, 2) // 3
event.emit('log', 'hi~') // hi~
event.off('add')
event.emit('add', 1, 2) // Error: add event is not registered.
event.once('once', add)
event.once('once', 1, 2) // 3
event.once('once', 1, 2) // 3
event.once('once', 1, 2) // 3
