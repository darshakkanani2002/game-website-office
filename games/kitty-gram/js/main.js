/*
 TweenJS
 Visit http://createjs.com/ for documentation, updates and examples.

 Copyright (c) 2010 gskinner.com, inc.

 Permission is hereby granted, free of charge, to any person
 obtaining a copy of this software and associated documentation
 files (the "Software"), to deal in the Software without
 restriction, including without limitation the rights to use,
 copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the
 Software is furnished to do so, subject to the following
 conditions:

 The above copyright notice and this permission notice shall be
 included in all copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 OTHER DEALINGS IN THE SOFTWARE.
 Platform.js <https://mths.be/platform>
 Copyright 2014-2018 Benjamin Tan <https://bnjmnt4n.now.sh/>
 Copyright 2011-2013 John-David Dalton
 Available under MIT license <https://mths.be/mit>
*/
this.createjs = this.createjs || {};
createjs.extend = function(a, c) {
    function b() {
        this.constructor = a
    }
    b.prototype = c.prototype;
    return a.prototype = new b
};
this.createjs = this.createjs || {};
createjs.promote = function(a, c) {
    var b = a.prototype,
        d = Object.getPrototypeOf && Object.getPrototypeOf(b) || b.__proto__;
    if (d) {
        b[(c += "_") + "constructor"] = d.constructor;
        for (var e in d) b.hasOwnProperty(e) && "function" == typeof d[e] && (b[c + e] = d[e])
    }
    return a
};
this.createjs = this.createjs || {};
createjs.deprecate = function(a, c) {
    return function() {
        var b = "Deprecated property or method '" + c + "'. See docs for info.";
        console && (console.warn ? console.warn(b) : console.log(b));
        return a && a.apply(this, arguments)
    }
};
this.createjs = this.createjs || {};
(function() {
    function a(b, d, e) {
        this.type = b;
        this.currentTarget = this.target = null;
        this.eventPhase = 0;
        this.bubbles = !!d;
        this.cancelable = !!e;
        this.timeStamp = (new Date).getTime();
        this.removed = this.immediatePropagationStopped = this.propagationStopped = this.defaultPrevented = !1
    }
    var c = a.prototype;
    c.preventDefault = function() {
        this.defaultPrevented = this.cancelable && !0
    };
    c.stopPropagation = function() {
        this.propagationStopped = !0
    };
    c.stopImmediatePropagation = function() {
        this.immediatePropagationStopped = this.propagationStopped = !0
    };
    c.remove = function() {
        this.removed = !0
    };
    c.clone = function() {
        return new a(this.type, this.bubbles, this.cancelable)
    };
    c.set = function(b) {
        for (var d in b) this[d] = b[d];
        return this
    };
    c.toString = function() {
        return "[Event (type=" + this.type + ")]"
    };
    createjs.Event = a
})();
this.createjs = this.createjs || {};
(function() {
    function a() {
        this._captureListeners = this._listeners = null
    }
    var c = a.prototype;
    a.initialize = function(b) {
        b.addEventListener = c.addEventListener;
        b.on = c.on;
        b.removeEventListener = b.off = c.removeEventListener;
        b.removeAllEventListeners = c.removeAllEventListeners;
        b.hasEventListener = c.hasEventListener;
        b.dispatchEvent = c.dispatchEvent;
        b._dispatchEvent = c._dispatchEvent;
        b.willTrigger = c.willTrigger
    };
    c.addEventListener = function(b, d, e) {
        var f = e ? this._captureListeners = this._captureListeners || {} : this._listeners = this._listeners || {};
        var g = f[b];
        g && this.removeEventListener(b, d, e);
        (g = f[b]) ? g.push(d): f[b] = [d];
        return d
    };
    c.on = function(b, d, e, f, g, h) {
        d.handleEvent && (e = e || d, d = d.handleEvent);
        e = e || this;
        return this.addEventListener(b, function(k) {
            d.call(e, k, g);
            f && k.remove()
        }, h)
    };
    c.removeEventListener = function(b, d, e) {
        if (e = e ? this._captureListeners : this._listeners) {
            var f = e[b];
            if (f)
                for (var g = 0, h = f.length; g < h; g++)
                    if (f[g] == d) {
                        1 == h ? delete e[b] : f.splice(g, 1);
                        break
                    }
        }
    };
    c.off = c.removeEventListener;
    c.removeAllEventListeners = function(b) {
        b ? (this._listeners && delete this._listeners[b], this._captureListeners && delete this._captureListeners[b]) : this._listeners = this._captureListeners = null
    };
    c.dispatchEvent = function(b, d, e) {
        if ("string" == typeof b) {
            var f = this._listeners;
            if (!(d || f && f[b])) return !0;
            b = new createjs.Event(b, d, e)
        } else b.target && b.clone && (b = b.clone());
        try {
            b.target = this
        } catch (g) {}
        if (b.bubbles && this.parent) {
            e = this;
            for (d = [e]; e.parent;) d.push(e = e.parent);
            f = d.length;
            for (e = f - 1; 0 <= e && !b.propagationStopped; e--) d[e]._dispatchEvent(b, 1 + (0 == e));
            for (e = 1; e < f && !b.propagationStopped; e++) d[e]._dispatchEvent(b, 3)
        } else this._dispatchEvent(b, 2);
        return !b.defaultPrevented
    };
    c.hasEventListener = function(b) {
        var d = this._listeners,
            e = this._captureListeners;
        return !!(d && d[b] || e && e[b])
    };
    c.willTrigger = function(b) {
        for (var d = this; d;) {
            if (d.hasEventListener(b)) return !0;
            d = d.parent
        }
        return !1
    };
    c.toString = function() {
        return "[EventDispatcher]"
    };
    c._dispatchEvent = function(b, d) {
        var e, f, g = 2 >= d ? this._captureListeners : this._listeners;
        if (b && g && (f = g[b.type]) && (e = f.length)) {
            try {
                b.currentTarget = this
            } catch (k) {}
            try {
                b.eventPhase = d | 0
            } catch (k) {}
            b.removed = !1;
            f = f.slice();
            for (g = 0; g < e && !b.immediatePropagationStopped; g++) {
                var h = f[g];
                h.handleEvent ? h.handleEvent(b) : h(b);
                b.removed && (this.off(b.type, h, 1 == d), b.removed = !1)
            }
        }
        2 === d && this._dispatchEvent(b, 2.1)
    };
    createjs.EventDispatcher = a
})();
this.createjs = this.createjs || {};
(function() {
    function a() {
        throw "Ticker cannot be instantiated.";
    }
    a.RAF_SYNCHED = "synched";
    a.RAF = "raf";
    a.TIMEOUT = "timeout";
    a.timingMode = null;
    a.maxDelta = 0;
    a.paused = !1;
    a.removeEventListener = null;
    a.removeAllEventListeners = null;
    a.dispatchEvent = null;
    a.hasEventListener = null;
    a._listeners = null;
    createjs.EventDispatcher.initialize(a);
    a._addEventListener = a.addEventListener;
    a.addEventListener = function() {
        !a._inited && a.init();
        return a._addEventListener.apply(a, arguments)
    };
    a._inited = !1;
    a._startTime = 0;
    a._pausedTime = 0;
    a._ticks = 0;
    a._pausedTicks = 0;
    a._interval = 50;
    a._lastTime = 0;
    a._times = null;
    a._tickTimes = null;
    a._timerId = null;
    a._raf = !0;
    a._setInterval = function(d) {
        a._interval = d;
        a._inited && a._setupTick()
    };
    a.setInterval = createjs.deprecate(a._setInterval, "Ticker.setInterval");
    a._getInterval = function() {
        return a._interval
    };
    a.getInterval = createjs.deprecate(a._getInterval, "Ticker.getInterval");
    a._setFPS = function(d) {
        a._setInterval(1E3 / d)
    };
    a.setFPS = createjs.deprecate(a._setFPS, "Ticker.setFPS");
    a._getFPS = function() {
        return 1E3 / a._interval
    };
    a.getFPS = createjs.deprecate(a._getFPS, "Ticker.getFPS");
    try {
        Object.defineProperties(a, {
            interval: {
                get: a._getInterval,
                set: a._setInterval
            },
            framerate: {
                get: a._getFPS,
                set: a._setFPS
            }
        })
    } catch (d) {
        console.log(d)
    }
    a.init = function() {
        a._inited || (a._inited = !0, a._times = [], a._tickTimes = [], a._startTime = a._getTime(), a._times.push(a._lastTime = 0), a.interval = a._interval)
    };
    a.reset = function() {
        if (a._raf) {
            var d = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame;
            d && d(a._timerId)
        } else clearTimeout(a._timerId);
        a.removeAllEventListeners("tick");
        a._timerId = a._times = a._tickTimes = null;
        a._startTime = a._lastTime = a._ticks = a._pausedTime = 0;
        a._inited = !1
    };
    a.getMeasuredTickTime = function(d) {
        var e = 0,
            f = a._tickTimes;
        if (!f || 1 > f.length) return -1;
        d = Math.min(f.length, d || a._getFPS() | 0);
        for (var g = 0; g < d; g++) e += f[g];
        return e / d
    };
    a.getMeasuredFPS = function(d) {
        var e = a._times;
        if (!e || 2 > e.length) return -1;
        d = Math.min(e.length - 1, d || a._getFPS() | 0);
        return 1E3 / ((e[0] - e[d]) / d)
    };
    a.getTime = function(d) {
        return a._startTime ? a._getTime() - (d ? a._pausedTime : 0) : -1
    };
    a.getEventTime = function(d) {
        return a._startTime ? (a._lastTime || a._startTime) - (d ? a._pausedTime : 0) : -1
    };
    a.getTicks = function(d) {
        return a._ticks - (d ? a._pausedTicks : 0)
    };
    a._handleSynch = function() {
        a._timerId = null;
        a._setupTick();
        a._getTime() - a._lastTime >= .97 * (a._interval - 1) && a._tick()
    };
    a._handleRAF = function() {
        a._timerId = null;
        a._setupTick();
        a._tick()
    };
    a._handleTimeout = function() {
        a._timerId = null;
        a._setupTick();
        a._tick()
    };
    a._setupTick = function() {
        if (null == a._timerId) {
            var d = a.timingMode;
            if (d == a.RAF_SYNCHED || d == a.RAF) {
                var e = window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame;
                if (e) {
                    a._timerId = e(d == a.RAF ? a._handleRAF : a._handleSynch);
                    a._raf = !0;
                    return
                }
            }
            a._raf = !1;
            a._timerId = setTimeout(a._handleTimeout, a._interval)
        }
    };
    a._tick = function() {
        var d = a.paused,
            e = a._getTime(),
            f = e - a._lastTime;
        a._lastTime = e;
        a._ticks++;
        d && (a._pausedTicks++, a._pausedTime += f);
        if (a.hasEventListener("tick")) {
            var g = new createjs.Event("tick"),
                h = a.maxDelta;
            g.delta = h && f > h ? h : f;
            g.paused = d;
            g.time = e;
            g.runTime = e - a._pausedTime;
            a.dispatchEvent(g)
        }
        for (a._tickTimes.unshift(a._getTime() - e); 100 < a._tickTimes.length;) a._tickTimes.pop();
        for (a._times.unshift(e); 100 < a._times.length;) a._times.pop()
    };
    var c = window,
        b = c.performance.now || c.performance.mozNow || c.performance.msNow || c.performance.oNow || c.performance.webkitNow;
    a._getTime = function() {
        return (b && b.call(c.performance) || (new Date).getTime()) - a._startTime
    };
    createjs.Ticker = a
})();
this.createjs = this.createjs || {};
(function() {
    function a(b) {
        this.EventDispatcher_constructor();
        this.ignoreGlobalPause = !1;
        this.loop = 0;
        this.bounce = this.reversed = this.useTicks = !1;
        this.timeScale = 1;
        this.position = this.duration = 0;
        this.rawPosition = -1;
        this._paused = !0;
        this._labelList = this._labels = this._parent = this._prev = this._next = null;
        b && (this.useTicks = !!b.useTicks, this.ignoreGlobalPause = !!b.ignoreGlobalPause, this.loop = !0 === b.loop ? -1 : b.loop || 0, this.reversed = !!b.reversed, this.bounce = !!b.bounce, this.timeScale = b.timeScale || 1, b.onChange && this.addEventListener("change", b.onChange), b.onComplete && this.addEventListener("complete", b.onComplete))
    }
    var c = createjs.extend(a, createjs.EventDispatcher);
    c._setPaused = function(b) {
        createjs.Tween._register(this, b);
        return this
    };
    c.setPaused = createjs.deprecate(c._setPaused, "AbstractTween.setPaused");
    c._getPaused = function() {
        return this._paused
    };
    c.getPaused = createjs.deprecate(c._getPaused, "AbstactTween.getPaused");
    c._getCurrentLabel = function(b) {
        var d = this.getLabels();
        null == b && (b = this.position);
        for (var e = 0, f = d.length; e < f && !(b < d[e].position); e++);
        return 0 === e ? null : d[e - 1].label
    };
    c.getCurrentLabel = createjs.deprecate(c._getCurrentLabel, "AbstractTween.getCurrentLabel");
    try {
        Object.defineProperties(c, {
            paused: {
                set: c._setPaused,
                get: c._getPaused
            },
            currentLabel: {
                get: c._getCurrentLabel
            }
        })
    } catch (b) {}
    c.advance = function(b, d) {
        this.setPosition(this.rawPosition + b * this.timeScale, d)
    };
    c.setPosition = function(b, d, e, f) {
        var g = this.duration,
            h = this.loop,
            k = this.rawPosition,
            l = 0;
        0 > b && (b = 0);
        if (0 === g) {
            var p = !0;
            if (-1 !== k) return p
        } else {
            var n = b / g | 0;
            l = b - n * g;
            (p = -1 !== h && b >= h * g + g) && (b = (l = g) * (n = h) + g);
            if (b === k) return p;
            !this.reversed !== !(this.bounce && n % 2) && (l = g - l)
        }
        this.position = l;
        this.rawPosition = b;
        this._updatePosition(e, p);
        p && (this.paused = !0);
        f && f(this);
        d || this._runActions(k, b, e, !e && -1 === k);
        this.dispatchEvent("change");
        p && this.dispatchEvent("complete")
    };
    c.calculatePosition = function(b) {
        var d = this.duration,
            e = this.loop,
            f = 0;
        if (0 === d) return 0; - 1 !== e && b >= e * d + d ? (b = d, f = e) : 0 > b ? b = 0 : (f = b / d | 0, b -= f * d);
        return !this.reversed !== !(this.bounce && f % 2) ? d - b : b
    };
    c.getLabels = function() {
        var b = this._labelList;
        if (!b) {
            b = this._labelList = [];
            var d = this._labels,
                e;
            for (e in d) b.push({
                label: e,
                position: d[e]
            });
            b.sort(function(f, g) {
                return f.position - g.position
            })
        }
        return b
    };
    c.setLabels = function(b) {
        this._labels = b;
        this._labelList = null
    };
    c.addLabel = function(b, d) {
        this._labels || (this._labels = {});
        this._labels[b] = d;
        var e = this._labelList;
        if (e) {
            for (var f = 0, g = e.length; f < g && !(d < e[f].position); f++);
            e.splice(f, 0, {
                label: b,
                position: d
            })
        }
    };
    c.gotoAndPlay = function(b) {
        this.paused = !1;
        this._goto(b)
    };
    c.gotoAndStop = function(b) {
        this.paused = !0;
        this._goto(b)
    };
    c.resolve = function(b) {
        var d = Number(b);
        isNaN(d) && (d = this._labels && this._labels[b]);
        return d
    };
    c.toString = function() {
        return "[AbstractTween]"
    };
    c.clone = function() {
        throw "AbstractTween can not be cloned.";
    };
    c._init = function(b) {
        b && b.paused || (this.paused = !1);
        b && null != b.position && this.setPosition(b.position)
    };
    c._updatePosition = function(b, d) {};
    c._goto = function(b) {
        b = this.resolve(b);
        null != b && this.setPosition(b, !1, !0)
    };
    c._runActions = function(b, d, e, f) {
        if (this._actionHead || this.tweens) {
            var g = this.duration,
                h = this.reversed,
                k = this.bounce,
                l = this.loop,
                p, n, u;
            if (0 === g) {
                var x = p = n = u = 0;
                h = k = !1
            } else x = b / g | 0, p = d / g | 0, n = b - x * g, u = d - p * g; - 1 !== l && (p > l && (u = g, p = l), x > l && (n = g, x = l));
            if (e) return this._runActionsRange(u, u, e, f);
            if (x !== p || n !== u || e || f) {
                -1 === x && (x = n = 0);
                b = b <= d;
                d = x;
                do {
                    l = d === x ? n : b ? 0 : g;
                    var q = d === p ? u : b ? g : 0;
                    !h !== !(k && d % 2) && (l = g - l, q = g - q);
                    if ((!k || d === x || l !== q) && this._runActionsRange(l, q, e, f || d !== x && !k)) return !0;
                    f = !1
                } while (b && ++d <= p || !b && --d >= p)
            }
        }
    };
    c._runActionsRange = function(b, d, e, f) {};
    createjs.AbstractTween = createjs.promote(a, "EventDispatcher")
})();
this.createjs = this.createjs || {};
(function() {
    function a(e, f) {
        this.AbstractTween_constructor(f);
        this.pluginData = null;
        this.target = e;
        this.passive = !1;
        this._stepTail = this._stepHead = new c(null, 0, 0, {}, null, !0);
        this._stepPosition = 0;
        this._injected = this._pluginIds = this._plugins = this._actionTail = this._actionHead = null;
        f && (this.pluginData = f.pluginData, f.override && a.removeTweens(e));
        this.pluginData || (this.pluginData = {});
        this._init(f)
    }

    function c(e, f, g, h, k, l) {
        this.next = null;
        this.prev = e;
        this.t = f;
        this.d = g;
        this.props = h;
        this.ease = k;
        this.passive = l;
        this.index = e ? e.index + 1 : 0
    }

    function b(e, f, g, h, k) {
        this.next = null;
        this.prev = e;
        this.t = f;
        this.d = 0;
        this.scope = g;
        this.funct = h;
        this.params = k
    }
    var d = createjs.extend(a, createjs.AbstractTween);
    a.IGNORE = {};
    a._tweens = [];
    a._plugins = null;
    a._tweenHead = null;
    a._tweenTail = null;
    a.get = function(e, f) {
        return new a(e, f)
    };
    a.tick = function(e, f) {
        for (var g = a._tweenHead; g;) {
            var h = g._next;
            f && !g.ignoreGlobalPause || g._paused || g.advance(g.useTicks ? 1 : e);
            g = h
        }
    };
    a.handleEvent = function(e) {
        "tick" === e.type && this.tick(e.delta, e.paused)
    };
    a.removeTweens = function(e) {
        if (e.tweenjs_count) {
            for (var f = a._tweenHead; f;) {
                var g = f._next;
                f.target === e && a._register(f, !0);
                f = g
            }
            e.tweenjs_count = 0
        }
    };
    a.removeAllTweens = function() {
        for (var e = a._tweenHead; e;) {
            var f = e._next;
            e._paused = !0;
            e.target && (e.target.tweenjs_count = 0);
            e._next = e._prev = null;
            e = f
        }
        a._tweenHead = a._tweenTail = null
    };
    a.hasActiveTweens = function(e) {
        return e ? !!e.tweenjs_count : !!a._tweenHead
    };
    a._installPlugin = function(e) {
        for (var f = e.priority = e.priority || 0, g = a._plugins = a._plugins || [], h = 0, k = g.length; h < k && !(f < g[h].priority); h++);
        g.splice(h, 0, e)
    };
    a._register = function(e, f) {
        var g = e.target;
        if (!f && e._paused) g && (g.tweenjs_count = g.tweenjs_count ? g.tweenjs_count + 1 : 1), (g = a._tweenTail) ? (a._tweenTail = g._next = e, e._prev = g) : a._tweenHead = a._tweenTail = e, !a._inited && createjs.Ticker && (createjs.Ticker.addEventListener("tick", a), a._inited = !0);
        else if (f && !e._paused) {
            g && g.tweenjs_count--;
            g = e._next;
            var h = e._prev;
            g ? g._prev = h : a._tweenTail = h;
            h ? h._next = g : a._tweenHead = g;
            e._next = e._prev = null
        }
        e._paused = f
    };
    d.wait = function(e, f) {
        0 < e && this._addStep(+e, this._stepTail.props, null, f);
        return this
    };
    d.to = function(e, f, g) {
        if (null == f || 0 > f) f = 0;
        f = this._addStep(+f, null, g);
        this._appendProps(e, f);
        return this
    };
    d.label = function(e) {
        this.addLabel(e, this.duration);
        return this
    };
    d.call = function(e, f, g) {
        return this._addAction(g || this.target, e, f || [this])
    };
    d.set = function(e, f) {
        return this._addAction(f || this.target, this._set, [e])
    };
    d.play = function(e) {
        return this._addAction(e || this, this._set, [{
            paused: !1
        }])
    };
    d.pause = function(e) {
        return this._addAction(e || this, this._set, [{
            paused: !0
        }])
    };
    d.w = d.wait;
    d.t = d.to;
    d.c = d.call;
    d.s = d.set;
    d.toString = function() {
        return "[Tween]"
    };
    d.clone = function() {
        throw "Tween can not be cloned.";
    };
    d._addPlugin = function(e) {
        var f = this._pluginIds || (this._pluginIds = {}),
            g = e.ID;
        if (g && !f[g]) {
            f[g] = !0;
            f = this._plugins || (this._plugins = []);
            g = e.priority || 0;
            for (var h = 0, k = f.length; h < k; h++)
                if (g < f[h].priority) {
                    f.splice(h, 0, e);
                    return
                }
            f.push(e)
        }
    };
    d._updatePosition = function(e, f) {
        var g = this._stepHead.next,
            h = this.position,
            k = this.duration;
        if (this.target && g) {
            for (var l = g.next; l && l.t <= h;) g = g.next,
                l = g.next;
            this._updateTargetProps(g, f ? 0 === k ? 1 : h / k : (h - g.t) / g.d, f)
        }
        this._stepPosition = g ? h - g.t : 0
    };
    d._updateTargetProps = function(e, f, g) {
        if (!(this.passive = !!e.passive)) {
            var h, k = e.prev.props,
                l = e.props;
            if (h = e.ease) f = h(f, 0, 1, 1);
            h = this._plugins;
            var p;
            a: for (p in k) {
                var n = k[p];
                var u = l[p];
                n = n !== u && "number" === typeof n ? n + (u - n) * f : 1 <= f ? u : n;
                if (h) {
                    u = 0;
                    for (var x = h.length; u < x; u++) {
                        var q = h[u].change(this, e, p, n, f, g);
                        if (q === a.IGNORE) continue a;
                        void 0 !== q && (n = q)
                    }
                }
                this.target[p] = n
            }
        }
    };
    d._runActionsRange = function(e, f, g, h) {
        var k = (g = e > f) ? this._actionTail : this._actionHead,
            l = f,
            p = e;
        g && (l = e, p = f);
        for (var n = this.position; k;) {
            var u = k.t;
            if (u === f || u > p && u < l || h && u === e)
                if (k.funct.apply(k.scope, k.params), n !== this.position) return !0;
            k = g ? k.prev : k.next
        }
    };
    d._appendProps = function(e, f, g) {
        var h = this._stepHead.props,
            k = this.target,
            l = a._plugins,
            p, n, u = f.prev,
            x = u.props,
            q = f.props || (f.props = this._cloneProps(x)),
            A = {};
        for (p in e)
            if (e.hasOwnProperty(p) && (A[p] = q[p] = e[p], void 0 === h[p])) {
                var y = void 0;
                if (l)
                    for (n = l.length - 1; 0 <= n; n--) {
                        var C = l[n].init(this, p, y);
                        void 0 !== C && (y = C);
                        if (y === a.IGNORE) {
                            delete q[p];
                            delete A[p];
                            break
                        }
                    }
                y !== a.IGNORE && (void 0 === y && (y = k[p]), x[p] = void 0 === y ? null : y)
            }
        for (p in A) {
            var t;
            for (e = u;
                (t = e) && (e = t.prev);)
                if (e.props !== t.props) {
                    if (void 0 !== e.props[p]) break;
                    e.props[p] = x[p]
                }
        }
        if (!1 !== g && (l = this._plugins))
            for (n = l.length - 1; 0 <= n; n--) l[n].step(this, f, A);
        if (g = this._injected) this._injected = null, this._appendProps(g, f, !1)
    };
    d._injectProp = function(e, f) {
        (this._injected || (this._injected = {}))[e] = f
    };
    d._addStep = function(e, f, g, h) {
        f = new c(this._stepTail, this.duration, e, f, g, h || !1);
        this.duration += e;
        return this._stepTail = this._stepTail.next = f
    };
    d._addAction = function(e, f, g) {
        e = new b(this._actionTail, this.duration, e, f, g);
        this._actionTail ? this._actionTail.next = e : this._actionHead = e;
        this._actionTail = e;
        return this
    };
    d._set = function(e) {
        for (var f in e) this[f] = e[f]
    };
    d._cloneProps = function(e) {
        var f = {},
            g;
        for (g in e) f[g] = e[g];
        return f
    };
    createjs.Tween = createjs.promote(a, "AbstractTween")
})();
this.createjs = this.createjs || {};
(function() {
    function a(b) {
        if (b instanceof Array || null == b && 1 < arguments.length) {
            var d = b;
            var e = arguments[1];
            b = arguments[2]
        } else b && (d = b.tweens, e = b.labels);
        this.AbstractTween_constructor(b);
        this.tweens = [];
        d && this.addTween.apply(this, d);
        this.setLabels(e);
        this._init(b)
    }
    var c = createjs.extend(a, createjs.AbstractTween);
    c.addTween = function(b) {
        b._parent && b._parent.removeTween(b);
        var d = arguments.length;
        if (1 < d) {
            for (var e = 0; e < d; e++) this.addTween(arguments[e]);
            return arguments[d - 1]
        }
        if (0 === d) return null;
        this.tweens.push(b);
        b._parent = this;
        b.paused = !0;
        d = b.duration;
        0 < b.loop && (d *= b.loop + 1);
        d > this.duration && (this.duration = d);
        0 <= this.rawPosition && b.setPosition(this.rawPosition);
        return b
    };
    c.removeTween = function(b) {
        var d = arguments.length;
        if (1 < d) {
            for (var e = !0, f = 0; f < d; f++) e = e && this.removeTween(arguments[f]);
            return e
        }
        if (0 === d) return !0;
        d = this.tweens;
        for (f = d.length; f--;)
            if (d[f] === b) return d.splice(f, 1), b._parent = null, b.duration >= this.duration && this.updateDuration(), !0;
        return !1
    };
    c.updateDuration = function() {
        for (var b = this.duration = 0, d = this.tweens.length; b < d; b++) {
            var e = this.tweens[b],
                f = e.duration;
            0 < e.loop && (f *= e.loop + 1);
            f > this.duration && (this.duration = f)
        }
    };
    c.toString = function() {
        return "[Timeline]"
    };
    c.clone = function() {
        throw "Timeline can not be cloned.";
    };
    c._updatePosition = function(b, d) {
        for (var e = this.position, f = 0, g = this.tweens.length; f < g; f++) this.tweens[f].setPosition(e, !0, b)
    };
    c._runActionsRange = function(b, d, e, f) {
        for (var g = this.position, h = 0, k = this.tweens.length; h < k; h++)
            if (this.tweens[h]._runActions(b, d, e, f), g !== this.position) return !0
    };
    createjs.Timeline = createjs.promote(a, "AbstractTween")
})();
this.createjs = this.createjs || {};
(function() {
    function a() {
        throw "Ease cannot be instantiated.";
    }
    a.linear = function(c) {
        return c
    };
    a.none = a.linear;
    a.get = function(c) {
        -1 > c ? c = -1 : 1 < c && (c = 1);
        return function(b) {
            return 0 == c ? b : 0 > c ? b * (b * -c + 1 + c) : b * ((2 - b) * c + (1 - c))
        }
    };
    a.getPowIn = function(c) {
        return function(b) {
            return Math.pow(b, c)
        }
    };
    a.getPowOut = function(c) {
        return function(b) {
            return 1 - Math.pow(1 - b, c)
        }
    };
    a.getPowInOut = function(c) {
        return function(b) {
            return 1 > (b *= 2) ? .5 * Math.pow(b, c) : 1 - .5 * Math.abs(Math.pow(2 - b, c))
        }
    };
    a.quadIn = a.getPowIn(2);
    a.quadOut = a.getPowOut(2);
    a.quadInOut = a.getPowInOut(2);
    a.cubicIn = a.getPowIn(3);
    a.cubicOut = a.getPowOut(3);
    a.cubicInOut = a.getPowInOut(3);
    a.quartIn = a.getPowIn(4);
    a.quartOut = a.getPowOut(4);
    a.quartInOut = a.getPowInOut(4);
    a.quintIn = a.getPowIn(5);
    a.quintOut = a.getPowOut(5);
    a.quintInOut = a.getPowInOut(5);
    a.sineIn = function(c) {
        return 1 - Math.cos(c * Math.PI / 2)
    };
    a.sineOut = function(c) {
        return Math.sin(c * Math.PI / 2)
    };
    a.sineInOut = function(c) {
        return -.5 * (Math.cos(Math.PI * c) - 1)
    };
    a.getBackIn = function(c) {
        return function(b) {
            return b * b * ((c + 1) * b - c)
        }
    };
    a.backIn = a.getBackIn(1.7);
    a.getBackOut = function(c) {
        return function(b) {
            return --b * b * ((c + 1) * b + c) + 1
        }
    };
    a.backOut = a.getBackOut(1.7);
    a.getBackInOut = function(c) {
        c *= 1.525;
        return function(b) {
            return 1 > (b *= 2) ? .5 * b * b * ((c + 1) * b - c) : .5 * ((b -= 2) * b * ((c + 1) * b + c) + 2)
        }
    };
    a.backInOut = a.getBackInOut(1.7);
    a.circIn = function(c) {
        return -(Math.sqrt(1 - c * c) - 1)
    };
    a.circOut = function(c) {
        return Math.sqrt(1 - --c * c)
    };
    a.circInOut = function(c) {
        return 1 > (c *= 2) ? -.5 * (Math.sqrt(1 - c * c) - 1) : .5 * (Math.sqrt(1 - (c -= 2) * c) + 1)
    };
    a.bounceIn = function(c) {
        return 1 - a.bounceOut(1 - c)
    };
    a.bounceOut = function(c) {
        return c < 1 / 2.75 ? 7.5625 * c * c : c < 2 / 2.75 ? 7.5625 * (c -= 1.5 / 2.75) * c + .75 : c < 2.5 / 2.75 ? 7.5625 * (c -= 2.25 / 2.75) * c + .9375 : 7.5625 * (c -= 2.625 / 2.75) * c + .984375
    };
    a.bounceInOut = function(c) {
        return .5 > c ? .5 * a.bounceIn(2 * c) : .5 * a.bounceOut(2 * c - 1) + .5
    };
    a.getElasticIn = function(c, b) {
        var d = 2 * Math.PI;
        return function(e) {
            if (0 == e || 1 == e) return e;
            var f = b / d * Math.asin(1 / c);
            return -(c * Math.pow(2, 10 * --e) * Math.sin((e - f) * d / b))
        }
    };
    a.elasticIn = a.getElasticIn(1, .3);
    a.getElasticOut = function(c, b) {
        var d = 2 * Math.PI;
        return function(e) {
            return 0 == e || 1 == e ? e : c * Math.pow(2, -10 * e) * Math.sin((e - b / d * Math.asin(1 / c)) * d / b) + 1
        }
    };
    a.elasticOut = a.getElasticOut(1, .3);
    a.getElasticInOut = function(c, b) {
        var d = 2 * Math.PI;
        return function(e) {
            var f = b / d * Math.asin(1 / c);
            return 1 > (e *= 2) ? -.5 * c * Math.pow(2, 10 * --e) * Math.sin((e - f) * d / b) : c * Math.pow(2, -10 * --e) * Math.sin((e - f) * d / b) * .5 + 1
        }
    };
    a.elasticInOut = a.getElasticInOut(1, .3 * 1.5);
    createjs.Ease = a
})();
this.createjs = this.createjs || {};
(function() {
    function a() {
        throw "MotionGuidePlugin cannot be instantiated.";
    }
    a.priority = 0;
    a.ID = "MotionGuide";
    a.install = function() {
        createjs.Tween._installPlugin(a);
        return createjs.Tween.IGNORE
    };
    a.init = function(c, b, d) {
        "guide" == b && c._addPlugin(a)
    };
    a.step = function(c, b, d) {
        for (var e in d)
            if ("guide" === e) {
                var f = b.props.guide,
                    g = a._solveGuideData(d.guide, f);
                f.valid = !g;
                var h = f.endData;
                c._injectProp("x", h.x);
                c._injectProp("y", h.y);
                if (g || !f.orient) break;
                f.startOffsetRot = (void 0 === b.prev.props.rotation ? c.target.rotation || 0 : b.prev.props.rotation) - f.startData.rotation;
                if ("fixed" == f.orient) f.endAbsRot = h.rotation + f.startOffsetRot, f.deltaRotation = 0;
                else {
                    g = void 0 === d.rotation ? c.target.rotation || 0 : d.rotation;
                    h = g - f.endData.rotation - f.startOffsetRot;
                    var k = h % 360;
                    f.endAbsRot = g;
                    switch (f.orient) {
                        case "auto":
                            f.deltaRotation = h;
                            break;
                        case "cw":
                            f.deltaRotation = (k + 360) % 360 + 360 * Math.abs(h / 360 | 0);
                            break;
                        case "ccw":
                            f.deltaRotation = (k - 360) % 360 + -360 * Math.abs(h / 360 | 0)
                    }
                }
                c._injectProp("rotation", f.endAbsRot)
            }
    };
    a.change = function(c, b, d, e, f, g) {
        if ((e = b.props.guide) && b.props !== b.prev.props && e !== b.prev.props.guide) {
            if ("guide" === d && !e.valid || "x" == d || "y" == d || "rotation" === d && e.orient) return createjs.Tween.IGNORE;
            a._ratioToPositionData(f, e, c.target)
        }
    };
    a.debug = function(c, b, d) {
        c = c.guide || c;
        var e = a._findPathProblems(c);
        e && console.error("MotionGuidePlugin Error found: \n" + e);
        if (!b) return e;
        var f, g = c.path,
            h = g.length;
        b.save();
        b.lineCap = "round";
        b.lineJoin = "miter";
        b.beginPath();
        b.moveTo(g[0], g[1]);
        for (f = 2; f < h; f += 4) b.quadraticCurveTo(g[f], g[f + 1], g[f + 2], g[f + 3]);
        b.strokeStyle = "black";
        b.lineWidth = 4.5;
        b.stroke();
        b.strokeStyle = "white";
        b.lineWidth = 3;
        b.stroke();
        b.closePath();
        g = d.length;
        if (d && g) {
            h = {};
            var k = {};
            a._solveGuideData(c, h);
            for (f = 0; f < g; f++) h.orient = "fixed", a._ratioToPositionData(d[f], h, k), b.beginPath(), b.moveTo(k.x, k.y), b.lineTo(k.x + 9 * Math.cos(.0174533 * k.rotation), k.y + 9 * Math.sin(.0174533 * k.rotation)), b.strokeStyle = "black", b.lineWidth = 4.5, b.stroke(), b.strokeStyle = "red", b.lineWidth = 3, b.stroke(), b.closePath()
        }
        b.restore();
        return e
    };
    a._solveGuideData = function(c, b) {
        var d;
        if (d = a.debug(c)) return d;
        var e = b.path = c.path;
        b.orient = c.orient;
        b.subLines = [];
        b.totalLength = 0;
        b.startOffsetRot = 0;
        b.deltaRotation = 0;
        b.startData = {
            ratio: 0
        };
        b.endData = {
            ratio: 1
        };
        b.animSpan = 1;
        var f = e.length,
            g, h = {};
        var k = e[0];
        var l = e[1];
        for (d = 2; d < f; d += 4) {
            var p = e[d];
            var n = e[d + 1];
            var u = e[d + 2];
            var x = e[d + 3];
            var q = {
                    weightings: [],
                    estLength: 0,
                    portion: 0
                },
                A = k;
            var y = l;
            for (g = 1; 10 >= g; g++) a._getParamsForCurve(k, l, p, n, u, x, g / 10, !1, h), A = h.x - A, y = h.y - y, y = Math.sqrt(A * A + y * y), q.weightings.push(y), q.estLength += y, A = h.x,
                y = h.y;
            b.totalLength += q.estLength;
            for (g = 0; 10 > g; g++) y = q.estLength, q.weightings[g] /= y;
            b.subLines.push(q);
            k = u;
            l = x
        }
        y = b.totalLength;
        e = b.subLines.length;
        for (d = 0; d < e; d++) b.subLines[d].portion = b.subLines[d].estLength / y;
        d = isNaN(c.start) ? 0 : c.start;
        e = isNaN(c.end) ? 1 : c.end;
        a._ratioToPositionData(d, b, b.startData);
        a._ratioToPositionData(e, b, b.endData);
        b.startData.ratio = d;
        b.endData.ratio = e;
        b.animSpan = b.endData.ratio - b.startData.ratio
    };
    a._ratioToPositionData = function(c, b, d) {
        var e = b.subLines,
            f, g = 0,
            h = c * b.animSpan + b.startData.ratio;
        var k = e.length;
        for (f = 0; f < k; f++) {
            var l = e[f].portion;
            if (g + l >= h) {
                var p = f;
                break
            }
            g += l
        }
        void 0 === p && (p = k - 1, g -= l);
        e = e[p].weightings;
        var n = l;
        k = e.length;
        for (f = 0; f < k; f++) {
            l = e[f] * n;
            if (g + l >= h) break;
            g += l
        }
        p = 4 * p + 2;
        k = b.path;
        a._getParamsForCurve(k[p - 2], k[p - 1], k[p], k[p + 1], k[p + 2], k[p + 3], f / 10 + (h - g) / l * .1, b.orient, d);
        b.orient && (d.rotation = .99999 <= c && 1.00001 >= c && void 0 !== b.endAbsRot ? b.endAbsRot : d.rotation + (b.startOffsetRot + c * b.deltaRotation));
        return d
    };
    a._getParamsForCurve = function(c, b, d, e, f, g, h, k, l) {
        var p = 1 - h;
        l.x = p * p * c + 2 * p * h * d + h * h * f;
        l.y = p * p * b + 2 * p * h * e + h * h * g;
        k && (l.rotation = 57.2957795 * Math.atan2((e - b) * p + (g - e) * h, (d - c) * p + (f - d) * h))
    };
    a._findPathProblems = function(c) {
        var b = c.path,
            d = b && b.length || 0;
        if (6 > d || (d - 2) % 4) return "\tCannot parse 'path' array due to invalid number of entries in path. There should be an odd number of points, at least 3 points, and 2 entries per point (x & y). See 'CanvasRenderingContext2D.quadraticCurveTo' for details as 'path' models a quadratic bezier.\n\nOnly [ " + (d + " ] values found. Expected: " + Math.max(4 * Math.ceil((d - 2) / 4) + 2, 6));
        for (var e = 0; e < d; e++)
            if (isNaN(b[e])) return "All data in path array must be numeric";
        b = c.start;
        if (isNaN(b) && void 0 !== b) return "'start' out of bounds. Expected 0 to 1, got: " + b;
        b = c.end;
        if (isNaN(b) && void 0 !== b) return "'end' out of bounds. Expected 0 to 1, got: " + b;
        if ((c = c.orient) && "fixed" != c && "auto" != c && "cw" != c && "ccw" != c) return 'Invalid orientation value. Expected ["fixed", "auto", "cw", "ccw", undefined], got: ' + c
    };
    createjs.MotionGuidePlugin = a
})();
this.createjs = this.createjs || {};
(function() {
    var a = createjs.TweenJS = createjs.TweenJS || {};
    a.version = "1.0.0";
    a.buildDate = "Thu, 14 Sep 2017 19:47:47 GMT"
})();
(function() {
    function a(t) {
        t = String(t);
        return t.charAt(0).toUpperCase() + t.slice(1)
    }

    function c(t, m) {
        var v = -1,
            r = t ? t.length : 0;
        if ("number" == typeof r && -1 < r && r <= x)
            for (; ++v < r;) m(t[v], v, t);
        else d(t, m)
    }

    function b(t) {
        t = String(t).replace(/^ +| +$/g, "");
        return /^(?:webOS|i(?:OS|P))/.test(t) ? t : a(t)
    }

    function d(t, m) {
        for (var v in t) A.call(t, v) && m(t[v], v, t)
    }

    function e(t) {
        return null == t ? a(t) : y.call(t).slice(8, -1)
    }

    function f(t, m) {
        var v = null != t ? typeof t[m] : "number";
        return !/^(?:boolean|number|string|undefined)$/.test(v) && ("object" == v ? !!t[m] : !0)
    }

    function g(t) {
        return String(t).replace(/([ -])(?!$)/g, "$1?")
    }

    function h(t, m) {
        var v = null;
        c(t, function(r, w) {
            v = m(v, r, w, t)
        });
        return v
    }

    function k(t) {
        function m(Q) {
            return h(Q, function(M, L) {
                var R = L.pattern || g(L);
                !M && (M = RegExp("\\b" + R + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + R + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + R + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((M = String(L.label && !RegExp(R, "i").test(L.label) ? L.label : M).split("/"))[1] && !/[\d.]+/.test(M[0]) && (M[0] += " " + M[1]), L = L.label || L, M = b(M[0].replace(RegExp(R, "i"), L).replace(RegExp("; *(?:" + L + "[_-])?", "i"), " ").replace(RegExp("(" + L + ")[-_.]?(\\w)", "i"), "$1 $2")));
                return M
            })
        }

        function v(Q) {
            return h(Q, function(M, L) {
                return M || (RegExp(L + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null
            })
        }
        var r = p,
            w = t && "object" == typeof t && "String" != e(t);
        w && (r = t, t = null);
        var D = r.navigator || {},
            B = D.userAgent || "";
        t || (t = B);
        var H = w ? !!D.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(y.toString()),
            I = w ? "Object" : "ScriptBridgingProxyObject",
            N = w ? "Object" : "Environment",
            O = w && r.java ? "JavaPackage" : e(r.java),
            T = w ? "Object" : "RuntimeObject";
        N = (O = /\bJava/.test(O) && r.java) && e(r.environment) == N;
        var G = O ? "a" : "\u03b1",
            P = O ? "b" : "\u03b2",
            U = r.document || {},
            V = r.operamini || r.opera,
            Y = q.test(Y = w && V ? V["[[Class]]"] : e(V)) ? Y : V = null,
            z, Z = t;
        w = [];
        var aa = null,
            X = t == B;
        B = X && V && "function" == typeof V.version && V.version();
        var J = function(Q) {
                return h(Q, function(M, L) {
                    return M || RegExp("\\b" + (L.pattern || g(L)) + "\\b", "i").exec(t) && (L.label || L)
                })
            }([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"]),
            E = function(Q) {
                return h(Q, function(M, L) {
                    return M || RegExp("\\b" + (L.pattern || g(L)) + "\\b", "i").exec(t) && (L.label || L)
                })
            }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                label: "Microsoft Edge",
                pattern: "Edge"
            }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
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
            }, {
                label: "IE",
                pattern: "IEMobile"
            }, {
                label: "IE",
                pattern: "MSIE"
            }, "Safari"]),
            K = m([{
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
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {
                label: "Xbox 360",
                pattern: "Xbox"
            }, "Xoom"]),
            S = function(Q) {
                return h(Q, function(M, L, R) {
                    return M || (L[K] || L[/^[a-z]+(?: +[a-z]+\b)*/i.exec(K)] || RegExp("\\b" + g(R) + "(?:\\b|\\w*\\d)", "i").exec(t)) && R
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
            F = function(Q) {
                return h(Q, function(M, L) {
                    var R = L.pattern || g(L);
                    if (!M && (M = RegExp("\\b" + R + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t))) {
                        var W = M,
                            ba = L.label || L,
                            ca = {
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
                        R && ba && /^Win/i.test(W) && !/^Windows Phone /i.test(W) && (ca = ca[/[\d.]+$/.exec(W)]) && (W = "Windows " + ca);
                        W = String(W);
                        R && ba && (W = W.replace(RegExp(R, "i"), ba));
                        M = W = b(W.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                    }
                    return M
                })
            }(["Windows Phone", "Android", "CentOS", {
                label: "Chrome OS",
                pattern: "CrOS"
            }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);
        J && (J = [J]);
        S && !K && (K = m([S]));
        if (z = /\bGoogle TV\b/.exec(K)) K = z[0];
        /\bSimulator\b/i.test(t) && (K = (K ? K + " " : "") + "Simulator");
        "Opera Mini" == E && /\bOPiOS\b/.test(t) && w.push("running in Turbo/Uncompressed mode");
        "IE" == E && /\blike iPhone OS\b/.test(t) ? (z = k(t.replace(/like iPhone OS/, "")), S = z.manufacturer, K = z.product) : /^iP/.test(K) ? (E || (E = "Safari"), F = "iOS" + ((z = / OS ([\d_]+)/i.exec(t)) ? " " + z[1].replace(/_/g, ".") : "")) : "Konqueror" != E || /buntu/i.test(F) ? S && "Google" != S && (/Chrome/.test(E) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(K)) || /\bAndroid\b/.test(F) && /^Chrome/.test(E) && /\bVersion\//i.test(t) ? (E = "Android Browser", F = /\bAndroid\b/.test(F) ? F : "Android") : "Silk" == E ? (/\bMobi/i.test(t) || (F = "Android", w.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && w.unshift("accelerated")) : "PaleMoon" == E && (z = /\bFirefox\/([\d.]+)\b/.exec(t)) ? w.push("identifying as Firefox " + z[1]) : "Firefox" == E && (z = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (F || (F = "Firefox OS"), K || (K = z[1])) : !E || (z = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(E)) ? (E && !K && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(z + "/") + 8)) && (E = null), (z = K || S || F) && (K || S || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(F)) && (E = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(F) ? F : z) + " Browser")) : "Electron" == E && (z = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && w.push("Chromium " + z) : F = "Kubuntu";
        B || (B = v(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", g(E), "(?:Firefox|Minefield|NetFront)"]));
        if (z = "iCab" == J && 3 < parseFloat(B) && "WebKit" || /\bOpera\b/.test(E) && (/\bOPR\b/.test(t) ? "Blink" : "Presto") || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(J) && "WebKit" || !J && /\bMSIE\b/i.test(t) && ("Mac OS" == F ? "Tasman" : "Trident") || "WebKit" == J && /\bPlayStation\b(?! Vita\b)/i.test(E) && "NetFront") J = [z];
        "IE" == E && (z = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (E += " Mobile", F = "Windows Phone " + (/\+$/.test(z) ? z : z + ".x"), w.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (E = "IE Mobile", F = "Windows Phone 8.x", w.unshift("desktop mode"), B || (B = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : "IE" != E && "Trident" == J && (z = /\brv:([\d.]+)/.exec(t)) && (E && w.push("identifying as " + E + (B ? " " + B : "")), E = "IE", B = z[1]);
        if (X) {
            if (f(r, "global"))
                if (O && (z = O.lang.System, Z = z.getProperty("os.arch"), F = F || z.getProperty("os.name") + " " + z.getProperty("os.version")), N) {
                    try {
                        B = r.require("ringo/engine").version.join("."), E = "RingoJS"
                    } catch (Q) {
                        (z = r.system) && z.global.system == r.system && (E = "Narwhal", F || (F = z[0].os || null))
                    }
                    E || (E = "Rhino")
                } else "object" == typeof r.process && !r.process.browser && (z = r.process) && ("object" == typeof z.versions && ("string" == typeof z.versions.electron ? (w.push("Node " + z.versions.node), E = "Electron", B = z.versions.electron) : "string" == typeof z.versions.nw && (w.push("Chromium " + B, "Node " + z.versions.node), E = "NW.js", B = z.versions.nw)), E || (E = "Node.js", Z = z.arch, F = z.platform, B = (B = /[\d.]+/.exec(z.version)) ? B[0] : null));
            else e(z = r.runtime) == I ? (E = "Adobe AIR", F = z.flash.system.Capabilities.os) : e(z = r.phantom) == T ? (E = "PhantomJS", B = (z = z.version || null) && z.major + "." + z.minor + "." + z.patch) : "number" == typeof U.documentMode && (z = /\bTrident\/(\d+)/i.exec(t)) ? (B = [B, U.documentMode], (z = +z[1] + 4) != B[1] && (w.push("IE " + B[1] + " mode"), J && (J[1] = ""), B[1] = z), B = "IE" == E ? String(B[1].toFixed(1)) : B[0]) : "number" == typeof U.documentMode && /^(?:Chrome|Firefox)\b/.test(E) && (w.push("masking as " + E + " " + B), E = "IE", B = "11.0", J = ["Trident"], F = "Windows");
            F = F && b(F)
        }
        B && (z = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(B) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (X && D.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (aa = /b/i.test(z) ? "beta" : "alpha", B = B.replace(RegExp(z + "\\+?$"), "") + ("beta" == aa ? P : G) + (/\d+\+?/.exec(z) || ""));
        if ("Fennec" == E || "Firefox" == E && /\b(?:Android|Firefox OS)\b/.test(F)) E = "Firefox Mobile";
        else if ("Maxthon" == E && B) B = B.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(K)) "Xbox 360" == K && (F = null), "Xbox 360" == K && /\bIEMobile\b/.test(t) && w.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(E) && (!E || K || /Browser|Mobi/.test(E)) || "Windows CE" != F && !/Mobi/i.test(t))
            if ("IE" == E && X) try {
                null === r.external && w.unshift("platform preview")
            } catch (Q) {
                w.unshift("embedded")
            } else(/\bBlackBerry\b/.test(K) || /\bBB10\b/.test(t)) && (z = (RegExp(K.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || B) ? (z = [z, /BB10/.test(t)], F = (z[1] ? (K = null, S = "BlackBerry") : "Device Software") + " " + z[0], B = null) : this != d && "Wii" != K && (X && V || /Opera/.test(E) && /\b(?:MSIE|Firefox)\b/i.test(t) || "Firefox" == E && /\bOS X (?:\d+\.){2,}/.test(F) || "IE" == E && (F && !/^Win/.test(F) && 5.5 < B || /\bWindows XP\b/.test(F) && 8 < B || 8 == B && !/\bTrident\b/.test(t))) && !q.test(z = k.call(d, t.replace(q, "") + ";")) && z.name && (z = "ing as " + z.name + ((z = z.version) ? " " + z : ""), q.test(E) ? (/\bIE\b/.test(z) && "Mac OS" == F && (F = null), z = "identify" + z) : (z = "mask" + z, E = Y ? b(Y.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(z) && (F = null), X || (B = null)), J = ["Presto"], w.push(z));
            else E += " Mobile";
        if (z = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) {
            z = [parseFloat(z.replace(/\.(\d)$/, ".0$1")), z];
            if ("Safari" == E && "+" == z[1].slice(-1)) E = "WebKit Nightly", aa = "alpha", B = z[1].slice(0, -1);
            else if (B == z[1] || B == (z[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1])) B = null;
            z[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1];
            537.36 == z[0] && 537.36 == z[2] && 28 <= parseFloat(z[1]) && "WebKit" == J && (J = ["Blink"]);
            X && (H || z[1]) ? (J && (J[1] = "like Chrome"), z = z[1] || (z = z[0], 530 > z ? 1 : 532 > z ? 2 : 532.05 > z ? 3 : 533 > z ? 4 : 534.03 > z ? 5 : 534.07 > z ? 6 : 534.1 > z ? 7 : 534.13 > z ? 8 : 534.16 > z ? 9 : 534.24 > z ? 10 : 534.3 > z ? 11 : 535.01 > z ? 12 : 535.02 > z ? "13+" : 535.07 > z ? 15 : 535.11 > z ? 16 : 535.19 > z ? 17 : 536.05 > z ? 18 : 536.1 > z ? 19 : 537.01 > z ? 20 : 537.11 > z ? "21+" : 537.13 > z ? 23 : 537.18 > z ? 24 : 537.24 > z ? 25 : 537.36 > z ? 26 : "Blink" != J ? "27" : "28")) : (J && (J[1] = "like Safari"), z = (z = z[0], 400 > z ? 1 : 500 > z ? 2 : 526 > z ? 3 : 533 > z ? 4 : 534 > z ? "4+" : 535 > z ? 5 : 537 > z ? 6 : 538 > z ? 7 : 601 > z ? 8 : "8"));
            J && (J[1] += " " + (z += "number" == typeof z ? ".x" : /[.+]/.test(z) ? "" : "+"));
            "Safari" == E && (!B || 45 < parseInt(B)) && (B = z)
        }
        "Opera" == E && (z = /\bzbov|zvav$/.exec(F)) ? (E += " ", w.unshift("desktop mode"), "zvav" == z ? (E += "Mini", B = null) : E += "Mobile", F = F.replace(RegExp(" *" + z + "$"), "")) : "Safari" == E && /\bChrome\b/.exec(J && J[1]) && (w.unshift("desktop mode"), E = "Chrome Mobile", B = null, /\bOS X\b/.test(F) ? (S = "Apple", F = "iOS 4.3+") : F = null);
        B && 0 == B.indexOf(z = /[\d.]+$/.exec(F)) && -1 < t.indexOf("/" + z + "-") && (F = String(F.replace(z, "")).replace(/^ +| +$/g, ""));
        J && !/\b(?:Avant|Nook)\b/.test(E) && (/Browser|Lunascape|Maxthon/.test(E) || "Safari" != E && /^iOS/.test(F) && /\bSafari\b/.test(J[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(E) && J[1]) && (z = J[J.length - 1]) && w.push(z);
        w.length && (w = ["(" + w.join("; ") + ")"]);
        S && K && 0 > K.indexOf(S) && w.push("on " + S);
        K && w.push((/^on /.test(w[w.length - 1]) ? "" : "on ") + K);
        if (F) {
            var da = (z = / ([\d.+]+)$/.exec(F)) && "/" == F.charAt(F.length - z[0].length - 1);
            F = {
                architecture: 32,
                family: z && !da ? F.replace(z[0], "") : F,
                version: z ? z[1] : null,
                toString: function() {
                    var Q = this.version;
                    return this.family + (Q && !da ? " " + Q : "") + (64 == this.architecture ? " 64-bit" : "")
                }
            }
        }(z = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(Z)) && !/\bi686\b/i.test(Z) ? (F && (F.architecture = 64, F.family = F.family.replace(RegExp(" *" + z), "")), E && (/\bWOW64\b/i.test(t) || X && /\w(?:86|32)$/.test(D.cpuClass || D.platform) && !/\bWin64; x64\b/i.test(t)) && w.unshift("32-bit")) : F && /^OS X/.test(F.family) && "Chrome" == E && 39 <= parseFloat(B) && (F.architecture = 64);
        t || (t = null);
        r = {};
        r.description = t;
        r.layout = J && J[0];
        r.manufacturer = S;
        r.name = E;
        r.prerelease = aa;
        r.product = K;
        r.ua = t;
        r.version = E && B;
        r.os = F || {
            architecture: null,
            family: null,
            version: null,
            toString: function() {
                return "null"
            }
        };
        r.parse = k;
        r.toString = function() {
            return this.description || ""
        };
        r.version && w.unshift(B);
        r.name && w.unshift(E);
        F && E && (F != String(F).split(" ")[0] || F != E.split(" ")[0] && !K) && w.push(K ? "(" + F + ")" : "on " + F);
        w.length && (r.description = w.join(" "));
        return r
    }
    var l = {
            "function": !0,
            object: !0
        },
        p = l[typeof window] && window || this,
        n = l[typeof exports] && exports;
    l = l[typeof module] && module && !module.nodeType && module;
    var u = n && l && "object" == typeof global && global;
    !u || u.global !== u && u.window !== u && u.self !== u || (p = u);
    var x = Math.pow(2, 53) - 1,
        q = /\bOpera/;
    u = Object.prototype;
    var A = u.hasOwnProperty,
        y = u.toString,
        C = k();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (p.platform = C, define(function() {
        return C
    })) : n && l ? d(C, function(t, m) {
        n[m] = t
    }) : p.platform = C
}).call(this);
var s_bLandscape, s_iScaleFactor = 1,
    s_bIsIphone = !1,
    s_iOffsetX, s_iOffsetY;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0, 4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
}

function isIpad() {
    var a = -1 !== navigator.userAgent.toLowerCase().indexOf("ipad");
    return !a && navigator.userAgent.match(/Mac/) && navigator.maxTouchPoints && 2 < navigator.maxTouchPoints ? !0 : a
}

function isMobile() {
    return isIpad() ? !0 : jQuery.browser.mobile
}

function isChrome() {
    return /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)
}

function isIOS() {
    var a = "iPad Simulator;iPhone Simulator;iPod Simulator;iPad;iPhone;iPod".split(";");
    if (-1 !== navigator.userAgent.toLowerCase().indexOf("iphone")) return s_bIsIphone = !0;
    for (; a.length;)
        if (navigator.platform === a.pop()) return !0;
    return s_bIsIphone = !1
}

function getSize(a) {
    var c = a.toLowerCase(),
        b = window.document,
        d = b.documentElement;
    if (void 0 === window["inner" + a]) a = d["client" + a];
    else if (window["inner" + a] != d["client" + a]) {
        var e = b.createElement("body");
        e.id = "vpw-test-b";
        e.style.cssText = "overflow:scroll";
        var f = b.createElement("div");
        f.id = "vpw-test-d";
        f.style.cssText = "position:absolute;top:-1000px";
        f.innerHTML = "<style>@media(" + c + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        e.appendChild(f);
        d.insertBefore(e, b.head);
        a = 7 == f["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(e)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
}

function getIOSWindowHeight() {
    return document.documentElement.clientWidth / window.innerWidth * window.innerHeight
}

function getHeightOfIOSToolbars() {
    var a = (0 === window.orientation ? screen.height : screen.width) - getIOSWindowHeight();
    return 1 < a ? a : 0
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = null !== platform.name && "safari" === platform.name.toLowerCase() ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width"),
            b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH);
        c > a ? (EDGEBOARD_X = 0, EDGEBOARD_Y = 530, s_bLandscape = !0) : (EDGEBOARD_X = 550, EDGEBOARD_Y = 0, s_bLandscape = !1);
        var d = Math.round(CANVAS_WIDTH * b);
        b = Math.round(CANVAS_HEIGHT * b);
        if (b < a) {
            var e = a - b;
            b += e;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * e
        } else d < c && (e = c - d, d += e, b += CANVAS_HEIGHT / CANVAS_WIDTH * e);
        e = a / 2 - b / 2;
        var f = c / 2 - d / 2,
            g = CANVAS_WIDTH / d;
        if (f * g < -EDGEBOARD_X || e * g < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 * EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), d = Math.round(CANVAS_WIDTH * b), b = Math.round(CANVAS_HEIGHT * b), e = (a - b) / 2, f = (c - d) / 2, g = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * f * g;
        s_iOffsetY = -1 * e * g;
        0 <= e && (s_iOffsetY = 0);
        0 <= f && (s_iOffsetX = 0);
        null !== s_oGame && s_oGame.refreshButtonPos();
        null !== s_oMenu && s_oMenu.refreshButtonPos();
        null !== s_oLevelMenu && s_oLevelMenu.refreshButtonPos();
        s_iScaleFactor = Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT);
        s_bIsIphone && s_oStage ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * d, s_oStage.canvas.height = 2 * b, canvas.style.width = d + "px", canvas.style.height = b + "px", s_iScaleFactor = 2 * Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? ($("#canvas").css("width", d + "px"), $("#canvas").css("height", b + "px")) : s_oStage && (s_oStage.canvas.width = d, s_oStage.canvas.height = b, s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > e || (e = (a - b) / 2);
        $("#canvas").css("top", e + "px");
        $("#canvas").css("left", f + "px");
        fullscreenHandler()
    }
}

function createBitmap(a, c, b) {
    var d = new createjs.Bitmap(a),
        e = new createjs.Shape;
    c && b ? e.graphics.beginFill("#fff").drawRect(0, 0, c, b) : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = e;
    return d
}

function createSprite(a, c, b, d, e, f) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -d, e, f);
    a.hitArea = c;
    return a
}

function randomFloatBetween(a, c, b) {
    "undefined" === typeof b && (b = 2);
    return parseFloat(Math.min(a + Math.random() * (c - a), c).toFixed(b))
}

function rotateVector2D(a, c) {
    var b = c.getX() * Math.cos(a) + c.getY() * Math.sin(a),
        d = c.getX() * -Math.sin(a) + c.getY() * Math.cos(a);
    c.set(b, d)
}

function tweenVectorsOnX(a, c, b) {
    return a + b * (c - a)
}
this.tweenVectors = function(a, c, b) {
    var d = new CVector2;
    d.set(a.getX() + b * (c.getX() - a.getX()), a.getY() + b * (c.getY() - a.getY()));
    return d
};

function shuffle(a) {
    for (var c = a.length, b, d; 0 !== c;) d = Math.floor(Math.random() * c), --c, b = a[c], a[c] = a[d], a[d] = b;
    return a
}

function bubbleSort(a) {
    do {
        var c = !1;
        for (var b = 0; b < a.length - 1; b++) a[b] > a[b + 1] && (c = a[b], a[b] = a[b + 1], a[b + 1] = c, c = !0)
    } while (c)
}

function compare(a, c) {
    return a.index > c.index ? -1 : a.index < c.index ? 1 : 0
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
        e = a * a;
    b.x = d * c.start.x + 2 * (1 - a) * a * c.traj.x + e * c.end.x;
    b.y = d * c.start.y + 2 * (1 - a) * a * c.traj.y + e * c.end.y;
    return b
}

function formatTime(a) {
    a /= 1E3;
    var c = Math.floor(a / 60);
    a = Math.floor(a - 60 * c);
    var b = "";
    b = 10 > c ? b + ("0" + c + ":") : b + (c + ":");
    return 10 > a ? b + ("0" + a) : b + a
}

function degreesToRadians(a) {
    return a * Math.PI / 180
}

function checkRectCollision(a, c) {
    var b = getBounds(a, .9);
    var d = getBounds(c, .98);
    return calculateIntersection(b, d)
}

function distance(a, c) {
    return Math.sqrt((c.x - a.x) * (c.x - a.x) + (c.y - a.y) * (c.y - a.y))
}

function collisionWithCircle(a, c, b) {
    var d = a.getX() - c.getX();
    a = a.getY() - c.getY();
    return Math.sqrt(d * d + a * a) < PLAYER_RADIUS * b + CELL_SIZE * b ? !0 : !1
}

function calculateIntersection(a, c) {
    var b, d, e, f;
    var g = a.x + (b = a.width / 2);
    var h = a.y + (d = a.height / 2);
    var k = c.x + (e = c.width / 2);
    var l = c.y + (f = c.height / 2);
    g = Math.abs(g - k) - (b + e);
    h = Math.abs(h - l) - (d + f);
    return 0 > g && 0 > h ? (g = Math.min(Math.min(a.width, c.width), -g), h = Math.min(Math.min(a.height, c.height), -h), {
        x: Math.max(a.x, c.x),
        y: Math.max(a.y, c.y),
        width: g,
        height: h,
        rect1: a,
        rect2: c
    }) : null
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
            e = d.length,
            f;
        for (f = 0; f < e; f++) {
            var g = getBounds(d[f], 1);
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
            e = a.sourceRect || a.image;
            f = e.width * c;
            var h = e.height * c
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                e = a.spriteSheet.getFrame(a.currentFrame);
                f = e.rect.width;
                h = e.rect.height;
                d = e.regX;
                var k = e.regY
            } else b.x = a.x || 0, b.y = a.y || 0;
        else b.x = a.x || 0, b.y = a.y || 0;
        d = d || 0;
        f = f || 0;
        k = k || 0;
        h = h || 0;
        b.regX = d;
        b.regY = k;
        e = a.localToGlobal(0 - d, 0 - k);
        g = a.localToGlobal(f - d, h - k);
        f = a.localToGlobal(f - d, 0 - k);
        d = a.localToGlobal(0 - d, h - k);
        b.x = Math.min(Math.min(Math.min(e.x, g.x), f.x), d.x);
        b.y = Math.min(Math.min(Math.min(e.y, g.y), f.y), d.y);
        b.width = Math.max(Math.max(Math.max(e.x, g.x), f.x), d.x) - b.x;
        b.height = Math.max(Math.max(Math.max(e.y, g.y), f.y), d.y) - b.y
    }
    return b
}

function NoClickDelay(a) {
    this.element = a;
    window.Touch && this.element.addEventListener("touchstart", this, !1)
}

function shuffle(a) {
    for (var c = a.length, b, d; 0 < c;) d = Math.floor(Math.random() * c), c--, b = a[c], a[c] = a[d], a[d] = b;
    return a
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
        this.element.removeEventListener("touchend", this, !1);
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
    function a(b) {
        var d = {
            focus: "visible",
            focusin: "visible",
            pageshow: "visible",
            blur: "hidden",
            focusout: "hidden",
            pagehide: "hidden"
        };
        b = b || window.event;
        b.type in d ? document.body.className = d[b.type] : (document.body.className = this[c] ? "hidden" : "visible", "hidden" === document.body.className ? s_oMain.stopUpdate() : s_oMain.startUpdate())
    }
    var c = "hidden";
    c in document ? document.addEventListener("visibilitychange", a) : (c = "mozHidden") in document ? document.addEventListener("mozvisibilitychange", a) : (c = "webkitHidden") in document ? document.addEventListener("webkitvisibilitychange", a) : (c = "msHidden") in document ? document.addEventListener("msvisibilitychange", a) : "onfocusin" in document ? document.onfocusin = document.onfocusout = a : window.onpageshow = window.onpagehide = window.onfocus = window.onblur = a
})();

function isEven(a) {
    return 0 == a % 2 ? !0 : !1
}

function ctlArcadeResume() {
    null !== s_oMain && s_oMain.startUpdate()
}

function ctlArcadePause() {
    null !== s_oMain && s_oMain.stopUpdate()
}

function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var d = c[b].split("=");
        if (d[0] == a) return d[1]
    }
}

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(c), s_aSounds[a].loop(b), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].stop()
}

function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].volume(c)
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || s_aSounds[a].mute(c)
}

function fullscreenHandler() {
    ENABLE_FULLSCREEN && screenfull.isEnabled && (s_bFullscreen = screenfull.isFullscreen, null !== s_oInterface && s_oInterface.resetFullscreenBut(), null !== s_oMenu && s_oMenu.resetFullscreenBut(), null !== s_oLevelMenu && s_oLevelMenu.resetFullscreenBut())
}
if (screenfull.isEnabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut();
    null !== s_oLevelMenu && s_oLevelMenu.resetFullscreenBut();
    !1 === s_bFullscreen && setTimeout(function() {
        sizeHandler()
    }, 2E3)
});

function saveItem(a, c) {
    s_bStorageAvailable && localStorage.setItem(a, c)
}

function getItem(a) {
    return s_bStorageAvailable ? localStorage.getItem(a) : null
}
var s_szGameID = "4d333e7c6f674f71a85efc70ace23875";
window.GD_OPTIONS = {
    gameId: s_szGameID,
    onEvent: function(a) {
        switch (a.name) {
            case "SDK_READY":
                // s_bMobile || ($("#div_display_id").css("display", "block")
                //     , "undefined" !== typeof gdsdk && "undefined" !== gdsdk.showAd && gdsdk.showAd(gdsdk.AdType.Display, {
                //     containerId: "div_display_id"
                // }).then(function() {
                //     return console.info("showAd(gdsdk.AdType.Display) resolved.")
                // })["catch"](function(c) {
                //     return console.info(c)
                // }));
                break;
            case "SDK_GAME_START":
                s_bAdShown = !1;
                s_oMain && s_oMain.startUpdate();
                break;
            case "SDK_GAME_PAUSE":
                s_bAdShown = !0;
                s_oMain && s_oMain.stopUpdate();
                break;
            case "SDK_REWARDED_WATCH_COMPLETE":
                console.log("SDK_REWARDED_WATCH_COMPLETE"), s_oGame.applyReward()
        }
    }
};
(function(a, c, b) {
    var d = a.getElementsByTagName(c)[0];
    a.getElementById(b) || (a = a.createElement(c), a.id = b, a.src = "", d.parentNode.insertBefore(a, d))
})(document, "script", "gamedistribution-jssdk");
var s_bAdShown = !1;

function CSpriteLibrary() {
    var a = {},
        c, b, d, e, f, g;
    this.init = function(h, k, l) {
        c = {};
        d = b = 0;
        e = h;
        f = k;
        g = l
    };
    this.addSprite = function(h, k) {
        if (!a.hasOwnProperty(h)) {
            var l = new Image;
            a[h] = c[h] = {
                szPath: k,
                oSprite: l,
                bLoaded: !1
            };
            b++
        }
    };
    this.getSprite = function(h) {
        return a.hasOwnProperty(h) ? a[h].oSprite : null
    };
    this._onSpritesLoaded = function() {
        b = 0;
        f.call(g)
    };
    this._onSpriteLoaded = function() {
        e.call(g);
        ++d === b && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var h in c) c[h].oSprite.oSpriteLibrary = this, c[h].oSprite.szKey = h, c[h].oSprite.onload = function() {
            this.oSpriteLibrary.setLoaded(this.szKey);
            this.oSpriteLibrary._onSpriteLoaded(this.szKey)
        }, c[h].oSprite.onerror = function(k) {
            var l = k.currentTarget;
            setTimeout(function() {
                c[l.szKey].oSprite.src = c[l.szKey].szPath
            }, 500)
        }, c[h].oSprite.src = c[h].szPath
    };
    this.setLoaded = function(h) {
        a[h].bLoaded = !0
    };
    this.isLoaded = function(h) {
        return a[h].bLoaded
    };
    this.getNumSprites = function() {
        return b
    }
}
var GAME_NAME = "kittygram",
    CANVAS_WIDTH = 1920,
    CANVAS_HEIGHT = 1920,
    EDGEBOARD_X = 0,
    EDGEBOARD_Y = 0,
    FONT = "RoundedMplus1c",
    ENABLE_FULLSCREEN, FPS = 60,
    DISABLE_SOUND_MOBILE = !1,
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_CHOOSE_LEVEL = 2,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_BUT_YES_DOWN = 4,
    ON_BUT_NO_DOWN = 5,
    ON_SELECT_PIECE = 6,
    ON_CELL_PRESS = 7,
    ON_LEVEL_WIN = 8,
    ON_HINT = 9,
    ON_HELP = 10,
    ON_SELECT_LANG = 11,
    DIR_LEFT = 0,
    DIR_TOP = 1,
    DIR_RIGHT = 2,
    DIR_BOTTOM = 3,
    LABEL_UNAVAILABLE = -1,
    LABEL_EMPTY = 0,
    LABEL_FILL = 1,
    CUR_GRID_SCALE = 1,
    MAX_TABLE_HEIGHT_LANDSCAPE = 1640,
    MAX_TABLE_WIDTH_PORTRAIT = 1140,
    MAX_TABLE_HEIGHT = 1802,
    NUM_ROWS = 10,
    NUM_COLS = 10,
    CELL_WIDTH = 108,
    CELL_HEIGHT = 108,
    CELL_HEIGHT_FAKE = 93,
    CELL_X = 70,
    CELL_Y = 98,
    NUM_PIECES, PIECE_TO_PLACE, NUM_TYPES = 10,
    X_PIECE_ATTACH = 555,
    Y_PIECE_ATTACH = CANVAS_HEIGHT / 2 + 180,
    SCALE_STARTING_PIECE = .6,
    OFFSET_PIECE_Y = 250,
    SOUNDTRACK_VOLUME_IN_GAME = .2,
    MIN_TIME_IDLE = 5E3,
    MAX_TIME_IDLE = 3E4,
    NUM_ROWS_PER_PAGE = 3,
    NUM_COLS_PER_PAGE = 4,
    MALUS_HINT, MAX_FREE_HINTS = 1,
    MAX_TOTAL_HINTS = 3,
    NUM_LANGUAGES = 7,
    LANG_EN = 0,
    LANG_ES = 1,
    LANG_FR = 2,
    LANG_DE = 3,
    LANG_PT = 4,
    LANG_IT = 5,
    LANG_RU = 6,
    LANG_CODES = {};
LANG_CODES.en = LANG_EN;
LANG_CODES.es = LANG_ES;
LANG_CODES.fr = LANG_FR;
LANG_CODES.de = LANG_DE;
LANG_CODES.pt = LANG_PT;
LANG_CODES.it = LANG_IT;
LANG_CODES.ru = LANG_RU;

function CMain(a) {
    var c, b = 0,
        d = 0,
        e = STATE_LOADING,
        f, g;
    this.initContainer = function() {
        s_oCanvas = document.getElementById("canvas");
        s_oStage = new createjs.Stage(s_oCanvas);
        createjs.Touch.enable(s_oStage, !0);
        s_oStage.preventSelection = !1;
        s_bMobile = isMobile();
        !1 === s_bMobile && s_oStage.enableMouseOver(20);
        s_iPrevTime = (new Date).getTime();
        createjs.Ticker.addEventListener("tick", this._update);
        createjs.Ticker.framerate = FPS;
        navigator.userAgent.match(/Windows Phone/i) && (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        f = new CPreloader
    };
    this.preloaderReady = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        this._loadImages();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        f.refreshLoader(Math.floor(b / d * 100))
    };
    this._initSounds = function() {
        Howler.mute(!s_bAudioActive);
        s_aSoundsInfo = [];
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
            filename: "position",
            loop: !1,
            volume: 1,
            ingamename: "position"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "soundtrack"
        });
        s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "particle_sfx",
            loop: !1,
            volume: 1,
            ingamename: "particle_sfx"
        });
        for (var h = 1; 11 > h; h++) s_aSoundsInfo.push({
            path: "./sounds/",
            filename: "miao_" + h,
            loop: !1,
            volume: 1,
            ingamename: "miao_" + h
        });
        d += s_aSoundsInfo.length;
        s_aSounds = [];
        for (h = 0; h < s_aSoundsInfo.length; h++) this.tryToLoadSound(s_aSoundsInfo[h], !1)
    };
    this.tryToLoadSound = function(h, k) {
        setTimeout(function() {
            s_aSounds[h.ingamename] = new Howl({
                src: [h.path + h.filename + ".mp3"],
                autoplay: !1,
                preload: !0,
                loop: h.loop,
                volume: h.volume,
                onload: s_oMain.soundLoaded,
                onloaderror: function(l, p) {
                    for (var n = 0; n < s_aSoundsInfo.length; n++)
                        if (l === s_aSounds[s_aSoundsInfo[n].ingamename]._sounds[0]._id) {
                            s_oMain.tryToLoadSound(s_aSoundsInfo[n], !0);
                            break
                        }
                },
                onplayerror: function(l) {
                    for (var p = 0; p < s_aSoundsInfo.length; p++)
                        if (l === s_aSounds[s_aSoundsInfo[p].ingamename]._sounds[0]._id) {
                            s_aSounds[s_aSoundsInfo[p].ingamename].once("unlock", function() {
                                s_aSounds[s_aSoundsInfo[p].ingamename].play();
                                "soundtrack" === s_aSoundsInfo[p].ingamename && null !== s_oGame && setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME)
                            });
                            break
                        }
                }
            })
        }, k ? 200 : 0)
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("msg_box", "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("bg_game", "./sprites/bg_game.jpg");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("audio_icon_menu", "./sprites/audio_icon_menu.png");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_no", "./sprites/but_no.png");
        s_oSpriteLibrary.addSprite("but_settings", "./sprites/but_settings.png");
        s_oSpriteLibrary.addSprite("help_sprite", "./sprites/help_sprite.png");
        s_oSpriteLibrary.addSprite("grid_bg", "./sprites/grid_bg.png");
        s_oSpriteLibrary.addSprite("rank_panel", "./sprites/rank_panel.png");
        s_oSpriteLibrary.addSprite("but_restart_big", "./sprites/but_restart_big.png");
        s_oSpriteLibrary.addSprite("logo", "./sprites/logo.png");
        s_oSpriteLibrary.addSprite("but_fullscreen_menu", "./sprites/but_fullscreen_menu.png");
        s_oSpriteLibrary.addSprite("grid_roof", "./sprites/grid_roof.png");
        s_oSpriteLibrary.addSprite("cell_highlight", "./sprites/cell_highlight.png");
        s_oSpriteLibrary.addSprite("but_exit_menu", "./sprites/but_exit_menu.png");
        s_oSpriteLibrary.addSprite("cell_bg", "./sprites/cell_bg.png");
        s_oSpriteLibrary.addSprite("levels_box", "./sprites/levels_box.png");
        s_oSpriteLibrary.addSprite("but_left", "./sprites/but_left.png");
        s_oSpriteLibrary.addSprite("but_right", "./sprites/but_right.png");
        s_oSpriteLibrary.addSprite("but_help", "./sprites/but_help.png");
        s_oSpriteLibrary.addSprite("but_difficulties", "./sprites/but_difficulties.png");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("score_icon", "./sprites/score_icon.png");
        s_oSpriteLibrary.addSprite("but_back", "./sprites/but_back.png");
        s_oSpriteLibrary.addSprite("but_next_level", "./sprites/but_next_level.png");
        s_oSpriteLibrary.addSprite("but_hint", "./sprites/but_hint.png");
        s_oSpriteLibrary.addSprite("but_lang", "./sprites/but_lang.png");
        for (var h = 1; h < NUM_TYPES + 1; h++) s_oSpriteLibrary.addSprite("cell_" + h, "./sprites/cell_" + h + ".png");
        for (h = 0; 22 > h; h++) s_oSpriteLibrary.addSprite("particle_stars_" + h, "./sprites/particle_stars/particle_stars_" + h + ".png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        f.refreshLoader(Math.floor(b / d * 100))
    };
    this._onRemovePreloader = function() {
        try {
            checkMoreGames(s_szGameID, "middle-left", ["puzzle", "arcade", "multiplayer"], [], -1, "dark_yellow")
        } catch (h) {}
        f.unload();
        try {
            saveItem("ls_available", "ok")
        } catch (h) {
            s_bStorageAvailable = !1
        }
        s_oSoundTrack = playSound("soundtrack", 1, !0);
        this.gotoMenu()
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.gotoMenu = function() {
        try {
            showMoreGames()
        } catch (h) {}
        new CMenu;
        e = STATE_MENU
    };
    this.gotoLevelMenu = function() {
        new CLevelMenu;
        e = STATE_CHOOSE_LEVEL
    };
    this.gotoGame = function(h, k) {
        s_iCurDiff = h;
        s_iTotalScore = getScoreTillLevel(h, getSavedLevel(h));
        g = new CGame(k);
        e = STATE_GAME
    };
    this.stopUpdateNoBlock = function() {
        c = !1;
        createjs.Ticker.paused = !0
    };
    this.startUpdateNoBlock = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || Howler.mute(!0)
    };
    this.startUpdate = function() {
        s_iPrevTime = (new Date).getTime();
        c = !0;
        createjs.Ticker.paused = !1;
        $("#block_game").css("display", "none");
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || !s_bAudioActive || s_bAdShown || Howler.mute(!1)
    };
    this._update = function(h) {
        if (!1 !== c) {
            var k = (new Date).getTime();
            s_iTimeElaps = k - s_iPrevTime;
            s_iCntTime += s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = k;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            e === STATE_GAME && g.update();
            s_oStage.update(h)
        }
    };
    s_oMain = this;
    s_bAudioActive = a.audio_enable_on_startup;
    ENABLE_FULLSCREEN = a.fullscreen;
    MALUS_HINT = a.malus_hint;
    a = navigator.language.split("-")[0];
    void 0 === LANG_CODES[a] && (a = "en");
    s_iCurLang = LANG_CODES[a];
    refreshLanguage();
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !1,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 0,
    s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack = null,
    s_oCanvas, s_bFullscreen = !1,
    s_aSounds, s_bStorageAvailable = !0,
    s_aSoundsInfo, s_oPieceSettings, s_iCurPieceSelected = 0,
    s_iCurDiff = 3,
    s_iCurLang = LANG_EN;

function CPreloader() {
    var a, c, b, d, e, f, g, h, k;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.addSprite("200x200", "./sprites/200x200.jpg");
        s_oSpriteLibrary.loadSprites();
        k = new createjs.Container;
        s_oStage.addChild(k)
    };
    this.unload = function() {
        k.removeAllChildren()
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(l);
        l = s_oSpriteLibrary.getSprite("200x200");
        g = createBitmap(l);
        g.regX = .5 * l.width;
        g.regY = .5 * l.height;
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT / 2 - 180;
        k.addChild(g);
        h = new createjs.Shape;
        h.graphics.beginFill("rgba(0,0,0,0.01)").drawRoundRect(g.x - 100, g.y - 100, 200, 200, 10);
        k.addChild(h);
        g.mask = h;
        l = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(l);
        d.x = CANVAS_WIDTH / 2 - l.width / 2;
        d.y = CANVAS_HEIGHT / 2 + 50;
        k.addChild(d);
        a = l.width;
        c = l.height;
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, 1, c);
        k.addChild(e);
        d.mask = e;
        b = new createjs.Text("", "40px " + FONT, "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2 + 170;
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        k.addChild(b);
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        k.addChild(f);
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500).call(function() {
            createjs.Tween.removeTweens(f);
            k.removeChild(f)
        })
    };
    this.refreshLoader = function(l) {
        b.text = l + "%";
        100 === l && (s_oMain._onRemovePreloader(), b.visible = !1, d.visible = !1);
        e.graphics.clear();
        l = Math.floor(l * a / 100);
        e.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(d.x, d.y, l, c)
    };
    this._init()
}

function CTextButton(a, c, b, d, e, f, g, h) {
    var k, l, p, n, u, x, q, A, y, C, t, m;
    this._init = function(v, r, w, D, B, H, I, N) {
        k = !1;
        n = [];
        u = [];
        m = createBitmap(w);
        l = w.width;
        p = w.height;
        var O = Math.ceil(I / 20);
        C = new createjs.Text(D, I + "px " + B, "#000000");
        var T = C.getBounds();
        C.textAlign = "center";
        C.lineWidth = .9 * l;
        C.textBaseline = "alphabetic";
        C.x = w.width / 2 + O;
        C.y = Math.floor(w.height / 2) + T.height / 3 + O;
        t = new createjs.Text(D, I + "px " + B, H);
        t.textAlign = "center";
        t.textBaseline = "alphabetic";
        t.lineWidth = .9 * l;
        t.x = w.width / 2;
        t.y = Math.floor(w.height / 2) + T.height / 3;
        y = new createjs.Container;
        y.x = v;
        y.y = r;
        y.regX = w.width / 2;
        y.regY = w.height / 2;
        s_bMobile || (y.cursor = "pointer");
        y.addChild(m, C, t);
        !1 !== N && s_oStage.addChild(y);
        this._initListener()
    };
    this.unload = function() {
        y.off("mousedown", x);
        y.off("pressup", q);
        s_oStage.removeChild(y)
    };
    this.setVisible = function(v) {
        y.visible = v
    };
    this.setAlign = function(v) {
        t.textAlign = v;
        C.textAlign = v
    };
    this.enable = function() {
        k = !1;
        m.filters = [];
        m.cache(0, 0, l, p)
    };
    this.disable = function() {
        k = !0;
        var v = (new createjs.ColorMatrix).adjustSaturation(-100).adjustBrightness(40);
        m.filters = [new createjs.ColorMatrixFilter(v)];
        m.cache(0, 0, l, p)
    };
    this._initListener = function() {
        x = y.on("mousedown", this.buttonDown);
        q = y.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(v, r, w) {
        n[v] = r;
        u[v] = w
    };
    this.addEventListenerWithParams = function(v, r, w, D) {
        n[v] = r;
        u[v] = w;
        A = D
    };
    this.buttonRelease = function() {
        k || (playSound("click", 1, !1), y.scaleX = 1, y.scaleY = 1, n[ON_MOUSE_UP] && n[ON_MOUSE_UP].call(u[ON_MOUSE_UP], A))
    };
    this.buttonDown = function() {
        k || (y.scaleX = .9, y.scaleY = .9, n[ON_MOUSE_DOWN] && n[ON_MOUSE_DOWN].call(u[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(v, r) {
        y.x = v;
        y.y = r
    };
    this.changeText = function(v) {
        t.text = v;
        C.text = v
    };
    this.setX = function(v) {
        y.x = v
    };
    this.setY = function(v) {
        y.y = v
    };
    this.getButtonImage = function() {
        return y
    };
    this.getX = function() {
        return y.x
    };
    this.getY = function() {
        return y.y
    };
    this.getSprite = function() {
        return y
    };
    this._init(a, c, b, d, e, f, g, h);
    return this
}

function CToggle(a, c, b, d, e) {
    var f, g, h, k = [],
        l, p, n;
    this._init = function(u, x, q, A) {
        g = [];
        h = [];
        var y = new createjs.SpriteSheet({
            images: [q],
            frames: {
                width: q.width / 2,
                height: q.height,
                regX: q.width / 2 / 2,
                regY: q.height / 2
            },
            animations: {
                state_true: 0,
                state_false: 1
            }
        });
        f = A;
        n = createSprite(y, "state_" + f, q.width / 2 / 2, q.height / 2, q.width / 2, q.height);
        n.mouseEnabled = !0;
        n.x = u;
        n.y = x;
        n.cursor = "pointer";
        e.addChild(n);
        this._initListener()
    };
    this.unload = function() {
        n.off("mousedown", l);
        n.off("pressup", p);
        n.mouseEnabled = !1;
        e.removeChild(n)
    };
    this._initListener = function() {
        l = n.on("mousedown", this.buttonDown);
        p = n.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(u, x, q) {
        g[u] = x;
        h[u] = q
    };
    this.addEventListenerWithParams = function(u, x, q, A) {
        g[u] = x;
        h[u] = q;
        k = A
    };
    this.setActive = function(u) {
        f = u;
        n.gotoAndStop("state_" + f)
    };
    this.buttonRelease = function() {
        n.scaleX = 1;
        n.scaleY = 1;
        playSound("click", 1, !1);
        f = !f;
        n.gotoAndStop("state_" + f);
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP], k)
    };
    this.buttonDown = function() {
        n.scaleX = .9;
        n.scaleY = .9;
        g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], k)
    };
    this.setPosition = function(u, x) {
        n.x = u;
        n.y = x
    };
    this.setVisible = function(u) {
        n.visible = u
    };
    this.setMask = function(u) {
        n.mask = u
    };
    this.getButtonImage = function() {
        return n
    };
    this._init(a, c, b, d)
}

function CGfxButton(a, c, b, d) {
    var e, f, g, h, k, l, p = [],
        n;
    this._init = function(x, q, A) {
        e = !0;
        f = 1;
        k = [];
        l = [];
        n = createBitmap(A);
        n.x = x;
        n.y = q;
        n.regX = A.width / 2;
        n.regY = A.height / 2;
        n.cursor = "pointer";
        u.addChild(n);
        this._initListener()
    };
    this.unload = function() {
        createjs.Tween.removeTweens(n);
        n.off("mousedown", g);
        n.off("pressup", h);
        u.removeChild(n)
    };
    this.setVisible = function(x) {
        n.visible = x
    };
    this.setScale = function(x) {
        f = x;
        n.scaleX = n.scaleY = f
    };
    this.activate = function() {
        e = !0
    };
    this.deactivate = function() {
        e = !1
    };
    this._initListener = function() {
        g = n.on("mousedown", this.buttonDown);
        h = n.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(x, q, A) {
        k[x] = q;
        l[x] = A
    };
    this.addEventListenerWithParams = function(x, q, A, y) {
        k[x] = q;
        l[x] = A;
        p = y
    };
    this.buttonRelease = function() {
        !1 !== e && (n.scaleX = f, n.scaleY = f, k[ON_MOUSE_UP] && k[ON_MOUSE_UP].call(l[ON_MOUSE_UP], p))
    };
    this.buttonDown = function() {
        !1 !== e && (n.scaleX = .9 * f, n.scaleY = .9 * f, playSound("click", 1, !1), k[ON_MOUSE_DOWN] && k[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN], p))
    };
    this.setScale = function(x) {
        f = x;
        n.scaleX = x;
        n.scaleY = x
    };
    this.setPosition = function(x, q) {
        n.x = x;
        n.y = q
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(n, {
            loop: -1
        }).to({
            scaleX: 1.1 * f,
            scaleY: 1.1 * f
        }, 850, createjs.Ease.quadOut).to({
            scaleX: f,
            scaleY: f
        }, 650, createjs.Ease.quadIn)
    };
    this.setX = function(x) {
        n.x = x
    };
    this.setY = function(x) {
        n.y = x
    };
    this.setMask = function(x) {
        n.mask = x
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
    var u = d;
    this._init(a, c, b);
    return this
}

function CMenu() {
    var a, c, b, d, e, f, g, h, k, l, p, n = null,
        u = null,
        x, q, A, y;
    this._init = function() {
        s_bMobile || $("#div_display_id").css("display", "block");
        x = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(x);
        l = new CGfxButton(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 + 300, s_oSpriteLibrary.getSprite("but_play"), s_oStage);
        l.pulseAnimation();
        l.addEventListener(ON_MOUSE_UP, this._onStart, this, 0);
        var C = s_oSpriteLibrary.getSprite("but_lang");
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) {
            var t = s_oSpriteLibrary.getSprite("audio_icon_menu");
            g = CANVAS_WIDTH - t.height / 2 - 10;
            h = t.height / 2 + 10;
            q = new CToggle(g, h, t, s_bAudioActive, s_oStage);
            q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
            a = g - C.width / NUM_LANGUAGES - 10;
            c = h
        } else a = CANVAS_WIDTH - t.width / 4 - 10, c = t.height / 2 + 10;
        y = new CButLang(a, c, NUM_LANGUAGES, s_iCurLang, C, s_oStage);
        y.addEventListener(ON_SELECT_LANG, this._onChangeLang, this);
        t = s_oSpriteLibrary.getSprite("but_credits");
        e = t.width / 2 + 10;
        f = t.height / 2 + 10;
        p = new CGfxButton(e, f, t, s_oStage);
        p.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        C = window.document;
        t = C.documentElement;
        n = t.requestFullscreen || t.mozRequestFullScreen || t.webkitRequestFullScreen || t.msRequestFullscreen;
        u = C.exitFullscreen || C.mozCancelFullScreen || C.webkitExitFullscreen || C.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (n = !1);
        n && screenfull.isEnabled && (t = s_oSpriteLibrary.getSprite("but_fullscreen_menu"), b = e + t.width / 2 + 10, d = t.height / 2 + 10, A = new CToggle(b, d, t, s_bFullscreen, s_oStage), A.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        C = s_oSpriteLibrary.getSprite("logo");
        k = createBitmap(C);
        k.x = CANVAS_WIDTH / 2;
        k.y = CANVAS_HEIGHT / 2 - 200;
        k.regX = C.width / 2;
        k.regY = C.height / 2;
        k.scale = 0;
        k.visible = !1;
        s_oStage.addChild(k);
        var m = new createjs.Shape;
        m.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(m);
        createjs.Tween.get(m).to({
            alpha: 0
        }, 500).call(function() {
            m.visible = !1
        });
        setVolume("soundtrack", 1);
        C = .8;
        s_bLandscape && (s_bMobile ? C = .7 : (k.y = CANVAS_HEIGHT / 2 - 300, l.setY(CANVAS_HEIGHT / 2 + 110), C = .5));
        k.visible = !0;
        createjs.Tween.get(k).wait(500).to({
            scale: C
        }, 1500, createjs.Ease.elasticOut);
        this.refreshButtonPos()
    };
    this.unload = function() {
        l.unload();
        p.unload();
        y.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) q.unload(), q = null;
        n && screenfull.isEnabled && A.unload();
        s_oMenu = null;
        s_oStage.removeAllChildren()
    };
    this.refreshButtonPos = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || q.setPosition(g - s_iOffsetX, s_iOffsetY + h);
        n && screenfull.isEnabled && A.setPosition(b + s_iOffsetX, d + s_iOffsetY);
        p.setPosition(e + s_iOffsetX, s_iOffsetY + f);
        y.setPosition(a - s_iOffsetX, c + s_iOffsetY);
        if (!1 === createjs.Tween.hasActiveTweens(k)) {
            var C = .8;
            l.setY(CANVAS_HEIGHT / 2 + 300);
            s_bLandscape && (s_bMobile ? C = .7 : (k.y = CANVAS_HEIGHT / 2 - 300, C = .5, l.setY(CANVAS_HEIGHT / 2 + 110)));
            k.scale = C
        }
    };
    this._onStart = function() {
        // $("#div_display_id").css("display", "none");
        // "undefined" !== typeof gdsdk && "undefined" !== gdsdk.showAd && gdsdk.showAd();
        // try {
        //     hideMoreGames()
        // } catch (C) {}
        $(s_oMain).trigger("start_session");
        s_oMenu.unload();
        s_oMain.gotoLevelMenu()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onCreditsBut = function() {
        new CCreditsPanel
    };
    this.resetFullscreenBut = function() {
        n && screenfull.isEnabled && A.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? u.call(window.document) : n.call(window.document.documentElement);
        sizeHandler()
    };
    this._onChangeLang = function(C) {
        s_iCurLang = C;
        refreshLanguage()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a) {
    var c, b, d, e, f, g, h, k, l, p;
    this._init = function(n) {
        d = parseInt(n);
        f = e = 0;
        setVolume("soundtrack", SOUNDTRACK_VOLUME_IN_GAME);
        s_oPieceSettings = new CPieceSettings;
        n = createBitmap(s_oSpriteLibrary.getSprite("bg_game"));
        s_oStage.addChild(n);
        g = new createjs.Container;
        s_oStage.addChild(g);
        h = new CBoard(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50, d - 1, g);
        h.addEventListener(ON_LEVEL_WIN, this.gameOver, this);
        k = new CInterface(d - 1);
        k.addEventListener(ON_HINT, this._onHint, this);
        k.addEventListener(ON_HELP, this._showHelp, this);
        p = new CGameOver;
        l = new CHelp;
        1 === d ? this._showHelp() : c = !0;
        this.refreshButtonPos()
    };
    this.unload = function() {
        k.unload();
        h.unload();
        l.unload();
        p.unload();
        s_oGame = null;
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    };
    this.refreshButtonPos = function() {
        this.refreshGridScale();
        k.refreshButtonPos()
    };
    this.refreshGridScale = function() {
        s_bLandscape ? CUR_GRID_SCALE = (CANVAS_HEIGHT - 2 * s_iOffsetY) / MAX_TABLE_HEIGHT_LANDSCAPE : (CUR_GRID_SCALE = (CANVAS_WIDTH - 2 * s_iOffsetX) / MAX_TABLE_WIDTH_PORTRAIT, 1.23 < CUR_GRID_SCALE && (CUR_GRID_SCALE = 1.23));
        1 >= CUR_GRID_SCALE && (CUR_GRID_SCALE = parseFloat(CUR_GRID_SCALE.toFixed(2)));
        h.refreshGridScale();
        k.refreshGridScale()
    };
    this.restart = function() {
        f = e = 0;
        h.reset(d - 1);
        k.changeHintState(0);
        c = !0;
        $(s_oMain).trigger("restart_level", d)
    };
    this._showHelp = function() {
        l.show()
    };
    this.gameOver = function() {
        c = !1;
        b = Math.floor((MAX_TIME_LEVEL_RESOLUTION[s_iCurDiff] - e) / 1E3);
        0 > b && (b = 0);
        setLocalStorageLevel(s_iCurDiff, d);
        setLocalStorageScore(b, s_iCurDiff, d - 1);
        s_iTotalScore = getScoreTillLevel(s_iCurDiff, getSavedLevel(s_iCurDiff));
        $(s_oMain).trigger("end_level", d);
        $(s_oMain).trigger("save_score", [s_iTotalScore, s_iCurDiff]);
        $(s_oMain).trigger("share_event", s_iTotalScore);
        p.show(b, d, LEVELS[s_iCurDiff].length === d ? !0 : !1)
    };
    this.nextLevel = function() {
        d++;
        f = e = 0;
        h.unload();
        h = new CBoard(CANVAS_WIDTH / 2, CANVAS_HEIGHT / 2 - 50, d - 1, g);
        h.addEventListener(ON_LEVEL_WIN, this.gameOver, this);
        k.refreshBestScore();
        k.changeHintState(0);
        this.refreshGridScale();
        c = !0
    };
    this.onHideExitPanel = function() {
        c = !0
    };
    this.setUpdate = function(n) {
        c = n
    };
    this._onHint = function(n) {
        switch (n) {
            case 0:
                h.showHint() && (e -= MALUS_HINT, f++, f === MAX_FREE_HINTS && (s_bRewardAvailable ? k.changeHintState(1) : k.changeHintState(2)));
                break;
            case 1:
                // console.log("VIDEO REWARD"), "undefined" !== gdsdk && "undefined" !== gdsdk.showAd 
                // && (c = !1, gdsdk.showAd("rewarded").then(function(u) {
                //     console.log("START VIDEO REWARD")
                // })["catch"](function(u) {
                //     c = !0;
                //     console.log("VIDEO REWARD FAILED")
                // }))
        }
    };
    this.applyReward = function() {
        c = !0;
        s_bRewardAvailable && h.showHint() && (f++, f === MAX_TOTAL_HINTS && k.changeHintState(2))
    };
    this.onExit = function() {
        this.unload();
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("end_session");
        s_oMain.gotoMenu()
    };
    this.onExitHelp = function() {
        c = !0
    };
    this.update = function() {
        c && (e += s_iTimeElaps)
    };
    s_oGame = this;
    this._init(a)
}
var s_oGame = null,
    s_bRewardAvailable = !1;

function CInterface(a) {
    var c, b, d, e, f, g, h, k, l = null,
        p = null,
        n, u, x, q, A, y, C, t, m, v, r, w, D, B;
    this._init = function(H) {
        n = [];
        u = [];
        B = new createjs.Shape;
        B.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        B.alpha = 0;
        x = B.on("click", function() {});
        s_oStage.addChild(B);
        D = new createjs.Container;
        s_oStage.addChild(D);
        H = s_oSpriteLibrary.getSprite("rank_panel");
        H = createBitmap(H);
        H.x = 0;
        D.addChild(H);
        r = new CTLText(D, H.x + 80, H.y + 24, 300, 74, 60, "right", "#fff", FONT, 1, 0, 0, "" + s_iTotalScore, !0, !0, !1, !1);
        c = CANVAS_WIDTH - 101;
        H = s_oSpriteLibrary.getSprite("but_exit");
        y = new CGfxButton(c, 127, H, s_oStage);
        y.addEventListener(ON_MOUSE_UP, this._onExit, this);
        b = c;
        m = new CGfxButton(b, 127, s_oSpriteLibrary.getSprite("but_help"), s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onHelp, this);
        !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (g = c - H.width, H = s_oSpriteLibrary.getSprite("audio_icon"), q = new CToggle(g, 127, H, s_bAudioActive, s_oStage), q.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), e = g - H.width / 2) : e = c - H.width;
        f = 127;
        var I = window.document,
            N = I.documentElement;
        l = N.requestFullscreen || N.mozRequestFullScreen || N.webkitRequestFullScreen || N.msRequestFullscreen;
        p = I.exitFullscreen || I.mozCancelFullScreen || I.webkitExitFullscreen || I.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (l = !1);
        l && screenfull.isEnabled && (H = s_oSpriteLibrary.getSprite("but_fullscreen"), A = new CToggle(e, f, H, s_bFullscreen, s_oStage), A.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        d = CANVAS_WIDTH - H.width / 2 - 10;
        C = new CGfxButton(d, 127, s_oSpriteLibrary.getSprite("but_restart"), s_oStage);
        C.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        H = s_oSpriteLibrary.getSprite("but_settings");
        v = new CGUIExpandible(c, 127, H, s_oStage);
        v.addButton(y);
        v.addButton(m);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.addButton(q);
        l && screenfull.isEnabled && v.addButton(A);
        v.addButton(C);
        H = s_oSpriteLibrary.getSprite("but_hint");
        h = c - H.width / 3 - 50;
        k = H.height / 2 + 10;
        t = new CButHint(h, k, H, s_oStage);
        t.addEventListener(ON_MOUSE_UP, this._onHint, this);
        new CRollingScore;
        this.preloadAd();
        w = new CAreYouSurePanel(s_oStage)
    };
    this.unload = function() {
        B.off("click", x);
        v.unload();
        w.unload();
        t.unload();
        m.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) q.unload(), q = null;
        l && screenfull.isEnabled && A.unload();
        y.unload();
        C.unload();
        s_oInterface = null
    };
    this.refreshButtonPos = function() {
        t.setPosition(h - s_iOffsetX, k + s_iOffsetY);
        v.refreshPos();
        D.x = CANVAS_WIDTH / 2 - 550 * CUR_GRID_SCALE;
        D.y = CANVAS_HEIGHT / 2 - 720 * CUR_GRID_SCALE
    };
    this.refreshGridScale = function() {
        D.scaleX = D.scaleY = CUR_GRID_SCALE
    };
    this.addEventListener = function(H, I, N) {
        n[H] = I;
        u[H] = N
    };
    this.preloadAd = function() {
        // "undefined" !== gdsdk && "undefined" !== gdsdk.preloadAd && gdsdk.preloadAd("rewarded").then(function(H) {
        s_bRewardAvailable = !0
        // })["catch"](function(H) {
        //     s_bRewardAvailable = !1
        // })
    };
    this.refreshBestScore = function() {
        r.refreshText(s_iTotalScore)
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        w.show(TEXT_ARE_YOU_SURE);
        w.addEventListener(ON_BUT_YES_DOWN, s_oGame.onExit, s_oGame);
        w.addEventListener(ON_BUT_NO_DOWN, s_oGame.onHideExitPanel, s_oGame);
        s_oGame.setUpdate(!1)
    };
    this._onHelp = function() {
        n[ON_HELP] && n[ON_HELP].call(u[ON_HELP])
    };
    this.resetFullscreenBut = function() {
        l && screenfull.isEnabled && A.setActive(s_bFullscreen)
    };
    this.changeHintState = function(H) {
        t.setState(H)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? p.call(window.document) : l.call(window.document.documentElement);
        sizeHandler()
    };
    this._onRestart = function() {
        w.show(TEXT_ARE_YOU_SURE_RESTART);
        w.addEventListener(ON_BUT_YES_DOWN, s_oGame.restart, s_oGame);
        w.addEventListener(ON_BUT_NO_DOWN, s_oGame.onHideExitPanel, s_oGame);
        s_oGame.setUpdate(!1)
    };
    this._onHint = function(H) {
        n[ON_HINT] && n[ON_HINT].call(u[ON_HINT], H)
    };
    s_oInterface = this;
    this._init(a);
    return this
}
var s_oInterface = null;

function CCreditsPanel() {
    var a, c, b, d, e, f, g, h;
    this._init = function() {
        h = new createjs.Container;
        s_oStage.addChild(h);
        b = new createjs.Shape;
        c = b.on("click", function() {});
        b.alpha = 0;
        b.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.addChild(b);
        d = new createjs.Container;
        d.visible = !1;
        h.addChild(d);
        var k = s_oSpriteLibrary.getSprite("msg_box");
        g = createBitmap(k);
        g.regX = k.width / 2;
        g.regY = k.height / 2;
        d.addChild(g);
        a = g.on("click", function() {});
        d.x = CANVAS_WIDTH / 2;
        d.y = CANVAS_HEIGHT / 2;
        k = new createjs.Text(TEXT_DEVELOPED, "60px " + FONT, "#fff");
        k.y = -140;
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        d.addChild(k);
        k = new createjs.Text("www.playzen.io", "56px " + FONT, "#fff");
        k.y = 70;
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        k.lineWidth = 300;
        d.addChild(k);
        k = s_oSpriteLibrary.getSprite("ctl_logo");
        f = createBitmap(k);
        f.y = -50;
        f.regX = k.width / 2;
        f.regY = k.height / 2;
        d.addChild(f);
        k = s_oSpriteLibrary.getSprite("but_yes");
        e = new CGfxButton(0, 220, k, d);
        e.addEventListener(ON_MOUSE_UP, this.unload, this);
        b.alpha = 0;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 500).call(function() {
            d.alpha = 0;
            d.visible = !0;
            createjs.Tween.get(d).to({
                alpha: 1
            }, 300)
        })
    };
    this.unload = function() {
        createjs.Tween.get(h).to({
            alpha: 0
        }, 500).call(function() {
            s_oStage.removeChild(h);
            e.unload()
        });
        b.off("click", c);
        g.off("click", a)
    };
    this._init()
}

function CAreYouSurePanel(a) {
    var c, b, d, e, f, g, h, k, l, p, n = this;
    this._init = function() {
        c = [];
        b = [];
        k = new createjs.Container;
        k.visible = !1;
        u.addChild(k);
        l = new createjs.Shape;
        l.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        l.alpha = .5;
        d = l.on("click", function() {});
        k.addChild(l);
        p = new createjs.Container;
        p.x = CANVAS_WIDTH / 2;
        p.y = CANVAS_HEIGHT / 2;
        k.addChild(p);
        var x = s_oSpriteLibrary.getSprite("msg_box");
        e = createBitmap(x);
        p.addChild(e);
        f = new CTLText(p, x.width / 2 - 320, 190, 640, 240, 140, "center", "#fff", FONT, 1, 0, 0, " ", !0, !0, !0, !1);
        g = new CGfxButton(x.width - 220, 650, s_oSpriteLibrary.getSprite("but_yes"), p);
        g.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        h = new CGfxButton(220, 650, s_oSpriteLibrary.getSprite("but_no"), p);
        h.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        p.regX = x.width / 2;
        p.regY = x.height / 2
    };
    this.addEventListener = function(x, q, A) {
        c[x] = q;
        b[x] = A
    };
    this.show = function(x) {
        f.refreshText(x);
        p.scaleX = p.scaleY = .1;
        k.visible = !0;
        createjs.Tween.get(p).to({
            scaleX: 1,
            scaleY: 1
        }, 1E3, createjs.Ease.elasticOut)
    };
    this.hide = function() {
        c[ON_BUT_NO_DOWN] && c[ON_BUT_NO_DOWN].call(b[ON_BUT_NO_DOWN]);
        k.visible = !1
    };
    this.unload = function() {
        h.unload();
        g.unload();
        l.off("click", d)
    };
    this._onButYes = function() {
        n.hide();
        c[ON_BUT_YES_DOWN] && c[ON_BUT_YES_DOWN].call(b[ON_BUT_YES_DOWN])
    };
    this._onButNo = function() {
        n.hide()
    };
    var u = a;
    this._init()
}

function CGUIExpandible(a, c, b, d) {
    var e, f, g, h, k, l, p, n, u, x;
    this._init = function(A, y, C, t) {
        h = [];
        n = new createjs.Container;
        n.x = A;
        n.y = y;
        t.addChild(n);
        u = new createjs.Container;
        n.addChild(u);
        x = new createjs.Container;
        n.addChild(x);
        g = !1;
        A = {
            images: [s_oSpriteLibrary.getSprite("but_settings")],
            frames: {
                width: 183,
                height: 234,
                regX: 91,
                regY: 117
            },
            animations: {
                start: 0,
                anim_expand: [0, 10, "stop_anim_expand"],
                stop_anim_expand: 11,
                anim_collapse: {
                    frames: [10, 9, 8, 7, 6, 5, 4, 3, 2, 1, 0],
                    next: "stop_anim_collapse"
                },
                stop_anim_collapse: 0
            }
        };
        A = new createjs.SpriteSheet(A);
        p = createSprite(A, "start", 91, 117, 183, 234);
        p.on("animationend", this._onAnimEnd, this);
        x.addChild(p);
        l = new createjs.Shape;
        l.graphics.beginFill("rgba(255,0,0,0.01)").drawRect(-130, -167, 261, 190);
        l.cursor = "pointer";
        k = l.on("click", this._onMenu, this);
        x.addChild(l);
        e = 74;
        f = 126
    };
    this.unload = function() {
        l.off("click", k);
        d.removeChild(n)
    };
    this.refreshPos = function() {
        n.x = a - s_iOffsetX;
        n.y = c + s_iOffsetY
    };
    this.addButton = function(A) {
        A = A.getButtonImage();
        A.x = 14;
        A.y = 70;
        A.visible = !1;
        u.addChildAt(A, 0);
        h.push(A)
    };
    this._onMenu = function() {
        playSound("click", 1, !1);
        (g = !g) ? p.gotoAndPlay("anim_expand"): q.hide()
    };
    this.hide = function() {
        p.gotoAndPlay("anim_collapse");
        q._collapse()
    };
    this._onAnimEnd = function(A) {
        "anim_expand" === A.name && q._expand()
    };
    this._expand = function() {
        h[0].visible = !0;
        for (var A = 1; A < h.length; A++) h[A].visible = !0, createjs.Tween.get(h[A], {
            override: !0
        }).to({
            y: e + A * f
        }, 300, createjs.Ease.cubicOut)
    };
    this._collapse = function() {
        for (var A = 0; A < h.length; A++) {
            0 === A && (h[A].visible = !1);
            var y = h[h.length - 1 - A];
            createjs.Tween.get(y, {
                override: !0
            }).to({
                y: 70
            }, 100, createjs.Ease.cubicOut).call(function(C) {
                C.visible = !1
            }, [y])
        }
    };
    var q = this;
    this._init(a, c, b, d)
}

function CBoard(a, c, b, d) {
    var e, f, g, h, k, l, p, n, u, x, q, A, y, C, t;
    this._init = function(m, v, r) {
        q = null;
        l = [];
        p = [];
        k = [];
        t = new createjs.Container;
        t.x = m;
        t.y = v;
        d.addChild(t);
        m = s_oSpriteLibrary.getSprite("grid_bg");
        v = createBitmap(m);
        t.addChild(v);
        h = [];
        v = 69;
        for (var w = 104, D = s_oSpriteLibrary.getSprite("cell_highlight"), B = 0; B < NUM_ROWS; B++) {
            h[B] = [];
            for (var H = 0; H < NUM_COLS; H++) {
                var I = createBitmap(D);
                I.x = v;
                I.y = w;
                I.regX = D.width / 2;
                I.regY = D.height / 2;
                I.visible = !1;
                t.addChild(I);
                h[B][H] = I;
                v += 108
            }
            v = 69;
            w += 92
        }
        t.regX = m.width / 2;
        t.regY = m.height / 2;
        A = new createjs.Shape;
        A.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(0, 0, t.getBounds().width, t.getBounds().height);
        A.on("click", function() {});
        t.addChild(A);
        this.initBoard(r);
        this._prepareHints();
        A.visible = !1;
        $(s_oMain).trigger("start_level", r + 1)
    };
    this.refreshGridScale = function() {
        t.scaleX = t.scaleY = CUR_GRID_SCALE
    };
    this.unload = function() {
        d.removeChild(t);
        for (var m = 0; m < NUM_ROWS; m++)
            for (var v = 0; v < NUM_COLS; v++) e[m][v].unload()
    };
    this.reset = function(m) {
        q = null;
        k = [];
        for (var v = LEVELS[s_iCurDiff][m].grid,
                r = 0, w = 0; w < NUM_ROWS; w++)
            for (var D = 0; D < NUM_COLS; D++) {
                var B = v[r];
                e[w][D].reset(B);
                f[w][D] = B;
                r++
            }
        this.resetHighlights();
        for (w = 0; w < g.length; w++) g[w].unload();
        g = [];
        m = LEVELS[s_iCurDiff][m].pieces;
        PIECE_TO_PLACE = m.length;
        for (w = 0; w < PIECE_TO_PLACE; w++) this.spawnPieces(w, Math.floor(500 * Math.random()), s_oPieceSettings.getPieceInfos(m[w].index), m[w]);
        A.visible = !1
    };
    this.addEventListener = function(m, v, r) {
        l[m] = v;
        p[m] = r
    };
    this.resetHighlights = function() {
        for (var m = 0; m < NUM_ROWS; m++)
            for (var v = 0; v < NUM_COLS; v++) h[m][v].visible = !1, e[m][v].setAlpha(1)
    };
    this.initBoard = function(m) {
        y = new createjs.Container;
        y.x = CELL_X;
        y.y = CELL_Y;
        t.addChild(y);
        e = [];
        f = [];
        for (var v = 0, r = 0, w = LEVELS[s_iCurDiff][m].grid, D = 0, B = 0; B < NUM_ROWS; B++) {
            e[B] = [];
            f[B] = [];
            for (var H = 0; H < NUM_COLS; H++) {
                var I = w[D];
                e[B][H] = new CBoardCell(v, r, B, H, I, y);
                e[B][H].addEventListener(ON_CELL_PRESS, this._onPressCell, this);
                f[B][H] = I;
                v += CELL_WIDTH;
                D++
            }
            v = 0;
            r += CELL_HEIGHT_FAKE
        }
        B = createBitmap(s_oSpriteLibrary.getSprite("grid_roof"));
        t.addChild(B);
        C = new createjs.Container;
        t.addChild(C);
        g = [];
        m = LEVELS[s_iCurDiff][m].pieces;
        PIECE_TO_PLACE = m.length;
        for (B = 0; B < PIECE_TO_PLACE; B++) this.spawnPieces(B, Math.floor(500 * Math.random()), s_oPieceSettings.getPieceInfos(m[B].index), m[B]);
        y.sortChildren(function(N, O, T) {
            return N.y > O.y ? -1 : N.y < O.y ? 1 : 0
        })
    };
    this._prepareHints = function() {
        n = [];
        for (var m = 0; m < NUM_TYPES + 1; m++) n[m] = [];
        for (m = 0; m < NUM_ROWS; m++)
            for (var v = 0; v < NUM_COLS; v++) - 1 !== f[m][v] && n[f[m][v]].push({
                row: m,
                col: v
            });
        for (m = n.length - 1; 0 <= m;) 0 === n[m].length && n.splice(m, 1), m--
    };
    this.setBlock = function(m) {
        A.visible = m
    };
    this._onPressCell = function(m, v, r) {
        m = s_oPieceSettings.getPieceInfos(m);
        q = r;
        q.setVisible(!0);
        q.refreshGlobalPos(s_oStage.mouseX, s_oStage.mouseY);
        r = v.row;
        v = v.col;
        m = m.list_pos;
        k = [];
        for (var w = 0; w < m.length; w++) {
            var D = m[w];
            e[r + D.row][v + D.col].setValue(LABEL_EMPTY, -1, -1, -1, !1, null);
            f[r + D.row][v + D.col] = LABEL_EMPTY;
            k.push({
                row: r + D.row,
                col: v + D.col
            })
        }
        u = s_oStage.on("stagemousemove", this.onMovePiece, this);
        x = s_oStage.on("stagemouseup", this._onRelease, this)
    };
    this.spawnPieces = function(m, v, r, w) {
        null !== r && (v = new CPiece(m, PIECE_POSITION[s_iCurDiff][m].x, PIECE_POSITION[s_iCurDiff][m].y, w.type, w.index, r, v, SCALE_STARTING_PIECE, C), v.addEventListener(ON_SELECT_PIECE, this._onSelectPiece, this), g[m] = v)
    };
    this.showHint = function() {
        if (0 === n.length) return !1;
        for (var m = 0; m < NUM_ROWS; m++)
            for (var v = 0; v < NUM_COLS; v++) h[m][v].visible = !1, e[m][v].setAlpha(1);
        do m = n.pop(); while (!this._checkIfValidHint(m) && 0 < n.length);
        for (v = 0; v < m.length; v++) h[m[v].row][m[v].col].visible = !0, e[m[v].row][m[v].col].setAlpha(.5);
        return !0
    };
    this._checkIfValidHint = function(m) {
        for (var v = f[m[0].row][m[0].col], r = 1; r < m.length; r++)
            if (f[m[r].row][m[r].col] !== v || e[m[r].row][m[r].col].getState() === LABEL_EMPTY) return !0;
        return !1
    };
    this._onSelectPiece = function(m) {
        q = m
    };
    this.onMovePiece = function(m) {
        q.refreshGlobalPos(m.stageX, m.stageY);
        this.resetHighlights();
        m = q.getInfos().list_pos;
        var v = q.getGlobalPos();
        v = y.globalToLocal(v.x, v.y);
        var r = Math.floor(v.y / CELL_HEIGHT_FAKE);
        v = Math.floor(v.x / CELL_WIDTH);
        if (this._checkIfPieceFit(r, v, m))
            for (var w = 0; w < m.length; w++) {
                var D = m[w];
                h[r + D.row][v + D.col].visible = !0
            }
    };
    this._onRelease = function(m) {
        s_oStage.off("stagemousemove", u);
        s_oStage.off("stagemouseup", x);
        s_oBoard.onReleasePiece()
    };
    this.onReleasePiece = function() {
        this.resetHighlights();
        this._checkPieceCollision(q.getIndex(), q.getInfos());
        q = null;
        this._checkWin() && l[ON_LEVEL_WIN] && l[ON_LEVEL_WIN].call(p[ON_LEVEL_WIN])
    };
    this._checkIfPieceCanBePlaced = function(m) {
        for (var v = 0; v < NUM_ROWS; v++)
            for (var r = 0; r < NUM_COLS; r++)
                if (this._checkIfPieceFit(v, r, m.getInfos().list_pos)) return !0;
        return !1
    };
    this._checkPieceCollision = function(m, v) {
        var r = v.list_pos,
            w = q.getGlobalPos();
        w = y.globalToLocal(w.x, w.y);
        var D = Math.floor(w.y / CELL_HEIGHT_FAKE);
        w = Math.floor(w.x / CELL_WIDTH);
        if (this._checkIfPieceFit(D, w, r)) playSound("particle_sfx", 1, !1), console.log("_oCurMovingPiece.getType() " + q.getType()), playSound("miao_" + q.getType(), 1, !1), this.setCellValues(D, w, r), q.setVisible(!1), g[m].setVisible(!1);
        else {
            q.resetPos();
            g[m] = q;
            for (r = 0; r < k.length; r++) e[k[r].row][k[r].col].setValue(LABEL_EMPTY, -1, -1, -1, !1, null);
            this.setBlock(!1)
        }
        k = []
    };
    this._checkIfPieceFit = function(m, v, r) {
        if (0 > m || m >= NUM_ROWS || 0 > v || v >= NUM_COLS) return !1;
        for (var w = 0; w < r.length; w++) {
            var D = r[w];
            if (0 > m + D.row || m + D.row >= NUM_ROWS || 0 > v + D.col || v + D.col >= NUM_COLS || e[m + D.row][v + D.col].getState() === LABEL_UNAVAILABLE || e[m + D.row][v + D.col].getState() === LABEL_FILL) return !1
        }
        return !0
    };
    this._checkWin = function() {
        for (var m = !0, v = 0; v < g.length; v++)
            if (g[v].isVisible()) {
                m = !1;
                break
            }
        return m
    };
    this.setCellValues = function(m, v, r) {
        for (var w = 0; w < r.length; w++) {
            var D = r[w];
            e[m + D.row][v + D.col].setValue(q.getType(), q.getInfoIndex(), m, v, !0, q);
            f[m + D.row][v + D.col] = q.getType()
        }
    };
    this.printBoardCell = function() {
        for (var m = 0; m < NUM_ROWS; m++) {
            for (var v = "", r = 0; r < NUM_COLS; r++) v += e[m][r].getType() + "#";
            trace(v)
        }
        trace("####################")
    };
    this.getCurDraggingPiece = function() {
        return q
    };
    s_oBoard = this;
    this._init(a, c, b)
}
var s_oBoard;

function CBoardCell(a, c, b, d, e, f) {
    var g, h, k, l = -1,
        p = {
            row: -1,
            col: -1
        },
        n, u, x, q, A = null,
        y, C, t, m, v = this;
    this._init = function(r, w, D) {
        g = D;
        n = [];
        u = [];
        m = new createjs.Container;
        m.x = r;
        m.y = w;
        f.addChild(m);
        g === LABEL_UNAVAILABLE ? (h = LABEL_UNAVAILABLE, r = 0 === b % 2 ? 0 === d % 2 ? "state_off_0" : "state_off_1" : 0 === d % 2 ? "state_off_1" : "state_off_0") : (h = LABEL_EMPTY, r = "state_on");
        w = {
            images: [s_oSpriteLibrary.getSprite("cell_bg")],
            frames: {
                width: CELL_WIDTH,
                height: CELL_HEIGHT,
                regX: CELL_WIDTH / 2,
                regY: CELL_HEIGHT / 2
            },
            animations: {
                state_off_0: 0,
                state_off_1: 1,
                state_on: 2
            }
        };
        w = new createjs.SpriteSheet(w);
        q = createSprite(w, r, CELL_WIDTH / 2, CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
        m.addChild(q);
        y = createSprite(s_oPieceSettings.getSpriteSheet(1), "start", CELL_WIDTH / 2, CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
        y.visible = !1;
        m.addChild(y);
        r = [];
        for (w = 0; 22 > w; w++) r[w] = s_oSpriteLibrary.getSprite("particle_stars_" + w);
        w = {
            images: r,
            framerate: 30,
            frames: {
                width: r[0].width,
                height: r[0].height,
                regX: r[0].width / 2,
                regY: r[0].height / 2
            },
            animations: {
                start: 0,
                anim: [0, 21, "stop_anim"],
                stop_anim: 21
            }
        };
        w = new createjs.SpriteSheet(w);
        C = createSprite(w, "start", r[0].width / 2, r[0].height / 2, r[0].width, r[0].height);
        C.visible = !1;
        C.x = 0;
        C.y = 0;
        C.scale = .5;
        m.addChild(C);
        t = new createjs.Shape;
        t.graphics.beginFill("rgba(0,0,0,0.01)").drawRect(-CELL_WIDTH / 2, -CELL_HEIGHT_FAKE / 2, CELL_WIDTH, CELL_HEIGHT_FAKE);
        x = t.on("mousedown", this._onPress, this);
        m.addChild(t)
    };
    this.unload = function() {
        clearInterval(k);
        m.off("mousedown", x)
    };
    this.addEventListener = function(r, w, D) {
        n[r] = w;
        u[r] = D
    };
    this.reset = function() {
        if (g === LABEL_UNAVAILABLE) {
            h = LABEL_UNAVAILABLE;
            var r = 0 === b % 2 ? 0 === d % 2 ? "state_off_0" : "state_off_1" : 0 === d % 2 ? "state_off_1" : "state_off_0"
        } else h = LABEL_EMPTY, r = "state_on";
        q.gotoAndStop(r);
        y.visible = !1
    };
    this.setValue = function(r, w, D, B, H, I) {
        clearInterval(k);
        l = w;
        p = {
            row: D,
            col: B
        };
        A = I;
        g = r;
        y.scaleX = y.scaleY = 1.1;
        r === LABEL_EMPTY ? (h = LABEL_EMPTY, y.visible = !1, t.cursor = "default") : (t.cursor = "pointer", h = LABEL_FILL, y.visible = !0, y.spriteSheet = s_oPieceSettings.getSpriteSheet(r), H ? createjs.Tween.get(y).to({
            scaleX: 1,
            scaleY: 1
        }, 1500, createjs.Ease.elasticOut) : y.scaleX = y.scaleY = 1, k = setTimeout(function() {
            v._playIdleAnim()
        }, Math.floor(Math.random() * (MAX_TIME_IDLE - MIN_TIME_IDLE + 1)) + MIN_TIME_IDLE), C.visible = !0, C.gotoAndPlay("anim"));
        this.setAlpha(1)
    };
    this.setAlpha = function(r) {
        y.alpha = r
    };
    this._playIdleAnim = function() {
        y.gotoAndPlay("idle_" + Math.floor(3 * Math.random()));
        k = setTimeout(function() {
            v._playIdleAnim()
        }, Math.floor(Math.random() * (MAX_TIME_IDLE - MIN_TIME_IDLE + 1)) + MIN_TIME_IDLE)
    };
    this._onPress = function() {
        null !== A && n[ON_CELL_PRESS] && n[ON_CELL_PRESS].call(u[ON_CELL_PRESS], l, p, A)
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this.getType = function() {
        return g
    };
    this.getState = function() {
        return h
    };
    this._init(a, c, e)
}

function CPieceSettings() {
    var a, c, b;
    this._init = function() {
        a = [{
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }],
            type: 1,
            num_cell: 2
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 1,
                col: 0
            }],
            type: 2,
            num_cell: 2
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 0,
                col: 2
            }],
            type: 3,
            num_cell: 3
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 1,
                col: 0
            }, {
                row: 2,
                col: 0
            }],
            type: 4,
            num_cell: 3
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 1,
                col: 0
            }],
            type: 5,
            num_cell: 3
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 1,
                col: 0
            }, {
                row: 1,
                col: 1
            }],
            type: 6,
            num_cell: 3
        }, {
            list_pos: [{
                row: 0,
                col: 1
            }, {
                row: 1,
                col: 1
            }, {
                row: 1,
                col: 0
            }],
            type: 7,
            num_cell: 3
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 1,
                col: 1
            }],
            type: 8,
            num_cell: 3
        }, {
            list_pos: [{
                row: 0,
                col: 0
            }, {
                row: 0,
                col: 1
            }, {
                row: 1,
                col: 0
            }, {
                row: 1,
                col: 1
            }],
            type: 9,
            num_cell: 4
        }];
        NUM_PIECES = a.length;
        c = [];
        for (var d = 1; d < NUM_TYPES + 1; d++) {
            var e = {
                images: [s_oSpriteLibrary.getSprite("cell_" + d)],
                frames: {
                    width: CELL_WIDTH,
                    height: CELL_HEIGHT,
                    regX: CELL_WIDTH / 2,
                    regY: CELL_HEIGHT / 2
                },
                animations: {
                    start: 0,
                    idle_0: [0, 23, "start"],
                    idle_1: [24, 45, "start"],
                    idle_2: [46, 66, "start"],
                    drag: 67
                }
            };
            e = new createjs.SpriteSheet(e);
            c[d] = e
        }
        b = [];
        for (d = 0; d < NUM_PIECES; d++) b[d] = {
            width: CELL_WIDTH,
            height: CELL_HEIGHT
        };
        b[9] = {
            width: 350,
            height: 350
        };
        b[10] = {
            width: 98,
            height: 108
        };
        b[11] = {
            width: 350,
            height: 350
        };
        b[12] = {
            width: 98,
            height: 108
        }
    };
    this.getRandPieceInfos = function() {
        return a[Math.floor(Math.random() * NUM_PIECES)]
    };
    this.getPieceInfos = function(d) {
        return a[d]
    };
    this.getSpriteSheet = function(d) {
        return c[d]
    };
    this.getCellSize = function(d) {
        return b[d]
    };
    this._init()
}

