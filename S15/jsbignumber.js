parcelRequire = (function (e, r, t, n) {
    var i,
        o = "function" == typeof parcelRequire && parcelRequire,
        u = "function" == typeof require && require;
    function f(t, n) {
        if (!r[t]) {
            if (!e[t]) {
                var i = "function" == typeof parcelRequire && parcelRequire;
                if (!n && i) return i(t, !0);
                if (o) return o(t, !0);
                if (u && "string" == typeof t) return u(t);
                var c = new Error("Cannot find module '" + t + "'");
                throw ((c.code = "MODULE_NOT_FOUND"), c);
            }
            (p.resolve = function (r) {
                return e[t][1][r] || r;
            }),
                (p.cache = {});
            var l = (r[t] = new f.Module(t));
            e[t][0].call(l.exports, p, l, l.exports, this);
        }
        return r[t].exports;
        function p(e) {
            return f(p.resolve(e));
        }
    }
    (f.isParcelRequire = !0),
        (f.Module = function (e) {
            (this.id = e), (this.bundle = f), (this.exports = {});
        }),
        (f.modules = e),
        (f.cache = r),
        (f.parent = o),
        (f.register = function (r, t) {
            e[r] = [
                function (e, r) {
                    r.exports = t;
                },
                {},
            ];
        });
    for (var c = 0; c < t.length; c++)
        try {
            f(t[c]);
        } catch (e) {
            i || (i = e);
        }
    if (t.length) {
        var l = f(t[t.length - 1]);
        "object" == typeof exports && "undefined" != typeof module
            ? (module.exports = l)
            : "function" == typeof define && define.amd
            ? define(function () {
                  return l;
              })
            : n && (this[n] = l);
    }
    if (((parcelRequire = f), i)) throw i;
    return f;
})(
    {
        BHXf: [
            function (require, module, exports) {
                "use strict";
                Object.defineProperty(exports, "__esModule", { value: !0 }),
                    (exports.clearZero = function (e) {
                        return /\./.test(e) && (e = e.replace(/0+$/, "")), "" === (e = e.replace(/^0+/, "").replace(/\.$/, "").replace(/^\./, "0.")) ? "0" : e;
                    }),
                    (exports.getPrecision = function (e) {
                        return /\.(\d*)/.exec(e) ? RegExp.$1.length : 0;
                    }),
                    (exports.isNegative = function (e) {
                        return "-" === e[0];
                    }),
                    (exports.clearNegative = function (e) {
                        return e.replace("-", "");
                    }),
                    (exports.checkNumber = function (e) {
                        if ("[object Number]" === Object.prototype.toString.call(e)) {
                            if (((e = e.toString()), /[a-zA-Z]/.test(e))) throw new Error("checkNumber error, params must a number string or a number!");
                            return e;
                        }
                        if ("[object String]" === Object.prototype.toString.call(e)) {
                            if (/^-?\d+(\.\d+)?$/.test(e)) return e;
                            throw new Error("checkNumber error, params must a number string or a number!");
                        }
                        throw new Error("checkNumber error, params must a number string or a number!");
                    }),
                    (exports.setPrecision = function (e, r) {
                        var t = e.split("");
                        return (
                            r && r > 0 && r < e.length && t.splice(t.length - r, 0, "."),
                            r && r > 0 && r >= e.length && (t = (e = e.padStart(e.length + r, "0")).split("")).splice(t.length - r, 0, "."),
                            (t = (t = exports.clearZero(t.join(""))).replace(/\.$/, ""))
                        );
                    });
            },
            {},
        ],
        "/CXU": [
            function (require, module, exports) {
                "use strict";
                var e =
                    (this && this.__importDefault) ||
                    function (e) {
                        return e && e.__esModule ? e : { default: e };
                    };
                Object.defineProperty(exports, "__esModule", { value: !0 });
                var r,
                    t = require("./util"),
                    a = e(require("./add")),
                    i = "0";
                !(function (e) {
                    (e.Big = "Big"), (e.Small = "Small"), (e.Equal = "Equal");
                })((r = exports.Compare || (exports.Compare = {}))),
                    (exports.prevBigThanNext = function (e, a) {
                        (e = t.clearZero(e)), (a = t.clearZero(a));
                        var i = e.length,
                            l = a.length,
                            n = t.isNegative(e),
                            u = t.isNegative(a),
                            s = !1;
                        if (!n && u) return r.Big;
                        if (n && !u) return r.Small;
                        if ((n || u || (s = !0), i > l)) return s ? r.Big : r.Small;
                        if (i < l) return s ? r.Small : r.Big;
                        for (var c = 0; c < i; c++) {
                            if (~~e[c] > ~~a[c]) return s ? r.Big : r.Small;
                            if (~~e[c] < ~~a[c]) return s ? r.Small : r.Big;
                        }
                        return r.Equal;
                    });
                var l = function e(l, n) {
                    (l = t.checkNumber(l)), (n = t.checkNumber(n));
                    var u = t.getPrecision(l),
                        s = t.getPrecision(n),
                        c = Math.max(u, s),
                        o = t.isNegative(l),
                        g = t.isNegative(n);
                    if (((l = l.replace(".", "")), (n = n.replace(".", "")), (l = t.clearNegative(l)), (n = t.clearNegative(n)), (l += i.repeat(c - u)), (n += i.repeat(c - s)), !o && !g))
                        switch (exports.prevBigThanNext(l, n)) {
                            case r.Equal:
                                return "0";
                            case r.Small:
                                var f = e(n, l);
                                return "-" + (f = t.setPrecision(f, c));
                        }
                    if (!o && g) {
                        var v = a.default(n, l);
                        return (v = t.setPrecision(v, c));
                    }
                    if (o && !g) {
                        var h = a.default(l, n);
                        return "-" + (h = t.setPrecision(h, c));
                    }
                    if (o && g)
                        switch (exports.prevBigThanNext(l, n)) {
                            case r.Equal:
                                return "0";
                            case r.Big:
                                var p = e(l, n);
                                return "-" + (p = t.setPrecision(p, c));
                            case r.Small:
                                var m = e(n, l);
                                return (m = t.setPrecision(m, c));
                        }
                    var x = [],
                        B = 0,
                        N = Math.max(l.length, n.length);
                    (l = i.repeat(N - l.length) + l), (n = i.repeat(N - n.length) + n);
                    for (var d = l.length - 1; d >= 0; d--) {
                        var S = ~~l[d] - 0,
                            P = ~~n[d] - 0;
                        S - B >= P ? (x.unshift(S - P - B), (B = 0)) : (x.unshift(S + 10 - P - B), (B = 1));
                    }
                    return x.splice(x.length - c, 0, "."), (x = x.join("")), (x = t.clearZero(x)) || "0";
                };
                exports.default = l;
            },
            { "./util": "BHXf", "./add": "RyOD" },
        ],
        RyOD: [
            function (require, module, exports) {
                "use strict";
                var e =
                    (this && this.__importStar) ||
                    function (e) {
                        if (e && e.__esModule) return e;
                        var r = {};
                        if (null != e) for (var a in e) Object.hasOwnProperty.call(e, a) && (r[a] = e[a]);
                        return (r.default = e), r;
                    };
                Object.defineProperty(exports, "__esModule", { value: !0 });
                var r = require("./util"),
                    a = e(require("./substact")),
                    t = "0",
                    i = function (e, i) {
                        (e = r.checkNumber(e)), (i = r.checkNumber(i));
                        var l = "",
                            c = r.isNegative(e),
                            s = r.isNegative(i);
                        (e = r.clearNegative(e)), (i = r.clearNegative(i));
                        var p = r.getPrecision(e),
                            u = r.getPrecision(i),
                            n = Math.max(p, u);
                        if ((c && s && (l = "-"), !c && s))
                            switch (((e = e.replace(".", "")), (i = i.replace(".", "")), (e += t.repeat(n - p)), (i += t.repeat(n - u)), a.prevBigThanNext(e, i))) {
                                case a.Compare.Equal:
                                    return "0";
                                case a.Compare.Big:
                                    var o = a.default(e, i);
                                    return r.setPrecision(o, n);
                                case a.Compare.Small:
                                    var v = a.default(i, e);
                                    return "-" + r.setPrecision(v, n);
                            }
                        if (c && !s)
                            switch (((e = e.replace(".", "")), (i = i.replace(".", "")), (e += t.repeat(n - p)), (i += t.repeat(n - u)), a.prevBigThanNext(e, i))) {
                                case a.Compare.Equal:
                                    return "0";
                                case a.Compare.Big:
                                    var f = a.default(e, i);
                                    return "-" + r.setPrecision(f, n);
                                case a.Compare.Small:
                                    var g = a.default(i, e);
                                    return r.setPrecision(g, n);
                            }
                        (e += t.repeat(n - p)), (i += t.repeat(n - u));
                        for (var h = e.replace(".", "").split(""), m = i.replace(".", "").split(""), d = "", N = 0; h.length || m.length || N; ) (d = ((N += ~~h.pop() + ~~m.pop()) % 10) + d), (N = N > 9);
                        return (d = d.split("")), n && d.splice(d.length - n, 0, "."), l + (d = r.clearZero(d.join("")));
                    };
                exports.default = i;
            },
            { "./util": "BHXf", "./substact": "/CXU" },
        ],
        sfev: [
            function (require, module, exports) {
                "use strict";
                Object.defineProperty(exports, "__esModule", { value: !0 });
                var e = require("./util"),
                    r = function (r, t) {
                        (r = e.checkNumber(r)), (t = e.checkNumber(t));
                        var a = e.getPrecision(r) + e.getPrecision(t),
                            i = 0;
                        (r = e.isNegative(r) ? (i++, e.clearNegative(r)) : r), (t = e.isNegative(t) ? (i++, e.clearNegative(t)) : t);
                        for (var c = r.replace(".", "").split("").reverse(), s = t.replace(".", "").split("").reverse(), l = c.length, o = s.length, v = [], n = l + o; n--; ) v[n] = 0;
                        for (var p = 0; p < l; p++) for (var u = 0; u < o; u++) v[p + u] += parseInt(c[p], 0) * parseInt(s[u], 0);
                        n = v.length;
                        for (var g = 0; g < n; g++) {
                            var f = v[g];
                            f >= 10 && ((v[g] = f % 10), (v[g + 1] += Math.floor(f / 10)));
                        }
                        a && v.splice(a, 0, ".");
                        var h = v.reverse().join("");
                        return (h = e.clearZero(h)), 1 === i && (h = "-".concat(h)), h;
                    };
                exports.default = r;
            },
            { "./util": "BHXf" },
        ],
        Raov: [
            function (require, module, exports) {
                "use strict";
                var e =
                        (this && this.__importDefault) ||
                        function (e) {
                            return e && e.__esModule ? e : { default: e };
                        },
                    r =
                        (this && this.__importStar) ||
                        function (e) {
                            if (e && e.__esModule) return e;
                            var r = {};
                            if (null != e) for (var t in e) Object.hasOwnProperty.call(e, t) && (r[t] = e[t]);
                            return (r.default = e), r;
                        };
                Object.defineProperty(exports, "__esModule", { value: !0 });
                var t = require("./util"),
                    i = e(require("./multply")),
                    a = e(require("./add")),
                    n = r(require("./substact")),
                    l = "0",
                    u = function (e, r) {
                        for (var t = 0; t < 11; t++) if (n.prevBigThanNext(i.default(r, t.toString()), e) === n.Compare.Big) return "" + (t - 1);
                    },
                    o = function (e, r) {
                        var o = arguments.length > 2 && void 0 !== arguments[2] ? arguments[2] : 50;
                        if (((e = t.checkNumber(e)), "0" === (r = t.checkNumber(r)))) throw new Error("param error, the dividend cannot be zero!");
                        if ("0" === e) return "0";
                        var s = t.getPrecision(e),
                            f = t.getPrecision(r),
                            c = s + f,
                            h = ~~t.isNegative(e) + ~~t.isNegative(r) == 1 ? "-" : "";
                        (e = t.clearNegative(e.replace(".", ""))), (r = t.clearNegative(r.replace(".", ""))), (e += l.repeat(c - s)), (r += l.repeat(c - f)), (r = t.clearZero(r));
                        for (var v = 0, d = "", p = e.split(""), g = p.shift(); ; ) {
                            var _ = u(g, r),
                                b = 0 === p.length;
                            if (((d += _), (g = n.default(g, i.default(_, r))), (g += p.length > 0 ? p.shift() : /\./.test(d) ? "0" : ((d += "."), "0")), 0 === p.length && /\./.test(d) && v++, (b && "00" === g) || v > o + 1)) break;
                        }
                        if (/\./.test(d)) {
                            var m = d.split(".")[1];
                            if (m.length === o + 1)
                                if (((d = d.substr(0, d.length - 1)), ~~m[m.length - 1] > 4)) {
                                    var N = "0.".concat("0".repeat(o - 1), "1");
                                    d = a.default(d, N);
                                }
                        }
                        return !/\./.test(d) && t.setPrecision(d, c), h + t.clearZero(d);
                    };
                exports.default = o;
            },
            { "./util": "BHXf", "./multply": "sfev", "./add": "RyOD", "./substact": "/CXU" },
        ],
        "7QCb": [
            function (require, module, exports) {
                "use strict";
                var e =
                    (this && this.__importDefault) ||
                    function (e) {
                        return e && e.__esModule ? e : { default: e };
                    };
                Object.defineProperty(exports, "__esModule", { value: !0 });
                var t = e(require("./add")),
                    u = e(require("./multply")),
                    d = e(require("./divide")),
                    r = e(require("./substact")),
                    i = { add: t.default, multply: u.default, divide: d.default, substact: r.default, mul: u.default, div: d.default, sub: r.default };
                "undefined" != typeof window && (window.jsbignumber = i), (exports.default = i), (module.exports = i);
            },
            { "./add": "RyOD", "./multply": "sfev", "./divide": "Raov", "./substact": "/CXU" },
        ],
    },
    {},
    ["7QCb"],
    null
);
