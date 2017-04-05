import {
  forEach,
  indexOf
} from './lib/array'

export default function (Vir) {

  Vir.prototype.getEventListeners = function (type) {
    if (type === void 0) {
      return this._events
    }
    let t = type.toLowerCase()
    return this._events[t] || (this._events[t] = [])
  }

  Vir.prototype.$watch = function (type, handler, once = false) {
    handler._once = once
    return this.on(type, handler)
  }

  Vir.prototype.on = function (type, handler) {
    // todo 过滤重复绑定问题
    this.getEventListeners(type).push(handler)
    return () => {
      this.off(type, handler)
    }
  }

  Vir.prototype.once = function (type, handler) {
    handler._once = true
    this.on(type, handler)
  }

  Vir.prototype.off = function (type, handler) {
    let queue = this.getEventListeners(type)
    if (handler == void 0) {
      queue.length = 0
      return
    }

    let i = indexOf(queue, handler)

    if (~i) {
      queue.splice(i, 1)
    }

  }

  Vir.prototype.emit = function (type, args, ctx) {
    let queue = this.getEventListeners(type)
    if (type != '*') {
      queue = queue.concat(this.getEventListeners('*'))
    }

    forEach(queue, (handler) => {
      handler.call(ctx, args)
      if (handler._once) {
        this.off(type, handler)
      }
    })

  }
}