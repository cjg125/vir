import test from 'ava'

import {
  forEach,
  indexOf
} from '../src/lib/es/array'

const data = ['a', 'b', 'c', 'd', 'e', 'f']

test('forEach', t => {
  const data = ['a']
  forEach.call(data, function (value, index, ctx) {
    t.is(ctx, data)
    t.is(value, 'a')
    t.is(index, 0)
  })
})

test('indexOf', t => {
  var i = indexOf.call(data, 'c')
  t.is(i, 2)
})

test('indexOf', t => {
  var i = indexOf.call(data, 'g')
  t.is(i, -1)
})

test('indexOf', t => {
  var i = indexOf.call(data, 'b', 2)
  t.is(i, -1)
})