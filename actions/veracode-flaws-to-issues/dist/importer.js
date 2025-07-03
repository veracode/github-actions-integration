"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
// do the work of actually importing the flaws
// 

var fs = require('fs');
var core = require('@actions/core');
var processPipelineFlaws = require('./pipeline').processPipelineFlaws;
var processPolicyFlaws = require('./policy').processPolicyFlaws;
var label = require('./label');

//
// main driver to handle importing the flaws
//
function importFlaws(_x) {
  return _importFlaws.apply(this, arguments);
}
function _importFlaws() {
  _importFlaws = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(options) {
    var resultsFile, githubOwner, githubRepo, githubToken, waitTime, source_base_path_1, source_base_path_2, source_base_path_3, commit_hash, fail_build, isPR, debug, internal_flaw_count, flawData, flawCountFromFile, scanType, _t;
    return _regenerator().w(function (_context) {
      while (1) switch (_context.n) {
        case 0:
          resultsFile = options.resultsFile;
          githubOwner = options.githubOwner;
          githubRepo = options.githubRepo;
          githubToken = options.githubToken;
          waitTime = parseInt(options.waitTime);
          source_base_path_1 = options.source_base_path_1;
          source_base_path_2 = options.source_base_path_2;
          source_base_path_3 = options.source_base_path_3;
          commit_hash = options.commit_hash;
          fail_build = options.fail_build;
          isPR = options.isPR;
          debug = options.debug;
          internal_flaw_count = 0;
          if (!(resultsFile === undefined || resultsFile === null)) {
            _context.n = 1;
            break;
          }
          throw new Error('missing results file');
        case 1:
          if (!(githubOwner === undefined || githubOwner === null)) {
            _context.n = 2;
            break;
          }
          throw new Error('missing github owner');
        case 2:
          if (!(githubRepo === undefined || githubRepo === null)) {
            _context.n = 3;
            break;
          }
          throw new Error('missing github repo');
        case 3:
          if (!(githubToken === undefined || githubToken === null)) {
            _context.n = 4;
            break;
          }
          throw new Error('missing github token');
        case 4:
          _context.p = 4;
          if (!fs.existsSync(resultsFile)) {
            _context.n = 6;
            break;
          }
          console.log("Processing file: ".concat(resultsFile));
          flawData = JSON.parse(fs.readFileSync(resultsFile, 'utf8'));
          flawCountFromFile = flawData.length;
          if (!(flawCountFromFile == 0)) {
            _context.n = 5;
            break;
          }
          throw "No flaws found in file: ".concat(resultsFile);
        case 5:
          _context.n = 7;
          break;
        case 6:
          throw "Unable to locate scan results file: ".concat(resultsFile);
        case 7:
          _context.n = 9;
          break;
        case 8:
          _context.p = 8;
          _t = _context.v;
          throw new Error(_t);
        case 9:
          // figure out which file type we're dealing with, pipeline or policy
          scanType = '';
          if (!('pipeline_scan' in flawData)) {
            _context.n = 10;
            break;
          }
          scanType = 'pipeline';
          console.log('This is a pipeline scan');
          _context.n = 12;
          break;
        case 10:
          scanType = 'policy';
          console.log('This is a policy scan');
          if (!('_embedded' in flawData)) {
            _context.n = 11;
            break;
          }
          console.log('Flaws found to import!');
          _context.n = 12;
          break;
        case 11:
          console.log('No flaws found to import!');
          return _context.a(2);
        case 12:
          console.log("Importing ".concat(scanType, " flaws into  ").concat(githubOwner, "/").concat(githubRepo, ".  ").concat(waitTime, " seconds between imports (to handle GitHub rate limiting)"));

          // create the labels 
          _context.n = 13;
          return label.createLabels(options);
        case 13:
          label.buildSeverityXref(); // TODO: cleanup, merge into label init?

          // process the flaws
          if (!(scanType == 'pipeline')) {
            _context.n = 15;
            break;
          }
          _context.n = 14;
          return processPipelineFlaws(options, flawData).then(function (count) {
            internal_flaw_count = count;
            console.log("Done.  ".concat(count, " flaws processed."));
          });
        case 14:
          _context.n = 16;
          break;
        case 15:
          if (debug == "true") {
            core.info('#### DEBUG START ####');
            core.info('importer.js');
            console.log("isPr?: " + isPR);
            core.info('#### DEBUG END ####');
          }
          _context.n = 16;
          return processPolicyFlaws(options, flawData).then(function (count) {
            console.log("Done.  ".concat(count, " flaws processed."));
            internal_flaw_count = count;
          });
        case 16:
          // add break build functionality
          if (fail_build == "true") {
            if (internal_flaw_count > 0) {
              console.log('There are Veracode flaws found that require the build to fail, please review generated GitHub issues');
              core.setFailed('There are Veracode flaws found that require the build to fail, please review generated GitHub issues');
            }
          }
        case 17:
          return _context.a(2);
      }
    }, _callee, null, [[4, 8]]);
  }));
  return _importFlaws.apply(this, arguments);
}
module.exports = {
  importFlaws: importFlaws
};