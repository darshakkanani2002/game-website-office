var __reflect = this && this.__reflect || function(t, e, i) {
        t.__class__ = e, i ? i.push(e) : i = [e], t.__types__ = t.__types__ ? i.concat(t.__types__) : i
    },
    __extends = this && this.__extends || function(t, e) {
        function i() {
            this.constructor = t
        }
        for (var r in e) e.hasOwnProperty(r) && (t[r] = e[r]);
        i.prototype = e.prototype, t.prototype = new i
    };
if ("undefined" == typeof global) var global = window;
if ("undefined" == typeof __global) var __global = global;
var __define = this && this.__define || function(t, e, i, r) {
        Object.defineProperty(t, e, {
            configurable: !0,
            enumerable: !0,
            get: i,
            set: r
        })
    },
    egret;
! function(t) {
    t.$hashCount = 1;
    var e = function() {
        function e() {
            this.$hashCode = t.$hashCount++
        }
        return Object.defineProperty(e.prototype, "hashCode", {
            get: function() {
                return this.$hashCode
            },
            enumerable: !0,
            configurable: !0
        }), e
    }();
    t.HashObject = e, __reflect(e.prototype, "egret.HashObject", ["egret.IHashObject"])
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = [],
        i = function(i) {
            function r(t) {
                void 0 === t && (t = null);
                var e = i.call(this) || this;
                return e.$EventDispatcher = {
                    0: t ? t : e,
                    1: {},
                    2: {},
                    3: 0
                }, e
            }
            return __extends(r, i), r.prototype.$getEventMap = function(t) {
                var e = this.$EventDispatcher,
                    i = t ? e[2] : e[1];
                return i
            }, r.prototype.addEventListener = function(t, e, i, r, n) {
                this.$addListener(t, e, i, r, n)
            }, r.prototype.once = function(t, e, i, r, n) {
                this.$addListener(t, e, i, r, n, !0)
            }, r.prototype.$addListener = function(t, e, i, r, n, a) {
                var o = this.$EventDispatcher,
                    s = r ? o[2] : o[1],
                    h = s[t];
                h ? 0 !== o[3] && (s[t] = h = h.concat()) : h = s[t] = [], this.$insertEventBin(h, t, e, i, r, n, a)
            }, r.prototype.$insertEventBin = function(t, e, i, r, n, a, o) {
                a = 0 | +a;
                for (var s = -1, h = t.length, c = 0; h > c; c++) {
                    var l = t[c];
                    if (l.listener == i && l.thisObject == r && l.target == this) return !1; - 1 == s && l.priority < a && (s = c)
                }
                var u = {
                    type: e,
                    listener: i,
                    thisObject: r,
                    priority: a,
                    target: this,
                    useCapture: n,
                    dispatchOnce: !!o
                };
                return -1 !== s ? t.splice(s, 0, u) : t.push(u), !0
            }, r.prototype.removeEventListener = function(t, e, i, r) {
                var n = this.$EventDispatcher,
                    a = r ? n[2] : n[1],
                    o = a[t];
                o && (0 !== n[3] && (a[t] = o = o.concat()), this.$removeEventBin(o, e, i), 0 == o.length && (a[t] = null))
            }, r.prototype.$removeEventBin = function(t, e, i) {
                for (var r = t.length, n = 0; r > n; n++) {
                    var a = t[n];
                    if (a.listener == e && a.thisObject == i && a.target == this) return t.splice(n, 1), !0
                }
                return !1
            }, r.prototype.hasEventListener = function(t) {
                var e = this.$EventDispatcher;
                return !(!e[1][t] && !e[2][t])
            }, r.prototype.willTrigger = function(t) {
                return this.hasEventListener(t)
            }, r.prototype.dispatchEvent = function(t) {
                return t.$currentTarget = this.$EventDispatcher[0], t.$setTarget(t.$currentTarget), this.$notifyListener(t, !1)
            }, r.prototype.$notifyListener = function(t, i) {
                var r = this.$EventDispatcher,
                    n = i ? r[2] : r[1],
                    a = n[t.$type];
                if (!a) return !0;
                var o = a.length;
                if (0 == o) return !0;
                var s = e;
                r[3]++;
                for (var h = 0; o > h; h++) {
                    var c = a[h];
                    if (c.listener.call(c.thisObject, t), c.dispatchOnce && s.push(c), t.$isPropagationImmediateStopped) break
                }
                for (r[3]--; s.length;) {
                    var c = s.pop();
                    c.target.removeEventListener(c.type, c.listener, c.thisObject, c.useCapture)
                }
                return !t.$isDefaultPrevented
            }, r.prototype.dispatchEventWith = function(e, i, r, n) {
                if (i || this.hasEventListener(e)) {
                    var a = t.Event.create(t.Event, e, i, n);
                    a.data = r;
                    var o = this.dispatchEvent(a);
                    return t.Event.release(a), o
                }
                return !0
            }, r
        }(t.HashObject);
    t.EventDispatcher = i, __reflect(i.prototype, "egret.EventDispatcher", ["egret.IEventDispatcher"])
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.type = null, i.$id = null, i.paddingTop = 0, i.paddingBottom = 0, i.paddingLeft = 0, i.paddingRight = 0, i.$uniforms = {}, t.nativeRender && egret_native.NativeDisplayObject.createFilter(i), i
        }
        return __extends(i, e), i.prototype.$toJson = function() {
            return ""
        }, i.prototype.updatePadding = function() {}, i.prototype.onPropertyChange = function() {
            var e = this;
            e.updatePadding(), t.nativeRender && (egret_native.NativeDisplayObject.setFilterPadding(e.$id, e.paddingTop, e.paddingBottom, e.paddingLeft, e.paddingRight), egret_native.NativeDisplayObject.setDataToFilter(e))
        }, i
    }(t.HashObject);
    t.Filter = e, __reflect(e.prototype, "egret.Filter")
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t) {
        return t %= 360, t > 180 ? t -= 360 : -180 > t && (t += 360), t
    }
    var i = function(i) {
        function r() {
            var e = i.call(this) || this;
            return e.$children = null, e.$name = "", e.$parent = null, e.$stage = null, e.$nestLevel = 0, e.$useTranslate = !1, e.$matrix = new t.Matrix, e.$matrixDirty = !1, e.$x = 0, e.$y = 0, e.$scaleX = 1, e.$scaleY = 1, e.$rotation = 0, e.$skewX = 0, e.$skewXdeg = 0, e.$skewY = 0, e.$skewYdeg = 0, e.$explicitWidth = 0 / 0, e.$explicitHeight = 0 / 0, e.$anchorOffsetX = 0, e.$anchorOffsetY = 0, e.$visible = !0, e.$displayList = null, e.$cacheAsBitmap = !1, e.$cacheDirty = !1, e.$alpha = 1, e.$touchEnabled = r.defaultTouchEnabled, e.$scrollRect = null, e.$blendMode = 0, e.$maskedObject = null, e.$mask = null, e.$maskRect = null, e.$parentDisplayList = null, e.$renderNode = null, e.$renderDirty = !1, e.$renderMode = null, t.nativeRender && e.createNativeDisplayObject(), e
        }
        return __extends(r, i), r.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(0)
        }, Object.defineProperty(r.prototype, "name", {
            get: function() {
                return this.$name
            },
            set: function(t) {
                this.$name = t
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "parent", {
            get: function() {
                return this.$parent
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setParent = function(t) {
            this.$parent = t
        }, r.prototype.$onAddToStage = function(e, i) {
            var r = this;
            r.$stage = e, r.$nestLevel = i, r.$hasAddToStage = !0, t.Sprite.$EVENT_ADD_TO_STAGE_LIST.push(r)
        }, r.prototype.$onRemoveFromStage = function() {
            var e = this;
            e.$nestLevel = 0, t.Sprite.$EVENT_REMOVE_FROM_STAGE_LIST.push(e)
        }, r.prototype.$updateUseTransform = function() {
            var t = this;
            1 == t.$scaleX && 1 == t.$scaleY && 0 == t.$skewX && 0 == t.$skewY ? t.$useTranslate = !1 : t.$useTranslate = !0
        }, Object.defineProperty(r.prototype, "stage", {
            get: function() {
                return this.$stage
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "matrix", {
            get: function() {
                return this.$getMatrix().clone()
            },
            set: function(t) {
                this.$setMatrix(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getMatrix = function() {
            var t = this;
            return t.$matrixDirty && (t.$matrixDirty = !1, t.$matrix.$updateScaleAndRotation(t.$scaleX, t.$scaleY, t.$skewX, t.$skewY)), t.$matrix.tx = t.$x, t.$matrix.ty = t.$y, t.$matrix
        }, r.prototype.$setMatrix = function(i, r) {
            void 0 === r && (r = !0);
            var n = this,
                a = n.$matrix;
            a.a = i.a, a.b = i.b, a.c = i.c, a.d = i.d, n.$x = i.tx, n.$y = i.ty, n.$matrixDirty = !1, 1 == a.a && 0 == a.b && 0 == a.c && 1 == a.d ? n.$useTranslate = !1 : n.$useTranslate = !0, r && (n.$scaleX = a.$getScaleX(), n.$scaleY = a.$getScaleY(), n.$skewX = i.$getSkewX(), n.$skewY = i.$getSkewY(), n.$skewXdeg = e(180 * n.$skewX / Math.PI), n.$skewYdeg = e(180 * n.$skewY / Math.PI), n.$rotation = e(180 * n.$skewY / Math.PI)), t.nativeRender && n.$nativeDisplayObject.setMatrix(i.a, i.b, i.c, i.d, i.tx, i.ty)
        }, r.prototype.$getConcatenatedMatrix = function() {
            var e = this,
                i = e.$concatenatedMatrix;
            i || (i = e.$concatenatedMatrix = new t.Matrix), e.$parent ? e.$parent.$getConcatenatedMatrix().$preMultiplyInto(e.$getMatrix(), i) : i.copyFrom(e.$getMatrix());
            var r = e.$anchorOffsetX,
                n = e.$anchorOffsetY,
                a = e.$scrollRect;
            return a ? i.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -a.x - r, -a.y - n), i) : (0 != r || 0 != n) && i.$preMultiplyInto(t.$TempMatrix.setTo(1, 0, 0, 1, -r, -n), i), e.$concatenatedMatrix
        }, r.prototype.$getInvertedConcatenatedMatrix = function() {
            var e = this;
            return e.$invertedConcatenatedMatrix || (e.$invertedConcatenatedMatrix = new t.Matrix), e.$getConcatenatedMatrix().$invertInto(e.$invertedConcatenatedMatrix), e.$invertedConcatenatedMatrix
        }, Object.defineProperty(r.prototype, "x", {
            get: function() {
                return this.$getX()
            },
            set: function(t) {
                this.$setX(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getX = function() {
            return this.$x
        }, r.prototype.$setX = function(e) {
            var i = this;
            if (i.$x == e) return !1;
            if (i.$x = e, t.nativeRender) i.$nativeDisplayObject.setX(e);
            else {
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
            return !0
        }, Object.defineProperty(r.prototype, "y", {
            get: function() {
                return this.$getY()
            },
            set: function(t) {
                this.$setY(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getY = function() {
            return this.$y
        }, r.prototype.$setY = function(e) {
            var i = this;
            if (i.$y == e) return !1;
            if (i.$y = e, t.nativeRender) i.$nativeDisplayObject.setY(e);
            else {
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
            return !0
        }, Object.defineProperty(r.prototype, "scaleX", {
            get: function() {
                return this.$getScaleX()
            },
            set: function(t) {
                this.$setScaleX(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getScaleX = function() {
            return this.$scaleX
        }, r.prototype.$setScaleX = function(e) {
            var i = this;
            if (i.$scaleX != e)
                if (i.$scaleX = e, i.$matrixDirty = !0, i.$updateUseTransform(), t.nativeRender) i.$nativeDisplayObject.setScaleX(e);
                else {
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "scaleY", {
            get: function() {
                return this.$getScaleY()
            },
            set: function(t) {
                this.$setScaleY(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getScaleY = function() {
            return this.$scaleY
        }, r.prototype.$setScaleY = function(e) {
            var i = this;
            if (i.$scaleY != e)
                if (i.$scaleY = e, i.$matrixDirty = !0, i.$updateUseTransform(), t.nativeRender) i.$nativeDisplayObject.setScaleY(e);
                else {
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "rotation", {
            get: function() {
                return this.$getRotation()
            },
            set: function(t) {
                this.$setRotation(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getRotation = function() {
            return this.$rotation
        }, r.prototype.$setRotation = function(i) {
            i = e(i);
            var r = this;
            if (i != r.$rotation) {
                var n = i - r.$rotation,
                    a = n / 180 * Math.PI;
                if (r.$skewX += a, r.$skewY += a, r.$rotation = i, r.$matrixDirty = !0, r.$updateUseTransform(), t.nativeRender) r.$nativeDisplayObject.setRotation(i);
                else {
                    var o = r.$parent;
                    o && !o.$cacheDirty && (o.$cacheDirty = !0, o.$cacheDirtyUp());
                    var s = r.$maskedObject;
                    s && !s.$cacheDirty && (s.$cacheDirty = !0, s.$cacheDirtyUp())
                }
            }
        }, Object.defineProperty(r.prototype, "skewX", {
            get: function() {
                return this.$skewXdeg
            },
            set: function(t) {
                this.$setSkewX(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setSkewX = function(i) {
            var r = this;
            if (i != r.$skewXdeg)
                if (r.$skewXdeg = i, i = e(i), i = i / 180 * Math.PI, r.$skewX = i, r.$matrixDirty = !0, r.$updateUseTransform(), t.nativeRender) r.$nativeDisplayObject.setSkewX(r.$skewXdeg);
                else {
                    var n = r.$parent;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp());
                    var a = r.$maskedObject;
                    a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "skewY", {
            get: function() {
                return this.$skewYdeg
            },
            set: function(t) {
                this.$setSkewY(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setSkewY = function(i) {
            var r = this;
            if (i != r.$skewYdeg)
                if (r.$skewYdeg = i, i = e(i), i = i / 180 * Math.PI, r.$skewY = i, r.$matrixDirty = !0, r.$updateUseTransform(), t.nativeRender) r.$nativeDisplayObject.setSkewY(r.$skewYdeg);
                else {
                    var n = r.$parent;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp());
                    var a = r.$maskedObject;
                    a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "width", {
            get: function() {
                return this.$getWidth()
            },
            set: function(t) {
                this.$setWidth(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getWidth = function() {
            var t = this;
            return isNaN(t.$explicitWidth) ? t.$getOriginalBounds().width : t.$explicitWidth
        }, r.prototype.$setWidth = function(t) {
            t = isNaN(t) ? 0 / 0 : t, this.$explicitWidth != t && (this.$explicitWidth = t)
        }, Object.defineProperty(r.prototype, "height", {
            get: function() {
                return this.$getHeight()
            },
            set: function(t) {
                this.$setHeight(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getHeight = function() {
            var t = this;
            return isNaN(t.$explicitHeight) ? t.$getOriginalBounds().height : t.$explicitHeight
        }, r.prototype.$setHeight = function(t) {
            t = isNaN(t) ? 0 / 0 : t, this.$explicitHeight != t && (this.$explicitHeight = t)
        }, Object.defineProperty(r.prototype, "measuredWidth", {
            get: function() {
                return this.$getOriginalBounds().width
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "measuredHeight", {
            get: function() {
                return this.$getOriginalBounds().height
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "anchorOffsetX", {
            get: function() {
                return this.$anchorOffsetX
            },
            set: function(t) {
                this.$setAnchorOffsetX(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setAnchorOffsetX = function(e) {
            var i = this;
            if (i.$anchorOffsetX != e)
                if (i.$anchorOffsetX = e, t.nativeRender) i.$nativeDisplayObject.setAnchorOffsetX(e);
                else {
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "anchorOffsetY", {
            get: function() {
                return this.$anchorOffsetY
            },
            set: function(t) {
                this.$setAnchorOffsetY(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setAnchorOffsetY = function(e) {
            var i = this;
            if (i.$anchorOffsetY != e)
                if (i.$anchorOffsetY = e, t.nativeRender) i.$nativeDisplayObject.setAnchorOffsetY(e);
                else {
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "visible", {
            get: function() {
                return this.$visible
            },
            set: function(t) {
                this.$setVisible(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setVisible = function(e) {
            var i = this;
            if (i.$visible != e)
                if (i.$visible = e, t.nativeRender) i.$nativeDisplayObject.setVisible(e);
                else {
                    i.$updateRenderMode();
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "cacheAsBitmap", {
            get: function() {
                return this.$cacheAsBitmap
            },
            set: function(e) {
                var i = this;
                i.$cacheAsBitmap = e, t.nativeRender ? i.$nativeDisplayObject.setCacheAsBitmap(e) : i.$setHasDisplayList(e)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setHasDisplayList = function(e) {
            var i = this,
                r = !!i.$displayList;
            if (r != e)
                if (e) {
                    var n = t.sys.DisplayList.create(i);
                    n && (i.$displayList = n, i.$cacheDirty = !0)
                } else i.$displayList = null
        }, r.prototype.$cacheDirtyUp = function() {
            var t = this.$parent;
            t && !t.$cacheDirty && (t.$cacheDirty = !0, t.$cacheDirtyUp())
        }, Object.defineProperty(r.prototype, "alpha", {
            get: function() {
                return this.$alpha
            },
            set: function(t) {
                this.$setAlpha(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setAlpha = function(e) {
            var i = this;
            if (i.$alpha != e)
                if (i.$alpha = e, t.nativeRender) i.$nativeDisplayObject.setAlpha(e);
                else {
                    i.$updateRenderMode();
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
        }, Object.defineProperty(r.prototype, "touchEnabled", {
            get: function() {
                return this.$getTouchEnabled()
            },
            set: function(t) {
                this.$setTouchEnabled(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$getTouchEnabled = function() {
            return this.$touchEnabled
        }, r.prototype.$setTouchEnabled = function(t) {
            this.$touchEnabled = !!t
        }, Object.defineProperty(r.prototype, "scrollRect", {
            get: function() {
                return this.$scrollRect
            },
            set: function(t) {
                this.$setScrollRect(t)
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setScrollRect = function(e) {
            var i = this;
            if (!e && !i.$scrollRect) return void i.$updateRenderMode();
            if (e ? (i.$scrollRect || (i.$scrollRect = new t.Rectangle), i.$scrollRect.copyFrom(e), t.nativeRender && i.$nativeDisplayObject.setScrollRect(e.x, e.y, e.width, e.height)) : (i.$scrollRect = null, t.nativeRender && i.$nativeDisplayObject.setScrollRect(0, 0, 0, 0)), !t.nativeRender) {
                i.$updateRenderMode();
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
        }, Object.defineProperty(r.prototype, "blendMode", {
            get: function() {
                return t.sys.numberToBlendMode(this.$blendMode)
            },
            set: function(e) {
                var i = this,
                    r = t.sys.blendModeToNumber(e);
                if (i.$blendMode != r)
                    if (i.$blendMode = r, t.nativeRender) i.$nativeDisplayObject.setBlendMode(r);
                    else {
                        i.$updateRenderMode();
                        var n = i.$parent;
                        n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp());
                        var a = i.$maskedObject;
                        a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp())
                    }
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(r.prototype, "mask", {
            get: function() {
                var t = this;
                return t.$mask ? t.$mask : t.$maskRect
            },
            set: function(e) {
                var i = this;
                if (e !== i) {
                    if (e)
                        if (e instanceof r) {
                            if (e == i.$mask) return;
                            e.$maskedObject && (e.$maskedObject.mask = null), e.$maskedObject = i, i.$mask = e, t.nativeRender || e.$updateRenderMode(), i.$maskRect && (t.nativeRender && i.$nativeDisplayObject.setMaskRect(0, 0, 0, 0), i.$maskRect = null), t.nativeRender && i.$nativeDisplayObject.setMask(e.$nativeDisplayObject.id)
                        } else i.$maskRect || (i.$maskRect = new t.Rectangle), i.$maskRect.copyFrom(e), t.nativeRender && i.$nativeDisplayObject.setMaskRect(e.x, e.y, e.width, e.height), i.$mask && (i.$mask.$maskedObject = null, t.nativeRender || i.$mask.$updateRenderMode()), i.mask && (t.nativeRender && i.$nativeDisplayObject.setMask(-1), i.$mask = null);
                    else i.$mask && (i.$mask.$maskedObject = null, t.nativeRender || i.$mask.$updateRenderMode()), i.mask && (t.nativeRender && i.$nativeDisplayObject.setMask(-1), i.$mask = null), i.$maskRect && (t.nativeRender && i.$nativeDisplayObject.setMaskRect(0, 0, 0, 0), i.$maskRect = null);
                    t.nativeRender || i.$updateRenderMode()
                }
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.$setMaskRect = function(e) {
            var i = this;
            (e || i.$maskRect) && (e ? (i.$maskRect || (i.$maskRect = new t.Rectangle), i.$maskRect.copyFrom(e)) : i.$maskRect = null)
        }, Object.defineProperty(r.prototype, "filters", {
            get: function() {
                return this.$filters
            },
            set: function(e) {
                var i = this,
                    r = i.$filters;
                if (r || e) {
                    if (e && e.length ? (e = e.concat(), i.$filters = e, t.nativeRender && i.$nativeDisplayObject.setFilters(e)) : (i.$filters = e, t.nativeRender && i.$nativeDisplayObject.setFilters(null)), !t.nativeRender) {
                        i.$updateRenderMode();
                        var n = i.$parent;
                        n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp());
                        var a = i.$maskedObject;
                        a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp())
                    }
                } else if (i.$filters = e, t.nativeRender) i.$nativeDisplayObject.setFilters(null);
                else {
                    i.$updateRenderMode();
                    var n = i.$parent;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp());
                    var a = i.$maskedObject;
                    a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp())
                }
            },
            enumerable: !0,
            configurable: !0
        }), r.prototype.getTransformedBounds = function(t, e) {
            return t = t || this, this.$getTransformedBounds(t, e)
        }, r.prototype.getBounds = function(t, e) {
            void 0 === e && (e = !0);
            var i = this;
            return t = i.$getTransformedBounds(i, t), e && (0 != i.$anchorOffsetX && (t.x -= i.$anchorOffsetX), 0 != i.$anchorOffsetY && (t.y -= i.$anchorOffsetY)), t
        }, r.prototype.$getTransformedBounds = function(e, i) {
            var r = this,
                n = r.$getOriginalBounds();
            if (i || (i = new t.Rectangle), i.copyFrom(n), e == r) return i;
            var a;
            if (e) {
                a = t.$TempMatrix;
                var o = e.$getInvertedConcatenatedMatrix();
                o.$preMultiplyInto(r.$getConcatenatedMatrix(), a)
            } else a = r.$getConcatenatedMatrix();
            return a.$transformBounds(i), i
        }, r.prototype.globalToLocal = function(e, i, r) {
            if (void 0 === e && (e = 0), void 0 === i && (i = 0), t.nativeRender) {
                egret_native.updateNativeRender();
                var n = egret_native.nrGlobalToLocal(this.$nativeDisplayObject.id, e, i),
                    a = n.split(","),
                    o = parseFloat(a[0]),
                    s = parseFloat(a[1]);
                return r ? r.setTo(o, s) : r = new t.Point(o, s), r
            }
            var h = this.$getInvertedConcatenatedMatrix();
            return h.transformPoint(e, i, r)
        }, r.prototype.localToGlobal = function(e, i, r) {
            if (void 0 === e && (e = 0), void 0 === i && (i = 0), t.nativeRender) {
                egret_native.updateNativeRender();
                var n = egret_native.nrLocalToGlobal(this.$nativeDisplayObject.id, e, i),
                    a = n.split(","),
                    o = parseFloat(a[0]),
                    s = parseFloat(a[1]);
                return r ? r.setTo(o, s) : r = new t.Point(o, s), r
            }
            var h = this.$getConcatenatedMatrix();
            return h.transformPoint(e, i, r)
        }, r.prototype.$getOriginalBounds = function() {
            var t = this,
                e = t.$getContentBounds();
            t.$measureChildBounds(e);
            var i = t.$measureFiltersOffset(!1);
            return i && (e.x += i.minX, e.y += i.minY, e.width += -i.minX + i.maxX, e.height += -i.minY + i.maxY), e
        }, r.prototype.$measureChildBounds = function(t) {}, r.prototype.$getContentBounds = function() {
            var e = t.$TempRectangle;
            return e.setEmpty(), this.$measureContentBounds(e), e
        }, r.prototype.$measureContentBounds = function(t) {}, r.prototype.$getRenderNode = function() {
            var t = this,
                e = t.$renderNode;
            return e ? (t.$renderDirty && (e.cleanBeforeRender(), t.$updateRenderNode(), t.$renderDirty = !1, e = t.$renderNode), e) : null
        }, r.prototype.$updateRenderMode = function() {
            var t = this;
            !t.$visible || t.$alpha <= 0 || t.$maskedObject ? t.$renderMode = 1 : t.filters && t.filters.length > 0 ? t.$renderMode = 2 : 0 !== t.$blendMode || t.$mask && t.$mask.$stage ? t.$renderMode = 3 : t.$scrollRect || t.$maskRect ? t.$renderMode = 4 : t.$renderMode = null
        }, r.prototype.$measureFiltersOffset = function(e) {
            for (var i = this, r = 0, n = 0, a = 0, o = 0; i;) {
                var s = i.$filters;
                if (s && s.length)
                    for (var h = s.length, c = 0; h > c; c++) {
                        var l = s[c];
                        if ("blur" == l.type) {
                            var u = l.blurX,
                                p = l.blurY;
                            r -= u, n -= p, a += u, o += p
                        } else if ("glow" == l.type) {
                            var u = l.blurX,
                                p = l.blurY;
                            r -= u, n -= p, a += u, o += p;
                            var d = l.distance || 0,
                                f = l.angle || 0,
                                g = 0,
                                $ = 0;
                            0 != d && (g = d * t.NumberUtils.cos(f), g = g > 0 ? Math.ceil(g) : Math.floor(g), $ = d * t.NumberUtils.sin(f), $ = $ > 0 ? Math.ceil($) : Math.floor($), r += g, a += g, n += $, o += $)
                        } else if ("custom" == l.type) {
                            var y = l.padding;
                            r -= y, n -= y, a += y, o += y
                        }
                    }
                i = e ? i.$parent : null
            }
            return r = Math.min(r, 0), n = Math.min(n, 0), a = Math.max(a, 0), o = Math.max(o, 0), {
                minX: r,
                minY: n,
                maxX: a,
                maxY: o
            }
        }, r.prototype.$getConcatenatedMatrixAt = function(e, i) {
            var r = e.$getInvertedConcatenatedMatrix();
            if (0 === r.a || 0 === r.d) {
                var n = this,
                    a = e.$nestLevel;
                for (i.identity(); n.$nestLevel > a;) {
                    var o = n.$scrollRect;
                    o && i.concat(t.$TempMatrix.setTo(1, 0, 0, 1, -o.x, -o.y)), i.concat(n.$getMatrix()), n = n.$parent
                }
            } else r.$preMultiplyInto(i, i)
        }, r.prototype.$updateRenderNode = function() {}, r.prototype.$hitTest = function(e, i) {
            var r = this;
            if (!t.nativeRender && !r.$renderNode || !r.$visible || 0 == r.$scaleX || 0 == r.$scaleY) return null;
            var n = r.$getInvertedConcatenatedMatrix();
            if (0 == n.a && 0 == n.b && 0 == n.c && 0 == n.d) return null;
            var a = r.$getContentBounds(),
                o = n.a * e + n.c * i + n.tx,
                s = n.b * e + n.d * i + n.ty;
            if (a.contains(o, s)) {
                if (!r.$children) {
                    var h = r.$scrollRect ? r.$scrollRect : r.$maskRect;
                    if (h && !h.contains(o, s)) return null;
                    if (r.$mask && !r.$mask.$hitTest(e, i)) return null
                }
                return r
            }
            return null
        }, r.prototype.hitTestPoint = function(e, i, r) {
            var n = this;
            if (r) {
                var a = n.$getInvertedConcatenatedMatrix(),
                    o = a.a * e + a.c * i + a.tx,
                    s = a.b * e + a.d * i + a.ty,
                    h = void 0;
                if (t.nativeRender) {
                    var c = t.sys.customHitTestBuffer;
                    c.resize(3, 3), egret_native.forHitTest = !0, egret_native.activateBuffer(c), egret_native.updateNativeRender(), egret_native.nrRenderDisplayObject2(n.$nativeDisplayObject.id, 1 - o, 1 - s, !0);
                    try {
                        h = new Uint8Array(4), egret_native.nrGetPixels(1, 1, 1, 1, h)
                    } catch (l) {
                        throw new Error(t.sys.tr(1039))
                    }
                    return egret_native.activateBuffer(null), egret_native.forHitTest = !1, 0 === h[3] ? !1 : !0
                }
                var u = n.$displayList;
                if (u) {
                    var c = u.renderBuffer;
                    try {
                        h = c.getPixels(o - u.offsetX, s - u.offsetY)
                    } catch (l) {
                        throw new Error(t.sys.tr(1039))
                    }
                } else {
                    var c = t.sys.customHitTestBuffer;
                    c.resize(3, 3);
                    var p = t.Matrix.create();
                    p.identity(), p.translate(1 - o, 1 - s), t.sys.systemRenderer.render(this, c, p, !0), t.Matrix.release(p);
                    try {
                        h = c.getPixels(1, 1)
                    } catch (l) {
                        throw new Error(t.sys.tr(1039))
                    }
                }
                return 0 === h[3] ? !1 : !0
            }
            if (0 == n.$scaleX || 0 == n.$scaleY) return !1;
            var a = n.$getInvertedConcatenatedMatrix(),
                d = n.getBounds(null, !1),
                o = a.a * e + a.c * i + a.tx,
                s = a.b * e + a.d * i + a.ty;
            if (d.contains(o, s)) {
                var f = n.$scrollRect ? n.$scrollRect : n.$maskRect;
                return f && !f.contains(o, s) ? !1 : !0
            }
            return !1
        }, r.prototype.$addListener = function(e, n, a, o, s, h) {
            i.prototype.$addListener.call(this, e, n, a, o, s, h);
            var c = e == t.Event.ENTER_FRAME;
            if (c || e == t.Event.RENDER) {
                var l = c ? r.$enterFrameCallBackList : r.$renderCallBackList; - 1 == l.indexOf(this) && l.push(this)
            }
        }, r.prototype.removeEventListener = function(e, n, a, o) {
            i.prototype.removeEventListener.call(this, e, n, a, o);
            var s = e == t.Event.ENTER_FRAME;
            if ((s || e == t.Event.RENDER) && !this.hasEventListener(e)) {
                var h = s ? r.$enterFrameCallBackList : r.$renderCallBackList,
                    c = h.indexOf(this); - 1 !== c && h.splice(c, 1)
            }
        }, r.prototype.dispatchEvent = function(t) {
            if (!t.$bubbles) return i.prototype.dispatchEvent.call(this, t);
            var e = this.$getPropagationList(this),
                r = .5 * e.length;
            return t.$setTarget(this), this.$dispatchPropagationEvent(t, e, r), !t.$isDefaultPrevented
        }, r.prototype.$getPropagationList = function(t) {
            for (var e = []; t;) e.push(t), t = t.$parent;
            var i = e.concat();
            return i.reverse(), e = i.concat(e)
        }, r.prototype.$dispatchPropagationEvent = function(t, e, i) {
            for (var r = e.length, n = i - 1, a = 0; r > a; a++) {
                var o = e[a];
                if (t.$currentTarget = o, n > a ? t.$eventPhase = 1 : a == i || a == n ? t.$eventPhase = 2 : t.$eventPhase = 3, o.$notifyListener(t, i > a), t.$isPropagationStopped || t.$isPropagationImmediateStopped) return
            }
        }, r.prototype.willTrigger = function(t) {
            for (var e = this; e;) {
                if (e.hasEventListener(t)) return !0;
                e = e.$parent
            }
            return !1
        }, r.defaultTouchEnabled = !1, r.$enterFrameCallBackList = [], r.$renderCallBackList = [], r
    }(t.EventDispatcher);
    t.DisplayObject = i, __reflect(i.prototype, "egret.DisplayObject")
}(egret || (egret = {}));
var egret;
! function(t) {
    t.$TextureScaleFactor = 1;
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.disposeBitmapData = !0, t.$bitmapX = 0, t.$bitmapY = 0, t.$bitmapWidth = 0, t.$bitmapHeight = 0, t.$offsetX = 0, t.$offsetY = 0, t.$textureWidth = 0, t.$textureHeight = 0, t.$sourceWidth = 0, t.$sourceHeight = 0, t.$bitmapData = null, t.$rotated = !1, t
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "textureWidth", {
            get: function() {
                return this.$getTextureWidth()
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$getTextureWidth = function() {
            return this.$textureWidth
        }, Object.defineProperty(i.prototype, "textureHeight", {
            get: function() {
                return this.$getTextureHeight()
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$getTextureHeight = function() {
            return this.$textureHeight
        }, i.prototype.$getScaleBitmapWidth = function() {
            return this.$bitmapWidth * t.$TextureScaleFactor
        }, i.prototype.$getScaleBitmapHeight = function() {
            return this.$bitmapHeight * t.$TextureScaleFactor
        }, Object.defineProperty(i.prototype, "bitmapData", {
            get: function() {
                return this.$bitmapData
            },
            set: function(t) {
                this._setBitmapData(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype._setBitmapData = function(e) {
            this.$bitmapData = e;
            var i = t.$TextureScaleFactor,
                r = e.width * i,
                n = e.height * i;
            this.$initData(0, 0, r, n, 0, 0, r, n, e.width, e.height)
        }, i.prototype.$initData = function(e, i, r, n, a, o, s, h, c, l, u) {
            void 0 === u && (u = !1);
            var p = t.$TextureScaleFactor;
            this.$bitmapX = e / p, this.$bitmapY = i / p, this.$bitmapWidth = r / p, this.$bitmapHeight = n / p, this.$offsetX = a, this.$offsetY = o, this.$textureWidth = s, this.$textureHeight = h, this.$sourceWidth = c, this.$sourceHeight = l, this.$rotated = u, t.BitmapData.$invalidate(this.$bitmapData)
        }, i.prototype.getPixel32 = function(t, e) {
            throw new Error
        }, i.prototype.getPixels = function(t, e, i, r) {
            throw void 0 === i && (i = 1), void 0 === r && (r = 1), new Error
        }, i.prototype.toDataURL = function(t, e, i) {
            throw new Error
        }, i.prototype.saveToFile = function(t, e, i) {
            throw new Error
        }, i.prototype.dispose = function() {
            this.$bitmapData && (this.disposeBitmapData && this.$bitmapData.$dispose(), this.$bitmapData = null)
        }, i
    }(t.HashObject);
    t.Texture = e, __reflect(e.prototype, "egret.Texture")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e(e, i, r, n) {
            var a = t.call(this) || this;
            return a.$eventPhase = 2, a.$currentTarget = null, a.$target = null, a.$isDefaultPrevented = !1, a.$isPropagationStopped = !1, a.$isPropagationImmediateStopped = !1, a.$type = e, a.$bubbles = !!i, a.$cancelable = !!r, a.data = n, a
        }
        return __extends(e, t), Object.defineProperty(e.prototype, "type", {
            get: function() {
                return this.$type
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "bubbles", {
            get: function() {
                return this.$bubbles
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "cancelable", {
            get: function() {
                return this.$cancelable
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "eventPhase", {
            get: function() {
                return this.$eventPhase
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "currentTarget", {
            get: function() {
                return this.$currentTarget
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "target", {
            get: function() {
                return this.$target
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.$setTarget = function(t) {
            return this.$target = t, !0
        }, e.prototype.isDefaultPrevented = function() {
            return this.$isDefaultPrevented
        }, e.prototype.preventDefault = function() {
            this.$cancelable && (this.$isDefaultPrevented = !0)
        }, e.prototype.stopPropagation = function() {
            this.$bubbles && (this.$isPropagationStopped = !0)
        }, e.prototype.stopImmediatePropagation = function() {
            this.$bubbles && (this.$isPropagationImmediateStopped = !0)
        }, e.prototype.clean = function() {
            this.data = this.$currentTarget = null, this.$setTarget(null)
        }, e.dispatchEvent = function(t, i, r, n) {
            void 0 === r && (r = !1);
            var a = e.create(e, i, r),
                o = e._getPropertyData(e);
            void 0 != n && (o.data = n);
            var s = t.dispatchEvent(a);
            return e.release(a), s
        }, e._getPropertyData = function(t) {
            var e = t._props;
            return e || (e = t._props = {}), e
        }, e.create = function(t, e, i, r) {
            var n, a = t.hasOwnProperty("eventPool");
            if (a && (n = t.eventPool), n || (n = t.eventPool = []), n.length) {
                var o = n.pop();
                return o.$type = e, o.$bubbles = !!i, o.$cancelable = !!r, o.$isDefaultPrevented = !1, o.$isPropagationStopped = !1, o.$isPropagationImmediateStopped = !1, o.$eventPhase = 2, o
            }
            return new t(e, i, r)
        }, e.release = function(t) {
            t.clean();
            var e = Object.getPrototypeOf(t).constructor;
            e.eventPool.push(t)
        }, e.ADDED_TO_STAGE = "addedToStage", e.REMOVED_FROM_STAGE = "removedFromStage", e.ADDED = "added", e.REMOVED = "removed", e.ENTER_FRAME = "enterFrame", e.RENDER = "render", e.RESIZE = "resize", e.CHANGE = "change", e.CHANGING = "changing", e.COMPLETE = "complete", e.LOOP_COMPLETE = "loopComplete", e.FOCUS_IN = "focusIn", e.FOCUS_OUT = "focusOut", e.ENDED = "ended", e.ACTIVATE = "activate", e.DEACTIVATE = "deactivate", e.CLOSE = "close", e.CONNECT = "connect", e.LEAVE_STAGE = "leaveStage", e.SOUND_COMPLETE = "soundComplete", e
    }(t.HashObject);
    t.Event = e, __reflect(e.prototype, "egret.Event")
}(egret || (egret = {}));
var egret;
! function(t) {
    function e() {
        return ""
    }

    function i(t) {
        throw new Error("#" + t)
    }

    function r() {}

    function n() {}
    t.getString = e, t.$error = i, t.$warn = r, t.$markCannotUse = n
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = [],
        i = Math.PI / 180,
        r = function(r) {
            function n(t, e) {
                void 0 === t && (t = 0), void 0 === e && (e = 0);
                var i = r.call(this) || this;
                return i.x = t, i.y = e, i
            }
            return __extends(n, r), n.release = function(t) {
                t && e.push(t)
            }, n.create = function(t, i) {
                var r = e.pop();
                return r || (r = new n), r.setTo(t, i)
            }, Object.defineProperty(n.prototype, "length", {
                get: function() {
                    return Math.sqrt(this.x * this.x + this.y * this.y)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.setTo = function(t, e) {
                return this.x = t, this.y = e, this
            }, n.prototype.clone = function() {
                return new n(this.x, this.y)
            }, n.prototype.equals = function(t) {
                return this.x == t.x && this.y == t.y
            }, n.distance = function(t, e) {
                return Math.sqrt((t.x - e.x) * (t.x - e.x) + (t.y - e.y) * (t.y - e.y))
            }, n.prototype.copyFrom = function(t) {
                this.x = t.x, this.y = t.y
            }, n.prototype.add = function(t) {
                return new n(this.x + t.x, this.y + t.y)
            }, n.interpolate = function(t, e, i) {
                var r = 1 - i;
                return new n(t.x * i + e.x * r, t.y * i + e.y * r)
            }, n.prototype.normalize = function(t) {
                if (0 != this.x || 0 != this.y) {
                    var e = t / this.length;
                    this.x *= e, this.y *= e
                }
            }, n.prototype.offset = function(t, e) {
                this.x += t, this.y += e
            }, n.polar = function(e, r) {
                return new n(e * t.NumberUtils.cos(r / i), e * t.NumberUtils.sin(r / i))
            }, n.prototype.subtract = function(t) {
                return new n(this.x - t.x, this.y - t.y)
            }, n.prototype.toString = function() {
                return "(x=" + this.x + ", y=" + this.y + ")"
            }, n
        }(t.HashObject);
    t.Point = r, __reflect(r.prototype, "egret.Point"), t.$TempPoint = new r
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.$touchChildren = !0, t.$children = [], t
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "numChildren", {
            get: function() {
                return this.$children.length
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.addChild = function(t) {
            var e = this.$children.length;
            return t.$parent == this && e--, this.$doAddChild(t, e)
        }, i.prototype.addChildAt = function(t, e) {
            return e = 0 | +e, (0 > e || e >= this.$children.length) && (e = this.$children.length, t.$parent == this && e--), this.$doAddChild(t, e)
        }, i.prototype.$doAddChild = function(e, r, n) {
            void 0 === n && (n = !0);
            var a = this,
                o = e.$parent;
            if (o == a) return a.doSetChildIndex(e, r), e;
            o && o.removeChild(e), a.$children.splice(r, 0, e), e.$setParent(a), t.nativeRender && a.$nativeDisplayObject.addChildAt(e.$nativeDisplayObject.id, r);
            var s = a.$stage;
            if (s && e.$onAddToStage(s, a.$nestLevel + 1), n && e.dispatchEventWith(t.Event.ADDED, !0), s)
                for (var h = i.$EVENT_ADD_TO_STAGE_LIST; h.length;) {
                    var c = h.shift();
                    c.$stage && n && c.dispatchEventWith(t.Event.ADDED_TO_STAGE)
                }
            if (!t.nativeRender && (e.$maskedObject && e.$maskedObject.$updateRenderMode(), !a.$cacheDirty)) {
                a.$cacheDirty = !0;
                var l = a.$parent;
                l && !l.$cacheDirty && (l.$cacheDirty = !0, l.$cacheDirtyUp());
                var u = a.$maskedObject;
                u && !u.$cacheDirty && (u.$cacheDirty = !0, u.$cacheDirtyUp())
            }
            return this.$childAdded(e, r), e
        }, i.prototype.contains = function(t) {
            for (; t;) {
                if (t == this) return !0;
                t = t.$parent
            }
            return !1
        }, i.prototype.getChildAt = function(t) {
            return t = 0 | +t, t >= 0 && t < this.$children.length ? this.$children[t] : null
        }, i.prototype.getChildIndex = function(t) {
            return this.$children.indexOf(t)
        }, i.prototype.getChildByName = function(t) {
            for (var e, i = this.$children, r = i.length, n = 0; r > n; n++)
                if (e = i[n], e.name == t) return e;
            return null
        }, i.prototype.removeChild = function(t) {
            var e = this.$children.indexOf(t);
            return e >= 0 ? this.$doRemoveChild(e) : null
        }, i.prototype.removeChildAt = function(t) {
            return t = 0 | +t, t >= 0 && t < this.$children.length ? this.$doRemoveChild(t) : null
        }, i.prototype.$doRemoveChild = function(e, r) {
            void 0 === r && (r = !0), e = 0 | +e;
            var n = this,
                a = this.$children,
                o = a[e];
            if (this.$childRemoved(o, e), r && o.dispatchEventWith(t.Event.REMOVED, !0), this.$stage) {
                o.$onRemoveFromStage();
                for (var s = i.$EVENT_REMOVE_FROM_STAGE_LIST; s.length > 0;) {
                    var h = s.shift();
                    r && h.$hasAddToStage && (h.$hasAddToStage = !1, h.dispatchEventWith(t.Event.REMOVED_FROM_STAGE)), h.$hasAddToStage = !1, h.$stage = null
                }
            }
            this.$displayList || this.$parentDisplayList;
            o.$setParent(null);
            var c = a.indexOf(o);
            if (-1 != c && a.splice(c, 1), t.nativeRender) n.$nativeDisplayObject.removeChild(o.$nativeDisplayObject.id);
            else if (o.$maskedObject && o.$maskedObject.$updateRenderMode(), !n.$cacheDirty) {
                n.$cacheDirty = !0;
                var l = n.$parent;
                l && !l.$cacheDirty && (l.$cacheDirty = !0, l.$cacheDirtyUp());
                var u = n.$maskedObject;
                u && !u.$cacheDirty && (u.$cacheDirty = !0, u.$cacheDirtyUp())
            }
            return o
        }, i.prototype.setChildIndex = function(t, e) {
            e = 0 | +e, (0 > e || e >= this.$children.length) && (e = this.$children.length - 1), this.doSetChildIndex(t, e)
        }, i.prototype.doSetChildIndex = function(e, i) {
            var r = this,
                n = this.$children.indexOf(e);
            if (n != i)
                if (this.$childRemoved(e, n), this.$children.splice(n, 1), this.$children.splice(i, 0, e), this.$childAdded(e, i), t.nativeRender) this.$nativeDisplayObject.removeChild(e.$nativeDisplayObject.id), this.$nativeDisplayObject.addChildAt(e.$nativeDisplayObject.id, i);
                else if (!r.$cacheDirty) {
                r.$cacheDirty = !0;
                var a = r.$parent;
                a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp());
                var o = r.$maskedObject;
                o && !o.$cacheDirty && (o.$cacheDirty = !0, o.$cacheDirtyUp())
            }
        }, i.prototype.swapChildrenAt = function(t, e) {
            t = 0 | +t, e = 0 | +e, t >= 0 && t < this.$children.length && e >= 0 && e < this.$children.length && this.doSwapChildrenAt(t, e)
        }, i.prototype.swapChildren = function(t, e) {
            var i = this.$children.indexOf(t),
                r = this.$children.indexOf(e); - 1 == i || -1 == r || this.doSwapChildrenAt(i, r)
        }, i.prototype.doSwapChildrenAt = function(e, i) {
            var r = this;
            if (e > i) {
                var n = i;
                i = e, e = n
            } else if (e == i) return;
            var a = this.$children,
                o = a[e],
                s = a[i];
            if (this.$childRemoved(o, e), this.$childRemoved(s, i), a[e] = s, a[i] = o, this.$childAdded(s, e), this.$childAdded(o, i), t.nativeRender) this.$nativeDisplayObject.swapChild(e, i);
            else if (!r.$cacheDirty) {
                r.$cacheDirty = !0;
                var h = r.$parent;
                h && !h.$cacheDirty && (h.$cacheDirty = !0, h.$cacheDirtyUp());
                var c = r.$maskedObject;
                c && !c.$cacheDirty && (c.$cacheDirty = !0, c.$cacheDirtyUp())
            }
        }, i.prototype.removeChildren = function() {
            for (var t = this.$children, e = t.length - 1; e >= 0; e--) this.$doRemoveChild(e)
        }, i.prototype.$childAdded = function(t, e) {}, i.prototype.$childRemoved = function(t, e) {}, i.prototype.$onAddToStage = function(t, i) {
            e.prototype.$onAddToStage.call(this, t, i);
            var r = this.$children,
                n = r.length;
            i++;
            for (var a = 0; n > a; a++) {
                var o = this.$children[a];
                o.$onAddToStage(t, i), o.$maskedObject && o.$maskedObject.$updateRenderMode()
            }
        }, i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this);
            for (var t = this.$children, i = t.length, r = 0; i > r; r++) {
                var n = t[r];
                n.$onRemoveFromStage()
            }
        }, i.prototype.$measureChildBounds = function(e) {
            var i = this.$children,
                r = i.length;
            if (0 != r) {
                for (var n = 0, a = 0, o = 0, s = 0, h = !1, c = -1; r > c; c++) {
                    var l = void 0; - 1 == c ? l = e : (i[c].getBounds(t.$TempRectangle), i[c].$getMatrix().$transformBounds(t.$TempRectangle), l = t.$TempRectangle), l.isEmpty() || (h ? (n = Math.min(n, l.x), a = Math.max(a, l.x + l.width), o = Math.min(o, l.y), s = Math.max(s, l.y + l.height)) : (h = !0, n = l.x, a = n + l.width, o = l.y, s = o + l.height))
                }
                e.setTo(n, o, a - n, s - o)
            }
        }, Object.defineProperty(i.prototype, "touchChildren", {
            get: function() {
                return this.$getTouchChildren()
            },
            set: function(t) {
                this.$setTouchChildren(!!t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$getTouchChildren = function() {
            return this.$touchChildren
        }, i.prototype.$setTouchChildren = function(t) {
            return this.$touchChildren == t ? !1 : (this.$touchChildren = t, !0)
        }, i.prototype.$hitTest = function(t, i) {
            if (!this.$visible) return null;
            var r = this.$getInvertedConcatenatedMatrix(),
                n = r.a * t + r.c * i + r.tx,
                a = r.b * t + r.d * i + r.ty,
                o = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (o && !o.contains(n, a)) return null;
            if (this.$mask && !this.$mask.$hitTest(t, i)) return null;
            for (var s = this.$children, h = !1, c = null, l = s.length - 1; l >= 0; l--) {
                var u = s[l];
                if (!u.$maskedObject && (c = u.$hitTest(t, i))) {
                    if (h = !0, c.$touchEnabled) break;
                    c = null
                }
            }
            return c ? this.$touchChildren ? c : this : h ? this : e.prototype.$hitTest.call(this, t, i)
        }, i.$EVENT_ADD_TO_STAGE_LIST = [], i.$EVENT_REMOVE_FROM_STAGE_LIST = [], i
    }(t.DisplayObject);
    t.DisplayObjectContainer = e, __reflect(e.prototype, "egret.DisplayObjectContainer")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(i) {
            var r = e.call(this) || this;
            return r._bitmapX = 0, r._bitmapY = 0, r._textureMap = t.createMap(), r.$texture = i, r._bitmapX = i.$bitmapX - i.$offsetX, r._bitmapY = i.$bitmapY - i.$offsetY, r
        }
        return __extends(i, e), i.prototype.getTexture = function(t) {
            return this._textureMap[t]
        }, i.prototype.createTexture = function(e, i, r, n, a, o, s, h, c) {
            void 0 === o && (o = 0), void 0 === s && (s = 0), void 0 === h && (h = o + n), void 0 === c && (c = s + a);
            var l = new t.Texture;
            return l.disposeBitmapData = !1, l.$bitmapData = this.$texture.$bitmapData, l.$initData(this._bitmapX + i, this._bitmapY + r, n, a, o, s, h, c, this.$texture.$sourceWidth, this.$texture.$sourceHeight), this._textureMap[e] = l, l
        }, i.prototype.dispose = function() {
            this.$texture && this.$texture.dispose()
        }, i
    }(t.HashObject);
    t.SpriteSheet = e, __reflect(e.prototype, "egret.SpriteSheet")
}(egret || (egret = {}));
var egret;
! function(t) {
    t.$locale_strings = t.$locale_strings || {}, t.$language = "en_US"
}(egret || (egret = {})),
function(t) {
    var e;
    ! function(e) {
        function i(e) {
            for (var i = [], r = 1; r < arguments.length; r++) i[r - 1] = arguments[r];
            var n = t.$locale_strings[t.$language][e];
            if (!n) return "{" + e + "}";
            for (var a = i.length, o = 0; a > o; o++) n = n.replace("{" + o + "}", i[o]);
            return n
        }
        e.tr = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(r) {
            var n = e.call(this) || this;
            return n.$texture = null, n.$bitmapData = null, n.$bitmapX = 0, n.$bitmapY = 0, n.$bitmapWidth = 0, n.$bitmapHeight = 0, n.$offsetX = 0, n.$offsetY = 0, n.$textureWidth = 0, n.$textureHeight = 0, n.$sourceWidth = 0, n.$sourceHeight = 0, n.$smoothing = i.defaultSmoothing, n.$explicitBitmapWidth = 0 / 0, n.$explicitBitmapHeight = 0 / 0, n.$scale9Grid = null, n.$fillMode = "scale", n._pixelHitTest = !1, n.$renderNode = new t.sys.NormalBitmapNode, n.$setTexture(r), r && (n.$renderNode.rotated = r.$rotated), n
        }
        return __extends(i, e), i.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(1)
        }, i.prototype.$onAddToStage = function(i, r) {
            e.prototype.$onAddToStage.call(this, i, r);
            var n = this.$texture;
            n && n.$bitmapData && t.BitmapData.$addDisplayObject(this, n.$bitmapData)
        }, i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this);
            var i = this.$texture;
            i && t.BitmapData.$removeDisplayObject(this, i.$bitmapData)
        }, Object.defineProperty(i.prototype, "texture", {
            get: function() {
                return this.$texture
            },
            set: function(t) {
                var e = this;
                e.$setTexture(t), t && e.$renderNode && (e.$renderNode.rotated = t.$rotated)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setTexture = function(e) {
            var i = this,
                r = i.$texture;
            if (e == r) return !1;
            if (i.$texture = e, !e) {
                r && t.BitmapData.$removeDisplayObject(i, r.$bitmapData), i.setImageData(null, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0), i.$renderDirty = !0;
                var n = i.$parent;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp());
                var a = i.$maskedObject;
                return a && !a.$cacheDirty && (a.$cacheDirty = !0, a.$cacheDirtyUp()), t.nativeRender && this.setBitmapDataToWasm(null), !0
            }
            if (i.$refreshImageData(), i.$stage) {
                if (r && r.$bitmapData) {
                    var o = r.$bitmapData.hashCode,
                        s = e.$bitmapData ? e.$bitmapData.hashCode : -1;
                    if (o == s) {
                        i.$renderDirty = !0;
                        var h = i.$parent;
                        h && !h.$cacheDirty && (h.$cacheDirty = !0, h.$cacheDirtyUp());
                        var c = i.$maskedObject;
                        return c && !c.$cacheDirty && (c.$cacheDirty = !0, c.$cacheDirtyUp()), !0
                    }
                    t.BitmapData.$removeDisplayObject(i, r.$bitmapData)
                }
                t.BitmapData.$addDisplayObject(i, e.$bitmapData)
            }
            i.$renderDirty = !0;
            var l = i.$parent;
            l && !l.$cacheDirty && (l.$cacheDirty = !0, l.$cacheDirtyUp());
            var u = i.$maskedObject;
            return u && !u.$cacheDirty && (u.$cacheDirty = !0, u.$cacheDirtyUp()), !0
        }, i.prototype.$setBitmapData = function(t) {
            this.$setTexture(t)
        }, i.prototype.setBitmapDataToWasm = function(t) {
            this.$nativeDisplayObject.setTexture(t)
        }, i.prototype.$refreshImageData = function() {
            var e = this.$texture;
            e ? (t.nativeRender && this.setBitmapDataToWasm(e), this.setImageData(e.$bitmapData, e.$bitmapX, e.$bitmapY, e.$bitmapWidth, e.$bitmapHeight, e.$offsetX, e.$offsetY, e.$getTextureWidth(), e.$getTextureHeight(), e.$sourceWidth, e.$sourceHeight)) : t.nativeRender && this.setBitmapDataToWasm(null)
        }, i.prototype.setImageData = function(t, e, i, r, n, a, o, s, h, c, l) {
            this.$bitmapData = t, this.$bitmapX = e, this.$bitmapY = i, this.$bitmapWidth = r, this.$bitmapHeight = n, this.$offsetX = a, this.$offsetY = o, this.$textureWidth = s, this.$textureHeight = h, this.$sourceWidth = c, this.$sourceHeight = l
        }, Object.defineProperty(i.prototype, "scale9Grid", {
            get: function() {
                return this.$scale9Grid
            },
            set: function(t) {
                this.$setScale9Grid(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setScale9Grid = function(e) {
            var i = this;
            if (i.$scale9Grid = e, i.$renderDirty = !0, t.nativeRender) e ? i.$nativeDisplayObject.setScale9Grid(e.x, e.y, e.width, e.height) : i.$nativeDisplayObject.setScale9Grid(0, 0, -1, -1);
            else {
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
        }, Object.defineProperty(i.prototype, "fillMode", {
            get: function() {
                return this.$fillMode
            },
            set: function(t) {
                this.$setFillMode(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setFillMode = function(e) {
            var i = this;
            if (e == i.$fillMode) return !1;
            if (i.$fillMode = e, t.nativeRender) i.$nativeDisplayObject.setBitmapFillMode(i.$fillMode);
            else {
                i.$renderDirty = !0;
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
            return !0
        }, Object.defineProperty(i.prototype, "smoothing", {
            get: function() {
                return this.$smoothing
            },
            set: function(e) {
                var i = this;
                if (e != this.$smoothing && (this.$smoothing = e, this.$renderNode.smoothing = e, !t.nativeRender)) {
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setWidth = function(e) {
            var i = this;
            if (0 > e || e == i.$explicitBitmapWidth) return !1;
            if (i.$explicitBitmapWidth = e, i.$renderDirty = !0, t.nativeRender) i.$nativeDisplayObject.setWidth(e);
            else {
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
            return !0
        }, i.prototype.$setHeight = function(e) {
            var i = this;
            if (0 > e || e == i.$explicitBitmapHeight) return !1;
            if (i.$explicitBitmapHeight = e, i.$renderDirty = !0, t.nativeRender) i.$nativeDisplayObject.setHeight(e);
            else {
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
            return !0
        }, i.prototype.$getWidth = function() {
            return isNaN(this.$explicitBitmapWidth) ? this.$getContentBounds().width : this.$explicitBitmapWidth
        }, i.prototype.$getHeight = function() {
            return isNaN(this.$explicitBitmapHeight) ? this.$getContentBounds().height : this.$explicitBitmapHeight
        }, i.prototype.$measureContentBounds = function(t) {
            if (this.$bitmapData) {
                var e = isNaN(this.$explicitBitmapWidth) ? this.$textureWidth : this.$explicitBitmapWidth,
                    i = isNaN(this.$explicitBitmapHeight) ? this.$textureHeight : this.$explicitBitmapHeight;
                t.setTo(0, 0, e, i)
            } else {
                var e = isNaN(this.$explicitBitmapWidth) ? 0 : this.$explicitBitmapWidth,
                    i = isNaN(this.$explicitBitmapHeight) ? 0 : this.$explicitBitmapHeight;
                t.setTo(0, 0, e, i)
            }
        }, i.prototype.$updateRenderNode = function() {
            if (this.$texture) {
                var e = isNaN(this.$explicitBitmapWidth) ? this.$textureWidth : this.$explicitBitmapWidth,
                    i = isNaN(this.$explicitBitmapHeight) ? this.$textureHeight : this.$explicitBitmapHeight,
                    r = this.scale9Grid || this.$texture.scale9Grid;
                r ? (this.$renderNode instanceof t.sys.NormalBitmapNode && (this.$renderNode = new t.sys.BitmapNode), t.sys.BitmapNode.$updateTextureDataWithScale9Grid(this.$renderNode, this.$bitmapData, r, this.$bitmapX, this.$bitmapY, this.$bitmapWidth, this.$bitmapHeight, this.$offsetX, this.$offsetY, this.$textureWidth, this.$textureHeight, e, i, this.$sourceWidth, this.$sourceHeight, this.$smoothing)) : (this.fillMode == t.BitmapFillMode.REPEAT && this.$renderNode instanceof t.sys.NormalBitmapNode && (this.$renderNode = new t.sys.BitmapNode), t.sys.BitmapNode.$updateTextureData(this.$renderNode, this.$bitmapData, this.$bitmapX, this.$bitmapY, this.$bitmapWidth, this.$bitmapHeight, this.$offsetX, this.$offsetY, this.$textureWidth, this.$textureHeight, e, i, this.$sourceWidth, this.$sourceHeight, this.$fillMode, this.$smoothing))
            }
        }, Object.defineProperty(i.prototype, "pixelHitTest", {
            get: function() {
                return this._pixelHitTest
            },
            set: function(t) {
                this._pixelHitTest = !!t
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$hitTest = function(t, i) {
            var r = e.prototype.$hitTest.call(this, t, i);
            if (r && this._pixelHitTest) {
                var n = this.hitTestPoint(t, i, !0);
                n || (r = null)
            }
            return r
        }, i.defaultSmoothing = !0, i
    }(t.DisplayObject);
    t.Bitmap = e, __reflect(e.prototype, "egret.Bitmap")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function() {
            function t() {
                this.type = 0, this.drawData = [], this.renderCount = 0
            }
            return t.prototype.cleanBeforeRender = function() {
                this.drawData.length = 0, this.renderCount = 0
            }, t.prototype.$getRenderCount = function() {
                return this.renderCount
            }, t
        }();
        t.RenderNode = e, __reflect(e.prototype, "egret.sys.RenderNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function() {
            function t() {
                this.type = 0, this.$commands = [], this.$data = [], this.commandPosition = 0, this.dataPosition = 0, this.$lastX = 0, this.$lastY = 0
            }
            return t.prototype.moveTo = function(t, e) {
                this.$commands[this.commandPosition++] = 1;
                var i = this.dataPosition;
                this.$data[i++] = t, this.$data[i++] = e, this.dataPosition = i
            }, t.prototype.lineTo = function(t, e) {
                this.$commands[this.commandPosition++] = 2;
                var i = this.dataPosition;
                this.$data[i++] = t, this.$data[i++] = e, this.dataPosition = i
            }, t.prototype.curveTo = function(t, e, i, r) {
                this.$commands[this.commandPosition++] = 3;
                var n = this.dataPosition;
                this.$data[n++] = t, this.$data[n++] = e, this.$data[n++] = i, this.$data[n++] = r, this.dataPosition = n
            }, t.prototype.cubicCurveTo = function(t, e, i, r, n, a) {
                this.$commands[this.commandPosition++] = 4;
                var o = this.dataPosition;
                this.$data[o++] = t, this.$data[o++] = e, this.$data[o++] = i, this.$data[o++] = r, this.$data[o++] = n, this.$data[o++] = a, this.dataPosition = o
            }, t.prototype.drawRect = function(t, e, i, r) {
                var n = t + i,
                    a = e + r;
                this.moveTo(t, e), this.lineTo(n, e), this.lineTo(n, a), this.lineTo(t, a), this.lineTo(t, e)
            }, t.prototype.drawRoundRect = function(t, e, i, r, n, a) {
                var o = .5 * n | 0,
                    s = a ? .5 * a | 0 : o;
                if (!o || !s) return void this.drawRect(t, e, i, r);
                var h = .5 * i,
                    c = .5 * r;
                if (o > h && (o = h), s > c && (s = c), h === o && c === s) return void(o === s ? this.drawCircle(t + o, e + s, o) : this.drawEllipse(t, e, 2 * o, 2 * s));
                var l = t + i,
                    u = e + r,
                    p = t + o,
                    d = l - o,
                    f = e + s,
                    g = u - s;
                this.moveTo(l, g), this.curveTo(l, u, d, u), this.lineTo(p, u), this.curveTo(t, u, t, g), this.lineTo(t, f), this.curveTo(t, e, p, e), this.lineTo(d, e), this.curveTo(l, e, l, f), this.lineTo(l, g)
            }, t.prototype.drawCircle = function(t, e, i) {
                this.arcToBezier(t, e, i, i, 0, 2 * Math.PI)
            }, t.prototype.drawEllipse = function(t, e, i, r) {
                var n = .5 * i,
                    a = .5 * r;
                t += n, e += a, this.arcToBezier(t, e, n, a, 0, 2 * Math.PI)
            }, t.prototype.drawArc = function(t, e, i, r, n, a) {
                a ? n >= r && (n -= 2 * Math.PI) : r >= n && (n += 2 * Math.PI), this.arcToBezier(t, e, i, i, r, n, a)
            }, t.prototype.arcToBezier = function(t, e, i, r, n, a, o) {
                var s = .5 * Math.PI,
                    h = n,
                    c = h;
                o ? (c += -s - h % s, a > c && (c = a)) : (c += s - h % s, c > a && (c = a));
                var l = t + Math.cos(h) * i,
                    u = e + Math.sin(h) * r;
                (this.$lastX != l || this.$lastY != u) && this.moveTo(l, u);
                for (var p = Math.cos(h), d = Math.sin(h), f = 0; 4 > f; f++) {
                    var g = c - h,
                        $ = 4 * Math.tan(g / 4) / 3,
                        y = l - d * $ * i,
                        v = u + p * $ * r;
                    p = Math.cos(c), d = Math.sin(c), l = t + p * i, u = e + d * r;
                    var b = l + d * $ * i,
                        m = u - p * $ * r;
                    if (this.cubicCurveTo(y, v, b, m, l, u), c === a) break;
                    h = c, o ? (c = h - s, a > c && (c = a)) : (c = h + s, c > a && (c = a))
                }
            }, t
        }();
        t.Path2D = e, __reflect(e.prototype, "egret.sys.Path2D")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    t.fontMapping = {}
}(egret || (egret = {}));
var egret;
! function(t) {
    function e() {
        var t = Object.create(null);
        return t.__v8__ = void 0, delete t.__v8__, t
    }
    t.createMap = e
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e(e, i, r, n, a, o, s, h) {
            void 0 === e && (e = 16711680), void 0 === i && (i = 1), void 0 === r && (r = 6), void 0 === n && (n = 6), void 0 === a && (a = 2), void 0 === o && (o = 1), void 0 === s && (s = !1), void 0 === h && (h = !1);
            var c = t.call(this) || this,
                l = c;
            return l.type = "glow", l.$color = e, l.$blue = 255 & e, l.$green = (65280 & e) >> 8, l.$red = e >> 16, l.$alpha = i, l.$blurX = r, l.$blurY = n, l.$strength = a, l.$quality = o, l.$inner = s, l.$knockout = h, l.$uniforms.color = {
                x: c.$red / 255,
                y: c.$green / 255,
                z: c.$blue / 255,
                w: 1
            }, l.$uniforms.alpha = i, l.$uniforms.blurX = r, l.$uniforms.blurY = n, l.$uniforms.strength = a, l.$uniforms.inner = s ? 1 : 0, l.$uniforms.knockout = h ? 0 : 1, l.$uniforms.dist = 0, l.$uniforms.angle = 0, l.$uniforms.hideObject = 0, l.onPropertyChange(), c
        }
        return __extends(e, t), Object.defineProperty(e.prototype, "color", {
            get: function() {
                return this.$color
            },
            set: function(t) {
                this.$color != t && (this.$color = t, this.$blue = 255 & t, this.$green = (65280 & t) >> 8, this.$red = t >> 16, this.$uniforms.color.x = this.$red / 255, this.$uniforms.color.y = this.$green / 255, this.$uniforms.color.z = this.$blue / 255)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "alpha", {
            get: function() {
                return this.$alpha
            },
            set: function(t) {
                this.$alpha != t && (this.$alpha = t, this.$uniforms.alpha = t)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "blurX", {
            get: function() {
                return this.$blurX
            },
            set: function(t) {
                var e = this;
                e.$blurX != t && (e.$blurX = t, e.$uniforms.blurX = t, e.onPropertyChange())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "blurY", {
            get: function() {
                return this.$blurY
            },
            set: function(t) {
                var e = this;
                e.$blurY != t && (e.$blurY = t, e.$uniforms.blurY = t, e.onPropertyChange())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "strength", {
            get: function() {
                return this.$strength
            },
            set: function(t) {
                this.$strength != t && (this.$strength = t, this.$uniforms.strength = t)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "quality", {
            get: function() {
                return this.$quality
            },
            set: function(t) {
                this.$quality != t && (this.$quality = t)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "inner", {
            get: function() {
                return this.$inner
            },
            set: function(t) {
                this.$inner != t && (this.$inner = t, this.$uniforms.inner = t ? 1 : 0)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(e.prototype, "knockout", {
            get: function() {
                return this.$knockout
            },
            set: function(t) {
                this.$knockout != t && (this.$knockout = t, this.$uniforms.knockout = t ? 0 : 1)
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.$toJson = function() {
            return '{"color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + "}"
        }, e.prototype.updatePadding = function() {
            var t = this;
            t.paddingLeft = t.blurX, t.paddingRight = t.blurX, t.paddingTop = t.blurY, t.paddingBottom = t.blurY
        }, e
    }(t.Filter);
    t.GlowFilter = e, __reflect(e.prototype, "egret.GlowFilter")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.NORMAL = "normal", t.ADD = "add", t.ERASE = "erase", t
    }();
    t.BlendMode = e, __reflect(e.prototype, "egret.BlendMode")
}(egret || (egret = {})),
function(t) {
    var e;
    ! function(t) {
        function e(t) {
            var e = n[t];
            return void 0 === e ? 0 : e
        }

        function i(t) {
            var e = r[t];
            return void 0 === e ? "normal" : e
        }
        for (var r = ["normal", "add", "erase"], n = {}, a = r.length, o = 0; a > o; o++) {
            var s = r[o];
            n[s] = o
        }
        t.blendModeToNumber = e, t.numberToBlendMode = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    t.CapsStyle = {
        NONE: "none",
        ROUND: "round",
        SQUARE: "square"
    }
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function e() {}
        return e.compileProgram = function(i, r, n) {
            var a = e.compileFragmentShader(i, n),
                o = e.compileVertexShader(i, r),
                s = i.createProgram();
            return i.attachShader(s, o), i.attachShader(s, a), i.linkProgram(s), i.getProgramParameter(s, i.LINK_STATUS) || t.$warn(1020), s
        }, e.compileFragmentShader = function(t, i) {
            return e._compileShader(t, i, t.FRAGMENT_SHADER)
        }, e.compileVertexShader = function(t, i) {
            return e._compileShader(t, i, t.VERTEX_SHADER)
        }, e._compileShader = function(t, e, i) {
            var r = t.createShader(i);
            return t.shaderSource(r, e), t.compileShader(r), t.getShaderParameter(r, t.COMPILE_STATUS) ? r : null
        }, e.checkCanUseWebGL = function() {
            if (void 0 == e.canUseWebGL) try {
                var t = document.createElement("canvas");
                e.canUseWebGL = !(!window.WebGLRenderingContext || !t.getContext("webgl") && !t.getContext("experimental-webgl"))
            } catch (i) {
                e.canUseWebGL = !1
            }
            return e.canUseWebGL
        }, e.deleteWebGLTexture = function(t) {
            if (t) {
                var e = t.glContext;
                e && e.deleteTexture(t)
            }
        }, e
    }();
    t.WebGLUtils = e, __reflect(e.prototype, "egret.WebGLUtils")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e(e, i, r) {
            return void 0 === i && (i = !1), void 0 === r && (r = !1), t.call(this, e, i, r) || this
        }
        return __extends(e, t), e.FOCUS_IN = "focusIn", e.FOCUS_OUT = "focusOut", e
    }(t.Event);
    t.FocusEvent = e, __reflect(e.prototype, "egret.FocusEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t), e.PERMISSION_DENIED = "permissionDenied", e.UNAVAILABLE = "unavailable", e
    }(t.Event);
    t.GeolocationEvent = e, __reflect(e.prototype, "egret.GeolocationEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r) {
            void 0 === i && (i = !1), void 0 === r && (r = !1);
            var n = e.call(this, t, i, r) || this;
            return n._status = 0, n
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "status", {
            get: function() {
                return this._status
            },
            enumerable: !0,
            configurable: !0
        }), i.dispatchHTTPStatusEvent = function(e, r) {
            var n = t.Event.create(i, i.HTTP_STATUS);
            n._status = r;
            var a = e.dispatchEvent(n);
            return t.Event.release(n), a
        }, i.HTTP_STATUS = "httpStatus", i
    }(t.Event);
    t.HTTPStatusEvent = e, __reflect(e.prototype, "egret.HTTPStatusEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r) {
            return void 0 === i && (i = !1), void 0 === r && (r = !1), e.call(this, t, i, r) || this
        }
        return __extends(i, e), i.dispatchIOErrorEvent = function(e) {
            var r = t.Event.create(i, i.IO_ERROR),
                n = e.dispatchEvent(r);
            return t.Event.release(r), n
        }, i.IO_ERROR = "ioError", i
    }(t.Event);
    t.IOErrorEvent = e, __reflect(e.prototype, "egret.IOErrorEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t), e
    }(t.Event);
    t.MotionEvent = e, __reflect(e.prototype, "egret.MotionEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e() {
            return null !== t && t.apply(this, arguments) || this
        }
        return __extends(e, t), e
    }(t.Event);
    t.OrientationEvent = e, __reflect(e.prototype, "egret.OrientationEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r, n, a) {
            void 0 === i && (i = !1), void 0 === r && (r = !1), void 0 === n && (n = 0), void 0 === a && (a = 0);
            var o = e.call(this, t, i, r) || this;
            return o.bytesLoaded = 0, o.bytesTotal = 0, o.bytesLoaded = n, o.bytesTotal = a, o
        }
        return __extends(i, e), i.dispatchProgressEvent = function(e, r, n, a) {
            void 0 === n && (n = 0), void 0 === a && (a = 0);
            var o = t.Event.create(i, r);
            o.bytesLoaded = n, o.bytesTotal = a;
            var s = e.dispatchEvent(o);
            return t.Event.release(o), s
        }, i.PROGRESS = "progress", i.SOCKET_DATA = "socketData", i
    }(t.Event);
    t.ProgressEvent = e, __reflect(e.prototype, "egret.ProgressEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r) {
            return void 0 === i && (i = !1), void 0 === r && (r = !1), e.call(this, t, i, r) || this
        }
        return __extends(i, e), i.dispatchStageOrientationEvent = function(e, r) {
            var n = t.Event.create(i, r),
                a = e.dispatchEvent(n);
            return t.Event.release(n), a
        }, i.ORIENTATION_CHANGE = "orientationChange", i
    }(t.Event);
    t.StageOrientationEvent = e, __reflect(e.prototype, "egret.StageOrientationEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r, n) {
            void 0 === i && (i = !1), void 0 === r && (r = !1), void 0 === n && (n = "");
            var a = e.call(this, t, i, r) || this;
            return a.text = n, a
        }
        return __extends(i, e), i.dispatchTextEvent = function(e, r, n) {
            var a = t.Event.create(i, r);
            a.text = n;
            var o = e.dispatchEvent(a);
            return t.Event.release(a), o
        }, i.LINK = "link", i
    }(t.Event);
    t.TextEvent = e, __reflect(e.prototype, "egret.TextEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r) {
            return e.call(this, t, i, r) || this
        }
        return __extends(i, e), i.prototype.updateAfterEvent = function() {
            t.sys.$requestRenderingFlag = !0
        }, i.dispatchTimerEvent = function(e, r, n, a) {
            var o = t.Event.create(i, r, n, a),
                s = e.dispatchEvent(o);
            return t.Event.release(o), s
        }, i.TIMER = "timer", i.TIMER_COMPLETE = "timerComplete", i
    }(t.Event);
    t.TimerEvent = e, __reflect(e.prototype, "egret.TimerEvent")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(i) {
            var r = e.call(this) || this;
            if (r.format = "image", r.$deleteSource = !0, t.nativeRender) {
                var n = new egret_native.NativeBitmapData;
                n.$init(), r.$nativeBitmapData = n
            }
            return r.source = i, r.width = i.width, r.height = i.height, r
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "source", {
            get: function() {
                return this.$source
            },
            set: function(e) {
                this.$source = e, t.nativeRender && egret_native.NativeDisplayObject.setSourceToNativeBitmapData(this.$nativeBitmapData, e)
            },
            enumerable: !0,
            configurable: !0
        }), i.create = function(e, r, n) {
            var a = "";
            a = "arraybuffer" === e ? t.Base64Util.encode(r) : r;
            var o = "image/png";
            "/" === a.charAt(0) ? o = "image/jpeg" : "R" === a.charAt(0) ? o = "image/gif" : "i" === a.charAt(0) && (o = "image/png");
            var s = new Image;
            s.src = "data:" + o + ";base64," + a, s.crossOrigin = "*";
            var h = new i(s);
            return s.onload = function() {
                s.onload = void 0, h.source = s, h.height = s.height, h.width = s.width, n && n(h)
            }, h
        }, i.prototype.$dispose = function() {
            "webgl" == t.Capabilities.renderMode && this.webGLTexture && (t.WebGLUtils.deleteWebGLTexture(this.webGLTexture), this.webGLTexture = null), this.source && this.source.dispose && this.source.dispose(), this.source = null, t.nativeRender && egret_native.NativeDisplayObject.disposeNativeBitmapData(this.$nativeBitmapData), i.$dispose(this)
        }, i.$addDisplayObject = function(t, e) {
            if (e) {
                var r = e.hashCode;
                if (r) {
                    if (!i._displayList[r]) return void(i._displayList[r] = [t]);
                    var n = i._displayList[r];
                    n.indexOf(t) < 0 && n.push(t)
                }
            }
        }, i.$removeDisplayObject = function(t, e) {
            if (e) {
                var r = e.hashCode;
                if (r && i._displayList[r]) {
                    var n = i._displayList[r],
                        a = n.indexOf(t);
                    a >= 0 && n.splice(a, 1)
                }
            }
        }, i.$invalidate = function(e) {
            if (e) {
                var r = e.hashCode;
                if (r && i._displayList[r])
                    for (var n = i._displayList[r], a = 0; a < n.length; a++) {
                        n[a] instanceof t.Bitmap && n[a].$refreshImageData();
                        var o = n[a];
                        o.$renderDirty = !0;
                        var s = o.$parent;
                        s && !s.$cacheDirty && (s.$cacheDirty = !0, s.$cacheDirtyUp());
                        var h = o.$maskedObject;
                        h && !h.$cacheDirty && (h.$cacheDirty = !0, h.$cacheDirtyUp())
                    }
            }
        }, i.$dispose = function(e) {
            if (e) {
                var r = e.hashCode;
                if (r && i._displayList[r]) {
                    for (var n = i._displayList[r], a = 0, o = n; a < o.length; a++) {
                        var s = o[a];
                        s instanceof t.Bitmap && (s.$bitmapData = null), s.$renderDirty = !0;
                        var h = s.$parent;
                        h && !h.$cacheDirty && (h.$cacheDirty = !0, h.$cacheDirtyUp());
                        var c = s.$maskedObject;
                        c && !c.$cacheDirty && (c.$cacheDirty = !0, c.$cacheDirtyUp())
                    }
                    delete i._displayList[r]
                }
            }
        }, i._displayList = t.createMap(), i
    }(t.HashObject);
    t.BitmapData = e, __reflect(e.prototype, "egret.BitmapData")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = new t.Point,
        i = function(i) {
            function r(t, e, r, n, a, o) {
                var s = i.call(this, t, e, r) || this;
                return s.targetChanged = !0, s.touchDown = !1, s.$initTo(n, a, o), s
            }
            return __extends(r, i), r.prototype.$initTo = function(t, e, i) {
                this.touchPointID = +i || 0, this.$stageX = +t || 0, this.$stageY = +e || 0
            }, Object.defineProperty(r.prototype, "stageX", {
                get: function() {
                    return this.$stageX
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "stageY", {
                get: function() {
                    return this.$stageY
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "localX", {
                get: function() {
                    return this.targetChanged && this.getLocalXY(), this._localX
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "localY", {
                get: function() {
                    return this.targetChanged && this.getLocalXY(), this._localY
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.getLocalXY = function() {
                this.targetChanged = !1;
                var t = this.$target.$getInvertedConcatenatedMatrix();
                t.transformPoint(this.$stageX, this.$stageY, e), this._localX = e.x, this._localY = e.y
            }, r.prototype.$setTarget = function(t) {
                return this.$target = t, this.targetChanged = !!t, !0
            }, r.prototype.updateAfterEvent = function() {
                t.sys.$requestRenderingFlag = !0
            }, r.dispatchTouchEvent = function(e, i, n, a, o, s, h, c) {
                if (void 0 === c && (c = !1), !n && !e.hasEventListener(i)) return !0;
                var l = t.Event.create(r, i, n, a);
                l.$initTo(o, s, h), l.touchDown = c;
                var u = e.dispatchEvent(l);
                return t.Event.release(l), u
            }, r.TOUCH_MOVE = "touchMove", r.TOUCH_BEGIN = "touchBegin", r.TOUCH_END = "touchEnd", r.TOUCH_CANCEL = "touchCancel", r.TOUCH_TAP = "touchTap", r.TOUCH_RELEASE_OUTSIDE = "touchReleaseOutside", r
        }(t.Event);
    t.TouchEvent = i, __reflect(i.prototype, "egret.TouchEvent")
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function n(t, n, a) {
            void 0 === t && (t = 4), void 0 === n && (n = 4), void 0 === a && (a = 1);
            var o = e.call(this) || this,
                s = o;
            return s.type = "blur", s.$blurX = t, s.$blurY = n, s.$quality = a, s.blurXFilter = new i(t), s.blurYFilter = new r(n), s.onPropertyChange(), o
        }
        return __extends(n, e), Object.defineProperty(n.prototype, "blurX", {
            get: function() {
                return this.$blurX
            },
            set: function(t) {
                var e = this;
                e.$blurX != t && (e.$blurX = t, e.blurXFilter.blurX = t, e.onPropertyChange())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(n.prototype, "blurY", {
            get: function() {
                return this.$blurY
            },
            set: function(t) {
                var e = this;
                e.$blurY != t && (e.$blurY = t, e.blurYFilter.blurY = t, e.onPropertyChange())
            },
            enumerable: !0,
            configurable: !0
        }), n.prototype.$toJson = function() {
            return '{"blurX": ' + this.$blurX + ', "blurY": ' + this.$blurY + ', "quality": 1}'
        }, n.prototype.updatePadding = function() {
            var t = this;
            t.paddingLeft = t.blurX, t.paddingRight = t.blurX, t.paddingTop = t.blurY, t.paddingBottom = t.blurY
        }, n.prototype.onPropertyChange = function() {
            var e = this;
            e.updatePadding(), t.nativeRender && (egret_native.NativeDisplayObject.setFilterPadding(e.blurXFilter.$id, 0, 0, e.paddingLeft, e.paddingRight), egret_native.NativeDisplayObject.setFilterPadding(e.blurYFilter.$id, e.paddingTop, e.paddingBottom, 0, 0), egret_native.NativeDisplayObject.setDataToFilter(e))
        }, n
    }(t.Filter);
    t.BlurFilter = e, __reflect(e.prototype, "egret.BlurFilter");
    var i = function(e) {
        function i(i) {
            void 0 === i && (i = 4);
            var r = e.call(this) || this;
            return t.nativeRender ? r.type = "blur" : r.type = "blurX", r.$uniforms.blur = {
                x: i,
                y: 0
            }, r.onPropertyChange(), r
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "blurX", {
            get: function() {
                return this.$uniforms.blur.x
            },
            set: function(t) {
                this.$uniforms.blur.x = t
            },
            enumerable: !0,
            configurable: !0
        }), i
    }(t.Filter);
    __reflect(i.prototype, "BlurXFilter", ["egret.IBlurXFilter"]);
    var r = function(e) {
        function i(i) {
            void 0 === i && (i = 4);
            var r = e.call(this) || this;
            return t.nativeRender ? r.type = "blur" : r.type = "blurY", r.$uniforms.blur = {
                x: 0,
                y: i
            }, r.onPropertyChange(), r
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "blurY", {
            get: function() {
                return this.$uniforms.blur.y
            },
            set: function(t) {
                this.$uniforms.blur.y = t
            },
            enumerable: !0,
            configurable: !0
        }), i
    }(t.Filter);
    __reflect(r.prototype, "BlurYFilter", ["egret.IBlurYFilter"])
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e(e) {
            void 0 === e && (e = null);
            var i = t.call(this) || this;
            return i.$matrix = [], i.matrix2 = [], i.type = "colorTransform", i.$uniforms.matrix = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1], i.$uniforms.colorAdd = {
                x: 0,
                y: 0,
                z: 0,
                w: 0
            }, i.setMatrix(e), i.onPropertyChange(), i
        }
        return __extends(e, t), Object.defineProperty(e.prototype, "matrix", {
            get: function() {
                for (var t = 0; 20 > t; t++) this.matrix2[t] = this.$matrix[t];
                return this.matrix2
            },
            set: function(t) {
                this.setMatrix(t)
            },
            enumerable: !0,
            configurable: !0
        }), e.prototype.setMatrix = function(t) {
            if (t)
                for (var e = 0; 20 > e; e++) this.$matrix[e] = t[e];
            else
                for (var e = 0; 20 > e; e++) this.$matrix[e] = 0 == e || 6 == e || 12 == e || 18 == e ? 1 : 0;
            for (var i = this.$matrix, r = this.$uniforms.matrix, n = this.$uniforms.colorAdd, e = 0, a = 0; e < i.length; e++) 4 === e ? n.x = i[e] / 255 : 9 === e ? n.y = i[e] / 255 : 14 === e ? n.z = i[e] / 255 : 19 === e ? n.w = i[e] / 255 : (r[a] = i[e], a++);
            this.onPropertyChange()
        }, e.prototype.$toJson = function() {
            return '{"matrix": [' + this.$matrix.toString() + "]}"
        }, e
    }(t.Filter);
    t.ColorMatrixFilter = e, __reflect(e.prototype, "egret.ColorMatrixFilter")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e, i = {},
        r = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split(""),
        n = new Array(36),
        a = 0,
        o = function() {
            for (var t = 0; 36 > t; t++) 8 === t || 13 === t || 18 === t || 23 === t ? n[t] = "-" : 14 === t ? n[t] = "4" : (2 >= a && (a = 33554432 + 16777216 * Math.random() | 0), e = 15 & a, a >>= 4, n[t] = r[19 === t ? 3 & e | 8 : e]);
            return n.join("")
        },
        s = function(e) {
            function r(t, r, n) {
                void 0 === n && (n = {});
                var a = e.call(this) || this;
                a.$padding = 0, a.$vertexSrc = t, a.$fragmentSrc = r;
                var s = t + r;
                return i[s] || (i[s] = o()), a.$shaderKey = i[s], a.$uniforms = n, a.type = "custom", a
            }
            return __extends(r, e), Object.defineProperty(r.prototype, "padding", {
                get: function() {
                    return this.$padding
                },
                set: function(t) {
                    var e = this;
                    e.$padding != t && (e.$padding = t, e.onPropertyChange())
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "uniforms", {
                get: function() {
                    return this.$uniforms
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.onPropertyChange = function() {
                if (t.nativeRender) {
                    var e = this;
                    egret_native.NativeDisplayObject.setFilterPadding(e.$id, e.$padding, e.$padding, e.$padding, e.$padding), egret_native.NativeDisplayObject.setDataToFilter(e)
                }
            }, r
        }(t.Filter);
    t.CustomFilter = s, __reflect(s.prototype, "egret.CustomFilter")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i, r, n, a, o, s, h, c, l, u) {
            void 0 === t && (t = 4), void 0 === i && (i = 45), void 0 === r && (r = 0), void 0 === n && (n = 1), void 0 === a && (a = 4), void 0 === o && (o = 4), void 0 === s && (s = 1), void 0 === h && (h = 1), void 0 === c && (c = !1), void 0 === l && (l = !1), void 0 === u && (u = !1);
            var p = e.call(this, r, n, a, o, s, h, c, l) || this,
                d = p;
            return d.$distance = t, d.$angle = i, d.$hideObject = u, d.$uniforms.dist = t, d.$uniforms.angle = i / 180 * Math.PI, d.$uniforms.hideObject = u ? 1 : 0, d.onPropertyChange(), p
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "distance", {
            get: function() {
                return this.$distance
            },
            set: function(t) {
                var e = this;
                e.$distance != t && (e.$distance = t, e.$uniforms.dist = t, e.onPropertyChange())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "angle", {
            get: function() {
                return this.$angle
            },
            set: function(t) {
                var e = this;
                e.$angle != t && (e.$angle = t, e.$uniforms.angle = t / 180 * Math.PI, e.onPropertyChange())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "hideObject", {
            get: function() {
                return this.$hideObject
            },
            set: function(t) {
                this.$hideObject != t && (this.$hideObject = t, this.$uniforms.hideObject = t ? 1 : 0)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$toJson = function() {
            return '{"distance": ' + this.$distance + ', "angle": ' + this.$angle + ', "color": ' + this.$color + ', "red": ' + this.$red + ', "green": ' + this.$green + ', "blue": ' + this.$blue + ', "alpha": ' + this.$alpha + ', "blurX": ' + this.$blurX + ', "blurY": ' + this.blurY + ', "strength": ' + this.$strength + ', "quality": ' + this.$quality + ', "inner": ' + this.$inner + ', "knockout": ' + this.$knockout + ', "hideObject": ' + this.$hideObject + "}"
        }, i.prototype.updatePadding = function() {
            var e = this;
            e.paddingLeft = e.blurX, e.paddingRight = e.blurX, e.paddingTop = e.blurY, e.paddingBottom = e.blurY;
            var i = e.distance || 0,
                r = e.angle || 0,
                n = 0,
                a = 0;
            0 != i && (n = i * t.NumberUtils.cos(r), n = n > 0 ? Math.ceil(n) : Math.floor(n), a = i * t.NumberUtils.sin(r), a = a > 0 ? Math.ceil(a) : Math.floor(a), e.paddingLeft += n, e.paddingRight += n, e.paddingTop += a, e.paddingBottom += a)
        }, i
    }(t.GlowFilter);
    t.DropShadowFilter = e, __reflect(e.prototype, "egret.DropShadowFilter")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.LINEAR = "linear", t.RADIAL = "radial", t
    }();
    t.GradientType = e, __reflect(e.prototype, "egret.GradientType")
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t) {
        return t %= 2 * Math.PI, 0 > t && (t += 2 * Math.PI), t
    }

    function i(t, e) {
        for (var i = [], n = 0; e > n; n++) {
            var a = r(t, n / e);
            a && i.push(a)
        }
        return i
    }

    function r(e, i) {
        var r = 0,
            o = 0,
            s = 0,
            h = e.length;
        if (h / 2 == 3) {
            var c = e[r++],
                l = e[r++],
                u = e[r++],
                p = e[r++],
                d = e[r++],
                f = e[r++];
            o = n(c, u, d, i), s = n(l, p, f, i)
        } else if (h / 2 == 4) {
            var c = e[r++],
                l = e[r++],
                u = e[r++],
                p = e[r++],
                d = e[r++],
                f = e[r++],
                g = e[r++],
                $ = e[r++];
            o = a(c, u, d, g, i), s = a(l, p, f, $, i)
        }
        return t.Point.create(o, s)
    }

    function n(t, e, i, r) {
        var n = Math.pow(1 - r, 2) * t + 2 * r * (1 - r) * e + Math.pow(r, 2) * i;
        return n
    }

    function a(t, e, i, r, n) {
        var a = Math.pow(1 - n, 3) * t + 3 * n * Math.pow(1 - n, 2) * e + 3 * (1 - n) * Math.pow(n, 2) * i + Math.pow(n, 3) * r;
        return a
    }
    var o = function(r) {
        function n() {
            var e = r.call(this) || this;
            return e.lastX = 0, e.lastY = 0, e.fillPath = null, e.strokePath = null, e.topLeftStrokeWidth = 0, e.bottomRightStrokeWidth = 0, e.minX = 1 / 0, e.minY = 1 / 0, e.maxX = -(1 / 0), e.maxY = -(1 / 0), e.includeLastPosition = !0, e.$renderNode = new t.sys.GraphicsNode, e
        }
        return __extends(n, r), n.prototype.$setTarget = function(e) {
            this.$targetDisplay && (this.$targetDisplay.$renderNode = null), e.$renderNode = this.$renderNode, this.$targetDisplay = e, this.$targetIsSprite = e instanceof t.Sprite
        }, n.prototype.setStrokeWidth = function(t) {
            switch (t) {
                case 1:
                    this.topLeftStrokeWidth = 0, this.bottomRightStrokeWidth = 1;
                    break;
                case 3:
                    this.topLeftStrokeWidth = 1, this.bottomRightStrokeWidth = 2;
                    break;
                default:
                    var e = 0 | Math.ceil(.5 * t);
                    this.topLeftStrokeWidth = e, this.bottomRightStrokeWidth = e
            }
        }, n.prototype.beginFill = function(e, i) {
            void 0 === i && (i = 1), e = +e || 0, i = +i || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setBeginFill(e, i), this.fillPath = this.$renderNode.beginFill(e, i, this.strokePath), this.$renderNode.drawData.length > 1 && this.fillPath.moveTo(this.lastX, this.lastY)
        }, n.prototype.beginGradientFill = function(e, i, r, n, a) {
            void 0 === a && (a = null), t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setBeginGradientFill(e, i, r, n, a), this.fillPath = this.$renderNode.beginGradientFill(e, i, r, n, a, this.strokePath), this.$renderNode.drawData.length > 1 && this.fillPath.moveTo(this.lastX, this.lastY)
        }, n.prototype.endFill = function() {
            t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setEndFill(), this.fillPath = null
        }, n.prototype.lineStyle = function(e, i, r, n, a, o, s, h, c) {
            void 0 === e && (e = 0 / 0), void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === n && (n = !1), void 0 === a && (a = "normal"), void 0 === o && (o = null), void 0 === s && (s = null), void 0 === h && (h = 3), e = +e || 0, i = +i || 0, r = +r || 0, h = +h || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setLineStyle(e, i, r, n, a, o, s, h), 0 >= e ? (this.strokePath = null, this.setStrokeWidth(0)) : (this.setStrokeWidth(e), this.strokePath = this.$renderNode.lineStyle(e, i, r, o, s, h, c), this.$renderNode.drawData.length > 1 && this.strokePath.moveTo(this.lastX, this.lastY))
        }, n.prototype.drawRect = function(e, i, r, n) {
            e = +e || 0, i = +i || 0, r = +r || 0, n = +n || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setDrawRect(e, i, r, n);
            var a = this.fillPath,
                o = this.strokePath;
            a && a.drawRect(e, i, r, n), o && o.drawRect(e, i, r, n), this.extendBoundsByPoint(e + r, i + n), this.updatePosition(e, i), this.dirty()
        }, n.prototype.drawRoundRect = function(e, i, r, n, a, o) {
            e = +e || 0, i = +i || 0, r = +r || 0, n = +n || 0, a = +a || 0, o = +o || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setDrawRoundRect(e, i, r, n, a, o);
            var s = this.fillPath,
                h = this.strokePath;
            s && s.drawRoundRect(e, i, r, n, a, o), h && h.drawRoundRect(e, i, r, n, a, o);
            var c = .5 * a | 0,
                l = o ? .5 * o | 0 : c,
                u = e + r,
                p = i + n,
                d = p - l;
            this.extendBoundsByPoint(e, i), this.extendBoundsByPoint(u, p), this.updatePosition(u, d), this.dirty()
        }, n.prototype.drawCircle = function(e, i, r) {
            e = +e || 0, i = +i || 0, r = +r || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setDrawCircle(e, i, r);
            var n = this.fillPath,
                a = this.strokePath;
            n && n.drawCircle(e, i, r), a && a.drawCircle(e, i, r), this.extendBoundsByPoint(e - r - 1, i - r - 1), this.extendBoundsByPoint(e + r + 2, i + r + 2), this.updatePosition(e + r, i), this.dirty()
        }, n.prototype.drawEllipse = function(e, i, r, n) {
            e = +e || 0, i = +i || 0, r = +r || 0, n = +n || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setDrawEllipse(e, i, r, n);
            var a = this.fillPath,
                o = this.strokePath;
            a && a.drawEllipse(e, i, r, n), o && o.drawEllipse(e, i, r, n), this.extendBoundsByPoint(e - 1, i - 1), this.extendBoundsByPoint(e + r + 2, i + n + 2), this.updatePosition(e + r, i + .5 * n), this.dirty()
        }, n.prototype.moveTo = function(e, i) {
            e = +e || 0, i = +i || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setMoveTo(e, i);
            var r = this.fillPath,
                n = this.strokePath;
            r && r.moveTo(e, i), n && n.moveTo(e, i), this.includeLastPosition = !1, this.lastX = e, this.lastY = i, this.dirty()
        }, n.prototype.lineTo = function(e, i) {
            e = +e || 0, i = +i || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setLineTo(e, i);
            var r = this.fillPath,
                n = this.strokePath;
            r && r.lineTo(e, i), n && n.lineTo(e, i), this.updatePosition(e, i), this.dirty()
        }, n.prototype.curveTo = function(e, r, n, a) {
            e = +e || 0, r = +r || 0, n = +n || 0, a = +a || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setCurveTo(e, r, n, a);
            var o = this.fillPath,
                s = this.strokePath;
            o && o.curveTo(e, r, n, a), s && s.curveTo(e, r, n, a);
            for (var h = this.lastX || 0, c = this.lastY || 0, l = i([h, c, e, r, n, a], 50), u = 0; u < l.length; u++) {
                var p = l[u];
                this.extendBoundsByPoint(p.x, p.y), t.Point.release(p)
            }
            this.extendBoundsByPoint(n, a), this.updatePosition(n, a), this.dirty()
        }, n.prototype.cubicCurveTo = function(e, r, n, a, o, s) {
            e = +e || 0, r = +r || 0, n = +n || 0, a = +a || 0, o = +o || 0, s = +s || 0, t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setCubicCurveTo(e, r, n, a, o, s);
            var h = this.fillPath,
                c = this.strokePath;
            h && h.cubicCurveTo(e, r, n, a, o, s), c && c.cubicCurveTo(e, r, n, a, o, s);
            for (var l = this.lastX || 0, u = this.lastY || 0, p = i([l, u, e, r, n, a, o, s], 50), d = 0; d < p.length; d++) {
                var f = p[d];
                this.extendBoundsByPoint(f.x, f.y), t.Point.release(f)
            }
            this.extendBoundsByPoint(o, s), this.updatePosition(o, s), this.dirty()
        }, n.prototype.drawArc = function(i, r, n, a, o, s) {
            if (!(0 > n || a === o)) {
                i = +i || 0, r = +r || 0, n = +n || 0, a = +a || 0, o = +o || 0, s = !!s, a = e(a), o = e(o), t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setDrawArc(i, r, n, a, o, s);
                var h = this.fillPath,
                    c = this.strokePath;
                h && (h.$lastX = this.lastX, h.$lastY = this.lastY, h.drawArc(i, r, n, a, o, s)), c && (c.$lastX = this.lastX, c.$lastY = this.lastY, c.drawArc(i, r, n, a, o, s)), s ? this.arcBounds(i, r, n, o, a) : this.arcBounds(i, r, n, a, o);
                var l = i + Math.cos(o) * n,
                    u = r + Math.sin(o) * n;
                this.updatePosition(l, u), this.dirty()
            }
        }, n.prototype.dirty = function() {
            var e = this;
            if (e.$renderNode.dirtyRender = !0, !t.nativeRender) {
                var i = e.$targetDisplay;
                i.$cacheDirty = !0;
                var r = i.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = i.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
        }, n.prototype.arcBounds = function(t, e, i, r, n) {
            var a = Math.PI;
            if (Math.abs(r - n) < .01) return this.extendBoundsByPoint(t - i, e - i), void this.extendBoundsByPoint(t + i, e + i);
            r > n && (n += 2 * a);
            for (var o = Math.cos(r) * i, s = Math.cos(n) * i, h = Math.min(o, s), c = Math.max(o, s), l = Math.sin(r) * i, u = Math.sin(n) * i, p = Math.min(l, u), d = Math.max(l, u), f = r / (.5 * a), g = n / (.5 * a), $ = Math.ceil(f); g >= $; $++) switch ($ % 4) {
                case 0:
                    c = i;
                    break;
                case 1:
                    d = i;
                    break;
                case 2:
                    h = -i;
                    break;
                case 3:
                    p = -i
            }
            h = Math.floor(h), p = Math.floor(p), c = Math.ceil(c), d = Math.ceil(d), this.extendBoundsByPoint(h + t, p + e), this.extendBoundsByPoint(c + t, d + e)
        }, n.prototype.clear = function() {
            t.nativeRender && this.$targetDisplay.$nativeDisplayObject.setGraphicsClear(), this.$renderNode.clear(), this.updatePosition(0, 0), this.minX = 1 / 0, this.minY = 1 / 0, this.maxX = -(1 / 0), this.maxY = -(1 / 0), this.dirty()
        }, n.prototype.extendBoundsByPoint = function(t, e) {
            this.extendBoundsByX(t), this.extendBoundsByY(e)
        }, n.prototype.extendBoundsByX = function(t) {
            this.minX = Math.min(this.minX, t - this.topLeftStrokeWidth), this.maxX = Math.max(this.maxX, t + this.bottomRightStrokeWidth), this.updateNodeBounds()
        }, n.prototype.extendBoundsByY = function(t) {
            this.minY = Math.min(this.minY, t - this.topLeftStrokeWidth), this.maxY = Math.max(this.maxY, t + this.bottomRightStrokeWidth), this.updateNodeBounds()
        }, n.prototype.updateNodeBounds = function() {
            var t = this.$renderNode;
            t.x = this.minX, t.y = this.minY, t.width = Math.ceil(this.maxX - this.minX), t.height = Math.ceil(this.maxY - this.minY)
        }, n.prototype.updatePosition = function(t, e) {
            this.includeLastPosition || (this.extendBoundsByPoint(this.lastX, this.lastY), this.includeLastPosition = !0), this.lastX = t, this.lastY = e, this.extendBoundsByPoint(t, e)
        }, n.prototype.$measureContentBounds = function(t) {
            this.minX === 1 / 0 ? t.setEmpty() : t.setTo(this.minX, this.minY, this.maxX - this.minX, this.maxY - this.minY)
        }, n.prototype.$hitTest = function(e, i) {
            var r = this.$targetDisplay,
                n = r.$getInvertedConcatenatedMatrix(),
                a = n.a * e + n.c * i + n.tx,
                o = n.b * e + n.d * i + n.ty,
                s = t.sys.canvasHitTestBuffer;
            s.resize(3, 3);
            var h = this.$renderNode,
                c = t.Matrix.create();
            c.identity(), c.translate(1 - a, 1 - o), t.sys.canvasRenderer.drawNodeToBuffer(h, s, c, !0), t.Matrix.release(c);
            try {
                var l = s.getPixels(1, 1);
                if (0 === l[3]) return null
            } catch (u) {
                throw new Error(t.sys.tr(1039))
            }
            return r
        }, n.prototype.$onRemoveFromStage = function() {
            this.$renderNode && this.$renderNode.clean(), t.nativeRender && egret_native.NativeDisplayObject.disposeGraphicData(this)
        }, n
    }(t.HashObject);
    t.Graphics = o, __reflect(o.prototype, "egret.Graphics")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = Math.PI,
        i = 2 * e,
        r = e / 180,
        n = [],
        a = function(a) {
            function o(t, e, i, r, n, o) {
                void 0 === t && (t = 1), void 0 === e && (e = 0), void 0 === i && (i = 0), void 0 === r && (r = 1), void 0 === n && (n = 0), void 0 === o && (o = 0);
                var s = a.call(this) || this;
                return s.a = t, s.b = e, s.c = i, s.d = r, s.tx = n, s.ty = o, s
            }
            return __extends(o, a), o.release = function(t) {
                t && n.push(t)
            }, o.create = function() {
                var t = n.pop();
                return t || (t = new o), t
            }, o.prototype.clone = function() {
                return new o(this.a, this.b, this.c, this.d, this.tx, this.ty)
            }, o.prototype.concat = function(t) {
                var e = this.a * t.a,
                    i = 0,
                    r = 0,
                    n = this.d * t.d,
                    a = this.tx * t.a + t.tx,
                    o = this.ty * t.d + t.ty;
                (0 !== this.b || 0 !== this.c || 0 !== t.b || 0 !== t.c) && (e += this.b * t.c, n += this.c * t.b, i += this.a * t.b + this.b * t.d, r += this.c * t.a + this.d * t.c, a += this.ty * t.c, o += this.tx * t.b), this.a = e, this.b = i, this.c = r, this.d = n, this.tx = a, this.ty = o
            }, o.prototype.copyFrom = function(t) {
                return this.a = t.a, this.b = t.b, this.c = t.c, this.d = t.d, this.tx = t.tx, this.ty = t.ty, this
            }, o.prototype.identity = function() {
                this.a = this.d = 1, this.b = this.c = this.tx = this.ty = 0
            }, o.prototype.invert = function() {
                this.$invertInto(this)
            }, o.prototype.$invertInto = function(t) {
                var e = this.a,
                    i = this.b,
                    r = this.c,
                    n = this.d,
                    a = this.tx,
                    o = this.ty;
                if (0 == i && 0 == r) return t.b = t.c = 0, void(0 == e || 0 == n ? t.a = t.d = t.tx = t.ty = 0 : (e = t.a = 1 / e, n = t.d = 1 / n, t.tx = -e * a, t.ty = -n * o));
                var s = e * n - i * r;
                if (0 == s) return void t.identity();
                s = 1 / s;
                var h = t.a = n * s;
                i = t.b = -i * s, r = t.c = -r * s, n = t.d = e * s, t.tx = -(h * a + r * o), t.ty = -(i * a + n * o)
            }, o.prototype.rotate = function(e) {
                if (e = +e, 0 !== e) {
                    e /= r;
                    var i = t.NumberUtils.cos(e),
                        n = t.NumberUtils.sin(e),
                        a = this.a,
                        o = this.b,
                        s = this.c,
                        h = this.d,
                        c = this.tx,
                        l = this.ty;
                    this.a = a * i - o * n, this.b = a * n + o * i, this.c = s * i - h * n, this.d = s * n + h * i, this.tx = c * i - l * n, this.ty = c * n + l * i
                }
            }, o.prototype.scale = function(t, e) {
                1 !== t && (this.a *= t, this.c *= t, this.tx *= t), 1 !== e && (this.b *= e, this.d *= e, this.ty *= e)
            }, o.prototype.setTo = function(t, e, i, r, n, a) {
                return this.a = t, this.b = e, this.c = i, this.d = r, this.tx = n, this.ty = a, this
            }, o.prototype.transformPoint = function(e, i, r) {
                var n = this.a * e + this.c * i + this.tx,
                    a = this.b * e + this.d * i + this.ty;
                return r ? (r.setTo(n, a), r) : new t.Point(n, a)
            }, o.prototype.translate = function(t, e) {
                this.tx += t, this.ty += e
            }, o.prototype.equals = function(t) {
                return this.a == t.a && this.b == t.b && this.c == t.c && this.d == t.d && this.tx == t.tx && this.ty == t.ty
            }, o.prototype.prepend = function(t, e, i, r, n, a) {
                var o = this.tx;
                if (1 != t || 0 != e || 0 != i || 1 != r) {
                    var s = this.a,
                        h = this.c;
                    this.a = s * t + this.b * i, this.b = s * e + this.b * r, this.c = h * t + this.d * i, this.d = h * e + this.d * r
                }
                return this.tx = o * t + this.ty * i + n, this.ty = o * e + this.ty * r + a, this
            }, o.prototype.append = function(t, e, i, r, n, a) {
                var o = this.a,
                    s = this.b,
                    h = this.c,
                    c = this.d;
                return (1 != t || 0 != e || 0 != i || 1 != r) && (this.a = t * o + e * h, this.b = t * s + e * c, this.c = i * o + r * h, this.d = i * s + r * c), this.tx = n * o + a * h + this.tx, this.ty = n * s + a * c + this.ty, this
            }, o.prototype.deltaTransformPoint = function(e) {
                var i = this,
                    r = i.a * e.x + i.c * e.y,
                    n = i.b * e.x + i.d * e.y;
                return new t.Point(r, n)
            }, o.prototype.toString = function() {
                return "(a=" + this.a + ", b=" + this.b + ", c=" + this.c + ", d=" + this.d + ", tx=" + this.tx + ", ty=" + this.ty + ")"
            }, o.prototype.createBox = function(e, i, n, a, o) {
                void 0 === n && (n = 0), void 0 === a && (a = 0), void 0 === o && (o = 0);
                var s = this;
                if (0 !== n) {
                    n /= r;
                    var h = t.NumberUtils.cos(n),
                        c = t.NumberUtils.sin(n);
                    s.a = h * e, s.b = c * i, s.c = -c * e, s.d = h * i
                } else s.a = e, s.b = 0, s.c = 0, s.d = i;
                s.tx = a, s.ty = o
            }, o.prototype.createGradientBox = function(t, e, i, r, n) {
                void 0 === i && (i = 0), void 0 === r && (r = 0), void 0 === n && (n = 0), this.createBox(t / 1638.4, e / 1638.4, i, r + t / 2, n + e / 2)
            }, o.prototype.$transformBounds = function(t) {
                var e = this.a,
                    i = this.b,
                    r = this.c,
                    n = this.d,
                    a = this.tx,
                    o = this.ty,
                    s = t.x,
                    h = t.y,
                    c = s + t.width,
                    l = h + t.height,
                    u = e * s + r * h + a,
                    p = i * s + n * h + o,
                    d = e * c + r * h + a,
                    f = i * c + n * h + o,
                    g = e * c + r * l + a,
                    $ = i * c + n * l + o,
                    y = e * s + r * l + a,
                    v = i * s + n * l + o,
                    b = 0;
                u > d && (b = u, u = d, d = b), g > y && (b = g, g = y, y = b), t.x = Math.floor(g > u ? u : g), t.width = Math.ceil((d > y ? d : y) - t.x), p > f && (b = p, p = f, f = b), $ > v && (b = $, $ = v, v = b), t.y = Math.floor($ > p ? p : $), t.height = Math.ceil((f > v ? f : v) - t.y)
            }, o.prototype.getDeterminant = function() {
                return this.a * this.d - this.b * this.c
            }, o.prototype.$getScaleX = function() {
                var t = this;
                if (0 == t.b) return t.a;
                var e = Math.sqrt(t.a * t.a + t.b * t.b);
                return this.getDeterminant() < 0 ? -e : e
            }, o.prototype.$getScaleY = function() {
                var t = this;
                if (0 == t.c) return t.d;
                var e = Math.sqrt(t.c * t.c + t.d * t.d);
                return this.getDeterminant() < 0 ? -e : e
            }, o.prototype.$getSkewX = function() {
                return this.d < 0 ? Math.atan2(this.d, this.c) + e / 2 : Math.atan2(this.d, this.c) - e / 2
            }, o.prototype.$getSkewY = function() {
                return this.a < 0 ? Math.atan2(this.b, this.a) - e : Math.atan2(this.b, this.a)
            }, o.prototype.$updateScaleAndRotation = function(e, n, a, o) {
                if (!(0 != a && a != i || 0 != o && o != i)) return this.a = e, this.b = this.c = 0, void(this.d = n);
                a /= r, o /= r;
                var s = t.NumberUtils.cos(a),
                    h = t.NumberUtils.sin(a);
                a == o ? (this.a = s * e, this.b = h * e) : (this.a = t.NumberUtils.cos(o) * e, this.b = t.NumberUtils.sin(o) * e), this.c = -h * n, this.d = s * n
            }, o.prototype.$preMultiplyInto = function(t, e) {
                var i = t.a * this.a,
                    r = 0,
                    n = 0,
                    a = t.d * this.d,
                    o = t.tx * this.a + this.tx,
                    s = t.ty * this.d + this.ty;
                (0 !== t.b || 0 !== t.c || 0 !== this.b || 0 !== this.c) && (i += t.b * this.c, a += t.c * this.b, r += t.a * this.b + t.b * this.d, n += t.c * this.a + t.d * this.c, o += t.ty * this.c, s += t.tx * this.b), e.a = i, e.b = r, e.c = n, e.d = a, e.tx = o, e.ty = s
            }, o
        }(t.HashObject);
    t.Matrix = a, __reflect(a.prototype, "egret.Matrix"), t.$TempMatrix = new a
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = [],
        i = function(i) {
            function r(t, e, r, n) {
                void 0 === t && (t = 0), void 0 === e && (e = 0), void 0 === r && (r = 0), void 0 === n && (n = 0);
                var a = i.call(this) || this;
                return a.x = t, a.y = e, a.width = r, a.height = n, a
            }
            return __extends(r, i), r.release = function(t) {
                t && e.push(t)
            }, r.create = function() {
                var t = e.pop();
                return t || (t = new r), t
            }, Object.defineProperty(r.prototype, "right", {
                get: function() {
                    return this.x + this.width
                },
                set: function(t) {
                    this.width = t - this.x
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "bottom", {
                get: function() {
                    return this.y + this.height
                },
                set: function(t) {
                    this.height = t - this.y
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "left", {
                get: function() {
                    return this.x
                },
                set: function(t) {
                    this.width += this.x - t, this.x = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "top", {
                get: function() {
                    return this.y
                },
                set: function(t) {
                    this.height += this.y - t, this.y = t
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "topLeft", {
                get: function() {
                    return new t.Point(this.left, this.top)
                },
                set: function(t) {
                    this.top = t.y, this.left = t.x
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(r.prototype, "bottomRight", {
                get: function() {
                    return new t.Point(this.right, this.bottom)
                },
                set: function(t) {
                    this.bottom = t.y, this.right = t.x
                },
                enumerable: !0,
                configurable: !0
            }), r.prototype.copyFrom = function(t) {
                return this.x = t.x, this.y = t.y, this.width = t.width, this.height = t.height, this
            }, r.prototype.setTo = function(t, e, i, r) {
                return this.x = t, this.y = e, this.width = i, this.height = r, this
            }, r.prototype.contains = function(t, e) {
                return this.x <= t && this.x + this.width >= t && this.y <= e && this.y + this.height >= e
            }, r.prototype.intersection = function(t) {
                return this.clone().$intersectInPlace(t)
            }, r.prototype.inflate = function(t, e) {
                this.x -= t, this.width += 2 * t, this.y -= e, this.height += 2 * e
            }, r.prototype.$intersectInPlace = function(t) {
                var e = this.x,
                    i = this.y,
                    r = t.x,
                    n = t.y,
                    a = Math.max(e, r),
                    o = Math.min(e + this.width, r + t.width);
                if (o >= a) {
                    var s = Math.max(i, n),
                        h = Math.min(i + this.height, n + t.height);
                    if (h >= s) return this.setTo(a, s, o - a, h - s), this
                }
                return this.setEmpty(), this
            }, r.prototype.intersects = function(t) {
                return Math.max(this.x, t.x) <= Math.min(this.right, t.right) && Math.max(this.y, t.y) <= Math.min(this.bottom, t.bottom)
            }, r.prototype.isEmpty = function() {
                return this.width <= 0 || this.height <= 0
            }, r.prototype.setEmpty = function() {
                this.x = 0, this.y = 0, this.width = 0, this.height = 0
            }, r.prototype.clone = function() {
                return new r(this.x, this.y, this.width, this.height)
            }, r.prototype.containsPoint = function(t) {
                return this.x <= t.x && this.x + this.width > t.x && this.y <= t.y && this.y + this.height > t.y ? !0 : !1
            }, r.prototype.containsRect = function(t) {
                var e = t.x + t.width,
                    i = t.y + t.height,
                    r = this.x + this.width,
                    n = this.y + this.height;
                return t.x >= this.x && t.x < r && t.y >= this.y && t.y < n && e > this.x && r >= e && i > this.y && n >= i
            }, r.prototype.equals = function(t) {
                return this === t ? !0 : this.x === t.x && this.y === t.y && this.width === t.width && this.height === t.height
            }, r.prototype.inflatePoint = function(t) {
                this.inflate(t.x, t.y)
            }, r.prototype.offset = function(t, e) {
                this.x += t, this.y += e
            }, r.prototype.offsetPoint = function(t) {
                this.offset(t.x, t.y)
            }, r.prototype.toString = function() {
                return "(x=" + this.x + ", y=" + this.y + ", width=" + this.width + ", height=" + this.height + ")"
            }, r.prototype.union = function(t) {
                var e = this.clone();
                if (t.isEmpty()) return e;
                if (e.isEmpty()) return e.copyFrom(t), e;
                var i = Math.min(e.x, t.x),
                    r = Math.min(e.y, t.y);
                return e.setTo(i, r, Math.max(e.right, t.right) - i, Math.max(e.bottom, t.bottom) - r), e
            }, r.prototype.$getBaseWidth = function(t) {
                var e = Math.abs(Math.cos(t)),
                    i = Math.abs(Math.sin(t));
                return e * this.width + i * this.height
            }, r.prototype.$getBaseHeight = function(t) {
                var e = Math.abs(Math.cos(t)),
                    i = Math.abs(Math.sin(t));
                return i * this.width + e * this.height
            }, r
        }(t.HashObject);
    t.Rectangle = i, __reflect(i.prototype, "egret.Rectangle"), t.$TempRectangle = new i
}(egret || (egret = {}));
var egret;
! function(t) {
    t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.en_US = t.$locale_strings.en_US || {};
    var e = t.$locale_strings.en_US;
    e[1001] = "Could not find Egret entry class: {0}。", e[1002] = "Egret entry class '{0}' must inherit from egret.DisplayObject.", e[1003] = "Parameter {0} must be non-null.", e[1004] = "An object cannot be added as a child to one of it's children (or children's children, etc.).", e[1005] = "An object cannot be added as a child of itself.", e[1006] = "The supplied DisplayObject must be a child of the caller.", e[1007] = "An index specified for a parameter was out of range.", e[1008] = "Instantiate singleton error，singleton class {0} can not create multiple instances.", e[1009] = 'the Class {0} cannot use the property "{1}"', e[1010] = 'the property "{1}" of the Class "{0}" is readonly', e[1011] = "Stream Error. URL: {0}", e[1012] = "The type of parameter {0} must be Class.", e[1013] = "Variable assignment is NaN, please see the code!", e[1014] = 'the constant "{1}" of the Class "{0}" is read-only', e[1015] = "xml not found!", e[1016] = "{0}has been obsoleted", e[1017] = "The format of JSON file is incorrect: {0}\ndata: {1}", e[1018] = "the scale9Grid is not correct", e[1019] = "Network ab:{0}", e[1020] = "Cannot initialize Shader", e[1021] = "Current browser does not support webgl", e[1022] = "{0} ArgumentError", e[1023] = "This method is not available in the ScrollView!", e[1025] = "end of the file", e[1026] = "! EncodingError The code point {0} could not be encoded.", e[1027] = "DecodingError", e[1028] = ". called injection is not configured rule: {0}, please specify configuration during its initial years of injection rule, and then call the corresponding single case.", e[1029] = "Function.prototype.bind - what is trying to be bound is not callable", e[1033] = "Photos can not be used across domains toDataURL to convert base64", e[1034] = 'Music file decoding failed: "{0}", please use the standard conversion tool reconversion under mp3.', e[1035] = "Native does not support this feature!", e[1036] = "Sound has stopped, please recall Sound.play () to play the sound!", e[1037] = "Non-load the correct blob!", e[1038] = "XML format error!", e[1039] = "Cross domains pictures can not get pixel information!", e[1040] = "hitTestPoint can not detect crossOrigin images! Please check if the display object has crossOrigin elements.", e[1041] = "{0} is deprecated, please use {1} replace", e[1042] = "The parameters passed in the region needs is an integer in drawToTexture method. Otherwise, some browsers will draw abnormal.", e[1043] = "Compile errors in {0}, the attribute name: {1}, the attribute value: {2}.", e[1044] = "The current version of the Runtime does not support video playback, please use the latest version", e[1045] = "The resource url is not found", e[1046] = "BitmapText no corresponding characters: {0}, please check the configuration file", e[1047] = "egret.localStorage.setItem save failed,key={0}&value={1}", e[1048] = "Video loading failed", e[1049] = "In the absence of sound is not allowed to play after loading", e[1050] = "ExternalInterface calls the method without js registration: {0}", e[1051] = "runtime only support webgl render mode", e[1052] = "network request timeout{0}", e[3e3] = "Theme configuration file failed to load: {0}", e[3001] = "Cannot find the skin name which is configured in Theme: {0}", e[3002] = 'Index:"{0}" is out of the collection element index range', e[3003] = "Cannot be available in this component. If this component is container, please continue to use", e[3004] = "addChild(){0}addElement() replace", e[3005] = "addChildAt(){0}addElementAt() replace", e[3006] = "removeChild(){0}removeElement() replace", e[3007] = "removeChildAt(){0}removeElementAt() replace", e[3008] = "setChildIndex(){0}setElementIndex() replace", e[3009] = "swapChildren(){0}swapElements() replace", e[3010] = "swapChildrenAt(){0}swapElementsAt() replace", e[3011] = 'Index:"{0}" is out of the visual element index range', e[3012] = "This method is not available in Scroller component!", e[3013] = "UIStage is GUI root container, and only one such instant is in the display list！", e[3014] = "set fullscreen error", e[3100] = "Current browser does not support WebSocket", e[3101] = "Please connect Socket firstly", e[3102] = "Please set the type of binary type", e[3200] = "getResByUrl must be called after loadConfig", e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)", e[4001] = "Abstract class can not be instantiated!", e[4002] = "Unnamed data!", e[4003] = "Nonsupport version!", e[4500] = "The platform does not support {0} adapter mode and has been automatically replaced with {1} mode, please modify your code adapter logic"
}(egret || (egret = {}));
var egret;
! function(t) {
    t.JointStyle = {
        BEVEL: "bevel",
        MITER: "miter",
        ROUND: "round"
    }
}(egret || (egret = {}));
var egret;
! function(t) {
    t.$locale_strings = t.$locale_strings || {}, t.$locale_strings.zh_CN = t.$locale_strings.zh_CN || {};
    var e = t.$locale_strings.zh_CN;
    e[1001] = "找不到Egret入口类: {0}。", e[1002] = "Egret入口类 {0} 必须继承自egret.DisplayObject。", e[1003] = "参数 {0} 不能为 null。", e[1004] = "无法将对象添加为它的一个子对象（或子对象的子对象等）的子对象。", e[1005] = "不能将对象添加为其自身的子对象。", e[1006] = "提供的 DisplayObject 必须是调用者的子级。", e[1007] = "为参数指定的索引不在范围内。", e[1008] = "实例化单例出错，不允许实例化多个 {0} 对象。", e[1009] = "类 {0} 不可以使用属性 {1}", e[1010] = "类 {0} 属性 {1} 是只读的", e[1011] = "流错误。URL: {0}", e[1012] = "参数 {0} 的类型必须为 Class。", e[1013] = "变量赋值为NaN，请查看代码！", e[1014] = "类 {0} 常量 {1} 是只读的", e[1015] = "xml not found!", e[1016] = "{0}已经废弃", e[1017] = "JSON文件格式不正确: {0}\ndata: {1}", e[1018] = "9宫格设置错误", e[1019] = "网络异常:{0}", e[1020] = "无法初始化着色器", e[1021] = "当前浏览器不支持webgl", e[1022] = "{0} ArgumentError", e[1023] = "此方法在ScrollView内不可用!", e[1025] = "遇到文件尾", e[1026] = "EncodingError! The code point {0} could not be encoded.", e[1027] = "DecodingError", e[1028] = "调用了未配置的注入规则:{0}。 请先在项目初始化里配置指定的注入规则，再调用对应单例。", e[1029] = "Function.prototype.bind - what is trying to be bound is not callable", e[1033] = "跨域图片不可以使用toDataURL来转换成base64", e[1034] = '音乐文件解码失败："{0}"，请使用标准的转换工具重新转换下mp3。', e[1035] = "Native 下暂未实现此功能！", e[1036] = "声音已停止，请重新调用 Sound.play() 来播放声音！", e[1037] = "非正确的blob加载！", e[1038] = "XML 格式错误!", e[1039] = "跨域图片不能获取像素信息!", e[1040] = "hitTestPoint 不能对跨域图片进行检测! 请检查该显示对象内是否含有跨域元素", e[1041] = "{0} 已废弃,请使用 {1} 代替", e[1042] = "drawToTexture方法传入的区域各个参数需要为整数,否则某些浏览器绘制会出现异常", e[1043] = "{0} 中存在编译错误，属性名 : {1}，属性值 : {2}", e[1044] = "当前的 runtime 版本不支持视频播放,请使用最新的版本", e[1045] = "没有设置要加载的资源地址", e[1046] = "BitmapText 找不到对应字符:{0}，请检查配置文件", e[1047] = "egret.localStorage.setItem保存失败,key={0}&value={1}", e[1048] = "视频加载失败", e[1049] = "声音在没有加载完之前不允许播放", e[1050] = "ExternalInterface调用了js没有注册的方法: {0}", e[1051] = "runtime 只支持 webgl 渲染模式", e[1052] = "网络请求超时:{0}", e[3e3] = "主题配置文件加载失败: {0}", e[3001] = "找不到主题中所配置的皮肤类名: {0}", e[3002] = '索引:"{0}"超出集合元素索引范围', e[3003] = "在此组件中不可用，若此组件为容器类，请使用", e[3004] = "addChild(){0}addElement()代替", e[3005] = "addChildAt(){0}addElementAt()代替", e[3006] = "removeChild(){0}removeElement()代替", e[3007] = "removeChildAt(){0}removeElementAt()代替", e[3008] = "setChildIndex(){0}setElementIndex()代替", e[3009] = "swapChildren(){0}swapElements()代替", e[3010] = "swapChildrenAt(){0}swapElementsAt()代替", e[3011] = '索引:"{0}"超出可视元素索引范围', e[3012] = "此方法在Scroller组件内不可用!", e[3013] = "UIStage是GUI根容器，只能有一个此实例在显示列表中！", e[3014] = "设置全屏模式失败", e[3100] = "当前浏览器不支持WebSocket", e[3101] = "请先连接WebSocket", e[3102] = "请先设置type为二进制类型", e[3200] = "getResByUrl 必须在 loadConfig 之后调用", e[4e3] = "An Bone cannot be added as a child to itself or one of its children (or children's children, etc.)", e[4001] = "Abstract class can not be instantiated!", e[4002] = "Unnamed data!", e[4003] = "Nonsupport version!", e[4500] = "该平台不支持 {0} 适配模式，已经自动替换为 {1} 模式，请修改您的代码适配逻辑"
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {}(e = t.localStorage || (t.localStorage = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        function e(t) {
            r.indexOf(t) < 0 && r.push(t)
        }

        function i(t) {
            var e = r.indexOf(t);
            return e >= 0 ? (r.splice(e, 1), !0) : !1
        }
        var r = [];
        t.$pushSoundChannel = e, t.$popSoundChannel = i
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {})),
function(t) {}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        t.GET = "GET", t.POST = "POST"
    }(e = t.HttpMethod || (t.HttpMethod = {}))
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.TEXT = "text", t.ARRAY_BUFFER = "arraybuffer", t
    }();
    t.HttpResponseType = e, __reflect(e.prototype, "egret.HttpResponseType")
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = function(i) {
            function r(r) {
                var n = i.call(this) || this;
                return n.isStage = !1, n.$renderNode = new e.BitmapNode, n.renderBuffer = null, n.offsetX = 0, n.offsetY = 0, n.offsetMatrix = new t.Matrix, n.$canvasScaleX = 1, n.$canvasScaleY = 1, n.root = r, n.isStage = r instanceof t.Stage, n
            }
            return __extends(r, i), r.create = function(i) {
                var r = new t.sys.DisplayList(i);
                try {
                    var n = new e.RenderBuffer;
                    r.renderBuffer = n
                } catch (a) {
                    return null
                }
                return r.root = i, r
            }, r.prototype.$getRenderNode = function() {
                return this.$renderNode
            }, r.prototype.setClipRect = function(t, e) {
                t *= r.$canvasScaleX, e *= r.$canvasScaleY, this.renderBuffer.resize(t, e)
            }, r.prototype.drawToSurface = function() {
                var i = 0;
                this.$canvasScaleX = this.offsetMatrix.a = r.$canvasScaleX, this.$canvasScaleY = this.offsetMatrix.d = r.$canvasScaleY, this.isStage || this.changeSurfaceSize();
                var n = this.renderBuffer;
                if (n.clear(), i = e.systemRenderer.render(this.root, n, this.offsetMatrix), !this.isStage) {
                    var a = n.surface,
                        o = this.$renderNode;
                    o.drawData.length = 0;
                    var s = a.width,
                        h = a.height;
                    this.bitmapData ? (this.bitmapData.source = a, this.bitmapData.width = s, this.bitmapData.height = h) : this.bitmapData = new t.BitmapData(a), o.image = this.bitmapData, o.imageWidth = s, o.imageHeight = h, o.drawImage(0, 0, s, h, -this.offsetX, -this.offsetY, s / this.$canvasScaleX, h / this.$canvasScaleY)
                }
                return i
            }, r.prototype.changeSurfaceSize = function() {
                var t = (this.root, this.offsetX),
                    e = this.offsetY,
                    i = this.root.$getOriginalBounds(),
                    r = this.$canvasScaleX,
                    n = this.$canvasScaleY;
                this.offsetX = -i.x, this.offsetY = -i.y, this.offsetMatrix.setTo(this.offsetMatrix.a, 0, 0, this.offsetMatrix.d, this.offsetX, this.offsetY);
                var a = this.renderBuffer,
                    o = Math.max(257, i.width * r),
                    s = Math.max(257, i.height * n);
                (this.offsetX != t || this.offsetY != e || a.surface.width != o || a.surface.height != s) && a.resize(o, s)
            }, r.$setCanvasScale = function(e, i) {
                r.$canvasScaleX = e, r.$canvasScaleY = i, t.nativeRender && egret_native.nrSetCanvasScaleFactor(r.$canvasScaleFactor, e, i)
            }, r.$canvasScaleFactor = 1, r.$canvasScaleX = 1, r.$canvasScaleY = 1, r
        }(t.HashObject);
        e.DisplayList = i, __reflect(i.prototype, "egret.sys.DisplayList")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        function i(t) {
            for (var e = [], i = 0; i < t.length; i++) e.push(t[i]);
            return e
        }
        var r = function(r) {
            function h(e, i, n) {
                var a = r.call(this) || this;
                return a.isPlaying = !1, a.entryClassName = n, a.stage = i, a.screenDisplayList = a.createDisplayList(i, e), a.showFPS = !1, a.showLog = !1, a.stageDisplayList = null, t.nativeRender && (egret_native.rootWebGLBuffer = e), a
            }
            return __extends(h, r), h.prototype.createDisplayList = function(t, i) {
                var r = new e.DisplayList(t);
                return r.renderBuffer = i, t.$displayList = r, r
            }, h.prototype.start = function() {
                !this.isPlaying && this.stage && (e.$TempStage = e.$TempStage || this.stage, this.isPlaying = !0, this.root || this.initialize(), t.ticker.$addPlayer(this))
            }, h.prototype.initialize = function() {
                var e;
                if (this.entryClassName && (e = t.getDefinitionByName(this.entryClassName)), e) {
                    var i = new e;
                    this.root = i, i instanceof t.DisplayObject && this.stage.addChild(i)
                }
            }, h.prototype.stop = function() {
                this.pause(), this.stage = null
            }, h.prototype.pause = function() {
                this.isPlaying && (this.isPlaying = !1, t.ticker.$removePlayer(this))
            }, h.prototype.$render = function(e, i) {
                if (t.nativeRender) return egret_native.updateNativeRender(), void egret_native.nrRender();
                var r = this.stage,
                    a = t.getTimer(),
                    o = r.$displayList.drawToSurface(),
                    s = t.getTimer();
                e && this.showFPS && n.update(o, s - a, i)
            }, h.prototype.updateStageSize = function(e, i) {
                var r = this.stage;
                r.$stageWidth = e, r.$stageHeight = i, t.nativeRender ? egret_native.nrResize(e, i) : (this.screenDisplayList.setClipRect(e, i), this.stageDisplayList && this.stageDisplayList.setClipRect(e, i)), r.dispatchEventWith(t.Event.RESIZE)
            }, h.prototype.displayFPS = function(r, h, c, l) {
                if (h = !!h, h && (t.log = function() {
                        for (var t = arguments.length, r = "", n = 0; t > n; n++) r += arguments[n] + " ";
                        e.$logToFPS(r), console.log.apply(console, i(arguments))
                    }, t.warn = function() {
                        for (var t = arguments.length, r = "", n = 0; t > n; n++) r += arguments[n] + " ";
                        e.$warnToFPS(r), console.warn.apply(console, i(arguments))
                    }, t.error = function() {
                        for (var t = arguments.length, r = "", n = 0; t > n; n++) r += arguments[n] + " ";
                        e.$errorToFPS(r), console.error.apply(console, i(arguments))
                    }), this.showFPS = !!r, this.showLog = h, !n) {
                    n = new FPS(this.stage, r, h, c, l);
                    for (var u = a.length, p = 0; u > p; p++) n.updateInfo(a[p]);
                    a = null;
                    for (var d = o.length, p = 0; d > p; p++) n.updateWarn(o[p]);
                    o = null;
                    for (var f = s.length, p = 0; f > p; p++) n.updateError(s[p]);
                    s = null
                }
            }, h
        }(t.HashObject);
        e.Player = r, __reflect(r.prototype, "egret.sys.Player");
        var n, a = [],
            o = [],
            s = [];
        e.$logToFPS = function(t) {
            return n ? void n.updateInfo(t) : void a.push(t)
        }, e.$warnToFPS = function(t) {
            return n ? void n.updateWarn(t) : void o.push(t)
        }, e.$errorToFPS = function(t) {
            return n ? void n.updateError(t) : void s.push(t)
        };
        var h = function() {
            function e(e, i, r, n, a) {
                this.showFPS = i, this.showLog = r, this.logFilter = n, this.styles = a, this.infoLines = [], this.totalTime = 0, this.totalTick = 0, this.lastTime = 0, this.drawCalls = 0, this.costRender = 0, this.costTicker = 0, this.infoLines = [], this.totalTime = 0, this.totalTick = 0, this.lastTime = 0, this.drawCalls = 0, this.costRender = 0, this.costTicker = 0, this._stage = e, this.showFPS = i, this.showLog = r, this.logFilter = n, this.styles = a, this.fpsDisplay = new t.FPSDisplay(e, i, r, n, a);
                var o;
                try {
                    o = n ? new RegExp(n) : null
                } catch (s) {
                    t.log(s)
                }
                this.filter = function(t) {
                    return o ? o.test(t) : !n || 0 == t.indexOf(n)
                }
            }
            return e.prototype.update = function(e, i, r) {
                var n = t.getTimer();
                if (this.totalTime += n - this.lastTime, this.lastTime = n, this.totalTick++, this.drawCalls += e, this.costRender += i, this.costTicker += r, this.totalTime >= 1e3) {
                    var a = Math.min(Math.ceil(1e3 * this.totalTick / this.totalTime), t.ticker.$frameRate),
                        o = Math.round(this.drawCalls / this.totalTick),
                        s = Math.round(this.costRender / this.totalTick),
                        h = Math.round(this.costTicker / this.totalTick);
                    this.fpsDisplay.update({
                        fps: a,
                        draw: o,
                        costTicker: h,
                        costRender: s
                    }), this.totalTick = 0, this.totalTime = this.totalTime % 1e3, this.drawCalls = 0, this.costRender = 0, this.costTicker = 0
                }
            }, e.prototype.updateInfo = function(t) {
                t && this.showLog && this.filter(t) && this.fpsDisplay.updateInfo(t)
            }, e.prototype.updateWarn = function(t) {
                t && this.showLog && this.filter(t) && (this.fpsDisplay.updateWarn ? this.fpsDisplay.updateWarn(t) : this.fpsDisplay.updateInfo("[Warning]" + t))
            }, e.prototype.updateError = function(t) {
                t && this.showLog && this.filter(t) && (this.fpsDisplay.updateError ? this.fpsDisplay.updateError(t) : this.fpsDisplay.updateInfo("[Error]" + t))
            }, e
        }();
        __reflect(h.prototype, "FPSImpl"), __global.FPS = h, t.warn = function() {
            console.warn.apply(console, i(arguments))
        }, t.error = function() {
            console.error.apply(console, i(arguments))
        }, t.assert = function() {
            console.assert.apply(console, i(arguments))
        }, t.log = function() {
            console.log.apply(console, i(arguments))
        }
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {})),
function(t) {
    if (t.nativeRender = __global.nativeRender, t.nativeRender) {
        var e = egret_native.nrABIVersion,
            i = egret_native.nrMinEgretVersion,
            r = 5;
        if (r > e) {
            t.nativeRender = !1;
            var n = "需要升级微端版本到 0.1.14 才可以开启原生渲染加速";
            t.sys.$warnToFPS(n), t.warn(n)
        } else if (e > r) {
            t.nativeRender = !1;
            var n = "需要升级引擎版本到 " + i + " 才可以开启原生渲染加速";
            t.sys.$warnToFPS(n), t.warn(n)
        }
    }
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i(i) {
            var r = e.call(this, i) || this;
            return r._verticesDirty = !0, r._bounds = new t.Rectangle, r.$renderNode = new t.sys.MeshNode, r
        }
        return __extends(i, e), i.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(12)
        }, i.prototype.setBitmapDataToWasm = function(t) {
            this.$nativeDisplayObject.setBitmapDataToMesh(t)
        }, i.prototype.$updateRenderNode = function() {
            var e = this.$bitmapData;
            if (e) {
                var i = (t.$TextureScaleFactor, this.$renderNode);
                i.smoothing = this.$smoothing, i.image = e, i.imageWidth = this.$sourceWidth, i.imageHeight = this.$sourceHeight;
                var r = isNaN(this.$explicitBitmapWidth) ? this.$textureWidth : this.$explicitBitmapWidth,
                    n = isNaN(this.$explicitBitmapHeight) ? this.$textureHeight : this.$explicitBitmapHeight,
                    a = r / this.$textureWidth,
                    o = n / this.$textureHeight,
                    s = this.$bitmapWidth,
                    h = this.$bitmapHeight;
                i.drawMesh(this.$bitmapX, this.$bitmapY, s, h, this.$offsetX * a, this.$offsetY * o, a * s, o * h)
            }
        }, i.prototype.$updateVertices = function() {
            var e = this;
            if (e._verticesDirty = !0, e.$renderDirty = !0, t.nativeRender) {
                var i = this.$renderNode;
                this.$nativeDisplayObject.setDataToMesh(i.vertices, i.indices, i.uvs)
            } else {
                var r = e.$parent;
                r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                var n = e.$maskedObject;
                n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
            }
        }, i.prototype.$measureContentBounds = function(t) {
            if (this._verticesDirty) {
                this._verticesDirty = !1;
                var e = this.$renderNode,
                    i = e.vertices;
                if (i.length) {
                    this._bounds.setTo(Number.MAX_VALUE, Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE);
                    for (var r = 0, n = i.length; n > r; r += 2) {
                        var a = i[r],
                            o = i[r + 1];
                        this._bounds.x > a && (this._bounds.x = a), this._bounds.width < a && (this._bounds.width = a), this._bounds.y > o && (this._bounds.y = o), this._bounds.height < o && (this._bounds.height = o)
                    }
                    this._bounds.width -= this._bounds.x, this._bounds.height -= this._bounds.y
                } else this._bounds.setTo(0, 0, 0, 0);
                e.bounds.copyFrom(this._bounds)
            }
            t.copyFrom(this._bounds)
        }, i
    }(t.Bitmap);
    t.Mesh = e, __reflect(e.prototype, "egret.Mesh")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = function(e) {
            function i() {
                return e.call(this) || this
            }
            return __extends(i, e), i.prototype.calculateStageSize = function(e, i, r, n, a) {
                var o = i,
                    s = r,
                    h = n,
                    c = a,
                    l = i / h || 0,
                    u = r / c || 0;
                switch (e) {
                    case t.StageScaleMode.EXACT_FIT:
                        break;
                    case t.StageScaleMode.FIXED_HEIGHT:
                        h = Math.round(i / u);
                        break;
                    case t.StageScaleMode.FIXED_WIDTH:
                        c = Math.round(r / l);
                        break;
                    case t.StageScaleMode.NO_BORDER:
                        l > u ? s = Math.round(c * l) : o = Math.round(h * u);
                        break;
                    case t.StageScaleMode.SHOW_ALL:
                        l > u ? o = Math.round(h * u) : s = Math.round(c * l);
                        break;
                    case t.StageScaleMode.FIXED_NARROW:
                        l > u ? h = Math.round(i / u) : c = Math.round(r / l);
                        break;
                    case t.StageScaleMode.FIXED_WIDE:
                        l > u ? c = Math.round(r / l) : h = Math.round(i / u);
                        break;
                    default:
                        h = i, c = r
                }
                return t.Capabilities.runtimeType != t.RuntimeType.WXGAME && (h % 2 != 0 && (h += 1), c % 2 != 0 && (c += 1), o % 2 != 0 && (o += 1), s % 2 != 0 && (s += 1)), {
                    stageWidth: h,
                    stageHeight: c,
                    displayWidth: o,
                    displayHeight: s
                }
            }, i
        }(t.HashObject);
        e.DefaultScreenAdapter = i, __reflect(i.prototype, "egret.sys.DefaultScreenAdapter", ["egret.sys.IScreenAdapter"])
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.NO_SCALE = "noScale", t.SHOW_ALL = "showAll", t.NO_BORDER = "noBorder", t.EXACT_FIT = "exactFit", t.FIXED_WIDTH = "fixedWidth", t.FIXED_HEIGHT = "fixedHeight", t.FIXED_NARROW = "fixedNarrow", t.FIXED_WIDE = "fixedWide", t
    }();
    t.StageScaleMode = e, __reflect(e.prototype, "egret.StageScaleMode")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        e.$START_TIME = 0, e.$invalidateRenderFlag = !1, e.$requestRenderingFlag = !1;
        var i = function() {
            function i() {
                this.playerList = [], this.callBackList = [], this.thisObjectList = [], this.$frameRate = 30, this.lastTimeStamp = 0, this.costEnterFrame = 0, this.isPaused = !1, e.$START_TIME = Date.now(), this.frameDeltaTime = 1e3 / this.$frameRate, this.lastCount = this.frameInterval = Math.round(6e4 / this.$frameRate)
            }
            return i.prototype.$addPlayer = function(t) {
                -1 == this.playerList.indexOf(t) && (this.playerList = this.playerList.concat(), this.playerList.push(t))
            }, i.prototype.$removePlayer = function(t) {
                var e = this.playerList.indexOf(t);
                if (-1 !== e) {
                    this.playerList = this.playerList.concat(), this.playerList.splice(e, 1)
                }
            }, i.prototype.$startTick = function(t, e) {
                var i = this.getTickIndex(t, e); - 1 == i && (this.concatTick(), this.callBackList.push(t), this.thisObjectList.push(e))
            }, i.prototype.$stopTick = function(t, e) {
                var i = this.getTickIndex(t, e); - 1 != i && (this.concatTick(), this.callBackList.splice(i, 1), this.thisObjectList.splice(i, 1))
            }, i.prototype.getTickIndex = function(t, e) {
                for (var i = this.callBackList, r = this.thisObjectList, n = i.length - 1; n >= 0; n--)
                    if (i[n] == t && r[n] == e) return n;
                return -1
            }, i.prototype.concatTick = function() {
                this.callBackList = this.callBackList.concat(), this.thisObjectList = this.thisObjectList.concat()
            }, i.prototype.$setFrameRate = function(t) {
                return 0 >= t ? !1 : this.$frameRate == t ? !1 : (this.$frameRate = t, t > 60 && (t = 60), this.frameDeltaTime = 1e3 / t, this.lastCount = this.frameInterval = Math.round(6e4 / t), !0)
            }, i.prototype.pause = function() {
                this.isPaused = !0
            }, i.prototype.resume = function() {
                this.isPaused = !1
            }, i.prototype.update = function(i) {
                for (var r = t.getTimer(), n = this.callBackList, a = this.thisObjectList, o = n.length, s = e.$requestRenderingFlag, h = t.getTimer(), c = t.lifecycle.contexts, l = 0, u = c; l < u.length; l++) {
                    var p = u[l];
                    p.onUpdate && p.onUpdate()
                }
                if (this.isPaused) return void(this.lastTimeStamp = h);
                this.callLaterAsyncs();
                for (var d = 0; o > d; d++) n[d].call(a[d], h) && (s = !0);
                var f = t.getTimer(),
                    g = h - this.lastTimeStamp;
                if (this.lastTimeStamp = h, g >= this.frameDeltaTime || i) this.lastCount = this.frameInterval;
                else {
                    if (this.lastCount -= 1e3, this.lastCount > 0) return void(s && this.render(!1, this.costEnterFrame + f - r));
                    this.lastCount += this.frameInterval
                }
                this.render(!0, this.costEnterFrame + f - r);
                var $ = t.getTimer();
                this.broadcastEnterFrame();
                var y = t.getTimer();
                this.costEnterFrame = y - $
            }, i.prototype.render = function(t, i) {
                var r = this.playerList,
                    n = r.length;
                if (0 != n) {
                    this.callLaters(), e.$invalidateRenderFlag && (this.broadcastRender(), e.$invalidateRenderFlag = !1);
                    for (var a = 0; n > a; a++) r[a].$render(t, i);
                    e.$requestRenderingFlag = !1
                }
            }, i.prototype.broadcastEnterFrame = function() {
                var e = t.DisplayObject.$enterFrameCallBackList,
                    i = e.length;
                if (0 != i) {
                    e = e.concat();
                    for (var r = 0; i > r; r++) e[r].dispatchEventWith(t.Event.ENTER_FRAME)
                }
            }, i.prototype.broadcastRender = function() {
                var e = t.DisplayObject.$renderCallBackList,
                    i = e.length;
                if (0 != i) {
                    e = e.concat();
                    for (var r = 0; i > r; r++) e[r].dispatchEventWith(t.Event.RENDER)
                }
            }, i.prototype.callLaters = function() {
                var e, i, r;
                if (t.$callLaterFunctionList.length > 0 && (e = t.$callLaterFunctionList, t.$callLaterFunctionList = [], i = t.$callLaterThisList, t.$callLaterThisList = [], r = t.$callLaterArgsList, t.$callLaterArgsList = []), e)
                    for (var n = e.length, a = 0; n > a; a++) {
                        var o = e[a];
                        null != o && o.apply(i[a], r[a])
                    }
            }, i.prototype.callLaterAsyncs = function() {
                if (t.$callAsyncFunctionList.length > 0) {
                    var e = t.$callAsyncFunctionList,
                        i = t.$callAsyncThisList,
                        r = t.$callAsyncArgsList;
                    t.$callAsyncFunctionList = [], t.$callAsyncThisList = [], t.$callAsyncArgsList = [];
                    for (var n = 0; n < e.length; n++) {
                        var a = e[n];
                        null != a && a.apply(i[n], r[n])
                    }
                }
            }, i
        }();
        e.SystemTicker = i, __reflect(i.prototype, "egret.sys.SystemTicker")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {})),
function(t) {
    var e;
    ! function(e) {
        function i(t) {
            var i = new n;
            e.contexts.push(i), t(i)
        }
        e.contexts = [];
        var r = !0,
            n = function() {
                function i() {}
                return i.prototype.pause = function() {
                    r && (r = !1, e.stage.dispatchEvent(new t.Event(t.Event.DEACTIVATE)), e.onPause && e.onPause())
                }, i.prototype.resume = function() {
                    r || (r = !0, e.stage.dispatchEvent(new t.Event(t.Event.ACTIVATE)), e.onResume && e.onResume())
                }, i
            }();
        e.LifecycleContext = n, __reflect(n.prototype, "egret.lifecycle.LifecycleContext"), e.addLifecycleListener = i
    }(e = t.lifecycle || (t.lifecycle = {})), t.ticker = new t.sys.SystemTicker
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = function(e) {
            function i(t) {
                var i = e.call(this) || this;
                return i.maxTouches = 0, i.useTouchesCount = 0, i.touchDownTarget = {}, i.lastTouchX = -1, i.lastTouchY = -1, i.stage = t, i
            }
            return __extends(i, e), i.prototype.$initMaxTouches = function() {
                this.maxTouches = this.stage.$maxTouches
            }, i.prototype.onTouchBegin = function(e, i, r) {
                if (!(this.useTouchesCount >= this.maxTouches)) {
                    this.lastTouchX = e, this.lastTouchY = i;
                    var n = this.findTarget(e, i);
                    null == this.touchDownTarget[r] && (this.touchDownTarget[r] = n, this.useTouchesCount++), t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_BEGIN, !0, !0, e, i, r, !0)
                }
            }, i.prototype.onTouchMove = function(e, i, r) {
                if (null != this.touchDownTarget[r] && (this.lastTouchX != e || this.lastTouchY != i)) {
                    this.lastTouchX = e, this.lastTouchY = i;
                    var n = this.findTarget(e, i);
                    t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_MOVE, !0, !0, e, i, r, !0)
                }
            }, i.prototype.onTouchEnd = function(e, i, r) {
                if (null != this.touchDownTarget[r]) {
                    var n = this.findTarget(e, i),
                        a = this.touchDownTarget[r];
                    delete this.touchDownTarget[r], this.useTouchesCount--, t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_END, !0, !0, e, i, r, !1), a == n ? t.TouchEvent.dispatchTouchEvent(n, t.TouchEvent.TOUCH_TAP, !0, !0, e, i, r, !1) : t.TouchEvent.dispatchTouchEvent(a, t.TouchEvent.TOUCH_RELEASE_OUTSIDE, !0, !0, e, i, r, !1)
                }
            }, i.prototype.findTarget = function(t, e) {
                var i = this.stage.$hitTest(t, e);
                return i || (i = this.stage), i
            }, i
        }(t.HashObject);
        e.TouchHandler = i, __reflect(i.prototype, "egret.sys.TouchHandler")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = function(e) {
            function i() {
                var t = e.call(this) || this;
                return t.image = null, t.smoothing = !0, t.blendMode = null, t.alpha = 0 / 0, t.filter = null, t.rotated = !1, t.type = 1, t
            }
            return __extends(i, e), i.prototype.drawImage = function(t, e, i, r, n, a, o, s) {
                this.drawData.push(t, e, i, r, n, a, o, s), this.renderCount++
            }, i.prototype.cleanBeforeRender = function() {
                e.prototype.cleanBeforeRender.call(this), this.image = null, this.matrix = null, this.blendMode = null, this.alpha = 0 / 0, this.filter = null
            }, i.$updateTextureData = function(e, r, n, a, o, s, h, c, l, u, p, d, f, g, $, y) {
                if (r) {
                    var v = t.$TextureScaleFactor;
                    if (e.smoothing = y, e.image = r, e.imageWidth = f, e.imageHeight = g, $ == t.BitmapFillMode.SCALE) {
                        var b = p / l * v,
                            m = d / u * v;
                        e.drawImage(n, a, o, s, b * h, m * c, b * o, m * s)
                    } else if ($ == t.BitmapFillMode.CLIP) {
                        var x = Math.min(l, p),
                            T = Math.min(u, d),
                            _ = o * v,
                            D = s * v;
                        i.drawClipImage(e, v, n, a, _, D, h, c, x, T)
                    } else
                        for (var _ = o * v, D = s * v, O = 0; p > O; O += l)
                            for (var w = 0; d > w; w += u) {
                                var x = Math.min(p - O, l),
                                    T = Math.min(d - w, u);
                                i.drawClipImage(e, v, n, a, _, D, h, c, x, T, O, w)
                            }
                }
            }, i.$updateTextureDataWithScale9Grid = function(e, i, r, n, a, o, s, h, c, l, u, p, d, f, g, $) {
                e.smoothing = $, e.image = i, e.imageWidth = f, e.imageHeight = g;
                var y = o,
                    v = s;
                p -= l - o * t.$TextureScaleFactor, d -= u - s * t.$TextureScaleFactor;
                var b = r.x - h,
                    m = r.y - c,
                    x = b / t.$TextureScaleFactor,
                    T = m / t.$TextureScaleFactor,
                    _ = r.width / t.$TextureScaleFactor,
                    D = r.height / t.$TextureScaleFactor;
                0 == D && (D = 1, T >= v && T--), 0 == _ && (_ = 1, x >= y && x--);
                var O = n,
                    w = O + x,
                    E = w + _,
                    R = y - x - _,
                    S = a,
                    F = S + T,
                    P = F + D,
                    C = v - T - D,
                    M = R * t.$TextureScaleFactor,
                    j = C * t.$TextureScaleFactor;
                if ((x + R) * t.$TextureScaleFactor > p || (T + C) * t.$TextureScaleFactor > d) return void e.drawImage(n, a, o, s, h, c, p, d);
                var A = h,
                    B = A + b,
                    N = A + (p - M),
                    k = p - b - M,
                    L = c,
                    I = L + m,
                    U = L + d - j,
                    X = d - m - j;
                T > 0 && (x > 0 && e.drawImage(O, S, x, T, A, L, b, m), _ > 0 && e.drawImage(w, S, _, T, B, L, k, m), R > 0 && e.drawImage(E, S, R, T, N, L, M, m)), D > 0 && (x > 0 && e.drawImage(O, F, x, D, A, I, b, X), _ > 0 && e.drawImage(w, F, _, D, B, I, k, X), R > 0 && e.drawImage(E, F, R, D, N, I, M, X)), C > 0 && (x > 0 && e.drawImage(O, P, x, C, A, U, b, j), _ > 0 && e.drawImage(w, P, _, C, B, U, k, j), R > 0 && e.drawImage(E, P, R, C, N, U, M, j))
            }, i.drawClipImage = function(t, e, i, r, n, a, o, s, h, c, l, u) {
                void 0 === l && (l = 0), void 0 === u && (u = 0);
                var p = o + n - h;
                p > 0 && (n -= p), p = s + a - c, p > 0 && (a -= p), t.drawImage(i, r, n / e, a / e, l + o, u + s, n, a)
            }, i
        }(e.RenderNode);
        e.BitmapNode = i, __reflect(i.prototype, "egret.sys.BitmapNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = ["none", "round", "square"],
            r = ["bevel", "miter", "round"],
            n = function(n) {
                function a() {
                    var t = n.call(this) || this;
                    return t.dirtyRender = !0, t.type = 3, t
                }
                return __extends(a, n), a.prototype.beginFill = function(t, i, r) {
                    void 0 === i && (i = 1);
                    var n = new e.FillPath;
                    if (n.fillColor = t, n.fillAlpha = i, r) {
                        var a = this.drawData.lastIndexOf(r);
                        this.drawData.splice(a, 0, n)
                    } else this.drawData.push(n);
                    return this.renderCount++, n
                }, a.prototype.beginGradientFill = function(i, r, n, a, o, s) {
                    var h = new t.Matrix;
                    o ? (h.a = 819.2 * o.a, h.b = 819.2 * o.b, h.c = 819.2 * o.c, h.d = 819.2 * o.d, h.tx = o.tx, h.ty = o.ty) : (h.a = 100, h.d = 100);
                    var c = new e.GradientFillPath;
                    if (c.gradientType = i, c.colors = r, c.alphas = n, c.ratios = a, c.matrix = h, s) {
                        var l = this.drawData.lastIndexOf(s);
                        this.drawData.splice(l, 0, c)
                    } else this.drawData.push(c);
                    return this.renderCount++, c
                }, a.prototype.lineStyle = function(n, a, o, s, h, c, l) {
                    void 0 === o && (o = 1), void 0 === c && (c = 3), void 0 === l && (l = []), -1 == i.indexOf(s) && (s = "round"), -1 == r.indexOf(h) && (h = "round");
                    var u = new e.StrokePath;
                    return u.lineWidth = n, u.lineColor = a, u.lineAlpha = o, u.caps = s || t.CapsStyle.ROUND, u.joints = h, u.miterLimit = c, u.lineDash = l, this.drawData.push(u), this.renderCount++, u
                }, a.prototype.clear = function() {
                    this.drawData.length = 0, this.dirtyRender = !0, this.renderCount = 0
                }, a.prototype.cleanBeforeRender = function() {}, a.prototype.clean = function() {
                    this.$texture && (t.WebGLUtils.deleteWebGLTexture(this.$texture), this.$texture = null, this.dirtyRender = !0)
                }, a
            }(e.RenderNode);
        e.GraphicsNode = n, __reflect(n.prototype, "egret.sys.GraphicsNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 4, e
            }
            return __extends(e, t), e.prototype.addNode = function(t) {
                this.drawData.push(t)
            }, e.prototype.cleanBeforeRender = function() {
                for (var t = this.drawData, e = t.length - 1; e >= 0; e--) t[e].cleanBeforeRender()
            }, e.prototype.$getRenderCount = function() {
                for (var t = 0, e = this.drawData, i = e.length - 1; i >= 0; i--) t += e[i].$getRenderCount();
                return t
            }, e
        }(t.RenderNode);
        t.GroupNode = e, __reflect(e.prototype, "egret.sys.GroupNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = function(e) {
            function i() {
                var i = e.call(this) || this;
                return i.image = null, i.smoothing = !0, i.bounds = new t.Rectangle, i.blendMode = null, i.alpha = 0 / 0, i.filter = null, i.rotated = !1, i.type = 5, i.vertices = [], i.uvs = [], i.indices = [], i
            }
            return __extends(i, e), i.prototype.drawMesh = function(t, e, i, r, n, a, o, s) {
                this.drawData.push(t, e, i, r, n, a, o, s), this.renderCount++
            }, i.prototype.cleanBeforeRender = function() {
                e.prototype.cleanBeforeRender.call(this), this.image = null, this.matrix = null
            }, i
        }(e.RenderNode);
        e.MeshNode = i, __reflect(i.prototype, "egret.sys.MeshNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.image = null, e.smoothing = !0, e.rotated = !1, e.type = 6, e
            }
            return __extends(e, t), e.prototype.drawImage = function(t, e, i, r, n, a, o, s) {
                var h = this;
                h.sourceX = t, h.sourceY = e, h.sourceW = i, h.sourceH = r, h.drawX = n, h.drawY = a, h.drawW = o, h.drawH = s, h.renderCount = 1
            }, e.prototype.cleanBeforeRender = function() {
                t.prototype.cleanBeforeRender.call(this), this.image = null
            }, e
        }(t.RenderNode);
        t.NormalBitmapNode = e, __reflect(e.prototype, "egret.sys.NormalBitmapNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    t.OrientationMode = {
        AUTO: "auto",
        PORTRAIT: "portrait",
        LANDSCAPE: "landscape",
        LANDSCAPE_FLIPPED: "landscapeFlipped"
    }
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(e) {
        var i = function(e) {
            function i() {
                var t = e.call(this) || this;
                return t.textColor = 16777215, t.strokeColor = 0, t.size = 30, t.stroke = 0, t.bold = !1, t.italic = !1, t.fontFamily = "Arial", t.dirtyRender = !0, t.type = 2, t
            }
            return __extends(i, e), i.prototype.drawText = function(t, e, i, r) {
                this.drawData.push(t, e, i, r), this.renderCount++, this.dirtyRender = !0
            }, i.prototype.clean = function() {
                this.$texture && (t.WebGLUtils.deleteWebGLTexture(this.$texture), this.$texture = null, this.dirtyRender = !0)
            }, i.prototype.cleanBeforeRender = function() {
                e.prototype.cleanBeforeRender.call(this), this.dirtyRender = !0
            }, i
        }(e.RenderNode);
        e.TextNode = i, __reflect(i.prototype, "egret.sys.TextNode")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 1, e
            }
            return __extends(e, t), e
        }(t.Path2D);
        t.FillPath = e, __reflect(e.prototype, "egret.sys.FillPath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 2, e
            }
            return __extends(e, t), e
        }(t.Path2D);
        t.GradientFillPath = e, __reflect(e.prototype, "egret.sys.GradientFillPath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            i.$renderBuffer = new t.sys.RenderBuffer;
            var r = new t.BitmapData(i.$renderBuffer.surface);
            return r.$deleteSource = !1, i._setBitmapData(r), i
        }
        return __extends(i, e), i.prototype.drawToTexture = function(e, i, r) {
            if (void 0 === r && (r = 1), i && (0 == i.width || 0 == i.height)) return !1;
            var n = i || e.$getOriginalBounds();
            if (0 == n.width || 0 == n.height) return !1;
            r /= t.$TextureScaleFactor;
            var a = (n.x + n.width) * r,
                o = (n.y + n.height) * r;
            i && (a = n.width * r, o = n.height * r);
            var s = this.$renderBuffer;
            if (!s) return !1;
            if (s.resize(a, o), this.$bitmapData.width = a, this.$bitmapData.height = o, t.nativeRender) {
                egret_native.activateBuffer(this.$renderBuffer);
                var h = !1,
                    c = 0,
                    l = 0,
                    u = 0,
                    p = 0;
                i && (h = !0, c = i.x, l = i.y, u = i.width, p = i.height), egret_native.updateNativeRender(), egret_native.nrRenderDisplayObject(e.$nativeDisplayObject.id, r, h, c, l, u, p), egret_native.activateBuffer(null)
            } else {
                var d = t.Matrix.create();
                d.identity(), d.scale(r, r), i && d.translate(-i.x, -i.y), t.sys.systemRenderer.render(e, s, d, !0), t.Matrix.release(d)
            }
            return this.$initData(0, 0, a, o, 0, 0, a, o, a, o), !0
        }, i.prototype.getPixel32 = function(e, i) {
            var r;
            if (this.$renderBuffer) {
                var n = t.$TextureScaleFactor;
                e = Math.round(e / n), i = Math.round(i / n), r = this.$renderBuffer.getPixels(e, i, 1, 1)
            }
            return r
        }, i.prototype.dispose = function() {
            e.prototype.dispose.call(this), this.$renderBuffer = null
        }, i
    }(t.Texture);
    t.RenderTexture = e, __reflect(e.prototype, "egret.RenderTexture")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        var e = function(t) {
            function e() {
                var e = t.call(this) || this;
                return e.type = 3, e
            }
            return __extends(e, t), e
        }(t.Path2D);
        t.StrokePath = e, __reflect(e.prototype, "egret.sys.StrokePath")
    }(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t, e) {
        var i = null == e.italic ? t.italic : e.italic,
            r = null == e.bold ? t.bold : e.bold,
            n = null == e.size ? t.size : e.size,
            a = e.fontFamily || t.fontFamily,
            o = i ? "italic " : "normal ";
        return o += r ? "bold " : "normal ", o += n + "px " + a
    }

    function i(t, e) {
        var i = t >> 16,
            r = t >> 8 & 255,
            n = 255 & t;
        return "rgba(" + i + "," + r + "," + n + "," + e + ")"
    }

    function r(e, r, n, a, o, s) {
        var h;
        h = r == t.GradientType.LINEAR ? e.createLinearGradient(-1, 0, 1, 0) : e.createRadialGradient(0, 0, 0, 0, 0, 1);
        for (var c = n.length, l = 0; c > l; l++) h.addColorStop(o[l] / 255, i(n[l], a[l]));
        return h
    }

    function n(t, e, i) {
        void 0 === i && (i = 0);
        for (var r = 0, n = e.length; n > r; r++) t[r + i] = e[r]
    }

    function a(t, e, i, r) {
        for (var n = r[0], a = r[1], o = r[2], s = r[3], h = r[4], c = r[5], l = r[6], u = r[7], p = r[8], d = r[9], f = r[10], g = r[11], $ = r[12], y = r[13], v = r[14], b = r[15], m = r[16], x = r[17], T = r[18], _ = r[19], D = 0, O = e * i * 4; O > D; D += 4) {
            var w = t[D + 0],
                E = t[D + 1],
                R = t[D + 2],
                S = t[D + 3];
            t[D + 0] = n * w + a * E + o * R + s * S + h, t[D + 1] = c * w + l * E + u * R + p * S + d, t[D + 2] = f * w + g * E + $ * R + y * S + v, t[D + 3] = b * w + m * E + x * R + T * S + _
        }
    }

    function o(t, e, i, r, n) {
        s(t, e, i, r), h(t, e, i, n)
    }

    function s(t, e, i, r) {
        var a;
        a = _ ? new Uint8ClampedArray(4 * e) : new Array(4 * e);
        for (var o = 4 * e, s = 2 * r + 1, h = 0; i > h; h++) {
            for (var c = h * o, l = 0, u = 0, p = 0, d = 0, f = 0, g = 0, $ = 4 * -r, y = 4 * r + 4; y > $; $ += 4) {
                var v = c + $;
                c > v || v >= c + o || (f = t[v + 3], l += t[v + 0] * f, u += t[v + 1] * f, p += t[v + 2] * f, d += f)
            }
            for (var $ = c, y = c + o, b = 0, m = $ - 4 * r, x = $ + 4 * (r + 1); y > $; $ += 4, b += 4, x += 4, m += 4) 0 === d ? (a[b + 0] = 0, a[b + 1] = 0, a[b + 2] = 0, a[b + 3] = 0) : (a[b + 0] = l / d, a[b + 1] = u / d, a[b + 2] = p / d, a[b + 3] = d / s), f = t[x + 3], g = t[m + 3], f || 0 == f ? g || 0 == g ? (l += t[x + 0] * f - t[m + 0] * g, u += t[x + 1] * f - t[m + 1] * g, p += t[x + 2] * f - t[m + 2] * g, d += f - g) : (l += t[x + 0] * f, u += t[x + 1] * f, p += t[x + 2] * f, d += f) : (g || 0 == g) && (l += -t[m + 0] * g, u += -t[m + 1] * g, p += -t[m + 2] * g, d += -g);
            _ ? t.set(a, c) : n(t, a, c)
        }
    }

    function h(t, e, i, r) {
        var n;
        n = _ ? new Uint8ClampedArray(4 * i) : new Array(4 * i);
        for (var a = 4 * e, o = 2 * r + 1, s = 0; e > s; s++) {
            for (var h = 4 * s, c = 0, l = 0, u = 0, p = 0, d = 0, f = 0, g = -r * a, $ = r * a + a; $ > g; g += a) {
                var y = h + g;
                h > y || y >= h + i * a || (d = t[y + 3], c += t[y + 0] * d, l += t[y + 1] * d, u += t[y + 2] * d, p += d)
            }
            for (var g = h, $ = h + i * a, v = 0, b = h - r * a, m = h + (r + 1) * a; $ > g; g += a, v += 4, m += a, b += a) 0 === p ? (n[v + 0] = 0, n[v + 1] = 0, n[v + 2] = 0, n[v + 3] = 0) : (n[v + 0] = c / p, n[v + 1] = l / p, n[v + 2] = u / p, n[v + 3] = p / o), d = t[m + 3], f = t[b + 3], d || 0 == d ? f || 0 == f ? (c += t[m + 0] * d - t[b + 0] * f, l += t[m + 1] * d - t[b + 1] * f, u += t[m + 2] * d - t[b + 2] * f, p += d - f) : (c += t[m + 0] * d, l += t[m + 1] * d, u += t[m + 2] * d, p += d) : (f || 0 == f) && (c += -t[b + 0] * f, l += -t[b + 1] * f, u += -t[b + 2] * f, p += -f);
            for (var x = 4 * s, $ = x + i * a, T = 0; $ > x; x += a, T += 4) t[x + 0] = n[T + 0], t[x + 1] = n[T + 1], t[x + 2] = n[T + 2], t[x + 3] = n[T + 3]
        }
    }

    function c(t, e, i, r, a, s, h, c, f) {
        var g = l(t, r);
        u(g, e, i, h, c), o(g, e, i, a, s), p(g, f), d(g, t), t.set(g), _ ? t.set(g) : n(t, g)
    }

    function l(t, e) {
        e || (e = [0, 0, 0, 0]);
        var i;
        _ ? i = new Uint8ClampedArray(t) : (i = new Array(t.length), n(i, t));
        for (var r = e[0], a = e[1], o = e[2], s = e[3], h = 0, c = i.length; c > h; h += 4) {
            var l = i[h + 3];
            i[h + 0] = r * l, i[h + 1] = a * l, i[h + 2] = o * l, i[h + 3] = s * l
        }
        return i
    }

    function u(t, e, i, r, a) {
        var o, s, h = Math.sin(r) * a | 0,
            c = Math.cos(r) * a | 0;
        if (_) {
            o = new Int32Array(t.buffer), s = new Int32Array(o.length);
            for (var l = 0; i > l; l++) {
                var u = l + h;
                if (!(0 > u || u > i))
                    for (var p = 0; e > p; p++) {
                        var d = p + c;
                        0 > d || d > e || (s[u * e + d] = o[l * e + p])
                    }
            }
            o.set(s)
        } else {
            o = t, s = new Array(o.length);
            for (var l = 0; i > l; l++) {
                var u = l + h;
                if (!(0 > u || u > i))
                    for (var p = 0; e > p; p++) {
                        var d = p + c;
                        0 > d || d > e || (s[4 * (u * e + d) + 0] = o[4 * (l * e + p) + 0], s[4 * (u * e + d) + 1] = o[4 * (l * e + p) + 1], s[4 * (u * e + d) + 2] = o[4 * (l * e + p) + 2], s[4 * (u * e + d) + 3] = o[4 * (l * e + p) + 3])
                    }
            }
            n(o, s)
        }
    }

    function p(t, e) {
        for (var i = 0, r = t.length; r > i; i += 4) t[i + 3] *= e
    }

    function d(t, e) {
        for (var i = 0, r = t.length; r > i; i += 4) {
            var n = t[i + 0],
                a = t[i + 1],
                o = t[i + 2],
                s = t[i + 3] / 255,
                h = e[i + 0],
                c = e[i + 1],
                l = e[i + 2],
                u = e[i + 3] / 255;
            t[i + 0] = h + n * (1 - u), t[i + 1] = c + a * (1 - u), t[i + 2] = l + o * (1 - u), t[i + 3] = 255 * (u + s * (1 - u))
        }
    }

    function f(t, e, i) {
        return t * (1 - i) + e * i
    }

    function g(t, e, i, r, a, o, s, h, c, l, u, p) {
        var d;
        d = _ ? new Uint8ClampedArray(t.length) : new Array(t.length);
        for (var g, $, y = r[3], v = 0, b = 0, m = h * Math.cos(s), x = h * Math.sin(s), T = 7, D = 12, O = 3.141592653589793, w = a / T, E = o / T, R = 0; e > R; R++)
            for (var S = 0; i > S; S++) {
                for (var F = 0, P = S * e * 4 + 4 * R, C = 0, M = 0, j = t[P + 0] / 255, A = t[P + 1] / 255, B = t[P + 2] / 255, N = t[P + 3] / 255, k = 0; 2 * O >= k; k += 2 * O / D) {
                    g = Math.cos(k + F), $ = Math.sin(k + F);
                    for (var L = 0; T > L; L++) {
                        v = L * w * g, b = L * E * $;
                        var I = Math.round(R + v - m),
                            U = Math.round(S + b - x),
                            X = 0;
                        if (I >= e || 0 > I || 0 > U || U >= i) X = 0;
                        else {
                            var H = U * e * 4 + 4 * I;
                            X = t[H + 3] / 255
                        }
                        C += (T - L) * X, M += T - L
                    }
                }
                N = Math.max(N, 1e-4);
                var Y = C / M * c * y * (1 - l) * Math.max(Math.min(p, u), 1 - N),
                    W = (M - C) / M * c * y * l * N;
                N = Math.max(N * u * (1 - p), 1e-4);
                var G = W / (W + N),
                    z = f(j, r[0], G),
                    V = f(A, r[1], G),
                    q = f(B, r[2], G),
                    J = Y / (W + N + Y),
                    K = f(z, r[0], J),
                    Q = f(V, r[1], J),
                    Z = f(q, r[2], J),
                    te = Math.min(N + Y + W, 1);
                d[P + 0] = 255 * K, d[P + 1] = 255 * Q, d[P + 2] = 255 * Z, d[P + 3] = 255 * te
            }
        _ ? t.set(d) : n(t, d)
    }
    var $ = ["source-over", "lighter", "destination-out"],
        y = "source-over",
        v = "#000000",
        b = {
            none: "butt",
            square: "square",
            round: "round"
        },
        m = [],
        x = [],
        T = function() {
            function n() {
                this.nestLevel = 0, this.renderingMask = !1
            }
            return n.prototype.render = function(e, i, r, n) {
                this.nestLevel++;
                var a = i.context;
                a.transform(r.a, r.b, r.c, r.d, 0, 0);
                var o = this.drawDisplayObject(e, a, r.tx, r.ty, !0),
                    s = t.Matrix.create();
                if (r.$invertInto(s), a.transform(s.a, s.b, s.c, s.d, 0, 0), t.Matrix.release(s), this.nestLevel--, 0 === this.nestLevel) {
                    m.length > 6 && (m.length = 6);
                    for (var h = m.length, c = 0; h > c; c++) m[c].resize(0, 0)
                }
                return o
            }, n.prototype.drawDisplayObject = function(e, i, r, n, a) {
                var o, s = 0,
                    h = e.$displayList;
                if (h && !a ? ((e.$cacheDirty || e.$renderDirty || h.$canvasScaleX != t.sys.DisplayList.$canvasScaleX || h.$canvasScaleY != t.sys.DisplayList.$canvasScaleY) && (s += h.drawToSurface()), o = h.$renderNode) : o = e.$renderDirty ? e.$getRenderNode() : e.$renderNode, e.$cacheDirty = !1, o) {
                    switch (s++, i.$offsetX = r, i.$offsetY = n, o.type) {
                        case 1:
                            this.renderBitmap(o, i);
                            break;
                        case 2:
                            this.renderText(o, i);
                            break;
                        case 3:
                            this.renderGraphics(o, i);
                            break;
                        case 4:
                            this.renderGroup(o, i);
                            break;
                        case 5:
                            this.renderMesh(o, i);
                            break;
                        case 6:
                            this.renderNormalBitmap(o, i)
                    }
                    i.$offsetX = 0, i.$offsetY = 0
                }
                if (h && !a) return s;
                var c = e.$children;
                if (c)
                    for (var l = c.length, u = 0; l > u; u++) {
                        var p = c[u],
                            d = void 0,
                            f = void 0;
                        if (p.$useTranslate) {
                            var g = p.$getMatrix();
                            d = r + p.$x, f = n + p.$y, i.save(), i.transform(g.a, g.b, g.c, g.d, d, f), d = -p.$anchorOffsetX, f = -p.$anchorOffsetY
                        } else d = r + p.$x - p.$anchorOffsetX, f = n + p.$y - p.$anchorOffsetY;
                        var $ = void 0;
                        switch (1 != p.$alpha && ($ = i.globalAlpha, i.globalAlpha *= p.$alpha), p.$renderMode) {
                            case 1:
                                break;
                            case 2:
                                s += this.drawWithFilter(p, i, d, f);
                                break;
                            case 3:
                                s += this.drawWithClip(p, i, d, f);
                                break;
                            case 4:
                                s += this.drawWithScrollRect(p, i, d, f);
                                break;
                            default:
                                s += this.drawDisplayObject(p, i, d, f)
                        }
                        p.$useTranslate ? i.restore() : $ && (i.globalAlpha = $)
                    }
                return s
            }, n.prototype.drawWithFilter = function(t, e, i, r) {
                if (t.$children && 0 == t.$children.length && (!t.$renderNode || 0 == t.$renderNode.$getRenderCount())) return 0;
                var n, s = 0,
                    h = t.$filters,
                    l = h.length,
                    u = 0 !== t.$blendMode;
                u && (n = $[t.$blendMode], n || (n = y));
                var p = t.$getOriginalBounds(),
                    d = p.x,
                    f = p.y,
                    v = p.width,
                    b = p.height;
                if (0 >= v || 0 >= b) return s;
                var m = this.createRenderBuffer(v - d, b - f, !0),
                    T = m.context;
                if (s += t.$mask ? this.drawWithClip(t, T, -d, -f) : t.$scrollRect || t.$maskRect ? this.drawWithScrollRect(t, T, -d, -f) : this.drawDisplayObject(t, T, -d, -f), s > 0) {
                    u && (e.globalCompositeOperation = n), s++;
                    for (var _ = T.getImageData(0, 0, m.surface.width, m.surface.height), D = 0; l > D; D++) {
                        var O = h[D];
                        if ("colorTransform" == O.type) a(_.data, m.surface.width, m.surface.height, O.$matrix);
                        else if ("blur" == O.type) o(_.data, m.surface.width, m.surface.height, O.$blurX, O.$blurY);
                        else if ("glow" == O.type) {
                            var w = O.$red,
                                E = O.$green,
                                R = O.$blue,
                                S = O.$alpha;
                            O.$inner || O.$knockout || O.$hideObject ? g(_.data, m.surface.width, m.surface.height, [w / 255, E / 255, R / 255, S], O.$blurX, O.$blurY, O.$angle ? O.$angle / 180 * Math.PI : 0, O.$distance || 0, O.$strength, O.$inner ? 1 : 0, O.$knockout ? 0 : 1, O.$hideObject ? 1 : 0) : c(_.data, m.surface.width, m.surface.height, [w / 255, E / 255, R / 255, S], O.$blurX, O.$blurY, O.$angle ? O.$angle / 180 * Math.PI : 0, O.$distance || 0, O.$strength)
                        } else "custom" == O.type
                    }
                    T.putImageData(_, 0, 0), e.drawImage(m.surface, i + d, r + f), u && (e.globalCompositeOperation = y)
                }
                return x.push(m), s
            }, n.prototype.drawWithClip = function(e, i, r, n) {
                var a, o = 0,
                    s = 0 !== e.$blendMode;
                s && (a = $[e.$blendMode], a || (a = y));
                var h = e.$scrollRect ? e.$scrollRect : e.$maskRect,
                    c = e.$mask;
                if (c) {
                    var l = c.$getMatrix();
                    if (0 == l.a && 0 == l.b || 0 == l.c && 0 == l.d) return o
                }
                if (!(c || e.$children && 0 != e.$children.length)) return h && (i.save(), i.beginPath(), i.rect(h.x + r, h.y + n, h.width, h.height), i.clip()), s && (i.globalCompositeOperation = a), o += this.drawDisplayObject(e, i, r, n), s && (i.globalCompositeOperation = y), h && i.restore(), o;
                if (c) {
                    var u = c.$getRenderNode();
                    if ((!c.$children || 0 == c.$children.length) && u && 3 == u.type && 1 == u.drawData.length && 1 == u.drawData[0].type && 1 == u.drawData[0].fillAlpha) {
                        this.renderingMask = !0, i.save();
                        var p = t.Matrix.create();
                        p.copyFrom(c.$getConcatenatedMatrix()), c.$getConcatenatedMatrixAt(e, p), p.prepend(1, 0, 0, 1, r, n), i.transform(p.a, p.b, p.c, p.d, p.tx, p.ty);
                        var d = this.drawDisplayObject(c, i, 0, 0);
                        return this.renderingMask = !1, p.$invertInto(p), i.transform(p.a, p.b, p.c, p.d, p.tx, p.ty), t.Matrix.release(p), h && (i.beginPath(), i.rect(h.x + r, h.y + n, h.width, h.height), i.clip()), d += this.drawDisplayObject(e, i, r, n), i.restore(), d
                    }
                }
                var f = e.$getOriginalBounds(),
                    g = f.x,
                    v = f.y,
                    b = f.width,
                    x = f.height;
                if (0 >= b || 0 >= x) return o;
                var T = this.createRenderBuffer(b, x),
                    _ = T.context;
                if (!_) return o += this.drawDisplayObject(e, i, r, n);
                if (o += this.drawDisplayObject(e, _, -g, -v), c) {
                    var u = c.$getRenderNode(),
                        p = t.Matrix.create();
                    if (p.copyFrom(c.$getConcatenatedMatrix()), c.$getConcatenatedMatrixAt(e, p), p.translate(-g, -v), u && 1 == u.$getRenderCount() || c.$displayList) _.globalCompositeOperation = "destination-in", _.save(), _.setTransform(p.a, p.b, p.c, p.d, p.tx, p.ty), o += this.drawDisplayObject(c, _, 0, 0), _.restore();
                    else {
                        var D = this.createRenderBuffer(b, x),
                            O = D.context;
                        O.setTransform(p.a, p.b, p.c, p.d, p.tx, p.ty), o += this.drawDisplayObject(c, O, 0, 0), _.globalCompositeOperation = "destination-in", _.drawImage(D.surface, 0, 0), m.push(D)
                    }
                    t.Matrix.release(p)
                }
                return o > 0 && (o++, s && (i.globalCompositeOperation = a), h && (i.save(), i.beginPath(), i.rect(h.x + r, h.y + n, h.width, h.height), i.clip()), i.drawImage(T.surface, r + g, n + v), h && i.restore(), s && (i.globalCompositeOperation = y)), m.push(T), o
            }, n.prototype.drawWithScrollRect = function(t, e, i, r) {
                var n = 0,
                    a = t.$scrollRect ? t.$scrollRect : t.$maskRect;
                return a.isEmpty() ? n : (t.$scrollRect && (i -= a.x, r -= a.y), e.save(), e.beginPath(), e.rect(a.x + i, a.y + r, a.width, a.height), e.clip(), n += this.drawDisplayObject(t, e, i, r), e.restore(), n)
            }, n.prototype.drawNodeToBuffer = function(t, e, i, r) {
                var n = e.context;
                n.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty), this.renderNode(t, n, r)
            }, n.prototype.drawDisplayToBuffer = function(t, e, i) {
                var r = e.context;
                i && r.setTransform(i.a, i.b, i.c, i.d, i.tx, i.ty);
                var n;
                n = t.$renderDirty ? t.$getRenderNode() : t.$renderNode;
                var a = 0;
                if (n) switch (a++, n.type) {
                    case 1:
                        this.renderBitmap(n, r);
                        break;
                    case 2:
                        this.renderText(n, r);
                        break;
                    case 3:
                        this.renderGraphics(n, r);
                        break;
                    case 4:
                        this.renderGroup(n, r);
                        break;
                    case 5:
                        this.renderMesh(n, r);
                        break;
                    case 6:
                        this.renderNormalBitmap(n, r)
                }
                var o = t.$children;
                if (o)
                    for (var s = o.length, h = 0; s > h; h++) {
                        var c = o[h];
                        switch (c.$renderMode) {
                            case 1:
                                break;
                            case 2:
                                a += this.drawWithFilter(c, r, 0, 0);
                                break;
                            case 3:
                                a += this.drawWithClip(c, r, 0, 0);
                                break;
                            case 4:
                                a += this.drawWithScrollRect(c, r, 0, 0);
                                break;
                            default:
                                a += this.drawDisplayObject(c, r, 0, 0)
                        }
                    }
                return a
            }, n.prototype.renderNode = function(t, e, i) {
                var r = 0;
                switch (t.type) {
                    case 1:
                        r = this.renderBitmap(t, e);
                        break;
                    case 2:
                        r = 1, this.renderText(t, e);
                        break;
                    case 3:
                        r = this.renderGraphics(t, e, i);
                        break;
                    case 4:
                        r = this.renderGroup(t, e);
                        break;
                    case 5:
                        r = this.renderMesh(t, e);
                        break;
                    case 6:
                        r += this.renderNormalBitmap(t, e)
                }
                return r
            }, n.prototype.renderNormalBitmap = function(t, e) {
                var i = t.image;
                if (!i || !i.source) return 0;
                if (e.$imageSmoothingEnabled != t.smoothing && (e.imageSmoothingEnabled = t.smoothing, e.$imageSmoothingEnabled = t.smoothing), t.rotated) {
                    var r = t.sourceX,
                        n = t.sourceY,
                        a = t.sourceW,
                        o = t.sourceH,
                        s = t.drawX,
                        h = t.drawY,
                        c = t.drawW,
                        l = t.drawH;
                    e.save(), e.transform(0, -1, 1, 0, 0, l), e.drawImage(i.source, r, n, o, a, s + e.$offsetX, h + e.$offsetY, l, c), e.restore()
                } else e.drawImage(i.source, t.sourceX, t.sourceY, t.sourceW, t.sourceH, t.drawX + e.$offsetX, t.drawY + e.$offsetY, t.drawW, t.drawH);
                return 1
            }, n.prototype.renderBitmap = function(t, e) {
                var i = t.image;
                if (!i || !i.source) return 0;
                e.$imageSmoothingEnabled != t.smoothing && (e.imageSmoothingEnabled = t.smoothing, e.$imageSmoothingEnabled = t.smoothing);
                var r, n, o = t.drawData,
                    s = o.length,
                    h = 0,
                    c = t.matrix,
                    l = t.blendMode,
                    u = t.alpha,
                    p = !1;
                c && (e.save(), p = !0, (0 != e.$offsetX || 0 != e.$offsetY) && (e.translate(e.$offsetX, e.$offsetY), r = e.$offsetX, n = e.$offsetY, e.$offsetX = e.$offsetY = 0), e.transform(c.a, c.b, c.c, c.d, c.tx, c.ty)), l && (e.globalCompositeOperation = $[l]);
                var d;
                u == u && (d = e.globalAlpha, e.globalAlpha *= u);
                var f = 0,
                    g = t.filter;
                if (g && 8 == s) {
                    var v = o[0],
                        b = o[1],
                        x = o[2],
                        T = o[3],
                        _ = o[4],
                        D = o[5],
                        O = o[6],
                        w = o[7];
                    t.rotated && (x = o[3], T = o[2], O = o[7], w = o[6]);
                    var E = this.createRenderBuffer(O, w),
                        R = E.context;
                    f++, t.rotated && e.transform(0, -1, 1, 0, 0, O), R.drawImage(i.source, v, b, x, T, 0, 0, O, w), f++;
                    var S = R.getImageData(0, 0, O, w);
                    a(S.data, O, w, g.$matrix), R.putImageData(S, 0, 0), e.drawImage(E.surface, 0, 0, O, w, _ + e.$offsetX, D + e.$offsetY, O, w), m.push(E)
                } else
                    for (; s > h;)
                        if (f++, t.rotated) {
                            var v = o[h++],
                                b = o[h++],
                                T = o[h++],
                                x = o[h++],
                                F = o[h++],
                                P = o[h++],
                                w = o[h++],
                                O = o[h++];
                            e.save(), e.transform(0, -1, 1, 0, 0, O), e.drawImage(i.source, v, b, x, T, F + e.$offsetX, P + e.$offsetY, O, w), e.restore()
                        } else e.drawImage(i.source, o[h++], o[h++], o[h++], o[h++], o[h++] + e.$offsetX, o[h++] + e.$offsetY, o[h++], o[h++]);
                return p ? e.restore() : (l && (e.globalCompositeOperation = y), u == u && (e.globalAlpha = d)), r && (e.$offsetX = r), n && (e.$offsetY = n), f
            }, n.prototype.renderMesh = function(t, e) {
                return 0
            }, n.prototype.renderText = function(i, r) {
                r.textAlign = "left", r.textBaseline = "middle", r.lineJoin = "round";
                for (var n = i.drawData, a = n.length, o = 0; a > o;) {
                    var s = n[o++],
                        h = n[o++],
                        c = n[o++],
                        l = n[o++];
                    r.font = e(i, l);
                    var u = null == l.textColor ? i.textColor : l.textColor,
                        p = null == l.strokeColor ? i.strokeColor : l.strokeColor,
                        d = null == l.stroke ? i.stroke : l.stroke;
                    r.fillStyle = t.toColorString(u), r.strokeStyle = t.toColorString(p), d && (r.lineWidth = 2 * d, r.strokeText(c, s + r.$offsetX, h + r.$offsetY)), r.fillText(c, s + r.$offsetX, h + r.$offsetY)
                }
            }, n.prototype.renderGraphics = function(t, e, n) {
                var a = t.drawData,
                    o = a.length;
                n = !!n;
                for (var s = 0; o > s; s++) {
                    var h = a[s];
                    switch (h.type) {
                        case 1:
                            var c = h;
                            e.fillStyle = n ? v : i(c.fillColor, c.fillAlpha), this.renderPath(h, e), this.renderingMask ? e.clip() : e.fill();
                            break;
                        case 2:
                            var l = h;
                            e.fillStyle = n ? v : r(e, l.gradientType, l.colors, l.alphas, l.ratios, l.matrix), e.save();
                            var u = l.matrix;
                            this.renderPath(h, e), e.transform(u.a, u.b, u.c, u.d, u.tx, u.ty), e.fill(), e.restore();
                            break;
                        case 3:
                            var p = h,
                                d = p.lineWidth;
                            e.lineWidth = d, e.strokeStyle = n ? v : i(p.lineColor, p.lineAlpha), e.lineCap = b[p.caps], e.lineJoin = p.joints, e.miterLimit = p.miterLimit, e.setLineDash && e.setLineDash(p.lineDash);
                            var f = 1 === d || 3 === d;
                            f && e.translate(.5, .5), this.renderPath(h, e), e.stroke(), f && e.translate(-.5, -.5)
                    }
                }
                return 0 == o ? 0 : 1
            }, n.prototype.renderPath = function(t, e) {
                e.beginPath();
                for (var i = t.$data, r = t.$commands, n = r.length, a = 0, o = 0; n > o; o++) {
                    var s = r[o];
                    switch (s) {
                        case 4:
                            e.bezierCurveTo(i[a++] + e.$offsetX, i[a++] + e.$offsetY, i[a++] + e.$offsetX, i[a++] + e.$offsetY, i[a++] + e.$offsetX, i[a++] + e.$offsetY);
                            break;
                        case 3:
                            e.quadraticCurveTo(i[a++] + e.$offsetX, i[a++] + e.$offsetY, i[a++] + e.$offsetX, i[a++] + e.$offsetY);
                            break;
                        case 2:
                            e.lineTo(i[a++] + e.$offsetX, i[a++] + e.$offsetY);
                            break;
                        case 1:
                            e.moveTo(i[a++] + e.$offsetX, i[a++] + e.$offsetY)
                    }
                }
            }, n.prototype.renderGroup = function(t, e) {
                var i, r, n = t.matrix,
                    a = !1;
                n && (e.save(), a = !0, (0 != e.$offsetX || 0 != e.$offsetY) && (e.translate(e.$offsetX, e.$offsetY), i = e.$offsetX, r = e.$offsetY, e.$offsetX = e.$offsetY = 0), e.transform(n.a, n.b, n.c, n.d, n.tx, n.ty));
                for (var o = 0, s = t.drawData, h = s.length, c = 0; h > c; c++) {
                    var l = s[c];
                    o += this.renderNode(l, e)
                }
                return a && e.restore(), i && (e.$offsetX = i), r && (e.$offsetY = r), o
            }, n.prototype.createRenderBuffer = function(e, i, r) {
                var n = r ? x.pop() : m.pop();
                return n ? n.resize(e, i, !0) : n = new t.sys.CanvasRenderBuffer(e, i), n
            }, n
        }();
    t.CanvasRenderer = T, __reflect(T.prototype, "egret.CanvasRenderer"), t.getFontString = e, t.getRGBAString = i;
    var _ = !1;
    try {
        _ = void 0 !== typeof Uint8ClampedArray
    } catch (D) {}
}(egret || (egret = {}));
var egret;
! function(t) {
    t.DeviceOrientation = null
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {
        t.WEB = "web", t.NATIVE = "native", t.RUNTIME2 = "runtime2", t.WXGAME = "wxgame", t.BAIDUGAME = "baidugame", t.QGAME = "qgame"
    }(e = t.RuntimeType || (t.RuntimeType = {}));
    var i = function() {
        function e() {}
        return e.language = "zh-CN", e.os = "Unknown", e.runtimeType = t.RuntimeType.WEB, e.engineVersion = "5.2.17", e.renderMode = "Unknown", e.boundingClientWidth = 0, e.boundingClientHeight = 0, e
    }();
    t.Capabilities = i, __reflect(i.prototype, "egret.Capabilities")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$graphics = new t.Graphics, i.$graphics.$setTarget(i), i
        }
        return __extends(i, e), i.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(8)
        }, Object.defineProperty(i.prototype, "graphics", {
            get: function() {
                return this.$graphics
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$measureContentBounds = function(t) {
            this.$graphics.$measureContentBounds(t)
        }, i.prototype.$hitTest = function(t, i) {
            var r = e.prototype.$hitTest.call(this, t, i);
            return r == this && (r = this.$graphics.$hitTest(t, i)), r
        }, i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this), this.$graphics && this.$graphics.$onRemoveFromStage()
        }, i
    }(t.DisplayObject);
    t.Shape = e, __reflect(e.prototype, "egret.Shape")
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t, e) {
        r[t] = e
    }

    function i(t) {
        return r[t]
    }
    var r = {};
    t.registerImplementation = e, t.getImplementation = i
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$graphics = new t.Graphics, i.$graphics.$setTarget(i), i
        }
        return __extends(i, e), i.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(9)
        }, Object.defineProperty(i.prototype, "graphics", {
            get: function() {
                return this.$graphics
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$hitTest = function(e, i) {
            if (!this.$visible) return null;
            var r = this.$getInvertedConcatenatedMatrix(),
                n = r.a * e + r.c * i + r.tx,
                a = r.b * e + r.d * i + r.ty,
                o = this.$scrollRect ? this.$scrollRect : this.$maskRect;
            if (o && !o.contains(n, a)) return null;
            if (this.$mask && !this.$mask.$hitTest(e, i)) return null;
            for (var s = this.$children, h = !1, c = null, l = s.length - 1; l >= 0; l--) {
                var u = s[l];
                if (!u.$maskedObject && (c = u.$hitTest(e, i))) {
                    if (h = !0, c.$touchEnabled) break;
                    c = null
                }
            }
            return c ? this.$touchChildren ? c : this : h ? this : (c = t.DisplayObject.prototype.$hitTest.call(this, e, i), c && (c = this.$graphics.$hitTest(e, i)), c)
        }, i.prototype.$measureContentBounds = function(t) {
            this.$graphics.$measureContentBounds(t)
        }, i.prototype.$onRemoveFromStage = function() {
            e.prototype.$onRemoveFromStage.call(this), this.$graphics && this.$graphics.$onRemoveFromStage()
        }, i
    }(t.DisplayObjectContainer);
    t.Sprite = e, __reflect(e.prototype, "egret.Sprite")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(t) {
        function e(e, i) {
            var r = t.call(this, e) || this;
            return r.firstCharHeight = 0, "string" == typeof i ? r.charList = r.parseConfig(i) : i && i.hasOwnProperty("frames") ? r.charList = i.frames : r.charList = {}, r
        }
        return __extends(e, t), e.prototype.getTexture = function(t) {
            var e = this._textureMap[t];
            if (!e) {
                var i = this.charList[t];
                if (!i) return null;
                e = this.createTexture(t, i.x, i.y, i.w, i.h, i.offX, i.offY, i.sourceW, i.sourceH), this._textureMap[t] = e
            }
            return e
        }, e.prototype.getConfig = function(t, e) {
            return this.charList[t] ? this.charList[t][e] : 0
        }, e.prototype._getFirstCharHeight = function() {
            if (0 == this.firstCharHeight)
                for (var t in this.charList) {
                    var e = this.charList[t];
                    if (e) {
                        var i = e.sourceH;
                        if (void 0 === i) {
                            var r = e.h;
                            void 0 === r && (r = 0);
                            var n = e.offY;
                            void 0 === n && (n = 0), i = r + n
                        }
                        if (0 >= i) continue;
                        this.firstCharHeight = i;
                        break
                    }
                }
            return this.firstCharHeight
        }, e.prototype.parseConfig = function(t) {
            t = t.split("\r\n").join("\n");
            for (var e = t.split("\n"), i = this.getConfigByKey(e[3], "count"), r = {}, n = 4; 4 + i > n; n++) {
                var a = e[n],
                    o = String.fromCharCode(this.getConfigByKey(a, "id")),
                    s = {};
                r[o] = s, s.x = this.getConfigByKey(a, "x"), s.y = this.getConfigByKey(a, "y"), s.w = this.getConfigByKey(a, "width"), s.h = this.getConfigByKey(a, "height"), s.offX = this.getConfigByKey(a, "xoffset"), s.offY = this.getConfigByKey(a, "yoffset"), s.xadvance = this.getConfigByKey(a, "xadvance")
            }
            return r
        }, e.prototype.getConfigByKey = function(t, e) {
            for (var i = t.split(" "), r = 0, n = i.length; n > r; r++) {
                var a = i[r];
                if (e == a.substring(0, e.length)) {
                    var o = a.substring(e.length + 1);
                    return parseInt(o)
                }
            }
            return 0
        }, e
    }(t.SpriteSheet);
    t.BitmapFont = e, __reflect(e.prototype, "egret.BitmapFont")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$smoothing = t.Bitmap.defaultSmoothing, i.$text = "", i.$textFieldWidth = 0 / 0, i.$textLinesChanged = !1, i.$textFieldHeight = 0 / 0, i.$font = null, i.$fontStringChanged = !1, i.$lineSpacing = 0, i.$letterSpacing = 0, i.$textAlign = t.HorizontalAlign.LEFT, i.$verticalAlign = t.VerticalAlign.TOP, i.$textWidth = 0 / 0, i.$textHeight = 0 / 0, i.$textOffsetX = 0, i.$textOffsetY = 0, i.$textStartX = 0, i.$textStartY = 0, i.textLines = [], i.$lineHeights = [], t.nativeRender || (i.$renderNode = new t.sys.BitmapNode), i
        }
        return __extends(i, e), i.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(11)
        }, Object.defineProperty(i.prototype, "smoothing", {
            get: function() {
                return this.$smoothing
            },
            set: function(e) {
                var i = this;
                if (e != i.$smoothing && (i.$smoothing = e, !t.nativeRender)) {
                    var r = i.$parent;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp());
                    var n = i.$maskedObject;
                    n && !n.$cacheDirty && (n.$cacheDirty = !0, n.$cacheDirtyUp())
                }
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "text", {
            get: function() {
                return this.$text
            },
            set: function(t) {
                this.$setText(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setText = function(t) {
            t = null == t ? "" : String(t);
            var e = this;
            return t == e.$text ? !1 : (e.$text = t, e.$invalidateContentBounds(), !0)
        }, i.prototype.$getWidth = function() {
            var t = this,
                e = t.$textFieldWidth;
            return isNaN(e) ? t.$getContentBounds().width : e
        }, i.prototype.$setWidth = function(t) {
            var e = this;
            return 0 > t || t == e.$textFieldWidth ? !1 : (e.$textFieldWidth = t, e.$invalidateContentBounds(), !0)
        }, i.prototype.$invalidateContentBounds = function() {
            this.$renderDirty = !0, this.$textLinesChanged = !0, this.$updateRenderNode()
        }, i.prototype.$getHeight = function() {
            var t = this,
                e = t.$textFieldHeight;
            return isNaN(e) ? t.$getContentBounds().height : e
        }, i.prototype.$setHeight = function(t) {
            var e = this;
            return 0 > t || t == e.$textFieldHeight ? !1 : (e.$textFieldHeight = t, e.$invalidateContentBounds(), !0)
        }, Object.defineProperty(i.prototype, "font", {
            get: function() {
                return this.$font
            },
            set: function(t) {
                this.$setFont(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setFont = function(t) {
            var e = this;
            return e.$font == t ? !1 : (e.$font = t, e.$fontStringChanged = !0, this.$invalidateContentBounds(), !0)
        }, Object.defineProperty(i.prototype, "lineSpacing", {
            get: function() {
                return this.$lineSpacing
            },
            set: function(t) {
                this.$setLineSpacing(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setLineSpacing = function(t) {
            var e = this;
            return e.$lineSpacing == t ? !1 : (e.$lineSpacing = t, e.$invalidateContentBounds(), !0)
        }, Object.defineProperty(i.prototype, "letterSpacing", {
            get: function() {
                return this.$letterSpacing
            },
            set: function(t) {
                this.$setLetterSpacing(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setLetterSpacing = function(t) {
            var e = this;
            return e.$letterSpacing == t ? !1 : (e.$letterSpacing = t, e.$invalidateContentBounds(), !0)
        }, Object.defineProperty(i.prototype, "textAlign", {
            get: function() {
                return this.$textAlign
            },
            set: function(t) {
                this.$setTextAlign(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setTextAlign = function(t) {
            var e = this;
            return e.$textAlign == t ? !1 : (e.$textAlign = t, e.$invalidateContentBounds(), !0)
        }, Object.defineProperty(i.prototype, "verticalAlign", {
            get: function() {
                return this.$verticalAlign
            },
            set: function(t) {
                this.$setVerticalAlign(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$setVerticalAlign = function(t) {
            var e = this;
            return e.$verticalAlign == t ? !1 : (e.$verticalAlign = t, e.$invalidateContentBounds(), !0)
        }, i.prototype.$updateRenderNode = function() {
            var e = this,
                r = this.$getTextLines(),
                n = r.length;
            if (0 == n) return void(t.nativeRender && e.$font && (e.$nativeDisplayObject.setDataToBitmapNode(e.$nativeDisplayObject.id, e.$font.$texture, []), e.$nativeDisplayObject.setWidth(0), e.$nativeDisplayObject.setHeight(0)));
            var a, o = [],
                s = this.$textLinesWidth,
                h = e.$font;
            t.nativeRender || (a = this.$renderNode, h.$texture && (a.image = h.$texture.$bitmapData), a.smoothing = e.$smoothing);
            for (var c = h._getFirstCharHeight(), l = Math.ceil(c * i.EMPTY_FACTOR), u = !isNaN(e.$textFieldHeight), p = e.$textWidth, d = e.$textFieldWidth, f = e.$textFieldHeight, g = e.$textAlign, $ = this.$textOffsetY + this.$textStartY, y = this.$lineHeights, v = 0; n > v; v++) {
                var b = y[v];
                if (u && v > 0 && $ + b > f) break;
                var m = r[v],
                    x = m.length,
                    T = this.$textOffsetX;
                if (g != t.HorizontalAlign.LEFT) {
                    var _ = d > p ? d : p;
                    g == t.HorizontalAlign.RIGHT ? T += _ - s[v] : g == t.HorizontalAlign.CENTER && (T += Math.floor((_ - s[v]) / 2))
                }
                for (var D = 0; x > D; D++) {
                    var O = m.charAt(D),
                        w = h.getTexture(O);
                    if (w) {
                        var E = w.$bitmapWidth,
                            R = w.$bitmapHeight;
                        t.nativeRender ? o.push(w.$bitmapX, w.$bitmapY, E, R, T + w.$offsetX, $ + w.$offsetY, w.$getScaleBitmapWidth(), w.$getScaleBitmapHeight(), w.$sourceWidth, w.$sourceHeight) : (a.imageWidth = w.$sourceWidth, a.imageHeight = w.$sourceHeight, a.drawImage(w.$bitmapX, w.$bitmapY, E, R, T + w.$offsetX, $ + w.$offsetY, w.$getScaleBitmapWidth(), w.$getScaleBitmapHeight())), T += (h.getConfig(O, "xadvance") || w.$getTextureWidth()) + e.$letterSpacing
                    } else " " == O ? T += l : t.$warn(1046, O)
                }
                $ += b + e.$lineSpacing
            }
            if (t.nativeRender) {
                e.$nativeDisplayObject.setDataToBitmapNode(e.$nativeDisplayObject.id, h.$texture, o);
                var S = e.$getContentBounds();
                e.$nativeDisplayObject.setWidth(S.width), e.$nativeDisplayObject.setHeight(S.height)
            }
        }, i.prototype.$measureContentBounds = function(t) {
            var e = this.$getTextLines();
            0 == e.length ? t.setEmpty() : t.setTo(this.$textOffsetX + this.$textStartX, this.$textOffsetY + this.$textStartY, this.$textWidth - this.$textOffsetX, this.$textHeight - this.$textOffsetY)
        }, Object.defineProperty(i.prototype, "textWidth", {
            get: function() {
                return this.$getTextLines(), this.$textWidth
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "textHeight", {
            get: function() {
                return this.$getTextLines(), this.$textHeight
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.$getTextLines = function() {
            function e(t) {
                return b && n.length > 0 && f > b ? !1 : (f += c + u, s || h || (l -= p), n.push(t), o.push(c), a.push(l), d = Math.max(l, d), !0)
            }
            var r = this;
            if (!r.$textLinesChanged) return r.textLines;
            var n = [];
            r.textLines = n;
            var a = [];
            r.$textLinesWidth = a, r.$textLinesChanged = !1;
            var o = [];
            if (r.$lineHeights = o, !r.$text || !r.$font) return r.$textWidth = 0, r.$textHeight = 0, n;
            for (var s, h, c, l, u = r.$lineSpacing, p = r.$letterSpacing, d = 0, f = 0, g = 0, $ = 0, y = !isNaN(r.$textFieldWidth), v = r.$textFieldWidth, b = r.$textFieldHeight, m = r.$font, x = m._getFirstCharHeight(), T = Math.ceil(x * i.EMPTY_FACTOR), _ = r.$text, D = _.split(/(?:\r\n|\r|\n)/), O = D.length, w = !0, E = 0; O > E; E++) {
                var R = D[E],
                    S = R.length;
                c = 0, l = 0, s = !0, h = !1;
                for (var F = 0; S > F; F++) {
                    s || (l += p);
                    var P = R.charAt(F),
                        C = void 0,
                        M = void 0,
                        j = 0,
                        A = 0,
                        B = m.getTexture(P);
                    if (B) C = B.$getTextureWidth(), M = B.$getTextureHeight(), j = B.$offsetX, A = B.$offsetY;
                    else {
                        if (" " != P) {
                            t.$warn(1046, P), s && (s = !1);
                            continue
                        }
                        C = T, M = x
                    }
                    if (s && (s = !1), w && (w = !1), y && F > 0 && l + C > v) {
                        if (!e(R.substring(0, F))) break;
                        R = R.substring(F), S = R.length, F = 0, l = F == S - 1 ? C : m.getConfig(P, "xadvance") || C, c = M
                    } else l += F == S - 1 ? C : m.getConfig(P, "xadvance") || C, c = Math.max(M, c)
                }
                if (b && E > 0 && f > b) break;
                if (h = !0, !e(R)) break
            }
            f -= u, r.$textWidth = d, r.$textHeight = f, this.$textOffsetX = g, this.$textOffsetY = $, this.$textStartX = 0, this.$textStartY = 0;
            var N;
            return v > d && (N = r.$textAlign, N == t.HorizontalAlign.RIGHT ? this.$textStartX = v - d : N == t.HorizontalAlign.CENTER && (this.$textStartX = Math.floor((v - d) / 2))), b > f && (N = r.$verticalAlign, N == t.VerticalAlign.BOTTOM ? this.$textStartY = b - f : N == t.VerticalAlign.MIDDLE && (this.$textStartY = Math.floor((b - f) / 2))), n
        }, i.EMPTY_FACTOR = .33, i
    }(t.DisplayObject);
    t.BitmapText = e, __reflect(e.prototype, "egret.BitmapText")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.LEFT = "left", t.RIGHT = "right", t.CENTER = "center", t.JUSTIFY = "justify", t.CONTENT_JUSTIFY = "contentJustify", t
    }();
    t.HorizontalAlign = e, __reflect(e.prototype, "egret.HorizontalAlign")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function e() {
            this.replaceArr = [], this.resutlArr = [], this.initReplaceArr()
        }
        return e.prototype.initReplaceArr = function() {
            this.replaceArr = [], this.replaceArr.push([/&lt;/g, "<"]), this.replaceArr.push([/&gt;/g, ">"]), this.replaceArr.push([/&amp;/g, "&"]), this.replaceArr.push([/&quot;/g, '"']), this.replaceArr.push([/&apos;/g, "'"])
        }, e.prototype.replaceSpecial = function(t) {
            for (var e = 0; e < this.replaceArr.length; e++) {
                var i = this.replaceArr[e][0],
                    r = this.replaceArr[e][1];
                t = t.replace(i, r)
            }
            return t
        }, e.prototype.parse = function(e) {
            this.stackArray = [], this.resutlArr = [];
            for (var i = 0, r = e.length; r > i;) {
                var n = e.indexOf("<", i);
                if (0 > n) this.addToResultArr(e.substring(i)), i = r;
                else {
                    this.addToResultArr(e.substring(i, n));
                    var a = e.indexOf(">", n); - 1 == a ? (t.$error(1038), a = n) : "/" == e.charAt(n + 1) ? this.stackArray.pop() : this.addToArray(e.substring(n + 1, a)), i = a + 1
                }
            }
            return this.resutlArr
        }, e.prototype.parser = function(t) {
            return this.parse(t)
        }, e.prototype.addToResultArr = function(t) {
            "" != t && (t = this.replaceSpecial(t), this.stackArray.length > 0 ? this.resutlArr.push({
                text: t,
                style: this.stackArray[this.stackArray.length - 1]
            }) : this.resutlArr.push({
                text: t
            }))
        }, e.prototype.changeStringToObject = function(t) {
            t = t.trim();
            var e = {},
                i = [];
            if ("i" == t.charAt(0) || "b" == t.charAt(0) || "u" == t.charAt(0)) this.addProperty(e, t, "true");
            else if (i = t.match(/^(font|a)\s/)) {
                t = t.substring(i[0].length).trim();
                for (var r = 0, n = void 0; n = t.match(this.getHeadReg());) {
                    var a = n[0],
                        o = "";
                    t = t.substring(a.length).trim(), '"' == t.charAt(0) ? (r = t.indexOf('"', 1), o = t.substring(1, r), r += 1) : "'" == t.charAt(0) ? (r = t.indexOf("'", 1), o = t.substring(1, r), r += 1) : (o = t.match(/(\S)+/)[0], r = o.length), this.addProperty(e, a.substring(0, a.length - 1).trim(), o.trim()), t = t.substring(r).trim()
                }
            }
            return e
        }, e.prototype.getHeadReg = function() {
            return /^(color|textcolor|strokecolor|stroke|b|bold|i|italic|u|size|fontfamily|href|target)(\s)*=/
        }, e.prototype.addProperty = function(t, e, i) {
            switch (e.toLowerCase()) {
                case "color":
                case "textcolor":
                    i = i.replace(/#/, "0x"), t.textColor = parseInt(i);
                    break;
                case "strokecolor":
                    i = i.replace(/#/, "0x"), t.strokeColor = parseInt(i);
                    break;
                case "stroke":
                    t.stroke = parseInt(i);
                    break;
                case "b":
                case "bold":
                    t.bold = "true" == i;
                    break;
                case "u":
                    t.underline = "true" == i;
                    break;
                case "i":
                case "italic":
                    t.italic = "true" == i;
                    break;
                case "size":
                    t.size = parseInt(i);
                    break;
                case "fontfamily":
                    t.fontFamily = i;
                    break;
                case "href":
                    t.href = this.replaceSpecial(i);
                    break;
                case "target":
                    t.target = this.replaceSpecial(i)
            }
        }, e.prototype.addToArray = function(t) {
            var e = this.changeStringToObject(t);
            if (0 == this.stackArray.length) this.stackArray.push(e);
            else {
                var i = this.stackArray[this.stackArray.length - 1];
                for (var r in i) null == e[r] && (e[r] = i[r]);
                this.stackArray.push(e)
            }
        }, e
    }();
    t.HtmlTextParser = e, __reflect(e.prototype, "egret.HtmlTextParser")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var t = e.call(this) || this;
            return t.stageTextAdded = !1, t._text = null, t._isFocus = !1, t
        }
        return __extends(i, e), i.prototype.init = function(e) {
            this._text = e, this.stageText = new t.StageText, this.stageText.$setTextField(this._text)
        }, i.prototype._addStageText = function() {
            this.stageTextAdded || (this._text.$inputEnabled || (this._text.$touchEnabled = !0), this.tempStage = this._text.stage, this.stageText.$addToStage(), this.stageText.addEventListener("updateText", this.updateTextHandler, this), this._text.addEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this), this.stageText.addEventListener("blur", this.blurHandler, this), this.stageText.addEventListener("focus", this.focusHandler, this), this.stageTextAdded = !0)
        }, i.prototype._removeStageText = function() {
            this.stageTextAdded && (this._text.$inputEnabled || (this._text.$touchEnabled = !1), this.stageText.$removeFromStage(), this.stageText.removeEventListener("updateText", this.updateTextHandler, this), this._text.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onMouseDownHandler, this), this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this.stageText.removeEventListener("blur", this.blurHandler, this), this.stageText.removeEventListener("focus", this.focusHandler, this), this.stageTextAdded = !1)
        }, i.prototype._getText = function() {
            return this.stageText.$getText()
        }, i.prototype._setText = function(t) {
            this.stageText.$setText(t)
        }, i.prototype._setColor = function(t) {
            this.stageText.$setColor(t)
        }, i.prototype.focusHandler = function(e) {
            this._isFocus || (this._isFocus = !0, e.showing || this._text.$setIsTyping(!0), this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_IN, !0)))
        }, i.prototype.blurHandler = function(e) {
            this._isFocus && (this._isFocus = !1, this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), this._text.$setIsTyping(!1), this.stageText.$onBlur(), this._text.dispatchEvent(new t.FocusEvent(t.FocusEvent.FOCUS_OUT, !0)))
        }, i.prototype.onMouseDownHandler = function(t) {
            this.$onFocus()
        }, i.prototype.$onFocus = function() {
            var e = this;
            this._text.visible && (this._isFocus || (this.tempStage.removeEventListener(t.TouchEvent.TOUCH_BEGIN, this.onStageDownHandler, this), t.callLater(function() {
                e.tempStage.addEventListener(t.TouchEvent.TOUCH_BEGIN, e.onStageDownHandler, e)
            }, this), t.nativeRender && this.stageText.$setText(this._text.$TextField[13]), this.stageText.$show()))
        }, i.prototype.onStageDownHandler = function(t) {
            t.$target != this._text && this.stageText.$hide()
        }, i.prototype.updateTextHandler = function(e) {
            var i, r, n = this._text.$TextField,
                a = this.stageText.$getText(),
                o = !1;
            null != n[35] && (i = new RegExp("[" + n[35] + "]", "g"), r = a.match(i), a = r ? r.join("") : "", o = !0), null != n[36] && (i = new RegExp("[^" + n[36] + "]", "g"), r = a.match(i), a = r ? r.join("") : "", o = !0), o && this.stageText.$getText() != a && this.stageText.$setText(a), this.resetText(), this._text.dispatchEvent(new t.Event(t.Event.CHANGE, !0))
        }, i.prototype.resetText = function() {
            this._text.$setBaseText(this.stageText.$getText())
        }, i.prototype._hideInput = function() {
            this.stageText.$removeFromStage()
        }, i.prototype.updateInput = function() {
            !this._text.$visible && this.stageText && this._hideInput()
        }, i.prototype._updateProperties = function() {
            return this._isFocus ? (this.stageText.$resetStageText(), void this.updateInput()) : (this.stageText.$setText(this._text.$TextField[13]), this.stageText.$resetStageText(), void this.updateInput())
        }, i
    }(t.HashObject);
    t.InputController = e, __reflect(e.prototype, "egret.InputController")
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    function e(e, i, n) {
        n = n || {};
        var a = null == n.italic ? i[16] : n.italic,
            o = null == n.bold ? i[15] : n.bold,
            s = null == n.size ? i[0] : n.size,
            h = n.fontFamily || i[8] || r.default_fontFamily;
        return t.sys.measureText(e, h, s, o, a)
    }
    var i = new RegExp("(?=[\\u00BF-\\u1FFF\\u2C00-\\uD7FF]|\\b|\\s)(?![。，！、》…）)}”】\\.\\,\\!\\?\\]\\:])"),
        r = function(r) {
            function n() {
                var e = r.call(this) || this;
                e.$inputEnabled = !1, e.inputUtils = null, e.$graphicsNode = null, e.isFlow = !1, e.textArr = [], e.linesArr = [], e.$isTyping = !1;
                var i = new t.sys.TextNode;
                return i.fontFamily = n.default_fontFamily, e.textNode = i, e.$renderNode = i, e.$TextField = {
                    0: n.default_size,
                    1: 0,
                    2: n.default_textColor,
                    3: 0 / 0,
                    4: 0 / 0,
                    5: 0,
                    6: 0,
                    7: 0,
                    8: n.default_fontFamily,
                    9: "left",
                    10: "top",
                    11: "#ffffff",
                    12: "",
                    13: "",
                    14: [],
                    15: !1,
                    16: !1,
                    17: !0,
                    18: !1,
                    19: !1,
                    20: !1,
                    21: 0,
                    22: 0,
                    23: 0,
                    24: t.TextFieldType.DYNAMIC,
                    25: 0,
                    26: "#000000",
                    27: 0,
                    28: -1,
                    29: 0,
                    30: !1,
                    31: !1,
                    32: 0,
                    33: !1,
                    34: 16777215,
                    35: null,
                    36: null,
                    37: t.TextFieldInputType.TEXT,
                    38: !1
                }, e
            }
            return __extends(n, r), n.prototype.createNativeDisplayObject = function() {
                this.$nativeDisplayObject = new egret_native.NativeDisplayObject(7)
            }, n.prototype.isInput = function() {
                return this.$TextField[24] == t.TextFieldType.INPUT
            }, n.prototype.$setTouchEnabled = function(t) {
                r.prototype.$setTouchEnabled.call(this, t), this.isInput() && (this.$inputEnabled = !0)
            }, Object.defineProperty(n.prototype, "fontFamily", {
                get: function() {
                    return this.$TextField[8]
                },
                set: function(t) {
                    this.$setFontFamily(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setFontFamily = function(e) {
                var i = this.$TextField;
                return i[8] == e ? !1 : (i[8] = e, this.invalidateFontString(), t.nativeRender && this.$nativeDisplayObject.setFontFamily(e), !0)
            }, Object.defineProperty(n.prototype, "size", {
                get: function() {
                    return this.$TextField[0]
                },
                set: function(t) {
                    this.$setSize(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setSize = function(e) {
                var i = this.$TextField;
                return i[0] == e ? !1 : (i[0] = e, this.invalidateFontString(), t.nativeRender && this.$nativeDisplayObject.setFontSize(e), !0)
            }, Object.defineProperty(n.prototype, "bold", {
                get: function() {
                    return this.$TextField[15]
                },
                set: function(t) {
                    this.$setBold(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setBold = function(e) {
                var i = this.$TextField;
                return e == i[15] ? !1 : (i[15] = e, this.invalidateFontString(), t.nativeRender && this.$nativeDisplayObject.setBold(e), !0)
            }, Object.defineProperty(n.prototype, "italic", {
                get: function() {
                    return this.$TextField[16]
                },
                set: function(t) {
                    this.$setItalic(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setItalic = function(e) {
                var i = this.$TextField;
                return e == i[16] ? !1 : (i[16] = e, this.invalidateFontString(), t.nativeRender && this.$nativeDisplayObject.setItalic(e), !0)
            }, n.prototype.invalidateFontString = function() {
                this.$TextField[17] = !0, this.$invalidateTextField()
            }, Object.defineProperty(n.prototype, "textAlign", {
                get: function() {
                    return this.$TextField[9]
                },
                set: function(t) {
                    this.$setTextAlign(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setTextAlign = function(e) {
                var i = this.$TextField;
                return i[9] == e ? !1 : (i[9] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setTextAlign(e), !0)
            }, Object.defineProperty(n.prototype, "verticalAlign", {
                get: function() {
                    return this.$TextField[10]
                },
                set: function(t) {
                    this.$setVerticalAlign(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setVerticalAlign = function(e) {
                var i = this.$TextField;
                return i[10] == e ? !1 : (i[10] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setVerticalAlign(e), !0)
            }, Object.defineProperty(n.prototype, "lineSpacing", {
                get: function() {
                    return this.$TextField[1]
                },
                set: function(t) {
                    this.$setLineSpacing(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setLineSpacing = function(e) {
                var i = this.$TextField;
                return i[1] == e ? !1 : (i[1] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setLineSpacing(e), !0)
            }, Object.defineProperty(n.prototype, "textColor", {
                get: function() {
                    return this.$TextField[2]
                },
                set: function(t) {
                    this.$setTextColor(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setTextColor = function(e) {
                var i = this.$TextField;
                return i[2] == e ? !1 : (i[2] = e, this.inputUtils && this.inputUtils._setColor(this.$TextField[2]), this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setTextColor(e), !0)
            }, Object.defineProperty(n.prototype, "wordWrap", {
                get: function() {
                    return this.$TextField[19]
                },
                set: function(t) {
                    this.$setWordWrap(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setWordWrap = function(e) {
                var i = this.$TextField;
                e != i[19] && (i[20] || (i[19] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setWordWrap(e)))
            }, Object.defineProperty(n.prototype, "type", {
                get: function() {
                    return this.$TextField[24]
                },
                set: function(t) {
                    this.$setType(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setType = function(e) {
                var i = this.$TextField;
                return i[24] != e ? (i[24] = e, t.nativeRender && this.$nativeDisplayObject.setType(e), e == t.TextFieldType.INPUT ? (isNaN(i[3]) && this.$setWidth(100), isNaN(i[4]) && this.$setHeight(30), this.$setTouchEnabled(!0), null == this.inputUtils && (this.inputUtils = new t.InputController), this.inputUtils.init(this), this.$invalidateTextField(), this.$stage && this.inputUtils._addStageText()) : (this.inputUtils && (this.inputUtils._removeStageText(), this.inputUtils = null), this.$setTouchEnabled(!1)), !0) : !1
            }, Object.defineProperty(n.prototype, "inputType", {
                get: function() {
                    return this.$TextField[37]
                },
                set: function(e) {
                    this.$TextField[37] != e && (this.$TextField[37] = e, t.nativeRender && this.$nativeDisplayObject.setInputType(e))
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "text", {
                get: function() {
                    return this.$getText()
                },
                set: function(t) {
                    this.$setText(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$getText = function() {
                return this.$TextField[24] == t.TextFieldType.INPUT ? this.inputUtils._getText() : this.$TextField[13]
            }, n.prototype.$setBaseText = function(e) {
                e = null == e ? "" : e.toString(), this.isFlow = !1;
                var i = this.$TextField;
                if (i[13] != e) {
                    this.$invalidateTextField(), i[13] = e;
                    var r = "";
                    return r = i[20] ? this.changeToPassText(e) : e, t.nativeRender && this.$nativeDisplayObject.setText(r), this.setMiddleStyle([{
                        text: r
                    }]), !0
                }
                return !1
            }, n.prototype.$setText = function(t) {
                null == t && (t = "");
                var e = this.$setBaseText(t);
                return this.inputUtils && this.inputUtils._setText(this.$TextField[13]), e
            }, Object.defineProperty(n.prototype, "displayAsPassword", {
                get: function() {
                    return this.$TextField[20]
                },
                set: function(t) {
                    this.$setDisplayAsPassword(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setDisplayAsPassword = function(e) {
                var i = this.$TextField;
                if (i[20] != e) {
                    i[20] = e, this.$invalidateTextField();
                    var r = "";
                    return r = e ? this.changeToPassText(i[13]) : i[13], t.nativeRender && this.$nativeDisplayObject.setText(r), this.setMiddleStyle([{
                        text: r
                    }]), !0
                }
                return !1
            }, Object.defineProperty(n.prototype, "strokeColor", {
                get: function() {
                    return this.$TextField[25]
                },
                set: function(t) {
                    this.$setStrokeColor(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setStrokeColor = function(e) {
                var i = this.$TextField;
                return i[25] != e ? (this.$invalidateTextField(), i[25] = e, t.nativeRender && this.$nativeDisplayObject.setStrokeColor(e), i[26] = t.toColorString(e), !0) : !1
            }, Object.defineProperty(n.prototype, "stroke", {
                get: function() {
                    return this.$TextField[27]
                },
                set: function(t) {
                    this.$setStroke(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setStroke = function(e) {
                return this.$TextField[27] != e ? (this.$invalidateTextField(), this.$TextField[27] = e, t.nativeRender && this.$nativeDisplayObject.setStroke(e), !0) : !1
            }, Object.defineProperty(n.prototype, "maxChars", {
                get: function() {
                    return this.$TextField[21]
                },
                set: function(t) {
                    this.$setMaxChars(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setMaxChars = function(e) {
                return this.$TextField[21] != e ? (this.$TextField[21] = e, t.nativeRender && this.$nativeDisplayObject.setMaxChars(e), !0) : !1
            }, Object.defineProperty(n.prototype, "scrollV", {
                get: function() {
                    return Math.min(Math.max(this.$TextField[28], 1), this.maxScrollV)
                },
                set: function(e) {
                    e = Math.max(e, 1), e != this.$TextField[28] && (this.$TextField[28] = e, t.nativeRender && this.$nativeDisplayObject.setScrollV(e), this.$invalidateTextField())
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "maxScrollV", {
                get: function() {
                    return this.$getLinesArr(), Math.max(this.$TextField[29] - t.TextFieldUtils.$getScrollNum(this) + 1, 1)
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "selectionBeginIndex", {
                get: function() {
                    return 0
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "selectionEndIndex", {
                get: function() {
                    return 0
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "caretIndex", {
                get: function() {
                    return 0
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setSelection = function(t, e) {
                return !1
            }, n.prototype.$getLineHeight = function() {
                return this.$TextField[1] + this.$TextField[0]
            }, Object.defineProperty(n.prototype, "numLines", {
                get: function() {
                    return this.$getLinesArr(), this.$TextField[29]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "multiline", {
                get: function() {
                    return this.$TextField[30]
                },
                set: function(t) {
                    this.$setMultiline(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setMultiline = function(e) {
                return this.$TextField[30] == e ? !1 : (this.$TextField[30] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setMultiline(e), !0)
            }, Object.defineProperty(n.prototype, "restrict", {
                get: function() {
                    var t = this.$TextField,
                        e = null;
                    return null != t[35] && (e = t[35]), null != t[36] && (null == e && (e = ""), e += "^" + t[36]), e
                },
                set: function(t) {
                    var e = this.$TextField;
                    if (null == t) e[35] = null, e[36] = null;
                    else {
                        for (var i = -1; i < t.length && (i = t.indexOf("^", i), 0 != i) && i > 0 && "\\" == t.charAt(i - 1);) i++;
                        0 == i ? (e[35] = null, e[36] = t.substring(i + 1)) : i > 0 ? (e[35] = t.substring(0, i), e[36] = t.substring(i + 1)) : (e[35] = t, e[36] = null)
                    }
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setWidth = function(e) {
                t.nativeRender && this.$nativeDisplayObject.setTextFieldWidth(e);
                var i = this.$TextField;
                if (isNaN(e)) {
                    if (isNaN(i[3])) return !1;
                    i[3] = 0 / 0
                } else {
                    if (i[3] == e) return !1;
                    i[3] = e
                }
                return e = +e, 0 > e ? !1 : (this.$invalidateTextField(), !0)
            }, n.prototype.$setHeight = function(e) {
                t.nativeRender && this.$nativeDisplayObject.setTextFieldHeight(e);
                var i = this.$TextField;
                if (isNaN(e)) {
                    if (isNaN(i[4])) return !1;
                    i[4] = 0 / 0
                } else {
                    if (i[4] == e) return !1;
                    i[4] = e
                }
                return e = +e, 0 > e ? !1 : (this.$invalidateTextField(), !0)
            }, n.prototype.$getWidth = function() {
                var t = this.$TextField;
                return isNaN(t[3]) ? this.$getContentBounds().width : t[3]
            }, n.prototype.$getHeight = function() {
                var t = this.$TextField;
                return isNaN(t[4]) ? this.$getContentBounds().height : t[4]
            }, Object.defineProperty(n.prototype, "border", {
                get: function() {
                    return this.$TextField[31]
                },
                set: function(t) {
                    this.$setBorder(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setBorder = function(e) {
                e = !!e, this.$TextField[31] != e && (this.$TextField[31] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setBorder(e))
            }, Object.defineProperty(n.prototype, "borderColor", {
                get: function() {
                    return this.$TextField[32]
                },
                set: function(t) {
                    this.$setBorderColor(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setBorderColor = function(e) {
                e = +e || 0, this.$TextField[32] != e && (this.$TextField[32] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setBorderColor(e))
            }, Object.defineProperty(n.prototype, "background", {
                get: function() {
                    return this.$TextField[33]
                },
                set: function(t) {
                    this.$setBackground(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setBackground = function(e) {
                this.$TextField[33] != e && (this.$TextField[33] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setBackground(e))
            }, Object.defineProperty(n.prototype, "backgroundColor", {
                get: function() {
                    return this.$TextField[34]
                },
                set: function(t) {
                    this.$setBackgroundColor(t)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.$setBackgroundColor = function(e) {
                this.$TextField[34] != e && (this.$TextField[34] = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setBackgroundColor(e))
            }, n.prototype.fillBackground = function(e) {
                var i = this.$graphicsNode;
                i && i.clear();
                var r = this.$TextField;
                if (r[33] || r[31] || e && e.length > 0) {
                    if (!i)
                        if (i = this.$graphicsNode = new t.sys.GraphicsNode, t.nativeRender) this.$renderNode = this.textNode;
                        else {
                            var n = new t.sys.GroupNode;
                            n.addNode(i), n.addNode(this.textNode), this.$renderNode = n
                        }
                    var a = void 0,
                        o = void 0;
                    if (r[33] && (a = i.beginFill(r[34]), a.drawRect(0, 0, this.$getWidth(), this.$getHeight())), r[31] && (o = i.lineStyle(1, r[32]), o.drawRect(0, 0, this.$getWidth() - 1, this.$getHeight() - 1)), e && e.length > 0)
                        for (var s = r[2], h = -1, c = e.length, l = 0; c > l; l += 4) {
                            var u = e[l],
                                p = e[l + 1],
                                d = e[l + 2],
                                f = e[l + 3] || s;
                            (0 > h || h != f) && (h = f, o = i.lineStyle(2, f, 1, t.CapsStyle.NONE)), o.moveTo(u, p), o.lineTo(u + d, p)
                        }
                }
                if (i) {
                    var g = this.$getRenderBounds();
                    i.x = g.x, i.y = g.y, i.width = g.width, i.height = g.height, t.Rectangle.release(g)
                }
            }, n.prototype.setFocus = function() {
                this.type == t.TextFieldType.INPUT && this.$stage && this.inputUtils.$onFocus()
            }, n.prototype.$onRemoveFromStage = function() {
                r.prototype.$onRemoveFromStage.call(this), this.removeEvent(), this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._removeStageText(), this.textNode && (this.textNode.clean(), t.nativeRender && egret_native.NativeDisplayObject.disposeTextData(this))
            }, n.prototype.$onAddToStage = function(e, i) {
                r.prototype.$onAddToStage.call(this, e, i), this.addEvent(), this.$TextField[24] == t.TextFieldType.INPUT && this.inputUtils._addStageText()
            }, n.prototype.$invalidateTextField = function() {
                var e = this;
                if (e.$renderDirty = !0, e.$TextField[18] = !0, e.$TextField[38] = !0, t.nativeRender);
                else {
                    var i = e.$parent;
                    i && !i.$cacheDirty && (i.$cacheDirty = !0, i.$cacheDirtyUp());
                    var r = e.$maskedObject;
                    r && !r.$cacheDirty && (r.$cacheDirty = !0, r.$cacheDirtyUp())
                }
            }, n.prototype.$getRenderBounds = function() {
                var e = this.$getContentBounds(),
                    i = t.Rectangle.create();
                i.copyFrom(e), this.$TextField[31] && (i.width += 2, i.height += 2);
                var r = 2 * this.$TextField[27];
                return r > 0 && (i.width += 2 * r, i.height += 2 * r), i.x -= r + 2, i.y -= r + 2, i.width = Math.ceil(i.width) + 4, i.height = Math.ceil(i.height) + 4, i
            }, n.prototype.$measureContentBounds = function(e) {
                this.$getLinesArr();
                var i = 0,
                    r = 0;
                t.nativeRender ? (i = egret_native.nrGetTextFieldWidth(this.$nativeDisplayObject.id), r = egret_native.nrGetTextFieldHeight(this.$nativeDisplayObject.id)) : (i = isNaN(this.$TextField[3]) ? this.$TextField[5] : this.$TextField[3], r = isNaN(this.$TextField[4]) ? t.TextFieldUtils.$getTextHeight(this) : this.$TextField[4]), e.setTo(0, 0, i, r)
            }, n.prototype.$updateRenderNode = function() {
                if (this.$TextField[24] == t.TextFieldType.INPUT) {
                    if (this.inputUtils._updateProperties(), this.$isTyping) return void this.fillBackground()
                } else if (0 == this.$TextField[3]) {
                    var e = this.$graphicsNode;
                    return void(e && e.clear())
                }
                var i = this.drawText();
                this.fillBackground(i);
                var r = this.$getRenderBounds(),
                    n = this.textNode;
                n.x = r.x, n.y = r.y, n.width = Math.ceil(r.width), n.height = Math.ceil(r.height), t.Rectangle.release(r)
            }, Object.defineProperty(n.prototype, "textFlow", {
                get: function() {
                    return this.textArr
                },
                set: function(e) {
                    this.isFlow = !0;
                    var i = "";
                    null == e && (e = []);
                    for (var r = 0; r < e.length; r++) {
                        var n = e[r];
                        i += n.text
                    }
                    this.$TextField[20] ? this.$setBaseText(i) : (this.$TextField[13] = i, this.setMiddleStyle(e), t.nativeRender && this.$nativeDisplayObject.setTextFlow(e))
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.changeToPassText = function(t) {
                if (this.$TextField[20]) {
                    for (var e = "", i = 0, r = t.length; r > i; i++) switch (t.charAt(i)) {
                        case "\n":
                            e += "\n";
                            break;
                        case "\r":
                            break;
                        default:
                            e += "*"
                    }
                    return e
                }
                return t
            }, n.prototype.setMiddleStyle = function(t) {
                this.$TextField[18] = !0, this.$TextField[38] = !0, this.textArr = t, this.$invalidateTextField()
            }, Object.defineProperty(n.prototype, "textWidth", {
                get: function() {
                    return this.$getLinesArr(), t.nativeRender ? egret_native.nrGetTextWidth(this.$nativeDisplayObject.id) : this.$TextField[5]
                },
                enumerable: !0,
                configurable: !0
            }), Object.defineProperty(n.prototype, "textHeight", {
                get: function() {
                    return this.$getLinesArr(), t.nativeRender ? egret_native.nrGetTextHeight(this.$nativeDisplayObject.id) : t.TextFieldUtils.$getTextHeight(this)
                },
                enumerable: !0,
                configurable: !0
            }), n.prototype.appendText = function(t) {
                this.appendElement({
                    text: t
                })
            }, n.prototype.appendElement = function(e) {
                var i = this.$TextField[13] + e.text;
                return t.nativeRender ? (this.textArr.push(e), this.$TextField[13] = i, this.$TextField[18] = !0, this.$TextField[38] = !0, void this.$nativeDisplayObject.setTextFlow(this.textArr)) : void(this.$TextField[20] ? this.$setBaseText(i) : (this.$TextField[13] = i, this.textArr.push(e), this.setMiddleStyle(this.textArr)))
            }, n.prototype.$getLinesArr = function() {
                var e = this.$TextField;
                return t.nativeRender && e[38] ? (egret_native.updateNativeRender(), void(e[38] = !1)) : this.$getLinesArr2()
            }, n.prototype.$getLinesArr2 = function() {
                var r = this.$TextField;
                if (!r[18]) return this.linesArr;
                r[18] = !1;
                var n = this.textArr;
                this.linesArr.length = 0, r[6] = 0, r[5] = 0;
                var a = r[3];
                if (!isNaN(a) && 0 == a) return r[29] = 0, [{
                    width: 0,
                    height: 0,
                    charNum: 0,
                    elements: [],
                    hasNextLine: !1
                }];
                for (var o, s = this.linesArr, h = 0, c = 0, l = 0, u = 0, p = 0, d = n.length; d > p; p++) {
                    var f = n[p];
                    if (f.text) {
                        f.style = f.style || {};
                        for (var g = f.text.toString(), $ = g.split(/(?:\r\n|\r|\n)/), y = 0, v = $.length; v > y; y++) {
                            null == s[u] && (o = {
                                width: 0,
                                height: 0,
                                elements: [],
                                charNum: 0,
                                hasNextLine: !1
                            }, s[u] = o, h = 0, l = 0, c = 0), l = r[24] == t.TextFieldType.INPUT ? r[0] : Math.max(l, f.style.size || r[0]);
                            var b = !0;
                            if ("" == $[y]) y == v - 1 && (b = !1);
                            else {
                                var m = e($[y], r, f.style);
                                if (isNaN(a)) h += m, c += $[y].length, o.elements.push({
                                    width: m,
                                    text: $[y],
                                    style: f.style
                                }), y == v - 1 && (b = !1);
                                else if (a >= h + m) o.elements.push({
                                    width: m,
                                    text: $[y],
                                    style: f.style
                                }), h += m, c += $[y].length, y == v - 1 && (b = !1);
                                else {
                                    var x = 0,
                                        T = 0,
                                        _ = $[y],
                                        D = void 0;
                                    D = r[19] ? _.split(i) : _.match(/./g);
                                    for (var O = D.length, w = 0; O > x; x++) {
                                        var E = D[x].length,
                                            R = !1;
                                        if (1 == E && O - 1 > x) {
                                            var S = D[x].charCodeAt(0),
                                                F = D[x + 1].charCodeAt(0);
                                            if (S >= 55296 && 56319 >= S && 56320 == (64512 & F)) {
                                                var P = D[x] + D[x + 1];
                                                E = 2, R = !0, m = e(P, r, f.style)
                                            } else m = e(D[x], r, f.style)
                                        } else m = e(D[x], r, f.style);
                                        if (0 != h && h + m > a && h + x != 0) break;
                                        if (T + m > a)
                                            for (var C = D[x].match(/./g), M = 0, j = C.length; j > M; M++) {
                                                var E = C[M].length,
                                                    A = !1;
                                                if (1 == E && j - 1 > M) {
                                                    var S = C[M].charCodeAt(0),
                                                        F = C[M + 1].charCodeAt(0);
                                                    if (S >= 55296 && 56319 >= S && 56320 == (64512 & F)) {
                                                        var P = C[M] + C[M + 1];
                                                        E = 2, A = !0, m = e(P, r, f.style)
                                                    } else m = e(C[M], r, f.style)
                                                } else m = e(C[M], r, f.style);
                                                if (M > 0 && h + m > a) break;
                                                w += E, T += m, h += m, c += w, A && M++
                                            } else w += E, T += m, h += m, c += w;
                                        R && x++
                                    }
                                    if (x > 0) {
                                        o.elements.push({
                                            width: T,
                                            text: _.substring(0, w),
                                            style: f.style
                                        });
                                        var B = _.substring(w),
                                            N = void 0,
                                            k = B.length;
                                        for (N = 0; k > N && " " == B.charAt(N); N++);
                                        $[y] = B.substring(N)
                                    }
                                    "" != $[y] && (y--, b = !1)
                                }
                            }
                            b && (c++, o.hasNextLine = !0), y < $.length - 1 && (o.width = h, o.height = l, o.charNum = c, r[5] = Math.max(r[5], h), r[6] += l, u++)
                        }
                        p == n.length - 1 && o && (o.width = h, o.height = l, o.charNum = c, r[5] = Math.max(r[5], h), r[6] += l)
                    } else o && (o.width = h, o.height = l, o.charNum = c, r[5] = Math.max(r[5], h), r[6] += l)
                }
                return r[29] = s.length, s
            }, n.prototype.$setIsTyping = function(e) {
                this.$isTyping = e, this.$invalidateTextField(), t.nativeRender && this.$nativeDisplayObject.setIsTyping(e)
            }, n.prototype.drawText = function() {
                var e = this.textNode,
                    i = this.$TextField;
                e.bold = i[15], e.fontFamily = i[8] || n.default_fontFamily, e.italic = i[16], e.size = i[0], e.stroke = i[27], e.strokeColor = i[25], e.textColor = i[2];
                var r = this.$getLinesArr();
                if (0 == i[5]) return [];
                var a = isNaN(i[3]) ? i[5] : i[3],
                    o = t.TextFieldUtils.$getTextHeight(this),
                    s = 0,
                    h = t.TextFieldUtils.$getStartLine(this),
                    c = i[4];
                if (!isNaN(c) && c > o) {
                    var l = t.TextFieldUtils.$getValign(this);
                    s += l * (c - o)
                }
                s = Math.round(s);
                for (var u = t.TextFieldUtils.$getHalign(this), p = 0, d = [], f = h, g = i[29]; g > f; f++) {
                    var $ = r[f],
                        y = $.height;
                    if (s += y / 2, f != h) {
                        if (i[24] == t.TextFieldType.INPUT && !i[30]) break;
                        if (!isNaN(c) && s > c) break
                    }
                    p = Math.round((a - $.width) * u);
                    for (var v = 0, b = $.elements.length; b > v; v++) {
                        var m = $.elements[v],
                            x = m.style.size || i[0];
                        e.drawText(p, s + (y - x) / 2, m.text, m.style), m.style.underline && d.push(p, s + y / 2, m.width, m.style.textColor), p += m.width
                    }
                    s += y / 2 + i[1]
                }
                return d
            }, n.prototype.addEvent = function() {
                this.addEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
            }, n.prototype.removeEvent = function() {
                this.removeEventListener(t.TouchEvent.TOUCH_TAP, this.onTapHandler, this)
            }, n.prototype.onTapHandler = function(e) {
                if (this.$TextField[24] != t.TextFieldType.INPUT) {
                    var i = t.TextFieldUtils.$getTextElement(this, e.localX, e.localY);
                    if (null != i) {
                        var r = i.style;
                        if (r && r.href)
                            if (r.href.match(/^event:/)) {
                                var n = r.href.match(/^event:/)[0];
                                t.TextEvent.dispatchTextEvent(this, t.TextEvent.LINK, r.href.substring(n.length))
                            } else open(r.href, r.target || "_blank")
                    }
                }
            }, n.default_fontFamily = "Arial", n.default_size = 30, n.default_textColor = 16777215, n
        }(t.DisplayObject);
    t.TextField = r, __reflect(r.prototype, "egret.TextField")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.TEXT = "text", t.TEL = "tel", t.PASSWORD = "password", t
    }();
    t.TextFieldInputType = e, __reflect(e.prototype, "egret.TextFieldInputType")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.DYNAMIC = "dynamic", t.INPUT = "input", t
    }();
    t.TextFieldType = e, __reflect(e.prototype, "egret.TextFieldType")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function e() {}
        return e.$getStartLine = function(t) {
            var i = t.$TextField,
                r = e.$getTextHeight(t),
                n = 0,
                a = i[4];
            return isNaN(a) || (a > r || r > a && (n = Math.max(i[28] - 1, 0), n = Math.min(i[29] - 1, n)), i[30] || (n = Math.max(i[28] - 1, 0), i[29] > 0 && (n = Math.min(i[29] - 1, n)))), n
        }, e.$getHalign = function(e) {
            var i = e.$getLinesArr2(),
                r = 0;
            return e.$TextField[9] == t.HorizontalAlign.CENTER ? r = .5 : e.$TextField[9] == t.HorizontalAlign.RIGHT && (r = 1), e.$TextField[24] == t.TextFieldType.INPUT && !e.$TextField[30] && i.length > 1 && (r = 0), r
        }, e.$getTextHeight = function(e) {
            var i = t.TextFieldType.INPUT != e.$TextField[24] || e.$TextField[30] ? e.$TextField[6] + (e.$TextField[29] - 1) * e.$TextField[1] : e.$TextField[0];
            return i
        }, e.$getValign = function(i) {
            var r = e.$getTextHeight(i),
                n = i.$TextField[4];
            if (!isNaN(n) && n > r) {
                var a = 0;
                return i.$TextField[10] == t.VerticalAlign.MIDDLE ? a = .5 : i.$TextField[10] == t.VerticalAlign.BOTTOM && (a = 1), a
            }
            return 0
        }, e.$getTextElement = function(t, i, r) {
            var n = e.$getHit(t, i, r),
                a = t.$getLinesArr2();
            return n && a[n.lineIndex] && a[n.lineIndex].elements[n.textElementIndex] ? a[n.lineIndex].elements[n.textElementIndex] : null
        }, e.$getHit = function(t, i, r) {
            var n = t.$getLinesArr2();
            if (0 == t.$TextField[3]) return null;
            var a = 0,
                o = e.$getTextHeight(t),
                s = 0,
                h = t.$TextField[4];
            if (!isNaN(h) && h > o) {
                var c = e.$getValign(t);
                s = c * (h - o), 0 != s && (r -= s)
            }
            for (var l = e.$getStartLine(t), u = 0, p = l; p < n.length; p++) {
                var d = n[p];
                if (u + d.height >= r) {
                    r > u && (a = p + 1);
                    break
                }
                if (u += d.height, u + t.$TextField[1] > r) return null;
                u += t.$TextField[1]
            }
            if (0 == a) return null;
            var f = n[a - 1],
                g = t.$TextField[3];
            isNaN(g) && (g = t.textWidth);
            var $ = e.$getHalign(t);
            i -= $ * (g - f.width);
            for (var y = 0, p = 0; p < f.elements.length; p++) {
                var v = f.elements[p];
                if (y + v.width <= i) y += v.width;
                else if (i > y) return {
                    lineIndex: a - 1,
                    textElementIndex: p
                }
            }
            return null
        }, e.$getScrollNum = function(t) {
            var e = 1;
            if (t.$TextField[30]) {
                var i = t.height,
                    r = t.size,
                    n = t.lineSpacing;
                e = Math.floor(i / (r + n));
                var a = i - (r + n) * e;
                a > r / 2 && e++
            }
            return e
        }, e
    }();
    t.TextFieldUtils = e, __reflect(e.prototype, "egret.TextFieldUtils")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.TOP = "top", t.BOTTOM = "bottom", t.MIDDLE = "middle", t.JUSTIFY = "justify", t.CONTENT_JUSTIFY = "contentJustify", t
    }();
    t.VerticalAlign = e, __reflect(e.prototype, "egret.VerticalAlign")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.encode = function(t) {
            for (var e = new Uint8Array(t), i = e.length, r = "", n = 0; i > n; n += 3) r += chars[e[n] >> 2], r += chars[(3 & e[n]) << 4 | e[n + 1] >> 4], r += chars[(15 & e[n + 1]) << 2 | e[n + 2] >> 6], r += chars[63 & e[n + 2]];
            return i % 3 === 2 ? r = r.substring(0, r.length - 1) + "=" : i % 3 === 1 && (r = r.substring(0, r.length - 2) + "=="), r
        }, t.decode = function(t) {
            var e = .75 * t.length,
                i = t.length,
                r = 0,
                n = 0,
                a = 0,
                o = 0,
                s = 0;
            "=" === t[t.length - 1] && (e--, "=" === t[t.length - 2] && e--);
            for (var h = new ArrayBuffer(e), c = new Uint8Array(h), l = 0; i > l; l += 4) n = lookup[t.charCodeAt(l)], a = lookup[t.charCodeAt(l + 1)], o = lookup[t.charCodeAt(l + 2)], s = lookup[t.charCodeAt(l + 3)], c[r++] = n << 2 | a >> 4, c[r++] = (15 & a) << 4 | o >> 2, c[r++] = (3 & o) << 6 | 63 & s;
            return h
        }, t
    }();
    t.Base64Util = e, __reflect(e.prototype, "egret.Base64Util")
}(egret || (egret = {}));
for (var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lookup = new Uint8Array(256), i = 0; i < chars.length; i++) lookup[chars.charCodeAt(i)] = i;
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.LITTLE_ENDIAN = "littleEndian", t.BIG_ENDIAN = "bigEndian", t
    }();
    t.Endian = e, __reflect(e.prototype, "egret.Endian");
    var i = function() {
        function i(t, i) {
            void 0 === i && (i = 0), this.bufferExtSize = 0, this.EOF_byte = -1, this.EOF_code_point = -1, 0 > i && (i = 0), this.bufferExtSize = i;
            var r, n = 0;
            if (t) {
                var a = void 0;
                if (t instanceof Uint8Array ? (a = t, n = t.length) : (n = t.byteLength, a = new Uint8Array(t)), 0 == i) r = new Uint8Array(n);
                else {
                    var o = (n / i | 0) + 1;
                    r = new Uint8Array(o * i)
                }
                r.set(a)
            } else r = new Uint8Array(i);
            this.write_position = n, this._position = 0, this._bytes = r, this.data = new DataView(r.buffer), this.endian = e.BIG_ENDIAN
        }
        return Object.defineProperty(i.prototype, "endian", {
            get: function() {
                return 0 == this.$endian ? e.LITTLE_ENDIAN : e.BIG_ENDIAN
            },
            set: function(t) {
                this.$endian = t == e.LITTLE_ENDIAN ? 0 : 1
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.setArrayBuffer = function(t) {}, Object.defineProperty(i.prototype, "readAvailable", {
            get: function() {
                return this.write_position - this._position
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "buffer", {
            get: function() {
                return this.data.buffer.slice(0, this.write_position)
            },
            set: function(t) {
                var e, i = t.byteLength,
                    r = new Uint8Array(t),
                    n = this.bufferExtSize;
                if (0 == n) e = new Uint8Array(i);
                else {
                    var a = (i / n | 0) + 1;
                    e = new Uint8Array(a * n)
                }
                e.set(r), this.write_position = i, this._bytes = e, this.data = new DataView(e.buffer)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "rawBuffer", {
            get: function() {
                return this.data.buffer
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "bytes", {
            get: function() {
                return this._bytes
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "dataView", {
            get: function() {
                return this.data
            },
            set: function(t) {
                this.buffer = t.buffer
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "bufferOffset", {
            get: function() {
                return this.data.byteOffset
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "position", {
            get: function() {
                return this._position
            },
            set: function(t) {
                this._position = t, t > this.write_position && (this.write_position = t)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "length", {
            get: function() {
                return this.write_position
            },
            set: function(t) {
                this.write_position = t, this.data.byteLength > t && (this._position = t), this._validateBuffer(t)
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype._validateBuffer = function(t) {
            if (this.data.byteLength < t) {
                var e = this.bufferExtSize,
                    i = void 0;
                if (0 == e) i = new Uint8Array(t);
                else {
                    var r = ((t / e >> 0) + 1) * e;
                    i = new Uint8Array(r)
                }
                i.set(this._bytes), this._bytes = i, this.data = new DataView(i.buffer)
            }
        }, Object.defineProperty(i.prototype, "bytesAvailable", {
            get: function() {
                return this.data.byteLength - this._position
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.clear = function() {
            var t = new ArrayBuffer(this.bufferExtSize);
            this.data = new DataView(t), this._bytes = new Uint8Array(t), this._position = 0, this.write_position = 0
        }, i.prototype.readBoolean = function() {
            return this.validate(1) ? !!this._bytes[this.position++] : void 0
        }, i.prototype.readByte = function() {
            return this.validate(1) ? this.data.getInt8(this.position++) : void 0
        }, i.prototype.readBytes = function(e, i, r) {
            if (void 0 === i && (i = 0), void 0 === r && (r = 0), e) {
                var n = this._position,
                    a = this.write_position - n;
                if (0 > a) return void t.$error(1025);
                if (0 == r) r = a;
                else if (r > a) return void t.$error(1025);
                var o = e._position;
                e._position = 0, e.validateBuffer(i + r), e._position = o, e._bytes.set(this._bytes.subarray(n, n + r), i), this.position += r
            }
        }, i.prototype.readDouble = function() {
            if (this.validate(8)) {
                var t = this.data.getFloat64(this._position, 0 == this.$endian);
                return this.position += 8, t
            }
        }, i.prototype.readFloat = function() {
            if (this.validate(4)) {
                var t = this.data.getFloat32(this._position, 0 == this.$endian);
                return this.position += 4, t
            }
        }, i.prototype.readInt = function() {
            if (this.validate(4)) {
                var t = this.data.getInt32(this._position, 0 == this.$endian);
                return this.position += 4, t
            }
        }, i.prototype.readShort = function() {
            if (this.validate(2)) {
                var t = this.data.getInt16(this._position, 0 == this.$endian);
                return this.position += 2, t
            }
        }, i.prototype.readUnsignedByte = function() {
            return this.validate(1) ? this._bytes[this.position++] : void 0
        }, i.prototype.readUnsignedInt = function() {
            if (this.validate(4)) {
                var t = this.data.getUint32(this._position, 0 == this.$endian);
                return this.position += 4, t
            }
        }, i.prototype.readUnsignedShort = function() {
            if (this.validate(2)) {
                var t = this.data.getUint16(this._position, 0 == this.$endian);
                return this.position += 2, t
            }
        }, i.prototype.readUTF = function() {
            var t = this.readUnsignedShort();
            return t > 0 ? this.readUTFBytes(t) : ""
        }, i.prototype.readUTFBytes = function(t) {
            if (this.validate(t)) {
                var e = this.data,
                    i = new Uint8Array(e.buffer, e.byteOffset + this._position, t);
                return this.position += t, this.decodeUTF8(i)
            }
        }, i.prototype.writeBoolean = function(t) {
            this.validateBuffer(1), this._bytes[this.position++] = +t
        }, i.prototype.writeByte = function(t) {
            this.validateBuffer(1), this._bytes[this.position++] = 255 & t
        }, i.prototype.writeBytes = function(t, e, i) {
            void 0 === e && (e = 0), void 0 === i && (i = 0);
            var r;
            0 > e || 0 > i || (r = 0 == i ? t.length - e : Math.min(t.length - e, i), r > 0 && (this.validateBuffer(r), this._bytes.set(t._bytes.subarray(e, e + r), this._position), this.position = this._position + r))
        }, i.prototype.writeDouble = function(t) {
            this.validateBuffer(8), this.data.setFloat64(this._position, t, 0 == this.$endian), this.position += 8
        }, i.prototype.writeFloat = function(t) {
            this.validateBuffer(4), this.data.setFloat32(this._position, t, 0 == this.$endian), this.position += 4
        }, i.prototype.writeInt = function(t) {
            this.validateBuffer(4), this.data.setInt32(this._position, t, 0 == this.$endian), this.position += 4
        }, i.prototype.writeShort = function(t) {
            this.validateBuffer(2), this.data.setInt16(this._position, t, 0 == this.$endian), this.position += 2
        }, i.prototype.writeUnsignedInt = function(t) {
            this.validateBuffer(4), this.data.setUint32(this._position, t, 0 == this.$endian), this.position += 4
        }, i.prototype.writeUnsignedShort = function(t) {
            this.validateBuffer(2), this.data.setUint16(this._position, t, 0 == this.$endian), this.position += 2
        }, i.prototype.writeUTF = function(t) {
            var e = this.encodeUTF8(t),
                i = e.length;
            this.validateBuffer(2 + i), this.data.setUint16(this._position, i, 0 == this.$endian), this.position += 2, this._writeUint8Array(e, !1)
        }, i.prototype.writeUTFBytes = function(t) {
            this._writeUint8Array(this.encodeUTF8(t))
        }, i.prototype.toString = function() {
            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable
        }, i.prototype._writeUint8Array = function(t, e) {
            void 0 === e && (e = !0);
            var i = this._position,
                r = i + t.length;
            e && this.validateBuffer(r), this.bytes.set(t, i), this.position = r
        }, i.prototype.validate = function(e) {
            var i = this._bytes.length;
            return i > 0 && this._position + e <= i ? !0 : void t.$error(1025)
        }, i.prototype.validateBuffer = function(t) {
            this.write_position = t > this.write_position ? t : this.write_position, t += this._position, this._validateBuffer(t)
        }, i.prototype.encodeUTF8 = function(t) {
            for (var e = 0, i = this.stringToCodePoints(t), r = []; i.length > e;) {
                var n = i[e++];
                if (this.inRange(n, 55296, 57343)) this.encoderError(n);
                else if (this.inRange(n, 0, 127)) r.push(n);
                else {
                    var a = void 0,
                        o = void 0;
                    for (this.inRange(n, 128, 2047) ? (a = 1, o = 192) : this.inRange(n, 2048, 65535) ? (a = 2, o = 224) : this.inRange(n, 65536, 1114111) && (a = 3, o = 240), r.push(this.div(n, Math.pow(64, a)) + o); a > 0;) {
                        var s = this.div(n, Math.pow(64, a - 1));
                        r.push(128 + s % 64), a -= 1
                    }
                }
            }
            return new Uint8Array(r)
        }, i.prototype.decodeUTF8 = function(t) {
            for (var e, i = !1, r = 0, n = "", a = 0, o = 0, s = 0, h = 0; t.length > r;) {
                var c = t[r++];
                if (c == this.EOF_byte) e = 0 != o ? this.decoderError(i) : this.EOF_code_point;
                else if (0 == o) this.inRange(c, 0, 127) ? e = c : (this.inRange(c, 194, 223) ? (o = 1, h = 128, a = c - 192) : this.inRange(c, 224, 239) ? (o = 2, h = 2048, a = c - 224) : this.inRange(c, 240, 244) ? (o = 3, h = 65536, a = c - 240) : this.decoderError(i), a *= Math.pow(64, o), e = null);
                else if (this.inRange(c, 128, 191))
                    if (s += 1, a += (c - 128) * Math.pow(64, o - s), s !== o) e = null;
                    else {
                        var l = a,
                            u = h;
                        a = 0, o = 0, s = 0, h = 0, e = this.inRange(l, u, 1114111) && !this.inRange(l, 55296, 57343) ? l : this.decoderError(i, c)
                    }
                else a = 0, o = 0, s = 0, h = 0, r--, e = this.decoderError(i, c);
                null !== e && e !== this.EOF_code_point && (65535 >= e ? e > 0 && (n += String.fromCharCode(e)) : (e -= 65536, n += String.fromCharCode(55296 + (e >> 10 & 1023)), n += String.fromCharCode(56320 + (1023 & e))))
            }
            return n
        }, i.prototype.encoderError = function(e) {
            t.$error(1026, e)
        }, i.prototype.decoderError = function(e, i) {
            return e && t.$error(1027), i || 65533
        }, i.prototype.inRange = function(t, e, i) {
            return t >= e && i >= t
        }, i.prototype.div = function(t, e) {
            return Math.floor(t / e)
        }, i.prototype.stringToCodePoints = function(t) {
            for (var e = [], i = 0, r = t.length; i < t.length;) {
                var n = t.charCodeAt(i);
                if (this.inRange(n, 55296, 57343))
                    if (this.inRange(n, 56320, 57343)) e.push(65533);
                    else if (i == r - 1) e.push(65533);
                else {
                    var a = t.charCodeAt(i + 1);
                    if (this.inRange(a, 56320, 57343)) {
                        var o = 1023 & n,
                            s = 1023 & a;
                        i += 1, e.push(65536 + (o << 10) + s)
                    } else e.push(65533)
                } else e.push(n);
                i += 1
            }
            return e
        }, i
    }();
    t.ByteArray = i, __reflect(i.prototype, "egret.ByteArray")
}(egret || (egret = {}));
var egret;
! function(t) {
    t.BitmapFillMode = {
        REPEAT: "repeat",
        SCALE: "scale",
        CLIP: "clip"
    }
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t, e, i) {
        var r = t.prototype;
        Object.defineProperty(r, "__class__", {
            value: e,
            enumerable: !1,
            writable: !0
        });
        var n = [e];
        i && (n = n.concat(i));
        var a = r.__types__;
        if (r.__types__)
            for (var o = a.length, s = 0; o > s; s++) {
                var h = a[s]; - 1 == n.indexOf(h) && n.push(h)
            }
        Object.defineProperty(r, "__types__", {
            value: n,
            enumerable: !1,
            writable: !0
        })
    }
    t.registerClass = e
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function(e) {
        function i() {
            var i = e.call(this) || this;
            return i.$stageWidth = 0, i.$stageHeight = 0, i.$scaleMode = t.StageScaleMode.SHOW_ALL, i.$orientation = t.OrientationMode.AUTO, i.$maxTouches = 99, i.$stage = i, i.$nestLevel = 1, i
        }
        return __extends(i, e), i.prototype.createNativeDisplayObject = function() {
            this.$nativeDisplayObject = new egret_native.NativeDisplayObject(13)
        }, Object.defineProperty(i.prototype, "frameRate", {
            get: function() {
                return t.ticker.$frameRate
            },
            set: function(e) {
                t.ticker.$setFrameRate(e)
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "stageWidth", {
            get: function() {
                return this.$stageWidth
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "stageHeight", {
            get: function() {
                return this.$stageHeight
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.invalidate = function() {
            t.sys.$invalidateRenderFlag = !0
        }, i.prototype.registerImplementation = function(e, i) {
            t.registerImplementation(e, i)
        }, i.prototype.getImplementation = function(e) {
            return t.getImplementation(e)
        }, Object.defineProperty(i.prototype, "scaleMode", {
            get: function() {
                return this.$scaleMode
            },
            set: function(t) {
                this.$scaleMode != t && (this.$scaleMode = t, this.$screen.updateScreenSize())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "orientation", {
            get: function() {
                return this.$orientation
            },
            set: function(t) {
                this.$orientation != t && (this.$orientation = t, this.$screen.updateScreenSize())
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "textureScaleFactor", {
            get: function() {
                return t.$TextureScaleFactor
            },
            set: function(e) {
                t.$TextureScaleFactor = e
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "maxTouches", {
            get: function() {
                return this.$maxTouches
            },
            set: function(t) {
                this.$maxTouches != t && (this.$maxTouches = t, this.$screen.updateMaxTouches())
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.setContentSize = function(t, e) {
            this.$screen.setContentSize(t, e)
        }, i
    }(t.DisplayObjectContainer);
    t.Stage = e, __reflect(e.prototype, "egret.Stage")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return Object.defineProperty(t, "logLevel", {
            set: function(t) {},
            enumerable: !0,
            configurable: !0
        }), t.ALL = "all", t.DEBUG = "debug", t.INFO = "info", t.WARN = "warn", t.ERROR = "error", t.OFF = "off", t
    }();
    t.Logger = e, __reflect(e.prototype, "egret.Logger")
}(egret || (egret = {}));
var egret;
! function(t) {
    var e = function() {
        function t() {}
        return t.isNumber = function(t) {
            return "number" == typeof t && !isNaN(t)
        }, t.sin = function(e) {
            var i = Math.floor(e),
                r = i + 1,
                n = t.sinInt(i);
            if (i == e) return n;
            var a = t.sinInt(r);
            return (e - i) * a + (r - e) * n
        }, t.sinInt = function(t) {
            return t %= 360, 0 > t && (t += 360), egret_sin_map[t]
        }, t.cos = function(e) {
            var i = Math.floor(e),
                r = i + 1,
                n = t.cosInt(i);
            if (i == e) return n;
            var a = t.cosInt(r);
            return (e - i) * a + (r - e) * n
        }, t.cosInt = function(t) {
            return t %= 360, 0 > t && (t += 360), egret_cos_map[t]
        }, t
    }();
    t.NumberUtils = e, __reflect(e.prototype, "egret.NumberUtils")
}(egret || (egret = {}));
for (var egret_sin_map = {}, egret_cos_map = {}, DEG_TO_RAD = Math.PI / 180, NumberUtils_i = 0; 360 > NumberUtils_i; NumberUtils_i++) egret_sin_map[NumberUtils_i] = Math.sin(NumberUtils_i * DEG_TO_RAD), egret_cos_map[NumberUtils_i] = Math.cos(NumberUtils_i * DEG_TO_RAD);
egret_sin_map[90] = 1, egret_cos_map[90] = 0, egret_sin_map[180] = 0, egret_cos_map[180] = -1, egret_sin_map[270] = -1, egret_cos_map[270] = 0, Function.prototype.bind || (Function.prototype.bind = function(t) {
    "function" != typeof this && egret.$error(1029);
    var e = Array.prototype.slice.call(arguments, 1),
        i = this,
        r = function() {},
        n = function() {
            return i.apply(this instanceof r && t ? this : t, e.concat(Array.prototype.slice.call(arguments)))
        };
    return r.prototype = this.prototype, n.prototype = new r, n
});
var egret;
! function(t) {
    var e = function(e) {
        function i(t, i) {
            void 0 === i && (i = 0);
            var r = e.call(this) || this;
            return r._delay = 0, r._currentCount = 0, r._running = !1, r.updateInterval = 1e3, r.lastCount = 1e3, r.lastTimeStamp = 0, r.delay = t, r.repeatCount = 0 | +i, r
        }
        return __extends(i, e), Object.defineProperty(i.prototype, "delay", {
            get: function() {
                return this._delay
            },
            set: function(t) {
                1 > t && (t = 1), this._delay != t && (this._delay = t, this.lastCount = this.updateInterval = Math.round(60 * t))
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "currentCount", {
            get: function() {
                return this._currentCount
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(i.prototype, "running", {
            get: function() {
                return this._running
            },
            enumerable: !0,
            configurable: !0
        }), i.prototype.reset = function() {
            this.stop(), this._currentCount = 0
        }, i.prototype.start = function() {
            this._running || (this.lastCount = this.updateInterval, this.lastTimeStamp = t.getTimer(), t.ticker.$startTick(this.$update, this), this._running = !0)
        }, i.prototype.stop = function() {
            this._running && (t.stopTick(this.$update, this), this._running = !1)
        }, i.prototype.$update = function(e) {
            var i = e - this.lastTimeStamp;
            if (i >= this._delay) this.lastCount = this.updateInterval;
            else {
                if (this.lastCount -= 1e3, this.lastCount > 0) return !1;
                this.lastCount += this.updateInterval
            }
            this.lastTimeStamp = e, this._currentCount++;
            var r = this.repeatCount > 0 && this._currentCount >= this.repeatCount;
            return (0 == this.repeatCount || this._currentCount <= this.repeatCount) && t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER), r && (this.stop(), t.TimerEvent.dispatchTimerEvent(this, t.TimerEvent.TIMER_COMPLETE)), !1
        }, i
    }(t.EventDispatcher);
    t.Timer = e, __reflect(e.prototype, "egret.Timer")
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    function e(e, i) {
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        t.$callLaterFunctionList.push(e), t.$callLaterThisList.push(i), t.$callLaterArgsList.push(r)
    }

    function i(e, i) {
        for (var r = [], n = 2; n < arguments.length; n++) r[n - 2] = arguments[n];
        t.$callAsyncFunctionList.push(e), t.$callAsyncThisList.push(i), t.$callAsyncArgsList.push(r)
    }
    t.$callLaterFunctionList = [], t.$callLaterThisList = [], t.$callLaterArgsList = [], t.callLater = e, t.$callAsyncFunctionList = [], t.$callAsyncThisList = [], t.$callAsyncArgsList = [], t.$callAsync = i
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t, e, i) {
        for (var r = [], n = 3; n < arguments.length; n++) r[n - 3] = arguments[n];
        var a, o = t.prototype;
        t.hasOwnProperty("__sets__") || Object.defineProperty(t, "__sets__", {
            value: {}
        }), a = t.__sets__;
        var s = a[i];
        if (s) return s.apply(e, r);
        var h = Object.getPrototypeOf(o);
        if (null != h) {
            for (; !h.hasOwnProperty(i);)
                if (h = Object.getPrototypeOf(h), null == h) return;
            s = Object.getOwnPropertyDescriptor(h, i).set, a[i] = s, s.apply(e, r)
        }
    }

    function i(t, e, i) {
        var r, n = t.prototype;
        t.hasOwnProperty("__gets__") || Object.defineProperty(t, "__gets__", {
            value: {}
        }), r = t.__gets__;
        var a = r[i];
        if (a) return a.call(e);
        var o = Object.getPrototypeOf(n);
        if (null != o) {
            for (; !o.hasOwnProperty(i);)
                if (o = Object.getPrototypeOf(o), null == o) return;
            return a = Object.getOwnPropertyDescriptor(o, i).get, r[i] = a, a.call(e)
        }
    }
    t.superSetter = e, t.superGetter = i
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t) {
        if (!t) return null;
        var e = i[t];
        if (e) return e;
        var r = t.split("."),
            n = r.length;
        e = global;
        for (var a = 0; n > a; a++) {
            var o = r[a];
            if (e = e[o], !e) return null
        }
        return i[t] = e, e
    }
    var i = {};
    t.getDefinitionByName = e
}(egret || (egret = {}));
var egret;
! function(t) {}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t) {
        var e = typeof t;
        if (!t || "object" != e && !t.prototype) return e;
        var i = t.prototype ? t.prototype : Object.getPrototypeOf(t);
        if (i.hasOwnProperty("__class__")) return i.__class__;
        var r = i.constructor.toString().trim(),
            n = r.indexOf("("),
            a = r.substring(9, n);
        return Object.defineProperty(i, "__class__", {
            value: a,
            enumerable: !1,
            writable: !0
        }), a
    }
    t.getQualifiedClassName = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(e) {
        if (!e || "object" != typeof e && !e.prototype) return null;
        var i = e.prototype ? e.prototype : Object.getPrototypeOf(e),
            r = Object.getPrototypeOf(i);
        if (!r) return null;
        var n = t.getQualifiedClassName(r.constructor);
        return n ? n : null
    }
    t.getQualifiedSuperclassName = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e() {
        return Date.now() - t.sys.$START_TIME
    }
    t.getTimer = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(e) {
        var i = t.getDefinitionByName(e);
        return i ? !0 : !1
    }
    t.hasDefinition = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t, e) {
        if (!t || "object" != typeof t) return !1;
        var i = Object.getPrototypeOf(t),
            r = i ? i.__types__ : null;
        return r ? -1 !== r.indexOf(e) : !1
    }
    t.is = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(e, i) {
        t.ticker.$startTick(e, i)
    }
    t.startTick = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(e, i) {
        t.ticker.$stopTick(e, i)
    }
    t.stopTick = e
}(egret || (egret = {}));
var egret;
! function(t) {
    function e(t) {
        0 > t && (t = 0), t > 16777215 && (t = 16777215);
        for (var e = t.toString(16).toUpperCase(); e.length > 6;) e = e.slice(1, e.length);
        for (; e.length < 6;) e = "0" + e;
        return "#" + e
    }
    t.toColorString = e
}(egret || (egret = {}));
var egret;
! function(t) {
    var e;
    ! function(t) {}(e = t.sys || (t.sys = {}))
}(egret || (egret = {}));