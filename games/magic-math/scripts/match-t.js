var matching_count = 0,
    Match_Tap = function(a) {
        this.scope = a;
        this.array = this.generate_array();
        this.dark_grid = a.add.group();
        this.obj = a.add.group()
    };
Match_Tap.prototype.get = function(a) {
    if ("array" === a) return this.array
};
Match_Tap.prototype.generate_array = function() {
    for (var a = [], b = 0; b < game_data.col; b++) {
        for (var g = [], c = 0; c < game_data.row; c++) g.push({
            color: 0,
            filled: !1
        });
        a.push(g)
    }
    return a
};
Match_Tap.prototype.generate = function(a) {
    this.generate_line();
    this.generate_grid();
    for (var b = 0; b < game_data.col; b++) {
        for (var g = [], c = 0; c < game_data.row; c++)
            if ("level" === a) this.array[b][c].blank || this.add_obj.bind(this)(c, b, this.array[b][c].color);
            else {
                var f = Math.floor(Math.random() * game_data.color);
                this.add_obj.bind(this)(c, b, f);
                g.push({
                    color: f,
                    filled: !0,
                    blank: !1
                })
            }
        this.array.push(g)
    }
};
Match_Tap.prototype.add_obj = function(a, b, g) {
    var c = this.scope.add.sprite(game_data.start_x + a * game_data.size, game_data.start_y + b * game_data.size, "blocks");
    c.setFrame(g);
    c.setInteractive();
    c.pos_x = a;
    c.pos_y = b;
    c.block = !0;
    this.obj.add(c)
};
Match_Tap.prototype.generate_grid = function() {
    for (var a = 0; a < game_data.col; a++)
        for (var b = 0; b < game_data.row; b++)
            if (this.array[a][b].filled) {
                var g = this.scope.add.sprite(game_data.start_x + b * game_data.size, game_data.start_y + a * game_data.size, "grid");
                this.dark_grid.add(g)
            }
};
Match_Tap.prototype.generate_line = function() {
    for (var a = this.array, b = 0; b < game_data.col; b++)
        for (var g = 0; g < game_data.row; g++)
            if (a[b][g].filled) {
                var c = g;
                for (var f = b, d = [], e = 0; 4 > e; e++) 0 === e ? 0 > c - 1 ? d.push("left") : a[f][c - 1].blank && d.push("left") : 1 === e ? c + 1 >= game_data.row ? d.push("right") : a[f][c + 1].blank && d.push("right") : 2 === e ? 0 > f - 1 ? d.push("top") : a[f - 1][c].blank && d.push("top") : 3 === e && (f + 1 >= game_data.col ? d.push("bottom") : a[f + 1][c].blank && d.push("bottom"));
                c = d;
                if (0 < c.length)
                    for (f = 0; f < c.length; f++) this.add_line(g,
                        b, c[f])
            }
};
Match_Tap.prototype.add_line = function(a, b, g) {
    "left" === g ? this.scope.add.sprite(game_data.start_x + a * game_data.size - game_data.line_distance, game_data.start_y + b * game_data.size, "line") : "right" === g ? this.scope.add.sprite(game_data.start_x + a * game_data.size + game_data.line_distance, game_data.start_y + b * game_data.size, "line") : "top" === g ? (a = this.scope.add.sprite(game_data.start_x + a * game_data.size, game_data.start_y + b * game_data.size - game_data.line_distance, "line"), a.setRotation(1.5708)) : "bottom" === g && (a = this.scope.add.sprite(game_data.start_x +
        a * game_data.size, game_data.start_y + b * game_data.size + game_data.line_distance, "line"), a.setRotation(1.5708))
};
Match_Tap.prototype.respawn = function(a) {
    return new Promise(function(b) {
        function g(a) {
            c.tweens.add({
                targets: a,
                y: game_data.start_y + a.pos_y * game_data.size - game_data.size / 8,
                duration: 100,
                yoyo: !0,
                ease: "Linear",
                onComplete: function() {
                    0 === d && b(!0)
                }
            })
        }
        for (var c = this.scope, f = -1, d = 0, e = game_data.col - 1; 0 <= e; e--)
            for (var h = 0; h < game_data.row; h++) this.array[e][h].filled || this.array[e][h].blank || d++;
        e = !1;
        h = 0;
        if (a >= game_data.booster_at) {
            var k = Math.floor(Math.random() * d);
            e = !0
        }
        for (var l = game_data.col - 1; 0 <= l; l--)
            for (var m = {}, n = 0; n < game_data.row; m = {
                    $jscomp$loop$prop$o$18: m.$jscomp$loop$prop$o$18
                }, n++)
                if (!this.array[l][n].filled && !this.array[l][n].blank) {
                    -1 === f && (f = l + 2);
                    var p = "blocks",
                        q = Math.floor(Math.random() * game_data.color);
                    e && h === k && (p = Math.round(3 * Math.random()), p = 0 == p ? "horizontal" : 1 == p ? "vertical" : "boom");
                    m.$jscomp$loop$prop$o$18 = this.scope.add.sprite(game_data.start_x + n * game_data.size, game_data.start_y + l * game_data.size - f * game_data.size, p);
                    "blocks" === p ? m.$jscomp$loop$prop$o$18.setFrame(q) : (m.$jscomp$loop$prop$o$18.boost_type =
                        p, m.$jscomp$loop$prop$o$18.booster = !0, q = -1, this.scope.tweens.add({
                            targets: m.$jscomp$loop$prop$o$18,
                            scaleX: 1.2,
                            scaleY: 1.2,
                            duration: 300,
                            yoyo: !0,
                            loop: -1
                        }));
                    m.$jscomp$loop$prop$o$18.block = !0;
                    m.$jscomp$loop$prop$o$18.setInteractive();
                    m.$jscomp$loop$prop$o$18.pos_x = n;
                    m.$jscomp$loop$prop$o$18.pos_y = l;
                    this.obj.add(m.$jscomp$loop$prop$o$18);
                    this.array[l][n].filled = !0;
                    this.array[l][n].color = q;
                    c.tweens.add({
                        targets: m.$jscomp$loop$prop$o$18,
                        y: game_data.start_y + l * game_data.size,
                        duration: game_data.fall_duration *
                            f,
                        ease: "Linear",
                        onComplete: function(a) {
                            return function() {
                                d--;
                                g(a.$jscomp$loop$prop$o$18)
                            }
                        }(m)
                    });
                    h++
                }
    }.bind(this))
};
Match_Tap.prototype.matching = function(a, b, g) {
    this.check_match(a, b, g);
    a = matching_count;
    matching_count = 0;
    return a
};
Match_Tap.prototype.check_match = function(a, b, g) {
    matching_count++;
    this.array[b][a].checked = !0;
    for (var c = -1, f = 0, d = 0; 4 > d; d++) 0 === d ? (c = -1, f = 0) : 1 === d ? (c = 1, f = 0) : 2 === d ? (c = 0, f = -1) : 3 === d && (c = 0, f = 1), 0 <= a + c && a + c < game_data.row && 0 <= b + f && b + f < game_data.col && !this.array[b + f][a + c].checked && this.array[b + f][a + c].filled && this.array[b + f][a + c].color === g && this.check_match(a + c, b + f, g)
};
Match_Tap.prototype.remove_match = function(a) {
    return new Promise(function(b) {
        for (var g = this.obj.getLength(), c = this.obj.getChildren(), f = [], d = 0; d < g; d++) {
            var e = c[d];
            if (this.array[e.pos_y][e.pos_x].checked) {
                e.alpha = .5;
                for (var h = 0; 3 > h; h++)
                    if (e.frame.name === game_data.targets[h]) {
                        0 < game_data.values[h] && f.push({
                            x: e.x,
                            y: e.y,
                            frame: e.frame.name
                        });
                        break
                    }
            }
        }
        setTimeout(function() {
            for (var d = 0; d < g; d++) {
                var e = c[d];
                this.array[e.pos_y][e.pos_x].checked && (this.array[e.pos_y][e.pos_x].filled = !1, a.setPosition(e.x, e.y), a.setFrame(e.frame.name),
                    a.explode(), e.destroy(!0, !0), d--, g--)
            }
            b(f)
        }.bind(this), 0)
    }.bind(this))
};
Match_Tap.prototype.booster_removal = function(a, b, g) {
    g = this.obj.getLength();
    var c = this.obj.getChildren(),
        f = [];
    if ("horizontal" === b) {
        for (b = a.x; 0 <= b; b--)
            if (this.array[a.y][b].filled) this.array[a.y][b].boost = !0;
            else break;
        for (b = a.x + 1; b < game_data.row; b++)
            if (this.array[a.y][b].filled) this.array[a.y][b].boost = !0;
            else break
    } else if ("vertical" === b) {
        for (b = a.y; 0 <= b; b--)
            if (this.array[b][a.x].filled) this.array[b][a.x].boost = !0;
            else break;
        for (b = a.y + 1; b < game_data.col; b++)
            if (this.array[b][a.x].filled) this.array[b][a.x].boost = !0;
            else break
    } else if ("boom" === b)
        for (b = a.x; b <= a.xx; b++)
            for (var d = a.y; d <= a.yy; d++) this.array[d][b].filled && (this.array[d][b].boost = !0);
    for (b = 0; b < g; b++) d = c[b], this.array[d.pos_y][d.pos_x].boost && (d.pos_x === a.x && d.pos_y === a.y && (d.alpha = .5), this.array[d.pos_y][d.pos_x].boost = !1, this.array[d.pos_y][d.pos_x].filled = !1, d.booster || f.push({
        x: d.x,
        y: d.y,
        frame: d.frame.name
    }), d.destroy(!0, !0), b--, g--);
    return f
};
Match_Tap.prototype.show_hint = function(a, b, g) {
    this.array[b][a].checked = !0;
    for (var c = -1, f = 0, d = 0; 4 > d; d++) 0 === d ? (c = -1, f = 0) : 1 === d ? (c = 1, f = 0) : 2 === d ? (c = 0, f = -1) : 3 === d && (c = 0, f = 1), 0 <= a + c && a + c < game_data.row && 0 <= b + f && b + f < game_data.col && !this.array[b + f][a + c].checked && this.array[b + f][a + c].filled && this.array[b + f][a + c].color === g && this.show_hint(a + c, b + f, g)
};
Match_Tap.prototype.check_possible_matches = function(a) {
    function b(a, b) {
        for (var d = this.obj.getLength(), c = this.obj.getChildren(), e = 0; e < d; e++) {
            var f = c[e];
            if (f.pos_x === a && f.pos_y === b) {
                f.alpha = .5;
                break
            }
        }
    }

    function g(a, b, d) {
        for (var c = -1, e = 0, f = 1, g = 0; 4 > g; g++) 0 === g ? (c = -1, e = 0) : 1 === g ? (c = 1, e = 0) : 2 === g ? (c = 0, e = -1) : 3 === g && (c = 0, e = 1), 0 <= a + c && a + c < game_data.row && 0 <= b + e && b + e < game_data.col && !this.array[b + e][a + c].checked && this.array[b + e][a + c].filled && this.array[b + e][a + c].color === d && f++;
        return 3 <= f ? !0 : !1
    }
    var c = !1,
        f = 0;
    a: for (; f <
        game_data.col; f++)
        for (var d = 0; d < game_data.row; d++)
            if (this.array[f][d].filled && g.bind(this)(d, f, this.array[f][d].color)) {
                b.bind(this)(d, f);
                var e = d;
                var h = f;
                var k = this.array[f][d].color;
                c = !0;
                break a
            }
    if ("check" === a) return c;
    if ("hint" === a)
        for (this.show_hint(e, h, k), a = this.obj.getLength(), e = this.obj.getChildren(), h = 0; h < a; h++) k = e[h], this.array[k.pos_y][k.pos_x].checked && (this.array[k.pos_y][k.pos_x].checked = !1, k.alpha = .5)
};
Match_Tap.prototype.clear = function(a) {
    if ("matching" === a)
        for (a = 0; a < game_data.col; a++)
            for (var b = 0; b < game_data.row; b++) this.array[a][b].checked && !this.array[a][b].blank && (this.array[a][b].checked = !1);
    else if ("reset" === a) {
        for (a = 0; a < game_data.col; a++)
            for (b = 0; b < game_data.row; b++) this.array[a][b].filled = !1;
        a = this.obj.getLength();
        b = this.obj.getChildren();
        for (var g = 0; g < a; g++) {
            var c = b[g];
            this.array[c.pos_y][c.pos_x].filled = !0;
            this.array[c.pos_y][c.pos_x].color = c.frame.name
        }
    }
};
Match_Tap.prototype.drop = function() {
    return new Promise(function(a) {
        function b(b) {
            c.tweens.add({
                targets: b,
                y: game_data.start_y + b.pos_y * game_data.size - game_data.size / 8,
                duration: 150,
                yoyo: !0,
                ease: "Linear",
                onComplete: function() {
                    0 === l && a(!0)
                }
            })
        }
        for (var g = 0, c = this.scope, f = 0; f < game_data.row; f++) {
            for (var d = [], e = 0; e < game_data.col;) this.array[e][f].blank ? d.push(-1) : this.array[e][f].filled ? d.push(1) : d.push(0), e++;
            for (e = game_data.col - 1; 0 <= e; e--)
                if (this.array[e][f].filled) {
                    for (var h = 0, k = game_data.col - 1; k > e; k--)
                        if (0 ===
                            d[k]) {
                            d[k] = 1;
                            d[e] = 0;
                            h = k - e;
                            break
                        }
                    h && (this.array[e][f].shift = h)
                }
        }
        f = this.obj.getLength();
        d = this.obj.getChildren();
        var l = 0;
        for (e = 0; e < f; e++) h = d[e], this.array[h.pos_y][h.pos_x].shift && (h.shift = this.array[h.pos_y][h.pos_x].shift, this.array[h.pos_y][h.pos_x].shift = 0, l++);
        e = {};
        for (h = 0; h < f; e = {
                $jscomp$loop$prop$p$16$20: e.$jscomp$loop$prop$p$16$20
            }, h++) e.$jscomp$loop$prop$p$16$20 = d[h], e.$jscomp$loop$prop$p$16$20.shift && (g++, e.$jscomp$loop$prop$p$16$20.pos_y += e.$jscomp$loop$prop$p$16$20.shift, k = e.$jscomp$loop$prop$p$16$20.shift,
            e.$jscomp$loop$prop$p$16$20.shift = 0, c.tweens.add({
                targets: e.$jscomp$loop$prop$p$16$20,
                y: game_data.start_y + e.$jscomp$loop$prop$p$16$20.pos_y * game_data.size,
                duration: game_data.fall_duration * k,
                ease: "Linear",
                onComplete: function(a) {
                    return function() {
                        l--;
                        b(a.$jscomp$loop$prop$p$16$20)
                    }
                }(e)
            }));
        0 === g && a(!0)
    }.bind(this))
};
Match_Tap.prototype.get_level = function(a) {
    var b = this;
    return new Promise(function(g) {
        var c = b.scope.cache.json.get("level-" + a);
        if ("redfoc_magic_match" === c.config.id) {
            game_data.moves = c.config.moves;
            game_data.cur_moves = c.config.moves;
            game_data.targets = c.config.targets;
            game_data.color = c.config.max_color;
            game_data.values = c.config.values.slice();
            for (var f = c.config.random, d = 0; d < game_data.col; d++)
                for (var e = 0; e < game_data.row; e++) {
                    var h = !1,
                        k = !0,
                        l = Math.floor(Math.random() * game_data.color);
                    1 === c.level[d][e][0] &&
                        (h = !0, k = !1, f && (c.level[d][e][1] = l));
                    b.array[d][e].filled = h;
                    b.array[d][e].blank = k;
                    b.array[d][e].color = c.level[d][e][1]
                }
            g("success")
        }
    })
};