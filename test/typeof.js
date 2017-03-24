import test from 'ava'
import {
  isArray,
  isObject,
  isFunction,
  isNumber,
  isString,
  isBoolean
} from '../src/lib/typeof'

const data = {
  "array": [],
  "object": {},
  "function": function () {},
  "number": 1,
  "string": 'a',
  "boolean": true,
  "null": null,
  "undefined": void 0,
  "regexp": new RegExp("\w")
}

test('Array', t => {
  Object.keys(data).forEach((val) => {
    if (val === 'array') {
      t.true(isArray(data[val]))
    } else {
      t.false(isArray(data[val]))
    }
  })
  t.pass()
})

test('Object', t => {
  Object.keys(data).forEach((val) => {
    if (val === 'object') {
      t.true(isObject(data[val]))
    } else {
      t.false(isObject(data[val]))
    }
  })
})

test('Function', t => {
  Object.keys(data).forEach((val) => {
    if (val === 'function') {
      t.true(isFunction(data[val]))
    } else {
      t.false(isFunction(data[val]))
    }
  })
})

test('Number', t => {
  Object.keys(data).forEach((val) => {
    if (val === 'number') {
      t.true(isNumber(data[val]))
    } else {
      t.false(isNumber(data[val]))
    }
  })
})

test('String', t => {
  Object.keys(data).forEach((val) => {
    if (val === 'string') {
      t.true(isString(data[val]))
    } else {
      t.false(isString(data[val]))
    }
  })
})

test('isBoolean', t => {
  Object.keys(data).forEach((val) => {
    if (val === 'boolean') {
      t.true(isBoolean(data[val]))
    } else {
      t.false(isBoolean(data[val]))
    }
  })
})