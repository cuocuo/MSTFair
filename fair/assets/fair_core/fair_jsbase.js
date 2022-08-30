function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it.return != null) it.return(); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

/*
 * Copyright (C) 2005-present, 58.com.  All rights reserved.
 * Use of this source code is governed by a BSD type license that can be
 * found in the LICENSE file.
 */
if (!this.global) {
  this.global = this; // iOS下JSCore没有注入global作为全局变量
}

var __modules__ = {};

function defineModule(modId, func, deps) {
  var imports = {};

  var __global__ = this;

  __modules__[modId] = {
    init: func,
    inited: false,
    deps: deps,
    run: function run(mod) {
      if (!this.inited) {
        this.deps.forEach(function (d) {
          return typeof d == "number" ? runModule(d, {
            exports: imports
          }) : runModule(d[0], {
            exports: imports
          }, d[1]);
        });
        this.inited = true;
      }

      this.init.call(__global__, {
        imports: imports,
        exports: mod.exports
      });
    }
  };
}

function runModule(id, mod, alias) {
  if (alias) {
    mod.exports[alias] = {};

    __modules__[id].run({
      exports: mod.exports[alias]
    });
  } else {
    __modules__[id].run(mod);
  }
}

function runCallback(func, deps) {
  var imports = {};

  var __global__ = this;

  deps.map(function (d) {
    return typeof d == "number" ? runModule(d, {
      exports: imports
    }) : runModule(d[0], {
      exports: imports
    }, d[1]);
  });
  return func.call(__global__, {
    imports: imports
  });
}

function inherit(cls, sup) {
  var oldProto = cls.prototype;
  cls.prototype = Object.create(Object.create(sup.prototype));
  Object.assign(cls.prototype, oldProto);
  cls.prototype.constructor = cls;
  cls.prototype.$superSubstitution = cls.prototype.__proto__;
}

function convertObjectLiteralToSetOrMap(obj) {
  var isSet = Object.prototype.toString.call(obj) == '[object Array]';

  if (!isSet) {
    var keys = Object.getOwnPropertyNames(obj);
    var res = new Map();
    keys.forEach(function (k) {
      return res.set(k, obj[k]);
    });
    return res;
  } else {
    var _res = new Set();

    obj.forEach(function (item) {
      return _res.add(item);
    });
    return _res;
  }
}

Object.prototype.ctor = function () {};

Object.__inner__ = function () {};

(function () {
  var __global__ = global;

  function Duration() {
    var inner = Duration.__inner__;

    if (this == __global__) {
      return new Duration({
        __args__: arguments
      });
    } else {
      var args = arguments.length > 0 ? arguments[0].__args__ || arguments : [];
      inner.apply(this, args);
      Duration.prototype.ctor.apply(this, args);
      return this;
    }
  }

  Duration.__inner__ = function inner() {
    var _this = this;

    Object.defineProperties(this, {
      inDays: {
        get: function get() {
          return _this._duration / Duration.microsecondsPerDay >> 0;
        }
      },
      inHours: {
        get: function get() {
          return _this._duration / Duration.microsecondsPerHour >> 0;
        }
      },
      inMinutes: {
        get: function get() {
          return _this._duration / Duration.microsecondsPerMinute >> 0;
        }
      },
      inSeconds: {
        get: function get() {
          return _this._duration / Duration.microsecondsPerSecond >> 0;
        }
      },
      inMilliseconds: {
        get: function get() {
          return _this._duration / Duration.microsecondsPerMillisecond >> 0;
        }
      },
      inMicroseconds: {
        get: function get() {
          return _this._duration;
        }
      },
      hashCode: {
        get: function get() {
          return _this._duration.hashCode;
        }
      },
      isNegative: {
        get: function get() {
          return _this._duration < 0;
        }
      }
    });
    this._duration = null;
  };

  Duration.prototype = {
    ctor: function ctor() {
      var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref$days = _ref.days,
          days = _ref$days === void 0 ? 0 : _ref$days,
          _ref$hours = _ref.hours,
          hours = _ref$hours === void 0 ? 0 : _ref$hours,
          _ref$minutes = _ref.minutes,
          minutes = _ref$minutes === void 0 ? 0 : _ref$minutes,
          _ref$seconds = _ref.seconds,
          seconds = _ref$seconds === void 0 ? 0 : _ref$seconds,
          _ref$milliseconds = _ref.milliseconds,
          milliseconds = _ref$milliseconds === void 0 ? 0 : _ref$milliseconds,
          _ref$microseconds = _ref.microseconds,
          microseconds = _ref$microseconds === void 0 ? 0 : _ref$microseconds;

      var __thiz__ = this;

      var __arg_ctx__ = {
        days: days,
        hours: hours,
        minutes: minutes,
        seconds: seconds,
        milliseconds: milliseconds,
        microseconds: microseconds
      };

      Duration._microseconds.call(__thiz__, Duration.microsecondsPerDay * __arg_ctx__.days + Duration.microsecondsPerHour * __arg_ctx__.hours + Duration.microsecondsPerMinute * __arg_ctx__.minutes + Duration.microsecondsPerSecond * __arg_ctx__.seconds + Duration.microsecondsPerMillisecond * __arg_ctx__.milliseconds + __arg_ctx__.microseconds);
    },
    __op_add__: function __op_add__(other) {
      return Duration._microseconds(this._duration + other._duration);
    },
    __op_minus__: function __op_minus__(other) {
      return Duration._microseconds(this._duration - other._duration);
    },
    __op_multi__: function __op_multi__(factor) {
      return Duration._microseconds(Math.round(this._duration * factor));
    },
    __op_idivide__: function __op_idivide__(quotient) {
      return Duration._microseconds(this._duration / quotient >> 0);
    },
    __op_lt__: function __op_lt__(other) {
      return this._duration < other._duration;
    },
    __op_gt__: function __op_gt__(other) {
      return this._duration < other._duration;
    },
    __op_lte__: function __op_lte__(other) {
      return this._duration <= other._duration;
    },
    __op_gte__: function __op_gte__(other) {
      return this._duration >= other._duration;
    },
    __op_eq__: function __op_eq__(other) {
      return other && this._duration == other._duration;
    },
    __op_ngt__: function __op_ngt__() {
      return Duration._microseconds(-this._duration);
    },
    compareTo: function compareTo(other) {
      return this._duration.compareTo(other._duration);
    },
    toString: function toString() {
      function sixDigits(n) {
        if (n >= 100000) return "".concat(n);
        if (n >= 10000) return "0".concat(n);
        if (n >= 1000) return "00".concat(n);
        if (n >= 100) return "000".concat(n);
        if (n >= 10) return "0000".concat(n);
        return "00000".concat(n);
      }

      function twoDigits(n) {
        if (n >= 10) return "".concat(n);
        return "0".concat(n);
      }

      var __thiz__ = this;

      if (__thiz__.inMicroseconds < 0) {
        return "-".concat(this.__op_ngt__());
      }

      var twoDigitMinutes = twoDigits(__thiz__.inMinutes % Duration.minutesPerHour);
      var twoDigitSeconds = twoDigits(__thiz__.inSeconds % Duration.secondsPerMinute);
      var sixDigitUs = sixDigits(__thiz__.inMicroseconds % Duration.microsecondsPerSecond);
      return "".concat(__thiz__.inHours, ":").concat(twoDigitMinutes, ":").concat(twoDigitSeconds, ".").concat(sixDigitUs);
    },
    abs: function abs() {
      return Duration._microseconds(this._duration.abs());
    }
  };
  var staticFields = {
    microsecondsPerMillisecond: 1000,
    millisecondsPerSecond: 1000,
    secondsPerMinute: 60,
    minutesPerHour: 60,
    hoursPerDay: 24
  };

  Duration._microseconds = function (arg1) {
    var res = _instanceof(this, Duration) ? this : new Duration();
    res._duration = arg1;
    return res;
  };

  Object.assign(Duration, staticFields);
  Duration.microsecondsPerSecond = Duration.microsecondsPerMillisecond * Duration.millisecondsPerSecond;
  Duration.microsecondsPerMinute = Duration.microsecondsPerSecond * Duration.secondsPerMinute;
  Duration.microsecondsPerHour = Duration.microsecondsPerMinute * Duration.minutesPerHour;
  Duration.microsecondsPerDay = Duration.microsecondsPerHour * Duration.hoursPerDay;
  Duration.millisecondsPerMinute = Duration.millisecondsPerSecond * Duration.secondsPerMinute;
  Duration.millisecondsPerHour = Duration.millisecondsPerMinute * Duration.minutesPerHour;
  Duration.millisecondsPerDay = Duration.millisecondsPerHour * Duration.hoursPerDay;
  Duration.secondsPerHour = Duration.secondsPerMinute * Duration.minutesPerHour;
  Duration.secondsPerDay = Duration.secondsPerHour * Duration.hoursPerDay;
  Duration.minutesPerDay = Duration.minutesPerHour * Duration.hoursPerDay;
  Duration.zero = Duration({
    seconds: 0
  });
  global.Duration = Duration;
})();

