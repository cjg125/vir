export function forEach(array, callback) {
  for (let i = 0, len = array.length; i < len; i++) {
    callback(array[i], i, array)
  }
}

export function indexOf(array, value, i = 0) {
  let len = array.length
  i = Math.max(i >= 0 ? i : len - Math.abs(i), 0)
  for (; i < len; i++) {
    if (array[i] === value) {
      return i
    }
  }
  return -1
}