import test from 'ava'
import initVir from './helpers/initVir'

test('订阅事件 once', async t => {
  const Vir = await initVir()
  const app = new(Vir())
  t.plan(1)
  app.once('a', () => {
    t.pass()
  })

  app.emit('a')
  app.emit('a')
})