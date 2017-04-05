export const create = Object.create || function (target) {
  var TEMP = function () {}
  TEMP.prototype = null
  return new TEMP
}