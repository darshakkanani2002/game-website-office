//Variables/////////////////////////////////////////////////////////////////////////
var bHasBeenInitialised = false;
var mob = (navigator.userAgent.match(/(Android|webOS|BlackBerry|IEMobile|Opera Mini|iPad|iPhone|iPod)/g) ? true : false);
var sCID, sGameState, canvas, stage, nStageWidth, nStageHeight, manifest, preload;
var startScreenPlayBtnBM, gameOddbodsContainer, aActiveGameOddbods;
var oddBodsLogoStartScreenBM, mainImageStartScreenBM, startBottomCurveBM, oddBodsLogoEndScreenBM;
var gameTitleBM, introCopyBM, gameTopContainer, gameTopcurveBM, gameBottomContainer, gameBottomcurveBM;
var endFailWinGuyContainer, endFailGreenguyBM, endFailRedGuyBM, endWinGuyYellowBM;
var endMessagesContainer, endFailMessageGreenBM, endFailMessageRedBM, endWinMessageYellowBM;
var targetScoreContainer, targetScoreBackgroundBM, targetScoreTextBM, nScorePopupTimeoutID;
var aTargetScoreDigits, aScorePopupDigits, aInGameScoreDigits, aInGameTargetScoreDigits;
var nTargetScoreTimeoutID;
var scorePopupBM, scorePopupContainer, playAgainBM;
var aLevelScores, inGameBestTextBM, inGameScoreTextBM, inGameTotalTextBM;
var bHasWonGame, aEndBigScoreDigits, youScoreTextBM, endScoreHolderBM, endScoreContainer;
var nGameScale, nCurrentLevel, startBottomContainer;
var endBottomContainer, endBottomCurveBM, crLineEndScreenBM, crLineGameScreenBM;
var aTopBestScoreDigits, aTopTotalScoreDigits;
var nGridHeight, nGridPixelWidth, nGridPixelHeight, nBestScore;
var crLineStartScreenBM, backBtnBM, loaderLogoBM, loaderContainer, loaderBarBM, loaderBackgroundBM, oddbodsThemeSFX;
var nCurrentThemeVolume, loadingTextBM;
var soundOnBM, soundOffBM, soundOnOffBtn, bSoundIsOn;
var bCanMove, levelTextBM, nBigLevelTextWidth;
var levelStartBackgroundBM, levelStartBackgroundContainer, bigLevelTextBM, aBigLevelDigitsTeal;
var nInGameLevelWordWidth, aLevelDigits, topScoreEndScreenBM, topScoreEndScreenContainer, aTopScoreEndScreenDigits;
//
var nGameRatio = 764 / 1100;
//[5,6,5,6,7,6,7,8,7,8,9,8,9]
//[2,2,3,3,3,4,4,4,5,5,5,6,6]
var aGridWidths = [5, 6, 5, 6, 7, 6, 7, 8, 7, 8, 9, 8, 9];
var aColourAmounts = [2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 5, 6, 6];
var aColourIDs = ["blue", "green", "orange", "pink", "purple", "red", "yellow"];
var aTargetScores = [150, 300, 50, 125, 200, 75, 100, 150, 125, 50, 100, 100, 150];
var aPartyAnimGuys = [];
var aPartyOptions = [];
var nKeepCreating = -1;
var nCanMoveCounter = -1;
aPartyOptions.push("levelcleared-bubbles");
aPartyOptions.push("levelcleared-click");
aPartyOptions.push("levelcleared-fuse");
aPartyOptions.push("levelcleared-jeff");
aPartyOptions.push("levelcleared-newt");
aPartyOptions.push("levelcleared-pogo");
aPartyOptions.push("levelcleared-zee");

//Setup functions//////////////////////////////////////////////////////////////////////
function getUrlVars() {
    var vars = [],
        hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');

    for (var i = 0; i < hashes.length; i++) {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }

    return vars;
}
var hash = getUrlVars();
if (hash['cid'] == undefined) {
    sCID = "int";
} else {
    sCID = hash['cid'];
}

function isCanvasSupported() {
    var elem = document.createElement('canvas');
    return !!(elem.getContext && elem.getContext('2d'));
}

$(document).ready(function(e) {
    if (window.orientation == 0 || window.orientation == 90 || window.orientation == -90 || window.orientation == 180) {
        mob = true;
    }

    //TEST
    //mob = true;

    if (isCanvasSupported()) {
        if (mob) {
            $(window).resize(e, function() {
                handleStageResize();
            });
            handleStageResize();
        } else {
            $('.canvasholder').show();

            $('.canvasholder').addClass('centerCanvas');

            //$('body').css({backgroundImage:"url('assets/site_background.jpg')", backgroundColor:"#001e38", backgroundRepeat:"no-repeat", backgroundPosition:"center top", height:"100%"});

            initialise();
        }
    } else {
        alert("Your browser isn't supported. Please update your browser.")
        //window.location = "notsupported_" + sCID + ".html";
    }
    ///////////
});

function handleStageResize() {
    window.setTimeout(nowCheckOrientation, 500);
}

function nowCheckOrientation() {
    var landscapeMode = Math.abs(window.orientation) == 90;

    //TEST
    //landscapeMode = true;

    if (!landscapeMode) {
        initialise();
    } else {
        var sc = $(window).width() / 1800;
        var imwidth = sc * 750;
        var imheight = sc * 214;
        var leftpos = ((($(window).width() - (350 * sc)) - imwidth) * 0.5) + (350 * sc);
        var toppos = ($(window).height() - imheight) * 0.5;
        $('.rotate-txt').html('<img src="' + sCID + '/rotate-txt.png"/>');
        $('.rotate-txt').css({
            width: imwidth,
            height: imheight,
            left: leftpos,
            top: toppos
        });

        $('#rotate-image').css({
            height: $(window).height()
        });
        $('.rotate-holder').show();
        $('.canvasholder').hide();
    }
}

function initialise() {
    $('.rotate-holder').hide();
    $('.canvasholder').show();

    if (!bHasBeenInitialised) {
        sGameState = "preload";
        createCanvas();
        createjs.Ticker.addEventListener("tick", tick);
        createjs.Ticker.setFPS(50);
        nowLoadSite();
        bHasBeenInitialised = true;
    }
}

function createCanvas() {
    var ww = $(window).width();
    var wh = $(window).height();

    var retina = window.devicePixelRatio > 1 ? true : false;
    var multiplier;
    if (retina) {
        multiplier = 2;
        //multiplier = 1;
    } else {
        multiplier = 1;
    }

    if (!mob) {
        ww = 500;
        wh = Math.ceil(ww / nGameRatio);
    } else {
        if (ww / wh > 0.7) {
            ww = Math.ceil(wh * nGameRatio);
        }

        $('.canvasholder').css({
            marginLeft: "auto",
            marginRight: "auto",
            width: ww
        });
    }

    nGameScale = (ww * multiplier) / 764;

    $('.canvasholder').html('<canvas id="myCanvas" width="' + (ww * multiplier) + '" height="' + (wh * multiplier) + '"></canvas>');

    canvas = document.getElementById('myCanvas');

    var retina = window.devicePixelRatio > 1 ? true : false;
    if (retina) {
        canvas.style.width = ww + "px";
        canvas.style.height = wh + "px";
    }

    stage = new createjs.Stage(canvas);

    createjs.Touch.enable(stage);

    stage.enableMouseOver(55);

    nStageWidth = ww * multiplier;
    nStageHeight = wh * multiplier;

    var base = new createjs.Shape();
    base.graphics.beginFill("white").drawRect(0, 0, nStageWidth, nStageHeight);
    stage.addChild(base);
}

//Load site////////////////////////////////////////////////////////////////////

function nowLoadSite() {
    //
    /*$.get("" + sCID + "/matchingpairs.xml", function(d){
        $(d).find('start_screen').each(function(){

        });


        loadImageElements();
    });
*/
    loadImageElements();
}

function loadImageElements() {
    manifest = [{
            src: "img/loader-logo.png",
            id: "loader-logo"
        },
        {
            src: "img/loader-bg.png",
            id: "loader-bg"
        },
        {
            src: "img/loader-bar.png",
            id: "loader-bar"
        },
        {
            src: sCID + "/loading-txt.png",
            id: "loading-txt"
        },
        {
            src: "img/grid-blue.png",
            id: "grid-blue"
        },
        {
            src: "img/grid-green.png",
            id: "grid-green"
        },
        {
            src: "img/grid-orange.png",
            id: "grid-orange"
        },
        {
            src: "img/grid-pink.png",
            id: "grid-pink"
        },
        {
            src: "img/grid-purple.png",
            id: "grid-purple"
        },
        {
            src: "img/grid-red.png",
            id: "grid-red"
        },
        {
            src: "img/grid-yellow.png",
            id: "grid-yellow"
        },
        {
            src: "img/main-image-startscreen.png",
            id: "main-image-startscreen"
        },
        {
            src: "img/oddbods-logo-startscreen.png",
            id: "oddbods-logo-startscreen"
        },
        {
            src: "img/oddbods-logo-endscreen.png",
            id: "oddbods-logo-endscreen"
        },
        {
            src: "img/start-bottomcurve.png",
            id: "start-bottomcurve"
        },
        {
            src: "img/game-topcurve.png",
            id: "game-topcurve"
        },
        {
            src: "img/game-bottomcurve.png",
            id: "game-bottomcurve"
        },
        {
            src: "img/end-fail-greenguy.jpg",
            id: "end-fail-greenguy"
        },
        {
            src: "img/end-fail-redguy.jpg",
            id: "end-fail-redguy"
        },
        {
            src: "img/end-win-yellowguy.jpg",
            id: "end-win-yellowguy"
        },
        {
            src: "img/targetScoreBackground.png",
            id: "targetScoreBackground"
        },
        {
            src: "img/score-popup.png",
            id: "score-popup"
        },
        {
            src: "img/numbers105teal.png",
            id: "numbers105teal"
        },
        {
            src: "img/numbers105.png",
            id: "numbers105"
        },
        {
            src: "img/numbers78.png",
            id: "numbers78"
        },
        {
            src: "img/numbers32.png",
            id: "numbers32"
        },
        {
            src: "img/cr-line.png",
            id: "cr-line"
        },
        {
            src: "img/end-score-holder.png",
            id: "end-score-holder"
        },
        {
            src: "img/soundOn.png",
            id: "soundOn"
        },
        {
            src: "img/soundOff.png",
            id: "soundOff"
        },
        {
            src: "img/levelcleared-bubbles.png",
            id: "levelcleared-bubbles"
        },
        {
            src: "img/levelcleared-click.png",
            id: "levelcleared-click"
        },
        {
            src: "img/levelcleared-fuse.png",
            id: "levelcleared-fuse"
        },
        {
            src: "img/levelcleared-jeff.png",
            id: "levelcleared-jeff"
        },
        {
            src: "img/levelcleared-newt.png",
            id: "levelcleared-newt"
        },
        {
            src: "img/levelcleared-pogo.png",
            id: "levelcleared-pogo"
        },
        {
            src: "img/levelcleared-zee.png",
            id: "levelcleared-zee"
        },
        {
            src: "img/top-score-endscreen.png",
            id: "top-score-endscreen"
        },
        {
            src: "img/levelstartBackground.jpg",
            id: "levelstartBackground"
        },
        {
            src: sCID + "/play-game-btn.png",
            id: "play-game-btn"
        },
        {
            src: sCID + "/play-again-btn.png",
            id: "play-again-btn"
        },
        {
            src: sCID + "/intro-copy.png",
            id: "intro-copy"
        },
        {
            src: sCID + "/game-title.png",
            id: "game-title"
        },
        {
            src: sCID + "/end-fail-green.png",
            id: "end-fail-green"
        },
        {
            src: sCID + "/end-fail-red.png",
            id: "end-fail-red"
        },
        {
            src: sCID + "/end-win-yellow.png",
            id: "end-win-yellow"
        },
        {
            src: sCID + "/your-score.png",
            id: "your-score"
        },
        {
            src: sCID + "/target-score.png",
            id: "target-score"
        },
        {
            src: sCID + "/ingame-best-txt.png",
            id: "ingame-best-txt"
        },
        {
            src: sCID + "/ingame-score-txt.png",
            id: "ingame-score-txt"
        },
        {
            src: sCID + "/ingame-total-txt.png",
            id: "ingame-total-txt"
        },
        {
            src: sCID + "/back-btn.png",
            id: "back-btn"
        },
        {
            src: sCID + "/level-txt.png",
            id: "level-txt"
        },
        {
            src: sCID + "/big-level-txt.png",
            id: "big-level-txt"
        },
        {
            src: "sfx/main.mp3",
            id: "oddbodsTheme"
        },
        {
            src: "sfx/buttonClick.mp3",
            id: "OB_buttonClick"
        },
        {
            src: "sfx/gamewin.mp3",
            id: "OB_gamewin"
        },
        {
            src: "sfx/gamelose.mp3",
            id: "OB_gamelose"
        },
        {
            src: "sfx/happy.mp3",
            id: "OB_levelCleared"
        },
        {
            src: "sfx/removeemoji.mp3",
            id: "OB_removeOddbods"
        },
        {
            src: "sfx/ting.mp3",
            id: "OB_wobble"
        }
    ];

    preload = new createjs.LoadQueue(true);
    preload.installPlugin(createjs.Sound);

    preload.on("progress", handleProgress);
    preload.on("complete", handleComplete);
    preload.on("fileload", handleFileLoad);
    preload.loadManifest(manifest);
}

