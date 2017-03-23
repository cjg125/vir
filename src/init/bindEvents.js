import {
  isFunction
} from '../lib/typeof'

export default function (events) {

  function bindEvent(...args) {
    let handler = args.pop()
    if (isFunction(handler)) {
      handler = [handler]
    } else {
      handler = handler.split(' ')
    }
    for (let i = 0, len = handler.length; i < len; i++) {
      let callback = handler[i]
      if (!isFunction(callback)) {
        callback = this[callback]
      }
      this.$el.on.apply(this.$el, args.concat((event) => callback.call(this, event)))
    }
  }

  for (let type in events) {
    bindEvent.apply(this, type.split('->').concat(events[type]))
  }
}