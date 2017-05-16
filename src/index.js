import init from './init/index'
import initEventEmitter from './eventEmiter'
import initSetter from './setter'
import initGetter from './getter'
import initSelector from './selector'


function Vir(options) {
  if (!(this instanceof Vir)) {
    return new Vir(options)
  }

  this._init(options)
}

init(Vir)
initEventEmitter(Vir)
initSetter(Vir)
initGetter(Vir)
initSelector(Vir)

export default Vir