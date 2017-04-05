import {
  create
} from '../lib/objeat'
import $ from 'jquery'

export default function (defaultOptions = {}, options = {}) {
  return $.extend(true, {
    tagName: 'div',
    data: create(null),
    events: create(null),
    methods: create(null),
    watch: create(null),
    beforeInit() {},
    init() {},
    inited() {}
  }, defaultOptions, options)
}