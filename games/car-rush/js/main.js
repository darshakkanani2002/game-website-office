(function() {
    var a = "undefined" !== typeof window && "undefined" !== typeof window.document ? window.document : {},
        c = "undefined" !== typeof module && module.exports,
        b = "undefined" !== typeof Element && "ALLOW_KEYBOARD_INPUT" in Element,
        d = function() {
            for (var f, g = ["requestFullscreen exitFullscreen fullscreenElement fullscreenEnabled fullscreenchange fullscreenerror".split(" "), "webkitRequestFullscreen webkitExitFullscreen webkitFullscreenElement webkitFullscreenEnabled webkitfullscreenchange webkitfullscreenerror".split(" "),
                    "webkitRequestFullScreen webkitCancelFullScreen webkitCurrentFullScreenElement webkitCancelFullScreen webkitfullscreenchange webkitfullscreenerror".split(" "), "mozRequestFullScreen mozCancelFullScreen mozFullScreenElement mozFullScreenEnabled mozfullscreenchange mozfullscreenerror".split(" "), "msRequestFullscreen msExitFullscreen msFullscreenElement msFullscreenEnabled MSFullscreenChange MSFullscreenError".split(" ")
                ], b = 0, d = g.length, e = {}; b < d; b++)
                if ((f = g[b]) && f[1] in a) {
                    for (b = 0; b < f.length; b++) e[g[0][b]] =
                        f[b];
                    return e
                }
            return !1
        }(),
        e = {
            change: d.fullscreenchange,
            error: d.fullscreenerror
        },
        h = {
            request: function(f) {
                var g = d.requestFullscreen;
                f = f || a.documentElement;
                if (/5\.1[.\d]* Safari/.test(navigator.userAgent)) f[g]();
                else f[g](b && Element.ALLOW_KEYBOARD_INPUT)
            },
            exit: function() {
                a[d.exitFullscreen]()
            },
            toggle: function(a) {
                this.isFullscreen ? this.exit() : this.request(a)
            },
            onchange: function(a) {
                this.on("change", a)
            },
            onerror: function(a) {
                this.on("error", a)
            },
            on: function(f, b) {
                var g = e[f];
                g && a.addEventListener(g, b, !1)
            },
            off: function(f,
                b) {
                var g = e[f];
                g && a.removeEventListener(g, b, !1)
            },
            raw: d
        };
    d ? (Object.defineProperties(h, {
        isFullscreen: {
            get: function() {
                return !!a[d.fullscreenElement]
            }
        },
        element: {
            enumerable: !0,
            get: function() {
                return a[d.fullscreenElement]
            }
        },
        enabled: {
            enumerable: !0,
            get: function() {
                return !!a[d.fullscreenEnabled]
            }
        }
    }), c ? module.exports = h : window.screenfull = h) : c ? module.exports = !1 : window.screenfull = !1
})();
var s_iScaleFactor = 1,
    s_iOffsetX, s_iOffsetY, s_bIsIphone = !1;
(function(a) {
    (jQuery.browser = jQuery.browser || {}).mobile = /android|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(ad|hone|od)|iris|kindle|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|symbian|tablet|treo|up\.(browser|link)|vodafone|wap|webos|windows (ce|phone)|xda|xiino/i.test(a) || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|e\-|e\/|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(di|rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|xda(\-|2|g)|yas\-|your|zeto|zte\-/i.test(a.substr(0,
        4))
})(navigator.userAgent || navigator.vendor || window.opera);
$(window).resize(function() {
    sizeHandler()
});

function trace(a) {
    console.log(a)
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
        var h = b.createElement("div");
        h.id = "vpw-test-d";
        h.style.cssText = "position:absolute;top:-1000px";
        h.innerHTML = "<style>@media(" + c + ":" + d["client" + a] + "px){body#vpw-test-b div#vpw-test-d{" + c + ":7px!important}}</style>";
        e.appendChild(h);
        d.insertBefore(e, b.head);
        a = 7 == h["offset" + a] ? d["client" + a] : window["inner" + a];
        d.removeChild(e)
    } else a = window["inner" + a];
    return a
}
window.addEventListener("orientationchange", onOrientationChange);

function onOrientationChange() {
    window.matchMedia("(orientation: portrait)").matches && sizeHandler();
    window.matchMedia("(orientation: landscape)").matches && sizeHandler()
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

function inIframe() {
    try {
        return window.self !== window.top
    } catch (a) {
        return !0
    }
}

function sizeHandler() {
    window.scrollTo(0, 1);
    if ($("#canvas")) {
        var a = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? getIOSWindowHeight() : getSize("Height");
        var c = getSize("Width");
        _checkOrientation(c, a);
        var b = Math.min(a / CANVAS_HEIGHT, c / CANVAS_WIDTH),
            d = CANVAS_WIDTH * b;
        b *= CANVAS_HEIGHT;
        if (b < a) {
            var e = a - b;
            b += e;
            d += CANVAS_WIDTH / CANVAS_HEIGHT * e
        } else d < c && (e = c - d, d += e, b += CANVAS_HEIGHT / CANVAS_WIDTH * e);
        e = a / 2 - b / 2;
        var h = c / 2 - d / 2,
            f = CANVAS_WIDTH / d;
        if (h * f < -EDGEBOARD_X || e * f < -EDGEBOARD_Y) b = Math.min(a / (CANVAS_HEIGHT - 2 *
            EDGEBOARD_Y), c / (CANVAS_WIDTH - 2 * EDGEBOARD_X)), d = CANVAS_WIDTH * b, b *= CANVAS_HEIGHT, e = (a - b) / 2, h = (c - d) / 2, f = CANVAS_WIDTH / d;
        s_iOffsetX = -1 * h * f;
        s_iOffsetY = -1 * e * f;
        0 <= e && (s_iOffsetY = 0);
        0 <= h && (s_iOffsetX = 0);
        null !== s_oInterface && s_oInterface.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oWorldMenu && s_oWorldMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        null !== s_oMenu && s_oMenu.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_bIsIphone ? (canvas = document.getElementById("canvas"), s_oStage.canvas.width = 2 * d, s_oStage.canvas.height =
            2 * b, canvas.style.width = d + "px", canvas.style.height = b + "px", s_iScaleFactor = 2 * Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor) : s_bMobile || isChrome() ? ($("#canvas").css("width", d + "px"), $("#canvas").css("height", b + "px")) : (s_oStage.canvas.width = d, s_oStage.canvas.height = b, s_iScaleFactor = Math.min(d / CANVAS_WIDTH, b / CANVAS_HEIGHT), s_oStage.scaleX = s_oStage.scaleY = s_iScaleFactor);
        0 > e ? $("#canvas").css("top", e + "px") : $("#canvas").css("top", "0px");
        $("#canvas").css("left", h + "px");
        fullscreenHandler()
    }
}

function _checkOrientation(a, c) {
    s_bMobile && ENABLE_CHECK_ORIENTATION && (a > c ? "landscape" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"), s_oMain.stopUpdate()) : "portrait" === $(".orientation-msg-container").attr("data-orientation") ? ($(".orientation-msg-container").css("display", "none"), s_oMain.startUpdate()) : ($(".orientation-msg-container").css("display", "block"),
        s_oMain.stopUpdate()))
}

function playSound(a, c, b) {
    return !1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile ? (s_aSounds[a].play(), s_aSounds[a].volume(c), s_aSounds[a].loop(b), s_aSounds[a]) : null
}

function stopSound(a) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.stop()
}

function setVolume(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.volume(c)
}

function setMute(a, c) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.mute(c)
}

function fadeSound(a, c, b, d) {
    !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || a.fade(c, b, d)
}

function soundPlaying(a) {
    if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) return a.playing()
}

function createBitmap(a, c, b) {
    var d = new createjs.Bitmap(a),
        e = new createjs.Shape;
    c && b ? e.graphics.beginFill("#fff").drawRect(0, 0, c, b) : e.graphics.beginFill("#ff0").drawRect(0, 0, a.width, a.height);
    d.hitArea = e;
    return d
}

function createSprite(a, c, b, d, e, h) {
    a = null !== c ? new createjs.Sprite(a, c) : new createjs.Sprite(a);
    c = new createjs.Shape;
    c.graphics.beginFill("#000000").drawRect(-b, -d, e, h);
    a.hitArea = c;
    return a
}

