'use strict';

function w(g, a, b, d) {
    g.v.ic(g.Ua, a, b, d, void 0)
}

function D(g, a, b, d) {
    g.v.pa ? w(g, a, b, d) : g.v.bf()._OnMessageFromDOM({
        type: "event",
        component: g.Ua,
        handler: a,
        dispatchOpts: d || null,
        data: b,
        responseId: null
    })
}

function E(g, a, b) {
    g.v.B(g.Ua, a, b)
}

function H(g, a) {
    for (const [b, d] of a) E(g, b, d)
}

function I(g) {
    g.Mb || (g.v.Ne(g.Xd), g.Mb = !0)
}
window.qb = class {
    constructor(g, a) {
        this.v = g;
        this.Ua = a;
        this.Mb = !1;
        this.Xd = () => this.Ba()
    }
    Zc() {}
    Ba() {}
};

function J(g) {
    -1 !== g.Ma && (self.clearTimeout(g.Ma), g.Ma = -1)
}
window.Ee = class {
    constructor(g, a) {
        this.Gc = g;
        this.pg = a;
        this.Ma = -1;
        this.Nb = -Infinity;
        this.Yd = () => {
            this.Ma = -1;
            this.Nb = Date.now();
            this.Za = !0;
            this.Gc();
            this.Za = !1
        };
        this.Gd = this.Za = !1
    }
    c() {
        J(this);
        this.Yd = this.Gc = null
    }
};
"use strict";

