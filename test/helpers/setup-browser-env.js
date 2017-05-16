const {
  JSDOM
} = require("jsdom")

const {
  window
} = new JSDOM(`...`)

global.window = window
global.document = window.document
global.navigator = window.navigator