function CPiece(a, c, b, d, e, f, g, h, k) {
    var l, p, n = d,
        u, x, q, A, y, C, t, m, v = this;
    this._init = function(r, w, D, B, H) {
        -1 === n && (n = Math.floor(Math.random() * NUM_TYPES) + 1);
        x = [];
        q = [];
        l = r;
        p = w;
        y = D;
        m = new createjs.Container;
        m.x = r;
        m.y = w;
        k.addChild(m);
        u = [];
        r = D.list_pos;
        for (w = 0; w < r.length; w++) {
            D = r[w].col * CELL_WIDTH;
            var I = r[w].row * CELL_HEIGHT_FAKE,
                N = createSprite(s_oPieceSettings.getSpriteSheet(n), "start", CELL_WIDTH / 2, CELL_HEIGHT / 2, CELL_WIDTH, CELL_HEIGHT);
            N.x = D + CELL_WIDTH / 2;
            N.y = I + CELL_HEIGHT / 2;
            m.addChild(N);
            u.push(N)
        }
        m.scaleX = m.scaleY = .01;
        m.regX = m.getBounds().width / 2;
        m.regY = m.getBounds().height / 2;
        m.sortChildren(function(O, T, G) {
            return O.y > T.y ? -1 : O.y < T.y ? 1 : 0
        });
        t = new createjs.Shape;
        t.graphics.beginFill("red").drawRect(-50, -50, m.getBounds().width + 100, m.getBounds().height + 100);
        t.alpha = .01;
        m.addChild(t);
        createjs.Tween.get(m).wait(B).to({
            scaleX: H,
            scaleY: H
        }, 700, createjs.Ease.elasticOut).call(function() {
            v._initMouseListeners()
        })
    };
    this.unload = function() {
        t.off("mousedown", C);
        k.removeChild(m)
    };
    this.disableListeners = function() {
        t.off("mousedown", C)
    };
    this.addEventListener = function(r, w, D) {
        x[r] = w;
        q[r] = D
    };
    this._initMouseListeners = function() {
        C = t.on("mousedown", v._onPress)
    };
    this.setVisible = function(r) {
        m.visible = r
    };
    this.resetPos = function() {
        createjs.Tween.removeTweens(m);
        for (var r = 0; r < u.length; r++) u[r].gotoAndStop("start");
        m.x = l;
        m.y = p;
        m.scaleX = m.scaleY = SCALE_STARTING_PIECE
    };
    this.scaleWithTween = function(r) {
        createjs.Tween.get(m).to({
            scale: r
        }, 500, createjs.Ease.cubicOut)
    };
    this._onPress = function(r) {
        if (null === s_oBoard.getCurDraggingPiece()) {
            playSound("click", 1, !1);
            v.scaleWithTween(1);
            for (var w = 0; w < u.length; w++) u[w].gotoAndStop("drag");
            v.refreshGlobalPos(r.stageX, r.stageY);
            t.on("pressmove", s_oBoard.onMovePiece, s_oBoard);
            A = s_oStage.on("stagemouseup", v._onRelease, v);
            x[ON_SELECT_PIECE] && x[ON_SELECT_PIECE].call(q[ON_SELECT_PIECE], v)
        }
    };
    this._onRelease = function() {
        t.off("pressmove", A);
        s_oStage.off("stagemouseup", A);
        s_oBoard.onReleasePiece()
    };
    this.refreshGlobalPos = function(r, w) {
        var D = k.globalToLocal(r, w);
        m.x = D.x;
        m.y = s_bMobile ? D.y - OFFSET_PIECE_Y : D.y - 10
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this.getGlobalPos = function() {
        return k.localToGlobal(m.x - m.getBounds().width / 2 + CELL_WIDTH, m.y - m.getBounds().height / 2 + CELL_HEIGHT_FAKE)
    };
    this.getInfos = function() {
        return y
    };
    this.getIndex = function() {
        return a
    };
    this.getType = function() {
        return n
    };
    this.getInfoIndex = function() {
        return e
    };
    this.isVisible = function() {
        return m.visible
    };
    this._init(c, b, f, g, h)
}

function CHelp() {
    var a, c, b, d, e, f = this;
    this._init = function() {
        d = new createjs.Container;
        d.visible = !1;
        s_oStage.addChild(d);
        b = new createjs.Shape;
        b.graphics.beginFill("rgba(0,0,0,0.7)").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        d.addChild(b);
        e = new createjs.Container;
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT / 2;
        d.addChild(e);
        c = s_oSpriteLibrary.getSprite("msg_box");
        var g = createBitmap(c);
        e.addChild(g);
        g = s_oSpriteLibrary.getSprite("help_sprite");
        var h = createBitmap(g);
        h.regX = g.width / 2;
        h.regY = g.height / 2;
        h.x = c.width / 2;
        h.y = c.height / 2 - 130;
        e.addChild(h);
        new CTLText(e, c.width / 2 - 360, c.height / 2 + 120, 720, 240, 80, "center", "#fff", FONT, 1, 0, 0, TEXT_HELP, !0, !0, !0, !1);
        a = d.on("click", this._onSkip, this);
        e.regX = c.width / 2;
        e.regY = c.height / 2
    };
    this.unload = function() {
        d.off("click", a)
    };
    this.show = function() {
        d.visible = !0;
        b.alpha = 0;
        createjs.Tween.get(b).to({
            alpha: .7
        }, 400, createjs.Ease.cubicOut);
        e.scale = 0;
        createjs.Tween.get(e).wait(400).to({
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        }, 1E3, createjs.Ease.elasticOut)
    };
    this.hide = function() {
        createjs.Tween.get(b).to({
            alpha: 0
        }, 400, createjs.Ease.cubicOut);
        createjs.Tween.get(e).to({
            scaleX: .1,
            scaleY: .1,
            alpha: .5
        }, 400, createjs.Ease.backIn).call(function() {
            d.visible = !1;
            s_oGame.onExitHelp()
        })
    };
    this._onSkip = function() {
        f.hide()
    };
    this._init()
}

function CGameOver() {
    var a, c, b, d, e, f, g, h, k, l, p, n = this;
    this._init = function() {
        l = new createjs.Container;
        l.visible = !1;
        s_oStage.addChild(l);
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a = k.on("click", function() {});
        l.addChild(k);
        p = new createjs.Container;
        p.x = CANVAS_WIDTH / 2;
        p.y = CANVAS_HEIGHT / 2;
        l.addChild(p);
        c = s_oSpriteLibrary.getSprite("msg_box");
        var u = createBitmap(c);
        p.addChild(u);
        d = new CTLText(p, c.width / 2 - 300, 100, 600, 160, 80, "center", "#fff", FONT, 1, 0, 0, " ", !0, !0, !1, !1);
        b = new CTLText(p, c.width / 2 - 360, c.height / 2 - 130, 720, 50, 70, "center", "#fff", FONT, 1, 0, 0, TEXT_SCORE, !0, !0, !1, !1);
        e = new CTLText(p, c.width / 2 - 360, c.height / 2 - 10, 720, 100, 90, "center", "#fff", FONT, 1, 0, 0, TEXT_TOT_SCORE + "\n" + s_iTotalScore, !0, !0, !0, !1);
        g = new CGfxButton(c.width / 2 - 240, c.height - 200, s_oSpriteLibrary.getSprite("but_home"), p);
        g.addEventListener(ON_MOUSE_UP, this._onHome, this);
        f = new CGfxButton(c.width / 2, c.height - 200, s_oSpriteLibrary.getSprite("but_restart_big"), p);
        f.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        h = new CGfxButton(c.width / 2 + 240, c.height - 200, s_oSpriteLibrary.getSprite("but_next_level"), p);
        h.addEventListener(ON_MOUSE_UP, this._onNext, this);
        new CRollingScore;
        p.regX = c.width / 2;
        p.regY = c.height / 2
    };
    this.unload = function() {
        k.on("click", a);
        g.unload();
        f.unload();
        h.unload()
    };
    this.show = function(u, x, q) {
        s_bMobile || $("#div_display_id").css("display", "block");
        b.refreshText(TEXT_SCORE + " " + u);
        d.refreshText(sprintf(TEXT_GAME_OVER, x));
        e.refreshText(TEXT_TOT_SCORE + "\n" + s_iTotalScore);
        q ? (h.setVisible(!1), f.setX(c.width / 2 + 150)) : (h.setVisible(!0), f.setX(c.width / 2));
        l.visible = !0;
        k.alpha = 0;
        createjs.Tween.get(k).to({
            alpha: .7
        }, 400, createjs.Ease.cubicOut).call(function() {
            playSound("game_over", 1, !1)
        });
        p.scaleX = p.scaleY = .01;
        p.alpha = 0;
        createjs.Tween.get(p).wait(1E3).to({
            scaleX: 1,
            scaleY: 1,
            alpha: 1
        }, 1E3, createjs.Ease.elasticOut)
    };
    this.hide = function() {
        $("#div_display_id").css("display", "none");
        createjs.Tween.get(k).to({
            alpha: 0
        }, 400, createjs.Ease.cubicOut);
        createjs.Tween.get(p).to({
            scaleX: .1,
            scaleY: .1,
            alpha: .5
        }, 400, createjs.Ease.backIn).call(function() {
            l.visible = !1
        })
    };
    this._onHome = function() {
        s_oGame.onExit()
    };
    this._onRestart = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.restart();
        n.hide()
    };
    this._onNext = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        s_oGame.nextLevel();
        n.hide()
    };
    this._init()
}