function K(g, a) {
    E(g, "get-element", b => {
        const d = g.ca.get(b.elementId);
        return a(d, b)
    })
}
window.Ig = class extends self.qb {
    constructor(g, a) {
        super(g, a);
        this.ca = new Map;
        this.Fc = !0;
        H(this, [
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
            ["focus", b => {
                {
                    const d = this.ca.get(b.elementId);
                    b.focus ? d.focus() : d.blur()
                }
            }],
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
        K(this, b => b)
    }
};
"use strict"; {
    const g = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(navigator.userAgent);

    function a(e, c) {
        const h = document.createElement("script");
        h.async = !1;
        "module" === c && (h.type = "module");
        if (e.zg) h.textContent = e.Cg, document.head.appendChild(h);
        else return new Promise((k, l) => {
            h.onload = k;
            h.onerror = l;
            h.src = e;
            document.head.appendChild(h)
        })
    }
    let b = !1,
        d = !1;

    function f() {
        if (!b) {
            try {
                new Worker("blob://", {
                    get type() {
                        d = !0
                    }
                })
            } catch (e) {}
            b = !0
        }
        return d
    }
    let m = new Audio;
    const p = {
        "audio/webm; codecs=opus": !!m.canPlayType("audio/webm; codecs=opus"),
        "audio/ogg; codecs=opus": !!m.canPlayType("audio/ogg; codecs=opus"),
        "audio/webm; codecs=vorbis": !!m.canPlayType("audio/webm; codecs=vorbis"),
        "audio/ogg; codecs=vorbis": !!m.canPlayType("audio/ogg; codecs=vorbis"),
        "audio/mp4": !!m.canPlayType("audio/mp4"),
        "audio/mpeg": !!m.canPlayType("audio/mpeg")
    };
    m = null;
    async function v(e) {
        e = await z(e);
        return (new TextDecoder("utf-8")).decode(e)
    }

    function z(e) {
        return new Promise((c, h) => {
            const k = new FileReader;
            k.onload = l => c(l.target.result);
            k.onerror = l => h(l);
            k.readAsArrayBuffer(e)
        })
    }
    const A = [];
    let t = 0;
    window.RealFile = window.File;
    const u = [],
        B = new Map,
        x = new Map;
    let F = 0;
    const C = [];
    self.runOnStartup = function(e) {
        if ("function" !== typeof e) throw Error("runOnStartup called without a function");
        C.push(e)
    };
    const G = new Set(["cordova", "playable-ad", "instant-games"]);
    window.wb = class e {
        constructor(c) {
            this.pa = c.Eg;
            this.na = null;
            this.D = "";
            this.Vb = c.Bg;
            this.da = c.ae;
            this.nb = {};
            this.Fa = this.mb = null;
            this.Kb = [];
            this.ab = this.J = this.Ka = null;
            this.Ja = -1;
            this.ug = () => this.Bf();
            this.Ia = [];
            this.L = c.Zd;
            !this.pa ||
                "undefined" !== typeof OffscreenCanvas && navigator.userActivation && ("module" !== this.da || f()) || (this.pa = !1);
            G.has(this.L) && this.pa && (console.warn("[C3 runtime] Worker mode is enabled and supported, but is disabled in WebViews due to crbug.com/923007. Reverting to DOM mode."), this.pa = !1);
            this.Pb = this.ia = null;
            "html5" !== this.L && "playable-ad" !== this.L || "file" !== location.protocol.substr(0, 4) || alert("Exported games won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)");
            this.B("runtime", "cordova-fetch-local-file", h => this.kf(h));
            this.B("runtime", "create-job-worker", () => this.lf());
            "cordova" === this.L ? document.addEventListener("deviceready", () => this.sd(c)) : this.sd(c)
        }
        c() {
            this.oc();
            this.na && (this.na = this.na.onmessage = null);
            this.mb && (this.mb.terminate(), this.mb = null);
            this.Fa && (this.Fa.c(), this.Fa = null);
            this.J && (this.J.parentElement.removeChild(this.J), this.J = null)
        }
        gd() {
            return g && "cordova" === this.L
        }
        ub() {
            return g && G.has(this.L) || navigator.standalone
        }
        async sd(c) {
            if ("playable-ad" ===
                this.L) {
                this.ia = self.c3_base64files;
                this.Pb = {};
                await this.Se();
                for (let k = 0, l = c.Na.length; k < l; ++k) {
                    var h = c.Na[k].toLowerCase();
                    this.Pb.hasOwnProperty(h) ? c.Na[k] = {
                        zg: !0,
                        Cg: this.Pb[h]
                    } : this.ia.hasOwnProperty(h) && (c.Na[k] = URL.createObjectURL(this.ia[h]))
                }
            }
            c.vg ? this.D = c.vg : (h = location.origin, this.D = ("null" === h ? "file:///" : h) + location.pathname, h = this.D.lastIndexOf("/"), -1 !== h && (this.D = this.D.substr(0, h + 1)));
            c.Gg && (this.nb = c.Gg);
            h = new MessageChannel;
            this.na = h.port1;
            this.na.onmessage = k => this._OnMessageFromRuntime(k.data);
            window.c3_addPortMessageHandler && window.c3_addPortMessageHandler(k => this.xf(k));
            this.ab = new self.Ae(this);
            await L(this.ab);
            this.hd();
            "object" === typeof window.StatusBar && window.StatusBar.hide();
            "object" === typeof window.AndroidFullScreen && window.AndroidFullScreen.immersiveMode();
            this.pa ? await this.df(c, h.port2) : await this.cf(c, h.port2)
        }
        rc(c) {
            c = this.nb.hasOwnProperty(c) ? this.nb[c] : c.endsWith("/workermain.js") && this.nb.hasOwnProperty("workermain.js") ? this.nb["workermain.js"] : "playable-ad" === this.L && this.ia.hasOwnProperty(c.toLowerCase()) ?
                this.ia[c.toLowerCase()] : c;
            c instanceof Blob && (c = URL.createObjectURL(c));
            return c
        }
        async ac(c, h, k) {
            if (c.startsWith("blob:")) return new Worker(c, k);
            if (this.gd() && "file:" === location.protocol) return c = await this.pb(this.Vb + c), new Worker(URL.createObjectURL(new Blob([c], {
                type: "application/javascript"
            })), k);
            c = new URL(c, h);
            if (location.origin !== c.origin) {
                c = await fetch(c);
                if (!c.ok) throw Error("failed to fetch worker script");
                c = await c.blob();
                return new Worker(URL.createObjectURL(c), k)
            }
            return new Worker(c,
                k)
        }
        ua() {
            return Math.max(window.innerWidth, 1)
        }
        ta() {
            return Math.max(window.innerHeight, 1)
        }
        hd() {
            if (this.ub()) {
                const c = document.documentElement.style,
                    h = document.body.style,
                    k = window.innerWidth < window.innerHeight,
                    l = k ? window.screen.width : window.screen.height;
                h.height = c.height = (k ? window.screen.height : window.screen.width) + "px";
                h.width = c.width = l + "px"
            }
        }
        rd(c) {
            var h = this.ab;
            return {
                baseUrl: this.D,
                windowInnerWidth: this.ua(),
                windowInnerHeight: this.ta(),
                devicePixelRatio: window.devicePixelRatio,
                isFullscreen: e.hc(),
                projectData: c.Mg,
                scriptsType: c.ae,
                previewImageBlobs: window.cr_previewImageBlobs || this.ia,
                previewProjectFileBlobs: window.cr_previewProjectFileBlobs,
                previewProjectFileUrls: window.cr_previewProjectFiles,
                swClientId: window.Kg || "",
                exportType: c.Zd,
                isDebug: -1 < self.location.search.indexOf("debug"),
                ife: !!self.Lg,
                jobScheduler: {
                    inputPort: h.Mc,
                    outputPort: h.Tc,
                    maxNumWorkers: h.rg
                },
                supportedAudioFormats: p,
                opusWasmScriptUrl: window.cr_opusWasmScriptUrl || this.Vb + "opus.wasm.js",
                opusWasmBinaryUrl: window.cr_opusWasmBinaryUrl ||
                    this.Vb + "opus.wasm.wasm",
                isiOSCordova: this.gd(),
                isiOSWebView: this.ub(),
                isFBInstantAvailable: "undefined" !== typeof self.FBInstant
            }
        }
        async df(c, h) {
            var k = this.rc(c.Fg);
            this.mb = await this.ac(k, this.D, {
                type: this.da,
                name: "Runtime"
            });
            this.J = document.createElement("canvas");
            this.J.style.display = "none";
            k = this.J.transferControlToOffscreen();
            document.body.appendChild(this.J);
            window.c3canvas = this.J;
            this.mb.postMessage(Object.assign(this.rd(c), {
                type: "init-runtime",
                isInWorker: !0,
                messagePort: h,
                canvas: k,
                workerDependencyScripts: c.Yc || [],
                engineScripts: c.Na,
                projectScripts: c.ob,
                mainProjectScript: c.$d,
                projectScriptsStatus: self.C3_ProjectScriptsStatus
            }), [h, k, ...M(this.ab)]);
            this.Kb = u.map(l => new l(this));
            this.qd();
            self.c3_callFunction = (l, n) => this.Ka.ef(l, n);
            "preview" === this.L && (self.goToLastErrorScript = () => this.ic("runtime", "go-to-last-error-script"))
        }
        async cf(c, h) {
            this.J = document.createElement("canvas");
            this.J.style.display = "none";
            document.body.appendChild(this.J);
            window.c3canvas = this.J;
            this.Kb = u.map(n => new n(this));
            this.qd();
            var k =
                c.Na.map(n => "string" === typeof n ? (new URL(n, this.D)).toString() : n);
            Array.isArray(c.Yc) && k.unshift(...c.Yc);
            k = await Promise.all(k.map(n => this.vc(n, this.da)));
            await Promise.all(k.map(n => a(n, this.da)));
            const l = self.C3_ProjectScriptsStatus;
            if ("module" === this.da) {
                k = c.$d;
                const n = c.ob;
                for (let [r, q] of n)
                    if (q || (q = r), r === k) try {
                        q = await this.vc(q, this.da), await a(q, this.da), "preview" !== this.L || l[r] || this.Ad(r, "main script did not run to completion")
                    } catch (y) {
                        this.Ad(r, y)
                    } else if ("scriptsInEvents.js" === r || r.endsWith("/scriptsInEvents.js")) q =
                        await this.vc(q, this.da), await a(q, this.da)
            } else if (c.ob && 0 < c.ob.length) try {
                if (await Promise.all(c.ob.map(n => a(n[1], this.da))), Object.values(l).some(n => !n)) {
                    self.setTimeout(() => this.Bd(l), 100);
                    return
                }
            } catch (n) {
                console.error("[Preview] Error loading project scripts: ", n);
                self.setTimeout(() => this.Bd(l), 100);
                return
            }
            "preview" === this.L && "object" !== typeof self.Hg.Jg ? (this.Sa(), console.error("[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."), alert("Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.")) :
                (c = Object.assign(this.rd(c), {
                    isInWorker: !1,
                    messagePort: h,
                    canvas: this.J,
                    runOnStartupFunctions: C
                }), this.ud(), this.Fa = self.C3_CreateRuntime(c), await self.C3_InitRuntime(this.Fa, c))
        }
        Bd(c) {
            this.Sa();
            c = `Failed to load project script '${Object.entries(c).filter(h=>!h[1]).map(h=>h[0])[0]}'. Check all your JavaScript code has valid syntax.`;
            console.error("[Preview] " + c);
            alert(c)
        }
        Ad(c, h) {
            this.Sa();
            console.error(`[Preview] Failed to load project main script (${c}): `, h);
            alert(`Failed to load project main script (${c}). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.`)
        }
        ud() {
            this.Sa()
        }
        Sa() {
            const c =
                window.wg;
            c && (c.parentElement.removeChild(c), window.wg = null)
        }
        async lf() {
            const c = await N(this.ab);
            return {
                outputPort: c,
                transferables: [c]
            }
        }
        bf() {
            if (this.pa) throw Error("not available in worker mode");
            return this.Fa
        }
        ic(c, h, k, l, n) {
            this.na.postMessage({
                type: "event",
                component: c,
                handler: h,
                dispatchOpts: l || null,
                data: k,
                responseId: null
            }, n)
        }
        jd(c, h, k, l, n) {
            const r = F++,
                q = new Promise((y, Q) => {
                    x.set(r, {
                        resolve: y,
                        reject: Q
                    })
                });
            this.na.postMessage({
                    type: "event",
                    component: c,
                    handler: h,
                    dispatchOpts: l || null,
                    data: k,
                    responseId: r
                },
                n);
            return q
        }["_OnMessageFromRuntime"](c) {
            const h = c.type;
            if ("event" === h) return this.rf(c);
            if ("result" === h) this.Ef(c);
            else if ("runtime-ready" === h) this.Ff();
            else if ("alert-error" === h) this.Sa(), alert(c.message);
            else if ("creating-runtime" === h) this.ud();
            else throw Error(`unknown message '${h}'`);
        }
        rf(c) {
            const h = c.component,
                k = c.handler,
                l = c.data,
                n = c.responseId;
            if (c = B.get(h))
                if (c = c.get(k)) {
                    var r = null;
                    try {
                        r = c(l)
                    } catch (q) {
                        console.error(`Exception in '${h}' handler '${k}':`, q);
                        null !== n && this.Db(n, !1, "" + q);
                        return
                    }
                    if (null ===
                        n) return r;
                    r && r.then ? r.then(q => this.Db(n, !0, q)).catch(q => {
                        console.error(`Rejection from '${h}' handler '${k}':`, q);
                        this.Db(n, !1, "" + q)
                    }) : this.Db(n, !0, r)
                } else console.warn(`[DOM] No handler '${k}' for component '${h}'`);
            else console.warn(`[DOM] No event handlers for component '${h}'`)
        }
        Db(c, h, k) {
            let l;
            k && k.transferables && (l = k.transferables);
            this.na.postMessage({
                type: "result",
                responseId: c,
                isOk: h,
                result: k
            }, l)
        }
        Ef(c) {
            const h = c.responseId,
                k = c.isOk;
            c = c.result;
            const l = x.get(h);
            k ? l.resolve(c) : l.reject(c);
            x.delete(h)
        }
        B(c,
            h, k) {
            let l = B.get(c);
            l || (l = new Map, B.set(c, l));
            if (l.has(h)) throw Error(`[DOM] Component '${c}' already has handler '${h}'`);
            l.set(h, k)
        }
        static Zb(c) {
            if (u.includes(c)) throw Error("DOM handler already added");
            u.push(c)
        }
        qd() {
            for (const c of this.Kb)
                if ("runtime" === c.Ua) {
                    this.Ka = c;
                    return
                }
            throw Error("cannot find runtime DOM handler");
        }
        xf(c) {
            this.ic("debugger", "message", c)
        }
        Ff() {
            for (const c of this.Kb) c.Zc()
        }
        static hc() {
            return !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement)
        }
        Ne(c) {
            this.Ia.push(c);
            this.Dc()
        }
        Qf(c) {
            c = this.Ia.indexOf(c);
            if (-1 === c) throw Error("invalid callback");
            this.Ia.splice(c, 1);
            this.Ia.length || this.oc()
        }
        Dc() {
            -1 === this.Ja && this.Ia.length && (this.Ja = requestAnimationFrame(this.ug))
        }
        oc() {
            -1 !== this.Ja && (cancelAnimationFrame(this.Ja), this.Ja = -1)
        }
        Bf() {
            this.Ja = -1;
            for (const c of this.Ia) c();
            this.Dc()
        }
        sa(c) {
            this.Ka.sa(c)
        }
        Aa(c) {
            this.Ka.Aa(c)
        }
        Cc() {
            this.Ka.Cc()
        }
        yb(c) {
            this.Ka.yb(c)
        }
        ze() {
            return !!p["audio/webm; codecs=opus"]
        }
        async ng(c) {
            c = await this.jd("runtime", "opus-decode", {
                    arrayBuffer: c
                },
                null, [c]);
            return new Float32Array(c)
        }
        ye(c) {
            return /^(?:[a-z\-]+:)?\/\//.test(c) || "data:" === c.substr(0, 5) || "blob:" === c.substr(0, 5)
        }
        fd(c) {
            return !this.ye(c)
        }
        async vc(c, h) {
            return "cordova" === this.L && "module" === h && (c.startsWith("file:") || "file:" === location.protocol && this.fd(c)) ? (c.startsWith(this.D) && (c = c.substr(this.D.length)), c = await this.pb(c), URL.createObjectURL(new Blob([c], {
                type: "application/javascript"
            }))) : c
        }
        async kf(c) {
            const h = c.filename;
            switch (c.as) {
                case "text":
                    return await this.re(h);
                case "buffer":
                    return await this.pb(h);
                default:
                    throw Error("unsupported type");
            }
        }
        bd(c) {
            const h = window.cordova.file.applicationDirectory + "www/" + c.toLowerCase();
            return new Promise((k, l) => {
                window.resolveLocalFileSystemURL(h, n => {
                    n.file(k, l)
                }, l)
            })
        }
        async re(c) {
            c = await this.bd(c);
            return await v(c)
        }
        pc() {
            if (A.length && !(8 <= t)) {
                t++;
                var c = A.shift();
                this.Te(c.filename, c.Dg, c.yg)
            }
        }
        pb(c) {
            return new Promise((h, k) => {
                A.push({
                    filename: c,
                    Dg: l => {
                        t--;
                        this.pc();
                        h(l)
                    },
                    yg: l => {
                        t--;
                        this.pc();
                        k(l)
                    }
                });
                this.pc()
            })
        }
        async Te(c, h, k) {
            try {
                const l = await this.bd(c),
                    n = await z(l);
                h(n)
            } catch (l) {
                k(l)
            }
        }
        async Se() {
            const c = [];
            for (const [h, k] of Object.entries(this.ia)) c.push(this.Re(h, k));
            await Promise.all(c)
        }
        async Re(c, h) {
            if ("object" === typeof h) this.ia[c] = new Blob([h.str], {
                type: h.type
            }), this.Pb[c] = h.str;
            else {
                let k = await this.$e(h);
                k || (k = this.Ve(h));
                this.ia[c] = k
            }
        }
        async $e(c) {
            try {
                return await (await fetch(c)).blob()
            } catch (h) {
                return console.warn("Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.",
                    h), null
            }
        }
        Ve(c) {
            c = this.Kf(c);
            return this.Qe(c.data, c.Ag)
        }
        Kf(c) {
            var h = c.indexOf(",");
            if (0 > h) throw new URIError("expected comma in data: uri");
            var k = c.substring(h + 1);
            h = c.substring(5, h).split(";");
            c = h[0] || "";
            const l = h[2];
            k = "base64" === h[1] || "base64" === l ? atob(k) : decodeURIComponent(k);
            return {
                Ag: c,
                data: k
            }
        }
        Qe(c, h) {
            var k = c.length;
            let l = k >> 2,
                n = new Uint8Array(k),
                r = new Uint32Array(n.buffer, 0, l),
                q, y;
            for (y = q = 0; q < l; ++q) r[q] = c.charCodeAt(y++) | c.charCodeAt(y++) << 8 | c.charCodeAt(y++) << 16 | c.charCodeAt(y++) << 24;
            for (k &=
                3; k--;) n[y] = c.charCodeAt(y), ++y;
            return new Blob([n], {
                type: h
            })
        }
    }
}
"use strict"; {
    const g = self.wb;

    function a(e) {
        return e.sourceCapabilities && e.sourceCapabilities.firesTouchEvents || e.originalEvent && e.originalEvent.sourceCapabilities && e.originalEvent.sourceCapabilities.firesTouchEvents
    }
    const b = new Map([
            ["OSLeft", "MetaLeft"],
            ["OSRight", "MetaRight"]
        ]),
        d = {
            dispatchRuntimeEvent: !0,
            dispatchUserScriptEvent: !0
        },
        f = {
            dispatchUserScriptEvent: !0
        },
        m = {
            dispatchRuntimeEvent: !0
        };

    function p(e) {
        return new Promise((c, h) => {
            const k = document.createElement("link");
            k.onload = () => c(k);
            k.onerror = l => h(l);
            k.rel =
                "stylesheet";
            k.href = e;
            document.head.appendChild(k)
        })
    }

    function v(e) {
        return new Promise((c, h) => {
            const k = new Image;
            k.onload = () => c(k);
            k.onerror = l => h(l);
            k.src = e
        })
    }
    async function z(e) {
        e = URL.createObjectURL(e);
        try {
            return await v(e)
        } finally {
            URL.revokeObjectURL(e)
        }
    }

    function A(e) {
        return new Promise((c, h) => {
            let k = new FileReader;
            k.onload = l => c(l.target.result);
            k.onerror = l => h(l);
            k.readAsText(e)
        })
    }
    async function t(e, c, h) {
        if (!/firefox/i.test(navigator.userAgent)) return await z(e);
        var k = await A(e);
        k = (new DOMParser).parseFromString(k,
            "image/svg+xml");
        const l = k.documentElement;
        if (l.hasAttribute("width") && l.hasAttribute("height")) {
            const n = l.getAttribute("width"),
                r = l.getAttribute("height");
            if (!n.includes("%") && !r.includes("%")) return await z(e)
        }
        l.setAttribute("width", c + "px");
        l.setAttribute("height", h + "px");
        k = (new XMLSerializer).serializeToString(k);
        e = new Blob([k], {
            type: "image/svg+xml"
        });
        return await z(e)
    }

    function u(e) {
        do {
            if (e.parentNode && e.hasAttribute("contenteditable")) return !0;
            e = e.parentNode
        } while (e);
        return !1
    }
    const B = new Set(["canvas",
        "body", "html"
    ]);

    function x(e) {
        B.has(e.target.tagName.toLowerCase()) && e.preventDefault()
    }

    function F(e) {
        (e.metaKey || e.ctrlKey) && e.preventDefault()
    }
    self.C3_GetSvgImageSize = async function(e) {
        e = await z(e);
        if (0 < e.width && 0 < e.height) return [e.width, e.height]; {
            e.style.position = "absolute";
            e.style.left = "0px";
            e.style.top = "0px";
            e.style.visibility = "hidden";
            document.body.appendChild(e);
            const c = e.getBoundingClientRect();
            document.body.removeChild(e);
            return [c.width, c.height]
        }
    };
    self.C3_RasterSvgImageBlob = async function(e,
        c, h, k, l) {
        e = await t(e, c, h);
        const n = document.createElement("canvas");
        n.width = k;
        n.height = l;
        n.getContext("2d").drawImage(e, 0, 0, c, h);
        return n
    };
    let C = !1;
    document.addEventListener("pause", () => C = !0);
    document.addEventListener("resume", () => C = !1);

    function G() {
        try {
            return window.parent && window.parent.document.hasFocus()
        } catch (e) {
            return !1
        }
    }
    g.Zb(class extends self.qb {
        constructor(e) {
            super(e, "runtime");
            this.Ld = !0;
            this.La = -1;
            this.Vc = "any";
            this.Cd = this.Dd = !1;
            this.Pc = this.jb = this.wa = null;
            e.B("canvas", "update-size", k =>
                this.If(k));
            e.B("runtime", "invoke-download", k => this.vf(k));
            e.B("runtime", "raster-svg-image", k => this.Cf(k));
            e.B("runtime", "get-svg-image-size", k => this.tf(k));
            e.B("runtime", "set-target-orientation", k => this.Gf(k));
            e.B("runtime", "register-sw", () => this.Df());
            e.B("runtime", "post-to-debugger", k => this.wd(k));
            e.B("runtime", "go-to-script", k => this.wd(k));
            e.B("runtime", "before-start-ticking", () => this.jf());
            e.B("runtime", "debug-highlight", k => this.mf(k));
            e.B("runtime", "enable-device-orientation", () => this.Pe());
            e.B("runtime", "enable-device-motion", () => this.Oe());
            e.B("runtime", "add-stylesheet", k => this.gf(k));
            e.B("runtime", "alert", k => this.hf(k));
            e.B("runtime", "hide-cordova-splash", () => this.uf());
            const c = new Set(["input", "textarea", "datalist"]);
            window.addEventListener("contextmenu", k => {
                const l = k.target;
                c.has(l.tagName.toLowerCase()) || u(l) || k.preventDefault()
            });
            const h = e.J;
            window.addEventListener("selectstart", x);
            window.addEventListener("gesturehold", x);
            h.addEventListener("selectstart", x);
            h.addEventListener("gesturehold",
                x);
            window.addEventListener("touchstart", x, {
                passive: !1
            });
            "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", x, {
                passive: !1
            }), h.addEventListener("pointerdown", x)) : h.addEventListener("touchstart", x);
            this.gb = 0;
            window.addEventListener("mousedown", k => {
                1 === k.button && k.preventDefault()
            });
            window.addEventListener("mousewheel", F, {
                passive: !1
            });
            window.addEventListener("wheel", F, {
                passive: !1
            });
            window.addEventListener("resize", () => this.Jf());
            e.ub() && window.addEventListener("focusout", () => {
                {
                    const n =
                        document.activeElement;
                    if (n) {
                        var k = n.tagName.toLowerCase();
                        var l = new Set("email number password search tel text url".split(" "));
                        k = "textarea" === k ? !0 : "input" === k ? l.has(n.type.toLowerCase() || "text") : u(n)
                    } else k = !1
                }
                k || (document.scrollingElement.scrollTop = 0)
            });
            this.Ga = new Set;
            this.Qb = new WeakSet;
            this.ma = !1
        }
        jf() {
            "cordova" === this.v.L ? (document.addEventListener("pause", () => this.Bc(!0)), document.addEventListener("resume", () => this.Bc(!1))) : document.addEventListener("visibilitychange", () => this.Bc(document.hidden));
            return {
                isSuspended: !(!document.hidden && !C)
            }
        }
        Zc() {
            window.addEventListener("focus", () => this.Eb("window-focus"));
            window.addEventListener("blur", () => {
                this.Eb("window-blur", {
                    parentHasFocus: G()
                });
                this.gb = 0
            });
            window.addEventListener("fullscreenchange", () => this.xc());
            window.addEventListener("webkitfullscreenchange", () => this.xc());
            window.addEventListener("mozfullscreenchange", () => this.xc());
            window.addEventListener("fullscreenerror", c => this.yc(c));
            window.addEventListener("webkitfullscreenerror", c => this.yc(c));
            window.addEventListener("mozfullscreenerror", c => this.yc(c));
            window.addEventListener("keydown", c => this.vd("keydown", c));
            window.addEventListener("keyup", c => this.vd("keyup", c));
            window.addEventListener("dblclick", c => this.zc("dblclick", c, d));
            window.addEventListener("wheel", c => this.zf(c));
            "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", c => {
                this.sc(c);
                this.Ra("pointerdown", c)
            }), this.v.pa && "undefined" !== typeof window.onpointerrawupdate && self === self.top ? (this.jb = new self.Ee(() => this.Ye(),
                5), this.jb.Gd = !0, window.addEventListener("pointerrawupdate", c => this.Af(c))) : window.addEventListener("pointermove", c => this.Ra("pointermove", c)), window.addEventListener("pointerup", c => this.Ra("pointerup", c)), window.addEventListener("pointercancel", c => this.Ra("pointercancel", c))) : (window.addEventListener("mousedown", c => {
                this.sc(c);
                this.Ac("pointerdown", c)
            }), window.addEventListener("mousemove", c => this.Ac("pointermove", c)), window.addEventListener("mouseup", c => this.Ac("pointerup", c)), window.addEventListener("touchstart",
                c => {
                    this.sc(c);
                    this.Cb("pointerdown", c)
                }), window.addEventListener("touchmove", c => this.Cb("pointermove", c)), window.addEventListener("touchend", c => this.Cb("pointerup", c)), window.addEventListener("touchcancel", c => this.Cb("pointercancel", c)));
            const e = () => this.Cc();
            window.addEventListener("pointerup", e, !0);
            window.addEventListener("touchend", e, !0);
            window.addEventListener("click", e, !0);
            window.addEventListener("keydown", e, !0);
            window.addEventListener("gamepadconnected", e, !0)
        }
        Eb(e, c) {
            w(this, e, c || null, m)
        }
        ua() {
            return this.v.ua()
        }
        ta() {
            return this.v.ta()
        }
        Jf() {
            const e =
                this.ua(),
                c = this.ta();
            this.Eb("window-resize", {
                innerWidth: e,
                innerHeight: c,
                devicePixelRatio: window.devicePixelRatio
            });
            this.v.ub() && (-1 !== this.La && clearTimeout(this.La), this.xd(e, c, 0))
        }
        Rf(e, c, h) {
            -1 !== this.La && clearTimeout(this.La);
            this.La = setTimeout(() => this.xd(e, c, h), 48)
        }
        xd(e, c, h) {
            const k = this.ua(),
                l = this.ta();
            this.La = -1;
            k != e || l != c ? this.Eb("window-resize", {
                innerWidth: k,
                innerHeight: l,
                devicePixelRatio: window.devicePixelRatio
            }) : 10 > h && this.Rf(k, l, h + 1)
        }
        Gf(e) {
            this.Vc = e.targetOrientation
        }
        jg() {
            const e = this.Vc;
            if (screen.orientation && screen.orientation.lock) screen.orientation.lock(e).catch(c => console.warn("[Construct 3] Failed to lock orientation: ", c));
            else try {
                let c = !1;
                screen.lockOrientation ? c = screen.lockOrientation(e) : screen.webkitLockOrientation ? c = screen.webkitLockOrientation(e) : screen.mozLockOrientation ? c = screen.mozLockOrientation(e) : screen.msLockOrientation && (c = screen.msLockOrientation(e));
                c || console.warn("[Construct 3] Failed to lock orientation")
            } catch (c) {
                console.warn("[Construct 3] Failed to lock orientation: ",
                    c)
            }
        }
        xc() {
            const e = g.hc();
            e && "any" !== this.Vc && this.jg();
            w(this, "fullscreenchange", {
                isFullscreen: e,
                innerWidth: this.ua(),
                innerHeight: this.ta()
            })
        }
        yc(e) {
            console.warn("[Construct 3] Fullscreen request failed: ", e);
            w(this, "fullscreenerror", {
                isFullscreen: g.hc(),
                innerWidth: this.ua(),
                innerHeight: this.ta()
            })
        }
        Bc(e) {
            e ? this.v.oc() : this.v.Dc();
            w(this, "visibilitychange", {
                hidden: e
            })
        }
        vd(e, c) {
            "Backspace" === c.key && x(c);
            const h = b.get(c.code) || c.code;
            D(this, e, {
                code: h,
                key: c.key,
                which: c.which,
                repeat: c.repeat,
                altKey: c.altKey,
                ctrlKey: c.ctrlKey,
                metaKey: c.metaKey,
                shiftKey: c.shiftKey,
                timeStamp: c.timeStamp
            }, d)
        }
        zf(e) {
            w(this, "wheel", {
                clientX: e.clientX,
                clientY: e.clientY,
                pageX: e.pageX,
                pageY: e.pageY,
                deltaX: e.deltaX,
                deltaY: e.deltaY,
                deltaZ: e.deltaZ,
                deltaMode: e.deltaMode,
                timeStamp: e.timeStamp
            }, d)
        }
        zc(e, c, h) {
            a(c) || D(this, e, {
                button: c.button,
                buttons: c.buttons,
                clientX: c.clientX,
                clientY: c.clientY,
                pageX: c.pageX,
                pageY: c.pageY,
                timeStamp: c.timeStamp
            }, h)
        }
        Ac(e, c) {
            if (!a(c)) {
                var h = this.gb;
                "pointerdown" === e && 0 !== h ? e = "pointermove" : "pointerup" ===
                    e && 0 !== c.buttons && (e = "pointermove");
                D(this, e, {
                    pointerId: 1,
                    pointerType: "mouse",
                    button: c.button,
                    buttons: c.buttons,
                    lastButtons: h,
                    clientX: c.clientX,
                    clientY: c.clientY,
                    pageX: c.pageX,
                    pageY: c.pageY,
                    width: 0,
                    height: 0,
                    pressure: 0,
                    tangentialPressure: 0,
                    tiltX: 0,
                    tiltY: 0,
                    twist: 0,
                    timeStamp: c.timeStamp
                }, d);
                this.gb = c.buttons;
                this.zc(c.type, c, f)
            }
        }
        Ra(e, c) {
            if (this.jb && "pointermove" !== e) {
                var h = this.jb;
                h.Za || (J(h), h.Nb = Date.now())
            }
            h = 0;
            "mouse" === c.pointerType && (h = this.gb);
            D(this, e, {
                pointerId: c.pointerId,
                pointerType: c.pointerType,
                button: c.button,
                buttons: c.buttons,
                lastButtons: h,
                clientX: c.clientX,
                clientY: c.clientY,
                pageX: c.pageX,
                pageY: c.pageY,
                width: c.width || 0,
                height: c.height || 0,
                pressure: c.pressure || 0,
                tangentialPressure: c.tangentialPressure || 0,
                tiltX: c.tiltX || 0,
                tiltY: c.tiltY || 0,
                twist: c.twist || 0,
                timeStamp: c.timeStamp
            }, d);
            "mouse" === c.pointerType && (h = "mousemove", "pointerdown" === e ? h = "mousedown" : "pointerup" === e && (h = "mouseup"), this.zc(h, c, f), this.gb = c.buttons)
        }
        Af(e) {
            this.Pc = e;
            e = this.jb;
            if (-1 === e.Ma) {
                var c = Date.now(),
                    h = c - e.Nb,
                    k = e.pg;
                h >= k && e.Gd ? (e.Nb = c, e.Za = !0, e.Gc(), e.Za = !1) : e.Ma = self.setTimeout(e.Yd, Math.max(k - h, 4))
            }
        }
        Ye() {
            this.Ra("pointermove", this.Pc);
            this.Pc = null
        }
        Cb(e, c) {
            for (let h = 0, k = c.changedTouches.length; h < k; ++h) {
                const l = c.changedTouches[h];
                D(this, e, {
                    pointerId: l.identifier,
                    pointerType: "touch",
                    button: 0,
                    buttons: 0,
                    lastButtons: 0,
                    clientX: l.clientX,
                    clientY: l.clientY,
                    pageX: l.pageX,
                    pageY: l.pageY,
                    width: 2 * (l.radiusX || l.webkitRadiusX || 0),
                    height: 2 * (l.radiusY || l.webkitRadiusY || 0),
                    pressure: l.force || l.webkitForce || 0,
                    tangentialPressure: 0,
                    tiltX: 0,
                    tiltY: 0,
                    twist: l.rotationAngle || 0,
                    timeStamp: c.timeStamp
                }, d)
            }
        }
        sc(e) {
            window !== window.top && window.focus();
            this.td(e.target) && document.activeElement && !this.td(document.activeElement) && document.activeElement.blur()
        }
        td(e) {
            return !e || e === document || e === window || e === document.body || "canvas" === e.tagName.toLowerCase()
        }
        Pe() {
            this.Dd || (this.Dd = !0, window.addEventListener("deviceorientation", e => this.pf(e)), window.addEventListener("deviceorientationabsolute", e => this.qf(e)))
        }
        Oe() {
            this.Cd || (this.Cd = !0, window.addEventListener("devicemotion",
                e => this.nf(e)))
        }
        pf(e) {
            w(this, "deviceorientation", {
                absolute: !!e.absolute,
                alpha: e.alpha || 0,
                beta: e.beta || 0,
                gamma: e.gamma || 0,
                timeStamp: e.timeStamp,
                webkitCompassHeading: e.webkitCompassHeading,
                webkitCompassAccuracy: e.webkitCompassAccuracy
            }, d)
        }
        qf(e) {
            w(this, "deviceorientationabsolute", {
                absolute: !!e.absolute,
                alpha: e.alpha || 0,
                beta: e.beta || 0,
                gamma: e.gamma || 0,
                timeStamp: e.timeStamp
            }, d)
        }
        nf(e) {
            let c = null;
            var h = e.acceleration;
            h && (c = {
                x: h.x || 0,
                y: h.y || 0,
                z: h.z || 0
            });
            h = null;
            var k = e.accelerationIncludingGravity;
            k && (h = {
                x: k.x ||
                    0,
                y: k.y || 0,
                z: k.z || 0
            });
            k = null;
            const l = e.rotationRate;
            l && (k = {
                alpha: l.alpha || 0,
                beta: l.beta || 0,
                gamma: l.gamma || 0
            });
            w(this, "devicemotion", {
                acceleration: c,
                accelerationIncludingGravity: h,
                rotationRate: k,
                interval: e.interval,
                timeStamp: e.timeStamp
            }, d)
        }
        If(e) {
            const c = this.v,
                h = c.J;
            h.style.width = e.styleWidth + "px";
            h.style.height = e.styleHeight + "px";
            h.style.marginLeft = e.marginLeft + "px";
            h.style.marginTop = e.marginTop + "px";
            c.hd();
            this.Ld && (h.style.display = "", this.Ld = !1)
        }
        vf(e) {
            const c = e.url;
            e = e.filename;
            const h = document.createElement("a"),
                k = document.body;
            h.textContent = e;
            h.href = c;
            h.download = e;
            k.appendChild(h);
            h.click();
            k.removeChild(h)
        }
        async Cf(e) {
            var c = e.imageBitmapOpts;
            e = await self.C3_RasterSvgImageBlob(e.blob, e.imageWidth, e.imageHeight, e.surfaceWidth, e.surfaceHeight);
            c = c ? await createImageBitmap(e, c) : await createImageBitmap(e);
            return {
                imageBitmap: c,
                transferables: [c]
            }
        }
        async tf(e) {
            return await self.C3_GetSvgImageSize(e.blob)
        }
        async gf(e) {
            await p(e.url)
        }
        Cc() {
            var e = [...this.Ga];
            this.Ga.clear();
            if (!this.ma)
                for (const c of e)(e = c.play()) &&
                    e.catch(() => {
                        this.Qb.has(c) || this.Ga.add(c)
                    })
        }
        sa(e) {
            if ("function" !== typeof e.play) throw Error("missing play function");
            this.Qb.delete(e);
            let c;
            try {
                c = e.play()
            } catch (h) {
                this.Ga.add(e);
                return
            }
            c && c.catch(() => {
                this.Qb.has(e) || this.Ga.add(e)
            })
        }
        Aa(e) {
            this.Ga.delete(e);
            this.Qb.add(e)
        }
        yb(e) {
            this.ma = !!e
        }
        uf() {
            navigator.splashscreen && navigator.splashscreen.hide && navigator.splashscreen.hide()
        }
        mf(e) {
            if (e.show) {
                this.wa || (this.wa = document.createElement("div"), this.wa.id = "inspectOutline", document.body.appendChild(this.wa));
                var c = this.wa;
                c.style.display = "";
                c.style.left = e.left - 1 + "px";
                c.style.top = e.top - 1 + "px";
                c.style.width = e.width + 2 + "px";
                c.style.height = e.height + 2 + "px";
                c.textContent = e.name
            } else this.wa && (this.wa.style.display = "none")
        }
        Df() {
            window.C3_RegisterSW && window.C3_RegisterSW()
        }
        wd(e) {
            window.c3_postToMessagePort && (e.from = "runtime", window.c3_postToMessagePort(e))
        }
        ef(e, c) {
            return this.v.jd(this.Ua, "js-invoke-function", {
                name: e,
                params: c
            }, void 0, void 0)
        }
        hf(e) {
            alert(e.message)
        }
    })
}
"use strict";
async function L(g) {
    if (g.og) throw Error("already initialised");
    g.og = !0;
    var a = g.Ub.rc("dispatchworker.js");
    g.Ic = await g.Ub.ac(a, g.D, {
        name: "DispatchWorker"
    });
    a = new MessageChannel;
    g.Mc = a.port1;
    g.Ic.postMessage({
        type: "_init",
        "in-port": a.port2
    }, [a.port2]);
    g.Tc = await N(g)
}

