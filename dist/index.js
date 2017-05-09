/*!
 * Vir.js v0.6.0
 * (c) 2017 cjg
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.Vir = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = 'default' in $ ? $['default'] : $;

var create = Object.create || function (target) {
  var TEMP = function TEMP() {};
  TEMP.prototype = target;
  var temp = new TEMP();
  TEMP.prototype = null;
  return temp;
};

var extend = function () {
  var defaultOptions = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  return $.extend(true, {
    tagName: 'div',
    data: create(null),
    events: create(null),
    methods: create(null),
    watch: create(null),
    validate: create(null),
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

function forEach(array, callback) {
  for (var i = 0, len = array.length; i < len; i++) {
    callback(array[i], i, array);
  }
}

function indexOf(array, value) {
  var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  var len = array.length;
  i = Math.max(i >= 0 ? i : len - Math.abs(i), 0);
  for (; i < len; i++) {
    if (array[i] === value) {
      return i;
    }
  }
  return -1;
}

function handler(watch) {
  var _this = this;

  var _loop = function _loop(name) {
    if (isFunction(watch[name])) {
      _this.on(name, watch[name]);
    } else {
      forEach(watch[name], function (callback) {
        var _handler$call;

        handler.call(_this, (_handler$call = {}, _handler$call[name] = callback, _handler$call));
      });
    }
  };

  for (var name in watch) {
    _loop(name);
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

    forEach(handler, function (callback) {
      if (!isFunction(callback)) {
        callback = _this[callback];
      }
      _this.$el.on.apply(_this.$el, args.concat(function (event) {
        return callback.call(_this, event);
      }));
    });
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
        validate = _extend.validate,
        beforeInit = _extend.beforeInit,
        init = _extend.init,
        inited = _extend.inited;

    this._uid = ++uid;
    this.$el = el ? $(el) : $('<' + tagName + '>');
    this.data = data;
    this.validate = validate;
    this._events = create(null);
    this._cache = create(null);

    beforeInit.call(this);
    initMixin.call(this, methods);
    handler.call(this, watch);
    initBindEvents.call(this, events);
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

  Vir.prototype.$watch = function (type, handler) {
    var once = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

    handler._once = once;
    return this.on(type, handler);
  };

  Vir.prototype.on = function (type, handler) {
    var _this = this;

    // todo 过滤重复绑定问题
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

    var i = indexOf(queue, handler);

    if (~i) {
      queue.splice(i, 1);
    }
  };

  Vir.prototype.emit = function (type, args, ctx) {
    var _this2 = this;

    var queue = this.getEventListeners(type);
    if (type != '*') {
      queue = queue.concat(this.getEventListeners('*'));
    }

    forEach(queue, function (handler) {
      handler.call(ctx, args);
      if (handler._once) {
        _this2.off(type, handler);
      }
    });
  };
};

var initSetter = function (Vir) {
  Vir.prototype.set = function (type, value) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (isObject(type)) {
      for (var i in type) {
        this.set(i, type[i], value);
      }
    } else {

      var old = this.get(type);

      var args = {
        old: old,
        value: value,
        type: type
      };

      var validate = this.validate[type];

      if (isFunction(validate) && validate.call(this, args) !== void 0) {
        return;
      }

      this.data[type] = value;

      if (!options.force && old === value) {
        return;
      }

      if (options.silent) {
        return;
      }

      this.emit(type, args, this);
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
    if (!(this instanceof Vir)) {
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
