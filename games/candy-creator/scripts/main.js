'use strict';

function u(f, a, b, d) {
    f.v.hc(f.Wa, a, b, d, void 0)
}

function C(f, a, b, d) {
    f.v.pa ? u(f, a, b, d) : f.v.$e()._OnMessageFromDOM({
        type: "event",
        component: f.Wa,
        handler: a,
        dispatchOpts: d || null,
        data: b,
        responseId: null
    })
}

function D(f, a, b) {
    f.v.B(f.Wa, a, b)
}

function E(f, a) {
    for (const [b, d] of a) D(f, b, d)
}

function F(f) {
    f.Lb || (f.v.Ke(f.Ud), f.Lb = !0)
}
window.za = class {
    constructor(f, a) {
        this.v = f;
        this.Wa = a;
        this.Lb = !1;
        this.Ud = () => this.Da()
    }
    Zc() {}
    Da() {}
};

function G(f) {
    -1 !== f.Oa && (self.clearTimeout(f.Oa), f.Oa = -1)
}
window.Be = class {
    constructor(f, a) {
        this.Gc = f;
        this.ng = a;
        this.Oa = -1;
        this.Mb = -Infinity;
        this.Vd = () => {
            this.Oa = -1;
            this.Mb = Date.now();
            this.ab = !0;
            this.Gc();
            this.ab = !1
        };
        this.Ed = this.ab = !1
    }
    c() {
        G(this);
        this.Vd = this.Gc = null
    }
};
"use strict";

