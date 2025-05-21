/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 6714:
/***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {

    "use strict";
    /* module decorator */ module = __nccwpck_require__.nmd(module);
    
    
    const wrapAnsi16 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\u001B[${code + offset}m`;
    };
    
    const wrapAnsi256 = (fn, offset) => (...args) => {
        const code = fn(...args);
        return `\u001B[${38 + offset};5;${code}m`;
    };
    
    const wrapAnsi16m = (fn, offset) => (...args) => {
        const rgb = fn(...args);
        return `\u001B[${38 + offset};2;${rgb[0]};${rgb[1]};${rgb[2]}m`;
    };
    
    const ansi2ansi = n => n;
    const rgb2rgb = (r, g, b) => [r, g, b];
    
    const setLazyProperty = (object, property, get) => {
        Object.defineProperty(object, property, {
            get: () => {
                const value = get();
    
                Object.defineProperty(object, property, {
                    value,
                    enumerable: true,
                    configurable: true
                });
    
                return value;
            },
            enumerable: true,
            configurable: true
        });
    };
    
    /** @type {typeof import('color-convert')} */
    let colorConvert;
    const makeDynamicStyles = (wrap, targetSpace, identity, isBackground) => {
        if (colorConvert === undefined) {
            colorConvert = __nccwpck_require__(8028);
        }
    
        const offset = isBackground ? 10 : 0;
        const styles = {};
    
        for (const [sourceSpace, suite] of Object.entries(colorConvert)) {
            const name = sourceSpace === 'ansi16' ? 'ansi' : sourceSpace;
            if (sourceSpace === targetSpace) {
                styles[name] = wrap(identity, offset);
            } else if (typeof suite === 'object') {
                styles[name] = wrap(suite[targetSpace], offset);
            }
        }
    
        return styles;
    };
    
    function assembleStyles() {
        const codes = new Map();
        const styles = {
            modifier: {
                reset: [0, 0],
                // 21 isn't widely supported and 22 does the same thing
                bold: [1, 22],
                dim: [2, 22],
                italic: [3, 23],
                underline: [4, 24],
                inverse: [7, 27],
                hidden: [8, 28],
                strikethrough: [9, 29]
            },
            color: {
                black: [30, 39],
                red: [31, 39],
                green: [32, 39],
                yellow: [33, 39],
                blue: [34, 39],
                magenta: [35, 39],
                cyan: [36, 39],
                white: [37, 39],
    
                // Bright color
                blackBright: [90, 39],
                redBright: [91, 39],
                greenBright: [92, 39],
                yellowBright: [93, 39],
                blueBright: [94, 39],
                magentaBright: [95, 39],
                cyanBright: [96, 39],
                whiteBright: [97, 39]
            },
            bgColor: {
                bgBlack: [40, 49],
                bgRed: [41, 49],
                bgGreen: [42, 49],
                bgYellow: [43, 49],
                bgBlue: [44, 49],
                bgMagenta: [45, 49],
                bgCyan: [46, 49],
                bgWhite: [47, 49],
    
                // Bright color
                bgBlackBright: [100, 49],
                bgRedBright: [101, 49],
                bgGreenBright: [102, 49],
                bgYellowBright: [103, 49],
                bgBlueBright: [104, 49],
                bgMagentaBright: [105, 49],
                bgCyanBright: [106, 49],
                bgWhiteBright: [107, 49]
            }
        };
    
        // Alias bright black as gray (and grey)
        styles.color.gray = styles.color.blackBright;
        styles.bgColor.bgGray = styles.bgColor.bgBlackBright;
        styles.color.grey = styles.color.blackBright;
        styles.bgColor.bgGrey = styles.bgColor.bgBlackBright;
    
        for (const [groupName, group] of Object.entries(styles)) {
            for (const [styleName, style] of Object.entries(group)) {
                styles[styleName] = {
                    open: `\u001B[${style[0]}m`,
                    close: `\u001B[${style[1]}m`
                };
    
                group[styleName] = styles[styleName];
    
                codes.set(style[0], style[1]);
            }
    
            Object.defineProperty(styles, groupName, {
                value: group,
                enumerable: false
            });
        }
    
        Object.defineProperty(styles, 'codes', {
            value: codes,
            enumerable: false
        });
    
        styles.color.close = '\u001B[39m';
        styles.bgColor.close = '\u001B[49m';
    
        setLazyProperty(styles.color, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, false));
        setLazyProperty(styles.color, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, false));
        setLazyProperty(styles.color, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, false));
        setLazyProperty(styles.bgColor, 'ansi', () => makeDynamicStyles(wrapAnsi16, 'ansi16', ansi2ansi, true));
        setLazyProperty(styles.bgColor, 'ansi256', () => makeDynamicStyles(wrapAnsi256, 'ansi256', ansi2ansi, true));
        setLazyProperty(styles.bgColor, 'ansi16m', () => makeDynamicStyles(wrapAnsi16m, 'rgb', rgb2rgb, true));
    
        return styles;
    }
    
    // Make the export immutable
    Object.defineProperty(module, 'exports', {
        enumerable: true,
        get: assembleStyles
    });
    
    
    /***/ }),
    
    /***/ 2522:
    /***/ ((module) => {
    
    "use strict";
    
    module.exports = balanced;
    function balanced(a, b, str) {
      if (a instanceof RegExp) a = maybeMatch(a, str);
      if (b instanceof RegExp) b = maybeMatch(b, str);
    
      var r = range(a, b, str);
    
      return r && {
        start: r[0],
        end: r[1],
        pre: str.slice(0, r[0]),
        body: str.slice(r[0] + a.length, r[1]),
        post: str.slice(r[1] + b.length)
      };
    }
    
    function maybeMatch(reg, str) {
      var m = str.match(reg);
      return m ? m[0] : null;
    }
    
    balanced.range = range;
    function range(a, b, str) {
      var begs, beg, left, right, result;
      var ai = str.indexOf(a);
      var bi = str.indexOf(b, ai + 1);
      var i = ai;
    
      if (ai >= 0 && bi > 0) {
        if(a===b) {
          return [ai, bi];
        }
        begs = [];
        left = str.length;
    
        while (i >= 0 && !result) {
          if (i == ai) {
            begs.push(i);
            ai = str.indexOf(a, i + 1);
          } else if (begs.length == 1) {
            result = [ begs.pop(), bi ];
          } else {
            beg = begs.pop();
            if (beg < left) {
              left = beg;
              right = bi;
            }
    
            bi = str.indexOf(b, i + 1);
          }
    
          i = ai < bi && ai >= 0 ? ai : bi;
        }
    
        if (begs.length) {
          result = [ left, right ];
        }
      }
    
      return result;
    }
    
    
    /***/ }),
    
    /***/ 308:
    /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
    
    var balanced = __nccwpck_require__(2522);
    
    module.exports = expandTop;
    
    var escSlash = '\0SLASH'+Math.random()+'\0';
    var escOpen = '\0OPEN'+Math.random()+'\0';
    var escClose = '\0CLOSE'+Math.random()+'\0';
    var escComma = '\0COMMA'+Math.random()+'\0';
    var escPeriod = '\0PERIOD'+Math.random()+'\0';
    
    function numeric(str) {
      return parseInt(str, 10) == str
        ? parseInt(str, 10)
        : str.charCodeAt(0);
    }
    
    function escapeBraces(str) {
      return str.split('\\\\').join(escSlash)
                .split('\\{').join(escOpen)
                .split('\\}').join(escClose)
                .split('\\,').join(escComma)
                .split('\\.').join(escPeriod);
    }
    
    function unescapeBraces(str) {
      return str.split(escSlash).join('\\')
                .split(escOpen).join('{')
                .split(escClose).join('}')
                .split(escComma).join(',')
                .split(escPeriod).join('.');
    }
    
    
    // Basically just str.split(","), but handling cases
    // where we have nested braced sections, which should be
    // treated as individual members, like {a,{b,c},d}
    function parseCommaParts(str) {
      if (!str)
        return [''];
    
      var parts = [];
      var m = balanced('{', '}', str);
    
      if (!m)
        return str.split(',');
    
      var pre = m.pre;
      var body = m.body;
      var post = m.post;
      var p = pre.split(',');
    
      p[p.length-1] += '{' + body + '}';
      var postParts = parseCommaParts(post);
      if (post.length) {
        p[p.length-1] += postParts.shift();
        p.push.apply(p, postParts);
      }
    
      parts.push.apply(parts, p);
    
      return parts;
    }
    
    function expandTop(str) {
      if (!str)
        return [];
    
      // I don't know why Bash 4.3 does this, but it does.
      // Anything starting with {} will have the first two bytes preserved
      // but *only* at the top level, so {},a}b will not expand to anything,
      // but a{},b}c will be expanded to [a}c,abc].
      // One could argue that this is a bug in Bash, but since the goal of
      // this module is to match Bash's rules, we escape a leading {}
      if (str.substr(0, 2) === '{}') {
        str = '\\{\\}' + str.substr(2);
      }
    
      return expand(escapeBraces(str), true).map(unescapeBraces);
    }
    
    function embrace(str) {
      return '{' + str + '}';
    }
    function isPadded(el) {
      return /^-?0\d/.test(el);
    }
    
    function lte(i, y) {
      return i <= y;
    }
    function gte(i, y) {
      return i >= y;
    }
    
    function expand(str, isTop) {
      var expansions = [];
    
      var m = balanced('{', '}', str);
      if (!m) return [str];
    
      // no need to expand pre, since it is guaranteed to be free of brace-sets
      var pre = m.pre;
      var post = m.post.length
        ? expand(m.post, false)
        : [''];
    
      if (/\$$/.test(m.pre)) {    
        for (var k = 0; k < post.length; k++) {
          var expansion = pre+ '{' + m.body + '}' + post[k];
          expansions.push(expansion);
        }
      } else {
        var isNumericSequence = /^-?\d+\.\.-?\d+(?:\.\.-?\d+)?$/.test(m.body);
        var isAlphaSequence = /^[a-zA-Z]\.\.[a-zA-Z](?:\.\.-?\d+)?$/.test(m.body);
        var isSequence = isNumericSequence || isAlphaSequence;
        var isOptions = m.body.indexOf(',') >= 0;
        if (!isSequence && !isOptions) {
          // {a},b}
          if (m.post.match(/,.*\}/)) {
            str = m.pre + '{' + m.body + escClose + m.post;
            return expand(str);
          }
          return [str];
        }
    
        var n;
        if (isSequence) {
          n = m.body.split(/\.\./);
        } else {
          n = parseCommaParts(m.body);
          if (n.length === 1) {
            // x{{a,b}}y ==> x{a}y x{b}y
            n = expand(n[0], false).map(embrace);
            if (n.length === 1) {
              return post.map(function(p) {
                return m.pre + n[0] + p;
              });
            }
          }
        }
    
        // at this point, n is the parts, and we know it's not a comma set
        // with a single entry.
        var N;
    
        if (isSequence) {
          var x = numeric(n[0]);
          var y = numeric(n[1]);
          var width = Math.max(n[0].length, n[1].length)
          var incr = n.length == 3
            ? Math.abs(numeric(n[2]))
            : 1;
          var test = lte;
          var reverse = y < x;
          if (reverse) {
            incr *= -1;
            test = gte;
          }
          var pad = n.some(isPadded);
    
          N = [];
    
          for (var i = x; test(i, y); i += incr) {
            var c;
            if (isAlphaSequence) {
              c = String.fromCharCode(i);
              if (c === '\\')
                c = '';
            } else {
              c = String(i);
              if (pad) {
                var need = width - c.length;
                if (need > 0) {
                  var z = new Array(need + 1).join('0');
                  if (i < 0)
                    c = '-' + z + c.slice(1);
                  else
                    c = z + c;
                }
              }
            }
            N.push(c);
          }
        } else {
          N = [];
    
          for (var j = 0; j < n.length; j++) {
            N.push.apply(N, expand(n[j], false));
          }
        }
    
        for (var j = 0; j < N.length; j++) {
          for (var k = 0; k < post.length; k++) {
            var expansion = pre + N[j] + post[k];
            if (!isTop || isSequence || expansion)
              expansions.push(expansion);
          }
        }
      }
    
      return expansions;
    }
    
    
    
    /***/ }),
    
    /***/ 7336:
    /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
    
    "use strict";
    
    const ansiStyles = __nccwpck_require__(6714);
    const {stdout: stdoutColor, stderr: stderrColor} = __nccwpck_require__(7819);
    const {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex
    } = __nccwpck_require__(8019);
    
    const {isArray} = Array;
    
    // `supportsColor.level` → `ansiStyles.color[name]` mapping
    const levelMapping = [
        'ansi',
        'ansi',
        'ansi256',
        'ansi16m'
    ];
    
    const styles = Object.create(null);
    
    const applyOptions = (object, options = {}) => {
        if (options.level && !(Number.isInteger(options.level) && options.level >= 0 && options.level <= 3)) {
            throw new Error('The `level` option should be an integer from 0 to 3');
        }
    
        // Detect level if not set manually
        const colorLevel = stdoutColor ? stdoutColor.level : 0;
        object.level = options.level === undefined ? colorLevel : options.level;
    };
    
    class ChalkClass {
        constructor(options) {
            // eslint-disable-next-line no-constructor-return
            return chalkFactory(options);
        }
    }
    
    const chalkFactory = options => {
        const chalk = {};
        applyOptions(chalk, options);
    
        chalk.template = (...arguments_) => chalkTag(chalk.template, ...arguments_);
    
        Object.setPrototypeOf(chalk, Chalk.prototype);
        Object.setPrototypeOf(chalk.template, chalk);
    
        chalk.template.constructor = () => {
            throw new Error('`chalk.constructor()` is deprecated. Use `new chalk.Instance()` instead.');
        };
    
        chalk.template.Instance = ChalkClass;
    
        return chalk.template;
    };
    
    function Chalk(options) {
        return chalkFactory(options);
    }
    
    for (const [styleName, style] of Object.entries(ansiStyles)) {
        styles[styleName] = {
            get() {
                const builder = createBuilder(this, createStyler(style.open, style.close, this._styler), this._isEmpty);
                Object.defineProperty(this, styleName, {value: builder});
                return builder;
            }
        };
    }
    
    styles.visible = {
        get() {
            const builder = createBuilder(this, this._styler, true);
            Object.defineProperty(this, 'visible', {value: builder});
            return builder;
        }
    };
    
    const usedModels = ['rgb', 'hex', 'keyword', 'hsl', 'hsv', 'hwb', 'ansi', 'ansi256'];
    
    for (const model of usedModels) {
        styles[model] = {
            get() {
                const {level} = this;
                return function (...arguments_) {
                    const styler = createStyler(ansiStyles.color[levelMapping[level]][model](...arguments_), ansiStyles.color.close, this._styler);
                    return createBuilder(this, styler, this._isEmpty);
                };
            }
        };
    }
    
    for (const model of usedModels) {
        const bgModel = 'bg' + model[0].toUpperCase() + model.slice(1);
        styles[bgModel] = {
            get() {
                const {level} = this;
                return function (...arguments_) {
                    const styler = createStyler(ansiStyles.bgColor[levelMapping[level]][model](...arguments_), ansiStyles.bgColor.close, this._styler);
                    return createBuilder(this, styler, this._isEmpty);
                };
            }
        };
    }
    
    const proto = Object.defineProperties(() => {}, {
        ...styles,
        level: {
            enumerable: true,
            get() {
                return this._generator.level;
            },
            set(level) {
                this._generator.level = level;
            }
        }
    });
    
    const createStyler = (open, close, parent) => {
        let openAll;
        let closeAll;
        if (parent === undefined) {
            openAll = open;
            closeAll = close;
        } else {
            openAll = parent.openAll + open;
            closeAll = close + parent.closeAll;
        }
    
        return {
            open,
            close,
            openAll,
            closeAll,
            parent
        };
    };
    
    const createBuilder = (self, _styler, _isEmpty) => {
        const builder = (...arguments_) => {
            if (isArray(arguments_[0]) && isArray(arguments_[0].raw)) {
                // Called as a template literal, for example: chalk.red`2 + 3 = {bold ${2+3}}`
                return applyStyle(builder, chalkTag(builder, ...arguments_));
            }
    
            // Single argument is hot path, implicit coercion is faster than anything
            // eslint-disable-next-line no-implicit-coercion
            return applyStyle(builder, (arguments_.length === 1) ? ('' + arguments_[0]) : arguments_.join(' '));
        };
    
        // We alter the prototype because we must return a function, but there is
        // no way to create a function with a different prototype
        Object.setPrototypeOf(builder, proto);
    
        builder._generator = self;
        builder._styler = _styler;
        builder._isEmpty = _isEmpty;
    
        return builder;
    };
    
    const applyStyle = (self, string) => {
        if (self.level <= 0 || !string) {
            return self._isEmpty ? '' : string;
        }
    
        let styler = self._styler;
    
        if (styler === undefined) {
            return string;
        }
    
        const {openAll, closeAll} = styler;
        if (string.indexOf('\u001B') !== -1) {
            while (styler !== undefined) {
                // Replace any instances already present with a re-opening code
                // otherwise only the part of the string until said closing code
                // will be colored, and the rest will simply be 'plain'.
                string = stringReplaceAll(string, styler.close, styler.open);
    
                styler = styler.parent;
            }
        }
    
        // We can move both next actions out of loop, because remaining actions in loop won't have
        // any/visible effect on parts we add here. Close the styling before a linebreak and reopen
        // after next line to fix a bleed issue on macOS: https://github.com/chalk/chalk/pull/92
        const lfIndex = string.indexOf('\n');
        if (lfIndex !== -1) {
            string = stringEncaseCRLFWithFirstIndex(string, closeAll, openAll, lfIndex);
        }
    
        return openAll + string + closeAll;
    };
    
    let template;
    const chalkTag = (chalk, ...strings) => {
        const [firstString] = strings;
    
        if (!isArray(firstString) || !isArray(firstString.raw)) {
            // If chalk() was called by itself or with a string,
            // return the string itself as a string.
            return strings.join(' ');
        }
    
        const arguments_ = strings.slice(1);
        const parts = [firstString.raw[0]];
    
        for (let i = 1; i < firstString.length; i++) {
            parts.push(
                String(arguments_[i - 1]).replace(/[{}\\]/g, '\\$&'),
                String(firstString.raw[i])
            );
        }
    
        if (template === undefined) {
            template = __nccwpck_require__(3400);
        }
    
        return template(chalk, parts.join(''));
    };
    
    Object.defineProperties(Chalk.prototype, styles);
    
    const chalk = Chalk(); // eslint-disable-line new-cap
    chalk.supportsColor = stdoutColor;
    chalk.stderr = Chalk({level: stderrColor ? stderrColor.level : 0}); // eslint-disable-line new-cap
    chalk.stderr.supportsColor = stderrColor;
    
    module.exports = chalk;
    
    
    /***/ }),
    
    /***/ 3400:
    /***/ ((module) => {
    
    "use strict";
    
    const TEMPLATE_REGEX = /(?:\\(u(?:[a-f\d]{4}|\{[a-f\d]{1,6}\})|x[a-f\d]{2}|.))|(?:\{(~)?(\w+(?:\([^)]*\))?(?:\.\w+(?:\([^)]*\))?)*)(?:[ \t]|(?=\r?\n)))|(\})|((?:.|[\r\n\f])+?)/gi;
    const STYLE_REGEX = /(?:^|\.)(\w+)(?:\(([^)]*)\))?/g;
    const STRING_REGEX = /^(['"])((?:\\.|(?!\1)[^\\])*)\1$/;
    const ESCAPE_REGEX = /\\(u(?:[a-f\d]{4}|{[a-f\d]{1,6}})|x[a-f\d]{2}|.)|([^\\])/gi;
    
    const ESCAPES = new Map([
        ['n', '\n'],
        ['r', '\r'],
        ['t', '\t'],
        ['b', '\b'],
        ['f', '\f'],
        ['v', '\v'],
        ['0', '\0'],
        ['\\', '\\'],
        ['e', '\u001B'],
        ['a', '\u0007']
    ]);
    
    function unescape(c) {
        const u = c[0] === 'u';
        const bracket = c[1] === '{';
    
        if ((u && !bracket && c.length === 5) || (c[0] === 'x' && c.length === 3)) {
            return String.fromCharCode(parseInt(c.slice(1), 16));
        }
    
        if (u && bracket) {
            return String.fromCodePoint(parseInt(c.slice(2, -1), 16));
        }
    
        return ESCAPES.get(c) || c;
    }
    
    function parseArguments(name, arguments_) {
        const results = [];
        const chunks = arguments_.trim().split(/\s*,\s*/g);
        let matches;
    
        for (const chunk of chunks) {
            const number = Number(chunk);
            if (!Number.isNaN(number)) {
                results.push(number);
            } else if ((matches = chunk.match(STRING_REGEX))) {
                results.push(matches[2].replace(ESCAPE_REGEX, (m, escape, character) => escape ? unescape(escape) : character));
            } else {
                throw new Error(`Invalid Chalk template style argument: ${chunk} (in style '${name}')`);
            }
        }
    
        return results;
    }
    
    function parseStyle(style) {
        STYLE_REGEX.lastIndex = 0;
    
        const results = [];
        let matches;
    
        while ((matches = STYLE_REGEX.exec(style)) !== null) {
            const name = matches[1];
    
            if (matches[2]) {
                const args = parseArguments(name, matches[2]);
                results.push([name].concat(args));
            } else {
                results.push([name]);
            }
        }
    
        return results;
    }
    
    function buildStyle(chalk, styles) {
        const enabled = {};
    
        for (const layer of styles) {
            for (const style of layer.styles) {
                enabled[style[0]] = layer.inverse ? null : style.slice(1);
            }
        }
    
        let current = chalk;
        for (const [styleName, styles] of Object.entries(enabled)) {
            if (!Array.isArray(styles)) {
                continue;
            }
    
            if (!(styleName in current)) {
                throw new Error(`Unknown Chalk style: ${styleName}`);
            }
    
            current = styles.length > 0 ? current[styleName](...styles) : current[styleName];
        }
    
        return current;
    }
    
    module.exports = (chalk, temporary) => {
        const styles = [];
        const chunks = [];
        let chunk = [];
    
        // eslint-disable-next-line max-params
        temporary.replace(TEMPLATE_REGEX, (m, escapeCharacter, inverse, style, close, character) => {
            if (escapeCharacter) {
                chunk.push(unescape(escapeCharacter));
            } else if (style) {
                const string = chunk.join('');
                chunk = [];
                chunks.push(styles.length === 0 ? string : buildStyle(chalk, styles)(string));
                styles.push({inverse, styles: parseStyle(style)});
            } else if (close) {
                if (styles.length === 0) {
                    throw new Error('Found extraneous } in Chalk template literal');
                }
    
                chunks.push(buildStyle(chalk, styles)(chunk.join('')));
                chunk = [];
                styles.pop();
            } else {
                chunk.push(character);
            }
        });
    
        chunks.push(chunk.join(''));
    
        if (styles.length > 0) {
            const errMessage = `Chalk template literal is missing ${styles.length} closing bracket${styles.length === 1 ? '' : 's'} (\`}\`)`;
            throw new Error(errMessage);
        }
    
        return chunks.join('');
    };
    
    
    /***/ }),
    
    /***/ 8019:
    /***/ ((module) => {
    
    "use strict";
    
    
    const stringReplaceAll = (string, substring, replacer) => {
        let index = string.indexOf(substring);
        if (index === -1) {
            return string;
        }
    
        const substringLength = substring.length;
        let endIndex = 0;
        let returnValue = '';
        do {
            returnValue += string.substr(endIndex, index - endIndex) + substring + replacer;
            endIndex = index + substringLength;
            index = string.indexOf(substring, endIndex);
        } while (index !== -1);
    
        returnValue += string.substr(endIndex);
        return returnValue;
    };
    
    const stringEncaseCRLFWithFirstIndex = (string, prefix, postfix, index) => {
        let endIndex = 0;
        let returnValue = '';
        do {
            const gotCR = string[index - 1] === '\r';
            returnValue += string.substr(endIndex, (gotCR ? index - 1 : index) - endIndex) + prefix + (gotCR ? '\r\n' : '\n') + postfix;
            endIndex = index + 1;
            index = string.indexOf('\n', endIndex);
        } while (index !== -1);
    
        returnValue += string.substr(endIndex);
        return returnValue;
    };
    
    module.exports = {
        stringReplaceAll,
        stringEncaseCRLFWithFirstIndex
    };
    
    
    /***/ }),
    
    /***/ 4396:
    /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
    
    /* MIT license */
    /* eslint-disable no-mixed-operators */
    const cssKeywords = __nccwpck_require__(1097);
    
    // NOTE: conversions should only return primitive values (i.e. arrays, or
    //       values that give correct `typeof` results).
    //       do not use box values types (i.e. Number(), String(), etc.)
    
    const reverseKeywords = {};
    for (const key of Object.keys(cssKeywords)) {
        reverseKeywords[cssKeywords[key]] = key;
    }
    
    const convert = {
        rgb: {channels: 3, labels: 'rgb'},
        hsl: {channels: 3, labels: 'hsl'},
        hsv: {channels: 3, labels: 'hsv'},
        hwb: {channels: 3, labels: 'hwb'},
        cmyk: {channels: 4, labels: 'cmyk'},
        xyz: {channels: 3, labels: 'xyz'},
        lab: {channels: 3, labels: 'lab'},
        lch: {channels: 3, labels: 'lch'},
        hex: {channels: 1, labels: ['hex']},
        keyword: {channels: 1, labels: ['keyword']},
        ansi16: {channels: 1, labels: ['ansi16']},
        ansi256: {channels: 1, labels: ['ansi256']},
        hcg: {channels: 3, labels: ['h', 'c', 'g']},
        apple: {channels: 3, labels: ['r16', 'g16', 'b16']},
        gray: {channels: 1, labels: ['gray']}
    };
    
    module.exports = convert;
    
    // Hide .channels and .labels properties
    for (const model of Object.keys(convert)) {
        if (!('channels' in convert[model])) {
            throw new Error('missing channels property: ' + model);
        }
    
        if (!('labels' in convert[model])) {
            throw new Error('missing channel labels property: ' + model);
        }
    
        if (convert[model].labels.length !== convert[model].channels) {
            throw new Error('channel and label counts mismatch: ' + model);
        }
    
        const {channels, labels} = convert[model];
        delete convert[model].channels;
        delete convert[model].labels;
        Object.defineProperty(convert[model], 'channels', {value: channels});
        Object.defineProperty(convert[model], 'labels', {value: labels});
    }
    
    convert.rgb.hsl = function (rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const min = Math.min(r, g, b);
        const max = Math.max(r, g, b);
        const delta = max - min;
        let h;
        let s;
    
        if (max === min) {
            h = 0;
        } else if (r === max) {
            h = (g - b) / delta;
        } else if (g === max) {
            h = 2 + (b - r) / delta;
        } else if (b === max) {
            h = 4 + (r - g) / delta;
        }
    
        h = Math.min(h * 60, 360);
    
        if (h < 0) {
            h += 360;
        }
    
        const l = (min + max) / 2;
    
        if (max === min) {
            s = 0;
        } else if (l <= 0.5) {
            s = delta / (max + min);
        } else {
            s = delta / (2 - max - min);
        }
    
        return [h, s * 100, l * 100];
    };
    
    convert.rgb.hsv = function (rgb) {
        let rdif;
        let gdif;
        let bdif;
        let h;
        let s;
    
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const v = Math.max(r, g, b);
        const diff = v - Math.min(r, g, b);
        const diffc = function (c) {
            return (v - c) / 6 / diff + 1 / 2;
        };
    
        if (diff === 0) {
            h = 0;
            s = 0;
        } else {
            s = diff / v;
            rdif = diffc(r);
            gdif = diffc(g);
            bdif = diffc(b);
    
            if (r === v) {
                h = bdif - gdif;
            } else if (g === v) {
                h = (1 / 3) + rdif - bdif;
            } else if (b === v) {
                h = (2 / 3) + gdif - rdif;
            }
    
            if (h < 0) {
                h += 1;
            } else if (h > 1) {
                h -= 1;
            }
        }
    
        return [
            h * 360,
            s * 100,
            v * 100
        ];
    };
    
    convert.rgb.hwb = function (rgb) {
        const r = rgb[0];
        const g = rgb[1];
        let b = rgb[2];
        const h = convert.rgb.hsl(rgb)[0];
        const w = 1 / 255 * Math.min(r, Math.min(g, b));
    
        b = 1 - 1 / 255 * Math.max(r, Math.max(g, b));
    
        return [h, w * 100, b * 100];
    };
    
    convert.rgb.cmyk = function (rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
    
        const k = Math.min(1 - r, 1 - g, 1 - b);
        const c = (1 - r - k) / (1 - k) || 0;
        const m = (1 - g - k) / (1 - k) || 0;
        const y = (1 - b - k) / (1 - k) || 0;
    
        return [c * 100, m * 100, y * 100, k * 100];
    };
    
    function comparativeDistance(x, y) {
        /*
            See https://en.m.wikipedia.org/wiki/Euclidean_distance#Squared_Euclidean_distance
        */
        return (
            ((x[0] - y[0]) ** 2) +
            ((x[1] - y[1]) ** 2) +
            ((x[2] - y[2]) ** 2)
        );
    }
    
    convert.rgb.keyword = function (rgb) {
        const reversed = reverseKeywords[rgb];
        if (reversed) {
            return reversed;
        }
    
        let currentClosestDistance = Infinity;
        let currentClosestKeyword;
    
        for (const keyword of Object.keys(cssKeywords)) {
            const value = cssKeywords[keyword];
    
            // Compute comparative distance
            const distance = comparativeDistance(rgb, value);
    
            // Check if its less, if so set as closest
            if (distance < currentClosestDistance) {
                currentClosestDistance = distance;
                currentClosestKeyword = keyword;
            }
        }
    
        return currentClosestKeyword;
    };
    
    convert.keyword.rgb = function (keyword) {
        return cssKeywords[keyword];
    };
    
    convert.rgb.xyz = function (rgb) {
        let r = rgb[0] / 255;
        let g = rgb[1] / 255;
        let b = rgb[2] / 255;
    
        // Assume sRGB
        r = r > 0.04045 ? (((r + 0.055) / 1.055) ** 2.4) : (r / 12.92);
        g = g > 0.04045 ? (((g + 0.055) / 1.055) ** 2.4) : (g / 12.92);
        b = b > 0.04045 ? (((b + 0.055) / 1.055) ** 2.4) : (b / 12.92);
    
        const x = (r * 0.4124) + (g * 0.3576) + (b * 0.1805);
        const y = (r * 0.2126) + (g * 0.7152) + (b * 0.0722);
        const z = (r * 0.0193) + (g * 0.1192) + (b * 0.9505);
    
        return [x * 100, y * 100, z * 100];
    };
    
    convert.rgb.lab = function (rgb) {
        const xyz = convert.rgb.xyz(rgb);
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
    
        x /= 95.047;
        y /= 100;
        z /= 108.883;
    
        x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);
    
        const l = (116 * y) - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
    
        return [l, a, b];
    };
    
    convert.hsl.rgb = function (hsl) {
        const h = hsl[0] / 360;
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
        let t2;
        let t3;
        let val;
    
        if (s === 0) {
            val = l * 255;
            return [val, val, val];
        }
    
        if (l < 0.5) {
            t2 = l * (1 + s);
        } else {
            t2 = l + s - l * s;
        }
    
        const t1 = 2 * l - t2;
    
        const rgb = [0, 0, 0];
        for (let i = 0; i < 3; i++) {
            t3 = h + 1 / 3 * -(i - 1);
            if (t3 < 0) {
                t3++;
            }
    
            if (t3 > 1) {
                t3--;
            }
    
            if (6 * t3 < 1) {
                val = t1 + (t2 - t1) * 6 * t3;
            } else if (2 * t3 < 1) {
                val = t2;
            } else if (3 * t3 < 2) {
                val = t1 + (t2 - t1) * (2 / 3 - t3) * 6;
            } else {
                val = t1;
            }
    
            rgb[i] = val * 255;
        }
    
        return rgb;
    };
    
    convert.hsl.hsv = function (hsl) {
        const h = hsl[0];
        let s = hsl[1] / 100;
        let l = hsl[2] / 100;
        let smin = s;
        const lmin = Math.max(l, 0.01);
    
        l *= 2;
        s *= (l <= 1) ? l : 2 - l;
        smin *= lmin <= 1 ? lmin : 2 - lmin;
        const v = (l + s) / 2;
        const sv = l === 0 ? (2 * smin) / (lmin + smin) : (2 * s) / (l + s);
    
        return [h, sv * 100, v * 100];
    };
    
    convert.hsv.rgb = function (hsv) {
        const h = hsv[0] / 60;
        const s = hsv[1] / 100;
        let v = hsv[2] / 100;
        const hi = Math.floor(h) % 6;
    
        const f = h - Math.floor(h);
        const p = 255 * v * (1 - s);
        const q = 255 * v * (1 - (s * f));
        const t = 255 * v * (1 - (s * (1 - f)));
        v *= 255;
    
        switch (hi) {
            case 0:
                return [v, t, p];
            case 1:
                return [q, v, p];
            case 2:
                return [p, v, t];
            case 3:
                return [p, q, v];
            case 4:
                return [t, p, v];
            case 5:
                return [v, p, q];
        }
    };
    
    convert.hsv.hsl = function (hsv) {
        const h = hsv[0];
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
        const vmin = Math.max(v, 0.01);
        let sl;
        let l;
    
        l = (2 - s) * v;
        const lmin = (2 - s) * vmin;
        sl = s * vmin;
        sl /= (lmin <= 1) ? lmin : 2 - lmin;
        sl = sl || 0;
        l /= 2;
    
        return [h, sl * 100, l * 100];
    };
    
    // http://dev.w3.org/csswg/css-color/#hwb-to-rgb
    convert.hwb.rgb = function (hwb) {
        const h = hwb[0] / 360;
        let wh = hwb[1] / 100;
        let bl = hwb[2] / 100;
        const ratio = wh + bl;
        let f;
    
        // Wh + bl cant be > 1
        if (ratio > 1) {
            wh /= ratio;
            bl /= ratio;
        }
    
        const i = Math.floor(6 * h);
        const v = 1 - bl;
        f = 6 * h - i;
    
        if ((i & 0x01) !== 0) {
            f = 1 - f;
        }
    
        const n = wh + f * (v - wh); // Linear interpolation
    
        let r;
        let g;
        let b;
        /* eslint-disable max-statements-per-line,no-multi-spaces */
        switch (i) {
            default:
            case 6:
            case 0: r = v;  g = n;  b = wh; break;
            case 1: r = n;  g = v;  b = wh; break;
            case 2: r = wh; g = v;  b = n; break;
            case 3: r = wh; g = n;  b = v; break;
            case 4: r = n;  g = wh; b = v; break;
            case 5: r = v;  g = wh; b = n; break;
        }
        /* eslint-enable max-statements-per-line,no-multi-spaces */
    
        return [r * 255, g * 255, b * 255];
    };
    
    convert.cmyk.rgb = function (cmyk) {
        const c = cmyk[0] / 100;
        const m = cmyk[1] / 100;
        const y = cmyk[2] / 100;
        const k = cmyk[3] / 100;
    
        const r = 1 - Math.min(1, c * (1 - k) + k);
        const g = 1 - Math.min(1, m * (1 - k) + k);
        const b = 1 - Math.min(1, y * (1 - k) + k);
    
        return [r * 255, g * 255, b * 255];
    };
    
    convert.xyz.rgb = function (xyz) {
        const x = xyz[0] / 100;
        const y = xyz[1] / 100;
        const z = xyz[2] / 100;
        let r;
        let g;
        let b;
    
        r = (x * 3.2406) + (y * -1.5372) + (z * -0.4986);
        g = (x * -0.9689) + (y * 1.8758) + (z * 0.0415);
        b = (x * 0.0557) + (y * -0.2040) + (z * 1.0570);
    
        // Assume sRGB
        r = r > 0.0031308
            ? ((1.055 * (r ** (1.0 / 2.4))) - 0.055)
            : r * 12.92;
    
        g = g > 0.0031308
            ? ((1.055 * (g ** (1.0 / 2.4))) - 0.055)
            : g * 12.92;
    
        b = b > 0.0031308
            ? ((1.055 * (b ** (1.0 / 2.4))) - 0.055)
            : b * 12.92;
    
        r = Math.min(Math.max(0, r), 1);
        g = Math.min(Math.max(0, g), 1);
        b = Math.min(Math.max(0, b), 1);
    
        return [r * 255, g * 255, b * 255];
    };
    
    convert.xyz.lab = function (xyz) {
        let x = xyz[0];
        let y = xyz[1];
        let z = xyz[2];
    
        x /= 95.047;
        y /= 100;
        z /= 108.883;
    
        x = x > 0.008856 ? (x ** (1 / 3)) : (7.787 * x) + (16 / 116);
        y = y > 0.008856 ? (y ** (1 / 3)) : (7.787 * y) + (16 / 116);
        z = z > 0.008856 ? (z ** (1 / 3)) : (7.787 * z) + (16 / 116);
    
        const l = (116 * y) - 16;
        const a = 500 * (x - y);
        const b = 200 * (y - z);
    
        return [l, a, b];
    };
    
    convert.lab.xyz = function (lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let x;
        let y;
        let z;
    
        y = (l + 16) / 116;
        x = a / 500 + y;
        z = y - b / 200;
    
        const y2 = y ** 3;
        const x2 = x ** 3;
        const z2 = z ** 3;
        y = y2 > 0.008856 ? y2 : (y - 16 / 116) / 7.787;
        x = x2 > 0.008856 ? x2 : (x - 16 / 116) / 7.787;
        z = z2 > 0.008856 ? z2 : (z - 16 / 116) / 7.787;
    
        x *= 95.047;
        y *= 100;
        z *= 108.883;
    
        return [x, y, z];
    };
    
    convert.lab.lch = function (lab) {
        const l = lab[0];
        const a = lab[1];
        const b = lab[2];
        let h;
    
        const hr = Math.atan2(b, a);
        h = hr * 360 / 2 / Math.PI;
    
        if (h < 0) {
            h += 360;
        }
    
        const c = Math.sqrt(a * a + b * b);
    
        return [l, c, h];
    };
    
    convert.lch.lab = function (lch) {
        const l = lch[0];
        const c = lch[1];
        const h = lch[2];
    
        const hr = h / 360 * 2 * Math.PI;
        const a = c * Math.cos(hr);
        const b = c * Math.sin(hr);
    
        return [l, a, b];
    };
    
    convert.rgb.ansi16 = function (args, saturation = null) {
        const [r, g, b] = args;
        let value = saturation === null ? convert.rgb.hsv(args)[2] : saturation; // Hsv -> ansi16 optimization
    
        value = Math.round(value / 50);
    
        if (value === 0) {
            return 30;
        }
    
        let ansi = 30
            + ((Math.round(b / 255) << 2)
            | (Math.round(g / 255) << 1)
            | Math.round(r / 255));
    
        if (value === 2) {
            ansi += 60;
        }
    
        return ansi;
    };
    
    convert.hsv.ansi16 = function (args) {
        // Optimization here; we already know the value and don't need to get
        // it converted for us.
        return convert.rgb.ansi16(convert.hsv.rgb(args), args[2]);
    };
    
    convert.rgb.ansi256 = function (args) {
        const r = args[0];
        const g = args[1];
        const b = args[2];
    
        // We use the extended greyscale palette here, with the exception of
        // black and white. normal palette only has 4 greyscale shades.
        if (r === g && g === b) {
            if (r < 8) {
                return 16;
            }
    
            if (r > 248) {
                return 231;
            }
    
            return Math.round(((r - 8) / 247) * 24) + 232;
        }
    
        const ansi = 16
            + (36 * Math.round(r / 255 * 5))
            + (6 * Math.round(g / 255 * 5))
            + Math.round(b / 255 * 5);
    
        return ansi;
    };
    
    convert.ansi16.rgb = function (args) {
        let color = args % 10;
    
        // Handle greyscale
        if (color === 0 || color === 7) {
            if (args > 50) {
                color += 3.5;
            }
    
            color = color / 10.5 * 255;
    
            return [color, color, color];
        }
    
        const mult = (~~(args > 50) + 1) * 0.5;
        const r = ((color & 1) * mult) * 255;
        const g = (((color >> 1) & 1) * mult) * 255;
        const b = (((color >> 2) & 1) * mult) * 255;
    
        return [r, g, b];
    };
    
    convert.ansi256.rgb = function (args) {
        // Handle greyscale
        if (args >= 232) {
            const c = (args - 232) * 10 + 8;
            return [c, c, c];
        }
    
        args -= 16;
    
        let rem;
        const r = Math.floor(args / 36) / 5 * 255;
        const g = Math.floor((rem = args % 36) / 6) / 5 * 255;
        const b = (rem % 6) / 5 * 255;
    
        return [r, g, b];
    };
    
    convert.rgb.hex = function (args) {
        const integer = ((Math.round(args[0]) & 0xFF) << 16)
            + ((Math.round(args[1]) & 0xFF) << 8)
            + (Math.round(args[2]) & 0xFF);
    
        const string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
    };
    
    convert.hex.rgb = function (args) {
        const match = args.toString(16).match(/[a-f0-9]{6}|[a-f0-9]{3}/i);
        if (!match) {
            return [0, 0, 0];
        }
    
        let colorString = match[0];
    
        if (match[0].length === 3) {
            colorString = colorString.split('').map(char => {
                return char + char;
            }).join('');
        }
    
        const integer = parseInt(colorString, 16);
        const r = (integer >> 16) & 0xFF;
        const g = (integer >> 8) & 0xFF;
        const b = integer & 0xFF;
    
        return [r, g, b];
    };
    
    convert.rgb.hcg = function (rgb) {
        const r = rgb[0] / 255;
        const g = rgb[1] / 255;
        const b = rgb[2] / 255;
        const max = Math.max(Math.max(r, g), b);
        const min = Math.min(Math.min(r, g), b);
        const chroma = (max - min);
        let grayscale;
        let hue;
    
        if (chroma < 1) {
            grayscale = min / (1 - chroma);
        } else {
            grayscale = 0;
        }
    
        if (chroma <= 0) {
            hue = 0;
        } else
        if (max === r) {
            hue = ((g - b) / chroma) % 6;
        } else
        if (max === g) {
            hue = 2 + (b - r) / chroma;
        } else {
            hue = 4 + (r - g) / chroma;
        }
    
        hue /= 6;
        hue %= 1;
    
        return [hue * 360, chroma * 100, grayscale * 100];
    };
    
    convert.hsl.hcg = function (hsl) {
        const s = hsl[1] / 100;
        const l = hsl[2] / 100;
    
        const c = l < 0.5 ? (2.0 * s * l) : (2.0 * s * (1.0 - l));
    
        let f = 0;
        if (c < 1.0) {
            f = (l - 0.5 * c) / (1.0 - c);
        }
    
        return [hsl[0], c * 100, f * 100];
    };
    
    convert.hsv.hcg = function (hsv) {
        const s = hsv[1] / 100;
        const v = hsv[2] / 100;
    
        const c = s * v;
        let f = 0;
    
        if (c < 1.0) {
            f = (v - c) / (1 - c);
        }
    
        return [hsv[0], c * 100, f * 100];
    };
    
    convert.hcg.rgb = function (hcg) {
        const h = hcg[0] / 360;
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
    
        if (c === 0.0) {
            return [g * 255, g * 255, g * 255];
        }
    
        const pure = [0, 0, 0];
        const hi = (h % 1) * 6;
        const v = hi % 1;
        const w = 1 - v;
        let mg = 0;
    
        /* eslint-disable max-statements-per-line */
        switch (Math.floor(hi)) {
            case 0:
                pure[0] = 1; pure[1] = v; pure[2] = 0; break;
            case 1:
                pure[0] = w; pure[1] = 1; pure[2] = 0; break;
            case 2:
                pure[0] = 0; pure[1] = 1; pure[2] = v; break;
            case 3:
                pure[0] = 0; pure[1] = w; pure[2] = 1; break;
            case 4:
                pure[0] = v; pure[1] = 0; pure[2] = 1; break;
            default:
                pure[0] = 1; pure[1] = 0; pure[2] = w;
        }
        /* eslint-enable max-statements-per-line */
    
        mg = (1.0 - c) * g;
    
        return [
            (c * pure[0] + mg) * 255,
            (c * pure[1] + mg) * 255,
            (c * pure[2] + mg) * 255
        ];
    };
    
    convert.hcg.hsv = function (hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
    
        const v = c + g * (1.0 - c);
        let f = 0;
    
        if (v > 0.0) {
            f = c / v;
        }
    
        return [hcg[0], f * 100, v * 100];
    };
    
    convert.hcg.hsl = function (hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
    
        const l = g * (1.0 - c) + 0.5 * c;
        let s = 0;
    
        if (l > 0.0 && l < 0.5) {
            s = c / (2 * l);
        } else
        if (l >= 0.5 && l < 1.0) {
            s = c / (2 * (1 - l));
        }
    
        return [hcg[0], s * 100, l * 100];
    };
    
    convert.hcg.hwb = function (hcg) {
        const c = hcg[1] / 100;
        const g = hcg[2] / 100;
        const v = c + g * (1.0 - c);
        return [hcg[0], (v - c) * 100, (1 - v) * 100];
    };
    
    convert.hwb.hcg = function (hwb) {
        const w = hwb[1] / 100;
        const b = hwb[2] / 100;
        const v = 1 - b;
        const c = v - w;
        let g = 0;
    
        if (c < 1) {
            g = (v - c) / (1 - c);
        }
    
        return [hwb[0], c * 100, g * 100];
    };
    
    convert.apple.rgb = function (apple) {
        return [(apple[0] / 65535) * 255, (apple[1] / 65535) * 255, (apple[2] / 65535) * 255];
    };
    
    convert.rgb.apple = function (rgb) {
        return [(rgb[0] / 255) * 65535, (rgb[1] / 255) * 65535, (rgb[2] / 255) * 65535];
    };
    
    convert.gray.rgb = function (args) {
        return [args[0] / 100 * 255, args[0] / 100 * 255, args[0] / 100 * 255];
    };
    
    convert.gray.hsl = function (args) {
        return [0, 0, args[0]];
    };
    
    convert.gray.hsv = convert.gray.hsl;
    
    convert.gray.hwb = function (gray) {
        return [0, 100, gray[0]];
    };
    
    convert.gray.cmyk = function (gray) {
        return [0, 0, 0, gray[0]];
    };
    
    convert.gray.lab = function (gray) {
        return [gray[0], 0, 0];
    };
    
    convert.gray.hex = function (gray) {
        const val = Math.round(gray[0] / 100 * 255) & 0xFF;
        const integer = (val << 16) + (val << 8) + val;
    
        const string = integer.toString(16).toUpperCase();
        return '000000'.substring(string.length) + string;
    };
    
    convert.rgb.gray = function (rgb) {
        const val = (rgb[0] + rgb[1] + rgb[2]) / 3;
        return [val / 255 * 100];
    };
    
    
    /***/ }),
    
    /***/ 8028:
    /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
    
    const conversions = __nccwpck_require__(4396);
    const route = __nccwpck_require__(8488);
    
    const convert = {};
    
    const models = Object.keys(conversions);
    
    function wrapRaw(fn) {
        const wrappedFn = function (...args) {
            const arg0 = args[0];
            if (arg0 === undefined || arg0 === null) {
                return arg0;
            }
    
            if (arg0.length > 1) {
                args = arg0;
            }
    
            return fn(args);
        };
    
        // Preserve .conversion property if there is one
        if ('conversion' in fn) {
            wrappedFn.conversion = fn.conversion;
        }
    
        return wrappedFn;
    }
    
    function wrapRounded(fn) {
        const wrappedFn = function (...args) {
            const arg0 = args[0];
    
            if (arg0 === undefined || arg0 === null) {
                return arg0;
            }
    
            if (arg0.length > 1) {
                args = arg0;
            }
    
            const result = fn(args);
    
            // We're assuming the result is an array here.
            // see notice in conversions.js; don't use box types
            // in conversion functions.
            if (typeof result === 'object') {
                for (let len = result.length, i = 0; i < len; i++) {
                    result[i] = Math.round(result[i]);
                }
            }
    
            return result;
        };
    
        // Preserve .conversion property if there is one
        if ('conversion' in fn) {
            wrappedFn.conversion = fn.conversion;
        }
    
        return wrappedFn;
    }
    
    models.forEach(fromModel => {
        convert[fromModel] = {};
    
        Object.defineProperty(convert[fromModel], 'channels', {value: conversions[fromModel].channels});
        Object.defineProperty(convert[fromModel], 'labels', {value: conversions[fromModel].labels});
    
        const routes = route(fromModel);
        const routeModels = Object.keys(routes);
    
        routeModels.forEach(toModel => {
            const fn = routes[toModel];
    
            convert[fromModel][toModel] = wrapRounded(fn);
            convert[fromModel][toModel].raw = wrapRaw(fn);
        });
    });
    
    module.exports = convert;
    
    
    /***/ }),
    
    /***/ 8488:
    /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
    
    const conversions = __nccwpck_require__(4396);
    
    /*
        This function routes a model to all other models.
    
        all functions that are routed have a property `.conversion` attached
        to the returned synthetic function. This property is an array
        of strings, each with the steps in between the 'from' and 'to'
        color models (inclusive).
    
        conversions that are not possible simply are not included.
    */
    
    function buildGraph() {
        const graph = {};
        // https://jsperf.com/object-keys-vs-for-in-with-closure/3
        const models = Object.keys(conversions);
    
        for (let len = models.length, i = 0; i < len; i++) {
            graph[models[i]] = {
                // http://jsperf.com/1-vs-infinity
                // micro-opt, but this is simple.
                distance: -1,
                parent: null
            };
        }
    
        return graph;
    }
    
    // https://en.wikipedia.org/wiki/Breadth-first_search
    function deriveBFS(fromModel) {
        const graph = buildGraph();
        const queue = [fromModel]; // Unshift -> queue -> pop
    
        graph[fromModel].distance = 0;
    
        while (queue.length) {
            const current = queue.pop();
            const adjacents = Object.keys(conversions[current]);
    
            for (let len = adjacents.length, i = 0; i < len; i++) {
                const adjacent = adjacents[i];
                const node = graph[adjacent];
    
                if (node.distance === -1) {
                    node.distance = graph[current].distance + 1;
                    node.parent = current;
                    queue.unshift(adjacent);
                }
            }
        }
    
        return graph;
    }
    
    function link(from, to) {
        return function (args) {
            return to(from(args));
        };
    }
    
    function wrapConversion(toModel, graph) {
        const path = [graph[toModel].parent, toModel];
        let fn = conversions[graph[toModel].parent][toModel];
    
        let cur = graph[toModel].parent;
        while (graph[cur].parent) {
            path.unshift(graph[cur].parent);
            fn = link(conversions[graph[cur].parent][cur], fn);
            cur = graph[cur].parent;
        }
    
        fn.conversion = path;
        return fn;
    }
    
    module.exports = function (fromModel) {
        const graph = deriveBFS(fromModel);
        const conversion = {};
    
        const models = Object.keys(graph);
        for (let len = models.length, i = 0; i < len; i++) {
            const toModel = models[i];
            const node = graph[toModel];
    
            if (node.parent === null) {
                // No possible conversion, or this node is the source model.
                continue;
            }
    
            conversion[toModel] = wrapConversion(toModel, graph);
        }
    
        return conversion;
    };
    
    
    
    /***/ }),
    
    /***/ 1097:
    /***/ ((module) => {
    
    "use strict";
    
    
    module.exports = {
        "aliceblue": [240, 248, 255],
        "antiquewhite": [250, 235, 215],
        "aqua": [0, 255, 255],
        "aquamarine": [127, 255, 212],
        "azure": [240, 255, 255],
        "beige": [245, 245, 220],
        "bisque": [255, 228, 196],
        "black": [0, 0, 0],
        "blanchedalmond": [255, 235, 205],
        "blue": [0, 0, 255],
        "blueviolet": [138, 43, 226],
        "brown": [165, 42, 42],
        "burlywood": [222, 184, 135],
        "cadetblue": [95, 158, 160],
        "chartreuse": [127, 255, 0],
        "chocolate": [210, 105, 30],
        "coral": [255, 127, 80],
        "cornflowerblue": [100, 149, 237],
        "cornsilk": [255, 248, 220],
        "crimson": [220, 20, 60],
        "cyan": [0, 255, 255],
        "darkblue": [0, 0, 139],
        "darkcyan": [0, 139, 139],
        "darkgoldenrod": [184, 134, 11],
        "darkgray": [169, 169, 169],
        "darkgreen": [0, 100, 0],
        "darkgrey": [169, 169, 169],
        "darkkhaki": [189, 183, 107],
        "darkmagenta": [139, 0, 139],
        "darkolivegreen": [85, 107, 47],
        "darkorange": [255, 140, 0],
        "darkorchid": [153, 50, 204],
        "darkred": [139, 0, 0],
        "darksalmon": [233, 150, 122],
        "darkseagreen": [143, 188, 143],
        "darkslateblue": [72, 61, 139],
        "darkslategray": [47, 79, 79],
        "darkslategrey": [47, 79, 79],
        "darkturquoise": [0, 206, 209],
        "darkviolet": [148, 0, 211],
        "deeppink": [255, 20, 147],
        "deepskyblue": [0, 191, 255],
        "dimgray": [105, 105, 105],
        "dimgrey": [105, 105, 105],
        "dodgerblue": [30, 144, 255],
        "firebrick": [178, 34, 34],
        "floralwhite": [255, 250, 240],
        "forestgreen": [34, 139, 34],
        "fuchsia": [255, 0, 255],
        "gainsboro": [220, 220, 220],
        "ghostwhite": [248, 248, 255],
        "gold": [255, 215, 0],
        "goldenrod": [218, 165, 32],
        "gray": [128, 128, 128],
        "green": [0, 128, 0],
        "greenyellow": [173, 255, 47],
        "grey": [128, 128, 128],
        "honeydew": [240, 255, 240],
        "hotpink": [255, 105, 180],
        "indianred": [205, 92, 92],
        "indigo": [75, 0, 130],
        "ivory": [255, 255, 240],
        "khaki": [240, 230, 140],
        "lavender": [230, 230, 250],
        "lavenderblush": [255, 240, 245],
        "lawngreen": [124, 252, 0],
        "lemonchiffon": [255, 250, 205],
        "lightblue": [173, 216, 230],
        "lightcoral": [240, 128, 128],
        "lightcyan": [224, 255, 255],
        "lightgoldenrodyellow": [250, 250, 210],
        "lightgray": [211, 211, 211],
        "lightgreen": [144, 238, 144],
        "lightgrey": [211, 211, 211],
        "lightpink": [255, 182, 193],
        "lightsalmon": [255, 160, 122],
        "lightseagreen": [32, 178, 170],
        "lightskyblue": [135, 206, 250],
        "lightslategray": [119, 136, 153],
        "lightslategrey": [119, 136, 153],
        "lightsteelblue": [176, 196, 222],
        "lightyellow": [255, 255, 224],
        "lime": [0, 255, 0],
        "limegreen": [50, 205, 50],
        "linen": [250, 240, 230],
        "magenta": [255, 0, 255],
        "maroon": [128, 0, 0],
        "mediumaquamarine": [102, 205, 170],
        "mediumblue": [0, 0, 205],
        "mediumorchid": [186, 85, 211],
        "mediumpurple": [147, 112, 219],
        "mediumseagreen": [60, 179, 113],
        "mediumslateblue": [123, 104, 238],
        "mediumspringgreen": [0, 250, 154],
        "mediumturquoise": [72, 209, 204],
        "mediumvioletred": [199, 21, 133],
        "midnightblue": [25, 25, 112],
        "mintcream": [245, 255, 250],
        "mistyrose": [255, 228, 225],
        "moccasin": [255, 228, 181],
        "navajowhite": [255, 222, 173],
        "navy": [0, 0, 128],
        "oldlace": [253, 245, 230],
        "olive": [128, 128, 0],
        "olivedrab": [107, 142, 35],
        "orange": [255, 165, 0],
        "orangered": [255, 69, 0],
        "orchid": [218, 112, 214],
        "palegoldenrod": [238, 232, 170],
        "palegreen": [152, 251, 152],
        "paleturquoise": [175, 238, 238],
        "palevioletred": [219, 112, 147],
        "papayawhip": [255, 239, 213],
        "peachpuff": [255, 218, 185],
        "peru": [205, 133, 63],
        "pink": [255, 192, 203],
        "plum": [221, 160, 221],
        "powderblue": [176, 224, 230],
        "purple": [128, 0, 128],
        "rebeccapurple": [102, 51, 153],
        "red": [255, 0, 0],
        "rosybrown": [188, 143, 143],
        "royalblue": [65, 105, 225],
        "saddlebrown": [139, 69, 19],
        "salmon": [250, 128, 114],
        "sandybrown": [244, 164, 96],
        "seagreen": [46, 139, 87],
        "seashell": [255, 245, 238],
        "sienna": [160, 82, 45],
        "silver": [192, 192, 192],
        "skyblue": [135, 206, 235],
        "slateblue": [106, 90, 205],
        "slategray": [112, 128, 144],
        "slategrey": [112, 128, 144],
        "snow": [255, 250, 250],
        "springgreen": [0, 255, 127],
        "steelblue": [70, 130, 180],
        "tan": [210, 180, 140],
        "teal": [0, 128, 128],
        "thistle": [216, 191, 216],
        "tomato": [255, 99, 71],
        "turquoise": [64, 224, 208],
        "violet": [238, 130, 238],
        "wheat": [245, 222, 179],
        "white": [255, 255, 255],
        "whitesmoke": [245, 245, 245],
        "yellow": [255, 255, 0],
        "yellowgreen": [154, 205, 50]
    };
    
    
    /***/ }),
    
    /***/ 3303:
    /***/ ((module) => {
    
    "use strict";
    
    
    module.exports = (flag, argv = process.argv) => {
        const prefix = flag.startsWith('-') ? '' : (flag.length === 1 ? '-' : '--');
        const position = argv.indexOf(prefix + flag);
        const terminatorPosition = argv.indexOf('--');
        return position !== -1 && (terminatorPosition === -1 || position < terminatorPosition);
    };
    
    
    /***/ }),
    
    /***/ 7819:
    /***/ ((module, __unused_webpack_exports, __nccwpck_require__) => {
    
    "use strict";
    
    const os = __nccwpck_require__(2037);
    const tty = __nccwpck_require__(6224);
    const hasFlag = __nccwpck_require__(3303);
    
    const {env} = process;
    
    let forceColor;
    if (hasFlag('no-color') ||
        hasFlag('no-colors') ||
        hasFlag('color=false') ||
        hasFlag('color=never')) {
        forceColor = 0;
    } else if (hasFlag('color') ||
        hasFlag('colors') ||
        hasFlag('color=true') ||
        hasFlag('color=always')) {
        forceColor = 1;
    }
    
    if ('FORCE_COLOR' in env) {
        if (env.FORCE_COLOR === 'true') {
            forceColor = 1;
        } else if (env.FORCE_COLOR === 'false') {
            forceColor = 0;
        } else {
            forceColor = env.FORCE_COLOR.length === 0 ? 1 : Math.min(parseInt(env.FORCE_COLOR, 10), 3);
        }
    }
    
    function translateLevel(level) {
        if (level === 0) {
            return false;
        }
    
        return {
            level,
            hasBasic: true,
            has256: level >= 2,
            has16m: level >= 3
        };
    }
    
    function supportsColor(haveStream, streamIsTTY) {
        if (forceColor === 0) {
            return 0;
        }
    
        if (hasFlag('color=16m') ||
            hasFlag('color=full') ||
            hasFlag('color=truecolor')) {
            return 3;
        }
    
        if (hasFlag('color=256')) {
            return 2;
        }
    
        if (haveStream && !streamIsTTY && forceColor === undefined) {
            return 0;
        }
    
        const min = forceColor || 0;
    
        if (env.TERM === 'dumb') {
            return min;
        }
    
        if (process.platform === 'win32') {
            // Windows 10 build 10586 is the first Windows release that supports 256 colors.
            // Windows 10 build 14931 is the first release that supports 16m/TrueColor.
            const osRelease = os.release().split('.');
            if (
                Number(osRelease[0]) >= 10 &&
                Number(osRelease[2]) >= 10586
            ) {
                return Number(osRelease[2]) >= 14931 ? 3 : 2;
            }
    
            return 1;
        }
    
        if ('CI' in env) {
            if (['TRAVIS', 'CIRCLECI', 'APPVEYOR', 'GITLAB_CI', 'GITHUB_ACTIONS', 'BUILDKITE'].some(sign => sign in env) || env.CI_NAME === 'codeship') {
                return 1;
            }
    
            return min;
        }
    
        if ('TEAMCITY_VERSION' in env) {
            return /^(9\.(0*[1-9]\d*)\.|\d{2,}\.)/.test(env.TEAMCITY_VERSION) ? 1 : 0;
        }
    
        if (env.COLORTERM === 'truecolor') {
            return 3;
        }
    
        if ('TERM_PROGRAM' in env) {
            const version = parseInt((env.TERM_PROGRAM_VERSION || '').split('.')[0], 10);
    
            switch (env.TERM_PROGRAM) {
                case 'iTerm.app':
                    return version >= 3 ? 3 : 2;
                case 'Apple_Terminal':
                    return 2;
                // No default
            }
        }
    
        if (/-256(color)?$/i.test(env.TERM)) {
            return 2;
        }
    
        if (/^screen|^xterm|^vt100|^vt220|^rxvt|color|ansi|cygwin|linux/i.test(env.TERM)) {
            return 1;
        }
    
        if ('COLORTERM' in env) {
            return 1;
        }
    
        return min;
    }
    
    function getSupportLevel(stream) {
        const level = supportsColor(stream, stream && stream.isTTY);
        return translateLevel(level);
    }
    
    module.exports = {
        supportsColor: getSupportLevel,
        stdout: translateLevel(supportsColor(true, tty.isatty(1))),
        stderr: translateLevel(supportsColor(true, tty.isatty(2)))
    };
    
    
    /***/ }),
    
    /***/ 3584:
    /***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {
    
    "use strict";
    
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    });
    var __importStar = (this && this.__importStar) || (function () {
        var ownKeys = function(o) {
            ownKeys = Object.getOwnPropertyNames || function (o) {
                var ar = [];
                for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                return ar;
            };
            return ownKeys(o);
        };
        return function (mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
            __setModuleDefault(result, mod);
            return result;
        };
    })();
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LockGenerator = void 0;
    const fs = __importStar(__nccwpck_require__(7147));
    const path = __importStar(__nccwpck_require__(1017));
    const glob_1 = __nccwpck_require__(189);
    const logger_1 = __nccwpck_require__(9934);
    class LockGenerator {
        constructor(rootPath, options) {
            this.rootPath = path.resolve(rootPath);
            this.options = options;
        }
        async findWorkspacePackages(workspacePattern) {
            try {
                return await (0, glob_1.glob)(workspacePattern, { cwd: this.rootPath });
            }
            catch (error) {
                logger_1.logger.error(`Error finding workspace packages: ${error instanceof Error ? error.message : 'Unknown error'}`);
                return [];
            }
        }
        readPackageJson(packagePath) {
            try {
                const content = fs.readFileSync(packagePath, 'utf8');
                return JSON.parse(content);
            }
            catch (error) {
                logger_1.logger.error(`Failed to read package.json at ${packagePath}: ${error}`);
                return null;
            }
        }
        readLockFile(lockFilePath) {
            try {
                const content = fs.readFileSync(lockFilePath, 'utf8');
                return JSON.parse(content);
            }
            catch (error) {
                logger_1.logger.error(`Failed to read lock file at ${lockFilePath}: ${error}`);
                return null;
            }
        }
        resolveDependencies(dependencies, lockFile) {
            const resolved = [];
            for (const [name, version] of Object.entries(dependencies)) {
                const packageKey = `node_modules/${name}`;
                const entry = lockFile.packages[packageKey];
                if (entry) {
                    resolved.push({
                        name,
                        version,
                        resolved: true
                    });
                    // Recursively resolve nested dependencies
                    if (entry.dependencies) {
                        resolved.push(...this.resolveDependencies(entry.dependencies, lockFile));
                    }
                }
                else {
                    resolved.push({
                        name,
                        version,
                        resolved: false,
                        error: `Dependency not found in lock file: ${packageKey}`
                    });
                }
            }
            return resolved;
        }
        generateLockFile(packageJson, rootPackageJson) {
            const newLockFile = {
                name: packageJson.name,
                version: packageJson.version,
                lockfileVersion: 3,
                requires: true,
                packages: {
                    "": {
                        name: packageJson.name,
                        version: packageJson.version,
                        dependencies: {
                            ...rootPackageJson.dependencies,
                            ...rootPackageJson.devDependencies,
                            ...packageJson.dependencies,
                            ...(this.options.includeDevDependencies ? packageJson.devDependencies : {})
                        }
                    }
                }
            };
            // Add each dependency to the packages section
            const allDependencies = {
                ...rootPackageJson.dependencies,
                ...rootPackageJson.devDependencies,
                ...packageJson.dependencies,
                ...(this.options.includeDevDependencies ? packageJson.devDependencies : {})
            };
            for (const [name, version] of Object.entries(allDependencies)) {
                const packageKey = `node_modules/${name}`;
                newLockFile.packages[packageKey] = {
                    version: version.replace(/^\^|~/, ''),
                    resolved: `https://registry.npmjs.org/${name}/-/${name}-${version.replace(/^\^|~/, '')}.tgz`,
                    integrity: `sha512-${Buffer.from(name + version).toString('base64')}`, // Placeholder integrity
                    dependencies: {}
                };
            }
            return newLockFile;
        }
        async generateWorkspaceLockFiles(workspacePatterns) {
            const results = [];
            // Read root package.json
            const rootPackageJsonPath = path.join(this.rootPath, 'package.json');
            if (!fs.existsSync(rootPackageJsonPath)) {
                logger_1.logger.error('No root package.json found');
                return results;
            }
            const rootPackageJson = this.readPackageJson(rootPackageJsonPath);
            if (!rootPackageJson) {
                logger_1.logger.error('Failed to read root package.json');
                return results;
            }
            for (const pattern of workspacePatterns) {
                try {
                    const workspacePaths = await this.findWorkspacePackages(pattern);
                    logger_1.logger.workspace(`Processing workspace pattern: ${pattern}`);
                    for (const workspacePath of workspacePaths) {
                        // Use the full path directly since it's already absolute
                        const packageJsonPath = path.join(workspacePath, 'package.json');
                        logger_1.logger.info(`Checking package.json at: ${packageJsonPath}`);
                        if (!fs.existsSync(packageJsonPath)) {
                            logger_1.logger.warning(`No package.json found in ${workspacePath}`);
                            continue;
                        }
                        const packageJson = this.readPackageJson(packageJsonPath);
                        if (!packageJson) {
                            continue;
                        }
                        if (this.options.skipPrivate && packageJson.private) {
                            logger_1.logger.info(`Skipping private package: ${workspacePath}`);
                            continue;
                        }
                        const newLockFile = this.generateLockFile(packageJson, rootPackageJson);
                        const lockFilePath = path.join(workspacePath, 'package-lock.json');
                        if (fs.existsSync(lockFilePath) && !this.options.force) {
                            logger_1.logger.warning(`Lock file already exists at ${lockFilePath}. Use --force to overwrite.`);
                            continue;
                        }
                        fs.writeFileSync(lockFilePath, JSON.stringify(newLockFile, null, 2));
                        logger_1.logger.success(`Generated lock file for ${workspacePath}`);
                        results.push({
                            workspacePath,
                            success: true,
                            dependencies: Object.entries({
                                ...rootPackageJson.dependencies,
                                ...rootPackageJson.devDependencies,
                                ...packageJson.dependencies,
                                ...(this.options.includeDevDependencies
                                    ? packageJson.devDependencies
                                    : {})
                            }).map(([name, version]) => ({
                                name,
                                version,
                                resolved: true
                            }))
                        });
                    }
                }
                catch (error) {
                    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
                    logger_1.logger.error(`Error processing workspace pattern ${pattern}: ${errorMessage}`);
                    results.push({
                        workspacePath: pattern,
                        success: false,
                        dependencies: [],
                        error: errorMessage
                    });
                }
            }
            return results;
        }
    }
    exports.LockGenerator = LockGenerator;
    
    
    /***/ }),
    
    /***/ 9934:
    /***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {
    
    "use strict";
    
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.logger = void 0;
    const chalk_1 = __importDefault(__nccwpck_require__(7336));
    class Logger {
        constructor() {
            this.verbose = false;
        }
        setVerbose(verbose) {
            this.verbose = verbose;
        }
        info(message) {
            console.log(chalk_1.default.blue('ℹ'), message);
        }
        success(message) {
            console.log(chalk_1.default.green('✓'), message);
        }
        warning(message) {
            console.log(chalk_1.default.yellow('⚠'), message);
        }
        error(message) {
            console.error(chalk_1.default.red('✖'), message);
        }
        debug(message) {
            if (this.verbose) {
                console.log(chalk_1.default.gray('⚡'), message);
            }
        }
        workspace(message) {
            console.log(chalk_1.default.cyan('📦'), message);
        }
        dependency(message) {
            console.log(chalk_1.default.magenta('🔗'), message);
        }
    }
    exports.logger = new Logger();
    
    
    /***/ }),
    
    /***/ 5573:
    /***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {
    
    "use strict";
    
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    });
    var __importStar = (this && this.__importStar) || (function () {
        var ownKeys = function(o) {
            ownKeys = Object.getOwnPropertyNames || function (o) {
                var ar = [];
                for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
                return ar;
            };
            return ownKeys(o);
        };
        return function (mod) {
            if (mod && mod.__esModule) return mod;
            var result = {};
            if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
            __setModuleDefault(result, mod);
            return result;
        };
    })();
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.WorkspaceDetector = void 0;
    const fs = __importStar(__nccwpck_require__(7147));
    const path = __importStar(__nccwpck_require__(1017));
    const logger_1 = __nccwpck_require__(9934);
    const glob_1 = __nccwpck_require__(189);
    class WorkspaceDetector {
        constructor(rootPath) {
            this.rootPath = path.resolve(rootPath);
        }
        detectPackageManager() {
            if (fs.existsSync(path.join(this.rootPath, 'pnpm-workspace.yaml'))) {
                return 'pnpm';
            }
            if (fs.existsSync(path.join(this.rootPath, 'yarn.lock'))) {
                return 'yarn';
            }
            if (fs.existsSync(path.join(this.rootPath, 'package-lock.json'))) {
                return 'npm';
            }
            return 'npm'; // Default to npm if no lock file is found
        }
        getLockFileName(packageManager) {
            switch (packageManager) {
                case 'yarn':
                    return 'yarn.lock';
                case 'pnpm':
                    return 'pnpm-lock.yaml';
                case 'npm':
                default:
                    return 'package-lock.json';
            }
        }
        getWorkspacesFromPackageJson(packageJson) {
            if (!packageJson.workspaces) {
                logger_1.logger.info('No workspaces field found in package.json');
                return [];
            }
            logger_1.logger.info(`Found workspaces in package.json: ${JSON.stringify(packageJson.workspaces)}`);
            if (Array.isArray(packageJson.workspaces)) {
                return packageJson.workspaces;
            }
            return packageJson.workspaces.packages || [];
        }
        getWorkspacesFromPnpm() {
            try {
                const workspaceYamlPath = path.join(this.rootPath, 'pnpm-workspace.yaml');
                logger_1.logger.info(`Reading pnpm workspace file: ${workspaceYamlPath}`);
                const workspaceYaml = fs.readFileSync(workspaceYamlPath, 'utf8');
                logger_1.logger.info(`Raw pnpm-workspace.yaml content:\n${workspaceYaml}`);
                const yaml = workspaceYaml
                    .split('\n')
                    .map(line => line.trim())
                    .filter(line => line && !line.startsWith('#'));
                logger_1.logger.info(`Parsed YAML lines: ${JSON.stringify(yaml)}`);
                const packagesIndex = yaml.findIndex(line => line === 'packages:');
                if (packagesIndex === -1) {
                    logger_1.logger.error('No packages field found in pnpm-workspace.yaml');
                    return [];
                }
                const workspaceGlobs = yaml
                    .slice(packagesIndex + 1)
                    .filter(line => line.startsWith('- '))
                    .map(line => {
                    const match = line.match(/- ['"](.*)['"]/);
                    if (!match) {
                        logger_1.logger.info(`Could not parse workspace glob from line: ${line}`);
                        return null;
                    }
                    const glob = match[1];
                    logger_1.logger.info(`Found workspace glob: ${glob}`);
                    return glob;
                })
                    .filter((glob) => glob !== null && !glob.startsWith('!'));
                logger_1.logger.info(`Found workspaces in pnpm-workspace.yaml: ${JSON.stringify(workspaceGlobs)}`);
                if (workspaceGlobs.length === 0) {
                    logger_1.logger.error('No workspace globs found in pnpm-workspace.yaml');
                    return [];
                }
                return this.resolveWorkspaceDirs(workspaceGlobs);
            }
            catch (error) {
                logger_1.logger.error(`Failed to read pnpm-workspace.yaml: ${error}`);
                return [];
            }
        }
        resolveWorkspaceDirs(workspaceGlobs) {
            logger_1.logger.info(`Root path: ${this.rootPath}`);
            logger_1.logger.info(`Resolving workspace globs: ${JSON.stringify(workspaceGlobs)}`);
            // Use glob to resolve all workspace directories
            const dirs = workspaceGlobs
                .map(pattern => {
                const fullPattern = path.join(this.rootPath, pattern);
                logger_1.logger.info(`Full pattern: ${fullPattern}`);
                const matches = glob_1.glob.sync(fullPattern, { absolute: true });
                logger_1.logger.info(`Pattern ${pattern} matched: ${JSON.stringify(matches)}`);
                return matches;
            })
                .flat();
            // Filter for those that contain a package.json
            const resolved = dirs.filter(dir => {
                const hasPackageJson = fs.existsSync(path.join(dir, 'package.json'));
                logger_1.logger.info(`Directory ${dir} has package.json: ${hasPackageJson}`);
                return hasPackageJson;
            });
            logger_1.logger.info(`Resolved workspace paths: ${JSON.stringify(resolved)}`);
            return resolved;
        }
        detectWorkspaceConfig() {
            const packageManager = this.detectPackageManager();
            const lockFileName = this.getLockFileName(packageManager);
            let workspaces = [];
            const packageJsonPath = path.join(this.rootPath, 'package.json');
            if (fs.existsSync(packageJsonPath)) {
                try {
                    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
                    const workspaceGlobs = this.getWorkspacesFromPackageJson(packageJson);
                    workspaces = this.resolveWorkspaceDirs(workspaceGlobs);
                }
                catch (error) {
                    logger_1.logger.error(`Failed to read package.json: ${error}`);
                }
            }
            if (packageManager === 'pnpm') {
                workspaces = this.getWorkspacesFromPnpm();
            }
            logger_1.logger.info(`Detected package manager: ${packageManager}`);
            logger_1.logger.info(`Workspaces found: ${workspaces.length}`);
            return {
                rootPath: this.rootPath,
                packageManager,
                workspaces,
                lockFileName
            };
        }
    }
    exports.WorkspaceDetector = WorkspaceDetector;
    
    
    /***/ }),
    
    /***/ 2081:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("child_process");
    
    /***/ }),
    
    /***/ 2361:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("events");
    
    /***/ }),
    
    /***/ 7147:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("fs");
    
    /***/ }),
    
    /***/ 5673:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:events");
    
    /***/ }),
    
    /***/ 7561:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:fs");
    
    /***/ }),
    
    /***/ 3977:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:fs/promises");
    
    /***/ }),
    
    /***/ 9411:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:path");
    
    /***/ }),
    
    /***/ 4492:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:stream");
    
    /***/ }),
    
    /***/ 6915:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:string_decoder");
    
    /***/ }),
    
    /***/ 1041:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("node:url");
    
    /***/ }),
    
    /***/ 2037:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("os");
    
    /***/ }),
    
    /***/ 1017:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("path");
    
    /***/ }),
    
    /***/ 7282:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("process");
    
    /***/ }),
    
    /***/ 6224:
    /***/ ((module) => {
    
    "use strict";
    module.exports = require("tty");
    
    /***/ }),
    
    /***/ 6476:
    /***/ ((module, exports, __nccwpck_require__) => {
    
    const { Argument } = __nccwpck_require__(5861);
    const { Command } = __nccwpck_require__(5593);
    const { CommanderError, InvalidArgumentError } = __nccwpck_require__(7823);
    const { Help } = __nccwpck_require__(8355);
    const { Option } = __nccwpck_require__(3126);
    
    /**
     * Expose the root command.
     */
    
    exports = module.exports = new Command();
    exports.program = exports; // More explicit access to global command.
    // createArgument, createCommand, and createOption are implicitly available as they are methods on program.
    
    /**
     * Expose classes
     */
    
    exports.Command = Command;
    exports.Option = Option;
    exports.Argument = Argument;
    exports.Help = Help;
    
    exports.CommanderError = CommanderError;
    exports.InvalidArgumentError = InvalidArgumentError;
    exports.InvalidOptionArgumentError = InvalidArgumentError; // Deprecated
    
    
    /***/ }),
    
    /***/ 5861:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    const { InvalidArgumentError } = __nccwpck_require__(7823);
    
    class Argument {
      /**
       * Initialize a new command argument with the given name and description.
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @param {string} name
       * @param {string} [description]
       */
    
      constructor(name, description) {
        this.description = description || '';
        this.variadic = false;
        this.parseArg = undefined;
        this.defaultValue = undefined;
        this.defaultValueDescription = undefined;
        this.argChoices = undefined;
    
        switch (name[0]) {
          case '<': // e.g. <required>
            this.required = true;
            this._name = name.slice(1, -1);
            break;
          case '[': // e.g. [optional]
            this.required = false;
            this._name = name.slice(1, -1);
            break;
          default:
            this.required = true;
            this._name = name;
            break;
        }
    
        if (this._name.length > 3 && this._name.slice(-3) === '...') {
          this.variadic = true;
          this._name = this._name.slice(0, -3);
        }
      }
    
      /**
       * Return argument name.
       *
       * @return {string}
       */
    
      name() {
        return this._name;
      }
    
      /**
       * @api private
       */
    
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
    
        return previous.concat(value);
      }
    
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Argument}
       */
    
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
    
      /**
       * Set the custom handler for processing CLI command arguments into argument values.
       *
       * @param {Function} [fn]
       * @return {Argument}
       */
    
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
    
      /**
       * Only allow argument value to be one of choices.
       *
       * @param {string[]} values
       * @return {Argument}
       */
    
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(', ')}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
    
      /**
       * Make argument required.
       */
      argRequired() {
        this.required = true;
        return this;
      }
    
      /**
       * Make argument optional.
       */
      argOptional() {
        this.required = false;
        return this;
      }
    }
    
    /**
     * Takes an argument and returns its human readable equivalent for help usage.
     *
     * @param {Argument} arg
     * @return {string}
     * @api private
     */
    
    function humanReadableArgName(arg) {
      const nameOutput = arg.name() + (arg.variadic === true ? '...' : '');
    
      return arg.required
        ? '<' + nameOutput + '>'
        : '[' + nameOutput + ']';
    }
    
    exports.Argument = Argument;
    exports.humanReadableArgName = humanReadableArgName;
    
    
    /***/ }),
    
    /***/ 5593:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    const EventEmitter = (__nccwpck_require__(2361).EventEmitter);
    const childProcess = __nccwpck_require__(2081);
    const path = __nccwpck_require__(1017);
    const fs = __nccwpck_require__(7147);
    const process = __nccwpck_require__(7282);
    
    const { Argument, humanReadableArgName } = __nccwpck_require__(5861);
    const { CommanderError } = __nccwpck_require__(7823);
    const { Help } = __nccwpck_require__(8355);
    const { Option, splitOptionFlags, DualOptions } = __nccwpck_require__(3126);
    const { suggestSimilar } = __nccwpck_require__(4276);
    
    class Command extends EventEmitter {
      /**
       * Initialize a new `Command`.
       *
       * @param {string} [name]
       */
    
      constructor(name) {
        super();
        /** @type {Command[]} */
        this.commands = [];
        /** @type {Option[]} */
        this.options = [];
        this.parent = null;
        this._allowUnknownOption = false;
        this._allowExcessArguments = true;
        /** @type {Argument[]} */
        this.registeredArguments = [];
        this._args = this.registeredArguments; // deprecated old name
        /** @type {string[]} */
        this.args = []; // cli args with options removed
        this.rawArgs = [];
        this.processedArgs = []; // like .args but after custom processing and collecting variadic
        this._scriptPath = null;
        this._name = name || '';
        this._optionValues = {};
        this._optionValueSources = {}; // default, env, cli etc
        this._storeOptionsAsProperties = false;
        this._actionHandler = null;
        this._executableHandler = false;
        this._executableFile = null; // custom name for executable
        this._executableDir = null; // custom search directory for subcommands
        this._defaultCommandName = null;
        this._exitCallback = null;
        this._aliases = [];
        this._combineFlagAndOptionalValue = true;
        this._description = '';
        this._summary = '';
        this._argsDescription = undefined; // legacy
        this._enablePositionalOptions = false;
        this._passThroughOptions = false;
        this._lifeCycleHooks = {}; // a hash of arrays
        /** @type {boolean | string} */
        this._showHelpAfterError = false;
        this._showSuggestionAfterError = true;
    
        // see .configureOutput() for docs
        this._outputConfiguration = {
          writeOut: (str) => process.stdout.write(str),
          writeErr: (str) => process.stderr.write(str),
          getOutHelpWidth: () => process.stdout.isTTY ? process.stdout.columns : undefined,
          getErrHelpWidth: () => process.stderr.isTTY ? process.stderr.columns : undefined,
          outputError: (str, write) => write(str)
        };
    
        this._hidden = false;
        this._hasHelpOption = true;
        this._helpFlags = '-h, --help';
        this._helpDescription = 'display help for command';
        this._helpShortFlag = '-h';
        this._helpLongFlag = '--help';
        this._addImplicitHelpCommand = undefined; // Deliberately undefined, not decided whether true or false
        this._helpCommandName = 'help';
        this._helpCommandnameAndArgs = 'help [command]';
        this._helpCommandDescription = 'display help for command';
        this._helpConfiguration = {};
      }
    
      /**
       * Copy settings that are useful to have in common across root command and subcommands.
       *
       * (Used internally when adding a command using `.command()` so subcommands inherit parent settings.)
       *
       * @param {Command} sourceCommand
       * @return {Command} `this` command for chaining
       */
      copyInheritedSettings(sourceCommand) {
        this._outputConfiguration = sourceCommand._outputConfiguration;
        this._hasHelpOption = sourceCommand._hasHelpOption;
        this._helpFlags = sourceCommand._helpFlags;
        this._helpDescription = sourceCommand._helpDescription;
        this._helpShortFlag = sourceCommand._helpShortFlag;
        this._helpLongFlag = sourceCommand._helpLongFlag;
        this._helpCommandName = sourceCommand._helpCommandName;
        this._helpCommandnameAndArgs = sourceCommand._helpCommandnameAndArgs;
        this._helpCommandDescription = sourceCommand._helpCommandDescription;
        this._helpConfiguration = sourceCommand._helpConfiguration;
        this._exitCallback = sourceCommand._exitCallback;
        this._storeOptionsAsProperties = sourceCommand._storeOptionsAsProperties;
        this._combineFlagAndOptionalValue = sourceCommand._combineFlagAndOptionalValue;
        this._allowExcessArguments = sourceCommand._allowExcessArguments;
        this._enablePositionalOptions = sourceCommand._enablePositionalOptions;
        this._showHelpAfterError = sourceCommand._showHelpAfterError;
        this._showSuggestionAfterError = sourceCommand._showSuggestionAfterError;
    
        return this;
      }
    
      /**
       * @returns {Command[]}
       * @api private
       */
    
      _getCommandAndAncestors() {
        const result = [];
        for (let command = this; command; command = command.parent) {
          result.push(command);
        }
        return result;
      }
    
      /**
       * Define a command.
       *
       * There are two styles of command: pay attention to where to put the description.
       *
       * @example
       * // Command implemented using action handler (description is supplied separately to `.command`)
       * program
       *   .command('clone <source> [destination]')
       *   .description('clone a repository into a newly created directory')
       *   .action((source, destination) => {
       *     console.log('clone command called');
       *   });
       *
       * // Command implemented using separate executable file (description is second parameter to `.command`)
       * program
       *   .command('start <service>', 'start named service')
       *   .command('stop [service]', 'stop named service, or all if no name supplied');
       *
       * @param {string} nameAndArgs - command name and arguments, args are `<required>` or `[optional]` and last may also be `variadic...`
       * @param {Object|string} [actionOptsOrExecDesc] - configuration options (for action), or description (for executable)
       * @param {Object} [execOpts] - configuration options (for executable)
       * @return {Command} returns new command for action handler, or `this` for executable command
       */
    
      command(nameAndArgs, actionOptsOrExecDesc, execOpts) {
        let desc = actionOptsOrExecDesc;
        let opts = execOpts;
        if (typeof desc === 'object' && desc !== null) {
          opts = desc;
          desc = null;
        }
        opts = opts || {};
        const [, name, args] = nameAndArgs.match(/([^ ]+) *(.*)/);
    
        const cmd = this.createCommand(name);
        if (desc) {
          cmd.description(desc);
          cmd._executableHandler = true;
        }
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        cmd._hidden = !!(opts.noHelp || opts.hidden); // noHelp is deprecated old name for hidden
        cmd._executableFile = opts.executableFile || null; // Custom name for executable file, set missing to null to match constructor
        if (args) cmd.arguments(args);
        this.commands.push(cmd);
        cmd.parent = this;
        cmd.copyInheritedSettings(this);
    
        if (desc) return this;
        return cmd;
      }
    
      /**
       * Factory routine to create a new unattached command.
       *
       * See .command() for creating an attached subcommand, which uses this routine to
       * create the command. You can override createCommand to customise subcommands.
       *
       * @param {string} [name]
       * @return {Command} new command
       */
    
      createCommand(name) {
        return new Command(name);
      }
    
      /**
       * You can customise the help with a subclass of Help by overriding createHelp,
       * or by overriding Help properties using configureHelp().
       *
       * @return {Help}
       */
    
      createHelp() {
        return Object.assign(new Help(), this.configureHelp());
      }
    
      /**
       * You can customise the help by overriding Help properties using configureHelp(),
       * or with a subclass of Help by overriding createHelp().
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
    
      configureHelp(configuration) {
        if (configuration === undefined) return this._helpConfiguration;
    
        this._helpConfiguration = configuration;
        return this;
      }
    
      /**
       * The default output goes to stdout and stderr. You can customise this for special
       * applications. You can also customise the display of errors by overriding outputError.
       *
       * The configuration properties are all functions:
       *
       *     // functions to change where being written, stdout and stderr
       *     writeOut(str)
       *     writeErr(str)
       *     // matching functions to specify width for wrapping help
       *     getOutHelpWidth()
       *     getErrHelpWidth()
       *     // functions based on what is being written out
       *     outputError(str, write) // used for displaying errors, and not used for displaying help
       *
       * @param {Object} [configuration] - configuration options
       * @return {Command|Object} `this` command for chaining, or stored configuration
       */
    
      configureOutput(configuration) {
        if (configuration === undefined) return this._outputConfiguration;
    
        Object.assign(this._outputConfiguration, configuration);
        return this;
      }
    
      /**
       * Display the help or a custom message after an error occurs.
       *
       * @param {boolean|string} [displayHelp]
       * @return {Command} `this` command for chaining
       */
      showHelpAfterError(displayHelp = true) {
        if (typeof displayHelp !== 'string') displayHelp = !!displayHelp;
        this._showHelpAfterError = displayHelp;
        return this;
      }
    
      /**
       * Display suggestion of similar commands for unknown commands, or options for unknown options.
       *
       * @param {boolean} [displaySuggestion]
       * @return {Command} `this` command for chaining
       */
      showSuggestionAfterError(displaySuggestion = true) {
        this._showSuggestionAfterError = !!displaySuggestion;
        return this;
      }
    
      /**
       * Add a prepared subcommand.
       *
       * See .command() for creating an attached subcommand which inherits settings from its parent.
       *
       * @param {Command} cmd - new subcommand
       * @param {Object} [opts] - configuration options
       * @return {Command} `this` command for chaining
       */
    
      addCommand(cmd, opts) {
        if (!cmd._name) {
          throw new Error(`Command passed to .addCommand() must have a name
    - specify the name in Command constructor or using .name()`);
        }
    
        opts = opts || {};
        if (opts.isDefault) this._defaultCommandName = cmd._name;
        if (opts.noHelp || opts.hidden) cmd._hidden = true; // modifying passed command due to existing implementation
    
        this.commands.push(cmd);
        cmd.parent = this;
        return this;
      }
    
      /**
       * Factory routine to create a new unattached argument.
       *
       * See .argument() for creating an attached argument, which uses this routine to
       * create the argument. You can override createArgument to return a custom argument.
       *
       * @param {string} name
       * @param {string} [description]
       * @return {Argument} new argument
       */
    
      createArgument(name, description) {
        return new Argument(name, description);
      }
    
      /**
       * Define argument syntax for command.
       *
       * The default is that the argument is required, and you can explicitly
       * indicate this with <> around the name. Put [] around the name for an optional argument.
       *
       * @example
       * program.argument('<input-file>');
       * program.argument('[output-file]');
       *
       * @param {string} name
       * @param {string} [description]
       * @param {Function|*} [fn] - custom argument processing function
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
      argument(name, description, fn, defaultValue) {
        const argument = this.createArgument(name, description);
        if (typeof fn === 'function') {
          argument.default(defaultValue).argParser(fn);
        } else {
          argument.default(fn);
        }
        this.addArgument(argument);
        return this;
      }
    
      /**
       * Define argument syntax for command, adding multiple at once (without descriptions).
       *
       * See also .argument().
       *
       * @example
       * program.arguments('<cmd> [env]');
       *
       * @param {string} names
       * @return {Command} `this` command for chaining
       */
    
      arguments(names) {
        names.trim().split(/ +/).forEach((detail) => {
          this.argument(detail);
        });
        return this;
      }
    
      /**
       * Define argument syntax for command, adding a prepared argument.
       *
       * @param {Argument} argument
       * @return {Command} `this` command for chaining
       */
      addArgument(argument) {
        const previousArgument = this.registeredArguments.slice(-1)[0];
        if (previousArgument && previousArgument.variadic) {
          throw new Error(`only the last argument can be variadic '${previousArgument.name()}'`);
        }
        if (argument.required && argument.defaultValue !== undefined && argument.parseArg === undefined) {
          throw new Error(`a default value for a required argument is never used: '${argument.name()}'`);
        }
        this.registeredArguments.push(argument);
        return this;
      }
    
      /**
       * Override default decision whether to add implicit help command.
       *
       *    addHelpCommand() // force on
       *    addHelpCommand(false); // force off
       *    addHelpCommand('help [cmd]', 'display help for [cmd]'); // force on with custom details
       *
       * @return {Command} `this` command for chaining
       */
    
      addHelpCommand(enableOrNameAndArgs, description) {
        if (enableOrNameAndArgs === false) {
          this._addImplicitHelpCommand = false;
        } else {
          this._addImplicitHelpCommand = true;
          if (typeof enableOrNameAndArgs === 'string') {
            this._helpCommandName = enableOrNameAndArgs.split(' ')[0];
            this._helpCommandnameAndArgs = enableOrNameAndArgs;
          }
          this._helpCommandDescription = description || this._helpCommandDescription;
        }
        return this;
      }
    
      /**
       * @return {boolean}
       * @api private
       */
    
      _hasImplicitHelpCommand() {
        if (this._addImplicitHelpCommand === undefined) {
          return this.commands.length && !this._actionHandler && !this._findCommand('help');
        }
        return this._addImplicitHelpCommand;
      }
    
      /**
       * Add hook for life cycle event.
       *
       * @param {string} event
       * @param {Function} listener
       * @return {Command} `this` command for chaining
       */
    
      hook(event, listener) {
        const allowedValues = ['preSubcommand', 'preAction', 'postAction'];
        if (!allowedValues.includes(event)) {
          throw new Error(`Unexpected value for event passed to hook : '${event}'.
    Expecting one of '${allowedValues.join("', '")}'`);
        }
        if (this._lifeCycleHooks[event]) {
          this._lifeCycleHooks[event].push(listener);
        } else {
          this._lifeCycleHooks[event] = [listener];
        }
        return this;
      }
    
      /**
       * Register callback to use as replacement for calling process.exit.
       *
       * @param {Function} [fn] optional callback which will be passed a CommanderError, defaults to throwing
       * @return {Command} `this` command for chaining
       */
    
      exitOverride(fn) {
        if (fn) {
          this._exitCallback = fn;
        } else {
          this._exitCallback = (err) => {
            if (err.code !== 'commander.executeSubCommandAsync') {
              throw err;
            } else {
              // Async callback from spawn events, not useful to throw.
            }
          };
        }
        return this;
      }
    
      /**
       * Call process.exit, and _exitCallback if defined.
       *
       * @param {number} exitCode exit code for using with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @return never
       * @api private
       */
    
      _exit(exitCode, code, message) {
        if (this._exitCallback) {
          this._exitCallback(new CommanderError(exitCode, code, message));
          // Expecting this line is not reached.
        }
        process.exit(exitCode);
      }
    
      /**
       * Register callback `fn` for the command.
       *
       * @example
       * program
       *   .command('serve')
       *   .description('start service')
       *   .action(function() {
       *      // do work here
       *   });
       *
       * @param {Function} fn
       * @return {Command} `this` command for chaining
       */
    
      action(fn) {
        const listener = (args) => {
          // The .action callback takes an extra parameter which is the command or options.
          const expectedArgsCount = this.registeredArguments.length;
          const actionArgs = args.slice(0, expectedArgsCount);
          if (this._storeOptionsAsProperties) {
            actionArgs[expectedArgsCount] = this; // backwards compatible "options"
          } else {
            actionArgs[expectedArgsCount] = this.opts();
          }
          actionArgs.push(this);
    
          return fn.apply(this, actionArgs);
        };
        this._actionHandler = listener;
        return this;
      }
    
      /**
       * Factory routine to create a new unattached option.
       *
       * See .option() for creating an attached option, which uses this routine to
       * create the option. You can override createOption to return a custom option.
       *
       * @param {string} flags
       * @param {string} [description]
       * @return {Option} new option
       */
    
      createOption(flags, description) {
        return new Option(flags, description);
      }
    
      /**
       * Wrap parseArgs to catch 'commander.invalidArgument'.
       *
       * @param {Option | Argument} target
       * @param {string} value
       * @param {*} previous
       * @param {string} invalidArgumentMessage
       * @api private
       */
    
      _callParseArg(target, value, previous, invalidArgumentMessage) {
        try {
          return target.parseArg(value, previous);
        } catch (err) {
          if (err.code === 'commander.invalidArgument') {
            const message = `${invalidArgumentMessage} ${err.message}`;
            this.error(message, { exitCode: err.exitCode, code: err.code });
          }
          throw err;
        }
      }
    
      /**
       * Add an option.
       *
       * @param {Option} option
       * @return {Command} `this` command for chaining
       */
      addOption(option) {
        const oname = option.name();
        const name = option.attributeName();
    
        // store default value
        if (option.negate) {
          // --no-foo is special and defaults foo to true, unless a --foo option is already defined
          const positiveLongFlag = option.long.replace(/^--no-/, '--');
          if (!this._findOption(positiveLongFlag)) {
            this.setOptionValueWithSource(name, option.defaultValue === undefined ? true : option.defaultValue, 'default');
          }
        } else if (option.defaultValue !== undefined) {
          this.setOptionValueWithSource(name, option.defaultValue, 'default');
        }
    
        // register the option
        this.options.push(option);
    
        // handler for cli and env supplied values
        const handleOptionValue = (val, invalidValueMessage, valueSource) => {
          // val is null for optional option used without an optional-argument.
          // val is undefined for boolean and negated option.
          if (val == null && option.presetArg !== undefined) {
            val = option.presetArg;
          }
    
          // custom processing
          const oldValue = this.getOptionValue(name);
          if (val !== null && option.parseArg) {
            val = this._callParseArg(option, val, oldValue, invalidValueMessage);
          } else if (val !== null && option.variadic) {
            val = option._concatValue(val, oldValue);
          }
    
          // Fill-in appropriate missing values. Long winded but easy to follow.
          if (val == null) {
            if (option.negate) {
              val = false;
            } else if (option.isBoolean() || option.optional) {
              val = true;
            } else {
              val = ''; // not normal, parseArg might have failed or be a mock function for testing
            }
          }
          this.setOptionValueWithSource(name, val, valueSource);
        };
    
        this.on('option:' + oname, (val) => {
          const invalidValueMessage = `error: option '${option.flags}' argument '${val}' is invalid.`;
          handleOptionValue(val, invalidValueMessage, 'cli');
        });
    
        if (option.envVar) {
          this.on('optionEnv:' + oname, (val) => {
            const invalidValueMessage = `error: option '${option.flags}' value '${val}' from env '${option.envVar}' is invalid.`;
            handleOptionValue(val, invalidValueMessage, 'env');
          });
        }
    
        return this;
      }
    
      /**
       * Internal implementation shared by .option() and .requiredOption()
       *
       * @api private
       */
      _optionEx(config, flags, description, fn, defaultValue) {
        if (typeof flags === 'object' && flags instanceof Option) {
          throw new Error('To add an Option object use addOption() instead of option() or requiredOption()');
        }
        const option = this.createOption(flags, description);
        option.makeOptionMandatory(!!config.mandatory);
        if (typeof fn === 'function') {
          option.default(defaultValue).argParser(fn);
        } else if (fn instanceof RegExp) {
          // deprecated
          const regex = fn;
          fn = (val, def) => {
            const m = regex.exec(val);
            return m ? m[0] : def;
          };
          option.default(defaultValue).argParser(fn);
        } else {
          option.default(fn);
        }
    
        return this.addOption(option);
      }
    
      /**
       * Define option with `flags`, `description`, and optional argument parsing function or `defaultValue` or both.
       *
       * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space. A required
       * option-argument is indicated by `<>` and an optional option-argument by `[]`.
       *
       * See the README for more details, and see also addOption() and requiredOption().
       *
       * @example
       * program
       *     .option('-p, --pepper', 'add pepper')
       *     .option('-p, --pizza-type <TYPE>', 'type of pizza') // required option-argument
       *     .option('-c, --cheese [CHEESE]', 'add extra cheese', 'mozzarella') // optional option-argument with default
       *     .option('-t, --tip <VALUE>', 'add tip to purchase cost', parseFloat) // custom parse function
       *
       * @param {string} flags
       * @param {string} [description]
       * @param {Function|*} [parseArg] - custom option processing function or default value
       * @param {*} [defaultValue]
       * @return {Command} `this` command for chaining
       */
    
      option(flags, description, parseArg, defaultValue) {
        return this._optionEx({}, flags, description, parseArg, defaultValue);
      }
    
      /**
      * Add a required option which must have a value after parsing. This usually means
      * the option must be specified on the command line. (Otherwise the same as .option().)
      *
      * The `flags` string contains the short and/or long flags, separated by comma, a pipe or space.
      *
      * @param {string} flags
      * @param {string} [description]
      * @param {Function|*} [parseArg] - custom option processing function or default value
      * @param {*} [defaultValue]
      * @return {Command} `this` command for chaining
      */
    
      requiredOption(flags, description, parseArg, defaultValue) {
        return this._optionEx({ mandatory: true }, flags, description, parseArg, defaultValue);
      }
    
      /**
       * Alter parsing of short flags with optional values.
       *
       * @example
       * // for `.option('-f,--flag [value]'):
       * program.combineFlagAndOptionalValue(true);  // `-f80` is treated like `--flag=80`, this is the default behaviour
       * program.combineFlagAndOptionalValue(false) // `-fb` is treated like `-f -b`
       *
       * @param {Boolean} [combine=true] - if `true` or omitted, an optional value can be specified directly after the flag.
       */
      combineFlagAndOptionalValue(combine = true) {
        this._combineFlagAndOptionalValue = !!combine;
        return this;
      }
    
      /**
       * Allow unknown options on the command line.
       *
       * @param {Boolean} [allowUnknown=true] - if `true` or omitted, no error will be thrown
       * for unknown options.
       */
      allowUnknownOption(allowUnknown = true) {
        this._allowUnknownOption = !!allowUnknown;
        return this;
      }
    
      /**
       * Allow excess command-arguments on the command line. Pass false to make excess arguments an error.
       *
       * @param {Boolean} [allowExcess=true] - if `true` or omitted, no error will be thrown
       * for excess arguments.
       */
      allowExcessArguments(allowExcess = true) {
        this._allowExcessArguments = !!allowExcess;
        return this;
      }
    
      /**
       * Enable positional options. Positional means global options are specified before subcommands which lets
       * subcommands reuse the same option names, and also enables subcommands to turn on passThroughOptions.
       * The default behaviour is non-positional and global options may appear anywhere on the command line.
       *
       * @param {Boolean} [positional=true]
       */
      enablePositionalOptions(positional = true) {
        this._enablePositionalOptions = !!positional;
        return this;
      }
    
      /**
       * Pass through options that come after command-arguments rather than treat them as command-options,
       * so actual command-options come before command-arguments. Turning this on for a subcommand requires
       * positional options to have been enabled on the program (parent commands).
       * The default behaviour is non-positional and options may appear before or after command-arguments.
       *
       * @param {Boolean} [passThrough=true]
       * for unknown options.
       */
      passThroughOptions(passThrough = true) {
        this._passThroughOptions = !!passThrough;
        if (!!this.parent && passThrough && !this.parent._enablePositionalOptions) {
          throw new Error('passThroughOptions can not be used without turning on enablePositionalOptions for parent command(s)');
        }
        return this;
      }
    
      /**
        * Whether to store option values as properties on command object,
        * or store separately (specify false). In both cases the option values can be accessed using .opts().
        *
        * @param {boolean} [storeAsProperties=true]
        * @return {Command} `this` command for chaining
        */
    
      storeOptionsAsProperties(storeAsProperties = true) {
        if (this.options.length) {
          throw new Error('call .storeOptionsAsProperties() before adding options');
        }
        // if (Object.keys(this._optionValues).length) {
        //   throw new Error('call .storeOptionsAsProperties() before setting option values');
        // }
        this._storeOptionsAsProperties = !!storeAsProperties;
        return this;
      }
    
      /**
       * Retrieve option value.
       *
       * @param {string} key
       * @return {Object} value
       */
    
      getOptionValue(key) {
        if (this._storeOptionsAsProperties) {
          return this[key];
        }
        return this._optionValues[key];
      }
    
      /**
       * Store option value.
       *
       * @param {string} key
       * @param {Object} value
       * @return {Command} `this` command for chaining
       */
    
      setOptionValue(key, value) {
        return this.setOptionValueWithSource(key, value, undefined);
      }
    
      /**
        * Store option value and where the value came from.
        *
        * @param {string} key
        * @param {Object} value
        * @param {string} source - expected values are default/config/env/cli/implied
        * @return {Command} `this` command for chaining
        */
    
      setOptionValueWithSource(key, value, source) {
        if (this._storeOptionsAsProperties) {
          this[key] = value;
        } else {
          this._optionValues[key] = value;
        }
        this._optionValueSources[key] = source;
        return this;
      }
    
      /**
        * Get source of option value.
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
    
      getOptionValueSource(key) {
        return this._optionValueSources[key];
      }
    
      /**
        * Get source of option value. See also .optsWithGlobals().
        * Expected values are default | config | env | cli | implied
        *
        * @param {string} key
        * @return {string}
        */
    
      getOptionValueSourceWithGlobals(key) {
        // global overwrites local, like optsWithGlobals
        let source;
        this._getCommandAndAncestors().forEach((cmd) => {
          if (cmd.getOptionValueSource(key) !== undefined) {
            source = cmd.getOptionValueSource(key);
          }
        });
        return source;
      }
    
      /**
       * Get user arguments from implied or explicit arguments.
       * Side-effects: set _scriptPath if args included script. Used for default program name, and subcommand searches.
       *
       * @api private
       */
    
      _prepareUserArgs(argv, parseOptions) {
        if (argv !== undefined && !Array.isArray(argv)) {
          throw new Error('first parameter to parse must be array or undefined');
        }
        parseOptions = parseOptions || {};
    
        // Default to using process.argv
        if (argv === undefined) {
          argv = process.argv;
          // @ts-ignore: unknown property
          if (process.versions && process.versions.electron) {
            parseOptions.from = 'electron';
          }
        }
        this.rawArgs = argv.slice();
    
        // make it a little easier for callers by supporting various argv conventions
        let userArgs;
        switch (parseOptions.from) {
          case undefined:
          case 'node':
            this._scriptPath = argv[1];
            userArgs = argv.slice(2);
            break;
          case 'electron':
            // @ts-ignore: unknown property
            if (process.defaultApp) {
              this._scriptPath = argv[1];
              userArgs = argv.slice(2);
            } else {
              userArgs = argv.slice(1);
            }
            break;
          case 'user':
            userArgs = argv.slice(0);
            break;
          default:
            throw new Error(`unexpected parse option { from: '${parseOptions.from}' }`);
        }
    
        // Find default name for program from arguments.
        if (!this._name && this._scriptPath) this.nameFromFilename(this._scriptPath);
        this._name = this._name || 'program';
    
        return userArgs;
      }
    
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * program.parse(process.argv);
       * program.parse(); // implicitly use process.argv and auto-detect node vs electron conventions
       * program.parse(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv] - optional, defaults to process.argv
       * @param {Object} [parseOptions] - optionally specify style of options with from: node/user/electron
       * @param {string} [parseOptions.from] - where the args are from: 'node', 'user', 'electron'
       * @return {Command} `this` command for chaining
       */
    
      parse(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        this._parseCommand([], userArgs);
    
        return this;
      }
    
      /**
       * Parse `argv`, setting options and invoking commands when defined.
       *
       * Use parseAsync instead of parse if any of your action handlers are async. Returns a Promise.
       *
       * The default expectation is that the arguments are from node and have the application as argv[0]
       * and the script being run in argv[1], with user parameters after that.
       *
       * @example
       * await program.parseAsync(process.argv);
       * await program.parseAsync(); // implicitly use process.argv and auto-detect node vs electron conventions
       * await program.parseAsync(my-args, { from: 'user' }); // just user supplied arguments, nothing special about argv[0]
       *
       * @param {string[]} [argv]
       * @param {Object} [parseOptions]
       * @param {string} parseOptions.from - where the args are from: 'node', 'user', 'electron'
       * @return {Promise}
       */
    
      async parseAsync(argv, parseOptions) {
        const userArgs = this._prepareUserArgs(argv, parseOptions);
        await this._parseCommand([], userArgs);
    
        return this;
      }
    
      /**
       * Execute a sub-command executable.
       *
       * @api private
       */
    
      _executeSubCommand(subcommand, args) {
        args = args.slice();
        let launchWithNode = false; // Use node for source targets so do not need to get permissions correct, and on Windows.
        const sourceExt = ['.js', '.ts', '.tsx', '.mjs', '.cjs'];
    
        function findFile(baseDir, baseName) {
          // Look for specified file
          const localBin = path.resolve(baseDir, baseName);
          if (fs.existsSync(localBin)) return localBin;
    
          // Stop looking if candidate already has an expected extension.
          if (sourceExt.includes(path.extname(baseName))) return undefined;
    
          // Try all the extensions.
          const foundExt = sourceExt.find(ext => fs.existsSync(`${localBin}${ext}`));
          if (foundExt) return `${localBin}${foundExt}`;
    
          return undefined;
        }
    
        // Not checking for help first. Unlikely to have mandatory and executable, and can't robustly test for help flags in external command.
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
    
        // executableFile and executableDir might be full path, or just a name
        let executableFile = subcommand._executableFile || `${this._name}-${subcommand._name}`;
        let executableDir = this._executableDir || '';
        if (this._scriptPath) {
          let resolvedScriptPath; // resolve possible symlink for installed npm binary
          try {
            resolvedScriptPath = fs.realpathSync(this._scriptPath);
          } catch (err) {
            resolvedScriptPath = this._scriptPath;
          }
          executableDir = path.resolve(path.dirname(resolvedScriptPath), executableDir);
        }
    
        // Look for a local file in preference to a command in PATH.
        if (executableDir) {
          let localFile = findFile(executableDir, executableFile);
    
          // Legacy search using prefix of script name instead of command name
          if (!localFile && !subcommand._executableFile && this._scriptPath) {
            const legacyName = path.basename(this._scriptPath, path.extname(this._scriptPath));
            if (legacyName !== this._name) {
              localFile = findFile(executableDir, `${legacyName}-${subcommand._name}`);
            }
          }
          executableFile = localFile || executableFile;
        }
    
        launchWithNode = sourceExt.includes(path.extname(executableFile));
    
        let proc;
        if (process.platform !== 'win32') {
          if (launchWithNode) {
            args.unshift(executableFile);
            // add executable arguments to spawn
            args = incrementNodeInspectorPort(process.execArgv).concat(args);
    
            proc = childProcess.spawn(process.argv[0], args, { stdio: 'inherit' });
          } else {
            proc = childProcess.spawn(executableFile, args, { stdio: 'inherit' });
          }
        } else {
          args.unshift(executableFile);
          // add executable arguments to spawn
          args = incrementNodeInspectorPort(process.execArgv).concat(args);
          proc = childProcess.spawn(process.execPath, args, { stdio: 'inherit' });
        }
    
        if (!proc.killed) { // testing mainly to avoid leak warnings during unit tests with mocked spawn
          const signals = ['SIGUSR1', 'SIGUSR2', 'SIGTERM', 'SIGINT', 'SIGHUP'];
          signals.forEach((signal) => {
            // @ts-ignore
            process.on(signal, () => {
              if (proc.killed === false && proc.exitCode === null) {
                proc.kill(signal);
              }
            });
          });
        }
    
        // By default terminate process when spawned process terminates.
        // Suppressing the exit if exitCallback defined is a bit messy and of limited use, but does allow process to stay running!
        const exitCallback = this._exitCallback;
        if (!exitCallback) {
          proc.on('close', process.exit.bind(process));
        } else {
          proc.on('close', () => {
            exitCallback(new CommanderError(process.exitCode || 0, 'commander.executeSubCommandAsync', '(close)'));
          });
        }
        proc.on('error', (err) => {
          // @ts-ignore
          if (err.code === 'ENOENT') {
            const executableDirMessage = executableDir
              ? `searched for local subcommand relative to directory '${executableDir}'`
              : 'no directory for search for local subcommand, use .executableDir() to supply a custom directory';
            const executableMissing = `'${executableFile}' does not exist
     - if '${subcommand._name}' is not meant to be an executable command, remove description parameter from '.command()' and use '.description()' instead
     - if the default executable name is not suitable, use the executableFile option to supply a custom name or path
     - ${executableDirMessage}`;
            throw new Error(executableMissing);
          // @ts-ignore
          } else if (err.code === 'EACCES') {
            throw new Error(`'${executableFile}' not executable`);
          }
          if (!exitCallback) {
            process.exit(1);
          } else {
            const wrappedError = new CommanderError(1, 'commander.executeSubCommandAsync', '(error)');
            wrappedError.nestedError = err;
            exitCallback(wrappedError);
          }
        });
    
        // Store the reference to the child process
        this.runningCommand = proc;
      }
    
      /**
       * @api private
       */
    
      _dispatchSubcommand(commandName, operands, unknown) {
        const subCommand = this._findCommand(commandName);
        if (!subCommand) this.help({ error: true });
    
        let promiseChain;
        promiseChain = this._chainOrCallSubCommandHook(promiseChain, subCommand, 'preSubcommand');
        promiseChain = this._chainOrCall(promiseChain, () => {
          if (subCommand._executableHandler) {
            this._executeSubCommand(subCommand, operands.concat(unknown));
          } else {
            return subCommand._parseCommand(operands, unknown);
          }
        });
        return promiseChain;
      }
    
      /**
       * Invoke help directly if possible, or dispatch if necessary.
       * e.g. help foo
       *
       * @api private
       */
    
      _dispatchHelpCommand(subcommandName) {
        if (!subcommandName) {
          this.help();
        }
        const subCommand = this._findCommand(subcommandName);
        if (subCommand && !subCommand._executableHandler) {
          subCommand.help();
        }
    
        // Fallback to parsing the help flag to invoke the help.
        return this._dispatchSubcommand(subcommandName, [], [
          this._helpLongFlag || this._helpShortFlag
        ]);
      }
    
      /**
       * Check this.args against expected this.registeredArguments.
       *
       * @api private
       */
    
      _checkNumberOfArguments() {
        // too few
        this.registeredArguments.forEach((arg, i) => {
          if (arg.required && this.args[i] == null) {
            this.missingArgument(arg.name());
          }
        });
        // too many
        if (this.registeredArguments.length > 0 && this.registeredArguments[this.registeredArguments.length - 1].variadic) {
          return;
        }
        if (this.args.length > this.registeredArguments.length) {
          this._excessArguments(this.args);
        }
      }
    
      /**
       * Process this.args using this.registeredArguments and save as this.processedArgs!
       *
       * @api private
       */
    
      _processArguments() {
        const myParseArg = (argument, value, previous) => {
          // Extra processing for nice error message on parsing failure.
          let parsedValue = value;
          if (value !== null && argument.parseArg) {
            const invalidValueMessage = `error: command-argument value '${value}' is invalid for argument '${argument.name()}'.`;
            parsedValue = this._callParseArg(argument, value, previous, invalidValueMessage);
          }
          return parsedValue;
        };
    
        this._checkNumberOfArguments();
    
        const processedArgs = [];
        this.registeredArguments.forEach((declaredArg, index) => {
          let value = declaredArg.defaultValue;
          if (declaredArg.variadic) {
            // Collect together remaining arguments for passing together as an array.
            if (index < this.args.length) {
              value = this.args.slice(index);
              if (declaredArg.parseArg) {
                value = value.reduce((processed, v) => {
                  return myParseArg(declaredArg, v, processed);
                }, declaredArg.defaultValue);
              }
            } else if (value === undefined) {
              value = [];
            }
          } else if (index < this.args.length) {
            value = this.args[index];
            if (declaredArg.parseArg) {
              value = myParseArg(declaredArg, value, declaredArg.defaultValue);
            }
          }
          processedArgs[index] = value;
        });
        this.processedArgs = processedArgs;
      }
    
      /**
       * Once we have a promise we chain, but call synchronously until then.
       *
       * @param {Promise|undefined} promise
       * @param {Function} fn
       * @return {Promise|undefined}
       * @api private
       */
    
      _chainOrCall(promise, fn) {
        // thenable
        if (promise && promise.then && typeof promise.then === 'function') {
          // already have a promise, chain callback
          return promise.then(() => fn());
        }
        // callback might return a promise
        return fn();
      }
    
      /**
       *
       * @param {Promise|undefined} promise
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
    
      _chainOrCallHooks(promise, event) {
        let result = promise;
        const hooks = [];
        this._getCommandAndAncestors()
          .reverse()
          .filter(cmd => cmd._lifeCycleHooks[event] !== undefined)
          .forEach(hookedCommand => {
            hookedCommand._lifeCycleHooks[event].forEach((callback) => {
              hooks.push({ hookedCommand, callback });
            });
          });
        if (event === 'postAction') {
          hooks.reverse();
        }
    
        hooks.forEach((hookDetail) => {
          result = this._chainOrCall(result, () => {
            return hookDetail.callback(hookDetail.hookedCommand, this);
          });
        });
        return result;
      }
    
      /**
       *
       * @param {Promise|undefined} promise
       * @param {Command} subCommand
       * @param {string} event
       * @return {Promise|undefined}
       * @api private
       */
    
      _chainOrCallSubCommandHook(promise, subCommand, event) {
        let result = promise;
        if (this._lifeCycleHooks[event] !== undefined) {
          this._lifeCycleHooks[event].forEach((hook) => {
            result = this._chainOrCall(result, () => {
              return hook(this, subCommand);
            });
          });
        }
        return result;
      }
    
      /**
       * Process arguments in context of this command.
       * Returns action result, in case it is a promise.
       *
       * @api private
       */
    
      _parseCommand(operands, unknown) {
        const parsed = this.parseOptions(unknown);
        this._parseOptionsEnv(); // after cli, so parseArg not called on both cli and env
        this._parseOptionsImplied();
        operands = operands.concat(parsed.operands);
        unknown = parsed.unknown;
        this.args = operands.concat(unknown);
    
        if (operands && this._findCommand(operands[0])) {
          return this._dispatchSubcommand(operands[0], operands.slice(1), unknown);
        }
        if (this._hasImplicitHelpCommand() && operands[0] === this._helpCommandName) {
          return this._dispatchHelpCommand(operands[1]);
        }
        if (this._defaultCommandName) {
          outputHelpIfRequested(this, unknown); // Run the help for default command from parent rather than passing to default command
          return this._dispatchSubcommand(this._defaultCommandName, operands, unknown);
        }
        if (this.commands.length && this.args.length === 0 && !this._actionHandler && !this._defaultCommandName) {
          // probably missing subcommand and no handler, user needs help (and exit)
          this.help({ error: true });
        }
    
        outputHelpIfRequested(this, parsed.unknown);
        this._checkForMissingMandatoryOptions();
        this._checkForConflictingOptions();
    
        // We do not always call this check to avoid masking a "better" error, like unknown command.
        const checkForUnknownOptions = () => {
          if (parsed.unknown.length > 0) {
            this.unknownOption(parsed.unknown[0]);
          }
        };
    
        const commandEvent = `command:${this.name()}`;
        if (this._actionHandler) {
          checkForUnknownOptions();
          this._processArguments();
    
          let promiseChain;
          promiseChain = this._chainOrCallHooks(promiseChain, 'preAction');
          promiseChain = this._chainOrCall(promiseChain, () => this._actionHandler(this.processedArgs));
          if (this.parent) {
            promiseChain = this._chainOrCall(promiseChain, () => {
              this.parent.emit(commandEvent, operands, unknown); // legacy
            });
          }
          promiseChain = this._chainOrCallHooks(promiseChain, 'postAction');
          return promiseChain;
        }
        if (this.parent && this.parent.listenerCount(commandEvent)) {
          checkForUnknownOptions();
          this._processArguments();
          this.parent.emit(commandEvent, operands, unknown); // legacy
        } else if (operands.length) {
          if (this._findCommand('*')) { // legacy default command
            return this._dispatchSubcommand('*', operands, unknown);
          }
          if (this.listenerCount('command:*')) {
            // skip option check, emit event for possible misspelling suggestion
            this.emit('command:*', operands, unknown);
          } else if (this.commands.length) {
            this.unknownCommand();
          } else {
            checkForUnknownOptions();
            this._processArguments();
          }
        } else if (this.commands.length) {
          checkForUnknownOptions();
          // This command has subcommands and nothing hooked up at this level, so display help (and exit).
          this.help({ error: true });
        } else {
          checkForUnknownOptions();
          this._processArguments();
          // fall through for caller to handle after calling .parse()
        }
      }
    
      /**
       * Find matching command.
       *
       * @api private
       */
      _findCommand(name) {
        if (!name) return undefined;
        return this.commands.find(cmd => cmd._name === name || cmd._aliases.includes(name));
      }
    
      /**
       * Return an option matching `arg` if any.
       *
       * @param {string} arg
       * @return {Option}
       * @api private
       */
    
      _findOption(arg) {
        return this.options.find(option => option.is(arg));
      }
    
      /**
       * Display an error message if a mandatory option does not have a value.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
    
      _checkForMissingMandatoryOptions() {
        // Walk up hierarchy so can call in subcommand after checking for displaying help.
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd.options.forEach((anOption) => {
            if (anOption.mandatory && (cmd.getOptionValue(anOption.attributeName()) === undefined)) {
              cmd.missingMandatoryOptionValue(anOption);
            }
          });
        });
      }
    
      /**
       * Display an error message if conflicting options are used together in this.
       *
       * @api private
       */
      _checkForConflictingLocalOptions() {
        const definedNonDefaultOptions = this.options.filter(
          (option) => {
            const optionKey = option.attributeName();
            if (this.getOptionValue(optionKey) === undefined) {
              return false;
            }
            return this.getOptionValueSource(optionKey) !== 'default';
          }
        );
    
        const optionsWithConflicting = definedNonDefaultOptions.filter(
          (option) => option.conflictsWith.length > 0
        );
    
        optionsWithConflicting.forEach((option) => {
          const conflictingAndDefined = definedNonDefaultOptions.find((defined) =>
            option.conflictsWith.includes(defined.attributeName())
          );
          if (conflictingAndDefined) {
            this._conflictingOption(option, conflictingAndDefined);
          }
        });
      }
    
      /**
       * Display an error message if conflicting options are used together.
       * Called after checking for help flags in leaf subcommand.
       *
       * @api private
       */
      _checkForConflictingOptions() {
        // Walk up hierarchy so can call in subcommand after checking for displaying help.
        this._getCommandAndAncestors().forEach((cmd) => {
          cmd._checkForConflictingLocalOptions();
        });
      }
    
      /**
       * Parse options from `argv` removing known options,
       * and return argv split into operands and unknown arguments.
       *
       * Examples:
       *
       *     argv => operands, unknown
       *     --known kkk op => [op], []
       *     op --known kkk => [op], []
       *     sub --unknown uuu op => [sub], [--unknown uuu op]
       *     sub -- --unknown uuu op => [sub --unknown uuu op], []
       *
       * @param {String[]} argv
       * @return {{operands: String[], unknown: String[]}}
       */
    
      parseOptions(argv) {
        const operands = []; // operands, not options or values
        const unknown = []; // first unknown option and remaining unknown args
        let dest = operands;
        const args = argv.slice();
    
        function maybeOption(arg) {
          return arg.length > 1 && arg[0] === '-';
        }
    
        // parse options
        let activeVariadicOption = null;
        while (args.length) {
          const arg = args.shift();
    
          // literal
          if (arg === '--') {
            if (dest === unknown) dest.push(arg);
            dest.push(...args);
            break;
          }
    
          if (activeVariadicOption && !maybeOption(arg)) {
            this.emit(`option:${activeVariadicOption.name()}`, arg);
            continue;
          }
          activeVariadicOption = null;
    
          if (maybeOption(arg)) {
            const option = this._findOption(arg);
            // recognised option, call listener to assign value with possible custom processing
            if (option) {
              if (option.required) {
                const value = args.shift();
                if (value === undefined) this.optionMissingArgument(option);
                this.emit(`option:${option.name()}`, value);
              } else if (option.optional) {
                let value = null;
                // historical behaviour is optional value is following arg unless an option
                if (args.length > 0 && !maybeOption(args[0])) {
                  value = args.shift();
                }
                this.emit(`option:${option.name()}`, value);
              } else { // boolean flag
                this.emit(`option:${option.name()}`);
              }
              activeVariadicOption = option.variadic ? option : null;
              continue;
            }
          }
    
          // Look for combo options following single dash, eat first one if known.
          if (arg.length > 2 && arg[0] === '-' && arg[1] !== '-') {
            const option = this._findOption(`-${arg[1]}`);
            if (option) {
              if (option.required || (option.optional && this._combineFlagAndOptionalValue)) {
                // option with value following in same argument
                this.emit(`option:${option.name()}`, arg.slice(2));
              } else {
                // boolean option, emit and put back remainder of arg for further processing
                this.emit(`option:${option.name()}`);
                args.unshift(`-${arg.slice(2)}`);
              }
              continue;
            }
          }
    
          // Look for known long flag with value, like --foo=bar
          if (/^--[^=]+=/.test(arg)) {
            const index = arg.indexOf('=');
            const option = this._findOption(arg.slice(0, index));
            if (option && (option.required || option.optional)) {
              this.emit(`option:${option.name()}`, arg.slice(index + 1));
              continue;
            }
          }
    
          // Not a recognised option by this command.
          // Might be a command-argument, or subcommand option, or unknown option, or help command or option.
    
          // An unknown option means further arguments also classified as unknown so can be reprocessed by subcommands.
          if (maybeOption(arg)) {
            dest = unknown;
          }
    
          // If using positionalOptions, stop processing our options at subcommand.
          if ((this._enablePositionalOptions || this._passThroughOptions) && operands.length === 0 && unknown.length === 0) {
            if (this._findCommand(arg)) {
              operands.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            } else if (arg === this._helpCommandName && this._hasImplicitHelpCommand()) {
              operands.push(arg);
              if (args.length > 0) operands.push(...args);
              break;
            } else if (this._defaultCommandName) {
              unknown.push(arg);
              if (args.length > 0) unknown.push(...args);
              break;
            }
          }
    
          // If using passThroughOptions, stop processing options at first command-argument.
          if (this._passThroughOptions) {
            dest.push(arg);
            if (args.length > 0) dest.push(...args);
            break;
          }
    
          // add arg
          dest.push(arg);
        }
    
        return { operands, unknown };
      }
    
      /**
       * Return an object containing local option values as key-value pairs.
       *
       * @return {Object}
       */
      opts() {
        if (this._storeOptionsAsProperties) {
          // Preserve original behaviour so backwards compatible when still using properties
          const result = {};
          const len = this.options.length;
    
          for (let i = 0; i < len; i++) {
            const key = this.options[i].attributeName();
            result[key] = key === this._versionOptionName ? this._version : this[key];
          }
          return result;
        }
    
        return this._optionValues;
      }
    
      /**
       * Return an object containing merged local and global option values as key-value pairs.
       *
       * @return {Object}
       */
      optsWithGlobals() {
        // globals overwrite locals
        return this._getCommandAndAncestors().reduce(
          (combinedOptions, cmd) => Object.assign(combinedOptions, cmd.opts()),
          {}
        );
      }
    
      /**
       * Display error message and exit (or call exitOverride).
       *
       * @param {string} message
       * @param {Object} [errorOptions]
       * @param {string} [errorOptions.code] - an id string representing the error
       * @param {number} [errorOptions.exitCode] - used with process.exit
       */
      error(message, errorOptions) {
        // output handling
        this._outputConfiguration.outputError(`${message}\n`, this._outputConfiguration.writeErr);
        if (typeof this._showHelpAfterError === 'string') {
          this._outputConfiguration.writeErr(`${this._showHelpAfterError}\n`);
        } else if (this._showHelpAfterError) {
          this._outputConfiguration.writeErr('\n');
          this.outputHelp({ error: true });
        }
    
        // exit handling
        const config = errorOptions || {};
        const exitCode = config.exitCode || 1;
        const code = config.code || 'commander.error';
        this._exit(exitCode, code, message);
      }
    
      /**
       * Apply any option related environment variables, if option does
       * not have a value from cli or client code.
       *
       * @api private
       */
      _parseOptionsEnv() {
        this.options.forEach((option) => {
          if (option.envVar && option.envVar in process.env) {
            const optionKey = option.attributeName();
            // Priority check. Do not overwrite cli or options from unknown source (client-code).
            if (this.getOptionValue(optionKey) === undefined || ['default', 'config', 'env'].includes(this.getOptionValueSource(optionKey))) {
              if (option.required || option.optional) { // option can take a value
                // keep very simple, optional always takes value
                this.emit(`optionEnv:${option.name()}`, process.env[option.envVar]);
              } else { // boolean
                // keep very simple, only care that envVar defined and not the value
                this.emit(`optionEnv:${option.name()}`);
              }
            }
          }
        });
      }
    
      /**
       * Apply any implied option values, if option is undefined or default value.
       *
       * @api private
       */
      _parseOptionsImplied() {
        const dualHelper = new DualOptions(this.options);
        const hasCustomOptionValue = (optionKey) => {
          return this.getOptionValue(optionKey) !== undefined && !['default', 'implied'].includes(this.getOptionValueSource(optionKey));
        };
        this.options
          .filter(option => (option.implied !== undefined) &&
            hasCustomOptionValue(option.attributeName()) &&
            dualHelper.valueFromOption(this.getOptionValue(option.attributeName()), option))
          .forEach((option) => {
            Object.keys(option.implied)
              .filter(impliedKey => !hasCustomOptionValue(impliedKey))
              .forEach(impliedKey => {
                this.setOptionValueWithSource(impliedKey, option.implied[impliedKey], 'implied');
              });
          });
      }
    
      /**
       * Argument `name` is missing.
       *
       * @param {string} name
       * @api private
       */
    
      missingArgument(name) {
        const message = `error: missing required argument '${name}'`;
        this.error(message, { code: 'commander.missingArgument' });
      }
    
      /**
       * `Option` is missing an argument.
       *
       * @param {Option} option
       * @api private
       */
    
      optionMissingArgument(option) {
        const message = `error: option '${option.flags}' argument missing`;
        this.error(message, { code: 'commander.optionMissingArgument' });
      }
    
      /**
       * `Option` does not have a value, and is a mandatory option.
       *
       * @param {Option} option
       * @api private
       */
    
      missingMandatoryOptionValue(option) {
        const message = `error: required option '${option.flags}' not specified`;
        this.error(message, { code: 'commander.missingMandatoryOptionValue' });
      }
    
      /**
       * `Option` conflicts with another option.
       *
       * @param {Option} option
       * @param {Option} conflictingOption
       * @api private
       */
      _conflictingOption(option, conflictingOption) {
        // The calling code does not know whether a negated option is the source of the
        // value, so do some work to take an educated guess.
        const findBestOptionFromValue = (option) => {
          const optionKey = option.attributeName();
          const optionValue = this.getOptionValue(optionKey);
          const negativeOption = this.options.find(target => target.negate && optionKey === target.attributeName());
          const positiveOption = this.options.find(target => !target.negate && optionKey === target.attributeName());
          if (negativeOption && (
            (negativeOption.presetArg === undefined && optionValue === false) ||
            (negativeOption.presetArg !== undefined && optionValue === negativeOption.presetArg)
          )) {
            return negativeOption;
          }
          return positiveOption || option;
        };
    
        const getErrorMessage = (option) => {
          const bestOption = findBestOptionFromValue(option);
          const optionKey = bestOption.attributeName();
          const source = this.getOptionValueSource(optionKey);
          if (source === 'env') {
            return `environment variable '${bestOption.envVar}'`;
          }
          return `option '${bestOption.flags}'`;
        };
    
        const message = `error: ${getErrorMessage(option)} cannot be used with ${getErrorMessage(conflictingOption)}`;
        this.error(message, { code: 'commander.conflictingOption' });
      }
    
      /**
       * Unknown option `flag`.
       *
       * @param {string} flag
       * @api private
       */
    
      unknownOption(flag) {
        if (this._allowUnknownOption) return;
        let suggestion = '';
    
        if (flag.startsWith('--') && this._showSuggestionAfterError) {
          // Looping to pick up the global options too
          let candidateFlags = [];
          let command = this;
          do {
            const moreFlags = command.createHelp().visibleOptions(command)
              .filter(option => option.long)
              .map(option => option.long);
            candidateFlags = candidateFlags.concat(moreFlags);
            command = command.parent;
          } while (command && !command._enablePositionalOptions);
          suggestion = suggestSimilar(flag, candidateFlags);
        }
    
        const message = `error: unknown option '${flag}'${suggestion}`;
        this.error(message, { code: 'commander.unknownOption' });
      }
    
      /**
       * Excess arguments, more than expected.
       *
       * @param {string[]} receivedArgs
       * @api private
       */
    
      _excessArguments(receivedArgs) {
        if (this._allowExcessArguments) return;
    
        const expected = this.registeredArguments.length;
        const s = (expected === 1) ? '' : 's';
        const forSubcommand = this.parent ? ` for '${this.name()}'` : '';
        const message = `error: too many arguments${forSubcommand}. Expected ${expected} argument${s} but got ${receivedArgs.length}.`;
        this.error(message, { code: 'commander.excessArguments' });
      }
    
      /**
       * Unknown command.
       *
       * @api private
       */
    
      unknownCommand() {
        const unknownName = this.args[0];
        let suggestion = '';
    
        if (this._showSuggestionAfterError) {
          const candidateNames = [];
          this.createHelp().visibleCommands(this).forEach((command) => {
            candidateNames.push(command.name());
            // just visible alias
            if (command.alias()) candidateNames.push(command.alias());
          });
          suggestion = suggestSimilar(unknownName, candidateNames);
        }
    
        const message = `error: unknown command '${unknownName}'${suggestion}`;
        this.error(message, { code: 'commander.unknownCommand' });
      }
    
      /**
       * Get or set the program version.
       *
       * This method auto-registers the "-V, --version" option which will print the version number.
       *
       * You can optionally supply the flags and description to override the defaults.
       *
       * @param {string} [str]
       * @param {string} [flags]
       * @param {string} [description]
       * @return {this | string | undefined} `this` command for chaining, or version string if no arguments
       */
    
      version(str, flags, description) {
        if (str === undefined) return this._version;
        this._version = str;
        flags = flags || '-V, --version';
        description = description || 'output the version number';
        const versionOption = this.createOption(flags, description);
        this._versionOptionName = versionOption.attributeName(); // [sic] not defined in constructor, partly legacy, partly only needed at root
        this.options.push(versionOption);
        this.on('option:' + versionOption.name(), () => {
          this._outputConfiguration.writeOut(`${str}\n`);
          this._exit(0, 'commander.version', str);
        });
        return this;
      }
    
      /**
       * Set the description.
       *
       * @param {string} [str]
       * @param {Object} [argsDescription]
       * @return {string|Command}
       */
      description(str, argsDescription) {
        if (str === undefined && argsDescription === undefined) return this._description;
        this._description = str;
        if (argsDescription) {
          this._argsDescription = argsDescription;
        }
        return this;
      }
    
      /**
       * Set the summary. Used when listed as subcommand of parent.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
      summary(str) {
        if (str === undefined) return this._summary;
        this._summary = str;
        return this;
      }
    
      /**
       * Set an alias for the command.
       *
       * You may call more than once to add multiple aliases. Only the first alias is shown in the auto-generated help.
       *
       * @param {string} [alias]
       * @return {string|Command}
       */
    
      alias(alias) {
        if (alias === undefined) return this._aliases[0]; // just return first, for backwards compatibility
    
        /** @type {Command} */
        let command = this;
        if (this.commands.length !== 0 && this.commands[this.commands.length - 1]._executableHandler) {
          // assume adding alias for last added executable subcommand, rather than this
          command = this.commands[this.commands.length - 1];
        }
    
        if (alias === command._name) throw new Error('Command alias can\'t be the same as its name');
    
        command._aliases.push(alias);
        return this;
      }
    
      /**
       * Set aliases for the command.
       *
       * Only the first alias is shown in the auto-generated help.
       *
       * @param {string[]} [aliases]
       * @return {string[]|Command}
       */
    
      aliases(aliases) {
        // Getter for the array of aliases is the main reason for having aliases() in addition to alias().
        if (aliases === undefined) return this._aliases;
    
        aliases.forEach((alias) => this.alias(alias));
        return this;
      }
    
      /**
       * Set / get the command usage `str`.
       *
       * @param {string} [str]
       * @return {String|Command}
       */
    
      usage(str) {
        if (str === undefined) {
          if (this._usage) return this._usage;
    
          const args = this.registeredArguments.map((arg) => {
            return humanReadableArgName(arg);
          });
          return [].concat(
            (this.options.length || this._hasHelpOption ? '[options]' : []),
            (this.commands.length ? '[command]' : []),
            (this.registeredArguments.length ? args : [])
          ).join(' ');
        }
    
        this._usage = str;
        return this;
      }
    
      /**
       * Get or set the name of the command.
       *
       * @param {string} [str]
       * @return {string|Command}
       */
    
      name(str) {
        if (str === undefined) return this._name;
        this._name = str;
        return this;
      }
    
      /**
       * Set the name of the command from script filename, such as process.argv[1],
       * or require.main.filename, or __filename.
       *
       * (Used internally and public although not documented in README.)
       *
       * @example
       * program.nameFromFilename(require.main.filename);
       *
       * @param {string} filename
       * @return {Command}
       */
    
      nameFromFilename(filename) {
        this._name = path.basename(filename, path.extname(filename));
    
        return this;
      }
    
      /**
       * Get or set the directory for searching for executable subcommands of this command.
       *
       * @example
       * program.executableDir(__dirname);
       * // or
       * program.executableDir('subcommands');
       *
       * @param {string} [path]
       * @return {string|null|Command}
       */
    
      executableDir(path) {
        if (path === undefined) return this._executableDir;
        this._executableDir = path;
        return this;
      }
    
      /**
       * Return program help documentation.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to wrap for stderr instead of stdout
       * @return {string}
       */
    
      helpInformation(contextOptions) {
        const helper = this.createHelp();
        if (helper.helpWidth === undefined) {
          helper.helpWidth = (contextOptions && contextOptions.error) ? this._outputConfiguration.getErrHelpWidth() : this._outputConfiguration.getOutHelpWidth();
        }
        return helper.formatHelp(this, helper);
      }
    
      /**
       * @api private
       */
    
      _getHelpContext(contextOptions) {
        contextOptions = contextOptions || {};
        const context = { error: !!contextOptions.error };
        let write;
        if (context.error) {
          write = (arg) => this._outputConfiguration.writeErr(arg);
        } else {
          write = (arg) => this._outputConfiguration.writeOut(arg);
        }
        context.write = contextOptions.write || write;
        context.command = this;
        return context;
      }
    
      /**
       * Output help information for this command.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean } | Function} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
    
      outputHelp(contextOptions) {
        let deprecatedCallback;
        if (typeof contextOptions === 'function') {
          deprecatedCallback = contextOptions;
          contextOptions = undefined;
        }
        const context = this._getHelpContext(contextOptions);
    
        this._getCommandAndAncestors().reverse().forEach(command => command.emit('beforeAllHelp', context));
        this.emit('beforeHelp', context);
    
        let helpInformation = this.helpInformation(context);
        if (deprecatedCallback) {
          helpInformation = deprecatedCallback(helpInformation);
          if (typeof helpInformation !== 'string' && !Buffer.isBuffer(helpInformation)) {
            throw new Error('outputHelp callback must return a string or a Buffer');
          }
        }
        context.write(helpInformation);
    
        if (this._helpLongFlag) {
          this.emit(this._helpLongFlag); // deprecated
        }
        this.emit('afterHelp', context);
        this._getCommandAndAncestors().forEach(command => command.emit('afterAllHelp', context));
      }
    
      /**
       * You can pass in flags and a description to override the help
       * flags and help description for your command. Pass in false to
       * disable the built-in help option.
       *
       * @param {string | boolean} [flags]
       * @param {string} [description]
       * @return {Command} `this` command for chaining
       */
    
      helpOption(flags, description) {
        if (typeof flags === 'boolean') {
          this._hasHelpOption = flags;
          return this;
        }
        this._helpFlags = flags || this._helpFlags;
        this._helpDescription = description || this._helpDescription;
    
        const helpFlags = splitOptionFlags(this._helpFlags);
        this._helpShortFlag = helpFlags.shortFlag;
        this._helpLongFlag = helpFlags.longFlag;
    
        return this;
      }
    
      /**
       * Output help information and exit.
       *
       * Outputs built-in help, and custom text added using `.addHelpText()`.
       *
       * @param {{ error: boolean }} [contextOptions] - pass {error:true} to write to stderr instead of stdout
       */
    
      help(contextOptions) {
        this.outputHelp(contextOptions);
        let exitCode = process.exitCode || 0;
        if (exitCode === 0 && contextOptions && typeof contextOptions !== 'function' && contextOptions.error) {
          exitCode = 1;
        }
        // message: do not have all displayed text available so only passing placeholder.
        this._exit(exitCode, 'commander.help', '(outputHelp)');
      }
    
      /**
       * Add additional text to be displayed with the built-in help.
       *
       * Position is 'before' or 'after' to affect just this command,
       * and 'beforeAll' or 'afterAll' to affect this command and all its subcommands.
       *
       * @param {string} position - before or after built-in help
       * @param {string | Function} text - string to add, or a function returning a string
       * @return {Command} `this` command for chaining
       */
      addHelpText(position, text) {
        const allowedValues = ['beforeAll', 'before', 'after', 'afterAll'];
        if (!allowedValues.includes(position)) {
          throw new Error(`Unexpected value for position to addHelpText.
    Expecting one of '${allowedValues.join("', '")}'`);
        }
        const helpEvent = `${position}Help`;
        this.on(helpEvent, (context) => {
          let helpStr;
          if (typeof text === 'function') {
            helpStr = text({ error: context.error, command: context.command });
          } else {
            helpStr = text;
          }
          // Ignore falsy value when nothing to output.
          if (helpStr) {
            context.write(`${helpStr}\n`);
          }
        });
        return this;
      }
    }
    
    /**
     * Output help information if help flags specified
     *
     * @param {Command} cmd - command to output help for
     * @param {Array} args - array of options to search for help flags
     * @api private
     */
    
    function outputHelpIfRequested(cmd, args) {
      const helpOption = cmd._hasHelpOption && args.find(arg => arg === cmd._helpLongFlag || arg === cmd._helpShortFlag);
      if (helpOption) {
        cmd.outputHelp();
        // (Do not have all displayed text available so only passing placeholder.)
        cmd._exit(0, 'commander.helpDisplayed', '(outputHelp)');
      }
    }
    
    /**
     * Scan arguments and increment port number for inspect calls (to avoid conflicts when spawning new command).
     *
     * @param {string[]} args - array of arguments from node.execArgv
     * @returns {string[]}
     * @api private
     */
    
    function incrementNodeInspectorPort(args) {
      // Testing for these options:
      //  --inspect[=[host:]port]
      //  --inspect-brk[=[host:]port]
      //  --inspect-port=[host:]port
      return args.map((arg) => {
        if (!arg.startsWith('--inspect')) {
          return arg;
        }
        let debugOption;
        let debugHost = '127.0.0.1';
        let debugPort = '9229';
        let match;
        if ((match = arg.match(/^(--inspect(-brk)?)$/)) !== null) {
          // e.g. --inspect
          debugOption = match[1];
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+)$/)) !== null) {
          debugOption = match[1];
          if (/^\d+$/.test(match[3])) {
            // e.g. --inspect=1234
            debugPort = match[3];
          } else {
            // e.g. --inspect=localhost
            debugHost = match[3];
          }
        } else if ((match = arg.match(/^(--inspect(-brk|-port)?)=([^:]+):(\d+)$/)) !== null) {
          // e.g. --inspect=localhost:1234
          debugOption = match[1];
          debugHost = match[3];
          debugPort = match[4];
        }
    
        if (debugOption && debugPort !== '0') {
          return `${debugOption}=${debugHost}:${parseInt(debugPort) + 1}`;
        }
        return arg;
      });
    }
    
    exports.Command = Command;
    
    
    /***/ }),
    
    /***/ 7823:
    /***/ ((__unused_webpack_module, exports) => {
    
    /**
     * CommanderError class
     * @class
     */
    class CommanderError extends Error {
      /**
       * Constructs the CommanderError class
       * @param {number} exitCode suggested exit code which could be used with process.exit
       * @param {string} code an id string representing the error
       * @param {string} message human-readable description of the error
       * @constructor
       */
      constructor(exitCode, code, message) {
        super(message);
        // properly capture stack trace in Node.js
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
        this.code = code;
        this.exitCode = exitCode;
        this.nestedError = undefined;
      }
    }
    
    /**
     * InvalidArgumentError class
     * @class
     */
    class InvalidArgumentError extends CommanderError {
      /**
       * Constructs the InvalidArgumentError class
       * @param {string} [message] explanation of why argument is invalid
       * @constructor
       */
      constructor(message) {
        super(1, 'commander.invalidArgument', message);
        // properly capture stack trace in Node.js
        Error.captureStackTrace(this, this.constructor);
        this.name = this.constructor.name;
      }
    }
    
    exports.CommanderError = CommanderError;
    exports.InvalidArgumentError = InvalidArgumentError;
    
    
    /***/ }),
    
    /***/ 8355:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    const { humanReadableArgName } = __nccwpck_require__(5861);
    
    /**
     * TypeScript import types for JSDoc, used by Visual Studio Code IntelliSense and `npm run typescript-checkJS`
     * https://www.typescriptlang.org/docs/handbook/jsdoc-supported-types.html#import-types
     * @typedef { import("./argument.js").Argument } Argument
     * @typedef { import("./command.js").Command } Command
     * @typedef { import("./option.js").Option } Option
     */
    
    // Although this is a class, methods are static in style to allow override using subclass or just functions.
    class Help {
      constructor() {
        this.helpWidth = undefined;
        this.sortSubcommands = false;
        this.sortOptions = false;
        this.showGlobalOptions = false;
      }
    
      /**
       * Get an array of the visible subcommands. Includes a placeholder for the implicit help command, if there is one.
       *
       * @param {Command} cmd
       * @returns {Command[]}
       */
    
      visibleCommands(cmd) {
        const visibleCommands = cmd.commands.filter(cmd => !cmd._hidden);
        if (cmd._hasImplicitHelpCommand()) {
          // Create a command matching the implicit help command.
          const [, helpName, helpArgs] = cmd._helpCommandnameAndArgs.match(/([^ ]+) *(.*)/);
          const helpCommand = cmd.createCommand(helpName)
            .helpOption(false);
          helpCommand.description(cmd._helpCommandDescription);
          if (helpArgs) helpCommand.arguments(helpArgs);
          visibleCommands.push(helpCommand);
        }
        if (this.sortSubcommands) {
          visibleCommands.sort((a, b) => {
            // @ts-ignore: overloaded return type
            return a.name().localeCompare(b.name());
          });
        }
        return visibleCommands;
      }
    
      /**
       * Compare options for sort.
       *
       * @param {Option} a
       * @param {Option} b
       * @returns number
       */
      compareOptions(a, b) {
        const getSortKey = (option) => {
          // WYSIWYG for order displayed in help. Short used for comparison if present. No special handling for negated.
          return option.short ? option.short.replace(/^-/, '') : option.long.replace(/^--/, '');
        };
        return getSortKey(a).localeCompare(getSortKey(b));
      }
    
      /**
       * Get an array of the visible options. Includes a placeholder for the implicit help option, if there is one.
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
    
      visibleOptions(cmd) {
        const visibleOptions = cmd.options.filter((option) => !option.hidden);
        // Implicit help
        const showShortHelpFlag = cmd._hasHelpOption && cmd._helpShortFlag && !cmd._findOption(cmd._helpShortFlag);
        const showLongHelpFlag = cmd._hasHelpOption && !cmd._findOption(cmd._helpLongFlag);
        if (showShortHelpFlag || showLongHelpFlag) {
          let helpOption;
          if (!showShortHelpFlag) {
            helpOption = cmd.createOption(cmd._helpLongFlag, cmd._helpDescription);
          } else if (!showLongHelpFlag) {
            helpOption = cmd.createOption(cmd._helpShortFlag, cmd._helpDescription);
          } else {
            helpOption = cmd.createOption(cmd._helpFlags, cmd._helpDescription);
          }
          visibleOptions.push(helpOption);
        }
        if (this.sortOptions) {
          visibleOptions.sort(this.compareOptions);
        }
        return visibleOptions;
      }
    
      /**
       * Get an array of the visible global options. (Not including help.)
       *
       * @param {Command} cmd
       * @returns {Option[]}
       */
    
      visibleGlobalOptions(cmd) {
        if (!this.showGlobalOptions) return [];
    
        const globalOptions = [];
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          const visibleOptions = ancestorCmd.options.filter((option) => !option.hidden);
          globalOptions.push(...visibleOptions);
        }
        if (this.sortOptions) {
          globalOptions.sort(this.compareOptions);
        }
        return globalOptions;
      }
    
      /**
       * Get an array of the arguments if any have a description.
       *
       * @param {Command} cmd
       * @returns {Argument[]}
       */
    
      visibleArguments(cmd) {
        // Side effect! Apply the legacy descriptions before the arguments are displayed.
        if (cmd._argsDescription) {
          cmd.registeredArguments.forEach(argument => {
            argument.description = argument.description || cmd._argsDescription[argument.name()] || '';
          });
        }
    
        // If there are any arguments with a description then return all the arguments.
        if (cmd.registeredArguments.find(argument => argument.description)) {
          return cmd.registeredArguments;
        }
        return [];
      }
    
      /**
       * Get the command term to show in the list of subcommands.
       *
       * @param {Command} cmd
       * @returns {string}
       */
    
      subcommandTerm(cmd) {
        // Legacy. Ignores custom usage string, and nested commands.
        const args = cmd.registeredArguments.map(arg => humanReadableArgName(arg)).join(' ');
        return cmd._name +
          (cmd._aliases[0] ? '|' + cmd._aliases[0] : '') +
          (cmd.options.length ? ' [options]' : '') + // simplistic check for non-help option
          (args ? ' ' + args : '');
      }
    
      /**
       * Get the option term to show in the list of options.
       *
       * @param {Option} option
       * @returns {string}
       */
    
      optionTerm(option) {
        return option.flags;
      }
    
      /**
       * Get the argument term to show in the list of arguments.
       *
       * @param {Argument} argument
       * @returns {string}
       */
    
      argumentTerm(argument) {
        return argument.name();
      }
    
      /**
       * Get the longest command term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
    
      longestSubcommandTermLength(cmd, helper) {
        return helper.visibleCommands(cmd).reduce((max, command) => {
          return Math.max(max, helper.subcommandTerm(command).length);
        }, 0);
      }
    
      /**
       * Get the longest option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
    
      longestOptionTermLength(cmd, helper) {
        return helper.visibleOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
    
      /**
       * Get the longest global option term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
    
      longestGlobalOptionTermLength(cmd, helper) {
        return helper.visibleGlobalOptions(cmd).reduce((max, option) => {
          return Math.max(max, helper.optionTerm(option).length);
        }, 0);
      }
    
      /**
       * Get the longest argument term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
    
      longestArgumentTermLength(cmd, helper) {
        return helper.visibleArguments(cmd).reduce((max, argument) => {
          return Math.max(max, helper.argumentTerm(argument).length);
        }, 0);
      }
    
      /**
       * Get the command usage to be displayed at the top of the built-in help.
       *
       * @param {Command} cmd
       * @returns {string}
       */
    
      commandUsage(cmd) {
        // Usage
        let cmdName = cmd._name;
        if (cmd._aliases[0]) {
          cmdName = cmdName + '|' + cmd._aliases[0];
        }
        let ancestorCmdNames = '';
        for (let ancestorCmd = cmd.parent; ancestorCmd; ancestorCmd = ancestorCmd.parent) {
          ancestorCmdNames = ancestorCmd.name() + ' ' + ancestorCmdNames;
        }
        return ancestorCmdNames + cmdName + ' ' + cmd.usage();
      }
    
      /**
       * Get the description for the command.
       *
       * @param {Command} cmd
       * @returns {string}
       */
    
      commandDescription(cmd) {
        // @ts-ignore: overloaded return type
        return cmd.description();
      }
    
      /**
       * Get the subcommand summary to show in the list of subcommands.
       * (Fallback to description for backwards compatibility.)
       *
       * @param {Command} cmd
       * @returns {string}
       */
    
      subcommandDescription(cmd) {
        // @ts-ignore: overloaded return type
        return cmd.summary() || cmd.description();
      }
    
      /**
       * Get the option description to show in the list of options.
       *
       * @param {Option} option
       * @return {string}
       */
    
      optionDescription(option) {
        const extraInfo = [];
    
        if (option.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${option.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`);
        }
        if (option.defaultValue !== undefined) {
          // default for boolean and negated more for programmer than end user,
          // but show true/false for boolean option as may be for hand-rolled env or config processing.
          const showDefault = option.required || option.optional ||
            (option.isBoolean() && typeof option.defaultValue === 'boolean');
          if (showDefault) {
            extraInfo.push(`default: ${option.defaultValueDescription || JSON.stringify(option.defaultValue)}`);
          }
        }
        // preset for boolean and negated are more for programmer than end user
        if (option.presetArg !== undefined && option.optional) {
          extraInfo.push(`preset: ${JSON.stringify(option.presetArg)}`);
        }
        if (option.envVar !== undefined) {
          extraInfo.push(`env: ${option.envVar}`);
        }
        if (extraInfo.length > 0) {
          return `${option.description} (${extraInfo.join(', ')})`;
        }
    
        return option.description;
      }
    
      /**
       * Get the argument description to show in the list of arguments.
       *
       * @param {Argument} argument
       * @return {string}
       */
    
      argumentDescription(argument) {
        const extraInfo = [];
        if (argument.argChoices) {
          extraInfo.push(
            // use stringify to match the display of the default value
            `choices: ${argument.argChoices.map((choice) => JSON.stringify(choice)).join(', ')}`);
        }
        if (argument.defaultValue !== undefined) {
          extraInfo.push(`default: ${argument.defaultValueDescription || JSON.stringify(argument.defaultValue)}`);
        }
        if (extraInfo.length > 0) {
          const extraDescripton = `(${extraInfo.join(', ')})`;
          if (argument.description) {
            return `${argument.description} ${extraDescripton}`;
          }
          return extraDescripton;
        }
        return argument.description;
      }
    
      /**
       * Generate the built-in help text.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {string}
       */
    
      formatHelp(cmd, helper) {
        const termWidth = helper.padWidth(cmd, helper);
        const helpWidth = helper.helpWidth || 80;
        const itemIndentWidth = 2;
        const itemSeparatorWidth = 2; // between term and description
        function formatItem(term, description) {
          if (description) {
            const fullText = `${term.padEnd(termWidth + itemSeparatorWidth)}${description}`;
            return helper.wrap(fullText, helpWidth - itemIndentWidth, termWidth + itemSeparatorWidth);
          }
          return term;
        }
        function formatList(textArray) {
          return textArray.join('\n').replace(/^/gm, ' '.repeat(itemIndentWidth));
        }
    
        // Usage
        let output = [`Usage: ${helper.commandUsage(cmd)}`, ''];
    
        // Description
        const commandDescription = helper.commandDescription(cmd);
        if (commandDescription.length > 0) {
          output = output.concat([helper.wrap(commandDescription, helpWidth, 0), '']);
        }
    
        // Arguments
        const argumentList = helper.visibleArguments(cmd).map((argument) => {
          return formatItem(helper.argumentTerm(argument), helper.argumentDescription(argument));
        });
        if (argumentList.length > 0) {
          output = output.concat(['Arguments:', formatList(argumentList), '']);
        }
    
        // Options
        const optionList = helper.visibleOptions(cmd).map((option) => {
          return formatItem(helper.optionTerm(option), helper.optionDescription(option));
        });
        if (optionList.length > 0) {
          output = output.concat(['Options:', formatList(optionList), '']);
        }
    
        if (this.showGlobalOptions) {
          const globalOptionList = helper.visibleGlobalOptions(cmd).map((option) => {
            return formatItem(helper.optionTerm(option), helper.optionDescription(option));
          });
          if (globalOptionList.length > 0) {
            output = output.concat(['Global Options:', formatList(globalOptionList), '']);
          }
        }
    
        // Commands
        const commandList = helper.visibleCommands(cmd).map((cmd) => {
          return formatItem(helper.subcommandTerm(cmd), helper.subcommandDescription(cmd));
        });
        if (commandList.length > 0) {
          output = output.concat(['Commands:', formatList(commandList), '']);
        }
    
        return output.join('\n');
      }
    
      /**
       * Calculate the pad width from the maximum term length.
       *
       * @param {Command} cmd
       * @param {Help} helper
       * @returns {number}
       */
    
      padWidth(cmd, helper) {
        return Math.max(
          helper.longestOptionTermLength(cmd, helper),
          helper.longestGlobalOptionTermLength(cmd, helper),
          helper.longestSubcommandTermLength(cmd, helper),
          helper.longestArgumentTermLength(cmd, helper)
        );
      }
    
      /**
       * Wrap the given string to width characters per line, with lines after the first indented.
       * Do not wrap if insufficient room for wrapping (minColumnWidth), or string is manually formatted.
       *
       * @param {string} str
       * @param {number} width
       * @param {number} indent
       * @param {number} [minColumnWidth=40]
       * @return {string}
       *
       */
    
      wrap(str, width, indent, minColumnWidth = 40) {
        // Full \s characters, minus the linefeeds.
        const indents = ' \\f\\t\\v\u00a0\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff';
        // Detect manually wrapped and indented strings by searching for line break followed by spaces.
        const manualIndent = new RegExp(`[\\n][${indents}]+`);
        if (str.match(manualIndent)) return str;
        // Do not wrap if not enough room for a wrapped column of text (as could end up with a word per line).
        const columnWidth = width - indent;
        if (columnWidth < minColumnWidth) return str;
    
        const leadingStr = str.slice(0, indent);
        const columnText = str.slice(indent).replace('\r\n', '\n');
        const indentString = ' '.repeat(indent);
        const zeroWidthSpace = '\u200B';
        const breaks = `\\s${zeroWidthSpace}`;
        // Match line end (so empty lines don't collapse),
        // or as much text as will fit in column, or excess text up to first break.
        const regex = new RegExp(`\n|.{1,${columnWidth - 1}}([${breaks}]|$)|[^${breaks}]+?([${breaks}]|$)`, 'g');
        const lines = columnText.match(regex) || [];
        return leadingStr + lines.map((line, i) => {
          if (line === '\n') return ''; // preserve empty lines
          return ((i > 0) ? indentString : '') + line.trimEnd();
        }).join('\n');
      }
    }
    
    exports.Help = Help;
    
    
    /***/ }),
    
    /***/ 3126:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    const { InvalidArgumentError } = __nccwpck_require__(7823);
    
    class Option {
      /**
       * Initialize a new `Option` with the given `flags` and `description`.
       *
       * @param {string} flags
       * @param {string} [description]
       */
    
      constructor(flags, description) {
        this.flags = flags;
        this.description = description || '';
    
        this.required = flags.includes('<'); // A value must be supplied when the option is specified.
        this.optional = flags.includes('['); // A value is optional when the option is specified.
        // variadic test ignores <value,...> et al which might be used to describe custom splitting of single argument
        this.variadic = /\w\.\.\.[>\]]$/.test(flags); // The option can take multiple values.
        this.mandatory = false; // The option must have a value after parsing, which usually means it must be specified on command line.
        const optionFlags = splitOptionFlags(flags);
        this.short = optionFlags.shortFlag;
        this.long = optionFlags.longFlag;
        this.negate = false;
        if (this.long) {
          this.negate = this.long.startsWith('--no-');
        }
        this.defaultValue = undefined;
        this.defaultValueDescription = undefined;
        this.presetArg = undefined;
        this.envVar = undefined;
        this.parseArg = undefined;
        this.hidden = false;
        this.argChoices = undefined;
        this.conflictsWith = [];
        this.implied = undefined;
      }
    
      /**
       * Set the default value, and optionally supply the description to be displayed in the help.
       *
       * @param {*} value
       * @param {string} [description]
       * @return {Option}
       */
    
      default(value, description) {
        this.defaultValue = value;
        this.defaultValueDescription = description;
        return this;
      }
    
      /**
       * Preset to use when option used without option-argument, especially optional but also boolean and negated.
       * The custom processing (parseArg) is called.
       *
       * @example
       * new Option('--color').default('GREYSCALE').preset('RGB');
       * new Option('--donate [amount]').preset('20').argParser(parseFloat);
       *
       * @param {*} arg
       * @return {Option}
       */
    
      preset(arg) {
        this.presetArg = arg;
        return this;
      }
    
      /**
       * Add option name(s) that conflict with this option.
       * An error will be displayed if conflicting options are found during parsing.
       *
       * @example
       * new Option('--rgb').conflicts('cmyk');
       * new Option('--js').conflicts(['ts', 'jsx']);
       *
       * @param {string | string[]} names
       * @return {Option}
       */
    
      conflicts(names) {
        this.conflictsWith = this.conflictsWith.concat(names);
        return this;
      }
    
      /**
       * Specify implied option values for when this option is set and the implied options are not.
       *
       * The custom processing (parseArg) is not called on the implied values.
       *
       * @example
       * program
       *   .addOption(new Option('--log', 'write logging information to file'))
       *   .addOption(new Option('--trace', 'log extra details').implies({ log: 'trace.txt' }));
       *
       * @param {Object} impliedOptionValues
       * @return {Option}
       */
      implies(impliedOptionValues) {
        let newImplied = impliedOptionValues;
        if (typeof impliedOptionValues === 'string') {
          // string is not documented, but easy mistake and we can do what user probably intended.
          newImplied = { [impliedOptionValues]: true };
        }
        this.implied = Object.assign(this.implied || {}, newImplied);
        return this;
      }
    
      /**
       * Set environment variable to check for option value.
       *
       * An environment variable is only used if when processed the current option value is
       * undefined, or the source of the current value is 'default' or 'config' or 'env'.
       *
       * @param {string} name
       * @return {Option}
       */
    
      env(name) {
        this.envVar = name;
        return this;
      }
    
      /**
       * Set the custom handler for processing CLI option arguments into option values.
       *
       * @param {Function} [fn]
       * @return {Option}
       */
    
      argParser(fn) {
        this.parseArg = fn;
        return this;
      }
    
      /**
       * Whether the option is mandatory and must have a value after parsing.
       *
       * @param {boolean} [mandatory=true]
       * @return {Option}
       */
    
      makeOptionMandatory(mandatory = true) {
        this.mandatory = !!mandatory;
        return this;
      }
    
      /**
       * Hide option in help.
       *
       * @param {boolean} [hide=true]
       * @return {Option}
       */
    
      hideHelp(hide = true) {
        this.hidden = !!hide;
        return this;
      }
    
      /**
       * @api private
       */
    
      _concatValue(value, previous) {
        if (previous === this.defaultValue || !Array.isArray(previous)) {
          return [value];
        }
    
        return previous.concat(value);
      }
    
      /**
       * Only allow option value to be one of choices.
       *
       * @param {string[]} values
       * @return {Option}
       */
    
      choices(values) {
        this.argChoices = values.slice();
        this.parseArg = (arg, previous) => {
          if (!this.argChoices.includes(arg)) {
            throw new InvalidArgumentError(`Allowed choices are ${this.argChoices.join(', ')}.`);
          }
          if (this.variadic) {
            return this._concatValue(arg, previous);
          }
          return arg;
        };
        return this;
      }
    
      /**
       * Return option name.
       *
       * @return {string}
       */
    
      name() {
        if (this.long) {
          return this.long.replace(/^--/, '');
        }
        return this.short.replace(/^-/, '');
      }
    
      /**
       * Return option name, in a camelcase format that can be used
       * as a object attribute key.
       *
       * @return {string}
       * @api private
       */
    
      attributeName() {
        return camelcase(this.name().replace(/^no-/, ''));
      }
    
      /**
       * Check if `arg` matches the short or long flag.
       *
       * @param {string} arg
       * @return {boolean}
       * @api private
       */
    
      is(arg) {
        return this.short === arg || this.long === arg;
      }
    
      /**
       * Return whether a boolean option.
       *
       * Options are one of boolean, negated, required argument, or optional argument.
       *
       * @return {boolean}
       * @api private
       */
    
      isBoolean() {
        return !this.required && !this.optional && !this.negate;
      }
    }
    
    /**
     * This class is to make it easier to work with dual options, without changing the existing
     * implementation. We support separate dual options for separate positive and negative options,
     * like `--build` and `--no-build`, which share a single option value. This works nicely for some
     * use cases, but is tricky for others where we want separate behaviours despite
     * the single shared option value.
     */
    class DualOptions {
      /**
       * @param {Option[]} options
       */
      constructor(options) {
        this.positiveOptions = new Map();
        this.negativeOptions = new Map();
        this.dualOptions = new Set();
        options.forEach(option => {
          if (option.negate) {
            this.negativeOptions.set(option.attributeName(), option);
          } else {
            this.positiveOptions.set(option.attributeName(), option);
          }
        });
        this.negativeOptions.forEach((value, key) => {
          if (this.positiveOptions.has(key)) {
            this.dualOptions.add(key);
          }
        });
      }
    
      /**
       * Did the value come from the option, and not from possible matching dual option?
       *
       * @param {*} value
       * @param {Option} option
       * @returns {boolean}
       */
      valueFromOption(value, option) {
        const optionKey = option.attributeName();
        if (!this.dualOptions.has(optionKey)) return true;
    
        // Use the value to deduce if (probably) came from the option.
        const preset = this.negativeOptions.get(optionKey).presetArg;
        const negativeValue = (preset !== undefined) ? preset : false;
        return option.negate === (negativeValue === value);
      }
    }
    
    /**
     * Convert string from kebab-case to camelCase.
     *
     * @param {string} str
     * @return {string}
     * @api private
     */
    
    function camelcase(str) {
      return str.split('-').reduce((str, word) => {
        return str + word[0].toUpperCase() + word.slice(1);
      });
    }
    
    /**
     * Split the short and long flag out of something like '-m,--mixed <value>'
     *
     * @api private
     */
    
    function splitOptionFlags(flags) {
      let shortFlag;
      let longFlag;
      // Use original very loose parsing to maintain backwards compatibility for now,
      // which allowed for example unintended `-sw, --short-word` [sic].
      const flagParts = flags.split(/[ |,]+/);
      if (flagParts.length > 1 && !/^[[<]/.test(flagParts[1])) shortFlag = flagParts.shift();
      longFlag = flagParts.shift();
      // Add support for lone short flag without significantly changing parsing!
      if (!shortFlag && /^-[^-]$/.test(longFlag)) {
        shortFlag = longFlag;
        longFlag = undefined;
      }
      return { shortFlag, longFlag };
    }
    
    exports.Option = Option;
    exports.splitOptionFlags = splitOptionFlags;
    exports.DualOptions = DualOptions;
    
    
    /***/ }),
    
    /***/ 4276:
    /***/ ((__unused_webpack_module, exports) => {
    
    const maxDistance = 3;
    
    function editDistance(a, b) {
      // https://en.wikipedia.org/wiki/Damerau–Levenshtein_distance
      // Calculating optimal string alignment distance, no substring is edited more than once.
      // (Simple implementation.)
    
      // Quick early exit, return worst case.
      if (Math.abs(a.length - b.length) > maxDistance) return Math.max(a.length, b.length);
    
      // distance between prefix substrings of a and b
      const d = [];
    
      // pure deletions turn a into empty string
      for (let i = 0; i <= a.length; i++) {
        d[i] = [i];
      }
      // pure insertions turn empty string into b
      for (let j = 0; j <= b.length; j++) {
        d[0][j] = j;
      }
    
      // fill matrix
      for (let j = 1; j <= b.length; j++) {
        for (let i = 1; i <= a.length; i++) {
          let cost = 1;
          if (a[i - 1] === b[j - 1]) {
            cost = 0;
          } else {
            cost = 1;
          }
          d[i][j] = Math.min(
            d[i - 1][j] + 1, // deletion
            d[i][j - 1] + 1, // insertion
            d[i - 1][j - 1] + cost // substitution
          );
          // transposition
          if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) {
            d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
          }
        }
      }
    
      return d[a.length][b.length];
    }
    
    /**
     * Find close matches, restricted to same number of edits.
     *
     * @param {string} word
     * @param {string[]} candidates
     * @returns {string}
     */
    
    function suggestSimilar(word, candidates) {
      if (!candidates || candidates.length === 0) return '';
      // remove possible duplicates
      candidates = Array.from(new Set(candidates));
    
      const searchingOptions = word.startsWith('--');
      if (searchingOptions) {
        word = word.slice(2);
        candidates = candidates.map(candidate => candidate.slice(2));
      }
    
      let similar = [];
      let bestDistance = maxDistance;
      const minSimilarity = 0.4;
      candidates.forEach((candidate) => {
        if (candidate.length <= 1) return; // no one character guesses
    
        const distance = editDistance(word, candidate);
        const length = Math.max(word.length, candidate.length);
        const similarity = (length - distance) / length;
        if (similarity > minSimilarity) {
          if (distance < bestDistance) {
            // better edit distance, throw away previous worse matches
            bestDistance = distance;
            similar = [candidate];
          } else if (distance === bestDistance) {
            similar.push(candidate);
          }
        }
      });
    
      similar.sort((a, b) => a.localeCompare(b));
      if (searchingOptions) {
        similar = similar.map(candidate => `--${candidate}`);
      }
    
      if (similar.length > 1) {
        return `\n(Did you mean one of ${similar.join(', ')}?)`;
      }
      if (similar.length === 1) {
        return `\n(Did you mean ${similar[0]}?)`;
      }
      return '';
    }
    
    exports.suggestSimilar = suggestSimilar;
    
    
    /***/ }),
    
    /***/ 1485:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Glob = void 0;
    const minimatch_1 = __nccwpck_require__(8092);
    const node_url_1 = __nccwpck_require__(1041);
    const path_scurry_1 = __nccwpck_require__(7349);
    const pattern_js_1 = __nccwpck_require__(8521);
    const walker_js_1 = __nccwpck_require__(3601);
    // if no process global, just call it linux.
    // so we default to case-sensitive, / separators
    const defaultPlatform = (typeof process === 'object' &&
        process &&
        typeof process.platform === 'string') ?
        process.platform
        : 'linux';
    /**
     * An object that can perform glob pattern traversals.
     */
    class Glob {
        absolute;
        cwd;
        root;
        dot;
        dotRelative;
        follow;
        ignore;
        magicalBraces;
        mark;
        matchBase;
        maxDepth;
        nobrace;
        nocase;
        nodir;
        noext;
        noglobstar;
        pattern;
        platform;
        realpath;
        scurry;
        stat;
        signal;
        windowsPathsNoEscape;
        withFileTypes;
        includeChildMatches;
        /**
         * The options provided to the constructor.
         */
        opts;
        /**
         * An array of parsed immutable {@link Pattern} objects.
         */
        patterns;
        /**
         * All options are stored as properties on the `Glob` object.
         *
         * See {@link GlobOptions} for full options descriptions.
         *
         * Note that a previous `Glob` object can be passed as the
         * `GlobOptions` to another `Glob` instantiation to re-use settings
         * and caches with a new pattern.
         *
         * Traversal functions can be called multiple times to run the walk
         * again.
         */
        constructor(pattern, opts) {
            /* c8 ignore start */
            if (!opts)
                throw new TypeError('glob options required');
            /* c8 ignore stop */
            this.withFileTypes = !!opts.withFileTypes;
            this.signal = opts.signal;
            this.follow = !!opts.follow;
            this.dot = !!opts.dot;
            this.dotRelative = !!opts.dotRelative;
            this.nodir = !!opts.nodir;
            this.mark = !!opts.mark;
            if (!opts.cwd) {
                this.cwd = '';
            }
            else if (opts.cwd instanceof URL || opts.cwd.startsWith('file://')) {
                opts.cwd = (0, node_url_1.fileURLToPath)(opts.cwd);
            }
            this.cwd = opts.cwd || '';
            this.root = opts.root;
            this.magicalBraces = !!opts.magicalBraces;
            this.nobrace = !!opts.nobrace;
            this.noext = !!opts.noext;
            this.realpath = !!opts.realpath;
            this.absolute = opts.absolute;
            this.includeChildMatches = opts.includeChildMatches !== false;
            this.noglobstar = !!opts.noglobstar;
            this.matchBase = !!opts.matchBase;
            this.maxDepth =
                typeof opts.maxDepth === 'number' ? opts.maxDepth : Infinity;
            this.stat = !!opts.stat;
            this.ignore = opts.ignore;
            if (this.withFileTypes && this.absolute !== undefined) {
                throw new Error('cannot set absolute and withFileTypes:true');
            }
            if (typeof pattern === 'string') {
                pattern = [pattern];
            }
            this.windowsPathsNoEscape =
                !!opts.windowsPathsNoEscape ||
                    opts.allowWindowsEscape ===
                        false;
            if (this.windowsPathsNoEscape) {
                pattern = pattern.map(p => p.replace(/\\/g, '/'));
            }
            if (this.matchBase) {
                if (opts.noglobstar) {
                    throw new TypeError('base matching requires globstar');
                }
                pattern = pattern.map(p => (p.includes('/') ? p : `./**/${p}`));
            }
            this.pattern = pattern;
            this.platform = opts.platform || defaultPlatform;
            this.opts = { ...opts, platform: this.platform };
            if (opts.scurry) {
                this.scurry = opts.scurry;
                if (opts.nocase !== undefined &&
                    opts.nocase !== opts.scurry.nocase) {
                    throw new Error('nocase option contradicts provided scurry option');
                }
            }
            else {
                const Scurry = opts.platform === 'win32' ? path_scurry_1.PathScurryWin32
                    : opts.platform === 'darwin' ? path_scurry_1.PathScurryDarwin
                        : opts.platform ? path_scurry_1.PathScurryPosix
                            : path_scurry_1.PathScurry;
                this.scurry = new Scurry(this.cwd, {
                    nocase: opts.nocase,
                    fs: opts.fs,
                });
            }
            this.nocase = this.scurry.nocase;
            // If you do nocase:true on a case-sensitive file system, then
            // we need to use regexps instead of strings for non-magic
            // path portions, because statting `aBc` won't return results
            // for the file `AbC` for example.
            const nocaseMagicOnly = this.platform === 'darwin' || this.platform === 'win32';
            const mmo = {
                // default nocase based on platform
                ...opts,
                dot: this.dot,
                matchBase: this.matchBase,
                nobrace: this.nobrace,
                nocase: this.nocase,
                nocaseMagicOnly,
                nocomment: true,
                noext: this.noext,
                nonegate: true,
                optimizationLevel: 2,
                platform: this.platform,
                windowsPathsNoEscape: this.windowsPathsNoEscape,
                debug: !!this.opts.debug,
            };
            const mms = this.pattern.map(p => new minimatch_1.Minimatch(p, mmo));
            const [matchSet, globParts] = mms.reduce((set, m) => {
                set[0].push(...m.set);
                set[1].push(...m.globParts);
                return set;
            }, [[], []]);
            this.patterns = matchSet.map((set, i) => {
                const g = globParts[i];
                /* c8 ignore start */
                if (!g)
                    throw new Error('invalid pattern object');
                /* c8 ignore stop */
                return new pattern_js_1.Pattern(set, g, 0, this.platform);
            });
        }
        async walk() {
            // Walkers always return array of Path objects, so we just have to
            // coerce them into the right shape.  It will have already called
            // realpath() if the option was set to do so, so we know that's cached.
            // start out knowing the cwd, at least
            return [
                ...(await new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
                    ...this.opts,
                    maxDepth: this.maxDepth !== Infinity ?
                        this.maxDepth + this.scurry.cwd.depth()
                        : Infinity,
                    platform: this.platform,
                    nocase: this.nocase,
                    includeChildMatches: this.includeChildMatches,
                }).walk()),
            ];
        }
        walkSync() {
            return [
                ...new walker_js_1.GlobWalker(this.patterns, this.scurry.cwd, {
                    ...this.opts,
                    maxDepth: this.maxDepth !== Infinity ?
                        this.maxDepth + this.scurry.cwd.depth()
                        : Infinity,
                    platform: this.platform,
                    nocase: this.nocase,
                    includeChildMatches: this.includeChildMatches,
                }).walkSync(),
            ];
        }
        stream() {
            return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
                ...this.opts,
                maxDepth: this.maxDepth !== Infinity ?
                    this.maxDepth + this.scurry.cwd.depth()
                    : Infinity,
                platform: this.platform,
                nocase: this.nocase,
                includeChildMatches: this.includeChildMatches,
            }).stream();
        }
        streamSync() {
            return new walker_js_1.GlobStream(this.patterns, this.scurry.cwd, {
                ...this.opts,
                maxDepth: this.maxDepth !== Infinity ?
                    this.maxDepth + this.scurry.cwd.depth()
                    : Infinity,
                platform: this.platform,
                nocase: this.nocase,
                includeChildMatches: this.includeChildMatches,
            }).streamSync();
        }
        /**
         * Default sync iteration function. Returns a Generator that
         * iterates over the results.
         */
        iterateSync() {
            return this.streamSync()[Symbol.iterator]();
        }
        [Symbol.iterator]() {
            return this.iterateSync();
        }
        /**
         * Default async iteration function. Returns an AsyncGenerator that
         * iterates over the results.
         */
        iterate() {
            return this.stream()[Symbol.asyncIterator]();
        }
        [Symbol.asyncIterator]() {
            return this.iterate();
        }
    }
    exports.Glob = Glob;
    //# sourceMappingURL=glob.js.map
    
    /***/ }),
    
    /***/ 4867:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.hasMagic = void 0;
    const minimatch_1 = __nccwpck_require__(8092);
    /**
     * Return true if the patterns provided contain any magic glob characters,
     * given the options provided.
     *
     * Brace expansion is not considered "magic" unless the `magicalBraces` option
     * is set, as brace expansion just turns one string into an array of strings.
     * So a pattern like `'x{a,b}y'` would return `false`, because `'xay'` and
     * `'xby'` both do not contain any magic glob characters, and it's treated the
     * same as if you had called it on `['xay', 'xby']`. When `magicalBraces:true`
     * is in the options, brace expansion _is_ treated as a pattern having magic.
     */
    const hasMagic = (pattern, options = {}) => {
        if (!Array.isArray(pattern)) {
            pattern = [pattern];
        }
        for (const p of pattern) {
            if (new minimatch_1.Minimatch(p, options).hasMagic())
                return true;
        }
        return false;
    };
    exports.hasMagic = hasMagic;
    //# sourceMappingURL=has-magic.js.map
    
    /***/ }),
    
    /***/ 9410:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    // give it a pattern, and it'll be able to tell you if
    // a given path should be ignored.
    // Ignoring a path ignores its children if the pattern ends in /**
    // Ignores are always parsed in dot:true mode
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Ignore = void 0;
    const minimatch_1 = __nccwpck_require__(8092);
    const pattern_js_1 = __nccwpck_require__(8521);
    const defaultPlatform = (typeof process === 'object' &&
        process &&
        typeof process.platform === 'string') ?
        process.platform
        : 'linux';
    /**
     * Class used to process ignored patterns
     */
    class Ignore {
        relative;
        relativeChildren;
        absolute;
        absoluteChildren;
        platform;
        mmopts;
        constructor(ignored, { nobrace, nocase, noext, noglobstar, platform = defaultPlatform, }) {
            this.relative = [];
            this.absolute = [];
            this.relativeChildren = [];
            this.absoluteChildren = [];
            this.platform = platform;
            this.mmopts = {
                dot: true,
                nobrace,
                nocase,
                noext,
                noglobstar,
                optimizationLevel: 2,
                platform,
                nocomment: true,
                nonegate: true,
            };
            for (const ign of ignored)
                this.add(ign);
        }
        add(ign) {
            // this is a little weird, but it gives us a clean set of optimized
            // minimatch matchers, without getting tripped up if one of them
            // ends in /** inside a brace section, and it's only inefficient at
            // the start of the walk, not along it.
            // It'd be nice if the Pattern class just had a .test() method, but
            // handling globstars is a bit of a pita, and that code already lives
            // in minimatch anyway.
            // Another way would be if maybe Minimatch could take its set/globParts
            // as an option, and then we could at least just use Pattern to test
            // for absolute-ness.
            // Yet another way, Minimatch could take an array of glob strings, and
            // a cwd option, and do the right thing.
            const mm = new minimatch_1.Minimatch(ign, this.mmopts);
            for (let i = 0; i < mm.set.length; i++) {
                const parsed = mm.set[i];
                const globParts = mm.globParts[i];
                /* c8 ignore start */
                if (!parsed || !globParts) {
                    throw new Error('invalid pattern object');
                }
                // strip off leading ./ portions
                // https://github.com/isaacs/node-glob/issues/570
                while (parsed[0] === '.' && globParts[0] === '.') {
                    parsed.shift();
                    globParts.shift();
                }
                /* c8 ignore stop */
                const p = new pattern_js_1.Pattern(parsed, globParts, 0, this.platform);
                const m = new minimatch_1.Minimatch(p.globString(), this.mmopts);
                const children = globParts[globParts.length - 1] === '**';
                const absolute = p.isAbsolute();
                if (absolute)
                    this.absolute.push(m);
                else
                    this.relative.push(m);
                if (children) {
                    if (absolute)
                        this.absoluteChildren.push(m);
                    else
                        this.relativeChildren.push(m);
                }
            }
        }
        ignored(p) {
            const fullpath = p.fullpath();
            const fullpaths = `${fullpath}/`;
            const relative = p.relative() || '.';
            const relatives = `${relative}/`;
            for (const m of this.relative) {
                if (m.match(relative) || m.match(relatives))
                    return true;
            }
            for (const m of this.absolute) {
                if (m.match(fullpath) || m.match(fullpaths))
                    return true;
            }
            return false;
        }
        childrenIgnored(p) {
            const fullpath = p.fullpath() + '/';
            const relative = (p.relative() || '.') + '/';
            for (const m of this.relativeChildren) {
                if (m.match(relative))
                    return true;
            }
            for (const m of this.absoluteChildren) {
                if (m.match(fullpath))
                    return true;
            }
            return false;
        }
    }
    exports.Ignore = Ignore;
    //# sourceMappingURL=ignore.js.map
    
    /***/ }),
    
    /***/ 189:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.glob = exports.sync = exports.iterate = exports.iterateSync = exports.stream = exports.streamSync = exports.Ignore = exports.hasMagic = exports.Glob = exports.unescape = exports.escape = void 0;
    exports.globStreamSync = globStreamSync;
    exports.globStream = globStream;
    exports.globSync = globSync;
    exports.globIterateSync = globIterateSync;
    exports.globIterate = globIterate;
    const minimatch_1 = __nccwpck_require__(8092);
    const glob_js_1 = __nccwpck_require__(1485);
    const has_magic_js_1 = __nccwpck_require__(4867);
    var minimatch_2 = __nccwpck_require__(8092);
    Object.defineProperty(exports, "escape", ({ enumerable: true, get: function () { return minimatch_2.escape; } }));
    Object.defineProperty(exports, "unescape", ({ enumerable: true, get: function () { return minimatch_2.unescape; } }));
    var glob_js_2 = __nccwpck_require__(1485);
    Object.defineProperty(exports, "Glob", ({ enumerable: true, get: function () { return glob_js_2.Glob; } }));
    var has_magic_js_2 = __nccwpck_require__(4867);
    Object.defineProperty(exports, "hasMagic", ({ enumerable: true, get: function () { return has_magic_js_2.hasMagic; } }));
    var ignore_js_1 = __nccwpck_require__(9410);
    Object.defineProperty(exports, "Ignore", ({ enumerable: true, get: function () { return ignore_js_1.Ignore; } }));
    function globStreamSync(pattern, options = {}) {
        return new glob_js_1.Glob(pattern, options).streamSync();
    }
    function globStream(pattern, options = {}) {
        return new glob_js_1.Glob(pattern, options).stream();
    }
    function globSync(pattern, options = {}) {
        return new glob_js_1.Glob(pattern, options).walkSync();
    }
    async function glob_(pattern, options = {}) {
        return new glob_js_1.Glob(pattern, options).walk();
    }
    function globIterateSync(pattern, options = {}) {
        return new glob_js_1.Glob(pattern, options).iterateSync();
    }
    function globIterate(pattern, options = {}) {
        return new glob_js_1.Glob(pattern, options).iterate();
    }
    // aliases: glob.sync.stream() glob.stream.sync() glob.sync() etc
    exports.streamSync = globStreamSync;
    exports.stream = Object.assign(globStream, { sync: globStreamSync });
    exports.iterateSync = globIterateSync;
    exports.iterate = Object.assign(globIterate, {
        sync: globIterateSync,
    });
    exports.sync = Object.assign(globSync, {
        stream: globStreamSync,
        iterate: globIterateSync,
    });
    exports.glob = Object.assign(glob_, {
        glob: glob_,
        globSync,
        sync: exports.sync,
        globStream,
        stream: exports.stream,
        globStreamSync,
        streamSync: exports.streamSync,
        globIterate,
        iterate: exports.iterate,
        globIterateSync,
        iterateSync: exports.iterateSync,
        Glob: glob_js_1.Glob,
        hasMagic: has_magic_js_1.hasMagic,
        escape: minimatch_1.escape,
        unescape: minimatch_1.unescape,
    });
    exports.glob.glob = exports.glob;
    //# sourceMappingURL=index.js.map
    
    /***/ }),
    
    /***/ 8521:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    // this is just a very light wrapper around 2 arrays with an offset index
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Pattern = void 0;
    const minimatch_1 = __nccwpck_require__(8092);
    const isPatternList = (pl) => pl.length >= 1;
    const isGlobList = (gl) => gl.length >= 1;
    /**
     * An immutable-ish view on an array of glob parts and their parsed
     * results
     */
    class Pattern {
        #patternList;
        #globList;
        #index;
        length;
        #platform;
        #rest;
        #globString;
        #isDrive;
        #isUNC;
        #isAbsolute;
        #followGlobstar = true;
        constructor(patternList, globList, index, platform) {
            if (!isPatternList(patternList)) {
                throw new TypeError('empty pattern list');
            }
            if (!isGlobList(globList)) {
                throw new TypeError('empty glob list');
            }
            if (globList.length !== patternList.length) {
                throw new TypeError('mismatched pattern list and glob list lengths');
            }
            this.length = patternList.length;
            if (index < 0 || index >= this.length) {
                throw new TypeError('index out of range');
            }
            this.#patternList = patternList;
            this.#globList = globList;
            this.#index = index;
            this.#platform = platform;
            // normalize root entries of absolute patterns on initial creation.
            if (this.#index === 0) {
                // c: => ['c:/']
                // C:/ => ['C:/']
                // C:/x => ['C:/', 'x']
                // //host/share => ['//host/share/']
                // //host/share/ => ['//host/share/']
                // //host/share/x => ['//host/share/', 'x']
                // /etc => ['/', 'etc']
                // / => ['/']
                if (this.isUNC()) {
                    // '' / '' / 'host' / 'share'
                    const [p0, p1, p2, p3, ...prest] = this.#patternList;
                    const [g0, g1, g2, g3, ...grest] = this.#globList;
                    if (prest[0] === '') {
                        // ends in /
                        prest.shift();
                        grest.shift();
                    }
                    const p = [p0, p1, p2, p3, ''].join('/');
                    const g = [g0, g1, g2, g3, ''].join('/');
                    this.#patternList = [p, ...prest];
                    this.#globList = [g, ...grest];
                    this.length = this.#patternList.length;
                }
                else if (this.isDrive() || this.isAbsolute()) {
                    const [p1, ...prest] = this.#patternList;
                    const [g1, ...grest] = this.#globList;
                    if (prest[0] === '') {
                        // ends in /
                        prest.shift();
                        grest.shift();
                    }
                    const p = p1 + '/';
                    const g = g1 + '/';
                    this.#patternList = [p, ...prest];
                    this.#globList = [g, ...grest];
                    this.length = this.#patternList.length;
                }
            }
        }
        /**
         * The first entry in the parsed list of patterns
         */
        pattern() {
            return this.#patternList[this.#index];
        }
        /**
         * true of if pattern() returns a string
         */
        isString() {
            return typeof this.#patternList[this.#index] === 'string';
        }
        /**
         * true of if pattern() returns GLOBSTAR
         */
        isGlobstar() {
            return this.#patternList[this.#index] === minimatch_1.GLOBSTAR;
        }
        /**
         * true if pattern() returns a regexp
         */
        isRegExp() {
            return this.#patternList[this.#index] instanceof RegExp;
        }
        /**
         * The /-joined set of glob parts that make up this pattern
         */
        globString() {
            return (this.#globString =
                this.#globString ||
                    (this.#index === 0 ?
                        this.isAbsolute() ?
                            this.#globList[0] + this.#globList.slice(1).join('/')
                            : this.#globList.join('/')
                        : this.#globList.slice(this.#index).join('/')));
        }
        /**
         * true if there are more pattern parts after this one
         */
        hasMore() {
            return this.length > this.#index + 1;
        }
        /**
         * The rest of the pattern after this part, or null if this is the end
         */
        rest() {
            if (this.#rest !== undefined)
                return this.#rest;
            if (!this.hasMore())
                return (this.#rest = null);
            this.#rest = new Pattern(this.#patternList, this.#globList, this.#index + 1, this.#platform);
            this.#rest.#isAbsolute = this.#isAbsolute;
            this.#rest.#isUNC = this.#isUNC;
            this.#rest.#isDrive = this.#isDrive;
            return this.#rest;
        }
        /**
         * true if the pattern represents a //unc/path/ on windows
         */
        isUNC() {
            const pl = this.#patternList;
            return this.#isUNC !== undefined ?
                this.#isUNC
                : (this.#isUNC =
                    this.#platform === 'win32' &&
                        this.#index === 0 &&
                        pl[0] === '' &&
                        pl[1] === '' &&
                        typeof pl[2] === 'string' &&
                        !!pl[2] &&
                        typeof pl[3] === 'string' &&
                        !!pl[3]);
        }
        // pattern like C:/...
        // split = ['C:', ...]
        // XXX: would be nice to handle patterns like `c:*` to test the cwd
        // in c: for *, but I don't know of a way to even figure out what that
        // cwd is without actually chdir'ing into it?
        /**
         * True if the pattern starts with a drive letter on Windows
         */
        isDrive() {
            const pl = this.#patternList;
            return this.#isDrive !== undefined ?
                this.#isDrive
                : (this.#isDrive =
                    this.#platform === 'win32' &&
                        this.#index === 0 &&
                        this.length > 1 &&
                        typeof pl[0] === 'string' &&
                        /^[a-z]:$/i.test(pl[0]));
        }
        // pattern = '/' or '/...' or '/x/...'
        // split = ['', ''] or ['', ...] or ['', 'x', ...]
        // Drive and UNC both considered absolute on windows
        /**
         * True if the pattern is rooted on an absolute path
         */
        isAbsolute() {
            const pl = this.#patternList;
            return this.#isAbsolute !== undefined ?
                this.#isAbsolute
                : (this.#isAbsolute =
                    (pl[0] === '' && pl.length > 1) ||
                        this.isDrive() ||
                        this.isUNC());
        }
        /**
         * consume the root of the pattern, and return it
         */
        root() {
            const p = this.#patternList[0];
            return (typeof p === 'string' && this.isAbsolute() && this.#index === 0) ?
                p
                : '';
        }
        /**
         * Check to see if the current globstar pattern is allowed to follow
         * a symbolic link.
         */
        checkFollowGlobstar() {
            return !(this.#index === 0 ||
                !this.isGlobstar() ||
                !this.#followGlobstar);
        }
        /**
         * Mark that the current globstar pattern is following a symbolic link
         */
        markFollowGlobstar() {
            if (this.#index === 0 || !this.isGlobstar() || !this.#followGlobstar)
                return false;
            this.#followGlobstar = false;
            return true;
        }
    }
    exports.Pattern = Pattern;
    //# sourceMappingURL=pattern.js.map
    
    /***/ }),
    
    /***/ 8290:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    // synchronous utility for filtering entries and calculating subwalks
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Processor = exports.SubWalks = exports.MatchRecord = exports.HasWalkedCache = void 0;
    const minimatch_1 = __nccwpck_require__(8092);
    /**
     * A cache of which patterns have been processed for a given Path
     */
    class HasWalkedCache {
        store;
        constructor(store = new Map()) {
            this.store = store;
        }
        copy() {
            return new HasWalkedCache(new Map(this.store));
        }
        hasWalked(target, pattern) {
            return this.store.get(target.fullpath())?.has(pattern.globString());
        }
        storeWalked(target, pattern) {
            const fullpath = target.fullpath();
            const cached = this.store.get(fullpath);
            if (cached)
                cached.add(pattern.globString());
            else
                this.store.set(fullpath, new Set([pattern.globString()]));
        }
    }
    exports.HasWalkedCache = HasWalkedCache;
    /**
     * A record of which paths have been matched in a given walk step,
     * and whether they only are considered a match if they are a directory,
     * and whether their absolute or relative path should be returned.
     */
    class MatchRecord {
        store = new Map();
        add(target, absolute, ifDir) {
            const n = (absolute ? 2 : 0) | (ifDir ? 1 : 0);
            const current = this.store.get(target);
            this.store.set(target, current === undefined ? n : n & current);
        }
        // match, absolute, ifdir
        entries() {
            return [...this.store.entries()].map(([path, n]) => [
                path,
                !!(n & 2),
                !!(n & 1),
            ]);
        }
    }
    exports.MatchRecord = MatchRecord;
    /**
     * A collection of patterns that must be processed in a subsequent step
     * for a given path.
     */
    class SubWalks {
        store = new Map();
        add(target, pattern) {
            if (!target.canReaddir()) {
                return;
            }
            const subs = this.store.get(target);
            if (subs) {
                if (!subs.find(p => p.globString() === pattern.globString())) {
                    subs.push(pattern);
                }
            }
            else
                this.store.set(target, [pattern]);
        }
        get(target) {
            const subs = this.store.get(target);
            /* c8 ignore start */
            if (!subs) {
                throw new Error('attempting to walk unknown path');
            }
            /* c8 ignore stop */
            return subs;
        }
        entries() {
            return this.keys().map(k => [k, this.store.get(k)]);
        }
        keys() {
            return [...this.store.keys()].filter(t => t.canReaddir());
        }
    }
    exports.SubWalks = SubWalks;
    /**
     * The class that processes patterns for a given path.
     *
     * Handles child entry filtering, and determining whether a path's
     * directory contents must be read.
     */
    class Processor {
        hasWalkedCache;
        matches = new MatchRecord();
        subwalks = new SubWalks();
        patterns;
        follow;
        dot;
        opts;
        constructor(opts, hasWalkedCache) {
            this.opts = opts;
            this.follow = !!opts.follow;
            this.dot = !!opts.dot;
            this.hasWalkedCache =
                hasWalkedCache ? hasWalkedCache.copy() : new HasWalkedCache();
        }
        processPatterns(target, patterns) {
            this.patterns = patterns;
            const processingSet = patterns.map(p => [target, p]);
            // map of paths to the magic-starting subwalks they need to walk
            // first item in patterns is the filter
            for (let [t, pattern] of processingSet) {
                this.hasWalkedCache.storeWalked(t, pattern);
                const root = pattern.root();
                const absolute = pattern.isAbsolute() && this.opts.absolute !== false;
                // start absolute patterns at root
                if (root) {
                    t = t.resolve(root === '/' && this.opts.root !== undefined ?
                        this.opts.root
                        : root);
                    const rest = pattern.rest();
                    if (!rest) {
                        this.matches.add(t, true, false);
                        continue;
                    }
                    else {
                        pattern = rest;
                    }
                }
                if (t.isENOENT())
                    continue;
                let p;
                let rest;
                let changed = false;
                while (typeof (p = pattern.pattern()) === 'string' &&
                    (rest = pattern.rest())) {
                    const c = t.resolve(p);
                    t = c;
                    pattern = rest;
                    changed = true;
                }
                p = pattern.pattern();
                rest = pattern.rest();
                if (changed) {
                    if (this.hasWalkedCache.hasWalked(t, pattern))
                        continue;
                    this.hasWalkedCache.storeWalked(t, pattern);
                }
                // now we have either a final string for a known entry,
                // more strings for an unknown entry,
                // or a pattern starting with magic, mounted on t.
                if (typeof p === 'string') {
                    // must not be final entry, otherwise we would have
                    // concatenated it earlier.
                    const ifDir = p === '..' || p === '' || p === '.';
                    this.matches.add(t.resolve(p), absolute, ifDir);
                    continue;
                }
                else if (p === minimatch_1.GLOBSTAR) {
                    // if no rest, match and subwalk pattern
                    // if rest, process rest and subwalk pattern
                    // if it's a symlink, but we didn't get here by way of a
                    // globstar match (meaning it's the first time THIS globstar
                    // has traversed a symlink), then we follow it. Otherwise, stop.
                    if (!t.isSymbolicLink() ||
                        this.follow ||
                        pattern.checkFollowGlobstar()) {
                        this.subwalks.add(t, pattern);
                    }
                    const rp = rest?.pattern();
                    const rrest = rest?.rest();
                    if (!rest || ((rp === '' || rp === '.') && !rrest)) {
                        // only HAS to be a dir if it ends in **/ or **/.
                        // but ending in ** will match files as well.
                        this.matches.add(t, absolute, rp === '' || rp === '.');
                    }
                    else {
                        if (rp === '..') {
                            // this would mean you're matching **/.. at the fs root,
                            // and no thanks, I'm not gonna test that specific case.
                            /* c8 ignore start */
                            const tp = t.parent || t;
                            /* c8 ignore stop */
                            if (!rrest)
                                this.matches.add(tp, absolute, true);
                            else if (!this.hasWalkedCache.hasWalked(tp, rrest)) {
                                this.subwalks.add(tp, rrest);
                            }
                        }
                    }
                }
                else if (p instanceof RegExp) {
                    this.subwalks.add(t, pattern);
                }
            }
            return this;
        }
        subwalkTargets() {
            return this.subwalks.keys();
        }
        child() {
            return new Processor(this.opts, this.hasWalkedCache);
        }
        // return a new Processor containing the subwalks for each
        // child entry, and a set of matches, and
        // a hasWalkedCache that's a copy of this one
        // then we're going to call
        filterEntries(parent, entries) {
            const patterns = this.subwalks.get(parent);
            // put matches and entry walks into the results processor
            const results = this.child();
            for (const e of entries) {
                for (const pattern of patterns) {
                    const absolute = pattern.isAbsolute();
                    const p = pattern.pattern();
                    const rest = pattern.rest();
                    if (p === minimatch_1.GLOBSTAR) {
                        results.testGlobstar(e, pattern, rest, absolute);
                    }
                    else if (p instanceof RegExp) {
                        results.testRegExp(e, p, rest, absolute);
                    }
                    else {
                        results.testString(e, p, rest, absolute);
                    }
                }
            }
            return results;
        }
        testGlobstar(e, pattern, rest, absolute) {
            if (this.dot || !e.name.startsWith('.')) {
                if (!pattern.hasMore()) {
                    this.matches.add(e, absolute, false);
                }
                if (e.canReaddir()) {
                    // if we're in follow mode or it's not a symlink, just keep
                    // testing the same pattern. If there's more after the globstar,
                    // then this symlink consumes the globstar. If not, then we can
                    // follow at most ONE symlink along the way, so we mark it, which
                    // also checks to ensure that it wasn't already marked.
                    if (this.follow || !e.isSymbolicLink()) {
                        this.subwalks.add(e, pattern);
                    }
                    else if (e.isSymbolicLink()) {
                        if (rest && pattern.checkFollowGlobstar()) {
                            this.subwalks.add(e, rest);
                        }
                        else if (pattern.markFollowGlobstar()) {
                            this.subwalks.add(e, pattern);
                        }
                    }
                }
            }
            // if the NEXT thing matches this entry, then also add
            // the rest.
            if (rest) {
                const rp = rest.pattern();
                if (typeof rp === 'string' &&
                    // dots and empty were handled already
                    rp !== '..' &&
                    rp !== '' &&
                    rp !== '.') {
                    this.testString(e, rp, rest.rest(), absolute);
                }
                else if (rp === '..') {
                    /* c8 ignore start */
                    const ep = e.parent || e;
                    /* c8 ignore stop */
                    this.subwalks.add(ep, rest);
                }
                else if (rp instanceof RegExp) {
                    this.testRegExp(e, rp, rest.rest(), absolute);
                }
            }
        }
        testRegExp(e, p, rest, absolute) {
            if (!p.test(e.name))
                return;
            if (!rest) {
                this.matches.add(e, absolute, false);
            }
            else {
                this.subwalks.add(e, rest);
            }
        }
        testString(e, p, rest, absolute) {
            // should never happen?
            if (!e.isNamed(p))
                return;
            if (!rest) {
                this.matches.add(e, absolute, false);
            }
            else {
                this.subwalks.add(e, rest);
            }
        }
    }
    exports.Processor = Processor;
    //# sourceMappingURL=processor.js.map
    
    /***/ }),
    
    /***/ 3601:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.GlobStream = exports.GlobWalker = exports.GlobUtil = void 0;
    /**
     * Single-use utility classes to provide functionality to the {@link Glob}
     * methods.
     *
     * @module
     */
    const minipass_1 = __nccwpck_require__(7885);
    const ignore_js_1 = __nccwpck_require__(9410);
    const processor_js_1 = __nccwpck_require__(8290);
    const makeIgnore = (ignore, opts) => typeof ignore === 'string' ? new ignore_js_1.Ignore([ignore], opts)
        : Array.isArray(ignore) ? new ignore_js_1.Ignore(ignore, opts)
            : ignore;
    /**
     * basic walking utilities that all the glob walker types use
     */
    class GlobUtil {
        path;
        patterns;
        opts;
        seen = new Set();
        paused = false;
        aborted = false;
        #onResume = [];
        #ignore;
        #sep;
        signal;
        maxDepth;
        includeChildMatches;
        constructor(patterns, path, opts) {
            this.patterns = patterns;
            this.path = path;
            this.opts = opts;
            this.#sep = !opts.posix && opts.platform === 'win32' ? '\\' : '/';
            this.includeChildMatches = opts.includeChildMatches !== false;
            if (opts.ignore || !this.includeChildMatches) {
                this.#ignore = makeIgnore(opts.ignore ?? [], opts);
                if (!this.includeChildMatches &&
                    typeof this.#ignore.add !== 'function') {
                    const m = 'cannot ignore child matches, ignore lacks add() method.';
                    throw new Error(m);
                }
            }
            // ignore, always set with maxDepth, but it's optional on the
            // GlobOptions type
            /* c8 ignore start */
            this.maxDepth = opts.maxDepth || Infinity;
            /* c8 ignore stop */
            if (opts.signal) {
                this.signal = opts.signal;
                this.signal.addEventListener('abort', () => {
                    this.#onResume.length = 0;
                });
            }
        }
        #ignored(path) {
            return this.seen.has(path) || !!this.#ignore?.ignored?.(path);
        }
        #childrenIgnored(path) {
            return !!this.#ignore?.childrenIgnored?.(path);
        }
        // backpressure mechanism
        pause() {
            this.paused = true;
        }
        resume() {
            /* c8 ignore start */
            if (this.signal?.aborted)
                return;
            /* c8 ignore stop */
            this.paused = false;
            let fn = undefined;
            while (!this.paused && (fn = this.#onResume.shift())) {
                fn();
            }
        }
        onResume(fn) {
            if (this.signal?.aborted)
                return;
            /* c8 ignore start */
            if (!this.paused) {
                fn();
            }
            else {
                /* c8 ignore stop */
                this.#onResume.push(fn);
            }
        }
        // do the requisite realpath/stat checking, and return the path
        // to add or undefined to filter it out.
        async matchCheck(e, ifDir) {
            if (ifDir && this.opts.nodir)
                return undefined;
            let rpc;
            if (this.opts.realpath) {
                rpc = e.realpathCached() || (await e.realpath());
                if (!rpc)
                    return undefined;
                e = rpc;
            }
            const needStat = e.isUnknown() || this.opts.stat;
            const s = needStat ? await e.lstat() : e;
            if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
                const target = await s.realpath();
                /* c8 ignore start */
                if (target && (target.isUnknown() || this.opts.stat)) {
                    await target.lstat();
                }
                /* c8 ignore stop */
            }
            return this.matchCheckTest(s, ifDir);
        }
        matchCheckTest(e, ifDir) {
            return (e &&
                (this.maxDepth === Infinity || e.depth() <= this.maxDepth) &&
                (!ifDir || e.canReaddir()) &&
                (!this.opts.nodir || !e.isDirectory()) &&
                (!this.opts.nodir ||
                    !this.opts.follow ||
                    !e.isSymbolicLink() ||
                    !e.realpathCached()?.isDirectory()) &&
                !this.#ignored(e)) ?
                e
                : undefined;
        }
        matchCheckSync(e, ifDir) {
            if (ifDir && this.opts.nodir)
                return undefined;
            let rpc;
            if (this.opts.realpath) {
                rpc = e.realpathCached() || e.realpathSync();
                if (!rpc)
                    return undefined;
                e = rpc;
            }
            const needStat = e.isUnknown() || this.opts.stat;
            const s = needStat ? e.lstatSync() : e;
            if (this.opts.follow && this.opts.nodir && s?.isSymbolicLink()) {
                const target = s.realpathSync();
                if (target && (target?.isUnknown() || this.opts.stat)) {
                    target.lstatSync();
                }
            }
            return this.matchCheckTest(s, ifDir);
        }
        matchFinish(e, absolute) {
            if (this.#ignored(e))
                return;
            // we know we have an ignore if this is false, but TS doesn't
            if (!this.includeChildMatches && this.#ignore?.add) {
                const ign = `${e.relativePosix()}/**`;
                this.#ignore.add(ign);
            }
            const abs = this.opts.absolute === undefined ? absolute : this.opts.absolute;
            this.seen.add(e);
            const mark = this.opts.mark && e.isDirectory() ? this.#sep : '';
            // ok, we have what we need!
            if (this.opts.withFileTypes) {
                this.matchEmit(e);
            }
            else if (abs) {
                const abs = this.opts.posix ? e.fullpathPosix() : e.fullpath();
                this.matchEmit(abs + mark);
            }
            else {
                const rel = this.opts.posix ? e.relativePosix() : e.relative();
                const pre = this.opts.dotRelative && !rel.startsWith('..' + this.#sep) ?
                    '.' + this.#sep
                    : '';
                this.matchEmit(!rel ? '.' + mark : pre + rel + mark);
            }
        }
        async match(e, absolute, ifDir) {
            const p = await this.matchCheck(e, ifDir);
            if (p)
                this.matchFinish(p, absolute);
        }
        matchSync(e, absolute, ifDir) {
            const p = this.matchCheckSync(e, ifDir);
            if (p)
                this.matchFinish(p, absolute);
        }
        walkCB(target, patterns, cb) {
            /* c8 ignore start */
            if (this.signal?.aborted)
                cb();
            /* c8 ignore stop */
            this.walkCB2(target, patterns, new processor_js_1.Processor(this.opts), cb);
        }
        walkCB2(target, patterns, processor, cb) {
            if (this.#childrenIgnored(target))
                return cb();
            if (this.signal?.aborted)
                cb();
            if (this.paused) {
                this.onResume(() => this.walkCB2(target, patterns, processor, cb));
                return;
            }
            processor.processPatterns(target, patterns);
            // done processing.  all of the above is sync, can be abstracted out.
            // subwalks is a map of paths to the entry filters they need
            // matches is a map of paths to [absolute, ifDir] tuples.
            let tasks = 1;
            const next = () => {
                if (--tasks === 0)
                    cb();
            };
            for (const [m, absolute, ifDir] of processor.matches.entries()) {
                if (this.#ignored(m))
                    continue;
                tasks++;
                this.match(m, absolute, ifDir).then(() => next());
            }
            for (const t of processor.subwalkTargets()) {
                if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
                    continue;
                }
                tasks++;
                const childrenCached = t.readdirCached();
                if (t.calledReaddir())
                    this.walkCB3(t, childrenCached, processor, next);
                else {
                    t.readdirCB((_, entries) => this.walkCB3(t, entries, processor, next), true);
                }
            }
            next();
        }
        walkCB3(target, entries, processor, cb) {
            processor = processor.filterEntries(target, entries);
            let tasks = 1;
            const next = () => {
                if (--tasks === 0)
                    cb();
            };
            for (const [m, absolute, ifDir] of processor.matches.entries()) {
                if (this.#ignored(m))
                    continue;
                tasks++;
                this.match(m, absolute, ifDir).then(() => next());
            }
            for (const [target, patterns] of processor.subwalks.entries()) {
                tasks++;
                this.walkCB2(target, patterns, processor.child(), next);
            }
            next();
        }
        walkCBSync(target, patterns, cb) {
            /* c8 ignore start */
            if (this.signal?.aborted)
                cb();
            /* c8 ignore stop */
            this.walkCB2Sync(target, patterns, new processor_js_1.Processor(this.opts), cb);
        }
        walkCB2Sync(target, patterns, processor, cb) {
            if (this.#childrenIgnored(target))
                return cb();
            if (this.signal?.aborted)
                cb();
            if (this.paused) {
                this.onResume(() => this.walkCB2Sync(target, patterns, processor, cb));
                return;
            }
            processor.processPatterns(target, patterns);
            // done processing.  all of the above is sync, can be abstracted out.
            // subwalks is a map of paths to the entry filters they need
            // matches is a map of paths to [absolute, ifDir] tuples.
            let tasks = 1;
            const next = () => {
                if (--tasks === 0)
                    cb();
            };
            for (const [m, absolute, ifDir] of processor.matches.entries()) {
                if (this.#ignored(m))
                    continue;
                this.matchSync(m, absolute, ifDir);
            }
            for (const t of processor.subwalkTargets()) {
                if (this.maxDepth !== Infinity && t.depth() >= this.maxDepth) {
                    continue;
                }
                tasks++;
                const children = t.readdirSync();
                this.walkCB3Sync(t, children, processor, next);
            }
            next();
        }
        walkCB3Sync(target, entries, processor, cb) {
            processor = processor.filterEntries(target, entries);
            let tasks = 1;
            const next = () => {
                if (--tasks === 0)
                    cb();
            };
            for (const [m, absolute, ifDir] of processor.matches.entries()) {
                if (this.#ignored(m))
                    continue;
                this.matchSync(m, absolute, ifDir);
            }
            for (const [target, patterns] of processor.subwalks.entries()) {
                tasks++;
                this.walkCB2Sync(target, patterns, processor.child(), next);
            }
            next();
        }
    }
    exports.GlobUtil = GlobUtil;
    class GlobWalker extends GlobUtil {
        matches = new Set();
        constructor(patterns, path, opts) {
            super(patterns, path, opts);
        }
        matchEmit(e) {
            this.matches.add(e);
        }
        async walk() {
            if (this.signal?.aborted)
                throw this.signal.reason;
            if (this.path.isUnknown()) {
                await this.path.lstat();
            }
            await new Promise((res, rej) => {
                this.walkCB(this.path, this.patterns, () => {
                    if (this.signal?.aborted) {
                        rej(this.signal.reason);
                    }
                    else {
                        res(this.matches);
                    }
                });
            });
            return this.matches;
        }
        walkSync() {
            if (this.signal?.aborted)
                throw this.signal.reason;
            if (this.path.isUnknown()) {
                this.path.lstatSync();
            }
            // nothing for the callback to do, because this never pauses
            this.walkCBSync(this.path, this.patterns, () => {
                if (this.signal?.aborted)
                    throw this.signal.reason;
            });
            return this.matches;
        }
    }
    exports.GlobWalker = GlobWalker;
    class GlobStream extends GlobUtil {
        results;
        constructor(patterns, path, opts) {
            super(patterns, path, opts);
            this.results = new minipass_1.Minipass({
                signal: this.signal,
                objectMode: true,
            });
            this.results.on('drain', () => this.resume());
            this.results.on('resume', () => this.resume());
        }
        matchEmit(e) {
            this.results.write(e);
            if (!this.results.flowing)
                this.pause();
        }
        stream() {
            const target = this.path;
            if (target.isUnknown()) {
                target.lstat().then(() => {
                    this.walkCB(target, this.patterns, () => this.results.end());
                });
            }
            else {
                this.walkCB(target, this.patterns, () => this.results.end());
            }
            return this.results;
        }
        streamSync() {
            if (this.path.isUnknown()) {
                this.path.lstatSync();
            }
            this.walkCBSync(this.path, this.patterns, () => this.results.end());
            return this.results;
        }
    }
    exports.GlobStream = GlobStream;
    //# sourceMappingURL=walker.js.map
    
    /***/ }),
    
    /***/ 1987:
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.assertValidPattern = void 0;
    const MAX_PATTERN_LENGTH = 1024 * 64;
    const assertValidPattern = (pattern) => {
        if (typeof pattern !== 'string') {
            throw new TypeError('invalid pattern');
        }
        if (pattern.length > MAX_PATTERN_LENGTH) {
            throw new TypeError('pattern is too long');
        }
    };
    exports.assertValidPattern = assertValidPattern;
    //# sourceMappingURL=assert-valid-pattern.js.map
    
    /***/ }),
    
    /***/ 3084:
    /***/ ((__unused_webpack_module, exports, __nccwpck_require__) => {
    
    "use strict";
    
    // parse a single path portion
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.AST = void 0;
    const brace_expressions_js_1 = __nccwpck_require__(5781);
    const unescape_js_1 = __nccwpck_require__(1126);
    const types = new Set(['!', '?', '+', '*', '@']);
    const isExtglobType = (c) => types.has(c);
    // Patterns that get prepended to bind to the start of either the
    // entire string, or just a single path portion, to prevent dots
    // and/or traversal patterns, when needed.
    // Exts don't need the ^ or / bit, because the root binds that already.
    const startNoTraversal = '(?!(?:^|/)\\.\\.?(?:$|/))';
    const startNoDot = '(?!\\.)';
    // characters that indicate a start of pattern needs the "no dots" bit,
    // because a dot *might* be matched. ( is not in the list, because in
    // the case of a child extglob, it will handle the prevention itself.
    const addPatternStart = new Set(['[', '.']);
    // cases where traversal is A-OK, no dot prevention needed
    const justDots = new Set(['..', '.']);
    const reSpecials = new Set('().*{}+?[]^$\\!');
    const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // any single thing other than /
    const qmark = '[^/]';
    // * => any number of characters
    const star = qmark + '*?';
    // use + when we need to ensure that *something* matches, because the * is
    // the only thing in the path portion.
    const starNoEmpty = qmark + '+?';
    // remove the \ chars that we added if we end up doing a nonmagic compare
    // const deslash = (s: string) => s.replace(/\\(.)/g, '$1')
    class AST {
        type;
        #root;
        #hasMagic;
        #uflag = false;
        #parts = [];
        #parent;
        #parentIndex;
        #negs;
        #filledNegs = false;
        #options;
        #toString;
        // set to true if it's an extglob with no children
        // (which really means one child of '')
        #emptyExt = false;
        constructor(type, parent, options = {}) {
            this.type = type;
            // extglobs are inherently magical
            if (type)
                this.#hasMagic = true;
            this.#parent = parent;
            this.#root = this.#parent ? this.#parent.#root : this;
            this.#options = this.#root === this ? options : this.#root.#options;
            this.#negs = this.#root === this ? [] : this.#root.#negs;
            if (type === '!' && !this.#root.#filledNegs)
                this.#negs.push(this);
            this.#parentIndex = this.#parent ? this.#parent.#parts.length : 0;
        }
        get hasMagic() {
            /* c8 ignore start */
            if (this.#hasMagic !== undefined)
                return this.#hasMagic;
            /* c8 ignore stop */
            for (const p of this.#parts) {
                if (typeof p === 'string')
                    continue;
                if (p.type || p.hasMagic)
                    return (this.#hasMagic = true);
            }
            // note: will be undefined until we generate the regexp src and find out
            return this.#hasMagic;
        }
        // reconstructs the pattern
        toString() {
            if (this.#toString !== undefined)
                return this.#toString;
            if (!this.type) {
                return (this.#toString = this.#parts.map(p => String(p)).join(''));
            }
            else {
                return (this.#toString =
                    this.type + '(' + this.#parts.map(p => String(p)).join('|') + ')');
            }
        }
        #fillNegs() {
            /* c8 ignore start */
            if (this !== this.#root)
                throw new Error('should only call on root');
            if (this.#filledNegs)
                return this;
            /* c8 ignore stop */
            // call toString() once to fill this out
            this.toString();
            this.#filledNegs = true;
            let n;
            while ((n = this.#negs.pop())) {
                if (n.type !== '!')
                    continue;
                // walk up the tree, appending everthing that comes AFTER parentIndex
                let p = n;
                let pp = p.#parent;
                while (pp) {
                    for (let i = p.#parentIndex + 1; !pp.type && i < pp.#parts.length; i++) {
                        for (const part of n.#parts) {
                            /* c8 ignore start */
                            if (typeof part === 'string') {
                                throw new Error('string part in extglob AST??');
                            }
                            /* c8 ignore stop */
                            part.copyIn(pp.#parts[i]);
                        }
                    }
                    p = pp;
                    pp = p.#parent;
                }
            }
            return this;
        }
        push(...parts) {
            for (const p of parts) {
                if (p === '')
                    continue;
                /* c8 ignore start */
                if (typeof p !== 'string' && !(p instanceof AST && p.#parent === this)) {
                    throw new Error('invalid part: ' + p);
                }
                /* c8 ignore stop */
                this.#parts.push(p);
            }
        }
        toJSON() {
            const ret = this.type === null
                ? this.#parts.slice().map(p => (typeof p === 'string' ? p : p.toJSON()))
                : [this.type, ...this.#parts.map(p => p.toJSON())];
            if (this.isStart() && !this.type)
                ret.unshift([]);
            if (this.isEnd() &&
                (this === this.#root ||
                    (this.#root.#filledNegs && this.#parent?.type === '!'))) {
                ret.push({});
            }
            return ret;
        }
        isStart() {
            if (this.#root === this)
                return true;
            // if (this.type) return !!this.#parent?.isStart()
            if (!this.#parent?.isStart())
                return false;
            if (this.#parentIndex === 0)
                return true;
            // if everything AHEAD of this is a negation, then it's still the "start"
            const p = this.#parent;
            for (let i = 0; i < this.#parentIndex; i++) {
                const pp = p.#parts[i];
                if (!(pp instanceof AST && pp.type === '!')) {
                    return false;
                }
            }
            return true;
        }
        isEnd() {
            if (this.#root === this)
                return true;
            if (this.#parent?.type === '!')
                return true;
            if (!this.#parent?.isEnd())
                return false;
            if (!this.type)
                return this.#parent?.isEnd();
            // if not root, it'll always have a parent
            /* c8 ignore start */
            const pl = this.#parent ? this.#parent.#parts.length : 0;
            /* c8 ignore stop */
            return this.#parentIndex === pl - 1;
        }
        copyIn(part) {
            if (typeof part === 'string')
                this.push(part);
            else
                this.push(part.clone(this));
        }
        clone(parent) {
            const c = new AST(this.type, parent);
            for (const p of this.#parts) {
                c.copyIn(p);
            }
            return c;
        }
        static #parseAST(str, ast, pos, opt) {
            let escaping = false;
            let inBrace = false;
            let braceStart = -1;
            let braceNeg = false;
            if (ast.type === null) {
                // outside of a extglob, append until we find a start
                let i = pos;
                let acc = '';
                while (i < str.length) {
                    const c = str.charAt(i++);
                    // still accumulate escapes at this point, but we do ignore
                    // starts that are escaped
                    if (escaping || c === '\\') {
                        escaping = !escaping;
                        acc += c;
                        continue;
                    }
                    if (inBrace) {
                        if (i === braceStart + 1) {
                            if (c === '^' || c === '!') {
                                braceNeg = true;
                            }
                        }
                        else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                            inBrace = false;
                        }
                        acc += c;
                        continue;
                    }
                    else if (c === '[') {
                        inBrace = true;
                        braceStart = i;
                        braceNeg = false;
                        acc += c;
                        continue;
                    }
                    if (!opt.noext && isExtglobType(c) && str.charAt(i) === '(') {
                        ast.push(acc);
                        acc = '';
                        const ext = new AST(c, ast);
                        i = AST.#parseAST(str, ext, i, opt);
                        ast.push(ext);
                        continue;
                    }
                    acc += c;
                }
                ast.push(acc);
                return i;
            }
            // some kind of extglob, pos is at the (
            // find the next | or )
            let i = pos + 1;
            let part = new AST(null, ast);
            const parts = [];
            let acc = '';
            while (i < str.length) {
                const c = str.charAt(i++);
                // still accumulate escapes at this point, but we do ignore
                // starts that are escaped
                if (escaping || c === '\\') {
                    escaping = !escaping;
                    acc += c;
                    continue;
                }
                if (inBrace) {
                    if (i === braceStart + 1) {
                        if (c === '^' || c === '!') {
                            braceNeg = true;
                        }
                    }
                    else if (c === ']' && !(i === braceStart + 2 && braceNeg)) {
                        inBrace = false;
                    }
                    acc += c;
                    continue;
                }
                else if (c === '[') {
                    inBrace = true;
                    braceStart = i;
                    braceNeg = false;
                    acc += c;
                    continue;
                }
                if (isExtglobType(c) && str.charAt(i) === '(') {
                    part.push(acc);
                    acc = '';
                    const ext = new AST(c, part);
                    part.push(ext);
                    i = AST.#parseAST(str, ext, i, opt);
                    continue;
                }
                if (c === '|') {
                    part.push(acc);
                    acc = '';
                    parts.push(part);
                    part = new AST(null, ast);
                    continue;
                }
                if (c === ')') {
                    if (acc === '' && ast.#parts.length === 0) {
                        ast.#emptyExt = true;
                    }
                    part.push(acc);
                    acc = '';
                    ast.push(...parts, part);
                    return i;
                }
                acc += c;
            }
            // unfinished extglob
            // if we got here, it was a malformed extglob! not an extglob, but
            // maybe something else in there.
            ast.type = null;
            ast.#hasMagic = undefined;
            ast.#parts = [str.substring(pos - 1)];
            return i;
        }
        static fromGlob(pattern, options = {}) {
            const ast = new AST(null, undefined, options);
            AST.#parseAST(pattern, ast, 0, options);
            return ast;
        }
        // returns the regular expression if there's magic, or the unescaped
        // string if not.
        toMMPattern() {
            // should only be called on root
            /* c8 ignore start */
            if (this !== this.#root)
                return this.#root.toMMPattern();
            /* c8 ignore stop */
            const glob = this.toString();
            const [re, body, hasMagic, uflag] = this.toRegExpSource();
            // if we're in nocase mode, and not nocaseMagicOnly, then we do
            // still need a regular expression if we have to case-insensitively
            // match capital/lowercase characters.
            const anyMagic = hasMagic ||
                this.#hasMagic ||
                (this.#options.nocase &&
                    !this.#options.nocaseMagicOnly &&
                    glob.toUpperCase() !== glob.toLowerCase());
            if (!anyMagic) {
                return body;
            }
            const flags = (this.#options.nocase ? 'i' : '') + (uflag ? 'u' : '');
            return Object.assign(new RegExp(`^${re}$`, flags), {
                _src: re,
                _glob: glob,
            });
        }
        get options() {
            return this.#options;
        }
        // returns the string match, the regexp source, whether there's magic
        // in the regexp (so a regular expression is required) and whether or
        // not the uflag is needed for the regular expression (for posix classes)
        // TODO: instead of injecting the start/end at this point, just return
        // the BODY of the regexp, along with the start/end portions suitable
        // for binding the start/end in either a joined full-path makeRe context
        // (where we bind to (^|/), or a standalone matchPart context (where
        // we bind to ^, and not /).  Otherwise slashes get duped!
        //
        // In part-matching mode, the start is:
        // - if not isStart: nothing
        // - if traversal possible, but not allowed: ^(?!\.\.?$)
        // - if dots allowed or not possible: ^
        // - if dots possible and not allowed: ^(?!\.)
        // end is:
        // - if not isEnd(): nothing
        // - else: $
        //
        // In full-path matching mode, we put the slash at the START of the
        // pattern, so start is:
        // - if first pattern: same as part-matching mode
        // - if not isStart(): nothing
        // - if traversal possible, but not allowed: /(?!\.\.?(?:$|/))
        // - if dots allowed or not possible: /
        // - if dots possible and not allowed: /(?!\.)
        // end is:
        // - if last pattern, same as part-matching mode
        // - else nothing
        //
        // Always put the (?:$|/) on negated tails, though, because that has to be
        // there to bind the end of the negated pattern portion, and it's easier to
        // just stick it in now rather than try to inject it later in the middle of
        // the pattern.
        //
        // We can just always return the same end, and leave it up to the caller
        // to know whether it's going to be used joined or in parts.
        // And, if the start is adjusted slightly, can do the same there:
        // - if not isStart: nothing
        // - if traversal possible, but not allowed: (?:/|^)(?!\.\.?$)
        // - if dots allowed or not possible: (?:/|^)
        // - if dots possible and not allowed: (?:/|^)(?!\.)
        //
        // But it's better to have a simpler binding without a conditional, for
        // performance, so probably better to return both start options.
        //
        // Then the caller just ignores the end if it's not the first pattern,
        // and the start always gets applied.
        //
        // But that's always going to be $ if it's the ending pattern, or nothing,
        // so the caller can just attach $ at the end of the pattern when building.
        //
        // So the todo is:
        // - better detect what kind of start is needed
        // - return both flavors of starting pattern
        // - attach $ at the end of the pattern when creating the actual RegExp
        //
        // Ah, but wait, no, that all only applies to the root when the first pattern
        // is not an extglob. If the first pattern IS an extglob, then we need all
        // that dot prevention biz to live in the extglob portions, because eg
        // +(*|.x*) can match .xy but not .yx.
        //
        // So, return the two flavors if it's #root and the first child is not an
        // AST, otherwise leave it to the child AST to handle it, and there,
        // use the (?:^|/) style of start binding.
        //
        // Even simplified further:
        // - Since the start for a join is eg /(?!\.) and the start for a part
        // is ^(?!\.), we can just prepend (?!\.) to the pattern (either root
        // or start or whatever) and prepend ^ or / at the Regexp construction.
        toRegExpSource(allowDot) {
            const dot = allowDot ?? !!this.#options.dot;
            if (this.#root === this)
                this.#fillNegs();
            if (!this.type) {
                const noEmpty = this.isStart() && this.isEnd();
                const src = this.#parts
                    .map(p => {
                    const [re, _, hasMagic, uflag] = typeof p === 'string'
                        ? AST.#parseGlob(p, this.#hasMagic, noEmpty)
                        : p.toRegExpSource(allowDot);
                    this.#hasMagic = this.#hasMagic || hasMagic;
                    this.#uflag = this.#uflag || uflag;
                    return re;
                })
                    .join('');
                let start = '';
                if (this.isStart()) {
                    if (typeof this.#parts[0] === 'string') {
                        // this is the string that will match the start of the pattern,
                        // so we need to protect against dots and such.
                        // '.' and '..' cannot match unless the pattern is that exactly,
                        // even if it starts with . or dot:true is set.
                        const dotTravAllowed = this.#parts.length === 1 && justDots.has(this.#parts[0]);
                        if (!dotTravAllowed) {
                            const aps = addPatternStart;
                            // check if we have a possibility of matching . or ..,
                            // and prevent that.
                            const needNoTrav = 
                            // dots are allowed, and the pattern starts with [ or .
                            (dot && aps.has(src.charAt(0))) ||
                                // the pattern starts with \., and then [ or .
                                (src.startsWith('\\.') && aps.has(src.charAt(2))) ||
                                // the pattern starts with \.\., and then [ or .
                                (src.startsWith('\\.\\.') && aps.has(src.charAt(4)));
                            // no need to prevent dots if it can't match a dot, or if a
                            // sub-pattern will be preventing it anyway.
                            const needNoDot = !dot && !allowDot && aps.has(src.charAt(0));
                            start = needNoTrav ? startNoTraversal : needNoDot ? startNoDot : '';
                        }
                    }
                }
                // append the "end of path portion" pattern to negation tails
                let end = '';
                if (this.isEnd() &&
                    this.#root.#filledNegs &&
                    this.#parent?.type === '!') {
                    end = '(?:$|\\/)';
                }
                const final = start + src + end;
                return [
                    final,
                    (0, unescape_js_1.unescape)(src),
                    (this.#hasMagic = !!this.#hasMagic),
                    this.#uflag,
                ];
            }
            // We need to calculate the body *twice* if it's a repeat pattern
            // at the start, once in nodot mode, then again in dot mode, so a
            // pattern like *(?) can match 'x.y'
            const repeated = this.type === '*' || this.type === '+';
            // some kind of extglob
            const start = this.type === '!' ? '(?:(?!(?:' : '(?:';
            let body = this.#partsToRegExp(dot);
            if (this.isStart() && this.isEnd() && !body && this.type !== '!') {
                // invalid extglob, has to at least be *something* present, if it's
                // the entire path portion.
                const s = this.toString();
                this.#parts = [s];
                this.type = null;
                this.#hasMagic = undefined;
                return [s, (0, unescape_js_1.unescape)(this.toString()), false, false];
            }
            // XXX abstract out this map method
            let bodyDotAllowed = !repeated || allowDot || dot || !startNoDot
                ? ''
                : this.#partsToRegExp(true);
            if (bodyDotAllowed === body) {
                bodyDotAllowed = '';
            }
            if (bodyDotAllowed) {
                body = `(?:${body})(?:${bodyDotAllowed})*?`;
            }
            // an empty !() is exactly equivalent to a starNoEmpty
            let final = '';
            if (this.type === '!' && this.#emptyExt) {
                final = (this.isStart() && !dot ? startNoDot : '') + starNoEmpty;
            }
            else {
                const close = this.type === '!'
                    ? // !() must match something,but !(x) can match ''
                        '))' +
                            (this.isStart() && !dot && !allowDot ? startNoDot : '') +
                            star +
                            ')'
                    : this.type === '@'
                        ? ')'
                        : this.type === '?'
                            ? ')?'
                            : this.type === '+' && bodyDotAllowed
                                ? ')'
                                : this.type === '*' && bodyDotAllowed
                                    ? `)?`
                                    : `)${this.type}`;
                final = start + body + close;
            }
            return [
                final,
                (0, unescape_js_1.unescape)(body),
                (this.#hasMagic = !!this.#hasMagic),
                this.#uflag,
            ];
        }
        #partsToRegExp(dot) {
            return this.#parts
                .map(p => {
                // extglob ASTs should only contain parent ASTs
                /* c8 ignore start */
                if (typeof p === 'string') {
                    throw new Error('string type in extglob ast??');
                }
                /* c8 ignore stop */
                // can ignore hasMagic, because extglobs are already always magic
                const [re, _, _hasMagic, uflag] = p.toRegExpSource(dot);
                this.#uflag = this.#uflag || uflag;
                return re;
            })
                .filter(p => !(this.isStart() && this.isEnd()) || !!p)
                .join('|');
        }
        static #parseGlob(glob, hasMagic, noEmpty = false) {
            let escaping = false;
            let re = '';
            let uflag = false;
            for (let i = 0; i < glob.length; i++) {
                const c = glob.charAt(i);
                if (escaping) {
                    escaping = false;
                    re += (reSpecials.has(c) ? '\\' : '') + c;
                    continue;
                }
                if (c === '\\') {
                    if (i === glob.length - 1) {
                        re += '\\\\';
                    }
                    else {
                        escaping = true;
                    }
                    continue;
                }
                if (c === '[') {
                    const [src, needUflag, consumed, magic] = (0, brace_expressions_js_1.parseClass)(glob, i);
                    if (consumed) {
                        re += src;
                        uflag = uflag || needUflag;
                        i += consumed - 1;
                        hasMagic = hasMagic || magic;
                        continue;
                    }
                }
                if (c === '*') {
                    if (noEmpty && glob === '*')
                        re += starNoEmpty;
                    else
                        re += star;
                    hasMagic = true;
                    continue;
                }
                if (c === '?') {
                    re += qmark;
                    hasMagic = true;
                    continue;
                }
                re += regExpEscape(c);
            }
            return [re, (0, unescape_js_1.unescape)(glob), !!hasMagic, uflag];
        }
    }
    exports.AST = AST;
    //# sourceMappingURL=ast.js.map
    
    /***/ }),
    
    /***/ 5781:
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    // translate the various posix character classes into unicode properties
    // this works across all unicode locales
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.parseClass = void 0;
    // { <posix class>: [<translation>, /u flag required, negated]
    const posixClasses = {
        '[:alnum:]': ['\\p{L}\\p{Nl}\\p{Nd}', true],
        '[:alpha:]': ['\\p{L}\\p{Nl}', true],
        '[:ascii:]': ['\\x' + '00-\\x' + '7f', false],
        '[:blank:]': ['\\p{Zs}\\t', true],
        '[:cntrl:]': ['\\p{Cc}', true],
        '[:digit:]': ['\\p{Nd}', true],
        '[:graph:]': ['\\p{Z}\\p{C}', true, true],
        '[:lower:]': ['\\p{Ll}', true],
        '[:print:]': ['\\p{C}', true],
        '[:punct:]': ['\\p{P}', true],
        '[:space:]': ['\\p{Z}\\t\\r\\n\\v\\f', true],
        '[:upper:]': ['\\p{Lu}', true],
        '[:word:]': ['\\p{L}\\p{Nl}\\p{Nd}\\p{Pc}', true],
        '[:xdigit:]': ['A-Fa-f0-9', false],
    };
    // only need to escape a few things inside of brace expressions
    // escapes: [ \ ] -
    const braceEscape = (s) => s.replace(/[[\]\\-]/g, '\\$&');
    // escape all regexp magic characters
    const regexpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    // everything has already been escaped, we just have to join
    const rangesToString = (ranges) => ranges.join('');
    // takes a glob string at a posix brace expression, and returns
    // an equivalent regular expression source, and boolean indicating
    // whether the /u flag needs to be applied, and the number of chars
    // consumed to parse the character class.
    // This also removes out of order ranges, and returns ($.) if the
    // entire class just no good.
    const parseClass = (glob, position) => {
        const pos = position;
        /* c8 ignore start */
        if (glob.charAt(pos) !== '[') {
            throw new Error('not in a brace expression');
        }
        /* c8 ignore stop */
        const ranges = [];
        const negs = [];
        let i = pos + 1;
        let sawStart = false;
        let uflag = false;
        let escaping = false;
        let negate = false;
        let endPos = pos;
        let rangeStart = '';
        WHILE: while (i < glob.length) {
            const c = glob.charAt(i);
            if ((c === '!' || c === '^') && i === pos + 1) {
                negate = true;
                i++;
                continue;
            }
            if (c === ']' && sawStart && !escaping) {
                endPos = i + 1;
                break;
            }
            sawStart = true;
            if (c === '\\') {
                if (!escaping) {
                    escaping = true;
                    i++;
                    continue;
                }
                // escaped \ char, fall through and treat like normal char
            }
            if (c === '[' && !escaping) {
                // either a posix class, a collation equivalent, or just a [
                for (const [cls, [unip, u, neg]] of Object.entries(posixClasses)) {
                    if (glob.startsWith(cls, i)) {
                        // invalid, [a-[] is fine, but not [a-[:alpha]]
                        if (rangeStart) {
                            return ['$.', false, glob.length - pos, true];
                        }
                        i += cls.length;
                        if (neg)
                            negs.push(unip);
                        else
                            ranges.push(unip);
                        uflag = uflag || u;
                        continue WHILE;
                    }
                }
            }
            // now it's just a normal character, effectively
            escaping = false;
            if (rangeStart) {
                // throw this range away if it's not valid, but others
                // can still match.
                if (c > rangeStart) {
                    ranges.push(braceEscape(rangeStart) + '-' + braceEscape(c));
                }
                else if (c === rangeStart) {
                    ranges.push(braceEscape(c));
                }
                rangeStart = '';
                i++;
                continue;
            }
            // now might be the start of a range.
            // can be either c-d or c-] or c<more...>] or c] at this point
            if (glob.startsWith('-]', i + 1)) {
                ranges.push(braceEscape(c + '-'));
                i += 2;
                continue;
            }
            if (glob.startsWith('-', i + 1)) {
                rangeStart = c;
                i += 2;
                continue;
            }
            // not the start of a range, just a single character
            ranges.push(braceEscape(c));
            i++;
        }
        if (endPos < i) {
            // didn't see the end of the class, not a valid class,
            // but might still be valid as a literal match.
            return ['', false, 0, false];
        }
        // if we got no ranges and no negates, then we have a range that
        // cannot possibly match anything, and that poisons the whole glob
        if (!ranges.length && !negs.length) {
            return ['$.', false, glob.length - pos, true];
        }
        // if we got one positive range, and it's a single character, then that's
        // not actually a magic pattern, it's just that one literal character.
        // we should not treat that as "magic", we should just return the literal
        // character. [_] is a perfectly valid way to escape glob magic chars.
        if (negs.length === 0 &&
            ranges.length === 1 &&
            /^\\?.$/.test(ranges[0]) &&
            !negate) {
            const r = ranges[0].length === 2 ? ranges[0].slice(-1) : ranges[0];
            return [regexpEscape(r), false, endPos - pos, false];
        }
        const sranges = '[' + (negate ? '^' : '') + rangesToString(ranges) + ']';
        const snegs = '[' + (negate ? '' : '^') + rangesToString(negs) + ']';
        const comb = ranges.length && negs.length
            ? '(' + sranges + '|' + snegs + ')'
            : ranges.length
                ? sranges
                : snegs;
        return [comb, uflag, endPos - pos, true];
    };
    exports.parseClass = parseClass;
    //# sourceMappingURL=brace-expressions.js.map
    
    /***/ }),
    
    /***/ 1410:
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.escape = void 0;
    /**
     * Escape all magic characters in a glob pattern.
     *
     * If the {@link windowsPathsNoEscape | GlobOptions.windowsPathsNoEscape}
     * option is used, then characters are escaped by wrapping in `[]`, because
     * a magic character wrapped in a character class can only be satisfied by
     * that exact character.  In this mode, `\` is _not_ escaped, because it is
     * not interpreted as a magic character, but instead as a path separator.
     */
    const escape = (s, { windowsPathsNoEscape = false, } = {}) => {
        // don't need to escape +@! because we escape the parens
        // that make those magic, and escaping ! as [!] isn't valid,
        // because [!]] is a valid glob class meaning not ']'.
        return windowsPathsNoEscape
            ? s.replace(/[?*()[\]]/g, '[$&]')
            : s.replace(/[?*()[\]\\]/g, '\\$&');
    };
    exports.escape = escape;
    //# sourceMappingURL=escape.js.map
    
    /***/ }),
    
    /***/ 8092:
    /***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {
    
    "use strict";
    
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.unescape = exports.escape = exports.AST = exports.Minimatch = exports.match = exports.makeRe = exports.braceExpand = exports.defaults = exports.filter = exports.GLOBSTAR = exports.sep = exports.minimatch = void 0;
    const brace_expansion_1 = __importDefault(__nccwpck_require__(308));
    const assert_valid_pattern_js_1 = __nccwpck_require__(1987);
    const ast_js_1 = __nccwpck_require__(3084);
    const escape_js_1 = __nccwpck_require__(1410);
    const unescape_js_1 = __nccwpck_require__(1126);
    const minimatch = (p, pattern, options = {}) => {
        (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
        // shortcut: comments match nothing.
        if (!options.nocomment && pattern.charAt(0) === '#') {
            return false;
        }
        return new Minimatch(pattern, options).match(p);
    };
    exports.minimatch = minimatch;
    // Optimized checking for the most common glob patterns.
    const starDotExtRE = /^\*+([^+@!?\*\[\(]*)$/;
    const starDotExtTest = (ext) => (f) => !f.startsWith('.') && f.endsWith(ext);
    const starDotExtTestDot = (ext) => (f) => f.endsWith(ext);
    const starDotExtTestNocase = (ext) => {
        ext = ext.toLowerCase();
        return (f) => !f.startsWith('.') && f.toLowerCase().endsWith(ext);
    };
    const starDotExtTestNocaseDot = (ext) => {
        ext = ext.toLowerCase();
        return (f) => f.toLowerCase().endsWith(ext);
    };
    const starDotStarRE = /^\*+\.\*+$/;
    const starDotStarTest = (f) => !f.startsWith('.') && f.includes('.');
    const starDotStarTestDot = (f) => f !== '.' && f !== '..' && f.includes('.');
    const dotStarRE = /^\.\*+$/;
    const dotStarTest = (f) => f !== '.' && f !== '..' && f.startsWith('.');
    const starRE = /^\*+$/;
    const starTest = (f) => f.length !== 0 && !f.startsWith('.');
    const starTestDot = (f) => f.length !== 0 && f !== '.' && f !== '..';
    const qmarksRE = /^\?+([^+@!?\*\[\(]*)?$/;
    const qmarksTestNocase = ([$0, ext = '']) => {
        const noext = qmarksTestNoExt([$0]);
        if (!ext)
            return noext;
        ext = ext.toLowerCase();
        return (f) => noext(f) && f.toLowerCase().endsWith(ext);
    };
    const qmarksTestNocaseDot = ([$0, ext = '']) => {
        const noext = qmarksTestNoExtDot([$0]);
        if (!ext)
            return noext;
        ext = ext.toLowerCase();
        return (f) => noext(f) && f.toLowerCase().endsWith(ext);
    };
    const qmarksTestDot = ([$0, ext = '']) => {
        const noext = qmarksTestNoExtDot([$0]);
        return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
    };
    const qmarksTest = ([$0, ext = '']) => {
        const noext = qmarksTestNoExt([$0]);
        return !ext ? noext : (f) => noext(f) && f.endsWith(ext);
    };
    const qmarksTestNoExt = ([$0]) => {
        const len = $0.length;
        return (f) => f.length === len && !f.startsWith('.');
    };
    const qmarksTestNoExtDot = ([$0]) => {
        const len = $0.length;
        return (f) => f.length === len && f !== '.' && f !== '..';
    };
    /* c8 ignore start */
    const defaultPlatform = (typeof process === 'object' && process
        ? (typeof process.env === 'object' &&
            process.env &&
            process.env.__MINIMATCH_TESTING_PLATFORM__) ||
            process.platform
        : 'posix');
    const path = {
        win32: { sep: '\\' },
        posix: { sep: '/' },
    };
    /* c8 ignore stop */
    exports.sep = defaultPlatform === 'win32' ? path.win32.sep : path.posix.sep;
    exports.minimatch.sep = exports.sep;
    exports.GLOBSTAR = Symbol('globstar **');
    exports.minimatch.GLOBSTAR = exports.GLOBSTAR;
    // any single thing other than /
    // don't need to escape / when using new RegExp()
    const qmark = '[^/]';
    // * => any number of characters
    const star = qmark + '*?';
    // ** when dots are allowed.  Anything goes, except .. and .
    // not (^ or / followed by one or two dots followed by $ or /),
    // followed by anything, any number of times.
    const twoStarDot = '(?:(?!(?:\\/|^)(?:\\.{1,2})($|\\/)).)*?';
    // not a ^ or / followed by a dot,
    // followed by anything, any number of times.
    const twoStarNoDot = '(?:(?!(?:\\/|^)\\.).)*?';
    const filter = (pattern, options = {}) => (p) => (0, exports.minimatch)(p, pattern, options);
    exports.filter = filter;
    exports.minimatch.filter = exports.filter;
    const ext = (a, b = {}) => Object.assign({}, a, b);
    const defaults = (def) => {
        if (!def || typeof def !== 'object' || !Object.keys(def).length) {
            return exports.minimatch;
        }
        const orig = exports.minimatch;
        const m = (p, pattern, options = {}) => orig(p, pattern, ext(def, options));
        return Object.assign(m, {
            Minimatch: class Minimatch extends orig.Minimatch {
                constructor(pattern, options = {}) {
                    super(pattern, ext(def, options));
                }
                static defaults(options) {
                    return orig.defaults(ext(def, options)).Minimatch;
                }
            },
            AST: class AST extends orig.AST {
                /* c8 ignore start */
                constructor(type, parent, options = {}) {
                    super(type, parent, ext(def, options));
                }
                /* c8 ignore stop */
                static fromGlob(pattern, options = {}) {
                    return orig.AST.fromGlob(pattern, ext(def, options));
                }
            },
            unescape: (s, options = {}) => orig.unescape(s, ext(def, options)),
            escape: (s, options = {}) => orig.escape(s, ext(def, options)),
            filter: (pattern, options = {}) => orig.filter(pattern, ext(def, options)),
            defaults: (options) => orig.defaults(ext(def, options)),
            makeRe: (pattern, options = {}) => orig.makeRe(pattern, ext(def, options)),
            braceExpand: (pattern, options = {}) => orig.braceExpand(pattern, ext(def, options)),
            match: (list, pattern, options = {}) => orig.match(list, pattern, ext(def, options)),
            sep: orig.sep,
            GLOBSTAR: exports.GLOBSTAR,
        });
    };
    exports.defaults = defaults;
    exports.minimatch.defaults = exports.defaults;
    // Brace expansion:
    // a{b,c}d -> abd acd
    // a{b,}c -> abc ac
    // a{0..3}d -> a0d a1d a2d a3d
    // a{b,c{d,e}f}g -> abg acdfg acefg
    // a{b,c}d{e,f}g -> abdeg acdeg abdeg abdfg
    //
    // Invalid sets are not expanded.
    // a{2..}b -> a{2..}b
    // a{b}c -> a{b}c
    const braceExpand = (pattern, options = {}) => {
        (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
        // Thanks to Yeting Li <https://github.com/yetingli> for
        // improving this regexp to avoid a ReDOS vulnerability.
        if (options.nobrace || !/\{(?:(?!\{).)*\}/.test(pattern)) {
            // shortcut. no need to expand.
            return [pattern];
        }
        return (0, brace_expansion_1.default)(pattern);
    };
    exports.braceExpand = braceExpand;
    exports.minimatch.braceExpand = exports.braceExpand;
    // parse a component of the expanded set.
    // At this point, no pattern may contain "/" in it
    // so we're going to return a 2d array, where each entry is the full
    // pattern, split on '/', and then turned into a regular expression.
    // A regexp is made at the end which joins each array with an
    // escaped /, and another full one which joins each regexp with |.
    //
    // Following the lead of Bash 4.1, note that "**" only has special meaning
    // when it is the *only* thing in a path portion.  Otherwise, any series
    // of * is equivalent to a single *.  Globstar behavior is enabled by
    // default, and can be disabled by setting options.noglobstar.
    const makeRe = (pattern, options = {}) => new Minimatch(pattern, options).makeRe();
    exports.makeRe = makeRe;
    exports.minimatch.makeRe = exports.makeRe;
    const match = (list, pattern, options = {}) => {
        const mm = new Minimatch(pattern, options);
        list = list.filter(f => mm.match(f));
        if (mm.options.nonull && !list.length) {
            list.push(pattern);
        }
        return list;
    };
    exports.match = match;
    exports.minimatch.match = exports.match;
    // replace stuff like \* with *
    const globMagic = /[?*]|[+@!]\(.*?\)|\[|\]/;
    const regExpEscape = (s) => s.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&');
    class Minimatch {
        options;
        set;
        pattern;
        windowsPathsNoEscape;
        nonegate;
        negate;
        comment;
        empty;
        preserveMultipleSlashes;
        partial;
        globSet;
        globParts;
        nocase;
        isWindows;
        platform;
        windowsNoMagicRoot;
        regexp;
        constructor(pattern, options = {}) {
            (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
            options = options || {};
            this.options = options;
            this.pattern = pattern;
            this.platform = options.platform || defaultPlatform;
            this.isWindows = this.platform === 'win32';
            this.windowsPathsNoEscape =
                !!options.windowsPathsNoEscape || options.allowWindowsEscape === false;
            if (this.windowsPathsNoEscape) {
                this.pattern = this.pattern.replace(/\\/g, '/');
            }
            this.preserveMultipleSlashes = !!options.preserveMultipleSlashes;
            this.regexp = null;
            this.negate = false;
            this.nonegate = !!options.nonegate;
            this.comment = false;
            this.empty = false;
            this.partial = !!options.partial;
            this.nocase = !!this.options.nocase;
            this.windowsNoMagicRoot =
                options.windowsNoMagicRoot !== undefined
                    ? options.windowsNoMagicRoot
                    : !!(this.isWindows && this.nocase);
            this.globSet = [];
            this.globParts = [];
            this.set = [];
            // make the set of regexps etc.
            this.make();
        }
        hasMagic() {
            if (this.options.magicalBraces && this.set.length > 1) {
                return true;
            }
            for (const pattern of this.set) {
                for (const part of pattern) {
                    if (typeof part !== 'string')
                        return true;
                }
            }
            return false;
        }
        debug(..._) { }
        make() {
            const pattern = this.pattern;
            const options = this.options;
            // empty patterns and comments match nothing.
            if (!options.nocomment && pattern.charAt(0) === '#') {
                this.comment = true;
                return;
            }
            if (!pattern) {
                this.empty = true;
                return;
            }
            // step 1: figure out negation, etc.
            this.parseNegate();
            // step 2: expand braces
            this.globSet = [...new Set(this.braceExpand())];
            if (options.debug) {
                this.debug = (...args) => console.error(...args);
            }
            this.debug(this.pattern, this.globSet);
            // step 3: now we have a set, so turn each one into a series of
            // path-portion matching patterns.
            // These will be regexps, except in the case of "**", which is
            // set to the GLOBSTAR object for globstar behavior,
            // and will not contain any / characters
            //
            // First, we preprocess to make the glob pattern sets a bit simpler
            // and deduped.  There are some perf-killing patterns that can cause
            // problems with a glob walk, but we can simplify them down a bit.
            const rawGlobParts = this.globSet.map(s => this.slashSplit(s));
            this.globParts = this.preprocess(rawGlobParts);
            this.debug(this.pattern, this.globParts);
            // glob --> regexps
            let set = this.globParts.map((s, _, __) => {
                if (this.isWindows && this.windowsNoMagicRoot) {
                    // check if it's a drive or unc path.
                    const isUNC = s[0] === '' &&
                        s[1] === '' &&
                        (s[2] === '?' || !globMagic.test(s[2])) &&
                        !globMagic.test(s[3]);
                    const isDrive = /^[a-z]:/i.test(s[0]);
                    if (isUNC) {
                        return [...s.slice(0, 4), ...s.slice(4).map(ss => this.parse(ss))];
                    }
                    else if (isDrive) {
                        return [s[0], ...s.slice(1).map(ss => this.parse(ss))];
                    }
                }
                return s.map(ss => this.parse(ss));
            });
            this.debug(this.pattern, set);
            // filter out everything that didn't compile properly.
            this.set = set.filter(s => s.indexOf(false) === -1);
            // do not treat the ? in UNC paths as magic
            if (this.isWindows) {
                for (let i = 0; i < this.set.length; i++) {
                    const p = this.set[i];
                    if (p[0] === '' &&
                        p[1] === '' &&
                        this.globParts[i][2] === '?' &&
                        typeof p[3] === 'string' &&
                        /^[a-z]:$/i.test(p[3])) {
                        p[2] = '?';
                    }
                }
            }
            this.debug(this.pattern, this.set);
        }
        // various transforms to equivalent pattern sets that are
        // faster to process in a filesystem walk.  The goal is to
        // eliminate what we can, and push all ** patterns as far
        // to the right as possible, even if it increases the number
        // of patterns that we have to process.
        preprocess(globParts) {
            // if we're not in globstar mode, then turn all ** into *
            if (this.options.noglobstar) {
                for (let i = 0; i < globParts.length; i++) {
                    for (let j = 0; j < globParts[i].length; j++) {
                        if (globParts[i][j] === '**') {
                            globParts[i][j] = '*';
                        }
                    }
                }
            }
            const { optimizationLevel = 1 } = this.options;
            if (optimizationLevel >= 2) {
                // aggressive optimization for the purpose of fs walking
                globParts = this.firstPhasePreProcess(globParts);
                globParts = this.secondPhasePreProcess(globParts);
            }
            else if (optimizationLevel >= 1) {
                // just basic optimizations to remove some .. parts
                globParts = this.levelOneOptimize(globParts);
            }
            else {
                // just collapse multiple ** portions into one
                globParts = this.adjascentGlobstarOptimize(globParts);
            }
            return globParts;
        }
        // just get rid of adjascent ** portions
        adjascentGlobstarOptimize(globParts) {
            return globParts.map(parts => {
                let gs = -1;
                while (-1 !== (gs = parts.indexOf('**', gs + 1))) {
                    let i = gs;
                    while (parts[i + 1] === '**') {
                        i++;
                    }
                    if (i !== gs) {
                        parts.splice(gs, i - gs);
                    }
                }
                return parts;
            });
        }
        // get rid of adjascent ** and resolve .. portions
        levelOneOptimize(globParts) {
            return globParts.map(parts => {
                parts = parts.reduce((set, part) => {
                    const prev = set[set.length - 1];
                    if (part === '**' && prev === '**') {
                        return set;
                    }
                    if (part === '..') {
                        if (prev && prev !== '..' && prev !== '.' && prev !== '**') {
                            set.pop();
                            return set;
                        }
                    }
                    set.push(part);
                    return set;
                }, []);
                return parts.length === 0 ? [''] : parts;
            });
        }
        levelTwoFileOptimize(parts) {
            if (!Array.isArray(parts)) {
                parts = this.slashSplit(parts);
            }
            let didSomething = false;
            do {
                didSomething = false;
                // <pre>/<e>/<rest> -> <pre>/<rest>
                if (!this.preserveMultipleSlashes) {
                    for (let i = 1; i < parts.length - 1; i++) {
                        const p = parts[i];
                        // don't squeeze out UNC patterns
                        if (i === 1 && p === '' && parts[0] === '')
                            continue;
                        if (p === '.' || p === '') {
                            didSomething = true;
                            parts.splice(i, 1);
                            i--;
                        }
                    }
                    if (parts[0] === '.' &&
                        parts.length === 2 &&
                        (parts[1] === '.' || parts[1] === '')) {
                        didSomething = true;
                        parts.pop();
                    }
                }
                // <pre>/<p>/../<rest> -> <pre>/<rest>
                let dd = 0;
                while (-1 !== (dd = parts.indexOf('..', dd + 1))) {
                    const p = parts[dd - 1];
                    if (p && p !== '.' && p !== '..' && p !== '**') {
                        didSomething = true;
                        parts.splice(dd - 1, 2);
                        dd -= 2;
                    }
                }
            } while (didSomething);
            return parts.length === 0 ? [''] : parts;
        }
        // First phase: single-pattern processing
        // <pre> is 1 or more portions
        // <rest> is 1 or more portions
        // <p> is any portion other than ., .., '', or **
        // <e> is . or ''
        //
        // **/.. is *brutal* for filesystem walking performance, because
        // it effectively resets the recursive walk each time it occurs,
        // and ** cannot be reduced out by a .. pattern part like a regexp
        // or most strings (other than .., ., and '') can be.
        //
        // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
        // <pre>/<e>/<rest> -> <pre>/<rest>
        // <pre>/<p>/../<rest> -> <pre>/<rest>
        // **/**/<rest> -> **/<rest>
        //
        // **/*/<rest> -> */**/<rest> <== not valid because ** doesn't follow
        // this WOULD be allowed if ** did follow symlinks, or * didn't
        firstPhasePreProcess(globParts) {
            let didSomething = false;
            do {
                didSomething = false;
                // <pre>/**/../<p>/<p>/<rest> -> {<pre>/../<p>/<p>/<rest>,<pre>/**/<p>/<p>/<rest>}
                for (let parts of globParts) {
                    let gs = -1;
                    while (-1 !== (gs = parts.indexOf('**', gs + 1))) {
                        let gss = gs;
                        while (parts[gss + 1] === '**') {
                            // <pre>/**/**/<rest> -> <pre>/**/<rest>
                            gss++;
                        }
                        // eg, if gs is 2 and gss is 4, that means we have 3 **
                        // parts, and can remove 2 of them.
                        if (gss > gs) {
                            parts.splice(gs + 1, gss - gs);
                        }
                        let next = parts[gs + 1];
                        const p = parts[gs + 2];
                        const p2 = parts[gs + 3];
                        if (next !== '..')
                            continue;
                        if (!p ||
                            p === '.' ||
                            p === '..' ||
                            !p2 ||
                            p2 === '.' ||
                            p2 === '..') {
                            continue;
                        }
                        didSomething = true;
                        // edit parts in place, and push the new one
                        parts.splice(gs, 1);
                        const other = parts.slice(0);
                        other[gs] = '**';
                        globParts.push(other);
                        gs--;
                    }
                    // <pre>/<e>/<rest> -> <pre>/<rest>
                    if (!this.preserveMultipleSlashes) {
                        for (let i = 1; i < parts.length - 1; i++) {
                            const p = parts[i];
                            // don't squeeze out UNC patterns
                            if (i === 1 && p === '' && parts[0] === '')
                                continue;
                            if (p === '.' || p === '') {
                                didSomething = true;
                                parts.splice(i, 1);
                                i--;
                            }
                        }
                        if (parts[0] === '.' &&
                            parts.length === 2 &&
                            (parts[1] === '.' || parts[1] === '')) {
                            didSomething = true;
                            parts.pop();
                        }
                    }
                    // <pre>/<p>/../<rest> -> <pre>/<rest>
                    let dd = 0;
                    while (-1 !== (dd = parts.indexOf('..', dd + 1))) {
                        const p = parts[dd - 1];
                        if (p && p !== '.' && p !== '..' && p !== '**') {
                            didSomething = true;
                            const needDot = dd === 1 && parts[dd + 1] === '**';
                            const splin = needDot ? ['.'] : [];
                            parts.splice(dd - 1, 2, ...splin);
                            if (parts.length === 0)
                                parts.push('');
                            dd -= 2;
                        }
                    }
                }
            } while (didSomething);
            return globParts;
        }
        // second phase: multi-pattern dedupes
        // {<pre>/*/<rest>,<pre>/<p>/<rest>} -> <pre>/*/<rest>
        // {<pre>/<rest>,<pre>/<rest>} -> <pre>/<rest>
        // {<pre>/**/<rest>,<pre>/<rest>} -> <pre>/**/<rest>
        //
        // {<pre>/**/<rest>,<pre>/**/<p>/<rest>} -> <pre>/**/<rest>
        // ^-- not valid because ** doens't follow symlinks
        secondPhasePreProcess(globParts) {
            for (let i = 0; i < globParts.length - 1; i++) {
                for (let j = i + 1; j < globParts.length; j++) {
                    const matched = this.partsMatch(globParts[i], globParts[j], !this.preserveMultipleSlashes);
                    if (matched) {
                        globParts[i] = [];
                        globParts[j] = matched;
                        break;
                    }
                }
            }
            return globParts.filter(gs => gs.length);
        }
        partsMatch(a, b, emptyGSMatch = false) {
            let ai = 0;
            let bi = 0;
            let result = [];
            let which = '';
            while (ai < a.length && bi < b.length) {
                if (a[ai] === b[bi]) {
                    result.push(which === 'b' ? b[bi] : a[ai]);
                    ai++;
                    bi++;
                }
                else if (emptyGSMatch && a[ai] === '**' && b[bi] === a[ai + 1]) {
                    result.push(a[ai]);
                    ai++;
                }
                else if (emptyGSMatch && b[bi] === '**' && a[ai] === b[bi + 1]) {
                    result.push(b[bi]);
                    bi++;
                }
                else if (a[ai] === '*' &&
                    b[bi] &&
                    (this.options.dot || !b[bi].startsWith('.')) &&
                    b[bi] !== '**') {
                    if (which === 'b')
                        return false;
                    which = 'a';
                    result.push(a[ai]);
                    ai++;
                    bi++;
                }
                else if (b[bi] === '*' &&
                    a[ai] &&
                    (this.options.dot || !a[ai].startsWith('.')) &&
                    a[ai] !== '**') {
                    if (which === 'a')
                        return false;
                    which = 'b';
                    result.push(b[bi]);
                    ai++;
                    bi++;
                }
                else {
                    return false;
                }
            }
            // if we fall out of the loop, it means they two are identical
            // as long as their lengths match
            return a.length === b.length && result;
        }
        parseNegate() {
            if (this.nonegate)
                return;
            const pattern = this.pattern;
            let negate = false;
            let negateOffset = 0;
            for (let i = 0; i < pattern.length && pattern.charAt(i) === '!'; i++) {
                negate = !negate;
                negateOffset++;
            }
            if (negateOffset)
                this.pattern = pattern.slice(negateOffset);
            this.negate = negate;
        }
        // set partial to true to test if, for example,
        // "/a/b" matches the start of "/*/b/*/d"
        // Partial means, if you run out of file before you run
        // out of pattern, then that's fine, as long as all
        // the parts match.
        matchOne(file, pattern, partial = false) {
            const options = this.options;
            // UNC paths like //?/X:/... can match X:/... and vice versa
            // Drive letters in absolute drive or unc paths are always compared
            // case-insensitively.
            if (this.isWindows) {
                const fileDrive = typeof file[0] === 'string' && /^[a-z]:$/i.test(file[0]);
                const fileUNC = !fileDrive &&
                    file[0] === '' &&
                    file[1] === '' &&
                    file[2] === '?' &&
                    /^[a-z]:$/i.test(file[3]);
                const patternDrive = typeof pattern[0] === 'string' && /^[a-z]:$/i.test(pattern[0]);
                const patternUNC = !patternDrive &&
                    pattern[0] === '' &&
                    pattern[1] === '' &&
                    pattern[2] === '?' &&
                    typeof pattern[3] === 'string' &&
                    /^[a-z]:$/i.test(pattern[3]);
                const fdi = fileUNC ? 3 : fileDrive ? 0 : undefined;
                const pdi = patternUNC ? 3 : patternDrive ? 0 : undefined;
                if (typeof fdi === 'number' && typeof pdi === 'number') {
                    const [fd, pd] = [file[fdi], pattern[pdi]];
                    if (fd.toLowerCase() === pd.toLowerCase()) {
                        pattern[pdi] = fd;
                        if (pdi > fdi) {
                            pattern = pattern.slice(pdi);
                        }
                        else if (fdi > pdi) {
                            file = file.slice(fdi);
                        }
                    }
                }
            }
            // resolve and reduce . and .. portions in the file as well.
            // dont' need to do the second phase, because it's only one string[]
            const { optimizationLevel = 1 } = this.options;
            if (optimizationLevel >= 2) {
                file = this.levelTwoFileOptimize(file);
            }
            this.debug('matchOne', this, { file, pattern });
            this.debug('matchOne', file.length, pattern.length);
            for (var fi = 0, pi = 0, fl = file.length, pl = pattern.length; fi < fl && pi < pl; fi++, pi++) {
                this.debug('matchOne loop');
                var p = pattern[pi];
                var f = file[fi];
                this.debug(pattern, p, f);
                // should be impossible.
                // some invalid regexp stuff in the set.
                /* c8 ignore start */
                if (p === false) {
                    return false;
                }
                /* c8 ignore stop */
                if (p === exports.GLOBSTAR) {
                    this.debug('GLOBSTAR', [pattern, p, f]);
                    // "**"
                    // a/**/b/**/c would match the following:
                    // a/b/x/y/z/c
                    // a/x/y/z/b/c
                    // a/b/x/b/x/c
                    // a/b/c
                    // To do this, take the rest of the pattern after
                    // the **, and see if it would match the file remainder.
                    // If so, return success.
                    // If not, the ** "swallows" a segment, and try again.
                    // This is recursively awful.
                    //
                    // a/**/b/**/c matching a/b/x/y/z/c
                    // - a matches a
                    // - doublestar
                    //   - matchOne(b/x/y/z/c, b/**/c)
                    //     - b matches b
                    //     - doublestar
                    //       - matchOne(x/y/z/c, c) -> no
                    //       - matchOne(y/z/c, c) -> no
                    //       - matchOne(z/c, c) -> no
                    //       - matchOne(c, c) yes, hit
                    var fr = fi;
                    var pr = pi + 1;
                    if (pr === pl) {
                        this.debug('** at the end');
                        // a ** at the end will just swallow the rest.
                        // We have found a match.
                        // however, it will not swallow /.x, unless
                        // options.dot is set.
                        // . and .. are *never* matched by **, for explosively
                        // exponential reasons.
                        for (; fi < fl; fi++) {
                            if (file[fi] === '.' ||
                                file[fi] === '..' ||
                                (!options.dot && file[fi].charAt(0) === '.'))
                                return false;
                        }
                        return true;
                    }
                    // ok, let's see if we can swallow whatever we can.
                    while (fr < fl) {
                        var swallowee = file[fr];
                        this.debug('\nglobstar while', file, fr, pattern, pr, swallowee);
                        // XXX remove this slice.  Just pass the start index.
                        if (this.matchOne(file.slice(fr), pattern.slice(pr), partial)) {
                            this.debug('globstar found match!', fr, fl, swallowee);
                            // found a match.
                            return true;
                        }
                        else {
                            // can't swallow "." or ".." ever.
                            // can only swallow ".foo" when explicitly asked.
                            if (swallowee === '.' ||
                                swallowee === '..' ||
                                (!options.dot && swallowee.charAt(0) === '.')) {
                                this.debug('dot detected!', file, fr, pattern, pr);
                                break;
                            }
                            // ** swallows a segment, and continue.
                            this.debug('globstar swallow a segment, and continue');
                            fr++;
                        }
                    }
                    // no match was found.
                    // However, in partial mode, we can't say this is necessarily over.
                    /* c8 ignore start */
                    if (partial) {
                        // ran out of file
                        this.debug('\n>>> no match, partial?', file, fr, pattern, pr);
                        if (fr === fl) {
                            return true;
                        }
                    }
                    /* c8 ignore stop */
                    return false;
                }
                // something other than **
                // non-magic patterns just have to match exactly
                // patterns with magic have been turned into regexps.
                let hit;
                if (typeof p === 'string') {
                    hit = f === p;
                    this.debug('string match', p, f, hit);
                }
                else {
                    hit = p.test(f);
                    this.debug('pattern match', p, f, hit);
                }
                if (!hit)
                    return false;
            }
            // Note: ending in / means that we'll get a final ""
            // at the end of the pattern.  This can only match a
            // corresponding "" at the end of the file.
            // If the file ends in /, then it can only match a
            // a pattern that ends in /, unless the pattern just
            // doesn't have any more for it. But, a/b/ should *not*
            // match "a/b/*", even though "" matches against the
            // [^/]*? pattern, except in partial mode, where it might
            // simply not be reached yet.
            // However, a/b/ should still satisfy a/*
            // now either we fell off the end of the pattern, or we're done.
            if (fi === fl && pi === pl) {
                // ran out of pattern and filename at the same time.
                // an exact hit!
                return true;
            }
            else if (fi === fl) {
                // ran out of file, but still had pattern left.
                // this is ok if we're doing the match as part of
                // a glob fs traversal.
                return partial;
            }
            else if (pi === pl) {
                // ran out of pattern, still have file left.
                // this is only acceptable if we're on the very last
                // empty segment of a file with a trailing slash.
                // a/* should match a/b/
                return fi === fl - 1 && file[fi] === '';
                /* c8 ignore start */
            }
            else {
                // should be unreachable.
                throw new Error('wtf?');
            }
            /* c8 ignore stop */
        }
        braceExpand() {
            return (0, exports.braceExpand)(this.pattern, this.options);
        }
        parse(pattern) {
            (0, assert_valid_pattern_js_1.assertValidPattern)(pattern);
            const options = this.options;
            // shortcuts
            if (pattern === '**')
                return exports.GLOBSTAR;
            if (pattern === '')
                return '';
            // far and away, the most common glob pattern parts are
            // *, *.*, and *.<ext>  Add a fast check method for those.
            let m;
            let fastTest = null;
            if ((m = pattern.match(starRE))) {
                fastTest = options.dot ? starTestDot : starTest;
            }
            else if ((m = pattern.match(starDotExtRE))) {
                fastTest = (options.nocase
                    ? options.dot
                        ? starDotExtTestNocaseDot
                        : starDotExtTestNocase
                    : options.dot
                        ? starDotExtTestDot
                        : starDotExtTest)(m[1]);
            }
            else if ((m = pattern.match(qmarksRE))) {
                fastTest = (options.nocase
                    ? options.dot
                        ? qmarksTestNocaseDot
                        : qmarksTestNocase
                    : options.dot
                        ? qmarksTestDot
                        : qmarksTest)(m);
            }
            else if ((m = pattern.match(starDotStarRE))) {
                fastTest = options.dot ? starDotStarTestDot : starDotStarTest;
            }
            else if ((m = pattern.match(dotStarRE))) {
                fastTest = dotStarTest;
            }
            const re = ast_js_1.AST.fromGlob(pattern, this.options).toMMPattern();
            if (fastTest && typeof re === 'object') {
                // Avoids overriding in frozen environments
                Reflect.defineProperty(re, 'test', { value: fastTest });
            }
            return re;
        }
        makeRe() {
            if (this.regexp || this.regexp === false)
                return this.regexp;
            // at this point, this.set is a 2d array of partial
            // pattern strings, or "**".
            //
            // It's better to use .match().  This function shouldn't
            // be used, really, but it's pretty convenient sometimes,
            // when you just want to work with a regex.
            const set = this.set;
            if (!set.length) {
                this.regexp = false;
                return this.regexp;
            }
            const options = this.options;
            const twoStar = options.noglobstar
                ? star
                : options.dot
                    ? twoStarDot
                    : twoStarNoDot;
            const flags = new Set(options.nocase ? ['i'] : []);
            // regexpify non-globstar patterns
            // if ** is only item, then we just do one twoStar
            // if ** is first, and there are more, prepend (\/|twoStar\/)? to next
            // if ** is last, append (\/twoStar|) to previous
            // if ** is in the middle, append (\/|\/twoStar\/) to previous
            // then filter out GLOBSTAR symbols
            let re = set
                .map(pattern => {
                const pp = pattern.map(p => {
                    if (p instanceof RegExp) {
                        for (const f of p.flags.split(''))
                            flags.add(f);
                    }
                    return typeof p === 'string'
                        ? regExpEscape(p)
                        : p === exports.GLOBSTAR
                            ? exports.GLOBSTAR
                            : p._src;
                });
                pp.forEach((p, i) => {
                    const next = pp[i + 1];
                    const prev = pp[i - 1];
                    if (p !== exports.GLOBSTAR || prev === exports.GLOBSTAR) {
                        return;
                    }
                    if (prev === undefined) {
                        if (next !== undefined && next !== exports.GLOBSTAR) {
                            pp[i + 1] = '(?:\\/|' + twoStar + '\\/)?' + next;
                        }
                        else {
                            pp[i] = twoStar;
                        }
                    }
                    else if (next === undefined) {
                        pp[i - 1] = prev + '(?:\\/|' + twoStar + ')?';
                    }
                    else if (next !== exports.GLOBSTAR) {
                        pp[i - 1] = prev + '(?:\\/|\\/' + twoStar + '\\/)' + next;
                        pp[i + 1] = exports.GLOBSTAR;
                    }
                });
                return pp.filter(p => p !== exports.GLOBSTAR).join('/');
            })
                .join('|');
            // need to wrap in parens if we had more than one thing with |,
            // otherwise only the first will be anchored to ^ and the last to $
            const [open, close] = set.length > 1 ? ['(?:', ')'] : ['', ''];
            // must match entire pattern
            // ending in a * or ** will make it less strict.
            re = '^' + open + re + close + '$';
            // can match anything, as long as it's not this.
            if (this.negate)
                re = '^(?!' + re + ').+$';
            try {
                this.regexp = new RegExp(re, [...flags].join(''));
                /* c8 ignore start */
            }
            catch (ex) {
                // should be impossible
                this.regexp = false;
            }
            /* c8 ignore stop */
            return this.regexp;
        }
        slashSplit(p) {
            // if p starts with // on windows, we preserve that
            // so that UNC paths aren't broken.  Otherwise, any number of
            // / characters are coalesced into one, unless
            // preserveMultipleSlashes is set to true.
            if (this.preserveMultipleSlashes) {
                return p.split('/');
            }
            else if (this.isWindows && /^\/\/[^\/]+/.test(p)) {
                // add an extra '' for the one we lose
                return ['', ...p.split(/\/+/)];
            }
            else {
                return p.split(/\/+/);
            }
        }
        match(f, partial = this.partial) {
            this.debug('match', f, this.pattern);
            // short-circuit in the case of busted things.
            // comments, etc.
            if (this.comment) {
                return false;
            }
            if (this.empty) {
                return f === '';
            }
            if (f === '/' && partial) {
                return true;
            }
            const options = this.options;
            // windows: need to use /, not \
            if (this.isWindows) {
                f = f.split('\\').join('/');
            }
            // treat the test path as a set of pathparts.
            const ff = this.slashSplit(f);
            this.debug(this.pattern, 'split', ff);
            // just ONE of the pattern sets in this.set needs to match
            // in order for it to be valid.  If negating, then just one
            // match means that we have failed.
            // Either way, return on the first hit.
            const set = this.set;
            this.debug(this.pattern, 'set', set);
            // Find the basename of the path by looking for the last non-empty segment
            let filename = ff[ff.length - 1];
            if (!filename) {
                for (let i = ff.length - 2; !filename && i >= 0; i--) {
                    filename = ff[i];
                }
            }
            for (let i = 0; i < set.length; i++) {
                const pattern = set[i];
                let file = ff;
                if (options.matchBase && pattern.length === 1) {
                    file = [filename];
                }
                const hit = this.matchOne(file, pattern, partial);
                if (hit) {
                    if (options.flipNegate) {
                        return true;
                    }
                    return !this.negate;
                }
            }
            // didn't get any hits.  this is success if it's a negative
            // pattern, failure otherwise.
            if (options.flipNegate) {
                return false;
            }
            return this.negate;
        }
        static defaults(def) {
            return exports.minimatch.defaults(def).Minimatch;
        }
    }
    exports.Minimatch = Minimatch;
    /* c8 ignore start */
    var ast_js_2 = __nccwpck_require__(3084);
    Object.defineProperty(exports, "AST", ({ enumerable: true, get: function () { return ast_js_2.AST; } }));
    var escape_js_2 = __nccwpck_require__(1410);
    Object.defineProperty(exports, "escape", ({ enumerable: true, get: function () { return escape_js_2.escape; } }));
    var unescape_js_2 = __nccwpck_require__(1126);
    Object.defineProperty(exports, "unescape", ({ enumerable: true, get: function () { return unescape_js_2.unescape; } }));
    /* c8 ignore stop */
    exports.minimatch.AST = ast_js_1.AST;
    exports.minimatch.Minimatch = Minimatch;
    exports.minimatch.escape = escape_js_1.escape;
    exports.minimatch.unescape = unescape_js_1.unescape;
    //# sourceMappingURL=index.js.map
    
    /***/ }),
    
    /***/ 1126:
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.unescape = void 0;
    /**
     * Un-escape a string that has been escaped with {@link escape}.
     *
     * If the {@link windowsPathsNoEscape} option is used, then square-brace
     * escapes are removed, but not backslash escapes.  For example, it will turn
     * the string `'[*]'` into `*`, but it will not turn `'\\*'` into `'*'`,
     * becuase `\` is a path separator in `windowsPathsNoEscape` mode.
     *
     * When `windowsPathsNoEscape` is not set, then both brace escapes and
     * backslash escapes are removed.
     *
     * Slashes (and backslashes in `windowsPathsNoEscape` mode) cannot be escaped
     * or unescaped.
     */
    const unescape = (s, { windowsPathsNoEscape = false, } = {}) => {
        return windowsPathsNoEscape
            ? s.replace(/\[([^\/\\])\]/g, '$1')
            : s.replace(/((?!\\).|^)\[([^\/\\])\]/g, '$1$2').replace(/\\([^\/])/g, '$1');
    };
    exports.unescape = unescape;
    //# sourceMappingURL=unescape.js.map
    
    /***/ }),
    
    /***/ 7885:
    /***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {
    
    "use strict";
    
    var __importDefault = (this && this.__importDefault) || function (mod) {
        return (mod && mod.__esModule) ? mod : { "default": mod };
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.Minipass = exports.isWritable = exports.isReadable = exports.isStream = void 0;
    const proc = typeof process === 'object' && process
        ? process
        : {
            stdout: null,
            stderr: null,
        };
    const node_events_1 = __nccwpck_require__(5673);
    const node_stream_1 = __importDefault(__nccwpck_require__(4492));
    const node_string_decoder_1 = __nccwpck_require__(6915);
    /**
     * Return true if the argument is a Minipass stream, Node stream, or something
     * else that Minipass can interact with.
     */
    const isStream = (s) => !!s &&
        typeof s === 'object' &&
        (s instanceof Minipass ||
            s instanceof node_stream_1.default ||
            (0, exports.isReadable)(s) ||
            (0, exports.isWritable)(s));
    exports.isStream = isStream;
    /**
     * Return true if the argument is a valid {@link Minipass.Readable}
     */
    const isReadable = (s) => !!s &&
        typeof s === 'object' &&
        s instanceof node_events_1.EventEmitter &&
        typeof s.pipe === 'function' &&
        // node core Writable streams have a pipe() method, but it throws
        s.pipe !== node_stream_1.default.Writable.prototype.pipe;
    exports.isReadable = isReadable;
    /**
     * Return true if the argument is a valid {@link Minipass.Writable}
     */
    const isWritable = (s) => !!s &&
        typeof s === 'object' &&
        s instanceof node_events_1.EventEmitter &&
        typeof s.write === 'function' &&
        typeof s.end === 'function';
    exports.isWritable = isWritable;
    const EOF = Symbol('EOF');
    const MAYBE_EMIT_END = Symbol('maybeEmitEnd');
    const EMITTED_END = Symbol('emittedEnd');
    const EMITTING_END = Symbol('emittingEnd');
    const EMITTED_ERROR = Symbol('emittedError');
    const CLOSED = Symbol('closed');
    const READ = Symbol('read');
    const FLUSH = Symbol('flush');
    const FLUSHCHUNK = Symbol('flushChunk');
    const ENCODING = Symbol('encoding');
    const DECODER = Symbol('decoder');
    const FLOWING = Symbol('flowing');
    const PAUSED = Symbol('paused');
    const RESUME = Symbol('resume');
    const BUFFER = Symbol('buffer');
    const PIPES = Symbol('pipes');
    const BUFFERLENGTH = Symbol('bufferLength');
    const BUFFERPUSH = Symbol('bufferPush');
    const BUFFERSHIFT = Symbol('bufferShift');
    const OBJECTMODE = Symbol('objectMode');
    // internal event when stream is destroyed
    const DESTROYED = Symbol('destroyed');
    // internal event when stream has an error
    const ERROR = Symbol('error');
    const EMITDATA = Symbol('emitData');
    const EMITEND = Symbol('emitEnd');
    const EMITEND2 = Symbol('emitEnd2');
    const ASYNC = Symbol('async');
    const ABORT = Symbol('abort');
    const ABORTED = Symbol('aborted');
    const SIGNAL = Symbol('signal');
    const DATALISTENERS = Symbol('dataListeners');
    const DISCARDED = Symbol('discarded');
    const defer = (fn) => Promise.resolve().then(fn);
    const nodefer = (fn) => fn();
    const isEndish = (ev) => ev === 'end' || ev === 'finish' || ev === 'prefinish';
    const isArrayBufferLike = (b) => b instanceof ArrayBuffer ||
        (!!b &&
            typeof b === 'object' &&
            b.constructor &&
            b.constructor.name === 'ArrayBuffer' &&
            b.byteLength >= 0);
    const isArrayBufferView = (b) => !Buffer.isBuffer(b) && ArrayBuffer.isView(b);
    /**
     * Internal class representing a pipe to a destination stream.
     *
     * @internal
     */
    class Pipe {
        src;
        dest;
        opts;
        ondrain;
        constructor(src, dest, opts) {
            this.src = src;
            this.dest = dest;
            this.opts = opts;
            this.ondrain = () => src[RESUME]();
            this.dest.on('drain', this.ondrain);
        }
        unpipe() {
            this.dest.removeListener('drain', this.ondrain);
        }
        // only here for the prototype
        /* c8 ignore start */
        proxyErrors(_er) { }
        /* c8 ignore stop */
        end() {
            this.unpipe();
            if (this.opts.end)
                this.dest.end();
        }
    }
    /**
     * Internal class representing a pipe to a destination stream where
     * errors are proxied.
     *
     * @internal
     */
    class PipeProxyErrors extends Pipe {
        unpipe() {
            this.src.removeListener('error', this.proxyErrors);
            super.unpipe();
        }
        constructor(src, dest, opts) {
            super(src, dest, opts);
            this.proxyErrors = er => dest.emit('error', er);
            src.on('error', this.proxyErrors);
        }
    }
    const isObjectModeOptions = (o) => !!o.objectMode;
    const isEncodingOptions = (o) => !o.objectMode && !!o.encoding && o.encoding !== 'buffer';
    /**
     * Main export, the Minipass class
     *
     * `RType` is the type of data emitted, defaults to Buffer
     *
     * `WType` is the type of data to be written, if RType is buffer or string,
     * then any {@link Minipass.ContiguousData} is allowed.
     *
     * `Events` is the set of event handler signatures that this object
     * will emit, see {@link Minipass.Events}
     */
    class Minipass extends node_events_1.EventEmitter {
        [FLOWING] = false;
        [PAUSED] = false;
        [PIPES] = [];
        [BUFFER] = [];
        [OBJECTMODE];
        [ENCODING];
        [ASYNC];
        [DECODER];
        [EOF] = false;
        [EMITTED_END] = false;
        [EMITTING_END] = false;
        [CLOSED] = false;
        [EMITTED_ERROR] = null;
        [BUFFERLENGTH] = 0;
        [DESTROYED] = false;
        [SIGNAL];
        [ABORTED] = false;
        [DATALISTENERS] = 0;
        [DISCARDED] = false;
        /**
         * true if the stream can be written
         */
        writable = true;
        /**
         * true if the stream can be read
         */
        readable = true;
        /**
         * If `RType` is Buffer, then options do not need to be provided.
         * Otherwise, an options object must be provided to specify either
         * {@link Minipass.SharedOptions.objectMode} or
         * {@link Minipass.SharedOptions.encoding}, as appropriate.
         */
        constructor(...args) {
            const options = (args[0] ||
                {});
            super();
            if (options.objectMode && typeof options.encoding === 'string') {
                throw new TypeError('Encoding and objectMode may not be used together');
            }
            if (isObjectModeOptions(options)) {
                this[OBJECTMODE] = true;
                this[ENCODING] = null;
            }
            else if (isEncodingOptions(options)) {
                this[ENCODING] = options.encoding;
                this[OBJECTMODE] = false;
            }
            else {
                this[OBJECTMODE] = false;
                this[ENCODING] = null;
            }
            this[ASYNC] = !!options.async;
            this[DECODER] = this[ENCODING]
                ? new node_string_decoder_1.StringDecoder(this[ENCODING])
                : null;
            //@ts-ignore - private option for debugging and testing
            if (options && options.debugExposeBuffer === true) {
                Object.defineProperty(this, 'buffer', { get: () => this[BUFFER] });
            }
            //@ts-ignore - private option for debugging and testing
            if (options && options.debugExposePipes === true) {
                Object.defineProperty(this, 'pipes', { get: () => this[PIPES] });
            }
            const { signal } = options;
            if (signal) {
                this[SIGNAL] = signal;
                if (signal.aborted) {
                    this[ABORT]();
                }
                else {
                    signal.addEventListener('abort', () => this[ABORT]());
                }
            }
        }
        /**
         * The amount of data stored in the buffer waiting to be read.
         *
         * For Buffer strings, this will be the total byte length.
         * For string encoding streams, this will be the string character length,
         * according to JavaScript's `string.length` logic.
         * For objectMode streams, this is a count of the items waiting to be
         * emitted.
         */
        get bufferLength() {
            return this[BUFFERLENGTH];
        }
        /**
         * The `BufferEncoding` currently in use, or `null`
         */
        get encoding() {
            return this[ENCODING];
        }
        /**
         * @deprecated - This is a read only property
         */
        set encoding(_enc) {
            throw new Error('Encoding must be set at instantiation time');
        }
        /**
         * @deprecated - Encoding may only be set at instantiation time
         */
        setEncoding(_enc) {
            throw new Error('Encoding must be set at instantiation time');
        }
        /**
         * True if this is an objectMode stream
         */
        get objectMode() {
            return this[OBJECTMODE];
        }
        /**
         * @deprecated - This is a read-only property
         */
        set objectMode(_om) {
            throw new Error('objectMode must be set at instantiation time');
        }
        /**
         * true if this is an async stream
         */
        get ['async']() {
            return this[ASYNC];
        }
        /**
         * Set to true to make this stream async.
         *
         * Once set, it cannot be unset, as this would potentially cause incorrect
         * behavior.  Ie, a sync stream can be made async, but an async stream
         * cannot be safely made sync.
         */
        set ['async'](a) {
            this[ASYNC] = this[ASYNC] || !!a;
        }
        // drop everything and get out of the flow completely
        [ABORT]() {
            this[ABORTED] = true;
            this.emit('abort', this[SIGNAL]?.reason);
            this.destroy(this[SIGNAL]?.reason);
        }
        /**
         * True if the stream has been aborted.
         */
        get aborted() {
            return this[ABORTED];
        }
        /**
         * No-op setter. Stream aborted status is set via the AbortSignal provided
         * in the constructor options.
         */
        set aborted(_) { }
        write(chunk, encoding, cb) {
            if (this[ABORTED])
                return false;
            if (this[EOF])
                throw new Error('write after end');
            if (this[DESTROYED]) {
                this.emit('error', Object.assign(new Error('Cannot call write after a stream was destroyed'), { code: 'ERR_STREAM_DESTROYED' }));
                return true;
            }
            if (typeof encoding === 'function') {
                cb = encoding;
                encoding = 'utf8';
            }
            if (!encoding)
                encoding = 'utf8';
            const fn = this[ASYNC] ? defer : nodefer;
            // convert array buffers and typed array views into buffers
            // at some point in the future, we may want to do the opposite!
            // leave strings and buffers as-is
            // anything is only allowed if in object mode, so throw
            if (!this[OBJECTMODE] && !Buffer.isBuffer(chunk)) {
                if (isArrayBufferView(chunk)) {
                    //@ts-ignore - sinful unsafe type changing
                    chunk = Buffer.from(chunk.buffer, chunk.byteOffset, chunk.byteLength);
                }
                else if (isArrayBufferLike(chunk)) {
                    //@ts-ignore - sinful unsafe type changing
                    chunk = Buffer.from(chunk);
                }
                else if (typeof chunk !== 'string') {
                    throw new Error('Non-contiguous data written to non-objectMode stream');
                }
            }
            // handle object mode up front, since it's simpler
            // this yields better performance, fewer checks later.
            if (this[OBJECTMODE]) {
                // maybe impossible?
                /* c8 ignore start */
                if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
                    this[FLUSH](true);
                /* c8 ignore stop */
                if (this[FLOWING])
                    this.emit('data', chunk);
                else
                    this[BUFFERPUSH](chunk);
                if (this[BUFFERLENGTH] !== 0)
                    this.emit('readable');
                if (cb)
                    fn(cb);
                return this[FLOWING];
            }
            // at this point the chunk is a buffer or string
            // don't buffer it up or send it to the decoder
            if (!chunk.length) {
                if (this[BUFFERLENGTH] !== 0)
                    this.emit('readable');
                if (cb)
                    fn(cb);
                return this[FLOWING];
            }
            // fast-path writing strings of same encoding to a stream with
            // an empty buffer, skipping the buffer/decoder dance
            if (typeof chunk === 'string' &&
                // unless it is a string already ready for us to use
                !(encoding === this[ENCODING] && !this[DECODER]?.lastNeed)) {
                //@ts-ignore - sinful unsafe type change
                chunk = Buffer.from(chunk, encoding);
            }
            if (Buffer.isBuffer(chunk) && this[ENCODING]) {
                //@ts-ignore - sinful unsafe type change
                chunk = this[DECODER].write(chunk);
            }
            // Note: flushing CAN potentially switch us into not-flowing mode
            if (this[FLOWING] && this[BUFFERLENGTH] !== 0)
                this[FLUSH](true);
            if (this[FLOWING])
                this.emit('data', chunk);
            else
                this[BUFFERPUSH](chunk);
            if (this[BUFFERLENGTH] !== 0)
                this.emit('readable');
            if (cb)
                fn(cb);
            return this[FLOWING];
        }
        /**
         * Low-level explicit read method.
         *
         * In objectMode, the argument is ignored, and one item is returned if
         * available.
         *
         * `n` is the number of bytes (or in the case of encoding streams,
         * characters) to consume. If `n` is not provided, then the entire buffer
         * is returned, or `null` is returned if no data is available.
         *
         * If `n` is greater that the amount of data in the internal buffer,
         * then `null` is returned.
         */
        read(n) {
            if (this[DESTROYED])
                return null;
            this[DISCARDED] = false;
            if (this[BUFFERLENGTH] === 0 ||
                n === 0 ||
                (n && n > this[BUFFERLENGTH])) {
                this[MAYBE_EMIT_END]();
                return null;
            }
            if (this[OBJECTMODE])
                n = null;
            if (this[BUFFER].length > 1 && !this[OBJECTMODE]) {
                // not object mode, so if we have an encoding, then RType is string
                // otherwise, must be Buffer
                this[BUFFER] = [
                    (this[ENCODING]
                        ? this[BUFFER].join('')
                        : Buffer.concat(this[BUFFER], this[BUFFERLENGTH])),
                ];
            }
            const ret = this[READ](n || null, this[BUFFER][0]);
            this[MAYBE_EMIT_END]();
            return ret;
        }
        [READ](n, chunk) {
            if (this[OBJECTMODE])
                this[BUFFERSHIFT]();
            else {
                const c = chunk;
                if (n === c.length || n === null)
                    this[BUFFERSHIFT]();
                else if (typeof c === 'string') {
                    this[BUFFER][0] = c.slice(n);
                    chunk = c.slice(0, n);
                    this[BUFFERLENGTH] -= n;
                }
                else {
                    this[BUFFER][0] = c.subarray(n);
                    chunk = c.subarray(0, n);
                    this[BUFFERLENGTH] -= n;
                }
            }
            this.emit('data', chunk);
            if (!this[BUFFER].length && !this[EOF])
                this.emit('drain');
            return chunk;
        }
        end(chunk, encoding, cb) {
            if (typeof chunk === 'function') {
                cb = chunk;
                chunk = undefined;
            }
            if (typeof encoding === 'function') {
                cb = encoding;
                encoding = 'utf8';
            }
            if (chunk !== undefined)
                this.write(chunk, encoding);
            if (cb)
                this.once('end', cb);
            this[EOF] = true;
            this.writable = false;
            // if we haven't written anything, then go ahead and emit,
            // even if we're not reading.
            // we'll re-emit if a new 'end' listener is added anyway.
            // This makes MP more suitable to write-only use cases.
            if (this[FLOWING] || !this[PAUSED])
                this[MAYBE_EMIT_END]();
            return this;
        }
        // don't let the internal resume be overwritten
        [RESUME]() {
            if (this[DESTROYED])
                return;
            if (!this[DATALISTENERS] && !this[PIPES].length) {
                this[DISCARDED] = true;
            }
            this[PAUSED] = false;
            this[FLOWING] = true;
            this.emit('resume');
            if (this[BUFFER].length)
                this[FLUSH]();
            else if (this[EOF])
                this[MAYBE_EMIT_END]();
            else
                this.emit('drain');
        }
        /**
         * Resume the stream if it is currently in a paused state
         *
         * If called when there are no pipe destinations or `data` event listeners,
         * this will place the stream in a "discarded" state, where all data will
         * be thrown away. The discarded state is removed if a pipe destination or
         * data handler is added, if pause() is called, or if any synchronous or
         * asynchronous iteration is started.
         */
        resume() {
            return this[RESUME]();
        }
        /**
         * Pause the stream
         */
        pause() {
            this[FLOWING] = false;
            this[PAUSED] = true;
            this[DISCARDED] = false;
        }
        /**
         * true if the stream has been forcibly destroyed
         */
        get destroyed() {
            return this[DESTROYED];
        }
        /**
         * true if the stream is currently in a flowing state, meaning that
         * any writes will be immediately emitted.
         */
        get flowing() {
            return this[FLOWING];
        }
        /**
         * true if the stream is currently in a paused state
         */
        get paused() {
            return this[PAUSED];
        }
        [BUFFERPUSH](chunk) {
            if (this[OBJECTMODE])
                this[BUFFERLENGTH] += 1;
            else
                this[BUFFERLENGTH] += chunk.length;
            this[BUFFER].push(chunk);
        }
        [BUFFERSHIFT]() {
            if (this[OBJECTMODE])
                this[BUFFERLENGTH] -= 1;
            else
                this[BUFFERLENGTH] -= this[BUFFER][0].length;
            return this[BUFFER].shift();
        }
        [FLUSH](noDrain = false) {
            do { } while (this[FLUSHCHUNK](this[BUFFERSHIFT]()) &&
                this[BUFFER].length);
            if (!noDrain && !this[BUFFER].length && !this[EOF])
                this.emit('drain');
        }
        [FLUSHCHUNK](chunk) {
            this.emit('data', chunk);
            return this[FLOWING];
        }
        /**
         * Pipe all data emitted by this stream into the destination provided.
         *
         * Triggers the flow of data.
         */
        pipe(dest, opts) {
            if (this[DESTROYED])
                return dest;
            this[DISCARDED] = false;
            const ended = this[EMITTED_END];
            opts = opts || {};
            if (dest === proc.stdout || dest === proc.stderr)
                opts.end = false;
            else
                opts.end = opts.end !== false;
            opts.proxyErrors = !!opts.proxyErrors;
            // piping an ended stream ends immediately
            if (ended) {
                if (opts.end)
                    dest.end();
            }
            else {
                // "as" here just ignores the WType, which pipes don't care about,
                // since they're only consuming from us, and writing to the dest
                this[PIPES].push(!opts.proxyErrors
                    ? new Pipe(this, dest, opts)
                    : new PipeProxyErrors(this, dest, opts));
                if (this[ASYNC])
                    defer(() => this[RESUME]());
                else
                    this[RESUME]();
            }
            return dest;
        }
        /**
         * Fully unhook a piped destination stream.
         *
         * If the destination stream was the only consumer of this stream (ie,
         * there are no other piped destinations or `'data'` event listeners)
         * then the flow of data will stop until there is another consumer or
         * {@link Minipass#resume} is explicitly called.
         */
        unpipe(dest) {
            const p = this[PIPES].find(p => p.dest === dest);
            if (p) {
                if (this[PIPES].length === 1) {
                    if (this[FLOWING] && this[DATALISTENERS] === 0) {
                        this[FLOWING] = false;
                    }
                    this[PIPES] = [];
                }
                else
                    this[PIPES].splice(this[PIPES].indexOf(p), 1);
                p.unpipe();
            }
        }
        /**
         * Alias for {@link Minipass#on}
         */
        addListener(ev, handler) {
            return this.on(ev, handler);
        }
        /**
         * Mostly identical to `EventEmitter.on`, with the following
         * behavior differences to prevent data loss and unnecessary hangs:
         *
         * - Adding a 'data' event handler will trigger the flow of data
         *
         * - Adding a 'readable' event handler when there is data waiting to be read
         *   will cause 'readable' to be emitted immediately.
         *
         * - Adding an 'endish' event handler ('end', 'finish', etc.) which has
         *   already passed will cause the event to be emitted immediately and all
         *   handlers removed.
         *
         * - Adding an 'error' event handler after an error has been emitted will
         *   cause the event to be re-emitted immediately with the error previously
         *   raised.
         */
        on(ev, handler) {
            const ret = super.on(ev, handler);
            if (ev === 'data') {
                this[DISCARDED] = false;
                this[DATALISTENERS]++;
                if (!this[PIPES].length && !this[FLOWING]) {
                    this[RESUME]();
                }
            }
            else if (ev === 'readable' && this[BUFFERLENGTH] !== 0) {
                super.emit('readable');
            }
            else if (isEndish(ev) && this[EMITTED_END]) {
                super.emit(ev);
                this.removeAllListeners(ev);
            }
            else if (ev === 'error' && this[EMITTED_ERROR]) {
                const h = handler;
                if (this[ASYNC])
                    defer(() => h.call(this, this[EMITTED_ERROR]));
                else
                    h.call(this, this[EMITTED_ERROR]);
            }
            return ret;
        }
        /**
         * Alias for {@link Minipass#off}
         */
        removeListener(ev, handler) {
            return this.off(ev, handler);
        }
        /**
         * Mostly identical to `EventEmitter.off`
         *
         * If a 'data' event handler is removed, and it was the last consumer
         * (ie, there are no pipe destinations or other 'data' event listeners),
         * then the flow of data will stop until there is another consumer or
         * {@link Minipass#resume} is explicitly called.
         */
        off(ev, handler) {
            const ret = super.off(ev, handler);
            // if we previously had listeners, and now we don't, and we don't
            // have any pipes, then stop the flow, unless it's been explicitly
            // put in a discarded flowing state via stream.resume().
            if (ev === 'data') {
                this[DATALISTENERS] = this.listeners('data').length;
                if (this[DATALISTENERS] === 0 &&
                    !this[DISCARDED] &&
                    !this[PIPES].length) {
                    this[FLOWING] = false;
                }
            }
            return ret;
        }
        /**
         * Mostly identical to `EventEmitter.removeAllListeners`
         *
         * If all 'data' event handlers are removed, and they were the last consumer
         * (ie, there are no pipe destinations), then the flow of data will stop
         * until there is another consumer or {@link Minipass#resume} is explicitly
         * called.
         */
        removeAllListeners(ev) {
            const ret = super.removeAllListeners(ev);
            if (ev === 'data' || ev === undefined) {
                this[DATALISTENERS] = 0;
                if (!this[DISCARDED] && !this[PIPES].length) {
                    this[FLOWING] = false;
                }
            }
            return ret;
        }
        /**
         * true if the 'end' event has been emitted
         */
        get emittedEnd() {
            return this[EMITTED_END];
        }
        [MAYBE_EMIT_END]() {
            if (!this[EMITTING_END] &&
                !this[EMITTED_END] &&
                !this[DESTROYED] &&
                this[BUFFER].length === 0 &&
                this[EOF]) {
                this[EMITTING_END] = true;
                this.emit('end');
                this.emit('prefinish');
                this.emit('finish');
                if (this[CLOSED])
                    this.emit('close');
                this[EMITTING_END] = false;
            }
        }
        /**
         * Mostly identical to `EventEmitter.emit`, with the following
         * behavior differences to prevent data loss and unnecessary hangs:
         *
         * If the stream has been destroyed, and the event is something other
         * than 'close' or 'error', then `false` is returned and no handlers
         * are called.
         *
         * If the event is 'end', and has already been emitted, then the event
         * is ignored. If the stream is in a paused or non-flowing state, then
         * the event will be deferred until data flow resumes. If the stream is
         * async, then handlers will be called on the next tick rather than
         * immediately.
         *
         * If the event is 'close', and 'end' has not yet been emitted, then
         * the event will be deferred until after 'end' is emitted.
         *
         * If the event is 'error', and an AbortSignal was provided for the stream,
         * and there are no listeners, then the event is ignored, matching the
         * behavior of node core streams in the presense of an AbortSignal.
         *
         * If the event is 'finish' or 'prefinish', then all listeners will be
         * removed after emitting the event, to prevent double-firing.
         */
        emit(ev, ...args) {
            const data = args[0];
            // error and close are only events allowed after calling destroy()
            if (ev !== 'error' &&
                ev !== 'close' &&
                ev !== DESTROYED &&
                this[DESTROYED]) {
                return false;
            }
            else if (ev === 'data') {
                return !this[OBJECTMODE] && !data
                    ? false
                    : this[ASYNC]
                        ? (defer(() => this[EMITDATA](data)), true)
                        : this[EMITDATA](data);
            }
            else if (ev === 'end') {
                return this[EMITEND]();
            }
            else if (ev === 'close') {
                this[CLOSED] = true;
                // don't emit close before 'end' and 'finish'
                if (!this[EMITTED_END] && !this[DESTROYED])
                    return false;
                const ret = super.emit('close');
                this.removeAllListeners('close');
                return ret;
            }
            else if (ev === 'error') {
                this[EMITTED_ERROR] = data;
                super.emit(ERROR, data);
                const ret = !this[SIGNAL] || this.listeners('error').length
                    ? super.emit('error', data)
                    : false;
                this[MAYBE_EMIT_END]();
                return ret;
            }
            else if (ev === 'resume') {
                const ret = super.emit('resume');
                this[MAYBE_EMIT_END]();
                return ret;
            }
            else if (ev === 'finish' || ev === 'prefinish') {
                const ret = super.emit(ev);
                this.removeAllListeners(ev);
                return ret;
            }
            // Some other unknown event
            const ret = super.emit(ev, ...args);
            this[MAYBE_EMIT_END]();
            return ret;
        }
        [EMITDATA](data) {
            for (const p of this[PIPES]) {
                if (p.dest.write(data) === false)
                    this.pause();
            }
            const ret = this[DISCARDED] ? false : super.emit('data', data);
            this[MAYBE_EMIT_END]();
            return ret;
        }
        [EMITEND]() {
            if (this[EMITTED_END])
                return false;
            this[EMITTED_END] = true;
            this.readable = false;
            return this[ASYNC]
                ? (defer(() => this[EMITEND2]()), true)
                : this[EMITEND2]();
        }
        [EMITEND2]() {
            if (this[DECODER]) {
                const data = this[DECODER].end();
                if (data) {
                    for (const p of this[PIPES]) {
                        p.dest.write(data);
                    }
                    if (!this[DISCARDED])
                        super.emit('data', data);
                }
            }
            for (const p of this[PIPES]) {
                p.end();
            }
            const ret = super.emit('end');
            this.removeAllListeners('end');
            return ret;
        }
        /**
         * Return a Promise that resolves to an array of all emitted data once
         * the stream ends.
         */
        async collect() {
            const buf = Object.assign([], {
                dataLength: 0,
            });
            if (!this[OBJECTMODE])
                buf.dataLength = 0;
            // set the promise first, in case an error is raised
            // by triggering the flow here.
            const p = this.promise();
            this.on('data', c => {
                buf.push(c);
                if (!this[OBJECTMODE])
                    buf.dataLength += c.length;
            });
            await p;
            return buf;
        }
        /**
         * Return a Promise that resolves to the concatenation of all emitted data
         * once the stream ends.
         *
         * Not allowed on objectMode streams.
         */
        async concat() {
            if (this[OBJECTMODE]) {
                throw new Error('cannot concat in objectMode');
            }
            const buf = await this.collect();
            return (this[ENCODING]
                ? buf.join('')
                : Buffer.concat(buf, buf.dataLength));
        }
        /**
         * Return a void Promise that resolves once the stream ends.
         */
        async promise() {
            return new Promise((resolve, reject) => {
                this.on(DESTROYED, () => reject(new Error('stream destroyed')));
                this.on('error', er => reject(er));
                this.on('end', () => resolve());
            });
        }
        /**
         * Asynchronous `for await of` iteration.
         *
         * This will continue emitting all chunks until the stream terminates.
         */
        [Symbol.asyncIterator]() {
            // set this up front, in case the consumer doesn't call next()
            // right away.
            this[DISCARDED] = false;
            let stopped = false;
            const stop = async () => {
                this.pause();
                stopped = true;
                return { value: undefined, done: true };
            };
            const next = () => {
                if (stopped)
                    return stop();
                const res = this.read();
                if (res !== null)
                    return Promise.resolve({ done: false, value: res });
                if (this[EOF])
                    return stop();
                let resolve;
                let reject;
                const onerr = (er) => {
                    this.off('data', ondata);
                    this.off('end', onend);
                    this.off(DESTROYED, ondestroy);
                    stop();
                    reject(er);
                };
                const ondata = (value) => {
                    this.off('error', onerr);
                    this.off('end', onend);
                    this.off(DESTROYED, ondestroy);
                    this.pause();
                    resolve({ value, done: !!this[EOF] });
                };
                const onend = () => {
                    this.off('error', onerr);
                    this.off('data', ondata);
                    this.off(DESTROYED, ondestroy);
                    stop();
                    resolve({ done: true, value: undefined });
                };
                const ondestroy = () => onerr(new Error('stream destroyed'));
                return new Promise((res, rej) => {
                    reject = rej;
                    resolve = res;
                    this.once(DESTROYED, ondestroy);
                    this.once('error', onerr);
                    this.once('end', onend);
                    this.once('data', ondata);
                });
            };
            return {
                next,
                throw: stop,
                return: stop,
                [Symbol.asyncIterator]() {
                    return this;
                },
            };
        }
        /**
         * Synchronous `for of` iteration.
         *
         * The iteration will terminate when the internal buffer runs out, even
         * if the stream has not yet terminated.
         */
        [Symbol.iterator]() {
            // set this up front, in case the consumer doesn't call next()
            // right away.
            this[DISCARDED] = false;
            let stopped = false;
            const stop = () => {
                this.pause();
                this.off(ERROR, stop);
                this.off(DESTROYED, stop);
                this.off('end', stop);
                stopped = true;
                return { done: true, value: undefined };
            };
            const next = () => {
                if (stopped)
                    return stop();
                const value = this.read();
                return value === null ? stop() : { done: false, value };
            };
            this.once('end', stop);
            this.once(ERROR, stop);
            this.once(DESTROYED, stop);
            return {
                next,
                throw: stop,
                return: stop,
                [Symbol.iterator]() {
                    return this;
                },
            };
        }
        /**
         * Destroy a stream, preventing it from being used for any further purpose.
         *
         * If the stream has a `close()` method, then it will be called on
         * destruction.
         *
         * After destruction, any attempt to write data, read data, or emit most
         * events will be ignored.
         *
         * If an error argument is provided, then it will be emitted in an
         * 'error' event.
         */
        destroy(er) {
            if (this[DESTROYED]) {
                if (er)
                    this.emit('error', er);
                else
                    this.emit(DESTROYED);
                return this;
            }
            this[DESTROYED] = true;
            this[DISCARDED] = true;
            // throw away all buffered data, it's never coming out
            this[BUFFER].length = 0;
            this[BUFFERLENGTH] = 0;
            const wc = this;
            if (typeof wc.close === 'function' && !this[CLOSED])
                wc.close();
            if (er)
                this.emit('error', er);
            // if no error to emit, still reject pending promises
            else
                this.emit(DESTROYED);
            return this;
        }
        /**
         * Alias for {@link isStream}
         *
         * Former export location, maintained for backwards compatibility.
         *
         * @deprecated
         */
        static get isStream() {
            return exports.isStream;
        }
    }
    exports.Minipass = Minipass;
    //# sourceMappingURL=index.js.map
    
    /***/ }),
    
    /***/ 7349:
    /***/ (function(__unused_webpack_module, exports, __nccwpck_require__) {
    
    "use strict";
    
    var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        var desc = Object.getOwnPropertyDescriptor(m, k);
        if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
          desc = { enumerable: true, get: function() { return m[k]; } };
        }
        Object.defineProperty(o, k2, desc);
    }) : (function(o, m, k, k2) {
        if (k2 === undefined) k2 = k;
        o[k2] = m[k];
    }));
    var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function(o, v) {
        o["default"] = v;
    });
    var __importStar = (this && this.__importStar) || function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    };
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.PathScurry = exports.Path = exports.PathScurryDarwin = exports.PathScurryPosix = exports.PathScurryWin32 = exports.PathScurryBase = exports.PathPosix = exports.PathWin32 = exports.PathBase = exports.ChildrenCache = exports.ResolveCache = void 0;
    const lru_cache_1 = __nccwpck_require__(3821);
    const node_path_1 = __nccwpck_require__(9411);
    const node_url_1 = __nccwpck_require__(1041);
    const fs_1 = __nccwpck_require__(7147);
    const actualFS = __importStar(__nccwpck_require__(7561));
    const realpathSync = fs_1.realpathSync.native;
    // TODO: test perf of fs/promises realpath vs realpathCB,
    // since the promises one uses realpath.native
    const promises_1 = __nccwpck_require__(3977);
    const minipass_1 = __nccwpck_require__(7885);
    const defaultFS = {
        lstatSync: fs_1.lstatSync,
        readdir: fs_1.readdir,
        readdirSync: fs_1.readdirSync,
        readlinkSync: fs_1.readlinkSync,
        realpathSync,
        promises: {
            lstat: promises_1.lstat,
            readdir: promises_1.readdir,
            readlink: promises_1.readlink,
            realpath: promises_1.realpath,
        },
    };
    // if they just gave us require('fs') then use our default
    const fsFromOption = (fsOption) => !fsOption || fsOption === defaultFS || fsOption === actualFS ?
        defaultFS
        : {
            ...defaultFS,
            ...fsOption,
            promises: {
                ...defaultFS.promises,
                ...(fsOption.promises || {}),
            },
        };
    // turn something like //?/c:/ into c:\
    const uncDriveRegexp = /^\\\\\?\\([a-z]:)\\?$/i;
    const uncToDrive = (rootPath) => rootPath.replace(/\//g, '\\').replace(uncDriveRegexp, '$1\\');
    // windows paths are separated by either / or \
    const eitherSep = /[\\\/]/;
    const UNKNOWN = 0; // may not even exist, for all we know
    const IFIFO = 0b0001;
    const IFCHR = 0b0010;
    const IFDIR = 0b0100;
    const IFBLK = 0b0110;
    const IFREG = 0b1000;
    const IFLNK = 0b1010;
    const IFSOCK = 0b1100;
    const IFMT = 0b1111;
    // mask to unset low 4 bits
    const IFMT_UNKNOWN = ~IFMT;
    // set after successfully calling readdir() and getting entries.
    const READDIR_CALLED = 0b0000_0001_0000;
    // set after a successful lstat()
    const LSTAT_CALLED = 0b0000_0010_0000;
    // set if an entry (or one of its parents) is definitely not a dir
    const ENOTDIR = 0b0000_0100_0000;
    // set if an entry (or one of its parents) does not exist
    // (can also be set on lstat errors like EACCES or ENAMETOOLONG)
    const ENOENT = 0b0000_1000_0000;
    // cannot have child entries -- also verify &IFMT is either IFDIR or IFLNK
    // set if we fail to readlink
    const ENOREADLINK = 0b0001_0000_0000;
    // set if we know realpath() will fail
    const ENOREALPATH = 0b0010_0000_0000;
    const ENOCHILD = ENOTDIR | ENOENT | ENOREALPATH;
    const TYPEMASK = 0b0011_1111_1111;
    const entToType = (s) => s.isFile() ? IFREG
        : s.isDirectory() ? IFDIR
            : s.isSymbolicLink() ? IFLNK
                : s.isCharacterDevice() ? IFCHR
                    : s.isBlockDevice() ? IFBLK
                        : s.isSocket() ? IFSOCK
                            : s.isFIFO() ? IFIFO
                                : UNKNOWN;
    // normalize unicode path names
    const normalizeCache = new Map();
    const normalize = (s) => {
        const c = normalizeCache.get(s);
        if (c)
            return c;
        const n = s.normalize('NFKD');
        normalizeCache.set(s, n);
        return n;
    };
    const normalizeNocaseCache = new Map();
    const normalizeNocase = (s) => {
        const c = normalizeNocaseCache.get(s);
        if (c)
            return c;
        const n = normalize(s.toLowerCase());
        normalizeNocaseCache.set(s, n);
        return n;
    };
    /**
     * An LRUCache for storing resolved path strings or Path objects.
     * @internal
     */
    class ResolveCache extends lru_cache_1.LRUCache {
        constructor() {
            super({ max: 256 });
        }
    }
    exports.ResolveCache = ResolveCache;
    // In order to prevent blowing out the js heap by allocating hundreds of
    // thousands of Path entries when walking extremely large trees, the "children"
    // in this tree are represented by storing an array of Path entries in an
    // LRUCache, indexed by the parent.  At any time, Path.children() may return an
    // empty array, indicating that it doesn't know about any of its children, and
    // thus has to rebuild that cache.  This is fine, it just means that we don't
    // benefit as much from having the cached entries, but huge directory walks
    // don't blow out the stack, and smaller ones are still as fast as possible.
    //
    //It does impose some complexity when building up the readdir data, because we
    //need to pass a reference to the children array that we started with.
    /**
     * an LRUCache for storing child entries.
     * @internal
     */
    class ChildrenCache extends lru_cache_1.LRUCache {
        constructor(maxSize = 16 * 1024) {
            super({
                maxSize,
                // parent + children
                sizeCalculation: a => a.length + 1,
            });
        }
    }
    exports.ChildrenCache = ChildrenCache;
    const setAsCwd = Symbol('PathScurry setAsCwd');
    /**
     * Path objects are sort of like a super-powered
     * {@link https://nodejs.org/docs/latest/api/fs.html#class-fsdirent fs.Dirent}
     *
     * Each one represents a single filesystem entry on disk, which may or may not
     * exist. It includes methods for reading various types of information via
     * lstat, readlink, and readdir, and caches all information to the greatest
     * degree possible.
     *
     * Note that fs operations that would normally throw will instead return an
     * "empty" value. This is in order to prevent excessive overhead from error
     * stack traces.
     */
    class PathBase {
        /**
         * the basename of this path
         *
         * **Important**: *always* test the path name against any test string
         * usingthe {@link isNamed} method, and not by directly comparing this
         * string. Otherwise, unicode path strings that the system sees as identical
         * will not be properly treated as the same path, leading to incorrect
         * behavior and possible security issues.
         */
        name;
        /**
         * the Path entry corresponding to the path root.
         *
         * @internal
         */
        root;
        /**
         * All roots found within the current PathScurry family
         *
         * @internal
         */
        roots;
        /**
         * a reference to the parent path, or undefined in the case of root entries
         *
         * @internal
         */
        parent;
        /**
         * boolean indicating whether paths are compared case-insensitively
         * @internal
         */
        nocase;
        /**
         * boolean indicating that this path is the current working directory
         * of the PathScurry collection that contains it.
         */
        isCWD = false;
        // potential default fs override
        #fs;
        // Stats fields
        #dev;
        get dev() {
            return this.#dev;
        }
        #mode;
        get mode() {
            return this.#mode;
        }
        #nlink;
        get nlink() {
            return this.#nlink;
        }
        #uid;
        get uid() {
            return this.#uid;
        }
        #gid;
        get gid() {
            return this.#gid;
        }
        #rdev;
        get rdev() {
            return this.#rdev;
        }
        #blksize;
        get blksize() {
            return this.#blksize;
        }
        #ino;
        get ino() {
            return this.#ino;
        }
        #size;
        get size() {
            return this.#size;
        }
        #blocks;
        get blocks() {
            return this.#blocks;
        }
        #atimeMs;
        get atimeMs() {
            return this.#atimeMs;
        }
        #mtimeMs;
        get mtimeMs() {
            return this.#mtimeMs;
        }
        #ctimeMs;
        get ctimeMs() {
            return this.#ctimeMs;
        }
        #birthtimeMs;
        get birthtimeMs() {
            return this.#birthtimeMs;
        }
        #atime;
        get atime() {
            return this.#atime;
        }
        #mtime;
        get mtime() {
            return this.#mtime;
        }
        #ctime;
        get ctime() {
            return this.#ctime;
        }
        #birthtime;
        get birthtime() {
            return this.#birthtime;
        }
        #matchName;
        #depth;
        #fullpath;
        #fullpathPosix;
        #relative;
        #relativePosix;
        #type;
        #children;
        #linkTarget;
        #realpath;
        /**
         * This property is for compatibility with the Dirent class as of
         * Node v20, where Dirent['parentPath'] refers to the path of the
         * directory that was passed to readdir. For root entries, it's the path
         * to the entry itself.
         */
        get parentPath() {
            return (this.parent || this).fullpath();
        }
        /**
         * Deprecated alias for Dirent['parentPath'] Somewhat counterintuitively,
         * this property refers to the *parent* path, not the path object itself.
         */
        get path() {
            return this.parentPath;
        }
        /**
         * Do not create new Path objects directly.  They should always be accessed
         * via the PathScurry class or other methods on the Path class.
         *
         * @internal
         */
        constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
            this.name = name;
            this.#matchName = nocase ? normalizeNocase(name) : normalize(name);
            this.#type = type & TYPEMASK;
            this.nocase = nocase;
            this.roots = roots;
            this.root = root || this;
            this.#children = children;
            this.#fullpath = opts.fullpath;
            this.#relative = opts.relative;
            this.#relativePosix = opts.relativePosix;
            this.parent = opts.parent;
            if (this.parent) {
                this.#fs = this.parent.#fs;
            }
            else {
                this.#fs = fsFromOption(opts.fs);
            }
        }
        /**
         * Returns the depth of the Path object from its root.
         *
         * For example, a path at `/foo/bar` would have a depth of 2.
         */
        depth() {
            if (this.#depth !== undefined)
                return this.#depth;
            if (!this.parent)
                return (this.#depth = 0);
            return (this.#depth = this.parent.depth() + 1);
        }
        /**
         * @internal
         */
        childrenCache() {
            return this.#children;
        }
        /**
         * Get the Path object referenced by the string path, resolved from this Path
         */
        resolve(path) {
            if (!path) {
                return this;
            }
            const rootPath = this.getRootString(path);
            const dir = path.substring(rootPath.length);
            const dirParts = dir.split(this.splitSep);
            const result = rootPath ?
                this.getRoot(rootPath).#resolveParts(dirParts)
                : this.#resolveParts(dirParts);
            return result;
        }
        #resolveParts(dirParts) {
            let p = this;
            for (const part of dirParts) {
                p = p.child(part);
            }
            return p;
        }
        /**
         * Returns the cached children Path objects, if still available.  If they
         * have fallen out of the cache, then returns an empty array, and resets the
         * READDIR_CALLED bit, so that future calls to readdir() will require an fs
         * lookup.
         *
         * @internal
         */
        children() {
            const cached = this.#children.get(this);
            if (cached) {
                return cached;
            }
            const children = Object.assign([], { provisional: 0 });
            this.#children.set(this, children);
            this.#type &= ~READDIR_CALLED;
            return children;
        }
        /**
         * Resolves a path portion and returns or creates the child Path.
         *
         * Returns `this` if pathPart is `''` or `'.'`, or `parent` if pathPart is
         * `'..'`.
         *
         * This should not be called directly.  If `pathPart` contains any path
         * separators, it will lead to unsafe undefined behavior.
         *
         * Use `Path.resolve()` instead.
         *
         * @internal
         */
        child(pathPart, opts) {
            if (pathPart === '' || pathPart === '.') {
                return this;
            }
            if (pathPart === '..') {
                return this.parent || this;
            }
            // find the child
            const children = this.children();
            const name = this.nocase ? normalizeNocase(pathPart) : normalize(pathPart);
            for (const p of children) {
                if (p.#matchName === name) {
                    return p;
                }
            }
            // didn't find it, create provisional child, since it might not
            // actually exist.  If we know the parent isn't a dir, then
            // in fact it CAN'T exist.
            const s = this.parent ? this.sep : '';
            const fullpath = this.#fullpath ? this.#fullpath + s + pathPart : undefined;
            const pchild = this.newChild(pathPart, UNKNOWN, {
                ...opts,
                parent: this,
                fullpath,
            });
            if (!this.canReaddir()) {
                pchild.#type |= ENOENT;
            }
            // don't have to update provisional, because if we have real children,
            // then provisional is set to children.length, otherwise a lower number
            children.push(pchild);
            return pchild;
        }
        /**
         * The relative path from the cwd. If it does not share an ancestor with
         * the cwd, then this ends up being equivalent to the fullpath()
         */
        relative() {
            if (this.isCWD)
                return '';
            if (this.#relative !== undefined) {
                return this.#relative;
            }
            const name = this.name;
            const p = this.parent;
            if (!p) {
                return (this.#relative = this.name);
            }
            const pv = p.relative();
            return pv + (!pv || !p.parent ? '' : this.sep) + name;
        }
        /**
         * The relative path from the cwd, using / as the path separator.
         * If it does not share an ancestor with
         * the cwd, then this ends up being equivalent to the fullpathPosix()
         * On posix systems, this is identical to relative().
         */
        relativePosix() {
            if (this.sep === '/')
                return this.relative();
            if (this.isCWD)
                return '';
            if (this.#relativePosix !== undefined)
                return this.#relativePosix;
            const name = this.name;
            const p = this.parent;
            if (!p) {
                return (this.#relativePosix = this.fullpathPosix());
            }
            const pv = p.relativePosix();
            return pv + (!pv || !p.parent ? '' : '/') + name;
        }
        /**
         * The fully resolved path string for this Path entry
         */
        fullpath() {
            if (this.#fullpath !== undefined) {
                return this.#fullpath;
            }
            const name = this.name;
            const p = this.parent;
            if (!p) {
                return (this.#fullpath = this.name);
            }
            const pv = p.fullpath();
            const fp = pv + (!p.parent ? '' : this.sep) + name;
            return (this.#fullpath = fp);
        }
        /**
         * On platforms other than windows, this is identical to fullpath.
         *
         * On windows, this is overridden to return the forward-slash form of the
         * full UNC path.
         */
        fullpathPosix() {
            if (this.#fullpathPosix !== undefined)
                return this.#fullpathPosix;
            if (this.sep === '/')
                return (this.#fullpathPosix = this.fullpath());
            if (!this.parent) {
                const p = this.fullpath().replace(/\\/g, '/');
                if (/^[a-z]:\//i.test(p)) {
                    return (this.#fullpathPosix = `//?/${p}`);
                }
                else {
                    return (this.#fullpathPosix = p);
                }
            }
            const p = this.parent;
            const pfpp = p.fullpathPosix();
            const fpp = pfpp + (!pfpp || !p.parent ? '' : '/') + this.name;
            return (this.#fullpathPosix = fpp);
        }
        /**
         * Is the Path of an unknown type?
         *
         * Note that we might know *something* about it if there has been a previous
         * filesystem operation, for example that it does not exist, or is not a
         * link, or whether it has child entries.
         */
        isUnknown() {
            return (this.#type & IFMT) === UNKNOWN;
        }
        isType(type) {
            return this[`is${type}`]();
        }
        getType() {
            return (this.isUnknown() ? 'Unknown'
                : this.isDirectory() ? 'Directory'
                    : this.isFile() ? 'File'
                        : this.isSymbolicLink() ? 'SymbolicLink'
                            : this.isFIFO() ? 'FIFO'
                                : this.isCharacterDevice() ? 'CharacterDevice'
                                    : this.isBlockDevice() ? 'BlockDevice'
                                        : /* c8 ignore start */ this.isSocket() ? 'Socket'
                                            : 'Unknown');
            /* c8 ignore stop */
        }
        /**
         * Is the Path a regular file?
         */
        isFile() {
            return (this.#type & IFMT) === IFREG;
        }
        /**
         * Is the Path a directory?
         */
        isDirectory() {
            return (this.#type & IFMT) === IFDIR;
        }
        /**
         * Is the path a character device?
         */
        isCharacterDevice() {
            return (this.#type & IFMT) === IFCHR;
        }
        /**
         * Is the path a block device?
         */
        isBlockDevice() {
            return (this.#type & IFMT) === IFBLK;
        }
        /**
         * Is the path a FIFO pipe?
         */
        isFIFO() {
            return (this.#type & IFMT) === IFIFO;
        }
        /**
         * Is the path a socket?
         */
        isSocket() {
            return (this.#type & IFMT) === IFSOCK;
        }
        /**
         * Is the path a symbolic link?
         */
        isSymbolicLink() {
            return (this.#type & IFLNK) === IFLNK;
        }
        /**
         * Return the entry if it has been subject of a successful lstat, or
         * undefined otherwise.
         *
         * Does not read the filesystem, so an undefined result *could* simply
         * mean that we haven't called lstat on it.
         */
        lstatCached() {
            return this.#type & LSTAT_CALLED ? this : undefined;
        }
        /**
         * Return the cached link target if the entry has been the subject of a
         * successful readlink, or undefined otherwise.
         *
         * Does not read the filesystem, so an undefined result *could* just mean we
         * don't have any cached data. Only use it if you are very sure that a
         * readlink() has been called at some point.
         */
        readlinkCached() {
            return this.#linkTarget;
        }
        /**
         * Returns the cached realpath target if the entry has been the subject
         * of a successful realpath, or undefined otherwise.
         *
         * Does not read the filesystem, so an undefined result *could* just mean we
         * don't have any cached data. Only use it if you are very sure that a
         * realpath() has been called at some point.
         */
        realpathCached() {
            return this.#realpath;
        }
        /**
         * Returns the cached child Path entries array if the entry has been the
         * subject of a successful readdir(), or [] otherwise.
         *
         * Does not read the filesystem, so an empty array *could* just mean we
         * don't have any cached data. Only use it if you are very sure that a
         * readdir() has been called recently enough to still be valid.
         */
        readdirCached() {
            const children = this.children();
            return children.slice(0, children.provisional);
        }
        /**
         * Return true if it's worth trying to readlink.  Ie, we don't (yet) have
         * any indication that readlink will definitely fail.
         *
         * Returns false if the path is known to not be a symlink, if a previous
         * readlink failed, or if the entry does not exist.
         */
        canReadlink() {
            if (this.#linkTarget)
                return true;
            if (!this.parent)
                return false;
            // cases where it cannot possibly succeed
            const ifmt = this.#type & IFMT;
            return !((ifmt !== UNKNOWN && ifmt !== IFLNK) ||
                this.#type & ENOREADLINK ||
                this.#type & ENOENT);
        }
        /**
         * Return true if readdir has previously been successfully called on this
         * path, indicating that cachedReaddir() is likely valid.
         */
        calledReaddir() {
            return !!(this.#type & READDIR_CALLED);
        }
        /**
         * Returns true if the path is known to not exist. That is, a previous lstat
         * or readdir failed to verify its existence when that would have been
         * expected, or a parent entry was marked either enoent or enotdir.
         */
        isENOENT() {
            return !!(this.#type & ENOENT);
        }
        /**
         * Return true if the path is a match for the given path name.  This handles
         * case sensitivity and unicode normalization.
         *
         * Note: even on case-sensitive systems, it is **not** safe to test the
         * equality of the `.name` property to determine whether a given pathname
         * matches, due to unicode normalization mismatches.
         *
         * Always use this method instead of testing the `path.name` property
         * directly.
         */
        isNamed(n) {
            return !this.nocase ?
                this.#matchName === normalize(n)
                : this.#matchName === normalizeNocase(n);
        }
        /**
         * Return the Path object corresponding to the target of a symbolic link.
         *
         * If the Path is not a symbolic link, or if the readlink call fails for any
         * reason, `undefined` is returned.
         *
         * Result is cached, and thus may be outdated if the filesystem is mutated.
         */
        async readlink() {
            const target = this.#linkTarget;
            if (target) {
                return target;
            }
            if (!this.canReadlink()) {
                return undefined;
            }
            /* c8 ignore start */
            // already covered by the canReadlink test, here for ts grumples
            if (!this.parent) {
                return undefined;
            }
            /* c8 ignore stop */
            try {
                const read = await this.#fs.promises.readlink(this.fullpath());
                const linkTarget = (await this.parent.realpath())?.resolve(read);
                if (linkTarget) {
                    return (this.#linkTarget = linkTarget);
                }
            }
            catch (er) {
                this.#readlinkFail(er.code);
                return undefined;
            }
        }
        /**
         * Synchronous {@link PathBase.readlink}
         */
        readlinkSync() {
            const target = this.#linkTarget;
            if (target) {
                return target;
            }
            if (!this.canReadlink()) {
                return undefined;
            }
            /* c8 ignore start */
            // already covered by the canReadlink test, here for ts grumples
            if (!this.parent) {
                return undefined;
            }
            /* c8 ignore stop */
            try {
                const read = this.#fs.readlinkSync(this.fullpath());
                const linkTarget = this.parent.realpathSync()?.resolve(read);
                if (linkTarget) {
                    return (this.#linkTarget = linkTarget);
                }
            }
            catch (er) {
                this.#readlinkFail(er.code);
                return undefined;
            }
        }
        #readdirSuccess(children) {
            // succeeded, mark readdir called bit
            this.#type |= READDIR_CALLED;
            // mark all remaining provisional children as ENOENT
            for (let p = children.provisional; p < children.length; p++) {
                const c = children[p];
                if (c)
                    c.#markENOENT();
            }
        }
        #markENOENT() {
            // mark as UNKNOWN and ENOENT
            if (this.#type & ENOENT)
                return;
            this.#type = (this.#type | ENOENT) & IFMT_UNKNOWN;
            this.#markChildrenENOENT();
        }
        #markChildrenENOENT() {
            // all children are provisional and do not exist
            const children = this.children();
            children.provisional = 0;
            for (const p of children) {
                p.#markENOENT();
            }
        }
        #markENOREALPATH() {
            this.#type |= ENOREALPATH;
            this.#markENOTDIR();
        }
        // save the information when we know the entry is not a dir
        #markENOTDIR() {
            // entry is not a directory, so any children can't exist.
            // this *should* be impossible, since any children created
            // after it's been marked ENOTDIR should be marked ENOENT,
            // so it won't even get to this point.
            /* c8 ignore start */
            if (this.#type & ENOTDIR)
                return;
            /* c8 ignore stop */
            let t = this.#type;
            // this could happen if we stat a dir, then delete it,
            // then try to read it or one of its children.
            if ((t & IFMT) === IFDIR)
                t &= IFMT_UNKNOWN;
            this.#type = t | ENOTDIR;
            this.#markChildrenENOENT();
        }
        #readdirFail(code = '') {
            // markENOTDIR and markENOENT also set provisional=0
            if (code === 'ENOTDIR' || code === 'EPERM') {
                this.#markENOTDIR();
            }
            else if (code === 'ENOENT') {
                this.#markENOENT();
            }
            else {
                this.children().provisional = 0;
            }
        }
        #lstatFail(code = '') {
            // Windows just raises ENOENT in this case, disable for win CI
            /* c8 ignore start */
            if (code === 'ENOTDIR') {
                // already know it has a parent by this point
                const p = this.parent;
                p.#markENOTDIR();
            }
            else if (code === 'ENOENT') {
                /* c8 ignore stop */
                this.#markENOENT();
            }
        }
        #readlinkFail(code = '') {
            let ter = this.#type;
            ter |= ENOREADLINK;
            if (code === 'ENOENT')
                ter |= ENOENT;
            // windows gets a weird error when you try to readlink a file
            if (code === 'EINVAL' || code === 'UNKNOWN') {
                // exists, but not a symlink, we don't know WHAT it is, so remove
                // all IFMT bits.
                ter &= IFMT_UNKNOWN;
            }
            this.#type = ter;
            // windows just gets ENOENT in this case.  We do cover the case,
            // just disabled because it's impossible on Windows CI
            /* c8 ignore start */
            if (code === 'ENOTDIR' && this.parent) {
                this.parent.#markENOTDIR();
            }
            /* c8 ignore stop */
        }
        #readdirAddChild(e, c) {
            return (this.#readdirMaybePromoteChild(e, c) ||
                this.#readdirAddNewChild(e, c));
        }
        #readdirAddNewChild(e, c) {
            // alloc new entry at head, so it's never provisional
            const type = entToType(e);
            const child = this.newChild(e.name, type, { parent: this });
            const ifmt = child.#type & IFMT;
            if (ifmt !== IFDIR && ifmt !== IFLNK && ifmt !== UNKNOWN) {
                child.#type |= ENOTDIR;
            }
            c.unshift(child);
            c.provisional++;
            return child;
        }
        #readdirMaybePromoteChild(e, c) {
            for (let p = c.provisional; p < c.length; p++) {
                const pchild = c[p];
                const name = this.nocase ? normalizeNocase(e.name) : normalize(e.name);
                if (name !== pchild.#matchName) {
                    continue;
                }
                return this.#readdirPromoteChild(e, pchild, p, c);
            }
        }
        #readdirPromoteChild(e, p, index, c) {
            const v = p.name;
            // retain any other flags, but set ifmt from dirent
            p.#type = (p.#type & IFMT_UNKNOWN) | entToType(e);
            // case sensitivity fixing when we learn the true name.
            if (v !== e.name)
                p.name = e.name;
            // just advance provisional index (potentially off the list),
            // otherwise we have to splice/pop it out and re-insert at head
            if (index !== c.provisional) {
                if (index === c.length - 1)
                    c.pop();
                else
                    c.splice(index, 1);
                c.unshift(p);
            }
            c.provisional++;
            return p;
        }
        /**
         * Call lstat() on this Path, and update all known information that can be
         * determined.
         *
         * Note that unlike `fs.lstat()`, the returned value does not contain some
         * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
         * information is required, you will need to call `fs.lstat` yourself.
         *
         * If the Path refers to a nonexistent file, or if the lstat call fails for
         * any reason, `undefined` is returned.  Otherwise the updated Path object is
         * returned.
         *
         * Results are cached, and thus may be out of date if the filesystem is
         * mutated.
         */
        async lstat() {
            if ((this.#type & ENOENT) === 0) {
                try {
                    this.#applyStat(await this.#fs.promises.lstat(this.fullpath()));
                    return this;
                }
                catch (er) {
                    this.#lstatFail(er.code);
                }
            }
        }
        /**
         * synchronous {@link PathBase.lstat}
         */
        lstatSync() {
            if ((this.#type & ENOENT) === 0) {
                try {
                    this.#applyStat(this.#fs.lstatSync(this.fullpath()));
                    return this;
                }
                catch (er) {
                    this.#lstatFail(er.code);
                }
            }
        }
        #applyStat(st) {
            const { atime, atimeMs, birthtime, birthtimeMs, blksize, blocks, ctime, ctimeMs, dev, gid, ino, mode, mtime, mtimeMs, nlink, rdev, size, uid, } = st;
            this.#atime = atime;
            this.#atimeMs = atimeMs;
            this.#birthtime = birthtime;
            this.#birthtimeMs = birthtimeMs;
            this.#blksize = blksize;
            this.#blocks = blocks;
            this.#ctime = ctime;
            this.#ctimeMs = ctimeMs;
            this.#dev = dev;
            this.#gid = gid;
            this.#ino = ino;
            this.#mode = mode;
            this.#mtime = mtime;
            this.#mtimeMs = mtimeMs;
            this.#nlink = nlink;
            this.#rdev = rdev;
            this.#size = size;
            this.#uid = uid;
            const ifmt = entToType(st);
            // retain any other flags, but set the ifmt
            this.#type = (this.#type & IFMT_UNKNOWN) | ifmt | LSTAT_CALLED;
            if (ifmt !== UNKNOWN && ifmt !== IFDIR && ifmt !== IFLNK) {
                this.#type |= ENOTDIR;
            }
        }
        #onReaddirCB = [];
        #readdirCBInFlight = false;
        #callOnReaddirCB(children) {
            this.#readdirCBInFlight = false;
            const cbs = this.#onReaddirCB.slice();
            this.#onReaddirCB.length = 0;
            cbs.forEach(cb => cb(null, children));
        }
        /**
         * Standard node-style callback interface to get list of directory entries.
         *
         * If the Path cannot or does not contain any children, then an empty array
         * is returned.
         *
         * Results are cached, and thus may be out of date if the filesystem is
         * mutated.
         *
         * @param cb The callback called with (er, entries).  Note that the `er`
         * param is somewhat extraneous, as all readdir() errors are handled and
         * simply result in an empty set of entries being returned.
         * @param allowZalgo Boolean indicating that immediately known results should
         * *not* be deferred with `queueMicrotask`. Defaults to `false`. Release
         * zalgo at your peril, the dark pony lord is devious and unforgiving.
         */
        readdirCB(cb, allowZalgo = false) {
            if (!this.canReaddir()) {
                if (allowZalgo)
                    cb(null, []);
                else
                    queueMicrotask(() => cb(null, []));
                return;
            }
            const children = this.children();
            if (this.calledReaddir()) {
                const c = children.slice(0, children.provisional);
                if (allowZalgo)
                    cb(null, c);
                else
                    queueMicrotask(() => cb(null, c));
                return;
            }
            // don't have to worry about zalgo at this point.
            this.#onReaddirCB.push(cb);
            if (this.#readdirCBInFlight) {
                return;
            }
            this.#readdirCBInFlight = true;
            // else read the directory, fill up children
            // de-provisionalize any provisional children.
            const fullpath = this.fullpath();
            this.#fs.readdir(fullpath, { withFileTypes: true }, (er, entries) => {
                if (er) {
                    this.#readdirFail(er.code);
                    children.provisional = 0;
                }
                else {
                    // if we didn't get an error, we always get entries.
                    //@ts-ignore
                    for (const e of entries) {
                        this.#readdirAddChild(e, children);
                    }
                    this.#readdirSuccess(children);
                }
                this.#callOnReaddirCB(children.slice(0, children.provisional));
                return;
            });
        }
        #asyncReaddirInFlight;
        /**
         * Return an array of known child entries.
         *
         * If the Path cannot or does not contain any children, then an empty array
         * is returned.
         *
         * Results are cached, and thus may be out of date if the filesystem is
         * mutated.
         */
        async readdir() {
            if (!this.canReaddir()) {
                return [];
            }
            const children = this.children();
            if (this.calledReaddir()) {
                return children.slice(0, children.provisional);
            }
            // else read the directory, fill up children
            // de-provisionalize any provisional children.
            const fullpath = this.fullpath();
            if (this.#asyncReaddirInFlight) {
                await this.#asyncReaddirInFlight;
            }
            else {
                /* c8 ignore start */
                let resolve = () => { };
                /* c8 ignore stop */
                this.#asyncReaddirInFlight = new Promise(res => (resolve = res));
                try {
                    for (const e of await this.#fs.promises.readdir(fullpath, {
                        withFileTypes: true,
                    })) {
                        this.#readdirAddChild(e, children);
                    }
                    this.#readdirSuccess(children);
                }
                catch (er) {
                    this.#readdirFail(er.code);
                    children.provisional = 0;
                }
                this.#asyncReaddirInFlight = undefined;
                resolve();
            }
            return children.slice(0, children.provisional);
        }
        /**
         * synchronous {@link PathBase.readdir}
         */
        readdirSync() {
            if (!this.canReaddir()) {
                return [];
            }
            const children = this.children();
            if (this.calledReaddir()) {
                return children.slice(0, children.provisional);
            }
            // else read the directory, fill up children
            // de-provisionalize any provisional children.
            const fullpath = this.fullpath();
            try {
                for (const e of this.#fs.readdirSync(fullpath, {
                    withFileTypes: true,
                })) {
                    this.#readdirAddChild(e, children);
                }
                this.#readdirSuccess(children);
            }
            catch (er) {
                this.#readdirFail(er.code);
                children.provisional = 0;
            }
            return children.slice(0, children.provisional);
        }
        canReaddir() {
            if (this.#type & ENOCHILD)
                return false;
            const ifmt = IFMT & this.#type;
            // we always set ENOTDIR when setting IFMT, so should be impossible
            /* c8 ignore start */
            if (!(ifmt === UNKNOWN || ifmt === IFDIR || ifmt === IFLNK)) {
                return false;
            }
            /* c8 ignore stop */
            return true;
        }
        shouldWalk(dirs, walkFilter) {
            return ((this.#type & IFDIR) === IFDIR &&
                !(this.#type & ENOCHILD) &&
                !dirs.has(this) &&
                (!walkFilter || walkFilter(this)));
        }
        /**
         * Return the Path object corresponding to path as resolved
         * by realpath(3).
         *
         * If the realpath call fails for any reason, `undefined` is returned.
         *
         * Result is cached, and thus may be outdated if the filesystem is mutated.
         * On success, returns a Path object.
         */
        async realpath() {
            if (this.#realpath)
                return this.#realpath;
            if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
                return undefined;
            try {
                const rp = await this.#fs.promises.realpath(this.fullpath());
                return (this.#realpath = this.resolve(rp));
            }
            catch (_) {
                this.#markENOREALPATH();
            }
        }
        /**
         * Synchronous {@link realpath}
         */
        realpathSync() {
            if (this.#realpath)
                return this.#realpath;
            if ((ENOREALPATH | ENOREADLINK | ENOENT) & this.#type)
                return undefined;
            try {
                const rp = this.#fs.realpathSync(this.fullpath());
                return (this.#realpath = this.resolve(rp));
            }
            catch (_) {
                this.#markENOREALPATH();
            }
        }
        /**
         * Internal method to mark this Path object as the scurry cwd,
         * called by {@link PathScurry#chdir}
         *
         * @internal
         */
        [setAsCwd](oldCwd) {
            if (oldCwd === this)
                return;
            oldCwd.isCWD = false;
            this.isCWD = true;
            const changed = new Set([]);
            let rp = [];
            let p = this;
            while (p && p.parent) {
                changed.add(p);
                p.#relative = rp.join(this.sep);
                p.#relativePosix = rp.join('/');
                p = p.parent;
                rp.push('..');
            }
            // now un-memoize parents of old cwd
            p = oldCwd;
            while (p && p.parent && !changed.has(p)) {
                p.#relative = undefined;
                p.#relativePosix = undefined;
                p = p.parent;
            }
        }
    }
    exports.PathBase = PathBase;
    /**
     * Path class used on win32 systems
     *
     * Uses `'\\'` as the path separator for returned paths, either `'\\'` or `'/'`
     * as the path separator for parsing paths.
     */
    class PathWin32 extends PathBase {
        /**
         * Separator for generating path strings.
         */
        sep = '\\';
        /**
         * Separator for parsing path strings.
         */
        splitSep = eitherSep;
        /**
         * Do not create new Path objects directly.  They should always be accessed
         * via the PathScurry class or other methods on the Path class.
         *
         * @internal
         */
        constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
            super(name, type, root, roots, nocase, children, opts);
        }
        /**
         * @internal
         */
        newChild(name, type = UNKNOWN, opts = {}) {
            return new PathWin32(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
        }
        /**
         * @internal
         */
        getRootString(path) {
            return node_path_1.win32.parse(path).root;
        }
        /**
         * @internal
         */
        getRoot(rootPath) {
            rootPath = uncToDrive(rootPath.toUpperCase());
            if (rootPath === this.root.name) {
                return this.root;
            }
            // ok, not that one, check if it matches another we know about
            for (const [compare, root] of Object.entries(this.roots)) {
                if (this.sameRoot(rootPath, compare)) {
                    return (this.roots[rootPath] = root);
                }
            }
            // otherwise, have to create a new one.
            return (this.roots[rootPath] = new PathScurryWin32(rootPath, this).root);
        }
        /**
         * @internal
         */
        sameRoot(rootPath, compare = this.root.name) {
            // windows can (rarely) have case-sensitive filesystem, but
            // UNC and drive letters are always case-insensitive, and canonically
            // represented uppercase.
            rootPath = rootPath
                .toUpperCase()
                .replace(/\//g, '\\')
                .replace(uncDriveRegexp, '$1\\');
            return rootPath === compare;
        }
    }
    exports.PathWin32 = PathWin32;
    /**
     * Path class used on all posix systems.
     *
     * Uses `'/'` as the path separator.
     */
    class PathPosix extends PathBase {
        /**
         * separator for parsing path strings
         */
        splitSep = '/';
        /**
         * separator for generating path strings
         */
        sep = '/';
        /**
         * Do not create new Path objects directly.  They should always be accessed
         * via the PathScurry class or other methods on the Path class.
         *
         * @internal
         */
        constructor(name, type = UNKNOWN, root, roots, nocase, children, opts) {
            super(name, type, root, roots, nocase, children, opts);
        }
        /**
         * @internal
         */
        getRootString(path) {
            return path.startsWith('/') ? '/' : '';
        }
        /**
         * @internal
         */
        getRoot(_rootPath) {
            return this.root;
        }
        /**
         * @internal
         */
        newChild(name, type = UNKNOWN, opts = {}) {
            return new PathPosix(name, type, this.root, this.roots, this.nocase, this.childrenCache(), opts);
        }
    }
    exports.PathPosix = PathPosix;
    /**
     * The base class for all PathScurry classes, providing the interface for path
     * resolution and filesystem operations.
     *
     * Typically, you should *not* instantiate this class directly, but rather one
     * of the platform-specific classes, or the exported {@link PathScurry} which
     * defaults to the current platform.
     */
    class PathScurryBase {
        /**
         * The root Path entry for the current working directory of this Scurry
         */
        root;
        /**
         * The string path for the root of this Scurry's current working directory
         */
        rootPath;
        /**
         * A collection of all roots encountered, referenced by rootPath
         */
        roots;
        /**
         * The Path entry corresponding to this PathScurry's current working directory.
         */
        cwd;
        #resolveCache;
        #resolvePosixCache;
        #children;
        /**
         * Perform path comparisons case-insensitively.
         *
         * Defaults true on Darwin and Windows systems, false elsewhere.
         */
        nocase;
        #fs;
        /**
         * This class should not be instantiated directly.
         *
         * Use PathScurryWin32, PathScurryDarwin, PathScurryPosix, or PathScurry
         *
         * @internal
         */
        constructor(cwd = process.cwd(), pathImpl, sep, { nocase, childrenCacheSize = 16 * 1024, fs = defaultFS, } = {}) {
            this.#fs = fsFromOption(fs);
            if (cwd instanceof URL || cwd.startsWith('file://')) {
                cwd = (0, node_url_1.fileURLToPath)(cwd);
            }
            // resolve and split root, and then add to the store.
            // this is the only time we call path.resolve()
            const cwdPath = pathImpl.resolve(cwd);
            this.roots = Object.create(null);
            this.rootPath = this.parseRootPath(cwdPath);
            this.#resolveCache = new ResolveCache();
            this.#resolvePosixCache = new ResolveCache();
            this.#children = new ChildrenCache(childrenCacheSize);
            const split = cwdPath.substring(this.rootPath.length).split(sep);
            // resolve('/') leaves '', splits to [''], we don't want that.
            if (split.length === 1 && !split[0]) {
                split.pop();
            }
            /* c8 ignore start */
            if (nocase === undefined) {
                throw new TypeError('must provide nocase setting to PathScurryBase ctor');
            }
            /* c8 ignore stop */
            this.nocase = nocase;
            this.root = this.newRoot(this.#fs);
            this.roots[this.rootPath] = this.root;
            let prev = this.root;
            let len = split.length - 1;
            const joinSep = pathImpl.sep;
            let abs = this.rootPath;
            let sawFirst = false;
            for (const part of split) {
                const l = len--;
                prev = prev.child(part, {
                    relative: new Array(l).fill('..').join(joinSep),
                    relativePosix: new Array(l).fill('..').join('/'),
                    fullpath: (abs += (sawFirst ? '' : joinSep) + part),
                });
                sawFirst = true;
            }
            this.cwd = prev;
        }
        /**
         * Get the depth of a provided path, string, or the cwd
         */
        depth(path = this.cwd) {
            if (typeof path === 'string') {
                path = this.cwd.resolve(path);
            }
            return path.depth();
        }
        /**
         * Return the cache of child entries.  Exposed so subclasses can create
         * child Path objects in a platform-specific way.
         *
         * @internal
         */
        childrenCache() {
            return this.#children;
        }
        /**
         * Resolve one or more path strings to a resolved string
         *
         * Same interface as require('path').resolve.
         *
         * Much faster than path.resolve() when called multiple times for the same
         * path, because the resolved Path objects are cached.  Much slower
         * otherwise.
         */
        resolve(...paths) {
            // first figure out the minimum number of paths we have to test
            // we always start at cwd, but any absolutes will bump the start
            let r = '';
            for (let i = paths.length - 1; i >= 0; i--) {
                const p = paths[i];
                if (!p || p === '.')
                    continue;
                r = r ? `${p}/${r}` : p;
                if (this.isAbsolute(p)) {
                    break;
                }
            }
            const cached = this.#resolveCache.get(r);
            if (cached !== undefined) {
                return cached;
            }
            const result = this.cwd.resolve(r).fullpath();
            this.#resolveCache.set(r, result);
            return result;
        }
        /**
         * Resolve one or more path strings to a resolved string, returning
         * the posix path.  Identical to .resolve() on posix systems, but on
         * windows will return a forward-slash separated UNC path.
         *
         * Same interface as require('path').resolve.
         *
         * Much faster than path.resolve() when called multiple times for the same
         * path, because the resolved Path objects are cached.  Much slower
         * otherwise.
         */
        resolvePosix(...paths) {
            // first figure out the minimum number of paths we have to test
            // we always start at cwd, but any absolutes will bump the start
            let r = '';
            for (let i = paths.length - 1; i >= 0; i--) {
                const p = paths[i];
                if (!p || p === '.')
                    continue;
                r = r ? `${p}/${r}` : p;
                if (this.isAbsolute(p)) {
                    break;
                }
            }
            const cached = this.#resolvePosixCache.get(r);
            if (cached !== undefined) {
                return cached;
            }
            const result = this.cwd.resolve(r).fullpathPosix();
            this.#resolvePosixCache.set(r, result);
            return result;
        }
        /**
         * find the relative path from the cwd to the supplied path string or entry
         */
        relative(entry = this.cwd) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            return entry.relative();
        }
        /**
         * find the relative path from the cwd to the supplied path string or
         * entry, using / as the path delimiter, even on Windows.
         */
        relativePosix(entry = this.cwd) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            return entry.relativePosix();
        }
        /**
         * Return the basename for the provided string or Path object
         */
        basename(entry = this.cwd) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            return entry.name;
        }
        /**
         * Return the dirname for the provided string or Path object
         */
        dirname(entry = this.cwd) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            return (entry.parent || entry).fullpath();
        }
        async readdir(entry = this.cwd, opts = {
            withFileTypes: true,
        }) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes } = opts;
            if (!entry.canReaddir()) {
                return [];
            }
            else {
                const p = await entry.readdir();
                return withFileTypes ? p : p.map(e => e.name);
            }
        }
        readdirSync(entry = this.cwd, opts = {
            withFileTypes: true,
        }) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes = true } = opts;
            if (!entry.canReaddir()) {
                return [];
            }
            else if (withFileTypes) {
                return entry.readdirSync();
            }
            else {
                return entry.readdirSync().map(e => e.name);
            }
        }
        /**
         * Call lstat() on the string or Path object, and update all known
         * information that can be determined.
         *
         * Note that unlike `fs.lstat()`, the returned value does not contain some
         * information, such as `mode`, `dev`, `nlink`, and `ino`.  If that
         * information is required, you will need to call `fs.lstat` yourself.
         *
         * If the Path refers to a nonexistent file, or if the lstat call fails for
         * any reason, `undefined` is returned.  Otherwise the updated Path object is
         * returned.
         *
         * Results are cached, and thus may be out of date if the filesystem is
         * mutated.
         */
        async lstat(entry = this.cwd) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            return entry.lstat();
        }
        /**
         * synchronous {@link PathScurryBase.lstat}
         */
        lstatSync(entry = this.cwd) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            return entry.lstatSync();
        }
        async readlink(entry = this.cwd, { withFileTypes } = {
            withFileTypes: false,
        }) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                withFileTypes = entry.withFileTypes;
                entry = this.cwd;
            }
            const e = await entry.readlink();
            return withFileTypes ? e : e?.fullpath();
        }
        readlinkSync(entry = this.cwd, { withFileTypes } = {
            withFileTypes: false,
        }) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                withFileTypes = entry.withFileTypes;
                entry = this.cwd;
            }
            const e = entry.readlinkSync();
            return withFileTypes ? e : e?.fullpath();
        }
        async realpath(entry = this.cwd, { withFileTypes } = {
            withFileTypes: false,
        }) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                withFileTypes = entry.withFileTypes;
                entry = this.cwd;
            }
            const e = await entry.realpath();
            return withFileTypes ? e : e?.fullpath();
        }
        realpathSync(entry = this.cwd, { withFileTypes } = {
            withFileTypes: false,
        }) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                withFileTypes = entry.withFileTypes;
                entry = this.cwd;
            }
            const e = entry.realpathSync();
            return withFileTypes ? e : e?.fullpath();
        }
        async walk(entry = this.cwd, opts = {}) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes = true, follow = false, filter, walkFilter, } = opts;
            const results = [];
            if (!filter || filter(entry)) {
                results.push(withFileTypes ? entry : entry.fullpath());
            }
            const dirs = new Set();
            const walk = (dir, cb) => {
                dirs.add(dir);
                dir.readdirCB((er, entries) => {
                    /* c8 ignore start */
                    if (er) {
                        return cb(er);
                    }
                    /* c8 ignore stop */
                    let len = entries.length;
                    if (!len)
                        return cb();
                    const next = () => {
                        if (--len === 0) {
                            cb();
                        }
                    };
                    for (const e of entries) {
                        if (!filter || filter(e)) {
                            results.push(withFileTypes ? e : e.fullpath());
                        }
                        if (follow && e.isSymbolicLink()) {
                            e.realpath()
                                .then(r => (r?.isUnknown() ? r.lstat() : r))
                                .then(r => r?.shouldWalk(dirs, walkFilter) ? walk(r, next) : next());
                        }
                        else {
                            if (e.shouldWalk(dirs, walkFilter)) {
                                walk(e, next);
                            }
                            else {
                                next();
                            }
                        }
                    }
                }, true); // zalgooooooo
            };
            const start = entry;
            return new Promise((res, rej) => {
                walk(start, er => {
                    /* c8 ignore start */
                    if (er)
                        return rej(er);
                    /* c8 ignore stop */
                    res(results);
                });
            });
        }
        walkSync(entry = this.cwd, opts = {}) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes = true, follow = false, filter, walkFilter, } = opts;
            const results = [];
            if (!filter || filter(entry)) {
                results.push(withFileTypes ? entry : entry.fullpath());
            }
            const dirs = new Set([entry]);
            for (const dir of dirs) {
                const entries = dir.readdirSync();
                for (const e of entries) {
                    if (!filter || filter(e)) {
                        results.push(withFileTypes ? e : e.fullpath());
                    }
                    let r = e;
                    if (e.isSymbolicLink()) {
                        if (!(follow && (r = e.realpathSync())))
                            continue;
                        if (r.isUnknown())
                            r.lstatSync();
                    }
                    if (r.shouldWalk(dirs, walkFilter)) {
                        dirs.add(r);
                    }
                }
            }
            return results;
        }
        /**
         * Support for `for await`
         *
         * Alias for {@link PathScurryBase.iterate}
         *
         * Note: As of Node 19, this is very slow, compared to other methods of
         * walking.  Consider using {@link PathScurryBase.stream} if memory overhead
         * and backpressure are concerns, or {@link PathScurryBase.walk} if not.
         */
        [Symbol.asyncIterator]() {
            return this.iterate();
        }
        iterate(entry = this.cwd, options = {}) {
            // iterating async over the stream is significantly more performant,
            // especially in the warm-cache scenario, because it buffers up directory
            // entries in the background instead of waiting for a yield for each one.
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                options = entry;
                entry = this.cwd;
            }
            return this.stream(entry, options)[Symbol.asyncIterator]();
        }
        /**
         * Iterating over a PathScurry performs a synchronous walk.
         *
         * Alias for {@link PathScurryBase.iterateSync}
         */
        [Symbol.iterator]() {
            return this.iterateSync();
        }
        *iterateSync(entry = this.cwd, opts = {}) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes = true, follow = false, filter, walkFilter, } = opts;
            if (!filter || filter(entry)) {
                yield withFileTypes ? entry : entry.fullpath();
            }
            const dirs = new Set([entry]);
            for (const dir of dirs) {
                const entries = dir.readdirSync();
                for (const e of entries) {
                    if (!filter || filter(e)) {
                        yield withFileTypes ? e : e.fullpath();
                    }
                    let r = e;
                    if (e.isSymbolicLink()) {
                        if (!(follow && (r = e.realpathSync())))
                            continue;
                        if (r.isUnknown())
                            r.lstatSync();
                    }
                    if (r.shouldWalk(dirs, walkFilter)) {
                        dirs.add(r);
                    }
                }
            }
        }
        stream(entry = this.cwd, opts = {}) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes = true, follow = false, filter, walkFilter, } = opts;
            const results = new minipass_1.Minipass({ objectMode: true });
            if (!filter || filter(entry)) {
                results.write(withFileTypes ? entry : entry.fullpath());
            }
            const dirs = new Set();
            const queue = [entry];
            let processing = 0;
            const process = () => {
                let paused = false;
                while (!paused) {
                    const dir = queue.shift();
                    if (!dir) {
                        if (processing === 0)
                            results.end();
                        return;
                    }
                    processing++;
                    dirs.add(dir);
                    const onReaddir = (er, entries, didRealpaths = false) => {
                        /* c8 ignore start */
                        if (er)
                            return results.emit('error', er);
                        /* c8 ignore stop */
                        if (follow && !didRealpaths) {
                            const promises = [];
                            for (const e of entries) {
                                if (e.isSymbolicLink()) {
                                    promises.push(e
                                        .realpath()
                                        .then((r) => r?.isUnknown() ? r.lstat() : r));
                                }
                            }
                            if (promises.length) {
                                Promise.all(promises).then(() => onReaddir(null, entries, true));
                                return;
                            }
                        }
                        for (const e of entries) {
                            if (e && (!filter || filter(e))) {
                                if (!results.write(withFileTypes ? e : e.fullpath())) {
                                    paused = true;
                                }
                            }
                        }
                        processing--;
                        for (const e of entries) {
                            const r = e.realpathCached() || e;
                            if (r.shouldWalk(dirs, walkFilter)) {
                                queue.push(r);
                            }
                        }
                        if (paused && !results.flowing) {
                            results.once('drain', process);
                        }
                        else if (!sync) {
                            process();
                        }
                    };
                    // zalgo containment
                    let sync = true;
                    dir.readdirCB(onReaddir, true);
                    sync = false;
                }
            };
            process();
            return results;
        }
        streamSync(entry = this.cwd, opts = {}) {
            if (typeof entry === 'string') {
                entry = this.cwd.resolve(entry);
            }
            else if (!(entry instanceof PathBase)) {
                opts = entry;
                entry = this.cwd;
            }
            const { withFileTypes = true, follow = false, filter, walkFilter, } = opts;
            const results = new minipass_1.Minipass({ objectMode: true });
            const dirs = new Set();
            if (!filter || filter(entry)) {
                results.write(withFileTypes ? entry : entry.fullpath());
            }
            const queue = [entry];
            let processing = 0;
            const process = () => {
                let paused = false;
                while (!paused) {
                    const dir = queue.shift();
                    if (!dir) {
                        if (processing === 0)
                            results.end();
                        return;
                    }
                    processing++;
                    dirs.add(dir);
                    const entries = dir.readdirSync();
                    for (const e of entries) {
                        if (!filter || filter(e)) {
                            if (!results.write(withFileTypes ? e : e.fullpath())) {
                                paused = true;
                            }
                        }
                    }
                    processing--;
                    for (const e of entries) {
                        let r = e;
                        if (e.isSymbolicLink()) {
                            if (!(follow && (r = e.realpathSync())))
                                continue;
                            if (r.isUnknown())
                                r.lstatSync();
                        }
                        if (r.shouldWalk(dirs, walkFilter)) {
                            queue.push(r);
                        }
                    }
                }
                if (paused && !results.flowing)
                    results.once('drain', process);
            };
            process();
            return results;
        }
        chdir(path = this.cwd) {
            const oldCwd = this.cwd;
            this.cwd = typeof path === 'string' ? this.cwd.resolve(path) : path;
            this.cwd[setAsCwd](oldCwd);
        }
    }
    exports.PathScurryBase = PathScurryBase;
    /**
     * Windows implementation of {@link PathScurryBase}
     *
     * Defaults to case insensitve, uses `'\\'` to generate path strings.  Uses
     * {@link PathWin32} for Path objects.
     */
    class PathScurryWin32 extends PathScurryBase {
        /**
         * separator for generating path strings
         */
        sep = '\\';
        constructor(cwd = process.cwd(), opts = {}) {
            const { nocase = true } = opts;
            super(cwd, node_path_1.win32, '\\', { ...opts, nocase });
            this.nocase = nocase;
            for (let p = this.cwd; p; p = p.parent) {
                p.nocase = this.nocase;
            }
        }
        /**
         * @internal
         */
        parseRootPath(dir) {
            // if the path starts with a single separator, it's not a UNC, and we'll
            // just get separator as the root, and driveFromUNC will return \
            // In that case, mount \ on the root from the cwd.
            return node_path_1.win32.parse(dir).root.toUpperCase();
        }
        /**
         * @internal
         */
        newRoot(fs) {
            return new PathWin32(this.rootPath, IFDIR, undefined, this.roots, this.nocase, this.childrenCache(), { fs });
        }
        /**
         * Return true if the provided path string is an absolute path
         */
        isAbsolute(p) {
            return (p.startsWith('/') || p.startsWith('\\') || /^[a-z]:(\/|\\)/i.test(p));
        }
    }
    exports.PathScurryWin32 = PathScurryWin32;
    /**
     * {@link PathScurryBase} implementation for all posix systems other than Darwin.
     *
     * Defaults to case-sensitive matching, uses `'/'` to generate path strings.
     *
     * Uses {@link PathPosix} for Path objects.
     */
    class PathScurryPosix extends PathScurryBase {
        /**
         * separator for generating path strings
         */
        sep = '/';
        constructor(cwd = process.cwd(), opts = {}) {
            const { nocase = false } = opts;
            super(cwd, node_path_1.posix, '/', { ...opts, nocase });
            this.nocase = nocase;
        }
        /**
         * @internal
         */
        parseRootPath(_dir) {
            return '/';
        }
        /**
         * @internal
         */
        newRoot(fs) {
            return new PathPosix(this.rootPath, IFDIR, undefined, this.roots, this.nocase, this.childrenCache(), { fs });
        }
        /**
         * Return true if the provided path string is an absolute path
         */
        isAbsolute(p) {
            return p.startsWith('/');
        }
    }
    exports.PathScurryPosix = PathScurryPosix;
    /**
     * {@link PathScurryBase} implementation for Darwin (macOS) systems.
     *
     * Defaults to case-insensitive matching, uses `'/'` for generating path
     * strings.
     *
     * Uses {@link PathPosix} for Path objects.
     */
    class PathScurryDarwin extends PathScurryPosix {
        constructor(cwd = process.cwd(), opts = {}) {
            const { nocase = true } = opts;
            super(cwd, { ...opts, nocase });
        }
    }
    exports.PathScurryDarwin = PathScurryDarwin;
    /**
     * Default {@link PathBase} implementation for the current platform.
     *
     * {@link PathWin32} on Windows systems, {@link PathPosix} on all others.
     */
    exports.Path = process.platform === 'win32' ? PathWin32 : PathPosix;
    /**
     * Default {@link PathScurryBase} implementation for the current platform.
     *
     * {@link PathScurryWin32} on Windows systems, {@link PathScurryDarwin} on
     * Darwin (macOS) systems, {@link PathScurryPosix} on all others.
     */
    exports.PathScurry = process.platform === 'win32' ? PathScurryWin32
        : process.platform === 'darwin' ? PathScurryDarwin
            : PathScurryPosix;
    //# sourceMappingURL=index.js.map
    
    /***/ }),
    
    /***/ 3821:
    /***/ ((__unused_webpack_module, exports) => {
    
    "use strict";
    
    /**
     * @module LRUCache
     */
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    exports.LRUCache = void 0;
    const perf = typeof performance === 'object' &&
        performance &&
        typeof performance.now === 'function'
        ? performance
        : Date;
    const warned = new Set();
    /* c8 ignore start */
    const PROCESS = (typeof process === 'object' && !!process ? process : {});
    /* c8 ignore start */
    const emitWarning = (msg, type, code, fn) => {
        typeof PROCESS.emitWarning === 'function'
            ? PROCESS.emitWarning(msg, type, code, fn)
            : console.error(`[${code}] ${type}: ${msg}`);
    };
    let AC = globalThis.AbortController;
    let AS = globalThis.AbortSignal;
    /* c8 ignore start */
    if (typeof AC === 'undefined') {
        //@ts-ignore
        AS = class AbortSignal {
            onabort;
            _onabort = [];
            reason;
            aborted = false;
            addEventListener(_, fn) {
                this._onabort.push(fn);
            }
        };
        //@ts-ignore
        AC = class AbortController {
            constructor() {
                warnACPolyfill();
            }
            signal = new AS();
            abort(reason) {
                if (this.signal.aborted)
                    return;
                //@ts-ignore
                this.signal.reason = reason;
                //@ts-ignore
                this.signal.aborted = true;
                //@ts-ignore
                for (const fn of this.signal._onabort) {
                    fn(reason);
                }
                this.signal.onabort?.(reason);
            }
        };
        let printACPolyfillWarning = PROCESS.env?.LRU_CACHE_IGNORE_AC_WARNING !== '1';
        const warnACPolyfill = () => {
            if (!printACPolyfillWarning)
                return;
            printACPolyfillWarning = false;
            emitWarning('AbortController is not defined. If using lru-cache in ' +
                'node 14, load an AbortController polyfill from the ' +
                '`node-abort-controller` package. A minimal polyfill is ' +
                'provided for use by LRUCache.fetch(), but it should not be ' +
                'relied upon in other contexts (eg, passing it to other APIs that ' +
                'use AbortController/AbortSignal might have undesirable effects). ' +
                'You may disable this with LRU_CACHE_IGNORE_AC_WARNING=1 in the env.', 'NO_ABORT_CONTROLLER', 'ENOTSUP', warnACPolyfill);
        };
    }
    /* c8 ignore stop */
    const shouldWarn = (code) => !warned.has(code);
    const TYPE = Symbol('type');
    const isPosInt = (n) => n && n === Math.floor(n) && n > 0 && isFinite(n);
    /* c8 ignore start */
    // This is a little bit ridiculous, tbh.
    // The maximum array length is 2^32-1 or thereabouts on most JS impls.
    // And well before that point, you're caching the entire world, I mean,
    // that's ~32GB of just integers for the next/prev links, plus whatever
    // else to hold that many keys and values.  Just filling the memory with
    // zeroes at init time is brutal when you get that big.
    // But why not be complete?
    // Maybe in the future, these limits will have expanded.
    const getUintArray = (max) => !isPosInt(max)
        ? null
        : max <= Math.pow(2, 8)
            ? Uint8Array
            : max <= Math.pow(2, 16)
                ? Uint16Array
                : max <= Math.pow(2, 32)
                    ? Uint32Array
                    : max <= Number.MAX_SAFE_INTEGER
                        ? ZeroArray
                        : null;
    /* c8 ignore stop */
    class ZeroArray extends Array {
        constructor(size) {
            super(size);
            this.fill(0);
        }
    }
    class Stack {
        heap;
        length;
        // private constructor
        static #constructing = false;
        static create(max) {
            const HeapCls = getUintArray(max);
            if (!HeapCls)
                return [];
            Stack.#constructing = true;
            const s = new Stack(max, HeapCls);
            Stack.#constructing = false;
            return s;
        }
        constructor(max, HeapCls) {
            /* c8 ignore start */
            if (!Stack.#constructing) {
                throw new TypeError('instantiate Stack using Stack.create(n)');
            }
            /* c8 ignore stop */
            this.heap = new HeapCls(max);
            this.length = 0;
        }
        push(n) {
            this.heap[this.length++] = n;
        }
        pop() {
            return this.heap[--this.length];
        }
    }
    /**
     * Default export, the thing you're using this module to get.
     *
     * The `K` and `V` types define the key and value types, respectively. The
     * optional `FC` type defines the type of the `context` object passed to
     * `cache.fetch()` and `cache.memo()`.
     *
     * Keys and values **must not** be `null` or `undefined`.
     *
     * All properties from the options object (with the exception of `max`,
     * `maxSize`, `fetchMethod`, `memoMethod`, `dispose` and `disposeAfter`) are
     * added as normal public members. (The listed options are read-only getters.)
     *
     * Changing any of these will alter the defaults for subsequent method calls.
     */
    class LRUCache {
        // options that cannot be changed without disaster
        #max;
        #maxSize;
        #dispose;
        #disposeAfter;
        #fetchMethod;
        #memoMethod;
        /**
         * {@link LRUCache.OptionsBase.ttl}
         */
        ttl;
        /**
         * {@link LRUCache.OptionsBase.ttlResolution}
         */
        ttlResolution;
        /**
         * {@link LRUCache.OptionsBase.ttlAutopurge}
         */
        ttlAutopurge;
        /**
         * {@link LRUCache.OptionsBase.updateAgeOnGet}
         */
        updateAgeOnGet;
        /**
         * {@link LRUCache.OptionsBase.updateAgeOnHas}
         */
        updateAgeOnHas;
        /**
         * {@link LRUCache.OptionsBase.allowStale}
         */
        allowStale;
        /**
         * {@link LRUCache.OptionsBase.noDisposeOnSet}
         */
        noDisposeOnSet;
        /**
         * {@link LRUCache.OptionsBase.noUpdateTTL}
         */
        noUpdateTTL;
        /**
         * {@link LRUCache.OptionsBase.maxEntrySize}
         */
        maxEntrySize;
        /**
         * {@link LRUCache.OptionsBase.sizeCalculation}
         */
        sizeCalculation;
        /**
         * {@link LRUCache.OptionsBase.noDeleteOnFetchRejection}
         */
        noDeleteOnFetchRejection;
        /**
         * {@link LRUCache.OptionsBase.noDeleteOnStaleGet}
         */
        noDeleteOnStaleGet;
        /**
         * {@link LRUCache.OptionsBase.allowStaleOnFetchAbort}
         */
        allowStaleOnFetchAbort;
        /**
         * {@link LRUCache.OptionsBase.allowStaleOnFetchRejection}
         */
        allowStaleOnFetchRejection;
        /**
         * {@link LRUCache.OptionsBase.ignoreFetchAbort}
         */
        ignoreFetchAbort;
        // computed properties
        #size;
        #calculatedSize;
        #keyMap;
        #keyList;
        #valList;
        #next;
        #prev;
        #head;
        #tail;
        #free;
        #disposed;
        #sizes;
        #starts;
        #ttls;
        #hasDispose;
        #hasFetchMethod;
        #hasDisposeAfter;
        /**
         * Do not call this method unless you need to inspect the
         * inner workings of the cache.  If anything returned by this
         * object is modified in any way, strange breakage may occur.
         *
         * These fields are private for a reason!
         *
         * @internal
         */
        static unsafeExposeInternals(c) {
            return {
                // properties
                starts: c.#starts,
                ttls: c.#ttls,
                sizes: c.#sizes,
                keyMap: c.#keyMap,
                keyList: c.#keyList,
                valList: c.#valList,
                next: c.#next,
                prev: c.#prev,
                get head() {
                    return c.#head;
                },
                get tail() {
                    return c.#tail;
                },
                free: c.#free,
                // methods
                isBackgroundFetch: (p) => c.#isBackgroundFetch(p),
                backgroundFetch: (k, index, options, context) => c.#backgroundFetch(k, index, options, context),
                moveToTail: (index) => c.#moveToTail(index),
                indexes: (options) => c.#indexes(options),
                rindexes: (options) => c.#rindexes(options),
                isStale: (index) => c.#isStale(index),
            };
        }
        // Protected read-only members
        /**
         * {@link LRUCache.OptionsBase.max} (read-only)
         */
        get max() {
            return this.#max;
        }
        /**
         * {@link LRUCache.OptionsBase.maxSize} (read-only)
         */
        get maxSize() {
            return this.#maxSize;
        }
        /**
         * The total computed size of items in the cache (read-only)
         */
        get calculatedSize() {
            return this.#calculatedSize;
        }
        /**
         * The number of items stored in the cache (read-only)
         */
        get size() {
            return this.#size;
        }
        /**
         * {@link LRUCache.OptionsBase.fetchMethod} (read-only)
         */
        get fetchMethod() {
            return this.#fetchMethod;
        }
        get memoMethod() {
            return this.#memoMethod;
        }
        /**
         * {@link LRUCache.OptionsBase.dispose} (read-only)
         */
        get dispose() {
            return this.#dispose;
        }
        /**
         * {@link LRUCache.OptionsBase.disposeAfter} (read-only)
         */
        get disposeAfter() {
            return this.#disposeAfter;
        }
        constructor(options) {
            const { max = 0, ttl, ttlResolution = 1, ttlAutopurge, updateAgeOnGet, updateAgeOnHas, allowStale, dispose, disposeAfter, noDisposeOnSet, noUpdateTTL, maxSize = 0, maxEntrySize = 0, sizeCalculation, fetchMethod, memoMethod, noDeleteOnFetchRejection, noDeleteOnStaleGet, allowStaleOnFetchRejection, allowStaleOnFetchAbort, ignoreFetchAbort, } = options;
            if (max !== 0 && !isPosInt(max)) {
                throw new TypeError('max option must be a nonnegative integer');
            }
            const UintArray = max ? getUintArray(max) : Array;
            if (!UintArray) {
                throw new Error('invalid max value: ' + max);
            }
            this.#max = max;
            this.#maxSize = maxSize;
            this.maxEntrySize = maxEntrySize || this.#maxSize;
            this.sizeCalculation = sizeCalculation;
            if (this.sizeCalculation) {
                if (!this.#maxSize && !this.maxEntrySize) {
                    throw new TypeError('cannot set sizeCalculation without setting maxSize or maxEntrySize');
                }
                if (typeof this.sizeCalculation !== 'function') {
                    throw new TypeError('sizeCalculation set to non-function');
                }
            }
            if (memoMethod !== undefined &&
                typeof memoMethod !== 'function') {
                throw new TypeError('memoMethod must be a function if defined');
            }
            this.#memoMethod = memoMethod;
            if (fetchMethod !== undefined &&
                typeof fetchMethod !== 'function') {
                throw new TypeError('fetchMethod must be a function if specified');
            }
            this.#fetchMethod = fetchMethod;
            this.#hasFetchMethod = !!fetchMethod;
            this.#keyMap = new Map();
            this.#keyList = new Array(max).fill(undefined);
            this.#valList = new Array(max).fill(undefined);
            this.#next = new UintArray(max);
            this.#prev = new UintArray(max);
            this.#head = 0;
            this.#tail = 0;
            this.#free = Stack.create(max);
            this.#size = 0;
            this.#calculatedSize = 0;
            if (typeof dispose === 'function') {
                this.#dispose = dispose;
            }
            if (typeof disposeAfter === 'function') {
                this.#disposeAfter = disposeAfter;
                this.#disposed = [];
            }
            else {
                this.#disposeAfter = undefined;
                this.#disposed = undefined;
            }
            this.#hasDispose = !!this.#dispose;
            this.#hasDisposeAfter = !!this.#disposeAfter;
            this.noDisposeOnSet = !!noDisposeOnSet;
            this.noUpdateTTL = !!noUpdateTTL;
            this.noDeleteOnFetchRejection = !!noDeleteOnFetchRejection;
            this.allowStaleOnFetchRejection = !!allowStaleOnFetchRejection;
            this.allowStaleOnFetchAbort = !!allowStaleOnFetchAbort;
            this.ignoreFetchAbort = !!ignoreFetchAbort;
            // NB: maxEntrySize is set to maxSize if it's set
            if (this.maxEntrySize !== 0) {
                if (this.#maxSize !== 0) {
                    if (!isPosInt(this.#maxSize)) {
                        throw new TypeError('maxSize must be a positive integer if specified');
                    }
                }
                if (!isPosInt(this.maxEntrySize)) {
                    throw new TypeError('maxEntrySize must be a positive integer if specified');
                }
                this.#initializeSizeTracking();
            }
            this.allowStale = !!allowStale;
            this.noDeleteOnStaleGet = !!noDeleteOnStaleGet;
            this.updateAgeOnGet = !!updateAgeOnGet;
            this.updateAgeOnHas = !!updateAgeOnHas;
            this.ttlResolution =
                isPosInt(ttlResolution) || ttlResolution === 0
                    ? ttlResolution
                    : 1;
            this.ttlAutopurge = !!ttlAutopurge;
            this.ttl = ttl || 0;
            if (this.ttl) {
                if (!isPosInt(this.ttl)) {
                    throw new TypeError('ttl must be a positive integer if specified');
                }
                this.#initializeTTLTracking();
            }
            // do not allow completely unbounded caches
            if (this.#max === 0 && this.ttl === 0 && this.#maxSize === 0) {
                throw new TypeError('At least one of max, maxSize, or ttl is required');
            }
            if (!this.ttlAutopurge && !this.#max && !this.#maxSize) {
                const code = 'LRU_CACHE_UNBOUNDED';
                if (shouldWarn(code)) {
                    warned.add(code);
                    const msg = 'TTL caching without ttlAutopurge, max, or maxSize can ' +
                        'result in unbounded memory consumption.';
                    emitWarning(msg, 'UnboundedCacheWarning', code, LRUCache);
                }
            }
        }
        /**
         * Return the number of ms left in the item's TTL. If item is not in cache,
         * returns `0`. Returns `Infinity` if item is in cache without a defined TTL.
         */
        getRemainingTTL(key) {
            return this.#keyMap.has(key) ? Infinity : 0;
        }
        #initializeTTLTracking() {
            const ttls = new ZeroArray(this.#max);
            const starts = new ZeroArray(this.#max);
            this.#ttls = ttls;
            this.#starts = starts;
            this.#setItemTTL = (index, ttl, start = perf.now()) => {
                starts[index] = ttl !== 0 ? start : 0;
                ttls[index] = ttl;
                if (ttl !== 0 && this.ttlAutopurge) {
                    const t = setTimeout(() => {
                        if (this.#isStale(index)) {
                            this.#delete(this.#keyList[index], 'expire');
                        }
                    }, ttl + 1);
                    // unref() not supported on all platforms
                    /* c8 ignore start */
                    if (t.unref) {
                        t.unref();
                    }
                    /* c8 ignore stop */
                }
            };
            this.#updateItemAge = index => {
                starts[index] = ttls[index] !== 0 ? perf.now() : 0;
            };
            this.#statusTTL = (status, index) => {
                if (ttls[index]) {
                    const ttl = ttls[index];
                    const start = starts[index];
                    /* c8 ignore next */
                    if (!ttl || !start)
                        return;
                    status.ttl = ttl;
                    status.start = start;
                    status.now = cachedNow || getNow();
                    const age = status.now - start;
                    status.remainingTTL = ttl - age;
                }
            };
            // debounce calls to perf.now() to 1s so we're not hitting
            // that costly call repeatedly.
            let cachedNow = 0;
            const getNow = () => {
                const n = perf.now();
                if (this.ttlResolution > 0) {
                    cachedNow = n;
                    const t = setTimeout(() => (cachedNow = 0), this.ttlResolution);
                    // not available on all platforms
                    /* c8 ignore start */
                    if (t.unref) {
                        t.unref();
                    }
                    /* c8 ignore stop */
                }
                return n;
            };
            this.getRemainingTTL = key => {
                const index = this.#keyMap.get(key);
                if (index === undefined) {
                    return 0;
                }
                const ttl = ttls[index];
                const start = starts[index];
                if (!ttl || !start) {
                    return Infinity;
                }
                const age = (cachedNow || getNow()) - start;
                return ttl - age;
            };
            this.#isStale = index => {
                const s = starts[index];
                const t = ttls[index];
                return !!t && !!s && (cachedNow || getNow()) - s > t;
            };
        }
        // conditionally set private methods related to TTL
        #updateItemAge = () => { };
        #statusTTL = () => { };
        #setItemTTL = () => { };
        /* c8 ignore stop */
        #isStale = () => false;
        #initializeSizeTracking() {
            const sizes = new ZeroArray(this.#max);
            this.#calculatedSize = 0;
            this.#sizes = sizes;
            this.#removeItemSize = index => {
                this.#calculatedSize -= sizes[index];
                sizes[index] = 0;
            };
            this.#requireSize = (k, v, size, sizeCalculation) => {
                // provisionally accept background fetches.
                // actual value size will be checked when they return.
                if (this.#isBackgroundFetch(v)) {
                    return 0;
                }
                if (!isPosInt(size)) {
                    if (sizeCalculation) {
                        if (typeof sizeCalculation !== 'function') {
                            throw new TypeError('sizeCalculation must be a function');
                        }
                        size = sizeCalculation(v, k);
                        if (!isPosInt(size)) {
                            throw new TypeError('sizeCalculation return invalid (expect positive integer)');
                        }
                    }
                    else {
                        throw new TypeError('invalid size value (must be positive integer). ' +
                            'When maxSize or maxEntrySize is used, sizeCalculation ' +
                            'or size must be set.');
                    }
                }
                return size;
            };
            this.#addItemSize = (index, size, status) => {
                sizes[index] = size;
                if (this.#maxSize) {
                    const maxSize = this.#maxSize - sizes[index];
                    while (this.#calculatedSize > maxSize) {
                        this.#evict(true);
                    }
                }
                this.#calculatedSize += sizes[index];
                if (status) {
                    status.entrySize = size;
                    status.totalCalculatedSize = this.#calculatedSize;
                }
            };
        }
        #removeItemSize = _i => { };
        #addItemSize = (_i, _s, _st) => { };
        #requireSize = (_k, _v, size, sizeCalculation) => {
            if (size || sizeCalculation) {
                throw new TypeError('cannot set size without setting maxSize or maxEntrySize on cache');
            }
            return 0;
        };
        *#indexes({ allowStale = this.allowStale } = {}) {
            if (this.#size) {
                for (let i = this.#tail; true;) {
                    if (!this.#isValidIndex(i)) {
                        break;
                    }
                    if (allowStale || !this.#isStale(i)) {
                        yield i;
                    }
                    if (i === this.#head) {
                        break;
                    }
                    else {
                        i = this.#prev[i];
                    }
                }
            }
        }
        *#rindexes({ allowStale = this.allowStale } = {}) {
            if (this.#size) {
                for (let i = this.#head; true;) {
                    if (!this.#isValidIndex(i)) {
                        break;
                    }
                    if (allowStale || !this.#isStale(i)) {
                        yield i;
                    }
                    if (i === this.#tail) {
                        break;
                    }
                    else {
                        i = this.#next[i];
                    }
                }
            }
        }
        #isValidIndex(index) {
            return (index !== undefined &&
                this.#keyMap.get(this.#keyList[index]) === index);
        }
        /**
         * Return a generator yielding `[key, value]` pairs,
         * in order from most recently used to least recently used.
         */
        *entries() {
            for (const i of this.#indexes()) {
                if (this.#valList[i] !== undefined &&
                    this.#keyList[i] !== undefined &&
                    !this.#isBackgroundFetch(this.#valList[i])) {
                    yield [this.#keyList[i], this.#valList[i]];
                }
            }
        }
        /**
         * Inverse order version of {@link LRUCache.entries}
         *
         * Return a generator yielding `[key, value]` pairs,
         * in order from least recently used to most recently used.
         */
        *rentries() {
            for (const i of this.#rindexes()) {
                if (this.#valList[i] !== undefined &&
                    this.#keyList[i] !== undefined &&
                    !this.#isBackgroundFetch(this.#valList[i])) {
                    yield [this.#keyList[i], this.#valList[i]];
                }
            }
        }
        /**
         * Return a generator yielding the keys in the cache,
         * in order from most recently used to least recently used.
         */
        *keys() {
            for (const i of this.#indexes()) {
                const k = this.#keyList[i];
                if (k !== undefined &&
                    !this.#isBackgroundFetch(this.#valList[i])) {
                    yield k;
                }
            }
        }
        /**
         * Inverse order version of {@link LRUCache.keys}
         *
         * Return a generator yielding the keys in the cache,
         * in order from least recently used to most recently used.
         */
        *rkeys() {
            for (const i of this.#rindexes()) {
                const k = this.#keyList[i];
                if (k !== undefined &&
                    !this.#isBackgroundFetch(this.#valList[i])) {
                    yield k;
                }
            }
        }
        /**
         * Return a generator yielding the values in the cache,
         * in order from most recently used to least recently used.
         */
        *values() {
            for (const i of this.#indexes()) {
                const v = this.#valList[i];
                if (v !== undefined &&
                    !this.#isBackgroundFetch(this.#valList[i])) {
                    yield this.#valList[i];
                }
            }
        }
        /**
         * Inverse order version of {@link LRUCache.values}
         *
         * Return a generator yielding the values in the cache,
         * in order from least recently used to most recently used.
         */
        *rvalues() {
            for (const i of this.#rindexes()) {
                const v = this.#valList[i];
                if (v !== undefined &&
                    !this.#isBackgroundFetch(this.#valList[i])) {
                    yield this.#valList[i];
                }
            }
        }
        /**
         * Iterating over the cache itself yields the same results as
         * {@link LRUCache.entries}
         */
        [Symbol.iterator]() {
            return this.entries();
        }
        /**
         * A String value that is used in the creation of the default string
         * description of an object. Called by the built-in method
         * `Object.prototype.toString`.
         */
        [Symbol.toStringTag] = 'LRUCache';
        /**
         * Find a value for which the supplied fn method returns a truthy value,
         * similar to `Array.find()`. fn is called as `fn(value, key, cache)`.
         */
        find(fn, getOptions = {}) {
            for (const i of this.#indexes()) {
                const v = this.#valList[i];
                const value = this.#isBackgroundFetch(v)
                    ? v.__staleWhileFetching
                    : v;
                if (value === undefined)
                    continue;
                if (fn(value, this.#keyList[i], this)) {
                    return this.get(this.#keyList[i], getOptions);
                }
            }
        }
        /**
         * Call the supplied function on each item in the cache, in order from most
         * recently used to least recently used.
         *
         * `fn` is called as `fn(value, key, cache)`.
         *
         * If `thisp` is provided, function will be called in the `this`-context of
         * the provided object, or the cache if no `thisp` object is provided.
         *
         * Does not update age or recenty of use, or iterate over stale values.
         */
        forEach(fn, thisp = this) {
            for (const i of this.#indexes()) {
                const v = this.#valList[i];
                const value = this.#isBackgroundFetch(v)
                    ? v.__staleWhileFetching
                    : v;
                if (value === undefined)
                    continue;
                fn.call(thisp, value, this.#keyList[i], this);
            }
        }
        /**
         * The same as {@link LRUCache.forEach} but items are iterated over in
         * reverse order.  (ie, less recently used items are iterated over first.)
         */
        rforEach(fn, thisp = this) {
            for (const i of this.#rindexes()) {
                const v = this.#valList[i];
                const value = this.#isBackgroundFetch(v)
                    ? v.__staleWhileFetching
                    : v;
                if (value === undefined)
                    continue;
                fn.call(thisp, value, this.#keyList[i], this);
            }
        }
        /**
         * Delete any stale entries. Returns true if anything was removed,
         * false otherwise.
         */
        purgeStale() {
            let deleted = false;
            for (const i of this.#rindexes({ allowStale: true })) {
                if (this.#isStale(i)) {
                    this.#delete(this.#keyList[i], 'expire');
                    deleted = true;
                }
            }
            return deleted;
        }
        /**
         * Get the extended info about a given entry, to get its value, size, and
         * TTL info simultaneously. Returns `undefined` if the key is not present.
         *
         * Unlike {@link LRUCache#dump}, which is designed to be portable and survive
         * serialization, the `start` value is always the current timestamp, and the
         * `ttl` is a calculated remaining time to live (negative if expired).
         *
         * Always returns stale values, if their info is found in the cache, so be
         * sure to check for expirations (ie, a negative {@link LRUCache.Entry#ttl})
         * if relevant.
         */
        info(key) {
            const i = this.#keyMap.get(key);
            if (i === undefined)
                return undefined;
            const v = this.#valList[i];
            const value = this.#isBackgroundFetch(v)
                ? v.__staleWhileFetching
                : v;
            if (value === undefined)
                return undefined;
            const entry = { value };
            if (this.#ttls && this.#starts) {
                const ttl = this.#ttls[i];
                const start = this.#starts[i];
                if (ttl && start) {
                    const remain = ttl - (perf.now() - start);
                    entry.ttl = remain;
                    entry.start = Date.now();
                }
            }
            if (this.#sizes) {
                entry.size = this.#sizes[i];
            }
            return entry;
        }
        /**
         * Return an array of [key, {@link LRUCache.Entry}] tuples which can be
         * passed to {@link LRLUCache#load}.
         *
         * The `start` fields are calculated relative to a portable `Date.now()`
         * timestamp, even if `performance.now()` is available.
         *
         * Stale entries are always included in the `dump`, even if
         * {@link LRUCache.OptionsBase.allowStale} is false.
         *
         * Note: this returns an actual array, not a generator, so it can be more
         * easily passed around.
         */
        dump() {
            const arr = [];
            for (const i of this.#indexes({ allowStale: true })) {
                const key = this.#keyList[i];
                const v = this.#valList[i];
                const value = this.#isBackgroundFetch(v)
                    ? v.__staleWhileFetching
                    : v;
                if (value === undefined || key === undefined)
                    continue;
                const entry = { value };
                if (this.#ttls && this.#starts) {
                    entry.ttl = this.#ttls[i];
                    // always dump the start relative to a portable timestamp
                    // it's ok for this to be a bit slow, it's a rare operation.
                    const age = perf.now() - this.#starts[i];
                    entry.start = Math.floor(Date.now() - age);
                }
                if (this.#sizes) {
                    entry.size = this.#sizes[i];
                }
                arr.unshift([key, entry]);
            }
            return arr;
        }
        /**
         * Reset the cache and load in the items in entries in the order listed.
         *
         * The shape of the resulting cache may be different if the same options are
         * not used in both caches.
         *
         * The `start` fields are assumed to be calculated relative to a portable
         * `Date.now()` timestamp, even if `performance.now()` is available.
         */
        load(arr) {
            this.clear();
            for (const [key, entry] of arr) {
                if (entry.start) {
                    // entry.start is a portable timestamp, but we may be using
                    // node's performance.now(), so calculate the offset, so that
                    // we get the intended remaining TTL, no matter how long it's
                    // been on ice.
                    //
                    // it's ok for this to be a bit slow, it's a rare operation.
                    const age = Date.now() - entry.start;
                    entry.start = perf.now() - age;
                }
                this.set(key, entry.value, entry);
            }
        }
        /**
         * Add a value to the cache.
         *
         * Note: if `undefined` is specified as a value, this is an alias for
         * {@link LRUCache#delete}
         *
         * Fields on the {@link LRUCache.SetOptions} options param will override
         * their corresponding values in the constructor options for the scope
         * of this single `set()` operation.
         *
         * If `start` is provided, then that will set the effective start
         * time for the TTL calculation. Note that this must be a previous
         * value of `performance.now()` if supported, or a previous value of
         * `Date.now()` if not.
         *
         * Options object may also include `size`, which will prevent
         * calling the `sizeCalculation` function and just use the specified
         * number if it is a positive integer, and `noDisposeOnSet` which
         * will prevent calling a `dispose` function in the case of
         * overwrites.
         *
         * If the `size` (or return value of `sizeCalculation`) for a given
         * entry is greater than `maxEntrySize`, then the item will not be
         * added to the cache.
         *
         * Will update the recency of the entry.
         *
         * If the value is `undefined`, then this is an alias for
         * `cache.delete(key)`. `undefined` is never stored in the cache.
         */
        set(k, v, setOptions = {}) {
            if (v === undefined) {
                this.delete(k);
                return this;
            }
            const { ttl = this.ttl, start, noDisposeOnSet = this.noDisposeOnSet, sizeCalculation = this.sizeCalculation, status, } = setOptions;
            let { noUpdateTTL = this.noUpdateTTL } = setOptions;
            const size = this.#requireSize(k, v, setOptions.size || 0, sizeCalculation);
            // if the item doesn't fit, don't do anything
            // NB: maxEntrySize set to maxSize by default
            if (this.maxEntrySize && size > this.maxEntrySize) {
                if (status) {
                    status.set = 'miss';
                    status.maxEntrySizeExceeded = true;
                }
                // have to delete, in case something is there already.
                this.#delete(k, 'set');
                return this;
            }
            let index = this.#size === 0 ? undefined : this.#keyMap.get(k);
            if (index === undefined) {
                // addition
                index = (this.#size === 0
                    ? this.#tail
                    : this.#free.length !== 0
                        ? this.#free.pop()
                        : this.#size === this.#max
                            ? this.#evict(false)
                            : this.#size);
                this.#keyList[index] = k;
                this.#valList[index] = v;
                this.#keyMap.set(k, index);
                this.#next[this.#tail] = index;
                this.#prev[index] = this.#tail;
                this.#tail = index;
                this.#size++;
                this.#addItemSize(index, size, status);
                if (status)
                    status.set = 'add';
                noUpdateTTL = false;
            }
            else {
                // update
                this.#moveToTail(index);
                const oldVal = this.#valList[index];
                if (v !== oldVal) {
                    if (this.#hasFetchMethod && this.#isBackgroundFetch(oldVal)) {
                        oldVal.__abortController.abort(new Error('replaced'));
                        const { __staleWhileFetching: s } = oldVal;
                        if (s !== undefined && !noDisposeOnSet) {
                            if (this.#hasDispose) {
                                this.#dispose?.(s, k, 'set');
                            }
                            if (this.#hasDisposeAfter) {
                                this.#disposed?.push([s, k, 'set']);
                            }
                        }
                    }
                    else if (!noDisposeOnSet) {
                        if (this.#hasDispose) {
                            this.#dispose?.(oldVal, k, 'set');
                        }
                        if (this.#hasDisposeAfter) {
                            this.#disposed?.push([oldVal, k, 'set']);
                        }
                    }
                    this.#removeItemSize(index);
                    this.#addItemSize(index, size, status);
                    this.#valList[index] = v;
                    if (status) {
                        status.set = 'replace';
                        const oldValue = oldVal && this.#isBackgroundFetch(oldVal)
                            ? oldVal.__staleWhileFetching
                            : oldVal;
                        if (oldValue !== undefined)
                            status.oldValue = oldValue;
                    }
                }
                else if (status) {
                    status.set = 'update';
                }
            }
            if (ttl !== 0 && !this.#ttls) {
                this.#initializeTTLTracking();
            }
            if (this.#ttls) {
                if (!noUpdateTTL) {
                    this.#setItemTTL(index, ttl, start);
                }
                if (status)
                    this.#statusTTL(status, index);
            }
            if (!noDisposeOnSet && this.#hasDisposeAfter && this.#disposed) {
                const dt = this.#disposed;
                let task;
                while ((task = dt?.shift())) {
                    this.#disposeAfter?.(...task);
                }
            }
            return this;
        }
        /**
         * Evict the least recently used item, returning its value or
         * `undefined` if cache is empty.
         */
        pop() {
            try {
                while (this.#size) {
                    const val = this.#valList[this.#head];
                    this.#evict(true);
                    if (this.#isBackgroundFetch(val)) {
                        if (val.__staleWhileFetching) {
                            return val.__staleWhileFetching;
                        }
                    }
                    else if (val !== undefined) {
                        return val;
                    }
                }
            }
            finally {
                if (this.#hasDisposeAfter && this.#disposed) {
                    const dt = this.#disposed;
                    let task;
                    while ((task = dt?.shift())) {
                        this.#disposeAfter?.(...task);
                    }
                }
            }
        }
        #evict(free) {
            const head = this.#head;
            const k = this.#keyList[head];
            const v = this.#valList[head];
            if (this.#hasFetchMethod && this.#isBackgroundFetch(v)) {
                v.__abortController.abort(new Error('evicted'));
            }
            else if (this.#hasDispose || this.#hasDisposeAfter) {
                if (this.#hasDispose) {
                    this.#dispose?.(v, k, 'evict');
                }
                if (this.#hasDisposeAfter) {
                    this.#disposed?.push([v, k, 'evict']);
                }
            }
            this.#removeItemSize(head);
            // if we aren't about to use the index, then null these out
            if (free) {
                this.#keyList[head] = undefined;
                this.#valList[head] = undefined;
                this.#free.push(head);
            }
            if (this.#size === 1) {
                this.#head = this.#tail = 0;
                this.#free.length = 0;
            }
            else {
                this.#head = this.#next[head];
            }
            this.#keyMap.delete(k);
            this.#size--;
            return head;
        }
        /**
         * Check if a key is in the cache, without updating the recency of use.
         * Will return false if the item is stale, even though it is technically
         * in the cache.
         *
         * Check if a key is in the cache, without updating the recency of
         * use. Age is updated if {@link LRUCache.OptionsBase.updateAgeOnHas} is set
         * to `true` in either the options or the constructor.
         *
         * Will return `false` if the item is stale, even though it is technically in
         * the cache. The difference can be determined (if it matters) by using a
         * `status` argument, and inspecting the `has` field.
         *
         * Will not update item age unless
         * {@link LRUCache.OptionsBase.updateAgeOnHas} is set.
         */
        has(k, hasOptions = {}) {
            const { updateAgeOnHas = this.updateAgeOnHas, status } = hasOptions;
            const index = this.#keyMap.get(k);
            if (index !== undefined) {
                const v = this.#valList[index];
                if (this.#isBackgroundFetch(v) &&
                    v.__staleWhileFetching === undefined) {
                    return false;
                }
                if (!this.#isStale(index)) {
                    if (updateAgeOnHas) {
                        this.#updateItemAge(index);
                    }
                    if (status) {
                        status.has = 'hit';
                        this.#statusTTL(status, index);
                    }
                    return true;
                }
                else if (status) {
                    status.has = 'stale';
                    this.#statusTTL(status, index);
                }
            }
            else if (status) {
                status.has = 'miss';
            }
            return false;
        }
        /**
         * Like {@link LRUCache#get} but doesn't update recency or delete stale
         * items.
         *
         * Returns `undefined` if the item is stale, unless
         * {@link LRUCache.OptionsBase.allowStale} is set.
         */
        peek(k, peekOptions = {}) {
            const { allowStale = this.allowStale } = peekOptions;
            const index = this.#keyMap.get(k);
            if (index === undefined ||
                (!allowStale && this.#isStale(index))) {
                return;
            }
            const v = this.#valList[index];
            // either stale and allowed, or forcing a refresh of non-stale value
            return this.#isBackgroundFetch(v) ? v.__staleWhileFetching : v;
        }
        #backgroundFetch(k, index, options, context) {
            const v = index === undefined ? undefined : this.#valList[index];
            if (this.#isBackgroundFetch(v)) {
                return v;
            }
            const ac = new AC();
            const { signal } = options;
            // when/if our AC signals, then stop listening to theirs.
            signal?.addEventListener('abort', () => ac.abort(signal.reason), {
                signal: ac.signal,
            });
            const fetchOpts = {
                signal: ac.signal,
                options,
                context,
            };
            const cb = (v, updateCache = false) => {
                const { aborted } = ac.signal;
                const ignoreAbort = options.ignoreFetchAbort && v !== undefined;
                if (options.status) {
                    if (aborted && !updateCache) {
                        options.status.fetchAborted = true;
                        options.status.fetchError = ac.signal.reason;
                        if (ignoreAbort)
                            options.status.fetchAbortIgnored = true;
                    }
                    else {
                        options.status.fetchResolved = true;
                    }
                }
                if (aborted && !ignoreAbort && !updateCache) {
                    return fetchFail(ac.signal.reason);
                }
                // either we didn't abort, and are still here, or we did, and ignored
                const bf = p;
                if (this.#valList[index] === p) {
                    if (v === undefined) {
                        if (bf.__staleWhileFetching) {
                            this.#valList[index] = bf.__staleWhileFetching;
                        }
                        else {
                            this.#delete(k, 'fetch');
                        }
                    }
                    else {
                        if (options.status)
                            options.status.fetchUpdated = true;
                        this.set(k, v, fetchOpts.options);
                    }
                }
                return v;
            };
            const eb = (er) => {
                if (options.status) {
                    options.status.fetchRejected = true;
                    options.status.fetchError = er;
                }
                return fetchFail(er);
            };
            const fetchFail = (er) => {
                const { aborted } = ac.signal;
                const allowStaleAborted = aborted && options.allowStaleOnFetchAbort;
                const allowStale = allowStaleAborted || options.allowStaleOnFetchRejection;
                const noDelete = allowStale || options.noDeleteOnFetchRejection;
                const bf = p;
                if (this.#valList[index] === p) {
                    // if we allow stale on fetch rejections, then we need to ensure that
                    // the stale value is not removed from the cache when the fetch fails.
                    const del = !noDelete || bf.__staleWhileFetching === undefined;
                    if (del) {
                        this.#delete(k, 'fetch');
                    }
                    else if (!allowStaleAborted) {
                        // still replace the *promise* with the stale value,
                        // since we are done with the promise at this point.
                        // leave it untouched if we're still waiting for an
                        // aborted background fetch that hasn't yet returned.
                        this.#valList[index] = bf.__staleWhileFetching;
                    }
                }
                if (allowStale) {
                    if (options.status && bf.__staleWhileFetching !== undefined) {
                        options.status.returnedStale = true;
                    }
                    return bf.__staleWhileFetching;
                }
                else if (bf.__returned === bf) {
                    throw er;
                }
            };
            const pcall = (res, rej) => {
                const fmp = this.#fetchMethod?.(k, v, fetchOpts);
                if (fmp && fmp instanceof Promise) {
                    fmp.then(v => res(v === undefined ? undefined : v), rej);
                }
                // ignored, we go until we finish, regardless.
                // defer check until we are actually aborting,
                // so fetchMethod can override.
                ac.signal.addEventListener('abort', () => {
                    if (!options.ignoreFetchAbort ||
                        options.allowStaleOnFetchAbort) {
                        res(undefined);
                        // when it eventually resolves, update the cache.
                        if (options.allowStaleOnFetchAbort) {
                            res = v => cb(v, true);
                        }
                    }
                });
            };
            if (options.status)
                options.status.fetchDispatched = true;
            const p = new Promise(pcall).then(cb, eb);
            const bf = Object.assign(p, {
                __abortController: ac,
                __staleWhileFetching: v,
                __returned: undefined,
            });
            if (index === undefined) {
                // internal, don't expose status.
                this.set(k, bf, { ...fetchOpts.options, status: undefined });
                index = this.#keyMap.get(k);
            }
            else {
                this.#valList[index] = bf;
            }
            return bf;
        }
        #isBackgroundFetch(p) {
            if (!this.#hasFetchMethod)
                return false;
            const b = p;
            return (!!b &&
                b instanceof Promise &&
                b.hasOwnProperty('__staleWhileFetching') &&
                b.__abortController instanceof AC);
        }
        async fetch(k, fetchOptions = {}) {
            const { 
            // get options
            allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, 
            // set options
            ttl = this.ttl, noDisposeOnSet = this.noDisposeOnSet, size = 0, sizeCalculation = this.sizeCalculation, noUpdateTTL = this.noUpdateTTL, 
            // fetch exclusive options
            noDeleteOnFetchRejection = this.noDeleteOnFetchRejection, allowStaleOnFetchRejection = this.allowStaleOnFetchRejection, ignoreFetchAbort = this.ignoreFetchAbort, allowStaleOnFetchAbort = this.allowStaleOnFetchAbort, context, forceRefresh = false, status, signal, } = fetchOptions;
            if (!this.#hasFetchMethod) {
                if (status)
                    status.fetch = 'get';
                return this.get(k, {
                    allowStale,
                    updateAgeOnGet,
                    noDeleteOnStaleGet,
                    status,
                });
            }
            const options = {
                allowStale,
                updateAgeOnGet,
                noDeleteOnStaleGet,
                ttl,
                noDisposeOnSet,
                size,
                sizeCalculation,
                noUpdateTTL,
                noDeleteOnFetchRejection,
                allowStaleOnFetchRejection,
                allowStaleOnFetchAbort,
                ignoreFetchAbort,
                status,
                signal,
            };
            let index = this.#keyMap.get(k);
            if (index === undefined) {
                if (status)
                    status.fetch = 'miss';
                const p = this.#backgroundFetch(k, index, options, context);
                return (p.__returned = p);
            }
            else {
                // in cache, maybe already fetching
                const v = this.#valList[index];
                if (this.#isBackgroundFetch(v)) {
                    const stale = allowStale && v.__staleWhileFetching !== undefined;
                    if (status) {
                        status.fetch = 'inflight';
                        if (stale)
                            status.returnedStale = true;
                    }
                    return stale ? v.__staleWhileFetching : (v.__returned = v);
                }
                // if we force a refresh, that means do NOT serve the cached value,
                // unless we are already in the process of refreshing the cache.
                const isStale = this.#isStale(index);
                if (!forceRefresh && !isStale) {
                    if (status)
                        status.fetch = 'hit';
                    this.#moveToTail(index);
                    if (updateAgeOnGet) {
                        this.#updateItemAge(index);
                    }
                    if (status)
                        this.#statusTTL(status, index);
                    return v;
                }
                // ok, it is stale or a forced refresh, and not already fetching.
                // refresh the cache.
                const p = this.#backgroundFetch(k, index, options, context);
                const hasStale = p.__staleWhileFetching !== undefined;
                const staleVal = hasStale && allowStale;
                if (status) {
                    status.fetch = isStale ? 'stale' : 'refresh';
                    if (staleVal && isStale)
                        status.returnedStale = true;
                }
                return staleVal ? p.__staleWhileFetching : (p.__returned = p);
            }
        }
        async forceFetch(k, fetchOptions = {}) {
            const v = await this.fetch(k, fetchOptions);
            if (v === undefined)
                throw new Error('fetch() returned undefined');
            return v;
        }
        memo(k, memoOptions = {}) {
            const memoMethod = this.#memoMethod;
            if (!memoMethod) {
                throw new Error('no memoMethod provided to constructor');
            }
            const { context, forceRefresh, ...options } = memoOptions;
            const v = this.get(k, options);
            if (!forceRefresh && v !== undefined)
                return v;
            const vv = memoMethod(k, v, {
                options,
                context,
            });
            this.set(k, vv, options);
            return vv;
        }
        /**
         * Return a value from the cache. Will update the recency of the cache
         * entry found.
         *
         * If the key is not found, get() will return `undefined`.
         */
        get(k, getOptions = {}) {
            const { allowStale = this.allowStale, updateAgeOnGet = this.updateAgeOnGet, noDeleteOnStaleGet = this.noDeleteOnStaleGet, status, } = getOptions;
            const index = this.#keyMap.get(k);
            if (index !== undefined) {
                const value = this.#valList[index];
                const fetching = this.#isBackgroundFetch(value);
                if (status)
                    this.#statusTTL(status, index);
                if (this.#isStale(index)) {
                    if (status)
                        status.get = 'stale';
                    // delete only if not an in-flight background fetch
                    if (!fetching) {
                        if (!noDeleteOnStaleGet) {
                            this.#delete(k, 'expire');
                        }
                        if (status && allowStale)
                            status.returnedStale = true;
                        return allowStale ? value : undefined;
                    }
                    else {
                        if (status &&
                            allowStale &&
                            value.__staleWhileFetching !== undefined) {
                            status.returnedStale = true;
                        }
                        return allowStale ? value.__staleWhileFetching : undefined;
                    }
                }
                else {
                    if (status)
                        status.get = 'hit';
                    // if we're currently fetching it, we don't actually have it yet
                    // it's not stale, which means this isn't a staleWhileRefetching.
                    // If it's not stale, and fetching, AND has a __staleWhileFetching
                    // value, then that means the user fetched with {forceRefresh:true},
                    // so it's safe to return that value.
                    if (fetching) {
                        return value.__staleWhileFetching;
                    }
                    this.#moveToTail(index);
                    if (updateAgeOnGet) {
                        this.#updateItemAge(index);
                    }
                    return value;
                }
            }
            else if (status) {
                status.get = 'miss';
            }
        }
        #connect(p, n) {
            this.#prev[n] = p;
            this.#next[p] = n;
        }
        #moveToTail(index) {
            // if tail already, nothing to do
            // if head, move head to next[index]
            // else
            //   move next[prev[index]] to next[index] (head has no prev)
            //   move prev[next[index]] to prev[index]
            // prev[index] = tail
            // next[tail] = index
            // tail = index
            if (index !== this.#tail) {
                if (index === this.#head) {
                    this.#head = this.#next[index];
                }
                else {
                    this.#connect(this.#prev[index], this.#next[index]);
                }
                this.#connect(this.#tail, index);
                this.#tail = index;
            }
        }
        /**
         * Deletes a key out of the cache.
         *
         * Returns true if the key was deleted, false otherwise.
         */
        delete(k) {
            return this.#delete(k, 'delete');
        }
        #delete(k, reason) {
            let deleted = false;
            if (this.#size !== 0) {
                const index = this.#keyMap.get(k);
                if (index !== undefined) {
                    deleted = true;
                    if (this.#size === 1) {
                        this.#clear(reason);
                    }
                    else {
                        this.#removeItemSize(index);
                        const v = this.#valList[index];
                        if (this.#isBackgroundFetch(v)) {
                            v.__abortController.abort(new Error('deleted'));
                        }
                        else if (this.#hasDispose || this.#hasDisposeAfter) {
                            if (this.#hasDispose) {
                                this.#dispose?.(v, k, reason);
                            }
                            if (this.#hasDisposeAfter) {
                                this.#disposed?.push([v, k, reason]);
                            }
                        }
                        this.#keyMap.delete(k);
                        this.#keyList[index] = undefined;
                        this.#valList[index] = undefined;
                        if (index === this.#tail) {
                            this.#tail = this.#prev[index];
                        }
                        else if (index === this.#head) {
                            this.#head = this.#next[index];
                        }
                        else {
                            const pi = this.#prev[index];
                            this.#next[pi] = this.#next[index];
                            const ni = this.#next[index];
                            this.#prev[ni] = this.#prev[index];
                        }
                        this.#size--;
                        this.#free.push(index);
                    }
                }
            }
            if (this.#hasDisposeAfter && this.#disposed?.length) {
                const dt = this.#disposed;
                let task;
                while ((task = dt?.shift())) {
                    this.#disposeAfter?.(...task);
                }
            }
            return deleted;
        }
        /**
         * Clear the cache entirely, throwing away all values.
         */
        clear() {
            return this.#clear('delete');
        }
        #clear(reason) {
            for (const index of this.#rindexes({ allowStale: true })) {
                const v = this.#valList[index];
                if (this.#isBackgroundFetch(v)) {
                    v.__abortController.abort(new Error('deleted'));
                }
                else {
                    const k = this.#keyList[index];
                    if (this.#hasDispose) {
                        this.#dispose?.(v, k, reason);
                    }
                    if (this.#hasDisposeAfter) {
                        this.#disposed?.push([v, k, reason]);
                    }
                }
            }
            this.#keyMap.clear();
            this.#valList.fill(undefined);
            this.#keyList.fill(undefined);
            if (this.#ttls && this.#starts) {
                this.#ttls.fill(0);
                this.#starts.fill(0);
            }
            if (this.#sizes) {
                this.#sizes.fill(0);
            }
            this.#head = 0;
            this.#tail = 0;
            this.#free.length = 0;
            this.#calculatedSize = 0;
            this.#size = 0;
            if (this.#hasDisposeAfter && this.#disposed) {
                const dt = this.#disposed;
                let task;
                while ((task = dt?.shift())) {
                    this.#disposeAfter?.(...task);
                }
            }
        }
    }
    exports.LRUCache = LRUCache;
    //# sourceMappingURL=index.js.map
    
    /***/ })
    
    /******/ 	});
    /************************************************************************/
    /******/ 	// The module cache
    /******/ 	var __webpack_module_cache__ = {};
    /******/ 	
    /******/ 	// The require function
    /******/ 	function __nccwpck_require__(moduleId) {
    /******/ 		// Check if module is in cache
    /******/ 		var cachedModule = __webpack_module_cache__[moduleId];
    /******/ 		if (cachedModule !== undefined) {
    /******/ 			return cachedModule.exports;
    /******/ 		}
    /******/ 		// Create a new module (and put it into the cache)
    /******/ 		var module = __webpack_module_cache__[moduleId] = {
    /******/ 			id: moduleId,
    /******/ 			loaded: false,
    /******/ 			exports: {}
    /******/ 		};
    /******/ 	
    /******/ 		// Execute the module function
    /******/ 		var threw = true;
    /******/ 		try {
    /******/ 			__webpack_modules__[moduleId].call(module.exports, module, module.exports, __nccwpck_require__);
    /******/ 			threw = false;
    /******/ 		} finally {
    /******/ 			if(threw) delete __webpack_module_cache__[moduleId];
    /******/ 		}
    /******/ 	
    /******/ 		// Flag the module as loaded
    /******/ 		module.loaded = true;
    /******/ 	
    /******/ 		// Return the exports of the module
    /******/ 		return module.exports;
    /******/ 	}
    /******/ 	
    /************************************************************************/
    /******/ 	/* webpack/runtime/node module decorator */
    /******/ 	(() => {
    /******/ 		__nccwpck_require__.nmd = (module) => {
    /******/ 			module.paths = [];
    /******/ 			if (!module.children) module.children = [];
    /******/ 			return module;
    /******/ 		};
    /******/ 	})();
    /******/ 	
    /******/ 	/* webpack/runtime/compat */
    /******/ 	
    /******/ 	if (typeof __nccwpck_require__ !== 'undefined') __nccwpck_require__.ab = __dirname + "/";
    /******/ 	
    /************************************************************************/
    var __webpack_exports__ = {};
    // This entry need to be wrapped in an IIFE because it need to be in strict mode.
    (() => {
    "use strict";
    var exports = __webpack_exports__;
    
    Object.defineProperty(exports, "__esModule", ({ value: true }));
    const commander_1 = __nccwpck_require__(6476);
    const workspace_detector_1 = __nccwpck_require__(5573);
    const lock_generator_1 = __nccwpck_require__(3584);
    const logger_1 = __nccwpck_require__(9934);
    const program = new commander_1.Command();
    program
        .name('workspace-lock-generator')
        .description('Generate individual package-lock.json files for JavaScript and TypeScript applications using workspaces')
        .version('1.0.0')
        .requiredOption('-p, --path <path>', 'path to the workspace root')
        .option('-v, --verbose', 'enable verbose logging')
        .option('-f, --force', 'force overwrite existing lock files')
        .option('-d, --dev', 'include dev dependencies')
        .option('-s, --skip-private', 'skip private packages')
        .parse(process.argv);
    const options = program.opts();
    async function main() {
        try {
            // Set up logging
            logger_1.logger.setVerbose(options.verbose);
            // Detect workspace configuration
            const detector = new workspace_detector_1.WorkspaceDetector(options.path);
            const config = detector.detectWorkspaceConfig();
            if (config.workspaces.length === 0) {
                logger_1.logger.error('No workspaces found in the project');
                process.exit(1);
            }
            // Generate lock files
            const generator = new lock_generator_1.LockGenerator(options.path, {
                verbose: options.verbose,
                force: options.force,
                includeDevDependencies: options.dev,
                skipPrivate: options.skipPrivate
            });
            const results = await generator.generateWorkspaceLockFiles(config.workspaces);
            // Print summary
            logger_1.logger.info('\nGeneration Summary:');
            const successful = results.filter(r => r.success);
            const failed = results.filter(r => !r.success);
            logger_1.logger.success(`Successfully processed ${successful.length} workspaces`);
            if (failed.length > 0) {
                logger_1.logger.error(`Failed to process ${failed.length} workspaces:`);
                failed.forEach(result => {
                    logger_1.logger.error(`  - ${result.workspacePath}: ${result.error}`);
                });
            }
            // Print dependency resolution summary
            logger_1.logger.info('\nDependency Resolution Summary:');
            results.forEach(result => {
                if (result.success) {
                    const resolved = result.dependencies.filter(d => d.resolved);
                    const unresolved = result.dependencies.filter(d => !d.resolved);
                    logger_1.logger.workspace(`\n${result.workspacePath}:`);
                    logger_1.logger.success(`  Resolved: ${resolved.length} dependencies`);
                    if (unresolved.length > 0) {
                        logger_1.logger.warning(`  Unresolved: ${unresolved.length} dependencies`);
                        unresolved.forEach(dep => {
                            logger_1.logger.warning(`    - ${dep.name}@${dep.version}: ${dep.error}`);
                        });
                    }
                }
            });
        }
        catch (error) {
            const errorMessage = error instanceof Error ? error.message : 'Unknown error';
            logger_1.logger.error(`Fatal error: ${errorMessage}`);
            process.exit(1);
        }
    }
    main();
    
    })();
    
    module.exports = __webpack_exports__;
    /******/ })()
    ;