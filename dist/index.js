/*!
 * Vir.js v0.3.0
 * (c) 2017 cjg
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.Vir = factory());
}(this, (function () { 'use strict';

var extend = function () {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return $.extend(true, {
    tagName: 'div',
    data: {},
    events: {},
    methods: {},
    watch: {},
    beforeInit: function beforeInit() {},
    init: function init() {},
    inited: function inited() {}
  }, defaultOptions, options);
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

var toString = Object.prototype.toString;

function type(val) {
  return toString.call(val);
}



function isObject(val) {
  return type(val) === '[object Object]';
}

function isFunction(val) {
  return type(val) === '[object Function]';
}

function handler(watch) {
  for (var name in watch) {
    if (isFunction(watch[name])) {
      this.on(name, watch[name]);
    } else {
      var watchs = watch[name];
      var i = 0;
      var len = watchs.length;
      var options = {};
      for (; i < len; i++) {
        options[name] = watchs[i];
        handler.call(this, options);
      }
    }
  }
}

var initBindEvents = function (events) {

  function bindEvent() {
    var _this = this;

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    var handler = args.pop();
    if (isFunction(handler)) {
      handler = [handler];
    } else {
      handler = handler.split(' ');
    }

    var _loop = function _loop(i, len) {
      var callback = handler[i];
      if (!isFunction(callback)) {
        callback = _this[callback];
      }
      _this.$el.on.apply(_this.$el, args.concat(function (event) {
        return callback.call(_this, event);
      }));
    };

    for (var i = 0, len = handler.length; i < len; i++) {
      _loop(i, len);
    }
  }

  for (var type in events) {
    bindEvent.apply(this, type.split('->').concat(events[type]));
  }
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
        beforeInit = _extend.beforeInit,
        init = _extend.init,
        inited = _extend.inited;

    this._uid = ++uid;
    this.$el = el ? $(el) : $('<' + tagName + '>');
    this.data = data;
    this._events = {};
    this._cache = {};

    beforeInit.call(this);
    initMixin.call(this, methods);
    handler.call(this, watch);
    initBindEvents.call(this, events);
    init.call(this);
    inited.call(this);
  };
};

var initEvents = function (Vir) {

  function all(type) {
    if (type === void 0) {
      return this._events;
    }
    var t = type.toLowerCase();
    return this._events[t] || (this._events[t] = []);
  }

  // Vir.prototype.getEventListeners = all

  Vir.prototype.on = function (type, handler) {
    var _this = this;

    // todo 过滤重复绑定问题
    all.call(this, type).push(handler);
    return function () {
      _this.off(type, handler);
    };
  };

  Vir.prototype.once = function (type, handler) {
    handler._once = true;
    this.on(type, handler);
  };

  Vir.prototype.off = function (type, handler) {
    var queue = all.call(this, type);
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
    var queue = all.call(this, type);
    if (type != '*') {
      queue = queue.concat(all.call(this, '*'));
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
  Vir.prototype.set = function (name, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (isObject(name)) {
      for (var i in name) {
        this.set(i, name[i], value);
      }
    } else {

      var old = this.get(name);

      this.data[name] = value;

      if (!options.force && old === value) {
        return;
      }

      if (options.silent) {
        return;
      }

      this.emit(name, {
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

    var _selector = selector.replace(/\s/g, '');

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
//# sourceMappingURL=index.js.map