function handleProgress(event) {
    var w, h;

    if (preload.getResult('loader-logo')) {
        if (!loaderLogoBM) {
            w = preload.getResult('loader-logo').width;
            h = preload.getResult('loader-logo').height;
            loaderLogoBM = new createjs.Bitmap(preload.getResult('loader-logo')).set({
                regX: Math.ceil(w / 2),
                regY: Math.ceil(h / 2)
            });
            loaderLogoBM.x = Math.ceil(nStageWidth * 0.5);
            loaderLogoBM.y = Math.ceil(190 * nGameScale);
            loaderLogoBM.scaleX = loaderLogoBM.scaleY = 0;
            stage.addChild(loaderLogoBM);

            createjs.Tween.get(loaderLogoBM).to({
                scaleX: nGameScale,
                scaleY: nGameScale
            }, 600, createjs.Ease.backOut);
        }
    }

    if (preload.getResult('loader-bg') && preload.getResult('loader-bar')) {
        if (!loaderBarBM && !loaderBackgroundBM) {
            loaderContainer = new createjs.Container();
            stage.addChild(loaderContainer);
            loaderContainer.x = Math.ceil(nStageWidth * 0.5);
            loaderContainer.y = Math.ceil(570 * nGameScale);

            w = preload.getResult('loader-bg').width;
            h = preload.getResult('loader-bg').height;
            loaderBackgroundBM = new createjs.Bitmap(preload.getResult('loader-bg')).set({
                regX: Math.ceil(w / 2),
                regY: Math.ceil(h / 2)
            });
            loaderBackgroundBM.scaleX = loaderBackgroundBM.scaleY = nGameScale;
            loaderContainer.addChild(loaderBackgroundBM);

            w = preload.getResult('loader-bar').width;
            h = preload.getResult('loader-bar').height;
            loaderBarBM = new createjs.Bitmap(preload.getResult('loader-bar')).set({
                regX: 0,
                regY: Math.ceil(h / 2)
            });
            loaderBarBM.x = Math.ceil(-182 * nGameScale);
            loaderBarBM.scaleX = 0;
            loaderBarBM.scaleY = nGameScale;
            loaderContainer.addChild(loaderBarBM);


            loaderContainer.scaleX = loaderContainer.scaleY = 0;
            createjs.Tween.get(loaderContainer).to({
                scaleX: 1,
                scaleY: 1
            }, 600, createjs.Ease.backOut);
        }
    }

    if (preload.getResult('loading-txt')) {
        if (!loadingTextBM) {
            w = preload.getResult('loading-txt').width;
            h = preload.getResult('loading-txt').height;
            loadingTextBM = new createjs.Bitmap(preload.getResult('loading-txt')).set({
                regX: Math.ceil(w / 2),
                regY: Math.ceil(h / 2)
            });
            loadingTextBM.x = Math.ceil(nStageWidth * 0.5);
            loadingTextBM.y = Math.ceil(720 * nGameScale);
            loadingTextBM.scaleX = loadingTextBM.scaleY = nGameScale;
            loadingTextBM.alpha = 0;
            stage.addChild(loadingTextBM);

            createjs.Tween.get(loadingTextBM).wait(300).to({
                alpha: 1
            }, 600, createjs.Ease.backOut);
        }
    }

    if (loaderBarBM) {
        loaderBarBM.scaleX = event.loaded * nGameScale;
    }
}

function handleFileLoad(event) {}

function handleComplete(event) {
    nBestScore = 0;

    buildStartScreen();
    buildGameScreen();
    buildEndScreen();

    if (!mob) {
        startPlayingThemeSFX(1);
    }

    bSoundIsOn = true;
    soundOnBM = new createjs.Bitmap(preload.getResult('soundOn'));
    soundOffBM = new createjs.Bitmap(preload.getResult('soundOff'));
    soundOnBM.visible = bSoundIsOn;
    soundOffBM.visible = !bSoundIsOn;
    soundOnOffBtn = new createjs.Container();
    soundOnOffBtn.addChild(soundOnBM);
    soundOnOffBtn.addChild(soundOffBM);
    stage.addChild(soundOnOffBtn);
    soundOnOffBtn.x = nStageWidth - (nGameScale * 60);
    soundOnOffBtn.y = nStageHeight - (nGameScale * 60);
    soundOnOffBtn.scaleX = soundOnOffBtn.scaleY = nGameScale;
    soundOnOffBtn.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(-30, -30, 120, 120));
    soundOnOffBtn.on("mouseover", function(evt) {
        document.body.style.cursor = 'pointer';
    });
    soundOnOffBtn.on("mouseout", function(evt) {
        document.body.style.cursor = 'default';
    });
    soundOnOffBtn.on("click", function(evt) {
        onToggleSoundOnOff();
    });

    hideLoaderScreen();
    window.setTimeout(showStartScreen, 600);
}

//////////////////////////////////////////////////////
//Build screens

