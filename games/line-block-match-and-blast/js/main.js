(function() {
		
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        c = "undefined" !== typeof module && module.exports,
        b = function() {
            for (var b, c = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "), "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], d = 0, f = c.length, q = {}; d < f; d++)
                if ((b = c[d]) && b[1] in a) {
                    for (d = 0; d < b.length; d++) q[c[0][d]] = b[d];
                    return q
                } return !1
        }(),
        d = {
            change: b.fullscreenchange,
            error: b.fullscreenerror
        },
        f = {
            request: function(c) {
                return new Promise(function(d, e) {
                    var g = function() {
                        this.off("change",
                            g);
                        d()
                    }.bind(this);
                    this.on("change", g);
                    c = c || a.documentElement;
                    Promise.resolve(c[b.requestFullscreen]())["catch"](e)
                }.bind(this))
            },
            exit: function() {
                return new Promise(function(c, d) {
                    if (this.isFullscreen) {
                        var e = function() {
                            this.off("change", e);
                            c()
                        }.bind(this);
                        this.on("change", e);
                        Promise.resolve(a[b.exitFullscreen]())["catch"](d)
                    } else c()
                }.bind(this))
            },
            toggle: function(a) {
                return this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function(a) {
                this.on("change", a)
            },
            onerror: function(a) {
                this.on("error", a)
            },
            on: function(b, c) {
                var e = d[b];
                e && a.addEventListener(e, c, !1)
            },
            off: function(b, c) {
                var e = d[b];
                e && a.removeEventListener(e, c, !1)
            },
            raw: b
        };
    b ? (Object.defineProperties(f, {
        isFullscreen: {
            get: function() {
                return !!a[b.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[b.fullscreenElement]
            }
        },
        isEnabled: {
            enumerable: !0,
            get: function() {
                return !!a[b.fullscreenEnabled]
            }
        }
    }), c ? module.exports = f : window.screenfull = f) : c ? module.exports = {
        isEnabled: !1
    } : window.screenfull = {
        isEnabled: !1
    }
})();
(function() {
    function a(a) {
        a = String(a);
        return a.charAt(0).toUpperCase() + a.slice(1)
    }

    function c(a, b) {
        var c = -1,
            e = a ? a.length : 0;
        if ("number" == typeof e && -1 < e && e <= m)
            for (; ++c < e;) b(a[c], c, a);
        else d(a, b)
    }

    function b(b) {
        b = String(b).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(b) ? b : a(b)
    }

    function d(a, b) {
        for (var c in a) n.call(a, c) && b(a[c], c, a)
    }

    function f(b) {
        return null == b ? a(b) : A.call(b).slice(8, -1)
    }

    function e(a, b) {
        var c = null != a ? typeof a[b] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(c) &&
            ("object" == c ? !!a[b] : !0)
    }

    function g(a) {
        return String(a).replace(/([ -])(?!$)/g, "$1?")
    }

    function k(a, b) {
        var d = null;
        c(a, function(c, e) {
            d = b(d, c, e, a)
        });
        return d
    }

    function l(a) {
        function c(c) {
            return k(c, function(c, d) {
                var e = d.pattern || g(d);
                !c && (c = RegExp("\\b" + e + " *\\d+[.\\w_]*", "i").exec(a) || RegExp("\\b" + e + " *\\w+-[\\w]*", "i").exec(a) || RegExp("\\b" + e + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(a)) && ((c = String(d.label && !RegExp(e, "i").test(d.label) ? d.label : c).split("/"))[1] && !/[\d.]+/.test(c[0]) && (c[0] +=
                    " " + c[1]), d = d.label || d, c = b(c[0].replace(RegExp(e, "i"), d).replace(RegExp("; *(?:" + d + "[_-])?", "i"), " ").replace(RegExp("(" + d + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return c
            })
        }

        function q(b) {
            return k(b, function(b, c) {
                return b || (RegExp(c + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(a) || 0)[1] || null
            })
        }
        var n = v,
            p = a && "object" == typeof a && "String" != f(a);
        p && (n = a, a = null);
        var u = n.navigator || {},
            m = u.userAgent || "";
        a || (a = m);
        var D = p ? !!u.likeChrome : /\bChrome\b/.test(a) && !/internal|\n/i.test(A.toString()),
            B = p ? "Object" : "ScriptBridgingProxyObject",
            N = p ? "Object" : "Environment",
            H = p && n.java ? "JavaPackage" : f(n.java),
            T = p ? "Object" : "RuntimeObject";
        N = (H = /\bJava/.test(H) && n.java) && f(n.environment) == N;
        var U = H ? "a" : "\u03b1",
            V = H ? "b" : "\u03b2",
            O = n.document || {},
            F = n.operamini || n.opera,
            J = w.test(J = p && F ? F["[[Class]]"] : f(F)) ? J : F = null,
            h, K = a;
        p = [];
        var L = null,
            G = a == m;
        m = G && F && "function" == typeof F.version && F.version();
        var y = function(b) {
                return k(b, function(b, c) {
                    return b || RegExp("\\b" + (c.pattern || g(c)) + "\\b", "i").exec(a) && (c.label ||
                        c)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            r = function(b) {
                return k(b, function(b, c) {
                    return b || RegExp("\\b" + (c.pattern || g(c)) + "\\b", "i").exec(a) && (c.label || c)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                    label: "Microsoft Edge",
                    pattern: "Edge"
                }, "Midori", "Nook Browser",
                "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                    label: "Samsung Internet",
                    pattern: "SamsungBrowser"
                }, "SeaMonkey", {
                    label: "Silk",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Sleipnir", "SlimBrowser", {
                    label: "SRWare Iron",
                    pattern: "Iron"
                }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                    label: "Opera Mini",
                    pattern: "OPiOS"
                }, "Opera", {
                    label: "Opera",
                    pattern: "OPR"
                }, "Chrome", {
                    label: "Chrome Mobile",
                    pattern: "(?:CriOS|CrMo)"
                }, {
                    label: "Firefox",
                    pattern: "(?:Firefox|Minefield)"
                }, {
                    label: "Firefox for iOS",
                    pattern: "FxiOS"
                },
                {
                    label: "IE",
                    pattern: "IEMobile"
                }, {
                    label: "IE",
                    pattern: "MSIE"
                }, "Safari"
            ]),
            z = c([{
                    label: "BlackBerry",
                    pattern: "BB10"
                }, "BlackBerry", {
                    label: "Galaxy S",
                    pattern: "GT-I9000"
                }, {
                    label: "Galaxy S2",
                    pattern: "GT-I9100"
                }, {
                    label: "Galaxy S3",
                    pattern: "GT-I9300"
                }, {
                    label: "Galaxy S4",
                    pattern: "GT-I9500"
                }, {
                    label: "Galaxy S5",
                    pattern: "SM-G900"
                }, {
                    label: "Galaxy S6",
                    pattern: "SM-G920"
                }, {
                    label: "Galaxy S6 Edge",
                    pattern: "SM-G925"
                }, {
                    label: "Galaxy S7",
                    pattern: "SM-G930"
                }, {
                    label: "Galaxy S7 Edge",
                    pattern: "SM-G935"
                }, "Google TV", "Lumia", "iPad",
                "iPod", "iPhone", "Kindle", {
                    label: "Kindle Fire",
                    pattern: "(?:Cloud9|Silk-Accelerated)"
                }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                    label: "Wii U",
                    pattern: "WiiU"
                }, "Wii", "Xbox One", {
                    label: "Xbox 360",
                    pattern: "Xbox"
                }, "Xoom"
            ]),
            C = function(b) {
                return k(b, function(b, c, d) {
                    return b || (c[z] || c[/^[a-z]+(?: +[a-z]+\b)*/i.exec(z)] || RegExp("\\b" + g(d) + "(?:\\b|\\w*\\d)", "i").exec(a)) && d
                })
            }({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                }
            }),
            t = function(c) {
                return k(c, function(c, d) {
                    var e = d.pattern || g(d);
                    if (!c && (c = RegExp("\\b" + e + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(a))) {
                        var f = c,
                            h = d.label || d,
                            k = {
                                "10.0": "10",
                                "6.4": "10 Technical Preview",
                                "6.3": "8.1",
                                "6.2": "8",
                                "6.1": "Server 2008 R2 / 7",
                                "6.0": "Server 2008 / Vista",
                                "5.2": "Server 2003 / XP 64-bit",
                                "5.1": "XP",
                                "5.01": "2000 SP1",
                                "5.0": "2000",
                                "4.0": "NT",
                                "4.90": "ME"
                            };
                        e && h && /^Win/i.test(f) && !/^Windows Phone /i.test(f) && (k = k[/[\d.]+$/.exec(f)]) && (f = "Windows " + k);
                        f = String(f);
                        e && h && (f = f.replace(RegExp(e, "i"), h));
                        c = f = b(f.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/,
                            " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return c
                })
            }(["Windows Phone", "Android", "CentOS", {
                    label: "Chrome OS",
                    pattern: "CrOS"
                }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac",
                "Windows 98;", "Windows "
            ]);
        y && (y = [y]);
        C && !z && (z = c([C]));
        if (h = /\bGoogle TV\b/.exec(z)) z = h[0];
        /\bSimulator\b/i.test(a) && (z = (z ? z + " " : "") + "Simulator");
        "Opera Mini" == r && /\bOPiOS\b/.test(a) && p.push("running in Turbo/Uncompressed mode");
        "IE" == r && /\blike iPhone OS\b/.test(a) ? (h = l(a.replace(/like iPhone OS/, "")), C = h.manufacturer, z = h.product) : /^iP/.test(z) ? (r || (r = "Safari"), t = "iOS" + ((h = / OS ([\d_]+)/i.exec(a)) ? " " + h[1].replace(/_/g, ".") : "")) : "Konqueror" != r || /buntu/i.test(t) ? C && "Google" != C && (/Chrome/.test(r) &&
            !/\bMobile Safari\b/i.test(a) || /\bVita\b/.test(z)) || /\bAndroid\b/.test(t) && /^Chrome/.test(r) && /\bVersion\//i.test(a) ? (r = "Android Browser", t = /\bAndroid\b/.test(t) ? t : "Android") : "Silk" == r ? (/\bMobi/i.test(a) || (t = "Android", p.unshift("desktop mode")), /Accelerated *= *true/i.test(a) && p.unshift("accelerated")) : "PaleMoon" == r && (h = /\bFirefox\/([\d.]+)\b/.exec(a)) ? p.push("identifying as Firefox " + h[1]) : "Firefox" == r && (h = /\b(Mobile|Tablet|TV)\b/i.exec(a)) ? (t || (t = "Firefox OS"), z || (z = h[1])) : !r || (h = !/\bMinefield\b/i.test(a) &&
            /\b(?:Firefox|Safari)\b/.exec(r)) ? (r && !z && /[\/,]|^[^(]+?\)/.test(a.slice(a.indexOf(h + "/") + 8)) && (r = null), (h = z || C || t) && (z || C || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(t)) && (r = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(t) ? t : h) + " Browser")) : "Electron" == r && (h = (/\bChrome\/([\d.]+)\b/.exec(a) || 0)[1]) && p.push("Chromium " + h) : t = "Kubuntu";
        m || (m = q(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", g(r), "(?:Firefox|Minefield|NetFront)"]));
        if (h = "iCab" == y && 3 < parseFloat(m) && "WebKit" || /\bOpera\b/.test(r) && (/\bOPR\b/.test(a) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(a) && !/^(?:Trident|EdgeHTML)$/.test(y) && "WebKit" || !y && /\bMSIE\b/i.test(a) && ("Mac OS" == t ? "Tasman" : "Trident") || "WebKit" == y && /\bPlayStation\b(?! Vita\b)/i.test(r) && "NetFront") y = [h];
        "IE" == r && (h = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(a) || 0)[1]) ? (r += " Mobile", t = "Windows Phone " + (/\+$/.test(h) ? h : h + ".x"), p.unshift("desktop mode")) : /\bWPDesktop\b/i.test(a) ? (r = "IE Mobile", t = "Windows Phone 8.x",
            p.unshift("desktop mode"), m || (m = (/\brv:([\d.]+)/.exec(a) || 0)[1])) : "IE" != r && "Trident" == y && (h = /\brv:([\d.]+)/.exec(a)) && (r && p.push("identifying as " + r + (m ? " " + m : "")), r = "IE", m = h[1]);
        if (G) {
            if (e(n, "global"))
                if (H && (h = H.lang.System, K = h.getProperty("os.arch"), t = t || h.getProperty("os.name") + " " + h.getProperty("os.version")), N) {
                    try {
                        m = n.require("ringo/engine").version.join("."), r = "RingoJS"
                    } catch (S) {
                        (h = n.system) && h.global.system == n.system && (r = "Narwhal", t || (t = h[0].os || null))
                    }
                    r || (r = "Rhino")
                } else "object" == typeof n.process &&
                    !n.process.browser && (h = n.process) && ("object" == typeof h.versions && ("string" == typeof h.versions.electron ? (p.push("Node " + h.versions.node), r = "Electron", m = h.versions.electron) : "string" == typeof h.versions.nw && (p.push("Chromium " + m, "Node " + h.versions.node), r = "NW.js", m = h.versions.nw)), r || (r = "Node.js", K = h.arch, t = h.platform, m = (m = /[\d.]+/.exec(h.version)) ? m[0] : null));
            else f(h = n.runtime) == B ? (r = "Adobe AIR", t = h.flash.system.Capabilities.os) : f(h = n.phantom) == T ? (r = "PhantomJS", m = (h = h.version || null) && h.major + "." + h.minor +
                "." + h.patch) : "number" == typeof O.documentMode && (h = /\bTrident\/(\d+)/i.exec(a)) ? (m = [m, O.documentMode], (h = +h[1] + 4) != m[1] && (p.push("IE " + m[1] + " mode"), y && (y[1] = ""), m[1] = h), m = "IE" == r ? String(m[1].toFixed(1)) : m[0]) : "number" == typeof O.documentMode && /^(?:Chrome|Firefox)\b/.test(r) && (p.push("masking as " + r + " " + m), r = "IE", m = "11.0", y = ["Trident"], t = "Windows");
            t = t && b(t)
        }
        m && (h = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(m) || /(?:alpha|beta)(?: ?\d)?/i.exec(a + ";" + (G && u.appMinorVersion)) || /\bMinefield\b/i.test(a) &&
            "a") && (L = /b/i.test(h) ? "beta" : "alpha", m = m.replace(RegExp(h + "\\+?$"), "") + ("beta" == L ? V : U) + (/\d+\+?/.exec(h) || ""));
        if ("Fennec" == r || "Firefox" == r && /\b(?:Android|Firefox OS)\b/.test(t)) r = "Firefox Mobile";
        else if ("Maxthon" == r && m) m = m.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(z)) "Xbox 360" == z && (t = null), "Xbox 360" == z && /\bIEMobile\b/.test(a) && p.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(r) && (!r || z || /Browser|Mobi/.test(r)) || "Windows CE" != t && !/Mobi/i.test(a))
            if ("IE" == r && G) try {
                null === n.external &&
                    p.unshift("platform preview")
            } catch (S) {
                p.unshift("embedded")
            } else(/\bBlackBerry\b/.test(z) || /\bBB10\b/.test(a)) && (h = (RegExp(z.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(a) || 0)[1] || m) ? (h = [h, /BB10/.test(a)], t = (h[1] ? (z = null, C = "BlackBerry") : "Device Software") + " " + h[0], m = null) : this != d && "Wii" != z && (G && F || /Opera/.test(r) && /\b(?:MSIE|Firefox)\b/i.test(a) || "Firefox" == r && /\bOS X (?:\d+\.){2,}/.test(t) || "IE" == r && (t && !/^Win/.test(t) && 5.5 < m || /\bWindows XP\b/.test(t) && 8 < m || 8 == m && !/\bTrident\b/.test(a))) && !w.test(h =
                l.call(d, a.replace(w, "") + ";")) && h.name && (h = "ing as " + h.name + ((h = h.version) ? " " + h : ""), w.test(r) ? (/\bIE\b/.test(h) && "Mac OS" == t && (t = null), h = "identify" + h) : (h = "mask" + h, r = J ? b(J.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(h) && (t = null), G || (m = null)), y = ["Presto"], p.push(h));
            else r += " Mobile";
        if (h = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(a) || 0)[1]) {
            h = [parseFloat(h.replace(/\.(\d)$/, ".0$1")), h];
            if ("Safari" == r && "+" == h[1].slice(-1)) r = "WebKit Nightly", L = "alpha", m = h[1].slice(0, -1);
            else if (m == h[1] || m == (h[2] =
                    (/\bSafari\/([\d.]+\+?)/i.exec(a) || 0)[1])) m = null;
            h[1] = (/\bChrome\/([\d.]+)/i.exec(a) || 0)[1];
            537.36 == h[0] && 537.36 == h[2] && 28 <= parseFloat(h[1]) && "WebKit" == y && (y = ["Blink"]);
            G && (D || h[1]) ? (y && (y[1] = "like Chrome"), h = h[1] || (h = h[0], 530 > h ? 1 : 532 > h ? 2 : 532.05 > h ? 3 : 533 > h ? 4 : 534.03 > h ? 5 : 534.07 > h ? 6 : 534.1 > h ? 7 : 534.13 > h ? 8 : 534.16 > h ? 9 : 534.24 > h ? 10 : 534.3 > h ? 11 : 535.01 > h ? 12 : 535.02 > h ? "13+" : 535.07 > h ? 15 : 535.11 > h ? 16 : 535.19 > h ? 17 : 536.05 > h ? 18 : 536.1 > h ? 19 : 537.01 > h ? 20 : 537.11 > h ? "21+" : 537.13 > h ? 23 : 537.18 > h ? 24 : 537.24 > h ? 25 : 537.36 > h ? 26 : "Blink" !=
                y ? "27" : "28")) : (y && (y[1] = "like Safari"), h = (h = h[0], 400 > h ? 1 : 500 > h ? 2 : 526 > h ? 3 : 533 > h ? 4 : 534 > h ? "4+" : 535 > h ? 5 : 537 > h ? 6 : 538 > h ? 7 : 601 > h ? 8 : "8"));
            y && (y[1] += " " + (h += "number" == typeof h ? ".x" : /[.+]/.test(h) ? "" : "+"));
            "Safari" == r && (!m || 45 < parseInt(m)) && (m = h)
        }
        "Opera" == r && (h = /\bzbov|zvav$/.exec(t)) ? (r += " ", p.unshift("desktop mode"), "zvav" == h ? (r += "Mini", m = null) : r += "Mobile", t = t.replace(RegExp(" *" + h + "$"), "")) : "Safari" == r && /\bChrome\b/.exec(y && y[1]) && (p.unshift("desktop mode"), r = "Chrome Mobile", m = null, /\bOS X\b/.test(t) ? (C =
            "Apple", t = "iOS 4.3+") : t = null);
        m && 0 == m.indexOf(h = /[\d.]+$/.exec(t)) && -1 < a.indexOf("/" + h + "-") && (t = String(t.replace(h, "")).replace(/^ +| +$/g, ""));
        y && !/\b(?:Avant|Nook)\b/.test(r) && (/Browser|Lunascape|Maxthon/.test(r) || "Safari" != r && /^iOS/.test(t) && /\bSafari\b/.test(y[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(r) && y[1]) && (h = y[y.length - 1]) && p.push(h);
        p.length && (p = ["(" + p.join("; ") + ")"]);
        C && z && 0 > z.indexOf(C) && p.push("on " + C);
        z && p.push((/^on /.test(p[p.length -
            1]) ? "" : "on ") + z);
        if (t) {
            var R = (h = / ([\d.+]+)$/.exec(t)) && "/" == t.charAt(t.length - h[0].length - 1);
            t = {
                architecture: 32,
                family: h && !R ? t.replace(h[0], "") : t,
                version: h ? h[1] : null,
                toString: function() {
                    var a = this.version;
                    return this.family + (a && !R ? " " + a : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(h = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(K)) && !/\bi686\b/i.test(K) ? (t && (t.architecture = 64, t.family = t.family.replace(RegExp(" *" + h), "")), r && (/\bWOW64\b/i.test(a) || G && /\w(?:86|32)$/.test(u.cpuClass || u.platform) && !/\bWin64; x64\b/i.test(a)) &&
            p.unshift("32-bit")) : t && /^OS X/.test(t.family) && "Chrome" == r && 39 <= parseFloat(m) && (t.architecture = 64);
        a || (a = null);
        n = {};
        n.description = a;
        n.layout = y && y[0];
        n.manufacturer = C;
        n.name = r;
        n.prerelease = L;
        n.product = z;
        n.ua = a;
        n.version = r && m;
        n.os = t || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        n.parse = l;
        n.toString = function() {
            return this.description || ""
        };
        n.version && p.unshift(m);
        n.name && p.unshift(r);
        t && r && (t != String(t).split(" ")[0] || t != r.split(" ")[0] && !z) && p.push(z ? "(" + t + ")" : "on " +
            t);
        p.length && (n.description = p.join(" "));
        return n
    }
    var q = {
            "function": !0,
            object: !0
        },
        v = q[typeof window] && window || this,
        u = q[typeof exports] && exports;
    q = q[typeof module] && module && !module.nodeType && module;
    var p = u && q && "object" == typeof global && global;
    !p || p.global !== p && p.window !== p && p.self !== p || (v = p);
    var m = Math.pow(2, 53) - 1,
        w = /\bOpera/;
    p = Object.prototype;
    var n = p.hasOwnProperty,
        A = p.toString,
        B = l();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (v.platform = B, define(function() {
            return B
        })) : u &&
        q ? d(B, function(a, b) {
            u[b] = a
        }) : v.platform = B
}).call(this);
var s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX, s_iOffsetY;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent ||
    navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function NotImplementedError(a) {
    this.name = "NotImplementedError";
    this.message = a || ""
}
NotImplementedError.prototype = Error.prototype;

function error(a) {
    throw {
        name: "NotImplementedError",
        message: a
    };
}

function trace(a) {
    console.log(a)
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    sizeHandler()
}

function ifArrayContainsValue(a, c) {
    for (var b = 0; b < a.length; b++)
        if (a[b] === c) return !0;
    return !1
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        d = b.documentElement;
    if (void 0 === window["inner" + a]) a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var f = b.createElement("body");
        f.id = "vpw-test-b";
        f.style.cssText = "overflow:scroll";
        var e = b.createElement("div");
        e.id = "vpw-test-d";
        e.style.cssText = "position:absolute;top:-1000px";
        e.innerHTML = "<style>@media(" + c + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        f.appendChild(e);
        d.insertBefore(f, b.head);
        a = 7 == e["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(f)
    } else a = window["inner" + a];
    return a
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width");
        _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH);
        s_iScaleFactor = b;
        var d = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var f = a - b;
            b += f;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * f
        } else d < c && (f = c - d, d += f, b += CANVAS_HEIGHT / CANVAS_WIDTH * f);
        f = a / 2 - b / 2;
        var e = c / 2 - d / 2,
            g = CANVAS_WIDTH / d;
        if (e * g < -EDGEBOARD_X || f * g < -EDGEBOARD_Y) b =
            Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), d = Math.round(CANVAS_WIDTH * b), b = Math.round(CANVAS_HEIGHT * b), f = (a - b) / 2, e = (c - d) / 2, g = CANVAS_WIDTH / d;
        s_iOffsetX = Math.floor(-1 * e * g);
        s_iOffsetY = Math.floor(-1 * f * g);
        0 <= f && (s_iOffsetY = 0);
        0 <= e && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = Math.floor(2 * d),
            s_oStage.canvas.height = Math.floor(2 * b), canvas.style.width = Math.floor(d) + "px", canvas.style.height = Math.floor(b) + "px", s_oStage.scaleX = s_oStage.scaleY = 2 * Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT)) : s_bMobile ? ($("#canvas").css("width", d + "px"), $("#canvas").css("height", b + "px")) : (s_oStage.canvas.width = Math.floor(d), s_oStage.canvas.height = Math.floor(b), s_iScaleFactor = Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > f || (f = (a - b) / 2);
        $("#canvas").css("top", f + "px");
        $("#canvas").css("left",
            e + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    for (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone") && (s_bIsIphone = !0); a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function getMobileOperatingSystem() {
    var a = navigator.userAgent || navigator.vendor || window.opera;
    return a.match(/iPad/i) || a.match(/iPhone/i) || a.match(/iPod/i) ? "ios" : a.match(/Android/i) ? "android" : "unknown"
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(c), s_aSounds[a].loop(b), s_aSounds[a]) : null
}

function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(c)
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[c].mute(a)
}

function soundPlaying(a) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) return s_aSounds[a].playing()
}

function createBitmap(a, c, b) {
    var d = new createjs.Bitmap(a),
        f = new createjs.Shape;
    c && b ? f.graphics.beginFill("#fff").drawRect(0, 0, c, b) : f.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = f;
    return d
}

function createSprite(a, c, b, d, f, e) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -d, f, e);
    a.hitArea = c;
    return a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function shuffle(a) {
    for (var c = a.length, b, d; 0 !== c;) d = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[d], a[d] = b;
    return a
}

function easeLinear(a, c, b, d) {
    return b * a / d + c
}

function easeInQuad(a, c, b, d) {
    return b * (a /= d) * a + c
}

function easeInSine(a, c, b, d) {
    return -b * Math.cos(a / d * (Math.PI / 2)) + b + c
}

function easeInCubic(a, c, b, d) {
    return b * (a /= d) * a * a + c
}

function getTrajectoryPoint(a, c) {
    var b = new createjs.Point,
        d = (1 - a) * (1 - a),
        f = a * a;
    b.x = d * c.start.x + 2 * (1 - a) * a * c.traj.x + f * c.end.x;
    b.y = d * c.start.y + 2 * (1 - a) * a * c.traj.y + f * c.end.y;
    return b
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = parseFloat(a - 60 * c).toFixed(0);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function degreesToRadians(a) {
    return a * Math.PI / 180
}

function collideEdgeWithCircle(a, c, b) {
    if (null === a) return !1;
    a = closestPointOnLine(a.getPointA(), a.getPointB(), c);
    c = distanceV2(c, a);
    return b < c ? null : {
        distance: c,
        closest_point: a
    }
}

function getAngleBetweenPoints(a, c, b, d) {
    return 180 * Math.atan2(d - c, b - a) / Math.PI
}

function randomSign() {
    return .5 >= Math.random() ? 1 : -1
}

function distance(a, c) {
    var b = a.x - c.x,
        d = a.y - c.y;
    return Math.sqrt(b * b + d * d)
}

function closestPointOnLine(a, c, b) {
    var d = new CVector2;
    d.setV(b);
    d.subtract(a);
    b = new CVector2;
    b.setV(c);
    b.subtract(a);
    b.normalize();
    d = dotProductV2(b, d);
    if (0 >= d) return a;
    if (d >= distanceV2(a, c)) return c;
    b.scalarProduct(d);
    b.addV(a);
    return b
}

function checkRectCollision(a, c) {
    var b = getBounds(a, .9);
    var d = getBounds(c, .98);
    return calculateIntersection(b, d)
}

function calculateIntersection(a, c) {
    var b, d, f, e;
    var g = a.x + (b = a.width / 2);
    var k = a.y + (d = a.height / 2);
    var l = c.x + (f = c.width / 2);
    var q = c.y + (e = c.height / 2);
    g = Math.abs(g - l) - (b + f);
    k = Math.abs(k - q) - (d + e);
    return 0 > g && 0 > k ? (g = Math.min(Math.min(a.width, c.width), -g), k = Math.min(Math.min(a.height, c.height), -k), {
        x: Math.max(a.x, c.x),
        y: Math.max(a.y, c.y),
        width: g,
        height: k,
        rect1: a,
        rect2: c
    }) : null
}

function centerBetweenPointsV2(a, c) {
    var b = new CVector2;
    b.set(.5 * (a.getX() + c.getX()), .5 * (a.getY() + c.getY()));
    return b
}

function dotProductV2(a, c) {
    return a.getX() * c.getX() + a.getY() * c.getY()
}

function distanceV2WithoutSquareRoot(a, c) {
    return (c.getX() - a.getX()) * (c.getX() - a.getX()) + (c.getY() - a.getY()) * (c.getY() - a.getY())
}

function distanceV2(a, c) {
    return Math.sqrt((c.getX() - a.getX()) * (c.getX() - a.getX()) + (c.getY() - a.getY()) * (c.getY() - a.getY()))
}

function reflectVectorV2(a, c) {
    var b = dotProductV2(a, c);
    a.set(a.getX() - 2 * b * c.getX(), a.getY() - 2 * b * c.getY());
    return a
}

function getBounds(a, c) {
    var b = {
        x: Infinity,
        y: Infinity,
        width: 0,
        height: 0
    };
    if (a instanceof createjs.Container) {
        b.x2 = -Infinity;
        b.y2 = -Infinity;
        var d = a.children,
            f = d.length,
            e;
        for (e = 0; e < f; e++) {
            var g = getBounds(d[e], 1);
            g.x < b.x && (b.x = g.x);
            g.y < b.y && (b.y = g.y);
            g.x + g.width > b.x2 && (b.x2 = g.x + g.width);
            g.y + g.height > b.y2 && (b.y2 = g.y + g.height)
        }
        Infinity == b.x && (b.x = 0);
        Infinity == b.y && (b.y = 0);
        Infinity == b.x2 && (b.x2 = 0);
        Infinity == b.y2 && (b.y2 = 0);
        b.width = b.x2 - b.x;
        b.height = b.y2 - b.y;
        delete b.x2;
        delete b.y2
    } else {
        if (a instanceof createjs.Bitmap) {
            f =
                a.sourceRect || a.image;
            e = f.width * c;
            var k = f.height * c
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                f = a.spriteSheet.getFrame(a.currentFrame);
                e = f.rect.width;
                k = f.rect.height;
                d = f.regX;
                var l = f.regY
            } else b.x = a.x || 0, b.y = a.y || 0;
        else b.x = a.x || 0, b.y = a.y || 0;
        d = d || 0;
        e = e || 0;
        l = l || 0;
        k = k || 0;
        b.regX = d;
        b.regY = l;
        f = a.localToGlobal(0 - d, 0 - l);
        g = a.localToGlobal(e - d, k - l);
        e = a.localToGlobal(e - d, 0 - l);
        d = a.localToGlobal(0 - d, k - l);
        b.x =
            Math.min(Math.min(Math.min(f.x, g.x), e.x), d.x);
        b.y = Math.min(Math.min(Math.min(f.y, g.y), e.y), d.y);
        b.width = Math.max(Math.max(Math.max(f.x, g.x), e.x), d.x) - b.x;
        b.height = Math.max(Math.max(Math.max(f.y, g.y), e.y), d.y) - b.y
    }
    return b
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}
NoClickDelay.prototype = {
    handleEvent: function(a) {
        switch (a.type) {
            case "touchstart":
                this.onTouchStart(a);
                break;
            case "touchmove":
                this.onTouchMove(a);
                break;
            case "touchend":
                this.onTouchEnd(a)
        }
    },
    onTouchStart: function(a) {
        a.preventDefault();
        this.moved = !1;
        this.element.addEventListener("touchmove", this, !1);
        this.element.addEventListener("touchend", this, !1)
    },
    onTouchMove: function(a) {
        this.moved = !0
    },
    onTouchEnd: function(a) {
        this.element.removeEventListener("touchmove", this, !1);
        this.element.removeEventListener("touchend",
            this, !1);
        if (!this.moved) {
            a = document.elementFromPoint(a.changedTouches[0].clientX, a.changedTouches[0].clientY);
            3 == a.nodeType && (a = a.parentNode);
            var c = document.createEvent("MouseEvents");
            c.initEvent("click", !0, !0);
            a.dispatchEvent(c)
        }
    }
};
(function() {
    function a(a) {
        var b = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        a = a || window.event;
        a.type in b ? document.body.className = b[a.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden") in
        document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function toDegree(a) {
    return 180 / Math.PI * a
}

function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var d = c[b].split("=");
        if (d[0] == a) return d[1]
    }
}

function saveItem(a, c) {
    s_bStorageAvailable && localStorage.setItem(a, c)
}

function getItem(a) {
    return s_bStorageAvailable ? localStorage.getItem(a) : null
}

function setItemJson(a, c) {
    s_bStorageAvailable && localStorage.setItem(a, JSON.stringify(c))
}

function getItemJson(a) {
    return s_bStorageAvailable ? JSON.parse(localStorage.getItem(a)) : null
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function CSpriteLibrary() {
    var a = {},
        c, b, d, f, e, g;
    this.init = function(a, l, q) {
        c = {};
        d = b = 0;
        f = a;
        e = l;
        g = q
    };
    this.addSprite = function(d, e) {
        if (!a.hasOwnProperty(d)) {
            var f = new Image;
            a[d] = c[d] = {
                szPath: e,
                oSprite: f,
                bLoaded: !1
            };
            b++
        }
    };
    this.getSprite = function(b) {
        return a.hasOwnProperty(b) ? a[b].oSprite : null
    };
    this._onSpritesLoaded = function() {
        b = 0;
        e.call(g)
    };
    this._onSpriteLoaded = function() {
        f.call(g);
        ++d === b && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var a in c) c[a].oSprite.oSpriteLibrary = this, c[a].oSprite.szKey =
            a, c[a].oSprite.onload = function() {
                this.oSpriteLibrary.setLoaded(this.szKey);
                this.oSpriteLibrary._onSpriteLoaded(this.szKey)
            }, c[a].oSprite.onerror = function(a) {
                var b = a.currentTarget;
                setTimeout(function() {
                    c[b.szKey].oSprite.src = c[b.szKey].szPath
                }, 500)
            }, c[a].oSprite.src = c[a].szPath
    };
    this.setLoaded = function(b) {
        a[b].bLoaded = !0
    };
    this.isLoaded = function(b) {
        return a[b].bLoaded
    };
    this.getNumSprites = function() {
        return b
    }
}
var CANVAS_WIDTH = 768,
    CANVAS_HEIGHT = 1400,
    CANVAS_WIDTH_HALF = .5 * CANVAS_WIDTH,
    CANVAS_HEIGHT_HALF = .5 * CANVAS_HEIGHT,
    EDGEBOARD_X = 0,
    EDGEBOARD_Y = 200,
    FPS = 30,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    PRIMARY_FONT = "comfortaa",
    PRIMARY_FONT_COLOUR = "#ffffff",
    SECONDARY_FONT_COLOUR = "#000000",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 2,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    MATRIX_OFFSET_X = 160,
    MATRIX_OFFSET_Y = 800,
    SQUARE_LINE_NUMBER = 5,
    SQUARE_LINES_MINIMUM = 10,
    SQUARE_SIZE = 100,
    SQUARE_OFFSET =
    15,
    SQUARE_SCALE_VAR = 1.1,
    PLAYER_SQUARE_HORIZONTAL_SPEED = 150,
    PLAYER_SQUARE_VERTICAL_SPEED = 250,
    PLAYER_START_COLUMN = 2,
    START_PLAYER_VALUE = 0,
    COLOUR_CHANGE_OCCURRANCE, GAMEOVER_LIMIT = -50,
    GAMEOVER_LINE_DIFFERENCE = -180,
    PLAYER_SQUARE_ANIMATION_LOOPS = 5,
    PLAYER_BOTTOM_LIMIT = -850,
    MOTIVATIONAL_TEXT_SPEED = 1300,
    MOTIVATIONAL_TEXT_WAIT_TIME = 800,
    MOTIVATIONAL_TEXT_PULSE_TIME = 200,
    MOTIVATIONAL_TIMER_LIMIT = 600,
    MATRIX_VERTICAL_SPEED, MATRIX_SPEED_VARIABLE, MAX_MATRIX_SPEED_LIMIT, ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, SOUNDTRACK_VOLUME_IN_GAME =
    .3;

function CTweenController() {
    this.tweenValue = function(a, c, b) {
        return a + b * (c - a)
    };
    this.easeLinear = function(a, c, b, d) {
        return b * a / d + c
    };
    this.easeInCubic = function(a, c, b, d) {
        d = (a /= d) * a * a;
        return c + b * d
    };
    this.easeBackInQuart = function(a, c, b, d) {
        d = (a /= d) * a;
        return c + b * (2 * d * d + 2 * d * a + -3 * d)
    };
    this.easeInBack = function(a, c, b, d) {
        return b * (a /= d) * a * (2.70158 * a - 1.70158) + c
    };
    this.easeOutCubic = function(a, c, b, d) {
        return b * ((a = a / d - 1) * a * a + 1) + c
    };
    this.getTrajectoryPoint = function(a, c) {
        var b = new createjs.Point,
            d = (1 - a) * (1 - a),
            f = a * a;
        b.x = d *
            c.start.x + 2 * (1 - a) * a * c.traj.x + f * c.end.x;
        b.y = d * c.start.y + 2 * (1 - a) * a * c.traj.y + f * c.end.y;
        return b
    };
    s_oTweenController = this
}
var TEXT_HELP1 = "Tap on same color block",
    TEXT_HELP2 = "Match same color block in row",
    TEXT_HELP3 = "Watch out red line in top",
    TEXT_BEST_SCORE = "Top Score",
    TEXT_SCORE = "Points",
    TEXT_GAMEOVER = "GAME OVER!",
    TEXT_ARE_SURE = "EXIT GAME \nAre you sure ?",
    TEXT_MOTIVATIONAL_1 = "Superb!",
    TEXT_MOTIVATIONAL_2 = "Nice!",
    TEXT_MOTIVATIONAL_3 = "Yoyo!",
    TEXT_MOTIVATIONAL_4 = "Booyah!",
    TEXT_MOTIVATIONAL_5 = "Yeah!",
    TEXT_MOTIVATIONAL_6 =
    "INCREDIBLE!",
    TEXT_MOTIVATIONAL_7 = "Fire!",
    TEXT_MOTIVATIONAL_8 = "Hulk!",
    TEXT_MOTIVATIONAL_9 = "Super boom!",
    TEXT_PRELOADER_CONTINUE = "START",
    TEXT_CREDITS_DEVELOPED = "",
    TEXT_ERR_LS = "YOUR WEB BROWSER DOES NOT SUPPORT STORING SETTING LOCALLY. IN SAFARI, THE MOST COMMON CAUSE OF THIS IS USING 'PRIVATE BROWSING MODE'. SOME INFO MAY NOT SAVE OR SOME FEATURE MAY NOT WORK PROPERLY.",
    TEXT_SHARE_IMAGE = "200x200.jpg",
    TEXT_SHARE_TITLE = "You are amazing!",
    TEXT_SHARE_MSG1 = "You collected <strong>",
    TEXT_SHARE_MSG2 =
    " points</strong>!<br><br>Share your score with your friends!",
    TEXT_SHARE_SHARE1 = "My score is ",
    TEXT_SHARE_SHARE2 = " points! Can you do better";

function CPreloader() {
    var a, c, b, d, f, e, g, k, l;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.addSprite("but_start", "./sprites/but_start.png");
        s_oSpriteLibrary.loadSprites();
        l = new createjs.Container;
        s_oStage.addChild(l)
    };
    this.unload = function() {
        l.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded =
        function() {
            this.attachSprites();
            s_oMain.preloaderReady()
        };
    this.attachSprites = function() {
        var q = new createjs.Shape;
        q.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(q);
        q = s_oSpriteLibrary.getSprite("200x200");
        g = createBitmap(q);
        g.regX = .5 * q.width;
        g.regY = .5 * q.height;
        g.x = CANVAS_WIDTH_HALF;
        g.y = CANVAS_HEIGHT_HALF - 180;
        l.addChild(g);
        k = new createjs.Shape;
        k.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(g.x - 95, g.y - 95, 190, 190, 10);
        l.addChild(k);
        g.mask = k;
        q = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(q);
        d.x = CANVAS_WIDTH_HALF - q.width / 2;
        d.y = CANVAS_HEIGHT_HALF + 50;
        l.addChild(d);
        a = q.width;
        c = q.height;
        f = new createjs.Shape;
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, c);
        l.addChild(f);
        d.mask = f;
        b = new createjs.Text("", "30px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        b.x = CANVAS_WIDTH_HALF;
        b.y = CANVAS_HEIGHT_HALF + 100;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        l.addChild(b);
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.addChild(e);
        createjs.Tween.get(e).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(e);
            l.removeChild(e)
        })
    };
    this.refreshLoader = function(e) {
        b.text = e + "%";
        100 === e && (s_oMain._onRemovePreloader(), b.visible = !1, d.visible = !1);
        f.graphics.clear();
        e = Math.floor(e * a / 100);
        f.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, e, c)
    };
    this._init()
}

function CMain(a) {
    var c, b = 0,
        d = 0,
        f = STATE_LOADING,
        e, g, k;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        s_oStage.preventSelection = !1;
        createjs.Touch.enable(s_oStage);
        s_bMobile = jQuery.browser.mobile;
        !1 === s_bMobile && (s_oStage.enableMouseOver(20), $("body").on("contextmenu", "#canvas", function(a) {
            return !1
        }));
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        e = new CPreloader
    };
    this.preloaderReady = function() {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        e.refreshLoader(Math.floor(b / d * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "click",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "game_over",
            loop: !1,
            volume: 1,
            ingamename: "game_over"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "change_colour",
            loop: !1,
            volume: 1,
            ingamename: "change_colour"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "destroy_row",
            loop: !1,
            volume: 1,
            ingamename: "destroy_row"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "bonus",
            loop: !1,
            volume: 1,
            ingamename: "bonus"
        });
        d += s_aSoundsInfo.length;
        s_aSounds = [];
        for (var a = 0; a < s_aSoundsInfo.length; a++) this.tryToLoadSound(s_aSoundsInfo[a],
            !1)
    };
    this.tryToLoadSound = function(a, b) {
        setTimeout(function() {
            s_aSounds[a.ingamename] = new Howl({
                src: [a.path + a.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: a.loop,
                volume: a.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(a, b) {
                    for (var c = 0; c < s_aSoundsInfo.length; c++)
                        if (a === s_aSounds[s_aSoundsInfo[c].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[c], !0);
                            break
                        }
                },
                onplayerror: function(a) {
                    for (var b = 0; b < s_aSoundsInfo.length; b++)
                        if (a === s_aSounds[s_aSoundsInfo[b].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[b].ingamename].once("unlock",
                                function() {
                                    s_aSounds[s_aSoundsInfo[b].ingamename].play();
                                    "soundtrack" === s_aSoundsInfo[b].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                                });
                            break
                        }
                }
            })
        }, b ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_restart",
            "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("msg_box_big", "./sprites/msg_box_big.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("logo_ctl", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game",
            "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_next", "./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("box", "./sprites/box.png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        e.refreshLoader(Math.floor(b / d * 100))
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this._onRemovePreloader = function() {
        try {
            saveItem("ls_available", "ok")
        } catch (q) {
            s_bStorageAvailable = !1
        }
        e.unload();
        s_oSoundtrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    };
    this.gotoMenu = function() {
        g = new CMenu;
        f = STATE_MENU
    };
    this.gotoGame = function() {
        k = new CGame(l);
        f = STATE_GAME;
        $(s_oMain).trigger("start_session")
    };
    this.gotoHelp = function() {
        new CHelp;
        f = STATE_HELP
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display",
            "block");
        s_bAudioActive && Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        s_bAudioActive && Howler.mute(!1)
    };
    this._update = function(a) {
        if (!1 !== c) {
            var b = (new Date).getTime();
            s_iTimeElaps = b - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            f === STATE_MENU && g.update();
            f === STATE_GAME && k.update();
            s_oStage.update(a)
        }
    };
    s_oMain = this;
    var l = a;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    s_bAudioActive = a.audio_enable_on_startup;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_bFullscreen = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null,
    s_oCanvas, s_iTotalScore = 0,
    s_iBestScore = 0,
    s_aSoundsInfo, s_bStorageAvailable = !0;

function CMenu() {
    var a, c, b, d, f, e, g, k, l, q, v, u, p, m, w, n, A = null,
        B = null,
        D;
    this._init = function() {
        D = 0;
        g = new createjs.Container;
        s_oStage.addChild(g);
        l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        g.addChild(l);
        k = new createjs.Container;
        g.addChild(k);
        var x = s_oSpriteLibrary.getSprite("logo_menu");
        q = createBitmap(x);
        q.regX = x.width / 2;
        q.regY = x.height / 2;
        q.x = CANVAS_WIDTH_HALF;
        q.y = -150;
        createjs.Tween.get(q, {
            loop: !1
        }).to({
            y: CANVAS_HEIGHT_HALF - 100
        }, 1E3, createjs.Ease.cubicOut);
        g.addChild(q);
        n = new CTLText(g, CANVAS_WIDTH_HALF -
            250, CANVAS_HEIGHT_HALF + 150, 500, 36, 36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, " ", !0, !0, !1, !1);
        x = s_oSpriteLibrary.getSprite("but_play");
        v = new CGfxButton(CANVAS_WIDTH_HALF, CANVAS_HEIGHT + 150, x, g);
        v.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        createjs.Tween.get(v.getSprite(), {
            loop: !1
        }).to({
            y: CANVAS_HEIGHT_HALF + 350
        }, 1E3, createjs.Ease.cubicOut);
        x = s_oSpriteLibrary.getSprite("but_credits");
        b = 20 + .5 * x.width;
        d = .5 * x.height + 10;
        m = new CGfxButton(b, d, x, g);
        m.addEventListener(ON_MOUSE_UP, this._onCredits,
            this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) x = s_oSpriteLibrary.getSprite("audio_icon"), f = CANVAS_WIDTH - .25 * x.width - 20, e = .5 * x.height + 10, p = new CToggle(f, e, x, s_bAudioActive, g), p.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        x = window.document;
        var E = x.documentElement;
        A = E.requestFullscreen || E.mozRequestFullScreen || E.webkitRequestFullScreen || E.msRequestFullscreen;
        B = x.exitFullscreen || x.mozCancelFullScreen || x.webkitExitFullscreen || x.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && screenfull.isEnabled &&
            (x = s_oSpriteLibrary.getSprite("but_fullscreen"), a = b + x.width / 2 + 10, c = d, w = new CToggle(a, c, x, s_bFullscreen, g), w.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        u = new createjs.Shape;
        u.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.addChild(u);
        createjs.Tween.get(u).to({
            alpha: 0
        }, 1E3).call(function() {
            g.removeChild(u)
        });
        s_bStorageAvailable ? (x = getItem("block_slither"), s_iTotalScore = null !== x && void 0 !== x ? Number(x) : 0, x = getItem("block_slither_best_score"), null !==
            x && void 0 !== x ? s_iBestScore = x : (s_iBestScore = 0, n.refreshText(" ")), n.refreshText(TEXT_BEST_SCORE + ": " + s_iBestScore)) : new CMsgBox(TEXT_ERR_LS, g);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this._initBlock = function() {
        var a = {
            images: [s_oSpriteLibrary.getSprite("box")],
            frames: {
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                regX: .5 * SQUARE_SIZE,
                regY: .5 * SQUARE_SIZE
            },
            animations: {
                idle: [0, 4]
            }
        };
        a = new createjs.SpriteSheet(a);
        var b = createSprite(a, "idle", .5 * SQUARE_SIZE, .5 * SQUARE_SIZE, SQUARE_SIZE, SQUARE_SIZE);
        b.scaleX = b.scaleY =
            Math.random() * (1.1 - .9) + .9;
        b.x = 150 + 100 * Math.random() * SQUARE_LINE_NUMBER;
        b.y = -200;
        k.addChild(b);
        b.gotoAndStop(Math.floor(Math.random() * SQUARE_LINE_NUMBER));
        a = 1E3 * Math.random() + 1500;
        createjs.Tween.get(b).to({
            y: CANVAS_HEIGHT + 100
        }, a, createjs.Ease.linear).call(function() {
            createjs.Tween.removeTweens(b);
            k.removeChild(b)
        })
    };
    this.unload = function() {
        v.unload();
        v = null;
        m.unload();
        g.removeChild(l);
        g.removeChild(k);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p.unload(), p = null;
        A && screenfull.isEnabled && w.unload();
        s_oMenu = null
    };
    this.refreshButtonPos = function(g, k) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || p.setPosition(f - g, e + k);
        A && screenfull.isEnabled && w.setPosition(a + g, c + k);
        m.setPosition(b + g, d + k)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? B.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    };
    this.resetFullscreenBut = function() {
        A && screenfull.isEnabled && w.setActive(s_bFullscreen)
    };
    this.exitFromCredits = function() {};
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onCredits = function() {
        new CCreditsPanel
    };
    this._onButPlayRelease = function() {
        this.unload();
        s_oMain.gotoGame()
    };
    this.update = function() {
        D += s_iTimeElaps;
        700 <= D && (D = 0, this._initBlock())
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a) {
    var c, b, d, f, e, g, k, l, q, v, u, p, m, w, n;
    this._init = function() {
        s_oTweenController = new CTweenController;
        q = new createjs.Container;
        s_oStage.addChild(q);
        var a = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        a.cache(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        q.addChild(a);
        this._resetVariables();
        this._initSquareMatrix();
        this._initPlayerSquare();
        this._initGameOverLine();
        u = new CInterface;
        u.initBestScoreText();
        CHelpPanel()
    };
    this._resetVariables = function() {
        n = p = null;
        d = b = c = !1;
        k = l = g = e = 0;
        f = s_iTotalScore;
        setVolume("soundtrack",
            SOUNDTRACK_VOLUME_IN_GAME)
    };
    this._initSquareMatrix = function() {
        m = new CSquareMatrix(q);
        for (var a = 0; a < SQUARE_LINES_MINIMUM; a++) this.createNewSquareLine()
    };
    this._initGameOverLine = function() {
        v = new createjs.Shape;
        v.graphics.beginFill("red");
        v.graphics.drawRoundRect(0, 250, 900, 5, 1);
        v.graphics.endFill();
        v.alpha = .8;
        q.addChild(v)
    };
    this.createNewSquareLine = function() {
        m.createSquareLine(e);
        e++
    };
    this._getRandomColour = function() {
        return Math.floor(Math.random() * SQUARE_LINE_NUMBER)
    };
    this._initPlayerSquare = function() {
        for (var a =
                this._getRandomColour(); m.returnColumnColour(PLAYER_START_COLUMN) === a;) a = this._getRandomColour();
        w = new CPlayerSquare(e, PLAYER_START_COLUMN, a, m.getContainer())
    };
    this._checkForGameOver = function() {
        w.getGlobalY() < GAMEOVER_LIMIT || (c = !1, m.setUpdate(!1), w.destroySquare(), this._gameOver())
    };
    this.onClickedSquare = function(a) {
        !1 !== c && !1 !== m.isUpdate() && !0 !== w.isLockedMovement() && w.moveSquareToNewColumn(a)
    };
    this.onPlayerSquareMoved = function() {
        !1 !== this._checkForSameColour() && this._onSameColourFound()
    };
    this._onSameColourFound =
        function() {
            !1 === soundPlaying("destroy_row") && playSound("destroy_row", 1, !1);
            m.destroyTopRow();
            w.moveSquareDown();
            this._addScore();
            this._checkForMotivationalText();
            !1 === this._checkForSameColour() && k++;
            k === COLOUR_CHANGE_OCCURRANCE && (k = 0, this._changePlayerColour())
        };
    this.isDisableEvents = function() {
        return b
    };
    this.setDisableEvents = function(a) {
        b = a
    };
    this._initMotivationalText = function() {
        null === n && (!1 === soundPlaying("bonus") && playSound("bonus", 1, !1), n = new CMotivationalText(q))
    };
    this.removeMotivationalText =
        function() {
            n = null
        };
    this._changePlayerColour = function() {
        for (var a = this._getRandomColour(); !0 === this._checkForSameColour() || a === w.getColour();) a = this._getRandomColour();
        !1 === soundPlaying("change_colour") && playSound("change_colour", 1, !1);
        w.changeColour(a)
    };
    this._checkForMotivationalText = function() {
        !1 === d ? d = !0 : (l < MOTIVATIONAL_TIMER_LIMIT && (d = !1, this._initMotivationalText()), l = 0)
    };
    this._checkForSameColour = function() {
        var a = w.getColumn();
        return m.returnColumnColour(a) === w.getColour() ? !0 : !1
    };
    this._addScore =
        function() {
            g++;
            w.updateValueTest(g)
        };
    this.unload = function() {
        m.unload();
        u.unload();
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren();
        s_oGame = null
    };
    this.onExit = function() {
        setVolume("soundtrack", 1);
        s_oGame.unload();
        s_oMain.gotoMenu();
        $(s_oMain).trigger("end_session");
        $(s_oMain).trigger("show_interlevel_ad")
    };
    this.restart = function() {
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        $(s_oMain).trigger("restart_level");
        m.unload();
        this._resetVariables();
        u.updateBestScoreText();
        this._initSquareMatrix();
        this._initPlayerSquare();
        this._onExitHelp()
    };
    this._onExitHelp = function() {
        c = !0;
        b = !1;
        w.startTween()
    };
    this.startMatrixMovement = function() {
        m.setSquareMatrixUpdate(!0)
    };
    this._updateScore = function() {
        s_iTotalScore = f += g;
        saveItem("block_slither", g)
    };
    this._gameOver = function() {
        c = !1;
        null === p && (this._updateScore(), playSound("game_over", 1, !1), stopSound("soundtrack"), setTimeout(function() {
            playSound("soundtrack", .5, !1)
        }, 3E3), p = new CEndPanel(g), b = !0, g > s_iBestScore && (s_iBestScore = g, saveItem("block_slither_best_score",
            s_iBestScore), $(s_oMain).trigger("save_score", g)), $(s_oMain).trigger("share_event", g))
    };
    this.setStartGame = function(a) {
        c = a
    };
    this.update = function() {
        v.y = s_iOffsetY + GAMEOVER_LINE_DIFFERENCE;
        c && (d && (l += s_iTimeElaps), m.setAccellerate(!1), w.getGlobalY() < PLAYER_BOTTOM_LIMIT + s_iOffsetY && m.setAccellerate(!0), m.update(), w.update(), !0 === m.isUpdate() && this._checkForGameOver())
    };
    s_oGame = this;
    MATRIX_VERTICAL_SPEED = a.matrix_vertical_speed;
    MATRIX_SPEED_VARIABLE = a.matrix_speed_variable;
    MAX_MATRIX_SPEED_LIMIT = a.max_matrix_speed_limit;
    COLOUR_CHANGE_OCCURRANCE = a.colour_change_occurance;
    this._init()
}
var s_oGame, s_oTweenController;

function CSquareMatrix(a) {
    var c, b, d, f, e, g, k, l, q;
    this._init = function() {
        c = new createjs.Container;
        a.addChild(c);
        q = !1;
        l = [];
        k = f = MATRIX_VERTICAL_SPEED;
        this.resetTweenSettings()
    };
    this.resetTweenSettings = function() {
        d = 0;
        b = c.y;
        g = c.y - 100
    };
    this.setSquareMatrixUpdate = function(a) {
        e = a
    };
    this.createSquareLine = function(a) {
        var b = [0, 1, 2, 3, 4];
        shuffle(b);
        for (var d = [], e = 0; e < SQUARE_LINE_NUMBER; e++) {
            var f = new CSquare(a, e, b[e], c);
            d.push(f)
        }
        l.push(d)
    };
    this.getSquareMatrix = function() {
        return l
    };
    this.getContainer = function() {
        return c
    };
    this.returnColumnColour = function(a) {
        return l[0][a].getColour()
    };
    this.destroyTopRow = function() {
        for (var a = 0; a < SQUARE_LINE_NUMBER; a++) l[0][a].destroySquare();
        l.splice(0, 1);
        l.length < SQUARE_LINES_MINIMUM && s_oGame.createNewSquareLine()
    };
    this.unload = function() {
        for (var a = 0; a < l.length; a++) {
            for (var b = 0; b < l[a].length; b++) l[a][b].unload();
            l.splice(a, 1)
        }
        c.removeAllChildren()
    };
    this.getY = function() {
        return c.y
    };
    this.resetMovement = function() {
        this.resetTweenSettings();
        f -= MATRIX_SPEED_VARIABLE;
        f < MAX_MATRIX_SPEED_LIMIT &&
            (f = MAX_MATRIX_SPEED_LIMIT);
        k = q ? MAX_MATRIX_SPEED_LIMIT / 4 : f;
        e = !0
    };
    this.setAccellerate = function(a) {
        q = a
    };
    this.setUpdate = function(a) {
        e = a
    };
    this.isUpdate = function() {
        return e
    };
    this.update = function() {
        if (e)
            if (d += s_iTimeElaps, d >= k) e = !1, this.resetMovement();
            else {
                var a = s_oTweenController.easeLinear(d, 0, 1, k);
                a = s_oTweenController.tweenValue(b, g, a);
                c.y = a
            }
    };
    this._init()
}

function CSquare(a, c, b, d) {
    var f, e, g, k, l, q, v, u;
    this._init = function() {
        f = d;
        e = new createjs.Container;
        f.addChild(e);
        u = b;
        k = c;
        l = a;
        q = MATRIX_OFFSET_X + (SQUARE_SIZE + SQUARE_OFFSET) * k;
        v = MATRIX_OFFSET_Y + (SQUARE_SIZE + SQUARE_OFFSET) * l;
        var p = {
            images: [s_oSpriteLibrary.getSprite("box")],
            frames: {
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 4]
            }
        };
        p = new createjs.SpriteSheet(p);
        g = createSprite(p, "idle", 0, 0, SQUARE_SIZE, SQUARE_SIZE);
        g.gotoAndStop(u);
        g.regX = g.regY = .5 * SQUARE_SIZE;
        e.addChild(g);
        e.x =
            q;
        e.y = v;
        e.scaleX = e.scaleY = SQUARE_SCALE_VAR;
        e.on("mousedown", function() {
            s_oGame.onClickedSquare(k)
        });
        s_bMobile || (e.cursor = "pointer")
    };
    this.destroySquare = function() {
        createjs.Tween.get(g).to({
            alpha: 0
        }, 500, createjs.Ease.backOut).call(this.unload)
    };
    this.getColour = function() {
        return u
    };
    this.unload = function() {
        f.removeChild(e);
        createjs.Tween.removeTweens(g)
    };
    this._init()
}

function CPlayerSquare(a, c, b, d) {
    var f, e, g, k, l, q, v, u, p, m, w, n, A, B, D, x, E, I, P, Q, M;
    this._init = function() {
        f = d;
        e = new createjs.Container;
        f.addChild(e);
        m = !1;
        A = !0;
        n = w = !1;
        E = PLAYER_SQUARE_HORIZONTAL_SPEED;
        M = PLAYER_SQUARE_VERTICAL_SPEED;
        this._resetHorizontalTweenSettings(0);
        this._resetVerticalTweenSettings();
        l = START_PLAYER_VALUE;
        p = b;
        q = c;
        v = MATRIX_OFFSET_X + (SQUARE_SIZE + SQUARE_OFFSET) * q;
        u = MATRIX_OFFSET_Y - (SQUARE_SIZE + SQUARE_OFFSET);
        var a = {
            images: [s_oSpriteLibrary.getSprite("box")],
            frames: {
                width: SQUARE_SIZE,
                height: SQUARE_SIZE,
                regX: 0,
                regY: 0
            },
            animations: {
                idle: [0, 4]
            }
        };
        a = new createjs.SpriteSheet(a);
        g = createSprite(a, "idle", 0, 0, SQUARE_SIZE, SQUARE_SIZE);
        g.gotoAndStop(p);
        g.regX = g.regY = .5 * SQUARE_SIZE;
        k = new createjs.Text(l, "40px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.y = 15;
        e.addChild(g, k);
        e.x = v;
        e.y = -SQUARE_SIZE;
        e.scaleX = e.scaleY = SQUARE_SCALE_VAR
    };
    this.startTween = function() {
        createjs.Tween.get(e).to({
            y: u
        }, 1500, createjs.Ease.bounceOut).call(function() {
            createjs.Tween.removeTweens(e);
            s_oGame.startMatrixMovement();
            A = !1
        })
    };
    this.getColumn = function() {
        return q
    };
    this.getColour = function() {
        return p
    };
    this.changeColour = function(a) {
        var b = this;
        m = !0;
        createjs.Tween.get(e).to({
            alpha: .8,
            scaleX: 1.2,
            scaleY: 1.2
        }, 50, createjs.Ease.quadIn).to({
            alpha: 1,
            scaleX: SQUARE_SCALE_VAR,
            scaleY: SQUARE_SCALE_VAR
        }, 50, createjs.Ease.quadOut).to({
            alpha: .8,
            scaleX: 1.2,
            scaleY: 1.2
        }, 50, createjs.Ease.quadIn).to({
            alpha: 1,
            scaleX: SQUARE_SCALE_VAR,
            scaleY: SQUARE_SCALE_VAR
        }, 50, createjs.Ease.quadOut).to({
            alpha: .8,
            scaleX: 1.2,
            scaleY: 1.2
        }, 50, createjs.Ease.quadIn).to({
            alpha: 1,
            scaleX: SQUARE_SCALE_VAR,
            scaleY: SQUARE_SCALE_VAR
        }, 50, createjs.Ease.quadOut).to({
            alpha: .8,
            scaleX: 1.2,
            scaleY: 1.2
        }, 50, createjs.Ease.quadIn).to({
            alpha: 1,
            scaleX: SQUARE_SCALE_VAR,
            scaleY: SQUARE_SCALE_VAR
        }, 50, createjs.Ease.quadOut).to({
            alpha: .8,
            scaleX: 1.2,
            scaleY: 1.2
        }, 50, createjs.Ease.quadIn).to({
            alpha: 1,
            scaleX: SQUARE_SCALE_VAR,
            scaleY: SQUARE_SCALE_VAR
        }, 50, createjs.Ease.quadOut).call(function() {
            createjs.Tween.removeTweens(e);
            b._onChangeColourAnimationFinished(a)
        })
    };
    this._onChangeColourAnimationFinished = function(a) {
        m = !1;
        e.alpha = 1;
        e.scaleX = e.scaleY = SQUARE_SCALE_VAR;
        p = a;
        g.gotoAndStop(a);
        s_oGame.onPlayerSquareMoved()
    };
    this.moveSquareDown = function() {
        n || (this._resetVerticalTweenSettings(), n = !0)
    };
    this.moveSquareToNewColumn = function(a) {
        w || (this._resetHorizontalTweenSettings(a), q = a, w = !0)
    };
    this.updateValueTest = function(a) {
        k.text = a
    };
    this.getGlobalY = function() {
        return g.globalToLocal(g.x, g.y).y + s_iOffsetY
    };
    this.isLockedMovement = function() {
        var a = !1;
        if (A || w || n || m) a = !0;
        return a
    };
    this._resetHorizontalTweenSettings = function(a) {
        a =
            MATRIX_OFFSET_X + (SQUARE_SIZE + SQUARE_OFFSET) * a;
        B = 0;
        D = e.x;
        x = a
    };
    this._resetVerticalTweenSettings = function() {
        var a = e.y + SQUARE_SIZE + SQUARE_OFFSET;
        I = 0;
        P = e.y;
        Q = a
    };
    this.destroySquare = function() {
        createjs.Tween.get(e).to({
            alpha: 0
        }, 1E3, createjs.Ease.backOut).call(this.unload)
    };
    this.unload = function() {
        f.removeChild(e);
        createjs.Tween.removeTweens(g)
    };
    this.update = function() {
        if (w || n) {
            if (w)
                if (B += s_iTimeElaps, B >= E) w = !1, s_oGame.onPlayerSquareMoved();
                else {
                    var a = s_oTweenController.easeOutCubic(B, 0, 1, E);
                    a = s_oTweenController.tweenValue(D,
                        x, a);
                    e.x = a
                } n && (I += s_iTimeElaps, I >= M ? (n = !1, s_oGame.onPlayerSquareMoved()) : (a = s_oTweenController.easeOutCubic(I, 0, 1, M), a = s_oTweenController.tweenValue(P, Q, a), e.y = a))
        }
    };
    this._init()
}

function CMotivationalText(a) {
    var c, b, d, f;
    this._init = function() {
        c = a;
        b = new createjs.Container;
        c.addChild(b);
        var e = CANVAS_HEIGHT_HALF - 200;
        f = [TEXT_MOTIVATIONAL_1, TEXT_MOTIVATIONAL_2, TEXT_MOTIVATIONAL_3, TEXT_MOTIVATIONAL_4, TEXT_MOTIVATIONAL_5, TEXT_MOTIVATIONAL_6, TEXT_MOTIVATIONAL_7, TEXT_MOTIVATIONAL_8, TEXT_MOTIVATIONAL_9];
        d = new CTLText(b, -500, e, 500, 70, 70, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, f[Math.floor(Math.random() * f.length)], !0, !0, !1, !1);
        this._initMovementTween()
    };
    this._initMovementTween =
        function() {
            var a = this;
            createjs.Tween.get(b).to({
                x: 650
            }, .5 * MOTIVATIONAL_TEXT_SPEED, createjs.Ease.quintIn).call(function() {
                a._initPulseTween()
            })
        };
    this._initPulseTween = function() {
        var a = this;
        createjs.Tween.get(d).to({
            scaleX: 1.2,
            scaleY: 1.2
        }, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn).to({
            scaleX: 1,
            scaleY: 1
        }, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn).to({
            scaleX: 1.2,
            scaleY: 1.2
        }, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn).to({
            scaleX: 1,
            scaleY: 1
        }, MOTIVATIONAL_TEXT_PULSE_TIME, createjs.Ease.cubicIn).call(function() {
            a._initExitTween()
        })
    };
    this._initExitTween = function() {
        var a = this;
        createjs.Tween.get(b).to({
            x: 1300
        }, MOTIVATIONAL_TEXT_SPEED, createjs.Ease.quintOut).call(function() {
            a.unload()
        })
    };
    this.unload = function() {
        s_oGame.removeMotivationalText();
        createjs.Tween.removeTweens(b);
        c.removeChild(b)
    };
    this._init()
}

function CToggle(a, c, b, d, f) {
    var e, g, k, l, q;
    this._init = function(a, b, c, d, f) {
        q = void 0 !== f ? f : s_oStage;
        g = [];
        k = [];
        f = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: c.width / 2,
                height: c.height,
                regX: c.width / 2 / 2,
                regY: c.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        e = d;
        l = createSprite(f, "state_" + e, c.width / 2 / 2, c.height / 2, c.width / 2, c.height);
        l.x = a;
        l.y = b;
        l.stop();
        s_bMobile || (l.cursor = "pointer");
        q.addChild(l);
        this._initListener()
    };
    this.unload = function() {
        l.off("mousedown", this.buttonDown);
        l.off("pressup",
            this.buttonRelease);
        q.removeChild(l)
    };
    this._initListener = function() {
        l.on("mousedown", this.buttonDown);
        l.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        g[a] = b;
        k[a] = c
    };
    this.setCursorType = function(a) {
        l.cursor = a
    };
    this.setActive = function(a) {
        e = a;
        l.gotoAndStop("state_" + e)
    };
    this.buttonRelease = function() {
        l.scaleX = 1;
        l.scaleY = 1;
        playSound("click", 1, !1);
        e = !e;
        l.gotoAndStop("state_" + e);
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(k[ON_MOUSE_UP], e)
    };
    this.buttonDown = function() {
        l.scaleX = .9;
        l.scaleY =
            .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(k[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, b) {
        l.x = a;
        l.y = b
    };
    this._init(a, c, b, d, f)
}

function CGfxButton(a, c, b, d) {
    var f, e, g, k, l, q, v, u, p;
    this._init = function(a, b, c) {
        f = !1;
        e = [];
        g = [];
        l = [];
        k = createBitmap(c);
        k.x = a;
        k.y = b;
        v = q = 1;
        k.regX = c.width / 2;
        k.regY = c.height / 2;
        s_bMobile || (k.cursor = "pointer");
        m.addChild(k);
        this._initListener()
    };
    this.getSprite = function() {
        return k
    };
    this.unload = function() {
        k.off("mousedown", u);
        k.off("pressup", p);
        m.removeChild(k)
    };
    this.setVisible = function(a) {
        k.visible = a
    };
    this.setCursorType = function(a) {
        k.cursor = a
    };
    this._initListener = function() {
        u = k.on("mousedown", this.buttonDown);
        p = k.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        e[a] = b;
        g[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        e[a] = b;
        g[a] = c;
        l[a] = d
    };
    this.enable = function() {
        f = !1
    };
    this.disable = function() {
        f = !0
    };
    this.buttonRelease = function() {
        f || (k.scaleX = 0 < q ? 1 : -1, k.scaleY = 1, playSound("click", 1, !1), e[ON_MOUSE_UP] && e[ON_MOUSE_UP].call(g[ON_MOUSE_UP], l[ON_MOUSE_UP]))
    };
    this.buttonDown = function() {
        f || (k.scaleX = 0 < q ? .9 : -.9, k.scaleY = .9, e[ON_MOUSE_DOWN] && e[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], l[ON_MOUSE_DOWN]))
    };
    this.rotation = function(a) {
        k.rotation = a
    };
    this.getButton = function() {
        return k
    };
    this.setPosition = function(a, b) {
        k.x = a;
        k.y = b
    };
    this.setX = function(a) {
        k.x = a
    };
    this.setY = function(a) {
        k.y = a
    };
    this.getButtonImage = function() {
        return k
    };
    this.setScaleX = function(a) {
        q = k.scaleX = a
    };
    this.getX = function() {
        return k.x
    };
    this.getY = function() {
        return k.y
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(k).to({
            scaleX: .9 * q,
            scaleY: .9 * v
        }, 850, createjs.Ease.quadOut).to({
            scaleX: q,
            scaleY: v
        }, 650, createjs.Ease.quadIn).call(function() {
            w.pulseAnimation()
        })
    };
    this.trebleAnimation = function() {
        createjs.Tween.get(k).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            w.trebleAnimation()
        })
    };
    this.removeAllTweens = function() {
        createjs.Tween.removeTweens(k)
    };
    var m = void 0 !== d ? d : s_oStage;
    this._init(a, c, b);
    var w = this;
    return this
}

function CTextButton(a, c, b, d, f, e, g, k) {
    var l, q, v, u, p, m, w, n, A, B;
    this._init = function(a, b, c, d, e, f, g) {
        l = !1;
        q = 1;
        v = [];
        u = [];
        B = createBitmap(c);
        n = new createjs.Container;
        n.x = a;
        n.y = b;
        n.regX = c.width / 2;
        n.regY = c.height / 2;
        s_bMobile || (n.cursor = "pointer");
        n.addChild(B, A);
        k.addChild(n);
        A = new CTLText(n, 10, 5, c.width - 20, c.height - 10, g, "center", f, e, 1, 0, 0, d, !0, !0, !1, !1);
        this._initListener()
    };
    this.unload = function() {
        n.off("mousedown", p);
        n.off("pressup", m);
        k.removeChild(n)
    };
    this.setVisible = function(a) {
        n.visible = a
    };
    this.setAlign =
        function(a) {
            A.textAlign = a
        };
    this.setTextX = function(a) {
        A.x = a
    };
    this.setScale = function(a) {
        q = n.scaleX = n.scaleY = a
    };
    this.enable = function() {
        l = !1
    };
    this.disable = function() {
        l = !0
    };
    this._initListener = function() {
        p = n.on("mousedown", this.buttonDown);
        m = n.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, b, c) {
        v[a] = b;
        u[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        v[a] = b;
        u[a] = c;
        w = d
    };
    this.buttonRelease = function() {
        l || (playSound("click", 1, !1), n.scaleX = q, n.scaleY = q, v[ON_MOUSE_UP] && v[ON_MOUSE_UP].call(u[ON_MOUSE_UP],
            w))
    };
    this.buttonDown = function() {
        l || (n.scaleX = .9 * q, n.scaleY = .9 * q, v[ON_MOUSE_DOWN] && v[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(a, b) {
        n.x = a;
        n.y = b
    };
    this.tweenPosition = function(a, b, c, d, e, f, g) {
        createjs.Tween.get(n).wait(d).to({
            x: a,
            y: b
        }, c, e).call(function() {
            void 0 !== f && f.call(g)
        })
    };
    this.changeText = function(a) {
        A.refreshText(a)
    };
    this.setX = function(a) {
        n.x = a
    };
    this.setY = function(a) {
        n.y = a
    };
    this.getButtonImage = function() {
        return n
    };
    this.getX = function() {
        return n.x
    };
    this.getY = function() {
        return n.y
    };
    this.getSprite = function() {
        return n
    };
    this.getScale = function() {
        return n.scaleX
    };
    this._init(a, c, b, d, f, e, g)
}

function CInterface() {
    var a, c, b, d, f, e, g, k, l, q, v = null,
        u = null,
        p, m, w, n;
    this._init = function() {
        g = new createjs.Container;
        s_oStage.addChild(g);
        var l = s_oSpriteLibrary.getSprite("but_exit");
        a = CANVAS_WIDTH - l.width / 2 - 20;
        c = l.height / 2 + 10;
        p = new CGfxButton(a, c, l, g);
        p.addEventListener(ON_MOUSE_UP, this._onExit, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
            var m = s_oSpriteLibrary.getSprite("audio_icon");
            f = a - l.width / 2 - m.width / 4;
            e = c;
            k = new CToggle(f, e, m, s_bAudioActive, g);
            k.addEventListener(ON_MOUSE_UP, this._onAudioToggle,
                this);
            b = 20 + m.width / 4;
            d = m.height / 2 + 10
        } else b = a - l.width - 10, d = c;
        l = window.document;
        m = l.documentElement;
        v = m.requestFullscreen || m.mozRequestFullScreen || m.webkitRequestFullScreen || m.msRequestFullscreen;
        u = l.exitFullscreen || l.mozCancelFullScreen || l.webkitExitFullscreen || l.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (v = !1);
        v && screenfull.isEnabled && (m = s_oSpriteLibrary.getSprite("but_fullscreen"), q = new CToggle(b, d, m, s_bFullscreen, g), q.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        this.refreshButtonPos()
    };
    this.initBestScoreText = function() {
        m = new createjs.Container;
        g.addChild(m);
        n = new createjs.Shape;
        n.graphics.beginFill("#222222").drawRoundRect(0, 0, 350, 50, 10);
        n.regX = 169;
        n.regY = 37;
        n.alpha = .9;
        m.addChild(n);
        w = new CTLText(m, 4, -26, n.regX, 32, 32, "left", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_BEST_SCORE + " " + s_iBestScore, !0, !0, !1, !1);
        this.refreshButtonPos()
    };
    this.updateBestScoreText = function() {
        w.refreshText(TEXT_BEST_SCORE + " " + s_iBestScore);
        this.refreshButtonPos()
    };
    this.refreshButtonPos = function() {
        !1 !== DISABLE_SOUND_MOBILE &&
            !1 !== s_bMobile || k.setPosition(f - s_iOffsetX, e + s_iOffsetY);
        v && screenfull.isEnabled && q.setPosition(b + s_iOffsetX, d + s_iOffsetY);
        p.setPosition(a - s_iOffsetX, c + s_iOffsetY);
        l = CANVAS_HEIGHT - s_iOffsetY - 50;
        void 0 !== w && (m.y = l)
    };
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) k.unload(), k = null;
        v && screenfull.isEnabled && q.unload();
        p.unload();
        s_oInterface = null;
        s_oGame.setDisableEvents(!1);
        s_oGame.setStartGame(!0)
    };
    this._onExit = function() {
        s_oGame.isDisableEvents() || (new CAreYouSurePanel(g), s_oGame.setDisableEvents(!0),
            s_oGame.setStartGame(!1))
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? u.call(window.document) : v.call(window.document.documentElement);
        sizeHandler()
    };
    this.resetFullscreenBut = function() {
        v && screenfull.isEnabled && q.setActive(s_bFullscreen)
    };
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;

function CCreditsPanel() {
    var a, c, b, d, f, e, g, k, l, q, v, u, p;
    this._init = function() {
        var m = s_oSpriteLibrary.getSprite("msg_box");
        v = new createjs.Container;
        s_oStage.addChild(v);
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, 2 * CANVAS_HEIGHT);
        g.alpha = 0;
        v.addChild(g);
        createjs.Tween.get(g).to({
            alpha: .7
        }, 500);
        p = CANVAS_HEIGHT + m.height / 2;
        u = new createjs.Container;
        u.y = p;
        v.addChild(u);
        c = createBitmap(m);
        c.regX = m.width / 2;
        c.regY = m.height / 2;
        c.x = CANVAS_WIDTH_HALF;
        c.y = CANVAS_HEIGHT_HALF;
        u.addChild(c);
        k = new createjs.Shape;
        k.graphics.beginFill("#0f0f0f").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.alpha = .01;
        a = k.on("click", this._onLogoButRelease);
        u.addChild(k);
        s_bMobile || (k.cursor = "pointer");
        m = s_oSpriteLibrary.getSprite("but_exit");
        d = new CGfxButton(610, 570, m, u);
        d.addEventListener(ON_MOUSE_UP, this.unload, this);
        f = new createjs.Text(TEXT_CREDITS_DEVELOPED, "44px " + PRIMARY_FONT, SECONDARY_FONT_COLOUR);
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.x = CANVAS_WIDTH_HALF;
        f.y = CANVAS_HEIGHT_HALF - 80;
        f.outline =
            5;
        u.addChild(f);
        e = new createjs.Text(TEXT_CREDITS_DEVELOPED, "44px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        e.textAlign = "center";
        e.textBaseline = "alphabetic";
        e.x = CANVAS_WIDTH_HALF;
        e.y = CANVAS_HEIGHT_HALF - 80;
        u.addChild(e);
        m = s_oSpriteLibrary.getSprite("logo_ctl");
        b = createBitmap(m);
        b.regX = m.width / 2;
        b.regY = m.height / 2;
        b.x = CANVAS_WIDTH_HALF;
        b.y = CANVAS_HEIGHT_HALF;
        u.addChild(b);
        l = new createjs.Text("", "38px " + PRIMARY_FONT, SECONDARY_FONT_COLOUR);
        l.textAlign = "center";
        l.textBaseline = "alphabetic";
        l.x =
            CANVAS_WIDTH_HALF;
        l.y = CANVAS_HEIGHT_HALF + 100;
        l.outline = 5;
        u.addChild(l);
        q = new createjs.Text("", "38px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        q = new createjs.Text("", "38px " + PRIMARY_FONT, PRIMARY_FONT_COLOUR);
        q.textAlign = "center";
        q.textBaseline = "alphabetic";
        q.x = CANVAS_WIDTH_HALF;
        q.y = CANVAS_HEIGHT_HALF + 100;
        u.addChild(q);
        createjs.Tween.get(u).to({
            y: 0
        }, 1E3, createjs.Ease.backOut)
    };
    this.unload = function() {
        createjs.Tween.get(g).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(v).to({
            y: p
        }, 400, createjs.Ease.backIn).call(function() {
            k.off("click", a);
            d.unload();
            d = null;
            s_oStage.removeChild(v);
            s_oMenu.exitFromCredits()
        })
    };
    this._onLogoButRelease = function() {
        window.open(your_link, "_blank")
    };
    this._init()
}

function CAreYouSurePanel() {
    var a, c, b, d, f, e;
    this._init = function() {
        c = new createjs.Container;
        s_oStage.addChild(c);
        e = new createjs.Container;
        s_oStage.addChild(e);
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        f.on("mousedown", function() {});
        c.addChild(f);
        createjs.Tween.get(f).to({
            alpha: .7
        }, 500);
        var g = s_oSpriteLibrary.getSprite("msg_box"),
            l = createBitmap(g);
        l.regX = g.width / 2;
        l.regY = g.height / 2;
        l.x = CANVAS_WIDTH_HALF;
        l.y = CANVAS_HEIGHT_HALF;
        e.addChild(l);
        e.y = CANVAS_HEIGHT + g.height / 2;
        a = e.y;
        createjs.Tween.get(e).to({
            y: 0
        }, 1E3, createjs.Ease.backOut);
        new CTLText(e, CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT_HALF - 160, 500, 150, 36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_ARE_SURE, !0, !0, !0, !1);
        b = new CGfxButton(CANVAS_WIDTH_HALF + 195, 790, s_oSpriteLibrary.getSprite("but_yes"), e);
        b.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        d = new CGfxButton(CANVAS_WIDTH_HALF - 195, 790, s_oSpriteLibrary.getSprite("but_no"), e);
        d.addEventListener(ON_MOUSE_UP, this._onButNo, this)
    };
    this._onButYes = function() {
        d.disable();
        b.disable();
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(e).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            g.unload();
            s_oGame.onExit()
        })
    };
    this._onButNo = function() {
        d.disable();
        b.disable();
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500);
        createjs.Tween.get(e).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            g.unload()
        })
    };
    this.unload = function() {
        d.unload();
        b.unload();
        s_oGame.setDisableEvents(!1);
        s_oGame.setStartGame(!0);
        c.removeChild(f);
        s_oStage.removeChild(e);
        f.off("mousedown", function() {})
    };
    var g = this;
    this._init()
}

function CHelpPanel() {
    var a, c, b, d;
    this._init = function() {
        var f = CANVAS_HEIGHT_HALF - 150,
            e = CANVAS_HEIGHT_HALF - 40,
            g = CANVAS_HEIGHT_HALF + 70,
            k = s_oSpriteLibrary.getSprite("msg_box");
        b = createBitmap(k);
        b.x = CANVAS_WIDTH_HALF;
        b.y = CANVAS_HEIGHT_HALF;
        b.regX = .5 * k.width;
        b.regY = .5 * k.height;
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = .7;
        a.on("mousedown", function() {});
        s_oStage.addChild(a);
        d = new createjs.Container;
        d.addChild(b);
        d.y = CANVAS_HEIGHT;
        s_oStage.addChild(d);
        new CTLText(d, CANVAS_WIDTH / 2 - 250, f, 500, 64, 32, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_HELP1, !0, !0, !0, !1);
        new CTLText(d, CANVAS_WIDTH / 2 - 250, e, 500, 64, 32, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_HELP2, !0, !0, !0, !1);
        new CTLText(d, CANVAS_WIDTH / 2 - 250, g, 500, 64, 32, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_HELP3, !0, !0, !0, !1);
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(c);
        (new createjs.Tween.get(d)).to({
                y: 0
            },
            1E3, createjs.Ease.backOut);
        createjs.Tween.get(c).to({
            alpha: 0
        }, 1E3).call(function() {
            c.visible = !1
        });
        var l = this;
        d.on("pressup", function() {
            l._onExitHelp()
        });
        s_oGame.setDisableEvents(!0);
        s_bMobile || (d.cursor = "pointer")
    };
    this.unload = function() {
        createjs.Tween.get(a).to({
            alpha: 0
        }, 500).call(function() {
            s_oStage.removeChild(a)
        });
        createjs.Tween.get(d).to({
            y: CANVAS_HEIGHT
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(d);
            var a = this;
            d.off("pressup", function() {
                a._onExitHelp()
            })
        })
    };
    this._onExitHelp =
        function() {
            this.unload();
            setTimeout(s_oGame._onExitHelp, 500)
        };
    this._init()
}

function CEndPanel(a) {
    var c, b, d, f, e, g, k;
    this._init = function() {
        k = a;
        c = new createjs.Container;
        s_oStage.addChild(c);
        var l = s_oSpriteLibrary.getSprite("msg_box_big");
        f = createBitmap(l);
        f.x = CANVAS_WIDTH_HALF;
        f.y = CANVAS_HEIGHT_HALF;
        f.regX = .5 * l.width;
        f.regY = .5 * l.height;
        d = new createjs.Shape;
        d.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.alpha = 0;
        d.on("mousedown", function() {});
        s_oStage.addChild(d);
        b = new createjs.Container;
        b.addChild(f);
        b.y = CANVAS_HEIGHT;
        b.on;
        s_oStage.addChild(b);
        new CTLText(b,
            CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT_HALF - 160, 500, 42, 42, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_GAMEOVER, !0, !0, !1, !1);
        new CTLText(b, CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT_HALF - 60, 500, 36, 36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_SCORE + ": " + k, !0, !0, !1, !1);
        new CTLText(b, CANVAS_WIDTH / 2 - 250, CANVAS_HEIGHT_HALF, 500, 36, 36, "center", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0, 0, TEXT_BEST_SCORE + ": " + s_iBestScore, !0, !0, !1, !1);
        e = new CGfxButton(CANVAS_WIDTH_HALF - 200, 840, s_oSpriteLibrary.getSprite("but_home"),
            b);
        e.addEventListener(ON_MOUSE_UP, this._onExit, this);
        g = new CGfxButton(CANVAS_WIDTH_HALF + 200, 840, s_oSpriteLibrary.getSprite("but_restart"), b);
        g.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        createjs.Tween.get(d).to({
            alpha: .7
        }, 1E3, createjs.Ease.quadOut);
        createjs.Tween.get(b).to({
            y: 0
        }, 1E3, createjs.Ease.backOut).call(function() {
            $(s_oMain).trigger("show_interlevel_ad")
        })
    };
    this.unload = function() {
        e.unload();
        g.unload();
        s_oStage.removeChild(d);
        s_oStage.removeChild(c);
        s_oStage.removeChild(b);
        s_oEndPanel =
            null
    };
    this._onExit = function() {
        this.unload();
        s_oGame.onExit()
    };
    this._onRestart = function() {
        this.unload();
        s_oGame.restart()
    };
    s_oEndPanel = this;
    this._init()
}
var s_oEndPanel = null;

function CMsgBox(a, c) {
    var b, d;
    this._init = function(a) {
        d = new createjs.Container;
        f.addChild(d);
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = .5;
        a.on("click", function() {});
        d.addChild(a);
        a = s_oSpriteLibrary.getSprite("msg_box_big");
        var c = createBitmap(a);
        c.x = .5 * CANVAS_WIDTH;
        c.y = .5 * CANVAS_HEIGHT;
        c.regX = .5 * a.width;
        c.regY = .5 * a.height;
        d.addChild(c);
        new CTLText(d, CANVAS_WIDTH / 2 - 260, CANVAS_HEIGHT / 2 - 190, 520, 180, 26, "left", PRIMARY_FONT_COLOUR, PRIMARY_FONT, 1, 0,
            0, TEXT_ERR_LS, !0, !0, !0, !1);
        b = new CGfxButton(CANVAS_WIDTH / 2, 820, s_oSpriteLibrary.getSprite("but_yes"), d);
        b.addEventListener(ON_MOUSE_UP, this._onButOk, this)
    };
    this._onButOk = function() {
        this.unload()
    };
    this.unload = function() {
        b.unload();
        f.removeChild(d)
    };
    var f = c;
    this._init(a)
}
CTLText.prototype = {
    constructor: CTLText,
    __autofit: function() {
        if (this._bFitText) {
            for (var a = this._iStartingFontSize;
                (this._oText.getBounds().height > this._iHeight - 2 * this._iPaddingV || this._oText.getBounds().width > this._iWidth - 2 * this._iPaddingH) && !(a--, this._oText.font = a + "px " + this._szFont, this._oText.lineHeight = Math.round(a * this._fLineHeightFactor), this.__updateY(), this.__verticalAlign(), 8 > a););
            this._iFontSize = a
        }
    },
    __verticalAlign: function() {
        if (this._bVerticalAlign) {
            var a = this._oText.getBounds().height;
            this._oText.y -= (a - this._iHeight) / 2 + this._iPaddingV
        }
    },
    __updateY: function() {
        this._oText.y = this._y + this._iPaddingV;
        switch (this._oText.textBaseline) {
            case "middle":
                this._oText.y += this._oText.lineHeight / 2 + (this._iFontSize * this._fLineHeightFactor - this._iFontSize)
        }
    },
    __createText: function(a) {
        this._bDebug && (this._oDebugShape = new createjs.Shape, this._oDebugShape.graphics.beginFill("rgba(255,0,0,0.5)").drawRect(this._x, this._y, this._iWidth, this._iHeight), this._oContainer.addChild(this._oDebugShape));
        this._oText =
            new createjs.Text(a, this._iFontSize + "px " + this._szFont, this._szColor);
        this._oText.textBaseline = "middle";
        this._oText.lineHeight = Math.round(this._iFontSize * this._fLineHeightFactor);
        this._oText.textAlign = this._szAlign;
        this._oText.lineWidth = this._bMultiline ? this._iWidth - 2 * this._iPaddingH : null;
        switch (this._szAlign) {
            case "center":
                this._oText.x = this._x + this._iWidth / 2;
                break;
            case "left":
                this._oText.x = this._x + this._iPaddingH;
                break;
            case "right":
                this._oText.x = this._x + this._iWidth - this._iPaddingH
        }
        this._oContainer.addChild(this._oText);
        this.refreshText(a)
    },
    setVerticalAlign: function(a) {
        this._bVerticalAlign = a
    },
    setOutline: function(a) {
        null !== this._oText && (this._oText.outline = a)
    },
    setShadow: function(a, c, b, d) {
        null !== this._oText && (this._oText.shadow = new createjs.Shadow(a, c, b, d))
    },
    setColor: function(a) {
        this._oText.color = a
    },
    setAlpha: function(a) {
        this._oText.alpha = a
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
    },
    getY: function() {
        return this._y
    },
    getFontSize: function() {
        return this._iFontSize
    },
    getBounds: function() {
        return this._oText.getBounds()
    },
    refreshText: function(a) {
        "" === a && (a = " ");
        null === this._oText && this.__createText(a);
        this._oText.text = a;
        this._oText.font = this._iStartingFontSize + "px " + this._szFont;
        this._oText.lineHeight = Math.round(this._iStartingFontSize * this._fLineHeightFactor);
        this.__autofit();
        this.__updateY();
        this.__verticalAlign()
    }
};

function CTLText(a, c, b, d, f, e, g, k, l, q, v, u, p, m, w, n, A) {
    this._oContainer = a;
    this._x = c;
    this._y = b;
    this._iWidth = d;
    this._iHeight = f;
    this._bMultiline = n;
    this._iFontSize = this._iStartingFontSize = e;
    this._szAlign = g;
    this._szColor = k;
    this._szFont = l;
    this._iPaddingH = v;
    this._iPaddingV = u;
    this._bVerticalAlign = w;
    this._bFitText = m;
    this._bDebug = A;
    this._oDebugShape = null;
    this._fLineHeightFactor = q;
    this._oText = null;
    p && this.__createText(p)
};