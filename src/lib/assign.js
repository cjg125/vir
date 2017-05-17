import {
  isObject,
  isArray,
  isBoolean
} from './typeof'

export default function assign(...args) {
  let target = args[0]
  let i = 1
  let deep = false

  if (isBoolean(target)) {
    deep = target
    target = args[1]
    i = 2
  }

  for (let source; source = args[i++];) {
    if (isObject(source) || isArray(source)) {
      for (let key in source) {
        let _target = target[key]
        let _source = source[key]
        if (deep && isObject(_target) && isObject(_source)) {
          target[key] = assign(deep, {}, _target, _source)
        } else if (deep && isArray(_target) && isArray(_source)) {
          target[key] = assign(deep, [], _target, _source)
        } else {
          target[key] = _source
        }
      }
    }
  }

  return target
}