function I(f, a) {
    D(f, "get-element", b => {
        const d = f.ca.get(b.elementId);
        return a(d, b)
    })
}
window.Gg = class extends self.za {
    constructor(f, a) {
        super(f, a);
        this.ca = new Map;
        this.Fc = !0;
        E(this, [
            ["create", () => {
                throw Error("required override");
            }],
            ["destroy", b => {
                {
                    b = b.elementId;
                    const d = this.ca.get(b);
                    this.Fc && d.parentElement.removeChild(d);
                    this.ca.delete(b)
                }
            }],
            ["set-visible", b => {
                this.Fc && (this.ca.get(b.elementId).style.display = b.isVisible ? "" : "none")
            }],
            ["update-position", b => {
                if (this.Fc) {
                    var d = this.ca.get(b.elementId);
                    d.style.left = b.left + "px";
                    d.style.top = b.top + "px";
                    d.style.width = b.width + "px";
                    d.style.height =
                        b.height + "px";
                    b = b.fontSize;
                    null !== b && (d.style.fontSize = b + "em")
                }
            }],
            ["update-state", b => {
                this.ca.get(b.elementId);
                throw Error("required override");
            }],
            ["focus", b => this.Ac(b)],
            ["set-css-style", b => {
                this.ca.get(b.elementId).style[b.prop] = b.val
            }],
            ["set-attribute", b => {
                this.ca.get(b.elementId).setAttribute(b.name, b.val)
            }],
            ["remove-attribute", b => {
                this.ca.get(b.elementId).removeAttribute(b.name)
            }]
        ]);
        I(this, b => b)
    }
    Ac(f) {
        var a = this.ca.get(f.elementId);
        f.focus ? a.focus() : a.blur()
    }
};
"use strict"; {
    const f = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(navigator.userAgent);

    function a(v) {
        if (v.xg) {
            const g = document.createElement("script");
            g.async = !1;
            g.textContent = v.Ag;
            document.head.appendChild(g)
        } else return new Promise((g, k) => {
            const c = document.createElement("script");
            c.onload = g;
            c.onerror = k;
            c.async = !1;
            c.src = v;
            document.head.appendChild(c)
        })
    }
    let b = new Audio;
    const d = {
        "audio/webm; codecs=opus": !!b.canPlayType("audio/webm; codecs=opus"),
        "audio/ogg; codecs=opus": !!b.canPlayType("audio/ogg; codecs=opus"),
        "audio/webm; codecs=vorbis": !!b.canPlayType("audio/webm; codecs=vorbis"),
        "audio/ogg; codecs=vorbis": !!b.canPlayType("audio/ogg; codecs=vorbis"),
        "audio/mp4": !!b.canPlayType("audio/mp4"),
        "audio/mpeg": !!b.canPlayType("audio/mpeg")
    };
    b = null;
    async function h(v) {
        v = await n(v);
        return (new TextDecoder("utf-8")).decode(v)
    }

    function n(v) {
        return new Promise((g, k) => {
            const c = new FileReader;
            c.onload = e => g(e.target.result);
            c.onerror = e => k(e);
            c.readAsArrayBuffer(v)
        })
    }
    const q = [];
    let t = 0;
    window.RealFile = window.File;
    const x = [],
        A = new Map,
        w = new Map;
    let y = 0;
    const B = [];
    self.Ng = function(v) {
        if ("function" !== typeof v) throw Error("runOnStartup called without a function");
        B.push(v)
    };
    const z = new Set(["cordova", "playable-ad", "instant-games"]);
    window.Ca = class v {
        constructor(g) {
            this.pa = g.Cg;
            this.na = null;
            this.K = "";
            this.Ub = g.zg;
            this.pb = {};
            this.ma = this.Ha = this.ob = null;
            this.Jb = [];
            this.cb = this.J = this.Ma = null;
            this.La = -1;
            this.sg = () => this.zf();
            this.Ka = [];
            this.C = g.Wd;
            !this.pa || "undefined" !== typeof OffscreenCanvas && navigator.userActivation ||
                (this.pa = !1);
            z.has(this.C) && this.pa && (console.warn("[C3 runtime] Worker mode is enabled and supported, but is disabled in WebViews due to crbug.com/923007. Reverting to DOM mode."), this.pa = !1);
            this.Ob = this.ha = null;
            "html5" !== this.C && "playable-ad" !== this.C || "file" !== location.protocol.substr(0, 4) || alert("Exported games won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)");
            this.B("runtime", "cordova-fetch-local-file", k =>
                this.hf(k));
            this.B("runtime", "create-job-worker", () => this.jf());
            "cordova" === this.C ? document.addEventListener("deviceready", () => this.rd(g)) : this.rd(g)
        }
        c() {
            this.nc();
            this.na && (this.na = this.na.onmessage = null);
            this.ob && (this.ob.terminate(), this.ob = null);
            this.Ha && (this.Ha.c(), this.Ha = null);
            this.J && (this.J.parentElement.removeChild(this.J), this.J = null)
        }
        fd() {
            return f && "cordova" === this.C
        }
        tb() {
            return f && z.has(this.C) || navigator.standalone
        }
        async rd(g) {
            "preview" === this.C && (this.ma = document.createElement("div"),
                this.ma.className = "previewLoadingMessage", this.ma.textContent = g.Lg, document.body.appendChild(this.ma));
            if ("playable-ad" === this.C) {
                this.ha = self.c3_base64files;
                this.Ob = {};
                await this.Qe();
                for (let c = 0, e = g.Pa.length; c < e; ++c) {
                    var k = g.Pa[c].toLowerCase();
                    this.Ob.hasOwnProperty(k) ? g.Pa[c] = {
                        xg: !0,
                        Ag: this.Ob[k]
                    } : this.ha.hasOwnProperty(k) && (g.Pa[c] = URL.createObjectURL(this.ha[k]))
                }
            }
            g.ug ? this.K = g.ug : (k = location.origin, this.K = ("null" === k ? "file:///" : k) + location.pathname, k = this.K.lastIndexOf("/"), -1 !== k && (this.K =
                this.K.substr(0, k + 1)));
            if (g.Eg)
                for (const [c, e] of Object.entries(g.Eg)) this.pb[c] = URL.createObjectURL(e);
            k = new MessageChannel;
            this.na = k.port1;
            this.na.onmessage = c => this._OnMessageFromRuntime(c.data);
            window.c3_addPortMessageHandler && window.c3_addPortMessageHandler(c => this.vf(c));
            this.cb = new self.xe(this);
            await J(this.cb);
            this.gd();
            "object" === typeof window.StatusBar && window.StatusBar.hide();
            "object" === typeof window.AndroidFullScreen && window.AndroidFullScreen.immersiveMode();
            this.pa ? await this.cf(g, k.port2) :
                await this.bf(g, k.port2)
        }
        qc(g) {
            return this.pb.hasOwnProperty(g) ? this.pb[g] : g.endsWith("/workermain.js") && this.pb.hasOwnProperty("workermain.js") ? this.pb["workermain.js"] : "playable-ad" === this.C && this.ha.hasOwnProperty(g.toLowerCase()) ? URL.createObjectURL(this.ha[g.toLowerCase()]) : g
        }
        async $b(g, k, c) {
            if (g.startsWith("blob:")) return new Worker(g, c);
            if (this.fd() && "file:" === location.protocol) return g = await this.Zb(this.Ub + g), new Worker(URL.createObjectURL(new Blob([g], {
                type: "application/javascript"
            })), c);
            g = new URL(g, k);
            if (location.origin !== g.origin) {
                g = await fetch(g);
                if (!g.ok) throw Error("failed to fetch worker script");
                g = await g.blob();
                return new Worker(URL.createObjectURL(g), c)
            }
            return new Worker(g, c)
        }
        ua() {
            return Math.max(window.innerWidth, 1)
        }
        ta() {
            return Math.max(window.innerHeight, 1)
        }
        gd() {
            if (this.tb()) {
                const g = document.documentElement.style,
                    k = document.body.style,
                    c = window.innerWidth < window.innerHeight,
                    e = c ? window.screen.width : window.screen.height;
                k.height = g.height = (c ? window.screen.height : window.screen.width) +
                    "px";
                k.width = g.width = e + "px"
            }
        }
        qd(g) {
            var k = this.cb;
            return {
                baseUrl: this.K,
                windowInnerWidth: this.ua(),
                windowInnerHeight: this.ta(),
                devicePixelRatio: window.devicePixelRatio,
                isFullscreen: v.fc(),
                projectData: g.Mg,
                previewImageBlobs: window.cr_previewImageBlobs || this.ha,
                previewProjectFileBlobs: window.cr_previewProjectFileBlobs,
                exportType: g.Wd,
                isDebug: -1 < self.location.search.indexOf("debug"),
                ife: !!self.Kg,
                jobScheduler: {
                    inputPort: k.Mc,
                    outputPort: k.Tc,
                    maxNumWorkers: k.pg
                },
                supportedAudioFormats: d,
                opusWasmScriptUrl: window.cr_opusWasmScriptUrl ||
                    this.Ub + "opus.wasm.js",
                opusWasmBinaryUrl: window.cr_opusWasmBinaryUrl || this.Ub + "opus.wasm.wasm",
                isiOSCordova: this.fd(),
                isiOSWebView: this.tb(),
                isFBInstantAvailable: "undefined" !== typeof self.FBInstant
            }
        }
        async cf(g, k) {
            var c = this.qc(g.Dg);
            this.ob = await this.$b(c, this.K, {
                name: "Runtime"
            });
            this.J = document.createElement("canvas");
            this.J.style.display = "none";
            c = this.J.transferControlToOffscreen();
            document.body.appendChild(this.J);
            window.c3canvas = this.J;
            this.ob.postMessage(Object.assign(this.qd(g), {
                type: "init-runtime",
                isInWorker: !0,
                messagePort: k,
                canvas: c,
                workerDependencyScripts: g.Yc || [],
                engineScripts: g.Pa,
                projectScripts: window.Jg,
                projectScriptsStatus: self.C3_ProjectScriptsStatus
            }), [k, c, ...K(this.cb)]);
            this.Jb = x.map(e => new e(this));
            this.pd();
            self.c3_callFunction = (e, l) => this.Ma.df(e, l);
            "preview" === this.C && (self.goToLastErrorScript = () => this.hc("runtime", "go-to-last-error-script"))
        }
        async bf(g, k) {
            this.J = document.createElement("canvas");
            this.J.style.display = "none";
            document.body.appendChild(this.J);
            window.c3canvas = this.J;
            this.Jb = x.map(e => new e(this));
            this.pd();
            const c = g.Pa.map(e => "string" === typeof e ? (new URL(e, this.K)).toString() : e);
            Array.isArray(g.Yc) && c.unshift(...g.Yc);
            await Promise.all(c.map(e => a(e)));
            if (g.Xd && 0 < g.Xd.length) {
                const e = self.C3_ProjectScriptsStatus;
                try {
                    if (await Promise.all(g.Xd.map(l => a(l[1]))), Object.values(e).some(l => !l)) {
                        self.setTimeout(() => this.zd(e), 100);
                        return
                    }
                } catch (l) {
                    console.error("[Preview] Error loading project scripts: ", l);
                    self.setTimeout(() => this.zd(e), 100);
                    return
                }
            }
            "preview" === this.C &&
                "object" !== typeof self.Fg.Hg ? (this.Db(), console.error("[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."), alert("Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.")) : (g = Object.assign(this.qd(g), {
                    isInWorker: !1,
                    messagePort: k,
                    canvas: this.J,
                    runOnStartupFunctions: B
                }), this.td(), this.Ha = self.C3_CreateRuntime(g), await self.C3_InitRuntime(this.Ha, g))
        }
        zd(g) {
            this.Db();
            g = `Failed to load project script '${Object.entries(g).filter(k=>
!k[1]).map(k=>k[0])[0]}'. Check all your JavaScript code has valid syntax.`;
            console.error("[Preview] " + g);
            alert(g)
        }
        td() {
            this.Db()
        }
        Db() {
            this.ma && (this.ma.parentElement.removeChild(this.ma), this.ma = null)
        }
        async jf() {
            const g = await L(this.cb);
            return {
                outputPort: g,
                transferables: [g]
            }
        }
        $e() {
            if (this.pa) throw Error("not available in worker mode");
            return this.Ha
        }
        hc(g, k, c, e, l) {
            this.na.postMessage({
                type: "event",
                component: g,
                handler: k,
                dispatchOpts: e || null,
                data: c,
                responseId: null
            }, l)
        }
        hd(g, k, c, e, l) {
            const m = y++,
                p = new Promise((r,
                    H) => {
                    w.set(m, {
                        resolve: r,
                        reject: H
                    })
                });
            this.na.postMessage({
                type: "event",
                component: g,
                handler: k,
                dispatchOpts: e || null,
                data: c,
                responseId: m
            }, l);
            return p
        }["_OnMessageFromRuntime"](g) {
            const k = g.type;
            if ("event" === k) return this.pf(g);
            if ("result" === k) this.Cf(g);
            else if ("runtime-ready" === k) this.Df();
            else if ("alert-error" === k) this.Db(), alert(g.message);
            else if ("creating-runtime" === k) this.td();
            else throw Error(`unknown message '${k}'`);
        }
        pf(g) {
            const k = g.component,
                c = g.handler,
                e = g.data,
                l = g.responseId;
            if (g = A.get(k))
                if (g =
                    g.get(c)) {
                    var m = null;
                    try {
                        m = g(e)
                    } catch (p) {
                        console.error(`Exception in '${k}' handler '${c}':`, p);
                        null !== l && this.Bb(l, !1, "" + p);
                        return
                    }
                    if (null === l) return m;
                    m && m.then ? m.then(p => this.Bb(l, !0, p)).catch(p => {
                        console.error(`Rejection from '${k}' handler '${c}':`, p);
                        this.Bb(l, !1, "" + p)
                    }) : this.Bb(l, !0, m)
                } else console.warn(`[DOM] No handler '${c}' for component '${k}'`);
            else console.warn(`[DOM] No event handlers for component '${k}'`)
        }
        Bb(g, k, c) {
            let e;
            c && c.transferables && (e = c.transferables);
            this.na.postMessage({
                type: "result",
                responseId: g,
                isOk: k,
                result: c
            }, e)
        }
        Cf(g) {
            const k = g.responseId,
                c = g.isOk;
            g = g.result;
            const e = w.get(k);
            c ? e.resolve(g) : e.reject(g);
            w.delete(k)
        }
        B(g, k, c) {
            let e = A.get(g);
            e || (e = new Map, A.set(g, e));
            if (e.has(k)) throw Error(`[DOM] Component '${g}' already has handler '${k}'`);
            e.set(k, c)
        }
        static Qa(g) {
            if (x.includes(g)) throw Error("DOM handler already added");
            x.push(g)
        }
        pd() {
            for (const g of this.Jb)
                if ("runtime" === g.Wa) {
                    this.Ma = g;
                    return
                }
            throw Error("cannot find runtime DOM handler");
        }
        vf(g) {
            this.hc("debugger", "message",
                g)
        }
        Df() {
            for (const g of this.Jb) g.Zc()
        }
        static fc() {
            return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
        }
        Ke(g) {
            this.Ka.push(g);
            this.Dc()
        }
        Of(g) {
            g = this.Ka.indexOf(g);
            if (-1 === g) throw Error("invalid callback");
            this.Ka.splice(g, 1);
            this.Ka.length || this.nc()
        }
        Dc() {
            -1 === this.La && this.Ka.length && (this.La = requestAnimationFrame(this.sg))
        }
        nc() {
            -1 !== this.La && (cancelAnimationFrame(this.La), this.La = -1)
        }
        zf() {
            this.La = -1;
            for (const g of this.Ka) g();
            this.Dc()
        }
        sa(g) {
            this.Ma.sa(g)
        }
        Ba(g) {
            this.Ma.Ba(g)
        }
        Cc() {
            this.Ma.Cc()
        }
        wb(g) {
            this.Ma.wb(g)
        }
        ve() {
            return !!d["audio/webm; codecs=opus"]
        }
        async lg(g) {
            g =
                await this.hd("runtime", "opus-decode", {
                    arrayBuffer: g
                }, null, [g]);
            return new Float32Array(g)
        }
        ue(g) {
            return /^(?:[a-z]+:)?\/\//.test(g) || "data:" === g.substr(0, 5) || "blob:" === g.substr(0, 5)
        }
        we(g) {
            return !this.ue(g)
        }
        async hf(g) {
            const k = g.filename;
            switch (g.as) {
                case "text":
                    return await this.ne(k);
                case "buffer":
                    return await this.Zb(k);
                default:
                    throw Error("unsupported type");
            }
        }
        bd(g) {
            const k = window.cordova.file.applicationDirectory + "www/" + g.toLowerCase();
            return new Promise((c, e) => {
                window.resolveLocalFileSystemURL(k,
                    l => {
                        l.file(c, e)
                    }, e)
            })
        }
        async ne(g) {
            g = await this.bd(g);
            return await h(g)
        }
        oc() {
            if (q.length && !(8 <= t)) {
                t++;
                var g = q.shift();
                this.Re(g.filename, g.Bg, g.wg)
            }
        }
        Zb(g) {
            return new Promise((k, c) => {
                q.push({
                    filename: g,
                    Bg: e => {
                        t--;
                        this.oc();
                        k(e)
                    },
                    wg: e => {
                        t--;
                        this.oc();
                        c(e)
                    }
                });
                this.oc()
            })
        }
        async Re(g, k, c) {
            try {
                const e = await this.bd(g),
                    l = await n(e);
                k(l)
            } catch (e) {
                c(e)
            }
        }
        async Qe() {
            const g = [];
            for (const [k, c] of Object.entries(this.ha)) g.push(this.Pe(k, c));
            await Promise.all(g)
        }
        async Pe(g, k) {
            if ("object" === typeof k) this.ha[g] =
                new Blob([k.str], {
                    type: k.type
                }), this.Ob[g] = k.str;
            else {
                let c = await this.Ye(k);
                c || (c = this.Te(k));
                this.ha[g] = c
            }
        }
        async Ye(g) {
            try {
                return await (await fetch(g)).blob()
            } catch (k) {
                return console.warn("Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.", k), null
            }
        }
        Te(g) {
            g = this.If(g);
            return this.Ne(g.data, g.yg)
        }
        If(g) {
            var k = g.indexOf(",");
            if (0 > k) throw new URIError("expected comma in data: uri");
            var c = g.substring(k + 1);
            k = g.substring(5, k).split(";");
            g = k[0] || "";
            const e = k[2];
            c = "base64" === k[1] || "base64" === e ? atob(c) : decodeURIComponent(c);
            return {
                yg: g,
                data: c
            }
        }
        Ne(g, k) {
            var c = g.length;
            let e = c >> 2,
                l = new Uint8Array(c),
                m = new Uint32Array(l.buffer, 0, e),
                p, r;
            for (r = p = 0; p < e; ++p) m[p] = g.charCodeAt(r++) | g.charCodeAt(r++) << 8 | g.charCodeAt(r++) << 16 | g.charCodeAt(r++) << 24;
            for (c &= 3; c--;) l[r] = g.charCodeAt(r), ++r;
            return new Blob([l], {
                type: k
            })
        }
    }
}
"use strict"; {
    const f = self.Ca;

    function a(c) {
        return c.sourceCapabilities && c.sourceCapabilities.firesTouchEvents || c.originalEvent && c.originalEvent.sourceCapabilities && c.originalEvent.sourceCapabilities.firesTouchEvents
    }
    const b = new Map([
            ["OSLeft", "MetaLeft"],
            ["OSRight", "MetaRight"]
        ]),
        d = {
            dispatchRuntimeEvent: !0,
            dispatchUserScriptEvent: !0
        },
        h = {
            dispatchUserScriptEvent: !0
        },
        n = {
            dispatchRuntimeEvent: !0
        };

    function q(c) {
        return new Promise((e, l) => {
            const m = document.createElement("link");
            m.onload = () => e(m);
            m.onerror = p => l(p);
            m.rel =
                "stylesheet";
            m.href = c;
            document.head.appendChild(m)
        })
    }

    function t(c) {
        return new Promise((e, l) => {
            const m = new Image;
            m.onload = () => e(m);
            m.onerror = p => l(p);
            m.src = c
        })
    }
    async function x(c) {
        c = URL.createObjectURL(c);
        try {
            return await t(c)
        } finally {
            URL.revokeObjectURL(c)
        }
    }

    function A(c) {
        return new Promise((e, l) => {
            let m = new FileReader;
            m.onload = p => e(p.target.result);
            m.onerror = p => l(p);
            m.readAsText(c)
        })
    }
    async function w(c, e, l) {
        if (!/firefox/i.test(navigator.userAgent)) return await x(c);
        var m = await A(c);
        m = (new DOMParser).parseFromString(m,
            "image/svg+xml");
        const p = m.documentElement;
        if (p.hasAttribute("width") && p.hasAttribute("height")) {
            const r = p.getAttribute("width"),
                H = p.getAttribute("height");
            if (!r.includes("%") && !H.includes("%")) return await x(c)
        }
        p.setAttribute("width", e + "px");
        p.setAttribute("height", l + "px");
        m = (new XMLSerializer).serializeToString(m);
        c = new Blob([m], {
            type: "image/svg+xml"
        });
        return await x(c)
    }

    function y(c) {
        do {
            if (c.parentNode && c.hasAttribute("contenteditable")) return !0;
            c = c.parentNode
        } while (c);
        return !1
    }
    const B = new Set(["canvas",
        "body", "html"
    ]);

    function z(c) {
        B.has(c.target.tagName.toLowerCase()) && c.preventDefault()
    }

    function v(c) {
        (c.metaKey || c.ctrlKey) && c.preventDefault()
    }
    self.C3_GetSvgImageSize = async function(c) {
        c = await x(c);
        if (0 < c.width && 0 < c.height) return [c.width, c.height]; {
            c.style.position = "absolute";
            c.style.left = "0px";
            c.style.top = "0px";
            c.style.visibility = "hidden";
            document.body.appendChild(c);
            const e = c.getBoundingClientRect();
            document.body.removeChild(c);
            return [e.width, e.height]
        }
    };
    self.C3_RasterSvgImageBlob = async function(c,
        e, l, m, p) {
        c = await w(c, e, l);
        const r = document.createElement("canvas");
        r.width = m;
        r.height = p;
        r.getContext("2d").drawImage(c, 0, 0, e, l);
        return r
    };
    let g = !1;
    document.addEventListener("pause", () => g = !0);
    document.addEventListener("resume", () => g = !1);

    function k() {
        try {
            return window.parent && window.parent.document.hasFocus()
        } catch (c) {
            return !1
        }
    }
    f.Qa(class extends self.za {
        constructor(c) {
            super(c, "runtime");
            this.Jd = !0;
            this.Na = -1;
            this.Vc = "any";
            this.Ad = this.Bd = !1;
            this.Pc = this.lb = this.wa = null;
            c.B("canvas", "update-size", m =>
                this.Gf(m));
            c.B("runtime", "invoke-download", m => this.tf(m));
            c.B("runtime", "raster-svg-image", m => this.Af(m));
            c.B("runtime", "get-svg-image-size", m => this.rf(m));
            c.B("runtime", "set-target-orientation", m => this.Ef(m));
            c.B("runtime", "register-sw", () => this.Bf());
            c.B("runtime", "post-to-debugger", m => this.vd(m));
            c.B("runtime", "go-to-script", m => this.vd(m));
            c.B("runtime", "before-start-ticking", () => this.gf());
            c.B("runtime", "debug-highlight", m => this.kf(m));
            c.B("runtime", "enable-device-orientation", () => this.Me());
            c.B("runtime", "enable-device-motion", () => this.Le());
            c.B("runtime", "add-stylesheet", m => this.ff(m));
            c.B("runtime", "alert", m => this.uc(m));
            c.B("runtime", "hide-cordova-splash", () => this.sf());
            const e = new Set(["input", "textarea", "datalist"]);
            window.addEventListener("contextmenu", m => {
                const p = m.target;
                e.has(p.tagName.toLowerCase()) || y(p) || m.preventDefault()
            });
            const l = c.J;
            window.addEventListener("selectstart", z);
            window.addEventListener("gesturehold", z);
            l.addEventListener("selectstart", z);
            l.addEventListener("gesturehold",
                z);
            window.addEventListener("touchstart", z, {
                passive: !1
            });
            "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", z, {
                passive: !1
            }), l.addEventListener("pointerdown", z)) : l.addEventListener("touchstart", z);
            this.ib = 0;
            window.addEventListener("mousedown", m => {
                1 === m.button && m.preventDefault()
            });
            window.addEventListener("mousewheel", v, {
                passive: !1
            });
            window.addEventListener("wheel", v, {
                passive: !1
            });
            window.addEventListener("resize", () => this.Hf());
            c.tb() && window.addEventListener("focusout", () => {
                {
                    const r =
                        document.activeElement;
                    if (r) {
                        var m = r.tagName.toLowerCase();
                        var p = new Set("email number password search tel text url".split(" "));
                        m = "textarea" === m ? !0 : "input" === m ? p.has(r.type.toLowerCase() || "text") : y(r)
                    } else m = !1
                }
                m || (document.scrollingElement.scrollTop = 0)
            });
            this.Ia = new Set;
            this.Pb = new WeakSet;
            this.la = !1
        }
        gf() {
            "cordova" === this.v.C ? (document.addEventListener("pause", () => this.Bc(!0)), document.addEventListener("resume", () => this.Bc(!1))) : document.addEventListener("visibilitychange", () => this.Bc(document.hidden));
            return {
                isSuspended: !(!document.hidden && !g)
            }
        }
        Zc() {
            window.addEventListener("focus", () => this.Cb("window-focus"));
            window.addEventListener("blur", () => {
                this.Cb("window-blur", {
                    parentHasFocus: k()
                });
                this.ib = 0
            });
            window.addEventListener("fullscreenchange", () => this.wc());
            window.addEventListener("webkitfullscreenchange", () => this.wc());
            window.addEventListener("mozfullscreenchange", () => this.wc());
            window.addEventListener("fullscreenerror", e => this.xc(e));
            window.addEventListener("webkitfullscreenerror", e => this.xc(e));
            window.addEventListener("mozfullscreenerror", e => this.xc(e));
            window.addEventListener("keydown", e => this.ud("keydown", e));
            window.addEventListener("keyup", e => this.ud("keyup", e));
            window.addEventListener("dblclick", e => this.yc("dblclick", e, d));
            window.addEventListener("wheel", e => this.xf(e));
            "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", e => {
                this.rc(e);
                this.Ua("pointerdown", e)
            }), this.v.pa && "undefined" !== typeof window.onpointerrawupdate && self === self.top ? (this.lb = new self.Be(() => this.We(),
                5), this.lb.Ed = !0, window.addEventListener("pointerrawupdate", e => this.yf(e))) : window.addEventListener("pointermove", e => this.Ua("pointermove", e)), window.addEventListener("pointerup", e => this.Ua("pointerup", e)), window.addEventListener("pointercancel", e => this.Ua("pointercancel", e))) : (window.addEventListener("mousedown", e => {
                this.rc(e);
                this.zc("pointerdown", e)
            }), window.addEventListener("mousemove", e => this.zc("pointermove", e)), window.addEventListener("mouseup", e => this.zc("pointerup", e)), window.addEventListener("touchstart",
                e => {
                    this.rc(e);
                    this.Ab("pointerdown", e)
                }), window.addEventListener("touchmove", e => this.Ab("pointermove", e)), window.addEventListener("touchend", e => this.Ab("pointerup", e)), window.addEventListener("touchcancel", e => this.Ab("pointercancel", e)));
            const c = () => this.Cc();
            window.addEventListener("pointerup", c, !0);
            window.addEventListener("touchend", c, !0);
            window.addEventListener("click", c, !0);
            window.addEventListener("keydown", c, !0);
            window.addEventListener("gamepadconnected", c, !0)
        }
        Cb(c, e) {
            u(this, c, e || null, n)
        }
        ua() {
            return this.v.ua()
        }
        ta() {
            return this.v.ta()
        }
        Hf() {
            const c =
                this.ua(),
                e = this.ta();
            this.Cb("window-resize", {
                innerWidth: c,
                innerHeight: e,
                devicePixelRatio: window.devicePixelRatio
            });
            this.v.tb() && (-1 !== this.Na && clearTimeout(this.Na), this.wd(c, e, 0))
        }
        Pf(c, e, l) {
            -1 !== this.Na && clearTimeout(this.Na);
            this.Na = setTimeout(() => this.wd(c, e, l), 48)
        }
        wd(c, e, l) {
            const m = this.ua(),
                p = this.ta();
            this.Na = -1;
            m != c || p != e ? this.Cb("window-resize", {
                innerWidth: m,
                innerHeight: p,
                devicePixelRatio: window.devicePixelRatio
            }) : 10 > l && this.Pf(m, p, l + 1)
        }
        Ef(c) {
            this.Vc = c.targetOrientation
        }
        hg() {
            const c = this.Vc;
            if (screen.orientation && screen.orientation.lock) screen.orientation.lock(c).catch(e => console.warn("[Construct 3] Failed to lock orientation: ", e));
            else try {
                let e = !1;
                screen.lockOrientation ? e = screen.lockOrientation(c) : screen.webkitLockOrientation ? e = screen.webkitLockOrientation(c) : screen.mozLockOrientation ? e = screen.mozLockOrientation(c) : screen.msLockOrientation && (e = screen.msLockOrientation(c));
                e || console.warn("[Construct 3] Failed to lock orientation")
            } catch (e) {
                console.warn("[Construct 3] Failed to lock orientation: ",
                    e)
            }
        }
        wc() {
            const c = f.fc();
            c && "any" !== this.Vc && this.hg();
            u(this, "fullscreenchange", {
                isFullscreen: c,
                innerWidth: this.ua(),
                innerHeight: this.ta()
            })
        }
        xc(c) {
            console.warn("[Construct 3] Fullscreen request failed: ", c);
            u(this, "fullscreenerror", {
                isFullscreen: f.fc(),
                innerWidth: this.ua(),
                innerHeight: this.ta()
            })
        }
        Bc(c) {
            c ? this.v.nc() : this.v.Dc();
            u(this, "visibilitychange", {
                hidden: c
            })
        }
        ud(c, e) {
            "Backspace" === e.key && z(e);
            const l = b.get(e.code) || e.code;
            C(this, c, {
                code: l,
                key: e.key,
                which: e.which,
                repeat: e.repeat,
                altKey: e.altKey,
                ctrlKey: e.ctrlKey,
                metaKey: e.metaKey,
                shiftKey: e.shiftKey,
                timeStamp: e.timeStamp
            }, d)
        }
        xf(c) {
            u(this, "wheel", {
                clientX: c.clientX,
                clientY: c.clientY,
                pageX: c.pageX,
                pageY: c.pageY,
                deltaX: c.deltaX,
                deltaY: c.deltaY,
                deltaZ: c.deltaZ,
                deltaMode: c.deltaMode,
                timeStamp: c.timeStamp
            }, d)
        }
        yc(c, e, l) {
            a(e) || C(this, c, {
                button: e.button,
                buttons: e.buttons,
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                timeStamp: e.timeStamp
            }, l)
        }
        zc(c, e) {
            if (!a(e)) {
                var l = this.ib;
                "pointerdown" === c && 0 !== l ? c = "pointermove" : "pointerup" ===
                    c && 0 !== e.buttons && (c = "pointermove");
                C(this, c, {
                    pointerId: 1,
                    pointerType: "mouse",
                    button: e.button,
                    buttons: e.buttons,
                    lastButtons: l,
                    clientX: e.clientX,
                    clientY: e.clientY,
                    pageX: e.pageX,
                    pageY: e.pageY,
                    width: 0,
                    height: 0,
                    pressure: 0,
                    tangentialPressure: 0,
                    tiltX: 0,
                    tiltY: 0,
                    twist: 0,
                    timeStamp: e.timeStamp
                }, d);
                this.ib = e.buttons;
                this.yc(e.type, e, h)
            }
        }
        Ua(c, e) {
            if (this.lb && "pointermove" !== c) {
                var l = this.lb;
                l.ab || (G(l), l.Mb = Date.now())
            }
            l = 0;
            "mouse" === e.pointerType && (l = this.ib);
            C(this, c, {
                pointerId: e.pointerId,
                pointerType: e.pointerType,
                button: e.button,
                buttons: e.buttons,
                lastButtons: l,
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                width: e.width || 0,
                height: e.height || 0,
                pressure: e.pressure || 0,
                tangentialPressure: e.tangentialPressure || 0,
                tiltX: e.tiltX || 0,
                tiltY: e.tiltY || 0,
                twist: e.twist || 0,
                timeStamp: e.timeStamp
            }, d);
            "mouse" === e.pointerType && (l = "mousemove", "pointerdown" === c ? l = "mousedown" : "pointerup" === c && (l = "pointerup"), this.yc(l, e, h), this.ib = e.buttons)
        }
        yf(c) {
            this.Pc = c;
            c = this.lb;
            if (-1 === c.Oa) {
                var e = Date.now(),
                    l = e - c.Mb,
                    m = c.ng;
                l >= m && c.Ed ? (c.Mb = e, c.ab = !0, c.Gc(), c.ab = !1) : c.Oa = self.setTimeout(c.Vd, Math.max(m - l, 4))
            }
        }
        We() {
            this.Ua("pointermove", this.Pc);
            this.Pc = null
        }
        Ab(c, e) {
            for (let l = 0, m = e.changedTouches.length; l < m; ++l) {
                const p = e.changedTouches[l];
                C(this, c, {
                    pointerId: p.identifier,
                    pointerType: "touch",
                    button: 0,
                    buttons: 0,
                    lastButtons: 0,
                    clientX: p.clientX,
                    clientY: p.clientY,
                    pageX: p.pageX,
                    pageY: p.pageY,
                    width: 2 * (p.radiusX || p.webkitRadiusX || 0),
                    height: 2 * (p.radiusY || p.webkitRadiusY || 0),
                    pressure: p.force || p.webkitForce || 0,
                    tangentialPressure: 0,
                    tiltX: 0,
                    tiltY: 0,
                    twist: p.rotationAngle || 0,
                    timeStamp: e.timeStamp
                }, d)
            }
        }
        rc(c) {
            window !== window.top && window.focus();
            this.sd(c.target) && document.activeElement && !this.sd(document.activeElement) && document.activeElement.blur()
        }
        sd(c) {
            return !c || c === document || c === window || c === document.body || "canvas" === c.tagName.toLowerCase()
        }
        Me() {
            this.Bd || (this.Bd = !0, window.addEventListener("deviceorientation", c => this.mf(c)), window.addEventListener("deviceorientationabsolute", c => this.nf(c)))
        }
        Le() {
            this.Ad || (this.Ad = !0, window.addEventListener("devicemotion",
                c => this.lf(c)))
        }
        mf(c) {
            u(this, "deviceorientation", {
                absolute: !!c.absolute,
                alpha: c.alpha || 0,
                beta: c.beta || 0,
                gamma: c.gamma || 0,
                timeStamp: c.timeStamp,
                webkitCompassHeading: c.webkitCompassHeading,
                webkitCompassAccuracy: c.webkitCompassAccuracy
            }, d)
        }
        nf(c) {
            u(this, "deviceorientationabsolute", {
                absolute: !!c.absolute,
                alpha: c.alpha || 0,
                beta: c.beta || 0,
                gamma: c.gamma || 0,
                timeStamp: c.timeStamp
            }, d)
        }
        lf(c) {
            let e = null;
            var l = c.acceleration;
            l && (e = {
                x: l.x || 0,
                y: l.y || 0,
                z: l.z || 0
            });
            l = null;
            var m = c.accelerationIncludingGravity;
            m && (l = {
                x: m.x ||
                    0,
                y: m.y || 0,
                z: m.z || 0
            });
            m = null;
            const p = c.rotationRate;
            p && (m = {
                alpha: p.alpha || 0,
                beta: p.beta || 0,
                gamma: p.gamma || 0
            });
            u(this, "devicemotion", {
                acceleration: e,
                accelerationIncludingGravity: l,
                rotationRate: m,
                interval: c.interval,
                timeStamp: c.timeStamp
            }, d)
        }
        Gf(c) {
            const e = this.v,
                l = e.J;
            l.style.width = c.styleWidth + "px";
            l.style.height = c.styleHeight + "px";
            l.style.marginLeft = c.marginLeft + "px";
            l.style.marginTop = c.marginTop + "px";
            e.gd();
            this.Jd && (l.style.display = "", this.Jd = !1)
        }
        tf(c) {
            const e = c.url;
            c = c.filename;
            const l = document.createElement("a"),
                m = document.body;
            l.textContent = c;
            l.href = e;
            l.download = c;
            m.appendChild(l);
            l.click();
            m.removeChild(l)
        }
        async Af(c) {
            var e = c.imageBitmapOpts;
            c = await self.C3_RasterSvgImageBlob(c.blob, c.imageWidth, c.imageHeight, c.surfaceWidth, c.surfaceHeight);
            e = e ? await createImageBitmap(c, e) : await createImageBitmap(c);
            return {
                imageBitmap: e,
                transferables: [e]
            }
        }
        async rf(c) {
            return await self.C3_GetSvgImageSize(c.blob)
        }
        async ff(c) {
            await q(c.url)
        }
        Cc() {
            var c = [...this.Ia];
            this.Ia.clear();
            if (!this.la)
                for (const e of c)(c = e.play()) &&
                    c.catch(() => {
                        this.Pb.has(e) || this.Ia.add(e)
                    })
        }
        sa(c) {
            if ("function" !== typeof c.play) throw Error("missing play function");
            this.Pb.delete(c);
            let e;
            try {
                e = c.play()
            } catch (l) {
                this.Ia.add(c);
                return
            }
            e && e.catch(() => {
                this.Pb.has(c) || this.Ia.add(c)
            })
        }
        Ba(c) {
            this.Ia.delete(c);
            this.Pb.add(c)
        }
        wb(c) {
            this.la = !!c
        }
        sf() {
            navigator.splashscreen && navigator.splashscreen.hide && navigator.splashscreen.hide()
        }
        kf(c) {
            if (c.show) {
                this.wa || (this.wa = document.createElement("div"), this.wa.id = "inspectOutline", document.body.appendChild(this.wa));
                var e = this.wa;
                e.style.display = "";
                e.style.left = c.left - 1 + "px";
                e.style.top = c.top - 1 + "px";
                e.style.width = c.width + 2 + "px";
                e.style.height = c.height + 2 + "px";
                e.textContent = c.name
            } else this.wa && (this.wa.style.display = "none")
        }
        Bf() {
            window.C3_RegisterSW && window.C3_RegisterSW()
        }
        vd(c) {
            window.c3_postToMessagePort && (c.from = "runtime", window.c3_postToMessagePort(c))
        }
        df(c, e) {
            return this.v.hd(this.Wa, "js-invoke-function", {
                name: c,
                params: e
            }, void 0, void 0)
        }
        uc(c) {
            alert(c.message)
        }
    })
}
"use strict";
async function J(f) {
    if (f.mg) throw Error("already initialised");
    f.mg = !0;
    var a = f.Tb.qc("dispatchworker.js");
    f.Ic = await f.Tb.$b(a, f.K, {
        name: "DispatchWorker"
    });
    a = new MessageChannel;
    f.Mc = a.port1;
    f.Ic.postMessage({
        type: "_init",
        "in-port": a.port2
    }, [a.port2]);
    f.Tc = await L(f)
}