function M(g) {
    return [g.Mc, g.Tc]
}
async function N(g) {
    const a = g.Md.length;
    var b = g.Ub.rc("jobworker.js");
    b = await g.Ub.ac(b, g.D, {
        name: "JobWorker" + a
    });
    const d = new MessageChannel,
        f = new MessageChannel;
    g.Ic.postMessage({
        type: "_addJobWorker",
        port: d.port1
    }, [d.port1]);
    b.postMessage({
        type: "init",
        number: a,
        "dispatch-port": d.port2,
        "output-port": f.port2
    }, [d.port2, f.port2]);
    g.Md.push(b);
    return f.port1
}
self.Ae = class {
    constructor(g) {
        this.Ub = g;
        this.D = g.D;
        this.D = "preview" === g.L ? this.D + "c3/workers/" : this.D + g.Vb;
        this.rg = Math.min(navigator.hardwareConcurrency || 2, 16);
        this.Ic = null;
        this.Md = [];
        this.Tc = this.Mc = null
    }
};
"use strict";
window.C3_IsSupported && (window.c3_runtimeInterface = new self.wb({
    Eg: !0,
    Fg: "workermain.js",
    Na: ["scripts/c3runtime.js"],
    ob: [],
    $d: "",
    ae: "module",
    Bg: "scripts/",
    Yc: [],
    Zd: "html5"
}));
"use strict"; {
    const g = 180 / Math.PI;
    self.ea = class extends self.qb {
        constructor(a) {
            super(a, "audio");
            this.Jb = this.f = null;
            this.Lb = this.Lc = !1;
            this.oa = () => this.kg();
            this.aa = [];
            this.C = [];
            this.ha = null;
            this.Nd = "";
            this.Od = -1;
            this.ib = new Map;
            this.Qc = 1;
            this.ma = !1;
            this.Wc = 0;
            this.Xb = 1;
            this.Jc = 0;
            this.Qd = "HRTF";
            this.Hd = "inverse";
            this.Rd = 600;
            this.Pd = 1E4;
            this.Td = 1;
            this.Jd = this.Uc = !1;
            this.Wd = this.v.ze();
            this.ba = new Map;
            this.Da = new Set;
            this.Nc = !1;
            this.Rc = "";
            this.xa = null;
            self.C3Audio_OnMicrophoneStream = (b, d) => this.yf(b, d);
            this.Ib = null;
            self.C3Audio_GetOutputStream = () => this.sf();
            self.C3Audio_DOMInterface = this;
            H(this, [
                ["create-audio-context", b => this.Ue(b)],
                ["play", b => this.Lf(b)],
                ["stop", b => this.hg(b)],
                ["stop-all", () => this.ig()],
                ["set-paused", b => this.ag(b)],
                ["set-volume", b => this.fg(b)],
                ["fade-volume", b => this.Ze(b)],
                ["set-master-volume", b => this.Zf(b)],
                ["set-muted", b => this.$f(b)],
                ["set-silent", b => this.cg(b)],
                ["set-looping", b => this.Yf(b)],
                ["set-playback-rate", b => this.bg(b)],
                ["seek", b => this.Sf(b)],
                ["preload", b => this.Mf(b)],
                ["unload", b =>
                    this.lg(b)
                ],
                ["unload-all", () => this.mg()],
                ["set-suspended", b => this.dg(b)],
                ["add-effect", b => this.od(b)],
                ["set-effect-param", b => this.Vf(b)],
                ["remove-effects", b => this.Of(b)],
                ["tick", b => this.Hf(b)],
                ["load-state", b => this.wf(b)]
            ])
        }
        async Ue(a) {
            a.isiOSCordova && (this.Uc = !0);
            this.Wc = a.timeScaleMode;
            this.Qd = ["equalpower", "HRTF", "soundfield"][a.panningModel];
            this.Hd = ["linear", "inverse", "exponential"][a.distanceModel];
            this.Rd = a.refDistance;
            this.Pd = a.maxDistance;
            this.Td = a.rolloffFactor;
            var b = {
                latencyHint: a.latencyHint
            };
            this.Wd || (b.sampleRate = 48E3);
            if ("undefined" !== typeof AudioContext) this.f = new AudioContext(b);
            else if ("undefined" !== typeof webkitAudioContext) this.f = new webkitAudioContext(b);
            else throw Error("Web Audio API not supported");
            this.pd();
            this.f.onstatechange = () => {
                "running" !== this.f.state && this.pd()
            };
            this.Jb = this.f.createGain();
            this.Jb.connect(this.f.destination);
            b = a.listenerPos;
            this.f.listener.setPosition(b[0], b[1], b[2]);
            this.f.listener.setOrientation(0, 0, 1, 0, -1, 0);
            self.C3_GetAudioContextCurrentTime = () =>
                this.bc();
            try {
                await Promise.all(a.preloadList.map(d => this.Ab(d.originalUrl, d.url, d.type, !1)))
            } catch (d) {
                console.error("[Construct 3] Preloading sounds failed: ", d)
            }
            return {
                sampleRate: this.f.sampleRate
            }
        }
        pd() {
            this.Lb || (this.Lc = !1, window.addEventListener("pointerup", this.oa, !0), window.addEventListener("touchend", this.oa, !0), window.addEventListener("click", this.oa, !0), window.addEventListener("keydown", this.oa, !0), this.Lb = !0)
        }
        We() {
            this.Lb && (this.Lc = !0, window.removeEventListener("pointerup", this.oa, !0), window.removeEventListener("touchend",
                this.oa, !0), window.removeEventListener("click", this.oa, !0), window.removeEventListener("keydown", this.oa, !0), this.Lb = !1)
        }
        kg() {
            if (!this.Lc) {
                var a = this.f;
                "suspended" === a.state && a.resume && a.resume();
                var b = a.createBuffer(1, 220, 22050),
                    d = a.createBufferSource();
                d.buffer = b;
                d.connect(a.destination);
                d.start(0);
                "running" === a.state && this.We()
            }
        }
        W() {
            return this.f
        }
        bc() {
            return this.f.currentTime
        }
        qa() {
            return this.Jb
        }
        dd(a) {
            return (a = this.ba.get(a.toLowerCase())) ? a[0].P() : this.qa()
        }
        be(a, b) {
            a = a.toLowerCase();
            let d = this.ba.get(a);
            d || (d = [], this.ba.set(a, d));
            b.Xf(d.length);
            b.eg(a);
            d.push(b);
            this.zd(a)
        }
        zd(a) {
            let b = this.qa();
            const d = this.ba.get(a);
            if (d && d.length) {
                b = d[0].P();
                for (let f = 0, m = d.length; f < m; ++f) {
                    const p = d[f];
                    f + 1 === m ? p.S(this.qa()) : p.S(d[f + 1].P())
                }
            }
            for (const f of this.ka(a)) f.Fe(b);
            this.xa && this.Rc === a && (this.xa.disconnect(), this.xa.connect(b))
        }
        sb() {
            return this.Qc
        }
        tb() {
            return this.ma
        }
        Wf() {
            this.Jd = !0
        }
        te(a, b) {
            return b ? this.v.ng(a).then(d => {
                    const f = this.f.createBuffer(1, d.length, 48E3);
                    f.getChannelData(0).set(d);
                    return f
                }) :
                new Promise((d, f) => {
                    this.f.decodeAudioData(a, d, f)
                })
        }
        sa(a) {
            this.v.sa(a)
        }
        Aa(a) {
            this.v.Aa(a)
        }
        kd(a) {
            let b = 0;
            for (let d = 0, f = this.C.length; d < f; ++d) {
                const m = this.C[d];
                this.C[b] = m;
                m.K === a ? m.c() : ++b
            }
            this.C.length = b
        }
        Ge() {
            let a = 0;
            for (let b = 0, d = this.aa.length; b < d; ++b) {
                const f = this.aa[b];
                this.aa[a] = f;
                f.ra() ? f.c() : ++a
            }
            this.aa.length = a
        }* ka(a) {
            if (a)
                for (const b of this.C) self.ea.ue(b.Z, a) && (yield b);
            else this.ha && !this.ha.T() && (yield this.ha)
        }
        async Ab(a, b, d, f, m) {
            for (const p of this.aa)
                if (p.Pa() === b) return await O(p),
                    p;
            if (m) return null;
            f && (this.Uc || this.Jd) && this.Ge();
            m = "audio/webm; codecs=opus" === d && !this.Wd;
            f && m && this.Wf();
            a = !f || this.Uc || m ? new self.pe(this, a, b, d, f, m) : new self.ne(this, a, b, d, f);
            this.aa.push(a);
            await O(a);
            return a
        }
        async qc(a, b, d, f, m) {
            for (const p of this.C)
                if (p.Pa() === b && (p.$b() || m)) return p.Ie(f), p;
            a = await this.Ab(a, b, d, m);
            f = "html5" === a.Ec ? new self.oe(a.i, a, f) : new self.qe(a.i, a, f);
            this.C.push(f);
            return f
        }
        Me(a) {
            let b = this.ib.get(a);
            if (!b) {
                let d = null;
                b = {
                    Xc: 0,
                    promise: new Promise(f => d = f),
                    resolve: d
                };
                this.ib.set(a, b)
            }
            b.Xc++
        }
        Pf(a) {
            const b = this.ib.get(a);
            if (!b) throw Error("expected pending tag");
            b.Xc--;
            0 === b.Xc && (b.resolve(), this.ib.delete(a))
        }
        nc(a) {
            a || (a = this.Nd);
            return (a = this.ib.get(a)) ? a.promise : Promise.resolve()
        }
        Bb() {
            if (0 < this.Da.size) I(this);
            else
                for (const a of this.C)
                    if (a.ed()) {
                        I(this);
                        break
                    }
        }
        Ba() {
            for (var a of this.Da) a.Ba();
            a = this.bc();
            for (var b of this.C) b.Ba(a);
            b = this.C.filter(d => d.ed()).map(d => d.Oa());
            w(this, "state", {
                tickCount: this.Od,
                audioInstances: b,
                analysers: [...this.Da].map(d => d.we())
            });
            0 === b.length && 0 === this.Da.size && this.Mb && (this.v.Qf(this.Xd), this.Mb = !1)
        }
        jc(a, b, d) {
            w(this, "trigger", {
                type: a,
                tag: b,
                aiid: d
            })
        }
        async Lf(a) {
            const b = a.originalUrl,
                d = a.url,
                f = a.type,
                m = a.isMusic,
                p = a.tag,
                v = a.isLooping,
                z = a.vol,
                A = a.pos,
                t = a.panning;
            let u = a.off;
            0 < u && !a.trueClock && (this.f.getOutputTimestamp ? (a = this.f.getOutputTimestamp(), u = u - a.performanceTime / 1E3 + a.contextTime) : u = u - performance.now() / 1E3 + this.f.currentTime);
            this.Nd = p;
            this.Me(p);
            try {
                this.ha = await this.qc(b, d, f, p, m), t ? (this.ha.xb(!0), this.ha.He(t.x,
                    t.y, t.angle, t.innerAngle, t.outerAngle, t.outerGain), t.hasOwnProperty("uid") && this.ha.Je(t.uid)) : this.ha.xb(!1), this.ha.Play(v, z, A, u)
            } catch (B) {
                console.error("[Construct 3] Audio: error starting playback: ", B);
                return
            } finally {
                this.Pf(p)
            }
            I(this)
        }
        hg(a) {
            a = a.tag;
            for (const b of this.ka(a)) b.la()
        }
        ig() {
            for (const a of this.C) a.la()
        }
        ag(a) {
            const b = a.tag;
            a = a.paused;
            for (const d of this.ka(b)) a ? d.Qa() : d.vb();
            this.Bb()
        }
        fg(a) {
            const b = a.tag;
            a = a.vol;
            for (const d of this.ka(b)) d.zb(a)
        }
        async Ze(a) {
            const b = a.tag,
                d = a.vol,
                f = a.duration;
            a = a.stopOnEnd;
            await this.nc(b);
            for (const m of this.ka(b)) m.ve(d, f, a);
            this.Bb()
        }
        Zf(a) {
            this.Qc = a.vol;
            for (const b of this.C) b.Gb()
        }
        $f(a) {
            const b = a.tag;
            a = a.isMuted;
            for (const d of this.ka(b)) d.ld(a)
        }
        cg(a) {
            this.ma = a.isSilent;
            this.v.yb(this.ma);
            for (const b of this.C) b.Fb()
        }
        Yf(a) {
            const b = a.tag;
            a = a.isLooping;
            for (const d of this.ka(b)) d.lc(a)
        }
        async bg(a) {
            const b = a.tag;
            a = a.rate;
            await this.nc(b);
            for (const d of this.ka(b)) d.nd(a)
        }
        async Sf(a) {
            const b = a.tag;
            a = a.pos;
            await this.nc(b);
            for (const d of this.ka(b)) d.kc(a)
        }
        async Mf(a) {
            const b =
                a.originalUrl,
                d = a.url,
                f = a.type;
            a = a.isMusic;
            try {
                await this.qc(b, d, f, "", a)
            } catch (m) {
                console.error("[Construct 3] Audio: error preloading: ", m)
            }
        }
        async lg(a) {
            if (a = await this.Ab("", a.url, a.type, a.isMusic, !0)) a.c(), a = this.aa.indexOf(a), -1 !== a && this.aa.splice(a, 1)
        }
        mg() {
            for (const a of this.aa) a.c();
            this.aa.length = 0
        }
        dg(a) {
            a = a.isSuspended;
            !a && this.f.resume && this.f.resume();
            for (const b of this.C) b.mc(a);
            a && this.f.suspend && this.f.suspend()
        }
        Hf(a) {
            this.Xb = a.timeScale;
            this.Jc = a.gameTime;
            this.Od = a.tickCount;
            if (0 !==
                this.Wc)
                for (var b of this.C) b.Ca();
            (b = a.listenerPos) && this.f.listener.setPosition(b[0], b[1], b[2]);
            for (const d of a.instPans) {
                a = d.uid;
                for (const f of this.C) f.ga === a && f.md(d.x, d.y, d.angle)
            }
        }
        async od(a) {
            var b = a.type;
            const d = a.tag;
            var f = a.params;
            if ("filter" === b) f = new self.he(this, ...f);
            else if ("delay" === b) f = new self.fe(this, ...f);
            else if ("convolution" === b) {
                b = null;
                try {
                    b = await this.Ab(a.bufferOriginalUrl, a.bufferUrl, a.bufferType, !1)
                } catch (m) {
                    console.log("[Construct 3] Audio: error loading convolution: ",
                        m);
                    return
                }
                f = new self.ee(this, b.$, ...f);
                f.Tf(a.bufferOriginalUrl, a.bufferType)
            } else if ("flanger" === b) f = new self.ie(this, ...f);
            else if ("phaser" === b) f = new self.ke(this, ...f);
            else if ("gain" === b) f = new self.je(this, ...f);
            else if ("tremolo" === b) f = new self.me(this, ...f);
            else if ("ringmod" === b) f = new self.le(this, ...f);
            else if ("distortion" === b) f = new self.ge(this, ...f);
            else if ("compressor" === b) f = new self.de(this, ...f);
            else if ("analyser" === b) f = new self.ce(this, ...f);
            else throw Error("invalid effect type");
            this.be(d,
                f);
            this.yd()
        }
        Vf(a) {
            const b = a.index,
                d = a.param,
                f = a.value,
                m = a.ramp,
                p = a.time;
            a = this.ba.get(a.tag);
            !a || 0 > b || b >= a.length || (a[b].X(d, f, m, p), this.yd())
        }
        Of(a) {
            a = a.tag.toLowerCase();
            const b = this.ba.get(a);
            if (b && b.length) {
                for (const d of b) d.c();
                this.ba.delete(a);
                this.zd(a)
            }
        }
        Le(a) {
            this.Da.add(a);
            this.Bb()
        }
        Nf(a) {
            this.Da.delete(a)
        }
        yd() {
            this.Nc || (this.Nc = !0, Promise.resolve().then(() => this.Xe()))
        }
        Xe() {
            const a = {};
            for (const [b, d] of this.ba) a[b] = d.map(f => f.Oa());
            w(this, "fxstate", {
                fxstate: a
            });
            this.Nc = !1
        }
        async wf(a) {
            const b =
                a.saveLoadMode;
            if (3 !== b)
                for (var d of this.C) d.ra() && 1 === b || (d.ra() || 2 !== b) && d.la();
            for (const f of this.ba.values())
                for (const m of f) m.c();
            this.ba.clear();
            this.Xb = a.timeScale;
            this.Jc = a.gameTime;
            d = a.listenerPos;
            this.f.listener.setPosition(d[0], d[1], d[2]);
            this.ma = a.isSilent;
            this.v.yb(this.ma);
            this.Qc = a.masterVolume;
            d = [];
            for (const f of Object.values(a.effects)) d.push(Promise.all(f.map(m => this.od(m))));
            await Promise.all(d);
            await Promise.all(a.playing.map(f => this.ff(f, b)));
            this.Bb()
        }
        async ff(a, b) {
            if (3 !==
                b) {
                var d = a.bufferOriginalUrl,
                    f = a.bufferUrl,
                    m = a.bufferType,
                    p = a.isMusic,
                    v = a.tag,
                    z = a.isLooping,
                    A = a.volume,
                    t = a.playbackTime;
                if (!p || 1 !== b)
                    if (p || 2 !== b) {
                        b = null;
                        try {
                            b = await this.qc(d, f, m, v, p)
                        } catch (u) {
                            console.error("[Construct 3] Audio: error loading audio state: ", u);
                            return
                        }
                        b.De(a.pan);
                        b.Play(z, A, t, 0);
                        a.isPlaying || b.Qa();
                        b.uc(a)
                    }
            }
        }
        yf(a, b) {
            this.xa && this.xa.disconnect();
            this.Rc = b.toLowerCase();
            this.xa = this.f.createMediaStreamSource(a);
            this.xa.connect(this.dd(this.Rc))
        }
        sf() {
            this.Ib || (this.Ib = this.f.createMediaStreamDestination(),
                this.Jb.connect(this.Ib));
            return this.Ib.stream
        }
        static ue(a, b) {
            return a.length !== b.length ? !1 : a === b ? !0 : a.toLowerCase() === b.toLowerCase()
        }
        static Ke(a) {
            return a * g
        }
        static se(a) {
            return Math.pow(10, a / 20)
        }
        static cd(a) {
            return Math.max(Math.min(self.ea.se(a), 1), 0)
        }
        static Ce(a) {
            return Math.log(a) / Math.log(10) * 20
        }
        static Be(a) {
            return self.ea.Ce(Math.max(Math.min(a, 1), 0))
        }
        static xg(a, b) {
            return 1 - Math.exp(-b * a)
        }
    };
    self.wb.Zb(self.ea)
}
"use strict";

