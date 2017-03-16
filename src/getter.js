export default function (Vir) {
  Vir.prototype.get = function (name) {
    return this.data[name]
  }
}