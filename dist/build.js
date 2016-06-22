!function(e){function r(e,r,o){return 4===arguments.length?t.apply(this,arguments):void n(e,{declarative:!0,deps:r,declare:o})}function t(e,r,t,o){n(e,{declarative:!1,deps:r,executingRequire:t,execute:o})}function n(e,r){r.name=e,e in g||(g[e]=r),r.normalizedDeps=r.deps}function o(e,r){if(r[e.groupIndex]=r[e.groupIndex]||[],-1==m.call(r[e.groupIndex],e)){r[e.groupIndex].push(e);for(var t=0,n=e.normalizedDeps.length;n>t;t++){var a=e.normalizedDeps[t],u=g[a];if(u&&!u.evaluated){var d=e.groupIndex+(u.declarative!=e.declarative);if(void 0===u.groupIndex||u.groupIndex<d){if(void 0!==u.groupIndex&&(r[u.groupIndex].splice(m.call(r[u.groupIndex],u),1),0==r[u.groupIndex].length))throw new TypeError("Mixed dependency cycle detected");u.groupIndex=d}o(u,r)}}}}function a(e){var r=g[e];r.groupIndex=0;var t=[];o(r,t);for(var n=!!r.declarative==t.length%2,a=t.length-1;a>=0;a--){for(var u=t[a],i=0;i<u.length;i++){var s=u[i];n?d(s):l(s)}n=!n}}function u(e){return D[e]||(D[e]={name:e,dependencies:[],exports:{},importers:[]})}function d(r){if(!r.module){var t=r.module=u(r.name),n=r.module.exports,o=r.declare.call(e,function(e,r){if(t.locked=!0,"object"==typeof e)for(var o in e)n[o]=e[o];else n[e]=r;for(var a=0,u=t.importers.length;u>a;a++){var d=t.importers[a];if(!d.locked)for(var i=0;i<d.dependencies.length;++i)d.dependencies[i]===t&&d.setters[i](n)}return t.locked=!1,r},r.name);t.setters=o.setters,t.execute=o.execute;for(var a=0,i=r.normalizedDeps.length;i>a;a++){var l,s=r.normalizedDeps[a],c=g[s],f=D[s];f?l=f.exports:c&&!c.declarative?l=c.esModule:c?(d(c),f=c.module,l=f.exports):l=v(s),f&&f.importers?(f.importers.push(t),t.dependencies.push(f)):t.dependencies.push(null),t.setters[a]&&t.setters[a](l)}}}function i(e){var r,t=g[e];if(t)t.declarative?p(e,[]):t.evaluated||l(t),r=t.module.exports;else if(r=v(e),!r)throw new Error("Unable to load dependency "+e+".");return(!t||t.declarative)&&r&&r.__useDefault?r["default"]:r}function l(r){if(!r.module){var t={},n=r.module={exports:t,id:r.name};if(!r.executingRequire)for(var o=0,a=r.normalizedDeps.length;a>o;o++){var u=r.normalizedDeps[o],d=g[u];d&&l(d)}r.evaluated=!0;var c=r.execute.call(e,function(e){for(var t=0,n=r.deps.length;n>t;t++)if(r.deps[t]==e)return i(r.normalizedDeps[t]);throw new TypeError("Module "+e+" not declared as a dependency.")},t,n);c&&(n.exports=c),t=n.exports,t&&t.__esModule?r.esModule=t:r.esModule=s(t)}}function s(e){var r={};if("object"==typeof e||"function"==typeof e){var t=e&&e.hasOwnProperty;if(h)for(var n in e)f(r,e,n)||c(r,e,n,t);else for(var n in e)c(r,e,n,t)}return r["default"]=e,y(r,"__useDefault",{value:!0}),r}function c(e,r,t,n){(!n||r.hasOwnProperty(t))&&(e[t]=r[t])}function f(e,r,t){try{var n;return(n=Object.getOwnPropertyDescriptor(r,t))&&y(e,t,n),!0}catch(o){return!1}}function p(r,t){var n=g[r];if(n&&!n.evaluated&&n.declarative){t.push(r);for(var o=0,a=n.normalizedDeps.length;a>o;o++){var u=n.normalizedDeps[o];-1==m.call(t,u)&&(g[u]?p(u,t):v(u))}n.evaluated||(n.evaluated=!0,n.module.execute.call(e))}}function v(e){if(I[e])return I[e];if("@node/"==e.substr(0,6))return _(e.substr(6));var r=g[e];if(!r)throw"Module "+e+" not present.";return a(e),p(e,[]),g[e]=void 0,r.declarative&&y(r.module.exports,"__esModule",{value:!0}),I[e]=r.declarative?r.module.exports:r.esModule}var g={},m=Array.prototype.indexOf||function(e){for(var r=0,t=this.length;t>r;r++)if(this[r]===e)return r;return-1},h=!0;try{Object.getOwnPropertyDescriptor({a:0},"a")}catch(x){h=!1}var y;!function(){try{Object.defineProperty({},"a",{})&&(y=Object.defineProperty)}catch(e){y=function(e,r,t){try{e[r]=t.value||t.get.call(e)}catch(n){}}}}();var D={},_="undefined"!=typeof System&&System._nodeRequire||"undefined"!=typeof require&&require.resolve&&"undefined"!=typeof process&&require,I={"@empty":{}};return function(e,n,o){return function(a){a(function(a){for(var u={_nodeRequire:_,register:r,registerDynamic:t,get:v,set:function(e,r){I[e]=r},newModule:function(e){return e}},d=0;d<n.length;d++)(function(e,r){r&&r.__esModule?I[e]=r:I[e]=s(r)})(n[d],arguments[d]);o(u);var i=v(e[0]);if(e.length>1)for(var d=1;d<e.length;d++)v(e[d]);return i.__useDefault?i["default"]:i})}}}("undefined"!=typeof self?self:global)

(["1"], [], function($__System) {
var require = this.require, exports = this.exports, module = this.module;
!function(e){function r(e,r){for(var n=e.split(".");n.length;)r=r[n.shift()];return r}function n(n){if("string"==typeof n)return r(n,e);if(!(n instanceof Array))throw new Error("Global exports must be a string or array.");for(var t={},o=!0,f=0;f<n.length;f++){var i=r(n[f],e);o&&(t["default"]=i,o=!1),t[n[f].split(".").pop()]=i}return t}function t(r){if(Object.keys)Object.keys(e).forEach(r);else for(var n in e)a.call(e,n)&&r(n)}function o(r){t(function(n){if(-1==l.call(s,n)){try{var t=e[n]}catch(o){s.push(n)}r(n,t)}})}var f,i=$__System,a=Object.prototype.hasOwnProperty,l=Array.prototype.indexOf||function(e){for(var r=0,n=this.length;n>r;r++)if(this[r]===e)return r;return-1},s=["_g","sessionStorage","localStorage","clipboardData","frames","frameElement","external","mozAnimationStartTime","webkitStorageInfo","webkitIndexedDB","mozInnerScreenY","mozInnerScreenX"];i.set("@@global-helpers",i.newModule({prepareGlobal:function(r,t,i){var a=e.define;e.define=void 0;var l;if(i){l={};for(var s in i)l[s]=e[s],e[s]=i[s]}return t||(f={},o(function(e,r){f[e]=r})),function(){var r;if(t)r=n(t);else{r={};var i,s;o(function(e,n){f[e]!==n&&"undefined"!=typeof n&&(r[e]=n,"undefined"!=typeof i?s||i===n||(s=!0):i=n)}),r=s?r:i}if(l)for(var u in l)e[u]=l[u];return e.define=a,r}}}))}("undefined"!=typeof self?self:global);
!function(e){function n(e,n){e=e.replace(l,"");var r=e.match(u),t=(r[1].split(",")[n]||"require").replace(s,""),i=p[t]||(p[t]=new RegExp(a+t+f,"g"));i.lastIndex=0;for(var o,c=[];o=i.exec(e);)c.push(o[2]||o[3]);return c}function r(e,n,t,o){if("object"==typeof e&&!(e instanceof Array))return r.apply(null,Array.prototype.splice.call(arguments,1,arguments.length-1));if("string"==typeof e&&"function"==typeof n&&(e=[e]),!(e instanceof Array)){if("string"==typeof e){var l=i.get(e);return l.__useDefault?l["default"]:l}throw new TypeError("Invalid require")}for(var a=[],f=0;f<e.length;f++)a.push(i["import"](e[f],o));Promise.all(a).then(function(e){n&&n.apply(null,e)},t)}function t(t,l,a){"string"!=typeof t&&(a=l,l=t,t=null),l instanceof Array||(a=l,l=["require","exports","module"].splice(0,a.length)),"function"!=typeof a&&(a=function(e){return function(){return e}}(a)),void 0===l[l.length-1]&&l.pop();var f,u,s;-1!=(f=o.call(l,"require"))&&(l.splice(f,1),t||(l=l.concat(n(a.toString(),f)))),-1!=(u=o.call(l,"exports"))&&l.splice(u,1),-1!=(s=o.call(l,"module"))&&l.splice(s,1);var p={name:t,deps:l,execute:function(n,t,o){for(var p=[],c=0;c<l.length;c++)p.push(n(l[c]));o.uri=o.id,o.config=function(){},-1!=s&&p.splice(s,0,o),-1!=u&&p.splice(u,0,t),-1!=f&&p.splice(f,0,function(e,t,l){return"string"==typeof e&&"function"!=typeof t?n(e):r.call(i,e,t,l,o.id)});var d=a.apply(-1==u?e:t,p);return"undefined"==typeof d&&o&&(d=o.exports),"undefined"!=typeof d?d:void 0}};if(t)c.anonDefine||c.isBundle?c.anonDefine&&c.anonDefine.name&&(c.anonDefine=null):c.anonDefine=p,c.isBundle=!0,i.registerDynamic(p.name,p.deps,!1,p.execute);else{if(c.anonDefine&&!c.anonDefine.name)throw new Error("Multiple anonymous defines in module "+t);c.anonDefine=p}}var i=$__System,o=Array.prototype.indexOf||function(e){for(var n=0,r=this.length;r>n;n++)if(this[n]===e)return n;return-1},l=/(\/\*([\s\S]*?)\*\/|([^:]|^)\/\/(.*)$)/gm,a="(?:^|[^$_a-zA-Z\\xA0-\\uFFFF.])",f="\\s*\\(\\s*(\"([^\"]+)\"|'([^']+)')\\s*\\)",u=/\(([^\)]*)\)/,s=/^\s+|\s+$/g,p={};t.amd={};var c={isBundle:!1,anonDefine:null};i.amdDefine=t,i.amdRequire=r}("undefined"!=typeof self?self:global);
$__System.registerDynamic("2", [], false, function($__require, $__exports, $__module) {
  var _retrieveGlobal = $__System.get("@@global-helpers").prepareGlobal($__module.id, null, null);
  (function() {
    (function() {
      var h,
          n = this;
      function p(a) {
        return void 0 !== a;
      }
      function aa() {}
      function ba(a) {
        a.yb = function() {
          return a.zf ? a.zf : a.zf = new a;
        };
      }
      function ca(a) {
        var b = typeof a;
        if ("object" == b)
          if (a) {
            if (a instanceof Array)
              return "array";
            if (a instanceof Object)
              return b;
            var c = Object.prototype.toString.call(a);
            if ("[object Window]" == c)
              return "object";
            if ("[object Array]" == c || "number" == typeof a.length && "undefined" != typeof a.splice && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("splice"))
              return "array";
            if ("[object Function]" == c || "undefined" != typeof a.call && "undefined" != typeof a.propertyIsEnumerable && !a.propertyIsEnumerable("call"))
              return "function";
          } else
            return "null";
        else if ("function" == b && "undefined" == typeof a.call)
          return "object";
        return b;
      }
      function da(a) {
        return "array" == ca(a);
      }
      function ea(a) {
        var b = ca(a);
        return "array" == b || "object" == b && "number" == typeof a.length;
      }
      function q(a) {
        return "string" == typeof a;
      }
      function fa(a) {
        return "number" == typeof a;
      }
      function r(a) {
        return "function" == ca(a);
      }
      function ga(a) {
        var b = typeof a;
        return "object" == b && null != a || "function" == b;
      }
      function ha(a, b, c) {
        return a.call.apply(a.bind, arguments);
      }
      function ia(a, b, c) {
        if (!a)
          throw Error();
        if (2 < arguments.length) {
          var d = Array.prototype.slice.call(arguments, 2);
          return function() {
            var c = Array.prototype.slice.call(arguments);
            Array.prototype.unshift.apply(c, d);
            return a.apply(b, c);
          };
        }
        return function() {
          return a.apply(b, arguments);
        };
      }
      function u(a, b, c) {
        u = Function.prototype.bind && -1 != Function.prototype.bind.toString().indexOf("native code") ? ha : ia;
        return u.apply(null, arguments);
      }
      var ja = Date.now || function() {
        return +new Date;
      };
      function ka(a, b) {
        function c() {}
        c.prototype = b.prototype;
        a.ph = b.prototype;
        a.prototype = new c;
        a.prototype.constructor = a;
        a.lh = function(a, c, f) {
          for (var g = Array(arguments.length - 2),
              k = 2; k < arguments.length; k++)
            g[k - 2] = arguments[k];
          return b.prototype[c].apply(a, g);
        };
      }
      ;
      function la(a) {
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, la);
        else {
          var b = Error().stack;
          b && (this.stack = b);
        }
        a && (this.message = String(a));
      }
      ka(la, Error);
      la.prototype.name = "CustomError";
      function v(a, b) {
        for (var c in a)
          b.call(void 0, a[c], c, a);
      }
      function ma(a, b) {
        var c = {},
            d;
        for (d in a)
          c[d] = b.call(void 0, a[d], d, a);
        return c;
      }
      function na(a, b) {
        for (var c in a)
          if (!b.call(void 0, a[c], c, a))
            return !1;
        return !0;
      }
      function oa(a) {
        var b = 0,
            c;
        for (c in a)
          b++;
        return b;
      }
      function pa(a) {
        for (var b in a)
          return b;
      }
      function qa(a) {
        var b = [],
            c = 0,
            d;
        for (d in a)
          b[c++] = a[d];
        return b;
      }
      function ra(a) {
        var b = [],
            c = 0,
            d;
        for (d in a)
          b[c++] = d;
        return b;
      }
      function sa(a, b) {
        for (var c in a)
          if (a[c] == b)
            return !0;
        return !1;
      }
      function ta(a, b, c) {
        for (var d in a)
          if (b.call(c, a[d], d, a))
            return d;
      }
      function ua(a, b) {
        var c = ta(a, b, void 0);
        return c && a[c];
      }
      function va(a) {
        for (var b in a)
          return !1;
        return !0;
      }
      function wa(a) {
        var b = {},
            c;
        for (c in a)
          b[c] = a[c];
        return b;
      }
      var xa = "constructor hasOwnProperty isPrototypeOf propertyIsEnumerable toLocaleString toString valueOf".split(" ");
      function ya(a, b) {
        for (var c,
            d,
            e = 1; e < arguments.length; e++) {
          d = arguments[e];
          for (c in d)
            a[c] = d[c];
          for (var f = 0; f < xa.length; f++)
            c = xa[f], Object.prototype.hasOwnProperty.call(d, c) && (a[c] = d[c]);
        }
      }
      ;
      function za(a) {
        a = String(a);
        if (/^\s*$/.test(a) ? 0 : /^[\],:{}\s\u2028\u2029]*$/.test(a.replace(/\\["\\\/bfnrtu]/g, "@").replace(/"[^"\\\n\r\u2028\u2029\x00-\x08\x0a-\x1f]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:[\s\u2028\u2029]*\[)+/g, "")))
          try {
            return eval("(" + a + ")");
          } catch (b) {}
        throw Error("Invalid JSON string: " + a);
      }
      function Aa() {
        this.Vd = void 0;
      }
      function Ba(a, b, c) {
        switch (typeof b) {
          case "string":
            Ca(b, c);
            break;
          case "number":
            c.push(isFinite(b) && !isNaN(b) ? b : "null");
            break;
          case "boolean":
            c.push(b);
            break;
          case "undefined":
            c.push("null");
            break;
          case "object":
            if (null == b) {
              c.push("null");
              break;
            }
            if (da(b)) {
              var d = b.length;
              c.push("[");
              for (var e = "",
                  f = 0; f < d; f++)
                c.push(e), e = b[f], Ba(a, a.Vd ? a.Vd.call(b, String(f), e) : e, c), e = ",";
              c.push("]");
              break;
            }
            c.push("{");
            d = "";
            for (f in b)
              Object.prototype.hasOwnProperty.call(b, f) && (e = b[f], "function" != typeof e && (c.push(d), Ca(f, c), c.push(":"), Ba(a, a.Vd ? a.Vd.call(b, f, e) : e, c), d = ","));
            c.push("}");
            break;
          case "function":
            break;
          default:
            throw Error("Unknown type: " + typeof b);
        }
      }
      var Da = {
        '"': '\\"',
        "\\": "\\\\",
        "/": "\\/",
        "\b": "\\b",
        "\f": "\\f",
        "\n": "\\n",
        "\r": "\\r",
        "\t": "\\t",
        "\x0B": "\\u000b"
      },
          Ea = /\uffff/.test("\uffff") ? /[\\\"\x00-\x1f\x7f-\uffff]/g : /[\\\"\x00-\x1f\x7f-\xff]/g;
      function Ca(a, b) {
        b.push('"', a.replace(Ea, function(a) {
          if (a in Da)
            return Da[a];
          var b = a.charCodeAt(0),
              e = "\\u";
          16 > b ? e += "000" : 256 > b ? e += "00" : 4096 > b && (e += "0");
          return Da[a] = e + b.toString(16);
        }), '"');
      }
      ;
      function Fa() {
        return Math.floor(2147483648 * Math.random()).toString(36) + Math.abs(Math.floor(2147483648 * Math.random()) ^ ja()).toString(36);
      }
      ;
      var w;
      a: {
        var Ga = n.navigator;
        if (Ga) {
          var Ha = Ga.userAgent;
          if (Ha) {
            w = Ha;
            break a;
          }
        }
        w = "";
      }
      ;
      function Ia() {
        this.Ya = -1;
      }
      ;
      function Ja() {
        this.Ya = -1;
        this.Ya = 64;
        this.P = [];
        this.pe = [];
        this.eg = [];
        this.Od = [];
        this.Od[0] = 128;
        for (var a = 1; a < this.Ya; ++a)
          this.Od[a] = 0;
        this.ge = this.ec = 0;
        this.reset();
      }
      ka(Ja, Ia);
      Ja.prototype.reset = function() {
        this.P[0] = 1732584193;
        this.P[1] = 4023233417;
        this.P[2] = 2562383102;
        this.P[3] = 271733878;
        this.P[4] = 3285377520;
        this.ge = this.ec = 0;
      };
      function Ka(a, b, c) {
        c || (c = 0);
        var d = a.eg;
        if (q(b))
          for (var e = 0; 16 > e; e++)
            d[e] = b.charCodeAt(c) << 24 | b.charCodeAt(c + 1) << 16 | b.charCodeAt(c + 2) << 8 | b.charCodeAt(c + 3), c += 4;
        else
          for (e = 0; 16 > e; e++)
            d[e] = b[c] << 24 | b[c + 1] << 16 | b[c + 2] << 8 | b[c + 3], c += 4;
        for (e = 16; 80 > e; e++) {
          var f = d[e - 3] ^ d[e - 8] ^ d[e - 14] ^ d[e - 16];
          d[e] = (f << 1 | f >>> 31) & 4294967295;
        }
        b = a.P[0];
        c = a.P[1];
        for (var g = a.P[2],
            k = a.P[3],
            m = a.P[4],
            l,
            e = 0; 80 > e; e++)
          40 > e ? 20 > e ? (f = k ^ c & (g ^ k), l = 1518500249) : (f = c ^ g ^ k, l = 1859775393) : 60 > e ? (f = c & g | k & (c | g), l = 2400959708) : (f = c ^ g ^ k, l = 3395469782), f = (b << 5 | b >>> 27) + f + m + l + d[e] & 4294967295, m = k, k = g, g = (c << 30 | c >>> 2) & 4294967295, c = b, b = f;
        a.P[0] = a.P[0] + b & 4294967295;
        a.P[1] = a.P[1] + c & 4294967295;
        a.P[2] = a.P[2] + g & 4294967295;
        a.P[3] = a.P[3] + k & 4294967295;
        a.P[4] = a.P[4] + m & 4294967295;
      }
      Ja.prototype.update = function(a, b) {
        if (null != a) {
          p(b) || (b = a.length);
          for (var c = b - this.Ya,
              d = 0,
              e = this.pe,
              f = this.ec; d < b; ) {
            if (0 == f)
              for (; d <= c; )
                Ka(this, a, d), d += this.Ya;
            if (q(a))
              for (; d < b; ) {
                if (e[f] = a.charCodeAt(d), ++f, ++d, f == this.Ya) {
                  Ka(this, e);
                  f = 0;
                  break;
                }
              }
            else
              for (; d < b; )
                if (e[f] = a[d], ++f, ++d, f == this.Ya) {
                  Ka(this, e);
                  f = 0;
                  break;
                }
          }
          this.ec = f;
          this.ge += b;
        }
      };
      var x = Array.prototype,
          La = x.indexOf ? function(a, b, c) {
            return x.indexOf.call(a, b, c);
          } : function(a, b, c) {
            c = null == c ? 0 : 0 > c ? Math.max(0, a.length + c) : c;
            if (q(a))
              return q(b) && 1 == b.length ? a.indexOf(b, c) : -1;
            for (; c < a.length; c++)
              if (c in a && a[c] === b)
                return c;
            return -1;
          },
          Ma = x.forEach ? function(a, b, c) {
            x.forEach.call(a, b, c);
          } : function(a, b, c) {
            for (var d = a.length,
                e = q(a) ? a.split("") : a,
                f = 0; f < d; f++)
              f in e && b.call(c, e[f], f, a);
          },
          Na = x.filter ? function(a, b, c) {
            return x.filter.call(a, b, c);
          } : function(a, b, c) {
            for (var d = a.length,
                e = [],
                f = 0,
                g = q(a) ? a.split("") : a,
                k = 0; k < d; k++)
              if (k in g) {
                var m = g[k];
                b.call(c, m, k, a) && (e[f++] = m);
              }
            return e;
          },
          Oa = x.map ? function(a, b, c) {
            return x.map.call(a, b, c);
          } : function(a, b, c) {
            for (var d = a.length,
                e = Array(d),
                f = q(a) ? a.split("") : a,
                g = 0; g < d; g++)
              g in f && (e[g] = b.call(c, f[g], g, a));
            return e;
          },
          Pa = x.reduce ? function(a, b, c, d) {
            for (var e = [],
                f = 1,
                g = arguments.length; f < g; f++)
              e.push(arguments[f]);
            d && (e[0] = u(b, d));
            return x.reduce.apply(a, e);
          } : function(a, b, c, d) {
            var e = c;
            Ma(a, function(c, g) {
              e = b.call(d, e, c, g, a);
            });
            return e;
          },
          Qa = x.every ? function(a, b, c) {
            return x.every.call(a, b, c);
          } : function(a, b, c) {
            for (var d = a.length,
                e = q(a) ? a.split("") : a,
                f = 0; f < d; f++)
              if (f in e && !b.call(c, e[f], f, a))
                return !1;
            return !0;
          };
      function Ra(a, b) {
        var c = Sa(a, b, void 0);
        return 0 > c ? null : q(a) ? a.charAt(c) : a[c];
      }
      function Sa(a, b, c) {
        for (var d = a.length,
            e = q(a) ? a.split("") : a,
            f = 0; f < d; f++)
          if (f in e && b.call(c, e[f], f, a))
            return f;
        return -1;
      }
      function Ta(a, b) {
        var c = La(a, b);
        0 <= c && x.splice.call(a, c, 1);
      }
      function Ua(a, b, c) {
        return 2 >= arguments.length ? x.slice.call(a, b) : x.slice.call(a, b, c);
      }
      function Va(a, b) {
        a.sort(b || Wa);
      }
      function Wa(a, b) {
        return a > b ? 1 : a < b ? -1 : 0;
      }
      ;
      function Xa(a) {
        n.setTimeout(function() {
          throw a;
        }, 0);
      }
      var Ya;
      function Za() {
        var a = n.MessageChannel;
        "undefined" === typeof a && "undefined" !== typeof window && window.postMessage && window.addEventListener && -1 == w.indexOf("Presto") && (a = function() {
          var a = document.createElement("iframe");
          a.style.display = "none";
          a.src = "";
          document.documentElement.appendChild(a);
          var b = a.contentWindow,
              a = b.document;
          a.open();
          a.write("");
          a.close();
          var c = "callImmediate" + Math.random(),
              d = "file:" == b.location.protocol ? "*" : b.location.protocol + "//" + b.location.host,
              a = u(function(a) {
                if (("*" == d || a.origin == d) && a.data == c)
                  this.port1.onmessage();
              }, this);
          b.addEventListener("message", a, !1);
          this.port1 = {};
          this.port2 = {postMessage: function() {
              b.postMessage(c, d);
            }};
        });
        if ("undefined" !== typeof a && -1 == w.indexOf("Trident") && -1 == w.indexOf("MSIE")) {
          var b = new a,
              c = {},
              d = c;
          b.port1.onmessage = function() {
            if (p(c.next)) {
              c = c.next;
              var a = c.hb;
              c.hb = null;
              a();
            }
          };
          return function(a) {
            d.next = {hb: a};
            d = d.next;
            b.port2.postMessage(0);
          };
        }
        return "undefined" !== typeof document && "onreadystatechange" in document.createElement("script") ? function(a) {
          var b = document.createElement("script");
          b.onreadystatechange = function() {
            b.onreadystatechange = null;
            b.parentNode.removeChild(b);
            b = null;
            a();
            a = null;
          };
          document.documentElement.appendChild(b);
        } : function(a) {
          n.setTimeout(a, 0);
        };
      }
      ;
      function $a(a, b) {
        ab || bb();
        cb || (ab(), cb = !0);
        db.push(new eb(a, b));
      }
      var ab;
      function bb() {
        if (n.Promise && n.Promise.resolve) {
          var a = n.Promise.resolve();
          ab = function() {
            a.then(fb);
          };
        } else
          ab = function() {
            var a = fb;
            !r(n.setImmediate) || n.Window && n.Window.prototype && n.Window.prototype.setImmediate == n.setImmediate ? (Ya || (Ya = Za()), Ya(a)) : n.setImmediate(a);
          };
      }
      var cb = !1,
          db = [];
      [].push(function() {
        cb = !1;
        db = [];
      });
      function fb() {
        for (; db.length; ) {
          var a = db;
          db = [];
          for (var b = 0; b < a.length; b++) {
            var c = a[b];
            try {
              c.yg.call(c.scope);
            } catch (d) {
              Xa(d);
            }
          }
        }
        cb = !1;
      }
      function eb(a, b) {
        this.yg = a;
        this.scope = b;
      }
      ;
      var gb = -1 != w.indexOf("Opera") || -1 != w.indexOf("OPR"),
          hb = -1 != w.indexOf("Trident") || -1 != w.indexOf("MSIE"),
          ib = -1 != w.indexOf("Gecko") && -1 == w.toLowerCase().indexOf("webkit") && !(-1 != w.indexOf("Trident") || -1 != w.indexOf("MSIE")),
          jb = -1 != w.toLowerCase().indexOf("webkit");
      (function() {
        var a = "",
            b;
        if (gb && n.opera)
          return a = n.opera.version, r(a) ? a() : a;
        ib ? b = /rv\:([^\);]+)(\)|;)/ : hb ? b = /\b(?:MSIE|rv)[: ]([^\);]+)(\)|;)/ : jb && (b = /WebKit\/(\S+)/);
        b && (a = (a = b.exec(w)) ? a[1] : "");
        return hb && (b = (b = n.document) ? b.documentMode : void 0, b > parseFloat(a)) ? String(b) : a;
      })();
      var kb = null,
          lb = null,
          mb = null;
      function nb(a, b) {
        if (!ea(a))
          throw Error("encodeByteArray takes an array as a parameter");
        ob();
        for (var c = b ? lb : kb,
            d = [],
            e = 0; e < a.length; e += 3) {
          var f = a[e],
              g = e + 1 < a.length,
              k = g ? a[e + 1] : 0,
              m = e + 2 < a.length,
              l = m ? a[e + 2] : 0,
              t = f >> 2,
              f = (f & 3) << 4 | k >> 4,
              k = (k & 15) << 2 | l >> 6,
              l = l & 63;
          m || (l = 64, g || (k = 64));
          d.push(c[t], c[f], c[k], c[l]);
        }
        return d.join("");
      }
      function ob() {
        if (!kb) {
          kb = {};
          lb = {};
          mb = {};
          for (var a = 0; 65 > a; a++)
            kb[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a), lb[a] = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_.".charAt(a), mb[lb[a]] = a, 62 <= a && (mb["ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(a)] = a);
        }
      }
      ;
      function pb(a, b) {
        this.N = qb;
        this.Rf = void 0;
        this.Ba = this.Ha = null;
        this.yd = this.ye = !1;
        if (a == rb)
          sb(this, tb, b);
        else
          try {
            var c = this;
            a.call(b, function(a) {
              sb(c, tb, a);
            }, function(a) {
              if (!(a instanceof ub))
                try {
                  if (a instanceof Error)
                    throw a;
                  throw Error("Promise rejected.");
                } catch (b) {}
              sb(c, vb, a);
            });
          } catch (d) {
            sb(this, vb, d);
          }
      }
      var qb = 0,
          tb = 2,
          vb = 3;
      function rb() {}
      pb.prototype.then = function(a, b, c) {
        return wb(this, r(a) ? a : null, r(b) ? b : null, c);
      };
      pb.prototype.then = pb.prototype.then;
      pb.prototype.$goog_Thenable = !0;
      h = pb.prototype;
      h.gh = function(a, b) {
        return wb(this, null, a, b);
      };
      h.cancel = function(a) {
        this.N == qb && $a(function() {
          var b = new ub(a);
          xb(this, b);
        }, this);
      };
      function xb(a, b) {
        if (a.N == qb)
          if (a.Ha) {
            var c = a.Ha;
            if (c.Ba) {
              for (var d = 0,
                  e = -1,
                  f = 0,
                  g; g = c.Ba[f]; f++)
                if (g = g.o)
                  if (d++, g == a && (e = f), 0 <= e && 1 < d)
                    break;
              0 <= e && (c.N == qb && 1 == d ? xb(c, b) : (d = c.Ba.splice(e, 1)[0], yb(c, d, vb, b)));
            }
            a.Ha = null;
          } else
            sb(a, vb, b);
      }
      function zb(a, b) {
        a.Ba && a.Ba.length || a.N != tb && a.N != vb || Ab(a);
        a.Ba || (a.Ba = []);
        a.Ba.push(b);
      }
      function wb(a, b, c, d) {
        var e = {
          o: null,
          Hf: null,
          Jf: null
        };
        e.o = new pb(function(a, g) {
          e.Hf = b ? function(c) {
            try {
              var e = b.call(d, c);
              a(e);
            } catch (l) {
              g(l);
            }
          } : a;
          e.Jf = c ? function(b) {
            try {
              var e = c.call(d, b);
              !p(e) && b instanceof ub ? g(b) : a(e);
            } catch (l) {
              g(l);
            }
          } : g;
        });
        e.o.Ha = a;
        zb(a, e);
        return e.o;
      }
      h.Yf = function(a) {
        this.N = qb;
        sb(this, tb, a);
      };
      h.Zf = function(a) {
        this.N = qb;
        sb(this, vb, a);
      };
      function sb(a, b, c) {
        if (a.N == qb) {
          if (a == c)
            b = vb, c = new TypeError("Promise cannot resolve to itself");
          else {
            var d;
            if (c)
              try {
                d = !!c.$goog_Thenable;
              } catch (e) {
                d = !1;
              }
            else
              d = !1;
            if (d) {
              a.N = 1;
              c.then(a.Yf, a.Zf, a);
              return;
            }
            if (ga(c))
              try {
                var f = c.then;
                if (r(f)) {
                  Bb(a, c, f);
                  return;
                }
              } catch (g) {
                b = vb, c = g;
              }
          }
          a.Rf = c;
          a.N = b;
          a.Ha = null;
          Ab(a);
          b != vb || c instanceof ub || Cb(a, c);
        }
      }
      function Bb(a, b, c) {
        function d(b) {
          f || (f = !0, a.Zf(b));
        }
        function e(b) {
          f || (f = !0, a.Yf(b));
        }
        a.N = 1;
        var f = !1;
        try {
          c.call(b, e, d);
        } catch (g) {
          d(g);
        }
      }
      function Ab(a) {
        a.ye || (a.ye = !0, $a(a.wg, a));
      }
      h.wg = function() {
        for (; this.Ba && this.Ba.length; ) {
          var a = this.Ba;
          this.Ba = null;
          for (var b = 0; b < a.length; b++)
            yb(this, a[b], this.N, this.Rf);
        }
        this.ye = !1;
      };
      function yb(a, b, c, d) {
        if (c == tb)
          b.Hf(d);
        else {
          if (b.o)
            for (; a && a.yd; a = a.Ha)
              a.yd = !1;
          b.Jf(d);
        }
      }
      function Cb(a, b) {
        a.yd = !0;
        $a(function() {
          a.yd && Db.call(null, b);
        });
      }
      var Db = Xa;
      function ub(a) {
        la.call(this, a);
      }
      ka(ub, la);
      ub.prototype.name = "cancel";
      var Eb = Eb || "2.4.2";
      function y(a, b) {
        return Object.prototype.hasOwnProperty.call(a, b);
      }
      function z(a, b) {
        if (Object.prototype.hasOwnProperty.call(a, b))
          return a[b];
      }
      function Fb(a, b) {
        for (var c in a)
          Object.prototype.hasOwnProperty.call(a, c) && b(c, a[c]);
      }
      function Gb(a) {
        var b = {};
        Fb(a, function(a, d) {
          b[a] = d;
        });
        return b;
      }
      function Hb(a) {
        return "object" === typeof a && null !== a;
      }
      ;
      function Ib(a) {
        var b = [];
        Fb(a, function(a, d) {
          da(d) ? Ma(d, function(d) {
            b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d));
          }) : b.push(encodeURIComponent(a) + "=" + encodeURIComponent(d));
        });
        return b.length ? "&" + b.join("&") : "";
      }
      function Jb(a) {
        var b = {};
        a = a.replace(/^\?/, "").split("&");
        Ma(a, function(a) {
          a && (a = a.split("="), b[a[0]] = a[1]);
        });
        return b;
      }
      ;
      function Kb(a, b) {
        if (!a)
          throw Lb(b);
      }
      function Lb(a) {
        return Error("Firebase (" + Eb + ") INTERNAL ASSERT FAILED: " + a);
      }
      ;
      var Mb = n.Promise || pb;
      pb.prototype["catch"] = pb.prototype.gh;
      function B() {
        var a = this;
        this.reject = this.resolve = null;
        this.D = new Mb(function(b, c) {
          a.resolve = b;
          a.reject = c;
        });
      }
      function C(a, b) {
        return function(c, d) {
          c ? a.reject(c) : a.resolve(d);
          r(b) && (Nb(a.D), 1 === b.length ? b(c) : b(c, d));
        };
      }
      function Nb(a) {
        a.then(void 0, aa);
      }
      ;
      function Ob(a) {
        for (var b = [],
            c = 0,
            d = 0; d < a.length; d++) {
          var e = a.charCodeAt(d);
          55296 <= e && 56319 >= e && (e -= 55296, d++, Kb(d < a.length, "Surrogate pair missing trail surrogate."), e = 65536 + (e << 10) + (a.charCodeAt(d) - 56320));
          128 > e ? b[c++] = e : (2048 > e ? b[c++] = e >> 6 | 192 : (65536 > e ? b[c++] = e >> 12 | 224 : (b[c++] = e >> 18 | 240, b[c++] = e >> 12 & 63 | 128), b[c++] = e >> 6 & 63 | 128), b[c++] = e & 63 | 128);
        }
        return b;
      }
      function Pb(a) {
        for (var b = 0,
            c = 0; c < a.length; c++) {
          var d = a.charCodeAt(c);
          128 > d ? b++ : 2048 > d ? b += 2 : 55296 <= d && 56319 >= d ? (b += 4, c++) : b += 3;
        }
        return b;
      }
      ;
      function D(a, b, c, d) {
        var e;
        d < b ? e = "at least " + b : d > c && (e = 0 === c ? "none" : "no more than " + c);
        if (e)
          throw Error(a + " failed: Was called with " + d + (1 === d ? " argument." : " arguments.") + " Expects " + e + ".");
      }
      function E(a, b, c) {
        var d = "";
        switch (b) {
          case 1:
            d = c ? "first" : "First";
            break;
          case 2:
            d = c ? "second" : "Second";
            break;
          case 3:
            d = c ? "third" : "Third";
            break;
          case 4:
            d = c ? "fourth" : "Fourth";
            break;
          default:
            throw Error("errorPrefix called with argumentNumber > 4.  Need to update it?");
        }
        return a = a + " failed: " + (d + " argument ");
      }
      function F(a, b, c, d) {
        if ((!d || p(c)) && !r(c))
          throw Error(E(a, b, d) + "must be a valid function.");
      }
      function Qb(a, b, c) {
        if (p(c) && (!ga(c) || null === c))
          throw Error(E(a, b, !0) + "must be a valid context object.");
      }
      ;
      function Rb(a) {
        return "undefined" !== typeof JSON && p(JSON.parse) ? JSON.parse(a) : za(a);
      }
      function G(a) {
        if ("undefined" !== typeof JSON && p(JSON.stringify))
          a = JSON.stringify(a);
        else {
          var b = [];
          Ba(new Aa, a, b);
          a = b.join("");
        }
        return a;
      }
      ;
      function Sb() {
        this.Zd = H;
      }
      Sb.prototype.j = function(a) {
        return this.Zd.S(a);
      };
      Sb.prototype.toString = function() {
        return this.Zd.toString();
      };
      function Tb() {}
      Tb.prototype.uf = function() {
        return null;
      };
      Tb.prototype.Ce = function() {
        return null;
      };
      var Ub = new Tb;
      function Vb(a, b, c) {
        this.bg = a;
        this.Oa = b;
        this.Nd = c;
      }
      Vb.prototype.uf = function(a) {
        var b = this.Oa.Q;
        if (Wb(b, a))
          return b.j().T(a);
        b = null != this.Nd ? new Xb(this.Nd, !0, !1) : this.Oa.w();
        return this.bg.Bc(a, b);
      };
      Vb.prototype.Ce = function(a, b, c) {
        var d = null != this.Nd ? this.Nd : Yb(this.Oa);
        a = this.bg.qe(d, b, 1, c, a);
        return 0 === a.length ? null : a[0];
      };
      function Zb() {
        this.xb = [];
      }
      function $b(a, b) {
        for (var c = null,
            d = 0; d < b.length; d++) {
          var e = b[d],
              f = e.cc();
          null === c || f.ea(c.cc()) || (a.xb.push(c), c = null);
          null === c && (c = new ac(f));
          c.add(e);
        }
        c && a.xb.push(c);
      }
      function bc(a, b, c) {
        $b(a, c);
        cc(a, function(a) {
          return a.ea(b);
        });
      }
      function dc(a, b, c) {
        $b(a, c);
        cc(a, function(a) {
          return a.contains(b) || b.contains(a);
        });
      }
      function cc(a, b) {
        for (var c = !0,
            d = 0; d < a.xb.length; d++) {
          var e = a.xb[d];
          if (e)
            if (e = e.cc(), b(e)) {
              for (var e = a.xb[d],
                  f = 0; f < e.xd.length; f++) {
                var g = e.xd[f];
                if (null !== g) {
                  e.xd[f] = null;
                  var k = g.Zb();
                  ec && fc("event: " + g.toString());
                  gc(k);
                }
              }
              a.xb[d] = null;
            } else
              c = !1;
        }
        c && (a.xb = []);
      }
      function ac(a) {
        this.ta = a;
        this.xd = [];
      }
      ac.prototype.add = function(a) {
        this.xd.push(a);
      };
      ac.prototype.cc = function() {
        return this.ta;
      };
      function J(a, b, c, d) {
        this.type = a;
        this.Na = b;
        this.Za = c;
        this.Oe = d;
        this.Td = void 0;
      }
      function hc(a) {
        return new J(ic, a);
      }
      var ic = "value";
      function jc(a, b, c, d) {
        this.xe = b;
        this.be = c;
        this.Td = d;
        this.wd = a;
      }
      jc.prototype.cc = function() {
        var a = this.be.Mb();
        return "value" === this.wd ? a.path : a.parent().path;
      };
      jc.prototype.De = function() {
        return this.wd;
      };
      jc.prototype.Zb = function() {
        return this.xe.Zb(this);
      };
      jc.prototype.toString = function() {
        return this.cc().toString() + ":" + this.wd + ":" + G(this.be.qf());
      };
      function kc(a, b, c) {
        this.xe = a;
        this.error = b;
        this.path = c;
      }
      kc.prototype.cc = function() {
        return this.path;
      };
      kc.prototype.De = function() {
        return "cancel";
      };
      kc.prototype.Zb = function() {
        return this.xe.Zb(this);
      };
      kc.prototype.toString = function() {
        return this.path.toString() + ":cancel";
      };
      function Xb(a, b, c) {
        this.A = a;
        this.ga = b;
        this.Yb = c;
      }
      function lc(a) {
        return a.ga;
      }
      function mc(a) {
        return a.Yb;
      }
      function nc(a, b) {
        return b.e() ? a.ga && !a.Yb : Wb(a, K(b));
      }
      function Wb(a, b) {
        return a.ga && !a.Yb || a.A.Fa(b);
      }
      Xb.prototype.j = function() {
        return this.A;
      };
      function oc(a) {
        this.pg = a;
        this.Gd = null;
      }
      oc.prototype.get = function() {
        var a = this.pg.get(),
            b = wa(a);
        if (this.Gd)
          for (var c in this.Gd)
            b[c] -= this.Gd[c];
        this.Gd = a;
        return b;
      };
      function pc(a, b) {
        this.Vf = {};
        this.hd = new oc(a);
        this.da = b;
        var c = 1E4 + 2E4 * Math.random();
        setTimeout(u(this.Of, this), Math.floor(c));
      }
      pc.prototype.Of = function() {
        var a = this.hd.get(),
            b = {},
            c = !1,
            d;
        for (d in a)
          0 < a[d] && y(this.Vf, d) && (b[d] = a[d], c = !0);
        c && this.da.Ye(b);
        setTimeout(u(this.Of, this), Math.floor(6E5 * Math.random()));
      };
      function qc() {
        this.Hc = {};
      }
      function rc(a, b, c) {
        p(c) || (c = 1);
        y(a.Hc, b) || (a.Hc[b] = 0);
        a.Hc[b] += c;
      }
      qc.prototype.get = function() {
        return wa(this.Hc);
      };
      var sc = {},
          tc = {};
      function uc(a) {
        a = a.toString();
        sc[a] || (sc[a] = new qc);
        return sc[a];
      }
      function vc(a, b) {
        var c = a.toString();
        tc[c] || (tc[c] = b());
        return tc[c];
      }
      ;
      function L(a, b) {
        this.name = a;
        this.U = b;
      }
      function wc(a, b) {
        return new L(a, b);
      }
      ;
      function xc(a, b) {
        return yc(a.name, b.name);
      }
      function zc(a, b) {
        return yc(a, b);
      }
      ;
      function Ac(a, b, c) {
        this.type = Bc;
        this.source = a;
        this.path = b;
        this.Ja = c;
      }
      Ac.prototype.$c = function(a) {
        return this.path.e() ? new Ac(this.source, M, this.Ja.T(a)) : new Ac(this.source, N(this.path), this.Ja);
      };
      Ac.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " overwrite: " + this.Ja.toString() + ")";
      };
      function Cc(a, b) {
        this.type = Dc;
        this.source = a;
        this.path = b;
      }
      Cc.prototype.$c = function() {
        return this.path.e() ? new Cc(this.source, M) : new Cc(this.source, N(this.path));
      };
      Cc.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " listen_complete)";
      };
      function Ec(a, b) {
        this.Pa = a;
        this.xa = b ? b : Fc;
      }
      h = Ec.prototype;
      h.Sa = function(a, b) {
        return new Ec(this.Pa, this.xa.Sa(a, b, this.Pa).$(null, null, !1, null, null));
      };
      h.remove = function(a) {
        return new Ec(this.Pa, this.xa.remove(a, this.Pa).$(null, null, !1, null, null));
      };
      h.get = function(a) {
        for (var b,
            c = this.xa; !c.e(); ) {
          b = this.Pa(a, c.key);
          if (0 === b)
            return c.value;
          0 > b ? c = c.left : 0 < b && (c = c.right);
        }
        return null;
      };
      function Gc(a, b) {
        for (var c,
            d = a.xa,
            e = null; !d.e(); ) {
          c = a.Pa(b, d.key);
          if (0 === c) {
            if (d.left.e())
              return e ? e.key : null;
            for (d = d.left; !d.right.e(); )
              d = d.right;
            return d.key;
          }
          0 > c ? d = d.left : 0 < c && (e = d, d = d.right);
        }
        throw Error("Attempted to find predecessor key for a nonexistent key.  What gives?");
      }
      h.e = function() {
        return this.xa.e();
      };
      h.count = function() {
        return this.xa.count();
      };
      h.Vc = function() {
        return this.xa.Vc();
      };
      h.jc = function() {
        return this.xa.jc();
      };
      h.ka = function(a) {
        return this.xa.ka(a);
      };
      h.ac = function(a) {
        return new Hc(this.xa, null, this.Pa, !1, a);
      };
      h.bc = function(a, b) {
        return new Hc(this.xa, a, this.Pa, !1, b);
      };
      h.dc = function(a, b) {
        return new Hc(this.xa, a, this.Pa, !0, b);
      };
      h.xf = function(a) {
        return new Hc(this.xa, null, this.Pa, !0, a);
      };
      function Hc(a, b, c, d, e) {
        this.Xd = e || null;
        this.Je = d;
        this.Ta = [];
        for (e = 1; !a.e(); )
          if (e = b ? c(a.key, b) : 1, d && (e *= -1), 0 > e)
            a = this.Je ? a.left : a.right;
          else if (0 === e) {
            this.Ta.push(a);
            break;
          } else
            this.Ta.push(a), a = this.Je ? a.right : a.left;
      }
      function Ic(a) {
        if (0 === a.Ta.length)
          return null;
        var b = a.Ta.pop(),
            c;
        c = a.Xd ? a.Xd(b.key, b.value) : {
          key: b.key,
          value: b.value
        };
        if (a.Je)
          for (b = b.left; !b.e(); )
            a.Ta.push(b), b = b.right;
        else
          for (b = b.right; !b.e(); )
            a.Ta.push(b), b = b.left;
        return c;
      }
      function Jc(a) {
        if (0 === a.Ta.length)
          return null;
        var b;
        b = a.Ta;
        b = b[b.length - 1];
        return a.Xd ? a.Xd(b.key, b.value) : {
          key: b.key,
          value: b.value
        };
      }
      function Kc(a, b, c, d, e) {
        this.key = a;
        this.value = b;
        this.color = null != c ? c : !0;
        this.left = null != d ? d : Fc;
        this.right = null != e ? e : Fc;
      }
      h = Kc.prototype;
      h.$ = function(a, b, c, d, e) {
        return new Kc(null != a ? a : this.key, null != b ? b : this.value, null != c ? c : this.color, null != d ? d : this.left, null != e ? e : this.right);
      };
      h.count = function() {
        return this.left.count() + 1 + this.right.count();
      };
      h.e = function() {
        return !1;
      };
      h.ka = function(a) {
        return this.left.ka(a) || a(this.key, this.value) || this.right.ka(a);
      };
      function Lc(a) {
        return a.left.e() ? a : Lc(a.left);
      }
      h.Vc = function() {
        return Lc(this).key;
      };
      h.jc = function() {
        return this.right.e() ? this.key : this.right.jc();
      };
      h.Sa = function(a, b, c) {
        var d,
            e;
        e = this;
        d = c(a, e.key);
        e = 0 > d ? e.$(null, null, null, e.left.Sa(a, b, c), null) : 0 === d ? e.$(null, b, null, null, null) : e.$(null, null, null, null, e.right.Sa(a, b, c));
        return Mc(e);
      };
      function Nc(a) {
        if (a.left.e())
          return Fc;
        a.left.ha() || a.left.left.ha() || (a = Oc(a));
        a = a.$(null, null, null, Nc(a.left), null);
        return Mc(a);
      }
      h.remove = function(a, b) {
        var c,
            d;
        c = this;
        if (0 > b(a, c.key))
          c.left.e() || c.left.ha() || c.left.left.ha() || (c = Oc(c)), c = c.$(null, null, null, c.left.remove(a, b), null);
        else {
          c.left.ha() && (c = Pc(c));
          c.right.e() || c.right.ha() || c.right.left.ha() || (c = Qc(c), c.left.left.ha() && (c = Pc(c), c = Qc(c)));
          if (0 === b(a, c.key)) {
            if (c.right.e())
              return Fc;
            d = Lc(c.right);
            c = c.$(d.key, d.value, null, null, Nc(c.right));
          }
          c = c.$(null, null, null, null, c.right.remove(a, b));
        }
        return Mc(c);
      };
      h.ha = function() {
        return this.color;
      };
      function Mc(a) {
        a.right.ha() && !a.left.ha() && (a = Rc(a));
        a.left.ha() && a.left.left.ha() && (a = Pc(a));
        a.left.ha() && a.right.ha() && (a = Qc(a));
        return a;
      }
      function Oc(a) {
        a = Qc(a);
        a.right.left.ha() && (a = a.$(null, null, null, null, Pc(a.right)), a = Rc(a), a = Qc(a));
        return a;
      }
      function Rc(a) {
        return a.right.$(null, null, a.color, a.$(null, null, !0, null, a.right.left), null);
      }
      function Pc(a) {
        return a.left.$(null, null, a.color, null, a.$(null, null, !0, a.left.right, null));
      }
      function Qc(a) {
        return a.$(null, null, !a.color, a.left.$(null, null, !a.left.color, null, null), a.right.$(null, null, !a.right.color, null, null));
      }
      function Sc() {}
      h = Sc.prototype;
      h.$ = function() {
        return this;
      };
      h.Sa = function(a, b) {
        return new Kc(a, b, null);
      };
      h.remove = function() {
        return this;
      };
      h.count = function() {
        return 0;
      };
      h.e = function() {
        return !0;
      };
      h.ka = function() {
        return !1;
      };
      h.Vc = function() {
        return null;
      };
      h.jc = function() {
        return null;
      };
      h.ha = function() {
        return !1;
      };
      var Fc = new Sc;
      function Tc(a, b) {
        return a && "object" === typeof a ? (O(".sv" in a, "Unexpected leaf node or priority contents"), b[a[".sv"]]) : a;
      }
      function Uc(a, b) {
        var c = new Vc;
        Wc(a, new P(""), function(a, e) {
          c.rc(a, Xc(e, b));
        });
        return c;
      }
      function Xc(a, b) {
        var c = a.C().J(),
            c = Tc(c, b),
            d;
        if (a.L()) {
          var e = Tc(a.Ea(), b);
          return e !== a.Ea() || c !== a.C().J() ? new Yc(e, Q(c)) : a;
        }
        d = a;
        c !== a.C().J() && (d = d.ia(new Yc(c)));
        a.R(R, function(a, c) {
          var e = Xc(c, b);
          e !== c && (d = d.W(a, e));
        });
        return d;
      }
      ;
      function Zc() {
        this.Ac = {};
      }
      Zc.prototype.set = function(a, b) {
        null == b ? delete this.Ac[a] : this.Ac[a] = b;
      };
      Zc.prototype.get = function(a) {
        return y(this.Ac, a) ? this.Ac[a] : null;
      };
      Zc.prototype.remove = function(a) {
        delete this.Ac[a];
      };
      Zc.prototype.Af = !0;
      function $c(a) {
        this.Ic = a;
        this.Sd = "firebase:";
      }
      h = $c.prototype;
      h.set = function(a, b) {
        null == b ? this.Ic.removeItem(this.Sd + a) : this.Ic.setItem(this.Sd + a, G(b));
      };
      h.get = function(a) {
        a = this.Ic.getItem(this.Sd + a);
        return null == a ? null : Rb(a);
      };
      h.remove = function(a) {
        this.Ic.removeItem(this.Sd + a);
      };
      h.Af = !1;
      h.toString = function() {
        return this.Ic.toString();
      };
      function ad(a) {
        try {
          if ("undefined" !== typeof window && "undefined" !== typeof window[a]) {
            var b = window[a];
            b.setItem("firebase:sentinel", "cache");
            b.removeItem("firebase:sentinel");
            return new $c(b);
          }
        } catch (c) {}
        return new Zc;
      }
      var bd = ad("localStorage"),
          cd = ad("sessionStorage");
      function dd(a, b, c, d, e) {
        this.host = a.toLowerCase();
        this.domain = this.host.substr(this.host.indexOf(".") + 1);
        this.ob = b;
        this.lc = c;
        this.jh = d;
        this.Rd = e || "";
        this.ab = bd.get("host:" + a) || this.host;
      }
      function ed(a, b) {
        b !== a.ab && (a.ab = b, "s-" === a.ab.substr(0, 2) && bd.set("host:" + a.host, a.ab));
      }
      function fd(a, b, c) {
        O("string" === typeof b, "typeof type must == string");
        O("object" === typeof c, "typeof params must == object");
        if (b === gd)
          b = (a.ob ? "wss://" : "ws://") + a.ab + "/.ws?";
        else if (b === hd)
          b = (a.ob ? "https://" : "http://") + a.ab + "/.lp?";
        else
          throw Error("Unknown connection type: " + b);
        a.host !== a.ab && (c.ns = a.lc);
        var d = [];
        v(c, function(a, b) {
          d.push(b + "=" + a);
        });
        return b + d.join("&");
      }
      dd.prototype.toString = function() {
        var a = (this.ob ? "https://" : "http://") + this.host;
        this.Rd && (a += "<" + this.Rd + ">");
        return a;
      };
      var id = function() {
        var a = 1;
        return function() {
          return a++;
        };
      }(),
          O = Kb,
          jd = Lb;
      function kd(a) {
        try {
          var b;
          if ("undefined" !== typeof atob)
            b = atob(a);
          else {
            ob();
            for (var c = mb,
                d = [],
                e = 0; e < a.length; ) {
              var f = c[a.charAt(e++)],
                  g = e < a.length ? c[a.charAt(e)] : 0;
              ++e;
              var k = e < a.length ? c[a.charAt(e)] : 64;
              ++e;
              var m = e < a.length ? c[a.charAt(e)] : 64;
              ++e;
              if (null == f || null == g || null == k || null == m)
                throw Error();
              d.push(f << 2 | g >> 4);
              64 != k && (d.push(g << 4 & 240 | k >> 2), 64 != m && d.push(k << 6 & 192 | m));
            }
            if (8192 > d.length)
              b = String.fromCharCode.apply(null, d);
            else {
              a = "";
              for (c = 0; c < d.length; c += 8192)
                a += String.fromCharCode.apply(null, Ua(d, c, c + 8192));
              b = a;
            }
          }
          return b;
        } catch (l) {
          fc("base64Decode failed: ", l);
        }
        return null;
      }
      function ld(a) {
        var b = Ob(a);
        a = new Ja;
        a.update(b);
        var b = [],
            c = 8 * a.ge;
        56 > a.ec ? a.update(a.Od, 56 - a.ec) : a.update(a.Od, a.Ya - (a.ec - 56));
        for (var d = a.Ya - 1; 56 <= d; d--)
          a.pe[d] = c & 255, c /= 256;
        Ka(a, a.pe);
        for (d = c = 0; 5 > d; d++)
          for (var e = 24; 0 <= e; e -= 8)
            b[c] = a.P[d] >> e & 255, ++c;
        return nb(b);
      }
      function md(a) {
        for (var b = "",
            c = 0; c < arguments.length; c++)
          b = ea(arguments[c]) ? b + md.apply(null, arguments[c]) : "object" === typeof arguments[c] ? b + G(arguments[c]) : b + arguments[c], b += " ";
        return b;
      }
      var ec = null,
          nd = !0;
      function od(a, b) {
        Kb(!b || !0 === a || !1 === a, "Can't turn on custom loggers persistently.");
        !0 === a ? ("undefined" !== typeof console && ("function" === typeof console.log ? ec = u(console.log, console) : "object" === typeof console.log && (ec = function(a) {
          console.log(a);
        })), b && cd.set("logging_enabled", !0)) : r(a) ? ec = a : (ec = null, cd.remove("logging_enabled"));
      }
      function fc(a) {
        !0 === nd && (nd = !1, null === ec && !0 === cd.get("logging_enabled") && od(!0));
        if (ec) {
          var b = md.apply(null, arguments);
          ec(b);
        }
      }
      function pd(a) {
        return function() {
          fc(a, arguments);
        };
      }
      function qd(a) {
        if ("undefined" !== typeof console) {
          var b = "FIREBASE INTERNAL ERROR: " + md.apply(null, arguments);
          "undefined" !== typeof console.error ? console.error(b) : console.log(b);
        }
      }
      function rd(a) {
        var b = md.apply(null, arguments);
        throw Error("FIREBASE FATAL ERROR: " + b);
      }
      function S(a) {
        if ("undefined" !== typeof console) {
          var b = "FIREBASE WARNING: " + md.apply(null, arguments);
          "undefined" !== typeof console.warn ? console.warn(b) : console.log(b);
        }
      }
      function sd(a) {
        var b = "",
            c = "",
            d = "",
            e = "",
            f = !0,
            g = "https",
            k = 443;
        if (q(a)) {
          var m = a.indexOf("//");
          0 <= m && (g = a.substring(0, m - 1), a = a.substring(m + 2));
          m = a.indexOf("/");
          -1 === m && (m = a.length);
          b = a.substring(0, m);
          e = "";
          a = a.substring(m).split("/");
          for (m = 0; m < a.length; m++)
            if (0 < a[m].length) {
              var l = a[m];
              try {
                l = decodeURIComponent(l.replace(/\+/g, " "));
              } catch (t) {}
              e += "/" + l;
            }
          a = b.split(".");
          3 === a.length ? (c = a[1], d = a[0].toLowerCase()) : 2 === a.length && (c = a[0]);
          m = b.indexOf(":");
          0 <= m && (f = "https" === g || "wss" === g, k = b.substring(m + 1), isFinite(k) && (k = String(k)), k = q(k) ? /^\s*-?0x/i.test(k) ? parseInt(k, 16) : parseInt(k, 10) : NaN);
        }
        return {
          host: b,
          port: k,
          domain: c,
          fh: d,
          ob: f,
          scheme: g,
          bd: e
        };
      }
      function td(a) {
        return fa(a) && (a != a || a == Number.POSITIVE_INFINITY || a == Number.NEGATIVE_INFINITY);
      }
      function ud(a) {
        if ("complete" === document.readyState)
          a();
        else {
          var b = !1,
              c = function() {
                document.body ? b || (b = !0, a()) : setTimeout(c, Math.floor(10));
              };
          document.addEventListener ? (document.addEventListener("DOMContentLoaded", c, !1), window.addEventListener("load", c, !1)) : document.attachEvent && (document.attachEvent("onreadystatechange", function() {
            "complete" === document.readyState && c();
          }), window.attachEvent("onload", c));
        }
      }
      function yc(a, b) {
        if (a === b)
          return 0;
        if ("[MIN_NAME]" === a || "[MAX_NAME]" === b)
          return -1;
        if ("[MIN_NAME]" === b || "[MAX_NAME]" === a)
          return 1;
        var c = vd(a),
            d = vd(b);
        return null !== c ? null !== d ? 0 == c - d ? a.length - b.length : c - d : -1 : null !== d ? 1 : a < b ? -1 : 1;
      }
      function wd(a, b) {
        if (b && a in b)
          return b[a];
        throw Error("Missing required key (" + a + ") in object: " + G(b));
      }
      function xd(a) {
        if ("object" !== typeof a || null === a)
          return G(a);
        var b = [],
            c;
        for (c in a)
          b.push(c);
        b.sort();
        c = "{";
        for (var d = 0; d < b.length; d++)
          0 !== d && (c += ","), c += G(b[d]), c += ":", c += xd(a[b[d]]);
        return c + "}";
      }
      function yd(a, b) {
        if (a.length <= b)
          return [a];
        for (var c = [],
            d = 0; d < a.length; d += b)
          d + b > a ? c.push(a.substring(d, a.length)) : c.push(a.substring(d, d + b));
        return c;
      }
      function zd(a, b) {
        if (da(a))
          for (var c = 0; c < a.length; ++c)
            b(c, a[c]);
        else
          v(a, b);
      }
      function Ad(a) {
        O(!td(a), "Invalid JSON number");
        var b,
            c,
            d,
            e;
        0 === a ? (d = c = 0, b = -Infinity === 1 / a ? 1 : 0) : (b = 0 > a, a = Math.abs(a), a >= Math.pow(2, -1022) ? (d = Math.min(Math.floor(Math.log(a) / Math.LN2), 1023), c = d + 1023, d = Math.round(a * Math.pow(2, 52 - d) - Math.pow(2, 52))) : (c = 0, d = Math.round(a / Math.pow(2, -1074))));
        e = [];
        for (a = 52; a; --a)
          e.push(d % 2 ? 1 : 0), d = Math.floor(d / 2);
        for (a = 11; a; --a)
          e.push(c % 2 ? 1 : 0), c = Math.floor(c / 2);
        e.push(b ? 1 : 0);
        e.reverse();
        b = e.join("");
        c = "";
        for (a = 0; 64 > a; a += 8)
          d = parseInt(b.substr(a, 8), 2).toString(16), 1 === d.length && (d = "0" + d), c += d;
        return c.toLowerCase();
      }
      var Bd = /^-?\d{1,10}$/;
      function vd(a) {
        return Bd.test(a) && (a = Number(a), -2147483648 <= a && 2147483647 >= a) ? a : null;
      }
      function gc(a) {
        try {
          a();
        } catch (b) {
          setTimeout(function() {
            S("Exception was thrown by user callback.", b.stack || "");
            throw b;
          }, Math.floor(0));
        }
      }
      function T(a, b) {
        if (r(a)) {
          var c = Array.prototype.slice.call(arguments, 1).slice();
          gc(function() {
            a.apply(null, c);
          });
        }
      }
      ;
      function Cd(a) {
        var b = {},
            c = {},
            d = {},
            e = "";
        try {
          var f = a.split("."),
              b = Rb(kd(f[0]) || ""),
              c = Rb(kd(f[1]) || ""),
              e = f[2],
              d = c.d || {};
          delete c.d;
        } catch (g) {}
        return {
          mh: b,
          Ec: c,
          data: d,
          bh: e
        };
      }
      function Dd(a) {
        a = Cd(a).Ec;
        return "object" === typeof a && a.hasOwnProperty("iat") ? z(a, "iat") : null;
      }
      function Ed(a) {
        a = Cd(a);
        var b = a.Ec;
        return !!a.bh && !!b && "object" === typeof b && b.hasOwnProperty("iat");
      }
      ;
      function Fd(a) {
        this.Y = a;
        this.g = a.n.g;
      }
      function Gd(a, b, c, d) {
        var e = [],
            f = [];
        Ma(b, function(b) {
          "child_changed" === b.type && a.g.Dd(b.Oe, b.Na) && f.push(new J("child_moved", b.Na, b.Za));
        });
        Hd(a, e, "child_removed", b, d, c);
        Hd(a, e, "child_added", b, d, c);
        Hd(a, e, "child_moved", f, d, c);
        Hd(a, e, "child_changed", b, d, c);
        Hd(a, e, ic, b, d, c);
        return e;
      }
      function Hd(a, b, c, d, e, f) {
        d = Na(d, function(a) {
          return a.type === c;
        });
        Va(d, u(a.qg, a));
        Ma(d, function(c) {
          var d = Id(a, c, f);
          Ma(e, function(e) {
            e.Qf(c.type) && b.push(e.createEvent(d, a.Y));
          });
        });
      }
      function Id(a, b, c) {
        "value" !== b.type && "child_removed" !== b.type && (b.Td = c.wf(b.Za, b.Na, a.g));
        return b;
      }
      Fd.prototype.qg = function(a, b) {
        if (null == a.Za || null == b.Za)
          throw jd("Should only compare child_ events.");
        return this.g.compare(new L(a.Za, a.Na), new L(b.Za, b.Na));
      };
      function Jd() {
        this.ib = {};
      }
      function Kd(a, b) {
        var c = b.type,
            d = b.Za;
        O("child_added" == c || "child_changed" == c || "child_removed" == c, "Only child changes supported for tracking");
        O(".priority" !== d, "Only non-priority child changes can be tracked.");
        var e = z(a.ib, d);
        if (e) {
          var f = e.type;
          if ("child_added" == c && "child_removed" == f)
            a.ib[d] = new J("child_changed", b.Na, d, e.Na);
          else if ("child_removed" == c && "child_added" == f)
            delete a.ib[d];
          else if ("child_removed" == c && "child_changed" == f)
            a.ib[d] = new J("child_removed", e.Oe, d);
          else if ("child_changed" == c && "child_added" == f)
            a.ib[d] = new J("child_added", b.Na, d);
          else if ("child_changed" == c && "child_changed" == f)
            a.ib[d] = new J("child_changed", b.Na, d, e.Oe);
          else
            throw jd("Illegal combination of changes: " + b + " occurred after " + e);
        } else
          a.ib[d] = b;
      }
      ;
      function Ld(a) {
        this.g = a;
      }
      h = Ld.prototype;
      h.H = function(a, b, c, d, e, f) {
        O(a.Mc(this.g), "A node must be indexed if only a child is updated");
        e = a.T(b);
        if (e.S(d).ea(c.S(d)) && e.e() == c.e())
          return a;
        null != f && (c.e() ? a.Fa(b) ? Kd(f, new J("child_removed", e, b)) : O(a.L(), "A child remove without an old child only makes sense on a leaf node") : e.e() ? Kd(f, new J("child_added", c, b)) : Kd(f, new J("child_changed", c, b, e)));
        return a.L() && c.e() ? a : a.W(b, c).pb(this.g);
      };
      h.ya = function(a, b, c) {
        null != c && (a.L() || a.R(R, function(a, e) {
          b.Fa(a) || Kd(c, new J("child_removed", e, a));
        }), b.L() || b.R(R, function(b, e) {
          if (a.Fa(b)) {
            var f = a.T(b);
            f.ea(e) || Kd(c, new J("child_changed", e, b, f));
          } else
            Kd(c, new J("child_added", e, b));
        }));
        return b.pb(this.g);
      };
      h.ia = function(a, b) {
        return a.e() ? H : a.ia(b);
      };
      h.Ra = function() {
        return !1;
      };
      h.$b = function() {
        return this;
      };
      function Md(a) {
        this.Fe = new Ld(a.g);
        this.g = a.g;
        var b;
        a.oa ? (b = Nd(a), b = a.g.Sc(Od(a), b)) : b = a.g.Wc();
        this.gd = b;
        a.ra ? (b = Pd(a), a = a.g.Sc(Rd(a), b)) : a = a.g.Tc();
        this.Jc = a;
      }
      h = Md.prototype;
      h.matches = function(a) {
        return 0 >= this.g.compare(this.gd, a) && 0 >= this.g.compare(a, this.Jc);
      };
      h.H = function(a, b, c, d, e, f) {
        this.matches(new L(b, c)) || (c = H);
        return this.Fe.H(a, b, c, d, e, f);
      };
      h.ya = function(a, b, c) {
        b.L() && (b = H);
        var d = b.pb(this.g),
            d = d.ia(H),
            e = this;
        b.R(R, function(a, b) {
          e.matches(new L(a, b)) || (d = d.W(a, H));
        });
        return this.Fe.ya(a, d, c);
      };
      h.ia = function(a) {
        return a;
      };
      h.Ra = function() {
        return !0;
      };
      h.$b = function() {
        return this.Fe;
      };
      function Sd(a) {
        this.ua = new Md(a);
        this.g = a.g;
        O(a.la, "Only valid if limit has been set");
        this.ma = a.ma;
        this.Nb = !Td(a);
      }
      h = Sd.prototype;
      h.H = function(a, b, c, d, e, f) {
        this.ua.matches(new L(b, c)) || (c = H);
        return a.T(b).ea(c) ? a : a.Hb() < this.ma ? this.ua.$b().H(a, b, c, d, e, f) : Ud(this, a, b, c, e, f);
      };
      h.ya = function(a, b, c) {
        var d;
        if (b.L() || b.e())
          d = H.pb(this.g);
        else if (2 * this.ma < b.Hb() && b.Mc(this.g)) {
          d = H.pb(this.g);
          b = this.Nb ? b.dc(this.ua.Jc, this.g) : b.bc(this.ua.gd, this.g);
          for (var e = 0; 0 < b.Ta.length && e < this.ma; ) {
            var f = Ic(b),
                g;
            if (g = this.Nb ? 0 >= this.g.compare(this.ua.gd, f) : 0 >= this.g.compare(f, this.ua.Jc))
              d = d.W(f.name, f.U), e++;
            else
              break;
          }
        } else {
          d = b.pb(this.g);
          d = d.ia(H);
          var k,
              m,
              l;
          if (this.Nb) {
            b = d.xf(this.g);
            k = this.ua.Jc;
            m = this.ua.gd;
            var t = Vd(this.g);
            l = function(a, b) {
              return t(b, a);
            };
          } else
            b = d.ac(this.g), k = this.ua.gd, m = this.ua.Jc, l = Vd(this.g);
          for (var e = 0,
              A = !1; 0 < b.Ta.length; )
            f = Ic(b), !A && 0 >= l(k, f) && (A = !0), (g = A && e < this.ma && 0 >= l(f, m)) ? e++ : d = d.W(f.name, H);
        }
        return this.ua.$b().ya(a, d, c);
      };
      h.ia = function(a) {
        return a;
      };
      h.Ra = function() {
        return !0;
      };
      h.$b = function() {
        return this.ua.$b();
      };
      function Ud(a, b, c, d, e, f) {
        var g;
        if (a.Nb) {
          var k = Vd(a.g);
          g = function(a, b) {
            return k(b, a);
          };
        } else
          g = Vd(a.g);
        O(b.Hb() == a.ma, "");
        var m = new L(c, d),
            l = a.Nb ? Wd(b, a.g) : Xd(b, a.g),
            t = a.ua.matches(m);
        if (b.Fa(c)) {
          for (var A = b.T(c),
              l = e.Ce(a.g, l, a.Nb); null != l && (l.name == c || b.Fa(l.name)); )
            l = e.Ce(a.g, l, a.Nb);
          e = null == l ? 1 : g(l, m);
          if (t && !d.e() && 0 <= e)
            return null != f && Kd(f, new J("child_changed", d, c, A)), b.W(c, d);
          null != f && Kd(f, new J("child_removed", A, c));
          b = b.W(c, H);
          return null != l && a.ua.matches(l) ? (null != f && Kd(f, new J("child_added", l.U, l.name)), b.W(l.name, l.U)) : b;
        }
        return d.e() ? b : t && 0 <= g(l, m) ? (null != f && (Kd(f, new J("child_removed", l.U, l.name)), Kd(f, new J("child_added", d, c))), b.W(c, d).W(l.name, H)) : b;
      }
      ;
      function Yd(a, b) {
        this.me = a;
        this.og = b;
      }
      function Zd(a) {
        this.X = a;
      }
      Zd.prototype.gb = function(a, b, c, d) {
        var e = new Jd,
            f;
        if (b.type === Bc)
          b.source.Ae ? c = $d(this, a, b.path, b.Ja, c, d, e) : (O(b.source.tf, "Unknown source."), f = b.source.ef || mc(a.w()) && !b.path.e(), c = ae(this, a, b.path, b.Ja, c, d, f, e));
        else if (b.type === be)
          b.source.Ae ? c = ce(this, a, b.path, b.children, c, d, e) : (O(b.source.tf, "Unknown source."), f = b.source.ef || mc(a.w()), c = de(this, a, b.path, b.children, c, d, f, e));
        else if (b.type === ee)
          if (b.Yd)
            if (b = b.path, null != c.xc(b))
              c = a;
            else {
              f = new Vb(c, a, d);
              d = a.Q.j();
              if (b.e() || ".priority" === K(b))
                lc(a.w()) ? b = c.Aa(Yb(a)) : (b = a.w().j(), O(b instanceof fe, "serverChildren would be complete if leaf node"), b = c.Cc(b)), b = this.X.ya(d, b, e);
              else {
                var g = K(b),
                    k = c.Bc(g, a.w());
                null == k && Wb(a.w(), g) && (k = d.T(g));
                b = null != k ? this.X.H(d, g, k, N(b), f, e) : a.Q.j().Fa(g) ? this.X.H(d, g, H, N(b), f, e) : d;
                b.e() && lc(a.w()) && (d = c.Aa(Yb(a)), d.L() && (b = this.X.ya(b, d, e)));
              }
              d = lc(a.w()) || null != c.xc(M);
              c = ge(a, b, d, this.X.Ra());
            }
          else
            c = he(this, a, b.path, b.Ub, c, d, e);
        else if (b.type === Dc)
          d = b.path, b = a.w(), f = b.j(), g = b.ga || d.e(), c = ie(this, new je(a.Q, new Xb(f, g, b.Yb)), d, c, Ub, e);
        else
          throw jd("Unknown operation type: " + b.type);
        e = qa(e.ib);
        d = c;
        b = d.Q;
        b.ga && (f = b.j().L() || b.j().e(), g = ke(a), (0 < e.length || !a.Q.ga || f && !b.j().ea(g) || !b.j().C().ea(g.C())) && e.push(hc(ke(d))));
        return new Yd(c, e);
      };
      function ie(a, b, c, d, e, f) {
        var g = b.Q;
        if (null != d.xc(c))
          return b;
        var k;
        if (c.e())
          O(lc(b.w()), "If change path is empty, we must have complete server data"), mc(b.w()) ? (e = Yb(b), d = d.Cc(e instanceof fe ? e : H)) : d = d.Aa(Yb(b)), f = a.X.ya(b.Q.j(), d, f);
        else {
          var m = K(c);
          if (".priority" == m)
            O(1 == le(c), "Can't have a priority with additional path components"), f = g.j(), k = b.w().j(), d = d.nd(c, f, k), f = null != d ? a.X.ia(f, d) : g.j();
          else {
            var l = N(c);
            Wb(g, m) ? (k = b.w().j(), d = d.nd(c, g.j(), k), d = null != d ? g.j().T(m).H(l, d) : g.j().T(m)) : d = d.Bc(m, b.w());
            f = null != d ? a.X.H(g.j(), m, d, l, e, f) : g.j();
          }
        }
        return ge(b, f, g.ga || c.e(), a.X.Ra());
      }
      function ae(a, b, c, d, e, f, g, k) {
        var m = b.w();
        g = g ? a.X : a.X.$b();
        if (c.e())
          d = g.ya(m.j(), d, null);
        else if (g.Ra() && !m.Yb)
          d = m.j().H(c, d), d = g.ya(m.j(), d, null);
        else {
          var l = K(c);
          if (!nc(m, c) && 1 < le(c))
            return b;
          var t = N(c);
          d = m.j().T(l).H(t, d);
          d = ".priority" == l ? g.ia(m.j(), d) : g.H(m.j(), l, d, t, Ub, null);
        }
        m = m.ga || c.e();
        b = new je(b.Q, new Xb(d, m, g.Ra()));
        return ie(a, b, c, e, new Vb(e, b, f), k);
      }
      function $d(a, b, c, d, e, f, g) {
        var k = b.Q;
        e = new Vb(e, b, f);
        if (c.e())
          g = a.X.ya(b.Q.j(), d, g), a = ge(b, g, !0, a.X.Ra());
        else if (f = K(c), ".priority" === f)
          g = a.X.ia(b.Q.j(), d), a = ge(b, g, k.ga, k.Yb);
        else {
          c = N(c);
          var m = k.j().T(f);
          if (!c.e()) {
            var l = e.uf(f);
            d = null != l ? ".priority" === me(c) && l.S(c.parent()).e() ? l : l.H(c, d) : H;
          }
          m.ea(d) ? a = b : (g = a.X.H(k.j(), f, d, c, e, g), a = ge(b, g, k.ga, a.X.Ra()));
        }
        return a;
      }
      function ce(a, b, c, d, e, f, g) {
        var k = b;
        ne(d, function(d, l) {
          var t = c.o(d);
          Wb(b.Q, K(t)) && (k = $d(a, k, t, l, e, f, g));
        });
        ne(d, function(d, l) {
          var t = c.o(d);
          Wb(b.Q, K(t)) || (k = $d(a, k, t, l, e, f, g));
        });
        return k;
      }
      function oe(a, b) {
        ne(b, function(b, d) {
          a = a.H(b, d);
        });
        return a;
      }
      function de(a, b, c, d, e, f, g, k) {
        if (b.w().j().e() && !lc(b.w()))
          return b;
        var m = b;
        c = c.e() ? d : pe(qe, c, d);
        var l = b.w().j();
        c.children.ka(function(c, d) {
          if (l.Fa(c)) {
            var I = b.w().j().T(c),
                I = oe(I, d);
            m = ae(a, m, new P(c), I, e, f, g, k);
          }
        });
        c.children.ka(function(c, d) {
          var I = !Wb(b.w(), c) && null == d.value;
          l.Fa(c) || I || (I = b.w().j().T(c), I = oe(I, d), m = ae(a, m, new P(c), I, e, f, g, k));
        });
        return m;
      }
      function he(a, b, c, d, e, f, g) {
        if (null != e.xc(c))
          return b;
        var k = mc(b.w()),
            m = b.w();
        if (null != d.value) {
          if (c.e() && m.ga || nc(m, c))
            return ae(a, b, c, m.j().S(c), e, f, k, g);
          if (c.e()) {
            var l = qe;
            m.j().R(re, function(a, b) {
              l = l.set(new P(a), b);
            });
            return de(a, b, c, l, e, f, k, g);
          }
          return b;
        }
        l = qe;
        ne(d, function(a) {
          var b = c.o(a);
          nc(m, b) && (l = l.set(a, m.j().S(b)));
        });
        return de(a, b, c, l, e, f, k, g);
      }
      ;
      function se() {}
      var te = {};
      function Vd(a) {
        return u(a.compare, a);
      }
      se.prototype.Dd = function(a, b) {
        return 0 !== this.compare(new L("[MIN_NAME]", a), new L("[MIN_NAME]", b));
      };
      se.prototype.Wc = function() {
        return ue;
      };
      function ve(a) {
        O(!a.e() && ".priority" !== K(a), "Can't create PathIndex with empty path or .priority key");
        this.gc = a;
      }
      ka(ve, se);
      h = ve.prototype;
      h.Lc = function(a) {
        return !a.S(this.gc).e();
      };
      h.compare = function(a, b) {
        var c = a.U.S(this.gc),
            d = b.U.S(this.gc),
            c = c.Gc(d);
        return 0 === c ? yc(a.name, b.name) : c;
      };
      h.Sc = function(a, b) {
        var c = Q(a),
            c = H.H(this.gc, c);
        return new L(b, c);
      };
      h.Tc = function() {
        var a = H.H(this.gc, we);
        return new L("[MAX_NAME]", a);
      };
      h.toString = function() {
        return this.gc.slice().join("/");
      };
      function xe() {}
      ka(xe, se);
      h = xe.prototype;
      h.compare = function(a, b) {
        var c = a.U.C(),
            d = b.U.C(),
            c = c.Gc(d);
        return 0 === c ? yc(a.name, b.name) : c;
      };
      h.Lc = function(a) {
        return !a.C().e();
      };
      h.Dd = function(a, b) {
        return !a.C().ea(b.C());
      };
      h.Wc = function() {
        return ue;
      };
      h.Tc = function() {
        return new L("[MAX_NAME]", new Yc("[PRIORITY-POST]", we));
      };
      h.Sc = function(a, b) {
        var c = Q(a);
        return new L(b, new Yc("[PRIORITY-POST]", c));
      };
      h.toString = function() {
        return ".priority";
      };
      var R = new xe;
      function ye() {}
      ka(ye, se);
      h = ye.prototype;
      h.compare = function(a, b) {
        return yc(a.name, b.name);
      };
      h.Lc = function() {
        throw jd("KeyIndex.isDefinedOn not expected to be called.");
      };
      h.Dd = function() {
        return !1;
      };
      h.Wc = function() {
        return ue;
      };
      h.Tc = function() {
        return new L("[MAX_NAME]", H);
      };
      h.Sc = function(a) {
        O(q(a), "KeyIndex indexValue must always be a string.");
        return new L(a, H);
      };
      h.toString = function() {
        return ".key";
      };
      var re = new ye;
      function ze() {}
      ka(ze, se);
      h = ze.prototype;
      h.compare = function(a, b) {
        var c = a.U.Gc(b.U);
        return 0 === c ? yc(a.name, b.name) : c;
      };
      h.Lc = function() {
        return !0;
      };
      h.Dd = function(a, b) {
        return !a.ea(b);
      };
      h.Wc = function() {
        return ue;
      };
      h.Tc = function() {
        return Ae;
      };
      h.Sc = function(a, b) {
        var c = Q(a);
        return new L(b, c);
      };
      h.toString = function() {
        return ".value";
      };
      var Be = new ze;
      function Ce() {
        this.Xb = this.ra = this.Pb = this.oa = this.la = !1;
        this.ma = 0;
        this.Rb = "";
        this.ic = null;
        this.Bb = "";
        this.fc = null;
        this.zb = "";
        this.g = R;
      }
      var De = new Ce;
      function Td(a) {
        return "" === a.Rb ? a.oa : "l" === a.Rb;
      }
      function Od(a) {
        O(a.oa, "Only valid if start has been set");
        return a.ic;
      }
      function Nd(a) {
        O(a.oa, "Only valid if start has been set");
        return a.Pb ? a.Bb : "[MIN_NAME]";
      }
      function Rd(a) {
        O(a.ra, "Only valid if end has been set");
        return a.fc;
      }
      function Pd(a) {
        O(a.ra, "Only valid if end has been set");
        return a.Xb ? a.zb : "[MAX_NAME]";
      }
      function Ee(a) {
        var b = new Ce;
        b.la = a.la;
        b.ma = a.ma;
        b.oa = a.oa;
        b.ic = a.ic;
        b.Pb = a.Pb;
        b.Bb = a.Bb;
        b.ra = a.ra;
        b.fc = a.fc;
        b.Xb = a.Xb;
        b.zb = a.zb;
        b.g = a.g;
        return b;
      }
      h = Ce.prototype;
      h.Le = function(a) {
        var b = Ee(this);
        b.la = !0;
        b.ma = a;
        b.Rb = "";
        return b;
      };
      h.Me = function(a) {
        var b = Ee(this);
        b.la = !0;
        b.ma = a;
        b.Rb = "l";
        return b;
      };
      h.Ne = function(a) {
        var b = Ee(this);
        b.la = !0;
        b.ma = a;
        b.Rb = "r";
        return b;
      };
      h.ce = function(a, b) {
        var c = Ee(this);
        c.oa = !0;
        p(a) || (a = null);
        c.ic = a;
        null != b ? (c.Pb = !0, c.Bb = b) : (c.Pb = !1, c.Bb = "");
        return c;
      };
      h.vd = function(a, b) {
        var c = Ee(this);
        c.ra = !0;
        p(a) || (a = null);
        c.fc = a;
        p(b) ? (c.Xb = !0, c.zb = b) : (c.oh = !1, c.zb = "");
        return c;
      };
      function Fe(a, b) {
        var c = Ee(a);
        c.g = b;
        return c;
      }
      function Ge(a) {
        var b = {};
        a.oa && (b.sp = a.ic, a.Pb && (b.sn = a.Bb));
        a.ra && (b.ep = a.fc, a.Xb && (b.en = a.zb));
        if (a.la) {
          b.l = a.ma;
          var c = a.Rb;
          "" === c && (c = Td(a) ? "l" : "r");
          b.vf = c;
        }
        a.g !== R && (b.i = a.g.toString());
        return b;
      }
      function He(a) {
        return !(a.oa || a.ra || a.la);
      }
      function Ie(a) {
        return He(a) && a.g == R;
      }
      function Je(a) {
        var b = {};
        if (Ie(a))
          return b;
        var c;
        a.g === R ? c = "$priority" : a.g === Be ? c = "$value" : a.g === re ? c = "$key" : (O(a.g instanceof ve, "Unrecognized index type!"), c = a.g.toString());
        b.orderBy = G(c);
        a.oa && (b.startAt = G(a.ic), a.Pb && (b.startAt += "," + G(a.Bb)));
        a.ra && (b.endAt = G(a.fc), a.Xb && (b.endAt += "," + G(a.zb)));
        a.la && (Td(a) ? b.limitToFirst = a.ma : b.limitToLast = a.ma);
        return b;
      }
      h.toString = function() {
        return G(Ge(this));
      };
      function Ke(a, b) {
        this.Ed = a;
        this.hc = b;
      }
      Ke.prototype.get = function(a) {
        var b = z(this.Ed, a);
        if (!b)
          throw Error("No index defined for " + a);
        return b === te ? null : b;
      };
      function Le(a, b, c) {
        var d = ma(a.Ed, function(d, f) {
          var g = z(a.hc, f);
          O(g, "Missing index implementation for " + f);
          if (d === te) {
            if (g.Lc(b.U)) {
              for (var k = [],
                  m = c.ac(wc),
                  l = Ic(m); l; )
                l.name != b.name && k.push(l), l = Ic(m);
              k.push(b);
              return Me(k, Vd(g));
            }
            return te;
          }
          g = c.get(b.name);
          k = d;
          g && (k = k.remove(new L(b.name, g)));
          return k.Sa(b, b.U);
        });
        return new Ke(d, a.hc);
      }
      function Ne(a, b, c) {
        var d = ma(a.Ed, function(a) {
          if (a === te)
            return a;
          var d = c.get(b.name);
          return d ? a.remove(new L(b.name, d)) : a;
        });
        return new Ke(d, a.hc);
      }
      var Oe = new Ke({".priority": te}, {".priority": R});
      function Yc(a, b) {
        this.B = a;
        O(p(this.B) && null !== this.B, "LeafNode shouldn't be created with null/undefined value.");
        this.ca = b || H;
        Pe(this.ca);
        this.Gb = null;
      }
      var Qe = ["object", "boolean", "number", "string"];
      h = Yc.prototype;
      h.L = function() {
        return !0;
      };
      h.C = function() {
        return this.ca;
      };
      h.ia = function(a) {
        return new Yc(this.B, a);
      };
      h.T = function(a) {
        return ".priority" === a ? this.ca : H;
      };
      h.S = function(a) {
        return a.e() ? this : ".priority" === K(a) ? this.ca : H;
      };
      h.Fa = function() {
        return !1;
      };
      h.wf = function() {
        return null;
      };
      h.W = function(a, b) {
        return ".priority" === a ? this.ia(b) : b.e() && ".priority" !== a ? this : H.W(a, b).ia(this.ca);
      };
      h.H = function(a, b) {
        var c = K(a);
        if (null === c)
          return b;
        if (b.e() && ".priority" !== c)
          return this;
        O(".priority" !== c || 1 === le(a), ".priority must be the last token in a path");
        return this.W(c, H.H(N(a), b));
      };
      h.e = function() {
        return !1;
      };
      h.Hb = function() {
        return 0;
      };
      h.R = function() {
        return !1;
      };
      h.J = function(a) {
        return a && !this.C().e() ? {
          ".value": this.Ea(),
          ".priority": this.C().J()
        } : this.Ea();
      };
      h.hash = function() {
        if (null === this.Gb) {
          var a = "";
          this.ca.e() || (a += "priority:" + Re(this.ca.J()) + ":");
          var b = typeof this.B,
              a = a + (b + ":"),
              a = "number" === b ? a + Ad(this.B) : a + this.B;
          this.Gb = ld(a);
        }
        return this.Gb;
      };
      h.Ea = function() {
        return this.B;
      };
      h.Gc = function(a) {
        if (a === H)
          return 1;
        if (a instanceof fe)
          return -1;
        O(a.L(), "Unknown node type");
        var b = typeof a.B,
            c = typeof this.B,
            d = La(Qe, b),
            e = La(Qe, c);
        O(0 <= d, "Unknown leaf type: " + b);
        O(0 <= e, "Unknown leaf type: " + c);
        return d === e ? "object" === c ? 0 : this.B < a.B ? -1 : this.B === a.B ? 0 : 1 : e - d;
      };
      h.pb = function() {
        return this;
      };
      h.Mc = function() {
        return !0;
      };
      h.ea = function(a) {
        return a === this ? !0 : a.L() ? this.B === a.B && this.ca.ea(a.ca) : !1;
      };
      h.toString = function() {
        return G(this.J(!0));
      };
      function fe(a, b, c) {
        this.m = a;
        (this.ca = b) && Pe(this.ca);
        a.e() && O(!this.ca || this.ca.e(), "An empty node cannot have a priority");
        this.Ab = c;
        this.Gb = null;
      }
      h = fe.prototype;
      h.L = function() {
        return !1;
      };
      h.C = function() {
        return this.ca || H;
      };
      h.ia = function(a) {
        return this.m.e() ? this : new fe(this.m, a, this.Ab);
      };
      h.T = function(a) {
        if (".priority" === a)
          return this.C();
        a = this.m.get(a);
        return null === a ? H : a;
      };
      h.S = function(a) {
        var b = K(a);
        return null === b ? this : this.T(b).S(N(a));
      };
      h.Fa = function(a) {
        return null !== this.m.get(a);
      };
      h.W = function(a, b) {
        O(b, "We should always be passing snapshot nodes");
        if (".priority" === a)
          return this.ia(b);
        var c = new L(a, b),
            d,
            e;
        b.e() ? (d = this.m.remove(a), c = Ne(this.Ab, c, this.m)) : (d = this.m.Sa(a, b), c = Le(this.Ab, c, this.m));
        e = d.e() ? H : this.ca;
        return new fe(d, e, c);
      };
      h.H = function(a, b) {
        var c = K(a);
        if (null === c)
          return b;
        O(".priority" !== K(a) || 1 === le(a), ".priority must be the last token in a path");
        var d = this.T(c).H(N(a), b);
        return this.W(c, d);
      };
      h.e = function() {
        return this.m.e();
      };
      h.Hb = function() {
        return this.m.count();
      };
      var Se = /^(0|[1-9]\d*)$/;
      h = fe.prototype;
      h.J = function(a) {
        if (this.e())
          return null;
        var b = {},
            c = 0,
            d = 0,
            e = !0;
        this.R(R, function(f, g) {
          b[f] = g.J(a);
          c++;
          e && Se.test(f) ? d = Math.max(d, Number(f)) : e = !1;
        });
        if (!a && e && d < 2 * c) {
          var f = [],
              g;
          for (g in b)
            f[g] = b[g];
          return f;
        }
        a && !this.C().e() && (b[".priority"] = this.C().J());
        return b;
      };
      h.hash = function() {
        if (null === this.Gb) {
          var a = "";
          this.C().e() || (a += "priority:" + Re(this.C().J()) + ":");
          this.R(R, function(b, c) {
            var d = c.hash();
            "" !== d && (a += ":" + b + ":" + d);
          });
          this.Gb = "" === a ? "" : ld(a);
        }
        return this.Gb;
      };
      h.wf = function(a, b, c) {
        return (c = Te(this, c)) ? (a = Gc(c, new L(a, b))) ? a.name : null : Gc(this.m, a);
      };
      function Wd(a, b) {
        var c;
        c = (c = Te(a, b)) ? (c = c.Vc()) && c.name : a.m.Vc();
        return c ? new L(c, a.m.get(c)) : null;
      }
      function Xd(a, b) {
        var c;
        c = (c = Te(a, b)) ? (c = c.jc()) && c.name : a.m.jc();
        return c ? new L(c, a.m.get(c)) : null;
      }
      h.R = function(a, b) {
        var c = Te(this, a);
        return c ? c.ka(function(a) {
          return b(a.name, a.U);
        }) : this.m.ka(b);
      };
      h.ac = function(a) {
        return this.bc(a.Wc(), a);
      };
      h.bc = function(a, b) {
        var c = Te(this, b);
        if (c)
          return c.bc(a, function(a) {
            return a;
          });
        for (var c = this.m.bc(a.name, wc),
            d = Jc(c); null != d && 0 > b.compare(d, a); )
          Ic(c), d = Jc(c);
        return c;
      };
      h.xf = function(a) {
        return this.dc(a.Tc(), a);
      };
      h.dc = function(a, b) {
        var c = Te(this, b);
        if (c)
          return c.dc(a, function(a) {
            return a;
          });
        for (var c = this.m.dc(a.name, wc),
            d = Jc(c); null != d && 0 < b.compare(d, a); )
          Ic(c), d = Jc(c);
        return c;
      };
      h.Gc = function(a) {
        return this.e() ? a.e() ? 0 : -1 : a.L() || a.e() ? 1 : a === we ? -1 : 0;
      };
      h.pb = function(a) {
        if (a === re || sa(this.Ab.hc, a.toString()))
          return this;
        var b = this.Ab,
            c = this.m;
        O(a !== re, "KeyIndex always exists and isn't meant to be added to the IndexMap.");
        for (var d = [],
            e = !1,
            c = c.ac(wc),
            f = Ic(c); f; )
          e = e || a.Lc(f.U), d.push(f), f = Ic(c);
        d = e ? Me(d, Vd(a)) : te;
        e = a.toString();
        c = wa(b.hc);
        c[e] = a;
        a = wa(b.Ed);
        a[e] = d;
        return new fe(this.m, this.ca, new Ke(a, c));
      };
      h.Mc = function(a) {
        return a === re || sa(this.Ab.hc, a.toString());
      };
      h.ea = function(a) {
        if (a === this)
          return !0;
        if (a.L())
          return !1;
        if (this.C().ea(a.C()) && this.m.count() === a.m.count()) {
          var b = this.ac(R);
          a = a.ac(R);
          for (var c = Ic(b),
              d = Ic(a); c && d; ) {
            if (c.name !== d.name || !c.U.ea(d.U))
              return !1;
            c = Ic(b);
            d = Ic(a);
          }
          return null === c && null === d;
        }
        return !1;
      };
      function Te(a, b) {
        return b === re ? null : a.Ab.get(b.toString());
      }
      h.toString = function() {
        return G(this.J(!0));
      };
      function Q(a, b) {
        if (null === a)
          return H;
        var c = null;
        "object" === typeof a && ".priority" in a ? c = a[".priority"] : "undefined" !== typeof b && (c = b);
        O(null === c || "string" === typeof c || "number" === typeof c || "object" === typeof c && ".sv" in c, "Invalid priority type found: " + typeof c);
        "object" === typeof a && ".value" in a && null !== a[".value"] && (a = a[".value"]);
        if ("object" !== typeof a || ".sv" in a)
          return new Yc(a, Q(c));
        if (a instanceof Array) {
          var d = H,
              e = a;
          v(e, function(a, b) {
            if (y(e, b) && "." !== b.substring(0, 1)) {
              var c = Q(a);
              if (c.L() || !c.e())
                d = d.W(b, c);
            }
          });
          return d.ia(Q(c));
        }
        var f = [],
            g = !1,
            k = a;
        Fb(k, function(a) {
          if ("string" !== typeof a || "." !== a.substring(0, 1)) {
            var b = Q(k[a]);
            b.e() || (g = g || !b.C().e(), f.push(new L(a, b)));
          }
        });
        if (0 == f.length)
          return H;
        var m = Me(f, xc, function(a) {
          return a.name;
        }, zc);
        if (g) {
          var l = Me(f, Vd(R));
          return new fe(m, Q(c), new Ke({".priority": l}, {".priority": R}));
        }
        return new fe(m, Q(c), Oe);
      }
      var Ue = Math.log(2);
      function Ve(a) {
        this.count = parseInt(Math.log(a + 1) / Ue, 10);
        this.nf = this.count - 1;
        this.ng = a + 1 & parseInt(Array(this.count + 1).join("1"), 2);
      }
      function We(a) {
        var b = !(a.ng & 1 << a.nf);
        a.nf--;
        return b;
      }
      function Me(a, b, c, d) {
        function e(b, d) {
          var f = d - b;
          if (0 == f)
            return null;
          if (1 == f) {
            var l = a[b],
                t = c ? c(l) : l;
            return new Kc(t, l.U, !1, null, null);
          }
          var l = parseInt(f / 2, 10) + b,
              f = e(b, l),
              A = e(l + 1, d),
              l = a[l],
              t = c ? c(l) : l;
          return new Kc(t, l.U, !1, f, A);
        }
        a.sort(b);
        var f = function(b) {
          function d(b, g) {
            var k = t - b,
                A = t;
            t -= b;
            var A = e(k + 1, A),
                k = a[k],
                I = c ? c(k) : k,
                A = new Kc(I, k.U, g, null, A);
            f ? f.left = A : l = A;
            f = A;
          }
          for (var f = null,
              l = null,
              t = a.length,
              A = 0; A < b.count; ++A) {
            var I = We(b),
                Qd = Math.pow(2, b.count - (A + 1));
            I ? d(Qd, !1) : (d(Qd, !1), d(Qd, !0));
          }
          return l;
        }(new Ve(a.length));
        return null !== f ? new Ec(d || b, f) : new Ec(d || b);
      }
      function Re(a) {
        return "number" === typeof a ? "number:" + Ad(a) : "string:" + a;
      }
      function Pe(a) {
        if (a.L()) {
          var b = a.J();
          O("string" === typeof b || "number" === typeof b || "object" === typeof b && y(b, ".sv"), "Priority must be a string or number.");
        } else
          O(a === we || a.e(), "priority of unexpected type.");
        O(a === we || a.C().e(), "Priority nodes can't have a priority of their own.");
      }
      var H = new fe(new Ec(zc), null, Oe);
      function Xe() {
        fe.call(this, new Ec(zc), H, Oe);
      }
      ka(Xe, fe);
      h = Xe.prototype;
      h.Gc = function(a) {
        return a === this ? 0 : 1;
      };
      h.ea = function(a) {
        return a === this;
      };
      h.C = function() {
        return this;
      };
      h.T = function() {
        return H;
      };
      h.e = function() {
        return !1;
      };
      var we = new Xe,
          ue = new L("[MIN_NAME]", H),
          Ae = new L("[MAX_NAME]", we);
      function je(a, b) {
        this.Q = a;
        this.ae = b;
      }
      function ge(a, b, c, d) {
        return new je(new Xb(b, c, d), a.ae);
      }
      function ke(a) {
        return a.Q.ga ? a.Q.j() : null;
      }
      je.prototype.w = function() {
        return this.ae;
      };
      function Yb(a) {
        return a.ae.ga ? a.ae.j() : null;
      }
      ;
      function Ye(a, b) {
        this.Y = a;
        var c = a.n,
            d = new Ld(c.g),
            c = He(c) ? new Ld(c.g) : c.la ? new Sd(c) : new Md(c);
        this.Nf = new Zd(c);
        var e = b.w(),
            f = b.Q,
            g = d.ya(H, e.j(), null),
            k = c.ya(H, f.j(), null);
        this.Oa = new je(new Xb(k, f.ga, c.Ra()), new Xb(g, e.ga, d.Ra()));
        this.$a = [];
        this.ug = new Fd(a);
      }
      function Ze(a) {
        return a.Y;
      }
      h = Ye.prototype;
      h.w = function() {
        return this.Oa.w().j();
      };
      h.kb = function(a) {
        var b = Yb(this.Oa);
        return b && (He(this.Y.n) || !a.e() && !b.T(K(a)).e()) ? b.S(a) : null;
      };
      h.e = function() {
        return 0 === this.$a.length;
      };
      h.Tb = function(a) {
        this.$a.push(a);
      };
      h.nb = function(a, b) {
        var c = [];
        if (b) {
          O(null == a, "A cancel should cancel all event registrations.");
          var d = this.Y.path;
          Ma(this.$a, function(a) {
            (a = a.lf(b, d)) && c.push(a);
          });
        }
        if (a) {
          for (var e = [],
              f = 0; f < this.$a.length; ++f) {
            var g = this.$a[f];
            if (!g.matches(a))
              e.push(g);
            else if (a.yf()) {
              e = e.concat(this.$a.slice(f + 1));
              break;
            }
          }
          this.$a = e;
        } else
          this.$a = [];
        return c;
      };
      h.gb = function(a, b, c) {
        a.type === be && null !== a.source.Lb && (O(Yb(this.Oa), "We should always have a full cache before handling merges"), O(ke(this.Oa), "Missing event cache, even though we have a server cache"));
        var d = this.Oa;
        a = this.Nf.gb(d, a, b, c);
        b = this.Nf;
        c = a.me;
        O(c.Q.j().Mc(b.X.g), "Event snap not indexed");
        O(c.w().j().Mc(b.X.g), "Server snap not indexed");
        O(lc(a.me.w()) || !lc(d.w()), "Once a server snap is complete, it should never go back");
        this.Oa = a.me;
        return $e(this, a.og, a.me.Q.j(), null);
      };
      function af(a, b) {
        var c = a.Oa.Q,
            d = [];
        c.j().L() || c.j().R(R, function(a, b) {
          d.push(new J("child_added", b, a));
        });
        c.ga && d.push(hc(c.j()));
        return $e(a, d, c.j(), b);
      }
      function $e(a, b, c, d) {
        return Gd(a.ug, b, c, d ? [d] : a.$a);
      }
      ;
      function bf(a, b, c) {
        this.type = be;
        this.source = a;
        this.path = b;
        this.children = c;
      }
      bf.prototype.$c = function(a) {
        if (this.path.e())
          return a = this.children.subtree(new P(a)), a.e() ? null : a.value ? new Ac(this.source, M, a.value) : new bf(this.source, M, a);
        O(K(this.path) === a, "Can't get a merge for a child not on the path of the operation");
        return new bf(this.source, N(this.path), this.children);
      };
      bf.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " merge: " + this.children.toString() + ")";
      };
      function cf(a, b) {
        this.f = pd("p:rest:");
        this.G = a;
        this.Kb = b;
        this.Ca = null;
        this.ba = {};
      }
      function df(a, b) {
        if (p(b))
          return "tag$" + b;
        O(Ie(a.n), "should have a tag if it's not a default query.");
        return a.path.toString();
      }
      h = cf.prototype;
      h.Cf = function(a, b, c, d) {
        var e = a.path.toString();
        this.f("Listen called for " + e + " " + a.wa());
        var f = df(a, c),
            g = {};
        this.ba[f] = g;
        a = Je(a.n);
        var k = this;
        ef(this, e + ".json", a, function(a, b) {
          var t = b;
          404 === a && (a = t = null);
          null === a && k.Kb(e, t, !1, c);
          z(k.ba, f) === g && d(a ? 401 == a ? "permission_denied" : "rest_error:" + a : "ok", null);
        });
      };
      h.$f = function(a, b) {
        var c = df(a, b);
        delete this.ba[c];
      };
      h.O = function(a, b) {
        this.Ca = a;
        var c = Cd(a),
            d = c.data,
            c = c.Ec && c.Ec.exp;
        b && b("ok", {
          auth: d,
          expires: c
        });
      };
      h.je = function(a) {
        this.Ca = null;
        a("ok", null);
      };
      h.Qe = function() {};
      h.Gf = function() {};
      h.Md = function() {};
      h.put = function() {};
      h.Df = function() {};
      h.Ye = function() {};
      function ef(a, b, c, d) {
        c = c || {};
        c.format = "export";
        a.Ca && (c.auth = a.Ca);
        var e = (a.G.ob ? "https://" : "http://") + a.G.host + b + "?" + Ib(c);
        a.f("Sending REST request for " + e);
        var f = new XMLHttpRequest;
        f.onreadystatechange = function() {
          if (d && 4 === f.readyState) {
            a.f("REST Response for " + e + " received. status:", f.status, "response:", f.responseText);
            var b = null;
            if (200 <= f.status && 300 > f.status) {
              try {
                b = Rb(f.responseText);
              } catch (c) {
                S("Failed to parse JSON response for " + e + ": " + f.responseText);
              }
              d(null, b);
            } else
              401 !== f.status && 404 !== f.status && S("Got unsuccessful REST response for " + e + " Status: " + f.status), d(f.status);
            d = null;
          }
        };
        f.open("GET", e, !0);
        f.send();
      }
      ;
      function ff(a) {
        O(da(a) && 0 < a.length, "Requires a non-empty array");
        this.fg = a;
        this.Rc = {};
      }
      ff.prototype.ie = function(a, b) {
        var c;
        c = this.Rc[a] || [];
        var d = c.length;
        if (0 < d) {
          for (var e = Array(d),
              f = 0; f < d; f++)
            e[f] = c[f];
          c = e;
        } else
          c = [];
        for (d = 0; d < c.length; d++)
          c[d].Dc.apply(c[d].Qa, Array.prototype.slice.call(arguments, 1));
      };
      ff.prototype.Ib = function(a, b, c) {
        gf(this, a);
        this.Rc[a] = this.Rc[a] || [];
        this.Rc[a].push({
          Dc: b,
          Qa: c
        });
        (a = this.Ee(a)) && b.apply(c, a);
      };
      ff.prototype.mc = function(a, b, c) {
        gf(this, a);
        a = this.Rc[a] || [];
        for (var d = 0; d < a.length; d++)
          if (a[d].Dc === b && (!c || c === a[d].Qa)) {
            a.splice(d, 1);
            break;
          }
      };
      function gf(a, b) {
        O(Ra(a.fg, function(a) {
          return a === b;
        }), "Unknown event: " + b);
      }
      ;
      var hf = function() {
        var a = 0,
            b = [];
        return function(c) {
          var d = c === a;
          a = c;
          for (var e = Array(8),
              f = 7; 0 <= f; f--)
            e[f] = "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(c % 64), c = Math.floor(c / 64);
          O(0 === c, "Cannot push at time == 0");
          c = e.join("");
          if (d) {
            for (f = 11; 0 <= f && 63 === b[f]; f--)
              b[f] = 0;
            b[f]++;
          } else
            for (f = 0; 12 > f; f++)
              b[f] = Math.floor(64 * Math.random());
          for (f = 0; 12 > f; f++)
            c += "-0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ_abcdefghijklmnopqrstuvwxyz".charAt(b[f]);
          O(20 === c.length, "nextPushId: Length should be 20.");
          return c;
        };
      }();
      function jf() {
        ff.call(this, ["online"]);
        this.oc = !0;
        if ("undefined" !== typeof window && "undefined" !== typeof window.addEventListener) {
          var a = this;
          window.addEventListener("online", function() {
            a.oc || (a.oc = !0, a.ie("online", !0));
          }, !1);
          window.addEventListener("offline", function() {
            a.oc && (a.oc = !1, a.ie("online", !1));
          }, !1);
        }
      }
      ka(jf, ff);
      jf.prototype.Ee = function(a) {
        O("online" === a, "Unknown event type: " + a);
        return [this.oc];
      };
      ba(jf);
      function kf() {
        ff.call(this, ["visible"]);
        var a,
            b;
        "undefined" !== typeof document && "undefined" !== typeof document.addEventListener && ("undefined" !== typeof document.hidden ? (b = "visibilitychange", a = "hidden") : "undefined" !== typeof document.mozHidden ? (b = "mozvisibilitychange", a = "mozHidden") : "undefined" !== typeof document.msHidden ? (b = "msvisibilitychange", a = "msHidden") : "undefined" !== typeof document.webkitHidden && (b = "webkitvisibilitychange", a = "webkitHidden"));
        this.Sb = !0;
        if (b) {
          var c = this;
          document.addEventListener(b, function() {
            var b = !document[a];
            b !== c.Sb && (c.Sb = b, c.ie("visible", b));
          }, !1);
        }
      }
      ka(kf, ff);
      kf.prototype.Ee = function(a) {
        O("visible" === a, "Unknown event type: " + a);
        return [this.Sb];
      };
      ba(kf);
      function P(a, b) {
        if (1 == arguments.length) {
          this.u = a.split("/");
          for (var c = 0,
              d = 0; d < this.u.length; d++)
            0 < this.u[d].length && (this.u[c] = this.u[d], c++);
          this.u.length = c;
          this.aa = 0;
        } else
          this.u = a, this.aa = b;
      }
      function lf(a, b) {
        var c = K(a);
        if (null === c)
          return b;
        if (c === K(b))
          return lf(N(a), N(b));
        throw Error("INTERNAL ERROR: innerPath (" + b + ") is not within outerPath (" + a + ")");
      }
      function mf(a, b) {
        for (var c = a.slice(),
            d = b.slice(),
            e = 0; e < c.length && e < d.length; e++) {
          var f = yc(c[e], d[e]);
          if (0 !== f)
            return f;
        }
        return c.length === d.length ? 0 : c.length < d.length ? -1 : 1;
      }
      function K(a) {
        return a.aa >= a.u.length ? null : a.u[a.aa];
      }
      function le(a) {
        return a.u.length - a.aa;
      }
      function N(a) {
        var b = a.aa;
        b < a.u.length && b++;
        return new P(a.u, b);
      }
      function me(a) {
        return a.aa < a.u.length ? a.u[a.u.length - 1] : null;
      }
      h = P.prototype;
      h.toString = function() {
        for (var a = "",
            b = this.aa; b < this.u.length; b++)
          "" !== this.u[b] && (a += "/" + this.u[b]);
        return a || "/";
      };
      h.slice = function(a) {
        return this.u.slice(this.aa + (a || 0));
      };
      h.parent = function() {
        if (this.aa >= this.u.length)
          return null;
        for (var a = [],
            b = this.aa; b < this.u.length - 1; b++)
          a.push(this.u[b]);
        return new P(a, 0);
      };
      h.o = function(a) {
        for (var b = [],
            c = this.aa; c < this.u.length; c++)
          b.push(this.u[c]);
        if (a instanceof P)
          for (c = a.aa; c < a.u.length; c++)
            b.push(a.u[c]);
        else
          for (a = a.split("/"), c = 0; c < a.length; c++)
            0 < a[c].length && b.push(a[c]);
        return new P(b, 0);
      };
      h.e = function() {
        return this.aa >= this.u.length;
      };
      h.ea = function(a) {
        if (le(this) !== le(a))
          return !1;
        for (var b = this.aa,
            c = a.aa; b <= this.u.length; b++, c++)
          if (this.u[b] !== a.u[c])
            return !1;
        return !0;
      };
      h.contains = function(a) {
        var b = this.aa,
            c = a.aa;
        if (le(this) > le(a))
          return !1;
        for (; b < this.u.length; ) {
          if (this.u[b] !== a.u[c])
            return !1;
          ++b;
          ++c;
        }
        return !0;
      };
      var M = new P("");
      function nf(a, b) {
        this.Ua = a.slice();
        this.Ka = Math.max(1, this.Ua.length);
        this.pf = b;
        for (var c = 0; c < this.Ua.length; c++)
          this.Ka += Pb(this.Ua[c]);
        of(this);
      }
      nf.prototype.push = function(a) {
        0 < this.Ua.length && (this.Ka += 1);
        this.Ua.push(a);
        this.Ka += Pb(a);
        of(this);
      };
      nf.prototype.pop = function() {
        var a = this.Ua.pop();
        this.Ka -= Pb(a);
        0 < this.Ua.length && --this.Ka;
      };
      function of(a) {
        if (768 < a.Ka)
          throw Error(a.pf + "has a key path longer than 768 bytes (" + a.Ka + ").");
        if (32 < a.Ua.length)
          throw Error(a.pf + "path specified exceeds the maximum depth that can be written (32) or object contains a cycle " + pf(a));
      }
      function pf(a) {
        return 0 == a.Ua.length ? "" : "in property '" + a.Ua.join(".") + "'";
      }
      ;
      function qf(a, b) {
        this.value = a;
        this.children = b || rf;
      }
      var rf = new Ec(function(a, b) {
        return a === b ? 0 : a < b ? -1 : 1;
      });
      function sf(a) {
        var b = qe;
        v(a, function(a, d) {
          b = b.set(new P(d), a);
        });
        return b;
      }
      h = qf.prototype;
      h.e = function() {
        return null === this.value && this.children.e();
      };
      function tf(a, b, c) {
        if (null != a.value && c(a.value))
          return {
            path: M,
            value: a.value
          };
        if (b.e())
          return null;
        var d = K(b);
        a = a.children.get(d);
        return null !== a ? (b = tf(a, N(b), c), null != b ? {
          path: (new P(d)).o(b.path),
          value: b.value
        } : null) : null;
      }
      function uf(a, b) {
        return tf(a, b, function() {
          return !0;
        });
      }
      h.subtree = function(a) {
        if (a.e())
          return this;
        var b = this.children.get(K(a));
        return null !== b ? b.subtree(N(a)) : qe;
      };
      h.set = function(a, b) {
        if (a.e())
          return new qf(b, this.children);
        var c = K(a),
            d = (this.children.get(c) || qe).set(N(a), b),
            c = this.children.Sa(c, d);
        return new qf(this.value, c);
      };
      h.remove = function(a) {
        if (a.e())
          return this.children.e() ? qe : new qf(null, this.children);
        var b = K(a),
            c = this.children.get(b);
        return c ? (a = c.remove(N(a)), b = a.e() ? this.children.remove(b) : this.children.Sa(b, a), null === this.value && b.e() ? qe : new qf(this.value, b)) : this;
      };
      h.get = function(a) {
        if (a.e())
          return this.value;
        var b = this.children.get(K(a));
        return b ? b.get(N(a)) : null;
      };
      function pe(a, b, c) {
        if (b.e())
          return c;
        var d = K(b);
        b = pe(a.children.get(d) || qe, N(b), c);
        d = b.e() ? a.children.remove(d) : a.children.Sa(d, b);
        return new qf(a.value, d);
      }
      function vf(a, b) {
        return wf(a, M, b);
      }
      function wf(a, b, c) {
        var d = {};
        a.children.ka(function(a, f) {
          d[a] = wf(f, b.o(a), c);
        });
        return c(b, a.value, d);
      }
      function xf(a, b, c) {
        return yf(a, b, M, c);
      }
      function yf(a, b, c, d) {
        var e = a.value ? d(c, a.value) : !1;
        if (e)
          return e;
        if (b.e())
          return null;
        e = K(b);
        return (a = a.children.get(e)) ? yf(a, N(b), c.o(e), d) : null;
      }
      function zf(a, b, c) {
        Af(a, b, M, c);
      }
      function Af(a, b, c, d) {
        if (b.e())
          return a;
        a.value && d(c, a.value);
        var e = K(b);
        return (a = a.children.get(e)) ? Af(a, N(b), c.o(e), d) : qe;
      }
      function ne(a, b) {
        Bf(a, M, b);
      }
      function Bf(a, b, c) {
        a.children.ka(function(a, e) {
          Bf(e, b.o(a), c);
        });
        a.value && c(b, a.value);
      }
      function Cf(a, b) {
        a.children.ka(function(a, d) {
          d.value && b(a, d.value);
        });
      }
      var qe = new qf(null);
      qf.prototype.toString = function() {
        var a = {};
        ne(this, function(b, c) {
          a[b.toString()] = c.toString();
        });
        return G(a);
      };
      function Df(a, b, c) {
        this.type = ee;
        this.source = Ef;
        this.path = a;
        this.Ub = b;
        this.Yd = c;
      }
      Df.prototype.$c = function(a) {
        if (this.path.e()) {
          if (null != this.Ub.value)
            return O(this.Ub.children.e(), "affectedTree should not have overlapping affected paths."), this;
          a = this.Ub.subtree(new P(a));
          return new Df(M, a, this.Yd);
        }
        O(K(this.path) === a, "operationForChild called for unrelated child.");
        return new Df(N(this.path), this.Ub, this.Yd);
      };
      Df.prototype.toString = function() {
        return "Operation(" + this.path + ": " + this.source.toString() + " ack write revert=" + this.Yd + " affectedTree=" + this.Ub + ")";
      };
      var Bc = 0,
          be = 1,
          ee = 2,
          Dc = 3;
      function Ff(a, b, c, d) {
        this.Ae = a;
        this.tf = b;
        this.Lb = c;
        this.ef = d;
        O(!d || b, "Tagged queries must be from server.");
      }
      var Ef = new Ff(!0, !1, null, !1),
          Gf = new Ff(!1, !0, null, !1);
      Ff.prototype.toString = function() {
        return this.Ae ? "user" : this.ef ? "server(queryID=" + this.Lb + ")" : "server";
      };
      function Hf(a) {
        this.Z = a;
      }
      var If = new Hf(new qf(null));
      function Jf(a, b, c) {
        if (b.e())
          return new Hf(new qf(c));
        var d = uf(a.Z, b);
        if (null != d) {
          var e = d.path,
              d = d.value;
          b = lf(e, b);
          d = d.H(b, c);
          return new Hf(a.Z.set(e, d));
        }
        a = pe(a.Z, b, new qf(c));
        return new Hf(a);
      }
      function Kf(a, b, c) {
        var d = a;
        Fb(c, function(a, c) {
          d = Jf(d, b.o(a), c);
        });
        return d;
      }
      Hf.prototype.Ud = function(a) {
        if (a.e())
          return If;
        a = pe(this.Z, a, qe);
        return new Hf(a);
      };
      function Lf(a, b) {
        var c = uf(a.Z, b);
        return null != c ? a.Z.get(c.path).S(lf(c.path, b)) : null;
      }
      function Mf(a) {
        var b = [],
            c = a.Z.value;
        null != c ? c.L() || c.R(R, function(a, c) {
          b.push(new L(a, c));
        }) : a.Z.children.ka(function(a, c) {
          null != c.value && b.push(new L(a, c.value));
        });
        return b;
      }
      function Nf(a, b) {
        if (b.e())
          return a;
        var c = Lf(a, b);
        return null != c ? new Hf(new qf(c)) : new Hf(a.Z.subtree(b));
      }
      Hf.prototype.e = function() {
        return this.Z.e();
      };
      Hf.prototype.apply = function(a) {
        return Of(M, this.Z, a);
      };
      function Of(a, b, c) {
        if (null != b.value)
          return c.H(a, b.value);
        var d = null;
        b.children.ka(function(b, f) {
          ".priority" === b ? (O(null !== f.value, "Priority writes must always be leaf nodes"), d = f.value) : c = Of(a.o(b), f, c);
        });
        c.S(a).e() || null === d || (c = c.H(a.o(".priority"), d));
        return c;
      }
      ;
      function Pf() {
        this.V = If;
        this.pa = [];
        this.Pc = -1;
      }
      function Qf(a, b) {
        for (var c = 0; c < a.pa.length; c++) {
          var d = a.pa[c];
          if (d.md === b)
            return d;
        }
        return null;
      }
      h = Pf.prototype;
      h.Ud = function(a) {
        var b = Sa(this.pa, function(b) {
          return b.md === a;
        });
        O(0 <= b, "removeWrite called with nonexistent writeId.");
        var c = this.pa[b];
        this.pa.splice(b, 1);
        for (var d = c.visible,
            e = !1,
            f = this.pa.length - 1; d && 0 <= f; ) {
          var g = this.pa[f];
          g.visible && (f >= b && Rf(g, c.path) ? d = !1 : c.path.contains(g.path) && (e = !0));
          f--;
        }
        if (d) {
          if (e)
            this.V = Sf(this.pa, Tf, M), this.Pc = 0 < this.pa.length ? this.pa[this.pa.length - 1].md : -1;
          else if (c.Ja)
            this.V = this.V.Ud(c.path);
          else {
            var k = this;
            v(c.children, function(a, b) {
              k.V = k.V.Ud(c.path.o(b));
            });
          }
          return !0;
        }
        return !1;
      };
      h.Aa = function(a, b, c, d) {
        if (c || d) {
          var e = Nf(this.V, a);
          return !d && e.e() ? b : d || null != b || null != Lf(e, M) ? (e = Sf(this.pa, function(b) {
            return (b.visible || d) && (!c || !(0 <= La(c, b.md))) && (b.path.contains(a) || a.contains(b.path));
          }, a), b = b || H, e.apply(b)) : null;
        }
        e = Lf(this.V, a);
        if (null != e)
          return e;
        e = Nf(this.V, a);
        return e.e() ? b : null != b || null != Lf(e, M) ? (b = b || H, e.apply(b)) : null;
      };
      h.Cc = function(a, b) {
        var c = H,
            d = Lf(this.V, a);
        if (d)
          d.L() || d.R(R, function(a, b) {
            c = c.W(a, b);
          });
        else if (b) {
          var e = Nf(this.V, a);
          b.R(R, function(a, b) {
            var d = Nf(e, new P(a)).apply(b);
            c = c.W(a, d);
          });
          Ma(Mf(e), function(a) {
            c = c.W(a.name, a.U);
          });
        } else
          e = Nf(this.V, a), Ma(Mf(e), function(a) {
            c = c.W(a.name, a.U);
          });
        return c;
      };
      h.nd = function(a, b, c, d) {
        O(c || d, "Either existingEventSnap or existingServerSnap must exist");
        a = a.o(b);
        if (null != Lf(this.V, a))
          return null;
        a = Nf(this.V, a);
        return a.e() ? d.S(b) : a.apply(d.S(b));
      };
      h.Bc = function(a, b, c) {
        a = a.o(b);
        var d = Lf(this.V, a);
        return null != d ? d : Wb(c, b) ? Nf(this.V, a).apply(c.j().T(b)) : null;
      };
      h.xc = function(a) {
        return Lf(this.V, a);
      };
      h.qe = function(a, b, c, d, e, f) {
        var g;
        a = Nf(this.V, a);
        g = Lf(a, M);
        if (null == g)
          if (null != b)
            g = a.apply(b);
          else
            return [];
        g = g.pb(f);
        if (g.e() || g.L())
          return [];
        b = [];
        a = Vd(f);
        e = e ? g.dc(c, f) : g.bc(c, f);
        for (f = Ic(e); f && b.length < d; )
          0 !== a(f, c) && b.push(f), f = Ic(e);
        return b;
      };
      function Rf(a, b) {
        return a.Ja ? a.path.contains(b) : !!ta(a.children, function(c, d) {
          return a.path.o(d).contains(b);
        });
      }
      function Tf(a) {
        return a.visible;
      }
      function Sf(a, b, c) {
        for (var d = If,
            e = 0; e < a.length; ++e) {
          var f = a[e];
          if (b(f)) {
            var g = f.path;
            if (f.Ja)
              c.contains(g) ? (g = lf(c, g), d = Jf(d, g, f.Ja)) : g.contains(c) && (g = lf(g, c), d = Jf(d, M, f.Ja.S(g)));
            else if (f.children)
              if (c.contains(g))
                g = lf(c, g), d = Kf(d, g, f.children);
              else {
                if (g.contains(c))
                  if (g = lf(g, c), g.e())
                    d = Kf(d, M, f.children);
                  else if (f = z(f.children, K(g)))
                    f = f.S(N(g)), d = Jf(d, M, f);
              }
            else
              throw jd("WriteRecord should have .snap or .children");
          }
        }
        return d;
      }
      function Uf(a, b) {
        this.Qb = a;
        this.Z = b;
      }
      h = Uf.prototype;
      h.Aa = function(a, b, c) {
        return this.Z.Aa(this.Qb, a, b, c);
      };
      h.Cc = function(a) {
        return this.Z.Cc(this.Qb, a);
      };
      h.nd = function(a, b, c) {
        return this.Z.nd(this.Qb, a, b, c);
      };
      h.xc = function(a) {
        return this.Z.xc(this.Qb.o(a));
      };
      h.qe = function(a, b, c, d, e) {
        return this.Z.qe(this.Qb, a, b, c, d, e);
      };
      h.Bc = function(a, b) {
        return this.Z.Bc(this.Qb, a, b);
      };
      h.o = function(a) {
        return new Uf(this.Qb.o(a), this.Z);
      };
      function Vf() {
        this.children = {};
        this.pd = 0;
        this.value = null;
      }
      function Wf(a, b, c) {
        this.Jd = a ? a : "";
        this.Ha = b ? b : null;
        this.A = c ? c : new Vf;
      }
      function Xf(a, b) {
        for (var c = b instanceof P ? b : new P(b),
            d = a,
            e; null !== (e = K(c)); )
          d = new Wf(e, d, z(d.A.children, e) || new Vf), c = N(c);
        return d;
      }
      h = Wf.prototype;
      h.Ea = function() {
        return this.A.value;
      };
      function Yf(a, b) {
        O("undefined" !== typeof b, "Cannot set value to undefined");
        a.A.value = b;
        Zf(a);
      }
      h.clear = function() {
        this.A.value = null;
        this.A.children = {};
        this.A.pd = 0;
        Zf(this);
      };
      h.zd = function() {
        return 0 < this.A.pd;
      };
      h.e = function() {
        return null === this.Ea() && !this.zd();
      };
      h.R = function(a) {
        var b = this;
        v(this.A.children, function(c, d) {
          a(new Wf(d, b, c));
        });
      };
      function $f(a, b, c, d) {
        c && !d && b(a);
        a.R(function(a) {
          $f(a, b, !0, d);
        });
        c && d && b(a);
      }
      function ag(a, b) {
        for (var c = a.parent(); null !== c && !b(c); )
          c = c.parent();
      }
      h.path = function() {
        return new P(null === this.Ha ? this.Jd : this.Ha.path() + "/" + this.Jd);
      };
      h.name = function() {
        return this.Jd;
      };
      h.parent = function() {
        return this.Ha;
      };
      function Zf(a) {
        if (null !== a.Ha) {
          var b = a.Ha,
              c = a.Jd,
              d = a.e(),
              e = y(b.A.children, c);
          d && e ? (delete b.A.children[c], b.A.pd--, Zf(b)) : d || e || (b.A.children[c] = a.A, b.A.pd++, Zf(b));
        }
      }
      ;
      var bg = /[\[\].#$\/\u0000-\u001F\u007F]/,
          cg = /[\[\].#$\u0000-\u001F\u007F]/,
          dg = /^[a-zA-Z][a-zA-Z._\-+]+$/;
      function eg(a) {
        return q(a) && 0 !== a.length && !bg.test(a);
      }
      function fg(a) {
        return null === a || q(a) || fa(a) && !td(a) || ga(a) && y(a, ".sv");
      }
      function gg(a, b, c, d) {
        d && !p(b) || hg(E(a, 1, d), b, c);
      }
      function hg(a, b, c) {
        c instanceof P && (c = new nf(c, a));
        if (!p(b))
          throw Error(a + "contains undefined " + pf(c));
        if (r(b))
          throw Error(a + "contains a function " + pf(c) + " with contents: " + b.toString());
        if (td(b))
          throw Error(a + "contains " + b.toString() + " " + pf(c));
        if (q(b) && b.length > 10485760 / 3 && 10485760 < Pb(b))
          throw Error(a + "contains a string greater than 10485760 utf8 bytes " + pf(c) + " ('" + b.substring(0, 50) + "...')");
        if (ga(b)) {
          var d = !1,
              e = !1;
          Fb(b, function(b, g) {
            if (".value" === b)
              d = !0;
            else if (".priority" !== b && ".sv" !== b && (e = !0, !eg(b)))
              throw Error(a + " contains an invalid key (" + b + ") " + pf(c) + '.  Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
            c.push(b);
            hg(a, g, c);
            c.pop();
          });
          if (d && e)
            throw Error(a + ' contains ".value" child ' + pf(c) + " in addition to actual children.");
        }
      }
      function ig(a, b) {
        var c,
            d;
        for (c = 0; c < b.length; c++) {
          d = b[c];
          for (var e = d.slice(),
              f = 0; f < e.length; f++)
            if ((".priority" !== e[f] || f !== e.length - 1) && !eg(e[f]))
              throw Error(a + "contains an invalid key (" + e[f] + ") in path " + d.toString() + '. Keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]"');
        }
        b.sort(mf);
        e = null;
        for (c = 0; c < b.length; c++) {
          d = b[c];
          if (null !== e && e.contains(d))
            throw Error(a + "contains a path " + e.toString() + " that is ancestor of another path " + d.toString());
          e = d;
        }
      }
      function jg(a, b, c) {
        var d = E(a, 1, !1);
        if (!ga(b) || da(b))
          throw Error(d + " must be an object containing the children to replace.");
        var e = [];
        Fb(b, function(a, b) {
          var k = new P(a);
          hg(d, b, c.o(k));
          if (".priority" === me(k) && !fg(b))
            throw Error(d + "contains an invalid value for '" + k.toString() + "', which must be a valid Firebase priority (a string, finite number, server value, or null).");
          e.push(k);
        });
        ig(d, e);
      }
      function kg(a, b, c) {
        if (td(c))
          throw Error(E(a, b, !1) + "is " + c.toString() + ", but must be a valid Firebase priority (a string, finite number, server value, or null).");
        if (!fg(c))
          throw Error(E(a, b, !1) + "must be a valid Firebase priority (a string, finite number, server value, or null).");
      }
      function lg(a, b, c) {
        if (!c || p(b))
          switch (b) {
            case "value":
            case "child_added":
            case "child_removed":
            case "child_changed":
            case "child_moved":
              break;
            default:
              throw Error(E(a, 1, c) + 'must be a valid event type: "value", "child_added", "child_removed", "child_changed", or "child_moved".');
          }
      }
      function mg(a, b) {
        if (p(b) && !eg(b))
          throw Error(E(a, 2, !0) + 'was an invalid key: "' + b + '".  Firebase keys must be non-empty strings and can\'t contain ".", "#", "$", "/", "[", or "]").');
      }
      function ng(a, b) {
        if (!q(b) || 0 === b.length || cg.test(b))
          throw Error(E(a, 1, !1) + 'was an invalid path: "' + b + '". Paths must be non-empty strings and can\'t contain ".", "#", "$", "[", or "]"');
      }
      function og(a, b) {
        if (".info" === K(b))
          throw Error(a + " failed: Can't modify data under /.info/");
      }
      function pg(a, b) {
        if (!q(b))
          throw Error(E(a, 1, !1) + "must be a valid credential (a string).");
      }
      function qg(a, b, c) {
        if (!q(c))
          throw Error(E(a, b, !1) + "must be a valid string.");
      }
      function rg(a, b) {
        qg(a, 1, b);
        if (!dg.test(b))
          throw Error(E(a, 1, !1) + "'" + b + "' is not a valid authentication provider.");
      }
      function sg(a, b, c, d) {
        if (!d || p(c))
          if (!ga(c) || null === c)
            throw Error(E(a, b, d) + "must be a valid object.");
      }
      function tg(a, b, c) {
        if (!ga(b) || !y(b, c))
          throw Error(E(a, 1, !1) + 'must contain the key "' + c + '"');
        if (!q(z(b, c)))
          throw Error(E(a, 1, !1) + 'must contain the key "' + c + '" with type "string"');
      }
      ;
      function ug() {
        this.set = {};
      }
      h = ug.prototype;
      h.add = function(a, b) {
        this.set[a] = null !== b ? b : !0;
      };
      h.contains = function(a) {
        return y(this.set, a);
      };
      h.get = function(a) {
        return this.contains(a) ? this.set[a] : void 0;
      };
      h.remove = function(a) {
        delete this.set[a];
      };
      h.clear = function() {
        this.set = {};
      };
      h.e = function() {
        return va(this.set);
      };
      h.count = function() {
        return oa(this.set);
      };
      function vg(a, b) {
        v(a.set, function(a, d) {
          b(d, a);
        });
      }
      h.keys = function() {
        var a = [];
        v(this.set, function(b, c) {
          a.push(c);
        });
        return a;
      };
      function Vc() {
        this.m = this.B = null;
      }
      Vc.prototype.find = function(a) {
        if (null != this.B)
          return this.B.S(a);
        if (a.e() || null == this.m)
          return null;
        var b = K(a);
        a = N(a);
        return this.m.contains(b) ? this.m.get(b).find(a) : null;
      };
      Vc.prototype.rc = function(a, b) {
        if (a.e())
          this.B = b, this.m = null;
        else if (null !== this.B)
          this.B = this.B.H(a, b);
        else {
          null == this.m && (this.m = new ug);
          var c = K(a);
          this.m.contains(c) || this.m.add(c, new Vc);
          c = this.m.get(c);
          a = N(a);
          c.rc(a, b);
        }
      };
      function wg(a, b) {
        if (b.e())
          return a.B = null, a.m = null, !0;
        if (null !== a.B) {
          if (a.B.L())
            return !1;
          var c = a.B;
          a.B = null;
          c.R(R, function(b, c) {
            a.rc(new P(b), c);
          });
          return wg(a, b);
        }
        return null !== a.m ? (c = K(b), b = N(b), a.m.contains(c) && wg(a.m.get(c), b) && a.m.remove(c), a.m.e() ? (a.m = null, !0) : !1) : !0;
      }
      function Wc(a, b, c) {
        null !== a.B ? c(b, a.B) : a.R(function(a, e) {
          var f = new P(b.toString() + "/" + a);
          Wc(e, f, c);
        });
      }
      Vc.prototype.R = function(a) {
        null !== this.m && vg(this.m, function(b, c) {
          a(b, c);
        });
      };
      var xg = "auth.firebase.com";
      function yg(a, b, c) {
        this.qd = a || {};
        this.he = b || {};
        this.fb = c || {};
        this.qd.remember || (this.qd.remember = "default");
      }
      var zg = ["remember", "redirectTo"];
      function Ag(a) {
        var b = {},
            c = {};
        Fb(a || {}, function(a, e) {
          0 <= La(zg, a) ? b[a] = e : c[a] = e;
        });
        return new yg(b, {}, c);
      }
      ;
      function Bg(a, b) {
        this.Ue = ["session", a.Rd, a.lc].join(":");
        this.ee = b;
      }
      Bg.prototype.set = function(a, b) {
        if (!b)
          if (this.ee.length)
            b = this.ee[0];
          else
            throw Error("fb.login.SessionManager : No storage options available!");
        b.set(this.Ue, a);
      };
      Bg.prototype.get = function() {
        var a = Oa(this.ee, u(this.Bg, this)),
            a = Na(a, function(a) {
              return null !== a;
            });
        Va(a, function(a, c) {
          return Dd(c.token) - Dd(a.token);
        });
        return 0 < a.length ? a.shift() : null;
      };
      Bg.prototype.Bg = function(a) {
        try {
          var b = a.get(this.Ue);
          if (b && b.token)
            return b;
        } catch (c) {}
        return null;
      };
      Bg.prototype.clear = function() {
        var a = this;
        Ma(this.ee, function(b) {
          b.remove(a.Ue);
        });
      };
      function Cg() {
        return "undefined" !== typeof navigator && "string" === typeof navigator.userAgent ? navigator.userAgent : "";
      }
      function Dg() {
        return "undefined" !== typeof window && !!(window.cordova || window.phonegap || window.PhoneGap) && /ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(Cg());
      }
      function Eg() {
        return "undefined" !== typeof location && /^file:\//.test(location.href);
      }
      function Fg(a) {
        var b = Cg();
        if ("" === b)
          return !1;
        if ("Microsoft Internet Explorer" === navigator.appName) {
          if ((b = b.match(/MSIE ([0-9]{1,}[\.0-9]{0,})/)) && 1 < b.length)
            return parseFloat(b[1]) >= a;
        } else if (-1 < b.indexOf("Trident") && (b = b.match(/rv:([0-9]{2,2}[\.0-9]{0,})/)) && 1 < b.length)
          return parseFloat(b[1]) >= a;
        return !1;
      }
      ;
      function Gg() {
        var a = window.opener.frames,
            b;
        for (b = a.length - 1; 0 <= b; b--)
          try {
            if (a[b].location.protocol === window.location.protocol && a[b].location.host === window.location.host && "__winchan_relay_frame" === a[b].name)
              return a[b];
          } catch (c) {}
        return null;
      }
      function Hg(a, b, c) {
        a.attachEvent ? a.attachEvent("on" + b, c) : a.addEventListener && a.addEventListener(b, c, !1);
      }
      function Ig(a, b, c) {
        a.detachEvent ? a.detachEvent("on" + b, c) : a.removeEventListener && a.removeEventListener(b, c, !1);
      }
      function Jg(a) {
        /^https?:\/\//.test(a) || (a = window.location.href);
        var b = /^(https?:\/\/[\-_a-zA-Z\.0-9:]+)/.exec(a);
        return b ? b[1] : a;
      }
      function Kg(a) {
        var b = "";
        try {
          a = a.replace(/.*\?/, "");
          var c = Jb(a);
          c && y(c, "__firebase_request_key") && (b = z(c, "__firebase_request_key"));
        } catch (d) {}
        return b;
      }
      function Lg() {
        try {
          var a = document.location.hash.replace(/&__firebase_request_key=([a-zA-z0-9]*)/, ""),
              a = a.replace(/\?$/, ""),
              a = a.replace(/^#+$/, "");
          document.location.hash = a;
        } catch (b) {}
      }
      function Mg() {
        var a = sd(xg);
        return a.scheme + "://" + a.host + "/v2";
      }
      function Ng(a) {
        return Mg() + "/" + a + "/auth/channel";
      }
      ;
      function Og(a) {
        var b = this;
        this.hb = a;
        this.fe = "*";
        Fg(8) ? this.Uc = this.Cd = Gg() : (this.Uc = window.opener, this.Cd = window);
        if (!b.Uc)
          throw "Unable to find relay frame";
        Hg(this.Cd, "message", u(this.nc, this));
        Hg(this.Cd, "message", u(this.Ff, this));
        try {
          Pg(this, {a: "ready"});
        } catch (c) {
          Hg(this.Uc, "load", function() {
            Pg(b, {a: "ready"});
          });
        }
        Hg(window, "unload", u(this.Ng, this));
      }
      function Pg(a, b) {
        b = G(b);
        Fg(8) ? a.Uc.doPost(b, a.fe) : a.Uc.postMessage(b, a.fe);
      }
      Og.prototype.nc = function(a) {
        var b = this,
            c;
        try {
          c = Rb(a.data);
        } catch (d) {}
        c && "request" === c.a && (Ig(window, "message", this.nc), this.fe = a.origin, this.hb && setTimeout(function() {
          b.hb(b.fe, c.d, function(a, c) {
            b.mg = !c;
            b.hb = void 0;
            Pg(b, {
              a: "response",
              d: a,
              forceKeepWindowOpen: c
            });
          });
        }, 0));
      };
      Og.prototype.Ng = function() {
        try {
          Ig(this.Cd, "message", this.Ff);
        } catch (a) {}
        this.hb && (Pg(this, {
          a: "error",
          d: "unknown closed window"
        }), this.hb = void 0);
        try {
          window.close();
        } catch (b) {}
      };
      Og.prototype.Ff = function(a) {
        if (this.mg && "die" === a.data)
          try {
            window.close();
          } catch (b) {}
      };
      function Qg(a) {
        this.tc = Fa() + Fa() + Fa();
        this.Kf = a;
      }
      Qg.prototype.open = function(a, b) {
        cd.set("redirect_request_id", this.tc);
        cd.set("redirect_request_id", this.tc);
        b.requestId = this.tc;
        b.redirectTo = b.redirectTo || window.location.href;
        a += (/\?/.test(a) ? "" : "?") + Ib(b);
        window.location = a;
      };
      Qg.isAvailable = function() {
        return !Eg() && !Dg();
      };
      Qg.prototype.Fc = function() {
        return "redirect";
      };
      var Rg = {
        NETWORK_ERROR: "Unable to contact the Firebase server.",
        SERVER_ERROR: "An unknown server error occurred.",
        TRANSPORT_UNAVAILABLE: "There are no login transports available for the requested method.",
        REQUEST_INTERRUPTED: "The browser redirected the page before the login request could complete.",
        USER_CANCELLED: "The user cancelled authentication."
      };
      function Sg(a) {
        var b = Error(z(Rg, a), a);
        b.code = a;
        return b;
      }
      ;
      function Tg(a) {
        var b;
        (b = !a.window_features) || (b = Cg(), b = -1 !== b.indexOf("Fennec/") || -1 !== b.indexOf("Firefox/") && -1 !== b.indexOf("Android"));
        b && (a.window_features = void 0);
        a.window_name || (a.window_name = "_blank");
        this.options = a;
      }
      Tg.prototype.open = function(a, b, c) {
        function d(a) {
          g && (document.body.removeChild(g), g = void 0);
          t && (t = clearInterval(t));
          Ig(window, "message", e);
          Ig(window, "unload", d);
          if (l && !a)
            try {
              l.close();
            } catch (b) {
              k.postMessage("die", m);
            }
          l = k = void 0;
        }
        function e(a) {
          if (a.origin === m)
            try {
              var b = Rb(a.data);
              "ready" === b.a ? k.postMessage(A, m) : "error" === b.a ? (d(!1), c && (c(b.d), c = null)) : "response" === b.a && (d(b.forceKeepWindowOpen), c && (c(null, b.d), c = null));
            } catch (e) {}
        }
        var f = Fg(8),
            g,
            k;
        if (!this.options.relay_url)
          return c(Error("invalid arguments: origin of url and relay_url must match"));
        var m = Jg(a);
        if (m !== Jg(this.options.relay_url))
          c && setTimeout(function() {
            c(Error("invalid arguments: origin of url and relay_url must match"));
          }, 0);
        else {
          f && (g = document.createElement("iframe"), g.setAttribute("src", this.options.relay_url), g.style.display = "none", g.setAttribute("name", "__winchan_relay_frame"), document.body.appendChild(g), k = g.contentWindow);
          a += (/\?/.test(a) ? "" : "?") + Ib(b);
          var l = window.open(a, this.options.window_name, this.options.window_features);
          k || (k = l);
          var t = setInterval(function() {
            l && l.closed && (d(!1), c && (c(Sg("USER_CANCELLED")), c = null));
          }, 500),
              A = G({
                a: "request",
                d: b
              });
          Hg(window, "unload", d);
          Hg(window, "message", e);
        }
      };
      Tg.isAvailable = function() {
        var a;
        if (a = "postMessage" in window && !Eg())
          (a = Dg() || "undefined" !== typeof navigator && (!!Cg().match(/Windows Phone/) || !!window.Windows && /^ms-appx:/.test(location.href))) || (a = Cg(), a = "undefined" !== typeof navigator && "undefined" !== typeof window && !!(a.match(/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i) || a.match(/CriOS/) || a.match(/Twitter for iPhone/) || a.match(/FBAN\/FBIOS/) || window.navigator.standalone)), a = !a;
        return a && !Cg().match(/PhantomJS/);
      };
      Tg.prototype.Fc = function() {
        return "popup";
      };
      function Ug(a) {
        a.method || (a.method = "GET");
        a.headers || (a.headers = {});
        a.headers.content_type || (a.headers.content_type = "application/json");
        a.headers.content_type = a.headers.content_type.toLowerCase();
        this.options = a;
      }
      Ug.prototype.open = function(a, b, c) {
        function d() {
          c && (c(Sg("REQUEST_INTERRUPTED")), c = null);
        }
        var e = new XMLHttpRequest,
            f = this.options.method.toUpperCase(),
            g;
        Hg(window, "beforeunload", d);
        e.onreadystatechange = function() {
          if (c && 4 === e.readyState) {
            var a;
            if (200 <= e.status && 300 > e.status) {
              try {
                a = Rb(e.responseText);
              } catch (b) {}
              c(null, a);
            } else
              500 <= e.status && 600 > e.status ? c(Sg("SERVER_ERROR")) : c(Sg("NETWORK_ERROR"));
            c = null;
            Ig(window, "beforeunload", d);
          }
        };
        if ("GET" === f)
          a += (/\?/.test(a) ? "" : "?") + Ib(b), g = null;
        else {
          var k = this.options.headers.content_type;
          "application/json" === k && (g = G(b));
          "application/x-www-form-urlencoded" === k && (g = Ib(b));
        }
        e.open(f, a, !0);
        a = {
          "X-Requested-With": "XMLHttpRequest",
          Accept: "application/json;text/plain"
        };
        ya(a, this.options.headers);
        for (var m in a)
          e.setRequestHeader(m, a[m]);
        e.send(g);
      };
      Ug.isAvailable = function() {
        var a;
        if (a = !!window.XMLHttpRequest)
          a = Cg(), a = !(a.match(/MSIE/) || a.match(/Trident/)) || Fg(10);
        return a;
      };
      Ug.prototype.Fc = function() {
        return "json";
      };
      function Vg(a) {
        this.tc = Fa() + Fa() + Fa();
        this.Kf = a;
      }
      Vg.prototype.open = function(a, b, c) {
        function d() {
          c && (c(Sg("USER_CANCELLED")), c = null);
        }
        var e = this,
            f = sd(xg),
            g;
        b.requestId = this.tc;
        b.redirectTo = f.scheme + "://" + f.host + "/blank/page.html";
        a += /\?/.test(a) ? "" : "?";
        a += Ib(b);
        (g = window.open(a, "_blank", "location=no")) && r(g.addEventListener) ? (g.addEventListener("loadstart", function(a) {
          var b;
          if (b = a && a.url)
            a: {
              try {
                var l = document.createElement("a");
                l.href = a.url;
                b = l.host === f.host && "/blank/page.html" === l.pathname;
                break a;
              } catch (t) {}
              b = !1;
            }
          b && (a = Kg(a.url), g.removeEventListener("exit", d), g.close(), a = new yg(null, null, {
            requestId: e.tc,
            requestKey: a
          }), e.Kf.requestWithCredential("/auth/session", a, c), c = null);
        }), g.addEventListener("exit", d)) : c(Sg("TRANSPORT_UNAVAILABLE"));
      };
      Vg.isAvailable = function() {
        return Dg();
      };
      Vg.prototype.Fc = function() {
        return "redirect";
      };
      function Wg(a) {
        a.callback_parameter || (a.callback_parameter = "callback");
        this.options = a;
        window.__firebase_auth_jsonp = window.__firebase_auth_jsonp || {};
      }
      Wg.prototype.open = function(a, b, c) {
        function d() {
          c && (c(Sg("REQUEST_INTERRUPTED")), c = null);
        }
        function e() {
          setTimeout(function() {
            window.__firebase_auth_jsonp[f] = void 0;
            va(window.__firebase_auth_jsonp) && (window.__firebase_auth_jsonp = void 0);
            try {
              var a = document.getElementById(f);
              a && a.parentNode.removeChild(a);
            } catch (b) {}
          }, 1);
          Ig(window, "beforeunload", d);
        }
        var f = "fn" + (new Date).getTime() + Math.floor(99999 * Math.random());
        b[this.options.callback_parameter] = "__firebase_auth_jsonp." + f;
        a += (/\?/.test(a) ? "" : "?") + Ib(b);
        Hg(window, "beforeunload", d);
        window.__firebase_auth_jsonp[f] = function(a) {
          c && (c(null, a), c = null);
          e();
        };
        Xg(f, a, c);
      };
      function Xg(a, b, c) {
        setTimeout(function() {
          try {
            var d = document.createElement("script");
            d.type = "text/javascript";
            d.id = a;
            d.async = !0;
            d.src = b;
            d.onerror = function() {
              var b = document.getElementById(a);
              null !== b && b.parentNode.removeChild(b);
              c && c(Sg("NETWORK_ERROR"));
            };
            var e = document.getElementsByTagName("head");
            (e && 0 != e.length ? e[0] : document.documentElement).appendChild(d);
          } catch (f) {
            c && c(Sg("NETWORK_ERROR"));
          }
        }, 0);
      }
      Wg.isAvailable = function() {
        return "undefined" !== typeof document && null != document.createElement;
      };
      Wg.prototype.Fc = function() {
        return "json";
      };
      function Yg(a, b, c, d) {
        ff.call(this, ["auth_status"]);
        this.G = a;
        this.hf = b;
        this.ih = c;
        this.Pe = d;
        this.wc = new Bg(a, [bd, cd]);
        this.qb = null;
        this.We = !1;
        Zg(this);
      }
      ka(Yg, ff);
      h = Yg.prototype;
      h.Be = function() {
        return this.qb || null;
      };
      function Zg(a) {
        cd.get("redirect_request_id") && $g(a);
        var b = a.wc.get();
        b && b.token ? (ah(a, b), a.hf(b.token, function(c, d) {
          bh(a, c, d, !1, b.token, b);
        }, function(b, d) {
          ch(a, "resumeSession()", b, d);
        })) : ah(a, null);
      }
      function dh(a, b, c, d, e, f) {
        "firebaseio-demo.com" === a.G.domain && S("Firebase authentication is not supported on demo Firebases (*.firebaseio-demo.com). To secure your Firebase, create a production Firebase at https://www.firebase.com.");
        a.hf(b, function(f, k) {
          bh(a, f, k, !0, b, c, d || {}, e);
        }, function(b, c) {
          ch(a, "auth()", b, c, f);
        });
      }
      function eh(a, b) {
        a.wc.clear();
        ah(a, null);
        a.ih(function(a, d) {
          if ("ok" === a)
            T(b, null);
          else {
            var e = (a || "error").toUpperCase(),
                f = e;
            d && (f += ": " + d);
            f = Error(f);
            f.code = e;
            T(b, f);
          }
        });
      }
      function bh(a, b, c, d, e, f, g, k) {
        "ok" === b ? (d && (b = c.auth, f.auth = b, f.expires = c.expires, f.token = Ed(e) ? e : "", c = null, b && y(b, "uid") ? c = z(b, "uid") : y(f, "uid") && (c = z(f, "uid")), f.uid = c, c = "custom", b && y(b, "provider") ? c = z(b, "provider") : y(f, "provider") && (c = z(f, "provider")), f.provider = c, a.wc.clear(), Ed(e) && (g = g || {}, c = bd, "sessionOnly" === g.remember && (c = cd), "none" !== g.remember && a.wc.set(f, c)), ah(a, f)), T(k, null, f)) : (a.wc.clear(), ah(a, null), f = a = (b || "error").toUpperCase(), c && (f += ": " + c), f = Error(f), f.code = a, T(k, f));
      }
      function ch(a, b, c, d, e) {
        S(b + " was canceled: " + d);
        a.wc.clear();
        ah(a, null);
        a = Error(d);
        a.code = c.toUpperCase();
        T(e, a);
      }
      function fh(a, b, c, d, e) {
        gh(a);
        c = new yg(d || {}, {}, c || {});
        hh(a, [Ug, Wg], "/auth/" + b, c, e);
      }
      function ih(a, b, c, d) {
        gh(a);
        var e = [Tg, Vg];
        c = Ag(c);
        var f = 625;
        "anonymous" === b || "password" === b ? setTimeout(function() {
          T(d, Sg("TRANSPORT_UNAVAILABLE"));
        }, 0) : ("github" === b && (f = 1025), c.he.window_features = "menubar=yes,modal=yes,alwaysRaised=yeslocation=yes,resizable=yes,scrollbars=yes,status=yes,height=625,width=" + f + ",top=" + ("object" === typeof screen ? .5 * (screen.height - 625) : 0) + ",left=" + ("object" === typeof screen ? .5 * (screen.width - f) : 0), c.he.relay_url = Ng(a.G.lc), c.he.requestWithCredential = u(a.uc, a), hh(a, e, "/auth/" + b, c, d));
      }
      function $g(a) {
        var b = cd.get("redirect_request_id");
        if (b) {
          var c = cd.get("redirect_client_options");
          cd.remove("redirect_request_id");
          cd.remove("redirect_client_options");
          var d = [Ug, Wg],
              b = {
                requestId: b,
                requestKey: Kg(document.location.hash)
              },
              c = new yg(c, {}, b);
          a.We = !0;
          Lg();
          hh(a, d, "/auth/session", c, function() {
            this.We = !1;
          }.bind(a));
        }
      }
      h.ve = function(a, b) {
        gh(this);
        var c = Ag(a);
        c.fb._method = "POST";
        this.uc("/users", c, function(a, c) {
          a ? T(b, a) : T(b, a, c);
        });
      };
      h.Xe = function(a, b) {
        var c = this;
        gh(this);
        var d = "/users/" + encodeURIComponent(a.email),
            e = Ag(a);
        e.fb._method = "DELETE";
        this.uc(d, e, function(a, d) {
          !a && d && d.uid && c.qb && c.qb.uid && c.qb.uid === d.uid && eh(c);
          T(b, a);
        });
      };
      h.se = function(a, b) {
        gh(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password",
            d = Ag(a);
        d.fb._method = "PUT";
        d.fb.password = a.newPassword;
        this.uc(c, d, function(a) {
          T(b, a);
        });
      };
      h.re = function(a, b) {
        gh(this);
        var c = "/users/" + encodeURIComponent(a.oldEmail) + "/email",
            d = Ag(a);
        d.fb._method = "PUT";
        d.fb.email = a.newEmail;
        d.fb.password = a.password;
        this.uc(c, d, function(a) {
          T(b, a);
        });
      };
      h.Ze = function(a, b) {
        gh(this);
        var c = "/users/" + encodeURIComponent(a.email) + "/password",
            d = Ag(a);
        d.fb._method = "POST";
        this.uc(c, d, function(a) {
          T(b, a);
        });
      };
      h.uc = function(a, b, c) {
        jh(this, [Ug, Wg], a, b, c);
      };
      function hh(a, b, c, d, e) {
        jh(a, b, c, d, function(b, c) {
          !b && c && c.token && c.uid ? dh(a, c.token, c, d.qd, function(a, b) {
            a ? T(e, a) : T(e, null, b);
          }) : T(e, b || Sg("UNKNOWN_ERROR"));
        });
      }
      function jh(a, b, c, d, e) {
        b = Na(b, function(a) {
          return "function" === typeof a.isAvailable && a.isAvailable();
        });
        0 === b.length ? setTimeout(function() {
          T(e, Sg("TRANSPORT_UNAVAILABLE"));
        }, 0) : (b = new (b.shift())(d.he), d = Gb(d.fb), d.v = "js-" + Eb, d.transport = b.Fc(), d.suppress_status_codes = !0, a = Mg() + "/" + a.G.lc + c, b.open(a, d, function(a, b) {
          if (a)
            T(e, a);
          else if (b && b.error) {
            var c = Error(b.error.message);
            c.code = b.error.code;
            c.details = b.error.details;
            T(e, c);
          } else
            T(e, null, b);
        }));
      }
      function ah(a, b) {
        var c = null !== a.qb || null !== b;
        a.qb = b;
        c && a.ie("auth_status", b);
        a.Pe(null !== b);
      }
      h.Ee = function(a) {
        O("auth_status" === a, 'initial event must be of type "auth_status"');
        return this.We ? null : [this.qb];
      };
      function gh(a) {
        var b = a.G;
        if ("firebaseio.com" !== b.domain && "firebaseio-demo.com" !== b.domain && "auth.firebase.com" === xg)
          throw Error("This custom Firebase server ('" + a.G.domain + "') does not support delegated login.");
      }
      ;
      var gd = "websocket",
          hd = "long_polling";
      function kh(a) {
        this.nc = a;
        this.Qd = [];
        this.Wb = 0;
        this.te = -1;
        this.Jb = null;
      }
      function lh(a, b, c) {
        a.te = b;
        a.Jb = c;
        a.te < a.Wb && (a.Jb(), a.Jb = null);
      }
      function mh(a, b, c) {
        for (a.Qd[b] = c; a.Qd[a.Wb]; ) {
          var d = a.Qd[a.Wb];
          delete a.Qd[a.Wb];
          for (var e = 0; e < d.length; ++e)
            if (d[e]) {
              var f = a;
              gc(function() {
                f.nc(d[e]);
              });
            }
          if (a.Wb === a.te) {
            a.Jb && (clearTimeout(a.Jb), a.Jb(), a.Jb = null);
            break;
          }
          a.Wb++;
        }
      }
      ;
      function nh(a, b, c, d) {
        this.ue = a;
        this.f = pd(a);
        this.rb = this.sb = 0;
        this.Xa = uc(b);
        this.Xf = c;
        this.Kc = !1;
        this.Fb = d;
        this.ld = function(a) {
          return fd(b, hd, a);
        };
      }
      var oh,
          ph;
      nh.prototype.open = function(a, b) {
        this.mf = 0;
        this.na = b;
        this.Ef = new kh(a);
        this.Db = !1;
        var c = this;
        this.ub = setTimeout(function() {
          c.f("Timed out trying to connect.");
          c.bb();
          c.ub = null;
        }, Math.floor(3E4));
        ud(function() {
          if (!c.Db) {
            c.Wa = new qh(function(a, b, d, k, m) {
              rh(c, arguments);
              if (c.Wa)
                if (c.ub && (clearTimeout(c.ub), c.ub = null), c.Kc = !0, "start" == a)
                  c.id = b, c.Mf = d;
                else if ("close" === a)
                  b ? (c.Wa.$d = !1, lh(c.Ef, b, function() {
                    c.bb();
                  })) : c.bb();
                else
                  throw Error("Unrecognized command received: " + a);
            }, function(a, b) {
              rh(c, arguments);
              mh(c.Ef, a, b);
            }, function() {
              c.bb();
            }, c.ld);
            var a = {start: "t"};
            a.ser = Math.floor(1E8 * Math.random());
            c.Wa.ke && (a.cb = c.Wa.ke);
            a.v = "5";
            c.Xf && (a.s = c.Xf);
            c.Fb && (a.ls = c.Fb);
            "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (a.r = "f");
            a = c.ld(a);
            c.f("Connecting via long-poll to " + a);
            sh(c.Wa, a, function() {});
          }
        });
      };
      nh.prototype.start = function() {
        var a = this.Wa,
            b = this.Mf;
        a.Gg = this.id;
        a.Hg = b;
        for (a.oe = !0; th(a); )
          ;
        a = this.id;
        b = this.Mf;
        this.kc = document.createElement("iframe");
        var c = {dframe: "t"};
        c.id = a;
        c.pw = b;
        this.kc.src = this.ld(c);
        this.kc.style.display = "none";
        document.body.appendChild(this.kc);
      };
      nh.isAvailable = function() {
        return oh || !ph && "undefined" !== typeof document && null != document.createElement && !("object" === typeof window && window.chrome && window.chrome.extension && !/^chrome/.test(window.location.href)) && !("object" === typeof Windows && "object" === typeof Windows.kh) && !0;
      };
      h = nh.prototype;
      h.Hd = function() {};
      h.fd = function() {
        this.Db = !0;
        this.Wa && (this.Wa.close(), this.Wa = null);
        this.kc && (document.body.removeChild(this.kc), this.kc = null);
        this.ub && (clearTimeout(this.ub), this.ub = null);
      };
      h.bb = function() {
        this.Db || (this.f("Longpoll is closing itself"), this.fd(), this.na && (this.na(this.Kc), this.na = null));
      };
      h.close = function() {
        this.Db || (this.f("Longpoll is being closed."), this.fd());
      };
      h.send = function(a) {
        a = G(a);
        this.sb += a.length;
        rc(this.Xa, "bytes_sent", a.length);
        a = Ob(a);
        a = nb(a, !0);
        a = yd(a, 1840);
        for (var b = 0; b < a.length; b++) {
          var c = this.Wa;
          c.cd.push({
            Yg: this.mf,
            hh: a.length,
            of: a[b]
          });
          c.oe && th(c);
          this.mf++;
        }
      };
      function rh(a, b) {
        var c = G(b).length;
        a.rb += c;
        rc(a.Xa, "bytes_received", c);
      }
      function qh(a, b, c, d) {
        this.ld = d;
        this.lb = c;
        this.Te = new ug;
        this.cd = [];
        this.we = Math.floor(1E8 * Math.random());
        this.$d = !0;
        this.ke = id();
        window["pLPCommand" + this.ke] = a;
        window["pRTLPCB" + this.ke] = b;
        a = document.createElement("iframe");
        a.style.display = "none";
        if (document.body) {
          document.body.appendChild(a);
          try {
            a.contentWindow.document || fc("No IE domain setting required");
          } catch (e) {
            a.src = "javascript:void((function(){document.open();document.domain='" + document.domain + "';document.close();})())";
          }
        } else
          throw "Document body has not initialized. Wait to initialize Firebase until after the document is ready.";
        a.contentDocument ? a.jb = a.contentDocument : a.contentWindow ? a.jb = a.contentWindow.document : a.document && (a.jb = a.document);
        this.Ga = a;
        a = "";
        this.Ga.src && "javascript:" === this.Ga.src.substr(0, 11) && (a = '<script>document.domain="' + document.domain + '";\x3c/script>');
        a = "<html><body>" + a + "</body></html>";
        try {
          this.Ga.jb.open(), this.Ga.jb.write(a), this.Ga.jb.close();
        } catch (f) {
          fc("frame writing exception"), f.stack && fc(f.stack), fc(f);
        }
      }
      qh.prototype.close = function() {
        this.oe = !1;
        if (this.Ga) {
          this.Ga.jb.body.innerHTML = "";
          var a = this;
          setTimeout(function() {
            null !== a.Ga && (document.body.removeChild(a.Ga), a.Ga = null);
          }, Math.floor(0));
        }
        var b = this.lb;
        b && (this.lb = null, b());
      };
      function th(a) {
        if (a.oe && a.$d && a.Te.count() < (0 < a.cd.length ? 2 : 1)) {
          a.we++;
          var b = {};
          b.id = a.Gg;
          b.pw = a.Hg;
          b.ser = a.we;
          for (var b = a.ld(b),
              c = "",
              d = 0; 0 < a.cd.length; )
            if (1870 >= a.cd[0].of.length + 30 + c.length) {
              var e = a.cd.shift(),
                  c = c + "&seg" + d + "=" + e.Yg + "&ts" + d + "=" + e.hh + "&d" + d + "=" + e.of;
              d++;
            } else
              break;
          uh(a, b + c, a.we);
          return !0;
        }
        return !1;
      }
      function uh(a, b, c) {
        function d() {
          a.Te.remove(c);
          th(a);
        }
        a.Te.add(c, 1);
        var e = setTimeout(d, Math.floor(25E3));
        sh(a, b, function() {
          clearTimeout(e);
          d();
        });
      }
      function sh(a, b, c) {
        setTimeout(function() {
          try {
            if (a.$d) {
              var d = a.Ga.jb.createElement("script");
              d.type = "text/javascript";
              d.async = !0;
              d.src = b;
              d.onload = d.onreadystatechange = function() {
                var a = d.readyState;
                a && "loaded" !== a && "complete" !== a || (d.onload = d.onreadystatechange = null, d.parentNode && d.parentNode.removeChild(d), c());
              };
              d.onerror = function() {
                fc("Long-poll script failed to load: " + b);
                a.$d = !1;
                a.close();
              };
              a.Ga.jb.body.appendChild(d);
            }
          } catch (e) {}
        }, Math.floor(1));
      }
      ;
      var vh = null;
      "undefined" !== typeof MozWebSocket ? vh = MozWebSocket : "undefined" !== typeof WebSocket && (vh = WebSocket);
      function wh(a, b, c, d) {
        this.ue = a;
        this.f = pd(this.ue);
        this.frames = this.Nc = null;
        this.rb = this.sb = this.ff = 0;
        this.Xa = uc(b);
        a = {v: "5"};
        "undefined" !== typeof location && location.href && -1 !== location.href.indexOf("firebaseio.com") && (a.r = "f");
        c && (a.s = c);
        d && (a.ls = d);
        this.jf = fd(b, gd, a);
      }
      var xh;
      wh.prototype.open = function(a, b) {
        this.lb = b;
        this.Lg = a;
        this.f("Websocket connecting to " + this.jf);
        this.Kc = !1;
        bd.set("previous_websocket_failure", !0);
        try {
          this.La = new vh(this.jf);
        } catch (c) {
          this.f("Error instantiating WebSocket.");
          var d = c.message || c.data;
          d && this.f(d);
          this.bb();
          return;
        }
        var e = this;
        this.La.onopen = function() {
          e.f("Websocket connected.");
          e.Kc = !0;
        };
        this.La.onclose = function() {
          e.f("Websocket connection was disconnected.");
          e.La = null;
          e.bb();
        };
        this.La.onmessage = function(a) {
          if (null !== e.La)
            if (a = a.data, e.rb += a.length, rc(e.Xa, "bytes_received", a.length), yh(e), null !== e.frames)
              zh(e, a);
            else {
              a: {
                O(null === e.frames, "We already have a frame buffer");
                if (6 >= a.length) {
                  var b = Number(a);
                  if (!isNaN(b)) {
                    e.ff = b;
                    e.frames = [];
                    a = null;
                    break a;
                  }
                }
                e.ff = 1;
                e.frames = [];
              }
              null !== a && zh(e, a);
            }
        };
        this.La.onerror = function(a) {
          e.f("WebSocket error.  Closing connection.");
          (a = a.message || a.data) && e.f(a);
          e.bb();
        };
      };
      wh.prototype.start = function() {};
      wh.isAvailable = function() {
        var a = !1;
        if ("undefined" !== typeof navigator && navigator.userAgent) {
          var b = navigator.userAgent.match(/Android ([0-9]{0,}\.[0-9]{0,})/);
          b && 1 < b.length && 4.4 > parseFloat(b[1]) && (a = !0);
        }
        return !a && null !== vh && !xh;
      };
      wh.responsesRequiredToBeHealthy = 2;
      wh.healthyTimeout = 3E4;
      h = wh.prototype;
      h.Hd = function() {
        bd.remove("previous_websocket_failure");
      };
      function zh(a, b) {
        a.frames.push(b);
        if (a.frames.length == a.ff) {
          var c = a.frames.join("");
          a.frames = null;
          c = Rb(c);
          a.Lg(c);
        }
      }
      h.send = function(a) {
        yh(this);
        a = G(a);
        this.sb += a.length;
        rc(this.Xa, "bytes_sent", a.length);
        a = yd(a, 16384);
        1 < a.length && Ah(this, String(a.length));
        for (var b = 0; b < a.length; b++)
          Ah(this, a[b]);
      };
      h.fd = function() {
        this.Db = !0;
        this.Nc && (clearInterval(this.Nc), this.Nc = null);
        this.La && (this.La.close(), this.La = null);
      };
      h.bb = function() {
        this.Db || (this.f("WebSocket is closing itself"), this.fd(), this.lb && (this.lb(this.Kc), this.lb = null));
      };
      h.close = function() {
        this.Db || (this.f("WebSocket is being closed"), this.fd());
      };
      function yh(a) {
        clearInterval(a.Nc);
        a.Nc = setInterval(function() {
          a.La && Ah(a, "0");
          yh(a);
        }, Math.floor(45E3));
      }
      function Ah(a, b) {
        try {
          a.La.send(b);
        } catch (c) {
          a.f("Exception thrown from WebSocket.send():", c.message || c.data, "Closing connection."), setTimeout(u(a.bb, a), 0);
        }
      }
      ;
      function Bh(a) {
        Ch(this, a);
      }
      var Dh = [nh, wh];
      function Ch(a, b) {
        var c = wh && wh.isAvailable(),
            d = c && !(bd.Af || !0 === bd.get("previous_websocket_failure"));
        b.jh && (c || S("wss:// URL used, but browser isn't known to support websockets.  Trying anyway."), d = !0);
        if (d)
          a.jd = [wh];
        else {
          var e = a.jd = [];
          zd(Dh, function(a, b) {
            b && b.isAvailable() && e.push(b);
          });
        }
      }
      function Eh(a) {
        if (0 < a.jd.length)
          return a.jd[0];
        throw Error("No transports available");
      }
      ;
      function Fh(a, b, c, d, e, f, g) {
        this.id = a;
        this.f = pd("c:" + this.id + ":");
        this.nc = c;
        this.Zc = d;
        this.na = e;
        this.Re = f;
        this.G = b;
        this.Pd = [];
        this.kf = 0;
        this.Wf = new Bh(b);
        this.N = 0;
        this.Fb = g;
        this.f("Connection created");
        Gh(this);
      }
      function Gh(a) {
        var b = Eh(a.Wf);
        a.K = new b("c:" + a.id + ":" + a.kf++, a.G, void 0, a.Fb);
        a.Ve = b.responsesRequiredToBeHealthy || 0;
        var c = Hh(a, a.K),
            d = Ih(a, a.K);
        a.kd = a.K;
        a.ed = a.K;
        a.F = null;
        a.Eb = !1;
        setTimeout(function() {
          a.K && a.K.open(c, d);
        }, Math.floor(0));
        b = b.healthyTimeout || 0;
        0 < b && (a.Bd = setTimeout(function() {
          a.Bd = null;
          a.Eb || (a.K && 102400 < a.K.rb ? (a.f("Connection exceeded healthy timeout but has received " + a.K.rb + " bytes.  Marking connection healthy."), a.Eb = !0, a.K.Hd()) : a.K && 10240 < a.K.sb ? a.f("Connection exceeded healthy timeout but has sent " + a.K.sb + " bytes.  Leaving connection alive.") : (a.f("Closing unhealthy connection after timeout."), a.close()));
        }, Math.floor(b)));
      }
      function Ih(a, b) {
        return function(c) {
          b === a.K ? (a.K = null, c || 0 !== a.N ? 1 === a.N && a.f("Realtime connection lost.") : (a.f("Realtime connection failed."), "s-" === a.G.ab.substr(0, 2) && (bd.remove("host:" + a.G.host), a.G.ab = a.G.host)), a.close()) : b === a.F ? (a.f("Secondary connection lost."), c = a.F, a.F = null, a.kd !== c && a.ed !== c || a.close()) : a.f("closing an old connection");
        };
      }
      function Hh(a, b) {
        return function(c) {
          if (2 != a.N)
            if (b === a.ed) {
              var d = wd("t", c);
              c = wd("d", c);
              if ("c" == d) {
                if (d = wd("t", c), "d" in c)
                  if (c = c.d, "h" === d) {
                    var d = c.ts,
                        e = c.v,
                        f = c.h;
                    a.Uf = c.s;
                    ed(a.G, f);
                    0 == a.N && (a.K.start(), Jh(a, a.K, d), "5" !== e && S("Protocol version mismatch detected"), c = a.Wf, (c = 1 < c.jd.length ? c.jd[1] : null) && Kh(a, c));
                  } else if ("n" === d) {
                    a.f("recvd end transmission on primary");
                    a.ed = a.F;
                    for (c = 0; c < a.Pd.length; ++c)
                      a.Ld(a.Pd[c]);
                    a.Pd = [];
                    Lh(a);
                  } else
                    "s" === d ? (a.f("Connection shutdown command received. Shutting down..."), a.Re && (a.Re(c), a.Re = null), a.na = null, a.close()) : "r" === d ? (a.f("Reset packet received.  New host: " + c), ed(a.G, c), 1 === a.N ? a.close() : (Mh(a), Gh(a))) : "e" === d ? qd("Server Error: " + c) : "o" === d ? (a.f("got pong on primary."), Nh(a), Oh(a)) : qd("Unknown control packet command: " + d);
              } else
                "d" == d && a.Ld(c);
            } else if (b === a.F)
              if (d = wd("t", c), c = wd("d", c), "c" == d)
                "t" in c && (c = c.t, "a" === c ? Ph(a) : "r" === c ? (a.f("Got a reset on secondary, closing it"), a.F.close(), a.kd !== a.F && a.ed !== a.F || a.close()) : "o" === c && (a.f("got pong on secondary."), a.Tf--, Ph(a)));
              else if ("d" == d)
                a.Pd.push(c);
              else
                throw Error("Unknown protocol layer: " + d);
            else
              a.f("message on old connection");
        };
      }
      Fh.prototype.Ia = function(a) {
        Qh(this, {
          t: "d",
          d: a
        });
      };
      function Lh(a) {
        a.kd === a.F && a.ed === a.F && (a.f("cleaning up and promoting a connection: " + a.F.ue), a.K = a.F, a.F = null);
      }
      function Ph(a) {
        0 >= a.Tf ? (a.f("Secondary connection is healthy."), a.Eb = !0, a.F.Hd(), a.F.start(), a.f("sending client ack on secondary"), a.F.send({
          t: "c",
          d: {
            t: "a",
            d: {}
          }
        }), a.f("Ending transmission on primary"), a.K.send({
          t: "c",
          d: {
            t: "n",
            d: {}
          }
        }), a.kd = a.F, Lh(a)) : (a.f("sending ping on secondary."), a.F.send({
          t: "c",
          d: {
            t: "p",
            d: {}
          }
        }));
      }
      Fh.prototype.Ld = function(a) {
        Nh(this);
        this.nc(a);
      };
      function Nh(a) {
        a.Eb || (a.Ve--, 0 >= a.Ve && (a.f("Primary connection is healthy."), a.Eb = !0, a.K.Hd()));
      }
      function Kh(a, b) {
        a.F = new b("c:" + a.id + ":" + a.kf++, a.G, a.Uf);
        a.Tf = b.responsesRequiredToBeHealthy || 0;
        a.F.open(Hh(a, a.F), Ih(a, a.F));
        setTimeout(function() {
          a.F && (a.f("Timed out trying to upgrade."), a.F.close());
        }, Math.floor(6E4));
      }
      function Jh(a, b, c) {
        a.f("Realtime connection established.");
        a.K = b;
        a.N = 1;
        a.Zc && (a.Zc(c, a.Uf), a.Zc = null);
        0 === a.Ve ? (a.f("Primary connection is healthy."), a.Eb = !0) : setTimeout(function() {
          Oh(a);
        }, Math.floor(5E3));
      }
      function Oh(a) {
        a.Eb || 1 !== a.N || (a.f("sending ping on primary."), Qh(a, {
          t: "c",
          d: {
            t: "p",
            d: {}
          }
        }));
      }
      function Qh(a, b) {
        if (1 !== a.N)
          throw "Connection is not connected";
        a.kd.send(b);
      }
      Fh.prototype.close = function() {
        2 !== this.N && (this.f("Closing realtime connection."), this.N = 2, Mh(this), this.na && (this.na(), this.na = null));
      };
      function Mh(a) {
        a.f("Shutting down all connections");
        a.K && (a.K.close(), a.K = null);
        a.F && (a.F.close(), a.F = null);
        a.Bd && (clearTimeout(a.Bd), a.Bd = null);
      }
      ;
      function Rh(a, b, c, d) {
        this.id = Sh++;
        this.f = pd("p:" + this.id + ":");
        this.Bf = this.Ie = !1;
        this.ba = {};
        this.sa = [];
        this.ad = 0;
        this.Yc = [];
        this.qa = !1;
        this.eb = 1E3;
        this.Id = 3E5;
        this.Kb = b;
        this.Xc = c;
        this.Se = d;
        this.G = a;
        this.wb = this.Ca = this.Ma = this.Fb = this.$e = null;
        this.Sb = !1;
        this.Wd = {};
        this.Xg = 0;
        this.rf = !0;
        this.Oc = this.Ke = null;
        Th(this, 0);
        kf.yb().Ib("visible", this.Og, this);
        -1 === a.host.indexOf("fblocal") && jf.yb().Ib("online", this.Mg, this);
      }
      var Sh = 0,
          Uh = 0;
      h = Rh.prototype;
      h.Ia = function(a, b, c) {
        var d = ++this.Xg;
        a = {
          r: d,
          a: a,
          b: b
        };
        this.f(G(a));
        O(this.qa, "sendRequest call when we're not connected not allowed.");
        this.Ma.Ia(a);
        c && (this.Wd[d] = c);
      };
      h.Cf = function(a, b, c, d) {
        var e = a.wa(),
            f = a.path.toString();
        this.f("Listen called for " + f + " " + e);
        this.ba[f] = this.ba[f] || {};
        O(Ie(a.n) || !He(a.n), "listen() called for non-default but complete query");
        O(!this.ba[f][e], "listen() called twice for same path/queryId.");
        a = {
          I: d,
          Ad: b,
          Ug: a,
          tag: c
        };
        this.ba[f][e] = a;
        this.qa && Vh(this, a);
      };
      function Vh(a, b) {
        var c = b.Ug,
            d = c.path.toString(),
            e = c.wa();
        a.f("Listen on " + d + " for " + e);
        var f = {p: d};
        b.tag && (f.q = Ge(c.n), f.t = b.tag);
        f.h = b.Ad();
        a.Ia("q", f, function(f) {
          var k = f.d,
              m = f.s;
          if (k && "object" === typeof k && y(k, "w")) {
            var l = z(k, "w");
            da(l) && 0 <= La(l, "no_index") && S("Using an unspecified index. Consider adding " + ('".indexOn": "' + c.n.g.toString() + '"') + " at " + c.path.toString() + " to your security rules for better performance");
          }
          (a.ba[d] && a.ba[d][e]) === b && (a.f("listen response", f), "ok" !== m && Wh(a, d, e), b.I && b.I(m, k));
        });
      }
      h.O = function(a, b, c) {
        this.Ca = {
          rg: a,
          sf: !1,
          Dc: b,
          od: c
        };
        this.f("Authenticating using credential: " + a);
        Xh(this);
        (b = 40 == a.length) || (a = Cd(a).Ec, b = "object" === typeof a && !0 === z(a, "admin"));
        b && (this.f("Admin auth credential detected.  Reducing max reconnect time."), this.Id = 3E4);
      };
      h.je = function(a) {
        this.Ca = null;
        this.qa && this.Ia("unauth", {}, function(b) {
          a(b.s, b.d);
        });
      };
      function Xh(a) {
        var b = a.Ca;
        a.qa && b && a.Ia("auth", {cred: b.rg}, function(c) {
          var d = c.s;
          c = c.d || "error";
          "ok" !== d && a.Ca === b && (a.Ca = null);
          b.sf ? "ok" !== d && b.od && b.od(d, c) : (b.sf = !0, b.Dc && b.Dc(d, c));
        });
      }
      h.$f = function(a, b) {
        var c = a.path.toString(),
            d = a.wa();
        this.f("Unlisten called for " + c + " " + d);
        O(Ie(a.n) || !He(a.n), "unlisten() called for non-default but complete query");
        if (Wh(this, c, d) && this.qa) {
          var e = Ge(a.n);
          this.f("Unlisten on " + c + " for " + d);
          c = {p: c};
          b && (c.q = e, c.t = b);
          this.Ia("n", c);
        }
      };
      h.Qe = function(a, b, c) {
        this.qa ? Yh(this, "o", a, b, c) : this.Yc.push({
          bd: a,
          action: "o",
          data: b,
          I: c
        });
      };
      h.Gf = function(a, b, c) {
        this.qa ? Yh(this, "om", a, b, c) : this.Yc.push({
          bd: a,
          action: "om",
          data: b,
          I: c
        });
      };
      h.Md = function(a, b) {
        this.qa ? Yh(this, "oc", a, null, b) : this.Yc.push({
          bd: a,
          action: "oc",
          data: null,
          I: b
        });
      };
      function Yh(a, b, c, d, e) {
        c = {
          p: c,
          d: d
        };
        a.f("onDisconnect " + b, c);
        a.Ia(b, c, function(a) {
          e && setTimeout(function() {
            e(a.s, a.d);
          }, Math.floor(0));
        });
      }
      h.put = function(a, b, c, d) {
        Zh(this, "p", a, b, c, d);
      };
      h.Df = function(a, b, c, d) {
        Zh(this, "m", a, b, c, d);
      };
      function Zh(a, b, c, d, e, f) {
        d = {
          p: c,
          d: d
        };
        p(f) && (d.h = f);
        a.sa.push({
          action: b,
          Pf: d,
          I: e
        });
        a.ad++;
        b = a.sa.length - 1;
        a.qa ? $h(a, b) : a.f("Buffering put: " + c);
      }
      function $h(a, b) {
        var c = a.sa[b].action,
            d = a.sa[b].Pf,
            e = a.sa[b].I;
        a.sa[b].Vg = a.qa;
        a.Ia(c, d, function(d) {
          a.f(c + " response", d);
          delete a.sa[b];
          a.ad--;
          0 === a.ad && (a.sa = []);
          e && e(d.s, d.d);
        });
      }
      h.Ye = function(a) {
        this.qa && (a = {c: a}, this.f("reportStats", a), this.Ia("s", a, function(a) {
          "ok" !== a.s && this.f("reportStats", "Error sending stats: " + a.d);
        }));
      };
      h.Ld = function(a) {
        if ("r" in a) {
          this.f("from server: " + G(a));
          var b = a.r,
              c = this.Wd[b];
          c && (delete this.Wd[b], c(a.b));
        } else {
          if ("error" in a)
            throw "A server-side error has occurred: " + a.error;
          "a" in a && (b = a.a, c = a.b, this.f("handleServerMessage", b, c), "d" === b ? this.Kb(c.p, c.d, !1, c.t) : "m" === b ? this.Kb(c.p, c.d, !0, c.t) : "c" === b ? ai(this, c.p, c.q) : "ac" === b ? (a = c.s, b = c.d, c = this.Ca, this.Ca = null, c && c.od && c.od(a, b)) : "sd" === b ? this.$e ? this.$e(c) : "msg" in c && "undefined" !== typeof console && console.log("FIREBASE: " + c.msg.replace("\n", "\nFIREBASE: ")) : qd("Unrecognized action received from server: " + G(b) + "\nAre you using the latest client?"));
        }
      };
      h.Zc = function(a, b) {
        this.f("connection ready");
        this.qa = !0;
        this.Oc = (new Date).getTime();
        this.Se({serverTimeOffset: a - (new Date).getTime()});
        this.Fb = b;
        if (this.rf) {
          var c = {};
          c["sdk.js." + Eb.replace(/\./g, "-")] = 1;
          Dg() ? c["framework.cordova"] = 1 : "object" === typeof navigator && "ReactNative" === navigator.product && (c["framework.reactnative"] = 1);
          this.Ye(c);
        }
        bi(this);
        this.rf = !1;
        this.Xc(!0);
      };
      function Th(a, b) {
        O(!a.Ma, "Scheduling a connect when we're already connected/ing?");
        a.wb && clearTimeout(a.wb);
        a.wb = setTimeout(function() {
          a.wb = null;
          ci(a);
        }, Math.floor(b));
      }
      h.Og = function(a) {
        a && !this.Sb && this.eb === this.Id && (this.f("Window became visible.  Reducing delay."), this.eb = 1E3, this.Ma || Th(this, 0));
        this.Sb = a;
      };
      h.Mg = function(a) {
        a ? (this.f("Browser went online."), this.eb = 1E3, this.Ma || Th(this, 0)) : (this.f("Browser went offline.  Killing connection."), this.Ma && this.Ma.close());
      };
      h.If = function() {
        this.f("data client disconnected");
        this.qa = !1;
        this.Ma = null;
        for (var a = 0; a < this.sa.length; a++) {
          var b = this.sa[a];
          b && "h" in b.Pf && b.Vg && (b.I && b.I("disconnect"), delete this.sa[a], this.ad--);
        }
        0 === this.ad && (this.sa = []);
        this.Wd = {};
        di(this) && (this.Sb ? this.Oc && (3E4 < (new Date).getTime() - this.Oc && (this.eb = 1E3), this.Oc = null) : (this.f("Window isn't visible.  Delaying reconnect."), this.eb = this.Id, this.Ke = (new Date).getTime()), a = Math.max(0, this.eb - ((new Date).getTime() - this.Ke)), a *= Math.random(), this.f("Trying to reconnect in " + a + "ms"), Th(this, a), this.eb = Math.min(this.Id, 1.3 * this.eb));
        this.Xc(!1);
      };
      function ci(a) {
        if (di(a)) {
          a.f("Making a connection attempt");
          a.Ke = (new Date).getTime();
          a.Oc = null;
          var b = u(a.Ld, a),
              c = u(a.Zc, a),
              d = u(a.If, a),
              e = a.id + ":" + Uh++;
          a.Ma = new Fh(e, a.G, b, c, d, function(b) {
            S(b + " (" + a.G.toString() + ")");
            a.Bf = !0;
          }, a.Fb);
        }
      }
      h.Cb = function() {
        this.Ie = !0;
        this.Ma ? this.Ma.close() : (this.wb && (clearTimeout(this.wb), this.wb = null), this.qa && this.If());
      };
      h.vc = function() {
        this.Ie = !1;
        this.eb = 1E3;
        this.Ma || Th(this, 0);
      };
      function ai(a, b, c) {
        c = c ? Oa(c, function(a) {
          return xd(a);
        }).join("$") : "default";
        (a = Wh(a, b, c)) && a.I && a.I("permission_denied");
      }
      function Wh(a, b, c) {
        b = (new P(b)).toString();
        var d;
        p(a.ba[b]) ? (d = a.ba[b][c], delete a.ba[b][c], 0 === oa(a.ba[b]) && delete a.ba[b]) : d = void 0;
        return d;
      }
      function bi(a) {
        Xh(a);
        v(a.ba, function(b) {
          v(b, function(b) {
            Vh(a, b);
          });
        });
        for (var b = 0; b < a.sa.length; b++)
          a.sa[b] && $h(a, b);
        for (; a.Yc.length; )
          b = a.Yc.shift(), Yh(a, b.action, b.bd, b.data, b.I);
      }
      function di(a) {
        var b;
        b = jf.yb().oc;
        return !a.Bf && !a.Ie && b;
      }
      ;
      var U = {zg: function() {
          oh = xh = !0;
        }};
      U.forceLongPolling = U.zg;
      U.Ag = function() {
        ph = !0;
      };
      U.forceWebSockets = U.Ag;
      U.Eg = function() {
        return wh.isAvailable();
      };
      U.isWebSocketsAvailable = U.Eg;
      U.ah = function(a, b) {
        a.k.Va.$e = b;
      };
      U.setSecurityDebugCallback = U.ah;
      U.bf = function(a, b) {
        a.k.bf(b);
      };
      U.stats = U.bf;
      U.cf = function(a, b) {
        a.k.cf(b);
      };
      U.statsIncrementCounter = U.cf;
      U.ud = function(a) {
        return a.k.ud;
      };
      U.dataUpdateCount = U.ud;
      U.Dg = function(a, b) {
        a.k.He = b;
      };
      U.interceptServerData = U.Dg;
      U.Kg = function(a) {
        new Og(a);
      };
      U.onPopupOpen = U.Kg;
      U.Zg = function(a) {
        xg = a;
      };
      U.setAuthenticationServer = U.Zg;
      function ei(a, b) {
        this.committed = a;
        this.snapshot = b;
      }
      ;
      function V(a, b) {
        this.dd = a;
        this.ta = b;
      }
      V.prototype.cancel = function(a) {
        D("Firebase.onDisconnect().cancel", 0, 1, arguments.length);
        F("Firebase.onDisconnect().cancel", 1, a, !0);
        var b = new B;
        this.dd.Md(this.ta, C(b, a));
        return b.D;
      };
      V.prototype.cancel = V.prototype.cancel;
      V.prototype.remove = function(a) {
        D("Firebase.onDisconnect().remove", 0, 1, arguments.length);
        og("Firebase.onDisconnect().remove", this.ta);
        F("Firebase.onDisconnect().remove", 1, a, !0);
        var b = new B;
        fi(this.dd, this.ta, null, C(b, a));
        return b.D;
      };
      V.prototype.remove = V.prototype.remove;
      V.prototype.set = function(a, b) {
        D("Firebase.onDisconnect().set", 1, 2, arguments.length);
        og("Firebase.onDisconnect().set", this.ta);
        gg("Firebase.onDisconnect().set", a, this.ta, !1);
        F("Firebase.onDisconnect().set", 2, b, !0);
        var c = new B;
        fi(this.dd, this.ta, a, C(c, b));
        return c.D;
      };
      V.prototype.set = V.prototype.set;
      V.prototype.Ob = function(a, b, c) {
        D("Firebase.onDisconnect().setWithPriority", 2, 3, arguments.length);
        og("Firebase.onDisconnect().setWithPriority", this.ta);
        gg("Firebase.onDisconnect().setWithPriority", a, this.ta, !1);
        kg("Firebase.onDisconnect().setWithPriority", 2, b);
        F("Firebase.onDisconnect().setWithPriority", 3, c, !0);
        var d = new B;
        gi(this.dd, this.ta, a, b, C(d, c));
        return d.D;
      };
      V.prototype.setWithPriority = V.prototype.Ob;
      V.prototype.update = function(a, b) {
        D("Firebase.onDisconnect().update", 1, 2, arguments.length);
        og("Firebase.onDisconnect().update", this.ta);
        if (da(a)) {
          for (var c = {},
              d = 0; d < a.length; ++d)
            c["" + d] = a[d];
          a = c;
          S("Passing an Array to Firebase.onDisconnect().update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
        }
        jg("Firebase.onDisconnect().update", a, this.ta);
        F("Firebase.onDisconnect().update", 2, b, !0);
        c = new B;
        hi(this.dd, this.ta, a, C(c, b));
        return c.D;
      };
      V.prototype.update = V.prototype.update;
      function W(a, b, c) {
        this.A = a;
        this.Y = b;
        this.g = c;
      }
      W.prototype.J = function() {
        D("Firebase.DataSnapshot.val", 0, 0, arguments.length);
        return this.A.J();
      };
      W.prototype.val = W.prototype.J;
      W.prototype.qf = function() {
        D("Firebase.DataSnapshot.exportVal", 0, 0, arguments.length);
        return this.A.J(!0);
      };
      W.prototype.exportVal = W.prototype.qf;
      W.prototype.xg = function() {
        D("Firebase.DataSnapshot.exists", 0, 0, arguments.length);
        return !this.A.e();
      };
      W.prototype.exists = W.prototype.xg;
      W.prototype.o = function(a) {
        D("Firebase.DataSnapshot.child", 0, 1, arguments.length);
        fa(a) && (a = String(a));
        ng("Firebase.DataSnapshot.child", a);
        var b = new P(a),
            c = this.Y.o(b);
        return new W(this.A.S(b), c, R);
      };
      W.prototype.child = W.prototype.o;
      W.prototype.Fa = function(a) {
        D("Firebase.DataSnapshot.hasChild", 1, 1, arguments.length);
        ng("Firebase.DataSnapshot.hasChild", a);
        var b = new P(a);
        return !this.A.S(b).e();
      };
      W.prototype.hasChild = W.prototype.Fa;
      W.prototype.C = function() {
        D("Firebase.DataSnapshot.getPriority", 0, 0, arguments.length);
        return this.A.C().J();
      };
      W.prototype.getPriority = W.prototype.C;
      W.prototype.forEach = function(a) {
        D("Firebase.DataSnapshot.forEach", 1, 1, arguments.length);
        F("Firebase.DataSnapshot.forEach", 1, a, !1);
        if (this.A.L())
          return !1;
        var b = this;
        return !!this.A.R(this.g, function(c, d) {
          return a(new W(d, b.Y.o(c), R));
        });
      };
      W.prototype.forEach = W.prototype.forEach;
      W.prototype.zd = function() {
        D("Firebase.DataSnapshot.hasChildren", 0, 0, arguments.length);
        return this.A.L() ? !1 : !this.A.e();
      };
      W.prototype.hasChildren = W.prototype.zd;
      W.prototype.name = function() {
        S("Firebase.DataSnapshot.name() being deprecated. Please use Firebase.DataSnapshot.key() instead.");
        D("Firebase.DataSnapshot.name", 0, 0, arguments.length);
        return this.key();
      };
      W.prototype.name = W.prototype.name;
      W.prototype.key = function() {
        D("Firebase.DataSnapshot.key", 0, 0, arguments.length);
        return this.Y.key();
      };
      W.prototype.key = W.prototype.key;
      W.prototype.Hb = function() {
        D("Firebase.DataSnapshot.numChildren", 0, 0, arguments.length);
        return this.A.Hb();
      };
      W.prototype.numChildren = W.prototype.Hb;
      W.prototype.Mb = function() {
        D("Firebase.DataSnapshot.ref", 0, 0, arguments.length);
        return this.Y;
      };
      W.prototype.ref = W.prototype.Mb;
      function ii(a, b, c) {
        this.Vb = a;
        this.tb = b;
        this.vb = c || null;
      }
      h = ii.prototype;
      h.Qf = function(a) {
        return "value" === a;
      };
      h.createEvent = function(a, b) {
        var c = b.n.g;
        return new jc("value", this, new W(a.Na, b.Mb(), c));
      };
      h.Zb = function(a) {
        var b = this.vb;
        if ("cancel" === a.De()) {
          O(this.tb, "Raising a cancel event on a listener with no cancel callback");
          var c = this.tb;
          return function() {
            c.call(b, a.error);
          };
        }
        var d = this.Vb;
        return function() {
          d.call(b, a.be);
        };
      };
      h.lf = function(a, b) {
        return this.tb ? new kc(this, a, b) : null;
      };
      h.matches = function(a) {
        return a instanceof ii ? a.Vb && this.Vb ? a.Vb === this.Vb && a.vb === this.vb : !0 : !1;
      };
      h.yf = function() {
        return null !== this.Vb;
      };
      function ji(a, b, c) {
        this.ja = a;
        this.tb = b;
        this.vb = c;
      }
      h = ji.prototype;
      h.Qf = function(a) {
        a = "children_added" === a ? "child_added" : a;
        return ("children_removed" === a ? "child_removed" : a) in this.ja;
      };
      h.lf = function(a, b) {
        return this.tb ? new kc(this, a, b) : null;
      };
      h.createEvent = function(a, b) {
        O(null != a.Za, "Child events should have a childName.");
        var c = b.Mb().o(a.Za);
        return new jc(a.type, this, new W(a.Na, c, b.n.g), a.Td);
      };
      h.Zb = function(a) {
        var b = this.vb;
        if ("cancel" === a.De()) {
          O(this.tb, "Raising a cancel event on a listener with no cancel callback");
          var c = this.tb;
          return function() {
            c.call(b, a.error);
          };
        }
        var d = this.ja[a.wd];
        return function() {
          d.call(b, a.be, a.Td);
        };
      };
      h.matches = function(a) {
        if (a instanceof ji) {
          if (!this.ja || !a.ja)
            return !0;
          if (this.vb === a.vb) {
            var b = oa(a.ja);
            if (b === oa(this.ja)) {
              if (1 === b) {
                var b = pa(a.ja),
                    c = pa(this.ja);
                return c === b && (!a.ja[b] || !this.ja[c] || a.ja[b] === this.ja[c]);
              }
              return na(this.ja, function(b, c) {
                return a.ja[c] === b;
              });
            }
          }
        }
        return !1;
      };
      h.yf = function() {
        return null !== this.ja;
      };
      function ki() {
        this.za = {};
      }
      h = ki.prototype;
      h.e = function() {
        return va(this.za);
      };
      h.gb = function(a, b, c) {
        var d = a.source.Lb;
        if (null !== d)
          return d = z(this.za, d), O(null != d, "SyncTree gave us an op for an invalid query."), d.gb(a, b, c);
        var e = [];
        v(this.za, function(d) {
          e = e.concat(d.gb(a, b, c));
        });
        return e;
      };
      h.Tb = function(a, b, c, d, e) {
        var f = a.wa(),
            g = z(this.za, f);
        if (!g) {
          var g = c.Aa(e ? d : null),
              k = !1;
          g ? k = !0 : (g = d instanceof fe ? c.Cc(d) : H, k = !1);
          g = new Ye(a, new je(new Xb(g, k, !1), new Xb(d, e, !1)));
          this.za[f] = g;
        }
        g.Tb(b);
        return af(g, b);
      };
      h.nb = function(a, b, c) {
        var d = a.wa(),
            e = [],
            f = [],
            g = null != li(this);
        if ("default" === d) {
          var k = this;
          v(this.za, function(a, d) {
            f = f.concat(a.nb(b, c));
            a.e() && (delete k.za[d], He(a.Y.n) || e.push(a.Y));
          });
        } else {
          var m = z(this.za, d);
          m && (f = f.concat(m.nb(b, c)), m.e() && (delete this.za[d], He(m.Y.n) || e.push(m.Y)));
        }
        g && null == li(this) && e.push(new X(a.k, a.path));
        return {
          Wg: e,
          vg: f
        };
      };
      function mi(a) {
        return Na(qa(a.za), function(a) {
          return !He(a.Y.n);
        });
      }
      h.kb = function(a) {
        var b = null;
        v(this.za, function(c) {
          b = b || c.kb(a);
        });
        return b;
      };
      function ni(a, b) {
        if (He(b.n))
          return li(a);
        var c = b.wa();
        return z(a.za, c);
      }
      function li(a) {
        return ua(a.za, function(a) {
          return He(a.Y.n);
        }) || null;
      }
      ;
      function oi(a) {
        this.va = qe;
        this.mb = new Pf;
        this.df = {};
        this.qc = {};
        this.Qc = a;
      }
      function pi(a, b, c, d, e) {
        var f = a.mb,
            g = e;
        O(d > f.Pc, "Stacking an older write on top of newer ones");
        p(g) || (g = !0);
        f.pa.push({
          path: b,
          Ja: c,
          md: d,
          visible: g
        });
        g && (f.V = Jf(f.V, b, c));
        f.Pc = d;
        return e ? qi(a, new Ac(Ef, b, c)) : [];
      }
      function ri(a, b, c, d) {
        var e = a.mb;
        O(d > e.Pc, "Stacking an older merge on top of newer ones");
        e.pa.push({
          path: b,
          children: c,
          md: d,
          visible: !0
        });
        e.V = Kf(e.V, b, c);
        e.Pc = d;
        c = sf(c);
        return qi(a, new bf(Ef, b, c));
      }
      function si(a, b, c) {
        c = c || !1;
        var d = Qf(a.mb, b);
        if (a.mb.Ud(b)) {
          var e = qe;
          null != d.Ja ? e = e.set(M, !0) : Fb(d.children, function(a, b) {
            e = e.set(new P(a), b);
          });
          return qi(a, new Df(d.path, e, c));
        }
        return [];
      }
      function ti(a, b, c) {
        c = sf(c);
        return qi(a, new bf(Gf, b, c));
      }
      function ui(a, b, c, d) {
        d = vi(a, d);
        if (null != d) {
          var e = wi(d);
          d = e.path;
          e = e.Lb;
          b = lf(d, b);
          c = new Ac(new Ff(!1, !0, e, !0), b, c);
          return xi(a, d, c);
        }
        return [];
      }
      function yi(a, b, c, d) {
        if (d = vi(a, d)) {
          var e = wi(d);
          d = e.path;
          e = e.Lb;
          b = lf(d, b);
          c = sf(c);
          c = new bf(new Ff(!1, !0, e, !0), b, c);
          return xi(a, d, c);
        }
        return [];
      }
      oi.prototype.Tb = function(a, b) {
        var c = a.path,
            d = null,
            e = !1;
        zf(this.va, c, function(a, b) {
          var f = lf(a, c);
          d = d || b.kb(f);
          e = e || null != li(b);
        });
        var f = this.va.get(c);
        f ? (e = e || null != li(f), d = d || f.kb(M)) : (f = new ki, this.va = this.va.set(c, f));
        var g;
        null != d ? g = !0 : (g = !1, d = H, Cf(this.va.subtree(c), function(a, b) {
          var c = b.kb(M);
          c && (d = d.W(a, c));
        }));
        var k = null != ni(f, a);
        if (!k && !He(a.n)) {
          var m = zi(a);
          O(!(m in this.qc), "View does not exist, but we have a tag");
          var l = Ai++;
          this.qc[m] = l;
          this.df["_" + l] = m;
        }
        g = f.Tb(a, b, new Uf(c, this.mb), d, g);
        k || e || (f = ni(f, a), g = g.concat(Bi(this, a, f)));
        return g;
      };
      oi.prototype.nb = function(a, b, c) {
        var d = a.path,
            e = this.va.get(d),
            f = [];
        if (e && ("default" === a.wa() || null != ni(e, a))) {
          f = e.nb(a, b, c);
          e.e() && (this.va = this.va.remove(d));
          e = f.Wg;
          f = f.vg;
          b = -1 !== Sa(e, function(a) {
            return He(a.n);
          });
          var g = xf(this.va, d, function(a, b) {
            return null != li(b);
          });
          if (b && !g && (d = this.va.subtree(d), !d.e()))
            for (var d = Ci(d),
                k = 0; k < d.length; ++k) {
              var m = d[k],
                  l = m.Y,
                  m = Di(this, m);
              this.Qc.af(Ei(l), Fi(this, l), m.Ad, m.I);
            }
          if (!g && 0 < e.length && !c)
            if (b)
              this.Qc.de(Ei(a), null);
            else {
              var t = this;
              Ma(e, function(a) {
                a.wa();
                var b = t.qc[zi(a)];
                t.Qc.de(Ei(a), b);
              });
            }
          Gi(this, e);
        }
        return f;
      };
      oi.prototype.Aa = function(a, b) {
        var c = this.mb,
            d = xf(this.va, a, function(b, c) {
              var d = lf(b, a);
              if (d = c.kb(d))
                return d;
            });
        return c.Aa(a, d, b, !0);
      };
      function Ci(a) {
        return vf(a, function(a, c, d) {
          if (c && null != li(c))
            return [li(c)];
          var e = [];
          c && (e = mi(c));
          v(d, function(a) {
            e = e.concat(a);
          });
          return e;
        });
      }
      function Gi(a, b) {
        for (var c = 0; c < b.length; ++c) {
          var d = b[c];
          if (!He(d.n)) {
            var d = zi(d),
                e = a.qc[d];
            delete a.qc[d];
            delete a.df["_" + e];
          }
        }
      }
      function Ei(a) {
        return He(a.n) && !Ie(a.n) ? a.Mb() : a;
      }
      function Bi(a, b, c) {
        var d = b.path,
            e = Fi(a, b);
        c = Di(a, c);
        b = a.Qc.af(Ei(b), e, c.Ad, c.I);
        d = a.va.subtree(d);
        if (e)
          O(null == li(d.value), "If we're adding a query, it shouldn't be shadowed");
        else
          for (e = vf(d, function(a, b, c) {
            if (!a.e() && b && null != li(b))
              return [Ze(li(b))];
            var d = [];
            b && (d = d.concat(Oa(mi(b), function(a) {
              return a.Y;
            })));
            v(c, function(a) {
              d = d.concat(a);
            });
            return d;
          }), d = 0; d < e.length; ++d)
            c = e[d], a.Qc.de(Ei(c), Fi(a, c));
        return b;
      }
      function Di(a, b) {
        var c = b.Y,
            d = Fi(a, c);
        return {
          Ad: function() {
            return (b.w() || H).hash();
          },
          I: function(b) {
            if ("ok" === b) {
              if (d) {
                var f = c.path;
                if (b = vi(a, d)) {
                  var g = wi(b);
                  b = g.path;
                  g = g.Lb;
                  f = lf(b, f);
                  f = new Cc(new Ff(!1, !0, g, !0), f);
                  b = xi(a, b, f);
                } else
                  b = [];
              } else
                b = qi(a, new Cc(Gf, c.path));
              return b;
            }
            f = "Unknown Error";
            "too_big" === b ? f = "The data requested exceeds the maximum size that can be accessed with a single request." : "permission_denied" == b ? f = "Client doesn't have permission to access the desired data." : "unavailable" == b && (f = "The service is unavailable");
            f = Error(b + " at " + c.path.toString() + ": " + f);
            f.code = b.toUpperCase();
            return a.nb(c, null, f);
          }
        };
      }
      function zi(a) {
        return a.path.toString() + "$" + a.wa();
      }
      function wi(a) {
        var b = a.indexOf("$");
        O(-1 !== b && b < a.length - 1, "Bad queryKey.");
        return {
          Lb: a.substr(b + 1),
          path: new P(a.substr(0, b))
        };
      }
      function vi(a, b) {
        var c = a.df,
            d = "_" + b;
        return d in c ? c[d] : void 0;
      }
      function Fi(a, b) {
        var c = zi(b);
        return z(a.qc, c);
      }
      var Ai = 1;
      function xi(a, b, c) {
        var d = a.va.get(b);
        O(d, "Missing sync point for query tag that we're tracking");
        return d.gb(c, new Uf(b, a.mb), null);
      }
      function qi(a, b) {
        return Hi(a, b, a.va, null, new Uf(M, a.mb));
      }
      function Hi(a, b, c, d, e) {
        if (b.path.e())
          return Ii(a, b, c, d, e);
        var f = c.get(M);
        null == d && null != f && (d = f.kb(M));
        var g = [],
            k = K(b.path),
            m = b.$c(k);
        if ((c = c.children.get(k)) && m)
          var l = d ? d.T(k) : null,
              k = e.o(k),
              g = g.concat(Hi(a, m, c, l, k));
        f && (g = g.concat(f.gb(b, e, d)));
        return g;
      }
      function Ii(a, b, c, d, e) {
        var f = c.get(M);
        null == d && null != f && (d = f.kb(M));
        var g = [];
        c.children.ka(function(c, f) {
          var l = d ? d.T(c) : null,
              t = e.o(c),
              A = b.$c(c);
          A && (g = g.concat(Ii(a, A, f, l, t)));
        });
        f && (g = g.concat(f.gb(b, e, d)));
        return g;
      }
      ;
      function Ji(a, b) {
        this.G = a;
        this.Xa = uc(a);
        this.hd = null;
        this.fa = new Zb;
        this.Kd = 1;
        this.Va = null;
        b || 0 <= ("object" === typeof window && window.navigator && window.navigator.userAgent || "").search(/googlebot|google webmaster tools|bingbot|yahoo! slurp|baiduspider|yandexbot|duckduckbot/i) ? (this.da = new cf(this.G, u(this.Kb, this)), setTimeout(u(this.Xc, this, !0), 0)) : this.da = this.Va = new Rh(this.G, u(this.Kb, this), u(this.Xc, this), u(this.Se, this));
        this.eh = vc(a, u(function() {
          return new pc(this.Xa, this.da);
        }, this));
        this.yc = new Wf;
        this.Ge = new Sb;
        var c = this;
        this.Fd = new oi({
          af: function(a, b, f, g) {
            b = [];
            f = c.Ge.j(a.path);
            f.e() || (b = qi(c.Fd, new Ac(Gf, a.path, f)), setTimeout(function() {
              g("ok");
            }, 0));
            return b;
          },
          de: aa
        });
        Ki(this, "connected", !1);
        this.na = new Vc;
        this.O = new Yg(a, u(this.da.O, this.da), u(this.da.je, this.da), u(this.Pe, this));
        this.ud = 0;
        this.He = null;
        this.M = new oi({
          af: function(a, b, f, g) {
            c.da.Cf(a, f, b, function(b, e) {
              var f = g(b, e);
              dc(c.fa, a.path, f);
            });
            return [];
          },
          de: function(a, b) {
            c.da.$f(a, b);
          }
        });
      }
      h = Ji.prototype;
      h.toString = function() {
        return (this.G.ob ? "https://" : "http://") + this.G.host;
      };
      h.name = function() {
        return this.G.lc;
      };
      function Li(a) {
        a = a.Ge.j(new P(".info/serverTimeOffset")).J() || 0;
        return (new Date).getTime() + a;
      }
      function Mi(a) {
        a = a = {timestamp: Li(a)};
        a.timestamp = a.timestamp || (new Date).getTime();
        return a;
      }
      h.Kb = function(a, b, c, d) {
        this.ud++;
        var e = new P(a);
        b = this.He ? this.He(a, b) : b;
        a = [];
        d ? c ? (b = ma(b, function(a) {
          return Q(a);
        }), a = yi(this.M, e, b, d)) : (b = Q(b), a = ui(this.M, e, b, d)) : c ? (d = ma(b, function(a) {
          return Q(a);
        }), a = ti(this.M, e, d)) : (d = Q(b), a = qi(this.M, new Ac(Gf, e, d)));
        d = e;
        0 < a.length && (d = Ni(this, e));
        dc(this.fa, d, a);
      };
      h.Xc = function(a) {
        Ki(this, "connected", a);
        !1 === a && Oi(this);
      };
      h.Se = function(a) {
        var b = this;
        zd(a, function(a, d) {
          Ki(b, d, a);
        });
      };
      h.Pe = function(a) {
        Ki(this, "authenticated", a);
      };
      function Ki(a, b, c) {
        b = new P("/.info/" + b);
        c = Q(c);
        var d = a.Ge;
        d.Zd = d.Zd.H(b, c);
        c = qi(a.Fd, new Ac(Gf, b, c));
        dc(a.fa, b, c);
      }
      h.Ob = function(a, b, c, d) {
        this.f("set", {
          path: a.toString(),
          value: b,
          nh: c
        });
        var e = Mi(this);
        b = Q(b, c);
        var e = Xc(b, e),
            f = this.Kd++,
            e = pi(this.M, a, e, f, !0);
        $b(this.fa, e);
        var g = this;
        this.da.put(a.toString(), b.J(!0), function(b, c) {
          var e = "ok" === b;
          e || S("set at " + a + " failed: " + b);
          e = si(g.M, f, !e);
          dc(g.fa, a, e);
          Pi(d, b, c);
        });
        e = Qi(this, a);
        Ni(this, e);
        dc(this.fa, e, []);
      };
      h.update = function(a, b, c) {
        this.f("update", {
          path: a.toString(),
          value: b
        });
        var d = !0,
            e = Mi(this),
            f = {};
        v(b, function(a, b) {
          d = !1;
          var c = Q(a);
          f[b] = Xc(c, e);
        });
        if (d)
          fc("update() called with empty data.  Don't do anything."), Pi(c, "ok");
        else {
          var g = this.Kd++,
              k = ri(this.M, a, f, g);
          $b(this.fa, k);
          var m = this;
          this.da.Df(a.toString(), b, function(b, d) {
            var e = "ok" === b;
            e || S("update at " + a + " failed: " + b);
            var e = si(m.M, g, !e),
                f = a;
            0 < e.length && (f = Ni(m, a));
            dc(m.fa, f, e);
            Pi(c, b, d);
          });
          b = Qi(this, a);
          Ni(this, b);
          dc(this.fa, a, []);
        }
      };
      function Oi(a) {
        a.f("onDisconnectEvents");
        var b = Mi(a),
            c = [];
        Wc(Uc(a.na, b), M, function(b, e) {
          c = c.concat(qi(a.M, new Ac(Gf, b, e)));
          var f = Qi(a, b);
          Ni(a, f);
        });
        a.na = new Vc;
        dc(a.fa, M, c);
      }
      h.Md = function(a, b) {
        var c = this;
        this.da.Md(a.toString(), function(d, e) {
          "ok" === d && wg(c.na, a);
          Pi(b, d, e);
        });
      };
      function fi(a, b, c, d) {
        var e = Q(c);
        a.da.Qe(b.toString(), e.J(!0), function(c, g) {
          "ok" === c && a.na.rc(b, e);
          Pi(d, c, g);
        });
      }
      function gi(a, b, c, d, e) {
        var f = Q(c, d);
        a.da.Qe(b.toString(), f.J(!0), function(c, d) {
          "ok" === c && a.na.rc(b, f);
          Pi(e, c, d);
        });
      }
      function hi(a, b, c, d) {
        var e = !0,
            f;
        for (f in c)
          e = !1;
        e ? (fc("onDisconnect().update() called with empty data.  Don't do anything."), Pi(d, "ok")) : a.da.Gf(b.toString(), c, function(e, f) {
          if ("ok" === e)
            for (var m in c) {
              var l = Q(c[m]);
              a.na.rc(b.o(m), l);
            }
          Pi(d, e, f);
        });
      }
      function Ri(a, b, c) {
        c = ".info" === K(b.path) ? a.Fd.Tb(b, c) : a.M.Tb(b, c);
        bc(a.fa, b.path, c);
      }
      h.Cb = function() {
        this.Va && this.Va.Cb();
      };
      h.vc = function() {
        this.Va && this.Va.vc();
      };
      h.bf = function(a) {
        if ("undefined" !== typeof console) {
          a ? (this.hd || (this.hd = new oc(this.Xa)), a = this.hd.get()) : a = this.Xa.get();
          var b = Pa(ra(a), function(a, b) {
            return Math.max(b.length, a);
          }, 0),
              c;
          for (c in a) {
            for (var d = a[c],
                e = c.length; e < b + 2; e++)
              c += " ";
            console.log(c + d);
          }
        }
      };
      h.cf = function(a) {
        rc(this.Xa, a);
        this.eh.Vf[a] = !0;
      };
      h.f = function(a) {
        var b = "";
        this.Va && (b = this.Va.id + ":");
        fc(b, arguments);
      };
      function Pi(a, b, c) {
        a && gc(function() {
          if ("ok" == b)
            a(null);
          else {
            var d = (b || "error").toUpperCase(),
                e = d;
            c && (e += ": " + c);
            e = Error(e);
            e.code = d;
            a(e);
          }
        });
      }
      ;
      function Si(a, b, c, d, e) {
        function f() {}
        a.f("transaction on " + b);
        var g = new X(a, b);
        g.Ib("value", f);
        c = {
          path: b,
          update: c,
          I: d,
          status: null,
          Lf: id(),
          gf: e,
          Sf: 0,
          le: function() {
            g.mc("value", f);
          },
          ne: null,
          Da: null,
          rd: null,
          sd: null,
          td: null
        };
        d = a.M.Aa(b, void 0) || H;
        c.rd = d;
        d = c.update(d.J());
        if (p(d)) {
          hg("transaction failed: Data returned ", d, c.path);
          c.status = 1;
          e = Xf(a.yc, b);
          var k = e.Ea() || [];
          k.push(c);
          Yf(e, k);
          "object" === typeof d && null !== d && y(d, ".priority") ? (k = z(d, ".priority"), O(fg(k), "Invalid priority returned by transaction. Priority must be a valid string, finite number, server value, or null.")) : k = (a.M.Aa(b) || H).C().J();
          e = Mi(a);
          d = Q(d, k);
          e = Xc(d, e);
          c.sd = d;
          c.td = e;
          c.Da = a.Kd++;
          c = pi(a.M, b, e, c.Da, c.gf);
          dc(a.fa, b, c);
          Ti(a);
        } else
          c.le(), c.sd = null, c.td = null, c.I && (a = new W(c.rd, new X(a, c.path), R), c.I(null, !1, a));
      }
      function Ti(a, b) {
        var c = b || a.yc;
        b || Ui(a, c);
        if (null !== c.Ea()) {
          var d = Vi(a, c);
          O(0 < d.length, "Sending zero length transaction queue");
          Qa(d, function(a) {
            return 1 === a.status;
          }) && Wi(a, c.path(), d);
        } else
          c.zd() && c.R(function(b) {
            Ti(a, b);
          });
      }
      function Wi(a, b, c) {
        for (var d = Oa(c, function(a) {
          return a.Da;
        }),
            e = a.M.Aa(b, d) || H,
            d = e,
            e = e.hash(),
            f = 0; f < c.length; f++) {
          var g = c[f];
          O(1 === g.status, "tryToSendTransactionQueue_: items in queue should all be run.");
          g.status = 2;
          g.Sf++;
          var k = lf(b, g.path),
              d = d.H(k, g.sd);
        }
        d = d.J(!0);
        a.da.put(b.toString(), d, function(d) {
          a.f("transaction put response", {
            path: b.toString(),
            status: d
          });
          var e = [];
          if ("ok" === d) {
            d = [];
            for (f = 0; f < c.length; f++) {
              c[f].status = 3;
              e = e.concat(si(a.M, c[f].Da));
              if (c[f].I) {
                var g = c[f].td,
                    k = new X(a, c[f].path);
                d.push(u(c[f].I, null, null, !0, new W(g, k, R)));
              }
              c[f].le();
            }
            Ui(a, Xf(a.yc, b));
            Ti(a);
            dc(a.fa, b, e);
            for (f = 0; f < d.length; f++)
              gc(d[f]);
          } else {
            if ("datastale" === d)
              for (f = 0; f < c.length; f++)
                c[f].status = 4 === c[f].status ? 5 : 1;
            else
              for (S("transaction at " + b.toString() + " failed: " + d), f = 0; f < c.length; f++)
                c[f].status = 5, c[f].ne = d;
            Ni(a, b);
          }
        }, e);
      }
      function Ni(a, b) {
        var c = Xi(a, b),
            d = c.path(),
            c = Vi(a, c);
        Yi(a, c, d);
        return d;
      }
      function Yi(a, b, c) {
        if (0 !== b.length) {
          for (var d = [],
              e = [],
              f = Na(b, function(a) {
                return 1 === a.status;
              }),
              f = Oa(f, function(a) {
                return a.Da;
              }),
              g = 0; g < b.length; g++) {
            var k = b[g],
                m = lf(c, k.path),
                l = !1,
                t;
            O(null !== m, "rerunTransactionsUnderNode_: relativePath should not be null.");
            if (5 === k.status)
              l = !0, t = k.ne, e = e.concat(si(a.M, k.Da, !0));
            else if (1 === k.status)
              if (25 <= k.Sf)
                l = !0, t = "maxretry", e = e.concat(si(a.M, k.Da, !0));
              else {
                var A = a.M.Aa(k.path, f) || H;
                k.rd = A;
                var I = b[g].update(A.J());
                p(I) ? (hg("transaction failed: Data returned ", I, k.path), m = Q(I), "object" === typeof I && null != I && y(I, ".priority") || (m = m.ia(A.C())), A = k.Da, I = Mi(a), I = Xc(m, I), k.sd = m, k.td = I, k.Da = a.Kd++, Ta(f, A), e = e.concat(pi(a.M, k.path, I, k.Da, k.gf)), e = e.concat(si(a.M, A, !0))) : (l = !0, t = "nodata", e = e.concat(si(a.M, k.Da, !0)));
              }
            dc(a.fa, c, e);
            e = [];
            l && (b[g].status = 3, setTimeout(b[g].le, Math.floor(0)), b[g].I && ("nodata" === t ? (k = new X(a, b[g].path), d.push(u(b[g].I, null, null, !1, new W(b[g].rd, k, R)))) : d.push(u(b[g].I, null, Error(t), !1, null))));
          }
          Ui(a, a.yc);
          for (g = 0; g < d.length; g++)
            gc(d[g]);
          Ti(a);
        }
      }
      function Xi(a, b) {
        for (var c,
            d = a.yc; null !== (c = K(b)) && null === d.Ea(); )
          d = Xf(d, c), b = N(b);
        return d;
      }
      function Vi(a, b) {
        var c = [];
        Zi(a, b, c);
        c.sort(function(a, b) {
          return a.Lf - b.Lf;
        });
        return c;
      }
      function Zi(a, b, c) {
        var d = b.Ea();
        if (null !== d)
          for (var e = 0; e < d.length; e++)
            c.push(d[e]);
        b.R(function(b) {
          Zi(a, b, c);
        });
      }
      function Ui(a, b) {
        var c = b.Ea();
        if (c) {
          for (var d = 0,
              e = 0; e < c.length; e++)
            3 !== c[e].status && (c[d] = c[e], d++);
          c.length = d;
          Yf(b, 0 < c.length ? c : null);
        }
        b.R(function(b) {
          Ui(a, b);
        });
      }
      function Qi(a, b) {
        var c = Xi(a, b).path(),
            d = Xf(a.yc, b);
        ag(d, function(b) {
          $i(a, b);
        });
        $i(a, d);
        $f(d, function(b) {
          $i(a, b);
        });
        return c;
      }
      function $i(a, b) {
        var c = b.Ea();
        if (null !== c) {
          for (var d = [],
              e = [],
              f = -1,
              g = 0; g < c.length; g++)
            4 !== c[g].status && (2 === c[g].status ? (O(f === g - 1, "All SENT items should be at beginning of queue."), f = g, c[g].status = 4, c[g].ne = "set") : (O(1 === c[g].status, "Unexpected transaction status in abort"), c[g].le(), e = e.concat(si(a.M, c[g].Da, !0)), c[g].I && d.push(u(c[g].I, null, Error("set"), !1, null))));
          -1 === f ? Yf(b, null) : c.length = f + 1;
          dc(a.fa, b.path(), e);
          for (g = 0; g < d.length; g++)
            gc(d[g]);
        }
      }
      ;
      function aj() {
        this.sc = {};
        this.ag = !1;
      }
      aj.prototype.Cb = function() {
        for (var a in this.sc)
          this.sc[a].Cb();
      };
      aj.prototype.vc = function() {
        for (var a in this.sc)
          this.sc[a].vc();
      };
      aj.prototype.ze = function() {
        this.ag = !0;
      };
      ba(aj);
      aj.prototype.interrupt = aj.prototype.Cb;
      aj.prototype.resume = aj.prototype.vc;
      function Y(a, b, c, d) {
        this.k = a;
        this.path = b;
        this.n = c;
        this.pc = d;
      }
      function bj(a) {
        var b = null,
            c = null;
        a.oa && (b = Od(a));
        a.ra && (c = Rd(a));
        if (a.g === re) {
          if (a.oa) {
            if ("[MIN_NAME]" != Nd(a))
              throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
            if ("string" !== typeof b)
              throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
          }
          if (a.ra) {
            if ("[MAX_NAME]" != Pd(a))
              throw Error("Query: When ordering by key, you may only pass one argument to startAt(), endAt(), or equalTo().");
            if ("string" !== typeof c)
              throw Error("Query: When ordering by key, the argument passed to startAt(), endAt(),or equalTo() must be a string.");
          }
        } else if (a.g === R) {
          if (null != b && !fg(b) || null != c && !fg(c))
            throw Error("Query: When ordering by priority, the first argument passed to startAt(), endAt(), or equalTo() must be a valid priority value (null, a number, or a string).");
        } else if (O(a.g instanceof ve || a.g === Be, "unknown index type."), null != b && "object" === typeof b || null != c && "object" === typeof c)
          throw Error("Query: First argument passed to startAt(), endAt(), or equalTo() cannot be an object.");
      }
      function cj(a) {
        if (a.oa && a.ra && a.la && (!a.la || "" === a.Rb))
          throw Error("Query: Can't combine startAt(), endAt(), and limit(). Use limitToFirst() or limitToLast() instead.");
      }
      function dj(a, b) {
        if (!0 === a.pc)
          throw Error(b + ": You can't combine multiple orderBy calls.");
      }
      h = Y.prototype;
      h.Mb = function() {
        D("Query.ref", 0, 0, arguments.length);
        return new X(this.k, this.path);
      };
      h.Ib = function(a, b, c, d) {
        D("Query.on", 2, 4, arguments.length);
        lg("Query.on", a, !1);
        F("Query.on", 2, b, !1);
        var e = ej("Query.on", c, d);
        if ("value" === a)
          Ri(this.k, this, new ii(b, e.cancel || null, e.Qa || null));
        else {
          var f = {};
          f[a] = b;
          Ri(this.k, this, new ji(f, e.cancel, e.Qa));
        }
        return b;
      };
      h.mc = function(a, b, c) {
        D("Query.off", 0, 3, arguments.length);
        lg("Query.off", a, !0);
        F("Query.off", 2, b, !0);
        Qb("Query.off", 3, c);
        var d = null,
            e = null;
        "value" === a ? d = new ii(b || null, null, c || null) : a && (b && (e = {}, e[a] = b), d = new ji(e, null, c || null));
        e = this.k;
        d = ".info" === K(this.path) ? e.Fd.nb(this, d) : e.M.nb(this, d);
        bc(e.fa, this.path, d);
      };
      h.Pg = function(a, b) {
        function c(k) {
          f && (f = !1, e.mc(a, c), b && b.call(d.Qa, k), g.resolve(k));
        }
        D("Query.once", 1, 4, arguments.length);
        lg("Query.once", a, !1);
        F("Query.once", 2, b, !0);
        var d = ej("Query.once", arguments[2], arguments[3]),
            e = this,
            f = !0,
            g = new B;
        Nb(g.D);
        this.Ib(a, c, function(b) {
          e.mc(a, c);
          d.cancel && d.cancel.call(d.Qa, b);
          g.reject(b);
        });
        return g.D;
      };
      h.Le = function(a) {
        S("Query.limit() being deprecated. Please use Query.limitToFirst() or Query.limitToLast() instead.");
        D("Query.limit", 1, 1, arguments.length);
        if (!fa(a) || Math.floor(a) !== a || 0 >= a)
          throw Error("Query.limit: First argument must be a positive integer.");
        if (this.n.la)
          throw Error("Query.limit: Limit was already set (by another call to limit, limitToFirst, orlimitToLast.");
        var b = this.n.Le(a);
        cj(b);
        return new Y(this.k, this.path, b, this.pc);
      };
      h.Me = function(a) {
        D("Query.limitToFirst", 1, 1, arguments.length);
        if (!fa(a) || Math.floor(a) !== a || 0 >= a)
          throw Error("Query.limitToFirst: First argument must be a positive integer.");
        if (this.n.la)
          throw Error("Query.limitToFirst: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new Y(this.k, this.path, this.n.Me(a), this.pc);
      };
      h.Ne = function(a) {
        D("Query.limitToLast", 1, 1, arguments.length);
        if (!fa(a) || Math.floor(a) !== a || 0 >= a)
          throw Error("Query.limitToLast: First argument must be a positive integer.");
        if (this.n.la)
          throw Error("Query.limitToLast: Limit was already set (by another call to limit, limitToFirst, or limitToLast).");
        return new Y(this.k, this.path, this.n.Ne(a), this.pc);
      };
      h.Qg = function(a) {
        D("Query.orderByChild", 1, 1, arguments.length);
        if ("$key" === a)
          throw Error('Query.orderByChild: "$key" is invalid.  Use Query.orderByKey() instead.');
        if ("$priority" === a)
          throw Error('Query.orderByChild: "$priority" is invalid.  Use Query.orderByPriority() instead.');
        if ("$value" === a)
          throw Error('Query.orderByChild: "$value" is invalid.  Use Query.orderByValue() instead.');
        ng("Query.orderByChild", a);
        dj(this, "Query.orderByChild");
        var b = new P(a);
        if (b.e())
          throw Error("Query.orderByChild: cannot pass in empty path.  Use Query.orderByValue() instead.");
        b = new ve(b);
        b = Fe(this.n, b);
        bj(b);
        return new Y(this.k, this.path, b, !0);
      };
      h.Rg = function() {
        D("Query.orderByKey", 0, 0, arguments.length);
        dj(this, "Query.orderByKey");
        var a = Fe(this.n, re);
        bj(a);
        return new Y(this.k, this.path, a, !0);
      };
      h.Sg = function() {
        D("Query.orderByPriority", 0, 0, arguments.length);
        dj(this, "Query.orderByPriority");
        var a = Fe(this.n, R);
        bj(a);
        return new Y(this.k, this.path, a, !0);
      };
      h.Tg = function() {
        D("Query.orderByValue", 0, 0, arguments.length);
        dj(this, "Query.orderByValue");
        var a = Fe(this.n, Be);
        bj(a);
        return new Y(this.k, this.path, a, !0);
      };
      h.ce = function(a, b) {
        D("Query.startAt", 0, 2, arguments.length);
        gg("Query.startAt", a, this.path, !0);
        mg("Query.startAt", b);
        var c = this.n.ce(a, b);
        cj(c);
        bj(c);
        if (this.n.oa)
          throw Error("Query.startAt: Starting point was already set (by another call to startAt or equalTo).");
        p(a) || (b = a = null);
        return new Y(this.k, this.path, c, this.pc);
      };
      h.vd = function(a, b) {
        D("Query.endAt", 0, 2, arguments.length);
        gg("Query.endAt", a, this.path, !0);
        mg("Query.endAt", b);
        var c = this.n.vd(a, b);
        cj(c);
        bj(c);
        if (this.n.ra)
          throw Error("Query.endAt: Ending point was already set (by another call to endAt or equalTo).");
        return new Y(this.k, this.path, c, this.pc);
      };
      h.tg = function(a, b) {
        D("Query.equalTo", 1, 2, arguments.length);
        gg("Query.equalTo", a, this.path, !1);
        mg("Query.equalTo", b);
        if (this.n.oa)
          throw Error("Query.equalTo: Starting point was already set (by another call to endAt or equalTo).");
        if (this.n.ra)
          throw Error("Query.equalTo: Ending point was already set (by another call to endAt or equalTo).");
        return this.ce(a, b).vd(a, b);
      };
      h.toString = function() {
        D("Query.toString", 0, 0, arguments.length);
        for (var a = this.path,
            b = "",
            c = a.aa; c < a.u.length; c++)
          "" !== a.u[c] && (b += "/" + encodeURIComponent(String(a.u[c])));
        return this.k.toString() + (b || "/");
      };
      h.wa = function() {
        var a = xd(Ge(this.n));
        return "{}" === a ? "default" : a;
      };
      function ej(a, b, c) {
        var d = {
          cancel: null,
          Qa: null
        };
        if (b && c)
          d.cancel = b, F(a, 3, d.cancel, !0), d.Qa = c, Qb(a, 4, d.Qa);
        else if (b)
          if ("object" === typeof b && null !== b)
            d.Qa = b;
          else if ("function" === typeof b)
            d.cancel = b;
          else
            throw Error(E(a, 3, !0) + " must either be a cancel callback or a context object.");
        return d;
      }
      Y.prototype.ref = Y.prototype.Mb;
      Y.prototype.on = Y.prototype.Ib;
      Y.prototype.off = Y.prototype.mc;
      Y.prototype.once = Y.prototype.Pg;
      Y.prototype.limit = Y.prototype.Le;
      Y.prototype.limitToFirst = Y.prototype.Me;
      Y.prototype.limitToLast = Y.prototype.Ne;
      Y.prototype.orderByChild = Y.prototype.Qg;
      Y.prototype.orderByKey = Y.prototype.Rg;
      Y.prototype.orderByPriority = Y.prototype.Sg;
      Y.prototype.orderByValue = Y.prototype.Tg;
      Y.prototype.startAt = Y.prototype.ce;
      Y.prototype.endAt = Y.prototype.vd;
      Y.prototype.equalTo = Y.prototype.tg;
      Y.prototype.toString = Y.prototype.toString;
      var Z = {};
      Z.zc = Rh;
      Z.DataConnection = Z.zc;
      Rh.prototype.dh = function(a, b) {
        this.Ia("q", {p: a}, b);
      };
      Z.zc.prototype.simpleListen = Z.zc.prototype.dh;
      Rh.prototype.sg = function(a, b) {
        this.Ia("echo", {d: a}, b);
      };
      Z.zc.prototype.echo = Z.zc.prototype.sg;
      Rh.prototype.interrupt = Rh.prototype.Cb;
      Z.dg = Fh;
      Z.RealTimeConnection = Z.dg;
      Fh.prototype.sendRequest = Fh.prototype.Ia;
      Fh.prototype.close = Fh.prototype.close;
      Z.Cg = function(a) {
        var b = Rh.prototype.put;
        Rh.prototype.put = function(c, d, e, f) {
          p(f) && (f = a());
          b.call(this, c, d, e, f);
        };
        return function() {
          Rh.prototype.put = b;
        };
      };
      Z.hijackHash = Z.Cg;
      Z.cg = dd;
      Z.ConnectionTarget = Z.cg;
      Z.wa = function(a) {
        return a.wa();
      };
      Z.queryIdentifier = Z.wa;
      Z.Fg = function(a) {
        return a.k.Va.ba;
      };
      Z.listens = Z.Fg;
      Z.ze = function(a) {
        a.ze();
      };
      Z.forceRestClient = Z.ze;
      function X(a, b) {
        var c,
            d,
            e;
        if (a instanceof Ji)
          c = a, d = b;
        else {
          D("new Firebase", 1, 2, arguments.length);
          d = sd(arguments[0]);
          c = d.fh;
          "firebase" === d.domain && rd(d.host + " is no longer supported. Please use <YOUR FIREBASE>.firebaseio.com instead");
          c && "undefined" != c || rd("Cannot parse Firebase url. Please use https://<YOUR FIREBASE>.firebaseio.com");
          d.ob || "undefined" !== typeof window && window.location && window.location.protocol && -1 !== window.location.protocol.indexOf("https:") && S("Insecure Firebase access from a secure page. Please use https in calls to new Firebase().");
          c = new dd(d.host, d.ob, c, "ws" === d.scheme || "wss" === d.scheme);
          d = new P(d.bd);
          e = d.toString();
          var f;
          !(f = !q(c.host) || 0 === c.host.length || !eg(c.lc)) && (f = 0 !== e.length) && (e && (e = e.replace(/^\/*\.info(\/|$)/, "/")), f = !(q(e) && 0 !== e.length && !cg.test(e)));
          if (f)
            throw Error(E("new Firebase", 1, !1) + 'must be a valid firebase URL and the path can\'t contain ".", "#", "$", "[", or "]".');
          if (b)
            if (b instanceof aj)
              e = b;
            else if (q(b))
              e = aj.yb(), c.Rd = b;
            else
              throw Error("Expected a valid Firebase.Context for second argument to new Firebase()");
          else
            e = aj.yb();
          f = c.toString();
          var g = z(e.sc, f);
          g || (g = new Ji(c, e.ag), e.sc[f] = g);
          c = g;
        }
        Y.call(this, c, d, De, !1);
        this.then = void 0;
        this["catch"] = void 0;
      }
      ka(X, Y);
      var fj = X,
          gj = ["Firebase"],
          hj = n;
      gj[0] in hj || !hj.execScript || hj.execScript("var " + gj[0]);
      for (var ij; gj.length && (ij = gj.shift()); )
        !gj.length && p(fj) ? hj[ij] = fj : hj = hj[ij] ? hj[ij] : hj[ij] = {};
      X.goOffline = function() {
        D("Firebase.goOffline", 0, 0, arguments.length);
        aj.yb().Cb();
      };
      X.goOnline = function() {
        D("Firebase.goOnline", 0, 0, arguments.length);
        aj.yb().vc();
      };
      X.enableLogging = od;
      X.ServerValue = {TIMESTAMP: {".sv": "timestamp"}};
      X.SDK_VERSION = Eb;
      X.INTERNAL = U;
      X.Context = aj;
      X.TEST_ACCESS = Z;
      X.prototype.name = function() {
        S("Firebase.name() being deprecated. Please use Firebase.key() instead.");
        D("Firebase.name", 0, 0, arguments.length);
        return this.key();
      };
      X.prototype.name = X.prototype.name;
      X.prototype.key = function() {
        D("Firebase.key", 0, 0, arguments.length);
        return this.path.e() ? null : me(this.path);
      };
      X.prototype.key = X.prototype.key;
      X.prototype.o = function(a) {
        D("Firebase.child", 1, 1, arguments.length);
        if (fa(a))
          a = String(a);
        else if (!(a instanceof P))
          if (null === K(this.path)) {
            var b = a;
            b && (b = b.replace(/^\/*\.info(\/|$)/, "/"));
            ng("Firebase.child", b);
          } else
            ng("Firebase.child", a);
        return new X(this.k, this.path.o(a));
      };
      X.prototype.child = X.prototype.o;
      X.prototype.parent = function() {
        D("Firebase.parent", 0, 0, arguments.length);
        var a = this.path.parent();
        return null === a ? null : new X(this.k, a);
      };
      X.prototype.parent = X.prototype.parent;
      X.prototype.root = function() {
        D("Firebase.ref", 0, 0, arguments.length);
        for (var a = this; null !== a.parent(); )
          a = a.parent();
        return a;
      };
      X.prototype.root = X.prototype.root;
      X.prototype.set = function(a, b) {
        D("Firebase.set", 1, 2, arguments.length);
        og("Firebase.set", this.path);
        gg("Firebase.set", a, this.path, !1);
        F("Firebase.set", 2, b, !0);
        var c = new B;
        this.k.Ob(this.path, a, null, C(c, b));
        return c.D;
      };
      X.prototype.set = X.prototype.set;
      X.prototype.update = function(a, b) {
        D("Firebase.update", 1, 2, arguments.length);
        og("Firebase.update", this.path);
        if (da(a)) {
          for (var c = {},
              d = 0; d < a.length; ++d)
            c["" + d] = a[d];
          a = c;
          S("Passing an Array to Firebase.update() is deprecated. Use set() if you want to overwrite the existing data, or an Object with integer keys if you really do want to only update some of the children.");
        }
        jg("Firebase.update", a, this.path);
        F("Firebase.update", 2, b, !0);
        c = new B;
        this.k.update(this.path, a, C(c, b));
        return c.D;
      };
      X.prototype.update = X.prototype.update;
      X.prototype.Ob = function(a, b, c) {
        D("Firebase.setWithPriority", 2, 3, arguments.length);
        og("Firebase.setWithPriority", this.path);
        gg("Firebase.setWithPriority", a, this.path, !1);
        kg("Firebase.setWithPriority", 2, b);
        F("Firebase.setWithPriority", 3, c, !0);
        if (".length" === this.key() || ".keys" === this.key())
          throw "Firebase.setWithPriority failed: " + this.key() + " is a read-only object.";
        var d = new B;
        this.k.Ob(this.path, a, b, C(d, c));
        return d.D;
      };
      X.prototype.setWithPriority = X.prototype.Ob;
      X.prototype.remove = function(a) {
        D("Firebase.remove", 0, 1, arguments.length);
        og("Firebase.remove", this.path);
        F("Firebase.remove", 1, a, !0);
        return this.set(null, a);
      };
      X.prototype.remove = X.prototype.remove;
      X.prototype.transaction = function(a, b, c) {
        D("Firebase.transaction", 1, 3, arguments.length);
        og("Firebase.transaction", this.path);
        F("Firebase.transaction", 1, a, !1);
        F("Firebase.transaction", 2, b, !0);
        if (p(c) && "boolean" != typeof c)
          throw Error(E("Firebase.transaction", 3, !0) + "must be a boolean.");
        if (".length" === this.key() || ".keys" === this.key())
          throw "Firebase.transaction failed: " + this.key() + " is a read-only object.";
        "undefined" === typeof c && (c = !0);
        var d = new B;
        r(b) && Nb(d.D);
        Si(this.k, this.path, a, function(a, c, g) {
          a ? d.reject(a) : d.resolve(new ei(c, g));
          r(b) && b(a, c, g);
        }, c);
        return d.D;
      };
      X.prototype.transaction = X.prototype.transaction;
      X.prototype.$g = function(a, b) {
        D("Firebase.setPriority", 1, 2, arguments.length);
        og("Firebase.setPriority", this.path);
        kg("Firebase.setPriority", 1, a);
        F("Firebase.setPriority", 2, b, !0);
        var c = new B;
        this.k.Ob(this.path.o(".priority"), a, null, C(c, b));
        return c.D;
      };
      X.prototype.setPriority = X.prototype.$g;
      X.prototype.push = function(a, b) {
        D("Firebase.push", 0, 2, arguments.length);
        og("Firebase.push", this.path);
        gg("Firebase.push", a, this.path, !0);
        F("Firebase.push", 2, b, !0);
        var c = Li(this.k),
            d = hf(c),
            c = this.o(d);
        if (null != a) {
          var e = this,
              f = c.set(a, b).then(function() {
                return e.o(d);
              });
          c.then = u(f.then, f);
          c["catch"] = u(f.then, f, void 0);
          r(b) && Nb(f);
        }
        return c;
      };
      X.prototype.push = X.prototype.push;
      X.prototype.lb = function() {
        og("Firebase.onDisconnect", this.path);
        return new V(this.k, this.path);
      };
      X.prototype.onDisconnect = X.prototype.lb;
      X.prototype.O = function(a, b, c) {
        S("FirebaseRef.auth() being deprecated. Please use FirebaseRef.authWithCustomToken() instead.");
        D("Firebase.auth", 1, 3, arguments.length);
        pg("Firebase.auth", a);
        F("Firebase.auth", 2, b, !0);
        F("Firebase.auth", 3, b, !0);
        var d = new B;
        dh(this.k.O, a, {}, {remember: "none"}, C(d, b), c);
        return d.D;
      };
      X.prototype.auth = X.prototype.O;
      X.prototype.je = function(a) {
        D("Firebase.unauth", 0, 1, arguments.length);
        F("Firebase.unauth", 1, a, !0);
        var b = new B;
        eh(this.k.O, C(b, a));
        return b.D;
      };
      X.prototype.unauth = X.prototype.je;
      X.prototype.Be = function() {
        D("Firebase.getAuth", 0, 0, arguments.length);
        return this.k.O.Be();
      };
      X.prototype.getAuth = X.prototype.Be;
      X.prototype.Jg = function(a, b) {
        D("Firebase.onAuth", 1, 2, arguments.length);
        F("Firebase.onAuth", 1, a, !1);
        Qb("Firebase.onAuth", 2, b);
        this.k.O.Ib("auth_status", a, b);
      };
      X.prototype.onAuth = X.prototype.Jg;
      X.prototype.Ig = function(a, b) {
        D("Firebase.offAuth", 1, 2, arguments.length);
        F("Firebase.offAuth", 1, a, !1);
        Qb("Firebase.offAuth", 2, b);
        this.k.O.mc("auth_status", a, b);
      };
      X.prototype.offAuth = X.prototype.Ig;
      X.prototype.hg = function(a, b, c) {
        D("Firebase.authWithCustomToken", 1, 3, arguments.length);
        2 === arguments.length && Hb(b) && (c = b, b = void 0);
        pg("Firebase.authWithCustomToken", a);
        F("Firebase.authWithCustomToken", 2, b, !0);
        sg("Firebase.authWithCustomToken", 3, c, !0);
        var d = new B;
        dh(this.k.O, a, {}, c || {}, C(d, b));
        return d.D;
      };
      X.prototype.authWithCustomToken = X.prototype.hg;
      X.prototype.ig = function(a, b, c) {
        D("Firebase.authWithOAuthPopup", 1, 3, arguments.length);
        2 === arguments.length && Hb(b) && (c = b, b = void 0);
        rg("Firebase.authWithOAuthPopup", a);
        F("Firebase.authWithOAuthPopup", 2, b, !0);
        sg("Firebase.authWithOAuthPopup", 3, c, !0);
        var d = new B;
        ih(this.k.O, a, c, C(d, b));
        return d.D;
      };
      X.prototype.authWithOAuthPopup = X.prototype.ig;
      X.prototype.jg = function(a, b, c) {
        D("Firebase.authWithOAuthRedirect", 1, 3, arguments.length);
        2 === arguments.length && Hb(b) && (c = b, b = void 0);
        rg("Firebase.authWithOAuthRedirect", a);
        F("Firebase.authWithOAuthRedirect", 2, b, !1);
        sg("Firebase.authWithOAuthRedirect", 3, c, !0);
        var d = new B,
            e = this.k.O,
            f = c,
            g = C(d, b);
        gh(e);
        var k = [Qg],
            f = Ag(f);
        "anonymous" === a || "firebase" === a ? T(g, Sg("TRANSPORT_UNAVAILABLE")) : (cd.set("redirect_client_options", f.qd), hh(e, k, "/auth/" + a, f, g));
        return d.D;
      };
      X.prototype.authWithOAuthRedirect = X.prototype.jg;
      X.prototype.kg = function(a, b, c, d) {
        D("Firebase.authWithOAuthToken", 2, 4, arguments.length);
        3 === arguments.length && Hb(c) && (d = c, c = void 0);
        rg("Firebase.authWithOAuthToken", a);
        F("Firebase.authWithOAuthToken", 3, c, !0);
        sg("Firebase.authWithOAuthToken", 4, d, !0);
        var e = new B;
        q(b) ? (qg("Firebase.authWithOAuthToken", 2, b), fh(this.k.O, a + "/token", {access_token: b}, d, C(e, c))) : (sg("Firebase.authWithOAuthToken", 2, b, !1), fh(this.k.O, a + "/token", b, d, C(e, c)));
        return e.D;
      };
      X.prototype.authWithOAuthToken = X.prototype.kg;
      X.prototype.gg = function(a, b) {
        D("Firebase.authAnonymously", 0, 2, arguments.length);
        1 === arguments.length && Hb(a) && (b = a, a = void 0);
        F("Firebase.authAnonymously", 1, a, !0);
        sg("Firebase.authAnonymously", 2, b, !0);
        var c = new B;
        fh(this.k.O, "anonymous", {}, b, C(c, a));
        return c.D;
      };
      X.prototype.authAnonymously = X.prototype.gg;
      X.prototype.lg = function(a, b, c) {
        D("Firebase.authWithPassword", 1, 3, arguments.length);
        2 === arguments.length && Hb(b) && (c = b, b = void 0);
        sg("Firebase.authWithPassword", 1, a, !1);
        tg("Firebase.authWithPassword", a, "email");
        tg("Firebase.authWithPassword", a, "password");
        F("Firebase.authWithPassword", 2, b, !0);
        sg("Firebase.authWithPassword", 3, c, !0);
        var d = new B;
        fh(this.k.O, "password", a, c, C(d, b));
        return d.D;
      };
      X.prototype.authWithPassword = X.prototype.lg;
      X.prototype.ve = function(a, b) {
        D("Firebase.createUser", 1, 2, arguments.length);
        sg("Firebase.createUser", 1, a, !1);
        tg("Firebase.createUser", a, "email");
        tg("Firebase.createUser", a, "password");
        F("Firebase.createUser", 2, b, !0);
        var c = new B;
        this.k.O.ve(a, C(c, b));
        return c.D;
      };
      X.prototype.createUser = X.prototype.ve;
      X.prototype.Xe = function(a, b) {
        D("Firebase.removeUser", 1, 2, arguments.length);
        sg("Firebase.removeUser", 1, a, !1);
        tg("Firebase.removeUser", a, "email");
        tg("Firebase.removeUser", a, "password");
        F("Firebase.removeUser", 2, b, !0);
        var c = new B;
        this.k.O.Xe(a, C(c, b));
        return c.D;
      };
      X.prototype.removeUser = X.prototype.Xe;
      X.prototype.se = function(a, b) {
        D("Firebase.changePassword", 1, 2, arguments.length);
        sg("Firebase.changePassword", 1, a, !1);
        tg("Firebase.changePassword", a, "email");
        tg("Firebase.changePassword", a, "oldPassword");
        tg("Firebase.changePassword", a, "newPassword");
        F("Firebase.changePassword", 2, b, !0);
        var c = new B;
        this.k.O.se(a, C(c, b));
        return c.D;
      };
      X.prototype.changePassword = X.prototype.se;
      X.prototype.re = function(a, b) {
        D("Firebase.changeEmail", 1, 2, arguments.length);
        sg("Firebase.changeEmail", 1, a, !1);
        tg("Firebase.changeEmail", a, "oldEmail");
        tg("Firebase.changeEmail", a, "newEmail");
        tg("Firebase.changeEmail", a, "password");
        F("Firebase.changeEmail", 2, b, !0);
        var c = new B;
        this.k.O.re(a, C(c, b));
        return c.D;
      };
      X.prototype.changeEmail = X.prototype.re;
      X.prototype.Ze = function(a, b) {
        D("Firebase.resetPassword", 1, 2, arguments.length);
        sg("Firebase.resetPassword", 1, a, !1);
        tg("Firebase.resetPassword", a, "email");
        F("Firebase.resetPassword", 2, b, !0);
        var c = new B;
        this.k.O.Ze(a, C(c, b));
        return c.D;
      };
      X.prototype.resetPassword = X.prototype.Ze;
    })();
  })();
  return _retrieveGlobal();
});

$__System.registerDynamic("3", [], true, function($__require, exports, module) {
  ;
  var define,
      global = this,
      GLOBAL = this;
  (function(root) {
    var debug = false;
    var BIG_ENDIAN = false,
        LITTLE_ENDIAN = true,
        TYPE_LENGTH = Uint8Array.BYTES_PER_ELEMENT,
        LENGTH_LENGTH = Uint16Array.BYTES_PER_ELEMENT,
        BYTES_LENGTH = Uint32Array.BYTES_PER_ELEMENT;
    var Types = {
      NULL: 0,
      UNDEFINED: 1,
      STRING: 2,
      NUMBER: 3,
      BOOLEAN: 4,
      ARRAY: 5,
      OBJECT: 6,
      INT8ARRAY: 7,
      INT16ARRAY: 8,
      INT32ARRAY: 9,
      UINT8ARRAY: 10,
      UINT16ARRAY: 11,
      UINT32ARRAY: 12,
      FLOAT32ARRAY: 13,
      FLOAT64ARRAY: 14,
      ARRAYBUFFER: 15,
      BLOB: 16,
      FILE: 16,
      BUFFER: 17
    };
    if (debug) {
      var TypeNames = ['NULL', 'UNDEFINED', 'STRING', 'NUMBER', 'BOOLEAN', 'ARRAY', 'OBJECT', 'INT8ARRAY', 'INT16ARRAY', 'INT32ARRAY', 'UINT8ARRAY', 'UINT16ARRAY', 'UINT32ARRAY', 'FLOAT32ARRAY', 'FLOAT64ARRAY', 'ARRAYBUFFER', 'BLOB', 'BUFFER'];
    }
    var Length = [null, null, 'Uint16', 'Float64', 'Uint8', null, null, 'Int8', 'Int16', 'Int32', 'Uint8', 'Uint16', 'Uint32', 'Float32', 'Float64', 'Uint8', 'Uint8', 'Uint8'];
    var binary_dump = function(view, start, length) {
      var table = [],
          endianness = BIG_ENDIAN,
          ROW_LENGTH = 40;
      table[0] = [];
      for (var i = 0; i < ROW_LENGTH; i++) {
        table[0][i] = i < 10 ? '0' + i.toString(10) : i.toString(10);
      }
      for (i = 0; i < length; i++) {
        var code = view.getUint8(start + i, endianness);
        var index = ~~(i / ROW_LENGTH) + 1;
        if (typeof table[index] === 'undefined')
          table[index] = [];
        table[index][i % ROW_LENGTH] = code < 16 ? '0' + code.toString(16) : code.toString(16);
      }
      console.log('%c' + table[0].join(' '), 'font-weight: bold;');
      for (i = 1; i < table.length; i++) {
        console.log(table[i].join(' '));
      }
    };
    var find_type = function(obj) {
      var type = undefined;
      if (obj === undefined) {
        type = Types.UNDEFINED;
      } else if (obj === null) {
        type = Types.NULL;
      } else {
        var const_name = obj.constructor.name;
        if (const_name !== undefined) {
          type = Types[const_name.toUpperCase()];
        } else {
          switch (typeof obj) {
            case 'string':
              type = Types.STRING;
              break;
            case 'number':
              type = Types.NUMBER;
              break;
            case 'boolean':
              type = Types.BOOLEAN;
              break;
            case 'object':
              if (obj instanceof Array) {
                type = Types.ARRAY;
              } else if (obj instanceof Int8Array) {
                type = Types.INT8ARRAY;
              } else if (obj instanceof Int16Array) {
                type = Types.INT16ARRAY;
              } else if (obj instanceof Int32Array) {
                type = Types.INT32ARRAY;
              } else if (obj instanceof Uint8Array) {
                type = Types.UINT8ARRAY;
              } else if (obj instanceof Uint16Array) {
                type = Types.UINT16ARRAY;
              } else if (obj instanceof Uint32Array) {
                type = Types.UINT32ARRAY;
              } else if (obj instanceof Float32Array) {
                type = Types.FLOAT32ARRAY;
              } else if (obj instanceof Float64Array) {
                type = Types.FLOAT64ARRAY;
              } else if (obj instanceof ArrayBuffer) {
                type = Types.ARRAYBUFFER;
              } else if (obj instanceof Blob) {
                type = Types.BLOB;
              } else if (obj instanceof Buffer) {
                type = Types.BUFFER;
              } else if (obj instanceof Object) {
                type = Types.OBJECT;
              }
              break;
            default:
              break;
          }
        }
      }
      return type;
    };
    var utf16_utf8 = function(string) {
      return unescape(encodeURIComponent(string));
    };
    var utf8_utf16 = function(bytes) {
      return decodeURIComponent(escape(bytes));
    };
    var pack = function(serialized) {
      var cursor = 0,
          i = 0,
          j = 0,
          endianness = BIG_ENDIAN;
      var ab = new ArrayBuffer(serialized[0].byte_length + serialized[0].header_size);
      var view = new DataView(ab);
      for (i = 0; i < serialized.length; i++) {
        var start = cursor,
            header_size = serialized[i].header_size,
            type = serialized[i].type,
            length = serialized[i].length,
            value = serialized[i].value,
            byte_length = serialized[i].byte_length,
            type_name = Length[type],
            unit = type_name === null ? 0 : root[type_name + 'Array'].BYTES_PER_ELEMENT;
        if (type === Types.BUFFER) {
          view.setUint8(cursor, Types.BLOB, endianness);
        } else {
          view.setUint8(cursor, type, endianness);
        }
        cursor += TYPE_LENGTH;
        if (debug) {
          console.info('Packing', type, TypeNames[type]);
        }
        if (type === Types.ARRAY || type === Types.OBJECT) {
          view.setUint16(cursor, length, endianness);
          cursor += LENGTH_LENGTH;
          if (debug) {
            console.info('Content Length', length);
          }
        }
        view.setUint32(cursor, byte_length, endianness);
        cursor += BYTES_LENGTH;
        if (debug) {
          console.info('Header Size', header_size, 'bytes');
          console.info('Byte Length', byte_length, 'bytes');
        }
        switch (type) {
          case Types.NULL:
          case Types.UNDEFINED:
            break;
          case Types.STRING:
            if (debug) {
              console.info('Actual Content %c"' + value + '"', 'font-weight:bold;');
            }
            for (j = 0; j < length; j++, cursor += unit) {
              view.setUint16(cursor, value.charCodeAt(j), endianness);
            }
            break;
          case Types.NUMBER:
          case Types.BOOLEAN:
            if (debug) {
              console.info('%c' + value.toString(), 'font-weight:bold;');
            }
            view['set' + type_name](cursor, value, endianness);
            cursor += unit;
            break;
          case Types.INT8ARRAY:
          case Types.INT16ARRAY:
          case Types.INT32ARRAY:
          case Types.UINT8ARRAY:
          case Types.UINT16ARRAY:
          case Types.UINT32ARRAY:
          case Types.FLOAT32ARRAY:
          case Types.FLOAT64ARRAY:
            var _view = new Uint8Array(view.buffer, cursor, byte_length);
            _view.set(new Uint8Array(value.buffer));
            cursor += byte_length;
            break;
          case Types.ARRAYBUFFER:
          case Types.BUFFER:
            var _view = new Uint8Array(view.buffer, cursor, byte_length);
            _view.set(new Uint8Array(value));
            cursor += byte_length;
            break;
          case Types.BLOB:
          case Types.ARRAY:
          case Types.OBJECT:
            break;
          default:
            throw 'TypeError: Unexpected type found.';
        }
        if (debug) {
          binary_dump(view, start, cursor - start);
        }
      }
      return view;
    };
    var unpack = function(view, cursor) {
      var i = 0,
          endianness = BIG_ENDIAN,
          start = cursor;
      var type,
          length,
          byte_length,
          value,
          elem;
      type = view.getUint8(cursor, endianness);
      cursor += TYPE_LENGTH;
      if (debug) {
        console.info('Unpacking', type, TypeNames[type]);
      }
      if (type === Types.ARRAY || type === Types.OBJECT) {
        length = view.getUint16(cursor, endianness);
        cursor += LENGTH_LENGTH;
        if (debug) {
          console.info('Content Length', length);
        }
      }
      byte_length = view.getUint32(cursor, endianness);
      cursor += BYTES_LENGTH;
      if (debug) {
        console.info('Byte Length', byte_length, 'bytes');
      }
      var type_name = Length[type];
      var unit = type_name === null ? 0 : root[type_name + 'Array'].BYTES_PER_ELEMENT;
      switch (type) {
        case Types.NULL:
        case Types.UNDEFINED:
          if (debug) {
            binary_dump(view, start, cursor - start);
          }
          value = null;
          break;
        case Types.STRING:
          length = byte_length / unit;
          var string = [];
          for (i = 0; i < length; i++) {
            var code = view.getUint16(cursor, endianness);
            cursor += unit;
            string.push(String.fromCharCode(code));
          }
          value = string.join('');
          if (debug) {
            console.info('Actual Content %c"' + value + '"', 'font-weight:bold;');
            binary_dump(view, start, cursor - start);
          }
          break;
        case Types.NUMBER:
          value = view.getFloat64(cursor, endianness);
          cursor += unit;
          if (debug) {
            console.info('Actual Content %c"' + value.toString() + '"', 'font-weight:bold;');
            binary_dump(view, start, cursor - start);
          }
          break;
        case Types.BOOLEAN:
          value = view.getUint8(cursor, endianness) === 1 ? true : false;
          cursor += unit;
          if (debug) {
            console.info('Actual Content %c"' + value.toString() + '"', 'font-weight:bold;');
            binary_dump(view, start, cursor - start);
          }
          break;
        case Types.INT8ARRAY:
        case Types.INT16ARRAY:
        case Types.INT32ARRAY:
        case Types.UINT8ARRAY:
        case Types.UINT16ARRAY:
        case Types.UINT32ARRAY:
        case Types.FLOAT32ARRAY:
        case Types.FLOAT64ARRAY:
        case Types.ARRAYBUFFER:
          elem = view.buffer.slice(cursor, cursor + byte_length);
          cursor += byte_length;
          if (type === Types.ARRAYBUFFER) {
            value = elem;
          } else {
            value = new root[type_name + 'Array'](elem);
          }
          if (debug) {
            binary_dump(view, start, cursor - start);
          }
          break;
        case Types.BLOB:
          if (debug) {
            binary_dump(view, start, cursor - start);
          }
          if (root.Blob) {
            var mime = unpack(view, cursor);
            var buffer = unpack(view, mime.cursor);
            cursor = buffer.cursor;
            value = new Blob([buffer.value], {type: mime.value});
          } else {
            elem = view.buffer.slice(cursor, cursor + byte_length);
            cursor += byte_length;
            value = new Buffer(elem);
          }
          break;
        case Types.ARRAY:
          if (debug) {
            binary_dump(view, start, cursor - start);
          }
          value = [];
          for (i = 0; i < length; i++) {
            elem = unpack(view, cursor);
            cursor = elem.cursor;
            value.push(elem.value);
          }
          break;
        case Types.OBJECT:
          if (debug) {
            binary_dump(view, start, cursor - start);
          }
          value = {};
          for (i = 0; i < length; i++) {
            var key = unpack(view, cursor);
            var val = unpack(view, key.cursor);
            cursor = val.cursor;
            value[key.value] = val.value;
          }
          break;
        default:
          throw 'TypeError: Type not supported.';
      }
      return {
        value: value,
        cursor: cursor
      };
    };
    var deferredSerialize = function(array, callback) {
      var length = array.length,
          results = [],
          count = 0,
          byte_length = 0;
      for (var i = 0; i < array.length; i++) {
        (function(index) {
          serialize(array[index], function(result) {
            results[index] = result;
            byte_length += result[0].header_size + result[0].byte_length;
            if (++count === length) {
              var array = [];
              for (var j = 0; j < results.length; j++) {
                array = array.concat(results[j]);
              }
              callback(array, byte_length);
            }
          });
        })(i);
      }
    };
    var serialize = function(obj, callback) {
      var subarray = [],
          unit = 1,
          header_size = TYPE_LENGTH + BYTES_LENGTH,
          type,
          byte_length = 0,
          length = 0,
          value = obj;
      type = find_type(obj);
      unit = Length[type] === undefined || Length[type] === null ? 0 : root[Length[type] + 'Array'].BYTES_PER_ELEMENT;
      switch (type) {
        case Types.UNDEFINED:
        case Types.NULL:
          break;
        case Types.NUMBER:
        case Types.BOOLEAN:
          byte_length = unit;
          break;
        case Types.STRING:
          length = obj.length;
          byte_length += length * unit;
          break;
        case Types.INT8ARRAY:
        case Types.INT16ARRAY:
        case Types.INT32ARRAY:
        case Types.UINT8ARRAY:
        case Types.UINT16ARRAY:
        case Types.UINT32ARRAY:
        case Types.FLOAT32ARRAY:
        case Types.FLOAT64ARRAY:
          length = obj.length;
          byte_length += length * unit;
          break;
        case Types.ARRAY:
          deferredSerialize(obj, function(subarray, byte_length) {
            callback([{
              type: type,
              length: obj.length,
              header_size: header_size + LENGTH_LENGTH,
              byte_length: byte_length,
              value: null
            }].concat(subarray));
          });
          return;
        case Types.OBJECT:
          var deferred = [];
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              deferred.push(key);
              deferred.push(obj[key]);
              length++;
            }
          }
          deferredSerialize(deferred, function(subarray, byte_length) {
            callback([{
              type: type,
              length: length,
              header_size: header_size + LENGTH_LENGTH,
              byte_length: byte_length,
              value: null
            }].concat(subarray));
          });
          return;
        case Types.ARRAYBUFFER:
          byte_length += obj.byteLength;
          break;
        case Types.BLOB:
          var mime_type = obj.type;
          var reader = new FileReader();
          reader.onload = function(e) {
            deferredSerialize([mime_type, e.target.result], function(subarray, byte_length) {
              callback([{
                type: type,
                length: length,
                header_size: header_size,
                byte_length: byte_length,
                value: null
              }].concat(subarray));
            });
          };
          reader.onerror = function(e) {
            throw 'FileReader Error: ' + e;
          };
          reader.readAsArrayBuffer(obj);
          return;
        case Types.BUFFER:
          byte_length += obj.length;
          break;
        default:
          throw 'TypeError: Type "' + obj.constructor.name + '" not supported.';
      }
      callback([{
        type: type,
        length: length,
        header_size: header_size,
        byte_length: byte_length,
        value: value
      }].concat(subarray));
    };
    var deserialize = function(buffer, callback) {
      var view = new DataView(buffer);
      var result = unpack(view, 0);
      return result.value;
    };
    if (debug) {
      root.Test = {
        BIG_ENDIAN: BIG_ENDIAN,
        LITTLE_ENDIAN: LITTLE_ENDIAN,
        Types: Types,
        pack: pack,
        unpack: unpack,
        serialize: serialize,
        deserialize: deserialize
      };
    }
    var binarize = {
      pack: function(obj, callback) {
        try {
          if (debug)
            console.info('%cPacking Start', 'font-weight: bold; color: red;', obj);
          serialize(obj, function(array) {
            if (debug)
              console.info('Serialized Object', array);
            callback(pack(array));
          });
        } catch (e) {
          throw e;
        }
      },
      unpack: function(buffer, callback) {
        try {
          if (debug)
            console.info('%cUnpacking Start', 'font-weight: bold; color: red;', buffer);
          var result = deserialize(buffer);
          if (debug)
            console.info('Deserialized Object', result);
          callback(result);
        } catch (e) {
          throw e;
        }
      }
    };
    if (typeof module !== 'undefined' && module.exports) {
      module.exports = binarize;
    } else {
      root.binarize = binarize;
    }
  })(typeof global !== 'undefined' ? global : this);
  return module.exports;
});

(function() {
var define = $__System.amdDefine;
(function(e) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = e();
  } else if (typeof define === "function" && define.amd) {
    define("4", [], e);
  } else {
    var t;
    if (typeof window !== "undefined") {
      t = window;
    } else if (typeof global !== "undefined") {
      t = global;
    } else if (typeof self !== "undefined") {
      t = self;
    } else {
      t = this;
    }
    t.SimplePeer = e();
  }
})(function() {
  var e,
      t,
      r;
  return function n(e, t, r) {
    function i(s, a) {
      if (!t[s]) {
        if (!e[s]) {
          var f = typeof require == "function" && require;
          if (!a && f)
            return f(s, !0);
          if (o)
            return o(s, !0);
          var u = new Error("Cannot find module '" + s + "'");
          throw u.code = "MODULE_NOT_FOUND", u;
        }
        var c = t[s] = {exports: {}};
        e[s][0].call(c.exports, function(t) {
          var r = e[s][1][t];
          return i(r ? r : t);
        }, c, c.exports, n, e, t, r);
      }
      return t[s].exports;
    }
    var o = typeof require == "function" && require;
    for (var s = 0; s < r.length; s++)
      i(r[s]);
    return i;
  }({
    1: [function(e, t, r) {}, {}],
    2: [function(e, t, r) {
      (function(t) {
        "use strict";
        var n = e("base64-js");
        var i = e("ieee754");
        var o = e("isarray");
        r.Buffer = u;
        r.SlowBuffer = m;
        r.INSPECT_MAX_BYTES = 50;
        u.poolSize = 8192;
        var s = {};
        u.TYPED_ARRAY_SUPPORT = t.TYPED_ARRAY_SUPPORT !== undefined ? t.TYPED_ARRAY_SUPPORT : a();
        function a() {
          try {
            var e = new Uint8Array(1);
            e.foo = function() {
              return 42;
            };
            return e.foo() === 42 && typeof e.subarray === "function" && e.subarray(1, 1).byteLength === 0;
          } catch (t) {
            return false;
          }
        }
        function f() {
          return u.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function u(e) {
          if (!(this instanceof u)) {
            if (arguments.length > 1)
              return new u(e, arguments[1]);
            return new u(e);
          }
          if (!u.TYPED_ARRAY_SUPPORT) {
            this.length = 0;
            this.parent = undefined;
          }
          if (typeof e === "number") {
            return c(this, e);
          }
          if (typeof e === "string") {
            return l(this, e, arguments.length > 1 ? arguments[1] : "utf8");
          }
          return h(this, e);
        }
        u._augment = function(e) {
          e.__proto__ = u.prototype;
          return e;
        };
        function c(e, t) {
          e = _(e, t < 0 ? 0 : b(t) | 0);
          if (!u.TYPED_ARRAY_SUPPORT) {
            for (var r = 0; r < t; r++) {
              e[r] = 0;
            }
          }
          return e;
        }
        function l(e, t, r) {
          if (typeof r !== "string" || r === "")
            r = "utf8";
          var n = R(t, r) | 0;
          e = _(e, n);
          e.write(t, r);
          return e;
        }
        function h(e, t) {
          if (u.isBuffer(t))
            return d(e, t);
          if (o(t))
            return p(e, t);
          if (t == null) {
            throw new TypeError("must start with number, buffer, array or string");
          }
          if (typeof ArrayBuffer !== "undefined") {
            if (t.buffer instanceof ArrayBuffer) {
              return g(e, t);
            }
            if (t instanceof ArrayBuffer) {
              return v(e, t);
            }
          }
          if (t.length)
            return y(e, t);
          return w(e, t);
        }
        function d(e, t) {
          var r = b(t.length) | 0;
          e = _(e, r);
          t.copy(e, 0, 0, r);
          return e;
        }
        function p(e, t) {
          var r = b(t.length) | 0;
          e = _(e, r);
          for (var n = 0; n < r; n += 1) {
            e[n] = t[n] & 255;
          }
          return e;
        }
        function g(e, t) {
          var r = b(t.length) | 0;
          e = _(e, r);
          for (var n = 0; n < r; n += 1) {
            e[n] = t[n] & 255;
          }
          return e;
        }
        function v(e, t) {
          t.byteLength;
          if (u.TYPED_ARRAY_SUPPORT) {
            e = new Uint8Array(t);
            e.__proto__ = u.prototype;
          } else {
            e = g(e, new Uint8Array(t));
          }
          return e;
        }
        function y(e, t) {
          var r = b(t.length) | 0;
          e = _(e, r);
          for (var n = 0; n < r; n += 1) {
            e[n] = t[n] & 255;
          }
          return e;
        }
        function w(e, t) {
          var r;
          var n = 0;
          if (t.type === "Buffer" && o(t.data)) {
            r = t.data;
            n = b(r.length) | 0;
          }
          e = _(e, n);
          for (var i = 0; i < n; i += 1) {
            e[i] = r[i] & 255;
          }
          return e;
        }
        if (u.TYPED_ARRAY_SUPPORT) {
          u.prototype.__proto__ = Uint8Array.prototype;
          u.__proto__ = Uint8Array;
          if (typeof Symbol !== "undefined" && Symbol.species && u[Symbol.species] === u) {
            Object.defineProperty(u, Symbol.species, {
              value: null,
              configurable: true
            });
          }
        } else {
          u.prototype.length = undefined;
          u.prototype.parent = undefined;
        }
        function _(e, t) {
          if (u.TYPED_ARRAY_SUPPORT) {
            e = new Uint8Array(t);
            e.__proto__ = u.prototype;
          } else {
            e.length = t;
          }
          var r = t !== 0 && t <= u.poolSize >>> 1;
          if (r)
            e.parent = s;
          return e;
        }
        function b(e) {
          if (e >= f()) {
            throw new RangeError("Attempt to allocate Buffer larger than maximum " + "size: 0x" + f().toString(16) + " bytes");
          }
          return e | 0;
        }
        function m(e, t) {
          if (!(this instanceof m))
            return new m(e, t);
          var r = new u(e, t);
          delete r.parent;
          return r;
        }
        u.isBuffer = function ee(e) {
          return !!(e != null && e._isBuffer);
        };
        u.compare = function te(e, t) {
          if (!u.isBuffer(e) || !u.isBuffer(t)) {
            throw new TypeError("Arguments must be Buffers");
          }
          if (e === t)
            return 0;
          var r = e.length;
          var n = t.length;
          for (var i = 0,
              o = Math.min(r, n); i < o; ++i) {
            if (e[i] !== t[i]) {
              r = e[i];
              n = t[i];
              break;
            }
          }
          if (r < n)
            return -1;
          if (n < r)
            return 1;
          return 0;
        };
        u.isEncoding = function re(e) {
          switch (String(e).toLowerCase()) {
            case "hex":
            case "utf8":
            case "utf-8":
            case "ascii":
            case "binary":
            case "base64":
            case "raw":
            case "ucs2":
            case "ucs-2":
            case "utf16le":
            case "utf-16le":
              return true;
            default:
              return false;
          }
        };
        u.concat = function ne(e, t) {
          if (!o(e))
            throw new TypeError("list argument must be an Array of Buffers.");
          if (e.length === 0) {
            return new u(0);
          }
          var r;
          if (t === undefined) {
            t = 0;
            for (r = 0; r < e.length; r++) {
              t += e[r].length;
            }
          }
          var n = new u(t);
          var i = 0;
          for (r = 0; r < e.length; r++) {
            var s = e[r];
            s.copy(n, i);
            i += s.length;
          }
          return n;
        };
        function R(e, t) {
          if (typeof e !== "string")
            e = "" + e;
          var r = e.length;
          if (r === 0)
            return 0;
          var n = false;
          for (; ; ) {
            switch (t) {
              case "ascii":
              case "binary":
              case "raw":
              case "raws":
                return r;
              case "utf8":
              case "utf-8":
                return G(e).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return r * 2;
              case "hex":
                return r >>> 1;
              case "base64":
                return Q(e).length;
              default:
                if (n)
                  return G(e).length;
                t = ("" + t).toLowerCase();
                n = true;
            }
          }
        }
        u.byteLength = R;
        function E(e, t, r) {
          var n = false;
          t = t | 0;
          r = r === undefined || r === Infinity ? this.length : r | 0;
          if (!e)
            e = "utf8";
          if (t < 0)
            t = 0;
          if (r > this.length)
            r = this.length;
          if (r <= t)
            return "";
          while (true) {
            switch (e) {
              case "hex":
                return j(this, t, r);
              case "utf8":
              case "utf-8":
                return P(this, t, r);
              case "ascii":
                return D(this, t, r);
              case "binary":
                return I(this, t, r);
              case "base64":
                return x(this, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return O(this, t, r);
              default:
                if (n)
                  throw new TypeError("Unknown encoding: " + e);
                e = (e + "").toLowerCase();
                n = true;
            }
          }
        }
        u.prototype._isBuffer = true;
        u.prototype.toString = function ie() {
          var e = this.length | 0;
          if (e === 0)
            return "";
          if (arguments.length === 0)
            return P(this, 0, e);
          return E.apply(this, arguments);
        };
        u.prototype.equals = function oe(e) {
          if (!u.isBuffer(e))
            throw new TypeError("Argument must be a Buffer");
          if (this === e)
            return true;
          return u.compare(this, e) === 0;
        };
        u.prototype.inspect = function se() {
          var e = "";
          var t = r.INSPECT_MAX_BYTES;
          if (this.length > 0) {
            e = this.toString("hex", 0, t).match(/.{2}/g).join(" ");
            if (this.length > t)
              e += " ... ";
          }
          return "<Buffer " + e + ">";
        };
        u.prototype.compare = function ae(e) {
          if (!u.isBuffer(e))
            throw new TypeError("Argument must be a Buffer");
          return u.compare(this, e);
        };
        u.prototype.indexOf = function fe(e, t) {
          if (t > 2147483647)
            t = 2147483647;
          else if (t < -2147483648)
            t = -2147483648;
          t >>= 0;
          if (this.length === 0)
            return -1;
          if (t >= this.length)
            return -1;
          if (t < 0)
            t = Math.max(this.length + t, 0);
          if (typeof e === "string") {
            if (e.length === 0)
              return -1;
            return String.prototype.indexOf.call(this, e, t);
          }
          if (u.isBuffer(e)) {
            return r(this, e, t);
          }
          if (typeof e === "number") {
            if (u.TYPED_ARRAY_SUPPORT && Uint8Array.prototype.indexOf === "function") {
              return Uint8Array.prototype.indexOf.call(this, e, t);
            }
            return r(this, [e], t);
          }
          function r(e, t, r) {
            var n = -1;
            for (var i = 0; r + i < e.length; i++) {
              if (e[r + i] === t[n === -1 ? 0 : i - n]) {
                if (n === -1)
                  n = i;
                if (i - n + 1 === t.length)
                  return r + n;
              } else {
                n = -1;
              }
            }
            return -1;
          }
          throw new TypeError("val must be string, number or Buffer");
        };
        function S(e, t, r, n) {
          r = Number(r) || 0;
          var i = e.length - r;
          if (!n) {
            n = i;
          } else {
            n = Number(n);
            if (n > i) {
              n = i;
            }
          }
          var o = t.length;
          if (o % 2 !== 0)
            throw new Error("Invalid hex string");
          if (n > o / 2) {
            n = o / 2;
          }
          for (var s = 0; s < n; s++) {
            var a = parseInt(t.substr(s * 2, 2), 16);
            if (isNaN(a))
              throw new Error("Invalid hex string");
            e[r + s] = a;
          }
          return s;
        }
        function C(e, t, r, n) {
          return V(G(t, e.length - r), e, r, n);
        }
        function A(e, t, r, n) {
          return V(Z(t), e, r, n);
        }
        function k(e, t, r, n) {
          return A(e, t, r, n);
        }
        function T(e, t, r, n) {
          return V(Q(t), e, r, n);
        }
        function M(e, t, r, n) {
          return V(K(t, e.length - r), e, r, n);
        }
        u.prototype.write = function ue(e, t, r, n) {
          if (t === undefined) {
            n = "utf8";
            r = this.length;
            t = 0;
          } else if (r === undefined && typeof t === "string") {
            n = t;
            r = this.length;
            t = 0;
          } else if (isFinite(t)) {
            t = t | 0;
            if (isFinite(r)) {
              r = r | 0;
              if (n === undefined)
                n = "utf8";
            } else {
              n = r;
              r = undefined;
            }
          } else {
            var i = n;
            n = t;
            t = r | 0;
            r = i;
          }
          var o = this.length - t;
          if (r === undefined || r > o)
            r = o;
          if (e.length > 0 && (r < 0 || t < 0) || t > this.length) {
            throw new RangeError("attempt to write outside buffer bounds");
          }
          if (!n)
            n = "utf8";
          var s = false;
          for (; ; ) {
            switch (n) {
              case "hex":
                return S(this, e, t, r);
              case "utf8":
              case "utf-8":
                return C(this, e, t, r);
              case "ascii":
                return A(this, e, t, r);
              case "binary":
                return k(this, e, t, r);
              case "base64":
                return T(this, e, t, r);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return M(this, e, t, r);
              default:
                if (s)
                  throw new TypeError("Unknown encoding: " + n);
                n = ("" + n).toLowerCase();
                s = true;
            }
          }
        };
        u.prototype.toJSON = function ce() {
          return {
            type: "Buffer",
            data: Array.prototype.slice.call(this._arr || this, 0)
          };
        };
        function x(e, t, r) {
          if (t === 0 && r === e.length) {
            return n.fromByteArray(e);
          } else {
            return n.fromByteArray(e.slice(t, r));
          }
        }
        function P(e, t, r) {
          r = Math.min(e.length, r);
          var n = [];
          var i = t;
          while (i < r) {
            var o = e[i];
            var s = null;
            var a = o > 239 ? 4 : o > 223 ? 3 : o > 191 ? 2 : 1;
            if (i + a <= r) {
              var f,
                  u,
                  c,
                  l;
              switch (a) {
                case 1:
                  if (o < 128) {
                    s = o;
                  }
                  break;
                case 2:
                  f = e[i + 1];
                  if ((f & 192) === 128) {
                    l = (o & 31) << 6 | f & 63;
                    if (l > 127) {
                      s = l;
                    }
                  }
                  break;
                case 3:
                  f = e[i + 1];
                  u = e[i + 2];
                  if ((f & 192) === 128 && (u & 192) === 128) {
                    l = (o & 15) << 12 | (f & 63) << 6 | u & 63;
                    if (l > 2047 && (l < 55296 || l > 57343)) {
                      s = l;
                    }
                  }
                  break;
                case 4:
                  f = e[i + 1];
                  u = e[i + 2];
                  c = e[i + 3];
                  if ((f & 192) === 128 && (u & 192) === 128 && (c & 192) === 128) {
                    l = (o & 15) << 18 | (f & 63) << 12 | (u & 63) << 6 | c & 63;
                    if (l > 65535 && l < 1114112) {
                      s = l;
                    }
                  }
              }
            }
            if (s === null) {
              s = 65533;
              a = 1;
            } else if (s > 65535) {
              s -= 65536;
              n.push(s >>> 10 & 1023 | 55296);
              s = 56320 | s & 1023;
            }
            n.push(s);
            i += a;
          }
          return B(n);
        }
        var L = 4096;
        function B(e) {
          var t = e.length;
          if (t <= L) {
            return String.fromCharCode.apply(String, e);
          }
          var r = "";
          var n = 0;
          while (n < t) {
            r += String.fromCharCode.apply(String, e.slice(n, n += L));
          }
          return r;
        }
        function D(e, t, r) {
          var n = "";
          r = Math.min(e.length, r);
          for (var i = t; i < r; i++) {
            n += String.fromCharCode(e[i] & 127);
          }
          return n;
        }
        function I(e, t, r) {
          var n = "";
          r = Math.min(e.length, r);
          for (var i = t; i < r; i++) {
            n += String.fromCharCode(e[i]);
          }
          return n;
        }
        function j(e, t, r) {
          var n = e.length;
          if (!t || t < 0)
            t = 0;
          if (!r || r < 0 || r > n)
            r = n;
          var i = "";
          for (var o = t; o < r; o++) {
            i += X(e[o]);
          }
          return i;
        }
        function O(e, t, r) {
          var n = e.slice(t, r);
          var i = "";
          for (var o = 0; o < n.length; o += 2) {
            i += String.fromCharCode(n[o] + n[o + 1] * 256);
          }
          return i;
        }
        u.prototype.slice = function le(e, t) {
          var r = this.length;
          e = ~~e;
          t = t === undefined ? r : ~~t;
          if (e < 0) {
            e += r;
            if (e < 0)
              e = 0;
          } else if (e > r) {
            e = r;
          }
          if (t < 0) {
            t += r;
            if (t < 0)
              t = 0;
          } else if (t > r) {
            t = r;
          }
          if (t < e)
            t = e;
          var n;
          if (u.TYPED_ARRAY_SUPPORT) {
            n = this.subarray(e, t);
            n.__proto__ = u.prototype;
          } else {
            var i = t - e;
            n = new u(i, undefined);
            for (var o = 0; o < i; o++) {
              n[o] = this[o + e];
            }
          }
          if (n.length)
            n.parent = this.parent || this;
          return n;
        };
        function U(e, t, r) {
          if (e % 1 !== 0 || e < 0)
            throw new RangeError("offset is not uint");
          if (e + t > r)
            throw new RangeError("Trying to access beyond buffer length");
        }
        u.prototype.readUIntLE = function he(e, t, r) {
          e = e | 0;
          t = t | 0;
          if (!r)
            U(e, t, this.length);
          var n = this[e];
          var i = 1;
          var o = 0;
          while (++o < t && (i *= 256)) {
            n += this[e + o] * i;
          }
          return n;
        };
        u.prototype.readUIntBE = function de(e, t, r) {
          e = e | 0;
          t = t | 0;
          if (!r) {
            U(e, t, this.length);
          }
          var n = this[e + --t];
          var i = 1;
          while (t > 0 && (i *= 256)) {
            n += this[e + --t] * i;
          }
          return n;
        };
        u.prototype.readUInt8 = function pe(e, t) {
          if (!t)
            U(e, 1, this.length);
          return this[e];
        };
        u.prototype.readUInt16LE = function ge(e, t) {
          if (!t)
            U(e, 2, this.length);
          return this[e] | this[e + 1] << 8;
        };
        u.prototype.readUInt16BE = function ve(e, t) {
          if (!t)
            U(e, 2, this.length);
          return this[e] << 8 | this[e + 1];
        };
        u.prototype.readUInt32LE = function ye(e, t) {
          if (!t)
            U(e, 4, this.length);
          return (this[e] | this[e + 1] << 8 | this[e + 2] << 16) + this[e + 3] * 16777216;
        };
        u.prototype.readUInt32BE = function we(e, t) {
          if (!t)
            U(e, 4, this.length);
          return this[e] * 16777216 + (this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3]);
        };
        u.prototype.readIntLE = function _e(e, t, r) {
          e = e | 0;
          t = t | 0;
          if (!r)
            U(e, t, this.length);
          var n = this[e];
          var i = 1;
          var o = 0;
          while (++o < t && (i *= 256)) {
            n += this[e + o] * i;
          }
          i *= 128;
          if (n >= i)
            n -= Math.pow(2, 8 * t);
          return n;
        };
        u.prototype.readIntBE = function be(e, t, r) {
          e = e | 0;
          t = t | 0;
          if (!r)
            U(e, t, this.length);
          var n = t;
          var i = 1;
          var o = this[e + --n];
          while (n > 0 && (i *= 256)) {
            o += this[e + --n] * i;
          }
          i *= 128;
          if (o >= i)
            o -= Math.pow(2, 8 * t);
          return o;
        };
        u.prototype.readInt8 = function me(e, t) {
          if (!t)
            U(e, 1, this.length);
          if (!(this[e] & 128))
            return this[e];
          return (255 - this[e] + 1) * -1;
        };
        u.prototype.readInt16LE = function Re(e, t) {
          if (!t)
            U(e, 2, this.length);
          var r = this[e] | this[e + 1] << 8;
          return r & 32768 ? r | 4294901760 : r;
        };
        u.prototype.readInt16BE = function Ee(e, t) {
          if (!t)
            U(e, 2, this.length);
          var r = this[e + 1] | this[e] << 8;
          return r & 32768 ? r | 4294901760 : r;
        };
        u.prototype.readInt32LE = function Se(e, t) {
          if (!t)
            U(e, 4, this.length);
          return this[e] | this[e + 1] << 8 | this[e + 2] << 16 | this[e + 3] << 24;
        };
        u.prototype.readInt32BE = function Ce(e, t) {
          if (!t)
            U(e, 4, this.length);
          return this[e] << 24 | this[e + 1] << 16 | this[e + 2] << 8 | this[e + 3];
        };
        u.prototype.readFloatLE = function Ae(e, t) {
          if (!t)
            U(e, 4, this.length);
          return i.read(this, e, true, 23, 4);
        };
        u.prototype.readFloatBE = function ke(e, t) {
          if (!t)
            U(e, 4, this.length);
          return i.read(this, e, false, 23, 4);
        };
        u.prototype.readDoubleLE = function Te(e, t) {
          if (!t)
            U(e, 8, this.length);
          return i.read(this, e, true, 52, 8);
        };
        u.prototype.readDoubleBE = function Me(e, t) {
          if (!t)
            U(e, 8, this.length);
          return i.read(this, e, false, 52, 8);
        };
        function Y(e, t, r, n, i, o) {
          if (!u.isBuffer(e))
            throw new TypeError("buffer must be a Buffer instance");
          if (t > i || t < o)
            throw new RangeError("value is out of bounds");
          if (r + n > e.length)
            throw new RangeError("index out of range");
        }
        u.prototype.writeUIntLE = function xe(e, t, r, n) {
          e = +e;
          t = t | 0;
          r = r | 0;
          if (!n)
            Y(this, e, t, r, Math.pow(2, 8 * r), 0);
          var i = 1;
          var o = 0;
          this[t] = e & 255;
          while (++o < r && (i *= 256)) {
            this[t + o] = e / i & 255;
          }
          return t + r;
        };
        u.prototype.writeUIntBE = function Pe(e, t, r, n) {
          e = +e;
          t = t | 0;
          r = r | 0;
          if (!n)
            Y(this, e, t, r, Math.pow(2, 8 * r), 0);
          var i = r - 1;
          var o = 1;
          this[t + i] = e & 255;
          while (--i >= 0 && (o *= 256)) {
            this[t + i] = e / o & 255;
          }
          return t + r;
        };
        u.prototype.writeUInt8 = function Le(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 1, 255, 0);
          if (!u.TYPED_ARRAY_SUPPORT)
            e = Math.floor(e);
          this[t] = e & 255;
          return t + 1;
        };
        function N(e, t, r, n) {
          if (t < 0)
            t = 65535 + t + 1;
          for (var i = 0,
              o = Math.min(e.length - r, 2); i < o; i++) {
            e[r + i] = (t & 255 << 8 * (n ? i : 1 - i)) >>> (n ? i : 1 - i) * 8;
          }
        }
        u.prototype.writeUInt16LE = function Be(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 2, 65535, 0);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e & 255;
            this[t + 1] = e >>> 8;
          } else {
            N(this, e, t, true);
          }
          return t + 2;
        };
        u.prototype.writeUInt16BE = function De(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 2, 65535, 0);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 8;
            this[t + 1] = e & 255;
          } else {
            N(this, e, t, false);
          }
          return t + 2;
        };
        function q(e, t, r, n) {
          if (t < 0)
            t = 4294967295 + t + 1;
          for (var i = 0,
              o = Math.min(e.length - r, 4); i < o; i++) {
            e[r + i] = t >>> (n ? i : 3 - i) * 8 & 255;
          }
        }
        u.prototype.writeUInt32LE = function Ie(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 4, 4294967295, 0);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t + 3] = e >>> 24;
            this[t + 2] = e >>> 16;
            this[t + 1] = e >>> 8;
            this[t] = e & 255;
          } else {
            q(this, e, t, true);
          }
          return t + 4;
        };
        u.prototype.writeUInt32BE = function je(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 4, 4294967295, 0);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 24;
            this[t + 1] = e >>> 16;
            this[t + 2] = e >>> 8;
            this[t + 3] = e & 255;
          } else {
            q(this, e, t, false);
          }
          return t + 4;
        };
        u.prototype.writeIntLE = function Oe(e, t, r, n) {
          e = +e;
          t = t | 0;
          if (!n) {
            var i = Math.pow(2, 8 * r - 1);
            Y(this, e, t, r, i - 1, -i);
          }
          var o = 0;
          var s = 1;
          var a = e < 0 ? 1 : 0;
          this[t] = e & 255;
          while (++o < r && (s *= 256)) {
            this[t + o] = (e / s >> 0) - a & 255;
          }
          return t + r;
        };
        u.prototype.writeIntBE = function Ue(e, t, r, n) {
          e = +e;
          t = t | 0;
          if (!n) {
            var i = Math.pow(2, 8 * r - 1);
            Y(this, e, t, r, i - 1, -i);
          }
          var o = r - 1;
          var s = 1;
          var a = e < 0 ? 1 : 0;
          this[t + o] = e & 255;
          while (--o >= 0 && (s *= 256)) {
            this[t + o] = (e / s >> 0) - a & 255;
          }
          return t + r;
        };
        u.prototype.writeInt8 = function Ye(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 1, 127, -128);
          if (!u.TYPED_ARRAY_SUPPORT)
            e = Math.floor(e);
          if (e < 0)
            e = 255 + e + 1;
          this[t] = e & 255;
          return t + 1;
        };
        u.prototype.writeInt16LE = function Ne(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 2, 32767, -32768);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e & 255;
            this[t + 1] = e >>> 8;
          } else {
            N(this, e, t, true);
          }
          return t + 2;
        };
        u.prototype.writeInt16BE = function qe(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 2, 32767, -32768);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 8;
            this[t + 1] = e & 255;
          } else {
            N(this, e, t, false);
          }
          return t + 2;
        };
        u.prototype.writeInt32LE = function We(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 4, 2147483647, -2147483648);
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e & 255;
            this[t + 1] = e >>> 8;
            this[t + 2] = e >>> 16;
            this[t + 3] = e >>> 24;
          } else {
            q(this, e, t, true);
          }
          return t + 4;
        };
        u.prototype.writeInt32BE = function Fe(e, t, r) {
          e = +e;
          t = t | 0;
          if (!r)
            Y(this, e, t, 4, 2147483647, -2147483648);
          if (e < 0)
            e = 4294967295 + e + 1;
          if (u.TYPED_ARRAY_SUPPORT) {
            this[t] = e >>> 24;
            this[t + 1] = e >>> 16;
            this[t + 2] = e >>> 8;
            this[t + 3] = e & 255;
          } else {
            q(this, e, t, false);
          }
          return t + 4;
        };
        function W(e, t, r, n, i, o) {
          if (r + n > e.length)
            throw new RangeError("index out of range");
          if (r < 0)
            throw new RangeError("index out of range");
        }
        function F(e, t, r, n, o) {
          if (!o) {
            W(e, t, r, 4, 3.4028234663852886e38, -3.4028234663852886e38);
          }
          i.write(e, t, r, n, 23, 4);
          return r + 4;
        }
        u.prototype.writeFloatLE = function ze(e, t, r) {
          return F(this, e, t, true, r);
        };
        u.prototype.writeFloatBE = function He(e, t, r) {
          return F(this, e, t, false, r);
        };
        function z(e, t, r, n, o) {
          if (!o) {
            W(e, t, r, 8, 1.7976931348623157e308, -1.7976931348623157e308);
          }
          i.write(e, t, r, n, 52, 8);
          return r + 8;
        }
        u.prototype.writeDoubleLE = function $e(e, t, r) {
          return z(this, e, t, true, r);
        };
        u.prototype.writeDoubleBE = function Je(e, t, r) {
          return z(this, e, t, false, r);
        };
        u.prototype.copy = function Xe(e, t, r, n) {
          if (!r)
            r = 0;
          if (!n && n !== 0)
            n = this.length;
          if (t >= e.length)
            t = e.length;
          if (!t)
            t = 0;
          if (n > 0 && n < r)
            n = r;
          if (n === r)
            return 0;
          if (e.length === 0 || this.length === 0)
            return 0;
          if (t < 0) {
            throw new RangeError("targetStart out of bounds");
          }
          if (r < 0 || r >= this.length)
            throw new RangeError("sourceStart out of bounds");
          if (n < 0)
            throw new RangeError("sourceEnd out of bounds");
          if (n > this.length)
            n = this.length;
          if (e.length - t < n - r) {
            n = e.length - t + r;
          }
          var i = n - r;
          var o;
          if (this === e && r < t && t < n) {
            for (o = i - 1; o >= 0; o--) {
              e[o + t] = this[o + r];
            }
          } else if (i < 1e3 || !u.TYPED_ARRAY_SUPPORT) {
            for (o = 0; o < i; o++) {
              e[o + t] = this[o + r];
            }
          } else {
            Uint8Array.prototype.set.call(e, this.subarray(r, r + i), t);
          }
          return i;
        };
        u.prototype.fill = function Ge(e, t, r) {
          if (!e)
            e = 0;
          if (!t)
            t = 0;
          if (!r)
            r = this.length;
          if (r < t)
            throw new RangeError("end < start");
          if (r === t)
            return;
          if (this.length === 0)
            return;
          if (t < 0 || t >= this.length)
            throw new RangeError("start out of bounds");
          if (r < 0 || r > this.length)
            throw new RangeError("end out of bounds");
          var n;
          if (typeof e === "number") {
            for (n = t; n < r; n++) {
              this[n] = e;
            }
          } else {
            var i = G(e.toString());
            var o = i.length;
            for (n = t; n < r; n++) {
              this[n] = i[n % o];
            }
          }
          return this;
        };
        var H = /[^+\/0-9A-Za-z-_]/g;
        function $(e) {
          e = J(e).replace(H, "");
          if (e.length < 2)
            return "";
          while (e.length % 4 !== 0) {
            e = e + "=";
          }
          return e;
        }
        function J(e) {
          if (e.trim)
            return e.trim();
          return e.replace(/^\s+|\s+$/g, "");
        }
        function X(e) {
          if (e < 16)
            return "0" + e.toString(16);
          return e.toString(16);
        }
        function G(e, t) {
          t = t || Infinity;
          var r;
          var n = e.length;
          var i = null;
          var o = [];
          for (var s = 0; s < n; s++) {
            r = e.charCodeAt(s);
            if (r > 55295 && r < 57344) {
              if (!i) {
                if (r > 56319) {
                  if ((t -= 3) > -1)
                    o.push(239, 191, 189);
                  continue;
                } else if (s + 1 === n) {
                  if ((t -= 3) > -1)
                    o.push(239, 191, 189);
                  continue;
                }
                i = r;
                continue;
              }
              if (r < 56320) {
                if ((t -= 3) > -1)
                  o.push(239, 191, 189);
                i = r;
                continue;
              }
              r = (i - 55296 << 10 | r - 56320) + 65536;
            } else if (i) {
              if ((t -= 3) > -1)
                o.push(239, 191, 189);
            }
            i = null;
            if (r < 128) {
              if ((t -= 1) < 0)
                break;
              o.push(r);
            } else if (r < 2048) {
              if ((t -= 2) < 0)
                break;
              o.push(r >> 6 | 192, r & 63 | 128);
            } else if (r < 65536) {
              if ((t -= 3) < 0)
                break;
              o.push(r >> 12 | 224, r >> 6 & 63 | 128, r & 63 | 128);
            } else if (r < 1114112) {
              if ((t -= 4) < 0)
                break;
              o.push(r >> 18 | 240, r >> 12 & 63 | 128, r >> 6 & 63 | 128, r & 63 | 128);
            } else {
              throw new Error("Invalid code point");
            }
          }
          return o;
        }
        function Z(e) {
          var t = [];
          for (var r = 0; r < e.length; r++) {
            t.push(e.charCodeAt(r) & 255);
          }
          return t;
        }
        function K(e, t) {
          var r,
              n,
              i;
          var o = [];
          for (var s = 0; s < e.length; s++) {
            if ((t -= 2) < 0)
              break;
            r = e.charCodeAt(s);
            n = r >> 8;
            i = r % 256;
            o.push(i);
            o.push(n);
          }
          return o;
        }
        function Q(e) {
          return n.toByteArray($(e));
        }
        function V(e, t, r, n) {
          for (var i = 0; i < n; i++) {
            if (i + r >= t.length || i >= e.length)
              break;
            t[i + r] = e[i];
          }
          return i;
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {
      "base64-js": 3,
      ieee754: 4,
      isarray: 5
    }],
    3: [function(e, t, r) {
      "use strict";
      r.toByteArray = a;
      r.fromByteArray = c;
      var n = [];
      var i = [];
      var o = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
      function s() {
        var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
        for (var t = 0,
            r = e.length; t < r; ++t) {
          n[t] = e[t];
          i[e.charCodeAt(t)] = t;
        }
        i["-".charCodeAt(0)] = 62;
        i["_".charCodeAt(0)] = 63;
      }
      s();
      function a(e) {
        var t,
            r,
            n,
            s,
            a,
            f;
        var u = e.length;
        if (u % 4 > 0) {
          throw new Error("Invalid string. Length must be a multiple of 4");
        }
        a = e[u - 2] === "=" ? 2 : e[u - 1] === "=" ? 1 : 0;
        f = new o(u * 3 / 4 - a);
        n = a > 0 ? u - 4 : u;
        var c = 0;
        for (t = 0, r = 0; t < n; t += 4, r += 3) {
          s = i[e.charCodeAt(t)] << 18 | i[e.charCodeAt(t + 1)] << 12 | i[e.charCodeAt(t + 2)] << 6 | i[e.charCodeAt(t + 3)];
          f[c++] = s >> 16 & 255;
          f[c++] = s >> 8 & 255;
          f[c++] = s & 255;
        }
        if (a === 2) {
          s = i[e.charCodeAt(t)] << 2 | i[e.charCodeAt(t + 1)] >> 4;
          f[c++] = s & 255;
        } else if (a === 1) {
          s = i[e.charCodeAt(t)] << 10 | i[e.charCodeAt(t + 1)] << 4 | i[e.charCodeAt(t + 2)] >> 2;
          f[c++] = s >> 8 & 255;
          f[c++] = s & 255;
        }
        return f;
      }
      function f(e) {
        return n[e >> 18 & 63] + n[e >> 12 & 63] + n[e >> 6 & 63] + n[e & 63];
      }
      function u(e, t, r) {
        var n;
        var i = [];
        for (var o = t; o < r; o += 3) {
          n = (e[o] << 16) + (e[o + 1] << 8) + e[o + 2];
          i.push(f(n));
        }
        return i.join("");
      }
      function c(e) {
        var t;
        var r = e.length;
        var i = r % 3;
        var o = "";
        var s = [];
        var a = 16383;
        for (var f = 0,
            c = r - i; f < c; f += a) {
          s.push(u(e, f, f + a > c ? c : f + a));
        }
        if (i === 1) {
          t = e[r - 1];
          o += n[t >> 2];
          o += n[t << 4 & 63];
          o += "==";
        } else if (i === 2) {
          t = (e[r - 2] << 8) + e[r - 1];
          o += n[t >> 10];
          o += n[t >> 4 & 63];
          o += n[t << 2 & 63];
          o += "=";
        }
        s.push(o);
        return s.join("");
      }
    }, {}],
    4: [function(e, t, r) {
      r.read = function(e, t, r, n, i) {
        var o,
            s;
        var a = i * 8 - n - 1;
        var f = (1 << a) - 1;
        var u = f >> 1;
        var c = -7;
        var l = r ? i - 1 : 0;
        var h = r ? -1 : 1;
        var d = e[t + l];
        l += h;
        o = d & (1 << -c) - 1;
        d >>= -c;
        c += a;
        for (; c > 0; o = o * 256 + e[t + l], l += h, c -= 8) {}
        s = o & (1 << -c) - 1;
        o >>= -c;
        c += n;
        for (; c > 0; s = s * 256 + e[t + l], l += h, c -= 8) {}
        if (o === 0) {
          o = 1 - u;
        } else if (o === f) {
          return s ? NaN : (d ? -1 : 1) * Infinity;
        } else {
          s = s + Math.pow(2, n);
          o = o - u;
        }
        return (d ? -1 : 1) * s * Math.pow(2, o - n);
      };
      r.write = function(e, t, r, n, i, o) {
        var s,
            a,
            f;
        var u = o * 8 - i - 1;
        var c = (1 << u) - 1;
        var l = c >> 1;
        var h = i === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
        var d = n ? 0 : o - 1;
        var p = n ? 1 : -1;
        var g = t < 0 || t === 0 && 1 / t < 0 ? 1 : 0;
        t = Math.abs(t);
        if (isNaN(t) || t === Infinity) {
          a = isNaN(t) ? 1 : 0;
          s = c;
        } else {
          s = Math.floor(Math.log(t) / Math.LN2);
          if (t * (f = Math.pow(2, -s)) < 1) {
            s--;
            f *= 2;
          }
          if (s + l >= 1) {
            t += h / f;
          } else {
            t += h * Math.pow(2, 1 - l);
          }
          if (t * f >= 2) {
            s++;
            f /= 2;
          }
          if (s + l >= c) {
            a = 0;
            s = c;
          } else if (s + l >= 1) {
            a = (t * f - 1) * Math.pow(2, i);
            s = s + l;
          } else {
            a = t * Math.pow(2, l - 1) * Math.pow(2, i);
            s = 0;
          }
        }
        for (; i >= 8; e[r + d] = a & 255, d += p, a /= 256, i -= 8) {}
        s = s << i | a;
        u += i;
        for (; u > 0; e[r + d] = s & 255, d += p, s /= 256, u -= 8) {}
        e[r + d - p] |= g * 128;
      };
    }, {}],
    5: [function(e, t, r) {
      var n = {}.toString;
      t.exports = Array.isArray || function(e) {
        return n.call(e) == "[object Array]";
      };
    }, {}],
    6: [function(e, t, r) {
      function n() {
        this._events = this._events || {};
        this._maxListeners = this._maxListeners || undefined;
      }
      t.exports = n;
      n.EventEmitter = n;
      n.prototype._events = undefined;
      n.prototype._maxListeners = undefined;
      n.defaultMaxListeners = 10;
      n.prototype.setMaxListeners = function(e) {
        if (!o(e) || e < 0 || isNaN(e))
          throw TypeError("n must be a positive number");
        this._maxListeners = e;
        return this;
      };
      n.prototype.emit = function(e) {
        var t,
            r,
            n,
            o,
            f,
            u;
        if (!this._events)
          this._events = {};
        if (e === "error") {
          if (!this._events.error || s(this._events.error) && !this._events.error.length) {
            t = arguments[1];
            if (t instanceof Error) {
              throw t;
            }
            throw TypeError('Uncaught, unspecified "error" event.');
          }
        }
        r = this._events[e];
        if (a(r))
          return false;
        if (i(r)) {
          switch (arguments.length) {
            case 1:
              r.call(this);
              break;
            case 2:
              r.call(this, arguments[1]);
              break;
            case 3:
              r.call(this, arguments[1], arguments[2]);
              break;
            default:
              o = Array.prototype.slice.call(arguments, 1);
              r.apply(this, o);
          }
        } else if (s(r)) {
          o = Array.prototype.slice.call(arguments, 1);
          u = r.slice();
          n = u.length;
          for (f = 0; f < n; f++)
            u[f].apply(this, o);
        }
        return true;
      };
      n.prototype.addListener = function(e, t) {
        var r;
        if (!i(t))
          throw TypeError("listener must be a function");
        if (!this._events)
          this._events = {};
        if (this._events.newListener)
          this.emit("newListener", e, i(t.listener) ? t.listener : t);
        if (!this._events[e])
          this._events[e] = t;
        else if (s(this._events[e]))
          this._events[e].push(t);
        else
          this._events[e] = [this._events[e], t];
        if (s(this._events[e]) && !this._events[e].warned) {
          if (!a(this._maxListeners)) {
            r = this._maxListeners;
          } else {
            r = n.defaultMaxListeners;
          }
          if (r && r > 0 && this._events[e].length > r) {
            this._events[e].warned = true;
            console.error("(node) warning: possible EventEmitter memory " + "leak detected. %d listeners added. " + "Use emitter.setMaxListeners() to increase limit.", this._events[e].length);
            if (typeof console.trace === "function") {
              console.trace();
            }
          }
        }
        return this;
      };
      n.prototype.on = n.prototype.addListener;
      n.prototype.once = function(e, t) {
        if (!i(t))
          throw TypeError("listener must be a function");
        var r = false;
        function n() {
          this.removeListener(e, n);
          if (!r) {
            r = true;
            t.apply(this, arguments);
          }
        }
        n.listener = t;
        this.on(e, n);
        return this;
      };
      n.prototype.removeListener = function(e, t) {
        var r,
            n,
            o,
            a;
        if (!i(t))
          throw TypeError("listener must be a function");
        if (!this._events || !this._events[e])
          return this;
        r = this._events[e];
        o = r.length;
        n = -1;
        if (r === t || i(r.listener) && r.listener === t) {
          delete this._events[e];
          if (this._events.removeListener)
            this.emit("removeListener", e, t);
        } else if (s(r)) {
          for (a = o; a-- > 0; ) {
            if (r[a] === t || r[a].listener && r[a].listener === t) {
              n = a;
              break;
            }
          }
          if (n < 0)
            return this;
          if (r.length === 1) {
            r.length = 0;
            delete this._events[e];
          } else {
            r.splice(n, 1);
          }
          if (this._events.removeListener)
            this.emit("removeListener", e, t);
        }
        return this;
      };
      n.prototype.removeAllListeners = function(e) {
        var t,
            r;
        if (!this._events)
          return this;
        if (!this._events.removeListener) {
          if (arguments.length === 0)
            this._events = {};
          else if (this._events[e])
            delete this._events[e];
          return this;
        }
        if (arguments.length === 0) {
          for (t in this._events) {
            if (t === "removeListener")
              continue;
            this.removeAllListeners(t);
          }
          this.removeAllListeners("removeListener");
          this._events = {};
          return this;
        }
        r = this._events[e];
        if (i(r)) {
          this.removeListener(e, r);
        } else if (r) {
          while (r.length)
            this.removeListener(e, r[r.length - 1]);
        }
        delete this._events[e];
        return this;
      };
      n.prototype.listeners = function(e) {
        var t;
        if (!this._events || !this._events[e])
          t = [];
        else if (i(this._events[e]))
          t = [this._events[e]];
        else
          t = this._events[e].slice();
        return t;
      };
      n.prototype.listenerCount = function(e) {
        if (this._events) {
          var t = this._events[e];
          if (i(t))
            return 1;
          else if (t)
            return t.length;
        }
        return 0;
      };
      n.listenerCount = function(e, t) {
        return e.listenerCount(t);
      };
      function i(e) {
        return typeof e === "function";
      }
      function o(e) {
        return typeof e === "number";
      }
      function s(e) {
        return typeof e === "object" && e !== null;
      }
      function a(e) {
        return e === void 0;
      }
    }, {}],
    7: [function(e, t, r) {
      t.exports = function(e) {
        return !!(e != null && (e._isBuffer || e.constructor && typeof e.constructor.isBuffer === "function" && e.constructor.isBuffer(e)));
      };
    }, {}],
    8: [function(e, t, r) {
      var n = t.exports = {};
      var i = [];
      var o = false;
      var s;
      var a = -1;
      function f() {
        o = false;
        if (s.length) {
          i = s.concat(i);
        } else {
          a = -1;
        }
        if (i.length) {
          u();
        }
      }
      function u() {
        if (o) {
          return;
        }
        var e = setTimeout(f);
        o = true;
        var t = i.length;
        while (t) {
          s = i;
          i = [];
          while (++a < t) {
            if (s) {
              s[a].run();
            }
          }
          a = -1;
          t = i.length;
        }
        s = null;
        o = false;
        clearTimeout(e);
      }
      n.nextTick = function(e) {
        var t = new Array(arguments.length - 1);
        if (arguments.length > 1) {
          for (var r = 1; r < arguments.length; r++) {
            t[r - 1] = arguments[r];
          }
        }
        i.push(new c(e, t));
        if (i.length === 1 && !o) {
          setTimeout(u, 0);
        }
      };
      function c(e, t) {
        this.fun = e;
        this.array = t;
      }
      c.prototype.run = function() {
        this.fun.apply(null, this.array);
      };
      n.title = "browser";
      n.browser = true;
      n.env = {};
      n.argv = [];
      n.version = "";
      n.versions = {};
      function l() {}
      n.on = l;
      n.addListener = l;
      n.once = l;
      n.off = l;
      n.removeListener = l;
      n.removeAllListeners = l;
      n.emit = l;
      n.binding = function(e) {
        throw new Error("process.binding is not supported");
      };
      n.cwd = function() {
        return "/";
      };
      n.chdir = function(e) {
        throw new Error("process.chdir is not supported");
      };
      n.umask = function() {
        return 0;
      };
    }, {}],
    9: [function(e, t, r) {
      r = t.exports = e("./debug");
      r.log = o;
      r.formatArgs = i;
      r.save = s;
      r.load = a;
      r.useColors = n;
      r.storage = "undefined" != typeof chrome && "undefined" != typeof chrome.storage ? chrome.storage.local : f();
      r.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
      function n() {
        return "WebkitAppearance" in document.documentElement.style || window.console && (console.firebug || console.exception && console.table) || navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31;
      }
      r.formatters.j = function(e) {
        return JSON.stringify(e);
      };
      function i() {
        var e = arguments;
        var t = this.useColors;
        e[0] = (t ? "%c" : "") + this.namespace + (t ? " %c" : " ") + e[0] + (t ? "%c " : " ") + "+" + r.humanize(this.diff);
        if (!t)
          return e;
        var n = "color: " + this.color;
        e = [e[0], n, "color: inherit"].concat(Array.prototype.slice.call(e, 1));
        var i = 0;
        var o = 0;
        e[0].replace(/%[a-z%]/g, function(e) {
          if ("%%" === e)
            return;
          i++;
          if ("%c" === e) {
            o = i;
          }
        });
        e.splice(o, 0, n);
        return e;
      }
      function o() {
        return "object" === typeof console && console.log && Function.prototype.apply.call(console.log, console, arguments);
      }
      function s(e) {
        try {
          if (null == e) {
            r.storage.removeItem("debug");
          } else {
            r.storage.debug = e;
          }
        } catch (t) {}
      }
      function a() {
        var e;
        try {
          e = r.storage.debug;
        } catch (t) {}
        return e;
      }
      r.enable(a());
      function f() {
        try {
          return window.localStorage;
        } catch (e) {}
      }
    }, {"./debug": 10}],
    10: [function(e, t, r) {
      r = t.exports = s;
      r.coerce = c;
      r.disable = f;
      r.enable = a;
      r.enabled = u;
      r.humanize = e("ms");
      r.names = [];
      r.skips = [];
      r.formatters = {};
      var n = 0;
      var i;
      function o() {
        return r.colors[n++ % r.colors.length];
      }
      function s(e) {
        function t() {}
        t.enabled = false;
        function n() {
          var e = n;
          var t = +new Date;
          var s = t - (i || t);
          e.diff = s;
          e.prev = i;
          e.curr = t;
          i = t;
          if (null == e.useColors)
            e.useColors = r.useColors();
          if (null == e.color && e.useColors)
            e.color = o();
          var a = Array.prototype.slice.call(arguments);
          a[0] = r.coerce(a[0]);
          if ("string" !== typeof a[0]) {
            a = ["%o"].concat(a);
          }
          var f = 0;
          a[0] = a[0].replace(/%([a-z%])/g, function(t, n) {
            if (t === "%%")
              return t;
            f++;
            var i = r.formatters[n];
            if ("function" === typeof i) {
              var o = a[f];
              t = i.call(e, o);
              a.splice(f, 1);
              f--;
            }
            return t;
          });
          if ("function" === typeof r.formatArgs) {
            a = r.formatArgs.apply(e, a);
          }
          var u = n.log || r.log || console.log.bind(console);
          u.apply(e, a);
        }
        n.enabled = true;
        var s = r.enabled(e) ? n : t;
        s.namespace = e;
        return s;
      }
      function a(e) {
        r.save(e);
        var t = (e || "").split(/[\s,]+/);
        var n = t.length;
        for (var i = 0; i < n; i++) {
          if (!t[i])
            continue;
          e = t[i].replace(/\*/g, ".*?");
          if (e[0] === "-") {
            r.skips.push(new RegExp("^" + e.substr(1) + "$"));
          } else {
            r.names.push(new RegExp("^" + e + "$"));
          }
        }
      }
      function f() {
        r.enable("");
      }
      function u(e) {
        var t,
            n;
        for (t = 0, n = r.skips.length; t < n; t++) {
          if (r.skips[t].test(e)) {
            return false;
          }
        }
        for (t = 0, n = r.names.length; t < n; t++) {
          if (r.names[t].test(e)) {
            return true;
          }
        }
        return false;
      }
      function c(e) {
        if (e instanceof Error)
          return e.stack || e.message;
        return e;
      }
    }, {ms: 11}],
    11: [function(e, t, r) {
      var n = 1e3;
      var i = n * 60;
      var o = i * 60;
      var s = o * 24;
      var a = s * 365.25;
      t.exports = function(e, t) {
        t = t || {};
        if ("string" == typeof e)
          return f(e);
        return t.long ? c(e) : u(e);
      };
      function f(e) {
        e = "" + e;
        if (e.length > 1e4)
          return;
        var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
        if (!t)
          return;
        var r = parseFloat(t[1]);
        var f = (t[2] || "ms").toLowerCase();
        switch (f) {
          case "years":
          case "year":
          case "yrs":
          case "yr":
          case "y":
            return r * a;
          case "days":
          case "day":
          case "d":
            return r * s;
          case "hours":
          case "hour":
          case "hrs":
          case "hr":
          case "h":
            return r * o;
          case "minutes":
          case "minute":
          case "mins":
          case "min":
          case "m":
            return r * i;
          case "seconds":
          case "second":
          case "secs":
          case "sec":
          case "s":
            return r * n;
          case "milliseconds":
          case "millisecond":
          case "msecs":
          case "msec":
          case "ms":
            return r;
        }
      }
      function u(e) {
        if (e >= s)
          return Math.round(e / s) + "d";
        if (e >= o)
          return Math.round(e / o) + "h";
        if (e >= i)
          return Math.round(e / i) + "m";
        if (e >= n)
          return Math.round(e / n) + "s";
        return e + "ms";
      }
      function c(e) {
        return l(e, s, "day") || l(e, o, "hour") || l(e, i, "minute") || l(e, n, "second") || e + " ms";
      }
      function l(e, t, r) {
        if (e < t)
          return;
        if (e < t * 1.5)
          return Math.floor(e / t) + " " + r;
        return Math.ceil(e / t) + " " + r + "s";
      }
    }, {}],
    12: [function(e, t, r) {
      t.exports = function n() {
        if (typeof window === "undefined")
          return null;
        var e = {
          RTCPeerConnection: window.RTCPeerConnection || window.mozRTCPeerConnection || window.webkitRTCPeerConnection,
          RTCSessionDescription: window.RTCSessionDescription || window.mozRTCSessionDescription || window.webkitRTCSessionDescription,
          RTCIceCandidate: window.RTCIceCandidate || window.mozRTCIceCandidate || window.webkitRTCIceCandidate
        };
        if (!e.RTCPeerConnection)
          return null;
        return e;
      };
    }, {}],
    13: [function(e, t, r) {
      var n = t.exports = function(e, t) {
        if (!t)
          t = 16;
        if (e === undefined)
          e = 128;
        if (e <= 0)
          return "0";
        var r = Math.log(Math.pow(2, e)) / Math.log(t);
        for (var i = 2; r === Infinity; i *= 2) {
          r = Math.log(Math.pow(2, e / i)) / Math.log(t) * i;
        }
        var o = r - Math.floor(r);
        var s = "";
        for (var i = 0; i < Math.floor(r); i++) {
          var a = Math.floor(Math.random() * t).toString(t);
          s = a + s;
        }
        if (o) {
          var f = Math.pow(t, o);
          var a = Math.floor(Math.random() * f).toString(t);
          s = a + s;
        }
        var u = parseInt(s, t);
        if (u !== Infinity && u >= Math.pow(2, e)) {
          return n(e, t);
        } else
          return s;
      };
      n.rack = function(e, t, r) {
        var i = function(i) {
          var s = 0;
          do {
            if (s++ > 10) {
              if (r)
                e += r;
              else
                throw new Error("too many ID collisions, use more bits");
            }
            var a = n(e, t);
          } while (Object.hasOwnProperty.call(o, a));
          o[a] = i;
          return a;
        };
        var o = i.hats = {};
        i.get = function(e) {
          return i.hats[e];
        };
        i.set = function(e, t) {
          i.hats[e] = t;
          return i;
        };
        i.bits = e || 128;
        i.base = t || 16;
        return i;
      };
    }, {}],
    14: [function(e, t, r) {
      if (typeof Object.create === "function") {
        t.exports = function n(e, t) {
          e.super_ = t;
          e.prototype = Object.create(t.prototype, {constructor: {
              value: e,
              enumerable: false,
              writable: true,
              configurable: true
            }});
        };
      } else {
        t.exports = function i(e, t) {
          e.super_ = t;
          var r = function() {};
          r.prototype = t.prototype;
          e.prototype = new r;
          e.prototype.constructor = e;
        };
      }
    }, {}],
    15: [function(e, t, r) {
      t.exports = n;
      function n(e, t) {
        if (e && t)
          return n(e)(t);
        if (typeof e !== "function")
          throw new TypeError("need wrapper function");
        Object.keys(e).forEach(function(t) {
          r[t] = e[t];
        });
        return r;
        function r() {
          var t = new Array(arguments.length);
          for (var r = 0; r < t.length; r++) {
            t[r] = arguments[r];
          }
          var n = e.apply(this, t);
          var i = t[t.length - 1];
          if (typeof n === "function" && n !== i) {
            Object.keys(i).forEach(function(e) {
              n[e] = i[e];
            });
          }
          return n;
        }
      }
    }, {}],
    16: [function(e, t, r) {
      var n = e("wrappy");
      t.exports = n(i);
      i.proto = i(function() {
        Object.defineProperty(Function.prototype, "once", {
          value: function() {
            return i(this);
          },
          configurable: true
        });
      });
      function i(e) {
        var t = function() {
          if (t.called)
            return t.value;
          t.called = true;
          return t.value = e.apply(this, arguments);
        };
        t.called = false;
        return t;
      }
    }, {wrappy: 15}],
    17: [function(e, t, r) {
      "use strict";
      var n = Object.keys || function(e) {
        var t = [];
        for (var r in e) {
          t.push(r);
        }
        return t;
      };
      t.exports = l;
      var i = e("process-nextick-args");
      var o = e("core-util-is");
      o.inherits = e("inherits");
      var s = e("./_stream_readable");
      var a = e("./_stream_writable");
      o.inherits(l, s);
      var f = n(a.prototype);
      for (var u = 0; u < f.length; u++) {
        var c = f[u];
        if (!l.prototype[c])
          l.prototype[c] = a.prototype[c];
      }
      function l(e) {
        if (!(this instanceof l))
          return new l(e);
        s.call(this, e);
        a.call(this, e);
        if (e && e.readable === false)
          this.readable = false;
        if (e && e.writable === false)
          this.writable = false;
        this.allowHalfOpen = true;
        if (e && e.allowHalfOpen === false)
          this.allowHalfOpen = false;
        this.once("end", h);
      }
      function h() {
        if (this.allowHalfOpen || this._writableState.ended)
          return;
        i(d, this);
      }
      function d(e) {
        e.end();
      }
      function p(e, t) {
        for (var r = 0,
            n = e.length; r < n; r++) {
          t(e[r], r);
        }
      }
    }, {
      "./_stream_readable": 19,
      "./_stream_writable": 21,
      "core-util-is": 22,
      inherits: 14,
      "process-nextick-args": 24
    }],
    18: [function(e, t, r) {
      "use strict";
      t.exports = o;
      var n = e("./_stream_transform");
      var i = e("core-util-is");
      i.inherits = e("inherits");
      i.inherits(o, n);
      function o(e) {
        if (!(this instanceof o))
          return new o(e);
        n.call(this, e);
      }
      o.prototype._transform = function(e, t, r) {
        r(null, e);
      };
    }, {
      "./_stream_transform": 20,
      "core-util-is": 22,
      inherits: 14
    }],
    19: [function(e, t, r) {
      (function(r) {
        "use strict";
        t.exports = g;
        var n = e("process-nextick-args");
        var i = e("isarray");
        var o = e("buffer").Buffer;
        g.ReadableState = p;
        var s = e("events");
        var a = function(e, t) {
          return e.listeners(t).length;
        };
        var f;
        (function() {
          try {
            f = e("st" + "ream");
          } catch (t) {} finally {
            if (!f)
              f = e("events").EventEmitter;
          }
        })();
        var o = e("buffer").Buffer;
        var u = e("core-util-is");
        u.inherits = e("inherits");
        var c = e("util");
        var l = undefined;
        if (c && c.debuglog) {
          l = c.debuglog("stream");
        } else {
          l = function() {};
        }
        var h;
        u.inherits(g, f);
        var d;
        function p(t, r) {
          d = d || e("./_stream_duplex");
          t = t || {};
          this.objectMode = !!t.objectMode;
          if (r instanceof d)
            this.objectMode = this.objectMode || !!t.readableObjectMode;
          var n = t.highWaterMark;
          var i = this.objectMode ? 16 : 16 * 1024;
          this.highWaterMark = n || n === 0 ? n : i;
          this.highWaterMark = ~~this.highWaterMark;
          this.buffer = [];
          this.length = 0;
          this.pipes = null;
          this.pipesCount = 0;
          this.flowing = null;
          this.ended = false;
          this.endEmitted = false;
          this.reading = false;
          this.sync = true;
          this.needReadable = false;
          this.emittedReadable = false;
          this.readableListening = false;
          this.resumeScheduled = false;
          this.defaultEncoding = t.defaultEncoding || "utf8";
          this.ranOut = false;
          this.awaitDrain = 0;
          this.readingMore = false;
          this.decoder = null;
          this.encoding = null;
          if (t.encoding) {
            if (!h)
              h = e("string_decoder/").StringDecoder;
            this.decoder = new h(t.encoding);
            this.encoding = t.encoding;
          }
        }
        var d;
        function g(t) {
          d = d || e("./_stream_duplex");
          if (!(this instanceof g))
            return new g(t);
          this._readableState = new p(t, this);
          this.readable = true;
          if (t && typeof t.read === "function")
            this._read = t.read;
          f.call(this);
        }
        g.prototype.push = function(e, t) {
          var r = this._readableState;
          if (!r.objectMode && typeof e === "string") {
            t = t || r.defaultEncoding;
            if (t !== r.encoding) {
              e = new o(e, t);
              t = "";
            }
          }
          return v(this, r, e, t, false);
        };
        g.prototype.unshift = function(e) {
          var t = this._readableState;
          return v(this, t, e, "", true);
        };
        g.prototype.isPaused = function() {
          return this._readableState.flowing === false;
        };
        function v(e, t, r, n, i) {
          var o = m(t, r);
          if (o) {
            e.emit("error", o);
          } else if (r === null) {
            t.reading = false;
            R(e, t);
          } else if (t.objectMode || r && r.length > 0) {
            if (t.ended && !i) {
              var s = new Error("stream.push() after EOF");
              e.emit("error", s);
            } else if (t.endEmitted && i) {
              var s = new Error("stream.unshift() after end event");
              e.emit("error", s);
            } else {
              var a;
              if (t.decoder && !i && !n) {
                r = t.decoder.write(r);
                a = !t.objectMode && r.length === 0;
              }
              if (!i)
                t.reading = false;
              if (!a) {
                if (t.flowing && t.length === 0 && !t.sync) {
                  e.emit("data", r);
                  e.read(0);
                } else {
                  t.length += t.objectMode ? 1 : r.length;
                  if (i)
                    t.buffer.unshift(r);
                  else
                    t.buffer.push(r);
                  if (t.needReadable)
                    E(e);
                }
              }
              C(e, t);
            }
          } else if (!i) {
            t.reading = false;
          }
          return y(t);
        }
        function y(e) {
          return !e.ended && (e.needReadable || e.length < e.highWaterMark || e.length === 0);
        }
        g.prototype.setEncoding = function(t) {
          if (!h)
            h = e("string_decoder/").StringDecoder;
          this._readableState.decoder = new h(t);
          this._readableState.encoding = t;
          return this;
        };
        var w = 8388608;
        function _(e) {
          if (e >= w) {
            e = w;
          } else {
            e--;
            e |= e >>> 1;
            e |= e >>> 2;
            e |= e >>> 4;
            e |= e >>> 8;
            e |= e >>> 16;
            e++;
          }
          return e;
        }
        function b(e, t) {
          if (t.length === 0 && t.ended)
            return 0;
          if (t.objectMode)
            return e === 0 ? 0 : 1;
          if (e === null || isNaN(e)) {
            if (t.flowing && t.buffer.length)
              return t.buffer[0].length;
            else
              return t.length;
          }
          if (e <= 0)
            return 0;
          if (e > t.highWaterMark)
            t.highWaterMark = _(e);
          if (e > t.length) {
            if (!t.ended) {
              t.needReadable = true;
              return 0;
            } else {
              return t.length;
            }
          }
          return e;
        }
        g.prototype.read = function(e) {
          l("read", e);
          var t = this._readableState;
          var r = e;
          if (typeof e !== "number" || e > 0)
            t.emittedReadable = false;
          if (e === 0 && t.needReadable && (t.length >= t.highWaterMark || t.ended)) {
            l("read: emitReadable", t.length, t.ended);
            if (t.length === 0 && t.ended)
              B(this);
            else
              E(this);
            return null;
          }
          e = b(e, t);
          if (e === 0 && t.ended) {
            if (t.length === 0)
              B(this);
            return null;
          }
          var n = t.needReadable;
          l("need readable", n);
          if (t.length === 0 || t.length - e < t.highWaterMark) {
            n = true;
            l("length less than watermark", n);
          }
          if (t.ended || t.reading) {
            n = false;
            l("reading or ended", n);
          }
          if (n) {
            l("do read");
            t.reading = true;
            t.sync = true;
            if (t.length === 0)
              t.needReadable = true;
            this._read(t.highWaterMark);
            t.sync = false;
          }
          if (n && !t.reading)
            e = b(r, t);
          var i;
          if (e > 0)
            i = L(e, t);
          else
            i = null;
          if (i === null) {
            t.needReadable = true;
            e = 0;
          }
          t.length -= e;
          if (t.length === 0 && !t.ended)
            t.needReadable = true;
          if (r !== e && t.ended && t.length === 0)
            B(this);
          if (i !== null)
            this.emit("data", i);
          return i;
        };
        function m(e, t) {
          var r = null;
          if (!o.isBuffer(t) && typeof t !== "string" && t !== null && t !== undefined && !e.objectMode) {
            r = new TypeError("Invalid non-string/buffer chunk");
          }
          return r;
        }
        function R(e, t) {
          if (t.ended)
            return;
          if (t.decoder) {
            var r = t.decoder.end();
            if (r && r.length) {
              t.buffer.push(r);
              t.length += t.objectMode ? 1 : r.length;
            }
          }
          t.ended = true;
          E(e);
        }
        function E(e) {
          var t = e._readableState;
          t.needReadable = false;
          if (!t.emittedReadable) {
            l("emitReadable", t.flowing);
            t.emittedReadable = true;
            if (t.sync)
              n(S, e);
            else
              S(e);
          }
        }
        function S(e) {
          l("emit readable");
          e.emit("readable");
          P(e);
        }
        function C(e, t) {
          if (!t.readingMore) {
            t.readingMore = true;
            n(A, e, t);
          }
        }
        function A(e, t) {
          var r = t.length;
          while (!t.reading && !t.flowing && !t.ended && t.length < t.highWaterMark) {
            l("maybeReadMore read 0");
            e.read(0);
            if (r === t.length)
              break;
            else
              r = t.length;
          }
          t.readingMore = false;
        }
        g.prototype._read = function(e) {
          this.emit("error", new Error("not implemented"));
        };
        g.prototype.pipe = function(e, t) {
          var o = this;
          var s = this._readableState;
          switch (s.pipesCount) {
            case 0:
              s.pipes = e;
              break;
            case 1:
              s.pipes = [s.pipes, e];
              break;
            default:
              s.pipes.push(e);
              break;
          }
          s.pipesCount += 1;
          l("pipe count=%d opts=%j", s.pipesCount, t);
          var f = (!t || t.end !== false) && e !== r.stdout && e !== r.stderr;
          var u = f ? h : g;
          if (s.endEmitted)
            n(u);
          else
            o.once("end", u);
          e.on("unpipe", c);
          function c(e) {
            l("onunpipe");
            if (e === o) {
              g();
            }
          }
          function h() {
            l("onend");
            e.end();
          }
          var d = k(o);
          e.on("drain", d);
          var p = false;
          function g() {
            l("cleanup");
            e.removeListener("close", w);
            e.removeListener("finish", _);
            e.removeListener("drain", d);
            e.removeListener("error", y);
            e.removeListener("unpipe", c);
            o.removeListener("end", h);
            o.removeListener("end", g);
            o.removeListener("data", v);
            p = true;
            if (s.awaitDrain && (!e._writableState || e._writableState.needDrain))
              d();
          }
          o.on("data", v);
          function v(t) {
            l("ondata");
            var r = e.write(t);
            if (false === r) {
              if (s.pipesCount === 1 && s.pipes[0] === e && o.listenerCount("data") === 1 && !p) {
                l("false write response, pause", o._readableState.awaitDrain);
                o._readableState.awaitDrain++;
              }
              o.pause();
            }
          }
          function y(t) {
            l("onerror", t);
            b();
            e.removeListener("error", y);
            if (a(e, "error") === 0)
              e.emit("error", t);
          }
          if (!e._events || !e._events.error)
            e.on("error", y);
          else if (i(e._events.error))
            e._events.error.unshift(y);
          else
            e._events.error = [y, e._events.error];
          function w() {
            e.removeListener("finish", _);
            b();
          }
          e.once("close", w);
          function _() {
            l("onfinish");
            e.removeListener("close", w);
            b();
          }
          e.once("finish", _);
          function b() {
            l("unpipe");
            o.unpipe(e);
          }
          e.emit("pipe", o);
          if (!s.flowing) {
            l("pipe resume");
            o.resume();
          }
          return e;
        };
        function k(e) {
          return function() {
            var t = e._readableState;
            l("pipeOnDrain", t.awaitDrain);
            if (t.awaitDrain)
              t.awaitDrain--;
            if (t.awaitDrain === 0 && a(e, "data")) {
              t.flowing = true;
              P(e);
            }
          };
        }
        g.prototype.unpipe = function(e) {
          var t = this._readableState;
          if (t.pipesCount === 0)
            return this;
          if (t.pipesCount === 1) {
            if (e && e !== t.pipes)
              return this;
            if (!e)
              e = t.pipes;
            t.pipes = null;
            t.pipesCount = 0;
            t.flowing = false;
            if (e)
              e.emit("unpipe", this);
            return this;
          }
          if (!e) {
            var r = t.pipes;
            var n = t.pipesCount;
            t.pipes = null;
            t.pipesCount = 0;
            t.flowing = false;
            for (var i = 0; i < n; i++) {
              r[i].emit("unpipe", this);
            }
            return this;
          }
          var o = j(t.pipes, e);
          if (o === -1)
            return this;
          t.pipes.splice(o, 1);
          t.pipesCount -= 1;
          if (t.pipesCount === 1)
            t.pipes = t.pipes[0];
          e.emit("unpipe", this);
          return this;
        };
        g.prototype.on = function(e, t) {
          var r = f.prototype.on.call(this, e, t);
          if (e === "data" && false !== this._readableState.flowing) {
            this.resume();
          }
          if (e === "readable" && !this._readableState.endEmitted) {
            var i = this._readableState;
            if (!i.readableListening) {
              i.readableListening = true;
              i.emittedReadable = false;
              i.needReadable = true;
              if (!i.reading) {
                n(T, this);
              } else if (i.length) {
                E(this, i);
              }
            }
          }
          return r;
        };
        g.prototype.addListener = g.prototype.on;
        function T(e) {
          l("readable nexttick read 0");
          e.read(0);
        }
        g.prototype.resume = function() {
          var e = this._readableState;
          if (!e.flowing) {
            l("resume");
            e.flowing = true;
            M(this, e);
          }
          return this;
        };
        function M(e, t) {
          if (!t.resumeScheduled) {
            t.resumeScheduled = true;
            n(x, e, t);
          }
        }
        function x(e, t) {
          if (!t.reading) {
            l("resume read 0");
            e.read(0);
          }
          t.resumeScheduled = false;
          e.emit("resume");
          P(e);
          if (t.flowing && !t.reading)
            e.read(0);
        }
        g.prototype.pause = function() {
          l("call pause flowing=%j", this._readableState.flowing);
          if (false !== this._readableState.flowing) {
            l("pause");
            this._readableState.flowing = false;
            this.emit("pause");
          }
          return this;
        };
        function P(e) {
          var t = e._readableState;
          l("flow", t.flowing);
          if (t.flowing) {
            do {
              var r = e.read();
            } while (null !== r && t.flowing);
          }
        }
        g.prototype.wrap = function(e) {
          var t = this._readableState;
          var r = false;
          var n = this;
          e.on("end", function() {
            l("wrapped end");
            if (t.decoder && !t.ended) {
              var e = t.decoder.end();
              if (e && e.length)
                n.push(e);
            }
            n.push(null);
          });
          e.on("data", function(i) {
            l("wrapped data");
            if (t.decoder)
              i = t.decoder.write(i);
            if (t.objectMode && (i === null || i === undefined))
              return;
            else if (!t.objectMode && (!i || !i.length))
              return;
            var o = n.push(i);
            if (!o) {
              r = true;
              e.pause();
            }
          });
          for (var i in e) {
            if (this[i] === undefined && typeof e[i] === "function") {
              this[i] = function(t) {
                return function() {
                  return e[t].apply(e, arguments);
                };
              }(i);
            }
          }
          var o = ["error", "close", "destroy", "pause", "resume"];
          I(o, function(t) {
            e.on(t, n.emit.bind(n, t));
          });
          n._read = function(t) {
            l("wrapped _read", t);
            if (r) {
              r = false;
              e.resume();
            }
          };
          return n;
        };
        g._fromList = L;
        function L(e, t) {
          var r = t.buffer;
          var n = t.length;
          var i = !!t.decoder;
          var s = !!t.objectMode;
          var a;
          if (r.length === 0)
            return null;
          if (n === 0)
            a = null;
          else if (s)
            a = r.shift();
          else if (!e || e >= n) {
            if (i)
              a = r.join("");
            else if (r.length === 1)
              a = r[0];
            else
              a = o.concat(r, n);
            r.length = 0;
          } else {
            if (e < r[0].length) {
              var f = r[0];
              a = f.slice(0, e);
              r[0] = f.slice(e);
            } else if (e === r[0].length) {
              a = r.shift();
            } else {
              if (i)
                a = "";
              else
                a = new o(e);
              var u = 0;
              for (var c = 0,
                  l = r.length; c < l && u < e; c++) {
                var f = r[0];
                var h = Math.min(e - u, f.length);
                if (i)
                  a += f.slice(0, h);
                else
                  f.copy(a, u, 0, h);
                if (h < f.length)
                  r[0] = f.slice(h);
                else
                  r.shift();
                u += h;
              }
            }
          }
          return a;
        }
        function B(e) {
          var t = e._readableState;
          if (t.length > 0)
            throw new Error("endReadable called on non-empty stream");
          if (!t.endEmitted) {
            t.ended = true;
            n(D, t, e);
          }
        }
        function D(e, t) {
          if (!e.endEmitted && e.length === 0) {
            e.endEmitted = true;
            t.readable = false;
            t.emit("end");
          }
        }
        function I(e, t) {
          for (var r = 0,
              n = e.length; r < n; r++) {
            t(e[r], r);
          }
        }
        function j(e, t) {
          for (var r = 0,
              n = e.length; r < n; r++) {
            if (e[r] === t)
              return r;
          }
          return -1;
        }
      }).call(this, e("_process"));
    }, {
      "./_stream_duplex": 17,
      _process: 8,
      buffer: 2,
      "core-util-is": 22,
      events: 6,
      inherits: 14,
      isarray: 23,
      "process-nextick-args": 24,
      "string_decoder/": 25,
      util: 1
    }],
    20: [function(e, t, r) {
      "use strict";
      t.exports = a;
      var n = e("./_stream_duplex");
      var i = e("core-util-is");
      i.inherits = e("inherits");
      i.inherits(a, n);
      function o(e) {
        this.afterTransform = function(t, r) {
          return s(e, t, r);
        };
        this.needTransform = false;
        this.transforming = false;
        this.writecb = null;
        this.writechunk = null;
        this.writeencoding = null;
      }
      function s(e, t, r) {
        var n = e._transformState;
        n.transforming = false;
        var i = n.writecb;
        if (!i)
          return e.emit("error", new Error("no writecb in Transform class"));
        n.writechunk = null;
        n.writecb = null;
        if (r !== null && r !== undefined)
          e.push(r);
        i(t);
        var o = e._readableState;
        o.reading = false;
        if (o.needReadable || o.length < o.highWaterMark) {
          e._read(o.highWaterMark);
        }
      }
      function a(e) {
        if (!(this instanceof a))
          return new a(e);
        n.call(this, e);
        this._transformState = new o(this);
        var t = this;
        this._readableState.needReadable = true;
        this._readableState.sync = false;
        if (e) {
          if (typeof e.transform === "function")
            this._transform = e.transform;
          if (typeof e.flush === "function")
            this._flush = e.flush;
        }
        this.once("prefinish", function() {
          if (typeof this._flush === "function")
            this._flush(function(e) {
              f(t, e);
            });
          else
            f(t);
        });
      }
      a.prototype.push = function(e, t) {
        this._transformState.needTransform = false;
        return n.prototype.push.call(this, e, t);
      };
      a.prototype._transform = function(e, t, r) {
        throw new Error("not implemented");
      };
      a.prototype._write = function(e, t, r) {
        var n = this._transformState;
        n.writecb = r;
        n.writechunk = e;
        n.writeencoding = t;
        if (!n.transforming) {
          var i = this._readableState;
          if (n.needTransform || i.needReadable || i.length < i.highWaterMark)
            this._read(i.highWaterMark);
        }
      };
      a.prototype._read = function(e) {
        var t = this._transformState;
        if (t.writechunk !== null && t.writecb && !t.transforming) {
          t.transforming = true;
          this._transform(t.writechunk, t.writeencoding, t.afterTransform);
        } else {
          t.needTransform = true;
        }
      };
      function f(e, t) {
        if (t)
          return e.emit("error", t);
        var r = e._writableState;
        var n = e._transformState;
        if (r.length)
          throw new Error("calling transform done when ws.length != 0");
        if (n.transforming)
          throw new Error("calling transform done when still transforming");
        return e.push(null);
      }
    }, {
      "./_stream_duplex": 17,
      "core-util-is": 22,
      inherits: 14
    }],
    21: [function(e, t, r) {
      (function(r) {
        "use strict";
        t.exports = d;
        var n = e("process-nextick-args");
        var i = !r.browser && ["v0.10", "v0.9."].indexOf(r.version.slice(0, 5)) > -1 ? setImmediate : n;
        var o = e("buffer").Buffer;
        d.WritableState = h;
        var s = e("core-util-is");
        s.inherits = e("inherits");
        var a = {deprecate: e("util-deprecate")};
        var f;
        (function() {
          try {
            f = e("st" + "ream");
          } catch (t) {} finally {
            if (!f)
              f = e("events").EventEmitter;
          }
        })();
        var o = e("buffer").Buffer;
        s.inherits(d, f);
        function u() {}
        function c(e, t, r) {
          this.chunk = e;
          this.encoding = t;
          this.callback = r;
          this.next = null;
        }
        var l;
        function h(t, r) {
          l = l || e("./_stream_duplex");
          t = t || {};
          this.objectMode = !!t.objectMode;
          if (r instanceof l)
            this.objectMode = this.objectMode || !!t.writableObjectMode;
          var n = t.highWaterMark;
          var i = this.objectMode ? 16 : 16 * 1024;
          this.highWaterMark = n || n === 0 ? n : i;
          this.highWaterMark = ~~this.highWaterMark;
          this.needDrain = false;
          this.ending = false;
          this.ended = false;
          this.finished = false;
          var o = t.decodeStrings === false;
          this.decodeStrings = !o;
          this.defaultEncoding = t.defaultEncoding || "utf8";
          this.length = 0;
          this.writing = false;
          this.corked = 0;
          this.sync = true;
          this.bufferProcessing = false;
          this.onwrite = function(e) {
            m(r, e);
          };
          this.writecb = null;
          this.writelen = 0;
          this.bufferedRequest = null;
          this.lastBufferedRequest = null;
          this.pendingcb = 0;
          this.prefinished = false;
          this.errorEmitted = false;
          this.bufferedRequestCount = 0;
          this.corkedRequestsFree = new M(this);
          this.corkedRequestsFree.next = new M(this);
        }
        h.prototype.getBuffer = function x() {
          var e = this.bufferedRequest;
          var t = [];
          while (e) {
            t.push(e);
            e = e.next;
          }
          return t;
        };
        (function() {
          try {
            Object.defineProperty(h.prototype, "buffer", {get: a.deprecate(function() {
                return this.getBuffer();
              }, "_writableState.buffer is deprecated. Use _writableState.getBuffer " + "instead.")});
          } catch (e) {}
        })();
        var l;
        function d(t) {
          l = l || e("./_stream_duplex");
          if (!(this instanceof d) && !(this instanceof l))
            return new d(t);
          this._writableState = new h(t, this);
          this.writable = true;
          if (t) {
            if (typeof t.write === "function")
              this._write = t.write;
            if (typeof t.writev === "function")
              this._writev = t.writev;
          }
          f.call(this);
        }
        d.prototype.pipe = function() {
          this.emit("error", new Error("Cannot pipe. Not readable."));
        };
        function p(e, t) {
          var r = new Error("write after end");
          e.emit("error", r);
          n(t, r);
        }
        function g(e, t, r, i) {
          var s = true;
          if (!o.isBuffer(r) && typeof r !== "string" && r !== null && r !== undefined && !t.objectMode) {
            var a = new TypeError("Invalid non-string/buffer chunk");
            e.emit("error", a);
            n(i, a);
            s = false;
          }
          return s;
        }
        d.prototype.write = function(e, t, r) {
          var n = this._writableState;
          var i = false;
          if (typeof t === "function") {
            r = t;
            t = null;
          }
          if (o.isBuffer(e))
            t = "buffer";
          else if (!t)
            t = n.defaultEncoding;
          if (typeof r !== "function")
            r = u;
          if (n.ended)
            p(this, r);
          else if (g(this, n, e, r)) {
            n.pendingcb++;
            i = y(this, n, e, t, r);
          }
          return i;
        };
        d.prototype.cork = function() {
          var e = this._writableState;
          e.corked++;
        };
        d.prototype.uncork = function() {
          var e = this._writableState;
          if (e.corked) {
            e.corked--;
            if (!e.writing && !e.corked && !e.finished && !e.bufferProcessing && e.bufferedRequest)
              S(this, e);
          }
        };
        d.prototype.setDefaultEncoding = function P(e) {
          if (typeof e === "string")
            e = e.toLowerCase();
          if (!(["hex", "utf8", "utf-8", "ascii", "binary", "base64", "ucs2", "ucs-2", "utf16le", "utf-16le", "raw"].indexOf((e + "").toLowerCase()) > -1))
            throw new TypeError("Unknown encoding: " + e);
          this._writableState.defaultEncoding = e;
        };
        function v(e, t, r) {
          if (!e.objectMode && e.decodeStrings !== false && typeof t === "string") {
            t = new o(t, r);
          }
          return t;
        }
        function y(e, t, r, n, i) {
          r = v(t, r, n);
          if (o.isBuffer(r))
            n = "buffer";
          var s = t.objectMode ? 1 : r.length;
          t.length += s;
          var a = t.length < t.highWaterMark;
          if (!a)
            t.needDrain = true;
          if (t.writing || t.corked) {
            var f = t.lastBufferedRequest;
            t.lastBufferedRequest = new c(r, n, i);
            if (f) {
              f.next = t.lastBufferedRequest;
            } else {
              t.bufferedRequest = t.lastBufferedRequest;
            }
            t.bufferedRequestCount += 1;
          } else {
            w(e, t, false, s, r, n, i);
          }
          return a;
        }
        function w(e, t, r, n, i, o, s) {
          t.writelen = n;
          t.writecb = s;
          t.writing = true;
          t.sync = true;
          if (r)
            e._writev(i, t.onwrite);
          else
            e._write(i, o, t.onwrite);
          t.sync = false;
        }
        function _(e, t, r, i, o) {
          --t.pendingcb;
          if (r)
            n(o, i);
          else
            o(i);
          e._writableState.errorEmitted = true;
          e.emit("error", i);
        }
        function b(e) {
          e.writing = false;
          e.writecb = null;
          e.length -= e.writelen;
          e.writelen = 0;
        }
        function m(e, t) {
          var r = e._writableState;
          var n = r.sync;
          var o = r.writecb;
          b(r);
          if (t)
            _(e, r, n, t, o);
          else {
            var s = C(r);
            if (!s && !r.corked && !r.bufferProcessing && r.bufferedRequest) {
              S(e, r);
            }
            if (n) {
              i(R, e, r, s, o);
            } else {
              R(e, r, s, o);
            }
          }
        }
        function R(e, t, r, n) {
          if (!r)
            E(e, t);
          t.pendingcb--;
          n();
          k(e, t);
        }
        function E(e, t) {
          if (t.length === 0 && t.needDrain) {
            t.needDrain = false;
            e.emit("drain");
          }
        }
        function S(e, t) {
          t.bufferProcessing = true;
          var r = t.bufferedRequest;
          if (e._writev && r && r.next) {
            var n = t.bufferedRequestCount;
            var i = new Array(n);
            var o = t.corkedRequestsFree;
            o.entry = r;
            var s = 0;
            while (r) {
              i[s] = r;
              r = r.next;
              s += 1;
            }
            w(e, t, true, t.length, i, "", o.finish);
            t.pendingcb++;
            t.lastBufferedRequest = null;
            t.corkedRequestsFree = o.next;
            o.next = null;
          } else {
            while (r) {
              var a = r.chunk;
              var f = r.encoding;
              var u = r.callback;
              var c = t.objectMode ? 1 : a.length;
              w(e, t, false, c, a, f, u);
              r = r.next;
              if (t.writing) {
                break;
              }
            }
            if (r === null)
              t.lastBufferedRequest = null;
          }
          t.bufferedRequestCount = 0;
          t.bufferedRequest = r;
          t.bufferProcessing = false;
        }
        d.prototype._write = function(e, t, r) {
          r(new Error("not implemented"));
        };
        d.prototype._writev = null;
        d.prototype.end = function(e, t, r) {
          var n = this._writableState;
          if (typeof e === "function") {
            r = e;
            e = null;
            t = null;
          } else if (typeof t === "function") {
            r = t;
            t = null;
          }
          if (e !== null && e !== undefined)
            this.write(e, t);
          if (n.corked) {
            n.corked = 1;
            this.uncork();
          }
          if (!n.ending && !n.finished)
            T(this, n, r);
        };
        function C(e) {
          return e.ending && e.length === 0 && e.bufferedRequest === null && !e.finished && !e.writing;
        }
        function A(e, t) {
          if (!t.prefinished) {
            t.prefinished = true;
            e.emit("prefinish");
          }
        }
        function k(e, t) {
          var r = C(t);
          if (r) {
            if (t.pendingcb === 0) {
              A(e, t);
              t.finished = true;
              e.emit("finish");
            } else {
              A(e, t);
            }
          }
          return r;
        }
        function T(e, t, r) {
          t.ending = true;
          k(e, t);
          if (r) {
            if (t.finished)
              n(r);
            else
              e.once("finish", r);
          }
          t.ended = true;
          e.writable = false;
        }
        function M(e) {
          var t = this;
          this.next = null;
          this.entry = null;
          this.finish = function(r) {
            var n = t.entry;
            t.entry = null;
            while (n) {
              var i = n.callback;
              e.pendingcb--;
              i(r);
              n = n.next;
            }
            if (e.corkedRequestsFree) {
              e.corkedRequestsFree.next = t;
            } else {
              e.corkedRequestsFree = t;
            }
          };
        }
      }).call(this, e("_process"));
    }, {
      "./_stream_duplex": 17,
      _process: 8,
      buffer: 2,
      "core-util-is": 22,
      events: 6,
      inherits: 14,
      "process-nextick-args": 24,
      "util-deprecate": 26
    }],
    22: [function(e, t, r) {
      (function(e) {
        function t(e) {
          if (Array.isArray) {
            return Array.isArray(e);
          }
          return v(e) === "[object Array]";
        }
        r.isArray = t;
        function n(e) {
          return typeof e === "boolean";
        }
        r.isBoolean = n;
        function i(e) {
          return e === null;
        }
        r.isNull = i;
        function o(e) {
          return e == null;
        }
        r.isNullOrUndefined = o;
        function s(e) {
          return typeof e === "number";
        }
        r.isNumber = s;
        function a(e) {
          return typeof e === "string";
        }
        r.isString = a;
        function f(e) {
          return typeof e === "symbol";
        }
        r.isSymbol = f;
        function u(e) {
          return e === void 0;
        }
        r.isUndefined = u;
        function c(e) {
          return v(e) === "[object RegExp]";
        }
        r.isRegExp = c;
        function l(e) {
          return typeof e === "object" && e !== null;
        }
        r.isObject = l;
        function h(e) {
          return v(e) === "[object Date]";
        }
        r.isDate = h;
        function d(e) {
          return v(e) === "[object Error]" || e instanceof Error;
        }
        r.isError = d;
        function p(e) {
          return typeof e === "function";
        }
        r.isFunction = p;
        function g(e) {
          return e === null || typeof e === "boolean" || typeof e === "number" || typeof e === "string" || typeof e === "symbol" || typeof e === "undefined";
        }
        r.isPrimitive = g;
        r.isBuffer = e.isBuffer;
        function v(e) {
          return Object.prototype.toString.call(e);
        }
      }).call(this, {isBuffer: e("../../../../browserify/node_modules/insert-module-globals/node_modules/is-buffer/index.js")});
    }, {"../../../../browserify/node_modules/insert-module-globals/node_modules/is-buffer/index.js": 7}],
    23: [function(e, t, r) {
      arguments[4][5][0].apply(r, arguments);
    }, {dup: 5}],
    24: [function(e, t, r) {
      (function(e) {
        "use strict";
        if (!e.version || e.version.indexOf("v0.") === 0 || e.version.indexOf("v1.") === 0 && e.version.indexOf("v1.8.") !== 0) {
          t.exports = r;
        } else {
          t.exports = e.nextTick;
        }
        function r(t) {
          var r = new Array(arguments.length - 1);
          var n = 0;
          while (n < r.length) {
            r[n++] = arguments[n];
          }
          e.nextTick(function i() {
            t.apply(null, r);
          });
        }
      }).call(this, e("_process"));
    }, {_process: 8}],
    25: [function(e, t, r) {
      var n = e("buffer").Buffer;
      var i = n.isEncoding || function(e) {
        switch (e && e.toLowerCase()) {
          case "hex":
          case "utf8":
          case "utf-8":
          case "ascii":
          case "binary":
          case "base64":
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
          case "raw":
            return true;
          default:
            return false;
        }
      };
      function o(e) {
        if (e && !i(e)) {
          throw new Error("Unknown encoding: " + e);
        }
      }
      var s = r.StringDecoder = function(e) {
        this.encoding = (e || "utf8").toLowerCase().replace(/[-_]/, "");
        o(e);
        switch (this.encoding) {
          case "utf8":
            this.surrogateSize = 3;
            break;
          case "ucs2":
          case "utf16le":
            this.surrogateSize = 2;
            this.detectIncompleteChar = f;
            break;
          case "base64":
            this.surrogateSize = 3;
            this.detectIncompleteChar = u;
            break;
          default:
            this.write = a;
            return;
        }
        this.charBuffer = new n(6);
        this.charReceived = 0;
        this.charLength = 0;
      };
      s.prototype.write = function(e) {
        var t = "";
        while (this.charLength) {
          var r = e.length >= this.charLength - this.charReceived ? this.charLength - this.charReceived : e.length;
          e.copy(this.charBuffer, this.charReceived, 0, r);
          this.charReceived += r;
          if (this.charReceived < this.charLength) {
            return "";
          }
          e = e.slice(r, e.length);
          t = this.charBuffer.slice(0, this.charLength).toString(this.encoding);
          var n = t.charCodeAt(t.length - 1);
          if (n >= 55296 && n <= 56319) {
            this.charLength += this.surrogateSize;
            t = "";
            continue;
          }
          this.charReceived = this.charLength = 0;
          if (e.length === 0) {
            return t;
          }
          break;
        }
        this.detectIncompleteChar(e);
        var i = e.length;
        if (this.charLength) {
          e.copy(this.charBuffer, 0, e.length - this.charReceived, i);
          i -= this.charReceived;
        }
        t += e.toString(this.encoding, 0, i);
        var i = t.length - 1;
        var n = t.charCodeAt(i);
        if (n >= 55296 && n <= 56319) {
          var o = this.surrogateSize;
          this.charLength += o;
          this.charReceived += o;
          this.charBuffer.copy(this.charBuffer, o, 0, o);
          e.copy(this.charBuffer, 0, 0, o);
          return t.substring(0, i);
        }
        return t;
      };
      s.prototype.detectIncompleteChar = function(e) {
        var t = e.length >= 3 ? 3 : e.length;
        for (; t > 0; t--) {
          var r = e[e.length - t];
          if (t == 1 && r >> 5 == 6) {
            this.charLength = 2;
            break;
          }
          if (t <= 2 && r >> 4 == 14) {
            this.charLength = 3;
            break;
          }
          if (t <= 3 && r >> 3 == 30) {
            this.charLength = 4;
            break;
          }
        }
        this.charReceived = t;
      };
      s.prototype.end = function(e) {
        var t = "";
        if (e && e.length)
          t = this.write(e);
        if (this.charReceived) {
          var r = this.charReceived;
          var n = this.charBuffer;
          var i = this.encoding;
          t += n.slice(0, r).toString(i);
        }
        return t;
      };
      function a(e) {
        return e.toString(this.encoding);
      }
      function f(e) {
        this.charReceived = e.length % 2;
        this.charLength = this.charReceived ? 2 : 0;
      }
      function u(e) {
        this.charReceived = e.length % 3;
        this.charLength = this.charReceived ? 3 : 0;
      }
    }, {buffer: 2}],
    26: [function(e, t, r) {
      (function(e) {
        t.exports = r;
        function r(e, t) {
          if (n("noDeprecation")) {
            return e;
          }
          var r = false;
          function i() {
            if (!r) {
              if (n("throwDeprecation")) {
                throw new Error(t);
              } else if (n("traceDeprecation")) {
                console.trace(t);
              } else {
                console.warn(t);
              }
              r = true;
            }
            return e.apply(this, arguments);
          }
          return i;
        }
        function n(t) {
          try {
            if (!e.localStorage)
              return false;
          } catch (r) {
            return false;
          }
          var n = e.localStorage[t];
          if (null == n)
            return false;
          return String(n).toLowerCase() === "true";
        }
      }).call(this, typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {});
    }, {}],
    27: [function(e, t, r) {
      var n = function() {
        try {
          return e("st" + "ream");
        } catch (t) {}
      }();
      r = t.exports = e("./lib/_stream_readable.js");
      r.Stream = n || r;
      r.Readable = r;
      r.Writable = e("./lib/_stream_writable.js");
      r.Duplex = e("./lib/_stream_duplex.js");
      r.Transform = e("./lib/_stream_transform.js");
      r.PassThrough = e("./lib/_stream_passthrough.js");
    }, {
      "./lib/_stream_duplex.js": 17,
      "./lib/_stream_passthrough.js": 18,
      "./lib/_stream_readable.js": 19,
      "./lib/_stream_transform.js": 20,
      "./lib/_stream_writable.js": 21
    }],
    "/": [function(e, t, r) {
      (function(r) {
        t.exports = u;
        var n = e("debug")("simple-peer");
        var i = e("get-browser-rtc");
        var o = e("hat");
        var s = e("inherits");
        var a = e("once");
        var f = e("readable-stream");
        s(u, f.Duplex);
        function u(e) {
          var t = this;
          if (!(t instanceof u))
            return new u(e);
          t._debug("new peer %o", e);
          if (!e)
            e = {};
          e.allowHalfOpen = false;
          if (e.highWaterMark == null)
            e.highWaterMark = 1024 * 1024;
          f.Duplex.call(t, e);
          t.initiator = e.initiator || false;
          t.channelConfig = e.channelConfig || u.channelConfig;
          t.channelName = e.initiator ? e.channelName || o(160) : null;
          t.config = e.config || u.config;
          t.constraints = e.constraints || u.constraints;
          t.offerConstraints = e.offerConstraints;
          t.answerConstraints = e.answerConstraints;
          t.reconnectTimer = e.reconnectTimer || false;
          t.sdpTransform = e.sdpTransform || function(e) {
            return e;
          };
          t.stream = e.stream || false;
          t.trickle = e.trickle !== undefined ? e.trickle : true;
          t.destroyed = false;
          t.connected = false;
          t.remoteAddress = undefined;
          t.remoteFamily = undefined;
          t.remotePort = undefined;
          t.localAddress = undefined;
          t.localPort = undefined;
          t._isWrtc = !!e.wrtc;
          t._wrtc = e.wrtc || i();
          if (!t._wrtc) {
            if (typeof window === "undefined") {
              throw new Error("No WebRTC support: Specify `opts.wrtc` option in this environment");
            } else {
              throw new Error("No WebRTC support: Not a supported browser");
            }
          }
          t._maxBufferedAmount = e.highWaterMark;
          t._pcReady = false;
          t._channelReady = false;
          t._iceComplete = false;
          t._channel = null;
          t._pendingCandidates = [];
          t._chunk = null;
          t._cb = null;
          t._interval = null;
          t._reconnectTimeout = null;
          t._pc = new t._wrtc.RTCPeerConnection(t.config, t.constraints);
          t._pc.oniceconnectionstatechange = function() {
            t._onIceConnectionStateChange();
          };
          t._pc.onsignalingstatechange = function() {
            t._onSignalingStateChange();
          };
          t._pc.onicecandidate = function(e) {
            t._onIceCandidate(e);
          };
          if (t.stream)
            t._pc.addStream(t.stream);
          t._pc.onaddstream = function(e) {
            t._onAddStream(e);
          };
          if (t.initiator) {
            t._setupData({channel: t._pc.createDataChannel(t.channelName, t.channelConfig)});
            t._pc.onnegotiationneeded = a(function() {
              t._createOffer();
            });
            if (typeof window === "undefined" || !window.webkitRTCPeerConnection) {
              t._pc.onnegotiationneeded();
            }
          } else {
            t._pc.ondatachannel = function(e) {
              t._setupData(e);
            };
          }
          t.on("finish", function() {
            if (t.connected) {
              setTimeout(function() {
                t._destroy();
              }, 100);
            } else {
              t.once("connect", function() {
                setTimeout(function() {
                  t._destroy();
                }, 100);
              });
            }
          });
        }
        u.WEBRTC_SUPPORT = !!i();
        u.config = {iceServers: [{
            url: "stun:23.21.150.121",
            urls: "stun:23.21.150.121"
          }]};
        u.constraints = {};
        u.channelConfig = {};
        Object.defineProperty(u.prototype, "bufferSize", {get: function() {
            var e = this;
            return e._channel && e._channel.bufferedAmount || 0;
          }});
        u.prototype.address = function() {
          var e = this;
          return {
            port: e.localPort,
            family: "IPv4",
            address: e.localAddress
          };
        };
        u.prototype.signal = function(e) {
          var t = this;
          if (t.destroyed)
            throw new Error("cannot signal after peer is destroyed");
          if (typeof e === "string") {
            try {
              e = JSON.parse(e);
            } catch (r) {
              e = {};
            }
          }
          t._debug("signal()");
          function n(e) {
            try {
              t._pc.addIceCandidate(new t._wrtc.RTCIceCandidate(e), c, function(e) {
                t._onError(e);
              });
            } catch (r) {
              t._destroy(new Error("error adding candidate: " + r.message));
            }
          }
          if (e.sdp) {
            t._pc.setRemoteDescription(new t._wrtc.RTCSessionDescription(e), function() {
              if (t.destroyed)
                return;
              if (t._pc.remoteDescription.type === "offer")
                t._createAnswer();
              t._pendingCandidates.forEach(n);
              t._pendingCandidates = [];
            }, function(e) {
              t._onError(e);
            });
          }
          if (e.candidate) {
            if (t._pc.remoteDescription)
              n(e.candidate);
            else
              t._pendingCandidates.push(e.candidate);
          }
          if (!e.sdp && !e.candidate) {
            t._destroy(new Error("signal() called with invalid signal data"));
          }
        };
        u.prototype.send = function(e) {
          var t = this;
          if (r.isBuffer(e) && t._isWrtc) {
            e = new Uint8Array(e);
          }
          var n = e.length || e.byteLength || e.size;
          t._channel.send(e);
          t._debug("write: %d bytes", n);
        };
        u.prototype.destroy = function(e) {
          var t = this;
          t._destroy(null, e);
        };
        u.prototype._destroy = function(e, t) {
          var r = this;
          if (r.destroyed)
            return;
          if (t)
            r.once("close", t);
          r._debug("destroy (error: %s)", e && e.message);
          r.readable = r.writable = false;
          if (!r._readableState.ended)
            r.push(null);
          if (!r._writableState.finished)
            r.end();
          r.destroyed = true;
          r.connected = false;
          r._pcReady = false;
          r._channelReady = false;
          r._chunk = null;
          r._cb = null;
          clearInterval(r._interval);
          clearTimeout(r._reconnectTimeout);
          if (r._pc) {
            try {
              r._pc.close();
            } catch (e) {}
            r._pc.oniceconnectionstatechange = null;
            r._pc.onsignalingstatechange = null;
            r._pc.onicecandidate = null;
          }
          if (r._channel) {
            try {
              r._channel.close();
            } catch (e) {}
            r._channel.onmessage = null;
            r._channel.onopen = null;
            r._channel.onclose = null;
          }
          r._pc = null;
          r._channel = null;
          if (e)
            r.emit("error", e);
          r.emit("close");
        };
        u.prototype._setupData = function(e) {
          var t = this;
          t._channel = e.channel;
          t.channelName = t._channel.label;
          t._channel.binaryType = "arraybuffer";
          t._channel.onmessage = function(e) {
            t._onChannelMessage(e);
          };
          t._channel.onopen = function() {
            t._onChannelOpen();
          };
          t._channel.onclose = function() {
            t._onChannelClose();
          };
        };
        u.prototype._read = function() {};
        u.prototype._write = function(e, t, r) {
          var n = this;
          if (n.destroyed)
            return r(new Error("cannot write after peer is destroyed"));
          if (n.connected) {
            try {
              n.send(e);
            } catch (i) {
              return n._onError(i);
            }
            if (n._channel.bufferedAmount > n._maxBufferedAmount) {
              n._debug("start backpressure: bufferedAmount %d", n._channel.bufferedAmount);
              n._cb = r;
            } else {
              r(null);
            }
          } else {
            n._debug("write before connect");
            n._chunk = e;
            n._cb = r;
          }
        };
        u.prototype._createOffer = function() {
          var e = this;
          if (e.destroyed)
            return;
          e._pc.createOffer(function(t) {
            if (e.destroyed)
              return;
            t.sdp = e.sdpTransform(t.sdp);
            e._pc.setLocalDescription(t, c, function(t) {
              e._onError(t);
            });
            var r = function() {
              var r = e._pc.localDescription || t;
              e._debug("signal");
              e.emit("signal", {
                type: r.type,
                sdp: r.sdp
              });
            };
            if (e.trickle || e._iceComplete)
              r();
            else
              e.once("_iceComplete", r);
          }, function(t) {
            e._onError(t);
          }, e.offerConstraints);
        };
        u.prototype._createAnswer = function() {
          var e = this;
          if (e.destroyed)
            return;
          e._pc.createAnswer(function(t) {
            if (e.destroyed)
              return;
            t.sdp = e.sdpTransform(t.sdp);
            e._pc.setLocalDescription(t, c, function(t) {
              e._onError(t);
            });
            var r = function() {
              var r = e._pc.localDescription || t;
              e._debug("signal");
              e.emit("signal", {
                type: r.type,
                sdp: r.sdp
              });
            };
            if (e.trickle || e._iceComplete)
              r();
            else
              e.once("_iceComplete", r);
          }, function(t) {
            e._onError(t);
          }, e.answerConstraints);
        };
        u.prototype._onIceConnectionStateChange = function() {
          var e = this;
          if (e.destroyed)
            return;
          var t = e._pc.iceGatheringState;
          var r = e._pc.iceConnectionState;
          e._debug("iceConnectionStateChange %s %s", t, r);
          e.emit("iceConnectionStateChange", t, r);
          if (r === "connected" || r === "completed") {
            clearTimeout(e._reconnectTimeout);
            e._pcReady = true;
            e._maybeReady();
          }
          if (r === "disconnected") {
            if (e.reconnectTimer) {
              clearTimeout(e._reconnectTimeout);
              e._reconnectTimeout = setTimeout(function() {
                e._destroy();
              }, e.reconnectTimer);
            } else {
              e._destroy();
            }
          }
          if (r === "failed") {
            e._destroy();
          }
          if (r === "closed") {
            e._destroy();
          }
        };
        u.prototype.getStats = function(e) {
          var t = this;
          if (!t._pc.getStats) {
            e([]);
          } else if (typeof window !== "undefined" && !!window.mozRTCPeerConnection) {
            t._pc.getStats(null, function(t) {
              var r = [];
              t.forEach(function(e) {
                r.push(e);
              });
              e(r);
            }, function(e) {
              t._onError(e);
            });
          } else {
            t._pc.getStats(function(t) {
              var r = [];
              t.result().forEach(function(e) {
                var t = {};
                e.names().forEach(function(r) {
                  t[r] = e.stat(r);
                });
                t.id = e.id;
                t.type = e.type;
                t.timestamp = e.timestamp;
                r.push(t);
              });
              e(r);
            });
          }
        };
        u.prototype._maybeReady = function() {
          var e = this;
          e._debug("maybeReady pc %s channel %s", e._pcReady, e._channelReady);
          if (e.connected || e._connecting || !e._pcReady || !e._channelReady)
            return;
          e._connecting = true;
          e.getStats(function(t) {
            e._connecting = false;
            e.connected = true;
            var r = {};
            var n = {};
            function i(t) {
              var i = n[t.localCandidateId];
              var o = r[t.remoteCandidateId];
              if (i) {
                e.localAddress = i.ipAddress;
                e.localPort = Number(i.portNumber);
              } else if (typeof t.googLocalAddress === "string") {
                i = t.googLocalAddress.split(":");
                e.localAddress = i[0];
                e.localPort = Number(i[1]);
              }
              e._debug("connect local: %s:%s", e.localAddress, e.localPort);
              if (o) {
                e.remoteAddress = o.ipAddress;
                e.remotePort = Number(o.portNumber);
                e.remoteFamily = "IPv4";
              } else if (typeof t.googRemoteAddress === "string") {
                o = t.googRemoteAddress.split(":");
                e.remoteAddress = o[0];
                e.remotePort = Number(o[1]);
                e.remoteFamily = "IPv4";
              }
              e._debug("connect remote: %s:%s", e.remoteAddress, e.remotePort);
            }
            t.forEach(function(e) {
              if (e.type === "remotecandidate")
                r[e.id] = e;
              if (e.type === "localcandidate")
                n[e.id] = e;
            });
            t.forEach(function(e) {
              var t = e.type === "googCandidatePair" && e.googActiveConnection === "true" || e.type === "candidatepair" && e.selected;
              if (t)
                i(e);
            });
            if (e._chunk) {
              try {
                e.send(e._chunk);
              } catch (o) {
                return e._onError(o);
              }
              e._chunk = null;
              e._debug('sent chunk from "write before connect"');
              var s = e._cb;
              e._cb = null;
              s(null);
            }
            e._interval = setInterval(function() {
              if (!e._cb || !e._channel || e._channel.bufferedAmount > e._maxBufferedAmount)
                return;
              e._debug("ending backpressure: bufferedAmount %d", e._channel.bufferedAmount);
              var t = e._cb;
              e._cb = null;
              t(null);
            }, 150);
            if (e._interval.unref)
              e._interval.unref();
            e._debug("connect");
            e.emit("connect");
          });
        };
        u.prototype._onSignalingStateChange = function() {
          var e = this;
          if (e.destroyed)
            return;
          e._debug("signalingStateChange %s", e._pc.signalingState);
          e.emit("signalingStateChange", e._pc.signalingState);
        };
        u.prototype._onIceCandidate = function(e) {
          var t = this;
          if (t.destroyed)
            return;
          if (e.candidate && t.trickle) {
            t.emit("signal", {candidate: {
                candidate: e.candidate.candidate,
                sdpMLineIndex: e.candidate.sdpMLineIndex,
                sdpMid: e.candidate.sdpMid
              }});
          } else if (!e.candidate) {
            t._iceComplete = true;
            t.emit("_iceComplete");
          }
        };
        u.prototype._onChannelMessage = function(e) {
          var t = this;
          if (t.destroyed)
            return;
          var n = e.data;
          t._debug("read: %d bytes", n.byteLength || n.length);
          if (n instanceof ArrayBuffer)
            n = new r(n);
          t.push(n);
        };
        u.prototype._onChannelOpen = function() {
          var e = this;
          if (e.connected || e.destroyed)
            return;
          e._debug("on channel open");
          e._channelReady = true;
          e._maybeReady();
        };
        u.prototype._onChannelClose = function() {
          var e = this;
          if (e.destroyed)
            return;
          e._debug("on channel close");
          e._destroy();
        };
        u.prototype._onAddStream = function(e) {
          var t = this;
          if (t.destroyed)
            return;
          t._debug("on add stream");
          t.emit("stream", e.stream);
        };
        u.prototype._onError = function(e) {
          var t = this;
          if (t.destroyed)
            return;
          t._debug("error %s", e.message || e);
          t._destroy(e);
        };
        u.prototype._debug = function() {
          var e = this;
          var t = [].slice.call(arguments);
          var r = e.channelName && e.channelName.substring(0, 7);
          t[0] = "[" + r + "] " + t[0];
          n.apply(null, t);
        };
        function c() {}
      }).call(this, e("buffer").Buffer);
    }, {
      buffer: 2,
      debug: 9,
      "get-browser-rtc": 12,
      hat: 13,
      inherits: 14,
      once: 16,
      "readable-stream": 27
    }]
  }, {}, [])("/");
});

})();
(function() {
var define = $__System.amdDefine;
(function(f) {
  if (typeof exports === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define("5", [], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.adapter = f();
  }
})(function() {
  var define,
      module,
      exports;
  return (function e(t, n, r) {
    function s(o, u) {
      if (!n[o]) {
        if (!t[o]) {
          var a = typeof require == "function" && require;
          if (!u && a)
            return a(o, !0);
          if (i)
            return i(o, !0);
          var f = new Error("Cannot find module '" + o + "'");
          throw f.code = "MODULE_NOT_FOUND", f;
        }
        var l = n[o] = {exports: {}};
        t[o][0].call(l.exports, function(e) {
          var n = t[o][1][e];
          return s(n ? n : e);
        }, l, l.exports, e, t, n, r);
      }
      return n[o].exports;
    }
    var i = typeof require == "function" && require;
    for (var o = 0; o < r.length; o++)
      s(r[o]);
    return s;
  })({
    1: [function(require, module, exports) {
      'use strict';
      var SDPUtils = {};
      SDPUtils.generateIdentifier = function() {
        return Math.random().toString(36).substr(2, 10);
      };
      SDPUtils.localCName = SDPUtils.generateIdentifier();
      SDPUtils.splitLines = function(blob) {
        return blob.trim().split('\n').map(function(line) {
          return line.trim();
        });
      };
      SDPUtils.splitSections = function(blob) {
        var parts = blob.split('\nm=');
        return parts.map(function(part, index) {
          return (index > 0 ? 'm=' + part : part).trim() + '\r\n';
        });
      };
      SDPUtils.matchPrefix = function(blob, prefix) {
        return SDPUtils.splitLines(blob).filter(function(line) {
          return line.indexOf(prefix) === 0;
        });
      };
      SDPUtils.parseCandidate = function(line) {
        var parts;
        if (line.indexOf('a=candidate:') === 0) {
          parts = line.substring(12).split(' ');
        } else {
          parts = line.substring(10).split(' ');
        }
        var candidate = {
          foundation: parts[0],
          component: parts[1],
          protocol: parts[2].toLowerCase(),
          priority: parseInt(parts[3], 10),
          ip: parts[4],
          port: parseInt(parts[5], 10),
          type: parts[7]
        };
        for (var i = 8; i < parts.length; i += 2) {
          switch (parts[i]) {
            case 'raddr':
              candidate.relatedAddress = parts[i + 1];
              break;
            case 'rport':
              candidate.relatedPort = parseInt(parts[i + 1], 10);
              break;
            case 'tcptype':
              candidate.tcpType = parts[i + 1];
              break;
            default:
              break;
          }
        }
        return candidate;
      };
      SDPUtils.writeCandidate = function(candidate) {
        var sdp = [];
        sdp.push(candidate.foundation);
        sdp.push(candidate.component);
        sdp.push(candidate.protocol.toUpperCase());
        sdp.push(candidate.priority);
        sdp.push(candidate.ip);
        sdp.push(candidate.port);
        var type = candidate.type;
        sdp.push('typ');
        sdp.push(type);
        if (type !== 'host' && candidate.relatedAddress && candidate.relatedPort) {
          sdp.push('raddr');
          sdp.push(candidate.relatedAddress);
          sdp.push('rport');
          sdp.push(candidate.relatedPort);
        }
        if (candidate.tcpType && candidate.protocol.toLowerCase() === 'tcp') {
          sdp.push('tcptype');
          sdp.push(candidate.tcpType);
        }
        return 'candidate:' + sdp.join(' ');
      };
      SDPUtils.parseRtpMap = function(line) {
        var parts = line.substr(9).split(' ');
        var parsed = {payloadType: parseInt(parts.shift(), 10)};
        parts = parts[0].split('/');
        parsed.name = parts[0];
        parsed.clockRate = parseInt(parts[1], 10);
        parsed.numChannels = parts.length === 3 ? parseInt(parts[2], 10) : 1;
        return parsed;
      };
      SDPUtils.writeRtpMap = function(codec) {
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        return 'a=rtpmap:' + pt + ' ' + codec.name + '/' + codec.clockRate + (codec.numChannels !== 1 ? '/' + codec.numChannels : '') + '\r\n';
      };
      SDPUtils.parseExtmap = function(line) {
        var parts = line.substr(9).split(' ');
        return {
          id: parseInt(parts[0], 10),
          uri: parts[1]
        };
      };
      SDPUtils.writeExtmap = function(headerExtension) {
        return 'a=extmap:' + (headerExtension.id || headerExtension.preferredId) + ' ' + headerExtension.uri + '\r\n';
      };
      SDPUtils.parseFmtp = function(line) {
        var parsed = {};
        var kv;
        var parts = line.substr(line.indexOf(' ') + 1).split(';');
        for (var j = 0; j < parts.length; j++) {
          kv = parts[j].trim().split('=');
          parsed[kv[0].trim()] = kv[1];
        }
        return parsed;
      };
      SDPUtils.writeFmtp = function(codec) {
        var line = '';
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        if (codec.parameters && Object.keys(codec.parameters).length) {
          var params = [];
          Object.keys(codec.parameters).forEach(function(param) {
            params.push(param + '=' + codec.parameters[param]);
          });
          line += 'a=fmtp:' + pt + ' ' + params.join(';') + '\r\n';
        }
        return line;
      };
      SDPUtils.parseRtcpFb = function(line) {
        var parts = line.substr(line.indexOf(' ') + 1).split(' ');
        return {
          type: parts.shift(),
          parameter: parts.join(' ')
        };
      };
      SDPUtils.writeRtcpFb = function(codec) {
        var lines = '';
        var pt = codec.payloadType;
        if (codec.preferredPayloadType !== undefined) {
          pt = codec.preferredPayloadType;
        }
        if (codec.rtcpFeedback && codec.rtcpFeedback.length) {
          codec.rtcpFeedback.forEach(function(fb) {
            lines += 'a=rtcp-fb:' + pt + ' ' + fb.type + ' ' + fb.parameter + '\r\n';
          });
        }
        return lines;
      };
      SDPUtils.parseSsrcMedia = function(line) {
        var sp = line.indexOf(' ');
        var parts = {ssrc: parseInt(line.substr(7, sp - 7), 10)};
        var colon = line.indexOf(':', sp);
        if (colon > -1) {
          parts.attribute = line.substr(sp + 1, colon - sp - 1);
          parts.value = line.substr(colon + 1);
        } else {
          parts.attribute = line.substr(sp + 1);
        }
        return parts;
      };
      SDPUtils.getDtlsParameters = function(mediaSection, sessionpart) {
        var lines = SDPUtils.splitLines(mediaSection);
        lines = lines.concat(SDPUtils.splitLines(sessionpart));
        var fpLine = lines.filter(function(line) {
          return line.indexOf('a=fingerprint:') === 0;
        })[0].substr(14);
        var dtlsParameters = {
          role: 'auto',
          fingerprints: [{
            algorithm: fpLine.split(' ')[0],
            value: fpLine.split(' ')[1]
          }]
        };
        return dtlsParameters;
      };
      SDPUtils.writeDtlsParameters = function(params, setupType) {
        var sdp = 'a=setup:' + setupType + '\r\n';
        params.fingerprints.forEach(function(fp) {
          sdp += 'a=fingerprint:' + fp.algorithm + ' ' + fp.value + '\r\n';
        });
        return sdp;
      };
      SDPUtils.getIceParameters = function(mediaSection, sessionpart) {
        var lines = SDPUtils.splitLines(mediaSection);
        lines = lines.concat(SDPUtils.splitLines(sessionpart));
        var iceParameters = {
          usernameFragment: lines.filter(function(line) {
            return line.indexOf('a=ice-ufrag:') === 0;
          })[0].substr(12),
          password: lines.filter(function(line) {
            return line.indexOf('a=ice-pwd:') === 0;
          })[0].substr(10)
        };
        return iceParameters;
      };
      SDPUtils.writeIceParameters = function(params) {
        return 'a=ice-ufrag:' + params.usernameFragment + '\r\n' + 'a=ice-pwd:' + params.password + '\r\n';
      };
      SDPUtils.parseRtpParameters = function(mediaSection) {
        var description = {
          codecs: [],
          headerExtensions: [],
          fecMechanisms: [],
          rtcp: []
        };
        var lines = SDPUtils.splitLines(mediaSection);
        var mline = lines[0].split(' ');
        for (var i = 3; i < mline.length; i++) {
          var pt = mline[i];
          var rtpmapline = SDPUtils.matchPrefix(mediaSection, 'a=rtpmap:' + pt + ' ')[0];
          if (rtpmapline) {
            var codec = SDPUtils.parseRtpMap(rtpmapline);
            var fmtps = SDPUtils.matchPrefix(mediaSection, 'a=fmtp:' + pt + ' ');
            codec.parameters = fmtps.length ? SDPUtils.parseFmtp(fmtps[0]) : {};
            codec.rtcpFeedback = SDPUtils.matchPrefix(mediaSection, 'a=rtcp-fb:' + pt + ' ').map(SDPUtils.parseRtcpFb);
            description.codecs.push(codec);
            switch (codec.name.toUpperCase()) {
              case 'RED':
              case 'ULPFEC':
                description.fecMechanisms.push(codec.name.toUpperCase());
                break;
              default:
                break;
            }
          }
        }
        SDPUtils.matchPrefix(mediaSection, 'a=extmap:').forEach(function(line) {
          description.headerExtensions.push(SDPUtils.parseExtmap(line));
        });
        return description;
      };
      SDPUtils.writeRtpDescription = function(kind, caps) {
        var sdp = '';
        sdp += 'm=' + kind + ' ';
        sdp += caps.codecs.length > 0 ? '9' : '0';
        sdp += ' UDP/TLS/RTP/SAVPF ';
        sdp += caps.codecs.map(function(codec) {
          if (codec.preferredPayloadType !== undefined) {
            return codec.preferredPayloadType;
          }
          return codec.payloadType;
        }).join(' ') + '\r\n';
        sdp += 'c=IN IP4 0.0.0.0\r\n';
        sdp += 'a=rtcp:9 IN IP4 0.0.0.0\r\n';
        caps.codecs.forEach(function(codec) {
          sdp += SDPUtils.writeRtpMap(codec);
          sdp += SDPUtils.writeFmtp(codec);
          sdp += SDPUtils.writeRtcpFb(codec);
        });
        sdp += 'a=rtcp-mux\r\n';
        return sdp;
      };
      SDPUtils.parseRtpEncodingParameters = function(mediaSection) {
        var encodingParameters = [];
        var description = SDPUtils.parseRtpParameters(mediaSection);
        var hasRed = description.fecMechanisms.indexOf('RED') !== -1;
        var hasUlpfec = description.fecMechanisms.indexOf('ULPFEC') !== -1;
        var ssrcs = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
          return SDPUtils.parseSsrcMedia(line);
        }).filter(function(parts) {
          return parts.attribute === 'cname';
        });
        var primarySsrc = ssrcs.length > 0 && ssrcs[0].ssrc;
        var secondarySsrc;
        var flows = SDPUtils.matchPrefix(mediaSection, 'a=ssrc-group:FID').map(function(line) {
          var parts = line.split(' ');
          parts.shift();
          return parts.map(function(part) {
            return parseInt(part, 10);
          });
        });
        if (flows.length > 0 && flows[0].length > 1 && flows[0][0] === primarySsrc) {
          secondarySsrc = flows[0][1];
        }
        description.codecs.forEach(function(codec) {
          if (codec.name.toUpperCase() === 'RTX' && codec.parameters.apt) {
            var encParam = {
              ssrc: primarySsrc,
              codecPayloadType: parseInt(codec.parameters.apt, 10),
              rtx: {
                payloadType: codec.payloadType,
                ssrc: secondarySsrc
              }
            };
            encodingParameters.push(encParam);
            if (hasRed) {
              encParam = JSON.parse(JSON.stringify(encParam));
              encParam.fec = {
                ssrc: secondarySsrc,
                mechanism: hasUlpfec ? 'red+ulpfec' : 'red'
              };
              encodingParameters.push(encParam);
            }
          }
        });
        if (encodingParameters.length === 0 && primarySsrc) {
          encodingParameters.push({ssrc: primarySsrc});
        }
        var bandwidth = SDPUtils.matchPrefix(mediaSection, 'b=');
        if (bandwidth.length) {
          if (bandwidth[0].indexOf('b=TIAS:') === 0) {
            bandwidth = parseInt(bandwidth[0].substr(7), 10);
          } else if (bandwidth[0].indexOf('b=AS:') === 0) {
            bandwidth = parseInt(bandwidth[0].substr(5), 10);
          }
          encodingParameters.forEach(function(params) {
            params.maxBitrate = bandwidth;
          });
        }
        return encodingParameters;
      };
      SDPUtils.writeSessionBoilerplate = function() {
        return 'v=0\r\n' + 'o=thisisadapterortc 8169639915646943137 2 IN IP4 127.0.0.1\r\n' + 's=-\r\n' + 't=0 0\r\n';
      };
      SDPUtils.writeMediaSection = function(transceiver, caps, type, stream) {
        var sdp = SDPUtils.writeRtpDescription(transceiver.kind, caps);
        sdp += SDPUtils.writeIceParameters(transceiver.iceGatherer.getLocalParameters());
        sdp += SDPUtils.writeDtlsParameters(transceiver.dtlsTransport.getLocalParameters(), type === 'offer' ? 'actpass' : 'active');
        sdp += 'a=mid:' + transceiver.mid + '\r\n';
        if (transceiver.rtpSender && transceiver.rtpReceiver) {
          sdp += 'a=sendrecv\r\n';
        } else if (transceiver.rtpSender) {
          sdp += 'a=sendonly\r\n';
        } else if (transceiver.rtpReceiver) {
          sdp += 'a=recvonly\r\n';
        } else {
          sdp += 'a=inactive\r\n';
        }
        if (transceiver.rtpSender) {
          var msid = 'msid:' + stream.id + ' ' + transceiver.rtpSender.track.id + '\r\n';
          sdp += 'a=' + msid;
          sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' ' + msid;
        }
        sdp += 'a=ssrc:' + transceiver.sendEncodingParameters[0].ssrc + ' cname:' + SDPUtils.localCName + '\r\n';
        return sdp;
      };
      SDPUtils.getDirection = function(mediaSection, sessionpart) {
        var lines = SDPUtils.splitLines(mediaSection);
        for (var i = 0; i < lines.length; i++) {
          switch (lines[i]) {
            case 'a=sendrecv':
            case 'a=sendonly':
            case 'a=recvonly':
            case 'a=inactive':
              return lines[i].substr(2);
            default:
          }
        }
        if (sessionpart) {
          return SDPUtils.getDirection(sessionpart);
        }
        return 'sendrecv';
      };
      module.exports = SDPUtils;
    }, {}],
    2: [function(require, module, exports) {
      'use strict';
      (function() {
        var logging = require('./utils').log;
        var browserDetails = require('./utils').browserDetails;
        module.exports.browserDetails = browserDetails;
        module.exports.extractVersion = require('./utils').extractVersion;
        module.exports.disableLog = require('./utils').disableLog;
        require('./utils').disableLog(true);
        var chromeShim = require('./chrome/chrome_shim') || null;
        var edgeShim = require('./edge/edge_shim') || null;
        var firefoxShim = require('./firefox/firefox_shim') || null;
        var safariShim = require('./safari/safari_shim') || null;
        switch (browserDetails.browser) {
          case 'opera':
          case 'chrome':
            if (!chromeShim || !chromeShim.shimPeerConnection) {
              logging('Chrome shim is not included in this adapter release.');
              return;
            }
            logging('adapter.js shimming chrome.');
            module.exports.browserShim = chromeShim;
            chromeShim.shimGetUserMedia();
            chromeShim.shimMediaStream();
            chromeShim.shimSourceObject();
            chromeShim.shimPeerConnection();
            chromeShim.shimOnTrack();
            break;
          case 'firefox':
            if (!firefoxShim || !firefoxShim.shimPeerConnection) {
              logging('Firefox shim is not included in this adapter release.');
              return;
            }
            logging('adapter.js shimming firefox.');
            module.exports.browserShim = firefoxShim;
            firefoxShim.shimGetUserMedia();
            firefoxShim.shimSourceObject();
            firefoxShim.shimPeerConnection();
            firefoxShim.shimOnTrack();
            break;
          case 'edge':
            if (!edgeShim || !edgeShim.shimPeerConnection) {
              logging('MS edge shim is not included in this adapter release.');
              return;
            }
            logging('adapter.js shimming edge.');
            module.exports.browserShim = edgeShim;
            edgeShim.shimGetUserMedia();
            edgeShim.shimPeerConnection();
            break;
          case 'safari':
            if (!safariShim) {
              logging('Safari shim is not included in this adapter release.');
              return;
            }
            logging('adapter.js shimming safari.');
            module.exports.browserShim = safariShim;
            safariShim.shimGetUserMedia();
            break;
          default:
            logging('Unsupported browser!');
        }
      })();
    }, {
      "./chrome/chrome_shim": 3,
      "./edge/edge_shim": 5,
      "./firefox/firefox_shim": 7,
      "./safari/safari_shim": 9,
      "./utils": 10
    }],
    3: [function(require, module, exports) {
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      var logging = require('../utils.js').log;
      var browserDetails = require('../utils.js').browserDetails;
      var chromeShim = {
        shimMediaStream: function shimMediaStream() {
          window.MediaStream = window.MediaStream || window.webkitMediaStream;
        },
        shimOnTrack: function shimOnTrack() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get() {
                return this._ontrack;
              },
              set: function set(f) {
                var self = this;
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                  this.removeEventListener('addstream', this._ontrackpoly);
                }
                this.addEventListener('track', this._ontrack = f);
                this.addEventListener('addstream', this._ontrackpoly = function(e) {
                  e.stream.addEventListener('addtrack', function(te) {
                    var event = new Event('track');
                    event.track = te.track;
                    event.receiver = {track: te.track};
                    event.streams = [e.stream];
                    self.dispatchEvent(event);
                  });
                  e.stream.getTracks().forEach(function(track) {
                    var event = new Event('track');
                    event.track = track;
                    event.receiver = {track: track};
                    event.streams = [e.stream];
                    this.dispatchEvent(event);
                  }.bind(this));
                }.bind(this));
              }
            });
          }
        },
        shimSourceObject: function shimSourceObject() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
            if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
              Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
                get: function get() {
                  return this._srcObject;
                },
                set: function set(stream) {
                  var self = this;
                  this._srcObject = stream;
                  if (this.src) {
                    URL.revokeObjectURL(this.src);
                  }
                  if (!stream) {
                    this.src = '';
                    return;
                  }
                  this.src = URL.createObjectURL(stream);
                  stream.addEventListener('addtrack', function() {
                    if (self.src) {
                      URL.revokeObjectURL(self.src);
                    }
                    self.src = URL.createObjectURL(stream);
                  });
                  stream.addEventListener('removetrack', function() {
                    if (self.src) {
                      URL.revokeObjectURL(self.src);
                    }
                    self.src = URL.createObjectURL(stream);
                  });
                }
              });
            }
          }
        },
        shimPeerConnection: function shimPeerConnection() {
          window.RTCPeerConnection = function(pcConfig, pcConstraints) {
            logging('PeerConnection');
            if (pcConfig && pcConfig.iceTransportPolicy) {
              pcConfig.iceTransports = pcConfig.iceTransportPolicy;
            }
            var pc = new webkitRTCPeerConnection(pcConfig, pcConstraints);
            var origGetStats = pc.getStats.bind(pc);
            pc.getStats = function(selector, successCallback, errorCallback) {
              var self = this;
              var args = arguments;
              if (arguments.length > 0 && typeof selector === 'function') {
                return origGetStats(selector, successCallback);
              }
              var fixChromeStats_ = function fixChromeStats_(response) {
                var standardReport = {};
                var reports = response.result();
                reports.forEach(function(report) {
                  var standardStats = {
                    id: report.id,
                    timestamp: report.timestamp,
                    type: report.type
                  };
                  report.names().forEach(function(name) {
                    standardStats[name] = report.stat(name);
                  });
                  standardReport[standardStats.id] = standardStats;
                });
                return standardReport;
              };
              var makeMapStats = function makeMapStats(stats, legacyStats) {
                var map = new Map(Object.keys(stats).map(function(key) {
                  return [key, stats[key]];
                }));
                legacyStats = legacyStats || stats;
                Object.keys(legacyStats).forEach(function(key) {
                  map[key] = legacyStats[key];
                });
                return map;
              };
              if (arguments.length >= 2) {
                var successCallbackWrapper_ = function successCallbackWrapper_(response) {
                  args[1](makeMapStats(fixChromeStats_(response)));
                };
                return origGetStats.apply(this, [successCallbackWrapper_, arguments[0]]);
              }
              return new Promise(function(resolve, reject) {
                if (args.length === 1 && (typeof selector === 'undefined' ? 'undefined' : _typeof(selector)) === 'object') {
                  origGetStats.apply(self, [function(response) {
                    resolve(makeMapStats(fixChromeStats_(response)));
                  }, reject]);
                } else {
                  origGetStats.apply(self, [function(response) {
                    resolve(makeMapStats(fixChromeStats_(response), response.result()));
                  }, reject]);
                }
              }).then(successCallback, errorCallback);
            };
            return pc;
          };
          window.RTCPeerConnection.prototype = webkitRTCPeerConnection.prototype;
          if (webkitRTCPeerConnection.generateCertificate) {
            Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {get: function get() {
                return webkitRTCPeerConnection.generateCertificate;
              }});
          }
          if (browserDetails.version < 51) {
            ['createOffer', 'createAnswer'].forEach(function(method) {
              var nativeMethod = webkitRTCPeerConnection.prototype[method];
              webkitRTCPeerConnection.prototype[method] = function() {
                var self = this;
                if (arguments.length < 1 || arguments.length === 1 && _typeof(arguments[0]) === 'object') {
                  var opts = arguments.length === 1 ? arguments[0] : undefined;
                  return new Promise(function(resolve, reject) {
                    nativeMethod.apply(self, [resolve, reject, opts]);
                  });
                }
                return nativeMethod.apply(this, arguments);
              };
            });
            ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(method) {
              var nativeMethod = webkitRTCPeerConnection.prototype[method];
              webkitRTCPeerConnection.prototype[method] = function() {
                var args = arguments;
                var self = this;
                var promise = new Promise(function(resolve, reject) {
                  nativeMethod.apply(self, [args[0], resolve, reject]);
                });
                if (args.length < 2) {
                  return promise;
                }
                return promise.then(function() {
                  args[1].apply(null, []);
                }, function(err) {
                  if (args.length >= 3) {
                    args[2].apply(null, [err]);
                  }
                });
              };
            });
          }
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(method) {
            var nativeMethod = webkitRTCPeerConnection.prototype[method];
            webkitRTCPeerConnection.prototype[method] = function() {
              arguments[0] = new (method === 'addIceCandidate' ? RTCIceCandidate : RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });
        },
        attachMediaStream: function attachMediaStream(element, stream) {
          logging('DEPRECATED, attachMediaStream will soon be removed.');
          if (browserDetails.version >= 43) {
            element.srcObject = stream;
          } else if (typeof element.src !== 'undefined') {
            element.src = URL.createObjectURL(stream);
          } else {
            logging('Error attaching stream to element.');
          }
        },
        reattachMediaStream: function reattachMediaStream(to, from) {
          logging('DEPRECATED, reattachMediaStream will soon be removed.');
          if (browserDetails.version >= 43) {
            to.srcObject = from.srcObject;
          } else {
            to.src = from.src;
          }
        }
      };
      module.exports = {
        shimMediaStream: chromeShim.shimMediaStream,
        shimOnTrack: chromeShim.shimOnTrack,
        shimSourceObject: chromeShim.shimSourceObject,
        shimPeerConnection: chromeShim.shimPeerConnection,
        shimGetUserMedia: require('./getusermedia'),
        attachMediaStream: chromeShim.attachMediaStream,
        reattachMediaStream: chromeShim.reattachMediaStream
      };
    }, {
      "../utils.js": 10,
      "./getusermedia": 4
    }],
    4: [function(require, module, exports) {
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      var logging = require('../utils.js').log;
      module.exports = function() {
        var constraintsToChrome_ = function constraintsToChrome_(c) {
          if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.mandatory || c.optional) {
            return c;
          }
          var cc = {};
          Object.keys(c).forEach(function(key) {
            if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
              return;
            }
            var r = _typeof(c[key]) === 'object' ? c[key] : {ideal: c[key]};
            if (r.exact !== undefined && typeof r.exact === 'number') {
              r.min = r.max = r.exact;
            }
            var oldname_ = function oldname_(prefix, name) {
              if (prefix) {
                return prefix + name.charAt(0).toUpperCase() + name.slice(1);
              }
              return name === 'deviceId' ? 'sourceId' : name;
            };
            if (r.ideal !== undefined) {
              cc.optional = cc.optional || [];
              var oc = {};
              if (typeof r.ideal === 'number') {
                oc[oldname_('min', key)] = r.ideal;
                cc.optional.push(oc);
                oc = {};
                oc[oldname_('max', key)] = r.ideal;
                cc.optional.push(oc);
              } else {
                oc[oldname_('', key)] = r.ideal;
                cc.optional.push(oc);
              }
            }
            if (r.exact !== undefined && typeof r.exact !== 'number') {
              cc.mandatory = cc.mandatory || {};
              cc.mandatory[oldname_('', key)] = r.exact;
            } else {
              ['min', 'max'].forEach(function(mix) {
                if (r[mix] !== undefined) {
                  cc.mandatory = cc.mandatory || {};
                  cc.mandatory[oldname_(mix, key)] = r[mix];
                }
              });
            }
          });
          if (c.advanced) {
            cc.optional = (cc.optional || []).concat(c.advanced);
          }
          return cc;
        };
        var shimConstraints_ = function shimConstraints_(constraints, func) {
          constraints = JSON.parse(JSON.stringify(constraints));
          if (constraints && constraints.audio) {
            constraints.audio = constraintsToChrome_(constraints.audio);
          }
          if (constraints && _typeof(constraints.video) === 'object') {
            var face = constraints.video.facingMode;
            face = face && ((typeof face === 'undefined' ? 'undefined' : _typeof(face)) === 'object' ? face : {ideal: face});
            if (face && (face.exact === 'user' || face.exact === 'environment' || face.ideal === 'user' || face.ideal === 'environment') && !(navigator.mediaDevices.getSupportedConstraints && navigator.mediaDevices.getSupportedConstraints().facingMode)) {
              delete constraints.video.facingMode;
              if (face.exact === 'environment' || face.ideal === 'environment') {
                return navigator.mediaDevices.enumerateDevices().then(function(devices) {
                  devices = devices.filter(function(d) {
                    return d.kind === 'videoinput';
                  });
                  var back = devices.find(function(d) {
                    return d.label.toLowerCase().indexOf('back') !== -1;
                  }) || devices.length && devices[devices.length - 1];
                  if (back) {
                    constraints.video.deviceId = face.exact ? {exact: back.deviceId} : {ideal: back.deviceId};
                  }
                  constraints.video = constraintsToChrome_(constraints.video);
                  logging('chrome: ' + JSON.stringify(constraints));
                  return func(constraints);
                });
              }
            }
            constraints.video = constraintsToChrome_(constraints.video);
          }
          logging('chrome: ' + JSON.stringify(constraints));
          return func(constraints);
        };
        var shimError_ = function shimError_(e) {
          return {
            name: {
              PermissionDeniedError: 'NotAllowedError',
              ConstraintNotSatisfiedError: 'OverconstrainedError'
            }[e.name] || e.name,
            message: e.message,
            constraint: e.constraintName,
            toString: function toString() {
              return this.name + (this.message && ': ') + this.message;
            }
          };
        };
        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
          shimConstraints_(constraints, function(c) {
            navigator.webkitGetUserMedia(c, onSuccess, function(e) {
              onError(shimError_(e));
            });
          });
        };
        navigator.getUserMedia = getUserMedia_;
        var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
          return new Promise(function(resolve, reject) {
            navigator.getUserMedia(constraints, resolve, reject);
          });
        };
        if (!navigator.mediaDevices) {
          navigator.mediaDevices = {
            getUserMedia: getUserMediaPromise_,
            enumerateDevices: function enumerateDevices() {
              return new Promise(function(resolve) {
                var kinds = {
                  audio: 'audioinput',
                  video: 'videoinput'
                };
                return MediaStreamTrack.getSources(function(devices) {
                  resolve(devices.map(function(device) {
                    return {
                      label: device.label,
                      kind: kinds[device.kind],
                      deviceId: device.id,
                      groupId: ''
                    };
                  }));
                });
              });
            }
          };
        }
        if (!navigator.mediaDevices.getUserMedia) {
          navigator.mediaDevices.getUserMedia = function(constraints) {
            return getUserMediaPromise_(constraints);
          };
        } else {
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function(cs) {
            return shimConstraints_(cs, function(c) {
              return origGetUserMedia(c).catch(function(e) {
                return Promise.reject(shimError_(e));
              });
            });
          };
        }
        if (typeof navigator.mediaDevices.addEventListener === 'undefined') {
          navigator.mediaDevices.addEventListener = function() {
            logging('Dummy mediaDevices.addEventListener called.');
          };
        }
        if (typeof navigator.mediaDevices.removeEventListener === 'undefined') {
          navigator.mediaDevices.removeEventListener = function() {
            logging('Dummy mediaDevices.removeEventListener called.');
          };
        }
      };
    }, {"../utils.js": 10}],
    5: [function(require, module, exports) {
      'use strict';
      var SDPUtils = require('sdp');
      var logging = require('../utils').log;
      var edgeShim = {
        shimPeerConnection: function shimPeerConnection() {
          if (window.RTCIceGatherer) {
            if (!window.RTCIceCandidate) {
              window.RTCIceCandidate = function(args) {
                return args;
              };
            }
            if (!window.RTCSessionDescription) {
              window.RTCSessionDescription = function(args) {
                return args;
              };
            }
          }
          window.RTCPeerConnection = function(config) {
            var self = this;
            var _eventTarget = document.createDocumentFragment();
            ['addEventListener', 'removeEventListener', 'dispatchEvent'].forEach(function(method) {
              self[method] = _eventTarget[method].bind(_eventTarget);
            });
            this.onicecandidate = null;
            this.onaddstream = null;
            this.ontrack = null;
            this.onremovestream = null;
            this.onsignalingstatechange = null;
            this.oniceconnectionstatechange = null;
            this.onnegotiationneeded = null;
            this.ondatachannel = null;
            this.localStreams = [];
            this.remoteStreams = [];
            this.getLocalStreams = function() {
              return self.localStreams;
            };
            this.getRemoteStreams = function() {
              return self.remoteStreams;
            };
            this.localDescription = new RTCSessionDescription({
              type: '',
              sdp: ''
            });
            this.remoteDescription = new RTCSessionDescription({
              type: '',
              sdp: ''
            });
            this.signalingState = 'stable';
            this.iceConnectionState = 'new';
            this.iceGatheringState = 'new';
            this.iceOptions = {
              gatherPolicy: 'all',
              iceServers: []
            };
            if (config && config.iceTransportPolicy) {
              switch (config.iceTransportPolicy) {
                case 'all':
                case 'relay':
                  this.iceOptions.gatherPolicy = config.iceTransportPolicy;
                  break;
                case 'none':
                  throw new TypeError('iceTransportPolicy "none" not supported');
                default:
                  break;
              }
            }
            if (config && config.iceServers) {
              this.iceOptions.iceServers = config.iceServers.filter(function(server) {
                if (server && server.urls) {
                  server.urls = server.urls.filter(function(url) {
                    return url.indexOf('turn:') === 0 && url.indexOf('transport=udp') !== -1;
                  })[0];
                  return !!server.urls;
                }
                return false;
              });
            }
            this.transceivers = [];
            this._localIceCandidatesBuffer = [];
          };
          window.RTCPeerConnection.prototype._emitBufferedCandidates = function() {
            var self = this;
            var sections = SDPUtils.splitSections(self.localDescription.sdp);
            this._localIceCandidatesBuffer.forEach(function(event) {
              var end = !event.candidate || Object.keys(event.candidate).length === 0;
              if (end) {
                for (var j = 1; j < sections.length; j++) {
                  if (sections[j].indexOf('\r\na=end-of-candidates\r\n') === -1) {
                    sections[j] += 'a=end-of-candidates\r\n';
                  }
                }
              } else if (event.candidate.candidate.indexOf('typ endOfCandidates') === -1) {
                sections[event.candidate.sdpMLineIndex + 1] += 'a=' + event.candidate.candidate + '\r\n';
              }
              self.localDescription.sdp = sections.join('');
              self.dispatchEvent(event);
              if (self.onicecandidate !== null) {
                self.onicecandidate(event);
              }
              if (!event.candidate && self.iceGatheringState !== 'complete') {
                var complete = self.transceivers.every(function(transceiver) {
                  return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
                });
                if (complete) {
                  self.iceGatheringState = 'complete';
                }
              }
            });
            this._localIceCandidatesBuffer = [];
          };
          window.RTCPeerConnection.prototype.addStream = function(stream) {
            this.localStreams.push(stream.clone());
            this._maybeFireNegotiationNeeded();
          };
          window.RTCPeerConnection.prototype.removeStream = function(stream) {
            var idx = this.localStreams.indexOf(stream);
            if (idx > -1) {
              this.localStreams.splice(idx, 1);
              this._maybeFireNegotiationNeeded();
            }
          };
          window.RTCPeerConnection.prototype.getSenders = function() {
            return this.transceivers.filter(function(transceiver) {
              return !!transceiver.rtpSender;
            }).map(function(transceiver) {
              return transceiver.rtpSender;
            });
          };
          window.RTCPeerConnection.prototype.getReceivers = function() {
            return this.transceivers.filter(function(transceiver) {
              return !!transceiver.rtpReceiver;
            }).map(function(transceiver) {
              return transceiver.rtpReceiver;
            });
          };
          window.RTCPeerConnection.prototype._getCommonCapabilities = function(localCapabilities, remoteCapabilities) {
            var commonCapabilities = {
              codecs: [],
              headerExtensions: [],
              fecMechanisms: []
            };
            localCapabilities.codecs.forEach(function(lCodec) {
              for (var i = 0; i < remoteCapabilities.codecs.length; i++) {
                var rCodec = remoteCapabilities.codecs[i];
                if (lCodec.name.toLowerCase() === rCodec.name.toLowerCase() && lCodec.clockRate === rCodec.clockRate && lCodec.numChannels === rCodec.numChannels) {
                  commonCapabilities.codecs.push(rCodec);
                  break;
                }
              }
            });
            localCapabilities.headerExtensions.forEach(function(lHeaderExtension) {
              for (var i = 0; i < remoteCapabilities.headerExtensions.length; i++) {
                var rHeaderExtension = remoteCapabilities.headerExtensions[i];
                if (lHeaderExtension.uri === rHeaderExtension.uri) {
                  commonCapabilities.headerExtensions.push(rHeaderExtension);
                  break;
                }
              }
            });
            return commonCapabilities;
          };
          window.RTCPeerConnection.prototype._createIceAndDtlsTransports = function(mid, sdpMLineIndex) {
            var self = this;
            var iceGatherer = new RTCIceGatherer(self.iceOptions);
            var iceTransport = new RTCIceTransport(iceGatherer);
            iceGatherer.onlocalcandidate = function(evt) {
              var event = new Event('icecandidate');
              event.candidate = {
                sdpMid: mid,
                sdpMLineIndex: sdpMLineIndex
              };
              var cand = evt.candidate;
              var end = !cand || Object.keys(cand).length === 0;
              if (end) {
                if (iceGatherer.state === undefined) {
                  iceGatherer.state = 'completed';
                }
                event.candidate.candidate = 'candidate:1 1 udp 1 0.0.0.0 9 typ endOfCandidates';
              } else {
                cand.component = iceTransport.component === 'RTCP' ? 2 : 1;
                event.candidate.candidate = SDPUtils.writeCandidate(cand);
              }
              var complete = self.transceivers.every(function(transceiver) {
                return transceiver.iceGatherer && transceiver.iceGatherer.state === 'completed';
              });
              switch (self.iceGatheringState) {
                case 'new':
                  self._localIceCandidatesBuffer.push(event);
                  if (end && complete) {
                    self._localIceCandidatesBuffer.push(new Event('icecandidate'));
                  }
                  break;
                case 'gathering':
                  self._emitBufferedCandidates();
                  self.dispatchEvent(event);
                  if (self.onicecandidate !== null) {
                    self.onicecandidate(event);
                  }
                  if (complete) {
                    self.dispatchEvent(new Event('icecandidate'));
                    if (self.onicecandidate !== null) {
                      self.onicecandidate(new Event('icecandidate'));
                    }
                    self.iceGatheringState = 'complete';
                  }
                  break;
                case 'complete':
                  break;
                default:
                  break;
              }
            };
            iceTransport.onicestatechange = function() {
              self._updateConnectionState();
            };
            var dtlsTransport = new RTCDtlsTransport(iceTransport);
            dtlsTransport.ondtlsstatechange = function() {
              self._updateConnectionState();
            };
            dtlsTransport.onerror = function() {
              dtlsTransport.state = 'failed';
              self._updateConnectionState();
            };
            return {
              iceGatherer: iceGatherer,
              iceTransport: iceTransport,
              dtlsTransport: dtlsTransport
            };
          };
          window.RTCPeerConnection.prototype._transceive = function(transceiver, send, recv) {
            var params = this._getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
            if (send && transceiver.rtpSender) {
              params.encodings = transceiver.sendEncodingParameters;
              params.rtcp = {cname: SDPUtils.localCName};
              if (transceiver.recvEncodingParameters.length) {
                params.rtcp.ssrc = transceiver.recvEncodingParameters[0].ssrc;
              }
              transceiver.rtpSender.send(params);
            }
            if (recv && transceiver.rtpReceiver) {
              params.encodings = transceiver.recvEncodingParameters;
              params.rtcp = {cname: transceiver.cname};
              if (transceiver.sendEncodingParameters.length) {
                params.rtcp.ssrc = transceiver.sendEncodingParameters[0].ssrc;
              }
              transceiver.rtpReceiver.receive(params);
            }
          };
          window.RTCPeerConnection.prototype.setLocalDescription = function(description) {
            var self = this;
            var sections;
            var sessionpart;
            if (description.type === 'offer') {
              if (this._pendingOffer) {
                sections = SDPUtils.splitSections(description.sdp);
                sessionpart = sections.shift();
                sections.forEach(function(mediaSection, sdpMLineIndex) {
                  var caps = SDPUtils.parseRtpParameters(mediaSection);
                  self._pendingOffer[sdpMLineIndex].localCapabilities = caps;
                });
                this.transceivers = this._pendingOffer;
                delete this._pendingOffer;
              }
            } else if (description.type === 'answer') {
              sections = SDPUtils.splitSections(self.remoteDescription.sdp);
              sessionpart = sections.shift();
              var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
              sections.forEach(function(mediaSection, sdpMLineIndex) {
                var transceiver = self.transceivers[sdpMLineIndex];
                var iceGatherer = transceiver.iceGatherer;
                var iceTransport = transceiver.iceTransport;
                var dtlsTransport = transceiver.dtlsTransport;
                var localCapabilities = transceiver.localCapabilities;
                var remoteCapabilities = transceiver.remoteCapabilities;
                var rejected = mediaSection.split('\n', 1)[0].split(' ', 2)[1] === '0';
                if (!rejected) {
                  var remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                  if (isIceLite) {
                    var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function(cand) {
                      return SDPUtils.parseCandidate(cand);
                    }).filter(function(cand) {
                      return cand.component === '1';
                    });
                    iceTransport.setRemoteCandidates(cands);
                  }
                  iceTransport.start(iceGatherer, remoteIceParameters, isIceLite ? 'controlling' : 'controlled');
                  var remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                  if (isIceLite) {
                    remoteDtlsParameters.role = 'server';
                  }
                  dtlsTransport.start(remoteDtlsParameters);
                  var params = self._getCommonCapabilities(localCapabilities, remoteCapabilities);
                  self._transceive(transceiver, params.codecs.length > 0, false);
                }
              });
            }
            this.localDescription = {
              type: description.type,
              sdp: description.sdp
            };
            switch (description.type) {
              case 'offer':
                this._updateSignalingState('have-local-offer');
                break;
              case 'answer':
                this._updateSignalingState('stable');
                break;
              default:
                throw new TypeError('unsupported type "' + description.type + '"');
            }
            var hasCallback = arguments.length > 1 && typeof arguments[1] === 'function';
            if (hasCallback) {
              var cb = arguments[1];
              window.setTimeout(function() {
                cb();
                if (self.iceGatheringState === 'new') {
                  self.iceGatheringState = 'gathering';
                }
                self._emitBufferedCandidates();
              }, 0);
            }
            var p = Promise.resolve();
            p.then(function() {
              if (!hasCallback) {
                if (self.iceGatheringState === 'new') {
                  self.iceGatheringState = 'gathering';
                }
                window.setTimeout(self._emitBufferedCandidates.bind(self), 500);
              }
            });
            return p;
          };
          window.RTCPeerConnection.prototype.setRemoteDescription = function(description) {
            var self = this;
            var stream = new MediaStream();
            var receiverList = [];
            var sections = SDPUtils.splitSections(description.sdp);
            var sessionpart = sections.shift();
            var isIceLite = SDPUtils.matchPrefix(sessionpart, 'a=ice-lite').length > 0;
            sections.forEach(function(mediaSection, sdpMLineIndex) {
              var lines = SDPUtils.splitLines(mediaSection);
              var mline = lines[0].substr(2).split(' ');
              var kind = mline[0];
              var rejected = mline[1] === '0';
              var direction = SDPUtils.getDirection(mediaSection, sessionpart);
              var transceiver;
              var iceGatherer;
              var iceTransport;
              var dtlsTransport;
              var rtpSender;
              var rtpReceiver;
              var sendEncodingParameters;
              var recvEncodingParameters;
              var localCapabilities;
              var track;
              var remoteCapabilities = SDPUtils.parseRtpParameters(mediaSection);
              var remoteIceParameters;
              var remoteDtlsParameters;
              if (!rejected) {
                remoteIceParameters = SDPUtils.getIceParameters(mediaSection, sessionpart);
                remoteDtlsParameters = SDPUtils.getDtlsParameters(mediaSection, sessionpart);
                remoteDtlsParameters.role = 'client';
              }
              recvEncodingParameters = SDPUtils.parseRtpEncodingParameters(mediaSection);
              var mid = SDPUtils.matchPrefix(mediaSection, 'a=mid:');
              if (mid.length) {
                mid = mid[0].substr(6);
              } else {
                mid = SDPUtils.generateIdentifier();
              }
              var cname;
              var remoteSsrc = SDPUtils.matchPrefix(mediaSection, 'a=ssrc:').map(function(line) {
                return SDPUtils.parseSsrcMedia(line);
              }).filter(function(obj) {
                return obj.attribute === 'cname';
              })[0];
              if (remoteSsrc) {
                cname = remoteSsrc.value;
              }
              var isComplete = SDPUtils.matchPrefix(mediaSection, 'a=end-of-candidates').length > 0;
              var cands = SDPUtils.matchPrefix(mediaSection, 'a=candidate:').map(function(cand) {
                return SDPUtils.parseCandidate(cand);
              }).filter(function(cand) {
                return cand.component === '1';
              });
              if (description.type === 'offer' && !rejected) {
                var transports = self._createIceAndDtlsTransports(mid, sdpMLineIndex);
                if (isComplete) {
                  transports.iceTransport.setRemoteCandidates(cands);
                }
                localCapabilities = RTCRtpReceiver.getCapabilities(kind);
                sendEncodingParameters = [{ssrc: (2 * sdpMLineIndex + 2) * 1001}];
                rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);
                track = rtpReceiver.track;
                receiverList.push([track, rtpReceiver]);
                stream.addTrack(track);
                if (self.localStreams.length > 0 && self.localStreams[0].getTracks().length >= sdpMLineIndex) {
                  var localtrack = self.localStreams[0].getTracks()[sdpMLineIndex];
                  rtpSender = new RTCRtpSender(localtrack, transports.dtlsTransport);
                }
                self.transceivers[sdpMLineIndex] = {
                  iceGatherer: transports.iceGatherer,
                  iceTransport: transports.iceTransport,
                  dtlsTransport: transports.dtlsTransport,
                  localCapabilities: localCapabilities,
                  remoteCapabilities: remoteCapabilities,
                  rtpSender: rtpSender,
                  rtpReceiver: rtpReceiver,
                  kind: kind,
                  mid: mid,
                  cname: cname,
                  sendEncodingParameters: sendEncodingParameters,
                  recvEncodingParameters: recvEncodingParameters
                };
                self._transceive(self.transceivers[sdpMLineIndex], false, direction === 'sendrecv' || direction === 'sendonly');
              } else if (description.type === 'answer' && !rejected) {
                transceiver = self.transceivers[sdpMLineIndex];
                iceGatherer = transceiver.iceGatherer;
                iceTransport = transceiver.iceTransport;
                dtlsTransport = transceiver.dtlsTransport;
                rtpSender = transceiver.rtpSender;
                rtpReceiver = transceiver.rtpReceiver;
                sendEncodingParameters = transceiver.sendEncodingParameters;
                localCapabilities = transceiver.localCapabilities;
                self.transceivers[sdpMLineIndex].recvEncodingParameters = recvEncodingParameters;
                self.transceivers[sdpMLineIndex].remoteCapabilities = remoteCapabilities;
                self.transceivers[sdpMLineIndex].cname = cname;
                if (isIceLite || isComplete) {
                  iceTransport.setRemoteCandidates(cands);
                }
                iceTransport.start(iceGatherer, remoteIceParameters, 'controlling');
                dtlsTransport.start(remoteDtlsParameters);
                self._transceive(transceiver, direction === 'sendrecv' || direction === 'recvonly', direction === 'sendrecv' || direction === 'sendonly');
                if (rtpReceiver && (direction === 'sendrecv' || direction === 'sendonly')) {
                  track = rtpReceiver.track;
                  receiverList.push([track, rtpReceiver]);
                  stream.addTrack(track);
                } else {
                  delete transceiver.rtpReceiver;
                }
              }
            });
            this.remoteDescription = {
              type: description.type,
              sdp: description.sdp
            };
            switch (description.type) {
              case 'offer':
                this._updateSignalingState('have-remote-offer');
                break;
              case 'answer':
                this._updateSignalingState('stable');
                break;
              default:
                throw new TypeError('unsupported type "' + description.type + '"');
            }
            if (stream.getTracks().length) {
              self.remoteStreams.push(stream);
              window.setTimeout(function() {
                var event = new Event('addstream');
                event.stream = stream;
                self.dispatchEvent(event);
                if (self.onaddstream !== null) {
                  window.setTimeout(function() {
                    self.onaddstream(event);
                  }, 0);
                }
                receiverList.forEach(function(item) {
                  var track = item[0];
                  var receiver = item[1];
                  var trackEvent = new Event('track');
                  trackEvent.track = track;
                  trackEvent.receiver = receiver;
                  trackEvent.streams = [stream];
                  self.dispatchEvent(event);
                  if (self.ontrack !== null) {
                    window.setTimeout(function() {
                      self.ontrack(trackEvent);
                    }, 0);
                  }
                });
              }, 0);
            }
            if (arguments.length > 1 && typeof arguments[1] === 'function') {
              window.setTimeout(arguments[1], 0);
            }
            return Promise.resolve();
          };
          window.RTCPeerConnection.prototype.close = function() {
            this.transceivers.forEach(function(transceiver) {
              if (transceiver.iceTransport) {
                transceiver.iceTransport.stop();
              }
              if (transceiver.dtlsTransport) {
                transceiver.dtlsTransport.stop();
              }
              if (transceiver.rtpSender) {
                transceiver.rtpSender.stop();
              }
              if (transceiver.rtpReceiver) {
                transceiver.rtpReceiver.stop();
              }
            });
            this._updateSignalingState('closed');
          };
          window.RTCPeerConnection.prototype._updateSignalingState = function(newState) {
            this.signalingState = newState;
            var event = new Event('signalingstatechange');
            this.dispatchEvent(event);
            if (this.onsignalingstatechange !== null) {
              this.onsignalingstatechange(event);
            }
          };
          window.RTCPeerConnection.prototype._maybeFireNegotiationNeeded = function() {
            var event = new Event('negotiationneeded');
            this.dispatchEvent(event);
            if (this.onnegotiationneeded !== null) {
              this.onnegotiationneeded(event);
            }
          };
          window.RTCPeerConnection.prototype._updateConnectionState = function() {
            var self = this;
            var newState;
            var states = {
              'new': 0,
              closed: 0,
              connecting: 0,
              checking: 0,
              connected: 0,
              completed: 0,
              failed: 0
            };
            this.transceivers.forEach(function(transceiver) {
              states[transceiver.iceTransport.state]++;
              states[transceiver.dtlsTransport.state]++;
            });
            states.connected += states.completed;
            newState = 'new';
            if (states.failed > 0) {
              newState = 'failed';
            } else if (states.connecting > 0 || states.checking > 0) {
              newState = 'connecting';
            } else if (states.disconnected > 0) {
              newState = 'disconnected';
            } else if (states.new > 0) {
              newState = 'new';
            } else if (states.connected > 0 || states.completed > 0) {
              newState = 'connected';
            }
            if (newState !== self.iceConnectionState) {
              self.iceConnectionState = newState;
              var event = new Event('iceconnectionstatechange');
              this.dispatchEvent(event);
              if (this.oniceconnectionstatechange !== null) {
                this.oniceconnectionstatechange(event);
              }
            }
          };
          window.RTCPeerConnection.prototype.createOffer = function() {
            var self = this;
            if (this._pendingOffer) {
              throw new Error('createOffer called while there is a pending offer.');
            }
            var offerOptions;
            if (arguments.length === 1 && typeof arguments[0] !== 'function') {
              offerOptions = arguments[0];
            } else if (arguments.length === 3) {
              offerOptions = arguments[2];
            }
            var tracks = [];
            var numAudioTracks = 0;
            var numVideoTracks = 0;
            if (this.localStreams.length) {
              numAudioTracks = this.localStreams[0].getAudioTracks().length;
              numVideoTracks = this.localStreams[0].getVideoTracks().length;
            }
            if (offerOptions) {
              if (offerOptions.mandatory || offerOptions.optional) {
                throw new TypeError('Legacy mandatory/optional constraints not supported.');
              }
              if (offerOptions.offerToReceiveAudio !== undefined) {
                numAudioTracks = offerOptions.offerToReceiveAudio;
              }
              if (offerOptions.offerToReceiveVideo !== undefined) {
                numVideoTracks = offerOptions.offerToReceiveVideo;
              }
            }
            if (this.localStreams.length) {
              this.localStreams[0].getTracks().forEach(function(track) {
                tracks.push({
                  kind: track.kind,
                  track: track,
                  wantReceive: track.kind === 'audio' ? numAudioTracks > 0 : numVideoTracks > 0
                });
                if (track.kind === 'audio') {
                  numAudioTracks--;
                } else if (track.kind === 'video') {
                  numVideoTracks--;
                }
              });
            }
            while (numAudioTracks > 0 || numVideoTracks > 0) {
              if (numAudioTracks > 0) {
                tracks.push({
                  kind: 'audio',
                  wantReceive: true
                });
                numAudioTracks--;
              }
              if (numVideoTracks > 0) {
                tracks.push({
                  kind: 'video',
                  wantReceive: true
                });
                numVideoTracks--;
              }
            }
            var sdp = SDPUtils.writeSessionBoilerplate();
            var transceivers = [];
            tracks.forEach(function(mline, sdpMLineIndex) {
              var track = mline.track;
              var kind = mline.kind;
              var mid = SDPUtils.generateIdentifier();
              var transports = self._createIceAndDtlsTransports(mid, sdpMLineIndex);
              var localCapabilities = RTCRtpSender.getCapabilities(kind);
              var rtpSender;
              var rtpReceiver;
              var sendEncodingParameters = [{ssrc: (2 * sdpMLineIndex + 1) * 1001}];
              if (track) {
                rtpSender = new RTCRtpSender(track, transports.dtlsTransport);
              }
              if (mline.wantReceive) {
                rtpReceiver = new RTCRtpReceiver(transports.dtlsTransport, kind);
              }
              transceivers[sdpMLineIndex] = {
                iceGatherer: transports.iceGatherer,
                iceTransport: transports.iceTransport,
                dtlsTransport: transports.dtlsTransport,
                localCapabilities: localCapabilities,
                remoteCapabilities: null,
                rtpSender: rtpSender,
                rtpReceiver: rtpReceiver,
                kind: kind,
                mid: mid,
                sendEncodingParameters: sendEncodingParameters,
                recvEncodingParameters: null
              };
              var transceiver = transceivers[sdpMLineIndex];
              sdp += SDPUtils.writeMediaSection(transceiver, transceiver.localCapabilities, 'offer', self.localStreams[0]);
            });
            this._pendingOffer = transceivers;
            var desc = new RTCSessionDescription({
              type: 'offer',
              sdp: sdp
            });
            if (arguments.length && typeof arguments[0] === 'function') {
              window.setTimeout(arguments[0], 0, desc);
            }
            return Promise.resolve(desc);
          };
          window.RTCPeerConnection.prototype.createAnswer = function() {
            var self = this;
            var sdp = SDPUtils.writeSessionBoilerplate();
            this.transceivers.forEach(function(transceiver) {
              var commonCapabilities = self._getCommonCapabilities(transceiver.localCapabilities, transceiver.remoteCapabilities);
              sdp += SDPUtils.writeMediaSection(transceiver, commonCapabilities, 'answer', self.localStreams[0]);
            });
            var desc = new RTCSessionDescription({
              type: 'answer',
              sdp: sdp
            });
            if (arguments.length && typeof arguments[0] === 'function') {
              window.setTimeout(arguments[0], 0, desc);
            }
            return Promise.resolve(desc);
          };
          window.RTCPeerConnection.prototype.addIceCandidate = function(candidate) {
            var mLineIndex = candidate.sdpMLineIndex;
            if (candidate.sdpMid) {
              for (var i = 0; i < this.transceivers.length; i++) {
                if (this.transceivers[i].mid === candidate.sdpMid) {
                  mLineIndex = i;
                  break;
                }
              }
            }
            var transceiver = this.transceivers[mLineIndex];
            if (transceiver) {
              var cand = Object.keys(candidate.candidate).length > 0 ? SDPUtils.parseCandidate(candidate.candidate) : {};
              if (cand.protocol === 'tcp' && cand.port === 0) {
                return;
              }
              if (cand.component !== '1') {
                return;
              }
              if (cand.type === 'endOfCandidates') {
                cand = {};
              }
              transceiver.iceTransport.addRemoteCandidate(cand);
              var sections = SDPUtils.splitSections(this.remoteDescription.sdp);
              sections[mLineIndex + 1] += (cand.type ? candidate.candidate.trim() : 'a=end-of-candidates') + '\r\n';
              this.remoteDescription.sdp = sections.join('');
            }
            if (arguments.length > 1 && typeof arguments[1] === 'function') {
              window.setTimeout(arguments[1], 0);
            }
            return Promise.resolve();
          };
          window.RTCPeerConnection.prototype.getStats = function() {
            var promises = [];
            this.transceivers.forEach(function(transceiver) {
              ['rtpSender', 'rtpReceiver', 'iceGatherer', 'iceTransport', 'dtlsTransport'].forEach(function(method) {
                if (transceiver[method]) {
                  promises.push(transceiver[method].getStats());
                }
              });
            });
            var cb = arguments.length > 1 && typeof arguments[1] === 'function' && arguments[1];
            return new Promise(function(resolve) {
              var results = new Map();
              Promise.all(promises).then(function(res) {
                res.forEach(function(result) {
                  Object.keys(result).forEach(function(id) {
                    results.set(id, result[id]);
                    results[id] = result[id];
                  });
                });
                if (cb) {
                  window.setTimeout(cb, 0, results);
                }
                resolve(results);
              });
            });
          };
        },
        attachMediaStream: function attachMediaStream(element, stream) {
          logging('DEPRECATED, attachMediaStream will soon be removed.');
          element.srcObject = stream;
        },
        reattachMediaStream: function reattachMediaStream(to, from) {
          logging('DEPRECATED, reattachMediaStream will soon be removed.');
          to.srcObject = from.srcObject;
        }
      };
      module.exports = {
        shimPeerConnection: edgeShim.shimPeerConnection,
        shimGetUserMedia: require('./getusermedia'),
        attachMediaStream: edgeShim.attachMediaStream,
        reattachMediaStream: edgeShim.reattachMediaStream
      };
    }, {
      "../utils": 10,
      "./getusermedia": 6,
      "sdp": 1
    }],
    6: [function(require, module, exports) {
      'use strict';
      module.exports = function() {
        var shimError_ = function shimError_(e) {
          return {
            name: {PermissionDeniedError: 'NotAllowedError'}[e.name] || e.name,
            message: e.message,
            constraint: e.constraint,
            toString: function toString() {
              return this.name;
            }
          };
        };
        var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
        navigator.mediaDevices.getUserMedia = function(c) {
          return origGetUserMedia(c).catch(function(e) {
            return Promise.reject(shimError_(e));
          });
        };
      };
    }, {}],
    7: [function(require, module, exports) {
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      var logging = require('../utils').log;
      var browserDetails = require('../utils').browserDetails;
      var firefoxShim = {
        shimOnTrack: function shimOnTrack() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && window.RTCPeerConnection && !('ontrack' in window.RTCPeerConnection.prototype)) {
            Object.defineProperty(window.RTCPeerConnection.prototype, 'ontrack', {
              get: function get() {
                return this._ontrack;
              },
              set: function set(f) {
                if (this._ontrack) {
                  this.removeEventListener('track', this._ontrack);
                  this.removeEventListener('addstream', this._ontrackpoly);
                }
                this.addEventListener('track', this._ontrack = f);
                this.addEventListener('addstream', this._ontrackpoly = function(e) {
                  e.stream.getTracks().forEach(function(track) {
                    var event = new Event('track');
                    event.track = track;
                    event.receiver = {track: track};
                    event.streams = [e.stream];
                    this.dispatchEvent(event);
                  }.bind(this));
                }.bind(this));
              }
            });
          }
        },
        shimSourceObject: function shimSourceObject() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
            if (window.HTMLMediaElement && !('srcObject' in window.HTMLMediaElement.prototype)) {
              Object.defineProperty(window.HTMLMediaElement.prototype, 'srcObject', {
                get: function get() {
                  return this.mozSrcObject;
                },
                set: function set(stream) {
                  this.mozSrcObject = stream;
                }
              });
            }
          }
        },
        shimPeerConnection: function shimPeerConnection() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) !== 'object' || !(window.RTCPeerConnection || window.mozRTCPeerConnection)) {
            return;
          }
          if (!window.RTCPeerConnection) {
            window.RTCPeerConnection = function(pcConfig, pcConstraints) {
              if (browserDetails.version < 38) {
                if (pcConfig && pcConfig.iceServers) {
                  var newIceServers = [];
                  for (var i = 0; i < pcConfig.iceServers.length; i++) {
                    var server = pcConfig.iceServers[i];
                    if (server.hasOwnProperty('urls')) {
                      for (var j = 0; j < server.urls.length; j++) {
                        var newServer = {url: server.urls[j]};
                        if (server.urls[j].indexOf('turn') === 0) {
                          newServer.username = server.username;
                          newServer.credential = server.credential;
                        }
                        newIceServers.push(newServer);
                      }
                    } else {
                      newIceServers.push(pcConfig.iceServers[i]);
                    }
                  }
                  pcConfig.iceServers = newIceServers;
                }
              }
              return new mozRTCPeerConnection(pcConfig, pcConstraints);
            };
            window.RTCPeerConnection.prototype = mozRTCPeerConnection.prototype;
            if (mozRTCPeerConnection.generateCertificate) {
              Object.defineProperty(window.RTCPeerConnection, 'generateCertificate', {get: function get() {
                  return mozRTCPeerConnection.generateCertificate;
                }});
            }
            window.RTCSessionDescription = mozRTCSessionDescription;
            window.RTCIceCandidate = mozRTCIceCandidate;
          }
          ['setLocalDescription', 'setRemoteDescription', 'addIceCandidate'].forEach(function(method) {
            var nativeMethod = RTCPeerConnection.prototype[method];
            RTCPeerConnection.prototype[method] = function() {
              arguments[0] = new (method === 'addIceCandidate' ? RTCIceCandidate : RTCSessionDescription)(arguments[0]);
              return nativeMethod.apply(this, arguments);
            };
          });
          var makeMapStats = function makeMapStats(stats) {
            var map = new Map();
            Object.keys(stats).forEach(function(key) {
              map.set(key, stats[key]);
              map[key] = stats[key];
            });
            return map;
          };
          var nativeGetStats = RTCPeerConnection.prototype.getStats;
          RTCPeerConnection.prototype.getStats = function(selector, onSucc, onErr) {
            return nativeGetStats.apply(this, [selector || null]).then(function(stats) {
              return makeMapStats(stats);
            }).then(onSucc, onErr);
          };
        },
        shimGetUserMedia: function shimGetUserMedia() {
          var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
            var constraintsToFF37_ = function constraintsToFF37_(c) {
              if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.require) {
                return c;
              }
              var require = [];
              Object.keys(c).forEach(function(key) {
                if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                  return;
                }
                var r = c[key] = _typeof(c[key]) === 'object' ? c[key] : {ideal: c[key]};
                if (r.min !== undefined || r.max !== undefined || r.exact !== undefined) {
                  require.push(key);
                }
                if (r.exact !== undefined) {
                  if (typeof r.exact === 'number') {
                    r.min = r.max = r.exact;
                  } else {
                    c[key] = r.exact;
                  }
                  delete r.exact;
                }
                if (r.ideal !== undefined) {
                  c.advanced = c.advanced || [];
                  var oc = {};
                  if (typeof r.ideal === 'number') {
                    oc[key] = {
                      min: r.ideal,
                      max: r.ideal
                    };
                  } else {
                    oc[key] = r.ideal;
                  }
                  c.advanced.push(oc);
                  delete r.ideal;
                  if (!Object.keys(r).length) {
                    delete c[key];
                  }
                }
              });
              if (require.length) {
                c.require = require;
              }
              return c;
            };
            constraints = JSON.parse(JSON.stringify(constraints));
            if (browserDetails.version < 38) {
              logging('spec: ' + JSON.stringify(constraints));
              if (constraints.audio) {
                constraints.audio = constraintsToFF37_(constraints.audio);
              }
              if (constraints.video) {
                constraints.video = constraintsToFF37_(constraints.video);
              }
              logging('ff37: ' + JSON.stringify(constraints));
            }
            return navigator.mozGetUserMedia(constraints, onSuccess, onError);
          };
          navigator.getUserMedia = getUserMedia_;
          var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
            return new Promise(function(resolve, reject) {
              navigator.getUserMedia(constraints, resolve, reject);
            });
          };
          if (!navigator.mediaDevices) {
            navigator.mediaDevices = {
              getUserMedia: getUserMediaPromise_,
              addEventListener: function addEventListener() {},
              removeEventListener: function removeEventListener() {}
            };
          }
          navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
            return new Promise(function(resolve) {
              var infos = [{
                kind: 'audioinput',
                deviceId: 'default',
                label: '',
                groupId: ''
              }, {
                kind: 'videoinput',
                deviceId: 'default',
                label: '',
                groupId: ''
              }];
              resolve(infos);
            });
          };
          if (browserDetails.version < 41) {
            var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
            navigator.mediaDevices.enumerateDevices = function() {
              return orgEnumerateDevices().then(undefined, function(e) {
                if (e.name === 'NotFoundError') {
                  return [];
                }
                throw e;
              });
            };
          }
        },
        attachMediaStream: function attachMediaStream(element, stream) {
          logging('DEPRECATED, attachMediaStream will soon be removed.');
          element.srcObject = stream;
        },
        reattachMediaStream: function reattachMediaStream(to, from) {
          logging('DEPRECATED, reattachMediaStream will soon be removed.');
          to.srcObject = from.srcObject;
        }
      };
      module.exports = {
        shimOnTrack: firefoxShim.shimOnTrack,
        shimSourceObject: firefoxShim.shimSourceObject,
        shimPeerConnection: firefoxShim.shimPeerConnection,
        shimGetUserMedia: require('./getusermedia'),
        attachMediaStream: firefoxShim.attachMediaStream,
        reattachMediaStream: firefoxShim.reattachMediaStream
      };
    }, {
      "../utils": 10,
      "./getusermedia": 8
    }],
    8: [function(require, module, exports) {
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      var logging = require('../utils').log;
      var browserDetails = require('../utils').browserDetails;
      module.exports = function() {
        var shimError_ = function shimError_(e) {
          return {
            name: {
              SecurityError: 'NotAllowedError',
              PermissionDeniedError: 'NotAllowedError'
            }[e.name] || e.name,
            message: {'The operation is insecure.': 'The request is not allowed by the user ' + 'agent or the platform in the current context.'}[e.message] || e.message,
            constraint: e.constraint,
            toString: function toString() {
              return this.name + (this.message && ': ') + this.message;
            }
          };
        };
        var getUserMedia_ = function getUserMedia_(constraints, onSuccess, onError) {
          var constraintsToFF37_ = function constraintsToFF37_(c) {
            if ((typeof c === 'undefined' ? 'undefined' : _typeof(c)) !== 'object' || c.require) {
              return c;
            }
            var require = [];
            Object.keys(c).forEach(function(key) {
              if (key === 'require' || key === 'advanced' || key === 'mediaSource') {
                return;
              }
              var r = c[key] = _typeof(c[key]) === 'object' ? c[key] : {ideal: c[key]};
              if (r.min !== undefined || r.max !== undefined || r.exact !== undefined) {
                require.push(key);
              }
              if (r.exact !== undefined) {
                if (typeof r.exact === 'number') {
                  r.min = r.max = r.exact;
                } else {
                  c[key] = r.exact;
                }
                delete r.exact;
              }
              if (r.ideal !== undefined) {
                c.advanced = c.advanced || [];
                var oc = {};
                if (typeof r.ideal === 'number') {
                  oc[key] = {
                    min: r.ideal,
                    max: r.ideal
                  };
                } else {
                  oc[key] = r.ideal;
                }
                c.advanced.push(oc);
                delete r.ideal;
                if (!Object.keys(r).length) {
                  delete c[key];
                }
              }
            });
            if (require.length) {
              c.require = require;
            }
            return c;
          };
          constraints = JSON.parse(JSON.stringify(constraints));
          if (browserDetails.version < 38) {
            logging('spec: ' + JSON.stringify(constraints));
            if (constraints.audio) {
              constraints.audio = constraintsToFF37_(constraints.audio);
            }
            if (constraints.video) {
              constraints.video = constraintsToFF37_(constraints.video);
            }
            logging('ff37: ' + JSON.stringify(constraints));
          }
          return navigator.mozGetUserMedia(constraints, onSuccess, function(e) {
            return onError(shimError_(e));
          });
        };
        navigator.getUserMedia = getUserMedia_;
        var getUserMediaPromise_ = function getUserMediaPromise_(constraints) {
          return new Promise(function(resolve, reject) {
            navigator.getUserMedia(constraints, resolve, reject);
          });
        };
        if (!navigator.mediaDevices) {
          navigator.mediaDevices = {
            getUserMedia: getUserMediaPromise_,
            addEventListener: function addEventListener() {},
            removeEventListener: function removeEventListener() {}
          };
        }
        navigator.mediaDevices.enumerateDevices = navigator.mediaDevices.enumerateDevices || function() {
          return new Promise(function(resolve) {
            var infos = [{
              kind: 'audioinput',
              deviceId: 'default',
              label: '',
              groupId: ''
            }, {
              kind: 'videoinput',
              deviceId: 'default',
              label: '',
              groupId: ''
            }];
            resolve(infos);
          });
        };
        if (browserDetails.version < 41) {
          var orgEnumerateDevices = navigator.mediaDevices.enumerateDevices.bind(navigator.mediaDevices);
          navigator.mediaDevices.enumerateDevices = function() {
            return orgEnumerateDevices().then(undefined, function(e) {
              if (e.name === 'NotFoundError') {
                return [];
              }
              throw e;
            });
          };
        }
        if (browserDetails.version < 49) {
          var origGetUserMedia = navigator.mediaDevices.getUserMedia.bind(navigator.mediaDevices);
          navigator.mediaDevices.getUserMedia = function(c) {
            return origGetUserMedia(c).catch(function(e) {
              return Promise.reject(shimError_(e));
            });
          };
        }
      };
    }, {"../utils": 10}],
    9: [function(require, module, exports) {
      'use strict';
      var safariShim = {shimGetUserMedia: function shimGetUserMedia() {
          navigator.getUserMedia = navigator.webkitGetUserMedia;
        }};
      module.exports = {shimGetUserMedia: safariShim.shimGetUserMedia};
    }, {}],
    10: [function(require, module, exports) {
      'use strict';
      var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function(obj) {
        return typeof obj;
      } : function(obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj;
      };
      var logDisabled_ = false;
      var utils = {
        disableLog: function disableLog(bool) {
          if (typeof bool !== 'boolean') {
            return new Error('Argument type: ' + (typeof bool === 'undefined' ? 'undefined' : _typeof(bool)) + '. Please use a boolean.');
          }
          logDisabled_ = bool;
          return bool ? 'adapter.js logging disabled' : 'adapter.js logging enabled';
        },
        log: function log() {
          if ((typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object') {
            if (logDisabled_) {
              return;
            }
            if (typeof console !== 'undefined' && typeof console.log === 'function') {
              console.log.apply(console, arguments);
            }
          }
        },
        extractVersion: function extractVersion(uastring, expr, pos) {
          var match = uastring.match(expr);
          return match && match.length >= pos && parseInt(match[pos], 10);
        },
        detectBrowser: function detectBrowser() {
          var result = {};
          result.browser = null;
          result.version = null;
          result.minVersion = null;
          if (typeof window === 'undefined' || !window.navigator) {
            result.browser = 'Not a browser.';
            return result;
          }
          if (navigator.mozGetUserMedia) {
            result.browser = 'firefox';
            result.version = this.extractVersion(navigator.userAgent, /Firefox\/([0-9]+)\./, 1);
            result.minVersion = 31;
          } else if (navigator.webkitGetUserMedia) {
            if (window.webkitRTCPeerConnection) {
              result.browser = 'chrome';
              result.version = this.extractVersion(navigator.userAgent, /Chrom(e|ium)\/([0-9]+)\./, 2);
              result.minVersion = 38;
            } else {
              if (navigator.userAgent.match(/Version\/(\d+).(\d+)/)) {
                result.browser = 'safari';
                result.version = this.extractVersion(navigator.userAgent, /AppleWebKit\/([0-9]+)\./, 1);
                result.minVersion = 602;
              } else {
                result.browser = 'Unsupported webkit-based browser ' + 'with GUM support but no WebRTC support.';
                return result;
              }
            }
          } else if (navigator.mediaDevices && navigator.userAgent.match(/Edge\/(\d+).(\d+)$/)) {
            result.browser = 'edge';
            result.version = this.extractVersion(navigator.userAgent, /Edge\/(\d+).(\d+)$/, 2);
            result.minVersion = 10547;
          } else {
            result.browser = 'Not a supported browser.';
            return result;
          }
          if (result.version < result.minVersion) {
            utils.log('Browser: ' + result.browser + ' Version: ' + result.version + ' < minimum supported version: ' + result.minVersion + '\n some things might not work!');
          }
          return result;
        }
      };
      module.exports = {
        log: utils.log,
        disableLog: utils.disableLog,
        browserDetails: utils.detectBrowser(),
        extractVersion: utils.extractVersion
      };
    }, {}]
  }, {}, [2])(2);
});

})();
'use strict';

$__System.register('1', ['2', '3', '4', '5'], function (_export, _context) {
  var Peer2, binarize, _possibleConstructorReturn, _inherits, _classCallCheck, _createClass, Evented, settings, drawingCanvas, Peer, PeerBinary, UnChunker, Channel, P2PServer$1, P2PClient$1, P2PServer, P2PClient, imageToBlob;

  // this is a canvas used by imageToBlob

  //
  // @param  {Function} callback []
  //
  function generateWebRTCpayload(obj, callback) {
    //console.time('generateWebRTCpayload')
    binarize.pack(obj, function (bin) {
      var header = {
        payloadID: Math.floor(Math.random() * 100000000)
      };
      var chunks = arrayBufferToChunks(bin.buffer, header.payloadID);
      header.chunkCount = chunks.length;
      //console.timeEnd('generateWebRTCpayload')
      callback({ header: header, chunks: chunks });
    });
  }

  function arrayBufferToChunks(buff, payloadID) {
    //console.time('chunks')
    var result = [];
    var wholeshebang = new Uint8Array(buff);
    var count = 0;
    payloadID = payloadID || Math.floor(Math.random() * 100000000);
    for (var i = 0; i < buff.byteLength; i += settings.CHUNK_SIZE) {
      var chunksize = Math.min(buff.byteLength - i, settings.CHUNK_SIZE);
      var chunk = wholeshebang.slice(i, i + chunksize);
      var id = count; //new Uint8Array(idSize);
      binarize.pack({ payloadID: payloadID, id: id, chunk: chunk }, function (chbin) {
        result.push(chbin);
      }); //event though this is taking a calback i am pretty sure it executes synchronously on array buffers
      count++;
    }
    //console.timeEnd('chunks')
    //console.log(`generated ${count} chunks`)
    return result;
  }

  function imageToBlob$1(img, cb) {
    if (!drawingCanvas) {
      drawingCanvas = document.createElement('canvas');
    }
    drawingCanvas.width = img.width;
    drawingCanvas.height = img.height;
    drawingCanvas.getContext('2d').drawImage(img, 0, 0, img.width, img.height);
    drawingCanvas.toBlob(function (blob) {
      cb(blob);
    });
  }

  return {
    setters: [function (_) {}, function (_2) {
      binarize = _2;
    }, function (_3) {
      Peer2 = _3;
    }, function (_4) {}],
    execute: function () {
      _possibleConstructorReturn = function (self, call) {
        if (!self) {
          throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
        }

        return call && (typeof call === "object" || typeof call === "function") ? call : self;
      };

      _inherits = function (subClass, superClass) {
        if (typeof superClass !== "function" && superClass !== null) {
          throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
        }

        subClass.prototype = Object.create(superClass && superClass.prototype, {
          constructor: {
            value: subClass,
            enumerable: false,
            writable: true,
            configurable: true
          }
        });
        if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
      };

      _classCallCheck = function (instance, Constructor) {
        if (!(instance instanceof Constructor)) {
          throw new TypeError("Cannot call a class as a function");
        }
      };

      _createClass = function () {
        function defineProperties(target, props) {
          for (var i = 0; i < props.length; i++) {
            var descriptor = props[i];
            descriptor.enumerable = descriptor.enumerable || false;
            descriptor.configurable = true;
            if ("value" in descriptor) descriptor.writable = true;
            Object.defineProperty(target, descriptor.key, descriptor);
          }
        }

        return function (Constructor, protoProps, staticProps) {
          if (protoProps) defineProperties(Constructor.prototype, protoProps);
          if (staticProps) defineProperties(Constructor, staticProps);
          return Constructor;
        };
      }();

      Evented = function () {
        function Evented() {
          _classCallCheck(this, Evented);

          this.events = {};
        }

        _createClass(Evented, [{
          key: "on",
          value: function on(eventName, callback) {
            if (typeof callback !== "function") return;
            if (!this.events.hasOwnProperty(eventName)) {
              this.events[eventName] = [];
            }
            this.events[eventName].push(callback);
          }
        }, {
          key: "off",
          value: function off(eventName, callback) {
            if (this.events.hasOwnProperty(eventName)) {
              if (typeof callback === "function") {
                //_.without(this.events[eventName], callback);
                this.events = this.events.filter(function (x) {
                  if (x != this.events[eventName]) {
                    return x;
                  }
                });
              } else {
                delete this.events[eventName];
              }
            }
          }
        }, {
          key: "fire",
          value: function fire(eventName, argument) {
            //_.each(this.events[eventName], (cb) => setTimeout(() => cb(argument)));
            if (this.events[eventName]) {
              var _iteratorNormalCompletion = true;
              var _didIteratorError = false;
              var _iteratorError = undefined;

              try {
                for (var _iterator = this.events[eventName][Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                  var cb = _step.value;

                  setTimeout(function () {
                    return cb(argument);
                  });
                }
              } catch (err) {
                _didIteratorError = true;
                _iteratorError = err;
              } finally {
                try {
                  if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                  }
                } finally {
                  if (_didIteratorError) {
                    throw _iteratorError;
                  }
                }
              }
            }
          }
        }, {
          key: "fireAll",
          value: function fireAll(argument) {
            for (var k in this.events) {
              this.fire(k, argument);
            }
          }
        }]);

        return Evented;
      }();

      settings = {
        firebaseURL: "https://torrid-torch-716.firebaseio.com/",
        // Was having a bug where the WIFI router would crash if the chunk size was bigger than 2^10
        CHUNK_SIZE: Math.pow(2, 10), // size in bytes of the chunks. 2^16 is just under the limit in chrome.
        ICE_SERVERS: [{
          "url": "stun:23.21.150.121",
          "urls": "stun:23.21.150.121"
        }, {
          "url": "turn:global.turn.twilio.com:3478?transport=udp",
          "username": "508d1e639868dc17f5da97a75b1d3b43bf2fc6d11e4e863678501db568b5665c",
          "credential": "W5GTdhQQ6DqOD7k6bS8+xZVNQXm+fgLXSEQpN8bTe70=",
          "urls": "turn:global.turn.twilio.com:3478?transport=udp"
        }],
        POLLING_FREQUENCY: 15000

      };


      console.log('settings', settings);

      Peer = Peer2.default;

      window.simpPeer = Peer;

      PeerBinary = function (_Peer) {
        _inherits(PeerBinary, _Peer);

        function PeerBinary(options) {
          _classCallCheck(this, PeerBinary);

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(PeerBinary).call(this, options));
          //console.log('PeerBinary contructor called')

          _this._registerDataMessage();
          _this.unchunker = new UnChunker(); //
          _this.unchunker.onData = function (val) {
            _this.emit('dataBig', val);
          };
          return _this;
        }

        //want to overide these 2 functions I think.

        _createClass(PeerBinary, [{
          key: "_registerDataMessage",
          value: function _registerDataMessage(event) {
            var _this2 = this;

            this.on('data', function (data) {
              //when its done with a complete chunk, call this.emit('dataBig', completed)
              _this2.unchunker.registerChunk(data);
            });
          }
        }, {
          key: "sendBig",
          value: function sendBig(chunk) {
            var _this3 = this;

            generateWebRTCpayload(chunk, function (stuff) {
              _this3.send(JSON.stringify(stuff.header));
              for (var i in stuff.chunks) {
                var ch = stuff.chunks[i];
                _this3.send(ch.buffer);
              }
            });
          }
        }]);

        return PeerBinary;
      }(Peer);

      UnChunker = function () {
        function UnChunker() {
          _classCallCheck(this, UnChunker);

          this.payloads = {};
          this.payloadCount = 0;
          this.onData = function (val) {
            console.log('default, data is ready:', val);
          };
        }

        _createClass(UnChunker, [{
          key: "registerChunk",
          value: function registerChunk(msg) {
            var _this4 = this;

            var header = this.parseHeader(msg);
            if (header) {
              this._newPayload(header.payloadID, header.chunkCount);
            } else if (this._isChunk(msg)) {
              //the is a chunk hopefully
              binarize.unpack(msg.buffer, function (val) {
                _this4._appendToPayload(val);
                //this.emit('dataBig', val)
                if (_this4._isPayloadReady(val.payloadID)) {
                  _this4._assembleChunks(val.payloadID, function (result) {
                    _this4.onData(result);
                    return result;
                  });
                }
              });
            } else {
              console.warn('not my type', msg);
              //console.warn(this._ab2str(msg))
            }
            return null;
          }
        }, {
          key: "_ab2str",
          value: function _ab2str(buf) {
            return String.fromCharCode.apply(null, new Uint16Array(buf));
          }
        }, {
          key: "_newPayload",
          value: function _newPayload(id, count) {
            this.payloads[id] = {
              count: count,
              chunks: [],
              lastUpdate: new Date()
            };
            this.payloadCount++;
          }
        }, {
          key: "_appendToPayload",
          value: function _appendToPayload(chunk) {
            var pl = this.payloads[chunk.payloadID];
            pl.lastUpdate = new Date();
            pl.chunks.push(chunk);
          }
        }, {
          key: "_assembleChunks",
          value: function _assembleChunks(payloadID, cb) {
            var pl = this.payloads[payloadID];
            pl.chunks.sort(function (a, b) {
              return Number(a.id) - Number(b.id);
            });
            var totalSize = 0;
            for (var i = 0; i < pl.chunks.length; i++) {
              totalSize += pl.chunks[i].chunk.length;
            }
            var result = new Uint8Array(totalSize);
            var position = 0;
            for (var i = 0; i < pl.chunks.length; i++) {
              var ch = pl.chunks[i];
              result.set(ch.chunk, position);
              position += ch.chunk.length;
            }
            binarize.unpack(result.buffer, cb);
            this._removePayload(payloadID);
          }
        }, {
          key: "_removePayload",
          value: function _removePayload(id) {
            delete this.payloads[id];
            this.payloadCount--;
          }
        }, {
          key: "parseHeader",
          value: function parseHeader(data) {
            if (typeof data == "object" && !(data instanceof Uint8Array)) {
              if (data.chunkCount && data.chunkCount > 0) {
                return data;
              }
            } else if (data.length && data.length < 60) {
              // might have been packed or something.
              var str = this._ab2str(data);
              if (str) {
                try {
                  var json = JSON.parse(str);
                  if (json && json.payloadID) {
                    return json;
                  }
                } catch (er) {
                  // probably not a header. Not a big deal
                }
              }
            }
            return undefined;
          }
        }, {
          key: "_isChunk",
          value: function _isChunk(msg) {
            if (this.payloadCount <= 0) {
              return false;
            }
            return msg instanceof Uint8Array || msg instanceof DataView;
          }
        }, {
          key: "_isPayloadReady",
          value: function _isPayloadReady(id) {
            var pl = this.payloads[id];
            if (pl.chunks.length == pl.count) {
              return true;
            }
            return false;
          }
        }]);

        return UnChunker;
      }();

      Channel = function () {
        function Channel(fbref, peer) {
          _classCallCheck(this, Channel);

          this.outRef = fbref.child("fromServer"); //firebase
          this.inRef = fbref.child("fromClient");
          this.peer = peer; // simple-peer
        }

        _createClass(Channel, [{
          key: "destroy",
          value: function destroy() {
            this.outRef.off();
            this.inRef.off();
            this.peer.destroy();
          }
        }]);

        return Channel;
      }();

      P2PServer$1 = function (_Evented) {
        _inherits(P2PServer, _Evented);

        function P2PServer() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          _classCallCheck(this, P2PServer);

          //no idea what this does

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(P2PServer).call(this));

          _this.MAX_CONNECTIONS = 20;
          _this.debug = false;
          _this.id = "server" + Math.floor(Math.random() * 100000);
          _this.firebaseURL = settings.firebaseURL;
          _this.stream = undefined;
          Object.assign(_this, options); //_.extendOwn(this, options)
          if (_this.debug) console.log(_this.id);
          _this.init();
          return _this;
        }

        _createClass(P2PServer, [{
          key: "init",
          value: function init() {
            var _this2 = this;

            var fbref = new Firebase(this.firebaseURL).child('peers');
            this.userRef = fbref.child(this.id);
            this.updateRef = this.userRef.child('lastUpdate');
            this.userRef.onDisconnect().remove();
            this.updateRef.set(new Date().getTime());
            this.channelRef = this.userRef.child('channels');
            if (this.stream) {
              this.userRef.child('isStream').set(true);
            }
            this.channelRef.set([]);
            this.connections = [];
            this._intervalID = setInterval(function () {
              _this2.updateRef.set(new Date().getTime());
            }, settings.POLLING_FREQUENCY);
            this.listenToChannels();
          }
        }, {
          key: "sendToAll",
          value: function sendToAll(data) {
            var _iteratorNormalCompletion = true;
            var _didIteratorError = false;
            var _iteratorError = undefined;

            try {
              for (var _iterator = this.connections[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var conx = _step.value;

                if (this.debug) console.log(conx);
                conx.peer.send(data);
              }
            } catch (err) {
              _didIteratorError = true;
              _iteratorError = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                  _iterator.return();
                }
              } finally {
                if (_didIteratorError) {
                  throw _iteratorError;
                }
              }
            }
          }
        }, {
          key: "listenToChannels",
          value: function listenToChannels() {
            var _this3 = this;

            // when a new channel is added, listen to it.
            this.channelRef.on('child_added', function (ev, prevKey) {
              if (_this3.connections.length > _this3.MAX_CONNECTIONS) {
                console.error('Too many connections. TODO:close/remove old stail connections');
                return;
              }
              var val = ev.val();
              for (var i in val.fromClient) {
                var sig = val.fromClient[i];
                if (sig.type == 'offer') {
                  var channel = new Channel(_this3.channelRef.child(ev.key()), _this3._makePeer());
                  _this3.connections.push(channel);
                  // on message through webRTC (simple-peer)
                  channel.peer.on('signal', function (data) {
                    if (data.type == "answer") {
                      channel.outRef.push(data);
                    } else if (data.candidate) {
                      channel.outRef.push(data);
                    } else {
                      console.warn('unexpected message from WebRTC', data);
                    }
                  });
                  // on message through firebase
                  channel.inRef.on('child_added', function (ev2) {
                    var val2 = ev2.val();
                    if (val2.candidate) {
                      if (_this3.debug) console.log('server got candidate from firebase', val2);
                      channel.peer.signal(val2);
                    } else if (val2.type == 'offer') {
                      channel.peer.signal(val2);
                    } else if (val2.type == 'answer') {
                      //ignore this. It was probably from me.
                    } else {
                        console.warn('unexpected message from Firebase', val2);
                      }
                  });
                }
              }
            });
          }
        }, {
          key: "_makePeer",
          value: function _makePeer() {
            var _this4 = this;

            if (this.debug) console.log('_makePeer called');
            var myoptions = { initiator: false, trickle: true, iceServers: settings.ICE_SERVERS };
            if (this.stream) myoptions.stream = this.stream;
            var p = new PeerBinary(myoptions);
            // fire events
            p.on('error', function (err) {
              console.error('server: error', err);
              _this4.fire('error', { peer: p, err: err });
            });
            p.on('connect', function () {
              if (_this4.debug) console.log('server: client connected');
              _this4.fire('connect', { peer: p });
            });
            p.on('data', function (data) {
              if (_this4.debug) console.log('server: server recieved some data: ', data);
              _this4.fire('data', { peer: p, data: data });
            });
            p.on('close', function () {
              if (_this4.debug) console.log('server: connection closed', p);
              _this4._removeConnection(p);
              _this4.fire('close', { peer: p });
            });
            p.on('dataBig', function (data) {
              _this4.fire('dataBig', { peer: p, data: data });
            });
            p.on('stream', function (stream) {
              if (_this4.debug) console.log('Server: connected to stream', stream);
              _this4.fire('stream', { peer: p, stream: stream });
            });
            //TODO make it so server can register events that will get called on each individual connection
            return p;
          }
        }, {
          key: "destroy",
          value: function destroy() {
            this.channelRef.off();
            this.updateRef.off();
            this.userRef.off();
            var _iteratorNormalCompletion2 = true;
            var _didIteratorError2 = false;
            var _iteratorError2 = undefined;

            try {
              for (var _iterator2 = this.connections[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
                var x = _step2.value;

                x.destroy();
              }
            } catch (err) {
              _didIteratorError2 = true;
              _iteratorError2 = err;
            } finally {
              try {
                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                  _iterator2.return();
                }
              } finally {
                if (_didIteratorError2) {
                  throw _iteratorError2;
                }
              }
            }

            this.connections = [];
            clearInterval(this.intervalID);
          }
        }, {
          key: "_removeConnection",
          value: function _removeConnection(peer) {
            var index = -1;
            for (var i = 0; i < this.connections.length; i++) {
              var conn = this.connections[i];
              if (conn.peer == peer) {
                console.log('found my connection', i, conn);
                index = i;
              }
            }
            if (index >= 0) {
              var conn = this.connections[index];
              conn.destroy();
              this.connections.splice(index, 1);
              console.log(this.connections);
            }
          }
        }]);

        return P2PServer;
      }(Evented);

      P2PClient$1 = function (_Evented) {
        _inherits(P2PClient, _Evented);

        function P2PClient() {
          var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

          _classCallCheck(this, P2PClient);

          var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(P2PClient).call(this));

          Object.assign(_this, settings); //_.extend(this,settings)
          Object.assign(_this, options); //_.extend(this,options)
          _this.fbref = new Firebase(_this.firebaseURL).child('peers');
          _this.connection = null;
          _this.channelRef = null;
          _this.stream = undefined;
          _this.debug = false;
          return _this;
        }

        _createClass(P2PClient, [{
          key: "getPeerList",
          value: function getPeerList(callback) {
            var _this2 = this;

            this.fbref.once('value', function (ev) {
              var val = ev.val();
              _this2.peerList = val;
              callback(null, val);
            });
          }
        }, {
          key: "connectToPeerID",
          value: function connectToPeerID(id) {
            var _this3 = this;

            var callback = arguments.length <= 1 || arguments[1] === undefined ? function () {} : arguments[1];

            this.getPeerList(function () {
              var peer = _this3.peerList[id];
              if (!peer) {
                console.error('peer not defined. id:', id);
                callback("peer not defined");
              } else {
                _this3.serverRef = _this3.fbref.child(id);
                _this3.serverRef.once('value', function (ev1) {
                  var sval = ev1.val();
                  var pOpts = { initiator: true, trickle: true, iceServers: _this3.ICE_SERVERS };
                  if (sval.isStream) {
                    pOpts.stream = _this3.getMyStream();
                  }
                  var p = new PeerBinary(pOpts);
                  _this3.connection = p;
                  _this3._registerEvents();
                  p.on('signal', function (data) {
                    if (data.type == "offer") {
                      _this3._createChannel(data);
                    } else if (data.candidate) {
                      if (_this3.debug) console.log('client recieved candidate from webrtc', data);
                      _this3.outRef.push(data);
                    } else {
                      console.warn('Client recieved unexpected signal through WebRTC:', data);
                    }
                  });
                  callback(null, _this3.connection);
                });
              }
            });
          }
        }, {
          key: "getMyStream",
          value: function getMyStream() {
            if (this.stream) return this.stream;
            // create fake stream if no stream specified, and the server is in streaming mode.
            //    because, at the moment, simple-peer must have a stream from the initiator.
            var fakeCanvas = document.createElement('canvas');
            fakeCanvas.width = fakeCanvas.height = 1;
            var fakeStream = fakeCanvas.captureStream();
            return fakeStream;
          }
        }, {
          key: "disconnect",
          value: function disconnect(callback) {
            callback = callback || function () {
              console.log('client disconnected from server', arguments);
            };
            if (this.serverRef) {
              this.serverRef.off();
            }
            if (this.outRef) {
              this.outRef.off();
            }
            if (this.inRef) {
              this.inRef.off();
            }
            if (this.connection) {
              this.connection.destroy(callback);
            } else {
              callback();
            }
            // QUESTION: should I also disconnect from the listeners to the events emitted by this class?
            //     it would be this.off()
          }
        }, {
          key: "_createChannel",
          value: function _createChannel(offer) {
            var _this4 = this;

            //this.channelRef = this.serverRef.child('channels').push({offer:offer})
            this.channelRef = this.serverRef.child('channels').push({
              fromClient: [offer]
            });
            this.outRef = this.channelRef.child('fromClient');
            this.inRef = this.channelRef.child('fromServer');
            this.inRef.on('child_added', function (ev) {
              if (_this4.debug) console.log('channel message, client', ev.val());
              var val = ev.val();
              if (val.type == 'answer') {
                setTimeout(function () {
                  _this4.connection.signal(val);
                }, 1); // a slight delay helps establish connection, I think.
              } else if (val.candidate) {
                  if (_this4.debug) console.log('client recieved candidate from firebase');
                  setTimeout(function () {
                    _this4.connection.signal(val);
                  }, 1);
                } else {
                  console.warn('Client recieved unexpected signal through Firebase', val);
                }
            });
          }
        }, {
          key: "_registerEvents",
          value: function _registerEvents() {
            var _this5 = this;

            // fire events
            this.connection.on('error', function (err) {
              console.error('client: error', err);
              _this5.fire('error', { peer: _this5.connection, err: err });
            });
            this.connection.on('connect', function () {
              if (_this5.debug) console.log('client: client connected');
              _this5.fire('connect', { peer: _this5.connection });
            });
            this.connection.on('data', function (data) {
              if (_this5.debug) console.log('server: server recieved some data: ', data);
              _this5.fire('data', { peer: _this5.connection, data: data });
            });
            this.connection.on('close', function (data) {
              if (_this5.debug) console.log('connection closed', _this5.connection);
              _this5.fire('close', { peer: _this5.connection });
            });
            this.connection.on('dataBig', function (data) {
              _this5.fire('dataBig', { peer: _this5.connection, data: data });
            });
            this.connection.on('stream', function (stream) {
              if (_this5.debug) console.log('Client: connected to stream', stream);
              _this5.fire('stream', { peer: _this5.connection, stream: stream });
            });
          }
        }]);

        return P2PClient;
      }(Evented);

      _export('P2PServer', P2PServer = P2PServer$1);

      _export('P2PClient', P2PClient = P2PClient$1);

      _export('imageToBlob', imageToBlob = imageToBlob$1);

      _export('P2PServer', P2PServer);

      _export('P2PClient', P2PClient);

      _export('imageToBlob', imageToBlob);
    }
  };
});
})
(function(factory) {
  if (typeof define == 'function' && define.amd)
    define([], factory);
  else if (typeof module == 'object' && module.exports && typeof require == 'function')
    module.exports = factory();
  else
    factory();
});
//# sourceMappingURL=build.js.map