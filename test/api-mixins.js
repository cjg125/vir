import test from 'ava'
import Vir from '../dist/index'

test('mixins test', async t => {
  t.plan(8)
  let mixins1 = {
    data: {
      index: 0
    },
    events: {
      'click->a': function (event) {
        t.truthy(event.type, 'click')
      }
    },
    methods: {
      foo() {
        t.pass()
      }
    },
    watch: {
      index: function (result) {
        t.truthy(result.value, 1)
      }
    },
    validate: {
      index: function (result) {
        t.truthy(result.value, 1)
      }
    }
  }

  let mixins2 = {
    data: {
      i: 0
    },
    events: {
      'click->span': function (event) {
        t.truthy(event.type, 'click')
      }
    },
    methods: {
      foo2() {
        t.pass()
      }
    },
    watch: {
      i: function (result) {
        t.truthy(result.value, 1)
      }
    },
    validate: {
      i: function (result) {
        t.truthy(result.value, 1)
      }
    }
  }

  const app = new Vir({
    mixins: [mixins1, mixins2],
    data: {
      value: 0
    },
    beforeInit() {},
    init() {},
    inited() {}
  })

  document.body.appendChild(app.$el.html(`
    <a href="###">test</a>
    <span>test</span>
  `)[0])

  app.$$('a').trigger('click')
  app.$$('span').trigger('click')
  app.set('index', 1)
  app.set('i', 1)
  app.foo()
  app.foo2()



})