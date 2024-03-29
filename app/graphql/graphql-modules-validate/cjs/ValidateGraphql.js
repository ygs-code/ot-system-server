/*! For license information please see ValidateGraphql.js.LICENSE.txt */

/* eslint-disable   */

!(function (e, t) {
  "object" === typeof exports && "object" === typeof module
    ? (module.exports = t())
    : "function" === typeof define && define.amd
    ? define([], t)
    : "object" === typeof exports
    ? (exports.ValidateGraphql = t())
    : (e.ValidateGraphql = t());
})(global, () =>
  (() => {
    var e = {
        228: (e) => {
          (e.exports = function (e, t) {
            (null == t || t > e.length) && (t = e.length);
            for (var r = 0, n = new Array(t); r < t; r++) {
              n[r] = e[r];
            }
            return n;
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        858: (e) => {
          (e.exports = function (e) {
            if (Array.isArray(e)) {
              return e;
            }
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        926: (e) => {
          function t(e, t, r, n, o, a, i) {
            try {
              var c = e[a](i),
                s = c.value;
            } catch (e) {
              return void r(e);
            }
            c.done ? t(s) : Promise.resolve(s).then(n, o);
          }
          (e.exports = function (e) {
            return function () {
              var r = this,
                n = arguments;
              return new Promise(function (o, a) {
                var i = e.apply(r, n);
                function c(e) {
                  t(i, o, a, c, s, "next", e);
                }
                function s(e) {
                  t(i, o, a, c, s, "throw", e);
                }
                c(void 0);
              });
            };
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        575: (e) => {
          (e.exports = function (e, t) {
            if (!(e instanceof t)) {
              throw new TypeError("Cannot call a class as a function");
            }
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        913: (e) => {
          function t(e, t) {
            for (var r = 0; r < t.length; r++) {
              var n = t[r];
              (n.enumerable = n.enumerable || !1),
                (n.configurable = !0),
                "value" in n && (n.writable = !0),
                Object.defineProperty(e, n.key, n);
            }
          }
          (e.exports = function (e, r, n) {
            return (
              r && t(e.prototype, r),
              n && t(e, n),
              Object.defineProperty(e, "prototype", { writable: !1 }),
              e
            );
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        713: (e) => {
          (e.exports = function (e, t, r) {
            return (
              t in e
                ? Object.defineProperty(e, t, {
                    value: r,
                    enumerable: !0,
                    configurable: !0,
                    writable: !0
                  })
                : (e[t] = r),
              e
            );
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        884: (e) => {
          (e.exports = function (e, t) {
            var r =
              null == e
                ? null
                : ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
                  e["@@iterator"];
            if (null != r) {
              var n,
                o,
                a = [],
                i = !0,
                c = !1;
              try {
                for (
                  r = r.call(e);
                  !(i = (n = r.next()).done) &&
                  (a.push(n.value), !t || a.length !== t);
                  i = !0
                ) {}
              } catch (e) {
                (c = !0), (o = e);
              } finally {
                try {
                  i || null == r.return || r.return();
                } finally {
                  if (c) {
                    throw o;
                  }
                }
              }
              return a;
            }
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        521: (e) => {
          (e.exports = function () {
            throw new TypeError(
              "Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        591: (e, t, r) => {
          var n = r(8).default;
          function o() {
            "use strict";
            (e.exports = o =
              function () {
                return t;
              }),
              (e.exports.__esModule = !0),
              (e.exports.default = e.exports);
            var t = {},
              r = Object.prototype,
              a = r.hasOwnProperty,
              i = "function" === typeof Symbol ? Symbol : {},
              c = i.iterator || "@@iterator",
              s = i.asyncIterator || "@@asyncIterator",
              u = i.toStringTag || "@@toStringTag";
            function l(e, t, r) {
              return (
                Object.defineProperty(e, t, {
                  value: r,
                  enumerable: !0,
                  configurable: !0,
                  writable: !0
                }),
                e[t]
              );
            }
            try {
              l({}, "");
            } catch (e) {
              l = function (e, t, r) {
                return (e[t] = r);
              };
            }
            function h(e, t, r, n) {
              var o = t && t.prototype instanceof p ? t : p,
                a = Object.create(o.prototype),
                i = new j(n || []);
              return (
                (a._invoke = (function (e, t, r) {
                  var n = "suspendedStart";
                  return function (o, a) {
                    if ("executing" === n) {
                      throw new Error("Generator is already running");
                    }
                    if ("completed" === n) {
                      if ("throw" === o) {
                        throw a;
                      }
                      return { value: void 0, done: !0 };
                    }
                    for (r.method = o, r.arg = a; ; ) {
                      var i = r.delegate;
                      if (i) {
                        var c = _(i, r);
                        if (c) {
                          if (c === f) {
                            continue;
                          }
                          return c;
                        }
                      }
                      if ("next" === r.method) {
                        r.sent = r._sent = r.arg;
                      } else if ("throw" === r.method) {
                        if ("suspendedStart" === n) {
                          throw ((n = "completed"), r.arg);
                        }
                        r.dispatchException(r.arg);
                      } else {
                        "return" === r.method && r.abrupt("return", r.arg);
                      }
                      n = "executing";
                      var s = d(e, t, r);
                      if ("normal" === s.type) {
                        if (
                          ((n = r.done ? "completed" : "suspendedYield"),
                          s.arg === f)
                        ) {
                          continue;
                        }
                        return { value: s.arg, done: r.done };
                      }
                      "throw" === s.type &&
                        ((n = "completed"),
                        (r.method = "throw"),
                        (r.arg = s.arg));
                    }
                  };
                })(e, r, i)),
                a
              );
            }
            function d(e, t, r) {
              try {
                return { type: "normal", arg: e.call(t, r) };
              } catch (e) {
                return { type: "throw", arg: e };
              }
            }
            t.wrap = h;
            var f = {};
            function p() {}
            function v() {}
            function m() {}
            var y = {};
            l(y, c, function () {
              return this;
            });
            var g = Object.getPrototypeOf,
              b = g && g(g(P([])));
            b && b !== r && a.call(b, c) && (y = b);
            var x = (m.prototype = p.prototype = Object.create(y));
            function S(e) {
              ["next", "throw", "return"].forEach(function (t) {
                l(e, t, function (e) {
                  return this._invoke(t, e);
                });
              });
            }
            function w(e, t) {
              function r(o, i, c, s) {
                var u = d(e[o], e, i);
                if ("throw" !== u.type) {
                  var l = u.arg,
                    h = l.value;
                  return h && "object" == n(h) && a.call(h, "__await")
                    ? t.resolve(h.__await).then(
                        function (e) {
                          r("next", e, c, s);
                        },
                        function (e) {
                          r("throw", e, c, s);
                        }
                      )
                    : t.resolve(h).then(
                        function (e) {
                          (l.value = e), c(l);
                        },
                        function (e) {
                          return r("throw", e, c, s);
                        }
                      );
                }
                s(u.arg);
              }
              var o;
              this._invoke = function (e, n) {
                function a() {
                  return new t(function (t, o) {
                    r(e, n, t, o);
                  });
                }
                return (o = o ? o.then(a, a) : a());
              };
            }
            function _(e, t) {
              var r = e.iterator[t.method];
              if (void 0 === r) {
                if (((t.delegate = null), "throw" === t.method)) {
                  if (
                    e.iterator.return &&
                    ((t.method = "return"),
                    (t.arg = void 0),
                    _(e, t),
                    "throw" === t.method)
                  ) {
                    return f;
                  }
                  (t.method = "throw"),
                    (t.arg = new TypeError(
                      "The iterator does not provide a 'throw' method"
                    ));
                }
                return f;
              }
              var n = d(r, e.iterator, t.arg);
              if ("throw" === n.type) {
                return (
                  (t.method = "throw"), (t.arg = n.arg), (t.delegate = null), f
                );
              }
              var o = n.arg;
              return o
                ? o.done
                  ? ((t[e.resultName] = o.value),
                    (t.next = e.nextLoc),
                    "return" !== t.method &&
                      ((t.method = "next"), (t.arg = void 0)),
                    (t.delegate = null),
                    f)
                  : o
                : ((t.method = "throw"),
                  (t.arg = new TypeError("iterator result is not an object")),
                  (t.delegate = null),
                  f);
            }
            function O(e) {
              var t = { tryLoc: e[0] };
              1 in e && (t.catchLoc = e[1]),
                2 in e && ((t.finallyLoc = e[2]), (t.afterLoc = e[3])),
                this.tryEntries.push(t);
            }
            function E(e) {
              var t = e.completion || {};
              (t.type = "normal"), delete t.arg, (e.completion = t);
            }
            function j(e) {
              (this.tryEntries = [{ tryLoc: "root" }]),
                e.forEach(O, this),
                this.reset(!0);
            }
            function P(e) {
              if (e) {
                var t = e[c];
                if (t) {
                  return t.call(e);
                }
                if ("function" === typeof e.next) {
                  return e;
                }
                if (!isNaN(e.length)) {
                  var r = -1,
                    n = function t() {
                      for (; ++r < e.length; ) {
                        if (a.call(e, r)) {
                          return (t.value = e[r]), (t.done = !1), t;
                        }
                      }
                      return (t.value = void 0), (t.done = !0), t;
                    };
                  return (n.next = n);
                }
              }
              return { next: M };
            }
            function M() {
              return { value: void 0, done: !0 };
            }
            return (
              (v.prototype = m),
              l(x, "constructor", m),
              l(m, "constructor", v),
              (v.displayName = l(m, u, "GeneratorFunction")),
              (t.isGeneratorFunction = function (e) {
                var t = "function" === typeof e && e.constructor;
                return (
                  !!t &&
                  (t === v || "GeneratorFunction" === (t.displayName || t.name))
                );
              }),
              (t.mark = function (e) {
                return (
                  Object.setPrototypeOf
                    ? Object.setPrototypeOf(e, m)
                    : ((e.__proto__ = m), l(e, u, "GeneratorFunction")),
                  (e.prototype = Object.create(x)),
                  e
                );
              }),
              (t.awrap = function (e) {
                return { __await: e };
              }),
              S(w.prototype),
              l(w.prototype, s, function () {
                return this;
              }),
              (t.AsyncIterator = w),
              (t.async = function (e, r, n, o, a) {
                void 0 === a && (a = Promise);
                var i = new w(h(e, r, n, o), a);
                return t.isGeneratorFunction(r)
                  ? i
                  : i.next().then(function (e) {
                      return e.done ? e.value : i.next();
                    });
              }),
              S(x),
              l(x, u, "Generator"),
              l(x, c, function () {
                return this;
              }),
              l(x, "toString", function () {
                return "[object Generator]";
              }),
              (t.keys = function (e) {
                var t = [];
                for (var r in e) {
                  t.push(r);
                }
                return (
                  t.reverse(),
                  function r() {
                    for (; t.length; ) {
                      var n = t.pop();
                      if (n in e) {
                        return (r.value = n), (r.done = !1), r;
                      }
                    }
                    return (r.done = !0), r;
                  }
                );
              }),
              (t.values = P),
              (j.prototype = {
                constructor: j,
                reset: function (e) {
                  if (
                    ((this.prev = 0),
                    (this.next = 0),
                    (this.sent = this._sent = void 0),
                    (this.done = !1),
                    (this.delegate = null),
                    (this.method = "next"),
                    (this.arg = void 0),
                    this.tryEntries.forEach(E),
                    !e)
                  ) {
                    for (var t in this) {
                      "t" === t.charAt(0) &&
                        a.call(this, t) &&
                        !isNaN(+t.slice(1)) &&
                        (this[t] = void 0);
                    }
                  }
                },
                stop: function () {
                  this.done = !0;
                  var e = this.tryEntries[0].completion;
                  if ("throw" === e.type) {
                    throw e.arg;
                  }
                  return this.rval;
                },
                dispatchException: function (e) {
                  if (this.done) {
                    throw e;
                  }
                  var t = this;
                  function r(r, n) {
                    return (
                      (i.type = "throw"),
                      (i.arg = e),
                      (t.next = r),
                      n && ((t.method = "next"), (t.arg = void 0)),
                      !!n
                    );
                  }
                  for (var n = this.tryEntries.length - 1; n >= 0; --n) {
                    var o = this.tryEntries[n],
                      i = o.completion;
                    if ("root" === o.tryLoc) {
                      return r("end");
                    }
                    if (o.tryLoc <= this.prev) {
                      var c = a.call(o, "catchLoc"),
                        s = a.call(o, "finallyLoc");
                      if (c && s) {
                        if (this.prev < o.catchLoc) {
                          return r(o.catchLoc, !0);
                        }
                        if (this.prev < o.finallyLoc) {
                          return r(o.finallyLoc);
                        }
                      } else if (c) {
                        if (this.prev < o.catchLoc) {
                          return r(o.catchLoc, !0);
                        }
                      } else {
                        if (!s) {
                          throw new Error(
                            "try statement without catch or finally"
                          );
                        }
                        if (this.prev < o.finallyLoc) {
                          return r(o.finallyLoc);
                        }
                      }
                    }
                  }
                },
                abrupt: function (e, t) {
                  for (var r = this.tryEntries.length - 1; r >= 0; --r) {
                    var n = this.tryEntries[r];
                    if (
                      n.tryLoc <= this.prev &&
                      a.call(n, "finallyLoc") &&
                      this.prev < n.finallyLoc
                    ) {
                      var o = n;
                      break;
                    }
                  }
                  o &&
                    ("break" === e || "continue" === e) &&
                    o.tryLoc <= t &&
                    t <= o.finallyLoc &&
                    (o = null);
                  var i = o ? o.completion : {};
                  return (
                    (i.type = e),
                    (i.arg = t),
                    o
                      ? ((this.method = "next"), (this.next = o.finallyLoc), f)
                      : this.complete(i)
                  );
                },
                complete: function (e, t) {
                  if ("throw" === e.type) {
                    throw e.arg;
                  }
                  return (
                    "break" === e.type || "continue" === e.type
                      ? (this.next = e.arg)
                      : "return" === e.type
                      ? ((this.rval = this.arg = e.arg),
                        (this.method = "return"),
                        (this.next = "end"))
                      : "normal" === e.type && t && (this.next = t),
                    f
                  );
                },
                finish: function (e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.finallyLoc === e) {
                      return this.complete(r.completion, r.afterLoc), E(r), f;
                    }
                  }
                },
                catch: function (e) {
                  for (var t = this.tryEntries.length - 1; t >= 0; --t) {
                    var r = this.tryEntries[t];
                    if (r.tryLoc === e) {
                      var n = r.completion;
                      if ("throw" === n.type) {
                        var o = n.arg;
                        E(r);
                      }
                      return o;
                    }
                  }
                  throw new Error("illegal catch attempt");
                },
                delegateYield: function (e, t, r) {
                  return (
                    (this.delegate = {
                      iterator: P(e),
                      resultName: t,
                      nextLoc: r
                    }),
                    "next" === this.method && (this.arg = void 0),
                    f
                  );
                }
              }),
              t
            );
          }
          (e.exports = o),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        38: (e, t, r) => {
          var n = r(858),
            o = r(884),
            a = r(379),
            i = r(521);
          (e.exports = function (e, t) {
            return n(e) || o(e, t) || a(e, t) || i();
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        8: (e) => {
          function t(r) {
            return (
              (e.exports = t =
                "function" === typeof Symbol &&
                "symbol" === typeof Symbol.iterator
                  ? function (e) {
                      return typeof e;
                    }
                  : function (e) {
                      return e &&
                        "function" === typeof Symbol &&
                        e.constructor === Symbol &&
                        e !== Symbol.prototype
                        ? "symbol"
                        : typeof e;
                    }),
              (e.exports.__esModule = !0),
              (e.exports.default = e.exports),
              t(r)
            );
          }
          (e.exports = t),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        379: (e, t, r) => {
          var n = r(228);
          (e.exports = function (e, t) {
            if (e) {
              if ("string" === typeof e) {
                return n(e, t);
              }
              var r = Object.prototype.toString.call(e).slice(8, -1);
              return (
                "Object" === r && e.constructor && (r = e.constructor.name),
                "Map" === r || "Set" === r
                  ? Array.from(e)
                  : "Arguments" === r ||
                    /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                  ? n(e, t)
                  : void 0
              );
            }
          }),
            (e.exports.__esModule = !0),
            (e.exports.default = e.exports);
        },
        757: (e, t, r) => {
          e.exports = r(591)();
        }
      },
      t = {};
    function r(n) {
      var o = t[n];
      if (void 0 !== o) {
        return o.exports;
      }
      var a = (t[n] = { exports: {} });
      return e[n](a, a.exports, r), a.exports;
    }
    (r.n = (e) => {
      var t = e && e.__esModule ? () => e.default : () => e;
      return r.d(t, { a: t }), t;
    }),
      (r.d = (e, t) => {
        for (var n in t) {
          r.o(t, n) &&
            !r.o(e, n) &&
            Object.defineProperty(e, n, { enumerable: !0, get: t[n] });
        }
      }),
      (r.o = (e, t) => Object.prototype.hasOwnProperty.call(e, t)),
      (r.r = (e) => {
        "undefined" !== typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(e, "__esModule", { value: !0 });
      });
    var n = {};
    return (
      (() => {
        "use strict";
        r.r(n), r.d(n, { default: () => E, validateGraphql: () => O });
        var e = r(926),
          t = r.n(e),
          o = r(38),
          a = r.n(o),
          i = r(713),
          c = r.n(i),
          s = r(575),
          u = r.n(s),
          l = r(913),
          h = r.n(l),
          d = r(757),
          f = r.n(d);
        const p = require("graphql-modules"),
          v = require("chalk");
        var m = r.n(v);
        const y = require("graphql"),
          g = {
            EN: {
              moduleID: "module ID",
              path: "path",
              andModule: "With the module ID",
              their: "their",
              duplicationName:
                "Duplicate name conflict occurred, please modify.",
              schemaVerified: "The server Schema is verified",
              errorMessage: "error message",
              serverSchemaVerification:
                "The server schema verification failed. Procedure",
              verifyClientSchemaPasses: "Verify that the client schema passes",
              validateClientFailed: "Failed to validate the client schema",
              serverClientSchemaVerified:
                "Both the server schema and client schema are verified",
              serverClientSchemaValidationFails:
                "The server schema and the client schema fail to be validated together",
              clientServerSchemaRequestParametersVerified:
                "The client Schema and request parameters are verified with the server Schema",
              canNotEmpty: "Can't be empty",
              clientServerSchemaRequestParametersVerifiedFailed:
                "The client Schema and request parameters failed to verify with the server's Schema"
            },
            "zh-CN": {
              moduleID: "模块ID",
              path: "路径",
              and: "与",
              their: "它们的",
              duplicationName: "发生重名冲突，请重新修改。",
              schemaVerified: "服务器schema验证通过",
              errorMessage: "错误信息",
              serverSchemaVerification: "服务器schema验证失败",
              validateClientFailed: "验证客户端schema失败",
              verifyClientSchemaPasses: "验证客户端schema通过",
              serverClientSchemaVerified:
                "服务端的schema和客户端的schema一起验证通过",
              serverClientSchemaValidationFails:
                "服务端的schema和客户端的schema一起验证失败",
              clientServerSchemaRequestParametersVerified:
                "客户端Schema和请求参数与服务器的Schema校验通过",
              canNotEmpty: "不能为空",
              clientServerSchemaRequestParametersVerifiedFailed:
                "客户端Schema和请求参数与服务器的Schema校验失败"
            }
          };
        function b(e, t) {
          var r = Object.keys(e);
          if (Object.getOwnPropertySymbols) {
            var n = Object.getOwnPropertySymbols(e);
            t &&
              (n = n.filter(function (t) {
                return Object.getOwnPropertyDescriptor(e, t).enumerable;
              })),
              r.push.apply(r, n);
          }
          return r;
        }
        function x(e) {
          for (var t = 1; t < arguments.length; t++) {
            var r = null != arguments[t] ? arguments[t] : {};
            t % 2
              ? b(Object(r), !0).forEach(function (t) {
                  c()(e, t, r[t]);
                })
              : Object.getOwnPropertyDescriptors
              ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(r))
              : b(Object(r)).forEach(function (t) {
                  Object.defineProperty(
                    e,
                    t,
                    Object.getOwnPropertyDescriptor(r, t)
                  );
                });
          }
          return e;
        }
        function S(e, t) {
          var r =
            ("undefined" !== typeof Symbol && e[Symbol.iterator]) ||
            e["@@iterator"];
          if (!r) {
            if (
              Array.isArray(e) ||
              (r = (function (e, t) {
                if (e) {
                  if ("string" === typeof e) {
                    return w(e, t);
                  }
                  var r = Object.prototype.toString.call(e).slice(8, -1);
                  return (
                    "Object" === r && e.constructor && (r = e.constructor.name),
                    "Map" === r || "Set" === r
                      ? Array.from(e)
                      : "Arguments" === r ||
                        /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)
                      ? w(e, t)
                      : void 0
                  );
                }
              })(e)) ||
              (t && e && "number" === typeof e.length)
            ) {
              r && (e = r);
              var n = 0,
                o = function () {};
              return {
                s: o,
                n: function () {
                  return n >= e.length
                    ? { done: !0 }
                    : { done: !1, value: e[n++] };
                },
                e: function (e) {
                  throw e;
                },
                f: o
              };
            }
            throw new TypeError(
              "Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."
            );
          }
          var a,
            i = !0,
            c = !1;
          return {
            s: function () {
              r = r.call(e);
            },
            n: function () {
              var e = r.next();
              return (i = e.done), e;
            },
            e: function (e) {
              (c = !0), (a = e);
            },
            f: function () {
              try {
                i || null == r.return || r.return();
              } finally {
                if (c) {
                  throw a;
                }
              }
            }
          };
        }
        function w(e, t) {
          (null == t || t > e.length) && (t = e.length);
          for (var r = 0, n = new Array(t); r < t; r++) {
            n[r] = e[r];
          }
          return n;
        }
        var _ = (function () {
            function e() {
              var r = this,
                n =
                  arguments.length > 0 && void 0 !== arguments[0]
                    ? arguments[0]
                    : {};
              u()(this, e),
                (this.validateResolvers = function () {
                  var e,
                    t = r.options,
                    n = t.modules,
                    o = void 0 === n ? [] : n,
                    i = (t.debug, []),
                    c = [],
                    s = S(o.entries());
                  try {
                    for (s.s(); !(e = s.n()).done; ) {
                      var u = a()(e.value, 2),
                        l = (u[0], u[1]),
                        h = l.id,
                        d = l.dirname,
                        f = l.typeDefs,
                        v = void 0 === f ? [] : f,
                        y = l.resolvers,
                        b = void 0 === y ? {} : y,
                        w = b.Mutation,
                        _ = void 0 === w ? {} : w,
                        O = b.Subscription,
                        E = void 0 === O ? {} : O,
                        j = b.Query,
                        P = void 0 === j ? {} : j,
                        M = {
                          id: h,
                          dirname: d,
                          typeDefs: v,
                          Mutation: [],
                          Subscription: [],
                          Query: []
                        },
                        L = function (e) {
                          if (_.hasOwnProperty(e)) {
                            var t = i.find(function (t) {
                              return t.Mutation.includes(e);
                            });
                            if (t) {
                              throw new Error(
                                m().red(
                                  ""
                                    .concat(g[lang].moduleID, ":")
                                    .concat(h, ",")
                                    .concat(g[lang].moduleID, ":")
                                    .concat(d)
                                    .concat(g[lang].and)
                                    .concat(g[lang].moduleID, ":")
                                    .concat(t.id, ",")
                                    .concat(g[lang].path, ":")
                                    .concat(t.dirname, "。")
                                    .concat(
                                      g[lang].their,
                                      "resolvers.Mutation."
                                    )
                                    .concat(e)
                                    .concat(g[lang].duplicationName, "。")
                                )
                              );
                            }
                            M.Mutation.push(e);
                          }
                        };
                      for (var V in _) {
                        L(V);
                      }
                      var C = function (e) {
                        if (P.hasOwnProperty(e)) {
                          var t = i.find(function (t) {
                            return t.Query.includes(e);
                          });
                          if (t) {
                            throw new Error(
                              m().red(
                                ""
                                  .concat(g[lang].moduleID, ":")
                                  .concat(h, ",")
                                  .concat(g[lang].path, ":")
                                  .concat(d)
                                  .concat(g[lang].and)
                                  .concat(g[lang].moduleID, ":")
                                  .concat(t.id, ",")
                                  .concat(g[lang].path, ":")
                                  .concat(t.dirname, "。中的resolvers.Query.")
                                  .concat(e)
                                  .concat(g[lang].duplicationName, "。")
                              )
                            );
                          }
                          M.Query.push(e);
                        }
                      };
                      for (var k in P) {
                        C(k);
                      }
                      var D = function (e) {
                        if (E.hasOwnProperty(e)) {
                          var t = i.find(function (t) {
                            return t.Subscription.includes(e);
                          });
                          if (t) {
                            throw new Error(
                              m().red(
                                ""
                                  .concat(g[lang].moduleID, ":")
                                  .concat(h, ",")
                                  .concat(g[lang].path, ":")
                                  .concat(d)
                                  .concat(g[lang].and)
                                  .concat(g[lang].moduleID, ":")
                                  .concat(t.id, ",")
                                  .concat(g[lang].path, ":")
                                  .concat(
                                    t.dirname,
                                    "。中的resolvers.Subscription."
                                  )
                                  .concat(e)
                                  .concat(g[lang].duplicationName, "。")
                              )
                            );
                          }
                          M.Subscription.push(e);
                        }
                      };
                      for (var I in E) {
                        D(I);
                      }
                      c.push((0, p.createModule)(r.validateSeverSchema(l))),
                        i.push(M);
                    }
                  } catch (e) {
                    s.e(e);
                  } finally {
                    s.f();
                  }
                  r.options = x(x({}, r.options), {}, { modules: c });
                }),
                (this.validateSeverSchema = function (e) {
                  var t = r.options,
                    n = (t.modules, t.lang),
                    o = t.debug,
                    a = e.typeDefs,
                    i = void 0 === a ? [] : a,
                    c = e.id,
                    s = e.dirname,
                    u =
                      "\n                    type Query {\n                        dummy: String\n                    }\n                    type Mutation {\n                        dummy: String\n                    }\n                    type Subscription {\n                        dummy: String\n                    }\n                    schema {\n                        query: Query\n                        mutation: Mutation\n                        subscription: Subscription\n                    }\n        ",
                    l = u + i.join(" ");
                  try {
                    var h = (0, y.validateSchema)((0, y.buildSchema)(l));
                    if (h.length > 0) {
                      throw h;
                    }
                    o &&
                      console.log(
                        m().rgb(
                          36,
                          114,
                          199
                        )(
                          ""
                            .concat(g[n].moduleID, ":")
                            .concat(c, ", ")
                            .concat(g[n].schemaVerified)
                        )
                      );
                  } catch (e) {
                    throw new Error(
                      m().red(
                        ""
                          .concat(g[n].serverSchemaVerification, ",")
                          .concat(g[n].errorMessage, ":\n")
                          .concat(e, "\n")
                          .concat(g[n].moduleID, ":")
                          .concat(c, ",")
                          .concat(g[n].path, ":")
                          .concat(s, " ")
                      )
                    );
                  }
                  return (
                    (e.typeDefs = i.map(function (e) {
                      return (0, p.gql)(u + e);
                    })),
                    e
                  );
                }),
                (this.validateSeverSchemas = function () {
                  r.validateResolvers();
                  var e = r.options,
                    t = e.lang,
                    n = e.modules,
                    o = void 0 === n ? [] : n,
                    a = e.serverSchema,
                    i = (a = void 0 === a ? {} : a).schema,
                    c = void 0 === i ? "" : i,
                    s = (a.resolvers, e.debug);
                  (r.application = (0, p.createApplication)({ modules: o })),
                    (r.executeFn = r.application.createExecution()),
                    (r.options = x(
                      x({}, r.options),
                      {},
                      {
                        serverSchema: x(
                          x({}, c),
                          {},
                          { schema: r.application.schema }
                        )
                      }
                    ));
                  try {
                    var u = (0, y.validateSchema)(r.application.schema);
                    if (u.length > 0) {
                      throw u;
                    }
                    s &&
                      console.log(
                        m().rgb(
                          36,
                          114,
                          199
                        )("modules application , ".concat(g[t].schemaVerified))
                      );
                  } catch (e) {
                    throw new Error(
                      m().red(
                        "".concat(g[t].serverSchemaVerification, ":\n") + e
                      )
                    );
                  }
                }),
                (this.validateClientSchema = t()(
                  f().mark(function e() {
                    var t,
                      n,
                      o,
                      a,
                      i,
                      c,
                      s,
                      u,
                      l,
                      h,
                      d = arguments;
                    return f().wrap(
                      function (e) {
                        for (;;) {
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((t =
                                  d.length > 0 && void 0 !== d[0] ? d[0] : {}),
                                (n = r.options),
                                (o = n.serverSchema),
                                (o = void 0 === o ? {} : o).schema,
                                o.resolvers,
                                (a = n.lang),
                                (i = n.debug),
                                (c = t.clientSchema),
                                (s = (c = void 0 === c ? {} : c).schema),
                                c.variables,
                                (u = c.operationName),
                                (l = null),
                                void 0 !== u)
                              ) {
                                e.next = 10;
                                break;
                              }
                              throw new Error(
                                m().red(
                                  ""
                                    .concat(
                                      g[a].validateClientFailed,
                                      ",operationName"
                                    )
                                    .concat(g[a].canNotEmpty)
                                )
                              );
                            case 10:
                              (h = new y.Source(s, "GraphQL request")),
                                (e.prev = 11),
                                (l = (0, y.parse)(h)),
                                i &&
                                  console.log(
                                    m().rgb(
                                      36,
                                      114,
                                      199
                                    )("".concat(g[a].verifyClientSchemaPasses))
                                  ),
                                (e.next = 19);
                              break;
                            case 16:
                              throw (
                                ((e.prev = 16),
                                (e.t0 = e.catch(11)),
                                new Error(
                                  m().red(
                                    "".concat(g[a].validateClientFailed, ":") +
                                      e.t0
                                  )
                                ))
                              );
                            case 19:
                              return e.abrupt("return", l);
                            case 20:
                            case "end":
                              return e.stop();
                          }
                        }
                      },
                      e,
                      null,
                      [[11, 16]]
                    );
                  })
                )),
                (this.validateSeverClientSchema = t()(
                  f().mark(function e() {
                    var t,
                      n,
                      o,
                      a,
                      i,
                      c,
                      s,
                      u,
                      l,
                      h,
                      d = arguments;
                    return f().wrap(
                      function (e) {
                        for (;;) {
                          switch ((e.prev = e.next)) {
                            case 0:
                              if (
                                ((t =
                                  d.length > 0 && void 0 !== d[0] ? d[0] : {}),
                                (n = r.options),
                                (o = n.serverSchema),
                                (a = (o = void 0 === o ? {} : o).schema),
                                (i = void 0 === a ? "" : a),
                                o.resolvers,
                                (c = n.lang),
                                (s = n.debug),
                                (u = t.clientSchema),
                                (u = void 0 === u ? {} : u).schema,
                                u.variables,
                                (l = t.documentAST),
                                (e.prev = 7),
                                !(
                                  (h = (0, y.validate)(i, l, y.specifiedRules))
                                    .length > 0
                                ))
                              ) {
                                e.next = 11;
                                break;
                              }
                              throw h;
                            case 11:
                              s &&
                                console.log(
                                  m().rgb(
                                    36,
                                    114,
                                    199
                                  )("".concat(g[c].serverClientSchemaVerified))
                                ),
                                (e.next = 17);
                              break;
                            case 14:
                              throw (
                                ((e.prev = 14),
                                (e.t0 = e.catch(7)),
                                new Error(
                                  m().red(
                                    "".concat(
                                      g[c].serverClientSchemaValidationFails,
                                      ":"
                                    ) + e.t0
                                  )
                                ))
                              );
                            case 17:
                            case "end":
                              return e.stop();
                          }
                        }
                      },
                      e,
                      null,
                      [[7, 14]]
                    );
                  })
                )),
                (this.validateGraphql = t()(
                  f().mark(function e() {
                    var t,
                      n,
                      o,
                      a,
                      i,
                      c,
                      s,
                      u,
                      l,
                      h,
                      d,
                      p,
                      v,
                      y,
                      b,
                      S,
                      w,
                      _,
                      O,
                      E,
                      j,
                      P,
                      M = arguments;
                    return f().wrap(
                      function (e) {
                        for (;;) {
                          switch ((e.prev = e.next)) {
                            case 0:
                              return (
                                (t =
                                  M.length > 0 && void 0 !== M[0] ? M[0] : {}),
                                (n = r.options),
                                (o = n.serverSchema),
                                (a = (o = void 0 === o ? {} : o).schema),
                                (i = void 0 === a ? "" : a),
                                o.resolvers,
                                (c = n.lang),
                                (s = n.debug),
                                (u = t.clientSchema),
                                (u = void 0 === u ? {} : u).schema,
                                (l = u.variables),
                                (h = void 0 === l ? {} : l),
                                (d = t.documentAST),
                                (p = t.returnFirst),
                                (v = void 0 !== p && p),
                                (y = t.context),
                                (b = void 0 === y ? {} : y),
                                (S = t.rootValue),
                                (w = void 0 === S ? {} : S),
                                (e.prev = 7),
                                (e.next = 10),
                                r.executeFn({
                                  schema: i,
                                  document: d,
                                  rootValue: w,
                                  contextValue: b,
                                  variableValues: h
                                })
                              );
                            case 10:
                              if (
                                ((_ = e.sent),
                                (O = _.errors),
                                (E = _.data),
                                (j = void 0 === E ? {} : E),
                                !O)
                              ) {
                                e.next = 14;
                                break;
                              }
                              throw O;
                            case 14:
                              return (
                                (P = Object.keys(j)),
                                s &&
                                  console.log(
                                    m().rgb(
                                      36,
                                      114,
                                      199
                                    )(
                                      "".concat(
                                        g[c]
                                          .clientServerSchemaRequestParametersVerified
                                      )
                                    )
                                  ),
                                e.abrupt("return", v ? x({}, j[P[0]]) : j)
                              );
                            case 19:
                              throw (
                                ((e.prev = 19),
                                (e.t0 = e.catch(7)),
                                new Error(
                                  m().red(
                                    "".concat(
                                      g[c]
                                        .clientServerSchemaRequestParametersVerifiedFailed,
                                      "errors:"
                                    ) + e.t0
                                  )
                                ))
                              );
                            case 22:
                            case "end":
                              return e.stop();
                          }
                        }
                      },
                      e,
                      null,
                      [[7, 19]]
                    );
                  })
                )),
                (this.options = x({ lang: "EN", debug: !0, modules: [] }, n));
            }
            var r;
            return (
              h()(e, [
                {
                  key: "init",
                  value:
                    ((r = t()(
                      f().mark(function e(t) {
                        var r, n, o;
                        return f().wrap(
                          function (e) {
                            for (;;) {
                              switch ((e.prev = e.next)) {
                                case 0:
                                  return (
                                    (r = t.clientSchema),
                                    this.validateSeverSchemas(),
                                    (e.next = 4),
                                    this.validateClientSchema({
                                      clientSchema: r
                                    })
                                  );
                                case 4:
                                  return (
                                    (n = e.sent),
                                    (e.next = 7),
                                    this.validateSeverClientSchema({
                                      documentAST: n,
                                      clientSchema: r
                                    })
                                  );
                                case 7:
                                  return (e.next = 9), this.ValidateGraphql(t);
                                case 9:
                                  return (o = e.sent), e.abrupt("return", o);
                                case 11:
                                case "end":
                                  return e.stop();
                              }
                            }
                          },
                          e,
                          this
                        );
                      })
                    )),
                    function (e) {
                      return r.apply(this, arguments);
                    })
                }
              ]),
              e
            );
          })(),
          O = function (e) {
            var r = e.modules,
              n = void 0 === r ? [] : r,
              o = e.lang,
              a = void 0 === o ? "EN" : o,
              i = e.debug,
              c = new _({ debug: void 0 === i || i, lang: a, modules: n });
            return (
              c.validateSeverSchemas(),
              (function () {
                var e = t()(
                  f().mark(function e(t) {
                    var r, n;
                    return f().wrap(function (e) {
                      for (;;) {
                        switch ((e.prev = e.next)) {
                          case 0:
                            return (
                              (r = t.clientSchema),
                              (e.next = 3),
                              c.validateClientSchema(t)
                            );
                          case 3:
                            return (
                              (n = e.sent),
                              (e.next = 6),
                              c.validateSeverClientSchema({
                                documentAST: n,
                                clientSchema: r
                              })
                            );
                          case 6:
                            return (
                              (e.next = 8),
                              c.validateGraphql(
                                x(x({}, t), {}, { documentAST: n })
                              )
                            );
                          case 8:
                            return e.abrupt("return", e.sent);
                          case 9:
                          case "end":
                            return e.stop();
                        }
                      }
                    }, e);
                  })
                );
                return function (t) {
                  return e.apply(this, arguments);
                };
              })()
            );
          };
        const E = _;
      })(),
      n
    );
  })()
);

/* eslint-enable   */
