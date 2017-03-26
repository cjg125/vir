import test from 'ava'
import initVir from './helpers/initVir'

test('订阅事件 once', async t => {
  const Vir = await initVir()
  const app = new(Vir())
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
  const Vir = await initVir()
  const app = new(Vir())
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