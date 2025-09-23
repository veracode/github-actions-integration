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
// handle pipeline scan flaws
//

var _require = require('@octokit/request'),
  request = _require.request;
var label = require('./label');
var addVeracodeIssue = require('./issue').addVeracodeIssue;
var addVeracodeIssueComment = require('./issue_comment').addVeracodeIssueComment;
var fs = require('fs');
var path = require('path');

/* Map of files that contain flaws
 *  each entry is a struct of {CWE, line_number}  
 *  for some admittedly loose, fuzzy matching to prevent duplicate issues */
var flawFiles = new Map();
var existingFlawNumber = [];
var existingIssueState = [];
var pr_link;
function createVeracodeFlawID(flaw) {
  // [VID:CWE:filename:linenum]
  return '[VID:' + flaw.cwe_id + ':' + flaw.files.source_file.file + ':' + flaw.files.source_file.line + ']';
}

// given an Issue title, extract the FlawID string (for existing issues)
function getVeracodeFlawID(title) {
  var start = title.indexOf('[VID');
  if (start == -1) {
    return null;
  }
  var end = title.indexOf(']', start);
  return title.substring(start, end + 1);
}
function parseVeracodeFlawIDNum(vid) {
  var parts = vid.split(':');
  return {
    "prefix": parts[0],
    "flawNum": parts[1].substring(0, parts[1].length)
  };
}
function parseVeracodeFlawID(vid) {
  var parts = vid.split(':');
  return {
    "prefix": parts[0],
    "cwe": parts[1],
    "file": parts[2],
    "line": parts[3].substring(0, parts[3].length - 1)
  };
}
function addExistingFlawToMap(vid) {
  var flawInfo = parseVeracodeFlawID(vid);
  var flaw = {
    'cwe': flawInfo.cwe,
    'line': flawInfo.line
  };
  if (flawFiles.has(flawInfo.file)) {
    // already have some flaws in this file, so just add this specific flaw to the array
    var flaws = flawFiles.get(flawInfo.file);
    flaws.push(flaw);
  } else {
    // add this file into the map, with the fist of (possible) multiple flaws
    flawFiles.set(flawInfo.file, [flaw]);
  }
}
function issueExists(vid) {
  // same file and CWE, +/- 10 lines of code
  var flawInfo = parseVeracodeFlawID(vid);
  if (flawFiles.has(flawInfo.file)) {
    // check all the flaws in this file to see if we have a match
    for (i = 0; i < flawFiles.get(flawInfo.file).length; i++) {
      var existingFlaw = flawFiles.get(flawInfo.file)[i];

      // check CWE
      if (flawInfo.cwe == existingFlaw.cwe) {
        // check (+/- 10 lines)
        var newFlawLine = parseInt(flawInfo.line);
        var existingFlawLine = parseInt(existingFlaw.line);
        if (newFlawLine >= existingFlawLine - 10 && newFlawLine <= existingFlawLine + 10) {
          return true;
        }
      }
    }
  }
  return false;
}