function O(g) {
    g.Ob || (g.Ob = g.tc());
    return g.Ob
}
self.$c = class {
    constructor(g, a, b, d, f) {
        this.i = g;
        this.tg = a;
        this.ya = b;
        this.R = d;
        this.qg = f;
        this.Ec = "";
        this.Ob = null
    }
    c() {
        this.Ob = this.i = null
    }
    tc() {}
    W() {
        return this.i.W()
    }
    dc() {
        return this.tg
    }
    Pa() {
        return this.ya
    }
    cc() {
        return this.R
    }
    ra() {
        return this.qg
    }
    fa() {}
};
"use strict";
self.ne = class extends self.$c {
    constructor(g, a, b, d, f) {
        super(g, a, b, d, f);
        this.Ec = "html5";
        this.I = new Audio;
        this.I.crossOrigin = "anonymous";
        this.I.autoplay = !1;
        this.I.preload = "auto";
        this.bb = this.cb = null;
        this.I.addEventListener("canplaythrough", () => !0);
        this.hb = this.W().createGain();
        this.fb = null;
        this.I.addEventListener("canplay", () => {
            this.cb && (this.cb(), this.bb = this.cb = null);
            !this.fb && this.I && (this.fb = this.W().createMediaElementSource(this.I), this.fb.connect(this.hb))
        });
        this.onended = null;
        this.I.addEventListener("ended",
            () => {
                if (this.onended) this.onended()
            });
        this.I.addEventListener("error", m => {
            console.error(`[Construct 3] Audio '${this.ya}' error: `, m);
            this.bb && (this.bb(m), this.bb = this.cb = null)
        })
    }
    c() {
        this.i.kd(this);
        this.hb.disconnect();
        this.hb = null;
        this.fb.disconnect();
        this.fb = null;
        this.I && !this.I.paused && this.I.pause();
        this.I = this.onended = null;
        super.c()
    }
    tc() {
        return new Promise((g, a) => {
            this.cb = g;
            this.bb = a;
            this.I.src = this.ya
        })
    }
    O() {
        return this.I
    }
    fa() {
        return this.I.duration
    }
};
"use strict";
async function P(g) {
    if (g.va) return g.va;
    var a = g.i.v;
    if ("cordova" === a.L && a.fd(g.ya) && "file:" === location.protocol) g.va = await a.pb(g.ya);
    else {
        a = await fetch(g.ya);
        if (!a.ok) throw Error(`error fetching audio data: ${a.status} ${a.statusText}`);
        g.va = await a.arrayBuffer()
    }
}
async function R(g) {
    if (g.$) return g.$;
    g.$ = await g.i.te(g.va, g.sg);
    g.va = null
}
self.pe = class extends self.$c {
    constructor(g, a, b, d, f, m) {
        super(g, a, b, d, f);
        this.Ec = "webaudio";
        this.$ = this.va = null;
        this.sg = !!m
    }
    c() {
        this.i.kd(this);
        this.$ = this.va = null;
        super.c()
    }
    async tc() {
        try {
            await P(this), await R(this)
        } catch (g) {
            console.error(`[Construct 3] Failed to load audio '${this.ya}': `, g)
        }
    }
    fa() {
        return this.$ ? this.$.duration : 0
    }
};
"use strict"; {
    let g = 0;
    self.ad = class {
        constructor(a, b, d) {
            this.i = a;
            this.K = b;
            this.Z = d;
            this.Hb = g++;
            this.M = this.W().createGain();
            this.M.connect(this.qa());
            this.A = null;
            this.$a = !1;
            this.G = !0;
            this.V = this.ja = this.F = !1;
            this.lb = 1;
            this.Ea = !1;
            this.Y = 1;
            a = this.i.Wc;
            this.Oc = 1 === a && !this.ra() || 2 === a;
            this.Xa = this.ga = -1;
            this.Vd = !1
        }
        c() {
            this.K = this.i = null;
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
        sb() {
            return this.i.sb()
        }
        rb() {
            return this.Oc ? this.i.Jc :
                performance.now() / 1E3
        }
        dc() {
            return this.K.dc()
        }
        Pa() {
            return this.K.Pa()
        }
        cc() {
            return this.K.cc()
        }
        ra() {
            return this.K.ra()
        }
        Ie(a) {
            this.Z = a
        }
        T() {}
        $b() {}
        IsPlaying() {
            return !this.G && !this.F && !this.T()
        }
        ed() {
            return !this.G && !this.T()
        }
        za() {}
        fa() {
            return this.K.fa()
        }
        Play() {}
        la() {}
        Qa() {}
        vb() {}
        zb(a) {
            this.lb = a;
            this.M.gain.cancelScheduledValues(0);
            this.Xa = -1;
            this.M.gain.value = this.ec()
        }
        ve(a, b, d) {
            if (!this.Ea) {
                a *= this.sb();
                var f = this.M.gain;
                f.cancelScheduledValues(0);
                var m = this.i.bc();
                b = m + b;
                f.setValueAtTime(f.value, m);
                f.linearRampToValueAtTime(a, b);
                this.lb = a;
                this.Xa = b;
                this.Vd = d
            }
        }
        Gb() {
            this.zb(this.lb)
        }
        Ba(a) {
            -1 !== this.Xa && a >= this.Xa && (this.Xa = -1, this.Vd && this.la(), this.i.jc("fade-ended", this.Z, this.Hb))
        }
        ec() {
            const a = this.lb * this.sb();
            return isFinite(a) ? a : 0
        }
        ld(a) {
            a = !!a;
            this.Ea !== a && (this.Ea = a, this.Fb())
        }
        tb() {
            return this.i.tb()
        }
        Fb() {}
        lc() {}
        nd(a) {
            this.Y !== a && (this.Y = a, this.Ca())
        }
        Ca() {}
        kc() {}
        mc() {}
        xb(a) {
            a = !!a;
            this.$a !== a && ((this.$a = a) ? (this.A || (this.A = this.W().createPanner(), this.A.panningModel = this.i.Qd, this.A.distanceModel =
                this.i.Hd, this.A.refDistance = this.i.Rd, this.A.maxDistance = this.i.Pd, this.A.rolloffFactor = this.i.Td), this.M.disconnect(), this.M.connect(this.A), this.A.connect(this.qa())) : (this.A.disconnect(), this.M.disconnect(), this.M.connect(this.qa())))
        }
        He(a, b, d, f, m, p) {
            this.$a && (this.md(a, b, d), a = self.ea.Ke, this.A.coneInnerAngle = a(f), this.A.coneOuterAngle = a(m), this.A.coneOuterGain = p)
        }
        md(a, b, d) {
            this.$a && (this.A.setPosition(a, b, 0), this.A.setOrientation(Math.cos(d), Math.sin(d), 0))
        }
        Je(a) {
            this.ga = a
        }
        fc() {}
        Fe(a) {
            const b =
                this.A || this.M;
            b.disconnect();
            b.connect(a)
        }
        Oa() {
            return {
                aiid: this.Hb,
                tag: this.Z,
                duration: this.fa(),
                volume: this.lb,
                isPlaying: this.IsPlaying(),
                playbackTime: this.za(),
                playbackRate: this.Y,
                uid: this.ga,
                bufferOriginalUrl: this.dc(),
                bufferUrl: "",
                bufferType: this.cc(),
                isMusic: this.ra(),
                isLooping: this.V,
                isMuted: this.Ea,
                resumePosition: this.fc(),
                pan: this.xe()
            }
        }
        uc(a) {
            this.nd(a.playbackRate);
            this.ld(a.isMuted)
        }
        xe() {
            if (!this.A) return null;
            const a = this.A;
            return {
                pos: [a.positionX.value, a.positionY.value, a.positionZ.value],
                orient: [a.orientationX.value, a.orientationY.value, a.orientationZ.value],
                cia: a.coneInnerAngle,
                coa: a.coneOuterAngle,
                cog: a.coneOuterGain,
                uid: this.ga
            }
        }
        De(a) {
            a ? (this.xb(!0), a = this.A, a.setPosition(...a.pos), a.setOrientation(...a.orient), a.coneInnerAngle = a.cia, a.coneOuterAngle = a.coa, a.coneOuterGain = a.cog, this.ga = a.uid) : this.xb(!1)
        }
    }
}
"use strict";
self.oe = class extends self.ad {
    constructor(g, a, b) {
        super(g, a, b);
        this.K.hb.connect(this.M);
        this.K.onended = () => this.wc()
    }
    c() {
        this.la();
        this.K.hb.disconnect();
        super.c()
    }
    O() {
        return this.K.O()
    }
    wc() {
        this.G = !0;
        this.ga = -1;
        this.i.jc("ended", this.Z, this.Hb)
    }
    T() {
        return this.O().ended
    }
    $b() {
        return this.G ? !0 : this.T()
    }
    za(g) {
        let a = this.O().currentTime;
        g && (a *= this.Y);
        this.V || (a = Math.min(a, this.fa()));
        return a
    }
    Play(g, a, b) {
        const d = this.O();
        1 !== d.playbackRate && (d.playbackRate = 1);
        d.loop !== g && (d.loop = g);
        this.zb(a);
        d.muted &&
            (d.muted = !1);
        if (d.currentTime !== b) try {
            d.currentTime = b
        } catch (f) {
            console.warn(`[Construct 3] Exception seeking audio '${this.K.Pa()}' to position '${b}': `, f)
        }
        this.i.sa(d);
        this.F = this.G = !1;
        this.V = g;
        this.Y = 1
    }
    la() {
        const g = this.O();
        g.paused || g.pause();
        this.i.Aa(g);
        this.G = !0;
        this.F = !1;
        this.ga = -1
    }
    Qa() {
        if (!(this.F || this.G || this.T())) {
            var g = this.O();
            g.paused || g.pause();
            this.i.Aa(g);
            this.F = !0
        }
    }
    vb() {
        !this.F || this.G || this.T() || (this.i.sa(this.O()), this.F = !1)
    }
    Fb() {
        this.O().muted = this.Ea || this.tb()
    }
    lc(g) {
        g = !!g;
        this.V !== g && (this.V = g, this.O().loop = g)
    }
    Ca() {
        let g = this.Y;
        this.Oc && (g *= this.i.Xb);
        try {
            this.O().playbackRate = g
        } catch (a) {
            console.warn(`[Construct 3] Unable to set playback rate '${g}':`, a)
        }
    }
    kc(g) {
        if (!this.G && !this.T()) try {
            this.O().currentTime = g
        } catch (a) {
            console.warn(`[Construct 3] Error seeking audio to '${g}': `, a)
        }
    }
    fc() {
        return this.za()
    }
    mc(g) {
        g ? this.IsPlaying() ? (this.O().pause(), this.ja = !0) : this.ja = !1 : this.ja && (this.i.sa(this.O()), this.ja = !1)
    }
};
"use strict";

function S(g) {
    g.j && g.j.disconnect();
    g.j = null;
    g.Ta = null
}
self.qe = class extends self.ad {
    constructor(g, a, b) {
        super(g, a, b);
        this.j = null;
        this.Rb = d => this.wc(d);
        this.Kc = !0;
        this.Ta = null;
        this.N = this.Wb = 0;
        this.Sc = 1
    }
    c() {
        this.la();
        S(this);
        this.Rb = null;
        super.c()
    }
    wc(g) {
        this.F || this.ja || g.target !== this.Ta || (this.G = this.Kc = !0, this.ga = -1, S(this), this.i.jc("ended", this.Z, this.Hb))
    }
    T() {
        return !this.G && this.j && this.j.loop || this.F ? !1 : this.Kc
    }
    $b() {
        return !this.j || this.G ? !0 : this.T()
    }
    za(g) {
        let a;
        a = this.F ? this.N : this.rb() - this.Wb;
        g && (a *= this.Y);
        this.V || (a = Math.min(a, this.fa()));
        return a
    }
    Play(g,
        a, b, d) {
        this.Sc = 1;
        this.zb(a);
        S(this);
        this.j = this.W().createBufferSource();
        this.j.buffer = this.K.$;
        this.j.connect(this.M);
        this.Ta = this.j;
        this.j.onended = this.Rb;
        this.j.loop = g;
        this.j.start(d, b);
        this.F = this.G = this.Kc = !1;
        this.V = g;
        this.Y = 1;
        this.Wb = this.rb() - b
    }
    la() {
        if (this.j) try {
            this.j.stop(0)
        } catch (g) {}
        this.G = !0;
        this.F = !1;
        this.ga = -1
    }
    Qa() {
        this.F || this.G || this.T() || (this.N = this.za(!0), this.V && (this.N %= this.fa()), this.F = !0, this.j.stop(0))
    }
    vb() {
        !this.F || this.G || this.T() || (S(this), this.j = this.W().createBufferSource(),
            this.j.buffer = this.K.$, this.j.connect(this.M), this.Ta = this.j, this.j.onended = this.Rb, this.j.loop = this.V, this.Gb(), this.Ca(), this.Wb = this.rb() - this.N / (this.Y || .001), this.j.start(0, this.N), this.F = !1)
    }
    ec() {
        return super.ec() * this.Sc
    }
    Fb() {
        this.Sc = this.Ea || this.tb() ? 0 : 1;
        this.Gb()
    }
    lc(g) {
        g = !!g;
        this.V !== g && (this.V = g, this.j && (this.j.loop = g))
    }
    Ca() {
        let g = this.Y;
        this.Oc && (g *= this.i.Xb);
        this.j && (this.j.playbackRate.value = g)
    }
    kc(g) {
        this.G || this.T() || (this.F ? this.N = g : (this.Qa(), this.N = g, this.vb()))
    }
    fc() {
        return this.N
    }
    mc(g) {
        g ?
            this.IsPlaying() ? (this.ja = !0, this.N = this.za(!0), this.V && (this.N %= this.fa()), this.j.stop(0)) : this.ja = !1 : this.ja && (S(this), this.j = this.W().createBufferSource(), this.j.buffer = this.K.$, this.j.connect(this.M), this.Ta = this.j, this.j.onended = this.Rb, this.j.loop = this.V, this.Gb(), this.Ca(), this.Wb = this.rb() - this.N / (this.Y || .001), this.j.start(0, this.N), this.ja = !1)
    }
    uc(g) {
        super.uc(g);
        this.N = g.resumePosition
    }
};
"use strict"; {
    class g {
        constructor(a) {
            this.i = a;
            this.f = a.W();
            this.Kd = -1;
            this.R = this.Z = "";
            this.g = null
        }
        c() {
            this.f = null
        }
        Xf(a) {
            this.Kd = a
        }
        eg(a) {
            this.Z = a
        }
        o() {
            return this.f.createGain()
        }
        P() {}
        S() {}
        m(a, b, d, f) {
            a.cancelScheduledValues(0);
            if (0 === f) a.value = b;
            else {
                var m = this.f.currentTime;
                f += m;
                switch (d) {
                    case 0:
                        a.setValueAtTime(b, f);
                        break;
                    case 1:
                        a.setValueAtTime(a.value, m);
                        a.linearRampToValueAtTime(b, f);
                        break;
                    case 2:
                        a.setValueAtTime(a.value, m), a.exponentialRampToValueAtTime(b, f)
                }
            }
        }
        Oa() {
            return {
                type: this.R,
                tag: this.Z,
                params: this.g
            }
        }
    }
    self.he = class extends g {
        constructor(a, b, d, f, m, p, v) {
            super(a);
            this.R = "filter";
            this.g = [b, d, f, m, p, v];
            this.l = this.o();
            this.b = this.o();
            this.b.gain.value = v;
            this.a = this.o();
            this.a.gain.value = 1 - v;
            this.u = this.f.createBiquadFilter();
            this.u.type = b;
            this.u.frequency.value = d;
            this.u.detune.value = f;
            this.u.Q.value = m;
            this.u.gain.vlaue = p;
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
        X(a, b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[5] = b;
                    this.m(this.b.gain, b, d, f);
                    this.m(this.a.gain, 1 - b, d, f);
                    break;
                case 1:
                    this.g[1] = b;
                    this.m(this.u.frequency, b, d, f);
                    break;
                case 2:
                    this.g[2] = b;
                    this.m(this.u.detune, b, d, f);
                    break;
                case 3:
                    this.g[3] = b;
                    this.m(this.u.Q, b, d, f);
                    break;
                case 4:
                    this.g[4] = b, this.m(this.u.gain, b, d, f)
            }
        }
    };
    self.fe = class extends g {
        constructor(a, b, d, f) {
            super(a);
            this.R = "delay";
            this.g = [b, d, f];
            this.l =
                this.o();
            this.b = this.o();
            this.b.gain.value = f;
            this.a = this.o();
            this.a.gain.value = 1 - f;
            this.eb = this.o();
            this.U = this.f.createDelay(b);
            this.U.delayTime.value = b;
            this.Wa = this.o();
            this.Wa.gain.value = d;
            this.l.connect(this.eb);
            this.l.connect(this.a);
            this.eb.connect(this.b);
            this.eb.connect(this.U);
            this.U.connect(this.Wa);
            this.Wa.connect(this.eb)
        }
        c() {
            this.l.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            this.eb.disconnect();
            this.U.disconnect();
            this.Wa.disconnect();
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
        X(a, b, d, f) {
            const m = self.ea.cd;
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[2] = b;
                    this.m(this.b.gain, b, d, f);
                    this.m(this.a.gain, 1 - b, d, f);
                    break;
                case 4:
                    this.g[1] = m(b);
                    this.m(this.Wa.gain, m(b), d, f);
                    break;
                case 5:
                    this.g[0] = b, this.m(this.U.delayTime, b, d, f)
            }
        }
    };
    self.ee = class extends g {
        constructor(a, b, d, f) {
            super(a);
            this.R = "convolution";
            this.g = [d, f];
            this.Fd = this.Ed = "";
            this.l = this.o();
            this.b = this.o();
            this.b.gain.value = f;
            this.a = this.o();
            this.a.gain.value =
                1 - f;
            this.Va = this.f.createConvolver();
            this.Va.normalize = d;
            this.Va.buffer = b;
            this.l.connect(this.Va);
            this.l.connect(this.a);
            this.Va.connect(this.b)
        }
        c() {
            this.l.disconnect();
            this.Va.disconnect();
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
        X(a, b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0), this.g[1] = b, this.m(this.b.gain, b, d, f), this.m(this.a.gain, 1 - b, d, f)
            }
        }
        Tf(a, b) {
            this.Ed = a;
            this.Fd = b
        }
        Oa() {
            const a =
                super.Oa();
            a.bufferOriginalUrl = this.Ed;
            a.bufferUrl = "";
            a.bufferType = this.Fd;
            return a
        }
    };
    self.ie = class extends g {
        constructor(a, b, d, f, m, p) {
            super(a);
            this.R = "flanger";
            this.g = [b, d, f, m, p];
            this.l = this.o();
            this.a = this.o();
            this.a.gain.value = 1 - p / 2;
            this.b = this.o();
            this.b.gain.value = p / 2;
            this.Ya = this.o();
            this.Ya.gain.value = m;
            this.U = this.f.createDelay(b + d);
            this.U.delayTime.value = b;
            this.s = this.f.createOscillator();
            this.s.frequency.value = f;
            this.H = this.o();
            this.H.gain.value = d;
            this.l.connect(this.U);
            this.l.connect(this.a);
            this.U.connect(this.b);
            this.U.connect(this.Ya);
            this.Ya.connect(this.U);
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
        X(a, b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[4] = b;
                    this.m(this.b.gain,
                        b / 2, d, f);
                    this.m(this.a.gain, 1 - b / 2, d, f);
                    break;
                case 6:
                    this.g[1] = b / 1E3;
                    this.m(this.H.gain, b / 1E3, d, f);
                    break;
                case 7:
                    this.g[2] = b;
                    this.m(this.s.frequency, b, d, f);
                    break;
                case 8:
                    this.g[3] = b / 100, this.m(this.Ya.gain, b / 100, d, f)
            }
        }
    };
    self.ke = class extends g {
        constructor(a, b, d, f, m, p, v) {
            super(a);
            this.R = "phaser";
            this.g = [b, d, f, m, p, v];
            this.l = this.o();
            this.a = this.o();
            this.a.gain.value = 1 - v / 2;
            this.b = this.o();
            this.b.gain.value = v / 2;
            this.u = this.f.createBiquadFilter();
            this.u.type = "allpass";
            this.u.frequency.value = b;
            this.u.detune.value =
                d;
            this.u.Q.value = f;
            this.s = this.f.createOscillator();
            this.s.frequency.value = p;
            this.H = this.o();
            this.H.gain.value = m;
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
            b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[5] = b;
                    this.m(this.b.gain, b / 2, d, f);
                    this.m(this.a.gain, 1 - b / 2, d, f);
                    break;
                case 1:
                    this.g[0] = b;
                    this.m(this.u.frequency, b, d, f);
                    break;
                case 2:
                    this.g[1] = b;
                    this.m(this.u.detune, b, d, f);
                    break;
                case 3:
                    this.g[2] = b;
                    this.m(this.u.Q, b, d, f);
                    break;
                case 6:
                    this.g[3] = b;
                    this.m(this.H.gain, b, d, f);
                    break;
                case 7:
                    this.g[4] = b, this.m(this.s.frequency, b, d, f)
            }
        }
    };
    self.je = class extends g {
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
        X(a, b, d, f) {
            const m = self.ea.cd;
            switch (a) {
                case 4:
                    this.g[0] = m(b), this.m(this.h.gain, m(b), d, f)
            }
        }
    };
    self.me = class extends g {
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
        X(a, b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[1] = b;
                    this.m(this.h.gain, 1 - b / 2, d, f);
                    this.m(this.H.gain, b / 2, d, f);
                    break;
                case 7:
                    this.g[0] = b, this.m(this.s.frequency, b, d, f)
            }
        }
    };
    self.le = class extends g {
        constructor(a, b, d) {
            super(a);
            this.R = "ringmod";
            this.g = [b, d];
            this.l = this.o();
            this.b = this.o();
            this.b.gain.value = d;
            this.a = this.o();
            this.a.gain.value = 1 - d;
            this.kb = this.o();
            this.kb.gain.value =
                0;
            this.s = this.f.createOscillator();
            this.s.frequency.value = b;
            this.s.connect(this.kb.gain);
            this.s.start(0);
            this.l.connect(this.kb);
            this.l.connect(this.a);
            this.kb.connect(this.b)
        }
        c() {
            this.s.stop(0);
            this.s.disconnect();
            this.kb.disconnect();
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
        X(a, b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this.g[1] = b;
                    this.m(this.b.gain, b, d, f);
                    this.m(this.a.gain, 1 - b, d, f);
                    break;
                case 7:
                    this.g[0] = b, this.m(this.s.frequency, b, d, f)
            }
        }
    };
    self.ge = class extends g {
        constructor(a, b, d, f, m, p) {
            super(a);
            this.R = "distortion";
            this.g = [b, d, f, m, p];
            this.l = this.o();
            this.Tb = this.o();
            this.Sb = this.o();
            this.Uf(f, m);
            this.b = this.o();
            this.b.gain.value = p;
            this.a = this.o();
            this.a.gain.value = 1 - p;
            this.Yb = this.f.createWaveShaper();
            this.Hc = new Float32Array(65536);
            this.af(b, d);
            this.Yb.curve = this.Hc;
            this.l.connect(this.Tb);
            this.l.connect(this.a);
            this.Tb.connect(this.Yb);
            this.Yb.connect(this.Sb);
            this.Sb.connect(this.b)
        }
        c() {
            this.l.disconnect();
            this.Tb.disconnect();
            this.Yb.disconnect();
            this.Sb.disconnect();
            this.b.disconnect();
            this.a.disconnect();
            super.c()
        }
        Uf(a, b) {
            .01 > a && (a = .01);
            this.Tb.gain.value = a;
            this.Sb.gain.value = Math.pow(1 / a, .6) * b
        }
        af(a, b) {
            for (let d = 0; 32768 > d; ++d) {
                let f = d / 32768;
                f = this.gg(f, a, b);
                this.Hc[32768 + d] = f;
                this.Hc[32768 - d - 1] = -f
            }
        }
        gg(a, b, d) {
            d = 1.05 * d * b - b;
            const f = 0 > a ? -a : a;
            return (f < b ? f : b + d * self.ea.xg(f - b, 1 / d)) * (0 > a ? -1 : 1)
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
        X(a, b, d, f) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0), this.g[4] = b, this.m(this.b.gain, b, d, f), this.m(this.a.gain, 1 - b, d, f)
            }
        }
    };
    self.de = class extends g {
        constructor(a, b, d, f, m, p) {
            super(a);
            this.R = "compressor";
            this.g = [b, d, f, m, p];
            this.h = this.f.createDynamicsCompressor();
            this.h.threshold.value = b;
            this.h.knee.value = d;
            this.h.ratio.value = f;
            this.h.attack.value = m;
            this.h.release.value = p
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
    self.ce = class extends g {
        constructor(a, b, d) {
            super(a);
            this.R = "analyser";
            this.g = [b, d];
            this.h = this.f.createAnalyser();
            this.h.fftSize = b;
            this.h.smoothingTimeConstant = d;
            this.Id = new Float32Array(this.h.frequencyBinCount);
            this.Ud = new Uint8Array(b);
            this.Sd = this.Ha = 0;
            this.i.Le(this)
        }
        c() {
            this.i.Nf(this);
            this.h.disconnect();
            super.c()
        }
        Ba() {
            this.h.getFloatFrequencyData(this.Id);
            this.h.getByteTimeDomainData(this.Ud);
            const a = this.h.fftSize;
            let b = this.Ha = 0;
            for (var d = 0; d < a; ++d) {
                let f = (this.Ud[d] - 128) / 128;
                0 > f && (f = -f);
                this.Ha < f && (this.Ha = f);
                b += f * f
            }
            d = self.ea.Be;
            this.Ha = d(this.Ha);
            this.Sd = d(Math.sqrt(b / a))
        }
        S(a) {
            this.h.disconnect();
            this.h.connect(a)
        }
        P() {
            return this.h
        }
        X() {}
        we() {
            return {
                tag: this.Z,
                index: this.Kd,
                peak: this.Ha,
                rms: this.Sd,
                binCount: this.h.frequencyBinCount,
                freqBins: this.Id
            }
        }
    }
}
"use strict";
async function T(g, a) {
    a = a.type;
    let b = !0;
    0 === a ? b = await U() : 1 === a && (b = await V());
    w(g, "permission-result", {
        type: a,
        result: b
    })
}
async function U() {
    if (!self.DeviceOrientationEvent || !self.DeviceOrientationEvent.requestPermission) return !0;
    try {
        return "granted" === await self.DeviceOrientationEvent.requestPermission()
    } catch (g) {
        return console.warn("[Touch] Failed to request orientation permission: ", g), !1
    }
}
async function V() {
    if (!self.DeviceMotionEvent || !self.DeviceMotionEvent.requestPermission) return !0;
    try {
        return "granted" === await self.DeviceMotionEvent.requestPermission()
    } catch (g) {
        return console.warn("[Touch] Failed to request motion permission: ", g), !1
    }
}
self.wb.Zb(class extends self.qb {
    constructor(g) {
        super(g, "touch");
        E(this, "request-permission", a => T(this, a))
    }
});