function clearLocalStorage() {
    s_iTotalScore = 0;
    if (s_bStorageAvailable)
        for (var a = 0; a < localStorage.length;) {
            var c = localStorage.key(a); - 1 !== c.indexOf(GAME_NAME) ? localStorage.removeItem(c) : a++
        }
}

function setLocalStorageFirstGame(a) {
    s_bStorageAvailable && saveItem(GAME_NAME + "_first_game", a)
}

function isFirstGame() {
    if (s_bStorageAvailable) return null === getItem(GAME_NAME + "_first_game") ? !0 : !1
}

function setLocalStorageScore(a, c, b) {
    s_bStorageAvailable && saveItem(GAME_NAME + "_score_diff_" + c + "_level_" + b, a)
}

function getLevelScore(a, c) {
    if (!s_bStorageAvailable) return 0;
    var b = getItem(GAME_NAME + "_score_diff_" + a + "_level_" + c);
    return b ? parseInt(b) : 0
}

function getScoreTillLevel(a, c) {
    if (!s_bStorageAvailable) return 0;
    for (var b = 0, d = 0; d <= c; d++) b += getLevelScore(a, d);
    return b
}

function setLocalStorageLevel(a, c) {
    if (s_bStorageAvailable) {
        var b = getItem(GAME_NAME + "_diff_" + a + "_level");
        if (null === b || b < c) s_iLastLevel = c, saveItem(GAME_NAME + "_diff_" + a + "_level", s_iLastLevel)
    }
}

