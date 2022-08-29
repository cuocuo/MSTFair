function _slicedToArray(arr, i) {
  return (
    _arrayWithHoles(arr) ||
    _iterableToArrayLimit(arr, i) ||
    _unsupportedIterableToArray(arr, i) ||
    _nonIterableRest()
  );
}

function _nonIterableRest() {
  throw new TypeError(
    "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
  );
}

function _iterableToArrayLimit(arr, i) {
  var _i =
    arr == null
      ? null
      : (typeof Symbol !== "undefined" && arr[Symbol.iterator]) ||
        arr["@@iterator"];
  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _s, _e;
  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);
      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }
  return _arr;
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _createForOfIteratorHelper(o, allowArrayLike) {
  var it =
    (typeof Symbol !== "undefined" && o[Symbol.iterator]) || o["@@iterator"];
  if (!it) {
    if (
      Array.isArray(o) ||
      (it = _unsupportedIterableToArray(o)) ||
      (allowArrayLike && o && typeof o.length === "number")
    ) {
      if (it) o = it;
      var i = 0;
      var F = function F() {};
      return {
        s: F,
        n: function n() {
          if (i >= o.length) return { done: true };
          return { done: false, value: o[i++] };
        },
        e: function e(_e2) {
          throw _e2;
        },
        f: F
      };
    }
    throw new TypeError(
      "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
    );
  }
  var normalCompletion = true,
    didErr = false,
    err;
  return {
    s: function s() {
      it = it.call(o);
    },
    n: function n() {
      var step = it.next();
      normalCompletion = step.done;
      return step;
    },
    e: function e(_e3) {
      didErr = true;
      err = _e3;
    },
    f: function f() {
      try {
        if (!normalCompletion && it.return != null) it.return();
      } finally {
        if (didErr) throw err;
      }
    }
  };
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))
    return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;
  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }
  return arr2;
}

function _typeof(obj) {
  "@babel/helpers - typeof";
  return (
    (_typeof =
      "function" == typeof Symbol && "symbol" == typeof Symbol.iterator
        ? function (obj) {
            return typeof obj;
          }
        : function (obj) {
            return obj &&
              "function" == typeof Symbol &&
              obj.constructor === Symbol &&
              obj !== Symbol.prototype
              ? "symbol"
              : typeof obj;
          }),
    _typeof(obj)
  );
}

/*
 * 用户的基础js，一般情况不需要改动
 */
var GLOBAL = {};

function invokeJSFunc(parameter) {
  if (parameter === null) {
    return null;
  }

  var map = JSON.parse(parameter);

  if ("method" === map["type"]) {
    return _invokeMethod(map);
  } else if ("variable" === map["type"]) {
    return _invokeVariable(map);
  }

  return null;
}

function _invokeVariable(par) {
  console.log("_invokeVariable" + JSON.stringify(par));
  var pName = par["pageName"];
  var varMap = par["args"];
  var curPage = GLOBAL[pName];
  var callResult = {
    pageName: pName,
    result: {}
  };

  if (!isNull(varMap) && Object.keys(varMap).length > 0) {
    Object.keys(varMap).forEach(function (varKey) {
      callResult["result"][varKey] = eval("curPage." + varKey.toString());
    });
    return JSON.stringify(callResult);
  } //如果没有传参数，默认返回全部的变量以及结果值

  Object.keys(curPage).forEach(function (key) {
    if (!isFunc(curPage[key])) {
      callResult["result"][key] = eval("curPage." + key.toString());
    }
  });
  return JSON.stringify(callResult);
}

function _invokeMethod(par) {
  var pageName = par["pageName"];
  var funcName = par["args"]["funcName"];
  var args = par["args"]["args"];

  if ("getAllJSBindData" === funcName) {
    return getAllJSBindData(par);
  }

  if ("releaseJS" === funcName) {
    return _release(par);
  }

  var mClass = GLOBAL[pageName];
  var func = mClass[funcName];
  var methodResult;

  if (isNull(func)) {
    methodResult = "";
  } else {
    methodResult = func.apply(mClass, args);
  }

  var result = {
    pageName: pageName,
    result: {
      result: methodResult
    }
  };
  return JSON.stringify(result);
}

function _getAll(par) {
  var pageName = par["pageName"];
  var mc = GLOBAL[pageName];
  var bind = {};

  if (isNull(mc)) {
    return JSON.stringify(bind);
  }

  var bindFunc = [];
  var bindVariables = {};
  var keys;

  if (!isNull((keys = Object.keys(mc)))) {
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];

      if (!mc.hasOwnProperty(k)) {
        continue;
      }

      if (isFunc(mc[k])) {
        bindFunc.push(k);
      } else {
        bindVariables[k] = mc[k];
      }
    }
  }

  bind["func"] = bindFunc;
  bind["variable"] = bindVariables;
  return bind;
} //demo 获取所有的变量和绑定的方法

function getAllJSBindData(par) {
  var pageName = par["pageName"];

  var bind = _getAll(par);

  var result = {
    pageName: pageName,
    result: {
      result: bind
    }
  };
  return JSON.stringify(result);
}

function _release(par) {
  var pageName = par["pageName"];
  GLOBAL[pageName] = null;
  return null;
}

function isFunc(name) {
  return typeof name === "function";
}

function isNull(prop) {
  return (
    prop === null ||
    "undefined" === prop ||
    "undefined" === typeof prop ||
    undefined === _typeof(prop) ||
    "null" === prop
  );
}

function setState(pageName, obj) {
  console.log("JS:setState()_before" + pageName + "-" + obj);
  var p = {};
  p["funcName"] = "setState";
  p["pageName"] = pageName; // console.log('JS:setState(states)'+JSON.stringify(Object.getOwnPropertySymbols(obj)));

  obj();
  p["args"] = null;
  var map = JSON.stringify(p);
  console.log("JS:setState()" + map);
  invokeFlutterCommonChannel(map);
}

function mapOrSetToObject(arg) {
  if (Object.prototype.toString.call(arg) === "[object Map]") {
    var obj1 = {};

    var _iterator = _createForOfIteratorHelper(arg),
      _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done; ) {
        var _step$value = _slicedToArray(_step.value, 2),
          k = _step$value[0],
          v = _step$value[1];

        obj1[k] = mapOrSetToObject(v);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    return obj1;
  }

  if (Object.prototype.toString.call(arg) === "[object Array]") {
    var obj2 = [];

    var _iterator2 = _createForOfIteratorHelper(arg),
      _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done; ) {
        var _k = _step2.value;
        obj2.push(mapOrSetToObject(_k));
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    return obj2;
  }

  if (Object.prototype.toString.call(arg) === "[object Object]") {
    var keys = Object.getOwnPropertyNames(arg);
    var obj3 = {};

    var _iterator3 = _createForOfIteratorHelper(keys),
      _step3;

    try {
      for (_iterator3.s(); !(_step3 = _iterator3.n()).done; ) {
        var key = _step3.value;
        var value = arg[key];
        obj3[key] = mapOrSetToObject(value);
      }
    } catch (err) {
      _iterator3.e(err);
    } finally {
      _iterator3.f();
    }

    return obj3;
  }

  return arg;
}

var invokeFlutterCommonChannel = function invokeFlutterCommonChannel(
  invokeData,
  callback
) {
  console.log("invokeData" + invokeData);
  jsInvokeFlutterChannel(invokeData, function (resultStr) {
    console.log("resultStr" + resultStr);

    if (callback) {
      callback(resultStr);
    }
  });
};
