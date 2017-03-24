import jsdom from 'jsdom'

export default function () {
  return new Promise((resolve, reject) => {
    jsdom.env({
      file: './test/helpers/test.html',
      scripts: ['./jquery@3.2.1.js', '../../dist/index.js'],
      done: function (err, window) {
        resolve(window.Vir)
      }
    })
  })
}