// get existing Veracode-entered issues, to avoid dups
function getAllVeracodeIssues(_x) {
  return _getAllVeracodeIssues.apply(this, arguments);
}
function _getAllVeracodeIssues() {
  _getAllVeracodeIssues = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee(options) {
    var githubOwner, githubRepo, githubToken, authToken, _iterator, _step, _loop, _t;
    return _regenerator().w(function (_context2) {
      while (1) switch (_context2.n) {
        case 0:
          githubOwner = options.githubOwner;
          githubRepo = options.githubRepo;
          githubToken = options.githubToken;
          authToken = 'token ' + githubToken; // when searching for issues, the label list is AND-ed (all requested labels must exist for the issue),
          // so we need to loop through each severity level manually
          _iterator = _createForOfIteratorHelper(label.flawLabels);
          _context2.p = 1;
          _loop = /*#__PURE__*/_regenerator().m(function _loop() {
            var element, done, pageNum, uriSeverity, uriType, reqStr;
            return _regenerator().w(function (_context) {
              while (1) switch (_context.n) {
                case 0:
                  element = _step.value;
                  // get list of all flaws with the VeracodeFlaw label
                  console.log("Getting list of existing \"".concat(element.name, "\" issues"));
                  done = false;
                  pageNum = 1;
                  uriSeverity = encodeURIComponent(element.name);
                  uriType = encodeURIComponent(label.otherLabels.find(function (val) {
                    return val.id === 'pipeline';
                  }).name);
                  reqStr = "GET /repos/{owner}/{repo}/issues?labels=".concat(uriSeverity, ",").concat(uriType, "&state=open&page={page}"); //let reqStr = `GET /repos/{owner}/{repo}/issues?labels=${uriName},${uriType}&state=open&page={page}&per_page={pageMax}`
                case 1:
                  if (done) {
                    _context.n = 3;
                    break;
                  }
                  _context.n = 2;
                  return request(reqStr, {
                    headers: {
                      authorization: authToken
                    },
                    owner: githubOwner,
                    repo: githubRepo,
                    page: pageNum
                    //pageMax: 3
                  }).then(function (result) {
                    console.log("".concat(result.data.length, " flaw(s) found, (result code: ").concat(result.status, ")"));

                    // walk findings and populate VeracodeFlaws map
                    result.data.forEach(function (element) {
                      var flawID = getVeracodeFlawID(element.title);
                      var flawNum = parseVeracodeFlawIDNum(flawID).flawNum;
                      var arrayKey = parseInt(flawNum);
                      var issue_number = element.number;
                      var issueState = element.state;

                      // Map using VeracodeFlawID as index, for easy searching.  Line # for simple flaw matching
                      if (flawID === null) {
                        console.log("Flaw \"".concat(element.title, "\" has no Veracode Flaw ID, ignored."));
                      } else {
                        addExistingFlawToMap(flawID);
                        existingFlawNumber[flawID] = issue_number;
                        existingIssueState[flawID] = issueState;
                        //console.log('Exisiting Flaw Number: '+JSON.stringify(existingFlawNumber[flawID])+' - Exisiting Flaw State: '+JSON.stringify(existingIssueState[flawID]))
                      }
                    });

                    // check if we need to loop
                    // (if there is a link field in the headers, we have more than will fit into 1 query, so 
                    //  need to loop.  On the last query we'll still have the link, but the data will be empty)
                    if (result.headers.link !== undefined && result.data.length > 0) {
                      pageNum += 1;
                    } else done = true;
                  })["catch"](function (error) {
                    throw new Error("Error ".concat(error.status, " getting VeracodeFlaw issues: ").concat(error.message));
                  });
                case 2:
                  _context.n = 1;
                  break;
                case 3:
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
  return _getAllVeracodeIssues.apply(this, arguments);
}
function processPipelineFlaws(_x2, _x3) {
  return _processPipelineFlaws.apply(this, arguments);
}
function _processPipelineFlaws() {
  _processPipelineFlaws = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee2(options, flawData) {
    var util, waitTime, index, _loop2, filename;
    return _regenerator().w(function (_context4) {
      while (1) switch (_context4.n) {
        case 0:
          util = require('./util');
          waitTime = parseInt(options.waitTime); // get a list of all open VeracodeSecurity issues in the repo
          _context4.n = 1;
          return getAllVeracodeIssues(options);
        case 1:
          // walk through the list of flaws in the input file
          console.log("Processing input file: \"".concat(options.resultsFile, "\" with ").concat(flawData.findings.length, " flaws to process."));
          _loop2 = /*#__PURE__*/_regenerator().m(function _loop2() {
            var flaw, vid, flawNum, issue_number, issueState, issueComment, searchFile, currentDir, foundFilePath, title, lableBase, severity, bodyText, issue;
            return _regenerator().w(function (_context3) {
              while (1) switch (_context3.n) {
                case 0:
                  searchFile = function _searchFile(dir, filename) {
                    //console.log('Inside search: Directory: '+dir+' - Filename: '+filename)
                    var result = null;
                    var files = fs.readdirSync(dir);
                    var _iterator2 = _createForOfIteratorHelper(files),
                      _step2;
                    try {
                      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                        var file = _step2.value;
                        if (file === '.git') continue;
                        var fullPath = path.join(dir, file);
                        var stat = fs.statSync(fullPath);
                        if (stat.isDirectory()) {
                          result = searchFile(fullPath, filename);
                          if (result) break;
                        } else if (file === filename) {
                          console.log('File found: ' + fullPath);
                          result = fullPath;
                          break;
                        }
                      }
                      //console.log('Result: '+result)
                    } catch (err) {
                      _iterator2.e(err);
                    } finally {
                      _iterator2.f();
                    }
                    return result;
                  };
                  flaw = flawData.findings[index];
                  vid = createVeracodeFlawID(flaw);
                  flawNum = parseVeracodeFlawIDNum(vid).flawNum;
                  issue_number = existingFlawNumber[vid];
                  issueState = existingIssueState[vid];
                  console.debug("processing flaw ".concat(flaw.issue_id, ", VeracodeID: ").concat(vid, ", GitHub FlawID: ").concat(issue_number, ", GitHub Issue State: ").concat(issueState));

                  // check for duplicate
                  if (!issueExists(vid)) {
                    _context3.n = 4;
                    break;
                  }
                  console.log('Issue already exists, skipping import');
                  if (!(options.isPR >= 1 && issueState == "open")) {
                    _context3.n = 2;
                    break;
                  }
                  console.log('We are on a PR, need to link this issue to this PR');
                  pr_link = "Veracode issue link to PR: https://github.com/" + options.githubOwner + "/" + options.githubRepo + "/pull/" + options.pr_commentID;
                  //console.log('PR Link: '+pr_link+' - Issue number: '+issue_number)
                  issueComment = {
                    'issue_number': issue_number,
                    'pr_link': pr_link
                  };
                  _context3.n = 1;
                  return addVeracodeIssueComment(options, issueComment)["catch"](function (error) {
                    if (error instanceof util.ApiError) {
                      throw error;
                    } else {
                      //console.error(error.message);
                      throw error;
                    }
                  });
                case 1:
                  _context3.n = 3;
                  break;
                case 2:
                  console.log('GitHub issue is closed no need to update.');
                case 3:
                  return _context3.a(2, 1);
                case 4:
                  // Search for the file starting from the current directory
                  filename = flaw.files.source_file.file;
                  currentDir = process.cwd();
                  console.log('Current Directory: ' + currentDir);
                  console.log('Filename: ' + filename);
                  foundFilePath = searchFile(currentDir, path.basename(filename));
                  if (foundFilePath) {
                    //filepath = foundFilePath;
                    filepath = foundFilePath.replace(process.cwd(), '');
                    console.log('Adjusted Filepath: ' + filepath);
                  } else {
                    filepath = filename;
                    console.log('File not found in the current directory or its subdirectories.');
                  }

                  /* old rewrite path        
                  
                  
                          //rewrite path
                          function replacePath (rewrite, path){
                              replaceValues = rewrite.split(":")
                              console.log('rewrite: '+rewrite+' Value 1:'+replaceValues[0]+' Value 2: '+replaceValues[1]+' old path: '+path)
                              newPath = path.replace(replaceValues[0],replaceValues[1])
                              console.log('new Path:'+newPath)
                              return newPath
                          }
                  
                          filename = flaw.files.source_file.file
                          var filepath = filename
                  
                          if (options.source_base_path_1 || options.source_base_path_2 || options.source_base_path_3){
                              orgPath1 = options.source_base_path_1.split(":")
                              orgPath2 = options.source_base_path_2.split(":")
                              orgPath3 = options.source_base_path_3.split(":")
                              console.log('path1: '+orgPath1[0]+' path2: '+orgPath2[0]+' path3: '+orgPath3[0])
                  
                              if( filename.startsWith(orgPath1[0]) ){
                                  console.log('file path1: '+filename)
                                  filepath = replacePath(options.source_base_path_1, filename)
                              }
                              else if ( filename.startsWith(orgPath2[0]) ){
                                  console.log('file path2: '+filename)
                                  filepath = replacePath(options.source_base_path_2, filename)
                              }
                              else if ( filename.startsWith(orgPath3[0]) ){
                                  console.log('file path3: '+filename)
                                  filepath = replacePath(options.source_base_path_3, filename)
                              }
                              console.log('Filepath:'+filepath);
                          }
                  
                  old rewrite path */

                  linestart = eval(flaw.files.source_file.line - 5);
                  linened = eval(flaw.files.source_file.line + 5);
                  commit_path = "https://github.com/" + options.githubOwner + "/" + options.githubRepo + "/blob/" + options.commit_hash + "/" + filepath + "#L" + linestart + "-L" + linened;

                  //console.log('Full Path:'+commit_path)

                  // add to repo's Issues
                  // (in theory, we could do this w/o await-ing, but GitHub has rate throttling, so single-threading this helps)
                  title = "".concat(flaw.issue_type, " ") + createVeracodeFlawID(flaw);
                  lableBase = label.otherLabels.find(function (val) {
                    return val.id === 'pipeline';
                  }).name;
                  severity = flaw.severity;
                  if (options.isPR >= 1) {
                    pr_link = "Veracode issue link to PR: https://github.com/" + options.githubOwner + "/" + options.githubRepo + "/pull/" + options.pr_commentID;
                  }
                  console.log('pr_link: ' + pr_link);
                  bodyText = "".concat(commit_path);
                  bodyText += "\n\n**Filename:** ".concat(flaw.files.source_file.file);
                  bodyText += "\n\n**Line:** ".concat(flaw.files.source_file.line);
                  bodyText += "\n\n**CWE:** ".concat(flaw.cwe_id, " (").concat(flaw.issue_type, ")");
                  bodyText += '\n\n' + decodeURI(flaw.display_text);
                  issue = {
                    'flaw': {
                      'cwe': {
                        'id': flaw.cwe_id,
                        'name': flaw.issue_type
                      },
                      'lineNumber': flaw.files.source_file.line,
                      'file': flaw.files.source_file.file
                    },
                    'title': title,
                    'label': lableBase,
                    'severity': severity,
                    'body': bodyText,
                    'pr_link': pr_link
                  };
                  _context3.n = 5;
                  return addVeracodeIssue(options, issue)["catch"](function (error) {
                    if (error instanceof util.ApiError) {
                      // TODO: fall back, retry this same issue, continue process

                      // for now, only 1 case - rate limit tripped
                      //console.warn('Rate limiter tripped.  30 second delay and time between issues increased by 2 seconds.');
                      // await sleep(30000);
                      // waitTime += 2;

                      // // retry this same issue again, bail out if this fails
                      // await addVeracodeIssue(options, flaw)
                      // .catch( error => {
                      //     throw new Error(`Issue retry failed ${error.message}`);
                      // })

                      throw error;
                    } else {
                      //console.error(error.message);
                      throw error;
                    }
                  });
                case 5:
                  // progress counter for large flaw counts
                  if (index > 0 && index % 25 == 0) console.log("Processed ".concat(index, " flaws"));

                  // rate limiter, per GitHub: https://docs.github.com/en/rest/guides/best-practices-for-integrators
                  if (!(waitTime > 0)) {
                    _context3.n = 6;
                    break;
                  }
                  _context3.n = 6;
                  return util.sleep(waitTime * 1000);
                case 6:
                  return _context3.a(2);
              }
            }, _loop2);
          });
          index = 0;
        case 2:
          if (!(index < flawData.findings.length)) {
            _context4.n = 5;
            break;
          }
          return _context4.d(_regeneratorValues(_loop2()), 3);
        case 3:
          if (!_context4.v) {
            _context4.n = 4;
            break;
          }
          return _context4.a(3, 4);
        case 4:
          index++;
          _context4.n = 2;
          break;
        case 5:
          return _context4.a(2, index);
      }
    }, _callee2);
  }));
  return _processPipelineFlaws.apply(this, arguments);
}
module.exports = {
  processPipelineFlaws: processPipelineFlaws
};