function getSavedLevel(a) {
    if (!s_bStorageAvailable) return 0;
    a = getItem(GAME_NAME + "_diff_" + a + "_level");
    return null === a ? 0 : a
}
var MS_ROLLING_SCORE = 750;

function CRollingScore() {
    var a = null,
        c = null;
    this.rolling = function(b, d, e) {
        e > parseInt(b.text) ? b.color = "#fff" : e < parseInt(b.text) && (b.color = "#ae0000");
        a = createjs.Tween.get(b).to({
            text: e
        }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).call(function() {
            createjs.Tween.removeTweens(a);
            b.color = "#fff"
        }).addEventListener("change", function() {
            b.text = Math.floor(b.text)
        });
        null !== d && (c = createjs.Tween.get(d).to({
            text: e
        }, MS_ROLLING_SCORE, createjs.Ease.cubicOut).call(function() {
            createjs.Tween.removeTweens(c)
        }).addEventListener("change", function() {
            d.text = Math.floor(d.text)
        }))
    };
    return this
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
        this._oText = new createjs.Text(a, this._iFontSize + "px " + this._szFont, this._szColor);
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
    setY: function(a) {
        this._y = a;
        this._oText.y = a;
        this._oDebugShape && (this._oDebugShape.y = a - this._iHeight)
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
        this._oText.alpha = a;
        this._oDebugShape && (this._oDebugShape.alpha = a)
    },
    removeTweens: function() {
        createjs.Tween.removeTweens(this._oText)
    },
    getText: function() {
        return this._oText
    },
    getMsg: function() {
        return this._oText.text
    },
    getX: function() {
        return this._x
    },
    getY: function() {
        return this._y
    },
    getFontSize: function() {
        return this._iFontSize
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

function CTLText(a, c, b, d, e, f, g, h, k, l, p, n, u, x, q, A, y) {
    this._oContainer = a;
    this._x = c;
    this._y = b;
    this._iWidth = d;
    this._iHeight = e;
    this._bMultiline = A;
    this._iStartingFontSize = this._iFontSize = f;
    this._szAlign = g;
    this._szColor = h;
    this._szFont = k;
    this._iPaddingH = p;
    this._iPaddingV = n;
    this._bVerticalAlign = q;
    this._bFitText = x;
    this._bDebug = y;
    this._oDebugShape = null;
    this._fLineHeightFactor = l;
    this._oText = null;
    u && this.__createText(u)
}
var PIECE_POSITION = [];
PIECE_POSITION[3] = [{
    x: X_PIECE_ATTACH - 360,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 360,
    y: Y_PIECE_ATTACH
}];
PIECE_POSITION[4] = [{
    x: X_PIECE_ATTACH - 333,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 111,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 111,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 333,
    y: Y_PIECE_ATTACH
}];
PIECE_POSITION[5] = [{
    x: X_PIECE_ATTACH - 420,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 215,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 215,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 420,
    y: Y_PIECE_ATTACH
}];
PIECE_POSITION[6] = [{
    x: X_PIECE_ATTACH - 360,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 360,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 360,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 360,
    y: Y_PIECE_ATTACH + 170
}];
PIECE_POSITION[7] = [{
    x: X_PIECE_ATTACH - 333,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 111,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 111,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 333,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 360,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 360,
    y: Y_PIECE_ATTACH + 170
}];
PIECE_POSITION[8] = [{
    x: X_PIECE_ATTACH - 333,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 111,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 111,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 333,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 333,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH - 111,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 111,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 333,
    y: Y_PIECE_ATTACH + 170
}];
PIECE_POSITION[9] = [{
    x: X_PIECE_ATTACH - 370,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 185,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 185,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 370,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 333,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH - 111,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 111,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 333,
    y: Y_PIECE_ATTACH + 170
}];
PIECE_POSITION[10] = [{
    x: X_PIECE_ATTACH - 370,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 185,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 185,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH + 370,
    y: Y_PIECE_ATTACH
}, {
    x: X_PIECE_ATTACH - 370,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH - 185,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 185,
    y: Y_PIECE_ATTACH + 170
}, {
    x: X_PIECE_ATTACH + 370,
    y: Y_PIECE_ATTACH + 170
}];
var MAX_TIME_LEVEL_RESOLUTION = [, , , 18E3, 45E3, 6E4, 9E4, 15E4, 18E4, 21E4, 3E5],
    LEVELS = [
        [],
        [],
        [],
        [{
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 10
            }, {
                index: 5,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 8
            }, {
                index: 8,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, 4, 4, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 7
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 7, -1, -1, -1, -1, -1, -1, -1, 6, 3, 7, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 3
            }, {
                index: 7,
                type: 7
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, 1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 1
            }, {
                index: 7,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 6
            }, {
                index: 5,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, 4, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 9, -1, -1, -1, -1, -1, -1, -1, 1, 1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 5,
                type: 1
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1,
                9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 6,
                type: 9
            }, {
                index: 6,
                type: 2
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 2,
                type: 8
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, 10, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 1,
                type: 3
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 4, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 2, 2, 2, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, -1, -1, -1, -1, -1, -1, -1, 9, 9, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 5
            }, {
                index: 1,
                type: 4
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 2, 2, -1, -1, -1, -1, -1, -1, -1, 7, -1, 2, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 3,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, 1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 1
            }, {
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 1
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 7, 7, -1, -1, -1, -1, -1, -1, -1, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 9
            }, {
                index: 8,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1,
                5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 3, 3, 8, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 4,
                type: 3
            }, {
                index: 4,
                type: 5
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 8
            }, {
                index: 7,
                type: 1
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 6, 6, -1, -1, -1, -1, -1, -1, 9, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 8,
                type: 6
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1, 4, -1, 6, 6, -1, -1, -1, -1, -1, -1, 4, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 2
            }, {
                index: 3,
                type: 4
            }, {
                index: 8,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 2, 2, -1, -1, -1, -1, -1, -1, 9, 10, 10, -1, -1, -1, -1, -1, -1, -1, 9, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 2
            }, {
                index: 6,
                type: 1
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 5
            }, {
                index: 3,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 6
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 6,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2,
                2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 5,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, 3, 6, 6, 10, -1, -1, -1, -1, -1, -1, 3, -1, 6, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 7,
                type: 10
            }, {
                index: 7,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 4
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 2
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 3, 3, 3, -1, -1, -1, -1, -1, -1, 6, -1, 4, -1, -1, -1, -1, -1, -1, -1, 6, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 3,
                type: 6
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 5, 5, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 8, 8, -1, -1, -1, -1, -1, -1, 4, -1, -1, 8, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 3, 3, -1, -1, -1, -1, -1, -1, -1, 7, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 3
            }, {
                index: 1,
                type: 7
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 6, -1, -1, -1, -1, -1, -1, -1, 7, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 1,
                type: 7
            }, {
                index: 4,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 6
            }, {
                index: 4,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 2
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, -1, -1, -1, -1, -1, -1, -1, 8, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 9
            }, {
                index: 6,
                type: 8
            }, {
                index: 7,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 10
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 10, 10, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, -1, -1, -1, -1, -1, -1, 1, 1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 6,
                type: 1
            }, {
                index: 6,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 2, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 9
            }, {
                index: 3,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 6,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 5
            }, {
                index: 4,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, 5, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 5,
                type: 2
            }, {
                index: 3,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 6, -1, -1, -1, -1, -1, -1, -1, 10, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 2
            }, {
                index: 7,
                type: 6
            }, {
                index: 5,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 4,
                type: 4
            }, {
                index: 8,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 8, 8, -1, -1, -1, -1, -1, -1, 7, 6, 6, 6, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 2,
                type: 6
            }, {
                index: 3,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, -1, -1, -1, -1, -1, -1, -1, 10, 10, 8, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 2,
                type: 7
            }, {
                index: 6,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, 1, 2, 2, -1, -1, -1, -1, -1, -1, 1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 7
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 9
            }, {
                index: 4,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, 9, 9, -1, -1, -1, -1, -1, -1, 4, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 9
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 4
            }]
        }],
        [{
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 9, 9, -1, -1, -1, -1, -1, -1, -1, 7, 4, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 7,
                type: 5
            }, {
                index: 6,
                type: 7
            }, {
                index: 3,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 1,
                type: 1
            }, {
                index: 8,
                type: 3
            }, {
                index: 7,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 3, 2, -1, -1, -1, -1, -1, -1, 8, 8, 3, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 8
            }, {
                index: 1,
                type: 4
            }, {
                index: 3,
                type: 3
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 9
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 9
            }, {
                index: 6,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 6,
                type: 10
            }, {
                index: 5,
                type: 9
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, 4, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 3,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, 6, 6, -1, -1, -1, -1, -1, -1, 9, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 5,
                type: 4
            }, {
                index: 4,
                type: 1
            }, {
                index: 3,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, -1, -1, -1, -1, -1, -1, -1, 10, 10, 2, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 9
            }, {
                index: 5,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 9
            }, {
                index: 6,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 4
            }, {
                index: 7,
                type: 5
            }, {
                index: 4,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 4
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 3
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 7, -1, -1, -1, -1, -1, -1, -1, 9, 9, 7, 3, 3, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 8,
                type: 9
            }, {
                index: 7,
                type: 5
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 5,
                type: 3
            }, {
                index: 6,
                type: 1
            }, {
                index: 5,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 2
            }, {
                index: 3,
                type: 4
            }, {
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, 10, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 1
            }, {
                index: 3,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, 9, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 5
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 3,
                type: 3
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 3
            }, {
                index: 6,
                type: 9
            }, {
                index: 6,
                type: 1
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, 4, -1, -1, -1, -1, -1, -1, 7, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 1,
                type: 9
            }, {
                index: 8,
                type: 7
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 7, 7, -1, -1, -1, -1, -1, -1, 10, 1, 1, 7, -1, -1, -1, -1, -1, -1, -1, 1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 6
            }, {
                index: 7,
                type: 7
            }, {
                index: 4,
                type: 10
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, 2, -1, 7, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 7,
                type: 7
            }, {
                index: 3,
                type: 2
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, 5, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 5,
                type: 4
            }, {
                index: 5,
                type: 5
            }, {
                index: 3,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1,
                6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 5
            }, {
                index: 8,
                type: 6
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, 2, 5, 5, -1, 7, -1, -1, -1, -1, -1, 2, 2, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 2
            }, {
                index: 6,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, 10, 6, 8, -1, -1, -1, -1, -1, -1, -1, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 3,
                type: 6
            }, {
                index: 5,
                type: 3
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 8, -1, -1, -1, -1, -1, -1, -1, 7, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 5
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, 2, 2, -1, 8, -1, -1, -1, -1, -1, -1, 2, 2, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 9
            }, {
                index: 8,
                type: 2
            }, {
                index: 1,
                type: 8
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 10, 10, -1, -1, -1, -1, -1, 5, 5, 4, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 4
            }, {
                index: 6,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1,
                2, 2, -1, -1, -1, -1, -1, 7, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 10, 10, 5, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 2
            }, {
                index: 5,
                type: 7
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, 8, 8, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 4,
                type: 7
            }, {
                index: 2,
                type: 8
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 4
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 3, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 8
            }, {
                index: 5,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, 1, -1, -1, -1, -1, -1, -1, -1, 7, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 7,
                type: 7
            }, {
                index: 6,
                type: 10
            }, {
                index: 5,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 7, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 5,
                type: 7
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 4, 10, 10, -1, -1, -1, -1, -1, -1, -1, 4, 10, 10, -1, -1, -1, -1, -1, -1, -1, 4, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 3,
                type: 4
            }, {
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 3, 3, -1, -1, -1, -1, -1, -1, 10, 10, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 10
            }, {
                index: 8,
                type: 3
            }, {
                index: 8,
                type: 4
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 3, 3, -1, -1, -1, -1, -1, -1, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 3,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 6, 6, -1, -1, -1, -1, -1, 8, 3, 3, -1, -1, -1, -1, -1, -1, -1, 8, 8, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 5
            }, {
                index: 5,
                type: 8
            }, {
                index: 5,
                type: 3
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 2
            }, {
                index: 4,
                type: 8
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 5,
                type: 5
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, 2, 10, 10, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 2
            }, {
                index: 2,
                type: 8
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, 5, 10, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 5
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 7, 7, -1, -1, -1, -1, -1, -1, 10, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 4,
                type: 5
            }, {
                index: 3,
                type: 9
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 9
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 3, 3, 3, -1, -1, -1, -1, -1, -1, 1, 1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 7,
                type: 10
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 9, 9, 9, -1, -1, -1, -1, -1, -1, 2, 6, 6, -1, -1, -1, -1, -1, -1, -1, 5, 5, 6, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 2,
                type: 9
            }, {
                index: 1,
                type: 2
            }, {
                index: 7,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 7
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, -1, -1, -1, -1, -1, -1, -1, 8, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 5
            }, {
                index: 6,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 2, -1, -1, -1, -1, -1, -1, 3, 3, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 2
            }, {
                index: 6,
                type: 3
            }, {
                index: 6,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 4, -1, -1, -1, -1, -1, -1, -1, 2, -1, 4, 4, -1, -1, -1, -1, -1, -1, 2, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 2
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, 1, 1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 9
            }, {
                index: 7,
                type: 1
            }, {
                index: 8,
                type: 4
            }, {
                index: 8,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 6
            }, {
                index: 5,
                type: 1
            }, {
                index: 7,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, 3, 6, 6, 6, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 8
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 8, 8, 8, -1, -1, -1, -1, -1, 7, 5, 3, 3, -1, -1, -1, -1, -1, -1, -1, 5, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 3
            }, {
                index: 4,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 6
            }, {
                index: 6,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 9,
                9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 5
            }, {
                index: 8,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, 8, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 6,
                type: 5
            }, {
                index: 6,
                type: 10
            }, {
                index: 8,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, 8, -1, -1, -1, -1, -1, -1, -1, 3, 8, 8, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 6,
                type: 8
            }, {
                index: 2,
                type: 7
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 3,
                type: 2
            }, {
                index: 5,
                type: 6
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 9
            }, {
                index: 6,
                type: 10
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 4,
                type: 1
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 4, 4, 10, -1, -1, -1, -1, -1, -1, 6, 4, 4, 10, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 6
            }, {
                index: 8,
                type: 4
            }, {
                index: 1,
                type: 10
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 1, 1, -1, -1, -1, -1, -1, -1, 2, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 4
            }, {
                index: 4,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 6,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 6, 9, -1, -1, -1, -1, -1, -1, -1, 6, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 3,
                type: 10
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, 10, -1, -1, -1, -1, -1, -1, -1, 6, -1, 10, -1, -1, -1, -1, -1, -1, -1, 6, 9, 9, 9, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 6
            }, {
                index: 8,
                type: 3
            }, {
                index: 7,
                type: 10
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, -1, -1, -1, -1, -1, -1, 10, 10, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 7,
                type: 2
            }]
        }],
        [{
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, 10, 10, -1, -1, -1, -1, -1, 6, 6, 5, 1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 6
            }, {
                index: 3,
                type: 1
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, 8, -1, -1, -1, -1, -1, -1, -1, 9, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 3,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 9, -1, -1, -1, -1, -1, -1, 1, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 8,
                type: 5
            }, {
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, 4, 10, 1, 1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 1,
                type: 4
            }, {
                index: 1,
                type: 10
            }, {
                index: 4,
                type: 3
            }, {
                index: 6,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, -1, -1, -1, -1, -1, -1, -1, 4, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 7,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 9
            }, {
                index: 4,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 5, 9, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 5
            }, {
                index: 6,
                type: 6
            }, {
                index: 1,
                type: 9
            }, {
                index: 4,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 1, 1, -1, -1, -1, -1, -1, -1, 3, 3, 1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 6,
                type: 7
            }, {
                index: 1,
                type: 5
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, 8, 1, 5, 5, -1, -1, -1, -1, -1, -1, 8, 1, 5, 5, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 8,
                type: 4
            }, {
                index: 8,
                type: 5
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 1, 1, 1, -1, -1, -1, -1, -1, 9, 9, 3, 2, 2, -1, -1, -1, -1, -1, -1, -1, 3, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 2
            }, {
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 3
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 7, -1, 2, -1, -1, -1, -1, -1, -1, -1, 7, -1, 2, 2, -1, -1, -1, -1, -1, -1, 7, -1, 4, 4, 5, 5, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 7
            }, {
                index: 5,
                type: 2
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 10
            }, {
                index: 4,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 6, 6, -1, -1, -1, -1, -1, -1, -1, 1, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 9
            }, {
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 4
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, 10, 10, -1, -1, -1, -1, -1, -1, 7, 7, 1, 10, -1, -1, -1, -1, -1, -1, 7, 1, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 10
            }, {
                index: 6,
                type: 1
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, 2, 2, 2, 7, 7, -1, -1, -1, -1, 1, 1, -1, 10, 7, -1, -1, -1, -1, -1, -1, 1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 3,
                type: 10
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 1
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [-1, -1, 10, 10, 10, 5, -1, -1, -1, -1, -1, -1, 4, 4, 4, 5, -1, -1, -1, -1, -1, -1, 7, 7, -1, 5, 3, -1, -1, -1, -1, -1, 7, 7, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 5
            }, {
                index: 2,
                type: 4
            }, {
                index: 8,
                type: 7
            }, {
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 5, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 10
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 10, 10, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 8, 8, 2, 2, -1, -1, -1, -1, -1, 3, 3, 8, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 8,
                type: 2
            }, {
                index: 6,
                type: 6
            }, {
                index: 7,
                type: 8
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, 9, 9, 9, -1, -1, -1, -1, -1, -1, 8, 1, 1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 1
            }, {
                index: 2,
                type: 9
            }, {
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, 2, 2, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 10
            }, {
                index: 2,
                type: 9
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 3, 3, -1, -1, -1, -1, -1, -1, 10, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 9
            }, {
                index: 7,
                type: 1
            }, {
                index: 8,
                type: 10
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, 6, 6, -1, -1, -1, -1, -1, -1, 4, 4, 4, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 6
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 8, -1, -1, -1, -1, -1, -1, 4, 4, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 8,
                type: 8
            }, {
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 3,
                type: 6
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 3
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, 2, 2, -1, -1, -1, -1, -1, -1, 8, 8, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 9
            }, {
                index: 2,
                type: 8
            }, {
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, 7, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 2
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [-1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, 1, 7, 7, 7, -1, -1, -1, -1, -1, 6, 6, -1, 8, -1, -1, -1, -1, -1, -1, 6, 6, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 8
            }, {
                index: 8,
                type: 6
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, 3, 3, 1, 6, -1, -1, -1, -1, -1, -1, -1, 1, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 3,
                type: 6
            }, {
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 7
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, -1, -1, -1, -1, -1, -1, -1, 10, -1, 2, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 10
            }, {
                index: 8,
                type: 9
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 4, -1, 5, 5, -1, -1, -1, -1, -1, -1, 4, 10, 10, 10, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 4,
                type: 6
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 10, 10, 1, -1, -1, -1, -1, -1, -1, -1, 9, -1, 1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 9
            }, {
                index: 2,
                type: 3
            }, {
                index: 3,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 6, 4, 4, 4, -1, -1, -1, -1, -1, -1, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 2
            }, {
                index: 4,
                type: 3
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 1
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 6, 6, 9, -1, -1, -1, -1, -1, -1, 7, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 7, 9, 9, 9, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 9
            }, {
                index: 5,
                type: 8
            }, {
                index: 5,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, 1, 1, -1, -1, -1, -1, -1, -1, 9, 9, 6, 10, -1, -1, -1, -1, -1, -1, -1, 6, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 2
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 6, 8, 2, 5, -1, -1, -1, -1, -1, -1, 6, 8, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 7,
                type: 1
            }, {
                index: 6,
                type: 5
            }, {
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 8, -1, -1, -1, -1, -1, -1, -1, 2, 2, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 8,
                type: 2
            }, {
                index: 8,
                type: 4
            }, {
                index: 7,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 7, 8, -1, -1, -1, -1, -1, -1, -1, 7, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 6,
                type: 7
            }, {
                index: 6,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, 9, 7, 7, -1, -1, -1, -1, -1, 1, 1, 9, 7, 7, -1, -1, -1, -1, -1, -1, 1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 7,
                type: 9
            }, {
                index: 8,
                type: 7
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, 10, 10, 2, 2, -1, -1, -1, -1, -1, -1, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 7
            }, {
                index: 8,
                type: 1
            }, {
                index: 5,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, 3, 3, -1, -1, -1, -1, -1, 9, -1, 5, 5, 3, -1, -1, -1, -1, -1, 9, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 4
            }, {
                index: 7,
                type: 3
            }, {
                index: 1,
                type: 9
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 5, 5, 5, -1, -1, -1, -1, -1, -1, 8, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 3
            }, {
                index: 4,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 9, -1, -1, -1, -1, -1, -1, -1, 8, 4, 9, 10, -1, -1, -1, -1, -1, -1, 8, 4, 9, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 5,
                type: 10
            }, {
                index: 3,
                type: 4
            }, {
                index: 3,
                type: 9
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, 1, 3, 4, 4, -1, -1, -1, -1, -1, 1, 1, 3, 2, 2, 2, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 10
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 3, 4, 4, -1, -1, -1, -1, -1, -1, 6, 3, 1, -1, -1, -1, -1, -1, -1, -1, 6, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 3
            }, {
                index: 3,
                type: 1
            }, {
                index: 3,
                type: 6
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 10, 10, 1, 1, -1, -1, -1, -1, -1, -1, 10, 10, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 6,
                type: 5
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, 2, 2, -1, -1, -1, -1, -1, -1, 6, 8, 8, 7, 7, -1, -1, -1, -1, -1, -1, 8, 8, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 1
            }, {
                index: 3,
                type: 6
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 8
            }, {
                index: 7,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, 2, 2, 3, 3, 3, -1, -1, -1, -1, -1, 1, -1, 4, 4, -1, -1, -1, -1, -1, -1, 1, -1, 4, 4, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 3,
                type: 1
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 3,
                type: 6
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 8, 8, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 7
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 3
            }, {
                index: 8,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 3, -1, -1, -1, -1, -1, -1, 7, 5, 3, 3, -1, -1, -1, -1, -1, -1, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 1,
                type: 7
            }, {
                index: 6,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, -1, -1, -1, -1, -1, -1, -1, 4, 4, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 5,
                type: 8
            }, {
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, 9, 2, 2, 6, -1, -1, -1, -1, -1, -1, 9, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 5
            }, {
                index: 1,
                type: 9
            }, {
                index: 1,
                type: 8
            }, {
                index: 7,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, 1, -1, -1, -1, -1, -1, -1, 4, 6, 6, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, 7, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 2
            }, {
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 8
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, 1, 1, -1, -1, -1, -1, -1, 7, 7, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 3,
                type: 8
            }, {
                index: 8,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 7, 7, -1, -1, -1, -1, -1, -1, 10, 1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 2
            }, {
                index: 3,
                type: 1
            }, {
                index: 3,
                type: 10
            }, {
                index: 2,
                type: 3
            }, {
                index: 7,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, 8, 8, -1, -1, -1, -1, 6, 6, 7, 7, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 10
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 7
            }, {
                index: 3,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 5, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 2
            }, {
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 3
            }, {
                index: 6,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 4, -1, -1, -1, -1, -1, -1, -1, -1, 10, 4, 4, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 10
            }, {
                index: 5,
                type: 4
            }, {
                index: 8,
                type: 9
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 10, 10, -1, -1, -1, -1, -1, 2, 2, 5, 10, -1, -1, -1, -1, -1, -1, 2, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 2
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 5,
                type: 3
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, 1, 1, -1, -1, -1, -1, -1, -1, 7, 7, 7, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 3,
                type: 4
            }, {
                index: 1,
                type: 3
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [-1, -1, 2, 2, 7, -1, -1, -1, -1, -1, -1, -1, 6, 6, 7, -1, -1, -1, -1, -1, -1, -1, 1, -1, 9, 9, -1, -1, -1, -1, -1, -1, 1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 9
            }, {
                index: 1,
                type: 1
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, 8, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 3,
                type: 7
            }, {
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, 8, -1, -1, -1, -1, -1, -1, 7, 7, 3, 8, 8, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, 10, -1, -1, -1, -1, -1, -1, 6, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 4,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 6,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, 2, 9, -1, -1, -1, -1, -1, -1, -1, 2, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 7, 4, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 7
            }, {
                index: 7,
                type: 9
            }, {
                index: 4,
                type: 2
            }, {
                index: 5,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 10, 10, -1, -1, -1, -1, -1, -1, 5, 1, 1, 10, 9, 9, -1, -1, -1, -1, -1, -1, 1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 7,
                type: 10
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 6, 6, -1, -1, -1, -1, -1, -1, 5, 5, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 8,
                type: 2
            }, {
                index: 2,
                type: 4
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 10, 10, 10, -1, -1, -1, -1, 4, 4, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 4
            }, {
                index: 2,
                type: 10
            }, {
                index: 1,
                type: 9
            }, {
                index: 7,
                type: 1
            }]
        }],
        [{
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 9, 3, 3, 3, -1, -1, -1, -1, -1, -1, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 4,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 3,
                type: 9
            }, {
                index: 1,
                type: 10
            }, {
                index: 8,
                type: 7
            }]
        }, {
            grid: [-1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 3, 3, 2, -1, -1, -1, -1, -1, -1, -1, 3, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 5,
                type: 2
            }, {
                index: 5,
                type: 5
            }, {
                index: 4,
                type: 3
            }, {
                index: 1,
                type: 1
            }, {
                index: 3,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 8
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 1, 1, -1, -1, -1, -1, -1, -1, 3, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 0,
                type: 5
            }, {
                index: 4,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 3, 3, -1, -1, -1, -1, -1, -1, -1, 5, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 7, 7, -1, -1, -1, -1, -1, -1, 8, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 7,
                type: 7
            }, {
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 8
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, -1, 2, 2, -1, -1, -1, -1, -1, 10, 1, 1, 1, 2, -1, -1, -1, -1, -1, 5, 5, -1, -1, 9, 9, -1, -1, -1, -1, 5, 5, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 8,
                type: 5
            }, {
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 10
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [9, 9, 9, 1, 1, -1, -1, -1, -1, -1, 6, 10, 10, 1, 1, -1, -1, -1, -1, -1, 6, 10, -1, -1, 2, 2, -1, -1, -1, -1, 6, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 6
            }, {
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 4
            }, {
                index: 4,
                type: 10
            }, {
                index: 2,
                type: 9
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [-1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, -1, -1, -1, -1, -1, -1, -1, 9, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, 6, -1, -1, -1, -1, -1, -1, 7, 7, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 5
            }, {
                index: 1,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 7
            }, {
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, 7, -1, -1, -1, -1, -1, -1, 6, 6, 7, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 5,
                type: 2
            }, {
                index: 6,
                type: 6
            }, {
                index: 0,
                type: 8
            }, {
                index: 8,
                type: 10
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [-1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, 10, 10, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 2, 2, 2, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 6
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 3
            }, {
                index: 3,
                type: 7
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, 3, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 4
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, 1, 1, -1, -1, -1, -1, -1, -1, 8, 8, 8, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1,
                4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 6,
                type: 4
            }, {
                index: 8,
                type: 5
            }]
        }, {
            grid: [7, 7, 7, 4, -1, -1, -1, -1, -1, -1, 5, 9, 9, 4, 4, -1, -1, -1, -1, -1, 5, 5, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 5,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 5,
                type: 5
            }, {
                index: 5,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, 10, -1, -1, 5, 5, -1, -1, -1, -1, 4, 10, 10, 9, 9, 5, -1, -1, -1, -1, 4, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 3,
                type: 4
            }, {
                index: 5,
                type: 10
            }, {
                index: 7,
                type: 9
            }, {
                index: 7,
                type: 5
            }, {
                index: 5,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 6, 6, -1, -1, -1, -1, -1, -1, 10, 1, 1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, 4, -1, 7, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 4
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 7,
                type: 7
            }, {
                index: 3,
                type: 5
            }]
        }, {
            grid: [-1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 5, -1, -1, -1, -1, -1, -1, 9, 9, 3, 5, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 9
            }, {
                index: 1,
                type: 10
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 5
            }, {
                index: 4,
                type: 2
            }]
        }, {
            grid: [-1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 9, -1, -1, -1, -1, -1, -1, -1, 5, -1, 9, 7, 7, 7, -1, -1, -1, -1, -1, -1, 2, 2, -1, 6, 6, -1, -1, -1, -1, -1, -1, 2, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, 9, 8, 8, 8, -1, -1, -1, -1, -1, -1, 9, 3, -1, -1, -1, -1, -1, -1, -1, 1, 7, 3, -1, -1, -1, -1, -1, -1, -1, 1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 1,
                type: 3
            }, {
                index: 1,
                type: 7
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, 4, 4, 4, -1, -1, -1, -1, 1, 5, 5, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 7
            }, {
                index: 4,
                type: 1
            }, {
                index: 5,
                type: 9
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, 9, 10, 10, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 1
            }, {
                index: 2,
                type: 6
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [-1, 5, 5, 2, 2, -1, -1, -1, -1, -1, -1, 7, 7, 2, 2, -1, -1, -1, -1, -1, -1, 7, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 3
            }, {
                index: 4,
                type: 7
            }, {
                index: 8,
                type: 2
            }]
        }, {
            grid: [-1, -1, 5, 5, 6, -1, -1, -1, -1, -1, -1, 2, 2, -1, 6, 6, -1, -1, -1, -1, -1, 2, 2, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 2
            }, {
                index: 1,
                type: 10
            }, {
                index: 7,
                type: 1
            }, {
                index: 3,
                type: 4
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 7, 7, -1, -1, -1, -1, -1, -1, 3, 10, 10, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 4,
                type: 3
            }, {
                index: 6,
                type: 9
            }, {
                index: 4,
                type: 1
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 6, 6, -1, -1, -1, -1, -1, -1, 4, 4, 6, 10, 10, 10, -1, -1, -1, -1, -1, -1, 1, 1, 3, -1, -1, -1, -1, -1, -1, -1, 1, 1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 4,
                type: 9
            }, {
                index: 8,
                type: 4
            }, {
                index: 8,
                type: 1
            }, {
                index: 2,
                type: 10
            }, {
                index: 4,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 3, 7, -1, -1, -1, -1, -1, 8, 8, 6, 6, 7, -1, -1, -1, -1, -1, -1, -1, 6, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 8
            }, {
                index: 8,
                type: 6
            }, {
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 7,
                type: 1
            }, {
                index: 3,
                type: 7
            }]
        }, {
            grid: [-1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, 2, 4, 8, 8, -1, -1, -1, -1, -1, -1, 2, 4, 10, 10, -1, -1, -1, -1, -1, -1, -1, 4, 10, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 4,
                type: 10
            }, {
                index: 3,
                type: 4
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 9
            }, {
                index: 8,
                type: 5
            }]
        }, {
            grid: [-1, -1, 4, 4, 9, -1, -1, -1, -1, -1, -1, 1, 1, 4, 9, 7, 7, -1, -1, -1, -1, -1, 1, -1, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 4
            }, {
                index: 4,
                type: 8
            }, {
                index: 8,
                type: 2
            }, {
                index: 3,
                type: 9
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [-1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, 4, 4, 10, 10, 10, -1, -1, -1, -1, -1, 4, 4, -1, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 4
            }, {
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 10
            }, {
                index: 3,
                type: 2
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 2
            }, {
                index: 6,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 6, 6, 4, 4, -1, -1, -1, -1, -1, -1, 6, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 4,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 8,
                type: 10
            }, {
                index: 8,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 8, 6, 6, 10, -1, -1, -1, -1, 2, 2, 8, 6, 10, 10, -1, -1, -1, -1, -1, 2, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 1
            }, {
                index: 8,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 6,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 10, 10, -1, 3, 3, -1, -1, -1, -1, -1, 10, 10, -1, 9, 9, -1, -1, -1, -1, -1, 7, 7, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 8,
                8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 6,
                type: 8
            }, {
                index: 0,
                type: 3
            }, {
                index: 7,
                type: 9
            }, {
                index: 8,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, 9, 9, -1, -1, -1, -1, -1, 5, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, 5, 7, 4, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 7
            }, {
                index: 7,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 7, 7, 7, -1, -1, -1, -1, -1, -1, 10, -1, 1, 1, -1, -1, -1, -1, -1, -1, 10, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 5, 5, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 9
            }, {
                index: 7,
                type: 4
            }, {
                index: 8,
                type: 1
            }, {
                index: 2,
                type: 7
            }, {
                index: 3,
                type: 10
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [-1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 2, 2, 1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, 5, 9, 9, -1, -1, -1, -1, -1, 6, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 1
            }, {
                index: 0,
                type: 5
            }, {
                index: 8,
                type: 9
            }, {
                index: 2,
                type: 4
            }, {
                index: 8,
                type: 2
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [-1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, 9, 9, 1, -1, -1, -1, -1, -1, -1, -1, 9, -1, 1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 4,
                type: 5
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 5, 5, 9, -1, -1, -1, -1, -1, 1, 3, 3, -1, 9, 9, -1, -1, -1, -1, -1, 3, 3, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 2
            }, {
                index: 0,
                type: 5
            }, {
                index: 7,
                type: 4
            }, {
                index: 5,
                type: 9
            }, {
                index: 4,
                type: 1
            }, {
                index: 8,
                type: 3
            }]
        }, {
            grid: [-1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 7, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 4, 4, -1, -1, -1, -1, -1, -1, 8, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 7
            }, {
                index: 8,
                type: 5
            }, {
                index: 4,
                type: 8
            }, {
                index: 8,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [-1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 2, -1, -1, -1, -1, -1, -1, -1, 3, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 7, 7, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 8,
                type: 10
            }, {
                index: 1,
                type: 6
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [-1, 4, 4, 6, 6, 5, 5, -1, -1, -1, -1, 9, -1, 1, 8, 8, 8, -1, -1, -1, -1, 9, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 1
            }, {
                index: 5,
                type: 9
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, 9, 10, 10, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 2, 2, -1, -1, -1, -1, -1, -1, 5, 5, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 10
            }, {
                index: 5,
                type: 9
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, 8, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 1
            }, {
                index: 7,
                type: 8
            }, {
                index: 0,
                type: 3
            }, {
                index: 5,
                type: 9
            }]
        }, {
            grid: [-1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, 7, -1, -1, -1, -1, -1, -1, 4, -1, 3, 3, 3, 1, 1, -1, -1, -1, 4, -1, -1, -1, 9, 9, 1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 3,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 8,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, 7, -1, -1, -1, -1, -1, -1, -1, 5, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 3,
                type: 5
            }, {
                index: 2,
                type: 1
            }, {
                index: 7,
                type: 6
            }, {
                index: 5,
                type: 10
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 4
            }, {
                index: 8,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, 1, 1, -1, -1, -1, -1, 8, 5, -1, 4, 4, 6, -1, -1, -1, -1, 8, 8, 10, 10, 4, 6, -1, -1, -1, -1, -1, -1, 10, 10, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 4,
                type: 5
            }, {
                index: 8,
                type: 10
            }, {
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 7
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 5,
                type: 4
            }]
        }, {
            grid: [-1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, 7, 9, -1, -1, -1, -1, -1, -1, 5, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 6,
                type: 9
            }, {
                index: 8,
                type: 3
            }, {
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, 5, 2, 2, 2, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, 3, -1, -1, -1, -1, -1, 5, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 7, 9, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 3,
                type: 7
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 5
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 2, 2, -1, -1, -1, -1, -1, -1, 9, 9, -1, 5, 5, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 7,
                type: 9
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 8, 8, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 3
            }, {
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 1
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [-1, -1, 1, 1, 9, 9, -1, -1, -1, -1, -1, 7, 7, 5, 9, -1, -1, -1, -1, -1, -1, 7, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 10
            }, {
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 5
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, 2, 2, -1, -1, -1, 7, 7, -1, 8, 8, 9, 9, -1, -1, -1, -1, 10, 10, 10, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 8,
                type: 7
            }, {
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, 8, 8, -1, -1, -1, -1, -1, -1, 9, 10, 10, 8, 1, -1, -1, -1, -1, -1, 5, 5, 10, 1, 1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 5
            }, {
                index: 3,
                type: 9
            }, {
                index: 7,
                type: 10
            }, {
                index: 6,
                type: 1
            }, {
                index: 8,
                type: 7
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, 10, 3, 3, -1, -1, -1, -1, -1, -1, 10, 10, 3, 3, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 3
            }, {
                index: 6,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 2
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [-1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 1, 1, 2, 2, 4, 4, -1, -1, -1, -1, -1, 1, -1, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 2
            }, {
                index: 7,
                type: 1
            }, {
                index: 3,
                type: 6
            }]
        }, {
            grid: [7, 8, 8, 8, -1, -1, -1, -1, -1, -1, 7, 1, 1, 1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 4,
                type: 10
            }, {
                index: 1,
                type: 7
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, 8, 3, 2, 2, 2, -1, -1, -1, -1, -1, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 1
            }, {
                index: 8,
                type: 4
            }, {
                index: 1,
                type: 3
            }, {
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 1,
                type: 1
            }, {
                index: 0,
                type: 2
            }, {
                index: 3,
                type: 5
            }, {
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [6, 7, 7, -1, -1, -1, -1, -1, -1, -1, 6, 3, 7, -1, -1, -1, -1, -1, -1, -1, 1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 5,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 1,
                type: 3
            }, {
                index: 5,
                type: 9
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, 3, 3, 7, 7, 2, 10, 10, -1, -1, -1, 3, 5, 5, -1, 2, 2, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 7,
                type: 5
            }, {
                index: 5,
                type: 2
            }, {
                index: 2,
                type: 4
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [-1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 10, 10, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 8, 8, -1, -1, -1, -1, -1, -1, 9, 6, 6, 8, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 8
            }, {
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 1,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 2,
                type: 9
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [-1, 8, 8, 10, -1, -1, -1, -1, -1, -1, -1, 9, 9, 10, 10, -1, -1, -1, -1, -1, -1, 9, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 4,
                type: 9
            }, {
                index: 3,
                type: 7
            }, {
                index: 7,
                type: 6
            }, {
                index: 5,
                type: 10
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 7, 7, 7, -1, -1, -1, -1, -1, 1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 10
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, 6,
                6, -1, -1, -1, -1, -1, 4, 4, 4, 5, 10, 10, -1, -1, -1, -1, -1, -1, 5, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 4
            }, {
                index: 3,
                type: 2
            }]
        }, {
            grid: [-1, 5, 5, 2, -1, -1, -1, -1, -1, -1, -1, 7, 7, 2, -1, -1, -1, -1, -1, -1, -1, 7, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 8,
                type: 1
            }, {
                index: 1,
                type: 2
            }, {
                index: 8,
                type: 3
            }, {
                index: 4,
                type: 7
            }, {
                index: 8,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 3, 3, -1, -1, -1, -1, -1, -1, 1, -1, 10, 10, 8, 8, -1, -1, -1, -1, -1, -1, 10, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1,
                7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 4
            }, {
                index: 3,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 10, 6, -1, -1, -1, -1, -1, -1, 3, 10, 10, 6, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, 2, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 10
            }, {
                index: 4,
                type: 3
            }, {
                index: 6,
                type: 8
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 6
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, 9, 9, -1, -1, -1, -1, -1, -1, 6, 6, 5, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 3
            }, {
                index: 5,
                type: 4
            }, {
                index: 2,
                type: 9
            }, {
                index: 6,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 1,
                type: 5
            }]
        }],
        [{
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, 1, 1, -1, -1, -1, -1, -1, -1, 2, 8, 8, 1, 4, -1, -1, -1, -1, -1, 2, 8, 8, -1, 4, 4, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 3
            }, {
                index: 8,
                type: 5
            }, {
                index: 3,
                type: 2
            }, {
                index: 5,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 8,
                type: 8
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1,
                2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 4, 4, 7, 7, -1, -1, -1, -1, 9, 8, 8, -1, 7, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 4
            }, {
                index: 6,
                type: 2
            }, {
                index: 4,
                type: 8
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 7
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, 2, 2, 5, -1, -1, -1, -1, -1, -1, -1, 2, 2, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 7, 7, -1, -1, -1, -1, -1, -1, -1, 6, 6, 10, -1, -1, -1, -1, -1, -1, -1, 6, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 8,
                type: 6
            }, {
                index: 0,
                type: 8
            }, {
                index: 8,
                type: 2
            }, {
                index: 5,
                type: 5
            }, {
                index: 3,
                type: 10
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 4, 4, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 7, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 6,
                type: 2
            }, {
                index: 8,
                type: 10
            }, {
                index: 5,
                type: 9
            }, {
                index: 7,
                type: 1
            }, {
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 10, 10, -1, -1, -1, -1, -1, -1, -1, 5, 5, 2, 2, -1, -1, -1, -1, -1, -1, 5, -1, 2, 2, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 6,
                type: 1
            }, {
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 5
            }, {
                index: 8,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, 7, 7, 1, -1, -1, -1, -1, -1, -1, 5, 10, 10, 1, -1, -1, -1, -1, -1, -1, 5, 10, -1, 9, 9, -1, -1, -1, -1, -1, 5, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 2,
                type: 2
            }, {
                index: 8,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 1
            }, {
                index: 3,
                type: 5
            }]
        }, {
            grid: [-1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, 7, 7, 8, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, 9, 4, 4, -1, -1, -1, -1, -1, 6, -1, 9, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 1
            }, {
                index: 7,
                type: 9
            }, {
                index: 3,
                type: 6
            }, {
                index: 8,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 7,
                type: 8
            }, {
                index: 7,
                type: 4
            }]
        }, {
            grid: [-1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, 7, 7, 2, 2, -1, -1, -1, -1, -1, -1, 7, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 5
            }, {
                index: 4,
                type: 7
            }, {
                index: 6,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 3
            }, {
                index: 6,
                type: 2
            }, {
                index: 0,
                type: 7
            }, {
                index: 4,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 10, 1, 1, -1, -1, -1, -1, -1, -1, 8, 8, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 3
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 10
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 7
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [-1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, 2, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 6, 6, 6, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 6
            }, {
                index: 3,
                type: 10
            }, {
                index: 3,
                type: 9
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, 9, 9, 5, 5, -1, -1, -1, -1, 7, 7, 4, 4, 5, 5, -1, -1, -1, -1, -1, 7, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 10
            }, {
                index: 0,
                type: 4
            }, {
                index: 6,
                type: 3
            }, {
                index: 8,
                type: 5
            }, {
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [-1, -1, 6, 6, 1, 8, -1, -1, -1, -1, -1, 9, 9, 6, 1, 8, -1, -1, -1, -1, -1, 9, -1, -1, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 3,
                type: 4
            }, {
                index: 7,
                type: 6
            }, {
                index: 3,
                type: 1
            }, {
                index: 7,
                type: 5
            }, {
                index: 3,
                type: 8
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 4, 4, 1, 1, -1, -1, -1, -1, -1, 5, 5, 7, 7, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5,
                1, 1, 2, 2, -1, -1, -1, -1, 5, 5, -1, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 6,
                type: 5
            }, {
                index: 0,
                type: 2
            }, {
                index: 5,
                type: 7
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [-1, 1, 1, 7, 7, -1, -1, -1, -1, -1, -1, 8, 8, 7, -1, 5, 5, -1, -1, -1, -1, -1, 8, 6, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 6
            }, {
                index: 7,
                type: 8
            }, {
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, 9, 9, 8, 8, 8, 7, 7, -1, -1, -1, 3, 10, 10, -1, 1, 2, 2, -1, -1, -1, 3, -1, 10, -1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 3
            }, {
                index: 3,
                type: 1
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 8,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 8,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, 1, 1, 1, -1, -1, -1, -1, 4, 7, 7, 7, 5, -1, -1, -1, -1, -1, 4, 4, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 9
            }, {
                index: 7,
                type: 2
            }, {
                index: 3,
                type: 5
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 1
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 5, -1, -1, -1, -1, -1, -1, -1, 9, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 3,
                type: 9
            }, {
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 6
            }, {
                index: 4,
                type: 10
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [-1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, 7, 7, 5, -1, -1, -1, -1, -1, -1, -1, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 10, -1, -1, -1, -1, -1, -1, -1, 3, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 6,
                type: 3
            }, {
                index: 8,
                type: 1
            }, {
                index: 2,
                type: 6
            }, {
                index: 6,
                type: 5
            }, {
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 6,
                type: 6
            }, {
                index: 7,
                type: 10
            }, {
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 3, 3, 3, -1, -1, -1, -1, -1, -1, 8, 1, 1, 6, -1, -1, -1, -1, -1, -1, 8, -1, -1, 6, -1, -1, -1, -1, -1, -1, 8, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 3,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 2
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, 1, -1, -1, -1, -1, -1, -1, 8, -1, -1, 1, -1, -1, -1, -1, -1, -1, 8, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 1,
                type: 1
            }, {
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 4
            }, {
                index: 3,
                type: 8
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, -1, -1, -1, -1, -1, -1, -1, 7, 7, 8, -1, -1, -1, -1, -1, -1, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 9
            }, {
                index: 5,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 10, 10, -1, -1, -1, -1, -1, -1, 7, 7, 5, 5, 5, -1, -1, -1, -1, -1, -1, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 1
            }, {
                index: 1,
                type: 8
            }, {
                index: 5,
                type: 7
            }, {
                index: 3,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, 8, 10, 1, 1, 1, -1, -1, -1, -1, -1, -1, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 6
            }, {
                index: 3,
                type: 4
            }, {
                index: 2,
                type: 1
            }, {
                index: 5,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 9
            }, {
                index: 3,
                type: 8
            }]
        }, {
            grid: [-1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 5, 4, 4, -1, -1, -1, -1, -1, -1, 5, 5, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, 6, 6, 6, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 6,
                type: 9
            }, {
                index: 4,
                type: 4
            }, {
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [-1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 9, -1, -1, -1, -1, -1, -1, -1, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 4, 4, -1, -1, -1, -1, -1, -1, 2, 2, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 6,
                type: 2
            }, {
                index: 6,
                type: 9
            }, {
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 7
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, 6, 6, 3, -1, -1, -1, -1, -1, 8, 2, 2, 6, 3, 3, -1, -1, -1, -1, 8, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 8
            }, {
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 7,
                type: 2
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 1,
                type: 8
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 10
            }, {
                index: 5,
                type: 1
            }, {
                index: 0,
                type: 3
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 4, 2, -1, -1, -1, -1, -1, -1, -1, 4, 4, 2, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 6
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 8
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [-1, 9, 9, 4, 4, 5, -1, -1, -1, -1, -1, 1, 9, 4, 4, 5, -1, -1, -1, -1, -1, 1, 1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, -1, -1, -1, -1, -1, -1, -1, 3, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 1
            }, {
                index: 3,
                type: 5
            }, {
                index: 8,
                type: 4
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 8
            }]
        }, {
            grid: [2, 2, 2, 5, -1, -1, -1, -1, -1, -1, 1, 3, 5, 5, -1, -1, -1, -1, -1, -1, 1, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 1,
                type: 1
            }, {
                index: 8,
                type: 4
            }, {
                index: 6,
                type: 5
            }, {
                index: 5,
                type: 10
            }, {
                index: 7,
                type: 9
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 1, 1, 3, 3, -1, -1, -1, -1, -1, 5, 10, 4, 4, 3, 8, 7, 7, -1, -1, -1, 10, 4, 4, -1, 8, 7, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 8,
                type: 4
            }, {
                index: 1,
                type: 8
            }, {
                index: 4,
                type: 7
            }, {
                index: 3,
                type: 5
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, 6, 4, 4, 4, -1, -1, -1, -1, 10, 10, -1, -1, -1, 2, 3, -1, -1, -1, 10, -1, -1, -1, 2, 2, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 2,
                type: 4
            }, {
                index: 4,
                type: 10
            }, {
                index: 3,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 9
            }, {
                index: 6,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 6, 6, 10, 10, 10, -1, -1, -1, -1, 8, 6, 4, 4, -1, 5, -1, -1, -1, -1, -1, -1, 4, 4, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 6
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 10
            }, {
                index: 5,
                type: 5
            }, {
                index: 8,
                type: 4
            }, {
                index: 1,
                type: 8
            }, {
                index: 6,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, 10, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 6, 6, -1, -1, -1, -1, -1, -1, 8, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 8
            }, {
                index: 1,
                type: 5
            }, {
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 6
            }, {
                index: 5,
                type: 10
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [7, 7, 7, 9, 9, -1, -1, -1, -1, -1, 6, 2, 2, -1, 8, 8, -1, -1, -1, -1, 6, 2, -1, -1, 4, -1, -1, -1, -1, -1, 6, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 7
            }, {
                index: 3,
                type: 6
            }, {
                index: 6,
                type: 4
            }, {
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, 4, -1, -1, -1, -1, -1, -1, 5, 5, 5, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 3
            }, {
                index: 4,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 6, 6, 10, -1, -1, -1, -1, -1, -1, 8, 8, 6, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 10
            }, {
                index: 4,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, -1, -1, -1, -1, -1, -1, -1, 1, 2, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 7, 7, -1, -1, -1, -1, -1, -1, 8, 8, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 1,
                type: 1
            }, {
                index: 5,
                type: 4
            }, {
                index: 1,
                type: 2
            }, {
                index: 4,
                type: 5
            }, {
                index: 6,
                type: 8
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 6
            }, {
                index: 4,
                type: 5
            }, {
                index: 0,
                type: 8
            }, {
                index: 8,
                type: 2
            }, {
                index: 5,
                type: 7
            }, {
                index: 6,
                type: 4
            }]
        }, {
            grid: [-1, 2, 2, 3, 3, -1, -1, -1, -1, -1, -1, 4, 4, 3, -1, -1, -1, -1, -1, -1, -1, 4, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 4,
                type: 3
            }, {
                index: 4,
                type: 4
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, 9, -1, -1, -1, -1, -1, -1, 10, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, 8, -1, -1, -1, -1, -1, -1, 3, 3, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 6
            }, {
                index: 0,
                type: 8
            }, {
                index: 7,
                type: 5
            }, {
                index: 4,
                type: 10
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 9
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [-1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 4, 4, 10, 10, 1, 1, -1, -1, -1, -1, -1, 4, 10, -1, 3, 1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 10
            }, {
                index: 7,
                type: 1
            }, {
                index: 8,
                type: 6
            }, {
                index: 6,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 8, 8, 8, -1, -1, -1, -1, -1, 4, 4, 6, 6, 3, 3, -1, -1, -1, -1, 4, 4, -1, -1, 3, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 3,
                type: 5
            }, {
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 9
            }, {
                index: 8,
                type: 4
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, 7, 7, -1, -1, -1, -1, -1, -1, 5, 5, 5, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 4
            }, {
                index: 8,
                type: 8
            }, {
                index: 6,
                type: 3
            }, {
                index: 3,
                type: 6
            }, {
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, 7, 7, 6, 6, 4, -1, -1, -1, 10, 3, 3, 9, 9, 6, 4, -1, -1, 10, 10, 1, -1, 9, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 3
            }, {
                index: 4,
                type: 9
            }, {
                index: 6,
                type: 10
            }, {
                index: 1,
                type: 4
            }, {
                index: 5,
                type: 1
            }, {
                index: 7,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 7, 5, -1, -1, -1, -1, -1, -1, -1, 7, 7, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, 5, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, 8, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 3,
                type: 5
            }, {
                index: 5,
                type: 3
            }, {
                index: 1,
                type: 2
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 7
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 7, -1, -1, -1, -1, -1, -1, -1, 5, 5, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, 1, 1, 1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 7
            }, {
                index: 4,
                type: 2
            }, {
                index: 5,
                type: 9
            }, {
                index: 8,
                type: 5
            }, {
                index: 2,
                type: 1
            }, {
                index: 3,
                type: 8
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 9, 7,
                7, -1, -1, -1, -1, -1, -1, -1, 9, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 2
            }, {
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 4
            }, {
                index: 1,
                type: 5
            }, {
                index: 4,
                type: 6
            }]
        }, {
            grid: [-1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, 10, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 6, 6, -1, -1, -1, -1, -1, -1, -1, 2, 2, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 10
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 1
            }, {
                index: 5,
                type: 2
            }, {
                index: 7,
                type: 6
            }, {
                index: 7,
                type: 9
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 1, 2, -1, -1, -1, -1, -1, -1, 4, 4, -1, 2, 5, 5, -1, -1, -1, -1, -1, -1, -1, 2, 3, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 2
            }, {
                index: 7,
                type: 5
            }, {
                index: 5,
                type: 4
            }, {
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, 9, 9, -1, -1, -1, -1, 6, 6, -1, 1, 1, 7, -1, -1, -1, -1, 4, 4, 3, 3, 1, 7, -1, -1, -1, -1, 4, 4, -1, 3, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 6
            }, {
                index: 6,
                type: 2
            }, {
                index: 7,
                type: 3
            }, {
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 1
            }, {
                index: 8,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 5, 5, 5, -1, -1, -1, -1, -1, 4, 4, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, 3, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 4
            }, {
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 2
            }, {
                index: 2,
                type: 10
            }, {
                index: 8,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, 9, 9, -1, -1, -1, -1, -1, 1, 7, 7, 3, 9, -1, -1, -1, -1, -1, 1, 8, 8, 3, 3, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 8,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 3
            }, {
                index: 3,
                type: 1
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, -1, -1, -1, -1, -1, -1, -1, 8, 4, 7, 7, -1, -1, -1, -1, -1, -1, 8, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 1
            }, {
                index: 7,
                type: 10
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 3,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, 7, 7, 7, 6, -1, -1, 9, 9, 2, 2, 4, 4, 6, 6, -1, -1, 9, 9, 2, 2, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 4
            }, {
                index: 6,
                type: 6
            }, {
                index: 1,
                type: 5
            }, {
                index: 8,
                type: 2
            }, {
                index: 4,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 1, 1, 8, -1, -1, -1, -1, -1, 5, 6, 6, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 8
            }, {
                index: 6,
                type: 2
            }, {
                index: 0,
                type: 6
            }, {
                index: 8,
                type: 9
            }, {
                index: 4,
                type: 5
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [-1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 9, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 7, 7, -1, -1, -1, -1, -1, -1, -1, 3, 7, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 8
            }, {
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 3
            }, {
                index: 4,
                type: 2
            }, {
                index: 4,
                type: 7
            }, {
                index: 3,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, 5, 7, 7, 7, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 9
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, -1, -1, -1, -1, -1, -1, -1, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 6, -1, 2, 2, -1, -1, -1, -1, -1, 8, 6, 5, 5, -1, -1, -1, -1, -1, -1, 8, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 4,
                type: 10
            }, {
                index: 3,
                type: 6
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 3,
                type: 8
            }, {
                index: 8,
                type: 3
            }]
        }, {
            grid: [-1, 1, 1, 1, 5, 5, 5, -1, -1, -1, -1, 8, 8, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 6
            }, {
                index: 6,
                type: 2
            }, {
                index: 4,
                type: 7
            }, {
                index: 0,
                type: 8
            }, {
                index: 4,
                type: 4
            }, {
                index: 2,
                type: 5
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [-1, 4, 4, 9, 9, -1, -1, -1, -1, -1, -1, 5, 4, -1, 9, 2, 2, 2, -1, -1, -1, 5, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 5,
                type: 1
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 4
            }, {
                index: 1,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, 1, 1, 1, -1, -1, -1, -1, -1, 2, 2, 3, 3, -1, -1, -1, -1, -1, -1, -1, 2, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 1
            }, {
                index: 7,
                type: 3
            }, {
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, 5, -1, -1, -1, -1, -1, -1, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, 8, 9, 9, -1, -1, -1, -1, -1, -1, 8, 8, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 3
            }, {
                index: 6,
                type: 1
            }, {
                index: 5,
                type: 7
            }, {
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 8
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, 6, 6, -1, -1, -1, -1, -1, -1, 3, 10, 5, 6, 8, 8, -1, -1, -1, -1, -1, -1, 5, -1, 4, -1, -1, -1, -1, -1, -1, -1, 5, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 3,
                type: 3
            }, {
                index: 5,
                type: 4
            }, {
                index: 3,
                type: 5
            }, {
                index: 3,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, 3, 3, 3, -1, -1, -1, -1, -1, 6, 9, 9, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 1,
                type: 1
            }, {
                index: 3,
                type: 10
            }, {
                index: 5,
                type: 9
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 3, 2, -1, -1, -1, -1, -1, -1, -1, 3, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 5,
                type: 2
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 1, 1, -1, -1, -1, -1, -1, -1, -1, 7, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 1
            }, {
                index: 7,
                type: 7
            }, {
                index: 4,
                type: 6
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [-1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, -1, -1, -1, -1, -1, -1, -1, 9, 9, 10, 10, 3, 3, 3, -1, -1, -1, -1, -1, 1, 1, 1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 5,
                type: 8
            }, {
                index: 6,
                type: 9
            }, {
                index: 5,
                type: 10
            }, {
                index: 0,
                type: 2
            }]
        }],
        [{
            grid: [6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, 1, 1, 1, -1, -1, -1, -1, -1, 10, 10, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 5,
                type: 10
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 4
            }, {
                index: 3,
                type: 8
            }, {
                index: 3,
                type: 7
            }]
        }, {
            grid: [5, 5, -1, 8, 8, 8, -1, -1, -1, -1, 3, 3, 2,
                2, 2, 9, -1, -1, -1, -1, 3, 10, 10, -1, 9, 9, -1, -1, -1, -1, -1, -1, 10, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 6,
                type: 9
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 7, -1, -1, -1, -1, -1, -1, -1, 9, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 3,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 6
            }, {
                index: 1,
                type: 5
            }, {
                index: 8,
                type: 3
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [6, 6, 5, 5, -1, -1, -1, -1, -1, -1, 6, 6, 4, 5, 8, -1, -1, -1, -1, -1, -1, 4, 4, 10, 8, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 1
            }, {
                index: 6,
                type: 4
            }, {
                index: 1,
                type: 8
            }, {
                index: 7,
                type: 5
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 7
            }, {
                index: 6,
                type: 10
            }, {
                index: 8,
                type: 6
            }]
        }, {
            grid: [8, 8, 8, 4, 4, 2, 2, -1, -1, -1, -1, 3, 3, 10, 4, 7, -1, -1, -1, -1, -1, -1, -1, 10, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 10
            }, {
                index: 3,
                type: 7
            }, {
                index: 6,
                type: 5
            }]
        }, {
            grid: [9, 9, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, 5, 5, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 6, 10, 10, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 6
            }, {
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 7,
                type: 4
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [1, 1, 1, 2, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 4
            }, {
                index: 3,
                type: 2
            }, {
                index: 8,
                type: 6
            }, {
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, 1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 10, 10, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4, 4, -1, -1, -1, -1, -1, -1, -1, 6, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 3
            }, {
                index: 3,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 1
            }, {
                index: 7,
                type: 8
            }, {
                index: 5,
                type: 5
            }]
        }, {
            grid: [9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, 5, 5, 3, 3, -1, -1, -1, -1, 4, 4, 4, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 1
            }, {
                index: 6,
                type: 6
            }, {
                index: 5,
                type: 9
            }, {
                index: 7,
                type: 3
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 7
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 3, 3, 10, 10, 5, 5, -1, -1, 9, 9, 3, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 5
            }, {
                index: 5,
                type: 7
            }, {
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, 3, 3, -1, -1, -1, -1, 5, -1, 2, 2, 2, 9, 10, 10, -1, -1, 5, 5, 7, -1, -1, 9, 9, 10, -1, -1, -1, -1, 7, -1, -1, -1, -1, 8, 8, -1, -1, -1,
                7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 3
            }, {
                index: 5,
                type: 9
            }, {
                index: 0,
                type: 8
            }, {
                index: 5,
                type: 5
            }, {
                index: 3,
                type: 7
            }]
        }, {
            grid: [4, -1, -1, 2, 2, 2, -1, -1, -1, -1, 4, 7, 9, 3, 3, 6, 6, -1, -1, -1, 7, 7, 9, 9, 3, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 4
            }, {
                index: 6,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 4,
                type: 6
            }, {
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 1
            }, {
                index: 4,
                type: 10
            }, {
                index: 7,
                type: 3
            }]
        }, {
            grid: [2, 2, 1, 1, 8, 8, 8, -1, -1, -1, 2, 2, 9, 9, 7, 7, -1, -1, -1, -1, -1, 5, 5, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 5
            }, {
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4, 4, -1, -1, -1, -1, -1, -1, -1, 6, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 1
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 4
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 7
            }]
        }, {
            grid: [8, 8, 8, -1, 4, 4, -1, -1, -1, -1, -1, 1, 10, 10, 10, 4, -1, -1, -1, -1, -1, 1, 1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 2, 2, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 5,
                type: 1
            }, {
                index: 2,
                type: 10
            }, {
                index: 3,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 5
            }, {
                index: 7,
                type: 4
            }, {
                index: 5,
                type: 2
            }]
        }, {
            grid: [6, 4, 4, 4, -1, -1, -1, -1, -1, -1, 6, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 2, 2, -1, -1, -1, -1, -1, -1, -1, 8, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 6
            }, {
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 1
            }, {
                index: 3,
                type: 3
            }, {
                index: 4,
                type: 5
            }, {
                index: 7,
                type: 7
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 5, 5, -1, -1, -1, -1, -1, -1, -1, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, -1, -1, -1, 7, 7, -1, -1, -1, -1, 1, 1, 10, 10, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 4,
                type: 2
            }, {
                index: 5,
                type: 1
            }, {
                index: 4,
                type: 5
            }, {
                index: 3,
                type: 4
            }, {
                index: 4,
                type: 6
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, 1, 1, -1, -1, -1, -1, -1, 10, 10, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 4
            }, {
                index: 3,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 8,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 8,
                type: 5
            }, {
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, 7, 5, 4, 4, -1, -1, -1, -1, -1, 7, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 1,
                type: 9
            }, {
                index: 6,
                type: 4
            }, {
                index: 0,
                type: 8
            }, {
                index: 5,
                type: 5
            }]
        }, {
            grid: [6, 6, 7, 7, 7, -1, -1, -1, -1, -1, 6, 6, 10, 5, 5, -1, -1, -1, -1, -1, -1, -1, 10, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 9
            }, {
                index: 1,
                type: 2
            }, {
                index: 8,
                type: 6
            }, {
                index: 8,
                type: 1
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 5
            }, {
                index: 5,
                type: 3
            }]
        }, {
            grid: [7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, 4, 4, -1, -1, -1, -1, -1, 9, 9, 5, 5, 10, -1, -1, -1, -1, -1, 9, 9, 5, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 8,
                type: 9
            }, {
                index: 6,
                type: 8
            }, {
                index: 6,
                type: 1
            }, {
                index: 5,
                type: 10
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 3
            }]
        }, {
            grid: [7, 7, 8, 8, 6, 6, 1, 1, 1, -1, -1, 7, 4, 4, 10, -1, -1, 3, 3, -1, -1, -1, -1, -1, 10, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 1
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [1, 6, 6, 3, 3, 3, -1, -1, -1, -1, 1, 6, 9, 9, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 9
            }, {
                index: 4,
                type: 6
            }, {
                index: 6,
                type: 10
            }, {
                index: 6,
                type: 8
            }]
        }, {
            grid: [5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, 4, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, 9, -1, -1, -1, -1, -1, -1, 10, 10, 10, 3, 3, 6, 6, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 8,
                type: 3
            }, {
                index: 2,
                type: 9
            }, {
                index: 8,
                type: 8
            }, {
                index: 4,
                type: 7
            }, {
                index: 3,
                type: 4
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, 5, 5, 5, -1, -1, -1, -1, -1, 2, 6, 4, 4, 4, -1, -1, -1, -1, -1, 2, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 7,
                type: 3
            }, {
                index: 2,
                type: 4
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 5
            }, {
                index: 5,
                type: 6
            }]
        }, {
            grid: [7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, 8, 8, 2, 4, 4, -1, -1, -1, -1, -1, -1, 2, 2, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 6,
                type: 2
            }, {
                index: 6,
                type: 3
            }, {
                index: 8,
                type: 7
            }, {
                index: 2,
                type: 6
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, 10, 10, -1, -1, -1, -1, 4, 4, -1, 9, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 6,
                type: 5
            }, {
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 2,
                type: 3
            }, {
                index: 7,
                type: 9
            }, {
                index: 7,
                type: 10
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [9, 9, 3, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, 3, -1, -1, -1, -1, -1, -1, -1, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 7
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 8
            }, {
                index: 7,
                type: 9
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, 8, 7, 7, 6, -1, -1, -1, -1, -1, -1, 8, 7, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 7
            }, {
                index: 2,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 3
            }, {
                index: 3,
                type: 8
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [1, 1, 3, -1, -1, -1, -1, -1, -1, -1, 1, 1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 9, 9, 9, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, 2, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 8
            }, {
                index: 3,
                type: 2
            }, {
                index: 1,
                type: 6
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 9
            }, {
                index: 0,
                type: 7
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, 10, 10, 10, -1, -1, -1, -1, -1, 3, 2, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 7, 7, -1, -1, -1, -1, -1, -1, 9, 9, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 5,
                type: 9
            }, {
                index: 1,
                type: 1
            }, {
                index: 8,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 7
            }, {
                index: 7,
                type: 3
            }]
        }, {
            grid: [9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 4, 4, -1, -1, -1, -1, -1, -1, 8, 8, 4, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 10, 10, -1, -1, -1, -1, -1, -1, 1, 1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 6
            }, {
                index: 8,
                type: 8
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 2,
                type: 9
            }, {
                index: 8,
                type: 1
            }]
        }, {
            grid: [10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, 1, 1, -1, -1, -1, -1, -1, -1, 4, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 8, 8, 8, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 7,
                type: 4
            }, {
                index: 1,
                type: 5
            }, {
                index: 6,
                type: 9
            }, {
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 10
            }]
        }, {
            grid: [7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, 9, 8, 6, 6, -1, -1, -1, -1, 10, 9, 9, 8, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 8
            }, {
                index: 8,
                type: 9
            }, {
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 10
            }, {
                index: 7,
                type: 3
            }, {
                index: 6,
                type: 2
            }]
        }, {
            grid: [8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 7
            }, {
                index: 4,
                type: 9
            }, {
                index: 5,
                type: 10
            }, {
                index: 2,
                type: 4
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [6, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 6, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, 3, 3, -1, -1, -1, -1, -1, -1, 2, 10, 10, 3, -1, -1, -1, -1, -1, -1, 8, 8, -1, 5, -1, -1, -1, -1, -1, -1, -1, 8, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 6
            }, {
                index: 1,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 7,
                type: 3
            }, {
                index: 5,
                type: 5
            }, {
                index: 8,
                type: 1
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [8, 9, 9, 9, 2, 2, -1, -1, -1, -1, 8, -1, -1, 5, 5, 2, -1, -1, -1, -1, 8, -1, -1, 5, 5, 6, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 6
            }, {
                index: 2,
                type: 9
            }, {
                index: 6,
                type: 10
            }, {
                index: 8,
                type: 5
            }, {
                index: 8,
                type: 4
            }, {
                index: 7,
                type: 2
            }, {
                index: 3,
                type: 8
            }, {
                index: 5,
                type: 1
            }]
        }, {
            grid: [5, 8, -1, 7, 7, 7, -1, -1, -1, -1, 5, 8, 6, 6, 4, 9, 9, -1, -1, -1, -1, 8, 6, 6, 4, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 1,
                type: 4
            }, {
                index: 7,
                type: 10
            }, {
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 9, 9, 1, -1, -1, -1, -1, -1, -1, -1, 9, -1, 1, 10, 3, 3, -1, -1, -1, -1, -1, -1, -1, 10, -1, 3, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 3
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 7
            }, {
                index: 6,
                type: 2
            }, {
                index: 1,
                type: 10
            }, {
                index: 1,
                type: 1
            }, {
                index: 8,
                type: 6
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [10, 10, 9, 9, -1, -1, -1, -1, -1, -1, 10, 1, 1, 3, 3, -1, -1, -1, -1, -1, 6, 6, -1, 3, -1, -1, -1, -1, -1, -1, 6, 6, -1, 8, 8, 5, 5, -1, -1, -1, -1, -1, -1, 8, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 10
            }, {
                index: 8,
                type: 8
            }, {
                index: 8,
                type: 6
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 4, 4, 4, -1, -1, -1, -1, -1, -1, 10, 10, 7, 9, 9, -1, -1, -1, -1, -1, 10, -1, 7, 5, 9, 6, 6, -1, -1, -1, -1, -1, -1, 5, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 6
            }, {
                index: 1,
                type: 5
            }, {
                index: 8,
                type: 3
            }, {
                index: 2,
                type: 4
            }, {
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 1
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 5, 5, 5, -1, -1, -1, -1, -1, -1, 1, 1, 4, 4, 8, 8, -1, -1, -1, -1, -1, -1, 4, -1, 6, 8, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 2
            }, {
                index: 6,
                type: 6
            }, {
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 3, 9, -1, -1, -1, -1, -1, -1, 6, -1, 3, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 7,
                type: 5
            }, {
                index: 3,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 3,
                type: 3
            }, {
                index: 8,
                type: 4
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, 4, 7, 7, -1, -1, -1, -1, -1, -1, 4, 4, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 2, 2, -1, -1, -1, -1, -1, -1, 10, -1, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 8,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [2, 3, 3, -1, -1, -1, -1, -1, -1, -1, 2, -1, 10, 10, -1, -1, -1, -1, -1, -1, 2, -1, 10, 9, 9, 1, 1, 1, -1, -1, -1, -1, -1, 9, 5, 5, 4, -1, -1, -1, -1, -1, -1, -1, 5, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 4
            }, {
                index: 8,
                type: 5
            }, {
                index: 3,
                type: 2
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [9, 9, 7,
                7, 7, -1, -1, -1, -1, -1, -1, 5, 1, 1, 2, 2, -1, -1, -1, -1, -1, 5, 5, 1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 5,
                type: 6
            }, {
                index: 1,
                type: 4
            }, {
                index: 5,
                type: 5
            }, {
                index: 7,
                type: 1
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 4, -1, 8, 8, 8, -1, -1, -1, -1, 4, 4, 9, 9, -1, 3, 3, -1, -1, -1, 2, 2, 7, 9, -1, -1, 3, -1, -1, -1, 2, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 3,
                type: 6
            }, {
                index: 4,
                type: 2
            }, {
                index: 7,
                type: 3
            }, {
                index: 3,
                type: 7
            }, {
                index: 6,
                type: 4
            }, {
                index: 8,
                type: 10
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 6, 6, 6, -1, -1, -1, -1, -1, -1, 7, 5, -1, 10, 10, 8, 8, -1, -1, -1, -1, 5, 5, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 5
            }, {
                index: 5,
                type: 9
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 10
            }, {
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, 10, 10, -1, -1, -1, -1, -1, -1, 4, 2, 2, 10, -1, 9, 9, -1, -1, -1, 4, -1, -1, 3, 3, 3, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 10
            }, {
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 5
            }, {
                index: 1,
                type: 4
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, 2, 2, 2, -1, -1, -1, -1, -1, -1, 8, 8, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 6
            }, {
                index: 8,
                type: 9
            }, {
                index: 4,
                type: 3
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, 6, 6, -1, -1, -1, -1, -1, -1, 10, 10, 10, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 4, 4, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 3
            }, {
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 2
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 7
            }, {
                index: 4,
                type: 5
            }]
        }, {
            grid: [5, 5, 8, 8, 3, 3, -1, -1, -1, -1, -1, -1, 8, 8, 6, 6, 6, 7, 7, -1, -1, -1, -1, -1, 2, 2, 10, 10, 9, -1, -1, -1, -1, -1, -1, 2, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 2
            }, {
                index: 8,
                type: 8
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 6
            }, {
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [8, -1, -1, 6, 6, 10, 10, -1, -1, -1, 8, 2, 2, 2, 6, 10, 10, -1, -1, -1, 8, -1, -1, -1, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 5, -1, -1, -1, -1, -1, -1, -1, 1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 2
            }, {
                index: 5,
                type: 3
            }, {
                index: 3,
                type: 8
            }, {
                index: 8,
                type: 10
            }, {
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [1, -1, 3, 3, 10, 10, -1, -1, -1, -1, 1, 2, 2, 2, 7, 6, -1, -1, -1, -1, 1, -1, -1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 4
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 1
            }, {
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 10, 10, -1, -1, -1, -1, -1, -1, 8, 8, 8, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 2
            }, {
                index: 6,
                type: 4
            }, {
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 8
            }, {
                index: 4,
                type: 7
            }]
        }, {
            grid: [10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, 6, -1, -1, -1, -1, -1, -1, 7, 2, 2, 6, -1, -1, -1, -1, -1, -1, -1, 2, 2, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 2
            }, {
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 6
            }, {
                index: 1,
                type: 5
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 8, -1, -1, -1, -1, -1, -1, -1, 3, 3, 8, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 4
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 2
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, 8, 9, 9, -1, -1, -1, -1, -1, -1, -1, 8, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 9
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [10, 4, 4, 4, 5, 5, -1, -1, -1, -1, 10, 7, -1, 6, 5, -1, -1, -1, -1, -1, 7, 7, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 1,
                type: 10
            }, {
                index: 4,
                type: 5
            }, {
                index: 2,
                type: 4
            }, {
                index: 6,
                type: 7
            }, {
                index: 4,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 4, 4, 7, 7, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 3
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 1
            }, {
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [6, 6,
                4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, 1, 10, 10, -1, -1, -1, -1, -1, -1, -1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, 9, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 2
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 1
            }, {
                index: 6,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [3, 9, 9, 9, -1, -1, -1, -1, -1, -1, 3, 3, 6, 4, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, 10, 10, -1, -1, -1, -1, -1, -1, 8, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 6,
                type: 6
            }, {
                index: 1,
                type: 4
            }, {
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, 5, 5, -1, -1, -1, -1, -1, 3, 3, 1, 1, 6, -1, -1, -1, -1, -1, -1, -1, 1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 8,
                type: 8
            }, {
                index: 8,
                type: 9
            }, {
                index: 0,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [8, 5, 5, 5, -1, -1, -1, -1, -1, -1, 8, 8, -1, 10, 10, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 3, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 8
            }, {
                index: 2,
                type: 7
            }, {
                index: 6,
                type: 4
            }, {
                index: 5,
                type: 3
            }, {
                index: 4,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 2,
                type: 5
            }, {
                index: 8,
                type: 6
            }]
        }, {
            grid: [10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 2, 2, 2, -1, -1, -1, -1, -1, -1, 1, 1, 3, 6, -1, -1, -1, -1, -1, -1, -1, 3, 3, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 5
            }, {
                index: 6,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 8
            }, {
                index: 3,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [4, 10, 10, 10, 5, 5, 5, -1, -1, -1, 4, -1, -1, 9, 6, -1, 3, 3, -1, -1, 4, -1, -1, 9, 6, -1, -1, 3, -1, -1, -1, -1, -1, 9, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 8
            }, {
                index: 8,
                type: 1
            }, {
                index: 7,
                type: 3
            }, {
                index: 2,
                type: 10
            }, {
                index: 3,
                type: 4
            }, {
                index: 1,
                type: 6
            }, {
                index: 3,
                type: 9
            }]
        }, {
            grid: [6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 5, 5, 5, 9, -1, -1, -1, -1, 7, 7, -1, -1, 8, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 9
            }, {
                index: 8,
                type: 7
            }, {
                index: 1,
                type: 8
            }, {
                index: 8,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [5, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 2, 6, -1, -1, -1, -1, -1, -1, -1, 5, 10, 6, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 4, 4, 4, -1, -1, -1, -1, -1, -1, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 1
            }, {
                index: 3,
                type: 5
            }, {
                index: 1,
                type: 2
            }, {
                index: 5,
                type: 10
            }, {
                index: 6,
                type: 9
            }, {
                index: 3,
                type: 6
            }, {
                index: 2,
                type: 4
            }, {
                index: 6,
                type: 8
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, 5, 5, 5, -1, -1, -1, 4, 9, -1, 10, 10, 1, -1, -1, -1, -1, -1, 9, 9, 3, -1, 1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 3
            }, {
                index: 4,
                type: 4
            }, {
                index: 5,
                type: 9
            }, {
                index: 8,
                type: 8
            }]
        }, {
            grid: [9, 9, 7, 7, 7, -1, -1, -1, -1, -1, 4, 4, 4, -1, 3, -1, -1, 2, 2, -1, -1, -1, -1, 3, 3, 1, 10, 10, 2, -1, -1, -1, -1, -1, 1, 1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1,
                8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 4
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 1
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, 5, 5, -1, -1, -1, -1, -1, -1, 2, 2, 2, 5,
                6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 6
            }, {
                index: 3,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 2,
                type: 2
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [7, 1, 1, 4, 4, -1, -1, -1, -1, -1, 7, 1, 1, -1, 5, 5, -1, -1, -1, -1, 7, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 8,
                type: 8
            }, {
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 2
            }, {
                index: 4,
                type: 9
            }, {
                index: 3,
                type: 7
            }]
        }],
        [{
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, 2, 2, -1, -1, -1, -1, -1, -1, -1, 5, 9, 2, -1, -1, -1, -1, -1, -1, -1, 5, 9, 9, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 9
            }, {
                index: 7,
                type: 4
            }, {
                index: 3,
                type: 10
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [4, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 8, 8, 9, 9, 9, -1, -1, -1, -1, 1, -1, 8, 6, 6, 10, 10, -1, -1, -1, -1, -1, -1, 6, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 9
            }, {
                index: 7,
                type: 1
            }, {
                index: 6,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 4,
                type: 2
            }, {
                index: 4,
                type: 6
            }, {
                index: 6,
                type: 3
            }, {
                index: 8,
                type: 10
            }]
        }, {
            grid: [9, 7, 7, -1, -1, -1, -1, -1, -1, -1, 9, 6, -1, -1, -1, 8, 8, 8, -1, -1, 9, 6, 6, 4, 4, 2, 2, 1, 1, 1, -1, 5, 5, 5, -1, -1, 2, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 7,
                type: 2
            }, {
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 8
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 3, 3, 3, -1, -1, -1, -1, -1, -1, 8, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 9
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4,
                4, 1, 1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 9, 5, 5, -1, -1, -1, -1, -1, -1, 9, 9, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 3
            }, {
                index: 7,
                type: 7
            }, {
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 1
            }, {
                index: 6,
                type: 9
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 9, 1, 1, -1, -1, -1, -1, -1, -1, -1, 9, 1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 1,
                type: 9
            }, {
                index: 8,
                type: 7
            }, {
                index: 4,
                type: 1
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 6,
                type: 3
            }]
        }, {
            grid: [3, 3, -1, -1, 7, 7, 7, -1, -1, -1, 3, 5, 5, -1, 10, 10, 2, -1, -1, -1, -1, 5, 5, 9, 9, -1, 2, -1, -1, -1, -1, -1, -1, 9, 9, -1, 2, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1],
            pieces: [{
                index: 5,
                type: 6
            }, {
                index: 8,
                type: 9
            }, {
                index: 8,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 3,
                type: 2
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 7
            }, {
                index: 3,
                type: 1
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, 3, 3, 3, -1, -1, -1, -1, 7, -1, 5, 5, -1, 6, -1, -1, -1, -1, 10, 10, 10, -1, 6, 6, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 6,
                type: 6
            }, {
                index: 7,
                type: 8
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 5
            }, {
                index: 5,
                type: 2
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 10
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [6, 7, 7, 7, -1, -1, -1, -1, -1, -1, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, 9, 8, 8, 8, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 5, 10, 10, 10, -1, -1, -1, -1, -1, -1, 5, 5, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 10
            }, {
                index: 2,
                type: 8
            }, {
                index: 5,
                type: 3
            }, {
                index: 7,
                type: 4
            }, {
                index: 5,
                type: 9
            }, {
                index: 1,
                type: 6
            }, {
                index: 5,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [4, 5, 5, -1, -1, -1, -1, -1, -1, -1, 4, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, 10, 10, -1, -1, -1, -1, -1, -1, 6, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 2
            }, {
                index: 1,
                type: 6
            }, {
                index: 6,
                type: 1
            }, {
                index: 4,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 5,
                type: 7
            }, {
                index: 5,
                type: 4
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 10, 9, -1, -1, -1, -1, -1, -1, -1, 10, 10, 9, 5, 5, -1, 6, 6, -1, -1, -1, -1, -1, 5, 5, 3, 4, 6, -1, -1, -1, -1, -1, -1, -1, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 5
            }, {
                index: 6,
                type: 10
            }, {
                index: 1,
                type: 4
            }, {
                index: 6,
                type: 1
            }, {
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 9
            }, {
                index: 3,
                type: 3
            }, {
                index: 7,
                type: 6
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [3, 2, 2, 2, 1, 5, 5, -1, -1, -1, 3, 9, 9, -1, 1, 5, 6, -1, -1, -1, 10, 10, -1, -1, 1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 3,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 9, 9, -1, 1, 1, 2, 2, -1, 10, 4, 4, 9, 8, 8, -1, -1, -1, -1, 10, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 9
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 7,
                type: 6
            }, {
                index: 5,
                type: 5
            }, {
                index: 8,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 8
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [7, 7, 10,
                10, -1, -1, -1, -1, -1, -1, -1, 7, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, -1, -1, -1, -1, -1, -1, -1, 2, 2, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1
            ],
            pieces: [{
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 8
            }, {
                index: 8,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 7
            }, {
                index: 6,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [8, -1, -1, 5, 5, -1, -1, -1, -1, -1, 8, 8, 1, 1, 5, -1, -1, -1, -1, -1, -1, -1,
                1, 1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 4, 4, 4, -1, -1, -1, -1, -1, -1, 6, 6, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 8,
                type: 9
            }, {
                index: 8,
                type: 1
            }, {
                index: 7,
                type: 5
            }, {
                index: 5,
                type: 6
            }, {
                index: 5,
                type: 8
            }, {
                index: 4,
                type: 10
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1,
                9, 9, 3, 3, 5, 5, 10, 10, 10, -1, -1, 9, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 3,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 7,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 0,
                type: 5
            }, {
                index: 6,
                type: 7
            }, {
                index: 1,
                type: 6
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, 6, 6, 6, 1,
                1, 1, -1, -1, 10, 7, 7, 7, -1, -1, 5, -1, -1, -1, 9, 9, 9, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 7,
                type: 10
            }, {
                index: 1,
                type: 2
            }, {
                index: 1,
                type: 4
            }, {
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 3
            }, {
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, 3, 3, -1, -1, -1, -1, -1, 8, 1, 1,
                2, 7, -1, -1, -1, -1, -1, -1, 1, 1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1
            ],
            pieces: [{
                index: 8,
                type: 6
            }, {
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 5
            }, {
                index: 3,
                type: 2
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 7
            }]
        }, {
            grid: [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 6, 6, -1, -1, -1, -1, -1, -1, -1, 10, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 8, 8, 8, -1, -1, -1, -1, -1, -1, 3, 3, -1, 9, 9, 9, -1, -1, -1, -1, 3, 3, -1, -1, 5, 5, -1],
            pieces: [{
                index: 8,
                type: 7
            }, {
                index: 6,
                type: 4
            }, {
                index: 2,
                type: 9
            }, {
                index: 1,
                type: 2
            }, {
                index: 8,
                type: 3
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 5
            }, {
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 2, 9, 9, 5, 5, 8, 8, -1, -1, 6, 2, 9, 7, 7, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 8
            }, {
                index: 0,
                type: 7
            }, {
                index: 7,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 2
            }, {
                index: 3,
                type: 6
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 3
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, 5, 5, -1, -1, -1, -1, -1, 6, 6, 3, 3, 3, -1, -1, -1, -1, -1, 10, 10, 1, 1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 4
            }, {
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 10
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 2,
                type: 2
            }, {
                index: 6,
                type: 6
            }]
        }, {
            grid: [8, 8, -1, -1, 4, 4, 4, -1, -1, -1, -1, 5, 5, 2, 2, 2, 3, -1, -1, -1, -1, 9, 7, 7, 7, -1, 3, 3, -1, -1, -1, 9, 6, 6, -1, -1, 10, -1, -1, -1, -1, -1, -1, 6, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 5,
                type: 10
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 9, 9, -1, -1, -1, -1, -1, -1, -1, 1, 7, 10, 4, -1, -1, -1, -1, -1, -1, -1, 7, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 1,
                type: 7
            }, {
                index: 6,
                type: 6
            }, {
                index: 6,
                type: 3
            }, {
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [1, 1, 8, 8, 7, 7, -1, -1, -1, -1, -1, 4, 4, 8, 9, 7, -1, -1, -1, -1, -1, 4, -1, 9, 9, 10, 10, 10, -1, -1, -1, -1, -1, -1, 5, 3, 3, 3, -1, -1, -1, -1, -1, -1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 6,
                type: 9
            }, {
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 4
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 2,
                type: 10
            }, {
                index: 7,
                type: 8
            }]
        }, {
            grid: [10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, -1, 5, 5, 7, 7, -1, -1, -1, -1, 1, 9, 9, 5, 7, -1, -1, -1, -1, -1, 8, 8, 9, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 6
            }, {
                index: 4,
                type: 7
            }, {
                index: 7,
                type: 9
            }, {
                index: 4,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 1
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 10
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, 8, 8, 2, 2, 6, 6, 7, 7, -1, 3, 3, -1, 2, -1, -1, 6, -1, 9, 10, 10, 3, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 4
            }]
        }, {
            grid: [10, 6, 6, 8, 8, 5, -1, -1, -1, -1, 10, 7, 7, 7, 8, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 2, 2, 2, -1, -1, -1, -1, -1, 1, 3, 3, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 6
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 5,
                type: 1
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [10, 3, -1, 8, 8, 8, -1, -1, -1, -1, 10, 3, 2, 2, -1, 6, -1, -1, -1, -1, -1, 1, 1, 1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 1,
                type: 10
            }, {
                index: 6,
                type: 4
            }, {
                index: 4,
                type: 5
            }, {
                index: 6,
                type: 7
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [4, 4, 1, 1, 5, 5, -1, -1, -1, -1, 4, 7, 7, 7, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, 8, 8, 2, 2, -1, -1, -1, -1, 9, 9, -1, -1, 2, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 5
            }, {
                index: 3,
                type: 3
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 1
            }, {
                index: 2,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [3, -1, -1, -1, 5, 5, -1, -1, -1, -1, 3, -1, -1, 4, 4, 5, -1, -1, -1, -1, 3, 1, 1, 7, -1, 2, 2, -1, -1, -1, 8, 8, 8, 7, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 7,
                type: 5
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 2,
                type: 8
            }, {
                index: 1,
                type: 7
            }, {
                index: 3,
                type: 3
            }, {
                index: 5,
                type: 9
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, 1, 5, 5, -1, -1, -1, -1, -1, 2, -1, 1, 7, 7, 7, -1, -1, -1, -1, 2, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 3, 3, -1, -1, -1, -1, -1, -1, -1, 8, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 3,
                type: 2
            }, {
                index: 8,
                type: 9
            }, {
                index: 4,
                type: 3
            }, {
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 2,
                type: 10
            }, {
                index: 3,
                type: 8
            }, {
                index: 2,
                type: 7
            }]
        }, {
            grid: [3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 8, 8, -1, -1, -1, -1, -1, -1, 6, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, 1, 5, 5, -1, -1, -1, -1, -1, 2, 2, 1, 5, 5, -1, -1, -1, -1, -1, -1, 2, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1],
            pieces: [{
                index: 3,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 8,
                type: 5
            }, {
                index: 1,
                type: 7
            }, {
                index: 8,
                type: 6
            }, {
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 8
            }, {
                index: 7,
                type: 1
            }]
        }, {
            grid: [5, -1, -1, -1, -1, -1, 1, 1, -1, -1, 5, 8, 8, 10, 10, 3, 3, 1, -1, -1, 5, 6, 6, 2, 2, 2, 3, 9, -1, -1, -1, 6, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 9
            }, {
                index: 4,
                type: 4
            }, {
                index: 3,
                type: 5
            }, {
                index: 7,
                type: 1
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 3
            }, {
                index: 4,
                type: 6
            }, {
                index: 0,
                type: 8
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [9, 9, 2, -1, -1, -1, -1, -1, -1, -1, 9, -1, 2, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, 3, 3, -1, -1, -1, -1, -1, 8, 5, 5, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 1
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 7
            }, {
                index: 0,
                type: 3
            }, {
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 9, 9, 9, -1, -1, -1, -1, -1, -1, 2, 5, -1, 4, -1, -1, -1, -1, -1, -1, 2, 5, -1, 4, 4, -1, -1, -1, -1, -1, 2, -1, -1, -1, 8, 8],
            pieces: [{
                index: 3,
                type: 2
            }, {
                index: 3,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 9
            }, {
                index: 1,
                type: 5
            }, {
                index: 7,
                type: 1
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 8,
                type: 7
            }]
        }, {
            grid: [6, 6, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 3, 3, 4, 4, 9, -1, -1, -1, -1, -1, 3, 3, 8, 8, 9, -1, -1, -1, -1, -1, -1, -1, 8, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 10, 2, -1, -1, -1, -1, -1, -1, -1,
                10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 5
            }, {
                index: 7,
                type: 2
            }, {
                index: 1,
                type: 9
            }, {
                index: 6,
                type: 10
            }, {
                index: 4,
                type: 8
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 3
            }]
        }, {
            grid: [5, 5, 8, 8, 8, -1, -1, -1, -1, -1, 5, 5, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 10, 10, -1, -1, -1, -1, -1, -1, 1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3,
                3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 2,
                type: 8
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 7
            }, {
                index: 4,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 8,
                type: 5
            }]
        }, {
            grid: [9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, 10, 10, 2, 2, 2, -1, 5, 5, -1, -1, -1, 4, 4, -1, 7, 7, 7, 5, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 9
            }, {
                index: 7,
                type: 4
            }, {
                index: 6,
                type: 10
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 3
            }, {
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [3, 10, 10, -1, -1, -1, -1, -1, -1, -1, 3, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 9, 9, 9, -1, -1, -1, -1, -1, -1, 7, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 8, -1, -1, -1, -1, -1, -1, -1, 2, 2, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 5
            }, {
                index: 4,
                type: 6
            }, {
                index: 7,
                type: 4
            }, {
                index: 5,
                type: 3
            }, {
                index: 5,
                type: 2
            }, {
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [8, 6, 6, 6, -1, -1, -1, -1, -1, -1, 8, 3, 4, 4, 4, -1, -1, -1, -1, -1, 8, 3, -1, 1, -1, -1, -1, -1, -1, -1, -1, 3, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, 7, 7, -1, -1, -1, -1, -1, -1, 2, 2, -1, 9, -1, -1, -1, -1, -1, -1, 2, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 3
            }, {
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 4,
                type: 2
            }, {
                index: 2,
                type: 4
            }, {
                index: 3,
                type: 8
            }, {
                index: 1,
                type: 9
            }, {
                index: 1,
                type: 5
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [8, 8, -1, 6, 6, 6, -1, -1, -1, -1, -1, 4, 4, 4, 9, 1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 1, 1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 10, 3, 3, -1, -1, -1, -1, -1, -1, -1, 10, 3, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 8,
                type: 3
            }, {
                index: 6,
                type: 9
            }, {
                index: 2,
                type: 4
            }, {
                index: 8,
                type: 5
            }, {
                index: 8,
                type: 7
            }, {
                index: 5,
                type: 1
            }, {
                index: 2,
                type: 6
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 10, 10, 10, 2, 2, -1, -1, -1, -1, 3, 9, -1, 6, 6, 2, -1, -1, -1, -1, -1, 9, -1, 6, 6, 1, 1, -1, -1],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 3,
                type: 3
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 1
            }, {
                index: 8,
                type: 8
            }, {
                index: 2,
                type: 10
            }, {
                index: 3,
                type: 7
            }, {
                index: 8,
                type: 6
            }]
        }, {
            grid: [8, 8, 5, 5, -1, 4, 4, -1, -1, -1, -1, 8, 2, -1, 1,
                1, 10, -1, -1, -1, -1, -1, 2, 6, 6, 1, 10, -1, -1, -1, -1, -1, -1, 6, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 8
            }, {
                index: 3,
                type: 10
            }, {
                index: 4,
                type: 6
            }, {
                index: 7,
                type: 1
            }, {
                index: 3,
                type: 3
            }, {
                index: 1,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [5, 5, 10, 10, 2, 2, 2, -1, -1, -1, 5, 5, -1, 4, 4, 4, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 8
            }, {
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 3
            }, {
                index: 4,
                type: 6
            }, {
                index: 5,
                type: 1
            }, {
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 2
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 1, 1, -1, -1, -1, -1, -1, -1, 5, -1, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 3, 7, 7, -1, -1, -1, -1, -1, -1, 3, 3, 7, 7],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 5
            }, {
                index: 5,
                type: 4
            }, {
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 8
            }, {
                index: 4,
                type: 1
            }, {
                index: 5,
                type: 9
            }, {
                index: 6,
                type: 3
            }]
        }, {
            grid: [3, 3, 6, 7, 7, -1, -1, -1, -1, -1, -1, -1, 6, 6, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, 9, -1, -1, -1, -1, -1, -1, -1, 4, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, 10, -1, 8, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 5
            }, {
                index: 8,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 7,
                type: 7
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 4
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1],
            pieces: [{
                index: 3,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 5
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 4
            }, {
                index: 4,
                type: 2
            }, {
                index: 4,
                type: 8
            }, {
                index: 1,
                type: 7
            }, {
                index: 2,
                type: 3
            }]
        }, {
            grid: [5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4, 4, 10, 10, -1, -1, -1, -1, -1, 9, 9, -1, 8, 8, -1, -1, -1, -1, -1, -1, 9, -1, 8, 8, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 7,
                type: 9
            }, {
                index: 0,
                type: 7
            }, {
                index: 8,
                type: 8
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 3
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [10, 9, -1, -1, 2, 2, 2, -1, -1, -1, 10, 9, 4, 3, 3, -1, 7, 7, -1, -1, 10, 4, 4, -1, 3, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 1,
                type: 1
            }, {
                index: 8,
                type: 6
            }, {
                index: 7,
                type: 7
            }, {
                index: 7,
                type: 3
            }, {
                index: 8,
                type: 5
            }, {
                index: 3,
                type: 10
            }, {
                index: 6,
                type: 4
            }, {
                index: 1,
                type: 9
            }]
        }, {
            grid: [8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 5, 2, 6, 7, -1, -1, -1, -1, -1, -1, 2, 2, 6, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 4
            }, {
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 3
            }, {
                index: 5,
                type: 7
            }, {
                index: 6,
                type: 2
            }, {
                index: 2,
                type: 8
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 1, 3, 3, -1, 7, 7, -1, -1, 4, 1, -1, 3, 3, -1, 9, 9, -1, -1, 4, -1, -1, -1, 10, 10, 6, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 5
            }, {
                index: 3,
                type: 6
            }, {
                index: 4,
                type: 1
            }, {
                index: 8,
                type: 3
            }, {
                index: 8,
                type: 2
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                1, 4, -1, 6, 6, -1, -1, -1, -1, -1, -1, 4, 5, 5, 9, 9, -1, -1, -1, -1, -1, 3, 3, 3, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 7,
                type: 7
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 4,
                type: 9
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [10, 10, 10, 3, 5, 5, 6, -1, -1, -1, -1, -1, -1, 3, -1, 5, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, 2, 2, 7, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 2
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 8,
                type: 8
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 7
            }, {
                index: 5,
                type: 6
            }]
        }, {
            grid: [4, -1, 8, 8, -1, -1, -1, -1, -1, -1, 4, 2, 2, 8, -1, -1, -1, -1, -1, -1, 9, 3, 2, 10, 10, -1, -1, -1, -1, -1, 9, 3, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 1,
                type: 9
            }, {
                index: 6,
                type: 1
            }, {
                index: 1,
                type: 4
            }, {
                index: 8,
                type: 10
            }, {
                index: 5,
                type: 3
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 4,
                type: 6
            }]
        }, {
            grid: [10, 10, 5, 5, 5, -1, -1, -1, -1, -1, 9, 8, 8, 2, 2, 2, -1, -1, -1, -1, 9, 8, 8, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, 1, 1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 4
            }, {
                index: 8,
                type: 8
            }, {
                index: 3,
                type: 7
            }, {
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 4, 9, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 6, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5],
            pieces: [{
                index: 5,
                type: 4
            }, {
                index: 8,
                type: 8
            }, {
                index: 7,
                type: 9
            }, {
                index: 4,
                type: 3
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 9, 9, 6, 6, 6, -1, -1, -1, -1, 3, 8, 8, 2, 5, 5, -1, -1, -1, -1, -1, 8, 8, 2, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 7
            }, {
                index: 1,
                type: 2
            }, {
                index: 1,
                type: 3
            }, {
                index: 0,
                type: 9
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 6
            }, {
                index: 4,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 8,
                type: 8
            }]
        }, {
            grid: [10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 2, 4, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, 7, 7, 7, 3, -1, -1, 6, 6, 6, -1, 9, 9, -1, 3, -1, -1, -1, -1, 1, 1, 1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 9
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 6
            }, {
                index: 2,
                type: 10
            }, {
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 5
            }, {
                index: 5,
                type: 2
            }, {
                index: 3,
                type: 4
            }]
        }, {
            grid: [8, 2, 4, 4, 4, -1, -1, -1, -1, -1, 8, 2, -1, 7, 5, -1, -1, -1, -1, -1, -1, 2, -1, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, -1, 9, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 1,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 9
            }, {
                index: 7,
                type: 3
            }, {
                index: 3,
                type: 2
            }, {
                index: 2,
                type: 10
            }, {
                index: 2,
                type: 4
            }]
        }, {
            grid: [6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 5,
                type: 10
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 8,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 1
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 3, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, 5, 5, 4, -1, -1, -1, -1, -1, -1, -1, 5, 5, 2, 2, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 5,
                type: 7
            }, {
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 5
            }, {
                index: 2,
                type: 9
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 6,
                type: 8
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1,
                9, 5, 5, 5, -1, -1, -1, -1, -1, -1, 9, 9, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 5,
                type: 1
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 3
            }, {
                index: 2,
                type: 5
            }, {
                index: 7,
                type: 10
            }, {
                index: 5,
                type: 9
            }, {
                index: 5,
                type: 4
            }]
        }, {
            grid: [7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 4, -1, -1, -1, -1, -1, -1, -1, 3, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 5, 5, -1, -1, -1, -1, -1, -1, 1, 10, 10, 5, -1, -1, -1, -1, -1, -1, -1, 10, 10, 2, 2, 9, 9, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 7,
                type: 5
            }, {
                index: 8,
                type: 10
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 7
            }, {
                index: 6,
                type: 4
            }, {
                index: 4,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [3, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 1, 1, 1, 8, 8, -1, -1, -1, 6, 6, 10, 10, -1, 9, -1, -1, -1, -1, 7, 7, 7, 10, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 1
            }, {
                index: 3,
                type: 2
            }, {
                index: 8,
                type: 6
            }, {
                index: 5,
                type: 3
            }, {
                index: 7,
                type: 4
            }]
        }, {
            grid: [7, -1, -1, 9, 9, -1, -1, -1, -1, -1, 7, 2, 2, 2, 10, 10, -1, 3, 3, -1, -1, -1, -1, -1, -1, 8, 1, 1, 3, -1, -1, -1, -1, -1, -1, 8, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 7,
                type: 3
            }, {
                index: 1,
                type: 8
            }, {
                index: 8,
                type: 1
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 6
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [3, 3, 10, 10, -1, -1, -1, -1, -1, -1, 3, 2, 7, 9, 9, 4, 4, -1, -1, -1, -1, 2, 7, 9, -1, -1, 4, -1, -1, -1, -1, -1, 7, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 1
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 3,
                type: 7
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 8
            }, {
                index: 7,
                type: 5
            }, {
                index: 4,
                type: 9
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [9, 6, 1, 1, 1, -1, -1, -1, -1, -1, 9, 6, 7, -1, -1, -1, -1, -1, -1, -1, 9, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, 10, 10, 10, -1, -1, -1, -1, 2, 5, 3, 3, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 1
            }, {
                index: 2,
                type: 10
            }, {
                index: 1,
                type: 6
            }, {
                index: 3,
                type: 9
            }, {
                index: 5,
                type: 7
            }, {
                index: 3,
                type: 2
            }, {
                index: 1,
                type: 4
            }, {
                index: 6,
                type: 5
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, -1, -1, 1, 1, 1, -1, -1, -1, 5, 5, 5, 7, 7, -1, -1, -1, -1, -1, 2, 2, 6, 6, 6, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 2
            }, {
                index: 1,
                type: 9
            }, {
                index: 5,
                type: 3
            }, {
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 1
            }, {
                index: 2,
                type: 6
            }, {
                index: 0,
                type: 7
            }, {
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 4
            }]
        }, {
            grid: [6, 6, 6, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 10, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 4, -1, -1, -1, -1, -1, -1, -1, 7, -1, 4, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 6
            }, {
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 4
            }, {
                index: 2,
                type: 5
            }, {
                index: 7,
                type: 3
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 1
            }, {
                index: 6,
                type: 8
            }]
        }, {
            grid: [8, 8, -1, -1, -1, 6, 6, 6, 1, 1, 8, 2, -1, -1, 7, 7, 7, -1, -1, 1, -1, 2, 9, 5, 5, -1, -1, -1, -1, 10, -1, 9, 9, 5, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 4,
                type: 8
            }, {
                index: 2,
                type: 6
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 2
            }, {
                index: 3,
                type: 10
            }, {
                index: 2,
                type: 7
            }, {
                index: 6,
                type: 9
            }]
        }, {
            grid: [10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 3, 1, 1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, 4, 4, -1, -1],
            pieces: [{
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 9
            }]
        }, {
            grid: [6, 6, 9, 9, 1, 1, -1, -1, -1, -1, -1, 6, 10, 10, -1, 1, -1, -1, -1, -1, -1, -1, 10, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 4,
                type: 10
            }, {
                index: 5,
                type: 3
            }, {
                index: 1,
                type: 2
            }, {
                index: 7,
                type: 1
            }]
        }],
        [{
            grid: [4, 5, 5, 6, 6, 8, 8, -1, -1, -1, 4, 5, 5, 7, 7, -1, 1, -1, -1, -1, -1, -1, 3, 3, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 1
            }, {
                index: 1,
                type: 4
            }, {
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 10
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 3
            }]
        }, {
            grid: [1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 2, 6, 6, 6, -1, -1, -1, -1, 3, 2, 2, 8, 4, 4, 5, 5, 10, -1, -1, -1, -1, 8, 4, -1, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 6
            }, {
                index: 6,
                type: 2
            }, {
                index: 6,
                type: 10
            }, {
                index: 1,
                type: 8
            }, {
                index: 4,
                type: 3
            }, {
                index: 0,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 4,
                type: 5
            }, {
                index: 4,
                type: 4
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [1, -1, 6, 6, 3, 3, -1, -1, -1, -1, 1, 10, 4, 2, 2, 3, -1, -1, -1, -1, 1, 10, 4, 4, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 3
            }, {
                index: 5,
                type: 4
            }, {
                index: 5,
                type: 8
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 10
            }, {
                index: 3,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 9
            }, {
                index: 8,
                type: 7
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, 8, 8, 7, -1, -1, -1, 9, 9, 1,
                1, 2, 2, 7, 7, -1, -1, -1, -1, 1, -1, -1, 2, -1, -1
            ],
            pieces: [{
                index: 7,
                type: 2
            }, {
                index: 5,
                type: 7
            }, {
                index: 7,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 5
            }, {
                index: 8,
                type: 9
            }, {
                index: 3,
                type: 6
            }, {
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 4
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 8, 8, 8, -1, -1, -1, -1, -1, -1, 1, 5, 5, 7, 7, -1, -1, -1, -1, -1, 1, 1, 5, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, 6, -1, -1, -1, -1, -1, -1, 9, 9, -1, 6, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 8,
                type: 4
            }, {
                index: 5,
                type: 1
            }, {
                index: 6,
                type: 9
            }, {
                index: 8,
                type: 10
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, 5, -1, -1, -1, -1, -1, -1, 3, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 9, 9, 9, -1, -1, -1, -1, -1, 10, 1, 1, 7, 7, -1, -1, -1, -1, -1, -1, 1, -1, 7, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 7,
                type: 4
            }, {
                index: 2,
                type: 9
            }, {
                index: 4,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 3
            }, {
                index: 2,
                type: 5
            }, {
                index: 6,
                type: 8
            }, {
                index: 5,
                type: 6
            }]
        }, {
            grid: [3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 9, 4, 4, 4, -1, -1, -1, -1, -1, 9, 9, 2, 2, 5, 6, -1, -1, -1, -1, -1, 7, 7, 2, 5, 6, 6, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 1
            }, {
                index: 1,
                type: 5
            }, {
                index: 6,
                type: 9
            }, {
                index: 7,
                type: 2
            }, {
                index: 8,
                type: 10
            }, {
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 3
            }, {
                index: 6,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 6
            }]
        }, {
            grid: [6, 6, 9, 9, 2, 2, -1, -1, -1, -1, 1, 1, 7, 7, 7, 3, 3, -1, -1, -1, 1, 1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 8, 10, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 10
            }, {
                index: 6,
                type: 8
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 4
            }, {
                index: 8,
                type: 5
            }, {
                index: 8,
                type: 1
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [1, 1, 9, 9, 6, 6, 6, -1, -1, -1, -1, 2, 2, 2, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 10, 10, -1, -1, -1, -1, -1, -1, 8, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 6
            }, {
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 3,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 7,
                type: 8
            }, {
                index: 3,
                type: 4
            }]
        }, {
            grid: [6, 6, 3, 3, 3, -1, -1, -1, -1, -1, 6, 5, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, 4, -1, -1, -1, -1, -1, -1, -1, 2, 7, 4, 8, 8, -1, -1, -1, -1, -1, 2, -1, 4, 8, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 1,
                type: 7
            }, {
                index: 5,
                type: 9
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 8
            }, {
                index: 3,
                type: 2
            }, {
                index: 3,
                type: 1
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 6
            }]
        }, {
            grid: [3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, 10, -1, -1, -1, -1, -1, -1, -1, 5, 5, 10, -1, -1, -1, -1, -1, -1, -1, 6, 2, 2, -1, 1, 1, 8, -1, -1, -1, 6, 2, 2, 4, 9, -1, 8, -1, -1, -1, 6, -1, -1, 4, 9, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 7
            }, {
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 1,
                type: 9
            }, {
                index: 3,
                type: 6
            }, {
                index: 3,
                type: 8
            }, {
                index: 8,
                type: 2
            }, {
                index: 7,
                type: 10
            }, {
                index: 1,
                type: 4
            }]
        }, {
            grid: [2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1,
                8, 4, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, -1, -1, -1, -1, -1, -1, -1, 8, 3, 6, -1, -1, -1, -1, -1, -1, -1, 3, 3, 6, -1, -1, -1, -1, -1, -1, -1, -1, 9, 10, 10, -1, -1, -1, -1, -1, -1, 9, 9, -1, 5, 5, 7, 7, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 7,
                type: 1
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 6,
                type: 3
            }, {
                index: 3,
                type: 8
            }, {
                index: 6,
                type: 9
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, 10, 10, -1, -1, -1, 5, 7, 9, 9, 8, 8, 10, -1, -1, -1, -1, 7, -1, -1, 8, 8, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 3,
                type: 5
            }, {
                index: 8,
                type: 8
            }, {
                index: 8,
                type: 4
            }, {
                index: 4,
                type: 2
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 1
            }, {
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 7
            }, {
                index: 4,
                type: 3
            }]
        }, {
            grid: [1, 1, 6, 6, 2, 2, 2, -1, -1, -1, -1, 10, 10, 3, 3, 4, -1, -1, -1, -1, -1, 10, -1, -1, 7, 4, 4, -1, -1, -1, -1, -1, -1, 7, 7, 5, 5, 9, -1, -1, -1, -1, -1, -1, -1, 5, 5, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 10
            }, {
                index: 8,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 5,
                type: 9
            }, {
                index: 5,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 0,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 6,
                type: 7
            }]
        }, {
            grid: [8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 9, 9, -1, -1, -1, -1, -1, -1, -1, 3, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 3
            }, {
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 5
            }, {
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 1
            }]
        }, {
            grid: [10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 5, -1, -1, -1, -1, -1, -1, -1, 9, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, -1, -1, -1, -1, -1, -1, -1, -1,
                1, 1, -1, -1, -1, 7, 7, -1, -1, -1, 3, 3, 2, 2, 6, 6, 7, -1, -1, -1, 3, 3, -1, 2, -1, 6, -1
            ],
            pieces: [{
                index: 3,
                type: 8
            }, {
                index: 2,
                type: 10
            }, {
                index: 1,
                type: 5
            }, {
                index: 6,
                type: 1
            }, {
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 7
            }, {
                index: 8,
                type: 3
            }, {
                index: 7,
                type: 6
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, 8, 8, 8, -1, -1, -1, -1, -1, 10, 2, 2, 3, 3, -1, -1, -1, -1, -1, 4, 4, 2, 3, 3, -1, -1, -1, -1, -1, -1, 4, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, 6, 6, -1, -1],
            pieces: [{
                index: 4,
                type: 7
            }, {
                index: 2,
                type: 6
            }, {
                index: 4,
                type: 9
            }, {
                index: 3,
                type: 10
            }, {
                index: 8,
                type: 3
            }, {
                index: 2,
                type: 1
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 4
            }, {
                index: 1,
                type: 5
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 3, 3, 3, 10, 10, -1, -1, -1, 2, 8, 8, 9, 9, 1, 1, -1, -1, -1, -1, 8, -1, 9, -1, 1, 1],
            pieces: [{
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 5,
                type: 4
            }, {
                index: 4,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 3,
                type: 6
            }, {
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 2,
                type: 3
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 8, 8, -1, -1, -1, -1, -1, -1, 1, 1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 5, 7, -1, 3, 3, 3, -1, -1, -1, -1, 5, 5, 6, 6, 6, -1, -1],
            pieces: [{
                index: 6,
                type: 1
            }, {
                index: 4,
                type: 4
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 5
            }, {
                index: 7,
                type: 7
            }, {
                index: 2,
                type: 3
            }, {
                index: 2,
                type: 6
            }, {
                index: 0,
                type: 8
            }, {
                index: 1,
                type: 2
            }]
        }, {
            grid: [2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, 5, 5, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, 3, 3, -1, -1, -1, -1, -1, 8, -1, 7, 7, 3, -1, -1, -1, -1, -1, 6, 6, 6, 7, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, -1],
            pieces: [{
                index: 8,
                type: 5
            }, {
                index: 7,
                type: 1
            }, {
                index: 2,
                type: 10
            }, {
                index: 7,
                type: 3
            }, {
                index: 0,
                type: 4
            }, {
                index: 7,
                type: 7
            }, {
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 3,
                type: 8
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [2, 7, 7, -1, -1, -1, -1, -1, -1, -1, 2, -1, 7, -1, -1, -1, -1, -1, -1, -1, 2, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, 5, 5, 5, -1, -1, -1, 4, 4, 8, 8, 8, -1, -1, -1, -1, -1, 4, 10, 1, 1, 1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 2,
                type: 1
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 5,
                type: 10
            }, {
                index: 6,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 2
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 7, -1, 10, 10, 10, -1, -1, -1, -1, -1, 7, 5, 5, 5, 9, 2, 2, -1, -1, -1, 3, 3, -1, -1, 9, 9, 2, -1, -1, -1, 3, 3, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1],
            pieces: [{
                index: 1,
                type: 7
            }, {
                index: 7,
                type: 8
            }, {
                index: 7,
                type: 2
            }, {
                index: 4,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 10
            }, {
                index: 8,
                type: 3
            }, {
                index: 2,
                type: 5
            }, {
                index: 5,
                type: 9
            }, {
                index: 1,
                type: 4
            }]
        }, {
            grid: [4,
                4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, 6, 6, 6, 5, 5, 5, -1, -1, 1, 7, 7, -1, -1, 3, 3, -1, -1, 1, 1, 7, 7, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1
            ],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 2,
                type: 6
            }, {
                index: 7,
                type: 10
            }, {
                index: 8,
                type: 7
            }, {
                index: 8,
                type: 3
            }, {
                index: 6,
                type: 2
            }, {
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 9
            }, {
                index: 7,
                type: 4
            }, {
                index: 6,
                type: 1
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, 9, 7, 7, 7, -1, -1, -1, -1, -1, 8, 10, 10, 5, -1, -1, -1, -1, -1, -1, 6, 6, 5, 5, -1, -1, -1, -1, -1, -1, 6, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 9
            }, {
                index: 1,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 2
            }, {
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 6
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 3
            }, {
                index: 4,
                type: 1
            }]
        }, {
            grid: [1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, 3, 3, 10, 10, -1, -1, -1, -1, 4, 7, 7, 3, 10, 10, 6, -1, -1, -1, 4, 7, 7, -1, -1, -1, 6, 2, 2, -1, -1, -1, -1, -1, -1, -1, 9, 5, -1, -1, -1, -1, -1, -1, -1, -1, 9, 5, 5, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1],
            pieces: [{
                index: 7,
                type: 3
            }, {
                index: 3,
                type: 4
            }, {
                index: 5,
                type: 5
            }, {
                index: 7,
                type: 1
            }, {
                index: 1,
                type: 6
            }, {
                index: 3,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 7
            }, {
                index: 5,
                type: 8
            }, {
                index: 8,
                type: 10
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, 3, 3, 5, 5, -1, -1, -1, -1, 7, 7, -1, -1, -1, 1, -1, -1, -1, -1, -1, 7, -1, -1, -1,
                1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 2, 2, 2, -1, -1, -1, -1, -1, 8, 10, 6, 6, -1, -1, -1, -1, -1, -1, 8, 10, 10, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1
            ],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 2,
                type: 2
            }, {
                index: 8,
                type: 9
            }, {
                index: 7,
                type: 7
            }, {
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 10
            }, {
                index: 3,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [6, 6, 6, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, 3, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 1, 1, 9, 9, -1, -1, -1, -1, -1, 2, -1, 1, 4, 10, 10, -1, -1, -1, -1, -1, -1, 4, 4, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 4
            }, {
                index: 7,
                type: 1
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 2
            }, {
                index: 8,
                type: 5
            }, {
                index: 2,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 8
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [7, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 4, 4, 6, 5, 5, -1, -1, -1, -1, -1, 4, -1, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, 6, 2, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, 1, 9, 9, 9, -1, -1, -1, -1, -1, -1, 1, 1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 1
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 9
            }, {
                index: 3,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 4,
                type: 4
            }, {
                index: 5,
                type: 10
            }]
        }, {
            grid: [10, 10, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, 4, 2, 7, 7, 8, -1, -1, -1, -1, -1, 4, 2, 1, 1, 8, -1, -1, -1, -1, -1, 5, 5, 6, 6, -1, -1, -1, -1, -1, -1, 5, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 0,
                type: 10
            }, {
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 1
            }, {
                index: 1,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 8
            }, {
                index: 1,
                type: 2
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 8, 2, 4, 4, 4, -1, -1, -1, -1, -1, 8, 2, 2, 10, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, -1, -1, -1, -1, -1, -1, -1, 3, 5, -1, -1, -1, -1, -1, -1, -1, 3, 3, 5, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 2
            }, {
                index: 1,
                type: 9
            }, {
                index: 1,
                type: 5
            }, {
                index: 3,
                type: 1
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 8
            }, {
                index: 2,
                type: 10
            }, {
                index: 6,
                type: 3
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [1, 9, 9, -1, -1, -1, -1, -1, -1, -1, 1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, 7, 7, 7, -1, -1, -1, -1, -1, 8, 8, 3, 3, 3, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 5,
                type: 8
            }, {
                index: 1,
                type: 1
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 4
            }]
        }, {
            grid: [9, 9, 8, 8, 8, -1, -1, -1, -1, -1, -1, 9, 7, 6, 6, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 5, 5, -1, -1, -1, -1, -1, -1, 1, -1, -1, 5],
            pieces: [{
                index: 2,
                type: 8
            }, {
                index: 6,
                type: 3
            }, {
                index: 0,
                type: 10
            }, {
                index: 6,
                type: 4
            }, {
                index: 5,
                type: 7
            }, {
                index: 4,
                type: 1
            }, {
                index: 7,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 7,
                type: 6
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, -1, 6, 6, -1, -1, -1, -1, -1, -1, 1, 1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1],
            pieces: [{
                index: 3,
                type: 5
            }, {
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 9
            }, {
                index: 4,
                type: 7
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 3
            }, {
                index: 5,
                type: 1
            }, {
                index: 1,
                type: 10
            }, {
                index: 7,
                type: 6
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 7, 7, -1, -1, -1, -1, -1, -1, -1, 8, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, 1, 1, 1, -1, -1, -1, -1, -1, 9, 9, 5, 5, 2, 2, -1, -1, -1, -1, -1, 9, 6, 6, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 0,
                type: 6
            }, {
                index: 7,
                type: 7
            }, {
                index: 7,
                type: 9
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 8
            }, {
                index: 6,
                type: 4
            }, {
                index: 8,
                type: 3
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 5
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 2, 2, 10, 10, 3, 3, -1, -1, -1, -1, -1, 2, 5, 10, 3, 8, 8, -1, -1, -1, -1, -1, 5, 5, -1, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 5
            }, {
                index: 8,
                type: 6
            }, {
                index: 1,
                type: 7
            }, {
                index: 1,
                type: 4
            }, {
                index: 4,
                type: 3
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 10
            }, {
                index: 2,
                type: 9
            }, {
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 1
            }]
        }, {
            grid: [4, 4, 8, 8, -1,
                6, 6, -1, -1, -1, 4, 4, 8, 8, 9, 9, 6, -1, -1, -1, -1, -1, -1, 3, 3, 9, 5, -1, -1, -1, -1, -1, -1, 3, 3, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, 7, 7, -1, -1, -1, -1, -1, -1, 1, 1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 5,
                type: 1
            }, {
                index: 8,
                type: 8
            }, {
                index: 7,
                type: 9
            }, {
                index: 7,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 6,
                type: 5
            }, {
                index: 8,
                type: 3
            }, {
                index: 2,
                type: 7
            }, {
                index: 8,
                type: 4
            }]
        }, {
            grid: [8, 8, -1, -1, -1, 4, 4, -1, -1, -1, 8, -1, -1, 7, 7, 7, 10, -1, -1, -1, 1,
                3, 3, 2, 2, -1, 10, 5, -1, -1, 1, 3, 3, -1, 2, -1, 10, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 3,
                type: 10
            }, {
                index: 4,
                type: 6
            }, {
                index: 4,
                type: 8
            }, {
                index: 6,
                type: 9
            }, {
                index: 0,
                type: 4
            }, {
                index: 3,
                type: 5
            }, {
                index: 8,
                type: 3
            }, {
                index: 7,
                type: 2
            }, {
                index: 2,
                type: 7
            }, {
                index: 1,
                type: 1
            }]
        }, {
            grid: [1, 1, 1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 6, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 3, 3, -1, -1, -1, -1, -1, -1, 9, 9, 2, 3, -1, -1, -1, -1, -1, -1, 9, -1, 2, 2, -1, -1],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 6,
                type: 10
            }, {
                index: 8,
                type: 7
            }, {
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 4
            }, {
                index: 7,
                type: 3
            }, {
                index: 0,
                type: 6
            }, {
                index: 5,
                type: 2
            }, {
                index: 2,
                type: 1
            }]
        }, {
            grid: [8, 10, 10, 3, 3, -1, -1, -1, -1, -1, 8, 2, 2, -1, 4, -1, -1, -1, -1, -1, -1, -1, 2, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1],
            pieces: [{
                index: 0,
                type: 3
            }, {
                index: 5,
                type: 7
            }, {
                index: 7,
                type: 2
            }, {
                index: 0,
                type: 5
            }, {
                index: 7,
                type: 1
            }, {
                index: 1,
                type: 8
            }, {
                index: 5,
                type: 6
            }, {
                index: 5,
                type: 4
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 10
            }]
        }, {
            grid: [7, 7, 4, 4, -1, -1, -1, -1, -1, -1, -1, 7, 3, 2, -1, -1, -1, -1, -1, -1, -1, -1, 3, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, 1, 1, 10, -1, -1, -1, -1, -1, 6, 6, 1, -1, 10, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 3
            }, {
                index: 6,
                type: 9
            }, {
                index: 1,
                type: 2
            }, {
                index: 6,
                type: 5
            }, {
                index: 8,
                type: 6
            }, {
                index: 4,
                type: 1
            }, {
                index: 7,
                type: 7
            }]
        }, {
            grid: [5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 3, 3, -1, -1, -1, -1, -1, -1, -1, 2, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, -1, 8, 6, -1, -1, -1, -1, -1, -1, 9, -1, -1, 6],
            pieces: [{
                index: 4,
                type: 5
            }, {
                index: 7,
                type: 3
            }, {
                index: 0,
                type: 4
            }, {
                index: 1,
                type: 6
            }, {
                index: 3,
                type: 9
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 8,
                type: 7
            }, {
                index: 0,
                type: 1
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, 6, 6, -1, -1, -1, -1, -1, -1, 8, 10, 10, 2, 2, -1, -1, -1, -1, -1, 8, 4, -1, 9, 9, -1, -1, -1, -1, -1, -1, 4, -1, 9, 9, -1, -1, -1, -1, -1, -1, 4, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 8,
                type: 1
            }, {
                index: 0,
                type: 3
            }, {
                index: 6,
                type: 7
            }, {
                index: 8,
                type: 9
            }, {
                index: 0,
                type: 6
            }, {
                index: 3,
                type: 4
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [3, 3, 9, 9, 9, 8, 8, 8, -1, -1, -1, 3, 2, 2, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, -1, -1, -1, -1, -1, -1, -1, 4, 4, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 9
            }, {
                index: 6,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 7,
                type: 3
            }, {
                index: 5,
                type: 10
            }, {
                index: 5,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 2
            }]
        }, {
            grid: [7, -1, 1, 1, 1, -1, -1, -1, -1, -1, 7, -1, 3, 3, 8, -1, -1, -1, -1, -1, 7, 9, 9, 9, 8, 8, -1, -1, -1, -1, 6, 4, 4, 4, 10, 10, 2, 2, 5, 5, 6, -1, -1, -1, 10, 10, 2, -1, -1, 5, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 10
            }, {
                index: 2,
                type: 4
            }, {
                index: 5,
                type: 8
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 2
            }, {
                index: 0,
                type: 3
            }, {
                index: 3,
                type: 6
            }, {
                index: 7,
                type: 5
            }]
        }, {
            grid: [4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, 4, 5, 2, 2, 2, 1, 1, 3, 3, 3, -1, 10, 10, -1, -1, -1, 6, 6, 9, 9, -1, -1, 10, -1, -1, -1, 6, -1, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 6
            }, {
                index: 4,
                type: 8
            }, {
                index: 0,
                type: 1
            }, {
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 4
            }, {
                index: 7,
                type: 10
            }, {
                index: 4,
                type: 9
            }, {
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 7
            }]
        }, {
            grid: [6, 10, -1, -1, -1, -1, -1, -1, -1, -1, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 9, 9, 9, 8, 8, -1, -1, -1, -1, 4, 4, 4, 3, 3, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 6,
                type: 5
            }, {
                index: 1,
                type: 2
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 9
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 0,
                type: 7
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 10
            }]
        }, {
            grid: [4, 9, 9, 10, 10, 5, 5, -1, -1, -1, 4, 6, 6, 10, -1, 5, 8, 8, -1, -1, 4, 6, 6, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 4
            }, {
                index: 2,
                type: 1
            }, {
                index: 8,
                type: 6
            }, {
                index: 8,
                type: 8
            }, {
                index: 4,
                type: 5
            }, {
                index: 1,
                type: 2
            }, {
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 7
            }, {
                index: 3,
                type: 3
            }]
        }, {
            grid: [4, 4, 4, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, 6, 6, 9, 9, -1, -1, 2, 2, 5, 5, 10, 6, 9, 1, -1, -1, -1, -1, 5, 5, 10, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 7,
                type: 6
            }, {
                index: 0,
                type: 2
            }, {
                index: 8,
                type: 3
            }, {
                index: 8,
                type: 5
            }, {
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 4
            }, {
                index: 6,
                type: 8
            }, {
                index: 3,
                type: 1
            }, {
                index: 1,
                type: 7
            }]
        }, {
            grid: [6, 6, 4, 4, -1, -1, -1, -1, -1, -1, 6, 6, 1,
                1, -1, 9, 9, -1, -1, -1, -1, -1, 1, 1, 7, 7, 10, 10, -1, -1, -1, -1, -1, -1, 7, 7, 10, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 3, -1, -1, -1, -1, -1, 5, 8, 2, 2, -1, -1, -1, -1, -1, 5, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 8,
                type: 6
            }, {
                index: 8,
                type: 7
            }, {
                index: 6,
                type: 2
            }, {
                index: 3,
                type: 3
            }, {
                index: 0,
                type: 4
            }, {
                index: 6,
                type: 5
            }, {
                index: 5,
                type: 8
            }, {
                index: 8,
                type: 1
            }, {
                index: 4,
                type: 10
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [4, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, 1, 1, 1, -1, -1, -1, -1, 5, 5, 2, 2, 9, 9, 9, -1, -1, -1, -1, 8, 8, -1, 10, -1, -1, -1, -1, -1, -1, 8, -1, 7, 10, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 5
            }, {
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 1
            }, {
                index: 4,
                type: 8
            }, {
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 9
            }, {
                index: 0,
                type: 2
            }, {
                index: 1,
                type: 7
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 6
            }]
        }, {
            grid: [10, 10, 2, 2, 7, 7, -1, -1, -1, -1, -1, -1, 2, 2, 7, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, 6, 5, 1, 1, 1, -1, -1, -1, -1, -1, 6, 6, 8, 8, -1, -1, -1, -1, -1, -1, -1, 9, 9, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 8,
                type: 2
            }, {
                index: 4,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 7
            }, {
                index: 1,
                type: 4
            }, {
                index: 7,
                type: 8
            }, {
                index: 5,
                type: 6
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 3
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, 6, 6, -1, -1, -1, -1, -1, -1, 1, 1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 5, 5, -1, -1, -1, -1, -1, -1, 3, 4, 4,
                2, 2, 2, -1, -1, -1, -1, -1, -1, 4, 10, 8, 8, -1, -1, -1, -1, -1, -1, -1, 10, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1
            ],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 3
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 10
            }, {
                index: 7,
                type: 4
            }, {
                index: 6,
                type: 7
            }, {
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 6
            }]
        }, {
            grid: [9, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, 6, 8, -1, -1, -1, -1, -1, -1, -1, -1, 6, 8, 3, 3, 3, 10, -1, -1, -1, -1, 4, 1, 1, -1, -1, 10, 10, -1, -1, -1, 4, 4, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 6
            }, {
                index: 5,
                type: 4
            }, {
                index: 0,
                type: 1
            }, {
                index: 5,
                type: 10
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 5
            }, {
                index: 5,
                type: 7
            }, {
                index: 8,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 1,
                type: 8
            }]
        }, {
            grid: [2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 3, -1, -1, -1, 9, 9, 6, 6, -1, 3, 3, 5, 5, 7, 7, 7, 4, 4, -1, -1, -1, -1, 5, 1, 1, -1, 4, 4, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1],
            pieces: [{
                index: 6,
                type: 3
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 6
            }, {
                index: 8,
                type: 2
            }, {
                index: 7,
                type: 1
            }, {
                index: 3,
                type: 8
            }, {
                index: 8,
                type: 4
            }, {
                index: 7,
                type: 5
            }, {
                index: 1,
                type: 10
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 5, 2, 2, -1, 4, 4, -1, -1, -1, -1, 5,
                5, 8, 8, 8, 9, 9, -1
            ],
            pieces: [{
                index: 0,
                type: 9
            }, {
                index: 4,
                type: 6
            }, {
                index: 1,
                type: 1
            }, {
                index: 5,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 10
            }, {
                index: 0,
                type: 2
            }, {
                index: 0,
                type: 4
            }, {
                index: 3,
                type: 7
            }, {
                index: 3,
                type: 3
            }]
        }, {
            grid: [6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, 2, 2, 2, -1, -1, 6, -1, -1, 5, 5, 5, 9, -1, -1, -1, 3, 3, -1, 4, 4, 4, 9, -1, -1, -1, -1, 3, 8, 8, -1, -1, 10, -1, -1, -1, -1, 7, 7, 8, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 2
            }, {
                index: 3,
                type: 10
            }, {
                index: 2,
                type: 5
            }, {
                index: 3,
                type: 6
            }, {
                index: 5,
                type: 1
            }, {
                index: 7,
                type: 3
            }, {
                index: 1,
                type: 9
            }, {
                index: 0,
                type: 7
            }]
        }, {
            grid: [6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, 10, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, 9, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, 8, 7, 7, -1, -1, -1, -1, -1, -1, -1, 8, -1, 5, 5, 4, 3, 3, 3, -1, -1, 8, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 2,
                type: 3
            }, {
                index: 8,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 3,
                type: 4
            }, {
                index: 0,
                type: 2
            }, {
                index: 2,
                type: 9
            }, {
                index: 3,
                type: 8
            }]
        }, {
            grid: [10, 10, 10, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, 9, 9, 9, -1, -1, 7, 3, 3, 3, -1, 1, 1, -1, -1, -1, 7, 7, 4, 4, 5, 5, -1, -1, -1, -1, -1, -1, 4, 6, 2, 2, -1, -1, -1, -1, -1, -1, -1, 6, 6, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 1
            }, {
                index: 3,
                type: 8
            }, {
                index: 2,
                type: 9
            }, {
                index: 2,
                type: 10
            }, {
                index: 4,
                type: 4
            }, {
                index: 5,
                type: 6
            }, {
                index: 5,
                type: 7
            }, {
                index: 2,
                type: 3
            }, {
                index: 7,
                type: 2
            }]
        }, {
            grid: [1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, 5, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, 9, 9, -1, -1, -1, -1, -1, -1, 4, 4, 4, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 8, 8, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1],
            pieces: [{
                index: 1,
                type: 2
            }, {
                index: 2,
                type: 3
            }, {
                index: 0,
                type: 8
            }, {
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 4
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 5
            }, {
                index: 2,
                type: 1
            }, {
                index: 1,
                type: 6
            }]
        }, {
            grid: [8, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, 7, 7, 3, 3, -1, -1, -1, -1, 1, 4, 4, 2, 2, 3, 9, -1, -1, -1, -1, 4, 4, 2, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 7
            }, {
                index: 7,
                type: 3
            }, {
                index: 3,
                type: 1
            }, {
                index: 5,
                type: 6
            }, {
                index: 0,
                type: 10
            }, {
                index: 4,
                type: 2
            }, {
                index: 5,
                type: 9
            }, {
                index: 8,
                type: 4
            }, {
                index: 2,
                type: 8
            }]
        }, {
            grid: [1,
                1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 5, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, 3, 3, -1, -1, -1, -1, -1, 10, 2, 2, 2, 4, 4, 4, -1
            ],
            pieces: [{
                index: 4,
                type: 9
            }, {
                index: 4,
                type: 1
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 3
            }, {
                index: 1,
                type: 6
            }, {
                index: 2,
                type: 8
            }, {
                index: 6,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 2,
                type: 4
            }, {
                index: 2,
                type: 5
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, 8, 8, -1, -1, -1, -1, -1, 2, -1, 7, 7, 5, 5, 5, -1, -1, -1, 1, 9, 9, 7, -1, 6, 6, -1, -1, -1, 1, 1, 9, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 2,
                type: 5
            }, {
                index: 1,
                type: 2
            }, {
                index: 8,
                type: 4
            }, {
                index: 7,
                type: 9
            }, {
                index: 8,
                type: 3
            }, {
                index: 4,
                type: 10
            }, {
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 8
            }]
        }, {
            grid: [7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, 3, -1, -1, -1, -1, -1, -1, -1, 2, 2, 2, -1, -1, -1, 4, 4, 4, -1, -1, 9, 9, -1, -1, 10, 10, -1, 1, -1, -1, -1, 9, 8, 8, 8, -1, -1, 1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 6
            }, {
                index: 3,
                type: 7
            }, {
                index: 2,
                type: 8
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 1
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 4
            }, {
                index: 7,
                type: 9
            }]
        }, {
            grid: [6, 6, 4, 4, -1, -1, -1, -1, -1, -1, 6, 6, 5, 8, -1, -1, -1, -1, -1, -1, -1, -1, 5, 8, 8, -1, -1, -1, -1, -1, -1, -1, 5, 1, 9, 9, 9, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, 2, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 3,
                type: 5
            }, {
                index: 7,
                type: 2
            }, {
                index: 8,
                type: 6
            }, {
                index: 2,
                type: 9
            }, {
                index: 5,
                type: 8
            }, {
                index: 7,
                type: 10
            }, {
                index: 0,
                type: 4
            }, {
                index: 0,
                type: 3
            }, {
                index: 6,
                type: 1
            }, {
                index: 1,
                type: 7
            }]
        }, {
            grid: [10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 9, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, 2, 2, 2, -1, -1, -1, 6, 6, 8, 8, 8, -1, 1, 1, -1, -1, 6, 7, 7, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1],
            pieces: [{
                index: 0,
                type: 7
            }, {
                index: 1,
                type: 10
            }, {
                index: 8,
                type: 5
            }, {
                index: 2,
                type: 8
            }, {
                index: 7,
                type: 4
            }, {
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 6,
                type: 3
            }, {
                index: 4,
                type: 9
            }]
        }, {
            grid: [6, 6, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 10, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, 9, 9, 7, -1, -1, -1, 3, 4, -1, 8, 8, 7, 7, -1, -1, 3, 3, 2, 2, 2, 5, 1, 1, 1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 2,
                type: 2
            }, {
                index: 0,
                type: 8
            }, {
                index: 2,
                type: 1
            }, {
                index: 0,
                type: 6
            }, {
                index: 6,
                type: 3
            }, {
                index: 7,
                type: 4
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 7
            }, {
                index: 3,
                type: 5
            }, {
                index: 3,
                type: 10
            }]
        }, {
            grid: [6, 10, 10, 10, 5, 5, -1, -1, -1, -1, 6, 7, 7, 7, 5, 9, 9, -1, -1, -1, 6, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 2, 2, 2, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1],
            pieces: [{
                index: 6,
                type: 3
            }, {
                index: 4,
                type: 1
            }, {
                index: 4,
                type: 5
            }, {
                index: 6,
                type: 4
            }, {
                index: 3,
                type: 6
            }, {
                index: 2,
                type: 7
            }, {
                index: 2,
                type: 2
            }, {
                index: 2,
                type: 10
            }, {
                index: 7,
                type: 8
            }, {
                index: 0,
                type: 9
            }]
        }, {
            grid: [9, 9, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, 1, 1, -1, 3, 3, 3, -1, -1, -1, -1, 1, 6, 6, 7, 10, 10, -1, -1, -1, -1, -1, 6, 6, 7, 7, 5, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, -1, -1, -1, -1, -1, -1, -1, -1, -1, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1],
            pieces: [{
                index: 0,
                type: 10
            }, {
                index: 8,
                type: 6
            }, {
                index: 5,
                type: 2
            }, {
                index: 6,
                type: 5
            }, {
                index: 5,
                type: 7
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 4
            }, {
                index: 4,
                type: 1
            }, {
                index: 2,
                type: 3
            }, {
                index: 5,
                type: 8
            }]
        }, {
            grid: [10, 10, -1, -1, -1, -1, 5, 5, 5, -1, -1, 8, 8, 7, 7, 7, 6, -1, 3, -1, -1, -1, 8, 4, 4, -1, 6, 1, 3, -1, -1, -1, 9, 9, 4, -1, 6, 1, 3, -1, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 7,
                type: 4
            }, {
                index: 7,
                type: 2
            }, {
                index: 7,
                type: 8
            }, {
                index: 2,
                type: 5
            }, {
                index: 0,
                type: 9
            }, {
                index: 2,
                type: 7
            }, {
                index: 0,
                type: 10
            }, {
                index: 1,
                type: 1
            }, {
                index: 3,
                type: 3
            }, {
                index: 3,
                type: 6
            }]
        }, {
            grid: [4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, -1, 8, 8, -1, -1, -1, -1, -1, -1, -1, -1, 8, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 5, 5, 7, 7, -1, -1, -1, -1, -1, -1, 3, 10, 10, 7, 6, 6, 2, -1, -1, -1, 3, -1, -1, 9, 9, 2, 2, -1, -1, -1, -1, -1, -1, 9, 9, -1, -1, -1],
            pieces: [{
                index: 8,
                type: 9
            }, {
                index: 1,
                type: 3
            }, {
                index: 6,
                type: 2
            }, {
                index: 7,
                type: 1
            }, {
                index: 7,
                type: 7
            }, {
                index: 0,
                type: 5
            }, {
                index: 0,
                type: 10
            }, {
                index: 8,
                type: 4
            }, {
                index: 0,
                type: 6
            }, {
                index: 4,
                type: 8
            }]
        }, {
            grid: [4, 6, -1, -1, -1, -1, -1, -1, -1, -1, 4, 6, 6, -1, -1, -1, -1, -1, -1, -1, 4, 5, -1, -1, -1, -1, -1, -1, -1, -1, 3, 5, 8, 8, -1, -1, -1, -1, -1, -1, 3, 7, 7, 8, 9, 9, 9, -1, -1, -1, 3, 7, 7, 1, 10, -1, -1, -1, -1, -1, -1, -1, -1, 1, 10, -1, -1, -1, -1, -1, -1, -1, 2, 1, 10, -1, -1, -1, -1, -1, -1, -1, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1],
            pieces: [{
                index: 5,
                type: 6
            }, {
                index: 3,
                type: 3
            }, {
                index: 3,
                type: 10
            }, {
                index: 7,
                type: 8
            }, {
                index: 1,
                type: 5
            }, {
                index: 5,
                type: 2
            }, {
                index: 2,
                type: 9
            }, {
                index: 3,
                type: 4
            }, {
                index: 8,
                type: 7
            }, {
                index: 3,
                type: 1
            }]
        }, {
            grid: [8, 5, 9, 9, -1, -1, -1, -1, -1, -1, 8, 5, 5, 2, 2, -1, -1, -1, -1, -1, -1, -1, -1, -1, 2, 7, 7, -1, -1, -1, -1, -1, -1, -1, -1, 7, 10, -1, -1, -1, -1, -1, -1, -1, -1, 10, 10, 4, 4, -1, -1, -1, -1, -1, -1, -1, -1, 4, 1, 1, -1, -1, -1, -1, -1, -1, -1, -1, 3, -1, -1, -1, -1, -1, -1, -1, -1, -1, 3, 3, -1, -1, -1, -1, -1, -1, -1, -1, 6, 6, -1, -1, -1, -1, -1, -1, -1, -1, 6, -1],
            pieces: [{
                index: 4,
                type: 4
            }, {
                index: 4,
                type: 7
            }, {
                index: 5,
                type: 3
            }, {
                index: 0,
                type: 1
            }, {
                index: 4,
                type: 6
            }, {
                index: 0,
                type: 9
            }, {
                index: 6,
                type: 10
            }, {
                index: 5,
                type: 5
            }, {
                index: 1,
                type: 8
            }, {
                index: 7,
                type: 2
            }]
        }]
    ];

