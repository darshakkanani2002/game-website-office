var $jscomp = $jscomp || {};
$jscomp.scope = {};
$jscomp.ASSUME_ES5 = !1;
$jscomp.ASSUME_NO_NATIVE_MAP = !1;
$jscomp.ASSUME_NO_NATIVE_SET = !1;
$jscomp.SIMPLE_FROUND_POLYFILL = !1;
$jscomp.objectCreate = $jscomp.ASSUME_ES5 || "function" == typeof Object.create ? Object.create : function(a) {
    var b = function() {};
    b.prototype = a;
    return new b
};
$jscomp.underscoreProtoCanBeSet = function() {
    var a = {
            a: !0
        },
        b = {};
    try {
        return b.__proto__ = a, b.a
    } catch (f) {}
    return !1
};
$jscomp.setPrototypeOf = "function" == typeof Object.setPrototypeOf ? Object.setPrototypeOf : $jscomp.underscoreProtoCanBeSet() ? function(a, b) {
    a.__proto__ = b;
    if (a.__proto__ !== b) throw new TypeError(a + " is not extensible");
    return a
} : null;
$jscomp.inherits = function(a, b) {
    a.prototype = $jscomp.objectCreate(b.prototype);
    a.prototype.constructor = a;
    if ($jscomp.setPrototypeOf) {
        var f = $jscomp.setPrototypeOf;
        f(a, b)
    } else
        for (f in b)
            if ("prototype" != f)
                if (Object.defineProperties) {
                    var g = Object.getOwnPropertyDescriptor(b, f);
                    g && Object.defineProperty(a, f, g)
                } else a[f] = b[f];
    a.superClass_ = b.prototype
};
console.log("Build version 1.1");
var game_music, _ad_type = "";
window.GD_OPTIONS = {
    gameId: "5df1a10316bc40a0968d71cce49f02f5",
    onEvent: function(a) {
        switch (a.name) {
            case "SDK_GAME_START":
                game_music.setMute(!1);
                _ad_type = "";
                break;
            case "SDK_GAME_PAUSE":
                game_music.setMute(!0)
        }
    }
};
(function(a, b, f) {
    var g = a.getElementsByTagName(b)[0];
    a.getElementById(f) || (a = a.createElement(b), a.id = f,
        a.src = "",
        g.parentNode.insertBefore(a, g))
})(document, "script", "gamedistribution-jssdk");
var Boot = function() {
    return Phaser.Scene.call(this, "boot") || this
};
$jscomp.inherits(Boot, Phaser.Scene);
Boot.prototype.preload = function() {
    this.load.image("background", "img/background.png");
    this.load.image("bar", "img/bar.png");
    this.load.image("progress", "img/progress.png");
    this.load.image("game_title", "img/game_title.png");
    this.load.image("btn_start", "img/btn_start.png")
};
Boot.prototype.create = function() {
    this.scene.start("load")
};
var Load = function() {
    return Phaser.Scene.call(this, "load") || this
};
$jscomp.inherits(Load, Phaser.Scene);
Load.prototype.preload = function() {
    this.add.sprite(360, 540, "background");
    var a = this.add.sprite(360, 300, "game_title");
    this.tweens.add({
        targets: a,
        y: a.y + 30,
        duration: 2E3,
        ease: "Sine.easeInOut",
        yoyo: !0,
        loop: -1
    });
    this.tweens.add({
        targets: a,
        scaleX: 1.05,
        duration: 800,
        ease: "Sine.easeInOut",
        yoyo: !0,
        loop: -1
    });
    var b = this.add.sprite(360, 750, "bar"),
        f = this.add.tileSprite(91, 745, 1, 32, "progress");
    f.setOrigin(0, .5);
    this.load.on("progress", function(a) {
        f.setScale(538 * a, 1)
    });
    this.load.spritesheet("blocks", "img/blocks.png", {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.spritesheet("p", "img/p.png", {
        frameWidth: 64,
        frameHeight: 64
    });
    this.load.spritesheet("stars", "img/stars.png", {
        frameWidth: 186,
        frameHeight: 70
    });
    this.load.spritesheet("stars_small", "img/stars_small.png", {
        frameWidth: 64,
        frameHeight: 26
    });
    this.load.spritesheet("blocks_small", "img/blocks_small.png", {
        frameWidth: 50,
        frameHeight: 50
    });
    this.load.image("btn_home", "img/btn_home.png");
    this.load.image("btn_sound", "img/btn_sound.png");
    this.load.image("btn_sound_off", "img/btn_sound_off.png");
    this.load.image("btn_info", "img/btn_info.png");
    this.load.image("btn_music", "img/btn_music.png");
    this.load.image("btn_music_off", "img/btn_music_off.png");
    this.load.image("btn_restart", "img/btn_restart.png");
    this.load.image("btn_play", "img/btn_play.png");
    this.load.image("btn_arrow_up", "img/btn_arrow_up.png");
    this.load.image("btn_arrow_down", "img/btn_arrow_down.png");
    this.load.image("footer", "img/footer.png");
    this.load.image("header", "img/header.png");
    this.load.image("line", "img/line.png");
    this.load.image("grid",
        "img/grid.png");
    this.load.image("target_bar", "img/target_bar.png");
    this.load.image("target_on", "img/target_on.png");
    this.load.image("target_done", "img/target_done.png");
    this.load.image("btn_restart2", "img/btn_restart2.png");
    this.load.image("btn_menu", "img/btn_menu.png");
    this.load.image("btn_next", "img/btn_next.png");
    this.load.image("btn_yes", "img/btn_yes.png");
    this.load.image("btn_no", "img/btn_no.png");
    this.load.image("btn_yes2", "img/btn_yes2.png");
    this.load.image("btn_no2", "img/btn_no2.png");
    this.load.image("reward_title",
        "img/reward_title.png");
    this.load.image("win_win", "img/win_win.png");
    this.load.image("win_lose", "img/win_lose.png");
    this.load.image("win_prompt", "img/win_prompt.png");
    this.load.image("mascot", "img/mascot.png");
    this.load.image("glow", "img/glow.png");
    this.load.image("blue", "img/blue.png");
    this.load.image("loading", "img/loading.png");
    this.load.image("horizontal", "img/horizontal.png");
    this.load.image("vertical", "img/vertical.png");
    this.load.image("boom", "img/boom.png");
    this.load.image("blend", "img/blend.png");
    this.load.image("lvl_unlock", "img/lvl_unlock.png");
    this.load.image("lvl_current", "img/lvl_current.png");
    this.load.image("lvl_lock", "img/lvl_lock.png");
    this.load.image("map1", "img/map1.png");
    this.load.image("map2", "img/map2.png");
    this.load.image("map3", "img/map3.png");
    this.load.image("window", "img/window.png");
    this.load.image("about", "img/about.png");
    this.load.image("arrow_current", "img/arrow_current.png");
    this.load.audio("completed", "audio/completed.mp3");
    this.load.audio("gameover", "audio/gameover.mp3");
    this.load.audio("click", "audio/click.mp3");
    this.load.audio("swap", "audio/swap.mp3");
    this.load.audio("blop", "audio/blop.mp3");
    this.load.audio("positive", "audio/positive.mp3");
    this.load.audio("break", "audio/break.mp3");
    this.load.audio("boom", "audio/boom.mp3");
    this.load.audio("music", "audio/music.mp3");
    this.load.audio("level_click", "audio/level_click.mp3");
    this.load.json("map", "map.json");
    for (a = 1; a <= game_data.total_level; a++) this.load.json("level-" + a, "level/level-" + a + ".json");
    this.load.once("complete",
        function() {
            b.destroy();
            f.destroy()
        }.bind(this))
};
Load.prototype.create = function() {
    var a = localStorage.getItem("rf_magicmatch");
    null != a && (a = JSON.parse(a), game_data.unlocked_level = Number(a.unlocked), levels_star = a.stars);
    a = this.add.sprite(360, 750, "btn_start").setInteractive();
    this.tweens.add({
        targets: a,
        scaleY: 1.1,
        scaleX: 1.1,
        yoyo: !0,
        loop: -1,
        duration: 600,
        ease: "Sine.easeOut"
    });
    this.input.on("gameobjectdown", function(a, f) {
        this.scene.start("menu")
    }, this)
};
var Menu = function() {
    return Phaser.Scene.call(this, "menu") || this
};
$jscomp.inherits(Menu, Phaser.Scene);
Menu.prototype.create = function() {
    function a() {
        b = "preinfo";
        g = f.add.container(360, 540);
        g.setDepth(1);
        var a = f.add.rectangle(360, 540, 720, 1080, 0);
        a.alpha = 0;
        a.name = "dark";
        f.tweens.add({
            targets: a,
            alpha: .7,
            duration: 200
        });
        var e = f.add.sprite(0, -12, "window"),
            k = f.add.sprite(0, -30, "about");
        g.add([e, k]);
        g.setScale(0);
        f.tweens.add({
            targets: g,
            scaleX: 1,
            duration: 400,
            ease: "Back.easeOut"
        });
        f.tweens.add({
            targets: g,
            scaleY: 1,
            duration: 500,
            ease: "Back.easeOut",
            onComplete: function() {
                g.add(a);
                a.setPosition(0, 0);
                g.sendToBack(a);
                b = "info"
            }
        })
    }
    play_music("music", this);
    var b = "play",
        f = this,
        g;
    this.add.sprite(360, 540, "background");
    var r = this.add.sprite(360, 300, "game_title");
    this.tweens.add({
        targets: r,
        y: r.y + 30,
        duration: 2E3,
        ease: "Sine.easeInOut",
        yoyo: !0,
        loop: -1
    });
    this.tweens.add({
        targets: r,
        scaleX: 1.05,
        duration: 800,
        ease: "Sine.easeInOut",
        yoyo: !0,
        loop: -1
    });
    var k = this.add.sprite(-260, 400, "mascot");
    k.setScale(.7);
    setTimeout(function() {
        this.tweens.add({
            targets: k,
            x: 1E3,
            duration: 2500,
            onComplete: function() {
                k.setScale(1);
                k.x = -420;
                k.y = 600;
                f.tweens.add({
                    targets: k,
                    x: 150,
                    duration: 1E3,
                    ease: "Sine.easeInOut"
                });
                f.tweens.add({
                    targets: k,
                    y: k.y + 20,
                    duration: 1E3,
                    ease: "Sine.easeInOut",
                    yoyo: !0,
                    loop: -1
                })
            }
        })
    }.bind(this), 100);
    this.tweens.add({
        targets: k,
        rotation: k.rotation + .2,
        duration: 1E3,
        ease: "Sine.easeInOut",
        yoyo: !0,
        loop: -1
    });
    draw_button(360, 700, "play", this);
    r = draw_button(240, 820, "sound", this);
    var A = draw_button(360, 820, "music", this);
    draw_button(480, 820, "info", this);
    game_data.music || A.setTexture("btn_music_off");
    game_data.sound || r.setTexture("btn_sound_off");
    this.input.on("gameobjectdown",
        function(k, e) {
            e.button && (play_sound("click", this), this.tweens.add({
                targets: e,
                scaleX: .9,
                scaleY: .9,
                ease: "Linear",
                duration: 100,
                yoyo: !0,
                onComplete: function() {
                    "play" === b ? "play" === e.name ? fade("in", f).then(function(a) {
                        // show_ad();
                        f.scene.start("map")
                    }) : "sound" === e.name ? switch_audio("sound", e) : "music" === e.name ? switch_audio("music", e, f) : "info" === e.name && a() : "restart2" === e.name || "yes_restart" === e.name ? f.scene.start("game") : "no" === e.name && remove_popup(g, f).then(function(a) {
                        g.destroy(!0, !0);
                        b = "play"
                    })
                }
            }))
        }, this);
    this.input.on("pointerdown", function() {
        "info" === b && (b = "preplay", remove_popup(g, f).then(function(a) {
            g.destroy(!0, !0);
            b = "play"
        }))
    }, this)
};
var LevelMap = function() {
    return Phaser.Scene.call(this, "map") || this
};
$jscomp.inherits(LevelMap, Phaser.Scene);
LevelMap.prototype.create = function() {
    function a(a) {
        "up" === a ? 0 < k.y - 360 && (b(), g.tweens.add({
            targets: k,
            y: k.y - 360,
            duration: 300,
            ease: "Sine.easeInOut",
            onComplete: function() {
                f()
            }
        })) : 4320 > k.y + 360 && (b(), g.tweens.add({
            targets: k,
            y: k.y + 360,
            duration: 300,
            ease: "Sine.easeInOut",
            onComplete: function() {
                f()
            }
        }))
    }

    function b() {
        c.setVisible(!1);
        l.setVisible(!1);
        t.setVisible(!1)
    }

    function f() {
        t.y = A.scrollY + 80;
        c.y = A.scrollY + 80;
        l.y = A.scrollY + 1E3;
        c.setVisible(!0);
        l.setVisible(!0);
        t.setVisible(!0);
        l.visible && Math.round(A.scrollY) ===
            4320 - config.height ? l.setVisible(!1) : l.setVisible(!0);
        c.visible && 0 === Math.round(A.scrollY) ? c.setVisible(!1) : c.setVisible(!0)
    }
    var g = this,
        r = this.cache.json.get("map"),
        k = this.add.rectangle(360, 3960, 30, 30, 1048575);
    this.cameras.main.setBounds(0, 0, 720, 4320);
    this.cameras.main.startFollow(k, !0);
    for (var A = this.cameras.main, z = 3, e = 0; 6 > e; e++) this.add.sprite(0, 720 * e, "map" + z).setOrigin(0), z--, 1 > z && (z = 3);
    z = r.length;
    for (e = 0; e < z; e++) {
        var p = "lvl_lock";
        e + 1 < game_data.unlocked_level ? p = "lvl_unlock" : e + 1 === game_data.unlocked_level &&
            (p = "lvl_current");
        p = this.add.sprite(r[e][1], r[e][2], p);
        if (e + 1 === game_data.unlocked_level) {
            var d = p.x;
            var y = p.y
        }
        e + 1 <= game_data.unlocked_level && (p.setInteractive(), p.id = e + 1, this.add.text(p.x, p.y - 20, String(e + 1), {
            fontFamily: "impact",
            fontSize: 28,
            align: "center",
            color: "#FFFFFF"
        }).setOrigin(.5));
        e + 1 < game_data.unlocked_level && this.add.sprite(p.x, p.y + 10, "stars_small").setFrame(levels_star[e])
    }
    r = this.add.sprite(d, y - 80, "arrow_current");
    this.tweens.add({
        targets: r,
        y: r.y - 30,
        yoyo: !0,
        loop: -1,
        duration: 600
    });
    fade("out",
        this);
    var t = draw_button(80, 100, "home", this),
        c = draw_button(360, 0, "arrow_up", this);
    this.tweens.add({
        targets: c,
        scaleX: .85,
        scaleY: .85,
        yoyo: !0,
        loop: -1,
        duration: 500
    });
    var l = draw_button(360, 0, "arrow_down", this);
    this.tweens.add({
        targets: l,
        scaleX: .85,
        scaleY: .85,
        yoyo: !0,
        loop: -1,
        duration: 500
    });
    f();
    this.input.keyboard.on("keydown", function(d) {
        "ArrowUp" === d.key ? a("up") : "ArrowDown" === d.key && a("down")
    }, this);
    this.input.on("gameobjectdown", function(d, b) {
        b.button ? (play_sound("click", g), "arrow_up" === b.name ? a("up") :
            "arrow_down" === b.name ? a("down") : "home" === b.name && this.tweens.add({
                targets: b,
                scaleX: .9,
                scaleY: .9,
                ease: "Linear",
                duration: 100,
                yoyo: !0,
                onComplete: function() {
                    g.scene.start("menu")
                }
            })) : (play_sound("level_click", g), game_data.cur_level = b.id, fade("in", g).then(function(a) {
            g.scene.start("game")
        }))
    }, this)
};
var Game = function() {
    return Phaser.Scene.call(this, "game") || this
};
$jscomp.inherits(Game, Phaser.Scene);
Game.prototype.create = function() {
    function a(a) {
        m = "drop";
        q.drop().then(function(d) {
            q.respawn(a).then(function(a) {
                0 >= game_data.cur_moves ? (m = "over", a = Math.round(4 * Math.random()), game_data.enable_reward || (a = 4), 2 >= a && !G && game_data.reward.loaded ? (G = !0, setTimeout(A, 1E3)) : setTimeout(z, 1E3)) : r("ffff")
            })
        });
        q.clear("reset");
        q.clear("matching")
    }

    function b(b, u, h) {
        var x = q.get("array"),
            g = 2,
            w = 0,
            c = 0;
        if ("horizontal" === u) {
            var e = 1;
            if ("left" === h) {
                w = game_data.size;
                var k = 1;
                var m = .5;
                var D = 0;
                var r = .5;
                for (var n = b.pos_x; 0 <
                    n && (g++, x[b.pos_y][n].filled && !x[b.pos_y][n].blank); n--);
            } else if ("right" === h)
                for (g = 1, w = -1 * game_data.size, k = 0, m = .5, D = 1, r = .5, n = b.pos_x; n < game_data.row && x[b.pos_y][n].filled && !x[b.pos_y][n].blank; n++) g++
        } else if ("vertical" === u)
            if (e = 1, "up" === h)
                for (g = 1, c = game_data.size, k = 1, m = .5, D = 0, r = .5, n = b.pos_y; 0 < n && (g++, x[n][b.pos_x].filled && !x[n][b.pos_x].blank); n--);
            else {
                if ("down" === h)
                    for (g = 1, c = -1 * game_data.size, k = 0, m = .5, D = 1, r = .5, n = b.pos_y; n < game_data.col && x[n][b.pos_x].filled && !x[n][b.pos_x].blank; n++) g++
            }
        else if ("boom" ===
            u) {
            n = b.pos_x - 1;
            var l = b.pos_x + 1,
                p = b.pos_y - 1,
                E = b.pos_y + 1;
            0 > n && (n = 0);
            l >= game_data.row && (l = game_data.row - 1);
            0 > p && (p = 0);
            E >= game_data.col && (E = game_data.col - 1);
            for (var t = n; t <= l; t++)
                for (var C = p; C <= E; C++) !x[C][t].blank && x[C][t].filled && (B.setPosition(game_data.start_x + t * game_data.size, game_data.start_y + C * game_data.size), B.explode());
            x = q.booster_removal({
                x: n,
                y: p,
                xx: l,
                yy: E
            }, u);
            0 < x.length && f(x);
            a(0)
        }
        if (1 == e) {
            var v = d.add.sprite(b.x + w, b.y + c, "blend").setBlendMode(Phaser.BlendModes.ADD);
            "vertical" === u && (v.rotation =
                1.5708);
            v.setOrigin(k, m);
            v.setDepth(3);
            d.tweens.add({
                targets: v,
                displayWidth: g * game_data.size,
                duration: 200,
                ease: "Sine.easeOut",
                onComplete: function() {
                    if ("left" === h || "down" === h) {
                        var w = q.booster_removal({
                            x: b.pos_x,
                            y: b.pos_y
                        }, u);
                        0 < w.length && f(w);
                        a(0)
                    }
                    v.setOrigin(D, r);
                    "left" === h ? v.x -= game_data.size * g : "right" === h ? v.x += game_data.size * g : "up" === h ? v.y -= game_data.size * g : "down" === h && (v.y += game_data.size * g);
                    d.tweens.add({
                        targets: v,
                        scaleX: 0,
                        duration: 200,
                        ease: "Sine.easeIn",
                        onComplete: function() {
                            v.destroy(!0, !0)
                        }
                    })
                }
            })
        }
    }

    function f(a) {
        for (var b = a.length, f = t.blocks.getChildren(), g = [], h = 0, w = [], c = 0; c < b; c++)
            for (var e = a[c], k = 0; 3 > k; k++)
                if (e.frame === game_data.targets[k] && 0 < game_data.values[k]) {
                    h++;
                    if (0 === g.length) g.push(k);
                    else {
                        e = !1;
                        for (var l = 0; l < g.length; l++)
                            if (g[l] === k) {
                                e = !0;
                                break
                            }
                        e || g.push(k)
                    }
                    break
                }
        c = {};
        for (k = 0; k < b; c = {
                $jscomp$loop$prop$sound_ex$19: c.$jscomp$loop$prop$sound_ex$19,
                $jscomp$loop$prop$o$13$20: c.$jscomp$loop$prop$o$13$20
            }, k++) {
            e = a[k];
            var p = -1;
            l = Math.round(700 + e.y);
            for (var q = 0; 3 > q; q++)
                if (e.frame === game_data.targets[q] &&
                    0 < game_data.values[q]) {
                    var n = f[q].x;
                    var y = f[q].y;
                    p = q;
                    break
                }
            if (0 <= p) {
                c.$jscomp$loop$prop$sound_ex$19 = !1;
                p = w.length;
                for (q = 0; q < p; q++)
                    if (Math.round(e.y) === w[q]) {
                        c.$jscomp$loop$prop$sound_ex$19 = !0;
                        break
                    }
                c.$jscomp$loop$prop$sound_ex$19 || w.push(Math.round(e.y));
                0 === p && w.push(Math.round(e.y));
                c.$jscomp$loop$prop$o$13$20 = d.add.sprite(e.x, e.y, "blocks");
                c.$jscomp$loop$prop$o$13$20.setDepth(2);
                c.$jscomp$loop$prop$o$13$20.setFrame(e.frame);
                d.tweens.add({
                    targets: c.$jscomp$loop$prop$o$13$20,
                    y: y,
                    ease: "Back.easeIn",
                    duration: l,
                    onComplete: function(b) {
                        return function() {
                            b.$jscomp$loop$prop$sound_ex$19 || play_sound("blop", d);
                            b.$jscomp$loop$prop$o$13$20.destroy(!0, !0);
                            h--;
                            if (0 === h) {
                                for (var u = a.length, c = 0; c < u; c++)
                                    for (var e = 0; 3 > e; e++) game_data.targets[e] === a[c].frame && (game_data.values[e]--, 0 > game_data.values[e] && (game_data.values[e] = 0));
                                u = t.value.getLength();
                                c = t.value.getChildren();
                                for (e = 0; e < u; e++) {
                                    var w = c[e];
                                    w.setText(String(game_data.values[e]));
                                    0 === game_data.values[e] && (w.setVisible(!1), t.bar.getChildren()[e].setTexture("target_done"))
                                }
                                "wait" !==
                                m && "play" !== m || r("hahahah " + m);
                                for (u = 0; u < g.length; u++) d.tweens.add({
                                    targets: f[g[u]],
                                    scaleX: 1.5,
                                    scaleY: 1.5,
                                    duration: 200,
                                    yoyo: !0
                                }), 0 === game_data.values[g[u]] && (B.setPosition(f[g[u]].x, f[g[u]].y), B.explode(), play_sound("positive", d))
                            }
                        }
                    }(c)
                });
                d.tweens.add({
                    targets: c.$jscomp$loop$prop$o$13$20,
                    x: n,
                    scaleX: .8,
                    scaleY: .8,
                    rotation: 6.28319,
                    ease: "Sine.easeIn",
                    duration: l
                })
            }
        }
    }

    function g() {
        game_data.cur_moves <= game_data.moves / 4 ? y.setFrame(1) : game_data.cur_moves <= game_data.moves / 2 ? y.setFrame(2) : y.setFrame(3);
        I.setText("MOVES\n" +
            game_data.cur_moves)
    }

    function r(a) {
        if ("drop" === m || "play" === m) {
            a = !0;
            for (var b = 0; 3 > b; b++) 0 < game_data.values[b] && (a = !1);
            a ? (m = "comp", setTimeout(e, 1E3)) : m = "play"
        }
    }

    function k(a) {
        m = a;
        h = d.add.container(360, 540);
        h.setDepth(1);
        var b = d.add.rectangle(360, 540, 720, 1080, 0);
        b.alpha = 0;
        b.name = "dark";
        d.tweens.add({
            targets: b,
            alpha: .7,
            duration: 200
        });
        var g = d.add.sprite(0, -12, "win_prompt"),
            e = d.add.text(0, -108, "Are you sure?", {
                fontFamily: "impact",
                fontSize: 60,
                align: "center",
                color: "#F5603E"
            }).setOrigin(.5),
            f = d.add.sprite(0,
                4, "btn_yes").setInteractive();
        f.button = !0;
        f.name = "yes_" + a;
        a = d.add.sprite(0, 100, "btn_no").setInteractive();
        a.button = !0;
        a.name = "no";
        h.add([g, e, f, a]);
        h.setScale(0);
        d.tweens.add({
            targets: h,
            scaleX: 1,
            duration: 400,
            ease: "Back.easeOut"
        });
        d.tweens.add({
            targets: h,
            scaleY: 1,
            duration: 500,
            ease: "Back.easeOut",
            onComplete: function() {
                h.add(b);
                b.setPosition(0, 0);
                h.sendToBack(b)
            }
        })
    }

    function A(a) {
        m = "reward";
        h = d.add.container(360, 540);
        h.setDepth(1);
        var b = d.add.rectangle(360, 540, 720, 1080, 0);
        b.alpha = 0;
        b.name = "dark";
        d.tweens.add({
            targets: b,
            alpha: .7,
            duration: 200
        });
        a = d.add.sprite(0, -12, "window");
        var g = d.add.sprite(0, -128, "reward_title"),
            e = d.add.sprite(0, 24, "btn_yes2").setInteractive();
        e.button = !0;
        e.name = "yes";
        var f = d.add.sprite(0, 120, "btn_no2").setInteractive();
        f.button = !0;
        f.name = "no";
        h.add([a, g, e, f]);
        h.setScale(0);
        d.tweens.add({
            targets: h,
            scaleX: 1,
            duration: 400,
            ease: "Back.easeOut"
        });
        d.tweens.add({
            targets: h,
            scaleY: 1,
            duration: 500,
            ease: "Back.easeOut",
            onComplete: function() {
                h.add(b);
                b.setPosition(0, 0);
                h.sendToBack(b)
            }
        })
    }

    function z() {
        play_sound("gameover",
            d);
        m = "gameover";
        h = d.add.container();
        h = d.add.container(360, 540);
        h.setDepth(1);
        var a = d.add.rectangle(360, 540, 720, 1080, 0);
        a.alpha = 0;
        a.name = "dark";
        d.tweens.add({
            targets: a,
            alpha: .7,
            duration: 400
        });
        var b = d.add.sprite(0, -12, "win_lose"),
            g = d.add.text(0, -108, "Game Over!", {
                fontFamily: "impact",
                fontSize: 70,
                align: "center",
                color: "#F5603E"
            }).setOrigin(.5);
        d.time.delayedCall(3E3, function() {
            g.setText("Out of moves")
        });
        var e = d.add.sprite(0, -20, "stars");
        e.setFrame(y.frame.name);
        var f = d.add.sprite(0, 84, "btn_restart2").setInteractive();
        f.button = !0;
        f.name = "restart2";
        var c = d.add.sprite(0, 180, "btn_menu").setInteractive();
        c.button = !0;
        c.name = "menu";
        h.add([b, g, e, f, c]);
        h.setScale(0);
        d.tweens.add({
            targets: h,
            scaleX: 1,
            duration: 450,
            ease: "Back.easeOut"
        });
        d.tweens.add({
            targets: h,
            scaleY: 1,
            duration: 600,
            ease: "Back.easeOut",
            onComplete: function() {
                h.add(a);
                a.setPosition(0, 0);
                h.sendToBack(a)
            }
        })
    }

    function e() {
        play_sound("completed", d);
        game_data.cur_level === game_data.unlocked_level ? levels_star.push(y.frame.name) : levels_star[game_data.cur_level - 1] = y.frame.name;
        game_data.cur_level === game_data.unlocked_level && game_data.unlocked_level < game_data.total_level && game_data.unlocked_level++;
        localStorage.setItem("rf_magicmatch", JSON.stringify({
            unlocked: game_data.unlocked_level,
            stars: levels_star
        }));
        m = "completed";
        h = d.add.container(360, 540);
        h.setDepth(1);
        var a = d.add.rectangle(360, 540, 720, 1080, 0);
        a.alpha = 0;
        a.name = "dark";
        d.tweens.add({
            targets: a,
            alpha: .7,
            duration: 200
        });
        var b = d.add.sprite(0, 0, "glow");
        d.tweens.add({
            targets: b,
            rotation: 6.28319,
            duration: 6E3,
            loop: -1
        });
        var f =
            d.add.sprite(0, -12, "win_win"),
            g = d.add.text(0, -108, "Level " + game_data.cur_level + "\nCompleted!", {
                fontFamily: "impact",
                fontSize: 50,
                align: "center",
                color: "#68A511"
            }).setOrigin(.5),
            e = d.add.sprite(0, -10, "stars");
        e.setFrame(y.frame.name);
        var c = d.add.sprite(0, 84, "btn_next").setInteractive();
        c.button = !0;
        c.name = "next";
        var k = d.add.sprite(0, 180, "btn_menu").setInteractive();
        k.button = !0;
        k.name = "menu";
        h.add([b, f, g, e, c, k]);
        h.setScale(0);
        d.tweens.add({
            targets: h,
            scaleX: 1,
            duration: 450,
            ease: "Back.easeOut"
        });
        d.tweens.add({
            targets: h,
            scaleY: 1,
            duration: 600,
            ease: "Back.easeOut",
            onComplete: function() {
                h.add(a);
                a.setPosition(0, 0);
                h.sendToBack(a)
            }
        })
    }
    var p = this;
    // reward_ad("load");
    var d = this;
    fade("out", this);
    this.add.sprite(360, 540, "background");
    this.add.sprite(360, 1016, "footer");
    this.add.sprite(360, 68, "header");
    var y = this.add.sprite(596, 56, "stars");
    y.setFrame(3);
    var t = {
        blocks: this.add.group(),
        bar: this.add.group(),
        value: this.add.group()
    };
    this.add.sprite(116, 60, "target_bar");
    for (var c = 0; 3 > c; c++) {
        var l = this.add.sprite(59 + 56 * c, 58, "blocks_small");
        l.id = c;
        t.blocks.add(l)
    }
    for (c = 0; 3 > c; c++) l = this.add.sprite(76 + 56 * c, 72, "target_on"), l.id = c, t.bar.add(l);
    c = this.add.sprite(192, 1020, "btn_home").setInteractive();
    c.button = !0;
    c.name = "home";
    c = this.add.sprite(304, 1020, "btn_restart").setInteractive();
    c.button = !0;
    c.name = "restart";
    c = this.add.sprite(416, 1020, "btn_sound").setInteractive();
    c.button = !0;
    c.name = "sound";
    l = this.add.sprite(528, 1020, "btn_music").setInteractive();
    l.button = !0;
    l.name = "music";
    game_data.music || l.setTexture("btn_music_off");
    game_data.sound ||
        c.setTexture("btn_sound_off");
    var I = this.add.text(360, 58, "MOVES", {
        fontFamily: "impact",
        fontSize: 40,
        align: "center",
        color: "#FFFFFF"
    }).setOrigin(.5);
    c = this.add.particles("blue");
    c.setDepth(3);
    var B = c.createEmitter({
        x: -400,
        y: 300,
        scale: {
            start: .7,
            end: 0
        },
        speed: {
            min: 100,
            max: 160
        },
        quantity: 30,
        rotate: {
            start: 0,
            end: Math.floor(360 * Math.random()) - 180
        },
        lifespan: {
            min: 500,
            max: 800
        },
        blendMode: "ADD"
    });
    B.explode();
    c = this.add.particles("p");
    c.setDepth(1);
    var F = c.createEmitter({
        x: -400,
        y: 300,
        scale: {
            start: .7,
            end: 0
        },
        speed: {
            min: 100,
            max: 180
        },
        quantity: 10,
        gravityY: 300,
        rotate: {
            start: 0,
            end: Math.floor(360 * Math.random()) - 180
        },
        lifespan: {
            min: 500,
            max: 800
        }
    });
    F.explode();
    var h, m = "load",
        G = !1,
        H = this.add.sprite(360, 540, "loading");
    this.tweens.add({
        targets: H,
        rotation: 6.28319,
        duration: 3E3,
        loop: -1
    });
    var q = new Match_Tap(this);
    q.get_level(game_data.cur_level).then(function(a) {
        q.generate("level");
        t.blocks.getLength();
        a = t.blocks.getChildren();
        for (var b = 0; 3 > b; b++) {
            var d = p.add.text(76 + 56 * b, 72, String(game_data.values[b]), {
                fontFamily: "impact",
                fontSize: 20,
                align: "center",
                color: "#FFFFFF"
            }).setOrigin(.5);
            d.id = b;
            t.value.add(d);
            a[b].setFrame(game_data.targets[b])
        }
        g();
        m = "play";
        console.log(game_data);
        H.destroy()
    });
    this.input.on("gameobjectdown", function(e, c) {
        if (c.block && "play" === m)
            if (c.booster) c.booster && (m = "wait", "horizontal" === c.boost_type ? (play_sound("swap", d), b(c, "horizontal", "left"), b(c, "horizontal", "right")) : "vertical" === c.boost_type ? (play_sound("swap", d), b(c, "vertical", "up"), b(c, "vertical", "down")) : "boom" === c.boost_type && (play_sound("boom", d), b(c,
                "boom")));
            else {
                var l = q.matching(c.pos_x, c.pos_y, c.frame.name);
                2 <= l ? (play_sound("break", d), m = "wait", q.remove_match(F).then(function(b) {
                    f(b);
                    a(l)
                }), game_data.cur_moves--, g()) : q.clear("matching")
            }
        else c.button && (play_sound("click", d), this.tweens.add({
            targets: c,
            scaleX: .9,
            scaleY: .9,
            ease: "Linear",
            duration: 100,
            yoyo: !0,
            onComplete: function() {
                "play" === m ? "restart" === c.name ? k("restart") : "home" === c.name ? k("home") : "music" === c.name ? switch_audio(c.name, c, d) : "sound" === c.name && switch_audio(c.name, c) : "reward" === m ? "yes" ===
                    c.name ? remove_popup(h, d).then(function(a) {
                        // reward_ad("show");
                        h.destroy(!0, !0);
                        m = "play";
                        game_data.cur_moves = 5;
                        g()
                    }) : "no" === c.name && remove_popup(h, d).then(function(a) {
                        h.destroy(!0, !0);
                        z()
                    }) : "restart2" === c.name || "yes_restart" === c.name ? remove_popup(h, d, !0).then(function(a) {
                        // show_ad();
                        d.scene.start("game")
                    }) : "yes_home" === c.name ? remove_popup(h, d).then(function(a) {
                        // show_ad();
                        d.scene.start("menu")
                    }) : "no" === c.name ? remove_popup(h, d).then(function(a) {
                        h.destroy(!0, !0);
                        m = "play"
                    }) : "next" === c.name ? remove_popup(h, d, !0).then(function(a) {
                        // show_ad();
                        game_data.cur_level < game_data.total_level ? (game_data.cur_level++, d.scene.start("game")) : d.scene.start("menu")
                    }) : "menu" === c.name && remove_popup(h, d).then(function(a) {
                        // show_ad();
                        d.scene.start("menu")
                    })
            }
        }))
    }, this);
    this.input.keyboard.on("keydown", function(a) {
        " " !== a.key && "z" !== a.key && "p" === a.key && (game_data.cur_moves -= 5)
    })
};

function draw_button(a, b, f, g) {
    a = g.add.sprite(a, b, "btn_" + f).setInteractive();
    a.button = !0;
    a.name = f;
    return a
}

function remove_popup(a, b, f) {
    return new Promise(function(g) {
        var r = 0;
        f && (r = 1);
        a.remove(a.getByName("dark"));
        var k = b.add.rectangle(360, 540, 720, 1080, 0);
        k.alpha = .7;
        b.tweens.add({
            targets: k,
            alpha: r,
            duration: 600,
            ease: "Sine.easeOut",
            onComplete: function() {
                f || k.destroy();
                g(!0)
            }
        });
        b.tweens.add({
            targets: a,
            scaleX: 0,
            duration: 300,
            ease: "Back.easeIn"
        });
        b.tweens.add({
            targets: a,
            scaleY: 0,
            duration: 350,
            ease: "Back.easeIn"
        })
    })
}

function show_ad() {
    // "undefined" !== typeof gdsdk && "undefined" !== gdsdk.showAd && gdsdk.showAd()
}

function reward_ad(a) {
    // "load" === a && !game_data.reward.loaded && game_data.enable_reward ? (console.log("load_reward"), "undefined" !== gdsdk && "undefined" !== gdsdk.preloadAd && gdsdk.preloadAd("rewarded").then(function(a) {
    // 	game_data.reward.loaded = !0;
    // 	console.log("reward loaded")
    // })["catch"](function(a) {
    // 	game_data.reward.loaded = !1;
    // 	console.log("failed load reward")
    // })) : "show" === a && game_data.reward.loaded && (console.log("show_reward"), _ad_type = "reward", "undefined" !== gdsdk && "undefined" !== gdsdk.showAd && gdsdk.showAd("rewarded"))
}

function play_sound(a, b) {
    game_data.sound && b.sound.play(a)
}

function play_music(a, b) {
    var f = !0;
    game_data.music && game_music && game_music.isPlaying && (f = !1);
    f && game_data.music && (game_music = b.sound.add(a, {
        loop: !0
    }), game_music.play())
}

function stop_music() {
    "undefined" !== typeof game_music && game_music.stop()
}

function switch_audio(a, b, f) {
    "music" === a ? game_data.music ? (game_data.music = !1, b.setTexture("btn_" + a + "_off"), stop_music()) : (game_data.music = !0, b.setTexture("btn_" + a), play_music("music", f)) : game_data.sound ? (game_data.sound = !1, b.setTexture("btn_" + a + "_off")) : (game_data.sound = !0, b.setTexture("btn_" + a))
}

function fade(a, b) {
    return new Promise(function(f) {
        if ("in" === a) {
            var g = b.add.rectangle(360, b.cameras.main.scrollY, 720, 1080, 0).setOrigin(.5, 0);
            g.alpha = 0;
            b.tweens.add({
                targets: g,
                alpha: 1,
                duration: 300,
                ease: "Linear",
                onComplete: function() {
                    f(!0)
                }
            })
        } else g = b.add.rectangle(360, b.cameras.main.scrollY, 720, 1080, 0).setOrigin(.5, 0), g.alpha = 1, g.setDepth(5), b.tweens.add({
            targets: g,
            alpha: 0,
            duration: 300,
            ease: "Linear",
            onComplete: function() {
                f(!0)
            }
        })
    })
}
var config = {
        type: Phaser.AUTO,
        width: 720,
        height: 1080,
        scale: {
            mode: Phaser.Scale.FIT,
            parent: "redfoc",
            autoCenter: Phaser.Scale.CENTER_BOTH
        },
        scene: [Boot, Load, Menu, LevelMap, Game]
    },
    game = new Phaser.Game(config);