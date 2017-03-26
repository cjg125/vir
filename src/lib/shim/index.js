import * as array from './array'

export function forEach() {
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = array.forEach
  }
}

export function indexOf() {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = array.indexOf
  }
}