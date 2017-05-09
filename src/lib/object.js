export const create = Object.create || function (target) {
  let TEMP = function () {}
  TEMP.prototype = target
  let temp = new TEMP
  TEMP.prototype = null
  return temp
}