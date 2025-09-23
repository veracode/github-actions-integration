"use strict";

function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { if (r) i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n;else { var o = function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); }; o("next", 0), o("throw", 1), o("return", 2); } }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
//
// GitHub issue importer
//

var _require = require('@octokit/request'),
  request = _require.request;
var core = require('@actions/core');

// add the flaw to GitHub as an Issue
function addVeracodeIssue(_x, _x2) {
  return _addVeracodeIssue.apply(this, arguments);
}
function _addVeracodeIssue() {
  _addVeracodeIssue = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(options, issue) {
    var label, ApiError, githubOwner, githubRepo, githubToken, authToken;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          label = require('./label');
          ApiError = require('./util').ApiError;
          githubOwner = options.githubOwner;
          githubRepo = options.githubRepo;
          githubToken = options.githubToken;
          console.debug("Adding Issue for ".concat(issue.title));
          authToken = 'token ' + githubToken;
          _context2.n = 1;
          return request('POST /repos/{owner}/{repo}/issues', {
            headers: {
              authorization: authToken
            },
            owner: githubOwner,
            repo: githubRepo,
            data: {
              "title": issue.title,
              "labels": [label.severityToLabel(issue.severity), issue.label],
              "body": issue.body + "/nDon't know how to fix this? Don't know why this was reported?<br><a href=\"http://www.veracode.com\">Get Assistance from Veracode</a>"
            }
          }).then(/*#__PURE__*/function () {
            var _ref = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(result) {
              var issue_number;
              return _regenerator().w(function (_context) {
                while (1) switch (_context.n) {
                  case 0:
                    console.log("Issue successfully created, result: ".concat(result.status));
                    issue_number = result.data.number;
                    if (options.debug == "true") {
                      core.info('#### DEBUG START ####');
                      core.info('issues.js');
                      console.log("isPr?: " + options.isPR);
                      core.info('#### DEBUG END ####');
                    }
                    //        const mailToLink = buildMailToLink(
                    //            `https://github.com/${githubOwner}/${githubRepo}/issues/${issue_number}`,
                    //            issue.flaw
                    //        );
                    //        await request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                    //            headers: {
                    //                authorization: authToken
                    //            },
                    //            owner: githubOwner,
                    //            repo: githubRepo,
                    //            issue_number: issue_number,
                    //            data: {
                    //                "body": `Don't know how to fix this? Don't know why this was reported?<br>
                    //                <a href="${mailToLink}">Get Assistance from Veracode</a>`
                    //            }
                    //        });
                    if (!(issue.pr_link != "" && options.isPR >= 1)) {
                      _context.n = 1;
                      break;
                    }
                    console.log('Running on a PR, adding PR to the issue.');
                    //console.log('pr_link: '+issue.pr_link+'\nissue_number: '+issue_number)
                    _context.n = 1;
                    return request('POST /repos/{owner}/{repo}/issues/{issue_number}/comments', {
                      headers: {
                        authorization: authToken
                      },
                      owner: githubOwner,
                      repo: githubRepo,
                      issue_number: issue_number,
                      data: {
                        "body": issue.pr_link
                      }
                    });
                  case 1:
                    return _context.a(2, issue_number);
                }
              }, _callee);
            }));
            return function (_x3) {
              return _ref.apply(this, arguments);
            };
          }())["catch"](function (error) {
            // 403 possible rate-limit error
            if (error.status == 403 && error.message.indexOf('abuse detection') > 0) {
              console.warn("GitHub rate limiter tripped, ".concat(error.message));
              throw new ApiError('Rate Limiter tripped');
            } else {
              throw new Error("Error ".concat(error.status, " creating Issue for \"").concat(issue.title, "\": ").concat(error.message));
            }
          });
        case 1:
          return _context2.a(2);
      }
    }, _callee2);
  }));
  return _addVeracodeIssue.apply(this, arguments);
}
function buildMailToLink(issueUrl, flaw) {
  return 'mailto:support@veracode.com?subject=' + encodeURIComponent('[veracode/veracode-flaws-to-issues] Get Assistance') + '&body=' + encodeURIComponent("Hi,\n\nCould you please help me with: ".concat(issueUrl, ".\nA CWE-").concat(flaw.cwe.id, ": ").concat(flaw.cwe.name, " flaw reported on line ").concat(flaw.lineNumber, " of ").concat(flaw.file, " .\n\nI'd like help with:\n[ ] Understanding why this flaw was reported\n[ ] Fixing this flaw\n[ ] Other, namely: [[ please describe here ]]\n\nThank you."));
}
module.exports = {
  addVeracodeIssue: addVeracodeIssue
};