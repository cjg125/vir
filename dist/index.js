/*!
 * Vir.js v0.1.0
 * (c) 2016-2017 cjg
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vir = factory());
}(this, (function () { 'use strict';

var bindEvents = function (events) {
  var _this = this;

  for (var e in events) {
    var arr = e.split('->');
    var handlers = events[e].split(' ');
    var i = 0;
    var len = handlers.length;

    var _loop = function _loop() {
      var handler = _this[handlers[i]];
      if (handler) {
        if (arr[1]) {
          _this.$el.on(arr[0], arr[1], function (event) {
            return handler.call(_this, event);
          });
        } else {
          _this.$el.on(arr[0], function (event) {
            return handler.call(_this, event);
          });
        }
      }
    };

    for (; i < len; i++) {
      _loop();
    }
  }
};

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) {
  return typeof obj;
} : function (obj) {
  return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
};





















var _extends = Object.assign || function (target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i];

    for (var key in source) {
      if (Object.prototype.hasOwnProperty.call(source, key)) {
        target[key] = source[key];
      }
    }
  }

  return target;
};

var initMixin = function (methods) {
  _extends(this, methods);
};

var initWatch = function (watch) {
  for (var name in watch) {
    this.on('change:' + name, watch[name]);
  }
};

var extend = function () {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return $.extend(true, {
    tagName: 'div',
    data: {},
    events: {},
    methods: {},
    watch: {},
    init: function init() {},
    inited: function inited() {}
  }, defaultOptions, options);
};

var uid = 0;

var init = function (Vir) {
  Vir.prototype._init = function (defaultOptions, options) {
    var _extend = extend(defaultOptions, options),
        el = _extend.el,
        tagName = _extend.tagName,
        data = _extend.data,
        events = _extend.events,
        methods = _extend.methods,
        watch = _extend.watch,
        init = _extend.init,
        inited = _extend.inited;

    this._uid = ++uid;
    this.$el = el ? $(el) : $('<' + tagName + '>');
    this.data = data;
    this._events = {};
    this._cache = {};

    initMixin.call(this, methods);
    initWatch.call(this, watch);
    bindEvents.call(this, events);
    init.call(this);
    inited.call(this);
  };
};

var initEvents = function (Vir) {
  Vir.prototype.getEventListeners = function (type) {
    if (type === void 0) {
      return this._events;
    }
    var t = type.toLowerCase();
    return this._events[t] || (this._events[t] = []);
  };

  Vir.prototype.on = function (type, handler) {
    var _this = this;

    this.getEventListeners(type).push(handler);
    return function () {
      _this.off(type, handler);
    };
  };

  Vir.prototype.once = function (type, handler) {
    handler._once = true;
    this.on(type, handler);
  };

  Vir.prototype.off = function (type, handler) {
    var queue = this.getEventListeners(type);
    if (handler == void 0) {
      queue.length = 0;
      return;
    }
    var i = queue.length;
    for (; i--;) {
      if (queue[i] == handler) {
        break;
      }
    }

    if (~i) {
      queue.splice(i, 1);
    }
  };

  Vir.prototype.emit = function (type, args, ctx) {
    var queue = this.getEventListeners(type);
    if (type != '*') {
      queue = queue.concat(this.getEventListeners('*'));
    }
    var i = 0;
    var len = queue.length;
    for (; i < len; i++) {
      var handler = queue[i];
      handler.call(ctx, args);
      if (handler._once) {
        i--;
        len--;
        this.off(type, handler);
      }
    }
  };
};

var initSetter = function (Vir) {
  Vir.prototype.set = function (name, value, options) {
    if ((typeof name === 'undefined' ? 'undefined' : _typeof(name)) == 'object') {
      var i = void 0;
      for (i in name) {
        this.set(i, name[i], value);
      }
    } else {

      options || (options = {});

      var old = this.get(name);

      this.data[name] = value;

      if (!options.force && old === value) {
        return;
      }

      if (options.silent) {
        return;
      }

      this.emit('change:' + name, {
        old: old,
        value: value,
        type: name
      }, this);
    }
  };
};

var initGetter = function (Vir) {
  Vir.prototype.get = function (name) {
    return this.data[name];
  };
};

var initSelector = function (Vir) {
  Vir.prototype.$$ = function (selector, cache) {

    var _cache = this._cache;

    var _selector = this._uid + '_' + this.$el.selector + ' ' + selector;

    if (cache === false) {
      _cache[_selector] = null;
    }

    var $el = _cache[_selector];
    if ($el) {
      return $el;
    }
    $el = this.$el.find(selector);
    _cache[_selector] = $el;
    return $el;
  };
};

var index = function (defaultOptions) {
  function Vir(options) {
    if (!this instanceof Vir) {
      return new Vir(options);
    }

    this._init(defaultOptions, options);
  }

  init(Vir);
  initEvents(Vir);
  initSetter(Vir);
  initGetter(Vir);
  initSelector(Vir);

  return Vir;
};

return index;

})));
