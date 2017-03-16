export default function (Vir) {
  Vir.prototype.getEventListeners = function (type) {
    if (type === void 0) {
      return this._events
    }
    let t = type.toLowerCase()
    return this._events[t] || (this._events[t] = [])
  }

  Vir.prototype.on = function (type, handler) {
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
    let i = queue.length
    for (; i--;) {
      if (queue[i] == handler) {
        break
      }
    }

    if (~i) {
      queue.splice(i, 1)
    }

  }

  Vir.prototype.emit = function (type, args, ctx) {
    let queue = this.getEventListeners(type)
    if (type != '*') {
      queue = queue.concat(this.getEventListeners('*'))
    }
    let i = 0
    let len = queue.length
    for (; i < len; i++) {
      let handler = queue[i]
      handler.call(ctx, args)
      if (handler._once) {
        i--
        len--
        this.off(type, handler)
      }
    }
  }
}