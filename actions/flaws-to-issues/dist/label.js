"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function _regeneratorValues(e) { if (null != e) { var t = e["function" == typeof Symbol && Symbol.iterator || "@@iterator"], r = 0; if (t) return t.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) return { next: function next() { return e && r >= e.length && (e = void 0), { value: e && e[r++], done: !e }; } }; } throw new TypeError(_typeof(e) + " is not iterable"); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
// handle label creation and mgmt
//

var _require = require('@octokit/request'),
  request = _require.request;
var flawLabels = [{
  'name': 'VeracodeFlaw: Very High',
  'color': 'd92b85',
  'description': 'A Veracode Flaw, Very High severity',
  'severity': 5
}, {
  'name': 'VeracodeFlaw: High',
  'color': 'e61f25',
  'description': 'A Veracode Flaw, High severity',
  'severity': 4
}, {
  'name': 'VeracodeFlaw: Medium',
  'color': 'fd7333',
  'description': 'A Veracode Flaw, Medium severity',
  'severity': 3
}, {
  'name': 'VeracodeFlaw: Low',
  'color': 'ffcc33',
  'description': 'A Veracode Flaw, Low severity',
  'severity': 2
}, {
  'name': 'VeracodeFlaw: Very Low',
  'color': 'c9da2c',
  'description': 'A Veracode Flaw, Very Low severity',
  'severity': 1
}, {
  'name': 'VeracodeFlaw: Informational',
  'color': '8dbd3e',
  'description': 'A Veracode Flaw, Informational severity',
  'severity': 0
}];

// https://www.color-hex.com
var otherLabels = [{
  'id': 'pipeline',
  'name': 'Veracode Pipeline Scan',
  'color': '76a6b6',
  'description': 'A Veracode Flaw found during a Pipeline Scan'
}, {
  'id': 'policy',
  'name': 'Veracode Policy Scan',
  'color': '666698',
  'description': 'A Veracode Flaw found during a Policy or Sandbox Scan'
}];

// create the labels we need to tag issues with
function createLabels(_x) {
  return _createLabels.apply(this, arguments);
}
function _createLabels() {
  _createLabels = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(options) {
    var githubOwner, githubRepo, githubToken, authToken, _iterator, _step, _loop, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          githubOwner = options.githubOwner;
          githubRepo = options.githubRepo;
          githubToken = options.githubToken; // create label, accept error code if it already exists
          console.log('Creating VeracodeFlaw labels');
          authToken = 'Bearer ' + githubToken;
          _iterator = _createForOfIteratorHelper(flawLabels.concat(otherLabels));
          _context2.p = 1;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var element;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  element = _step.value;
                  _context.n = 1;
                  return request('POST /repos/{owner}/{repo}/labels', {
                    headers: {
                      authorization: authToken
                    },
                    owner: githubOwner,
                    repo: githubRepo,
                    data: {
                      "name": element.name,
                      "color": element.color,
                      "description": element.description
                    }
                  }).then(function (result) {
                    console.log("VeracodeFlaw label \"".concat(element.name, "\" successfully created, result: ").concat(result.status));
                  })["catch"](function (error) {
                    // 422 (Unprocessable Entity) = label exists
                    if (error.status == 422) {
                      console.warn("VeracodeFlaw label \"".concat(element.name, "\" probably exists, (Ignored error: ").concat(error.message, ")"));
                    } else {
                      throw new Error("Error ".concat(error.status, " creating VeracodeFlaw label \"").concat(element.name, "\": ").concat(error.message));
                    }
                  });
                case 1:
                  return _context.a(2);
              }
            }, _loop);
          });
          _iterator.s();
        case 2:
          if ((_step = _iterator.n()).done) {
            _context2.n = 4;
            break;
          }
          return _context2.d(_regeneratorValues(_loop()), 3);
        case 3:
          _context2.n = 2;
          break;
        case 4:
          _context2.n = 6;
          break;
        case 5:
          _context2.p = 5;
          _t = _context2.v;
          _iterator.e(_t);
        case 6:
          _context2.p = 6;
          _iterator.f();
          return _context2.f(6);
        case 7:
          return _context2.a(2);
      }
    }, _callee, null, [[1, 5, 6, 7]]);
  }));
  return _createLabels.apply(this, arguments);
}
var severityXref = new Map(); // for faster lookups, map severity # to text string

function buildSeverityXref() {
  flawLabels.forEach(function (element) {
    severityXref.set(element.severity, element.name);
  });
}
function severityToLabel(sevNumber) {
  return severityXref.get(sevNumber);
}

// function setupLabels(options) {
//     createLabels(options);

//     buildSeverityXref();
// }

module.exports = {
  flawLabels: flawLabels,
  otherLabels: otherLabels,
  createLabels: createLabels,
  buildSeverityXref: buildSeverityXref,
  severityToLabel: severityToLabel
};