function CLevelMenu() {
    var a, c, b, d, e, f, g, h, k, l, p, n, u, x = [],
        q = [],
        A = null,
        y = null,
        C, t, m, v, r, w = 0,
        D = [],
        B, H, I = 0,
        N = 1,
        O, T;
    this._init = function() {
        C = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(C);
        var G = s_oSpriteLibrary.getSprite("levels_box");
        p = CANVAS_WIDTH / 2;
        n = CANVAS_HEIGHT / 2;
        LEVELS.forEach(function(V, Y) {
            0 < V.length && (D.push(Y), s_aUnlockedLevels.push(parseInt(getSavedLevel(Y))))
        });
        O = D.length;
        B = Math.ceil(O / 12) - 1;
        this._createDimLevelsBoxes();
        T = q[0].getWidth();
        q[0].getHeight();
        G = s_oSpriteLibrary.getSprite("but_left");
        e = CANVAS_WIDTH / 2 - T / 2 - G.width / 2;
        f = CANVAS_HEIGHT / 2;
        v = new CGfxButton(e, f, G, s_oStage);
        v.addEventListener(ON_MOUSE_UP, this._onLeftBut, this);
        0 == w && (v.setVisible(!1), v.deactivate());
        G = s_oSpriteLibrary.getSprite("but_right");
        b = CANVAS_WIDTH / 2 + T / 2 + G.width / 2;
        d = CANVAS_HEIGHT / 2;
        r = new CGfxButton(b, d, G, s_oStage);
        r.addEventListenerWithParams(ON_MOUSE_UP, this._onRightBut, this, !0);
        w == B && (r.setVisible(!1), r.deactivate());
        G = s_oSpriteLibrary.getSprite("but_exit_menu");
        a = CANVAS_WIDTH - G.height / 2 - 10;
        c = G.height / 2 + 10;
        u = new CGfxButton(a, c, G, s_oStage);
        u.addEventListener(ON_MOUSE_UP, this._onExitBut, this);
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) G = s_oSpriteLibrary.getSprite("audio_icon_menu"), k = a - G.width / 2 - 10, l = G.height / 2 + 10, t = new CToggle(k, l, G, s_bAudioActive, s_oStage), t.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        G = window.document;
        var P = G.documentElement;
        A = P.requestFullscreen || P.mozRequestFullScreen || P.webkitRequestFullScreen || P.msRequestFullscreen;
        y = G.exitFullscreen || G.mozCancelFullScreen || G.webkitExitFullscreen || G.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (A = !1);
        A && screenfull.isEnabled && (G = s_oSpriteLibrary.getSprite("but_fullscreen_menu"), g = G.width / 4 + 10, h = G.height / 2 + 10, m = new CToggle(g, h, G, s_bFullscreen, s_oStage), m.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        var U = new createjs.Shape;
        U.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(U);
        createjs.Tween.get(U).to({
            alpha: 0
        }, 1E3).call(function() {
            U.visible = !1
        });
        setVolume("soundtrack", 1);
        this.refreshButtonPos();
        s_bStorageAvailable || new CAlertLocalStorage
    };
    this.unload = function() {
        u.unload();
        v.unload();
        r.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) t.unload(), t = null;
        A && screenfull.isEnabled && m.unload();
        q.forEach(function(G) {
            G.unload()
        });
        x.forEach(function(G) {
            G.unload()
        });
        s_aUnlockedLevels = [];
        s_oLevelMenu = null;
        s_oStage.removeAllChildren()
    };
    this.refreshButtonPos = function() {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || t.setPosition(k - s_iOffsetX, s_iOffsetY + l);
        A && screenfull.isEnabled && m.setPosition(g + s_iOffsetX, h + s_iOffsetY);
        u.setPosition(a - s_iOffsetX, s_iOffsetY + c);
        0 == I ? q.forEach(function(G) {
            G.setPosition(p, n)
        }) : x.forEach(function(G) {
            G.setPosition(p, n)
        })
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExitBut = function() {
        s_oLevelMenu.unload();
        s_oMain.gotoMenu()
    };
    this.onLevelBoxBut = function(G) {
        if (0 === I) {
            q[0].unload();
            q[1] && q[1].unload();
            I = G;
            N = LEVELS[G].length / (NUM_ROWS_PER_PAGE * NUM_COLS_PER_PAGE);
            G = LEVELS[I].length;
            w = 0;
            H = Math.ceil(G / 12) - 1;
            var P = s_oSpriteLibrary.getSprite("levels_box");
            x[0] = new CLevelsBox(p, n, s_oStage, G, P, I);
            x[0].playPulseAnimation();
            x[0].show(w, void 0, void 0, !0);
            1 <= H && (x[1] = new CLevelsBox(p, n, s_oStage, G, P, I), x[1].setVisible(!1));
            v.setVisible(!1);
            v.deactivate();
            w != H && (r.setVisible(!0), r.activate());
            s_oStage.setChildIndex(v.getButtonImage(), s_oStage.numChildren - 2);
            s_oStage.setChildIndex(r.getButtonImage(), s_oStage.numChildren - 3);
            this.refreshButtonPos();
            G = getSavedLevel(I);
            if (G > NUM_ROWS_PER_PAGE * NUM_COLS_PER_PAGE)
                for (G = Math.floor(G / (NUM_ROWS_PER_PAGE * NUM_COLS_PER_PAGE)), P = 0; P < G; P++) this._onRightBut(!1)
        } else this.unload(), s_oMain.gotoGame(I, G)
    };
    this._onLeftBut = function() {
        w--;
        if (isEven(w)) {
            var G = 1;
            var P = 0
        } else G = 0, P = 1;
        0 == I ? (q[G].show(w, D, !0, !0), q[P].hide(!1, !0)) : (x[G].show(w, void 0, !0, !0), x[P].hide(!1, !0));
        this._blockLeftAndRightBut();
        0 == w && (v.setVisible(!1), v.deactivate());
        r.setVisible(!0);
        r.activate()
    };
    this._onRightBut = function(G) {
        w++;
        if (isEven(w)) {
            var P = 1;
            var U = 0
        } else P = 0, U = 1;
        0 == I ? (q[P].show(w, D, !1, G), q[U].hide(!0, G)) : (x[P].show(w, void 0, !1, G), x[U].hide(!0, G));
        this._blockLeftAndRightBut();
        w === N - 1 && (r.setVisible(!1), r.deactivate());
        v.setVisible(!0);
        v.activate()
    };
    this.onBackBut = function() {
        w = I = 0;
        x.forEach(function(G) {
            G.unload()
        });
        this._createDimLevelsBoxes();
        v.setVisible(!1);
        v.deactivate();
        w != B ? (r.setVisible(!0), r.activate()) : (r.setVisible(!1), r.deactivate());
        s_oStage.setChildIndex(v.getButtonImage(), s_oStage.numChildren - 2);
        s_oStage.setChildIndex(r.getButtonImage(), s_oStage.numChildren - 1)
    };
    this._blockLeftAndRightBut = function() {
        v.deactivate();
        r.deactivate();
        setTimeout(v.activate, 300);
        setTimeout(r.activate, 300)
    };
    this.resetFullscreenBut = function() {
        A && screenfull.isEnabled && m.setActive(s_bFullscreen)
    };
    this._createDimLevelsBoxes = function() {
        var G = s_oSpriteLibrary.getSprite("levels_box");
        q[0] = new CLevelsBox(p, n, s_oStage, O, G);
        q[0].playPulseAnimation();
        q[0].setVisible(!0);
        q[0].show(w, D);
        1 <= B && (q[1] = new CLevelsBox(p, n, s_oStage, O, G), q[1].setVisible(!1))
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? y.call(window.document) : A.call(window.document.documentElement);
        sizeHandler()
    };
    s_oLevelMenu = this;
    this._init()
}
var s_oLevelMenu = null,
    s_aUnlockedLevels = [];

