! function(t) {
    if ("object" == typeof exports) module.exports = t();
    else if ("function" == typeof define, 1) {
        var e;
        "undefined" != typeof window ? e = window : "undefined" != typeof global ? e = global : "undefined" != typeof self && (e = self), e.p2 = t()
    } else define(t)
}(function() {
    return function t(e, o, i) {
        function n(a, s) {
            if (!o[a]) {
                if (!e[a]) {
                    var c = "function" == typeof require && require;
                    if (!s && c) return c(a, !0);
                    if (r) return r(a, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                var h = o[a] = {
                    exports: {}
                };
                e[a][0].call(h.exports, function(t) {
                    var o = e[a][1][t];
                    return n(o ? o : t)
                }, h, h.exports, t, e, o, i)
            }
            return o[a].exports
        }
        for (var r = "function" == typeof require && require, a = 0; a < i.length; a++) n(i[a]);
        return n
    }({
        1: [function(t, e, o) {
            function i() {}
            var n = t("./Scalar");
            e.exports = i, i.lineInt = function(t, e, o) {
                o = o || 0;
                var i, r, a, s, c, h, l, p = [0, 0];
                return i = t[1][1] - t[0][1], r = t[0][0] - t[1][0], a = i * t[0][0] + r * t[0][1], s = e[1][1] - e[0][1], c = e[0][0] - e[1][0], h = s * e[0][0] + c * e[0][1], l = i * c - s * r, n.eq(l, 0, o) || (p[0] = (c * a - r * h) / l, p[1] = (i * h - s * a) / l), p
            }, i.segmentsIntersect = function(t, e, o, i) {
                var n = e[0] - t[0],
                    r = e[1] - t[1],
                    a = i[0] - o[0],
                    s = i[1] - o[1];
                if (a * r - s * n == 0) return !1;
                var c = (n * (o[1] - t[1]) + r * (t[0] - o[0])) / (a * r - s * n),
                    h = (a * (t[1] - o[1]) + s * (o[0] - t[0])) / (s * n - a * r);
                return c >= 0 && 1 >= c && h >= 0 && 1 >= h
            }
        }, {
            "./Scalar": 4
        }],
        2: [function(t, e, o) {
            function i() {}
            e.exports = i, i.area = function(t, e, o) {
                return (e[0] - t[0]) * (o[1] - t[1]) - (o[0] - t[0]) * (e[1] - t[1])
            }, i.left = function(t, e, o) {
                return i.area(t, e, o) > 0
            }, i.leftOn = function(t, e, o) {
                return i.area(t, e, o) >= 0
            }, i.right = function(t, e, o) {
                return i.area(t, e, o) < 0
            }, i.rightOn = function(t, e, o) {
                return i.area(t, e, o) <= 0
            };
            var n = [],
                r = [];
            i.collinear = function(t, e, o, a) {
                if (a) {
                    var s = n,
                        c = r;
                    s[0] = e[0] - t[0], s[1] = e[1] - t[1], c[0] = o[0] - e[0], c[1] = o[1] - e[1];
                    var h = s[0] * c[0] + s[1] * c[1],
                        l = Math.sqrt(s[0] * s[0] + s[1] * s[1]),
                        p = Math.sqrt(c[0] * c[0] + c[1] * c[1]),
                        u = Math.acos(h / (l * p));
                    return a > u
                }
                return 0 == i.area(t, e, o)
            }, i.sqdist = function(t, e) {
                var o = e[0] - t[0],
                    i = e[1] - t[1];
                return o * o + i * i
            }
        }, {}],
        3: [function(t, e, o) {
            function i() {
                this.vertices = []
            }

            function n(t, e, o, i, n) {
                n = n || 0;
                var r = e[1] - t[1],
                    a = t[0] - e[0],
                    c = r * t[0] + a * t[1],
                    h = i[1] - o[1],
                    l = o[0] - i[0],
                    p = h * o[0] + l * o[1],
                    u = r * l - h * a;
                return s.eq(u, 0, n) ? [0, 0] : [(l * c - a * p) / u, (r * p - h * c) / u]
            }
            var r = t("./Line"),
                a = t("./Point"),
                s = t("./Scalar");
            e.exports = i, i.prototype.at = function(t) {
                var e = this.vertices,
                    o = e.length;
                return e[0 > t ? t % o + o : t % o]
            }, i.prototype.first = function() {
                return this.vertices[0]
            }, i.prototype.last = function() {
                return this.vertices[this.vertices.length - 1]
            }, i.prototype.clear = function() {
                this.vertices.length = 0
            }, i.prototype.append = function(t, e, o) {
                if ("undefined" == typeof e) throw new Error("From is not given!");
                if ("undefined" == typeof o) throw new Error("To is not given!");
                if (e > o - 1) throw new Error("lol1");
                if (o > t.vertices.length) throw new Error("lol2");
                if (0 > e) throw new Error("lol3");
                for (var i = e; o > i; i++) this.vertices.push(t.vertices[i])
            }, i.prototype.makeCCW = function() {
                for (var t = 0, e = this.vertices, o = 1; o < this.vertices.length; ++o)(e[o][1] < e[t][1] || e[o][1] == e[t][1] && e[o][0] > e[t][0]) && (t = o);
                a.left(this.at(t - 1), this.at(t), this.at(t + 1)) || this.reverse()
            }, i.prototype.reverse = function() {
                for (var t = [], e = 0, o = this.vertices.length; e !== o; e++) t.push(this.vertices.pop());
                this.vertices = t
            }, i.prototype.isReflex = function(t) {
                return a.right(this.at(t - 1), this.at(t), this.at(t + 1))
            };
            var c = [],
                h = [];
            i.prototype.canSee = function(t, e) {
                var o, i, n = c,
                    s = h;
                if (a.leftOn(this.at(t + 1), this.at(t), this.at(e)) && a.rightOn(this.at(t - 1), this.at(t), this.at(e))) return !1;
                i = a.sqdist(this.at(t), this.at(e));
                for (var l = 0; l !== this.vertices.length; ++l)
                    if ((l + 1) % this.vertices.length !== t && l !== t && a.leftOn(this.at(t), this.at(e), this.at(l + 1)) && a.rightOn(this.at(t), this.at(e), this.at(l)) && (n[0] = this.at(t), n[1] = this.at(e), s[0] = this.at(l), s[1] = this.at(l + 1), o = r.lineInt(n, s), a.sqdist(this.at(t), o) < i)) return !1;
                return !0
            }, i.prototype.copy = function(t, e, o) {
                var n = o || new i;
                if (n.clear(), e > t)
                    for (var r = t; e >= r; r++) n.vertices.push(this.vertices[r]);
                else {
                    for (var r = 0; e >= r; r++) n.vertices.push(this.vertices[r]);
                    for (var r = t; r < this.vertices.length; r++) n.vertices.push(this.vertices[r])
                }
                return n
            }, i.prototype.getCutEdges = function() {
                for (var t = [], e = [], o = [], n = new i, r = Number.MAX_VALUE, a = 0; a < this.vertices.length; ++a)
                    if (this.isReflex(a))
                        for (var s = 0; s < this.vertices.length; ++s)
                            if (this.canSee(a, s)) {
                                e = this.copy(a, s, n).getCutEdges(), o = this.copy(s, a, n).getCutEdges();
                                for (var c = 0; c < o.length; c++) e.push(o[c]);
                                e.length < r && (t = e, r = e.length, t.push([this.at(a), this.at(s)]))
                            }
                return t
            }, i.prototype.decomp = function() {
                var t = this.getCutEdges();
                return t.length > 0 ? this.slice(t) : [this]
            }, i.prototype.slice = function(t) {
                if (0 == t.length) return [this];
                if (t instanceof Array && t.length && t[0] instanceof Array && 2 == t[0].length && t[0][0] instanceof Array) {
                    for (var e = [this], o = 0; o < t.length; o++)
                        for (var i = t[o], n = 0; n < e.length; n++) {
                            var r = e[n],
                                a = r.slice(i);
                            if (a) {
                                e.splice(n, 1), e.push(a[0], a[1]);
                                break
                            }
                        }
                    return e
                }
                var i = t,
                    o = this.vertices.indexOf(i[0]),
                    n = this.vertices.indexOf(i[1]);
                return -1 != o && -1 != n ? [this.copy(o, n), this.copy(n, o)] : !1
            }, i.prototype.isSimple = function() {
                for (var t = this.vertices, e = 0; e < t.length - 1; e++)
                    for (var o = 0; e - 1 > o; o++)
                        if (r.segmentsIntersect(t[e], t[e + 1], t[o], t[o + 1])) return !1;
                for (var e = 1; e < t.length - 2; e++)
                    if (r.segmentsIntersect(t[0], t[t.length - 1], t[e], t[e + 1])) return !1;
                return !0
            }, i.prototype.quickDecomp = function(t, e, o, r, s, c) {
                s = s || 100, c = c || 0, r = r || 25, t = "undefined" != typeof t ? t : [], e = e || [], o = o || [];
                var h = [0, 0],
                    l = [0, 0],
                    p = [0, 0],
                    u = 0,
                    d = 0,
                    f = 0,
                    v = 0,
                    y = 0,
                    m = 0,
                    g = 0,
                    A = new i,
                    b = new i,
                    E = this,
                    B = this.vertices;
                if (B.length < 3) return t;
                if (c++, c > s) return console.warn("quickDecomp: max level (" + s + ") reached."), t;
                for (var q = 0; q < this.vertices.length; ++q)
                    if (E.isReflex(q)) {
                        e.push(E.vertices[q]), u = d = Number.MAX_VALUE;
                        for (var P = 0; P < this.vertices.length; ++P) a.left(E.at(q - 1), E.at(q), E.at(P)) && a.rightOn(E.at(q - 1), E.at(q), E.at(P - 1)) && (p = n(E.at(q - 1), E.at(q), E.at(P), E.at(P - 1)), a.right(E.at(q + 1), E.at(q), p) && (f = a.sqdist(E.vertices[q], p), d > f && (d = f, l = p, m = P))), a.left(E.at(q + 1), E.at(q), E.at(P + 1)) && a.rightOn(E.at(q + 1), E.at(q), E.at(P)) && (p = n(E.at(q + 1), E.at(q), E.at(P), E.at(P + 1)), a.left(E.at(q - 1), E.at(q), p) && (f = a.sqdist(E.vertices[q], p), u > f && (u = f, h = p, y = P)));
                        if (m == (y + 1) % this.vertices.length) p[0] = (l[0] + h[0]) / 2, p[1] = (l[1] + h[1]) / 2, o.push(p), y > q ? (A.append(E, q, y + 1), A.vertices.push(p), b.vertices.push(p), 0 != m && b.append(E, m, E.vertices.length), b.append(E, 0, q + 1)) : (0 != q && A.append(E, q, E.vertices.length), A.append(E, 0, y + 1), A.vertices.push(p), b.vertices.push(p), b.append(E, m, q + 1));
                        else {
                            if (m > y && (y += this.vertices.length), v = Number.MAX_VALUE, m > y) return t;
                            for (var P = m; y >= P; ++P) a.leftOn(E.at(q - 1), E.at(q), E.at(P)) && a.rightOn(E.at(q + 1), E.at(q), E.at(P)) && (f = a.sqdist(E.at(q), E.at(P)), v > f && (v = f, g = P % this.vertices.length));
                            g > q ? (A.append(E, q, g + 1), 0 != g && b.append(E, g, B.length), b.append(E, 0, q + 1)) : (0 != q && A.append(E, q, B.length), A.append(E, 0, g + 1), b.append(E, g, q + 1))
                        }
                        return A.vertices.length < b.vertices.length ? (A.quickDecomp(t, e, o, r, s, c), b.quickDecomp(t, e, o, r, s, c)) : (b.quickDecomp(t, e, o, r, s, c), A.quickDecomp(t, e, o, r, s, c)), t
                    }
                return t.push(this), t
            }, i.prototype.removeCollinearPoints = function(t) {
                for (var e = 0, o = this.vertices.length - 1; this.vertices.length > 3 && o >= 0; --o) a.collinear(this.at(o - 1), this.at(o), this.at(o + 1), t) && (this.vertices.splice(o % this.vertices.length, 1), o--, e++);
                return e
            }
        }, {
            "./Line": 1,
            "./Point": 2,
            "./Scalar": 4
        }],
        4: [function(t, e, o) {
            function i() {}
            e.exports = i, i.eq = function(t, e, o) {
                return o = o || 0, Math.abs(t - e) < o
            }
        }, {}],
        5: [function(t, e, o) {
            e.exports = {
                Polygon: t("./Polygon"),
                Point: t("./Point")
            }
        }, {
            "./Point": 2,
            "./Polygon": 3
        }],
        6: [function(t, e, o) {
            e.exports = {
                name: "p2",
                version: "0.7.0",
                description: "A JavaScript 2D physics engine.",
                author: "Stefan Hedman <schteppe@gmail.com> (http://steffe.se)",
                keywords: ["p2.js", "p2", "physics", "engine", "2d"],
                main: "./src/p2.js",
                engines: {
                    node: "*"
                },
                repository: {
                    type: "git",
                    url: "https://github.com/schteppe/p2.js.git"
                },
                bugs: {
                    url: "https://github.com/schteppe/p2.js/issues"
                },
                licenses: [{
                    type: "MIT"
                }],
                devDependencies: {
                    grunt: "^0.4.5",
                    "grunt-contrib-jshint": "^0.11.2",
                    "grunt-contrib-nodeunit": "^0.4.1",
                    "grunt-contrib-uglify": "~0.4.0",
                    "grunt-contrib-watch": "~0.5.0",
                    "grunt-browserify": "~2.0.1",
                    "grunt-contrib-concat": "^0.4.0"
                },
                dependencies: {
                    "poly-decomp": "0.1.0"
                }
            }
        }, {}],
        7: [function(t, e, o) {
            function i(t) {
                this.lowerBound = n.create(), t && t.lowerBound && n.copy(this.lowerBound, t.lowerBound), this.upperBound = n.create(), t && t.upperBound && n.copy(this.upperBound, t.upperBound)
            }
            var n = t("../math/vec2");
            t("../utils/Utils"), e.exports = i;
            var r = n.create();
            i.prototype.setFromPoints = function(t, e, o, i) {
                var a = this.lowerBound,
                    s = this.upperBound;
                "number" != typeof o && (o = 0), 0 !== o ? n.rotate(a, t[0], o) : n.copy(a, t[0]), n.copy(s, a);
                for (var c = Math.cos(o), h = Math.sin(o), l = 1; l < t.length; l++) {
                    var p = t[l];
                    if (0 !== o) {
                        var u = p[0],
                            d = p[1];
                        r[0] = c * u - h * d, r[1] = h * u + c * d, p = r
                    }
                    for (var f = 0; 2 > f; f++) p[f] > s[f] && (s[f] = p[f]), p[f] < a[f] && (a[f] = p[f])
                }
                e && (n.add(this.lowerBound, this.lowerBound, e), n.add(this.upperBound, this.upperBound, e)), i && (this.lowerBound[0] -= i, this.lowerBound[1] -= i, this.upperBound[0] += i, this.upperBound[1] += i)
            }, i.prototype.copy = function(t) {
                n.copy(this.lowerBound, t.lowerBound), n.copy(this.upperBound, t.upperBound)
            }, i.prototype.extend = function(t) {
                for (var e = 2; e--;) {
                    var o = t.lowerBound[e];
                    this.lowerBound[e] > o && (this.lowerBound[e] = o);
                    var i = t.upperBound[e];
                    this.upperBound[e] < i && (this.upperBound[e] = i)
                }
            }, i.prototype.overlaps = function(t) {
                var e = this.lowerBound,
                    o = this.upperBound,
                    i = t.lowerBound,
                    n = t.upperBound;
                return (i[0] <= o[0] && o[0] <= n[0] || e[0] <= n[0] && n[0] <= o[0]) && (i[1] <= o[1] && o[1] <= n[1] || e[1] <= n[1] && n[1] <= o[1])
            }, i.prototype.containsPoint = function(t) {
                var e = this.lowerBound,
                    o = this.upperBound;
                return e[0] <= t[0] && t[0] <= o[0] && e[1] <= t[1] && t[1] <= o[1]
            }, i.prototype.overlapsRay = function(t) {
                var e = 1 / t.direction[0],
                    o = 1 / t.direction[1],
                    i = (this.lowerBound[0] - t.from[0]) * e,
                    n = (this.upperBound[0] - t.from[0]) * e,
                    r = (this.lowerBound[1] - t.from[1]) * o,
                    a = (this.upperBound[1] - t.from[1]) * o,
                    s = Math.max(Math.max(Math.min(i, n), Math.min(r, a))),
                    c = Math.min(Math.min(Math.max(i, n), Math.max(r, a)));
                return 0 > c ? -1 : s > c ? -1 : s
            }
        }, {
            "../math/vec2": 30,
            "../utils/Utils": 57
        }],
        8: [function(t, e, o) {
            function i(t) {
                this.type = t, this.result = [], this.world = null, this.boundingVolumeType = i.AABB
            }
            var n = t("../math/vec2"),
                r = t("../objects/Body");
            e.exports = i, i.AABB = 1, i.BOUNDING_CIRCLE = 2, i.prototype.setWorld = function(t) {
                this.world = t
            }, i.prototype.getCollisionPairs = function(t) {};
            var a = n.create();
            i.boundingRadiusCheck = function(t, e) {
                n.sub(a, t.position, e.position);
                var o = n.squaredLength(a),
                    i = t.boundingRadius + e.boundingRadius;
                return i * i >= o
            }, i.aabbCheck = function(t, e) {
                return t.getAABB().overlaps(e.getAABB())
            }, i.prototype.boundingVolumeCheck = function(t, e) {
                var o;
                switch (this.boundingVolumeType) {
                    case i.BOUNDING_CIRCLE:
                        o = i.boundingRadiusCheck(t, e);
                        break;
                    case i.AABB:
                        o = i.aabbCheck(t, e);
                        break;
                    default:
                        throw new Error("Bounding volume type not recognized: " + this.boundingVolumeType)
                }
                return o
            }, i.canCollide = function(t, e) {
                var o = r.KINEMATIC,
                    i = r.STATIC;
                return t.type === i && e.type === i ? !1 : t.type === o && e.type === i || t.type === i && e.type === o ? !1 : t.type === o && e.type === o ? !1 : t.sleepState === r.SLEEPING && e.sleepState === r.SLEEPING ? !1 : t.sleepState === r.SLEEPING && e.type === i || e.sleepState === r.SLEEPING && t.type === i ? !1 : !0
            }, i.NAIVE = 1, i.SAP = 2
        }, {
            "../math/vec2": 30,
            "../objects/Body": 31
        }],
        9: [function(t, e, o) {
            function i() {
                n.call(this, n.NAIVE)
            }
            var n = (t("../shapes/Circle"), t("../shapes/Plane"), t("../shapes/Shape"), t("../shapes/Particle"), t("../collision/Broadphase"));
            t("../math/vec2"), e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.getCollisionPairs = function(t) {
                var e = t.bodies,
                    o = this.result;
                o.length = 0;
                for (var i = 0, r = e.length; i !== r; i++)
                    for (var a = e[i], s = 0; i > s; s++) {
                        var c = e[s];
                        n.canCollide(a, c) && this.boundingVolumeCheck(a, c) && o.push(a, c)
                    }
                return o
            }, i.prototype.aabbQuery = function(t, e, o) {
                o = o || [];
                for (var i = t.bodies, n = 0; n < i.length; n++) {
                    var r = i[n];
                    r.aabbNeedsUpdate && r.updateAABB(), r.aabb.overlaps(e) && o.push(r)
                }
                return o
            }
        }, {
            "../collision/Broadphase": 8,
            "../math/vec2": 30,
            "../shapes/Circle": 39,
            "../shapes/Particle": 43,
            "../shapes/Plane": 44,
            "../shapes/Shape": 45
        }],
        10: [function(t, e, o) {
            function i() {
                this.contactEquations = [], this.frictionEquations = [], this.enableFriction = !0, this.enabledEquations = !0, this.slipForce = 10, this.frictionCoefficient = .3, this.surfaceVelocity = 0, this.contactEquationPool = new l({
                    size: 32
                }), this.frictionEquationPool = new p({
                    size: 64
                }), this.restitution = 0, this.stiffness = d.DEFAULT_STIFFNESS, this.relaxation = d.DEFAULT_RELAXATION, this.frictionStiffness = d.DEFAULT_STIFFNESS, this.frictionRelaxation = d.DEFAULT_RELAXATION, this.enableFrictionReduction = !0, this.collidingBodiesLastStep = new u, this.contactSkinSize = .01
            }

            function n(t, e) {
                a.set(t.vertices[0], .5 * -e.length, -e.radius), a.set(t.vertices[1], .5 * e.length, -e.radius), a.set(t.vertices[2], .5 * e.length, e.radius), a.set(t.vertices[3], .5 * -e.length, e.radius)
            }

            function r(t, e, o, i) {
                for (var n = j, r = z, h = Y, l = K, p = t, u = e.vertices, d = null, f = 0; f !== u.length + 1; f++) {
                    var v = u[f % u.length],
                        y = u[(f + 1) % u.length];
                    a.rotate(n, v, i), a.rotate(r, y, i), c(n, n, o), c(r, r, o), s(h, n, p), s(l, r, p);
                    var m = a.crossLength(h, l);
                    if (null === d && (d = m), 0 >= m * d) return !1;
                    d = m
                }
                return !0
            }
            var a = t("../math/vec2"),
                s = a.sub,
                c = a.add,
                h = a.dot,
                l = (t("../utils/Utils"), t("../utils/ContactEquationPool")),
                p = t("../utils/FrictionEquationPool"),
                u = t("../utils/TupleDictionary"),
                d = t("../equations/Equation"),
                f = (t("../equations/ContactEquation"), t("../equations/FrictionEquation"), t("../shapes/Circle")),
                v = t("../shapes/Convex"),
                y = t("../shapes/Shape"),
                m = (t("../objects/Body"), t("../shapes/Box"));
            e.exports = i;
            var g = a.fromValues(0, 1),
                A = a.fromValues(0, 0),
                b = a.fromValues(0, 0),
                E = a.fromValues(0, 0),
                B = a.fromValues(0, 0),
                q = a.fromValues(0, 0),
                P = a.fromValues(0, 0),
                w = a.fromValues(0, 0),
                S = a.fromValues(0, 0),
                C = a.fromValues(0, 0),
                L = a.fromValues(0, 0),
                x = a.fromValues(0, 0),
                F = a.fromValues(0, 0),
                M = a.fromValues(0, 0),
                I = a.fromValues(0, 0),
                R = a.fromValues(0, 0),
                V = a.fromValues(0, 0),
                T = a.fromValues(0, 0),
                N = a.fromValues(0, 0),
                G = [],
                O = a.create(),
                U = a.create();
            i.prototype.bodiesOverlap = function(t, e) {
                for (var o = O, i = U, n = 0, r = t.shapes.length; n !== r; n++) {
                    var a = t.shapes[n];
                    t.toWorldFrame(o, a.position);
                    for (var s = 0, c = e.shapes.length; s !== c; s++) {
                        var h = e.shapes[s];
                        if (e.toWorldFrame(i, h.position), this[a.type | h.type](t, a, o, a.angle + t.angle, e, h, i, h.angle + e.angle, !0)) return !0
                    }
                }
                return !1
            }, i.prototype.collidedLastStep = function(t, e) {
                var o = 0 | t.id,
                    i = 0 | e.id;
                return !!this.collidingBodiesLastStep.get(o, i)
            }, i.prototype.reset = function() {
                this.collidingBodiesLastStep.reset();
                for (var t = this.contactEquations, e = t.length; e--;) {
                    var o = t[e],
                        i = o.bodyA.id,
                        n = o.bodyB.id;
                    this.collidingBodiesLastStep.set(i, n, !0)
                }
                for (var r = this.contactEquations, a = this.frictionEquations, s = 0; s < r.length; s++) this.contactEquationPool.release(r[s]);
                for (var s = 0; s < a.length; s++) this.frictionEquationPool.release(a[s]);
                this.contactEquations.length = this.frictionEquations.length = 0
            }, i.prototype.createContactEquation = function(t, e, o, i) {
                var n = this.contactEquationPool.get();
                return n.bodyA = t, n.bodyB = e, n.shapeA = o, n.shapeB = i, n.restitution = this.restitution, n.firstImpact = !this.collidedLastStep(t, e), n.stiffness = this.stiffness, n.relaxation = this.relaxation, n.needsUpdate = !0, n.enabled = this.enabledEquations, n.offset = this.contactSkinSize, n
            }, i.prototype.createFrictionEquation = function(t, e, o, i) {
                var n = this.frictionEquationPool.get();
                return n.bodyA = t, n.bodyB = e, n.shapeA = o, n.shapeB = i, n.setSlipForce(this.slipForce), n.frictionCoefficient = this.frictionCoefficient, n.relativeVelocity = this.surfaceVelocity, n.enabled = this.enabledEquations, n.needsUpdate = !0, n.stiffness = this.frictionStiffness, n.relaxation = this.frictionRelaxation, n.contactEquations.length = 0, n
            }, i.prototype.createFrictionFromContact = function(t) {
                var e = this.createFrictionEquation(t.bodyA, t.bodyB, t.shapeA, t.shapeB);
                return a.copy(e.contactPointA, t.contactPointA), a.copy(e.contactPointB, t.contactPointB), a.rotate90cw(e.t, t.normalA), e.contactEquations.push(t), e
            }, i.prototype.createFrictionFromAverage = function(t) {
                var e = this.contactEquations[this.contactEquations.length - 1],
                    o = this.createFrictionEquation(e.bodyA, e.bodyB, e.shapeA, e.shapeB),
                    i = e.bodyA;
                e.bodyB, a.set(o.contactPointA, 0, 0), a.set(o.contactPointB, 0, 0), a.set(o.t, 0, 0);
                for (var n = 0; n !== t; n++) e = this.contactEquations[this.contactEquations.length - 1 - n], e.bodyA === i ? (a.add(o.t, o.t, e.normalA), a.add(o.contactPointA, o.contactPointA, e.contactPointA), a.add(o.contactPointB, o.contactPointB, e.contactPointB)) : (a.sub(o.t, o.t, e.normalA), a.add(o.contactPointA, o.contactPointA, e.contactPointB), a.add(o.contactPointB, o.contactPointB, e.contactPointA)), o.contactEquations.push(e);
                var r = 1 / t;
                return a.scale(o.contactPointA, o.contactPointA, r), a.scale(o.contactPointB, o.contactPointB, r), a.normalize(o.t, o.t), a.rotate90cw(o.t, o.t), o
            }, i.prototype[y.LINE | y.CONVEX] = i.prototype.convexLine = function(t, e, o, i, n, r, a, s, c) {
                return c ? !1 : 0
            }, i.prototype[y.LINE | y.BOX] = i.prototype.lineBox = function(t, e, o, i, n, r, a, s, c) {
                return c ? !1 : 0
            };
            var k = new m({
                    width: 1,
                    height: 1
                }),
                _ = a.create();
            i.prototype[y.CAPSULE | y.CONVEX] = i.prototype[y.CAPSULE | y.BOX] = i.prototype.convexCapsule = function(t, e, o, i, r, s, c, h, l) {
                var p = _;
                a.set(p, s.length / 2, 0), a.rotate(p, p, h), a.add(p, p, c);
                var u = this.circleConvex(r, s, p, h, t, e, o, i, l, s.radius);
                a.set(p, -s.length / 2, 0), a.rotate(p, p, h), a.add(p, p, c);
                var d = this.circleConvex(r, s, p, h, t, e, o, i, l, s.radius);
                if (l && (u || d)) return !0;
                var f = k;
                n(f, s);
                var v = this.convexConvex(t, e, o, i, r, f, c, h, l);
                return v + u + d
            }, i.prototype[y.CAPSULE | y.LINE] = i.prototype.lineCapsule = function(t, e, o, i, n, r, a, s, c) {
                return c ? !1 : 0
            };
            var D = a.create(),
                W = a.create(),
                X = new m({
                    width: 1,
                    height: 1
                });
            i.prototype[y.CAPSULE | y.CAPSULE] = i.prototype.capsuleCapsule = function(t, e, o, i, r, s, c, h, l) {
                for (var p, u = D, d = W, f = 0, v = 0; 2 > v; v++) {
                    a.set(u, (0 === v ? -1 : 1) * e.length / 2, 0), a.rotate(u, u, i), a.add(u, u, o);
                    for (var y = 0; 2 > y; y++) {
                        a.set(d, (0 === y ? -1 : 1) * s.length / 2, 0), a.rotate(d, d, h), a.add(d, d, c), this.enableFrictionReduction && (p = this.enableFriction, this.enableFriction = !1);
                        var m = this.circleCircle(t, e, u, i, r, s, d, h, l, e.radius, s.radius);
                        if (this.enableFrictionReduction && (this.enableFriction = p), l && m) return !0;
                        f += m
                    }
                }
                this.enableFrictionReduction && (p = this.enableFriction, this.enableFriction = !1);
                var g = X;
                n(g, e);
                var A = this.convexCapsule(t, g, o, i, r, s, c, h, l);
                if (this.enableFrictionReduction && (this.enableFriction = p), l && A) return !0;
                if (f += A, this.enableFrictionReduction) {
                    var p = this.enableFriction;
                    this.enableFriction = !1
                }
                n(g, s);
                var b = this.convexCapsule(r, g, c, h, t, e, o, i, l);
                return this.enableFrictionReduction && (this.enableFriction = p), l && b ? !0 : (f += b, this.enableFrictionReduction && f && this.enableFriction && this.frictionEquations.push(this.createFrictionFromAverage(f)), f)
            }, i.prototype[y.LINE | y.LINE] = i.prototype.lineLine = function(t, e, o, i, n, r, a, s, c) {
                return c ? !1 : 0
            }, i.prototype[y.PLANE | y.LINE] = i.prototype.planeLine = function(t, e, o, i, n, r, l, p, u) {
                var d = A,
                    f = b,
                    v = E,
                    y = B,
                    m = q,
                    L = P,
                    x = w,
                    F = S,
                    M = C,
                    I = G,
                    R = 0;
                a.set(d, -r.length / 2, 0), a.set(f, r.length / 2, 0), a.rotate(v, d, p), a.rotate(y, f, p), c(v, v, l), c(y, y, l), a.copy(d, v), a.copy(f, y), s(m, f, d), a.normalize(L, m), a.rotate90cw(M, L), a.rotate(F, g, i), I[0] = d, I[1] = f;
                for (var V = 0; V < I.length; V++) {
                    var T = I[V];
                    s(x, T, o);
                    var N = h(x, F);
                    if (0 > N) {
                        if (u) return !0;
                        var O = this.createContactEquation(t, n, e, r);
                        R++, a.copy(O.normalA, F), a.normalize(O.normalA, O.normalA), a.scale(x, F, N), s(O.contactPointA, T, x), s(O.contactPointA, O.contactPointA, t.position), s(O.contactPointB, T, l), c(O.contactPointB, O.contactPointB, l), s(O.contactPointB, O.contactPointB, n.position), this.contactEquations.push(O), this.enableFrictionReduction || this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(O))
                    }
                }
                return u ? !1 : (this.enableFrictionReduction || R && this.enableFriction && this.frictionEquations.push(this.createFrictionFromAverage(R)), R)
            }, i.prototype[y.PARTICLE | y.CAPSULE] = i.prototype.particleCapsule = function(t, e, o, i, n, r, a, s, c) {
                return this.circleLine(t, e, o, i, n, r, a, s, c, r.radius, 0)
            }, i.prototype[y.CIRCLE | y.LINE] = i.prototype.circleLine = function(t, e, o, i, n, r, l, p, u, d, f) {
                var d = d || 0,
                    f = "undefined" != typeof f ? f : e.radius,
                    v = A,
                    y = b,
                    m = E,
                    g = B,
                    R = q,
                    V = P,
                    T = w,
                    N = S,
                    O = C,
                    U = L,
                    k = x,
                    _ = F,
                    D = M,
                    W = I,
                    X = G;
                a.set(N, -r.length / 2, 0), a.set(O, r.length / 2, 0), a.rotate(U, N, p), a.rotate(k, O, p), c(U, U, l), c(k, k, l), a.copy(N, U), a.copy(O, k), s(V, O, N), a.normalize(T, V), a.rotate90cw(R, T), s(_, o, N);
                var j = h(_, R);
                s(g, N, l), s(D, o, l);
                var z = f + d;
                if (Math.abs(j) < z) {
                    a.scale(v, R, j), s(m, o, v), a.scale(y, R, h(R, D)), a.normalize(y, y), a.scale(y, y, d), c(m, m, y);
                    var Y = h(T, m),
                        K = h(T, N),
                        H = h(T, O);
                    if (Y > K && H > Y) {
                        if (u) return !0;
                        var Z = this.createContactEquation(t, n, e, r);
                        return a.scale(Z.normalA, v, -1), a.normalize(Z.normalA, Z.normalA), a.scale(Z.contactPointA, Z.normalA, f), c(Z.contactPointA, Z.contactPointA, o), s(Z.contactPointA, Z.contactPointA, t.position), s(Z.contactPointB, m, l), c(Z.contactPointB, Z.contactPointB, l), s(Z.contactPointB, Z.contactPointB, n.position), this.contactEquations.push(Z), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(Z)), 1
                    }
                }
                X[0] = N, X[1] = O;
                for (var J = 0; J < X.length; J++) {
                    var Q = X[J];
                    if (s(_, Q, o), a.squaredLength(_) < Math.pow(z, 2)) {
                        if (u) return !0;
                        var Z = this.createContactEquation(t, n, e, r);
                        return a.copy(Z.normalA, _), a.normalize(Z.normalA, Z.normalA), a.scale(Z.contactPointA, Z.normalA, f), c(Z.contactPointA, Z.contactPointA, o), s(Z.contactPointA, Z.contactPointA, t.position), s(Z.contactPointB, Q, l), a.scale(W, Z.normalA, -d), c(Z.contactPointB, Z.contactPointB, W), c(Z.contactPointB, Z.contactPointB, l), s(Z.contactPointB, Z.contactPointB, n.position), this.contactEquations.push(Z), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(Z)), 1
                    }
                }
                return 0
            }, i.prototype[y.CIRCLE | y.CAPSULE] = i.prototype.circleCapsule = function(t, e, o, i, n, r, a, s, c) {
                return this.circleLine(t, e, o, i, n, r, a, s, c, r.radius)
            }, i.prototype[y.CIRCLE | y.CONVEX] = i.prototype[y.CIRCLE | y.BOX] = i.prototype.circleConvex = function(t, e, o, i, n, h, l, p, u, d) {
                for (var d = "number" == typeof d ? d : e.radius, f = A, v = b, y = E, m = B, g = q, P = L, w = x, S = M, C = I, F = R, T = V, N = !1, G = Number.MAX_VALUE, O = h.vertices, U = 0; U !== O.length + 1; U++) {
                    var k = O[U % O.length],
                        _ = O[(U + 1) % O.length];
                    if (a.rotate(f, k, p), a.rotate(v, _, p), c(f, f, l), c(v, v, l), s(y, v, f), a.normalize(m, y), a.rotate90cw(g, m), a.scale(C, g, -e.radius), c(C, C, o), r(C, h, l, p)) {
                        a.sub(F, f, C);
                        var D = Math.abs(a.dot(F, g));
                        G > D && (a.copy(T, C), G = D, a.scale(S, g, D), a.add(S, S, C), N = !0)
                    }
                }
                if (N) {
                    if (u) return !0;
                    var W = this.createContactEquation(t, n, e, h);
                    return a.sub(W.normalA, T, o), a.normalize(W.normalA, W.normalA), a.scale(W.contactPointA, W.normalA, d), c(W.contactPointA, W.contactPointA, o), s(W.contactPointA, W.contactPointA, t.position), s(W.contactPointB, S, l), c(W.contactPointB, W.contactPointB, l), s(W.contactPointB, W.contactPointB, n.position), this.contactEquations.push(W), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(W)), 1
                }
                if (d > 0)
                    for (var U = 0; U < O.length; U++) {
                        var X = O[U];
                        if (a.rotate(w, X, p), c(w, w, l), s(P, w, o), a.squaredLength(P) < Math.pow(d, 2)) {
                            if (u) return !0;
                            var W = this.createContactEquation(t, n, e, h);
                            return a.copy(W.normalA, P), a.normalize(W.normalA, W.normalA), a.scale(W.contactPointA, W.normalA, d), c(W.contactPointA, W.contactPointA, o), s(W.contactPointA, W.contactPointA, t.position), s(W.contactPointB, w, l), c(W.contactPointB, W.contactPointB, l), s(W.contactPointB, W.contactPointB, n.position), this.contactEquations.push(W), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(W)), 1
                        }
                    }
                return 0
            };
            var j = a.create(),
                z = a.create(),
                Y = a.create(),
                K = a.create();
            i.prototype[y.PARTICLE | y.CONVEX] = i.prototype[y.PARTICLE | y.BOX] = i.prototype.particleConvex = function(t, e, o, i, n, l, p, u, d) {
                var f = A,
                    v = b,
                    y = E,
                    m = B,
                    g = q,
                    S = P,
                    C = w,
                    x = L,
                    F = M,
                    I = T,
                    R = N,
                    V = Number.MAX_VALUE,
                    G = !1,
                    O = l.vertices;
                if (!r(o, l, p, u)) return 0;
                if (d) return !0;
                for (var U = 0; U !== O.length + 1; U++) {
                    var k = O[U % O.length],
                        _ = O[(U + 1) % O.length];
                    a.rotate(f, k, u), a.rotate(v, _, u), c(f, f, p), c(v, v, p), s(y, v, f), a.normalize(m, y), a.rotate90cw(g, m), s(x, o, f), h(x, g), s(S, f, p), s(C, o, p), a.sub(I, f, o);
                    var D = Math.abs(a.dot(I, g));
                    V > D && (V = D, a.scale(F, g, D), a.add(F, F, o), a.copy(R, g), G = !0)
                }
                if (G) {
                    var W = this.createContactEquation(t, n, e, l);
                    return a.scale(W.normalA, R, -1), a.normalize(W.normalA, W.normalA), a.set(W.contactPointA, 0, 0), c(W.contactPointA, W.contactPointA, o), s(W.contactPointA, W.contactPointA, t.position), s(W.contactPointB, F, p), c(W.contactPointB, W.contactPointB, p), s(W.contactPointB, W.contactPointB, n.position), this.contactEquations.push(W), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(W)), 1
                }
                return 0
            }, i.prototype[y.CIRCLE] = i.prototype.circleCircle = function(t, e, o, i, n, r, h, l, p, u, d) {
                var f = A,
                    u = u || e.radius,
                    d = d || r.radius;
                s(f, o, h);
                var v = u + d;
                if (a.squaredLength(f) > Math.pow(v, 2)) return 0;
                if (p) return !0;
                var y = this.createContactEquation(t, n, e, r);
                return s(y.normalA, h, o), a.normalize(y.normalA, y.normalA), a.scale(y.contactPointA, y.normalA, u), a.scale(y.contactPointB, y.normalA, -d), c(y.contactPointA, y.contactPointA, o), s(y.contactPointA, y.contactPointA, t.position), c(y.contactPointB, y.contactPointB, h), s(y.contactPointB, y.contactPointB, n.position), this.contactEquations.push(y), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(y)), 1
            }, i.prototype[y.PLANE | y.CONVEX] = i.prototype[y.PLANE | y.BOX] = i.prototype.planeConvex = function(t, e, o, i, n, r, l, p, u) {
                var d = A,
                    f = b,
                    v = E,
                    y = 0;
                a.rotate(f, g, i);
                for (var m = 0; m !== r.vertices.length; m++) {
                    var B = r.vertices[m];
                    if (a.rotate(d, B, p), c(d, d, l), s(v, d, o), h(v, f) <= 0) {
                        if (u) return !0;
                        y++;
                        var q = this.createContactEquation(t, n, e, r);
                        s(v, d, o), a.copy(q.normalA, f);
                        var P = h(v, q.normalA);
                        a.scale(v, q.normalA, P), s(q.contactPointB, d, n.position), s(q.contactPointA, d, v), s(q.contactPointA, q.contactPointA, t.position), this.contactEquations.push(q), this.enableFrictionReduction || this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(q))
                    }
                }
                return this.enableFrictionReduction && this.enableFriction && y && this.frictionEquations.push(this.createFrictionFromAverage(y)), y
            }, i.prototype[y.PARTICLE | y.PLANE] = i.prototype.particlePlane = function(t, e, o, i, n, r, c, l, p) {
                var u = A,
                    d = b;
                l = l || 0, s(u, o, c), a.rotate(d, g, l);
                var f = h(u, d);
                if (f > 0) return 0;
                if (p) return !0;
                var v = this.createContactEquation(n, t, r, e);
                return a.copy(v.normalA, d), a.scale(u, v.normalA, f), s(v.contactPointA, o, u), s(v.contactPointA, v.contactPointA, n.position), s(v.contactPointB, o, t.position), this.contactEquations.push(v), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(v)), 1
            }, i.prototype[y.CIRCLE | y.PARTICLE] = i.prototype.circleParticle = function(t, e, o, i, n, r, h, l, p) {
                var u = A;
                if (s(u, h, o), a.squaredLength(u) > Math.pow(e.radius, 2)) return 0;
                if (p) return !0;
                var d = this.createContactEquation(t, n, e, r);
                return a.copy(d.normalA, u), a.normalize(d.normalA, d.normalA), a.scale(d.contactPointA, d.normalA, e.radius), c(d.contactPointA, d.contactPointA, o), s(d.contactPointA, d.contactPointA, t.position), s(d.contactPointB, h, n.position), this.contactEquations.push(d), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(d)), 1
            };
            var H = new f({
                    radius: 1
                }),
                Z = a.create(),
                J = a.create();
            a.create(), i.prototype[y.PLANE | y.CAPSULE] = i.prototype.planeCapsule = function(t, e, o, i, n, r, s, h, l) {
                var p = Z,
                    u = J,
                    d = H;
                a.set(p, -r.length / 2, 0), a.rotate(p, p, h), c(p, p, s), a.set(u, r.length / 2, 0), a.rotate(u, u, h), c(u, u, s), d.radius = r.radius;
                var f;
                this.enableFrictionReduction && (f = this.enableFriction, this.enableFriction = !1);
                var v = this.circlePlane(n, d, p, 0, t, e, o, i, l),
                    y = this.circlePlane(n, d, u, 0, t, e, o, i, l);
                if (this.enableFrictionReduction && (this.enableFriction = f), l) return v || y;
                var m = v + y;
                return this.enableFrictionReduction && m && this.frictionEquations.push(this.createFrictionFromAverage(m)), m
            }, i.prototype[y.CIRCLE | y.PLANE] = i.prototype.circlePlane = function(t, e, o, i, n, r, l, p, u) {
                var d = t,
                    f = e,
                    v = o,
                    y = n,
                    m = l,
                    B = p;
                B = B || 0;
                var q = A,
                    P = b,
                    w = E;
                s(q, v, m), a.rotate(P, g, B);
                var S = h(P, q);
                if (S > f.radius) return 0;
                if (u) return !0;
                var C = this.createContactEquation(y, d, r, e);
                return a.copy(C.normalA, P), a.scale(C.contactPointB, C.normalA, -f.radius), c(C.contactPointB, C.contactPointB, v), s(C.contactPointB, C.contactPointB, d.position), a.scale(w, C.normalA, S), s(C.contactPointA, q, w), c(C.contactPointA, C.contactPointA, m), s(C.contactPointA, C.contactPointA, y.position), this.contactEquations.push(C), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(C)), 1
            }, i.prototype[y.CONVEX] = i.prototype[y.CONVEX | y.BOX] = i.prototype[y.BOX] = i.prototype.convexConvex = function(t, e, o, n, r, l, p, u, d, f) {
                var v = A,
                    y = b,
                    m = E,
                    g = B,
                    P = q,
                    L = w,
                    x = S,
                    F = C,
                    M = 0,
                    f = "number" == typeof f ? f : 0,
                    I = i.findSeparatingAxis(e, o, n, l, p, u, v);
                if (!I) return 0;
                s(x, p, o), h(v, x) > 0 && a.scale(v, v, -1);
                var R = i.getClosestEdge(e, n, v, !0),
                    V = i.getClosestEdge(l, u, v);
                if (-1 === R || -1 === V) return 0;
                for (var T = 0; 2 > T; T++) {
                    var N = R,
                        G = V,
                        O = e,
                        U = l,
                        k = o,
                        _ = p,
                        D = n,
                        W = u,
                        X = t,
                        j = r;
                    if (0 === T) {
                        var z;
                        z = N, N = G, G = z, z = O, O = U, U = z, z = k, k = _, _ = z, z = D, D = W, W = z, z = X, X = j, j = z
                    }
                    for (var Y = G; G + 2 > Y; Y++) {
                        var K = U.vertices[(Y + U.vertices.length) % U.vertices.length];
                        a.rotate(y, K, W), c(y, y, _);
                        for (var H = 0, Z = N - 1; N + 2 > Z; Z++) {
                            var J = O.vertices[(Z + O.vertices.length) % O.vertices.length],
                                Q = O.vertices[(Z + 1 + O.vertices.length) % O.vertices.length];
                            a.rotate(m, J, D), a.rotate(g, Q, D), c(m, m, k), c(g, g, k), s(P, g, m), a.rotate90cw(F, P), a.normalize(F, F), s(x, y, m);
                            var $ = h(F, x);
                            (Z === N && f >= $ || Z !== N && 0 >= $) && H++
                        }
                        if (H >= 3) {
                            if (d) return !0;
                            var te = this.createContactEquation(X, j, O, U);
                            M++;
                            var J = O.vertices[N % O.vertices.length],
                                Q = O.vertices[(N + 1) % O.vertices.length];
                            a.rotate(m, J, D), a.rotate(g, Q, D), c(m, m, k), c(g, g, k), s(P, g, m), a.rotate90cw(te.normalA, P), a.normalize(te.normalA, te.normalA), s(x, y, m);
                            var $ = h(te.normalA, x);
                            a.scale(L, te.normalA, $), s(te.contactPointA, y, k), s(te.contactPointA, te.contactPointA, L), c(te.contactPointA, te.contactPointA, k), s(te.contactPointA, te.contactPointA, X.position), s(te.contactPointB, y, _), c(te.contactPointB, te.contactPointB, _), s(te.contactPointB, te.contactPointB, j.position), this.contactEquations.push(te), this.enableFrictionReduction || this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(te))
                        }
                    }
                }
                return this.enableFrictionReduction && this.enableFriction && M && this.frictionEquations.push(this.createFrictionFromAverage(M)), M
            };
            var Q = a.fromValues(0, 0);
            i.projectConvexOntoAxis = function(t, e, o, i, n) {
                var r, s, c = null,
                    l = null,
                    p = Q;
                a.rotate(p, i, -o);
                for (var u = 0; u < t.vertices.length; u++) r = t.vertices[u], s = h(r, p), (null === c || s > c) && (c = s), (null === l || l > s) && (l = s);
                if (l > c) {
                    var d = l;
                    l = c, c = d
                }
                var f = h(e, i);
                a.set(n, l + f, c + f)
            };
            var $ = a.fromValues(0, 0),
                te = a.fromValues(0, 0),
                ee = a.fromValues(0, 0),
                oe = a.fromValues(0, 0),
                ie = a.fromValues(0, 0),
                ne = a.fromValues(0, 0);
            i.findSeparatingAxis = function(t, e, o, n, r, c, h) {
                var l = null,
                    p = !1,
                    u = !1,
                    d = $,
                    f = te,
                    v = ee,
                    y = oe,
                    g = ie,
                    A = ne;
                if (t instanceof m && n instanceof m)
                    for (var b = 0; 2 !== b; b++) {
                        var E = t,
                            B = o;
                        1 === b && (E = n, B = c);
                        for (var q = 0; 2 !== q; q++) {
                            0 === q ? a.set(y, 0, 1) : 1 === q && a.set(y, 1, 0), 0 !== B && a.rotate(y, y, B), i.projectConvexOntoAxis(t, e, o, y, g), i.projectConvexOntoAxis(n, r, c, y, A);
                            var P = g,
                                w = A,
                                S = !1;
                            g[0] > A[0] && (w = g, P = A, S = !0);
                            var C = w[0] - P[1];
                            p = 0 >= C, (null === l || C > l) && (a.copy(h, y), l = C, u = p)
                        }
                    } else
                        for (var b = 0; 2 !== b; b++) {
                            var E = t,
                                B = o;
                            1 === b && (E = n, B = c);
                            for (var q = 0; q !== E.vertices.length; q++) {
                                a.rotate(f, E.vertices[q], B), a.rotate(v, E.vertices[(q + 1) % E.vertices.length], B), s(d, v, f), a.rotate90cw(y, d), a.normalize(y, y), i.projectConvexOntoAxis(t, e, o, y, g), i.projectConvexOntoAxis(n, r, c, y, A);
                                var P = g,
                                    w = A,
                                    S = !1;
                                g[0] > A[0] && (w = g, P = A, S = !0);
                                var C = w[0] - P[1];
                                p = 0 >= C, (null === l || C > l) && (a.copy(h, y), l = C, u = p)
                            }
                        }
                return u
            };
            var re = a.fromValues(0, 0),
                ae = a.fromValues(0, 0),
                se = a.fromValues(0, 0);
            i.getClosestEdge = function(t, e, o, i) {
                var n = re,
                    r = ae,
                    c = se;
                a.rotate(n, o, -e), i && a.scale(n, n, -1);
                for (var l = -1, p = t.vertices.length, u = -1, d = 0; d !== p; d++) {
                    s(r, t.vertices[(d + 1) % p], t.vertices[d % p]), a.rotate90cw(c, r), a.normalize(c, c);
                    var f = h(c, n);
                    (-1 === l || f > u) && (l = d % p, u = f)
                }
                return l
            };
            var ce = a.create(),
                he = a.create(),
                le = a.create(),
                pe = a.create(),
                ue = a.create(),
                de = a.create(),
                fe = a.create();
            i.prototype[y.CIRCLE | y.HEIGHTFIELD] = i.prototype.circleHeightfield = function(t, e, o, i, n, r, h, l, p, u) {
                var d = r.heights,
                    u = u || e.radius,
                    f = r.elementWidth,
                    v = he,
                    y = ce,
                    m = ue,
                    g = fe,
                    A = de,
                    b = le,
                    E = pe,
                    B = Math.floor((o[0] - u - h[0]) / f),
                    q = Math.ceil((o[0] + u - h[0]) / f);
                0 > B && (B = 0), q >= d.length && (q = d.length - 1);
                for (var P = d[B], w = d[q], S = B; q > S; S++) d[S] < w && (w = d[S]), d[S] > P && (P = d[S]);
                if (o[1] - u > P) return p ? !1 : 0;
                for (var C = !1, S = B; q > S; S++) {
                    a.set(b, S * f, d[S]), a.set(E, (S + 1) * f, d[S + 1]), a.add(b, b, h), a.add(E, E, h), a.sub(A, E, b), a.rotate(A, A, Math.PI / 2), a.normalize(A, A), a.scale(y, A, -u), a.add(y, y, o), a.sub(v, y, b);
                    var L = a.dot(v, A);
                    if (y[0] >= b[0] && y[0] < E[0] && 0 >= L) {
                        if (p) return !0;
                        C = !0, a.scale(v, A, -L), a.add(m, y, v), a.copy(g, A);
                        var x = this.createContactEquation(n, t, r, e);
                        a.copy(x.normalA, g), a.scale(x.contactPointB, x.normalA, -u), c(x.contactPointB, x.contactPointB, o), s(x.contactPointB, x.contactPointB, t.position), a.copy(x.contactPointA, m), a.sub(x.contactPointA, x.contactPointA, n.position), this.contactEquations.push(x), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(x))
                    }
                }
                if (C = !1, u > 0)
                    for (var S = B; q >= S; S++)
                        if (a.set(b, S * f, d[S]), a.add(b, b, h), a.sub(v, o, b), a.squaredLength(v) < Math.pow(u, 2)) {
                            if (p) return !0;
                            C = !0;
                            var x = this.createContactEquation(n, t, r, e);
                            a.copy(x.normalA, v), a.normalize(x.normalA, x.normalA), a.scale(x.contactPointB, x.normalA, -u), c(x.contactPointB, x.contactPointB, o), s(x.contactPointB, x.contactPointB, t.position), s(x.contactPointA, b, h), c(x.contactPointA, x.contactPointA, h), s(x.contactPointA, x.contactPointA, n.position), this.contactEquations.push(x), this.enableFriction && this.frictionEquations.push(this.createFrictionFromContact(x))
                        }
                return C ? 1 : 0
            };
            var ve = a.create(),
                ye = a.create(),
                me = a.create(),
                ge = new v({
                    vertices: [a.create(), a.create(), a.create(), a.create()]
                });
            i.prototype[y.BOX | y.HEIGHTFIELD] = i.prototype[y.CONVEX | y.HEIGHTFIELD] = i.prototype.convexHeightfield = function(t, e, o, i, n, r, s, c, h) {
                var l = r.heights,
                    p = r.elementWidth,
                    u = ve,
                    d = ye,
                    f = me,
                    v = ge,
                    y = Math.floor((t.aabb.lowerBound[0] - s[0]) / p),
                    m = Math.ceil((t.aabb.upperBound[0] - s[0]) / p);
                0 > y && (y = 0), m >= l.length && (m = l.length - 1);
                for (var g = l[y], A = l[m], b = y; m > b; b++) l[b] < A && (A = l[b]), l[b] > g && (g = l[b]);
                if (t.aabb.lowerBound[1] > g) return h ? !1 : 0;
                for (var E = 0, b = y; m > b; b++) {
                    a.set(u, b * p, l[b]), a.set(d, (b + 1) * p, l[b + 1]), a.add(u, u, s), a.add(d, d, s);
                    var B = 100;
                    a.set(f, .5 * (d[0] + u[0]), .5 * (d[1] + u[1] - B)), a.sub(v.vertices[0], d, f), a.sub(v.vertices[1], u, f), a.copy(v.vertices[2], v.vertices[1]), a.copy(v.vertices[3], v.vertices[0]), v.vertices[2][1] -= B, v.vertices[3][1] -= B, E += this.convexConvex(t, e, o, i, n, v, f, 0, h)
                }
                return E
            }
        }, {
            "../equations/ContactEquation": 21,
            "../equations/Equation": 22,
            "../equations/FrictionEquation": 23,
            "../math/vec2": 30,
            "../objects/Body": 31,
            "../shapes/Box": 37,
            "../shapes/Circle": 39,
            "../shapes/Convex": 40,
            "../shapes/Shape": 45,
            "../utils/ContactEquationPool": 48,
            "../utils/FrictionEquationPool": 49,
            "../utils/TupleDictionary": 56,
            "../utils/Utils": 57
        }],
        11: [function(t, e, o) {
            function i(t) {
                t = t || {}, this.from = t.from ? r.fromValues(t.from[0], t.from[1]) : r.create(), this.to = t.to ? r.fromValues(t.to[0], t.to[1]) : r.create(), this.checkCollisionResponse = void 0 !== t.checkCollisionResponse ? t.checkCollisionResponse : !0, this.skipBackfaces = !!t.skipBackfaces, this.collisionMask = void 0 !== t.collisionMask ? t.collisionMask : -1, this.collisionGroup = void 0 !== t.collisionGroup ? t.collisionGroup : -1, this.mode = void 0 !== t.mode ? t.mode : i.ANY, this.callback = t.callback || function(t) {}, this.direction = r.create(), this.length = 1, this.update()
            }

            function n(t, e, o) {
                r.sub(s, o, t);
                var i = r.dot(s, e);
                return r.scale(c, e, i), r.add(c, c, t), r.squaredDistance(o, c)
            }
            e.exports = i;
            var r = t("../math/vec2");
            t("../collision/RaycastResult"), t("../shapes/Shape"), t("../collision/AABB"), i.prototype.constructor = i, i.CLOSEST = 1, i.ANY = 2, i.ALL = 4, i.prototype.update = function() {
                var t = this.direction;
                r.sub(t, this.to, this.from), this.length = r.length(t), r.normalize(t, t)
            }, i.prototype.intersectBodies = function(t, e) {
                for (var o = 0, i = e.length; !t.shouldStop(this) && i > o; o++) {
                    var n = e[o],
                        r = n.getAABB();
                    (r.overlapsRay(this) >= 0 || r.containsPoint(this.from)) && this.intersectBody(t, n)
                }
            };
            var a = r.create();
            i.prototype.intersectBody = function(t, e) {
                var o = this.checkCollisionResponse;
                if (!o || e.collisionResponse)
                    for (var i = a, n = 0, s = e.shapes.length; s > n; n++) {
                        var c = e.shapes[n];
                        if ((!o || c.collisionResponse) && 0 !== (this.collisionGroup & c.collisionMask) && 0 !== (c.collisionGroup & this.collisionMask)) {
                            r.rotate(i, c.position, e.angle), r.add(i, i, e.position);
                            var h = c.angle + e.angle;
                            if (this.intersectShape(t, c, h, i, e), t.shouldStop(this)) break
                        }
                    }
            }, i.prototype.intersectShape = function(t, e, o, i, r) {
                var a = this.from,
                    s = n(a, this.direction, i);
                s > e.boundingRadius * e.boundingRadius || (this._currentBody = r, this._currentShape = e, e.raycast(t, this, i, o), this._currentBody = this._currentShape = null)
            }, i.prototype.getAABB = function(t) {
                var e = this.to,
                    o = this.from;
                r.set(t.lowerBound, Math.min(e[0], o[0]), Math.min(e[1], o[1])), r.set(t.upperBound, Math.max(e[0], o[0]), Math.max(e[1], o[1]))
            }, r.create(), i.prototype.reportIntersection = function(t, e, o, n) {
                var a = (this.from, this.to, this._currentShape),
                    s = this._currentBody;
                if (!(this.skipBackfaces && r.dot(o, this.direction) > 0)) switch (this.mode) {
                    case i.ALL:
                        t.set(o, a, s, e, n), this.callback(t);
                        break;
                    case i.CLOSEST:
                        (e < t.fraction || !t.hasHit()) && t.set(o, a, s, e, n);
                        break;
                    case i.ANY:
                        t.set(o, a, s, e, n)
                }
            };
            var s = r.create(),
                c = r.create()
        }, {
            "../collision/AABB": 7,
            "../collision/RaycastResult": 12,
            "../math/vec2": 30,
            "../shapes/Shape": 45
        }],
        12: [function(t, e, o) {
            function i() {
                this.normal = n.create(), this.shape = null, this.body = null, this.faceIndex = -1, this.fraction = -1, this.isStopped = !1
            }
            var n = t("../math/vec2"),
                r = t("../collision/Ray");
            e.exports = i, i.prototype.reset = function() {
                n.set(this.normal, 0, 0), this.shape = null, this.body = null, this.faceIndex = -1, this.fraction = -1, this.isStopped = !1
            }, i.prototype.getHitDistance = function(t) {
                return n.distance(t.from, t.to) * this.fraction
            }, i.prototype.hasHit = function() {
                return -1 !== this.fraction
            }, i.prototype.getHitPoint = function(t, e) {
                n.lerp(t, e.from, e.to, this.fraction)
            }, i.prototype.stop = function() {
                this.isStopped = !0
            }, i.prototype.shouldStop = function(t) {
                return this.isStopped || -1 !== this.fraction && t.mode === r.ANY
            }, i.prototype.set = function(t, e, o, i, r) {
                n.copy(this.normal, t), this.shape = e, this.body = o, this.fraction = i, this.faceIndex = r
            }
        }, {
            "../collision/Ray": 11,
            "../math/vec2": 30
        }],
        13: [function(t, e, o) {
            function i() {
                r.call(this, r.SAP), this.axisList = [], this.axisIndex = 0;
                var t = this;
                this._addBodyHandler = function(e) {
                    t.axisList.push(e.body)
                }, this._removeBodyHandler = function(e) {
                    var o = t.axisList.indexOf(e.body); - 1 !== o && t.axisList.splice(o, 1)
                }
            }
            var n = t("../utils/Utils"),
                r = t("../collision/Broadphase");
            e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.setWorld = function(t) {
                this.axisList.length = 0, n.appendArray(this.axisList, t.bodies), t.off("addBody", this._addBodyHandler).off("removeBody", this._removeBodyHandler), t.on("addBody", this._addBodyHandler).on("removeBody", this._removeBodyHandler), this.world = t
            }, i.sortAxisList = function(t, e) {
                e = 0 | e;
                for (var o = 1, i = t.length; i > o; o++) {
                    for (var n = t[o], r = o - 1; r >= 0 && !(t[r].aabb.lowerBound[e] <= n.aabb.lowerBound[e]); r--) t[r + 1] = t[r];
                    t[r + 1] = n
                }
                return t
            }, i.prototype.sortList = function() {
                var t = this.axisList,
                    e = this.axisIndex;
                i.sortAxisList(t, e)
            }, i.prototype.getCollisionPairs = function(t) {
                var e = this.axisList,
                    o = this.result,
                    i = this.axisIndex;
                o.length = 0;
                for (var n = e.length; n--;) {
                    var a = e[n];
                    a.aabbNeedsUpdate && a.updateAABB()
                }
                this.sortList();
                for (var s = 0, c = 0 | e.length; s !== c; s++)
                    for (var h = e[s], l = s + 1; c > l; l++) {
                        var p = e[l],
                            u = p.aabb.lowerBound[i] <= h.aabb.upperBound[i];
                        if (!u) break;
                        r.canCollide(h, p) && this.boundingVolumeCheck(h, p) && o.push(h, p)
                    }
                return o
            }, i.prototype.aabbQuery = function(t, e, o) {
                o = o || [], this.sortList();
                var i = this.axisIndex,
                    n = "x";
                1 === i && (n = "y"), 2 === i && (n = "z");
                for (var r = this.axisList, a = (e.lowerBound[n], e.upperBound[n], 0); a < r.length; a++) {
                    var s = r[a];
                    s.aabbNeedsUpdate && s.updateAABB(), s.aabb.overlaps(e) && o.push(s)
                }
                return o
            }
        }, {
            "../collision/Broadphase": 8,
            "../utils/Utils": 57
        }],
        14: [function(t, e, o) {
            function i(t, e, o, i) {
                this.type = o, i = n.defaults(i, {
                    collideConnected: !0,
                    wakeUpBodies: !0
                }), this.equations = [], this.bodyA = t, this.bodyB = e, this.collideConnected = i.collideConnected, i.wakeUpBodies && (t && t.wakeUp(), e && e.wakeUp())
            }
            e.exports = i;
            var n = t("../utils/Utils");
            i.prototype.update = function() {
                throw new Error("method update() not implmemented in this Constraint subclass!")
            }, i.DISTANCE = 1, i.GEAR = 2, i.LOCK = 3, i.PRISMATIC = 4, i.REVOLUTE = 5, i.prototype.setStiffness = function(t) {
                for (var e = this.equations, o = 0; o !== e.length; o++) {
                    var i = e[o];
                    i.stiffness = t, i.needsUpdate = !0
                }
            }, i.prototype.setRelaxation = function(t) {
                for (var e = this.equations, o = 0; o !== e.length; o++) {
                    var i = e[o];
                    i.relaxation = t, i.needsUpdate = !0
                }
            }
        }, {
            "../utils/Utils": 57
        }],
        15: [function(t, e, o) {
            function i(t, e, o) {
                o = s.defaults(o, {
                    localAnchorA: [0, 0],
                    localAnchorB: [0, 0]
                }), n.call(this, t, e, n.DISTANCE, o), this.localAnchorA = a.fromValues(o.localAnchorA[0], o.localAnchorA[1]), this.localAnchorB = a.fromValues(o.localAnchorB[0], o.localAnchorB[1]);
                var i = this.localAnchorA,
                    c = this.localAnchorB;
                if (this.distance = 0, "number" == typeof o.distance) this.distance = o.distance;
                else {
                    var h = a.create(),
                        l = a.create(),
                        p = a.create();
                    a.rotate(h, i, t.angle), a.rotate(l, c, e.angle), a.add(p, e.position, l), a.sub(p, p, h), a.sub(p, p, t.position), this.distance = a.length(p)
                }
                var u;
                u = "undefined" == typeof o.maxForce ? Number.MAX_VALUE : o.maxForce;
                var d = new r(t, e, -u, u);
                this.equations = [d], this.maxForce = u;
                var p = a.create(),
                    f = a.create(),
                    v = a.create(),
                    y = this;
                d.computeGq = function() {
                    var t = this.bodyA,
                        e = this.bodyB,
                        o = t.position,
                        n = e.position;
                    return a.rotate(f, i, t.angle), a.rotate(v, c, e.angle), a.add(p, n, v), a.sub(p, p, f), a.sub(p, p, o), a.length(p) - y.distance
                }, this.setMaxForce(u), this.upperLimitEnabled = !1, this.upperLimit = 1, this.lowerLimitEnabled = !1, this.lowerLimit = 0, this.position = 0
            }
            var n = t("./Constraint"),
                r = t("../equations/Equation"),
                a = t("../math/vec2"),
                s = t("../utils/Utils");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i;
            var c = a.create(),
                h = a.create(),
                l = a.create();
            i.prototype.update = function() {
                var t = this.equations[0],
                    e = this.bodyA,
                    o = this.bodyB,
                    i = (this.distance, e.position),
                    n = o.position,
                    r = this.equations[0],
                    s = t.G;
                a.rotate(h, this.localAnchorA, e.angle), a.rotate(l, this.localAnchorB, o.angle), a.add(c, n, l), a.sub(c, c, h), a.sub(c, c, i), this.position = a.length(c);
                var p = !1;
                if (this.upperLimitEnabled && this.position > this.upperLimit && (r.maxForce = 0, r.minForce = -this.maxForce, this.distance = this.upperLimit, p = !0), this.lowerLimitEnabled && this.position < this.lowerLimit && (r.maxForce = this.maxForce, r.minForce = 0, this.distance = this.lowerLimit, p = !0), (this.lowerLimitEnabled || this.upperLimitEnabled) && !p) return void(r.enabled = !1);
                r.enabled = !0, a.normalize(c, c);
                var u = a.crossLength(h, c),
                    d = a.crossLength(l, c);
                s[0] = -c[0], s[1] = -c[1], s[2] = -u, s[3] = c[0], s[4] = c[1], s[5] = d
            }, i.prototype.setMaxForce = function(t) {
                var e = this.equations[0];
                e.minForce = -t, e.maxForce = t
            }, i.prototype.getMaxForce = function() {
                var t = this.equations[0];
                return t.maxForce
            }
        }, {
            "../equations/Equation": 22,
            "../math/vec2": 30,
            "../utils/Utils": 57,
            "./Constraint": 14
        }],
        16: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, n.GEAR, o), this.ratio = void 0 !== o.ratio ? o.ratio : 1, this.angle = void 0 !== o.angle ? o.angle : e.angle - this.ratio * t.angle, o.angle = this.angle, o.ratio = this.ratio, this.equations = [new r(t, e, o)], void 0 !== o.maxTorque && this.setMaxTorque(o.maxTorque)
            }
            var n = t("./Constraint"),
                r = (t("../equations/Equation"), t("../equations/AngleLockEquation"));
            t("../math/vec2"), e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.update = function() {
                var t = this.equations[0];
                t.ratio !== this.ratio && t.setRatio(this.ratio), t.angle = this.angle
            }, i.prototype.setMaxTorque = function(t) {
                this.equations[0].setMaxTorque(t)
            }, i.prototype.getMaxTorque = function(t) {
                return this.equations[0].maxForce
            }
        }, {
            "../equations/AngleLockEquation": 20,
            "../equations/Equation": 22,
            "../math/vec2": 30,
            "./Constraint": 14
        }],
        17: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, n.LOCK, o);
                var i = "undefined" == typeof o.maxForce ? Number.MAX_VALUE : o.maxForce,
                    s = (o.localAngleB || 0, new a(t, e, -i, i)),
                    c = new a(t, e, -i, i),
                    h = new a(t, e, -i, i),
                    l = r.create(),
                    p = r.create(),
                    u = this;
                s.computeGq = function() {
                    return r.rotate(l, u.localOffsetB, t.angle), r.sub(p, e.position, t.position), r.sub(p, p, l), p[0]
                }, c.computeGq = function() {
                    return r.rotate(l, u.localOffsetB, t.angle), r.sub(p, e.position, t.position), r.sub(p, p, l), p[1]
                };
                var d = r.create(),
                    f = r.create();
                h.computeGq = function() {
                    return r.rotate(d, u.localOffsetB, e.angle - u.localAngleB), r.scale(d, d, -1), r.sub(p, t.position, e.position), r.add(p, p, d), r.rotate(f, d, -Math.PI / 2), r.normalize(f, f), r.dot(p, f)
                }, this.localOffsetB = r.create(), o.localOffsetB ? r.copy(this.localOffsetB, o.localOffsetB) : (r.sub(this.localOffsetB, e.position, t.position), r.rotate(this.localOffsetB, this.localOffsetB, -t.angle)), this.localAngleB = 0, "number" == typeof o.localAngleB ? this.localAngleB = o.localAngleB : this.localAngleB = e.angle - t.angle, this.equations.push(s, c, h), this.setMaxForce(i)
            }
            var n = t("./Constraint"),
                r = t("../math/vec2"),
                a = t("../equations/Equation");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.setMaxForce = function(t) {
                for (var e = this.equations, o = 0; o < this.equations.length; o++) e[o].maxForce = t, e[o].minForce = -t
            }, i.prototype.getMaxForce = function() {
                return this.equations[0].maxForce
            };
            var s = r.create(),
                c = r.create(),
                h = r.create(),
                l = r.fromValues(1, 0),
                p = r.fromValues(0, 1);
            i.prototype.update = function() {
                var t = this.equations[0],
                    e = this.equations[1],
                    o = this.equations[2],
                    i = this.bodyA,
                    n = this.bodyB;
                r.rotate(s, this.localOffsetB, i.angle), r.rotate(c, this.localOffsetB, n.angle - this.localAngleB), r.scale(c, c, -1), r.rotate(h, c, Math.PI / 2), r.normalize(h, h), t.G[0] = -1, t.G[1] = 0, t.G[2] = -r.crossLength(s, l), t.G[3] = 1, e.G[0] = 0, e.G[1] = -1, e.G[2] = -r.crossLength(s, p), e.G[4] = 1, o.G[0] = -h[0], o.G[1] = -h[1], o.G[3] = h[0], o.G[4] = h[1], o.G[5] = r.crossLength(c, h)
            }
        }, {
            "../equations/Equation": 22,
            "../math/vec2": 30,
            "./Constraint": 14
        }],
        18: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, n.PRISMATIC, o);
                var i = s.fromValues(0, 0),
                    h = s.fromValues(1, 0),
                    l = s.fromValues(0, 0);
                o.localAnchorA && s.copy(i, o.localAnchorA), o.localAxisA && s.copy(h, o.localAxisA), o.localAnchorB && s.copy(l, o.localAnchorB), this.localAnchorA = i, this.localAnchorB = l, this.localAxisA = h;
                var p = this.maxForce = "undefined" != typeof o.maxForce ? o.maxForce : Number.MAX_VALUE,
                    u = new a(t, e, -p, p),
                    d = new s.create,
                    f = new s.create,
                    v = new s.create,
                    y = new s.create;
                if (u.computeGq = function() {
                        return s.dot(v, y)
                    }, u.updateJacobian = function() {
                        var o = this.G,
                            n = t.position,
                            r = e.position;
                        s.rotate(d, i, t.angle), s.rotate(f, l, e.angle), s.add(v, r, f), s.sub(v, v, n), s.sub(v, v, d), s.rotate(y, h, t.angle + Math.PI / 2), o[0] = -y[0], o[1] = -y[1], o[2] = -s.crossLength(d, y) + s.crossLength(y, v), o[3] = y[0], o[4] = y[1], o[5] = s.crossLength(f, y)
                    }, this.equations.push(u), !o.disableRotationalLock) {
                    var m = new c(t, e, -p, p);
                    this.equations.push(m)
                }
                this.position = 0, this.velocity = 0, this.lowerLimitEnabled = "undefined" != typeof o.lowerLimit ? !0 : !1, this.upperLimitEnabled = "undefined" != typeof o.upperLimit ? !0 : !1, this.lowerLimit = "undefined" != typeof o.lowerLimit ? o.lowerLimit : 0, this.upperLimit = "undefined" != typeof o.upperLimit ? o.upperLimit : 1, this.upperLimitEquation = new r(t, e), this.lowerLimitEquation = new r(t, e), this.upperLimitEquation.minForce = this.lowerLimitEquation.minForce = 0, this.upperLimitEquation.maxForce = this.lowerLimitEquation.maxForce = p, this.motorEquation = new a(t, e), this.motorEnabled = !1, this.motorSpeed = 0;
                var g = this,
                    A = this.motorEquation;
                A.computeGW, A.computeGq = function() {
                    return 0
                }, A.computeGW = function() {
                    var t = this.G,
                        e = this.bodyA,
                        o = this.bodyB,
                        i = e.velocity,
                        n = o.velocity,
                        r = e.angularVelocity,
                        a = o.angularVelocity;
                    return this.gmult(t, i, r, n, a) + g.motorSpeed
                }
            }
            var n = t("./Constraint"),
                r = t("../equations/ContactEquation"),
                a = t("../equations/Equation"),
                s = t("../math/vec2"),
                c = t("../equations/RotationalLockEquation");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i;
            var h = s.create(),
                l = s.create(),
                p = s.create(),
                u = s.create(),
                d = s.create(),
                f = s.create();
            i.prototype.update = function() {
                var t = this.equations,
                    e = t[0],
                    o = this.upperLimit,
                    i = this.lowerLimit,
                    n = this.upperLimitEquation,
                    r = this.lowerLimitEquation,
                    a = this.bodyA,
                    c = this.bodyB,
                    v = this.localAxisA,
                    y = this.localAnchorA,
                    m = this.localAnchorB;
                e.updateJacobian(), s.rotate(h, v, a.angle), s.rotate(u, y, a.angle), s.add(l, u, a.position), s.rotate(d, m, c.angle), s.add(p, d, c.position);
                var g = this.position = s.dot(p, h) - s.dot(l, h);
                if (this.motorEnabled) {
                    var A = this.motorEquation.G;
                    A[0] = h[0], A[1] = h[1], A[2] = s.crossLength(h, d), A[3] = -h[0], A[4] = -h[1], A[5] = -s.crossLength(h, u)
                }
                if (this.upperLimitEnabled && g > o) s.scale(n.normalA, h, -1), s.sub(n.contactPointA, l, a.position), s.sub(n.contactPointB, p, c.position), s.scale(f, h, o), s.add(n.contactPointA, n.contactPointA, f), -1 === t.indexOf(n) && t.push(n);
                else {
                    var b = t.indexOf(n); - 1 !== b && t.splice(b, 1)
                }
                if (this.lowerLimitEnabled && i > g) s.scale(r.normalA, h, 1), s.sub(r.contactPointA, l, a.position), s.sub(r.contactPointB, p, c.position), s.scale(f, h, i), s.sub(r.contactPointB, r.contactPointB, f), -1 === t.indexOf(r) && t.push(r);
                else {
                    var b = t.indexOf(r); - 1 !== b && t.splice(b, 1)
                }
            }, i.prototype.enableMotor = function() {
                this.motorEnabled || (this.equations.push(this.motorEquation), this.motorEnabled = !0)
            }, i.prototype.disableMotor = function() {
                if (this.motorEnabled) {
                    var t = this.equations.indexOf(this.motorEquation);
                    this.equations.splice(t, 1), this.motorEnabled = !1
                }
            }, i.prototype.setLimits = function(t, e) {
                "number" == typeof t ? (this.lowerLimit = t, this.lowerLimitEnabled = !0) : (this.lowerLimit = t, this.lowerLimitEnabled = !1), "number" == typeof e ? (this.upperLimit = e, this.upperLimitEnabled = !0) : (this.upperLimit = e, this.upperLimitEnabled = !1)
            }
        }, {
            "../equations/ContactEquation": 21,
            "../equations/Equation": 22,
            "../equations/RotationalLockEquation": 24,
            "../math/vec2": 30,
            "./Constraint": 14
        }],
        19: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, n.REVOLUTE, o);
                var i = this.maxForce = "undefined" != typeof o.maxForce ? o.maxForce : Number.MAX_VALUE;
                this.pivotA = c.create(), this.pivotB = c.create(), o.worldPivot ? (c.sub(this.pivotA, o.worldPivot, t.position), c.sub(this.pivotB, o.worldPivot, e.position), c.rotate(this.pivotA, this.pivotA, -t.angle), c.rotate(this.pivotB, this.pivotB, -e.angle)) : (c.copy(this.pivotA, o.localPivotA), c.copy(this.pivotB, o.localPivotB));
                var f = this.equations = [new r(t, e, -i, i), new r(t, e, -i, i)],
                    v = f[0],
                    y = f[1],
                    m = this;
                v.computeGq = function() {
                    return c.rotate(h, m.pivotA, t.angle), c.rotate(l, m.pivotB, e.angle), c.add(d, e.position, l), c.sub(d, d, t.position), c.sub(d, d, h), c.dot(d, p)
                }, y.computeGq = function() {
                    return c.rotate(h, m.pivotA, t.angle), c.rotate(l, m.pivotB, e.angle), c.add(d, e.position, l), c.sub(d, d, t.position), c.sub(d, d, h), c.dot(d, u)
                }, y.minForce = v.minForce = -i, y.maxForce = v.maxForce = i, this.motorEquation = new a(t, e), this.motorEnabled = !1, this.angle = 0, this.lowerLimitEnabled = !1, this.upperLimitEnabled = !1, this.lowerLimit = 0, this.upperLimit = 0, this.upperLimitEquation = new s(t, e), this.lowerLimitEquation = new s(t, e), this.upperLimitEquation.minForce = 0, this.lowerLimitEquation.maxForce = 0
            }
            var n = t("./Constraint"),
                r = t("../equations/Equation"),
                a = t("../equations/RotationalVelocityEquation"),
                s = t("../equations/RotationalLockEquation"),
                c = t("../math/vec2");
            e.exports = i;
            var h = c.create(),
                l = c.create(),
                p = c.fromValues(1, 0),
                u = c.fromValues(0, 1),
                d = c.create();
            i.prototype = new n, i.prototype.constructor = i, i.prototype.setLimits = function(t, e) {
                "number" == typeof t ? (this.lowerLimit = t, this.lowerLimitEnabled = !0) : (this.lowerLimit = t, this.lowerLimitEnabled = !1), "number" == typeof e ? (this.upperLimit = e, this.upperLimitEnabled = !0) : (this.upperLimit = e, this.upperLimitEnabled = !1)
            }, i.prototype.update = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    o = this.pivotA,
                    i = this.pivotB,
                    n = this.equations,
                    r = (n[0], n[1], n[0]),
                    a = n[1],
                    s = this.upperLimit,
                    d = this.lowerLimit,
                    f = this.upperLimitEquation,
                    v = this.lowerLimitEquation,
                    y = this.angle = e.angle - t.angle;
                if (this.upperLimitEnabled && y > s) f.angle = s, -1 === n.indexOf(f) && n.push(f);
                else {
                    var m = n.indexOf(f); - 1 !== m && n.splice(m, 1)
                }
                if (this.lowerLimitEnabled && d > y) v.angle = d, -1 === n.indexOf(v) && n.push(v);
                else {
                    var m = n.indexOf(v); - 1 !== m && n.splice(m, 1)
                }
                c.rotate(h, o, t.angle), c.rotate(l, i, e.angle), r.G[0] = -1, r.G[1] = 0, r.G[2] = -c.crossLength(h, p), r.G[3] = 1, r.G[4] = 0, r.G[5] = c.crossLength(l, p), a.G[0] = 0, a.G[1] = -1, a.G[2] = -c.crossLength(h, u), a.G[3] = 0, a.G[4] = 1, a.G[5] = c.crossLength(l, u)
            }, i.prototype.enableMotor = function() {
                this.motorEnabled || (this.equations.push(this.motorEquation), this.motorEnabled = !0)
            }, i.prototype.disableMotor = function() {
                if (this.motorEnabled) {
                    var t = this.equations.indexOf(this.motorEquation);
                    this.equations.splice(t, 1), this.motorEnabled = !1
                }
            }, i.prototype.motorIsEnabled = function() {
                return !!this.motorEnabled
            }, i.prototype.setMotorSpeed = function(t) {
                if (this.motorEnabled) {
                    var e = this.equations.indexOf(this.motorEquation);
                    this.equations[e].relativeVelocity = t
                }
            }, i.prototype.getMotorSpeed = function() {
                return this.motorEnabled ? this.motorEquation.relativeVelocity : !1
            }
        }, {
            "../equations/Equation": 22,
            "../equations/RotationalLockEquation": 24,
            "../equations/RotationalVelocityEquation": 25,
            "../math/vec2": 30,
            "./Constraint": 14
        }],
        20: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, -Number.MAX_VALUE, Number.MAX_VALUE), this.angle = o.angle || 0, this.ratio = "number" == typeof o.ratio ? o.ratio : 1, this.setRatio(this.ratio)
            }
            var n = t("./Equation");
            t("../math/vec2"), e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeGq = function() {
                return this.ratio * this.bodyA.angle - this.bodyB.angle + this.angle
            }, i.prototype.setRatio = function(t) {
                var e = this.G;
                e[2] = t, e[5] = -1, this.ratio = t
            }, i.prototype.setMaxTorque = function(t) {
                this.maxForce = t, this.minForce = -t
            }
        }, {
            "../math/vec2": 30,
            "./Equation": 22
        }],
        21: [function(t, e, o) {
            function i(t, e) {
                n.call(this, t, e, 0, Number.MAX_VALUE), this.contactPointA = r.create(), this.penetrationVec = r.create(), this.contactPointB = r.create(), this.normalA = r.create(), this.restitution = 0, this.firstImpact = !1, this.shapeA = null, this.shapeB = null
            }
            var n = t("./Equation"),
                r = t("../math/vec2");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeB = function(t, e, o) {
                var i = this.bodyA,
                    n = this.bodyB,
                    a = this.contactPointA,
                    s = this.contactPointB,
                    c = i.position,
                    h = n.position,
                    l = this.penetrationVec,
                    p = this.normalA,
                    u = this.G,
                    d = r.crossLength(a, p),
                    f = r.crossLength(s, p);
                u[0] = -p[0], u[1] = -p[1], u[2] = -d, u[3] = p[0], u[4] = p[1], u[5] = f, r.add(l, h, s), r.sub(l, l, c), r.sub(l, l, a);
                var v, y;
                this.firstImpact && 0 !== this.restitution ? (y = 0, v = 1 / e * (1 + this.restitution) * this.computeGW()) : (y = r.dot(p, l) + this.offset, v = this.computeGW());
                var m = this.computeGiMf(),
                    g = -y * t - v * e - o * m;
                return g
            }
        }, {
            "../math/vec2": 30,
            "./Equation": 22
        }],
        22: [function(t, e, o) {
            function i(t, e, o, n) {
                this.minForce = "undefined" == typeof o ? -Number.MAX_VALUE : o, this.maxForce = "undefined" == typeof n ? Number.MAX_VALUE : n, this.bodyA = t, this.bodyB = e, this.stiffness = i.DEFAULT_STIFFNESS, this.relaxation = i.DEFAULT_RELAXATION, this.G = new r.ARRAY_TYPE(6);
                for (var a = 0; 6 > a; a++) this.G[a] = 0;
                this.offset = 0, this.a = 0, this.b = 0, this.epsilon = 0, this.timeStep = 1 / 60, this.needsUpdate = !0, this.multiplier = 0, this.relativeVelocity = 0, this.enabled = !0
            }
            e.exports = i;
            var n = t("../math/vec2"),
                r = t("../utils/Utils");
            t("../objects/Body"), i.prototype.constructor = i, i.DEFAULT_STIFFNESS = 1e6, i.DEFAULT_RELAXATION = 4, i.prototype.update = function() {
                var t = this.stiffness,
                    e = this.relaxation,
                    o = this.timeStep;
                this.a = 4 / (o * (1 + 4 * e)), this.b = 4 * e / (1 + 4 * e), this.epsilon = 4 / (o * o * t * (1 + 4 * e)), this.needsUpdate = !1
            }, i.prototype.gmult = function(t, e, o, i, n) {
                return t[0] * e[0] + t[1] * e[1] + t[2] * o + t[3] * i[0] + t[4] * i[1] + t[5] * n
            }, i.prototype.computeB = function(t, e, o) {
                var i = this.computeGW(),
                    n = this.computeGq(),
                    r = this.computeGiMf();
                return -n * t - i * e - r * o
            };
            var a = n.create(),
                s = n.create();
            i.prototype.computeGq = function() {
                var t = this.G,
                    e = this.bodyA,
                    o = this.bodyB,
                    i = (e.position, o.position, e.angle),
                    n = o.angle;
                return this.gmult(t, a, i, s, n) + this.offset
            }, i.prototype.computeGW = function() {
                var t = this.G,
                    e = this.bodyA,
                    o = this.bodyB,
                    i = e.velocity,
                    n = o.velocity,
                    r = e.angularVelocity,
                    a = o.angularVelocity;
                return this.gmult(t, i, r, n, a) + this.relativeVelocity
            }, i.prototype.computeGWlambda = function() {
                var t = this.G,
                    e = this.bodyA,
                    o = this.bodyB,
                    i = e.vlambda,
                    n = o.vlambda,
                    r = e.wlambda,
                    a = o.wlambda;
                return this.gmult(t, i, r, n, a)
            };
            var c = n.create(),
                h = n.create();
            i.prototype.computeGiMf = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    o = t.force,
                    i = t.angularForce,
                    r = e.force,
                    a = e.angularForce,
                    s = t.invMassSolve,
                    l = e.invMassSolve,
                    p = t.invInertiaSolve,
                    u = e.invInertiaSolve,
                    d = this.G;
                return n.scale(c, o, s), n.multiply(c, t.massMultiplier, c), n.scale(h, r, l), n.multiply(h, e.massMultiplier, h), this.gmult(d, c, i * p, h, a * u)
            }, i.prototype.computeGiMGt = function() {
                var t = this.bodyA,
                    e = this.bodyB,
                    o = t.invMassSolve,
                    i = e.invMassSolve,
                    n = t.invInertiaSolve,
                    r = e.invInertiaSolve,
                    a = this.G;
                return a[0] * a[0] * o * t.massMultiplier[0] + a[1] * a[1] * o * t.massMultiplier[1] + a[2] * a[2] * n + a[3] * a[3] * i * e.massMultiplier[0] + a[4] * a[4] * i * e.massMultiplier[1] + a[5] * a[5] * r
            };
            var l = n.create(),
                p = n.create(),
                u = n.create();
            n.create(), n.create(), n.create(), i.prototype.addToWlambda = function(t) {
                var e = this.bodyA,
                    o = this.bodyB,
                    i = l,
                    r = p,
                    a = u,
                    s = e.invMassSolve,
                    c = o.invMassSolve,
                    h = e.invInertiaSolve,
                    d = o.invInertiaSolve,
                    f = this.G;
                r[0] = f[0], r[1] = f[1], a[0] = f[3], a[1] = f[4], n.scale(i, r, s * t), n.multiply(i, i, e.massMultiplier), n.add(e.vlambda, e.vlambda, i), e.wlambda += h * f[2] * t, n.scale(i, a, c * t), n.multiply(i, i, o.massMultiplier), n.add(o.vlambda, o.vlambda, i), o.wlambda += d * f[5] * t
            }, i.prototype.computeInvC = function(t) {
                return 1 / (this.computeGiMGt() + t)
            }
        }, {
            "../math/vec2": 30,
            "../objects/Body": 31,
            "../utils/Utils": 57
        }],
        23: [function(t, e, o) {
            function i(t, e, o) {
                r.call(this, t, e, -o, o), this.contactPointA = n.create(), this.contactPointB = n.create(), this.t = n.create(), this.contactEquations = [], this.shapeA = null, this.shapeB = null, this.frictionCoefficient = .3
            }
            var n = t("../math/vec2"),
                r = t("./Equation");
            t("../utils/Utils"), e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.setSlipForce = function(t) {
                this.maxForce = t, this.minForce = -t
            }, i.prototype.getSlipForce = function() {
                return this.maxForce
            }, i.prototype.computeB = function(t, e, o) {
                var i = (this.bodyA, this.bodyB, this.contactPointA),
                    r = this.contactPointB,
                    a = this.t,
                    s = this.G;
                s[0] = -a[0], s[1] = -a[1], s[2] = -n.crossLength(i, a), s[3] = a[0], s[4] = a[1], s[5] = n.crossLength(r, a);
                var c = this.computeGW(),
                    h = this.computeGiMf(),
                    l = -c * e - o * h;
                return l
            }
        }, {
            "../math/vec2": 30,
            "../utils/Utils": 57,
            "./Equation": 22
        }],
        24: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, -Number.MAX_VALUE, Number.MAX_VALUE), this.angle = o.angle || 0;
                var i = this.G;
                i[2] = 1, i[5] = -1
            }
            var n = t("./Equation"),
                r = t("../math/vec2");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i;
            var a = r.create(),
                s = r.create(),
                c = r.fromValues(1, 0),
                h = r.fromValues(0, 1);
            i.prototype.computeGq = function() {
                return r.rotate(a, c, this.bodyA.angle + this.angle), r.rotate(s, h, this.bodyB.angle), r.dot(a, s)
            }
        }, {
            "../math/vec2": 30,
            "./Equation": 22
        }],
        25: [function(t, e, o) {
            function i(t, e) {
                n.call(this, t, e, -Number.MAX_VALUE, Number.MAX_VALUE), this.relativeVelocity = 1, this.ratio = 1
            }
            var n = t("./Equation");
            t("../math/vec2"), e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeB = function(t, e, o) {
                var i = this.G;
                i[2] = -1, i[5] = this.ratio;
                var n = this.computeGiMf(),
                    r = this.computeGW(),
                    a = -r * e - o * n;
                return a
            }
        }, {
            "../math/vec2": 30,
            "./Equation": 22
        }],
        26: [function(t, e, o) {
            var i = function() {};
            e.exports = i, i.prototype = {
                constructor: i,
                on: function(t, e, o) {
                    e.context = o || this, void 0 === this._listeners && (this._listeners = {});
                    var i = this._listeners;
                    return void 0 === i[t] && (i[t] = []), -1 === i[t].indexOf(e) && i[t].push(e), this
                },
                has: function(t, e) {
                    if (void 0 === this._listeners) return !1;
                    var o = this._listeners;
                    if (e) {
                        if (void 0 !== o[t] && -1 !== o[t].indexOf(e)) return !0
                    } else if (void 0 !== o[t]) return !0;
                    return !1
                },
                off: function(t, e) {
                    if (void 0 === this._listeners) return this;
                    var o = this._listeners,
                        i = o[t].indexOf(e);
                    return -1 !== i && o[t].splice(i, 1), this
                },
                emit: function(t) {
                    if (void 0 === this._listeners) return this;
                    var e = this._listeners,
                        o = e[t.type];
                    if (void 0 !== o) {
                        t.target = this;
                        for (var i = 0, n = o.length; n > i; i++) {
                            var r = o[i];
                            r.call(r.context, t)
                        }
                    }
                    return this
                }
            }
        }, {}],
        27: [function(t, e, o) {
            function i(t, e, o) {
                if (o = o || {}, !(t instanceof n && e instanceof n)) throw new Error("First two arguments must be Material instances.");
                this.id = i.idCounter++, this.materialA = t, this.materialB = e, this.friction = "undefined" != typeof o.friction ? Number(o.friction) : .3, this.restitution = "undefined" != typeof o.restitution ? Number(o.restitution) : 0, this.stiffness = "undefined" != typeof o.stiffness ? Number(o.stiffness) : r.DEFAULT_STIFFNESS, this.relaxation = "undefined" != typeof o.relaxation ? Number(o.relaxation) : r.DEFAULT_RELAXATION, this.frictionStiffness = "undefined" != typeof o.frictionStiffness ? Number(o.frictionStiffness) : r.DEFAULT_STIFFNESS, this.frictionRelaxation = "undefined" != typeof o.frictionRelaxation ? Number(o.frictionRelaxation) : r.DEFAULT_RELAXATION, this.surfaceVelocity = "undefined" != typeof o.surfaceVelocity ? Number(o.surfaceVelocity) : 0, this.contactSkinSize = .005
            }
            var n = t("./Material"),
                r = t("../equations/Equation");
            e.exports = i, i.idCounter = 0
        }, {
            "../equations/Equation": 22,
            "./Material": 28
        }],
        28: [function(t, e, o) {
            function i(t) {
                this.id = t || i.idCounter++
            }
            e.exports = i, i.idCounter = 0
        }, {}],
        29: [function(t, e, o) {
            var i = {};
            i.GetArea = function(t) {
                if (t.length < 6) return 0;
                for (var e = t.length - 2, o = 0, i = 0; e > i; i += 2) o += (t[i + 2] - t[i]) * (t[i + 1] + t[i + 3]);
                return o += (t[0] - t[e]) * (t[e + 1] + t[1]), .5 * -o
            }, i.Triangulate = function(t) {
                var e = t.length >> 1;
                if (3 > e) return [];
                for (var o = [], n = [], r = 0; e > r; r++) n.push(r);
                for (var r = 0, a = e; a > 3;) {
                    var s = n[(r + 0) % a],
                        c = n[(r + 1) % a],
                        h = n[(r + 2) % a],
                        l = t[2 * s],
                        p = t[2 * s + 1],
                        u = t[2 * c],
                        d = t[2 * c + 1],
                        f = t[2 * h],
                        v = t[2 * h + 1],
                        y = !1;
                    if (i._convex(l, p, u, d, f, v)) {
                        y = !0;
                        for (var m = 0; a > m; m++) {
                            var g = n[m];
                            if (g != s && g != c && g != h && i._PointInTriangle(t[2 * g], t[2 * g + 1], l, p, u, d, f, v)) {
                                y = !1;
                                break
                            }
                        }
                    }
                    if (y) o.push(s, c, h), n.splice((r + 1) % a, 1), a--, r = 0;
                    else if (r++ > 3 * a) break
                }
                return o.push(n[0], n[1], n[2]), o
            }, i._PointInTriangle = function(t, e, o, i, n, r, a, s) {
                var c = a - o,
                    h = s - i,
                    l = n - o,
                    p = r - i,
                    u = t - o,
                    d = e - i,
                    f = c * c + h * h,
                    v = c * l + h * p,
                    y = c * u + h * d,
                    m = l * l + p * p,
                    g = l * u + p * d,
                    A = 1 / (f * m - v * v),
                    b = (m * y - v * g) * A,
                    E = (f * g - v * y) * A;
                return b >= 0 && E >= 0 && 1 > b + E
            }, i._convex = function(t, e, o, i, n, r) {
                return (e - i) * (n - o) + (o - t) * (r - i) >= 0
            }, e.exports = i
        }, {}],
        30: [function(t, e, o) {
            var i = e.exports = {},
                n = t("../utils/Utils");
            i.crossLength = function(t, e) {
                return t[0] * e[1] - t[1] * e[0]
            }, i.crossVZ = function(t, e, o) {
                return i.rotate(t, e, -Math.PI / 2), i.scale(t, t, o), t
            }, i.crossZV = function(t, e, o) {
                return i.rotate(t, o, Math.PI / 2), i.scale(t, t, e), t
            }, i.rotate = function(t, e, o) {
                if (0 !== o) {
                    var i = Math.cos(o),
                        n = Math.sin(o),
                        r = e[0],
                        a = e[1];
                    t[0] = i * r - n * a, t[1] = n * r + i * a
                } else t[0] = e[0], t[1] = e[1]
            }, i.rotate90cw = function(t, e) {
                var o = e[0],
                    i = e[1];
                t[0] = i, t[1] = -o
            }, i.toLocalFrame = function(t, e, o, n) {
                i.copy(t, e), i.sub(t, t, o), i.rotate(t, t, -n)
            }, i.toGlobalFrame = function(t, e, o, n) {
                i.copy(t, e), i.rotate(t, t, n), i.add(t, t, o)
            }, i.vectorToLocalFrame = function(t, e, o) {
                i.rotate(t, e, -o)
            }, i.vectorToGlobalFrame = function(t, e, o) {
                i.rotate(t, e, o)
            }, i.centroid = function(t, e, o, n) {
                return i.add(t, e, o), i.add(t, t, n), i.scale(t, t, 1 / 3), t
            }, i.create = function() {
                var t = new n.ARRAY_TYPE(2);
                return t[0] = 0, t[1] = 0, t
            }, i.clone = function(t) {
                var e = new n.ARRAY_TYPE(2);
                return e[0] = t[0], e[1] = t[1], e
            }, i.fromValues = function(t, e) {
                var o = new n.ARRAY_TYPE(2);
                return o[0] = t, o[1] = e, o
            }, i.copy = function(t, e) {
                return t[0] = e[0], t[1] = e[1], t
            }, i.set = function(t, e, o) {
                return t[0] = e, t[1] = o, t
            }, i.add = function(t, e, o) {
                return t[0] = e[0] + o[0], t[1] = e[1] + o[1], t
            }, i.subtract = function(t, e, o) {
                return t[0] = e[0] - o[0], t[1] = e[1] - o[1], t
            }, i.sub = i.subtract, i.multiply = function(t, e, o) {
                return t[0] = e[0] * o[0], t[1] = e[1] * o[1], t
            }, i.mul = i.multiply, i.divide = function(t, e, o) {
                return t[0] = e[0] / o[0], t[1] = e[1] / o[1], t
            }, i.div = i.divide, i.scale = function(t, e, o) {
                return t[0] = e[0] * o, t[1] = e[1] * o, t
            }, i.distance = function(t, e) {
                var o = e[0] - t[0],
                    i = e[1] - t[1];
                return Math.sqrt(o * o + i * i)
            }, i.dist = i.distance, i.squaredDistance = function(t, e) {
                var o = e[0] - t[0],
                    i = e[1] - t[1];
                return o * o + i * i
            }, i.sqrDist = i.squaredDistance, i.length = function(t) {
                var e = t[0],
                    o = t[1];
                return Math.sqrt(e * e + o * o)
            }, i.len = i.length, i.squaredLength = function(t) {
                var e = t[0],
                    o = t[1];
                return e * e + o * o
            }, i.sqrLen = i.squaredLength, i.negate = function(t, e) {
                return t[0] = -e[0], t[1] = -e[1], t
            }, i.normalize = function(t, e) {
                var o = e[0],
                    i = e[1],
                    n = o * o + i * i;
                return n > 0 && (n = 1 / Math.sqrt(n), t[0] = e[0] * n, t[1] = e[1] * n), t
            }, i.dot = function(t, e) {
                return t[0] * e[0] + t[1] * e[1]
            }, i.str = function(t) {
                return "vec2(" + t[0] + ", " + t[1] + ")"
            }, i.lerp = function(t, e, o, i) {
                var n = e[0],
                    r = e[1];
                return t[0] = n + i * (o[0] - n), t[1] = r + i * (o[1] - r), t
            }, i.reflect = function(t, e, o) {
                var i = e[0] * o[0] + e[1] * o[1];
                t[0] = e[0] - 2 * o[0] * i, t[1] = e[1] - 2 * o[1] * i
            }, i.getLineSegmentsIntersection = function(t, e, o, n, r) {
                var a = i.getLineSegmentsIntersectionFraction(e, o, n, r);
                return 0 > a ? !1 : (t[0] = e[0] + a * (o[0] - e[0]), t[1] = e[1] + a * (o[1] - e[1]), !0)
            }, i.getLineSegmentsIntersectionFraction = function(t, e, o, i) {
                var n, r, a = e[0] - t[0],
                    s = e[1] - t[1],
                    c = i[0] - o[0],
                    h = i[1] - o[1];
                return n = (-s * (t[0] - o[0]) + a * (t[1] - o[1])) / (-c * s + a * h), r = (c * (t[1] - o[1]) - h * (t[0] - o[0])) / (-c * s + a * h), n >= 0 && 1 >= n && r >= 0 && 1 >= r ? r : -1
            }
        }, {
            "../utils/Utils": 57
        }],
        31: [function(t, e, o) {
            function i(t) {
                t = t || {}, l.call(this), this.id = t.id || ++i._idCounter, this.world = null, this.shapes = [], this.mass = t.mass || 0, this.invMass = 0, this.inertia = 0, this.invInertia = 0, this.invMassSolve = 0, this.invInertiaSolve = 0, this.fixedRotation = !!t.fixedRotation, this.fixedX = !!t.fixedX, this.fixedY = !!t.fixedY, this.massMultiplier = n.create(), this.position = n.fromValues(0, 0), t.position && n.copy(this.position, t.position), this.interpolatedPosition = n.fromValues(0, 0), this.interpolatedAngle = 0, this.previousPosition = n.fromValues(0, 0), this.previousAngle = 0, this.velocity = n.fromValues(0, 0), t.velocity && n.copy(this.velocity, t.velocity), this.vlambda = n.fromValues(0, 0), this.wlambda = 0, this.angle = t.angle || 0, this.angularVelocity = t.angularVelocity || 0, this.force = n.create(), t.force && n.copy(this.force, t.force), this.angularForce = t.angularForce || 0, this.damping = "number" == typeof t.damping ? t.damping : .1, this.angularDamping = "number" == typeof t.angularDamping ? t.angularDamping : .1, this.type = i.STATIC, "undefined" != typeof t.type ? this.type = t.type : t.mass ? this.type = i.DYNAMIC : this.type = i.STATIC, this.boundingRadius = 0, this.aabb = new h, this.aabbNeedsUpdate = !0, this.allowSleep = void 0 !== t.allowSleep ? t.allowSleep : !0, this.wantsToSleep = !1, this.sleepState = i.AWAKE, this.sleepSpeedLimit = void 0 !== t.sleepSpeedLimit ? t.sleepSpeedLimit : .2, this.sleepTimeLimit = void 0 !== t.sleepTimeLimit ? t.sleepTimeLimit : 1, this.gravityScale = void 0 !== t.gravityScale ? t.gravityScale : 1, this.collisionResponse = void 0 !== t.collisionResponse ? t.collisionResponse : !0, this.idleTime = 0, this.timeLastSleepy = 0, this.ccdSpeedThreshold = void 0 !== t.ccdSpeedThreshold ? t.ccdSpeedThreshold : -1, this.ccdIterations = void 0 !== t.ccdIterations ? t.ccdIterations : 10, this.concavePath = null, this._wakeUpAfterNarrowphase = !1, this.updateMassProperties()
            }
            var n = t("../math/vec2"),
                r = t("poly-decomp"),
                a = t("../shapes/Convex"),
                s = t("../collision/RaycastResult"),
                c = t("../collision/Ray"),
                h = t("../collision/AABB"),
                l = t("../events/EventEmitter");
            e.exports = i, i.prototype = new l, i.prototype.constructor = i, i._idCounter = 0, i.prototype.updateSolveMassProperties = function() {
                this.sleepState === i.SLEEPING || this.type === i.KINEMATIC ? (this.invMassSolve = 0, this.invInertiaSolve = 0) : (this.invMassSolve = this.invMass, this.invInertiaSolve = this.invInertia)
            }, i.prototype.setDensity = function(t) {
                var e = this.getArea();
                this.mass = e * t, this.updateMassProperties()
            }, i.prototype.getArea = function() {
                for (var t = 0, e = 0; e < this.shapes.length; e++) t += this.shapes[e].area;
                return t
            }, i.prototype.getAABB = function() {
                return this.aabbNeedsUpdate && this.updateAABB(), this.aabb
            };
            var p = new h,
                u = n.create();
            i.prototype.updateAABB = function() {
                for (var t = this.shapes, e = t.length, o = u, i = this.angle, r = 0; r !== e; r++) {
                    var a = t[r],
                        s = a.angle + i;
                    n.rotate(o, a.position, i), n.add(o, o, this.position), a.computeAABB(p, o, s), 0 === r ? this.aabb.copy(p) : this.aabb.extend(p)
                }
                this.aabbNeedsUpdate = !1
            }, i.prototype.updateBoundingRadius = function() {
                for (var t = this.shapes, e = t.length, o = 0, i = 0; i !== e; i++) {
                    var r = t[i],
                        a = n.length(r.position),
                        s = r.boundingRadius;
                    a + s > o && (o = a + s)
                }
                this.boundingRadius = o
            }, i.prototype.addShape = function(t, e, o) {
                if (t.body) throw new Error("A shape can only be added to one body.");
                t.body = this, e ? n.copy(t.position, e) : n.set(t.position, 0, 0), t.angle = o || 0, this.shapes.push(t), this.updateMassProperties(), this.updateBoundingRadius(), this.aabbNeedsUpdate = !0
            }, i.prototype.removeShape = function(t) {
                var e = this.shapes.indexOf(t);
                return -1 !== e ? (this.shapes.splice(e, 1), this.aabbNeedsUpdate = !0, t.body = null, !0) : !1
            }, i.prototype.updateMassProperties = function() {
                if (this.type === i.STATIC || this.type === i.KINEMATIC) this.mass = Number.MAX_VALUE, this.invMass = 0, this.inertia = Number.MAX_VALUE, this.invInertia = 0;
                else {
                    var t = this.shapes,
                        e = t.length,
                        o = this.mass / e,
                        r = 0;
                    if (this.fixedRotation) this.inertia = Number.MAX_VALUE, this.invInertia = 0;
                    else {
                        for (var a = 0; e > a; a++) {
                            var s = t[a],
                                c = n.squaredLength(s.position),
                                h = s.computeMomentOfInertia(o);
                            r += h + o * c
                        }
                        this.inertia = r, this.invInertia = r > 0 ? 1 / r : 0
                    }
                    this.invMass = 1 / this.mass, n.set(this.massMultiplier, this.fixedX ? 0 : 1, this.fixedY ? 0 : 1)
                }
            }, n.create(), i.prototype.applyForce = function(t, e) {
                if (n.add(this.force, this.force, t), e) {
                    var o = n.crossLength(e, t);
                    this.angularForce += o
                }
            };
            var d = n.create(),
                f = n.create(),
                v = n.create();
            i.prototype.applyForceLocal = function(t, e) {
                e = e || v;
                var o = d,
                    i = f;
                this.vectorToWorldFrame(o, t), this.vectorToWorldFrame(i, e), this.applyForce(o, i)
            };
            var y = n.create();
            i.prototype.applyImpulse = function(t, e) {
                if (this.type === i.DYNAMIC) {
                    var o = y;
                    if (n.scale(o, t, this.invMass), n.multiply(o, this.massMultiplier, o), n.add(this.velocity, o, this.velocity), e) {
                        var r = n.crossLength(e, t);
                        r *= this.invInertia, this.angularVelocity += r
                    }
                }
            };
            var m = n.create(),
                g = n.create(),
                A = n.create();
            i.prototype.applyImpulseLocal = function(t, e) {
                e = e || A;
                var o = m,
                    i = g;
                this.vectorToWorldFrame(o, t), this.vectorToWorldFrame(i, e), this.applyImpulse(o, i)
            }, i.prototype.toLocalFrame = function(t, e) {
                n.toLocalFrame(t, e, this.position, this.angle)
            }, i.prototype.toWorldFrame = function(t, e) {
                n.toGlobalFrame(t, e, this.position, this.angle)
            }, i.prototype.vectorToLocalFrame = function(t, e) {
                n.vectorToLocalFrame(t, e, this.angle)
            }, i.prototype.vectorToWorldFrame = function(t, e) {
                n.vectorToGlobalFrame(t, e, this.angle)
            }, i.prototype.fromPolygon = function(t, e) {
                e = e || {};
                for (var o = this.shapes.length; o >= 0; --o) this.removeShape(this.shapes[o]);
                var i = new r.Polygon;
                if (i.vertices = t, i.makeCCW(), "number" == typeof e.removeCollinearPoints && i.removeCollinearPoints(e.removeCollinearPoints), "undefined" == typeof e.skipSimpleCheck && !i.isSimple()) return !1;
                this.concavePath = i.vertices.slice(0);
                for (var o = 0; o < this.concavePath.length; o++) {
                    var s = [0, 0];
                    n.copy(s, this.concavePath[o]), this.concavePath[o] = s
                }
                var c;
                c = e.optimalDecomp ? i.decomp() : i.quickDecomp();
                for (var h = n.create(), o = 0; o !== c.length; o++) {
                    for (var l = new a({
                            vertices: c[o].vertices
                        }), p = 0; p !== l.vertices.length; p++) {
                        var s = l.vertices[p];
                        n.sub(s, s, l.centerOfMass)
                    }
                    n.scale(h, l.centerOfMass, 1), l.updateTriangles(), l.updateCenterOfMass(), l.updateBoundingRadius(), this.addShape(l, h)
                }
                return this.adjustCenterOfMass(), this.aabbNeedsUpdate = !0, !0
            };
            var b = (n.fromValues(0, 0), n.fromValues(0, 0)),
                E = n.fromValues(0, 0),
                B = n.fromValues(0, 0);
            i.prototype.adjustCenterOfMass = function() {
                var t = b,
                    e = E,
                    o = B,
                    i = 0;
                n.set(e, 0, 0);
                for (var r = 0; r !== this.shapes.length; r++) {
                    var a = this.shapes[r];
                    n.scale(t, a.position, a.area), n.add(e, e, t), i += a.area
                }
                n.scale(o, e, 1 / i);
                for (var r = 0; r !== this.shapes.length; r++) {
                    var a = this.shapes[r];
                    n.sub(a.position, a.position, o)
                }
                n.add(this.position, this.position, o);
                for (var r = 0; this.concavePath && r < this.concavePath.length; r++) n.sub(this.concavePath[r], this.concavePath[r], o);
                this.updateMassProperties(), this.updateBoundingRadius()
            }, i.prototype.setZeroForce = function() {
                n.set(this.force, 0, 0), this.angularForce = 0
            }, i.prototype.resetConstraintVelocity = function() {
                var t = this,
                    e = t.vlambda;
                n.set(e, 0, 0), t.wlambda = 0
            }, i.prototype.addConstraintVelocity = function() {
                var t = this,
                    e = t.velocity;
                n.add(e, e, t.vlambda), t.angularVelocity += t.wlambda
            }, i.prototype.applyDamping = function(t) {
                if (this.type === i.DYNAMIC) {
                    var e = this.velocity;
                    n.scale(e, e, Math.pow(1 - this.damping, t)), this.angularVelocity *= Math.pow(1 - this.angularDamping, t)
                }
            }, i.prototype.wakeUp = function() {
                var t = this.sleepState;
                this.sleepState = i.AWAKE, this.idleTime = 0, t !== i.AWAKE && this.emit(i.wakeUpEvent)
            }, i.prototype.sleep = function() {
                this.sleepState = i.SLEEPING, this.angularVelocity = 0, this.angularForce = 0, n.set(this.velocity, 0, 0), n.set(this.force, 0, 0), this.emit(i.sleepEvent)
            }, i.prototype.sleepTick = function(t, e, o) {
                if (this.allowSleep && this.type !== i.SLEEPING) {
                    this.wantsToSleep = !1;
                    var r = (this.sleepState, n.squaredLength(this.velocity) + Math.pow(this.angularVelocity, 2)),
                        a = Math.pow(this.sleepSpeedLimit, 2);
                    r >= a ? (this.idleTime = 0, this.sleepState = i.AWAKE) : (this.idleTime += o, this.sleepState = i.SLEEPY), this.idleTime > this.sleepTimeLimit && (e ? this.wantsToSleep = !0 : this.sleep())
                }
            }, i.prototype.overlaps = function(t) {
                return this.world.overlapKeeper.bodiesAreOverlapping(this, t)
            };
            var q = n.create(),
                P = n.create();
            i.prototype.integrate = function(t) {
                var e = this.invMass,
                    o = this.force,
                    i = this.position,
                    r = this.velocity;
                n.copy(this.previousPosition, this.position), this.previousAngle = this.angle, this.fixedRotation || (this.angularVelocity += this.angularForce * this.invInertia * t), n.scale(q, o, t * e), n.multiply(q, this.massMultiplier, q), n.add(r, q, r), this.integrateToTimeOfImpact(t) || (n.scale(P, r, t), n.add(i, i, P), this.fixedRotation || (this.angle += this.angularVelocity * t)), this.aabbNeedsUpdate = !0
            };
            var w = new s,
                S = new c({
                    mode: c.ALL
                }),
                C = n.create(),
                L = n.create(),
                x = n.create(),
                F = n.create();
            i.prototype.integrateToTimeOfImpact = function(t) {
                if (this.ccdSpeedThreshold < 0 || n.squaredLength(this.velocity) < Math.pow(this.ccdSpeedThreshold, 2)) return !1;
                n.normalize(C, this.velocity), n.scale(L, this.velocity, t), n.add(L, L, this.position), n.sub(x, L, this.position);
                var e, o = this.angularVelocity * t,
                    i = n.length(x),
                    r = 1,
                    a = this;
                if (w.reset(), S.callback = function(t) {
                        t.body !== a && (e = t.body, t.getHitPoint(L, S), n.sub(x, L, a.position), r = n.length(x) / i, t.stop())
                    }, n.copy(S.from, this.position), n.copy(S.to, L), S.update(), this.world.raycast(w, S), !e) return !1;
                var s = this.angle;
                n.copy(F, this.position);
                for (var c = 0, h = 0, l = 0, p = r; p >= h && c < this.ccdIterations;) {
                    c++, l = (p - h) / 2, n.scale(P, x, r), n.add(this.position, F, P), this.angle = s + o * r, this.updateAABB();
                    var u = this.aabb.overlaps(e.aabb) && this.world.narrowphase.bodiesOverlap(this, e);
                    u ? h = l : p = l
                }
                return r = l, n.copy(this.position, F), this.angle = s, n.scale(P, x, r), n.add(this.position, this.position, P), this.fixedRotation || (this.angle += o * r), !0
            }, i.prototype.getVelocityAtPoint = function(t, e) {
                return n.crossVZ(t, e, this.angularVelocity), n.subtract(t, this.velocity, t), t
            }, i.sleepyEvent = {
                type: "sleepy"
            }, i.sleepEvent = {
                type: "sleep"
            }, i.wakeUpEvent = {
                type: "wakeup"
            }, i.DYNAMIC = 1, i.STATIC = 2, i.KINEMATIC = 4, i.AWAKE = 0, i.SLEEPY = 1, i.SLEEPING = 2
        }, {
            "../collision/AABB": 7,
            "../collision/Ray": 11,
            "../collision/RaycastResult": 12,
            "../events/EventEmitter": 26,
            "../math/vec2": 30,
            "../shapes/Convex": 40,
            "poly-decomp": 5
        }],
        32: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, r.call(this, t, e, o), this.localAnchorA = n.fromValues(0, 0), this.localAnchorB = n.fromValues(0, 0), o.localAnchorA && n.copy(this.localAnchorA, o.localAnchorA), o.localAnchorB && n.copy(this.localAnchorB, o.localAnchorB), o.worldAnchorA && this.setWorldAnchorA(o.worldAnchorA), o.worldAnchorB && this.setWorldAnchorB(o.worldAnchorB);
                var i = n.create(),
                    a = n.create();
                this.getWorldAnchorA(i), this.getWorldAnchorB(a);
                var s = n.distance(i, a);
                this.restLength = "number" == typeof o.restLength ? o.restLength : s
            }
            var n = t("../math/vec2"),
                r = t("./Spring");
            t("../utils/Utils"), e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.setWorldAnchorA = function(t) {
                this.bodyA.toLocalFrame(this.localAnchorA, t)
            }, i.prototype.setWorldAnchorB = function(t) {
                this.bodyB.toLocalFrame(this.localAnchorB, t)
            }, i.prototype.getWorldAnchorA = function(t) {
                this.bodyA.toWorldFrame(t, this.localAnchorA)
            }, i.prototype.getWorldAnchorB = function(t) {
                this.bodyB.toWorldFrame(t, this.localAnchorB)
            };
            var a = n.create(),
                s = n.create(),
                c = n.create(),
                h = n.create(),
                l = n.create(),
                p = n.create(),
                u = n.create(),
                d = n.create(),
                f = n.create();
            i.prototype.applyForce = function() {
                var t = this.stiffness,
                    e = this.damping,
                    o = this.restLength,
                    i = this.bodyA,
                    r = this.bodyB,
                    v = a,
                    y = s,
                    m = c,
                    g = h,
                    A = f,
                    b = l,
                    E = p,
                    B = u,
                    q = d;
                this.getWorldAnchorA(b), this.getWorldAnchorB(E), n.sub(B, b, i.position), n.sub(q, E, r.position), n.sub(v, E, b);
                var P = n.len(v);
                n.normalize(y, v), n.sub(m, r.velocity, i.velocity), n.crossZV(A, r.angularVelocity, q), n.add(m, m, A), n.crossZV(A, i.angularVelocity, B), n.sub(m, m, A), n.scale(g, y, -t * (P - o) - e * n.dot(m, y)), n.sub(i.force, i.force, g), n.add(r.force, r.force, g);
                var w = n.crossLength(B, g),
                    S = n.crossLength(q, g);
                i.angularForce -= w, r.angularForce += S
            }
        }, {
            "../math/vec2": 30,
            "../utils/Utils": 57,
            "./Spring": 34
        }],
        33: [function(t, e, o) {
            function i(t, e, o) {
                o = o || {}, n.call(this, t, e, o), this.restAngle = "number" == typeof o.restAngle ? o.restAngle : e.angle - t.angle
            }
            var n = (t("../math/vec2"), t("./Spring"));
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.applyForce = function() {
                var t = this.stiffness,
                    e = this.damping,
                    o = this.restAngle,
                    i = this.bodyA,
                    n = this.bodyB,
                    r = n.angle - i.angle,
                    a = n.angularVelocity - i.angularVelocity,
                    s = -t * (r - o) - e * a * 0;
                i.angularForce -= s, n.angularForce += s
            }
        }, {
            "../math/vec2": 30,
            "./Spring": 34
        }],
        34: [function(t, e, o) {
            function i(t, e, o) {
                o = n.defaults(o, {
                    stiffness: 100,
                    damping: 1
                }), this.stiffness = o.stiffness, this.damping = o.damping, this.bodyA = t, this.bodyB = e
            }
            var n = (t("../math/vec2"), t("../utils/Utils"));
            e.exports = i, i.prototype.applyForce = function() {}
        }, {
            "../math/vec2": 30,
            "../utils/Utils": 57
        }],
        35: [function(t, e, o) {
            function i(t, e) {
                e = e || {}, this.chassisBody = t, this.wheels = [], this.groundBody = new c({
                    mass: 0
                }), this.world = null;
                var o = this;
                this.preStepCallback = function() {
                    o.update()
                }
            }

            function n(t, e) {
                e = e || {}, this.vehicle = t, this.forwardEquation = new s(t.chassisBody, t.groundBody), this.sideEquation = new s(t.chassisBody, t.groundBody), this.steerValue = 0, this.engineForce = 0, this.setSideFriction(void 0 !== e.sideFriction ? e.sideFriction : 5), this.localForwardVector = r.fromValues(0, 1), e.localForwardVector && r.copy(this.localForwardVector, e.localForwardVector), this.localPosition = r.fromValues(0, 0), e.localPosition && r.copy(this.localPosition, e.localPosition), a.apply(this, t.chassisBody, t.groundBody), this.equations.push(this.forwardEquation, this.sideEquation), this.setBrakeForce(0)
            }
            var r = t("../math/vec2"),
                a = (t("../utils/Utils"), t("../constraints/Constraint")),
                s = t("../equations/FrictionEquation"),
                c = t("../objects/Body");
            e.exports = i, i.prototype.addToWorld = function(t) {
                this.world = t, t.addBody(this.groundBody), t.on("preStep", this.preStepCallback);
                for (var e = 0; e < this.wheels.length; e++) {
                    var o = this.wheels[e];
                    t.addConstraint(o)
                }
            }, i.prototype.removeFromWorld = function() {
                var t = this.world;
                t.removeBody(this.groundBody), t.off("preStep", this.preStepCallback);
                for (var e = 0; e < this.wheels.length; e++) {
                    var o = this.wheels[e];
                    t.removeConstraint(o)
                }
                this.world = null
            }, i.prototype.addWheel = function(t) {
                var e = new n(this, t);
                return this.wheels.push(e), e
            }, i.prototype.update = function() {
                for (var t = 0; t < this.wheels.length; t++) this.wheels[t].update()
            }, n.prototype = new a, n.prototype.setBrakeForce = function(t) {
                this.forwardEquation.setSlipForce(t)
            }, n.prototype.setSideFriction = function(t) {
                this.sideEquation.setSlipForce(t)
            };
            var h = r.create(),
                l = r.create();
            n.prototype.getSpeed = function() {
                return this.vehicle.chassisBody.vectorToWorldFrame(l, this.localForwardVector), this.vehicle.chassisBody.getVelocityAtPoint(h, l), r.dot(h, l)
            };
            var p = r.create();
            n.prototype.update = function() {
                this.vehicle.chassisBody.vectorToWorldFrame(this.forwardEquation.t, this.localForwardVector), r.rotate(this.sideEquation.t, this.localForwardVector, Math.PI / 2), this.vehicle.chassisBody.vectorToWorldFrame(this.sideEquation.t, this.sideEquation.t), r.rotate(this.forwardEquation.t, this.forwardEquation.t, this.steerValue), r.rotate(this.sideEquation.t, this.sideEquation.t, this.steerValue), this.vehicle.chassisBody.toWorldFrame(this.forwardEquation.contactPointB, this.localPosition), r.copy(this.sideEquation.contactPointB, this.forwardEquation.contactPointB), this.vehicle.chassisBody.vectorToWorldFrame(this.forwardEquation.contactPointA, this.localPosition), r.copy(this.sideEquation.contactPointA, this.forwardEquation.contactPointA), r.normalize(p, this.forwardEquation.t), r.scale(p, p, this.engineForce), this.vehicle.chassisBody.applyForce(p, this.forwardEquation.contactPointA)
            }
        }, {
            "../constraints/Constraint": 14,
            "../equations/FrictionEquation": 23,
            "../math/vec2": 30,
            "../objects/Body": 31,
            "../utils/Utils": 57
        }],
        36: [function(t, e, o) {
            var i = e.exports = {
                AABB: t("./collision/AABB"),
                AngleLockEquation: t("./equations/AngleLockEquation"),
                Body: t("./objects/Body"),
                Broadphase: t("./collision/Broadphase"),
                Capsule: t("./shapes/Capsule"),
                Circle: t("./shapes/Circle"),
                Constraint: t("./constraints/Constraint"),
                ContactEquation: t("./equations/ContactEquation"),
                ContactEquationPool: t("./utils/ContactEquationPool"),
                ContactMaterial: t("./material/ContactMaterial"),
                Convex: t("./shapes/Convex"),
                DistanceConstraint: t("./constraints/DistanceConstraint"),
                Equation: t("./equations/Equation"),
                EventEmitter: t("./events/EventEmitter"),
                FrictionEquation: t("./equations/FrictionEquation"),
                FrictionEquationPool: t("./utils/FrictionEquationPool"),
                GearConstraint: t("./constraints/GearConstraint"),
                GSSolver: t("./solver/GSSolver"),
                Heightfield: t("./shapes/Heightfield"),
                Line: t("./shapes/Line"),
                LockConstraint: t("./constraints/LockConstraint"),
                Material: t("./material/Material"),
                Narrowphase: t("./collision/Narrowphase"),
                NaiveBroadphase: t("./collision/NaiveBroadphase"),
                Particle: t("./shapes/Particle"),
                Plane: t("./shapes/Plane"),
                Pool: t("./utils/Pool"),
                RevoluteConstraint: t("./constraints/RevoluteConstraint"),
                PrismaticConstraint: t("./constraints/PrismaticConstraint"),
                Ray: t("./collision/Ray"),
                RaycastResult: t("./collision/RaycastResult"),
                Box: t("./shapes/Box"),
                RotationalVelocityEquation: t("./equations/RotationalVelocityEquation"),
                SAPBroadphase: t("./collision/SAPBroadphase"),
                Shape: t("./shapes/Shape"),
                Solver: t("./solver/Solver"),
                Spring: t("./objects/Spring"),
                TopDownVehicle: t("./objects/TopDownVehicle"),
                LinearSpring: t("./objects/LinearSpring"),
                RotationalSpring: t("./objects/RotationalSpring"),
                Utils: t("./utils/Utils"),
                World: t("./world/World"),
                vec2: t("./math/vec2"),
                version: t("../package.json").version
            };
            Object.defineProperty(i, "Rectangle", {
                get: function() {
                    return console.warn("The Rectangle class has been renamed to Box."), this.Box
                }
            })
        }, {
            "../package.json": 6,
            "./collision/AABB": 7,
            "./collision/Broadphase": 8,
            "./collision/NaiveBroadphase": 9,
            "./collision/Narrowphase": 10,
            "./collision/Ray": 11,
            "./collision/RaycastResult": 12,
            "./collision/SAPBroadphase": 13,
            "./constraints/Constraint": 14,
            "./constraints/DistanceConstraint": 15,
            "./constraints/GearConstraint": 16,
            "./constraints/LockConstraint": 17,
            "./constraints/PrismaticConstraint": 18,
            "./constraints/RevoluteConstraint": 19,
            "./equations/AngleLockEquation": 20,
            "./equations/ContactEquation": 21,
            "./equations/Equation": 22,
            "./equations/FrictionEquation": 23,
            "./equations/RotationalVelocityEquation": 25,
            "./events/EventEmitter": 26,
            "./material/ContactMaterial": 27,
            "./material/Material": 28,
            "./math/vec2": 30,
            "./objects/Body": 31,
            "./objects/LinearSpring": 32,
            "./objects/RotationalSpring": 33,
            "./objects/Spring": 34,
            "./objects/TopDownVehicle": 35,
            "./shapes/Box": 37,
            "./shapes/Capsule": 38,
            "./shapes/Circle": 39,
            "./shapes/Convex": 40,
            "./shapes/Heightfield": 41,
            "./shapes/Line": 42,
            "./shapes/Particle": 43,
            "./shapes/Plane": 44,
            "./shapes/Shape": 45,
            "./solver/GSSolver": 46,
            "./solver/Solver": 47,
            "./utils/ContactEquationPool": 48,
            "./utils/FrictionEquationPool": 49,
            "./utils/Pool": 55,
            "./utils/Utils": 57,
            "./world/World": 61
        }],
        37: [function(t, e, o) {
            function i(t) {
                "number" == typeof arguments[0] && "number" == typeof arguments[1] && (t = {
                    width: arguments[0],
                    height: arguments[1]
                }, console.warn("The Rectangle has been renamed to Box and its constructor signature has changed. Please use the following format: new Box({ width: 1, height: 1, ... })")), t = t || {};
                var e = this.width = t.width || 1,
                    o = this.height = t.height || 1,
                    i = [n.fromValues(-e / 2, -o / 2), n.fromValues(e / 2, -o / 2), n.fromValues(e / 2, o / 2), n.fromValues(-e / 2, o / 2)],
                    s = [n.fromValues(1, 0), n.fromValues(0, 1)];
                t.vertices = i, t.axes = s, t.type = r.BOX, a.call(this, t)
            }
            var n = t("../math/vec2"),
                r = t("./Shape"),
                a = t("./Convex");
            e.exports = i, i.prototype = new a, i.prototype.constructor = i, i.prototype.computeMomentOfInertia = function(t) {
                var e = this.width,
                    o = this.height;
                return t * (o * o + e * e) / 12
            }, i.prototype.updateBoundingRadius = function() {
                var t = this.width,
                    e = this.height;
                this.boundingRadius = Math.sqrt(t * t + e * e) / 2
            }, n.create(), n.create(), n.create(), n.create(), i.prototype.computeAABB = function(t, e, o) {
                t.setFromPoints(this.vertices, e, o, 0)
            }, i.prototype.updateArea = function() {
                this.area = this.width * this.height
            }
        }, {
            "../math/vec2": 30,
            "./Convex": 40,
            "./Shape": 45
        }],
        38: [function(t, e, o) {
            function i(t) {
                "number" == typeof arguments[0] && "number" == typeof arguments[1] && (t = {
                    length: arguments[0],
                    radius: arguments[1]
                }, console.warn("The Capsule constructor signature has changed. Please use the following format: new Capsule({ radius: 1, length: 1 })")), t = t || {}, this.length = t.length || 1, this.radius = t.radius || 1, t.type = n.CAPSULE, n.call(this, t)
            }
            var n = t("./Shape"),
                r = t("../math/vec2");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeMomentOfInertia = function(t) {
                var e = this.radius,
                    o = this.length + e,
                    i = 2 * e;
                return t * (i * i + o * o) / 12
            }, i.prototype.updateBoundingRadius = function() {
                this.boundingRadius = this.radius + this.length / 2
            }, i.prototype.updateArea = function() {
                this.area = Math.PI * this.radius * this.radius + 2 * this.radius * this.length
            };
            var a = r.create();
            i.prototype.computeAABB = function(t, e, o) {
                var i = this.radius;
                r.set(a, this.length / 2, 0), 0 !== o && r.rotate(a, a, o), r.set(t.upperBound, Math.max(a[0] + i, -a[0] + i), Math.max(a[1] + i, -a[1] + i)), r.set(t.lowerBound, Math.min(a[0] - i, -a[0] - i), Math.min(a[1] - i, -a[1] - i)), r.add(t.lowerBound, t.lowerBound, e), r.add(t.upperBound, t.upperBound, e)
            };
            var s = r.create(),
                c = r.create(),
                h = r.create(),
                l = r.create(),
                p = r.fromValues(0, 1);
            i.prototype.raycast = function(t, e, o, i) {
                for (var n = e.from, a = e.to, u = (e.direction, s), d = c, f = h, v = l, y = this.length / 2, m = 0; 2 > m; m++) {
                    var g = this.radius * (2 * m - 1);
                    r.set(f, -y, g), r.set(v, y, g), r.toGlobalFrame(f, f, o, i), r.toGlobalFrame(v, v, o, i);
                    var A = r.getLineSegmentsIntersectionFraction(n, a, f, v);
                    if (A >= 0 && (r.rotate(d, p, i), r.scale(d, d, 2 * m - 1), e.reportIntersection(t, A, d, -1), t.shouldStop(e))) return
                }
                for (var b = Math.pow(this.radius, 2) + Math.pow(y, 2), m = 0; 2 > m; m++) {
                    r.set(f, y * (2 * m - 1), 0), r.toGlobalFrame(f, f, o, i);
                    var E = Math.pow(a[0] - n[0], 2) + Math.pow(a[1] - n[1], 2),
                        B = 2 * ((a[0] - n[0]) * (n[0] - f[0]) + (a[1] - n[1]) * (n[1] - f[1])),
                        q = Math.pow(n[0] - f[0], 2) + Math.pow(n[1] - f[1], 2) - Math.pow(this.radius, 2),
                        A = Math.pow(B, 2) - 4 * E * q;
                    if (!(0 > A))
                        if (0 === A) {
                            if (r.lerp(u, n, a, A), r.squaredDistance(u, o) > b && (r.sub(d, u, f), r.normalize(d, d), e.reportIntersection(t, A, d, -1), t.shouldStop(e))) return
                        } else {
                            var P = Math.sqrt(A),
                                w = 1 / (2 * E),
                                S = (-B - P) * w,
                                C = (-B + P) * w;
                            if (S >= 0 && 1 >= S && (r.lerp(u, n, a, S), r.squaredDistance(u, o) > b && (r.sub(d, u, f), r.normalize(d, d), e.reportIntersection(t, S, d, -1), t.shouldStop(e)))) return;
                            if (C >= 0 && 1 >= C && (r.lerp(u, n, a, C), r.squaredDistance(u, o) > b && (r.sub(d, u, f), r.normalize(d, d), e.reportIntersection(t, C, d, -1), t.shouldStop(e)))) return
                        }
                }
            }
        }, {
            "../math/vec2": 30,
            "./Shape": 45
        }],
        39: [function(t, e, o) {
            function i(t) {
                "number" == typeof arguments[0] && (t = {
                    radius: arguments[0]
                }, console.warn("The Circle constructor signature has changed. Please use the following format: new Circle({ radius: 1 })")), t = t || {}, this.radius = t.radius || 1, t.type = n.CIRCLE, n.call(this, t)
            }
            var n = t("./Shape"),
                r = t("../math/vec2");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeMomentOfInertia = function(t) {
                var e = this.radius;
                return t * e * e / 2
            }, i.prototype.updateBoundingRadius = function() {
                this.boundingRadius = this.radius
            }, i.prototype.updateArea = function() {
                this.area = Math.PI * this.radius * this.radius
            }, i.prototype.computeAABB = function(t, e, o) {
                var i = this.radius;
                r.set(t.upperBound, i, i), r.set(t.lowerBound, -i, -i), e && (r.add(t.lowerBound, t.lowerBound, e), r.add(t.upperBound, t.upperBound, e))
            };
            var a = r.create(),
                s = r.create();
            i.prototype.raycast = function(t, e, o, i) {
                var n = e.from,
                    c = e.to,
                    h = this.radius,
                    l = Math.pow(c[0] - n[0], 2) + Math.pow(c[1] - n[1], 2),
                    p = 2 * ((c[0] - n[0]) * (n[0] - o[0]) + (c[1] - n[1]) * (n[1] - o[1])),
                    u = Math.pow(n[0] - o[0], 2) + Math.pow(n[1] - o[1], 2) - Math.pow(h, 2),
                    d = Math.pow(p, 2) - 4 * l * u,
                    f = a,
                    v = s;
                if (!(0 > d))
                    if (0 === d) r.lerp(f, n, c, d), r.sub(v, f, o), r.normalize(v, v), e.reportIntersection(t, d, v, -1);
                    else {
                        var y = Math.sqrt(d),
                            m = 1 / (2 * l),
                            g = (-p - y) * m,
                            A = (-p + y) * m;
                        if (g >= 0 && 1 >= g && (r.lerp(f, n, c, g), r.sub(v, f, o), r.normalize(v, v), e.reportIntersection(t, g, v, -1), t.shouldStop(e))) return;
                        A >= 0 && 1 >= A && (r.lerp(f, n, c, A), r.sub(v, f, o), r.normalize(v, v), e.reportIntersection(t, A, v, -1))
                    }
            }
        }, {
            "../math/vec2": 30,
            "./Shape": 45
        }],
        40: [function(t, e, o) {
            function i(t) {
                Array.isArray(arguments[0]) && (t = {
                    vertices: arguments[0],
                    axes: arguments[1]
                }, console.warn("The Convex constructor signature has changed. Please use the following format: new Convex({ vertices: [...], ... })")), t = t || {}, this.vertices = [];
                for (var e = void 0 !== t.vertices ? t.vertices : [], o = 0; o < e.length; o++) {
                    var i = r.create();
                    r.copy(i, e[o]), this.vertices.push(i)
                }
                if (this.axes = [], t.axes)
                    for (var o = 0; o < t.axes.length; o++) {
                        var a = r.create();
                        r.copy(a, t.axes[o]), this.axes.push(a)
                    } else
                        for (var o = 0; o < this.vertices.length; o++) {
                            var s = this.vertices[o],
                                c = this.vertices[(o + 1) % this.vertices.length],
                                h = r.create();
                            r.sub(h, c, s), r.rotate90cw(h, h), r.normalize(h, h), this.axes.push(h)
                        }
                if (this.centerOfMass = r.fromValues(0, 0), this.triangles = [], this.vertices.length && (this.updateTriangles(), this.updateCenterOfMass()), this.boundingRadius = 0, t.type = n.CONVEX, n.call(this, t), this.updateBoundingRadius(), this.updateArea(), this.area < 0)
                    // throw new Error("Convex vertices must be given in conter-clockwise winding."
                    // )
                    console.log("Convex vertices must be given in conter-clockwise winding.");
            }
            var n = t("./Shape"),
                r = t("../math/vec2"),
                a = t("../math/polyk");
            t("poly-decomp"), e.exports = i, i.prototype = new n, i.prototype.constructor = i;
            var s = r.create(),
                c = r.create();
            i.prototype.projectOntoLocalAxis = function(t, e) {
                for (var o, i, n = null, a = null, t = s, c = 0; c < this.vertices.length; c++) o = this.vertices[c], i = r.dot(o, t), (null === n || i > n) && (n = i), (null === a || a > i) && (a = i);
                if (a > n) {
                    var h = a;
                    a = n, n = h
                }
                r.set(e, a, n)
            }, i.prototype.projectOntoWorldAxis = function(t, e, o, i) {
                var n = c;
                this.projectOntoLocalAxis(t, i), 0 !== o ? r.rotate(n, t, o) : n = t;
                var a = r.dot(e, n);
                r.set(i, i[0] + a, i[1] + a)
            }, i.prototype.updateTriangles = function() {
                this.triangles.length = 0;
                for (var t = [], e = 0; e < this.vertices.length; e++) {
                    var o = this.vertices[e];
                    t.push(o[0], o[1])
                }
                for (var i = a.Triangulate(t), e = 0; e < i.length; e += 3) {
                    var n = i[e],
                        r = i[e + 1],
                        s = i[e + 2];
                    this.triangles.push([n, r, s])
                }
            };
            var h = r.create(),
                l = r.create(),
                p = r.create(),
                u = r.create(),
                d = r.create();
            r.create(), r.create(), r.create(), r.create(), i.prototype.updateCenterOfMass = function() {
                var t = this.triangles,
                    e = this.vertices,
                    o = this.centerOfMass,
                    n = h,
                    a = p,
                    s = u,
                    c = d,
                    f = l;
                r.set(o, 0, 0);
                for (var v = 0, y = 0; y !== t.length; y++) {
                    var m = t[y],
                        a = e[m[0]],
                        s = e[m[1]],
                        c = e[m[2]];
                    r.centroid(n, a, s, c);
                    var g = i.triangleArea(a, s, c);
                    v += g, r.scale(f, n, g), r.add(o, o, f)
                }
                r.scale(o, o, 1 / v)
            }, i.prototype.computeMomentOfInertia = function(t) {
                for (var e = 0, o = 0, i = this.vertices.length, n = i - 1, a = 0; i > a; n = a, a++) {
                    var s = this.vertices[n],
                        c = this.vertices[a],
                        h = Math.abs(r.crossLength(s, c)),
                        l = r.dot(c, c) + r.dot(c, s) + r.dot(s, s);
                    e += h * l, o += h
                }
                return t / 6 * (e / o)
            }, i.prototype.updateBoundingRadius = function() {
                for (var t = this.vertices, e = 0, o = 0; o !== t.length; o++) {
                    var i = r.squaredLength(t[o]);
                    i > e && (e = i)
                }
                this.boundingRadius = Math.sqrt(e)
            }, i.triangleArea = function(t, e, o) {
                return .5 * ((e[0] - t[0]) * (o[1] - t[1]) - (o[0] - t[0]) * (e[1] - t[1]))
            }, i.prototype.updateArea = function() {
                this.updateTriangles(), this.area = 0;
                for (var t = this.triangles, e = this.vertices, o = 0; o !== t.length; o++) {
                    var n = t[o],
                        r = e[n[0]],
                        a = e[n[1]],
                        s = e[n[2]],
                        c = i.triangleArea(r, a, s);
                    this.area += c
                }
            }, i.prototype.computeAABB = function(t, e, o) {
                t.setFromPoints(this.vertices, e, o, 0)
            };
            var f = r.create(),
                v = r.create(),
                y = r.create();
            i.prototype.raycast = function(t, e, o, i) {
                var n = f,
                    a = v,
                    s = y,
                    c = this.vertices;
                r.toLocalFrame(n, e.from, o, i), r.toLocalFrame(a, e.to, o, i);
                for (var h = c.length, l = 0; h > l && !t.shouldStop(e); l++) {
                    var p = c[l],
                        u = c[(l + 1) % h],
                        d = r.getLineSegmentsIntersectionFraction(n, a, p, u);
                    d >= 0 && (r.sub(s, u, p), r.rotate(s, s, -Math.PI / 2 + i), r.normalize(s, s), e.reportIntersection(t, d, s, l))
                }
            }
        }, {
            "../math/polyk": 29,
            "../math/vec2": 30,
            "./Shape": 45,
            "poly-decomp": 5
        }],
        41: [function(t, e, o) {
            function i(t) {
                if (Array.isArray(arguments[0])) {
                    if (t = {
                            heights: arguments[0]
                        }, "object" == typeof arguments[1])
                        for (var e in arguments[1]) t[e] = arguments[1][e];
                    console.warn("The Heightfield constructor signature has changed. Please use the following format: new Heightfield({ heights: [...], ... })")
                }
                t = t || {}, this.heights = t.heights ? t.heights.slice(0) : [], this.maxValue = t.maxValue || null, this.minValue = t.minValue || null, this.elementWidth = t.elementWidth || .1, (void 0 === t.maxValue || void 0 === t.minValue) && this.updateMaxMinValues(), t.type = n.HEIGHTFIELD, n.call(this, t)
            }
            var n = t("./Shape"),
                r = t("../math/vec2");
            t("../utils/Utils"), e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.updateMaxMinValues = function() {
                for (var t = this.heights, e = t[0], o = t[0], i = 0; i !== t.length; i++) {
                    var n = t[i];
                    n > e && (e = n), o > n && (o = n)
                }
                this.maxValue = e, this.minValue = o
            }, i.prototype.computeMomentOfInertia = function(t) {
                return Number.MAX_VALUE
            }, i.prototype.updateBoundingRadius = function() {
                this.boundingRadius = Number.MAX_VALUE
            }, i.prototype.updateArea = function() {
                for (var t = this.heights, e = 0, o = 0; o < t.length - 1; o++) e += (t[o] + t[o + 1]) / 2 * this.elementWidth;
                this.area = e
            };
            var a = [r.create(), r.create(), r.create(), r.create()];
            i.prototype.computeAABB = function(t, e, o) {
                r.set(a[0], 0, this.maxValue), r.set(a[1], this.elementWidth * this.heights.length, this.maxValue), r.set(a[2], this.elementWidth * this.heights.length, this.minValue), r.set(a[3], 0, this.minValue), t.setFromPoints(a, e, o)
            }, i.prototype.getLineSegment = function(t, e, o) {
                var i = this.heights,
                    n = this.elementWidth;
                r.set(t, o * n, i[o]), r.set(e, (o + 1) * n, i[o + 1])
            }, i.prototype.getSegmentIndex = function(t) {
                return Math.floor(t[0] / this.elementWidth)
            }, i.prototype.getClampedSegmentIndex = function(t) {
                var e = this.getSegmentIndex(t);
                return e = Math.min(this.heights.length, Math.max(e, 0))
            };
            var s = (r.create(), r.create()),
                c = r.create(),
                h = r.create(),
                l = r.create(),
                p = r.create();
            r.fromValues(0, 1), i.prototype.raycast = function(t, e, o, i) {
                var n = e.from,
                    a = e.to,
                    u = (e.direction, s),
                    d = c,
                    f = h,
                    v = l,
                    y = p;
                r.toLocalFrame(v, n, o, i), r.toLocalFrame(y, a, o, i);
                var m = this.getClampedSegmentIndex(v),
                    g = this.getClampedSegmentIndex(y);
                if (m > g) {
                    var A = m;
                    m = g, g = A
                }
                for (var b = 0; b < this.heights.length - 1; b++) {
                    this.getLineSegment(d, f, b);
                    var E = r.getLineSegmentsIntersectionFraction(v, y, d, f);
                    if (E >= 0 && (r.sub(u, f, d), r.rotate(u, u, i + Math.PI / 2), r.normalize(u, u), e.reportIntersection(t, E, u, -1), t.shouldStop(e))) return
                }
            }
        }, {
            "../math/vec2": 30,
            "../utils/Utils": 57,
            "./Shape": 45
        }],
        42: [function(t, e, o) {
            function i(t) {
                "number" == typeof arguments[0] && (t = {
                    length: arguments[0]
                }, console.warn("The Line constructor signature has changed. Please use the following format: new Line({ length: 1, ... })")), t = t || {}, this.length = t.length || 1, t.type = n.LINE, n.call(this, t)
            }
            var n = t("./Shape"),
                r = t("../math/vec2");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeMomentOfInertia = function(t) {
                return t * Math.pow(this.length, 2) / 12
            }, i.prototype.updateBoundingRadius = function() {
                this.boundingRadius = this.length / 2
            };
            var a = [r.create(), r.create()];
            i.prototype.computeAABB = function(t, e, o) {
                var i = this.length / 2;
                r.set(a[0], -i, 0), r.set(a[1], i, 0), t.setFromPoints(a, e, o, 0)
            };
            var s = (r.create(), r.create()),
                c = r.create(),
                h = r.create(),
                l = r.fromValues(0, 1);
            i.prototype.raycast = function(t, e, o, i) {
                var n = e.from,
                    a = e.to,
                    p = c,
                    u = h,
                    d = this.length / 2;
                r.set(p, -d, 0), r.set(u, d, 0), r.toGlobalFrame(p, p, o, i), r.toGlobalFrame(u, u, o, i);
                var f = r.getLineSegmentsIntersectionFraction(p, u, n, a);
                if (f >= 0) {
                    var v = s;
                    r.rotate(v, l, i), e.reportIntersection(t, f, v, -1)
                }
            }
        }, {
            "../math/vec2": 30,
            "./Shape": 45
        }],
        43: [function(t, e, o) {
            function i(t) {
                t = t || {}, t.type = n.PARTICLE, n.call(this, t)
            }
            var n = t("./Shape"),
                r = t("../math/vec2");
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeMomentOfInertia = function(t) {
                return 0
            }, i.prototype.updateBoundingRadius = function() {
                this.boundingRadius = 0
            }, i.prototype.computeAABB = function(t, e, o) {
                r.copy(t.lowerBound, e), r.copy(t.upperBound, e)
            }
        }, {
            "../math/vec2": 30,
            "./Shape": 45
        }],
        44: [function(t, e, o) {
            function i(t) {
                t = t || {}, t.type = n.PLANE, n.call(this, t)
            }
            var n = t("./Shape"),
                r = t("../math/vec2");
            t("../utils/Utils"), e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.computeMomentOfInertia = function(t) {
                return 0
            }, i.prototype.updateBoundingRadius = function() {
                this.boundingRadius = Number.MAX_VALUE
            }, i.prototype.computeAABB = function(t, e, o) {
                var i = o % (2 * Math.PI),
                    n = r.set,
                    a = Number.MAX_VALUE,
                    s = t.lowerBound,
                    c = t.upperBound;
                0 === i ? (n(s, -a, -a), n(c, a, 0)) : i === Math.PI / 2 ? (n(s, 0, -a), n(c, a, a)) : i === Math.PI ? (n(s, -a, 0), n(c, a, a)) : i === 3 * Math.PI / 2 ? (n(s, -a, -a), n(c, 0, a)) : (n(s, -a, -a), n(c, a, a)), r.add(s, s, e), r.add(c, c, e)
            }, i.prototype.updateArea = function() {
                this.area = Number.MAX_VALUE
            };
            var a = r.create(),
                s = (r.create(), r.create(), r.create()),
                c = r.create();
            i.prototype.raycast = function(t, e, o, i) {
                var n = e.from,
                    h = e.to,
                    l = e.direction,
                    p = a,
                    u = s,
                    d = c;
                r.set(u, 0, 1), r.rotate(u, u, i), r.sub(d, n, o);
                var f = r.dot(d, u);
                r.sub(d, h, o);
                var v = r.dot(d, u);
                if (!(f * v > 0 || r.squaredDistance(n, h) < f * f)) {
                    var y = r.dot(u, l);
                    r.sub(p, n, o);
                    var m = -r.dot(u, p) / y / e.length;
                    e.reportIntersection(t, m, u, -1)
                }
            }
        }, {
            "../math/vec2": 30,
            "../utils/Utils": 57,
            "./Shape": 45
        }],
        45: [function(t, e, o) {
            function i(t) {
                t = t || {}, this.body = null, this.position = n.fromValues(0, 0), t.position && n.copy(this.position, t.position), this.angle = t.angle || 0, this.type = t.type || 0, this.id = i.idCounter++, this.boundingRadius = 0, this.collisionGroup = void 0 !== t.collisionGroup ? t.collisionGroup : 1, this.collisionResponse = void 0 !== t.collisionResponse ? t.collisionResponse : !0, this.collisionMask = void 0 !== t.collisionMask ? t.collisionMask : 1, this.material = t.material || null, this.area = 0, this.sensor = void 0 !== t.sensor ? t.sensor : !1, this.type && this.updateBoundingRadius(), this.updateArea()
            }
            e.exports = i;
            var n = t("../math/vec2");
            i.idCounter = 0, i.CIRCLE = 1, i.PARTICLE = 2, i.PLANE = 4, i.CONVEX = 8, i.LINE = 16, i.BOX = 32, Object.defineProperty(i, "RECTANGLE", {
                get: function() {
                    return console.warn("Shape.RECTANGLE is deprecated, use Shape.BOX instead."), i.BOX
                }
            }), i.CAPSULE = 64, i.HEIGHTFIELD = 128, i.prototype.computeMomentOfInertia = function(t) {}, i.prototype.updateBoundingRadius = function() {}, i.prototype.updateArea = function() {}, i.prototype.computeAABB = function(t, e, o) {}, i.prototype.raycast = function(t, e, o, i) {}
        }, {
            "../math/vec2": 30
        }],
        46: [function(t, e, o) {
            function i(t) {
                a.call(this, t, a.GS), t = t || {}, this.iterations = t.iterations || 10, this.tolerance = t.tolerance || 1e-7, this.arrayStep = 30, this.lambda = new s.ARRAY_TYPE(this.arrayStep), this.Bs = new s.ARRAY_TYPE(this.arrayStep), this.invCs = new s.ARRAY_TYPE(this.arrayStep), this.useZeroRHS = !1, this.frictionIterations = 0, this.usedIterations = 0
            }

            function n(t) {
                for (var e = t.length; e--;) t[e] = 0
            }
            var r = t("../math/vec2"),
                a = t("./Solver"),
                s = t("../utils/Utils"),
                c = t("../equations/FrictionEquation");
            e.exports = i, i.prototype = new a, i.prototype.constructor = i, i.prototype.solve = function(t, e) {
                this.sortEquations();
                var o = 0,
                    a = this.iterations,
                    h = this.frictionIterations,
                    l = this.equations,
                    p = l.length,
                    u = Math.pow(this.tolerance * p, 2),
                    d = e.bodies,
                    f = e.bodies.length,
                    v = (r.add, r.set, this.useZeroRHS),
                    y = this.lambda;
                if (this.usedIterations = 0, p)
                    for (var m = 0; m !== f; m++) {
                        var g = d[m];
                        g.updateSolveMassProperties()
                    }
                y.length < p && (y = this.lambda = new s.ARRAY_TYPE(p + this.arrayStep), this.Bs = new s.ARRAY_TYPE(p + this.arrayStep), this.invCs = new s.ARRAY_TYPE(p + this.arrayStep)), n(y);
                for (var A = this.invCs, b = this.Bs, y = this.lambda, m = 0; m !== l.length; m++) {
                    var E = l[m];
                    (E.timeStep !== t || E.needsUpdate) && (E.timeStep = t, E.update()), b[m] = E.computeB(E.a, E.b, t), A[m] = E.computeInvC(E.epsilon)
                }
                var E, B, m, q;
                if (0 !== p) {
                    for (m = 0; m !== f; m++) {
                        var g = d[m];
                        g.resetConstraintVelocity()
                    }
                    if (h) {
                        for (o = 0; o !== h; o++) {
                            for (B = 0, q = 0; q !== p; q++) {
                                E = l[q];
                                var P = i.iterateEquation(q, E, E.epsilon, b, A, y, v, t, o);
                                B += Math.abs(P)
                            }
                            if (this.usedIterations++, u >= B * B) break
                        }
                        for (i.updateMultipliers(l, y, 1 / t), q = 0; q !== p; q++) {
                            var w = l[q];
                            if (w instanceof c) {
                                for (var S = 0, C = 0; C !== w.contactEquations.length; C++) S += w.contactEquations[C].multiplier;
                                S *= w.frictionCoefficient / w.contactEquations.length, w.maxForce = S, w.minForce = -S
                            }
                        }
                    }
                    for (o = 0; o !== a; o++) {
                        for (B = 0, q = 0; q !== p; q++) {
                            E = l[q];
                            var P = i.iterateEquation(q, E, E.epsilon, b, A, y, v, t, o);
                            B += Math.abs(P)
                        }
                        if (this.usedIterations++, u >= B * B) break
                    }
                    for (m = 0; m !== f; m++) d[m].addConstraintVelocity();
                    i.updateMultipliers(l, y, 1 / t)
                }
            }, i.updateMultipliers = function(t, e, o) {
                for (var i = t.length; i--;) t[i].multiplier = e[i] * o
            }, i.iterateEquation = function(t, e, o, i, n, r, a, s, c) {
                var h = i[t],
                    l = n[t],
                    p = r[t],
                    u = e.computeGWlambda(),
                    d = e.maxForce,
                    f = e.minForce;
                a && (h = 0);
                var v = l * (h - u - o * p),
                    y = p + v;
                return f * s > y ? v = f * s - p : y > d * s && (v = d * s - p), r[t] += v, e.addToWlambda(v), v
            }
        }, {
            "../equations/FrictionEquation": 23,
            "../math/vec2": 30,
            "../utils/Utils": 57,
            "./Solver": 47
        }],
        47: [function(t, e, o) {
            function i(t, e) {
                t = t || {}, n.call(this), this.type = e, this.equations = [], this.equationSortFunction = t.equationSortFunction || !1
            }
            var n = (t("../utils/Utils"), t("../events/EventEmitter"));
            e.exports = i, i.prototype = new n, i.prototype.constructor = i, i.prototype.solve = function(t, e) {
                throw new Error("Solver.solve should be implemented by subclasses!")
            };
            var r = {
                bodies: []
            };
            i.prototype.solveIsland = function(t, e) {
                this.removeAllEquations(), e.equations.length && (this.addEquations(e.equations), r.bodies.length = 0, e.getBodies(r.bodies), r.bodies.length && this.solve(t, r))
            }, i.prototype.sortEquations = function() {
                this.equationSortFunction && this.equations.sort(this.equationSortFunction)
            }, i.prototype.addEquation = function(t) {
                t.enabled && this.equations.push(t)
            }, i.prototype.addEquations = function(t) {
                for (var e = 0, o = t.length; e !== o; e++) {
                    var i = t[e];
                    i.enabled && this.equations.push(i)
                }
            }, i.prototype.removeEquation = function(t) {
                var e = this.equations.indexOf(t); - 1 !== e && this.equations.splice(e, 1)
            }, i.prototype.removeAllEquations = function() {
                this.equations.length = 0
            }, i.GS = 1, i.ISLAND = 2
        }, {
            "../events/EventEmitter": 26,
            "../utils/Utils": 57
        }],
        48: [function(t, e, o) {
            function i() {
                r.apply(this, arguments)
            }
            var n = t("../equations/ContactEquation"),
                r = t("./Pool");
            e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.create = function() {
                return new n
            }, i.prototype.destroy = function(t) {
                return t.bodyA = t.bodyB = null, this
            }
        }, {
            "../equations/ContactEquation": 21,
            "./Pool": 55
        }],
        49: [function(t, e, o) {
            function i() {
                r.apply(this, arguments)
            }
            var n = t("../equations/FrictionEquation"),
                r = t("./Pool");
            e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.create = function() {
                return new n
            }, i.prototype.destroy = function(t) {
                return t.bodyA = t.bodyB = null, this
            }
        }, {
            "../equations/FrictionEquation": 23,
            "./Pool": 55
        }],
        50: [function(t, e, o) {
            function i() {
                r.apply(this, arguments)
            }
            var n = t("../world/IslandNode"),
                r = t("./Pool");
            e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.create = function() {
                return new n
            }, i.prototype.destroy = function(t) {
                return t.reset(), this
            }
        }, {
            "../world/IslandNode": 60,
            "./Pool": 55
        }],
        51: [function(t, e, o) {
            function i() {
                r.apply(this, arguments)
            }
            var n = t("../world/Island"),
                r = t("./Pool");
            e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.create = function() {
                return new n
            }, i.prototype.destroy = function(t) {
                return t.reset(), this
            }
        }, {
            "../world/Island": 58,
            "./Pool": 55
        }],
        52: [function(t, e, o) {
            function i() {
                this.overlappingShapesLastState = new n, this.overlappingShapesCurrentState = new n, this.recordPool = new r({
                    size: 16
                }), this.tmpDict = new n, this.tmpArray1 = []
            }
            var n = t("./TupleDictionary"),
                r = (t("./OverlapKeeperRecord"), t("./OverlapKeeperRecordPool"));
            t("./Utils"), e.exports = i, i.prototype.tick = function() {
                for (var t = this.overlappingShapesLastState, e = this.overlappingShapesCurrentState, o = t.keys.length; o--;) {
                    var i = t.keys[o],
                        n = t.getByKey(i);
                    e.getByKey(i), n && this.recordPool.release(n)
                }
                t.reset(), t.copy(e), e.reset()
            }, i.prototype.setOverlapping = function(t, e, o, i) {
                var n = (this.overlappingShapesLastState, this.overlappingShapesCurrentState);
                if (!n.get(e.id, i.id)) {
                    var r = this.recordPool.get();
                    r.set(t, e, o, i), n.set(e.id, i.id, r)
                }
            }, i.prototype.getNewOverlaps = function(t) {
                return this.getDiff(this.overlappingShapesLastState, this.overlappingShapesCurrentState, t)
            }, i.prototype.getEndOverlaps = function(t) {
                return this.getDiff(this.overlappingShapesCurrentState, this.overlappingShapesLastState, t)
            }, i.prototype.bodiesAreOverlapping = function(t, e) {
                for (var o = this.overlappingShapesCurrentState, i = o.keys.length; i--;) {
                    var n = o.keys[i],
                        r = o.data[n];
                    if (r.bodyA === t && r.bodyB === e || r.bodyA === e && r.bodyB === t) return !0
                }
                return !1
            }, i.prototype.getDiff = function(t, e, o) {
                var o = o || [],
                    i = t,
                    n = e;
                o.length = 0;
                for (var r = n.keys.length; r--;) {
                    var a = n.keys[r],
                        s = n.data[a];
                    if (!s) throw new Error("Key " + a + " had no data!");
                    var c = i.data[a];
                    c || o.push(s)
                }
                return o
            }, i.prototype.isNewOverlap = function(t, e) {
                var o = 0 | t.id,
                    i = 0 | e.id,
                    n = this.overlappingShapesLastState,
                    r = this.overlappingShapesCurrentState;
                return !n.get(o, i) && !!r.get(o, i)
            }, i.prototype.getNewBodyOverlaps = function(t) {
                this.tmpArray1.length = 0;
                var e = this.getNewOverlaps(this.tmpArray1);
                return this.getBodyDiff(e, t)
            }, i.prototype.getEndBodyOverlaps = function(t) {
                this.tmpArray1.length = 0;
                var e = this.getEndOverlaps(this.tmpArray1);
                return this.getBodyDiff(e, t)
            }, i.prototype.getBodyDiff = function(t, e) {
                e = e || [];
                for (var o = this.tmpDict, i = t.length; i--;) {
                    var n = t[i];
                    o.set(0 | n.bodyA.id, 0 | n.bodyB.id, n)
                }
                for (i = o.keys.length; i--;) {
                    var n = o.getByKey(o.keys[i]);
                    n && e.push(n.bodyA, n.bodyB)
                }
                return o.reset(), e
            }
        }, {
            "./OverlapKeeperRecord": 53,
            "./OverlapKeeperRecordPool": 54,
            "./TupleDictionary": 56,
            "./Utils": 57
        }],
        53: [function(t, e, o) {
            function i(t, e, o, i) {
                this.shapeA = e, this.shapeB = i, this.bodyA = t, this.bodyB = o
            }
            e.exports = i, i.prototype.set = function(t, e, o, n) {
                i.call(this, t, e, o, n)
            }
        }, {}],
        54: [function(t, e, o) {
            function i() {
                r.apply(this, arguments)
            }
            var n = t("./OverlapKeeperRecord"),
                r = t("./Pool");
            e.exports = i, i.prototype = new r, i.prototype.constructor = i, i.prototype.create = function() {
                return new n
            }, i.prototype.destroy = function(t) {
                return t.bodyA = t.bodyB = t.shapeA = t.shapeB = null, this
            }
        }, {
            "./OverlapKeeperRecord": 53,
            "./Pool": 55
        }],
        55: [function(t, e, o) {
            function i(t) {
                t = t || {}, this.objects = [], void 0 !== t.size && this.resize(t.size)
            }
            e.exports = i, i.prototype.resize = function(t) {
                for (var e = this.objects; e.length > t;) e.pop();
                for (; e.length < t;) e.push(this.create());
                return this
            }, i.prototype.get = function() {
                var t = this.objects;
                return t.length ? t.pop() : this.create()
            }, i.prototype.release = function(t) {
                return this.destroy(t), this.objects.push(t), this
            }
        }, {}],
        56: [function(t, e, o) {
            function i() {
                this.data = {}, this.keys = []
            }
            var n = t("./Utils");
            e.exports = i, i.prototype.getKey = function(t, e) {
                return t = 0 | t, e = 0 | e, (0 | t) === (0 | e) ? -1 : 0 | ((0 | t) > (0 | e) ? t << 16 | 65535 & e : e << 16 | 65535 & t)
            }, i.prototype.getByKey = function(t) {
                return t = 0 | t, this.data[t]
            }, i.prototype.get = function(t, e) {
                return this.data[this.getKey(t, e)]
            }, i.prototype.set = function(t, e, o) {
                if (!o) throw new Error("No data!");
                var i = this.getKey(t, e);
                return this.data[i] || this.keys.push(i), this.data[i] = o, i
            }, i.prototype.reset = function() {
                for (var t = this.data, e = this.keys, o = e.length; o--;) delete t[e[o]];
                e.length = 0
            }, i.prototype.copy = function(t) {
                this.reset(), n.appendArray(this.keys, t.keys);
                for (var e = t.keys.length; e--;) {
                    var o = t.keys[e];
                    this.data[o] = t.data[o]
                }
            }
        }, {
            "./Utils": 57
        }],
        57: [function(t, e, o) {
            function i() {}
            e.exports = i, i.appendArray = function(t, e) {
                if (e.length < 15e4) t.push.apply(t, e);
                else
                    for (var o = 0, i = e.length; o !== i; ++o) t.push(e[o])
            }, i.splice = function(t, e, o) {
                o = o || 1;
                for (var i = e, n = t.length - o; n > i; i++) t[i] = t[i + o];
                t.length = n
            }, "undefined" != typeof P2_ARRAY_TYPE ? i.ARRAY_TYPE = P2_ARRAY_TYPE : "undefined" != typeof Float32Array ? i.ARRAY_TYPE = Float32Array : i.ARRAY_TYPE = Array, i.extend = function(t, e) {
                for (var o in e) t[o] = e[o]
            }, i.defaults = function(t, e) {
                t = t || {};
                for (var o in e) o in t || (t[o] = e[o]);
                return t
            }
        }, {}],
        58: [function(t, e, o) {
            function i() {
                this.equations = [], this.bodies = []
            }
            var n = t("../objects/Body");
            e.exports = i, i.prototype.reset = function() {
                this.equations.length = this.bodies.length = 0
            };
            var r = [];
            i.prototype.getBodies = function(t) {
                var e = t || [],
                    o = this.equations;
                r.length = 0;
                for (var i = 0; i !== o.length; i++) {
                    var n = o[i]; - 1 === r.indexOf(n.bodyA.id) && (e.push(n.bodyA), r.push(n.bodyA.id)), -1 === r.indexOf(n.bodyB.id) && (e.push(n.bodyB), r.push(n.bodyB.id))
                }
                return e
            }, i.prototype.wantsToSleep = function() {
                for (var t = 0; t < this.bodies.length; t++) {
                    var e = this.bodies[t];
                    if (e.type === n.DYNAMIC && !e.wantsToSleep) return !1
                }
                return !0
            }, i.prototype.sleep = function() {
                for (var t = 0; t < this.bodies.length; t++) {
                    var e = this.bodies[t];
                    e.sleep()
                }
                return !0
            }
        }, {
            "../objects/Body": 31
        }],
        59: [function(t, e, o) {
            function i(t) {
                this.nodePool = new n({
                    size: 16
                }), this.islandPool = new r({
                    size: 8
                }), this.equations = [], this.islands = [], this.nodes = [], this.queue = []
            }
            var n = (t("../math/vec2"), t("./Island"), t("./IslandNode"), t("./../utils/IslandNodePool")),
                r = t("./../utils/IslandPool"),
                a = t("../objects/Body");
            e.exports = i, i.getUnvisitedNode = function(t) {
                for (var e = t.length, o = 0; o !== e; o++) {
                    var i = t[o];
                    if (!i.visited && i.body.type === a.DYNAMIC) return i
                }
                return !1
            }, i.prototype.visit = function(t, e, o) {
                e.push(t.body);
                for (var i = t.equations.length, n = 0; n !== i; n++) {
                    var r = t.equations[n]; - 1 === o.indexOf(r) && o.push(r)
                }
            }, i.prototype.bfs = function(t, e, o) {
                var n = this.queue;
                for (n.length = 0, n.push(t), t.visited = !0, this.visit(t, e, o); n.length;)
                    for (var r, s = n.pop(); r = i.getUnvisitedNode(s.neighbors);) r.visited = !0, this.visit(r, e, o), r.body.type === a.DYNAMIC && n.push(r)
            }, i.prototype.split = function(t) {
                for (var e = t.bodies, o = this.nodes, n = this.equations; o.length;) this.nodePool.release(o.pop());
                for (var r = 0; r !== e.length; r++) {
                    var a = this.nodePool.get();
                    a.body = e[r], o.push(a)
                }
                for (var s = 0; s !== n.length; s++) {
                    var c = n[s],
                        r = e.indexOf(c.bodyA),
                        h = e.indexOf(c.bodyB),
                        l = o[r],
                        p = o[h];
                    l.neighbors.push(p), p.neighbors.push(l), l.equations.push(c), p.equations.push(c)
                }
                for (var u = this.islands, r = 0; r < u.length; r++) this.islandPool.release(u[r]);
                u.length = 0;
                for (var d; d = i.getUnvisitedNode(o);) {
                    var f = this.islandPool.get();
                    this.bfs(d, f.bodies, f.equations), u.push(f)
                }
                return u
            }
        }, {
            "../math/vec2": 30,
            "../objects/Body": 31,
            "./../utils/IslandNodePool": 50,
            "./../utils/IslandPool": 51,
            "./Island": 58,
            "./IslandNode": 60
        }],
        60: [function(t, e, o) {
            function i(t) {
                this.body = t, this.neighbors = [], this.equations = [], this.visited = !1
            }
            e.exports = i, i.prototype.reset = function() {
                this.equations.length = 0, this.neighbors.length = 0, this.visited = !1, this.body = null
            }
        }, {}],
        61: [function(t, e, o) {
            function i(t) {
                p.apply(this), t = t || {}, this.springs = [], this.bodies = [], this.disabledBodyCollisionPairs = [], this.solver = t.solver || new n, this.narrowphase = new m(this), this.islandManager = new b, this.gravity = r.fromValues(0, -9.78), t.gravity && r.copy(this.gravity, t.gravity), this.frictionGravity = r.length(this.gravity) || 10, this.useWorldGravityAsFrictionGravity = !0, this.useFrictionGravityOnZeroGravity = !0, this.broadphase = t.broadphase || new y, this.broadphase.setWorld(this), this.constraints = [], this.defaultMaterial = new d, this.defaultContactMaterial = new f(this.defaultMaterial, this.defaultMaterial), this.lastTimeStep = 1 / 60, this.applySpringForces = !0, this.applyDamping = !0, this.applyGravity = !0, this.solveConstraints = !0, this.contactMaterials = [], this.time = 0, this.accumulator = 0, this.stepping = !1, this.bodiesToBeRemoved = [], this.islandSplit = "undefined" != typeof t.islandSplit ? !!t.islandSplit : !0, this.emitImpactEvent = !0, this._constraintIdCounter = 0, this._bodyIdCounter = 0, this.postStepEvent = {
                    type: "postStep"
                }, this.addBodyEvent = {
                    type: "addBody",
                    body: null
                }, this.removeBodyEvent = {
                    type: "removeBody",
                    body: null
                }, this.addSpringEvent = {
                    type: "addSpring",
                    spring: null
                }, this.impactEvent = {
                    type: "impact",
                    bodyA: null,
                    bodyB: null,
                    shapeA: null,
                    shapeB: null,
                    contactEquation: null
                }, this.postBroadphaseEvent = {
                    type: "postBroadphase",
                    pairs: null
                }, this.sleepMode = i.NO_SLEEPING, this.beginContactEvent = {
                    type: "beginContact",
                    shapeA: null,
                    shapeB: null,
                    bodyA: null,
                    bodyB: null,
                    contactEquations: []
                }, this.endContactEvent = {
                    type: "endContact",
                    shapeA: null,
                    shapeB: null,
                    bodyA: null,
                    bodyB: null
                }, this.preSolveEvent = {
                    type: "preSolve",
                    contactEquations: null,
                    frictionEquations: null
                }, this.overlappingShapesLastState = {
                    keys: []
                }, this.overlappingShapesCurrentState = {
                    keys: []
                }, this.overlapKeeper = new A
            }
            var n = t("../solver/GSSolver"),
                r = (t("../solver/Solver"), t("../collision/Ray"), t("../math/vec2")),
                a = t("../shapes/Circle"),
                s = t("../shapes/Convex"),
                c = (t("../shapes/Line"), t("../shapes/Plane")),
                h = t("../shapes/Capsule"),
                l = t("../shapes/Particle"),
                p = t("../events/EventEmitter"),
                u = t("../objects/Body"),
                d = (t("../shapes/Shape"), t("../objects/LinearSpring"), t("../material/Material")),
                f = t("../material/ContactMaterial"),
                v = (t("../constraints/DistanceConstraint"), t("../constraints/Constraint"), t("../constraints/LockConstraint"), t("../constraints/RevoluteConstraint"), t("../constraints/PrismaticConstraint"), t("../constraints/GearConstraint"), t("../../package.json"), t("../collision/Broadphase"), t("../collision/AABB")),
                y = t("../collision/SAPBroadphase"),
                m = t("../collision/Narrowphase"),
                g = t("../utils/Utils"),
                A = t("../utils/OverlapKeeper"),
                b = t("./IslandManager");
            t("../objects/RotationalSpring"), e.exports = i, i.prototype = new Object(p.prototype), i.prototype.constructor = i, i.NO_SLEEPING = 1, i.BODY_SLEEPING = 2, i.ISLAND_SLEEPING = 4, i.prototype.addConstraint = function(t) {
                this.constraints.push(t)
            }, i.prototype.addContactMaterial = function(t) {
                this.contactMaterials.push(t)
            }, i.prototype.removeContactMaterial = function(t) {
                var e = this.contactMaterials.indexOf(t); - 1 !== e && g.splice(this.contactMaterials, e, 1)
            }, i.prototype.getContactMaterial = function(t, e) {
                for (var o = this.contactMaterials, i = 0, n = o.length; i !== n; i++) {
                    var r = o[i];
                    if (r.materialA.id === t.id && r.materialB.id === e.id || r.materialA.id === e.id && r.materialB.id === t.id) return r
                }
                return !1
            }, i.prototype.removeConstraint = function(t) {
                var e = this.constraints.indexOf(t); - 1 !== e && g.splice(this.constraints, e, 1)
            };
            var E = (r.create(), r.create(), r.create(), r.create(), r.create(), r.create(), r.create()),
                B = r.fromValues(0, 0),
                q = r.fromValues(0, 0);
            r.fromValues(0, 0), r.fromValues(0, 0), i.prototype.step = function(t, e, o) {
                if (o = o || 10, e = e || 0, 0 === e) this.internalStep(t), this.time += t;
                else {
                    this.accumulator += e;
                    for (var i = 0; this.accumulator >= t && o > i;) this.internalStep(t), this.time += t, this.accumulator -= t, i++;
                    for (var n = this.accumulator % t / t, a = 0; a !== this.bodies.length; a++) {
                        var s = this.bodies[a];
                        r.lerp(s.interpolatedPosition, s.previousPosition, s.position, n), s.interpolatedAngle = s.previousAngle + n * (s.angle - s.previousAngle)
                    }
                }
            };
            var P = [];
            i.prototype.internalStep = function(t) {
                this.stepping = !0;
                var e = this.springs.length,
                    o = this.springs,
                    n = this.bodies,
                    a = this.gravity,
                    s = this.solver,
                    c = this.bodies.length,
                    h = this.broadphase,
                    l = this.narrowphase,
                    p = this.constraints,
                    d = E,
                    f = (r.scale, r.add),
                    v = (r.rotate, this.islandManager);
                if (this.overlapKeeper.tick(), this.lastTimeStep = t, this.useWorldGravityAsFrictionGravity) {
                    var y = r.length(this.gravity);
                    0 === y && this.useFrictionGravityOnZeroGravity || (this.frictionGravity = y)
                }
                if (this.applyGravity)
                    for (var m = 0; m !== c; m++) {
                        var A = n[m],
                            b = A.force;
                        A.type === u.DYNAMIC && A.sleepState !== u.SLEEPING && (r.scale(d, a, A.mass * A.gravityScale), f(b, b, d))
                    }
                if (this.applySpringForces)
                    for (var m = 0; m !== e; m++) {
                        var B = o[m];
                        B.applyForce()
                    }
                if (this.applyDamping)
                    for (var m = 0; m !== c; m++) {
                        var A = n[m];
                        A.type === u.DYNAMIC && A.applyDamping(t)
                    }
                for (var q = h.getCollisionPairs(this), w = this.disabledBodyCollisionPairs, m = w.length - 2; m >= 0; m -= 2)
                    for (var S = q.length - 2; S >= 0; S -= 2)(w[m] === q[S] && w[m + 1] === q[S + 1] || w[m + 1] === q[S] && w[m] === q[S + 1]) && q.splice(S, 2);
                var C = p.length;
                for (m = 0; m !== C; m++) {
                    var L = p[m];
                    if (!L.collideConnected)
                        for (var S = q.length - 2; S >= 0; S -= 2)(L.bodyA === q[S] && L.bodyB === q[S + 1] || L.bodyB === q[S] && L.bodyA === q[S + 1]) && q.splice(S, 2)
                }
                this.postBroadphaseEvent.pairs = q, this.emit(this.postBroadphaseEvent), this.postBroadphaseEvent.pairs = null, l.reset(this);
                for (var m = 0, x = q.length; m !== x; m += 2)
                    for (var F = q[m], M = q[m + 1], I = 0, R = F.shapes.length; I !== R; I++)
                        for (var V = F.shapes[I], T = V.position, N = V.angle, G = 0, O = M.shapes.length; G !== O; G++) {
                            var U = M.shapes[G],
                                k = U.position,
                                _ = U.angle,
                                D = this.defaultContactMaterial;
                            if (V.material && U.material) {
                                var W = this.getContactMaterial(V.material, U.material);
                                W && (D = W)
                            }
                            this.runNarrowphase(l, F, V, T, N, M, U, k, _, D, this.frictionGravity)
                        }
                for (var m = 0; m !== c; m++) {
                    var X = n[m];
                    X._wakeUpAfterNarrowphase && (X.wakeUp(), X._wakeUpAfterNarrowphase = !1)
                }
                if (this.has("endContact")) {
                    this.overlapKeeper.getEndOverlaps(P);
                    for (var j = this.endContactEvent, G = P.length; G--;) {
                        var z = P[G];
                        j.shapeA = z.shapeA, j.shapeB = z.shapeB, j.bodyA = z.bodyA, j.bodyB = z.bodyB, this.emit(j)
                    }
                    P.length = 0
                }
                var Y = this.preSolveEvent;
                Y.contactEquations = l.contactEquations, Y.frictionEquations = l.frictionEquations, this.emit(Y), Y.contactEquations = Y.frictionEquations = null;
                var C = p.length;
                for (m = 0; m !== C; m++) p[m].update();
                if (l.contactEquations.length || l.frictionEquations.length || C)
                    if (this.islandSplit) {
                        for (v.equations.length = 0, g.appendArray(v.equations, l.contactEquations), g.appendArray(v.equations, l.frictionEquations), m = 0; m !== C; m++) g.appendArray(v.equations, p[m].equations);
                        v.split(this);
                        for (var m = 0; m !== v.islands.length; m++) {
                            var K = v.islands[m];
                            K.equations.length && s.solveIsland(t, K)
                        }
                    } else {
                        for (s.addEquations(l.contactEquations), s.addEquations(l.frictionEquations), m = 0; m !== C; m++) s.addEquations(p[m].equations);
                        this.solveConstraints && s.solve(t, this), s.removeAllEquations()
                    }
                for (var m = 0; m !== c; m++) {
                    var X = n[m];
                    X.integrate(t)
                }
                for (var m = 0; m !== c; m++) n[m].setZeroForce();
                if (this.emitImpactEvent && this.has("impact"))
                    for (var H = this.impactEvent, m = 0; m !== l.contactEquations.length; m++) {
                        var Z = l.contactEquations[m];
                        Z.firstImpact && (H.bodyA = Z.bodyA, H.bodyB = Z.bodyB, H.shapeA = Z.shapeA, H.shapeB = Z.shapeB, H.contactEquation = Z, this.emit(H))
                    }
                if (this.sleepMode === i.BODY_SLEEPING)
                    for (m = 0; m !== c; m++) n[m].sleepTick(this.time, !1, t);
                else if (this.sleepMode === i.ISLAND_SLEEPING && this.islandSplit) {
                    for (m = 0; m !== c; m++) n[m].sleepTick(this.time, !0, t);
                    for (var m = 0; m < this.islandManager.islands.length; m++) {
                        var K = this.islandManager.islands[m];
                        K.wantsToSleep() && K.sleep()
                    }
                }
                this.stepping = !1;
                for (var J = this.bodiesToBeRemoved, m = 0; m !== J.length; m++) this.removeBody(J[m]);
                J.length = 0, this.emit(this.postStepEvent)
            }, i.prototype.runNarrowphase = function(t, e, o, i, n, a, s, c, h, l, p) {
                if (0 !== (o.collisionGroup & s.collisionMask) && 0 !== (s.collisionGroup & o.collisionMask)) {
                    r.rotate(B, i, e.angle), r.rotate(q, c, a.angle), r.add(B, B, e.position), r.add(q, q, a.position);
                    var d = n + e.angle,
                        f = h + a.angle;
                    t.enableFriction = l.friction > 0, t.frictionCoefficient = l.friction;
                    var v;
                    v = e.type === u.STATIC || e.type === u.KINEMATIC ? a.mass : a.type === u.STATIC || a.type === u.KINEMATIC ? e.mass : e.mass * a.mass / (e.mass + a.mass), t.slipForce = l.friction * p * v, t.restitution = l.restitution, t.surfaceVelocity = l.surfaceVelocity, t.frictionStiffness = l.frictionStiffness, t.frictionRelaxation = l.frictionRelaxation, t.stiffness = l.stiffness, t.relaxation = l.relaxation, t.contactSkinSize = l.contactSkinSize, t.enabledEquations = e.collisionResponse && a.collisionResponse && o.collisionResponse && s.collisionResponse;
                    var y = t[o.type | s.type],
                        m = 0;
                    if (y) {
                        var g = o.sensor || s.sensor,
                            A = t.frictionEquations.length;
                        m = o.type < s.type ? y.call(t, e, o, B, d, a, s, q, f, g) : y.call(t, a, s, q, f, e, o, B, d, g);
                        var b = t.frictionEquations.length - A;
                        if (m) {
                            if (e.allowSleep && e.type === u.DYNAMIC && e.sleepState === u.SLEEPING && a.sleepState === u.AWAKE && a.type !== u.STATIC) {
                                var E = r.squaredLength(a.velocity) + Math.pow(a.angularVelocity, 2),
                                    P = Math.pow(a.sleepSpeedLimit, 2);
                                E >= 2 * P && (e._wakeUpAfterNarrowphase = !0)
                            }
                            if (a.allowSleep && a.type === u.DYNAMIC && a.sleepState === u.SLEEPING && e.sleepState === u.AWAKE && e.type !== u.STATIC) {
                                var w = r.squaredLength(e.velocity) + Math.pow(e.angularVelocity, 2),
                                    S = Math.pow(e.sleepSpeedLimit, 2);
                                w >= 2 * S && (a._wakeUpAfterNarrowphase = !0)
                            }
                            if (this.overlapKeeper.setOverlapping(e, o, a, s), this.has("beginContact") && this.overlapKeeper.isNewOverlap(o, s)) {
                                var C = this.beginContactEvent;
                                if (C.shapeA = o, C.shapeB = s, C.bodyA = e, C.bodyB = a, C.contactEquations.length = 0, "number" == typeof m)
                                    for (var L = t.contactEquations.length - m; L < t.contactEquations.length; L++) C.contactEquations.push(t.contactEquations[L]);
                                this.emit(C)
                            }
                            if ("number" == typeof m && b > 1)
                                for (var L = t.frictionEquations.length - b; L < t.frictionEquations.length; L++) {
                                    var x = t.frictionEquations[L];
                                    x.setSlipForce(x.getSlipForce() / b)
                                }
                        }
                    }
                }
            }, i.prototype.addSpring = function(t) {
                this.springs.push(t);
                var e = this.addSpringEvent;
                e.spring = t, this.emit(e), e.spring = null
            }, i.prototype.removeSpring = function(t) {
                var e = this.springs.indexOf(t); - 1 !== e && g.splice(this.springs, e, 1)
            }, i.prototype.addBody = function(t) {
                if (-1 === this.bodies.indexOf(t)) {
                    this.bodies.push(t), t.world = this;
                    var e = this.addBodyEvent;
                    e.body = t, this.emit(e), e.body = null
                }
            }, i.prototype.removeBody = function(t) {
                if (this.stepping) this.bodiesToBeRemoved.push(t);
                else {
                    t.world = null;
                    var e = this.bodies.indexOf(t); - 1 !== e && (g.splice(this.bodies, e, 1), this.removeBodyEvent.body = t, t.resetConstraintVelocity(), this.emit(this.removeBodyEvent), this.removeBodyEvent.body = null)
                }
            }, i.prototype.getBodyById = function(t) {
                for (var e = this.bodies, o = 0; o < e.length; o++) {
                    var i = e[o];
                    if (i.id === t) return i
                }
                return !1
            }, i.prototype.disableBodyCollision = function(t, e) {
                this.disabledBodyCollisionPairs.push(t, e)
            }, i.prototype.enableBodyCollision = function(t, e) {
                for (var o = this.disabledBodyCollisionPairs, i = 0; i < o.length; i += 2)
                    if (o[i] === t && o[i + 1] === e || o[i + 1] === t && o[i] === e) return void o.splice(i, 2)
            }, i.prototype.clear = function() {
                this.time = 0, this.solver && this.solver.equations.length && this.solver.removeAllEquations();
                for (var t = this.constraints, e = t.length - 1; e >= 0; e--) this.removeConstraint(t[e]);
                for (var o = this.bodies, e = o.length - 1; e >= 0; e--) this.removeBody(o[e]);
                for (var n = this.springs, e = n.length - 1; e >= 0; e--) this.removeSpring(n[e]);
                for (var r = this.contactMaterials, e = r.length - 1; e >= 0; e--) this.removeContactMaterial(r[e]);
                i.apply(this)
            };
            var w = r.create(),
                S = (r.fromValues(0, 0), r.fromValues(0, 0));
            i.prototype.hitTest = function(t, e, o) {
                o = o || 0;
                var i = new u({
                        position: t
                    }),
                    n = new l,
                    p = t,
                    d = 0,
                    f = w,
                    v = S;
                i.addShape(n);
                for (var y = this.narrowphase, m = [], g = 0, A = e.length; g !== A; g++)
                    for (var b = e[g], E = 0, B = b.shapes.length; E !== B; E++) {
                        var q = b.shapes[E];
                        r.rotate(f, q.position, b.angle), r.add(f, f, b.position);
                        var P = q.angle + b.angle;
                        (q instanceof a && y.circleParticle(b, q, f, P, i, n, p, d, !0) || q instanceof s && y.particleConvex(i, n, p, d, b, q, f, P, !0) || q instanceof c && y.particlePlane(i, n, p, d, b, q, f, P, !0) || q instanceof h && y.particleCapsule(i, n, p, d, b, q, f, P, !0) || q instanceof l && r.squaredLength(r.sub(v, f, t)) < o * o) && m.push(b)
                    }
                return m
            }, i.prototype.setGlobalStiffness = function(t) {
                for (var e = this.constraints, o = 0; o !== e.length; o++)
                    for (var i = e[o], n = 0; n !== i.equations.length; n++) {
                        var r = i.equations[n];
                        r.stiffness = t, r.needsUpdate = !0
                    }
                for (var a = this.contactMaterials, o = 0; o !== a.length; o++) {
                    var i = a[o];
                    i.stiffness = i.frictionStiffness = t
                }
                var i = this.defaultContactMaterial;
                i.stiffness = i.frictionStiffness = t
            }, i.prototype.setGlobalRelaxation = function(t) {
                for (var e = 0; e !== this.constraints.length; e++)
                    for (var o = this.constraints[e], i = 0; i !== o.equations.length; i++) {
                        var n = o.equations[i];
                        n.relaxation = t, n.needsUpdate = !0
                    }
                for (var e = 0; e !== this.contactMaterials.length; e++) {
                    var o = this.contactMaterials[e];
                    o.relaxation = o.frictionRelaxation = t
                }
                var o = this.defaultContactMaterial;
                o.relaxation = o.frictionRelaxation = t
            };
            var C = new v,
                L = [];
            i.prototype.raycast = function(t, e) {
                return e.getAABB(C), this.broadphase.aabbQuery(this, C, L), e.intersectBodies(t, L), L.length = 0, t.hasHit()
            }
        }, {
            "../../package.json": 6,
            "../collision/AABB": 7,
            "../collision/Broadphase": 8,
            "../collision/Narrowphase": 10,
            "../collision/Ray": 11,
            "../collision/SAPBroadphase": 13,
            "../constraints/Constraint": 14,
            "../constraints/DistanceConstraint": 15,
            "../constraints/GearConstraint": 16,
            "../constraints/LockConstraint": 17,
            "../constraints/PrismaticConstraint": 18,
            "../constraints/RevoluteConstraint": 19,
            "../events/EventEmitter": 26,
            "../material/ContactMaterial": 27,
            "../material/Material": 28,
            "../math/vec2": 30,
            "../objects/Body": 31,
            "../objects/LinearSpring": 32,
            "../objects/RotationalSpring": 33,
            "../shapes/Capsule": 38,
            "../shapes/Circle": 39,
            "../shapes/Convex": 40,
            "../shapes/Line": 42,
            "../shapes/Particle": 43,
            "../shapes/Plane": 44,
            "../shapes/Shape": 45,
            "../solver/GSSolver": 46,
            "../solver/Solver": 47,
            "../utils/OverlapKeeper": 52,
            "../utils/Utils": 57,
            "./IslandManager": 59
        }]
    }, {}, [36])(36)
});