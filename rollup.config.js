const version = require('./package.json').version
const banner =
  '/*!\n' +
  ' * Vir.js v' + version + '\n' +
  ' * (c) 2016-' + new Date().getFullYear() + ' cjg\n' +
  ' * Released under the MIT License.\n' +
  ' */'

import babel from 'rollup-plugin-babel'

export default {
  entry: 'src/index.js',
  dest: 'dist/index.js',
  format: 'umd',
  moduleName: 'Vir',
  plugins: [
    babel({
      runtimeHelpers: true
    })
  ],
  banner
}