(function () {
  function Iterable() {}

  Iterable.prototype = Object.create({
    followedBy: function followedBy(other) {
      return this.concat(other);
    },
    where: function where(test) {
      return this.filter(test);
    },
    whereType: function whereType() {
      throw "Not Implemented: whereType";
    },
    expand: function expand(f) {
      var res = [];
      this.map(f).forEach(function (elem) {
        res.addAll(elem);
      });
      return res;
    },
    contains: function contains(element) {
      return this.includes(element);
    },
    // map / forEach / reduce / every
    // join 默认参数为空字串，而不是,
    fold: function fold(initialValue, combine) {
      return this.reduce(combine, initialValue);
    },
    any: function any(test) {
      return this.some(test);
    },
    toList: function toList() {
      var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
          _ref2$growable = _ref2.growable,
          growable = _ref2$growable === void 0 ? true : _ref2$growable;

      return this;
    },
    toSet: function toSet() {
      throw "Not Implemented: toSet";
    },
    take: function take(count) {
      return this.slice(0, count);
    },
    takeWhile: function takeWhile(test) {
      var res = [];

      for (var i = 0; i < this.length; i++) {
        if (test(this[i])) {
          res.push(this[i]);
        } else {
          break;
        }
      }

      return res;
    },
    skip: function skip(count) {
      return this.slice(count);
    },
    skipWhile: function skipWhile(test) {
      var res = [];

      for (var i = 0; i < this.length; i++) {
        if (!test(this[i])) {
          res = this.slice(i);
          break;
        }
      }

      return res;
    },
    firstWhere: function firstWhere(test) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          orElse = _ref3.orElse;

      var res = this.find(test);

      if (!res) {
        if (orElse) {
          return orElse();
        } else {
          throw "StateError";
        }
      } else {
        return res;
      }
    },
    lastWhere: function lastWhere(test) {
      var _ref4 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          orElse = _ref4.orElse;

      for (var i = this.length - 1; i >= 0; i--) {
        if (test(this[i])) {
          return this[i];
        }
      }

      if (orElse) {
        return orElse();
      } else {
        throw "StateError";
      }
    },
    singleWhere: function singleWhere(test) {
      var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          orElse = _ref5.orElse;

      var res = this.filter(test);

      if (res && res.length == 1) {
        return res[0];
      } else {
        if (orElse) {
          return orElse();
        } else {
          throw "StateError";
        }
      }
    },
    elementAt: function elementAt(index) {
      if (index < 0 || index >= this.length) {
        throw "Error";
      }

      return this[index];
    },
    toString: function toString() {
      throw "NotImplemented: toString";
    }
  }, {
    single: {
      get: function get() {
        if (this.length == 1) {
          return this[0];
        } else {
          throw "StateError";
        }
      }
    },
    isEmpty: {
      get: function get() {
        return !this.length;
      }
    },
    isNotEmpty: {
      get: function get() {
        return !this.isEmpty;
      }
    }
  });
  global.Iterable = Iterable;
})();

