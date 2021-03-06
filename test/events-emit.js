import test from 'ava'
import Vir from '../dist/index'

test('发布事件', async t => {
  const App = Vir()
  const app = new App
  t.plan(4)
  app.on('a', () => {
    t.pass()
  })
  app.on('a', () => {
    t.pass()
  })

  app.emit('a')
  app.emit('a')
})

test('发布事件->传递参数', async t => {
  const App = Vir()
  const app = new App
  app.on('a', (event) => {
    t.is(event.message, 'hi~')
  })
  app.emit('a', {
    message: 'hi~'
  })
})

test('发布事件->自定义上下文', async t => {
  const App = Vir()
  const app = new App
  let ctx = {
    x: 1
  }
  app.on('a', function () {
    t.is(this, ctx)
  })
  app.emit('a', null, ctx)
})