function CLevelsBox(a, c, b, d, e, f) {
    var g, h, k, l, p, n = [],
        u = !1,
        x;
    this._init = function(q, A, y, C) {
        h = q;
        k = A;
        x = void 0 == C ? -1 : C;
        g = new createjs.Container;
        b.addChild(g);
        l = createBitmap(y);
        g.addChild(l);
        g.regX = y.width / 2;
        g.regY = y.height / 2;
        g.x = h;
        g.y = k; - 1 < x && (q = s_oSpriteLibrary.getSprite("but_back"), p = new CGfxButton(q.width / 2, q.height / 2, q, g), p.addEventListener(ON_MOUSE_UP, s_oLevelMenu.onBackBut, s_oLevelMenu));
        this._addButtons();
        this._updateLevelButtons(0)
    };
    this.unload = function() {
        -1 < x && p.unload();
        n.forEach(function(q) {
            q.unload()
        });
        createjs.Tween.get(g).to({
            scale: 0
        }, 150).call(function() {
            b.removeChild(g)
        })
    };
    this._addButtons = function() {
        var q = this.getWidth() / 2 - 300,
            A = 220; - 1 === x && (A = 320);
        for (var y = 0; y < NUM_ROWS_PER_PAGE; y++) {
            for (var C = 0; C < NUM_COLS_PER_PAGE; C++) this._addLevelButton(q, A), q += 200;
            q = this.getWidth() / 2 - 300;
            A += 200
        }
    };
    this._addLevelButton = function(q, A) {
        var y = -1 == x ? 45 : 65,
            C = s_oSpriteLibrary.getSprite(-1 == x ? "but_difficulties" : "but_level");
        y = new CLevelButton(q, A, C, " ", FONT, "#fff", y, g);
        y.addEventListener(ON_MOUSE_UP, this._onLevelBut, this);
        n.push(y)
    };
    this.show = function(q, A, y, C) {
        void 0 === A ? this._updateLevelButtons(q) : this._updateLevelButtons(q, A);
        void 0 != y && (q = this.getWidth(), this.setVisible(!0), g.y = k, g.x = y ? -q : CANVAS_WIDTH + q, C ? createjs.Tween.get(g).to({
            x: CANVAS_WIDTH / 2
        }, 300, createjs.Ease.backOut) : g.x = CANVAS_WIDTH / 2)
    };
    this.hide = function(q, A) {
        var y = this.getWidth();
        y = q ? 0 - y : CANVAS_WIDTH + y;
        var C = this;
        A ? createjs.Tween.get(g).to({
            x: y
        }, 300, createjs.Ease.backOut).call(function() {
            C.setVisible(!1)
        }) : (g.x = y, C.setVisible(!1))
    };
    this._onLevelBut = function(q) {
        s_oLevelMenu.onLevelBoxBut(q)
    };
    this._updateLevelButtons = function(q, A) {
        var y = 12 * q;
        n.forEach(function(C) {
            void 0 === A ? C.changeText(y + 1) : C.changeText(A[y] + "x" + A[y]);
            y < d ? (C.setVisible(!0), y <= parseInt(getSavedLevel(x)) && void 0 == A ? (C.enable(), C.setScore(getLevelScore(x, y))) : (void 0 != A ? C.enable() : C.disable(), C.setScore(""))) : (C.setVisible(!1), C.disable());
            y++
        })
    };
    this.setVisible = function(q) {
        u = q;
        g.visible = u
    };
    this.playPulseAnimation = function() {
        var q = g.scale;
        g.scale = 0;
        setTimeout(function() {
            createjs.Tween.get(g).to({
                scale: 1.1 * q
            }, 150, createjs.Ease.quadOut).to({
                scale: q
            }, 150, createjs.Ease.quadIn)
        }, 150)
    };
    this.setPosition = function(q, A) {
        h = q;
        g.x = h;
        k = A;
        g.y = A
    };
    this.getWidth = function() {
        return 2 * g.regX
    };
    this.getHeight = function() {
        return 2 * g.regY
    };
    this._init(a, c, e, f)
}

