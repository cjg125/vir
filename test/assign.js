import test from 'ava'

import assign from '../src/lib/assign'

test('object assign', t => {

  let obj1 = {
    a: 1,
    b: '2',
    c: {
      x: 1
    },
    d: {}
  }
  let obj2 = {
    a: 11,
    b: '21',
    c: {
      x: 11,
      y: 22
    },
    d: false
  }
  let obj = assign(obj1, obj2)
  t.deepEqual(obj, {
    a: 11,
    b: '21',
    c: {
      x: 11,
      y: 22
    },
    d: false
  })

})

test('object deep assign', t => {
  let obj1 = {
    a: {
      b: {
        c: {
          x: 1,
          y: 2
        }
      }
    }
  }

  let obj2 = {
    a: {
      a: 1,
      b: {
        b: 2,
        c: {
          x: 1,
          y: {
            d: true
          },
          z: 3
        }
      }
    }
  }

  let obj = assign(obj1, obj2)

  t.deepEqual(obj, {
    a: {
      a: 1,
      b: {
        b: 2,
        c: {
          x: 1,
          y: {
            d: true
          },
          z: 3
        }
      }
    }
  })

})

test('array assign', t => {
  let arr1 = [1, 2, 3, 5, 6]

  let arr2 = [11, 22, 33, 44]

  let arr = assign(arr1, arr2)

  t.deepEqual(arr, [11, 22, 33, 44, 6])

})

test('array deep assign', t => {
  let arr1 = [
    [0, 1, 2], {
      x: {
        a: 1,
        z: 4
      }
    }
  ]

  let arr2 = [
    [0, 11], {
      x: {
        a: 2,
        b: 3
      }
    }
  ]

  let arr = assign(true, arr1, arr2)

  t.deepEqual(arr, [
    [0, 11, 2], {
      x: {
        a: 2,
        b: 3,
        z: 4
      }
    }
  ])

})

test('object,array ,number, string, boolean=>deep assign', t => {
  let obj1 = {
    a: 1,
    b: 'b',
    c: false,
    d: [1, 2, 3, 4],
    e: {
      x: 1,
      z: 'z'
    }
  }

  let obj2 = {
    a: 10,
    b: 'bb',
    c: true,
    d: [11, 22, 33],
    e: {
      x: 10,
      y: 100
    }
  }

  let obj = assign(true, obj1, obj2)

  t.deepEqual(obj, {
    a: 10,
    b: 'bb',
    c: true,
    d: [11, 22, 33, 4],
    e: {
      x: 10,
      y: 100,
      z: 'z'
    }
  })

})