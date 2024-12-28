function updateTick() {
  deltaTime = .001 * MG.game.time.elapsed
}

function ClickIPhoneCloseButton() {
  history.back()
}

function SetPositonIPhoneCloseButton(t, e, i, a) {
  var s = document.getElementById("dvIPhoneClose");
  s.style.position = "absolute", s.style.top = e, s.style.left = t, s.style.transform = "translateX(" + i + ") translateY(" + a + ")"
}

function Data() {
  this.iVer = Define.SAVE_VER, this.isBGM = !0, this.isSfx = !0, this.bTuto = !1, this.iBestScore = 0, this.iHeart = 0, this.kSave = void 0
}

function ShowAD(t, e, i) {
  if (!0 === Matelmas.getAdroidWebviewCheck()) {
    var a = {
      gameId: Define.GIDX,
      type: t,
      action: e,
      test: !1,
      resultCallback: function(t) {
        switch (t) {
          case "S100":
          case "E001":
          default:
            i && i()
        }
      }
    };
    Matelmas.admob(a)
  } else i && i()
}

function NetworkManager() {
  this.device = "localTest", this.browser = "localTest", NetworkManager.prototype.checkDevice = function() {
    function t() {
      return null != navigator.userAgent.match(/Android/i)
    }

    function e() {
      return null != navigator.userAgent.match(/BlackBerry/i)
    }

    function i() {
      return null != navigator.userAgent.match(/iPhone|iPad|iPod/i)
    }

    function a() {
      return null != navigator.userAgent.match(/Opera Mini/i)
    }

    function s() {
      return null != navigator.userAgent.match(/IEMobile/i)
    }
    t() || e() || i() || a() || s() ? s() ? this.device = "m_window" : t() ? this.device = "android" : i() ? this.device = "iOS" : e() ? this.device = "blackberry" : a() ? this.device = "opera" : this.device = "unknown" : this.device = "desktop"
  }, NetworkManager.prototype.checkBrowser = function() {
    var t = window.navigator.userAgent;
    t.indexOf("MSIE") > 0 || t.indexOf("Trident") > 0 ? this.browser = "IE" : t.indexOf("Opera") > 0 || t.indexOf("OPR") > 0 ? this.browser = "Opera" : t.indexOf("Firefix") > 0 ? this.browser = "Firefox" : t.indexOf("Safari") > 0 ? t.indexOf("Chrome") > 0 ? this.browser = "Chrome" : this.browser = "Safari" : this.browser = "unknown"
  }, NetworkManager.prototype.getParam = function(t) {
    t = t.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var e = new RegExp("[\\?&]" + t + "=([^&#]*)").exec(location.search);
    return null === e ? "" : decodeURIComponent(e[1].replace(/%20/gi, "+").replace(/%2F/gi, "/"))
  }, NetworkManager.prototype.Init = function(t) {
    2 == Define.bLocalHost ? Define.user_id = this.getParam("user_id") : Define.user_id = "guest", this.cbInit = t, this.checkDevice(), this.checkBrowser(), this.GetUserInfo()
  }, NetworkManager.prototype.GetUserInfo = function() {
    networkManager.cbInit()
  }, NetworkManager.prototype.UI_Loading = function() {
    Phaser && (this.main = MG.game.add.group(), this.grp = MG.game.add.graphics(0, 0), this.grp.alpha = .5, this.grp.beginFill(0), this.grp.drawRect(0, 0, MG.iMSW, MG.iMSH), this.grp.endFill(), this.grp.inputEnabled = !0, this.main.addChild(this.grp), this.sprLoading = MG.AddSprite(this.main, MG.iCSX, MG.iCSY, Define.NETWORK_IMAGE_URL + "loading.png"), this.main.visible = !1)
  }, NetworkManager.prototype.showLoading = function() {
    void 0 !== this.main && (this.main.visible = !0, this.main.alpha = 0, MG.game.world.add(this.main), setTimeout(function() {
      1 == this.main.visible && (this.main.alpha = 1, this.sprTween = MG.game.add.tween(this.sprLoading).to({
        angle: 360
      }, 2e3, Phaser.Easing.Power0, !0, 0, -1, !1))
    }.bind(this), 1e3))
  }, NetworkManager.prototype.closeLoading = function() {
    void 0 !== this.sprLoading && (this.sprTween && this.sprTween.stop(), this.main.visible = !1)
  }, NetworkManager.prototype.getCwMemHeart = function(t) {
    if ("guest" == Define.user_id) {
      var e = {
        heart: Define.heart,
        success: !0
      };
      null != t && t(e)
    } else {
      var i = this,
        a = Matelmas.heartCountCall(Define.user_id);
      a.done(function(e) {
        1 == e.success ? null != t && t(e) : ("Network error", e.message + "\ndo you want to try again?", "retry", "cancel", function() {
          networkManager.getCwMemHeart(t)
        })
      }), a.fail(function() {
        i.closeLoading(), ("Network error(6)", "do you want to try again?", "retry", "cancel", function() {
          networkManager.getCwMemHeart(t)
        })
      })
    }
  }, NetworkManager.prototype.useCwMemHeart = function(t, e) {
    if ("guest" == Define.user_id) {
      Define.heart > 0 ? (Define.heart--, i = {
        result: Define.heart,
        success: !0
      }) : i = {
        result: Define.heart,
        success: !1
      }, null != e && e(i)
    } else {
      this.showLoading();
      var i = {
          tokenm: Define.user_id,
          gidx: Define.GIDX,
          gevent: t
        },
        a = $.post(Define.MOVI_URL + "/heart/use/", {
          cryptData: JSON.stringify(i)
        });
      a.done(function(i) {
        this.closeLoading(), 1 == i.success ? (void 0 != i.heart ? Define.heart = parseInt(i.heart) : Define.heart = parseInt(i.result), null != e && e(i)) : ("Network error", i.message + "\ndo you want to try again?", "retry", "cancel", function() {
          networkManager.useCwMemHeart(t, e)
        })
      }.bind(this)), a.fail(function() {
        this.closeLoading(), ("Network error", "do you want to try again?", "retry", "cancel", function() {
          networkManager.useCwMemHeart(t, e)
        })
      }.bind(this))
    }
  }, NetworkManager.prototype.AppDataGet = function(t, e, i) {
    if ("guest" == Define.user_id) {
      a = {};
      Define.heart = 9999, a.bindresult = void 0, e && e(a)
    } else {
      var a = {
          tokenm: Define.user_id,
          gidx: Define.GIDX
        },
        s = $.post(Define.MOVI_URL + "", {
          cryptData: JSON.stringify(a)
        });
      s.done(function(i) {
        1 == i.success ? (i.bindresult = 1, Define.heart = i.heart, 0 == i.save && (i.save = "{}"), e && e(i)) : ("network error", i.message + "\ndo you want to try again?", "retry", "cancel", function() {
          networkManager.AppDataGet(t, e)
        })
      }), s.fail(function(i) {
        ("etwork error", "do you want to try again?", "retry", "cancel", function() {
          networkManager.AppDataGet(t, e)
        })
      })
    }
  }, NetworkManager.prototype.AppDataPut = function(t, e, i) {
    if ("guest" == Define.user_id) e && e();
    else {
      var a = {
          tokenm: Define.user_id,
          gidx: Define.GIDX,
          save: t
        },
        s = $.post(Define.MOVI_URL + "/score/save/", {
          cryptData: JSON.stringify(a)
        });
      s.done(function(i) {
        1 == i.success ? e && e() : ("Network error", i.message + "\ndo you want to try again?", "retry", "cancel", function() {
          networkManager.AppDataPut(t, e)
        })
      }), s.fail(function(i) {
        ("Network error(6)", "do you want to try again?", "retry", "cancel", function() {
          networkManager.AppDataPut(t, e)
        })
      })
    }
  }, NetworkManager.prototype.RankingAdd = function(t, e, i) {
    if ("guest" == Define.user_id) e && e();
    else {
      var a = {
          tokenm: Define.user_id,
          gidx: Define.GIDX,
          score: t
        },
        s = $.post(Define.MOVI_URL + "/score/rank/", {
          cryptData: JSON.stringify(a)
        });
      s.done(function(t) {
        1 == t.success ? e && e() : ("Network error(7)", t.message + "\ndo you want to try again?", "retry", "cancel", function() {
          networkManager.AppDataPut(args, e)
        })
      }), s.fail(function(t) {
        ("Network error(8)", "do you want to try again?", "retry", "cancel", function() {
          networkManager.AppDataPut(args, e)
        })
      })
    }
  }, NetworkManager.prototype.ShowError = function(t, e, i) {
    Matelmas.alert(t, e, function() {
      history.back(), history.back()
    })
  }, NetworkManager.prototype.SendGamePlay = function(t, e) {
    return
  }
}

