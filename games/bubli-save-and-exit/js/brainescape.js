var boot = function(a) {};
boot.prototype = {
    preload: function() {
        this.game.stage.backgroundColor = "#26235A";
        this.game.load.image("background", "images/BG.jpg");
        this.game.load.image("preloading-outer", "images/preloadbar-outer.png");
        this.game.load.image("preloading-inner", "images/preloadbar-inner.png")
    },
    init: function() {
        this.input.maxPointers = 1;
        this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        this.game.scale.setGameSize(640, 1136);
        this.game.scale.pageAlignHorizontally = !0;
        this.game.scale.pageAlignVertically = !0;
        this.game.device.desktop ||
            (this.game.scale.forceOrientation(!1, !0), this.game.scale.enterIncorrectOrientation.add(this.handleIncorrect, this), this.game.scale.leaveIncorrectOrientation.add(this.handleCorrect, this))
    },
    create: function() {
        this.game.global = {
            levelselectpageindex: 0,
            levels: [],
            levelscompletemaster: [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            levelscomplete: [0, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
            paused: !1,
            lang: "en",
            debug: !1
        };
        this.game.utils = {
            hasLocalStorage: !0,
            checkLocalStorage: function() {
                try {
                    localStorage.setItem("test",
                        "test"), localStorage.removeItem("test"), this.hasLocalStorage = !0
                } catch (a) {
                    this.hasLocalStorage = !1
                }
            },
            getLanguage: function() {
                var a = window.navigator,
                    b = ["language", "browserLanguage", "systemLanguage", "userLanguage"],
                    d, e, f = "en";
                if (Array.isArray(a.languages))
                    for (d = 0; d < a.languages.length; d++)
                        if ((e = a.languages[d]) && e.length) {
                            f = e;
                            break
                        }
                for (d = 0; d < b.length; d++)
                    if ((e = a[b[d]]) && e.length) {
                        f = e;
                        break
                    } - 1 !== f.indexOf("-") && (f = f.split("-")[0]); - 1 !== f.indexOf("_") && (f = f.split("_")[0]);
                return f
            }
        };
        this.game.utils.checkLocalStorage();
        this.game.global.lang = this.game.utils.getLanguage();
        if (this.game.utils.hasLocalStorage && (null !== localStorage.getItem("LevelSelectPageIndex") && !0 !== this.game.global.debug && (this.game.global.levelselectpageindex = parseInt(localStorage.getItem("LevelSelectPageIndex"))), null !== localStorage.getItem("LevelsComplete") && !0 !== this.game.global.debug && (this.game.global.levelscomplete = JSON.parse(localStorage.getItem("LevelsComplete"))), this.game.global.levelscompletemaster.length > this.game.global.levelscomplete.length))
            for (var a =
                    this.game.global.levelscomplete.length; a < this.game.global.levelscompletemaster.length; a++) this.game.global.levelscomplete.push(this.game.global.levelscompletemaster[a]);
        this.game.global.levels.push({
            playerPosition: 10,
            blockerPositions: [13]
        });
        this.game.global.levels.push({
            playerPosition: 20,
            blockerPositions: [7, 23]
        });
        this.game.global.levels.push({
            playerPosition: 20,
            blockerPositions: [6, 13, 22]
        });
        this.game.global.levels.push({
            playerPosition: 10,
            blockerPositions: [3, 6, 14, 17]
        });
        this.game.global.levels.push({
            playerPosition: 10,
            blockerPositions: [8, 23]
        });
        this.game.global.levels.push({
            playerPosition: 3,
            blockerPositions: [7, 16, 20, 24]
        });
        this.game.global.levels.push({
            playerPosition: 0,
            blockerPositions: [3, 6, 18, 21]
        });
        this.game.global.levels.push({
            playerPosition: 21,
            blockerPositions: [3, 6, 23]
        });
        this.game.global.levels.push({
            playerPosition: 2,
            blockerPositions: [0, 19, 21]
        });
        this.game.global.levels.push({
            playerPosition: 19,
            blockerPositions: [7, 9, 10, 21]
        });
        this.game.global.levels.push({
            playerPosition: 8,
            blockerPositions: [5, 16, 20, 24]
        });
        this.game.global.levels.push({
            playerPosition: 10,
            blockerPositions: [0, 9, 12, 18]
        });
        this.game.global.levels.push({
            playerPosition: 4,
            blockerPositions: [2, 14, 16, 24]
        });
        this.game.global.levels.push({
            playerPosition: 11,
            blockerPositions: [1, 10, 12, 13, 21]
        });
        this.game.global.levels.push({
            playerPosition: 4,
            blockerPositions: [1, 15, 19]
        });
        this.game.global.levels.push({
            playerPosition: 18,
            blockerPositions: [1, 8, 15, 22]
        });
        this.game.global.levels.push({
            playerPosition: 19,
            blockerPositions: [1, 8, 10, 22, 24]
        });
        this.game.global.levels.push({
            playerPosition: 20,
            blockerPositions: [8, 11,
                22, 24
            ]
        });
        this.game.global.levels.push({
            playerPosition: 10,
            blockerPositions: [2, 17, 19, 20]
        });
        this.game.global.levels.push({
            playerPosition: 19,
            blockerPositions: [0, 8, 10, 17]
        });
        this.game.global.levels.push({
            playerPosition: 2,
            blockerPositions: [20, 22, 24]
        });
        this.game.global.levels.push({
            playerPosition: 24,
            blockerPositions: [1, 7, 13, 15, 22]
        });
        this.game.global.levels.push({
            playerPosition: 22,
            blockerPositions: [1, 9, 10, 12, 17]
        });
        this.game.global.levels.push({
            playerPosition: 4,
            blockerPositions: [1, 8, 21, 24]
        });
        this.game.global.levels.push({
            playerPosition: 21,
            blockerPositions: [1, 5, 8, 19]
        });
        this.game.global.levels.push({
            playerPosition: 20,
            blockerPositions: [8, 11, 23, 24]
        });
        this.game.global.levels.push({
            playerPosition: 21,
            blockerPositions: [5, 7, 8, 24]
        });
        this.game.global.levels.push({
            playerPosition: 2,
            blockerPositions: [0, 9, 10, 18]
        });
        this.game.global.levels.push({
            playerPosition: 24,
            blockerPositions: [1, 4, 10, 13, 20]
        });
        this.game.global.levels.push({
            playerPosition: 4,
            blockerPositions: [0, 2, 15, 23]
        });
        this.game.global.levels.push({
            playerPosition: 2,
            blockerPositions: [0, 4, 20, 24]
        });
        this.game.global.levels.push({
            playerPosition: 22,
            blockerPositions: [1, 3, 14, 15, 19]
        });
        this.game.guiplugin = this.game.plugins.add(Phaser.Plugin.GuiPlugin);
        this.game.state.start("Preload")
    },
    handleCorrect: function() {
        this.game.device.desktop || (document.getElementById("portonly").style.display = "none")
    },
    handleIncorrect: function() {
        this.game.device.desktop || (document.getElementById("portonly").style.display = "block")
    }
};
var preload = function(a) {
    loadingBarInner = loadingBarOuter = jewelisland = bmd = null;
    jewelislandoffsetY = 0;
    dpi = 1
};
preload.prototype = {
    preload: function() {
        this.dpi = 1;
        this.game.add.sprite(0, 0, "background");
        this.loadingBarOuter = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY, "preloading-outer");
        this.loadingBarInner = this.game.add.sprite(this.game.world.centerX - this.loadingBarOuter.width / 2 + 10, this.game.world.centerY, "preloading-inner");
        this.loadingBarOuter.anchor.setTo(.5, .5);
        this.loadingBarInner.anchor.setTo(0, .5);
        this.loadingBarOuter.scale.setTo(this.dpi, this.dpi);
        this.loadingBarInner.scale.setTo(this.dpi,
            this.dpi);
        this.loadingBarInner.bringToTop();
        this.load.setPreloadSprite(this.loadingBarInner);
        this.game.load.atlas("brains", "images/Brains.png", "images/Brains.json", Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        this.game.load.image("title", "images/BG_title.png");
        this.game.load.image("playbutton", "images/playbutton2.png");
        this.game.load.atlas("buttons", "images/buttonsOpt.png", "images/buttons.json", Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        this.game.load.image("backgroundplain", "images/BGplain.jpg");
        this.game.load.image("planetstripe",
            "images/planetstripe.png");
        this.game.load.image("planetring", "images/planetring.png");
        this.game.load.image("planetmoon", "images/planetmoon.png");
        this.game.load.image("popupbordertop", "images/popbordertop2.png");
        this.game.load.image("popupborderbottom", "images/popborderbot2.png");
        this.game.load.image("popupmid", "images/popmid.png");
        this.game.load.image("award", "images/award.png");
        this.game.load.atlas("characters", "images/CharactersOptOut.png", "images/Characters.1.json", Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        this.game.load.atlas("spacetiles", "images/spacetileslg.png", "images/spacetileslg.json", Phaser.Loader.TEXTURE_ATLAS_JSON_ARRAY);
        this.game.load.image("sqparticle", "images/sqparticle.png");
        this.game.load.image("blackhole", "images/blackhole.png");
        this.game.load.json("leveltext", "js/leveltext.json");
        this.game.load.audio("pop", ["audio/pop.mp3", "audio/pop.ogg"]);
        this.game.load.audio("award", ["audio/award.mp3", "audio/award.ogg"]);
        this.game.load.audio("tap", ["audio/button.mp3", "audio/button.ogg"]);
        this.game.load.audio("locked", ["audio/locked.mp3", "audio/locked.ogg"]);
        this.game.load.audio("portal", ["audio/portal.mp3", "audio/portal.ogg"])
    },
    create: function() {
        this.game.state.start("Menu")
    },
    resize: function(a, c) {}
};
var menu = function(a) {
    this.infoButton = this.playButton = null;
    this.titleoffsetY = this.playbuttonoffsetY = 0;
    this.title = null;
    this.dpi = 1;
    this.sfx = {
        vol: .1,
        tap: null
    }
};
menu.prototype = {
    init: function(a) {
        this.sfx = "undefined" !== typeof a ? {
            vol: parseFloat(a),
            tap: null
        } : {
            vol: .1,
            tap: null
        }
    },
    create: function() {
        this.dpi = 1;
        this.titleoffsetY = 0;
        this.playbuttonoffsetY = 330;
        this.game.add.sprite(0, 0, "background");
        this.sfx.tap = this.game.add.audio("tap");
        this.title = this.add.sprite(this.game.world.centerX, this.game.world.centerY + this.titleoffsetY, "title");
        this.title.anchor.setTo(.48, .5);
        this.title.scale.setTo(0, 0);
        this.playButton = this.game.add.button(this.game.world.centerX, this.game.world.centerY +
            this.playbuttonoffsetY, "playbutton", this.playGame, this);
        this.playButton.anchor.setTo(.5, .5);
        this.playButton.scale.setTo(0, 0);
        this.infoButton = this.game.add.button(this.game.world.width - 40, this.game.world.height - 40, "buttons", this.showInfo, this);
        this.infoButton.anchor.setTo(.5, .5);
        this.infoButton.scale.setTo(0, 0);
        this.infoButton.frameName = "info";
        var a = this.game.add.tween(this.playButton.scale).to({
                x: 1,
                y: 1
            }, 500, Phaser.Easing.Elastic.Out),
            c = this.game.add.tween(this.infoButton.scale).to({
                    x: .5,
                    y: .5
                }, 500,
                Phaser.Easing.Elastic.Out);
        this.game.add.tween(this.title.scale).to({
            x: 1,
            y: 1
        }, 1E3, Phaser.Easing.Elastic.Out, !0, 500).onComplete.add(function() {
            a.start();
            c.start()
        }, this);
        "undefined" !== typeof FlurryAgent && FlurryAgent.logEvent("Title Screen Loaded")
    },
    resize: function(a, c) {},
    playGame: function() {
        this.sfx.tap.play("", 0, this.sfx.vol);
        this.game.add.tween(this.playButton.scale).to({
            x: 1.1,
            y: 1.1
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
                this.game.state.start("LevelSelect", !0, !1, this.sfx.vol)
            },
            this)
    },
    showInfo: function() {
        this.sfx.tap.play("", 0, this.sfx.vol);
        this.game.add.tween(this.infoButton.scale).to({
            x: .6,
            y: .6
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
            this.game.guiplugin.ShowPopup({
                popupType: "GameInfo",
                popupHeight: 200,
                sfxVol: this.sfx.vol
            })
        }, this)
    }
};
var levelselect = function(a) {
    levelsgroup = null;
    pageheightpercentage = pageheight = pagewidth = pageindex = 0;
    volumeButton = backButton = nextButton = previousButton = rightArrow = leftArrow = null;
    dpi = 1;
    sfx = {
        vol: .1,
        tap: null,
        locked: null
    }
};
levelselect.prototype = {
    init: function(a) {
        this.dpi = 1;
        this.levelsgroup = this.game.add.group();
        this.pageindex = 0;
        this.pagewidth = this.game.width;
        this.pageheightpercentage = 0;
        this.pageheight = this.game.height - this.pageheightpercentage / 100 * this.game.height;
        this.volumeButton = this.backButton = this.nextButton = this.previousButton = this.rightArrow = this.leftArrow = null;
        this.sfx = {
            vol: parseFloat(a),
            tap: null,
            locked: null
        }
    },
    preload: function() {},
    create: function() {
        this.game.global.paused = !1;
        this.loadBackground();
        this.loadButtons();
        this.loadSounds();
        for (var a = this.game.global.levelscomplete.length, c = 0, b = 0, d = Math.floor(this.pagewidth / 5), e = Math.floor(this.pageheight / 5), f = 0; f < a; f++) {
            var g, k, l, h = this.game.add.group();
            h.x = this.pagewidth * this.pageindex + (b + 1) * d;
            h.y = (c + 1) * e;
            switch (this.game.global.levelscomplete[f]) {
                case 0:
                    g = "active";
                    k = 0;
                    break;
                case 1:
                    g = "award";
                    k = 1;
                    break;
                case 4:
                    g = "locked", k = 4
            }
            l = this.game.add.button(0, 0, "buttons", this.levelClicked, this, null, g, null, null, h);
            l.levelindex = f;
            l.anchor.setTo(.5);
            l.state = k;
            this.levelsgroup.add(h);
            b++;
            0 < b && 0 === b % 4 && (b = 0, c++);
            0 < c && 0 === c % 4 && (c = 0, this.pageindex++)
        }
        this.game.world.bringToTop(this.levelsgroup)
    },
    loadSounds: function() {
        this.sfx.tap = this.game.add.audio("tap");
        this.sfx.locked = this.game.add.audio("locked")
    },
    loadBackground: function() {
        this.game.add.sprite(0, 0, "background")
    },
    loadButtons: function() {
        this.previousButton = this.game.add.button(50, this.game.height - 60, "buttons", this.arrowClicked, this);
        this.nextButton = this.game.add.button(this.game.width - 50, this.game.height - 60, "buttons", this.arrowClicked,
            this);
        this.backButton = this.game.add.button(50, 60, "buttons", this.backToTitle, this);
        this.volumeButton = this.game.add.button(this.game.width - 50, 60, "buttons", this.toggleVolume, this);
        this.previousButton.anchor.setTo(.5);
        this.nextButton.anchor.setTo(.5);
        this.backButton.anchor.setTo(.5);
        this.volumeButton.anchor.setTo(.5);
        this.previousButton.scale.setTo(.75);
        this.nextButton.scale.setTo(.75);
        this.backButton.scale.setTo(.75);
        this.volumeButton.scale.setTo(.75);
        this.previousButton.frameName = "back";
        this.nextButton.frameName =
            "next";
        this.backButton.frameName = "up";
        this.volumeButton.frameName = 0 !== this.sfx.vol ? "volumeon" : "volumeoff";
        0 === this.game.global.levelselectpageindex && (this.previousButton.alpha = .3);
        this.game.global.levelselectpageindex === this.pageindex && (this.nextButton.alpha = .3);
        for (var a = 0, c = 0; c < this.game.global.levelselectpageindex; c++) a -= this.pagewidth;
        this.levelsgroup.x = a;
        switch (this.game.global.levelselectpageindex) {
            case 0:
                this.previousButton.alpha = .3;
                this.nextButton.alpha = 1;
                break;
            case this.pageindex:
                this.previousButton.alpha =
                    1;
                this.nextButton.alpha = .3;
                break;
            default:
                this.previousButton.alpha = 1, this.nextButton.alpha = 1
        }
    },
    backToTitle: function(a) {
        var c = a.scale.x + .1,
            b = a.scale.y + .1;
        this.sfx.tap.play("", 0, this.sfx.vol);
        this.game.add.tween(a.scale).to({
            x: c,
            y: b
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
            this.game.state.start("Menu", !0, !1, this.sfx.vol)
        }, this)
    },
    levelClicked: function(a) {
        var c = a.parent.scale.x + .1,
            b = a.parent.scale.y + .1;
        4 !== a.state ? (this.sfx.tap.play("", 0, this.sfx.vol), this.game.add.tween(a.parent.scale).to({
            x: c,
            y: b
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
            this.game.state.start("TheGame", !0, !1, a.levelindex, this.sfx.vol)
        }, this)) : (this.sfx.locked.play("", 0, this.sfx.vol), this.game.add.tween(a.parent.scale).to({
            x: c,
            y: b
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0), this.game.add.tween(a.parent).to({
            angle: 10
        }, 100, Phaser.Easing.Linear.None, !0).chain(this.game.add.tween(a.parent).to({
            angle: -10
        }, 100, Phaser.Easing.Linear.None).chain(this.game.add.tween(a.parent).to({
            angle: 0
        }, 100, Phaser.Easing.Linear.None))))
    },
    toggleVolume: function(a) {
        "volumeon" == a.frameName ? (a.frameName = "volumeoff", this.sfx.vol = 0) : (a.frameName = "volumeon", this.sfx.vol = .1, this.sfx.tap.play("", 0, this.sfx.vol))
    },
    arrowClicked: function(a) {
        var c = this.levelsgroup.x,
            b = a.scale.x + .1,
            d = a.scale.y + .1;
        this.game.add.tween(a.scale).to({
            x: b,
            y: d
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onStart.add(function() {
            "back" == a.frameName && .3 < a.alpha && !this.game.global.paused && (this.game.global.paused = !0, this.sfx.tap.play("", 0, this.sfx.vol), this.game.add.tween(this.levelsgroup).to({
                x: c +
                    this.pagewidth
            }, 1500, Phaser.Easing.Elastic.Out, !0).onStart.add(function() {
                this.game.global.levelselectpageindex--;
                this.nextButton.alpha = 1;
                0 === this.game.global.levelselectpageindex && (a.alpha = .3);
                this.game.global.paused = !1
            }, this));
            "next" === a.frameName && .3 < a.alpha && !this.game.global.paused && (this.game.global.paused = !0, this.sfx.tap.play("", 0, this.sfx.vol), this.game.add.tween(this.levelsgroup).to({
                x: c - this.pagewidth
            }, 1500, Phaser.Easing.Elastic.Out, !0).onStart.add(function() {
                this.game.global.levelselectpageindex++;
                this.previousButton.alpha = 1;
                this.game.global.levelselectpageindex === this.pageindex && (a.alpha = .3);
                this.game.global.paused = !1
            }, this))
        }, this)
    }
};
var thegame = function(a) {
    tile_height = tile_width = 96;
    tiles = [];
    level = 0;
    blockers = [];
    pathParticleArea = highlightemitter = highlightedobject = tilegroup = null;
    emitterPadding = -20;
    blackhole = volumeButton = replayButton = backButton = nextButton = nextArrow = edgeArray = null;
    blockerYoffset = blockerXoffset = playerYoffset = playerXoffset = 0;
    intersectionThresholdPercentage = 36;
    blockertint = tiletint = 16777214;
    pathgroup = graphics = guigroup = null;
    sfx = {
        vol: .1,
        pop: null,
        tap: null,
        portal: null
    }
};
thegame.prototype = {
    init: function(a, c) {
        tile_height = tile_width = 96;
        tiles = [];
        level = a;
        blockers = [];
        pathParticleArea = highlightemitter = highlightedobject = tilegroup = null;
        emitterPadding = -20;
        blackhole = replayButton = volumeButton = backButton = nextButton = nextArrow = edgeArray = null;
        blockerYoffset = blockerXoffset = playerYoffset = playerXoffset = 0;
        intersectionThresholdPercentage = 36;
        blockertint = tiletint = 16777214;
        pathgroup = graphics = guigroup = null;
        sfx = {
            vol: parseFloat(c),
            pop: null,
            tap: null,
            portal: null
        }
    },
    create: function() {
        tilegroup =
            this.game.add.group(this.game.world, "tilegroup", !1);
        pathgroup = this.game.add.group();
        pathParticleArea = {
            top: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            bottom: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            left: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            },
            right: {
                x: 0,
                y: 0,
                width: 0,
                height: 0
            }
        };
        edgeArray = {
            top: [0, 1, 2, 3, 4],
            bottom: [20, 21, 22, 23, 24],
            left: [0, 5, 10, 15, 20],
            right: [4, 9, 14, 19, 24]
        };
        this.game.global.paused = !1;
        this.loadBackground();
        this.loadSounds();
        this.loadButtons();
        this.spawnTiles();
        this.clearTiles();
        level < this.game.global.levels.length && this.spawnBlockers(this.game.global.levels[level].blockerPositions,
            this.game.global.levels[level].playerPosition);
        this.spawnEmitter();
        this.loadLevelText();
        if ("undefined" !== typeof FlurryAgent) {
            var a = {};
            a.level = level.toString();
            FlurryAgent.logEvent("Level Loaded", a)
        }
    },
    loadSounds: function() {
        sfx.pop = this.game.add.audio("pop");
        sfx.tap = this.game.add.audio("tap");
        sfx.portal = this.game.add.audio("portal")
    },
    loadLevelText: function() {
        var a = this.game.cache.getJSON("leveltext");
        "undefined" !== typeof a.leveltext[level] && "{}" !== JSON.stringify(a.leveltext[level]) && a.leveltext[level].hasOwnProperty(this.game.global.lang) &&
            (a = this.game.add.text(this.game.world.centerX, 136, a.leveltext[level][this.game.global.lang], {
                font: "34px whitespaceregular",
                fill: "#ffffff",
                align: "center",
                wordWrap: !0,
                wordWrapWidth: 600
            }), a.anchor.setTo(.5, 0), a.lineSpacing = -14, a.stroke = "#000000", a.strokeThickness = 6)
    },
    loadBackground: function() {
        this.game.add.sprite(0, 0, "backgroundplain");
        var a = this.game.add.sprite(0, 0, "planetring"),
            c = this.game.add.sprite(0, 0, "planetstripe"),
            b = this.game.add.sprite(0, 0, "planetmoon");
        a.x = this.game.width;
        a.y = -100;
        c.x = -c.width;
        c.y = this.game.height - (c.height - 60);
        b.x = this.game.width;
        b.y = 600;
        this.game.add.tween(a).to({
            x: 2 * -a.width
        }, 3E5, Phaser.Easing.Linear.None, !0, 0, -1);
        this.game.add.tween(c).to({
            x: this.game.width + c.width
        }, 2E5, Phaser.Easing.Linear.None, !0, 0, -1);
        this.game.add.tween(b).to({
            x: 2 * -b.width
        }, 8E4, Phaser.Easing.Linear.None, !0, 0, -1)
    },
    loadButtons: function() {
        this.nextButton = this.game.add.button(this.game.world.centerX, this.game.height + 60, "buttons", function() {
            this.game.state.start("TheGame", !0, !1, level, sfx.vol)
        }, this);
        this.backButton = this.game.add.button(50, 60, "buttons", this.backToLevelSelect, this);
        this.volumeButton = this.game.add.button(this.game.width - 50, 60, "buttons", this.toggleVolume, this);
        this.replayButton = this.game.add.button(this.game.width - 150, 60, "buttons", this.replayLevel, this);
        this.nextButton.anchor.setTo(.5);
        this.backButton.anchor.setTo(.5);
        this.volumeButton.anchor.setTo(.5);
        this.replayButton.anchor.setTo(.5);
        this.nextButton.scale.setTo(.75);
        this.backButton.scale.setTo(.75);
        this.volumeButton.scale.setTo(.75);
        this.replayButton.scale.setTo(.75);
        this.nextButton.frameName = "next";
        this.backButton.frameName = "up";
        this.replayButton.frameName = "replay";
        this.volumeButton.frameName = 0 !== sfx.vol ? "volumeon" : "volumeoff"
    },
    replayLevel: function(a) {
        if (!this.game.global.paused) {
            var c = a.scale.x + .1,
                b = a.scale.y + .1;
            sfx.tap.play("", 0, sfx.vol);
            this.game.add.tween(a.scale).to({
                x: c,
                y: b
            }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
                this.game.state.start("TheGame", !0, !1, level, sfx.vol)
            }, this)
        }
    },
    backToLevelSelect: function(a) {
        var c =
            a.scale.x + .1,
            b = a.scale.y + .1;
        sfx.tap.play("", 0, sfx.vol);
        this.game.add.tween(a.scale).to({
            x: c,
            y: b
        }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
            this.game.state.start("LevelSelect", !0, !1, sfx.vol)
        }, this)
    },
    toggleVolume: function(a) {
        "volumeon" == a.frameName ? (a.frameName = "volumeoff", sfx.vol = 0) : (a.frameName = "volumeon", sfx.vol = .1, sfx.tap.play("", 0, sfx.vol))
    },
    spawnButtons: function() {
        var a = this.game.add.button(50, 50, "level_arrows", function() {
                this.game.state.start("LevelSelect", !0, !1, sfx.vol)
            },
            this);
        a.anchor.setTo(.5);
        a.frame = 0;
        nextArrow = this.game.add.button(this.game.world.centerX, this.game.height + 64, "level_arrows", function() {
            this.game.state.start("TheGame", !0, !1, level, sfx.vol)
        }, this);
        nextArrow.anchor.setTo(.5);
        nextArrow.frame = 1
    },
    spawnTiles: function() {
        var a, c = 0,
            b = 0;
        tile_width *= 1;
        tile_height *= 1;
        for (var d = 5 * tile_width, e = 5 * tile_height, f = this.game.world.centerX - d / 2 + tile_width / 2, g = this.game.world.centerY - e / 2 + tile_height / 2, k = g; k < e + g; k += tile_height) {
            for (var l = 0, h = f; h < d + f; h += tile_width) 12 == b ?
                (a = this.game.add.sprite(h, k, "spacetiles", "spacetileblk"), a.name = "tileX", blackhole = this.game.add.sprite(h, k - 8, "blackhole"), blackhole.anchor.setTo(.5, .5)) : (a = this.game.add.sprite(h, k, "spacetiles", "spacetilenrm"), a.name = "tile"), a.scale.setTo(1, 1), a.anchor.setTo(.5, .5), a.inputEnabled = !0, a.events.onInputUp.add(this.highlightTile, this), tiles.push({
                    sprite: a,
                    xPos: l,
                    yPos: c,
                    containsObject: !1
                }), tilegroup.add(a), l++, b++;
            c++
        }
        this.game.world.bringToTop(tilegroup);
        blackhole.bringToTop()
    },
    clearTiles: function() {
        for (var a =
                0; a < tiles.length; a++) tiles[a].sprite.tint = 16777215, tiles[a].containsObject = !1
    },
    spawnBlockers: function(a, c) {
        for (var b = 0; b < tiles.length; b++)
            if (-1 < a.indexOf(b) || b === c) {
                if (b === c) {
                    var d = this.game.add.group();
                    d.x = tiles[b].sprite.x + playerXoffset;
                    d.y = tiles[b].sprite.y + playerYoffset;
                    var e = this.game.add.sprite(0, 0, "characters", "Brains_Idle");
                    e.anchor.setTo(.5, .6);
                    e.animations.add("flying", Phaser.Animation.generateFrameNames("Brains_Flying", 1, 6, "", 0), 20, !0);
                    var f = e.animations.add("pop", Phaser.Animation.generateFrameNames("Brains_pop",
                        1, 7, "", 0), 16);
                    f.onComplete.add(function() {
                        this.game.global.paused = !0;
                        this.game.state.start("TheGame", !0, !1, level, sfx.vol)
                    }, this);
                    e.idleframe = 7;
                    e.frame = e.idleframe;
                    e.name = "Brains";
                    f = this.game.add.tween(e);
                    f.to({
                        y: e.y - 8
                    }, 750, Phaser.Easing.Linear.None, !0, 0, -1, !0)
                } else d = this.game.add.group(), d.x = tiles[b].sprite.x + blockerXoffset, d.y = tiles[b].sprite.y + blockerYoffset, e = this.game.add.sprite(0, 0, "characters", "Booger_Idle"), e.anchor.setTo(.45, .6), e.animations.add("flying", Phaser.Animation.generateFrameNames("Booger_Flying",
                    1, 6, "", 0), 20, !0), f = e.animations.add("pop", Phaser.Animation.generateFrameNames("Booger_pop", 1, 7, "", 0), 16), f.onComplete.add(function() {
                    this.game.global.paused = !0;
                    this.game.state.start("TheGame", !0, !1, level, sfx.vol)
                }, this), e.idleframe = 0, e.frame = e.idleframe, e.name = "Booger", f = this.game.add.tween(e), f.to({
                    y: e.y - 8
                }, this.game.rnd.between(500, 750), Phaser.Easing.Linear.None, !0, 0, -1, !0);
                d.add(e);
                e.bringToTop();
                blockers.push(d);
                tiles[b].containsObject = !0
            }
    },
    spawnEmitter: function() {
        highlightemitter = this.game.add.emitter(200,
            200, 250);
        highlightemitter.makeParticles("sqparticle");
        highlightemitter.setXSpeed(0, 0);
        highlightemitter.setYSpeed(-50, -100);
        highlightemitter.gravity = 0;
        highlightemitter.bringToTop = !0;
        highlightemitter.setRotation(0, 0);
        highlightemitter.setAlpha(1, 0, 1E3);
        highlightemitter.start(!1, 2E3, 20);
        highlightemitter.on = !1
    },
    checkOverlap: function(a, c) {
        var b = a.getBounds(),
            d = c.getBounds(),
            d = Phaser.Rectangle.intersection(b, d);
        return Math.floor(d.width * d.height / (b.width * b.height) * 100) > intersectionThresholdPercentage
    },
    untintTiles: function() {
        for (var a =
                0; a < tiles.length; a++) "undefined" != typeof tiles[a].sprite && (tiles[a].sprite.tint = 16777215, "tileX" != tiles[a].sprite.name && (tiles[a].sprite.frameName = "spacetilenrm"))
    },
    highlightTile: function(a) {
        if (!this.game.global.paused) {
            var c, b, d, e, f, g;
            for (g = 0; g < blockers.length; g++)
                if (this.checkOverlap(a, blockers[g].getChildAt(0))) {
                    b = blockers[g];
                    c = blockers[g].getChildAt(0);
                    break
                }
            if ("undefined" != typeof c) {
                this.untintBlockers();
                c.tint = blockertint;
                c.animations.play("flying");
                highlightemitter.x = c.worldPosition.x;
                highlightemitter.y =
                    c.worldPosition.y;
                highlightemitter.setSize(c.width + emitterPadding, c.height + emitterPadding);
                d = tiles.map(function(a) {
                    return a.sprite.x + "" + a.sprite.y
                }).indexOf(a.x + "" + a.y);
                e = this.getTargetIndex("top", d);
                f = this.getTargetIndex("bottom", d);
                g = this.getTargetIndex("right", d);
                d = this.getTargetIndex("left", d);
                pathParticleArea.top.x = tiles[e].sprite.x;
                pathParticleArea.top.y = tiles[e].sprite.y;
                pathParticleArea.top.width = tiles[e].sprite.width;
                pathParticleArea.top.height = Math.abs(a.y - tiles[e].sprite.y);
                pathParticleArea.bottom.x =
                    a.x;
                pathParticleArea.bottom.y = a.y + a.height;
                pathParticleArea.bottom.width = tiles[f].sprite.width;
                pathParticleArea.bottom.height = Math.abs(a.y + a.height - (tiles[f].sprite.y + tiles[f].sprite.height));
                pathParticleArea.left.x = tiles[d].sprite.x;
                pathParticleArea.left.y = tiles[d].sprite.y;
                pathParticleArea.left.width = Math.abs(a.x - tiles[d].sprite.x);
                pathParticleArea.left.height = tiles[d].sprite.height;
                pathParticleArea.right.x = a.x + a.width;
                pathParticleArea.right.y = a.y;
                pathParticleArea.right.width = Math.abs(tiles[g].sprite.x +
                    tiles[g].sprite.width - (a.x + a.width));
                pathParticleArea.right.height = tiles[g].sprite.height;
                this.untintTiles();
                this.hidePath();
                this.showPath(pathParticleArea);
                for (a = e; a <= f; a += 5) tiles[a].sprite.tint = tiletint, "tileX" != tiles[a].sprite.name && (tiles[a].sprite.frameName = "spacetilehig");
                for (a = d; a <= g; a++) tiles[a].sprite.tint = tiletint, "tileX" != tiles[a].sprite.name && (tiles[a].sprite.frameName = "spacetilehig")
            } else if (a.tint == tiletint) {
                for (g = 0; g < blockers.length; g++)
                    if (blockers[g].getChildAt(0).tint == blockertint) {
                        b =
                            blockers[g];
                        c = blockers[g].getChildAt(0);
                        break
                    }
                g = a.x - c.worldPosition.x;
                d = tiles.map(function(a) {
                    return a.sprite.x + "" + a.sprite.y
                }).indexOf(a.x + "" + a.y);
                var k, l, h = 0;
                "player" === c.key ? (k = playerXoffset, l = playerYoffset) : (k = blockerXoffset, l = blockerYoffset);
                f = tiles.map(function(a) {
                    return a.sprite.x + k + "" + (a.sprite.y + l)
                }).indexOf(b.worldPosition.x + "" + b.worldPosition.y);
                g === -k ? 0 < a.y - c.worldPosition.y ? (tiles[f].containsObject = !1, f = this.getTargetIndex("bottom", d), -1 < edgeArray.bottom.indexOf(f) && (h = tile_height), this.moveBlocker({
                    y: tiles[f].sprite.y +
                        l + h
                }, b, c, tiles[f], h)) : (tiles[f].containsObject = !1, e = this.getTargetIndex("top", d), -1 < edgeArray.top.indexOf(e) && (h = -tile_height), this.moveBlocker({
                    y: tiles[e].sprite.y + l + h
                }, b, c, tiles[e], h)) : 0 < g ? (tiles[f].containsObject = !1, g = this.getTargetIndex("right", d), 0 < c.scale.x && (c.scale.x *= -1), -1 < edgeArray.right.indexOf(g) && (h = tile_width), this.moveBlocker({
                    x: tiles[g].sprite.x + k + h
                }, b, c, tiles[g], h)) : (tiles[f].containsObject = !1, d = this.getTargetIndex("left", d), 0 > c.scale.x && (c.scale.x *= -1), -1 < edgeArray.left.indexOf(d) &&
                    (h = -tile_width), this.moveBlocker({
                        x: tiles[d].sprite.x + k + h
                    }, b, c, tiles[d], h))
            }
        }
    },
    moveBlocker: function(a, c, b, d, e) {
        var f = Phaser.Easing.Linear.None;
        this.hidePath();
        a = this.game.add.tween(c).to(a, 1250, f).onUpdateCallback(function() {
            highlightemitter.x = b.worldPosition.x;
            highlightemitter.y = b.worldPosition.y
        }, this);
        a.onStart.add(function() {}, this);
        a.onComplete.add(function() {
            b.y = 0;
            if (0 === e)
                if ("tileX" == d.sprite.name)
                    if ("Brains" == b.name) {
                        if ("undefined" !== typeof FlurryAgent) {
                            var a = {};
                            a.level = level.toString();
                            FlurryAgent.logEvent("Level beat",
                                a)
                        }
                        this.game.global.paused = !0;
                        this.game.global.levelscomplete[level] = 1;
                        level++;
                        4 == this.game.global.levelscomplete[level] && (this.game.global.levelscomplete[level] = 0);
                        this.game.utils.hasLocalStorage && localStorage.setItem("LevelsComplete", JSON.stringify(this.game.global.levelscomplete));
                        sfx.portal.play("", 0, sfx.vol);
                        this.game.add.tween(b).to({
                            rotation: -3.14
                        }, 750, Phaser.Easing.Linear.None, !0);
                        this.game.add.tween(b.scale).to({
                            x: 0,
                            y: 0
                        }, 750, Phaser.Easing.Circular.Out, !0).onComplete.add(function() {
                            this.game.guiplugin.ShowPopup({
                                popupType: "LevelWin",
                                levelNum: level,
                                popupHeight: 200,
                                sfxVol: sfx.vol
                            })
                        }, this)
                    } else d.containsObject = !0, this.rehighlightTile(d.sprite);
            else d.containsObject = !0, this.rehighlightTile(d.sprite);
            else "undefined" !== typeof FlurryAgent && (a = {}, a.level = level.toString(), FlurryAgent.logEvent("Player popped", a)), b.animations.play("pop"), sfx.pop.play("", 0, sfx.vol)
        }, this);
        a.start()
    },
    untintBlockers: function() {
        for (var a = 0; a < blockers.length; a++)
            if ("undefined" != typeof blockers[a].getChildAt(0)) {
                var c = blockers[a].getChildAt(0);
                c.tint = 16777215;
                c.animations.stop("flying");
                c.frame = c.idleframe
            }
    },
    getTargetIndex: function(a, c) {
        var b;
        switch (a) {
            case "top":
                for (b = c; 4 < b;) b -= 5;
                if (c > b)
                    for (var d = c - 5; d >= b; d -= 5)
                        if (tiles[d].containsObject) {
                            b = d + 5;
                            break
                        }
                break;
            case "bottom":
                for (b = c; 20 > b;) b += 5;
                if (c < b)
                    for (d = c + 5; d <= b; d += 5)
                        if (tiles[d].containsObject) {
                            b = d - 5;
                            break
                        }
                break;
            case "left":
                b = c - c % 5;
                if (c > b)
                    for (d = c - 1; d >= b; d--)
                        if (tiles[d].containsObject) {
                            b = d + 1;
                            break
                        }
                break;
            case "right":
                if (b = c + (5 - c % 5) - 1, c < b)
                    for (d = c + 1; d <= b; d++)
                        if (tiles[d].containsObject) {
                            b = d - 1;
                            break
                        }
        }
        return b
    },
    rehighlightTile: function(a) {
        this.game.stage.updateTransform();
        for (var c, b = 0; b < blockers.length; b++)
            if (this.checkOverlap(a, blockers[b].getChildAt(0))) {
                c = blockers[b].getChildAt(0);
                break
            }
        if ("undefined" != typeof c) {
            c.tint = blockertint;
            highlightemitter.x = c.worldPosition.x;
            highlightemitter.y = c.worldPosition.y;
            highlightemitter.setSize(c.width + emitterPadding, c.height + emitterPadding);
            var d = tiles.map(function(a) {
                    return a.sprite.x + "" + a.sprite.y
                }).indexOf(a.x + "" + a.y),
                e = this.getTargetIndex("top", d),
                b = this.getTargetIndex("bottom",
                    d);
            c = this.getTargetIndex("right", d);
            d = this.getTargetIndex("left", d);
            pathParticleArea.top.x = tiles[e].sprite.x;
            pathParticleArea.top.y = tiles[e].sprite.y;
            pathParticleArea.top.width = tiles[e].sprite.width;
            pathParticleArea.top.height = Math.abs(a.y - tiles[e].sprite.y);
            pathParticleArea.bottom.x = a.x;
            pathParticleArea.bottom.y = a.y + a.height;
            pathParticleArea.bottom.width = tiles[b].sprite.width;
            pathParticleArea.bottom.height = Math.abs(a.y + a.height - (tiles[b].sprite.y + tiles[b].sprite.height));
            pathParticleArea.left.x =
                tiles[d].sprite.x;
            pathParticleArea.left.y = tiles[d].sprite.y;
            pathParticleArea.left.width = Math.abs(a.x - tiles[d].sprite.x);
            pathParticleArea.left.height = tiles[d].sprite.height;
            pathParticleArea.right.x = a.x + a.width;
            pathParticleArea.right.y = a.y;
            pathParticleArea.right.width = Math.abs(tiles[c].sprite.x + tiles[c].sprite.width - (a.x + a.width));
            pathParticleArea.right.height = tiles[c].sprite.height;
            this.untintTiles();
            this.showPath(pathParticleArea);
            for (a = e; a <= b; a += 5) tiles[a].sprite.tint = tiletint, "tileX" != tiles[a].sprite.name &&
                (tiles[a].sprite.frameName = "spacetilehig");
            for (a = d; a <= c; a++) tiles[a].sprite.tint = tiletint, "tileX" != tiles[a].sprite.name && (tiles[a].sprite.frameName = "spacetilehig")
        }
    },
    showPath: function(a) {
        if (0 < a.bottom.height) {
            var c = this.game.add.bitmapData(a.bottom.width, a.bottom.height),
                b = c.context.createLinearGradient(0, 0, 0, a.bottom.height);
            b.addColorStop(0, "rgba(255,255,255,0.0)");
            b.addColorStop(.25, "rgba(255,255,255,0.5)");
            b.addColorStop(1, "rgba(255,255,255,0.0)");
            c.context.fillStyle = b;
            c.context.fillRect(0, 0,
                a.bottom.width, a.bottom.height);
            b = this.game.add.sprite(a.bottom.x - tile_width / 2, a.bottom.y - tile_height / 2, c);
            b.alpha = 0;
            c = this.game.add.tween(b).to({
                alpha: 1
            }, 750, "Linear", !0, 0, -1);
            c.yoyo(!0, 250);
            pathgroup.add(b)
        }
        0 < a.top.height && (c = this.game.add.bitmapData(a.top.width, a.top.height), b = c.context.createLinearGradient(0, 0, 0, a.top.height), b.addColorStop(0, "rgba(255,255,255,0.0)"), b.addColorStop(.75, "rgba(255,255,255,0.5)"), b.addColorStop(1, "rgba(255,255,255,0.0)"), c.context.fillStyle = b, c.context.fillRect(0,
            0, a.top.width, a.top.height), b = this.game.add.sprite(a.top.x - tile_width / 2, a.top.y - tile_height / 2, c), b.alpha = 0, c = this.game.add.tween(b).to({
            alpha: 1
        }, 750, "Linear", !0, 0, -1), c.yoyo(!0, 250), pathgroup.add(b));
        0 < a.right.width && (c = this.game.add.bitmapData(a.right.width, a.right.height), b = c.context.createLinearGradient(0, 0, a.right.width, 0), b.addColorStop(0, "rgba(255,255,255,0.0)"), b.addColorStop(.25, "rgba(255,255,255,0.5)"), b.addColorStop(1, "rgba(255,255,255,0.0)"), c.context.fillStyle = b, c.context.fillRect(0, 0,
            a.right.width, a.right.height), b = this.game.add.sprite(a.right.x - tile_width / 2, a.right.y - tile_height / 2, c), b.alpha = 0, c = this.game.add.tween(b).to({
            alpha: 1
        }, 750, "Linear", !0, 0, -1), c.yoyo(!0, 250), pathgroup.add(b));
        0 < a.left.width && (c = this.game.add.bitmapData(a.left.width, a.left.height), b = c.context.createLinearGradient(0, 0, a.left.width, 0), b.addColorStop(0, "rgba(255,255,255,0.0)"), b.addColorStop(.75, "rgba(255,255,255,0.5)"), b.addColorStop(1, "rgba(255,255,255,0.0)"), c.context.fillStyle = b, c.context.fillRect(0,
            0, a.left.width, a.left.height), a = this.game.add.sprite(a.left.x - tile_width / 2, a.left.y - tile_height / 2, c), a.alpha = 0, c = this.game.add.tween(a).to({
            alpha: 1
        }, 750, "Linear", !0, 0, -1), c.yoyo(!0, 250), pathgroup.add(a))
    },
    hidePath: function() {
        this.game.tweens.removeFrom(pathgroup);
        pathgroup.destroy(!0, !0)
    },
    update: function() {
        blackhole.angle -= 4
    }
};
Phaser.Plugin.TransitionPlugin = function(a, c) {
    Phaser.Plugin.call(this, a, c)
};
Phaser.Plugin.TransitionPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.TransitionPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;
Phaser.Plugin.TransitionPlugin.prototype.TransitionOut = function(a, c, b, d) {
    var e;
    switch (a) {
        case "circle":
            e = this.game.add.graphics(this.game.width / 2, this.game.height / 2), e.beginFill(0), e.drawCircle(0, 0, this.game.width + 200)
    }
    this.game.stage.mask = e;
    a = this.game.add.tween(e.scale);
    a.to({
        x: 0,
        y: 0
    }, c, Phaser.Easing.Linear.None);
    a.onComplete.add(function() {
        this.game.state.start(b, !0, !1, d)
    }, this);
    a.start()
};
Phaser.Plugin.TransitionPlugin.prototype.TransitionIn = function(a, c) {
    var b;
    switch (a) {
        case "circle":
            b = this.game.add.graphics(this.game.width / 2, this.game.height / 2), b.beginFill(16777215), b.drawCircle(0, 0, this.game.width + 200)
    }
    this.game.stage.mask = b;
    b.scale.x = 0;
    b.scale.y = 0;
    var d = this.game.add.tween(b.scale);
    d.to({
        x: 1,
        y: 1
    }, c, Phaser.Easing.Linear.None);
    d.onComplete.add(function() {
        b.destroy()
    }, this);
    d.start()
};
Phaser.Plugin.GuiPlugin = function(a, c) {
    Phaser.Plugin.call(this, a, c);
    this.PopupGroup = null;
    this.TopMid;
    this.BotMid;
    this.TopBorder;
    this.BotBorder;
    this.TopMask;
    this.BotMask;
    this.slideUpOpenTween;
    this.slideDownOpenTween;
    this.slideUpCloseTween;
    this.slideDownCloseTween;
    this.buttonPaddingY = 46;
    this.buttonPaddingX = 56;
    this.sfx = {
        vol: .1,
        tap: null,
        award: null
    }
};
Phaser.Plugin.GuiPlugin.prototype = Object.create(Phaser.Plugin.prototype);
Phaser.Plugin.GuiPlugin.prototype.constructor = Phaser.Plugin.SamplePlugin;
Phaser.Plugin.GuiPlugin.prototype.ShowPopup = function(a) {
    this.game.global.paused = !0;
    this.PopupGroup instanceof Phaser.Group && (this.PopupGroup.destroy(), this.PopupGroup = null);
    this.PopupGroup = this.game.add.group();
    this._showPopup(a)
};
Phaser.Plugin.GuiPlugin.prototype._nextLevel = function(a) {
    var c = a.scale.x + .1,
        b = a.scale.y + .1;
    this.sfx.tap.play("", 0, this.sfx.vol);
    this.game.add.tween(a.scale).to({
        x: c,
        y: b
    }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
        this.game.state.start("TheGame", !0, !1, a.levelindex, this.sfx.vol)
    }, this)
};
Phaser.Plugin.GuiPlugin.prototype._selectLevel = function(a) {
    var c = a.scale.x + .1,
        b = a.scale.y + .1;
    this.sfx.tap.play("", 0, this.sfx.vol);
    this.game.add.tween(a.scale).to({
        x: c,
        y: b
    }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
        this.game.state.start("LevelSelect", !0, !1, this.sfx.vol)
    }, this)
};
Phaser.Plugin.GuiPlugin.prototype._closeInfo = function(a) {
    var c = a.scale.x + .1,
        b = a.scale.y + .1;
    this.sfx.tap.play("", 0, this.sfx.vol);
    this.game.add.tween(a.scale).to({
        x: c,
        y: b
    }, 100, Phaser.Easing.Linear.None, !0, 0, 0, !0).onComplete.add(function() {
        this.HidePopup()
    }, this)
};
Phaser.Plugin.GuiPlugin.prototype._showPopup = function(a) {
    this.TopMid = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 1, "popupmid");
    this.TopMid.anchor.set(.5, 1);
    this.BotMid = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY - 1, "popupmid");
    this.BotMid.anchor.set(.5, 0);
    this.TopBorder = this.game.add.sprite(this.game.world.centerX, this.game.world.centerY + 1, "popupbordertop");
    this.TopBorder.anchor.set(.5, 1);
    this.TopBorder.scale.set(0);
    this.BotBorder = this.game.add.sprite(this.game.world.centerX,
        this.game.world.centerY - 1, "popupborderbottom");
    this.BotBorder.anchor.set(.5, 0);
    this.BotBorder.scale.set(0);
    this.TopMask = this.game.add.graphics(0, this.TopBorder.y);
    this.TopMask.beginFill(16777215);
    this.TopMask.drawRect(0, 0, this.game.width, this.TopMid.height);
    this.TopMid.mask = this.TopMask;
    this.BotMask = this.game.add.graphics(0, 0);
    this.BotMask.beginFill(16777215);
    this.BotMask.drawRect(0, 0, this.game.width, this.BotBorder.y);
    this.BotMid.mask = this.BotMask;
    this.PopupGroup.add(this.TopMid);
    this.PopupGroup.add(this.BotMid);
    this.PopupGroup.add(this.TopBorder);
    this.PopupGroup.add(this.BotBorder);
    this.PopupGroup.add(this.TopMask);
    this.PopupGroup.add(this.BotMask);
    this.game.world.bringToTop(this.PopupGroup);
    this.slideUpOpenTween = this.game.add.tween(this.TopBorder).to({
        y: this.TopMid.y - parseInt(a.popupHeight) / 2
    }, 1E3, Phaser.Easing.Elastic.Out, !1).onUpdateCallback(function() {
        this.TopMask.y = this.TopBorder.y
    }, this);
    this.slideDownOpenTween = this.game.add.tween(this.BotBorder).to({
            y: this.BotMid.y + parseInt(a.popupHeight) / 2
        }, 1E3,
        Phaser.Easing.Elastic.Out, !1).onUpdateCallback(function() {
        this.BotMask.y = this.BotBorder.y - this.game.world.centerY + 1
    }, this);
    switch (a.popupType) {
        case "LevelWin":
            this.slideDownOpenTween.onComplete.add(function() {
                this.sfx.tap = this.game.add.audio("tap");
                this.sfx.award = this.game.add.audio("award");
                this.sfx.vol = a.sfxVol;
                var b = this.game.add.button(this.BotBorder.x + this.BotBorder.width / 2 - this.buttonPaddingX, this.BotBorder.y - this.buttonPaddingY, "buttons", this._nextLevel, this);
                b.anchor.setTo(.5);
                b.scale.setTo(.75);
                b.frameName = "play";
                b.levelindex = a.levelNum;
                var c = this.game.add.button(this.BotBorder.x - this.BotBorder.width / 2 + this.buttonPaddingX, this.BotBorder.y - this.buttonPaddingY, "buttons", this._selectLevel, this);
                c.anchor.setTo(.5);
                c.scale.setTo(.75);
                c.frameName = "levels";
                this.PopupGroup.add(b);
                this.PopupGroup.add(c);
                b.mask = this.BotMask;
                c.mask = this.BotMask;
                var f = this.game.add.sprite(this.TopMid.x, this.TopMid.y, "award");
                f.anchor.set(.5, .5);
                f.scale.set(0);
                var g = !1,
                    k = this.game.add.emitter(f.x, f.y, 30);
                k.makeParticles("sqparticle");
                k.setScale(2, 0, 2, 0, 5E3);
                k.setAlpha(1, 0, 5E3);
                b = this.game.add.tween(f.scale).to({
                    x: 2,
                    y: 2
                }, 1E3, Phaser.Easing.Elastic.Out, !1, 500);
                b.onUpdateCallback(function() {
                    !g && 1.5 < f.scale.x && (k.start(!0, 5E3, null, 30), g = !0, this.sfx.award.play("", 0, this.sfx.vol))
                }, this);
                b.start()
            }, this);
            break;
        case "LevelWinold":
            var c = this.game.add.sprite(0, 0, "gui_popup_box");
            c.anchor.setTo(.5);
            var b = this.game.add.bitmapText(0, 0, "brady", String(a.text), 48);
            b.anchor.setTo(.5);
            this.PopupGroup.add(c);
            this.PopupGroup.add(b);
            this.PopupGroup.scale.setTo(0);
            this.game.world.bringToTop(this.PopupGroup);
            this.game.add.tween(this.PopupGroup.scale).to({
                x: 1,
                y: 1
            }, 1E3, Phaser.Easing.Elastic.Out, !0, 500);
            break;
        case "GameInfo":
            this.slideDownOpenTween.onComplete.add(function() {
                this.sfx.tap = this.game.add.audio("tap");
                this.sfx.vol = a.sfxVol;
                var b = this.game.add.text(this.TopMid.x, this.TopMid.y, "DarkMitra", {
                    font: "28px whitespaceregular",
                    fill: "#ffffff",
                    align: "center",
                    wordWrap: !0,
                    wordWrapWidth: 300
                });
                b.anchor.setTo(.5, 1);
                b.lineSpacing = -14;
                b.stroke = "#000000";
                b.strokeThickness = 6;
                this.PopupGroup.add(b);
                b.mask = this.TopMask;
                b = this.game.add.button(this.BotBorder.x - this.BotBorder.width / 2 + this.buttonPaddingX - 15, this.BotBorder.y - this.buttonPaddingY + 15, "buttons", this._closeInfo, this);
                b.anchor.setTo(.5);
                b.scale.setTo(.5);
                b.frameName = "back";
                this.PopupGroup.add(b);
                b.mask = this.BotMask
            }, this)
    }
    this.game.add.tween(this.TopBorder.scale).to({
        x: 1
    }, 500, Phaser.Easing.Exponential.Out, !0, 250).onUpdateCallback(function() {
        this.BotBorder.scale.x = this.BotBorder.scale.y = this.TopBorder.scale.y =
            this.TopBorder.scale.x
    }, this).onComplete.add(function() {
        this.slideUpOpenTween.start();
        this.slideDownOpenTween.start()
    }, this)
};
Phaser.Plugin.GuiPlugin.prototype.HidePopup = function() {
    this.PopupGroup instanceof Phaser.Group && (this.slideUpCloseTween = this.game.add.tween(this.TopBorder).to({
        y: this.game.world.centerY + 1
    }, 1E3, Phaser.Easing.Exponential.Out, !1).onUpdateCallback(function() {
        this.TopMask.y = this.TopBorder.y
    }, this), this.slideDownCloseTween = this.game.add.tween(this.BotBorder).to({
        y: this.game.world.centerY - 1
    }, 1E3, Phaser.Easing.Exponential.Out, !1).onUpdateCallback(function() {
        this.BotMask.y = this.BotBorder.y - this.game.world.centerY +
            1
    }, this), this.slideDownCloseTween.onComplete.add(function() {
        var a = this.game.add.tween(this.TopBorder.scale).to({
            x: 0
        }, 500, Phaser.Easing.Exponential.Out, !1).onUpdateCallback(function() {
            this.BotBorder.scale.x = this.BotBorder.scale.y = this.TopBorder.scale.y = this.TopBorder.scale.x
        }, this);
        a.onComplete.add(function() {
            this.PopupGroup.destroy();
            this.PopupGroup = null;
            this.game.global.paused = !1
        }, this);
        a.start()
    }, this), this.slideUpCloseTween.start(), this.slideDownCloseTween.start())
};