function K(f) {
    return [f.Mc, f.Tc]
}
async function L(f) {
    const a = f.Kd.length;
    var b = f.Tb.qc("jobworker.js");
    b = await f.Tb.$b(b, f.K, {
        name: "JobWorker" + a
    });
    const d = new MessageChannel,
        h = new MessageChannel;
    f.Ic.postMessage({
        type: "_addJobWorker",
        port: d.port1
    }, [d.port1]);
    b.postMessage({
        type: "init",
        number: a,
        "dispatch-port": d.port2,
        "output-port": h.port2
    }, [d.port2, h.port2]);
    f.Kd.push(b);
    return h.port1
}
self.xe = class {
    constructor(f) {
        this.Tb = f;
        this.K = f.K;
        this.K = "preview" === f.C ? this.K + "c3/workers/" : this.K + f.Ub;
        this.pg = Math.min(navigator.hardwareConcurrency || 2, 16);
        this.Ic = null;
        this.Kd = [];
        this.Tc = this.Mc = null
    }
};
"use strict";
window.C3_IsSupported && (window.c3_runtimeInterface = new self.Ca({
    Cg: !0,
    Dg: "workermain.js",
    Pa: ["scripts/c3runtime.js"],
    zg: "scripts/",
    Yc: ["box2d.wasm.js"],
    Wd: "html5"
}));
"use strict";
async function M(f, a) {
    a = a.type;
    let b = !0;
    0 === a ? b = await N() : 1 === a && (b = await O());
    u(f, "permission-result", {
        type: a,
        result: b
    })
}
async function N() {
    if (!self.DeviceOrientationEvent || !self.DeviceOrientationEvent.requestPermission) return !0;
    try {
        return "granted" === await self.DeviceOrientationEvent.requestPermission()
    } catch (f) {
        return console.warn("[Touch] Failed to request orientation permission: ", f), !1
    }
}
async function O() {
    if (!self.DeviceMotionEvent || !self.DeviceMotionEvent.requestPermission) return !0;
    try {
        return "granted" === await self.DeviceMotionEvent.requestPermission()
    } catch (f) {
        return console.warn("[Touch] Failed to request motion permission: ", f), !1
    }
}
self.Ca.Qa(class extends self.za {
    constructor(f) {
        super(f, "touch");
        D(this, "request-permission", a => M(this, a))
    }
});
"use strict"; {
    const f = 180 / Math.PI;
    self.da = class extends self.za {
        constructor(a) {
            super(a, "audio");
            this.Ib = this.f = null;
            this.Kb = this.Lc = !1;
            this.oa = () => this.ig();
            this.aa = [];
            this.D = [];
            this.ga = null;
            this.Ld = "";
            this.Md = -1;
            this.kb = new Map;
            this.Qc = 1;
            this.la = !1;
            this.Wc = 0;
            this.Wb = 1;
            this.Jc = 0;
            this.Od = "HRTF";
            this.Fd = "inverse";
            this.Pd = 600;
            this.Nd = 1E4;
            this.Rd = 1;
            this.Hd = this.Uc = !1;
            this.tg = this.v.ve();
            this.ba = new Map;
            this.Fa = new Set;
            this.Nc = !1;
            this.Rc = "";
            this.xa = null;
            self.C3Audio_OnMicrophoneStream = (b, d) => this.wf(b, d);
            this.Hb = null;
            self.C3Audio_GetOutputStream = () => this.qf();
            self.C3Audio_DOMInterface = this;
            E(this, [
                ["create-audio-context", b => this.Se(b)],
                ["play", b => this.Jf(b)],
                ["stop", b => this.fg(b)],
                ["stop-all", () => this.gg()],
                ["set-paused", b => this.Zf(b)],
                ["set-volume", b => this.dg(b)],
                ["fade-volume", b => this.Xe(b)],
                ["set-master-volume", b => this.Xf(b)],
                ["set-muted", b => this.Yf(b)],
                ["set-silent", b => this.ag(b)],
                ["set-looping", b => this.Wf(b)],
                ["set-playback-rate", b => this.$f(b)],
                ["seek", b => this.Qf(b)],
                ["preload", b => this.Kf(b)],
                ["unload", b =>
                    this.jg(b)
                ],
                ["unload-all", () => this.kg()],
                ["set-suspended", b => this.bg(b)],
                ["add-effect", b => this.nd(b)],
                ["set-effect-param", b => this.Tf(b)],
                ["remove-effects", b => this.Mf(b)],
                ["tick", b => this.Ff(b)],
                ["load-state", b => this.uf(b)]
            ])
        }
        async Se(a) {
            a.isiOSCordova && (this.Uc = !0);
            this.Wc = a.timeScaleMode;
            this.Od = ["equalpower", "HRTF", "soundfield"][a.panningModel];
            this.Fd = ["linear", "inverse", "exponential"][a.distanceModel];
            this.Pd = a.refDistance;
            this.Nd = a.maxDistance;
            this.Rd = a.rolloffFactor;
            var b = {
                latencyHint: a.latencyHint
            };
            if ("undefined" !== typeof AudioContext) this.f = new AudioContext(b);
            else if ("undefined" !== typeof webkitAudioContext) this.f = new webkitAudioContext(b);
            else throw Error("Web Audio API not supported");
            this.od();
            this.f.onstatechange = () => {
                "running" !== this.f.state && this.od()
            };
            this.Ib = this.f.createGain();
            this.Ib.connect(this.f.destination);
            b = a.listenerPos;
            this.f.listener.setPosition(b[0], b[1], b[2]);
            this.f.listener.setOrientation(0, 0, 1, 0, -1, 0);
            self.C3_GetAudioContextCurrentTime = () => this.ac();
            try {
                await Promise.all(a.preloadList.map(d =>
                    this.yb(d.originalUrl, d.url, d.type, !1)))
            } catch (d) {
                console.error("[Construct 3] Preloading sounds failed: ", d)
            }
            return {
                sampleRate: this.f.sampleRate
            }
        }
        od() {
            this.Kb || (this.Lc = !1, window.addEventListener("pointerup", this.oa, !0), window.addEventListener("touchend", this.oa, !0), window.addEventListener("click", this.oa, !0), window.addEventListener("keydown", this.oa, !0), this.Kb = !0)
        }
        Ue() {
            this.Kb && (this.Lc = !0, window.removeEventListener("pointerup", this.oa, !0), window.removeEventListener("touchend", this.oa, !0), window.removeEventListener("click",
                this.oa, !0), window.removeEventListener("keydown", this.oa, !0), this.Kb = !1)
        }
        ig() {
            if (!this.Lc) {
                var a = this.f;
                "suspended" === a.state && a.resume && a.resume();
                var b = a.createBuffer(1, 220, 22050),
                    d = a.createBufferSource();
                d.buffer = b;
                d.connect(a.destination);
                d.start(0);
                "running" === a.state && this.Ue()
            }
        }
        W() {
            return this.f
        }
        ac() {
            return this.f.currentTime
        }
        qa() {
            return this.Ib
        }
        dd(a) {
            return (a = this.ba.get(a.toLowerCase())) ? a[0].P() : this.qa()
        }
        Yd(a, b) {
            a = a.toLowerCase();
            let d = this.ba.get(a);
            d || (d = [], this.ba.set(a, d));
            b.Vf(d.length);
            b.cg(a);
            d.push(b);
            this.yd(a)
        }
        yd(a) {
            let b = this.qa();
            const d = this.ba.get(a);
            if (d && d.length) {
                b = d[0].P();
                for (let h = 0, n = d.length; h < n; ++h) {
                    const q = d[h];
                    h + 1 === n ? q.S(this.qa()) : q.S(d[h + 1].P())
                }
            }
            for (const h of this.ja(a)) h.Ce(b);
            this.xa && this.Rc === a && (this.xa.disconnect(), this.xa.connect(b))
        }
        rb() {
            return this.Qc
        }
        sb() {
            return this.la
        }
        Uf() {
            this.Hd = !0
        }
        pe(a, b) {
            return b ? this.v.lg(a).then(d => {
                const h = this.f.createBuffer(1, d.length, 48E3);
                h.getChannelData(0).set(d);
                return h
            }) : new Promise((d, h) => {
                this.f.decodeAudioData(a,
                    d, h)
            })
        }
        sa(a) {
            this.v.sa(a)
        }
        Ba(a) {
            this.v.Ba(a)
        }
        jd(a) {
            let b = 0;
            for (let d = 0, h = this.D.length; d < h; ++d) {
                const n = this.D[d];
                this.D[b] = n;
                n.L === a ? n.c() : ++b
            }
            this.D.length = b
        }
        De() {
            let a = 0;
            for (let b = 0, d = this.aa.length; b < d; ++b) {
                const h = this.aa[b];
                this.aa[a] = h;
                h.ra() ? h.c() : ++a
            }
            this.aa.length = a
        }* ja(a) {
            if (a)
                for (const b of this.D) self.da.qe(b.Z, a) && (yield b);
            else this.ga && !this.ga.T() && (yield this.ga)
        }
        async yb(a, b, d, h, n) {
            for (const q of this.aa)
                if (q.Sa() === b) return await P(q), q;
            if (n) return null;
            h && (this.Uc || this.Hd) &&
                this.De();
            n = "audio/webm; codecs=opus" === d && !this.tg;
            h && n && this.Uf();
            a = !h || this.Uc || n ? new self.le(this, a, b, d, h, n) : new self.je(this, a, b, d, h);
            this.aa.push(a);
            await P(a);
            return a
        }
        async pc(a, b, d, h, n) {
            for (const q of this.D)
                if (q.Sa() === b && (q.Yb() || n)) return q.Fe(h), q;
            a = await this.yb(a, b, d, n);
            h = "html5" === a.Ec ? new self.ke(a.i, a, h) : new self.me(a.i, a, h);
            this.D.push(h);
            return h
        }
        Je(a) {
            let b = this.kb.get(a);
            if (!b) {
                let d = null;
                b = {
                    Xc: 0,
                    promise: new Promise(h => d = h),
                    resolve: d
                };
                this.kb.set(a, b)
            }
            b.Xc++
        }
        Nf(a) {
            const b = this.kb.get(a);
            if (!b) throw Error("expected pending tag");
            b.Xc--;
            0 === b.Xc && (b.resolve(), this.kb.delete(a))
        }
        mc(a) {
            a || (a = this.Ld);
            return (a = this.kb.get(a)) ? a.promise : Promise.resolve()
        }
        zb() {
            if (0 < this.Fa.size) F(this);
            else
                for (const a of this.D)
                    if (a.ed()) {
                        F(this);
                        break
                    }
        }
        Da() {
            for (var a of this.Fa) a.Da();
            a = this.ac();
            for (var b of this.D) b.Da(a);
            b = this.D.filter(d => d.ed()).map(d => d.Ra());
            u(this, "state", {
                tickCount: this.Md,
                audioInstances: b,
                analysers: [...this.Fa].map(d => d.se())
            });
            0 === b.length && 0 === this.Fa.size && this.Lb && (this.v.Of(this.Ud),
                this.Lb = !1)
        }
        ic(a, b, d) {
            u(this, "trigger", {
                type: a,
                tag: b,
                aiid: d
            })
        }
        async Jf(a) {
            const b = a.originalUrl,
                d = a.url,
                h = a.type,
                n = a.isMusic,
                q = a.tag,
                t = a.isLooping,
                x = a.vol,
                A = a.pos,
                w = a.panning;
            let y = a.off;
            0 < y && !a.trueClock && (this.f.getOutputTimestamp ? (a = this.f.getOutputTimestamp(), y = y - a.performanceTime / 1E3 + a.contextTime) : y = y - performance.now() / 1E3 + this.f.currentTime);
            this.Ld = q;
            this.Je(q);
            try {
                this.ga = await this.pc(b, d, h, q, n), w ? (this.ga.vb(!0), this.ga.Ee(w.x, w.y, w.angle, w.innerAngle, w.outerAngle, w.outerGain), w.hasOwnProperty("uid") &&
                    this.ga.Ge(w.uid)) : this.ga.vb(!1), this.ga.Play(t, x, A, y)
            } catch (B) {
                console.error("[Construct 3] Audio: error starting playback: ", B);
                return
            } finally {
                this.Nf(q)
            }
            F(this)
        }
        fg(a) {
            a = a.tag;
            for (const b of this.ja(a)) b.ka()
        }
        gg() {
            for (const a of this.D) a.ka()
        }
        Zf(a) {
            const b = a.tag;
            a = a.paused;
            for (const d of this.ja(b)) a ? d.Ta() : d.ub();
            this.zb()
        }
        dg(a) {
            const b = a.tag;
            a = a.vol;
            for (const d of this.ja(b)) d.xb(a)
        }
        async Xe(a) {
            const b = a.tag,
                d = a.vol,
                h = a.duration;
            a = a.stopOnEnd;
            await this.mc(b);
            for (const n of this.ja(b)) n.re(d,
                h, a);
            this.zb()
        }
        Xf(a) {
            this.Qc = a.vol;
            for (const b of this.D) b.Fb()
        }
        Yf(a) {
            const b = a.tag;
            a = a.isMuted;
            for (const d of this.ja(b)) d.kd(a)
        }
        ag(a) {
            this.la = a.isSilent;
            this.v.wb(this.la);
            for (const b of this.D) b.Eb()
        }
        Wf(a) {
            const b = a.tag;
            a = a.isLooping;
            for (const d of this.ja(b)) d.kc(a)
        }
        async $f(a) {
            const b = a.tag;
            a = a.rate;
            await this.mc(b);
            for (const d of this.ja(b)) d.md(a)
        }
        async Qf(a) {
            const b = a.tag;
            a = a.pos;
            await this.mc(b);
            for (const d of this.ja(b)) d.jc(a)
        }
        async Kf(a) {
            const b = a.originalUrl,
                d = a.url,
                h = a.type;
            a = a.isMusic;
            try {
                await this.pc(b, d, h, "", a)
            } catch (n) {
                console.error("[Construct 3] Audio: error preloading: ", n)
            }
        }
        async jg(a) {
            if (a = await this.yb("", a.url, a.type, a.isMusic, !0)) a.c(), a = this.aa.indexOf(a), -1 !== a && this.aa.splice(a, 1)
        }
        kg() {
            for (const a of this.aa) a.c();
            this.aa.length = 0
        }
        bg(a) {
            a = a.isSuspended;
            !a && this.f.resume && this.f.resume();
            for (const b of this.D) b.lc(a);
            a && this.f.suspend && this.f.suspend()
        }
        Ff(a) {
            this.Wb = a.timeScale;
            this.Jc = a.gameTime;
            this.Md = a.tickCount;
            if (0 !== this.Wc)
                for (var b of this.D) b.Ea();
            (b = a.listenerPos) &&
            this.f.listener.setPosition(b[0], b[1], b[2]);
            for (const d of a.instPans) {
                a = d.uid;
                for (const h of this.D) h.fa === a && h.ld(d.x, d.y, d.angle)
            }
        }
        async nd(a) {
            var b = a.type;
            const d = a.tag;
            var h = a.params;
            if ("filter" === b) h = new self.de(this, ...h);
            else if ("delay" === b) h = new self.be(this, ...h);
            else if ("convolution" === b) {
                b = null;
                try {
                    b = await this.yb(a.bufferOriginalUrl, a.bufferUrl, a.bufferType, !1)
                } catch (n) {
                    console.log("[Construct 3] Audio: error loading convolution: ", n);
                    return
                }
                h = new self.ae(this, b.$, ...h);
                h.Rf(a.bufferOriginalUrl,
                    a.bufferType)
            } else if ("flanger" === b) h = new self.ee(this, ...h);
            else if ("phaser" === b) h = new self.ge(this, ...h);
            else if ("gain" === b) h = new self.fe(this, ...h);
            else if ("tremolo" === b) h = new self.ie(this, ...h);
            else if ("ringmod" === b) h = new self.he(this, ...h);
            else if ("distortion" === b) h = new self.ce(this, ...h);
            else if ("compressor" === b) h = new self.$d(this, ...h);
            else if ("analyser" === b) h = new self.Zd(this, ...h);
            else throw Error("invalid effect type");
            this.Yd(d, h);
            this.xd()
        }
        Tf(a) {
            const b = a.index,
                d = a.param,
                h = a.value,
                n = a.ramp,
                q = a.time;
            a = this.ba.get(a.tag);
            !a || 0 > b || b >= a.length || (a[b].X(d, h, n, q), this.xd())
        }
        Mf(a) {
            a = a.tag.toLowerCase();
            const b = this.ba.get(a);
            if (b && b.length) {
                for (const d of b) d.c();
                this.ba.delete(a);
                this.yd(a)
            }
        }
        Ie(a) {
            this.Fa.add(a);
            this.zb()
        }
        Lf(a) {
            this.Fa.delete(a)
        }
        xd() {
            this.Nc || (this.Nc = !0, Promise.resolve().then(() => this.Ve()))
        }
        Ve() {
            const a = {};
            for (const [b, d] of this.ba) a[b] = d.map(h => h.Ra());
            u(this, "fxstate", {
                fxstate: a
            });
            this.Nc = !1
        }
        async uf(a) {
            const b = a.saveLoadMode;
            if (3 !== b)
                for (var d of this.D) d.ra() && 1 ===
                    b || (d.ra() || 2 !== b) && d.ka();
            for (const h of this.ba.values())
                for (const n of h) n.c();
            this.ba.clear();
            this.Wb = a.timeScale;
            this.Jc = a.gameTime;
            d = a.listenerPos;
            this.f.listener.setPosition(d[0], d[1], d[2]);
            this.la = a.isSilent;
            this.v.wb(this.la);
            this.Qc = a.masterVolume;
            d = [];
            for (const h of Object.values(a.effects)) d.push(Promise.all(h.map(n => this.nd(n))));
            await Promise.all(d);
            await Promise.all(a.playing.map(h => this.ef(h, b)));
            this.zb()
        }
        async ef(a, b) {
            if (3 !== b) {
                var d = a.bufferOriginalUrl,
                    h = a.bufferUrl,
                    n = a.bufferType,
                    q = a.isMusic,
                    t = a.tag,
                    x = a.isLooping,
                    A = a.volume,
                    w = a.playbackTime;
                if (!q || 1 !== b)
                    if (q || 2 !== b) {
                        b = null;
                        try {
                            b = await this.pc(d, h, n, t, q)
                        } catch (y) {
                            console.error("[Construct 3] Audio: error loading audio state: ", y);
                            return
                        }
                        b.Ae(a.pan);
                        b.Play(x, A, w, 0);
                        a.isPlaying || b.Ta();
                        b.tc(a)
                    }
            }
        }
        wf(a, b) {
            this.xa && this.xa.disconnect();
            this.Rc = b.toLowerCase();
            this.xa = this.f.createMediaStreamSource(a);
            this.xa.connect(this.dd(this.Rc))
        }
        qf() {
            this.Hb || (this.Hb = this.f.createMediaStreamDestination(), this.Ib.connect(this.Hb));
            return this.Hb.stream
        }
        static qe(a,
            b) {
            return a.length !== b.length ? !1 : a === b ? !0 : a.toLowerCase() === b.toLowerCase()
        }
        static He(a) {
            return a * f
        }
        static oe(a) {
            return Math.pow(10, a / 20)
        }
        static cd(a) {
            return Math.max(Math.min(self.da.oe(a), 1), 0)
        }
        static ze(a) {
            return Math.log(a) / Math.log(10) * 20
        }
        static ye(a) {
            return self.da.ze(Math.max(Math.min(a, 1), 0))
        }
        static vg(a, b) {
            return 1 - Math.exp(-b * a)
        }
    };
    self.Ca.Qa(self.da)
}
"use strict";

