import {
  isFunction
} from '../lib/typeof'

import {
  forEach
} from '../lib/array'

export default function (events) {

  function bindEvent(...args) {
    let handler = args.pop()
    if (isFunction(handler)) {
      handler = [handler]
    } else {
      handler = handler.split(' ')
    }

    forEach(handler, (callback) => {
      if (!isFunction(callback)) {
        callback = this[callback]
      }
      this.$el.on.apply(this.$el, args.concat((event) => callback.call(this, event)))
    })
  }

  for (let type in events) {
    bindEvent.apply(this, type.split('->').concat(events[type]))
  }
}