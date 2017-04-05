import {
  isFunction
} from '../lib/typeof'

import {
  forEach
} from '../lib/array'

export default function handler(watch) {
  for (let name in watch) {
    if (isFunction(watch[name])) {
      this.on(name, watch[name])
    } else {
      forEach(watch[name], (callback) => {
        handler.call(this, {
          [name]: callback
        })
      })
    }
  }
}