function P(f) {
    f.Nb || (f.Nb = f.sc());
    return f.Nb
}
self.$c = class {
    constructor(f, a, b, d, h) {
        this.i = f;
        this.rg = a;
        this.ya = b;
        this.R = d;
        this.og = h;
        this.Ec = "";
        this.Nb = null
    }
    c() {
        this.Nb = this.i = null
    }
    sc() {}
    W() {
        return this.i.W()
    }
    cc() {
        return this.rg
    }
    Sa() {
        return this.ya
    }
    bc() {
        return this.R
    }
    ra() {
        return this.og
    }
    ea() {}
};
"use strict";
self.je = class extends self.$c {
    constructor(f, a, b, d, h) {
        super(f, a, b, d, h);
        this.Ec = "html5";
        this.I = new Audio;
        this.I.crossOrigin = "anonymous";
        this.I.autoplay = !1;
        this.I.preload = "auto";
        this.eb = this.fb = null;
        this.I.addEventListener("canplaythrough", () => !0);
        this.jb = this.W().createGain();
        this.hb = null;
        this.I.addEventListener("canplay", () => {
            this.fb && (this.fb(), this.eb = this.fb = null);
            !this.hb && this.I && (this.hb = this.W().createMediaElementSource(this.I), this.hb.connect(this.jb))
        });
        this.onended = null;
        this.I.addEventListener("ended",
            () => {
                if (this.onended) this.onended()
            });
        this.I.addEventListener("error", n => {
            console.error(`[Construct 3] Audio '${this.ya}' error: `, n);
            this.eb && (this.eb(n), this.eb = this.fb = null)
        })
    }
    c() {
        this.i.jd(this);
        this.jb.disconnect();
        this.jb = null;
        this.hb.disconnect();
        this.hb = null;
        this.I && !this.I.paused && this.I.pause();
        this.I = this.onended = null;
        super.c()
    }
    sc() {
        return new Promise((f, a) => {
            this.fb = f;
            this.eb = a;
            this.I.src = this.ya
        })
    }
    O() {
        return this.I
    }
    ea() {
        return this.I.duration
    }
};
"use strict";
async function Q(f) {
    if (f.va) return f.va;
    var a = f.i.v;
    if ("cordova" === a.C && a.we(f.ya) && "file:" === location.protocol) f.va = await a.Zb(f.ya);
    else {
        a = await fetch(f.ya);
        if (!a.ok) throw Error(`error fetching audio data: ${a.status} ${a.statusText}`);
        f.va = await a.arrayBuffer()
    }
}
async function R(f) {
    if (f.$) return f.$;
    f.$ = await f.i.pe(f.va, f.qg);
    f.va = null
}
self.le = class extends self.$c {
    constructor(f, a, b, d, h, n) {
        super(f, a, b, d, h);
        this.Ec = "webaudio";
        this.$ = this.va = null;
        this.qg = !!n
    }
    c() {
        this.i.jd(this);
        this.$ = this.va = null;
        super.c()
    }
    async sc() {
        try {
            await Q(this), await R(this)
        } catch (f) {
            console.error(`[Construct 3] Failed to load audio '${this.ya}': `, f)
        }
    }
    ea() {
        return this.$ ? this.$.duration : 0
    }
};
"use strict"; {
    let f = 0;
    self.ad = class {
        constructor(a, b, d) {
            this.i = a;
            this.L = b;
            this.Z = d;
            this.Gb = f++;
            this.M = this.W().createGain();
            this.M.connect(this.qa());
            this.A = null;
            this.bb = !1;
            this.G = !0;
            this.V = this.ia = this.F = !1;
            this.nb = 1;
            this.Ga = !1;
            this.Y = 1;
            a = this.i.Wc;
            this.Oc = 1 === a && !this.ra() || 2 === a;
            this.Za = this.fa = -1;
            this.Td = !1
        }
        c() {
            this.L = this.i = null;
            this.A && (this.A.disconnect(), this.A = null);
            this.M.disconnect();
            this.M = null
        }
        W() {
            return this.i.W()
        }
        qa() {
            return this.i.dd(this.Z)
        }
        rb() {
            return this.i.rb()
        }
        qb() {
            return this.Oc ? this.i.Jc :
                performance.now() / 1E3
        }
        cc() {
            return this.L.cc()
        }
        Sa() {
            return this.L.Sa()
        }
        bc() {
            return this.L.bc()
        }
        ra() {
            return this.L.ra()
        }
        Fe(a) {
            this.Z = a
        }
        T() {}
        Yb() {}
        IsPlaying() {
            return !this.G && !this.F && !this.T()
        }
        ed() {
            return !this.G && !this.T()
        }
        Aa() {}
        ea() {
            return this.L.ea()
        }
        Play() {}
        ka() {}
        Ta() {}
        ub() {}
        xb(a) {
            this.nb = a;
            this.M.gain.cancelScheduledValues(0);
            this.Za = -1;
            this.M.gain.value = this.dc()
        }
        re(a, b, d) {
            if (!this.Ga) {
                a *= this.rb();
                var h = this.M.gain;
                h.cancelScheduledValues(0);
                var n = this.i.ac();
                b = n + b;
                h.setValueAtTime(h.value, n);
                h.linearRampToValueAtTime(a, b);
                this.nb = a;
                this.Za = b;
                this.Td = d
            }
        }
        Fb() {
            this.xb(this.nb)
        }
        Da(a) {
            -1 !== this.Za && a >= this.Za && (this.Za = -1, this.Td && this.ka(), this.i.ic("fade-ended", this.Z, this.Gb))
        }
        dc() {
            const a = this.nb * this.rb();
            return isFinite(a) ? a : 0
        }
        kd(a) {
            a = !!a;
            this.Ga !== a && (this.Ga = a, this.Eb())
        }
        sb() {
            return this.i.sb()
        }
        Eb() {}
        kc() {}
        md(a) {
            this.Y !== a && (this.Y = a, this.Ea())
        }
        Ea() {}
        jc() {}
        lc() {}
        vb(a) {
            a = !!a;
            this.bb !== a && ((this.bb = a) ? (this.A || (this.A = this.W().createPanner(), this.A.panningModel = this.i.Od, this.A.distanceModel =
                this.i.Fd, this.A.refDistance = this.i.Pd, this.A.maxDistance = this.i.Nd, this.A.rolloffFactor = this.i.Rd), this.M.disconnect(), this.M.connect(this.A), this.A.connect(this.qa())) : (this.A.disconnect(), this.M.disconnect(), this.M.connect(this.qa())))
        }
        Ee(a, b, d, h, n, q) {
            this.bb && (this.ld(a, b, d), a = self.da.He, this.A.coneInnerAngle = a(h), this.A.coneOuterAngle = a(n), this.A.coneOuterGain = q)
        }
        ld(a, b, d) {
            this.bb && (this.A.setPosition(a, b, 0), this.A.setOrientation(Math.cos(d), Math.sin(d), 0))
        }
        Ge(a) {
            this.fa = a
        }
        ec() {}
        Ce(a) {
            const b =
                this.A || this.M;
            b.disconnect();
            b.connect(a)
        }
        Ra() {
            return {
                aiid: this.Gb,
                tag: this.Z,
                duration: this.ea(),
                volume: this.nb,
                isPlaying: this.IsPlaying(),
                playbackTime: this.Aa(),
                playbackRate: this.Y,
                uid: this.fa,
                bufferOriginalUrl: this.cc(),
                bufferUrl: "",
                bufferType: this.bc(),
                isMusic: this.ra(),
                isLooping: this.V,
                isMuted: this.Ga,
                resumePosition: this.ec(),
                pan: this.te()
            }
        }
        tc(a) {
            this.md(a.playbackRate);
            this.kd(a.isMuted)
        }
        te() {
            if (!this.A) return null;
            const a = this.A;
            return {
                pos: [a.positionX.value, a.positionY.value, a.positionZ.value],
                orient: [a.orientationX.value, a.orientationY.value, a.orientationZ.value],
                cia: a.coneInnerAngle,
                coa: a.coneOuterAngle,
                cog: a.coneOuterGain,
                uid: this.fa
            }
        }
        Ae(a) {
            a ? (this.vb(!0), a = this.A, a.setPosition(...a.pos), a.setOrientation(...a.orient), a.coneInnerAngle = a.cia, a.coneOuterAngle = a.coa, a.coneOuterGain = a.cog, this.fa = a.uid) : this.vb(!1)
        }
    }
}
"use strict";
self.ke = class extends self.ad {
    constructor(f, a, b) {
        super(f, a, b);
        this.L.jb.connect(this.M);
        this.L.onended = () => this.vc()
    }
    c() {
        this.ka();
        this.L.jb.disconnect();
        super.c()
    }
    O() {
        return this.L.O()
    }
    vc() {
        this.G = !0;
        this.fa = -1;
        this.i.ic("ended", this.Z, this.Gb)
    }
    T() {
        return this.O().ended
    }
    Yb() {
        return this.G ? !0 : this.T()
    }
    Aa(f) {
        let a = this.O().currentTime;
        f && (a *= this.Y);
        this.V || (a = Math.min(a, this.ea()));
        return a
    }
    Play(f, a, b) {
        const d = this.O();
        1 !== d.playbackRate && (d.playbackRate = 1);
        d.loop !== f && (d.loop = f);
        this.xb(a);
        d.muted &&
            (d.muted = !1);
        if (d.currentTime !== b) try {
            d.currentTime = b
        } catch (h) {
            console.warn(`[Construct 3] Exception seeking audio '${this.L.Sa()}' to position '${b}': `, h)
        }
        this.i.sa(d);
        this.F = this.G = !1;
        this.V = f;
        this.Y = 1
    }
    ka() {
        const f = this.O();
        f.paused || f.pause();
        this.i.Ba(f);
        this.G = !0;
        this.F = !1;
        this.fa = -1
    }
    Ta() {
        if (!(this.F || this.G || this.T())) {
            var f = this.O();
            f.paused || f.pause();
            this.i.Ba(f);
            this.F = !0
        }
    }
    ub() {
        !this.F || this.G || this.T() || (this.i.sa(this.O()), this.F = !1)
    }
    Eb() {
        this.O().muted = this.Ga || this.sb()
    }
    kc(f) {
        f = !!f;
        this.V !== f && (this.V = f, this.O().loop = f)
    }
    Ea() {
        let f = this.Y;
        this.Oc && (f *= this.i.Wb);
        try {
            this.O().playbackRate = f
        } catch (a) {
            console.warn(`[Construct 3] Unable to set playback rate '${f}':`, a)
        }
    }
    jc(f) {
        if (!this.G && !this.T()) try {
            this.O().currentTime = f
        } catch (a) {
            console.warn(`[Construct 3] Error seeking audio to '${f}': `, a)
        }
    }
    ec() {
        return this.Aa()
    }
    lc(f) {
        f ? this.IsPlaying() ? (this.O().pause(), this.ia = !0) : this.ia = !1 : this.ia && (this.i.sa(this.O()), this.ia = !1)
    }
};
"use strict";