function ShowToast(t, e) {
  toastr.options = {
    closeButton: !1,
    debug: !1,
    newestOnTop: !1,
    progressBar: !1,
    positionClass: "toast-bottom-center",
    preventDuplicates: !1,
    onclick: null,
    showDuration: "300",
    hideDuration: "1000",
    timeOut: "4000",
    extendedTimeOut: "1000",
    showEasing: "swing",
    hideEasing: "linear",
    showMethod: "fadeIn",
    hideMethod: "fadeOut"
  };
  var i = parseFloat(MG.iMSW / window.innerWidth * 100);
  i *= .8, toastr[t](e).css("width", i + "%")
}

function Matelmas() {
  var t = Array.prototype.slice.call(arguments),
    e = t.pop(),
    i = t[0] && "string" == typeof t[0] ? t : t[0];
  if (!(this instanceof Matelmas)) return new Matelmas(i, e);
  if (!i || "*" === i || "*" === i[0]) {
    i = [];
    for (var a in Matelmas.Modules) Matelmas.modules.hasOwnProperty(a) && i.push(a)
  }
  for (var a = 0, s = i.length; a < s; a += 1) Matelmas.modules[i[a]](this);
  e(this), this.state = Enum.MOVI_STATE.PreLoader, this.game = null, this.resourcesManager = null, this._sound = null, this._bgm = null, this.firstPortrait = !1, this.firstLandScape = !1, this.callReSize = null, this.iMSW = 720, this.iMSH = 1280, this.iCSX = this.iMSW / 2, this.iCSY = this.iMSH / 2
}

function Boot() {}

function Preloader() {
  this.ready = !1, this.loadingText = null, this.sprLoad = null
}

function Game() {}

function cbGamePocketSdkrefresh(t) {
  networkManager.AppDataGet(void 0, function(t) {
    void 0 !== t.bindresult && (1 == t.bindresult && (t = JSON.parse(t.save)), void 0 === t.iVer ? networkManager.AppDataPut(kData) : kData = t), networkManager.getCwMemHeart(cbCwHeart)
  })
}

function cbCwHeart(t) {
  kData.iHeart = 0, t.success && (void 0 !== t.heart ? kData.iHeart = parseInt(t.heart) : void 0 !== t.result && (kData.iHeart = parseInt(t.result))), txtHeart && (txtHeart.text = "" + kData.iHeart)
}
Define = function() {}, Enum = function() {}, Enum.SERVICE_CODE = {
  MOVI_KR: 0,
  MOVI_JP: 1,
  YAHOO: 2,
  NAVER: 3
}, Enum.MOVI_STATE = {
  PreLoader: 0,
  Menu: 1,
  Game: 2
}, Enum.DEVICE_STATE = {
  PC: 0,
  IOS: 1,
  ANDROID: 2
}, Enum.LANGUAGE = {
  KR: 0,
  JP: 1,
  EN: 2
}, Define.staticWidth = window.innerWidth, Define.staticHeight = window.innerHeight, Define.GIDX = 32, Define.txtVer = "", Define.SAVE_VER = 1, Define.IMG_VER = 1, Define.SND_VER = 1, Define.SPINE_VER = 1, Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR, Define.strGamePath = "", Define.DEVICE = Enum.DEVICE_STATE.PC, Define.LANGUAGE = Enum.LANGUAGE.KR, Define.NETWORK_IMAGE_URL = "", Define.bLocalHost = -1 !== document.location.href.indexOf("localhost");
var deltaTime = 0,
  ga = function() {},
  kData = new Data;
