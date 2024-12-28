var _TEXT = {
    Game: {
        Score: "Score",
        HighScore: "High Score"
    }
};
! function(b, c) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = b.document ? c(b, !0) : function(b) {
        if (!b.document) throw Error("jQuery requires a window with a document");
        return c(b)
    } : c(b)
}("undefined" != typeof window ? window : this, function(b, c) {
    function d(b, c) {
        c = c || A;
        var d = c.createElement("script");
        d.text = b;
        c.head.appendChild(d).parentNode.removeChild(d)
    }

    function f(b) {
        var c = !!b && "length" in b && b.length,
            d = l.type(b);
        return "function" !== d && !l.isWindow(b) && ("array" === d || 0 === c || "number" == typeof c && 0 < c && c - 1 in b)
    }

    function e(b, c) {
        return b.nodeName && b.nodeName.toLowerCase() === c.toLowerCase()
    }

    function g(b, c, d) {
        return l.isFunction(c) ? l.grep(b, function(b, y) {
            return !!c.call(b, y, b) !== d
        }) : c.nodeType ? l.grep(b, function(b) {
            return b === c !== d
        }) : "string" != typeof c ? l.grep(b, function(b) {
            return -1 < Ia.call(c, b) !== d
        }) : Cc.test(c) ? l.filter(c, b, d) : (c = l.filter(c, b), l.grep(b, function(b) {
            return -1 < Ia.call(c, b) !== d && 1 === b.nodeType
        }))
    }

    function m(b, c) {
        for (;
            (b = b[c]) && 1 !== b.nodeType;);
        return b
    }

    function p(b) {
        return b
    }

    function j(b) {
        throw b;
    }

    function n(b, c, d, e) {
        var j;
        try {
            b && l.isFunction(j = b.promise) ? j.call(b).done(c).fail(d) : b && l.isFunction(j = b.then) ? j.call(b, c, d) : c.apply(void 0, [b].slice(e))
        } catch (f) {
            d.apply(void 0, [f])
        }
    }

    function r() {
        A.removeEventListener("DOMContentLoaded", r);
        b.removeEventListener("load", r);
        l.ready()
    }

    function q() {
        this.expando = l.expando + q.uid++
    }

    function s(b, c, d) {
        var e;
        if (void 0 === d && 1 === b.nodeType)
            if (e = "data-" + c.replace(Dc, "-$&").toLowerCase(), d = b.getAttribute(e), "string" == typeof d) {
                try {
                    d = "true" === d || "false" !== d && ("null" === d ? null : d === +d + "" ? +d : Ec.test(d) ? JSON.parse(d) : d)
                } catch (j) {}
                S.set(b, c, d)
            } else d = void 0;
        return d
    }

    function t(b, c, d, e) {
        var j, f = 1,
            g = 20,
            n = e ? function() {
                return e.cur()
            } : function() {
                return l.css(b, c, "")
            },
            r = n(),
            q = d && d[3] || (l.cssNumber[c] ? "" : "px"),
            p = (l.cssNumber[c] || "px" !== q && +r) && Ja.exec(l.css(b, c));
        if (p && p[3] !== q) {
            q = q || p[3];
            d = d || [];
            p = +r || 1;
            do f = f || ".5", p /= f, l.style(b, c, p + q); while (f !== (f = n() / r) && 1 !== f && --g)
        }
        return d && (p = +p || +r || 0, j = d[1] ? p + (d[1] + 1) * d[2] : +d[2], e && (e.unit = q, e.start = p, e.end = j)), j
    }

    function u(b, c) {
        for (var d, e, j = [], f = 0, g = b.length; f < g; f++)
            if (e = b[f], e.style)
                if (d = e.style.display, c) {
                    if ("none" === d && (j[f] = E.get(e, "display") || null, j[f] || (e.style.display = "")), "" === e.style.display && Ua(e)) {
                        d = j;
                        var n = f,
                            r, q = void 0;
                        r = e.ownerDocument;
                        var p = e.nodeName;
                        r = (e = Hb[p]) ? e : (q = r.body.appendChild(r.createElement(p)), e = l.css(q, "display"), q.parentNode.removeChild(q), "none" === e && (e = "block"), Hb[p] = e, e);
                        d[n] = r
                    }
                } else "none" !== d && (j[f] = "none", E.set(e, "display", d));
        for (f = 0; f < g; f++) null != j[f] && (b[f].style.display = j[f]);
        return b
    }

    function x(b, c) {
        var d;
        return d = "undefined" != typeof b.getElementsByTagName ? b.getElementsByTagName(c || "*") : "undefined" != typeof b.querySelectorAll ? b.querySelectorAll(c || "*") : [], void 0 === c || c && e(b, c) ? l.merge([b], d) : d
    }

    function z(b, c) {
        for (var d = 0, e = b.length; d < e; d++) E.set(b[d], "globalEval", !c || E.get(c[d], "globalEval"))
    }

    function C(b, c, d, e, j) {
        for (var f, g, n, r, q = c.createDocumentFragment(), p = [], m = 0, s = b.length; m < s; m++)
            if (f = b[m], f || 0 === f)
                if ("object" === l.type(f)) l.merge(p, f.nodeType ? [f] : f);
                else if (Gc.test(f)) {
            g = g || q.appendChild(c.createElement("div"));
            n = (Ib.exec(f) || ["", ""])[1].toLowerCase();
            n = V[n] || V._default;
            g.innerHTML = n[1] + l.htmlPrefilter(f) + n[2];
            for (n = n[0]; n--;) g = g.lastChild;
            l.merge(p, g.childNodes);
            g = q.firstChild;
            g.textContent = ""
        } else p.push(c.createTextNode(f));
        q.textContent = "";
        for (m = 0; f = p[m++];)
            if (e && -1 < l.inArray(f, e)) j && j.push(f);
            else if (r = l.contains(f.ownerDocument, f), g = x(q.appendChild(f), "script"), r && z(g), d)
            for (n = 0; f = g[n++];) Jb.test(f.type || "") && d.push(f);
        return q
    }

    function O() {
        return !0
    }

    function H() {
        return !1
    }

    function Ka() {
        try {
            return A.activeElement
        } catch (b) {}
    }

    function La(b, c, d, e, j, f) {
        var g, n;
        if ("object" == typeof c) {
            "string" != typeof d && (e = e || d, d = void 0);
            for (n in c) La(b, n, d, e, c[n], f);
            return b
        }
        if (null == e && null == j ? (j = d, e = d = void 0) : null == j && ("string" == typeof d ? (j = e, e = void 0) : (j = e, e = d, d = void 0)), !1 === j) j = H;
        else if (!j) return b;
        return 1 === f && (g = j, j = function(b) {
            return l().off(b), g.apply(this, arguments)
        }, j.guid = g.guid || (g.guid = l.guid++)), b.each(function() {
            l.event.add(this, c, j, e, d)
        })
    }

    function Ca(b, c) {
        return e(b, "table") && e(11 !== c.nodeType ? c : c.firstChild, "tr") ? l(">tbody", b)[0] || b : b
    }

    function F(b) {
        return b.type = (null !== b.getAttribute("type")) + "/" + b.type, b
    }

    function U(b) {
        var c = Hc.exec(b.type);
        return c ? b.type = c[1] : b.removeAttribute("type"), b
    }

    function Ma(b, c) {
        var d, e, j, f, g, n;
        if (1 === c.nodeType) {
            if (E.hasData(b) && (d = E.access(b), e = E.set(c, d), n = d.events))
                for (j in delete e.handle, e.events = {}, n) {
                    d = 0;
                    for (e = n[j].length; d < e; d++) l.event.add(c, j, n[j][d])
                }
            S.hasData(b) && (f = S.access(b), g = l.extend({}, f), S.set(c, g))
        }
    }

    function la(b, c, e, j) {
        c = Kb.apply([], c);
        var f, g, n, r, q = 0,
            p = b.length,
            m = p - 1,
            s = c[0],
            t = l.isFunction(s);
        if (t || 1 < p && "string" == typeof s && !K.checkClone && Ic.test(s)) return b.each(function(d) {
            var f = b.eq(d);
            t && (c[0] = s.call(this, d, f.html()));
            la(f, c, e, j)
        });
        if (p && (f = C(c, b[0].ownerDocument, !1, b, j), g = f.firstChild, 1 === f.childNodes.length && (f = g), g || j)) {
            g = l.map(x(f, "script"), F);
            for (n = g.length; q < p; q++) r = f, q !== m && (r = l.clone(r, !0, !0), n && l.merge(g, x(r, "script"))), e.call(b[q], r, q);
            if (n) {
                f = g[g.length - 1].ownerDocument;
                l.map(g, U);
                for (q = 0; q < n; q++) r = g[q], Jb.test(r.type || "") && !E.access(r, "globalEval") && l.contains(f, r) && (r.src ? l._evalUrl && l._evalUrl(r.src) : d(r.textContent.replace(Kc, ""), f))
            }
        }
        return b
    }

    function Va(b, c, d) {
        for (var e = c ? l.filter(c, b) : b, j = 0; null != (c = e[j]); j++) d || 1 !== c.nodeType || l.cleanData(x(c)), c.parentNode && (d && l.contains(c.ownerDocument, c) && z(x(c, "script")), c.parentNode.removeChild(c));
        return b
    }

    function Na(b, c, d) {
        var e, j, f, g, n = b.style;
        return d = d || Wa(b), d && (g = d.getPropertyValue(c) || d[c], "" !== g || l.contains(b.ownerDocument, b) || (g = l.style(b, c)), !K.pixelMarginRight() && ob.test(g) && Lb.test(c) && (e = n.width, j = n.minWidth, f = n.maxWidth, n.minWidth = n.maxWidth = n.width = g, g = d.width, n.width = e, n.minWidth = j, n.maxWidth = f)), void 0 !== g ? g + "" : g
    }

    function Mb(b, c) {
        return {
            get: function() {
                return b() ? void delete this.get : (this.get = c).apply(this, arguments)
            }
        }
    }

    function W(b) {
        var c = l.cssProps[b];
        if (!c) {
            var c = l.cssProps,
                d;
            a: if (d = b, !(d in Nb)) {
                for (var e = d[0].toUpperCase() + d.slice(1), j = Ob.length; j--;)
                    if (d = Ob[j] + e, d in Nb) break a;
                d = void 0
            }
            c = c[b] = d || b
        }
        return c
    }

    function X(b, c, d) {
        return (b = Ja.exec(c)) ? Math.max(0, b[2] - (d || 0)) + (b[3] || "px") : c
    }

    function Y(b, c, d, e, j) {
        var f = 0;
        for (c = d === (e ? "border" : "content") ? 4 : "width" === c ? 1 : 0; 4 > c; c += 2) "margin" === d && (f += l.css(b, d + ra[c], !0, j)), e ? ("content" === d && (f -= l.css(b, "padding" + ra[c], !0, j)), "margin" !== d && (f -= l.css(b, "border" + ra[c] + "Width", !0, j))) : (f += l.css(b, "padding" + ra[c], !0, j), "padding" !== d && (f += l.css(b, "border" + ra[c] + "Width", !0, j)));
        return f
    }

    function Pb(b, c, d) {
        var e, j = Wa(b),
            f = Na(b, c, j),
            g = "border-box" === l.css(b, "boxSizing", !1, j);
        return ob.test(f) ? f : (e = g && (K.boxSizingReliable() || f === b.style[c]), "auto" === f && (f = b["offset" + c[0].toUpperCase() + c.slice(1)]), f = parseFloat(f) || 0, f + Y(b, c, d || (g ? "border" : "content"), e, j) + "px")
    }

    function P(b, c, d, e, j) {
        return new P.prototype.init(b, c, d, e, j)
    }

    function ma() {
        Xa && (!1 === A.hidden && b.requestAnimationFrame ? b.requestAnimationFrame(ma) : b.setTimeout(ma, l.fx.interval), l.fx.tick())
    }

    function T() {
        return b.setTimeout(function() {
            Da = void 0
        }), Da = l.now()
    }

    function Q(b, c) {
        var d, e = 0,
            j = {
                height: b
            };
        for (c = c ? 1 : 0; 4 > e; e += 2 - c) d = ra[e], j["margin" + d] = j["padding" + d] = b;
        return c && (j.opacity = j.width = b), j
    }

    function Qb(b, c, d) {
        for (var e, j = (da.tweeners[c] || []).concat(da.tweeners["*"]), f = 0, g = j.length; f < g; f++)
            if (e = j[f].call(d, c, b)) return e
    }

    function da(b, c, d) {
        var e, j, f = 0,
            g = da.prefilters.length,
            n = l.Deferred().always(function() {
                delete r.elem
            }),
            r = function() {
                if (j) return !1;
                for (var c = Da || T(), c = Math.max(0, q.startTime + q.duration - c), d = 1 - (c / q.duration || 0), e = 0, G = q.tweens.length; e < G; e++) q.tweens[e].run(d);
                return n.notifyWith(b, [q, d,
                    c
                ]), 1 > d && G ? c : (G || n.notifyWith(b, [q, 1, 0]), n.resolveWith(b, [q]), !1)
            },
            q = n.promise({
                elem: b,
                props: l.extend({}, c),
                opts: l.extend(!0, {
                    specialEasing: {},
                    easing: l.easing._default
                }, d),
                originalProperties: c,
                originalOptions: d,
                startTime: Da || T(),
                duration: d.duration,
                tweens: [],
                createTween: function(c, d) {
                    var e = l.Tween(b, q.opts, c, d, q.opts.specialEasing[c] || q.opts.easing);
                    return q.tweens.push(e), e
                },
                stop: function(c) {
                    var d = 0,
                        e = c ? q.tweens.length : 0;
                    if (j) return this;
                    for (j = !0; d < e; d++) q.tweens[d].run(1);
                    return c ? (n.notifyWith(b, [q, 1, 0]), n.resolveWith(b, [q, c])) : n.rejectWith(b, [q, c]), this
                }
            });
        c = q.props;
        d = q.opts.specialEasing;
        var p, m, s, t;
        for (e in c)
            if (p = l.camelCase(e), m = d[p], s = c[e], Array.isArray(s) && (m = s[1], s = c[e] = s[0]), e !== p && (c[p] = s, delete c[e]), t = l.cssHooks[p], t && "expand" in t)
                for (e in s = t.expand(s), delete c[p], s) e in c || (c[e] = s[e], d[e] = m);
            else d[p] = m;
        for (; f < g; f++)
            if (e = da.prefilters[f].call(q, b, c, q.opts)) return l.isFunction(e.stop) && (l._queueHooks(q.elem, q.opts.queue).stop = l.proxy(e.stop, e)), e;
        return l.map(c, Qb, q), l.isFunction(q.opts.start) && q.opts.start.call(b, q), q.progress(q.opts.progress).done(q.opts.done, q.opts.complete).fail(q.opts.fail).always(q.opts.always), l.fx.timer(l.extend(r, {
            elem: b,
            anim: q,
            queue: q.opts.queue
        })), q
    }

    function sa(b) {
        return (b.match(Z) || []).join(" ")
    }

    function ta(b) {
        return b.getAttribute && b.getAttribute("class") || ""
    }

    function pb(b, c, d, e) {
        var j;
        if (Array.isArray(c)) l.each(c, function(c, G) {
            d || Lc.test(b) ? e(b, G) : pb(b + "[" + ("object" == typeof G && null != G ? c : "") + "]", G, d, e)
        });
        else if (d || "object" !== l.type(c)) e(b, c);
        else
            for (j in c) pb(b + "[" + j + "]", c[j], d, e)
    }

    function Rb(b) {
        return function(c, d) {
            "string" != typeof c && (d = c, c = "*");
            var e, j = 0,
                f = c.toLowerCase().match(Z) || [];
            if (l.isFunction(d))
                for (; e = f[j++];) "+" === e[0] ? (e = e.slice(1) || "*", (b[e] = b[e] || []).unshift(d)) : (b[e] = b[e] || []).push(d)
        }
    }

    function Sb(b, c, d, e) {
        function j(n) {
            var r;
            return f[n] = !0, l.each(b[n] || [], function(b, y) {
                var l = y(c, d, e);
                return "string" != typeof l || g || f[l] ? g ? !(r = l) : void 0 : (c.dataTypes.unshift(l), j(l), !1)
            }), r
        }
        var f = {},
            g = b === qb;
        return j(c.dataTypes[0]) || !f["*"] && j("*")
    }

    function rb(b, c) {
        var d, e, j = l.ajaxSettings.flatOptions || {};
        for (d in c) void 0 !== c[d] && ((j[d] ? b : e || (e = {}))[d] = c[d]);
        return e && l.extend(!0, b, e), b
    }
    var ua = [],
        A = b.document,
        Mc = Object.getPrototypeOf,
        va = ua.slice,
        Kb = ua.concat,
        sb = ua.push,
        Ia = ua.indexOf,
        Ya = {},
        Tb = Ya.toString,
        Za = Ya.hasOwnProperty,
        Ub = Za.toString,
        Nc = Ub.call(Object),
        K = {},
        l = function(b, c) {
            return new l.fn.init(b, c)
        },
        Oc = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
        Pc = /^-ms-/,
        Qc = /-([a-z])/g,
        Rc = function(b, c) {
            return c.toUpperCase()
        };
    l.fn = l.prototype = {
        jquery: "3.2.1",
        constructor: l,
        length: 0,
        toArray: function() {
            return va.call(this)
        },
        get: function(b) {
            return null == b ? va.call(this) : 0 > b ? this[b + this.length] : this[b]
        },
        pushStack: function(b) {
            b = l.merge(this.constructor(), b);
            return b.prevObject = this, b
        },
        each: function(b) {
            return l.each(this, b)
        },
        map: function(b) {
            return this.pushStack(l.map(this, function(c, d) {
                return b.call(c, d, c)
            }))
        },
        slice: function() {
            return this.pushStack(va.apply(this, arguments))
        },
        first: function() {
            return this.eq(0)
        },
        last: function() {
            return this.eq(-1)
        },
        eq: function(b) {
            var c = this.length;
            b = +b + (0 > b ? c : 0);
            return this.pushStack(0 <= b && b < c ? [this[b]] : [])
        },
        end: function() {
            return this.prevObject || this.constructor()
        },
        push: sb,
        sort: ua.sort,
        splice: ua.splice
    };
    l.extend = l.fn.extend = function() {
        var b, c, d, e, j, f, g = arguments[0] || {},
            n = 1,
            r = arguments.length,
            q = !1;
        "boolean" == typeof g && (q = g, g = arguments[n] || {}, n++);
        "object" == typeof g || l.isFunction(g) || (g = {});
        for (n === r && (g = this, n--); n < r; n++)
            if (null != (b = arguments[n]))
                for (c in b) d = g[c], e = b[c], g !== e && (q && e && (l.isPlainObject(e) || (j = Array.isArray(e))) ? (j ? (j = !1, f = d && Array.isArray(d) ? d : []) : f = d && l.isPlainObject(d) ? d : {}, g[c] = l.extend(q, f, e)) : void 0 !== e && (g[c] = e));
        return g
    };
    l.extend({
        expando: "jQuery" + ("3.2.1" + Math.random()).replace(/\D/g, ""),
        isReady: !0,
        error: function(b) {
            throw Error(b);
        },
        noop: function() {},
        isFunction: function(b) {
            return "function" === l.type(b)
        },
        isWindow: function(b) {
            return null != b && b === b.window
        },
        isNumeric: function(b) {
            var c = l.type(b);
            return ("number" === c || "string" === c) && !isNaN(b - parseFloat(b))
        },
        isPlainObject: function(b) {
            var c, d;
            return !(!b || "[object Object]" !== Tb.call(b)) && (!(c = Mc(b)) || (d = Za.call(c, "constructor") && c.constructor, "function" == typeof d && Ub.call(d) === Nc))
        },
        isEmptyObject: function(b) {
            for (var c in b) return !1;
            return !0
        },
        type: function(b) {
            return null == b ? b + "" : "object" == typeof b || "function" == typeof b ? Ya[Tb.call(b)] || "object" : typeof b
        },
        globalEval: function(b) {
            d(b)
        },
        camelCase: function(b) {
            return b.replace(Pc, "ms-").replace(Qc, Rc)
        },
        each: function(b, c) {
            var d, e = 0;
            if (f(b))
                for (d = b.length; e < d && !1 !== c.call(b[e], e, b[e]); e++);
            else
                for (e in b)
                    if (!1 === c.call(b[e], e, b[e])) break;
            return b
        },
        trim: function(b) {
            return null == b ? "" : (b + "").replace(Oc, "")
        },
        makeArray: function(b, c) {
            var d = c || [];
            return null != b && (f(Object(b)) ? l.merge(d, "string" == typeof b ? [b] : b) : sb.call(d, b)), d
        },
        inArray: function(b, c, d) {
            return null == c ? -1 : Ia.call(c, b, d)
        },
        merge: function(b, c) {
            for (var d = +c.length, e = 0, j = b.length; e < d; e++) b[j++] = c[e];
            return b.length = j, b
        },
        grep: function(b, c, d) {
            for (var e = [], j = 0, f = b.length, g = !d; j < f; j++) d = !c(b[j], j), d !== g && e.push(b[j]);
            return e
        },
        map: function(b, c, d) {
            var e, j, g = 0,
                l = [];
            if (f(b))
                for (e = b.length; g < e; g++) j = c(b[g], g, d), null != j && l.push(j);
            else
                for (g in b) j = c(b[g], g, d), null != j && l.push(j);
            return Kb.apply([], l)
        },
        guid: 1,
        proxy: function(b, c) {
            var d, e, j;
            if ("string" == typeof c && (d = b[c], c = b, b = d), l.isFunction(b)) return e = va.call(arguments, 2), j = function() {
                return b.apply(c || this, e.concat(va.call(arguments)))
            }, j.guid = b.guid = b.guid || l.guid++, j
        },
        now: Date.now,
        support: K
    });
    "function" == typeof Symbol && (l.fn[Symbol.iterator] = ua[Symbol.iterator]);
    l.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), function(b, c) {
        Ya["[object " + c + "]"] = c.toLowerCase()
    });
    var na, tb = b,
        J = function(b, c, d, e) {
            var j, f, g, l, n, r = c && c.ownerDocument,
                q = c ? c.nodeType : 9;
            if (d = d || [], "string" != typeof b || !b || 1 !== q && 9 !== q && 11 !== q) return d;
            if (!e && ((c ? c.ownerDocument || c : aa) !== D && oa(c), c = c || D, ba)) {
                if (11 !== q && (l = Sc.exec(b)))
                    if (j = l[1])
                        if (9 === q) {
                            if (!(f = c.getElementById(j))) return d;
                            if (f.id === j) return d.push(f), d
                        } else {
                            if (r && (f = r.getElementById(j)) && Oa(c, f) && f.id === j) return d.push(f), d
                        }
                else {
                    if (l[2]) return pa.apply(d, c.getElementsByTagName(b)),
                        d;
                    if ((j = l[3]) && L.getElementsByClassName && c.getElementsByClassName) return pa.apply(d, c.getElementsByClassName(j)), d
                }
                if (L.qsa && !$a[b + " "] && (!R || !R.test(b))) {
                    if (1 !== q) r = c, n = b;
                    else if ("object" !== c.nodeName.toLowerCase()) {
                        (g = c.getAttribute("id")) ? g = g.replace(Vb, Wb): c.setAttribute("id", g = N);
                        f = Pa(b);
                        for (j = f.length; j--;) f[j] = "#" + g + " " + ab(f[j]);
                        n = f.join(",");
                        r = ub.test(b) && vb(c.parentNode) || c
                    }
                    if (n) try {
                        return pa.apply(d, r.querySelectorAll(n)), d
                    } catch (p) {} finally {
                        g === N && c.removeAttribute("id")
                    }
                }
            }
            return Xb(b.replace(bb, "$1"), c, d, e)
        },
        wb = function() {
            function b(d, e) {
                return c.push(d + " ") > B.cacheLength && delete b[c.shift()], b[d + " "] = e
            }
            var c = [];
            return b
        },
        ea = function(b) {
            return b[N] = !0, b
        },
        ga = function(b) {
            var c = D.createElement("fieldset");
            try {
                return !!b(c)
            } catch (d) {
                return !1
            } finally {
                c.parentNode && c.parentNode.removeChild(c)
            }
        },
        xb = function(b, c) {
            for (var d = b.split("|"), e = d.length; e--;) B.attrHandle[d[e]] = c
        },
        Yb = function(b, c) {
            var d = c && b,
                e = d && 1 === b.nodeType && 1 === c.nodeType && b.sourceIndex - c.sourceIndex;
            if (e) return e;
            if (d)
                for (; d = d.nextSibling;)
                    if (d === c) return -1;
            return b ? 1 : -1
        },
        Tc = function(b) {
            return function(c) {
                return "input" === c.nodeName.toLowerCase() && c.type === b
            }
        },
        Uc = function(b) {
            return function(c) {
                var d = c.nodeName.toLowerCase();
                return ("input" === d || "button" === d) && c.type === b
            }
        },
        Zb = function(b) {
            return function(c) {
                return "form" in c ? c.parentNode && !1 === c.disabled ? "label" in c ? "label" in c.parentNode ? c.parentNode.disabled === b : c.disabled === b : c.isDisabled === b || c.isDisabled !== !b && Vc(c) === b : c.disabled === b : "label" in c && c.disabled === b
            }
        },
        wa = function(b) {
            return ea(function(c) {
                return c = +c, ea(function(d, e) {
                    for (var j, f = b([], d.length, c), g = f.length; g--;) d[j = f[g]] && (d[j] = !(e[j] = d[j]))
                })
            })
        },
        vb = function(b) {
            return b && "undefined" != typeof b.getElementsByTagName && b
        },
        $b = function() {},
        ab = function(b) {
            for (var c = 0, d = b.length, e = ""; c < d; c++) e += b[c].value;
            return e
        },
        cb = function(b, c, d) {
            var e = c.dir,
                j = c.next,
                f = j || e,
                g = d && "parentNode" === f,
                l = Wc++;
            return c.first ? function(c, d, j) {
                for (; c = c[e];)
                    if (1 === c.nodeType || g) return b(c, d, j);
                return !1
            } : function(c, d, G) {
                var I, n, r, q = [ha, l];
                if (G)
                    for (; c = c[e];) {
                        if ((1 === c.nodeType || g) && b(c, d, G)) return !0
                    } else
                        for (; c = c[e];)
                            if (1 === c.nodeType || g)
                                if (r = c[N] || (c[N] = {}), n = r[c.uniqueID] || (r[c.uniqueID] = {}), j && j === c.nodeName.toLowerCase()) c = c[e] || c;
                                else {
                                    if ((I = n[f]) && I[0] === ha && I[1] === l) return q[2] = I[2];
                                    if (n[f] = q, q[2] = b(c, d, G)) return !0
                                }
                return !1
            }
        },
        yb = function(b) {
            return 1 < b.length ? function(c, d, e) {
                for (var j = b.length; j--;)
                    if (!b[j](c, d, e)) return !1;
                return !0
            } : b[0]
        },
        db = function(b, c, d, e, j) {
            for (var f, g = [], l = 0, n = b.length, r = null != c; l < n; l++)(f = b[l]) && (d && !d(f, e, j) || (g.push(f), r && c.push(l)));
            return g
        },
        zb = function(b, c, d, e, j, f) {
            return e && !e[N] && (e = zb(e)), j && !j[N] && (j = zb(j, f)), ea(function(f, g, l, n) {
                var r, q, p = [],
                    Aa = [],
                    m = g.length,
                    s;
                if (!(s = f)) {
                    s = c || "*";
                    for (var t = l.nodeType ? [l] : l, u = [], x = 0, z = t.length; x < z; x++) J(s, t[x], u);
                    s = u
                }
                s = !b || !f && c ? s : db(s, p, b, l, n);
                t = d ? j || (f ? b : m || e) ? [] : g : s;
                if (d && d(s, t, l, n), e) {
                    r = db(t, Aa);
                    e(r, [], l, n);
                    for (l = r.length; l--;)(q = r[l]) && (t[Aa[l]] = !(s[Aa[l]] = q))
                }
                if (f) {
                    if (j || b) {
                        if (j) {
                            r = [];
                            for (l = t.length; l--;)(q = t[l]) && r.push(s[l] = q);
                            j(null, t = [], r, n)
                        }
                        for (l = t.length; l--;)(q = t[l]) && -1 < (r = j ? xa(f, q) : p[l]) && (f[r] = !(g[r] = q))
                    }
                } else t = db(t === g ? t.splice(m, t.length) : t), j ? j(null, g, t, n) : pa.apply(g, t)
            })
        },
        Ab = function(b) {
            var c, d, e, j = b.length,
                f = B.relative[b[0].type];
            d = f || B.relative[" "];
            for (var g = f ? 1 : 0, l = cb(function(b) {
                    return b === c
                }, d, !0), n = cb(function(b) {
                    return -1 < xa(c, b)
                }, d, !0), r = [function(b, d, y) {
                    b = !f && (y || d !== eb) || ((c = d).nodeType ? l(b, d, y) : n(b, d, y));
                    return c = null, b
                }]; g < j; g++)
                if (d = B.relative[b[g].type]) r = [cb(yb(r), d)];
                else {
                    if (d = B.filter[b[g].type].apply(null, b[g].matches), d[N]) {
                        for (e = ++g; e < j && !B.relative[b[e].type]; e++);
                        return zb(1 < g && yb(r), 1 < g && ab(b.slice(0, g - 1).concat({
                            value: " " === b[g - 2].type ? "*" : ""
                        })).replace(bb, "$1"), d, g < e && Ab(b.slice(g, e)), e < j && Ab(b = b.slice(e)), e < j && ab(b))
                    }
                    r.push(d)
                }
            return yb(r)
        },
        Ea, L, B, fb, ac, Pa, Bb, Xb, eb, qa, Fa, oa, D, ca, ba, R, ya, gb, Oa, N = "sizzle" + 1 * new Date,
        aa = tb.document,
        ha = 0,
        Wc = 0,
        bc = wb(),
        cc = wb(),
        $a = wb(),
        Cb = function(b, c) {
            return b === c && (Fa = !0), 0
        },
        Xc = {}.hasOwnProperty,
        za = [],
        Yc = za.pop,
        Zc = za.push,
        pa = za.push,
        dc = za.slice,
        xa = function(b, c) {
            for (var d = 0, e = b.length; d < e; d++)
                if (b[d] === c) return d;
            return -1
        },
        $c = /[\x20\t\r\n\f]+/g,
        bb = /^[\x20\t\r\n\f]+|((?:^|[^\\])(?:\\.)*)[\x20\t\r\n\f]+$/g,
        ad = /^[\x20\t\r\n\f]*,[\x20\t\r\n\f]*/,
        bd = /^[\x20\t\r\n\f]*([>+~]|[\x20\t\r\n\f])[\x20\t\r\n\f]*/,
        cd = /=[\x20\t\r\n\f]*([^\]'"]*?)[\x20\t\r\n\f]*\]/g,
        dd = RegExp(":((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"),
        ed = /^(?:\\.|[\w-]|[^\x00-\xa0])+$/,
        hb = {
            ID: /^#((?:\\.|[\w-]|[^\x00-\xa0])+)/,
            CLASS: /^\.((?:\\.|[\w-]|[^\x00-\xa0])+)/,
            TAG: /^((?:\\.|[\w-]|[^\x00-\xa0])+|[*])/,
            ATTR: RegExp("^\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\]"),
            PSEUDO: RegExp("^:((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)"),
            CHILD: RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\([\\x20\\t\\r\\n\\f]*(even|odd|(([+-]|)(\\d*)n|)[\\x20\\t\\r\\n\\f]*(?:([+-]|)[\\x20\\t\\r\\n\\f]*(\\d+)|))[\\x20\\t\\r\\n\\f]*\\)|)", "i"),
            bool: RegExp("^(?:checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)$", "i"),
            needsContext: RegExp("^[\\x20\\t\\r\\n\\f]*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\([\\x20\\t\\r\\n\\f]*((?:-\\d)?\\d*)[\\x20\\t\\r\\n\\f]*\\)|)(?=[^-]|$)", "i")
        },
        fd = /^(?:input|select|textarea|button)$/i,
        gd = /^h\d$/i,
        Qa = /^[^{]+\{\s*\[native \w/,
        Sc = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,
        ub = /[+~]/,
        ia = /\\([\da-f]{1,6}[\x20\t\r\n\f]?|([\x20\t\r\n\f])|.)/ig,
        ja = function(b, c, d) {
            b = "0x" + c - 65536;
            return b !== b || d ? c : 0 > b ? String.fromCharCode(b + 65536) : String.fromCharCode(b >> 10 | 55296, 1023 & b | 56320)
        },
        Vb = /([\0-\x1f\x7f]|^-?\d)|^-$|[^\0-\x1f\x7f-\uFFFF\w-]/g,
        Wb = function(b, c) {
            return c ? "\x00" === b ? "\ufffd" : b.slice(0, -1) + "\\" + b.charCodeAt(b.length - 1).toString(16) + " " : "\\" + b
        },
        ec = function() {
            oa()
        },
        Vc = cb(function(b) {
            return !0 === b.disabled && ("form" in b || "label" in b)
        }, {
            dir: "parentNode",
            next: "legend"
        });
    try {
        pa.apply(za = dc.call(aa.childNodes), aa.childNodes), za[aa.childNodes.length].nodeType
    } catch (Jd) {
        pa = {
            apply: za.length ? function(b, c) {
                Zc.apply(b, dc.call(c))
            } : function(b, c) {
                for (var d = b.length, e = 0; b[d++] = c[e++];);
                b.length = d - 1
            }
        }
    }
    L = J.support = {};
    ac = J.isXML = function(b) {
        b = b && (b.ownerDocument || b).documentElement;
        return !!b && "HTML" !== b.nodeName
    };
    oa = J.setDocument = function(b) {
        var c, d;
        b = b ? b.ownerDocument || b : aa;
        return b !== D && 9 === b.nodeType && b.documentElement ? (D = b, ca = D.documentElement, ba = !ac(D), aa !== D && (d = D.defaultView) && d.top !== d && (d.addEventListener ? d.addEventListener("unload", ec, !1) : d.attachEvent && d.attachEvent("onunload", ec)), L.attributes = ga(function(b) {
            return b.className = "i", !b.getAttribute("className")
        }), L.getElementsByTagName = ga(function(b) {
            return b.appendChild(D.createComment("")), !b.getElementsByTagName("*").length
        }), L.getElementsByClassName = Qa.test(D.getElementsByClassName), L.getById = ga(function(b) {
            return ca.appendChild(b).id = N, !D.getElementsByName || !D.getElementsByName(N).length
        }), L.getById ? (B.filter.ID = function(b) {
            var c = b.replace(ia, ja);
            return function(b) {
                return b.getAttribute("id") === c
            }
        }, B.find.ID = function(b, c) {
            if ("undefined" != typeof c.getElementById && ba) {
                var d = c.getElementById(b);
                return d ? [d] : []
            }
        }) : (B.filter.ID = function(b) {
            var c = b.replace(ia, ja);
            return function(b) {
                return (b = "undefined" != typeof b.getAttributeNode && b.getAttributeNode("id")) && b.value === c
            }
        }, B.find.ID = function(b, c) {
            if ("undefined" != typeof c.getElementById && ba) {
                var d, y, e, j = c.getElementById(b);
                if (j) {
                    if (d = j.getAttributeNode("id"), d && d.value === b) return [j];
                    e = c.getElementsByName(b);
                    for (y = 0; j = e[y++];)
                        if (d = j.getAttributeNode("id"), d && d.value === b) return [j]
                }
                return []
            }
        }), B.find.TAG = L.getElementsByTagName ? function(b, c) {
            return "undefined" != typeof c.getElementsByTagName ? c.getElementsByTagName(b) : L.qsa ? c.querySelectorAll(b) : void 0
        } : function(b, c) {
            var d, y = [],
                e = 0,
                j = c.getElementsByTagName(b);
            if ("*" === b) {
                for (; d = j[e++];) 1 === d.nodeType && y.push(d);
                return y
            }
            return j
        }, B.find.CLASS = L.getElementsByClassName && function(b, c) {
            if ("undefined" != typeof c.getElementsByClassName && ba) return c.getElementsByClassName(b)
        }, ya = [], R = [], (L.qsa = Qa.test(D.querySelectorAll)) && (ga(function(b) {
            ca.appendChild(b).innerHTML = "<a id='" + N + "'></a><select id='" + N + "-\r\\' msallowcapture=''><option selected=''></option></select>";
            b.querySelectorAll("[msallowcapture^='']").length && R.push("[*^$]=[\\x20\\t\\r\\n\\f]*(?:''|\"\")");
            b.querySelectorAll("[selected]").length || R.push("\\[[\\x20\\t\\r\\n\\f]*(?:value|checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped)");
            b.querySelectorAll("[id~=" + N + "-]").length || R.push("~=");
            b.querySelectorAll(":checked").length || R.push(":checked");
            b.querySelectorAll("a#" + N + "+*").length || R.push(".#.+[+~]")
        }), ga(function(b) {
            b.innerHTML = "<a href='' disabled='disabled'></a><select disabled='disabled'><option/></select>";
            var c = D.createElement("input");
            c.setAttribute("type", "hidden");
            b.appendChild(c).setAttribute("name", "D");
            b.querySelectorAll("[name=d]").length && R.push("name[\\x20\\t\\r\\n\\f]*[*^$|!~]?=");
            2 !== b.querySelectorAll(":enabled").length && R.push(":enabled", ":disabled");
            ca.appendChild(b).disabled = !0;
            2 !== b.querySelectorAll(":disabled").length && R.push(":enabled", ":disabled");
            b.querySelectorAll("*,:x");
            R.push(",.*:")
        })), (L.matchesSelector = Qa.test(gb = ca.matches || ca.webkitMatchesSelector || ca.mozMatchesSelector || ca.oMatchesSelector || ca.msMatchesSelector)) && ga(function(b) {
            L.disconnectedMatch = gb.call(b, "*");
            gb.call(b, "[s!='']:x");
            ya.push("!=", ":((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|\\[[\\x20\\t\\r\\n\\f]*((?:\\\\.|[\\w-]|[^\x00-\\xa0])+)(?:[\\x20\\t\\r\\n\\f]*([*^$|!~]?=)[\\x20\\t\\r\\n\\f]*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|((?:\\\\.|[\\w-]|[^\x00-\\xa0])+))|)[\\x20\\t\\r\\n\\f]*\\])*)|.*)\\)|)")
        }), R = R.length && RegExp(R.join("|")), ya = ya.length && RegExp(ya.join("|")), c = Qa.test(ca.compareDocumentPosition), Oa = c || Qa.test(ca.contains) ? function(b, c) {
            var d = 9 === b.nodeType ? b.documentElement : b,
                y = c && c.parentNode;
            return b === y || !(!y || 1 !== y.nodeType || !(d.contains ? d.contains(y) : b.compareDocumentPosition && 16 & b.compareDocumentPosition(y)))
        } : function(b, c) {
            if (c)
                for (; c = c.parentNode;)
                    if (c === b) return !0;
            return !1
        }, Cb = c ? function(b, c) {
            if (b === c) return Fa = !0, 0;
            var d = !b.compareDocumentPosition - !c.compareDocumentPosition;
            return d ? d : (d = (b.ownerDocument || b) === (c.ownerDocument || c) ? b.compareDocumentPosition(c) : 1, 1 & d || !L.sortDetached && c.compareDocumentPosition(b) === d ? b === D || b.ownerDocument === aa && Oa(aa, b) ? -1 : c === D || c.ownerDocument === aa && Oa(aa, c) ? 1 : qa ? xa(qa, b) - xa(qa, c) : 0 : 4 & d ? -1 : 1)
        } : function(b, c) {
            if (b === c) return Fa = !0, 0;
            var d, y = 0;
            d = b.parentNode;
            var e = c.parentNode,
                j = [b],
                f = [c];
            if (!d || !e) return b === D ? -1 : c === D ? 1 : d ? -1 : e ? 1 : qa ? xa(qa, b) - xa(qa, c) : 0;
            if (d === e) return Yb(b, c);
            for (d = b; d = d.parentNode;) j.unshift(d);
            for (d = c; d = d.parentNode;) f.unshift(d);
            for (; j[y] === f[y];) y++;
            return y ? Yb(j[y], f[y]) : j[y] === aa ? -1 : f[y] === aa ? 1 : 0
        }, D) : D
    };
    J.matches = function(b, c) {
        return J(b, null, null, c)
    };
    J.matchesSelector = function(b, c) {
        if ((b.ownerDocument || b) !== D && oa(b), c = c.replace(cd, "='$1']"), L.matchesSelector && ba && !$a[c + " "] && (!ya || !ya.test(c)) && (!R || !R.test(c))) try {
            var d = gb.call(b, c);
            if (d || L.disconnectedMatch || b.document && 11 !== b.document.nodeType) return d
        } catch (e) {}
        return 0 < J(c, D, null, [b]).length
    };
    J.contains = function(b, c) {
        return (b.ownerDocument || b) !== D && oa(b), Oa(b, c)
    };
    J.attr = function(b, c) {
        (b.ownerDocument || b) !== D && oa(b);
        var d = B.attrHandle[c.toLowerCase()],
            d = d && Xc.call(B.attrHandle, c.toLowerCase()) ? d(b, c, !ba) : void 0;
        return void 0 !== d ? d : L.attributes || !ba ? b.getAttribute(c) : (d = b.getAttributeNode(c)) && d.specified ? d.value : null
    };
    J.escape = function(b) {
        return (b + "").replace(Vb, Wb)
    };
    J.error = function(b) {
        throw Error("Syntax error, unrecognized expression: " + b);
    };
    J.uniqueSort = function(b) {
        var c, d = [],
            e = 0,
            j = 0;
        if (Fa = !L.detectDuplicates, qa = !L.sortStable && b.slice(0), b.sort(Cb), Fa) {
            for (; c = b[j++];) c === b[j] && (e = d.push(j));
            for (; e--;) b.splice(d[e], 1)
        }
        return qa = null, b
    };
    fb = J.getText = function(b) {
        var c, d = "",
            e = 0;
        if (c = b.nodeType)
            if (1 === c || 9 === c || 11 === c) {
                if ("string" == typeof b.textContent) return b.textContent;
                for (b = b.firstChild; b; b = b.nextSibling) d += fb(b)
            } else {
                if (3 === c || 4 === c) return b.nodeValue
            }
        else
            for (; c = b[e++];) d += fb(c);
        return d
    };
    B = J.selectors = {
        cacheLength: 50,
        createPseudo: ea,
        match: hb,
        attrHandle: {},
        find: {},
        relative: {
            ">": {
                dir: "parentNode",
                first: !0
            },
            " ": {
                dir: "parentNode"
            },
            "+": {
                dir: "previousSibling",
                first: !0
            },
            "~": {
                dir: "previousSibling"
            }
        },
        preFilter: {
            ATTR: function(b) {
                return b[1] = b[1].replace(ia, ja), b[3] = (b[3] || b[4] || b[5] || "").replace(ia, ja), "~=" === b[2] && (b[3] = " " + b[3] + " "), b.slice(0, 4)
            },
            CHILD: function(b) {
                return b[1] = b[1].toLowerCase(), "nth" === b[1].slice(0, 3) ? (b[3] || J.error(b[0]), b[4] = +(b[4] ? b[5] + (b[6] || 1) : 2 * ("even" === b[3] || "odd" === b[3])), b[5] = +(b[7] + b[8] || "odd" === b[3])) : b[3] && J.error(b[0]), b
            },
            PSEUDO: function(b) {
                var c, d = !b[6] && b[2];
                return hb.CHILD.test(b[0]) ? null : (b[3] ? b[2] = b[4] || b[5] || "" : d && dd.test(d) && (c = Pa(d, !0)) && (c = d.indexOf(")", d.length - c) - d.length) && (b[0] = b[0].slice(0, c), b[2] = d.slice(0, c)), b.slice(0, 3))
            }
        },
        filter: {
            TAG: function(b) {
                var c = b.replace(ia, ja).toLowerCase();
                return "*" === b ? function() {
                    return !0
                } : function(b) {
                    return b.nodeName && b.nodeName.toLowerCase() === c
                }
            },
            CLASS: function(b) {
                var c = bc[b + " "];
                return c || (c = RegExp("(^|[\\x20\\t\\r\\n\\f])" + b + "([\\x20\\t\\r\\n\\f]|$)")) && bc(b, function(b) {
                    return c.test("string" == typeof b.className && b.className || "undefined" != typeof b.getAttribute && b.getAttribute("class") || "")
                })
            },
            ATTR: function(b, c, d) {
                return function(e) {
                    e = J.attr(e, b);
                    return null == e ? "!=" === c : !c || (e += "", "=" === c ? e === d : "!=" === c ? e !== d : "^=" === c ? d && 0 === e.indexOf(d) : "*=" === c ? d && -1 < e.indexOf(d) : "$=" === c ? d && e.slice(-d.length) === d : "~=" === c ? -1 < (" " + e.replace($c, " ") + " ").indexOf(d) : "|=" === c && (e === d || e.slice(0, d.length + 1) === d + "-"))
                }
            },
            CHILD: function(b, c, d, e, j) {
                var f = "nth" !== b.slice(0, 3),
                    g = "last" !== b.slice(-4),
                    l = "of-type" === c;
                return 1 === e && 0 === j ? function(b) {
                    return !!b.parentNode
                } : function(c, d, G) {
                    var n, r, I, q, p, s;
                    d = f !== g ? "nextSibling" : "previousSibling";
                    var m = c.parentNode,
                        t = l && c.nodeName.toLowerCase();
                    G = !G && !l;
                    var u = !1;
                    if (m) {
                        if (f) {
                            for (; d;) {
                                for (q = c; q = q[d];)
                                    if (l ? q.nodeName.toLowerCase() === t : 1 === q.nodeType) return !1;
                                s = d = "only" === b && !s && "nextSibling"
                            }
                            return !0
                        }
                        if (s = [g ? m.firstChild : m.lastChild], g && G) {
                            q = m;
                            I = q[N] || (q[N] = {});
                            r = I[q.uniqueID] || (I[q.uniqueID] = {});
                            n = r[b] || [];
                            u = (p = n[0] === ha && n[1]) && n[2];
                            for (q = p && m.childNodes[p]; q = ++p && q && q[d] || (u = p = 0) || s.pop();)
                                if (1 === q.nodeType && ++u && q === c) {
                                    r[b] = [ha, p, u];
                                    break
                                }
                        } else if (G && (q = c, I = q[N] || (q[N] = {}), r = I[q.uniqueID] || (I[q.uniqueID] = {}), n = r[b] || [], p = n[0] === ha && n[1], u = p), !1 === u)
                            for (;
                                (q = ++p && q && q[d] || (u = p = 0) || s.pop()) && (!(l ? q.nodeName.toLowerCase() === t : 1 === q.nodeType) || !++u || !(G && (I = q[N] || (q[N] = {}), r = I[q.uniqueID] || (I[q.uniqueID] = {}), r[b] = [ha, u]), q === c)););
                        return u -= j, u === e || 0 === u % e && 0 <= u / e
                    }
                }
            },
            PSEUDO: function(b, c) {
                var d, e = B.pseudos[b] || B.setFilters[b.toLowerCase()] || J.error("unsupported pseudo: " + b);
                return e[N] ? e(c) : 1 < e.length ? (d = [b, b, "", c], B.setFilters.hasOwnProperty(b.toLowerCase()) ? ea(function(b, d) {
                    for (var y, j = e(b, c), f = j.length; f--;) y = xa(b, j[f]), b[y] = !(d[y] = j[f])
                }) : function(b) {
                    return e(b, 0, d)
                }) : e
            }
        },
        pseudos: {
            not: ea(function(b) {
                var c = [],
                    d = [],
                    e = Bb(b.replace(bb, "$1"));
                return e[N] ? ea(function(b, c, d, y) {
                    var j;
                    d = e(b, null, y, []);
                    for (y = b.length; y--;)(j = d[y]) && (b[y] = !(c[y] = j))
                }) : function(b, y, j) {
                    return c[0] = b, e(c, null, j, d), c[0] = null, !d.pop()
                }
            }),
            has: ea(function(b) {
                return function(c) {
                    return 0 < J(b, c).length
                }
            }),
            contains: ea(function(b) {
                return b = b.replace(ia, ja),
                    function(c) {
                        return -1 < (c.textContent || c.innerText || fb(c)).indexOf(b)
                    }
            }),
            lang: ea(function(b) {
                return ed.test(b || "") || J.error("unsupported lang: " + b), b = b.replace(ia, ja).toLowerCase(),
                    function(c) {
                        var d;
                        do
                            if (d = ba ? c.lang : c.getAttribute("xml:lang") || c.getAttribute("lang")) return d = d.toLowerCase(), d === b || 0 === d.indexOf(b + "-");
                        while ((c = c.parentNode) && 1 === c.nodeType);
                        return !1
                    }
            }),
            target: function(b) {
                var c = tb.location && tb.location.hash;
                return c && c.slice(1) === b.id
            },
            root: function(b) {
                return b === ca
            },
            focus: function(b) {
                return b === D.activeElement && (!D.hasFocus || D.hasFocus()) && !(!b.type && !b.href && !~b.tabIndex)
            },
            enabled: Zb(!1),
            disabled: Zb(!0),
            checked: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && !!b.checked || "option" === c && !!b.selected
            },
            selected: function(b) {
                return b.parentNode && b.parentNode.selectedIndex, !0 === b.selected
            },
            empty: function(b) {
                for (b = b.firstChild; b; b = b.nextSibling)
                    if (6 > b.nodeType) return !1;
                return !0
            },
            parent: function(b) {
                return !B.pseudos.empty(b)
            },
            header: function(b) {
                return gd.test(b.nodeName)
            },
            input: function(b) {
                return fd.test(b.nodeName)
            },
            button: function(b) {
                var c = b.nodeName.toLowerCase();
                return "input" === c && "button" === b.type || "button" === c
            },
            text: function(b) {
                var c;
                return "input" === b.nodeName.toLowerCase() && "text" === b.type && (null == (c = b.getAttribute("type")) || "text" === c.toLowerCase())
            },
            first: wa(function() {
                return [0]
            }),
            last: wa(function(b, c) {
                return [c - 1]
            }),
            eq: wa(function(b, c, d) {
                return [0 > d ? d + c : d]
            }),
            even: wa(function(b, c) {
                for (var d = 0; d < c; d += 2) b.push(d);
                return b
            }),
            odd: wa(function(b, c) {
                for (var d = 1; d < c; d += 2) b.push(d);
                return b
            }),
            lt: wa(function(b, c, d) {
                for (c = 0 > d ? d + c : d; 0 <= --c;) b.push(c);
                return b
            }),
            gt: wa(function(b, c, d) {
                for (d = 0 > d ? d + c : d; ++d < c;) b.push(d);
                return b
            })
        }
    };
    B.pseudos.nth = B.pseudos.eq;
    for (Ea in {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        }) B.pseudos[Ea] = Tc(Ea);
    for (Ea in {
            submit: !0,
            reset: !0
        }) B.pseudos[Ea] = Uc(Ea);
    $b.prototype = B.filters = B.pseudos;
    B.setFilters = new $b;
    Pa = J.tokenize = function(b, c) {
        var d, e, j, f, g, l, n;
        if (g = cc[b + " "]) return c ? 0 : g.slice(0);
        g = b;
        l = [];
        for (n = B.preFilter; g;) {
            d && !(e = ad.exec(g)) || (e && (g = g.slice(e[0].length) || g), l.push(j = []));
            d = !1;
            (e = bd.exec(g)) && (d = e.shift(), j.push({
                value: d,
                type: e[0].replace(bb, " ")
            }), g = g.slice(d.length));
            for (f in B.filter) !(e = hb[f].exec(g)) || n[f] && !(e = n[f](e)) || (d = e.shift(), j.push({
                value: d,
                type: f,
                matches: e
            }), g = g.slice(d.length));
            if (!d) break
        }
        return c ? g.length : g ? J.error(b) : cc(b, l).slice(0)
    };
    na = (Bb = J.compile = function(b, c) {
        var d, e = [],
            j = [],
            f = $a[b + " "];
        if (!f) {
            c || (c = Pa(b));
            for (d = c.length; d--;) f = Ab(c[d]), f[N] ? e.push(f) : j.push(f);
            d = $a;
            var g = 0 < e.length,
                l = 0 < j.length,
                f = function(b, c, d, y, f) {
                    var G, n, r, q = 0,
                        I = "0",
                        p = b && [],
                        s = [],
                        m = eb,
                        t = b || l && B.find.TAG("*", f),
                        Aa = ha += null == m ? 1 : Math.random() || 0.1,
                        u = t.length;
                    for (f && (eb = c === D || c || f); I !== u && null != (G = t[I]); I++) {
                        if (l && G) {
                            n = 0;
                            for (c || G.ownerDocument === D || (oa(G), d = !ba); r = j[n++];)
                                if (r(G, c || D, d)) {
                                    y.push(G);
                                    break
                                }
                            f && (ha = Aa)
                        }
                        g && ((G = !r && G) && q--, b && p.push(G))
                    }
                    if (q += I, g && I !== q) {
                        for (n = 0; r = e[n++];) r(p, s, c, d);
                        if (b) {
                            if (0 < q)
                                for (; I--;) p[I] || s[I] || (s[I] = Yc.call(y));
                            s = db(s)
                        }
                        pa.apply(y, s);
                        f && !b && 0 < s.length && 1 < q + e.length && J.uniqueSort(y)
                    }
                    return f && (ha = Aa, eb = m), p
                },
                f = g ? ea(f) : f,
                f = d(b, f);
            f.selector = b
        }
        return f
    }, Xb = J.select = function(b, c, d, e) {
        var j, f, g, l, n, r = "function" == typeof b && b,
            q = !e && Pa(b = r.selector || b);
        if (d = d || [], 1 === q.length) {
            if (f = q[0] = q[0].slice(0), 2 < f.length && "ID" === (g = f[0]).type && 9 === c.nodeType && ba && B.relative[f[1].type]) {
                if (c = (B.find.ID(g.matches[0].replace(ia, ja), c) || [])[0], !c) return d;
                r && (c = c.parentNode);
                b = b.slice(f.shift().value.length)
            }
            for (j = hb.needsContext.test(b) ? 0 : f.length; j-- && !(g = f[j], B.relative[l = g.type]);)
                if ((n = B.find[l]) && (e = n(g.matches[0].replace(ia, ja), ub.test(f[0].type) && vb(c.parentNode) || c))) {
                    if (f.splice(j, 1), b = e.length && ab(f), !b) return pa.apply(d, e), d;
                    break
                }
        }
        return (r || Bb(b, q))(e, c, !ba, d, !c || ub.test(b) && vb(c.parentNode) || c), d
    }, L.sortStable = N.split("").sort(Cb).join("") === N, L.detectDuplicates = !!Fa, oa(), L.sortDetached = ga(function(b) {
        return 1 & b.compareDocumentPosition(D.createElement("fieldset"))
    }), ga(function(b) {
        return b.innerHTML = "<a href='#'></a>", "#" === b.firstChild.getAttribute("href")
    }) || xb("type|href|height|width", function(b, c, d) {
        if (!d) return b.getAttribute(c, "type" === c.toLowerCase() ? 1 : 2)
    }), L.attributes && ga(function(b) {
        return b.innerHTML = "<input/>", b.firstChild.setAttribute("value", ""), "" === b.firstChild.getAttribute("value")
    }) || xb("value", function(b, c, d) {
        if (!d && "input" === b.nodeName.toLowerCase()) return b.defaultValue
    }), ga(function(b) {
        return null == b.getAttribute("disabled")
    }) || xb("checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", function(b, c, d) {
        var e;
        if (!d) return !0 === b[c] ? c.toLowerCase() : (e = b.getAttributeNode(c)) && e.specified ? e.value : null
    }), J);
    l.find = na;
    l.expr = na.selectors;
    l.expr[":"] = l.expr.pseudos;
    l.uniqueSort = l.unique = na.uniqueSort;
    l.text = na.getText;
    l.isXMLDoc = na.isXML;
    l.contains = na.contains;
    l.escapeSelector = na.escape;
    var Ga = function(b, c, d) {
            for (var e = [], j = void 0 !== d;
                (b = b[c]) && 9 !== b.nodeType;)
                if (1 === b.nodeType) {
                    if (j && l(b).is(d)) break;
                    e.push(b)
                }
            return e
        },
        fc = function(b, c) {
            for (var d = []; b; b = b.nextSibling) 1 === b.nodeType && b !== c && d.push(b);
            return d
        },
        gc = l.expr.match.needsContext,
        hc = /^<([a-z][^\/\0>:\x20\t\r\n\f]*)[\x20\t\r\n\f]*\/?>(?:<\/\1>|)$/i,
        Cc = /^.[^:#\[\.,]*$/;
    l.filter = function(b, c, d) {
        var e = c[0];
        return d && (b = ":not(" + b + ")"), 1 === c.length && 1 === e.nodeType ? l.find.matchesSelector(e, b) ? [e] : [] : l.find.matches(b, l.grep(c, function(b) {
            return 1 === b.nodeType
        }))
    };
    l.fn.extend({
        find: function(b) {
            var c, d, e = this.length,
                j = this;
            if ("string" != typeof b) return this.pushStack(l(b).filter(function() {
                for (c = 0; c < e; c++)
                    if (l.contains(j[c], this)) return !0
            }));
            d = this.pushStack([]);
            for (c = 0; c < e; c++) l.find(b, j[c], d);
            return 1 < e ? l.uniqueSort(d) : d
        },
        filter: function(b) {
            return this.pushStack(g(this, b || [], !1))
        },
        not: function(b) {
            return this.pushStack(g(this, b || [], !0))
        },
        is: function(b) {
            return !!g(this, "string" == typeof b && gc.test(b) ? l(b) : b || [], !1).length
        }
    });
    var ic, hd = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
    (l.fn.init = function(b, c, d) {
        var e, j;
        if (!b) return this;
        if (d = d || ic, "string" == typeof b) {
            if (e = "<" === b[0] && ">" === b[b.length - 1] && 3 <= b.length ? [null, b, null] : hd.exec(b), !e || !e[1] && c) return !c || c.jquery ? (c || d).find(b) : this.constructor(c).find(b);
            if (e[1]) {
                if (c = c instanceof l ? c[0] : c, l.merge(this, l.parseHTML(e[1], c && c.nodeType ? c.ownerDocument || c : A, !0)), hc.test(e[1]) && l.isPlainObject(c))
                    for (e in c) l.isFunction(this[e]) ? this[e](c[e]) : this.attr(e, c[e]);
                return this
            }
            return j = A.getElementById(e[2]), j && (this[0] = j, this.length = 1), this
        }
        return b.nodeType ? (this[0] = b, this.length = 1, this) : l.isFunction(b) ? void 0 !== d.ready ? d.ready(b) : b(l) : l.makeArray(b, this)
    }).prototype = l.fn;
    ic = l(A);
    var id = /^(?:parents|prev(?:Until|All))/,
        jd = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    l.fn.extend({
        has: function(b) {
            var c = l(b, this),
                d = c.length;
            return this.filter(function() {
                for (var b = 0; b < d; b++)
                    if (l.contains(this, c[b])) return !0
            })
        },
        closest: function(b, c) {
            var d, e = 0,
                j = this.length,
                f = [],
                g = "string" != typeof b && l(b);
            if (!gc.test(b))
                for (; e < j; e++)
                    for (d = this[e]; d && d !== c; d = d.parentNode)
                        if (11 > d.nodeType && (g ? -1 < g.index(d) : 1 === d.nodeType && l.find.matchesSelector(d, b))) {
                            f.push(d);
                            break
                        }
            return this.pushStack(1 < f.length ? l.uniqueSort(f) : f)
        },
        index: function(b) {
            return b ? "string" == typeof b ? Ia.call(l(b), this[0]) : Ia.call(this, b.jquery ? b[0] : b) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function(b, c) {
            return this.pushStack(l.uniqueSort(l.merge(this.get(), l(b, c))))
        },
        addBack: function(b) {
            return this.add(null == b ? this.prevObject : this.prevObject.filter(b))
        }
    });
    l.each({
        parent: function(b) {
            return (b = b.parentNode) && 11 !== b.nodeType ? b : null
        },
        parents: function(b) {
            return Ga(b, "parentNode")
        },
        parentsUntil: function(b, c, d) {
            return Ga(b, "parentNode", d)
        },
        next: function(b) {
            return m(b, "nextSibling")
        },
        prev: function(b) {
            return m(b, "previousSibling")
        },
        nextAll: function(b) {
            return Ga(b, "nextSibling")
        },
        prevAll: function(b) {
            return Ga(b, "previousSibling")
        },
        nextUntil: function(b, c, d) {
            return Ga(b, "nextSibling", d)
        },
        prevUntil: function(b, c, d) {
            return Ga(b, "previousSibling", d)
        },
        siblings: function(b) {
            return fc((b.parentNode || {}).firstChild, b)
        },
        children: function(b) {
            return fc(b.firstChild)
        },
        contents: function(b) {
            return e(b, "iframe") ? b.contentDocument : (e(b, "template") && (b = b.content || b), l.merge([], b.childNodes))
        }
    }, function(b, c) {
        l.fn[b] = function(d, e) {
            var j = l.map(this, c, d);
            return "Until" !== b.slice(-5) && (e = d), e && "string" == typeof e && (j = l.filter(e, j)), 1 < this.length && (jd[b] || l.uniqueSort(j), id.test(b) && j.reverse()), this.pushStack(j)
        }
    });
    var Z = /[^\x20\t\r\n\f]+/g;
    l.Callbacks = function(b) {
        var c;
        if ("string" == typeof b) {
            var d = {};
            c = (l.each(b.match(Z) || [], function(b, c) {
                d[c] = !0
            }), d)
        } else c = l.extend({}, b);
        b = c;
        var e, j, f, g, n = [],
            r = [],
            q = -1,
            p = function() {
                g = g || b.once;
                for (f = e = !0; r.length; q = -1)
                    for (j = r.shift(); ++q < n.length;) !1 === n[q].apply(j[0], j[1]) && b.stopOnFalse && (q = n.length, j = !1);
                b.memory || (j = !1);
                e = !1;
                g && (n = j ? [] : "")
            },
            s = {
                add: function() {
                    return n && (j && !e && (q = n.length - 1, r.push(j)), function Jc(c) {
                        l.each(c, function(c, d) {
                            l.isFunction(d) ? b.unique && s.has(d) || n.push(d) : d && d.length && "string" !== l.type(d) && Jc(d)
                        })
                    }(arguments), j && !e && p()), this
                },
                remove: function() {
                    return l.each(arguments, function(b, c) {
                        for (var d; - 1 < (d = l.inArray(c, n, d));) n.splice(d, 1), d <= q && q--
                    }), this
                },
                has: function(b) {
                    return b ? -1 < l.inArray(b, n) : 0 < n.length
                },
                empty: function() {
                    return n && (n = []), this
                },
                disable: function() {
                    return g = r = [], n = j = "", this
                },
                disabled: function() {
                    return !n
                },
                lock: function() {
                    return g = r = [], j || e || (n = j = ""), this
                },
                locked: function() {
                    return !!g
                },
                fireWith: function(b, c) {
                    return g || (c = c || [], c = [b, c.slice ? c.slice() : c], r.push(c), e || p()), this
                },
                fire: function() {
                    return s.fireWith(this, arguments), this
                },
                fired: function() {
                    return !!f
                }
            };
        return s
    };
    l.extend({
        Deferred: function(c) {
            var d = [
                    ["notify", "progress", l.Callbacks("memory"), l.Callbacks("memory"), 2],
                    ["resolve", "done", l.Callbacks("once memory"), l.Callbacks("once memory"), 0, "resolved"],
                    ["reject", "fail", l.Callbacks("once memory"),
                        l.Callbacks("once memory"), 1, "rejected"
                    ]
                ],
                e = "pending",
                f = {
                    state: function() {
                        return e
                    },
                    always: function() {
                        return g.done(arguments).fail(arguments), this
                    },
                    "catch": function(b) {
                        return f.then(null, b)
                    },
                    pipe: function() {
                        var b = arguments;
                        return l.Deferred(function(c) {
                            l.each(d, function(d, e) {
                                var j = l.isFunction(b[e[4]]) && b[e[4]];
                                g[e[1]](function() {
                                    var b = j && j.apply(this, arguments);
                                    b && l.isFunction(b.promise) ? b.promise().progress(c.notify).done(c.resolve).fail(c.reject) : c[e[0] + "With"](this, j ? [b] : arguments)
                                })
                            });
                            b = null
                        }).promise()
                    },
                    then: function(c, e, f) {
                        function y(c, d, e, f) {
                            return function() {
                                var n = this,
                                    r = arguments,
                                    G = function() {
                                        var b, G;
                                        if (!(c < g)) {
                                            if (b = e.apply(n, r), b === d.promise()) throw new TypeError("Thenable self-resolution");
                                            G = b && ("object" == typeof b || "function" == typeof b) && b.then;
                                            l.isFunction(G) ? f ? G.call(b, y(g, d, p, f), y(g, d, j, f)) : (g++, G.call(b, y(g, d, p, f), y(g, d, j, f), y(g, d, p, d.notifyWith))) : (e !== p && (n = void 0, r = [b]), (f || d.resolveWith)(n, r))
                                        }
                                    },
                                    q = f ? G : function() {
                                        try {
                                            G()
                                        } catch (b) {
                                            l.Deferred.exceptionHook && l.Deferred.exceptionHook(b, q.stackTrace), c + 1 >= g && (e !== j && (n = void 0, r = [b]), d.rejectWith(n, r))
                                        }
                                    };
                                c ? q() : (l.Deferred.getStackHook && (q.stackTrace = l.Deferred.getStackHook()), b.setTimeout(q))
                            }
                        }
                        var g = 0;
                        return l.Deferred(function(b) {
                            d[0][3].add(y(0, b, l.isFunction(f) ? f : p, b.notifyWith));
                            d[1][3].add(y(0, b, l.isFunction(c) ? c : p));
                            d[2][3].add(y(0, b, l.isFunction(e) ? e : j))
                        }).promise()
                    },
                    promise: function(b) {
                        return null != b ? l.extend(b, f) : f
                    }
                },
                g = {};
            return l.each(d, function(b, c) {
                var j = c[2],
                    y = c[5];
                f[c[1]] = j.add;
                y && j.add(function() {
                    e = y
                }, d[3 - b][2].disable, d[0][2].lock);
                j.add(c[3].fire);
                g[c[0]] = function() {
                    return g[c[0] + "With"](this === g ? void 0 : this, arguments), this
                };
                g[c[0] + "With"] = j.fireWith
            }), f.promise(g), c && c.call(g, g), g
        },
        when: function(b) {
            var c = arguments.length,
                d = c,
                e = Array(d),
                j = va.call(arguments),
                f = l.Deferred(),
                g = function(b) {
                    return function(d) {
                        e[b] = this;
                        j[b] = 1 < arguments.length ? va.call(arguments) : d;
                        --c || f.resolveWith(e, j)
                    }
                };
            if (1 >= c && (n(b, f.done(g(d)).resolve, f.reject, !c), "pending" === f.state() || l.isFunction(j[d] && j[d].then))) return f.then();
            for (; d--;) n(j[d], g(d), f.reject);
            return f.promise()
        }
    });
    var kd = /^(Eval|Internal|Range|Reference|Syntax|Type|URI)Error$/;
    l.Deferred.exceptionHook = function(c, d) {
        b.console && b.console.warn && c && kd.test(c.name) && b.console.warn("jQuery.Deferred exception: " + c.message, c.stack, d)
    };
    l.readyException = function(c) {
        b.setTimeout(function() {
            throw c;
        })
    };
    var Db = l.Deferred();
    l.fn.ready = function(b) {
        return Db.then(b)["catch"](function(b) {
            l.readyException(b)
        }), this
    };
    l.extend({
        isReady: !1,
        readyWait: 1,
        ready: function(b) {
            (!0 === b ? --l.readyWait : l.isReady) || (l.isReady = !0, !0 !== b && 0 < --l.readyWait || Db.resolveWith(A, [l]))
        }
    });
    l.ready.then = Db.then;
    "complete" === A.readyState || "loading" !== A.readyState && !A.documentElement.doScroll ? b.setTimeout(l.ready) : (A.addEventListener("DOMContentLoaded", r), b.addEventListener("load", r));
    var ka = function(b, c, d, e, j, f, g) {
            var n = 0,
                r = b.length,
                q = null == d;
            if ("object" === l.type(d))
                for (n in j = !0, d) ka(b, c, n, d[n], !0, f, g);
            else if (void 0 !== e && (j = !0, l.isFunction(e) || (g = !0), q && (g ? (c.call(b, e), c = null) : (q = c, c = function(b, c, d) {
                    return q.call(l(b), d)
                })), c))
                for (; n < r; n++) c(b[n], d, g ? e : e.call(b[n], n, c(b[n], d)));
            return j ? b : q ? c.call(b) : r ? c(b[0], d) : f
        },
        ib = function(b) {
            return 1 === b.nodeType || 9 === b.nodeType || !+b.nodeType
        };
    q.uid = 1;
    q.prototype = {
        cache: function(b) {
            var c = b[this.expando];
            return c || (c = {}, ib(b) && (b.nodeType ? b[this.expando] = c : Object.defineProperty(b, this.expando, {
                value: c,
                configurable: !0
            }))), c
        },
        set: function(b, c, d) {
            var e;
            b = this.cache(b);
            if ("string" == typeof c) b[l.camelCase(c)] = d;
            else
                for (e in c) b[l.camelCase(e)] = c[e];
            return b
        },
        get: function(b, c) {
            return void 0 === c ? this.cache(b) : b[this.expando] && b[this.expando][l.camelCase(c)]
        },
        access: function(b, c, d) {
            return void 0 === c || c && "string" == typeof c && void 0 === d ? this.get(b, c) : (this.set(b, c, d), void 0 !== d ? d : c)
        },
        remove: function(b, c) {
            var d, e = b[this.expando];
            if (void 0 !== e) {
                if (void 0 !== c) {
                    Array.isArray(c) ? c = c.map(l.camelCase) : (c = l.camelCase(c), c = c in e ? [c] : c.match(Z) || []);
                    for (d = c.length; d--;) delete e[c[d]]
                }(void 0 === c || l.isEmptyObject(e)) && (b.nodeType ? b[this.expando] = void 0 : delete b[this.expando])
            }
        },
        hasData: function(b) {
            b = b[this.expando];
            return void 0 !== b && !l.isEmptyObject(b)
        }
    };
    var E = new q,
        S = new q,
        Ec = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,
        Dc = /[A-Z]/g;
    l.extend({
        hasData: function(b) {
            return S.hasData(b) || E.hasData(b)
        },
        data: function(b, c, d) {
            return S.access(b, c, d)
        },
        removeData: function(b, c) {
            S.remove(b, c)
        },
        _data: function(b, c, d) {
            return E.access(b, c, d)
        },
        _removeData: function(b, c) {
            E.remove(b, c)
        }
    });
    l.fn.extend({
        data: function(b, c) {
            var d, e, j, f = this[0],
                g = f && f.attributes;
            if (void 0 === b) {
                if (this.length && (j = S.get(f), 1 === f.nodeType && !E.get(f, "hasDataAttrs"))) {
                    for (d = g.length; d--;) g[d] && (e = g[d].name, 0 === e.indexOf("data-") && (e = l.camelCase(e.slice(5)), s(f, e, j[e])));
                    E.set(f, "hasDataAttrs", !0)
                }
                return j
            }
            return "object" == typeof b ? this.each(function() {
                S.set(this, b)
            }) : ka(this, function(c) {
                var d;
                if (f && void 0 === c) {
                    if ((d = S.get(f, b), void 0 !== d) || (d = s(f, b), void 0 !== d)) return d
                } else this.each(function() {
                    S.set(this, b, c)
                })
            }, null, c, 1 < arguments.length, null, !0)
        },
        removeData: function(b) {
            return this.each(function() {
                S.remove(this, b)
            })
        }
    });
    l.extend({
        queue: function(b, c, d) {
            var e;
            if (b) return c = (c || "fx") + "queue", e = E.get(b, c), d && (!e || Array.isArray(d) ? e = E.access(b, c, l.makeArray(d)) : e.push(d)), e || []
        },
        dequeue: function(b, c) {
            c = c || "fx";
            var d = l.queue(b, c),
                e = d.length,
                j = d.shift(),
                f = l._queueHooks(b, c),
                g = function() {
                    l.dequeue(b, c)
                };
            "inprogress" === j && (j = d.shift(), e--);
            j && ("fx" === c && d.unshift("inprogress"), delete f.stop, j.call(b, g, f));
            !e && f && f.empty.fire()
        },
        _queueHooks: function(b, c) {
            var d = c + "queueHooks";
            return E.get(b, d) || E.access(b, d, {
                empty: l.Callbacks("once memory").add(function() {
                    E.remove(b, [c + "queue", d])
                })
            })
        }
    });
    l.fn.extend({
        queue: function(b, c) {
            var d = 2;
            return "string" != typeof b && (c = b, b = "fx", d--), arguments.length < d ? l.queue(this[0], b) : void 0 === c ? this : this.each(function() {
                var d = l.queue(this, b, c);
                l._queueHooks(this, b);
                "fx" === b && "inprogress" !== d[0] && l.dequeue(this, b)
            })
        },
        dequeue: function(b) {
            return this.each(function() {
                l.dequeue(this, b)
            })
        },
        clearQueue: function(b) {
            return this.queue(b || "fx", [])
        },
        promise: function(b, c) {
            var d, e = 1,
                j = l.Deferred(),
                f = this,
                g = this.length,
                n = function() {
                    --e || j.resolveWith(f, [f])
                };
            "string" != typeof b && (c = b, b = void 0);
            for (b = b || "fx"; g--;)(d = E.get(f[g], b + "queueHooks")) && d.empty && (e++, d.empty.add(n));
            return n(), j.promise(c)
        }
    });
    var jc = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,
        Ja = RegExp("^(?:([+-])=|)(" + jc + ")([a-z%]*)$", "i"),
        ra = ["Top", "Right", "Bottom", "Left"],
        Ua = function(b, c) {
            return b = c || b, "none" === b.style.display || "" === b.style.display && l.contains(b.ownerDocument, b) && "none" === l.css(b, "display")
        },
        kc = function(b, c, d, e) {
            var j, f = {};
            for (j in c) f[j] = b.style[j], b.style[j] = c[j];
            d = d.apply(b, e || []);
            for (j in c) b.style[j] = f[j];
            return d
        },
        Hb = {};
    l.fn.extend({
        show: function() {
            return u(this, !0)
        },
        hide: function() {
            return u(this)
        },
        toggle: function(b) {
            return "boolean" == typeof b ? b ? this.show() : this.hide() : this.each(function() {
                Ua(this) ? l(this).show() : l(this).hide()
            })
        }
    });
    var lc = /^(?:checkbox|radio)$/i,
        Ib = /<([a-z][^\/\0>\x20\t\r\n\f]+)/i,
        Jb = /^$|\/(?:java|ecma)script/i,
        V = {
            option: [1, "<select multiple='multiple'>", "</select>"],
            thead: [1, "<table>", "</table>"],
            col: [2, "<table><colgroup>", "</colgroup></table>"],
            tr: [2, "<table><tbody>", "</tbody></table>"],
            td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
            _default: [0, "", ""]
        };
    V.optgroup = V.option;
    V.tbody = V.tfoot = V.colgroup = V.caption = V.thead;
    V.th = V.td;
    var Gc = /<|&#?\w+;/,
        jb = A.createDocumentFragment().appendChild(A.createElement("div")),
        kb = A.createElement("input");
    kb.setAttribute("type", "radio");
    kb.setAttribute("checked", "checked");
    kb.setAttribute("name", "t");
    jb.appendChild(kb);
    K.checkClone = jb.cloneNode(!0).cloneNode(!0).lastChild.checked;
    jb.innerHTML = "<textarea>x</textarea>";
    K.noCloneChecked = !!jb.cloneNode(!0).lastChild.defaultValue;
    !0;
    var lb = A.documentElement,
        ld = /^key/,
        md = /^(?:mouse|pointer|contextmenu|drag|drop)|click/,
        mc = /^([^.]*)(?:\.(.+)|)/;
    l.event = {
        global: {},
        add: function(b, c, d, e, j) {
            var f, g, n, r, q, p, s, m, t, u;
            if (q = E.get(b)) {
                d.handler && (f = d, d = f.handler, j = f.selector);
                j && l.find.matchesSelector(lb, j);
                d.guid || (d.guid = l.guid++);
                (r = q.events) || (r = q.events = {});
                (g = q.handle) || (g = q.handle = function(c) {
                    return "undefined" != typeof l && l.event.triggered !== c.type ? l.event.dispatch.apply(b, arguments) : void 0
                });
                c = (c || "").match(Z) || [""];
                for (q = c.length; q--;) n = mc.exec(c[q]) || [], t = u = n[1], n = (n[2] || "").split(".").sort(), t && (s = l.event.special[t] || {}, t = (j ? s.delegateType : s.bindType) || t, s = l.event.special[t] || {}, p = l.extend({
                    type: t,
                    origType: u,
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: j,
                    needsContext: j && l.expr.match.needsContext.test(j),
                    namespace: n.join(".")
                }, f), (m = r[t]) || (m = r[t] = [], m.delegateCount = 0, s.setup && !1 !== s.setup.call(b, e, n, g) || b.addEventListener && b.addEventListener(t, g)), s.add && (s.add.call(b, p), p.handler.guid || (p.handler.guid = d.guid)), j ? m.splice(m.delegateCount++, 0, p) : m.push(p), l.event.global[t] = !0)
            }
        },
        remove: function(b, c, d, e, j) {
            var f, g, n, r, q, p, s, m, t, u, x, z = E.hasData(b) && E.get(b);
            if (z && (r = z.events)) {
                c = (c || "").match(Z) || [""];
                for (q = c.length; q--;)
                    if (n = mc.exec(c[q]) || [], t = x = n[1], u = (n[2] || "").split(".").sort(), t) {
                        s = l.event.special[t] || {};
                        t = (e ? s.delegateType : s.bindType) || t;
                        m = r[t] || [];
                        n = n[2] && RegExp("(^|\\.)" + u.join("\\.(?:.*\\.|)") + "(\\.|$)");
                        for (g = f = m.length; f--;) p = m[f], !j && x !== p.origType || d && d.guid !== p.guid || n && !n.test(p.namespace) || e && e !== p.selector && ("**" !== e || !p.selector) || (m.splice(f, 1), p.selector && m.delegateCount--, s.remove && s.remove.call(b, p));
                        g && !m.length && (s.teardown && !1 !== s.teardown.call(b, u, z.handle) || l.removeEvent(b, t, z.handle), delete r[t])
                    } else
                        for (t in r) l.event.remove(b, t + c[q], d, e, !0);
                l.isEmptyObject(r) && E.remove(b, "handle events")
            }
        },
        dispatch: function(b) {
            var c = l.event.fix(b),
                d, e, j, f, g, n, r = Array(arguments.length);
            e = (E.get(this, "events") || {})[c.type] || [];
            var q = l.event.special[c.type] || {};
            r[0] = c;
            for (d = 1; d < arguments.length; d++) r[d] = arguments[d];
            if (c.delegateTarget = this, !q.preDispatch || !1 !== q.preDispatch.call(this, c)) {
                n = l.event.handlers.call(this, c, e);
                for (d = 0;
                    (f = n[d++]) && !c.isPropagationStopped();) {
                    c.currentTarget = f.elem;
                    for (e = 0;
                        (g = f.handlers[e++]) && !c.isImmediatePropagationStopped();) c.rnamespace && !c.rnamespace.test(g.namespace) || (c.handleObj = g, c.data = g.data, j = ((l.event.special[g.origType] || {}).handle || g.handler).apply(f.elem, r), void 0 !== j && !1 === (c.result = j) && (c.preventDefault(), c.stopPropagation()))
                }
                return q.postDispatch && q.postDispatch.call(this, c), c.result
            }
        },
        handlers: function(b, c) {
            var d, e, j, f, g, n = [],
                r = c.delegateCount,
                q = b.target;
            if (r && q.nodeType && !("click" === b.type && 1 <= b.button))
                for (; q !== this; q = q.parentNode || this)
                    if (1 === q.nodeType && ("click" !== b.type || !0 !== q.disabled)) {
                        f = [];
                        g = {};
                        for (d = 0; d < r; d++) e = c[d], j = e.selector + " ", void 0 === g[j] && (g[j] = e.needsContext ? -1 < l(j, this).index(q) : l.find(j, this, null, [q]).length), g[j] && f.push(e);
                        f.length && n.push({
                            elem: q,
                            handlers: f
                        })
                    }
            return q = this,
                r < c.length && n.push({
                    elem: q,
                    handlers: c.slice(r)
                }), n
        },
        addProp: function(b, c) {
            Object.defineProperty(l.Event.prototype, b, {
                enumerable: !0,
                configurable: !0,
                get: l.isFunction(c) ? function() {
                    if (this.originalEvent) return c(this.originalEvent)
                } : function() {
                    if (this.originalEvent) return this.originalEvent[b]
                },
                set: function(c) {
                    Object.defineProperty(this, b, {
                        enumerable: !0,
                        configurable: !0,
                        writable: !0,
                        value: c
                    })
                }
            })
        },
        fix: function(b) {
            return b[l.expando] ? b : new l.Event(b)
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function() {
                    if (this !== Ka() && this.focus) return this.focus(), !1
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function() {
                    if (this === Ka() && this.blur) return this.blur(), !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function() {
                    if ("checkbox" === this.type && this.click && e(this, "input")) return this.click(), !1
                },
                _default: function(b) {
                    return e(b.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function(b) {
                    void 0 !== b.result && b.originalEvent && (b.originalEvent.returnValue = b.result)
                }
            }
        }
    };
    l.removeEvent = function(b, c, d) {
        b.removeEventListener && b.removeEventListener(c, d)
    };
    l.Event = function(b, c) {
        return this instanceof l.Event ? (b && b.type ? (this.originalEvent = b, this.type = b.type, this.isDefaultPrevented = b.defaultPrevented || void 0 === b.defaultPrevented && !1 === b.returnValue ? O : H, this.target = b.target && 3 === b.target.nodeType ? b.target.parentNode : b.target, this.currentTarget = b.currentTarget, this.relatedTarget = b.relatedTarget) : this.type = b, c && l.extend(this, c), this.timeStamp = b && b.timeStamp || l.now(), void(this[l.expando] = !0)) : new l.Event(b, c)
    };
    l.Event.prototype = {
        constructor: l.Event,
        isDefaultPrevented: H,
        isPropagationStopped: H,
        isImmediatePropagationStopped: H,
        isSimulated: !1,
        preventDefault: function() {
            var b = this.originalEvent;
            this.isDefaultPrevented = O;
            b && !this.isSimulated && b.preventDefault()
        },
        stopPropagation: function() {
            var b = this.originalEvent;
            this.isPropagationStopped = O;
            b && !this.isSimulated && b.stopPropagation()
        },
        stopImmediatePropagation: function() {
            var b = this.originalEvent;
            this.isImmediatePropagationStopped = O;
            b && !this.isSimulated && b.stopImmediatePropagation();
            this.stopPropagation()
        }
    };
    l.each({
        altKey: !0,
        bubbles: !0,
        cancelable: !0,
        changedTouches: !0,
        ctrlKey: !0,
        detail: !0,
        eventPhase: !0,
        metaKey: !0,
        pageX: !0,
        pageY: !0,
        shiftKey: !0,
        view: !0,
        "char": !0,
        charCode: !0,
        key: !0,
        keyCode: !0,
        button: !0,
        buttons: !0,
        clientX: !0,
        clientY: !0,
        offsetX: !0,
        offsetY: !0,
        pointerId: !0,
        pointerType: !0,
        screenX: !0,
        screenY: !0,
        targetTouches: !0,
        toElement: !0,
        touches: !0,
        which: function(b) {
            var c = b.button;
            return null == b.which && ld.test(b.type) ? null != b.charCode ? b.charCode : b.keyCode : !b.which && void 0 !== c && md.test(b.type) ? 1 & c ? 1 : 2 & c ? 3 : 4 & c ? 2 : 0 : b.which
        }
    }, l.event.addProp);
    l.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout",
        pointerenter: "pointerover",
        pointerleave: "pointerout"
    }, function(b, c) {
        l.event.special[b] = {
            delegateType: c,
            bindType: c,
            handle: function(b) {
                var d, e = b.relatedTarget,
                    j = b.handleObj;
                return e && (e === this || l.contains(this, e)) || (b.type = j.origType, d = j.handler.apply(this, arguments), b.type = c), d
            }
        }
    });
    l.fn.extend({
        on: function(b, c, d, e) {
            return La(this, b, c, d, e)
        },
        one: function(b, c, d, e) {
            return La(this, b, c, d, e, 1)
        },
        off: function(b, c, d) {
            var e,
                j;
            if (b && b.preventDefault && b.handleObj) return e = b.handleObj, l(b.delegateTarget).off(e.namespace ? e.origType + "." + e.namespace : e.origType, e.selector, e.handler), this;
            if ("object" == typeof b) {
                for (j in b) this.off(j, c, b[j]);
                return this
            }
            return !1 !== c && "function" != typeof c || (d = c, c = void 0), !1 === d && (d = H), this.each(function() {
                l.event.remove(this, b, d, c)
            })
        }
    });
    var nd = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([a-z][^\/\0>\x20\t\r\n\f]*)[^>]*)\/>/gi,
        od = /<script|<style|<link/i,
        Ic = /checked\s*(?:[^=]|=\s*.checked.)/i,
        Hc = /^true\/(.*)/,
        Kc = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g;
    l.extend({
        htmlPrefilter: function(b) {
            return b.replace(nd, "<$1></$2>")
        },
        clone: function(b, c, d) {
            var e, j, f, g, n = b.cloneNode(!0),
                r = l.contains(b.ownerDocument, b);
            if (!K.noCloneChecked && !(1 !== b.nodeType && 11 !== b.nodeType || l.isXMLDoc(b))) {
                g = x(n);
                f = x(b);
                e = 0;
                for (j = f.length; e < j; e++) {
                    var q = f[e],
                        p = g[e],
                        s = p.nodeName.toLowerCase();
                    "input" === s && lc.test(q.type) ? p.checked = q.checked : "input" !== s && "textarea" !== s || (p.defaultValue = q.defaultValue)
                }
            }
            if (c)
                if (d) {
                    f = f || x(b);
                    g = g || x(n);
                    e = 0;
                    for (j = f.length; e < j; e++) Ma(f[e], g[e])
                } else Ma(b, n);
            return g = x(n, "script"), 0 < g.length && z(g, !r && x(b, "script")), n
        },
        cleanData: function(b) {
            for (var c, d, e, j = l.event.special, f = 0; void 0 !== (d = b[f]); f++)
                if (ib(d)) {
                    if (c = d[E.expando]) {
                        if (c.events)
                            for (e in c.events) j[e] ? l.event.remove(d, e) : l.removeEvent(d, e, c.handle);
                        d[E.expando] = void 0
                    }
                    d[S.expando] && (d[S.expando] = void 0)
                }
        }
    });
    l.fn.extend({
        detach: function(b) {
            return Va(this, b, !0)
        },
        remove: function(b) {
            return Va(this, b)
        },
        text: function(b) {
            return ka(this, function(b) {
                return void 0 === b ? l.text(this) : this.empty().each(function() {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || (this.textContent = b)
                })
            }, null, b, arguments.length)
        },
        append: function() {
            return la(this, arguments, function(b) {
                (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) && Ca(this, b).appendChild(b)
            })
        },
        prepend: function() {
            return la(this, arguments, function(b) {
                if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                    var c = Ca(this, b);
                    c.insertBefore(b, c.firstChild)
                }
            })
        },
        before: function() {
            return la(this, arguments, function(b) {
                this.parentNode && this.parentNode.insertBefore(b, this)
            })
        },
        after: function() {
            return la(this, arguments, function(b) {
                this.parentNode && this.parentNode.insertBefore(b, this.nextSibling)
            })
        },
        empty: function() {
            for (var b, c = 0; null != (b = this[c]); c++) 1 === b.nodeType && (l.cleanData(x(b, !1)), b.textContent = "");
            return this
        },
        clone: function(b, c) {
            return b = null != b && b, c = null == c ? b : c, this.map(function() {
                return l.clone(this, b, c)
            })
        },
        html: function(b) {
            return ka(this, function(b) {
                var c = this[0] || {},
                    d = 0,
                    e = this.length;
                if (void 0 === b && 1 === c.nodeType) return c.innerHTML;
                if ("string" == typeof b && !od.test(b) && !V[(Ib.exec(b) || ["", ""])[1].toLowerCase()]) {
                    b = l.htmlPrefilter(b);
                    try {
                        for (; d < e; d++) c = this[d] || {}, 1 === c.nodeType && (l.cleanData(x(c, !1)), c.innerHTML = b);
                        c = 0
                    } catch (j) {}
                }
                c && this.empty().append(b)
            }, null, b, arguments.length)
        },
        replaceWith: function() {
            var b = [];
            return la(this, arguments, function(c) {
                var d = this.parentNode;
                0 > l.inArray(this, b) && (l.cleanData(x(this)), d && d.replaceChild(c, this))
            }, b)
        }
    });
    l.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(b, c) {
        l.fn[b] = function(b) {
            for (var d = [], e = l(b), j = e.length - 1, f = 0; f <= j; f++) b = f === j ? this : this.clone(!0), l(e[f])[c](b), sb.apply(d, b.get());
            return this.pushStack(d)
        }
    });
    var Lb = /^margin/,
        ob = RegExp("^(" + jc + ")(?!px)[a-z%]+$", "i"),
        Wa = function(c) {
            var d = c.ownerDocument.defaultView;
            return d && d.opener || (d = b), d.getComputedStyle(c)
        },
        nb = function() {
            if (fa) {
                fa.style.cssText = "box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%";
                fa.innerHTML = "";
                lb.appendChild(mb);
                var c = b.getComputedStyle(fa);
                nc = "1%" !== c.top;
                oc = "2px" === c.marginLeft;
                pc = "4px" === c.width;
                fa.style.marginRight = "50%";
                qc = "4px" === c.marginRight;
                lb.removeChild(mb);
                fa = null
            }
        },
        nc, pc, qc, oc, mb = A.createElement("div"),
        fa = A.createElement("div");
    fa.style && (fa.style.backgroundClip = "content-box", fa.cloneNode(!0).style.backgroundClip = "", K.clearCloneStyle = "content-box" === fa.style.backgroundClip, mb.style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute", mb.appendChild(fa), l.extend(K, {
        pixelPosition: function() {
            return nb(), nc
        },
        boxSizingReliable: function() {
            return nb(), pc
        },
        pixelMarginRight: function() {
            return nb(), qc
        },
        reliableMarginLeft: function() {
            return nb(), oc
        }
    }));
    !0;
    var pd = /^(none|table(?!-c[ea]).+)/,
        rc = /^--/,
        qd = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        },
        sc = {
            letterSpacing: "0",
            fontWeight: "400"
        },
        Ob = ["Webkit", "Moz", "ms"],
        Nb = A.createElement("div").style;
    l.extend({
        cssHooks: {
            opacity: {
                get: function(b, c) {
                    if (c) {
                        var d = Na(b, "opacity");
                        return "" === d ? "1" : d
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": "cssFloat"
        },
        style: function(b, c, d, e) {
            if (b && 3 !== b.nodeType && 8 !== b.nodeType && b.style) {
                var j, f, g, n = l.camelCase(c),
                    r = rc.test(c),
                    q = b.style;
                return r || (c = W(n)), g = l.cssHooks[c] || l.cssHooks[n], void 0 === d ? g && "get" in g && void 0 !== (j = g.get(b, !1, e)) ? j : q[c] : (f = typeof d, "string" === f && (j = Ja.exec(d)) && j[1] && (d = t(b, c, j), f = "number"), null != d && d === d && ("number" === f && (d += j && j[3] || (l.cssNumber[n] ? "" : "px")), K.clearCloneStyle || "" !== d || 0 !== c.indexOf("background") || (q[c] = "inherit"), g && "set" in g && void 0 === (d = g.set(b, d, e)) || (r ? q.setProperty(c, d) : q[c] = d)), void 0)
            }
        },
        css: function(b, c, d, e) {
            var j, f, g, n = l.camelCase(c);
            return rc.test(c) || (c = W(n)), g = l.cssHooks[c] || l.cssHooks[n], g && "get" in g && (j = g.get(b, !0, d)), void 0 === j && (j = Na(b, c, e)), "normal" === j && c in sc && (j = sc[c]), "" === d || d ? (f = parseFloat(j), !0 === d || isFinite(f) ? f || 0 : j) : j
        }
    });
    l.each(["height", "width"], function(b, c) {
        l.cssHooks[c] = {
            get: function(b, d, e) {
                if (d) return !pd.test(l.css(b, "display")) || b.getClientRects().length && b.getBoundingClientRect().width ? Pb(b, c, e) : kc(b, qd, function() {
                    return Pb(b, c, e)
                })
            },
            set: function(b, d, e) {
                var j, f = e && Wa(b);
                e = e && Y(b, c, e, "border-box" === l.css(b, "boxSizing", !1, f), f);
                return e && (j = Ja.exec(d)) && "px" !== (j[3] || "px") && (b.style[c] = d, d = l.css(b, c)), X(b, d, e)
            }
        }
    });
    l.cssHooks.marginLeft = Mb(K.reliableMarginLeft, function(b, c) {
        if (c) return (parseFloat(Na(b, "marginLeft")) || b.getBoundingClientRect().left - kc(b, {
            marginLeft: 0
        }, function() {
            return b.getBoundingClientRect().left
        })) + "px"
    });
    l.each({
        margin: "",
        padding: "",
        border: "Width"
    }, function(b, c) {
        l.cssHooks[b + c] = {
            expand: function(d) {
                var e = 0,
                    j = {};
                for (d = "string" == typeof d ? d.split(" ") : [d]; 4 > e; e++) j[b + ra[e] + c] = d[e] || d[e - 2] || d[0];
                return j
            }
        };
        Lb.test(b) || (l.cssHooks[b + c].set = X)
    });
    l.fn.extend({
        css: function(b, c) {
            return ka(this, function(b, c, d) {
                var e, j = {},
                    f = 0;
                if (Array.isArray(c)) {
                    d = Wa(b);
                    for (e = c.length; f < e; f++) j[c[f]] = l.css(b, c[f], !1, d);
                    return j
                }
                return void 0 !== d ? l.style(b, c, d) : l.css(b, c)
            }, b, c, 1 < arguments.length)
        }
    });
    l.Tween = P;
    P.prototype = {
        constructor: P,
        init: function(b, c, d, e, j, f) {
            this.elem = b;
            this.prop = d;
            this.easing = j || l.easing._default;
            this.options = c;
            this.start = this.now = this.cur();
            this.end = e;
            this.unit = f || (l.cssNumber[d] ? "" : "px")
        },
        cur: function() {
            var b = P.propHooks[this.prop];
            return b && b.get ? b.get(this) : P.propHooks._default.get(this)
        },
        run: function(b) {
            var c, d = P.propHooks[this.prop];
            return this.options.duration ? this.pos = c = l.easing[this.easing](b, this.options.duration * b, 0, 1, this.options.duration) : this.pos = c = b, this.now = (this.end - this.start) * c + this.start, this.options.step && this.options.step.call(this.elem, this.now, this), d && d.set ? d.set(this) : P.propHooks._default.set(this), this
        }
    };
    P.prototype.init.prototype = P.prototype;
    P.propHooks = {
        _default: {
            get: function(b) {
                var c;
                return 1 !== b.elem.nodeType || null != b.elem[b.prop] && null == b.elem.style[b.prop] ? b.elem[b.prop] : (c = l.css(b.elem, b.prop, ""), c && "auto" !== c ? c : 0)
            },
            set: function(b) {
                l.fx.step[b.prop] ? l.fx.step[b.prop](b) : 1 !== b.elem.nodeType || null == b.elem.style[l.cssProps[b.prop]] && !l.cssHooks[b.prop] ? b.elem[b.prop] = b.now : l.style(b.elem, b.prop, b.now + b.unit)
            }
        }
    };
    P.propHooks.scrollTop = P.propHooks.scrollLeft = {
        set: function(b) {
            b.elem.nodeType && b.elem.parentNode && (b.elem[b.prop] = b.now)
        }
    };
    l.easing = {
        linear: function(b) {
            return b
        },
        swing: function(b) {
            return 0.5 - Math.cos(b * Math.PI) / 2
        },
        _default: "swing"
    };
    l.fx = P.prototype.init;
    l.fx.step = {};
    var Da, Xa, rd = /^(?:toggle|show|hide)$/,
        sd = /queueHooks$/;
    l.Animation = l.extend(da, {
        tweeners: {
            "*": [function(b, c) {
                var d = this.createTween(b, c);
                return t(d.elem, b, Ja.exec(c), d), d
            }]
        },
        tweener: function(b, c) {
            l.isFunction(b) ? (c = b, b = ["*"]) : b = b.match(Z);
            for (var d, e = 0, j = b.length; e < j; e++) d = b[e], da.tweeners[d] = da.tweeners[d] || [], da.tweeners[d].unshift(c)
        },
        prefilters: [function(b, c, d) {
            var e, j, f, g, n, r, q, p, s = "width" in c || "height" in c,
                m = this,
                t = {},
                x = b.style,
                z = b.nodeType && Ua(b),
                C = E.get(b, "fxshow");
            d.queue || (g = l._queueHooks(b, "fx"), null == g.unqueued && (g.unqueued = 0, n = g.empty.fire, g.empty.fire = function() {
                g.unqueued || n()
            }), g.unqueued++, m.always(function() {
                m.always(function() {
                    g.unqueued--;
                    l.queue(b, "fx").length || g.empty.fire()
                })
            }));
            for (e in c)
                if (j = c[e], rd.test(j)) {
                    if (delete c[e], f = f || "toggle" === j, j === (z ? "hide" : "show")) {
                        if ("show" !== j || !C || void 0 === C[e]) continue;
                        z = !0
                    }
                    t[e] = C && C[e] || l.style(b, e)
                }
            if (r = !l.isEmptyObject(c), r || !l.isEmptyObject(t))
                for (e in s && 1 === b.nodeType && (d.overflow = [x.overflow, x.overflowX, x.overflowY], q = C && C.display, null == q && (q = E.get(b, "display")), p = l.css(b, "display"), "none" === p && (q ? p = q : (u([b], !0), q = b.style.display || q, p = l.css(b, "display"), u([b]))), ("inline" === p || "inline-block" === p && null != q) && "none" === l.css(b, "float") && (r || (m.done(function() {
                        x.display = q
                    }), null == q && (p = x.display, q = "none" === p ? "" : p)), x.display = "inline-block")), d.overflow && (x.overflow = "hidden", m.always(function() {
                        x.overflow = d.overflow[0];
                        x.overflowX = d.overflow[1];
                        x.overflowY = d.overflow[2]
                    })), r = !1, t) r || (C ? "hidden" in C && (z = C.hidden) : C = E.access(b, "fxshow", {
                    display: q
                }), f && (C.hidden = !z), z && u([b], !0), m.done(function() {
                    z || u([b]);
                    E.remove(b, "fxshow");
                    for (e in t) l.style(b, e, t[e])
                })), r = Qb(z ? C[e] : 0, e, m), e in C || (C[e] = r.start, z && (r.end = r.start, r.start = 0))
        }],
        prefilter: function(b, c) {
            c ? da.prefilters.unshift(b) : da.prefilters.push(b)
        }
    });
    l.speed = function(b, c, d) {
        var e = b && "object" == typeof b ? l.extend({}, b) : {
            complete: d || !d && c || l.isFunction(b) && b,
            duration: b,
            easing: d && c || c && !l.isFunction(c) && c
        };
        return l.fx.off ? e.duration = 0 : "number" != typeof e.duration && (e.duration in l.fx.speeds ? e.duration = l.fx.speeds[e.duration] : e.duration = l.fx.speeds._default), null != e.queue && !0 !== e.queue || (e.queue = "fx"), e.old = e.complete, e.complete = function() {
            l.isFunction(e.old) && e.old.call(this);
            e.queue && l.dequeue(this, e.queue)
        }, e
    };
    l.fn.extend({
        fadeTo: function(b, c, d, e) {
            return this.filter(Ua).css("opacity", 0).show().end().animate({
                opacity: c
            }, b, d, e)
        },
        animate: function(b, c, d, e) {
            var j = l.isEmptyObject(b),
                f = l.speed(c, d, e);
            c = function() {
                var c = da(this, l.extend({}, b), f);
                (j || E.get(this, "finish")) && c.stop(!0)
            };
            return c.finish = c, j || !1 === f.queue ? this.each(c) : this.queue(f.queue, c)
        },
        stop: function(b, c, d) {
            var e = function(b) {
                var c = b.stop;
                delete b.stop;
                c(d)
            };
            return "string" != typeof b && (d = c, c = b, b = void 0), c && !1 !== b && this.queue(b || "fx", []), this.each(function() {
                var c = !0,
                    j = null != b && b + "queueHooks",
                    f = l.timers,
                    g = E.get(this);
                if (j) g[j] && g[j].stop && e(g[j]);
                else
                    for (j in g) g[j] && g[j].stop && sd.test(j) && e(g[j]);
                for (j = f.length; j--;) f[j].elem !== this || null != b && f[j].queue !== b || (f[j].anim.stop(d), c = !1, f.splice(j, 1));
                !c && d || l.dequeue(this, b)
            })
        },
        finish: function(b) {
            return !1 !== b && (b = b || "fx"), this.each(function() {
                var c, d = E.get(this),
                    e = d[b + "queue"];
                c = d[b + "queueHooks"];
                var j = l.timers,
                    f = e ? e.length : 0;
                d.finish = !0;
                l.queue(this, b, []);
                c && c.stop && c.stop.call(this, !0);
                for (c = j.length; c--;) j[c].elem === this && j[c].queue === b && (j[c].anim.stop(!0), j.splice(c, 1));
                for (c = 0; c < f; c++) e[c] && e[c].finish && e[c].finish.call(this);
                delete d.finish
            })
        }
    });
    l.each(["toggle", "show", "hide"], function(b, c) {
        var d = l.fn[c];
        l.fn[c] = function(b, e, j) {
            return null == b || "boolean" == typeof b ? d.apply(this, arguments) : this.animate(Q(c, !0), b, e, j)
        }
    });
    l.each({
        slideDown: Q("show"),
        slideUp: Q("hide"),
        slideToggle: Q("toggle"),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(b, c) {
        l.fn[b] = function(b, d, e) {
            return this.animate(c, b, d, e)
        }
    });
    l.timers = [];
    l.fx.tick = function() {
        var b, c = 0,
            d = l.timers;
        for (Da = l.now(); c < d.length; c++) b = d[c], b() || d[c] !== b || d.splice(c--, 1);
        d.length || l.fx.stop();
        Da = void 0
    };
    l.fx.timer = function(b) {
        l.timers.push(b);
        l.fx.start()
    };
    l.fx.interval = 13;
    l.fx.start = function() {
        Xa || (Xa = !0, ma())
    };
    l.fx.stop = function() {
        Xa = null
    };
    l.fx.speeds = {
        slow: 600,
        fast: 200,
        _default: 400
    };
    l.fn.delay = function(c, d) {
        return c = l.fx ? l.fx.speeds[c] || c : c, d = d || "fx", this.queue(d, function(d, e) {
            var j = b.setTimeout(d, c);
            e.stop = function() {
                b.clearTimeout(j)
            }
        })
    };
    var Ha = A.createElement("input"),
        td = A.createElement("select").appendChild(A.createElement("option"));
    Ha.type = "checkbox";
    K.checkOn = "" !== Ha.value;
    K.optSelected = td.selected;
    Ha = A.createElement("input");
    Ha.value = "t";
    Ha.type = "radio";
    K.radioValue = "t" === Ha.value;
    var tc, Ra = l.expr.attrHandle;
    l.fn.extend({
        attr: function(b, c) {
            return ka(this, l.attr, b, c, 1 < arguments.length)
        },
        removeAttr: function(b) {
            return this.each(function() {
                l.removeAttr(this, b)
            })
        }
    });
    l.extend({
        attr: function(b, c, d) {
            var e, j, f = b.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return "undefined" == typeof b.getAttribute ? l.prop(b, c, d) : (1 === f && l.isXMLDoc(b) || (j = l.attrHooks[c.toLowerCase()] || (l.expr.match.bool.test(c) ? tc : void 0)), void 0 !== d ? null === d ? void l.removeAttr(b, c) : j && "set" in j && void 0 !== (e = j.set(b, d, c)) ? e : (b.setAttribute(c, d + ""), d) : j && "get" in j && null !== (e = j.get(b, c)) ? e : (e = l.find.attr(b, c), null == e ? void 0 : e))
        },
        attrHooks: {
            type: {
                set: function(b, c) {
                    if (!K.radioValue && "radio" === c && e(b, "input")) {
                        var d = b.value;
                        return b.setAttribute("type", c), d && (b.value = d), c
                    }
                }
            }
        },
        removeAttr: function(b, c) {
            var d, e = 0,
                j = c && c.match(Z);
            if (j && 1 === b.nodeType)
                for (; d = j[e++];) b.removeAttribute(d)
        }
    });
    tc = {
        set: function(b, c, d) {
            return !1 === c ? l.removeAttr(b, d) : b.setAttribute(d, d), d
        }
    };
    l.each(l.expr.match.bool.source.match(/\w+/g), function(b, c) {
        var d = Ra[c] || l.find.attr;
        Ra[c] = function(b, c, e) {
            var j, f, g = c.toLowerCase();
            return e || (f = Ra[g], Ra[g] = j, j = null != d(b, c, e) ? g : null, Ra[g] = f), j
        }
    });
    var ud = /^(?:input|select|textarea|button)$/i,
        vd = /^(?:a|area)$/i;
    l.fn.extend({
        prop: function(b, c) {
            return ka(this, l.prop, b, c, 1 < arguments.length)
        },
        removeProp: function(b) {
            return this.each(function() {
                delete this[l.propFix[b] || b]
            })
        }
    });
    l.extend({
        prop: function(b, c, d) {
            var e, j, f = b.nodeType;
            if (3 !== f && 8 !== f && 2 !== f) return 1 === f && l.isXMLDoc(b) || (c = l.propFix[c] || c, j = l.propHooks[c]), void 0 !== d ? j && "set" in j && void 0 !== (e = j.set(b, d, c)) ? e : b[c] = d : j && "get" in j && null !== (e = j.get(b, c)) ? e : b[c]
        },
        propHooks: {
            tabIndex: {
                get: function(b) {
                    var c = l.find.attr(b, "tabindex");
                    return c ? parseInt(c, 10) : ud.test(b.nodeName) || vd.test(b.nodeName) && b.href ? 0 : -1
                }
            }
        },
        propFix: {
            "for": "htmlFor",
            "class": "className"
        }
    });
    K.optSelected || (l.propHooks.selected = {
        get: function(b) {
            b = b.parentNode;
            return b && b.parentNode && b.parentNode.selectedIndex, null
        },
        set: function(b) {
            b = b.parentNode;
            b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex)
        }
    });
    l.each("tabIndex readOnly maxLength cellSpacing cellPadding rowSpan colSpan useMap frameBorder contentEditable".split(" "), function() {
        l.propFix[this.toLowerCase()] = this
    });
    l.fn.extend({
        addClass: function(b) {
            var c, d, e, j, f, g, n = 0;
            if (l.isFunction(b)) return this.each(function(c) {
                l(this).addClass(b.call(this, c, ta(this)))
            });
            if ("string" == typeof b && b)
                for (c = b.match(Z) || []; d = this[n++];)
                    if (j = ta(d), e = 1 === d.nodeType && " " + sa(j) + " ") {
                        for (g = 0; f = c[g++];) 0 > e.indexOf(" " + f + " ") && (e += f + " ");
                        e = sa(e);
                        j !== e && d.setAttribute("class", e)
                    }
            return this
        },
        removeClass: function(b) {
            var c, d, e, j, f, g, n = 0;
            if (l.isFunction(b)) return this.each(function(c) {
                l(this).removeClass(b.call(this, c, ta(this)))
            });
            if (!arguments.length) return this.attr("class", "");
            if ("string" == typeof b && b)
                for (c = b.match(Z) || []; d = this[n++];)
                    if (j = ta(d), e = 1 === d.nodeType && " " + sa(j) + " ") {
                        for (g = 0; f = c[g++];)
                            for (; - 1 < e.indexOf(" " + f + " ");) e = e.replace(" " + f + " ", " ");
                        e = sa(e);
                        j !== e && d.setAttribute("class", e)
                    }
            return this
        },
        toggleClass: function(b, c) {
            var d = typeof b;
            return "boolean" == typeof c && "string" === d ? c ? this.addClass(b) : this.removeClass(b) : l.isFunction(b) ? this.each(function(d) {
                l(this).toggleClass(b.call(this, d, ta(this), c), c)
            }) : this.each(function() {
                var c, e, j, f;
                if ("string" === d) {
                    e = 0;
                    j = l(this);
                    for (f = b.match(Z) || []; c = f[e++];) j.hasClass(c) ? j.removeClass(c) : j.addClass(c)
                } else void 0 !== b && "boolean" !== d || (c = ta(this), c && E.set(this, "__className__", c), this.setAttribute && this.setAttribute("class", c || !1 === b ? "" : E.get(this, "__className__") || ""))
            })
        },
        hasClass: function(b) {
            var c, d = 0;
            for (b = " " + b + " "; c = this[d++];)
                if (1 === c.nodeType && -1 < (" " + sa(ta(c)) + " ").indexOf(b)) return !0;
            return !1
        }
    });
    var wd = /\r/g;
    l.fn.extend({
        val: function(b) {
            var c, d,
                e, j = this[0];
            if (arguments.length) return e = l.isFunction(b), this.each(function(d) {
                var j;
                1 === this.nodeType && (j = e ? b.call(this, d, l(this).val()) : b, null == j ? j = "" : "number" == typeof j ? j += "" : Array.isArray(j) && (j = l.map(j, function(b) {
                    return null == b ? "" : b + ""
                })), c = l.valHooks[this.type] || l.valHooks[this.nodeName.toLowerCase()], c && "set" in c && void 0 !== c.set(this, j, "value") || (this.value = j))
            });
            if (j) return c = l.valHooks[j.type] || l.valHooks[j.nodeName.toLowerCase()], c && "get" in c && void 0 !== (d = c.get(j, "value")) ? d : (d = j.value, "string" == typeof d ? d.replace(wd, "") : null == d ? "" : d)
        }
    });
    l.extend({
        valHooks: {
            option: {
                get: function(b) {
                    var c = l.find.attr(b, "value");
                    return null != c ? c : sa(l.text(b))
                }
            },
            select: {
                get: function(b) {
                    var c, d, j = b.options,
                        f = b.selectedIndex,
                        g = "select-one" === b.type,
                        n = g ? null : [],
                        r = g ? f + 1 : j.length;
                    for (d = 0 > f ? r : g ? f : 0; d < r; d++)
                        if (c = j[d], (c.selected || d === f) && !c.disabled && (!c.parentNode.disabled || !e(c.parentNode, "optgroup"))) {
                            if (b = l(c).val(), g) return b;
                            n.push(b)
                        }
                    return n
                },
                set: function(b, c) {
                    for (var d, e, j = b.options, f = l.makeArray(c),
                            g = j.length; g--;) e = j[g], (e.selected = -1 < l.inArray(l.valHooks.option.get(e), f)) && (d = !0);
                    return d || (b.selectedIndex = -1), f
                }
            }
        }
    });
    l.each(["radio", "checkbox"], function() {
        l.valHooks[this] = {
            set: function(b, c) {
                if (Array.isArray(c)) return b.checked = -1 < l.inArray(l(b).val(), c)
            }
        };
        K.checkOn || (l.valHooks[this].get = function(b) {
            return null === b.getAttribute("value") ? "on" : b.value
        })
    });
    var uc = /^(?:focusinfocus|focusoutblur)$/;
    l.extend(l.event, {
        trigger: function(c, d, e, j) {
            var f, g, n, r, q, p, s, m = [e || A],
                t = Za.call(c, "type") ? c.type : c;
            f = Za.call(c, "namespace") ? c.namespace.split(".") : [];
            if (g = n = e = e || A, 3 !== e.nodeType && 8 !== e.nodeType && !uc.test(t + l.event.triggered) && (-1 < t.indexOf(".") && (f = t.split("."), t = f.shift(), f.sort()), q = 0 > t.indexOf(":") && "on" + t, c = c[l.expando] ? c : new l.Event(t, "object" == typeof c && c), c.isTrigger = j ? 2 : 3, c.namespace = f.join("."), c.rnamespace = c.namespace ? RegExp("(^|\\.)" + f.join("\\.(?:.*\\.|)") + "(\\.|$)") : null, c.result = void 0, c.target || (c.target = e), d = null == d ? [c] : l.makeArray(d, [c]), s = l.event.special[t] || {}, j || !s.trigger || !1 !== s.trigger.apply(e, d))) {
                if (!j && !s.noBubble && !l.isWindow(e)) {
                    r = s.delegateType || t;
                    for (uc.test(r + t) || (g = g.parentNode); g; g = g.parentNode) m.push(g), n = g;
                    n === (e.ownerDocument || A) && m.push(n.defaultView || n.parentWindow || b)
                }
                for (f = 0;
                    (g = m[f++]) && !c.isPropagationStopped();) c.type = 1 < f ? r : s.bindType || t, (p = (E.get(g, "events") || {})[c.type] && E.get(g, "handle")) && p.apply(g, d), (p = q && g[q]) && p.apply && ib(g) && (c.result = p.apply(g, d), !1 === c.result && c.preventDefault());
                return c.type = t, j || c.isDefaultPrevented() || s._default && !1 !== s._default.apply(m.pop(), d) || !ib(e) || q && l.isFunction(e[t]) && !l.isWindow(e) && (n = e[q], n && (e[q] = null), l.event.triggered = t, e[t](), l.event.triggered = void 0, n && (e[q] = n)), c.result
            }
        },
        simulate: function(b, c, d) {
            b = l.extend(new l.Event, d, {
                type: b,
                isSimulated: !0
            });
            l.event.trigger(b, null, c)
        }
    });
    l.fn.extend({
        trigger: function(b, c) {
            return this.each(function() {
                l.event.trigger(b, c, this)
            })
        },
        triggerHandler: function(b, c) {
            var d = this[0];
            if (d) return l.event.trigger(b, c, d, !0)
        }
    });
    l.each("blur focus focusin focusout resize scroll click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup contextmenu".split(" "), function(b, c) {
        l.fn[c] = function(b, d) {
            return 0 < arguments.length ? this.on(c, null, b, d) : this.trigger(c)
        }
    });
    l.fn.extend({
        hover: function(b, c) {
            return this.mouseenter(b).mouseleave(c || b)
        }
    });
    K.focusin = "onfocusin" in b;
    K.focusin || l.each({
        focus: "focusin",
        blur: "focusout"
    }, function(b, c) {
        var d = function(b) {
            l.event.simulate(c, b.target, l.event.fix(b))
        };
        l.event.special[c] = {
            setup: function() {
                var e = this.ownerDocument || this,
                    j = E.access(e, c);
                j || e.addEventListener(b, d, !0);
                E.access(e, c, (j || 0) + 1)
            },
            teardown: function() {
                var e = this.ownerDocument || this,
                    j = E.access(e, c) - 1;
                j ? E.access(e, c, j) : (e.removeEventListener(b, d, !0), E.remove(e, c))
            }
        }
    });
    var Sa = b.location,
        vc = l.now(),
        Eb = /\?/;
    l.parseXML = function(c) {
        var d;
        if (!c || "string" != typeof c) return null;
        try {
            d = (new b.DOMParser).parseFromString(c, "text/xml")
        } catch (e) {
            d = void 0
        }
        return d && !d.getElementsByTagName("parsererror").length || l.error("Invalid XML: " + c), d
    };
    var Lc = /\[\]$/,
        wc = /\r?\n/g,
        xd = /^(?:submit|button|image|reset|file)$/i,
        yd = /^(?:input|select|textarea|keygen)/i;
    l.param = function(b, c) {
        var d, e = [],
            j = function(b, c) {
                var d = l.isFunction(c) ? c() : c;
                e[e.length] = encodeURIComponent(b) + "=" + encodeURIComponent(null == d ? "" : d)
            };
        if (Array.isArray(b) || b.jquery && !l.isPlainObject(b)) l.each(b, function() {
            j(this.name, this.value)
        });
        else
            for (d in b) pb(d, b[d], c, j);
        return e.join("&")
    };
    l.fn.extend({
        serialize: function() {
            return l.param(this.serializeArray())
        },
        serializeArray: function() {
            return this.map(function() {
                var b = l.prop(this, "elements");
                return b ? l.makeArray(b) : this
            }).filter(function() {
                var b = this.type;
                return this.name && !l(this).is(":disabled") && yd.test(this.nodeName) && !xd.test(b) && (this.checked || !lc.test(b))
            }).map(function(b, c) {
                var d = l(this).val();
                return null == d ? null : Array.isArray(d) ? l.map(d, function(b) {
                    return {
                        name: c.name,
                        value: b.replace(wc, "\r\n")
                    }
                }) : {
                    name: c.name,
                    value: d.replace(wc, "\r\n")
                }
            }).get()
        }
    });
    var zd = /%20/g,
        Ad = /#.*$/,
        Bd = /([?&])_=[^&]*/,
        Cd = /^(.*?):[ \t]*([^\r\n]*)$/gm,
        Dd = /^(?:GET|HEAD)$/,
        Ed = /^\/\//,
        xc = {},
        qb = {},
        yc = "*/".concat("*"),
        Fb = A.createElement("a");
    Fb.href = Sa.href;
    l.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: Sa.href,
            type: "GET",
            isLocal: /^(?:about|app|app-storage|.+-extension|file|res|widget):$/.test(Sa.protocol),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": yc,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": JSON.parse,
                "text xml": l.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function(b, c) {
            return c ? rb(rb(b, l.ajaxSettings), c) : rb(l.ajaxSettings, b)
        },
        ajaxPrefilter: Rb(xc),
        ajaxTransport: Rb(qb),
        ajax: function(c, d) {
            function e(c, d, n, q) {
                var m, t, y, G, I = d;
                if (!p) {
                    p = !0;
                    r && b.clearTimeout(r);
                    j = void 0;
                    g = q || "";
                    M.readyState = 0 < c ? 4 : 0;
                    q = 200 <= c && 300 > c || 304 === c;
                    if (n) {
                        y = u;
                        for (var Ba = M, B, D, O, A, J = y.contents, F = y.dataTypes;
                            "*" === F[0];) F.shift(), void 0 === B && (B = y.mimeType || Ba.getResponseHeader("Content-Type"));
                        if (B)
                            for (D in J)
                                if (J[D] && J[D].test(B)) {
                                    F.unshift(D);
                                    break
                                }
                        if (F[0] in n) O = F[0];
                        else {
                            for (D in n) {
                                if (!F[0] || y.converters[D + " " + F[0]]) {
                                    O = D;
                                    break
                                }
                                A || (A = D)
                            }
                            O = O || A
                        }
                        y = n = O ? (O !== F[0] && F.unshift(O), n[O]) : void 0
                    }
                    var K;
                    a: {
                        n = u;
                        B = y;
                        D = M;
                        O = q;
                        var Q, N, L;
                        y = {};
                        Ba = n.dataTypes.slice();
                        if (Ba[1])
                            for (Q in n.converters) y[Q.toLowerCase()] = n.converters[Q];
                        for (A = Ba.shift(); A;)
                            if (n.responseFields[A] && (D[n.responseFields[A]] = B), !L && O && n.dataFilter && (B = n.dataFilter(B, n.dataType)), L = A, A = Ba.shift())
                                if ("*" === A) A = L;
                                else if ("*" !== L && L !== A) {
                            if (Q = y[L + " " + A] || y["* " + A], !Q)
                                for (K in y)
                                    if (N = K.split(" "), N[1] === A && (Q = y[L + " " + N[0]] || y["* " + N[0]])) {
                                        !0 === Q ? Q = y[K] : !0 !== y[K] && (A = N[0], Ba.unshift(N[1]));
                                        break
                                    }
                            if (!0 !== Q)
                                if (Q && n["throws"]) B = Q(B);
                                else try {
                                    B = Q(B)
                                } catch (Fc) {
                                    K = {
                                        state: "parsererror",
                                        error: Q ? Fc : "No conversion from " + L + " to " + A
                                    };
                                    break a
                                }
                        }
                        K = {
                            state: "success",
                            data: B
                        }
                    }
                    y = K;
                    q ? (u.ifModified && (G = M.getResponseHeader("Last-Modified"), G && (l.lastModified[f] = G), G = M.getResponseHeader("etag"), G && (l.etag[f] = G)), 204 === c || "HEAD" === u.type ? I = "nocontent" : 304 === c ? I = "notmodified" : (I = y.state, m = y.data, t = y.error, q = !t)) : (t = I, !c && I || (I = "error", 0 > c && (c = 0)));
                    M.status = c;
                    M.statusText = (d || I) + "";
                    q ? C.resolveWith(x, [m, I, M]) : C.rejectWith(x, [M, I, t]);
                    M.statusCode(H);
                    H = void 0;
                    s && z.trigger(q ? "ajaxSuccess" : "ajaxError", [M, u, q ? m : t]);
                    E.fireWith(x, [M, I]);
                    s && (z.trigger("ajaxComplete", [M, u]), --l.active || l.event.trigger("ajaxStop"))
                }
            }
            "object" == typeof c && (d = c, c = void 0);
            d = d || {};
            var j, f, g, n, r, q, p, s, m, t, u = l.ajaxSetup({}, d),
                x = u.context || u,
                z = u.context && (x.nodeType || x.jquery) ? l(x) : l.event,
                C = l.Deferred(),
                E = l.Callbacks("once memory"),
                H = u.statusCode || {},
                B = {},
                D = {},
                O = "canceled",
                M = {
                    readyState: 0,
                    getResponseHeader: function(b) {
                        var c;
                        if (p) {
                            if (!n)
                                for (n = {}; c = Cd.exec(g);) n[c[1].toLowerCase()] = c[2];
                            c = n[b.toLowerCase()]
                        }
                        return null == c ? null : c
                    },
                    getAllResponseHeaders: function() {
                        return p ? g : null
                    },
                    setRequestHeader: function(b, c) {
                        return null == p && (b = D[b.toLowerCase()] = D[b.toLowerCase()] || b, B[b] = c), this
                    },
                    overrideMimeType: function(b) {
                        return null == p && (u.mimeType = b), this
                    },
                    statusCode: function(b) {
                        var c;
                        if (b)
                            if (p) M.always(b[M.status]);
                            else
                                for (c in b) H[c] = [H[c], b[c]];
                        return this
                    },
                    abort: function(b) {
                        b = b || O;
                        return j && j.abort(b), e(0, b), this
                    }
                };
            if (C.promise(M), u.url = ((c || u.url || Sa.href) + "").replace(Ed, Sa.protocol + "//"), u.type = d.method || d.type || u.method || u.type, u.dataTypes = (u.dataType || "*").toLowerCase().match(Z) || [""], null == u.crossDomain) {
                q = A.createElement("a");
                try {
                    q.href = u.url, q.href = q.href, u.crossDomain = Fb.protocol + "//" + Fb.host != q.protocol + "//" + q.host
                } catch (F) {
                    u.crossDomain = !0
                }
            }
            if (u.data && u.processData && "string" != typeof u.data && (u.data = l.param(u.data, u.traditional)), Sb(xc, u, d, M), p) return M;
            (s = l.event && u.global) && 0 === l.active++ && l.event.trigger("ajaxStart");
            u.type = u.type.toUpperCase();
            u.hasContent = !Dd.test(u.type);
            f = u.url.replace(Ad, "");
            u.hasContent ? u.data && u.processData && 0 === (u.contentType || "").indexOf("application/x-www-form-urlencoded") && (u.data = u.data.replace(zd, "+")) : (t = u.url.slice(f.length), u.data && (f += (Eb.test(f) ? "&" : "?") + u.data, delete u.data), !1 === u.cache && (f = f.replace(Bd, "$1"), t = (Eb.test(f) ? "&" : "?") + "_=" + vc++ + t), u.url = f + t);
            u.ifModified && (l.lastModified[f] && M.setRequestHeader("If-Modified-Since", l.lastModified[f]), l.etag[f] && M.setRequestHeader("If-None-Match", l.etag[f]));
            (u.data && u.hasContent && !1 !== u.contentType || d.contentType) && M.setRequestHeader("Content-Type", u.contentType);
            M.setRequestHeader("Accept", u.dataTypes[0] && u.accepts[u.dataTypes[0]] ? u.accepts[u.dataTypes[0]] + ("*" !== u.dataTypes[0] ? ", " + yc + "; q=0.01" : "") : u.accepts["*"]);
            for (m in u.headers) M.setRequestHeader(m, u.headers[m]);
            if (u.beforeSend && (!1 === u.beforeSend.call(x, M, u) || p)) return M.abort();
            if (O = "abort", E.add(u.complete), M.done(u.success), M.fail(u.error), j = Sb(qb, u, d, M)) {
                if (M.readyState = 1, s && z.trigger("ajaxSend", [M, u]), p) return M;
                u.async && 0 < u.timeout && (r = b.setTimeout(function() {
                    M.abort("timeout")
                }, u.timeout));
                try {
                    p = !1, j.send(B, e)
                } catch (J) {
                    if (p) throw J;
                    e(-1, J)
                }
            } else e(-1, "No Transport");
            return M
        },
        getJSON: function(b, c, d) {
            return l.get(b, c, d, "json")
        },
        getScript: function(b, c) {
            return l.get(b, void 0, c, "script")
        }
    });
    l.each(["get", "post"], function(b, c) {
        l[c] = function(b, d, e, j) {
            return l.isFunction(d) && (j = j || e, e = d, d = void 0), l.ajax(l.extend({
                url: b,
                type: c,
                dataType: j,
                data: d,
                success: e
            }, l.isPlainObject(b) && b))
        }
    });
    l._evalUrl = function(b) {
        return l.ajax({
            url: b,
            type: "GET",
            dataType: "script",
            cache: !0,
            async: !1,
            global: !1,
            "throws": !0
        })
    };
    l.fn.extend({
        wrapAll: function(b) {
            var c;
            return this[0] && (l.isFunction(b) && (b = b.call(this[0])), c = l(b, this[0].ownerDocument).eq(0).clone(!0), this[0].parentNode && c.insertBefore(this[0]), c.map(function() {
                    for (var b = this; b.firstElementChild;) b = b.firstElementChild;
                    return b
                }).append(this)),
                this
        },
        wrapInner: function(b) {
            return l.isFunction(b) ? this.each(function(c) {
                l(this).wrapInner(b.call(this, c))
            }) : this.each(function() {
                var c = l(this),
                    d = c.contents();
                d.length ? d.wrapAll(b) : c.append(b)
            })
        },
        wrap: function(b) {
            var c = l.isFunction(b);
            return this.each(function(d) {
                l(this).wrapAll(c ? b.call(this, d) : b)
            })
        },
        unwrap: function(b) {
            return this.parent(b).not("body").each(function() {
                l(this).replaceWith(this.childNodes)
            }), this
        }
    });
    l.expr.pseudos.hidden = function(b) {
        return !l.expr.pseudos.visible(b)
    };
    l.expr.pseudos.visible = function(b) {
        return !(!b.offsetWidth && !b.offsetHeight && !b.getClientRects().length)
    };
    l.ajaxSettings.xhr = function() {
        try {
            return new b.XMLHttpRequest
        } catch (c) {}
    };
    var Fd = {
            "0": 200,
            1223: 204
        },
        Ta = l.ajaxSettings.xhr();
    K.cors = !!Ta && "withCredentials" in Ta;
    K.ajax = Ta = !!Ta;
    l.ajaxTransport(function(c) {
        var d, e;
        if (K.cors || Ta && !c.crossDomain) return {
            send: function(j, f) {
                var g, n = c.xhr();
                if (n.open(c.type, c.url, c.async, c.username, c.password), c.xhrFields)
                    for (g in c.xhrFields) n[g] = c.xhrFields[g];
                c.mimeType && n.overrideMimeType && n.overrideMimeType(c.mimeType);
                c.crossDomain || j["X-Requested-With"] || (j["X-Requested-With"] = "XMLHttpRequest");
                for (g in j) n.setRequestHeader(g, j[g]);
                d = function(b) {
                    return function() {
                        d && (d = e = n.onload = n.onerror = n.onabort = n.onreadystatechange = null, "abort" === b ? n.abort() : "error" === b ? "number" != typeof n.status ? f(0, "error") : f(n.status, n.statusText) : f(Fd[n.status] || n.status, n.statusText, "text" !== (n.responseType || "text") || "string" != typeof n.responseText ? {
                            binary: n.response
                        } : {
                            text: n.responseText
                        }, n.getAllResponseHeaders()))
                    }
                };
                n.onload = d();
                e = n.onerror = d("error");
                void 0 !== n.onabort ? n.onabort = e : n.onreadystatechange = function() {
                    4 === n.readyState && b.setTimeout(function() {
                        d && e()
                    })
                };
                d = d("abort");
                try {
                    n.send(c.hasContent && c.data || null)
                } catch (l) {
                    if (d) throw l;
                }
            },
            abort: function() {
                d && d()
            }
        }
    });
    l.ajaxPrefilter(function(b) {
        b.crossDomain && (b.contents.script = !1)
    });
    l.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /\b(?:java|ecma)script\b/
        },
        converters: {
            "text script": function(b) {
                return l.globalEval(b),
                    b
            }
        }
    });
    l.ajaxPrefilter("script", function(b) {
        void 0 === b.cache && (b.cache = !1);
        b.crossDomain && (b.type = "GET")
    });
    l.ajaxTransport("script", function(b) {
        if (b.crossDomain) {
            var c, d;
            return {
                send: function(e, j) {
                    c = l("<script>").prop({
                        charset: b.scriptCharset,
                        src: b.url
                    }).on("load error", d = function(b) {
                        c.remove();
                        d = null;
                        b && j("error" === b.type ? 404 : 200, b.type)
                    });
                    A.head.appendChild(c[0])
                },
                abort: function() {
                    d && d()
                }
            }
        }
    });
    var zc = [],
        Gb = /(=)\?(?=&|$)|\?\?/;
    l.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            var b = zc.pop() || l.expando + "_" + vc++;
            return this[b] = !0, b
        }
    });
    l.ajaxPrefilter("json jsonp", function(c, d, e) {
        var j, f, g, n = !1 !== c.jsonp && (Gb.test(c.url) ? "url" : "string" == typeof c.data && 0 === (c.contentType || "").indexOf("application/x-www-form-urlencoded") && Gb.test(c.data) && "data");
        if (n || "jsonp" === c.dataTypes[0]) return j = c.jsonpCallback = l.isFunction(c.jsonpCallback) ? c.jsonpCallback() : c.jsonpCallback, n ? c[n] = c[n].replace(Gb, "$1" + j) : !1 !== c.jsonp && (c.url += (Eb.test(c.url) ? "&" : "?") + c.jsonp + "=" + j), c.converters["script json"] = function() {
            return g || l.error(j + " was not called"), g[0]
        }, c.dataTypes[0] = "json", f = b[j], b[j] = function() {
            g = arguments
        }, e.always(function() {
            void 0 === f ? l(b).removeProp(j) : b[j] = f;
            c[j] && (c.jsonpCallback = d.jsonpCallback, zc.push(j));
            g && l.isFunction(f) && f(g[0]);
            g = f = void 0
        }), "script"
    });
    var Gd = K,
        Ac, Bc = A.implementation.createHTMLDocument("").body;
    Ac = (Bc.innerHTML = "<form></form><form></form>", 2 === Bc.childNodes.length);
    Gd.createHTMLDocument = Ac;
    l.parseHTML = function(b, c, d) {
        if ("string" != typeof b) return [];
        "boolean" == typeof c && (d = c, c = !1);
        var e, j, f;
        return c || (K.createHTMLDocument ? (c = A.implementation.createHTMLDocument(""), e = c.createElement("base"), e.href = A.location.href, c.head.appendChild(e)) : c = A), j = hc.exec(b), f = !d && [], j ? [c.createElement(j[1])] : (j = C([b], c, f), f && f.length && l(f).remove(), l.merge([], j.childNodes))
    };
    l.fn.load = function(b, c, d) {
        var e, j, f, g = this,
            n = b.indexOf(" ");
        return -1 < n && (e = sa(b.slice(n)), b = b.slice(0, n)), l.isFunction(c) ? (d = c, c = void 0) : c && "object" == typeof c && (j = "POST"), 0 < g.length && l.ajax({
            url: b,
            type: j || "GET",
            dataType: "html",
            data: c
        }).done(function(b) {
            f = arguments;
            g.html(e ? l("<div>").append(l.parseHTML(b)).find(e) : b)
        }).always(d && function(b, c) {
            g.each(function() {
                d.apply(this, f || [b.responseText, c, b])
            })
        }), this
    };
    l.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(b, c) {
        l.fn[c] = function(b) {
            return this.on(c, b)
        }
    });
    l.expr.pseudos.animated = function(b) {
        return l.grep(l.timers, function(c) {
            return b === c.elem
        }).length
    };
    l.offset = {
        setOffset: function(b, c, d) {
            var e, j, f, g, n, r, q = l.css(b, "position"),
                p = l(b),
                s = {};
            "static" === q && (b.style.position = "relative");
            n = p.offset();
            f = l.css(b, "top");
            r = l.css(b, "left");
            ("absolute" === q || "fixed" === q) && -1 < (f + r).indexOf("auto") ? (e = p.position(), g = e.top, j = e.left) : (g = parseFloat(f) || 0, j = parseFloat(r) || 0);
            l.isFunction(c) && (c = c.call(b, d, l.extend({}, n)));
            null != c.top && (s.top = c.top - n.top + g);
            null != c.left && (s.left = c.left - n.left + j);
            "using" in c ? c.using.call(b, s) : p.css(s)
        }
    };
    l.fn.extend({
        offset: function(b) {
            if (arguments.length) return void 0 === b ? this : this.each(function(c) {
                l.offset.setOffset(this, b, c)
            });
            var c, d, e, j, f = this[0];
            if (f) return f.getClientRects().length ? (e = f.getBoundingClientRect(), c = f.ownerDocument, d = c.documentElement, j = c.defaultView, {
                top: e.top + j.pageYOffset - d.clientTop,
                left: e.left + j.pageXOffset - d.clientLeft
            }) : {
                top: 0,
                left: 0
            }
        },
        position: function() {
            if (this[0]) {
                var b, c, d = this[0],
                    j = {
                        top: 0,
                        left: 0
                    };
                return "fixed" === l.css(d, "position") ? c = d.getBoundingClientRect() : (b = this.offsetParent(), c = this.offset(), e(b[0], "html") || (j = b.offset()), j = {
                    top: j.top + l.css(b[0], "borderTopWidth", !0),
                    left: j.left + l.css(b[0], "borderLeftWidth", !0)
                }), {
                    top: c.top - j.top - l.css(d, "marginTop", !0),
                    left: c.left - j.left - l.css(d, "marginLeft", !0)
                }
            }
        },
        offsetParent: function() {
            return this.map(function() {
                for (var b = this.offsetParent; b && "static" === l.css(b, "position");) b = b.offsetParent;
                return b || lb
            })
        }
    });
    l.each({
        scrollLeft: "pageXOffset",
        scrollTop: "pageYOffset"
    }, function(b, c) {
        var d = "pageYOffset" === c;
        l.fn[b] = function(e) {
            return ka(this, function(b, e, j) {
                var f;
                return l.isWindow(b) ? f = b : 9 === b.nodeType && (f = b.defaultView), void 0 === j ? f ? f[c] : b[e] : void(f ? f.scrollTo(d ? f.pageXOffset : j, d ? j : f.pageYOffset) : b[e] = j)
            }, b, e, arguments.length)
        }
    });
    l.each(["top", "left"], function(b, c) {
        l.cssHooks[c] = Mb(K.pixelPosition, function(b, d) {
            if (d) return d = Na(b, c), ob.test(d) ? l(b).position()[c] + "px" : d
        })
    });
    l.each({
        Height: "height",
        Width: "width"
    }, function(b, c) {
        l.each({
            padding: "inner" + b,
            content: c,
            "": "outer" + b
        }, function(d, e) {
            l.fn[e] = function(j, f) {
                var g = arguments.length && (d || "boolean" != typeof j),
                    n = d || (!0 === j || !0 === f ? "margin" : "border");
                return ka(this, function(c, d, j) {
                    var f;
                    return l.isWindow(c) ? 0 === e.indexOf("outer") ? c["inner" + b] : c.document.documentElement["client" + b] : 9 === c.nodeType ? (f = c.documentElement, Math.max(c.body["scroll" + b], f["scroll" + b], c.body["offset" + b], f["offset" + b], f["client" + b])) : void 0 === j ? l.css(c, d, n) : l.style(c, d, j, n)
                }, c, g ? j : void 0, g)
            }
        })
    });
    l.fn.extend({
        bind: function(b, c, d) {
            return this.on(b, null, c, d)
        },
        unbind: function(b, c) {
            return this.off(b, null, c)
        },
        delegate: function(b, c, d, e) {
            return this.on(c, b, d, e)
        },
        undelegate: function(b, c, d) {
            return 1 === arguments.length ? this.off(b, "**") : this.off(c, b || "**", d)
        }
    });
    l.holdReady = function(b) {
        b ? l.readyWait++ : l.ready(!0)
    };
    l.isArray = Array.isArray;
    l.parseJSON = JSON.parse;
    l.nodeName = e;
    "function" == typeof define && define.amd && define("jquery", [], function() {
        return l
    });
    var Hd = b.jQuery,
        Id = b.$;
    return l.noConflict = function(c) {
        return b.$ === l && (b.$ = Id), c && b.jQuery === l && (b.jQuery = Hd), l
    }, c || (b.jQuery = b.$ = l), l
});

function getInternetExplorerVersion() {
    var b = -1;
    "Microsoft Internet Explorer" == navigator.appName && null != /MSIE ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent) && (b = parseFloat(RegExp.$1));
    return b
}
var ie = getInternetExplorerVersion();

function getQueryVariable(b) {
    for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
        var f = c[d].split("=");
        if (decodeURIComponent(f[0]) == b) return decodeURIComponent(f[1])
    }
}
this.jukebox = {};
jukebox.Player = function(b, c) {
    this.id = ++jukebox.__jukeboxId;
    this.origin = c || null;
    this.settings = {};
    for (var d in this.defaults) this.settings[d] = this.defaults[d];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var f in b) this.settings[f] = b[f];
    "[object Function]" === Object.prototype.toString.call(jukebox.Manager) && (jukebox.Manager = new jukebox.Manager);
    this.resource = this.isPlaying = null;
    this.resource = "[object Object]" === Object.prototype.toString.call(jukebox.Manager) ? jukebox.Manager.getPlayableResource(this.settings.resources) : this.settings.resources[0] || null;
    if (null === this.resource) throw "Your browser can't playback the given resources - or you have missed to include jukebox.Manager";
    this.__init();
    return this
};
jukebox.__jukeboxId = 0;
jukebox.Player.prototype = {
    defaults: {
        resources: [],
        autoplay: !1,
        spritemap: {},
        flashMediaElement: "./swf/FlashMediaElement.swf",
        timeout: 1E3
    },
    __addToManager: function() {
        !0 !== this.__wasAddedToManager && (jukebox.Manager.add(this), this.__wasAddedToManager = !0)
    },
    __init: function() {
        var b = this,
            c = this.settings,
            d = {},
            f;
        jukebox.Manager && void 0 !== jukebox.Manager.features && (d = jukebox.Manager.features);
        if (!0 === d.html5audio) {
            this.context = new Audio;
            this.context.src = this.resource;
            if (null === this.origin) {
                var e = function(c) {
                    b.__addToManager(c)
                };
                this.context.addEventListener("canplaythrough", e, !0);
                window.setTimeout(function() {
                    b.context.removeEventListener("canplaythrough", e, !0);
                    e("timeout")
                }, c.timeout)
            }
            this.context.autobuffer = !0;
            this.context.preload = !0;
            for (f in this.HTML5API) this[f] = this.HTML5API[f];
            1 < d.channels ? !0 === c.autoplay ? this.context.autoplay = !0 : void 0 !== c.spritemap[c.autoplay] && this.play(c.autoplay) : 1 === d.channels && void 0 !== c.spritemap[c.autoplay] && (this.backgroundMusic = c.spritemap[c.autoplay], this.backgroundMusic.started = Date.now ? Date.now() : +new Date, this.play(c.autoplay));
            1 == d.channels && !0 !== c.canPlayBackground && (window.addEventListener("pagehide", function() {
                null !== b.isPlaying && (b.pause(), b.__wasAutoPaused = !0)
            }), window.addEventListener("pageshow", function() {
                b.__wasAutoPaused && (b.resume(), delete b._wasAutoPaused)
            }))
        } else if (!0 === d.flashaudio) {
            for (f in this.FLASHAPI) this[f] = this.FLASHAPI[f];
            d = ["id=jukebox-flashstream-" + this.id, "autoplay=" + c.autoplay, "file=" + window.encodeURIComponent(this.resource)];
            this.__initFlashContext(d);
            !0 === c.autoplay ? this.play(0) : c.spritemap[c.autoplay] && this.play(c.autoplay)
        } else throw "Your Browser does not support Flash Audio or HTML5 Audio.";
    },
    __initFlashContext: function(b) {
        var c, d = this.settings.flashMediaElement,
            f, e = {
                flashvars: b.join("&"),
                quality: "high",
                bgcolor: "#000000",
                wmode: "transparent",
                allowscriptaccess: "always",
                allowfullscreen: "true"
            };
        if (navigator.userAgent.match(/MSIE/)) {
            c = document.createElement("div");
            document.getElementsByTagName("body")[0].appendChild(c);
            var g = document.createElement("object");
            g.id = "jukebox-flashstream-" + this.id;
            g.setAttribute("type", "application/x-shockwave-flash");
            g.setAttribute("classid", "clsid:d27cdb6e-ae6d-11cf-96b8-444553540000");
            g.setAttribute("width", "0");
            g.setAttribute("height", "0");
            e.movie = d + "?x=" + (Date.now ? Date.now() : +new Date);
            e.flashvars = b.join("&amp;");
            for (f in e) b = document.createElement("param"), b.setAttribute("name", f), b.setAttribute("value", e[f]), g.appendChild(b);
            c.outerHTML = g.outerHTML;
            this.context = document.getElementById("jukebox-flashstream-" + this.id)
        } else {
            c = document.createElement("embed");
            c.id = "jukebox-flashstream-" + this.id;
            c.setAttribute("type", "application/x-shockwave-flash");
            c.setAttribute("width", "100");
            c.setAttribute("height", "100");
            e.play = !1;
            e.loop = !1;
            e.src = d + "?x=" + (Date.now ? Date.now() : +new Date);
            for (f in e) c.setAttribute(f, e[f]);
            document.getElementsByTagName("body")[0].appendChild(c);
            this.context = c
        }
    },
    backgroundHackForiOS: function() {
        if (void 0 !== this.backgroundMusic) {
            var b = Date.now ? Date.now() : +new Date;
            void 0 === this.backgroundMusic.started ? (this.backgroundMusic.started = b, this.setCurrentTime(this.backgroundMusic.start)) : (this.backgroundMusic.lastPointer = (b - this.backgroundMusic.started) / 1E3 % (this.backgroundMusic.end - this.backgroundMusic.start) + this.backgroundMusic.start, this.play(this.backgroundMusic.lastPointer))
        }
    },
    play: function(b, c) {
        if (null !== this.isPlaying && !0 !== c) void 0 !== jukebox.Manager && jukebox.Manager.addToQueue(b, this.id);
        else {
            var d = this.settings.spritemap,
                f;
            if (void 0 !== d[b]) f = d[b].start;
            else if ("number" === typeof b) {
                f = b;
                for (var e in d)
                    if (f >= d[e].start && f <= d[e].end) {
                        b = e;
                        break
                    }
            }
            void 0 !== f && "[object Object]" === Object.prototype.toString.call(d[b]) && (this.isPlaying = this.settings.spritemap[b], this.context.play && this.context.play(), this.wasReady = this.setCurrentTime(f))
        }
    },
    stop: function() {
        this.__lastPosition = 0;
        this.isPlaying = null;
        this.backgroundMusic ? this.backgroundHackForiOS() : this.context.pause();
        return !0
    },
    pause: function() {
        this.isPlaying = null;
        this.__lastPosition = this.getCurrentTime();
        this.context.pause();
        return this.__lastPosition
    },
    resume: function(b) {
        b = "number" === typeof b ? b : this.__lastPosition;
        if (null !== b) return this.play(b), this.__lastPosition = null, !0;
        this.context.play();
        return !1
    },
    HTML5API: {
        getVolume: function() {
            return this.context.volume || 1
        },
        setVolume: function(b) {
            this.context.volume = b;
            return 1E-4 > Math.abs(this.context.volume - b) ? !0 : !1
        },
        getCurrentTime: function() {
            return this.context.currentTime || 0
        },
        setCurrentTime: function(b) {
            try {
                return this.context.currentTime = b, !0
            } catch (c) {
                return !1
            }
        }
    },
    FLASHAPI: {
        getVolume: function() {
            return this.context && "function" === typeof this.context.getVolume ? this.context.getVolume() : 1
        },
        setVolume: function(b) {
            return this.context && "function" === typeof this.context.setVolume ? (this.context.setVolume(b), !0) : !1
        },
        getCurrentTime: function() {
            return this.context && "function" === typeof this.context.getCurrentTime ? this.context.getCurrentTime() : 0
        },
        setCurrentTime: function(b) {
            return this.context && "function" === typeof this.context.setCurrentTime ? this.context.setCurrentTime(b) : !1
        }
    }
};
if (void 0 === this.jukebox) throw "jukebox.Manager requires jukebox.Player (Player.js) to run properly.";
jukebox.Manager = function(b) {
    this.features = {};
    this.codecs = {};
    this.__players = {};
    this.__playersLength = 0;
    this.__clones = {};
    this.__queue = [];
    this.settings = {};
    for (var c in this.defaults) this.settings[c] = this.defaults[c];
    if ("[object Object]" === Object.prototype.toString.call(b))
        for (var d in b) this.settings[d] = b[d];
    this.__detectFeatures();
    jukebox.Manager.__initialized = !1 === this.settings.useGameLoop ? window.setInterval(function() {
        jukebox.Manager.loop()
    }, 20) : !0
};
jukebox.Manager.prototype = {
    defaults: {
        useFlash: !1,
        useGameLoop: !1
    },
    __detectFeatures: function() {
        var b = window.Audio && new Audio;
        if (b && b.canPlayType && !1 === this.settings.useFlash) {
            for (var c = [{
                        e: "3gp",
                        m: ["audio/3gpp", "audio/amr"]
                    }, {
                        e: "aac",
                        m: ["audio/aac", "audio/aacp"]
                    }, {
                        e: "amr",
                        m: ["audio/amr", "audio/3gpp"]
                    }, {
                        e: "caf",
                        m: ["audio/IMA-ADPCM", "audio/x-adpcm", 'audio/x-aiff; codecs="IMA-ADPCM, ADPCM"']
                    }, {
                        e: "m4a",
                        m: 'audio/mp4{audio/mp4; codecs="mp4a.40.2,avc1.42E01E"{audio/mpeg4{audio/mpeg4-generic{audio/mp4a-latm{audio/MP4A-LATM{audio/x-m4a'.split("{")
                    }, {
                        e: "mp3",
                        m: ["audio/mp3", "audio/mpeg", 'audio/mpeg; codecs="mp3"', "audio/MPA", "audio/mpa-robust"]
                    }, {
                        e: "mpga",
                        m: ["audio/MPA", "audio/mpa-robust", "audio/mpeg", "video/mpeg"]
                    }, {
                        e: "mp4",
                        m: ["audio/mp4", "video/mp4"]
                    }, {
                        e: "ogg",
                        m: ["application/ogg", "audio/ogg", 'audio/ogg; codecs="theora, vorbis"', "video/ogg", 'video/ogg; codecs="theora, vorbis"']
                    }, {
                        e: "wav",
                        m: ["audio/wave", "audio/wav", 'audio/wav; codecs="1"', "audio/x-wav", "audio/x-pn-wav"]
                    }, {
                        e: "webm",
                        m: ["audio/webm", 'audio/webm; codecs="vorbis"', "video/webm"]
                    }],
                    d, f, e = 0, g = c.length; e < g; e++)
                if (f = c[e].e, c[e].m.length && "object" === typeof c[e].m)
                    for (var m = 0, p = c[e].m.length; m < p; m++)
                        if (d = c[e].m[m], "" !== b.canPlayType(d)) {
                            this.codecs[f] = d;
                            break
                        } else this.codecs[f] || (this.codecs[f] = !1);
            this.features.html5audio = !(!this.codecs.mp3 && !this.codecs.ogg && !this.codecs.webm && !this.codecs.wav);
            this.features.channels = 8;
            b.volume = 0.1337;
            this.features.volume = !!(1E-4 > Math.abs(b.volume - 0.1337));
            navigator.userAgent.match(/iPhone|iPod|iPad/i) && (this.features.channels = 1)
        }
        this.features.flashaudio = !!navigator.mimeTypes["application/x-shockwave-flash"] || !!navigator.plugins["Shockwave Flash"] || !1;
        if (window.ActiveXObject) try {
            new ActiveXObject("ShockwaveFlash.ShockwaveFlash.10"), this.features.flashaudio = !0
        } catch (j) {}!0 === this.settings.useFlash && (this.features.flashaudio = !0);
        !0 === this.features.flashaudio && !this.features.html5audio && (this.codecs.mp3 = "audio/mp3", this.codecs.mpga = "audio/mpeg", this.codecs.mp4 = "audio/mp4", this.codecs.m4a = "audio/mp4", this.codecs["3gp"] = "audio/3gpp", this.codecs.amr = "audio/amr", this.features.volume = !0, this.features.channels = 1)
    },
    __getPlayerById: function(b) {
        return this.__players && void 0 !== this.__players[b] ? this.__players[b] : null
    },
    __getClone: function(b, c) {
        for (var d in this.__clones) {
            var f = this.__clones[d];
            if (null === f.isPlaying && f.origin === b) return f
        }
        if ("[object Object]" === Object.prototype.toString.call(c)) {
            d = {};
            for (var e in c) d[e] = c[e];
            d.autoplay = !1;
            e = new jukebox.Player(d, b);
            e.isClone = !0;
            e.wasReady = !1;
            return this.__clones[e.id] = e
        }
        return null
    },
    loop: function() {
        if (0 !== this.__playersLength)
            if (this.__queue.length && this.__playersLength < this.features.channels) {
                var b = this.__queue[0],
                    c = this.__getPlayerById(b.origin);
                if (null !== c) {
                    var d = this.__getClone(b.origin, c.settings);
                    null !== d && (!0 === this.features.volume && (c = this.__players[b.origin]) && d.setVolume(c.getVolume()), this.add(d), d.play(b.pointer, !0))
                }
                this.__queue.splice(0, 1)
            } else
                for (d in this.__queue.length && 1 === this.features.channels && (b = this.__queue[0], c = this.__getPlayerById(b.origin), null !== c && c.play(b.pointer, !0), this.__queue.splice(0, 1)), this.__players) b = this.__players[d],
                    c = b.getCurrentTime() || 0, b.isPlaying && !1 === b.wasReady ? b.wasReady = b.setCurrentTime(b.isPlaying.start) : b.isPlaying && !0 === b.wasReady ? c > b.isPlaying.end && (!0 === b.isPlaying.loop ? b.play(b.isPlaying.start, !0) : b.stop()) : b.isClone && null === b.isPlaying ? this.remove(b) : void 0 !== b.backgroundMusic && null === b.isPlaying && c > b.backgroundMusic.end && b.backgroundHackForiOS()
    },
    getPlayableResource: function(b) {
        "[object Array]" !== Object.prototype.toString.call(b) && (b = [b]);
        for (var c = 0, d = b.length; c < d; c++) {
            var f = b[c],
                e = f.match(/\.([^\.]*)$/)[1];
            if (e && this.codecs[e]) return f
        }
        return null
    },
    add: function(b) {
        return b instanceof jukebox.Player && void 0 === this.__players[b.id] ? (this.__playersLength++, this.__players[b.id] = b, !0) : !1
    },
    remove: function(b) {
        return b instanceof jukebox.Player && void 0 !== this.__players[b.id] ? (this.__playersLength--, delete this.__players[b.id], !0) : !1
    },
    addToQueue: function(b, c) {
        return ("string" === typeof b || "number" === typeof b) && void 0 !== this.__players[c] ? (this.__queue.push({
            pointer: b,
            origin: c
        }), !0) : !1
    }
};
(function() {
    var b = function() {
        this.init()
    };
    b.prototype = {
        init: function() {
            var b = this || c;
            b._counter = 1E3;
            b._html5AudioPool = [];
            b.html5PoolSize = 10;
            b._codecs = {};
            b._howls = [];
            b._muted = !1;
            b._volume = 1;
            b._canPlayEvent = "canplaythrough";
            b._navigator = "undefined" !== typeof window && window.navigator ? window.navigator : null;
            b.masterGain = null;
            b.noAudio = !1;
            b.usingWebAudio = !0;
            b.autoSuspend = !1;
            b.ctx = null;
            b.autoUnlock = !0;
            b._setup();
            return b
        },
        volume: function(b) {
            var d = this || c;
            b = parseFloat(b);
            d.ctx || p();
            if ("undefined" !== typeof b && 0 <= b && 1 >= b) {
                d._volume = b;
                if (d._muted) return d;
                d.usingWebAudio && d.masterGain.gain.setValueAtTime(b, c.ctx.currentTime);
                for (var e = 0; e < d._howls.length; e++)
                    if (!d._howls[e]._webAudio)
                        for (var f = d._howls[e]._getSoundIds(), g = 0; g < f.length; g++) {
                            var m = d._howls[e]._soundById(f[g]);
                            m && m._node && (m._node.volume = m._volume * b)
                        }
                return d
            }
            return d._volume
        },
        mute: function(b) {
            var d = this || c;
            d.ctx || p();
            d._muted = b;
            d.usingWebAudio && d.masterGain.gain.setValueAtTime(b ? 0 : d._volume, c.ctx.currentTime);
            for (var e = 0; e < d._howls.length; e++)
                if (!d._howls[e]._webAudio)
                    for (var f = d._howls[e]._getSoundIds(), g = 0; g < f.length; g++) {
                        var m = d._howls[e]._soundById(f[g]);
                        m && m._node && (m._node.muted = b ? !0 : m._muted)
                    }
            return d
        },
        unload: function() {
            for (var b = this || c, d = b._howls.length - 1; 0 <= d; d--) b._howls[d].unload();
            b.usingWebAudio && b.ctx && "undefined" !== typeof b.ctx.close && (b.ctx.close(), b.ctx = null, p());
            return b
        },
        codecs: function(b) {
            return (this || c)._codecs[b.replace(/^x-/, "")]
        },
        _setup: function() {
            var b = this || c;
            b.state = b.ctx ? b.ctx.state || "suspended" : "suspended";
            b._autoSuspend();
            if (!b.usingWebAudio)
                if ("undefined" !== typeof Audio) try {
                    var d = new Audio;
                    "undefined" === typeof d.oncanplaythrough && (b._canPlayEvent = "canplay")
                } catch (e) {
                    b.noAudio = !0
                } else b.noAudio = !0;
            try {
                d = new Audio, d.muted && (b.noAudio = !0)
            } catch (f) {}
            b.noAudio || b._setupCodecs();
            return b
        },
        _setupCodecs: function() {
            var b = this || c,
                d = null;
            try {
                d = "undefined" !== typeof Audio ? new Audio : null
            } catch (e) {
                return b
            }
            if (!d || "function" !== typeof d.canPlayType) return b;
            var f = d.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                g = b._navigator && b._navigator.userAgent.match(/OPR\/([0-6].)/g),
                g = g && 33 > parseInt(g[0].split("/")[1], 10);
            b._codecs = {
                mp3: !(g || !f && !d.canPlayType("audio/mp3;").replace(/^no$/, "")),
                mpeg: !!f,
                opus: !!d.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                ogg: !!d.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                oga: !!d.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                wav: !!d.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                aac: !!d.canPlayType("audio/aac;").replace(/^no$/, ""),
                caf: !!d.canPlayType("audio/x-caf;").replace(/^no$/, ""),
                m4a: !!(d.canPlayType("audio/x-m4a;") || d.canPlayType("audio/m4a;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
                mp4: !!(d.canPlayType("audio/x-mp4;") || d.canPlayType("audio/mp4;") || d.canPlayType("audio/aac;")).replace(/^no$/, ""),
                weba: !!d.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                webm: !!d.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, ""),
                dolby: !!d.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/, ""),
                flac: !!(d.canPlayType("audio/x-flac;") || d.canPlayType("audio/flac;")).replace(/^no$/, "")
            };
            return b
        },
        _unlockAudio: function() {
            var b = this || c;
            if (!b._audioUnlocked && b.ctx) {
                b._audioUnlocked = !1;
                b.autoUnlock = !1;
                !b._mobileUnloaded && 44100 !== b.ctx.sampleRate && (b._mobileUnloaded = !0, b.unload());
                b._scratchBuffer = b.ctx.createBuffer(1, 1, 22050);
                var d = function() {
                    for (var c = 0; c < b.html5PoolSize; c++) try {
                        var e = new Audio;
                        e._unlocked = !0;
                        b._releaseHtml5Audio(e)
                    } catch (f) {
                        b.noAudio = !0
                    }
                    for (c = 0; c < b._howls.length; c++)
                        if (!b._howls[c]._webAudio)
                            for (var e = b._howls[c]._getSoundIds(), g = 0; g < e.length; g++) {
                                var p = b._howls[c]._soundById(e[g]);
                                p && p._node && !p._node._unlocked && (p._node._unlocked = !0, p._node.load())
                            }
                    b._autoResume();
                    var m = b.ctx.createBufferSource();
                    m.buffer = b._scratchBuffer;
                    m.connect(b.ctx.destination);
                    "undefined" === typeof m.start ? m.noteOn(0) : m.start(0);
                    "function" === typeof b.ctx.resume && b.ctx.resume();
                    m.onended = function() {
                        m.disconnect(0);
                        b._audioUnlocked = !0;
                        document.removeEventListener("touchstart", d, !0);
                        document.removeEventListener("touchend", d, !0);
                        document.removeEventListener("click", d, !0);
                        for (var c = 0; c < b._howls.length; c++) b._howls[c]._emit("unlock")
                    }
                };
                document.addEventListener("touchstart", d, !0);
                document.addEventListener("touchend", d, !0);
                document.addEventListener("click", d, !0);
                return b
            }
        },
        _obtainHtml5Audio: function() {
            var b = this || c;
            if (b._html5AudioPool.length) return b._html5AudioPool.pop();
            (b = (new Audio).play()) && "undefined" !== typeof Promise && (b instanceof Promise || "function" === typeof b.then) && b.catch(function() {
                console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")
            });
            return new Audio
        },
        _releaseHtml5Audio: function(b) {
            var d = this || c;
            b._unlocked && d._html5AudioPool.push(b);
            return d
        },
        _autoSuspend: function() {
            var b = this;
            if (b.autoSuspend && b.ctx && "undefined" !== typeof b.ctx.suspend && c.usingWebAudio) {
                for (var d = 0; d < b._howls.length; d++)
                    if (b._howls[d]._webAudio)
                        for (var e = 0; e < b._howls[d]._sounds.length; e++)
                            if (!b._howls[d]._sounds[e]._paused) return b;
                b._suspendTimer && clearTimeout(b._suspendTimer);
                b._suspendTimer = setTimeout(function() {
                    b.autoSuspend && (b._suspendTimer = null, b.state = "suspending", b.ctx.suspend().then(function() {
                        b.state = "suspended";
                        b._resumeAfterSuspend && (delete b._resumeAfterSuspend, b._autoResume())
                    }))
                }, 3E4);
                return b
            }
        },
        _autoResume: function() {
            var b = this;
            if (b.ctx && "undefined" !== typeof b.ctx.resume && c.usingWebAudio) return "running" === b.state && b._suspendTimer ? (clearTimeout(b._suspendTimer), b._suspendTimer = null) : "suspended" === b.state ? (b.ctx.resume().then(function() {
                b.state = "running";
                for (var c = 0; c < b._howls.length; c++) b._howls[c]._emit("resume")
            }), b._suspendTimer && (clearTimeout(b._suspendTimer), b._suspendTimer = null)) : "suspending" === b.state && (b._resumeAfterSuspend = !0), b
        }
    };
    var c = new b,
        d = function(b) {
            !b.src || 0 === b.src.length ? console.error("An array of source files must be passed with any new Howl.") : this.init(b)
        };
    d.prototype = {
        init: function(b) {
            var d = this;
            c.ctx || p();
            d._autoplay = b.autoplay || !1;
            d._format = "string" !== typeof b.format ? b.format : [b.format];
            d._html5 = b.html5 || !1;
            d._muted = b.mute || !1;
            d._loop = b.loop || !1;
            d._pool = b.pool || 5;
            d._preload = "boolean" === typeof b.preload ? b.preload : !0;
            d._rate = b.rate || 1;
            d._sprite = b.sprite || {};
            d._src = "string" !== typeof b.src ? b.src : [b.src];
            d._volume = void 0 !== b.volume ? b.volume : 1;
            d._xhrWithCredentials = b.xhrWithCredentials || !1;
            d._duration = 0;
            d._state = "unloaded";
            d._sounds = [];
            d._endTimers = {};
            d._queue = [];
            d._playLock = !1;
            d._onend = b.onend ? [{
                fn: b.onend
            }] : [];
            d._onfade = b.onfade ? [{
                fn: b.onfade
            }] : [];
            d._onload = b.onload ? [{
                fn: b.onload
            }] : [];
            d._onloaderror = b.onloaderror ? [{
                fn: b.onloaderror
            }] : [];
            d._onplayerror = b.onplayerror ? [{
                fn: b.onplayerror
            }] : [];
            d._onpause = b.onpause ? [{
                fn: b.onpause
            }] : [];
            d._onplay = b.onplay ? [{
                fn: b.onplay
            }] : [];
            d._onstop = b.onstop ? [{
                fn: b.onstop
            }] : [];
            d._onmute = b.onmute ? [{
                fn: b.onmute
            }] : [];
            d._onvolume = b.onvolume ? [{
                fn: b.onvolume
            }] : [];
            d._onrate = b.onrate ? [{
                fn: b.onrate
            }] : [];
            d._onseek = b.onseek ? [{
                fn: b.onseek
            }] : [];
            d._onunlock = b.onunlock ? [{
                fn: b.onunlock
            }] : [];
            d._onresume = [];
            d._webAudio = c.usingWebAudio && !d._html5;
            "undefined" !== typeof c.ctx && c.ctx && c.autoUnlock && c._unlockAudio();
            c._howls.push(d);
            d._autoplay && d._queue.push({
                event: "play",
                action: function() {
                    d.play()
                }
            });
            d._preload && d.load();
            return d
        },
        load: function() {
            var b = null;
            if (c.noAudio) this._emit("loaderror", null, "No audio support.");
            else {
                "string" === typeof this._src && (this._src = [this._src]);
                for (var d = 0; d < this._src.length; d++) {
                    var r, q;
                    if (this._format && this._format[d]) r = this._format[d];
                    else {
                        q = this._src[d];
                        if ("string" !== typeof q) {
                            this._emit("loaderror", null, "Non-string found in selected audio sources - ignoring.");
                            continue
                        }(r = /^data:audio\/([^;,]+);/i.exec(q)) || (r = /\.([^.]+)$/.exec(q.split("?", 1)[0]));
                        r && (r = r[1].toLowerCase())
                    }
                    r || console.warn('No file extension was found. Consider using the "format" property or specify an extension.');
                    if (r && c.codecs(r)) {
                        b = this._src[d];
                        break
                    }
                }
                if (b) {
                    this._src = b;
                    this._state = "loading";
                    "https:" === window.location.protocol && "http:" === b.slice(0, 5) && (this._html5 = !0, this._webAudio = !1);
                    new f(this);
                    if (this._webAudio) {
                        var p = this,
                            t = p._src;
                        if (e[t]) p._duration = e[t].duration, m(p);
                        else if (/^data:[^;]+;base64,/.test(t)) {
                            b = atob(t.split(",")[1]);
                            d = new Uint8Array(b.length);
                            for (r = 0; r < b.length; ++r) d[r] = b.charCodeAt(r);
                            g(d.buffer, p)
                        } else {
                            var u = new XMLHttpRequest;
                            u.open("GET", t, !0);
                            u.withCredentials = p._xhrWithCredentials;
                            u.responseType = "arraybuffer";
                            u.onload = function() {
                                var b = (u.status + "")[0];
                                "0" !== b && "2" !== b && "3" !== b ? p._emit("loaderror", null, "Failed loading audio file with status: " + u.status + ".") : g(u.response, p)
                            };
                            u.onerror = function() {
                                p._webAudio && (p._html5 = !0, p._webAudio = !1, p._sounds = [], delete e[t], p.load())
                            };
                            try {
                                u.send()
                            } catch (x) {
                                u.onerror()
                            }
                        }
                    }
                    return this
                }
                this._emit("loaderror", null, "No codec support for selected audio sources.")
            }
        },
        play: function(b, d) {
            var e = this,
                f = null;
            if ("number" === typeof b) f = b, b = null;
            else {
                if ("string" === typeof b && "loaded" === e._state && !e._sprite[b]) return null;
                if ("undefined" === typeof b && (b = "__default", !e._playLock)) {
                    for (var g = 0, p = 0; p < e._sounds.length; p++) e._sounds[p]._paused && !e._sounds[p]._ended && (g++, f = e._sounds[p]._id);
                    1 === g ? b = null : f = null
                }
            }
            var m = f ? e._soundById(f) : e._inactiveSound();
            if (!m) return null;
            f && !b && (b = m._sprite || "__default");
            if ("loaded" !== e._state) {
                m._sprite = b;
                m._ended = !1;
                var x = m._id;
                e._queue.push({
                    event: "play",
                    action: function() {
                        e.play(x)
                    }
                });
                return x
            }
            if (f && !m._paused) return d || e._loadQueue("play"),
                m._id;
            e._webAudio && c._autoResume();
            var z = Math.max(0, 0 < m._seek ? m._seek : e._sprite[b][0] / 1E3),
                C = Math.max(0, (e._sprite[b][0] + e._sprite[b][1]) / 1E3 - z),
                O = 1E3 * C / Math.abs(m._rate),
                H = e._sprite[b][0] / 1E3,
                Ka = (e._sprite[b][0] + e._sprite[b][1]) / 1E3,
                La = !(!m._loop && !e._sprite[b][2]);
            m._sprite = b;
            m._ended = !1;
            var Ca = function() {
                m._paused = !1;
                m._seek = z;
                m._start = H;
                m._stop = Ka;
                m._loop = La
            };
            if (z >= Ka) e._ended(m);
            else {
                var F = m._node;
                if (e._webAudio) f = function() {
                    e._playLock = !1;
                    Ca();
                    e._refreshBuffer(m);
                    F.gain.setValueAtTime(m._muted || e._muted ? 0 : m._volume, c.ctx.currentTime);
                    m._playStart = c.ctx.currentTime;
                    "undefined" === typeof F.bufferSource.start ? m._loop ? F.bufferSource.noteGrainOn(0, z, 86400) : F.bufferSource.noteGrainOn(0, z, C) : m._loop ? F.bufferSource.start(0, z, 86400) : F.bufferSource.start(0, z, C);
                    Infinity !== O && (e._endTimers[m._id] = setTimeout(e._ended.bind(e, m), O));
                    d || setTimeout(function() {
                        e._emit("play", m._id);
                        e._loadQueue()
                    }, 0)
                }, "running" === c.state ? f() : (e._playLock = !0, e.once("resume", f), e._clearTimer(m._id));
                else {
                    var U = function() {
                        F.currentTime = z;
                        F.muted = m._muted || e._muted || c._muted || F.muted;
                        F.volume = m._volume * c.volume();
                        F.playbackRate = m._rate;
                        try {
                            var f = F.play();
                            f && "undefined" !== typeof Promise && (f instanceof Promise || "function" === typeof f.then) ? (e._playLock = !0, Ca(), f.then(function() {
                                e._playLock = !1;
                                F._unlocked = !0;
                                d || (e._emit("play", m._id), e._loadQueue())
                            }).catch(function() {
                                e._playLock = !1;
                                e._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.");
                                m._ended = !0;
                                m._paused = !0
                            })) : d || (e._playLock = !1, Ca(), e._emit("play", m._id), e._loadQueue());
                            F.playbackRate = m._rate;
                            F.paused ? e._emit("playerror", m._id, "Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.") : "__default" !== b || m._loop ? e._endTimers[m._id] = setTimeout(e._ended.bind(e, m), O) : (e._endTimers[m._id] = function() {
                                e._ended(m);
                                F.removeEventListener("ended", e._endTimers[m._id], !1)
                            }, F.addEventListener("ended", e._endTimers[m._id], !1))
                        } catch (g) {
                            e._emit("playerror", m._id, g)
                        }
                    };
                    "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA" === F.src && (F.src = e._src, F.load());
                    f = window && window.ejecta || !F.readyState && c._navigator.isCocoonJS;
                    if (3 <= F.readyState || f) U();
                    else {
                        e._playLock = !0;
                        var Ma = function() {
                            U();
                            F.removeEventListener(c._canPlayEvent, Ma, !1)
                        };
                        F.addEventListener(c._canPlayEvent, Ma, !1);
                        e._clearTimer(m._id)
                    }
                }
                return m._id
            }
        },
        pause: function(b, c) {
            var d = this;
            if ("loaded" !== d._state || d._playLock) return d._queue.push({
                event: "pause",
                action: function() {
                    d.pause(b)
                }
            }), d;
            for (var e = d._getSoundIds(b), f = 0; f < e.length; f++) {
                d._clearTimer(e[f]);
                var g = d._soundById(e[f]);
                if (g && !g._paused && (g._seek = d.seek(e[f]), g._rateSeek = 0, g._paused = !0, d._stopFade(e[f]), g._node))
                    if (d._webAudio) {
                        if (!g._node.bufferSource) continue;
                        "undefined" === typeof g._node.bufferSource.stop ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0);
                        d._cleanBuffer(g._node)
                    } else(!isNaN(g._node.duration) || Infinity === g._node.duration) && g._node.pause();
                c || d._emit("pause", g ? g._id : null)
            }
            return d
        },
        stop: function(b, c) {
            var d = this;
            if ("loaded" !== d._state || d._playLock) return d._queue.push({
                event: "stop",
                action: function() {
                    d.stop(b)
                }
            }), d;
            for (var e = d._getSoundIds(b), f = 0; f < e.length; f++) {
                d._clearTimer(e[f]);
                var g = d._soundById(e[f]);
                if (g) {
                    g._seek = g._start || 0;
                    g._rateSeek = 0;
                    g._paused = !0;
                    g._ended = !0;
                    d._stopFade(e[f]);
                    if (g._node)
                        if (d._webAudio) g._node.bufferSource && ("undefined" === typeof g._node.bufferSource.stop ? g._node.bufferSource.noteOff(0) : g._node.bufferSource.stop(0), d._cleanBuffer(g._node));
                        else if (!isNaN(g._node.duration) || Infinity === g._node.duration) g._node.currentTime = g._start || 0, g._node.pause(), Infinity === g._node.duration && d._clearSound(g._node);
                    c || d._emit("stop", g._id)
                }
            }
            return d
        },
        mute: function(b, d) {
            var e = this;
            if ("loaded" !== e._state || e._playLock) return e._queue.push({
                event: "mute",
                action: function() {
                    e.mute(b, d)
                }
            }), e;
            if ("undefined" === typeof d)
                if ("boolean" === typeof b) e._muted = b;
                else return e._muted;
            for (var f = e._getSoundIds(d), g = 0; g < f.length; g++) {
                var p = e._soundById(f[g]);
                p && (p._muted = b, p._interval && e._stopFade(p._id), e._webAudio && p._node ? p._node.gain.setValueAtTime(b ? 0 : p._volume, c.ctx.currentTime) : p._node && (p._node.muted = c._muted ? !0 : b), e._emit("mute", p._id))
            }
            return e
        },
        volume: function() {
            var b = this,
                d = arguments,
                e, f;
            if (0 === d.length) return b._volume;
            1 === d.length || 2 === d.length && "undefined" === typeof d[1] ? 0 <= b._getSoundIds().indexOf(d[0]) ? f = parseInt(d[0], 10) : e = parseFloat(d[0]) : 2 <= d.length && (e = parseFloat(d[0]), f = parseInt(d[1], 10));
            var g;
            if ("undefined" !== typeof e && 0 <= e && 1 >= e) {
                if ("loaded" !== b._state || b._playLock) return b._queue.push({
                    event: "volume",
                    action: function() {
                        b.volume.apply(b, d)
                    }
                }), b;
                "undefined" === typeof f && (b._volume = e);
                f = b._getSoundIds(f);
                for (var p = 0; p < f.length; p++)
                    if (g = b._soundById(f[p])) g._volume = e, d[2] || b._stopFade(f[p]), b._webAudio && g._node && !g._muted ? g._node.gain.setValueAtTime(e, c.ctx.currentTime) : g._node && !g._muted && (g._node.volume = e * c.volume()), b._emit("volume", g._id)
            } else return (g = f ? b._soundById(f) : b._sounds[0]) ? g._volume : 0;
            return b
        },
        fade: function(b, d, e, f) {
            var g = this;
            if ("loaded" !== g._state || g._playLock) return g._queue.push({
                event: "fade",
                action: function() {
                    g.fade(b, d, e, f)
                }
            }), g;
            b = parseFloat(b);
            d = parseFloat(d);
            e = parseFloat(e);
            g.volume(b, f);
            for (var p = g._getSoundIds(f), m = 0; m < p.length; m++) {
                var x = g._soundById(p[m]);
                if (x) {
                    f || g._stopFade(p[m]);
                    if (g._webAudio && !x._muted) {
                        var z = c.ctx.currentTime,
                            C = z + e / 1E3;
                        x._volume = b;
                        x._node.gain.setValueAtTime(b, z);
                        x._node.gain.linearRampToValueAtTime(d, C)
                    }
                    g._startFadeInterval(x, b, d, e, p[m], "undefined" === typeof f)
                }
            }
            return g
        },
        _startFadeInterval: function(b, c, d, e, f, g) {
            var p = this,
                m = c,
                z = d - c;
            f = Math.abs(z / 0.01);
            f = Math.max(4, 0 < f ? e / f : e);
            var C = Date.now();
            b._fadeTo = d;
            b._interval = setInterval(function() {
                var f = (Date.now() - C) / e;
                C = Date.now();
                m += z * f;
                m = Math.max(0, m);
                m = Math.min(1, m);
                m = Math.round(100 * m) / 100;
                p._webAudio ? b._volume = m : p.volume(m, b._id, !0);
                g && (p._volume = m);
                if (d < c && m <= d || d > c && m >= d) clearInterval(b._interval), b._interval = null, b._fadeTo = null, p.volume(d, b._id), p._emit("fade", b._id)
            }, f)
        },
        _stopFade: function(b) {
            var d = this._soundById(b);
            d && d._interval && (this._webAudio && d._node.gain.cancelScheduledValues(c.ctx.currentTime), clearInterval(d._interval), d._interval = null, this.volume(d._fadeTo, b), d._fadeTo = null, this._emit("fade", b));
            return this
        },
        loop: function() {
            var b = arguments,
                c, d;
            if (0 === b.length) return this._loop;
            if (1 === b.length)
                if ("boolean" === typeof b[0]) this._loop = c = b[0];
                else return (b = this._soundById(parseInt(b[0], 10))) ? b._loop : !1;
            else 2 === b.length && (c = b[0], d = parseInt(b[1], 10));
            d = this._getSoundIds(d);
            for (var e = 0; e < d.length; e++)
                if (b = this._soundById(d[e]))
                    if (b._loop = c, this._webAudio && b._node && b._node.bufferSource && (b._node.bufferSource.loop = c)) b._node.bufferSource.loopStart = b._start || 0, b._node.bufferSource.loopEnd = b._stop;
            return this
        },
        rate: function() {
            var b = this,
                d = arguments,
                e, f;
            0 === d.length ? f = b._sounds[0]._id : 1 === d.length ? 0 <= b._getSoundIds().indexOf(d[0]) ? f = parseInt(d[0], 10) : e = parseFloat(d[0]) : 2 === d.length && (e = parseFloat(d[0]), f = parseInt(d[1], 10));
            var g;
            if ("number" === typeof e) {
                if ("loaded" !== b._state || b._playLock) return b._queue.push({
                    event: "rate",
                    action: function() {
                        b.rate.apply(b, d)
                    }
                }), b;
                "undefined" === typeof f && (b._rate = e);
                f = b._getSoundIds(f);
                for (var p = 0; p < f.length; p++)
                    if (g = b._soundById(f[p])) {
                        b.playing(f[p]) && (g._rateSeek = b.seek(f[p]), g._playStart = b._webAudio ? c.ctx.currentTime : g._playStart);
                        g._rate = e;
                        b._webAudio && g._node && g._node.bufferSource ? g._node.bufferSource.playbackRate.setValueAtTime(e, c.ctx.currentTime) : g._node && (g._node.playbackRate = e);
                        var m = b.seek(f[p]),
                            m = 1E3 * ((b._sprite[g._sprite][0] + b._sprite[g._sprite][1]) / 1E3 - m) / Math.abs(g._rate);
                        if (b._endTimers[f[p]] || !g._paused) b._clearTimer(f[p]),
                            b._endTimers[f[p]] = setTimeout(b._ended.bind(b, g), m);
                        b._emit("rate", g._id)
                    }
            } else return (g = b._soundById(f)) ? g._rate : b._rate;
            return b
        },
        seek: function() {
            var b = this,
                d = arguments,
                e, f;
            0 === d.length ? f = b._sounds[0]._id : 1 === d.length ? 0 <= b._getSoundIds().indexOf(d[0]) ? f = parseInt(d[0], 10) : b._sounds.length && (f = b._sounds[0]._id, e = parseFloat(d[0])) : 2 === d.length && (e = parseFloat(d[0]), f = parseInt(d[1], 10));
            if ("undefined" === typeof f) return b;
            if ("loaded" !== b._state || b._playLock) return b._queue.push({
                event: "seek",
                action: function() {
                    b.seek.apply(b, d)
                }
            }), b;
            var g = b._soundById(f);
            if (g)
                if ("number" === typeof e && 0 <= e) {
                    var p = b.playing(f);
                    p && b.pause(f, !0);
                    g._seek = e;
                    g._ended = !1;
                    b._clearTimer(f);
                    !b._webAudio && g._node && !isNaN(g._node.duration) && (g._node.currentTime = e);
                    var m = function() {
                        b._emit("seek", f);
                        p && b.play(f, !0)
                    };
                    if (p && !b._webAudio) {
                        var x = function() {
                            b._playLock ? setTimeout(x, 0) : m()
                        };
                        setTimeout(x, 0)
                    } else m()
                } else return b._webAudio ? (e = b.playing(f) ? c.ctx.currentTime - g._playStart : 0, g._seek + ((g._rateSeek ? g._rateSeek - g._seek : 0) + e * Math.abs(g._rate))) : g._node.currentTime;
            return b
        },
        playing: function(b) {
            if ("number" === typeof b) return (b = this._soundById(b)) ? !b._paused : !1;
            for (b = 0; b < this._sounds.length; b++)
                if (!this._sounds[b]._paused) return !0;
            return !1
        },
        duration: function(b) {
            var c = this._duration;
            (b = this._soundById(b)) && (c = this._sprite[b._sprite][1] / 1E3);
            return c
        },
        state: function() {
            return this._state
        },
        unload: function() {
            for (var b = this._sounds, d = 0; d < b.length; d++) b[d]._paused || this.stop(b[d]._id), this._webAudio || (this._clearSound(b[d]._node), b[d]._node.removeEventListener("error", b[d]._errorFn, !1), b[d]._node.removeEventListener(c._canPlayEvent, b[d]._loadFn, !1), c._releaseHtml5Audio(b[d]._node)), delete b[d]._node, this._clearTimer(b[d]._id);
            d = c._howls.indexOf(this);
            0 <= d && c._howls.splice(d, 1);
            b = !0;
            for (d = 0; d < c._howls.length; d++)
                if (c._howls[d]._src === this._src || 0 <= this._src.indexOf(c._howls[d]._src)) {
                    b = !1;
                    break
                }
            e && b && delete e[this._src];
            c.noAudio = !1;
            this._state = "unloaded";
            this._sounds = [];
            return null
        },
        on: function(b, c, d, e) {
            b = this["_on" + b];
            "function" === typeof c && b.push(e ? {
                id: d,
                fn: c,
                once: e
            } : {
                id: d,
                fn: c
            });
            return this
        },
        off: function(b, c, d) {
            var e = this["_on" + b],
                f = 0;
            "number" === typeof c && (d = c, c = null);
            if (c || d)
                for (f = 0; f < e.length; f++) {
                    if (b = d === e[f].id, c === e[f].fn && b || !c && b) {
                        e.splice(f, 1);
                        break
                    }
                } else if (b) this["_on" + b] = [];
                else {
                    c = Object.keys(this);
                    for (f = 0; f < c.length; f++) 0 === c[f].indexOf("_on") && Array.isArray(this[c[f]]) && (this[c[f]] = [])
                }
            return this
        },
        once: function(b, c, d) {
            this.on(b, c, d, 1);
            return this
        },
        _emit: function(b, c, d) {
            for (var e = this["_on" + b], f = e.length - 1; 0 <= f; f--)
                if (!e[f].id || e[f].id === c || "load" === b) setTimeout(function(b) {
                    b.call(this, c, d)
                }.bind(this, e[f].fn), 0), e[f].once && this.off(b, e[f].fn, e[f].id);
            this._loadQueue(b);
            return this
        },
        _loadQueue: function(b) {
            if (0 < this._queue.length) {
                var c = this._queue[0];
                c.event === b && (this._queue.shift(), this._loadQueue());
                b || c.action()
            }
            return this
        },
        _ended: function(b) {
            var d = b._sprite;
            if (!this._webAudio && b._node && !b._node.paused && !b._node.ended && b._node.currentTime < b._stop) return setTimeout(this._ended.bind(this, b), 100), this;
            d = !(!b._loop && !this._sprite[d][2]);
            this._emit("end", b._id);
            !this._webAudio && d && this.stop(b._id, !0).play(b._id);
            if (this._webAudio && d) {
                this._emit("play", b._id);
                b._seek = b._start || 0;
                b._rateSeek = 0;
                b._playStart = c.ctx.currentTime;
                var e = 1E3 * (b._stop - b._start) / Math.abs(b._rate);
                this._endTimers[b._id] = setTimeout(this._ended.bind(this, b), e)
            }
            this._webAudio && !d && (b._paused = !0, b._ended = !0, b._seek = b._start || 0, b._rateSeek = 0, this._clearTimer(b._id), this._cleanBuffer(b._node), c._autoSuspend());
            !this._webAudio && !d && this.stop(b._id, !0);
            return this
        },
        _clearTimer: function(b) {
            if (this._endTimers[b]) {
                if ("function" !== typeof this._endTimers[b]) clearTimeout(this._endTimers[b]);
                else {
                    var c = this._soundById(b);
                    c && c._node && c._node.removeEventListener("ended", this._endTimers[b], !1)
                }
                delete this._endTimers[b]
            }
            return this
        },
        _soundById: function(b) {
            for (var c = 0; c < this._sounds.length; c++)
                if (b === this._sounds[c]._id) return this._sounds[c];
            return null
        },
        _inactiveSound: function() {
            this._drain();
            for (var b = 0; b < this._sounds.length; b++)
                if (this._sounds[b]._ended) return this._sounds[b].reset();
            return new f(this)
        },
        _drain: function() {
            var b = this._pool,
                c = 0,
                d = 0;
            if (!(this._sounds.length < b)) {
                for (d = 0; d < this._sounds.length; d++) this._sounds[d]._ended && c++;
                for (d = this._sounds.length - 1; 0 <= d && !(c <= b); d--) this._sounds[d]._ended && (this._webAudio && this._sounds[d]._node && this._sounds[d]._node.disconnect(0), this._sounds.splice(d, 1), c--)
            }
        },
        _getSoundIds: function(b) {
            if ("undefined" === typeof b) {
                b = [];
                for (var c = 0; c < this._sounds.length; c++) b.push(this._sounds[c]._id);
                return b
            }
            return [b]
        },
        _refreshBuffer: function(b) {
            b._node.bufferSource = c.ctx.createBufferSource();
            b._node.bufferSource.buffer = e[this._src];
            b._panner ? b._node.bufferSource.connect(b._panner) : b._node.bufferSource.connect(b._node);
            if (b._node.bufferSource.loop = b._loop) b._node.bufferSource.loopStart = b._start || 0, b._node.bufferSource.loopEnd = b._stop || 0;
            b._node.bufferSource.playbackRate.setValueAtTime(b._rate, c.ctx.currentTime);
            return this
        },
        _cleanBuffer: function(b) {
            var d = c._navigator && 0 <= c._navigator.vendor.indexOf("Apple");
            if (c._scratchBuffer && b.bufferSource && (b.bufferSource.onended = null, b.bufferSource.disconnect(0), d)) try {
                b.bufferSource.buffer = c._scratchBuffer
            } catch (e) {}
            b.bufferSource = null;
            return this
        },
        _clearSound: function(b) {
            /MSIE |Trident\//.test(c._navigator && c._navigator.userAgent) || (b.src = "data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")
        }
    };
    var f = function(b) {
        this._parent = b;
        this.init()
    };
    f.prototype = {
        init: function() {
            var b = this._parent;
            this._muted = b._muted;
            this._loop = b._loop;
            this._volume = b._volume;
            this._rate = b._rate;
            this._seek = 0;
            this._ended = this._paused = !0;
            this._sprite = "__default";
            this._id = ++c._counter;
            b._sounds.push(this);
            this.create();
            return this
        },
        create: function() {
            var b = this._parent,
                d = c._muted || this._muted || this._parent._muted ? 0 : this._volume;
            b._webAudio ? (this._node = "undefined" === typeof c.ctx.createGain ? c.ctx.createGainNode() : c.ctx.createGain(), this._node.gain.setValueAtTime(d, c.ctx.currentTime), this._node.paused = !0, this._node.connect(c.masterGain)) : (this._node = c._obtainHtml5Audio(), this._errorFn = this._errorListener.bind(this), this._node.addEventListener("error", this._errorFn, !1), this._loadFn = this._loadListener.bind(this), this._node.addEventListener(c._canPlayEvent, this._loadFn, !1), this._node.src = b._src, this._node.preload = "auto", this._node.volume = d * c.volume(), this._node.load());
            return this
        },
        reset: function() {
            var b = this._parent;
            this._muted = b._muted;
            this._loop = b._loop;
            this._volume = b._volume;
            this._rate = b._rate;
            this._rateSeek = this._seek = 0;
            this._ended = this._paused = !0;
            this._sprite = "__default";
            this._id = ++c._counter;
            return this
        },
        _errorListener: function() {
            this._parent._emit("loaderror", this._id, this._node.error ? this._node.error.code : 0);
            this._node.removeEventListener("error", this._errorFn, !1)
        },
        _loadListener: function() {
            var b = this._parent;
            b._duration = Math.ceil(10 * this._node.duration) / 10;
            0 === Object.keys(b._sprite).length && (b._sprite = {
                __default: [0, 1E3 * b._duration]
            });
            "loaded" !== b._state && (b._state = "loaded", b._emit("load"), b._loadQueue());
            this._node.removeEventListener(c._canPlayEvent, this._loadFn, !1)
        }
    };
    var e = {},
        g = function(b, d) {
            var f = function() {
                    d._emit("loaderror", null, "Decoding audio data failed.")
                },
                g = function(b) {
                    b && 0 < d._sounds.length ? (e[d._src] = b, m(d, b)) : f()
                };
            "undefined" !== typeof Promise && 1 === c.ctx.decodeAudioData.length ? c.ctx.decodeAudioData(b).then(g).catch(f) : c.ctx.decodeAudioData(b, g, f)
        },
        m = function(b, c) {
            c && !b._duration && (b._duration = c.duration);
            0 === Object.keys(b._sprite).length && (b._sprite = {
                __default: [0, 1E3 * b._duration]
            });
            "loaded" !== b._state && (b._state = "loaded", b._emit("load"), b._loadQueue())
        },
        p = function() {
            if (c.usingWebAudio) {
                try {
                    "undefined" !== typeof AudioContext ? c.ctx = new AudioContext : "undefined" !== typeof webkitAudioContext ? c.ctx = new webkitAudioContext : c.usingWebAudio = !1
                } catch (b) {
                    c.usingWebAudio = !1
                }
                c.ctx || (c.usingWebAudio = !1);
                var d = /iP(hone|od|ad)/.test(c._navigator && c._navigator.platform),
                    e = c._navigator && c._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),
                    e = e ? parseInt(e[1], 10) : null;
                if (d && e && 9 > e && (d = /safari/.test(c._navigator && c._navigator.userAgent.toLowerCase()), c._navigator && c._navigator.standalone && !d || c._navigator && !c._navigator.standalone && !d)) c.usingWebAudio = !1;
                c.usingWebAudio && (c.masterGain = "undefined" === typeof c.ctx.createGain ? c.ctx.createGainNode() : c.ctx.createGain(), c.masterGain.gain.setValueAtTime(c._muted ? 0 : 1, c.ctx.currentTime), c.masterGain.connect(c.ctx.destination));
                c._setup()
            }
        };
    "function" === typeof define && define.amd && define([], function() {
        return {
            Howler: c,
            Howl: d
        }
    });
    "undefined" !== typeof exports && (exports.Howler = c, exports.Howl = d);
    "undefined" !== typeof window ? (window.HowlerGlobal = b, window.Howler = c, window.Howl = d, window.Sound = f) : "undefined" !== typeof global && (global.HowlerGlobal = b, global.Howler = c, global.Howl = d, global.Sound = f)
})();
(function() {
    HowlerGlobal.prototype._pos = [0, 0, 0];
    HowlerGlobal.prototype._orientation = [0, 0, -1, 0, 1, 0];
    HowlerGlobal.prototype.stereo = function(b) {
        if (!this.ctx || !this.ctx.listener) return this;
        for (var c = this._howls.length - 1; 0 <= c; c--) this._howls[c].stereo(b);
        return this
    };
    HowlerGlobal.prototype.pos = function(b, c, d) {
        if (!this.ctx || !this.ctx.listener) return this;
        c = "number" !== typeof c ? this._pos[1] : c;
        d = "number" !== typeof d ? this._pos[2] : d;
        if ("number" === typeof b) this._pos = [b, c, d], "undefined" !== typeof this.ctx.listener.positionX ? (this.ctx.listener.positionX.setTargetAtTime(this._pos[0], Howler.ctx.currentTime, 0.1), this.ctx.listener.positionY.setTargetAtTime(this._pos[1], Howler.ctx.currentTime, 0.1), this.ctx.listener.positionZ.setTargetAtTime(this._pos[2], Howler.ctx.currentTime, 0.1)) : this.ctx.listener.setPosition(this._pos[0], this._pos[1], this._pos[2]);
        else return this._pos;
        return this
    };
    HowlerGlobal.prototype.orientation = function(b, c, d, f, j, n) {
        if (!this.ctx || !this.ctx.listener) return this;
        var r = this._orientation;
        c = "number" !== typeof c ? r[1] : c;
        d = "number" !== typeof d ? r[2] : d;
        f = "number" !== typeof f ? r[3] : f;
        j = "number" !== typeof j ? r[4] : j;
        n = "number" !== typeof n ? r[5] : n;
        if ("number" === typeof b) this._orientation = [b, c, d, f, j, n], "undefined" !== typeof this.ctx.listener.forwardX ? (this.ctx.listener.forwardX.setTargetAtTime(b, Howler.ctx.currentTime, 0.1), this.ctx.listener.forwardY.setTargetAtTime(c, Howler.ctx.currentTime, 0.1), this.ctx.listener.forwardZ.setTargetAtTime(d, Howler.ctx.currentTime, 0.1), this.ctx.listener.upX.setTargetAtTime(b, Howler.ctx.currentTime, 0.1), this.ctx.listener.upY.setTargetAtTime(c, Howler.ctx.currentTime, 0.1), this.ctx.listener.upZ.setTargetAtTime(d, Howler.ctx.currentTime, 0.1)) : this.ctx.listener.setOrientation(b, c, d, f, j, n);
        else return r;
        return this
    };
    var b = Howl.prototype.init;
    Howl.prototype.init = function(c) {
        this._orientation = c.orientation || [1, 0, 0];
        this._stereo = c.stereo || null;
        this._pos = c.pos || null;
        this._pannerAttr = {
            coneInnerAngle: "undefined" !== typeof c.coneInnerAngle ? c.coneInnerAngle : 360,
            coneOuterAngle: "undefined" !== typeof c.coneOuterAngle ? c.coneOuterAngle : 360,
            coneOuterGain: "undefined" !== typeof c.coneOuterGain ? c.coneOuterGain : 0,
            distanceModel: "undefined" !== typeof c.distanceModel ? c.distanceModel : "inverse",
            maxDistance: "undefined" !== typeof c.maxDistance ? c.maxDistance : 1E4,
            panningModel: "undefined" !== typeof c.panningModel ? c.panningModel : "HRTF",
            refDistance: "undefined" !== typeof c.refDistance ? c.refDistance : 1,
            rolloffFactor: "undefined" !== typeof c.rolloffFactor ? c.rolloffFactor : 1
        };
        this._onstereo = c.onstereo ? [{
            fn: c.onstereo
        }] : [];
        this._onpos = c.onpos ? [{
            fn: c.onpos
        }] : [];
        this._onorientation = c.onorientation ? [{
            fn: c.onorientation
        }] : [];
        return b.call(this, c)
    };
    Howl.prototype.stereo = function(b, c) {
        var d = this;
        if (!d._webAudio) return d;
        if ("loaded" !== d._state) return d._queue.push({
            event: "stereo",
            action: function() {
                d.stereo(b, c)
            }
        }), d;
        var p = "undefined" === typeof Howler.ctx.createStereoPanner ? "spatial" : "stereo";
        if ("undefined" === typeof c)
            if ("number" === typeof b) d._stereo = b, d._pos = [b, 0, 0];
            else return d._stereo;
        for (var j = d._getSoundIds(c), n = 0; n < j.length; n++) {
            var r = d._soundById(j[n]);
            if (r)
                if ("number" === typeof b) r._stereo = b, r._pos = [b, 0, 0], r._node && (r._pannerAttr.panningModel = "equalpower", (!r._panner || !r._panner.pan) && f(r, p), "spatial" === p ? "undefined" !== typeof r._panner.positionX ? (r._panner.positionX.setValueAtTime(b, Howler.ctx.currentTime), r._panner.positionY.setValueAtTime(0, Howler.ctx.currentTime), r._panner.positionZ.setValueAtTime(0, Howler.ctx.currentTime)) : r._panner.setPosition(b, 0, 0) : r._panner.pan.setValueAtTime(b, Howler.ctx.currentTime)), d._emit("stereo", r._id);
                else return r._stereo
        }
        return d
    };
    Howl.prototype.pos = function(b, c, d, p) {
        var j = this;
        if (!j._webAudio) return j;
        if ("loaded" !== j._state) return j._queue.push({
            event: "pos",
            action: function() {
                j.pos(b, c, d, p)
            }
        }), j;
        c = "number" !== typeof c ? 0 : c;
        d = "number" !== typeof d ? -0.5 : d;
        if ("undefined" === typeof p)
            if ("number" === typeof b) j._pos = [b, c, d];
            else return j._pos;
        for (var n = j._getSoundIds(p), r = 0; r < n.length; r++) {
            var q = j._soundById(n[r]);
            if (q)
                if ("number" === typeof b) q._pos = [b, c, d], q._node && ((!q._panner || q._panner.pan) && f(q, "spatial"), "undefined" !== typeof q._panner.positionX ? (q._panner.positionX.setValueAtTime(b, Howler.ctx.currentTime), q._panner.positionY.setValueAtTime(c, Howler.ctx.currentTime), q._panner.positionZ.setValueAtTime(d, Howler.ctx.currentTime)) : q._panner.setPosition(b, c, d)), j._emit("pos", q._id);
                else return q._pos
        }
        return j
    };
    Howl.prototype.orientation = function(b, c, d, p) {
        var j = this;
        if (!j._webAudio) return j;
        if ("loaded" !== j._state) return j._queue.push({
            event: "orientation",
            action: function() {
                j.orientation(b, c, d, p)
            }
        }), j;
        c = "number" !== typeof c ? j._orientation[1] : c;
        d = "number" !== typeof d ? j._orientation[2] : d;
        if ("undefined" === typeof p)
            if ("number" === typeof b) j._orientation = [b, c, d];
            else return j._orientation;
        for (var n = j._getSoundIds(p), r = 0; r < n.length; r++) {
            var q = j._soundById(n[r]);
            if (q)
                if ("number" === typeof b) q._orientation = [b, c, d], q._node && (q._panner || (q._pos || (q._pos = j._pos || [0, 0, -0.5]), f(q, "spatial")), "undefined" !== typeof q._panner.orientationX ? (q._panner.orientationX.setValueAtTime(b, Howler.ctx.currentTime), q._panner.orientationY.setValueAtTime(c, Howler.ctx.currentTime), q._panner.orientationZ.setValueAtTime(d, Howler.ctx.currentTime)) : q._panner.setOrientation(b, c, d)), j._emit("orientation", q._id);
                else return q._orientation
        }
        return j
    };
    Howl.prototype.pannerAttr = function() {
        var b = arguments,
            c, d;
        if (!this._webAudio) return this;
        if (0 === b.length) return this._pannerAttr;
        if (1 === b.length)
            if ("object" === typeof b[0]) c = b[0], "undefined" === typeof d && (c.pannerAttr || (c.pannerAttr = {
                coneInnerAngle: c.coneInnerAngle,
                coneOuterAngle: c.coneOuterAngle,
                coneOuterGain: c.coneOuterGain,
                distanceModel: c.distanceModel,
                maxDistance: c.maxDistance,
                refDistance: c.refDistance,
                rolloffFactor: c.rolloffFactor,
                panningModel: c.panningModel
            }), this._pannerAttr = {
                coneInnerAngle: "undefined" !== typeof c.pannerAttr.coneInnerAngle ? c.pannerAttr.coneInnerAngle : this._coneInnerAngle,
                coneOuterAngle: "undefined" !== typeof c.pannerAttr.coneOuterAngle ? c.pannerAttr.coneOuterAngle : this._coneOuterAngle,
                coneOuterGain: "undefined" !== typeof c.pannerAttr.coneOuterGain ? c.pannerAttr.coneOuterGain : this._coneOuterGain,
                distanceModel: "undefined" !== typeof c.pannerAttr.distanceModel ? c.pannerAttr.distanceModel : this._distanceModel,
                maxDistance: "undefined" !== typeof c.pannerAttr.maxDistance ? c.pannerAttr.maxDistance : this._maxDistance,
                refDistance: "undefined" !== typeof c.pannerAttr.refDistance ? c.pannerAttr.refDistance : this._refDistance,
                rolloffFactor: "undefined" !== typeof c.pannerAttr.rolloffFactor ? c.pannerAttr.rolloffFactor : this._rolloffFactor,
                panningModel: "undefined" !== typeof c.pannerAttr.panningModel ? c.pannerAttr.panningModel : this._panningModel
            });
            else return (b = this._soundById(parseInt(b[0], 10))) ? b._pannerAttr : this._pannerAttr;
        else 2 === b.length && (c = b[0], d = parseInt(b[1], 10));
        d = this._getSoundIds(d);
        for (var p = 0; p < d.length; p++)
            if (b = this._soundById(d[p])) {
                var j = b._pannerAttr,
                    j = {
                        coneInnerAngle: "undefined" !== typeof c.coneInnerAngle ? c.coneInnerAngle : j.coneInnerAngle,
                        coneOuterAngle: "undefined" !== typeof c.coneOuterAngle ? c.coneOuterAngle : j.coneOuterAngle,
                        coneOuterGain: "undefined" !== typeof c.coneOuterGain ? c.coneOuterGain : j.coneOuterGain,
                        distanceModel: "undefined" !== typeof c.distanceModel ? c.distanceModel : j.distanceModel,
                        maxDistance: "undefined" !== typeof c.maxDistance ? c.maxDistance : j.maxDistance,
                        refDistance: "undefined" !== typeof c.refDistance ? c.refDistance : j.refDistance,
                        rolloffFactor: "undefined" !== typeof c.rolloffFactor ? c.rolloffFactor : j.rolloffFactor,
                        panningModel: "undefined" !== typeof c.panningModel ? c.panningModel : j.panningModel
                    },
                    n = b._panner;
                n ? (n.coneInnerAngle = j.coneInnerAngle, n.coneOuterAngle = j.coneOuterAngle, n.coneOuterGain = j.coneOuterGain, n.distanceModel = j.distanceModel, n.maxDistance = j.maxDistance, n.refDistance = j.refDistance, n.rolloffFactor = j.rolloffFactor, n.panningModel = j.panningModel) : (b._pos || (b._pos = this._pos || [0, 0, -0.5]), f(b, "spatial"))
            }
        return this
    };
    var c = Sound.prototype.init;
    Sound.prototype.init = function() {
        var b = this._parent;
        this._orientation = b._orientation;
        this._stereo = b._stereo;
        this._pos = b._pos;
        this._pannerAttr = b._pannerAttr;
        c.call(this);
        this._stereo ? b.stereo(this._stereo) : this._pos && b.pos(this._pos[0], this._pos[1], this._pos[2], this._id)
    };
    var d = Sound.prototype.reset;
    Sound.prototype.reset = function() {
        var b = this._parent;
        this._orientation = b._orientation;
        this._stereo = b._stereo;
        this._pos = b._pos;
        this._pannerAttr = b._pannerAttr;
        this._stereo ? b.stereo(this._stereo) : this._pos ? b.pos(this._pos[0], this._pos[1], this._pos[2], this._id) : this._panner && (this._panner.disconnect(0), this._panner = void 0, b._refreshBuffer(this));
        return d.call(this)
    };
    var f = function(b, c) {
        "spatial" === (c || "spatial") ? (b._panner = Howler.ctx.createPanner(), b._panner.coneInnerAngle = b._pannerAttr.coneInnerAngle, b._panner.coneOuterAngle = b._pannerAttr.coneOuterAngle, b._panner.coneOuterGain = b._pannerAttr.coneOuterGain, b._panner.distanceModel = b._pannerAttr.distanceModel, b._panner.maxDistance = b._pannerAttr.maxDistance, b._panner.refDistance = b._pannerAttr.refDistance, b._panner.rolloffFactor = b._pannerAttr.rolloffFactor, b._panner.panningModel = b._pannerAttr.panningModel, "undefined" !== typeof b._panner.positionX ? (b._panner.positionX.setValueAtTime(b._pos[0], Howler.ctx.currentTime), b._panner.positionY.setValueAtTime(b._pos[1], Howler.ctx.currentTime), b._panner.positionZ.setValueAtTime(b._pos[2], Howler.ctx.currentTime)) : b._panner.setPosition(b._pos[0], b._pos[1], b._pos[2]), "undefined" !== typeof b._panner.orientationX ? (b._panner.orientationX.setValueAtTime(b._orientation[0], Howler.ctx.currentTime), b._panner.orientationY.setValueAtTime(b._orientation[1], Howler.ctx.currentTime), b._panner.orientationZ.setValueAtTime(b._orientation[2], Howler.ctx.currentTime)) : b._panner.setOrientation(b._orientation[0], b._orientation[1], b._orientation[2])) : (b._panner = Howler.ctx.createStereoPanner(), b._panner.pan.setValueAtTime(b._stereo, Howler.ctx.currentTime));
        b._panner.connect(b._node);
        b._paused || b._parent.pause(b._id, !0).play(b._id, !0)
    }
})();
! function(b, c) {
    "object" == typeof exports && "undefined" != typeof module ? c() : "function" == typeof define && define.amd ? define(c) : c()
}(0, function() {
    function b(b) {
        var c = this.constructor;
        return this.then(function(d) {
            return c.resolve(b()).then(function() {
                return d
            })
        }, function(d) {
            return c.resolve(b()).then(function() {
                return c.reject(d)
            })
        })
    }

    function c() {}

    function d(b) {
        if (!(this instanceof d)) throw new TypeError("Promises must be constructed via new");
        if ("function" != typeof b) throw new TypeError("not a function");
        this._state = 0;
        this._handled = !1;
        this._value = void 0;
        this._deferreds = [];
        p(b, this)
    }

    function f(b, c) {
        for (; 3 === b._state;) b = b._value;
        0 !== b._state ? (b._handled = !0, d._immediateFn(function() {
            var d = 1 === b._state ? c.onFulfilled : c.onRejected;
            if (null !== d) {
                var f;
                try {
                    f = d(b._value)
                } catch (j) {
                    return void g(c.promise, j)
                }
                e(c.promise, f)
            } else(1 === b._state ? e : g)(c.promise, b._value)
        })) : b._deferreds.push(c)
    }

    function e(b, c) {
        try {
            if (c === b) throw new TypeError("A promise cannot be resolved with itself.");
            if (c && ("object" == typeof c || "function" == typeof c)) {
                var e = c.then;
                if (c instanceof d) return b._state = 3, b._value = c, void m(b);
                if ("function" == typeof e) return void p(function() {
                    e.apply(c, arguments)
                }, b)
            }
            b._state = 1;
            b._value = c;
            m(b)
        } catch (f) {
            g(b, f)
        }
    }

    function g(b, c) {
        b._state = 2;
        b._value = c;
        m(b)
    }

    function m(b) {
        2 === b._state && 0 === b._deferreds.length && d._immediateFn(function() {
            b._handled || d._unhandledRejectionFn(b._value)
        });
        for (var c = 0, e = b._deferreds.length; e > c; c++) f(b, b._deferreds[c]);
        b._deferreds = null
    }

    function p(b, c) {
        var d = !1;
        try {
            b(function(b) {
                d || (d = !0, e(c, b))
            }, function(b) {
                d || (d = !0, g(c, b))
            })
        } catch (f) {
            d || (d = !0, g(c, f))
        }
    }
    var j = setTimeout;
    d.prototype["catch"] = function(b) {
        return this.then(null, b)
    };
    d.prototype.then = function(b, d) {
        var e = new this.constructor(c);
        return f(this, new function(b, c, d) {
            this.onFulfilled = "function" == typeof b ? b : null;
            this.onRejected = "function" == typeof c ? c : null;
            this.promise = d
        }(b, d, e)), e
    };
    d.prototype["finally"] = b;
    d.all = function(b) {
        return new d(function(c, d) {
            function e(b, j) {
                try {
                    if (j && ("object" == typeof j || "function" == typeof j)) {
                        var p = j.then;
                        if ("function" == typeof p) return void p.call(j, function(c) {
                            e(b, c)
                        }, d)
                    }
                    f[b] = j;
                    0 == --g && c(f)
                } catch (n) {
                    d(n)
                }
            }
            if (!b || "undefined" == typeof b.length) throw new TypeError("Promise.all accepts an array");
            var f = Array.prototype.slice.call(b);
            if (0 === f.length) return c([]);
            for (var g = f.length, j = 0; f.length > j; j++) e(j, f[j])
        })
    };
    d.resolve = function(b) {
        return b && "object" == typeof b && b.constructor === d ? b : new d(function(c) {
            c(b)
        })
    };
    d.reject = function(b) {
        return new d(function(c, d) {
            d(b)
        })
    };
    d.race = function(b) {
        return new d(function(c, d) {
            for (var e = 0, f = b.length; f > e; e++) b[e].then(c, d)
        })
    };
    d._immediateFn = "function" == typeof setImmediate && function(b) {
        setImmediate(b)
    } || function(b) {
        j(b, 0)
    };
    d._unhandledRejectionFn = function(b) {
        void 0 !== console && console && console.warn("Possible Unhandled Promise Rejection:", b)
    };
    var n = function() {
        if ("undefined" != typeof self) return self;
        if ("undefined" != typeof window) return window;
        if ("undefined" != typeof global) return global;
        throw Error("unable to locate global object");
    }();
    "Promise" in n ? n.Promise.prototype["finally"] || (n.Promise.prototype["finally"] = b) : n.Promise = d
});
(function() {
    function b(b, c) {
        document.addEventListener ? b.addEventListener("scroll", c, !1) : b.attachEvent("scroll", c)
    }

    function c(b) {
        this.a = document.createElement("div");
        this.a.setAttribute("aria-hidden", "true");
        this.a.appendChild(document.createTextNode(b));
        this.b = document.createElement("span");
        this.c = document.createElement("span");
        this.h = document.createElement("span");
        this.f = document.createElement("span");
        this.g = -1;
        this.b.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.c.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.f.style.cssText = "max-width:none;display:inline-block;position:absolute;height:100%;width:100%;overflow:scroll;font-size:16px;";
        this.h.style.cssText = "display:inline-block;width:200%;height:200%;font-size:16px;max-width:none;";
        this.b.appendChild(this.h);
        this.c.appendChild(this.f);
        this.a.appendChild(this.b);
        this.a.appendChild(this.c)
    }

    function d(b, c) {
        b.a.style.cssText = "max-width:none;min-width:20px;min-height:20px;display:inline-block;overflow:hidden;position:absolute;width:auto;margin:0;padding:0;top:-999px;white-space:nowrap;font-synthesis:none;font:" + c + ";"
    }

    function f(b) {
        var c = b.a.offsetWidth,
            d = c + 100;
        b.f.style.width = d + "px";
        b.c.scrollLeft = d;
        b.b.scrollLeft = b.b.scrollWidth + 100;
        return b.g !== c ? (b.g = c, !0) : !1
    }

    function e(c, d) {
        function e() {
            var b = g;
            f(b) && b.a.parentNode && d(b.g)
        }
        var g = c;
        b(c.b, e);
        b(c.c, e);
        f(c)
    }

    function g(b, c) {
        var d = c || {};
        this.family = b;
        this.style = d.style || "normal";
        this.weight = d.weight || "normal";
        this.stretch = d.stretch || "normal"
    }

    function m() {
        null === s && (s = !!document.fonts);
        return s
    }

    function p() {
        if (null === q) {
            var b = document.createElement("div");
            try {
                b.style.font = "condensed 100px sans-serif"
            } catch (c) {}
            q = "" !== b.style.font
        }
        return q
    }

    function j(b, c) {
        return [b.style, b.weight, p() ? b.stretch : "", "100px", c].join(" ")
    }
    var n = null,
        r = null,
        q = null,
        s = null;
    g.prototype.load = function(b, f) {
        var g = this,
            p = b || "BESbswy",
            q = 0,
            s = f || 3E3,
            H = (new Date).getTime();
        return new Promise(function(b, f) {
            var t;
            if (t = m()) null === r && (m() && /Apple/.test(window.navigator.vendor) ? (t = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))(?:\.([0-9]+))/.exec(window.navigator.userAgent), r = !!t && 603 > parseInt(t[1], 10)) : r = !1), t = !r;
            if (t) {
                t = new Promise(function(b, c) {
                    function d() {
                        (new Date).getTime() - H >= s ? c(Error("" + s + "ms timeout exceeded")) : document.fonts.load(j(g, '"' + g.family + '"'), p).then(function(c) {
                            1 <= c.length ? b() : setTimeout(d, 25)
                        }, c)
                    }
                    d()
                });
                var u = new Promise(function(b, c) {
                    q = setTimeout(function() {
                        c(Error("" + s + "ms timeout exceeded"))
                    }, s)
                });
                Promise.race([u, t]).then(function() {
                    clearTimeout(q);
                    b(g)
                }, f)
            } else {
                var U = function() {
                    function m() {
                        var c;
                        if (c = -1 != W && -1 != X || -1 != W && -1 != Y || -1 != X && -1 != Y)(c = W != X && W != Y && X != Y) || (null === n && (c = /AppleWebKit\/([0-9]+)(?:\.([0-9]+))/.exec(window.navigator.userAgent), n = !!c && (536 > parseInt(c[1], 10) || 536 === parseInt(c[1], 10) && 11 >= parseInt(c[2], 10))), c = n && (W == U && X == U && Y == U || W == P && X == P && Y == P || W == ma && X == ma && Y == ma)), c = !c;
                        c && (T.parentNode && T.parentNode.removeChild(T), clearTimeout(q), b(g))
                    }

                    function r() {
                        if ((new Date).getTime() - H >= s) T.parentNode && T.parentNode.removeChild(T), f(Error("" + s + "ms timeout exceeded"));
                        else {
                            var b = document.hidden;
                            if (!0 === b || void 0 === b) W = t.a.offsetWidth, X = u.a.offsetWidth, Y = F.a.offsetWidth, m();
                            q = setTimeout(r, 50)
                        }
                    }
                    var t = new c(p),
                        u = new c(p),
                        F = new c(p),
                        W = -1,
                        X = -1,
                        Y = -1,
                        U = -1,
                        P = -1,
                        ma = -1,
                        T = document.createElement("div");
                    T.dir = "ltr";
                    d(t, j(g, "sans-serif"));
                    d(u, j(g, "serif"));
                    d(F, j(g, "monospace"));
                    T.appendChild(t.a);
                    T.appendChild(u.a);
                    T.appendChild(F.a);
                    document.body.appendChild(T);
                    U = t.a.offsetWidth;
                    P = u.a.offsetWidth;
                    ma = F.a.offsetWidth;
                    r();
                    e(t, function(b) {
                        W = b;
                        m()
                    });
                    d(t, j(g, '"' + g.family + '",sans-serif'));
                    e(u, function(b) {
                        X = b;
                        m()
                    });
                    d(u, j(g, '"' + g.family + '",serif'));
                    e(F, function(b) {
                        Y = b;
                        m()
                    });
                    d(F, j(g, '"' + g.family + '",monospace'))
                };
                document.body ? U() : document.addEventListener ? document.addEventListener("DOMContentLoaded", function la() {
                    document.removeEventListener("DOMContentLoaded", la);
                    U()
                }) : document.attachEvent("onreadystatechange", function Va() {
                    if ("interactive" == document.readyState || "complete" == document.readyState) document.detachEvent("onreadystatechange", Va), U()
                })
            }
        })
    };
    "object" === typeof module ? module.exports = g : (window.FontFaceObserver = g, window.FontFaceObserver.prototype.load = g.prototype.load)
})();
(function(b) {
    Number.prototype.map = function(b, c, d, e) {
        return d + (e - d) * ((this - b) / (c - b))
    };
    Number.prototype.limit = function(b, c) {
        return Math.min(c, Math.max(b, this))
    };
    Number.prototype.round = function(b) {
        b = Math.pow(10, b || 0);
        return Math.round(this * b) / b
    };
    Number.prototype.floor = function() {
        return Math.floor(this)
    };
    Number.prototype.ceil = function() {
        return Math.ceil(this)
    };
    Number.prototype.toInt = function() {
        return this | 0
    };
    Number.prototype.toRad = function() {
        return this / 180 * Math.PI
    };
    Number.prototype.toDeg = function() {
        return 180 * this / Math.PI
    };
    Array.prototype.erase = function(b) {
        for (var c = this.length; c--;) this[c] === b && this.splice(c, 1);
        return this
    };
    Array.prototype.random = function() {
        return this[Math.floor(Math.random() * this.length)]
    };
    Function.prototype.bind = Function.prototype.bind || function(b) {
        if ("function" !== typeof this) throw new TypeError("Function.prototype.bind - what is trying to be bound is not callable");
        var c = Array.prototype.slice.call(arguments, 1),
            d = this,
            e = function() {},
            f = function() {
                return d.apply(this instanceof e && b ? this : b, c.concat(Array.prototype.slice.call(arguments)))
            };
        e.prototype = this.prototype;
        f.prototype = new e;
        return f
    };
    b.ig = {
        game: null,
        debug: null,
        version: "1.23",
        global: b,
        modules: {},
        resources: [],
        ready: !1,
        baked: !1,
        nocache: "",
        ua: {},
        prefix: b.ImpactPrefix || "",
        lib: "lib/",
        _current: null,
        _loadQueue: [],
        _waitForOnload: 0,
        $: function(b) {
            return "#" == b.charAt(0) ? document.getElementById(b.substr(1)) : document.getElementsByTagName(b)
        },
        $new: function(b) {
            return document.createElement(b)
        },
        copy: function(b) {
            if (!b || "object" != typeof b || b instanceof HTMLElement || b instanceof ig.Class) return b;
            if (b instanceof Array)
                for (var c = [], d = 0, e = b.length; d < e; d++) c[d] = ig.copy(b[d]);
            else
                for (d in c = {}, b) c[d] = ig.copy(b[d]);
            return c
        },
        merge: function(b, c) {
            for (var d in c) {
                var e = c[d];
                if ("object" != typeof e || e instanceof HTMLElement || e instanceof ig.Class || null === e) b[d] = e;
                else {
                    if (!b[d] || "object" != typeof b[d]) b[d] = e instanceof Array ? [] : {};
                    ig.merge(b[d], e)
                }
            }
            return b
        },
        ksort: function(b) {
            if (!b || "object" != typeof b) return [];
            var c = [],
                d = [],
                e;
            for (e in b) c.push(e);
            c.sort();
            for (e = 0; e < c.length; e++) d.push(b[c[e]]);
            return d
        },
        setVendorAttribute: function(b, c, d) {
            var e = c.charAt(0).toUpperCase() + c.substr(1);
            b[c] = "undefined" !== typeof b.imageSmoothingEnabled ? b["ms" + e] = b["moz" + e] = b["o" + e] = d : b["ms" + e] = b["moz" + e] = b["webkit" + e] = b["o" + e] = d
        },
        getVendorAttribute: function(b, c) {
            var d = c.charAt(0).toUpperCase() + c.substr(1);
            return "undefined" !== typeof b.imageSmoothingEnabled ? b[c] || b["ms" + d] || b["moz" + d] || b["o" + d] : b[c] || b["ms" + d] || b["moz" + d] || b["webkit" + d] || b["o" + d]
        },
        normalizeVendorAttribute: function(b, c) {
            var d = ig.getVendorAttribute(b, c);
            !b[c] && d && (b[c] = d)
        },
        getImagePixels: function(b, c, d, e, f) {
            var g = ig.$new("canvas");
            g.width = b.width;
            g.height = b.height;
            var m = g.getContext("2d");
            ig.System.SCALE.CRISP(g, m);
            var u = ig.getVendorAttribute(m, "backingStorePixelRatio") || 1;
            ig.normalizeVendorAttribute(m, "getImageDataHD");
            var x = b.width / u,
                z = b.height / u;
            g.width = Math.ceil(x);
            g.height = Math.ceil(z);
            m.drawImage(b, 0, 0, x, z);
            return 1 === u ? m.getImageData(c, d, e, f) : m.getImageDataHD(c, d, e, f)
        },
        module: function(b) {
            if (ig._current) throw "Module '" + ig._current.name + "' defines nothing";
            if (ig.modules[b] && ig.modules[b].body) throw "Module '" + b + "' is already defined";
            ig._current = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig.modules[b] = ig._current;
            ig._loadQueue.push(ig._current);
            return ig
        },
        requires: function() {
            ig._current.requires = Array.prototype.slice.call(arguments);
            return ig
        },
        defines: function(b) {
            ig._current.body = b;
            ig._current = null;
            ig._initDOMReady()
        },
        addResource: function(b) {
            ig.resources.push(b)
        },
        setNocache: function(b) {
            ig.nocache = b ? "?" + Date.now() : ""
        },
        log: function() {},
        assert: function() {},
        show: function() {},
        mark: function() {},
        _loadScript: function(b, c) {
            ig.modules[b] = {
                name: b,
                requires: [],
                loaded: !1,
                body: null
            };
            ig._waitForOnload++;
            var d = ig.prefix + ig.lib + b.replace(/\./g, "/") + ".js" + ig.nocache,
                e = ig.$new("script");
            e.type = "text/javascript";
            e.src = d;
            e.onload = function() {
                ig._waitForOnload--;
                ig._execModules()
            };
            e.onerror = function() {
                throw "Failed to load module " + b + " at " + d + " required from " + c;
            };
            ig.$("head")[0].appendChild(e)
        },
        _execModules: function() {
            for (var b = !1, c = 0; c < ig._loadQueue.length; c++) {
                for (var d = ig._loadQueue[c], e = !0, f = 0; f < d.requires.length; f++) {
                    var g = d.requires[f];
                    ig.modules[g] ? ig.modules[g].loaded || (e = !1) : (e = !1, ig._loadScript(g, d.name))
                }
                e && d.body && (ig._loadQueue.splice(c, 1), d.loaded = !0, d.body(), b = !0, c--)
            }
            if (b) ig._execModules();
            else if (!ig.baked && 0 == ig._waitForOnload && 0 != ig._loadQueue.length) {
                b = [];
                for (c = 0; c < ig._loadQueue.length; c++) {
                    e = [];
                    g = ig._loadQueue[c].requires;
                    for (f = 0; f < g.length; f++) d = ig.modules[g[f]], (!d || !d.loaded) && e.push(g[f]);
                    b.push(ig._loadQueue[c].name + " (requires: " + e.join(", ") + ")")
                }
                throw "Unresolved (or circular?) dependencies. Most likely there's a name/path mismatch for one of the listed modules or a previous syntax error prevents a module from loading:\n" + b.join("\n");
            }
        },
        _DOMReady: function() {
            if (!ig.modules["dom.ready"].loaded) {
                if (!document.body) return setTimeout(ig._DOMReady, 13);
                ig.modules["dom.ready"].loaded = !0;
                ig._waitForOnload--;
                ig._execModules()
            }
            return 0
        },
        _boot: function() {
            document.location.href.match(/\?nocache/) && ig.setNocache(!0);
            ig.ua.pixelRatio = b.devicePixelRatio || 1;
            ig.ua.viewport = {
                width: b.innerWidth,
                height: b.innerHeight
            };
            ig.ua.screen = {
                width: b.screen.availWidth * ig.ua.pixelRatio,
                height: b.screen.availHeight * ig.ua.pixelRatio
            };
            ig.ua.iPhone = /iPhone/i.test(navigator.userAgent);
            ig.ua.iPhone4 = ig.ua.iPhone && 2 == ig.ua.pixelRatio;
            ig.ua.iPad = /iPad/i.test(navigator.userAgent);
            ig.ua.android = /android/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.is_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
            ig.ua.is_safari_or_uiwebview = /(iPhone|iPod|iPad).*AppleWebKit/i.test(navigator.userAgent);
            ig.ua.iOS = ig.ua.iPhone || ig.ua.iPad;
            ig.ua.iOS6_tag = /OS 6_/i.test(navigator.userAgent);
            ig.ua.iOS6 = (ig.ua.iPhone || ig.ua.iPad) && ig.ua.iOS6_tag;
            ig.ua.iOSgt5 = ig.ua.iOS && 5 < parseInt(navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1]);
            ig.ua.HTCONE = /HTC_One/i.test(navigator.userAgent);
            ig.ua.winPhone = /Windows Phone/i.test(navigator.userAgent);
            ig.ua.Kindle = /Silk/i.test(navigator.userAgent);
            ig.ua.touchDevice = "ontouchstart" in b || b.navigator.msMaxTouchPoints;
            ig.ua.mobile = ig.ua.iOS || ig.ua.android || ig.ua.iOS6 || ig.ua.winPhone || ig.ua.Kindle || /mobile/i.test(navigator.userAgent)
        },
        _initDOMReady: function() {
            ig.modules["dom.ready"] ? ig._execModules() : (ig._boot(), ig.modules["dom.ready"] = {
                requires: [],
                loaded: !1,
                body: null
            }, ig._waitForOnload++, "complete" === document.readyState ? ig._DOMReady() : (document.addEventListener("DOMContentLoaded", ig._DOMReady, !1), b.addEventListener("load", ig._DOMReady, !1)))
        }
    };
    ig.normalizeVendorAttribute(b, "requestAnimationFrame");
    if (b.requestAnimationFrame) {
        var c = 1,
            d = {};
        b.ig.setAnimation = function(e, f) {
            var g = c++;
            d[g] = !0;
            var m = function() {
                d[g] && (b.requestAnimationFrame(m, f), e())
            };
            b.requestAnimationFrame(m, f);
            return g
        };
        b.ig.clearAnimation = function(b) {
            delete d[b]
        }
    } else b.ig.setAnimation = function(c) {
        return b.setInterval(c, 1E3 / 60)
    }, b.ig.clearAnimation = function(c) {
        b.clearInterval(c)
    };
    var f = !1,
        e = /xyz/.test(function() {
            xyz
        }) ? /\bparent\b/ : /.*/,
        g = 0;
    b.ig.Class = function() {};
    var m = function(b) {
        var c = this.prototype,
            d = {},
            f;
        for (f in b) "function" == typeof b[f] && "function" == typeof c[f] && e.test(b[f]) ? (d[f] = c[f], c[f] = function(b, c) {
            return function() {
                var e = this.parent;
                this.parent = d[b];
                var f = c.apply(this, arguments);
                this.parent = e;
                return f
            }
        }(f, b[f])) : c[f] = b[f]
    };
    b.ig.Class.extend = function(c) {
        function d() {
            if (!f) {
                if (this.staticInstantiate) {
                    var b = this.staticInstantiate.apply(this, arguments);
                    if (b) return b
                }
                for (var c in this) "object" == typeof this[c] && (this[c] = ig.copy(this[c]));
                this.init && this.init.apply(this, arguments)
            }
            return this
        }
        var n = this.prototype;
        f = !0;
        var r = new this;
        f = !1;
        for (var q in c) r[q] = "function" == typeof c[q] && "function" == typeof n[q] && e.test(c[q]) ? function(b, c) {
            return function() {
                var d = this.parent;
                this.parent = n[b];
                var e = c.apply(this, arguments);
                this.parent = d;
                return e
            }
        }(q, c[q]) : c[q];
        d.prototype = r;
        d.prototype.constructor = d;
        d.extend = b.ig.Class.extend;
        d.inject = m;
        d.classId = r.classId = ++g;
        return d
    };
    b.ImpactMixin && ig.merge(ig, b.ImpactMixin)
})(window);
ig.baked = !0;
ig.module("impact.image").defines(function() {
    ig.Image = ig.Class.extend({
        data: null,
        width: 0,
        height: 0,
        loaded: !1,
        failed: !1,
        loadCallback: null,
        path: "",
        staticInstantiate: function(b) {
            return ig.Image.cache[b] || null
        },
        init: function(b) {
            this.path = b;
            this.load()
        },
        load: function(b) {
            this.loaded ? b && b(this.path, !0) : (!this.loaded && ig.ready ? (this.loadCallback = b || null, this.data = new Image, this.data.onload = this.onload.bind(this), this.data.onerror = this.onerror.bind(this), this.data.src = ig.prefix + this.path + ig.nocache) : ig.addResource(this), ig.Image.cache[this.path] = this)
        },
        reload: function() {
            this.loaded = !1;
            this.data = new Image;
            this.data.onload = this.onload.bind(this);
            this.data.src = this.path + "?" + Date.now()
        },
        onload: function() {
            this.width = this.data.width;
            this.height = this.data.height;
            this.loaded = !0;
            1 != ig.system.scale && this.resize(ig.system.scale);
            this.loadCallback && this.loadCallback(this.path, !0)
        },
        onerror: function() {
            this.failed = !0;
            this.loadCallback && this.loadCallback(this.path, !1)
        },
        resize: function(b) {
            var c = ig.getImagePixels(this.data, 0, 0, this.width, this.height),
                d = this.width * b,
                f = this.height * b,
                e = ig.$new("canvas");
            e.width = d;
            e.height = f;
            for (var g = e.getContext("2d"), m = g.getImageData(0, 0, d, f), p = 0; p < f; p++)
                for (var j = 0; j < d; j++) {
                    var n = 4 * (Math.floor(p / b) * this.width + Math.floor(j / b)),
                        r = 4 * (p * d + j);
                    m.data[r] = c.data[n];
                    m.data[r + 1] = c.data[n + 1];
                    m.data[r + 2] = c.data[n + 2];
                    m.data[r + 3] = c.data[n + 3]
                }
            g.putImageData(m, 0, 0);
            this.data = e
        },
        draw: function(b, c, d, f, e, g) {
            if (this.loaded) {
                var m = ig.system.scale;
                e = (e ? e : this.width) * m;
                g = (g ? g : this.height) * m;
                ig.system.context.drawImage(this.data, d ? d * m : 0, f ? f * m : 0, e, g, ig.system.getDrawPos(b), ig.system.getDrawPos(c), e, g);
                ig.Image.drawCount++
            }
        },
        drawTile: function(b, c, d, f, e, g, m) {
            e = e ? e : f;
            if (this.loaded && !(f > this.width || e > this.height)) {
                var p = ig.system.scale,
                    j = Math.floor(f * p),
                    n = Math.floor(e * p),
                    r = g ? -1 : 1,
                    q = m ? -1 : 1;
                if (g || m) ig.system.context.save(), ig.system.context.scale(r, q);
                ig.system.context.drawImage(this.data, Math.floor(d * f) % this.width * p, Math.floor(d * f / this.width) * e * p, j, n, ig.system.getDrawPos(b) * r - (g ? j : 0), ig.system.getDrawPos(c) * q - (m ? n : 0), j, n);
                (g || m) && ig.system.context.restore();
                ig.Image.drawCount++
            }
        }
    });
    ig.Image.drawCount = 0;
    ig.Image.cache = {};
    ig.Image.reloadCache = function() {
        for (var b in ig.Image.cache) ig.Image.cache[b].reload()
    }
});
ig.baked = !0;
ig.module("impact.font").requires("impact.image").defines(function() {
    ig.Font = ig.Image.extend({
        widthMap: [],
        indices: [],
        firstChar: 32,
        alpha: 1,
        letterSpacing: 1,
        lineSpacing: 0,
        onload: function(b) {
            this._loadMetrics(this.data);
            this.parent(b)
        },
        widthForString: function(b) {
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var c = 0, d = 0; d < b.length; d++) c = Math.max(c, this._widthForLine(b[d]));
                return c
            }
            return this._widthForLine(b)
        },
        _widthForLine: function(b) {
            for (var c = 0, d = 0; d < b.length; d++) c += this.widthMap[b.charCodeAt(d) - this.firstChar] + this.letterSpacing;
            return c
        },
        heightForString: function(b) {
            return b.split("\n").length * (this.height + this.lineSpacing)
        },
        draw: function(b, c, d, f) {
            "string" != typeof b && (b = b.toString());
            if (-1 !== b.indexOf("\n")) {
                b = b.split("\n");
                for (var e = this.height + this.lineSpacing, g = 0; g < b.length; g++) this.draw(b[g], c, d + g * e, f)
            } else {
                if (f == ig.Font.ALIGN.RIGHT || f == ig.Font.ALIGN.CENTER) g = this._widthForLine(b), c -= f == ig.Font.ALIGN.CENTER ? g / 2 : g;
                1 !== this.alpha && (ig.system.context.globalAlpha = this.alpha);
                for (g = 0; g < b.length; g++) f = b.charCodeAt(g),
                    c += this._drawChar(f - this.firstChar, c, d);
                1 !== this.alpha && (ig.system.context.globalAlpha = 1);
                ig.Image.drawCount += b.length
            }
        },
        _drawChar: function(b, c, d) {
            if (!this.loaded || 0 > b || b >= this.indices.length) return 0;
            var f = ig.system.scale,
                e = this.widthMap[b] * f,
                g = (this.height - 2) * f;
            ig.system.context.drawImage(this.data, this.indices[b] * f, 0, e, g, ig.system.getDrawPos(c), ig.system.getDrawPos(d), e, g);
            return this.widthMap[b] + this.letterSpacing
        },
        _loadMetrics: function(b) {
            this.height = b.height - 1;
            this.widthMap = [];
            this.indices = [];
            for (var c = ig.getImagePixels(b, 0, b.height - 1, b.width, 1), d = 0, f = 0, e = 0; e < b.width; e++) {
                var g = 4 * e + 3;
                127 < c.data[g] ? f++ : 128 > c.data[g] && f && (this.widthMap.push(f), this.indices.push(e - f), d++, f = 0)
            }
            this.widthMap.push(f);
            this.indices.push(e - f)
        }
    });
    ig.Font.ALIGN = {
        LEFT: 0,
        RIGHT: 1,
        CENTER: 2
    }
});
ig.baked = !0;
ig.module("impact.sound").defines(function() {
    ig.SoundManager = ig.Class.extend({
        clips: {},
        volume: 1,
        format: null,
        init: function() {
            if (!ig.Sound.enabled || !window.Audio) ig.Sound.enabled = !1;
            else {
                for (var b = new Audio, c = 0; c < ig.Sound.use.length; c++) {
                    var d = ig.Sound.use[c];
                    if (b.canPlayType(d.mime)) {
                        this.format = d;
                        break
                    }
                }
                this.format || (ig.Sound.enabled = !1)
            }
        },
        load: function(b, c, d) {
            var f = ig.prefix + b.replace(/[^\.]+$/, this.format.ext) + ig.nocache;
            if (this.clips[b]) {
                if (c && this.clips[b].length < ig.Sound.channels)
                    for (c = this.clips[b].length; c < ig.Sound.channels; c++) {
                        var e = new Audio(f);
                        e.load();
                        this.clips[b].push(e)
                    }
                return this.clips[b][0]
            }
            var g = new Audio(f);
            d && (g.addEventListener("canplaythrough", function p(c) {
                g.removeEventListener("canplaythrough", p, !1);
                d(b, !0, c)
            }, !1), g.addEventListener("error", function(c) {
                d(b, !1, c)
            }, !1));
            g.preload = "auto";
            g.load();
            this.clips[b] = [g];
            if (c)
                for (c = 1; c < ig.Sound.channels; c++) e = new Audio(f), e.load(), this.clips[b].push(e);
            return g
        },
        get: function(b) {
            b = this.clips[b];
            for (var c = 0, d; d = b[c++];)
                if (d.paused || d.ended) return d.ended && (d.currentTime = 0), d;
            b[0].pause();
            b[0].currentTime = 0;
            return b[0]
        }
    });
    ig.Music = ig.Class.extend({
        tracks: [],
        namedTracks: {},
        currentTrack: null,
        currentIndex: 0,
        random: !1,
        _volume: 1,
        _loop: !1,
        _fadeInterval: 0,
        _fadeTimer: null,
        _endedCallbackBound: null,
        init: function() {
            this._endedCallbackBound = this._endedCallback.bind(this);
            Object.defineProperty ? (Object.defineProperty(this, "volume", {
                get: this.getVolume.bind(this),
                set: this.setVolume.bind(this)
            }), Object.defineProperty(this, "loop", {
                get: this.getLooping.bind(this),
                set: this.setLooping.bind(this)
            })) : this.__defineGetter__ && (this.__defineGetter__("volume", this.getVolume.bind(this)), this.__defineSetter__("volume", this.setVolume.bind(this)), this.__defineGetter__("loop", this.getLooping.bind(this)), this.__defineSetter__("loop", this.setLooping.bind(this)))
        },
        add: function(b, c) {
            if (ig.Sound.enabled) {
                var d = ig.soundManager.load(b instanceof ig.Sound ? b.path : b, !1);
                d.loop = this._loop;
                d.volume = this._volume;
                d.addEventListener("ended", this._endedCallbackBound, !1);
                this.tracks.push(d);
                c && (this.namedTracks[c] = d);
                this.currentTrack || (this.currentTrack = d)
            }
        },
        next: function() {
            this.tracks.length && (this.stop(), this.currentIndex = this.random ? Math.floor(Math.random() * this.tracks.length) : (this.currentIndex + 1) % this.tracks.length, this.currentTrack = this.tracks[this.currentIndex], this.play())
        },
        pause: function() {
            this.currentTrack && this.currentTrack.pause()
        },
        stop: function() {
            this.currentTrack && (this.currentTrack.pause(), this.currentTrack.currentTime = 0)
        },
        play: function(b) {
            if (b && this.namedTracks[b]) b = this.namedTracks[b], b != this.currentTrack && (this.stop(), this.currentTrack = b);
            else if (!this.currentTrack) return;
            this.currentTrack.play()
        },
        getLooping: function() {
            return this._loop
        },
        setLooping: function(b) {
            this._loop = b;
            for (var c in this.tracks) this.tracks[c].loop = b
        },
        getVolume: function() {
            return this._volume
        },
        setVolume: function(b) {
            this._volume = b.limit(0, 1);
            for (var c in this.tracks) this.tracks[c].volume = this._volume
        },
        fadeOut: function(b) {
            this.currentTrack && (clearInterval(this._fadeInterval), this.fadeTimer = new ig.Timer(b), this._fadeInterval = setInterval(this._fadeStep.bind(this), 50))
        },
        _fadeStep: function() {
            var b = this.fadeTimer.delta().map(-this.fadeTimer.target, 0, 1, 0).limit(0, 1) * this._volume;
            0.01 >= b ? (this.stop(), this.currentTrack.volume = this._volume, clearInterval(this._fadeInterval)) : this.currentTrack.volume = b
        },
        _endedCallback: function() {
            this._loop ? this.play() : this.next()
        }
    });
    ig.Sound = ig.Class.extend({
        path: "",
        volume: 1,
        currentClip: null,
        multiChannel: !0,
        init: function(b, c) {
            this.path = b;
            this.multiChannel = !1 !== c;
            this.load()
        },
        load: function(b) {
            ig.Sound.enabled ? ig.ready ? ig.soundManager.load(this.path, this.multiChannel, b) : ig.addResource(this) : b && b(this.path, !0)
        },
        play: function() {
            ig.Sound.enabled && (this.currentClip = ig.soundManager.get(this.path), this.currentClip.volume = ig.soundManager.volume * this.volume, this.currentClip.play())
        },
        stop: function() {
            this.currentClip && (this.currentClip.pause(), this.currentClip.currentTime = 0)
        }
    });
    ig.Sound.FORMAT = {
        MP3: {
            ext: "mp3",
            mime: "audio/mpeg"
        },
        M4A: {
            ext: "m4a",
            mime: "audio/mp4; codecs=mp4a"
        },
        OGG: {
            ext: "ogg",
            mime: "audio/ogg; codecs=vorbis"
        },
        WEBM: {
            ext: "webm",
            mime: "audio/webm; codecs=vorbis"
        },
        CAF: {
            ext: "caf",
            mime: "audio/x-caf"
        }
    };
    ig.Sound.use = [ig.Sound.FORMAT.OGG, ig.Sound.FORMAT.MP3];
    ig.Sound.channels = 4;
    ig.Sound.enabled = !0
});
ig.baked = !0;
ig.module("impact.loader").requires("impact.image", "impact.font", "impact.sound").defines(function() {
    ig.Loader = ig.Class.extend({
        resources: [],
        gameClass: null,
        status: 0,
        done: !1,
        _unloaded: [],
        _drawStatus: 0,
        _intervalId: 0,
        _loadCallbackBound: null,
        init: function(b, c) {
            this.gameClass = b;
            this.resources = c;
            this._loadCallbackBound = this._loadCallback.bind(this);
            for (var d = 0; d < this.resources.length; d++) this._unloaded.push(this.resources[d].path)
        },
        load: function() {
            ig.system.clear("#000");
            if (this.resources.length) {
                for (var b = 0; b < this.resources.length; b++) this.loadResource(this.resources[b]);
                this._intervalId = setInterval(this.draw.bind(this), 16)
            } else this.end()
        },
        loadResource: function(b) {
            b.load(this._loadCallbackBound)
        },
        end: function() {
            this.done || (this.done = !0, clearInterval(this._intervalId))
        },
        draw: function() {},
        _loadCallback: function(b, c) {
            if (c) this._unloaded.erase(b);
            else throw "Failed to load resource: " + b;
            this.status = 1 - this._unloaded.length / this.resources.length;
            0 == this._unloaded.length && setTimeout(this.end.bind(this), 250)
        }
    })
});
ig.baked = !0;
ig.module("impact.timer").defines(function() {
    ig.Timer = ig.Class.extend({
        target: 0,
        base: 0,
        last: 0,
        pausedAt: 0,
        init: function(b) {
            this.last = this.base = ig.Timer.time;
            this.target = b || 0
        },
        set: function(b) {
            this.target = b || 0;
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        reset: function() {
            this.base = ig.Timer.time;
            this.pausedAt = 0
        },
        tick: function() {
            var b = ig.Timer.time - this.last;
            this.last = ig.Timer.time;
            return this.pausedAt ? 0 : b
        },
        delta: function() {
            return (this.pausedAt || ig.Timer.time) - this.base - this.target
        },
        pause: function() {
            this.pausedAt || (this.pausedAt = ig.Timer.time)
        },
        unpause: function() {
            this.pausedAt && (this.base += ig.Timer.time - this.pausedAt, this.pausedAt = 0)
        }
    });
    ig.Timer._last = 0;
    ig.Timer.time = Number.MIN_VALUE;
    ig.Timer.timeScale = 1;
    ig.Timer.maxStep = 0.05;
    ig.Timer.step = function() {
        var b = Date.now();
        ig.Timer.time += Math.min((b - ig.Timer._last) / 1E3, ig.Timer.maxStep) * ig.Timer.timeScale;
        ig.Timer._last = b
    }
});
ig.baked = !0;
ig.module("impact.system").requires("impact.timer", "impact.image").defines(function() {
    ig.System = ig.Class.extend({
        fps: 30,
        width: 320,
        height: 240,
        realWidth: 320,
        realHeight: 240,
        scale: 1,
        tick: 0,
        animationId: 0,
        newGameClass: null,
        running: !1,
        delegate: null,
        clock: null,
        canvas: null,
        context: null,
        init: function(b, c, d, f, e) {
            this.fps = c;
            this.clock = new ig.Timer;
            this.canvas = ig.$(b);
            this.resize(d, f, e);
            this.context = this.canvas.getContext("2d");
            this.getDrawPos = ig.System.drawMode;
            1 != this.scale && (ig.System.scaleMode = ig.System.SCALE.CRISP);
            ig.System.scaleMode(this.canvas, this.context)
        },
        resize: function(b, c, d) {
            this.width = b;
            this.height = c;
            this.scale = d || this.scale;
            this.realWidth = this.width * this.scale;
            this.realHeight = this.height * this.scale;
            this.canvas.width = this.realWidth;
            this.canvas.height = this.realHeight
        },
        setGame: function(b) {
            this.running ? this.newGameClass = b : this.setGameNow(b)
        },
        setGameNow: function(b) {
            ig.game = new b;
            ig.system.setDelegate(ig.game)
        },
        setDelegate: function(b) {
            if ("function" == typeof b.run) this.delegate = b, this.startRunLoop();
            else throw "System.setDelegate: No run() function in object";
        },
        stopRunLoop: function() {
            ig.clearAnimation(this.animationId);
            this.running = !1
        },
        startRunLoop: function() {
            this.stopRunLoop();
            this.animationId = ig.setAnimation(this.run.bind(this), this.canvas);
            this.running = !0
        },
        clear: function(b) {
            this.context.fillStyle = b;
            this.context.fillRect(0, 0, this.realWidth, this.realHeight)
        },
        run: function() {
            ig.Timer.step();
            this.tick = this.clock.tick();
            this.delegate.run();
            ig.input.clearPressed();
            this.newGameClass && (this.setGameNow(this.newGameClass), this.newGameClass = null)
        },
        getDrawPos: null
    });
    ig.System.DRAW = {
        AUTHENTIC: function(b) {
            return Math.round(b) * this.scale
        },
        SMOOTH: function(b) {
            return Math.round(b * this.scale)
        },
        SUBPIXEL: function(b) {
            return b * this.scale
        }
    };
    ig.System.drawMode = ig.System.DRAW.SMOOTH;
    ig.System.SCALE = {
        CRISP: function(b, c) {
            ig.setVendorAttribute(c, "imageSmoothingEnabled", !1);
            b.style.imageRendering = "-moz-crisp-edges";
            b.style.imageRendering = "-o-crisp-edges";
            b.style.imageRendering = "-webkit-optimize-contrast";
            b.style.imageRendering = "crisp-edges";
            b.style.msInterpolationMode = "nearest-neighbor"
        },
        SMOOTH: function(b, c) {
            ig.setVendorAttribute(c, "imageSmoothingEnabled", !0);
            b.style.imageRendering = "";
            b.style.msInterpolationMode = ""
        }
    };
    ig.System.scaleMode = ig.System.SCALE.SMOOTH
});
ig.baked = !0;
ig.module("impact.input").defines(function() {
    ig.KEY = {
        MOUSE1: -1,
        MOUSE2: -3,
        MWHEEL_UP: -4,
        MWHEEL_DOWN: -5,
        BACKSPACE: 8,
        TAB: 9,
        ENTER: 13,
        PAUSE: 19,
        CAPS: 20,
        ESC: 27,
        SPACE: 32,
        PAGE_UP: 33,
        PAGE_DOWN: 34,
        END: 35,
        HOME: 36,
        LEFT_ARROW: 37,
        UP_ARROW: 38,
        RIGHT_ARROW: 39,
        DOWN_ARROW: 40,
        INSERT: 45,
        DELETE: 46,
        _0: 48,
        _1: 49,
        _2: 50,
        _3: 51,
        _4: 52,
        _5: 53,
        _6: 54,
        _7: 55,
        _8: 56,
        _9: 57,
        A: 65,
        B: 66,
        C: 67,
        D: 68,
        E: 69,
        F: 70,
        G: 71,
        H: 72,
        I: 73,
        J: 74,
        K: 75,
        L: 76,
        M: 77,
        N: 78,
        O: 79,
        P: 80,
        Q: 81,
        R: 82,
        S: 83,
        T: 84,
        U: 85,
        V: 86,
        W: 87,
        X: 88,
        Y: 89,
        Z: 90,
        NUMPAD_0: 96,
        NUMPAD_1: 97,
        NUMPAD_2: 98,
        NUMPAD_3: 99,
        NUMPAD_4: 100,
        NUMPAD_5: 101,
        NUMPAD_6: 102,
        NUMPAD_7: 103,
        NUMPAD_8: 104,
        NUMPAD_9: 105,
        MULTIPLY: 106,
        ADD: 107,
        SUBSTRACT: 109,
        DECIMAL: 110,
        DIVIDE: 111,
        F1: 112,
        F2: 113,
        F3: 114,
        F4: 115,
        F5: 116,
        F6: 117,
        F7: 118,
        F8: 119,
        F9: 120,
        F10: 121,
        F11: 122,
        F12: 123,
        SHIFT: 16,
        CTRL: 17,
        ALT: 18,
        PLUS: 187,
        COMMA: 188,
        MINUS: 189,
        PERIOD: 190
    };
    ig.Input = ig.Class.extend({
        bindings: {},
        actions: {},
        presses: {},
        locks: {},
        delayedKeyup: {},
        isUsingMouse: !1,
        isUsingKeyboard: !1,
        isUsingAccelerometer: !1,
        mouse: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0,
            z: 0
        },
        initMouse: function() {
            if (!this.isUsingMouse) {
                this.isUsingMouse = !0;
                var b = this.mousewheel.bind(this);
                ig.system.canvas.addEventListener("mousewheel", b, !1);
                ig.system.canvas.addEventListener("DOMMouseScroll", b, !1);
                ig.system.canvas.addEventListener("contextmenu", this.contextmenu.bind(this), !1);
                ig.system.canvas.addEventListener("mousedown", this.keydown.bind(this), !1);
                ig.system.canvas.addEventListener("mouseup", this.keyup.bind(this), !1);
                ig.system.canvas.addEventListener("mousemove", this.mousemove.bind(this), !1);
                ig.ua.touchDevice && (ig.system.canvas.addEventListener("touchstart", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.mousemove.bind(this), !1), ig.system.canvas.addEventListener("MSPointerDown", this.keydown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.keyup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.mousemove.bind(this), !1), ig.system.canvas.style.msTouchAction = "none")
            }
        },
        initKeyboard: function() {
            this.isUsingKeyboard || (this.isUsingKeyboard = !0, window.addEventListener("keydown", this.keydown.bind(this), !1), window.addEventListener("keyup", this.keyup.bind(this), !1))
        },
        initAccelerometer: function() {
            this.isUsingAccelerometer || window.addEventListener("devicemotion", this.devicemotion.bind(this), !1)
        },
        mousewheel: function(b) {
            var c = this.bindings[0 < (b.wheelDelta ? b.wheelDelta : -1 * b.detail) ? ig.KEY.MWHEEL_UP : ig.KEY.MWHEEL_DOWN];
            c && (this.actions[c] = !0, this.presses[c] = !0, this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault())
        },
        mousemove: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = {
                    left: 0,
                    top: 0
                };
            ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
            b = b.touches ? b.touches[0] : b;
            this.mouse.x = (b.clientX - d.left) / c;
            this.mouse.y = (b.clientY - d.top) / c
        },
        contextmenu: function(b) {
            this.bindings[ig.KEY.MOUSE2] && (b.stopPropagation(), b.preventDefault())
        },
        keydown: function(b) {
            var c = b.target.tagName;
            if (!("INPUT" == c || "TEXTAREA" == c))
                if (c = "keydown" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1, ("touchstart" == b.type || "mousedown" == b.type) && this.mousemove(b), c = this.bindings[c]) this.actions[c] = !0, this.locks[c] || (this.presses[c] = !0, this.locks[c] = !0), b.stopPropagation(), b.preventDefault()
        },
        keyup: function(b) {
            var c = b.target.tagName;
            if (!("INPUT" == c || "TEXTAREA" == c))
                if (c = this.bindings["keyup" == b.type ? b.keyCode : 2 == b.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1]) this.delayedKeyup[c] = !0, b.stopPropagation(), b.preventDefault()
        },
        devicemotion: function(b) {
            this.accel = b.accelerationIncludingGravity
        },
        bind: function(b, c) {
            0 > b ? this.initMouse() : 0 < b && this.initKeyboard();
            this.bindings[b] = c
        },
        bindTouch: function(b, c) {
            var d = ig.$(b),
                f = this;
            d.addEventListener("touchstart", function(b) {
                f.touchStart(b, c)
            }, !1);
            d.addEventListener("touchend", function(b) {
                f.touchEnd(b, c)
            }, !1);
            d.addEventListener("MSPointerDown", function(b) {
                f.touchStart(b, c)
            }, !1);
            d.addEventListener("MSPointerUp", function(b) {
                f.touchEnd(b, c)
            }, !1)
        },
        unbind: function(b) {
            this.delayedKeyup[this.bindings[b]] = !0;
            this.bindings[b] = null
        },
        unbindAll: function() {
            this.bindings = {};
            this.actions = {};
            this.presses = {};
            this.locks = {};
            this.delayedKeyup = {}
        },
        state: function(b) {
            return this.actions[b]
        },
        pressed: function(b) {
            return this.presses[b]
        },
        released: function(b) {
            return !!this.delayedKeyup[b]
        },
        clearPressed: function() {
            for (var b in this.delayedKeyup) this.actions[b] = !1, this.locks[b] = !1;
            this.delayedKeyup = {};
            this.presses = {}
        },
        touchStart: function(b, c) {
            this.actions[c] = !0;
            this.presses[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        },
        touchEnd: function(b, c) {
            this.delayedKeyup[c] = !0;
            b.stopPropagation();
            b.preventDefault();
            return !1
        }
    })
});
ig.baked = !0;
ig.module("impact.impact").requires("dom.ready", "impact.loader", "impact.system", "impact.input", "impact.sound").defines(function() {
    ig.main = function(b, c, d, f, e, g, m) {
        ig.system = new ig.System(b, d, f, e, g || 1);
        ig.input = new ig.Input;
        ig.soundManager = new ig.SoundManager;
        ig.music = new ig.Music;
        ig.ready = !0;
        (new(m || ig.Loader)(c, ig.resources)).load()
    }
});
ig.baked = !0;
ig.module("impact.animation").requires("impact.timer", "impact.image").defines(function() {
    ig.AnimationSheet = ig.Class.extend({
        width: 8,
        height: 8,
        image: null,
        init: function(b, c, d) {
            this.width = c;
            this.height = d;
            this.image = new ig.Image(b)
        }
    });
    ig.Animation = ig.Class.extend({
        sheet: null,
        timer: null,
        sequence: [],
        flip: {
            x: !1,
            y: !1
        },
        pivot: {
            x: 0,
            y: 0
        },
        frame: 0,
        tile: 0,
        loopCount: 0,
        alpha: 1,
        angle: 0,
        init: function(b, c, d, f) {
            this.sheet = b;
            this.pivot = {
                x: b.width / 2,
                y: b.height / 2
            };
            this.timer = new ig.Timer;
            this.frameTime = c;
            this.sequence = d;
            this.stop = !!f;
            this.tile = this.sequence[0]
        },
        rewind: function() {
            this.timer.set();
            this.frame = this.loopCount = 0;
            this.tile = this.sequence[0];
            return this
        },
        gotoFrame: function(b) {
            this.timer.set(this.frameTime * -b - 1E-4);
            this.update()
        },
        gotoRandomFrame: function() {
            this.gotoFrame(Math.floor(Math.random() * this.sequence.length))
        },
        update: function() {
            var b = Math.floor(this.timer.delta() / this.frameTime);
            this.loopCount = Math.floor(b / this.sequence.length);
            this.frame = this.stop && 0 < this.loopCount ? this.sequence.length - 1 : b % this.sequence.length;
            this.tile = this.sequence[this.frame]
        },
        draw: function(b, c) {
            var d = Math.max(this.sheet.width, this.sheet.height);
            b > ig.system.width || c > ig.system.height || (0 > b + d || 0 > c + d) || (1 != this.alpha && (ig.system.context.globalAlpha = this.alpha), 0 == this.angle ? this.sheet.image.drawTile(b, c, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y) : (ig.system.context.save(), ig.system.context.translate(ig.system.getDrawPos(b + this.pivot.x), ig.system.getDrawPos(c + this.pivot.y)), ig.system.context.rotate(this.angle), this.sheet.image.drawTile(-this.pivot.x, -this.pivot.y, this.tile, this.sheet.width, this.sheet.height, this.flip.x, this.flip.y), ig.system.context.restore()), 1 != this.alpha && (ig.system.context.globalAlpha = 1))
        }
    })
});
ig.baked = !0;
ig.module("impact.entity").requires("impact.animation", "impact.impact").defines(function() {
    ig.Entity = ig.Class.extend({
        id: 0,
        settings: {},
        size: {
            x: 16,
            y: 16
        },
        offset: {
            x: 0,
            y: 0
        },
        pos: {
            x: 0,
            y: 0
        },
        last: {
            x: 0,
            y: 0
        },
        vel: {
            x: 0,
            y: 0
        },
        accel: {
            x: 0,
            y: 0
        },
        friction: {
            x: 0,
            y: 0
        },
        maxVel: {
            x: 100,
            y: 100
        },
        zIndex: 0,
        gravityFactor: 1,
        standing: !1,
        bounciness: 0,
        minBounceVelocity: 40,
        anims: {},
        animSheet: null,
        currentAnim: null,
        health: 10,
        type: 0,
        checkAgainst: 0,
        collides: 0,
        _killed: !1,
        slopeStanding: {
            min: (44).toRad(),
            max: (136).toRad()
        },
        init: function(b, c, d) {
            this.id = ++ig.Entity._lastId;
            this.pos.x = this.last.x = b;
            this.pos.y = this.last.y = c;
            ig.merge(this, d)
        },
        reset: function(b, c, d) {
            var f = this.constructor.prototype;
            this.pos.x = b;
            this.pos.y = c;
            this.last.x = b;
            this.last.y = c;
            this.vel.x = f.vel.x;
            this.vel.y = f.vel.y;
            this.accel.x = f.accel.x;
            this.accel.y = f.accel.y;
            this.health = f.health;
            this._killed = f._killed;
            this.standing = f.standing;
            this.type = f.type;
            this.checkAgainst = f.checkAgainst;
            this.collides = f.collides;
            ig.merge(this, d)
        },
        addAnim: function(b, c, d, f) {
            if (!this.animSheet) throw "No animSheet to add the animation " + b + " to.";
            c = new ig.Animation(this.animSheet, c, d, f);
            this.anims[b] = c;
            this.currentAnim || (this.currentAnim = c);
            return c
        },
        update: function() {
            this.last.x = this.pos.x;
            this.last.y = this.pos.y;
            this.vel.y += ig.game.gravity * ig.system.tick * this.gravityFactor;
            this.vel.x = this.getNewVelocity(this.vel.x, this.accel.x, this.friction.x, this.maxVel.x);
            this.vel.y = this.getNewVelocity(this.vel.y, this.accel.y, this.friction.y, this.maxVel.y);
            var b = ig.game.collisionMap.trace(this.pos.x, this.pos.y, this.vel.x * ig.system.tick, this.vel.y * ig.system.tick, this.size.x, this.size.y);
            this.handleMovementTrace(b);
            this.currentAnim && this.currentAnim.update()
        },
        getNewVelocity: function(b, c, d, f) {
            return c ? (b + c * ig.system.tick).limit(-f, f) : d ? (c = d * ig.system.tick, 0 < b - c ? b - c : 0 > b + c ? b + c : 0) : b.limit(-f, f)
        },
        handleMovementTrace: function(b) {
            this.standing = !1;
            b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
            b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
            if (b.collision.slope) {
                var c = b.collision.slope;
                if (0 < this.bounciness) {
                    var d = this.vel.x * c.nx + this.vel.y * c.ny;
                    this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                    this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
                } else d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
            }
            this.pos = b.pos
        },
        draw: function() {
            this.currentAnim && this.currentAnim.draw(this.pos.x - this.offset.x - ig.game._rscreen.x, this.pos.y - this.offset.y - ig.game._rscreen.y)
        },
        kill: function() {
            ig.game.removeEntity(this)
        },
        receiveDamage: function(b) {
            this.health -= b;
            0 >= this.health && this.kill()
        },
        touches: function(b) {
            return !(this.pos.x >= b.pos.x + b.size.x || this.pos.x + this.size.x <= b.pos.x || this.pos.y >= b.pos.y + b.size.y || this.pos.y + this.size.y <= b.pos.y)
        },
        distanceTo: function(b) {
            var c = this.pos.x + this.size.x / 2 - (b.pos.x + b.size.x / 2);
            b = this.pos.y + this.size.y / 2 - (b.pos.y + b.size.y / 2);
            return Math.sqrt(c * c + b * b)
        },
        angleTo: function(b) {
            return Math.atan2(b.pos.y + b.size.y / 2 - (this.pos.y + this.size.y / 2), b.pos.x + b.size.x / 2 - (this.pos.x + this.size.x / 2))
        },
        check: function() {},
        collideWith: function() {},
        ready: function() {},
        erase: function() {}
    });
    ig.Entity._lastId = 0;
    ig.Entity.COLLIDES = {
        NEVER: 0,
        LITE: 1,
        PASSIVE: 2,
        ACTIVE: 4,
        FIXED: 8
    };
    ig.Entity.TYPE = {
        NONE: 0,
        A: 1,
        B: 2,
        BOTH: 3
    };
    ig.Entity.checkPair = function(b, c) {
        b.checkAgainst & c.type && b.check(c);
        c.checkAgainst & b.type && c.check(b);
        b.collides && c.collides && b.collides + c.collides > ig.Entity.COLLIDES.ACTIVE && ig.Entity.solveCollision(b, c)
    };
    ig.Entity.solveCollision = function(b, c) {
        var d = null;
        if (b.collides == ig.Entity.COLLIDES.LITE || c.collides == ig.Entity.COLLIDES.FIXED) d = b;
        else if (c.collides == ig.Entity.COLLIDES.LITE || b.collides == ig.Entity.COLLIDES.FIXED) d = c;
        b.last.x + b.size.x > c.last.x && b.last.x < c.last.x + c.size.x ? (b.last.y < c.last.y ? ig.Entity.seperateOnYAxis(b, c, d) : ig.Entity.seperateOnYAxis(c, b, d), b.collideWith(c, "y"), c.collideWith(b, "y")) : b.last.y + b.size.y > c.last.y && b.last.y < c.last.y + c.size.y && (b.last.x < c.last.x ? ig.Entity.seperateOnXAxis(b, c, d) : ig.Entity.seperateOnXAxis(c, b, d), b.collideWith(c, "x"), c.collideWith(b, "x"))
    };
    ig.Entity.seperateOnXAxis = function(b, c, d) {
        var f = b.pos.x + b.size.x - c.pos.x;
        d ? (d.vel.x = -d.vel.x * d.bounciness + (b === d ? c : b).vel.x, c = ig.game.collisionMap.trace(d.pos.x, d.pos.y, d == b ? -f : f, 0, d.size.x, d.size.y), d.pos.x = c.pos.x) : (d = (b.vel.x - c.vel.x) / 2, b.vel.x = -d, c.vel.x = d, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, -f / 2, 0, b.size.x, b.size.y), b.pos.x = Math.floor(d.pos.x), b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, f / 2, 0, c.size.x, c.size.y), c.pos.x = Math.ceil(b.pos.x))
    };
    ig.Entity.seperateOnYAxis = function(b, c, d) {
        var f = b.pos.y + b.size.y - c.pos.y;
        if (d) {
            c = b === d ? c : b;
            d.vel.y = -d.vel.y * d.bounciness + c.vel.y;
            var e = 0;
            d == b && Math.abs(d.vel.y - c.vel.y) < d.minBounceVelocity && (d.standing = !0, e = c.vel.x * ig.system.tick);
            b = ig.game.collisionMap.trace(d.pos.x, d.pos.y, e, d == b ? -f : f, d.size.x, d.size.y);
            d.pos.y = b.pos.y;
            d.pos.x = b.pos.x
        } else ig.game.gravity && (c.standing || 0 < b.vel.y) ? (d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, 0, -(b.pos.y + b.size.y - c.pos.y), b.size.x, b.size.y), b.pos.y = d.pos.y, 0 < b.bounciness && b.vel.y > b.minBounceVelocity ? b.vel.y *= -b.bounciness : (b.standing = !0, b.vel.y = 0)) : (d = (b.vel.y - c.vel.y) / 2, b.vel.y = -d, c.vel.y = d, e = c.vel.x * ig.system.tick, d = ig.game.collisionMap.trace(b.pos.x, b.pos.y, e, -f / 2, b.size.x, b.size.y), b.pos.y = d.pos.y, b = ig.game.collisionMap.trace(c.pos.x, c.pos.y, 0, f / 2, c.size.x, c.size.y), c.pos.y = b.pos.y)
    }
});
ig.baked = !0;
ig.module("impact.map").defines(function() {
    ig.Map = ig.Class.extend({
        tilesize: 8,
        width: 1,
        height: 1,
        data: [
            []
        ],
        name: null,
        init: function(b, c) {
            this.tilesize = b;
            this.data = c;
            this.height = c.length;
            this.width = c[0].length;
            this.pxWidth = this.width * this.tilesize;
            this.pxHeight = this.height * this.tilesize
        },
        getTile: function(b, c) {
            var d = Math.floor(b / this.tilesize),
                f = Math.floor(c / this.tilesize);
            return 0 <= d && d < this.width && 0 <= f && f < this.height ? this.data[f][d] : 0
        },
        setTile: function(b, c, d) {
            b = Math.floor(b / this.tilesize);
            c = Math.floor(c / this.tilesize);
            0 <= b && b < this.width && 0 <= c && c < this.height && (this.data[c][b] = d)
        }
    })
});
ig.baked = !0;
ig.module("impact.collision-map").requires("impact.map").defines(function() {
    ig.CollisionMap = ig.Map.extend({
        lastSlope: 1,
        tiledef: null,
        init: function(b, c, e) {
            this.parent(b, c);
            this.tiledef = e || ig.CollisionMap.defaultTileDef;
            for (var g in this.tiledef) g | 0 > this.lastSlope && (this.lastSlope = g | 0)
        },
        trace: function(b, c, e, g, m, p) {
            var j = {
                    collision: {
                        x: !1,
                        y: !1,
                        slope: !1
                    },
                    pos: {
                        x: b,
                        y: c
                    },
                    tile: {
                        x: 0,
                        y: 0
                    }
                },
                n = Math.ceil(Math.max(Math.abs(e), Math.abs(g)) / this.tilesize);
            if (1 < n)
                for (var r = e / n, q = g / n, s = 0; s < n && (r || q) && !(this._traceStep(j, b, c, r, q, m, p, e, g, s), b = j.pos.x, c = j.pos.y, j.collision.x && (e = r = 0), j.collision.y && (g = q = 0), j.collision.slope); s++);
            else this._traceStep(j, b, c, e, g, m, p, e, g, 0);
            return j
        },
        _traceStep: function(b, c, e, g, m, p, j, n, r, q) {
            b.pos.x += g;
            b.pos.y += m;
            var s = 0;
            if (g) {
                var t = 0 < g ? p : 0,
                    u = 0 > g ? this.tilesize : 0,
                    s = Math.max(Math.floor(e / this.tilesize), 0),
                    x = Math.min(Math.ceil((e + j) / this.tilesize), this.height);
                g = Math.floor((b.pos.x + t) / this.tilesize);
                var z = Math.floor((c + t) / this.tilesize);
                if (0 < q || g == z || 0 > z || z >= this.width) z = -1;
                if (0 <= g && g < this.width)
                    for (var C = s; C < x && !(-1 != z && (s = this.data[C][z], 1 < s && s <= this.lastSlope && this._checkTileDef(b, s, c, e, n, r, p, j, z, C))); C++)
                        if (s = this.data[C][g], 1 == s || s > this.lastSlope || 1 < s && this._checkTileDef(b, s, c, e, n, r, p, j, g, C)) {
                            if (1 < s && s <= this.lastSlope && b.collision.slope) break;
                            b.collision.x = !0;
                            b.tile.x = s;
                            c = b.pos.x = g * this.tilesize - t + u;
                            n = 0;
                            break
                        }
            }
            if (m) {
                t = 0 < m ? j : 0;
                m = 0 > m ? this.tilesize : 0;
                s = Math.max(Math.floor(b.pos.x / this.tilesize), 0);
                u = Math.min(Math.ceil((b.pos.x + p) / this.tilesize), this.width);
                C = Math.floor((b.pos.y + t) / this.tilesize);
                x = Math.floor((e + t) / this.tilesize);
                if (0 < q || C == x || 0 > x || x >= this.height) x = -1;
                if (0 <= C && C < this.height)
                    for (g = s; g < u && !(-1 != x && (s = this.data[x][g], 1 < s && s <= this.lastSlope && this._checkTileDef(b, s, c, e, n, r, p, j, g, x))); g++)
                        if (s = this.data[C][g], 1 == s || s > this.lastSlope || 1 < s && this._checkTileDef(b, s, c, e, n, r, p, j, g, C)) {
                            if (1 < s && s <= this.lastSlope && b.collision.slope) break;
                            b.collision.y = !0;
                            b.tile.y = s;
                            b.pos.y = C * this.tilesize - t + m;
                            break
                        }
            }
        },
        _checkTileDef: function(b, c, e, g, m, p, j, n, r, q) {
            var s = this.tiledef[c];
            if (!s) return !1;
            c = (s[2] - s[0]) * this.tilesize;
            var t = (s[3] - s[1]) * this.tilesize,
                u = s[4];
            j = e + m + (0 > t ? j : 0) - (r + s[0]) * this.tilesize;
            n = g + p + (0 < c ? n : 0) - (q + s[1]) * this.tilesize;
            if (0 < c * n - t * j) {
                if (0 > m * -t + p * c) return u;
                r = Math.sqrt(c * c + t * t);
                q = t / r;
                r = -c / r;
                var x = j * q + n * r,
                    s = q * x,
                    x = r * x;
                if (s * s + x * x >= m * m + p * p) return u || 0.5 > c * (n - p) - t * (j - m);
                b.pos.x = e + m - s;
                b.pos.y = g + p - x;
                b.collision.slope = {
                    x: c,
                    y: t,
                    nx: q,
                    ny: r
                };
                return !0
            }
            return !1
        }
    });
    var b = 1 / 3,
        c = 2 / 3;
    ig.CollisionMap.defaultTileDef = {
        5: [0, 1, 1, c, !0],
        6: [0, c, 1, b, !0],
        7: [0, b, 1, 0, !0],
        3: [0, 1, 1, 0.5, !0],
        4: [0, 0.5, 1, 0, !0],
        2: [0,
            1, 1, 0, !0
        ],
        10: [0.5, 1, 1, 0, !0],
        21: [0, 1, 0.5, 0, !0],
        32: [c, 1, 1, 0, !0],
        43: [b, 1, c, 0, !0],
        54: [0, 1, b, 0, !0],
        27: [0, 0, 1, b, !0],
        28: [0, b, 1, c, !0],
        29: [0, c, 1, 1, !0],
        25: [0, 0, 1, 0.5, !0],
        26: [0, 0.5, 1, 1, !0],
        24: [0, 0, 1, 1, !0],
        11: [0, 0, 0.5, 1, !0],
        22: [0.5, 0, 1, 1, !0],
        33: [0, 0, b, 1, !0],
        44: [b, 0, c, 1, !0],
        55: [c, 0, 1, 1, !0],
        16: [1, b, 0, 0, !0],
        17: [1, c, 0, b, !0],
        18: [1, 1, 0, c, !0],
        14: [1, 0.5, 0, 0, !0],
        15: [1, 1, 0, 0.5, !0],
        13: [1, 1, 0, 0, !0],
        8: [0.5, 1, 0, 0, !0],
        19: [1, 1, 0.5, 0, !0],
        30: [b, 1, 0, 0, !0],
        41: [c, 1, b, 0, !0],
        52: [1, 1, c, 0, !0],
        38: [1, c, 0, 1, !0],
        39: [1, b, 0, c, !0],
        40: [1, 0,
            0, b, !0
        ],
        36: [1, 0.5, 0, 1, !0],
        37: [1, 0, 0, 0.5, !0],
        35: [1, 0, 0, 1, !0],
        9: [1, 0, 0.5, 1, !0],
        20: [0.5, 0, 0, 1, !0],
        31: [1, 0, c, 1, !0],
        42: [c, 0, b, 1, !0],
        53: [b, 0, 0, 1, !0],
        12: [0, 0, 1, 0, !1],
        23: [1, 1, 0, 1, !1],
        34: [1, 0, 1, 1, !1],
        45: [0, 1, 0, 0, !1]
    };
    ig.CollisionMap.staticNoCollision = {
        trace: function(b, c, e, g) {
            return {
                collision: {
                    x: !1,
                    y: !1,
                    slope: !1
                },
                pos: {
                    x: b + e,
                    y: c + g
                },
                tile: {
                    x: 0,
                    y: 0
                }
            }
        }
    }
});
ig.baked = !0;
ig.module("impact.background-map").requires("impact.map", "impact.image").defines(function() {
    ig.BackgroundMap = ig.Map.extend({
        tiles: null,
        scroll: {
            x: 0,
            y: 0
        },
        distance: 1,
        repeat: !1,
        tilesetName: "",
        foreground: !1,
        enabled: !0,
        preRender: !1,
        preRenderedChunks: null,
        chunkSize: 512,
        debugChunks: !1,
        anims: {},
        init: function(b, c, d) {
            this.parent(b, c);
            this.setTileset(d)
        },
        setTileset: function(b) {
            this.tilesetName = b instanceof ig.Image ? b.path : b;
            this.tiles = new ig.Image(this.tilesetName);
            this.preRenderedChunks = null
        },
        setScreenPos: function(b, c) {
            this.scroll.x = b / this.distance;
            this.scroll.y = c / this.distance
        },
        preRenderMapToChunks: function() {
            var b = this.width * this.tilesize * ig.system.scale,
                c = this.height * this.tilesize * ig.system.scale;
            this.chunkSize = Math.min(Math.max(b, c), this.chunkSize);
            var d = Math.ceil(b / this.chunkSize),
                f = Math.ceil(c / this.chunkSize);
            this.preRenderedChunks = [];
            for (var e = 0; e < f; e++) {
                this.preRenderedChunks[e] = [];
                for (var g = 0; g < d; g++) this.preRenderedChunks[e][g] = this.preRenderChunk(g, e, g == d - 1 ? b - g * this.chunkSize : this.chunkSize, e == f - 1 ? c - e * this.chunkSize : this.chunkSize)
            }
        },
        preRenderChunk: function(b, c, d, f) {
            var e = d / this.tilesize / ig.system.scale + 1,
                g = f / this.tilesize / ig.system.scale + 1,
                m = b * this.chunkSize / ig.system.scale % this.tilesize,
                p = c * this.chunkSize / ig.system.scale % this.tilesize;
            b = Math.floor(b * this.chunkSize / this.tilesize / ig.system.scale);
            c = Math.floor(c * this.chunkSize / this.tilesize / ig.system.scale);
            var j = ig.$new("canvas");
            j.width = d;
            j.height = f;
            j.retinaResolutionEnabled = !1;
            f = j.getContext("2d");
            ig.System.scaleMode(j, f);
            d = ig.system.context;
            ig.system.context = f;
            for (f = 0; f < e; f++)
                for (var n = 0; n < g; n++)
                    if (f + b < this.width && n + c < this.height) {
                        var r = this.data[n + c][f + b];
                        r && this.tiles.drawTile(f * this.tilesize - m, n * this.tilesize - p, r - 1, this.tilesize)
                    }
            ig.system.context = d;
            return j
        },
        draw: function() {
            this.tiles.loaded && this.enabled && (this.preRender ? this.drawPreRendered() : this.drawTiled())
        },
        drawPreRendered: function() {
            this.preRenderedChunks || this.preRenderMapToChunks();
            var b = ig.system.getDrawPos(this.scroll.x),
                c = ig.system.getDrawPos(this.scroll.y);
            if (this.repeat) var d = this.width * this.tilesize * ig.system.scale,
                b = (b % d + d) % d,
                d = this.height * this.tilesize * ig.system.scale,
                c = (c % d + d) % d;
            var d = Math.max(Math.floor(b / this.chunkSize), 0),
                f = Math.max(Math.floor(c / this.chunkSize), 0),
                e = Math.ceil((b + ig.system.realWidth) / this.chunkSize),
                g = Math.ceil((c + ig.system.realHeight) / this.chunkSize),
                m = this.preRenderedChunks[0].length,
                p = this.preRenderedChunks.length;
            this.repeat || (e = Math.min(e, m), g = Math.min(g, p));
            for (var j = 0; f < g; f++) {
                for (var n = 0, r = d; r < e; r++) {
                    var q = this.preRenderedChunks[f % p][r % m],
                        s = -b + r * this.chunkSize - n,
                        t = -c + f * this.chunkSize - j;
                    ig.system.context.drawImage(q, s, t);
                    ig.Image.drawCount++;
                    this.debugChunks && (ig.system.context.strokeStyle = "#f0f", ig.system.context.strokeRect(s, t, this.chunkSize, this.chunkSize));
                    this.repeat && q.width < this.chunkSize && s + q.width < ig.system.realWidth && (n += this.chunkSize - q.width, e++)
                }
                this.repeat && q.height < this.chunkSize && t + q.height < ig.system.realHeight && (j += this.chunkSize - q.height, g++)
            }
        },
        drawTiled: function() {
            for (var b = 0, c = null, d = (this.scroll.x / this.tilesize).toInt(),
                    f = (this.scroll.y / this.tilesize).toInt(), e = this.scroll.x % this.tilesize, g = this.scroll.y % this.tilesize, m = -e - this.tilesize, e = ig.system.width + this.tilesize - e, p = ig.system.height + this.tilesize - g, j = -1, g = -g - this.tilesize; g < p; j++, g += this.tilesize) {
                var n = j + f;
                if (n >= this.height || 0 > n) {
                    if (!this.repeat) continue;
                    n = (n % this.height + this.height) % this.height
                }
                for (var r = -1, q = m; q < e; r++, q += this.tilesize) {
                    b = r + d;
                    if (b >= this.width || 0 > b) {
                        if (!this.repeat) continue;
                        b = (b % this.width + this.width) % this.width
                    }
                    if (b = this.data[n][b])(c = this.anims[b - 1]) ? c.draw(q, g) : this.tiles.drawTile(q, g, b - 1, this.tilesize)
                }
            }
        }
    })
});
ig.baked = !0;
ig.module("impact.game").requires("impact.impact", "impact.entity", "impact.collision-map", "impact.background-map").defines(function() {
    ig.Game = ig.Class.extend({
        clearColor: "#000000",
        gravity: 0,
        screen: {
            x: 0,
            y: 0
        },
        _rscreen: {
            x: 0,
            y: 0
        },
        entities: [],
        namedEntities: {},
        collisionMap: ig.CollisionMap.staticNoCollision,
        backgroundMaps: [],
        backgroundAnims: {},
        autoSort: !1,
        sortBy: null,
        cellSize: 64,
        _deferredKill: [],
        _levelToLoad: null,
        _doSortEntities: !1,
        staticInstantiate: function() {
            this.sortBy = this.sortBy || ig.Game.SORT.Z_INDEX;
            ig.game = this;
            return null
        },
        loadLevel: function(b) {
            this.screen = {
                x: 0,
                y: 0
            };
            this.entities = [];
            this.namedEntities = {};
            for (var c = 0; c < b.entities.length; c++) {
                var d = b.entities[c];
                this.spawnEntity(d.type, d.x, d.y, d.settings)
            }
            this.sortEntities();
            this.collisionMap = ig.CollisionMap.staticNoCollision;
            this.backgroundMaps = [];
            for (c = 0; c < b.layer.length; c++)
                if (d = b.layer[c], "collision" == d.name) this.collisionMap = new ig.CollisionMap(d.tilesize, d.data);
                else {
                    var f = new ig.BackgroundMap(d.tilesize, d.data, d.tilesetName);
                    f.anims = this.backgroundAnims[d.tilesetName] || {};
                    f.repeat = d.repeat;
                    f.distance = d.distance;
                    f.foreground = !!d.foreground;
                    f.preRender = !!d.preRender;
                    f.name = d.name;
                    this.backgroundMaps.push(f)
                }
            for (c = 0; c < this.entities.length; c++) this.entities[c].ready()
        },
        loadLevelDeferred: function(b) {
            this._levelToLoad = b
        },
        getMapByName: function(b) {
            if ("collision" == b) return this.collisionMap;
            for (var c = 0; c < this.backgroundMaps.length; c++)
                if (this.backgroundMaps[c].name == b) return this.backgroundMaps[c];
            return null
        },
        getEntityByName: function(b) {
            return this.namedEntities[b]
        },
        getEntitiesByType: function(b) {
            b = "string" === typeof b ? ig.global[b] : b;
            for (var c = [], d = 0; d < this.entities.length; d++) {
                var f = this.entities[d];
                f instanceof b && !f._killed && c.push(f)
            }
            return c
        },
        spawnEntity: function(b, c, d, f) {
            var e = "string" === typeof b ? ig.global[b] : b;
            if (!e) throw "Can't spawn entity of type " + b;
            b = new e(c, d, f || {});
            this.entities.push(b);
            b.name && (this.namedEntities[b.name] = b);
            return b
        },
        sortEntities: function() {
            this.entities.sort(this.sortBy)
        },
        sortEntitiesDeferred: function() {
            this._doSortEntities = !0
        },
        removeEntity: function(b) {
            b.name && delete this.namedEntities[b.name];
            b._killed = !0;
            b.type = ig.Entity.TYPE.NONE;
            b.checkAgainst = ig.Entity.TYPE.NONE;
            b.collides = ig.Entity.COLLIDES.NEVER;
            this._deferredKill.push(b)
        },
        run: function() {
            this.update();
            this.draw()
        },
        update: function() {
            this._levelToLoad && (this.loadLevel(this._levelToLoad), this._levelToLoad = null);
            this.updateEntities();
            this.checkEntities();
            for (var b = 0; b < this._deferredKill.length; b++) this._deferredKill[b].erase(), this.entities.erase(this._deferredKill[b]);
            this._deferredKill = [];
            if (this._doSortEntities || this.autoSort) this.sortEntities(), this._doSortEntities = !1;
            for (var c in this.backgroundAnims) {
                var b = this.backgroundAnims[c],
                    d;
                for (d in b) b[d].update()
            }
        },
        updateEntities: function() {
            for (var b = 0; b < this.entities.length; b++) {
                var c = this.entities[b];
                c._killed || c.update()
            }
        },
        draw: function() {
            this.clearColor && ig.system.clear(this.clearColor);
            this._rscreen.x = ig.system.getDrawPos(this.screen.x) / ig.system.scale;
            this._rscreen.y = ig.system.getDrawPos(this.screen.y) / ig.system.scale;
            var b;
            for (b = 0; b < this.backgroundMaps.length; b++) {
                var c = this.backgroundMaps[b];
                if (c.foreground) break;
                c.setScreenPos(this.screen.x, this.screen.y);
                c.draw()
            }
            this.drawEntities();
            for (b; b < this.backgroundMaps.length; b++) c = this.backgroundMaps[b], c.setScreenPos(this.screen.x, this.screen.y), c.draw()
        },
        drawEntities: function() {
            for (var b = 0; b < this.entities.length; b++) this.entities[b].draw()
        },
        checkEntities: function() {
            for (var b = {}, c = 0; c < this.entities.length; c++) {
                var d = this.entities[c];
                if (!(d.type == ig.Entity.TYPE.NONE && d.checkAgainst == ig.Entity.TYPE.NONE && d.collides == ig.Entity.COLLIDES.NEVER))
                    for (var f = {}, e = Math.floor(d.pos.y / this.cellSize), g = Math.floor((d.pos.x + d.size.x) / this.cellSize) + 1, m = Math.floor((d.pos.y + d.size.y) / this.cellSize) + 1, p = Math.floor(d.pos.x / this.cellSize); p < g; p++)
                        for (var j = e; j < m; j++)
                            if (b[p])
                                if (b[p][j]) {
                                    for (var n = b[p][j], r = 0; r < n.length; r++) d.touches(n[r]) && !f[n[r].id] && (f[n[r].id] = !0, ig.Entity.checkPair(d, n[r]));
                                    n.push(d)
                                } else b[p][j] = [d];
                else b[p] = {}, b[p][j] = [d]
            }
        }
    });
    ig.Game.SORT = {
        Z_INDEX: function(b, c) {
            return b.zIndex - c.zIndex
        },
        POS_X: function(b, c) {
            return b.pos.x + b.size.x - (c.pos.x + c.size.x)
        },
        POS_Y: function(b, c) {
            return b.pos.y + b.size.y - (c.pos.y + c.size.y)
        }
    }
});
ig.baked = !0;
ig.module("plugins.patches.webkit-image-smoothing-patch").defines(function() {
    ig.System && (ig.System.SCALE = {
        CRISP: function(b, c) {
            c.imageSmoothingEnabled = c.msImageSmoothingEnabled = c.mozImageSmoothingEnabled = c.oImageSmoothingEnabled = !1;
            b.style.imageRendering = "-moz-crisp-edges";
            b.style.imageRendering = "-o-crisp-edges";
            b.style.imageRendering = "-webkit-optimize-contrast";
            b.style.imageRendering = "crisp-edges";
            b.style.msInterpolationMode = "nearest-neighbor"
        },
        SMOOTH: function(b, c) {
            c.imageSmoothingEnabled = c.msImageSmoothingEnabled = c.mozImageSmoothingEnabled = c.oImageSmoothingEnabled = !0;
            b.style.imageRendering = "";
            b.style.msInterpolationMode = ""
        }
    }, ig.System.scaleMode = ig.System.SCALE.SMOOTH)
});
ig.baked = !0;
ig.module("plugins.patches.windowfocus-onMouseDown-patch").requires("impact.input").defines(function() {
    var b = !1;
    try {
        b = window.self !== window.top, !1 === b && (b = 0 < window.frames.length)
    } catch (c) {
        b = !0
    }
    ig.Input.inject({
        keydown: function(c) {
            var f = c.target.tagName;
            if (!("INPUT" == f || "TEXTAREA" == f))
                if (f = "keydown" == c.type ? c.keyCode : 2 == c.button ? ig.KEY.MOUSE2 : ig.KEY.MOUSE1, b && 0 > f && window.focus(), ("touchstart" == c.type || "mousedown" == c.type) && this.mousemove(c), f = this.bindings[f]) this.actions[f] = !0, this.locks[f] || (this.presses[f] = !0, this.locks[f] = !0), c.stopPropagation(), c.preventDefault()
        }
    })
});
ig.baked = !0;
ig.module("plugins.patches.input-patch").requires("impact.input").defines(function() {
    ig.Input.inject({
        mousemove: function(b) {
            var c = ig.system.scale * (ig.system.realWidth / ig.system.realWidth),
                d = {
                    left: 0,
                    top: 0
                };
            ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
            b = b.touches ? b.touches[0] : b;
            this.mouse.x = (b.clientX - d.left) / c;
            this.mouse.y = (b.clientY - d.top) / c;
            try {
                ig.soundHandler.unlockWebAudio()
            } catch (f) {}
        }
    })
});
ig.baked = !0;
ig.module("plugins.handlers.dom-handler").defines(function() {
    ig.DomHandler = ig.Class.extend({
        JQUERYAVAILABLE: !1,
        init: function() {
            this.JQUERYAVAILABLE = this._jqueryAvailable()
        },
        _jqueryAvailable: function() {
            return "undefined" !== typeof jQuery
        },
        addEvent: function(b, c, d, f) {
            if (this.JQUERYAVAILABLE) b.on(c, d);
            else b.addEventListener(c, d, f)
        },
        create: function(b) {
            return this.JQUERYAVAILABLE ? $("<" + b + ">") : ig.$new(b)
        },
        getElementByClass: function(b) {
            return this.JQUERYAVAILABLE ? $("." + b) : document.getElementsByClassName(b)
        },
        getElementById: function(b) {
            return this.JQUERYAVAILABLE ? 0 < $(b).length ? $(b) : null : ig.$(b)
        },
        appendChild: function(b, c) {
            this.JQUERYAVAILABLE ? b.append(c) : b.appendChild(c)
        },
        appendToBody: function(b) {
            this.JQUERYAVAILABLE ? $("body").append(b) : document.body.appendChild(b)
        },
        resize: function(b, c, d) {
            if (this.JQUERYAVAILABLE) b.width(c.toFixed(2)), b.height(d.toFixed(2));
            else {
                var f = b.style.visibility;
                c = "width:" + c.toFixed(2) + "px; height:" + d.toFixed(2) + "px;";
                this.attr(b, "style", c);
                b.style.visibility = f
            }
        },
        resizeOffsetLeft: function(b, c, d, f) {
            if (this.JQUERYAVAILABLE) b.width(c.toFixed(2)),
                b.height(d.toFixed(2)), b.css("left", f);
            else {
                var e = b.style.visibility;
                c = "width:" + c.toFixed(2) + "px; height:" + d.toFixed(2) + "px; left: " + f.toFixed(2) + "px;";
                this.attr(b, "style", c);
                b.style.visibility = e
            }
        },
        resizeOffset: function(b, c, d, f, e) {
            if (this.JQUERYAVAILABLE) b.width(c.toFixed(2)), b.height(d.toFixed(2)), b.css("left", f), b.css("top", e);
            else {
                var g = b.style.visibility;
                c = "width:" + c.toFixed(2) + "px; height:" + d.toFixed(2) + "px; left: " + f.toFixed(2) + "px; top: " + e.toFixed(2) + "px;";
                this.attr(b, "style", c);
                b.style.visibility = g
            }
        },
        css: function(b, c) {
            if (this.JQUERYAVAILABLE) b.css(c);
            else {
                var d = "",
                    f;
                for (f in c) d += f + ":" + c[f] + ";";
                this.attr(b, "style", d)
            }
        },
        getOffsets: function(b) {
            return this.JQUERYAVAILABLE ? (b = b.offset(), {
                left: b.left,
                top: b.top
            }) : {
                left: b.offsetLeft,
                top: b.offsetTop
            }
        },
        attr: function(b, c, d) {
            if ("undefined" === typeof d) return this.JQUERYAVAILABLE ? b.attr(c) : b.getAttribute(c);
            this.JQUERYAVAILABLE ? b.attr(c, d) : b.setAttribute(c, d)
        },
        show: function(b) {
            b && "undefined" !== typeof b && (this.JQUERYAVAILABLE ? (b.show(), b.css("visibility", "visible")) : b && (b.style ? b.style.visibility = "visible" : b[0] && (b[0].style.visibility = "visible")))
        },
        hide: function(b) {
            b && "undefined" !== typeof b && (this.JQUERYAVAILABLE ? (b.hide(), b.css("visibility", "hidden")) : b && (b.style ? b.style.visibility = "hidden" : b[0] && (b[0].style.visibility = "hidden")))
        },
        getQueryVariable: function(b) {
            for (var c = window.location.search.substring(1).split("&"), d = 0; d < c.length; d++) {
                var f = c[d].split("=");
                if (decodeURIComponent(f[0]) == b) return decodeURIComponent(f[1])
            }
        },
        forcedDeviceDetection: function() {
            var b = this.getQueryVariable("device");
            if (b) switch (b) {
                case "mobile":
                    ig.ua.mobile = !0;
                    break;
                case "desktop":
                    ig.ua.mobile = !1
            }
        },
        forcedDeviceRotation: function() {
            var b = this.getQueryVariable("force-rotate");
            if (b) switch (b) {
                case "portrait":
                    window.orientation = 0;
                    break;
                case "landscape":
                    window.orientation = 90;
                    break;
                default:
                    window.orientation = 0
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.data.vector").defines(function() {
    Vector2 = function(b, c) {
        this.x = b || 0;
        this.y = c || 0
    };
    Vector2.prototype = {
        valType: "number",
        neg: function() {
            this.x = -this.x;
            this.y = -this.y;
            return this
        },
        row: function(b) {
            typeof b === this.valType && (this.y = b);
            return this.y
        },
        col: function(b) {
            typeof b === this.valType && (this.x = b);
            return this.x
        },
        add: function(b) {
            b instanceof Vector2 ? (this.x += b.x, this.y += b.y) : (this.x += b, this.y += b);
            return this
        },
        sub: function(b) {
            b instanceof Vector2 ? (this.x -= b.x, this.y -= b.y) : (this.x -= b, this.y -= b);
            return this
        },
        mul: function(b) {
            b instanceof Vector2 ? (this.x *= b.x, this.y *= b.y) : (this.x *= b, this.y *= b);
            return this
        },
        div: function(b) {
            b instanceof Vector2 ? (0 != b.x && (this.x /= b.x), 0 != b.y && (this.y /= b.y)) : 0 != b && (this.x /= b, this.y /= b);
            return this
        },
        equals: function(b) {
            return this.x == b.x && this.y == b.y
        },
        dot: function(b) {
            return this.x * b.x + this.y * b.y
        },
        cross: function(b) {
            return this.x * b.y - this.y * b.x
        },
        length: function() {
            return Math.sqrt(this.dot(this))
        },
        norm: function() {
            return this.divide(this.length())
        },
        min: function() {
            return Math.min(this.x, this.y)
        },
        max: function() {
            return Math.max(this.x, this.y)
        },
        toAngles: function() {
            return -Math.atan2(-this.y, this.x)
        },
        angleTo: function(b) {
            return Math.acos(this.dot(b) / (this.length() * b.length()))
        },
        toArray: function(b) {
            return [this.x, this.y].slice(0, b || 2)
        },
        clone: function() {
            return new Vector2(this.x, this.y)
        },
        set: function(b, c) {
            this.x = b;
            this.y = c;
            return this
        },
        unit: function() {
            var b = this.length();
            if (0 < b) return new Vector2(this.x / b, this.y / b);
            throw "Divide by 0 error in unitVector function of vector:" + this;
        },
        turnRight: function() {
            var b = this.x;
            this.x = -this.y;
            this.y = b;
            return this
        },
        turnLeft: function() {
            var b = this.x;
            this.x = this.y;
            this.y = -b;
            return this
        },
        rotate: function(b) {
            var c = this.clone();
            this.x = c.x * Math.cos(b) - c.y * Math.sin(b);
            this.y = c.x * Math.sin(b) + c.y * Math.cos(b);
            return this
        }
    };
    Vector2.negative = function(b) {
        return new Vector2(-b.x, -b.y)
    };
    Vector2.add = function(b, c) {
        return c instanceof Vector2 ? new Vector2(b.x + c.x, b.y + c.y) : new Vector2(b.x + v, b.y + v)
    };
    Vector2.subtract = function(b, c) {
        return c instanceof Vector2 ? new Vector2(b.x - c.x, b.y - c.y) : new Vector2(b.x - v, b.y - v)
    };
    Vector2.multiply = function(b, c) {
        return c instanceof Vector2 ? new Vector2(b.x * c.x, b.y * c.y) : new Vector2(b.x * v, b.y * v)
    };
    Vector2.divide = function(b, c) {
        return c instanceof Vector2 ? new Vector2(b.x / c.x, b.y / c.y) : new Vector2(b.x / v, b.y / v)
    };
    Vector2.equals = function(b, c) {
        return b.x == c.x && b.y == c.y
    };
    Vector2.dot = function(b, c) {
        return b.x * c.x + b.y * c.y
    };
    Vector2.cross = function(b, c) {
        return b.x * c.y - b.y * c.x
    }
});
ig.baked = !0;
ig.module("plugins.handlers.size-handler").requires("plugins.data.vector").defines(function() {
    ig.SizeHandler = ig.Class.extend({
        portraitMode: !1,
        disableStretchToFitOnMobileFlag: !0,
        enableStretchToFitOnAntiPortraitModeFlag: !0,
        enableScalingLimitsOnMobileFlag: !1,
        minScalingOnMobile: 0,
        maxScalingOnMobile: 1,
        enableStretchToFitOnDesktopFlag: !1,
        enableScalingLimitsOnDesktopFlag: !1,
        minScalingOnDesktop: 0,
        maxScalingOnDesktop: 1,
        desktop: {
            actualSize: new Vector2(window.innerWidth, window.innerHeight),
            actualResolution: new Vector2(960, 540)
        },
        mobile: {
            actualSize: new Vector2(window.innerWidth, window.innerHeight),
            actualResolution: new Vector2(960, 540)
        },
        windowSize: new Vector2(window.innerWidth, window.innerHeight),
        scaleRatioMultiplier: new Vector2(1, 1),
        sizeRatio: new Vector2(1, 1),
        scale: 1,
        domHandler: null,
        dynamicClickableEntityDivs: {},
        coreDivsToResize: ["#canvas", "#orientate"],
        init: function(b) {
            this.domHandler = b;
            if ("undefined" === typeof b) throw "undefined Dom Handler for Size Handler";
            this.sizeCalcs();
            this.eventListenerSetup();
            this.samsungFix()
        },
        sizeCalcs: function() {
            this.windowSize = new Vector2(window.innerWidth, window.innerHeight);
            if (ig.ua.mobile) {
                this.mobile.actualSize = new Vector2(window.innerWidth, window.innerHeight);
                var b = new Vector2(this.mobile.actualResolution.x, this.mobile.actualResolution.y);
                this.scaleRatioMultiplier = new Vector2(this.mobile.actualSize.x / b.x, this.mobile.actualSize.y / b.y);
                if (this.disableStretchToFitOnMobileFlag) {
                    var c = Math.min(this.scaleRatioMultiplier.x, this.scaleRatioMultiplier.y);
                    this.enableScalingLimitsOnMobileFlag && (c = c.limit(this.minScalingOnMobile, this.maxScalingOnMobile));
                    this.mobile.actualSize.x = b.x * c;
                    this.mobile.actualSize.y = b.y * c;
                    this.scaleRatioMultiplier.x = c;
                    this.scaleRatioMultiplier.y = c
                } else this.sizeRatio.x = this.scaleRatioMultiplier.x, this.sizeRatio.y = this.scaleRatioMultiplier.y, this.scaleRatioMultiplier.x = 1, this.scaleRatioMultiplier.y = 1
            } else this.desktop.actualSize = new Vector2(window.innerWidth, window.innerHeight), b = new Vector2(this.desktop.actualResolution.x, this.desktop.actualResolution.y), this.scaleRatioMultiplier = new Vector2(this.desktop.actualSize.x / b.x, this.desktop.actualSize.y / b.y), this.enableStretchToFitOnDesktopFlag ? (this.sizeRatio.x = this.scaleRatioMultiplier.x, this.sizeRatio.y = this.scaleRatioMultiplier.y, this.scaleRatioMultiplier.x = 1, this.scaleRatioMultiplier.y = 1) : (c = Math.min(this.scaleRatioMultiplier.x, this.scaleRatioMultiplier.y), this.enableScalingLimitsOnDesktopFlag && (c = c.limit(this.minScalingOnDesktop, this.maxScalingOnDesktop)), this.desktop.actualSize.x = b.x * c, this.desktop.actualSize.y = b.y * c, this.scaleRatioMultiplier.x = c, this.scaleRatioMultiplier.y = c)
        },
        resizeLayers: function() {
            for (var b = 0; b < this.coreDivsToResize.length; b++) {
                var c = ig.domHandler.getElementById(this.coreDivsToResize[b]);
                if (ig.ua.mobile)
                    if (this.disableStretchToFitOnMobileFlag) {
                        var d = Math.floor(ig.sizeHandler.windowSize.x / 2 - ig.sizeHandler.mobile.actualSize.x / 2),
                            f = Math.floor(ig.sizeHandler.windowSize.y / 2 - ig.sizeHandler.mobile.actualSize.y / 2);
                        0 > d && (d = 0);
                        0 > f && (f = 0);
                        ig.domHandler.resizeOffset(c, Math.floor(ig.sizeHandler.mobile.actualSize.x), Math.floor(ig.sizeHandler.mobile.actualSize.y), d, f);
                        var e = !1;
                        if (this.portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth)
                            if (this.enableStretchToFitOnAntiPortraitModeFlag) ig.domHandler.resizeOffset(c, Math.floor(window.innerWidth), Math.floor(window.innerHeight), 0, 0);
                            else {
                                var e = new Vector2(window.innerWidth / this.mobile.actualResolution.y, window.innerHeight / this.mobile.actualResolution.x),
                                    d = Math.min(e.x, e.y),
                                    e = this.mobile.actualResolution.y * d,
                                    g = this.mobile.actualResolution.x * d,
                                    d = Math.floor(ig.sizeHandler.windowSize.x / 2 - e / 2),
                                    f = Math.floor(ig.sizeHandler.windowSize.y / 2 - g / 2);
                                0 > d && (d = 0);
                                0 > f && (f = 0);
                                ig.domHandler.resizeOffset(c, Math.floor(e), Math.floor(g), d, f)
                            }
                    } else ig.domHandler.resize(c, Math.floor(ig.sizeHandler.mobile.actualSize.x), Math.floor(ig.sizeHandler.mobile.actualSize.y));
                else this.enableStretchToFitOnDesktopFlag ? ig.domHandler.resize(c, Math.floor(ig.sizeHandler.desktop.actualSize.x), Math.floor(ig.sizeHandler.desktop.actualSize.y)) : (d = Math.floor(ig.sizeHandler.windowSize.x / 2 - ig.sizeHandler.desktop.actualSize.x / 2), f = Math.floor(ig.sizeHandler.windowSize.y / 2 - ig.sizeHandler.desktop.actualSize.y / 2), 0 > d && (d = 0), 0 > f && (f = 0), ig.domHandler.resizeOffset(c, Math.floor(ig.sizeHandler.desktop.actualSize.x), Math.floor(ig.sizeHandler.desktop.actualSize.y), d, f))
            }
            var b = ig.domHandler.getElementById("#canvas"),
                c = ig.domHandler.getOffsets(b),
                b = c.left,
                c = c.top,
                e = Math.min(ig.sizeHandler.scaleRatioMultiplier.x, ig.sizeHandler.scaleRatioMultiplier.y),
                m;
            for (m in this.dynamicClickableEntityDivs) {
                d = ig.domHandler.getElementById("#" + m);
                if (ig.ua.mobile) {
                    var g = this.dynamicClickableEntityDivs[m].entity_pos_x,
                        p = this.dynamicClickableEntityDivs[m].entity_pos_y,
                        j = this.dynamicClickableEntityDivs[m].width,
                        f = this.dynamicClickableEntityDivs[m].height;
                    this.disableStretchToFitOnMobileFlag ? (g = Math.floor(b + g * this.scaleRatioMultiplier.x) + "px", p = Math.floor(c + p * this.scaleRatioMultiplier.y) + "px", j = Math.floor(j * this.scaleRatioMultiplier.x) + "px", f = Math.floor(f * this.scaleRatioMultiplier.y) + "px") : (g = Math.floor(g * this.sizeRatio.x) + "px", p = Math.floor(p * this.sizeRatio.y) + "px", j = Math.floor(j * this.sizeRatio.x) + "px", f = Math.floor(f * this.sizeRatio.y) + "px")
                } else g = this.dynamicClickableEntityDivs[m].entity_pos_x, p = this.dynamicClickableEntityDivs[m].entity_pos_y, j = this.dynamicClickableEntityDivs[m].width, f = this.dynamicClickableEntityDivs[m].height, this.enableStretchToFitOnDesktopFlag ? (g = Math.floor(g * this.sizeRatio.x) + "px", p = Math.floor(p * this.sizeRatio.y) + "px", j = Math.floor(j * this.sizeRatio.x) + "px", f = Math.floor(f * this.sizeRatio.y) + "px") : (g = Math.floor(b + g * this.scaleRatioMultiplier.x) + "px", p = Math.floor(c + p * this.scaleRatioMultiplier.y) + "px", j = Math.floor(j * this.scaleRatioMultiplier.x) + "px", f = Math.floor(f * this.scaleRatioMultiplier.y) + "px");
                ig.domHandler.css(d, {
                    "float": "left",
                    position: "absolute",
                    left: g,
                    top: p,
                    width: j,
                    height: f,
                    "z-index": 3
                });
                this.dynamicClickableEntityDivs[m]["font-size"] && ig.domHandler.css(d, {
                    "font-size": this.dynamicClickableEntityDivs[m]["font-size"] * e + "px"
                })
            }
            $("#xloader").width(this.windowSize.x);
            $("#xloader").height(this.windowSize.y)
        },
        resize: function() {
            this.sizeCalcs();
            this.resizeLayers()
        },
        reorient: function() {
            if (ig.ua.mobile) {
                var b = !1,
                    b = this.portraitMode ? window.innerHeight < window.innerWidth : window.innerHeight > window.innerWidth,
                    c = this.domHandler.getElementById("#orientate"),
                    d = this.domHandler.getElementById("#game");
                b ? (this.domHandler.show(c), this.domHandler.hide(d)) : (this.domHandler.show(d), this.domHandler.hide(c))
            }
            this.resize()
        },
        samsungFix: function() {
            ig.ua.android && !(4.2 > parseFloat(navigator.userAgent.slice(navigator.userAgent.indexOf("Android") + 8, navigator.userAgent.indexOf("Android") + 11))) && (!(0 > navigator.userAgent.indexOf("GT")) && !(0 < navigator.userAgent.indexOf("Chrome")) && !(0 < navigator.userAgent.indexOf("Firefox"))) && (document.addEventListener("touchstart", function(b) {
                b.preventDefault();
                return !1
            }, !1), document.addEventListener("touchmove", function(b) {
                b.preventDefault();
                return !1
            }, !1), document.addEventListener("touchend", function(b) {
                b.preventDefault();
                return !1
            }, !1))
        },
        orientationInterval: null,
        orientationTimeout: null,
        orientationHandler: function() {
            this.reorient();
            window.scrollTo(0, 1)
        },
        orientationDelayHandler: function() {
            null == this.orientationInterval && (this.orientationInterval = window.setInterval(this.orientationHandler.bind(this), 100));
            null == this.orientationTimeout && (this.orientationTimeout = window.setTimeout(function() {
                this.clearAllIntervals()
            }.bind(this), 2E3))
        },
        clearAllIntervals: function() {
            window.clearInterval(this.orientationInterval);
            this.orientationInterval = null;
            window.clearTimeout(this.orientationTimeout);
            this.orientationTimeout = null
        },
        eventListenerSetup: function() {
            ig.ua.iOS ? (window.addEventListener("orientationchange", this.orientationDelayHandler.bind(this)), window.addEventListener("resize", this.orientationDelayHandler.bind(this))) : (window.addEventListener("orientationchange", this.orientationHandler.bind(this)), window.addEventListener("resize", this.orientationHandler.bind(this)));
            document.ontouchmove = function(b) {
                window.scrollTo(0, 1);
                b.preventDefault()
            };
            this.chromePullDownRefreshFix()
        },
        chromePullDownRefreshFix: function() {
            var b = window.chrome || navigator.userAgent.match("CriOS"),
                c = "ontouchstart" in document.documentElement;
            if (b && c) {
                var d = b = !1,
                    f = 0,
                    e = !1;
                try {
                    CSS.supports("overscroll-behavior-y", "contain") && (b = !0)
                } catch (g) {}
                try {
                    if (b) return document.body.style.overscrollBehaviorY = "contain"
                } catch (m) {}
                b = document.head || document.body;
                c = document.createElement("style");
                c.type = "text/css";
                c.styleSheet ? c.styleSheet.cssText = "\n      ::-webkit-scrollbar {\n        width: 500x;\n      }\n      ::-webkit-scrollbar-thumb {\n        border-radius: 500px;\n        background-color: rgba(0, 0, 0, 0.2);\n      }\n      body {\n        -webkit-overflow-scrolling: auto!important;\n      }\n    " : c.appendChild(document.createTextNode("\n      ::-webkit-scrollbar {\n        width: 500px;\n      }\n      ::-webkit-scrollbar-thumb {\n        border-radius: 500px;\n        background-color: rgba(0, 0, 0, 0.2);\n      }\n      body {\n        -webkit-overflow-scrolling: auto!important;\n      }\n    "));
                b.appendChild(c);
                try {
                    addEventListener("test", null, {
                        get passive() {
                            d = !0
                        }
                    })
                } catch (p) {}
                document.addEventListener("touchstart", function(b) {
                    1 === b.touches.length && (f = b.touches[0].clientY, e = 0 === window.pageYOffset)
                }, !!d && {
                    passive: !0
                });
                document.addEventListener("touchmove", function(b) {
                    var c;
                    if (c = e) {
                        e = !1;
                        c = b.touches[0].clientY;
                        var d = c - f;
                        c = (f = c, 0 < d)
                    }
                    if (c) return b.preventDefault()
                }, !!d && {
                    passive: !1
                })
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.sound-player").defines(function() {
    SoundPlayer = ig.Class.extend({
        tagName: "SoundPlayer",
        stayMuteFlag: !1,
        debug: !1,
        init: function() {
            this.debug && console.log(this.tagName)
        },
        play: function(b) {
            this.debug && console.log("play sound ", b)
        },
        stop: function() {
            this.debug && console.log("stop sound ")
        },
        volume: function() {
            this.debug && console.log("set volume")
        },
        mute: function(b) {
            this.debug && console.log("mute");
            "undefined" === typeof b ? this.stayMuteFlag = !0 : b && (this.stayMuteFlag = !0)
        },
        unmute: function(b) {
            this.debug && console.log("unmute");
            "undefined" === typeof b ? this.stayMuteFlag = !1 : b && (this.stayMuteFlag = !1)
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.impact-music-player").requires("plugins.audio.sound-player").defines(function() {
    ImpactMusicPlayer = SoundPlayer.extend({
        tagName: "ImpactMusicPlayer",
        bgmPlaying: !1,
        soundList: {},
        init: function(b, c) {
            this.parent(b, c);
            for (var d in b) this.soundList[d] = d, ig.music.add(b[d].path + ".*", d);
            c && c.loop && (ig.music.loop = c.loop)
        },
        play: function(b) {
            this.stayMuteFlag || (this.bgmPlaying = !0, "undefined" === typeof b ? ig.music.play(b) : ig.music.play())
        },
        stop: function() {
            this.bgmPlaying = !1;
            ig.music.pause()
        },
        volume: function(b) {
            console.log("impactmusic:", b);
            ig.music.volume = 0 > b ? 0 : isNaN(b) ? 1 : 1 < b ? 1 : b
        },
        getVolume: function() {
            return ig.music.volume
        },
        mute: function(b) {
            this.parent(b);
            this.bgmPlaying && this.stop()
        },
        unmute: function(b) {
            this.parent(b);
            this.play()
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.impact-sound-player").requires("plugins.audio.sound-player").defines(function() {
    ImpactSoundPlayer = SoundPlayer.extend({
        tagName: "ImpactSoundPlayer",
        soundList: {},
        init: function(b, c) {
            this.parent(b, c);
            for (var d in b) {
                var f = new ig.Sound(b[d].path + ".*");
                this.soundList[d] = f
            }
        },
        play: function(b) {
            this.stayMuteFlag || ("object" === typeof b ? (console.log(b + " exists"), b.play()) : "string" === typeof b && this.soundList[b].play())
        },
        stop: function(b) {
            this.parent(b);
            b.stop()
        },
        volume: function(b) {
            ig.soundManager.volume = 0 > b ? 0 : isNaN(b) ? 1 : 1 < b ? 1 : b
        },
        getVolume: function() {
            return ig.soundManager.volume
        },
        mute: function(b) {
            this.parent(b);
            ig.Sound.enabled = !1
        },
        unmute: function(b) {
            this.parent(b);
            ig.Sound.enabled = !0
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.howler-player").requires("plugins.audio.sound-player").defines(function() {
    HowlerPlayer = SoundPlayer.extend({
        tagName: "HowlerPlayer",
        soundList: {},
        init: function(b, c) {
            this.parent(b, c);
            for (var d in b) {
                var f = b[d].path,
                    f = new Howl({
                        src: [f + "." + ig.Sound.FORMAT.OGG.ext, f + "." + ig.Sound.FORMAT.MP3.ext]
                    });
                this.soundList[d] = f
            }
        },
        play: function(b) {
            Howler.ctx && "running" !== Howler.ctx.state || this.stayMuteFlag || ("object" === typeof b ? b.play() : "string" === typeof b && this.soundList[b].play())
        },
        stop: function(b) {
            this.parent(b);
            "object" === typeof b ? b.stop() : "string" === typeof b && this.soundList[b].stop()
        },
        volume: function(b) {
            for (var c in this.soundList) {
                if (0 > b) {
                    this.soundList[c].volume(0);
                    break
                }
                isNaN(b) ? this.soundList[c].volume(1) : 1 < b ? this.soundList[c].volume(1) : this.soundList[c].volume(b)
            }
        },
        getVolume: function() {
            for (var b in this.soundList) return this.soundList[b].volume()
        },
        mute: function(b) {
            this.parent(b);
            Howler.mute(!0)
        },
        unmute: function(b) {
            this.parent(b);
            Howler.mute(!1)
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.howler-music-player").requires("plugins.audio.sound-player").defines(function() {
    HowlerMusicPlayer = SoundPlayer.extend({
        tagName: "HowlerMusicPlayer",
        bgmPlaying: !1,
        soundList: {},
        init: function(b, c) {
            this.parent(b, c);
            for (var d in b) {
                var f = b[d].path,
                    f = new Howl({
                        src: [f + "." + ig.Sound.FORMAT.OGG.ext, f + "." + ig.Sound.FORMAT.MP3.ext],
                        loop: !0,
                        autoplay: !1,
                        onend: function() {}.bind(this)
                    });
                this.soundList[d] = f
            }
        },
        play: function(b) {
            if (!this.stayMuteFlag && !this.bgmPlaying)
                if ("object" === typeof b) this.bgmPlaying = !0, b.play();
                else if ("string" === typeof b) this.bgmPlaying = !0, this.soundList[b].play();
            else
                for (var c in this.soundList) {
                    this.soundList[c].play();
                    this.bgmPlaying = !0;
                    break
                }
        },
        stop: function(b) {
            this.parent(b);
            if (this.bgmPlaying) {
                for (var c in this.soundList) this.soundList[c].stop();
                this.bgmPlaying = !1
            }
        },
        volume: function(b) {
            console.log("howler", b);
            for (var c in this.soundList) {
                if (0 > b) {
                    this.soundList[c].volume(0);
                    break
                }
                isNaN(b) ? this.soundList[c].volume(1) : 1 < b ? this.soundList[c].volume(1) : this.soundList[c].volume(b)
            }
        },
        getVolume: function() {
            for (var b in this.soundList) return this.soundList[b].volume()
        },
        mute: function(b) {
            this.parent(b);
            Howler.mute(!0)
        },
        unmute: function(b) {
            this.parent(b);
            Howler.mute(!1)
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.jukebox-player").requires("plugins.audio.sound-player").defines(function() {
    JukeboxPlayer = SoundPlayer.extend({
        tagName: "JukeboxPlayer",
        bgmPlaying: !1,
        soundList: {},
        jukeboxPlayer: null,
        pausePosition: 0,
        premuteVolume: 0,
        minVolume: 0.001,
        init: function(b, c) {
            this.parent(b, c);
            for (var d in b) {
                this.soundList[d] = d;
                var f = b[d].path;
                this.jukeboxPlayer = new jukebox.Player({
                    resources: [f + "." + ig.Sound.FORMAT.OGG.ext, f + "." + ig.Sound.FORMAT.MP3.ext],
                    autoplay: !1,
                    spritemap: {
                        music: {
                            start: b[d].startMp3,
                            end: b[d].endMp3,
                            loop: !0
                        }
                    }
                })
            }
        },
        play: function() {
            this.stayMuteFlag || (this.bgmPlaying = !0, this.pausePosition ? (console.log("resume"), this.jukeboxPlayer.resume(this.pausePosition)) : (console.log("play"), this.jukeboxPlayer.play(this.jukeboxPlayer.settings.spritemap.music.start, !0)), this.premuteVolume = this.getVolume())
        },
        stop: function() {
            this.bgmPlaying = !1;
            this.pausePosition = this.jukeboxPlayer.pause()
        },
        volume: function(b) {
            console.log("jukebox:", b);
            0 >= b ? this.jukeboxPlayer.setVolume(this.minVolume) : isNaN(b) ? this.jukeboxPlayer.setVolume(1) : 1 < b ? this.jukeboxPlayer.setVolume(1) : this.jukeboxPlayer.setVolume(b)
        },
        getVolume: function() {
            return this.jukeboxPlayer.getVolume()
        },
        mute: function(b) {
            this.parent(b);
            this.bgmPlaying && (console.log("jukebox", this.premuteVolume), this.stayMuteFlag || (this.premuteVolume = this.getVolume()), this.jukeboxPlayer.pause(), this.jukeboxPlayer.setVolume(this.minVolume))
        },
        unmute: function(b) {
            this.parent(b);
            this.stayMuteFlag || (console.log("jukebox", this.premuteVolume), this.jukeboxPlayer.setVolume(this.premuteVolume), this.jukeboxPlayer.resume())
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.webaudio-music-player").requires("plugins.audio.sound-player").defines(function() {
    WebaudioMusicPlayer = SoundPlayer.extend({
        tagName: "WebaudioMusicPlayer",
        bgmPlaying: !1,
        isSupported: !1,
        muteFlag: !1,
        pausedTime: 0,
        webaudio: null,
        useHTML5Audio: !1,
        audio: null,
        inactiveAudio: null,
        codecs: null,
        reinitOnPlay: !1,
        inputList: null,
        _volume: 1,
        soundList: {},
        init: function(b) {
            this.webaudio = {
                compatibility: {},
                gainNode: null,
                buffer: null,
                source_loop: {},
                source_once: {}
            };
            try {
                Howler && Howler.ctx ? this.webaudio.context = Howler.ctx : ig && ig.webaudio_ctx ? this.webaudio.context = ig.webaudio_ctx : (this.AudioContext = window.AudioContext || window.webkitAudioContext, this.webaudio.context = new this.AudioContext, ig.webaudio_ctx = this.webaudio.context), this.isSupported = !0
            } catch (c) {
                console.log("Web Audio API not supported in this browser."), this.webaudio = null, this.useHTML5Audio = !0
            }
            if (this.useHTML5Audio)
                if ("undefined" !== typeof Audio) try {
                    new Audio
                } catch (d) {
                    this.useHTML5Audio = !1
                } else this.useHTML5Audio = !1;
            this.useHTML5Audio && (this.audio = new Audio, this.isSupported = !0, this.initHTML5Audio(b));
            if (!this.isSupported) return null;
            this.webaudio && (this.inputList = b, this.initWebAudio(b))
        },
        initWebAudio: function(b) {
            ig.ua.iOS && this.initIOSWebAudioUnlock();
            this.webaudio.gainNode = this.webaudio.context.createGain();
            this.webaudio.gainNode.connect(this.webaudio.context.destination);
            this.webaudio.gainNode.gain.value = this._volume;
            this.webaudio.buffer = null;
            var c = "start",
                d = "stop",
                f = this.webaudio.context.createBufferSource();
            "function" !== typeof f.start && (c = "noteOn");
            this.webaudio.compatibility.start = c;
            "function" !== typeof f.stop && (d = "noteOff");
            this.webaudio.compatibility.stop = d;
            for (var e in b) {
                this.soundList[e] = e;
                var d = b[e].path,
                    c = d + "." + ig.Sound.FORMAT.MP3.ext,
                    g = d + "." + ig.Sound.FORMAT.OGG.ext;
                ig.ua.mobile ? ig.ua.iOS && (g = c) : (d = navigator.userAgent.toLowerCase(), -1 != d.indexOf("safari") && -1 >= d.indexOf("chrome") && (g = c), d.indexOf("win64") && (g = c));
                var m = new XMLHttpRequest;
                m.open("GET", g, !0);
                m.responseType = "arraybuffer";
                m.onload = function() {
                    this.webaudio.context.decodeAudioData(m.response, function(b) {
                        this.webaudio.buffer = b;
                        this.webaudio.source_loop = {};
                        this.bgmPlaying ? this.play(null, !0) : this.stop()
                    }.bind(this), function() {
                        console.log('Error decoding audio "' + g + '".')
                    })
                }.bind(this);
                m.send();
                if (4 == m.readyState && "undefined" !== typeof Audio) {
                    this.useHTML5Audio = !0;
                    try {
                        new Audio
                    } catch (p) {
                        this.useHTML5Audio = !1
                    }
                    this.useHTML5Audio && (console.log("Using HTML5 Audio"), this.webaudio = null, this.audio = new Audio, this.isSupported = !0, this.initHTML5Audio(b))
                }
                break
            }
        },
        initIOSWebAudioUnlock: function() {
            if (this.webaudio) {
                webaudio = this.webaudio;
                var b = function() {
                    var c = webaudio.context,
                        d = c.createBuffer(1, 1, 22050),
                        f = c.createBufferSource();
                    f.buffer = d;
                    f.connect(c.destination);
                    "undefined" === typeof f.start ? f.noteOn(0) : f.start(0);
                    setTimeout(function() {
                        (f.playbackState === f.PLAYING_STATE || f.playbackState === f.FINISHED_STATE) && window.removeEventListener("touchend", b, !1)
                    }.bind(this), 0)
                };
                window.addEventListener("touchend", b, !1)
            }
        },
        initHTML5Audio: function(b) {
            if (this.useHTML5Audio && this.audio) {
                var c = this.audio;
                this.codecs = {};
                this.codecs = {
                    mp3: !!c.canPlayType("audio/mpeg;").replace(/^no$/, ""),
                    opus: !!c.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/, ""),
                    ogg: !!c.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""),
                    wav: !!c.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""),
                    aac: !!c.canPlayType("audio/aac;").replace(/^no$/, ""),
                    m4a: !!(c.canPlayType("audio/x-m4a;") || c.canPlayType("audio/m4a;") || c.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    mp4: !!(c.canPlayType("audio/x-mp4;") || c.canPlayType("audio/mp4;") || c.canPlayType("audio/aac;")).replace(/^no$/, ""),
                    weba: !!c.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/, "")
                };
                this.is = {
                    ff: Boolean(null != window.mozInnerScreenX && /firefox/.test(navigator.userAgent.toLowerCase())),
                    ie: Boolean(document.all && !window.opera),
                    opera: Boolean(window.opera),
                    chrome: Boolean(window.chrome),
                    safari: Boolean(!window.chrome && /safari/.test(navigator.userAgent.toLowerCase()) && window.getComputedStyle && !window.globalStorage && !window.opera)
                };
                this.playDelay = -60;
                this.stopDelay = 30;
                this.is.chrome && (this.playDelay = -25);
                this.is.chrome && (this.stopDelay = 25);
                this.is.ff && (this.playDelay = -25);
                this.is.ff && (this.stopDelay = 85);
                this.is.opera && (this.playDelay = 5);
                this.is.opera && (this.stopDelay = 0);
                for (var d in b) {
                    this.soundList[d] = d;
                    var f = b[d].path,
                        c = f + "." + ig.Sound.FORMAT.OGG.ext,
                        f = f + "." + ig.Sound.FORMAT.MP3.ext,
                        e = null;
                    this.codecs[ig.Sound.FORMAT.OGG.ext.toLowerCase()] ? e = c : this.codecs[ig.Sound.FORMAT.MP3.ext.toLowerCase()] && (e = f);
                    if (e) {
                        ig.ua.mobile ? ig.ua.iOS && (e = f) : (b = navigator.userAgent.toLowerCase(), -1 != b.indexOf("safari") && -1 >= b.indexOf("chrome") && (e = f));
                        this.audio.addEventListener("error", function() {
                            this.audio.error && 4 === this.audio.error.code && (this.isSupported = !1)
                        }, !1);
                        this.audio.src = e;
                        this.audio._pos = 0;
                        this.audio.preload = "auto";
                        this.audio.volume = this._volume;
                        this.inactiveAudio = new Audio;
                        this.inactiveAudio.src = e;
                        this.inactiveAudio._pos = 0;
                        this.inactiveAudio.preload = "auto";
                        this.inactiveAudio.volume = this._volume;
                        this.inactiveAudio.load();
                        var g = function() {
                            this._duration = this.audio.duration;
                            this._loaded || (this._loaded = !0);
                            this.bgmPlaying ? this.play(null, !0) : this.stop();
                            this.audio.removeEventListener("canplaythrough", g, !1)
                        }.bind(this);
                        this.audio.addEventListener("canplaythrough", g, !1);
                        this.audio.load();
                        break
                    }
                }
            }
        },
        play: function(b, c) {
            if (this.isSupported)
                if (this.bgmPlaying = !0, this.webaudio) {
                    if (!c && this.reinitOnPlay && this.webaudio.source_loop.buffer == this.webaudio.buffer) {
                        if (this.webaudio.source_loop._playing && (this.webaudio.source_loop[this.webaudio.compatibility.stop](0), this.webaudio.source_loop._playing = !1, this.pausedTime += this.webaudio.context.currentTime - this.webaudio.source_loop._startTime, this.pausedTime %= this.webaudio.source_loop.buffer.duration, this.webaudio.source_loop._startTime = 0, "noteOn" === this.webaudio.compatibility.start)) this.webaudio.source_once[this.webaudio.compatibility.stop](0);
                        try {
                            this.webaudio.context.close();
                            this.webaudio.context = new this.AudioContext;
                            this.webaudio.gainNode = this.webaudio.context.createGain();
                            this.webaudio.gainNode.connect(this.webaudio.context.destination);
                            this.webaudio.gainNode.gain.value = this._volume;
                            var d = "start",
                                f = "stop",
                                e = this.webaudio.context.createBufferSource();
                            "function" !== typeof e.start && (d = "noteOn");
                            this.webaudio.compatibility.start = d;
                            "function" !== typeof e.stop && (f = "noteOff");
                            this.webaudio.compatibility.stop = f;
                            this.webaudio.source_loop = {};
                            this.play(null, !0)
                        } catch (g) {}
                    }
                    if (this.webaudio.buffer) {
                        if (!this.muteFlag && (this.bgmPlaying = !0, !this.webaudio.source_loop._playing)) {
                            this.webaudio.source_loop = this.webaudio.context.createBufferSource();
                            this.webaudio.source_loop.buffer = this.webaudio.buffer;
                            this.webaudio.source_loop.loop = !0;
                            this.webaudio.source_loop.connect(this.webaudio.gainNode);
                            if (null == b || isNaN(b)) b = 0, this.pausedTime && (b = this.pausedTime);
                            this.webaudio.source_loop._startTime = this.webaudio.context.currentTime;
                            if ("noteOn" === this.webaudio.compatibility.start) this.webaudio.source_once = this.webaudio.context.createBufferSource(), this.webaudio.source_once.buffer = this.webaudio.buffer, this.webaudio.source_once.connect(this.webaudio.gainNode), this.webaudio.source_once.noteGrainOn(0, b, this.webaudio.buffer.duration - b), this.webaudio.source_loop[this.webaudio.compatibility.start](this.webaudio.context.currentTime + (this.webaudio.buffer.duration - b));
                            else this.webaudio.source_loop[this.webaudio.compatibility.start](0, b);
                            this.webaudio.source_loop._playing = !0
                        }
                    } else this.bgmPlaying = !0
                } else if (this.audio) {
                var m = this.audio;
                if (!this.muteFlag)
                    if (this.bgmPlaying = !0, isNaN(b) && (b = 0, this.pausedTime && (b = this.pausedTime)), d = this._duration - b, this._onEndTimer && (clearTimeout(this._onEndTimer), this._onEndTimer = null), this._onEndTimer = setTimeout(function() {
                            this.audio.currentTime = 0;
                            this.audio.pause();
                            this.pausedTime = 0;
                            if (this.inactiveAudio) {
                                var b = this.audio;
                                this.audio = this.inactiveAudio;
                                this.inactiveAudio = b
                            }
                            this.play()
                        }.bind(this), 1E3 * d + this.playDelay), 4 === m.readyState || !m.readyState && navigator.isCocoonJS) m.readyState = 4, m.currentTime = b, m.muted = this.muteFlag || m.muted, m.volume = this._volume, setTimeout(function() {
                        m.play()
                    }, 0);
                    else {
                        clearTimeout(this._onEndTimer);
                        this._onEndTimer = null;
                        var p = function() {
                            typeof("function" == this.play) && (this.play(), m.removeEventListener("canplaythrough", p, !1))
                        }.bind(this);
                        m.addEventListener("canplaythrough", p, !1)
                    }
            }
        },
        stop: function() {
            this.bgmPlaying = !1;
            if (this.isSupported)
                if (this.webaudio) {
                    if (this.webaudio.source_loop._playing && (this.webaudio.source_loop[this.webaudio.compatibility.stop](0), this.webaudio.source_loop._playing = !1, this.pausedTime += this.webaudio.context.currentTime - this.webaudio.source_loop._startTime, this.pausedTime %= this.webaudio.source_loop.buffer.duration, this.webaudio.source_loop._startTime = 0, "noteOn" === this.webaudio.compatibility.start)) this.webaudio.source_once[this.webaudio.compatibility.stop](0)
                } else if (this.audio) {
                var b = this.audio;
                4 == b.readyState && (this.pausedTime = b.currentTime, b.currentTime = 0, b.pause(), clearTimeout(this._onEndTimer), this._onEndTimer = null)
            }
        },
        volume: function(b) {
            if (isNaN(b) || null == b) return this.getVolume();
            this.isSupported && (this._volume = b, 0 > this._volume ? this._volume = 0 : 1 < this._volume && (this._volume = 1), this.webaudio ? this.webaudio.gainNode && (this.webaudio.gainNode.gain.value = this._volume) : this.audio && (this.audio.volume = this._volume, this.inactiveAudio && (this.inactiveAudio.volume = this._volume)))
        },
        getVolume: function() {
            return !this.isSupported ? 0 : this._volume
        },
        mute: function(b) {
            this.parent(b);
            !1 == this.muteFlag && (this.muteFlag = !0, this.bgmPlaying && (this.stop(), this.bgmPlaying = !0))
        },
        unmute: function(b) {
            this.parent(b);
            !this.stayMuteFlag && !0 == this.muteFlag && (this.muteFlag = !1, this.bgmPlaying && this.play())
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.sound-info").defines(function() {
    SoundInfo = ig.Class.extend({
        FORMATS: {
            OGG: ".ogg",
            MP3: ".mp3"
        },
        sfx: {
            button: {
                path: "media/audio/sfx/button"
            },
            staticSound: {
                path: "media/audio/sfx/static"
            },
            items: {
                path: "media/audio/sfx/items"
            },
            lose: {
                path: "media/audio/sfx/fail"
            },
            win: {
                path: "media/audio/sfx/win"
            },
            beep: {
                path: "media/audio/sfx/beep"
            },
            mouseTrail: {
                path: "media/audio/sfx/mouse-trail"
            },
            bomb: {
                path: "media/audio/sfx/bomb"
            },
            explode: {
                path: "media/audio/sfx/explode"
            }
        },
        bgm: {
            background: {
                path: "media/audio/bgm",
                startOgg: 0,
                endOgg: 21.463,
                startMp3: 0,
                endMp3: 21.463
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.audio.sound-handler").requires("plugins.audio.impact-music-player", "plugins.audio.impact-sound-player", "plugins.audio.howler-player", "plugins.audio.howler-music-player", "plugins.audio.jukebox-player", "plugins.audio.webaudio-music-player", "plugins.audio.sound-info").defines(function() {
    ig.SoundHandler = ig.Class.extend({
        bgmPlayer: null,
        sfxPlayer: null,
        focusBlurMute: !1,
        soundInfo: new SoundInfo,
        init: function() {
            this.initWindowHandler();
            ig.ua.mobile ? (this.initPowerButtonFix(), this.bgmPlayer = new WebaudioMusicPlayer(this.soundInfo.bgm, {
                loop: !0
            }), this.bgmPlayer.isSupported || (this.bgmPlayer = new JukeboxPlayer(this.soundInfo.bgm, {
                loop: !0
            }))) : (this.bgmPlayer = new WebaudioMusicPlayer(this.soundInfo.bgm, {
                loop: !0
            }), this.bgmPlayer.isSupported || (this.bgmPlayer = new ImpactMusicPlayer(this.soundInfo.bgm, {
                loop: !0
            })));
            this.sfxPlayer = new HowlerPlayer(this.soundInfo.sfx)
        },
        checkBGM: function() {
            return this.bgmPlayer.stayMuteFlag
        },
        checkSFX: function() {
            return this.sfxPlayer.stayMuteFlag
        },
        muteSFX: function(b) {
            this.sfxPlayer && this.sfxPlayer.mute(b)
        },
        muteBGM: function(b) {
            this.bgmPlayer && this.bgmPlayer.mute(b)
        },
        unmuteSFX: function(b) {
            this.sfxPlayer && this.sfxPlayer.unmute(b)
        },
        unmuteBGM: function(b) {
            this.bgmPlayer && this.bgmPlayer.unmute(b)
        },
        muteAll: function(b) {
            this.muteSFX(b);
            this.muteBGM(b)
        },
        unmuteAll: function(b) {
            this.unlockWebAudio();
            this.unmuteSFX(b);
            this.unmuteBGM(b)
        },
        forceMuteAll: function() {
            this.focusBlurMute || this.muteAll(!1);
            this.focusBlurMute = !0
        },
        forceUnMuteAll: function() {
            if ((!ig.game || !ig.game.adShown) && this.focusBlurMute) this.unmuteAll(!1),
                this.focusBlurMute = !1
        },
        initWindowHandler: function() {
            "true" === ig.domHandler.getQueryVariable("webview") ? ($(window).focus(function() {
                ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.forceUnMuteAll()
            }), $(window).blur(function() {
                ig.game && ig.game.pauseGame();
                ig.soundHandler && ig.soundHandler.forceMuteAll()
            })) : (window.onfocus = function() {
                ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.forceUnMuteAll()
            }, window.onblur = function() {
                ig.game && ig.game.pauseGame();
                ig.soundHandler && ig.soundHandler.forceMuteAll()
            })
        },
        initPowerButtonFix: function() {
            var b = this.getHiddenProp();
            b && (b = b.replace(/[H|h]idden/, "") + "visibilitychange", document.addEventListener(b, this.visChange));
            window.addEventListener("pagehide", function() {
                ig.game && ig.game.pauseGame();
                ig.soundHandler && ig.soundHandler.forceMuteAll()
            }, !1);
            window.addEventListener("pageshow", function() {
                ig.game && ig.game.resumeGame();
                ig.soundHandler && ig.soundHandler.forceUnMuteAll()
            }, !1)
        },
        getHiddenProp: function() {
            var b = ["webkit", "moz", "ms", "o"];
            if ("hidden" in document) return "hidden";
            for (var c = 0; c < b.length; c++)
                if (b[c] + "Hidden" in document) return b[c] + "Hidden";
            return null
        },
        isHidden: function() {
            var b = this.getHiddenProp();
            return !b ? !1 : document[b]
        },
        visChange: function() {
            ig.soundHandler.isHidden() ? (ig.ua.mobile && ig.game && ig.game.pauseGame(), ig.soundHandler && ig.soundHandler.forceMuteAll()) : (ig.ua.mobile && ig.game && ig.game.resumeGame(), ig.soundHandler && ig.soundHandler.forceUnMuteAll())
        },
        saveVolume: function() {
            this.sfxPlayer && ig.game.io.storageSet("soundVolume", this.sfxPlayer.getVolume());
            this.bgmPlayer && ig.game.io.storageSet("musicVolume", this.bgmPlayer.getVolume())
        },
        forceLoopBGM: function() {
            var b;
            if (!this.focusBlurMute && this.bgmPlayer.bgmPlaying && this.bgmPlayer) {
                var c = this.bgmPlayer.jukeboxPlayer;
                if (c) {
                    null != window.mozInnerScreenX && /firefox/.test(navigator.userAgent.toLowerCase());
                    b = Boolean(window.chrome);
                    !window.chrome && /safari/.test(navigator.userAgent.toLowerCase());
                    var d = 0.1;
                    ig.ua.mobile && (d = 0.115, ig.ua.android && (d = 0.45, b && (d = 0.3)));
                    c.settings.spritemap.music && (b = c.settings.spritemap.music.end - d, c.getCurrentTime() >= b && (b = c.settings.spritemap.music.start, ig.ua.android ? this.forcelooped || (c.play(b, !0), this.forcelooped = !0, setTimeout(function() {
                        ig.soundHandler.forcelooped = !1
                    }, d)) : c.setCurrentTime(b)))
                } else "ImpactMusicPlayer" == this.bgmPlayer.tagName && (null != window.mozInnerScreenX && /firefox/.test(navigator.userAgent.toLowerCase()), b = Boolean(window.chrome), !window.chrome && /safari/.test(navigator.userAgent.toLowerCase()), d = 0.1, ig.ua.mobile && (d = 0.115, ig.ua.android && (d = 0.45, b && (d = 0.3))), c = 0, "mp3" == ig.soundManager.format.ext && (c = 0.05), ig.music.currentTrack && (b = ig.music.currentTrack.duration - d, ig.music.currentTrack.currentTime >= b && (ig.ua.android ? this.forcelooped || (ig.music.currentTrack.pause(), ig.music.currentTrack.currentTime = c, ig.music.currentTrack.play(), this.forcelooped = !0, setTimeout(function() {
                    ig.soundHandler.forcelooped = !1
                }, d)) : ig.music.currentTrack.currentTime = c)))
            }
        },
        unlockWebAudio: function() {
            Howler._audioUnlocked || Howler._unlockAudio();
            ig && ig.webaudio_ctx && ig.webaudio_ctx.state && "running" !== ig.webaudio_ctx.state && ig.webaudio_ctx.resume();
            this.bgmPlayer.webaudio && this.bgmPlayer.webaudio.context && this.bgmPlayer.webaudio.context.state && "running" !== this.bgmPlayer.webaudio.context.state && this.bgmPlayer.webaudio.context.resume()
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.storage").defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function() {
            return !ig.Storage.instance ? null : ig.Storage.instance
        },
        init: function() {
            ig.Storage.instance = this
        },
        isCapable: function() {
            return "undefined" !== typeof window.localStorage
        },
        isSet: function(b) {
            return null !== this.get(b)
        },
        initUnset: function(b, c) {
            null === this.get(b) && this.set(b, c)
        },
        get: function(b) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(b))
            } catch (c) {
                return window.localStorage.getItem(b)
            }
        },
        getInt: function(b) {
            return ~~this.get(b)
        },
        getFloat: function(b) {
            return parseFloat(this.get(b))
        },
        getBool: function(b) {
            return !!this.get(b)
        },
        key: function(b) {
            return this.isCapable() ? window.localStorage.key(b) : null
        },
        set: function(b, c) {
            if (!this.isCapable()) return null;
            try {
                window.localStorage.setItem(b, JSON.stringify(c))
            } catch (d) {
                console.log(d)
            }
        },
        setHighest: function(b, c) {
            c > this.getFloat(b) && this.set(b, c)
        },
        remove: function(b) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(b)
        },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear()
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.mouse").defines(function() {
    Mouse = ig.Class.extend({
        pos: new Vector2(0, 0),
        bindings: {
            click: [ig.KEY.MOUSE1]
        },
        init: function() {
            ig.input.initMouse();
            for (var b in this.bindings) {
                this[b] = b;
                for (var c = 0; c < this.bindings[b].length; c++) ig.input.bind(this.bindings[b][c], b)
            }
        },
        getPos: function() {
            this.pos.set(ig.input.mouse.x / ig.sizeHandler.sizeRatio.x / ig.sizeHandler.scaleRatioMultiplier.x, ig.input.mouse.y / ig.sizeHandler.sizeRatio.y / ig.sizeHandler.scaleRatioMultiplier.y);
            return this.pos
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.keyboard").defines(function() {
    Keyboard = ig.Class.extend({
        bindings: {
            jump: [ig.KEY.W, ig.KEY.UP_ARROW],
            moveright: [ig.KEY.D, ig.KEY.RIGHT_ARROW],
            moveleft: [ig.KEY.A, ig.KEY.LEFT_ARROW],
            shoot: [ig.KEY.S, ig.KEY.DOWN_ARROW, ig.KEY.SPACE]
        },
        init: function() {
            for (var b in this.bindings) {
                this[b] = b;
                for (var c = 0; c < this.bindings[b].length; c++) ig.input.bind(this.bindings[b][c], b)
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.gamepad-input").defines(function() {
    ig.PADKEY = {
        BUTTON_0: 0,
        PADBUTTON_1: 1,
        BUTTON_2: 2,
        BUTTON_3: 3,
        BUTTON_LEFT_BUMPER: 4,
        BUTTON_RIGHT_BUMPER: 5,
        BUTTON_LEFT_TRIGGER: 6,
        BUTTON_RIGHT_TRIGGER: 7,
        BUTTON_LEFT_JOYSTICK: 10,
        BUTTON_RIGHT_JOYSTICK: 11,
        BUTTON_DPAD_UP: 12,
        BUTTON_DPAD_DOWN: 13,
        BUTTON_DPAD_LEFT: 14,
        BUTTON_DPAD_RIGHT: 15,
        BUTTON_MENU: 16,
        AXIS_LEFT_JOYSTICK_X: 0,
        AXIS_LEFT_JOYSTICK_Y: 1,
        AXIS_RIGHT_JOYSTICK_X: 2,
        AXIS_RIGHT_JOYSTICK_Y: 3
    };
    ig.GamepadInput = ig.Class.extend({
        isInit: !1,
        isSupported: !1,
        list: [],
        bindings: {},
        states: {},
        presses: {},
        releases: {},
        downLocks: {},
        upLocks: {},
        leftStick: {
            x: 0,
            y: 0
        },
        rightStick: {
            x: 0,
            y: 0
        },
        start: function() {
            if (!this.isInit) {
                this.isInit = !0;
                var b = navigator.getGamepads || navigator.webkitGetGamepads;
                b && (!navigator.getGamepads && navigator.webkitGetGamepads && (navigator.getGamepads = navigator.webkitGetGamepads), this.list = navigator.getGamepads());
                this.isSupported = b
            }
        },
        isAvailable: function() {
            return this.isInit && this.isSupported
        },
        buttonPressed: function(b) {
            return "object" == typeof b ? b.pressed : 1 == b
        },
        buttonDown: function(b) {
            if (b = this.bindings[b]) this.states[b] = !0, this.downLocks[b] || (this.presses[b] = !0, this.downLocks[b] = !0)
        },
        buttonUp: function(b) {
            if ((b = this.bindings[b]) && this.downLocks[b] && !this.upLocks[b]) this.states[b] = !1, this.releases[b] = !0, this.upLocks[b] = !0
        },
        clearPressed: function() {
            for (var b in this.releases) this.states[b] = !1, this.downLocks[b] = !1;
            this.releases = {};
            this.presses = {};
            this.upLocks = {}
        },
        bind: function(b, c) {
            this.bindings[b] = c
        },
        unbind: function(b) {
            this.releases[this.bindings[b]] = !0;
            this.bindings[b] = null
        },
        unbindAll: function() {
            this.bindings = {};
            this.states = {};
            this.presses = {};
            this.releases = {};
            this.downLocks = {};
            this.upLocks = {}
        },
        state: function(b) {
            return this.states[b]
        },
        pressed: function(b) {
            return this.presses[b]
        },
        released: function(b) {
            return this.releases[b]
        },
        clamp: function(b, c, d) {
            return b < c ? c : b > d ? d : b
        },
        pollGamepads: function() {
            if (this.isSupported) {
                this.leftStick.x = 0;
                this.leftStick.y = 0;
                this.rightStick.x = 0;
                this.rightStick.y = 0;
                this.list = navigator.getGamepads();
                for (var b in this.bindings) {
                    for (var c = !1, d = 0; d < this.list.length; d++) {
                        var f = this.list[d];
                        if (f && f.buttons && this.buttonPressed(f.buttons[b])) {
                            c = !0;
                            break
                        }
                    }
                    c ? this.buttonDown(b) : this.buttonUp(b)
                }
                for (d = 0; d < this.list.length; d++)
                    if ((f = this.list[d]) && f.axes) {
                        b = f.axes[ig.GAMEPADINPUT.AXIS_LEFT_JOYSTICK_X];
                        var c = f.axes[ig.GAMEPADINPUT.AXIS_LEFT_JOYSTICK_Y],
                            e = f.axes[ig.GAMEPADINPUT.AXIS_RIGHT_JOYSTICK_X],
                            f = f.axes[ig.GAMEPADINPUT.AXIS_RIGHT_JOYSTICK_Y];
                        this.leftStick.x += isNaN(b) ? 0 : b;
                        this.leftStick.y += isNaN(c) ? 0 : c;
                        this.rightStick.x += isNaN(e) ? 0 : e;
                        this.rightStick.y += isNaN(f) ? 0 : f
                    }
                0 < this.list.length && (this.leftStick.x = this.clamp(this.leftStick.x, -1, 1), this.leftStick.y = this.clamp(this.leftStick.y, -1, 1), this.rightStick.x = this.clamp(this.rightStick.x, -1, 1), this.rightStick.y = this.clamp(this.rightStick.y, -1, 1))
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.gamepad").requires("plugins.io.gamepad-input").defines(function() {
    Gamepad = ig.Class.extend({
        bindings: {
            padJump: [ig.PADKEY.BUTTON_0]
        },
        init: function() {
            ig.gamepadInput.start();
            for (var b in this.bindings)
                for (var c = 0; c < this.bindings[b].length; c++) ig.gamepadInput.bind(this.bindings[b][c], b)
        },
        press: function() {},
        held: function() {},
        release: function() {}
    })
});
ig.baked = !0;
ig.module("plugins.io.multitouch").defines(function() {
    Multitouch = ig.Class.extend({
        init: function() {
            ig.multitouchInput.start()
        },
        getTouchesPos: function() {
            if (ig.ua.mobile) {
                if (0 < ig.multitouchInput.touches.length) {
                    for (var b = [], c = 0; c < ig.multitouchInput.touches.length; c++) {
                        var d = ig.multitouchInput.touches[c];
                        b.push({
                            x: d.x,
                            y: d.y
                        })
                    }
                    return b
                }
                return null
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.multitouch-input").defines(function() {
    ig.MultitouchInput = ig.Class.extend({
        isStart: !1,
        touches: [],
        multitouchCapable: !1,
        lastEventUp: null,
        start: function() {
            this.isStart || (this.isStart = !0, navigator.maxTouchPoints && 1 < navigator.maxTouchPoints && (this.multitouchCapable = !0), ig.ua.touchDevice && (window.navigator.msPointerEnabled && (ig.system.canvas.addEventListener("MSPointerDown", this.touchdown.bind(this), !1), ig.system.canvas.addEventListener("MSPointerUp", this.touchup.bind(this), !1), ig.system.canvas.addEventListener("MSPointerMove", this.touchmove.bind(this), !1), ig.system.canvas.style.msContentZooming = "none", ig.system.canvas.style.msTouchAction = "none"), ig.system.canvas.addEventListener("touchstart", this.touchdown.bind(this), !1), ig.system.canvas.addEventListener("touchend", this.touchup.bind(this), !1), ig.system.canvas.addEventListener("touchmove", this.touchmove.bind(this), !1)))
        },
        touchmove: function(b) {
            if (ig.ua.touchDevice) {
                var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                    d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                    c = ig.system.scale * (c / ig.system.realWidth),
                    d = ig.system.scale * (d / ig.system.realHeight);
                if (b.touches) {
                    for (; 0 < this.touches.length;) this.touches.pop();
                    !this.multitouchCapable && 1 < b.touches.length && (this.multitouchCapable = !0);
                    var f = {
                        left: 0,
                        top: 0
                    };
                    ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
                    for (var e = 0; e < b.touches.length; e++) {
                        var g = b.touches[e];
                        g && this.touches.push({
                            x: (g.clientX - f.left) / c,
                            y: (g.clientY - f.top) / d
                        })
                    }
                } else this.windowMove(b)
            }
        },
        touchdown: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = ig.system.scale * (d / ig.system.realHeight);
            if (window.navigator.msPointerEnabled) this.windowKeyDown(b);
            else if (ig.ua.touchDevice && b.touches) {
                for (; 0 < this.touches.length;) this.touches.pop();
                !this.multitouchCapable && 1 < b.touches.length && (this.multitouchCapable = !0);
                var f = {
                    left: 0,
                    top: 0
                };
                ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
                for (var e = 0; e < b.touches.length; e++) {
                    var g = b.touches[e];
                    g && this.touches.push({
                        x: (g.clientX - f.left) / c,
                        y: (g.clientY - f.top) / d
                    })
                }
            }
        },
        touchup: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth;
            parseInt(ig.system.canvas.offsetHeight);
            c = ig.system.scale * (c / ig.system.realWidth);
            if (window.navigator.msPointerEnabled) this.windowKeyUp(b);
            else {
                this.lastEventUp = b;
                var d = {
                    left: 0,
                    top: 0
                };
                ig.system.canvas.getBoundingClientRect && (d = ig.system.canvas.getBoundingClientRect());
                if (ig.ua.touchDevice) {
                    b = (b.changedTouches[0].clientX - d.left) / c;
                    for (c = 0; c < this.touches.length; c++) this.touches[c].x >= b - 40 && this.touches[c].x <= b + 40 && this.touches.splice(c, 1)
                }
            }
        },
        windowKeyDown: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = ig.system.scale * (d / ig.system.realHeight);
            if (window.navigator.msPointerEnabled) {
                var f = {
                    left: 0,
                    top: 0
                };
                ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
                b = b.changedTouches ? b.changedTouches : [b];
                for (var e = 0; e < b.length; ++e) {
                    for (var g = b[e], m = "undefined" != typeof g.identifier ? g.identifier : "undefined" != typeof g.pointerId ? g.pointerId : 1, p = (g.clientX - f.left) / c, g = (g.clientY - f.top) / d, j = 0; j < this.touches.length; ++j) this.touches[j].identifier == m && this.touches.splice(j, 1);
                    this.touches.push({
                        x: p,
                        y: g,
                        identifier: m
                    })
                }
                for (c = 0; c < this.touches.length; c++);
            }
        },
        windowKeyUp: function(b) {
            b = "undefined" != typeof b.identifier ? b.identifier : "undefined" != typeof b.pointerId ? b.pointerId : 1;
            for (var c = 0; c < this.touches.length; ++c) this.touches[c].identifier == b && this.touches.splice(c, 1);
            for (; 0 < this.touches.length;) this.touches.pop()
        },
        windowMove: function(b) {
            var c = parseInt(ig.system.canvas.offsetWidth) || ig.system.realWidth,
                d = parseInt(ig.system.canvas.offsetHeight) || ig.system.realHeight,
                c = ig.system.scale * (c / ig.system.realWidth),
                d = ig.system.scale * (d / ig.system.realHeight),
                f = {
                    left: 0,
                    top: 0
                };
            ig.system.canvas.getBoundingClientRect && (f = ig.system.canvas.getBoundingClientRect());
            if (window.navigator.msPointerEnabled)
                for (var e = "undefined" != typeof b.identifier ? b.identifier : "undefined" != typeof b.pointerId ? b.pointerId : 1, g = 0; g < this.touches.length; ++g)
                    if (this.touches[g].identifier == e) {
                        var m = (b.clientY - f.top) / d;
                        this.touches[g].x = (b.clientX - f.left) / c;
                        this.touches[g].y = m
                    }
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.fake-storage").requires("impact.game").defines(function() {
    ig.FakeStorage = ig.Class.extend({
        tempData: {},
        init: function() {
            ig.FakeStorage.instance = this
        },
        initUnset: function(b, c) {
            null === this.get(b) && this.set(b, c)
        },
        set: function(b, c) {
            this.tempData[b] = JSON.stringify(c)
        },
        setHighest: function(b, c) {
            c > this.getFloat(b) && this.set(b, c)
        },
        get: function(b) {
            return "undefined" == typeof this.tempData[b] ? null : JSON.parse(this.tempData[b])
        },
        getInt: function(b) {
            return ~~this.get(b)
        },
        getFloat: function(b) {
            return parseFloat(this.get(b))
        },
        getBool: function(b) {
            return !!this.get(b)
        },
        isSet: function(b) {
            return null !== this.get(b)
        },
        remove: function(b) {
            delete this.tempData[b]
        },
        clear: function() {
            this.tempData = {}
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.io-manager").requires("plugins.io.storage", "plugins.io.mouse", "plugins.io.keyboard", "plugins.io.gamepad", "plugins.io.multitouch", "plugins.io.multitouch-input", "plugins.io.gamepad-input", "plugins.io.fake-storage").defines(function() {
    IoManager = ig.Class.extend({
        storage: null,
        localStorageSupport: !1,
        mouse: null,
        keyboard: null,
        multitouch: null,
        gamepad: null,
        init: function() {
            ig.multitouchInput = new ig.MultitouchInput;
            ig.gamepadInput = new ig.GamepadInput;
            this.unbindAll();
            this.initStorage();
            this.initMouse();
            this.initKeyboard()
        },
        unbindAll: function() {
            ig.input.unbindAll();
            ig.gamepadInput.unbindAll()
        },
        initStorage: function() {
            try {
                window.localStorage.setItem("test", "test"), this.storage = new ig.Storage
            } catch (b) {
                console.log("using fake storage"), this.storage = new ig.FakeStorage
            } finally {
                window.localStorage.removeItem("test")
            }
        },
        initMouse: function() {
            this.mouse = new Mouse
        },
        initKeyboard: function() {
            this.keyboard = new Keyboard
        },
        initMultitouch: function() {
            this.multitouch = new Multitouch
        },
        initGamepad: function() {
            this.gamepad = new Gamepad
        },
        press: function(b) {
            return ig.input.pressed(b) || this.gamepad && this.gamepad.press(b) ? !0 : !1
        },
        held: function(b) {
            return ig.input.state(b) || this.gamepad && this.gamepad.state(b) ? !0 : !1
        },
        release: function(b) {
            return ig.input.released(b) || this.gamepad && this.gamepad.released(b) ? !0 : !1
        },
        getClickPos: function() {
            return this.mouse.getPos()
        },
        getTouchesPos: function() {
            return this.multitouch.getTouchesPos()
        },
        checkOverlap: function(b, c, d, f, e) {
            return b.x > c + f || b.x < c || b.y > d + e || b.y < d ? !1 : !0
        },
        _supportsLocalStorage: function() {
            try {
                return localStorage.setItem("test", "test"), localStorage.removeItem("test"), this.localStorageSupport = "localStorage" in window && null !== window.localStorage
            } catch (b) {
                return this.localStorageSupport
            }
        },
        storageIsSet: function(b) {
            return !this.localStorageSupport ? null : this.storage.isSet(b)
        },
        storageGet: function(b) {
            return !this.localStorageSupport ? null : this.storage.get(b)
        },
        storageSet: function(b, c) {
            if (!this.localStorageSupport) return null;
            this.storage.set(b, c)
        },
        assert: function(b, c, d) {
            if (c !== d) throw "actualValue:" + c + " not equal to testValue:" + d + " at " + b;
        }
    })
});
ig.baked = !0;
ig.module("plugins.io.storage-manager").requires("impact.game", "plugins.io.io-manager").defines(function() {
    ig.Game.prototype.name = "MJS-Game";
    ig.Game.prototype.version = "1.0";
    ig.Game.prototype.sessionData = {};
    ig.Game.prototype.initData = function() {
        return this.sessionData = {
            sound: 0.5,
            music: 0.5,
            level: 1,
            score: 0
        }
    };
    ig.Game.prototype.setupStorageManager = function() {
        "undefined" === typeof this.name ? console.error("Cannot found Game Name, Storage Manager Cancelled.") : "undefined" === typeof this.version ? console.error("Cannot found Game Version, Storage Manager Cancelled.") : (this.io || (this.io = new IoManager, console.log("IO Manager doesn't existed. Initialize...")), this.storage = this.io.storage, this.storageName = this.name + "-v" + this.version, this.loadAll())
    };
    ig.Game.prototype.loadAll = function() {
        var b = this.storage.get(this.storageName);
        if (null === b || "undefined" === typeof b) b = this.initData();
        for (var c in b) this.sessionData[c] = b[c];
        this.storage.set(this.storageName, b)
    };
    ig.Game.prototype.saveAll = function() {
        var b = this.storage.get(this.storageName),
            c;
        for (c in b) b[c] = this.sessionData[c];
        this.storage.set(this.storageName, b)
    };
    ig.Game.prototype.load = function(b) {
        return this.storage.get(this.storageName)[b]
    };
    ig.Game.prototype.save = function(b, c) {
        var d = this.storage.get(this.storageName);
        d[b] = c;
        this.storage.set(this.storageName, d)
    }
});
ig.baked = !0;
ig.module("plugins.splash-loader").requires("impact.loader").defines(function() {
    ig.SplashLoader = ig.Loader.extend({
        bg: new ig.Image("media/graphics/sprites/games/bg.png"),
        icon: new ig.Image("media/graphics/misc/icon.png"),
        title: new ig.Image("media/graphics/sprites/games/title.png"),
        loadingbar1: new ig.Image("media/graphics/sprites/ui/loading-bar1.png"),
        init: function(b, c) {
            this.parent(b, c)
        },
        end: function() {
            this.parent();
            this._drawStatus = 1;
            this.draw();
            // for (var b = window.location.hostname, c = [
            //         [108, 111, 99, 97,
            //             108, 104, 111, 115, 116
            //         ],
            //         [103, 97, 109, 101, 109, 111, 110, 101, 116, 105, 122, 101, 46, 99, 111, 109],
            //         [103, 97, 109, 101, 100, 105, 115, 116, 114, 105, 98, 117, 116, 105, 111, 110, 46, 99, 111, 109],
            //         [121, 97, 110, 100, 101, 120, 46, 110, 101, 116],
            //         [121, 97, 110, 100, 101, 120, 46, 99, 111, 109],
            //         [103, 97, 109, 101, 97, 114, 116, 101, 114, 46, 99, 111, 109],
            //         [112, 97, 99, 111, 103, 97, 109, 101, 115, 46, 99, 111, 109]
            //     ], d = !1, f = 0; f < c.length; f++) {
            //     var e = this.escapeRegExp(this.conte(c[f]));
            //     if (-1 < b.search(e)) {
            //         d = !0;
            //         break
            //     }
            // }
            // d && 
            ig.system.setGame(MyGame)
        },
        conte: function(b) {
            for (var c = "", d = 0; d < b.length; d++) c += String.fromCharCode(b[d]);
            return c
        },
        escapeRegExp: function(b) {
            return b.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")
        },
        draw: function() {
            this._drawStatus += (this.status - this._drawStatus) / 5;
            if (!(0.15 > this._drawStatus)) {
                ig.system.context.fillStyle = "#000";
                ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
                var b, c, d, f, e, g;
                w2 = b = this.loadingbar1.width;
                h2 = c = this.loadingbar1.height;
                d = 0.5 * ig.system.width - b / 2;
                b = (b - w2) / 2;
                c = (c - h2) / 2;
                f = 0.5 * ig.system.width - this.icon.width / 2;
                e = 0.6 * ig.system.height - this.icon.height / 2;
                g = 0.5 * ig.system.width - this.title.width / 2;
                this.bg.draw(0, 0);
                this.icon.draw(f, e + 60);
                this.title.draw(g, 0);
                0.96 <= this._drawStatus && (this._drawStatus = 1);
                ig.system.context.drawImage(this.loadingbar1.data, 0, 0, w2 * this._drawStatus, h2, d + b, 500 + c, w2 * this._drawStatus, h2)
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.tween").requires("impact.entity").defines(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        for (var c = 0; c < this.length; ++c)
            if (this[c] === b) return c;
        return -1
    });
    ig.Entity.prototype.tweens = [];
    ig.Entity.prototype._preTweenUpdate = ig.Entity.prototype.update;
    ig.Entity.prototype.update = function() {
        this._preTweenUpdate();
        if (0 < this.tweens.length) {
            for (var b = [], c = 0; c < this.tweens.length; c++) this.tweens[c].update(), this.tweens[c].complete || b.push(this.tweens[c]);
            this.tweens = b
        }
    };
    ig.Entity.prototype.tween = function(b, c, d) {
        b = new ig.Tween(this, b, c, d);
        this.tweens.push(b);
        return b
    };
    ig.Entity.prototype.pauseTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].pause()
    };
    ig.Entity.prototype.resumeTweens = function() {
        for (var b = 0; b < this.tweens.length; b++) this.tweens[b].resume()
    };
    ig.Entity.prototype.stopTweens = function(b) {
        for (var c = 0; c < this.tweens.length; c++) this.tweens[c].stop(b)
    };
    ig.Tween = function(b, c, d, f) {
        var e = {},
            g = {},
            m = {},
            p = 0,
            j = !1,
            n = !1,
            r = !1;
        this.duration = d;
        this.paused = this.complete = !1;
        this.easing = ig.Tween.Easing.Linear.EaseNone;
        this.onComplete = !1;
        this.loop = this.delay = 0;
        this.loopCount = -1;
        ig.merge(this, f);
        this.loopNum = this.loopCount;
        this.chain = function(b) {
            r = b
        };
        this.initEnd = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.initEnd(subprop, c[b], d[b])
        };
        this.initStart = function(b, c, d, e) {
            if ("object" !== typeof d[b]) "undefined" !== typeof c[b] && (e[b] = d[b]);
            else
                for (subprop in d[b]) e[b] || (e[b] = {}), "undefined" !== typeof c[b] && this.initStart(subprop, c[b], d[b], e[b])
        };
        this.start = function() {
            this.paused = this.complete = !1;
            this.loopNum = this.loopCount;
            p = 0; - 1 == b.tweens.indexOf(this) && b.tweens.push(this);
            n = !0;
            j = new ig.Timer;
            for (var d in c) this.initEnd(d, c, g);
            for (d in g) this.initStart(d, g, b, e), this.initDelta(d, m, b, g)
        };
        this.initDelta = function(b, c, d, e) {
            if ("object" !== typeof e[b]) c[b] = e[b] - d[b];
            else
                for (subprop in e[b]) c[b] || (c[b] = {}), this.initDelta(subprop, c[b], d[b], e[b])
        };
        this.propUpdate = function(b, c, d, e, f) {
            if ("object" !== typeof d[b]) c[b] = "undefined" != typeof d[b] ? d[b] + e[b] * f : c[b];
            else
                for (subprop in d[b]) this.propUpdate(subprop, c[b], d[b], e[b], f)
        };
        this.propSet = function(b, c, d) {
            if ("object" !== typeof c[b]) d[b] = c[b];
            else
                for (subprop in c[b]) d[b] || (d[b] = {}), this.propSet(subprop, c[b], d[b])
        };
        this.update = function() {
            if (!n) return !1;
            if (this.delay) {
                if (j.delta() < this.delay) return;
                this.delay = 0;
                j.reset()
            }
            if (this.paused || this.complete) return !1;
            var c = (j.delta() + p) / this.duration,
                c = 1 < c ? 1 : c,
                d = this.easing(c);
            for (property in m) this.propUpdate(property, b, e, m, d);
            if (1 <= c) {
                if (0 == this.loopNum || !this.loop) {
                    this.complete = !0;
                    if (this.onComplete) this.onComplete();
                    r && r.start();
                    return !1
                }
                if (this.loop == ig.Tween.Loop.Revert) {
                    for (property in e) this.propSet(property, e, b);
                    p = 0;
                    j.reset(); - 1 != this.loopNum && this.loopNum--
                } else if (this.loop == ig.Tween.Loop.Reverse) {
                    c = {};
                    d = {};
                    ig.merge(c, g);
                    ig.merge(d, e);
                    ig.merge(e, c);
                    ig.merge(g, d);
                    for (property in g) this.initDelta(property, m, b, g);
                    p = 0;
                    j.reset(); - 1 != this.loopNum && this.loopNum--
                }
            }
        };
        this.pause = function() {
            this.paused = !0;
            j && j.delta && (p += j.delta())
        };
        this.resume = function() {
            this.paused = !1;
            j && j.reset && j.reset()
        };
        this.stop = function(b) {
            b && (this.loop = this.complete = this.paused = !1, p += d, this.update());
            this.complete = !0
        }
    };
    ig.Tween.Loop = {
        Revert: 1,
        Reverse: 2
    };
    ig.Tween.Easing = {
        Linear: {},
        Quadratic: {},
        Cubic: {},
        Quartic: {},
        Quintic: {},
        Sinusoidal: {},
        Exponential: {},
        Circular: {},
        Elastic: {},
        Back: {},
        Bounce: {}
    };
    ig.Tween.Easing.Linear.EaseNone = function(b) {
        return b
    };
    ig.Tween.Easing.Quadratic.EaseIn = function(b) {
        return b * b
    };
    ig.Tween.Easing.Quadratic.EaseOut = function(b) {
        return -b * (b - 2)
    };
    ig.Tween.Easing.Quadratic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b : -0.5 * (--b * (b - 2) - 1)
    };
    ig.Tween.Easing.Cubic.EaseIn = function(b) {
        return b * b * b
    };
    ig.Tween.Easing.Cubic.EaseOut = function(b) {
        return --b * b * b + 1
    };
    ig.Tween.Easing.Cubic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b : 0.5 * ((b -= 2) * b * b + 2)
    };
    ig.Tween.Easing.Quartic.EaseIn = function(b) {
        return b * b * b * b
    };
    ig.Tween.Easing.Quartic.EaseOut = function(b) {
        return -(--b * b * b * b - 1)
    };
    ig.Tween.Easing.Quartic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b : -0.5 * ((b -= 2) * b * b * b - 2)
    };
    ig.Tween.Easing.Quintic.EaseIn = function(b) {
        return b * b * b * b * b
    };
    ig.Tween.Easing.Quintic.EaseOut = function(b) {
        return (b -= 1) * b * b * b * b + 1
    };
    ig.Tween.Easing.Quintic.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * b * b * b : 0.5 * ((b -= 2) * b * b * b * b + 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseIn = function(b) {
        return -Math.cos(b * Math.PI / 2) + 1
    };
    ig.Tween.Easing.Sinusoidal.EaseOut = function(b) {
        return Math.sin(b * Math.PI / 2)
    };
    ig.Tween.Easing.Sinusoidal.EaseInOut = function(b) {
        return -0.5 * (Math.cos(Math.PI * b) - 1)
    };
    ig.Tween.Easing.Exponential.EaseIn = function(b) {
        return 0 == b ? 0 : Math.pow(2, 10 * (b - 1))
    };
    ig.Tween.Easing.Exponential.EaseOut = function(b) {
        return 1 == b ? 1 : -Math.pow(2, -10 * b) + 1
    };
    ig.Tween.Easing.Exponential.EaseInOut = function(b) {
        return 0 == b ? 0 : 1 == b ? 1 : 1 > (b *= 2) ? 0.5 * Math.pow(2, 10 * (b - 1)) : 0.5 * (-Math.pow(2, -10 * (b - 1)) + 2)
    };
    ig.Tween.Easing.Circular.EaseIn = function(b) {
        return -(Math.sqrt(1 - b * b) - 1)
    };
    ig.Tween.Easing.Circular.EaseOut = function(b) {
        return Math.sqrt(1 - --b * b)
    };
    ig.Tween.Easing.Circular.EaseInOut = function(b) {
        return 1 > (b /= 0.5) ? -0.5 * (Math.sqrt(1 - b * b) - 1) : 0.5 * (Math.sqrt(1 - (b -= 2) * b) + 1)
    };
    ig.Tween.Easing.Elastic.EaseIn = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return -(d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f))
    };
    ig.Tween.Easing.Elastic.EaseOut = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return d * Math.pow(2, -10 * b) * Math.sin(2 * (b - c) * Math.PI / f) + 1
    };
    ig.Tween.Easing.Elastic.EaseInOut = function(b) {
        var c, d = 0.1,
            f = 0.4;
        if (0 == b) return 0;
        if (1 == b) return 1;
        f || (f = 0.3);
        !d || 1 > d ? (d = 1, c = f / 4) : c = f / (2 * Math.PI) * Math.asin(1 / d);
        return 1 > (b *= 2) ? -0.5 * d * Math.pow(2, 10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f) : 0.5 * d * Math.pow(2, -10 * (b -= 1)) * Math.sin(2 * (b - c) * Math.PI / f) + 1
    };
    ig.Tween.Easing.Back.EaseIn = function(b) {
        return b * b * (2.70158 * b - 1.70158)
    };
    ig.Tween.Easing.Back.EaseOut = function(b) {
        return (b -= 1) * b * (2.70158 * b + 1.70158) + 1
    };
    ig.Tween.Easing.Back.EaseInOut = function(b) {
        return 1 > (b *= 2) ? 0.5 * b * b * (3.5949095 * b - 2.5949095) : 0.5 * ((b -= 2) * b * (3.5949095 * b + 2.5949095) + 2)
    };
    ig.Tween.Easing.Bounce.EaseIn = function(b) {
        return 1 - ig.Tween.Easing.Bounce.EaseOut(1 - b)
    };
    ig.Tween.Easing.Bounce.EaseOut = function(b) {
        return (b /= 1) < 1 / 2.75 ? 7.5625 * b * b : b < 2 / 2.75 ? 7.5625 * (b -= 1.5 / 2.75) * b + 0.75 : b < 2.5 / 2.75 ? 7.5625 * (b -= 2.25 / 2.75) * b + 0.9375 : 7.5625 * (b -= 2.625 / 2.75) * b + 0.984375
    };
    ig.Tween.Easing.Bounce.EaseInOut = function(b) {
        return 0.5 > b ? 0.5 * ig.Tween.Easing.Bounce.EaseIn(2 * b) : 0.5 * ig.Tween.Easing.Bounce.EaseOut(2 * b - 1) + 0.5
    };
    ig.Tween.Interpolation = {
        Linear: function(b, c) {
            var d = b.length - 1,
                f = d * c,
                e = Math.floor(f),
                g = TWEEN.Interpolation.Utils.Linear;
            return 0 > c ? g(b[0], b[1], f) : 1 < c ? g(b[d], b[d - 1], d - f) : g(b[e], b[e + 1 > d ? d : e + 1], f - e)
        }
    }
});
ig.baked = !0;
ig.module("plugins.patches.entity-patch").requires("impact.entity").defines(function() {
    ig.Entity.inject({
        handleMovementTrace: function(b) {
            this.standing = !1;
            b.collision.y && (0 < this.bounciness && Math.abs(this.vel.y) > this.minBounceVelocity ? this.vel.y *= -this.bounciness : (0 < this.vel.y && (this.standing = !0), this.vel.y = 0));
            b.collision.x && (this.vel.x = 0 < this.bounciness && Math.abs(this.vel.x) > this.minBounceVelocity ? this.vel.x * -this.bounciness : 0);
            if (b.collision.slope) {
                var c = b.collision.slope;
                if (0 < this.bounciness) {
                    var d = this.vel.x * c.nx + this.vel.y * c.ny;
                    this.vel.x = (this.vel.x - 2 * c.nx * d) * this.bounciness;
                    this.vel.y = (this.vel.y - 2 * c.ny * d) * this.bounciness
                } else d = (this.vel.x * c.x + this.vel.y * c.y) / (c.x * c.x + c.y * c.y), this.vel.x = c.x * d, this.vel.y = c.y * d, c = Math.atan2(c.x, c.y), c > this.slopeStanding.min && c < this.slopeStanding.max && (this.standing = !0)
            }
            this.pos.x = b.pos.x;
            this.pos.y = b.pos.y
        }
    })
});
ig.baked = !0;
ig.module("plugins.tweens-handler").requires("impact.entity", "plugins.tween", "plugins.patches.entity-patch").defines(function() {
    Array.prototype.indexOf || (Array.prototype.indexOf = function(b) {
        for (var d = 0; d < this.length; ++d)
            if (this[d] === b) return d;
        return -1
    });
    ig.TweensHandler = ig.Class.extend({
        _tweens: [],
        _systemPausedTweens: [],
        init: function() {},
        getAll: function() {
            return this._tweens
        },
        removeAll: function() {
            this._tweens = []
        },
        add: function(b) {
            this._tweens.push(b)
        },
        remove: function(b) {
            b = this._tweens.indexOf(b); - 1 !== b && this._tweens.splice(b, 1)
        },
        onSystemPause: function() {
            if (0 === this._tweens.length) return !1;
            for (var b = 0, d = null; b < this._tweens.length;) d = this._tweens[b], d._isPlaying && (this._systemPausedTweens.push(d), d.pause()), b++;
            return !0
        },
        onSystemResume: function() {
            if (0 === this._systemPausedTweens.length) return !1;
            for (var b = 0; b < this._systemPausedTweens.length;) this._systemPausedTweens[b].resume(), b++;
            this._systemPausedTweens = [];
            return !0
        },
        update: function(b, d) {
            if (0 === this._tweens.length) return !1;
            var f = 0;
            for (b = void 0 !== b ? b : ig.game.tweens.now(); f < this._tweens.length;) this._tweens[f].update(b) || d ? f++ : this._tweens.splice(f, 1);
            return !0
        },
        now: function() {
            return Date.now()
        }
    });
    ig.TweenDef = ig.Class.extend({
        _ent: null,
        _valuesStart: {},
        _valuesEnd: {},
        _valuesStartRepeat: {},
        _duration: 1E3,
        _repeat: 0,
        _yoyo: !1,
        _isPlaying: !1,
        _reversed: !1,
        _delayTime: 0,
        _startTime: null,
        _pauseTime: null,
        _easingFunction: ig.Tween.Easing.Linear.EaseNone,
        _interpolationFunction: ig.Tween.Interpolation.Linear,
        _chainedTweens: [],
        _onStartCallback: null,
        _onStartCallbackFired: !1,
        _onUpdateCallback: null,
        _onCompleteCallback: null,
        _onStopCallback: null,
        _onPauseCallback: null,
        _onResumeCallback: null,
        _currentElapsed: 0,
        init: function(b) {
            this._object = b
        },
        to: function(b, d) {
            this._valuesEnd = b;
            void 0 !== d && (this._duration = d);
            return this
        },
        start: function(b) {
            if (this._isPlaying) return this;
            ig.game.tweens.add(this);
            this._isPlaying = !0;
            this._onStartCallbackFired = !1;
            this._startTime = void 0 !== b ? b : ig.game.tweens.now();
            this._startTime += this._delayTime;
            for (var d in this._valuesEnd) {
                if (this._valuesEnd[d] instanceof Array) {
                    if (0 === this._valuesEnd[d].length) continue;
                    this._valuesEnd[d] = [this._object[d]].concat(this._valuesEnd[d])
                }
                void 0 !== this._object[d] && (this._valuesStart[d] = this._object[d], !1 === this._valuesStart[d] instanceof Array && (this._valuesStart[d] *= 1), this._valuesStartRepeat[d] = this._valuesStart[d] || 0)
            }
            return this
        },
        stop: function() {
            if (!this._isPlaying) return this;
            ig.game.tweens.remove(this);
            this._isPlaying = !1;
            null !== this._onStopCallback && this._onStopCallback.call(this._object, this._object);
            this.stopChainedTweens();
            return this
        },
        pause: function() {
            if (!this._isPlaying) return this;
            ig.game.tweens.remove(this);
            this._isPlaying = !1;
            this._pauseTime = ig.game.tweens.now();
            null !== this._onPauseCallback && this._onPauseCallback.call(this._object, this._object);
            return this
        },
        resume: function() {
            if (this._isPlaying || !this._pauseTime) return this;
            var b = ig.game.tweens.now() - this._pauseTime;
            this._startTime += b;
            ig.game.tweens.add(this);
            this._isPlaying = !0;
            null !== this._onResumeCallback && this._onResumeCallback.call(this._object, this._object);
            this._pauseTime = null;
            return this
        },
        end: function() {
            this.update(this._startTime + this._duration);
            return this
        },
        stopChainedTweens: function() {
            for (var b = 0, d = this._chainedTweens.length; b < d; b++) this._chainedTweens[b].stop()
        },
        delay: function(b) {
            this._delayTime = b;
            return this
        },
        repeat: function(b) {
            this._repeat = b;
            return this
        },
        repeatDelay: function(b) {
            this._repeatDelayTime = b;
            return this
        },
        yoyo: function(b) {
            this._yoyo = b;
            return this
        },
        easing: function(b) {
            this._easingFunction = b;
            return this
        },
        interpolation: function(b) {
            this._interpolationFunction = b;
            return this
        },
        chain: function() {
            this._chainedTweens = arguments;
            return this
        },
        onStart: function(b) {
            this._onStartCallback = b;
            return this
        },
        onUpdate: function(b) {
            this._onUpdateCallback = b;
            return this
        },
        onComplete: function(b) {
            this._onCompleteCallback = b;
            return this
        },
        onStop: function(b) {
            this._onStopCallback = b;
            return this
        },
        onPause: function(b) {
            this._onPauseCallback = b;
            return this
        },
        onResume: function(b) {
            this._onResumeCallback = b;
            return this
        },
        update: function(b) {
            var d, f, e;
            if (b < this._startTime) return !0;
            !1 === this._onStartCallbackFired && (null !== this._onStartCallback && this._onStartCallback.call(this._object, this._object), this._onStartCallbackFired = !0);
            f = (b - this._startTime) / this._duration;
            this._currentElapsed = f = 1 < f ? 1 : f;
            e = this._easingFunction(f);
            for (d in this._valuesEnd)
                if (void 0 !== this._valuesStart[d]) {
                    var g = this._valuesStart[d] || 0,
                        m = this._valuesEnd[d];
                    m instanceof Array ? this._object[d] = this._interpolationFunction(m, e) : ("string" === typeof m && (m = "+" === m.charAt(0) || "-" === m.charAt(0) ? g + parseFloat(m) : parseFloat(m)), "number" === typeof m && (this._object[d] = g + (m - g) * e))
                }
            null !== this._onUpdateCallback && this._onUpdateCallback.call(this._object, this._object, e);
            if (1 === f)
                if (0 < this._repeat) {
                    isFinite(this._repeat) && this._repeat--;
                    for (d in this._valuesStartRepeat) "string" === typeof this._valuesEnd[d] && (this._valuesStartRepeat[d] = _valuesStartRepeat[d] + parseFloat(_valuesEnd[d])), this._yoyo && (f = this._valuesStartRepeat[d], this._valuesStartRepeat[d] = this._valuesEnd[d], this._valuesEnd[d] = f), this._valuesStart[d] = this._valuesStartRepeat[d];
                    this._yoyo && (this._reversed = !this._reversed);
                    this._startTime = void 0 !== this._repeatDelayTime ? b + this._repeatDelayTime : b + this._delayTime
                } else {
                    null !== this._onCompleteCallback && this._onCompleteCallback.call(this._object, this._object);
                    b = 0;
                    for (d = this._chainedTweens.length; b < d; b++) this._chainedTweens[b].start(this._startTime + this._duration);
                    return !1
                }
            return !0
        }
    });
    var b = [1];
    ig.Tween.Interpolation = {
        Linear: function(b, d) {
            var f = b.length - 1,
                e = f * d,
                g = Math.floor(e),
                m = ig.Tween.Interpolation.Utils.Linear;
            return 0 > d ? m(b[0], b[1], e) : 1 < d ? m(b[f], b[f - 1], f - e) : m(b[g], b[g + 1 > f ? f : g + 1], e - g)
        },
        Bezier: function(b, d) {
            for (var f = 0, e = b.length - 1, g = Math.pow, m = ig.Tween.Interpolation.Utils.Bernstein, p = 0; p <= e; p++) f += g(1 - d, e - p) * g(d, p) * b[p] * m(e, p);
            return f
        },
        CatmullRom: function(b, d) {
            var f = b.length - 1,
                e = f * d,
                g = Math.floor(e),
                m = ig.Tween.Interpolation.Utils.CatmullRom;
            return b[0] === b[f] ? (0 > d && (g = Math.floor(e = f * (1 + d))), m(b[(g - 1 + f) % f], b[g], b[(g + 1) % f], b[(g + 2) % f], e - g)) : 0 > d ? b[0] - (m(b[0], b[0], b[1], b[1], -e) - b[0]) : 1 < d ? b[f] - (m(b[f], b[f], b[f - 1], b[f - 1], e - f) - b[f]) : m(b[g ? g - 1 : 0], b[g], b[f < g + 1 ? f : g + 1], b[f < g + 2 ? f : g + 2], e - g)
        },
        Utils: {
            Linear: function(b, d, f) {
                return (d - b) * f + b
            },
            Bernstein: function(b, d) {
                var f = ig.Tween.Interpolation.Utils.Factorial;
                return f(b) / f(d) / f(b - d)
            },
            Factorial: function(c) {
                var d = 1;
                if (b[c]) return b[c];
                for (var f = c; 1 < f; f--) d *= f;
                return b[c] = d
            },
            CatmullRom: function(b, d, f, e, g) {
                b = 0.5 * (f - b);
                e = 0.5 * (e - d);
                var m = g * g;
                return (2 * d - 2 * f + b + e) * g * m + (-3 * d + 3 * f - 2 * b - e) * m + b * g + d
            }
        }
    }
});
ig.baked = !0;
ig.module("plugins.url-parameters").defines(function() {
    ig.UrlParameters = ig.Class.extend({
        init: function() {
            switch (getQueryVariable("iphone")) {
                case "true":
                    ig.ua.iPhone = !0, console.log("iPhone mode")
            }
            var b = getQueryVariable("webview");
            if (b) switch (b) {
                case "true":
                    ig.ua.is_uiwebview = !0, console.log("webview mode")
            }
            if (b = getQueryVariable("debug")) switch (b) {
                case "true":
                    ig.game.showDebugMenu(), console.log("debug mode")
            }
            switch (getQueryVariable("view")) {
                case "stats":
                    ig.game.resetPlayerStats(), ig.game.endGame()
            }
            getQueryVariable("ad")
        }
    })
});
ig.baked = !0;
ig.module("plugins.director").requires("impact.impact").defines(function() {
    ig.Director = ig.Class.extend({
        init: function(b, c) {
            this.game = b;
            this.levels = [];
            this.currentLevel = 0;
            this.append(c)
        },
        loadLevel: function(b) {
            for (var c in ig.sizeHandler.dynamicClickableEntityDivs) {
                var d = ig.domHandler.getElementById("#" + c);
                ig.domHandler.hide(d)
            }
            this.currentLevel = b;
            this.game.loadLevel(this.levels[b]);
            return !0
        },
        loadLevelWithoutEntities: function(b) {
            this.currentLevel = b;
            this.game.loadLevelWithoutEntities(this.levels[b]);
            return !0
        },
        append: function(b) {
            newLevels = [];
            return "object" === typeof b ? (b.constructor === [].constructor ? newLevels = b : newLevels[0] = b, this.levels = this.levels.concat(newLevels), !0) : !1
        },
        nextLevel: function() {
            return this.currentLevel + 1 < this.levels.length ? this.loadLevel(this.currentLevel + 1) : !1
        },
        previousLevel: function() {
            return 0 <= this.currentLevel - 1 ? this.loadLevel(this.currentLevel - 1) : !1
        },
        jumpTo: function(b) {
            var c = null;
            for (i = 0; i < this.levels.length; i++) this.levels[i] == b && (c = i);
            return 0 <= c ? this.loadLevel(c) : !1
        },
        firstLevel: function() {
            return this.loadLevel(0)
        },
        lastLevel: function() {
            return this.loadLevel(this.levels.length - 1)
        },
        reloadLevel: function() {
            return this.loadLevel(this.currentLevel)
        }
    })
});
ig.baked = !0;
ig.module("plugins.impact-storage").requires("impact.game").defines(function() {
    ig.Storage = ig.Class.extend({
        staticInstantiate: function() {
            return !ig.Storage.instance ? null : ig.Storage.instance
        },
        init: function() {
            ig.Storage.instance = this
        },
        isCapable: function() {
            return "undefined" !== typeof window.localStorage
        },
        isSet: function(b) {
            return null !== this.get(b)
        },
        initUnset: function(b, c) {
            null === this.get(b) && this.set(b, c)
        },
        get: function(b) {
            if (!this.isCapable()) return null;
            try {
                return JSON.parse(localStorage.getItem(b))
            } catch (c) {
                return window.localStorage.getItem(b)
            }
        },
        getInt: function(b) {
            return ~~this.get(b)
        },
        getFloat: function(b) {
            return parseFloat(this.get(b))
        },
        getBool: function(b) {
            return !!this.get(b)
        },
        key: function(b) {
            return this.isCapable() ? window.localStorage.key(b) : null
        },
        set: function(b, c) {
            if (!this.isCapable()) return null;
            try {
                window.localStorage.setItem(b, JSON.stringify(c))
            } catch (d) {
                console.log(d)
            }
        },
        setHighest: function(b, c) {
            c > this.getFloat(b) && this.set(b, c)
        },
        remove: function(b) {
            if (!this.isCapable()) return null;
            window.localStorage.removeItem(b)
        },
        clear: function() {
            if (!this.isCapable()) return null;
            window.localStorage.clear()
        }
    })
});
ig.baked = !0;
ig.module("plugins.nimpact").requires("impact.entity").defines(function() {
    ig.Entity.inject({
        anchor: {
            x: 0,
            y: 0
        },
        scale: {
            x: 1,
            y: 1
        },
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        children: [],
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        draw: function() {
            var b = ig.system.context;
            b.save();
            b.translate(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x), ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y));
            b.scale(this.scale.x, this.scale.y);
            null != this.currentAnim && this.currentAnim.draw(0, 0);
            b.restore()
        },
        setScale: function(b, c) {
            var d = this.size.x,
                f = this.size.y;
            this.scale.x = b;
            this.scale.y = c || this.scale.x;
            var e = this.scale.x / ig.system.scale,
                g = this.scale.y / ig.system.scale,
                m = d * e,
                p = f * g;
            this.size.x = 0 <= m ? m : -m;
            this.size.y = 0 <= p ? p : -p;
            this.pos.x = 0 < m ? this.pos.x + (d - m) * this.anchor.x : this.pos.x + ((d - m) * this.anchor.x - m);
            this.pos.y = 0 < p ? this.pos.y + (f - p) * this.anchor.y : this.pos.y + ((d - p) * this.anchor.y - p);
            for (var j in this.anims) this.anims[j].flip.x = 0 > e ? !0 : !1, this.anims[j].flip.y = 0 > g ? !0 : !1
        },
        setAnchor: function(b, c) {
            this.anchor.x = b;
            this.anchor.y = null == c ? b : c;
            this.pos.x -= this.size.x * this.anchor.x;
            this.pos.y -= this.size.y * this.anchor.y
        },
        nSetPos: function(b, c) {
            this.pos.x = b;
            this.pos.y = c;
            this.setAnchor(this.anchor.x, this.anchor.y);
            this.setScale(this.scale.x, this.scale.y)
        },
        getCenter: function() {
            return {
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y / 2
            }
        },
        getCenterX: function() {
            return this.pos.x + this.size.x / 2
        },
        getCenterY: function() {
            return this.pos.y + this.size.y / 2
        },
        spawnEntity: function(b, c, d, f) {
            f = ig.merge({
                zIndex: this.zIndex + 1,
                parents: this
            }, f);
            b = ig.game.spawnEntity(b, c, d, f);
            this.children.push(b);
            return b
        },
        kill: function() {
            for (var b = 0; b < this.children.length; b++) null != this.children[b] && ig.game.removeEntity(this.children[b]);
            ig.game.removeEntity(this)
        }
    })
});
ig.baked = !0;
ig.module("plugins.sat").requires("impact.impact").defines(function() {
    ig.SAT = ig.Class.extend({
        init: function() {},
        mtvForShapeIntersect: function(b, c) {
            var d = 1E4,
                f = null,
                e = [],
                g = [];
            if (b.isCircle() && c.isCircle()) e.push(b.center.subtract(c.center).normalized());
            else if (c.isCircle()) {
                for (var m = b.pointList[0], p = c.center.manhattanDistance(m), j = 1; j < b.pointList.length; j++) {
                    var n = b.pointList[j],
                        r = c.center.manhattanDistance(n);
                    r < p && (p = r, m = n)
                }
                g.push(c.center.subtract(m).normalized())
            } else if (b.isCircle()) {
                j = c;
                c = b;
                b = j;
                m = b.pointList[0];
                p = c.center.manhattanDistance(m);
                for (j = 1; j < b.pointList.length; j++) n = b.pointList[j], r = c.center.manhattanDistance(n), r < p && (p = r, m = n);
                g.push(c.center.subtract(m).normalized())
            } else e = b.getNormalizedAxes(), g = c.getNormalizedAxes();
            for (j = 0; j < e.length; j++) {
                var m = e[j],
                    r = b.project(m),
                    q = c.project(m);
                if (r.overlap(q)) {
                    p = r.getOverlap(q);
                    if (r.contains(q) || q.contains(r)) n = Math.abs(r.min - q.min), r = Math.abs(r.max - q.max), p = n < r ? p + n : p + r;
                    p < d && (d = p, f = m)
                } else return null
            }
            for (j = 0; j < g.length; j++)
                if (m = g[j], r = b.project(m), q = c.project(m), r.overlap(q)) {
                    p = r.getOverlap(q);
                    if (r.contains(q) || q.contains(r)) n = Math.abs(r.min - q.min), r = Math.abs(r.max - q.max), p = n < r ? p + n : p + r;
                    p < d && (d = p, f = m)
                } else return null;
            return new ig.SAT.MTV(f, d)
        },
        simpleShapeIntersect: function(b, c) {
            var d = [],
                f = [];
            if (b.isCircle() && c.isCircle()) d.push(b.center.subtract(c.center).normalized());
            else if (c.isCircle()) {
                for (var e = b.pointList[0], d = c.center.manhattanDistance(e), e = 1; e < b.pointList.length; e++) {
                    var g = b.pointList[e],
                        g = c.center.manhattanDistance(g);
                    g < d && (d = g)
                }
                d = b.getNormalizedAxes()
            } else if (b.isCircle()) {
                e = c;
                c = b;
                b = e;
                e = b.pointList[0];
                d = c.center.manhattanDistance(e);
                for (e = 1; e < b.pointList.length; e++) g = b.pointList[e], g = c.center.manhattanDistance(g), g < d && (d = g);
                d = b.getNormalizedAxes()
            } else d = b.getAxes(), f = c.getAxes();
            for (e = 0; e < d.length; e++) {
                var m = d[e],
                    g = b.project(m),
                    m = c.project(m);
                if (!g.overlap(m)) return !1
            }
            for (e = 0; e < f.length; e++)
                if (m = f[e], g = b.project(m), m = c.project(m), !m.overlap(g)) return !1;
            return !0
        }
    });
    ig.SAT.Vector2D = ig.Class.extend({
        x: 0,
        y: 0,
        init: function(b, c) {
            this.x = b;
            this.y = c
        },
        subtract: function(b) {
            return new ig.SAT.Vector2D(this.x - b.x, this.y - b.y)
        },
        getNormal: function() {
            return new ig.SAT.Vector2D(-this.y, this.x)
        },
        getNormalizedNormal: function() {
            return (new ig.SAT.Vector2D(-this.y, this.x)).normalized()
        },
        normalized: function() {
            var b = Math.sqrt(this.x * this.x + this.y * this.y);
            return 0 == b ? new ig.SAT.Vector2D(0, 0) : new ig.SAT.Vector2D(this.x / b, this.y / b)
        },
        distance: function(b) {
            var c = b.x - this.x;
            b = b.y - this.y;
            return Math.sqrt(c * c + b * b)
        },
        manhattanDistance: function(b) {
            var c = b.x - this.x;
            b = b.y - this.y;
            return c * c + b * b
        },
        dotProduct: function(b) {
            return this.x * b.x + this.y * b.y
        },
        crossProduct: function(b) {
            return this.x * b.y - this.y * b.x
        },
        getAngle: function(b) {
            return Math.atan2(this.crossProduct(b), this.dotProduct(b))
        }
    });
    ig.SAT.Shape = ig.Class.extend({
        pointList: [],
        center: null,
        init: function(b) {
            this.pointList = [];
            for (var c = 0; c < b.length; c++) {
                var d = b[c];
                this.pointList.push(new ig.SAT.Vector2D(d.x, d.y))
            }
        },
        isCircle: function() {
            return !1
        },
        getAxes: function() {
            var b = [];
            if (1 >= this.pointList.length) return b;
            if (2 == this.pointList.length) {
                var c = this.pointList[0],
                    d = this.pointList[1],
                    c = c.subtract(d),
                    c = c.getNormal();
                (0 != c.x || 0 != c.y) && b.push(c);
                return b
            }
            for (var f = 0; f < this.pointList.length; f++) c = this.pointList[f], d = this.pointList[f + 1 == this.pointList.length ? 0 : f + 1], c = c.subtract(d), c = c.getNormal(), (0 != c.x || 0 != c.y) && b.push(c);
            return b
        },
        getNormalizedAxes: function() {
            for (var b = [], c = 0; c < this.pointList.length; c++) {
                var d = this.pointList[c].subtract(this.pointList[c + 1 == this.pointList.length ? 0 : c + 1]).getNormalizedNormal();
                (0 != d.x || 0 != d.y) && b.push(d)
            }
            return b
        },
        project: function(b) {
            return new ig.SAT.Projection(this.pointList, b)
        }
    });
    ig.SAT.Circle = ig.SAT.Shape.extend({
        center: null,
        radius: 0,
        init: function(b, c) {
            this.center = new ig.SAT.Vector2D(b.x, b.y);
            this.radius = c
        },
        isCircle: function() {
            return !0
        },
        getAxes: function() {
            return []
        },
        getNormalizedAxes: function() {
            return []
        },
        project: function(b) {
            var c = new ig.SAT.Projection([], b);
            b = this.center.dotProduct(b);
            c.min = b - this.radius;
            c.max = b + this.radius;
            return c
        }
    });
    ig.SAT.Projection = ig.Class.extend({
        min: null,
        max: null,
        init: function(b, c) {
            if (!b || 0 >= b.length) return this;
            this.min = b[0].dotProduct(c);
            this.max = b[0].dotProduct(c);
            for (var d = 1; d < b.length; d++) {
                var f = b[d].dotProduct(c);
                this.min > f && (this.min = f);
                f > this.max && (this.max = f)
            }
        },
        overlap: function(b) {
            return !(this.max < b.min || b.max < this.min)
        },
        getOverlap: function(b) {
            var c = this.max - b.min;
            b = b.max - this.min;
            b < c && (c = b);
            return c
        },
        contains: function(b) {
            var c = this.max - this.min;
            if (b.max - b.min < c) {
                var d = this.max - b.min;
                0 >= d && (d = b.max - this.min);
                if (d >= c) return !0
            }
            return !1
        }
    });
    ig.SAT.MTV = ig.Class.extend({
        axis: null,
        overlapAmount: 0,
        init: function(b, c) {
            this.axis = b;
            this.overlapAmount = c
        }
    })
});
ig.baked = !0;
ig.module("game.entities.mouse-trail").requires("impact.entity").defines(function() {
    GameTrailNode = ig.Class.extend({
        x: 0,
        y: 0,
        zIndex: 110,
        time: 0,
        remainder: 0,
        prev: null,
        next: null,
        l: 0,
        w: 1,
        dx: 0,
        dy: 0,
        adx: 0,
        ady: 0,
        ndx: 0,
        ndy: 0,
        init: function(b, c, d, f) {
            this.x = b;
            this.y = c;
            this.time = d;
            this.remainder = f
        },
        setNext: function(b) {
            this.next = b;
            b = this.next.x - this.x;
            var c = this.next.y - this.y,
                d = Math.sqrt(b * b + c * c);
            this.l = d;
            this.next.l = d;
            this.next.dx = b / d;
            this.next.dy = c / d;
            this.next.ndx = -this.next.dy;
            this.next.ndy = this.next.dx;
            this.prev ? (this.adx = (this.dx + this.next.dx) / 2, this.ady = (this.dy + this.next.dy) / 2, this.ndx = -this.ady, this.ndy = this.adx) : (this.adx = this.next.dx, this.ady = this.next.dy, this.ndx = -this.ady, this.ndy = this.adx, this.dx = this.next.dx, this.dy = this.next.dy)
        },
        setPrev: function(b) {
            this.prev = b
        }
    });
    EntityMouseTrail = ig.Entity.extend({
        zIndex: 999,
        nodeList: [],
        lineList: [],
        pollInterval: 0.01,
        pollMaxDuration: 0.15,
        maxPollInterval: 0.1,
        nodeMinDistance: 16,
        pollFlag: !1,
        chains: [],
        enabled: !1,
        controller: null,
        init: function(b, c, d) {
            this.parent(b, c, d);
            switch (Math.floor(5 * Math.random())) {
                case 0:
                    this.strokeColor = "rgba(255,255,255,0.5)";
                    this.vcolor = "#ffa41b";
                    break;
                case 1:
                    this.strokeColor = "rgba(236,115,115,0.5)";
                    this.vcolor = "#05dfd7";
                    break;
                case 2:
                    this.strokeColor = "rgba(253,94,83,0.5)";
                    this.vcolor = "#21bf73";
                    break;
                case 3:
                    this.strokeColor = "rgba(187,225,250,0.5)";
                    this.vcolor = "#0f4c75";
                    break;
                case 4:
                    this.strokeColor = "rgba62,32,109,0.5)";
                    this.vcolor = "#916dd5";
                    break;
                default:
                    this.strokeColor = "rgba(255,255,255,0.5)", this.vcolor = "#ffa41b"
            }
        },
        draw: function() {
            var b = ig.system.context;
            b.save();
            for (var c = 0; c < this.lineList.length; c++) this.drawLineFromNodeList(this.lineList[c]);
            this.drawLineFromNodeList(this.nodeList);
            b.restore()
        },
        update: function() {
            this.detectActivation();
            for (var b = ig.system.clock.delta(), c = b % this.pollInterval; 0 < this.nodeList.length;) {
                var d = this.nodeList[0];
                if (b - c - (d.time - d.remainder) >= this.pollMaxDuration) this.nodeList.splice(0, 1), 0 < this.nodeList.length && this.nodeList[0].setPrev(null);
                else break
            }
            for (var f = 0; f < this.lineList.length;) {
                for (var e = this.lineList[f]; 0 < e.length;)
                    if (d = e[0], b - c - (d.time - d.remainder) >= this.pollMaxDuration) e.splice(0, 1), 0 < e.length && e[0].setPrev(null);
                    else break;
                0 == e.length ? this.lineList.splice(0, 1) : f++
            }
            if (this.pollFlag && !(0 < this.nodeList.length && (d = this.nodeList[this.nodeList.length - 1], b - (d.time - d.remainder) < this.pollInterval)))
                if (f = ig.game.io.getClickPos(), !(0 < this.nodeList.length && (d = this.nodeList[this.nodeList.length - 1], e = f.x - d.x, d = f.y - d.y, e * e + d * d < this.nodeMinDistance))) b = new GameTrailNode(f.x, f.y, b, c), 0 < this.nodeList.length && (d = this.nodeList[this.nodeList.length - 1], d.setNext(b), b.setPrev(d)), this.nodeList.push(b), this.enabled && (this.detectSlashes(), ig.game.medicine && this.detectSlashes2())
        },
        detectSlashes: function() {
            if (!(2 > this.nodeList.length))
                for (var b = this.nodeList[this.nodeList.length - 1], c = this.nodeList[this.nodeList.length - 2], d = 0; d < ig.game.viruses.length; d++) {
                    var f = ig.game.viruses[d];
                    f && f.detectIntersect(c, b) && (!ig.game.gameController.isPaused || !ig.game.gameover) && f.handledKill()
                }
        },
        detectSlashes2: function() {
            if (!(2 > this.nodeList.length))
                for (var b = this.nodeList[this.nodeList.length - 1], c = this.nodeList[this.nodeList.length - 2], d = 0; d < ig.game.medicines.length; d++) {
                    var f = ig.game.medicines[d];
                    f && f.detectIntersect(c, b) && (!ig.game.gameController.isPaused || !ig.game.gameover) && f.handledKill()
                }
        },
        detectActivation: function() {
            if (this.pollFlag) ig.input.released("click") && (this.pollFlag = !1);
            else if (ig.input.state("click")) return this.pollFlag = !0, 0 < this.nodeList.length && this.lineList.push(this.nodeList), this.nodeList = [], !0;
            return !1
        },
        deactivate: function() {
            this.pollFlag = !1
        },
        drawLineFromNodeList: function(b) {
            if (b && !(1 >= b.length)) {
                var c = ig.system.context;
                c.save();
                c.lineWidth = 2;
                c.strokeStyle = "rgba(255,255,255,0.5)";
                for (var d = 12, f = 0; f < b.length; f++) {
                    var e = b[f],
                        g = ig.system.clock.delta() - e.time,
                        g = g / this.pollMaxDuration;
                    1 < g && (g = 1);
                    g = 1 - g;
                    e.t = g;
                    e.w = d * g
                }
                c.beginPath();
                e = b[0];
                g = e.x - e.dx * e.w;
                e = e.y - e.dy * e.w;
                c.moveTo(g, e);
                for (f = 0; f < b.length - 1; f++) e = b[f], g = e.x + e.ndx * e.w, e = e.y + e.ndy * e.w, c.lineTo(g, e);
                e = b[b.length - 1];
                d > e.l && (d = e.l);
                g = e.x + e.ndx * e.w - e.dx * d;
                e = e.y + e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x + e.dx * e.w;
                e = e.y + e.dy * e.w;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x - e.ndx * e.w - e.dx * d;
                e = e.y - e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                for (f = b.length - 2; 0 <= f; f--) e = b[f], g = e.x - e.ndx * e.w, e = e.y - e.ndy * e.w, c.lineTo(g, e);
                c.closePath();
                c.fillStyle = this.strokeColor;
                c.fill();
                d = 8;
                for (f = 0; f < b.length; f++) e = b[f], g = ig.system.clock.delta() - e.time, g /= this.pollMaxDuration, 1 < g && (g = 1), g -= 1, e.t = g, e.w = d * g * g;
                c.beginPath();
                e = b[0];
                g = e.x - e.dx * e.w;
                e = e.y - e.dy * e.w;
                c.moveTo(g, e);
                for (f = 0; f < b.length - 1; f++) e = b[f], g = e.x + e.ndx * e.w, e = e.y + e.ndy * e.w, c.lineTo(g, e);
                e = b[b.length - 1];
                d > e.l && (d = e.l);
                g = e.x + e.ndx * e.w - e.dx * d;
                e = e.y + e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x + e.dx * e.w;
                e = e.y + e.dy * e.w;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x - e.ndx * e.w - e.dx * d;
                e = e.y - e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                for (f = b.length - 2; 0 <= f; f--) e = b[f], g = e.x - e.ndx * e.w, e = e.y - e.ndy * e.w, c.lineTo(g, e);
                c.closePath();
                c.fillStyle = this.vcolor;
                c.fill();
                c.restore()
            }
        }
    })
});
ig.baked = !0;
ig.module("plugins.fullscreen").requires("impact.entity", "plugins.handlers.size-handler", "plugins.director").defines(function() {
    ig.Fullscreen = {
        enableFullscreenButton: !0,
        _isEnabled: "notChecked",
        isEnabled: function() {
            "notChecked" == this._isEnabled && (this._isEnabled = document.fullscreenEnabled || document.mozFullScreenEnabled || document.webkitFullscreenEnabled || document.msFullscreenEnabled ? !0 : !1);
            return this._isEnabled
        },
        isFullscreen: function() {
            return ig.Fullscreen.isEnabled() && (document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement) ? !0 : !1
        },
        toggleFullscreen: function() {
            ig.Fullscreen.isFullscreen() ? ig.Fullscreen.exitFullscreen() : ig.Fullscreen.requestFullscreen();
            ig.sizeHandler.orientationDelayHandler()
        },
        requestFullscreen: function() {
            var b = document.documentElement;
            b.requestFullscreen ? b.requestFullscreen() : b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.msRequestFullscreen && b.msRequestFullscreen()
        },
        exitFullscreen: function() {
            document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
        },
        divs: {}
    };
    ig.Director.inject({
        loadLevel: function(b) {
            var c = ig.Fullscreen.divs,
                d;
            for (d in c) c = ig.domHandler.getElementById("#" + d), ig.domHandler.hide(c);
            return this.parent(b)
        }
    });
    ig.SizeHandler.inject({
        resize: function() {
            this.parent();
            var b = ig.Fullscreen.divs,
                c;
            for (c in b) {
                var d = Math.min(ig.sizeHandler.scaleRatioMultiplier.x, ig.sizeHandler.scaleRatioMultiplier.y),
                    f = ig.domHandler.getElementById("#" + c),
                    e = b[c].entity_pos_x,
                    g = b[c].entity_pos_y,
                    m = b[c].width,
                    p = b[c].height,
                    j = ig.domHandler.getElementById("#canvas"),
                    n = ig.domHandler.getOffsets(j);
                ig.ua.mobile ? (j = n.left, n = n.top, ig.sizeHandler.disableStretchToFitOnMobileFlag ? (e = Math.floor(j + e * ig.sizeHandler.scaleRatioMultiplier.x) + "px", g = Math.floor(n + g * ig.sizeHandler.scaleRatioMultiplier.y) + "px", m = Math.floor(m * ig.sizeHandler.scaleRatioMultiplier.x) + "px", p = Math.floor(p * ig.sizeHandler.scaleRatioMultiplier.y) + "px") : (e = Math.floor(e * ig.sizeHandler.sizeRatio.x) + "px", g = Math.floor(g * ig.sizeHandler.sizeRatio.y) + "px", m = Math.floor(m * ig.sizeHandler.sizeRatio.x) + "px", p = Math.floor(p * ig.sizeHandler.sizeRatio.y) + "px")) : (j = n.left, n = n.top, e = Math.floor(j + e * d) + "px", g = Math.floor(n + g * d) + "px", m = Math.floor(m * d) + "px", p = Math.floor(p * d) + "px");
                ig.domHandler.css(f, {
                    "float": "left",
                    position: "absolute",
                    left: e,
                    top: g,
                    width: m,
                    height: p,
                    "z-index": 3
                });
                b[c]["font-size"] && ig.domHandler.css(f, {
                    "font-size": b[c]["font-size"] * d + "px"
                })
            }
        }
    });
    ig.FullscreenButton = ig.Entity.extend({
        enterImage: null,
        exitImage: null,
        isReady: !1,
        zIndex: 999999,
        identifier: null,
        prevPos: {
            x: 0,
            y: 0
        },
        invisImagePath: "media/graphics/misc/btn-invisible.png",
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.Fullscreen.isEnabled() && ig.Fullscreen.enableFullscreenButton ? this.enterImage.loaded ? this.initSize() : this.enterImage.loadCallback = function() {
                this.initSize()
            }.bind(this) : this.kill()
        },
        kill: function() {
            this.parent()
        },
        destroy: function() {
            this.parent()
        },
        initSize: function() {
            this.size.x = this.enterImage.width;
            this.size.y = this.enterImage.height;
            this.createClickableLayer();
            this.isReady = !0
        },
        createClickableLayer: function() {
            this.identifier = "fullscreen-button-layer";
            var b = ig.domHandler.getElementById("#" + this.identifier);
            b ? (ig.domHandler.show(b), ig.domHandler.attr(b, "onclick", "ig.Fullscreen.toggleFullscreen()")) : this.createClickableOutboundLayer()
        },
        update: function(b, c) {
            b = this.pos.x;
            c = this.pos.y;
            this.isReady && !(this.prevPos.x === b && this.prevPos.y === c) && (ig.Fullscreen.divs[this.identifier] = {}, ig.Fullscreen.divs[this.identifier].width = this.size.x, ig.Fullscreen.divs[this.identifier].height = this.size.y, ig.Fullscreen.divs[this.identifier].entity_pos_x = this.pos.x, ig.Fullscreen.divs[this.identifier].entity_pos_y = this.pos.y, this.prevPos.x = b, this.prevPos.y = c)
        },
        draw: function() {
            this.isReady && (ig.Fullscreen.isFullscreen() ? this.exitImage.draw(this.pos.x, this.pos.y) : this.enterImage.draw(this.pos.x, this.pos.y))
        },
        createClickableOutboundLayer: function() {
            var b = this.identifier,
                c = this.invisImagePath,
                d = ig.domHandler.create("div");
            ig.domHandler.attr(d, "id", b);
            ig.domHandler.attr(d, "onclick", "ig.Fullscreen.toggleFullscreen()");
            var f = ig.domHandler.create("a"),
                e = ig.domHandler.create("img");
            ig.domHandler.css(e, {
                width: "100%",
                height: "100%"
            });
            ig.domHandler.attr(e, "src", c);
            c = Math.min(ig.sizeHandler.scaleRatioMultiplier.x, ig.sizeHandler.scaleRatioMultiplier.y);
            if (ig.ua.mobile) {
                var g = ig.domHandler.getElementById("#canvas"),
                    m = ig.domHandler.getOffsets(g),
                    g = m.left,
                    m = m.top;
                if (ig.sizeHandler.disableStretchToFitOnMobileFlag) var g = Math.floor(g + this.pos.x * ig.sizeHandler.scaleRatioMultiplier.x) + "px",
                    m = Math.floor(m + this.pos.y * ig.sizeHandler.scaleRatioMultiplier.y) + "px",
                    p = Math.floor(this.size.x * ig.sizeHandler.scaleRatioMultiplier.x) + "px",
                    c = Math.floor(this.size.y * ig.sizeHandler.scaleRatioMultiplier.y) + "px";
                else g = Math.floor(this.pos.x * ig.sizeHandler.sizeRatio.x) + "px", m = Math.floor(this.pos.y * ig.sizeHandler.sizeRatio.y) + "px", p = Math.floor(this.size.x * ig.sizeHandler.sizeRatio.x) + "px", c = Math.floor(this.size.y * ig.sizeHandler.sizeRatio.y) + "px"
            } else g = ig.domHandler.getElementById("#canvas"), m = ig.domHandler.getOffsets(g), g = m.left, m = m.top, ig.sizeHandler.enableStretchToFitOnDesktopFlag ? (g = Math.floor(g + this.pos.x * ig.sizeHandler.sizeRatio.x) + "px", m = Math.floor(m + this.pos.y * ig.sizeHandler.sizeRatio.y) + "px", p = Math.floor(this.size.x * ig.sizeHandler.sizeRatio.x) + "px", c = Math.floor(this.size.y * ig.sizeHandler.sizeRatio.y) + "px") : (g = Math.floor(g + this.pos.x * c) + "px", m = Math.floor(m + this.pos.y * c) + "px", p = Math.floor(this.size.x * c) + "px", c = Math.floor(this.size.y * c) + "px");
            ig.domHandler.css(d, {
                "float": "left",
                position: "absolute",
                left: g,
                top: m,
                width: p,
                height: c,
                "z-index": 3
            });
            ig.domHandler.addEvent(d, "mousemove", ig.input.mousemove.bind(ig.input), !1);
            ig.domHandler.appendChild(f, e);
            ig.domHandler.appendChild(d, f);
            ig.domHandler.appendToBody(d);
            ig.Fullscreen.divs[b] = {};
            ig.Fullscreen.divs[b].width = this.size.x;
            ig.Fullscreen.divs[b].height = this.size.y;
            ig.Fullscreen.divs[b].entity_pos_x = this.pos.x;
            ig.Fullscreen.divs[b].entity_pos_y = this.pos.y
        }
    })
});
ig.baked = !0;
ig.module("plugins.common_sdk").requires("impact.input", "impact.game", "plugins.audio.sound-handler").defines(function() {
    ig.CommonSDK = ig.Class.extend({
        gameID: "67e2773313e541c0b7a59d5454673d28",
        adCooldownTime: 1,
        adCooldownTimeoutId: null,
        cachedSfxVolume: 0,
        cachedBgmVolume: 0,
        isSdkReady: !1,
        isAdShown: !1,
        isAdCoolingDown: !1,
        count: 0,
        init: function() {
            // this.initGA();
            this.setupEventHandler();
            try {
                this.log("Initiating GameDistribution SDK..."), this.initSdk()
            } catch (b) {}
            return this
        },
        initGA: function() {
            var b, c = document.getElementsByTagName("script")[0];
            document.getElementById("gtag") || (b = document.createElement("script"), b.id = "gtag",
                b.src = "",
                b.async = !0, b.onload = function() {
                    function c() {
                        dataLayer.push(arguments)
                    }
                    b.onload = null;
                    window.dataLayer = window.dataLayer || [];
                    c("js", new Date);
                    c("config", "UA-50806252-10")
                }.bind(this), c.parentNode.insertBefore(b, c))
        },
        initSdk: function() {
            var b = this;
            window.GD_OPTIONS = {
                gameId: b.gameID,
                onEvent: function(c) {
                    switch (c.name) {
                        case "SDK_GAME_START":
                            b.onAdHide();
                            break;
                        case "SDK_GAME_PAUSE":
                            b.onAdShow()
                    }
                }
            };
            var c, d = document.getElementsByTagName("script")[0];
            document.getElementById("gamedistribution-jssdk") || (c = document.createElement("script"), c.id = "gamedistribution-jssdk", c.src = "./main.min.js", c.onload = function() {
                b.isSdkReady = !0
            }, d.parentNode.insertBefore(c, d))
        },
        setupEventHandler: function() {
            var b = document.getElementById("canvas");
            b && (b.addEventListener("mouseup", this.onTap.bind(this), !1), b.addEventListener("touchend", this.onTap.bind(this), !1), b.addEventListener("MSPointerUp", this.onTap.bind(this), !1));
            window.addEventListener("resize", this.onResize.bind(this), !1)
        },
        onResize: function() {
            var b = this;
            setTimeout(function() {
                if (10 < Math.abs(screen.width - window.innerWidth) || 60 < Math.abs(screen.height - window.innerHeight)) b.count = 0
            }, 200)
        },
        onTap: function(b) {
            3 < this.count || (this.count++, this.requestFullscreen(b), this.resumeAudioContext(b), this.playAudio())
        },
        requestFullscreen: function() {
            var b = document.documentElement;
            b.requestFullscreen ? b.requestFullscreen() : b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.msRequestFullscreen ? b.msRequestFullscreen() : this.verbose && console.log("Yandex API has no request fullscreen method available")
        },
        autoResumeAudioContext: function() {
            Howler._autoResume && "function" === typeof Howler._autoResume && Howler._autoResume()
        },
        resumeAudioContext: function() {
            this.hasResumedWebAudioContext || (ig.soundHandler && ig.soundHandler.bgmPlayer && ig.soundHandler.webaudio ? ig.soundHandler.webaudio.context && "function" === typeof ig.soundHandler.webaudio.context.resume && ig.soundHandler.webaudio.context.resume().then(function() {
                this.hasResumedWebAudioContext = !0;
                this.verbose && console.log("Yandex API has resumed WebAudio Context")
            }.bind(this)) : Howler ? Howler.ctx && "function" === typeof Howler.ctx.resume && Howler.ctx.resume().then(function() {
                this.hasResumedWebAudioContext = !0;
                this.verbose && console.log("Yandex API has resumed WebAudio Context")
            }.bind(this)) : this.autoResumeAudioContext())
        },
        muteAudio: function() {
            ig.soundHandler.sfxPlayer.volume(0);
            ig.soundHandler.bgmPlayer.volume(0)
        },
        unmuteAudio: function() {
            this.setVolumeFromCache()
        },
        cacheVolume: function() {
            this.cacheSfxVolume();
            this.cacheBgmVolume()
        },
        cacheSfxVolume: function() {
            ig && ig.soundHandler && (this.cachedSfxVolume = ig.soundHandler.sfxPlayer.getVolume())
        },
        cacheBgmVolume: function() {
            ig && ig.soundHandler && (this.cachedBgmVolume = ig.soundHandler.bgmPlayer.getVolume())
        },
        setVolumeFromCache: function() {
            this.setSfxVolumeFromCache();
            this.setBgmVolumeFromCache()
        },
        setSfxVolumeFromCache: function() {
            ig && ig.soundHandler && 0 < this.cachedSfxVolume && ig.soundHandler.sfxPlayer.volume(this.cachedSfxVolume)
        },
        setBgmVolumeFromCache: function() {
            ig && ig.soundHandler && 0 < this.cachedBgmVolume && ig.soundHandler.bgmPlayer.volume(this.cachedBgmVolume)
        },
        startAdCooldown: function() {
            this.isAdCoolingDown || (this.isAdCoolingDown = !0, this.adCooldownTimeoutId = window.setTimeout(this.stopAdCooldown.bind(this), 1E3 * this.adCooldownTime))
        },
        stopAdCooldown: function() {
            this.isAdCoolingDown && (this.isAdCoolingDown = !1, window.clearTimeout(this.adCooldownTimeoutId))
        },
        showAd: function() {
            // if (this.isSdkReady && !this.isAdShown && !this.isAdCoolingDown) {
            //     this.startAdCooldown();
            //     this.cacheVolume();
            //     this.log("Show Ad");
            //     try {
            //         "undefined" !== typeof gdsdk && "undefined" !== gdsdk.showAd && gdsdk.showAd()
            //     } catch (b) {}
            // }
        },
        hideAd: function() {
            this.onAdHide();
            var b = document.getElementById("game");
            b.style.visibility = "visible";
            b.style.display = "block"
        },
        log: function(b) {
            console.log("******[GameDistributionAPI]******", b)
        },
        onAdShow: function() {
            this.isAdShown || (this.log("onAdShow"), document.getElementById("game").style.visibility = "hidden", ig && (ig.game && ("function" === typeof ig.game.pauseGame && ig.game.pauseGame(!0), "function" === typeof ig.game.pause && ig.game.pause(!0)), ig.soundHandler && this.muteAudio()), this.isAdShown = !0)
        },
        onAdHide: function() {
            this.isAdShown && (this.log("onAdHide"), this.isAdShown = !1, document.getElementById("game").style.visibility = "visible", ig && (ig.game && ("function" === typeof ig.game.resumeGame && ig.game.resumeGame(!0), "function" === typeof ig.game.resume && ig.game.resume(!0)), ig.soundHandler && this.unmuteAudio(), this.playAudio()), window.focus())
        },
        playAudio: function() {
            try {
                "undefined" !== typeof ig.soundHandler ? (ig.soundHandler.forceUnMuteAll(), "undefined" !== typeof ig.soundHandler.bgmPlayer ? "undefined" !== typeof ig.soundHandler.bgmPlayer.webaudio && "undefined" !== typeof ig.soundHandler.bgmPlayer.webaudio.context && ig.soundHandler.bgmPlayer.webaudio.context.resume() : (ig.soundHandler = null, ig.soundHandler = "undefined" !== typeof ig.soundList ? new ig.SoundHandler(ig.soundList) : new ig.SoundHandler), "undefined" !== typeof ig.soundHandler.sfxPlayer ? "function" === typeof ig.soundHandler.sfxPlayer.play && ig.soundHandler.sfxPlayer.play("staticSound") : "undefined" !== typeof ig.soundHandler.staticSound ? "function" === typeof ig.soundHandler.staticSound.play && ig.soundHandler.staticSound.play() : "function" === typeof ig.soundHandler.playSound && ig.soundHandler.playSound("staticSound")) : "undefined" !== typeof Howl ? (ig.global.staticSound = new Howl({
                    src: ["media/audio/sfx/static.ogg", "media/audio/sfx/static.mp3"]
                }), ig.global.staticSound.play()) : "undefined" !== typeof createjs && "undefined" !== typeof createjs.Sound && "function" === typeof createjs.Sound.play && createjs.Sound.play("staticSound")
            } catch (b) {}
        }
    });
    ig.commonSdk = new ig.CommonSDK
});
ig.baked = !0;
ig.module("plugins.data.color-rgb").defines(function() {
    ColorRGB = function(b, c, d, f) {
        this.r = b || 0;
        this.g = c || 0;
        this.b = d || 0;
        this.a = f || 0
    };
    ColorRGB.prototype = {
        setRandomColor: function() {
            this.r = Math.round(255 * Math.random());
            this.g = Math.round(255 * Math.random());
            this.b = Math.round(255 * Math.random())
        },
        getStyle: function() {
            return "rgba(" + this.r + "," + this.g + "," + this.b + "," + this.a + ")"
        },
        getHex: function() {
            for (var b = this.r.toString(16), c = this.g.toString(16), d = this.b.toString(16); 2 > b.length;) b = "0" + b;
            for (; 2 > c.length;) c = "0" + c;
            for (; 2 > d.length;) d = "0" + d;
            return "#" + b + c + d
        },
        getInvertedColor: function() {
            return new ColorRGB(255 - this.r, 255 - this.g, 255 - this.b, 255 - this.a)
        },
        clone: function() {
            return new ColorRGB(this.r, this.g, this.b, this.a)
        }
    }
});
ig.baked = !0;
ig.module("game.entities.ori.pointer").requires("impact.entity").defines(function() {
    EntityPointer = ig.Entity.extend({
        checkAgainst: ig.Entity.TYPE.BOTH,
        size: new Vector2(16, 16),
        isFirstPressed: !1,
        isPressed: !1,
        isReleased: !1,
        isHovering: !1,
        hoveringItem: null,
        objectArray: [],
        clickedObjectList: [],
        ignorePause: !0,
        zIndex: 5500,
        check: function(b) {
            this.objectArray.push(b)
        },
        clickObject: function(b) {
            this.isFirstPressed && "function" == typeof b.clicked && (b.clicked(), this.addToClickedObjectList(b));
            this.isPressed && !this.isReleased && "function" == typeof b.clicking && b.clicking();
            this.isReleased && "function" == typeof b.released && (b.released(), this.removeFromClickedObjectList(b))
        },
        refreshPos: function() {
            this.pos = ig.game.io.getClickPos()
        },
        update: function() {
            this.parent();
            this.refreshPos();
            var b = null,
                c = -1;
            for (a = this.objectArray.length - 1; - 1 < a; a--) this.objectArray[a].zIndex > c && (c = this.objectArray[a].zIndex, b = this.objectArray[a]);
            if (null != b) null != this.hoveringItem ? this.hoveringItem != b && ("function" == typeof this.hoveringItem.leave && this.hoveringItem.leave(), "function" == typeof b.over && b.over()) : "function" == typeof b.over && b.over(), this.hoveringItem = b, this.clickObject(b), this.objectArray = [];
            else if (null != this.hoveringItem && "function" == typeof this.hoveringItem.leave && (this.hoveringItem.leave(), this.hoveringItem = null), this.isReleased) {
                for (b = 0; b < this.clickedObjectList.length; b++) c = this.clickedObjectList[b], "function" == typeof c.releasedOutside && c.releasedOutside();
                this.clickedObjectList = []
            }
            this.isFirstPressed = ig.input.pressed("click");
            this.isReleased = ig.input.released("click");
            this.isPressed = ig.input.state("click")
        },
        addToClickedObjectList: function(b) {
            this.clickedObjectList.push(b)
        },
        removeFromClickedObjectList: function(b) {
            for (var c = [], d = 0; d < this.clickedObjectList.length; d++) {
                var f = this.clickedObjectList[d];
                f != b && c.push(f)
            }
            this.clickedObjectList = c
        }
    })
});
ig.baked = !0;
ig.module("game.entities.ori.select").requires("impact.entity").defines(function() {
    EntitySelect = ig.Entity.extend({
        type: ig.Entity.TYPE.B,
        checkAgainst: ig.Entity.TYPE.A,
        collides: ig.Entity.COLLIDES.NEVER,
        canSelect: !1,
        canSelectTimerDuration: 0.35,
        zIndex: 99999,
        isHovering: !1,
        isSelected: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.canSelectTimer = new ig.Timer(this.canSelectTimerDuration)
        },
        doesClickableLayerExist: function(b) {
            for (k in dynamicClickableEntityDivs)
                if (k == b) return !0;
            return !1
        },
        checkClickableLayer: function(b, c, d) {
            "undefined" == typeof wm && (this.doesClickableLayerExist(b) ? (ig.game.showOverlay([b]), $("#" + b).find("[href]").attr("href", c)) : this.createClickableOutboundLayer(b, c, "media/graphics/misc/invisible.png", d))
        },
        createClickableOutboundLayer: function(b, c, d, f) {
            var e = ig.$new("div");
            e.id = b;
            document.body.appendChild(e);
            $("#" + e.id).css("float", "left");
            $("#" + e.id).css("width", this.size.x * multiplier);
            $("#" + e.id).css("height", this.size.y * multiplier);
            $("#" + e.id).css("position", "absolute");
            var g = w / 2 - destW / 2,
                m = h / 2 - destH / 2;
            w == mobileWidth ? ($("#" + e.id).css("left", this.pos.x), $("#" + e.id).css("top", this.pos.y)) : ($("#" + e.id).css("left", g + this.pos.x * multiplier), $("#" + e.id).css("top", m + this.pos.y * multiplier));
            f ? $("#" + e.id).html("<a target='_blank' href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>") : $("#" + e.id).html("<a href='" + c + "'><img style='width:100%;height:100%' src='" + d + "'></a>");
            dynamicClickableEntityDivs[b] = {};
            dynamicClickableEntityDivs[b].width = $("#" + e.id).width();
            dynamicClickableEntityDivs[b].height = $("#" + e.id).height();
            dynamicClickableEntityDivs[b].entity_pos_x = this.pos.x;
            dynamicClickableEntityDivs[b].entity_pos_y = this.pos.y
        },
        hovered: function() {
            this.isHovering = !0;
            this.dehoverOthers()
        },
        dehoverOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isHovering = !1)
        },
        deselectOthers: function() {
            var b = ig.game.getEntitiesByType(EntitySelect);
            for (i = 0; i < b.length; i++) b[i] != this && (b[i].isSelected = !1)
        },
        update: function() {
            this.parent();
            this.canSelectTimer && 0 < this.canSelectTimer.delta() && (this.canSelect = !0, this.canSelectTimer = null)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.ui.fade").requires("impact.entity").defines(function() {
    EntityFade = ig.Entity.extend({
        size: {
            x: 2,
            y: 2
        },
        name: "fade",
        alpha: 0,
        fadeOut: !1,
        end: !1,
        zIndex: 3E3,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.fadeOut || (this.alpha = 1)
        },
        update: function() {
            if (!this.end)
                if (this.fadeOut) {
                    var b = this.alpha + 0.06;
                    1 > b ? this.alpha = b : (this.alpha = 1, this.end = !0, this.callback(), this.kill())
                } else b = this.alpha - 0.07, 0 < b ? this.alpha = b : (this.alpha = 0, this.end = !0, this.kill())
        },
        draw: function() {
            ig.system.context.save();
            ig.system.context.globalAlpha = this.alpha;
            ig.system.context.fillStyle = "#000";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height);
            ig.system.context.globalAlpha = 1;
            ig.system.context.restore()
        },
        callback: function() {}
    })
});
ig.baked = !0;
ig.module("game.entities.plain").requires("impact.entity").defines(function() {
    EntityPlain = ig.Entity.extend({
        sc: 1,
        sheetX: 1,
        sheetY: 1,
        gravityFactor: 0,
        clearColor: null,
        tweening: !1,
        soloLayer: !1,
        targetPointIndex: 0,
        layerIndex: 0,
        which: 0,
        size: {
            x: 50,
            y: 50
        },
        halfSize: {
            x: 50,
            y: 50
        },
        oriPos: {
            x: 0,
            y: 0
        },
        center: {
            x: 0,
            y: 0
        },
        ctxRef: null,
        angle: 0,
        zIndex: 1,
        editable: !1,
        zIndex: 1005,
        halfWidth: 270,
        halfHeight: 480,
        init: function(b, c, d) {
            var f = this.preStat(b, c, d);
            f && (b = f.x, c = f.y);
            this.parent(b, c, d);
            this.postStat(b, c, d)
        },
        starPattern: function(b, c, d, f, e) {
            this.drawShape(b, c, d, f, e, this.starShape)
        },
        drawShape: function(b, c, d, f, e, g) {
            b.save();
            this.translate(c, d);
            b.rotate(e);
            c = 0.5 * -f;
            d = 0.5 * -f;
            b.beginPath();
            for (e = 0; e < g.length; e++) 0 == e ? b.moveTo(Math.floor(c + g[e][0] * f), Math.floor(d + g[e][1] * f)) : b.lineTo(Math.floor(c + g[e][0] * f), Math.floor(d + g[e][1] * f));
            b.fill();
            b.closePath();
            b.restore()
        },
        preStat: function(b, c, d) {
            ig.merge(this, d);
            this.im && (this.size.x = this.im.width / this.sheetX, this.size.y = this.im.height / this.sheetY);
            !0 == d.centerize && (b -= 0.5 * this.size.x, c -= 0.5 * this.size.y);
            d.rot && (this.angle = d.rot / 180 * Math.PI);
            !0 == this.editable && (this.im && (void 0 == d.size && (d.size = {}), d.size.x = this.im.width / this.sheetX, d.size.y = this.im.height / this.sheetY, this.size.x = this.im.width / this.sheetX, this.size.y = this.im.height / this.sheetY, this.pos.x = b, this.pos.y = c), ig.global.wm ? this.convertToPointFormat(this, d) : this.convertToBox2DFormat(this, d));
            return {
                x: b,
                y: c
            }
        },
        postStat: function(b, c) {
            !0 == this.editable && (this.getBorder(), this.oriPos.x = b, this.oriPos.y = c);
            this.ctx = ig.system.context
        },
        ReportFixture: function(b) {
            this.mouseBody = b.body
        },
        getBodyAt: function(b, c) {
            new b2Vec2(b, c);
            var d = new b2AABB;
            d.lowerBound.Set(b - 0.001, c - 0.001);
            d.upperBound.Set(b + 0.001, c + 0.001);
            return ig.world.QueryAABB(this, d)
        },
        convertToBox2DFormat: function(b, c) {
            if (!1 != this.editable) {
                this.vertices = [];
                this.convertToPointFormat(this, c);
                this.getBorder();
                this.center = {
                    x: Math.floor(this.pos.x + 0.5 * this.size.x),
                    y: Math.floor(this.pos.y + 0.5 * this.size.y)
                };
                for (var d = 0; d < this.points.length; d++) {
                    var f = this.points[d];
                    this.vertices[d] = [];
                    for (var e = 0; e < f.length; e++) {
                        var g = f[e];
                        this.vertices[d].push({
                            x: (g.x - this.center.x) * Box2D.SCALE * this.sc,
                            y: (g.y - this.center.y) * Box2D.SCALE * this.sc
                        })
                    }
                }
            }
        },
        convertToPointFormat: function(b, c) {
            if (!1 != this.editable && (this.getBorder(), c.wmPoints)) {
                for (var d = c.wmPoints + ""; - 1 < d.indexOf("'");) d = d.replace("'", '"');
                b.points = JSON.parse(d)
            }
        },
        convertToWmFormat: function(b, c) {
            if (c) {
                for (b._wmSettings.wmPoints = JSON.stringify(c); - 1 < b._wmSettings.wmPoints.indexOf('"');) b._wmSettings.wmPoints = b._wmSettings.wmPoints.replace('"', "'");
                ig.game.entities.loadEntitySettings()
            }
        },
        checkTutorial: function(b) {
            !ig.global.wm && !1 == ig.game.sessionData.tutorial[b] && (ig.game.sessionData.tutorial[b] = !0, ig.game.saveAll(), this.showTut = b, ig.game.showTut = !0)
        },
        getBorder: function(b, c, d) {
            if (this.im) b && c && (this.pos.x = b, this.pos.y = c, this.oriPos.x = b, this.oriPos.y = c), this.size.x = this.im.width / this.sheetX, this.size.y = this.im.height / this.sheetY, this._wmSettings && (this._wmSettings.size = {
                x: this.size.x,
                y: this.size.y
            }), d && (d.size = {
                x: this.size.x,
                y: this.size.y
            });
            else if (0 == this.points.length) this.size.x = 50, this.size.y = 50;
            else {
                b = 960;
                c = 0;
                for (var f = 540, e = 0, g = 0; g < this.points.length; g++) {
                    var m = this.points[g];
                    if (m)
                        for (var p = 0; p < m.length; p++) {
                            var j = this.points[g][p];
                            j.x < b && (b = Math.floor(j.x));
                            j.x > c && (c = Math.floor(j.x));
                            j.y < f && (f = Math.floor(j.y));
                            j.y > e && (e = Math.floor(j.y))
                        }
                }
                this.pos.x = b;
                this.size.x = c - b;
                this.pos.y = f;
                this.size.y = e - f;
                this._wmSettings && (this._wmSettings.size = {
                    x: this.size.x,
                    y: this.size.y
                });
                d && (d.size = {
                    x: this.size.x,
                    y: this.size.y
                })
            }
        },
        rotatePoint: function(b, c, d, f, e) {
            var g = e * Math.PI / 180;
            Math.sqrt(d * d + f * f);
            e = Math.cos(g);
            g = Math.sin(g);
            return {
                x: d * e - f * g + b,
                y: d * g + f * e + c
            }
        },
        wmClick: function() {
            if (!1 != this.editable) {
                this.holder = {
                    x: ig.game.entities.selector.pos.x + 0,
                    y: ig.game.entities.selector.pos.y + 0,
                    points: []
                };
                this.holder.points = this.deepCopy(this.points);
                var b = this.targetPointIndex + 0;
                ig.game.editor.target = this;
                var c = ig.game.editor.getPoint();
                c && (this.layerIndex = c.layer, this.targetPointIndex = c.index);
                "rect" != ig.game.editor.editMode && (void 0 == this.targetPointIndex ? (this.targetPointIndex = this.points[this.layerIndex].length - 1, ig.game.editor.setModeIndex(0)) : "vertices" != ig.game.editor.editMode || b != this.targetPointIndex ? ig.game.editor.setMode("vertices") : ig.game.editor.setModeIndex(0))
            }
        },
        moveTo: function(b, c) {
            this.ctx.moveTo((b - ig.game.screen.x) * ig.system.scale, (c - ig.game.screen.y) * ig.system.scale)
        },
        lineTo: function(b, c) {
            this.ctx.lineTo((b - ig.game.screen.x) * ig.system.scale, (c - ig.game.screen.y) * ig.system.scale)
        },
        arc: function(b, c, d, f, e) {
            this.ctx.arc((b - ig.game.screen.x) * ig.system.scale, (c - ig.game.screen.y) * ig.system.scale, d * ig.system.scale, f, e)
        },
        bezierCurveTo: function(b, c, d, f, e, g, m) {
            void 0 == m && (m = this.ctx);
            var p = ig.game.screen.x,
                j = ig.game.screen.y,
                n = ig.system.scale;
            m.bezierCurveTo((b - p) * n, (c - j) * n, (d - p) * n, (f - j) * n, (e - p) * n, (g - j) * n)
        },
        quadraticCurveTo: function(b, c, d, f, e) {
            void 0 == e && (e = this.ctx);
            var g = ig.game.screen.x,
                m = ig.game.screen.y,
                p = ig.system.scale;
            e.quadraticCurveTo((b - g) * p, (c - m) * p, (d - g) * p, (f - m) * p)
        },
        circle: function(b, c, d) {
            this.arc(b, c, d, 0, 2 * Math.PI)
        },
        strokeRect: function(b, c, d, f) {
            this.ctx.strokeRect((b - ig.game.screen.x) * ig.system.scale, (c - ig.game.screen.y) * ig.system.scale, d * ig.system.scale, f * ig.system.scale)
        },
        fillRect: function(b, c, d, f) {
            this.ctx.fillRect((b - ig.game.screen.x) * ig.system.scale, (c - ig.game.screen.y) * ig.system.scale, d * ig.system.scale, f * ig.system.scale)
        },
        drawImage: function(b, c, d, f, e, g, m, p, j) {
            this.ctx.drawImage(b.data, c * ig.system.scale, d * ig.system.scale, f * ig.system.scale, e * ig.system.scale, g * ig.system.scale, m * ig.system.scale, p * ig.system.scale, j * ig.system.scale)
        },
        translate: function(b, c) {
            this.ctx.translate((b - ig.game.screen.x) * ig.system.scale, (c - ig.game.screen.y) * ig.system.scale)
        },
        wmMovePoint: function() {
            !1 != this.editable && ig.game.editor.target == this && "vertices" == ig.game.editor.editMode && (this.points[this.layerIndex] && this.points[this.layerIndex][this.targetPointIndex] && (this.points[this.layerIndex][this.targetPointIndex].x = this.pos.x, this.points[this.layerIndex][this.targetPointIndex].y = this.pos.y), this.convertToWmFormat(this, this.points))
        },
        wmDrag: function() {
            if (!1 != this.editable) {
                var b = ig.input.mouse.x + ig.game.screen.x - this.holder.x,
                    c = ig.input.mouse.y + ig.game.screen.y - this.holder.y;
                "vertices" == ig.game.editor.editMode && this.wmMovePoint();
                "rect" == ig.game.editor.editMode && this.wmMoveRect(b, c);
                this.convertToWmFormat(this, this.points)
            }
        },
        drawSelectorPoints: function(b) {
            var c = this.points[b];
            if (c)
                for (var d = 0; d < c.length; d++) {
                    var f = this.points[b][d];
                    ig.game.editor.target == this ? d == this.targetPointIndex && b == this.layerIndex ? (this.ctx.fillStyle = "lime", this.ctx.strokeStyle = "lime") : b == this.layerIndex ? (this.ctx.fillStyle = "cyan", this.ctx.strokeStyle = "cyan") : (this.ctx.fillStyle = "yellow", this.ctx.strokeStyle = "yellow") : (this.ctx.fillStyle = "white", this.ctx.strokeStyle = "white");
                    this.fillRect(f.x - 2, f.y - 2, 4, 4);
                    this.strokeRect(f.x - 5, f.y - 5, 10, 10)
                }
        },
        drawEditorLines: function(b) {
            var c = this.points[b];
            if (c && 1 < c.length) {
                for (var d = 0; d < c.length; d++) {
                    var f = c[d];
                    0 == d ? this.moveTo(f.x, f.y) : this.lineTo(f.x, f.y)
                }
                b == this.layerIndex ? (this.ctx.fillStyle = "cyan", this.ctx.strokeStyle = "cyan") : (this.ctx.fillStyle = "yellow", this.ctx.strokeStyle = "yellow");
                this.ctx.closePath();
                this.ctx.stroke()
            }
        },
        drawEditorPoints: function() {
            if (!1 != this.editable) {
                this.ctx.save();
                if (ig.game.editor && ig.game.editor.target == this)
                    if (!0 == this.soloLayer) {
                        var b = this.layerIndex;
                        this.drawSelectorPoints(b)
                    } else
                        for (b = 0; b < this.points.length; b++) this.drawSelectorPoints(b);
                this.ctx.beginPath();
                if (!0 == this.soloLayer) b = this.layerIndex, this.drawEditorLines(b);
                else
                    for (b = 0; b < this.points.length; b++) this.drawEditorLines(b);
                this.ctx.fillStyle = "white";
                this.ctx.strokeStyle = "white";
                this.strokeRect(this.pos.x, this.pos.y, this.size.x, this.size.y);
                this.center.x = this.pos.x + 0.5 * this.size.x;
                this.center.y = this.pos.y + 0.5 * this.size.y;
                this.ctx.fillStyle = "hotpink";
                this.ctx.strokeStyle = "hotpink";
                this.fillRect(this.center.x - 2, this.center.y - 2, 4, 4);
                this.strokeRect(this.center.x - 10, this.center.y - 10, 20, 20);
                this.textDraw({
                    tx: this.layerIndex,
                    px: 20 * ig.system.scale,
                    x: (this.center.x - ig.game.screen.x) * ig.system.scale,
                    y: (this.center.y - ig.game.screen.y) * ig.system.scale,
                    col: "white"
                });
                this.ctx.restore()
            }
        },
        wmMoveRect: function(b, c) {
            if (ig.game.entities.selectedEntity == this && ig.game.editor.target == this && "rect" == ig.game.editor.editMode && this.holder.x && this.holder.y)
                for (var d = 0; d < this.points.length; d++) {
                    var f = this.points[d];
                    if (f)
                        for (var e = 0; e < f.length; e++) {
                            var g = f[e];
                            g.x = this.holder.points[d][e].x + b;
                            g.y = this.holder.points[d][e].y + c
                        }
                }
            this.oriPos.x = this.pos.x;
            this.oriPos.y = this.pos.y
        },
        aabbCheck: function(b, c) {
            void 0 == c.w && (c.w = 2);
            void 0 == c.h && (c.h = 2);
            return b.x + b.w > c.x && b.x < c.x + c.w && b.y + b.h > c.y && b.y < c.y + c.h ? !0 : !1
        },
        pointCheck: function(b, c) {
            return b.x >= c.pos.x && b.x <= c.pos.x + c.size.x && b.y >= c.pos.y && b.y <= c.pos.y + c.size.y ? !0 : !1
        },
        drawTutorial: function(b, c, d, f, e) {
            if (!ig.global.wm && !1 != ig.game.showTut) {
                var g = ig.game.getEntitiesByType(EntityGameControl)[0];
                f = 23;
                if (!ig.global.wm && null != this.showTut) {
                    this.textSet(f);
                    var m = 0.95 * this.ctx.measureText("WW").width;
                    b = _TEXT.Tutorial[b];
                    b = b.desktop ? ig.ua.mobile ? b.mobile.split("\n") : b.desktop.split("\n") : b.split("\n");
                    for (var p = 0; p < b.length; p++) this.textDraw({
                        tx: b[p],
                        x: c,
                        y: d + p * m,
                        align: e,
                        col: "#fff22f",
                        stroke: !0,
                        alp: g.tutAlp,
                        strokeAlp: g.tutAlp,
                        strokeColour: "#7c2620",
                        strokeLine: 6,
                        px: f
                    })
                }
            }
        },
        checkDirection: function(b, c) {
            var d = {
                    x: 0,
                    y: 0
                },
                f = this.vec(d, c),
                d = this.vec(d, {
                    x: b.x,
                    y: b.y
                });
            return this.dot(this.normalize(f), this.normalize(d))
        },
        placeEvenly: function(b, c, d, f, e) {
            var g = c + c * d;
            return b - 0.5 * (g * f - c * d) + e * g
        },
        createRotateJoint: function(b, c, d) {
            var f = new b2RevoluteJointDef;
            f.bodyA = this.body;
            f.bodyB = b.body;
            f.collideConnected = !1;
            c && (f.localAnchorA = new b2Vec2(c.x, c.y));
            d && (f.localAnchorB = new b2Vec2(d.x, d.y));
            f.referenceAngle = 0;
            return ig.world.CreateJoint(f)
        },
        createRotateJoint2: function(b, c, d, f) {
            c = new b2RevoluteJointDef;
            c.collideConnected = !1;
            c.bodyA = b.body;
            c.bodyB = this.body;
            c.localAnchorA = new b2Vec2(0, 0);
            c.localAnchorB = new b2Vec2(0, 0);
            d && (c.localAnchorA = new b2Vec2(d.x, d.y));
            f && (c.localAnchorB = new b2Vec2(f.x, f.y));
            return ig.world.CreateJoint(c)
        },
        createMotorRotateJoint: function(b, c, d, f) {
            var e = new b2RevoluteJointDef;
            e.collideConnected = !1;
            e.bodyA = b.body;
            e.bodyB = this.body;
            e.localAnchorA = new b2Vec2(0, 0);
            e.localAnchorB = new b2Vec2(0, 0);
            d && (e.localAnchorA = new b2Vec2(d.x, d.y));
            f && (e.localAnchorB = new b2Vec2(f.x, f.y));
            e.motorSpeed = c;
            e.maxMotorTorque = 1E13;
            e.enableMotor = !0;
            return ig.world.CreateJoint(e)
        },
        getCenter: function() {
            null == this.center && (this.center = {});
            this.center.x = this.pos.x + 0.5 * this.size.x;
            this.center.y = this.pos.y + 0.5 * this.size.y;
            return this.center
        },
        checkLastFrame: function(b, c) {
            void 0 == c && (c = 1);
            return this.currentAnim === this.anims[b] && this.currentAnim.frame == this.anims[b].sequence.length - c ? !0 : !1
        },
        checkFlip: function() {
            this.flip != this.currentAnim.flip.x && (this.currentAnim.flip.x = this.flip)
        },
        move: function() {
            if (this.targetX)
                if (this.targetPos.x != Math.round(this.pos.x) || this.targetPos.y != Math.round(this.pos.y)) {
                    var b = this.targetPos.x - this.pos.x,
                        c = this.targetPos.y - this.pos.y;
                    Math.abs(b) > this.maxSpeed && (b = b / Math.abs(b) * this.maxSpeed);
                    Math.abs(c) > this.maxSpeed && (c = c / Math.abs(c) * this.maxSpeed);
                    this.pos.x += b;
                    this.pos.y += c
                } else this.toggleTarget()
        },
        setHitArea: function() {
            this.hitArea = {};
            this.hitArea.w = (this.hitAreaPercent.maxX - this.hitAreaPercent.minX) * this.size.x;
            this.hitArea.h = (this.hitAreaPercent.maxY - this.hitAreaPercent.minY) * this.size.y;
            this.hitArea.minY = this.hitAreaPercent.minY * this.size.y;
            this.hitArea.maxY = this.hitAreaPercent.maxY * this.size.y;
            !0 == this.flip ? (this.hitArea.minX = this.hitAreaPercent.minX * this.size.x, this.hitArea.maxX = this.hitAreaPercent.maxX * this.size.x) : (this.hitArea.minX = (1 - this.hitAreaPercent.maxX) * this.size.x, this.hitArea.maxX = (1 - this.hitAreaPercent.minX) * this.size.x)
        },
        drawLine: function(b, c, d) {
            void 0 == d && (d = "pink");
            this.ctx.save();
            this.ctx.strokeStyle = d;
            this.ctx.lineWidth = 3;
            this.ctx.beginPath();
            this.ctx.moveTo(b.x, b.y);
            this.ctx.lineTo(c.x, c.y);
            this.ctx.stroke();
            this.ctx.restore()
        },
        update: function() {
            ig.global.wm || (this.parent(), this.getCenter())
        },
        normalize: function(b) {
            var c = this.mag(b);
            return {
                x: b.x / c,
                y: b.y / c
            }
        },
        getLineWidth: function(b, c) {
            var d = this.vec(b, c);
            return this.mag(d)
        },
        getLine: function() {
            this.getCenter();
            this.startPoint = {
                x: this.center.x + 0.5 * Math.cos(this.currentAnim.angle + 0.5 * Math.PI) * this.size.y,
                y: this.center.y + 0.5 * Math.sin(this.currentAnim.angle + 0.5 * Math.PI) * this.size.y
            };
            this.endPoint = {
                x: this.center.x + 0.5 * Math.cos(this.currentAnim.angle + 1.5 * Math.PI) * this.size.y,
                y: this.center.y + 0.5 * Math.sin(this.currentAnim.angle + 1.5 * Math.PI) * this.size.y
            };
            this.lineWidth = this.getLineWidth(this.startPoint, this.endPoint);
            this.lineVector = this.vec(this.startPoint, this.endPoint)
        },
        closestPointOnLine: function(b, c, d) {
            d = {
                x: d.x - b.x,
                y: d.y - b.y
            };
            c = {
                x: c.x - b.x,
                y: c.y - b.y
            };
            return {
                x: b.x + this.dot(d, c) / this.dot(c, c) * c.x,
                y: b.y + this.dot(d, c) / this.dot(c, c) * c.y
            }
        },
        offsetRotatePoint: function(b, c, d, f) {
            var e = c.x - b.x,
                g = c.y - b.y;
            c = this.dist(b, c);
            d /= c;
            f = this.rotateVector({
                x: e * d,
                y: g * d
            }, f);
            return {
                x: b.x + f.x,
                y: b.y + f.y
            }
        },
        getLinePercent: function(b, c, d) {
            return {
                x: b.x + (c.x - b.x) * d,
                y: b.y + (c.y - b.y) * d
            }
        },
        project: function(b, c, d) {
            var f = d.x - c.x,
                e = d.y - c.y,
                g = (b.x - c.x) * f + (b.y - c.y) * e,
                m = g / (f * f + e * e),
                g = (d.x - c.x) * (b.y - c.y) - (d.y - c.y) * (b.x - c.x);
            return {
                point: {
                    x: c.x + f * m,
                    y: c.y + e * m
                },
                left: 1 > g,
                dot: g,
                t: m
            }
        },
        rotateVector: function(b, c) {
            var d = Math.cos(c),
                f = Math.sin(c);
            return {
                x: b.x * d - b.y * f,
                y: b.x * f + b.y * d
            }
        },
        dist: function(b, c) {
            var d = b.x - c.x,
                f = b.y - c.y;
            return Math.sqrt(d * d + f * f)
        },
        getTargetPercent: function(b, c) {
            return c / b
        },
        mag: function(b) {
            return Math.sqrt(b.x * b.x + b.y * b.y)
        },
        vec: function(b, c) {
            return {
                x: c.x - b.x,
                y: c.y - b.y
            }
        },
        dot: function(b, c) {
            return b.x * c.x + b.y * c.y
        },
        deepCopy: function(b) {
            return JSON.parse(JSON.stringify(b))
        },
        soundCheck: function(b) {
            if (11 != ig.soundHandler.ie && ig.soundHandler.sfxPlayer.soundList[b]) try {
                return ig.soundHandler.sfxPlayer.soundList[b]._sounds[0]._ended
            } catch (c) {
                console.log(c)
            }
        },
        sounder: function(b) {
            if (11 != ig.soundHandler.ie) try {
                ig.soundHandler.sfxPlayer.play(b)
            } catch (c) {}
        },
        stopSound: function(b) {
            if (11 != ig.soundHandler.ie) try {
                ig.soundHandler.sfxPlayer.stop(b)
            } catch (c) {
                console.log(c)
            }
        },
        setSheet: function() {
            this.animSheet = new ig.AnimationSheet(this.im.path, this.im.width / this.sheetX, this.im.height / this.sheetY)
        },
        setIdle: function() {
            this.animSheet = new ig.AnimationSheet(this.im.path, this.im.width / this.sheetX, this.im.height / this.sheetY);
            this.addAnim("idle", 0.03, [0], !0);
            this.currentAnim = this.anims.idle
        },
        abCheck: function(b) {
            var c = ig.game.getEntitiesByType(EntityPointer)[0];
            return c.pos.x > b.pos.x && c.pos.y > b.pos.y && c.pos.x < b.pos.x + b.size.x && c.pos.y < b.pos.y + b.size.y ? !0 : !1
        },
        setSize: function() {
            this.size.x = this.im.width / this.sheetX;
            this.size.y = this.im.height / this.sheetY;
            this.halfSize.x = 0.5 * this.size.x;
            this.halfSize.y = 0.5 * this.size.y
        },
        setAnim: function() {
            var b = 0,
                c;
            for (c in this.sheets) {
                var d = this.sheets[c];
                d.startFrame = b;
                null == d.time && (d.time = 0.05);
                null == d.stop && (d.stop = !1);
                null == d.totalF && (d.totalF = 1);
                for (var f = [], e = 0; e < d.totalF; e++) f.push(b + e);
                b += d.totalF;
                this.addAnim(c, d.time, f, d.stop);
                !0 == this.flip && (this.anims[c].flip.x = !0);
                this.rot && (this.anims[c].angle = this.rot)
            }
        },
        setSheet: function() {
            this.size.x = this.im.width / this.sheetX;
            this.size.y = this.im.height / this.sheetY;
            this.animSheet = new ig.AnimationSheet(this.im.path, this.size.x, this.size.y)
        },
        getDistance: function(b, c) {
            var d = b.x - c.x,
                f = b.y - c.y;
            return Math.sqrt(d * d + f * f)
        },
        getPos: function() {
            console.log(this.pointer.pos.x, this.pointer.pos.y)
        },
        setPulleyJoint: function(b, c, d, f) {
            d = new Box2D.Common.Math.b2Vec2(d.x, d.y);
            f = new Box2D.Common.Math.b2Vec2(f.x, f.y);
            var e = new Box2D.Dynamics.Joints.b2PulleyJointDef;
            e.Initialize(b, c, d, f, b.GetWorldCenter(), c.GetWorldCenter(), 1);
            this.world.CreateJoint(e)
        },
        posXY: function(b) {
            b.pos.x = this.pointer.pos.x;
            b.pos.y = this.pointer.pos.y;
            console.log(this.pos.x, this.pos.y)
        },
        resetFrame: function(b) {
            this[b].ended = !1;
            this[b].frame = 0
        },
        runAnim: function(b) {
            void 0 == this[b] && (this[b] = {});
            this[b].ended = this[b].ended || !1;
            this[b].loop = this[b].loop || !1;
            this[b].frame = this[b].frame || 0;
            this[b].frameTimer = this[b].frameTimer || new ig.Timer;
            this[b].frameTime = this[b].frameTime || 0.03;
            !0 != this[b].ended && (!1 == this[b].loop && this[b].frame == this[b].frames.length - 1 ? (this[b].ended = !0, this.done && this.done(b)) : 1 < this[b].frames.length && this[b].frameTimer.delta() > this[b].frameTime && (this[b].frameTimer.reset(), this[b].frame = (this[b].frame + 1) % this[b].frames.length))
        },
        bodyFollowTween: function() {
            if (!0 == this.onTrack) {
                var b = this.body.GetPosition();
                b.x = this.knotPos.x * Box2D.SCALE;
                b.y = this.knotPos.y * Box2D.SCALE;
                this.body.SetTransform(b, this.body.GetAngle());
                b = this.body.GetPosition();
                this.pos = {
                    x: b.x / Box2D.SCALE - this.size.x / 2,
                    y: b.y / Box2D.SCALE - this.size.y / 2
                };
                this.angle = this.body.GetAngle().round(2)
            }
        },
        tweener: function(b, c, d, f, e, g) {
            var m = {};
            m[b] = c;
            null == e && (e = 0);
            null == f && (f = "none");
            this.tween("this" == b ? c : m, d, {
                delay: e,
                targ: b,
                seq: f,
                onComplete: function() {
                    null != f && this.tweenF(f, b, g)
                }.bind(this),
                easing: ig.Tween.Easing.Sinusoidal.EaseOut
            }).start()
        },
        tweener2: function(b, c, d, f, e) {
            var g = {};
            g[b] = c;
            null == e && (e = 0);
            null == f && (f = "none");
            this.tween("this" == b ? c : g, d, {
                delay: e,
                targ: b,
                seq: f,
                onComplete: function() {
                    null != f && this.tweenF(f, b)
                }.bind(this),
                easing: ig.Tween.Easing.Linear.EaseNone
            }).start()
        },
        tweener3: function(b, c, d, f, e, g) {
            var m = {};
            m[b] = c;
            null == e && (e = 0);
            null == f && (f = "none");
            this.tween("this" == b ? c : m, d, {
                delay: e,
                targ: b,
                seq: f,
                onComplete: function() {
                    null != f && this.tweenF(f, b)
                }.bind(this),
                easing: g
            }).start()
        },
        sizer: function(b, c, d, f, e, g, m, p) {
            this.size.x = b.width / c * this.base.oriSc + (m || 0);
            this.size.y = b.height / d * this.base.oriSc + (p || 0);
            !0 == g ? (this.pos.x = f - this.size.x / 2, this.pos.y = e - this.size.y / 2) : (this.pos.x = f, this.pos.y = e)
        },
        ctxDrawer: function(b) {
            var c = b.ctx || ig.system.context,
                d = b.offX || 0,
                f = b.offY || 0,
                e = b.cent || !1,
                g = null == b.scX ? 1 : b.scX,
                m = null == b.flipX ? 1 : b.flipX,
                p = null == b.flipY ? 1 : b.flipY,
                j = null == b.scY ? 1 : b.scY,
                n = null == b.alp && 0 != b.alp ? 1 : b.alp,
                r = null == b.rot ? 0 : b.rot,
                q = b.sx,
                s = b.sy,
                t = b.sw,
                u = b.sh,
                x = t * g,
                z = u * j;
            if (!(0 >= n))
                if (0 < r || 0 > g || 0 > j) {
                    var C = b.x,
                        O = b.y,
                        d = e ? -t / 2 + d : d || 0,
                        f = e ? -u / 2 + f : f || 0;
                    0 < t && 0 < u && (c.save(), c.translate(C, O), c.scale(g * m, j * p), c.rotate(2 * Math.PI / 360 * r), c.globalAlpha = n, c.drawImage(b.pic, q, s, t, u, d, f, t, u), c.restore())
                } else C = e ? b.x - x / 2 + d : b.x + d, O = e ? b.y - z / 2 + f : b.y + f, 0 < t && 0 < u && (c.globalAlpha = n, c.drawImage(b.pic, q, s, t, u, C, O, x, z), c.globalAlpha = 1)
        },
        scaleVertices: function(b) {
            for (var c = 0; c < b.length; c++)
                for (var d = 0; d < b[c].length; d++) b[c][d].x *= this.sc, b[c][d].y *= this.sc
        },
        frameDrawer: function(b) {
            var c = b.ctx || ig.system.context,
                d = b.offX || 0,
                f = b.offY || 0,
                e = b.cent || !1,
                g = null == b.scX ? 1 : b.scX,
                m = null == b.scY ? 1 : b.scY,
                p = null == b.alp && 0 != b.alp ? 1 : b.alp,
                j = null == b.rot ? 0 : b.rot,
                n = b.frame.x,
                r = b.frame.y,
                q = b.frame.w,
                s = b.frame.h,
                t = q * g,
                u = s * m;
            if (!(0 >= p))
                if (0 < j || 0 > g || 0 > m) {
                    var x = b.x,
                        z = b.y,
                        d = e ? -q / 2 + d : d || 0,
                        f = e ? -s / 2 + f : f || 0;
                    0 < q && 0 < s && (c.save(), c.translate(x, z), c.scale(g, m), c.rotate(2 * Math.PI / 360 * j), c.globalAlpha = p, c.drawImage(b.pic, n, r, q, s, d, f, q, s), c.restore())
                } else x = e ? b.x - t / 2 + d : b.x + d, z = e ? b.y - u / 2 + f : b.y + f, 0 < q && 0 < s && (c.globalAlpha = p, c.drawImage(b.pic, n, r, q, s, x, z, t, u), c.globalAlpha = 1)
        },
        quickDraw: function(b) {
            !0 == this[b].animate && !1 == this.main.gamePaused && this.runAnim(b);
            this.drawer({
                pic: this[b].im,
                x: this[b].x,
                y: this[b].y,
                frameX: this[b].frameX,
                frameY: this[b].frameY,
                frame: !1 == this.checkFrame(b) ? 0 : this[b].frames[this[b].frame],
                cent: this[b].cent,
                rot: void 0 == this[b].rot ? this.rot : this[b].rot,
                offX: this[b].off.x,
                offY: this[b].off.y,
                scX: this.scX * this[b].scX,
                scY: this.scY * this[b].scY
            })
        },
        drawer: function(b) {
            var c = null == b.alp && 0 != b.alp ? 1 : b.alp,
                d = null == b.scX ? 1 : b.scX,
                f = null == b.scY ? 1 : b.scY,
                e = null == b.flipX ? 1 : b.flipX,
                g = null == b.flipY ? 1 : b.flipY;
            if (!(0 == c || 0 == d || 0 == f)) {
                var m = b.ctx || ig.system.context,
                    p = b.offX || 0,
                    j = b.offY || 0,
                    n = b.cent || !1,
                    r = null == b.rot ? 0 : b.rot,
                    q = b.frameX || 1,
                    s = b.frameY || 1,
                    t = b.frame || 0,
                    u = b.pic.width / q * (t % q),
                    t = b.pic.height / s * Math.floor(t / q),
                    x = b.pic.width / q,
                    z = b.pic.height / s,
                    q = b.pic.width / q * d,
                    s = b.pic.height / s * f,
                    p = p * x,
                    j = j * z;
                0 >= c || (q = n ? b.x - q / 2 + p : b.x + p, n = n ? b.y - s / 2 + j : b.y + j, 0 != p && (p = -p), 0 != j && (j = -j), 0 < x && 0 < z && (m.save(), m.translate((q - ig.game.screen.x) * ig.system.scale, (n - ig.game.screen.y) * ig.system.scale), m.scale(d, f), m.rotate(b.rad ? b.rad : 2 * Math.PI / 360 * r), m.scale(e, g), m.globalAlpha = c, m.drawImage(b.pic.data, Math.floor(u) * ig.system.scale, Math.floor(t) * ig.system.scale, Math.floor(x) * ig.system.scale, Math.floor(z) * ig.system.scale, Math.floor(p) * ig.system.scale, Math.floor(j) * ig.system.scale, Math.floor(x) * ig.system.scale, Math.floor(z) * ig.system.scale), m.restore()))
            }
        },
        textSet: function(b, c, d, f) {
            void 0 != b && (this.ctxRef = f = f || ig.system.context, f.font = b + "px " + (d || "fire"), c && (f.fillStyle = c))
        },
        textW: function(b, c) {
            this.textSet(c);
            var d = d || ig.system.context;
            return Math.floor(d.measureText(b).width)
        },
        textMax: function(b) {
            this.textSet(b.px, "white");
            return this.textW(b.tx) > b.maxWidth ? b.maxWidth / this.textW(b.tx) : 1
        },
        textDraw: function(b) {
            var c = b.rot ? b.rot : 0,
                d = b.tx ? b.tx : 0,
                f = b.x ? b.x : 0,
                e = b.y ? b.y : 0,
                g = void 0 == b.scX ? 1 : b.scX,
                m = void 0 == b.scY ? 1 : b.scY,
                p = void 0 == b.scX ? 1 : b.scX,
                j = void 0 == b.scY ? 1 : b.scY,
                n = b.stroke ? b.stroke : !1,
                r = void 0 == b.strokeAlp ? 1 : b.strokeAlp,
                q = b.strokeColour ? b.strokeColour : "black",
                s = void 0 == b.alp ? 1 : b.alp,
                t = b.col ? b.col : this.ctx.fillStyle,
                u = b.font || "fire",
                x = b.px || 10,
                z = b.strokeLine || 3,
                C = b.followScreen || !0,
                O = b.align || "center";
            if (0 != s) {
                var H = b.ctx || ig.system.context;
                this.ctxRef = b.ctx || ig.system.context;
                H.font = x + "px " + u;
                void 0 != b.maxWidth && this.textW(d) * g > b.maxWidth && (p = b.maxWidth / this.textW(d), j = m / g * p);
                "left" == O ? f += 0.5 * this.textW(d) * p : "right" == O && (f -= 0.5 * this.textW(d) * p);
                H.save();
                b = H.measureText("M").width * j;
                !0 == C ? H.translate((f - ig.game.screen.x) * ig.system.scale, (e - ig.game.screen.y) * ig.system.scale) : H.translate(f, e);
                H.scale(p, j);
                H.rotate(c ? 2 * Math.PI / 360 * c : 0);
                c = 0.4 * b;
                H.textBaseline = "alphabetic";
                !0 == n && (H.fillStyle = q, H.globalAlpha = r, H.lineWidth = z, H.lineCap = "round", H.lineJoin = "round", H.strokeStyle = q, H.strokeText(d, -this.textW(d) / 2, c + 0.05 * x), H.fillText(d, -this.textW(d) / 2, c + 0.05 * x), H.strokeText(d, -this.textW(d) / 2, c), H.fillText(d, -this.textW(d) / 2, c));
                H.fillStyle = t;
                H.globalAlpha = s;
                H.fillText(d, -this.textW(d) / 2, c);
                H.restore()
            }
        },
        checkStorage: function() {
            try {
                return localStorage.setItem("test", "test"), localStorage.removeItem("test"), "localStorage" in window && null !== window.localStorage
            } catch (b) {
                return !1
            }
        },
        shuffleArray: function(b) {
            for (var c = b.length, d, f; 0 < c;) f = Math.floor(Math.random() * c), c--, d = b[c], b[c] = b[f], b[f] = d;
            return b
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.ring").requires("impact.entity", "game.entities.ori.pointer", "game.entities.plain").defines(function() {
    EntityRing = EntityPlain.extend({
        size: {
            x: 50,
            y: 50
        },
        scX: 0,
        scY: 0,
        alp: 1,
        growSize: 1.52,
        im: new ig.Image("media/graphics/sprites/ui/ring.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.ctx = ig.system.context;
            ig.global.wm || (this.tweenF("grow"), ig.game.sortEntitiesDeferred())
        },
        tweenF: function(b) {
            switch (b) {
                case "grow":
                    this.tweener("this", {
                        scX: this.growSize,
                        scY: this.growSize,
                        alp: 0
                    }, 0.3, "die");
                    break;
                case "die":
                    this.kill()
            }
        },
        draw: function() {
            this.parent();
            this.drawer({
                pic: this.im,
                x: this.pos.x,
                y: this.pos.y,
                scX: this.scX,
                scY: this.scY,
                frameX: this.sheetX,
                frame: this.frame,
                offX: 0.5,
                offY: 0.5,
                alp: this.alp
            })
        },
        update: function() {
            this.parent()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button").requires("impact.entity", "game.entities.gentities.ring").defines(function() {
    EntityButton = ig.Entity.extend({
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.A,
        fillColor: null,
        layer: 0,
        isClicked: !1,
        scale: {
            x: 1,
            y: 1
        },
        animImage: new ig.Image("media/graphics/sprites/ui/bt-play.png"),
        enabled: !0,
        isShown: !0,
        withText: !1,
        isHandled: !0,
        anchor: {
            x: 0.5,
            y: 0
        },
        buttonText: "",
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setAnim();
            this.setAnchor(this.anchor.x, this.anchor.y);
            this.layer = ig.game.currentLayer;
            this.scaleX0 = this.scale.x;
            this.scaleY0 = this.scale.y;
            this.scaleX1 = 0.9 * this.scaleX0;
            this.scaleY1 = 0.9 * this.scaleY0;
            this.scaleX2 = 1.04 * this.scaleX0;
            this.scaleY2 = 1.04 * this.scaleY0
        },
        ready: function() {
            this.parent();
            this.clickTime = ig.system.clock.delta()
        },
        setAnim: function() {
            this.animSheet = new ig.AnimationSheet(this.animImage.path, this.animImage.width, this.animImage.height);
            this.addAnim("idle", 1, [0], !0);
            this.size.x = this.animSheet.width * this.scale.x;
            this.size.y = this.animSheet.height * this.scale.y
        },
        clicked: function() {
            var b = this.clickTime;
            this.clickTime = ig.system.clock.delta();
            if (!(0.35 > this.clickTime - b) && this.enabled && ig.game.currentLayer == this.layer) {
                this.isClicked = !0;
                this.isHandled && ig.game.spawnEntity(EntityRing, this.pos.x - 16, this.pos.y - 13);
                ig.game.sortEntitiesDeferred();
                try {
                    ig.soundHandler.unlockWebAudio()
                } catch (c) {}
                this.tween({
                    scale: {
                        x: this.scaleX1,
                        y: this.scaleY1
                    }
                }, 0.025).start();
                ig.soundHandler.sfxPlayer.play("button")
            }
        },
        released: function() {
            this.isClicked && this.enabled && (ig.domHandler.getElementById("#canvas").css("cursor", "default"), this.isClicked = !1, this.tween({
                scale: {
                    x: this.scaleX0,
                    y: this.scaleY0
                }
            }, 0.025, {
                onComplete: function() {
                    this.callback()
                }.bind(this)
            }).start())
        },
        leave: function() {
            this.isClicked = !1;
            ig.domHandler.getElementById("#canvas").css("cursor", "default");
            this.tween({
                scale: {
                    x: this.scaleX0,
                    y: this.scaleY0
                }
            }, 0.025).start()
        },
        over: function() {
            ig.game.currentLayer == this.layer && this.enabled && (ig.domHandler.getElementById("#canvas").css("cursor", "pointer"), this.tween({
                scale: {
                    x: this.scaleX2,
                    y: this.scaleY2
                }
            }, 0.025).start())
        },
        draw: function() {
            if (this.isShown) {
                var b = ig.system.context;
                b.save();
                b.translate(ig.system.getDrawPos(this.pos.x.round() - ig.game.screen.x + this.size.x / 2 - this.offset.x), ig.system.getDrawPos(this.pos.y.round() - ig.game.screen.y + this.size.y / 2 - this.offset.y));
                b.scale(this.scale.x, this.scale.y);
                this.currentAnim && this.currentAnim.draw(-this.size.x / 2, -this.size.y / 2);
                this.withText && this.drawText();
                b.restore()
            }
        },
        callback: function() {},
        drawText: function() {
            ig.game.setTextStyle("28px title", "#FFF", "center");
            ig.game.drawText(this.buttonText, 0, 10)
        },
        setShown: function(b) {
            this.isShown = this.enabled = b
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-play").requires("game.entities.buttons.button").defines(function() {
    EntityButtonPlay = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-play.png"),
        isHandled: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.startZooming()
        },
        startZooming: function() {
            this.halfSize = {
                x: this.size.x / 2,
                y: this.size.y / 2
            };
            this.center = {
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y / 2
            };
            this.zoomScale = 1;
            this.tween({
                zoomScale: 0.83
            }, 0.5, {
                loop: ig.Tween.Loop.Reverse
            }).start()
        },
        callback: function() {
            ig.game.spawnEntity(EntityFade, 0, 0, {
                fadeOut: !0,
                callback: function() {
                    // ig.commonSdk.showAd();
                    ig.game.isClock = !0;
                    ig.game.isMedicine = !0;
                    ig.game.director.jumpTo(LevelGame)
                }
            })
        },
        draw: function() {
            var b = ig.system.context;
            b.save();
            b.translate(this.center.x, this.center.y);
            b.scale(this.zoomScale, this.zoomScale);
            this.currentAnim && this.currentAnim.draw(-this.size.x / 2, -this.size.y / 2);
            b.restore()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-switch").requires("game.entities.buttons.button").defines(function() {
    EntityButtonSwitch = EntityButton.extend({
        isOn: !0,
        animImageON: null,
        animImageOFF: null,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        setAnim: function() {
            var b = new ig.AnimationSheet(this.animImageON.path, this.animImageON.width, this.animImageON.height);
            this.anims.on = new ig.Animation(b, 1, [0], !0);
            b = new ig.AnimationSheet(this.animImageOFF.path, this.animImageOFF.width, this.animImageOFF.height);
            this.anims.off = new ig.Animation(b, 1, [0], !0);
            this.getStatus();
            this.setStatus();
            this.size.x = this.animImageON.width * this.scale.x;
            this.size.y = this.animImageON.height * this.scale.y
        },
        getStatus: function() {},
        setStatus: function() {
            this.currentAnim = this.isOn ? this.anims.on : this.anims.off
        },
        released: function() {
            this.isClicked && this.enabled && (this.isClicked = !1, this.tween({
                scale: {
                    x: this.scaleX0,
                    y: this.scaleY0
                }
            }, 0.025, {
                onComplete: function() {
                    this.isOn = !this.isOn;
                    this.setStatus();
                    this.callback()
                }.bind(this)
            }).start())
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-audio").requires("game.entities.buttons.button-switch").defines(function() {
    EntityButtonAudio = EntityButtonSwitch.extend({
        animImageON: new ig.Image("media/graphics/sprites/ui/bt-audio-on.png"),
        animImageOFF: new ig.Image("media/graphics/sprites/ui/bt-audio-off.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        getStatus: function() {
            this.isOn = ig.game.load("audio")
        },
        callback: function() {
            this.isOn ? ig.soundHandler.unmuteAll() : ig.soundHandler.muteAll();
            ig.game.save("audio", this.isOn)
        },
        over: function() {
            this.parent();
            ig.game.buttonAudio = !0
        },
        leave: function() {
            this.parent();
            ig.game.buttonAudio = !1
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.clickable-layer").requires("impact.entity").defines(function() {
    ClickableLayer = ig.Class.extend({
        linkID: 0,
        init: function(b) {
            this.entity = b;
            "undefined" === typeof ig.game.linkID ? ig.game.linkID = 0 : ig.game.linkID++;
            "undefined" === typeof ig.game.clickableLayers && (ig.game.clickableLayers = []);
            ig.game.clickableLayers.push(this);
            this.createLayer()
        },
        createLayer: function() {
            this.linkID = ig.game.linkID;
            var b = "_link" + this.linkID,
                c = ig.domHandler.create("a");
            ig.domHandler.attr(c, "id", b);
            ig.domHandler.appendToBody(c);
            b = ig.domHandler.getElementById("#" + b);
            ig.domHandler.css(b, {
                position: "absolute",
                margin: "0",
                padding: "0",
                fontSize: "0px",
                zIndex: "20000"
            });
            this.updateSizePos();
            this.entity.link ? (b.attr("href", this.entity.link), b.attr("target", "_blank")) : b.click(function(b) {
                b.preventDefault();
                this.entity.callback()
            }.bind(this))
        },
        updateSizePos: function() {
            var b = ig.domHandler.getElementById("#_link" + this.linkID);
            if (ig.ua.mobile) ig.domHandler.css(b, {
                width: this.entity.size.x * ig.sizeHandler.sizeRatio.x + "px",
                height: this.entity.size.y * ig.sizeHandler.sizeRatio.x + "px",
                left: this.entity.pos.x * ig.sizeHandler.sizeRatio.x + "px",
                top: this.entity.pos.y * ig.sizeHandler.sizeRatio.y + "px"
            });
            else {
                var c = ig.domHandler.getElementById("#canvas"),
                    c = ig.domHandler.getOffsets(c);
                ig.domHandler.css(b, {
                    width: this.entity.size.x * ig.sizeHandler.scaleRatioMultiplier.x + "px",
                    height: this.entity.size.y * ig.sizeHandler.scaleRatioMultiplier.x + "px",
                    left: c.left + this.entity.pos.x * ig.sizeHandler.scaleRatioMultiplier.x + "px",
                    top: c.top + this.entity.pos.y * ig.sizeHandler.scaleRatioMultiplier.y + "px"
                })
            }
        },
        hide: function() {
            var b = ig.domHandler.getElementById("#_link" + this.linkID);
            b && ig.domHandler.css(b, {
                display: "none"
            })
        },
        show: function() {
            var b = ig.domHandler.getElementById("#_link" + this.linkID);
            b && ig.domHandler.css(b, {
                display: "block"
            })
        },
        remove: function() {
            var b = ig.domHandler.getElementById("#_link" + this.linkID);
            b && b.remove()
        }
    });
    ig.Director.inject({
        loadLevel: function(b) {
            if (ig.game && ig.game.clickableLayers) {
                for (var c = 0; c < ig.game.clickableLayers.length; c++) ig.game.clickableLayers[c].remove();
                ig.game.clickableLayers.length = 0
            }
            return this.parent(b)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-fullscreen").requires("game.entities.buttons.button-switch", "game.entities.buttons.clickable-layer").defines(function() {
    EntityButtonFullscreen = EntityButtonSwitch.extend({
        animImageON: new ig.Image("media/graphics/misc/zoom-out.png"),
        animImageOFF: new ig.Image("media/graphics/misc/zoom-in.png"),
        position: 3,
        zIndex: 5E4,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setAnchor(0);
            switch (this.position) {
                case 1:
                    this.pos.x = this.pos.y = 10;
                    break;
                case 2:
                    this.pos.x = ig.system.width - 10 - this.size.x;
                    this.pos.y = 10;
                    break;
                case 3:
                    this.pos.x = ig.system.width - 10 - this.size.x;
                    this.pos.y = ig.system.height - 10 - this.size.y;
                    break;
                case 4:
                    this.pos.x = 10, this.pos.y = ig.system.height - 10 - this.size.y
            }
            new ClickableLayer(this);
            this.isOn = this.isFullscreen();
            this.setStatus()
        },
        callback: function() {
            this.isFullscreen() ? (this.exitFullscreen(), this.currentAnim = this.anims.off) : (this.requestFullscreen(), this.currentAnim = this.anims.on)
        },
        isFullscreen: function() {
            return document.fullscreenElement || document.mozFullScreenElement || document.webkitFullscreenElement || document.msFullscreenElement ? !0 : !1
        },
        requestFullscreen: function() {
            var b = document.documentElement;
            b.requestFullscreen ? b.requestFullscreen() : b.webkitRequestFullscreen ? b.webkitRequestFullscreen() : b.mozRequestFullScreen ? b.mozRequestFullScreen() : b.msRequestFullscreen && b.msRequestFullscreen()
        },
        exitFullscreen: function() {
            document.exitFullscreen ? document.exitFullscreen() : document.webkitExitFullscreen ? document.webkitExitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen && document.msExitFullscreen()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-clock").requires("game.entities.buttons.button").defines(function() {
    EntityButtonClock = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-clock.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.pos.x = -this.size.x - 100;
            this.pos.y = 350;
            this.poxX0 = (ig.system.width - this.size.x) / 2 - 180;
            this.tweenIn()
        },
        tweenIn: function() {
            this.tween({
                pos: {
                    x: this.poxX0
                }
            }, 0.3).start()
        },
        callback: function() {
            // ig.commonSdk.showAd();
            ig.game.isClock = !0;
            ig.game.isMedicine = !1;
            ig.game.director.jumpTo(LevelGame)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-medicine").requires("game.entities.buttons.button").defines(function() {
    EntityButtonMedicine = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-medicine.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.pos.x = ig.system.width + this.size.x + 100;
            this.pos.y = 350;
            this.poxX0 = (ig.system.width - this.size.x) / 2 + 180;
            this.tweenIn()
        },
        tweenIn: function() {
            this.tween({
                pos: {
                    x: this.poxX0
                }
            }, 0.3).start()
        },
        callback: function() {
            // ig.commonSdk.showAd();
            ig.game.isClock = !1;
            ig.game.isMedicine = !0;
            ig.game.director.jumpTo(LevelGame)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.controllers.home-controller").requires("game.entities.buttons.button-play", "game.entities.buttons.button-audio", "game.entities.buttons.button-fullscreen", "game.entities.buttons.button-clock", "game.entities.buttons.button-medicine").defines(function() {
    EntityHomeController = ig.Entity.extend({
        bgIm: new ig.Image("media/graphics/sprites/games/bg.png"),
        titleIm: new ig.Image("media/graphics/sprites/games/title.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.game.currentLayer = ig.game.layers.BASE;
            0 == ig.game.getEntitiesByType(EntityPointer).length && ig.game.spawnEntity(EntityPointer, 0, 0);
            b = ig.game.centerX;
            c = ig.game.centerY;
            this.spawnEntity(EntityButtonAudio, ig.system.width - 10, 10, {
                anchor: {
                    x: 1
                }
            });
            this.spawnEntity(EntityButtonPlay, b, c);
            this.spawnEntity(EntityButtonClock, 0, 0);
            this.spawnEntity(EntityButtonMedicine, 0, 0);
            this.fullscreenbtn = ig.game.spawnEntity(ig.FullscreenButton, 5, 5, {
                enterImage: new ig.Image("media/graphics/misc/zoom-in.png"),
                exitImage: new ig.Image("media/graphics/misc/zoom-out.png")
            });
            this.titlePosX = (ig.system.width - this.titleIm.width) / 2;
            this.resetMode();
            ig.game.spawnEntity(EntityFade, 0, 0);
            this.timer = new ig.Timer;
            ig.game.sortEntitiesDeferred()
        },
        draw: function() {
            this.parent();
            this.bgIm.draw(0, 0);
            this.titleIm.draw(this.titlePosX, -15 + 10 * Math.sin(3 * this.timer.delta()))
        },
        resetMode: function() {
            ig.game.isClock = !1;
            ig.game.isMedicine = !1;
            ig.Timer.timeScale = 1
        }
    })
});
ig.baked = !0;
ig.module("game.levels.home").requires("game.entities.controllers.home-controller").defines(function() {
    LevelHome = {
        entities: [{
            type: "EntityHomeController",
            x: 0,
            y: 0
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.entities.ui.popup").requires("impact.entity").defines(function() {
    EntityPopup = ig.Entity.extend({
        image: new ig.Image("media/graphics/sprites/ui/popup.png"),
        zIndex: 1E3,
        dY: 150,
        dt: 0.65,
        isLevelSelect: !1,
        scale: {
            x: 1,
            y: 1
        },
        title: "",
        titleDY: 25,
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.game.currentLayer = ig.game.layers.POPUP;
            this.easingIn = d.easingIn ? d.easingIn : ig.Tween.Easing.Back.EaseOut;
            this.easingOut = d.easingOut ? d.easingOut : ig.Tween.Easing.Back.EaseIn;
            this.setAnim();
            this.pos.x = (ig.system.width - this.size.x) / 2 + ig.game.screen.x;
            this.pos.y = -this.size.y - this.dY;
            this.y0 = (ig.system.height - this.size.y) / 2;
            this.titleX = ig.game.centerX;
            this.moveIn()
        },
        setAnim: function() {
            this.animSheet = new ig.AnimationSheet(this.image.path, this.image.width, this.image.height);
            this.addAnim("idle", 1, [0], !0);
            this.size.x = this.animSheet.width * this.scale.x;
            this.size.y = this.animSheet.height * this.scale.y
        },
        moveIn: function() {
            var b = this;
            ig.Timer.timeScale = 1;
            this.tween({
                pos: {
                    y: this.y0
                }
            }, this.dt, {
                easing: this.easingIn,
                onComplete: function() {
                    b.callbackIn()
                }
            }).start()
        },
        moveOut: function(b) {
            var c = this;
            this.tween({
                pos: {
                    y: -this.size.y - this.dY
                }
            }, this.dt, {
                easing: this.easingOut,
                onComplete: function() {
                    ig.game.currentLayer = ig.game.layers.BASE;
                    c.callback(b);
                    c.kill()
                }
            }).start()
        },
        update: function() {
            this.parent();
            this.titleY = this.pos.y - this.titleDY
        },
        draw: function() {
            ig.game.drawBlackOverlay();
            this.parent()
        },
        callback: function() {},
        callbackIn: function() {}
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-home").requires("game.entities.buttons.button").defines(function() {
    EntityButtonHome = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-home.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        callback: function() {
            // ig.commonSdk.showAd();
            ig.game.director.jumpTo(LevelHome)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-replay").requires("game.entities.buttons.button").defines(function() {
    EntityButtonReplay = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-replay.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        callback: function() {
            // ig.commonSdk.showAd();
            ig.game.director.reloadLevel()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-continue").requires("game.entities.buttons.button").defines(function() {
    EntityButtonContinue = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-continue.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        callback: function() {
            // ig.commonSdk.showAd();
            this.parents.moveOut()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.ui.popup-pause").requires("game.entities.ui.popup", "game.entities.buttons.button-home", "game.entities.buttons.button-replay", "game.entities.buttons.button-continue").defines(function() {
    EntityPopupPause = EntityPopup.extend({
        remaining: 0,
        start: 0,
        pauseTitleIm: new ig.Image("media/graphics/sprites/ui/pause-title.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.btHome = this.spawnEntity(EntityButtonHome, ig.game.centerX - 120, 0);
            this.btReplay = this.spawnEntity(EntityButtonReplay, ig.game.centerX, 0);
            this.btContinue = this.spawnEntity(EntityButtonContinue, ig.game.centerX + 120, 0);
            ig.game.sortEntitiesDeferred();
            this.pauseTitlePosX = (ig.system.width - this.pauseTitleIm.width) / 2
        },
        update: function() {
            this.parent();
            this.btHome.pos.y = this.btReplay.pos.y = this.btContinue.pos.y = this.pos.y + 415
        },
        moveIn: function() {
            var b = this;
            ig.Timer.timeScale = 1;
            this.myTime = ig.game.load("myTime");
            this.pauseTimeOut(this.myTime);
            this.tween({
                pos: {
                    y: this.y0
                }
            }, this.dt, {
                easing: this.easingIn,
                onComplete: function() {
                    b.callbackIn()
                }
            }).start()
        },
        pauseTimeOut: function(b) {
            ig.game.timeLeft = ig.game.timeDeylay;
            ig.game.timeLeft -= new Date - ig.game.startTimeout;
            clearTimeout(b)
        },
        resumeTimeOut: function() {
            ig.Timer.timeScale = 0.5;
            setTimeout(function() {
                ig.Timer.timeScale = 1
            }.bind(this), ig.game.timeLeft)
        },
        draw: function() {
            this.parent();
            this.pauseTitleIm.draw(this.pauseTitlePosX, this.pos.y + 60)
        },
        callback: function() {
            ig.game.gameController.isPaused = !1;
            this.resumeTimeOut(this.myTime)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.buttons.button-pause").requires("game.entities.buttons.button", "game.entities.ui.popup-pause").defines(function() {
    EntityButtonPause = EntityButton.extend({
        animImage: new ig.Image("media/graphics/sprites/ui/bt-pause.png"),
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        callback: function() {
            ig.game.isReady && (this.parents.isPaused = !0, ig.game.spawnEntity(EntityPopupPause, 0, 0, {
                zIndex: this.zIndex + 1E3
            }))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.blood-boom").requires("impact.entity").defines(function() {
    EntityBloodBoom = ig.Entity.extend({
        size: {
            x: 8,
            y: 8
        },
        zIndex: 1E3,
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        vcolor: "#245b3f #cf4ada #da231f #0b950e #0257c8 #525252 #9b27b7 #d81e00 #dd8d52 #f29e00 #c25905".split(" "),
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.soundHandler.sfxPlayer.play("explode");
            this.booms()
        },
        booms: function() {
            for (var b = this.vcolor[this.parents.virusId], c = 0; 60 > c; c++) this.spawnEntity(EntitySnowParticle, this.pos.x, this.pos.y, {
                vcolor: b
            })
        }
    });
    EntitySnowParticle = ig.Entity.extend({
        zIndex: 105,
        collides: ig.Entity.COLLIDES.NEVER,
        type: ig.Entity.TYPE.NONE,
        vcolor: "#ff0000",
        size: {
            x: 20,
            y: 20
        },
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.radius = 6 * Math.random() + 1;
            this.pos.x += 16 * Math.random() - 8;
            this.pos.y += 16 * Math.random() - 8;
            this.vel = {};
            this.vel.x = 30 * Math.random() - 15;
            this.vel.y = 30 * Math.random() - 15;
            this.accel = {};
            this.accel.x = -this.vel.x / 60;
            this.accel.y = 0.5;
            this.alive = !0;
            this.timer = new ig.Timer;
            b = 0.5 * Math.random() + 0.4;
            this.timer.set(b);
            ig.game.sortEntitiesDeferred()
        },
        update: function() {
            this.parent();
            this.vel.x += this.accel.x;
            this.vel.y += this.accel.y;
            this.pos.x += this.vel.x;
            this.pos.y += this.vel.y;
            this.alive && 0 <= this.timer.delta() && (this.alive = !1, this.kill())
        },
        draw: function() {
            ig.system.context.save();
            ig.system.context.resetTransform();
            ig.system.context.fillStyle = this.vcolor;
            ig.system.context.beginPath();
            ig.system.context.arc(this.pos.x, this.pos.y, this.radius, 0, 2 * Math.PI);
            ig.system.context.closePath();
            ig.system.context.fill();
            ig.system.context.restore()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.ui.popup-gameover").requires("game.entities.ui.popup", "game.entities.buttons.button-home", "game.entities.buttons.button-replay").defines(function() {
    EntityPopupGameOver = EntityPopup.extend({
        alpha: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.btDY = 410;
            this.btHome = this.spawnEntity(EntityButtonHome, ig.game.centerX - 60, 0);
            this.btReplay = this.spawnEntity(EntityButtonReplay, ig.game.centerX + 60, 0);
            ig.game.sortEntitiesDeferred();
            this.moveIn();
            ig.game.gameover = !0;
            ig.game.isClock && ig.game.isMedicine && (this.highscore = ig.game.load("highscore1"), ig.game.score > this.highscore ? (ig.game.save("highscore1", ig.game.score), this.isHighscore = !0) : this.isHighscore = !1);
            ig.game.isClock && !ig.game.isMedicine && (this.highscore = ig.game.load("highscore2"), ig.game.score > this.highscore ? (ig.game.save("highscore2", ig.game.score), this.isHighscore = !0) : this.isHighscore = !1);
            !ig.game.isClock && ig.game.isMedicine && (this.highscore = ig.game.load("highscore3"), ig.game.score > this.highscore ? (ig.game.save("highscore3", ig.game.score), this.isHighscore = !0) : this.isHighscore = !1);
            ig.soundHandler.sfxPlayer.play("win");
            this.centerX = ig.game.centerX;
            this.scoreDraw = 143.5;
            this.textDY = 175
        },
        update: function() {
            this.parent();
            this.btHome.pos.y = this.btReplay.pos.y = this.pos.y + this.btDY
        },
        draw: function() {
            this.parent();
            this.isHighscore ? (ig.game.setTextStyle("50px mainfont", "#f0a500", "center"), ig.game.drawText(_TEXT.Game.HighScore, this.centerX, this.pos.y + this.textDY + 120), ig.game.drawText(_TEXT.Game.Score, this.centerX, this.pos.y + this.textDY), ig.game.setTextStyle("50px mainfont", "#fff", "center"), ig.game.drawText(ig.game.score, this.centerX, this.pos.y + this.textDY + 60), ig.game.drawText(ig.game.score, this.centerX, this.pos.y + this.textDY + 180)) : (ig.game.setTextStyle("50px mainfont", "#f0a500", "center"), ig.game.drawText(_TEXT.Game.Score, this.centerX, this.pos.y + this.textDY), ig.game.drawText(_TEXT.Game.HighScore, this.centerX, this.pos.y + this.textDY + 120), ig.game.setTextStyle("50px mainfont", "#fff", "center"), ig.game.drawText(ig.game.score, this.centerX, this.pos.y + this.textDY + 60), ig.game.drawText(this.highscore, this.centerX, this.pos.y + this.textDY + 180))
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.shock").requires("impact.entity").defines(function() {
    EntityShock = ig.Entity.extend({
        zIndex: 250,
        duration: 0.5,
        strength: 15,
        bgAlpha: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.initShock();
            this.oriX = ig.game.screen.x;
            this.oriY = ig.game.screen.y
        },
        initShock: function() {
            this.shockTimer = new ig.Timer;
            this.shockTimer.set(this.duration);
            this.flashTimer = new ig.Timer
        },
        resetShock: function() {
            this.shockTimer = null;
            ig.game.screen.x = this.oriX;
            ig.game.screen.y = this.oriY;
            this.kill()
        },
        shock: function() {
            var b = this.shockTimer.delta();
            if (-0.2 > b) {
                var c = this.strength * Math.pow(-b / this.duration, 2);
                0.5 < c && (ig.game.screen.x += Math.random().map(0, 1, -c, c), ig.game.screen.y += Math.random().map(0, 1, -c, c))
            } - 0.4 < b && this.resetShock()
        },
        update: function() {
            this.parent();
            this.shock()
        },
        draw: function() {
            this.parent();
            ig.system.context.fillStyle = "rgba(255, 255, 255, " + this.bgAlpha + ")";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.text-boom").requires("impact.entity").defines(function() {
    EntityTextBoom = ig.Entity.extend({
        zIndex: 1E3,
        vAlpha: 0,
        zoomScale: 1,
        textDraw: "",
        color: "#fff",
        dx: 75,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.posY0 = this.pos.y - 70;
            this.startTween();
            ig.game.sortEntitiesDeferred()
        },
        startTween: function() {
            this.tween({
                vAlpha: 1,
                pos: {
                    y: this.posY0
                }
            }, 0.5, {
                onComplete: function() {
                    this.tween({
                        vAlpha: 0
                    }, 0.5, {
                        onComplete: function() {
                            this.kill()
                        }.bind(this)
                    }).start()
                }.bind(this)
            }).start()
        },
        draw: function() {
            this.parent();
            var b = ig.system.context;
            ig.game.setTextStyle("40px mainfont", this.color, "center");
            b.save();
            b.globalAlpha = this.vAlpha;
            ig.game.drawText(this.textDraw, this.pos.x + this.dx, this.pos.y);
            b.restore()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.explosion").requires("impact.entity", "game.entities.gentities.shock", "game.entities.gentities.text-boom").defines(function() {
    EntityExplosion = ig.Entity.extend({
        explosionIm: new ig.Image("media/graphics/sprites/games/explosion.png"),
        zIndex: 1E3,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setupAnim();
            this.spawnEntity(EntityShock, 0, 0);
            ig.soundHandler.sfxPlayer.play("bomb");
            setTimeout(function() {
                this.kill()
            }.bind(this), 700);
            ig.game.sortEntitiesDeferred()
        },
        setupAnim: function() {
            var b = this.explosionIm;
            this.animSheet = new ig.AnimationSheet(b.path, b.width / 8, b.height);
            this.addAnim("idle", 0.1, [0, 1, 2, 3, 4, 5, 6, 7], !0);
            this.currentAnim = this.anims.idle;
            this.size.x = this.animSheet.width;
            this.size.y = this.animSheet.height
        }
    })
});
ig.baked = !0;
ig.module("game.entities.ball-trail").requires("impact.entity").defines(function() {
    GameTrailNode = ig.Class.extend({
        x: 0,
        y: 0,
        time: 0,
        remainder: 0,
        prev: null,
        next: null,
        l: 0,
        w: 1,
        dx: 0,
        dy: 0,
        adx: 0,
        ady: 0,
        ndx: 0,
        ndy: 0,
        init: function(b, c, d, f) {
            this.x = b;
            this.y = c;
            this.time = d;
            this.remainder = f
        },
        setNext: function(b) {
            this.next = b;
            b = this.next.x - this.x;
            var c = this.next.y - this.y,
                d = Math.sqrt(b * b + c * c);
            this.l = d;
            this.next.l = d;
            this.next.dx = b / d;
            this.next.dy = c / d;
            this.next.ndx = -this.next.dy;
            this.next.ndy = this.next.dx;
            this.prev ? (this.adx = (this.dx + this.next.dx) / 2, this.ady = (this.dy + this.next.dy) / 2, this.ndx = -this.ady, this.ndy = this.adx) : (this.adx = this.next.dx, this.ady = this.next.dy, this.ndx = -this.ady, this.ndy = this.adx, this.dx = this.next.dx, this.dy = this.next.dy)
        },
        setPrev: function(b) {
            this.prev = b
        }
    });
    EntityBallTrail = ig.Entity.extend({
        zIndex: 90,
        nodeList: [],
        lineList: [],
        pollInterval: 0.01,
        pollMaxDuration: 0.15,
        maxPollInterval: 0.1,
        nodeMinDistance: 16,
        chains: [],
        enabled: !1,
        ball: null,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        draw: function() {
            var b = ig.system.context;
            b.save();
            for (var c = 0; c < this.lineList.length; c++) this.drawLineFromNodeList(this.lineList[c]);
            this.drawLineFromNodeList(this.nodeList);
            b.restore()
        },
        update: function() {
            for (var b = ig.system.clock.delta(), c = b % this.pollInterval; 0 < this.nodeList.length;) {
                var d = this.nodeList[0];
                if (b - c - (d.time - d.remainder) >= this.pollMaxDuration) this.nodeList.splice(0, 1), 0 < this.nodeList.length && this.nodeList[0].setPrev(null);
                else break
            }
            for (var f = 0; f < this.lineList.length;) {
                for (var e = this.lineList[f]; 0 < e.length;)
                    if (d = e[0], b - c - (d.time - d.remainder) >= this.pollMaxDuration) e.splice(0, 1), 0 < e.length && e[0].setPrev(null);
                    else break;
                0 == e.length ? this.lineList.splice(0, 1) : f++
            }
            if (!(0 < this.nodeList.length && (d = this.nodeList[this.nodeList.length - 1], b - (d.time - d.remainder) < this.pollInterval))) {
                f = this.jelly.pos.x + this.jelly.size.x / 2;
                e = this.jelly.pos.y + this.jelly.size.y - 20;
                if (0 < this.nodeList.length) {
                    var d = this.nodeList[this.nodeList.length - 1],
                        g = f - d.x,
                        d = e - d.y;
                    if (g * g + d * d < this.nodeMinDistance) return
                }
                b = new GameTrailNode(f, e, b, c);
                0 < this.nodeList.length && (d = this.nodeList[this.nodeList.length - 1], d.setNext(b), b.setPrev(d));
                this.nodeList.push(b)
            }
        },
        drawLineFromNodeList: function(b) {
            if (b && !(1 >= b.length)) {
                var c = ig.system.context;
                c.save();
                c.lineWidth = 2;
                c.strokeStyle = "rgba(255,255,255,0.5)";
                for (var d = 10, f = 0; f < b.length; f++) {
                    var e = b[f],
                        g = ig.system.clock.delta() - e.time,
                        g = g / this.pollMaxDuration;
                    1 < g && (g = 1);
                    g = 1 - g;
                    e.t = g;
                    e.w = d * g
                }
                c.beginPath();
                e = b[0];
                g = e.x - e.dx * e.w;
                e = e.y - e.dy * e.w;
                c.moveTo(g, e);
                for (f = 0; f < b.length - 1; f++) e = b[f], g = e.x + e.ndx * e.w, e = e.y + e.ndy * e.w, c.lineTo(g, e);
                e = b[b.length - 1];
                d > e.l && (d = e.l);
                g = e.x + e.ndx * e.w - e.dx * d;
                e = e.y + e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x + e.dx * e.w;
                e = e.y + e.dy * e.w;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x - e.ndx * e.w - e.dx * d;
                e = e.y - e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                for (f = b.length - 2; 0 <= f; f--) e = b[f], g = e.x - e.ndx * e.w, e = e.y - e.ndy * e.w, c.lineTo(g, e);
                c.closePath();
                c.fillStyle = "rgba(255,255,255,0.75)";
                c.fill();
                d = 6;
                for (f = 0; f < b.length; f++) e = b[f], g = ig.system.clock.delta() - e.time, g /= this.pollMaxDuration, 1 < g && (g = 1), g -= 1, e.t = g, e.w = d * g * g;
                c.beginPath();
                e = b[0];
                g = e.x - e.dx * e.w;
                e = e.y - e.dy * e.w;
                c.moveTo(g, e);
                for (f = 0; f < b.length - 1; f++) e = b[f], g = e.x + e.ndx * e.w, e = e.y + e.ndy * e.w, c.lineTo(g, e);
                e = b[b.length - 1];
                d > e.l && (d = e.l);
                g = e.x + e.ndx * e.w - e.dx * d;
                e = e.y + e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x + e.dx * e.w;
                e = e.y + e.dy * e.w;
                c.lineTo(g, e);
                e = b[b.length - 1];
                g = e.x - e.ndx * e.w - e.dx * d;
                e = e.y - e.ndy * e.w - e.dy * d;
                c.lineTo(g, e);
                for (f = b.length - 2; 0 <= f; f--) e = b[f], g = e.x - e.ndx * e.w, e = e.y - e.ndy * e.w, c.lineTo(g, e);
                c.closePath();
                c.fillStyle = "rgb(255,255,255)";
                c.fill();
                c.restore()
            }
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.virus").requires("impact.entity", "game.entities.gentities.ring", "game.entities.blood-boom", "game.entities.ui.popup-gameover", "game.entities.gentities.explosion", "game.entities.gentities.text-boom", "game.entities.ball-trail").defines(function() {
    EntityVirus = ig.Entity.extend({
        virusIm: [new ig.Image("media/graphics/sprites/games/jelly1.png"), new ig.Image("media/graphics/sprites/games/jelly2.png"), new ig.Image("media/graphics/sprites/games/jelly3.png"), new ig.Image("media/graphics/sprites/games/jelly4.png"), new ig.Image("media/graphics/sprites/games/jelly5.png"),
            new ig.Image("media/graphics/sprites/games/jelly6.png"), new ig.Image("media/graphics/sprites/games/jelly7.png"), new ig.Image("media/graphics/sprites/games/jelly8.png"), new ig.Image("media/graphics/sprites/games/jelly9.png"), new ig.Image("media/graphics/sprites/games/jelly10.png"), new ig.Image("media/graphics/sprites/games/boom.png")
        ],
        zIndex: 100,
        name: "virus",
        canShake: !1,
        maxVel: {
            x: 1E4,
            y: 1E4
        },
        accel: {
            x: 0,
            y: 0
        },
        virusId: 0,
        heart: 1,
        isSpanwed: !0,
        velX: 0,
        velY: 0,
        posId: 0,
        posX0: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.ballTrail = ig.game.spawnEntity(EntityBallTrail, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2, {
                jelly: this,
                zIndex: this.zIndex - 1
            });
            this.setupAnim();
            ig.game.addVirus(this);
            this.timerShake = new ig.Timer(0.4);
            this.timerShake.pause()
        },
        setupAnim: function() {
            var b = this.virusIm[this.virusId];
            this.animSheet = new ig.AnimationSheet(b.path, b.width / 3, b.height);
            this.addAnim("idle", 0.1, [0, 1, 1, 2, 2, 1, 1, 0], !1);
            this.currentAnim = this.anims.idle;
            this.size.x = this.animSheet.width;
            this.size.y = this.animSheet.height;
            this.calPos();
            this.posY0 = 200 * Math.random() + 150;
            this.r = this.size.x / 2 - 6;
            this.calSpeed()
        },
        calSpeed: function() {
            this.vel.x = 50 * this.velX;
            if (0 === this.velY) {
                var b = ig.game.iRandBetween(-410, -310);
                this.vel.y = b
            } else this.vel.y = -410
        },
        calPos: function() {
            this.pos.y = ig.system.height + 30;
            switch (this.posId) {
                case 0:
                    this.pos.x = (ig.system.width - this.size.x) / 2;
                    break;
                case 1:
                    this.pos.x = 0 === this.posX0 ? (ig.system.width - this.size.x) / 2 - 100 : (ig.system.width - this.size.x) / 2 - 250;
                    break;
                case 2:
                    this.pos.x = 0 === this.posX0 ? (ig.system.width - this.size.x) / 2 + 100 : (ig.system.width - this.size.x) / 2 + 250;
                    break;
                case 3:
                    this.pos.x = ig.game.iRandBetween(100, ig.system.width - this.size.x - 80)
            }
        },
        update: function() {
            !this.parents.isPaused && !ig.game.gameover && (this.parent(), this.canShake && (this.pos.x = this.x0 + 8 * Math.random(), 0 < this.timerShake.delta() && (this.pos.x = this.x0, this.canShake = !1, this.timerShake.reset(), this.timerShake.pause())), this.pos.y < this.posY0 && (this.accel.y = 600), this.currentAnim.angle = 0 < this.velX ? this.currentAnim.angle + 0.04 : 0 > this.velX ? this.currentAnim.angle - 0.04 : 0, 0 < this.vel.y && this.pos.y > ig.system.height && (ig.game.isMedicine && 10 !== this.virusId && (this.parents.thermometerValue += this.heart / 20), ig.game.removeVirus(this), 0 === ig.game.viruses.length && setTimeout(function() {
                this.parents.spawnNextWave()
            }.bind(this), 500), this.kill()))
        },
        handledKill: function() {
            !this.parents.isPaused && !ig.game.gameover && !this.canShake && (ig.soundHandler.sfxPlayer.play("mouseTrail"), ig.game.score = 10 !== this.virusId ? ig.game.score + this.heart : ig.game.score - 5, 0 >= ig.game.score && (ig.game.score = 0), this.heart--, this.x0 = this.pos.x, this.canShake = !0, this.timerShake.unpause(), 0 === this.heart && (this.spawnEntity(EntityRing, this.pos.x, this.pos.y), ig.game.removeVirus(this), 10 !== this.virusId ? this.spawnEntity(EntityBloodBoom, this.pos.x + this.size.x / 2, this.pos.y + this.size.y / 2) : (ig.game.spawnEntity(EntityExplosion, this.pos.x - 20, this.pos.y - 20), ig.game.spawnEntity(EntityTextBoom, this.pos.x, this.pos.y, {
                textDraw: "-5",
                color: "#ff0000",
                dx: 40
            })), 0 === ig.game.viruses.length && setTimeout(function() {
                this.parents.spawnNextWave()
            }.bind(this), 500), this.kill()))
        },
        detectIntersect: function(b, c) {
            if (!this.parents.isPaused && !ig.game.gameover) {
                var d = this.getCenter(),
                    d = new ig.SAT.Circle(d, this.r),
                    f = Math.atan2(c.y - b.y, c.x - b.x) + Math.PI / 2,
                    e = {
                        x: c.x + 3 * Math.cos(f),
                        y: c.y + 3 * Math.sin(f)
                    },
                    f = {
                        x: b.x + 3 * Math.cos(f),
                        y: b.y + 3 * Math.sin(f)
                    },
                    e = new ig.SAT.Shape([b, c, e, f]);
                return ig.game.sat.simpleShapeIntersect(d, e)
            }
        },
        startZooming: function() {
            this.halfSize = {
                x: this.size.x / 2,
                y: this.size.y / 2
            };
            this.center = {
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y / 2
            };
            this.zoomScale = 1;
            this.tween({
                zoomScale: 0.95
            }, 0.5, {
                loop: ig.Tween.Loop.Reverse
            }).start()
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.game-start").requires("impact.entity").defines(function() {
    EntityGameStartReady = ig.Entity.extend({
        image: new ig.Image("media/graphics/sprites/games/ready.png"),
        zIndex: 100,
        zoomScale: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setupAnim();
            this.startZooming()
        },
        setupAnim: function() {
            this.size.x = this.image.width;
            this.size.y = this.image.height;
            this.pos.x = (ig.system.width - this.size.x) / 2;
            this.pos.y = 150
        },
        startZooming: function() {
            this.halfSize = {
                x: this.size.x / 2,
                y: this.size.y / 2
            };
            this.center = {
                x: this.pos.x + this.size.x / 2,
                y: this.pos.y + this.size.y / 2
            };
            ig.soundHandler.sfxPlayer.play("beep");
            this.tween({
                zoomScale: 1
            }, 0.3, {
                onComplete: function() {
                    this.tween({
                        zoomScale: 0
                    }, 0.3, {
                        delay: 0.5,
                        onComplete: function() {
                            this.callback();
                            this.kill()
                        }.bind(this)
                    }).start()
                }.bind(this)
            }).start()
        },
        callback: function() {
            ig.game.spawnEntity(EntityGameStartGo, 0, 0)
        },
        draw: function() {
            this.parent();
            var b = ig.system.context;
            b.save();
            b.translate(this.center.x, this.center.y);
            b.scale(this.zoomScale, this.zoomScale);
            this.image.draw(-this.halfSize.x, -this.halfSize.y);
            b.restore()
        }
    });
    EntityGameStartGo = EntityGameStartReady.extend({
        image: new ig.Image("media/graphics/sprites/games/go.png"),
        callback: function() {
            ig.game.gameController.spawnWave(ig.game.gameController.waveNo);
            ig.game.gameController.waveTimes.unpause();
            ig.game.isReady = !0
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.game-ui").requires("impact.entity").defines(function() {
    EntityGameUi = ig.Entity.extend({
        imageClock: new ig.Image("media/graphics/sprites/games/timewave.png"),
        imageScore: new ig.Image("media/graphics/sprites/games/score.png"),
        zIndex: 100,
        zoomScale: 0,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setupAnim()
        },
        setupAnim: function() {
            this.size.x = this.imageClock.width;
            this.size.y = this.imageClock.height;
            this.pos.x = (ig.system.width - this.size.x) / 2 + 65;
            this.pos.y = 10
        },
        draw: function() {
            this.parent();
            ig.game.isClock && (this.imageClock.draw(this.pos.x, this.pos.y), ig.game.setTextStyle("30px mainfont", "#fff", "center"), ig.game.drawText(this.parents.timeWave, this.pos.x + 130, 53));
            this.imageScore.draw(8, -3);
            ig.game.setTextStyle("20px mainfont", "#fff", "center");
            ig.game.drawText(ig.game.score, 140, 50)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.thermometer").requires("impact.entity").defines(function() {
    EntityThermometer = ig.Entity.extend({
        thermometer1: new ig.Image("media/graphics/sprites/games/thermometer-empty.png"),
        thermometer2: new ig.Image("media/graphics/sprites/games/thermometer-full.png"),
        zIndex: 100,
        zoomScale: 0,
        init: function(b, c, d) {
            this.parent(b, c, d)
        },
        draw: function() {
            ctx = ig.system.context;
            var b = ig.system.width - this.thermometer1.width - 20,
                c = (ig.system.height - this.thermometer1.height) / 2;
            this.thermometer1.draw(b, c);
            ig.system.context.drawImage(this.thermometer2.data, 0, 278 * (1 - this.parents.thermometerValue), 62, 278 * this.parents.thermometerValue, b, c + 278 - 278 * this.parents.thermometerValue, 62, 278 * this.parents.thermometerValue)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.medicine-explosion").requires("impact.entity").defines(function() {
    EntityMedicineExplosion = ig.Entity.extend({
        image: new ig.Image("media/graphics/sprites/games/medicine-explosion.png"),
        zIndex: 100,
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setupAnim();
            setTimeout(function() {
                this.kill()
            }.bind(this), 450);
            ig.game.sortEntitiesDeferred()
        },
        setupAnim: function() {
            var b = this.image;
            this.animSheet = new ig.AnimationSheet(b.path, b.width / 5, b.height / 2);
            this.addAnim("idle", 0.05, [0, 1,
                2, 3, 4, 5, 6, 7, 8, 9
            ], !0);
            this.currentAnim = this.anims.idle;
            this.size.x = this.animSheet.width;
            this.size.y = this.animSheet.height
        }
    })
});
ig.baked = !0;
ig.module("game.entities.gentities.medicine").requires("impact.entity", "game.entities.gentities.medicine-explosion", "game.entities.gentities.text-boom").defines(function() {
    EntityMedicine = ig.Entity.extend({
        image: new ig.Image("media/graphics/sprites/games/medicine.png"),
        zIndex: 100,
        maxVel: {
            x: 1E4,
            y: 1E4
        },
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.setupAnim();
            ig.game.addMedicines(this);
            ig.game.medicine = this;
            this.pos.x = -200;
            this.pos.y = ig.game.iRandBetween(100, ig.system.height - this.size.x - 60);
            this.vel.x = ig.game.iRandBetween(300, 500);
            ig.game.sortEntitiesDeferred()
        },
        setupAnim: function() {
            var b = this.image;
            this.animSheet = new ig.AnimationSheet(b.path, b.width / 2, b.height);
            this.addAnim("idle", 0.2, [0, 1], !1);
            this.currentAnim = this.anims.idle;
            this.size.x = this.animSheet.width;
            this.size.y = this.animSheet.height;
            this.r = this.size.x / 2 - 6
        },
        update: function() {
            !this.parents.isPaused && !ig.game.gameover && (this.parent(), this.pos.x > ig.system.width && (ig.game.removeMedicines(this), this.kill()))
        },
        handledKill: function() {
            !this.parents.isPaused && !ig.game.gameover && (ig.game.score += 10, ig.game.spawnEntity(EntityMedicineExplosion, this.pos.x, this.pos.y - 30), ig.game.spawnEntity(EntityTextBoom, this.pos.x, this.pos.y, {
                textDraw: "+10"
            }), ig.soundHandler.sfxPlayer.play("mouseTrail"), ig.soundHandler.sfxPlayer.play("items"), ig.game.removeMedicines(this), this.kill())
        },
        detectIntersect: function(b, c) {
            if (!this.parents.isPaused && !ig.game.gameover) {
                var d = this.getCenter(),
                    d = new ig.SAT.Circle(d, this.r),
                    f = new ig.SAT.Shape([b, c, {
                        x: c.x + 2,
                        y: c.y + 2
                    }, {
                        x: b.x + 2,
                        y: b.y + 2
                    }]);
                return ig.game.sat.simpleShapeIntersect(d, f)
            }
        }
    });
    EntityClock = EntityMedicine.extend({
        image: new ig.Image("media/graphics/sprites/games/clock.png"),
        init: function(b, c, d) {
            this.parent(b, c, d);
            this.pos.x = -150;
            this.pos.y = ig.game.iRandBetween(150, ig.system.height - this.size.x - 80);
            this.vel.x = ig.game.iRandBetween(400, 550);
            ig.game.sortEntitiesDeferred()
        },
        handledKill: function() {
            !this.parents.isPaused && !ig.game.gameover && (ig.game.spawnEntity(EntityMedicineExplosion, this.pos.x, this.pos.y - 30), ig.Timer.timeScale = 0.5, ig.soundHandler.sfxPlayer.play("mouseTrail"), ig.soundHandler.sfxPlayer.play("items"), ig.game.removeMedicines(this), this.resetTimeout(), this.kill())
        },
        resetTimeout: function() {
            ig.game.myTime && clearTimeout(ig.game.myTime);
            ig.game.startTimeout = new Date;
            ig.game.myTime = setTimeout(function() {
                ig.Timer.timeScale = 1
            }.bind(this), ig.game.timeDeylay);
            ig.game.save("myTime", ig.game.myTime)
        }
    })
});
ig.baked = !0;
ig.module("game.entities.controllers.game-controller").requires("game.entities.buttons.button-pause", "game.entities.buttons.button-audio", "game.entities.gentities.virus", "game.entities.gentities.game-start", "game.entities.gentities.game-ui", "game.entities.buttons.button-pause", "game.entities.gentities.thermometer", "game.entities.gentities.medicine").defines(function() {
    EntityGameController = ig.Entity.extend({
        bgIm: new ig.Image("media/graphics/sprites/games/bg.png"),
        isClicked: !1,
        isPaused: !1,
        speed: 5,
        totalVirus: [],
        waveNo: 0,
        timeWave: 60,
        thermometerValue: 0,
        isSpanwedGameOver: !1,
        init: function(b, c, d) {
            this.parent(b, c, d);
            ig.game.currentLayer = ig.game.layers.BASE;
            0 == ig.game.getEntitiesByType(EntityPointer).length && ig.game.spawnEntity(EntityPointer, 0, 0);
            ig.game.mouseTrail = ig.game.spawnEntity(EntityMouseTrail, 0, 0);
            ig.game.mouseTrail.enabled = !0;
            ig.game.gameover = !1;
            this.spawnEntity(EntityButtonPause, ig.system.width - 10 + ig.game.screen.x, 10, {
                anchor: {
                    x: 1
                },
                zIndex: this.zIndex + 200
            });
            this.spawnEntity(EntityButtonAudio, ig.system.width - 10, ig.system.height - 10, {
                anchor: {
                    x: 1,
                    y: 1
                }
            });
            this.spawnEntity(EntityGameStartReady, 0, 0);
            this.spawnEntity(EntityGameUi, 0, 0, {
                zIndex: this.zIndex + 200
            });
            ig.game.isMedicine && this.spawnEntity(EntityThermometer, 0, 0);
            this.resetGame();
            ig.game.gameover = !1;
            ig.game.gameController = this;
            this.waveTimes = new ig.Timer(1);
            this.waveTimes.pause();
            ig.game.spawnEntity(EntityFade, 0, 0);
            ig.game.sortEntitiesDeferred()
        },
        spawnWave: function() {
            this.spawnWave2();
            ig.game.sortEntitiesDeferred()
        },
        spawnWave2: function() {
            if (!ig.game.gameover) {
                if (16 > ig.game.score) {
                    var b = Math.random();
                    0.3 > b ? this.typeOfSpawn(0) : 0.6 > b ? this.typeOfSpawn(1) : 1 > b && this.typeOfSpawn(2)
                } else b = 85 > ig.game.score ? Math.floor(3 * Math.random() + 3) : 130 > ig.game.score ? Math.floor(4 * Math.random() + 5) : Math.floor(6 * Math.random() + 3), this.typeOfSpawn(b);
                ig.game.sortEntitiesDeferred()
            }
        },
        typeOfSpawn: function(b) {
            switch (b) {
                case 0:
                    var c = Math.floor(3 * Math.random()),
                        d = Math.floor(3 * Math.random());
                    b = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: c
                        })
                    }.bind(this), 700);
                    0.7 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10
                        })
                    }.bind(this), 900);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: d
                        })
                    }.bind(this), 1400);
                    break;
                case 1:
                    c = Math.floor(3 * Math.random());
                    d = Math.floor(3 * Math.random());
                    b = Math.random();
                    var f = Math.random(),
                        e = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0, {
                        velX: 1
                    });
                    0.7 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velX: 1
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: c,
                            velX: 1
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: d,
                            velX: 1
                        })
                    }.bind(this), 1400);
                    break;
                case 2:
                    c = Math.floor(3 * Math.random());
                    d = Math.floor(3 * Math.random());
                    b = Math.random();
                    f = Math.random();
                    e = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0, {
                        velX: -1
                    });
                    0.7 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velX: -1
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: c,
                            velX: -1
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: d,
                            velX: -1
                        })
                    }.bind(this), 1400);
                    break;
                case 3:
                    var g = Math.floor(3 * Math.random()),
                        c = Math.floor(3 * Math.random() + 3),
                        d = Math.floor(3 * Math.random() + 3),
                        m = Math.floor(3 * Math.random() + 3),
                        p = Math.floor(2 * Math.random());
                    b = Math.random();
                    f = Math.random();
                    e = Math.random();
                    0.7 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velX: -1,
                            posId: 1,
                            posX0: p
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: c,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: d,
                            velX: -1,
                            heart: 2,
                            posId: 1,
                            posX0: p
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: m,
                            velX: -1,
                            heart: 2,
                            posId: 1,
                            posX0: p
                        })
                    }.bind(this), 1400);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: m,
                            velX: -1,
                            heart: 2,
                            posId: 1,
                            posX0: p
                        })
                    }.bind(this), 2E3);
                    break;
                case 4:
                    g = Math.floor(3 * Math.random());
                    c = Math.floor(3 * Math.random() + 3);
                    d = Math.floor(3 * Math.random() + 3);
                    m = Math.floor(3 * Math.random() + 3);
                    p = Math.floor(2 * Math.random());
                    b = Math.random();
                    f = Math.random();
                    e = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    0.6 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velX: 1,
                            posId: 2,
                            posX0: p
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: c,
                        velX: 1,
                        heart: 2,
                        posId: 2,
                        posX0: p
                    });
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: d,
                            velX: 1,
                            heart: 2,
                            posId: 2,
                            posX0: p
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: m,
                            velX: 1,
                            heart: 2,
                            posId: 2,
                            posX0: p
                        })
                    }.bind(this), 1400);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: m,
                            velX: 1,
                            heart: 2,
                            posId: 2,
                            posX0: p
                        })
                    }.bind(this), 2E3);
                    break;
                case 5:
                    var g = Math.floor(3 * Math.random()),
                        c = Math.floor(3 * Math.random() + 3),
                        d = Math.floor(3 * Math.random() + 3),
                        m = Math.floor(3 * Math.random() + 3),
                        j = Math.floor(3 * Math.random() + 3),
                        p = Math.floor(2 * Math.random());
                    b = Math.random();
                    f = Math.random();
                    e = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    0.6 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velY: 1,
                            posId: 3
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: c,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: d,
                        velY: 1,
                        heart: 2,
                        posId: 2
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: m,
                        velY: 1,
                        heart: 2,
                        posId: 2
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: m,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: j,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    break;
                case 6:
                    var g = Math.floor(3 * Math.random()),
                        c = Math.floor(5 * Math.random() + 4),
                        d = Math.floor(5 * Math.random() + 4),
                        m = Math.floor(5 * Math.random() + 4),
                        j = Math.floor(5 * Math.random() + 4),
                        n = Math.floor(5 * Math.random() + 4),
                        p = Math.floor(2 * Math.random());
                    b = Math.random();
                    f = Math.random();
                    e = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    0.6 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velY: 1,
                            posId: 3
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: c,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: d,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: m,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 1400);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: j,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 2100);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 2100);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 2100);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 2100);
                    break;
                case 7:
                    g = Math.floor(3 * Math.random());
                    c = Math.floor(5 * Math.random() + 4);
                    d = Math.floor(5 * Math.random() + 4);
                    m = Math.floor(5 * Math.random() + 4);
                    j = Math.floor(5 * Math.random() + 4);
                    n = Math.floor(5 * Math.random() + 4);
                    p = Math.floor(2 * Math.random());
                    b = Math.random();
                    f = Math.random();
                    e = Math.random();
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    });
                    0.6 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velY: 1,
                            posId: 3
                        })
                    }.bind(this), 900);
                    0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900);
                    0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900);
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: c,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: d,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: m,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    });
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: j,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700);
                    setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700);
                    break;
                case 8:
                    g = Math.floor(3 * Math.random()), c = Math.floor(4 * Math.random() + 5), d = Math.floor(4 * Math.random() + 5), m = Math.floor(4 * Math.random() + 5), j = Math.floor(4 * Math.random() + 5), n = Math.floor(4 * Math.random() + 5), p = Math.floor(2 * Math.random()), b = Math.random(), f = Math.random(), e = Math.random(), this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: g,
                        velX: -1,
                        heart: 2,
                        posId: 1,
                        posX0: p
                    }), 0.6 < b && setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 10,
                            velY: 1,
                            posId: 3
                        })
                    }.bind(this), 900), 0.8 < f && setTimeout(function() {
                        this.spawnEntity(EntityMedicine, 200, 300)
                    }.bind(this), 900), 0.8 < e && setTimeout(function() {
                        this.spawnEntity(EntityClock, 200, 300)
                    }.bind(this), 900), this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: c,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    }), this.spawnEntity(EntityVirus, 0, 0, {
                        virusId: d,
                        velY: 1,
                        heart: 2,
                        posId: 3
                    }), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: m,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: 9,
                            velY: 1,
                            heart: 5,
                            posId: 3
                        })
                    }.bind(this), 700), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: j,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 700), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 1400), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 1400), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 1400), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 2100), setTimeout(function() {
                        this.spawnEntity(EntityVirus, 0, 0, {
                            virusId: n,
                            velY: 1,
                            heart: 2,
                            posId: 3
                        })
                    }.bind(this), 2100)
            }
        },
        draw: function() {
            this.parent();
            this.bgIm.draw(0, 0)
        },
        spawnGameOver: function() {
            this.isSpanwedGameOver || (this.isSpanwedGameOver = !0, this.spawnEntity(EntityPopupGameOver, 0, 0, {
                zIndex: this.zIndex + 1E3
            }))
        },
        update: function() {
            this.parent();
            !this.isPaused && !ig.game.gameover && !ig.game.buttonAudio && (ig.game.isMedicine && 1 <= this.thermometerValue ? (this.thermometerValue = 1, this.spawnGameOver()) : (ig.game.isClock && 0 < this.waveTimes.delta() && (this.timeWave--, this.waveTimes.reset()), 0 >= this.timeWave && (this.timeWave = 0, this.spawnGameOver())))
        },
        resetGame: function() {
            for (var b = ig.game.getEntitiesByType(EntityVirus), c = 0; c <= b.length; c++) b[c] && b[c].kill();
            ig.game.viruses = [];
            ig.game.score = 0;
            ig.game.isReady = !1
        },
        spawnNextWave: function() {
            this.waveNo++;
            this.spawnWave(this.waveNo)
        }
    })
});
ig.baked = !0;
ig.module("game.levels.game").requires("game.entities.controllers.game-controller").defines(function() {
    LevelGame = {
        entities: [{
            type: "EntityGameController",
            x: 0,
            y: 0
        }],
        layer: []
    }
});
ig.baked = !0;
ig.module("game.main").requires("impact.game", "plugins.patches.webkit-image-smoothing-patch", "plugins.patches.windowfocus-onMouseDown-patch", "plugins.patches.input-patch", "plugins.handlers.dom-handler", "plugins.handlers.size-handler", "plugins.audio.sound-handler", "plugins.io.io-manager", "plugins.io.storage-manager", "plugins.splash-loader", "plugins.tween", "plugins.tweens-handler", "plugins.url-parameters", "plugins.director", "plugins.impact-storage", "plugins.nimpact", "plugins.sat", "game.entities.mouse-trail", "plugins.fullscreen", "plugins.common_sdk", "plugins.data.vector", "plugins.data.color-rgb", "game.entities.ori.pointer", "game.entities.ori.select", "game.entities.ui.fade", "game.levels.home", "game.levels.game").defines(function() {
    MyGame = ig.Game.extend({
        name: "BGFP-jelly-Ninja",
        version: "1.1",
        frameworkVersion: "1.0.0",
        sessionData: {},
        io: null,
        paused: !1,
        tweens: null,
        gameover: !1,
        buttonAudio: !1,
        viruses: [],
        medicines: [],
        score: 0,
        isClock: !1,
        isMedicine: !1,
        layers: {
            BASE: 0,
            BUTTON: 100,
            POPUP: 500
        },
        currentID: 0,
        points: 0,
        myTime: 0,
        startTimeout: 0,
        timeLeft: 0,
        timeDeylay: 6E3,
        isReady: !1,
        init: function() {
            this.tweens = new ig.TweensHandler;
            this.io = new IoManager;
            this.setupUrlParams = new ig.UrlParameters;
            this.setupStorageManager();
            var b = this.load("music");
            ig.soundHandler.bgmPlayer.volume(b);
            b = this.load("sound");
            ig.soundHandler.sfxPlayer.volume(b);
            (this.isOn = ig.game.load("audio")) ? ig.soundHandler.unmuteAll(): ig.soundHandler.muteAll();
            this.centerX = ig.system.width / 2;
            this.centerY = ig.system.height / 2;
            this.adReady = !0;
            this.sat = new ig.SAT;
            this.finalize()
        },
        addVirus: function(b) {
            this.viruses.push(b)
        },
        addMedicines: function(b) {
            this.medicines.push(b)
        },
        removeVirus: function(b) {
            b = this.viruses.indexOf(b);
            this.viruses.splice(b, 1)
        },
        removeMedicines: function(b) {
            b = this.medicines.indexOf(b);
            this.medicines.splice(b, 1)
        },
        iRandBetween: function(b, c) {
            return Math.floor(Math.random() * (c - b)) + b
        },
        fRandBetween: function(b, c) {
            return Math.random() * (c - b) + b
        },
        roundRect: function(b, c, d, f, e) {
            var g = ig.system.context;
            g.beginPath();
            g.moveTo(b + e, c);
            g.lineTo(b + d - e, c);
            g.quadraticCurveTo(b + d, c, b + d, c + e);
            g.lineTo(b + d, c + f - e);
            g.quadraticCurveTo(b + d, c + f, b + d - e, c + f);
            g.lineTo(b + e, c + f);
            g.quadraticCurveTo(b, c + f, b, c + f - e);
            g.lineTo(b, c + e);
            g.quadraticCurveTo(b, c, b + e, c);
            g.closePath();
            g.stroke();
            g.fill()
        },
        wrapText: function(b, c, d) {
            b = b.split(" ");
            var f = "",
                e = [],
                g = "",
                m;
            ig.system.context.font = d;
            for (d = 0; d < b.length; d++) g = f + b[d] + " ", m = ig.system.context.measureText(g), m = m.width, m > c ? (e.push(f), f = b[d] + " ") : f = g;
            e.push(f);
            return e
        },
        drawBlackOverlay: function() {
            ig.system.context.fillStyle = "rgba(0,0,0,0.75)";
            ig.system.context.fillRect(0, 0, ig.system.width, ig.system.height)
        },
        setTextStyle: function(b, c, d) {
            ig.system.context.textBaseline = "alphabetic";
            ig.system.context.font = b;
            ig.system.context.fillStyle = c;
            ig.system.context.textAlign = d
        },
        setStrokeStyle: function(b, c) {
            ig.system.context.strokeStyle = b;
            ig.system.context.lineWidth = c;
            ig.system.context.lineJoin = "round"
        },
        drawText: function(b, c, d) {
            ig.system.context.fillText(b, c, d)
        },
        drawTextStrokeMultiLines: function(b, c, d, f) {
            for (var e = 0; e < b.length; e++) ig.game.drawTextStroke(b[e], c, d + e * f)
        },
        drawTextMultiLines: function(b, c, d, f) {
            for (var e = 0; e < b.length; e++) ig.system.context.fillText(b[e], c, d + e * f)
        },
        drawTextStroke: function(b, c, d) {
            ig.system.context.strokeText(b, c, d);
            ig.system.context.fillText(b, c, d)
        },
        drawTextShadow: function(b, c, d) {
            ig.system.context.fillText(b, c, d);
            ig.system.context.fillStyle = "rgba(0,0,0,0.8)";
            ig.system.context.fillText(b, c + 3, d + 3)
        },
        initData: function() {
            return this.sessionData = {
                sound: 1,
                music: 0.6,
                level: 1,
                score: 0,
                audio: !0,
                highscore1: 0,
                highscore2: 0,
                highscore3: 0,
                myTime: 0,
                items: [1, 0, 0, 60, 80, 100, 120]
            }
        },
        showDebugMenu: function() {
            ig.Entity._debugShowBoxes = !0;
            $(".ig_debug").show()
        },
        start: function() {
            this.director = new ig.Director(this, [LevelHome, LevelGame]);
            this.director.loadLevel(this.director.currentLevel);
            ig.soundHandler.bgmPlayer.play(ig.soundHandler.bgmPlayer.soundList.background)
        },
        finalize: function() {
            this.start();
            ig.sizeHandler.reorient()
        },
        pauseGame: function() {
            ig.system.stopRunLoop.call(ig.system);
            ig.game.tweens.onSystemPause()
        },
        resumeGame: function() {
            ig.system.startRunLoop.call(ig.system);
            ig.game.tweens.onSystemResume()
        },
        update: function() {
            this.paused ? (this.updateWhilePaused(), this.checkWhilePaused()) : (this.parent(), this.tweens.update(this.tweens.now()), ig.ua.mobile && ig.soundHandler && ig.soundHandler.forceLoopBGM())
        }
    });
    ig.domHandler = null;
    ig.domHandler = new ig.DomHandler;
    ig.domHandler.forcedDeviceDetection();
    ig.domHandler.forcedDeviceRotation();
    ig.sizeHandler = new ig.SizeHandler(ig.domHandler);
    ig.ua.mobile ? (ig.Sound.enabled = !1, ig.main("#canvas", MyGame, 60, ig.sizeHandler.mobile.actualResolution.x, ig.sizeHandler.mobile.actualResolution.y, ig.sizeHandler.scale, ig.SplashLoader), ig.sizeHandler.resize()) : ig.main("#canvas", MyGame, 60, ig.sizeHandler.desktop.actualResolution.x, ig.sizeHandler.desktop.actualResolution.y, ig.sizeHandler.scale, ig.SplashLoader);
    ig.soundHandler = null;
    ig.soundHandler = new ig.SoundHandler;
    ig.sizeHandler.reorient()
});