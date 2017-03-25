import {
  forEach,
  indexOf
} from './array'


export function forEach() {
  if (!Array.prototype.forEach) {
    Array.prototype.forEach = forEach
  }
}

export function indexOf() {
  if (!Array.prototype.indexOf) {
    Array.prototype.indexOf = indexOf
  }
}