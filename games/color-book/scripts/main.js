'use strict';
window.DOMHandler = class {
    constructor(d, a) {
        this._iRuntime = d;
        this._componentId = a;
        this._hasTickCallback = !1;
        this._tickCallback = () => this.Tick()
    }
    Attach() {}
    PostToRuntime(d, a, b, e) {
        this._iRuntime.PostToRuntimeComponent(this._componentId, d, a, b, e)
    }
    PostToRuntimeAsync(d, a, b, e) {
        return this._iRuntime.PostToRuntimeComponentAsync(this._componentId, d, a, b, e)
    }
    _PostToRuntimeMaybeSync(d, a, b) {
        this._iRuntime.UsesWorker() ? this.PostToRuntime(d, a, b) : this._iRuntime._GetLocalRuntime()._OnMessageFromDOM({
            type: "event",
            component: this._componentId,
            handler: d,
            dispatchOpts: b || null,
            data: a,
            responseId: null
        })
    }
    AddRuntimeMessageHandler(d, a) {
        this._iRuntime.AddRuntimeComponentMessageHandler(this._componentId, d, a)
    }
    AddRuntimeMessageHandlers(d) {
        for (const [a, b] of d) this.AddRuntimeMessageHandler(a, b)
    }
    GetRuntimeInterface() {
        return this._iRuntime
    }
    GetComponentID() {
        return this._componentId
    }
    _StartTicking() {
        this._hasTickCallback || (this._iRuntime._AddRAFCallback(this._tickCallback), this._hasTickCallback = !0)
    }
    _StopTicking() {
        this._hasTickCallback &&
            (this._iRuntime._RemoveRAFCallback(this._tickCallback), this._hasTickCallback = !1)
    }
    Tick() {}
};
window.RateLimiter = class {
    constructor(d, a) {
        this._callback = d;
        this._interval = a;
        this._timerId = -1;
        this._lastCallTime = -Infinity;
        this._timerCallFunc = () => this._OnTimer();
        this._canRunImmediate = this._ignoreReset = !1
    }
    SetCanRunImmediate(d) {
        this._canRunImmediate = !!d
    }
    Call() {
        if (-1 === this._timerId) {
            var d = Date.now(),
                a = d - this._lastCallTime,
                b = this._interval;
            a >= b && this._canRunImmediate ? (this._lastCallTime = d, this._RunCallback()) : this._timerId = self.setTimeout(this._timerCallFunc, Math.max(b - a, 4))
        }
    }
    _RunCallback() {
        this._ignoreReset = !0;
        this._callback();
        this._ignoreReset = !1
    }
    Reset() {
        this._ignoreReset || (this._CancelTimer(), this._lastCallTime = Date.now())
    }
    _OnTimer() {
        this._timerId = -1;
        this._lastCallTime = Date.now();
        this._RunCallback()
    }
    _CancelTimer() {
        -1 !== this._timerId && (self.clearTimeout(this._timerId), this._timerId = -1)
    }
    Release() {
        this._CancelTimer();
        this._timerCallFunc = this._callback = null
    }
};
"use strict";
window.DOMElementHandler = class extends self.DOMHandler {
    constructor(d, a) {
        super(d, a);
        this._elementMap = new Map;
        this._autoAttach = !0;
        this.AddRuntimeMessageHandlers([
            ["create", b => this._OnCreate(b)],
            ["destroy", b => this._OnDestroy(b)],
            ["set-visible", b => this._OnSetVisible(b)],
            ["update-position", b => this._OnUpdatePosition(b)],
            ["update-state", b => this._OnUpdateState(b)],
            ["focus", b => this._OnSetFocus(b)],
            ["set-css-style", b => this._OnSetCssStyle(b)],
            ["set-attribute", b => this._OnSetAttribute(b)],
            ["remove-attribute",
                b => this._OnRemoveAttribute(b)
            ]
        ]);
        this.AddDOMElementMessageHandler("get-element", b => b)
    }
    SetAutoAttach(d) {
        this._autoAttach = !!d
    }
    AddDOMElementMessageHandler(d, a) {
        this.AddRuntimeMessageHandler(d, b => {
            const e = this._elementMap.get(b.elementId);
            return a(e, b)
        })
    }
    _OnCreate(d) {
        const a = d.elementId,
            b = this.CreateElement(a, d);
        this._elementMap.set(a, b);
        d.isVisible || (b.style.display = "none");
        d = this._GetFocusElement(b);
        d.addEventListener("focus", e => this._OnFocus(a));
        d.addEventListener("blur", e => this._OnBlur(a));
        this._autoAttach &&
            document.body.appendChild(b)
    }
    CreateElement(d, a) {
        throw Error("required override");
    }
    DestroyElement(d) {}
    _OnDestroy(d) {
        d = d.elementId;
        const a = this._elementMap.get(d);
        this.DestroyElement(a);
        this._autoAttach && a.parentElement.removeChild(a);
        this._elementMap.delete(d)
    }
    PostToRuntimeElement(d, a, b) {
        b || (b = {});
        b.elementId = a;
        this.PostToRuntime(d, b)
    }
    _PostToRuntimeElementMaybeSync(d, a, b) {
        b || (b = {});
        b.elementId = a;
        this._PostToRuntimeMaybeSync(d, b)
    }
    _OnSetVisible(d) {
        this._autoAttach && (this._elementMap.get(d.elementId).style.display =
            d.isVisible ? "" : "none")
    }
    _OnUpdatePosition(d) {
        if (this._autoAttach) {
            var a = this._elementMap.get(d.elementId);
            a.style.left = d.left + "px";
            a.style.top = d.top + "px";
            a.style.width = d.width + "px";
            a.style.height = d.height + "px";
            d = d.fontSize;
            null !== d && (a.style.fontSize = d + "em")
        }
    }
    _OnUpdateState(d) {
        const a = this._elementMap.get(d.elementId);
        this.UpdateState(a, d)
    }
    UpdateState(d, a) {
        throw Error("required override");
    }
    _GetFocusElement(d) {
        return d
    }
    _OnFocus(d) {
        this.PostToRuntimeElement("elem-focused", d)
    }
    _OnBlur(d) {
        this.PostToRuntimeElement("elem-blurred",
            d)
    }
    _OnSetFocus(d) {
        const a = this._GetFocusElement(this._elementMap.get(d.elementId));
        d.focus ? a.focus() : a.blur()
    }
    _OnSetCssStyle(d) {
        this._elementMap.get(d.elementId).style[d.prop] = d.val
    }
    _OnSetAttribute(d) {
        this._elementMap.get(d.elementId).setAttribute(d.name, d.val)
    }
    _OnRemoveAttribute(d) {
        this._elementMap.get(d.elementId).removeAttribute(d.name)
    }
    GetElementById(d) {
        return this._elementMap.get(d)
    }
};
"use strict"; {
    const d = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(navigator.userAgent);
    let a = 0;

    function b(f) {
        const c = document.createElement("script");
        c.async = !1;
        c.type = "module";
        return f.isStringSrc ? new Promise(h => {
            const k = "c3_resolve_" + a;
            ++a;
            self[k] = h;
            c.textContent = f.str + `\n\nself["${k}"]();`;
            document.head.appendChild(c)
        }) : new Promise((h, k) => {
            c.onload = h;
            c.onerror = k;
            c.src = f;
            document.head.appendChild(c)
        })
    }
    let e = !1,
        g = !1;

    function m() {
        if (!e) {
            try {
                new Worker("blob://", {
                    get type() {
                        g = !0
                    }
                })
            } catch (f) {}
            e = !0
        }
        return g
    }
    let n = new Audio;
    const v = {
        "audio/webm; codecs=opus": !!n.canPlayType("audio/webm; codecs=opus"),
        "audio/ogg; codecs=opus": !!n.canPlayType("audio/ogg; codecs=opus"),
        "audio/webm; codecs=vorbis": !!n.canPlayType("audio/webm; codecs=vorbis"),
        "audio/ogg; codecs=vorbis": !!n.canPlayType("audio/ogg; codecs=vorbis"),
        "audio/mp4": !!n.canPlayType("audio/mp4"),
        "audio/mpeg": !!n.canPlayType("audio/mpeg")
    };
    n = null;
    async function y(f) {
        f = await z(f);
        return (new TextDecoder("utf-8")).decode(f)
    }

    function z(f) {
        return new Promise((c,
            h) => {
            const k = new FileReader;
            k.onload = l => c(l.target.result);
            k.onerror = l => h(l);
            k.readAsArrayBuffer(f)
        })
    }
    const t = [];
    let u = 0;
    window.RealFile = window.File;
    const A = [],
        B = new Map,
        C = new Map;
    let x = 0;
    const D = [];
    self.runOnStartup = function(f) {
        if ("function" !== typeof f) throw Error("runOnStartup called without a function");
        D.push(f)
    };
    const E = new Set(["cordova", "playable-ad", "instant-games"]);

    function F(f) {
        return E.has(f)
    }
    let G = !1;
    window.RuntimeInterface = class f {
        constructor(c) {
            this._useWorker = c.useWorker;
            this._messageChannelPort =
                null;
            this._baseUrl = "";
            this._scriptFolder = c.scriptFolder;
            this._workerScriptURLs = {};
            this._localRuntime = this._worker = null;
            this._domHandlers = [];
            this._jobScheduler = this._canvas = this._runtimeDomHandler = null;
            this._rafId = -1;
            this._rafFunc = () => this._OnRAFCallback();
            this._rafCallbacks = [];
            this._exportType = c.exportType;
            !this._useWorker || "undefined" !== typeof OffscreenCanvas && navigator.userActivation && m() || (this._useWorker = !1);
            F(this._exportType) && this._useWorker && (console.warn("[C3 runtime] Worker mode is enabled and supported, but is currently disabled in WebViews. Reverting to DOM mode."),
                this._useWorker = !1);
            this._localFileStrings = this._localFileBlobs = null;
            "html5" !== this._exportType && "playable-ad" !== this._exportType || "file" !== location.protocol.substr(0, 4) || alert("Exported games won't work until you upload them. (When running on the file: protocol, browsers block many features from working for security reasons.)");
            this.AddRuntimeComponentMessageHandler("runtime", "cordova-fetch-local-file", h => this._OnCordovaFetchLocalFile(h));
            this.AddRuntimeComponentMessageHandler("runtime", "create-job-worker",
                h => this._OnCreateJobWorker(h));
            "cordova" === this._exportType ? document.addEventListener("deviceready", () => this._Init(c)) : this._Init(c)
        }
        Release() {
            this._CancelAnimationFrame();
            this._messageChannelPort && (this._messageChannelPort = this._messageChannelPort.onmessage = null);
            this._worker && (this._worker.terminate(), this._worker = null);
            this._localRuntime && (this._localRuntime.Release(), this._localRuntime = null);
            this._canvas && (this._canvas.parentElement.removeChild(this._canvas), this._canvas = null)
        }
        GetCanvas() {
            return this._canvas
        }
        GetBaseURL() {
            return this._baseUrl
        }
        UsesWorker() {
            return this._useWorker
        }
        GetExportType() {
            return this._exportType
        }
        GetScriptFolder() {
            return this._scriptFolder
        }
        IsiOSCordova() {
            return d &&
                "cordova" === this._exportType
        }
        IsiOSWebView() {
            return d && F(this._exportType) || navigator.standalone
        }
        async _Init(c) {
            "macos-wkwebview" === this._exportType && this._SendWrapperMessage({
                type: "ready"
            });
            if ("playable-ad" === this._exportType) {
                this._localFileBlobs = self.c3_base64files;
                this._localFileStrings = {};
                await this._ConvertDataUrisToBlobs();
                for (let k = 0, l = c.engineScripts.length; k < l; ++k) {
                    var h = c.engineScripts[k].toLowerCase();
                    this._localFileStrings.hasOwnProperty(h) ? c.engineScripts[k] = {
                            isStringSrc: !0,
                            str: this._localFileStrings[h]
                        } :
                        this._localFileBlobs.hasOwnProperty(h) && (c.engineScripts[k] = URL.createObjectURL(this._localFileBlobs[h]))
                }
            }
            c.baseUrl ? this._baseUrl = c.baseUrl : (h = location.origin, this._baseUrl = ("null" === h ? "file:///" : h) + location.pathname, h = this._baseUrl.lastIndexOf("/"), -1 !== h && (this._baseUrl = this._baseUrl.substr(0, h + 1)));
            c.workerScripts && (this._workerScriptURLs = c.workerScripts);
            h = new MessageChannel;
            this._messageChannelPort = h.port1;
            this._messageChannelPort.onmessage = k => this._OnMessageFromRuntime(k.data);
            window.c3_addPortMessageHandler &&
                window.c3_addPortMessageHandler(k => this._OnMessageFromDebugger(k));
            this._jobScheduler = new self.JobSchedulerDOM(this);
            await this._jobScheduler.Init();
            "object" === typeof window.StatusBar && window.StatusBar.hide();
            "object" === typeof window.AndroidFullScreen && window.AndroidFullScreen.immersiveMode();
            this._useWorker ? await this._InitWorker(c, h.port2) : await this._InitDOM(c, h.port2)
        }
        _GetWorkerURL(c) {
            c = this._workerScriptURLs.hasOwnProperty(c) ? this._workerScriptURLs[c] : c.endsWith("/workermain.js") && this._workerScriptURLs.hasOwnProperty("workermain.js") ?
                this._workerScriptURLs["workermain.js"] : "playable-ad" === this._exportType && this._localFileBlobs.hasOwnProperty(c.toLowerCase()) ? this._localFileBlobs[c.toLowerCase()] : c;
            c instanceof Blob && (c = URL.createObjectURL(c));
            return c
        }
        async CreateWorker(c, h, k) {
            if (c.startsWith("blob:")) return new Worker(c, k);
            if (this.IsiOSCordova() && "file:" === location.protocol) return c = await this.CordovaFetchLocalFileAsArrayBuffer(this._scriptFolder + c), c = new Blob([c], {
                type: "application/javascript"
            }), new Worker(URL.createObjectURL(c),
                k);
            c = new URL(c, h);
            if (location.origin !== c.origin) {
                c = await fetch(c);
                if (!c.ok) throw Error("failed to fetch worker script");
                c = await c.blob();
                return new Worker(URL.createObjectURL(c), k)
            }
            return new Worker(c, k)
        }
        _GetWindowInnerWidth() {
            return Math.max(window.innerWidth, 1)
        }
        _GetWindowInnerHeight() {
            return Math.max(window.innerHeight, 1)
        }
        _GetCommonRuntimeOptions(c) {
            return {
                baseUrl: this._baseUrl,
                windowInnerWidth: this._GetWindowInnerWidth(),
                windowInnerHeight: this._GetWindowInnerHeight(),
                devicePixelRatio: window.devicePixelRatio,
                isFullscreen: f.IsDocumentFullscreen(),
                projectData: c.projectData,
                previewImageBlobs: window.cr_previewImageBlobs || this._localFileBlobs,
                previewProjectFileBlobs: window.cr_previewProjectFileBlobs,
                previewProjectFileSWUrls: window.cr_previewProjectFiles,
                swClientId: window.cr_swClientId || "",
                exportType: c.exportType,
                isDebug: -1 < self.location.search.indexOf("debug"),
                ife: !!self.ife,
                jobScheduler: this._jobScheduler.GetPortData(),
                supportedAudioFormats: v,
                opusWasmScriptUrl: window.cr_opusWasmScriptUrl || this._scriptFolder +
                    "opus.wasm.js",
                opusWasmBinaryUrl: window.cr_opusWasmBinaryUrl || this._scriptFolder + "opus.wasm.wasm",
                isiOSCordova: this.IsiOSCordova(),
                isiOSWebView: this.IsiOSWebView(),
                isFBInstantAvailable: "undefined" !== typeof self.FBInstant
            }
        }
        async _InitWorker(c, h) {
            var k = this._GetWorkerURL(c.workerMainUrl);
            this._worker = await this.CreateWorker(k, this._baseUrl, {
                type: "module",
                name: "Runtime"
            });
            this._canvas = document.createElement("canvas");
            this._canvas.style.display = "none";
            k = this._canvas.transferControlToOffscreen();
            document.body.appendChild(this._canvas);
            window.c3canvas = this._canvas;
            this._worker.postMessage(Object.assign(this._GetCommonRuntimeOptions(c), {
                type: "init-runtime",
                isInWorker: !0,
                messagePort: h,
                canvas: k,
                workerDependencyScripts: c.workerDependencyScripts || [],
                engineScripts: c.engineScripts,
                projectScripts: c.projectScripts,
                mainProjectScript: c.mainProjectScript,
                projectScriptsStatus: self.C3_ProjectScriptsStatus
            }), [h, k, ...this._jobScheduler.GetPortTransferables()]);
            this._domHandlers = A.map(l => new l(this));
            this._FindRuntimeDOMHandler();
            self.c3_callFunction =
                (l, p) => this._runtimeDomHandler._InvokeFunctionFromJS(l, p);
            "preview" === this._exportType && (self.goToLastErrorScript = () => this.PostToRuntimeComponent("runtime", "go-to-last-error-script"))
        }
        async _InitDOM(c, h) {
            this._canvas = document.createElement("canvas");
            this._canvas.style.display = "none";
            document.body.appendChild(this._canvas);
            window.c3canvas = this._canvas;
            this._domHandlers = A.map(q => new q(this));
            this._FindRuntimeDOMHandler();
            var k = c.engineScripts.map(q => "string" === typeof q ? (new URL(q, this._baseUrl)).toString() :
                q);
            Array.isArray(c.workerDependencyScripts) && k.unshift(...c.workerDependencyScripts);
            k = await Promise.all(k.map(q => this._MaybeGetCordovaScriptURL(q)));
            await Promise.all(k.map(q => b(q)));
            k = self.C3_ProjectScriptsStatus;
            const l = c.mainProjectScript,
                p = c.projectScripts;
            for (let [q, r] of p)
                if (r || (r = q), q === l) try {
                    r = await this._MaybeGetCordovaScriptURL(r), await b(r), "preview" !== this._exportType || k[q] || this._ReportProjectMainScriptError(q, "main script did not run to completion")
                } catch (w) {
                    this._ReportProjectMainScriptError(q,
                        w)
                } else if ("scriptsInEvents.js" === q || q.endsWith("/scriptsInEvents.js")) r = await this._MaybeGetCordovaScriptURL(r), await b(r);
            "preview" === this._exportType && "object" !== typeof self.C3.ScriptsInEvents ? (this._RemoveLoadingMessage(), console.error("[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."), alert("Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax.")) : (c = Object.assign(this._GetCommonRuntimeOptions(c), {
                isInWorker: !1,
                messagePort: h,
                canvas: this._canvas,
                runOnStartupFunctions: D
            }), this._OnBeforeCreateRuntime(), this._localRuntime = self.C3_CreateRuntime(c), await self.C3_InitRuntime(this._localRuntime, c))
        }
        _ReportProjectMainScriptError(c, h) {
            this._RemoveLoadingMessage();
            console.error(`[Preview] Failed to load project main script (${c}): `, h);
            alert(`Failed to load project main script (${c}). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.`)
        }
        _OnBeforeCreateRuntime() {
            this._RemoveLoadingMessage()
        }
        _RemoveLoadingMessage() {
            const c =
                window.cr_previewLoadingElem;
            c && (c.parentElement.removeChild(c), window.cr_previewLoadingElem = null)
        }
        async _OnCreateJobWorker(c) {
            c = await this._jobScheduler._CreateJobWorker();
            return {
                outputPort: c,
                transferables: [c]
            }
        }
        _GetLocalRuntime() {
            if (this._useWorker) throw Error("not available in worker mode");
            return this._localRuntime
        }
        PostToRuntimeComponent(c, h, k, l, p) {
            this._messageChannelPort.postMessage({
                type: "event",
                component: c,
                handler: h,
                dispatchOpts: l || null,
                data: k,
                responseId: null
            }, p)
        }
        PostToRuntimeComponentAsync(c,
            h, k, l, p) {
            const q = x++,
                r = new Promise((w, H) => {
                    C.set(q, {
                        resolve: w,
                        reject: H
                    })
                });
            this._messageChannelPort.postMessage({
                type: "event",
                component: c,
                handler: h,
                dispatchOpts: l || null,
                data: k,
                responseId: q
            }, p);
            return r
        }["_OnMessageFromRuntime"](c) {
            const h = c.type;
            if ("event" === h) return this._OnEventFromRuntime(c);
            if ("result" === h) this._OnResultFromRuntime(c);
            else if ("runtime-ready" === h) this._OnRuntimeReady();
            else if ("alert-error" === h) this._RemoveLoadingMessage(), alert(c.message);
            else if ("creating-runtime" === h) this._OnBeforeCreateRuntime();
            else throw Error(`unknown message '${h}'`);
        }
        _OnEventFromRuntime(c) {
            const h = c.component,
                k = c.handler,
                l = c.data,
                p = c.responseId;
            if (c = B.get(h))
                if (c = c.get(k)) {
                    var q = null;
                    try {
                        q = c(l)
                    } catch (r) {
                        console.error(`Exception in '${h}' handler '${k}':`, r);
                        null !== p && this._PostResultToRuntime(p, !1, "" + r);
                        return
                    }
                    if (null === p) return q;
                    q && q.then ? q.then(r => this._PostResultToRuntime(p, !0, r)).catch(r => {
                        console.error(`Rejection from '${h}' handler '${k}':`, r);
                        this._PostResultToRuntime(p, !1, "" + r)
                    }) : this._PostResultToRuntime(p, !0, q)
                } else console.warn(`[DOM] No handler '${k}' for component '${h}'`);
            else console.warn(`[DOM] No event handlers for component '${h}'`)
        }
        _PostResultToRuntime(c, h, k) {
            let l;
            k && k.transferables && (l = k.transferables);
            this._messageChannelPort.postMessage({
                type: "result",
                responseId: c,
                isOk: h,
                result: k
            }, l)
        }
        _OnResultFromRuntime(c) {
            const h = c.responseId,
                k = c.isOk;
            c = c.result;
            const l = C.get(h);
            k ? l.resolve(c) : l.reject(c);
            C.delete(h)
        }
        AddRuntimeComponentMessageHandler(c, h, k) {
            let l = B.get(c);
            l || (l = new Map, B.set(c, l));
            if (l.has(h)) throw Error(`[DOM] Component '${c}' already has handler '${h}'`);
            l.set(h, k)
        }
        static AddDOMHandlerClass(c) {
            if (A.includes(c)) throw Error("DOM handler already added");
            A.push(c)
        }
        _FindRuntimeDOMHandler() {
            for (const c of this._domHandlers)
                if ("runtime" === c.GetComponentID()) {
                    this._runtimeDomHandler = c;
                    return
                }
            throw Error("cannot find runtime DOM handler");
        }
        _OnMessageFromDebugger(c) {
            this.PostToRuntimeComponent("debugger", "message", c)
        }
        _OnRuntimeReady() {
            for (const c of this._domHandlers) c.Attach()
        }
        static IsDocumentFullscreen() {
            return !!(document.fullscreenElement || document.webkitFullscreenElement ||
                document.mozFullScreenElement || G)
        }
        static _SetWrapperIsFullscreenFlag(c) {
            G = !!c
        }
        async GetRemotePreviewStatusInfo() {
            return await this.PostToRuntimeComponentAsync("runtime", "get-remote-preview-status-info")
        }
        _AddRAFCallback(c) {
            this._rafCallbacks.push(c);
            this._RequestAnimationFrame()
        }
        _RemoveRAFCallback(c) {
            c = this._rafCallbacks.indexOf(c);
            if (-1 === c) throw Error("invalid callback");
            this._rafCallbacks.splice(c, 1);
            this._rafCallbacks.length || this._CancelAnimationFrame()
        }
        _RequestAnimationFrame() {
            -1 === this._rafId &&
                this._rafCallbacks.length && (this._rafId = requestAnimationFrame(this._rafFunc))
        }
        _CancelAnimationFrame() {
            -1 !== this._rafId && (cancelAnimationFrame(this._rafId), this._rafId = -1)
        }
        _OnRAFCallback() {
            this._rafId = -1;
            for (const c of this._rafCallbacks) c();
            this._RequestAnimationFrame()
        }
        TryPlayMedia(c) {
            this._runtimeDomHandler.TryPlayMedia(c)
        }
        RemovePendingPlay(c) {
            this._runtimeDomHandler.RemovePendingPlay(c)
        }
        _PlayPendingMedia() {
            this._runtimeDomHandler._PlayPendingMedia()
        }
        SetSilent(c) {
            this._runtimeDomHandler.SetSilent(c)
        }
        IsAudioFormatSupported(c) {
            return !!v[c]
        }
        async _WasmDecodeWebMOpus(c) {
            c =
                await this.PostToRuntimeComponentAsync("runtime", "opus-decode", {
                    arrayBuffer: c
                }, null, [c]);
            return new Float32Array(c)
        }
        IsAbsoluteURL(c) {
            return /^(?:[a-z\-]+:)?\/\//.test(c) || "data:" === c.substr(0, 5) || "blob:" === c.substr(0, 5)
        }
        IsRelativeURL(c) {
            return !this.IsAbsoluteURL(c)
        }
        async _MaybeGetCordovaScriptURL(c) {
            return "cordova" === this._exportType && (c.startsWith("file:") || "file:" === location.protocol && this.IsRelativeURL(c)) ? (c.startsWith(this._baseUrl) && (c = c.substr(this._baseUrl.length)), c = await this.CordovaFetchLocalFileAsArrayBuffer(c),
                c = new Blob([c], {
                    type: "application/javascript"
                }), URL.createObjectURL(c)) : c
        }
        async _OnCordovaFetchLocalFile(c) {
            const h = c.filename;
            switch (c.as) {
                case "text":
                    return await this.CordovaFetchLocalFileAsText(h);
                case "buffer":
                    return await this.CordovaFetchLocalFileAsArrayBuffer(h);
                default:
                    throw Error("unsupported type");
            }
        }
        _GetPermissionAPI() {
            const c = window.cordova && window.cordova.plugins && window.cordova.plugins.permissions;
            if ("object" !== typeof c) throw Error("Permission API is not loaded");
            return c
        }
        _MapPermissionID(c,
            h) {
            c = c[h];
            if ("string" !== typeof c) throw Error("Invalid permission name");
            return c
        }
        _HasPermission(c) {
            const h = this._GetPermissionAPI();
            return new Promise((k, l) => h.checkPermission(this._MapPermissionID(h, c), p => k(!!p.hasPermission), l))
        }
        _RequestPermission(c) {
            const h = this._GetPermissionAPI();
            return new Promise((k, l) => h.requestPermission(this._MapPermissionID(h, c), p => k(!!p.hasPermission), l))
        }
        async RequestPermissions(c) {
            if ("cordova" !== this.GetExportType() || this.IsiOSCordova()) return !0;
            for (const h of c)
                if (!await this._HasPermission(h) &&
                    !1 === await this._RequestPermission(h)) return !1;
            return !0
        }
        async RequirePermissions(...c) {
            if (!1 === await this.RequestPermissions(c)) throw Error("Permission not granted");
        }
        CordovaFetchLocalFile(c) {
            const h = window.cordova.file.applicationDirectory + "www/" + c.toLowerCase();
            return new Promise((k, l) => {
                window.resolveLocalFileSystemURL(h, p => {
                    p.file(k, l)
                }, l)
            })
        }
        async CordovaFetchLocalFileAsText(c) {
            c = await this.CordovaFetchLocalFile(c);
            return await y(c)
        }
        _CordovaMaybeStartNextArrayBufferRead() {
            if (t.length && !(8 <= u)) {
                u++;
                var c = t.shift();
                this._CordovaDoFetchLocalFileAsAsArrayBuffer(c.filename, c.successCallback, c.errorCallback)
            }
        }
        CordovaFetchLocalFileAsArrayBuffer(c) {
            return new Promise((h, k) => {
                t.push({
                    filename: c,
                    successCallback: l => {
                        u--;
                        this._CordovaMaybeStartNextArrayBufferRead();
                        h(l)
                    },
                    errorCallback: l => {
                        u--;
                        this._CordovaMaybeStartNextArrayBufferRead();
                        k(l)
                    }
                });
                this._CordovaMaybeStartNextArrayBufferRead()
            })
        }
        async _CordovaDoFetchLocalFileAsAsArrayBuffer(c, h, k) {
            try {
                const l = await this.CordovaFetchLocalFile(c),
                    p = await z(l);
                h(p)
            } catch (l) {
                k(l)
            }
        }
        _SendWrapperMessage(c) {
            if ("windows-webview2" === this._exportType) window.chrome.webview.postMessage(JSON.stringify(c));
            else if ("macos-wkwebview" === this._exportType) window.webkit.messageHandlers.C3Wrapper.postMessage(JSON.stringify(c));
            else throw Error("cannot send wrapper message");
        }
        async _ConvertDataUrisToBlobs() {
            const c = [];
            for (const [h, k] of Object.entries(this._localFileBlobs)) c.push(this._ConvertDataUriToBlobs(h, k));
            await Promise.all(c)
        }
        async _ConvertDataUriToBlobs(c, h) {
            if ("object" ===
                typeof h) this._localFileBlobs[c] = new Blob([h.str], {
                type: h.type
            }), this._localFileStrings[c] = h.str;
            else {
                let k = await this._FetchDataUri(h);
                k || (k = this._DataURIToBinaryBlobSync(h));
                this._localFileBlobs[c] = k
            }
        }
        async _FetchDataUri(c) {
            try {
                return await (await fetch(c)).blob()
            } catch (h) {
                return console.warn("Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.", h), null
            }
        }
        _DataURIToBinaryBlobSync(c) {
            c =
                this._ParseDataURI(c);
            return this._BinaryStringToBlob(c.data, c.mime_type)
        }
        _ParseDataURI(c) {
            var h = c.indexOf(",");
            if (0 > h) throw new URIError("expected comma in data: uri");
            var k = c.substring(5, h);
            c = c.substring(h + 1);
            h = k.split(";");
            k = h[0] || "";
            const l = h[2];
            c = "base64" === h[1] || "base64" === l ? atob(c) : decodeURIComponent(c);
            return {
                mime_type: k,
                data: c
            }
        }
        _BinaryStringToBlob(c, h) {
            var k = c.length;
            let l = k >> 2,
                p = new Uint8Array(k),
                q = new Uint32Array(p.buffer, 0, l),
                r, w;
            for (w = r = 0; r < l; ++r) q[r] = c.charCodeAt(w++) | c.charCodeAt(w++) <<
                8 | c.charCodeAt(w++) << 16 | c.charCodeAt(w++) << 24;
            for (k &= 3; k--;) p[w] = c.charCodeAt(w), ++w;
            return new Blob([p], {
                type: h
            })
        }
    }
}
"use strict"; {
    const d = self.RuntimeInterface;

    function a(f) {
        return f.sourceCapabilities && f.sourceCapabilities.firesTouchEvents || f.originalEvent && f.originalEvent.sourceCapabilities && f.originalEvent.sourceCapabilities.firesTouchEvents
    }
    const b = new Map([
            ["OSLeft", "MetaLeft"],
            ["OSRight", "MetaRight"]
        ]),
        e = {
            dispatchRuntimeEvent: !0,
            dispatchUserScriptEvent: !0
        },
        g = {
            dispatchUserScriptEvent: !0
        },
        m = {
            dispatchRuntimeEvent: !0
        };

    function n(f) {
        return new Promise((c, h) => {
            const k = document.createElement("link");
            k.onload = () => c(k);
            k.onerror =
                l => h(l);
            k.rel = "stylesheet";
            k.href = f;
            document.head.appendChild(k)
        })
    }

    function v(f) {
        return new Promise((c, h) => {
            const k = new Image;
            k.onload = () => c(k);
            k.onerror = l => h(l);
            k.src = f
        })
    }
    async function y(f) {
        f = URL.createObjectURL(f);
        try {
            return await v(f)
        } finally {
            URL.revokeObjectURL(f)
        }
    }

    function z(f) {
        return new Promise((c, h) => {
            let k = new FileReader;
            k.onload = l => c(l.target.result);
            k.onerror = l => h(l);
            k.readAsText(f)
        })
    }
    async function t(f, c, h) {
        if (!/firefox/i.test(navigator.userAgent)) return await y(f);
        var k = await z(f);
        k =
            (new DOMParser).parseFromString(k, "image/svg+xml");
        const l = k.documentElement;
        if (l.hasAttribute("width") && l.hasAttribute("height")) {
            const p = l.getAttribute("width"),
                q = l.getAttribute("height");
            if (!p.includes("%") && !q.includes("%")) return await y(f)
        }
        l.setAttribute("width", c + "px");
        l.setAttribute("height", h + "px");
        k = (new XMLSerializer).serializeToString(k);
        f = new Blob([k], {
            type: "image/svg+xml"
        });
        return await y(f)
    }

    function u(f) {
        do {
            if (f.parentNode && f.hasAttribute("contenteditable")) return !0;
            f = f.parentNode
        } while (f);
        return !1
    }
    const A = new Set(["input", "textarea", "datalist", "select"]);

    function B(f) {
        return A.has(f.tagName.toLowerCase()) || u(f)
    }
    const C = new Set(["canvas", "body", "html"]);

    function x(f) {
        const c = f.target.tagName.toLowerCase();
        C.has(c) && f.preventDefault()
    }

    function D(f) {
        (f.metaKey || f.ctrlKey) && f.preventDefault()
    }
    self.C3_GetSvgImageSize = async function(f) {
        f = await y(f);
        if (0 < f.width && 0 < f.height) return [f.width, f.height]; {
            f.style.position = "absolute";
            f.style.left = "0px";
            f.style.top = "0px";
            f.style.visibility = "hidden";
            document.body.appendChild(f);
            const c = f.getBoundingClientRect();
            document.body.removeChild(f);
            return [c.width, c.height]
        }
    };
    self.C3_RasterSvgImageBlob = async function(f, c, h, k, l) {
        f = await t(f, c, h);
        const p = document.createElement("canvas");
        p.width = k;
        p.height = l;
        p.getContext("2d").drawImage(f, 0, 0, c, h);
        return p
    };
    let E = !1;
    document.addEventListener("pause", () => E = !0);
    document.addEventListener("resume", () => E = !1);

    function F() {
        try {
            return window.parent && window.parent.document.hasFocus()
        } catch (f) {
            return !1
        }
    }

    function G() {
        const f =
            document.activeElement;
        if (!f) return !1;
        const c = f.tagName.toLowerCase(),
            h = new Set("email number password search tel text url".split(" "));
        return "textarea" === c ? !0 : "input" === c ? h.has(f.type.toLowerCase() || "text") : u(f)
    }
    d.AddDOMHandlerClass(class extends self.DOMHandler {
        constructor(f) {
            super(f, "runtime");
            this._isFirstSizeUpdate = !0;
            this._simulatedResizeTimerId = -1;
            this._targetOrientation = "any";
            this._attachedDeviceMotionEvent = this._attachedDeviceOrientationEvent = !1;
            this._lastPointerRawUpdateEvent = this._pointerRawUpdateRateLimiter =
                this._debugHighlightElem = null;
            f.AddRuntimeComponentMessageHandler("canvas", "update-size", k => this._OnUpdateCanvasSize(k));
            f.AddRuntimeComponentMessageHandler("runtime", "invoke-download", k => this._OnInvokeDownload(k));
            f.AddRuntimeComponentMessageHandler("runtime", "raster-svg-image", k => this._OnRasterSvgImage(k));
            f.AddRuntimeComponentMessageHandler("runtime", "get-svg-image-size", k => this._OnGetSvgImageSize(k));
            f.AddRuntimeComponentMessageHandler("runtime", "set-target-orientation", k => this._OnSetTargetOrientation(k));
            f.AddRuntimeComponentMessageHandler("runtime", "register-sw", () => this._OnRegisterSW());
            f.AddRuntimeComponentMessageHandler("runtime", "post-to-debugger", k => this._OnPostToDebugger(k));
            f.AddRuntimeComponentMessageHandler("runtime", "go-to-script", k => this._OnPostToDebugger(k));
            f.AddRuntimeComponentMessageHandler("runtime", "before-start-ticking", () => this._OnBeforeStartTicking());
            f.AddRuntimeComponentMessageHandler("runtime", "debug-highlight", k => this._OnDebugHighlight(k));
            f.AddRuntimeComponentMessageHandler("runtime",
                "enable-device-orientation", () => this._AttachDeviceOrientationEvent());
            f.AddRuntimeComponentMessageHandler("runtime", "enable-device-motion", () => this._AttachDeviceMotionEvent());
            f.AddRuntimeComponentMessageHandler("runtime", "add-stylesheet", k => this._OnAddStylesheet(k));
            f.AddRuntimeComponentMessageHandler("runtime", "alert", k => this._OnAlert(k));
            f.AddRuntimeComponentMessageHandler("runtime", "hide-cordova-splash", () => this._OnHideCordovaSplash());
            const c = new Set(["input", "textarea", "datalist"]);
            window.addEventListener("contextmenu",
                k => {
                    const l = k.target,
                        p = l.tagName.toLowerCase();
                    c.has(p) || u(l) || k.preventDefault()
                });
            const h = f.GetCanvas();
            window.addEventListener("selectstart", x);
            window.addEventListener("gesturehold", x);
            h.addEventListener("selectstart", x);
            h.addEventListener("gesturehold", x);
            window.addEventListener("touchstart", x, {
                passive: !1
            });
            "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", x, {
                passive: !1
            }), h.addEventListener("pointerdown", x)) : h.addEventListener("touchstart", x);
            this._mousePointerLastButtons =
                0;
            window.addEventListener("mousedown", k => {
                1 === k.button && k.preventDefault()
            });
            window.addEventListener("mousewheel", D, {
                passive: !1
            });
            window.addEventListener("wheel", D, {
                passive: !1
            });
            window.addEventListener("resize", () => this._OnWindowResize());
            window.addEventListener("fullscreenchange", () => this._OnFullscreenChange());
            window.addEventListener("webkitfullscreenchange", () => this._OnFullscreenChange());
            window.addEventListener("mozfullscreenchange", () => this._OnFullscreenChange());
            window.addEventListener("fullscreenerror",
                k => this._OnFullscreenError(k));
            window.addEventListener("webkitfullscreenerror", k => this._OnFullscreenError(k));
            window.addEventListener("mozfullscreenerror", k => this._OnFullscreenError(k));
            f.IsiOSWebView() && window.addEventListener("focusout", () => {
                G() || (document.scrollingElement.scrollTop = 0)
            });
            self.C3WrapperOnMessage = k => this._OnWrapperMessage(k);
            this._mediaPendingPlay = new Set;
            this._mediaRemovedPendingPlay = new WeakSet;
            this._isSilent = !1
        }
        _OnBeforeStartTicking() {
            "cordova" === this._iRuntime.GetExportType() ?
                (document.addEventListener("pause", () => this._OnVisibilityChange(!0)), document.addEventListener("resume", () => this._OnVisibilityChange(!1))) : document.addEventListener("visibilitychange", () => this._OnVisibilityChange(document.hidden));
            return {
                isSuspended: !(!document.hidden && !E)
            }
        }
        Attach() {
            window.addEventListener("focus", () => this._PostRuntimeEvent("window-focus"));
            window.addEventListener("blur", () => {
                this._PostRuntimeEvent("window-blur", {
                    parentHasFocus: F()
                });
                this._mousePointerLastButtons = 0
            });
            window.addEventListener("focusin",
                c => {
                    B(c.target) && this._PostRuntimeEvent("keyboard-blur")
                });
            window.addEventListener("keydown", c => this._OnKeyEvent("keydown", c));
            window.addEventListener("keyup", c => this._OnKeyEvent("keyup", c));
            window.addEventListener("dblclick", c => this._OnMouseEvent("dblclick", c, e));
            window.addEventListener("wheel", c => this._OnMouseWheelEvent("wheel", c));
            "undefined" !== typeof PointerEvent ? (window.addEventListener("pointerdown", c => {
                    this._HandlePointerDownFocus(c);
                    this._OnPointerEvent("pointerdown", c)
                }), this._iRuntime.UsesWorker() &&
                "undefined" !== typeof window.onpointerrawupdate && self === self.top ? (this._pointerRawUpdateRateLimiter = new self.RateLimiter(() => this._DoSendPointerRawUpdate(), 5), this._pointerRawUpdateRateLimiter.SetCanRunImmediate(!0), window.addEventListener("pointerrawupdate", c => this._OnPointerRawUpdate(c))) : window.addEventListener("pointermove", c => this._OnPointerEvent("pointermove", c)), window.addEventListener("pointerup", c => this._OnPointerEvent("pointerup", c)), window.addEventListener("pointercancel", c => this._OnPointerEvent("pointercancel",
                    c))) : (window.addEventListener("mousedown", c => {
                this._HandlePointerDownFocus(c);
                this._OnMouseEventAsPointer("pointerdown", c)
            }), window.addEventListener("mousemove", c => this._OnMouseEventAsPointer("pointermove", c)), window.addEventListener("mouseup", c => this._OnMouseEventAsPointer("pointerup", c)), window.addEventListener("touchstart", c => {
                this._HandlePointerDownFocus(c);
                this._OnTouchEvent("pointerdown", c)
            }), window.addEventListener("touchmove", c => this._OnTouchEvent("pointermove", c)), window.addEventListener("touchend",
                c => this._OnTouchEvent("pointerup", c)), window.addEventListener("touchcancel", c => this._OnTouchEvent("pointercancel", c)));
            const f = () => this._PlayPendingMedia();
            window.addEventListener("pointerup", f, !0);
            window.addEventListener("touchend", f, !0);
            window.addEventListener("click", f, !0);
            window.addEventListener("keydown", f, !0);
            window.addEventListener("gamepadconnected", f, !0)
        }
        _PostRuntimeEvent(f, c) {
            this.PostToRuntime(f, c || null, m)
        }
        _GetWindowInnerWidth() {
            return this._iRuntime._GetWindowInnerWidth()
        }
        _GetWindowInnerHeight() {
            return this._iRuntime._GetWindowInnerHeight()
        }
        _OnWindowResize() {
            const f =
                this._GetWindowInnerWidth(),
                c = this._GetWindowInnerHeight();
            this._PostRuntimeEvent("window-resize", {
                innerWidth: f,
                innerHeight: c,
                devicePixelRatio: window.devicePixelRatio,
                isFullscreen: d.IsDocumentFullscreen()
            });
            this._iRuntime.IsiOSWebView() && (-1 !== this._simulatedResizeTimerId && clearTimeout(this._simulatedResizeTimerId), this._OnSimulatedResize(f, c, 0))
        }
        _ScheduleSimulatedResize(f, c, h) {
            -1 !== this._simulatedResizeTimerId && clearTimeout(this._simulatedResizeTimerId);
            this._simulatedResizeTimerId = setTimeout(() =>
                this._OnSimulatedResize(f, c, h), 48)
        }
        _OnSimulatedResize(f, c, h) {
            const k = this._GetWindowInnerWidth(),
                l = this._GetWindowInnerHeight();
            this._simulatedResizeTimerId = -1;
            k != f || l != c ? this._PostRuntimeEvent("window-resize", {
                innerWidth: k,
                innerHeight: l,
                devicePixelRatio: window.devicePixelRatio,
                isFullscreen: d.IsDocumentFullscreen()
            }) : 10 > h && this._ScheduleSimulatedResize(k, l, h + 1)
        }
        _OnSetTargetOrientation(f) {
            this._targetOrientation = f.targetOrientation
        }
        _TrySetTargetOrientation() {
            const f = this._targetOrientation;
            if (screen.orientation &&
                screen.orientation.lock) screen.orientation.lock(f).catch(c => console.warn("[Construct 3] Failed to lock orientation: ", c));
            else try {
                let c = !1;
                screen.lockOrientation ? c = screen.lockOrientation(f) : screen.webkitLockOrientation ? c = screen.webkitLockOrientation(f) : screen.mozLockOrientation ? c = screen.mozLockOrientation(f) : screen.msLockOrientation && (c = screen.msLockOrientation(f));
                c || console.warn("[Construct 3] Failed to lock orientation")
            } catch (c) {
                console.warn("[Construct 3] Failed to lock orientation: ", c)
            }
        }
        _OnFullscreenChange() {
            const f =
                d.IsDocumentFullscreen();
            f && "any" !== this._targetOrientation && this._TrySetTargetOrientation();
            this.PostToRuntime("fullscreenchange", {
                isFullscreen: f,
                innerWidth: this._GetWindowInnerWidth(),
                innerHeight: this._GetWindowInnerHeight()
            })
        }
        _OnFullscreenError(f) {
            console.warn("[Construct 3] Fullscreen request failed: ", f);
            this.PostToRuntime("fullscreenerror", {
                isFullscreen: d.IsDocumentFullscreen(),
                innerWidth: this._GetWindowInnerWidth(),
                innerHeight: this._GetWindowInnerHeight()
            })
        }
        _OnVisibilityChange(f) {
            f ? this._iRuntime._CancelAnimationFrame() :
                this._iRuntime._RequestAnimationFrame();
            this.PostToRuntime("visibilitychange", {
                hidden: f
            })
        }
        _OnKeyEvent(f, c) {
            "Backspace" === c.key && x(c);
            const h = b.get(c.code) || c.code;
            this._PostToRuntimeMaybeSync(f, {
                code: h,
                key: c.key,
                which: c.which,
                repeat: c.repeat,
                altKey: c.altKey,
                ctrlKey: c.ctrlKey,
                metaKey: c.metaKey,
                shiftKey: c.shiftKey,
                timeStamp: c.timeStamp
            }, e)
        }
        _OnMouseWheelEvent(f, c) {
            this.PostToRuntime(f, {
                clientX: c.clientX,
                clientY: c.clientY,
                pageX: c.pageX,
                pageY: c.pageY,
                deltaX: c.deltaX,
                deltaY: c.deltaY,
                deltaZ: c.deltaZ,
                deltaMode: c.deltaMode,
                timeStamp: c.timeStamp
            }, e)
        }
        _OnMouseEvent(f, c, h) {
            a(c) || this._PostToRuntimeMaybeSync(f, {
                button: c.button,
                buttons: c.buttons,
                clientX: c.clientX,
                clientY: c.clientY,
                pageX: c.pageX,
                pageY: c.pageY,
                timeStamp: c.timeStamp
            }, h)
        }
        _OnMouseEventAsPointer(f, c) {
            if (!a(c)) {
                var h = this._mousePointerLastButtons;
                "pointerdown" === f && 0 !== h ? f = "pointermove" : "pointerup" === f && 0 !== c.buttons && (f = "pointermove");
                this._PostToRuntimeMaybeSync(f, {
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
                }, e);
                this._mousePointerLastButtons = c.buttons;
                this._OnMouseEvent(c.type, c, g)
            }
        }
        _OnPointerEvent(f, c) {
            this._pointerRawUpdateRateLimiter && "pointermove" !== f && this._pointerRawUpdateRateLimiter.Reset();
            var h = 0;
            "mouse" === c.pointerType && (h = this._mousePointerLastButtons);
            this._PostToRuntimeMaybeSync(f, {
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
            }, e);
            "mouse" === c.pointerType && (h = "mousemove", "pointerdown" === f ? h = "mousedown" : "pointerup" === f && (h = "mouseup"), this._OnMouseEvent(h, c, g), this._mousePointerLastButtons = c.buttons)
        }
        _OnPointerRawUpdate(f) {
            this._lastPointerRawUpdateEvent = f;
            this._pointerRawUpdateRateLimiter.Call()
        }
        _DoSendPointerRawUpdate() {
            this._OnPointerEvent("pointermove",
                this._lastPointerRawUpdateEvent);
            this._lastPointerRawUpdateEvent = null
        }
        _OnTouchEvent(f, c) {
            for (let h = 0, k = c.changedTouches.length; h < k; ++h) {
                const l = c.changedTouches[h];
                this._PostToRuntimeMaybeSync(f, {
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
                    twist: l.rotationAngle ||
                        0,
                    timeStamp: c.timeStamp
                }, e)
            }
        }
        _HandlePointerDownFocus(f) {
            window !== window.top && window.focus();
            this._IsElementCanvasOrDocument(f.target) && document.activeElement && !this._IsElementCanvasOrDocument(document.activeElement) && document.activeElement.blur()
        }
        _IsElementCanvasOrDocument(f) {
            return !f || f === document || f === window || f === document.body || "canvas" === f.tagName.toLowerCase()
        }
        _AttachDeviceOrientationEvent() {
            this._attachedDeviceOrientationEvent || (this._attachedDeviceOrientationEvent = !0, window.addEventListener("deviceorientation",
                f => this._OnDeviceOrientation(f)), window.addEventListener("deviceorientationabsolute", f => this._OnDeviceOrientationAbsolute(f)))
        }
        _AttachDeviceMotionEvent() {
            this._attachedDeviceMotionEvent || (this._attachedDeviceMotionEvent = !0, window.addEventListener("devicemotion", f => this._OnDeviceMotion(f)))
        }
        _OnDeviceOrientation(f) {
            this.PostToRuntime("deviceorientation", {
                    absolute: !!f.absolute,
                    alpha: f.alpha || 0,
                    beta: f.beta || 0,
                    gamma: f.gamma || 0,
                    timeStamp: f.timeStamp,
                    webkitCompassHeading: f.webkitCompassHeading,
                    webkitCompassAccuracy: f.webkitCompassAccuracy
                },
                e)
        }
        _OnDeviceOrientationAbsolute(f) {
            this.PostToRuntime("deviceorientationabsolute", {
                absolute: !!f.absolute,
                alpha: f.alpha || 0,
                beta: f.beta || 0,
                gamma: f.gamma || 0,
                timeStamp: f.timeStamp
            }, e)
        }
        _OnDeviceMotion(f) {
            let c = null;
            var h = f.acceleration;
            h && (c = {
                x: h.x || 0,
                y: h.y || 0,
                z: h.z || 0
            });
            h = null;
            var k = f.accelerationIncludingGravity;
            k && (h = {
                x: k.x || 0,
                y: k.y || 0,
                z: k.z || 0
            });
            k = null;
            const l = f.rotationRate;
            l && (k = {
                alpha: l.alpha || 0,
                beta: l.beta || 0,
                gamma: l.gamma || 0
            });
            this.PostToRuntime("devicemotion", {
                acceleration: c,
                accelerationIncludingGravity: h,
                rotationRate: k,
                interval: f.interval,
                timeStamp: f.timeStamp
            }, e)
        }
        _OnUpdateCanvasSize(f) {
            const c = this.GetRuntimeInterface().GetCanvas();
            c.style.width = f.styleWidth + "px";
            c.style.height = f.styleHeight + "px";
            c.style.marginLeft = f.marginLeft + "px";
            c.style.marginTop = f.marginTop + "px";
            this._isFirstSizeUpdate && (c.style.display = "", this._isFirstSizeUpdate = !1)
        }
        _OnInvokeDownload(f) {
            const c = f.url;
            f = f.filename;
            const h = document.createElement("a"),
                k = document.body;
            h.textContent = f;
            h.href = c;
            h.download = f;
            k.appendChild(h);
            h.click();
            k.removeChild(h)
        }
        async _OnRasterSvgImage(f) {
            var c = f.imageBitmapOpts;
            f = await self.C3_RasterSvgImageBlob(f.blob, f.imageWidth, f.imageHeight, f.surfaceWidth, f.surfaceHeight);
            c = c ? await createImageBitmap(f, c) : await createImageBitmap(f);
            return {
                imageBitmap: c,
                transferables: [c]
            }
        }
        async _OnGetSvgImageSize(f) {
            return await self.C3_GetSvgImageSize(f.blob)
        }
        async _OnAddStylesheet(f) {
            await n(f.url)
        }
        _PlayPendingMedia() {
            var f = [...this._mediaPendingPlay];
            this._mediaPendingPlay.clear();
            if (!this._isSilent)
                for (const c of f)(f =
                    c.play()) && f.catch(h => {
                    this._mediaRemovedPendingPlay.has(c) || this._mediaPendingPlay.add(c)
                })
        }
        TryPlayMedia(f) {
            if ("function" !== typeof f.play) throw Error("missing play function");
            this._mediaRemovedPendingPlay.delete(f);
            let c;
            try {
                c = f.play()
            } catch (h) {
                this._mediaPendingPlay.add(f);
                return
            }
            c && c.catch(h => {
                this._mediaRemovedPendingPlay.has(f) || this._mediaPendingPlay.add(f)
            })
        }
        RemovePendingPlay(f) {
            this._mediaPendingPlay.delete(f);
            this._mediaRemovedPendingPlay.add(f)
        }
        SetSilent(f) {
            this._isSilent = !!f
        }
        _OnHideCordovaSplash() {
            navigator.splashscreen &&
                navigator.splashscreen.hide && navigator.splashscreen.hide()
        }
        _OnDebugHighlight(f) {
            if (f.show) {
                this._debugHighlightElem || (this._debugHighlightElem = document.createElement("div"), this._debugHighlightElem.id = "inspectOutline", document.body.appendChild(this._debugHighlightElem));
                var c = this._debugHighlightElem;
                c.style.display = "";
                c.style.left = f.left - 1 + "px";
                c.style.top = f.top - 1 + "px";
                c.style.width = f.width + 2 + "px";
                c.style.height = f.height + 2 + "px";
                c.textContent = f.name
            } else this._debugHighlightElem && (this._debugHighlightElem.style.display =
                "none")
        }
        _OnRegisterSW() {
            window.C3_RegisterSW && window.C3_RegisterSW()
        }
        _OnPostToDebugger(f) {
            window.c3_postToMessagePort && (f.from = "runtime", window.c3_postToMessagePort(f))
        }
        _InvokeFunctionFromJS(f, c) {
            return this.PostToRuntimeAsync("js-invoke-function", {
                name: f,
                params: c
            })
        }
        _OnAlert(f) {
            alert(f.message)
        }
        _OnWrapperMessage(f) {
            "entered-fullscreen" === f ? (d._SetWrapperIsFullscreenFlag(!0), this._OnFullscreenChange()) : "exited-fullscreen" === f ? (d._SetWrapperIsFullscreenFlag(!1), this._OnFullscreenChange()) : console.warn("Unknown wrapper message: ",
                f)
        }
    })
}
"use strict";
self.JobSchedulerDOM = class {
    constructor(d) {
        this._runtimeInterface = d;
        this._baseUrl = d.GetBaseURL();
        "preview" === d.GetExportType() ? this._baseUrl += "c3/workers/" : this._baseUrl += d.GetScriptFolder();
        this._maxNumWorkers = Math.min(navigator.hardwareConcurrency || 2, 16);
        this._dispatchWorker = null;
        this._jobWorkers = [];
        this._outputPort = this._inputPort = null
    }
    async Init() {
        if (this._hasInitialised) throw Error("already initialised");
        this._hasInitialised = !0;
        var d = this._runtimeInterface._GetWorkerURL("dispatchworker.js");
        this._dispatchWorker =
            await this._runtimeInterface.CreateWorker(d, this._baseUrl, {
                name: "DispatchWorker"
            });
        d = new MessageChannel;
        this._inputPort = d.port1;
        this._dispatchWorker.postMessage({
            type: "_init",
            "in-port": d.port2
        }, [d.port2]);
        this._outputPort = await this._CreateJobWorker()
    }
    async _CreateJobWorker() {
        const d = this._jobWorkers.length;
        var a = this._runtimeInterface._GetWorkerURL("jobworker.js");
        a = await this._runtimeInterface.CreateWorker(a, this._baseUrl, {
            name: "JobWorker" + d
        });
        const b = new MessageChannel,
            e = new MessageChannel;
        this._dispatchWorker.postMessage({
            type: "_addJobWorker",
            port: b.port1
        }, [b.port1]);
        a.postMessage({
            type: "init",
            number: d,
            "dispatch-port": b.port2,
            "output-port": e.port2
        }, [b.port2, e.port2]);
        this._jobWorkers.push(a);
        return e.port1
    }
    GetPortData() {
        return {
            inputPort: this._inputPort,
            outputPort: this._outputPort,
            maxNumWorkers: this._maxNumWorkers
        }
    }
    GetPortTransferables() {
        return [this._inputPort, this._outputPort]
    }
};
"use strict";
window.C3_IsSupported && (window.c3_runtimeInterface = new self.RuntimeInterface({
    useWorker: !0,
    workerMainUrl: "workermain.js",
    engineScripts: ["scripts/c3runtime.js"],
    projectScripts: [],
    mainProjectScript: "",
    scriptFolder: "scripts/",
    workerDependencyScripts: [],
    exportType: "html5"
}));
"use strict";
self.RuntimeInterface.AddDOMHandlerClass(class extends self.DOMHandler {
    constructor(d) {
        super(d, "touch");
        this.AddRuntimeMessageHandler("request-permission", a => this._OnRequestPermission(a))
    }
    async _OnRequestPermission(d) {
        d = d.type;
        let a = !0;
        0 === d ? a = await this._RequestOrientationPermission() : 1 === d && (a = await this._RequestMotionPermission());
        this.PostToRuntime("permission-result", {
            type: d,
            result: a
        })
    }
    async _RequestOrientationPermission() {
        if (!self.DeviceOrientationEvent || !self.DeviceOrientationEvent.requestPermission) return !0;
        try {
            return "granted" === await self.DeviceOrientationEvent.requestPermission()
        } catch (d) {
            return console.warn("[Touch] Failed to request orientation permission: ", d), !1
        }
    }
    async _RequestMotionPermission() {
        if (!self.DeviceMotionEvent || !self.DeviceMotionEvent.requestPermission) return !0;
        try {
            return "granted" === await self.DeviceMotionEvent.requestPermission()
        } catch (d) {
            return console.warn("[Touch] Failed to request motion permission: ", d), !1
        }
    }
});
"use strict";
self.RuntimeInterface.AddDOMHandlerClass(class extends self.DOMHandler {
    constructor(d) {
        super(d, "mouse");
        this.AddRuntimeMessageHandler("cursor", a => this._OnChangeCursorStyle(a))
    }
    _OnChangeCursorStyle(d) {
        document.documentElement.style.cursor = d
    }
});
"use strict";
self.RuntimeInterface.AddDOMHandlerClass(class extends self.DOMHandler {
    constructor(d) {
        super(d, "browser");
        this._exportType = "";
        this.AddRuntimeMessageHandlers([
            ["get-initial-state", a => this._OnGetInitialState(a)],
            ["ready-for-sw-messages", () => this._OnReadyForSWMessages()],
            ["alert", a => this._OnAlert(a)],
            ["close", () => this._OnClose()],
            ["set-focus", a => this._OnSetFocus(a)],
            ["vibrate", a => this._OnVibrate(a)],
            ["lock-orientation", a => this._OnLockOrientation(a)],
            ["unlock-orientation", () => this._OnUnlockOrientation()],
            ["navigate", a => this._OnNavigate(a)],
            ["request-fullscreen", a => this._OnRequestFullscreen(a)],
            ["exit-fullscreen", () => this._OnExitFullscreen()],
            ["set-hash", a => this._OnSetHash(a)]
        ]);
        window.addEventListener("online", () => this._OnOnlineStateChanged(!0));
        window.addEventListener("offline", () => this._OnOnlineStateChanged(!1));
        window.addEventListener("hashchange", () => this._OnHashChange());
        document.addEventListener("backbutton", () => this._OnCordovaBackButton());
        "undefined" !== typeof Windows && Windows.UI.Core.SystemNavigationManager.getForCurrentView().addEventListener("backrequested",
            a => this._OnWin10BackRequested(a))
    }
    _OnGetInitialState(d) {
        this._exportType = d.exportType;
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
    }
    _OnReadyForSWMessages() {
        window.C3_RegisterSW && window.OfflineClientInfo && window.OfflineClientInfo.SetMessageCallback(d =>
            this.PostToRuntime("sw-message", d.data))
    }
    _OnOnlineStateChanged(d) {
        this.PostToRuntime("online-state", {
            isOnline: d
        })
    }
    _OnCordovaBackButton() {
        this.PostToRuntime("backbutton")
    }
    _OnWin10BackRequested(d) {
        d.handled = !0;
        this.PostToRuntime("backbutton")
    }
    GetNWjsWindow() {
        return "nwjs" === this._exportType ? nw.Window.get() : null
    }
    _OnAlert(d) {
        alert(d.message)
    }
    _OnClose() {
        navigator.app && navigator.app.exitApp ? navigator.app.exitApp() : navigator.device && navigator.device.exitApp ? navigator.device.exitApp() : window.close()
    }
    _OnSetFocus(d) {
        d =
            d.isFocus;
        if ("nwjs" === this._exportType) {
            const a = this.GetNWjsWindow();
            d ? a.focus() : a.blur()
        } else d ? window.focus() : window.blur()
    }
    _OnVibrate(d) {
        navigator.vibrate && navigator.vibrate(d.pattern)
    }
    _OnLockOrientation(d) {
        d = d.orientation;
        if (screen.orientation && screen.orientation.lock) screen.orientation.lock(d).catch(a => console.warn("[Construct 3] Failed to lock orientation: ", a));
        else try {
            let a = !1;
            screen.lockOrientation ? a = screen.lockOrientation(d) : screen.webkitLockOrientation ? a = screen.webkitLockOrientation(d) :
                screen.mozLockOrientation ? a = screen.mozLockOrientation(d) : screen.msLockOrientation && (a = screen.msLockOrientation(d));
            a || console.warn("[Construct 3] Failed to lock orientation")
        } catch (a) {
            console.warn("[Construct 3] Failed to lock orientation: ", a)
        }
    }
    _OnUnlockOrientation() {
        try {
            screen.orientation && screen.orientation.unlock ? screen.orientation.unlock() : screen.unlockOrientation ? screen.unlockOrientation() : screen.webkitUnlockOrientation ? screen.webkitUnlockOrientation() : screen.mozUnlockOrientation ? screen.mozUnlockOrientation() :
                screen.msUnlockOrientation && screen.msUnlockOrientation()
        } catch (d) {}
    }
    _OnNavigate(d) {
        var a = d.type;
        if ("back" === a) navigator.app && navigator.app.backHistory ? navigator.app.backHistory() : window.history.back();
        else if ("forward" === a) window.history.forward();
        else if ("reload" === a) location.reload();
        else if ("url" === a) {
            a = d.url;
            var b = d.target;
            d = d.exportType;
            "windows-uwp" === d && "undefined" !== typeof Windows ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(a)) : self.cordova && self.cordova.InAppBrowser ?
                self.cordova.InAppBrowser.open(a, "_system") : "preview" === d || "windows-webview2" === d ? window.open(a, "_blank") : this._isScirraArcade || (2 === b ? window.top.location = a : 1 === b ? window.parent.location = a : window.location = a)
        } else "new-window" === a && (a = d.url, b = d.tag, "windows-uwp" === d.exportType && "undefined" !== typeof Windows ? Windows.System.Launcher.launchUriAsync(new Windows.Foundation.Uri(a)) : self.cordova && self.cordova.InAppBrowser ? self.cordova.InAppBrowser.open(a, "_system") : window.open(a, b))
    }
    _OnRequestFullscreen(d) {
        if ("windows-webview2" ===
            this._exportType || "macos-wkwebview" === this._exportType) self.RuntimeInterface._SetWrapperIsFullscreenFlag(!0), this._iRuntime._SendWrapperMessage({
            type: "set-fullscreen",
            fullscreen: !0
        });
        else {
            const a = {
                navigationUI: "auto"
            };
            d = d.navUI;
            1 === d ? a.navigationUI = "hide" : 2 === d && (a.navigationUI = "show");
            d = document.documentElement;
            d.requestFullscreen ? d.requestFullscreen(a) : d.mozRequestFullScreen ? d.mozRequestFullScreen(a) : d.msRequestFullscreen ? d.msRequestFullscreen(a) : d.webkitRequestFullScreen && ("undefined" !== typeof Element.ALLOW_KEYBOARD_INPUT ?
                d.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT) : d.webkitRequestFullScreen())
        }
    }
    _OnExitFullscreen() {
        "windows-webview2" === this._exportType || "macos-wkwebview" === this._exportType ? (self.RuntimeInterface._SetWrapperIsFullscreenFlag(!1), this._iRuntime._SendWrapperMessage({
                type: "set-fullscreen",
                fullscreen: !1
            })) : document.exitFullscreen ? document.exitFullscreen() : document.mozCancelFullScreen ? document.mozCancelFullScreen() : document.msExitFullscreen ? document.msExitFullscreen() : document.webkitCancelFullScreen &&
            document.webkitCancelFullScreen()
    }
    _OnSetHash(d) {
        location.hash = d.hash
    }
    _OnHashChange() {
        this.PostToRuntime("hashchange", {
            location: location.toString()
        })
    }
});
"use strict"; {
    const d = 180 / Math.PI;
    self.AudioDOMHandler = class extends self.DOMHandler {
        constructor(a) {
            super(a, "audio");
            this._destinationNode = this._audioContext = null;
            this._hasAttachedUnblockEvents = this._hasUnblocked = !1;
            this._unblockFunc = () => this._UnblockAudioContext();
            this._audioBuffers = [];
            this._audioInstances = [];
            this._lastAudioInstance = null;
            this._lastPlayedTag = "";
            this._lastTickCount = -1;
            this._pendingTags = new Map;
            this._masterVolume = 1;
            this._isSilent = !1;
            this._timeScaleMode = 0;
            this._timeScale = 1;
            this._gameTime = 0;
            this._panningModel =
                "HRTF";
            this._distanceModel = "inverse";
            this._refDistance = 600;
            this._maxDistance = 1E4;
            this._rolloffFactor = 1;
            this._hasAnySoftwareDecodedMusic = this._playMusicAsSound = !1;
            this._supportsWebMOpus = this._iRuntime.IsAudioFormatSupported("audio/webm; codecs=opus");
            this._effects = new Map;
            this._analysers = new Set;
            this._isPendingPostFxState = !1;
            this._microphoneTag = "";
            this._microphoneSource = null;
            self.C3Audio_OnMicrophoneStream = (b, e) => this._OnMicrophoneStream(b, e);
            this._destMediaStreamNode = null;
            self.C3Audio_GetOutputStream =
                () => this._OnGetOutputStream();
            self.C3Audio_DOMInterface = this;
            this.AddRuntimeMessageHandlers([
                ["create-audio-context", b => this._CreateAudioContext(b)],
                ["play", b => this._Play(b)],
                ["stop", b => this._Stop(b)],
                ["stop-all", () => this._StopAll()],
                ["set-paused", b => this._SetPaused(b)],
                ["set-volume", b => this._SetVolume(b)],
                ["fade-volume", b => this._FadeVolume(b)],
                ["set-master-volume", b => this._SetMasterVolume(b)],
                ["set-muted", b => this._SetMuted(b)],
                ["set-silent", b => this._SetSilent(b)],
                ["set-looping", b => this._SetLooping(b)],
                ["set-playback-rate", b => this._SetPlaybackRate(b)],
                ["seek", b => this._Seek(b)],
                ["preload", b => this._Preload(b)],
                ["unload", b => this._Unload(b)],
                ["unload-all", () => this._UnloadAll()],
                ["set-suspended", b => this._SetSuspended(b)],
                ["add-effect", b => this._AddEffect(b)],
                ["set-effect-param", b => this._SetEffectParam(b)],
                ["remove-effects", b => this._RemoveEffects(b)],
                ["tick", b => this._OnTick(b)],
                ["load-state", b => this._OnLoadState(b)]
            ])
        }
        async _CreateAudioContext(a) {
            a.isiOSCordova && (this._playMusicAsSound = !0);
            this._timeScaleMode =
                a.timeScaleMode;
            this._panningModel = ["equalpower", "HRTF", "soundfield"][a.panningModel];
            this._distanceModel = ["linear", "inverse", "exponential"][a.distanceModel];
            this._refDistance = a.refDistance;
            this._maxDistance = a.maxDistance;
            this._rolloffFactor = a.rolloffFactor;
            var b = {
                latencyHint: a.latencyHint
            };
            this.SupportsWebMOpus() || (b.sampleRate = 48E3);
            if ("undefined" !== typeof AudioContext) this._audioContext = new AudioContext(b);
            else if ("undefined" !== typeof webkitAudioContext) this._audioContext = new webkitAudioContext(b);
            else throw Error("Web Audio API not supported");
            this._AttachUnblockEvents();
            this._audioContext.onstatechange = () => {
                "running" !== this._audioContext.state && this._AttachUnblockEvents()
            };
            this._destinationNode = this._audioContext.createGain();
            this._destinationNode.connect(this._audioContext.destination);
            b = a.listenerPos;
            this._audioContext.listener.setPosition(b[0], b[1], b[2]);
            this._audioContext.listener.setOrientation(0, 0, 1, 0, -1, 0);
            self.C3_GetAudioContextCurrentTime = () => this.GetAudioCurrentTime();
            try {
                await Promise.all(a.preloadList.map(e =>
                    this._GetAudioBuffer(e.originalUrl, e.url, e.type, !1)))
            } catch (e) {
                console.error("[Construct 3] Preloading sounds failed: ", e)
            }
            return {
                sampleRate: this._audioContext.sampleRate
            }
        }
        _AttachUnblockEvents() {
            this._hasAttachedUnblockEvents || (this._hasUnblocked = !1, window.addEventListener("pointerup", this._unblockFunc, !0), window.addEventListener("touchend", this._unblockFunc, !0), window.addEventListener("click", this._unblockFunc, !0), window.addEventListener("keydown", this._unblockFunc, !0), this._hasAttachedUnblockEvents = !0)
        }
        _DetachUnblockEvents() {
            this._hasAttachedUnblockEvents && (this._hasUnblocked = !0, window.removeEventListener("pointerup", this._unblockFunc, !0), window.removeEventListener("touchend", this._unblockFunc, !0), window.removeEventListener("click", this._unblockFunc, !0), window.removeEventListener("keydown", this._unblockFunc, !0), this._hasAttachedUnblockEvents = !1)
        }
        _UnblockAudioContext() {
            if (!this._hasUnblocked) {
                var a = this._audioContext;
                "suspended" === a.state && a.resume && a.resume();
                var b = a.createBuffer(1, 220, 22050),
                    e = a.createBufferSource();
                e.buffer = b;
                e.connect(a.destination);
                e.start(0);
                "running" === a.state && this._DetachUnblockEvents()
            }
        }
        GetAudioContext() {
            return this._audioContext
        }
        GetAudioCurrentTime() {
            return this._audioContext.currentTime
        }
        GetDestinationNode() {
            return this._destinationNode
        }
        GetDestinationForTag(a) {
            return (a = this._effects.get(a.toLowerCase())) ? a[0].GetInputNode() : this.GetDestinationNode()
        }
        AddEffectForTag(a, b) {
            a = a.toLowerCase();
            let e = this._effects.get(a);
            e || (e = [], this._effects.set(a, e));
            b._SetIndex(e.length);
            b._SetTag(a);
            e.push(b);
            this._ReconnectEffects(a)
        }
        _ReconnectEffects(a) {
            let b = this.GetDestinationNode();
            const e = this._effects.get(a);
            if (e && e.length) {
                b = e[0].GetInputNode();
                for (let g = 0, m = e.length; g < m; ++g) {
                    const n = e[g];
                    g + 1 === m ? n.ConnectTo(this.GetDestinationNode()) : n.ConnectTo(e[g + 1].GetInputNode())
                }
            }
            for (const g of this.audioInstancesByTag(a)) g.Reconnect(b);
            this._microphoneSource && this._microphoneTag === a && (this._microphoneSource.disconnect(), this._microphoneSource.connect(b))
        }
        GetMasterVolume() {
            return this._masterVolume
        }
        IsSilent() {
            return this._isSilent
        }
        GetTimeScaleMode() {
            return this._timeScaleMode
        }
        GetTimeScale() {
            return this._timeScale
        }
        GetGameTime() {
            return this._gameTime
        }
        IsPlayMusicAsSound() {
            return this._playMusicAsSound
        }
        SupportsWebMOpus() {
            return this._supportsWebMOpus
        }
        _SetHasAnySoftwareDecodedMusic() {
            this._hasAnySoftwareDecodedMusic = !0
        }
        GetPanningModel() {
            return this._panningModel
        }
        GetDistanceModel() {
            return this._distanceModel
        }
        GetReferenceDistance() {
            return this._refDistance
        }
        GetMaxDistance() {
            return this._maxDistance
        }
        GetRolloffFactor() {
            return this._rolloffFactor
        }
        DecodeAudioData(a, b) {
            return b ? this._iRuntime._WasmDecodeWebMOpus(a).then(e => {
                const g = this._audioContext.createBuffer(1, e.length, 48E3);
                g.getChannelData(0).set(e);
                return g
            }) : new Promise((e, g) => {
                this._audioContext.decodeAudioData(a, e, g)
            })
        }
        TryPlayMedia(a) {
            this._iRuntime.TryPlayMedia(a)
        }
        RemovePendingPlay(a) {
            this._iRuntime.RemovePendingPlay(a)
        }
        ReleaseInstancesForBuffer(a) {
            let b =
                0;
            for (let e = 0, g = this._audioInstances.length; e < g; ++e) {
                const m = this._audioInstances[e];
                this._audioInstances[b] = m;
                m.GetBuffer() === a ? m.Release() : ++b
            }
            this._audioInstances.length = b
        }
        ReleaseAllMusicBuffers() {
            let a = 0;
            for (let b = 0, e = this._audioBuffers.length; b < e; ++b) {
                const g = this._audioBuffers[b];
                this._audioBuffers[a] = g;
                g.IsMusic() ? g.Release() : ++a
            }
            this._audioBuffers.length = a
        }* audioInstancesByTag(a) {
            if (a)
                for (const b of this._audioInstances) self.AudioDOMHandler.EqualsNoCase(b.GetTag(), a) && (yield b);
            else this._lastAudioInstance &&
                !this._lastAudioInstance.HasEnded() && (yield this._lastAudioInstance)
        }
        async _GetAudioBuffer(a, b, e, g, m) {
            for (const n of this._audioBuffers)
                if (n.GetUrl() === b) return await n.Load(), n;
            if (m) return null;
            g && (this._playMusicAsSound || this._hasAnySoftwareDecodedMusic) && this.ReleaseAllMusicBuffers();
            a = self.C3AudioBuffer.Create(this, a, b, e, g);
            this._audioBuffers.push(a);
            await a.Load();
            return a
        }
        async _GetAudioInstance(a, b, e, g, m) {
            for (const n of this._audioInstances)
                if (n.GetUrl() === b && (n.CanBeRecycled() || m)) return n.SetTag(g),
                    n;
            a = (await this._GetAudioBuffer(a, b, e, m)).CreateInstance(g);
            this._audioInstances.push(a);
            return a
        }
        _AddPendingTag(a) {
            let b = this._pendingTags.get(a);
            if (!b) {
                let e = null;
                b = {
                    pendingCount: 0,
                    promise: new Promise(g => e = g),
                    resolve: e
                };
                this._pendingTags.set(a, b)
            }
            b.pendingCount++
        }
        _RemovePendingTag(a) {
            const b = this._pendingTags.get(a);
            if (!b) throw Error("expected pending tag");
            b.pendingCount--;
            0 === b.pendingCount && (b.resolve(), this._pendingTags.delete(a))
        }
        TagReady(a) {
            a || (a = this._lastPlayedTag);
            return (a = this._pendingTags.get(a)) ?
                a.promise : Promise.resolve()
        }
        _MaybeStartTicking() {
            if (0 < this._analysers.size) this._StartTicking();
            else
                for (const a of this._audioInstances)
                    if (a.IsActive()) {
                        this._StartTicking();
                        break
                    }
        }
        Tick() {
            for (var a of this._analysers) a.Tick();
            a = this.GetAudioCurrentTime();
            for (var b of this._audioInstances) b.Tick(a);
            b = this._audioInstances.filter(e => e.IsActive()).map(e => e.GetState());
            this.PostToRuntime("state", {
                tickCount: this._lastTickCount,
                audioInstances: b,
                analysers: [...this._analysers].map(e => e.GetData())
            });
            0 === b.length &&
                0 === this._analysers.size && this._StopTicking()
        }
        PostTrigger(a, b, e) {
            this.PostToRuntime("trigger", {
                type: a,
                tag: b,
                aiid: e
            })
        }
        async _Play(a) {
            const b = a.originalUrl,
                e = a.url,
                g = a.type,
                m = a.isMusic,
                n = a.tag,
                v = a.isLooping,
                y = a.vol,
                z = a.pos,
                t = a.panning;
            let u = a.off;
            0 < u && !a.trueClock && (this._audioContext.getOutputTimestamp ? (a = this._audioContext.getOutputTimestamp(), u = u - a.performanceTime / 1E3 + a.contextTime) : u = u - performance.now() / 1E3 + this._audioContext.currentTime);
            this._lastPlayedTag = n;
            this._AddPendingTag(n);
            try {
                this._lastAudioInstance =
                    await this._GetAudioInstance(b, e, g, n, m), t ? (this._lastAudioInstance.SetPannerEnabled(!0), this._lastAudioInstance.SetPan(t.x, t.y, t.angle, t.innerAngle, t.outerAngle, t.outerGain), t.hasOwnProperty("uid") && this._lastAudioInstance.SetUID(t.uid)) : this._lastAudioInstance.SetPannerEnabled(!1), this._lastAudioInstance.Play(v, y, z, u)
            } catch (A) {
                console.error("[Construct 3] Audio: error starting playback: ", A);
                return
            } finally {
                this._RemovePendingTag(n)
            }
            this._StartTicking()
        }
        _Stop(a) {
            a = a.tag;
            for (const b of this.audioInstancesByTag(a)) b.Stop()
        }
        _StopAll() {
            for (const a of this._audioInstances) a.Stop()
        }
        _SetPaused(a) {
            const b =
                a.tag;
            a = a.paused;
            for (const e of this.audioInstancesByTag(b)) a ? e.Pause() : e.Resume();
            this._MaybeStartTicking()
        }
        _SetVolume(a) {
            const b = a.tag;
            a = a.vol;
            for (const e of this.audioInstancesByTag(b)) e.SetVolume(a)
        }
        async _FadeVolume(a) {
            const b = a.tag,
                e = a.vol,
                g = a.duration;
            a = a.stopOnEnd;
            await this.TagReady(b);
            for (const m of this.audioInstancesByTag(b)) m.FadeVolume(e, g, a);
            this._MaybeStartTicking()
        }
        _SetMasterVolume(a) {
            this._masterVolume = a.vol;
            for (const b of this._audioInstances) b._UpdateVolume()
        }
        _SetMuted(a) {
            const b =
                a.tag;
            a = a.isMuted;
            for (const e of this.audioInstancesByTag(b)) e.SetMuted(a)
        }
        _SetSilent(a) {
            this._isSilent = a.isSilent;
            this._iRuntime.SetSilent(this._isSilent);
            for (const b of this._audioInstances) b._UpdateMuted()
        }
        _SetLooping(a) {
            const b = a.tag;
            a = a.isLooping;
            for (const e of this.audioInstancesByTag(b)) e.SetLooping(a)
        }
        async _SetPlaybackRate(a) {
            const b = a.tag;
            a = a.rate;
            await this.TagReady(b);
            for (const e of this.audioInstancesByTag(b)) e.SetPlaybackRate(a)
        }
        async _Seek(a) {
            const b = a.tag;
            a = a.pos;
            await this.TagReady(b);
            for (const e of this.audioInstancesByTag(b)) e.Seek(a)
        }
        async _Preload(a) {
            const b = a.originalUrl,
                e = a.url,
                g = a.type;
            a = a.isMusic;
            try {
                await this._GetAudioInstance(b, e, g, "", a)
            } catch (m) {
                console.error("[Construct 3] Audio: error preloading: ", m)
            }
        }
        async _Unload(a) {
            if (a = await this._GetAudioBuffer("", a.url, a.type, a.isMusic, !0)) a.Release(), a = this._audioBuffers.indexOf(a), -1 !== a && this._audioBuffers.splice(a, 1)
        }
        _UnloadAll() {
            for (const a of this._audioBuffers) a.Release();
            this._audioBuffers.length = 0
        }
        _SetSuspended(a) {
            a =
                a.isSuspended;
            !a && this._audioContext.resume && this._audioContext.resume();
            for (const b of this._audioInstances) b.SetSuspended(a);
            a && this._audioContext.suspend && this._audioContext.suspend()
        }
        _OnTick(a) {
            this._timeScale = a.timeScale;
            this._gameTime = a.gameTime;
            this._lastTickCount = a.tickCount;
            if (0 !== this._timeScaleMode)
                for (var b of this._audioInstances) b._UpdatePlaybackRate();
            (b = a.listenerPos) && this._audioContext.listener.setPosition(b[0], b[1], b[2]);
            for (const e of a.instPans) {
                a = e.uid;
                for (const g of this._audioInstances) g.GetUID() ===
                    a && g.SetPanXYA(e.x, e.y, e.angle)
            }
        }
        async _AddEffect(a) {
            var b = a.type;
            const e = a.tag;
            var g = a.params;
            if ("filter" === b) g = new self.C3AudioFilterFX(this, ...g);
            else if ("delay" === b) g = new self.C3AudioDelayFX(this, ...g);
            else if ("convolution" === b) {
                b = null;
                try {
                    b = await this._GetAudioBuffer(a.bufferOriginalUrl, a.bufferUrl, a.bufferType, !1)
                } catch (m) {
                    console.log("[Construct 3] Audio: error loading convolution: ", m);
                    return
                }
                g = new self.C3AudioConvolveFX(this, b.GetAudioBuffer(), ...g);
                g._SetBufferInfo(a.bufferOriginalUrl, a.bufferUrl,
                    a.bufferType)
            } else if ("flanger" === b) g = new self.C3AudioFlangerFX(this, ...g);
            else if ("phaser" === b) g = new self.C3AudioPhaserFX(this, ...g);
            else if ("gain" === b) g = new self.C3AudioGainFX(this, ...g);
            else if ("tremolo" === b) g = new self.C3AudioTremoloFX(this, ...g);
            else if ("ringmod" === b) g = new self.C3AudioRingModFX(this, ...g);
            else if ("distortion" === b) g = new self.C3AudioDistortionFX(this, ...g);
            else if ("compressor" === b) g = new self.C3AudioCompressorFX(this, ...g);
            else if ("analyser" === b) g = new self.C3AudioAnalyserFX(this,
                ...g);
            else throw Error("invalid effect type");
            this.AddEffectForTag(e, g);
            this._PostUpdatedFxState()
        }
        _SetEffectParam(a) {
            const b = a.index,
                e = a.param,
                g = a.value,
                m = a.ramp,
                n = a.time;
            a = this._effects.get(a.tag);
            !a || 0 > b || b >= a.length || (a[b].SetParam(e, g, m, n), this._PostUpdatedFxState())
        }
        _RemoveEffects(a) {
            a = a.tag.toLowerCase();
            const b = this._effects.get(a);
            if (b && b.length) {
                for (const e of b) e.Release();
                this._effects.delete(a);
                this._ReconnectEffects(a)
            }
        }
        _AddAnalyser(a) {
            this._analysers.add(a);
            this._MaybeStartTicking()
        }
        _RemoveAnalyser(a) {
            this._analysers.delete(a)
        }
        _PostUpdatedFxState() {
            this._isPendingPostFxState ||
                (this._isPendingPostFxState = !0, Promise.resolve().then(() => this._DoPostUpdatedFxState()))
        }
        _DoPostUpdatedFxState() {
            const a = {};
            for (const [b, e] of this._effects) a[b] = e.map(g => g.GetState());
            this.PostToRuntime("fxstate", {
                fxstate: a
            });
            this._isPendingPostFxState = !1
        }
        async _OnLoadState(a) {
            const b = a.saveLoadMode;
            if (3 !== b)
                for (var e of this._audioInstances) e.IsMusic() && 1 === b || (e.IsMusic() || 2 !== b) && e.Stop();
            for (const g of this._effects.values())
                for (const m of g) m.Release();
            this._effects.clear();
            this._timeScale = a.timeScale;
            this._gameTime = a.gameTime;
            e = a.listenerPos;
            this._audioContext.listener.setPosition(e[0], e[1], e[2]);
            this._isSilent = a.isSilent;
            this._iRuntime.SetSilent(this._isSilent);
            this._masterVolume = a.masterVolume;
            e = [];
            for (const g of Object.values(a.effects)) e.push(Promise.all(g.map(m => this._AddEffect(m))));
            await Promise.all(e);
            await Promise.all(a.playing.map(g => this._LoadAudioInstance(g, b)));
            this._MaybeStartTicking()
        }
        async _LoadAudioInstance(a, b) {
            if (3 !== b) {
                var e = a.bufferOriginalUrl,
                    g = a.bufferUrl,
                    m = a.bufferType,
                    n = a.isMusic,
                    v = a.tag,
                    y = a.isLooping,
                    z = a.volume,
                    t = a.playbackTime;
                if (!n || 1 !== b)
                    if (n || 2 !== b) {
                        b = null;
                        try {
                            b = await this._GetAudioInstance(e, g, m, v, n)
                        } catch (u) {
                            console.error("[Construct 3] Audio: error loading audio state: ", u);
                            return
                        }
                        b.LoadPanState(a.pan);
                        b.Play(y, z, t, 0);
                        a.isPlaying || b.Pause();
                        b._LoadAdditionalState(a)
                    }
            }
        }
        _OnMicrophoneStream(a, b) {
            this._microphoneSource && this._microphoneSource.disconnect();
            this._microphoneTag = b.toLowerCase();
            this._microphoneSource = this._audioContext.createMediaStreamSource(a);
            this._microphoneSource.connect(this.GetDestinationForTag(this._microphoneTag))
        }
        _OnGetOutputStream() {
            this._destMediaStreamNode || (this._destMediaStreamNode = this._audioContext.createMediaStreamDestination(), this._destinationNode.connect(this._destMediaStreamNode));
            return this._destMediaStreamNode.stream
        }
        static EqualsNoCase(a, b) {
            return a.length !== b.length ? !1 : a === b ? !0 : a.toLowerCase() === b.toLowerCase()
        }
        static ToDegrees(a) {
            return a * d
        }
        static DbToLinearNoCap(a) {
            return Math.pow(10, a / 20)
        }
        static DbToLinear(a) {
            return Math.max(Math.min(self.AudioDOMHandler.DbToLinearNoCap(a),
                1), 0)
        }
        static LinearToDbNoCap(a) {
            return Math.log(a) / Math.log(10) * 20
        }
        static LinearToDb(a) {
            return self.AudioDOMHandler.LinearToDbNoCap(Math.max(Math.min(a, 1), 0))
        }
        static e4(a, b) {
            return 1 - Math.exp(-b * a)
        }
    };
    self.RuntimeInterface.AddDOMHandlerClass(self.AudioDOMHandler)
}
"use strict";
self.C3AudioBuffer = class {
    constructor(d, a, b, e, g) {
        this._audioDomHandler = d;
        this._originalUrl = a;
        this._url = b;
        this._type = e;
        this._isMusic = g;
        this._api = "";
        this._loadState = "not-loaded";
        this._loadPromise = null
    }
    Release() {
        this._loadState = "not-loaded";
        this._loadPromise = this._audioDomHandler = null
    }
    static Create(d, a, b, e, g) {
        const m = "audio/webm; codecs=opus" === e && !d.SupportsWebMOpus();
        g && m && d._SetHasAnySoftwareDecodedMusic();
        return !g || d.IsPlayMusicAsSound() || m ? new self.C3WebAudioBuffer(d, a, b, e, g, m) : new self.C3Html5AudioBuffer(d,
            a, b, e, g)
    }
    CreateInstance(d) {
        return "html5" === this._api ? new self.C3Html5AudioInstance(this._audioDomHandler, this, d) : new self.C3WebAudioInstance(this._audioDomHandler, this, d)
    }
    _Load() {}
    Load() {
        this._loadPromise || (this._loadPromise = this._Load());
        return this._loadPromise
    }
    IsLoaded() {}
    IsLoadedAndDecoded() {}
    HasFailedToLoad() {
        return "failed" === this._loadState
    }
    GetAudioContext() {
        return this._audioDomHandler.GetAudioContext()
    }
    GetApi() {
        return this._api
    }
    GetOriginalUrl() {
        return this._originalUrl
    }
    GetUrl() {
        return this._url
    }
    GetContentType() {
        return this._type
    }
    IsMusic() {
        return this._isMusic
    }
    GetDuration() {}
};
"use strict";
self.C3Html5AudioBuffer = class extends self.C3AudioBuffer {
    constructor(d, a, b, e, g) {
        super(d, a, b, e, g);
        this._api = "html5";
        this._audioElem = new Audio;
        this._audioElem.crossOrigin = "anonymous";
        this._audioElem.autoplay = !1;
        this._audioElem.preload = "auto";
        this._loadReject = this._loadResolve = null;
        this._reachedCanPlayThrough = !1;
        this._audioElem.addEventListener("canplaythrough", () => this._reachedCanPlayThrough = !0);
        this._outNode = this.GetAudioContext().createGain();
        this._mediaSourceNode = null;
        this._audioElem.addEventListener("canplay", () => {
            this._loadResolve && (this._loadState = "loaded", this._loadResolve(), this._loadReject = this._loadResolve = null);
            !this._mediaSourceNode && this._audioElem && (this._mediaSourceNode = this.GetAudioContext().createMediaElementSource(this._audioElem), this._mediaSourceNode.connect(this._outNode))
        });
        this.onended = null;
        this._audioElem.addEventListener("ended", () => {
            if (this.onended) this.onended()
        });
        this._audioElem.addEventListener("error", m => this._OnError(m))
    }
    Release() {
        this._audioDomHandler.ReleaseInstancesForBuffer(this);
        this._outNode.disconnect();
        this._outNode = null;
        this._mediaSourceNode.disconnect();
        this._mediaSourceNode = null;
        this._audioElem && !this._audioElem.paused && this._audioElem.pause();
        this._audioElem = this.onended = null;
        super.Release()
    }
    _Load() {
        this._loadState = "loading";
        return new Promise((d, a) => {
            this._loadResolve = d;
            this._loadReject = a;
            this._audioElem.src = this._url
        })
    }
    _OnError(d) {
        console.error(`[Construct 3] Audio '${this._url}' error: `, d);
        this._loadReject && (this._loadState = "failed", this._loadReject(d), this._loadReject =
            this._loadResolve = null)
    }
    IsLoaded() {
        const d = 4 <= this._audioElem.readyState;
        d && (this._reachedCanPlayThrough = !0);
        return d || this._reachedCanPlayThrough
    }
    IsLoadedAndDecoded() {
        return this.IsLoaded()
    }
    GetAudioElement() {
        return this._audioElem
    }
    GetOutputNode() {
        return this._outNode
    }
    GetDuration() {
        return this._audioElem.duration
    }
};
"use strict";
self.C3WebAudioBuffer = class extends self.C3AudioBuffer {
    constructor(d, a, b, e, g, m) {
        super(d, a, b, e, g);
        this._api = "webaudio";
        this._audioBuffer = this._audioData = null;
        this._needsSoftwareDecode = !!m
    }
    Release() {
        this._audioDomHandler.ReleaseInstancesForBuffer(this);
        this._audioBuffer = this._audioData = null;
        super.Release()
    }
    async _Fetch() {
        if (this._audioData) return this._audioData;
        var d = this._audioDomHandler.GetRuntimeInterface();
        if ("cordova" === d.GetExportType() && d.IsRelativeURL(this._url) && "file:" === location.protocol) this._audioData =
            await d.CordovaFetchLocalFileAsArrayBuffer(this._url);
        else {
            d = await fetch(this._url);
            if (!d.ok) throw Error(`error fetching audio data: ${d.status} ${d.statusText}`);
            this._audioData = await d.arrayBuffer()
        }
    }
    async _Decode() {
        if (this._audioBuffer) return this._audioBuffer;
        this._audioBuffer = await this._audioDomHandler.DecodeAudioData(this._audioData, this._needsSoftwareDecode);
        this._audioData = null
    }
    async _Load() {
        try {
            this._loadState = "loading", await this._Fetch(), await this._Decode(), this._loadState = "loaded"
        } catch (d) {
            this._loadState =
                "failed", console.error(`[Construct 3] Failed to load audio '${this._url}': `, d)
        }
    }
    IsLoaded() {
        return !(!this._audioData && !this._audioBuffer)
    }
    IsLoadedAndDecoded() {
        return !!this._audioBuffer
    }
    GetAudioBuffer() {
        return this._audioBuffer
    }
    GetDuration() {
        return this._audioBuffer ? this._audioBuffer.duration : 0
    }
};
"use strict"; {
    let d = 0;
    self.C3AudioInstance = class {
        constructor(a, b, e) {
            this._audioDomHandler = a;
            this._buffer = b;
            this._tag = e;
            this._aiId = d++;
            this._gainNode = this.GetAudioContext().createGain();
            this._gainNode.connect(this.GetDestinationNode());
            this._pannerNode = null;
            this._isPannerEnabled = !1;
            this._pannerPosition = [0, 0, 0];
            this._pannerOrientation = [0, 0, 0];
            this._isStopped = !0;
            this._isLooping = this._resumeMe = this._isPaused = !1;
            this._volume = 1;
            this._isMuted = !1;
            this._playbackRate = 1;
            a = this._audioDomHandler.GetTimeScaleMode();
            this._isTimescaled =
                1 === a && !this.IsMusic() || 2 === a;
            this._fadeEndTime = this._instUid = -1;
            this._stopOnFadeEnd = !1
        }
        Release() {
            this._buffer = this._audioDomHandler = null;
            this._pannerNode && (this._pannerNode.disconnect(), this._pannerNode = null);
            this._gainNode.disconnect();
            this._gainNode = null
        }
        GetAudioContext() {
            return this._audioDomHandler.GetAudioContext()
        }
        GetDestinationNode() {
            return this._audioDomHandler.GetDestinationForTag(this._tag)
        }
        GetMasterVolume() {
            return this._audioDomHandler.GetMasterVolume()
        }
        GetCurrentTime() {
            return this._isTimescaled ?
                this._audioDomHandler.GetGameTime() : performance.now() / 1E3
        }
        GetOriginalUrl() {
            return this._buffer.GetOriginalUrl()
        }
        GetUrl() {
            return this._buffer.GetUrl()
        }
        GetContentType() {
            return this._buffer.GetContentType()
        }
        GetBuffer() {
            return this._buffer
        }
        IsMusic() {
            return this._buffer.IsMusic()
        }
        SetTag(a) {
            this._tag = a
        }
        GetTag() {
            return this._tag
        }
        GetAiId() {
            return this._aiId
        }
        HasEnded() {}
        CanBeRecycled() {}
        IsPlaying() {
            return !this._isStopped && !this._isPaused && !this.HasEnded()
        }
        IsActive() {
            return !this._isStopped && !this.HasEnded()
        }
        GetPlaybackTime(a) {}
        GetDuration(a) {
            let b =
                this._buffer.GetDuration();
            a && (b /= this._playbackRate || .001);
            return b
        }
        Play(a, b, e, g) {}
        Stop() {}
        Pause() {}
        IsPaused() {
            return this._isPaused
        }
        Resume() {}
        SetVolume(a) {
            this._volume = a;
            this._gainNode.gain.cancelScheduledValues(0);
            this._fadeEndTime = -1;
            this._gainNode.gain.value = this.GetOverallVolume()
        }
        FadeVolume(a, b, e) {
            if (!this.IsMuted()) {
                a *= this.GetMasterVolume();
                var g = this._gainNode.gain;
                g.cancelScheduledValues(0);
                var m = this._audioDomHandler.GetAudioCurrentTime();
                b = m + b;
                g.setValueAtTime(g.value, m);
                g.linearRampToValueAtTime(a,
                    b);
                this._volume = a;
                this._fadeEndTime = b;
                this._stopOnFadeEnd = e
            }
        }
        _UpdateVolume() {
            this.SetVolume(this._volume)
        }
        Tick(a) {
            -1 !== this._fadeEndTime && a >= this._fadeEndTime && (this._fadeEndTime = -1, this._stopOnFadeEnd && this.Stop(), this._audioDomHandler.PostTrigger("fade-ended", this._tag, this._aiId))
        }
        GetOverallVolume() {
            const a = this._volume * this.GetMasterVolume();
            return isFinite(a) ? a : 0
        }
        SetMuted(a) {
            a = !!a;
            this._isMuted !== a && (this._isMuted = a, this._UpdateMuted())
        }
        IsMuted() {
            return this._isMuted
        }
        IsSilent() {
            return this._audioDomHandler.IsSilent()
        }
        _UpdateMuted() {}
        SetLooping(a) {}
        IsLooping() {
            return this._isLooping
        }
        SetPlaybackRate(a) {
            this._playbackRate !==
                a && (this._playbackRate = a, this._UpdatePlaybackRate())
        }
        _UpdatePlaybackRate() {}
        GetPlaybackRate() {
            return this._playbackRate
        }
        Seek(a) {}
        SetSuspended(a) {}
        SetPannerEnabled(a) {
            a = !!a;
            this._isPannerEnabled !== a && ((this._isPannerEnabled = a) ? (this._pannerNode || (this._pannerNode = this.GetAudioContext().createPanner(), this._pannerNode.panningModel = this._audioDomHandler.GetPanningModel(), this._pannerNode.distanceModel = this._audioDomHandler.GetDistanceModel(), this._pannerNode.refDistance = this._audioDomHandler.GetReferenceDistance(),
                this._pannerNode.maxDistance = this._audioDomHandler.GetMaxDistance(), this._pannerNode.rolloffFactor = this._audioDomHandler.GetRolloffFactor()), this._gainNode.disconnect(), this._gainNode.connect(this._pannerNode), this._pannerNode.connect(this.GetDestinationNode())) : (this._pannerNode.disconnect(), this._gainNode.disconnect(), this._gainNode.connect(this.GetDestinationNode())))
        }
        SetPan(a, b, e, g, m, n) {
            this._isPannerEnabled && (this.SetPanXYA(a, b, e), a = self.AudioDOMHandler.ToDegrees, this._pannerNode.coneInnerAngle =
                a(g), this._pannerNode.coneOuterAngle = a(m), this._pannerNode.coneOuterGain = n)
        }
        SetPanXYA(a, b, e) {
            this._isPannerEnabled && (this._pannerPosition[0] = a, this._pannerPosition[1] = b, this._pannerPosition[2] = 0, this._pannerOrientation[0] = Math.cos(e), this._pannerOrientation[1] = Math.sin(e), this._pannerOrientation[2] = 0, this._pannerNode.setPosition(...this._pannerPosition), this._pannerNode.setOrientation(...this._pannerOrientation))
        }
        SetUID(a) {
            this._instUid = a
        }
        GetUID() {
            return this._instUid
        }
        GetResumePosition() {}
        Reconnect(a) {
            const b =
                this._pannerNode || this._gainNode;
            b.disconnect();
            b.connect(a)
        }
        GetState() {
            return {
                aiid: this.GetAiId(),
                tag: this._tag,
                duration: this.GetDuration(),
                volume: this._volume,
                isPlaying: this.IsPlaying(),
                playbackTime: this.GetPlaybackTime(),
                playbackRate: this.GetPlaybackRate(),
                uid: this._instUid,
                bufferOriginalUrl: this.GetOriginalUrl(),
                bufferUrl: "",
                bufferType: this.GetContentType(),
                isMusic: this.IsMusic(),
                isLooping: this.IsLooping(),
                isMuted: this.IsMuted(),
                resumePosition: this.GetResumePosition(),
                pan: this.GetPanState()
            }
        }
        _LoadAdditionalState(a) {
            this.SetPlaybackRate(a.playbackRate);
            this.SetMuted(a.isMuted)
        }
        GetPanState() {
            if (!this._pannerNode) return null;
            const a = this._pannerNode;
            return {
                pos: this._pannerPosition,
                orient: this._pannerOrientation,
                cia: a.coneInnerAngle,
                coa: a.coneOuterAngle,
                cog: a.coneOuterGain,
                uid: this._instUid
            }
        }
        LoadPanState(a) {
            if (a) {
                this.SetPannerEnabled(!0);
                a = this._pannerNode;
                var b = a.pos;
                this._pannerPosition[0] = b[0];
                this._pannerPosition[1] = b[1];
                this._pannerPosition[2] = b[2];
                b = a.orient;
                this._pannerOrientation[0] = b[0];
                this._pannerOrientation[1] = b[1];
                this._pannerOrientation[2] =
                    b[2];
                a.setPosition(...this._pannerPosition);
                a.setOrientation(...this._pannerOrientation);
                a.coneInnerAngle = a.cia;
                a.coneOuterAngle = a.coa;
                a.coneOuterGain = a.cog;
                this._instUid = a.uid
            } else this.SetPannerEnabled(!1)
        }
    }
}
"use strict";
self.C3Html5AudioInstance = class extends self.C3AudioInstance {
    constructor(d, a, b) {
        super(d, a, b);
        this._buffer.GetOutputNode().connect(this._gainNode);
        this._buffer.onended = () => this._OnEnded()
    }
    Release() {
        this.Stop();
        this._buffer.GetOutputNode().disconnect();
        super.Release()
    }
    GetAudioElement() {
        return this._buffer.GetAudioElement()
    }
    _OnEnded() {
        this._isStopped = !0;
        this._instUid = -1;
        this._audioDomHandler.PostTrigger("ended", this._tag, this._aiId)
    }
    HasEnded() {
        return this.GetAudioElement().ended
    }
    CanBeRecycled() {
        return this._isStopped ?
            !0 : this.HasEnded()
    }
    GetPlaybackTime(d) {
        let a = this.GetAudioElement().currentTime;
        d && (a *= this._playbackRate);
        this._isLooping || (a = Math.min(a, this.GetDuration()));
        return a
    }
    Play(d, a, b, e) {
        e = this.GetAudioElement();
        1 !== e.playbackRate && (e.playbackRate = 1);
        e.loop !== d && (e.loop = d);
        this.SetVolume(a);
        e.muted && (e.muted = !1);
        if (e.currentTime !== b) try {
            e.currentTime = b
        } catch (g) {
            console.warn(`[Construct 3] Exception seeking audio '${this._buffer.GetUrl()}' to position '${b}': `, g)
        }
        this._audioDomHandler.TryPlayMedia(e);
        this._isPaused =
            this._isStopped = !1;
        this._isLooping = d;
        this._playbackRate = 1
    }
    Stop() {
        const d = this.GetAudioElement();
        d.paused || d.pause();
        this._audioDomHandler.RemovePendingPlay(d);
        this._isStopped = !0;
        this._isPaused = !1;
        this._instUid = -1
    }
    Pause() {
        if (!(this._isPaused || this._isStopped || this.HasEnded())) {
            var d = this.GetAudioElement();
            d.paused || d.pause();
            this._audioDomHandler.RemovePendingPlay(d);
            this._isPaused = !0
        }
    }
    Resume() {
        !this._isPaused || this._isStopped || this.HasEnded() || (this._audioDomHandler.TryPlayMedia(this.GetAudioElement()),
            this._isPaused = !1)
    }
    _UpdateMuted() {
        this.GetAudioElement().muted = this._isMuted || this.IsSilent()
    }
    SetLooping(d) {
        d = !!d;
        this._isLooping !== d && (this._isLooping = d, this.GetAudioElement().loop = d)
    }
    _UpdatePlaybackRate() {
        let d = this._playbackRate;
        this._isTimescaled && (d *= this._audioDomHandler.GetTimeScale());
        try {
            this.GetAudioElement().playbackRate = d
        } catch (a) {
            console.warn(`[Construct 3] Unable to set playback rate '${d}':`, a)
        }
    }
    Seek(d) {
        if (!this._isStopped && !this.HasEnded()) try {
            this.GetAudioElement().currentTime = d
        } catch (a) {
            console.warn(`[Construct 3] Error seeking audio to '${d}': `,
                a)
        }
    }
    GetResumePosition() {
        return this.GetPlaybackTime()
    }
    SetSuspended(d) {
        d ? this.IsPlaying() ? (this.GetAudioElement().pause(), this._resumeMe = !0) : this._resumeMe = !1 : this._resumeMe && (this._audioDomHandler.TryPlayMedia(this.GetAudioElement()), this._resumeMe = !1)
    }
};
"use strict";
self.C3WebAudioInstance = class extends self.C3AudioInstance {
    constructor(d, a, b) {
        super(d, a, b);
        this._bufferSource = null;
        this._onended_handler = e => this._OnEnded(e);
        this._hasPlaybackEnded = !0;
        this._activeSource = null;
        this._resumePosition = this._startTime = 0;
        this._muteVol = 1
    }
    Release() {
        this.Stop();
        this._ReleaseBufferSource();
        this._onended_handler = null;
        super.Release()
    }
    _ReleaseBufferSource() {
        this._bufferSource && this._bufferSource.disconnect();
        this._activeSource = this._bufferSource = null
    }
    _OnEnded(d) {
        this._isPaused ||
            this._resumeMe || d.target !== this._activeSource || (this._isStopped = this._hasPlaybackEnded = !0, this._instUid = -1, this._ReleaseBufferSource(), this._audioDomHandler.PostTrigger("ended", this._tag, this._aiId))
    }
    HasEnded() {
        return !this._isStopped && this._bufferSource && this._bufferSource.loop || this._isPaused ? !1 : this._hasPlaybackEnded
    }
    CanBeRecycled() {
        return !this._bufferSource || this._isStopped ? !0 : this.HasEnded()
    }
    GetPlaybackTime(d) {
        let a;
        a = this._isPaused ? this._resumePosition : this.GetCurrentTime() - this._startTime;
        d &&
            (a *= this._playbackRate);
        this._isLooping || (a = Math.min(a, this.GetDuration()));
        return a
    }
    Play(d, a, b, e) {
        this._muteVol = 1;
        this.SetVolume(a);
        this._ReleaseBufferSource();
        this._bufferSource = this.GetAudioContext().createBufferSource();
        this._bufferSource.buffer = this._buffer.GetAudioBuffer();
        this._bufferSource.connect(this._gainNode);
        this._activeSource = this._bufferSource;
        this._bufferSource.onended = this._onended_handler;
        this._bufferSource.loop = d;
        this._bufferSource.start(e, b);
        this._isPaused = this._isStopped = this._hasPlaybackEnded = !1;
        this._isLooping = d;
        this._playbackRate = 1;
        this._startTime = this.GetCurrentTime() - b
    }
    Stop() {
        if (this._bufferSource) try {
            this._bufferSource.stop(0)
        } catch (d) {}
        this._isStopped = !0;
        this._isPaused = !1;
        this._instUid = -1
    }
    Pause() {
        this._isPaused || this._isStopped || this.HasEnded() || (this._resumePosition = this.GetPlaybackTime(!0), this._isLooping && (this._resumePosition %= this.GetDuration()), this._isPaused = !0, this._bufferSource.stop(0))
    }
    Resume() {
        !this._isPaused || this._isStopped || this.HasEnded() || (this._ReleaseBufferSource(),
            this._bufferSource = this.GetAudioContext().createBufferSource(), this._bufferSource.buffer = this._buffer.GetAudioBuffer(), this._bufferSource.connect(this._gainNode), this._activeSource = this._bufferSource, this._bufferSource.onended = this._onended_handler, this._bufferSource.loop = this._isLooping, this._UpdateVolume(), this._UpdatePlaybackRate(), this._startTime = this.GetCurrentTime() - this._resumePosition / (this._playbackRate || .001), this._bufferSource.start(0, this._resumePosition), this._isPaused = !1)
    }
    GetOverallVolume() {
        return super.GetOverallVolume() *
            this._muteVol
    }
    _UpdateMuted() {
        this._muteVol = this._isMuted || this.IsSilent() ? 0 : 1;
        this._UpdateVolume()
    }
    SetLooping(d) {
        d = !!d;
        this._isLooping !== d && (this._isLooping = d, this._bufferSource && (this._bufferSource.loop = d))
    }
    _UpdatePlaybackRate() {
        let d = this._playbackRate;
        this._isTimescaled && (d *= this._audioDomHandler.GetTimeScale());
        this._bufferSource && (this._bufferSource.playbackRate.value = d)
    }
    Seek(d) {
        this._isStopped || this.HasEnded() || (this._isPaused ? this._resumePosition = d : (this.Pause(), this._resumePosition = d, this.Resume()))
    }
    GetResumePosition() {
        return this._resumePosition
    }
    SetSuspended(d) {
        d ?
            this.IsPlaying() ? (this._resumeMe = !0, this._resumePosition = this.GetPlaybackTime(!0), this._isLooping && (this._resumePosition %= this.GetDuration()), this._bufferSource.stop(0)) : this._resumeMe = !1 : this._resumeMe && (this._ReleaseBufferSource(), this._bufferSource = this.GetAudioContext().createBufferSource(), this._bufferSource.buffer = this._buffer.GetAudioBuffer(), this._bufferSource.connect(this._gainNode), this._activeSource = this._bufferSource, this._bufferSource.onended = this._onended_handler, this._bufferSource.loop =
                this._isLooping, this._UpdateVolume(), this._UpdatePlaybackRate(), this._startTime = this.GetCurrentTime() - this._resumePosition / (this._playbackRate || .001), this._bufferSource.start(0, this._resumePosition), this._resumeMe = !1)
    }
    _LoadAdditionalState(d) {
        super._LoadAdditionalState(d);
        this._resumePosition = d.resumePosition
    }
};
"use strict"; {
    class d {
        constructor(a) {
            this._audioDomHandler = a;
            this._audioContext = a.GetAudioContext();
            this._index = -1;
            this._type = this._tag = "";
            this._params = null
        }
        Release() {
            this._audioContext = null
        }
        _SetIndex(a) {
            this._index = a
        }
        GetIndex() {
            return this._index
        }
        _SetTag(a) {
            this._tag = a
        }
        GetTag() {
            return this._tag
        }
        CreateGain() {
            return this._audioContext.createGain()
        }
        GetInputNode() {}
        ConnectTo(a) {}
        SetAudioParam(a, b, e, g) {
            a.cancelScheduledValues(0);
            if (0 === g) a.value = b;
            else {
                var m = this._audioContext.currentTime;
                g += m;
                switch (e) {
                    case 0:
                        a.setValueAtTime(b,
                            g);
                        break;
                    case 1:
                        a.setValueAtTime(a.value, m);
                        a.linearRampToValueAtTime(b, g);
                        break;
                    case 2:
                        a.setValueAtTime(a.value, m), a.exponentialRampToValueAtTime(b, g)
                }
            }
        }
        GetState() {
            return {
                type: this._type,
                tag: this._tag,
                params: this._params
            }
        }
    }
    self.C3AudioFilterFX = class extends d {
        constructor(a, b, e, g, m, n, v) {
            super(a);
            this._type = "filter";
            this._params = [b, e, g, m, n, v];
            this._inputNode = this.CreateGain();
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value = v;
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - v;
            this._filterNode =
                this._audioContext.createBiquadFilter();
            this._filterNode.type = b;
            this._filterNode.frequency.value = e;
            this._filterNode.detune.value = g;
            this._filterNode.Q.value = m;
            this._filterNode.gain.vlaue = n;
            this._inputNode.connect(this._filterNode);
            this._inputNode.connect(this._dryNode);
            this._filterNode.connect(this._wetNode)
        }
        Release() {
            this._inputNode.disconnect();
            this._filterNode.disconnect();
            this._wetNode.disconnect();
            this._dryNode.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a, b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this._params[5] = b;
                    this.SetAudioParam(this._wetNode.gain, b, e, g);
                    this.SetAudioParam(this._dryNode.gain, 1 - b, e, g);
                    break;
                case 1:
                    this._params[1] = b;
                    this.SetAudioParam(this._filterNode.frequency, b, e, g);
                    break;
                case 2:
                    this._params[2] = b;
                    this.SetAudioParam(this._filterNode.detune, b, e, g);
                    break;
                case 3:
                    this._params[3] = b;
                    this.SetAudioParam(this._filterNode.Q,
                        b, e, g);
                    break;
                case 4:
                    this._params[4] = b, this.SetAudioParam(this._filterNode.gain, b, e, g)
            }
        }
    };
    self.C3AudioDelayFX = class extends d {
        constructor(a, b, e, g) {
            super(a);
            this._type = "delay";
            this._params = [b, e, g];
            this._inputNode = this.CreateGain();
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value = g;
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - g;
            this._mainNode = this.CreateGain();
            this._delayNode = this._audioContext.createDelay(b);
            this._delayNode.delayTime.value = b;
            this._delayGainNode = this.CreateGain();
            this._delayGainNode.gain.value = e;
            this._inputNode.connect(this._mainNode);
            this._inputNode.connect(this._dryNode);
            this._mainNode.connect(this._wetNode);
            this._mainNode.connect(this._delayNode);
            this._delayNode.connect(this._delayGainNode);
            this._delayGainNode.connect(this._mainNode)
        }
        Release() {
            this._inputNode.disconnect();
            this._wetNode.disconnect();
            this._dryNode.disconnect();
            this._mainNode.disconnect();
            this._delayNode.disconnect();
            this._delayGainNode.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a, b, e, g) {
            const m = self.AudioDOMHandler.DbToLinear;
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this._params[2] = b;
                    this.SetAudioParam(this._wetNode.gain, b, e, g);
                    this.SetAudioParam(this._dryNode.gain, 1 - b, e, g);
                    break;
                case 4:
                    this._params[1] = m(b);
                    this.SetAudioParam(this._delayGainNode.gain, m(b), e, g);
                    break;
                case 5:
                    this._params[0] = b, this.SetAudioParam(this._delayNode.delayTime, b, e, g)
            }
        }
    };
    self.C3AudioConvolveFX = class extends d {
        constructor(a, b, e, g) {
            super(a);
            this._type = "convolution";
            this._params = [e, g];
            this._bufferType = this._bufferUrl = this._bufferOriginalUrl = "";
            this._inputNode = this.CreateGain();
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value = g;
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - g;
            this._convolveNode = this._audioContext.createConvolver();
            this._convolveNode.normalize = e;
            this._convolveNode.buffer = b;
            this._inputNode.connect(this._convolveNode);
            this._inputNode.connect(this._dryNode);
            this._convolveNode.connect(this._wetNode)
        }
        Release() {
            this._inputNode.disconnect();
            this._convolveNode.disconnect();
            this._wetNode.disconnect();
            this._dryNode.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a, b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0), this._params[1] = b, this.SetAudioParam(this._wetNode.gain, b, e, g), this.SetAudioParam(this._dryNode.gain,
                        1 - b, e, g)
            }
        }
        _SetBufferInfo(a, b, e) {
            this._bufferOriginalUrl = a;
            this._bufferUrl = b;
            this._bufferType = e
        }
        GetState() {
            const a = super.GetState();
            a.bufferOriginalUrl = this._bufferOriginalUrl;
            a.bufferUrl = "";
            a.bufferType = this._bufferType;
            return a
        }
    };
    self.C3AudioFlangerFX = class extends d {
        constructor(a, b, e, g, m, n) {
            super(a);
            this._type = "flanger";
            this._params = [b, e, g, m, n];
            this._inputNode = this.CreateGain();
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - n / 2;
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value =
                n / 2;
            this._feedbackNode = this.CreateGain();
            this._feedbackNode.gain.value = m;
            this._delayNode = this._audioContext.createDelay(b + e);
            this._delayNode.delayTime.value = b;
            this._oscNode = this._audioContext.createOscillator();
            this._oscNode.frequency.value = g;
            this._oscGainNode = this.CreateGain();
            this._oscGainNode.gain.value = e;
            this._inputNode.connect(this._delayNode);
            this._inputNode.connect(this._dryNode);
            this._delayNode.connect(this._wetNode);
            this._delayNode.connect(this._feedbackNode);
            this._feedbackNode.connect(this._delayNode);
            this._oscNode.connect(this._oscGainNode);
            this._oscGainNode.connect(this._delayNode.delayTime);
            this._oscNode.start(0)
        }
        Release() {
            this._oscNode.stop(0);
            this._inputNode.disconnect();
            this._delayNode.disconnect();
            this._oscNode.disconnect();
            this._oscGainNode.disconnect();
            this._dryNode.disconnect();
            this._wetNode.disconnect();
            this._feedbackNode.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a,
            b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this._params[4] = b;
                    this.SetAudioParam(this._wetNode.gain, b / 2, e, g);
                    this.SetAudioParam(this._dryNode.gain, 1 - b / 2, e, g);
                    break;
                case 6:
                    this._params[1] = b / 1E3;
                    this.SetAudioParam(this._oscGainNode.gain, b / 1E3, e, g);
                    break;
                case 7:
                    this._params[2] = b;
                    this.SetAudioParam(this._oscNode.frequency, b, e, g);
                    break;
                case 8:
                    this._params[3] = b / 100, this.SetAudioParam(this._feedbackNode.gain, b / 100, e, g)
            }
        }
    };
    self.C3AudioPhaserFX = class extends d {
        constructor(a, b, e, g, m, n, v) {
            super(a);
            this._type = "phaser";
            this._params = [b, e, g, m, n, v];
            this._inputNode = this.CreateGain();
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - v / 2;
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value = v / 2;
            this._filterNode = this._audioContext.createBiquadFilter();
            this._filterNode.type = "allpass";
            this._filterNode.frequency.value = b;
            this._filterNode.detune.value = e;
            this._filterNode.Q.value = g;
            this._oscNode = this._audioContext.createOscillator();
            this._oscNode.frequency.value = n;
            this._oscGainNode = this.CreateGain();
            this._oscGainNode.gain.value = m;
            this._inputNode.connect(this._filterNode);
            this._inputNode.connect(this._dryNode);
            this._filterNode.connect(this._wetNode);
            this._oscNode.connect(this._oscGainNode);
            this._oscGainNode.connect(this._filterNode.frequency);
            this._oscNode.start(0)
        }
        Release() {
            this._oscNode.stop(0);
            this._inputNode.disconnect();
            this._filterNode.disconnect();
            this._oscNode.disconnect();
            this._oscGainNode.disconnect();
            this._dryNode.disconnect();
            this._wetNode.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a, b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this._params[5] = b;
                    this.SetAudioParam(this._wetNode.gain, b / 2, e, g);
                    this.SetAudioParam(this._dryNode.gain, 1 - b / 2, e, g);
                    break;
                case 1:
                    this._params[0] = b;
                    this.SetAudioParam(this._filterNode.frequency, b, e, g);
                    break;
                case 2:
                    this._params[1] = b;
                    this.SetAudioParam(this._filterNode.detune, b, e, g);
                    break;
                case 3:
                    this._params[2] = b;
                    this.SetAudioParam(this._filterNode.Q,
                        b, e, g);
                    break;
                case 6:
                    this._params[3] = b;
                    this.SetAudioParam(this._oscGainNode.gain, b, e, g);
                    break;
                case 7:
                    this._params[4] = b, this.SetAudioParam(this._oscNode.frequency, b, e, g)
            }
        }
    };
    self.C3AudioGainFX = class extends d {
        constructor(a, b) {
            super(a);
            this._type = "gain";
            this._params = [b];
            this._node = this.CreateGain();
            this._node.gain.value = b
        }
        Release() {
            this._node.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._node.disconnect();
            this._node.connect(a)
        }
        GetInputNode() {
            return this._node
        }
        SetParam(a, b, e, g) {
            const m = self.AudioDOMHandler.DbToLinear;
            switch (a) {
                case 4:
                    this._params[0] = m(b), this.SetAudioParam(this._node.gain, m(b), e, g)
            }
        }
    };
    self.C3AudioTremoloFX = class extends d {
        constructor(a, b, e) {
            super(a);
            this._type = "tremolo";
            this._params = [b, e];
            this._node = this.CreateGain();
            this._node.gain.value = 1 - e / 2;
            this._oscNode = this._audioContext.createOscillator();
            this._oscNode.frequency.value = b;
            this._oscGainNode = this.CreateGain();
            this._oscGainNode.gain.value = e / 2;
            this._oscNode.connect(this._oscGainNode);
            this._oscGainNode.connect(this._node.gain);
            this._oscNode.start(0)
        }
        Release() {
            this._oscNode.stop(0);
            this._oscNode.disconnect();
            this._oscGainNode.disconnect();
            this._node.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._node.disconnect();
            this._node.connect(a)
        }
        GetInputNode() {
            return this._node
        }
        SetParam(a, b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this._params[1] = b;
                    this.SetAudioParam(this._node.gain, 1 - b / 2, e, g);
                    this.SetAudioParam(this._oscGainNode.gain, b / 2, e, g);
                    break;
                case 7:
                    this._params[0] = b, this.SetAudioParam(this._oscNode.frequency, b, e, g)
            }
        }
    };
    self.C3AudioRingModFX = class extends d {
        constructor(a,
            b, e) {
            super(a);
            this._type = "ringmod";
            this._params = [b, e];
            this._inputNode = this.CreateGain();
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value = e;
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - e;
            this._ringNode = this.CreateGain();
            this._ringNode.gain.value = 0;
            this._oscNode = this._audioContext.createOscillator();
            this._oscNode.frequency.value = b;
            this._oscNode.connect(this._ringNode.gain);
            this._oscNode.start(0);
            this._inputNode.connect(this._ringNode);
            this._inputNode.connect(this._dryNode);
            this._ringNode.connect(this._wetNode)
        }
        Release() {
            this._oscNode.stop(0);
            this._oscNode.disconnect();
            this._ringNode.disconnect();
            this._inputNode.disconnect();
            this._wetNode.disconnect();
            this._dryNode.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a, b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b / 100, 1), 0);
                    this._params[1] = b;
                    this.SetAudioParam(this._wetNode.gain, b, e, g);
                    this.SetAudioParam(this._dryNode.gain, 1 - b, e, g);
                    break;
                case 7:
                    this._params[0] =
                        b, this.SetAudioParam(this._oscNode.frequency, b, e, g)
            }
        }
    };
    self.C3AudioDistortionFX = class extends d {
        constructor(a, b, e, g, m, n) {
            super(a);
            this._type = "distortion";
            this._params = [b, e, g, m, n];
            this._inputNode = this.CreateGain();
            this._preGain = this.CreateGain();
            this._postGain = this.CreateGain();
            this._SetDrive(g, m);
            this._wetNode = this.CreateGain();
            this._wetNode.gain.value = n;
            this._dryNode = this.CreateGain();
            this._dryNode.gain.value = 1 - n;
            this._waveShaper = this._audioContext.createWaveShaper();
            this._curve = new Float32Array(65536);
            this._GenerateColortouchCurve(b, e);
            this._waveShaper.curve = this._curve;
            this._inputNode.connect(this._preGain);
            this._inputNode.connect(this._dryNode);
            this._preGain.connect(this._waveShaper);
            this._waveShaper.connect(this._postGain);
            this._postGain.connect(this._wetNode)
        }
        Release() {
            this._inputNode.disconnect();
            this._preGain.disconnect();
            this._waveShaper.disconnect();
            this._postGain.disconnect();
            this._wetNode.disconnect();
            this._dryNode.disconnect();
            super.Release()
        }
        _SetDrive(a, b) {
            .01 > a && (a = .01);
            this._preGain.gain.value =
                a;
            this._postGain.gain.value = Math.pow(1 / a, .6) * b
        }
        _GenerateColortouchCurve(a, b) {
            for (let e = 0; 32768 > e; ++e) {
                let g = e / 32768;
                g = this._Shape(g, a, b);
                this._curve[32768 + e] = g;
                this._curve[32768 - e - 1] = -g
            }
        }
        _Shape(a, b, e) {
            e = 1.05 * e * b - b;
            const g = 0 > a ? -1 : 1;
            a = 0 > a ? -a : a;
            return (a < b ? a : b + e * self.AudioDOMHandler.e4(a - b, 1 / e)) * g
        }
        ConnectTo(a) {
            this._wetNode.disconnect();
            this._wetNode.connect(a);
            this._dryNode.disconnect();
            this._dryNode.connect(a)
        }
        GetInputNode() {
            return this._inputNode
        }
        SetParam(a, b, e, g) {
            switch (a) {
                case 0:
                    b = Math.max(Math.min(b /
                        100, 1), 0), this._params[4] = b, this.SetAudioParam(this._wetNode.gain, b, e, g), this.SetAudioParam(this._dryNode.gain, 1 - b, e, g)
            }
        }
    };
    self.C3AudioCompressorFX = class extends d {
        constructor(a, b, e, g, m, n) {
            super(a);
            this._type = "compressor";
            this._params = [b, e, g, m, n];
            this._node = this._audioContext.createDynamicsCompressor();
            this._node.threshold.value = b;
            this._node.knee.value = e;
            this._node.ratio.value = g;
            this._node.attack.value = m;
            this._node.release.value = n
        }
        Release() {
            this._node.disconnect();
            super.Release()
        }
        ConnectTo(a) {
            this._node.disconnect();
            this._node.connect(a)
        }
        GetInputNode() {
            return this._node
        }
        SetParam(a, b, e, g) {}
    };
    self.C3AudioAnalyserFX = class extends d {
        constructor(a, b, e) {
            super(a);
            this._type = "analyser";
            this._params = [b, e];
            this._node = this._audioContext.createAnalyser();
            this._node.fftSize = b;
            this._node.smoothingTimeConstant = e;
            this._freqBins = new Float32Array(this._node.frequencyBinCount);
            this._signal = new Uint8Array(b);
            this._rms = this._peak = 0;
            this._audioDomHandler._AddAnalyser(this)
        }
        Release() {
            this._audioDomHandler._RemoveAnalyser(this);
            this._node.disconnect();
            super.Release()
        }
        Tick() {
            this._node.getFloatFrequencyData(this._freqBins);
            this._node.getByteTimeDomainData(this._signal);
            const a = this._node.fftSize;
            let b = this._peak = 0;
            for (var e = 0; e < a; ++e) {
                let g = (this._signal[e] - 128) / 128;
                0 > g && (g = -g);
                this._peak < g && (this._peak = g);
                b += g * g
            }
            e = self.AudioDOMHandler.LinearToDb;
            this._peak = e(this._peak);
            this._rms = e(Math.sqrt(b / a))
        }
        ConnectTo(a) {
            this._node.disconnect();
            this._node.connect(a)
        }
        GetInputNode() {
            return this._node
        }
        SetParam(a, b, e, g) {}
        GetData() {
            return {
                tag: this.GetTag(),
                index: this.GetIndex(),
                peak: this._peak,
                rms: this._rms,
                binCount: this._node.frequencyBinCount,
                freqBins: this._freqBins
            }
        }
    }
};