Phaser.Text.prototype.ReSize = function(t, e, i) {
  void 0 != t && (this.text = t), this.scale.set(1), this.width > e && (void 0 === i ? this.scale.set(e / this.width) : e / this.width <= i / this.height && this.scale.set(e / this.width)), void 0 != i && this.height > i && e / this.width > i / this.height && this.scale.set(i / this.height)
}, Phaser.Text.prototype.ChangeTextColor = function() {
  for (var t = 0; t < this.text.length; ++t)
    if ("[" == this.text[t])
      if ("]" == this.text[t + 7]) {
        var e = this.text.slice(0, t + 8).split(/(?:\r\n|\r|\n)/).length - 1,
          i = "#" + this.text.slice(t + 1, t + 7);
        this.text = this.text.replace(this.text.slice(t, t + 8), ""), this.addColor(i, t - e)
      } else if ("-" == this._text[t + 1]) {
    e = this.text.slice(0, t + 3).split(/(?:\r\n|\r|\n)/).length - 1;
    this.text = this.text.replace(this.text.slice(t, t + 3), ""), this.addColor("#" + this.tint.toString(16), t - e)
  }
}, Array.prototype.Mix = function(t) {
  for (var e, i, a, s = this.length, n = 0; n < t; ++n) i = Random.Range(0, s), a = Random.Range(0, s), e = this[i], this[i] = this[a], this[a] = e
}, Number.prototype.ToString = function(t) {
  switch (void 0 != t && (t = t.toLowerCase()), t) {
    case "n0":
      return this.toString().replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    case "d2":
      var e = "",
        i = Math.floor(this).toString();
      if (i.length < 2)
        for (var a = 0; a < 2 - i.length; a++) e += "0";
      return e + i;
    case "f1":
      return this.toFixed(1);
    case "f2":
      return this.toFixed(2);
    default:
      return this.toString()
  }
}, String.prototype.ToString = function(t) {
  switch (void 0 != t && (t = t.toLowerCase()), t) {
    case "n0":
      return this.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    case "d2":
      var e = "",
        i = this;
      if (i.length < 2)
        for (var a = 0; a < 2 - i.length; a++) e += "0";
      return e + i;
    default:
      return this
  }
};
var string = function() {};
string.Format || (string.Format = function(t) {
  var e = Array.prototype.slice.call(arguments, 1);
  return t.replace(/{(\d+)}/g, function(t, i) {
    return void 0 !== e[i] ? e[i] : t
  })
});
var Random = function() {};
Random.Range || (Random.Range = function(t, e) {
  return MG.game.rnd.integerInRange(t, e - 1)
}, Random.RangeFloat = function(t, e) {
  return MG.game.rnd.realInRange(t, e - 1e-5)
}), Define.LANDSCAPE = !1, window.onload = function() {
  var t, e = window[""];
  (t = !0 === Define.LANDSCAPE ? new Phaser.Game(1280, 720, Phaser.AUTO, "game") : new Phaser.Game(720, 1280, Phaser.AUTO, "game")).state.add("boot", e.Boot), t.state.add("preloader", e.Preloader), t.state.add("game", e.Game), t.state.start("boot")
}, ResourcesManager = function(t) {
  this.game = t
}, ResourcesManager.prototype = {
  preload: function() {},
  create: function() {},
  update: function() {},
  loader: function(t) {
    var e = t;
    for (var i in e) e[i].forEach(function(t) {
      var e = this.game.load[i];
      e && e.apply(this.game.load, t)
    }, this)
  }
}, ResourcesManager.MoviLoad = {
  image: [
    ["pop.png", "assets/atlas/load/pop.png?v=" + Define.IMG_VER],
    ["movi.png", "assets/atlas/load/movi.png?v=" + Define.IMG_VER]
  ]
}, ResourcesManager.Preloader = {
  image: [
    ["TBG", "assets/img/TBG.jpg?v=" + Define.IMG_VER],
    ["but_bar.jpg", "assets/img/but_bar.jpg?v=" + Define.IMG_VER],
    ["SB_bg.jpg", "assets/img/SB_bg.jpg?v=" + Define.IMG_VER],
    ["top_bar.jpg", "assets/img/top_bar.jpg?v=" + Define.IMG_VER],
    ["loading.png", "assets/img/loading.png?v=" + Define.IMG_VER],
    ["howto", "assets/img/howto.jpg?v=" + Define.IMG_VER]
  ],
  atlas: [
    ["atlas-0", "assets/atlas/atlas-0.png?v=" + Define.IMG_VER, "assets/atlas/atlas-0.json?v=" + Define.IMG_VER, Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY]
  ],
  spine: [
    ["sp_heart", "assets/spine/heart.json?v=" + Define.IMG_VER]
  ],
  audio: [
    ["BGM_Main", ["assets/sound/BGM_Main.mp3?v=" + Define.SND_VER, "assets/sound/BGM_Main.ogg?v=" + Define.SND_VER], "bgm"],
    ["SE_button", ["assets/sound/SE_button.mp3?v=" + Define.SND_VER, "assets/sound/SE_button.ogg?v=" + Define.SND_VER]],
    ["SE_GetBall", ["assets/sound/SE_GetBall.mp3?v=" + Define.SND_VER, "assets/sound/SE_GetBall.ogg?v=" + Define.SND_VER]],
    ["SE_moreblock", ["assets/sound/SE_moreblock.mp3?v=" + Define.SND_VER, "assets/sound/SE_moreblock.ogg?v=" + Define.SND_VER]],
    ["block", ["assets/sound/block.mp3?v=" + Define.SND_VER, "assets/sound/block.ogg?v=" + Define.SND_VER]],
    ["bloken", ["assets/sound/bloken.mp3?v=" + Define.SND_VER, "assets/sound/bloken.ogg?v=" + Define.SND_VER]],
    ["shoot", ["assets/sound/shoot.mp3?v=" + Define.SND_VER, "assets/sound/shoot.ogg?v=" + Define.SND_VER]]
  ]
}, window[""] = window[""] || {}, window[""].ResourcesManager = ResourcesManager, Define.TEST_URL = "", Define.REAL_URL = "", Define.MOVI_URL = Define.REAL_URL;
var networkManager = new NetworkManager;
Matelmas.prototype = {
  Initialize: function(t) {
    /Android/i.test(navigator.userAgent) ? Define.DEVICE = Enum.DEVICE_STATE.ANDROID : /iPhone|iPad|iPod/i.test(navigator.userAgent) ? Define.DEVICE = Enum.DEVICE_STATE.IOS : Define.DEVICE = Enum.DEVICE_STATE.PC, document.location.href.indexOf("Matelmas.jp") > -1 ? Define.SERVICE = Enum.SERVICE_CODE.MOVI_JP : document.location.href.indexOf("yahoo-net.jp") > -1 ? Define.SERVICE = Enum.SERVICE_CODE.YAHOO : document.location.href.indexOf("naver.com") > -1 ? Define.SERVICE = Enum.SERVICE_CODE.NAVER : Define.SERVICE = Enum.SERVICE_CODE.MOVI_KR, this.game = t, this.game.plugins.add(PhaserSpine.SpinePlugin), this.resourcesManager = t.plugins.add(ResourcesManager), this.initScreenSize()
  },
  initScreenSize: function() {
    var t = this;
    this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL, this.game.pageAlignHorizontally = !1, this.game.pageAlignVertically = !1, this.game.scale.parentIsWindow = !0, window.addEventListener("resize", function() {
      t.reScreenSize()
    }), this.game.scale.setShowAll(), this.reScreenSize()
  },
  reScreenSize: function() {
    var t = window.innerWidth * MG.iMSH / (window.innerHeight * MG.iMSW);
    this.game.scale.scaleMode = t >= .9 && t <= 1.1 ? Phaser.ScaleManager.EXACT_FIT : Phaser.ScaleManager.SHOW_ALL, this.game.scale.refresh()
  }
}, Matelmas.modules = {
  utils: function(t) {
    t.Init = function() {}, t.GetSecondsToTimeString = function(t) {
      var e = Math.floor(t / 60),
        i = Math.floor(t % 60);
      return (e >= 10 ? e.toString() : "0" + e) + ":" + (i >= 10 ? i.toString() : "0" + i)
    }, t.AddSprite = function(t, e, i, a, s, n, o, r, l, h, d) {
      var g = this.game.add.sprite(e, i, a, s);
      return void 0 != n && (g.tint = n), void 0 != o && (g.alpha = o), g.anchor.x = void 0 == r ? .5 : r, g.anchor.y = void 0 == l ? .5 : l, void 0 != h && (g.width = h), void 0 != d && (g.height = d), t.addChild(g), g
    }, t.AddSpriteNine = function(t, e, i, a, s, n, o, r, l, h, d) {
      var g = new PhaserNineSlice.NineSlice(MG.game, e, i, a, s, n, o, r);
      return g.anchor.x = void 0 == l ? .5 : l, g.anchor.y = void 0 == h ? .5 : h, void 0 != d && (g.tint = d), t.addChild(g), g
    }, t.AddText = function(t, e, i, a, s, n, o) {
      return (a = MG.game.add.text(e, i, a, s)).anchor.x = void 0 == n ? .5 : n, a.anchor.y = void 0 == o ? .5 : o, t.addChild(a), a
    }, t.AddBitmapText = function(t, e, i, a, s, n, o, r) {
      return (s = MG.game.add.bitmapText(e, i, a, s, n, t)).anchor.x = void 0 == o ? .5 : o, s.anchor.y = void 0 == r ? .5 : r, t.addChild(s), s
    }
  },
  audio: function(t) {
    t.Init = function() {}, t.AudioInit = function() {
      this.game.device.android && this.game.device.chrome && this.game.device.chromeVersion >= 55 && (this.game.sound.setTouchLock(), this.game.input.touch.addTouchLockCallback(function() {
        if (this.noAudio || null !== this._unlockSource) return !0;
        if (this.usingWebAudio) {
          var t = this.context.createBuffer(1, 1, 22050);
          this._unlockSource = this.context.createBufferSource(), this._unlockSource.buffer = t, this._unlockSource.connect(this.context.destination), void 0 === this._unlockSource.start ? this._unlockSource.noteOn(0) : this._unlockSource.start(0), "suspended" === this._unlockSource.context.state && this._unlockSource.context.resume()
        }
        return !0
      }, this.game.sound, !0)), this._sound = [], this._bgm = [], ResourcesManager.Preloader.audio.forEach(function(t) {
        "bgm" === t[2] ? this._bgm[t[0]] = this.game.add.audio(t[0], 1, !0) : this._sound[t[0]] = this.game.add.audio(t[0])
      }, this)
    }, t.AudioSwitch = function(t) {
      kData.isSfx = !t, kData.isBGM = !t
    }, t.PlayAudio = function(t) {
      kData.isSfx && this._sound && this._sound[t] && this._sound[t].play()
    }, t.StopAudio = function(t) {
      this._sound[t].stop()
    }, t.PlayBgm = function(t, e) {
      kData.isBGM && this._bgm && this._bgm[t] && (void 0 === e && (e = !1), this._bgm[t].play("", 0, 1, e))
    }, t.StopBgm = function(t) {
      this._bgm[t].stop()
    }, t.PauseBgm = function(t) {
      this._bgm[t].pause()
    }, t.ResumeBgm = function(t) {
      this._bgm[t].resume()
    }, t.isPlayingBgm = function(t) {
      return this._bgm[t].isPlaying
    }
  }
}, window[""] = window[""] || {}, window[""].Matelmas = Matelmas;
var MG = Matelmas("utils", "audio", function() {});
Boot.prototype = {
  preload: function() {
    MG.Initialize(this.game), MG.resourcesManager.loader(ResourcesManager.MoviLoad)
  },
  create: function() {
    this.game.state.start("preloader")
  }
}, window[""] = window[""] || {}, window[""].Boot = Boot, Preloader.prototype = {
  preload: function() {
    var t = this.game.world.centerX;
    this.stage.backgroundColor = "#ffcc3c", this.sprLoad = [], this.sprLoad[0] = this.add.graphics(t, 520), this.sprLoad[0].beginFill(15198960), this.sprLoad[0].arc(0, 0, 250, 0, 2 * Math.PI), this.sprLoad[0].endFill(), this.sprLoad[1] = this.add.graphics(t, 520), this.sprLoad[1].beginFill(16675380), this.sprLoad[1].arc(0, 0, 250, MG.game.math.degToRad(-90), MG.game.math.degToRad(270), !0, 360), this.sprLoad[1].endFill(), this.sprLoad[2] = this.add.sprite(t, 520, "pop.png"), this.sprLoad[2].anchor.setTo(.5, .5), this.sprLoad[3] = this.add.sprite(t, 836, "movi.png"), this.sprLoad[3].anchor.setTo(.5, .5), this.loadingText = this.add.text(t, 675, "0%", {
      font: "32px Arial",
      fill: "#636363",
      align: "center"
    }), this.loadingText.anchor.setTo(.5, .5), this.load.onFileComplete.add(this.onFileComplete, this), this.load.onLoadComplete.add(this.onLoadComplete, this), MG.resourcesManager.loader(ResourcesManager.Preloader)
  },
  onFileComplete: function(t, e, i, a, s) {
    this.sprLoad[1].beginFill(16675380), this.sprLoad[1].arc(0, 0, 250, this.math.degToRad(-90), this.math.degToRad(270 - 3.59999 * t), !0, 360), this.sprLoad[1].endFill(), this.loadingText.setText(t + "%")
  },
  onLoadComplete: function() {
    MG.AudioInit(), setTimeout(function() {
      this.game.state.start("game"), this.destroy()
    }.bind(this), 500)
  },
  destroy: function() {
    this.sprLoad.forEach(function(t) {
      t.destroy()
    }), this.loadingText.destroy()
  }
}, window[""] = window[""] || {}, window[""].Preloader = Preloader;
var map = [],
  ball = [],
  STATE_TITLE = 0,
  STATE_GAME = 1,
  STATE_GAME_OVER = 2,
  gameOptions = {
    scorePanelHeight: .1,
    launchPanelHeight: .1,
    ballSize: .03,
    ballSpeed: 1500,
    blocksPerLine: 9,
    minBlockPerLine: 4,
    maxBlocksPerLine: 4,
    minExtraBallProbability: 56,
    maxExtraBallProbability: 60
  };