function pad(a, c, b) {
    a += "";
    return a.length >= c ? a : Array(c - a.length + 1).join(b || "0") + a
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
    a = parseFloat(a - 60 * c).toFixed(1);
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

function calculateIntersection(a, c) {
    var b, d, e, h;
    var f = a.x + (b = a.width / 2);
    var g = a.y + (d = a.height / 2);
    var l = c.x + (e = c.width / 2);
    var m = c.y + (h = c.height / 2);
    f = Math.abs(f - l) - (b + e);
    g = Math.abs(g - m) - (d + h);
    return 0 > f && 0 > g ? (f = Math.min(Math.min(a.width, c.width), -f), g = Math.min(Math.min(a.height, c.height), -g), {
        x: Math.max(a.x, c.x),
        y: Math.max(a.y, c.y),
        width: f,
        height: g,
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
            h;
        for (h = 0; h < e; h++) {
            var f = getBounds(d[h], 1);
            f.x < b.x && (b.x = f.x);
            f.y < b.y && (b.y = f.y);
            f.x + f.width > b.x2 && (b.x2 = f.x + f.width);
            f.y + f.height > b.y2 && (b.y2 = f.y + f.height)
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
            e =
                a.sourceRect || a.image;
            h = e.width * c;
            var g = e.height * c
        } else if (a instanceof createjs.Sprite)
            if (a.spriteSheet._frames && a.spriteSheet._frames[a.currentFrame] && a.spriteSheet._frames[a.currentFrame].image) {
                e = a.spriteSheet.getFrame(a.currentFrame);
                h = e.rect.width;
                g = e.rect.height;
                d = e.regX;
                var l = e.regY
            } else b.x = a.x || 0, b.y = a.y || 0;
        else b.x = a.x || 0, b.y = a.y || 0;
        d = d || 0;
        h = h || 0;
        l = l || 0;
        g = g || 0;
        b.regX = d;
        b.regY = l;
        e = a.localToGlobal(0 - d, 0 - l);
        f = a.localToGlobal(h - d, g - l);
        h = a.localToGlobal(h - d, 0 - l);
        d = a.localToGlobal(0 - d, g - l);
        b.x =
            Math.min(Math.min(Math.min(e.x, f.x), h.x), d.x);
        b.y = Math.min(Math.min(Math.min(e.y, f.y), h.y), d.y);
        b.width = Math.max(Math.max(Math.max(e.x, f.x), h.x), d.x) - b.x;
        b.height = Math.max(Math.max(Math.max(e.y, f.y), h.y), d.y) - b.y
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

function getParamValue(a) {
    for (var c = window.location.search.substring(1).split("&"), b = 0; b < c.length; b++) {
        var d = c[b].split("=");
        if (d[0] == a) return d[1]
    }
}
var Util = {
    timestamp: function() {
        return (new Date).getTime()
    },
    toInt: function(a, c) {
        if (null !== a) {
            var b = parseInt(a, 10);
            if (!isNaN(b)) return b
        }
        return Util.toInt(c, 0)
    },
    toFloat: function(a, c) {
        if (null !== a) {
            var b = parseFloat(a);
            if (!isNaN(b)) return b
        }
        return Util.toFloat(c, 0)
    },
    limit: function(a, c, b) {
        return Math.max(c, Math.min(a, b))
    },
    randomInt: function(a, c) {
        return Math.round(Util.interpolate(a, c, Math.random()))
    },
    randomChoice: function(a) {
        return a[Util.randomInt(0, a.length - 1)]
    },
    percentRemaining: function(a, c) {
        return a %
            c / c
    },
    accelerate: function(a, c, b) {
        return a + c * b
    },
    interpolate: function(a, c, b) {
        return a + (c - a) * b
    },
    easeIn: function(a, c, b) {
        return a + (c - a) * Math.pow(b, 2)
    },
    easeOut: function(a, c, b) {
        return a + (c - a) * (1 - Math.pow(1 - b, 2))
    },
    easeInOut: function(a, c, b) {
        return a + (c - a) * (-Math.cos(b * Math.PI) / 2 + .5)
    },
    exponentialFog: function(a, c) {
        return 1 / Math.pow(Math.E, a * a * c)
    },
    increase: function(a, c, b) {
        for (a += c; a >= b;) a -= b;
        for (; 0 > a;) a += b;
        return a
    },
    project: function(a, c, b, d, e) {
        a.camera.x = -c;
        a.camera.y = a.world.y - b;
        a.camera.z = a.world.z - d;
        a.screen.scale =
            e / a.camera.z;
        a.screen.x = Math.round(HALF_CANVAS_WIDTH + a.screen.scale * a.camera.x * HALF_CANVAS_WIDTH);
        a.screen.y = Math.round(HALF_CANVAS_HEIGHT - a.screen.scale * a.camera.y * HALF_CANVAS_HEIGHT);
        a.screen.w = Math.round(a.screen.scale * ROAD_PER_HALF_CANVAS_WIDTH)
    },
    overlap: function(a, c, b, d, e) {
        e = .5 * (e || 1);
        return !(a + c * e < b - d * e || a - c * e > b + d * e)
    }
};

function fullscreenHandler() {
    s_bFullscreen = screen.height < window.innerHeight + 3 && screen.height > window.innerHeight - 3 ? !0 : !1;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oWorldMenu && s_oWorldMenu.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
}
if (screenfull.enabled) screenfull.on("change", function() {
    s_bFullscreen = screenfull.isFullscreen;
    null !== s_oInterface && s_oInterface.resetFullscreenBut();
    null !== s_oWorldMenu && s_oWorldMenu.resetFullscreenBut();
    null !== s_oMenu && s_oMenu.resetFullscreenBut()
});

function extractHostname(a) {
    a = -1 < a.indexOf("://") ? a.split("/")[2] : a.split("/")[0];
    a = a.split(":")[0];
    return a = a.split("?")[0]
}

function extractRootDomain(a) {
    a = extractHostname(a);
    var c = a.split("."),
        b = c.length;
    2 < b && (a = c[b - 2] + "." + c[b - 1]);
    return a
}
var getClosestTop = function() {
        var a = window,
            c = !1;
        try {
            for (; a.parent.document !== a.document;)
                if (a.parent.document) a = a.parent;
                else {
                    c = !0;
                    break
                }
        } catch (b) {
            c = !0
        }
        return {
            topFrame: a,
            err: c
        }
    },
    getBestPageUrl = function(a) {
        var c = a.topFrame,
            b = "";
        if (a.err) try {
            try {
                b = window.top.location.href
            } catch (e) {
                var d = window.location.ancestorOrigins;
                b = d[d.length - 1]
            }
        } catch (e) {
            b = c.document.referrer
        } else b = c.location.href;
        return b
    },
    TOPFRAMEOBJ = getClosestTop(),
    PAGE_URL = getBestPageUrl(TOPFRAMEOBJ);

function seekAndDestroy() {
    return !0
}

function CSpriteLibrary() {
    var a, c, b, d, e, h;
    this.init = function(f, g, l) {
        b = c = 0;
        d = f;
        e = g;
        h = l;
        a = {}
    };
    this.addSprite = function(f, b) {
        a.hasOwnProperty(f) || (a[f] = {
            szPath: b,
            oSprite: new Image
        }, c++)
    };
    this.getSprite = function(f) {
        return a.hasOwnProperty(f) ? a[f].oSprite : null
    };
    this._onSpritesLoaded = function() {
        e.call(h)
    };
    this._onSpriteLoaded = function() {
        d.call(h);
        ++b == c && this._onSpritesLoaded()
    };
    this.loadSprites = function() {
        for (var f in a) a[f].oSprite.oSpriteLibrary = this, a[f].oSprite.onload = function() {
                this.oSpriteLibrary._onSpriteLoaded()
            },
            a[f].oSprite.src = a[f].szPath
    };
    this.getNumSprites = function() {
        return c
    }
}
var CANVAS_WIDTH = 1600,
    CANVAS_HEIGHT = 960,
    EDGEBOARD_X = 256,
    EDGEBOARD_Y = 100,
    FPS = 60,
    FPS_DT = 1 / FPS,
    FPS_TIME = 1E3 / FPS,
    DISABLE_SOUND_MOBILE = !1,
    GAME_NAME = "car_rush",
    PRIMARY_FONT = "ArialBold",
    SECONDARY_FONT = "Digital",
    STATE_LOADING = 0,
    STATE_MENU = 1,
    STATE_HELP = 1,
    STATE_GAME = 3,
    ON_MOUSE_DOWN = 0,
    ON_MOUSE_UP = 1,
    ON_MOUSE_OVER = 2,
    ON_MOUSE_OUT = 3,
    ON_DRAG_START = 4,
    ON_DRAG_END = 5,
    STATE_GAME_START = 0,
    STATE_GAME_RACE = 1,
    STATE_GAME_END = 2,
    KEY_UP = 38,
    KEY_DOWN = 40,
    KEY_RIGHT = 39,
    KEY_LEFT = 37,
    KEY_SPACE = 32,
    NUM_WORLDS = 3,
    NUM_TRACKS_PER_WORLD = 3,
    START_COUNTDOWN =
    3E3,
    FOV = 100,
    CAMERA_HEIGHT = 1E3,
    CAMERA_DEPTH = 1 / Math.tan(FOV / 2 * Math.PI / 180),
    PLAYER_Z_FROMCAMERA = CAMERA_HEIGHT * CAMERA_DEPTH,
    CAR_SIDEVIEW_OFFSET = .2,
    CAR_FARVIEW_OFFSET = 2600,
    CAR_CURVEVIEW_OFFSET = .4,
    PARALLAX_RATIO_X = 2,
    PARALLAX_RATIO_Y_0 = .004,
    PARALLAX_RATIO_Y_1 = .005,
    PLAYER_MAX_SPEED, PLAYER_ACCELERATION, PLAYER_DECELERATION, PLAYER_REAL_MAX_SPEED, CENTRIFUGAL_FORCE = .3,
    PLAYER_COLLIDER_WIDTH = .22,
    PLAYER_MIN_SPEED_DAMAGE, TERRAIN_MAX_INERTIA = .03,
    TERRAIN_INCREASE_INERTIA = .005,
    TERRAIN_DECREASE_INERTIA = .002,
    TERRAIN_ADHERENCE =
    1,
    DRAW_DISTANCE = 300,
    ROAD_WIDTH = 2E3,
    NUM_LANES = 4,
    SEGMENT_LENGTH = 200,
    RUMBLE_LENGTH = 3,
    TRACK_LENGTH, ROAD_BOUNDS = 2,
    FOG_DENSITY = 5,
    ROAD = {
        TYPE: {
            STANDARD: 0,
            CURVE_S: 1,
            BUMPS: 2,
            FINAL: 3
        },
        LENGTH: {
            NONE: 0,
            SHORT: 25,
            MEDIUM: 50,
            LONG: 100,
            EXTRALONG: 200
        },
        HILL: {
            NONE: 0,
            LOW: 20,
            MEDIUM: 40,
            HIGH: 60,
            VERYHIGH: 80
        },
        CURVE: {
            NONE: 0,
            EASY: 2,
            MEDIUM: 4,
            HARD: 6,
            VERYHARD: 8
        }
    },
    AMBIENT = {
        DISPOSITION: {
            PRECISE: 0,
            DENSITY: 1
        },
        SIDE: {
            LEFT: -1,
            RIGHT: 1,
            BOTH: 2
        }
    },
    COLORS = {
        LIGHT: {
            road: "#6B6B6B",
            grass: "#96a54b",
            rumble: "#555555",
            lane: "#CCCCCC"
        },
        DARK: {
            road: "#696969",
            grass: "#7e8b3e",
            rumble: "#BBBBBB"
        },
        START: {
            road: "white",
            grass: "white",
            rumble: "white"
        },
        FINISH: {
            road: "black",
            grass: "black",
            rumble: "black"
        }
    },
    SPRITES = {
        TREE1: {
            name: "tree1",
            collision: {
                center: 240,
                width: 70
            }
        },
        TREE2: {
            name: "tree2",
            collision: {
                center: 170,
                width: 140
            }
        },
        DEAD_TREE: {
            name: "dead_tree",
            collision: {
                center: 90,
                width: 15
            }
        },
        BUSH1: {
            name: "bush1",
            collision: {
                width: 50
            }
        },
        BUSH2: {
            name: "bush2",
            collision: {
                width: 50
            }
        },
        STUMP: {
            name: "stump",
            collision: {
                width: 70
            }
        },
        PALM_TREE: {
            name: "palm_tree",
            collision: {
                center: 156,
                width: 6
            }
        },
        COLUMN: {
            name: "column"
        },
        CACTUS1: {
            name: "cactus1",
            collision: {
                width: 100
            }
        },
        CACTUS2: {
            name: "cactus2",
            collision: {
                center: 48,
                width: 70
            }
        },
        SIGN_CURVE_RIGHT: {
            name: "sign_curve_right"
        },
        SIGN_CURVE_LEFT: {
            name: "sign_curve_left"
        },
        SIGN_INDICATION: {
            name: "sign_indication"
        },
        LAMP_LEFT: {
            name: "lamp_left",
            collision: {
                center: 5,
                width: 1
            }
        },
        LAMP_RIGHT: {
            name: "lamp_right",
            collision: {
                center: 75,
                width: 1
            }
        },
        HOUSE1: {
            name: "house1",
            collision: {
                width: 300
            }
        },
        HOUSE2: {
            name: "house2",
            collision: {
                width: 300
            }
        },
        BILLBOARD01: {
            name: "billboard01"
        },
        BILLBOARD02: {
            name: "billboard02"
        },
        BILLBOARD03: {
            name: "billboard03"
        },
        BILLBOARD04: {
            name: "billboard04"
        },
        BILLBOARD05: {
            name: "billboard05"
        },
        BOULDER: {
            name: "boulder",
            collision: {
                width: 600
            }
        },
        SEMI: {
            name: "semi"
        },
        BUS: {
            name: "bus"
        },
        CAR01: {
            name: "car01"
        },
        CAR02: {
            name: "car02"
        },
        CAR03: {
            name: "car03"
        },
        SCALE: .00375
    };
SPRITES.BILLBOARDS = [SPRITES.BILLBOARD01.name, SPRITES.BILLBOARD02.name, SPRITES.BILLBOARD03.name, SPRITES.BILLBOARD04.name, SPRITES.BILLBOARD05.name];
SPRITES.PLANTS = [SPRITES.TREE1.name, SPRITES.TREE2.name, SPRITES.DEAD_TREE.name, SPRITES.PALM_TREE.name, SPRITES.BUSH1.name, SPRITES.BUSH2.name, SPRITES.CACTUS1.name, SPRITES.STUMP.name, SPRITES.BOULDER.name];
SPRITES.CARS = [SPRITES.CAR01.name, SPRITES.CAR02.name, SPRITES.CAR03.name, SPRITES.SEMI.name, SPRITES.BUS.name];
var HALF_CANVAS_WIDTH = CANVAS_WIDTH / 2,
    HALF_CANVAS_HEIGHT = CANVAS_HEIGHT / 2,
    ROAD_PER_HALF_CANVAS_WIDTH = HALF_CANVAS_WIDTH * ROAD_WIDTH,
    ROAD_PER_SCALE_PER_HALF_CANVAS_WIDTH = SPRITES.SCALE * ROAD_PER_HALF_CANVAS_WIDTH,
    PLAYER_SPEED_CONVERSION_RATIO = PLAYER_REAL_MAX_SPEED / PLAYER_MAX_SPEED,
    ENABLE_FULLSCREEN, ENABLE_CHECK_ORIENTATION, POINTS_PER_SECONDS, AD_SHOW_COUNTER;
TEXT_GAMEOVER = "CONGRATULATION! YOU COMPLETED ALL TRACKS!";
TEXT_TIME_IS_UP = "TIME IS UP!";
TEXT_SCORE = "SCORE";
TEXT_GO = "GO!";
TEXT_SPEED_INDICATOR = "Km/h";
TEXT_SAVE_REMOVE = "THIS WILL REMOVE ALL YOUR ACHIEVEMENTS! DO YOU WANT TO PROCEED?";
TEXT_ARE_SURE = "ARE YOU SURE?";
TEXT_TRACK_COMPLETED = "TRACK COMPLETED";
TEXT_SELECT_WORLD = "SELECT THE WORLD YOU WANT TO PLAY";
TEXT_SELECT_TRACK = "SELECT TRACK";
TEXT_HELP1 = "USE ARROW KEY TO MOVE THE CAR: UP FOR ACCELERATION AND DOWN FOR BRAKE";
TEXT_HELP1_MOBILE = "USE BUTTONS TO MOVE THE CAR";
TEXT_HELP2 = "REACH THE END, BEFORE TIME GOES UP";
TEXT_IOS_PRIVATE = 'Your web browser does not support storing settings locally. In Safari, the most common cause of this is using "Private Browsing Mode". Some info may not save or some features may not work properly';
TEXT_SHARE_IMAGE = "200x200.jpg";
TEXT_SHARE_TITLE = "Congratulations!";
TEXT_SHARE_MSG1 = "You collected <strong>";
TEXT_SHARE_MSG2 = " points</strong>!<br><br>Share your score with your friends!";
TEXT_SHARE_SHARE1 = "My score is ";
TEXT_SHARE_SHARE2 = " points! Can you do better";

function CPreloader() {
    var a, c, b, d, e, h, f;
    this._init = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("progress_bar", "./sprites/progress_bar.png");
        s_oSpriteLibrary.loadSprites();
        f = new createjs.Container;
        s_oStage.addChild(f)
    };
    this.unload = function() {
        f.removeAllChildren()
    };
    this.hide = function() {
        var a = this;
        setTimeout(function() {
            createjs.Tween.get(h).to({
                alpha: 1
            }, 500).call(function() {
                a.unload();
                s_oMain.gotoMenu()
            })
        }, 1E3)
    };
    this._onImagesLoaded = function() {};
    this._onAllImagesLoaded = function() {
        this.attachSprites();
        s_oMain.preloaderReady()
    };
    this.attachSprites = function() {
        var g = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        f.addChild(g);
        g = s_oSpriteLibrary.getSprite("progress_bar");
        d = createBitmap(g);
        d.x = CANVAS_WIDTH / 2 - g.width / 2;
        d.y = CANVAS_HEIGHT - 170;
        f.addChild(d);
        a = g.width;
        c = g.height;
        e = new createjs.Shape;
        e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, 1, c);
        f.addChild(e);
        d.mask =
            e;
        b = new createjs.Text("", "30px Arial", "#fff");
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT - 125;
        b.shadow = new createjs.Shadow("#000", 2, 2, 2);
        b.textBaseline = "alphabetic";
        b.textAlign = "center";
        f.addChild(b);
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0;
        f.addChild(h)
    };
    this.refreshLoader = function(f) {
        b.text = f + "%";
        e.graphics.clear();
        f = Math.floor(f * a / 100);
        e.graphics.beginFill("rgba(255,255,255,0.01)").drawRect(d.x, d.y, f, c)
    };
    this._init()
}

function CMain(a) {
    var c, b = 0,
        d = 0,
        e = STATE_LOADING,
        h, f;
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
        createjs.Ticker.setFPS(FPS);
        navigator.userAgent.match(/Windows Phone/i) &&
            (DISABLE_SOUND_MOBILE = !0);
        s_oSpriteLibrary = new CSpriteLibrary;
        seekAndDestroy() ? h = new CPreloader : window.location.href = "#";
        s_oLocalStorage = new CLocalStorage(GAME_NAME)
    };
    this.preloaderReady = function() {
        this._loadImages();
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || this._initSounds();
        c = !0
    };
    this.soundLoaded = function() {
        b++;
        h.refreshLoader(Math.floor(b / d * 100));
        b === d && (h.unload(), isIOS() || playSound("menu_soundtrack", 1, !0), s_oMain.gotoMenu())
    };
    this._initSounds = function() {
        var a = [];
        a.push({
            path: "./sounds/",
            filename: "menu_soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "menu_soundtrack"
        });
        a.push({
            path: "./sounds/",
            filename: "game_soundtrack",
            loop: !0,
            volume: 1,
            ingamename: "game_soundtrack"
        });
        a.push({
            path: "./sounds/",
            filename: "press_button",
            loop: !1,
            volume: 1,
            ingamename: "click"
        });
        a.push({
            path: "./sounds/",
            filename: "1",
            loop: !1,
            volume: 1,
            ingamename: "1"
        });
        a.push({
            path: "./sounds/",
            filename: "2",
            loop: !1,
            volume: 1,
            ingamename: "2"
        });
        a.push({
            path: "./sounds/",
            filename: "3",
            loop: !1,
            volume: 1,
            ingamename: "3"
        });
        a.push({
            path: "./sounds/",
            filename: "go",
            loop: !1,
            volume: 1,
            ingamename: "go"
        });
        a.push({
            path: "./sounds/",
            filename: "arrive_lose",
            loop: !1,
            volume: 1,
            ingamename: "arrive_lose"
        });
        a.push({
            path: "./sounds/",
            filename: "arrive_win",
            loop: !1,
            volume: 1,
            ingamename: "arrive_win"
        });
        a.push({
            path: "./sounds/",
            filename: "sprint_start",
            loop: !1,
            volume: 1,
            ingamename: "sprint_start"
        });
        a.push({
            path: "./sounds/",
            filename: "crash",
            loop: !1,
            volume: 1,
            ingamename: "crash"
        });
        a.push({
            path: "./sounds/",
            filename: "brake",
            loop: !1,
            volume: 1,
            ingamename: "brake"
        });
        a.push({
            path: "./sounds/",
            filename: "engine",
            loop: !0,
            volume: 1,
            ingamename: "engine"
        });
        d += a.length;
        s_aSounds = [];
        for (var f = 0; f < a.length; f++) s_aSounds[a[f].ingamename] = new Howl({
            src: [a[f].path + a[f].filename + ".mp3", a[f].path + a[f].filename + ".ogg"],
            autoplay: !1,
            preload: !0,
            loop: a[f].loop,
            volume: a[f].volume,
            onload: s_oMain.soundLoaded
        })
    };
    this._loadImages = function() {
        s_oSpriteLibrary.init(this._onImagesLoaded, this._onAllImagesLoaded, this);
        s_oSpriteLibrary.addSprite("but_play", "./sprites/but_play.png");
        s_oSpriteLibrary.addSprite("msg_box",
            "./sprites/msg_box.png");
        s_oSpriteLibrary.addSprite("keys", "./sprites/keys.png");
        s_oSpriteLibrary.addSprite("star", "./sprites/star.png");
        s_oSpriteLibrary.addSprite("best_time", "./sprites/best_time.png");
        s_oSpriteLibrary.addSprite("timer", "./sprites/timer.png");
        s_oSpriteLibrary.addSprite("but_home", "./sprites/but_home.png");
        s_oSpriteLibrary.addSprite("logo_menu", "./sprites/logo_menu.png");
        s_oSpriteLibrary.addSprite("bg_select", "./sprites/bg_select.jpg");
        s_oSpriteLibrary.addSprite("but_credits", "./sprites/but_credits.png");
        s_oSpriteLibrary.addSprite("ctl_logo", "./sprites/ctl_logo.png");
        s_oSpriteLibrary.addSprite("but_fullscreen", "./sprites/but_fullscreen.png");
        s_oSpriteLibrary.addSprite("but_yes", "./sprites/but_yes.png");
        s_oSpriteLibrary.addSprite("but_delete_saving", "./sprites/but_delete_saving.png");
        s_oSpriteLibrary.addSprite("bg_menu", "./sprites/bg_menu.jpg");
        s_oSpriteLibrary.addSprite("but_level", "./sprites/but_level.png");
        s_oSpriteLibrary.addSprite("but_world0", "./sprites/but_world0.png");
        s_oSpriteLibrary.addSprite("but_world1",
            "./sprites/but_world1.png");
        s_oSpriteLibrary.addSprite("but_world2", "./sprites/but_world2.png");
        s_oSpriteLibrary.addSprite("w0_bg0", "./sprites/backgrounds/world_0/bg0.png");
        s_oSpriteLibrary.addSprite("w0_bg1", "./sprites/backgrounds/world_0/bg1.png");
        s_oSpriteLibrary.addSprite("w1_bg0", "./sprites/backgrounds/world_1/bg0.png");
        s_oSpriteLibrary.addSprite("w1_bg1", "./sprites/backgrounds/world_1/bg1.png");
        s_oSpriteLibrary.addSprite("w2_bg0", "./sprites/backgrounds/world_2/bg0.png");
        s_oSpriteLibrary.addSprite("w2_bg1",
            "./sprites/backgrounds/world_2/bg1.png");
        s_oSpriteLibrary.addSprite("key_up", "./sprites/key_up.png");
        s_oSpriteLibrary.addSprite("key_down", "./sprites/key_down.png");
        s_oSpriteLibrary.addSprite("key_left", "./sprites/key_left.png");
        s_oSpriteLibrary.addSprite("key_right", "./sprites/key_right.png");
        s_oSpriteLibrary.addSprite("but_exit", "./sprites/but_exit.png");
        s_oSpriteLibrary.addSprite("audio_icon", "./sprites/audio_icon.png");
        s_oSpriteLibrary.addSprite("but_restart", "./sprites/but_restart.png");
        s_oSpriteLibrary.addSprite("but_next",
            "./sprites/but_next.png");
        s_oSpriteLibrary.addSprite("time_panel", "./sprites/time_panel.png");
        s_oSpriteLibrary.addSprite("tachometer", "./sprites/tachometer.png");
        s_oSpriteLibrary.addSprite("baloon_mc", "./sprites/baloon_mc.png");
        for (var a = 1; 5 >= a; a++) s_oSpriteLibrary.addSprite("billboard0" + a, "./sprites/elements/billboard0" + a + ".png");
        s_oSpriteLibrary.addSprite("boulder", "./sprites/elements/boulder.png");
        s_oSpriteLibrary.addSprite("finish", "./sprites/elements/finish.png");
        s_oSpriteLibrary.addSprite("bush1",
            "./sprites/elements/world_0/bush1.png");
        s_oSpriteLibrary.addSprite("bush2", "./sprites/elements/world_0/bush2.png");
        s_oSpriteLibrary.addSprite("dead_tree", "./sprites/elements/world_0/dead_tree.png");
        s_oSpriteLibrary.addSprite("stump", "./sprites/elements/world_0/stump.png");
        s_oSpriteLibrary.addSprite("tree1", "./sprites/elements/world_0/tree1.png");
        s_oSpriteLibrary.addSprite("tree2", "./sprites/elements/world_0/tree2.png");
        s_oSpriteLibrary.addSprite("cactus1", "./sprites/elements/world_1/cactus1.png");
        s_oSpriteLibrary.addSprite("cactus2", "./sprites/elements/world_1/cactus2.png");
        s_oSpriteLibrary.addSprite("palm_tree", "./sprites/elements/world_1/palm_tree.png");
        s_oSpriteLibrary.addSprite("column", "./sprites/elements/world_1/column.png");
        s_oSpriteLibrary.addSprite("sign_curve_left", "./sprites/elements/world_2/sign_curve_left.png");
        s_oSpriteLibrary.addSprite("sign_curve_right", "./sprites/elements/world_2/sign_curve_right.png");
        s_oSpriteLibrary.addSprite("sign_indication", "./sprites/elements/world_2/sign_indication.png");
        s_oSpriteLibrary.addSprite("lamp_left", "./sprites/elements/world_2/lamp_left.png");
        s_oSpriteLibrary.addSprite("lamp_right", "./sprites/elements/world_2/lamp_right.png");
        s_oSpriteLibrary.addSprite("house1", "./sprites/elements/world_2/house1.png");
        s_oSpriteLibrary.addSprite("house2", "./sprites/elements/world_2/house2.png");
        for (a = 1; 3 >= a; a++) s_oSpriteLibrary.addSprite("car0" + a + "_center", "./sprites/cars/car0" + a + "/car0" + a + "_center.png"), s_oSpriteLibrary.addSprite("car0" + a + "_left", "./sprites/cars/car0" + a +
            "/car0" + a + "_left.png"), s_oSpriteLibrary.addSprite("car0" + a + "_right", "./sprites/cars/car0" + a + "/car0" + a + "_right.png");
        s_oSpriteLibrary.addSprite("semi_center", "./sprites/cars/semi/semi_center.png");
        s_oSpriteLibrary.addSprite("semi_left", "./sprites/cars/semi/semi_left.png");
        s_oSpriteLibrary.addSprite("semi_right", "./sprites/cars/semi/semi_right.png");
        s_oSpriteLibrary.addSprite("bus_center", "./sprites/cars/bus/bus_center.png");
        s_oSpriteLibrary.addSprite("bus_left", "./sprites/cars/bus/bus_left.png");
        s_oSpriteLibrary.addSprite("bus_right",
            "./sprites/cars/bus/bus_right.png");
        s_oSpriteLibrary.addSprite("player", "./sprites/player.png");
        d += s_oSpriteLibrary.getNumSprites();
        s_oSpriteLibrary.loadSprites()
    };
    this._onImagesLoaded = function() {
        b++;
        h.refreshLoader(Math.floor(b / d * 100));
        b === d && (h.unload(), isIOS() || playSound("menu_soundtrack", 1, !0), this.gotoMenu())
    };
    this._onAllImagesLoaded = function() {};
    this.onAllPreloaderImagesLoaded = function() {
        this._loadImages()
    };
    this.gotoMenu = function() {
        new CMenu;
        e = STATE_MENU
    };
    this.gotoWorldMenu = function() {
        new CWorldMenu;
        e = STATE_MENU
    };
    this.gotoGame = function(a) {
        f = new CGame(g, a);
        e = STATE_GAME
    };
    this.gotoHelp = function() {
        new CHelp;
        e = STATE_HELP
    };
    this.stopUpdate = function() {
        c = !1;
        createjs.Ticker.paused = !0;
        $("#block_game").css("display", "block");
        Howler.mute(!0)
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
            s_iCntTime +=
                s_iTimeElaps;
            s_iCntFps++;
            s_iPrevTime = b;
            1E3 <= s_iCntTime && (s_iCurFps = s_iCntFps, s_iCntTime -= 1E3, s_iCntFps = 0);
            s_oStage.update(a);
            e === STATE_GAME && f.update()
        }
    };
    s_oMain = this;
    var g = a;
    ENABLE_FULLSCREEN = a.fullscreen;
    ENABLE_CHECK_ORIENTATION = a.check_orientation;
    this.initContainer()
}
var s_bMobile, s_bAudioActive = !0,
    s_iCntTime = 0,
    s_iTimeElaps = 0,
    s_iPrevTime = 0,
    s_iCntFps = 0,
    s_iCurFps = 1 / FPS_DT,
    s_bFullscreen = !1,
    s_oDrawLayer, s_oStage, s_oMain, s_oSpriteLibrary, s_oSoundTrack, s_oCanvas, s_oLocalStorage, s_aSounds = [];

