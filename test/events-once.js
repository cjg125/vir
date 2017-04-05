import test from 'ava'
import Vir from '../dist/index'

test('订阅事件 once', async t => {
  const App = Vir()
  const app = new App
  t.plan(4)
  app.once('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })

  app.emit('a')
  app.emit('a')

})

test('订阅事件 once', async t => {
  const App = Vir()
  const app = new App
  app.on('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })
  app.on('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })
  app.once('a', () => {
    t.pass()
  })
  app.on('a', () => {
    t.pass()
  })

  app.emit('a')
  app.emit('a')

  t.is(app.getEventListeners('a').length, 3)
})