$(document).ready(function() {
  networkManager.Init(cbGamePocketSdkrefresh)
});
var txtHeart = void 0;
Game.prototype = {
  init: function() {},
  preload: function() {
    this.gGame = this.game.add.group(), this.gGame.visible = !1, this.gTitle = this.game.add.group(), this.state = STATE_TITLE, this.iScore = 0, this.bComboOn = !1
  },
  create: function() {
    var t = MG.AddSprite(this.gTitle, MG.iCSX, MG.iCSY, "TBG");
    t.inputEnabled = !0, this.gHeart = MG.game.add.group(), MG.AddSpriteNine(this.gHeart, MG.iCSX - 180, MG.iCSY - 570, "atlas-0", "heart-bg.png", 260, 85, {
      top: 42,
      bottom: 42,
      left: 50,
      right: 50
    }), MG.AddSprite(this.gHeart, MG.iCSX - 260, MG.iCSY - 570, "atlas-0", "heart-00.png"), (t = MG.AddSprite(this.gHeart, MG.iCSX - 95, MG.iCSY - 570 + 2, "atlas-0", "heart-add.png")).inputEnabled = !0, t.events.onInputDown.add(function() {
      MG.PlayAudio("SE_button"), "guest" != Define.user_id ? Matelmas.heartChargePageCall(Define.user_id, function() {
        networkManager.getCwMemHeart(cbCwHeart)
      }) : Matelmas.alertLogin()
    }), txtHeart = MG.AddText(this.gHeart, MG.iCSX - 180, MG.iCSY - 570 + 5, kData.iHeart.ToString("n0"), {
      font: "bold 40px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 4
    }), this.sp_heart = MG.game.add.spine(100, 100, "sp_heart"), this.sp_heart.state.onComplete = function(t, e) {
      switch (t) {
        case 1:
          this.cbButtonGameStart();
          break;
        case 2:
          this.grpFade.visible = !0, this.grpFade.inputEnabled = !0, this.grpFade.alpha = 0, MG.game.add.tween(this.grpFade).to({
            alpha: 1
          }, 500, Phaser.Easing.Power0, !0, 0, 0, !1).onComplete.add(function() {
            this.grpFade.inputEnabled = !1, this.gGameOver.visible = !1, this.gOption.visible = !1, this.cbButtonGameStart(), MG.game.add.tween(this.grpFade).to({
              alpha: 0
            }, 500, Phaser.Easing.Power0, !0, 0, 0, !1).onComplete.add(function() {
              this.grpFade.visible = !1
            }.bind(this))
          }.bind(this))
      }
      this.sp_heart.visible = !1
    }.bind(this), this.sp_heart.visible = !1, this.gTitle.addChild(this.gHeart), MG.AddSprite(this.gTitle, MG.iCSX + 270, MG.iCSY - 550, "atlas-0", "all.png"), this.btnStart = MG.AddSprite(this.gTitle, MG.iCSX, MG.iCSY + 320, "atlas-0", "start_btn.png"), this.btnStart.inputEnabled = !0, this.btnStart.events.onInputDown.add(function() {
      MG.PlayAudio("SE_button"), kData.iHeart <= 0 ? Matelmas.alert("", "", function() {
        "guest" != Define.user_id ? Matelmas.heartChargePageCall(Define.user_id, function() {
          networkManager.getCwMemHeart(cbCwHeart)
        }) : Matelmas.alertLogin()
      }.bind(this)) : (this.btnStart.inputEnabled = !1, Math.random() < .3 && ShowAD(0, "start"), networkManager.useCwMemHeart("start", function(t) {
        MG.game.world.add(this.sp_heart), this.sp_heart.visible = !0, this.sp_heart.position.set(MG.iCSX, MG.iCSY + 320), this.sp_heart.addAnimationByName(1, "heart_out", !1), cbCwHeart(t)
      }.bind(this)))
    }, this), MG.AddSprite(this.btnStart, 0, -110, "atlas-0", "play_H.png"), this.sprSoundTitle = MG.AddSprite(this.gTitle, MG.iCSX, MG.iCSY + 500, "atlas-0", "sou_on.png"), this.sprSoundTitle.scale.set(1.3), this.sprSoundTitle.inputEnabled = !0, this.sprSoundTitle.events.onInputDown.add(this.cbButtonSound, this), 1 == kData.isSfx ? this.sprSoundTitle.loadTexture("atlas-0", "sound_on_btn.png") : this.sprSoundTitle.loadTexture("atlas-0", "sound_off_btn.png"), MG.AddText(this.gTitle, MG.iCSX, MG.iMSH - 30, "BLOCK VS BALL", {
      font: "bold 20px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 4
    }, .5, 1), MG.AddText(this.gTitle, MG.iMSW - 10, MG.iMSH - 10, Define.txtVer, {
      font: "13px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 4
    }, 1, .5), this.sprHelp = MG.AddSprite(MG.game.world, MG.iCSX, MG.iCSY, "howto"), this.sprHelp.inputEnabled = !0, this.sprHelp.events.onInputDown.add(function() {
      switch (MG.PlayAudio("SE_button"), this.sprHelp.state) {
        case 0:
          this.cbButtonGameStart()
      }
      this.sprHelp.visible = !1
    }, this), this.sprHelp.visible = !1, MG.AddSprite(this.gGame, MG.iCSX, MG.iCSY, "SB_bg.jpg"), this.game.physics.startSystem(Phaser.Physics.ARCADE), this.blockGroup = this.game.add.group(), this.extraBallGroup = this.game.add.group(), this.ballsToBeAddedGroup = this.game.add.group(), this.ballsGroup = this.game.add.group(), this.fallingGroup = this.game.add.group(), this.fallingGroup.add(this.blockGroup), this.fallingGroup.add(this.extraBallGroup), this.gGame.addChild(this.ballsToBeAddedGroup), this.gGame.addChild(this.ballsGroup), this.gGame.addChild(this.fallingGroup), this.scorePanel = MG.AddSprite(this.gGame, MG.iCSX, 0, "top_bar.jpg", void 0, void 0, 1, .5, 0), this.game.physics.enable(this.scorePanel, Phaser.Physics.ARCADE), this.scorePanel.body.immovable = !0, this.txtBestScore = MG.AddText(this.gGame, MG.iCSX, MG.iCSY - 600, kData.iBestScore.ToString("n0"), {
      font: "bold 30px Arial",
      fill: "#ffe300",
      align: "center",
      stroke: "#000000",
      strokeThickness: 5
    }), this.sprBestScoreIcon = MG.AddSprite(this.txtBestScore, -this.txtBestScore.width / 2 - 20, -5, "atlas-0", "best-icon.png"), this.txtScore = MG.AddText(this.gGame, MG.iCSX, MG.iCSY - 545, this.iScore.ToString("n0"), {
      font: "bold 50px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 5
    }), this.launchPanel = MG.AddSprite(this.gGame, MG.iCSX, MG.iMSH, "but_bar.jpg", void 0, void 0, 1, .5, 1), this.game.physics.enable(this.launchPanel, Phaser.Physics.ARCADE), this.launchPanel.body.immovable = !0, this.txtBallsCnt = MG.AddText(this.gGame, MG.iCSX - 280, MG.iCSY + 610, "x0", {
      font: "bold 35px Arial",
      fill: "#ffffff",
      align: "center",
      stroke: "#000000",
      strokeThickness: 5
    });
    var e = this.game.width * gameOptions.ballSize;
    this.addBall(this.game.width / 2, this.game.height - this.launchPanel.height - e / 2), this.trajectory = this.game.add.sprite(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y, "atlas-0", "trajectory.png"), this.trajectory.anchor.set(.5, 1), this.trajectory.visible = !1, this.gGame.addChild(this.trajectory), this.ufo = MG.AddSprite(this.gGame, this.ballsGroup.getChildAt(0).x - 1, this.ballsGroup.getChildAt(0).y + 7, "atlas-0", "ufo.png"), this.gGame.addChild(this.ballsGroup);
    var i = MG.game.add.graphics(0, 0);
    i.beginFill(10486003), i.drawRect(0, 0, MG.iMSW, MG.iMSH), i.endFill(), i.alpha = 0, i.inputEnabled = !0, i.events.onInputDown.add(this.aimBall, this), i.events.onInputUp.add(this.shootBall, this), this.gGame.addChild(i), this.game.input.addMoveCallback(this.adjustBall, this), this.aiming = !1, this.shooting = !1, this.level = 0, this.extraBalls = 0, this.moreBalls = 0, this.fSaveTime = 0;
    var a = MG.AddSprite(this.gGame, MG.iCSX - 260, MG.iCSY - 590, "", "");
    a.inputEnabled = !0, a.events.onInputDown.add(function() {
      if (MG.PlayAudio("SE_button"), "guest" == Define.user_id) ShowToast("warning", "");
      else if (this.fSaveTime <= 0) {
        kData.kSave = {}, kData.kSave.iScore = this.iScore, kData.kSave.level = this.level, kData.kSave.extraBalls = this.extraBalls, kData.kSave.maxBlocksPerLine = gameOptions.maxBlocksPerLine, kData.kSave.blockGroup = [];
        for (t = 0; t < this.blockGroup.length; ++t) kData.kSave.blockGroup[t] = {}, kData.kSave.blockGroup[t].x = this.blockGroup.getChildAt(t).x, kData.kSave.blockGroup[t].y = this.blockGroup.getChildAt(t).y, kData.kSave.blockGroup[t].row = this.blockGroup.getChildAt(t).row, kData.kSave.blockGroup[t].value = this.blockGroup.getChildAt(t).value;
        kData.kSave.extraBallGroup = [];
        for (var t = 0; t < this.extraBallGroup.length; ++t) kData.kSave.extraBallGroup[t] = {}, kData.kSave.extraBallGroup[t].x = this.extraBallGroup.getChildAt(t).x, kData.kSave.extraBallGroup[t].y = this.extraBallGroup.getChildAt(t).y, kData.kSave.extraBallGroup[t].row = this.extraBallGroup.getChildAt(t).row;
        networkManager.AppDataPut(kData, function() {
          this.fSaveTime = 300, ShowToast("success", "세이브가 되었습니다.")
        }.bind(this))
      } else ShowToast("warning", Math.floor(this.fSaveTime + 1) + "초 후에 세이브가 가능합니다.")
    }, this), (a = MG.AddSprite(this.gGame, MG.iCSX + 260, MG.iCSY + 590, "atlas-0", "more_btn.png")).inputEnabled = !0, this.moreBallsScrollTween = void 0, a.events.onInputDown.add(function() {
      if (MG.PlayAudio("SE_moreblock"), 1 == this.shooting) {
        for (var t = this.game.height - this.launchPanel.height - this.game.width * gameOptions.ballSize / 2, e = 0; e < this.ballsGroup.length; ++e) {
          var i = this.ballsGroup.getChildAt(e);
          0 == i.body.velocity.x && 0 == i.body.velocity.y || (i.body.velocity.set(.1), this.game.add.tween(i).to({
            y: t
          }, 100, Phaser.Easing.Linear.None, !0).onComplete.add(function(t) {
            t.bCollider = !0
          }))
        }
        this.game.time.events.remove(this.fireLoop), this.moreBalls = this.extraBalls - (this.ballsFired - 1)
      } else void 0 == this.moreBallsScrollTween && (this.moreBallsScrollTween = this.game.add.tween(this.fallingGroup).to({
        y: this.fallingGroup.y + this.game.width / gameOptions.blocksPerLine
      }, 200, Phaser.Easing.Linear.None, !0), this.moreBallsScrollTween.onComplete.add(function() {
        this.moreBallsScrollTween = void 0, this.shooting = !1, this.fallingGroup.y = 0;
        for (var t = 0; t < this.blockGroup.length; ++t) {
          var e = this.blockGroup.getChildAt(t);
          switch (e.y += this.game.width / gameOptions.blocksPerLine, e.row++, 12 == e.row && 0 == this.gGameOver.visible && (this.gGameOver.visible = !0, this.gGameOver.addChild(this.gHeart), this.txtResultScore.text = this.iScore.ToString("n0"), this.state = STATE_GAME_OVER, this.bViewToast = !1, void 0 != kData.kSave && (kData.kSave = void 0, this.bViewToast = !0), networkManager.AppDataPut(kData, function() {
            1 == this.bViewToast && (this.fSaveTime = 0, ShowToast("error", "세이브데이터가 삭제 되었습니다.")), networkManager.RankingAdd(kData.iBestScore, function() {
              Math.random() < .3 && ShowAD(0, "result")
            })
          }.bind(this))), Math.floor((e.value - 1) / (this.level / 4))) {
            case 0:
              e.loadTexture("atlas-0", "b_10.png");
              break;
            case 1:
              e.loadTexture("atlas-0", "b_20.png");
              break;
            case 2:
              e.loadTexture("atlas-0", "b_30.png");
              break;
            default:
              e.loadTexture("atlas-0", "b_40.png")
          }
        }
        this.extraBallGroup.forEach(function(t) {
          t.y += this.game.width / gameOptions.blocksPerLine, t.row++, 12 == t.row && t.destroy()
        }, this), this.addLine()
      }, this))
    }, this), (t = MG.AddSprite(this.gGame, MG.iCSX + 225, MG.iCSY - 590, "atlas-0", "info.png")).inputEnabled = !0, t.events.onInputDown.add(function() {
      MG.PlayAudio("SE_button"), this.sprHelp.state = 1, this.sprHelp.visible = !0, MG.game.world.addChild(this.sprHelp)
    }, this), (a = MG.AddSprite(this.gGame, MG.iCSX + 300, MG.iCSY - 590, "atlas-0", "menu.png")).inputEnabled = !0, a.events.onInputDown.add(function() {
      MG.PlayAudio("SE_button"), this.gOption.visible = !0, this.gOption.addChild(this.gHeart)
    }, this), this.gGameOver = this.game.add.group();
    var s = MG.AddSprite(this.gGameOver, MG.iCSX, MG.iCSY, "atlas-0", "white.png", 0, .5, .5, .5, MG.iMSW, MG.iMSH);
    s.inputEnabled = !0, s = MG.AddSpriteNine(this.gGameOver, MG.iCSX, MG.iCSY, "atlas-0", "popup.png", 500, 440, {
      top: 80,
      bottom: 80,
      left: 90,
      right: 90
    }), MG.AddSprite(s, 0, -150, "atlas-0", "score.png"), this.txtResultScore = MG.AddText(s, 0, -40, "0", {
      font: "bold 60px Arial",
      fill: "#ffffff",
      align: "center"
    }), this.sprNew = MG.AddSprite(s, -233, -90, "atlas-0", "new.png"), this.sprNew.tween = this.game.add.tween(this.sprNew).to({
      alpha: 0
    }, 600, Phaser.Easing.Power3, !0, 0, -1, !0), this.sprNew.visible = !1, this.btnRetry = MG.AddSprite(s, -100, 100, "atlas-0", "Retry.png"), this.btnRetry.inputEnabled = !0, this.btnRetry.events.onInputDown.add(function() {
      this.cbButtonRetry(0)
    }, this);
    var n = MG.AddSprite(s, 100, 100, "atlas-0", "Home.png");
    n.inputEnabled = !0, n.events.onInputDown.add(this.cbButtonHome, this), this.fGameOverTimeDelay = .5, this.gGame.addChild(this.gGameOver), this.gGameOver.visible = !1, this.gOption = this.game.add.group(), (s = MG.AddSprite(this.gOption, MG.iCSX, MG.iCSY, "atlas-0", "white.png", 0, .7, .5, .5, MG.iMSW, MG.iMSH)).inputEnabled = !0, s = MG.AddSpriteNine(this.gOption, MG.iCSX, MG.iCSY, "atlas-0", "popup.png", 600, 350, {
      top: 80,
      bottom: 80,
      left: 90,
      right: 90
    }), MG.AddSprite(s, 0, -100, "atlas-0", "option.png"), this.btnRetry1 = MG.AddSprite(s, -170, 30, "atlas-0", "Retry.png"), this.btnRetry1.inputEnabled = !0, this.btnRetry1.events.onInputDown.add(function() {
      this.cbButtonRetry(1)
    }, this), (n = MG.AddSprite(s, 0, 30, "atlas-0", "Home.png")).inputEnabled = !0, n.events.onInputDown.add(this.cbButtonHome, this), this.sprSound = MG.AddSprite(s, 170, 30, "atlas-0", "sou_on.png"), this.sprSound.inputEnabled = !0, this.sprSound.events.onInputDown.add(this.cbButtonSound, this), 1 == kData.isSfx ? this.sprSound.loadTexture("atlas-0", "sou_on.png") : this.sprSound.loadTexture("atlas-0", "sou_off.png"), (t = MG.AddSprite(s, 235, -110, "atlas-0", "exit.png")).inputEnabled = !0, t.events.onInputDown.add(function() {
      MG.PlayAudio("SE_button"), this.gOption.visible = !1
    }, this), this.gGame.addChild(this.gOption), this.gOption.visible = !1, this.grpFade = MG.game.add.graphics(0, 0), this.grpFade.alpha = 0, this.grpFade.beginFill(0), this.grpFade.drawRect(0, 0, MG.iMSW, MG.iMSH), this.grpFade.endFill(), this.grpFade.inputEnabled = !0, this.grpFade.visible = !1, MG.PlayBgm("BGM_Main", !0), MG._bgm.BGM_Main.volume = .5, networkManager.UI_Loading()
  },
  cbButtonSound: function() {
    0 == kData.isSfx ? (MG.AudioSwitch(kData.isSfx), 1 == MG._bgm.BGM_Main.paused ? MG.ResumeBgm("BGM_Main") : (MG.PlayBgm("BGM_Main", !0), MG._bgm.BGM_Main.volume = .5), MG.PlayAudio("SE_button"), this.sprSound.loadTexture("atlas-0", "sou_on.png"), this.sprSoundTitle.loadTexture("atlas-0", "sound_on_btn.png")) : (MG.PlayAudio("SE_button"), MG.PauseBgm("BGM_Main"), MG.AudioSwitch(kData.isSfx), this.sprSound.loadTexture("atlas-0", "sou_off.png"), this.sprSoundTitle.loadTexture("atlas-0", "sound_off_btn.png")), networkManager.AppDataPut(kData)
  },
  cbButtonGameStart: function() {
    if (0 == kData.bTuto) return this.sprHelp.state = 0, this.sprHelp.visible = !0, MG.game.world.addChild(this.sprHelp), kData.bTuto = !0, void networkManager.AppDataPut(kData);
    this.btnStart.inputEnabled = !0, this.btnRetry.inputEnabled = !0, this.btnRetry1.inputEnabled = !0, this.gTitle.visible = !1, this.gGame.visible = !0, this.sprNew.visible = !1, this.blockGroup.removeAll(), this.ballsGroup.removeAll(), this.extraBallGroup.removeAll(), this.ballsToBeAddedGroup.removeAll();
    var t = this.game.width * gameOptions.ballSize;
    if (this.addBall(this.game.width / 2, this.game.height - this.launchPanel.height - t / 2), void 0 == kData.kSave) this.iScore = 0, this.level = 0, this.extraBalls = 0, this.addLine(), void 0 != kData.kSave && (kData.kSave = void 0, networkManager.AppDataPut(kData, function() {
      this.fSaveTime = 0, ShowToast("error", "세이브데이터가 삭제 되었습니다.")
    }.bind(this)));
    else {
      this.iScore = kData.kSave.iScore, this.level = kData.kSave.level, this.extraBalls = kData.kSave.extraBalls, gameOptions.maxBlocksPerLine = kData.kSave.maxBlocksPerLine;
      for (var e = this.game.width / gameOptions.blocksPerLine, i = 0; i < kData.kSave.blockGroup.length; ++i) {
        var a = this.game.add.sprite(kData.kSave.blockGroup[i].x, kData.kSave.blockGroup[i].y, "atlas-0", "b_10.png");
        switch (a.width = e, a.height = e, a.anchor.set(.5), a.value = kData.kSave.blockGroup[i].value, Math.floor((a.value - 1) / (this.level / 4))) {
          case 0:
            a.loadTexture("atlas-0", "b_10.png");
            break;
          case 1:
            a.loadTexture("atlas-0", "b_20.png");
            break;
          case 2:
            a.loadTexture("atlas-0", "b_30.png");
            break;
          default:
            a.loadTexture("atlas-0", "b_40.png")
        }
        this.game.physics.enable(a, Phaser.Physics.ARCADE), a.body.immovable = !0, a.row = kData.kSave.blockGroup[i].row, this.blockGroup.add(a);
        var s = this.game.add.text(0, 0, a.value, {
          font: "bold 32px Arial",
          align: "center",
          fill: "#ffffff"
        });
        s.anchor.set(.5), a.addChild(s)
      }
      for (i = 0; i < kData.kSave.extraBallGroup.length; ++i) {
        var n = this.game.add.sprite(kData.kSave.extraBallGroup[i].x, kData.kSave.extraBallGroup[i].y, "atlas-0", "bonus.png");
        n.width = t, n.height = t, n.anchor.set(.5), this.game.physics.enable(n, Phaser.Physics.ARCADE), n.body.immovable = !0, this.extraBallGroup.add(n), this.game.add.tween(n.scale).to({
          x: 1,
          y: 1
        }, 500, Phaser.Easing.Linear.None, !0, 0, -1, !0), n.row = kData.kSave.extraBallGroup[i].row
      }
      kData.kSave = void 0, ShowToast("success", "이어하기로 실행됩니다."), networkManager.AppDataPut(kData, function() {
        this.fSaveTime = 0, ShowToast("error", "세이브데이터가 삭제 되었습니다.")
      }.bind(this))
    }
    this.ufo.position.set(this.ballsGroup.getChildAt(0).x - 1, this.ballsGroup.getChildAt(0).y + 7), this.txtBallsCnt.text = "x " + (this.extraBalls + 1), this.aiming = !1, this.shooting = !1, this.txtScore.text = this.iScore.ToString("n0"), this.state = STATE_GAME
  },
  cbButtonHome: function() {
    MG.PlayAudio("SE_button"), this.fGameOverTimeDelay > 0 || (this.gGame.visible = !1, this.gGameOver.visible = !1, this.gOption.visible = !1, this.gTitle.visible = !0, this.gTitle.addChild(this.gHeart), this.state = STATE_TITLE)
  },
  cbButtonRetry: function(t) {
    MG.PlayAudio("SE_button"), this.fGameOverTimeDelay > 0 || (kData.iHeart <= 0 ? Matelmas.alert("", "", function() {
      "guest" != Define.user_id ? Matelmas.heartChargePageCall(Define.user_id, function() {
        networkManager.getCwMemHeart(cbCwHeart)
      }) : Matelmas.alertLogin()
    }.bind(this)) : (this.btnRetry.inputEnabled = !1, this.btnRetry1.inputEnabled = !1, Math.random() < .3 && ShowAD(0, "retry"), kData.kSave ? networkManager.AppDataPut(kData, function() {
      this.fSaveTime = 0, ShowToast("error", "세이브데이터가 삭제 되었습니다."), networkManager.useCwMemHeart("start", function(e) {
        switch (MG.game.world.add(this.sp_heart), this.sp_heart.visible = !0, kData.kSave = void 0, t) {
          case 0:
            this.sp_heart.position.set(MG.iCSX - 100, MG.iCSY + 100);
            break;
          case 1:
            this.sp_heart.position.set(MG.iCSX - 170, MG.iCSY + 30)
        }
        this.sp_heart.addAnimationByName(2, "heart_out", !1), cbCwHeart(e)
      }.bind(this))
    }.bind(this)) : networkManager.useCwMemHeart("start", function(e) {
      switch (MG.game.world.add(this.sp_heart), this.sp_heart.visible = !0, kData.kSave = void 0, t) {
        case 0:
          this.sp_heart.position.set(MG.iCSX - 100, MG.iCSY + 100);
          break;
        case 1:
          this.sp_heart.position.set(MG.iCSX - 170, MG.iCSY + 30)
      }
      this.sp_heart.addAnimationByName(2, "heart_out", !1), cbCwHeart(e)
    }.bind(this))))
  },
  addBall: function(t, e) {
    var i = this.game.width * gameOptions.ballSize,
      a = this.game.add.sprite(t, e, "atlas-0", "ball_01.png");
    a.width = i, a.height = i, a.anchor.set(.5), this.game.physics.enable(a, Phaser.Physics.ARCADE), a.body.collideWorldBounds = !0, a.body.bounce.set(1), this.ballsGroup.add(a)
  },
  mergeBall: function(t) {
    this.game.add.tween(t).to({
      x: this.ballsGroup.getChildAt(0).x
    }, 100, Phaser.Easing.Linear.None, !0).onComplete.add(function(t) {
      t.destroy()
    }, this)
  },
  addLine: function() {
    switch (this.level++, this.txtBallsCnt.text = "x " + (this.extraBalls + 1), this.level) {
      case 10:
      case 20:
        gameOptions.minExtraBallProbability--;
        break;
      case 30:
        gameOptions.minExtraBallProbability--, gameOptions.maxBlocksPerLine++;
        break;
      case 40:
      case 50:
        gameOptions.minExtraBallProbability--;
        break;
      case 60:
        gameOptions.minExtraBallProbability--, gameOptions.maxBlocksPerLine++;
        break;
      case 70:
      case 80:
        gameOptions.minExtraBallProbability--;
        break;
      case 120:
      case 240:
        gameOptions.maxBlocksPerLine++
    }
    var t = this.game.width / gameOptions.blocksPerLine,
      e = [],
      i = !1;
    this.game.rnd.between(0, 99) < Random.Range(gameOptions.minExtraBallProbability, gameOptions.maxExtraBallProbability + 1) && (i = !0);
    for (var a = Random.Range(gameOptions.minBlockPerLine, gameOptions.maxBlocksPerLine + 1), s = 0; s < a; s++) {
      var n = this.game.rnd.between(0, gameOptions.blocksPerLine - 1);
      if (-1 == e.indexOf(n))
        if (e.push(n), i) {
          i = !1;
          var o = this.game.width * gameOptions.ballSize,
            r = this.game.add.sprite(n * t + t / 2, t / 2 + t + this.game.height * gameOptions.scorePanelHeight, "atlas-0", "bonus.png");
          r.width = o, r.height = o, r.anchor.set(.5), this.game.physics.enable(r, Phaser.Physics.ARCADE), r.body.immovable = !0, this.extraBallGroup.add(r), this.game.add.tween(r.scale).to({
            x: 1,
            y: 1
          }, 500, Phaser.Easing.Linear.None, !0, 0, -1, !0), r.row = 1
        } else {
          var l = this.game.add.sprite(n * t + t / 2, t / 2 + t + this.game.height * gameOptions.scorePanelHeight, "atlas-0", "b_10.png");
          switch (l.width = t, l.height = t, l.anchor.set(.5), l.value = this.level, Math.floor((l.value - 1) / (this.level / 4))) {
            case 0:
              l.loadTexture("atlas-0", "b_10.png");
              break;
            case 1:
              l.loadTexture("atlas-0", "b_20.png");
              break;
            case 2:
              l.loadTexture("atlas-0", "b_30.png");
              break;
            default:
              l.loadTexture("atlas-0", "b_40.png")
          }
          this.game.physics.enable(l, Phaser.Physics.ARCADE), l.body.immovable = !0, l.row = 1, this.blockGroup.add(l);
          var h = this.game.add.text(0, 0, l.value, {
            font: "bold 32px Arial",
            align: "center",
            fill: "#ffffff"
          });
          h.anchor.set(.5), l.addChild(h)
        }
    }
  },
  aimBall: function(t, e) {
    this.state == STATE_GAME && (this.shooting || (this.aiming = !0, this.trajectory.visible = !0, this.trajectory.position.set(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y), this.direction = Phaser.Math.angleBetween(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y, e.position.x, e.position.y), this.angle = Phaser.Math.radToDeg(this.direction) + 90, Math.abs(this.angle) > 80 && (this.angle < 0 ? this.angle = -80 : this.angle = 80), this.trajectory.angle = this.angle))
  },
  adjustBall: function(t) {
    this.aiming && (this.direction = Phaser.Math.angleBetween(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y, t.position.x, t.position.y), this.angle = Phaser.Math.radToDeg(this.direction) + 90, Math.abs(this.angle) > 80 && (this.angle < 0 || this.ballsGroup.getChildAt(0).x - t.position.x > 0 ? this.angle = -80 : this.angle = 80), this.trajectory.angle = this.angle)
  },
  shootBall: function() {
    if (this.trajectory.visible) {
      this.landedBalls = 0, this.moreBalls = 0;
      var t = Phaser.Math.degToRad(this.trajectory.angle - 90),
        e = new Phaser.Point(this.ballsGroup.getChildAt(0).x, this.ballsGroup.getChildAt(0).y);
      if (this.ballsFired = 0, this.tbDmg = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1], this.extraBalls >= 50)
        for (var i = 0; i < this.extraBalls - 49; ++i) this.tbDmg[i % 50]++;
      switch (this.fireLoop = this.game.time.events.loop(Phaser.Timer.SECOND / 20, function() {
        if (MG.PlayAudio("shoot"), this.ballsFired > this.extraBalls) this.game.time.events.remove(this.fireLoop);
        else {
          switch (this.addBall(e.x, e.y), this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).body.velocity.set(gameOptions.ballSpeed * Math.cos(t), gameOptions.ballSpeed * Math.sin(t)), this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).dmg = this.tbDmg[this.ballsGroup.children.length - 1], this.tbDmg[this.ballsGroup.children.length - 1]) {
            case 1:
              this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16777215;
              break;
            case 2:
              this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16764108;
              break;
            case 3:
              this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16746632;
              break;
            case 4:
              this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16729156;
              break;
            default:
              this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16711680
          }
          this.ballsFired += this.tbDmg[this.ballsGroup.children.length - 1]
        }
      }, this), this.ballsGroup.getChildAt(0).body.velocity.set(gameOptions.ballSpeed * Math.cos(t), gameOptions.ballSpeed * Math.sin(t)), this.ballsGroup.getChildAt(0).dmg = this.tbDmg[0], this.tbDmg[0]) {
        case 1:
          this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16777215;
          break;
        case 2:
          this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16764108;
          break;
        case 3:
          this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16746632;
          break;
        case 4:
          this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16729156;
          break;
        default:
          this.ballsGroup.getChildAt(this.ballsGroup.children.length - 1).tint = 16711680
      }
      this.ballsFired += this.tbDmg[0], this.shooting = !0
    }
    this.aiming = !1, this.trajectory.visible = !1
  },
  update: function() {
    if (this.shooting) {
      for (var t = 0; t < this.ballsGroup.length; ++t) 1 == this.ballsGroup.getChildAt(t).bCollider && (this.ballsGroup.getChildAt(t).bCollider = void 0, this.ballsGroup.getChildAt(t).body.velocity.set(.1), this.ballsGroup.getChildAt(t).position.set(this.ballsGroup.getChildAt(t).position.x, 1137.2));
      this.game.physics.arcade.collide(this.ballsGroup, this.scorePanel), this.game.physics.arcade.collide(this.ballsGroup, this.blockGroup, function(t, e) {
        if (12 != e.row)
          if (e.value -= t.dmg, this.iScore += t.dmg, this.txtScore.text = this.iScore.ToString("n0"), kData.iBestScore < this.iScore && (kData.iBestScore = this.iScore, this.txtBestScore.text = kData.iBestScore.ToString("n0"), this.sprBestScoreIcon.position.set(-this.txtBestScore.width / 2 - 20, -5), this.sprNew.visible = !0), e.value <= 0) e.destroy(), MG.PlayAudio("bloken");
          else switch (MG.PlayAudio("block"), e.getChildAt(0).text = e.value, Math.floor((e.value - 1) / (this.level / 4))) {
            case 0:
              e.loadTexture("atlas-0", "b_10.png");
              break;
            case 1:
              e.loadTexture("atlas-0", "b_20.png");
              break;
            case 2:
              e.loadTexture("atlas-0", "b_30.png");
              break;
            default:
              e.loadTexture("atlas-0", "b_40.png")
          } else this.gGameOver.visible = !0
      }, null, this), this.game.physics.arcade.overlap(this.ballsGroup, this.extraBallGroup, function(t, e) {
        MG.PlayAudio("SE_GetBall"), this.ballsToBeAddedGroup.add(e);
        this.game.add.tween(e).to({
          y: this.game.height - this.launchPanel.height - this.game.width * gameOptions.ballSize / 2
        }, 200, Phaser.Easing.Linear.None, !0)
      }, null, this), this.game.physics.arcade.collide(this.ballsGroup, this.launchPanel, function(t, e) {
        e.body.velocity.set(0), 0 == this.landedBalls ? (this.ballsGroup.swapChildren(e, this.ballsGroup.getChildAt(0)), setTimeout(function() {
          this.game.add.tween(this.ufo).to({
            x: this.ballsGroup.getChildAt(0).x - 1
          }, 200, Phaser.Easing.Linear.None, !0)
        }.bind(this), 100)) : this.mergeBall(e), this.landedBalls += e.dmg, this.landedBalls + this.moreBalls > this.extraBalls && (this.ballsToBeAddedGroup.forEach(function(t) {
          this.extraBalls++, this.mergeBall(t)
        }, this), this.game.add.tween(this.fallingGroup).to({
          y: this.fallingGroup.y + this.game.width / gameOptions.blocksPerLine
        }, 200, Phaser.Easing.Linear.None, !0).onComplete.add(function() {
          this.blockGroup.forEach(function(t) {
            switch (Math.floor((t.value - 1) / (this.level / 4))) {
              case 0:
                t.loadTexture("atlas-0", "b_10.png");
                break;
              case 1:
                t.loadTexture("atlas-0", "b_20.png");
                break;
              case 2:
                t.loadTexture("atlas-0", "b_30.png");
                break;
              default:
                t.loadTexture("atlas-0", "b_40.png")
            }
          }.bind(this)), this.shooting = !1, this.fallingGroup.y = 0, this.blockGroup.forEach(function(t) {
            t.y += this.game.width / gameOptions.blocksPerLine, t.row++, 12 == t.row && (this.gGameOver.visible = !0, this.state = STATE_GAME_OVER, this.txtResultScore.text = this.iScore.ToString("n0"), this.bViewToast = !1, void 0 != kData.kSave && (kData.kSave = void 0, this.bViewToast = !0), networkManager.AppDataPut(kData, function() {
              1 == this.bViewToast && (this.fSaveTime = 0, ShowToast("error", "세이브데이터가 삭제 되었습니다.")), networkManager.RankingAdd(kData.iBestScore, function() {
                Math.random() < .3 && ShowAD(0, "result")
              })
            }.bind(this)))
          }, this), this.extraBallGroup.forEach(function(t) {
            t.y += this.game.width / gameOptions.blocksPerLine, t.row++, 12 == t.row && t.destroy()
          }, this), this.addLine()
        }, this))
      }, null, this)
    }
    updateTick(), this.fGameOverTimeDelay -= deltaTime, this.fSaveTime -= deltaTime
  }
}, window[""] = window[""] || {}, window[""].Game = Game;