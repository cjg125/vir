import {
  create
} from '../lib/object'

import assign from '../lib/assign'

export default function (options = {}) {

  let mixins = options.mixins || []


  return assign.apply(null, [true, {
    tagName: 'div',
    data: create(null),
    events: create(null),
    methods: create(null),
    watch: create(null),
    validate: create(null),
    beforeInit() {},
    init() {},
    inited() {}
  }, options].concat(mixins))
}