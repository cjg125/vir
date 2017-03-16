export default function (Vir) {
  Vir.prototype.$$ = function (selector, cache) {

    let _cache = this._cache

    let _selector = this._uid + '_' + this.$el.selector + ' ' + selector

    if (cache === false) {
      _cache[_selector] = null
    }

    let $el = _cache[_selector]
    if ($el) {
      return $el
    }
    $el = this.$el.find(selector)
    _cache[_selector] = $el
    return $el
  }
}