function CCreditsPanel() {
    var a, c, b, d, e;
    this._init = function() {
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 0;
        c.on("mousedown", function() {});
        s_oStage.addChild(c);
        (new createjs.Tween.get(c)).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var h = s_oSpriteLibrary.getSprite("msg_box"),
            f = createBitmap(h);
        f.regX = h.width / 2;
        f.regY = h.height / 2;
        b.addChild(f);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + h.height / 2 + 50;
        a = b.y;
        (new createjs.Tween.get(b)).to({
            y: CANVAS_HEIGHT /
                2 - 40
        }, 500, createjs.Ease.quartIn);
        f = new createjs.Text("DEVELOPED BY", " 40px " + PRIMARY_FONT, "#ffffff");
        f.y = -h.height / 2 + 110;
        f.textAlign = "center";
        f.textBaseline = "middle";
        f.lineWidth = 400;
        b.addChild(f);
        h = new createjs.Text("www.playzen.io", " 40px " + PRIMARY_FONT, "#ffffff");
        h.y = 90;
        h.textAlign = "center";
        h.textBaseline = "middle";
        h.lineWidth = 400;
        b.addChild(h);
        h = s_oSpriteLibrary.getSprite("ctl_logo");
        e = createBitmap(h);
        e.on("mousedown", this._onLogoButRelease);
        e.regX = h.width / 2;
        e.regY = h.height / 2;
        b.addChild(e);
        h = s_oSpriteLibrary.getSprite("but_exit");
        d = new CGfxButton(326, -200, h, b);
        d.addEventListener(ON_MOUSE_UP, this.unload, this)
    };
    this.unload = function() {
        d.setClickable(!1);
        (new createjs.Tween.get(c)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            s_oStage.removeChild(c);
            s_oStage.removeChild(b);
            d.unload()
        });
        c.off("mousedown", function() {});
        e.off("mousedown", this._onLogoButRelease)
    };
    this._onLogoButRelease = function() {};
    this._onMoreGamesReleased = function() {};
    this._init()
}

function CTextButton(a, c, b, d, e, h, f) {
    var g, l, m, k, n;
    this._init = function(a, f, b, d, e, c, h) {
        g = [];
        l = [];
        var r = createBitmap(b),
            p = Math.ceil(h / 20);
        n = new createjs.Text(d, "bold " + h + "px " + e, "#000000");
        n.textAlign = "center";
        n.textBaseline = "alphabetic";
        var t = n.getBounds();
        n.x = b.width / 2 + p;
        n.y = Math.floor(b.height / 2) + t.height / 3 + p;
        k = new createjs.Text(d, "bold " + h + "px " + e, c);
        k.textAlign = "center";
        k.textBaseline = "alphabetic";
        t = k.getBounds();
        k.x = b.width / 2;
        k.y = Math.floor(b.height / 2) + t.height / 3;
        m = new createjs.Container;
        m.x = a;
        m.y = f;
        m.regX = b.width / 2;
        m.regY = b.height / 2;
        m.addChild(r, n, k);
        s_oStage.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        m.off("mousedown");
        m.off("pressup");
        s_oStage.removeChild(m)
    };
    this.setVisible = function(a) {
        m.visible = a
    };
    this._initListener = function() {
        oParent = this;
        m.on("mousedown", this.buttonDown);
        m.on("pressup", this.buttonRelease)
    };
    this.addEventListener = function(a, f, b) {
        g[a] = f;
        l[a] = b
    };
    this.buttonRelease = function() {
        m.scaleX = 1;
        m.scaleY = 1;
        g[ON_MOUSE_UP] && g[ON_MOUSE_UP].call(l[ON_MOUSE_UP])
    };
    this.buttonDown =
        function() {
            m.scaleX = .9;
            m.scaleY = .9;
            g[ON_MOUSE_DOWN] && g[ON_MOUSE_DOWN].call(l[ON_MOUSE_DOWN])
        };
    this.setTextPosition = function(a) {
        k.y = a;
        n.y = a + 2
    };
    this.setPosition = function(a, f) {
        m.x = a;
        m.y = f
    };
    this.setX = function(a) {
        m.x = a
    };
    this.setY = function(a) {
        m.y = a
    };
    this.getButtonImage = function() {
        return m
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    this._init(a, c, b, d, e, h, f);
    return this
}

function CToggle(a, c, b, d) {
    var e, h, f, g;
    this._init = function(a, b, d, c) {
        h = [];
        f = [];
        var l = new createjs.SpriteSheet({
            images: [d],
            frames: {
                width: d.width / 2,
                height: d.height,
                regX: d.width / 2 / 2,
                regY: d.height / 2
            },
            animations: {
                state_true: [0],
                state_false: [1]
            }
        });
        e = c;
        g = createSprite(l, "state_" + e, d.width / 2 / 2, d.height / 2, d.width / 2, d.height);
        g.x = a;
        g.y = b;
        g.stop();
        s_oStage.addChild(g);
        this._initListener()
    };
    this.unload = function() {
        g.off("mousedown", this.buttonDown);
        g.off("pressup", this.buttonRelease);
        s_oStage.removeChild(g)
    };
    this._initListener =
        function() {
            g.on("mousedown", this.buttonDown);
            g.on("pressup", this.buttonRelease)
        };
    this.addEventListener = function(a, b, g) {
        h[a] = b;
        f[a] = g
    };
    this.setActive = function(a) {
        e = a;
        g.gotoAndStop("state_" + e)
    };
    this.buttonRelease = function() {
        g.scaleX = 1;
        g.scaleY = 1;
        playSound("click", 1, !1);
        e = !e;
        g.gotoAndStop("state_" + e);
        h[ON_MOUSE_UP] && h[ON_MOUSE_UP].call(f[ON_MOUSE_UP], e)
    };
    this.buttonDown = function() {
        g.scaleX = .9;
        g.scaleY = .9;
        h[ON_MOUSE_DOWN] && h[ON_MOUSE_DOWN].call(f[ON_MOUSE_DOWN])
    };
    this.setPosition = function(a, f) {
        g.x = a;
        g.y = f
    };
    this._init(a, c, b, d)
}

function CGfxButton(a, c, b, d) {
    var e, h, f, g, l = [],
        m;
    this._init = function(a, b, d, c) {
        e = !1;
        h = 1;
        f = [];
        g = [];
        m = createBitmap(d);
        m.x = a;
        m.y = b;
        m.scaleX = m.scaleY = h;
        m.regX = d.width / 2;
        m.regY = d.height / 2;
        c.addChild(m);
        this._initListener()
    };
    this.unload = function() {
        s_bMobile ? m.off("mousedown", this.buttonDown) : (m.off("mousedown", this.buttonDown), m.off("mouseover", this.buttonOver));
        m.off("pressup", this.buttonRelease);
        d.removeChild(m)
    };
    this.setVisible = function(a) {
        m.visible = a
    };
    this.setClickable = function(a) {
        e = !a
    };
    this._initListener =
        function() {
            if (s_bMobile) m.on("mousedown", this.buttonDown);
            else m.on("mousedown", this.buttonDown), m.on("mouseover", this.buttonOver);
            m.on("pressup", this.buttonRelease)
        };
    this.addEventListener = function(a, b, d) {
        f[a] = b;
        g[a] = d
    };
    this.addEventListenerWithParams = function(a, b, d, e) {
        f[a] = b;
        g[a] = d;
        l = e
    };
    this.buttonRelease = function() {
        e || (m.scaleX = h, m.scaleY = h, f[ON_MOUSE_UP] && f[ON_MOUSE_UP].call(g[ON_MOUSE_UP], l))
    };
    this.buttonDown = function() {
        e || (m.scaleX = .9 * h, m.scaleY = .9 * h, playSound("click", 1, !1), f[ON_MOUSE_DOWN] &&
            f[ON_MOUSE_DOWN].call(g[ON_MOUSE_DOWN], l))
    };
    this.buttonOver = function(a) {
        s_bMobile || e || (a.target.cursor = "pointer")
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(m).to({
            scaleX: 1.1 * h,
            scaleY: 1.1 * h
        }, 850, createjs.Ease.quadOut).to({
            scaleX: h,
            scaleY: h
        }, 650, createjs.Ease.quadIn).call(function() {
            k.pulseAnimation()
        })
    };
    this.trembleAnimation = function() {
        createjs.Tween.get(m).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            k.trebleAnimation()
        })
    };
    this.setPosition = function(a, f) {
        m.x = a;
        m.y = f
    };
    this.setX = function(a) {
        m.x = a
    };
    this.setY = function(a) {
        m.y = a
    };
    this.getButtonImage = function() {
        return m
    };
    this.getX = function() {
        return m.x
    };
    this.getY = function() {
        return m.y
    };
    var k = this;
    this._init(a, c, b, d);
    return this
}

function CMenu() {
    var a, c, b, d, e, h, f, g, l, m, k, n, r, t, q, u = null,
        x = null;
    this._init = function() {
        l = createBitmap(s_oSpriteLibrary.getSprite("bg_menu"));
        s_oStage.addChild(l);
        var p = s_oSpriteLibrary.getSprite("but_play");
        m = new CGfxButton(CANVAS_WIDTH / 2 + 350, CANVAS_HEIGHT - 220, p, s_oStage);
        m.addEventListener(ON_MOUSE_UP, this._onButPlayRelease, this);
        m.pulseAnimation();
        p = s_oSpriteLibrary.getSprite("logo_menu");
        var v = createBitmap(p);
        v.regX = p.width / 2;
        v.regY = p.height / 2;
        v.x = CANVAS_WIDTH / 2;
        v.y = CANVAS_HEIGHT / 2 - 150;
        s_oStage.addChild(v);
        p = s_oSpriteLibrary.getSprite("but_credits");
        e = p.width / 2 + 12;
        h = p.height / 2 + 16;
        r = new CGfxButton(e, h, p, s_oStage);
        r.addEventListener(ON_MOUSE_UP, this._onCreditsBut, this);
        v = CANVAS_WIDTH;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p = s_oSpriteLibrary.getSprite("audio_icon"), f = CANVAS_WIDTH - p.width / 4 - 12, g = p.height / 2 + 16, n = new CToggle(f, g, p, s_bAudioActive), n.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this), v = f - p.width / 4;
        s_oLocalStorage.isDirty() && (p = s_oSpriteLibrary.getSprite("but_delete_saving"), a = v - p.width /
            2 - 12, c = p.height / 2 + 16, q = new CGfxButton(a, c, p, s_oStage), q.addEventListener(ON_MOUSE_UP, this._onDeleteBut, this));
        p = window.document;
        v = p.documentElement;
        u = v.requestFullscreen || v.mozRequestFullScreen || v.webkitRequestFullScreen || v.msRequestFullscreen;
        x = p.exitFullscreen || p.mozCancelFullScreen || p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (u = !1);
        u && !inIframe() && (p = s_oSpriteLibrary.getSprite("but_fullscreen"), b = e + p.width / 2 + 12, d = p.height / 2 + 16, t = new CToggle(b, d, p, s_bFullscreen, s_oStage),
            t.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        k = new createjs.Shape;
        k.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        s_oStage.addChild(k);
        createjs.Tween.get(k).to({
            alpha: 0
        }, 1E3).call(function() {
            k.visible = !1
        });
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY);
        s_oLocalStorage.isUsed() || new CMsgBox(TEXT_IOS_PRIVATE)
    };
    this.unload = function() {
        m.unload();
        m = null;
        k.visible = !1;
        r.unload();
        q && s_oLocalStorage.isDirty() && q.unload();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) n.unload(),
            n = null;
        u && !inIframe() && t.unload();
        s_oStage.removeChild(l);
        s_oMenu = l = null
    };
    this.refreshButtonPos = function(l, m) {
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || n.setPosition(f - l, m + g);
        r.setPosition(e + l, m + h);
        u && !inIframe() && t.setPosition(b + l, d + m);
        q && s_oLocalStorage.isDirty() && q.setPosition(a - l, c + m)
    };
    this.resetFullscreenBut = function() {
        t.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? x.call(window.document) : u.call(window.document.documentElement);
        sizeHandler()
    };
    this._onCreditsBut =
        function() {
            new CCreditsPanel
        };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onDeleteBut = function() {
        (new CAreYouSurePanel(s_oMenu.deleteSavings)).changeMessage(TEXT_SAVE_REMOVE, 24)
    };
    this.deleteSavings = function() {
        s_oLocalStorage.deleteData();
        s_oLocalStorage.resetAllData();
        q.unload()
    };
    this._onButPlayRelease = function() {
        this.unload();
        $(s_oMain).trigger("start_session");
        isIOS() && !soundPlaying(s_aSounds.menu_soundtrack) && playSound("menu_soundtrack", 1, !0);
        s_oMain.gotoWorldMenu()
    };
    s_oMenu = this;
    this._init()
}
var s_oMenu = null;

function CGame(a, c) {
    function b(a) {
        a.preventDefault();
        s_oGame.onKeyUp(a.keyCode)
    }

    function d(a) {
        a || (a = window.event);
        a.preventDefault();
        s_oGame.onKeyDown(a.keyCode)
    }
    var e, h, f, g, l, m, k, n, r, t = null,
        q, u, x, p, v, y;
    this._init = function(a) {
        l = a;
        n = [];
        v = new CHorizon(l);
        x = new createjs.Shape;
        s_oStage.addChild(x);
        p = new createjs.Container;
        s_oStage.addChild(p);
        u = new CRoad(x, p, l);
        q = new CPlayer(CANVAS_WIDTH / 2, 980, s_oStage);
        n = u.getSegments();
        TRACK_LENGTH = u.getTrackLength();
        r = new CInterface;
        y = [];
        new CLevelBuilder(q, y, p, a);
        this.resetParams()
    };
    this.getWorldCameraPos = function() {
        var a = q.getPosition().z;
        a = this.findSegment(a);
        return n[a.index].p1.world
    };
    this.onKeyUp = function(a) {
        if (e) switch (a) {
            case KEY_LEFT:
                q.stopLeft();
                break;
            case KEY_UP:
                q.stopAccelerate();
                break;
            case KEY_RIGHT:
                q.stopRight();
                break;
            case KEY_DOWN:
                q.stopBrake()
        }
    };
    this.onKeyDown = function(a) {
        if (e) switch (a) {
            case KEY_LEFT:
                q.moveLeft();
                break;
            case KEY_UP:
                q.moveAccelerate();
                break;
            case KEY_RIGHT:
                q.moveRight();
                break;
            case KEY_DOWN:
                q.moveBrake()
        }
    };
    this.resetParams = function() {
        e = !1;
        stopSound(s_aSounds.game_soundtrack);
        0 === l ? new CHelpPanel : (e = !0, stopSound(s_aSounds.menu_soundtrack), playSound("game_soundtrack", 1, !0), $(s_oMain).trigger("start_level", l));
        k = STATE_GAME_START;
        m = 0;
        g = LEVEL_INFO[l].time;
        f = START_COUNTDOWN;
        v.restart();
        r.refreshTimer(g);
        r.refreshCurTime(0);
        var a = l % NUM_TRACKS_PER_WORLD;
        r.setLevelInfo(s_oSpriteLibrary.getSprite("but_world" + Math.floor(l / NUM_WORLDS)), a + 1);
        s_aTimeScore[l] < LEVEL_INFO[l].time && 0 !== s_aTimeScore[l] ? r.setBestTime(s_aTimeScore[l]) : r.setBestTime(LEVEL_INFO[l].time);
        s_bMobile || (document.onkeydown = d, document.onkeyup = b);
        u.clearVisual(q.getPosition());
        q.reset()
    };
    this.restartGame = function() {
        $(s_oMain).trigger("show_interlevel_ad");
        $(s_oMain).trigger("restart_level", l);
        this.resetParams()
    };
    this.unload = function() {
        r.unload();
        null !== t && t.unload();
        stopSound(s_aSounds.menu_soundtrack);
        stopSound(s_aSounds.game_soundtrack);
        stopSound(s_aSounds.engine);
        stopSound(s_aSounds.brake);
        createjs.Tween.removeAllTweens();
        s_oStage.removeAllChildren()
    };
    this.checkDamage = function() {
        q.getCurSpeed() >
            PLAYER_MIN_SPEED_DAMAGE && !h && (h = !0, q.damageAnim(), new CTremble(s_oStage, 250, 20, 5))
    };
    this.endDamageTime = function() {
        h = !1
    };
    this.trackCompleted = function() {
        v.resetPos();
        k !== STATE_GAME_END && ($(s_oMain).trigger("end_level", l), $(s_oMain).trigger("show_interlevel_ad"), k = STATE_GAME_END, s_oGame.stopPlayer(), m = Math.floor(g / 1E3 * POINTS_PER_SECONDS), new CNextLevelPanel(g, m, l))
    };
    this._countDown = function() {
        f -= s_iTimeElaps;
        r.refreshCountdown(f);
        0 >= f && (f = 0, k = STATE_GAME_RACE, r.countDownGo())
    };
    this.nextLevel = function() {
        l++;
        l < NUM_TRACKS_PER_WORLD * NUM_WORLDS ? (this.unload(), this._init(l)) : this.gameOver()
    };
    this.trackLose = function() {
        k = STATE_GAME_END;
        s_oGame.stopPlayer();
        $(s_oMain).trigger("end_level", l);
        $(s_oMain).trigger("show_interlevel_ad");
        (new CLosePanel(s_oSpriteLibrary.getSprite("msg_box"))).show(m)
    };
    this.stopPlayer = function() {
        q.stopAll();
        s_bMobile || (document.onkeydown = null, document.onkeyup = null)
    };
    this.onExit = function() {
        s_oGame.unload();
        $(s_oMain).trigger("end_session");
        playSound("menu_soundtrack", 1, !0);
        s_oMain.gotoMenu()
    };
    this._onExitHelp = function() {
        e = !0;
        stopSound(s_aSounds.menu_soundtrack);
        playSound("game_soundtrack", 1, !0);
        $(s_oMain).trigger("start_level", 1)
    };
    this.gameOver = function() {
        t = new CEndPanel(s_oSpriteLibrary.getSprite("msg_box"));
        t.show(m)
    };
    this.setPause = function() {
        e = !1;
        q.stopAll()
    };
    this.setResume = function() {
        e = !0
    };
    this.update = function() {
        var a = 1 / s_iCurFps;
        switch (k) {
            case STATE_GAME_START:
                e && this._countDown();
                break;
            case STATE_GAME_RACE:
                if (!e) return;
                g -= s_iTimeElaps;
                0 > g && (g = 0, this.trackLose());
                r.refreshTimer(g);
                r.refreshCurTime(LEVEL_INFO[l].time - g);
                q.update(a);
                break;
            case STATE_GAME_END:
                q.update(a), q.autoPilot()
        }
        r.refreshSpeed(q.getCurSpeed() * PLAYER_SPEED_CONVERSION_RATIO);
        u.update(q.getPosition());
        v.move(this.getWorldCameraPos());
        for (var f = 0; f < y.length; f++) y[f].update(a, q);
        this._ambientCollision();
        this._carsCollision()
    };
    this._ambientCollision = function() {
        if (q.isOutOfRoad())
            for (var a = 0; a < q.getPlayerSegment().sprites.length; a++) {
                var f = q.getPlayerSegment().sprites[a];
                if (Util.overlap(q.getPosition().x, q.getPlayerWidth(),
                        f.collision.center, f.collision.width)) {
                    this.checkDamage();
                    q.setCurSpeed(PLAYER_ACCELERATION);
                    q.setPosition(Util.increase(q.getPlayerSegment().p1.world.z, -PLAYER_Z_FROMCAMERA, TRACK_LENGTH));
                    break
                }
            }
    };
    this._carsCollision = function() {
        for (var a, f, b = 0; b < q.getPlayerSegment().cars.length; b++)
            if (a = q.getPlayerSegment().cars[b], f = a.getSprite().width * SPRITES.SCALE, q.getCurSpeed() > a.getSpeed() && Util.overlap(q.getPosition().x, q.getPlayerWidth(), a.getOffset(), f, .8)) {
                this.checkDamage();
                q.setCurSpeed(a.getSpeed() *
                    (a.getSpeed() / q.getCurSpeed()));
                q.setPosition(Util.increase(a.getZ(), -PLAYER_Z_FROMCAMERA, TRACK_LENGTH));
                break
            }
    };
    this.findSegment = function(a) {
        return u.findSegment(a)
    };
    this.getSegments = function() {
        return n
    };
    s_oGame = this;
    PLAYER_MAX_SPEED = a.player_max_speed;
    PLAYER_ACCELERATION = PLAYER_MAX_SPEED / 5;
    PLAYER_DECELERATION = PLAYER_MAX_SPEED / 8;
    PLAYER_MIN_SPEED_DAMAGE = PLAYER_MAX_SPEED / 3;
    PLAYER_REAL_MAX_SPEED = a.player_maxspeed_indicator;
    PLAYER_SPEED_CONVERSION_RATIO = PLAYER_REAL_MAX_SPEED / PLAYER_MAX_SPEED;
    CENTRIFUGAL_FORCE =
        a.player_centrifugal_force;
    POINTS_PER_SECONDS = a.points_per_seconds_remaining;
    this._init(c)
}
var s_oGame;