(function () {
  var __global__ = global;

  function DateTime() {
    var inner = DateTime.__inner__;

    if (this == __global__) {
      return new DateTime({
        __args__: arguments
      });
    } else {
      var args = arguments.length > 0 ? arguments[0].__args__ || arguments : [];
      inner.apply(this, args);
      DateTime.prototype.ctor.apply(this, args);
      return this;
    }
  }

  DateTime.__inner__ = function inner() {
    Object.defineProperties(this, {
      millisecondsSinceEpoch: {
        get: function get() {
          return +this.__date__;
        }
      },
      microsecondsSinceEpoch: {
        get: function get() {
          return this.millisecondsSinceEpoch * 1000;
        }
      },
      timeZoneName: {
        get: function get() {
          throw "Not Implemented: timeZoneName";
        }
      },
      timeZoneOffset: {
        get: function get() {
          return this.__date__.getTimezoneOffset();
        }
      },
      year: {
        get: function get() {
          return this.__date__.getFullYear();
        }
      },
      month: {
        get: function get() {
          return this.__date__.getMonth() + 1;
        }
      },
      day: {
        get: function get() {
          return this.__date__.getDate();
        }
      },
      hour: {
        get: function get() {
          return this.__date__.getHours();
        }
      },
      minute: {
        get: function get() {
          return this.__date__.getMinutes();
        }
      },
      second: {
        get: function get() {
          return this.__date__.getSeconds();
        }
      },
      millisecond: {
        get: function get() {
          return this.__date__.getMilliseconds();
        }
      },
      microsecond: {
        get: function get() {
          return 0; // TODO: not supported
        }
      },
      weekday: {
        get: function get() {
          var res = this.__date__.getDay();

          return !res ? DateTime.sunday : res;
        }
      },
      hashCode: {
        get: function get() {
          var val = +this.__date__;
          return (val ^ val >> 30) & 0x3fffffff;
        }
      }
    });
    this.isUtc = null;
    this.__date__ = null;
  };

  function _fourDigits(n) {
    var absN = Math.abs(n);
    var sign = n < 0 ? "-" : "";
    if (absN >= 1000) return "".concat(n);
    if (absN >= 100) return "".concat(sign, "0").concat(absN);
    if (absN >= 10) return "".concat(sign, "00").concat(absN);
    return "".concat(sign, "000").concat(absN);
  }

  function _sixDigits(n) {
    var absN = Math.abs(n);
    var sign = n < 0 ? "-" : "+";
    if (absN >= 100000) return "".concat(sign).concat(absN);
    return "".concat(sign, "0").concat(absN);
  }

  function _threeDigits(n) {
    if (n >= 100) return "".concat(n);
    if (n >= 10) return "0".concat(n);
    return "00".concat(n);
  }

  function _twoDigits(n) {
    if (n >= 10) return "".concat(n);
    return "0".concat(n);
  }

  DateTime.prototype = {
    ctor: function ctor(year) {
      var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
      var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
      var hour = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
      var minute = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
      var second = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
      var millisecond = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
      var microsecond = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
      this.__date__ = new Date(year, month - 1, day, hour, minute, second, millisecond);
      this.isUtc = false;
    },
    __op_eq__: function __op_eq__(other) {},
    isBefore: function isBefore(other) {
      return this.__date__ < other.__date__;
    },
    isAfter: function isAfter(other) {
      return this.__date__ > other.__date__;
    },
    isAtSameMomentAs: function isAtSameMomentAs(other) {
      return this.__date__ == other.__date__;
    },
    compareTo: function compareTo(other) {
      if (this.isBefore(other)) {
        return -1;
      } else if (this.isAfter(other)) {
        return 1;
      } else {
        return 0;
      }
    },
    toLocal: function toLocal() {
      var res = new DateTime();

      if (!this.isUtc) {
        res.__date__ = this.__date__;
      } else {
        // TODO: 默认本地为中国时区
        res.__date__ = new Date(this.__date__ + 8 * 3600 * 1000);
      }

      return res;
    },
    toUtc: function toUtc() {
      var res = new DateTime();
      res.isUtc = true;

      if (this.isUtc) {
        res.__date__ = this.__date__;
      } else {
        // TODO: 默认本地为中国时区
        res.__date__ = new Date(this.__date__ - 8 * 3600 * 1000);
      }

      return res;
    },
    toString: function toString() {
      var __thiz__ = this;

      var y = _fourDigits(__thiz__.year);

      var d = _twoDigits(__thiz__.day);

      var m = _twoDigits(__thiz__.month);

      var h = _twoDigits(__thiz__.hour);

      var min = _twoDigits(__thiz__.minute);

      var sec = _twoDigits(__thiz__.second);

      var ms = _threeDigits(__thiz__.millisecond);

      var us = __thiz__.microsecond == 0 ? "" : _threeDigits(__thiz__.microsecond);

      if (__thiz__.isUtc) {
        return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(h, ":").concat(min, ":").concat(sec, ".").concat(ms).concat(us, "Z");
      } else {
        return "".concat(y, "-").concat(m, "-").concat(d, " ").concat(h, ":").concat(min, ":").concat(sec, ".").concat(ms).concat(us);
      }
    },
    toIso8601String: function toIso8601String() {
      var __thiz__ = this;

      var y = __thiz__.year >= -9999 && __thiz__.year <= 9999 ? _fourDigits(__thiz__.year) : _sixDigits(__thiz__.year);

      var m = _twoDigits(__thiz__.month);

      var d = _twoDigits(__thiz__.day);

      var h = _twoDigits(__thiz__.hour);

      var min = _twoDigits(__thiz__.minute);

      var sec = _twoDigits(__thiz__.second);

      var ms = _threeDigits(__thiz__.millisecond);

      var us = __thiz__.microsecond == 0 ? "" : _threeDigits(__thiz__.microsecond);

      if (__thiz__.isUtc) {
        return "".concat(y, "-").concat(m, "-").concat(d, "T").concat(h, ":").concat(min, ":").concat(sec, ".").concat(ms).concat(us, "Z");
      } else {
        return "".concat(y, "-").concat(m, "-").concat(d, "T").concat(h, ":").concat(min, ":").concat(sec, ".").concat(ms).concat(us);
      }
    },
    add: function add(duration) {
      var res = new DateTime();
      res.__date__ = new Date(+this.__date__.valueOf() + duration.inMilliseconds);
      return res;
    },
    subtract: function subtract(duration) {
      var res = new DateTime();
      res.__date__ = new Date(this.__date__ - duration.inMilliseconds);
      return res;
    },
    difference: function difference(other) {
      return Duration({
        milliseconds: this.__date__ - other.__date__
      });
    }
  };
  Object.assign(DateTime, {
    monday: 1,
    tuesday: 2,
    wednesday: 3,
    thursday: 4,
    friday: 5,
    saturday: 6,
    sunday: 7,
    daysPerWeek: 7,
    january: 1,
    february: 2,
    march: 3,
    april: 4,
    may: 5,
    june: 6,
    july: 7,
    august: 8,
    september: 9,
    october: 10,
    november: 11,
    december: 12,
    monthsPerYear: 12
  });

  DateTime.utc = function (year) {
    var month = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 1;
    var day = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 1;
    var hour = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;
    var minute = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var second = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 0;
    var millisecond = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : 0;
    var microsecond = arguments.length > 7 && arguments[7] !== undefined ? arguments[7] : 0;
    this.__date__ = new Date(year, month - 1, day, hour, minute, second, millisecond);
    this.isUtc = true;
  };

  DateTime.now = function () {
    var res = new DateTime();
    res.__date__ = new Date();
    return res;
  };

  DateTime.parse = function (formattedString) {
    var re = /^([+-]?\d{4,6})-?(\d\d)-?(\d\d)(?:[ T](\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d+))?)?)?( ?[zZ]| ?([-+])(\d\d)(?::?(\d\d))?)?)?$/;
    var match = formattedString.match(re);

    if (match != null) {
      var parseIntOrZero = function parseIntOrZero(matched) {
        if (matched == null) return 0;
        return int.parse(matched);
      }; // Parses fractional second digits of '.(\d+)' into the combined
      // microseconds. We only use the first 6 digits because of DateTime
      // precision of 999 milliseconds and 999 microseconds.


      var parseMilliAndMicroseconds = function parseMilliAndMicroseconds(matched) {
        if (matched == null) return 0;
        var length = matched.length;
        assert(length >= 1);
        var result = 0;

        for (var i = 0; i < 6; i++) {
          result *= 10;

          if (i < matched.length) {
            result += matched.codePointAt(i) ^ 0x30;
          }
        }

        return result;
      };

      var years = int.parse(match[1]);
      var month = int.parse(match[2]);
      var day = int.parse(match[3]);
      var hour = parseIntOrZero(match[4]);
      var minute = parseIntOrZero(match[5]);
      var second = parseIntOrZero(match[6]);
      var milliAndMicroseconds = parseMilliAndMicroseconds(match[7]);
      var millisecond = milliAndMicroseconds / Duration.microsecondsPerMillisecond >> 0;
      var microsecond = milliAndMicroseconds % Duration.microsecondsPerMillisecond;
      var isUtc = false;

      if (match[8] != null) {
        // timezone part
        isUtc = true;
        var tzSign = match[9];

        if (tzSign != null) {
          // timezone other than 'Z' and 'z'.
          var sign = tzSign == "-" ? -1 : 1;
          var hourDifference = int.parse(match[10]);
          var minuteDifference = parseIntOrZero(match[11]);
          minuteDifference += 60 * hourDifference;
          minute -= sign * minuteDifference;
        }
      }

      var res = DateTime(years, month, day, hour, minute, second, millisecond, microsecond);
      res.isUtc = isUtc;
      return res;
    } else {
      throw "Invalid date format" + formattedString;
    }
  };

  DateTime.tryParse = function (formattedString) {
    try {
      return DateTime.parse(formattedString);
    } catch (err) {
      return null;
    }
  };

  DateTime.fromMillisecondsSinceEpoch = function (millisecondsSinceEpoch) {
    var _ref6 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref6$isUtc = _ref6.isUtc,
        isUtc = _ref6$isUtc === void 0 ? false : _ref6$isUtc;

    var res = new DateTime();
    res.__date__ = new Date(millisecondsSinceEpoch);
    res.isUtc = isUtc;
  };

  DateTime.fromMicrosecondsSinceEpoch = function (microsecondsSinceEpoch) {
    var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref7$isUtc = _ref7.isUtc,
        isUtc = _ref7$isUtc === void 0 ? false : _ref7$isUtc;

    return DateTime.fromMillisecondsSinceEpoch(microsecondsSinceEpoch / 1000 >> 0, isUtc);
  };

  global.DateTime = DateTime;
})();

