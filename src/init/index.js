import $ from 'jquery'
import {
  create
} from '../lib/object'
import initMixins from './mixins'
import initMethods from './methods'
import initWatch from './watch'
import initBindEvents from './bindEvents'

let uid = 0

export default function (Vir) {
  Vir.prototype._init = function (options) {
    let {
      el,
      tagName,
      data, // object
      events, // object
      methods, // object
      watch, // object
      validate, // object
      beforeInit,
      init,
      inited
    } = initMixins(options)

    this._uid = ++uid
    this.$el = el ? $(el) : $('<' + tagName + '>')
    this.data = data // state
    this.validate = validate
    this._events = create(null) // eventEmiter
    this._cache = create(null) // selector cache (this.$$)

    beforeInit.call(this)
    initMethods.call(this, methods)
    initWatch.call(this, watch)
    initBindEvents.call(this, events)
    init.call(this)
    inited.call(this)
  }
}