function CInterface() {
    var a, c, b, d, e, h, f, g, l, m, k, n, r, t, q, u, x, p, v, y, A, D, E, P, O, C, B, I, J, K, L, M, G, F, H = null,
        Q = null;
    this._init = function() {
        var z;
        var w = s_oSpriteLibrary.getSprite("but_exit");
        x = CANVAS_WIDTH - w.width / 2 - 12;
        p = w.height / 2 + 16;
        y = new CGfxButton(x, p, w, s_oStage);
        y.addEventListener(ON_MOUSE_UP, this._onExit, this);
        q = z = x - w.width - 12;
        u = w.height / 2 + 16;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) w = s_oSpriteLibrary.getSprite("audio_icon"), v = new CToggle(q, u, w, s_bAudioActive), v.addEventListener(ON_MOUSE_UP, this._onAudioToggle,
            this), z = q - w.width / 2 - 12;
        w = window.document;
        var N = w.documentElement;
        H = N.requestFullscreen || N.mozRequestFullScreen || N.webkitRequestFullScreen || N.msRequestFullscreen;
        Q = w.exitFullscreen || w.mozCancelFullScreen || w.webkitExitFullscreen || w.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (H = !1);
        H && !inIframe() && (w = s_oSpriteLibrary.getSprite("but_fullscreen"), e = z, h = w.height / 2 + 16, M = new CToggle(e, h, w, s_bFullscreen, s_oStage), M.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        b = 12;
        d = 16;
        A = new createjs.Container;
        s_oStage.addChild(A);
        w = s_oSpriteLibrary.getSprite("time_panel");
        z = createBitmap(w);
        A.addChild(z);
        E = new CTimer(110, 50, A, 50, "#ffffff", "best_time", "#000000");
        P = new CTimer(110, 120, A, 50, "#ffffff", "timer", "#000000");
        a = CANVAS_WIDTH / 2;
        c = 60;
        D = new CTimer(a, c, s_oStage, 100, "#fff000", null, "#000000");
        D.resetTextRelativePos();
        D.setAlign("center", "middle");
        O = new CTachometer(152, CANVAS_HEIGHT - 12);
        C = new createjs.Text("", " 300px " + PRIMARY_FONT, "#3e240b");
        C.x = CANVAS_WIDTH / 2;
        C.y = CANVAS_HEIGHT / 2;
        C.textAlign = "center";
        C.textBaseline =
            "middle";
        C.lineWidth = 200;
        C.outline = 20;
        s_oStage.addChild(C);
        B = new createjs.Text("", " 300px " + PRIMARY_FONT, "rgba(255,224,0,1)");
        B.x = CANVAS_WIDTH / 2;
        B.y = CANVAS_HEIGHT / 2;
        B.textAlign = "center";
        B.textBaseline = "middle";
        B.lineWidth = 200;
        s_oStage.addChild(B);
        s_bMobile && (z = CANVAS_HEIGHT - 270, w = s_oSpriteLibrary.getSprite("key_up"), r = CANVAS_WIDTH - 180 + w.width / 2, t = z, I = new CGfxButton(r, t, w, s_oStage), I.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_UP), I.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown,
                this, KEY_UP), w = s_oSpriteLibrary.getSprite("key_down"), k = CANVAS_WIDTH - 180 - w.width / 2, n = z, J = new CGfxButton(k, n, w, s_oStage), J.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_DOWN), J.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_DOWN), w = s_oSpriteLibrary.getSprite("key_left"), l = 180 - w.width / 2, m = z, K = new CGfxButton(l, m, w, s_oStage), K.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_LEFT), K.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_LEFT),
            w = s_oSpriteLibrary.getSprite("key_right"), f = 180 + w.width / 2, g = z, L = new CGfxButton(f, g, w, s_oStage), L.addEventListenerWithParams(ON_MOUSE_UP, s_oGame.onKeyUp, this, KEY_RIGHT), L.addEventListenerWithParams(ON_MOUSE_DOWN, s_oGame.onKeyDown, this, KEY_RIGHT));
        F = [];
        for (z = 0; 3 >= z; z++) F[z] = !1;
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.unload = function() {
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) v.unload(), v = null;
        H && !inIframe() && M.unload();
        y.unload();
        s_oInterface = null;
        s_bMobile && (I.unload(), J.unload(), K.unload(),
            L.unload())
    };
    this.refreshButtonPos = function(z, w) {
        y.setPosition(x - z, w + p);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || v.setPosition(q - z, w + u);
        H && !inIframe() && M.setPosition(e - z, h + w);
        A.x = b + z;
        A.y = d + w;
        s_bMobile && (I.setPosition(r - z, t - w), J.setPosition(k - z, n - w), K.setPosition(l + z, m - w), L.setPosition(f + z, g - w));
        D.setPos(a, c + w);
        O.updateOffset(z, w)
    };
    this.resetFullscreenBut = function() {
        M.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? Q.call(window.document) : H.call(window.document.documentElement);
        sizeHandler()
    };
    this.refreshTimer = function(a) {
        D.setIntTime(a)
    };
    this.setBestTime = function(a) {
        E.setDecimalTime(a)
    };
    this.refreshCurTime = function(a) {
        P.setDecimalTime(a)
    };
    this.refreshCountdown = function(a) {
        var f = Math.ceil(a / 1E3),
            b = (1E3 * f - a) / 1E3;
        B.alpha = 1 - b;
        B.scaleX = B.scaleY = b;
        B.text = Math.ceil(a / 1E3);
        C.alpha = B.alpha;
        C.scaleX = C.scaleY = b;
        C.text = B.text;
        3 !== f || F[3] ? 2 !== f || F[2] ? 1 !== f || F[1] ? 0 === f && (F[0] = !0, playSound("go", 1, 0)) : (F[1] = !0, playSound("1", 1, 0)) : (F[2] = !0, playSound("2", 1, 0)) : (F[3] = !0, playSound("3", 1, 0))
    };
    this.refreshSpeed = function(a) {
        O.setSpeedIndicator(a)
    };
    this.countDownGo = function() {
        B.scaleX = B.scaleY = 1;
        C.scaleX = C.scaleY = B.scaleY;
        B.text = TEXT_GO;
        C.text = TEXT_GO;
        createjs.Tween.get(B).wait(500).to({
            alpha: 0
        }, 1E3, createjs.Ease.cubicIn);
        createjs.Tween.get(C).wait(500).to({
            alpha: 0
        }, 1E3, createjs.Ease.cubicIn)
    };
    this.setLevelInfo = function(a, f) {
        G && G.unload();
        var b = s_oSpriteLibrary.getSprite("time_panel");
        G = new CLevelBut(a.width / 4 * .6 + b.width + 12, a.height / 2 * .6, a, !0, 0, A);
        G.setScale(.6);
        G.setClickable(!1);
        G.addLevelText(f)
    };
    this._onNitro = function() {
        _oButNitro.setVisible(!1);
        s_oGame.setNitro(!0)
    };
    this._onButRestartRelease = function() {
        F = [];
        for (var a = 0; 3 >= a; a++) F[a] = !1;
        s_oGame.restartGame()
    };
    this.onExitFromHelp = function() {
        _oHelpPanel.unload()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        s_oGame.setPause();
        new CAreYouSurePanel(s_oGame.onExit, s_oGame.setResume)
    };
    s_oInterface = this;
    this._init();
    return this
}
var s_oInterface = null;

function CHelpPanel() {
    var a, c, b, d, e, h, f, g;
    this._init = function() {
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        f.on("mousedown", function() {
            l._onExitHelp()
        });
        s_oStage.addChild(f);
        (new createjs.Tween.get(f)).to({
            alpha: .7
        }, 500);
        g = new createjs.Container;
        g.on("pressup", function() {
            l._onExitHelp()
        });
        s_oStage.addChild(g);
        var c = s_oSpriteLibrary.getSprite("msg_box");
        var k = createBitmap(c);
        k.regX = c.width / 2;
        k.regY = c.height / 2;
        g.addChild(k);
        g.x = CANVAS_WIDTH /
            2;
        g.y = CANVAS_HEIGHT + c.height / 2;
        a = g.y;
        (new createjs.Tween.get(g)).to({
            y: CANVAS_HEIGHT / 2 - 40
        }, 500, createjs.Ease.cubicOut);
        s_bMobile ? (c = 0, k = -130, d = new createjs.Text(TEXT_HELP1_MOBILE, " 24px " + PRIMARY_FONT, "#3e240b"), d.x = c, d.y = k, d.textAlign = "center", d.textBaseline = "middle", d.lineWidth = 500, d.outline = 4, g.addChild(d), b = new createjs.Text(TEXT_HELP1_MOBILE, " 24px " + PRIMARY_FONT, "#ffffff"), b.x = c, b.y = k, b.textAlign = d.textAlign, b.textBaseline = d.textBaseline, b.lineWidth = d.lineWidth, g.addChild(b), c = s_oSpriteLibrary.getSprite("key_left"),
            k = createBitmap(c), k.x = -170, k.y = -60, k.regX = c.width / 2, k.regY = c.height / 2, k.scaleX = k.scaleY = .7, g.addChild(k), c = s_oSpriteLibrary.getSprite("key_right"), k = createBitmap(c), k.x = -80, k.y = -60, k.regX = c.width / 2, k.regY = c.height / 2, k.scaleX = k.scaleY = .7, g.addChild(k), c = s_oSpriteLibrary.getSprite("key_down"), k = createBitmap(c), k.x = 80, k.y = -60, k.regX = c.width / 2, k.regY = c.height / 2, k.scaleX = k.scaleY = .7, g.addChild(k), c = s_oSpriteLibrary.getSprite("key_up"), k = createBitmap(c), k.x = 170, k.y = -60, k.regX = c.width / 2, k.regY = c.height /
            2, k.scaleX = k.scaleY = .7) : (c = -280, k = -130, d = new createjs.Text(TEXT_HELP1, " 24px " + PRIMARY_FONT, "#3e240b"), d.x = c, d.y = k, d.textAlign = "left", d.textBaseline = "alphabetic", d.lineWidth = 300, d.outline = 4, g.addChild(d), b = new createjs.Text(TEXT_HELP1, " 24px " + PRIMARY_FONT, "#ffffff"), b.x = c, b.y = k, b.textAlign = "left", b.textBaseline = "alphabetic", b.lineWidth = 300, g.addChild(b), c = s_oSpriteLibrary.getSprite("keys"), k = createBitmap(c), k.x = 130, k.y = -100, k.regX = c.width / 2, k.regY = c.height / 2);
        g.addChild(k);
        h = new createjs.Text(TEXT_HELP2,
            " 24px " + PRIMARY_FONT, "#3e240b");
        h.x = 80;
        h.y = 74;
        h.textAlign = "left";
        h.textBaseline = "alphabetic";
        h.lineWidth = 200;
        h.outline = 4;
        g.addChild(h);
        e = new createjs.Text(TEXT_HELP2, " 24px " + PRIMARY_FONT, "#ffffff");
        e.x = 80;
        e.y = 74;
        e.textAlign = "left";
        e.textBaseline = "alphabetic";
        e.lineWidth = 200;
        g.addChild(e);
        k = new createjs.Container;
        k.x = -130;
        k.y = 130;
        k.scaleX = k.scaleY = .3;
        g.addChild(k);
        c = s_oSpriteLibrary.getSprite("finish");
        var n = createBitmap(c);
        n.regX = c.width / 2;
        n.regY = c.height;
        k.addChild(n);
        new CPlayer(0, 0, k)
    };
    this.unload =
        function() {
            s_oStage.removeChild(f);
            s_oStage.removeChild(g);
            g.off("pressup", function() {
                l._onExitHelp()
            });
            f.off("pressup", function() {
                l._onExitHelp()
            })
        };
    this._onExitHelp = function() {
        c || (c = !0, (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500), (new createjs.Tween.get(g)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            l.unload();
            s_oGame._onExitHelp()
        }))
    };
    var l = this;
    this._init()
}

function CEndPanel() {
    var a, c, b;
    this._init = function() {
        setVolume(s_aSounds.game_soundtrack, .5);
        a = new createjs.Shape;
        a.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        a.alpha = 0;
        a.on("mousedown", function() {});
        s_oStage.addChild(a);
        (new createjs.Tween.get(a)).to({
            alpha: .7
        }, 500);
        c = new createjs.Container;
        s_oStage.addChild(c);
        var d = s_oSpriteLibrary.getSprite("msg_box"),
            e = createBitmap(d);
        e.regX = d.width / 2;
        e.regY = d.height / 2;
        c.addChild(e);
        c.x = CANVAS_WIDTH / 2;
        c.y = CANVAS_HEIGHT + d.height / 2;
        (new createjs.Tween.get(c)).to({
            y: CANVAS_HEIGHT /
                2
        }, 500, createjs.Ease.quartIn);
        e = new createjs.Text(TEXT_GAMEOVER, " 40px " + PRIMARY_FONT, "#000000");
        e.y = -d.height / 2 + 50;
        e.textAlign = "center";
        e.textBaseline = "middle";
        e.lineWidth = 400;
        e.outline = 5;
        c.addChild(e);
        d = new createjs.Text(TEXT_GAMEOVER, " 40px " + PRIMARY_FONT, "#ffffff");
        d.y = e.y;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.lineWidth = 400;
        c.addChild(d);
        d = s_oSpriteLibrary.getSprite("finish");
        e = createBitmap(d);
        e.regX = d.width / 2;
        e.regY = d.height;
        e.y = 154;
        e.scaleX = e.scaleY = .6;
        c.addChild(e);
        d = s_oSpriteLibrary.getSprite("but_home");
        b = new CGfxButton(0, 100, d, c);
        b.addEventListener(ON_MOUSE_UP, this._onHome, this);
        b.pulseAnimation()
    };
    this.unload = function() {
        s_oStage.removeChild(c);
        a.off("mousedown", function() {});
        b.unload()
    };
    this.show = function() {
        playSound("arrive_win", 1, 0);
        $(s_oMain).trigger("share_event", s_iTotalScore)
    };
    this._onHome = function() {
        a.off("mousedown", function() {});
        s_oStage.removeChild(c);
        s_oGame.onExit()
    };
    this._init();
    return this
}

