import test from 'ava'
import Vir from '../dist/index'

test('订阅事件', async t => {
  const App = Vir()
  const app = new App
  t.plan(3 * 2)
  app.on('*', () => {
    t.pass()
  })
  app.on('a', () => {
    t.pass()
  })
  app.on('a', () => {
    t.pass()
  })
  app.on('b', () => {
    t.pass()
  })
  app.emit('a')
  app.emit('a')
})