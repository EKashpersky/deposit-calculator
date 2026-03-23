import {u as Te, a as Ze} from "./vue-libs-DRW4RfAU.js";
import {C as Ae, a as lt, L as Me, u as Ne, t as ve, l as $e, T as dt, U as ye, d as Ve, F as Be, e as He} from "./main-DaVpLHd1.js";
import {g as rt, N as xe, aV as Q, r as $, bF as K, aE as Fe, t as Ce, aM as H, bl as p, bK as Y, w as t, J as q, I as ie, v as ae, u as me, bc as d, bR as Se, ag as Ie, aw as Qe, as as ke, bv as we, aT as We, bJ as Ye, aA as qe, a$ as Ge, bM as ue, ax as Ke, bA as vt, F as ge, aY as be, av as Le, bB as nt, bz as Ee} from "./vue-lAuPf_1j.js";
import {c as Je} from "./common-utils--VJJPpEW.js";
import {I as ot} from "./image-components-Bf8dv0az.js";
var Pe = {
  exports: {}
}, _t = Pe.exports, Xe;
function ht() {
  return Xe || (Xe = 1,
  function(s, n) {
    (function(u, m) {
      s.exports = m()
    }
    )(_t, function() {
      var u = 1e3
        , m = 6e4
        , _ = 36e5
        , o = "millisecond"
        , Z = "second"
        , j = "minute"
        , k = "hour"
        , U = "day"
        , e = "week"
        , F = "month"
        , D = "quarter"
        , I = "year"
        , z = "date"
        , E = "Invalid Date"
        , le = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/
        , w = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g
        , x = {
        name: "en",
        weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
        ordinal: function(r) {
          var c = ["th", "st", "nd", "rd"]
            , a = r % 100;
          return "[" + r + (c[(a - 20) % 10] || c[a] || c[0]) + "]"
        }
      }
        , T = function(r, c, a) {
        var l = String(r);
        return !l || l.length >= c ? r : "" + Array(c + 1 - l.length).join(a) + r
      }
        , B = {
        s: T,
        z: function(r) {
          var c = -r.utcOffset()
            , a = Math.abs(c)
            , l = Math.floor(a / 60)
            , i = a % 60;
          return (c <= 0 ? "+" : "-") + T(l, 2, "0") + ":" + T(i, 2, "0")
        },
        m: function r(c, a) {
          if (c.date() < a.date())
            return -r(a, c);
          var l = 12 * (a.year() - c.year()) + (a.month() - c.month())
            , i = c.clone().add(l, F)
            , h = a - i < 0
            , g = c.clone().add(l + (h ? -1 : 1), F);
          return +(-(l + (a - i) / (h ? i - g : g - i)) || 0)
        },
        a: function(r) {
          return r < 0 ? Math.ceil(r) || 0 : Math.floor(r)
        },
        p: function(r) {
          return {
            M: F,
            y: I,
            w: e,
            d: U,
            D: z,
            h: k,
            m: j,
            s: Z,
            ms: o,
            Q: D
          }[r] || String(r || "").toLowerCase().replace(/s$/, "")
        },
        u: function(r) {
          return r === void 0
        }
      }
        , R = "en"
        , X = {};
      X[R] = x;
      var N = "$isDayjsObject"
        , S = function(r) {
        return r instanceof y || !(!r || !r[N])
      }
        , V = function r(c, a, l) {
        var i;
        if (!c)
          return R;
        if (typeof c == "string") {
          var h = c.toLowerCase();
          X[h] && (i = h),
          a && (X[h] = a,
          i = h);
          var g = c.split("-");
          if (!i && g.length > 1)
            return r(g[0])
        } else {
          var P = c.name;
          X[P] = c,
          i = P
        }
        return !l && i && (R = i),
        i || !l && R
      }
        , M = function(r, c) {
        if (S(r))
          return r.clone();
        var a = typeof c == "object" ? c : {};
        return a.date = r,
        a.args = arguments,
        new y(a)
      }
        , v = B;
      v.l = V,
      v.i = S,
      v.w = function(r, c) {
        return M(r, {
          locale: c.$L,
          utc: c.$u,
          x: c.$x,
          $offset: c.$offset
        })
      }
      ;
      var y = function() {
        function r(a) {
          this.$L = V(a.locale, null, !0),
          this.parse(a),
          this.$x = this.$x || a.x || {},
          this[N] = !0
        }
        var c = r.prototype;
        return c.parse = function(a) {
          this.$d = function(l) {
            var i = l.date
              , h = l.utc;
            if (i === null)
              return new Date(NaN);
            if (v.u(i))
              return new Date;
            if (i instanceof Date)
              return new Date(i);
            if (typeof i == "string" && !/Z$/i.test(i)) {
              var g = i.match(le);
              if (g) {
                var P = g[2] - 1 || 0
                  , W = (g[7] || "0").substring(0, 3);
                return h ? new Date(Date.UTC(g[1], P, g[3] || 1, g[4] || 0, g[5] || 0, g[6] || 0, W)) : new Date(g[1],P,g[3] || 1,g[4] || 0,g[5] || 0,g[6] || 0,W)
              }
            }
            return new Date(i)
          }(a),
          this.init()
        }
        ,
        c.init = function() {
          var a = this.$d;
          this.$y = a.getFullYear(),
          this.$M = a.getMonth(),
          this.$D = a.getDate(),
          this.$W = a.getDay(),
          this.$H = a.getHours(),
          this.$m = a.getMinutes(),
          this.$s = a.getSeconds(),
          this.$ms = a.getMilliseconds()
        }
        ,
        c.$utils = function() {
          return v
        }
        ,
        c.isValid = function() {
          return this.$d.toString() !== E
        }
        ,
        c.isSame = function(a, l) {
          var i = M(a);
          return this.startOf(l) <= i && i <= this.endOf(l)
        }
        ,
        c.isAfter = function(a, l) {
          return M(a) < this.startOf(l)
        }
        ,
        c.isBefore = function(a, l) {
          return this.endOf(l) < M(a)
        }
        ,
        c.$g = function(a, l, i) {
          return v.u(a) ? this[l] : this.set(i, a)
        }
        ,
        c.unix = function() {
          return Math.floor(this.valueOf() / 1e3)
        }
        ,
        c.valueOf = function() {
          return this.$d.getTime()
        }
        ,
        c.startOf = function(a, l) {
          var i = this
            , h = !!v.u(l) || l
            , g = v.p(a)
            , P = function(ne, re) {
            var f = v.w(i.$u ? Date.UTC(i.$y, re, ne) : new Date(i.$y,re,ne), i);
            return h ? f : f.endOf(U)
          }
            , W = function(ne, re) {
            return v.w(i.toDate()[ne].apply(i.toDate("s"), (h ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(re)), i)
          }
            , ee = this.$W
            , te = this.$M
            , G = this.$D
            , fe = "set" + (this.$u ? "UTC" : "");
          switch (g) {
          case I:
            return h ? P(1, 0) : P(31, 11);
          case F:
            return h ? P(1, te) : P(0, te + 1);
          case e:
            var ce = this.$locale().weekStart || 0
              , _e = (ee < ce ? ee + 7 : ee) - ce;
            return P(h ? G - _e : G + (6 - _e), te);
          case U:
          case z:
            return W(fe + "Hours", 0);
          case k:
            return W(fe + "Minutes", 1);
          case j:
            return W(fe + "Seconds", 2);
          case Z:
            return W(fe + "Milliseconds", 3);
          default:
            return this.clone()
          }
        }
        ,
        c.endOf = function(a) {
          return this.startOf(a, !1)
        }
        ,
        c.$set = function(a, l) {
          var i, h = v.p(a), g = "set" + (this.$u ? "UTC" : ""), P = (i = {},
          i[U] = g + "Date",
          i[z] = g + "Date",
          i[F] = g + "Month",
          i[I] = g + "FullYear",
          i[k] = g + "Hours",
          i[j] = g + "Minutes",
          i[Z] = g + "Seconds",
          i[o] = g + "Milliseconds",
          i)[h], W = h === U ? this.$D + (l - this.$W) : l;
          if (h === F || h === I) {
            var ee = this.clone().set(z, 1);
            ee.$d[P](W),
            ee.init(),
            this.$d = ee.set(z, Math.min(this.$D, ee.daysInMonth())).$d
          } else
            P && this.$d[P](W);
          return this.init(),
          this
        }
        ,
        c.set = function(a, l) {
          return this.clone().$set(a, l)
        }
        ,
        c.get = function(a) {
          return this[v.p(a)]()
        }
        ,
        c.add = function(a, l) {
          var i, h = this;
          a = Number(a);
          var g = v.p(l)
            , P = function(te) {
            var G = M(h);
            return v.w(G.date(G.date() + Math.round(te * a)), h)
          };
          if (g === F)
            return this.set(F, this.$M + a);
          if (g === I)
            return this.set(I, this.$y + a);
          if (g === U)
            return P(1);
          if (g === e)
            return P(7);
          var W = (i = {},
          i[j] = m,
          i[k] = _,
          i[Z] = u,
          i)[g] || 1
            , ee = this.$d.getTime() + a * W;
          return v.w(ee, this)
        }
        ,
        c.subtract = function(a, l) {
          return this.add(-1 * a, l)
        }
        ,
        c.format = function(a) {
          var l = this
            , i = this.$locale();
          if (!this.isValid())
            return i.invalidDate || E;
          var h = a || "YYYY-MM-DDTHH:mm:ssZ"
            , g = v.z(this)
            , P = this.$H
            , W = this.$m
            , ee = this.$M
            , te = i.weekdays
            , G = i.months
            , fe = i.meridiem
            , ce = function(re, f, b, A) {
            return re && (re[f] || re(l, h)) || b[f].slice(0, A)
          }
            , _e = function(re) {
            return v.s(P % 12 || 12, re, "0")
          }
            , ne = fe || function(re, f, b) {
            var A = re < 12 ? "AM" : "PM";
            return b ? A.toLowerCase() : A
          }
          ;
          return h.replace(w, function(re, f) {
            return f || function(b) {
              switch (b) {
              case "YY":
                return String(l.$y).slice(-2);
              case "YYYY":
                return v.s(l.$y, 4, "0");
              case "M":
                return ee + 1;
              case "MM":
                return v.s(ee + 1, 2, "0");
              case "MMM":
                return ce(i.monthsShort, ee, G, 3);
              case "MMMM":
                return ce(G, ee);
              case "D":
                return l.$D;
              case "DD":
                return v.s(l.$D, 2, "0");
              case "d":
                return String(l.$W);
              case "dd":
                return ce(i.weekdaysMin, l.$W, te, 2);
              case "ddd":
                return ce(i.weekdaysShort, l.$W, te, 3);
              case "dddd":
                return te[l.$W];
              case "H":
                return String(P);
              case "HH":
                return v.s(P, 2, "0");
              case "h":
                return _e(1);
              case "hh":
                return _e(2);
              case "a":
                return ne(P, W, !0);
              case "A":
                return ne(P, W, !1);
              case "m":
                return String(W);
              case "mm":
                return v.s(W, 2, "0");
              case "s":
                return String(l.$s);
              case "ss":
                return v.s(l.$s, 2, "0");
              case "SSS":
                return v.s(l.$ms, 3, "0");
              case "Z":
                return g
              }
              return null
            }(re) || g.replace(":", "")
          })
        }
        ,
        c.utcOffset = function() {
          return 15 * -Math.round(this.$d.getTimezoneOffset() / 15)
        }
        ,
        c.diff = function(a, l, i) {
          var h, g = this, P = v.p(l), W = M(a), ee = (W.utcOffset() - this.utcOffset()) * m, te = this - W, G = function() {
            return v.m(g, W)
          };
          switch (P) {
          case I:
            h = G() / 12;
            break;
          case F:
            h = G();
            break;
          case D:
            h = G() / 3;
            break;
          case e:
            h = (te - ee) / 6048e5;
            break;
          case U:
            h = (te - ee) / 864e5;
            break;
          case k:
            h = te / _;
            break;
          case j:
            h = te / m;
            break;
          case Z:
            h = te / u;
            break;
          default:
            h = te
          }
          return i ? h : v.a(h)
        }
        ,
        c.daysInMonth = function() {
          return this.endOf(F).$D
        }
        ,
        c.$locale = function() {
          return X[this.$L]
        }
        ,
        c.locale = function(a, l) {
          if (!a)
            return this.$L;
          var i = this.clone()
            , h = V(a, l, !0);
          return h && (i.$L = h),
          i
        }
        ,
        c.clone = function() {
          return v.w(this.$d, this)
        }
        ,
        c.toDate = function() {
          return new Date(this.valueOf())
        }
        ,
        c.toJSON = function() {
          return this.isValid() ? this.toISOString() : null
        }
        ,
        c.toISOString = function() {
          return this.$d.toISOString()
        }
        ,
        c.toString = function() {
          return this.$d.toUTCString()
        }
        ,
        r
      }()
        , C = y.prototype;
      return M.prototype = C,
      [["$ms", o], ["$s", Z], ["$m", j], ["$H", k], ["$W", U], ["$M", F], ["$y", I], ["$D", z]].forEach(function(r) {
        C[r[1]] = function(c) {
          return this.$g(c, r[0], r[1])
        }
      }),
      M.extend = function(r, c) {
        return r.$i || (r(c, y, M),
        r.$i = !0),
        M
      }
      ,
      M.locale = V,
      M.isDayjs = S,
      M.unix = function(r) {
        return M(1e3 * r)
      }
      ,
      M.en = X[R],
      M.Ls = X,
      M.p = {},
      M
    })
  }(Pe)),
  Pe.exports
}
var yt = ht();
const he = rt(yt);
var Ue, et;
function gt() {
  if (et)
    return Ue;
  et = 1;
  var s = function(x) {
    return n(x) && !u(x)
  };
  function n(w) {
    return !!w && typeof w == "object"
  }
  function u(w) {
    var x = Object.prototype.toString.call(w);
    return x === "[object RegExp]" || x === "[object Date]" || o(w)
  }
  var m = typeof Symbol == "function" && Symbol.for
    , _ = m ? Symbol.for("react.element") : 60103;
  function o(w) {
    return w.$$typeof === _
  }
  function Z(w) {
    return Array.isArray(w) ? [] : {}
  }
  function j(w, x) {
    return x.clone !== !1 && x.isMergeableObject(w) ? E(Z(w), w, x) : w
  }
  function k(w, x, T) {
    return w.concat(x).map(function(B) {
      return j(B, T)
    })
  }
  function U(w, x) {
    if (!x.customMerge)
      return E;
    var T = x.customMerge(w);
    return typeof T == "function" ? T : E
  }
  function e(w) {
    return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(w).filter(function(x) {
      return Object.propertyIsEnumerable.call(w, x)
    }) : []
  }
  function F(w) {
    return Object.keys(w).concat(e(w))
  }
  function D(w, x) {
    try {
      return x in w
    } catch {
      return !1
    }
  }
  function I(w, x) {
    return D(w, x) && !(Object.hasOwnProperty.call(w, x) && Object.propertyIsEnumerable.call(w, x))
  }
  function z(w, x, T) {
    var B = {};
    return T.isMergeableObject(w) && F(w).forEach(function(R) {
      B[R] = j(w[R], T)
    }),
    F(x).forEach(function(R) {
      I(w, R) || (D(w, R) && T.isMergeableObject(x[R]) ? B[R] = U(R, T)(w[R], x[R], T) : B[R] = j(x[R], T))
    }),
    B
  }
  function E(w, x, T) {
    T = T || {},
    T.arrayMerge = T.arrayMerge || k,
    T.isMergeableObject = T.isMergeableObject || s,
    T.cloneUnlessOtherwiseSpecified = j;
    var B = Array.isArray(x)
      , R = Array.isArray(w)
      , X = B === R;
    return X ? B ? T.arrayMerge(w, x, T) : z(w, x, T) : j(x, T)
  }
  E.all = function(x, T) {
    if (!Array.isArray(x))
      throw new Error("first argument should be an array");
    return x.reduce(function(B, R) {
      return E(B, R, T)
    }, {})
  }
  ;
  var le = E;
  return Ue = le,
  Ue
}
var bt = gt();
const Ct = rt(bt)
  , tt = new Map
  , pe = {
  timezone: "GMT",
  excludeKeys(s, n=[]) {
    const u = {};
    return Object.keys(s).forEach(m => {
      n.includes(m) || (u[m] = s[m])
    }
    ),
    u
  },
  isInList(s, n) {
    return (Array.isArray(s) ? s : [s]).some(m => (n || []).includes(m))
  },
  extendRoute(s) {
    const n = pe.global.router.currentRoute.value
      , u = {
      params: n.params,
      query: n.query,
      hash: n.hash
    };
    return n.name ? u.name = n.name : u.path = n.path,
    Ct(u, s)
  },
  formatKV(s, n, u="code", m="name") {
    if (n)
      if (Array.isArray(n)) {
        const _ = n.find(o => o[u] == s);
        return _ ? _[m] : s
      } else
        return n[s]
  },
  formatDate(s, n="L") {
    return s ? he(s).format(n) : ""
  },
  formatDateTz(s, n="L", u=pe.timezone) {
    return s ? he(s).tz(u).format(n) : ""
  },
  formatTime(s, n="LT") {
    return s ? he(s).format(n) : ""
  },
  formatTimeTz(s, n="LT", u=pe.timezone) {
    return s ? he(s).tz(u).format(n) : ""
  },
  formatDateTime(s, n="L LT") {
    return s ? he(s).format(n) : ""
  },
  formatDateTimeTz(s, n="L LT", u=pe.timezone) {
    return s ? he(s).tz(u).format(n) : ""
  },
  formatDuration(s, n="HH:mm:ss") {
    return s != null ? he.duration(s).format(n) : ""
  },
  formatAmount(s, n) {
    n = Object.assign({
      locale: "uk",
      decimalSeparator: ".",
      groupSeparator: " ",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }, n || {});
    const u = JSON.stringify(n);
    let m = tt.get(u);
    if (!m) {
      n.currency || (delete n.currencyDisplay,
      delete n.style);
      try {
        tt.set(u, m = new Intl.NumberFormat(n.locale || "uk",n))
      } catch {}
    }
    const _ = o => m ? m.formatToParts(o).reduce( (j, k) => k.type == "decimal" && n.decimalSeparator ? j + n.decimalSeparator : k.type == "group" && n.groupSeparator ? j + n.groupSeparator : j + k.value, "") : o;
    return typeof s == "string" && !s.trim().length ? "" : _(s || 0)
  },
  currencyCodes: {
    978: "EUR",
    840: "USD",
    980: "UAH",
    985: "PLN"
  },
  getCurrencyColor: s => s == "840" ? "var(--green-600)" : s == "978" ? "var(--red-600)" : s == "985" ? "var(--purple-600)" : s == "840" ? "var(--blue-600)" : "var(--yellow-600)",
  formatCurrency(s, n) {
    return n = Object.assign({
      locale: "uk",
      style: "currency",
      currencyDisplay: "narrowSymbol",
      currency: "UAH",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2
    }, n || {}),
    n.currencyId && (n.currency = pe.currencyCodes[n.currencyId] || n.currencyId),
    pe.formatAmount(s, n)
  },
  formatBoolean(s, n, u) {
    return s ? n : u
  },
  alignColumnPT(s) {
    return {
      headercontent: {
        class: [`p-justify-content-${{
          left: "start",
          right: "end"
        }[s] || s}`, `p-text-${{
          start: "left",
          end: "right"
        }[s] || s}`]
      },
      bodycell: {
        class: `p-text-${{
          start: "left",
          end: "right"
        }[s] || s}`
      }
    }
  }
};
function ur(s, {timezone: n="GMT"}={}) {
  pe.timezone = n,
  pe.global = {
    router: s.router
  },
  Object.assign(s.app.config.globalProperties, pe)
}
let it;
function mr() {
  return it
}
function pr(s) {
  it = s.global
}
const ze = {
  black: {
    minMonthTerm: 3,
    maxMonthTerm: 36,
    minLoanAmount: 1,
    maxLoanAmount: 5e5,
    baseMonthlyInterestRate: .031,
    apr: 44.26,
    gracePeriodDays: 62,
    issuanceFee: 0,
    monthlyServiceFee: 0
  },
  platinum: {
    minMonthTerm: 3,
    maxMonthTerm: 36,
    minLoanAmount: 1,
    maxLoanAmount: 5e5,
    baseMonthlyInterestRate: .029,
    apr: 42.03,
    gracePeriodDays: 62,
    issuanceFee: 500,
    monthlyServiceFee: 300
  },
  iron: {
    minMonthTerm: 2,
    maxMonthTerm: 36,
    minLoanAmount: 1,
    maxLoanAmount: 5e5,
    baseMonthlyInterestRate: .029,
    apr: 44.16,
    gracePeriodDays: 30,
    issuanceFee: 2e3,
    monthlyServiceFee: 750
  }
};
function $t(s, n) {
  let u = 0;
  for (let {date: m, amount: _} of s)
    u = u + _ / Math.pow(n, m);
  return u
}
function wt(s, n) {
  let u = 0;
  for (let {date: m, amount: _} of s)
    u = u - m * _ / Math.pow(n, m + 1);
  return u
}
function xt({amount: s}) {
  return s > 0
}
function Dt({amount: s}) {
  return s < 0
}
function Mt(s, n=.1, u=1e-10, m=200, _=20) {
  if (s.findIndex(xt) === -1)
    throw new RangeError("No positive amount was found in cash flows");
  if (s.findIndex(Dt) === -1)
    throw new RangeError("No negative amount was found in cash flows");
  if (n <= -1)
    throw new RangeError("Guess rate is less than or equal to -1");
  if (u <= 0)
    throw new RangeError("Max epsilon is less than or equal to 0");
  if (m < 10)
    throw new RangeError("Max scans is lower than 10");
  if (_ < 10)
    throw new RangeError("Max iterations is lower than 10");
  let o = n, Z, j = 0, k = !1;
  const U = s[0].amount
    , e = s.slice(1);
  do {
    j >= 1 && (o = -.99 + (j - 1) * .01);
    let F = _;
    do {
      Z = U + $t(e, o + 1);
      const D = o - Z / wt(e, o + 1)
        , I = Math.abs(D - o);
      o = D,
      k = I > u && Math.abs(Z) > u
    } while (k && --F);
    k = k || isNaN(o) || !isFinite(o) || isNaN(Z) || !isFinite(Z)
  } while (k && !(++j < m));
  if (k)
    throw new Error("XIRR calculation failed. Try to increase one of: max epsilon, max scans, max iterations");
  return o
}
const kt = 365 * 864e5;
function Tt({amount: s, date: n}) {
  return {
    amount: s,
    date: n.getTime()
  }
}
function At({date: s}, {date: n}) {
  return s - n
}
function Ft(s) {
  const n = s.map(Tt).sort(At)
    , u = n[0].date;
  return n.map( ({amount: m, date: _}) => ({
    amount: m,
    date: (_ - u) / kt
  }))
}
function St(s, n, u, m, _) {
  return Mt(Ft(s), n, u, m, _)
}
const Vt = {
  black: {
    minMonthTerm: 3,
    maxMonthTerm: 36,
    minLoanAmount: 1,
    maxLoanAmount: 5e5,
    baseMonthlyInterestRate: .031,
    apr: 44.26,
    gracePeriodDays: 62,
    issuanceFee: 0,
    monthlyServiceFee: 0
  },
  platinum: {
    minMonthTerm: 3,
    maxMonthTerm: 36,
    minLoanAmount: 1,
    maxLoanAmount: 5e5,
    baseMonthlyInterestRate: .029,
    apr: 42.03,
    gracePeriodDays: 62,
    issuanceFee: 500,
    monthlyServiceFee: 300
  },
  iron: {
    minMonthTerm: 2,
    maxMonthTerm: 36,
    minLoanAmount: 1,
    maxLoanAmount: 5e5,
    baseMonthlyInterestRate: .029,
    apr: 44.16,
    gracePeriodDays: 30,
    issuanceFee: 2e3,
    monthlyServiceFee: 750
  }
};
function Pt(s) {
  var y;
  const {cardType: n, netAmount: u, termMonths: m, issueDate: _} = s
    , Z = {
    black: {
      graceDays: 61,
      baseRate: .031,
      originationFee: 0,
      monthlyFee: 0
    },
    platinum: {
      graceDays: 61,
      baseRate: .029,
      originationFee: 500,
      monthlyFee: 300
    },
    iron: {
      graceDays: 31,
      baseRate: .029,
      originationFee: 2e3,
      monthlyFee: 750
    }
  }[n]
    , j = 30.41666
    , k = .04
    , U = u - Z.originationFee
    , e = [];
  function F(C, r) {
    const c = C.getFullYear()
      , a = C.getMonth()
      , l = new Date(Date.UTC(c, a + r + 1, 0));
    return new Date(l.getUTCFullYear(),l.getUTCMonth(),l.getUTCDate())
  }
  function D(C, r) {
    const c = new Date(C.getTime())
      , a = c.getMonth() + r
      , l = c.getFullYear() + Math.floor(a / 12)
      , i = a % 12
      , h = c.getDate()
      , g = new Date(l,i,h);
    return g.getMonth() !== i ? new Date(l,i + 1,0) : g
  }
  function I(C, r) {
    return Math.round((C.getTime() - r.getTime()) / 864e5)
  }
  const z = n === "black" ? 1 : 0;
  e.push({
    index: z,
    date: new Date(_.getTime()),
    daysInPeriod: 0,
    principalRemaining: u,
    principalPayment: 0,
    interestAccrued: 0,
    serviceFee: Z.originationFee,
    customerCashFlow: -U,
    bankCashFlow: -U
  });
  let E = 0;
  if (n === "platinum") {
    const C = Z.monthlyFee;
    e.push({
      index: z + 1,
      date: D(new Date(_.getTime()), 1),
      daysInPeriod: 0,
      principalRemaining: u,
      principalPayment: 0,
      interestAccrued: 0,
      serviceFee: C,
      customerCashFlow: C,
      bankCashFlow: C
    }),
    E = 1
  }
  e.length;
  for (let C = 1; C <= m - E; C++) {
    const r = e[e.length - 1]
      , c = r.index + 1;
    let a;
    n === "platinum" ? C === 1 ? a = F(r.date, 0) : a = F(r.date, 1) : n === "iron" ? C === 1 ? a = F(_, 0) : a = F(r.date, 1) : C === 1 ? a = F(_, 1) : a = F(r.date, 1);
    let l;
    if (c <= m)
      if (C === 1 && n === "iron")
        l = 31;
      else {
        let G = C === 1 ? _ : r.date;
        l = I(a, G),
        C === 1 && (l += 1)
      }
    else
      l = 0;
    const i = r.principalRemaining
      , h = c <= m ? i * Z.baseRate / j * l : 0
      , g = c <= m ? Z.monthlyFee : 0;
    let P = 0;
    if (c <= m)
      if (c === m)
        P = i;
      else {
        const G = i * k;
        G < 100 && i - G <= 100 ? P = i : G < 100 && i - G > 0 ? P = 100 : P = G
      }
    P = Math.round(P * 100) / 100;
    let W;
    c >= m ? W = 0 : W = i - P + h + g;
    let ee;
    c === m ? ee = P + h + g : ee = P;
    let te;
    c === m ? te = P + h + g : te = P + g,
    e.push({
      index: c,
      date: a,
      minPayment: P,
      daysInPeriod: l,
      principalRemaining: W,
      principalPayment: P,
      interestAccrued: h,
      serviceFee: g,
      customerCashFlow: ee,
      bankCashFlow: te
    })
  }
  const le = e.map(C => C.bankCashFlow)
    , w = e.map(C => C.date);
  function x(C, r=.1) {
    let c = r;
    for (let a = 0; a < 100; a++) {
      let l = 0
        , i = 0;
      for (let g = 0; g < C.length; g++) {
        const P = Math.pow(1 + c, g);
        l += C[g] / P,
        g > 0 && (i += -g * C[g] / P)
      }
      const h = c - l / i;
      if (Math.abs(h - c) < 1e-10)
        return h;
      c = h
    }
    return c
  }
  const B = x(le, .1) * 12
    , R = e.reduce( (C, r) => C + r.serviceFee, 0);
  let X = 0;
  for (let C = 1; C < e.length; C++)
    X += e[C].customerCashFlow;
  X += e[0].serviceFee;
  const N = e.map(C => C.customerCashFlow);
  let S;
  n === "black" && u === 1 ? S = 1e14 : n === "platinum" && u < 36 || n === "iron" && u < 45 ? S = 10 : S = .1;
  const V = N.map( (C, r) => ({
    amount: C,
    date: w[r]
  }));
  let M = 0;
  try {
    M = St(V, S)
  } catch {
    M = 0
  }
  let v = ((y = e[1 + E]) == null ? void 0 : y.minPayment) || 0;
  return {
    schedule: e,
    irr: B,
    totalCommissions: R,
    totalCreditCost: X,
    realAnnualRate: M,
    minPayment: v,
    customerFlows: N,
    cashFlows: le,
    dates: w,
    guessForXirr: S,
    cf: V,
    gracePeriodEndDate: Lt(n, _)
  }
}
function Lt(s, n) {
  if (!(s in Vt))
    throw new Error("Invalid card type");
  if (s === "iron") {
    const u = new Date(n);
    u.setMonth(n.getMonth() + 1);
    const m = n.getDate();
    return u.setDate(1),
    u.setMonth(u.getMonth() + 1),
    u.setDate(0),
    m <= u.getDate() && u.setDate(m),
    u
  } else {
    const u = new Date(n);
    return u.setMonth(n.getMonth() + 2),
    u.setDate(0),
    u
  }
}
const Zt = {
  class: "loan-calculator"
}
  , It = {
  class: "loan-calculator-content"
}
  , Ot = {
  class: "loan-calculator-form"
}
  , jt = {
  class: "loan-calculator-field"
}
  , Rt = {
  class: "loan-calculator-field"
}
  , Ut = {
  class: "loan-calculator-field"
}
  , zt = {
  class: "loan-calculator-results"
}
  , Et = {
  class: "loan-calculator-results-content"
}
  , Nt = {
  class: "loan-calculator-main-result"
}
  , Bt = {
  class: "loan-calculator-result-title"
}
  , Ht = {
  key: 0
}
  , Wt = {
  class: "loan-calculator-result-amount"
}
  , Yt = {
  class: "loan-calculator-details"
}
  , qt = {
  class: "loan-calculator-detail-item"
}
  , Gt = {
  class: "loan-calculator-detail-label"
}
  , Jt = {
  class: "loan-calculator-detail-value"
}
  , Qt = {
  class: "loan-calculator-detail-item"
}
  , Kt = {
  class: "loan-calculator-detail-label"
}
  , Xt = {
  class: "loan-calculator-detail-value"
}
  , ea = {
  class: "loan-calculator-detail-item"
}
  , ta = {
  class: "loan-calculator-detail-label"
}
  , aa = {
  class: "loan-calculator-detail-value"
}
  , la = {
  class: "loan-calculator-detail-item"
}
  , ra = {
  class: "loan-calculator-detail-label"
}
  , na = {
  class: "loan-calculator-detail-value"
}
  , oa = {
  class: "loan-calculator-detail-item"
}
  , ia = {
  class: "loan-calculator-detail-label"
}
  , ca = {
  class: "loan-calculator-detail-value"
}
  , sa = xe({
  name: "LoanCalculator",
  __name: "LoanCalculator_new",
  props: {
    card: {
      default: "black"
    }
  },
  setup(s) {
    const n = s
      , {t: u} = Te()
      , m = Q(n.card)
      , _ = Q(1e4)
      , o = Q(0)
      , Z = Q([{
      id: "black",
      name: u("loanCalculator.cards.black"),
      icon: "calculator/card-black",
      disabled: !1
    }, {
      id: "platinum",
      name: u("loanCalculator.cards.platinum"),
      icon: "calculator/card-platinum-rose",
      disabled: !1
    }, {
      id: "iron",
      name: u("loanCalculator.cards.iron"),
      icon: "calculator/card-iron",
      disabled: !1
    }])
      , j = $( () => (ze[m.value],
    0))
      , k = $( () => ze[m.value].maxLoanAmount)
      , U = Q(100)
      , e = $( () => {
      const S = ze[m.value]
        , V = S.minMonthTerm || 3
        , M = S.maxMonthTerm || 36
        , v = [];
      for (let y = V; y <= M; y++)
        v.push(y);
      return v
    }
    )
      , F = $( () => e.value[0] || 3)
      , D = $( () => e.value[e.value.length - 1] || 36)
      , I = (S, V) => S.reduce( (M, v) => Math.abs(M) > Math.abs(v - V) ? v - V : M, 1 / 0) + V
      , z = $( () => e.value[o.value] || e.value[0]);
    K(e, (S, V) => {
      if (V && V.length > 0) {
        const M = I(S, V[o.value] || 0) || 0;
        o.value = S.indexOf(M) || 0
      }
    }
    , {
      immediate: !0,
      deep: !0
    }),
    K(m, () => {
      _.value < j.value ? _.value = j.value : _.value > k.value && (_.value = k.value),
      N()
    }
    ),
    K(o, () => {
      N()
    }
    ),
    K(_, () => {
      N()
    }
    );
    const E = Q(0)
      , le = Q(0)
      , w = Q(0)
      , x = Q(0)
      , T = Q()
      , B = Q()
      , R = S => new Intl.NumberFormat("uk-UA",{
      maximumFractionDigits: 0
    }).format(S) + " ₴"
      , X = S => `${S} ${u("loanCalculator.monthShort")}`
      , N = () => {
      try {
        let S = new Date;
        S.setHours(0, 0, 0, 0);
        const V = Pt({
          cardType: m.value,
          netAmount: _.value,
          termMonths: z.value,
          issueDate: S
        });
        x.value = Math.round((V.realAnnualRate || 0) * 1e4) / 100,
        le.value = V.minPayment || 0,
        E.value = (V.totalCreditCost || 0) - _.value,
        w.value = V.totalCreditCost || 0;
        const M = new Date(+V.gracePeriodEndDate);
        T.value = M.toLocaleDateString("uk-UA"),
        B.value = V.gracePeriodEndDate.toLocaleDateString("uk-UA")
      } catch {
        x.value = 0,
        le.value = 0,
        E.value = 0,
        w.value = 0,
        T.value = "",
        B.value = ""
      }
    }
    ;
    return Fe( () => {
      N()
    }
    ),
    (S, V) => (H(),
    Ce(p(Ae), null, {
      default: Y( () => [t("div", Zt, [V[5] || (V[5] = t("div", {
        class: "loan-calculator-background"
      }, null, -1)), t("div", It, [t("div", Ot, [t("div", jt, [q(lt, {
        modelValue: m.value,
        "onUpdate:modelValue": V[0] || (V[0] = M => m.value = M),
        cards: Z.value,
        title: p(u)("loanCalculator.selectCard")
      }, null, 8, ["modelValue", "cards", "title"])]), t("div", Rt, [q(Me, {
        modelValue: _.value,
        "onUpdate:modelValue": V[1] || (V[1] = M => _.value = M),
        min: j.value,
        max: k.value,
        step: U.value,
        fromLabel: j.value,
        toLabel: k.value,
        valueLabel: _.value,
        label: p(u)("loanCalculator.amount")
      }, null, 8, ["modelValue", "min", "max", "step", "fromLabel", "toLabel", "valueLabel", "label"])]), t("div", Ut, [q(Me, {
        modelValue: o.value,
        "onUpdate:modelValue": V[2] || (V[2] = M => o.value = M),
        min: 0,
        max: e.value.length - 1,
        fromLabel: F.value,
        toLabel: D.value,
        valueLabel: z.value,
        step: 1,
        label: p(u)("loanCalculator.term"),
        "format-value": X
      }, null, 8, ["modelValue", "max", "fromLabel", "toLabel", "valueLabel", "label"])])]), t("div", zt, [V[4] || (V[4] = t("div", {
        class: "loan-calculator-results-bg"
      }, null, -1)), t("div", Et, [t("div", Nt, [t("div", Bt, [ie(d(p(u)("loanCalculator.totalCost")) + " ", 1), ["platinum", "iron"].includes(m.value) ? (H(),
      ae("div", Ht, [t("small", null, d(p(u)("loanCalculator.withCardFees")), 1)])) : me("", !0)]), t("div", Wt, d(R(E.value)), 1)]), V[3] || (V[3] = t("div", {
        class: "loan-calculator-divider"
      }, null, -1)), t("div", Yt, [t("div", qt, [t("div", Gt, d(p(u)("loanCalculator.minPayment")), 1), t("div", Jt, d(R(le.value)), 1)]), t("div", Qt, [t("div", Kt, d(p(u)("loanCalculator.firstPaymentDate")), 1), t("div", Xt, d(p(u)("loanCalculator.firstPaymentDateValue", {
        value: T.value
      })), 1)]), t("div", ea, [t("div", ta, d(p(u)("loanCalculator.totalCreditCost")), 1), t("div", aa, d(R(w.value)), 1)]), t("div", la, [t("div", ra, d(p(u)("loanCalculator.annualRate")), 1), t("div", na, d(p(u)("loanCalculator.annualRateValue", {
        value: x.value
      })), 1)]), t("div", oa, [t("div", ia, d(p(u)("loanCalculator.gracePeriod")), 1), t("div", ca, d(p(u)("loanCalculator.gracePeriodValue", {
        value: B.value
      })), 1)])])])])])])]),
      _: 1
    }))
  }
})
  , ua = Se(sa, [["__scopeId", "data-v-fa4403d6"]])
  , ma = {
  3: {
    2500: {
      effective_rate: 44.29,
      pereplata: 236.16,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.29,
      pereplata: 472.32,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.29,
      pereplata: 944.65,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.29,
      pereplata: 1889.29,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.29,
      pereplata: 4723.24,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.29,
      pereplata: 7557.18,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.29,
      pereplata: 9446.47,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.29,
      pereplata: 14169.71,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.29,
      pereplata: 18892.94,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.29,
      pereplata: 28339.42,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.29,
      pereplata: 37785.89,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.29,
      pereplata: 47232.36,
      min_pay: 2e4
    }
  },
  6: {
    2500: {
      effective_rate: 44.27,
      pereplata: 471.68,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.27,
      pereplata: 943.37,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.27,
      pereplata: 1886.73,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.27,
      pereplata: 3773.46,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.27,
      pereplata: 9433.66,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.27,
      pereplata: 15093.86,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.27,
      pereplata: 18867.32,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.27,
      pereplata: 28300.98,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.27,
      pereplata: 37734.64,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.27,
      pereplata: 56601.96,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.27,
      pereplata: 75469.28,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.27,
      pereplata: 94336.6,
      min_pay: 2e4
    }
  },
  9: {
    2500: {
      effective_rate: 44.26,
      pereplata: 700.98,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.26,
      pereplata: 1401.96,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.26,
      pereplata: 2803.91,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.26,
      pereplata: 5607.83,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.26,
      pereplata: 14019.57,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.26,
      pereplata: 22431.3,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.26,
      pereplata: 28039.13,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.26,
      pereplata: 42058.7,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.26,
      pereplata: 56078.26,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.26,
      pereplata: 84117.39,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.26,
      pereplata: 112156.52,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.26,
      pereplata: 140195.65,
      min_pay: 2e4
    }
  },
  12: {
    2500: {
      effective_rate: 44.26,
      pereplata: 916.7,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.26,
      pereplata: 1833.4,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.26,
      pereplata: 3666.8,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.26,
      pereplata: 7333.6,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.26,
      pereplata: 18334.01,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.26,
      pereplata: 29334.41,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.26,
      pereplata: 36668.02,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.26,
      pereplata: 55002.03,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.26,
      pereplata: 73336.04,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.26,
      pereplata: 110004.05,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.26,
      pereplata: 146672.07,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.26,
      pereplata: 183340.09,
      min_pay: 2e4
    }
  },
  18: {
    2500: {
      effective_rate: 44.26,
      pereplata: 1344.95,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.26,
      pereplata: 2689.91,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.26,
      pereplata: 5379.82,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.26,
      pereplata: 10759.64,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.26,
      pereplata: 26899.09,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.26,
      pereplata: 43038.54,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.26,
      pereplata: 53798.18,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.26,
      pereplata: 80697.27,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.26,
      pereplata: 107596.35,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.26,
      pereplata: 161394.53,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.26,
      pereplata: 215192.71,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.26,
      pereplata: 268990.89,
      min_pay: 2e4
    }
  },
  24: {
    2500: {
      effective_rate: 44.25,
      pereplata: 1744.22,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.25,
      pereplata: 3488.43,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.25,
      pereplata: 6976.87,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.25,
      pereplata: 13953.74,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.25,
      pereplata: 34884.34,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.25,
      pereplata: 55814.95,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.25,
      pereplata: 69768.68,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.25,
      pereplata: 104653.03,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.25,
      pereplata: 139537.37,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.25,
      pereplata: 209306.05,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.25,
      pereplata: 279074.73,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.25,
      pereplata: 348843.42,
      min_pay: 2e4
    }
  },
  36: {
    2500: {
      effective_rate: 44.25,
      pereplata: 2486.65,
      min_pay: 100
    },
    5e3: {
      effective_rate: 44.25,
      pereplata: 4973.3,
      min_pay: 200
    },
    1e4: {
      effective_rate: 44.25,
      pereplata: 9946.61,
      min_pay: 400
    },
    2e4: {
      effective_rate: 44.25,
      pereplata: 19893.22,
      min_pay: 800
    },
    5e4: {
      effective_rate: 44.25,
      pereplata: 49733.04,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 44.25,
      pereplata: 79572.86,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 44.25,
      pereplata: 99466.08,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.25,
      pereplata: 149199.12,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 44.25,
      pereplata: 198932.16,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.25,
      pereplata: 298398.23,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.25,
      pereplata: 397864.31,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.25,
      pereplata: 497330.39,
      min_pay: 2e4
    }
  }
}
  , pa = {
  3: {
    1e4: {
      effective_rate: 108.93,
      pereplata: 1889.91,
      min_pay: 400
    },
    2e4: {
      effective_rate: 71.59,
      pereplata: 2772.42,
      min_pay: 800
    },
    5e4: {
      effective_rate: 52.51,
      pereplata: 5419.97,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 48.09,
      pereplata: 8067.52,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 46.64,
      pereplata: 9832.56,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.74,
      pereplata: 14245.14,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.79,
      pereplata: 18657.72,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.86,
      pereplata: 27482.89,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.39,
      pereplata: 36308.06,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 42.11,
      pereplata: 45133.23,
      min_pay: 2e4
    }
  },
  6: {
    1e4: {
      effective_rate: 96.67,
      pereplata: 3579.18,
      min_pay: 400
    },
    2e4: {
      effective_rate: 66.92,
      pereplata: 5335.97,
      min_pay: 800
    },
    5e4: {
      effective_rate: 50.92,
      pereplata: 10606.34,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 47.12,
      pereplata: 15876.71,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 45.87,
      pereplata: 19390.29,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.22,
      pereplata: 28174.23,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.4,
      pereplata: 36958.18,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.58,
      pereplata: 54526.07,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.18,
      pereplata: 72093.96,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 41.93,
      pereplata: 89661.85,
      min_pay: 2e4
    }
  },
  9: {
    1e4: {
      effective_rate: 92.29,
      pereplata: 5303.37,
      min_pay: 400
    },
    2e4: {
      effective_rate: 65.4,
      pereplata: 7906.13,
      min_pay: 800
    },
    5e4: {
      effective_rate: 50.45,
      pereplata: 15714.43,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 46.84,
      pereplata: 23522.73,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 45.65,
      pereplata: 28728.26,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.07,
      pereplata: 41742.09,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.29,
      pereplata: 54755.92,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.51,
      pereplata: 80783.58,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.12,
      pereplata: 106811.24,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 41.88,
      pereplata: 132838.9,
      min_pay: 2e4
    }
  },
  12: {
    1e4: {
      effective_rate: 90.25,
      pereplata: 7027.51,
      min_pay: 400
    },
    2e4: {
      effective_rate: 64.83,
      pereplata: 10421.38,
      min_pay: 800
    },
    5e4: {
      effective_rate: 50.32,
      pereplata: 20602.99,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 46.78,
      pereplata: 30784.6,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 45.61,
      pereplata: 37572.34,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.05,
      pereplata: 54541.69,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.27,
      pereplata: 71511.05,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.49,
      pereplata: 105449.75,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.11,
      pereplata: 139388.45,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 41.87,
      pereplata: 173327.15,
      min_pay: 2e4
    }
  },
  18: {
    1e4: {
      effective_rate: 87.21,
      pereplata: 10636.29,
      min_pay: 400
    },
    2e4: {
      effective_rate: 64.01,
      pereplata: 15586.61,
      min_pay: 800
    },
    5e4: {
      effective_rate: 50.17,
      pereplata: 30437.58,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 46.71,
      pereplata: 45288.56,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 45.56,
      pereplata: 55189.2,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.02,
      pereplata: 79940.82,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.25,
      pereplata: 104692.44,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.48,
      pereplata: 154195.68,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.09,
      pereplata: 203698.91,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 41.86,
      pereplata: 253202.15,
      min_pay: 2e4
    }
  },
  24: {
    1e4: {
      effective_rate: 85.49,
      pereplata: 14330.04,
      min_pay: 400
    },
    2e4: {
      effective_rate: 63.66,
      pereplata: 20713.95,
      min_pay: 800
    },
    5e4: {
      effective_rate: 50.18,
      pereplata: 39865.68,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 46.74,
      pereplata: 59017.41,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 45.59,
      pereplata: 71785.23,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.04,
      pereplata: 103704.78,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.27,
      pereplata: 135624.33,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.49,
      pereplata: 199463.43,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.11,
      pereplata: 263302.52,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 41.87,
      pereplata: 327141.62,
      min_pay: 2e4
    }
  },
  36: {
    1e4: {
      effective_rate: 83.28,
      pereplata: 22080.84,
      min_pay: 400
    },
    2e4: {
      effective_rate: 63.25,
      pereplata: 31083.12,
      min_pay: 800
    },
    5e4: {
      effective_rate: 50.25,
      pereplata: 58089.95,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 46.83,
      pereplata: 85096.78,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 45.67,
      pereplata: 103101.33,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 44.11,
      pereplata: 148112.71,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 43.32,
      pereplata: 193124.09,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 42.53,
      pereplata: 283146.85,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 42.14,
      pereplata: 373169.62,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 41.9,
      pereplata: 463192.38,
      min_pay: 2e4
    }
  }
}
  , fa = {
  3: {
    1e4: {
      effective_rate: 420.34,
      pereplata: 3882.52,
      min_pay: 400
    },
    2e4: {
      effective_rate: 165.46,
      pereplata: 4750.26,
      min_pay: 800
    },
    5e4: {
      effective_rate: 81.16,
      pereplata: 7353.49,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 65.01,
      pereplata: 9956.72,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 59.98,
      pereplata: 11692.2,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 53.53,
      pereplata: 16030.91,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 50.42,
      pereplata: 20369.62,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 47.37,
      pereplata: 29047.05,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 45.87,
      pereplata: 37724.47,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 44.98,
      pereplata: 46401.89,
      min_pay: 2e4
    }
  },
  6: {
    1e4: {
      effective_rate: 257.61,
      pereplata: 6352.56,
      min_pay: 400
    },
    2e4: {
      effective_rate: 124.3,
      pereplata: 8060.33,
      min_pay: 800
    },
    5e4: {
      effective_rate: 69.98,
      pereplata: 13183.64,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 58.58,
      pereplata: 18306.95,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 54.95,
      pereplata: 21722.48,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 50.23,
      pereplata: 30261.33,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 47.92,
      pereplata: 38800.18,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 45.65,
      pereplata: 55877.88,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.53,
      pereplata: 72955.57,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 43.86,
      pereplata: 90033.27,
      min_pay: 2e4
    }
  },
  9: {
    1e4: {
      effective_rate: 211.82,
      pereplata: 8921.81,
      min_pay: 400
    },
    2e4: {
      effective_rate: 111.56,
      pereplata: 11442.42,
      min_pay: 800
    },
    5e4: {
      effective_rate: 66.47,
      pereplata: 19004.25,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 56.56,
      pereplata: 26566.08,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 53.37,
      pereplata: 31607.3,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 49.2,
      pereplata: 44210.35,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 47.15,
      pereplata: 56813.4,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 45.12,
      pereplata: 82019.5,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 44.11,
      pereplata: 107225.6,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 43.51,
      pereplata: 132431.69,
      min_pay: 2e4
    }
  },
  12: {
    1e4: {
      effective_rate: 190.63,
      pereplata: 11548,
      min_pay: 400
    },
    2e4: {
      effective_rate: 105.67,
      pereplata: 14828.73,
      min_pay: 800
    },
    5e4: {
      effective_rate: 64.95,
      pereplata: 24670.91,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 55.72,
      pereplata: 34513.09,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 52.72,
      pereplata: 41074.55,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 48.78,
      pereplata: 57478.18,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 46.83,
      pereplata: 73881.82,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.9,
      pereplata: 106689.08,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 43.94,
      pereplata: 139496.35,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 43.37,
      pereplata: 172303.62,
      min_pay: 2e4
    }
  },
  18: {
    1e4: {
      effective_rate: 166.53,
      pereplata: 17148.15,
      min_pay: 400
    },
    2e4: {
      effective_rate: 98.74,
      pereplata: 21924.36,
      min_pay: 800
    },
    5e4: {
      effective_rate: 63.25,
      pereplata: 36253,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 54.81,
      pereplata: 50581.65,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 52.03,
      pereplata: 60134.08,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 48.34,
      pereplata: 84015.15,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 46.51,
      pereplata: 107896.22,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.68,
      pereplata: 155658.37,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 43.77,
      pereplata: 203420.51,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 43.22,
      pereplata: 251182.65,
      min_pay: 2e4
    }
  },
  24: {
    1e4: {
      effective_rate: 154.26,
      pereplata: 23045.92,
      min_pay: 400
    },
    2e4: {
      effective_rate: 95.19,
      pereplata: 29199.56,
      min_pay: 800
    },
    5e4: {
      effective_rate: 62.52,
      pereplata: 47660.51,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 54.47,
      pereplata: 66121.45,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 51.78,
      pereplata: 78428.74,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 48.2,
      pereplata: 109196.98,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 46.41,
      pereplata: 139965.22,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.62,
      pereplata: 201501.69,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 43.72,
      pereplata: 263038.16,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 43.18,
      pereplata: 324574.64,
      min_pay: 2e4
    }
  },
  36: {
    1e4: {
      effective_rate: 141.35,
      pereplata: 35826.59,
      min_pay: 400
    },
    2e4: {
      effective_rate: 91.23,
      pereplata: 44496.04,
      min_pay: 800
    },
    5e4: {
      effective_rate: 61.8,
      pereplata: 70504.4,
      min_pay: 2e3
    },
    8e4: {
      effective_rate: 54.2,
      pereplata: 96512.76,
      min_pay: 3200
    },
    1e5: {
      effective_rate: 51.62,
      pereplata: 113851.66,
      min_pay: 4e3
    },
    15e4: {
      effective_rate: 48.14,
      pereplata: 157198.93,
      min_pay: 6e3
    },
    2e5: {
      effective_rate: 46.38,
      pereplata: 200546.2,
      min_pay: 8e3
    },
    3e5: {
      effective_rate: 44.6,
      pereplata: 287240.73,
      min_pay: 12e3
    },
    4e5: {
      effective_rate: 43.71,
      pereplata: 373935.26,
      min_pay: 16e3
    },
    5e5: {
      effective_rate: 43.17,
      pereplata: 460629.8,
      min_pay: 2e4
    }
  }
}
  , da = {
  class: "loan-calculator"
}
  , va = {
  class: "loan-calculator-content"
}
  , _a = {
  class: "loan-calculator-form"
}
  , ha = {
  class: "loan-calculator-field"
}
  , ya = {
  class: "loan-calculator-field"
}
  , ga = {
  class: "loan-calculator-field"
}
  , ba = {
  class: "loan-calculator-results"
}
  , Ca = {
  class: "loan-calculator-results-content"
}
  , $a = {
  class: "loan-calculator-main-result"
}
  , wa = {
  class: "loan-calculator-result-title"
}
  , xa = {
  class: "loan-calculator-result-amount"
}
  , Da = {
  class: "loan-calculator-details"
}
  , Ma = {
  class: "loan-calculator-detail-item"
}
  , ka = {
  class: "loan-calculator-detail-label"
}
  , Ta = {
  class: "loan-calculator-detail-value"
}
  , Aa = {
  class: "loan-calculator-detail-item"
}
  , Fa = {
  class: "loan-calculator-detail-label"
}
  , Sa = {
  class: "loan-calculator-detail-value"
}
  , Va = {
  class: "loan-calculator-detail-item"
}
  , Pa = {
  class: "loan-calculator-detail-label"
}
  , La = {
  class: "loan-calculator-detail-value"
}
  , Za = {
  class: "loan-calculator-detail-item"
}
  , Ia = {
  class: "loan-calculator-detail-label"
}
  , Oa = {
  class: "loan-calculator-detail-value"
}
  , ja = {
  class: "loan-calculator-detail-item"
}
  , Ra = {
  class: "loan-calculator-detail-label"
}
  , Ua = {
  class: "loan-calculator-detail-value"
}
  , za = xe({
  name: "LoanCalculator",
  __name: "LoanCalculator_old",
  props: {
    card: {
      default: "black"
    }
  },
  setup(s) {
    const n = s
      , u = {
      black: ma,
      platinum: pa,
      iron: fa
    }
      , {t: m} = Te()
      , _ = Q(0)
      , o = Q(0)
      , Z = Q(n.card)
      , j = Q([{
      id: "black",
      name: m("loanCalculator.cards.black"),
      icon: "calculator/card-black",
      disabled: !1
    }, {
      id: "platinum",
      name: m("loanCalculator.cards.platinum"),
      icon: "calculator/card-platinum-rose",
      disabled: !1
    }, {
      id: "iron",
      name: m("loanCalculator.cards.iron"),
      icon: "calculator/card-iron",
      disabled: !1
    }])
      , k = $( () => {
      const v = u[Z.value];
      return Object.keys(v || {}).map(y => parseInt(y, 10))
    }
    )
      , U = $( () => k.value[0] || 3)
      , e = $( () => k.value[k.value.length - 1] || 36)
      , F = (v, y) => v.reduce( (C, r) => Math.abs(C) > Math.abs(r - y) ? r - y : C, 1 / 0) + y
      , D = $( () => k.value[o.value] || k.value[0]);
    K(k, (v, y) => {
      const C = F(v, (y == null ? void 0 : y[o.value]) || 0) || 0;
      o.value = v.indexOf(C) || 0
    }
    , {
      immediate: !0,
      deep: !0
    });
    const I = $( () => {
      const v = u[Z.value]
        , y = v == null ? void 0 : v[D.value];
      return Object.keys(y || {}).map(C => parseInt(C, 10))
    }
    );
    K(I, (v, y) => {
      const C = F(v, (y == null ? void 0 : y[_.value]) || 0) || 0;
      _.value = v.indexOf(C) || 0
    }
    , {
      immediate: !0,
      deep: !0
    }),
    K(Z, v => {
      M()
    }
    ),
    K(o, v => {
      M()
    }
    ),
    K(_, v => {
      M()
    }
    );
    const z = $( () => I.value[0] || 0)
      , E = $( () => I.value[I.value.length - 1] || 0)
      , le = $( () => I.value[_.value] || 0)
      , w = $( () => {
      var v, y;
      return ((y = (v = u == null ? void 0 : u[Z.value]) == null ? void 0 : v[D.value]) == null ? void 0 : y[le.value]) || {}
    }
    )
      , x = Q(0)
      , T = Q(0)
      , B = Q(0)
      , R = Q(0)
      , X = Q()
      , N = Q()
      , S = v => new Intl.NumberFormat("uk-UA",{
      maximumFractionDigits: 0
    }).format(v) + " ₴"
      , V = v => `${v} ${m("loanCalculator.monthShort")}`
      , M = () => {
      R.value = w.value.effective_rate || 0,
      T.value = w.value.min_pay,
      x.value = w.value.pereplata || 0,
      B.value = le.value + x.value;
      const v = new Date;
      v.setMonth(v.getMonth() + 2),
      v.setDate(0),
      X.value = v.toLocaleDateString("uk-UA");
      const y = new Date;
      if (Z.value === "iron") {
        const C = y.getDate();
        y.setDate(1);
        const r = y.getMonth() + 1;
        y.setMonth(r),
        y.setDate(C),
        y.getMonth() != r && (y.setDate(1),
        y.setMonth(r + 1),
        y.setDate(0))
      } else
        y.setMonth(y.getMonth() + 2),
        y.setDate(0);
      N.value = y.toLocaleDateString("uk-UA")
    }
    ;
    return Fe( () => {
      M()
    }
    ),
    (v, y) => (H(),
    Ce(p(Ae), null, {
      default: Y( () => [t("div", da, [y[5] || (y[5] = t("div", {
        class: "loan-calculator-background"
      }, null, -1)), t("div", va, [t("div", _a, [t("div", ha, [q(lt, {
        modelValue: Z.value,
        "onUpdate:modelValue": y[0] || (y[0] = C => Z.value = C),
        cards: j.value,
        title: p(m)("loanCalculator.selectCard")
      }, null, 8, ["modelValue", "cards", "title"])]), t("div", ya, [q(Me, {
        modelValue: _.value,
        "onUpdate:modelValue": y[1] || (y[1] = C => _.value = C),
        min: 0,
        max: I.value.length - 1,
        step: 1,
        fromLabel: z.value,
        toLabel: E.value,
        valueLabel: le.value,
        label: p(m)("loanCalculator.amount")
      }, null, 8, ["modelValue", "max", "fromLabel", "toLabel", "valueLabel", "label"])]), t("div", ga, [q(Me, {
        modelValue: o.value,
        "onUpdate:modelValue": y[2] || (y[2] = C => o.value = C),
        min: 0,
        max: k.value.length - 1,
        fromLabel: U.value,
        toLabel: e.value,
        valueLabel: D.value,
        step: 1,
        label: p(m)("loanCalculator.term"),
        "format-value": V
      }, null, 8, ["modelValue", "max", "fromLabel", "toLabel", "valueLabel", "label"])])]), t("div", ba, [y[4] || (y[4] = t("div", {
        class: "loan-calculator-results-bg"
      }, null, -1)), t("div", Ca, [t("div", $a, [t("div", wa, d(p(m)("loanCalculator.totalCost")), 1), t("div", xa, d(S(x.value)), 1)]), y[3] || (y[3] = t("div", {
        class: "loan-calculator-divider"
      }, null, -1)), t("div", Da, [t("div", Ma, [t("div", ka, d(p(m)("loanCalculator.minPayment")), 1), t("div", Ta, d(S(T.value)), 1)]), t("div", Aa, [t("div", Fa, d(p(m)("loanCalculator.firstPaymentDate")), 1), t("div", Sa, d(p(m)("loanCalculator.firstPaymentDateValue", {
        value: X.value
      })), 1)]), t("div", Va, [t("div", Pa, d(p(m)("loanCalculator.totalCreditCost")), 1), t("div", La, d(S(B.value)), 1)]), t("div", Za, [t("div", Ia, d(p(m)("loanCalculator.annualRate")), 1), t("div", Oa, d(p(m)("loanCalculator.annualRateValue", {
        value: R.value
      })), 1)]), t("div", ja, [t("div", Ra, d(p(m)("loanCalculator.gracePeriod")), 1), t("div", Ua, d(p(m)("loanCalculator.gracePeriodValue", {
        value: N.value
      })), 1)])])])])])])]),
      _: 1
    }))
  }
})
  , Ea = Se(za, [["__scopeId", "data-v-ff61f565"]])
  , fr = xe({
  __name: "LoanCalculator",
  setup(s) {
    const n = Ie("appContext")
      , u = $( () => {
      var m, _, o;
      return ((o = (_ = (m = n.config) == null ? void 0 : m.front) == null ? void 0 : _.feature) == null ? void 0 : o.loanCalculatorNew) ?? !1
    }
    );
    return (m, _) => u.value ? (H(),
    Ce(ua, Qe(ke({
      key: 0
    }, m.$props)), null, 16)) : (H(),
    Ce(Ea, Qe(ke({
      key: 1
    }, m.$props)), null, 16))
  }
});
function Na(s) {
  const n = {};
  if (s.depPrograms)
    for (const m of Object.keys(s.depPrograms)) {
      const _ = s.depPrograms[m];
      if (_) {
        n[m] = {
          withoutEarlyTerm: {},
          earlyTerm: {}
        };
        for (const o of Object.keys(_)) {
          const Z = _[o];
          if (Z)
            for (const j of ["withoutEarlyTerm", "earlyTerm"]) {
              const k = [];
              for (const U of Object.keys(Z)) {
                const e = Z[U];
                if (!e)
                  continue;
                const F = e[j];
                if (F) {
                  let D = k[k.length - 1];
                  !D || F.normalFee !== D.normalFee ? (D = {
                    normalFee: F.normalFee,
                    minTerm: parseInt(U, 10),
                    maxTerm: parseInt(U, 10)
                  },
                  k.push(D)) : D.maxTerm = parseInt(U, 10)
                }
              }
              n[m][j][o] = k
            }
        }
      }
    }
  const u = Math.max(s.maxFeeUah, s.maxFeeOther);
  return {
    depPrograms: s.depPrograms,
    tableInfo: n,
    depOpenedCount: s.depOpenedCount,
    maxFee: u,
    maxFeeUah: s.maxFeeUah,
    maxFeeOther: s.maxFeeOther,
    depTaxesPecrent: s.depTaxesPecrent
  }
}
function Ba(s) {
  return Ze({
    key: ["info/deposit"],
    query: async () => {
      {
        const n = await fetch("/api-front/info/deposit");
        if (!n.ok)
          throw new Error("Failed to fetch info/deposit");
        const u = await n.json();
        return Na(u.result)
      }
    }
    ,
    staleTime: 3e4
  })
}
function dr(s) {
  return Ze({
    key: ["info/deposit/dashboard"],
    query: async () => {
      {
        const n = await fetch("/api-front/info/deposit/dashboard");
        if (!n.ok)
          throw new Error("Failed to fetch info/deposit/dashboard");
        return (await n.json()).result
      }
    }
    ,
    staleTime: 3e4
  })
}
const Ha = {
  class: "line line-calculator layout-grid full-width"
}
  , Wa = {
  class: "line-calculator--wrapper"
}
  , Ya = {
  class: "text-wrapper"
}
  , qa = ["innerHTML"]
  , Ga = ["data-type"]
  , Ja = {
  class: "loan-calculator-content"
}
  , Qa = {
  class: "loan-calculator-form"
}
  , Ka = {
  class: "loan-calculator-row"
}
  , Xa = {
  class: "calculator-amount-label",
  for: "calculatorAmount"
}
  , el = {
  class: "loan-calculator-row loan-calculator-field-row calculator-amount-row"
}
  , tl = {
  key: 0,
  class: "error-message"
}
  , al = {
  key: 1,
  class: "error-message"
}
  , ll = {
  key: 0
}
  , rl = ["value"]
  , nl = {
  class: "loan-calculator-row"
}
  , ol = {
  class: "loan-calculator-field"
}
  , il = {
  class: "loan-calculator-row",
  style: {
    "margin-top": "0"
  }
}
  , cl = {
  class: "loan-calculator-row"
}
  , sl = {
  key: 1,
  class: "loan-calculator-row",
  style: {
    "margin-top": "4px"
  }
}
  , ul = {
  key: 2,
  class: "loan-calculator-row",
  style: {
    "margin-top": "4px"
  }
}
  , ml = {
  class: "loan-calculator-results"
}
  , pl = {
  class: "loan-calculator-results-content"
}
  , fl = {
  class: "loan-calculator-main-result"
}
  , dl = {
  class: "loan-calculator-result-title"
}
  , vl = {
  class: "loan-calculator-result-checkbox"
}
  , _l = {
  class: "loan-calculator-details"
}
  , hl = {
  class: "loan-calculator-detail-item"
}
  , yl = {
  class: "loan-calculator-detail-label"
}
  , gl = {
  class: "loan-calculator-detail-value"
}
  , bl = {
  class: "loan-calculator-detail-item"
}
  , Cl = {
  class: "loan-calculator-detail-label"
}
  , $l = {
  class: "loan-calculator-detail-value"
}
  , wl = {
  class: "loan-calculator-detail-item"
}
  , xl = {
  class: "loan-calculator-detail-label"
}
  , Dl = {
  class: "loan-calculator-detail-value"
}
  , Ml = {
  class: "loan-calculator-detail-item"
}
  , kl = {
  class: "loan-calculator-detail-label"
}
  , Tl = {
  class: "loan-calculator-detail-value"
}
  , Al = {
  class: "cta-links"
}
  , at = 23
  , Fl = xe({
  __name: "LineCalculator",
  async setup(s) {
    let n, u;
    Ie("appContext");
    const {refresh: m, data: _} = Ba()
      , {t: o} = Te()
      , Z = Ne()
      , j = $( () => Z.locale)
      , k = we("$amount")
      , U = we("$refillAmount")
      , e = We({
      amount: 1e3,
      currency: "UAH",
      termValue: 0,
      refill: !1,
      refillAmount: 0,
      capitalize: !1,
      earlyTerm: !1,
      withTaxes: !0
    });
    [n,u] = Ye( () => m()),
    await n,
    u();
    const F = Q([{
      value: "standart",
      label: o("deposit.lineCalculator.productTypes.standart"),
      activeBackground: "var(--deposit-product-type-standart-active-bg, #000)"
    }, {
      value: "jar",
      label: o("deposit.lineCalculator.productTypes.jar"),
      activeBackground: "var(--deposit-product-type-jar-active-bg, #000)"
    }])
      , D = Q("standart")
      , I = $( () => {
      var f, b, A, L, J;
      return D.value === "jar" ? !1 : Object.keys(((J = (L = (A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) == null ? void 0 : L[T.value]) == null ? void 0 : J.earlyTerm) || {}).length > 0
    }
    )
      , z = $( () => B.value.length === 1 && B.value.includes("earlyTerm") ? !0 : e.earlyTerm && I.value)
      , E = $( () => z.value ? "earlyTerm" : "withoutEarlyTerm")
      , le = $( () => parseFloat(String(e.amount || "0")))
      , w = f => l.value[f] || 0
      , x = $( () => w(e.termValue))
      , T = $( () => D.value === "jar" ? 0 : x.value)
      , B = $( () => {
      var f, b, A, L;
      return Object.keys(((L = (A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) == null ? void 0 : L[T.value]) || {}) || []
    }
    )
      , R = $( () => {
      var f, b, A, L, J, O;
      return D.value === "jar" ? !1 : !!((O = (J = (L = (A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) == null ? void 0 : L[T.value]) == null ? void 0 : J[E.value]) != null && O.capitalize)
    }
    )
      , X = $( () => e.capitalize && R.value)
      , N = $( () => {
      var f, b, A, L, J, O;
      return ((O = (J = (L = (A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) == null ? void 0 : L[T.value]) == null ? void 0 : J[E.value]) == null ? void 0 : O.minAmount) || 0
    }
    )
      , S = $( () => {
      var f, b, A, L, J, O;
      return ((O = (J = (L = (A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) == null ? void 0 : L[T.value]) == null ? void 0 : J[E.value]) == null ? void 0 : O.maxAmount) || 0
    }
    )
      , V = $( () => {
      var f, b, A, L, J, O;
      return ((O = (J = (L = (A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) == null ? void 0 : L[T.value]) == null ? void 0 : J[E.value]) == null ? void 0 : O.normalFee) || 0
    }
    )
      , M = $( () => {
      var f, b;
      return Object.keys(((b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) || {}).map(A => ({
        key: A,
        label: o(`common.currencyFull.${A.toLowerCase()}`)
      }))
    }
    );
    function v() {
      const f = parseFloat(String(e.amount || "0"));
      N.value != null && f < N.value && (e.amount = N.value),
      S.value != null && f > S.value && (e.amount = S.value),
      (isNaN(f) || f <= 0) && (e.amount = N.value || 0)
    }
    function y() {
      const f = parseFloat(String(e.refillAmount || "0"));
      (f < 0 || isNaN(f)) && (e.refillAmount = 0),
      f > 1e7 && (e.refillAmount = 1e7),
      f > e.amount && (e.refillAmount = e.amount)
    }
    const C = Q([])
      , r = () => [{
      question: o("deposit.lineCalculator.warning.title"),
      answer: o("deposit.lineCalculator.warning.content"),
      isActive: !1
    }]
      , c = $( () => [{
      title: o("deposit.lineCalculator.blocks.1.title"),
      subtitle: o("deposit.lineCalculator.blocks.1.subtitle"),
      link: "/pdf/ankety+%26+zayavy/all_zayavy_deposit.pdf",
      backgroundColor: "#3D74EF",
      icon: "common/cta-pdf"
    }, {
      title: o("deposit.lineCalculator.blocks.2.title"),
      subtitle: o("deposit.lineCalculator.blocks.2.subtitle"),
      link: "/pdf/characteristics-deposits.pdf",
      backgroundColor: "#3D74EF",
      icon: "common/cta-pdf"
    }])
      , a = f => {
      f.isActive = !f.isActive
    }
      , l = $( () => {
      var f, b, A;
      return D.value === "jar" ? Array.from({
        length: 12
      }, (L, J) => J + 1) : Object.keys(((A = (b = (f = _.value) == null ? void 0 : f.depPrograms) == null ? void 0 : b[D.value]) == null ? void 0 : A[e.currency]) || {}).map(L => parseInt(L))
    }
    )
      , i = $( () => Math.min(...l.value))
      , h = $( () => Math.max(...l.value))
      , g = $( () => `${i.value} ${o("deposit.line5.monthShort")}`)
      , P = $( () => `${h.value} ${o("deposit.line5.monthShort")}`)
      , W = $( () => o("common.monthPlural", +x.value))
      , ee = $( () => o("deposit.lineCalculator.calculator.termCaption", {
      rate: V.value,
      term: W.value
    }));
    K( () => D.value, (f, b) => {
      var L, J;
      e.termValue = l.value.length - 1;
      const A = Object.keys(((J = (L = _.value) == null ? void 0 : L.depPrograms) == null ? void 0 : J[f]) || {});
      if (A.includes(e.currency) || A.length > 0 && (e.currency = A[0]),
      b === "jar" && f !== "jar") {
        const O = e.currency === "UAH" ? 1e3 : 100;
        (e.amount === 0 || e.amount == null) && (e.amount = O)
      }
    }
    , {
      immediate: !0
    }),
    K( () => l.value, () => {
      (x.value > h.value || e.termValue >= l.value.length) && (e.termValue = l.value.length - 1),
      (x.value < i.value || e.termValue < 0) && (e.termValue = 0)
    }
    , {
      immediate: !0,
      deep: !0
    }),
    K(j, () => {
      C.value = r()
    }
    , {
      immediate: !0
    }),
    K([N, S, () => e.currency], ([f,b]) => {
      if (!(f == null || b == null)) {
        if (D.value === "jar" && e.amount === 0) {
          e.amount = e.currency === "UAH" ? 1e3 : 100;
          return
        }
        e.amount > 0 ? e.amount < f ? e.amount = f : e.amount > b && (e.amount = b) : f > 0 && (e.amount = f)
      }
    }
    ),
    K(x, f => {
      D.value !== "jar" && f < 4 && (e.refill = !1)
    }
    );
    const te = $( () => D.value === "jar" ? !0 : x.value >= 4)
      , G = new Intl.NumberFormat("uk-UA",{
      maximumFractionDigits: 2
    })
      , fe = new Intl.NumberFormat("uk-UA",{
      maximumFractionDigits: 0
    })
      , ce = (f, b=2) => Math.round(f * Math.pow(10, b)) / Math.pow(10, b)
      , _e = $( () => {
      let f = le.value
        , b = e.refillAmount || 0;
      f < N.value ? f = N.value : f > S.value && (f = S.value),
      b > f && (b = f);
      let A = f;
      const L = []
        , J = []
        , O = []
        , Oe = [];
      if (D.value === "jar")
        for (let oe = 1; oe <= x.value; oe++) {
          const se = V.value / 12 / 100
            , je = e.refill && parseFloat(String(b)) || 0;
          A += je;
          const De = A * se
            , de = De * (at / 100);
          Oe.push(de),
          J.push(De),
          L.push(De - de),
          O.push((A ? (De - de) / A : 0) * 12 * 100)
        }
      else
        for (let oe = 1; oe <= x.value; oe++) {
          const se = V.value / 12 / 100
            , je = e.refill && parseFloat(String(b)) || 0;
          oe <= x.value - 3 && (A += je);
          const de = (A + (X.value ? L.reduce( (pt, ft) => pt + ft, 0) : 0)) * se
            , Re = de * (at / 100);
          Oe.push(Re),
          J.push(de),
          L.push(de - Re),
          O.push((de - Re) / A * 12 * 100)
        }
      const ct = A + J.reduce( (oe, se) => oe + se, 0)
        , st = A + L.reduce( (oe, se) => oe + se, 0)
        , ut = Oe.reduce( (oe, se) => oe + se, 0)
        , mt = O.length > 0 ? O.reduce( (oe, se) => oe + se, 0) / O.length : 0;
      return {
        invested: A,
        resultWithTaxes: st,
        resultWithoutTaxes: ct,
        taxAmount: ut,
        rateWithTax: mt,
        rateWithoutTax: V.value
      }
    }
    )
      , ne = $( () => {
      const f = _e.value
        , b = e.withTaxes ? f.resultWithTaxes : f.resultWithoutTaxes;
      return {
        resultValue: fe.format(ce(b)) + " " + ve.currencySymbolFromCode(e.currency),
        invested: G.format(ce(f.invested)) + " " + ve.currencySymbolFromCode(e.currency),
        rate: ce(f.rateWithoutTax, 2),
        rateWithTax: ce(f.rateWithTax, 2),
        taxAmount: G.format(ce(f.taxAmount)) + " " + ve.currencySymbolFromCode(e.currency)
      }
    }
    )
      , re = Je();
    return Fe( () => {
      ( () => {
        let f = !1;
        k.value.value = String(e.amount);
        const {uninit: b, updateValue: A} = $e(k.value, "currency", ({val: L}) => {
          f = !0,
          e.amount = L
        }
        );
        K( () => e.amount, L => {
          f || A(String(L)),
          f = !1
        }
        ),
        re.push(b)
      }
      )(),
      ( () => {
        let f = !1;
        U.value.value = String(e.refillAmount || 0);
        const {uninit: b, updateValue: A} = $e(U.value, "currency", ({val: L}) => {
          f = !0,
          e.refillAmount = L
        }
        );
        K( () => e.refillAmount, L => {
          f || A(String(L)),
          f = !1
        }
        ),
        re.push(b)
      }
      )()
    }
    ),
    qe( () => {
      re()
    }
    ),
    (f, b) => {
      const A = Ge("intersect");
      return H(),
      ae("div", Ha, [t("div", Wa, [t("div", Ya, [ue(t("h2", {
        class: "title m-animate",
        innerHTML: p(o)("deposit.lineCalculator.title")
      }, null, 8, qa), [[A, {
        activeClass: "active",
        once: !0
      }]])]), q(p(Ae), null, {
        default: Y( () => {
          var L, J;
          return [t("div", null, [t("div", {
            class: "loan-calculator",
            "data-type": D.value
          }, [b[9] || (b[9] = t("div", {
            class: "loan-calculator-background"
          }, null, -1)), t("div", Ja, [t("div", Qa, [t("div", Ka, [q(dt, {
            value: D.value,
            "onUpdate:value": b[0] || (b[0] = O => D.value = O),
            items: F.value,
            viewTransition: !0,
            class: "deposit-type-tabs"
          }, null, 8, ["value", "items"])]), t("div", null, [t("label", Xa, d(p(o)("deposit.lineCalculator.calculator.amount")), 1), t("div", el, [q(ye, {
            isValid: +e.amount >= N.value && +e.amount <= S.value,
            class: "loan-calculator-field loan-calculator-input-field",
            style: Ke({
              "--amount-currency-sign": `'${p(ve).currencySymbolFromCode(e.currency)}'`
            })
          }, {
            error: Y( () => [+e.amount < N.value ? (H(),
            ae("div", tl, d(p(o)("deposit.lineCalculator.calculator.minAmountError", {
              minAmountFormatted: `${p(G).format(N.value)} ${p(ve).currencySymbolFromCode(e.currency)}`
            })), 1)) : +e.amount > S.value ? (H(),
            ae("div", al, d(p(o)("deposit.lineCalculator.calculator.maxAmountError", {
              maxAmountFormatted: `${p(G).format(S.value)} ${p(ve).currencySymbolFromCode(e.currency)}`
            })), 1)) : me("", !0)]),
            hint: Y( () => [N.value > 0 && +e.amount >= N.value && +e.amount <= S.value ? (H(),
            ae("span", ll, d(p(o)("deposit.lineCalculator.calculator.minAmount")) + " " + d(p(G).format(N.value)) + " " + d(p(ve).currencySymbolFromCode(e.currency)), 1)) : me("", !0)]),
            default: Y( () => [t("input", {
              id: "calculatorAmount",
              ref_key: "$amount",
              ref: k,
              type: "text",
              inputmode: "numeric",
              onBlur: v
            }, null, 544)]),
            _: 1
          }, 8, ["isValid", "style"]), q(ye, {
            class: "loan-calculator-field loan-calculator-input-field"
          }, {
            label: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.currency")), 1)]),
            default: Y( () => [ue(t("select", {
              "onUpdate:modelValue": b[1] || (b[1] = O => e.currency = O)
            }, [(H(!0),
            ae(ge, null, be(M.value, O => (H(),
            ae("option", {
              key: O.key,
              value: O.key
            }, d(O.label), 9, rl))), 128))], 512), [[vt, e.currency]])]),
            _: 1
          })])]), t("div", nl, [t("div", ol, [q(Me, {
            modelValue: e.termValue,
            "onUpdate:modelValue": b[2] || (b[2] = O => e.termValue = O),
            min: 0,
            max: l.value.length - 1,
            step: 1,
            fromLabel: g.value,
            toLabel: P.value,
            valueLabel: ee.value,
            label: p(o)("deposit.lineCalculator.calculator.term"),
            formatValue: O => `${O} ${p(o)("deposit.line5.monthShort")}`
          }, null, 8, ["modelValue", "max", "fromLabel", "toLabel", "valueLabel", "label", "formatValue"])])]), te.value ? (H(),
          ae("div", {
            key: 0,
            class: Le(["loan-calculator-group loan-calculator-group-wide", {
              "loan-calculator-group--active": e.refill
            }])
          }, [t("div", il, [q(Ve, {
            modelValue: e.refill,
            "onUpdate:modelValue": b[3] || (b[3] = O => e.refill = O),
            class: "calculator-checkbox-big"
          }, {
            default: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.refill")), 1)]),
            subtitle: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.refillSubtitle")), 1)]),
            _: 1
          }, 8, ["modelValue"])]), t("div", cl, [q(ye, {
            class: "loan-calculator-field loan-calculator-input-field",
            style: Ke({
              "--amount-currency-sign": `'${p(ve).currencySymbolFromCode(e.currency)}'`
            })
          }, {
            label: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.refillAmount")), 1)]),
            default: Y( () => [t("input", {
              id: "calculatorRefillAmount",
              ref_key: "$refillAmount",
              ref: U,
              type: "text",
              inputmode: "numeric",
              onBlur: y
            }, null, 544)]),
            _: 1
          }, 8, ["style"])])], 2)) : me("", !0), R.value ? (H(),
          ae("div", sl, [q(Ve, {
            modelValue: e.capitalize,
            "onUpdate:modelValue": b[4] || (b[4] = O => e.capitalize = O),
            class: "calculator-checkbox-big"
          }, {
            default: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.capitalize")), 1)]),
            subtitle: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.capitalizeSubtitle")), 1)]),
            _: 1
          }, 8, ["modelValue"])])) : me("", !0), I.value ? (H(),
          ae("div", ul, [q(Ve, {
            modelValue: e.earlyTerm,
            "onUpdate:modelValue": b[5] || (b[5] = O => e.earlyTerm = O),
            class: "calculator-checkbox-big"
          }, {
            default: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.earlyTerm")), 1)]),
            subtitle: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.earlyTermSubtitle")), 1)]),
            _: 1
          }, 8, ["modelValue"])])) : me("", !0)]), t("div", ml, [b[8] || (b[8] = t("div", {
            class: "loan-calculator-results-bg"
          }, null, -1)), t("div", pl, [t("div", fl, [t("div", dl, d(p(o)("deposit.lineCalculator.calculator.result")), 1), t("div", {
            class: Le(["loan-calculator-result-amount", {
              "shrink-val": ne.value.resultValue.length >= 11
            }])
          }, d(ne.value.resultValue), 3), t("div", vl, [q(Ve, {
            modelValue: e.withTaxes,
            "onUpdate:modelValue": b[6] || (b[6] = O => e.withTaxes = O),
            class: "calculator-checkbox-big calculator-checkbox-big-inline"
          }, {
            default: Y( () => [ie(d(p(o)("deposit.lineCalculator.calculator.withTaxes")), 1)]),
            _: 1
          }, 8, ["modelValue"])])]), b[7] || (b[7] = t("div", {
            class: "loan-calculator-divider"
          }, null, -1)), t("div", _l, [t("div", hl, [t("div", yl, d(p(o)("deposit.lineCalculator.calculator.invested")), 1), t("div", gl, d((L = ne.value) == null ? void 0 : L.invested), 1)]), t("div", bl, [t("div", Cl, d(p(o)("deposit.lineCalculator.calculator.rate")), 1), t("div", $l, d((J = ne.value) == null ? void 0 : J.rate) + d(p(o)("deposit.lineCalculator.calculator.perYear")), 1)]), t("div", wl, [t("div", xl, d(p(o)("deposit.lineCalculator.calculator.rateWithTax")), 1), t("div", Dl, d(ne.value.rateWithTax) + "% ", 1)]), t("div", Ml, [t("div", kl, d(p(o)("deposit.lineCalculator.calculator.taxAmount")), 1), t("div", Tl, d(ne.value.taxAmount), 1)])])])])])], 8, Ga)])]
        }
        ),
        _: 1
      }), t("div", Al, [(H(!0),
      ae(ge, null, be(c.value, L => (H(),
      Ce(He, ke({
        key: L.title
      }, {
        ref_for: !0
      }, L), null, 16))), 128))]), q(Be, {
        items: C.value,
        markdown: !0,
        style: {
          "--markdown-base-font-size": "13px",
          "--markdown-base-font-color": "#000",
          "--markdown-base-list-spacing": "0",
          "--markdown-base-spacing": "0"
        },
        onItemClicked: a
      }, null, 8, ["items"])])])
    }
  }
})
  , vr = Se(Fl, [["__scopeId", "data-v-cba77bc2"]]);
function Sl(s) {
  return Ze({
    key: ["info/installment"],
    query: async () => {
      {
        const n = await fetch("/api-front/info/installment");
        if (!n.ok)
          throw new Error("Failed to fetch info/installment");
        return (await n.json()).result
      }
    }
    ,
    staleTime: 3e4
  })
}
const Vl = {
  class: "line line4 layout-grid full-width"
}
  , Pl = {
  class: "line4--wrapper"
}
  , Ll = {
  class: "text-wrapper"
}
  , Zl = ["innerHTML"]
  , Il = ["innerHTML"]
  , Ol = {
  class: "loan-calculator"
}
  , jl = {
  class: "loan-calculator-content"
}
  , Rl = {
  class: "loan-calculator-form"
}
  , Ul = {
  key: 0,
  class: "error-message"
}
  , zl = {
  class: "loan-calculator-row"
}
  , El = {
  class: "loan-calculator-field-title"
}
  , Nl = {
  class: "loan-calculator-field-row"
}
  , Bl = ["value"]
  , Hl = ["placeholder"]
  , Wl = {
  key: 0,
  class: "loan-calculator-row"
}
  , Yl = {
  class: "loan-calculator-field-note"
}
  , ql = {
  class: "loan-calculator-results"
}
  , Gl = {
  class: "loan-calculator-results-content"
}
  , Jl = {
  class: "loan-calculator-main-result"
}
  , Ql = {
  class: "loan-calculator-result-title"
}
  , Kl = {
  class: "loan-calculator-result-amount"
}
  , Xl = {
  class: "loan-calculator-details"
}
  , e0 = {
  class: "loan-calculator-detail-item"
}
  , t0 = {
  class: "loan-calculator-detail-label"
}
  , a0 = {
  class: "loan-calculator-detail-value"
}
  , l0 = {
  class: "loan-calculator-detail-item"
}
  , r0 = {
  class: "loan-calculator-detail-label"
}
  , n0 = {
  class: "loan-calculator-detail-value"
}
  , o0 = {
  class: "loan-calculator-detail-item"
}
  , i0 = {
  class: "loan-calculator-detail-label"
}
  , c0 = {
  class: "loan-calculator-detail-value"
}
  , s0 = {
  class: "loan-calculator-detail-item"
}
  , u0 = {
  class: "loan-calculator-detail-label"
}
  , m0 = {
  class: "loan-calculator-detail-value"
}
  , p0 = {
  class: "cta-links"
}
  , f0 = xe({
  __name: "LineCalculator",
  async setup(s) {
    let n, u;
    Ie("appContext");
    const {refresh: m, data: _} = Sl()
      , {t: o} = Te()
      , Z = Ne()
      , j = $( () => Z.locale)
      , k = we("$amount")
      , U = we("$termCustom")
      , e = We({
      amount: 1e3,
      term: 3,
      termSelected: 3,
      termCustom: null
    });
    [n,u] = Ye( () => m()),
    await n,
    u();
    const F = $( () => {
      var a;
      return (a = _.value) != null && a.instmtPlanByMonthTerm ? Object.keys(_.value.instmtPlanByMonthTerm).map(l => parseInt(l)) : []
    }
    )
      , D = $( () => Math.max(...F.value) || 0)
      , I = $( () => Math.min(...F.value) || 0)
      , z = $( () => {
      var a;
      return ((a = _.value) == null ? void 0 : a.instmtPlanMinSum) || 0
    }
    )
      , E = $( () => {
      var a;
      return ((a = _.value) == null ? void 0 : a.instmtPlanMaxSum) || 0
    }
    );
    K( () => e.termSelected, a => {
      a !== null && (e.term = a,
      e.termCustom = null)
    }
    ),
    K( () => e.termCustom, a => {
      a !== null && a !== "" && (e.term = a,
      e.termSelected = null)
    }
    ),
    K( () => e.term, a => {
      const l = a;
      l > D.value && (e.term = parseInt(String(D.value))),
      l < I.value && (e.term = I.value)
    }
    );
    const le = $( () => parseInt(e.termCustom ? e.termCustom : e.term) > D.value);
    function w() {
      const a = parseFloat(String(e.amount || "0"));
      a < z.value && (e.amount = z.value),
      a > E.value && (e.amount = E.value)
    }
    function x() {
      if (e.termCustom) {
        const a = parseInt(e.termCustom);
        if (a > D.value && (e.termCustom = String(D.value),
        e.term = D.value),
        a < I.value && (e.termCustom = String(I.value),
        e.term = I.value),
        !F.value.includes(a)) {
          const l = F.value.reduce( (i, h) => Math.abs(h - a) < Math.abs(i - a) ? h : i, F.value[0]);
          e.termCustom = String(l),
          e.term = l;
          return
        }
      }
    }
    const T = Q([])
      , B = () => [{
      question: o("installment.lineCalculator.warning.title"),
      answer: o("installment.lineCalculator.warning.content"),
      isActive: !1
    }]
      , R = $( () => [{
      title: o("installment.lineCalculator.blocks.1.title"),
      subtitle: o("installment.lineCalculator.blocks.1.subtitle"),
      link: "/installment-characteristics",
      backgroundColor: "#3D74EF",
      icon: "common/cta-pdf"
    }, {
      title: o("installment.lineCalculator.blocks.2.title"),
      subtitle: o("installment.lineCalculator.blocks.2.subtitle"),
      link: "/rates#page=26",
      backgroundColor: "#3D74EF",
      icon: "common/cta-pdf"
    }])
      , X = a => {
      a.isActive = !a.isActive
    }
    ;
    K(j, () => {
      T.value = B()
    }
    , {
      immediate: !0
    });
    const N = $( () => {
      const a = parseFloat(String(e.amount || "0"));
      return a < z.value ? z.value : a > E.value ? E.value : a
    }
    )
      , S = $( () => parseInt(String(e.term)))
      , V = $( () => {
      var a, l, i;
      return ((i = (l = (a = _.value) == null ? void 0 : a.instmtPlanByMonthTerm) == null ? void 0 : l[S.value]) == null ? void 0 : i.paymentsCount) || 0
    }
    )
      , M = $( () => {
      var a, l, i;
      return ((i = (l = (a = _.value) == null ? void 0 : a.instmtPlanByMonthTerm) == null ? void 0 : l[S.value]) == null ? void 0 : i.effectiveYearRate) || 0
    }
    )
      , v = new Intl.NumberFormat("uk-UA",{
      maximumFractionDigits: 2
    })
      , y = $( () => {
      const a = c(N.value, V.value);
      return {
        effectiveRate: M.value.toLocaleString("uk-UA", {
          maximumFractionDigits: 2
        }),
        monthPayment: v.format(a.monthly),
        firstPaymentDate: new Date(new Date().setMonth(new Date().getMonth() + 1)).toLocaleDateString("uk-UA", {
          month: "long",
          day: "numeric"
        }),
        totalCost: v.format(a.resultValue),
        totalCostWithAmount: v.format(a.cost),
        minAmountFormatted: v.format(z.value) + " ₴",
        maxAmountFormatted: v.format(E.value) + " ₴"
      }
    }
    )
      , C = Je();
    function r(a) {
      var l;
      return a * (((l = _.value) == null ? void 0 : l.instmtPlanComissionMonthRate) || 0) / 100
    }
    function c(a, l) {
      var P;
      const i = (a + r(a) * l) / l
        , h = r(a) * l + a * l * (((P = _.value) == null ? void 0 : P.instmtPlanYearRate) || 0) / 100 / 12
        , g = a + h;
      return {
        monthly: i,
        cost: g,
        resultValue: h
      }
    }
    return Fe( () => {
      let a = !1;
      k.value.value = String(e.amount);
      const {uninit: l, updateValue: i} = $e(k.value, "currency", ({val: g}) => {
        a = !0,
        e.amount = g
      }
      );
      K( () => e.amount, g => {
        a || i(String(g)),
        a = !1
      }
      ),
      C.push(l);
      const {uninit: h} = $e(U.value, "uint", ({val: g}) => {
        e.termCustom = g
      }
      );
      C.push(h)
    }
    ),
    qe( () => {
      C()
    }
    ),
    (a, l) => {
      const i = Ge("intersect");
      return H(),
      ae("div", Vl, [t("div", Pl, [t("div", Ll, [ue(t("h2", {
        class: "title m-animate",
        innerHTML: p(o)("installment.lineCalculator.title")
      }, null, 8, Zl), [[i, {
        activeClass: "active",
        once: !0
      }]]), ue(t("p", {
        class: "description m-animate",
        innerHTML: p(o)("installment.lineCalculator.subtitle")
      }, null, 8, Il), [[i, {
        activeClass: "active",
        once: !0
      }]])]), q(p(Ae), null, {
        default: Y( () => [t("div", null, [t("div", Ol, [l[4] || (l[4] = t("div", {
          class: "loan-calculator-background"
        }, null, -1)), t("div", jl, [t("div", Rl, [q(ye, {
          isValid: +e.amount >= z.value && +e.amount <= E.value,
          class: "loan-calculator-field loan-calculator-currency-field"
        }, {
          label: Y( () => [ie(d(p(o)("installment.lineCalculator.calculator.amount")), 1)]),
          error: Y( () => [+e.amount < z.value || +e.amount > E.value ? (H(),
          ae("div", Ul, d(p(o)("installment.lineCalculator.calculator.amountError", {
            minAmountFormatted: y.value.minAmountFormatted,
            maxAmountFormatted: y.value.maxAmountFormatted
          })), 1)) : me("", !0)]),
          default: Y( () => [t("input", {
            ref_key: "$amount",
            ref: k,
            type: "text",
            inputmode: "numeric",
            onBlur: w
          }, null, 544)]),
          _: 1
        }, 8, ["isValid"]), t("div", zl, [t("div", El, d(p(o)("installment.lineCalculator.calculator.term")), 1), t("div", Nl, [(H(),
        ae(ge, null, be([3, 4, 6], h => t("label", {
          key: h,
          class: "ui-check-btn"
        }, [ue(t("input", {
          "onUpdate:modelValue": l[0] || (l[0] = g => e.termSelected = g),
          type: "radio",
          name: "term",
          value: h
        }, null, 8, Bl), [[Ee, e.termSelected]]), t("span", null, d(h), 1)])), 64)), q(ye, {
          class: "loan-calculator-field loan-calculator-custom-field"
        }, {
          default: Y( () => [ue(t("input", {
            ref_key: "$termCustom",
            ref: U,
            "onUpdate:modelValue": l[1] || (l[1] = h => e.termCustom = h),
            type: "text",
            placeholder: p(o)("installment.lineCalculator.calculator.termPlaceholder"),
            class: Le({
              active: e.termCustom
            }),
            inputmode: "numeric",
            onBlur: x
          }, null, 42, Hl), [[nt, e.termCustom]])]),
          _: 1
        })])]), le.value ? (H(),
        ae("div", Wl, [t("div", Yl, [q(ot, {
          style: {
            height: "16px",
            width: "16px",
            "margin-right": "4px"
          },
          type: "inline-size",
          keypath: "common/info"
        }), ie(" " + d(p(o)("installment.lineCalculator.calculator.termNote", {
          term: D.value
        })), 1)])])) : me("", !0)]), t("div", ql, [l[3] || (l[3] = t("div", {
          class: "loan-calculator-results-bg"
        }, null, -1)), t("div", Gl, [t("div", Jl, [t("div", Ql, d(p(o)("installment.lineCalculator.calculator.totalCost")), 1), t("div", Kl, d(y.value.totalCost) + " ₴ ", 1)]), l[2] || (l[2] = t("div", {
          class: "loan-calculator-divider"
        }, null, -1)), t("div", Xl, [t("div", e0, [t("div", t0, d(p(o)("installment.lineCalculator.calculator.monthPayment")), 1), t("div", a0, d(y.value.monthPayment) + " ₴ ", 1)]), t("div", l0, [t("div", r0, d(p(o)("installment.lineCalculator.calculator.firstPaymentDate")), 1), t("div", n0, d(y.value.firstPaymentDate), 1)]), t("div", o0, [t("div", i0, d(p(o)("installment.lineCalculator.calculator.totalCostWithAmount")), 1), t("div", c0, d(y.value.totalCostWithAmount) + " ₴ ", 1)]), t("div", s0, [t("div", u0, d(p(o)("installment.lineCalculator.calculator.effectiveRate")), 1), t("div", m0, d(p(o)("installment.lineCalculator.calculator.effectiveRateValue", {
          value: y.value.effectiveRate
        })), 1)])])])])])])])]),
        _: 1
      }), t("div", p0, [(H(!0),
      ae(ge, null, be(R.value, h => (H(),
      Ce(He, ke({
        key: h.title
      }, {
        ref_for: !0
      }, h), null, 16))), 128))]), q(Be, {
        items: T.value,
        markdown: !0,
        style: {
          "--markdown-base-font-size": "13px",
          "--markdown-base-font-color": "#000",
          "--markdown-base-list-spacing": "0",
          "--markdown-base-spacing": "0"
        },
        onItemClicked: X
      }, null, 8, ["items"])])])
    }
  }
})
  , _r = Se(f0, [["__scopeId", "data-v-8ccade06"]]);
function d0(s) {
  return Ze({
    key: ["info/kredyty-dozavtra"],
    query: async () => {
      {
        const n = await fetch("/api-front/info/kredyty-dozavtra");
        if (!n.ok)
          throw new Error("Failed to fetch info/kredyty-dozavtra");
        return (await n.json()).result
      }
    }
    ,
    staleTime: 3e4
  })
}
const v0 = {
  class: "line line4 layout-grid full-width"
}
  , _0 = {
  class: "line4--wrapper"
}
  , h0 = {
  class: "text-wrapper"
}
  , y0 = ["innerHTML"]
  , g0 = ["innerHTML"]
  , b0 = {
  class: "loan-calculator"
}
  , C0 = {
  class: "loan-calculator-content"
}
  , $0 = {
  class: "loan-calculator-form"
}
  , w0 = {
  key: 0,
  class: "error-message"
}
  , x0 = {
  class: "loan-calculator-row"
}
  , D0 = {
  class: "loan-calculator-field-title"
}
  , M0 = {
  class: "loan-calculator-field-row"
}
  , k0 = ["value"]
  , T0 = {
  class: "loan-calculator-row"
}
  , A0 = {
  class: "loan-calculator-field-title"
}
  , F0 = {
  class: "loan-calculator-field-row"
}
  , S0 = ["value"]
  , V0 = ["placeholder"]
  , P0 = {
  key: 0,
  class: "loan-calculator-row"
}
  , L0 = {
  class: "loan-calculator-field-note"
}
  , Z0 = {
  class: "loan-calculator-results"
}
  , I0 = {
  class: "loan-calculator-results-content"
}
  , O0 = {
  class: "loan-calculator-main-result"
}
  , j0 = {
  class: "loan-calculator-result-title"
}
  , R0 = {
  class: "loan-calculator-result-amount"
}
  , U0 = {
  class: "loan-calculator-details"
}
  , z0 = {
  class: "loan-calculator-detail-item"
}
  , E0 = {
  class: "loan-calculator-detail-label"
}
  , N0 = {
  class: "loan-calculator-detail-value"
}
  , B0 = {
  class: "loan-calculator-detail-item"
}
  , H0 = {
  class: "loan-calculator-detail-label"
}
  , W0 = {
  class: "loan-calculator-detail-value"
}
  , Y0 = {
  class: "loan-calculator-detail-item"
}
  , q0 = {
  class: "loan-calculator-detail-label"
}
  , G0 = {
  class: "loan-calculator-detail-value"
}
  , J0 = {
  class: "loan-calculator-detail-item"
}
  , Q0 = {
  class: "loan-calculator-detail-label"
}
  , K0 = {
  class: "loan-calculator-detail-value"
}
  , X0 = {
  class: "cta-links"
}
  , er = xe({
  __name: "LineCalculator",
  async setup(s) {
    let n, u;
    Ie("appContext");
    const {refresh: m, data: _} = d0()
      , {t: o} = Te()
      , Z = Ne()
      , j = $( () => Z.locale)
      , k = we("$amount")
      , U = we("$termCustom")
      , e = We({
      amount: 1e3,
      term: 3,
      termSelected: 3,
      termCustom: null,
      rate: 3
    });
    [n,u] = Ye( () => m()),
    await n,
    u();
    const F = $( () => {
      var r;
      return ((r = _.value) == null ? void 0 : r.maxTerm) || 0
    }
    )
      , D = $( () => {
      var r;
      return ((r = _.value) == null ? void 0 : r.minTerm) || 0
    }
    )
      , I = $( () => {
      var r;
      return ((r = _.value) == null ? void 0 : r.instmtPlanMinSum) || 0
    }
    )
      , z = $( () => {
      var r;
      return ((r = _.value) == null ? void 0 : r.instmtPlanMaxSum) || 0
    }
    );
    K( () => e.termSelected, r => {
      r !== null && (e.term = r,
      e.termCustom = null)
    }
    ),
    K( () => e.termCustom, r => {
      r !== null && r !== "" && (e.term = r,
      e.termSelected = null)
    }
    ),
    K( () => e.term, r => {
      const c = r;
      c > F.value && (e.term = parseInt(String(F.value))),
      c < D.value && (e.term = parseInt(String(D.value)))
    }
    );
    const E = $( () => parseInt(e.termCustom ? e.termCustom : e.term) > F.value);
    function le() {
      const r = parseFloat(String(e.amount || "0"));
      r < I.value && (e.amount = I.value),
      r > z.value && (e.amount = z.value)
    }
    function w() {
      if (e.termCustom) {
        const r = parseInt(e.termCustom);
        r > F.value && (e.termCustom = String(F.value),
        e.term = F.value),
        r < D.value && (e.termCustom = String(D.value),
        e.term = D.value)
      }
    }
    const x = Q([])
      , T = () => [{
      question: o("kredytyDozavtra.lineCalculator.warning.title"),
      answer: o("kredytyDozavtra.lineCalculator.warning.content"),
      isActive: !1
    }]
      , B = $( () => [{
      title: o("kredytyDozavtra.lineCalculator.blocks.1.title"),
      subtitle: o("kredytyDozavtra.lineCalculator.blocks.1.subtitle"),
      link: "/kredyty-dozavra-characteristics",
      backgroundColor: "#3D74EF",
      icon: "common/cta-pdf"
    }, {
      title: o("kredytyDozavtra.lineCalculator.blocks.2.title"),
      subtitle: o("kredytyDozavtra.lineCalculator.blocks.2.subtitle"),
      link: "/rates#page=29",
      backgroundColor: "#3D74EF",
      icon: "common/cta-pdf"
    }])
      , R = r => {
      r.isActive = !r.isActive
    }
    ;
    K(j, () => {
      x.value = T()
    }
    , {
      immediate: !0
    });
    const X = $( () => {
      const r = parseFloat(String(e.amount || "0"));
      return r < I.value ? I.value : r > z.value ? z.value : r
    }
    )
      , N = $( () => parseInt(String(e.term)))
      , S = $( () => N.value || 0)
      , V = $( () => {
      var c, a;
      const r = (a = (c = _.value) == null ? void 0 : c.instmtPlanByRate) == null ? void 0 : a[e.rate];
      if (r) {
        const l = r.find(i => i.days === N.value);
        if (l)
          return l.effectPercRate
      }
      return 0
    }
    )
      , M = new Intl.NumberFormat("uk-UA",{
      maximumFractionDigits: 2
    })
      , v = $( () => {
      const r = C(X.value, S.value, e.rate);
      return {
        effectiveRate: V.value.toLocaleString("uk-UA", {
          maximumFractionDigits: 2
        }),
        monthPayment: M.format(r.monthly),
        firstPaymentDate: new Date(new Date().setDate(new Date().getDate() + N.value)).toLocaleDateString("uk-UA", {
          month: "long",
          day: "numeric"
        }),
        totalCost: M.format(r.resultValue),
        totalCostWithAmount: M.format(r.cost),
        minAmountFormatted: M.format(I.value || 0) + " ₴",
        maxAmountFormatted: M.format(z.value || 0) + " ₴"
      }
    }
    )
      , y = Je();
    function C(r, c, a) {
      const l = r * (+a / 1e3)
        , i = l * c
        , h = r + i;
      return {
        monthly: l,
        cost: h,
        resultValue: i
      }
    }
    return Fe( () => {
      let r = !1;
      k.value.value = String(e.amount);
      const {uninit: c, updateValue: a} = $e(k.value, "currency", ({val: i}) => {
        r = !0,
        e.amount = i
      }
      );
      K( () => e.amount, i => {
        r || a(String(i)),
        r = !1
      }
      ),
      y.push(c);
      const {uninit: l} = $e(U.value, "uint", ({val: i}) => {
        e.termCustom = i
      }
      );
      y.push(l)
    }
    ),
    qe( () => {
      y()
    }
    ),
    (r, c) => {
      const a = Ge("intersect");
      return H(),
      ae("div", v0, [t("div", _0, [t("div", h0, [ue(t("h2", {
        class: "title m-animate",
        innerHTML: p(o)("kredytyDozavtra.lineCalculator.title")
      }, null, 8, y0), [[a, {
        activeClass: "active",
        once: !0
      }]]), ue(t("p", {
        class: "description m-animate",
        innerHTML: p(o)("kredytyDozavtra.lineCalculator.subtitle")
      }, null, 8, g0), [[a, {
        activeClass: "active",
        once: !0
      }]])]), q(p(Ae), null, {
        default: Y( () => [t("div", null, [t("div", b0, [c[5] || (c[5] = t("div", {
          class: "loan-calculator-background"
        }, null, -1)), t("div", C0, [t("div", $0, [q(ye, {
          isValid: +e.amount >= I.value && +e.amount <= z.value,
          class: "loan-calculator-field loan-calculator-currency-field"
        }, {
          label: Y( () => [ie(d(p(o)("kredytyDozavtra.lineCalculator.calculator.amount")), 1)]),
          error: Y( () => [+e.amount < I.value || +e.amount > z.value ? (H(),
          ae("div", w0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.amountError", {
            minAmountFormatted: v.value.minAmountFormatted,
            maxAmountFormatted: v.value.maxAmountFormatted
          })), 1)) : me("", !0)]),
          default: Y( () => [t("input", {
            ref_key: "$amount",
            ref: k,
            type: "text",
            inputmode: "numeric",
            onBlur: le
          }, null, 544)]),
          _: 1
        }, 8, ["isValid"]), t("div", x0, [t("div", D0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.rate")), 1), t("div", M0, [(H(),
        ae(ge, null, be([3, 5], l => t("label", {
          key: l,
          class: "ui-check-btn"
        }, [ue(t("input", {
          "onUpdate:modelValue": c[0] || (c[0] = i => e.rate = i),
          type: "radio",
          name: "rate",
          value: l
        }, null, 8, k0), [[Ee, e.rate]]), t("span", null, d(p(o)("kredytyDozavtra.lineCalculator.calculator.rateValue", {
          rate: l
        })), 1)])), 64))])]), t("div", T0, [t("div", A0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.term")), 1), t("div", F0, [(H(),
        ae(ge, null, be([3, 7, 14], l => t("label", {
          key: l,
          class: "ui-check-btn"
        }, [ue(t("input", {
          "onUpdate:modelValue": c[1] || (c[1] = i => e.termSelected = i),
          type: "radio",
          name: "term",
          value: l
        }, null, 8, S0), [[Ee, e.termSelected]]), t("span", null, d(l), 1)])), 64)), q(ye, {
          class: "loan-calculator-field loan-calculator-custom-field"
        }, {
          default: Y( () => [ue(t("input", {
            ref_key: "$termCustom",
            ref: U,
            "onUpdate:modelValue": c[2] || (c[2] = l => e.termCustom = l),
            type: "text",
            placeholder: p(o)("kredytyDozavtra.lineCalculator.calculator.termPlaceholder"),
            class: Le({
              active: e.termCustom
            }),
            inputmode: "numeric",
            onBlur: w
          }, null, 42, V0), [[nt, e.termCustom]])]),
          _: 1
        })])]), E.value ? (H(),
        ae("div", P0, [t("div", L0, [q(ot, {
          style: {
            height: "16px",
            width: "16px",
            "margin-right": "4px"
          },
          type: "inline-size",
          keypath: "common/info"
        }), ie(" " + d(p(o)("kredytyDozavtra.lineCalculator.calculator.termNote", {
          term: F.value
        })), 1)])])) : me("", !0)]), t("div", Z0, [c[4] || (c[4] = t("div", {
          class: "loan-calculator-results-bg"
        }, null, -1)), t("div", I0, [t("div", O0, [t("div", j0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.totalCost")), 1), t("div", R0, d(v.value.totalCost) + " ₴ ", 1)]), c[3] || (c[3] = t("div", {
          class: "loan-calculator-divider"
        }, null, -1)), t("div", U0, [t("div", z0, [t("div", E0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.monthPayment")), 1), t("div", N0, d(v.value.monthPayment) + " ₴ ", 1)]), t("div", B0, [t("div", H0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.firstPaymentDate")), 1), t("div", W0, d(v.value.firstPaymentDate), 1)]), t("div", Y0, [t("div", q0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.totalCostWithAmount")), 1), t("div", G0, d(v.value.totalCostWithAmount) + " ₴ ", 1)]), t("div", J0, [t("div", Q0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.effectiveRate")), 1), t("div", K0, d(p(o)("kredytyDozavtra.lineCalculator.calculator.effectiveRateValue", {
          value: v.value.effectiveRate
        })), 1)])])])])])])])]),
        _: 1
      }), t("div", X0, [(H(!0),
      ae(ge, null, be(B.value, l => (H(),
      Ce(He, ke({
        key: l.title
      }, {
        ref_for: !0
      }, l), null, 16))), 128))]), q(Be, {
        items: x.value,
        markdown: !0,
        style: {
          "--markdown-base-font-size": "13px",
          "--markdown-base-font-color": "#000",
          "--markdown-base-list-spacing": "0",
          "--markdown-base-spacing": "0"
        },
        onItemClicked: R
      }, null, 8, ["items"])])])
    }
  }
})
  , hr = Se(er, [["__scopeId", "data-v-e5e28bb6"]])
  , tr = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 40">
	<rect width="56" height="40" fill="url(#paint0_linear_2529_40268)" rx="8"/>
	<path fill="#fff" d="M10.19 9.39V7.74c0-.46-.25-.68-.67-.68-.35 0-.65.2-.78.41-.08-.26-.3-.41-.63-.41a1 1 0 0 0-.74.35v-.3h-.6V9.4h.6V7.86a.6.6 0 0 1 .47-.27c.24 0 .34.15.34.36V9.4h.6V7.85a.6.6 0 0 1 .47-.26c.24 0 .34.15.34.36V9.4h.6Zm1.64.05c.75 0 1.2-.54 1.2-1.2 0-.64-.45-1.18-1.2-1.18s-1.2.54-1.2 1.19c0 .65.45 1.2 1.2 1.2Zm0-.53c-.37 0-.58-.3-.58-.66 0-.35.2-.66.58-.66.37 0 .58.3.58.66 0 .36-.21.66-.58.66Zm3.77.48v-1.6c0-.45-.23-.73-.73-.73-.37 0-.65.18-.8.35v-.3h-.6V9.4h.6V7.86c.1-.14.28-.27.52-.27.25 0 .42.1.42.42V9.4h.6Zm1.65.05c.75 0 1.2-.54 1.2-1.2 0-.64-.45-1.18-1.2-1.18s-1.2.54-1.2 1.19c0 .65.45 1.2 1.2 1.2Zm0-.53c-.37 0-.58-.3-.58-.66 0-.35.21-.66.58-.66s.59.3.59.66c0 .36-.22.66-.59.66Zm2.25-.25v-.8c.1-.16.32-.27.5-.27.36 0 .59.27.59.66 0 .4-.23.66-.58.66-.2 0-.41-.1-.51-.25Zm0 .73v-.3c.18.23.42.35.7.35.57 0 1-.43 1-1.19 0-.74-.42-1.2-1-1.2a.87.87 0 0 0-.7.36V6.25h-.6v3.14h.6Zm4.12 0V7.92c0-.66-.48-.86-1-.86-.35 0-.71.11-.99.36l.23.4a.95.95 0 0 1 .66-.27c.3 0 .5.15.5.38v.3c-.15-.17-.42-.27-.72-.27-.36 0-.8.2-.8.73 0 .5.44.75.8.75.3 0 .56-.1.72-.29v.24h.6Zm-1.08-.35c-.24 0-.43-.12-.43-.34 0-.22.2-.34.43-.34.2 0 .38.07.48.2v.28c-.1.13-.29.2-.48.2Zm3.8.35v-1.6c0-.45-.24-.73-.74-.73-.37 0-.65.18-.8.35v-.3h-.6V9.4h.6V7.86c.1-.14.29-.27.52-.27.26 0 .42.1.42.42V9.4h.6Zm2.81 0-.92-1.25.9-1.03h-.74l-.86 1.02V6.25h-.6v3.14h.6V8.8l.27-.29.6.88h.75Z"/>
	<path fill="#FFFFFE" fill-rule="evenodd" d="M28.8 10.42h.15v.48l.2-.23h.14l-.22.25.26.32h-.17l-.21-.3v.3h-.15v-.82Zm-7.17.03v.45c0 .16.04.24.17.24.12 0 .17-.1.17-.23v-.46h.14v.49c0 .2-.13.3-.31.3-.22 0-.33-.1-.33-.3v-.49h.16Zm.81.29a.26.26 0 0 1 .2-.08c.13 0 .2.07.2.21v.37h-.15v-.35c0-.08-.04-.13-.11-.13-.08 0-.13.05-.13.14v.34h-.15v-.56h.14v.06Zm.58.5h.15v-.56h-.15v.56ZM23 10.5c0-.04.04-.09.09-.09.05 0 .1.04.1.09a.1.1 0 0 1-.1.1c-.05 0-.09-.05-.09-.1Zm.5.74-.24-.57h.16c.05.13.1.25.14.4l.16-.4h.14l-.26.57h-.1Zm.8-.35c.01-.09-.02-.14-.1-.14s-.12.06-.12.14h.22Zm-.22.08c0 .1.07.18.16.18.06 0 .12-.02.16-.04l.04.08a.45.45 0 0 1-.22.06c-.17 0-.3-.12-.3-.3s.13-.29.29-.29c.17 0 .25.14.24.3h-.37Zm.66-.2.03-.04c.02-.02.05-.07.1-.07.03 0 .07.02.1.05l-.05.1a.14.14 0 0 0-.08-.01c-.05 0-.1.04-.1.16v.28h-.15v-.56h.15v.1Zm.63.01a.17.17 0 0 0-.1-.03c-.03 0-.06.01-.06.05 0 .05.05.07.12.12.08.06.1.12.1.17 0 .08-.09.16-.21.16a.31.31 0 0 1-.19-.06l.05-.08c.03.02.08.05.12.05.04 0 .08-.02.08-.07s-.06-.08-.11-.12c-.06-.04-.1-.08-.1-.15 0-.1.08-.16.19-.16.06 0 .12.02.16.05l-.05.07Zm.43.16c-.07.02-.1.06-.1.13 0 .05.02.08.06.08.06 0 .14-.07.13-.24l-.09.03Zm.05.24a.23.23 0 0 1-.15.07c-.08 0-.16-.07-.16-.17s.08-.17.21-.2l.14-.04a.1.1 0 0 0-.1-.09.22.22 0 0 0-.16.06l-.05-.07a.32.32 0 0 1 .22-.08c.1 0 .23.04.23.21v.23c0 .04 0 .1.03.14h-.16a.17.17 0 0 1-.02-.09l-.03.03Zm.35.06h.15v-.83h-.15v.83Zm1.48-.3c-.07.02-.1.06-.1.13 0 .05.02.08.06.08.06 0 .14-.07.13-.24l-.09.03Zm.05.24a.23.23 0 0 1-.15.07c-.08 0-.16-.07-.16-.17s.08-.17.21-.2l.14-.04a.1.1 0 0 0-.1-.09.22.22 0 0 0-.16.06l-.05-.07a.32.32 0 0 1 .22-.08c.1 0 .23.04.23.21v.23c0 .04 0 .1.03.14h-.16a.18.18 0 0 1-.02-.09l-.03.03Zm.5-.44a.26.26 0 0 1 .2-.08c.13 0 .2.07.2.21v.37h-.15v-.35c0-.08-.04-.13-.12-.13-.07 0-.13.05-.13.14v.34h-.15v-.56h.15v.06Zm-1.33.4h.08c.09 0 .16-.04.16-.13 0-.1-.07-.13-.16-.13h-.08v.26Zm0-.36h.05c.1 0 .15-.06.15-.13s-.05-.1-.12-.1h-.08v.23Zm-.16.46v-.79h.29c.13 0 .22.06.22.17 0 .13-.1.18-.15.2.1 0 .2.07.2.19 0 .13-.11.23-.3.23h-.26Z" clip-rule="evenodd" opacity=".6"/>
	<defs>
		<linearGradient id="paint0_linear_2529_40268" x1="28" x2="28" y1="0" y2="40" gradientUnits="userSpaceOnUse">
			<stop stop-color="#2B2B2B"/>
			<stop offset="1" stop-color="#0E0E0E"/>
		</linearGradient>
	</defs>
