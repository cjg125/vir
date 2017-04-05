import {
  isObject,
  isFunction
} from './lib/typeof'

export default function (Vir) {
  Vir.prototype.set = function (type, value, options = {}) {
    if (isObject(type)) {
      for (let i in type) {
        this.set(i, type[i], value)
      }
    } else {

      let old = this.get(type)

      let args = {
        old,
        value,
        type
      }

      let validate = this.validate[type]

      if (isFunction(validate) && validate.call(this, args) !== void 0) {
        return
      }

      this.data[type] = value

      if (!options.force && old === value) {
        return
      }

      if (options.silent) {
        return
      }

      this.emit(type, args, this)
    }
  }
}