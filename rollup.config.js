const version = require('./package.json').version
const banner =
  '/*!\n' +
  ' * Vir.js v' + version + '\n' +
  ' * (c) ' + new Date().getFullYear() + ' cjg\n' +
  ' * Released under the MIT License.\n' +
  ' */'

import babel from 'rollup-plugin-babel'
import uglify from 'rollup-plugin-uglify'

let dest = 'dist/index.js'
let plugins = [
  babel()
]

if (process.env.NODE_ENV === 'production') {
  dest = 'dist/index.min.js'
  plugins.push(uglify({
    compress: {
      screw_ie8: false
    },
    mangle: {
      screw_ie8: false
    },
    output: {
      screw_ie8: false
    }
  }))
}

export default {
  entry: 'src/index.js',
  dest,
  format: 'umd',
  moduleName: 'Vir',
  sourceMap: true,
  plugins,
  banner
}