function S(f) {
    f.j && f.j.disconnect();
    f.j = null;
    f.Va = null
}
self.me = class extends self.ad {
    constructor(f, a, b) {
        super(f, a, b);
        this.j = null;
        this.Qb = d => this.vc(d);
        this.Kc = !0;
        this.Va = null;
        this.N = this.Vb = 0;
        this.Sc = 1
    }
    c() {
        this.ka();
        S(this);
        this.Qb = null;
        super.c()
    }
    vc(f) {
        this.F || this.ia || f.target !== this.Va || (this.G = this.Kc = !0, this.fa = -1, S(this), this.i.ic("ended", this.Z, this.Gb))
    }
    T() {
        return !this.G && this.j && this.j.loop || this.F ? !1 : this.Kc
    }
    Yb() {
        return !this.j || this.G ? !0 : this.T()
    }
    Aa(f) {
        let a;
        a = this.F ? this.N : this.qb() - this.Vb;
        f && (a *= this.Y);
        this.V || (a = Math.min(a, this.ea()));
        return a
    }
    Play(f,
        a, b, d) {
        this.Sc = 1;
        this.xb(a);
        S(this);
        this.j = this.W().createBufferSource();
        this.j.buffer = this.L.$;
        this.j.connect(this.M);
        this.Va = this.j;
        this.j.onended = this.Qb;
        this.j.loop = f;
        this.j.start(d, b);
        this.F = this.G = this.Kc = !1;
        this.V = f;
        this.Y = 1;
        this.Vb = this.qb() - b
    }
    ka() {
        if (this.j) try {
            this.j.stop(0)
        } catch (f) {}
        this.G = !0;
        this.F = !1;
        this.fa = -1
    }
    Ta() {
        this.F || this.G || this.T() || (this.N = this.Aa(!0), this.V && (this.N %= this.ea()), this.F = !0, this.j.stop(0))
    }
    ub() {
        !this.F || this.G || this.T() || (S(this), this.j = this.W().createBufferSource(),
            this.j.buffer = this.L.$, this.j.connect(this.M), this.Va = this.j, this.j.onended = this.Qb, this.j.loop = this.V, this.Fb(), this.Ea(), this.Vb = this.qb() - this.N / (this.Y || .001), this.j.start(0, this.N), this.F = !1)
    }
    dc() {
        return super.dc() * this.Sc
    }
    Eb() {
        this.Sc = this.Ga || this.sb() ? 0 : 1;
        this.Fb()
    }
    kc(f) {
        f = !!f;
        this.V !== f && (this.V = f, this.j && (this.j.loop = f))
    }
    Ea() {
        let f = this.Y;
        this.Oc && (f *= this.i.Wb);
        this.j && (this.j.playbackRate.value = f)
    }
    jc(f) {
        this.G || this.T() || (this.F ? this.N = f : (this.Ta(), this.N = f, this.ub()))
    }
    ec() {
        return this.N
    }
    lc(f) {
        f ?
            this.IsPlaying() ? (this.ia = !0, this.N = this.Aa(!0), this.V && (this.N %= this.ea()), this.j.stop(0)) : this.ia = !1 : this.ia && (S(this), this.j = this.W().createBufferSource(), this.j.buffer = this.L.$, this.j.connect(this.M), this.Va = this.j, this.j.onended = this.Qb, this.j.loop = this.V, this.Fb(), this.Ea(), this.Vb = this.qb() - this.N / (this.Y || .001), this.j.start(0, this.N), this.ia = !1)
    }
    tc(f) {
        super.tc(f);
        this.N = f.resumePosition
    }
};
"use strict"; {
    class f {
        constructor(a) {
            this.i = a;
            this.f = a.W();
            this.Id = -1;
            this.R = this.Z = "";
            this.g = null
        }
        c() {
            this.f = null
        }
        Vf(a) {
            this.Id = a
        }
        cg(a) {
            this.Z = a
        }
        o() {
            return this.f.createGain()
        }
        P() {}
        S() {}
        m(a, b, d, h) {
            a.cancelScheduledValues(0);
            if (0 === h) a.value = b;
            else {
                var n = this.f.currentTime;
                h += n;
                switch (d) {
                    case 0:
                        a.setValueAtTime(b, h);
                        break;
                    case 1:
                        a.setValueAtTime(a.value, n);
                        a.linearRampToValueAtTime(b, h);
                        break;
                    case 2:
                        a.setValueAtTime(a.value, n), a.exponentialRampToValueAtTime(b, h)
                }
            }
        }
        Ra() {
            return {
                type: this.R,
                tag: this.Z,
                params: this.g
            }
        }
    }
    self.de = class extends f {
        constructor(a, b, d, h, n, q, t) {
            super(a);
            this.R = "filter";
            this.g = [b, d, h, n, q, t];
            this.l = this.o();
            this.b = this.o();
            this.b.gain.value = t;
            this.a = this.o();
            this.a.gain.value = 1 - t;
            this.u = this.f.createBiquadFilter();
            this.u.type = b;
            this.u.frequency.value = d;
            this.u.detune.value = h;
            this.u.Q.value = n;
            this.u.gain.vlaue = q;
            this.l.connect(this.u);
            this.l.connect(this.a);
            this.u.connect(this.b)
        }
        c() {
            this.l.disconnect();
            this.u.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            super.c()
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a, b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[5] = b;
                    this.m(this.b.gain, b, d, h);
                    this.m(this.a.gain, 1 - b, d, h);
                    break;
                case 1:
                    this.g[1] = b;
                    this.m(this.u.frequency, b, d, h);
                    break;
                case 2:
                    this.g[2] = b;
                    this.m(this.u.detune, b, d, h);
                    break;
                case 3:
                    this.g[3] = b;
                    this.m(this.u.Q, b, d, h);
                    break;
                case 4:
                    this.g[4] = b, this.m(this.u.gain, b, d, h)
            }
        }
    };
    self.be = class extends f {
        constructor(a, b, d, h) {
            super(a);
            this.R = "delay";
            this.g = [b, d, h];
            this.l =
                this.o();
            this.b = this.o();
            this.b.gain.value = h;
            this.a = this.o();
            this.a.gain.value = 1 - h;
            this.gb = this.o();
            this.U = this.f.createDelay(b);
            this.U.delayTime.value = b;
            this.Ya = this.o();
            this.Ya.gain.value = d;
            this.l.connect(this.gb);
            this.l.connect(this.a);
            this.gb.connect(this.b);
            this.gb.connect(this.U);
            this.U.connect(this.Ya);
            this.Ya.connect(this.gb)
        }
        c() {
            this.l.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            this.gb.disconnect();
            this.U.disconnect();
            this.Ya.disconnect();
            super.c()
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a, b, d, h) {
            const n = self.da.cd;
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[2] = b;
                    this.m(this.b.gain, b, d, h);
                    this.m(this.a.gain, 1 - b, d, h);
                    break;
                case 4:
                    this.g[1] = n(b);
                    this.m(this.Ya.gain, n(b), d, h);
                    break;
                case 5:
                    this.g[0] = b, this.m(this.U.delayTime, b, d, h)
            }
        }
    };
    self.ae = class extends f {
        constructor(a, b, d, h) {
            super(a);
            this.R = "convolution";
            this.g = [d, h];
            this.Dd = this.Cd = "";
            this.l = this.o();
            this.b = this.o();
            this.b.gain.value = h;
            this.a = this.o();
            this.a.gain.value =
                1 - h;
            this.Xa = this.f.createConvolver();
            this.Xa.normalize = d;
            this.Xa.buffer = b;
            this.l.connect(this.Xa);
            this.l.connect(this.a);
            this.Xa.connect(this.b)
        }
        c() {
            this.l.disconnect();
            this.Xa.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            super.c()
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a, b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0), this.g[1] = b, this.m(this.b.gain, b, d, h), this.m(this.a.gain, 1 - b, d, h)
            }
        }
        Rf(a, b) {
            this.Cd = a;
            this.Dd = b
        }
        Ra() {
            const a =
                super.Ra();
            a.bufferOriginalUrl = this.Cd;
            a.bufferUrl = "";
            a.bufferType = this.Dd;
            return a
        }
    };
    self.ee = class extends f {
        constructor(a, b, d, h, n, q) {
            super(a);
            this.R = "flanger";
            this.g = [b, d, h, n, q];
            this.l = this.o();
            this.a = this.o();
            this.a.gain.value = 1 - q / 2;
            this.b = this.o();
            this.b.gain.value = q / 2;
            this.$a = this.o();
            this.$a.gain.value = n;
            this.U = this.f.createDelay(b + d);
            this.U.delayTime.value = b;
            this.s = this.f.createOscillator();
            this.s.frequency.value = h;
            this.H = this.o();
            this.H.gain.value = d;
            this.l.connect(this.U);
            this.l.connect(this.a);
            this.U.connect(this.b);
            this.U.connect(this.$a);
            this.$a.connect(this.U);
            this.s.connect(this.H);
            this.H.connect(this.U.delayTime);
            this.s.start(0)
        }
        c() {
            this.s.stop(0);
            this.l.disconnect();
            this.U.disconnect();
            this.s.disconnect();
            this.H.disconnect();
            this.a.disconnect();
            this.b.disconnect();
            this.$a.disconnect();
            super.c()
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a, b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[4] = b;
                    this.m(this.b.gain,
                        b / 2, d, h);
                    this.m(this.a.gain, 1 - b / 2, d, h);
                    break;
                case 6:
                    this.g[1] = b / 1E3;
                    this.m(this.H.gain, b / 1E3, d, h);
                    break;
                case 7:
                    this.g[2] = b;
                    this.m(this.s.frequency, b, d, h);
                    break;
                case 8:
                    this.g[3] = b / 100, this.m(this.$a.gain, b / 100, d, h)
            }
        }
    };
    self.ge = class extends f {
        constructor(a, b, d, h, n, q, t) {
            super(a);
            this.R = "phaser";
            this.g = [b, d, h, n, q, t];
            this.l = this.o();
            this.a = this.o();
            this.a.gain.value = 1 - t / 2;
            this.b = this.o();
            this.b.gain.value = t / 2;
            this.u = this.f.createBiquadFilter();
            this.u.type = "allpass";
            this.u.frequency.value = b;
            this.u.detune.value =
                d;
            this.u.Q.value = h;
            this.s = this.f.createOscillator();
            this.s.frequency.value = q;
            this.H = this.o();
            this.H.gain.value = n;
            this.l.connect(this.u);
            this.l.connect(this.a);
            this.u.connect(this.b);
            this.s.connect(this.H);
            this.H.connect(this.u.frequency);
            this.s.start(0)
        }
        c() {
            this.s.stop(0);
            this.l.disconnect();
            this.u.disconnect();
            this.s.disconnect();
            this.H.disconnect();
            this.a.disconnect();
            this.b.disconnect();
            super.c()
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a,
            b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[5] = b;
                    this.m(this.b.gain, b / 2, d, h);
                    this.m(this.a.gain, 1 - b / 2, d, h);
                    break;
                case 1:
                    this.g[0] = b;
                    this.m(this.u.frequency, b, d, h);
                    break;
                case 2:
                    this.g[1] = b;
                    this.m(this.u.detune, b, d, h);
                    break;
                case 3:
                    this.g[2] = b;
                    this.m(this.u.Q, b, d, h);
                    break;
                case 6:
                    this.g[3] = b;
                    this.m(this.H.gain, b, d, h);
                    break;
                case 7:
                    this.g[4] = b, this.m(this.s.frequency, b, d, h)
            }
        }
    };
    self.fe = class extends f {
        constructor(a, b) {
            super(a);
            this.R = "gain";
            this.g = [b];
            this.h = this.o();
            this.h.gain.value =
                b
        }
        c() {
            this.h.disconnect();
            super.c()
        }
        S(a) {
            this.h.disconnect();
            this.h.connect(a)
        }
        P() {
            return this.h
        }
        X(a, b, d, h) {
            const n = self.da.cd;
            switch (a) {
                case 4:
                    this.g[0] = n(b), this.m(this.h.gain, n(b), d, h)
            }
        }
    };
    self.ie = class extends f {
        constructor(a, b, d) {
            super(a);
            this.R = "tremolo";
            this.g = [b, d];
            this.h = this.o();
            this.h.gain.value = 1 - d / 2;
            this.s = this.f.createOscillator();
            this.s.frequency.value = b;
            this.H = this.o();
            this.H.gain.value = d / 2;
            this.s.connect(this.H);
            this.H.connect(this.h.gain);
            this.s.start(0)
        }
        c() {
            this.s.stop(0);
            this.s.disconnect();
            this.H.disconnect();
            this.h.disconnect();
            super.c()
        }
        S(a) {
            this.h.disconnect();
            this.h.connect(a)
        }
        P() {
            return this.h
        }
        X(a, b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[1] = b;
                    this.m(this.h.gain.value, 1 - b / 2, d, h);
                    this.m(this.H.gain.value, b / 2, d, h);
                    break;
                case 7:
                    this.g[0] = b, this.m(this.s.frequency, b, d, h)
            }
        }
    };
    self.he = class extends f {
        constructor(a, b, d) {
            super(a);
            this.R = "ringmod";
            this.g = [b, d];
            this.l = this.o();
            this.b = this.o();
            this.b.gain.value = d;
            this.a = this.o();
            this.a.gain.value = 1 - d;
            this.mb = this.o();
            this.mb.gain.value = 0;
            this.s = this.f.createOscillator();
            this.s.frequency.value = b;
            this.s.connect(this.mb.gain);
            this.s.start(0);
            this.l.connect(this.mb);
            this.l.connect(this.a);
            this.mb.connect(this.b)
        }
        c() {
            this.s.stop(0);
            this.s.disconnect();
            this.mb.disconnect();
            this.l.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            super.c()
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a, b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[1] = b;
                    this.m(this.b.gain,
                        b, d, h);
                    this.m(this.a.gain, 1 - b, d, h);
                    break;
                case 7:
                    this.g[0] = b, this.m(this.s.frequency, b, d, h)
            }
        }
    };
    self.ce = class extends f {
        constructor(a, b, d, h, n, q) {
            super(a);
            this.R = "distortion";
            this.g = [b, d, h, n, q];
            this.l = this.o();
            this.Sb = this.o();
            this.Rb = this.o();
            this.Sf(h, n);
            this.b = this.o();
            this.b.gain.value = q;
            this.a = this.o();
            this.a.gain.value = 1 - q;
            this.Xb = this.f.createWaveShaper();
            this.Hc = new Float32Array(65536);
            this.Ze(b, d);
            this.Xb.curve = this.Hc;
            this.l.connect(this.Sb);
            this.l.connect(this.a);
            this.Sb.connect(this.Xb);
            this.Xb.connect(this.Rb);
            this.Rb.connect(this.b)
        }
        c() {
            this.l.disconnect();
            this.Sb.disconnect();
            this.Xb.disconnect();
            this.Rb.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            super.c()
        }
        Sf(a, b) {
            .01 > a && (a = .01);
            this.Sb.gain.value = a;
            this.Rb.gain.value = Math.pow(1 / a, .6) * b
        }
        Ze(a, b) {
            for (let d = 0; 32768 > d; ++d) {
                let h = d / 32768;
                h = this.eg(h, a, b);
                this.Hc[32768 + d] = h;
                this.Hc[32768 - d - 1] = -h
            }
        }
        eg(a, b, d) {
            d = 1.05 * d * b - b;
            const h = 0 > a ? -a : a;
            return (h < b ? h : b + d * self.da.vg(h - b, 1 / d)) * (0 > a ? -1 : 1)
        }
        S(a) {
            this.b.disconnect();
            this.b.connect(a);
            this.a.disconnect();
            this.a.connect(a)
        }
        P() {
            return this.l
        }
        X(a, b, d, h) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0), this.g[4] = b, this.m(this.b.gain, b, d, h), this.m(this.a.gain, 1 - b, d, h)
            }
        }
    };
    self.$d = class extends f {
        constructor(a, b, d, h, n, q) {
            super(a);
            this.R = "compressor";
            this.g = [b, d, h, n, q];
            this.h = this.f.createDynamicsCompressor();
            this.h.threshold.value = b;
            this.h.knee.value = d;
            this.h.ratio.value = h;
            this.h.attack.value = n;
            this.h.release.value = q
        }
        c() {
            this.h.disconnect();
            super.c()
        }
        S(a) {
            this.h.disconnect();
            this.h.connect(a)
        }
        P() {
            return this.h
        }
        X() {}
    };
    self.Zd = class extends f {
        constructor(a, b, d) {
            super(a);
            this.R = "analyser";
            this.g = [b, d];
            this.h = this.f.createAnalyser();
            this.h.fftSize = b;
            this.h.smoothingTimeConstant = d;
            this.Gd = new Float32Array(this.h.frequencyBinCount);
            this.Sd = new Uint8Array(b);
            this.Qd = this.Ja = 0;
            this.i.Ie(this)
        }
        c() {
            this.i.Lf(this);
            this.h.disconnect();
            super.c()
        }
        Da() {
            this.h.getFloatFrequencyData(this.Gd);
            this.h.getByteTimeDomainData(this.Sd);
            const a = this.h.fftSize;
            let b = this.Ja = 0;
            for (var d = 0; d < a; ++d) {
                let h = (this.Sd[d] - 128) / 128;
                0 > h && (h = -h);
                this.Ja < h && (this.Ja = h);
                b += h * h
            }
            d = self.da.ye;
            this.Ja = d(this.Ja);
            this.Qd = d(Math.sqrt(b / a))
        }
        S(a) {
            this.h.disconnect();
            this.h.connect(a)
        }
        P() {
            return this.h
        }
        X() {}
        se() {
            return {
                tag: this.Z,
                index: this.Id,
                peak: this.Ja,
                rms: this.Qd,
                binCount: this.h.frequencyBinCount,
                freqBins: this.Gd
            }
        }
    }
}
"use strict";