function CAlertLocalStorage() {
    var a, c, b, d, e, f;
    this._init = function() {
        f = new createjs.Container;
        s_oStage.addChild(f);
        c = new createjs.Shape;
        a = c.on("click", function() {});
        c.alpha = 0;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.addChild(c);
        b = new createjs.Container;
        b.visible = !1;
        f.addChild(b);
        var g = s_oSpriteLibrary.getSprite("msg_box");
        e = createBitmap(g);
        b.addChild(e);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT / 2;
        b.regX = g.width / 2;
        b.regY = g.height / 2;
        new CTLText(b, g.width / 2 - (g.width / 2 + 200) / 2, g.height / 2 - 280, g.width / 2 + 200, g.height / 2 - 20, 80, "center", "#fff", FONT, 1, 0, 0, TEXT_ERR_LS, !0, !0, !0, !1);
        var h = s_oSpriteLibrary.getSprite("but_yes");
        d = new CGfxButton(g.width / 2, g.height / 2 + 260, h, b);
        d.addEventListener(ON_MOUSE_UP, this.unload, this);
        c.alpha = 0;
        createjs.Tween.get(c).to({
            alpha: .7
        }, 500).call(function() {
            b.alpha = 0;
            b.visible = !0;
            createjs.Tween.get(b).to({
                alpha: 1
            }, 700)
        })
    };
    this.unload = function() {
        createjs.Tween.get(f).to({
            alpha: 0
        }, 500).call(function() {
            s_oStage.removeChild(f);
            d.unload()
        });
        c.off("click", a)
    };
    this._init()
}