function CPlayer(a, c, b) {
    var d, e, h, f, g, l, m, k, n, r, t, q, u, x, p, v, y, A, D, E;
    this._init = function(a, f, b) {
        this.reset();
        r = PLAYER_MAX_SPEED;
        t = PLAYER_ACCELERATION;
        q = -r;
        u = -PLAYER_DECELERATION;
        x = -r / 2;
        p = r / 4;
        var g = s_oSpriteLibrary.getSprite("baloon_mc");
        E = createBitmap(g);
        E.regX = g.width / 2;
        E.regY = g.height / 2;
        E.x = a;
        E.y = f - 260;
        E.alpha = 0;
        b.addChild(E);
        g = s_oSpriteLibrary.getSprite("player");
        var c = g.width / 3,
            d = g.height;
        g = new createjs.SpriteSheet({
            images: [g],
            frames: {
                width: c,
                height: d,
                regX: c / 2,
                regY: d
            },
            animations: {
                left: [0],
                right: [1],
                straight: [2]
            }
        });
        A = createSprite(g, "straight", c / 2, d, c, d);
        A.x = a;
        A.y = f;
        b.addChild(A);
        v = PLAYER_COLLIDER_WIDTH
    };
    this.reset = function() {
        g = l = f = h = e = d = !1;
        y = n = k = m = 0;
        D = s_oGame.findSegment(m + PLAYER_Z_FROMCAMERA)
    };
    this.setAcceleration = function(a) {
        t = a
    };
    this.setMaxSpeed = function(a) {
        r = a;
        q = -r;
        u = -PLAYER_DECELERATION;
        x = -r / 2;
        p = r / 4
    };
    this.stopAll = function() {
        this.stopLeft();
        this.stopRight();
        this.stopAccelerate()
    };
    this.stopLeft = function() {
        d && (d = !1, A.gotoAndStop("straight"), stopSound(s_aSounds.brake))
    };
    this.stopRight = function() {
        e &&
            (e = !1, A.gotoAndStop("straight"), stopSound(s_aSounds.brake))
    };
    this.stopAccelerate = function() {
        h = !1;
        stopSound(s_aSounds.engine)
    };
    this.stopBrake = function() {
        f = !1
    };
    this.moveLeft = function() {
        0 !== n && (soundPlaying(s_aSounds.brake) || playSound("brake", .5, !1), e = !1, d = !0, A.gotoAndStop("left"))
    };
    this.moveRight = function() {
        0 !== n && (soundPlaying(s_aSounds.brake) || playSound("brake", .5, !1), d = !1, e = !0, A.gotoAndStop("right"))
    };
    this.moveAccelerate = function() {
        f = !1;
        h = !0;
        0 < n && !soundPlaying(s_aSounds.engine) && (stopSound(s_aSounds.brake),
            playSound("engine", .5, !0))
    };
    this.moveBrake = function() {
        h = !1;
        f = !0;
        0 < n && (stopSound(s_aSounds.engine), soundPlaying(s_aSounds.brake) || playSound("brake", .5, !1))
    };
    this._increase = function(a, f, b) {
        for (a += f; a >= b;) a -= b, s_oGame.trackCompleted();
        for (; 0 > a;) a += b;
        return a
    };
    this._accelerate = function(a, f, b) {
        return a + f * b
    };
    this._limit = function(a, f, b) {
        return Math.max(f, Math.min(a, b))
    };
    this.getPlayerWidth = function() {
        return v
    };
    this.getPosition = function() {
        return {
            x: k,
            z: m
        }
    };
    this.setPosition = function(a) {
        m = a
    };
    this.autoPilot =
        function() {
            .5 < k ? (e = !1, d = !0) : -.5 > k ? (e = !0, d = !1) : .1 >= k && -.1 <= k && (e = d = !1)
        };
    this.getMaxSpeed = function() {
        return r
    };
    this.getCurSpeed = function() {
        return n
    };
    this.setCurSpeed = function(a) {
        n = a
    };
    this.getPlayerSegment = function() {
        return D
    };
    this.getFrontPlayerSegment = function() {
        return s_oGame.findSegment(m + SEGMENT_LENGTH + PLAYER_Z_FROMCAMERA)
    };
    this.damageAnim = function() {
        l || (l = !0, playSound("crash", 1, !1), createjs.Tween.get(E, {
            override: !0
        }).to({
            alpha: 1
        }, 250, createjs.Ease.cubicOut).to({
            alpha: 0
        }, 250, createjs.Ease.cubicIn).call(function() {
            l = !1
        }))
    };
    this.isOutOfRoad = function() {
        return g
    };
    this._updateXMovement = function(a, f) {
        var b = a * f * f * D.curve * CENTRIFUGAL_FORCE / TERRAIN_ADHERENCE;
        d ? (y -= TERRAIN_INCREASE_INERTIA * f, y < -TERRAIN_MAX_INERTIA && (y = -TERRAIN_MAX_INERTIA), k = k - b - a) : e ? (y += TERRAIN_INCREASE_INERTIA * f, y > TERRAIN_MAX_INERTIA && (y = TERRAIN_MAX_INERTIA), k = k - b + a) : k = k - b + y;
        0 < y ? (y -= TERRAIN_DECREASE_INERTIA, 0 > y && (y = 0)) : 0 > y && (y += TERRAIN_DECREASE_INERTIA, 0 < y && (y = 0))
    };
    this.update = function(a) {
        D = s_oGame.findSegment(m + PLAYER_Z_FROMCAMERA);
        var b = n / r;
        m = this._increase(m,
            a * n, TRACK_LENGTH);
        this._updateXMovement(2 * a * TERRAIN_ADHERENCE * b, b);
        n = h ? this._accelerate(n, t, a) : f ? this._accelerate(n, q, a) : this._accelerate(n, u, a);
        g = !1;
        if (-1 > k || 1 < k) n > p && (n = this._accelerate(n, x, a)), g = !0;
        k = this._limit(k, -ROAD_BOUNDS, ROAD_BOUNDS);
        n = this._limit(n, 0, r)
    };
    this._init(a, c, b)
}
var Render = {
    polygon: function(a, c, b, d, e, h, f, g, l, m) {
        a.graphics.beginFill(m);
        a.graphics.moveTo(c, b);
        a.graphics.lineTo(d, e);
        a.graphics.lineTo(h, f);
        a.graphics.lineTo(g, l)
    },
    segment: function(a, c, b, d, e, h, f, g, l, m) {
        var k = Render.rumbleWidth(h, b),
            n = Render.rumbleWidth(l, b),
            r = Render.laneMarkerWidth(h, b),
            t = Render.laneMarkerWidth(l, b);
        a.graphics.beginFill(m.grass);
        a.graphics.drawRect(0, g, c, e - g);
        Render.polygon(a, d - h - k, e, d - h, e, f - l, g, f - l - n, g, m.rumble);
        Render.polygon(a, d + h + k, e, d + h, e, f + l, g, f + l + n, g, m.rumble);
        Render.polygon(a,
            d - h, e, d + h, e, f + l, g, f - l, g, m.road);
        if (m.lane)
            for (c = 2 * h / b, k = 2 * l / b, d = d - h + c, f = f - l + k, l = 1; l < b; d += c, f += k, l++) Render.polygon(a, d - r / 2, e, d + r / 2, e, f + t / 2, g, f - t / 2, g, m.lane)
    },
    background: function(a, c, b, d, e, h, f) {
        var g = e.w / 2;
        h = e.x + Math.floor(e.w * (h || 0));
        var l = e.y,
            m = Math.min(g, e.x + e.w - h),
            k = e.h;
        f = f || 0;
        var n = Math.floor(m / g * b);
        a.drawImage(c, h, l, m, k, 0, f, n, d);
        m < g && a.drawImage(c, e.x, l, g - m, k, n - 1, f, b - n, d)
    },
    sprite: function(a, c, b, d, e, h, f, g) {
        var l = b * ROAD_PER_SCALE_PER_HALF_CANVAS_WIDTH;
        b = a.width * l;
        l *= a.height;
        var m = l / a.height;
        e +=
            l * (f || 0);
        f = g ? Math.max(0, e + l - g) : 0;
        f < l ? (c.x = d + b * (h || 0), c.y = e, c.scaleX = c.scaleY = m, a = new createjs.Rectangle(0, 0, a.width, a.height - a.height * f / l), c.sourceRect = a) : c.visible = !1
    },
    rumbleWidth: function(a, c) {
        return a / Math.max(6, 2 * c)
    },
    laneMarkerWidth: function(a, c) {
        return a / Math.max(32, 8 * c)
    }
};

function CRoad(a, c, b) {
    var d, e, h;
    this._init = function(a, b, c) {
        d = null;
        e = CAMERA_DEPTH;
        h = [];
        this.resetRoad()
    };
    this.findSegment = function(a) {
        return h[Math.floor(a / SEGMENT_LENGTH) % h.length]
    };
    this.lastX = function() {
        return 0 === h.length ? 0 : h[h.length - 1].p2.world.x
    };
    this.lastY = function() {
        return 0 === h.length ? 0 : h[h.length - 1].p2.world.y
    };
    this.addSegment = function(a, b) {
        var f = h.length;
        h.push({
            index: f,
            p1: {
                world: {
                    x: this.lastX(),
                    y: this.lastY(),
                    z: f * SEGMENT_LENGTH
                },
                camera: {},
                screen: {}
            },
            p2: {
                world: {
                    x: this.lastX() + a,
                    y: b,
                    z: (f +
                        1) * SEGMENT_LENGTH
                },
                camera: {},
                screen: {}
            },
            curve: a,
            sprites: [],
            cars: [],
            coins: [],
            color: Math.floor(f / RUMBLE_LENGTH) % 2 ? COLORS.DARK : COLORS.LIGHT
        })
    };
    this.addRoad = function(a, b, c, d, e) {
        var f = this.lastY();
        e = f + Util.toInt(e, 0) * SEGMENT_LENGTH;
        var g, h = a + b + c;
        for (g = 0; g < a; g++) this.addSegment(Util.easeIn(0, d, g / a), Util.easeInOut(f, e, g / h));
        for (g = 0; g < b; g++) this.addSegment(d, Util.easeInOut(f, e, (a + g) / h));
        for (g = 0; g < c; g++) this.addSegment(Util.easeInOut(d, 0, g / c), Util.easeInOut(f, e, (a + b + g) / h))
    };
    this.addStraight = function(a) {
        a =
            a || ROAD.LENGTH.MEDIUM;
        this.addRoad(a, a, a, 0)
    };
    this.addHill = function(a, b) {
        a = a || ROAD.LENGTH.MEDIUM;
        b = b || ROAD.HILL.MEDIUM;
        this.addRoad(a, a, a, 0, b)
    };
    this.addCurve = function(a, b, c) {
        a = a || ROAD.LENGTH.MEDIUM;
        b = b || ROAD.CURVE.MEDIUM;
        this.addRoad(a, a, a, b)
    };
    this.addStandardRoad = function(a, b, c) {
        a = a || ROAD.LENGTH.MEDIUM;
        b = b || ROAD.CURVE.NONE;
        c = c || ROAD.HILL.NONE;
        this.addRoad(a, a, a, b, c)
    };
    this.addLowRollingHills = function(a, b) {
        a = a || ROAD.LENGTH.SHORT;
        b = b || ROAD.HILL.LOW;
        this.addRoad(a, a, a, 0, b / 2);
        this.addRoad(a, a, a, 0, -b);
        this.addRoad(a, a, a, ROAD.CURVE.EASY, b);
        this.addRoad(a, a, a, 0, 0);
        this.addRoad(a, a, a, -ROAD.CURVE.EASY, b / 2);
        this.addRoad(a, a, a, 0, 0)
    };
    this.addSCurves = function(a, b, c) {
        a = a || ROAD.LENGTH.MEDIUM;
        b = b || ROAD.CURVE.MEDIUM;
        c = c || ROAD.HILL.NONE;
        var f = 0 <= b ? 1 : -1;
        var g = 0 <= c ? 1 : -1;
        b = Math.abs(b);
        c = Math.abs(c);
        switch (b) {
            case ROAD.CURVE.EASY:
                var d = ROAD.CURVE.NONE;
                var e = ROAD.CURVE.EASY;
                break;
            case ROAD.CURVE.MEDIUM:
                d = ROAD.CURVE.EASY;
                e = ROAD.CURVE.MEDIUM;
                break;
            case ROAD.CURVE.HARD:
                d = ROAD.CURVE.MEDIUM, e = ROAD.CURVE.HARD
        }
        switch (c) {
            case ROAD.HILL.EASY:
                var h =
                    ROAD.HILL.NONE;
                var l = ROAD.HILL.LOW;
                break;
            case ROAD.HILL.MEDIUM:
                h = ROAD.HILL.LOW;
                l = ROAD.HILL.MEDIUM;
                break;
            case ROAD.HILL.HIGH:
                h = ROAD.HILL.MEDIUM, l = ROAD.HILL.HIGH
        }
        this.addRoad(a, a, a, f * d, ROAD.HILL.NONE);
        this.addRoad(a, a, a, f * e, g * l);
        this.addRoad(a, a, a, f * d, -g * h);
        this.addRoad(a, a, a, -f * d, g * l);
        this.addRoad(a, a, a, -f * e, -g * h)
    };
    this.addBumps = function(a, b) {
        a = a || ROAD.LENGTH.SHORT / 2;
        b = b || ROAD.CURVE.NONE;
        this.addRoad(a, a, a, 0, a / 2.5);
        this.addRoad(a, a, a, 0, -a / 6.25);
        this.addRoad(a, a, a, b, -a / 2.5);
        this.addRoad(a, a, a, 0, a / 1,
            5625);
        this.addRoad(a, a, a, 0, a / 2.5);
        this.addRoad(a, a, a, -b, -a / 1.785);
        this.addRoad(a, a, a, 0, a / 2.5);
        this.addRoad(a, a, a, 0, -a / 6.25)
    };
    this.addDownhillToEnd = function(a, b) {
        a = a || 200;
        b = b || ROAD.CURVE.NONE;
        this.addRoad(a, a, a, b, -Math.round(this.lastY() / SEGMENT_LENGTH))
    };
    this.resetRoad = function() {
        h = [];
        for (var a = ROAD_INFO[b], c = 0; c < a.length; c++) {
            var e = a[c];
            switch (e.roadtype) {
                case ROAD.TYPE.STANDARD:
                    this.addStandardRoad(e.length, e.curve, e.hill);
                    break;
                case ROAD.TYPE.CURVE_S:
                    this.addSCurves(e.length, e.curve, e.hill);
                    break;
                case ROAD.TYPE.BUMPS:
                    this.addBumps(e.length, e.curve);
                    break;
                case ROAD.TYPE.FINAL:
                    this.addDownhillToEnd(e.length, e.curve)
            }
        }
        h[this.findSegment(PLAYER_Z_FROMCAMERA).index + 2].color = COLORS.START;
        h[this.findSegment(PLAYER_Z_FROMCAMERA).index + 3].color = COLORS.START;
        for (a = 0; a < RUMBLE_LENGTH; a++) h[h.length - 1 - a].color = COLORS.FINISH;
        d = h.length * SEGMENT_LENGTH
    };
    this.setCameraDepth = function(a) {
        e = a
    };
    this.clearVisual = function(b) {
        a.graphics.clear();
        b = this.findSegment(b.z);
        var f;
        for (f = DRAW_DISTANCE - 1; 0 < f; f--) {
            var c = h[(b.index +
                f) % h.length];
            for (var d = 0; d < c.cars.length; d++) {
                var e = c.cars[d];
                e.setVisible(!1)
            }
            for (d = 0; d < c.sprites.length; d++) e = c.sprites[d], e.source.visible = !1
        }
    };
    this.update = function(b) {
        a.graphics.clear();
        var f = b.z;
        b = b.x;
        var l = this.findSegment(f),
            m = Util.percentRemaining(f, SEGMENT_LENGTH),
            k = this.findSegment(f + PLAYER_Z_FROMCAMERA),
            n = Util.percentRemaining(f + PLAYER_Z_FROMCAMERA, SEGMENT_LENGTH);
        k = Util.interpolate(k.p1.world.y, k.p2.world.y, n);
        n = CANVAS_HEIGHT;
        var r = 0,
            t = -(l.curve * m),
            q = b * ROAD_WIDTH,
            u = k + CAMERA_HEIGHT;
        for (m =
            0; m < DRAW_DISTANCE; m++) {
            k = h[(l.index + m) % h.length];
            k.looped = k.index < l.index;
            k.clip = n;
            var x = f - (k.looped ? d : 0);
            Util.project(k.p1, q - r, u, x, e);
            Util.project(k.p2, q - r - t, u, x, e);
            r += t;
            t += k.curve;
            k.p1.camera.z <= e || k.p2.screen.y >= k.p1.screen.y || k.p2.screen.y >= n || (Render.segment(a, CANVAS_WIDTH, NUM_LANES, k.p1.screen.x, k.p1.screen.y, k.p1.screen.w, k.p2.screen.x, k.p2.screen.y, k.p2.screen.w, k.color), n = k.p2.screen.y)
        }
        r = 0;
        for (m = DRAW_DISTANCE - 1; 0 < m; m--) {
            k = h[(l.index + m) % h.length];
            for (t = 0; t < k.cars.length; t++) {
                n = k.cars[t];
                q = n.getZ() - f;
                u = n.getOffset() - b;
                q > CAR_FARVIEW_OFFSET ? k.curve > -CAR_CURVEVIEW_OFFSET && k.curve < CAR_CURVEVIEW_OFFSET ? n.setDirection(CAR_CENTER) : k.curve < CAR_CURVEVIEW_OFFSET ? n.setDirection(CAR_LEFT) : n.setDirection(CAR_RIGHT) : u > -CAR_SIDEVIEW_OFFSET && n.getOffset() - b < CAR_SIDEVIEW_OFFSET ? n.setDirection(CAR_CENTER) : u < -CAR_SIDEVIEW_OFFSET ? n.setDirection(CAR_RIGHT) : n.setDirection(CAR_LEFT);
                q = n.getSprite();
                u = Util.interpolate(k.p1.screen.scale, k.p2.screen.scale, n.getPercent());
                x = Util.interpolate(k.p1.screen.x, k.p2.screen.x,
                    n.getPercent()) + u * n.getOffset() * ROAD_PER_HALF_CANVAS_WIDTH;
                var p = Util.interpolate(k.p1.screen.y, k.p2.screen.y, n.getPercent());
                n.setVisible(!0);
                c.setChildIndex(n.getCar(), r++);
                Render.sprite(q, n.getCar(), u, x, p, -.5, -1, k.clip)
            }
            for (t = 0; t < k.sprites.length; t++) q = k.sprites[t], u = k.p1.screen.scale, x = k.p1.screen.x + u * q.offset * ROAD_PER_HALF_CANVAS_WIDTH, p = k.p1.screen.y, q.source.visible = !0, c.setChildIndex(q.source, r++), Render.sprite(q.sprite, q.source, u, x, p, 0 > q.offset ? -1 : 0, -1, k.clip)
        }
        k = h[l.index % h.length];
        for (t =
            0; t < k.sprites.length; t++) q = k.sprites[t], q.source.visible = !1;
        for (t = 0; t < k.coins.length; t++) q = k.coins[t], q.source.visible = !1;
        for (t = 0; t < k.cars.length; t++) n = k.cars[t], n.setVisible(!1)
    };
    this.exponentialFog = function(a, b) {
        return 1 / Math.pow(Math.E, a * a * b)
    };
    this.getTrackLength = function() {
        return d
    };
    this.getSegments = function() {
        return h
    };
    this._init(a, c, b)
}
var CAR_CENTER = 0,
    CAR_LEFT = 1,
    CAR_RIGHT = 2;

function CCar(a, c, b, d, e) {
    var h, f, g, l, m, k, n;
    this._init = function(a, b, c, d, e) {
        h = b;
        f = c;
        g = d;
        m = [];
        m[CAR_CENTER] = s_oSpriteLibrary.getSprite(a + "_center");
        m[CAR_LEFT] = s_oSpriteLibrary.getSprite(a + "_left");
        m[CAR_RIGHT] = s_oSpriteLibrary.getSprite(a + "_right");
        n = m[CAR_CENTER];
        k = createBitmap(n);
        k.x = 500;
        k.visible = !1;
        e.addChild(k)
    };
    this.getCar = function() {
        return k
    };
    this.getSprite = function() {
        return n
    };
    this.getOffset = function() {
        return h
    };
    this.getZ = function() {
        return f
    };
    this.getSpeed = function() {
        return g
    };
    this.getPercent =
        function() {
            return l
        };
    this.setDirection = function(a) {
        n = m[a];
        k.image = m[a]
    };
    this.setVisible = function(a) {
        k.visible = a
    };
    this.updateCarOffset = function(a, b) {
        var c, f;
        var d = r.getSprite().width * SPRITES.SCALE;
        if (a.index - b.getPlayerSegment().index > DRAW_DISTANCE) return k.visible = !1, 0;
        for (c = 1; 20 > c; c++) {
            var e = s_oGame.getSegments();
            var l = e[(a.index + c) % e.length];
            if (l === b.getPlayerSegment() && g > b.getCurSpeed() && Util.overlap(b.getPosition().x, b.getPlayerWidth(), h, d, 1.2)) return d = .5 < b.getPosition().x ? -1 : -.5 > b.getPosition().x ?
                1 : h > b.getPosition().x ? 1 : -1, 1 * d / c * (g - b.getCurSpeed()) / b.getMaxSpeed();
            for (f = 0; f < l.cars.length; f++) {
                e = l.cars[f];
                var m = e.getSprite().width * SPRITES.SCALE;
                if (g > e.getSpeed() && Util.overlap(h, d, e.getOffset(), m, 1.2)) return d = .5 < e.getOffset() ? -1 : -.5 > e.getOffset() ? 1 : h > e.getOffset() ? 1 : -1, 1 * d / c * (g - e.getSpeed()) / b.getMaxSpeed()
            }
        }
        return -.9 > h ? .1 : .9 < h ? -.1 : 0
    };
    this.update = function(a, b) {
        var c = s_oGame.findSegment(f);
        h += this.updateCarOffset(c, b);
        f = Util.increase(f, a * g, TRACK_LENGTH);
        l = Util.percentRemaining(f, SEGMENT_LENGTH);
        var d = s_oGame.findSegment(f);
        if (c !== d) {
            var e = c.cars.indexOf(r);
            c.cars.splice(e, 1);
            d.cars.push(r)
        }
    };
    var r = this;
    this._init(a, c, b, d, e)
}