function T(f) {
    window.C3_RegisterSW && window.OfflineClientInfo && window.OfflineClientInfo.SetMessageCallback(a => u(f, "sw-message", a.data))
}

function U(f) {
    f = f.orientation;
    if (screen.orientation && screen.orientation.lock) screen.orientation.lock(f).catch(a => console.warn("[Construct 3] Failed to lock orientation: ", a));
    else try {
        let a = !1;
        screen.lockOrientation ? a = screen.lockOrientation(f) : screen.webkitLockOrientation ? a = screen.webkitLockOrientation(f) : screen.mozLockOrientation ? a = screen.mozLockOrientation(f) : screen.msLockOrientation && (a = screen.msLockOrientation(f));
        a || console.warn("[Construct 3] Failed to lock orientation")
    } catch (a) {
        console.warn("[Construct 3] Failed to lock orientation: ",
            a)
    }
}
self.Ca.Qa(class extends self.za {
    constructor(f) {
        super(f, "browser");
        this.C = "";
        E(this, [
            ["get-initial-state", a => {
                this.C = a.exportType;
                return {
                    location: location.toString(),
                    isOnline: !!navigator.onLine,
                    referrer: document.referrer,
                    title: document.title,
                    isCookieEnabled: !!navigator.cookieEnabled,
                    screenWidth: screen.width,
                    screenHeight: screen.height,
                    windowOuterWidth: window.outerWidth,
                    windowOuterHeight: window.outerHeight,
                    isScirraArcade: "undefined" !== typeof window.is_scirra_arcade
                }
            }],
            ["ready-for-sw-messages", () => T(this)],
            ["alert", a => this.uc(a)],
            ["close", () => {
                navigator.app && navigator.app.exitApp ? navigator.app.exitApp() : navigator.device && navigator.device.exitApp ? navigator.device.exitApp() : window.close()
            }],
            ["set-focus", a => this.Ac(a)],
            ["vibrate", a => {
                navigator.vibrate && navigator.vibrate(a.pattern)
            }],
            ["lock-orientation", a => U(a)],
            ["unlock-orientation", () => {
                try {
                    screen.orientation && screen.orientation.unlock ? screen.orientation.unlock() : screen.unlockOrientation ? screen.unlockOrientation() : screen.webkitUnlockOrientation ? screen.webkitUnlockOrientation() :
                        screen.mozUnlockOrientation ? screen.mozUnlockOrientation() : screen.msUnlockOrientation && screen.msUnlockOrientation()
                } catch (a) {}
            }],
            ["navigate", a => {
                var b = a.type;
                if ("back" === b) navigator.app && navigator.app.backHistory ? navigator.app.backHistory() : window.back();
                else if ("forward" === b) window.forward();
                else if ("home" === b) window.home();
                else if ("reload" === b) location.reload();
                else if ("url" === b) {
                    b = a.url;
                    var d = a.target;
                    a = a.exportType;
                    "windows-uwp" === a && "undefined" !== typeof Windows ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(b)) :
                        self.cordova && self.cordova.InAppBrowser ? self.cordova.InAppBrowser.open(b, "_system") : "preview" === a ? window.open(b, "_blank") : this.Ig || (2 === d ? window.top.location = b : 1 === d ? window.parent.location = b : window.location = b)
                } else "new-window" === b && (b = a.url, d = a.tag, "windows-uwp" === a.exportType && "undefined" !== typeof Windows ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(b)) : self.cordova && self.cordova.InAppBrowser ? self.cordova.InAppBrowser.open(b, "_system") : window.open(b, d))
            }],
            ["request-fullscreen",
                a => {
                    {
                        const b = {
                            navigationUI: "auto"
                        };
                        a = a.navUI;
                        1 === a ? b.navigationUI = "hide" : 2 === a && (b.navigationUI = "show");
                        a = document.documentElement;
                        a.requestFullscreen ? a.requestFullscreen(b) : a.mozRequestFullScreen ? a.mozRequestFullScreen(b) : a.msRequestFullscreen ? a.msRequestFullscreen(b) : a.webkitRequestFullScreen && ("undefined" !== typeof Element.ALLOW_KEYBOARD_INPUT ? a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : a.webkitRequestFullScreen())
                    }
                }
            ],
            ["exit-fullscreen", () => {
                document.exitFullscreen ? document.exitFullscreen() :
                    document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.webkitCancelFullScreen && document.webkitCancelFullScreen()
            }],
            ["set-hash", a => {
                location.hash = a.hash
            }]
        ]);
        window.addEventListener("online", () => {
            u(this, "online-state", {
                isOnline: !0
            })
        });
        window.addEventListener("offline", () => {
            u(this, "online-state", {
                isOnline: !1
            })
        });
        window.addEventListener("hashchange", () => {
            u(this, "hashchange", {
                location: location.toString()
            })
        });
        document.addEventListener("backbutton",
            () => {
                u(this, "backbutton")
            });
        "undefined" !== typeof Windows && Windows.UI.Core.SystemNavigationManager.getForCurrentView().addEventListener("backrequested", a => {
            a.handled = !0;
            u(this, "backbutton")
        })
    }
    uc(f) {
        alert(f.message)
    }
    Ac(f) {
        f = f.isFocus;
        if ("nwjs" === this.C) {
            const a = "nwjs" === this.C ? nw.Window.get() : null;
            f ? a.focus() : a.blur()
        } else f ? window.focus() : window.blur()
    }
});
"use strict"; {
    let f = !1;
    self.Ca.Qa(class extends self.za {
        constructor(a) {
            super(a, "advert");
            a = b => [b, d => this.Oe(b, d)];
            E(this, [a("CreateBannerAdvert"), a("ShowBannerAdvert"), a("HideBannerAdvert"), a("CreateInterstitialAdvert"), a("ShowInterstitialAdvert"), a("CreateVideoAdvert"), a("ShowVideoAdvert"), a("Configure"), a("RequestConsent"), a("SetUserPersonalisation"), a("SetMaxAdContentRating"), a("TagForChildDirectedTreatment"), a("TagForUnderAgeOfConsent"), a("RequestIDFA")])
        }
        af() {
            if (window.cordova) return window.cordova.plugins.ConstructAd
        }
        async Oe(a,
            b) {
            const d = this.af();
            if (!d) throw f || (f = !0, console.warn("The Mobile Advert plugin is not loaded. Please note that it only works in Android or iOS exports")), Error("advert plugin not loaded");
            return new Promise((h, n) => {
                d[a](...b, (q, t) => {
                    q ? n(q) : h(t)
                })
            })
        }
    })
};