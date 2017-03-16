import bindEvents from './bindEvents'
import initMixin from './mixin'
import initWatch from './watch'
import extend from './extend'

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
      init,
      inited
    } = extend(defaultOptions, options)

    this._uid = ++uid
    this.$el = el ? $(el) : $('<' + tagName + '>')
    this.data = data
    this._events = {}
    this._cache = {}

    initMixin.call(this, methods)
    initWatch.call(this, watch)
    bindEvents.call(this, events)
    init.call(this)
    inited.call(this)
  }
}