export default function (events) {
  for (let e in events) {
    let arr = e.split('->')
    let handlers = events[e].split(' ')
    let i = 0
    let len = handlers.length
    for (; i < len; i++) {
      let handler = this[handlers[i]]
      if (handler) {
        if (arr[1]) {
          this.$el.on(arr[0], arr[1], (event) => handler.call(this, event))
        } else {
          this.$el.on(arr[0], (event) => handler.call(this, event))
        }
      }
    }
  }
}