(function () {
  // 仅支持list与list对象的交互
  // 不支持
  // 自定义Iterable对象
  // 不可变list
  var oldProto = Array.prototype;
  oldProto.__proto__ = Iterable.prototype;
  Array.prototype = Object.create(oldProto);
  Object.assign(Array.prototype, {
    cast: function cast() {
      return this;
    },
    __op_idx__: function __op_idx__(index) {
      return this[index];
    },
    __op_idxeq__: function __op_idxeq__(index, value) {
      this[index] = value;
    },
    add: function add(value) {
      this.push(value);
    },
    addAll: function addAll(iterable) {
      var _this2 = this;

      iterable.forEach(function (item) {
        return _this2.push(item);
      });
    },
    shuffle: function shuffle(random) {
      throw "Not Implemented: shuffle";
    },
    // indexOf / lastIndexOf / length
    indexWhere: function indexWhere(test) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;

      for (var i = start; i < this.length; i++) {
        if (test(this[i])) {
          return i;
        }
      }

      return -1;
    },
    lastIndexWhere: function lastIndexWhere(test, start) {
      if (start === undefined) {
        start = this.length - 1;
      }

      for (var i = start; i >= 0; i++) {
        if (test(this[i])) {
          return i;
        }
      }

      return -1;
    },
    clear: function clear() {
      this.length = 0;
    },
    insert: function insert(index, element) {
      this.splice(index, 0, element);
    },
    insertAll: function insertAll(index, iterable) {
      var args = [index, 0].concat(iterable);
      this.splice.apply(this, args);
    },
    setAll: function setAll(index, iterable) {
      if (index < 0 || index > this.length || index + iterable.length > this.length) {
        throw "error";
      }

      for (var i = index, j = 0; i < this.length && j < iterable.length; i++, j++) {
        this[i] = iterable[j];
      }
    },
    remove: function remove(value) {
      var idx = this.indexOf(value);

      if (idx > -1) {
        this.splice(idx, 1);
        return true;
      } else {
        return false;
      }
    },
    removeAt: function removeAt(index) {
      this.splice(index, 1);
    },
    removeLast: function removeLast() {
      this.length = this.length - 1;
    },
    removeWhere: function removeWhere(test) {
      var i = 0;

      while (i < this.length) {
        if (test(this[i])) {
          this.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    retainWhere: function retainWhere(test) {
      var i = 0;

      while (i < this.length) {
        if (!test(this[i])) {
          this.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    __op_add__: function __op_add__(other) {
      return this.concat(other);
    },
    sublist: function sublist(start, end) {
      return this.slice(start, end);
    },
    getRange: function getRange(start, end) {
      return this.slice(start, end);
    },
    setRange: function setRange(start, end, iterable) {
      var skipCount = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

      if (start < 0 || start >= this.length || end < 0 || end >= this.length || start >= end) {
        throw "error";
      }

      var length = end - start;

      if (skipCount + length >= iterable.length) {
        throw "error";
      }

      for (var i = end - 1, j = skipCount + length - 1; i >= start; i--, j--) {
        this[i] = iterable[j];
      }
    },
    removeRange: function removeRange(start, end) {
      if (start < 0 || start >= this.length || end < 0 || end >= this.length || start >= end) {
        throw "error";
      }

      while (start < end) {
        this.splice(start, 1);
        end--;
      }
    },
    fillRange: function fillRange(start, end, fillValue) {
      if (start < 0 || start >= this.length || end < 0 || end >= this.length) {
        throw "error";
      }

      while (start < end) {
        this[start] = fillValue || null;
        start++;
      }
    },
    replaceRange: function replaceRange(start, end, replacement) {
      if (start < 0 || start >= this.length || end < 0 || end >= this.length || start >= end) {
        throw "error";
      }

      this.removeRange(start, end);
      this.insertAll(start, replacement);
    },
    asMap: function asMap() {
      var res = {};

      for (var i = 0; i < this.length; i++) {
        res[i] = this[i];
      }

      return res;
    }
  });
  Object.defineProperties(Array.prototype, {
    // length
    first: {
      set: function set(value) {
        this[0] = value;
      },
      get: function get() {
        return this[0];
      }
    },
    last: {
      set: function set(value) {
        this[this.length - 1] = value;
      },
      get: function get() {
        return this[this.length - 1];
      }
    },
    reversed: {
      get: function get() {
        return this.slice(0).reverse();
      }
    }
  });

  Array.filled = function (length, fill) {
    var _ref8 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref8$growable = _ref8.growable,
        growable = _ref8$growable === void 0 ? false : _ref8$growable;

    var res = new Array(length);

    for (var i = 0; i < length; i++) {
      res[i] = fill;
    }

    return res;
  };

  Array.empty = function () {
    var _ref9 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        _ref9$growable = _ref9.growable,
        growable = _ref9$growable === void 0 ? false : _ref9$growable;

    return [];
  };

  Array.from = function (elements) {
    var _ref10 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref10$growable = _ref10.growable,
        growable = _ref10$growable === void 0 ? true : _ref10$growable;

    return elements.slice(0);
  };

  Array.of = function (elements) {
    var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
        _ref11$growable = _ref11.growable,
        growable = _ref11$growable === void 0 ? true : _ref11$growable;

    return elements.slice(0);
  };

  Array.generate = function (length, generator) {
    var _ref12 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
        _ref12$growable = _ref12.growable,
        growable = _ref12$growable === void 0 ? true : _ref12$growable;

    var res = new Array(length);

    for (var i = 0; i < length; i++) {
      res[i] = generator(i);
    }

    return res;
  };

  Array.unmodifiable = function (elements) {
    return elements.slice(0);
  };

  Array.castFrom = function (source) {
    return source;
  };

  Array.copyRange = function (target, at, source, start, end) {
    if (!start) {
      start = 0;
    }

    if (end === undefined) {
      end = source.length;
    }

    var length = end - start;

    if (target.length < at + length) {
      throw "Not big enough to hold ".concat(length, " elements at position ").concat(at);
    }

    for (var i = length; --i >= 0;) {
      target[at + i] = source[start + i];
    }
  };

  Array.writeIterable = function (target, at, source) {
    target.setAll(at, source);
  };

  global.List = Array;
})();

(function () {
  var __global__ = global;

  function MapEntry() {
    var inner = MapEntry.__inner__;

    if (this == __global__) {
      return new MapEntry({
        __args__: arguments
      });
    } else {
      var args = arguments.length > 0 ? arguments[0].__args__ || arguments : [];
      inner.apply(this, args);
      MapEntry.prototype.ctor.apply(this, args);
      return this;
    }
  }

  MapEntry.__inner__ = function inner() {
    this.key = null;
    this.value = null;
  };

  MapEntry.prototype = {
    ctor: function ctor(key, value) {
      this.key = key;
      this.value = value;
    },
    toString: function toString() {
      return "MapEntry(".concat(key.toString(), ": ").concat(value.toString(), ")");
    }
  };
  global.MapEntry = MapEntry;
  var oldMapPrototype = {
    entries: Map.prototype.entries,
    keys: Map.prototype.keys,
    values: Map.prototype.values
  };
  Object.defineProperties(Map.prototype, {
    entries: {
      get: function get() {
        return Array.nativeFrom(oldMapPrototype.entries.call(this)).map(function (item) {
          return MapEntry(item[0], item[1]);
        });
      }
    },
    keys: {
      get: function get() {
        return Array.nativeFrom(oldMapPrototype.keys.call(this));
      }
    },
    values: {
      get: function get() {
        return Array.nativeFrom(oldMapPrototype.values.call(this));
      }
    },
    length: {
      get: function get() {
        return this.size;
      }
    },
    isEmpty: {
      get: function get() {
        return !this.size;
      }
    },
    isNotEmpty: {
      get: function get() {
        return !this.isEmpty;
      }
    }
  });
  Object.assign(Map.prototype, {
    cast: function cast() {
      return this;
    },
    __op_idx__: function __op_idx__(key) {
      return this.get(key);
    },
    __op_idxeq__: function __op_idxeq__(key, value) {
      this.set(key, value);
    },
    containsValue: function containsValue(value) {
      return this.values.includes(value);
    },
    containsKey: function containsKey(value) {
      return this.has(value);
    },
    map: function map(convert) {
      var res = new Map();
      this.forEach(function (key, value) {
        var entry = convert(key, value);
        res.set(entry.key, entry.value);
      });
      return res;
    },
    addEntries: function addEntries(newEntries) {
      for (var i = 0; i < newEntries.length; i++) {
        this.set(newEntries[i].key, newEntries[i].value);
      }
    },
    update: function update(key, _update) {
      var _ref13 = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {},
          ifAbsent = _ref13.ifAbsent;

      var newVal = null;

      if (this.has(key)) {
        newVal = _update(this.get(key));
        this.set(key, newVal);
      } else {
        if (ifAbsent) {
          newVal = ifAbsent();
          this.set(key, newVal);
        } else {
          throw "Error";
        }
      }

      return newVal;
    },
    updateAll: function updateAll(update) {
      var _this3 = this;

      this.keys.forEach(function (k) {
        _this3.set(k, update(k, _this3.get(k)));
      });
    },
    removeWhere: function removeWhere(test) {
      var i = 0;
      var keys = this.keys.slice(0);

      while (i < this.size) {
        if (test(keys[i], this.get(keys[i]))) {
          this.delete(keys[i]);
          keys.splice(i, 1);
        } else {
          i++;
        }
      }
    },
    putIfAbsent: function putIfAbsent(key, ifAbsent) {
      if (!this.has(key)) {
        this.set(key, ifAbsent());
      }

      return this.get(key);
    },
    addAll: function addAll(other) {
      var __thiz__ = this;

      other.forEach(function (key, value) {
        __thiz__.set(key, value);
      });
    },
    remove: function remove(key) {
      if (this.has(key)) {
        var res = this.get(key);
        this.delete(key);
        return res;
      }

      return null;
    },
    // clear
    forEach: function forEach(action) {
      this.entries.forEach(function (e) {
        return action(e.key, e.value);
      });
    }
  });

  Map.from = function (other) {
    var res = new Map();
    other.forEach(function (key, value) {
      return res.set(key, value);
    });
    return res;
  };

  Map.of = function (other) {
    return Map.from(other);
  };

  Map.unmodifiable = function (other) {
    return Map.from(other);
  };

  Map.identity = function () {
    throw "Not Implemented: identity";
  };

  Map.fromIterable = function (arg1, arg2) {
    if (args2.length) {
      var keys = arg1;
      var values = arg2;

      if (keys.length != values.length) {
        throw "Error";
      }

      var res = new Map();

      for (var i = 0; i < keys.length; i++) {
        res.set(keys[i], values[i]);
      }

      return res;
    } else {
      var iterable = arg1;
      var obj = arg2;

      var _res2 = new Map();

      for (var _i = 0; _i < iterable.length; _i++) {
        _res2.set(obj.key(iterable[_i]), obj.value(iterable[_i]));
      }

      return _res2;
    }
  };

  Map.fromEntries = function (entries) {
    var res = new Map();

    for (var i = 0; i < entries.length; i++) {
      res.set(entries[i].key, entries[i].value);
    }

    return res;
  };

  Map.castFrom = function (source) {
    return source;
  };
})();

(function () {
  Set.prototype.__proto__ = Iterable.prototype;
  Object.assign(Set.prototype, {
    cast: function cast() {
      return this;
    },
    contains: function contains(value) {
      return this.has(value);
    },
    // add / clear
    addAll: function addAll(elements) {
      var _this4 = this;

      elements.toList().forEach(function (elem) {
        return _this4.add(elem);
      });
    },
    remove: function remove(value) {
      return this.delete(value);
    },
    lookup: function lookup(object) {
      if (this.has(object)) {
        return object;
      }

      return null;
    },
    removeAll: function removeAll(elements) {
      var _this5 = this;

      elements.toList().forEach(function (elem) {
        return _this5.delete(elem);
      });
    },
    retainAll: function retainAll(elements) {
      var values = Array.nativeFrom(this.values());

      var _iterator = _createForOfIteratorHelper(values),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var v = _step.value;

          if (!elements.contains(v)) {
            this.delete(v);
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }
    },
    removeWhere: function removeWhere(test) {
      var values = Array.nativeFrom(this.values());

      var _iterator2 = _createForOfIteratorHelper(values),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var v = _step2.value;

          if (test(v)) {
            this.delete(v);
          }
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }
    },
    retainWhere: function retainWhere(test) {
      var values = Array.nativeFrom(this.values());

      var _iterator3 = _createForOfIteratorHelper(values),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var v = _step3.value;

          if (!test(v)) {
            this.delete(v);
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    },
    containsAll: function containsAll(other) {
      var arr = other.toList();

      var _iterator4 = _createForOfIteratorHelper(arr),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var v = _step4.value;

          if (!this.has(v)) {
            return false;
          }
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }

      return true;
    },
    intersection: function intersection(other) {
      var res = new Set();

      var _iterator5 = _createForOfIteratorHelper(other),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var v = _step5.value;

          if (this.has(v)) {
            res.add(v);
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }

      return res;
    },
    union: function union(other) {
      var res = new Set();
      res.addAll(this);
      res.addAll(other);
      return res;
    },
    difference: function difference(other) {
      var res = new Set();

      var _iterator6 = _createForOfIteratorHelper(this),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var v = _step6.value;

          if (!other.has(v)) {
            res.add(v);
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }

      return res;
    },
    toSet: function toSet() {
      var res = new Set();
      res.addAll(this);
      return res;
    }
  });
  Object.defineProperties(Set.prototype, {
    iterator: {
      get: function get() {
        throw "Not Implemented: iterator";
      }
    },
    __iterable__: {
      get: function get() {
        return Array.nativeFrom(this.values());
      }
    },
    length: {
      get: function get() {
        return this.size;
      }
    }
  });

  Set.identify = function () {};

  Set.from = function () {};

  Set.of = function () {};

  Set.unmodifiable = function () {};

  Set.castFrom = function () {};
})();

(function () {
  Object.defineProperties(Number.prototype, {
    // bitLength: {
    // },
    isEven: {
      get: function get() {
        return this % 2 == 0 ? true : false;
      }
    },
    isOdd: {
      get: function get() {
        return this % 2 == 0 ? false : true;
      }
    },
    sign: {
      get: function get() {
        // 符号 正数1、负数-1和0
        return this != 0 ? Math.abs(this) != this ? -1 : 1 : 0;
      }
    },
    // hashCode: {
    //     get: function(){
    //     }
    // },
    isFinite: {
      get: function get() {
        // 是否有限
        return isFinite(this);
      }
    },
    isInfinite: {
      get: function get() {
        // 是否无穷
        return !isFinite(this);
      }
    },
    isNaN: {
      get: function get() {
        // 是否NaN
        return isNaN(this);
      }
    },
    isNegative: {
      get: function get() {
        // 是否为负数
        return this < 0 ? true : false;
      }
    },
    runtimeType: {
      get: function get() {
        // 运行时的类型 ？？ 待定
        return _typeof(this);
      }
    }
  });

  Number.prototype.abs = function () {
    return Math.abs(this);
  };

  Number.prototype.ceil = function () {
    return Math.ceil(this);
  };

  Number.prototype.ceilToDouble = function () {
    return Math.ceil(this).toFixed(1);
  };

  Number.prototype.clamp = function (lowerLimit, upperLimit) {
    return this < lowerLimit ? lowerLimit : this > upperLimit ? upperLimit : Number(this);
  };

  Number.prototype.compareTo = function (other) {
    return this < other ? -1 : 1;
  };

  Number.prototype.floor = function () {
    // 向下取整
    return Math.floor(this);
  };

  Number.prototype.floorToDouble = function () {
    // 向下取整转浮点
    return Math.floor(this).toFixed(1);
  };

  Number.prototype.remainder = function (other) {
    // 取余
    return this % other;
  };

  Number.prototype.round = function () {
    // 四舍五入
    return Math.round(this);
  };

  Number.prototype.roundToDouble = function () {
    // 四舍五入转浮点
    return Math.round(this).toFixed(1);
  };

  Number.prototype.toDouble = function () {
    // 转浮点
    return this != Math.floor(this) ? Number(this) : this.toFixed(1);
  };

  Number.prototype.toInt = function () {
    // 取整数部分
    return parseInt(this);
  };

  Number.prototype.toStringAsExponential = function (n) {
    // 返回几次幂值的字符串(科学记数法)
    return this.toExponential(n);
  };

  Number.prototype.toStringAsFixed = function (n) {
    // 保留n位小数
    return this.toFixed(n);
  };

  Number.prototype.toStringAsPrecision = function (n) {
    // 保留几位小数后精确结果的字符串
    return this.toPrecision(n);
  };

  Number.prototype.truncate = function () {
    // 取整
    return parseInt(this);
  };

  Number.prototype.truncateToDouble = function () {
    // 取整返回浮点型
    return parseInt(this).toFixed(1);
  }; // 定义原始类型方法


  Number.parse = function (source) {
    // 只转整数，小数报错
    if (parseInt(source) == source) {
      return parseInt(source);
    } else {
      throw "FormatException: Invalid radix-10 number";
    }
  };

  Number.tryParse = function (source) {
    if (parseInt(source) == source) {
      return parseInt(source);
    } else {
      return null;
    }
  };

  global.Number = Number;
})();

(function () {
  var __global__ = global;
  var NativeRegExp = global.RegExp;

  function RegExp() {
    var inner = RegExp.__inner__;

    if (this == __global__) {
      return new RegExp({
        __args__: arguments
      });
    } else {
      var args = arguments.length > 0 ? arguments[0].__args__ || arguments : [];
      inner.apply(this, args);
      RegExp.prototype.ctor.apply(this, args);
      return this;
    }
  }

  RegExp.__inner__ = function inner() {
    Object.defineProperties(this, {
      pattern: {
        get: function get() {
          return this.__regex__.source;
        }
      },
      isMultiLine: {
        get: function get() {
          return this.__regex__.multiline;
        }
      },
      isCaseSensitive: {
        get: function get() {
          return this.__regex__.ignoreCase;
        }
      },
      isUnicode: {
        get: function get() {
          return this.__regex__.unicode;
        }
      },
      isDotAll: {
        get: function get() {
          return this.__regex__.dotAll;
        }
      }
    });
    this.__regex__ = null;
  };

  RegExp.prototype = {
    ctor: function ctor(source) {
      var _ref14 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref14$multiLine = _ref14.multiLine,
          multiLine = _ref14$multiLine === void 0 ? false : _ref14$multiLine,
          _ref14$caseSensitive = _ref14.caseSensitive,
          caseSensitive = _ref14$caseSensitive === void 0 ? true : _ref14$caseSensitive,
          _ref14$unicode = _ref14.unicode,
          unicode = _ref14$unicode === void 0 ? false : _ref14$unicode,
          _ref14$dotAll = _ref14.dotAll,
          dotAll = _ref14$dotAll === void 0 ? false : _ref14$dotAll;

      var flag = "g";

      if (multiLine) {
        flag += "m";
      }

      if (!caseSensitive) {
        flag += "i";
      }

      if (unicode) {
        flag += "u";
      }

      if (dotAll) {
        flag += "s";
      }

      this.__regex__ = new NativeRegExp(source, flag);
    },
    allMatches: function allMatches(string) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.__regex__.lastIndex = start;
      var matches = [];

      var m = this.__firstMatch__(string);

      while (m) {
        matches.push(m);
        m = this.__firstMatch__(string);
      }

      this.__regex__.lastIndex = 0;
      return !matches.length ? null : matches;
    },
    matchAsPrefix: function matchAsPrefix(string) {
      var start = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      this.__regex__.lastIndex = start;

      var res = this.__firstMatch__(string);

      this.__regex__.lastIndex = 0;
      return res;
    },
    firstMatch: function firstMatch(input) {
      this.__regex__.lastIndex = 0;

      var res = this.__firstMatch__(input);

      this.__regex__.lastIndex = 0;
      return res;
    },
    __firstMatch__: function __firstMatch__(input) {
      var res = this.__regex__.exec(input);

      if (!res || !res.length) {
        return null;
      }

      var start = res.index;
      var end = start + res[0].length;
      var groups = Array.prototype.slice.call(res, 0, res.length);
      var groupNames = res.groups ? Object.getOwnPropertyNames(res.groups) : [];
      var namedGroups = res.groups;
      return RegExpMatch(input, this, start, end, groups, groupNames, namedGroups);
    },
    hasMatch: function hasMatch(input) {
      var res = this.__regex__.test(input);

      this.__regex__.lastIndex = 0;
      return res;
    },
    stringMatch: function stringMatch(input) {
      var res = this.__regex__.exec(input);

      if (!res || !res.length) {
        return null;
      }

      this.__regex__.lastIndex = 0;
      return res[0];
    }
  };

  RegExp.escape = function (text) {
    return text.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&");
  };

  function RegExpMatch() {
    var inner = RegExpMatch.__inner__;

    if (this == __global__) {
      return new RegExpMatch({
        __args__: arguments
      });
    } else {
      var args = arguments.length > 0 ? arguments[0].__args__ || arguments : [];
      inner.apply(this, args);
      RegExpMatch.prototype.ctor.apply(this, args);
      return this;
    }
  }

  RegExpMatch.__inner__ = function inner() {
    Object.defineProperties(this, {
      start: {
        get: function get() {
          return this._start;
        }
      },
      end: {
        get: function get() {
          return this._end;
        }
      },
      groupNames: {
        get: function get() {
          return this._groupNames;
        }
      },
      groupCount: {
        get: function get() {
          return Math.max(this._groups.length - 1, 0);
        }
      },
      input: {
        get: function get() {
          return this._input;
        }
      },
      pattern: {
        get: function get() {
          return this._pattern;
        }
      }
    });
    this._start = null;
    this._end = null;
    this._input = null;
    this._pattern = null;
    this._groups = {};
    this._groupNames = [];
    this._namedGroups = {};
  };

  RegExpMatch.prototype = {
    ctor: function ctor(input, pattern, start, end, groups, groupNames, namedGroups) {
      this._start = start;
      this._end = end;
      this._input = input;
      this._pattern = pattern;
      this._groups = groups;
      this._groupNames = groupNames;
      this._namedGroups = namedGroups;
    },
    group: function group(_group) {
      return this._groups[_group];
    },
    __op_idx__: function __op_idx__(group) {
      return this.group(group);
    },
    groups: function groups(groupIndices) {
      var _this6 = this;

      return groupIndices.map(function (idx) {
        return _this6._groups[idx];
      });
    },
    namedGroup: function namedGroup(name) {
      return this._namedGroups[name];
    }
  };
  global.RegExp = RegExp;
})();

(function () {
  Object.defineProperties(String.prototype, {
    codeUnits: {
      get: function get() {
        var codeArr = [];
        var strArr = this.split("");

        for (var i = 0; i < strArr.length; i++) {
          codeArr.push(this.charCodeAt(i));
        }

        return codeArr;
      }
    },
    // hashCode: {
    //     get: function(){
    //     }
    // },
    isEmpty: {
      get: function get() {
        return !this.length;
      }
    },
    isNotEmpty: {
      get: function get() {
        return this.length;
      }
    },
    // runes: {
    //     get: function(){
    //     }
    // },
    runtimeType: {
      get: function get() {}
    }
  }); // String.prototype.allMatches = function(reg) {
  // }

  String.prototype.codeUnitAt = function (i) {
    // 返回索引处的ascii
    return this.charCodeAt(i);
  };

  String.prototype.compareTo = function (other) {
    // 依次对比指定索引字段在ascii中字符串值比较大小 0相等 1大于 -1小于
    for (var i = 0; i < this.length; i++) {
      if (this.charCodeAt(i) != other.charCodeAt(i)) {
        return this.charCodeAt(i) > other.charCodeAt(i) ? 1 : -1;
      } else {
        if (i == this.length - 1 && i == other.length - 1) {
          return 0;
        } else if (i == this.length - 1 && i != other.length - 1) {
          return -1;
        } else if (i != this.length - 1 && i == other.length - 1) {
          return 1;
        }

        continue;
      }
    }
  };

  String.prototype.contains = function (other) {
    // 是否包含
    return this.includes(other);
  }; // String.prototype.matchAsPrefix = function(string) {
  // }


  String.prototype.padLeft = function (width) {
    // 传入长度，从左侧填充空格
    return this.padStart(width, " ");
  };

  String.prototype.padRight = function (width) {
    // 传入长度，从右侧填充空格
    return this.padEnd(width, " ");
  };

  String.prototype.replaceAllMapped = function (from, replaceFn) {
    // 可传方法返回值替换指定字符串
    return this.replaceAll(from, replaceFn);
  };

  String.prototype.replaceFirst = function (from, replace) {
    // 替换第一个
    return this.replace(from, replace);
  };

  String.prototype.replaceFirstMapped = function (from, replaceFn) {
    // 替换第一个，可传function
    return this.replace(from, replaceFn);
  };

  String.prototype.replaceRange = function (start, end, replacement) {
    // 指定起始位置替换
    return this.substr(0, start) + replacement + this.substr(end, this.length);
  };

  String.prototype.splitMapJoin = function (pattern, onMatch, onNonMatch) {
    // 查询指定字符，用onMatch的返回值替换“，”用onNonMatch的返回值替换其他
    if (this.split(pattern).length == 1) {
      return onNonMatch() ? onNonMatch() : this;
    } else {
      var splitArrLen = this.split(pattern).length;
      var array = new Array(splitArrLen).fill(onNonMatch());
      return array.join(onMatch());
    }
  };

  global.String = String;
})();

// (function () {
//   BigInt.one = 1;
//   BigInt.two = 2;
//   BigInt.zero = 0;

//   BigInt.from = function (num) {
//     // 取整数部分
//     return parseInt(num);
//   };

//   BigInt.parse = function (str) {
//     // 只接受数字字符串，小数会报错
//     if (str.indexOf(".") == -1 && !isNaN(Number(str))) {
//       return BigInt(str);
//     } else {
//       throw "FormatException: Could not parse BigInt";
//     }
//   };

//   BigInt.tryParse = function (str) {
//     // 只接受数字字符串，小数会报错
//     if (str.indexOf(".") == -1 && !isNaN(Number(str))) {
//       return BigInt(str);
//     } else {
//       return null;
//     }
//   };

//   global.BigInt = BigInt;
// })();

(function () {
  var NativeSymbol = global.Symbol;

  function _Symbol(name) {
    // 不能返回Symbol自身会无限调用，只能返回字符串，但是Symbol(name)!=Symbol(name).toString()
    return NativeSymbol(name).toString();
  }

  _Symbol.empty = 'Symbol("")';
  _Symbol.unaryMinus = 'Symbol("unary-")';
  global.NativeSymbol = NativeSymbol;
  global.Symbol = _Symbol;
})();