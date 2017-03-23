const toString = Object.prototype.toString

function type(val) {
  return toString.call(val)
}

export function isArray(val) {
  return type(val) === '[object Array]'
}

export function isObject(val) {
  return type(val) === '[object Object]'
}

export function isFunction(val) {
  return type(val) === '[object Function]'
}

export function isNumber(val) {
  return type(val) === '[object Number]'
}

export function isString(val) {
  return type(val) === '[object String]'
}

export function isBoolean(val) {
  return type(val) === '[object Boolean]'
}