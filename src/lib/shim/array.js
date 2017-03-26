export function forEach(callback) {
  for (let i = 0, len = this.length; i < len; i++) {
    callback(this[i], i, this)
  }
}

export function indexOf(value, i = 0) {
  let len = this.length
  i = Math.max(i >= 0 ? i : len - Math.abs(i), 0)
  for (; i < len; i++) {
    if (this[i] === value) {
      return i
    }
  }
  return -1
}