function CLevelBuilder(a, c, b, d) {
    var e;
    this._init = function(a, b, c, d) {
        e = LEVEL_INFO[d].num_cars;
        this._initTerrainInfo();
        this._initFinishLane();
        this._initSprites();
        this._initCars()
    };
    this._attachSprites = function() {
        for (var a = 0; a < s_oGame.getSegments().length; a++)
            for (var c = s_oGame.getSegments()[a].sprites, d = 0; d < c.length; d++) b.addChildAt(c[d].source, 0)
    };
    this._addSprite = function(a, b, c) {
        if (void 0 !== s_oGame.getSegments()[a]) {
            var d = s_oSpriteLibrary.getSprite(b.name),
                f = createBitmap(d);
            f.visible = !1;
            b.name === SPRITES.SIGN_INDICATION.name &&
                (f.regX = d.width / 2);
            var e = d.width * SPRITES.SCALE,
                g = c + e / 2 * (0 < c ? 1 : -1);
            b.collision && (b.collision.center && (g = c + (0 < c ? b.collision.center : -(d.width - b.collision.center)) * SPRITES.SCALE), b.collision.width && (e = b.collision.width * SPRITES.SCALE));
            s_oGame.getSegments()[a].sprites.push({
                source: f,
                offset: c,
                sprite: d,
                collision: {
                    center: g,
                    width: e
                }
            })
        }
    };
    this._addDensityElements = function(a, b, c, d, e, k, n) {
        k = k || 100;
        n = n || 1;
        if (a === AMBIENT.SIDE.BOTH) this._addDensityElements(AMBIENT.SIDE.RIGHT, b, c, d, e, k, n), this._addDensityElements(AMBIENT.SIDE.LEFT,
            b, c, d, e, k, n);
        else
            for (; c <= d; c += n)
                if (100 * Math.random() <= k) {
                    var f = c + Util.randomInt(0, 5);
                    this._addSprite(f, b, a + a * e + 2 * a * Math.random())
                }
    };
    this._addPreciseElements = function(a, b, c, d, e, k, n) {
        k = k || 100;
        n = n || 1;
        if (a === AMBIENT.SIDE.BOTH) this._addPreciseElements(AMBIENT.SIDE.RIGHT, b, c, d, e, k, n), this._addPreciseElements(AMBIENT.SIDE.LEFT, b, c, d, e, k, n);
        else
            for (; c <= d; c += n) 100 * Math.random() <= k && this._addSprite(c, b, a + a * e)
    };
    this._initSprites = function() {
        var a, b = AMBIENT_INFO[d];
        for (a = 0; a < b.length; a++) {
            var c = b[a];
            if (c.segments.constructor ===
                Array) {
                var e = c.segments[0];
                var m = c.segments[1]
            } else m = e = c.segments;
            switch (c.disposition) {
                case AMBIENT.DISPOSITION.PRECISE:
                    this._addPreciseElements(c.side, c.sprite, e, m, c.position, c.occurrence, c.repetitionevery);
                    break;
                case AMBIENT.DISPOSITION.DENSITY:
                    this._addDensityElements(c.side, c.sprite, e, m, c.position, c.occurrence, c.repetitionevery)
            }
        }
        this._attachSprites()
    };
    this._initFinishLane = function() {
        var a = s_oSpriteLibrary.getSprite("finish"),
            b = createBitmap(a);
        b.visible = !1;
        b.regX = a.width / 2;
        s_oGame.getSegments()[s_oGame.getSegments().length -
            1].sprites.push({
            source: b,
            offset: 0,
            sprite: a
        })
    };
    this._initCars = function() {
        var d;
        for (d = 0; d < e; d++) {
            var f = Math.random() * Util.randomChoice([-.8, .8]);
            var g = Math.floor(Math.random() * s_oGame.getSegments().length) * SEGMENT_LENGTH;
            var l = Util.randomChoice(SPRITES.CARS);
            var m = a.getMaxSpeed() / 4 + Math.random() * a.getMaxSpeed() / (l == SPRITES.SEMI ? 4 : 2);
            f = new CCar(l, f, g, m, b);
            g = s_oGame.findSegment(g);
            g.cars.push(f);
            c.push(f)
        }
    };
    this._initTerrainInfo = function() {
        COLORS.LIGHT.road = LEVEL_INFO[d].terrain.color.light.road;
        COLORS.LIGHT.grass =
            LEVEL_INFO[d].terrain.color.light.grass;
        COLORS.LIGHT.rumble = LEVEL_INFO[d].terrain.color.light.rumble;
        COLORS.LIGHT.lane = LEVEL_INFO[d].terrain.color.light.lane;
        COLORS.DARK.road = LEVEL_INFO[d].terrain.color.dark.road;
        COLORS.DARK.grass = LEVEL_INFO[d].terrain.color.dark.grass;
        COLORS.DARK.rumble = LEVEL_INFO[d].terrain.color.dark.rumble;
        TERRAIN_ADHERENCE = LEVEL_INFO[d].terrain.adherence;
        TERRAIN_MAX_INERTIA = LEVEL_INFO[d].terrain.max_inertia;
        NUM_LANES = LEVEL_INFO[d].terrain.num_lanes;
        ROAD_BOUNDS = LEVEL_INFO[d].terrain.roadbounds
    };
    this._init(a, c, b, d)
}

function CWorldMenu() {
    var a, c, b, d, e, h, f, g, l, m, k, n, r, t, q, u = null,
        x = null;
    this._init = function() {
        k = createBitmap(s_oSpriteLibrary.getSprite("bg_select"));
        s_oStage.addChild(k);
        var p = new createjs.Text(TEXT_SELECT_WORLD, " 40px " + PRIMARY_FONT, "#000000");
        p.x = CANVAS_WIDTH / 2;
        p.y = 250;
        p.textAlign = "center";
        p.textBaseline = "middle";
        p.lineWidth = 600;
        p.outline = 5;
        s_oStage.addChild(p);
        var v = new createjs.Text(TEXT_SELECT_WORLD, " 40px " + PRIMARY_FONT, "#ffffff");
        v.x = p.x;
        v.y = p.y;
        v.textAlign = "center";
        v.textBaseline = "middle";
        v.lineWidth = 600;
        s_oStage.addChild(v);
        l = [];
        for (p = 0; p < NUM_WORLDS * NUM_TRACKS_PER_WORLD; p++) l[p] = s_aTimeScore[p];
        m = [];
        for (p = 0; p < NUM_WORLDS; p++) {
            v = s_oSpriteLibrary.getSprite("but_world" + p);
            var y = CANVAS_WIDTH / 2 - 250 + 500 / (NUM_WORLDS - 1) * p,
                A = s_oSpriteLibrary.getSprite("image_" + p),
                D = s_oSpriteLibrary.getSprite("cover_" + p);
            m[p] = new CLevelBut(y, CANVAS_HEIGHT / 2, v, D, A, s_oStage);
            m[p].addEventListenerWithParams(ON_MOUSE_UP, this._onLevelBut, this, p);
            m[p].disable()
        }
        this._setLevelActive();
        p = s_oSpriteLibrary.getSprite("but_exit");
        f = CANVAS_WIDTH - p.width / 2 - 12;
        g = p.height / 2 + 16;
        n = new CGfxButton(f, g, p, s_oStage);
        n.addEventListener(ON_MOUSE_UP, this._onExit, this);
        b = f - p.width - 12;
        d = p.height / 2 + 16;
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) p = s_oSpriteLibrary.getSprite("audio_icon"), t = new CToggle(b, d, p, s_bAudioActive), t.addEventListener(ON_MOUSE_UP, this._onAudioToggle, this);
        p = window.document;
        v = p.documentElement;
        u = v.requestFullscreen || v.mozRequestFullScreen || v.webkitRequestFullScreen || v.msRequestFullscreen;
        x = p.exitFullscreen || p.mozCancelFullScreen ||
            p.webkitExitFullscreen || p.msExitFullscreen;
        !1 === ENABLE_FULLSCREEN && (u = !1);
        u && !inIframe() && (p = s_oSpriteLibrary.getSprite("but_fullscreen"), a = p.width / 4 + 12, c = p.height / 2 + 16, q = new CToggle(a, c, p, s_bFullscreen, s_oStage), q.addEventListener(ON_MOUSE_UP, this._onFullscreenRelease, this));
        e = 64;
        h = CANVAS_HEIGHT - 40;
        r = new createjs.Container;
        r.x = e;
        r.y = h;
        s_oStage.addChild(r);
        p = new createjs.Text(" " + s_iTotalScore, "bold 30px " + PRIMARY_FONT, "#000000");
        p.textAlign = "left";
        p.textBaseline = "middle";
        p.lineWidth = 500;
        p.outline =
            5;
        r.addChild(p);
        p = new createjs.Text(" " + s_iTotalScore, "bold 30px " + PRIMARY_FONT, "#ffffff");
        p.textAlign = "left";
        p.textBaseline = "middle";
        p.lineWidth = 500;
        r.addChild(p);
        p = s_oSpriteLibrary.getSprite("star");
        v = createBitmap(p);
        v.regX = p.width / 2;
        v.regY = p.height / 2;
        v.x = -p.width / 2;
        r.addChild(v);
        this.refreshButtonPos(s_iOffsetX, s_iOffsetY)
    };
    this.refreshButtonPos = function(k, l) {
        n.setPosition(f - k, l + g);
        !1 !== DISABLE_SOUND_MOBILE && !1 !== s_bMobile || t.setPosition(b - k, l + d);
        u && !inIframe() && q.setPosition(a + k, c + l);
        r.x = e + k;
        r.y = h - l
    };
    this.unload = function() {
        for (var a = 0; a < m.length; a++) m[a].unload();
        s_oWorldMenu = null;
        s_oStage.removeAllChildren();
        if (!1 === DISABLE_SOUND_MOBILE || !1 === s_bMobile) t.unload(), t = null;
        u && !inIframe() && q.unload()
    };
    this._setLevelActive = function() {
        for (var a = 0, b = 0; b < l.length; b++) 0 < l[b] && (a = b + 1);
        if (a === NUM_TRACKS_PER_WORLD * m.length)
            for (b = 0; b < m.length; b++) m[b].enable();
        else {
            a = Math.floor(a / NUM_TRACKS_PER_WORLD);
            for (b = 0; b < a + 1; b++) m[b].enable();
            m[a].pulseAnimation()
        }
    };
    this._onLevelBut = function(a) {
        var b = a * NUM_TRACKS_PER_WORLD;
        new CTrackMenu(a, [l[b], l[b + 1], l[b + 2]])
    };
    this.resetFullscreenBut = function() {
        q.setActive(s_bFullscreen)
    };
    this._onFullscreenRelease = function() {
        s_bFullscreen ? x.call(window.document) : u.call(window.document.documentElement);
        sizeHandler()
    };
    this._onAudioToggle = function() {
        Howler.mute(s_bAudioActive);
        s_bAudioActive = !s_bAudioActive
    };
    this._onExit = function() {
        $(s_oMain).trigger("end_session");
        this.unload();
        s_oMain.gotoMenu()
    };
    s_oWorldMenu = this;
    this._init()
}
var s_oWorldMenu = null;

function CTrackMenu(a, c) {
    var b, d, e, h, f;
    this._init = function(a, c) {
        e = new createjs.Shape;
        e.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        e.alpha = 0;
        e.on("mousedown", function() {});
        s_oStage.addChild(e);
        (new createjs.Tween.get(e)).to({
            alpha: .7
        }, 500);
        f = new createjs.Container;
        s_oStage.addChild(f);
        var g = s_oSpriteLibrary.getSprite("msg_box"),
            k = createBitmap(g);
        k.regX = g.width / 2;
        k.regY = g.height / 2;
        f.addChild(k);
        k = new createjs.Text(TEXT_SELECT_TRACK, "bold 40px " + PRIMARY_FONT, "#000000");
        k.y = -g.height / 2 + 90;
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.lineWidth = 400;
        k.outline = 5;
        f.addChild(k);
        var l = new createjs.Text(TEXT_SELECT_TRACK, "bold 40px " + PRIMARY_FONT, "#ffffff");
        l.y = k.y;
        l.textAlign = "center";
        l.textBaseline = "middle";
        l.lineWidth = 400;
        f.addChild(l);
        f.x = CANVAS_WIDTH / 2;
        f.y = CANVAS_HEIGHT + g.height / 2 + 70;
        b = f.y;
        (new createjs.Tween.get(f)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        g = s_oSpriteLibrary.getSprite("but_level");
        k = s_oSpriteLibrary.getSprite("image_" + a);
        l = s_oSpriteLibrary.getSprite("cover_" +
            a);
        d = [];
        for (var r = 0; r < NUM_TRACKS_PER_WORLD; r++) {
            var t = r + 1;
            d[r] = new CLevelBut(-180 + 180 * r, 0, g, l, k, f);
            d[r].addEventListenerWithParams(ON_MOUSE_UP, this._onStageBut, this, r);
            d[r].addLevelText(t);
            d[r].disable()
        }
        this._setStageInfo();
        g = s_oSpriteLibrary.getSprite("but_exit");
        h = new CGfxButton(326, -200, g, f);
        h.addEventListener(ON_MOUSE_UP, this._onBack, this)
    };
    this.unload = function() {
        for (var a = 0; a < NUM_TRACKS_PER_WORLD; a++) d[a].unload();
        e.off("mousedown", function() {});
        s_oStage.removeChild(e);
        s_oStage.removeChild(f)
    };
    this._setStageInfo = function() {
        for (var b = 0, e = 0; e < c.length; e++) 0 < c[e] && (b = e + 1);
        b < NUM_TRACKS_PER_WORLD && (d[b].enable(), d[b].addScore(LEVEL_INFO[a * NUM_TRACKS_PER_WORLD + b].time), d[b].pulseAnimation());
        for (e = 0; e < b; e++) d[e].enable(), d[e].addScore(c[e])
    };
    this._onStageBut = function(b) {
        this.unload();
        s_oWorldMenu.unload();
        s_oMain.gotoGame(a * NUM_TRACKS_PER_WORLD + b)
    };
    this._onBack = function() {
        for (var a = 0; 3 > a; a++) d[a].setClickable();
        h.setClickable();
        var c = this;
        (new createjs.Tween.get(e)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(f)).to({
                y: b
            },
            400, createjs.Ease.backIn).call(function() {
            c.unload()
        })
    };
    this._init(a, c)
}

function CLevelBut(a, c, b, d, e, h) {
    var f, g, l, m, k = [],
        n, r, t, q, u = null,
        x = null,
        p;
    this._init = function(a, b, c, e) {
        f = !1;
        g = 1;
        l = [];
        m = [];
        n = new createjs.Container;
        n.x = a;
        n.y = b;
        n.scaleX = n.scaleY = g;
        e.addChild(n);
        r = new createjs.Container;
        r.x = a;
        r.y = b;
        r.scaleX = n.scaleY = g;
        e.addChild(r);
        a = c.width / 2;
        b = c.height;
        c = new createjs.SpriteSheet({
            images: [c],
            frames: {
                width: a,
                height: b,
                regX: a / 2,
                regY: b / 2
            },
            animations: {
                on: [0],
                off: [1]
            }
        });
        p = createSprite(c, "on", a / 2, b / 2, a, b);
        n.addChild(p);
        d ? p.gotoAndStop("on") : p.gotoAndStop("off");
        this._initListener()
    };
    this.unload = function() {
        s_bMobile ? n.off("mousedown", this.buttonDown) : (n.off("mousedown", this.buttonDown), n.off("mouseover", this.buttonOver));
        n.off("pressup", this.buttonRelease);
        h.removeChild(n)
    };
    this.setVisible = function(a) {
        n.visible = a
    };
    this.enable = function() {
        p.gotoAndStop("on");
        f = !1;
        null !== x && (u.color = "#000000", x.color = "#ffffff")
    };
    this.disable = function() {
        f = !0;
        p.gotoAndStop("off");
        null !== x && (u.color = "#000000", x.color = "#a8a8a8")
    };
    this.setClickable = function(a) {
        f = !a
    };
    this.addInfo = function(a) {
        t = new createjs.Text(a,
            " 24px " + PRIMARY_FONT, "#000000");
        t.x = b.height / 2 - 24;
        t.y = -b.height / 2 + 10;
        t.textAlign = "center";
        t.textBaseline = "middle";
        t.lineWidth = 200;
        t.outline = 4;
        t.rotation = 30;
        n.addChild(t);
        q = new createjs.Text(a, " 24px " + PRIMARY_FONT, "#ffffff");
        q.x = t.x;
        q.y = t.y;
        q.textAlign = "center";
        q.textBaseline = "middle";
        q.lineWidth = 200;
        q.rotation = t.rotation;
        n.addChild(q)
    };
    this.addScore = function(a) {
        var c = new createjs.Text(formatTime(a), " 30px " + PRIMARY_FONT, "#000000");
        c.y = b.height / 2 + 12;
        c.textAlign = "center";
        c.textBaseline = "middle";
        c.lineWidth =
            200;
        c.outline = 4;
        r.addChild(c);
        a = new createjs.Text(formatTime(a), " 30px " + PRIMARY_FONT, "#ffffff");
        a.y = c.y;
        a.textAlign = "center";
        a.textBaseline = "middle";
        a.lineWidth = 200;
        r.addChild(a)
    };
    this.addLevelText = function(a) {
        u = new createjs.Text(a, " 80px " + PRIMARY_FONT, "#000000");
        u.y = 2;
        u.textAlign = "center";
        u.textBaseline = "middle";
        u.lineWidth = 200;
        u.outline = 8;
        n.addChild(u);
        x = new createjs.Text(a, " 80px " + PRIMARY_FONT, "#ffd800");
        x.y = 2;
        x.textAlign = "center";
        x.textBaseline = "middle";
        x.lineWidth = 200;
        n.addChild(x)
    };
    this._initListener =
        function() {
            if (s_bMobile) n.on("mousedown", this.buttonDown);
            else n.on("mousedown", this.buttonDown), n.on("mouseover", this.buttonOver);
            n.on("pressup", this.buttonRelease)
        };
    this.addEventListener = function(a, b, c) {
        l[a] = b;
        m[a] = c
    };
    this.addEventListenerWithParams = function(a, b, c, d) {
        l[a] = b;
        m[a] = c;
        k = d
    };
    this.buttonRelease = function() {
        f || (n.scaleX = g, n.scaleY = g, l[ON_MOUSE_UP] && l[ON_MOUSE_UP].call(m[ON_MOUSE_UP], k))
    };
    this.buttonDown = function() {
        f || (playSound("click", 1, 0), n.scaleX = .9 * g, n.scaleY = .9 * g, l[ON_MOUSE_DOWN] &&
            l[ON_MOUSE_DOWN].call(m[ON_MOUSE_DOWN], k))
    };
    this.buttonOver = function(a) {
        s_bMobile || f || (a.target.cursor = "pointer")
    };
    this.pulseAnimation = function() {
        createjs.Tween.get(n).to({
            scaleX: 1.1 * g,
            scaleY: 1.1 * g
        }, 850, createjs.Ease.quadOut).to({
            scaleX: g,
            scaleY: g
        }, 650, createjs.Ease.quadIn).call(function() {
            v.pulseAnimation()
        })
    };
    this.trembleAnimation = function() {
        createjs.Tween.get(n).to({
            rotation: 5
        }, 75, createjs.Ease.quadOut).to({
            rotation: -5
        }, 140, createjs.Ease.quadIn).to({
            rotation: 0
        }, 75, createjs.Ease.quadIn).wait(750).call(function() {
            v.trebleAnimation()
        })
    };
    this.setImage = function(a) {};
    this.setPosition = function(a, b) {
        n.x = a;
        n.y = b
    };
    this.setScale = function(a) {
        g = a;
        n.scaleX = n.scaleY = a
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
    var v = this;
    this._init(a, c, b, h);
    return this
}
var ROAD_INFO = [],
    AMBIENT_INFO = [],
    LEVEL_INFO = [];
ROAD_INFO[0] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.SHORT
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.MEDIUM
}];
LEVEL_INFO[0] = {
    time: 65E3,
    num_cars: 10,
    terrain: {
        roadbounds: 2,
        num_lanes: 3,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#6B6B6B",
                grass: "#96a54b",
                rumble: "#555555",
                lane: "#CCCCCC"
            },
            dark: {
                road: "#696969",
                grass: "#7e8b3e",
                rumble: "#BBBBBB"
            }
        }
    }
};
AMBIENT_INFO[0] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [0, 800],
    position: 0,
    occurrence: 30,
    repetitionevery: 1,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [800, 1200],
    position: 0,
    occurrence: 30,
    repetitionevery: 2,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH1,
    segments: [1E3, 1200],
    position: 0,
    occurrence: 10,
    repetitionevery: 1,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH1,
    segments: [1200, 2E3],
    position: 0,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH2,
    segments: [1600, 2600],
    position: 0,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [1200, 4E3],
    position: .5,
    occurrence: 10,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [2E3, 4E3],
    position: .5,
    occurrence: 30,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD03,
    segments: 400,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: 1200,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [3E3, 3200],
    position: 0,
    repetitionevery: 30,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BOULDER,
    segments: 1800,
    position: 1,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[1] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.LONG,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}];
