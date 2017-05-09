import {
  create
} from '../lib/object'
import $ from 'jquery'

export default function (defaultOptions = {}, options = {}) {
  return $.extend(true, {
    tagName: 'div',
    data: create(null),
    events: create(null),
    methods: create(null),
    watch: create(null),
    validate: create(null),
    beforeInit() {},
    init() {},
    inited() {}
  }, defaultOptions, options)
}