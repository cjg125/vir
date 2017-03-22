export default function (Vir) {
  Vir.prototype.set = function (name, value, options = {}) {
    if (typeof name == 'object') {
      let i
      for (i in name) {
        this.set(i, name[i], value)
      }
    } else {

      let old = this.get(name)

      this.data[name] = value

      if (!options.force && old === value) {
        return
      }

      if (options.silent) {
        return
      }

      this.emit(name, {
        old: old,
        value: value,
        type: name
      }, this)
    }
  }
}