LEVEL_INFO[1] = {
    time: 7E4,
    num_cars: 15,
    terrain: {
        roadbounds: 2,
        num_lanes: 3,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#6B6B6B",
                grass: "#96a54b",
                rumble: "#555555",
                lane: "#CCCCCC"
            },
            dark: {
                road: "#696969",
                grass: "#7e8b3e",
                rumble: "#BBBBBB"
            }
        }
    }
};
AMBIENT_INFO[1] = [{
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.TREE2,
        segments: [0, 450],
        position: 0,
        occurrence: 30,
        repetitionevery: 2,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BUSH2,
        segments: [0, 450],
        position: 0,
        occurrence: 30,
        repetitionevery: 2,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BOULDER,
        segments: [0, 450],
        position: 0,
        occurrence: 10,
        repetitionevery: 3,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BILLBOARD02,
        segments: [350, 450],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.TREE2,
        segments: [450, 1500],
        position: 0,
        occurrence: 40,
        repetitionevery: 2,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BUSH2,
        segments: [450, 1500],
        position: 0,
        occurrence: 30,
        repetitionevery: 4,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD04,
        segments: [900, 1200],
        position: 0,
        repetitionevery: 50,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD04,
        segments: [925, 1225],
        position: 0,
        repetitionevery: 50,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.TREE2,
        segments: [1500, 3800],
        position: 1,
        occurrence: 20,
        repetitionevery: 4,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BOULDER,
        segments: [1500, 2800],
        position: 0,
        occurrence: 10,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.STUMP,
        segments: [1500,
            2800
        ],
        position: 0,
        occurrence: 10,
        repetitionevery: 15,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.TREE1,
        segments: [2400, 3200],
        position: 0,
        occurrence: 30,
        repetitionevery: 5,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BUSH2,
        segments: [3200, 3800],
        position: 0,
        occurrence: 20,
        repetitionevery: 4,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD03,
        segments: 1700,
        position: 5,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD01,
        segments: 2E3,
        position: 4,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD04,
        segments: 2300,
        position: 5,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD02,
        segments: 2600,
        position: 6,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD03,
        segments: 2900,
        position: 3,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BILLBOARD03,
        segments: 3650,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }
];
ROAD_INFO[2] = [{
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.HARD
    },
    {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: -ROAD.CURVE.EASY
    }, {
        roadtype: ROAD.TYPE.FINAL,
        length: ROAD.LENGTH.MEDIUM
    }
];
LEVEL_INFO[2] = {
    time: 7E4,
    num_cars: 15,
    terrain: {
        roadbounds: 2,
        num_lanes: 3,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#6B6B6B",
                grass: "#96a54b",
                rumble: "#555555",
                lane: "#CCCCCC"
            },
            dark: {
                road: "#696969",
                grass: "#7e8b3e",
                rumble: "#BBBBBB"
            }
        }
    }
};
AMBIENT_INFO[2] = [{
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.TREE2,
    segments: [0, 700],
    position: 0,
    occurrence: 30,
    repetitionevery: 3,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [0, 1700],
    position: 0,
    occurrence: 30,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BUSH1,
    segments: [480, 1700],
    position: 0,
    occurrence: 30,
    repetitionevery: 4,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [1700, 2300],
    position: 0,
    occurrence: 20,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.DEAD_TREE,
    segments: [1700, 2700],
    position: 0,
    occurrence: 40,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.DEAD_TREE,
    segments: [2300, 3700],
    position: 0,
    occurrence: 40,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.TREE1,
    segments: [3400, 3700],
    position: 0,
    occurrence: 20,
    repetitionevery: 6,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [1500, 3700],
    position: 0,
    occurrence: 10,
    repetitionevery: 16,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD01,
    segments: [1700, 2E3],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [1725, 2025],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD03,
    segments: 1300,
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD05,
    segments: [2400, 2800],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [3100, 3400],
    position: .5,
    repetitionevery: 50,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD05,
    segments: 2300,
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[3] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.LONG
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.EASY
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.EASY,
    hill: ROAD.HILL.LOW
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.EASY,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: -ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    curve: ROAD.CURVE.MEDIUM,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[3] = {
    time: 73E3,
    num_cars: 20,
    terrain: {
        roadbounds: 2,
        num_lanes: 2,
        adherence: .5,
        max_inertia: 0,
        color: {
            light: {
                road: "#d5c95f",
                grass: "#f4e77a",
                rumble: "#a76b24",
                lane: "#a76b24"
            },
            dark: {
                road: "#dbce64",
                grass: "#ebde6f",
                rumble: "#a76b24"
            }
        }
    }
};
AMBIENT_INFO[3] = [{
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.PALM_TREE,
    segments: [0, 800],
    position: 0,
    repetitionevery: 16,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.PALM_TREE,
    segments: [0, 800],
    position: 0,
    repetitionevery: 13,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.PALM_TREE,
    segments: [800, 1600],
    position: 2,
    occurrence: 20,
    repetitionevery: 20,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.CACTUS1,
    segments: [1400,
        2600
    ],
    position: .5,
    occurrence: 20,
    repetitionevery: 5,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 2800],
    position: 2,
    occurrence: 10,
    repetitionevery: 13,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD01,
    segments: [2200, 2500],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD02,
    segments: [2800, 3200],
    position: 0,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.PRECISE
}];
ROAD_INFO[4] = [{
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.EXTRALONG,
    hill: ROAD.HILL.MEDIUM
}, {
    roadtype: ROAD.TYPE.STANDARD,
    length: ROAD.LENGTH.MEDIUM,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.BUMPS,
    length: ROAD.LENGTH.SHORT / 2,
    curve: -ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.BUMPS,
    length: ROAD.LENGTH.SHORT / 2,
    curve: ROAD.CURVE.MEDIUM
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.MEDIUM,
    curve: ROAD.CURVE.HARD,
    hill: ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.CURVE_S,
    length: ROAD.LENGTH.LONG,
    curve: -ROAD.CURVE.MEDIUM,
    hill: -ROAD.HILL.HIGH
}, {
    roadtype: ROAD.TYPE.FINAL,
    length: ROAD.LENGTH.LONG
}];
LEVEL_INFO[4] = {
    time: 78E3,
    num_cars: 20,
    terrain: {
        roadbounds: 2,
        num_lanes: 2,
        adherence: .5,
        max_inertia: 0,
        color: {
            light: {
                road: "#f4e77a",
                grass: "#f4e77a",
                rumble: "#a76b24",
                lane: "#a76b24"
            },
            dark: {
                road: "#ebde6f",
                grass: "#ebde6f",
                rumble: "#a76b24"
            }
        }
    }
};
AMBIENT_INFO[4] = [{
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 3900],
    position: 2,
    occurrence: 10,
    repetitionevery: 20,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BOULDER,
    segments: [0, 3900],
    position: 5,
    occurrence: 5,
    repetitionevery: 60,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.BILLBOARD04,
    segments: 770,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.BOTH,
    sprite: SPRITES.COLUMN,
    segments: [780, 1400],
    position: 0,
    repetitionevery: 14,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.CACTUS1,
    segments: [1800, 3200],
    position: 5,
    occurrence: 30,
    repetitionevery: 15,
    disposition: AMBIENT.DISPOSITION.DENSITY
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.BILLBOARD04,
    segments: 1650,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.RIGHT,
    sprite: SPRITES.BILLBOARD02,
    segments: 2E3,
    position: 0,
    disposition: AMBIENT.DISPOSITION.PRECISE
}, {
    side: AMBIENT.SIDE.LEFT,
    sprite: SPRITES.CACTUS1,
    segments: [2400,
        3600
    ],
    position: 0,
    occurrence: 70,
    repetitionevery: 15,
    disposition: AMBIENT.DISPOSITION.DENSITY
}];
ROAD_INFO[5] = [{
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        hill: ROAD.HILL.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        hill: ROAD.HILL.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT / 2,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT / 2,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT / 2,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.HARD,
        hill: -ROAD.HILL.MEDIUM
    },
    {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT / 2,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT / 2,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT / 2,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.HARD,
        hill: ROAD.HILL.MEDIUM
    }, {
        roadtype: ROAD.TYPE.BUMPS,
        length: ROAD.LENGTH.SHORT / 2
    }, {
        roadtype: ROAD.TYPE.BUMPS,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.EASY
    },
    {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.EASY
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.FINAL,
        length: ROAD.LENGTH.LONG
    }
];
LEVEL_INFO[5] = {
    time: 6E4,
    num_cars: 25,
    terrain: {
        roadbounds: 2,
        num_lanes: 2,
        adherence: .5,
        max_inertia: 0,
        color: {
            light: {
                road: "#f4e77a",
                grass: "#f4e77a",
                rumble: "#a76b24",
                lane: "#a76b24"
            },
            dark: {
                road: "#ebde6f",
                grass: "#ebde6f",
                rumble: "#a76b24"
            }
        }
    }
};
AMBIENT_INFO[5] = [{
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BILLBOARD05,
        segments: 20,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BOULDER,
        segments: [0, 3900],
        position: 2,
        occurrence: 10,
        repetitionevery: 20,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BOULDER,
        segments: [0, 3900],
        position: 5,
        occurrence: 5,
        repetitionevery: 60,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.CACTUS2,
        segments: [40, 1600],
        position: 0,
        occurrence: 70,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.CACTUS2,
        segments: [1600, 3900],
        position: 1,
        occurrence: 35,
        repetitionevery: 20,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD03,
        segments: [1500, 1700],
        position: 0,
        repetitionevery: 40,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD04,
        segments: [1525, 1725],
        position: 0,
        repetitionevery: 40,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BOULDER,
        segments: [2200, 2650],
        position: 0,
        occurrence: 70,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BOULDER,
        segments: [2200, 2650],
        position: 0,
        occurrence: 40,
        repetitionevery: 8,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BOULDER,
        segments: [2200, 2650],
        position: 0,
        occurrence: 30,
        repetitionevery: 7,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }
];
ROAD_INFO[6] = [{
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: ROAD.CURVE.HARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.HARD,
        hill: -ROAD.HILL.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        hill: -ROAD.HILL.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: -ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.LOW
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        hill: -ROAD.HILL.LOW
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.MEDIUM
    },
    {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG
    }, {
        roadtype: ROAD.TYPE.FINAL,
        length: ROAD.LENGTH.LONG
    }
];
LEVEL_INFO[6] = {
    time: 9E4,
    num_cars: 60,
    terrain: {
        roadbounds: 2,
        num_lanes: 4,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#2a2a2a",
                grass: "#010e18",
                rumble: "#2a2a2a",
                lane: "#ffffff"
            },
            dark: {
                road: "#2a2a2a",
                grass: "#00080e",
                rumble: "#ffffff"
            }
        }
    }
};
AMBIENT_INFO[6] = [{
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.HOUSE1,
        segments: [0, 5E3],
        position: 5,
        occurrence: 20,
        repetitionevery: 100,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_INDICATION,
        segments: [900, 5E3],
        position: -1,
        repetitionevery: 900,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [3845, 3900],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [2100, 2550],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_CURVE_LEFT,
        segments: [2700, 3150],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.LAMP_LEFT,
        segments: [300, 850],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.LAMP_RIGHT,
        segments: [300, 850],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.LAMP_LEFT,
        segments: [3950, 4500],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.LAMP_RIGHT,
        segments: [3965, 4500],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }
];
ROAD_INFO[7] = [{
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: ROAD.CURVE.MEDIUM,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM
    },
    {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.HARD
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.HARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.HARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: -ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: -ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.FINAL,
        length: ROAD.LENGTH.LONG
    }
];
LEVEL_INFO[7] = {
    time: 11E4,
    num_cars: 70,
    terrain: {
        roadbounds: 2,
        num_lanes: 4,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#2a2a2a",
                grass: "#010e18",
                rumble: "#2a2a2a",
                lane: "#ffffff"
            },
            dark: {
                road: "#2a2a2a",
                grass: "#00080e",
                rumble: "#ffffff"
            }
        }
    }
};
AMBIENT_INFO[7] = [{
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.LAMP_LEFT,
        segments: [0, 5E3],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.LAMP_RIGHT,
        segments: [15, 5E3],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.HOUSE1,
        segments: [50, 5E3],
        position: 5,
        occurrence: 20,
        repetitionevery: 100,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.HOUSE2,
        segments: [0,
            5E3
        ],
        position: 5,
        occurrence: 20,
        repetitionevery: 100,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_INDICATION,
        segments: [1100, 5E3],
        position: -1,
        repetitionevery: 1100,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BILLBOARD01,
        segments: [10, 650],
        position: 0,
        repetitionevery: 60,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_CURVE_LEFT,
        segments: [3070, 3270],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [3400, 3570],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_CURVE_LEFT,
        segments: [3700, 4100],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [4300, 4700],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }
];
ROAD_INFO[8] = [{
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.MEDIUM,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.HARD,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.MEDIUM,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: ROAD.CURVE.HARD,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: -ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.EASY,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: -ROAD.CURVE.EASY
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.MEDIUM,
        hill: -ROAD.HILL.HIGH
    },
    {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.MEDIUM,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.HARD,
        hill: ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: -ROAD.CURVE.MEDIUM,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        hill: -ROAD.HILL.HIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: -ROAD.CURVE.MEDIUM,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.LONG,
        curve: -ROAD.CURVE.HARD,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.EXTRALONG,
        curve: ROAD.CURVE.VERYHARD,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.SHORT,
        curve: ROAD.CURVE.EASY,
        hill: -ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.STANDARD,
        length: ROAD.LENGTH.MEDIUM,
        curve: ROAD.CURVE.VERYHARD,
        hill: ROAD.HILL.VERYHIGH
    }, {
        roadtype: ROAD.TYPE.FINAL,
        length: ROAD.LENGTH.EXTRALONG
    }
];
LEVEL_INFO[8] = {
    time: 13E4,
    num_cars: 80,
    terrain: {
        roadbounds: 4,
        num_lanes: 4,
        adherence: 1,
        max_inertia: .03,
        color: {
            light: {
                road: "#2a2a2a",
                grass: "#010e18",
                rumble: "#2a2a2a",
                lane: "#ffffff"
            },
            dark: {
                road: "#2a2a2a",
                grass: "#00080e",
                rumble: "#ffffff"
            }
        }
    }
};
AMBIENT_INFO[8] = [{
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.HOUSE2,
        segments: [0, 7E3],
        position: 5,
        occurrence: 20,
        repetitionevery: 50,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.HOUSE1,
        segments: [2500, 3700],
        position: 1,
        occurrence: 40,
        repetitionevery: 12,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.HOUSE2,
        segments: [2505, 3700],
        position: 1,
        occurrence: 40,
        repetitionevery: 12,
        disposition: AMBIENT.DISPOSITION.DENSITY
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.LAMP_LEFT,
        segments: [0, 2400],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.LAMP_RIGHT,
        segments: [15, 2400],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BILLBOARD04,
        segments: 2480,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.LAMP_LEFT,
        segments: [2500, 3680],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.LAMP_RIGHT,
        segments: [2500, 3680],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.BOTH,
        sprite: SPRITES.BILLBOARD04,
        segments: 3700,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.LAMP_LEFT,
        segments: [3750, 6570],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.LAMP_RIGHT,
        segments: [3765, 6585],
        position: 0,
        repetitionevery: 30,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_INDICATION,
        segments: [900, 6E3],
        position: -1,
        repetitionevery: 900,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [1500, 1700],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_CURVE_LEFT,
        segments: [2E3, 2400],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.SIGN_CURVE_LEFT,
        segments: [4800, 5E3],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [5100, 5200],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.SIGN_CURVE_RIGHT,
        segments: [5300, 5700],
        position: .3,
        repetitionevery: 10,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD01,
        segments: 6100,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    },
    {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD02,
        segments: 6200,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD03,
        segments: 6300,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD04,
        segments: 6400,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.LEFT,
        sprite: SPRITES.BILLBOARD05,
        segments: 6500,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD01,
        segments: 6150,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD02,
        segments: 6250,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD03,
        segments: 6350,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD04,
        segments: 6450,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }, {
        side: AMBIENT.SIDE.RIGHT,
        sprite: SPRITES.BILLBOARD05,
        segments: 6550,
        position: 0,
        disposition: AMBIENT.DISPOSITION.PRECISE
    }
];

function CHorizon(a) {
    var c, b, d;
    this._init = function(a) {
        c = 0;
        d = new createjs.Container;
        s_oStage.addChild(d);
        b = [];
        var e = Math.floor(a / NUM_TRACKS_PER_WORLD);
        a = "w" + e + "_bg1";
        e = s_oSpriteLibrary.getSprite("w" + e + "_bg0");
        this._addBG(e);
        e = s_oSpriteLibrary.getSprite(a);
        this._addBG(e)
    };
    this._addBG = function(a) {
        a = new CBackground(a, d);
        b.push(a)
    };
    this.resetPos = function() {
        c = 0
    };
    this.restart = function() {
        for (var a = 0; a < b.length; a++) b[a].restart()
    };
    this.move = function(a) {
        var d = c - a.x;
        b[0].moveX(d);
        b[1].moveX(d * PARALLAX_RATIO_X);
        b[0].moveY(a.y * PARALLAX_RATIO_Y_0);
        b[1].moveY(a.y * PARALLAX_RATIO_Y_1);
        c = a.x
    };
    this._init(a)
}

