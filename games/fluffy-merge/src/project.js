window.__require = function t(e, o, n) {
    function i(a, s) {
        if (!o[a]) {
            if (!e[a]) {
                var c = a.split("/");
                if (c = c[c.length - 1], !e[c]) {
                    var l = "function" == typeof __require && __require;
                    if (!s && l) return l(c, !0);
                    if (r) return r(c, !0);
                    throw new Error("Cannot find module '" + a + "'")
                }
                a = c
            }
            var u = o[a] = {
                exports: {}
            };
            e[a][0].call(u.exports, function(t) {
                return i(e[a][1][t] || t)
            }, u, u.exports, t, e, o, n)
        }
        return o[a].exports
    }
    for (var r = "function" == typeof __require && __require, a = 0; a < n.length; a++) i(n[a]);
    return i
}({
    AbstractSDK: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "cba56kvwFlOgo/SEpjBJ//J", "AbstractSDK"), Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var n = function() {
            function t(t, e, o) {
                if (void 0 === t && (t = !1), void 0 === e && (e = 3), void 0 === o && (o = 500), this.UPDATE_SCORE = 2, this.MP_PLAYER_CONNECT = 80, this.MP_START = 81, this.MP_ASSIGN_NETWORKED_NODES = 82, this.MP_ACKNOWLEDGE_HOST = 83, this.MP_UPDATE_NODE = 84, this.MP_INITIALIZE_NODE = 85, this.MP_DESTROY_NODE = 86, this.MP_REASSIGN_NODE_OWNER = 87, this.PING = 10, this.sdkApp = null, this.finalScoreSent = !1, this.opponents = {}, this.isGameOver = !1, this.sdkHandler = null, this.myPlayerData = null, this.prefabNameKey = "_prefabName", this.playerReadyTimeKey = "_playerReadyTime", this.timestampKey = "_timestamp", this.senderKey = "_senderID", this.hostIDKey = "_hostID", this.matchIDKey = "_matchID", this.newOwnerIDKey = "_newOwnerID", this.networkedNodesKey = "_networkedNodes", this.initializedNodesKey = "_initializedNodes", this.eventNameKey = "_eventName", this.pingRequesterKey = "_pingRequestedBy", this.pingRecipientKey = "_pingRecipient", this.gameEndTimeKey = "_gameEndTime", this.isPongKey = "_isPong", this.hostID = "", this.matchID = "", this.networkedNodes = new Map, this.playerReadyTime = {}, this.remainingPlayerCountToAcknowledgeHost = 0, this.isRealtimeMultiplayer = !1, this.lastPingTimeStamp = 0, this.gameEndTime = 0, this.pingLimit = 3, this.pingInterval = 500, this.playerPings = new Map, this.pingRequestedTimeStamps = new Map, gpSDK) {
                    this.sdkApp = gpSDK, this.opponents = this.sdkApp.opponents, this.isRealtimeMultiplayer = t && this.opponentCount() > 0, this.pingLimit = e, this.pingInterval = o;
                    var n = this;
                    this.sdkApp.sdkOnEvent = function(t, e, o) {
                        switch (t) {
                            case n.MP_PLAYER_CONNECT:
                                n.MP_onPlayerConnected(e);
                                break;
                            case n.MP_ASSIGN_NETWORKED_NODES:
                                n.hostID && "" != n.hostID || (n.hostID = e[n.hostIDKey], n.matchID = e[n.matchIDKey], n.playerReadyTime = e[n.playerReadyTimeKey], n.sdkHandler.MP_Client_AssignNetworkNodes(e[n.networkedNodesKey]), n.MP_Ping(n.hostID), n.sendMessage({}, n.MP_ACKNOWLEDGE_HOST));
                                break;
                            case n.MP_ACKNOWLEDGE_HOST:
                                if (n.isHost())
                                    if (n.remainingPlayerCountToAcknowledgeHost--, e.hasOwnProperty(n.senderKey) && n.MP_Ping(e[n.senderKey]), 0 == n.remainingPlayerCountToAcknowledgeHost) n.sdkHandler.MP_Host_OnGameStart(), (r = {})[n.gameEndTimeKey] = n.gameEndTime, n.sendMessage(r, n.MP_START);
                                break;
                            case n.MP_START:
                                n.isHost() || (e.hasOwnProperty(n.gameEndTimeKey) && (n.gameEndTime = e[n.gameEndTimeKey]), n.sdkHandler.MP_Client_OnGameStart());
                                break;
                            case n.MP_UPDATE_NODE:
                                n.matchSessionValid(e) && e.hasOwnProperty(n.senderKey) && e.hasOwnProperty("networkedNodeID") && n.networkedNodes.has(e.networkedNodeID) && n.networkedNodes.get(e.networkedNodeID).ownerID == e[n.senderKey] && n.networkedNodes.get(e.networkedNodeID).updateFromData(e);
                                break;
                            case n.MP_INITIALIZE_NODE:
                                if (n.matchSessionValid(e))
                                    if (e.hasOwnProperty(n.senderKey) && e.hasOwnProperty(n.initializedNodesKey)) e[n.initializedNodesKey].forEach(function(t) {
                                        if (t.hasOwnProperty(n.prefabNameKey) && !n.networkedNodes.has(t.networkedNodeID)) {
                                            var e = n.sdkHandler.MP_OnInitializeNetworkedNode(t[n.prefabNameKey]);
                                            e && (e.assignOwnerID(t.ownerID), e.setNetworkID(t.networkedNodeID), e.updateFromData(t))
                                        }
                                    });
                                break;
                            case n.MP_DESTROY_NODE:
                                n.matchSessionValid(e) && e.hasOwnProperty(n.senderKey) && n.networkedNodes.has(e.networkedNodeID) && n.networkedNodes.get(e.networkedNodeID).ownerID == e[n.senderKey] && (n.networkedNodes.get(e.networkedNodeID).node.destroy(), n.networkedNodes.delete(e.networkedNodeID));
                                break;
                            case n.MP_REASSIGN_NODE_OWNER:
                                n.matchSessionValid(e) && e.hasOwnProperty(n.senderKey) && n.networkedNodes.has(e.networkedNodeID) && (!e.hasOwnProperty(n.newOwnerIDKey) || e[n.senderKey] != n.networkedNodes.get(e.networkedNodeID).ownerID && e[n.senderKey] != n.hostID || n.networkedNodes.get(e.networkedNodeID).updateFromData(e), n.networkedNodes.get(e.networkedNodeID).ownerID = e[n.newOwnerIDKey]);
                                break;
                            case n.PING:
                                if (e.hasOwnProperty(n.pingRequesterKey) && e.hasOwnProperty(n.pingRecipientKey) && e[n.pingRecipientKey] == n.getMyPlayerID())
                                    if (e.hasOwnProperty(n.isPongKey)) {
                                        var i = e[n.pingRecipientKey];
                                        n.playerPings.has(i) || n.playerPings.set(i, []), n.playerPings[i].push((new Date).getTime() - n.pingRequestedTimeStamps[i]), n.playerPings[i].length > n.pingLimit && n.playerPings[i].shift(), n.isGameOver || setTimeout(function() {
                                            n.MP_Ping(i)
                                        }, n.pingInterval)
                                    } else {
                                        var r;
                                        (r = {})[n.pingRequesterKey] = e[n.pingRequesterKey], r[n.pingRecipientKey] = n.getMyPlayerID(), r[n.isPongKey] = !0, n.sendMessage(r, n.PING)
                                    }
                                break;
                            default:
                                n.onEvent(t, e, o)
                        }
                    }, this.sdkApp.updateOpponentScore = function(t, e, o) {
                        n.updateOpponentScore(t, o)
                    }, this.sdkApp.onOpponentsReady = function() {
                        n.sdkHandler.OnOpponentsReady()
                    }
                } else console.log("uh oh")
            }
            return t.prototype.sleep = function(t) {
                return new Promise(function(e) {
                    return setTimeout(e, t)
                })
            }, t.prototype.matchSessionValid = function(t) {
                return t && t.hasOwnProperty(this.matchIDKey) && t[this.matchIDKey] == this.matchID
            }, t.prototype.MP_Ping = function(t) {
                if (t) {
                    var e = {};
                    e[this.pingRequesterKey] = this.getMyPlayerID(), e[this.pingRecipientKey] = t, this.sendMessage(e, this.PING), this.pingRequestedTimeStamps.set(t, e[this.timestampKey])
                }
            }, t.prototype.removeNetworkedNode = function(t) {
                this.networkedNodes.has(t) && this.networkedNodes.delete(t)
            }, t.prototype.MP_onPlayerConnected = function(t) {
                if (!this.playerReadyTime.hasOwnProperty(t[this.senderKey]) && (this.playerReadyTime[t[this.senderKey]] = t[this.timestampKey], Object.keys(this.playerReadyTime).length == this.opponentCount() + 1 && this.getMyPlayerID() == this.getFastestConnectedUser())) {
                    this.hostID = this.getMyPlayerID(), this.matchID = this.generateUUID(), this.remainingPlayerCountToAcknowledgeHost = this.opponentCount();
                    var e = this.sdkHandler.MP_Host_AssignNetworkedNodes(),
                        o = {};
                    o[this.hostIDKey] = this.hostID, o[this.matchIDKey] = this.matchID;
                    for (var n = [], i = 0, r = e; i < r.length; i++) {
                        var a = r[i];
                        n.push(a.convertToData())
                    }
                    o[this.networkedNodesKey] = n, o[this.playerReadyTimeKey] = this.playerReadyTime, this.sdkApp.goPlaySDK.sendEvent(this.MP_ASSIGN_NETWORKED_NODES, o)
                }
            }, t.prototype.generateUUID = function() {
                return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                    var e = 16 * Math.random() | 0;
                    return ("x" == t ? e : 3 & e | 8).toString(16)
                })
            }, t.prototype.readyToStart = function() {
                var t = this;
                setTimeout(function() {
                    t.sdkApp.readyToStart()
                }, 1500)
            }, t.prototype.getPlayerAveragePing = function(t) {
                var e = 0;
                return this.playerPings.has(t) && this.playerPings[t].length > 0 && (this.playerPings[t].forEach(function(t) {
                    e += t
                }), e /= this.playerPings[t].length), e
            }, t.prototype.getFastestConnectedUser = function() {
                for (var t, e = 0, o = Object.keys(this.playerReadyTime); e < o.length; e++) {
                    var n = o[e];
                    t ? this.playerReadyTime[n] < this.playerReadyTime[t] && (t = n) : t = n
                }
                return t
            }, t.prototype.startGame = function() {
                this.sdkApp && this.sdkApp.goPlaySDK.startGame()
            }, t.prototype.isHost = function() {
                return !!this.hostID && this.hostID == this.getMyPlayerID()
            }, t.prototype.isSinglePlayer = function() {
                return !this.sdkApp || this.sdkApp.isSinglePlayer()
            }, t.prototype.opponentCount = function() {
                return this.opponents ? Object.keys(this.opponents).length : 0
            }, t.prototype.getMyPlayerID = function() {
                return this.myPlayerData && this.myPlayerData.id ? this.myPlayerData.id : ""
            }, t.prototype.setSDKHandler = function(t) {
                this.sdkHandler = t, this.updateMyPlayerInfo();
                var e = Object.keys(this.opponents);
                e.length > 0 && this.updateOpponent(this.opponents[e[0]]), this.isRealtimeMultiplayer && this.sendMessage({}, this.MP_PLAYER_CONNECT)
            }, t.prototype.updateMyPlayerInfo = function() {
                if (this.sdkApp && this.sdkApp.goPlaySDK) {
                    var t = null;
                    this.sdkApp.goPlaySDK.getCurrentPlayer(function(e) {
                        t = e
                    }), t && this.sdkHandler.OnSelfPlayerDataUpdated(t), this.myPlayerData = t
                }
            }, t.prototype.updateOpponent = function(t) {
                t && this.sdkHandler && this.sdkHandler.OnOpponentUpdated(t)
            }, t.prototype.updateOpponentScore = function(t, e) {
                this.sdkHandler && this.sdkHandler.OnOpponentScoreUpdated(t, e)
            }, t.prototype.sendCurrentScore = function(t) {
                this.sdkApp.setScore(t)
            }, t.prototype.abortGame = function() {
                this.sdkApp.goPlaySDK.abortGame(function() {}, function() {})
            }, t.prototype.triggerGameOver = function() {
                this.sdkApp && this.sdkApp.updateFinalScore()
            }, t.prototype.initializeNodes = function() {
                for (var t = this, e = [], o = 0; o < arguments.length; o++) e[o] = arguments[o];
                if (this.isRealtimeMultiplayer) {
                    var n = {};
                    n[this.initializedNodesKey] = [];
                    var i = (new Date).getTime();
                    e.forEach(function(e) {
                        e.generateNetworkID();
                        var o = e.convertToData();
                        o[t.timestampKey] = i, n[t.initializedNodesKey].push(o)
                    }), this.sendMessage(n, this.MP_INITIALIZE_NODE)
                }
            }, t.prototype.callRPCMethod = function(t, e, o) {
                e[this.eventNameKey] = t, this.sendMessage(e, o)
            }, t.prototype.sendMessage = function(t, e) {
                var o = this;
                if (t[this.senderKey] = this.getMyPlayerID(), t[this.timestampKey] = (new Date).getTime(), this.matchID && (t[this.matchIDKey] = this.matchID), e == this.MP_PLAYER_CONNECT) {
                    this.MP_onPlayerConnected(t);
                    var n = Object.assign({}, t),
                        i = window.setInterval(function() {
                            o.isMPHasHost() ? window.clearInterval(i) : o.sdkApp.goPlaySDK.sendEvent(e, n)
                        }, 2e3)
                }
                this.sdkApp.goPlaySDK.sendEvent(e, t)
            }, t.prototype.isMPHasHost = function() {
                return !!this.hostID && this.hostID.length > 0
            }, t.prototype.getTimeRemainingInSeconds = function() {
                return (this.gameEndTime - (new Date).getTime()) / 1e3
            }, t.prototype.networkDestroy = function(t) {
                this.isRealtimeMultiplayer ? t && (this.sendMessage(t.convertToData(), this.MP_DESTROY_NODE), t.isSelfOwnNode() && t.node.destroy()) : t.node.destroy()
            }, t.instance = null, t
        }();
        o.default = n, cc._RF.pop()
    }, {}],
    BallCollider: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "992ebmuoSxE/ot5kFnCp7eI", "BallCollider");
        var n = this && this.__extends || function() {
                var t = function(e, o) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                        })(e, o)
                };
                return function(e, o) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
                }
            }(),
            i = this && this.__decorate || function(t, e, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
                else
                    for (var s = t.length - 1; s >= 0; s--)(i = t[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(e, o, a) : i(e, o)) || a);
                return r > 3 && a && Object.defineProperty(e, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = t("./GameManager"),
            a = t("./Utils"),
            s = cc._decorator,
            c = s.ccclass,
            l = s.property,
            u = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.face = null, e.fluffGrass = null, e.rigidBody = null, e.canDestroy = !0, e.isMoving = !1, e.checkMoveInterval = .25, e
                }
                var o;
                return n(e, t), o = e, e.prototype.start = function() {
                    this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this, !0), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, !0), this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0), this.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this, !0), this.rigidBody = this.getComponent(cc.RigidBody)
                }, e.prototype.onEnable = function() {
                    this.canDestroy = !0, this.isMoving = !1
                }, e.prototype.onDestroy = function() {
                    r.default.gManager.isPlay && (this.node.stopAllActions(), r.default.gManager.addScore(this.node.position), this.isMoving && (this.isMoving = !1, r.default.gManager.adjustNumberOfMovingBalls(-1)), r.default.gManager.remainingBalls--)
                }, e.prototype.onTouch = function(t) {
                    r.default.gManager.currentSelectedBall ? r.default.gManager.canMove && (r.default.gManager.currentBallCollider.setFace(!1), this.setCurrent()) : (r.default.gManager.allowTouch(!0), this.setCurrent())
                }, e.prototype.onTouchMove = function(t) {
                    r.default.gManager.canMove && (r.default.gManager.initTouchPosition ? r.default.gManager.onTouchMove(t) : r.default.gManager.onTouch(t))
                }, e.prototype.onTouchEnd = function(t) {
                    r.default.gManager.canMove && (null != r.default.gManager.initTouchPosition ? r.default.gManager.onTouchEnd(t) : r.default.gManager.idleHinting(!0))
                }, e.prototype.onTouchCancel = function(t) {
                    r.default.gManager.onTouchEnd(t)
                }, e.prototype.onBeginContact = function(t, e, o) {
                    r.default.gManager.isSFXMute || cc.audioEngine.playEffect(r.default.gManager.sfx_Bounce, !1)
                }, e.prototype.onCollisionEnter = function(t, e) {
                    this.contactCallbacks(e.node, t.node)
                }, e.prototype.contactCallbacks = function(t, e) {
                    if (1 == r.default.gManager.isSpawning && "Ball" == e.group);
                    else {
                        var n = e.getComponent(o);
                        "Ball" == e.group && (e.parent == t.parent ? (r.default.gManager.isSFXMute || (cc.audioEngine.playEffect(r.default.gManager.sfx_Moves[a.default.getRandomInt(r.default.gManager.sfx_Moves.length)], !1), cc.audioEngine.playEffect(r.default.gManager.sfx_Merge, !1)), r.default.gManager.cameraShake(), t.parent.childrenCount > 2 ? n.canDestroy ? (r.default.gManager.createShockwave(e, e.position), e.destroy()) : 0 == n.canDestroy && 0 == this.canDestroy && n.node.getSiblingIndex() > this.node.getSiblingIndex() && (r.default.gManager.createShockwave(e, e.position), e.destroy()) : (r.default.gManager.createShockwave(e, e.position), e.destroy(), r.default.gManager.createShockwave(t, t.position), this.scheduleOnce(t.destroy, .1))) : n.canDestroy && (n.isMoving || (r.default.gManager.adjustNumberOfMovingBalls(1), n.setMoving(!0)), n.canDestroy = !1, r.default.gManager.isSFXMute || cc.audioEngine.playEffect(r.default.gManager.sfx_Moves[a.default.getRandomInt(r.default.gManager.sfx_Moves.length)], !1), n.scheduleOnce(n.checkMoveCallback, .5)))
                    }
                }, e.prototype.checkMoveCallback = function() {
                    var t = this;
                    this.isMoving && this.node.runAction(cc.sequence(cc.callFunc(function() {
                        t.node.parent.childrenCount < 2 && t.node.destroy(), t.rigidBody.linearVelocity.x > -.5 && t.rigidBody.linearVelocity.x < .5 && t.rigidBody.linearVelocity.y > -.5 && t.rigidBody.linearVelocity.y < .5 && (t.setMoving(!1), r.default.gManager.adjustNumberOfMovingBalls(-1))
                    }), cc.delayTime(this.checkMoveInterval), cc.callFunc(function() {
                        t.isMoving && t.checkMoveCallback()
                    })))
                }, e.prototype.setCurrent = function() {
                    r.default.gManager.currentSelectedBall = this.node, r.default.gManager.currentBallRigidBody = this.rigidBody, r.default.gManager.currentBallCollider = this, this.setFace(!0), r.default.gManager.isSFXMute || cc.audioEngine.playEffect(r.default.gManager.sfx_Wake, !1), r.default.gManager.idleHinting(!1)
                }, e.prototype.setMoving = function(t) {
                    this.isMoving = t, this.setFace(t), this.playGrassAnim(t)
                }, e.prototype.setFace = function(t) {
                    this.face.spriteFrame = t ? r.default.gManager.faces[a.default.getRandomInt(r.default.gManager.faces.length - 1, 1)] : r.default.gManager.faces[0]
                }, e.prototype.playGrassAnim = function(t) {
                    t ? this.fluffGrass.play("fluffgrass") : (this.fluffGrass.stop("fluffgrass"), this.fluffGrass.setCurrentTime(0, "fluffgrass"))
                }, i([l(cc.Sprite)], e.prototype, "face", void 0), i([l(cc.Animation)], e.prototype, "fluffGrass", void 0), e = o = i([c], e)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "./GameManager": "GameManager",
        "./Utils": "Utils"
    }],
    GDSDKHandler: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "63994OGPK9HAIxdg83mKtb4", "GDSDKHandler");
        var n = this && this.__extends || function() {
            var t = function(e, o) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                    })(e, o)
            };
            return function(e, o) {
                function n() {
                    this.constructor = e
                }
                t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }();
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = t("../SDK/ISDKHandler"),
            r = t("../SDK/SDKFunction"),
            a = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.gameData = null, e.gameID = window.document.title, e.gameFileName = e.gameID + "_save", e.isWatchAds = !1, e.isRequestAds = !1, e
                }
                return n(e, t), e.prototype.onLoad = function() {
                    var e = this;
                    t.prototype.onLoad.call(this);
                    var o = r.default.getInstance().sdkApp;
                    if (o) {
                        o.gdGameStart = function() {
                            e.onSDKGameStart()
                        }, o.gdGamePause = function() {
                            e.onSDKGamePause()
                        }, o.gdGdprTracking = this.onSDKGdprTracking, o.gdGdprTargetting = this.onSDKGdprTargetting;
                        var n = o.sdk;
                        n && n.preloadAd && n.preloadAd("rewarded").then(function(t) {
                            console.log(t.toString())
                        }).catch(function(t) {
                            console.log(t.toString())
                        }), window.GD_OPTIONS && (this.gameID = window.GD_OPTIONS.gameID), this.gameFileName = this.gameID + "_save"
                    }
                    this.loadGameData()
                }, e.prototype.onSDKGameStart = function() {
                    this.isRequestAds && this.isWatchAds && this.onPlayerCompletedWatchingAds(), this.isRequestAds = !1, this.isWatchAds = !1, this.onGDSDKGameStart()
                }, e.prototype.onGDSDKGameStart = function() {
                    console.log("GameDistribution - onSDKGameStart")
                }, e.prototype.onPlayerCompletedWatchingAds = function() {
                    console.log("Finished watching ads")
                }, e.prototype.onSDKGamePause = function() {
                    this.isRequestAds && (this.isWatchAds = !0), this.onGDSDKGamePause()
                }, e.prototype.onGDSDKGamePause = function() {
                    console.log("GameDistribution - onSDKGamePause")
                }, e.prototype.onSDKGdprTracking = function() {
                    console.log("GameDistribution - onSDKGdprTracking")
                }, e.prototype.onSDKGdprTargetting = function() {
                    console.log("GameDistribution - onSDKGdprTargetting")
                }, e.prototype.showAds = function() {
                    var t = r.default.getInstance().sdkApp;
                    if (t) {
                        var e = t.sdk;
                        e && e.showAd && (this.isRequestAds = !0, e.showAd())
                    }
                }, e.prototype.showRewardedAds = function() {
                    var t = r.default.getInstance().sdkApp;
                    if (t) {
                        var e = t.sdk;
                        e && e.showAd && (this.isRequestAds = !0, e.showAd("rewarded"))
                    }
                }, e.prototype.loadGameData = function() {
                    if (!this.gameData) {
                        var t = localStorage.getItem(this.gameFileName);
                        t ? (this.gameData = JSON.parse(t), console.log("Game data loaded successfully")) : (this.gameData = {}, this.saveGameData())
                    }
                }, e.prototype.updateSaveData = function(t, e) {
                    this.gameData && (this.gameData[t] = e)
                }, e.prototype.saveGameData = function() {
                    console.log("Saving game data"), localStorage.setItem(this.gameFileName, JSON.stringify(this.gameData))
                }, e.prototype.getSavedData = function(t) {
                    if (this.gameData) {
                        if (this.gameData.hasOwnProperty(t)) return this.gameData[t]
                    } else console.log("Game data not loaded");
                    return null
                }, e
            }(i.default);
        o.default = a, cc._RF.pop()
    }, {
        "../SDK/ISDKHandler": void 0,
        "../SDK/SDKFunction": void 0
    }],
    GameManager: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "92217fdwjJIMLOsWr4dO5z2", "GameManager");
        var n = this && this.__extends || function() {
                var t = function(e, o) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                        })(e, o)
                };
                return function(e, o) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
                }
            }(),
            i = this && this.__decorate || function(t, e, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
                else
                    for (var s = t.length - 1; s >= 0; s--)(i = t[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(e, o, a) : i(e, o)) || a);
                return r > 3 && a && Object.defineProperty(e, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = t("./Utils"),
            a = t("./BallCollider"),
            s = t("./PoolHelper"),
            c = t("../SDK/GameDistribution/GDSDKHandler"),
            l = t("./ShopManager"),
            u = t("./ShopBoxController"),
            p = cc._decorator,
            h = p.ccclass,
            d = p.property,
            g = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.coinGainedLabel = null, e.fluffPool = null, e.shockwavePool = null, e.bgmKnobSprite = null, e.sfxKnobSprite = null, e.switchKnobSprites = [], e.faces = [], e.bgmSource = null, e.sfx_Bounce = null, e.sfx_Drag = null, e.sfx_Merge = null, e.sfx_Wake = null, e.sfx_Moves = [], e.sfx_Tap = null, e.graphicsComponent = null, e.blockInputOverlay = null, e.loadAdsText = null, e.gameBackground = null, e.ballSpawnArea = null, e.pauseScreen = null, e.settingsScreen = null, e.audioSwitches = null, e.bgmSwitch = null, e.sfxSwitch = null, e.tutorialScreen = null, e.mainMenu = null, e.mainMenuButtons = null, e.shopMenu = null, e.shopContent = null, e.fluffColorPreview = null, e.uiNodes = null, e.arrowCenter = null, e.ballSetParents = [], e.hintHand = null, e.levelText = null, e.comboText = null, e.moveText = null, e.playerScoreLabel = null, e.highScoreText = null, e.currentCoinText = null, e.levelSpawnCounts = [], e.levelColorCounts = [], e.maxMagnitude = 0, e.forceMultiplier = 0, e.roundTime = 0, e.initialMoves = 0, e.extraMovesLimit = 0, e.initialSkinPrice = 0, e.skinPriceIncrement = 0, e.gameOverScreen = null, e.gameOverNodeLabel = null, e.continueButton = null, e.currentSelectedBall = null, e.currentBallRigidBody = null, e.currentBallCollider = null, e.eventCode = 0, e.checkWinLoseID = 0, e.intervalID = 0, e.timer = 0, e.remainingMoves = 0, e.remainingBalls = 0, e.maxBalls = 0, e.comboMultiplier = 0, e.comboTween = null, e.currentCoin = 0, e.currentLevel = 0, e.currentScore = 0, e.highScore = 0, e.currentSpawnCount = 0, e.currentColorCount = 0, e.numberOfMovingBalls = 0, e.initTouchPosition = null, e.initGlobalTouchPosition = null, e.magnitudeX = 0, e.magnitudeY = 0, e.adsSkinBox = null, e.currentSkinIndex = -1, e.currentSkinPrice = 0, e.ownedSkin = [], e.unownedSkinToBuy = [], e.unownedSkinForAds = [], e.spawnPoints = [], e.isSpawning = !1, e.isPlay = !1, e.canMove = !1, e.isFirstGameOver = !0, e.isFirstPlay = !0, e.isSFXMute = !1, e.isBGMMute = !1, e.quickTapCheck = null, e.isQuickTap = !1, e.quickTapThreshold = .4, e
                }
                var o;
                return n(e, t), o = e, e.prototype.onGDSDKGameStart = function() {
                    o.gManager.isBGMMute || o.gManager.bgmSource.play(), o.gManager.blockInputOverlay.active = !1
                }, e.prototype.onPlayerCompletedWatchingAds = function() {
                    switch (o.gManager.eventCode) {
                        case 1:
                            o.gManager.setGameOver(!1), o.gManager.remainingMoves += 5, o.gManager.moveText.string = o.gManager.remainingMoves.toString(), o.gManager.isPlay = !0, o.gManager.resetDestroyBool();
                            break;
                        case 2:
                            var t = o.gManager.adsSkinBox.getComponent(u.default);
                            o.gManager.getAdsSkin(t.skinIndex), l.default.shopManager.replaceBox(t.skinIndex, t.node, t.node.getSiblingIndex(), t.boxType)
                    }
                }, e.prototype.onGDSDKGamePause = function() {
                    cc.audioEngine.stopAll(), o.gManager.bgmSource.stop()
                }, e.prototype.onSDKGdprTracking = function() {
                    console.log("no track")
                }, e.prototype.onSDKGdprTargetting = function() {
                    console.log("no targeting")
                }, e.prototype.onLoad = function() {
                    t.prototype.onLoad.call(this), o.gManager = this, console.log("CURRENT BUILD 1.44"), cc.director.getPhysicsManager().enabled = !0, cc.game.setFrameRate(60), cc.director.getCollisionManager().enabled = !0, this.showAds(), o.gManager.blockInputOverlay.active = !0, o.gManager.loadAdsText.active = !0
                }, e.prototype.start = function() {
                    var t = this;
                    this.quickTapCheck = cc.tween(this.node).delay(this.quickTapThreshold).call(function() {
                        t.isQuickTap = !1
                    }), null != this.getSavedData("mergeBallHighScore") && (this.highScore = this.getSavedData("mergeBallHighScore"), this.highScoreText.string = this.highScore.toString()), null != this.getSavedData("isFirstPlay") && (this.isFirstPlay = this.getSavedData("isFirstPlay")), null != this.getSavedData("Coins") && (this.currentCoin = this.getSavedData("Coins"), this.currentCoinText.string = this.currentCoin.toString()), null != this.getSavedData("currentSkinPrice") ? this.currentSkinPrice = this.getSavedData("currentSkinPrice") : this.currentSkinPrice = this.initialSkinPrice, null != this.getSavedData("currentSkinIndex") ? this.currentSkinIndex = this.getSavedData("currentSkinIndex") : this.currentSkinIndex = 7, null != this.getSavedData("ownedSkin") ? this.ownedSkin = this.getSavedData("ownedSkin") : this.ownedSkin = [7], null != this.getSavedData("unownedSkinToBuy") ? this.unownedSkinToBuy = this.getSavedData("unownedSkinToBuy") : this.unownedSkinToBuy = [1, 2, 3, 4, 5, 6, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 23, 24, 25, 27, 28], null != this.getSavedData("unownedSkinForAds") ? this.unownedSkinForAds = this.getSavedData("unownedSkinForAds") : this.unownedSkinForAds = [0, 8, 22, 26, 29], null != this.getSavedData("isBGMMute") && (this.isBGMMute = this.getSavedData("isBGMMute")), this.isBGMMute ? this.bgmSource.stop() : this.bgmSource.play(), null != this.getSavedData("isSFXMute") && (this.isSFXMute = this.getSavedData("isSFXMute")), this.generateGrid(), setTimeout(function() {
                        return l.default.shopManager.setShopContent()
                    }, 1e3)
                }, e.prototype.gameInit = function() {
                    this.setLevelParameters(1), this.uiNodes.active = !0
                }, e.prototype.onTouch = function(t) {
                    !this.initTouchPosition && this.currentSelectedBall && this.canMove && (this.isSpawning && (this.isSpawning = !1), this.arrowCenter.position = this.currentSelectedBall.position, this.initTouchPosition = t.getLocation(), this.initGlobalTouchPosition = this.node.convertToNodeSpaceAR(this.initTouchPosition), this.graphicsComponent.moveTo(this.initGlobalTouchPosition.x, this.initGlobalTouchPosition.y), this.idleHinting(!1), this.isQuickTap = !0, this.quickTapCheck.start())
                }, e.prototype.onTouchMove = function(t) {
                    if (this.initTouchPosition && this.currentSelectedBall) {
                        var e = t.getLocation(),
                            o = Math.abs(r.default.getDiagonalDistance(e, this.initTouchPosition)) > 20;
                        if ((!this.isQuickTap || o) && (this.quickTapCheck.stop(), this.arrowCenter.position != this.currentSelectedBall.position && (this.arrowCenter.position = this.currentSelectedBall.position), this.isQuickTap && !this.isSFXMute && cc.audioEngine.playEffect(this.sfx_Drag, !1), this.isQuickTap = !1, this.arrowCenter.active = !0, this.initTouchPosition && this.canMove)) {
                            this.currentSelectedBall.getBoundingBoxToWorld().contains(e) ? (this.currentBallCollider.setFace(!1), this.arrowCenter.active = !1) : this.currentBallCollider.face.spriteFrame == this.faces[0] && (this.currentBallCollider.setFace(!0), this.isSFXMute || cc.audioEngine.playEffect(this.sfx_Drag, !1)), this.graphicsComponent.clear(), this.graphicsComponent.moveTo(this.initGlobalTouchPosition.x, this.initGlobalTouchPosition.y);
                            var n = Math.atan2(this.initTouchPosition.y - e.y, this.initTouchPosition.x - e.x),
                                i = r.default.getDiagonalDistance(e, this.initTouchPosition);
                            i >= this.maxMagnitude && (i = this.maxMagnitude);
                            var a = -i * Math.cos(-n),
                                s = i * Math.sin(-n),
                                c = cc.v2(this.initTouchPosition.x + a, this.initTouchPosition.y + s);
                            this.magnitudeX = this.initTouchPosition.x - c.x, this.magnitudeY = this.initTouchPosition.y - c.y, this.arrowCenter.angle = Math.atan2(this.initTouchPosition.y - c.y, this.initTouchPosition.x - c.x) * (180 / Math.PI) - 90;
                            var l = this.node.convertToNodeSpaceAR(c);
                            this.graphicsComponent.lineTo(l.x, l.y), this.currentSelectedBall.getBoundingBoxToWorld().contains(e) || this.graphicsComponent.stroke()
                        }
                    }
                }, e.prototype.onTouchEnd = function(t) {
                    if (this.quickTapCheck.stop(), this.isQuickTap) this.isQuickTap = !1;
                    else if (this.initTouchPosition && this.currentSelectedBall && this.canMove) {
                        var e = t.getLocation();
                        this.currentSelectedBall.getBoundingBoxToWorld().contains(e) ? (this.currentBallCollider.setFace(!1), this.currentSelectedBall = null, this.idleHinting(!0)) : (this.currentBallCollider.canDestroy = !1, this.numberOfMovingBalls = 1, this.currentBallRigidBody.applyLinearImpulse(cc.v2(this.magnitudeX * this.forceMultiplier, this.magnitudeY * this.forceMultiplier), cc.v2(0, 0), !0), this.currentBallCollider.isMoving = !0, this.currentBallCollider.playGrassAnim(!0), this.isSFXMute || cc.audioEngine.playEffect(o.gManager.sfx_Moves[r.default.getRandomInt(o.gManager.sfx_Moves.length)], !1), this.currentBallCollider.checkMoveCallback(), this.remainingMoves--, this.remainingMoves >= 0 && (this.moveText.string = this.remainingMoves.toString())), this.arrowCenter.active = !1, this.graphicsComponent.clear(), this.allowTouch(!1)
                    }
                    this.initTouchPosition = null
                }, e.prototype.createShockwave = function(t, e) {
                    this.setShockwave(t, e, .5), this.setShockwave(t, e, 1.5)
                }, e.prototype.setShockwave = function(t, e, o) {
                    var n = this.shockwavePool.getObject(this.shockwavePool.node);
                    n.color = t.children[0].color, n.position = e, 1 != n.scale && (n.scale = 1), cc.tween(n).delay(.1).to(o - .2, {
                        opacity: 0
                    }).start(), cc.tween(n).to(o, {
                        scale: 5
                    }).to(0, {
                        scale: 1,
                        opacity: 220
                    }).call(function() {
                        return n.active = !1
                    }).start()
                }, e.prototype.spawnEffects = function(t) {
                    t.scale = 0, cc.tween(t).to(.2, {
                        scale: 1.5
                    }).to(.1, {
                        scale: 1
                    }).start()
                }, e.prototype.cameraShake = function() {
                    if (0 == this.gameBackground.getNumberOfRunningActions()) {
                        var t = this.gameBackground.position;
                        cc.tween(this.gameBackground).to(.1, {
                            position: cc.v2(t.x - 20, t.y)
                        }).to(.1, {
                            position: cc.v2(t.x + 20, t.y)
                        }).to(.1, {
                            position: cc.v2(t.x, t.y + 20)
                        }).to(.1, {
                            position: cc.v2(t.x, t.y - 20)
                        }).to(.1, {
                            position: t
                        }).start()
                    }
                }, e.prototype.idleHinting = function(t) {
                    var e = this;
                    if (t) {
                        for (var o, n = 0; n < this.ballSetParents.length; n++)
                            if (this.ballSetParents[n].childrenCount > 0 && this.ballSetParents[n].children[0].activeInHierarchy) {
                                o = this.ballSetParents[n].children[0].position;
                                break
                            }
                        o && (this.handAction = cc.tween(this.hintHand).repeatForever(cc.tween().by(1, {
                            position: cc.v2(-200, -200)
                        }).delay(.25).to(0, {
                            position: o
                        })), this.idleCheck = cc.tween(this.node).delay(5).call(function() {
                            e.hintHand.position = o, e.hintHand.active = !0, e.handAction.start()
                        }), this.idleCheck.start())
                    } else this.idleCheck && this.idleCheck.stop(), this.handAction && (this.handAction.stop(), this.hintHand.active = !1)
                }, e.prototype.generateGrid = function() {
                    this.spawnPoints = [];
                    var t = Math.floor(this.ballSpawnArea.height / 150),
                        e = Math.floor(this.ballSpawnArea.width / 150),
                        o = (this.ballSpawnArea.height - 150 * t) / 2,
                        n = (this.ballSpawnArea.width - 150 * e) / 2;
                    this.maxBalls = t * e;
                    for (var i = 0; i < t; i++)
                        for (var r = 0; r < e; r++) this.spawnPoints.push(cc.v2(150 * r + 75 + n, 150 * i + 75 + o))
                }, e.prototype.spawnBalls = function() {
                    this.isSpawning = !0;
                    var t = 0;
                    r.default.shuffle(this.spawnPoints);
                    for (var e = 0; e < this.currentColorCount; e++)
                        for (var o = 0; o < 2; o++) this.spawnOneBall(t++, e);
                    for (e = 0; e < this.currentSpawnCount - this.remainingBalls; e++) {
                        var n = r.default.getRandomInt(this.currentColorCount);
                        this.spawnOneBall(t++, n)
                    }
                }, e.prototype.spawnOneBall = function(t, e) {
                    var o = this.spawnPoints[t],
                        n = this.fluffPool.getObject(this.ballSetParents[e]),
                        i = l.default.shopManager.colorSet[this.currentSkinIndex].color[e];
                    n.children[0].color = i, n.getComponent(cc.MotionStreak).color = i, n.position = cc.v2(o.x + r.default.getRandomFloat(70, -35), o.y + r.default.getRandomFloat(70, -35)), this.spawnEffects(n), this.remainingBalls++
                }, e.prototype.allowTouch = function(t) {
                    this.canMove = t, t ? (this.node.on(cc.Node.EventType.TOUCH_START, this.onTouch, this, !0), this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, !0), this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0)) : (this.node.off(cc.Node.EventType.TOUCH_START, this.onTouch, this, !0), this.node.off(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this, !0), this.node.off(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this, !0))
                }, e.prototype.resetDestroyBool = function() {
                    for (var t = 0; t < this.ballSetParents.length; t++)
                        for (var e = 0; e < this.ballSetParents[t].childrenCount; e++) this.ballSetParents[t].children[e].getComponent(a.default).canDestroy = !0
                }, e.prototype.adjustNumberOfMovingBalls = function(t) {
                    var e = this;
                    this.numberOfMovingBalls += t, 0 == this.numberOfMovingBalls && (this.currentBallRigidBody = null, this.currentSelectedBall = null, this.checkWinLoseID = setTimeout(function() {
                        e.checkWinLoseConditions()
                    }, 500), setTimeout(function() {
                        e.comboMultiplier = 0
                    }, 500), this.remainingBalls > 0 && setTimeout(function() {
                        return e.idleHinting(!0)
                    }, 100))
                }, e.prototype.addScore = function(t) {
                    var e = this;
                    this.comboMultiplier++, this.comboText.string = "COMBO x" + this.comboMultiplier, this.comboMultiplier >= 2 && (null != this.comboTween && this.comboTween.stop(), this.comboTween = cc.tween(this.comboText.node).to(0, {
                        scale: 0,
                        opacity: 255
                    }).to(.2, {
                        scale: 1
                    }).delay(.5).to(.5, {
                        scale: 0,
                        opacity: 0
                    }), this.comboTween.start()), this.currentScore += 1 * this.comboMultiplier, this.currentCoin += this.currentLevel, this.currentCoinText.string = this.currentCoin.toString(), this.updateSaveData("Coins", this.currentCoin), this.saveGameData();
                    var o = this.coinGainedLabel.getObject(this.gameBackground);
                    o.getComponent(cc.Label).string = "+" + this.currentLevel, cc.tween(o).to(0, {
                        position: cc.v2(t.x - this.gameBackground.width / 2, t.y - this.gameBackground.height / 2)
                    }).to(.1, {
                        opacity: 255
                    }).by(1, {
                        position: cc.v2(0, 150)
                    }).to(.3, {
                        opacity: 0
                    }).call(function() {
                        e.coinGainedLabel.returnObject(o.node)
                    }).start(), this.playerScoreLabel.string = this.currentScore.toString(), this.checkHighScore(!0)
                }, e.prototype.checkHighScore = function(t) {
                    void 0 === t && (t = !1), this.currentScore >= this.highScore && (this.highScore = this.currentScore, this.highScoreText.string = this.highScore.toString(), t && this.updateSaveData("mergeBallHighScore", this.highScore), this.saveGameData())
                }, e.prototype.checkWinLoseConditions = function() {
                    var t = this;
                    this.remainingBalls <= 0 ? (this.idleHinting(!1), this.comboText.node.scale = 0, this.nextLevel()) : this.remainingBalls > 0 && this.remainingMoves <= 0 && this.setGameOver(!0), setTimeout(function() {
                        t.resetDestroyBool()
                    }, 500)
                }, e.prototype.setLevelParameters = function(t) {
                    this.currentLevel = t, 1 == this.currentLevel && (this.remainingMoves = this.initialMoves), t <= this.levelSpawnCounts.length ? (this.currentSpawnCount = this.levelSpawnCounts[this.currentLevel - 1], this.currentColorCount = this.levelColorCounts[this.currentLevel - 1]) : (this.currentSpawnCount = this.levelSpawnCounts[this.levelSpawnCounts.length - 1] + 3 * (t - this.levelSpawnCounts.length), this.currentColorCount = this.levelColorCounts[this.levelColorCounts.length - 1]), this.currentSpawnCount >= this.maxBalls && (this.currentSpawnCount = this.maxBalls), t <= this.extraMovesLimit ? this.remainingMoves += this.currentLevel - 1 : this.remainingMoves += this.extraMovesLimit, this.levelText.string = this.currentLevel.toString(), this.playerScoreLabel.string = this.currentScore.toString(), this.moveText.string = this.remainingMoves.toString(), this.spawnBalls(), this.isPlay = !0, this.idleHinting(!0)
                }, e.prototype.setTimer = function(t, e) {
                    var o = this;
                    void 0 === e && (e = !1), t && (clearInterval(this.intervalID), this.timer = this.roundTime), e ? clearInterval(this.intervalID) : this.intervalID = setInterval(function() {
                        o.timer -= 1;
                        var t = Math.floor(o.timer / 60);
                        o.timer;
                        o.timer <= 0 && (o.setGameOver(!0), o.checkHighScore(!0), clearInterval(o.intervalID))
                    }, 1e3)
                }, e.prototype.nextLevel = function() {
                    clearTimeout(this.checkWinLoseID), this.currentLevel++, this.setLevelParameters(this.currentLevel)
                }, e.prototype.setGameOver = function(t) {
                    this.gameOverScreen.active = t, t ? (this.isPlay = !1, this.isFirstGameOver ? this.continueButton.active = !0 : this.continueButton.active = !1, this.saveGameData(), cc.director.pause()) : cc.director.resume()
                }, e.prototype.continueGame = function() {
                    this.isFirstGameOver = !1, this.watchRewardedAds(1)
                }, e.prototype.restartGame = function() {
                    var t = this;
                    this.resetGame(), this.idleHinting(!1), this.gameOverScreen.active && this.setGameOver(!1), cc.tween(this.node).delay(.5).call(function() {
                        t.setLevelParameters(1)
                    }).start()
                }, e.prototype.pauseGame = function() {
                    this.playButtonTapSfx(), cc.director.pause(), this.pauseScreen.active = !0, this.audioSwitches.active = !0, this.setSwitchPosition(-75)
                }, e.prototype.resumeGame = function() {
                    this.playButtonTapSfx(), cc.director.resume(), this.pauseScreen.active = !1, this.audioSwitches.active = !1
                }, e.prototype.resetGame = function() {
                    this.isPlay = !1;
                    for (var t = 0; t < this.ballSetParents.length; t++) this.ballSetParents[t].destroyAllChildren();
                    this.currentSelectedBall = null, this.currentBallRigidBody = null, this.currentBallCollider = null, this.currentLevel = 0, this.currentScore = 0, this.remainingMoves = 0, this.remainingBalls = 0, this.currentSpawnCount = 0, this.currentColorCount = 0, this.numberOfMovingBalls = 0, this.initTouchPosition = null, this.comboMultiplier = 0, this.isFirstGameOver = !0, this.allowTouch(!1)
                }, e.prototype.openMainMenu = function() {
                    this.eventCode = 0, this.playButtonTapSfx(), this.showAds(), o.gManager.blockInputOverlay.active = !0, o.gManager.loadAdsText.active = !0, this.resetGame(), this.idleHinting(!1), this.gameOverScreen.active && this.setGameOver(!1), this.pauseScreen.active && this.resumeGame(), this.uiNodes.active = !1, this.mainMenu.active = !0, this.mainMenuButtons.active = !0, setTimeout(function() {
                        return l.default.shopManager.setShopContent()
                    }, 500)
                }, e.prototype.closeMainMenu = function() {
                    this.mainMenu.active = !1, this.mainMenuButtons.active = !1, l.default.shopManager.clearShopContent(), 1 == this.isFirstPlay ? (this.isFirstPlay = !1, this.showInstruction(), this.updateSaveData("isFirstPlay", this.isFirstPlay), this.saveGameData()) : this.gameInit()
                }, e.prototype.showInstruction = function() {
                    this.tutorialScreen.active = !0
                }, e.prototype.closeInstruction = function() {
                    this.playButtonTapSfx(), this.tutorialScreen.active = !1, this.mainMenu.activeInHierarchy || this.gameInit()
                }, e.prototype.openShopMenu = function() {
                    var t = this;
                    this.mainMenuButtons.active = !1, this.playButtonTapSfx(), cc.tween(this.shopMenu).to(.5, {
                        position: cc.v2(0, 100)
                    }).call(function() {
                        t.shopContent.opacity = 255, t.fluffColorPreview.active = !0, l.default.shopManager.setPreviewBox(l.default.shopManager.currentSelectedBox, !0), l.default.shopManager.skinOwnedTag.active = !0, l.default.shopManager.updateSkinOwned(t.ownedSkin.length), t.currentSkinPrice > t.currentCoin ? l.default.shopManager.updateBuyBox(!1, t.currentSkinPrice) : l.default.shopManager.updateBuyBox(!0, t.currentSkinPrice)
                    }).start()
                }, e.prototype.closeShopMenu = function() {
                    var t = this;
                    this.fluffColorPreview.active = !1, this.playButtonTapSfx(), this.shopContent.opacity = 0, cc.tween(this.shopMenu).call(function() {
                        o.gManager.blockInputOverlay.active = !0, o.gManager.loadAdsText.active = !1
                    }).to(.5, {
                        position: cc.v2(0, -1221.958)
                    }).call(function() {
                        t.mainMenuButtons.active = !0, o.gManager.blockInputOverlay.active = !1, l.default.shopManager.skinOwnedTag.active = !1
                    }).start()
                }, e.prototype.openSettings = function() {
                    this.playButtonTapSfx(), this.settingsScreen.active = !0, this.audioSwitches.active = !0, this.setSwitchPosition(0)
                }, e.prototype.closeSettings = function() {
                    this.playButtonTapSfx(), this.settingsScreen.active = !1, this.audioSwitches.active = !1
                }, e.prototype.setSkin = function(t) {
                    this.currentSkinIndex = t, this.updateSaveData("currentSkinIndex", this.currentSkinIndex), this.previewSkin(this.currentSkinIndex), this.saveGameData()
                }, e.prototype.previewSkin = function(t) {
                    for (var e = 0; e < this.fluffColorPreview.childrenCount; e++) this.fluffColorPreview.children[e].children[0].color = l.default.shopManager.colorSet[t].color[e]
                }, e.prototype.buySkin = function(t) {
                    var e = this;
                    if (this.currentCoin >= this.currentSkinPrice) {
                        this.currentCoin -= this.currentSkinPrice, this.currentCoinText.string = this.currentCoin.toString(), this.updateSaveData("Coins", this.currentCoin), this.setSkin(t), this.ownedSkin.push(t), this.updateSaveData("ownedSkin", this.ownedSkin), l.default.shopManager.updateSkinOwned(this.ownedSkin.length);
                        var o = this.unownedSkinToBuy.indexOf(t);
                        this.unownedSkinToBuy.splice(o, 1), this.updateSaveData("unownedSkinToBuy", this.unownedSkinToBuy), this.currentSkinPrice += this.skinPriceIncrement, this.updateSaveData("currentSkinPrice", this.currentSkinPrice), setTimeout(function() {
                            e.currentSkinPrice > e.currentCoin ? l.default.shopManager.updateBuyBox(!1, e.currentSkinPrice) : l.default.shopManager.updateBuyBox(!0, e.currentSkinPrice)
                        }, 250), this.saveGameData()
                    }
                }, e.prototype.getAdsSkin = function(t) {
                    this.setSkin(t), this.ownedSkin.push(t), this.updateSaveData("ownedSkin", this.ownedSkin), l.default.shopManager.updateSkinOwned(this.ownedSkin.length);
                    var e = this.unownedSkinForAds.indexOf(t);
                    this.unownedSkinForAds.splice(e, 1), this.updateSaveData("unownedSkinForAds", this.unownedSkinForAds), this.saveGameData()
                }, e.prototype.watchRewardedAds = function(t) {
                    this.playButtonTapSfx(), this.eventCode = t, this.showRewardedAds(), o.gManager.blockInputOverlay.active = !0, o.gManager.loadAdsText.active = !0
                }, e.prototype.playButtonTapSfx = function() {
                    this.isSFXMute || cc.audioEngine.playEffect(this.sfx_Tap, !1)
                }, e.prototype.changeBGMSettings = function() {
                    this.isBGMMute = !this.isBGMMute, this.updateSaveData("isBGMMute", this.isBGMMute), this.saveGameData(), this.isBGMMute ? (this.bgmSource.stop(), this.startKnobTween(this.bgmKnobSprite, !1)) : (this.bgmSource.play(), this.startKnobTween(this.bgmKnobSprite, !0))
                }, e.prototype.changeSFXSettings = function() {
                    this.isSFXMute = !this.isSFXMute, this.updateSaveData("isSFXMute", this.isSFXMute), this.saveGameData(), this.isSFXMute ? (cc.audioEngine.stopAll(), this.startKnobTween(this.sfxKnobSprite, !1)) : this.startKnobTween(this.sfxKnobSprite, !0)
                }, e.prototype.startKnobTween = function(t, e) {
                    var o;
                    o = e ? cc.v2(61.3333333, 0) : cc.v2(-61.3333333, 0), t.node.setPosition(o), t.spriteFrame = e ? this.switchKnobSprites[1] : this.switchKnobSprites[0]
                }, e.prototype.setSwitchPosition = function(t) {
                    this.bgmSwitch.setPosition(-175, t), this.sfxSwitch.setPosition(175, t), this.isBGMMute ? (this.bgmKnobSprite.node.setPosition(-61.3333333, 0), this.bgmKnobSprite.spriteFrame = this.switchKnobSprites[0]) : (this.bgmKnobSprite.node.setPosition(61.3333333, 0), this.bgmKnobSprite.spriteFrame = this.switchKnobSprites[1]), this.isSFXMute ? (this.sfxKnobSprite.node.setPosition(-61.3333333, 0), this.sfxKnobSprite.spriteFrame = this.switchKnobSprites[0]) : (this.sfxKnobSprite.node.setPosition(61.3333333, 0), this.sfxKnobSprite.spriteFrame = this.switchKnobSprites[1])
                }, e.gManager = null, i([d(s.default)], e.prototype, "coinGainedLabel", void 0), i([d(s.default)], e.prototype, "fluffPool", void 0), i([d(s.default)], e.prototype, "shockwavePool", void 0), i([d(cc.Sprite)], e.prototype, "bgmKnobSprite", void 0), i([d(cc.Sprite)], e.prototype, "sfxKnobSprite", void 0), i([d([cc.SpriteFrame])], e.prototype, "switchKnobSprites", void 0), i([d([cc.SpriteFrame])], e.prototype, "faces", void 0), i([d(cc.AudioSource)], e.prototype, "bgmSource", void 0), i([d({
                    type: cc.AudioClip
                })], e.prototype, "sfx_Bounce", void 0), i([d({
                    type: cc.AudioClip
                })], e.prototype, "sfx_Drag", void 0), i([d({
                    type: cc.AudioClip
                })], e.prototype, "sfx_Merge", void 0), i([d({
                    type: cc.AudioClip
                })], e.prototype, "sfx_Wake", void 0), i([d({
                    type: [cc.AudioClip]
                })], e.prototype, "sfx_Moves", void 0), i([d({
                    type: cc.AudioClip
                })], e.prototype, "sfx_Tap", void 0), i([d(cc.Graphics)], e.prototype, "graphicsComponent", void 0), i([d(cc.Node)], e.prototype, "blockInputOverlay", void 0), i([d(cc.Node)], e.prototype, "loadAdsText", void 0), i([d(cc.Node)], e.prototype, "gameBackground", void 0), i([d(cc.Node)], e.prototype, "ballSpawnArea", void 0), i([d(cc.Node)], e.prototype, "pauseScreen", void 0), i([d(cc.Node)], e.prototype, "settingsScreen", void 0), i([d(cc.Node)], e.prototype, "audioSwitches", void 0), i([d(cc.Node)], e.prototype, "bgmSwitch", void 0), i([d(cc.Node)], e.prototype, "sfxSwitch", void 0), i([d(cc.Node)], e.prototype, "tutorialScreen", void 0), i([d(cc.Node)], e.prototype, "mainMenu", void 0), i([d(cc.Node)], e.prototype, "mainMenuButtons", void 0), i([d(cc.Node)], e.prototype, "shopMenu", void 0), i([d(cc.Node)], e.prototype, "shopContent", void 0), i([d(cc.Node)], e.prototype, "fluffColorPreview", void 0), i([d(cc.Node)], e.prototype, "uiNodes", void 0), i([d(cc.Node)], e.prototype, "arrowCenter", void 0), i([d([cc.Node])], e.prototype, "ballSetParents", void 0), i([d(cc.Node)], e.prototype, "hintHand", void 0), i([d(cc.Label)], e.prototype, "levelText", void 0), i([d(cc.Label)], e.prototype, "comboText", void 0), i([d(cc.Label)], e.prototype, "moveText", void 0), i([d(cc.Label)], e.prototype, "playerScoreLabel", void 0), i([d(cc.Label)], e.prototype, "highScoreText", void 0), i([d(cc.Label)], e.prototype, "currentCoinText", void 0), i([d([Number])], e.prototype, "levelSpawnCounts", void 0), i([d([Number])], e.prototype, "levelColorCounts", void 0), i([d(Number)], e.prototype, "maxMagnitude", void 0), i([d(Number)], e.prototype, "forceMultiplier", void 0), i([d(Number)], e.prototype, "roundTime", void 0), i([d(Number)], e.prototype, "initialMoves", void 0), i([d(Number)], e.prototype, "extraMovesLimit", void 0), i([d(Number)], e.prototype, "initialSkinPrice", void 0), i([d(Number)], e.prototype, "skinPriceIncrement", void 0), i([d(cc.Node)], e.prototype, "gameOverScreen", void 0), i([d(cc.Label)], e.prototype, "gameOverNodeLabel", void 0), i([d(cc.Node)], e.prototype, "continueButton", void 0), e = o = i([h], e)
            }(c.default);
        o.default = g, cc._RF.pop()
    }, {
        "../SDK/GameDistribution/GDSDKHandler": "GDSDKHandler",
        "./BallCollider": "BallCollider",
        "./PoolHelper": "PoolHelper",
        "./ShopBoxController": "ShopBoxController",
        "./ShopManager": "ShopManager",
        "./Utils": "Utils"
    }],
    ISDKHandler: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "a0bd4ILIFlM5ZFTXVpdZQFM", "ISDKHandler");
        var n = this && this.__extends || function() {
            var t = function(e, o) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                    })(e, o)
            };
            return function(e, o) {
                function n() {
                    this.constructor = e
                }
                t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }();
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = t("./SDKFunction"),
            r = function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return n(e, t), e.prototype.onLoad = function() {
                    i.default.getInstance().setSDKHandler(this)
                }, e.prototype.OnOpponentsReady = function() {
                    console.log("OnOpponentsReady() not overridden")
                }, e.prototype.OnSelfPlayerDataUpdated = function(t) {
                    console.log("OnSelfPlayerDataUpdated(playerData) not overridden")
                }, e.prototype.OnOpponentUpdated = function(t) {
                    console.log("OnOpponentUpdated(opponent) not overridden")
                }, e.prototype.OnOpponentScoreUpdated = function(t, e) {
                    console.log("OnOpponentScoreUpdated(opponentID, opponentScore:number) not overridden")
                }, e.prototype.OnFinalScoreUpdated = function() {
                    console.log("OnSelfPlayerDataUpdated() not overridden")
                }, e.prototype.MP_Host_AssignNetworkedNodes = function() {
                    return console.log("MP_Host_AssignNetworkedNode() not overridden"), []
                }, e.prototype.MP_Client_AssignNetworkNodes = function(t) {
                    console.log("MP_Client_AssignNetworkNodes() not overridden")
                }, e.prototype.MP_Host_OnGameStart = function() {
                    console.log("MP_Host_OnGameStart() not overridden")
                }, e.prototype.MP_Client_OnGameStart = function() {
                    console.log("MP_Client_OnGameStart() not overridden")
                }, e.prototype.MP_OnInitializeNetworkedNode = function(t) {
                    return console.log("MP_OnInitializeNetworkedNode(prefabName:string) not overridden"), null
                }, e
            }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {
        "./SDKFunction": "SDKFunction"
    }],
    NetworkedNode: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "9cc98aMCZlEDZFJzvxKUz4o", "NetworkedNode");
        var n = this && this.__extends || function() {
            var t = function(e, o) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                    })(e, o)
            };
            return function(e, o) {
                function n() {
                    this.constructor = e
                }
                t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }();
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = t("./SDKFunction"),
            r = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e._minUpdateInterval = -1, e._timeSinceLastFrame = e._minUpdateInterval, e.syncedVariables = ["networkedNodeID", "ownerID"], e.previousWatchedVariableValues = new Map, e._lastUpdatedTimestamp = 0, e._changeDetected = !1, e
                }
                return n(e, t), e.prototype.generateNetworkID = function() {
                    this.networkedNodeID || (this.setNetworkID(this.generateUUID()), this.assignOwnerID(i.default.getInstance().getMyPlayerID()))
                }, e.prototype.assignOwnerID = function(t) {
                    this.ownerID = t
                }, e.prototype.setNetworkID = function(t) {
                    this.networkedNodeID = t, this.networkedNodeID && this.networkedNodeID.trim().length > 0 && i.default.getInstance().networkedNodes.set(this.networkedNodeID, this)
                }, e.prototype.addSyncedVariables = function() {
                    for (var t = [], e = 0; e < arguments.length; e++) t[e] = arguments[e];
                    for (var o = 0, n = t; o < n.length; o++) {
                        var i = n[o];
                        this.syncedVariables.push(i)
                    }
                }, e.prototype.convertToData = function() {
                    var t = {};
                    t[i.default.getInstance().prefabNameKey] = this.node.name;
                    for (var e = 0, o = this.syncedVariables; e < o.length; e++) {
                        var n = o[e];
                        t[n] = this.getNodeValue(n), this.previousWatchedVariableValues.has(n) && this.previousWatchedVariableValues.get(n) == t[n] || (this.previousWatchedVariableValues.set(n, t[n]), this._changeDetected = !0)
                    }
                    return t
                }, e.prototype.updateData = function() {
                    var t = this.convertToData();
                    this._changeDetected && (this._changeDetected = !1, i.default.getInstance().sendMessage(t, i.default.getInstance().MP_UPDATE_NODE))
                }, e.prototype.reassignNodeOwner = function(t) {
                    if (this.ownerID != t && i.default.getInstance().getMyPlayerID() == this.ownerID || i.default.getInstance().isHost()) {
                        this.ownerID = t;
                        var e = this.convertToData();
                        e[i.default.getInstance().newOwnerIDKey] = t, i.default.getInstance().sendMessage(e, i.default.getInstance().MP_REASSIGN_NODE_OWNER)
                    }
                }, e.prototype.updateFromData = function(t) {
                    var e = t[i.default.getInstance().timestampKey];
                    this._lastUpdatedTimestamp < e && (this._lastUpdatedTimestamp = e, this.onDataReceivedImpl(t))
                }, e.prototype.getNodeValue = function(t, e) {
                    return void 0 === e && (e = this), t.includes(".") ? this.getNodeValue(t.substr(t.indexOf(".") + 1), e[t.substr(0, t.indexOf("."))]) : e[t]
                }, e.prototype.generateUUID = function() {
                    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(t) {
                        var e = 16 * Math.random() | 0;
                        return ("x" == t ? e : 3 & e | 8).toString(16)
                    })
                }, e.prototype.isSelfOwnNode = function() {
                    return !!this.ownerID && this.ownerID == i.default.getInstance().getMyPlayerID()
                }, e.prototype.update = function(t) {
                    this._minUpdateInterval >= 0 && this.isSelfOwnNode() && (this._timeSinceLastFrame -= t, this._timeSinceLastFrame < 0 && (this._timeSinceLastFrame = this._minUpdateInterval, this.updateData()))
                }, e.prototype.onDestroy = function() {
                    i.default.getInstance().removeNetworkedNode(this.networkedNodeID), this.setNetworkID(null), this.assignOwnerID(null)
                }, e
            }(cc.Component);
        o.default = r, cc._RF.pop()
    }, {
        "./SDKFunction": "SDKFunction"
    }],
    PoolHelper: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "1e123L2nCJK+p573jDj0aWm", "PoolHelper");
        var n = this && this.__extends || function() {
                var t = function(e, o) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                        })(e, o)
                };
                return function(e, o) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
                }
            }(),
            i = this && this.__decorate || function(t, e, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
                else
                    for (var s = t.length - 1; s >= 0; s--)(i = t[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(e, o, a) : i(e, o)) || a);
                return r > 3 && a && Object.defineProperty(e, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = r.property,
            c = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.pool = new cc.NodePool, e.initialCount = 0, e.pooledPrefab = null, e
                }
                return n(e, t), e.prototype.start = function() {
                    for (var t = 0; t < this.initialCount; t++) {
                        var e = cc.instantiate(this.pooledPrefab);
                        this.pool.put(e)
                    }
                }, e.prototype.getObject = function(t) {
                    void 0 === t && (t = null);
                    var e = null;
                    return e = this.pool.size() > 0 ? this.pool.get() : cc.instantiate(this.pooledPrefab), t && (e.parent = t), e
                }, e.prototype.returnObject = function(t) {
                    this.pool.put(t)
                }, i([s(Number)], e.prototype, "initialCount", void 0), i([s(cc.Prefab)], e.prototype, "pooledPrefab", void 0), e = i([a], e)
            }(cc.Component);
        o.default = c, cc._RF.pop()
    }, {}],
    SDKFunction: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "5345a4nANtN66l2XW1fhiKO", "SDKFunction");
        var n = this && this.__extends || function() {
            var t = function(e, o) {
                return (t = Object.setPrototypeOf || {
                        __proto__: []
                    }
                    instanceof Array && function(t, e) {
                        t.__proto__ = e
                    } || function(t, e) {
                        for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                    })(e, o)
            };
            return function(e, o) {
                function n() {
                    this.constructor = e
                }
                t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
            }
        }();
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var i = function(t) {
            function e() {
                var e = null !== t && t.apply(this, arguments) || this;
                return e.Coconut_Score = 50, e.Pineapple_Score = 5, e.SPAWN_COCONUT = 50, e.PICK_COCONUT = 51, e.PROCESS_SCORE = 52, e.REQ_THROW_COCONUT = 60, e.RES_THROW_COCONUT = 61, e.gameManager = null, e.playerIDKey = "_playerID", e.coconutSpeedKey = "_coconutSpeed", e.playerPosXKey = "_positionX", e.scorerScoreValueKey = "_scorerScoreValue", e.playerMessageUpdateTimes = new Map, e
            }
            return n(e, t), e.getInstance = function() {
                return null == this.instance && (this.instance = new e(!0)), this.instance
            }, e.prototype.onEvent = function(t, e, o) {
                console.log("Unknown event", t, e)
            }, e
        }(t("./AbstractSDK").default);
        o.default = i, cc._RF.pop()
    }, {
        "./AbstractSDK": "AbstractSDK"
    }],
    ShopBoxController: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "c14e5vUq6ROJZ4kdE//fE+d", "ShopBoxController");
        var n = this && this.__extends || function() {
                var t = function(e, o) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                        })(e, o)
                };
                return function(e, o) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
                }
            }(),
            i = this && this.__decorate || function(t, e, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
                else
                    for (var s = t.length - 1; s >= 0; s--)(i = t[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(e, o, a) : i(e, o)) || a);
                return r > 3 && a && Object.defineProperty(e, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = t("./GameManager"),
            a = t("./ShopManager"),
            s = cc._decorator,
            c = s.ccclass,
            l = s.property,
            u = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.boxSprite = null, e.boxSprites = [], e.inUseTag = null, e.fluffColors = [], e.button = null, e.boxType = 0, e.skinPriceLabel = null, e.skinIndex = -1, e
                }
                return n(e, t), e.prototype.start = function() {
                    var t = this;
                    switch (this.node.on(cc.Node.EventType.TOUCH_START, function() {
                        r.default.gManager.playButtonTapSfx(), a.default.shopManager.setPreviewBox(this, !0)
                    }, this), this.boxType) {
                        case 1:
                            this.button.on(cc.Node.EventType.TOUCH_START, function() {
                                r.default.gManager.playButtonTapSfx(), a.default.shopManager.unselectPreviousBox(this), r.default.gManager.setSkin(this.skinIndex)
                            }, this);
                            break;
                        case 2:
                            this.button.on(cc.Node.EventType.TOUCH_START, function() {
                                r.default.gManager.playButtonTapSfx(), r.default.gManager.adsSkinBox = this.node, r.default.gManager.watchRewardedAds(2)
                            }, this);
                            break;
                        case 3:
                            this.button.on(cc.Node.EventType.TOUCH_START, function() {
                                return t.buySkinCallback()
                            }, this)
                    }
                }, e.prototype.onEnable = function() {
                    if (3 == this.boxType) {
                        r.default.gManager.currentSkinPrice > r.default.gManager.currentCoin ? this.setBuyButton(!1) : this.setBuyButton(!0);
                        var t = r.default.gManager.currentSkinPrice;
                        this.updateSkinPriceLabel(t)
                    }
                }, e.prototype.setupBox = function(t) {
                    t ? (this.inUseTag.active = !0, this.button.active = !1) : (this.inUseTag.active = !1, this.button.active = !0)
                }, e.prototype.setBuyButton = function(t) {
                    this.button.getComponent(cc.Button).interactable = t
                }, e.prototype.buySkinCallback = function() {
                    this.button.getComponent(cc.Button).interactable && (r.default.gManager.playButtonTapSfx(), a.default.shopManager.replaceBox(this.skinIndex, this.node, this.node.getSiblingIndex(), this.boxType), r.default.gManager.buySkin(this.skinIndex))
                }, e.prototype.updateSkinPriceLabel = function(t) {
                    this.skinPriceLabel.string = t.toString()
                }, i([l(cc.Sprite)], e.prototype, "boxSprite", void 0), i([l([cc.SpriteFrame])], e.prototype, "boxSprites", void 0), i([l(cc.Node)], e.prototype, "inUseTag", void 0), i([l([cc.Node])], e.prototype, "fluffColors", void 0), i([l(cc.Node)], e.prototype, "button", void 0), i([l(Number)], e.prototype, "boxType", void 0), i([l(cc.Label)], e.prototype, "skinPriceLabel", void 0), e = i([c], e)
            }(cc.Component);
        o.default = u, cc._RF.pop()
    }, {
        "./GameManager": "GameManager",
        "./ShopManager": "ShopManager"
    }],
    ShopManager: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "83b91M9nk1H1YQPYHHwccb1", "ShopManager");
        var n = this && this.__extends || function() {
                var t = function(e, o) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                        })(e, o)
                };
                return function(e, o) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
                }
            }(),
            i = this && this.__decorate || function(t, e, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
                else
                    for (var s = t.length - 1; s >= 0; s--)(i = t[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(e, o, a) : i(e, o)) || a);
                return r > 3 && a && Object.defineProperty(e, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = t("./GameManager"),
            a = t("./PoolHelper"),
            s = t("./ShopBoxController"),
            c = cc._decorator,
            l = c.ccclass,
            u = c.property,
            p = cc.Class({
                name: "ColorSet",
                properties: {
                    color: [cc.Color]
                }
            }),
            h = function(t) {
                function e() {
                    var e = null !== t && t.apply(this, arguments) || this;
                    return e.scrollContentNode = null, e.skinOwnedTag = null, e.skinOwnedLabel = null, e.adsBoxPool = null, e.toBuyBoxPool = null, e.unselectedBoxPool = null, e.colorSet = [], e.currentSelectedBox = null, e.currentPreviewBox = null, e
                }
                var o;
                return n(e, t), o = e, e.prototype.onLoad = function() {
                    o.shopManager = this
                }, e.prototype.setShopContent = function() {
                    for (var t = 0; t < r.default.gManager.unownedSkinForAds.length; t++) {
                        var e = r.default.gManager.unownedSkinForAds[t];
                        (n = this.adsBoxPool.getObject(this.scrollContentNode).getComponent(s.default)).skinIndex = e;
                        for (var o = 0; o < n.fluffColors.length; o++) n.fluffColors[o].color = this.colorSet[e].color[o]
                    }
                    for (t = 0; t < r.default.gManager.ownedSkin.length; t++) {
                        e = r.default.gManager.ownedSkin[t];
                        var n = this.unselectedBoxPool.getObject(this.scrollContentNode).getComponent(s.default);
                        e == r.default.gManager.currentSkinIndex && (this.currentSelectedBox = n, this.setPreviewBox(n, !1), n.setupBox(!0)), n.skinIndex = e;
                        for (o = 0; o < n.fluffColors.length; o++) n.fluffColors[o].color = this.colorSet[e].color[o]
                    }
                    for (t = 0; t < r.default.gManager.unownedSkinToBuy.length; t++) {
                        e = r.default.gManager.unownedSkinToBuy[t];
                        (n = this.toBuyBoxPool.getObject(this.scrollContentNode).getComponent(s.default)).skinIndex = e;
                        for (o = 0; o < n.fluffColors.length; o++) n.fluffColors[o].color = this.colorSet[e].color[o]
                    }
                    this.scrollContentNode.height = 230 * this.scrollContentNode.childrenCount + 50
                }, e.prototype.clearShopContent = function() {
                    for (var t = this.scrollContentNode.childrenCount - 1; t >= 0; t--) {
                        var e = this.scrollContentNode.children[t];
                        switch (e.getComponent(s.default).boxType) {
                            case 0:
                            case 1:
                                this.unselectedBoxPool.returnObject(e);
                                break;
                            case 2:
                                this.adsBoxPool.returnObject(e);
                                break;
                            case 3:
                                this.toBuyBoxPool.returnObject(e)
                        }
                    }
                }, e.prototype.updateBuyBox = function(t, e) {
                    this.scrollContentNode.children.forEach(function(o) {
                        var n = o.getComponent(s.default);
                        3 == n.boxType && (n.setBuyButton(t), n.updateSkinPriceLabel(e))
                    })
                }, e.prototype.unselectPreviousBox = function(t) {
                    this.setPreviewBox(t, !0), this.currentSelectedBox.setupBox(!1), this.currentSelectedBox = t, t.setupBox(!0)
                }, e.prototype.replaceBox = function(t, e, o, n) {
                    2 == n ? this.adsBoxPool.returnObject(e) : 3 == n && this.toBuyBoxPool.returnObject(e);
                    var i = this.unselectedBoxPool.getObject(this.scrollContentNode);
                    i.setSiblingIndex(o);
                    var r = i.getComponent(s.default);
                    this.setPreviewBox(r, !1), this.currentSelectedBox.setupBox(!1), this.currentSelectedBox = r, r.setupBox(!0), r.skinIndex = t;
                    for (var a = 0; a < r.fluffColors.length; a++) r.fluffColors[a].color = this.colorSet[t].color[a]
                }, e.prototype.setPreviewBox = function(t, e) {
                    this.currentPreviewBox && (this.currentPreviewBox.boxSprite.spriteFrame = this.currentPreviewBox.boxSprites[0]), t.boxSprite.spriteFrame = t.boxSprites[1], this.currentPreviewBox = t, e && r.default.gManager.previewSkin(t.skinIndex)
                }, e.prototype.updateSkinOwned = function(t) {
                    this.skinOwnedLabel.string = "Owned: " + t + "/30"
                }, e.shopManager = null, i([u(cc.Node)], e.prototype, "scrollContentNode", void 0), i([u(cc.Node)], e.prototype, "skinOwnedTag", void 0), i([u(cc.Label)], e.prototype, "skinOwnedLabel", void 0), i([u(a.default)], e.prototype, "adsBoxPool", void 0), i([u(a.default)], e.prototype, "toBuyBoxPool", void 0), i([u(a.default)], e.prototype, "unselectedBoxPool", void 0), i([u([p])], e.prototype, "colorSet", void 0), e = o = i([l], e)
            }(cc.Component);
        o.default = h, cc._RF.pop()
    }, {
        "./GameManager": "GameManager",
        "./PoolHelper": "PoolHelper",
        "./ShopBoxController": "ShopBoxController"
    }],
    Utils: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "82f1feG4rVNOo0GoaJ2Ih+U", "Utils");
        var n = this && this.__extends || function() {
                var t = function(e, o) {
                    return (t = Object.setPrototypeOf || {
                            __proto__: []
                        }
                        instanceof Array && function(t, e) {
                            t.__proto__ = e
                        } || function(t, e) {
                            for (var o in e) e.hasOwnProperty(o) && (t[o] = e[o])
                        })(e, o)
                };
                return function(e, o) {
                    function n() {
                        this.constructor = e
                    }
                    t(e, o), e.prototype = null === o ? Object.create(o) : (n.prototype = o.prototype, new n)
                }
            }(),
            i = this && this.__decorate || function(t, e, o, n) {
                var i, r = arguments.length,
                    a = r < 3 ? e : null === n ? n = Object.getOwnPropertyDescriptor(e, o) : n;
                if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) a = Reflect.decorate(t, e, o, n);
                else
                    for (var s = t.length - 1; s >= 0; s--)(i = t[s]) && (a = (r < 3 ? i(a) : r > 3 ? i(e, o, a) : i(e, o)) || a);
                return r > 3 && a && Object.defineProperty(e, o, a), a
            };
        Object.defineProperty(o, "__esModule", {
            value: !0
        });
        var r = cc._decorator,
            a = r.ccclass,
            s = (r.property, function(t) {
                function e() {
                    return null !== t && t.apply(this, arguments) || this
                }
                return n(e, t), e.getDiagonalDistance = function(t, e) {
                    return Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(Math.abs(t.y - e.y), 2))
                }, e.getRandomInt = function(t, e) {
                    return void 0 === e && (e = 0), Math.floor(Math.random() * Math.floor(t)) + e
                }, e.getRandomFloat = function(t, e) {
                    return void 0 === e && (e = 0), Math.random() * Math.floor(t) + e
                }, e.shuffle = function(t) {
                    for (var e, o = t.length - 1; o > 0; o--) {
                        var n = Math.floor(Math.random() * (o + 1));
                        e = [t[n], t[o]], t[o] = e[0], t[n] = e[1]
                    }
                }, e.loadImageFromURL = function(t, e, o) {
                    void 0 === o && (o = null), cc.loader.load(e, function(e, n) {
                        if (!e) {
                            var i = new cc.SpriteFrame(n);
                            if (t.spriteFrame = i, o) {
                                var r = i.getOriginalSize(),
                                    a = 1;
                                (r.height > o.height || r.width > o.width) && (a = Math.max(o.height / r.height, o.width / r.width)), t.node.setContentSize(r.width * a, r.height * a)
                            }
                        }
                    })
                }, e = i([a], e)
            }(cc.Component));
        o.default = s, cc._RF.pop()
    }, {}],
    use_reversed_rotateBy: [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "a92c2JxsrBD25qMBCMnkGPe", "use_reversed_rotateBy"), cc.RotateBy._reverse = !0, cc._RF.pop()
    }, {}],
    "use_v2.1-2.2.1_cc.Toggle_event": [function(t, e, o) {
        "use strict";
        cc._RF.push(e, "7b40fGblCBCK7FTF8xXxict", "use_v2.1-2.2.1_cc.Toggle_event"), cc.Toggle && (cc.Toggle._triggerEventInScript_isChecked = !0), cc._RF.pop()
    }, {}]
}, {}, ["AbstractSDK", "GDSDKHandler", "ISDKHandler", "NetworkedNode", "SDKFunction", "BallCollider", "GameManager", "PoolHelper", "ShopBoxController", "ShopManager", "Utils", "use_reversed_rotateBy", "use_v2.1-2.2.1_cc.Toggle_event"]);