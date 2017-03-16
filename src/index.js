import init from './init/index'
import initEvents from './events'
import initSetter from './setter'
import initGetter from './getter'
import initSelector from './selector'

export default function (defaultOptions) {
  function Vir(options) {
    if (!this instanceof Vir) {
      return new Vir(options)
    }

    this._init(defaultOptions, options)
  }

  init(Vir)
  initEvents(Vir)
  initSetter(Vir)
  initGetter(Vir)
  initSelector(Vir)

  return Vir
}