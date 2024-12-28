window.onload = function() {

    var islemHolder, gecisTop, gecisBottom, gecisTween, blackScreen, globalScreen, gameHardnes, gameTime, islem, sayi1, sayi2, sonuc, gercekSonuc, isaret, barTween, bar, correctSound, wrongSound, gecisSound, score, gameOverDurum, scoreText, firstStart, isGameOver, gameOverHolder, highScore, gameBg;

    var localStorageName = "happykidgames";
    var bgColors = ["0xb0c269", "0x6988c2", "0xc269bb", "0xc27e69", "0x433531", "0x4d8b48", "0x883e9a", "0x3e589a", "0x656871", "0x5db5ae", "0x63b55d", "0xc6173f", "0xba4b5d"];

    var game = new Phaser.Game(400, 600);

    function getMobileOperatingSystem() {
        var userAgent = navigator.userAgent || navigator.vendor || window.opera;

        if (userAgent.match(/iPad/i) || userAgent.match(/iPhone/i) || userAgent.match(/iPod/i)) {
            return 'iOS';

        } else if (userAgent.match(/Android/i)) {

            return 'Android';
        } else {
            return 'unknown';
        }
    }

    var boot = function(game) {}
    boot.prototype = {
        preload: function() {

        },
        create: function() {
            game.state.start("PreloadAssets");
        }

    }
    var preloadAssets = function(game) {}
    preloadAssets.prototype = {
        preload: function() {

            game.load.bitmapFont('myFont', 'assets/Numbers-export.png', 'assets/Numbers-export.xml');
            game.load.image("happyLogo", "assets/happyLogo.png");
            game.load.image("moreBtn", "assets/moreBtn.png");
            game.load.image("wrongBtn", "assets/wrongBtn.png");
            game.load.image("correctBtn", "assets/correctBtn.png");
            game.load.image("playBtn", "assets/playBtn.png");
            game.load.image("gameLogo", "assets/logo.png");
            game.load.image("timeBar", "assets/bar.png");
            game.load.image("easy", "assets/easyBtn.png");
            game.load.image("medium", "assets/mediumBtn.png");
            game.load.image("hard", "assets/hardBtn.png");
            game.load.image("black", "assets/blackScreen.png");
            game.load.image("gecisTop", "assets/gecisTop.png");
            //game.load.image("y8","assets/y8Logo.png");
            game.load.image("gecisBottom", "assets/gecisBottom.png");
            game.load.image("gameOverScr", "assets/gameOverScreen.png");
            game.load.image("playAgainBtn", "assets/playAgainBtn.png");
            game.load.image("menuBtn", "assets/menuBtn.png");
            game.load.image("goText", "assets/goText.png");
            game.load.image("toText", "assets/toText.png");
            game.load.image("scText", "assets/scText.png");
            game.load.image("bsText", "assets/bsText.png");
            game.load.audio("correctSound", ["assets/correctSound.mp3", "assets/correctSound.ogg"]);
            game.load.audio("wrongSound", ["assets/wrongSound.mp3", "assets/wrongSound.ogg"]);
            game.load.audio("gecisSound", ["assets/gecisSound.mp3", "assets/gecisSound.ogg"]);

            game.scale.pageAlignHorizontally = true;
            game.scale.pageAlignVertically = true;
            game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
            game.stage.disableVisibilityChange = true;
            game.stage.backgroundColor = '#c6173e';
        },
        create: function() {
            game.state.start("WelcomeScreen");
        }
    }
    var welcomeScreen = function(game) {}
    welcomeScreen.prototype = {
        create: function() {

            gecisSound = game.add.audio("gecisSound", 1);

            var happyLogo = game.add.button(0, 0, "happyLogo", this.goURL, this);
            happyLogo.name = "hLogo"
            happyLogo.anchor.set(0.5);
            happyLogo.x = game.width / 2;
            happyLogo.y = game.height / 2 + 230;
            happyLogo.scale.set(0.7);

            /*var y8Logo = game.add.button(0,0,"y8",this.goURL,this);
             y8Logo.name = "y8Logo"
             y8Logo.anchor.set(0.5);
             y8Logo.x = game.width/2;
             y8Logo.y = game.height/2 + 180;*/

            var moreBtn = game.add.button(0, 0, "moreBtn", this.goURL, this);
            moreBtn.name = "moreBtn"
            moreBtn.anchor.set(0.5);
            moreBtn.x = game.width / 2;
            moreBtn.y = game.height - moreBtn.height / 2 - 20;

            var gameLogo = game.add.sprite(0, 0, "gameLogo");
            gameLogo.anchor.set(0.5);
            gameLogo.x = game.width / 2;
            gameLogo.y = 200;

            var playBtn = game.add.button(0, 0, "playBtn", this.goLevel, this);
            playBtn.anchor.set(0.5);
            playBtn._tint = playBtn.tint;
            playBtn.x = game.width / 2;
            playBtn.y = gameLogo.y + gameLogo.height + 80;
            playBtn.onInputDown.add(buttonDown, this);
            playBtn.onInputUp.add(buttonUp, this);


            function buttonDown(target) {
                target.tint = 0x666666;

            }

            function buttonUp(target) {
                target.tint = target._tint;
            }
            blackScreen = game.add.sprite(0, 0, "black");
            blackScreen.alpha = 0;
        },
        goLevel: function(target) {
            gecisSound.play();
            gecisGoster("LevelScreen");
            if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
                //gdsdk.showAd();
            }
            /*if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
                sdk.showBanner();
                }*/
        },
        goURL: function(target) {
            if (target.name == "moreBtn") {
                window.open("https://codecanyon.net/user/darkmitra/portfolio", "_blank");
            } else if (target.name == "") {
                window.open("https://codecanyon.net/user/darkmitra/portfolio", "_blank");
            }
        }
    }
    var levelScreen = function(game) {}
    levelScreen.prototype = {
        create: function() {
            game.stage.backgroundColor = '#c6173e';

            gecisSound = game.add.audio("gecisSound", 1);

            var happyLogo = game.add.button(0, 0, "happyLogo", this.goURL, this);
            happyLogo.name = "hLogo"
            happyLogo.anchor.set(0.5);
            happyLogo.x = game.width / 2;
            happyLogo.y = game.height - happyLogo.height / 2;
            happyLogo.scale.set(0.6);
            happyLogo.smoothed = true;

            /*var y8Logo = game.add.button(0,0,"y8",this.goURL,this);
             y8Logo.name = "y8Logo"
             y8Logo.anchor.set(0.5);
             y8Logo.x = y8Logo.width/2 + 90;
             y8Logo.y = game.height - y8Logo.height/2 - 10;*/

            var gameLogo = game.add.sprite(0, 0, "gameLogo");
            gameLogo.anchor.set(0.5);
            gameLogo.x = game.width / 2;
            gameLogo.y = 120;

            var easyBtn = game.add.button(0, 0, "easy", this.setHardnes, this);
            easyBtn.anchor.set(0.5);
            easyBtn._tint = easyBtn.tint;
            easyBtn.name = "easyBtn";
            easyBtn.x = game.width / 2;
            easyBtn.y = gameLogo.y + gameLogo.height + 70;

            var mediumBtn = game.add.button(0, 0, "medium", this.setHardnes, this);
            mediumBtn.anchor.set(0.5);
            mediumBtn._tint = mediumBtn.tint;
            mediumBtn.name = "mediumBtn";
            mediumBtn.x = game.width / 2;
            mediumBtn.y = easyBtn.y + easyBtn.height + 10;

            var hardBtn = game.add.button(0, 0, "hard", this.setHardnes, this);
            hardBtn.anchor.set(0.5);
            hardBtn._tint = hardBtn.tint;
            hardBtn.name = "hardBtn";
            hardBtn.x = game.width / 2;
            hardBtn.y = mediumBtn.y + mediumBtn.height + 10;

            var txt = game.add.text(0, 0, "*Only hard section can be save", {
                font: "12px Arial",
                fill: "#FFFFFF"
            });
            txt.anchor.set(0.5);
            txt.x = game.width / 2;
            txt.y = hardBtn.y + hardBtn.height / 2 + 10;

            easyBtn.onInputDown.add(buttonDown, this);
            easyBtn.onInputUp.add(buttonUp, this);

            mediumBtn.onInputDown.add(buttonDown, this);
            mediumBtn.onInputUp.add(buttonUp, this);

            hardBtn.onInputDown.add(buttonDown, this);
            hardBtn.onInputUp.add(buttonUp, this);

            function buttonDown(target) {
                target.tint = 0x666666;
            }

            function buttonUp(target) {
                target.tint = target._tint;
            }
            blackScreen = game.add.sprite(0, 0, "black");
            blackScreen.alpha = 0;
        },
        setHardnes: function(target) {
            if (target.name == "easyBtn") {
                gameHardnes = "easy";
                gameTime = 5;
            } else if (target.name == "mediumBtn") {
                gameHardnes = "medium";
                gameTime = 3;
            } else if (target.name == "hardBtn") {
                gameHardnes = "hard";
                gameTime = 1;
            }
            gecisSound.play();
            gecisGoster("GameScreen");
            if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
                //gdsdk.showAd();
            }
            /*if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
                sdk.showBanner();
                }*/
        },
        goURL: function(target) {
            if (target.name == "hLogo") {
                window.open("https://codecanyon.net/user/darkmitra/portfolio", "_blank");
            }
        }
    }
    var gameScreen = function(game) {}
    gameScreen.prototype = {
        create: function() {
            islemHolder = game.add.group();
            firstStart = true;
            isGameOver = false;

            var correctBtn = game.add.button(0, 0, "correctBtn", this.checkAnswer, this);
            correctBtn._tint = correctBtn.tint;
            correctBtn.name = "correctBtn";
            correctBtn.x = 3;
            correctBtn.y = game.height - correctBtn.height - 3;

            var wrongBtn = game.add.button(0, 0, "wrongBtn", this.checkAnswer, this);
            wrongBtn._tint = wrongBtn.tint;
            wrongBtn.name = "wrongBtn";
            wrongBtn.x = game.width - wrongBtn.width - 3;
            wrongBtn.y = game.height - wrongBtn.height - 3;

            score = 0;
            bar = game.add.sprite(0, 0, "timeBar");
            correctSound = game.add.audio("correctSound", 1);
            wrongSound = game.add.audio("wrongSound", 1);

            scoreText = game.add.bitmapText(0, 0, 'myFont', "0", 28);
            scoreText.anchor.set(0.5);
            scoreText.x = game.width / 2;
            scoreText.y = bar.height + scoreText.height + 5;

            gameOverHolder = game.add.group();

            blackScreen = game.add.sprite(0, 0, "black");
            blackScreen.alpha = 0;

            gecisTop = game.add.sprite(0, 0, "gecisTop");
            gecisTop.y = -gecisTop.height;
            gecisBottom = game.add.sprite(0, 0, "gecisBottom");
            gecisBottom.y = game.height;

            correctBtn.onInputDown.add(buttonDown, this);
            correctBtn.onInputUp.add(buttonUp, this);

            wrongBtn.onInputDown.add(buttonDown, this);
            wrongBtn.onInputUp.add(buttonUp, this);

            function buttonDown(target) {
                target.tint = 0x666666;
            }

            function buttonUp(target) {
                target.tint = target._tint;
            }


            this.islemSec();
            this.islemGoster();
        },
        islemSec: function() {
            islem = islemAyarla();
            if (islem == "toplama") {
                isaret = "+";
                sayi1 = game.rnd.integerInRange(3, 15);
                sayi2 = game.rnd.integerInRange(5, 10);
                sonuc = sayi1 + sayi2;
            } else if (islem == "cikarma") {
                isaret = "-";
                sayi1 = game.rnd.integerInRange(6, 10);
                sayi2 = game.rnd.integerInRange(5, 10);
                sonuc = sayi1 - sayi2;
            }
            gercekSonuc = sonuc;
            sonuc = sonucAralik();
        },
        islemGoster: function() {
            if (islemHolder.children.length > 0) {
                var t = game.add.tween(islemHolder.children[0]).to({
                    x: -islemHolder.children[0].width / 2
                }, 300, Phaser.Easing.Linear.None, true);
                t.onComplete.add(function() {
                    islemHolder.remove(islemHolder.children[0]);
                }, this);
            }


            var islemText = game.add.bitmapText(0, 0, 'myFont', sayi1 + " " + isaret + " " + sayi2 + "\n\n" + " = " + sonuc, 80);
            islemText.anchor.set(0.5);
            islemText.x = game.width / 2;
            islemText.y = game.height / 2 - 40;
            game.add.tween(islemText).from({
                x: game.width + islemText.width / 2
            }, 300, Phaser.Easing.Linear.None, true);
            islemHolder.addChild(islemText);

            if (barTween != null || barTween != undefined) {
                barTween.stop();
                bar.width = game.width;
            }
            if (!firstStart) {
                barTween = game.add.tween(bar).to({
                    width: 0
                }, 1000 * gameTime, Phaser.Easing.Linear.None, true, 300);
                barTween.onComplete.add(function() {
                    gameOverDurum = "timeOver";
                    gameOver();
                });
            }
            //console.log(sayi1+" "+isaret+" "+sayi2+" = "+sonuc)
        },
        checkAnswer: function(target) {
            if (isGameOver) return;

            if (target.name == "correctBtn") {
                if (sonuc == gercekSonuc) {
                    score++;
                } else {
                    gameOverDurum = "wrongAnswer";
                    gameOver();
                    return;
                }
            }
            if (target.name == "wrongBtn") {
                if (sonuc != gercekSonuc) {
                    score++;
                } else {
                    gameOverDurum = "wrongAnswer";
                    gameOver();
                    return;
                }
            }
            firstStart = false;
            scoreText.text = score;
            this.islemSec();
            this.islemGoster();

            correctSound.play();
        }
    }

    function gameOver() {
        if (barTween != null || barTween != undefined)
            barTween.stop();
        wrongSound.play();
        firstStart = true;
        isGameOver = true;
        if (gameHardnes == "hard") {
            highScore = Math.max(score, highScore);
            localStorage.setItem(localStorageName, highScore);
        }
        showGameOverScreen(gameOverDurum);
    }

    function showGameOverScreen(durum) {
        var bg = game.add.sprite(0, 0, "gameOverScr");
        gameOverHolder.addChild(bg);
        var title;
        if (durum == "wrongAnswer") {
            title = game.add.sprite(0, 0, "goText");
        } else if (durum == "timeOver") {
            title = game.add.sprite(0, 0, "toText");
        }
        title.anchor.set(0.5);
        title.x = bg.width / 2;
        title.y = 20;
        gameOverHolder.addChild(title);

        var scText = game.add.sprite(0, 0, "scText");
        scText.x = 50;
        scText.y = 100;
        gameOverHolder.addChild(scText);
        var bsText = game.add.sprite(0, 0, "bsText");
        bsText.x = 50;
        bsText.y = 150;
        gameOverHolder.addChild(bsText);
        var sctx = game.add.bitmapText(0, 0, 'myFont', score.toString(), 20);
        sctx.x = 230;
        sctx.y = scText.y;
        gameOverHolder.addChild(sctx);
        var bstx = game.add.bitmapText(0, 0, 'myFont', gameHardnes == "hard" ? highScore.toString() : score.toString(), 20);
        bstx.x = 230;
        bstx.y = bsText.y;
        gameOverHolder.addChild(bstx);
        var playAgainBtn = game.add.button(0, 0, "playAgainBtn", readyToAgain);
        playAgainBtn.y = bg.height + 5;
        playAgainBtn._tint = playAgainBtn.tint;
        playAgainBtn.onInputDown.add(buttonDown, this);
        playAgainBtn.onInputUp.add(buttonUp, this);
        gameOverHolder.addChild(playAgainBtn);
        var menuBtn = game.add.button(0, 0, "menuBtn", goLevelScreen);
        menuBtn.x = bg.width - menuBtn.width;
        menuBtn.y = bg.height + 5;
        menuBtn._tint = menuBtn.tint;
        menuBtn.onInputDown.add(buttonDown, this);
        menuBtn.onInputUp.add(buttonUp, this);
        gameOverHolder.addChild(menuBtn);

        var moreBtn = game.add.button(0, 0, "moreBtn", goURL, this);
        moreBtn.name = "moreBtn"
        moreBtn.anchor.set(0.5);
        moreBtn.scale.set(0.7);
        moreBtn.x = bg.width / 2;
        moreBtn.y = bg.height - moreBtn.height / 2 - 20;
        gameOverHolder.addChild(moreBtn);

        function buttonDown(target) {
            target.tint = 0x666666;
        }

        function buttonUp(target) {
            target.tint = target._tint;
        }

        function goURL(target) {
            if (target.name == "moreBtn") {
                window.open("https://codecanyon.net/user/darkmitra/portfolio", "_blank");
            }
        }

        gameOverHolder.x = game.width / 2 - gameOverHolder.width / 2;
        gameOverHolder.y = 120;
        game.add.tween(gameOverHolder).from({
            y: -gameOverHolder.height
        }, 300, Phaser.Easing.Linear.None, true);
    }

    function removeGOScreen() {
        var len = gameOverHolder.children.length;
        for (var i = 0; i < len; i++) {
            gameOverHolder.remove(gameOverHolder.children[0]);
        }
        game.stage.backgroundColor = bgColors[game.rnd.integerInRange(0, bgColors.length)];
    }

    function readyToAgain(target) {
        //removeGOScreen();
        //console.log("dfsdf");
        var tween = game.add.tween(gecisTop).to({
            y: 0
        }, 300, Phaser.Easing.Linear.None, true);
        game.add.tween(gecisBottom).to({
            y: game.height - gecisBottom.height
        }, 300, Phaser.Easing.Linear.None, true);
        tween.onComplete.add(startAgain);

        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            //gdsdk.showAd();
        }
        /*if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
            sdk.showBanner();
            }*/
    }

    function startAgain() {
        gecisSound.play();
        removeGOScreen();
        score = 0;
        isGameOver = false;
        bar.width = game.width;
        game.add.tween(gecisTop).to({
            y: -gecisTop.height
        }, 300, Phaser.Easing.Linear.None, true, 300);
        game.add.tween(gecisBottom).to({
            y: game.height
        }, 300, Phaser.Easing.Linear.None, true, 300);

        game.state.states[game.state.current].islemSec();
        game.state.states[game.state.current].islemGoster();
    }

    function goLevelScreen(target) {
        gecisSound.play();
        gecisGoster("LevelScreen");
        if (typeof gdsdk !== 'undefined' && gdsdk.showAd !== 'undefined') {
            //gdsdk.showAd();
        }
        /*if (typeof sdk !== 'undefined' && sdk.showBanner !== 'undefined') {
            sdk.showBanner();
            }*/
    }

    function sonucAralik() {
        var s = game.rnd.integerInRange(sonuc - 1, sonuc + 1);
        return s;
    }

    function islemAyarla() {
        var _is;
        if (Math.random() > 0.5) {
            _is = "toplama";
        } else {
            _is = "cikarma";
        }
        return _is;
    }

    function gecisGoster(screen) {
        globalScreen = screen;
        gecisTween = game.add.tween(blackScreen).to({
            alpha: 1
        }, 300, Phaser.Easing.Linear.None, true);
        gecisTween.onComplete.add(loadScreen, this);
    }

    function loadScreen() {
        game.state.start(globalScreen);
    }
    game.state.add("Boot", boot);
    game.state.add("PreloadAssets", preloadAssets);
    game.state.add("WelcomeScreen", welcomeScreen);
    game.state.add("LevelScreen", levelScreen);
    game.state.add("GameScreen", gameScreen);
    highScore = localStorage.getItem(localStorageName) == null ? 0 : localStorage.getItem(localStorageName);
    game.state.start("Boot");
}