import extend from './extend'
import initMixin from './mixin'
import initWatch from './watch'
import initBindEvents from './bindEvents'

let uid = 0

export default function (Vir) {
  Vir.prototype._init = function (defaultOptions, options) {
    let {
      el,
      tagName,
      data,
      events,
      methods,
      watch,
      beforeInit,
      init,
      inited
    } = extend(defaultOptions, options)

    this._uid = ++uid
    this.$el = el ? $(el) : $('<' + tagName + '>')
    this.data = data
    this._events = {}
    this._cache = {}

    beforeInit.call(this)
    initMixin.call(this, methods)
    initWatch.call(this, watch)
    initBindEvents.call(this, events)
    init.call(this)
    inited.call(this)
  }
}