function CBackground(a, c) {
    var b, d, e;
    this._init = function() {
        b = a.height / 2 - (CANVAS_HEIGHT - 2 * s_iOffsetY) / 2;
        e = new createjs.Container;
        c.addChild(e);
        d = [];
        for (var h = 0; 2 > h; h++) d[h] = createBitmap(a), d[h].regY = a.height / 2, d[h].x = h * a.width, d[h].y = CANVAS_HEIGHT / 2, e.addChild(d[h]), d[h].cache(0, 0, a.width, a.height)
    };
    this.restart = function() {
        e.x = 0;
        for (var b = e.y = 0; 2 > b; b++) d[b].x = b * a.width, d[b].y = CANVAS_HEIGHT / 2
    };
    this.moveX = function(b) {
        e.x += b;
        b = Math.floor(-e.x / a.width) * a.width;
        for (var c = 0; 2 > c; c++) d[c].x = b + c * a.width
    };
    this.moveY =
        function(a) {
            a < -b && (a = -b);
            a > b && (a = b);
            e.y = a
        };
    this._init()
}

function CNextLevelPanel(a, c, b) {
    var d, e, h, f, g;
    this._init = function(a, b, c) {
        playSound("arrive_win", 1, !1);
        setVolume(s_aSounds.game_soundtrack, .5);
        h = new createjs.Shape;
        h.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        h.alpha = 0;
        h.on("mousedown", function() {});
        s_oStage.addChild(h);
        (new createjs.Tween.get(h)).to({
            alpha: .7
        }, 500);
        e = new createjs.Container;
        s_oStage.addChild(e);
        var k = s_oSpriteLibrary.getSprite("msg_box"),
            l = createBitmap(k);
        l.regX = k.width / 2;
        l.regY = k.height / 2;
        e.addChild(l);
        l =
            new createjs.Text(TEXT_TRACK_COMPLETED, " 40px " + PRIMARY_FONT, "#000000");
        l.y = -k.height / 2 + 80;
        l.textAlign = "center";
        l.textBaseline = "middle";
        l.lineWidth = 500;
        l.outline = 5;
        e.addChild(l);
        k = new createjs.Text(TEXT_TRACK_COMPLETED, " 40px " + PRIMARY_FONT, "#ffffff");
        k.y = l.y;
        k.textAlign = "center";
        k.textBaseline = "middle";
        k.lineWidth = 500;
        e.addChild(k);
        l = new createjs.Container;
        l.x = -220;
        l.y = -30;
        e.addChild(l);
        k = s_oSpriteLibrary.getSprite("timer");
        var m = createBitmap(k);
        m.regX = k.width / 2;
        m.regY = k.height / 2;
        l.addChild(m);
        k =
            new createjs.Text(formatTime(LEVEL_INFO[c].time - a), " 50px " + PRIMARY_FONT, "#ffffff");
        k.x = 34;
        k.textAlign = "left";
        k.textBaseline = "middle";
        k.lineWidth = 200;
        l.addChild(k);
        a = new createjs.Container;
        a.x = 120;
        a.y = l.y;
        e.addChild(a);
        k = s_oSpriteLibrary.getSprite("star");
        c = createBitmap(k);
        c.regX = k.width / 2;
        c.regY = k.height / 2;
        a.addChild(c);
        var n = new createjs.Text(0, " 50px " + PRIMARY_FONT, "#ffffff");
        n.x = 34;
        n.textAlign = "left";
        n.textBaseline = "middle";
        n.lineWidth = 200;
        a.addChild(n);
        e.x = CANVAS_WIDTH / 2;
        e.y = CANVAS_HEIGHT + k.height /
            2;
        d = e.y;
        (new createjs.Tween.get(e)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn).call(function() {
            new CRollingText(n, b, 5E3, !1)
        });
        this._sendScore();
        k = s_oSpriteLibrary.getSprite("but_next");
        f = new CGfxButton(120, 100, k, e);
        f.addEventListener(ON_MOUSE_UP, this._onContinue, this);
        f.pulseAnimation();
        k = s_oSpriteLibrary.getSprite("but_restart");
        g = new CGfxButton(-120, 100, k, e);
        g.addEventListener(ON_MOUSE_UP, this._onRestart, this)
    };
    this.unload = function() {
        h.off("mousedown", function() {});
        s_oStage.removeChild(h);
        e.removeAllChildren(h);
        f.unload();
        g.unload()
    };
    this._sendScore = function() {
        var d = LEVEL_INFO[b].time - a;
        s_iTotalScore += c;
        if (d < s_aTimeScore[b] || 0 === s_aTimeScore[b]) s_aTimeScore[b] = d;
        s_oLocalStorage.saveData();
        $(s_oMain).trigger("save_score", s_iTotalScore)
    };
    this._onContinue = function() {
        g.setClickable(!1);
        f.setClickable(!1);
        (new createjs.Tween.get(h)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(e)).to({
            y: d
        }, 400, createjs.Ease.backIn).call(function() {
            l.unload();
            s_oGame.nextLevel()
        })
    };
    this._onRestart = function() {
        g.setClickable(!1);
        f.setClickable(!1);
        (new createjs.Tween.get(h)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(e)).to({
            y: d
        }, 400, createjs.Ease.backIn).call(function() {
            l.unload();
            s_oGame.restartGame()
        })
    };
    this._onFinishRolling = function() {};
    this._onRollingRemoved = function() {};
    this._onRollingText = function(a) {
        (void 0).playManualMode(a, STAR_EFFECT_SCALE)
    };
    var l = this;
    this._init(a, c, b)
}

function CRollingText(a, c, b, d) {
    var e = null,
        h;
    this._init = function(a, b, c) {
        h = {
            value: a.text
        };
        e = createjs.Tween.get(h, {
            override: !0
        }).to({
            value: b
        }, c, createjs.Ease.cubicInOut).addEventListener("change", function() {
            a.text = d ? formatTime(h.value) : "+" + Math.floor(h.value)
        }).call(function() {
            createjs.Tween.removeTweens(e)
        })
    };
    this._init(a, c, b);
    return this
}
var LOCALSTORAGE_TIMES = "times",
    LOCALSTORAGE_TOTALSCORE = "totalscore",
    s_aTimeScore = [],
    s_iTotalScore = 0;

function CLocalStorage(a) {
    var c = !0;
    this._init = function(a) {
        a = window.localStorage.getItem(a);
        this.resetAllData();
        null !== a && void 0 !== a && this.loadData()
    };
    this.isDirty = function() {
        for (var a = 0; a < s_aTimeScore.length; a++)
            if (0 < s_aTimeScore[a]) return !0;
        return !1
    };
    this.isUsed = function() {
        try {
            window.localStorage.setItem("ls_available", "ok")
        } catch (b) {
            c = !1
        }
        return c
    };
    this.resetAllData = function() {
        s_aTimeScore = [];
        for (var a = 0; a < NUM_TRACKS_PER_WORLD * NUM_WORLDS; a++) s_aTimeScore[a] = 0;
        s_iTotalScore = 0
    };
    this.deleteData = function() {
        window.localStorage.removeItem(a)
    };
    this.saveData = function() {
        var b = {};
        b[LOCALSTORAGE_TIMES] = s_aTimeScore;
        b[LOCALSTORAGE_TOTALSCORE] = s_iTotalScore;
        window.localStorage.setItem(a, JSON.stringify(b))
    };
    this.loadData = function() {
        var b = JSON.parse(window.localStorage.getItem(a)),
            c = b[LOCALSTORAGE_TIMES];
        s_aTimeScore = [];
        for (var e = 0; e < c.length; e++) s_aTimeScore[e] = parseInt(c[e]);
        s_iTotalScore = parseInt(b[LOCALSTORAGE_TOTALSCORE])
    };
    this._init(a)
}

function CLosePanel() {
    var a, c, b, d, e;
    this._init = function() {
        setVolume(s_aSounds.game_soundtrack, .5);
        c = new createjs.Shape;
        c.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        c.alpha = 0;
        c.on("mousedown", function() {});
        s_oStage.addChild(c);
        (new createjs.Tween.get(c)).to({
            alpha: .7
        }, 500);
        b = new createjs.Container;
        s_oStage.addChild(b);
        var f = s_oSpriteLibrary.getSprite("msg_box"),
            g = createBitmap(f);
        g.regX = f.width / 2;
        g.regY = f.height / 2;
        b.addChild(g);
        b.x = CANVAS_WIDTH / 2;
        b.y = CANVAS_HEIGHT + f.height /
            2;
        a = b.y;
        (new createjs.Tween.get(b)).to({
            y: CANVAS_HEIGHT / 2
        }, 500, createjs.Ease.quartIn);
        f = s_oSpriteLibrary.getSprite("baloon_mc");
        g = createBitmap(f);
        g.regX = f.width / 2;
        g.regY = f.height / 2;
        g.y = -10;
        g.scaleX = g.scaleY = .6;
        b.addChild(g);
        g = new createjs.Text(TEXT_TIME_IS_UP, " 50px " + PRIMARY_FONT, "#000000");
        g.y = -f.height / 2 + 60;
        g.textAlign = "center";
        g.textBaseline = "middle";
        g.lineWidth = 400;
        g.outline = 5;
        b.addChild(g);
        f = new createjs.Text(TEXT_TIME_IS_UP, " 50px " + PRIMARY_FONT, "#ffffff");
        f.y = g.y;
        f.textAlign = "center";
        f.textBaseline =
            "middle";
        f.lineWidth = 400;
        b.addChild(f);
        f = s_oSpriteLibrary.getSprite("but_exit");
        d = new CGfxButton(120, 100, f, b);
        d.addEventListener(ON_MOUSE_UP, this._onExit, this);
        f = s_oSpriteLibrary.getSprite("but_restart");
        e = new CGfxButton(-120, 100, f, b);
        e.addEventListener(ON_MOUSE_UP, this._onRestart, this);
        e.pulseAnimation()
    };
    this.unload = function() {
        s_oStage.removeChild(b);
        c.off("mousedown", function() {});
        d.unload();
        e.unload()
    };
    this.show = function() {
        playSound("arrive_lose", 1, 0)
    };
    this._onExit = function() {
        c.off("mousedown",
            function() {});
        s_oStage.removeChild(b);
        s_oGame.onExit()
    };
    this._onRestart = function() {
        e.setClickable(!1);
        d.setClickable(!1);
        (new createjs.Tween.get(c)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(b)).to({
            y: a
        }, 400, createjs.Ease.backIn).call(function() {
            h.unload();
            s_oGame.restartGame()
        })
    };
    var h = this;
    this._init();
    return this
}

function CTimer(a, c, b, d, e, h, f) {
    var g, l, m;
    this._init = function(a, b, c, d, e, f, h) {
        g = new createjs.Container;
        g.x = a;
        g.y = b;
        c.addChild(g);
        a = 0;
        f && (f = s_oSpriteLibrary.getSprite(f), a = createBitmap(f), a.regY = f.height / 2, g.addChild(a), a = f.width);
        l = new createjs.Text("00:00", " " + d + "px " + PRIMARY_FONT, h);
        l.x = a + 10;
        l.textAlign = "left";
        l.textBaseline = "middle";
        l.lineWidth = 500;
        l.outline = 6;
        g.addChild(l);
        m = new createjs.Text(l.text, " " + d + "px " + PRIMARY_FONT, e);
        m.x = l.x;
        m.y = l.y;
        m.textAlign = l.textAlign;
        m.textBaseline = l.textBaseline;
        m.lineWidth = l.lineWidth;
        g.addChild(m);
        g.regX = g.getBounds().width / 2
    };
    this.setDecimalTime = function(a) {
        a = formatTime(a);
        l.text = a;
        m.text = a
    };
    this.setIntTime = function(a) {
        a = Math.floor(a / 1E3);
        l.text = a;
        m.text = a
    };
    this.setSpeedIndicator = function(a) {
        a = Math.floor(a);
        l.text = a;
        m.text = a
    };
    this.setAlign = function(a, b) {
        l.textAlign = a;
        l.textBaseline = b;
        m.textAlign = l.textAlign;
        m.textBaseline = l.textBaseline
    };
    this.resetTextRelativePos = function() {
        l.x = 0;
        l.y = 0;
        m.x = l.x;
        m.y = l.y;
        g.regX = 0
    };
    this.setPos = function(a, b) {
        g.x = a;
        g.y = b
    };
    this._init(a,
        c, b, d, e, h, f)
}

function CTachometer(a, c) {
    var b, d, e, h;
    this._init = function(a, c) {
        b = a;
        d = c;
        e = new createjs.Container;
        e.x = b;
        e.y = d;
        s_oStage.addChild(e);
        var f = s_oSpriteLibrary.getSprite("tachometer"),
            g = createBitmap(f);
        g.regX = f.width / 2;
        g.regY = f.height;
        e.addChild(g);
        f = new createjs.Text(TEXT_SPEED_INDICATOR, " 40px " + PRIMARY_FONT, "#ffcc00");
        f.textAlign = "center";
        f.textBaseline = "alphabetic";
        f.lineWidth = 300;
        f.y = -90;
        e.addChild(f);
        g = new createjs.Text(TEXT_SPEED_INDICATOR, " 40px " + PRIMARY_FONT, "#ffcc00");
        g.textAlign = "center";
        g.textBaseline =
            "alphabetic";
        g.lineWidth = 300;
        g.y = f.y;
        e.addChild(g);
        f = new createjs.Text("888", " 58px " + SECONDARY_FONT, "#222222");
        f.textAlign = "right";
        f.textBaseline = "alphabetic";
        f.lineWidth = 300;
        f.x = 40;
        f.y = -26;
        e.addChild(f);
        h = new createjs.Text(TEXT_SPEED_INDICATOR, " 58px " + SECONDARY_FONT, "#ffffff");
        h.textAlign = f.textAlign;
        h.textBaseline = f.textBaseline;
        h.lineWidth = f.lineWidth;
        h.x = f.x;
        h.y = f.y;
        e.addChild(h)
    };
    this.setSpeedIndicator = function(a) {
        h.text = Math.floor(a)
    };
    this.updateOffset = function(a, c) {
        e.x = b + a;
        e.y = d - c
    };
    this._init(a,
        c)
}

function CMsgBox(a, c) {
    var b, d, e, h, f, g;
    this._init = function(a, c) {
        f = new createjs.Shape;
        f.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        f.alpha = 0;
        f.on("mousedown", function() {});
        s_oStage.addChild(f);
        (new createjs.Tween.get(f)).to({
            alpha: .7
        }, 500);
        g = new createjs.Container;
        s_oStage.addChild(g);
        var k = s_oSpriteLibrary.getSprite("msg_box"),
            l = createBitmap(k);
        l.regX = k.width / 2;
        l.regY = k.height / 2;
        g.addChild(l);
        g.x = CANVAS_WIDTH / 2;
        g.y = CANVAS_HEIGHT + k.height / 2;
        b = g.y;
        (new createjs.Tween.get(g)).to({
            y: CANVAS_HEIGHT / 2 -
                40
        }, 500, createjs.Ease.quartIn);
        d = new createjs.Text(a, " 26px " + PRIMARY_FONT, "#000000");
        d.y = -k.height / 2 + 60;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.lineWidth = 550;
        d.outline = 5;
        g.addChild(d);
        e = new createjs.Text(a, " 26px " + PRIMARY_FONT, "#ffffff");
        e.y = d.y;
        e.textAlign = "center";
        e.textBaseline = "middle";
        e.lineWidth = 550;
        g.addChild(e);
        h = new CGfxButton(0, 80, s_oSpriteLibrary.getSprite("but_yes"), g);
        h.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        h.pulseAnimation()
    };
    this._onButYes = function() {
        h.setClickable(!1);
        (new createjs.Tween.get(f)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(g)).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            l.unload();
            c && c()
        })
    };
    this.changeMessage = function(a) {
        d.text = a;
        e.text = a
    };
    this.unload = function() {
        h.unload();
        s_oStage.removeChild(f);
        s_oStage.removeChild(g);
        f.off("mousedown", function() {})
    };
    var l = this;
    this._init(a, c)
}

function CTremble(a, c, b, d) {
    var e, h, f, g, l, m, k;
    this._init = function(a, b, c, d) {
        g = f = !1;
        m = 0;
        this._calculateDuration();
        e = a.x;
        h = a.y;
        f || (f = !0, l = setInterval(function() {
            n._tremble()
        }, c))
    };
    this._tremble = function() {
        if (g = !g) {
            var r = .5 > Math.random() ? -d : d;
            var t = .5 > Math.random() ? -d : d;
            a.x += r;
            a.y += t
        } else a.x = e, a.y = h;
        m++;
        m > k && (m = 0, f = !1, s_oGame.endDamageTime(), a.x = e, a.y = h, 0 === c ? l = setInterval(function() {
            n._tremble()
        }, b) : clearInterval(l))
    };
    this._calculateDuration = function() {
        k = c / b
    };
    this.stopTremble = function() {
        clearInterval(l)
    };
    var n = this;
    this._init(a, c, b, d)
}

function CAreYouSurePanel(a, c) {
    var b, d, e, h, f, g, l;
    this._init = function(a, c) {
        g = new createjs.Shape;
        g.graphics.beginFill("black").drawRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
        g.alpha = 0;
        g.on("mousedown", function() {});
        s_oStage.addChild(g);
        (new createjs.Tween.get(g)).to({
            alpha: .7
        }, 500);
        l = new createjs.Container;
        s_oStage.addChild(l);
        var k = s_oSpriteLibrary.getSprite("msg_box"),
            m = createBitmap(k);
        m.regX = k.width / 2;
        m.regY = k.height / 2;
        l.addChild(m);
        l.x = CANVAS_WIDTH / 2;
        l.y = CANVAS_HEIGHT + k.height / 2;
        b = l.y;
        (new createjs.Tween.get(l)).to({
            y: CANVAS_HEIGHT /
                2 - 40
        }, 500, createjs.Ease.cubicOut);
        d = new createjs.Text(TEXT_ARE_SURE, " 50px " + PRIMARY_FONT, "#000000");
        d.y = -k.height / 2 + 120;
        d.textAlign = "center";
        d.textBaseline = "middle";
        d.lineWidth = 600;
        d.outline = 5;
        l.addChild(d);
        e = new createjs.Text(TEXT_ARE_SURE, " 50px " + PRIMARY_FONT, "#ffffff");
        e.y = d.y;
        e.textAlign = "center";
        e.textBaseline = "middle";
        e.lineWidth = 600;
        l.addChild(e);
        h = new CGfxButton(110, 80, s_oSpriteLibrary.getSprite("but_yes"), l);
        h.addEventListener(ON_MOUSE_UP, this._onButYes, this);
        f = new CGfxButton(-110, 80, s_oSpriteLibrary.getSprite("but_exit"),
            l);
        f.addEventListener(ON_MOUSE_UP, this._onButNo, this);
        f.pulseAnimation()
    };
    this._onButYes = function() {
        f.setClickable(!1);
        h.setClickable(!1);
        (new createjs.Tween.get(g)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(l)).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            m.unload();
            a && a()
        })
    };
    this._onButNo = function() {
        f.setClickable(!1);
        h.setClickable(!1);
        (new createjs.Tween.get(g)).to({
            alpha: 0
        }, 500);
        (new createjs.Tween.get(l)).to({
            y: b
        }, 400, createjs.Ease.backIn).call(function() {
            m.unload();
            c && c()
        })
    };
    this.changeMessage =
        function(a, b) {
            d.text = a;
            e.text = a;
            b && (d.font = " " + b + "px " + PRIMARY_FONT, e.font = " " + b + "px " + PRIMARY_FONT)
        };
    this.unload = function() {
        f.unload();
        h.unload();
        s_oStage.removeChild(g);
        s_oStage.removeChild(l);
        g.off("mousedown", function() {})
    };
    var m = this;
    this._init(a, c)
};