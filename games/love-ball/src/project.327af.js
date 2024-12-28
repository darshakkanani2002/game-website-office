var wrap = document.getElementById('wrap');
// console.log(idx + '----------');
var levelArr = [];
require = function i(o, s, r) {
    function l(t, e) {
        if (!s[t]) {
            if (!o[t]) {
                var n = "function" == typeof require && require;
                if (!e && n)
                    return n(t, !0);
                if (d)
                    return d(t, !0);
                var c = new Error("Cannot find module '" + t + "'");
                throw c.code = "MODULE_NOT_FOUND",
                    c
            }
            var a = s[t] = {
                exports: {}
            };
            o[t][0].call(a.exports, function(e) {
                return l(o[t][1][e] || e)
            }, a, a.exports, i, o, s, r)
        }
        return s[t].exports
    }
    for (var d = "function" == typeof require && require, e = 0; e < r.length; e++)
        l(r[e]);
    return l
}({
    AD: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "2e8dfmFCYFM0qGx+wnCMGfd", "AD");
        var c = null,
            a = 0;
        e("Common"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                statics: {
                    _instance: null
                },
                onLoad: function() {},
                preloadAD: function() {},
                showad: function() {},
                ShowInterstitialInDuration: function() {
                    var e = (new Date).getTime();
                    6e4 <= e - a && (this.showad(),
                        a = (new Date).getTime())
                }
            });
        cc._RF.pop()
    }, {
        Common: "Common"
    }],
    AudioControl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "bc6fbjVOeBNYJAlCxOd7JQI", "AudioControl"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    winsound: cc.AudioSource,
                    gameoversound: cc.AudioSource
                },
                playwinsound: function() {
                    this.winsound.play()
                },
                playlostsound: function() {
                    this.gameoversound.play()
                },
                muteall: function() {
                    this.winsound.mute = !0,
                        this.gameoversound.mute = !0
                },
                unmuteall: function() {
                    this.winsound.mute = !1,
                        this.gameoversound.mute = !1
                }
            }),
            cc._RF.pop()
    }, {}],
    Common: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "eab06Sn45ZN6YSz52lm8D/a", "Common"),
            t.exports = {
                currentLvlNum: null,
                selectedskin: null,
                drawTaken: null,
                lastlevel: 1120,
                deathOnARoll: 0,
                lineLengthLeft: 6666,
                hideAD: !1
            },
            cc._RF.pop()
    }, {}],
    DataController: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "cbef0mjc4xD8orL4ZHfTbV4", "DataController"),
            cc.Class({
                extends: cc.Component,
                editor: {
                    executionOrder: -1
                },
                properties: {},
                onLoad: function() {
                    cc.loader.loadRes("1001", function(e, t) {}),
                        cc.director.getPhysicsManager().enabled = !0;
                    var e = cc.sys.localStorage.getItem("shareTimeLeft");
                    null !== e && "" !== e || cc.sys.localStorage.setItem("shareTimeLeft", 3);
                    var t = new Date,
                        n = cc.sys.localStorage.getItem("lastLoggedInDate");
                    null !== n && "" !== n || (cc.sys.localStorage.setItem("lastLoggedInDate", t.getDay()),
                            n = t.getDay()),
                        t.getDay() !== parseInt(n) && cc.sys.localStorage.setItem("shareTimeLeft", 3);
                    var c = cc.sys.localStorage.getItem("gold");
                    null !== c && "" !== c || (cc.sys.localStorage.setItem("gold", 0),
                            c = 0),
                        cc.find("MainUI/ShopPnl/bar/coinText").getComponent(cc.Label).string = c.toString();
                    var a = cc.sys.localStorage.getItem("1001");
                    null !== a && "" !== a || (cc.sys.localStorage.setItem("1001", 0),
                            a = 0),
                        cc.sys.localStorage.setItem("1000", 1)
                }
            }),
            cc._RF.pop()
    }, {}],
    GameRankingList: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a72ceCaa0hEtoeuKqJTlbZz", "GameRankingList");
        var c = 0,
            a = !1,
            i = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {
                    rankingScrollView: cc.ScrollView,
                    scrollViewContent: cc.Node,
                    prefabRankItem: cc.Prefab,
                    loadingLabel: cc.Node
                },
                ctor: function() {
                    window.initial = this;
                },
                start: function() {},
                submitScore: function(e, t) {

                },
                removeChild: function() {
                    this.node.removeChildByTag(1e3),
                        this.rankingScrollView.node.active = !1,
                        this.scrollViewContent.removeAllChildren(),
                        this.loadingLabel.getComponent(cc.Label).string = "Loading...",
                        this.loadingLabel.active = !0
                },
                fetchFriendData: function(e) {

                },
                fetchGroupFriendData: function(e, t) {
                    this.removeChild(),
                        this.rankingScrollView.node.active = !0
                },
                calculateStars: function() {
                    c = 0;
                    for (var e = 1001; e <= parseInt(i.lastlevel); e++) {
                        var t = cc.sys.localStorage.getItem(e.toString()),
                            n = parseInt(t);
                        4 !== n && (c += n)
                    }
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    IPXscreen: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "db2f4P3hRRJvbbprCXddBn4", "IPXscreen"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onLoad: function() {
                    var e = cc.winSize;
                    2.06 < e.height / e.width && this.node.setPosition(0, 830)
                }
            }),
            cc._RF.pop()
    }, {}],
    RankItem: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "5de24weYhlHeL8O7rv3eoG/", "RankItem"),
            cc.Class({
                extends: cc.Component,
                name: "RankItem",
                properties: {
                    backSprite: cc.Node,
                    rankLabel: cc.Label,
                    avatarImgSprite: cc.Sprite,
                    nickLabel: cc.Label,
                    topScoreLabel: cc.Label
                },
                start: function() {},
                init: function(e, t, n, c) {
                    e % 2 == 0 && (this.backSprite.color = new cc.Color(55, 55, 55, 255)),
                        0 == e ? (this.rankLabel.node.color = new cc.Color(255, 0, 0, 255),
                            this.rankLabel.node.setScale(2)) : 1 == e ? this.rankLabel.node.setScale(1.6) : 2 == e && this.rankLabel.node.setScale(1.3),
                        this.rankLabel.string = (e + 1).toString(),
                        this.createImage(t),
                        this.nickLabel.string = n,
                        this.topScoreLabel.string = c.toString()
                },
                createImage: function(e) {
                    var n = this;
                    cc.loader.load({
                        url: e,
                        type: "jpg"
                    }, function(e, t) {
                        n.avatarImgSprite.spriteFrame = new cc.SpriteFrame(t)
                    })
                }
            }),
            cc._RF.pop()
    }, {}],
    RestartGame: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "fc6770fjTFE/ZIyBq55zDck", "RestartGame");
        var c = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {},
                restartgame: function() {
                    c.drawTaken = 0,
                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenText").getComponent(cc.Label).string = c.drawTaken,
                        cc.find("MainUI/GamePnl/bg/lvlloadedSpace").destroyAllChildren();
                    var e = c.currentLvlNum;
                    c.lineLengthLeft = 6666,
                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenImg").getComponent(cc.Sprite).fillRange = 1,
                        cc.loader.loadRes(e, function(e, t) {
                            cc.instantiate(t).parent = cc.find("MainUI/GamePnl/bg/lvlloadedSpace")
                        }),
                        cc.loader.loadRes((parseInt(c.currentLvlNum) + 1).toString(), function(e, t) {})
                },
                nextlevel: function() {
                    c.drawTaken = 0,
                        c.lineLengthLeft = 6666,
                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenImg").getComponent(cc.Sprite).fillRange = 1,
                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenText").getComponent(cc.Label).string = c.drawTaken,
                        cc.find("MainUI/GamePnl/bg/lvlloadedSpace").destroyAllChildren();

                    var e = (parseInt(c.currentLvlNum) + 1).toString();
                    cc.log(e),
                        cc.find("MainUI/GamePnl/bar/lvlNumLabel").getComponent(cc.Label).string = (parseInt(c.currentLvlNum) - 999).toString(),
                        cc.loader.loadRes(e, function(e, t) {
                            cc.instantiate(t).parent = cc.find("MainUI/GamePnl/bg/lvlloadedSpace")
                        }),
                        cc.loader.loadRes((parseInt(c.currentLvlNum) + 2).toString(), function(e, t) {}),
                        c.currentLvlNum = e
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    SoundCtrl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "fa7bbdBXhtI4YkEClevwD+3", "SoundCtrl"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    soundSprite: cc.Sprite,
                    soundOnSprite: cc.SpriteFrame,
                    soundOffSprite: cc.SpriteFrame
                },
                onLoad: function() {
                    var e = cc.find("MainUI").getComponent("AudioControl"),
                        t = cc.sys.localStorage.getItem("soundFlag");
                    null == t ? (cc.sys.localStorage.setItem("soundFlag", 1),
                        t = 1) : 1 == t ? (e.unmuteall(),
                        this.soundSprite.spriteFrame = this.soundOnSprite) : (e.muteall(),
                        this.soundSprite.spriteFrame = this.soundOffSprite)
                },
                start: function() {},
                onSoundBtnClick: function() {
                    var e = cc.sys.localStorage.getItem("soundFlag"),
                        t = cc.find("MainUI").getComponent("AudioControl");
                    1 == e ? (t.muteall(),
                        cc.sys.localStorage.setItem("soundFlag", 0),
                        this.soundSprite.spriteFrame = this.soundOffSprite) : (t.unmuteall(),
                        cc.sys.localStorage.setItem("soundFlag", 1),
                        this.soundSprite.spriteFrame = this.soundOnSprite)
                }
            }),
            cc._RF.pop()
    }, {}],
    Test: [function(e, t, n) { //绘制line
        "use strict";
        cc._RF.push(t, "0c903mi9e1CJ7r3sm27i454", "Test");
        var u = 0,
            h = 0,
            f = 0,
            v = 0,
            S = 0,
            C = 0,
            k = 0,
            I = 0,
            y = 0,
            L = 0,
            b = !1,
            F = !1,
            w = 0,
            R = e("Common"),
            N = !1;
        cc.Class({
                extends: cc.Component,
                properties: {},
                onLoad: function() {
                    cc.PhysicsAABBQueryCallback.prototype.ReportFixture = function(e) {
                        e.GetBody();
                        if (this._isPoint) {
                            if (e.TestPoint(this._point))
                                return this._fixtures.push(e), !1
                        } else
                            this._fixtures.push(e);
                        return !0
                    };
                    var i = cc.director.getPhysicsManager();
                    i.enabled = !0;
                    var m = cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenImg").getComponent(cc.Sprite),
                        g = this;
                    this.node.on(cc.Node.EventType.TOUCH_MOVE, function(e) {
                            if (!b && !F) {
                                F = !0,
                                    w = e.getID(),
                                    b = !1;
                                var t = this.convertToNodeSpaceAR(e.getLocation());
                                u = t.x,
                                    h = t.y,
                                    u,
                                    h,
                                    S = e.getLocationX(),
                                    C = e.getLocationY();
                                var n = g.testrect(S, C);
                                if (cc.log(n),
                                    n) {
                                    y = 0,
                                        L++,
                                        cc.log("line " + L),
                                        b = !0,
                                        f = u,
                                        v = h,
                                        k = S,
                                        I = C;
                                    var c = new cc.Node("newLine" + L),
                                        a = c.addComponent(cc.Graphics),
                                        i = c.addComponent(cc.RigidBody);
                                    i.gravityScale = 0,
                                        i.type = cc.RigidBodyType.Static,
                                        this.addChild(c),
                                        a.lineWidth = 12,
                                        a.lineCap = cc.Graphics.LineCap.ROUND,
                                        a.moveTo(u, h)
                                } else
                                    F = !1
                            }
                            if (b && w === e.getID() && 0 < R.lineLengthLeft) {
                                t = this.convertToNodeSpaceAR(e.getLocation());
                                if (u = t.x,
                                    h = t.y,
                                    S = e.getLocationX(),
                                    C = e.getLocationY(),
                                    0 !== this.childrenCount) {
                                    N = !1;
                                    var o = g.wideRaycast(k, I, S, C);
                                    if ((n = g.testrect(S, C)) && o || !N) {
                                        var s = Math.sqrt(Math.pow(h - v, 2) + Math.pow(u - f, 2));
                                        if (n) {
                                            var r = this.getChildByName("newLine" + L);
                                            if (r.getComponent(cc.Graphics).lineTo(u, h),
                                                r.getComponent(cc.Graphics).stroke(),
                                                r.getComponent(cc.Graphics).moveTo(u, h),
                                                10 < s) {
                                                if (s < 13) {
                                                    (a = r.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(u, h),
                                                        a.radius = 6,
                                                        a.density = 5,
                                                        a.apply()
                                                } else {
                                                    for (var l = s / 13, d = 1; d < l; d++) {
                                                        (a = r.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(f + 12 * d * (u - f) / s, v + 12 * d * (h - v) / s),
                                                            a.radius = 6,
                                                            a.density = 5,
                                                            a.apply()
                                                    }
                                                    (a = r.addComponent(cc.PhysicsCircleCollider)).offset = cc.v2(u, h),
                                                        a.radius = 6,
                                                        a.density = 5,
                                                        a.apply()
                                                }
                                                f = u,
                                                    v = h,
                                                    k = S,
                                                    I = C,
                                                    y += s,
                                                    R.lineLengthLeft -= s
                                            }
                                        }
                                        var p = R.lineLengthLeft / 6666;
                                        m.fillRange = p
                                    }
                                }
                            }
                        }, this.node),
                        this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                            if (b && w === e.getID()) {
                                cc.log("line Length:   " + y);
                                var t = this.convertToNodeSpaceAR(e.getLocation());
                                if (u = t.x,
                                    h = t.y,
                                    0 == y)
                                    null !== (n = this.getChildByName("newLine" + L)) && n.getComponent(cc.Graphics).clear(),
                                    F = b = !1;
                                if (0 < y && 0 !== this.childrenCount) {
                                    var n;
                                    cc.log("mouse up" + L),
                                        (n = this.getChildByName("newLine" + L)).getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                        n.getComponent(cc.RigidBody).gravityScale = 3.5;
                                    var c = this.parent.getChildByName("ball1"),
                                        a = this.parent.getChildByName("ball2");
                                    c.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                        a.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                        R.drawTaken++,
                                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenText").getComponent(cc.Label).string = R.drawTaken,
                                        F = b = !1
                                }
                            }
                        }, this.node),
                        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
                            if (b && w === e.getID() && (cc.log("line Length:   " + y),
                                    0 !== this.childrenCount)) {
                                cc.log("mouse up" + L);
                                var t = this.getChildByName("newLine" + L);
                                t.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                    t.getComponent(cc.RigidBody).gravityScale = 3.5;
                                var n = this.parent.getChildByName("ball1"),
                                    c = this.parent.getChildByName("ball2");
                                n.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                    c.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic,
                                    R.drawTaken++,
                                    cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenText").getComponent(cc.Label).string = R.drawTaken,
                                    F = b = !1
                            }
                        }, this.node),
                        this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                            if (!F) {
                                F = !0,
                                    w = e.getID(),
                                    b = !1,
                                    y = 0,
                                    L++,
                                    cc.log("line " + L);
                                var t = this.convertToNodeSpaceAR(e.getLocation());
                                u = t.x,
                                    h = t.y,
                                    u,
                                    h,
                                    S = e.getLocationX(),
                                    C = e.getLocationY(),
                                    0 == i.testAABB(cc.rect(S, C, 6, 6)).length ? b = !0 : F = !1,
                                    f = u,
                                    v = h,
                                    k = S,
                                    I = C;
                                var n = new cc.Node("newLine" + L),
                                    c = n.addComponent(cc.Graphics),
                                    a = n.addComponent(cc.RigidBody);
                                a.gravityScale = 0,
                                    a.type = cc.RigidBodyType.Static,
                                    this.addChild(n),
                                    c.lineWidth = 12,
                                    c.lineCap = cc.Graphics.LineCap.ROUND,
                                    c.moveTo(u, h)
                            }
                        }, this.node)
                },
                testrect: function(e, t) {
                    var n = cc.director.getPhysicsManager();
                    if (null == n.testPoint(cc.v2(e - 6, t - 6)) && (null == n.testPoint(cc.v2(e - 6, t + 6)) && null == n.testPoint(cc.v2(e + 6, t - 6)) && null == n.testPoint(cc.v2(e + 6, t + 6))))
                        return !0;
                    return !1
                },
                wideRaycast: function(e, t, n, c) {
                    var a = cc.director.getPhysicsManager(),
                        i = Math.sqrt(Math.pow(n - e, 2) + Math.pow(c - t, 2)),
                        o = 6 * -(c - t) / i,
                        s = 6 * (n - e) / i,
                        r = a.rayCast(cc.v2(e - o, t - s), cc.v2(n - o, c - s), cc.RayCastType.All);
                    if (0 < r.length)
                        for (var l = 0; l < r.length; l++)
                            r[l].collider.node.name != "newLine" + L && (N = !0);
                    var d = a.rayCast(cc.v2(e + o, t + s), cc.v2(n + o, c + s), cc.RayCastType.All);
                    if (0 < d.length)
                        for (l = 0; l < d.length; l++)
                            d[l].collider.node.name != "newLine" + L && (N = !0);
                    return 0 == r.length && 0 == d.length
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    UIControl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "5efb0LjSHVJvI9hBN8UQbmm", "UIControl"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    mainMenu: cc.Node,
                    selectlvl: cc.Node
                },
                onLoad: function() {},
                start: function() {},
                showPnl: function() {
                    pnl.node.active = !0
                },
                closePnl: function(e) {
                    e.node.active = !1
                }
            }),
            cc._RF.pop()
    }, {}],
    basePnl: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4a7cagbON5Ak4Mhut/rMPpY", "basePnl"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                start: function() {},
                showPnl: function() {
                    var lists = document.getElementsByClassName('liWrap');
                    this.node.active || (this.node.active = !0);

                    if (this.node.name == 'ShopPnl' && this.node.active == true) {
                        wrap.style.display = 'none';

                    }
                    if (this.node.name == 'RankingPnl') {
                        this.node.active = 0;
                    }
                },
                closePnl: function(e) {
                    var lists = document.getElementsByClassName('liWrap');
                    this.node.active && (this.node.active = !1);
                    if (this.node.name == 'RankingPnl' && this.node.active == false) {
                        if (lists.length) {
                            wrap.style.display = 'flex';
                            wrap.style.display = '-webkit-flex';
                        }
                    }

                }
            }),
            cc._RF.pop()
    }, {}],
    destoryOnClick: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "ac20dFLBJNKSK1oLse9JT9N", "destoryOnClick"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    targetnodetodestory: cc.Node
                },
                onLoad: function() {
                    var t = this.targetnodetodestory;
                    this.node.on(cc.Node.EventType.TOUCH_START, function(e) {
                        t.destroy()
                    }, this.node)
                },
                start: function() {}
            }),
            cc._RF.pop()
    }, {}],
    disableOnClick: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "90384aQuw1L/Z5lBH330zZD", "disableOnClick"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                start: function() {},
                disableonclick: function() {
                    this.node.active = !1
                }
            }),
            cc._RF.pop()
    }, {}],
    freezeXY: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "261d9ROkL5Af4WnN0UtT8ZR", "freezeXY");
        var c = 0,
            a = 0;
        cc.Class({
                extends: cc.Component,
                properties: {},
                start: function() {
                    c = this.node.x,
                        a = this.node.y
                },
                lateUpdate: function(e) {
                    this.node.x = c,
                        this.node.y = a
                }
            }),
            cc._RF.pop()
    }, {}],
    gameState: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "9124diL/7xNkKk11WEZxrTY", "gameState");
        var y = new Array(1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1, 1, 3, 2, 1, 1, 1, 2, 1, 2, 5, 5, 1, 1, 1, 1, 2, 4, 1, 3, 2, 1, 1, 2, 3, 2, 4, 2, 2, 1, 1, 2, 2, 2, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 2, 3, 2, 2, 1, 2, 2, 2, 1, 2, 1, 1, 1, 3, 1, 2, 1, 4, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 1, 2, 2, 1, 1, 1, 1, 1, 1, 2, 3, 3, 3, 3, 1, 5, 1, 1, 1, 1, 1, 2, 2, 2, 1, 0, 0, 0, 0, 0, 0),
            L = e("Common"),
            b = null;
        cc.Class({
                extends: cc.Component,
                properties: {},
                onLoad: function() { //游戏关卡加载函数
                    b = cc.find("MainUI").getComponent("AD");
                },
                start: function() {},
                onBeginContact: function(e, t, n) { //绘制函数
                    if ("ball2" == n.node.name) {
                        cc.log("WIN!!!"),
                            L.deathOnARoll = 0;
                        var cur = L.currentLvlNum.substr(1);
                        var curLevel = parseInt(cur);
                        var num = window.num;
                        var c = cc.find("MainUI").getComponent("AudioControl");
                        cc.log(cc.find("MainUI").getComponent(cc.AudioSource)),
                            c.playwinsound();




                        var a = cc.sys.localStorage.getItem(L.currentLvlNum.toString()),
                            i = cc.sys.localStorage.getItem((parseInt(L.currentLvlNum) + 1).toString()),
                            o = cc.sys.localStorage.getItem((parseInt(L.currentLvlNum) - 1).toString());
                        4 === o || "4" === o || null === o || "" === o || 0 === o || "0" === o || 4 !== i && "4" !== i && null !== i && "" !== i || (cc.sys.localStorage.setItem((parseInt(L.currentLvlNum) + 1).toString(), "0"),
                            cc.log(cc.sys.localStorage.getItem((parseInt(L.currentLvlNum) + 1).toString())));
                        var s = cc.find("MainUI/GameWinPnl/area/bg/gc/gcLabel"),
                            r = cc.find("MainUI/GameWinPnl/area/bg/stars").getComponent("showStars"),
                            l = parseInt(cc.sys.localStorage.getItem("gold"));
                        console.log(curLevel);
                        console.log(num);
                        if (curLevel == num) {
                            levelArr.pop();
                        }
                        levelArr.push(r);
                        if (L.drawTaken <= y[L.currentLvlNum - 1e3])
                            switch (r.showStar(3),
                                a.toString()) {
                                case "0":
                                    l += 50,
                                        s.getComponent(cc.Label).string = "+50",
                                        cc.sys.localStorage.setItem(L.currentLvlNum.toString(), "3");
                                    break;
                                case "1":
                                    l += 40,
                                        s.getComponent(cc.Label).string = "+40",
                                        cc.sys.localStorage.setItem(L.currentLvlNum.toString(), "3");
                                    break;
                                case "2":
                                    l += 20,
                                        s.getComponent(cc.Label).string = "+20",
                                        cc.sys.localStorage.setItem(L.currentLvlNum.toString(), "3");
                                    break;
                                case "3":
                                    l += 3,
                                        s.getComponent(cc.Label).string = "+3";
                                    break;
                                case "4":
                                default:
                                    l += 50,
                                        s.getComponent(cc.Label).string = "+50"
                            }
                        else if (L.drawTaken <= y[L.currentLvlNum - 1e3] + 5)
                            switch (r.showStar(2),
                                a.toString()) {
                                case "0":
                                    l += 30,
                                        s.getComponent(cc.Label).string = "+30",
                                        cc.sys.localStorage.setItem(L.currentLvlNum.toString(), "2");
                                    break;
                                case "1":
                                    l += 20,
                                        s.getComponent(cc.Label).string = "+20",
                                        cc.sys.localStorage.setItem(L.currentLvlNum.toString(), "2");
                                    break;
                                case "2":
                                case "3":
                                    l += 2,
                                        s.getComponent(cc.Label).string = "+2";
                                    break;
                                case "4":
                                default:
                                    l += 30,
                                        s.getComponent(cc.Label).string = "+30"
                            }
                        else
                            switch (r.showStar(1),
                                a.toString()) {
                                case "0":
                                    l += 10,
                                        s.getComponent(cc.Label).string = "+10",
                                        cc.sys.localStorage.setItem(L.currentLvlNum.toString(), "1");
                                    break;
                                case "1":
                                case "2":
                                case "3":
                                    l += 1,
                                        s.getComponent(cc.Label).string = "+1";
                                    break;
                                case "4":
                                default:
                                    l += 10,
                                        s.getComponent(cc.Label).string = "+10"
                            }
                        cc.sys.localStorage.setItem("gold", l),
                            cc.find("MainUI/ShopPnl/bar/coinText").getComponent(cc.Label).string = l,
                            cc.director.getPhysicsManager().enabled = !1;
                        var d = cc.find("MainUI/GameWinPnl/area/bg/Btns"),
                            p = cc.find("MainUI/GameWinPnl/area/bg/Btns2");
                        parseInt(L.currentLvlNum) < L.lastlevel && ("1" == o.toString() || "2" == o.toString() || "3" == o.toString()) ? (d.active = !0,
                            p.active = !1) : (d.active = !1,
                            p.active = !0);
                        var m = cc.find("MainUI/GameWinPnl");
                        setTimeout(function() {
                            m.getComponent("basePnl").showPnl()
                        }, 600);



                        var g = cc.find("MainUI/GamePnl/heart"),
                            u = (this.node.x + n.node.x) / 2,
                            h = (this.node.y + n.node.y) / 2;
                        g.position = new cc.Vec2(u, h),
                            g.getComponent(cc.ParticleSystem).resetSystem();

                        var f = "";
                        // page---
                        levelArr.forEach(function(item, index) {
                            if (item.star1.spriteFrame._name == 'b_pa3' || item.star2.spriteFrame._name == 'b_pa3' || item.star3.spriteFrame._name == 'b_pa3') {
                                console.log('关卡没有全部得到3颗星');
                                console.log(item);
                                return;
                            }
                        })
                        if (f = parseInt(L.currentLvlNum) <= 1018 ? "MainUI/SelectLevelPnl/PageView/view/content/page_1/lvls/" + L.currentLvlNum : parseInt(L.currentLvlNum) <= 1036 ? "MainUI/SelectLevelPnl/PageView/view/content/page_2/lvls/" + L.currentLvlNum : parseInt(L.currentLvlNum) <= 1054 ? "MainUI/SelectLevelPnl/PageView/view/content/page_3/lvls/" + L.currentLvlNum : parseInt(L.currentLvlNum) <= 1072 ? "MainUI/SelectLevelPnl/PageView/view/content/page_4/lvls/" + L.currentLvlNum : parseInt(L.currentLvlNum) <= 1090 ? "MainUI/SelectLevelPnl/PageView/view/content/page_5/lvls/" + L.currentLvlNum : parseInt(L.currentLvlNum) <= 1108 ? "MainUI/SelectLevelPnl/PageView/view/content/page_6/lvls/" + L.currentLvlNum : "MainUI/SelectLevelPnl/PageView/view/content/page_7/lvls/" + L.currentLvlNum,
                            cc.find(f).getComponent("levelBtn").ShowLevelBtnAccordingThisBtnState(),
                            parseInt(L.currentLvlNum) < L.lastlevel) {
                            var v = "";
                            v = parseInt(L.currentLvlNum) + 1 <= 1018 ? "MainUI/SelectLevelPnl/PageView/view/content/page_1/lvls/" + (parseInt(L.currentLvlNum) + 1).toString() : parseInt(L.currentLvlNum) + 1 <= 1036 ? "MainUI/SelectLevelPnl/PageView/view/content/page_2/lvls/" + (parseInt(L.currentLvlNum) + 1).toString() : parseInt(L.currentLvlNum) + 1 <= 1054 ? "MainUI/SelectLevelPnl/PageView/view/content/page_3/lvls/" + (parseInt(L.currentLvlNum) + 1).toString() : parseInt(L.currentLvlNum) + 1 <= 1072 ? "MainUI/SelectLevelPnl/PageView/view/content/page_4/lvls/" + (parseInt(L.currentLvlNum) + 1).toString() : parseInt(L.currentLvlNum) + 1 <= 1090 ? "MainUI/SelectLevelPnl/PageView/view/content/page_5/lvls/" + (parseInt(L.currentLvlNum) + 1).toString() : parseInt(L.currentLvlNum) + 1 <= 1108 ? "MainUI/SelectLevelPnl/PageView/view/content/page_6/lvls/" + (parseInt(L.currentLvlNum) + 1).toString() : "MainUI/SelectLevelPnl/PageView/view/content/page_7/lvls/" + (parseInt(L.currentLvlNum) + 1).toString(),
                                cc.find(v).getComponent("levelBtn").ShowLevelBtnAccordingThisBtnState()
                        }

                    }
                    if ("dieArea" == n.node.name || "laser" == n.node.name) {
                        if ("laser" == n.node.name && (this.node.active = !1),
                            "ball1" == this.node.name) {
                            var S = cc.find("MainUI/GamePnl/bubble1"),
                                C = this.node.x,
                                k = this.node.y;
                            S.position = new cc.Vec2(C, k),
                                S.getComponent(cc.ParticleSystem).resetSystem()
                        } else if ("ball2" == this.node.name) {
                            S = cc.find("MainUI/GamePnl/bubble2"),
                                C = this.node.x,
                                k = this.node.y;
                            S.position = new cc.Vec2(C, k),
                                S.getComponent(cc.ParticleSystem).resetSystem()
                        }
                        cc.log("DIE!!!");
                        c = cc.find("MainUI").getComponent("AudioControl");
                        cc.log(cc.find("MainUI").getComponent(cc.AudioSource)),
                            c.playlostsound(),
                            cc.director.getPhysicsManager().enabled = !1;
                        var I = cc.find("MainUI/GameOverPnl");
                        setTimeout(function() {
                            I.getComponent("basePnl").showPnl()
                        }, 100)


                    }
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    hintBtn: [function(e, t, n) { //提示按钮
        "use strict";
        cc._RF.push(t, "f40142oVABL/rgDFcDYWdjF", "hintBtn");
        var c = e("Common"),
            a = null;
        cc.Class({
                extends: cc.Component,
                properties: {
                    hintSprite: cc.Sprite
                },
                onLoad: function() {

                },
                start: function() {},
                preloadhintImg: function() {
                    var e = "hints/" + c.currentLvlNum + "h";
                    cc.loader.loadRes(e, cc.SpriteFrame, function(e, t) {})
                },
                preloadAD: function() {

                },
                onHintBtnClicked: function() {
                    var self = this;
                    var e = cc.sys.localStorage.getItem(c.currentLvlNum.toString() + "h");
                    // 0 === e || "0" === e || null === e || "" === e ? (this.preloadhintImg(),
                    // this.watchADBeforeHint()) : this.showHint()
                    this.preloadhintImg();

                    var idx = Math.floor((Math.random() * imgArr.length));

                    self.showHint();

                },
                showHint: function() {
                    var n = this.hintSprite,
                        e = "hints/" + c.currentLvlNum + "h";
                    cc.loader.loadRes(e, cc.SpriteFrame, function(e, t) {
                        n.spriteFrame = t,
                            n.node.parent.active = !0
                    })
                },
                watchADBeforeHint: function() {
                    // var e = this;
                    // null != a && a.showAsync().then(function() {
                    //     e.showHint(),
                    //     cc.sys.localStorage.setItem(c.currentLvlNum.toString() + "h", 1),
                    //     e.preloadAD()
                    // }).catch(function(e) {
                    //     console.log(e.message)
                    // })
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    levelBtn: [function(e, t, n) { //点击关卡按钮的函数
        "use strict";
        cc._RF.push(t, "290faLgANRBS4OgTZB1jBYB", "levelBtn");
        var c = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {
                    targetplace: cc.Node,
                    lvlNum: cc.String,
                    lockImg: cc.Node,
                    stars: cc.Node,
                    star1: cc.Sprite,
                    star2: cc.Sprite,
                    star3: cc.Sprite,
                    redstar: cc.SpriteFrame,
                    blackstar: cc.SpriteFrame,
                    leveltext: cc.Label
                },
                onLoad: function() {
                    var levelNum = window.levelNum;

                    if (!levelNum) {
                        var stars = cc.find("MainUI/GameWinPnl/area/bg/stars").getComponent("showStars");
                        levelArr.push(stars);
                    }
                    this.ShowLevelBtnAccordingThisBtnState()
                },
                start: function() {},
                onloadLevel: function() {


                    cc.find("MainUI/GamePnl/bar/lvlNumLabel").getComponent(cc.Label).string = (this.lvlNum - 1e3).toString(),
                        0 < this.targetplace.childrenCount && this.targetplace.destroyAllChildren(),
                        c.drawTaken = 0,
                        c.lineLengthLeft = 6666,
                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenImg").getComponent(cc.Sprite).fillRange = 1,
                        cc.find("MainUI/GamePnl/bar/DrawTaken/DrawTakenText").getComponent(cc.Label).string = c.drawTaken,
                        cc.loader.loadRes(this.lvlNum, function(e, t) {
                            var n = cc.instantiate(t);
                            cc.log(n);
                            var c = cc.find("MainUI/GamePnl/bg/lvlloadedSpace");
                            n.parent = c
                        }),
                        c.currentLvlNum = this.lvlNum,
                        cc.log(c.currentLvlNum),
                        cc.loader.loadRes((parseInt(c.currentLvlNum) + 1).toString(), function(e, t) {})
                },
                ShowLevelBtnAccordingThisBtnState: function() {
                    this.leveltext.string = (this.lvlNum - 1e3).toString();
                    var e = cc.sys.localStorage.getItem(this.lvlNum.toString());
                    switch (null !== e && "" !== e || (cc.sys.localStorage.setItem(this.lvlNum.toString(), "0"),
                        e = 0), e) {
                        case "0":
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(0),
                                this.lockImg.active = !1;
                            break;
                        case "1":
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(1),
                                this.lockImg.active = !1;
                            break;
                        case "2":
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(2),
                                this.lockImg.active = !1;
                            break;
                        case "3":
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(3),
                                this.lockImg.active = !1;
                            break;
                        case "4":
                            this.node.getComponent(cc.Button).interactable = !1,
                                this.showStar(4),
                                this.lockImg.active = !0;
                            break;
                        case 0:
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(0),
                                this.lockImg.active = !1;
                            break;
                        case 1:
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(1),
                                this.lockImg.active = !1;
                            break;
                        case 2:
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(2),
                                this.lockImg.active = !1;
                            break;
                        case 3:
                            this.node.getComponent(cc.Button).interactable = !0,
                                this.showStar(3),
                                this.lockImg.active = !1;
                            break;
                        case 4:
                            this.node.getComponent(cc.Button).interactable = !1,
                                this.showStar(4),
                                this.lockImg.active = !0
                    }
                },
                showStar: function(e) {
                    // console.log(this);
                    switch (e) {
                        case 0:
                            // 记录当前玩家在第几关
                            var level = parseInt(this.lvlNum.substr(1));
                            window.levelNum = level;

                            this.stars.active = !0,
                                this.star1.spriteFrame = this.blackstar,
                                this.star2.spriteFrame = this.blackstar,
                                this.star3.spriteFrame = this.blackstar;
                            break;
                        case 1:
                            //记录当前关卡有几颗星星
                            var level = parseInt(this.lvlNum.substr(1));

                            this.stars.active = !0,
                                this.star1.spriteFrame = this.redstar,
                                this.star2.spriteFrame = this.blackstar,
                                this.star3.getComponent(cc.Sprite).spriteFrame = this.blackstar;
                            break;
                        case 2:
                            //记录当前关卡有几颗星星
                            var level = parseInt(this.lvlNum.substr(1));

                            this.stars.active = !0,
                                this.star1.spriteFrame = this.redstar,
                                this.star2.spriteFrame = this.redstar,
                                this.star3.spriteFrame = this.blackstar;
                            break;
                        case 3:
                            //记录当前关卡有几颗星星
                            var level = parseInt(this.lvlNum.substr(1));

                            this.stars.active = !0,
                                this.star1.spriteFrame = this.redstar,
                                this.star2.spriteFrame = this.redstar,
                                this.star3.spriteFrame = this.redstar;
                            break;
                        case 4:
                            this.stars.active = !1,
                                this.star1.spriteFrame = this.blackstar,
                                this.star2.spriteFrame = this.blackstar,
                                this.star3.spriteFrame = this.blackstar
                    }
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    loadScene: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4a0fdgtsjBHAp1WzcdgLFvY", "loadScene"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                start: function() {},
                lvlstart: function() {}
            }),
            cc._RF.pop()
    }, {}],
    loading: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "727977uvENJybpC1JyKM3yz", "loading"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onLoad: function() {
                    cc.director.loadScene("mainUI");
                },
                start: function() {}
            }),
            cc._RF.pop()
    }, {}],
    onShareEntry: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "c9cf1fJfqVCZosjrQ141dqj", "onShareEntry");
        var c = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {
                    targetplace: cc.Node
                },
                start: function() {

                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    "physics-settings": [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "4c3f9Ds8ENDQ6ge2V0TrwQJ", "physics-settings");
        var c = cc.director.getPhysicsManager();
        c.enabled = !0,
            c.debugDrawFlags = 0,
            cc._RF.pop()
    }, {}],
    physicsManager: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "37c90ldYcJOb4NtZq71otBz", "physicsManager"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    targetplace: cc.Node
                },
                start: function() {},
                enablePhysics: function() {
                    cc.director.getPhysicsManager().enabled = !0
                },
                disablePhysics: function() {
                    cc.director.getPhysicsManager().enabled = !1
                },
                cleanUpGamePnl: function() {
                    this.targetplace.destroyAllChildren()
                }
            }),
            cc._RF.pop()
    }, {}],
    rigBoxBlockMoving: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "90439dlYydJqrcD+QKvFr7w", "rigBoxBlockMoving");
        var c = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {
                    targetnode: cc.Node
                },
                onLoad: function() {
                    var t = this.targetnode;
                    this.node.on(cc.Node.EventType.TOUCH_END, function(e) {
                            null != t && c.lineLengthLeft < 6666 && (cc.log(t),
                                t.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                        }, this.node),
                        this.node.on(cc.Node.EventType.TOUCH_CANCEL, function(e) {
                            null != t && c.lineLengthLeft < 6666 && (cc.log(t),
                                t.getComponent(cc.RigidBody).type = cc.RigidBodyType.Dynamic)
                        }, this.node)
                },
                start: function() {}
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    screenScale: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "a8746oBlJhA5KfTcugPOaEY", "screenScale"),
            cc.Class({
                extends: cc.Component,
                properties: {},
                onLoad: function() {
                    var e = cc.winSize;
                    if (e.width < 1079) {
                        var t = e.width / 1080;
                        this.node.scale = t
                    }
                },
                start: function() {}
            }),
            cc._RF.pop()
    }, {}],
    share: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "e89deD8wr5OtofaXB+vOX+J", "share");
        var r = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {},
                start: function() {},
                onShareBtnClick2: function() {},
                onShowOffBtnClick: function() {},
                onShareBtnClick: function() {},
                onShareToSkipBtnClick: function() {},
                onShareGame: function() {},
                getImgBase64: function() {
                    var e = cc.find("MainUI/bg3"),
                        t = new cc.RenderTexture(510, 270);
                    t.begin(),
                        e._sgNode.visit(),
                        t.end(),
                        console.log("ret" + t);
                    var n = document.createElement("canvas"),
                        c = n.getContext("2d");
                    if (n.width = 510,
                        n.height = 270,
                        cc._renderType === cc.game.RENDER_TYPE_CANVAS) {
                        var a = t.getSprite().getTexture().getHtmlElementObj();
                        c.drawImage(a, 0, 0)
                    } else if (cc._renderType === cc.game.RENDER_TYPE_WEBGL) {
                        var i = gl.createFramebuffer();
                        gl.bindFramebuffer(gl.FRAMEBUFFER, i);
                        var o = t.getSprite().getTexture()._glID;
                        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, o, 0);
                        var s = new Uint8Array(550800);
                        gl.readPixels(0, 0, 510, 270, gl.RGBA, gl.UNSIGNED_BYTE, s),
                            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
                        for (var r = 0; r < 270; r++) {
                            var l = 269 - r,
                                d = new Uint8ClampedArray(s.buffer, 510 * l * 4, 2040),
                                p = new ImageData(d, 510, 1);
                            c.putImageData(p, 0, r)
                        }
                    }
                    return n.toDataURL("image/png")
                },
                skipthislevel: function() {
                    r.deathOnARoll = 0;
                    var e = parseInt(cc.sys.localStorage.getItem("shareTimeLeft"));
                    e--,
                    console.log("shareLeft :   " + e),
                        cc.sys.localStorage.setItem("shareTimeLeft", e),
                        cc.find("MainUI/GameWinPnl/area/bg/gc/gcLabel").getComponent(cc.Label).string = "+0";
                    var t = cc.sys.localStorage.getItem(r.currentLvlNum.toString());
                    (parseInt(t) <= 1 || 4 === parseInt(t)) && cc.sys.localStorage.setItem(r.currentLvlNum.toString(), "1"),
                        cc.find("MainUI/GameWinPnl/area/bg/stars").getComponent("showStars").showStar(1);
                    var n = cc.sys.localStorage.getItem((parseInt(r.currentLvlNum) + 1).toString());
                    4 !== n && "4" !== n || (cc.sys.localStorage.setItem((parseInt(r.currentLvlNum) + 1).toString(), "0"),
                        cc.log(cc.sys.localStorage.getItem((parseInt(r.currentLvlNum) + 1).toString())));
                    var c = cc.find("MainUI/GameWinPnl/area/bg/Btns"),
                        a = cc.find("MainUI/GameWinPnl/area/bg/Btns2");
                    parseInt(r.currentLvlNum) < r.lastlevel ? (c.active = !0,
                            a.active = !1) : (c.active = !1,
                            a.active = !0),
                        cc.find("MainUI/GameWinPnl").getComponent("basePnl").showPnl(),
                        cc.find("MainUI/GameOverPnl").getComponent("basePnl").closePnl();
                    var i = "";
                    if (i = parseInt(r.currentLvlNum) <= 1018 ? "MainUI/SelectLevelPnl/PageView/view/content/page_1/lvls/" + r.currentLvlNum : parseInt(r.currentLvlNum) <= 1036 ? "MainUI/SelectLevelPnl/PageView/view/content/page_2/lvls/" + r.currentLvlNum : parseInt(r.currentLvlNum) <= 1054 ? "MainUI/SelectLevelPnl/PageView/view/content/page_3/lvls/" + r.currentLvlNum : parseInt(r.currentLvlNum) <= 1072 ? "MainUI/SelectLevelPnl/PageView/view/content/page_4/lvls/" + r.currentLvlNum : "MainUI/SelectLevelPnl/PageView/view/content/page_5/lvls/" + r.currentLvlNum,
                        cc.find(i).getComponent("levelBtn").ShowLevelBtnAccordingThisBtnState(),
                        parseInt(r.currentLvlNum) < r.lastlevel) {
                        var o = "";
                        o = parseInt(r.currentLvlNum) + 1 <= 1018 ? "MainUI/SelectLevelPnl/PageView/view/content/page_1/lvls/" + (parseInt(r.currentLvlNum) + 1).toString() : parseInt(r.currentLvlNum) + 1 <= 1036 ? "MainUI/SelectLevelPnl/PageView/view/content/page_2/lvls/" + (parseInt(r.currentLvlNum) + 1).toString() : parseInt(r.currentLvlNum) + 1 <= 1054 ? "MainUI/SelectLevelPnl/PageView/view/content/page_3/lvls/" + (parseInt(r.currentLvlNum) + 1).toString() : parseInt(r.currentLvlNum) + 1 <= 1072 ? "MainUI/SelectLevelPnl/PageView/view/content/page_4/lvls/" + (parseInt(r.currentLvlNum) + 1).toString() : "MainUI/SelectLevelPnl/PageView/view/content/page_5/lvls/" + (parseInt(r.currentLvlNum) + 1).toString(),
                            cc.find(o).getComponent("levelBtn").ShowLevelBtnAccordingThisBtnState()
                    }
                    var s = cc.find("MainUI/GameOverPnl/area/bg/Btns/ShareSkipBtn");
                    s.active && (s.active = !1)
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    showStars: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "d702cP9HElLP4P1UB99O8B0", "showStars"),
            cc.Class({
                extends: cc.Component,
                properties: {
                    stars: cc.Node,
                    star1: cc.Sprite,
                    star2: cc.Sprite,
                    star3: cc.Sprite,
                    redstar: cc.SpriteFrame,
                    blackstar: cc.SpriteFrame
                },
                start: function() {},
                showStar: function(e) {
                    switch (e) {
                        case 0:
                            this.star1.spriteFrame = this.blackstar,
                                this.star2.spriteFrame = this.blackstar,
                                this.star3.spriteFrame = this.blackstar;
                            break;
                        case 1:
                            this.star1.spriteFrame = this.redstar,
                                this.star2.spriteFrame = this.blackstar,
                                this.star3.getComponent(cc.Sprite).spriteFrame = this.blackstar;
                            break;
                        case 2:
                            this.star1.spriteFrame = this.redstar,
                                this.star2.spriteFrame = this.redstar,
                                this.star3.spriteFrame = this.blackstar;
                            break;
                        case 3:
                            this.star1.spriteFrame = this.redstar,
                                this.star2.spriteFrame = this.redstar,
                                this.star3.spriteFrame = this.redstar
                    }
                }
            }),
            cc._RF.pop()
    }, {}],
    skinBtn: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "8a62cQD/iVPT7f3IJUXIvzp", "skinBtn");
        var c = e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {
                    skinselected: cc.Node,
                    skinlocked: cc.Node,
                    skinpriceLabel: cc.Label,
                    skinnum: cc.String,
                    skinprice: cc.Integer
                },
                onLoad: function() {
                    wrap.style.display = 'none';
                    var e = cc.sys.localStorage.getItem("skin1");
                    null !== e && "" !== e || cc.sys.localStorage.setItem("skin1", "2"),
                        this.ShowSkinBtnAccordingThisBtnState()
                },
                start: function() {},
                OnSkinBtnClick: function() {
                    switch (cc.sys.localStorage.getItem(this.skinnum).toString()) {
                        case "0":
                            var e = parseInt(cc.sys.localStorage.getItem("gold"));
                            if (e < this.skinprice)
                                cc.log("no enough money!" + e + "  price : " + this.skinprice),
                                cc.find("MainUI/ShopPnl/getCoinBtn").runAction(cc.blink(1, 3));
                            else
                                this.skinlocked.active = !1,
                                this.skinselected.active = !1,
                                cc.sys.localStorage.setItem("gold", e - this.skinprice),
                                cc.find("MainUI/ShopPnl/bar/coinText").getComponent(cc.Label).string = e - this.skinprice,
                                cc.sys.localStorage.setItem(this.skinnum, 1);
                            break;
                        case "1":
                            this.SetThisSkinToBeSelected()
                    }
                },
                SetThisSkinToBeSelected: function() {
                    null != c.selectedskin && (cc.sys.localStorage.setItem(c.selectedskin, 1),
                            this.node.parent.getChildByName(c.selectedskin).getChildByName("skinSelected").active = !1),
                        cc.sys.localStorage.setItem(this.skinnum, 2),
                        this.skinlocked.active = !1,
                        this.skinselected.active = !0,
                        c.selectedskin = this.skinnum,
                        cc.sys.localStorage.setItem("selectedskin", this.skinnum)
                },
                ShowSkinBtnAccordingThisBtnState: function() {
                    this.skinpriceLabel.string = this.skinprice;
                    var e = cc.sys.localStorage.getItem(this.skinnum);
                    switch (null !== e && "" !== e || (cc.sys.localStorage.setItem(this.skinnum, "0"),
                            e = "0"),
                        e.toString()) {
                        case "0":
                            this.skinlocked.active = !0,
                                this.skinselected.active = !1;
                            break;
                        case "1":
                            this.skinlocked.active = !1,
                                this.skinselected.active = !1;
                            break;
                        case "2":
                            this.skinlocked.active = !1,
                                this.skinselected.active = !0,
                                c.selectedskin = this.skinnum,
                                cc.sys.localStorage.setItem("selectedskin", this.skinnum)
                    }
                }
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    skinChange: [function(e, t, n) {
        "use strict";
        cc._RF.push(t, "8f4dbphvLVLG59v82VJUrhO", "skinChange");
        e("Common");
        cc.Class({
                extends: cc.Component,
                properties: {
                    ballNum: cc.Integer
                },
                onLoad: function() {
                    1 == this.ballNum ? this.changeSkinAccordingToSkinSelected1() : this.changeSkinAccordingToSkinSelected2()
                },
                changeSkinAccordingToSkinSelected1: function() {
                    switch (cc.sys.localStorage.getItem("selectedskin")) {
                        case "skin1":
                            break;
                        case "skin2":
                            var n = this;
                            cc.loader.loadRes("skins/q2-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t;
                                console.log(e);
                                console.log(t);
                            });
                            break;
                        case "skin3":
                            n = this;
                            cc.loader.loadRes("skins/q3-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t;
                                console.log(e);
                                console.log(t);
                            });
                            break;
                        case "skin4":
                            n = this;
                            cc.loader.loadRes("skins/q4-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin5":
                            n = this;
                            cc.loader.loadRes("skins/q5-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin6":
                            n = this;
                            cc.loader.loadRes("skins/q6-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin7":
                            n = this;
                            cc.loader.loadRes("skins/q7-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin8":
                            n = this;
                            cc.loader.loadRes("skins/q8-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin9":
                            n = this;
                            cc.loader.loadRes("skins/q9-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin10":
                            n = this;
                            cc.loader.loadRes("skins/q10-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin11":
                            n = this;
                            cc.loader.loadRes("skins/q11-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin12":
                            n = this;
                            cc.loader.loadRes("skins/q12-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin13":
                            n = this;
                            cc.loader.loadRes("skins/q13-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin14":
                            n = this;
                            cc.loader.loadRes("skins/q14-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin15":
                            n = this;
                            cc.loader.loadRes("skins/q15-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin16":
                            n = this;
                            cc.loader.loadRes("skins/q16-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin17":
                            n = this;
                            cc.loader.loadRes("skins/q17-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            })
                    }
                },
                changeSkinAccordingToSkinSelected2: function() {
                    switch (cc.sys.localStorage.getItem("selectedskin")) {
                        case "skin1":
                            break;
                        case "skin2":
                            var n = this;
                            cc.loader.loadRes("skins/q2-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin3":
                            n = this;
                            cc.loader.loadRes("skins/q3-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin4":
                            n = this;
                            cc.loader.loadRes("skins/q4-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin5":
                            n = this;
                            cc.loader.loadRes("skins/q5-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin6":
                            n = this;
                            cc.loader.loadRes("skins/q6-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin7":
                            n = this;
                            cc.loader.loadRes("skins/q7-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin8":
                            n = this;
                            cc.loader.loadRes("skins/q8-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin9":
                            n = this;
                            cc.loader.loadRes("skins/q9-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin10":
                            n = this;
                            cc.loader.loadRes("skins/q10-1", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin11":
                            n = this;
                            cc.loader.loadRes("skins/q11-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin12":
                            n = this;
                            cc.loader.loadRes("skins/q12-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin13":
                            n = this;
                            cc.loader.loadRes("skins/q13-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin14":
                            n = this;
                            cc.loader.loadRes("skins/q14-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin15":
                            n = this;
                            cc.loader.loadRes("skins/q15-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin16":
                            n = this;
                            cc.loader.loadRes("skins/q16-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            });
                            break;
                        case "skin17":
                            n = this;
                            cc.loader.loadRes("skins/q17-2", cc.SpriteFrame, function(e, t) {
                                n.node.getComponent(cc.Sprite).spriteFrame = t
                            })
                    }
                },
                start: function() {}
            }),
            cc._RF.pop()
    }, {
        Common: "Common"
    }],
    switchGame: [function(e, t, n) {

    }, {}]
}, {}, ["AD", "AudioControl", "Common", "DataController", "GameRankingList", "IPXscreen", "RankItem", "RestartGame", "SoundCtrl", "Test", "UIControl", "basePnl", "destoryOnClick", "disableOnClick", "freezeXY", "gameState", "hintBtn", "levelBtn", "loadScene", "loading", "onShareEntry", "physics-settings", "physicsManager", "rigBoxBlockMoving", "screenScale", "share", "showStars", "skinBtn", "skinChange", "switchGame"]);