function buildStartScreen() {
    var w, h;

    w = preload.getResult('oddbods-logo-startscreen').width;
    h = preload.getResult('oddbods-logo-startscreen').height;
    oddBodsLogoStartScreenBM = new createjs.Bitmap(preload.getResult('oddbods-logo-startscreen')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(oddBodsLogoStartScreenBM);
    oddBodsLogoStartScreenBM.visible = false;
    oddBodsLogoStartScreenBM.scaleX = oddBodsLogoStartScreenBM.scaleY = nGameScale;
    oddBodsLogoStartScreenBM.x = Math.ceil(186 * nGameScale);
    oddBodsLogoStartScreenBM.y = Math.ceil(115 * nGameScale);

    w = preload.getResult('game-title').width;
    h = preload.getResult('game-title').height;
    gameTitleBM = new createjs.Bitmap(preload.getResult('game-title')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(gameTitleBM);
    gameTitleBM.visible = false;
    gameTitleBM.scaleX = gameTitleBM.scaleY = nGameScale;
    gameTitleBM.x = Math.ceil(540 * nGameScale);
    gameTitleBM.y = Math.ceil(124 * nGameScale);

    w = preload.getResult('main-image-startscreen').width;
    h = preload.getResult('main-image-startscreen').height;
    mainImageStartScreenBM = new createjs.Bitmap(preload.getResult('main-image-startscreen')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(mainImageStartScreenBM);
    mainImageStartScreenBM.visible = false;
    mainImageStartScreenBM.scaleX = mainImageStartScreenBM.scaleY = nGameScale;
    mainImageStartScreenBM.x = Math.ceil(nStageWidth * 0.5);
    mainImageStartScreenBM.y = Math.ceil(405 * nGameScale);


    w = preload.getResult('intro-copy').width;
    h = preload.getResult('intro-copy').height;
    introCopyBM = new createjs.Bitmap(preload.getResult('intro-copy')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(introCopyBM);
    introCopyBM.visible = false;
    introCopyBM.scaleX = introCopyBM.scaleY = nGameScale;
    introCopyBM.x = Math.ceil(nStageWidth * 0.5);
    introCopyBM.y = Math.ceil(726 * nGameScale);



    w = preload.getResult('play-game-btn').width;
    h = preload.getResult('play-game-btn').height;
    startScreenPlayBtnBM = new createjs.Bitmap(preload.getResult('play-game-btn')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(startScreenPlayBtnBM);
    startScreenPlayBtnBM.on("mouseover", function(evt) {
        document.body.style.cursor = 'pointer';
    });
    startScreenPlayBtnBM.on("mouseout", function(evt) {
        document.body.style.cursor = 'default';
    });
    startScreenPlayBtnBM.on("click", function(evt) {
        onStartScreenStartClick();
    });
    startScreenPlayBtnBM.visible = false;
    startScreenPlayBtnBM.scaleX = startScreenPlayBtnBM.scaleY = nGameScale;
    startScreenPlayBtnBM.x = Math.ceil(nStageWidth * 0.5);
    startScreenPlayBtnBM.y = Math.ceil(950 * nGameScale);

    startBottomContainer = new createjs.Container();
    stage.addChild(startBottomContainer);
    startBottomContainer.visible = false;

    w = preload.getResult('start-bottomcurve').width;
    h = preload.getResult('start-bottomcurve').height;
    startBottomCurveBM = new createjs.Bitmap(preload.getResult('start-bottomcurve')).set({
        regX: Math.ceil(w / 2),
        regY: h
    });
    startBottomContainer.addChild(startBottomCurveBM);
    startBottomCurveBM.scaleX = startBottomCurveBM.scaleY = nGameScale;
    startBottomCurveBM.x = Math.floor(nStageWidth * 0.5);

    /*w = preload.getResult('instructions-btn').width;
    h = preload.getResult('instructions-btn').height;
    instructionsButtonBM = new createjs.Bitmap(preload.getResult('instructions-btn')).set({
        regX: Math.ceil(w/2),
        regY: h
    });
    startBottomContainer.addChild(instructionsButtonBM);
    instructionsButtonBM.scaleX = instructionsButtonBM.scaleY = nGameScale;
    instructionsButtonBM.x = Math.floor(nStageWidth * 0.5);
    instructionsButtonBM.y = Math.ceil(-30 * nGameScale);
    instructionsButtonBM.on("mouseover", function(evt) {
        document.body.style.cursor='pointer';
    });
    instructionsButtonBM.on("mouseout", function(evt) {
        document.body.style.cursor='default';
    });
    instructionsButtonBM.on("click", function(evt) {
        onInstructionsButtonClick();
    });*/

    w = preload.getResult('cr-line').width;
    h = preload.getResult('cr-line').height;
    crLineStartScreenBM = new createjs.Bitmap(preload.getResult('cr-line')).set({
        regX: Math.ceil(w / 2),
        regY: h
    });
    startBottomContainer.addChild(crLineStartScreenBM);
    crLineStartScreenBM.scaleX = crLineStartScreenBM.scaleY = nGameScale;
    crLineStartScreenBM.x = Math.floor(nStageWidth * 0.5);
    crLineStartScreenBM.y = Math.ceil(-80 * nGameScale);

}

function buildGameScreen() {
    var w, h;


    gameOddbodsContainer = new createjs.Container();
    stage.addChild(gameOddbodsContainer);
    gameOddbodsContainer.x = Math.floor(12 * nGameScale);
    gameOddbodsContainer.y = Math.floor(110 * nGameScale);
    gameOddbodsContainer.visible = false;


    levelStartBackgroundContainer = new createjs.Container();
    stage.addChild(levelStartBackgroundContainer);
    levelStartBackgroundContainer.visible = false;

    w = preload.getResult('levelstartBackground').width;
    h = preload.getResult('levelstartBackground').height;
    levelStartBackgroundBM = new createjs.Bitmap(preload.getResult('levelstartBackground')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    levelStartBackgroundContainer.addChild(levelStartBackgroundBM);
    levelStartBackgroundBM.x = Math.floor(nStageWidth * 0.5);
    levelStartBackgroundBM.y = Math.floor(nStageHeight * 0.5);
    levelStartBackgroundBM.scaleX = levelStartBackgroundBM.scaleY = nGameScale;

    nBigLevelTextWidth = preload.getResult('big-level-txt').width;
    bigLevelTextBM = new createjs.Bitmap(preload.getResult('big-level-txt'));
    levelStartBackgroundContainer.addChild(bigLevelTextBM);
    bigLevelTextBM.x = Math.floor(nStageWidth * 0.5);
    bigLevelTextBM.y = Math.floor(nGameScale * 146);
    bigLevelTextBM.scaleX = bigLevelTextBM.scaleY = nGameScale;


    aBigLevelDigitsTeal = [];
    for (var i = 0; i < 2; i++) {
        var animframes = [
            [0, 0, 64, 130, 0, 0, 0],
            [64, 0, 64, 130, 0, 0, 0],
            [128, 0, 64, 130, 0, 0, 0],
            [192, 0, 64, 130, 0, 0, 0],
            [0, 130, 64, 130, 0, 0, 0],
            [64, 130, 64, 130, 0, 0, 0],
            [128, 130, 64, 130, 0, 0, 0],
            [192, 130, 64, 130, 0, 0, 0],
            [0, 260, 64, 130, 0, 0, 0],
            [64, 260, 64, 130, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers105teal')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 32,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale;
        targetNum.x = bigLevelTextBM.x + Math.floor((0.5 + i) * nGameScale * 40);
        targetNum.y = bigLevelTextBM.y - Math.floor(nGameScale * 7);
        levelStartBackgroundContainer.addChild(targetNum);
        aBigLevelDigitsTeal.push(targetNum);
    }



    gameTopContainer = new createjs.Container();
    stage.addChild(gameTopContainer);
    gameTopContainer.visible = false;

    w = preload.getResult('game-topcurve').width;
    h = preload.getResult('game-topcurve').height;
    gameTopcurveBM = new createjs.Bitmap(preload.getResult('game-topcurve')).set({
        regX: Math.ceil(w / 2),
        regY: 0
    });
    gameTopContainer.addChild(gameTopcurveBM);
    gameTopcurveBM.scaleX = gameTopcurveBM.scaleY = nGameScale;
    gameTopcurveBM.x = Math.floor(nStageWidth * 0.5);



    w = preload.getResult('ingame-score-txt').width;
    h = preload.getResult('ingame-score-txt').height;
    inGameScoreTextBM = new createjs.Bitmap(preload.getResult('ingame-score-txt')).set({
        regX: Math.ceil(w / 2),
        regY: 0
    });
    gameTopContainer.addChild(inGameScoreTextBM);
    inGameScoreTextBM.scaleX = inGameScoreTextBM.scaleY = nGameScale;
    inGameScoreTextBM.x = Math.floor(nStageWidth * 0.5);
    inGameScoreTextBM.y = Math.floor(nGameScale * 290);


    w = preload.getResult('ingame-best-txt').width;
    h = preload.getResult('ingame-best-txt').height;
    inGameBestTextBM = new createjs.Bitmap(preload.getResult('ingame-best-txt')).set({
        regX: w,
        regY: 0
    });
    gameTopContainer.addChild(inGameBestTextBM);
    inGameBestTextBM.scaleX = inGameBestTextBM.scaleY = nGameScale;
    inGameBestTextBM.x = nStageWidth - Math.floor(nGameScale * 80);
    inGameBestTextBM.y = Math.floor(nGameScale * 286);


    w = preload.getResult('ingame-total-txt').width;
    h = preload.getResult('ingame-total-txt').height;
    inGameTotalTextBM = new createjs.Bitmap(preload.getResult('ingame-total-txt')).set({
        regX: w,
        regY: 0
    });
    gameTopContainer.addChild(inGameTotalTextBM);
    inGameTotalTextBM.scaleX = inGameTotalTextBM.scaleY = nGameScale;
    inGameTotalTextBM.x = nStageWidth - Math.floor(nGameScale * 80);
    inGameTotalTextBM.y = Math.floor(nGameScale * 321);


    nInGameLevelWordWidth = preload.getResult('level-txt').width;
    h = preload.getResult('level-txt').height;
    levelTextBM = new createjs.Bitmap(preload.getResult('level-txt'));
    gameTopContainer.addChild(levelTextBM);
    levelTextBM.scaleX = levelTextBM.scaleY = nGameScale;
    levelTextBM.x = Math.floor(nGameScale * 20);
    levelTextBM.y = Math.floor(nGameScale * 290);
    nInGameLevelWordWidth *= levelTextBM.scaleX;


    aLevelDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 24, 46, 0, 0, 0],
            [24, 0, 24, 46, 0, 0, 0],
            [48, 0, 24, 46, 0, 0, 0],
            [72, 0, 24, 46, 0, 0, 0],
            [96, 0, 24, 46, 0, 0, 0],
            [0, 46, 24, 46, 0, 0, 0],
            [24, 46, 24, 46, 0, 0, 0],
            [48, 46, 24, 46, 0, 0, 0],
            [72, 46, 24, 46, 0, 0, 0],
            [96, 46, 24, 46, 0, 0, 0],
            [0, 92, 24, 46, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers32')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 24,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale;
        targetNum.alpha = 0.66;
        targetNum.x = levelTextBM.x + nInGameLevelWordWidth + ((i + 1.7) * (nGameScale * 14));
        targetNum.y = Math.floor(nGameScale * 286);
        gameTopContainer.addChild(targetNum);
        aLevelDigits.push(targetNum);
    }


    aTopBestScoreDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 24, 46, 0, 0, 0],
            [24, 0, 24, 46, 0, 0, 0],
            [48, 0, 24, 46, 0, 0, 0],
            [72, 0, 24, 46, 0, 0, 0],
            [96, 0, 24, 46, 0, 0, 0],
            [0, 46, 24, 46, 0, 0, 0],
            [24, 46, 24, 46, 0, 0, 0],
            [48, 46, 24, 46, 0, 0, 0],
            [72, 46, 24, 46, 0, 0, 0],
            [96, 46, 24, 46, 0, 0, 0],
            [0, 92, 24, 46, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers32')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 24,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale;
        targetNum.alpha = 0.66;
        targetNum.x = nStageWidth - ((4 - i) * (nGameScale * 14));
        targetNum.y = Math.floor(nGameScale * 288);
        gameTopContainer.addChild(targetNum);
        aTopBestScoreDigits.push(targetNum);
    }

    aTopTotalScoreDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 24, 46, 0, 0, 0],
            [24, 0, 24, 46, 0, 0, 0],
            [48, 0, 24, 46, 0, 0, 0],
            [72, 0, 24, 46, 0, 0, 0],
            [96, 0, 24, 46, 0, 0, 0],
            [0, 46, 24, 46, 0, 0, 0],
            [24, 46, 24, 46, 0, 0, 0],
            [48, 46, 24, 46, 0, 0, 0],
            [72, 46, 24, 46, 0, 0, 0],
            [96, 46, 24, 46, 0, 0, 0],
            [0, 92, 24, 46, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers32')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 24,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale;
        targetNum.alpha = 0.66;
        targetNum.x = nStageWidth - ((4 - i) * (nGameScale * 14));
        targetNum.y = Math.floor(nGameScale * 318);
        gameTopContainer.addChild(targetNum);
        aTopTotalScoreDigits.push(targetNum);
    }

    aInGameScoreDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 64, 130, 0, 0, 0],
            [64, 0, 64, 130, 0, 0, 0],
            [128, 0, 64, 130, 0, 0, 0],
            [192, 0, 64, 130, 0, 0, 0],
            [0, 130, 64, 130, 0, 0, 0],
            [64, 130, 64, 130, 0, 0, 0],
            [128, 130, 64, 130, 0, 0, 0],
            [192, 130, 64, 130, 0, 0, 0],
            [0, 260, 64, 130, 0, 0, 0],
            [64, 260, 64, 130, 0, 0, 0],
            [128, 260, 64, 130, 0, 0, 0]
        ]
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers78')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var scoreNum = new createjs.Sprite(spriteSheet).set({
            regX: 32,
            regY: 0
        });
        scoreNum.scaleX = scoreNum.scaleY = nGameScale * 0.75;
        scoreNum.y = Math.floor(nGameScale * 315);
        gameTopContainer.addChild(scoreNum);
        aInGameScoreDigits.push(scoreNum);
    }

    aInGameTargetScoreDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 24, 46, 0, 0, 0],
            [24, 0, 24, 46, 0, 0, 0],
            [48, 0, 24, 46, 0, 0, 0],
            [72, 0, 24, 46, 0, 0, 0],
            [96, 0, 24, 46, 0, 0, 0],
            [0, 46, 24, 46, 0, 0, 0],
            [24, 46, 24, 46, 0, 0, 0],
            [48, 46, 24, 46, 0, 0, 0],
            [72, 46, 24, 46, 0, 0, 0],
            [96, 46, 24, 46, 0, 0, 0],
            [0, 92, 24, 46, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers32')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var scoreNum = new createjs.Sprite(spriteSheet).set({
            regX: 24,
            regY: 0
        });
        scoreNum.scaleX = scoreNum.scaleY = nGameScale * 0.9;
        scoreNum.alpha = 0.6;
        scoreNum.y = Math.floor(nGameScale * 335);
        gameTopContainer.addChild(scoreNum);
        aInGameTargetScoreDigits.push(scoreNum);
    }



    gameBottomContainer = new createjs.Container();
    stage.addChild(gameBottomContainer);
    gameBottomContainer.visible = false;

    w = preload.getResult('game-bottomcurve').width;
    h = preload.getResult('game-bottomcurve').height;
    gameBottomcurveBM = new createjs.Bitmap(preload.getResult('game-bottomcurve')).set({
        regX: Math.ceil(w / 2),
        regY: 0
    });
    gameBottomContainer.addChild(gameBottomcurveBM);
    gameBottomcurveBM.scaleX = gameBottomcurveBM.scaleY = nGameScale;
    gameBottomcurveBM.x = Math.floor(nStageWidth * 0.5);

    backBtnBM = new createjs.Bitmap(preload.getResult('back-btn'));
    gameBottomContainer.addChild(backBtnBM);
    backBtnBM.scaleX = backBtnBM.scaleY = nGameScale * 0.7;
    backBtnBM.x = Math.floor(14 * nGameScale);
    backBtnBM.y = Math.floor(nGameScale * 98);
    backBtnBM.on("mouseover", function(evt) {
        document.body.style.cursor = 'pointer';
    });
    backBtnBM.on("mouseout", function(evt) {
        document.body.style.cursor = 'default';
    });
    backBtnBM.on("click", function(evt) {
        onBackClicked();
    });

    w = preload.getResult('cr-line').width;
    h = preload.getResult('cr-line').height;
    crLineGameScreenBM = new createjs.Bitmap(preload.getResult('cr-line')).set({
        regX: Math.ceil(w / 2),
        regY: 0
    });
    gameBottomContainer.addChild(crLineGameScreenBM);
    crLineGameScreenBM.scaleX = crLineGameScreenBM.scaleY = nGameScale;
    crLineGameScreenBM.x = Math.floor(nStageWidth * 0.5);
    crLineGameScreenBM.y = Math.ceil(nGameScale * 114);




    targetScoreContainer = new createjs.Container();
    stage.addChild(targetScoreContainer);
    targetScoreContainer.x = Math.floor(nStageWidth * 0.5);
    targetScoreContainer.y = Math.floor(nStageHeight * 0.5) - Math.floor(nGameScale * 140);
    targetScoreContainer.visible = false;
    targetScoreContainer.on("click", function(evt) {
        onLevelTargetScorePanelClick();
    });

    w = preload.getResult('targetScoreBackground').width;
    h = preload.getResult('targetScoreBackground').height;
    targetScoreBackgroundBM = new createjs.Bitmap(preload.getResult('targetScoreBackground')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    targetScoreContainer.addChild(targetScoreBackgroundBM);
    targetScoreBackgroundBM.scaleX = targetScoreBackgroundBM.scaleY = nGameScale;

    aTargetScoreDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 64, 130, 0, 0, 0],
            [64, 0, 64, 130, 0, 0, 0],
            [128, 0, 64, 130, 0, 0, 0],
            [192, 0, 64, 130, 0, 0, 0],
            [0, 130, 64, 130, 0, 0, 0],
            [64, 130, 64, 130, 0, 0, 0],
            [128, 130, 64, 130, 0, 0, 0],
            [192, 130, 64, 130, 0, 0, 0],
            [0, 260, 64, 130, 0, 0, 0],
            [64, 260, 64, 130, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers105')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 32,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale;
        targetNum.x = Math.floor((-1.5 + i) * nGameScale * 40);
        targetNum.y = Math.floor(nGameScale * 0);
        targetScoreContainer.addChild(targetNum);
        aTargetScoreDigits.push(targetNum);
    }


    w = preload.getResult('target-score').width;
    h = preload.getResult('target-score').height;
    targetScoreTextBM = new createjs.Bitmap(preload.getResult('target-score')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    targetScoreContainer.addChild(targetScoreTextBM);
    targetScoreTextBM.y = Math.ceil(-35 * nGameScale);
    targetScoreTextBM.scaleX = targetScoreTextBM.scaleY = nGameScale;

    scorePopupContainer = new createjs.Container();
    stage.addChild(scorePopupContainer);
    scorePopupContainer.visible = false;

    w = preload.getResult('score-popup').width;
    h = preload.getResult('score-popup').height;
    scorePopupBM = new createjs.Bitmap(preload.getResult('score-popup')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    scorePopupContainer.addChild(scorePopupBM);
    scorePopupBM.scaleX = scorePopupBM.scaleY = nGameScale;

    aScorePopupDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 64, 130, 0, 0, 0],
            [64, 0, 64, 130, 0, 0, 0],
            [128, 0, 64, 130, 0, 0, 0],
            [192, 0, 64, 130, 0, 0, 0],
            [0, 130, 64, 130, 0, 0, 0],
            [64, 130, 64, 130, 0, 0, 0],
            [128, 130, 64, 130, 0, 0, 0],
            [192, 130, 64, 130, 0, 0, 0],
            [0, 260, 64, 130, 0, 0, 0],
            [64, 260, 64, 130, 0, 0, 0],
            [128, 260, 64, 130, 0, 0, 0]
        ]
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers78')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var scoreNum = new createjs.Sprite(spriteSheet).set({
            regX: 32,
            regY: 0
        });
        scoreNum.scaleX = scoreNum.scaleY = nGameScale;
        scoreNum.y = Math.floor(nGameScale * -40);
        scorePopupContainer.addChild(scoreNum);
        aScorePopupDigits.push(scoreNum);
    }



}