</svg>
`
  , yr = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: tr
}, Symbol.toStringTag, {
  value: "Module"
}))
  , ar = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 40">
	<rect width="56" height="40" fill="url(#paint0_linear_2529_40331)" rx="8"/>
	<path fill="#fff" d="M10.19 9.39V7.74c0-.46-.25-.68-.67-.68-.35 0-.65.2-.78.41-.08-.26-.3-.41-.63-.41a1 1 0 0 0-.74.35v-.3h-.6V9.4h.6V7.86a.6.6 0 0 1 .47-.27c.24 0 .34.15.34.36V9.4h.6V7.85a.6.6 0 0 1 .47-.26c.24 0 .34.15.34.36V9.4h.6Zm1.64.05c.75 0 1.2-.54 1.2-1.2 0-.64-.45-1.18-1.2-1.18s-1.2.54-1.2 1.19c0 .65.45 1.2 1.2 1.2Zm0-.53c-.37 0-.58-.3-.58-.66 0-.35.2-.66.58-.66.37 0 .58.3.58.66 0 .36-.21.66-.58.66Zm3.77.48v-1.6c0-.45-.23-.73-.73-.73-.37 0-.65.18-.8.35v-.3h-.6V9.4h.6V7.86c.1-.14.28-.27.52-.27.25 0 .42.1.42.42V9.4h.6Zm1.65.05c.75 0 1.2-.54 1.2-1.2 0-.64-.45-1.18-1.2-1.18s-1.2.54-1.2 1.19c0 .65.45 1.2 1.2 1.2Zm0-.53c-.37 0-.58-.3-.58-.66 0-.35.21-.66.58-.66s.59.3.59.66c0 .36-.22.66-.59.66Zm2.25-.25v-.8c.1-.16.32-.27.5-.27.36 0 .59.27.59.66 0 .4-.23.66-.58.66-.2 0-.41-.1-.51-.25Zm0 .73v-.3c.18.23.42.35.7.35.57 0 1-.43 1-1.19 0-.74-.42-1.2-1-1.2a.87.87 0 0 0-.7.36V6.25h-.6v3.14h.6Zm4.12 0V7.92c0-.66-.48-.86-1-.86-.35 0-.71.11-.99.36l.23.4a.95.95 0 0 1 .66-.27c.3 0 .5.15.5.38v.3c-.15-.17-.42-.27-.72-.27-.36 0-.8.2-.8.73 0 .5.44.75.8.75.3 0 .56-.1.72-.29v.24h.6Zm-1.08-.35c-.24 0-.43-.12-.43-.34 0-.22.2-.34.43-.34.2 0 .38.07.48.2v.28c-.1.13-.29.2-.48.2Zm3.8.35v-1.6c0-.45-.24-.73-.74-.73-.37 0-.65.18-.8.35v-.3h-.6V9.4h.6V7.86c.1-.14.29-.27.52-.27.26 0 .42.1.42.42V9.4h.6Zm2.81 0-.92-1.25.9-1.03h-.74l-.86 1.02V6.25h-.6v3.14h.6V8.8l.27-.29.6.88h.75Z"/>
	<path fill="#FFFFFE" fill-rule="evenodd" d="M28.8 10.42h.15v.48l.2-.23h.14l-.22.25.26.32h-.17l-.21-.3v.3h-.15v-.82Zm-7.17.03v.45c0 .16.04.24.17.24.12 0 .17-.1.17-.23v-.46h.14v.49c0 .2-.13.3-.31.3-.22 0-.33-.1-.33-.3v-.49h.16Zm.81.29a.26.26 0 0 1 .2-.08c.13 0 .2.07.2.21v.37h-.15v-.35c0-.08-.04-.13-.11-.13-.08 0-.13.05-.13.14v.34h-.15v-.56h.14v.06Zm.58.5h.15v-.56h-.15v.56ZM23 10.5c0-.04.04-.09.09-.09.05 0 .1.04.1.09a.1.1 0 0 1-.1.1c-.05 0-.09-.05-.09-.1Zm.5.74-.24-.57h.16c.05.13.1.25.14.4l.16-.4h.14l-.26.57h-.1Zm.8-.35c.01-.09-.02-.14-.1-.14s-.12.06-.12.14h.22Zm-.22.08c0 .1.07.18.16.18.06 0 .12-.02.16-.04l.04.08a.45.45 0 0 1-.22.06c-.17 0-.3-.12-.3-.3s.13-.29.29-.29c.17 0 .25.14.24.3h-.37Zm.66-.2.03-.04c.02-.02.05-.07.1-.07.03 0 .07.02.1.05l-.05.1a.14.14 0 0 0-.08-.01c-.05 0-.1.04-.1.16v.28h-.15v-.56h.15v.1Zm.63.01a.17.17 0 0 0-.1-.03c-.03 0-.06.01-.06.05 0 .05.05.07.12.12.08.06.1.12.1.17 0 .08-.09.16-.21.16a.31.31 0 0 1-.19-.06l.05-.08c.03.02.08.05.12.05.04 0 .08-.02.08-.07s-.06-.08-.11-.12c-.06-.04-.1-.08-.1-.15 0-.1.08-.16.19-.16.06 0 .12.02.16.05l-.05.07Zm.43.16c-.07.02-.1.06-.1.13 0 .05.02.08.06.08.06 0 .14-.07.13-.24l-.09.03Zm.05.24a.23.23 0 0 1-.15.07c-.08 0-.16-.07-.16-.17s.08-.17.21-.2l.14-.04a.1.1 0 0 0-.1-.09.22.22 0 0 0-.16.06l-.05-.07a.32.32 0 0 1 .22-.08c.1 0 .23.04.23.21v.23c0 .04 0 .1.03.14h-.16a.17.17 0 0 1-.02-.09l-.03.03Zm.35.06h.15v-.83h-.15v.83Zm1.48-.3c-.07.02-.1.06-.1.13 0 .05.02.08.06.08.06 0 .14-.07.13-.24l-.09.03Zm.05.24a.23.23 0 0 1-.15.07c-.08 0-.16-.07-.16-.17s.08-.17.21-.2l.14-.04a.1.1 0 0 0-.1-.09.22.22 0 0 0-.16.06l-.05-.07a.32.32 0 0 1 .22-.08c.1 0 .23.04.23.21v.23c0 .04 0 .1.03.14h-.16a.18.18 0 0 1-.02-.09l-.03.03Zm.5-.44a.26.26 0 0 1 .2-.08c.13 0 .2.07.2.21v.37h-.15v-.35c0-.08-.04-.13-.12-.13-.07 0-.13.05-.13.14v.34h-.15v-.56h.15v.06Zm-1.33.4h.08c.09 0 .16-.04.16-.13 0-.1-.07-.13-.16-.13h-.08v.26Zm0-.36h.05c.1 0 .15-.06.15-.13s-.05-.1-.12-.1h-.08v.23Zm-.16.46v-.79h.29c.13 0 .22.06.22.17 0 .13-.1.18-.15.2.1 0 .2.07.2.19 0 .13-.11.23-.3.23h-.26Z" clip-rule="evenodd" opacity=".6"/>
	<defs>
		<linearGradient id="paint0_linear_2529_40331" x1="28" x2="28" y1="0" y2="40" gradientUnits="userSpaceOnUse">
			<stop stop-color="#373D3E"/>
			<stop offset="1" stop-color="#222526"/>
		</linearGradient>
	</defs>
</svg>
`
  , gr = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: ar
}, Symbol.toStringTag, {
  value: "Module"
}))
  , lr = `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 56 40">
	<rect width="56" height="40" fill="url(#paint0_linear_2529_40322)" rx="8"/>
	<path fill="#fff" d="M10.19 9.39V7.74c0-.46-.25-.68-.67-.68-.35 0-.65.2-.78.41-.08-.26-.3-.41-.63-.41a1 1 0 0 0-.74.35v-.3h-.6V9.4h.6V7.86a.6.6 0 0 1 .47-.27c.24 0 .34.15.34.36V9.4h.6V7.85a.6.6 0 0 1 .47-.26c.24 0 .34.15.34.36V9.4h.6Zm1.64.05c.75 0 1.2-.54 1.2-1.2 0-.64-.45-1.18-1.2-1.18s-1.2.54-1.2 1.19c0 .65.45 1.2 1.2 1.2Zm0-.53c-.37 0-.58-.3-.58-.66 0-.35.2-.66.58-.66.37 0 .58.3.58.66 0 .36-.21.66-.58.66Zm3.77.48v-1.6c0-.45-.23-.73-.73-.73-.37 0-.65.18-.8.35v-.3h-.6V9.4h.6V7.86c.1-.14.28-.27.52-.27.25 0 .42.1.42.42V9.4h.6Zm1.65.05c.75 0 1.2-.54 1.2-1.2 0-.64-.45-1.18-1.2-1.18s-1.2.54-1.2 1.19c0 .65.45 1.2 1.2 1.2Zm0-.53c-.37 0-.58-.3-.58-.66 0-.35.21-.66.58-.66s.59.3.59.66c0 .36-.22.66-.59.66Zm2.25-.25v-.8c.1-.16.32-.27.5-.27.36 0 .59.27.59.66 0 .4-.23.66-.58.66-.2 0-.41-.1-.51-.25Zm0 .73v-.3c.18.23.42.35.7.35.57 0 1-.43 1-1.19 0-.74-.42-1.2-1-1.2a.87.87 0 0 0-.7.36V6.25h-.6v3.14h.6Zm4.12 0V7.92c0-.66-.48-.86-1-.86-.35 0-.71.11-.99.36l.23.4a.95.95 0 0 1 .66-.27c.3 0 .5.15.5.38v.3c-.15-.17-.42-.27-.72-.27-.36 0-.8.2-.8.73 0 .5.44.75.8.75.3 0 .56-.1.72-.29v.24h.6Zm-1.08-.35c-.24 0-.43-.12-.43-.34 0-.22.2-.34.43-.34.2 0 .38.07.48.2v.28c-.1.13-.29.2-.48.2Zm3.8.35v-1.6c0-.45-.24-.73-.74-.73-.37 0-.65.18-.8.35v-.3h-.6V9.4h.6V7.86c.1-.14.29-.27.52-.27.26 0 .42.1.42.42V9.4h.6Zm2.81 0-.92-1.25.9-1.03h-.74l-.86 1.02V6.25h-.6v3.14h.6V8.8l.27-.29.6.88h.75Z"/>
	<path fill="#FFFFFE" fill-rule="evenodd" d="M28.8 10.42h.15v.48l.2-.23h.14l-.22.25.26.32h-.17l-.21-.3v.3h-.15v-.82Zm-7.17.03v.45c0 .16.04.24.17.24.12 0 .17-.1.17-.23v-.46h.14v.49c0 .2-.13.3-.31.3-.22 0-.33-.1-.33-.3v-.49h.16Zm.81.29a.26.26 0 0 1 .2-.08c.13 0 .2.07.2.21v.37h-.15v-.35c0-.08-.04-.13-.11-.13-.08 0-.13.05-.13.14v.34h-.15v-.56h.14v.06Zm.58.5h.15v-.56h-.15v.56ZM23 10.5c0-.04.04-.09.09-.09.05 0 .1.04.1.09a.1.1 0 0 1-.1.1c-.05 0-.09-.05-.09-.1Zm.5.74-.24-.57h.16c.05.13.1.25.14.4l.16-.4h.14l-.26.57h-.1Zm.8-.35c.01-.09-.02-.14-.1-.14s-.12.06-.12.14h.22Zm-.22.08c0 .1.07.18.16.18.06 0 .12-.02.16-.04l.04.08a.45.45 0 0 1-.22.06c-.17 0-.3-.12-.3-.3s.13-.29.29-.29c.17 0 .25.14.24.3h-.37Zm.66-.2.03-.04c.02-.02.05-.07.1-.07.03 0 .07.02.1.05l-.05.1a.14.14 0 0 0-.08-.01c-.05 0-.1.04-.1.16v.28h-.15v-.56h.15v.1Zm.63.01a.17.17 0 0 0-.1-.03c-.03 0-.06.01-.06.05 0 .05.05.07.12.12.08.06.1.12.1.17 0 .08-.09.16-.21.16a.31.31 0 0 1-.19-.06l.05-.08c.03.02.08.05.12.05.04 0 .08-.02.08-.07s-.06-.08-.11-.12c-.06-.04-.1-.08-.1-.15 0-.1.08-.16.19-.16.06 0 .12.02.16.05l-.05.07Zm.43.16c-.07.02-.1.06-.1.13 0 .05.02.08.06.08.06 0 .14-.07.13-.24l-.09.03Zm.05.24a.23.23 0 0 1-.15.07c-.08 0-.16-.07-.16-.17s.08-.17.21-.2l.14-.04a.1.1 0 0 0-.1-.09.22.22 0 0 0-.16.06l-.05-.07a.32.32 0 0 1 .22-.08c.1 0 .23.04.23.21v.23c0 .04 0 .1.03.14h-.16a.17.17 0 0 1-.02-.09l-.03.03Zm.35.06h.15v-.83h-.15v.83Zm1.48-.3c-.07.02-.1.06-.1.13 0 .05.02.08.06.08.06 0 .14-.07.13-.24l-.09.03Zm.05.24a.23.23 0 0 1-.15.07c-.08 0-.16-.07-.16-.17s.08-.17.21-.2l.14-.04a.1.1 0 0 0-.1-.09.22.22 0 0 0-.16.06l-.05-.07a.32.32 0 0 1 .22-.08c.1 0 .23.04.23.21v.23c0 .04 0 .1.03.14h-.16a.18.18 0 0 1-.02-.09l-.03.03Zm.5-.44a.26.26 0 0 1 .2-.08c.13 0 .2.07.2.21v.37h-.15v-.35c0-.08-.04-.13-.12-.13-.07 0-.13.05-.13.14v.34h-.15v-.56h.15v.06Zm-1.33.4h.08c.09 0 .16-.04.16-.13 0-.1-.07-.13-.16-.13h-.08v.26Zm0-.36h.05c.1 0 .15-.06.15-.13s-.05-.1-.12-.1h-.08v.23Zm-.16.46v-.79h.29c.13 0 .22.06.22.17 0 .13-.1.18-.15.2.1 0 .2.07.2.19 0 .13-.11.23-.3.23h-.26Z" clip-rule="evenodd" opacity=".6"/>
	<defs>
		<linearGradient id="paint0_linear_2529_40322" x1="28" x2="28" y1="0" y2="40" gradientUnits="userSpaceOnUse">
			<stop stop-color="#FFBBBA"/>
			<stop offset="1" stop-color="#F79392"/>
		</linearGradient>
	</defs>
</svg>
`
  , br = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: lr
}, Symbol.toStringTag, {
  value: "Module"
}))
  , rr = `<svg width="20" height="22" viewBox="0 0 20 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15 0C17.7614 0 20 2.23858 20 5V17C20 19.7614 17.7614 22 15 22H5C2.23858 22 8.05346e-08 19.7614 0 17V5C2.57711e-07 2.23858 2.23858 0 5 0H15ZM5.5 15C4.67157 15 4 15.6716 4 16.5C4 17.3284 4.67157 18 5.5 18C6.32843 18 7 17.3284 7 16.5C7 15.6716 6.32843 15 5.5 15ZM10 15C9.17157 15 8.5 15.6716 8.5 16.5C8.5 17.3284 9.17157 18 10 18C10.8284 18 11.5 17.3284 11.5 16.5C11.5 15.6716 10.8284 15 10 15ZM14.5 15C13.6716 15 13 15.6716 13 16.5C13 17.3284 13.6716 18 14.5 18C15.3284 18 16 17.3284 16 16.5C16 15.6716 15.3284 15 14.5 15ZM5.5 10C4.67157 10 4 10.6716 4 11.5C4 12.3284 4.67157 13 5.5 13C6.32843 13 7 12.3284 7 11.5C7 10.6716 6.32843 10 5.5 10ZM10 10C9.17157 10 8.5 10.6716 8.5 11.5C8.5 12.3284 9.17157 13 10 13C10.8284 13 11.5 12.3284 11.5 11.5C11.5 10.6716 10.8284 10 10 10ZM14.5 10C13.6716 10 13 10.6716 13 11.5C13 12.3284 13.6716 13 14.5 13C15.3284 13 16 12.3284 16 11.5C16 10.6716 15.3284 10 14.5 10ZM5.5 4C4.67157 4 4 4.67157 4 5.5C4 6.32843 4.67157 7 5.5 7H14.5C15.3284 7 16 6.32843 16 5.5C16 4.67157 15.3284 4 14.5 4H5.5Z" fill="#1E5DFF"/>
</svg>
`
  , Cr = Object.freeze(Object.defineProperty({
  __proto__: null,
  default: rr
}, Symbol.toStringTag, {
  value: "Module"
}));
export {vr as L, fr as _, dr as a, Ba as b, _r as c, hr as d, he as e, Ct as f, ur as g, yr as h, gr as i, br as j, Cr as k, pr as p, ht as r, mr as u};