function CLevelButton(a, c, b, d, e, f, g, h) {
    var k, l, p, n, u, x, q, A, y, C, t;
    this._init = function(m, v, r, w, D, B, H) {
        k = !1;
        l = 1;
        p = [];
        n = [];
        var I = new createjs.SpriteSheet({
            images: [r],
            frames: {
                width: r.width / 2,
                height: r.height,
                regX: r.width / 4,
                regY: r.height / 2
            },
            animations: {
                state_true: 0,
                state_false: 1
            }
        });
        q = new createjs.Container;
        q.x = m;
        q.y = v;
        h.addChild(q);
        t = createSprite(I, "state_" + k, r.width / 4, r.height / 2, r.width / 2, r.height);
        t.stop();
        s_bMobile || (q.cursor = "pointer");
        q.addChild(t, y);
        h.addChild(q);
        y = new CTLText(q, -r.width / 4 + 15, -r.height / 4 + 15, r.width / 2 - 30, r.height / 2 - 30, H, "center", B, D, 1, 0, 0, w, !0, !0, !1, !1);
        C = new CTLText(q, -r.width / 4 + 80, r.height / 4 - 8, r.width / 2 - 120, 30, 30, "left", B, D, 1, 0, 0, " ", !0, !0, !1, !1);
        A = createBitmap(s_oSpriteLibrary.getSprite("score_icon"));
        A.x = -r.width / 4 + 45;
        A.y = r.height / 4 - 10;
        q.addChild(A);
        this._initListener()
    };
    this.unload = function() {
        q.off("mousedown", u);
        q.off("pressup", x);
        h.removeChild(q)
    };
    this.setVisible = function(m) {
        q.visible = m
    };
    this.setTextX = function(m) {
        y.x = m
    };
    this.setScale = function(m) {
        l = q.scaleX = q.scaleY = m
    };
    this.enable = function() {
        k = !0;
        t.gotoAndStop("state_true")
    };
    this.disable = function() {
        k = !1;
        t.gotoAndStop("state_false")
    };
    this._initListener = function() {
        u = q.on("mousedown", this.buttonDown);
        x = q.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(m, v, r) {
        p[m] = v;
        n[m] = r
    };
    this.addEventListenerWithParams = function(m, v, r, w) {
        p[m] = v;
        n[m] = r
    };
    this.buttonRelease = function() {
        k && (playSound("click", 1, !1), q.scaleX = l, q.scaleY = l, p[ON_MOUSE_UP] && p[ON_MOUSE_UP].call(n[ON_MOUSE_UP], parseInt(("" + y.getMsg()).split("x")[0])))
    };
    this.buttonDown = function() {
        k && (q.scaleX = .9 * l, q.scaleY = .9 * l, p[ON_MOUSE_DOWN] && p[ON_MOUSE_DOWN].call(n[ON_MOUSE_DOWN]))
    };
    this.setPosition = function(m, v) {
        q.x = m;
        q.y = v
    };
    this.tweenPosition = function(m, v, r, w, D, B, H) {
        createjs.Tween.get(q).wait(w).to({
            x: m,
            y: v
        }, r, D).call(function() {
            void 0 !== B && B.call(H)
        })
    };
    this.changeText = function(m) {
        y.refreshText(m)
    };
    this.setX = function(m) {
        q.x = m
    };
    this.setY = function(m) {
        q.y = m
    };
    this.setScore = function(m) {
        0 == m && (m = "");
        C.refreshText(m.toString());
        A.visible = "" != m ? !0 : !1
    };
    this.getButtonImage = function() {
        return q
    };
    this.getX = function() {
        return q.x
    };
    this.getY = function() {
        return q.y
    };
    this.getSprite = function() {
        return t
    };
    this.getScale = function() {
        return q.scaleX
    };
    this.getText = function() {
        return y._szText
    };
    this.isUnlocked = function() {
        return k
    };
    this._init(a, c, b, d, e, f, g)
}

function CButHint(a, c, b, d) {
    var e, f, g, h, k, l, p;
    this._init = function(n, u, x) {
        g = [];
        h = [];
        var q = new createjs.SpriteSheet({
            images: [x],
            frames: {
                width: x.width / 3,
                height: x.height,
                regX: x.width / 3 / 2,
                regY: x.height / 2
            },
            animations: {
                state_0: 0,
                state_1: 1,
                state_2: 2
            }
        });
        f = 0;
        e = !0;
        p = createSprite(q, "state_" + f, x.width / 3 / 2, x.height / 2, x.width / 3, x.height);
        p.x = n;
        p.y = u;
        p.cursor = "pointer";
        d.addChild(p);
        this._initListener()
    };
    this.unload = function() {
        p.off("mousedown", k);
        p.off("pressup", l);
        d.removeChild(p)
    };
    this._initListener = function() {
        k = p.on("mousedown", this.buttonDown);
        l = p.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(n, u, x) {
        g[n] = u;
        h[n] = x
    };
    this.addEventListenerWithParams = function(n, u, x, q) {
        g[n] = u;
        h[n] = x
    };
    this.setState = function(n) {
        f = n;
        e = 2 === f ? !1 : !0;
        p.gotoAndStop("state_" + f)
    };
    this.buttonRelease = function() {
        e && (p.scaleX = 1, p.scaleY = 1, playSound("click", 1, !1), g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(h[ON_MOUSE_UP], f))
    };
    this.buttonDown = function() {
        e && (p.scaleX = .9, p.scaleY = .9, g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(h[ON_MOUSE_DOWN], f))
    };
    this.setPosition = function(n, u) {
        p.x = n;
        p.y = u
    };
    this.setVisible = function(n) {
        p.visible = n
    };
    this.setMask = function(n) {
        p.mask = n
    };
    this.getButtonImage = function() {
        return p
    };
    this._init(a, c, b)
}! function() {
    function a(e) {
        var f = e;
        if (d[f]) f = d[f];
        else {
            for (var g = f, h, k = [], l = 0; g;) {
                if (null !== (h = b.text.exec(g))) k.push(h[0]);
                else if (null !== (h = b.modulo.exec(g))) k.push("%");
                else if (null !== (h = b.placeholder.exec(g))) {
                    if (h[2]) {
                        l |= 1;
                        var p = [],
                            n = h[2],
                            u;
                        if (null !== (u = b.key.exec(n)))
                            for (p.push(u[1]);
                                "" !== (n = n.substring(u[0].length));)
                                if (null !== (u = b.key_access.exec(n))) p.push(u[1]);
                                else if (null !== (u = b.index_access.exec(n))) p.push(u[1]);
                        else throw new SyntaxError("[sprintf] failed to parse named argument key");
                        else throw new SyntaxError("[sprintf] failed to parse named argument key");
                        h[2] = p
                    } else l |= 2;
                    if (3 === l) throw Error("[sprintf] mixing positional and named placeholders is not (yet) supported");
                    k.push({
                        placeholder: h[0],
                        param_no: h[1],
                        keys: h[2],
                        sign: h[3],
                        pad_char: h[4],
                        align: h[5],
                        width: h[6],
                        precision: h[7],
                        type: h[8]
                    })
                } else throw new SyntaxError("[sprintf] unexpected placeholder");
                g = g.substring(h[0].length)
            }
            f = d[f] = k
        }
        g = arguments;
        h = 1;
        k = f.length;
        p = "";
        var x, q;
        for (n = 0; n < k; n++)
            if ("string" === typeof f[n]) p += f[n];
            else if ("object" === typeof f[n]) {
            u = f[n];
            if (u.keys)
                for (l = g[h], x = 0; x < u.keys.length; x++) {
                    if (void 0 == l) throw Error(a('[sprintf] Cannot access property "%s" of undefined value "%s"', u.keys[x], u.keys[x - 1]));
                    l = l[u.keys[x]]
                } else l = u.param_no ? g[u.param_no] : g[h++];
            b.not_type.test(u.type) && b.not_primitive.test(u.type) && l instanceof Function && (l = l());
            if (b.numeric_arg.test(u.type) && "number" !== typeof l && isNaN(l)) throw new TypeError(a("[sprintf] expecting number but found %T", l));
            b.number.test(u.type) && (q = 0 <= l);
            switch (u.type) {
                case "b":
                    l = parseInt(l, 10).toString(2);
                    break;
                case "c":
                    l = String.fromCharCode(parseInt(l, 10));
                    break;
                case "d":
                case "i":
                    l = parseInt(l, 10);
                    break;
                case "j":
                    l = JSON.stringify(l, null, u.width ? parseInt(u.width) : 0);
                    break;
                case "e":
                    l = u.precision ? parseFloat(l).toExponential(u.precision) : parseFloat(l).toExponential();
                    break;
                case "f":
                    l = u.precision ? parseFloat(l).toFixed(u.precision) : parseFloat(l);
                    break;
                case "g":
                    l = u.precision ? String(Number(l.toPrecision(u.precision))) : parseFloat(l);
                    break;
                case "o":
                    l = (parseInt(l, 10) >>> 0).toString(8);
                    break;
                case "s":
                    l = String(l);
                    l = u.precision ? l.substring(0, u.precision) : l;
                    break;
                case "t":
                    l = String(!!l);
                    l = u.precision ? l.substring(0, u.precision) : l;
                    break;
                case "T":
                    l = Object.prototype.toString.call(l).slice(8, -1).toLowerCase();
                    l = u.precision ? l.substring(0, u.precision) : l;
                    break;
                case "u":
                    l = parseInt(l, 10) >>> 0;
                    break;
                case "v":
                    l = l.valueOf();
                    l = u.precision ? l.substring(0, u.precision) : l;
                    break;
                case "x":
                    l = (parseInt(l, 10) >>> 0).toString(16);
                    break;
                case "X":
                    l = (parseInt(l, 10) >>> 0).toString(16).toUpperCase()
            }
            if (b.json.test(u.type)) p += l;
            else {
                if (!b.number.test(u.type) || q && !u.sign) var A = "";
                else A = q ? "+" : "-", l = l.toString().replace(b.sign, "");
                x = u.pad_char ? "0" === u.pad_char ? "0" : u.pad_char.charAt(1) : " ";
                var y = u.width - (A + l).length;
                y = u.width ? 0 < y ? x.repeat(y) : "" : "";
                p += u.align ? A + l + y : "0" === x ? A + y + l : y + A + l
            }
        }
        return p
    }

    function c(e, f) {
        return a.apply(null, [e].concat(f || []))
    }
    var b = {
            not_string: /[^s]/,
            not_bool: /[^t]/,
            not_type: /[^T]/,
            not_primitive: /[^v]/,
            number: /[diefg]/,
            numeric_arg: /[bcdiefguxX]/,
            json: /[j]/,
            not_json: /[^j]/,
            text: /^[^\x25]+/,
            modulo: /^\x25{2}/,
            placeholder: /^\x25(?:([1-9]\d*)\$|\(([^)]+)\))?(\+)?(0|'[^$])?(-)?(\d+)?(?:\.(\d+))?([b-gijostTuvxX])/,
            key: /^([a-z_][a-z_\d]*)/i,
            key_access: /^\.([a-z_][a-z_\d]*)/i,
            index_access: /^\[(\d+)\]/,
            sign: /^[+-]/
        },
        d = Object.create(null);
    "undefined" !== typeof exports && (exports.sprintf = a, exports.vsprintf = c);
    "undefined" !== typeof window && (window.sprintf = a, window.vsprintf = c, "function" === typeof define && define.amd && define(function() {
        return {
            sprintf: a,
            vsprintf: c
        }
    }))
}();

function CButLang(a, c, b, d, e, f) {
    var g = d,
        h, k, l, p, n, u;
    this._init = function(x, q, A, y) {
        h = [];
        k = [];
        u = new createjs.Container;
        u.x = x;
        u.y = q;
        p = u.on("mousedown", this._onPress, this);
        l = u.on("click", this._onChangeLang, this);
        f.addChild(u);
        x = {};
        for (q = 0; q < A; q++) x["lang_" + q] = q;
        x = new createjs.SpriteSheet({
            images: [y],
            frames: {
                width: y.width / A,
                height: y.height
            },
            animations: x
        });
        n = createSprite(x, "lang_" + g, 0, 0, y.width / A, y.height);
        u.addChild(n);
        u.regX = y.width / A / 2;
        u.regY = y.height / 2
    };
    this.unload = function() {
        u.off("mousedown", p);
        u.off("click", l)
    };
    this.addEventListener = function(x, q, A) {
        h[x] = q;
        k[x] = A
    };
    this.setPosition = function(x, q) {
        u.x = x;
        u.y = q
    };
    this._onPress = function() {
        u.scale = .9
    };
    this._onChangeLang = function() {
        u.scale = 1;
        g++;
        g === b && (g = 0);
        n.gotoAndStop("lang_" + g);
        h[ON_SELECT_LANG] && h[ON_SELECT_LANG].call(k[ON_SELECT_LANG], g)
    };
    this.getButtonImage = function() {
        return u
    };
    this._init(a, c, b, e)
};