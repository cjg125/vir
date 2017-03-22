export default function (defaultOptions = {}, options = {}) {
  return $.extend(true, {
    tagName: 'div',
    data: {},
    events: {},
    methods: {},
    watch: {},
    beforeInit() {},
    init() {},
    inited() {}
  }, defaultOptions, options)
}