function buildEndScreen() {
    var w, h;

    w = preload.getResult('oddbods-logo-endscreen').width;
    h = preload.getResult('oddbods-logo-endscreen').height;
    oddBodsLogoEndScreenBM = new createjs.Bitmap(preload.getResult('oddbods-logo-endscreen')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(oddBodsLogoEndScreenBM);
    oddBodsLogoEndScreenBM.visible = false;
    oddBodsLogoEndScreenBM.scaleX = oddBodsLogoEndScreenBM.scaleY = nGameScale;
    oddBodsLogoEndScreenBM.x = Math.ceil(nStageWidth * 0.5);
    oddBodsLogoEndScreenBM.y = Math.ceil(62 * nGameScale);

    endFailWinGuyContainer = new createjs.Container();
    stage.addChild(endFailWinGuyContainer);
    endFailWinGuyContainer.x = Math.ceil(nStageWidth * 0.5);
    endFailWinGuyContainer.y = Math.ceil(710 * nGameScale);
    endFailWinGuyContainer.visible = false;

    w = preload.getResult('end-fail-greenguy').width;
    h = preload.getResult('end-fail-greenguy').height;
    endFailGreenguyBM = new createjs.Bitmap(preload.getResult('end-fail-greenguy')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endFailWinGuyContainer.addChild(endFailGreenguyBM);
    endFailGreenguyBM.scaleX = endFailGreenguyBM.scaleY = nGameScale;

    w = preload.getResult('end-fail-redguy').width;
    h = preload.getResult('end-fail-redguy').height;
    endFailRedGuyBM = new createjs.Bitmap(preload.getResult('end-fail-redguy')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endFailWinGuyContainer.addChild(endFailRedGuyBM);
    endFailRedGuyBM.scaleX = endFailRedGuyBM.scaleY = nGameScale;

    w = preload.getResult('end-win-yellowguy').width;
    h = preload.getResult('end-win-yellowguy').height;
    endWinGuyYellowBM = new createjs.Bitmap(preload.getResult('end-win-yellowguy')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endFailWinGuyContainer.addChild(endWinGuyYellowBM);
    endWinGuyYellowBM.scaleX = endWinGuyYellowBM.scaleY = nGameScale;


    ////

    endMessagesContainer = new createjs.Container();
    stage.addChild(endMessagesContainer);
    endMessagesContainer.x = Math.ceil(nStageWidth * 0.5);
    endMessagesContainer.y = Math.ceil(205 * nGameScale);
    endMessagesContainer.visible = false;

    w = preload.getResult('end-fail-green').width;
    h = preload.getResult('end-fail-green').height;
    endFailMessageGreenBM = new createjs.Bitmap(preload.getResult('end-fail-green')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endMessagesContainer.addChild(endFailMessageGreenBM);
    endFailMessageGreenBM.scaleX = endFailMessageGreenBM.scaleY = nGameScale;

    w = preload.getResult('end-fail-red').width;
    h = preload.getResult('end-fail-red').height;
    endFailMessageRedBM = new createjs.Bitmap(preload.getResult('end-fail-red')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endMessagesContainer.addChild(endFailMessageRedBM);
    endFailMessageRedBM.scaleX = endFailMessageRedBM.scaleY = nGameScale;

    w = preload.getResult('end-win-yellow').width;
    h = preload.getResult('end-win-yellow').height;
    endWinMessageYellowBM = new createjs.Bitmap(preload.getResult('end-win-yellow')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endMessagesContainer.addChild(endWinMessageYellowBM);
    endWinMessageYellowBM.scaleX = endWinMessageYellowBM.scaleY = nGameScale;



    w = preload.getResult('play-again-btn').width;
    h = preload.getResult('play-again-btn').height;
    playAgainBM = new createjs.Bitmap(preload.getResult('play-again-btn')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    playAgainBM.x = Math.ceil(nStageWidth * 0.5);
    playAgainBM.y = Math.ceil(1000 * nGameScale);
    stage.addChild(playAgainBM);
    playAgainBM.visible = false;
    playAgainBM.on("mouseover", function(evt) {
        document.body.style.cursor = 'pointer';
    });
    playAgainBM.on("mouseout", function(evt) {
        document.body.style.cursor = 'default';
    });
    playAgainBM.on("click", function(evt) {
        onPlayAgainClicked();
    });


    //, youScoreTextBM, ,
    endScoreContainer = new createjs.Container();
    endScoreContainer.x = Math.ceil(nStageWidth * 0.5);
    endScoreContainer.y = Math.ceil(nGameScale * 380);
    stage.addChild(endScoreContainer);
    endScoreContainer.visible = false;

    w = preload.getResult('end-score-holder').width;
    h = preload.getResult('end-score-holder').height;
    endScoreHolderBM = new createjs.Bitmap(preload.getResult('end-score-holder')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    endScoreHolderBM.scaleX = endScoreHolderBM.scaleY = nGameScale;
    endScoreContainer.addChild(endScoreHolderBM);

    //
    w = preload.getResult('your-score').width;
    h = preload.getResult('your-score').height;
    youScoreTextBM = new createjs.Bitmap(preload.getResult('your-score')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    youScoreTextBM.y = Math.floor(nGameScale * -40);
    youScoreTextBM.scaleX = youScoreTextBM.scaleY = nGameScale;
    endScoreContainer.addChild(youScoreTextBM);


    aEndBigScoreDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 64, 130, 0, 0, 0],
            [64, 0, 64, 130, 0, 0, 0],
            [128, 0, 64, 130, 0, 0, 0],
            [192, 0, 64, 130, 0, 0, 0],
            [0, 130, 64, 130, 0, 0, 0],
            [64, 130, 64, 130, 0, 0, 0],
            [128, 130, 64, 130, 0, 0, 0],
            [192, 130, 64, 130, 0, 0, 0],
            [0, 260, 64, 130, 0, 0, 0],
            [64, 260, 64, 130, 0, 0, 0]
        ];
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers105')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 32,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale;
        targetNum.x = Math.floor(nGameScale * 40 * i);
        targetNum.y = Math.floor(nGameScale * -20);
        endScoreContainer.addChild(targetNum);
        aEndBigScoreDigits.push(targetNum);
    }


    topScoreEndScreenContainer = new createjs.Container();
    topScoreEndScreenContainer.x = Math.ceil(nStageWidth * 0.5) + Math.ceil(nGameScale * 190);
    topScoreEndScreenContainer.y = Math.ceil(nGameScale * 473);
    stage.addChild(topScoreEndScreenContainer);
    topScoreEndScreenContainer.visible = false;

    w = preload.getResult('top-score-endscreen').width;
    h = preload.getResult('top-score-endscreen').height;
    topScoreEndScreenBM = new createjs.Bitmap(preload.getResult('top-score-endscreen')).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    topScoreEndScreenBM.scaleX = topScoreEndScreenBM.scaleY = nGameScale;
    topScoreEndScreenContainer.addChild(topScoreEndScreenBM);

    aTopScoreEndScreenDigits = [];
    for (var i = 0; i < 4; i++) {
        var animframes = [
            [0, 0, 64, 130, 0, 0, 0],
            [64, 0, 64, 130, 0, 0, 0],
            [128, 0, 64, 130, 0, 0, 0],
            [192, 0, 64, 130, 0, 0, 0],
            [0, 130, 64, 130, 0, 0, 0],
            [64, 130, 64, 130, 0, 0, 0],
            [128, 130, 64, 130, 0, 0, 0],
            [192, 130, 64, 130, 0, 0, 0],
            [0, 260, 64, 130, 0, 0, 0],
            [64, 260, 64, 130, 0, 0, 0],
            [128, 260, 64, 130, 0, 0, 0]
        ]
        var spriteSheet = new createjs.SpriteSheet({
            // image to use
            images: [preload.getResult('numbers78')],
            // width, height & registration point of each sprite
            frames: animframes,
            animations: {
                // start, end, next, speed
                show: [0, animframes.length - 1, false, 1]
            }

        });
        var targetNum = new createjs.Sprite(spriteSheet).set({
            regX: 32,
            regY: 0
        });
        targetNum.scaleX = targetNum.scaleY = nGameScale * 0.7;
        targetNum.x = Math.floor(nGameScale * 20 * i);
        targetNum.y = Math.floor(nGameScale * -29);
        targetNum.alpha = 0.66;
        topScoreEndScreenContainer.addChild(targetNum);
        aTopScoreEndScreenDigits.push(targetNum);
    }



    endBottomContainer = new createjs.Container();
    stage.addChild(endBottomContainer);
    endBottomContainer.visible = false;

    w = preload.getResult('start-bottomcurve').width;
    h = preload.getResult('start-bottomcurve').height;
    endBottomCurveBM = new createjs.Bitmap(preload.getResult('start-bottomcurve')).set({
        regX: Math.ceil(w / 2),
        regY: h
    });
    endBottomContainer.addChild(endBottomCurveBM);
    endBottomCurveBM.scaleX = endBottomCurveBM.scaleY = nGameScale;
    endBottomCurveBM.x = Math.floor(nStageWidth * 0.5);

    w = preload.getResult('cr-line').width;
    h = preload.getResult('cr-line').height;
    crLineEndScreenBM = new createjs.Bitmap(preload.getResult('cr-line')).set({
        regX: Math.ceil(w / 2),
        regY: h
    });
    endBottomContainer.addChild(crLineEndScreenBM);
    crLineEndScreenBM.scaleX = crLineEndScreenBM.scaleY = nGameScale;
    crLineEndScreenBM.x = Math.floor(nStageWidth * 0.5);
    crLineEndScreenBM.y = Math.ceil(-80 * nGameScale);
}

//////////////////////////////////////////////////////
//Show hide screens
function hideLoaderScreen() {
    createjs.Tween.get(loaderLogoBM).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(loaderContainer).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(loadingTextBM).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
}

function showStartScreen() {
    startScreenPlayBtnBM.visible = true;
    startBottomContainer.visible = true;
    mainImageStartScreenBM.visible = true;
    introCopyBM.visible = true;
    oddBodsLogoStartScreenBM.visible = true;
    gameTitleBM.visible = true;

    startScreenPlayBtnBM.alpha = 1;
    startBottomContainer.alpha = 1;
    mainImageStartScreenBM.alpha = 1;
    oddBodsLogoStartScreenBM.alpha = 1;
    gameTitleBM.alpha = 1;


    oddBodsLogoStartScreenBM.scaleX = oddBodsLogoStartScreenBM.scaleY = 0;
    createjs.Tween.get(oddBodsLogoStartScreenBM).wait(10).to({
        scaleX: nGameScale,
        scaleY: nGameScale
    }, 600, createjs.Ease.backOut);


    window.setTimeout(playWobble, 170);
    gameTitleBM.scaleX = gameTitleBM.scaleY = 0;
    createjs.Tween.get(gameTitleBM).wait(150).to({
        scaleX: nGameScale,
        scaleY: nGameScale
    }, 600, createjs.Ease.backOut);

    mainImageStartScreenBM.scaleX = mainImageStartScreenBM.scaleY = 0;
    createjs.Tween.get(mainImageStartScreenBM).wait(250).to({
        scaleX: nGameScale,
        scaleY: nGameScale
    }, 600, createjs.Ease.backOut);

    introCopyBM.alpha = 0;
    createjs.Tween.get(introCopyBM).wait(250).to({
        alpha: 1
    }, 600, createjs.Ease.sineIn);

    startScreenPlayBtnBM.scaleX = startScreenPlayBtnBM.scaleY = 0;
    createjs.Tween.get(startScreenPlayBtnBM).wait(700).to({
        scaleX: nGameScale,
        scaleY: nGameScale
    }, 600, createjs.Ease.backOut);

    startBottomContainer.y = nStageHeight + (110 * nGameScale);
    createjs.Tween.get(startBottomContainer).wait(350).to({
        y: nStageHeight + (60 * nGameScale)
    }, 600, createjs.Ease.sineOut);
}

function hideStartScreen() {
    createjs.Tween.get(oddBodsLogoStartScreenBM).wait(50).to({
        alpha: 0,
        visible: false
    }, 200, createjs.Ease.sineOut);
    createjs.Tween.get(gameTitleBM).wait(100).to({
        alpha: 0,
        visible: false
    }, 200, createjs.Ease.sineOut);
    createjs.Tween.get(mainImageStartScreenBM).wait(150).to({
        alpha: 0,
        visible: false
    }, 200, createjs.Ease.sineOut);
    createjs.Tween.get(introCopyBM).wait(200).to({
        alpha: 0,
        visible: false
    }, 200, createjs.Ease.sineOut);
    createjs.Tween.get(startScreenPlayBtnBM).to({
        alpha: 0,
        visible: false
    }, 200, createjs.Ease.sineOut);
    createjs.Tween.get(startBottomContainer).wait(50).to({
        y: nStageHeight + (110 * nGameScale),
        visible: false
    }, 200, createjs.Ease.sineOut);
}

function showGameScreen() {
    gameOddbodsContainer.visible = true;

    gameTopContainer.visible = true;
    gameTopContainer.y = -(372 * nGameScale);
    createjs.Tween.get(gameTopContainer).wait(10).to({
        y: -280 * nGameScale
    }, 600, createjs.Ease.sineOut);

    gameBottomContainer.visible = true;
    gameBottomContainer.y = nStageHeight;
    createjs.Tween.get(gameBottomContainer).wait(10).to({
        y: nStageHeight - (146 * nGameScale)
    }, 600, createjs.Ease.sineOut);

    fadeThemeSound(0.4);

    setupNewGame();
}

function hideGameScreen() {
    gameOddbodsContainer.visible = false;

    fadeThemeSound(1);

    createjs.Tween.get(gameTopContainer).wait(50).to({
        y: -(372 * nGameScale),
        visible: false
    }, 200, createjs.Ease.sineOut);
    createjs.Tween.get(gameBottomContainer).wait(50).to({
        y: nStageHeight,
        visible: false
    }, 200, createjs.Ease.sineOut);
}

function showEndScreen() {
    var i;

    oddBodsLogoEndScreenBM.alpha = 1;
    oddBodsLogoEndScreenBM.visible = true;
    oddBodsLogoEndScreenBM.scaleX = oddBodsLogoEndScreenBM.scaleY = 0;
    createjs.Tween.get(oddBodsLogoEndScreenBM).wait(10).to({
        scaleX: nGameScale,
        scaleY: nGameScale
    }, 600, createjs.Ease.backOut);

    //
    endFailWinGuyContainer.alpha = 1;
    endFailWinGuyContainer.visible = true;
    endFailWinGuyContainer.scaleX = endFailWinGuyContainer.scaleY = 0;
    createjs.Tween.get(endFailWinGuyContainer).wait(200).to({
        scaleX: 1,
        scaleY: 1
    }, 600, createjs.Ease.backOut);

    if (bHasWonGame) {
        createjs.Sound.play("OB_gamewin");
        endFailGreenguyBM.visible = false;
        endFailRedGuyBM.visible = false;
        endWinGuyYellowBM.visible = true;
    } else {
        createjs.Sound.play("OB_gamelose");
        if (Math.random() > 0.5) {
            endFailGreenguyBM.visible = true;
            endFailRedGuyBM.visible = false;
        } else {
            endFailGreenguyBM.visible = false;
            endFailRedGuyBM.visible = true;
        }
        endWinGuyYellowBM.visible = false;
    }

    endFailMessageGreenBM.visible = endFailGreenguyBM.visible;
    endFailMessageRedBM.visible = endFailRedGuyBM.visible;
    endWinMessageYellowBM.visible = endWinGuyYellowBM.visible;

    endMessagesContainer.visible = true;
    endMessagesContainer.scaleX = endMessagesContainer.scaleY = 0;
    endMessagesContainer.alpha = 1;
    createjs.Tween.get(endMessagesContainer).wait(150).to({
        scaleX: 1,
        scaleY: 1
    }, 600, createjs.Ease.backOut);

    endScoreContainer.visible = true;
    endScoreContainer.scaleX = endScoreContainer.scaleY = 0;
    endScoreContainer.alpha = 1;
    createjs.Tween.get(endScoreContainer).wait(350).to({
        scaleX: 1,
        scaleY: 1
    }, 600, createjs.Ease.backOut);

    topScoreEndScreenContainer.visible = true;
    topScoreEndScreenContainer.scaleX = topScoreEndScreenContainer.scaleY = 0;
    topScoreEndScreenContainer.alpha = 1;
    createjs.Tween.get(topScoreEndScreenContainer).wait(450).to({
        scaleX: 1,
        scaleY: 1
    }, 600, createjs.Ease.backOut);

    playAgainBM.visible = true;
    playAgainBM.scaleX = playAgainBM.scaleY = 0;
    playAgainBM.alpha = 1;
    createjs.Tween.get(playAgainBM).wait(550).to({
        scaleX: nGameScale,
        scaleY: nGameScale
    }, 600, createjs.Ease.backOut);

    var totalScore = getTotalGameScore();
    for (i = 0; i < aEndBigScoreDigits.length; i++) {
        aEndBigScoreDigits[i].visible = false;
    }
    aEndBigScoreDigits[0].gotoAndStop(Math.floor(totalScore / 1000));
    aEndBigScoreDigits[1].gotoAndStop(Math.floor((totalScore % 1000) / 100));
    aEndBigScoreDigits[2].gotoAndStop(Math.floor((totalScore % 100) / 10));
    aEndBigScoreDigits[3].gotoAndStop(totalScore % 10);

    var offsetX = 0;
    if (totalScore < 10) {
        offsetX = Math.floor(-130 * nGameScale);
        aEndBigScoreDigits[0].visible = false;
        aEndBigScoreDigits[1].visible = false;
        aEndBigScoreDigits[2].visible = false;
        aEndBigScoreDigits[3].visible = true;
    } else if (totalScore < 100) {
        offsetX = Math.floor(-105 * nGameScale);
        aEndBigScoreDigits[0].visible = false;
        aEndBigScoreDigits[1].visible = false;
        aEndBigScoreDigits[2].visible = true;
        aEndBigScoreDigits[3].visible = true;
    } else if (totalScore < 1000) {
        offsetX = Math.floor(-80 * nGameScale);
        aEndBigScoreDigits[0].visible = false;
        aEndBigScoreDigits[1].visible = true;
        aEndBigScoreDigits[2].visible = true;
        aEndBigScoreDigits[3].visible = true;
    } else {
        offsetX = Math.floor(-70 * nGameScale);
        aEndBigScoreDigits[0].visible = true;
        aEndBigScoreDigits[1].visible = true;
        aEndBigScoreDigits[2].visible = true;
        aEndBigScoreDigits[3].visible = true;
    }
    //targetNum.x = Math.floor(nGameScale * 40 * i);
    for (i = 0; i < aEndBigScoreDigits.length; i++) {
        aEndBigScoreDigits[i].x = offsetX + Math.floor(nGameScale * 40 * i);
    }



    for (i = 0; i < aTopScoreEndScreenDigits.length; i++) {
        aTopScoreEndScreenDigits[i].visible = false;
    }
    aTopScoreEndScreenDigits[0].gotoAndStop(Math.floor(nBestScore / 1000));
    aTopScoreEndScreenDigits[1].gotoAndStop(Math.floor((nBestScore % 1000) / 100));
    aTopScoreEndScreenDigits[2].gotoAndStop(Math.floor((nBestScore % 100) / 10));
    aTopScoreEndScreenDigits[3].gotoAndStop(nBestScore % 10);

    var offsetX = 0;
    if (nBestScore < 10) {
        offsetX = Math.floor(-60 * nGameScale);
        aTopScoreEndScreenDigits[0].visible = false;
        aTopScoreEndScreenDigits[1].visible = false;
        aTopScoreEndScreenDigits[2].visible = false;
        aTopScoreEndScreenDigits[3].visible = true;
    } else if (nBestScore < 100) {
        offsetX = Math.floor(-50 * nGameScale);
        aTopScoreEndScreenDigits[0].visible = false;
        aTopScoreEndScreenDigits[1].visible = false;
        aTopScoreEndScreenDigits[2].visible = true;
        aTopScoreEndScreenDigits[3].visible = true;
    } else if (nBestScore < 1000) {
        offsetX = Math.floor(-40 * nGameScale);
        aTopScoreEndScreenDigits[0].visible = false;
        aTopScoreEndScreenDigits[1].visible = true;
        aTopScoreEndScreenDigits[2].visible = true;
        aTopScoreEndScreenDigits[3].visible = true;
    } else {
        offsetX = Math.floor(-30 * nGameScale);
        aTopScoreEndScreenDigits[0].visible = true;
        aTopScoreEndScreenDigits[1].visible = true;
        aTopScoreEndScreenDigits[2].visible = true;
        aTopScoreEndScreenDigits[3].visible = true;
    }
    //targetNum.x = Math.floor(nGameScale * 40 * i);
    for (i = 0; i < aTopScoreEndScreenDigits.length; i++) {
        aTopScoreEndScreenDigits[i].x = offsetX + Math.floor(nGameScale * 20 * i);
    }







    if (totalScore > nBestScore) {
        nBestScore = totalScore;
    }

    endBottomContainer.alpha = 1;
    endBottomContainer.visible = true;
    endBottomContainer.y = nStageHeight + (110 * nGameScale);
    createjs.Tween.get(endBottomContainer).wait(350).to({
        y: nStageHeight + (60 * nGameScale)
    }, 600, createjs.Ease.sineOut);
}

function hideEndScreen() {
    createjs.Tween.get(oddBodsLogoEndScreenBM).wait(10).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(endFailWinGuyContainer).wait(120).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(endMessagesContainer).wait(60).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(endScoreContainer).wait(180).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(topScoreEndScreenContainer).wait(30).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(playAgainBM).wait(10).to({
        alpha: 0,
        visible: false
    }, 600, createjs.Ease.sineOut);
    createjs.Tween.get(endBottomContainer).wait(50).to({
        y: nStageHeight + (110 * nGameScale),
        visible: false
    }, 200, createjs.Ease.sineOut);
    //


}

//////////////////////////////////////////////////////

function playWobble() {
    createjs.Sound.play("OB_wobble");
}

function startPlayingThemeSFX(_volume) {
    nCurrentThemeVolume = 0;
    playThemeSFX();
    oddbodsThemeSFX.volume = 0;
    nCurrentThemeVolume = _volume;
    createjs.Tween.get(oddbodsThemeSFX).wait(300).to({
        volume: _volume
    }, 1000, createjs.Ease.sineIn);
}

function playThemeSFX() {
    oddbodsThemeSFX = createjs.Sound.play("oddbodsTheme");
    oddbodsThemeSFX.volume = nCurrentThemeVolume;
    setTimeout(playThemeSFX, 42576);
}

function onToggleSoundOnOff() {
    playButtonClickSound();
    bSoundIsOn = !bSoundIsOn;

    createjs.Sound.setMute(!bSoundIsOn);

    soundOnBM.visible = bSoundIsOn;
    soundOffBM.visible = !bSoundIsOn;
}

function fadeThemeSound(_volume) {
    nCurrentThemeVolume = _volume;
    createjs.Tween.get(oddbodsThemeSFX).to({
        volume: _volume
    }, 1000, createjs.Ease.sineIn);
}

function onStartScreenStartClick() {
    playButtonClickSound();

    if (mob && !oddbodsThemeSFX) {
        startPlayingThemeSFX(1);
    }
    hideStartScreen();
    window.setTimeout(showGameScreen, 700);
}

function onBackClicked() {
    playButtonClickSound();
    clearLevel();
    hideGameScreen();
    window.setTimeout(showStartScreen, 700);
}

function setupNewGame() {
    handleTopBarBestScore();

    nCurrentLevel = 0;
    aLevelScores = [];
    for (var i = 0; i < aColourAmounts.length; i++) {
        aLevelScores.push(0);
    }
    makeGameGrid();
}

function getTotalGameScore() {
    var tot = 0;
    for (var i = 0; i < aLevelScores.length; i++) {
        tot += aLevelScores[i];
    }
    //console.log("TOT", aLevelScores);
    return tot;
}

function handleInGameLevelTarget() {
    var lt = getCurrentTarget();
    aInGameTargetScoreDigits[0].gotoAndStop(10);
    aInGameTargetScoreDigits[1].gotoAndStop(Math.floor((lt % 1000) / 100));
    aInGameTargetScoreDigits[2].gotoAndStop(Math.floor((lt % 100) / 10));
    aInGameTargetScoreDigits[3].gotoAndStop(lt % 10);

    aInGameTargetScoreDigits[0].visible = true;
    aInGameTargetScoreDigits[1].visible = lt > 99;
    aInGameTargetScoreDigits[2].visible = lt > 9;
    aInGameTargetScoreDigits[3].visible = true;

    var charSpacing = 13;
    for (i = 0; i < aInGameTargetScoreDigits.length; i++) {
        aInGameTargetScoreDigits[i].x = aInGameScoreDigits[3].x + Math.floor((i + 3) * nGameScale * charSpacing);
    }
}

function handleInGameMainScore() {
    var ts = aLevelScores[nCurrentLevel];
    aInGameScoreDigits[0].gotoAndStop(Math.floor(ts / 1000));
    aInGameScoreDigits[1].gotoAndStop(Math.floor((ts % 1000) / 100));
    aInGameScoreDigits[2].gotoAndStop(Math.floor((ts % 100) / 10));
    aInGameScoreDigits[3].gotoAndStop(ts % 10);

    aInGameScoreDigits[0].visible = ts > 999;
    aInGameScoreDigits[1].visible = ts > 99;
    aInGameScoreDigits[2].visible = ts > 9;
    aInGameScoreDigits[3].visible = true;

    var i;
    var hw = Math.ceil(nStageWidth * 0.5);
    var charSpacing = 25;
    if (ts < 10) {
        for (i = 0; i < aInGameScoreDigits.length; i++) {
            aInGameScoreDigits[i].x = hw + Math.floor((-3 + i) * nGameScale * charSpacing);
        }
    } else if (ts < 100) {
        for (i = 0; i < aInGameScoreDigits.length; i++) {
            aInGameScoreDigits[i].x = hw + Math.floor((-2.5 + i) * nGameScale * charSpacing);
        }
    } else if (ts < 1000) {
        for (i = 0; i < aInGameScoreDigits.length; i++) {
            aInGameScoreDigits[i].x = hw + Math.floor((-2 + i) * nGameScale * charSpacing);
        }
    } else {
        for (i = 0; i < aInGameScoreDigits.length; i++) {
            aInGameScoreDigits[i].x = hw + Math.floor((-1.5 + i) * nGameScale * charSpacing);
        }
    }

    handleTopBarTotalScore();
    handleInGameLevelTarget();
}

function handleTopBarCurrentLevel() {
    var i;
    for (i = 0; i < aLevelDigits.length; i++) {
        aLevelDigits[i].visible = false;
    }

    var cl = nCurrentLevel + 1;
    if (cl < 10) {
        aLevelDigits[0].gotoAndStop(cl);
        aLevelDigits[0].visible = true;
    } else {
        aLevelDigits[0].gotoAndStop(Math.floor(cl / 10));
        aLevelDigits[1].gotoAndStop(cl % 10);

        aLevelDigits[0].visible = true;
        aLevelDigits[1].visible = true;
    }

}

function handleTopBarBestScore() {
    var i;
    for (i = 0; i < aTopBestScoreDigits.length; i++) {
        aTopBestScoreDigits[i].visible = false;
    }

    aTopBestScoreDigits[0].gotoAndStop(Math.floor(nBestScore / 1000));
    aTopBestScoreDigits[1].gotoAndStop(Math.floor((nBestScore % 1000) / 100));
    aTopBestScoreDigits[2].gotoAndStop(Math.floor((nBestScore % 100) / 10));
    aTopBestScoreDigits[3].gotoAndStop(nBestScore % 10);

    if (nBestScore < 10) {
        aTopBestScoreDigits[0].visible = false;
        aTopBestScoreDigits[1].visible = false;
        aTopBestScoreDigits[2].visible = false;
        aTopBestScoreDigits[3].visible = true;
    } else if (nBestScore < 100) {
        aTopBestScoreDigits[0].visible = false;
        aTopBestScoreDigits[1].visible = false;
        aTopBestScoreDigits[2].visible = true;
        aTopBestScoreDigits[3].visible = true;
    } else if (nBestScore < 1000) {
        aTopBestScoreDigits[0].visible = false;
        aTopBestScoreDigits[1].visible = true;
        aTopBestScoreDigits[2].visible = true;
        aTopBestScoreDigits[3].visible = true;
    } else {
        aTopBestScoreDigits[0].visible = true;
        aTopBestScoreDigits[1].visible = true;
        aTopBestScoreDigits[2].visible = true;
        aTopBestScoreDigits[3].visible = true;
    }

    //.x = nStageWidth - Math.floor(nGameScale*80);
}

function handleTopBarTotalScore() {
    var i;
    for (i = 0; i < aTopTotalScoreDigits.length; i++) {
        aTopTotalScoreDigits[i].visible = false;
    }

    var ts = getTotalGameScore();

    aTopTotalScoreDigits[0].gotoAndStop(Math.floor(ts / 1000));
    aTopTotalScoreDigits[1].gotoAndStop(Math.floor((ts % 1000) / 100));
    aTopTotalScoreDigits[2].gotoAndStop(Math.floor((ts % 100) / 10));
    aTopTotalScoreDigits[3].gotoAndStop(ts % 10);

    if (ts < 10) {
        aTopTotalScoreDigits[0].visible = false;
        aTopTotalScoreDigits[1].visible = false;
        aTopTotalScoreDigits[2].visible = false;
        aTopTotalScoreDigits[3].visible = true;
    } else if (ts < 100) {
        aTopTotalScoreDigits[0].visible = false;
        aTopTotalScoreDigits[1].visible = false;
        aTopTotalScoreDigits[2].visible = true;
        aTopTotalScoreDigits[3].visible = true;
    } else if (ts < 1000) {
        aTopTotalScoreDigits[0].visible = false;
        aTopTotalScoreDigits[1].visible = true;
        aTopTotalScoreDigits[2].visible = true;
        aTopTotalScoreDigits[3].visible = true;
    } else {
        aTopTotalScoreDigits[0].visible = true;
        aTopTotalScoreDigits[1].visible = true;
        aTopTotalScoreDigits[2].visible = true;
        aTopTotalScoreDigits[3].visible = true;
    }

    //.x = nStageWidth - Math.floor(nGameScale*80);
}

function getCurrentTarget() {
    /*var tot = 0;
    for(var i=0;i<nCurrentLevel+1;i++){
        tot += aTargetScores[i]
    }
    return tot;*/
    return aTargetScores[nCurrentLevel];
}

function makeGameGrid() {
    //pick colours
    var colourOptions = [];
    var i;

    for (i = 0; i < aColourIDs.length; i++) {
        colourOptions.push(i);
    }

    var chosenColours = [];
    while (chosenColours.length < aColourAmounts[nCurrentLevel]) {
        var r = Math.floor(Math.random() * colourOptions.length);
        //
        chosenColours.push(colourOptions[r]);
        //
        colourOptions.splice(r, 1);
    }

    //calculate grid size
    var gameAreaWidth = nStageWidth - (24 * nGameScale);
    var gameAreaHeight = nStageHeight - ((110 + 70) * nGameScale);
    nGridPixelWidth = gameAreaWidth / aGridWidths[nCurrentLevel];
    nGridPixelHeight = nGridPixelWidth * (360 / 300);
    nGridHeight = Math.floor(gameAreaHeight / nGridPixelHeight);

    //build it
    aActiveGameOddbods = [];
    for (var yy = 0; yy < nGridHeight; yy++) {
        for (var xx = 0; xx < aGridWidths[nCurrentLevel]; xx++) {
            var col = chosenColours[Math.floor(Math.random() * chosenColours.length)];
            var oddbod = new createjs.Bitmap(preload.getResult('grid-' + aColourIDs[col]));
            gameOddbodsContainer.addChild(oddbod);
            //
            oddbod.x = xx * nGridPixelWidth;
            oddbod.y = yy * nGridPixelHeight;
            oddbod.scaleX = oddbod.scaleY = nGridPixelWidth / 300;
            oddbod.hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#f00").drawRect(0, 0, 300, 360));
            oddbod.gridPosX = xx;
            oddbod.gridPosY = yy;
            oddbod.colourID = col;
            oddbod.alpha = 0;
            //createjs.Tween.get(oddbod).wait(Math.floor(Math.random()*400)).to({scaleX:nGridPixelWidth/300, scaleY:nGridPixelWidth/300}, 600, createjs.Ease.backOut);
            //
            oddbod.on("mouseover", function(evt) {
                document.body.style.cursor = 'pointer';
            });
            oddbod.on("mouseout", function(evt) {
                document.body.style.cursor = 'default';
            });
            oddbod.on("click", function(evt) {
                onOddBodClick(this);
            });
            //
            aActiveGameOddbods.push(oddbod);
        }
    }

    showLevelTarget();
    handleInGameMainScore();
    handleTopBarCurrentLevel();

    nCanMoveCounter = -10;
    bCanMove = true;
}

function showLevelTarget() {
    var t = getCurrentTarget();
    aTargetScoreDigits[0].gotoAndStop(Math.floor(t / 1000));
    aTargetScoreDigits[1].gotoAndStop(Math.floor((t % 1000) / 100));
    aTargetScoreDigits[2].gotoAndStop(Math.floor((t % 100) / 10));
    aTargetScoreDigits[3].gotoAndStop(t % 10);
    var i;
    if (t < 100) {
        aTargetScoreDigits[0].visible = false;
        aTargetScoreDigits[1].visible = false;
        for (i = 0; i < aTargetScoreDigits.length; i++) {
            aTargetScoreDigits[i].x = Math.floor((-2.5 + i) * nGameScale * 40);
        }
    } else if (t < 1000) {
        aTargetScoreDigits[0].visible = false;
        aTargetScoreDigits[1].visible = true;
        for (i = 0; i < aTargetScoreDigits.length; i++) {
            aTargetScoreDigits[i].x = Math.floor((-2 + i) * nGameScale * 40);
        }
    } else {
        aTargetScoreDigits[0].visible = true;
        aTargetScoreDigits[1].visible = true;
        for (i = 0; i < aTargetScoreDigits.length; i++) {
            aTargetScoreDigits[i].x = Math.floor((-1.5 + i) * nGameScale * 40);
        }
    }
    //targetNum
    targetScoreContainer.visible = true;
    targetScoreContainer.scaleX = targetScoreContainer.scaleY = 0;
    createjs.Tween.get(targetScoreContainer).wait(50).to({
        scaleX: 1,
        scaleY: 1
    }, 600, createjs.Ease.backOut);
    nTargetScoreTimeoutID = window.setTimeout(hideTargetScorePanel, 1800);
    window.setTimeout(playWobble, 80);

    //
    var cl = nCurrentLevel + 1;
    aBigLevelDigitsTeal[0].visible = cl > 9;
    aBigLevelDigitsTeal[0].gotoAndStop(Math.floor(cl / 10));
    aBigLevelDigitsTeal[1].gotoAndStop(cl % 10);

    if (cl < 10) {
        bigLevelTextBM.x = Math.floor(nStageWidth - (nBigLevelTextWidth * nGameScale) - (nGameScale * 45)) * 0.5;
        aBigLevelDigitsTeal[1].x = bigLevelTextBM.x + (nBigLevelTextWidth * nGameScale) + Math.floor(nGameScale * 25);
    } else {
        bigLevelTextBM.x = Math.floor(nStageWidth - (nBigLevelTextWidth * nGameScale) - (nGameScale * 85)) * 0.5;
        aBigLevelDigitsTeal[0].x = bigLevelTextBM.x + (nBigLevelTextWidth * nGameScale) + Math.floor(nGameScale * 25);
        aBigLevelDigitsTeal[1].x = bigLevelTextBM.x + (nBigLevelTextWidth * nGameScale) + Math.floor(nGameScale * 65);
    }

    levelStartBackgroundContainer.alpha = 0;
    levelStartBackgroundContainer.visible = true;
    createjs.Tween.get(levelStartBackgroundContainer).to({
        alpha: 1
    }, 200, createjs.Ease.sineOut);

}

function onLevelTargetScorePanelClick() {
    hideTargetScorePanel();
}

function hideTargetScorePanel() {
    if (nTargetScoreTimeoutID) {
        window.clearTimeout(nTargetScoreTimeoutID);
    }
    createjs.Tween.get(levelStartBackgroundContainer).to({
        alpha: 0,
        visible: false
    }, 400, createjs.Ease.sineOut);
    createjs.Tween.get(targetScoreContainer).to({
        scaleX: 0,
        scaleY: 0,
        visible: false
    }, 400, createjs.Ease.backIn);

    for (var i = 0; i < aActiveGameOddbods.length; i++) {
        createjs.Tween.get(aActiveGameOddbods[i]).wait(300 + Math.floor(Math.random() * 400)).to({
            alpha: 1
        }, 200, createjs.Ease.sineOut);
    }
}

function onOddBodClick(_ref) {
    if (targetScoreContainer.visible) {
        //hideTargetScorePanel();
    } else {
        if (bCanMove) {

            bCanMove = false;
            nCanMoveCounter = Math.ceil((350 / 1000) * 50);

            var colourgroup = getSurroundingOddbods(_ref.gridPosX, _ref.gridPosY, _ref.colourID);

            if (colourgroup.length > 0) {
                //also add the clicked one
                colourgroup.push(_ref);

                //keep looking
                var keeplooking = true;
                var newOnes = colourgroup.concat([]);
                while (keeplooking) {
                    var freshOnes = [];
                    for (var i = 0; i < newOnes.length; i++) {
                        var cg = getSurroundingOddbods(newOnes[i].gridPosX, newOnes[i].gridPosY, newOnes[i].colourID);
                        for (var j = 0; j < cg.length; j++) {
                            //check if already exists
                            if (colourgroup.indexOf(cg[j]) == -1) {
                                //we found a new one. add it to the group
                                colourgroup.push(cg[j]);
                                freshOnes.push(cg[j]);
                            }
                        }
                    }
                    //
                    if (freshOnes.length > 0) {
                        newOnes = freshOnes.concat([]);
                    } else {
                        keeplooking = false;
                    }
                }
            }

            //
            if (colourgroup.length > 1) {
                removeOddbods(colourgroup);
                calculateNewPositionsVertical();
                calculateNewPositionsHorizontal();
                animateToNewPositions();
                //window.setTimeout(onGridMoveDone,600);
                addScore(colourgroup.length, ((_ref.gridPosX + 0.5) * nGridPixelWidth) + gameOddbodsContainer.x, ((_ref.gridPosY + 0.5) * nGridPixelHeight) + gameOddbodsContainer.y);
            }

        }
    }
}

function addScore(_groupSize, _xpos, _ypos) {
    //10n(n-1)
    var score = _groupSize * (_groupSize - 1);
    aLevelScores[nCurrentLevel] += score;


    for (var i = 2; i < aScorePopupDigits.length; i++) {
        aScorePopupDigits[i].visible = false;
    }
    aScorePopupDigits[0].gotoAndStop(10);
    var plusOffset = nGameScale * -30;

    if (score < 10) {
        aScorePopupDigits[1].visible = true;
        //
        aScorePopupDigits[1].x = 0;
        //
        aScorePopupDigits[1].gotoAndStop(score);
    } else if (score < 100) {
        aScorePopupDigits[1].visible = true;
        aScorePopupDigits[2].visible = true;
        //
        aScorePopupDigits[1].x = Math.floor(nGameScale * -15);
        aScorePopupDigits[2].x = Math.floor(nGameScale * 15);
        //
        aScorePopupDigits[1].gotoAndStop(Math.floor(score / 10));
        aScorePopupDigits[2].gotoAndStop(score % 10);
    } else {
        aScorePopupDigits[1].visible = true;
        aScorePopupDigits[2].visible = true;
        aScorePopupDigits[3].visible = true;
        //
        aScorePopupDigits[1].x = Math.floor(nGameScale * -30);
        aScorePopupDigits[2].x = 0;
        aScorePopupDigits[3].x = Math.floor(nGameScale * 30);
        //
        aScorePopupDigits[1].gotoAndStop(Math.floor(score / 100));
        aScorePopupDigits[2].gotoAndStop(Math.floor((score % 100) / 10));
        aScorePopupDigits[3].gotoAndStop(score % 10);
    }
    aScorePopupDigits[0].x = aScorePopupDigits[1].x + Math.floor(plusOffset);
    for (var i = 0; i < aScorePopupDigits.length; i++) {
        //aScorePopupDigits[i].x += Math.floor(plusOffset*0.5);
    }

    scorePopupContainer.visible = true;
    scorePopupContainer.scaleX = scorePopupContainer.scaleY = 0;
    scorePopupContainer.x = _xpos;
    scorePopupContainer.y = _ypos - (nGameScale * 80);
    scorePopupContainer.alpha = 1;
    createjs.Tween.removeTweens(scorePopupContainer);
    createjs.Tween.get(scorePopupContainer).to({
        scaleX: 1,
        scaleY: 1
    }, 100, createjs.Ease.backOut);
    if (nScorePopupTimeoutID) {
        window.clearTimeout(nScorePopupTimeoutID);
    }
    nScorePopupTimeoutID = window.setTimeout(hideScorePopup, 500);



}

function hideScorePopup() {
    createjs.Tween.get(scorePopupContainer).to({
        alpha: 0,
        scaleX: 0,
        scaleY: 0,
        x: nStageWidth * 0.5,
        y: 48 * nGameScale
    }, 300, createjs.Ease.sineIn);
    window.setTimeout(handleInGameMainScore, 250);

}

function getSurroundingOddbods(_xpos, _ypos, _colourID) {
    var found = [];
    for (var i = 0; i < aActiveGameOddbods.length; i++) {
        var ob = aActiveGameOddbods[i];
        if (ob.colourID == _colourID) {
            if (ob.gridPosX == _xpos - 1 && ob.gridPosY == _ypos) {
                found.push(ob);
            } else if (ob.gridPosX == _xpos + 1 && ob.gridPosY == _ypos) {
                found.push(ob);
            } else if (ob.gridPosX == _xpos && ob.gridPosY == _ypos - 1) {
                found.push(ob);
            } else if (ob.gridPosX == _xpos && ob.gridPosY == _ypos + 1) {
                found.push(ob);
            }
        }
    }
    return found;
}

function removeOddbods(_removeThese) {
    createjs.Sound.play("OB_removeOddbods");
    for (var i = 0; i < _removeThese.length; i++) {
        aActiveGameOddbods.splice(aActiveGameOddbods.indexOf(_removeThese[i]), 1);
        gameOddbodsContainer.removeChild(_removeThese[i]);
    }
}

function calculateNewPositionsVertical() {
    var keepGoing = true;

    while (keepGoing) {
        var movesFound = 0;
        for (var i = 0; i < aActiveGameOddbods.length; i++) {
            var checkThisOddBod = aActiveGameOddbods[i];
            var hasOneBelow = false;

            if (checkThisOddBod.gridPosY == nGridHeight - 1) {
                hasOneBelow = true;
            } else {
                for (var j = 0; j < aActiveGameOddbods.length; j++) {
                    if (i != j) {
                        if (aActiveGameOddbods[j].gridPosX == checkThisOddBod.gridPosX) {
                            if (aActiveGameOddbods[j].gridPosY == checkThisOddBod.gridPosY + 1) {
                                hasOneBelow = true;
                            }
                        }
                    }
                }
                //
                if (!hasOneBelow) {
                    checkThisOddBod.gridPosY++;
                    movesFound++;
                }
            }
        }
        //
        if (movesFound == 0) {
            keepGoing = false;
        }
    }
}

function calculateNewPositionsHorizontal() {
    var keepGoing = true;
    var j;

    while (keepGoing) {
        var movesFound = 0;
        for (var i = 0; i < aActiveGameOddbods.length; i++) {
            var checkThisOddBod = aActiveGameOddbods[i];
            var hasOneLeft = false;

            if (checkThisOddBod.gridPosX != 0 && checkThisOddBod.gridPosY == nGridHeight - 1) {
                //bottom row
                for (j = 0; j < aActiveGameOddbods.length; j++) {
                    if (i != j) {
                        if (aActiveGameOddbods[j].gridPosY == checkThisOddBod.gridPosY) {
                            if (aActiveGameOddbods[j].gridPosX == checkThisOddBod.gridPosX - 1) {
                                hasOneLeft = true;
                            }
                        }
                    }
                }
                //
                if (!hasOneLeft) {
                    //move whole column
                    for (j = 0; j < aActiveGameOddbods.length; j++) {
                        if (aActiveGameOddbods[j].gridPosX == checkThisOddBod.gridPosX) {
                            aActiveGameOddbods[j].gridPosX--;
                        }
                    }
                    movesFound++;
                }
            } else {
                hasOneLeft = true;
            }
        }
        //
        if (movesFound == 0) {
            keepGoing = false;
        }
    }
}

function animateToNewPositions() {
    for (var i = 0; i < aActiveGameOddbods.length; i++) {
        createjs.Tween.get(aActiveGameOddbods[i]).to({
            x: aActiveGameOddbods[i].gridPosX * nGridPixelWidth,
            y: aActiveGameOddbods[i].gridPosY * nGridPixelHeight
        }, 300, createjs.Ease.sineInOut);
    }
}

function onGridMoveDone() {
    if (!areThereAnyMovesLeft()) {
        levelComplete(aActiveGameOddbods.length == 0);
    }
}

function levelComplete(_cleared) {
    if (_cleared) {
        createjs.Sound.play("OB_levelCleared");
        doPartyAnimation();
    } else {
        clearLevel();
        finishLevel();
    }
}

function showExtraPartyScore() {
    var score = 100;
    aLevelScores[nCurrentLevel] += score;


    for (var i = 2; i < aScorePopupDigits.length; i++) {
        aScorePopupDigits[i].visible = false;
    }
    aScorePopupDigits[0].gotoAndStop(10);
    var plusOffset = nGameScale * -30;

    if (score < 10) {
        aScorePopupDigits[1].visible = true;
        //
        aScorePopupDigits[1].x = 0;
        //
        aScorePopupDigits[1].gotoAndStop(score);
    } else if (score < 100) {
        aScorePopupDigits[1].visible = true;
        aScorePopupDigits[2].visible = true;
        //
        aScorePopupDigits[1].x = Math.floor(nGameScale * -15);
        aScorePopupDigits[2].x = Math.floor(nGameScale * 15);
        //
        aScorePopupDigits[1].gotoAndStop(Math.floor(score / 10));
        aScorePopupDigits[2].gotoAndStop(score % 10);
    } else {
        aScorePopupDigits[1].visible = true;
        aScorePopupDigits[2].visible = true;
        aScorePopupDigits[3].visible = true;
        //
        aScorePopupDigits[1].x = Math.floor(nGameScale * -30);
        aScorePopupDigits[2].x = 0;
        aScorePopupDigits[3].x = Math.floor(nGameScale * 30);
        //
        aScorePopupDigits[1].gotoAndStop(Math.floor(score / 100));
        aScorePopupDigits[2].gotoAndStop(Math.floor((score % 100) / 10));
        aScorePopupDigits[3].gotoAndStop(score % 10);
    }
    aScorePopupDigits[0].x = aScorePopupDigits[1].x + Math.floor(plusOffset);
    for (var i = 0; i < aScorePopupDigits.length; i++) {
        //aScorePopupDigits[i].x += Math.floor(plusOffset*0.5);
    }

    scorePopupContainer.visible = true;
    scorePopupContainer.scaleX = scorePopupContainer.scaleY = 0;
    scorePopupContainer.x = nStageWidth * 0.5;
    scorePopupContainer.y = nStageHeight * 0.5;
    scorePopupContainer.alpha = 1;
    createjs.Tween.removeTweens(scorePopupContainer);
    createjs.Tween.get(scorePopupContainer).to({
        scaleX: 1,
        scaleY: 1
    }, 100, createjs.Ease.backOut);
    if (nScorePopupTimeoutID) {
        window.clearTimeout(nScorePopupTimeoutID);
    }
    nScorePopupTimeoutID = window.setTimeout(hideScorePopup, 500);


    handleInGameMainScore();
}

function doPartyAnimation() {
    nKeepCreating = 150;
}

function addPartyGuys() {
    var pp, w, h;
    pp = aPartyOptions[Math.floor(Math.random() * aPartyOptions.length)];
    w = preload.getResult(pp).width;
    h = preload.getResult(pp).height;
    var oddbod = new createjs.Bitmap(preload.getResult(pp)).set({
        regX: Math.ceil(w / 2),
        regY: Math.ceil(h / 2)
    });
    stage.addChild(oddbod);
    //
    oddbod.x = Math.random() * nStageWidth;
    oddbod.y = nStageHeight;
    oddbod.scaleX = oddbod.scaleY = 0;
    oddbod.dx = Math.random() * 5 * nGameScale;
    if (Math.random() > 0.5) {
        oddbod.dx *= -1;
    }
    oddbod.dy = ((Math.random() * -45) - 20) * nGameScale;
    var sc = (Math.random() * 0.5) + 0.3;
    sc *= nGameScale;
    createjs.Tween.get(oddbod).to({
        scaleX: sc,
        scaleY: sc
    }, 100, createjs.Ease.sineOut);
    aPartyAnimGuys.push(oddbod);
}

function finishLevel() {
    nKeepCreating = -1;

    for (var i = 0; i < aPartyAnimGuys.length; i++) {
        stage.removeChild(aPartyAnimGuys[i]);
    }
    aPartyAnimGuys = [];

    if (aLevelScores[nCurrentLevel] >= getCurrentTarget()) {
        nCurrentLevel++;
        if (nCurrentLevel == aGridWidths.length) {
            hideGameScreen();
            bHasWonGame = true;
            window.setTimeout(showEndScreen, 700);
        } else {
            window.setTimeout(makeGameGrid, 700);
        }
    } else {
        hideGameScreen();
        bHasWonGame = false;
        window.setTimeout(showEndScreen, 700);
    }
}

function clearLevel() {
    nCanMoveCounter = -10;
    nKeepCreating = -1;

    for (var i = 0; i < aPartyAnimGuys.length; i++) {
        stage.removeChild(aPartyAnimGuys[i]);
    }
    aPartyAnimGuys = [];

    for (var i = 0; i < aActiveGameOddbods.length; i++) {
        gameOddbodsContainer.removeChild(aActiveGameOddbods[i]);
    }
    aActiveGameOddbods = [];
}

function areThereAnyMovesLeft() {
    var anymovesLeft = false;

    for (var i = 0; i < aActiveGameOddbods.length; i++) {
        var checkThisOddBod = aActiveGameOddbods[i];

        for (var j = 0; j < aActiveGameOddbods.length; j++) {
            if (i != j) {
                if (checkThisOddBod.colourID == aActiveGameOddbods[j].colourID) {

                    var left = checkThisOddBod.gridPosX - 1;
                    if (left >= 0) {
                        if (left == aActiveGameOddbods[j].gridPosX && checkThisOddBod.gridPosY == aActiveGameOddbods[j].gridPosY) {
                            anymovesLeft = true;
                        }
                    }

                    var right = checkThisOddBod.gridPosX + 1;
                    if (right < aGridWidths[nCurrentLevel]) {
                        if (right == aActiveGameOddbods[j].gridPosX && checkThisOddBod.gridPosY == aActiveGameOddbods[j].gridPosY) {
                            anymovesLeft = true;
                        }
                    }

                    var top = checkThisOddBod.gridPosY - 1;
                    if (top >= 0) {
                        if (top == aActiveGameOddbods[j].gridPosY && checkThisOddBod.gridPosX == aActiveGameOddbods[j].gridPosX) {
                            anymovesLeft = true;
                        }
                    }

                    var bottom = checkThisOddBod.gridPosY + 1;
                    if (bottom < nGridHeight) {
                        if (bottom == aActiveGameOddbods[j].gridPosY && checkThisOddBod.gridPosX == aActiveGameOddbods[j].gridPosX) {
                            anymovesLeft = true;
                        }
                    }
                }
            }
        }
    }

    return anymovesLeft;
}

function onPlayAgainClicked() {
    hideEndScreen();
    playButtonClickSound();
    window.setTimeout(showGameScreen, 1000);
}

function playButtonClickSound() {
    createjs.Sound.play("OB_buttonClick");
}

function tick() {
    if (nKeepCreating > 0) {
        if (nKeepCreating == 1) {
            showExtraPartyScore();
        }
        nKeepCreating--;
        addPartyGuys();
    }
    var allBelowTheStage = true;
    for (var i = 0; i < aPartyAnimGuys.length; i++) {
        aPartyAnimGuys[i].x += aPartyAnimGuys[i].dx;
        aPartyAnimGuys[i].y += aPartyAnimGuys[i].dy;
        aPartyAnimGuys[i].dx *= 0.99;
        aPartyAnimGuys[i].dy += 2 * nGameScale;
        if (aPartyAnimGuys[i].y < nStageHeight) {
            allBelowTheStage = false;
        }
    }
    if (nKeepCreating == 0 && allBelowTheStage) {
        finishLevel();
    }

    if (nCanMoveCounter > 0) {
        nCanMoveCounter--;
        if (nCanMoveCounter == 0) {
            onGridMoveDone();
            bCanMove = true;
        }
    }
    stage.update();
}