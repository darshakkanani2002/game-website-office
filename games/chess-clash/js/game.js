////////////////////////////////////////////////////////////
// GAME v1.1
////////////////////////////////////////////////////////////

/*!
 * 
 * GAME SETTING CUSTOMIZATION START
 * 
 */

//icons array
var iconsArr = [
	{
		wp:'assets/themes/01/wP.png',
		wb:'assets/themes/01/wB.png',
		wk:'assets/themes/01/wK.png',
		wq:'assets/themes/01/wQ.png',
		wn:'assets/themes/01/wN.png',
		wr:'assets/themes/01/wR.png',
		bp:'assets/themes/01/bP.png',
		bb:'assets/themes/01/bB.png',
		bk:'assets/themes/01/bK.png',
		bq:'assets/themes/01/bQ.png',
		bn:'assets/themes/01/bN.png',
		br:'assets/themes/01/bR.png',
		shadow:'assets/themes/01/shadow.png',
		wH:'assets/icon_whiteh_1.png',
		bH:'assets/icon_blackh_1.png',
		highlight:'assets/themes/01/highlight.png',
		check:'assets/themes/01/check.png',
		iconY:20
	},
	{
		wp:'assets/themes/02/wP.png',
		wb:'assets/themes/02/wB.png',
		wk:'assets/themes/02/wK.png',
		wq:'assets/themes/02/wQ.png',
		wn:'assets/themes/02/wN.png',
		wr:'assets/themes/02/wR.png',
		bp:'assets/themes/02/bP.png',
		bb:'assets/themes/02/bB.png',
		bk:'assets/themes/02/bK.png',
		bq:'assets/themes/02/bQ.png',
		bn:'assets/themes/02/bN.png',
		br:'assets/themes/02/bR.png',
		shadow:'assets/themes/02/shadow.png',
		wH:'assets/icon_whiteh_1.png',
		bH:'assets/icon_blackh_1.png',
		highlight:'assets/themes/02/highlight.png',
		check:'assets/themes/02/check.png',
		iconY:20
	},
	{
		wp:'assets/themes/03/wP.png',
		wb:'assets/themes/03/wB.png',
		wk:'assets/themes/03/wK.png',
		wq:'assets/themes/03/wQ.png',
		wn:'assets/themes/03/wN.png',
		wr:'assets/themes/03/wR.png',
		bp:'assets/themes/03/bP.png',
		bb:'assets/themes/03/bB.png',
		bk:'assets/themes/03/bK.png',
		bq:'assets/themes/03/bQ.png',
		bn:'assets/themes/03/bN.png',
		br:'assets/themes/03/bR.png',
		shadow:'assets/themes/03/shadow.png',
		wH:'assets/icon_whiteh_1.png',
		bH:'assets/icon_blackh_1.png',
		highlight:'assets/themes/03/highlight.png',
		check:'assets/themes/03/check.png',
		iconY:20
	},
	{
		wp:'assets/themes/04/wP.png',
		wb:'assets/themes/04/wB.png',
		wk:'assets/themes/04/wK.png',
		wq:'assets/themes/04/wQ.png',
		wn:'assets/themes/04/wN.png',
		wr:'assets/themes/04/wR.png',
		bp:'assets/themes/04/bP.png',
		bb:'assets/themes/04/bB.png',
		bk:'assets/themes/04/bK.png',
		bq:'assets/themes/04/bQ.png',
		bn:'assets/themes/04/bN.png',
		br:'assets/themes/04/bR.png',
		shadow:'assets/themes/04/shadow.png',
		wH:'assets/icon_whiteh_1.png',
		bH:'assets/icon_blackh_1.png',
		highlight:'assets/themes/04/highlight.png',
		check:'assets/themes/04/check.png',
		iconY:20
	},
	{
		wp:'assets/themes/05/wP.png',
		wb:'assets/themes/05/wB.png',
		wk:'assets/themes/05/wK.png',
		wq:'assets/themes/05/wQ.png',
		wn:'assets/themes/05/wN.png',
		wr:'assets/themes/05/wR.png',
		bp:'assets/themes/05/bP.png',
		bb:'assets/themes/05/bB.png',
		bk:'assets/themes/05/bK.png',
		bq:'assets/themes/05/bQ.png',
		bn:'assets/themes/05/bN.png',
		br:'assets/themes/05/bR.png',
		shadow:'assets/themes/05/shadow.png',
		wH:'assets/icon_whiteh_1.png',
		bH:'assets/icon_blackh_1.png',
		highlight:'assets/themes/05/highlight.png',
		check:'assets/themes/05/check.png',
		iconY:20
	},
	{
		wp:'assets/themes/06/wP.png',
		wb:'assets/themes/06/wB.png',
		wk:'assets/themes/06/wK.png',
		wq:'assets/themes/06/wQ.png',
		wn:'assets/themes/06/wN.png',
		wr:'assets/themes/06/wR.png',
		bp:'assets/themes/06/bP.png',
		bb:'assets/themes/06/bB.png',
		bk:'assets/themes/06/bK.png',
		bq:'assets/themes/06/bQ.png',
		bn:'assets/themes/06/bN.png',
		br:'assets/themes/06/bR.png',
		shadow:'assets/themes/06/shadow.png',
		wH:'assets/icon_whiteh_1.png',
		bH:'assets/icon_blackh_1.png',
		highlight:'assets/themes/06/highlight.png',
		check:'assets/themes/06/check.png',
		iconY:0
	},
]

//classic settings
var defaultSettings = {
	twoPlayer:true
};

//board settings
var boardSettings = {
	width:60,
	border:0,
	radius:0,
	outerBorder:4,
	outerRadius:5,
	boardColor:['#AA7F5E','#E4CCAB'],
	borderColor:'#222',
	guideColor:'#666',
	pieceDrag:true, //drag and drop option, false for click to move
	pieceMoveAnimation:true, //true for jump animation, false for slide animation
	tweenSlideSpeed:.5,
	tweenJumpSpeed:.2,
	tweenJumpScale:1.3,
	tweenFallSpeed:.8,
	showPlayerHighlight:true,
	showPlayerMove:true,
	showInCheck:true,
	mouseOverPlayerMove:true, //auto set to false when pieceDrag set to true
	score:180000
};

//game text display
var textDisplay = {
					vs:'VS',
					player1:'PLAYER 1',
					player2:'PLAYER 2',
					computer:'COMPUTER',
					userTurn:'YOUR TURN',
					playerTurn:'[NAME] TURN',
					computerTurn:'THINKING...',
					playerTotal:'[NUMBER]',
					check:"CHECK!",
					checkmate:"CHECKMATE!",
					gameWin:'[PLAYER] WON!',
					draw:'GAME DRAW!',
					exitTitle:'EXIT GAME',
					exitMessage:'Are you sure you want\nto quit game?',
					share:'SHARE YOUR SCORE:',
					resultTitle:'GAME OVER',
					resultDesc:'SCORE : [NUMBER]PTS',
				}

//Social share, [SCORE] will replace with game score
var shareEnable = true; //toggle share
var shareTitle = 'Highscore on Chess is [SCORE]PTS';//social share score title
var shareMessage = '[SCORE]PTS is mine new highscore on Chess game! Try it now!'; //social share score message

/*!
 *
 * GAME SETTING CUSTOMIZATION END
 *
 */
$.editor = {enable:false};
var playerData = {score:0, opponentScore:0};
var gameData = {paused:true, moving:false, icon:0, iconSwitch:false, icons:['w','b'], square:["a","b","c","d","e","f","g","h"], type:["p","b","k","q","r","n"], typeIndex:0, drag:{status:false,x:0,y:0}, player:0, ai:false, aiMove:false, winner:-1, fall:{fromX:0, fromY:0, toX:0, toY:0}, inCheck:false, complete:false};
var timeData = {enable:false, startDate:null, nowDate:null, timer:0, oldTimer:0, playerTimer:0, opponentTimer:0, playerAccumulate:0, opponentAccumulate:0};
var tweenData = {score:0, tweenScore:0};

/*!
 * 
 * GAME BUTTONS - This is the function that runs to setup button event
 * 
 */
function buildGameButton(){
	buttonOnePlayer.cursor = "pointer";
	buttonOnePlayer.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkGameType(true);
	});

	buttonTwoPlayer.cursor = "pointer";
	buttonTwoPlayer.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkGameType(false);
	});

	buttonLocal.cursor = "pointer";
	buttonLocal.addEventListener("click", function(evt) {
		playSound('soundButton');
		socketData.online = false;
		toggleMainButton('players');
	});

	buttonOnline.cursor = "pointer";
	buttonOnline.addEventListener("click", function(evt) {
		playSound('soundButton');
		checkQuickGameMode();
	});

	buttonStart.cursor = "pointer";
	buttonStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		if ( typeof initSocket == 'function' && multiplayerSettings.enable) {
			if(multiplayerSettings.localPlay){
				toggleMainButton('local');
			}else{
				checkQuickGameMode();
			}
		}else{
			toggleMainButton('players');
		}
	});

	buttonPlayersIcon.cursor = "pointer";
	buttonPlayersIcon.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleGameIcon();
	});

	buttonPlayersSwitch.cursor = "pointer";
	buttonPlayersSwitch.addEventListener("click", function(evt) {
		playSound('soundButton2');
		toggleGameIconSide();
	});

	buttonPlayersStart.cursor = "pointer";
	buttonPlayersStart.addEventListener("click", function(evt) {
		playSound('soundButton');
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			postSocketUpdate('start');
		}else{
			goPage('game');
		}
	});
	
	itemExit.addEventListener("click", function(evt) {
	});
	
	buttonContinue.cursor = "pointer";
	buttonContinue.addEventListener("click", function(evt) {
		playSound('soundButton');
		goPage('main');
	});
	
	buttonFacebook.cursor = "pointer";
	buttonFacebook.addEventListener("click", function(evt) {
		share('facebook');
	});
	
	buttonTwitter.cursor = "pointer";
	buttonTwitter.addEventListener("click", function(evt) {
		share('twitter');
	});
	buttonWhatsapp.cursor = "pointer";
	buttonWhatsapp.addEventListener("click", function(evt) {
		share('whatsapp');
	});
	
	buttonSoundOff.cursor = "pointer";
	buttonSoundOff.addEventListener("click", function(evt) {
		toggleGameMute(true);
	});
	
	buttonSoundOn.cursor = "pointer";
	buttonSoundOn.addEventListener("click", function(evt) {
		toggleGameMute(false);
	});
	
	buttonFullscreen.cursor = "pointer";
	buttonFullscreen.addEventListener("click", function(evt) {
		toggleFullScreen();
	});
	
	buttonExit.cursor = "pointer";
	buttonExit.addEventListener("click", function(evt) {
		togglePop(true);
		toggleOption();
	});
	
	buttonSettings.cursor = "pointer";
	buttonSettings.addEventListener("click", function(evt) {
		toggleOption();
	});
	
	buttonConfirm.cursor = "pointer";
	buttonConfirm.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
		
		stopAudio();
		stopGame();
		goPage('main');

		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			exitSocketRoom();
		}
	});
	
	buttonCancel.cursor = "pointer";
	buttonCancel.addEventListener("click", function(evt) {
		playSound('soundButton');
		togglePop(false);
	});

	gameData.typeIndex = Math.floor(Math.random()*gameData.type.length);
	displayPlayerIcon();
}

/*!
 * 
 * TOGGLE GAME TYPE - This is the function that runs to toggle game type
 * 
 */
function toggleMainButton(con){
	if ( typeof initSocket == 'function' && multiplayerSettings.enable) {
		gameLogsTxt.visible = true;
		gameLogsTxt.text = '';
	}

	buttonStart.visible = false;
	buttonPlayerContainer.visible = false;
	buttonLocalContainer.visible = false;

	if(con == 'start'){
		buttonStart.visible = true;
	}else if(con == 'local'){
		buttonLocalContainer.visible = true;
	}else if(con == 'players'){
		if(!defaultSettings.twoPlayer){
			goPage('category');
			return;
		}

		buttonPlayerContainer.visible = true;
	}
}

function checkGameType(con){
	gameData.ai = con;
	goPage('players');
}

function checkQuickGameMode(){
	socketData.online = true;
	if(!multiplayerSettings.enterName){
		buttonStart.visible = false;
		buttonPlayerContainer.visible = false;
		buttonLocalContainer.visible = false;

		addSocketRandomUser();
	}else{
		goPage('name');
	}
}

function toggleGameIcon(){
	gameData.icon++;
	gameData.icon = gameData.icon > iconsArr.length-1 ? 0 : gameData.icon;
	gameData.typeIndex = Math.floor(Math.random()*gameData.type.length);

	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		postSocketUpdate('updateplayers', {icon:gameData.icon, iconSwitch:gameData.iconSwitch, icons:gameData.icons});
	}else{
		displayPlayerIcon();
	}
}

function toggleGameIconSide(){
	gameData.iconSwitch = gameData.iconSwitch == true ? false : true;
	if(gameData.iconSwitch){
		gameData.icons = ['b','w'];
	}else{
		gameData.icons = ['w','b'];
	}

	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		postSocketUpdate('updateplayers', {icon:gameData.icon, iconSwitch:gameData.iconSwitch, icons:gameData.icons});
	}else{
		displayPlayerIcon();
	}
}

function displayPlayerIcon(){
	for(var n=0; n<2; n++){
		$.players['playerIconContainer'+ n].removeAllChildren();

		var iconID = 'icon'+gameData.icon+gameData.icons[n]+gameData.type[gameData.typeIndex];
		var iconShadowID = 'icon'+gameData.icon+"shadow";
		$.players['playerIcon'+ n] = new createjs.Bitmap(loader.getResult(iconID));
		centerReg($.players['playerIcon'+ n]);
		$.players['playerIcon'+ n].regY = $.players['playerIcon'+ n].image.naturalHeight - (boardSettings.width/2);
		$.players['playerIcon'+ n].y = -20 + iconsArr[gameData.icon].iconY;

		$.players['playerIconShadow'+ n] = new createjs.Bitmap(loader.getResult(iconShadowID));
		centerReg($.players['playerIconShadow'+ n]);
		$.players['playerIconShadow'+ n].x = $.players['playerIcon'+ n].x;
		$.players['playerIconShadow'+ n].y = $.players['playerIcon'+ n].y;

		$.players['playerIconContainer'+ n].addChild($.players['playerIconShadow'+ n], $.players['playerIcon'+ n]);
	}
}

function resizeSocketLog(){
	gameLogsTxt.font = "30px bpreplaybold";
	gameLogsTxt.textAlign = "center";
	gameLogsTxt.color = "#ccc";

	if(curPage == 'main'){
		if(viewport.isLandscape){
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 75;
		}else{
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 75;
		}
	}else if(curPage == 'custom'){
		if(viewport.isLandscape){
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 67;
		}else{
			gameLogsTxt.x = canvasW/2;
			gameLogsTxt.y = canvasH/100 * 65;
		}
	}
}

/*!
 * 
 * TOGGLE POP - This is the function that runs to toggle popup overlay
 * 
 */
function togglePop(con){
	confirmContainer.visible = con;
}


/*!
 * 
 * DISPLAY PAGES - This is the function that runs to display pages
 * 
 */
var curPage=''
function goPage(page){
	curPage=page;
	
	$('#roomWrapper').hide();
	$('#roomWrapper .innerContent').hide();
	gameLogsTxt.visible = false;

	mainContainer.visible = false;
	nameContainer.visible = false;
	roomContainer.visible = false;
	playersContainer.visible = false;
	gameContainer.visible = false;
	resultContainer.visible = false;
	
	var targetContainer = null;
	switch(page){
		case 'main':
			targetContainer = mainContainer;
			toggleMainButton('start');
		break;

		case 'name':
			targetContainer = nameContainer;
			$('#roomWrapper').show();
			$('#roomWrapper .nameContent').show();
			$('#roomWrapper .fontNameError').html('');
			$('#enterName').show();
		break;
			
		case 'room':
			targetContainer = roomContainer;
			$('#roomWrapper').show();
			$('#roomWrapper .roomContent').show();
			switchSocketRoomContent('lists');
		break;

		case 'players':
			targetContainer = playersContainer;
			if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
				buttonPlayersStart.visible = false;
				buttonPlayersIcon.visible = false;
				buttonPlayersSwitch.visible = false;

				if(socketData.host){
					buttonPlayersStart.visible = true;
					buttonPlayersIcon.visible = true;
					buttonPlayersSwitch.visible = true;
				}
			}else{
				if(gameData.ai){
					$.players['player'+ 1].text = textDisplay.computer;
				}else{
					$.players['player'+ 1].text = textDisplay.player2;
				}
			}
		break;
		
		case 'game':
			targetContainer = gameContainer;
			startGame();
		break;
		
		case 'result':
			targetContainer = resultContainer;
			stopGame();
			togglePop(false);
			
			playSound('soundResult');

			tweenData.tweenScore = 0;
			if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
				var playerScore = playerData.score;
				if(!socketData.host){
					playerScore = playerData.opponentScore;
				}
				TweenMax.to(tweenData, .5, {tweenScore:playerScore, overwrite:true, onUpdate:function(){
					resultDescTxt.text = textDisplay.resultDesc.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
				}});
				
				if(socketData.host){
					postSocketCloseRoom();
				}

				saveGame(playerScore);
			}else{
				TweenMax.to(tweenData, .5, {tweenScore:playerData.score, overwrite:true, onUpdate:function(){
					resultDescTxt.text = textDisplay.resultDesc.replace('[NUMBER]', addCommas(Math.floor(tweenData.tweenScore)));
				}});

				saveGame(playerData.score);
			}
		break;
	}
	
	if(targetContainer != null){
		targetContainer.visible = true;
		targetContainer.alpha = 0;
		TweenMax.to(targetContainer, .5, {alpha:1, overwrite:true});
	}
	
	resizeCanvas();
}

/*!
 * 
 * START GAME - This is the function that runs to start game
 * 
 */
function startGame(){
	gameData.paused = false;
	gameData.complete = false;
	gameData.player = 0;
	gameData.moving = false;
	gameData.winner = -1;
	gameData.inCheck = -1;

	timeData.playerAccumulate = 0;
	timeData.opponentAccumulate = 0;

	boardSettings.mouseOverPlayerMove = boardSettings.pieceDrag == false ? false : boardSettings.pieceDrag;

	buildPlayers();
	gameData.settings = {
		size:8
	};
	gameData.depth = 2;
	//gameData.ai = true;
	
	statusContainer.alpha = 0;

	buildBoard();
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		if(socketData.host){
			toggleGameTimer(true);
		}
	}else{
		toggleGameTimer(true);
	}
}

/*!
 * 
 * STOP GAME - This is the function that runs to stop play game
 * 
 */
function stopGame(){
	boardDesignContainer.removeAllChildren();
	boardIconContainer.removeAllChildren();

	gameData.paused = true;
	TweenMax.killAll(false, true, false);
}

function saveGame(score){
	if ( typeof toggleScoreboardSave == 'function' ) { 
		$.scoreData.score = score;
		if(typeof type != 'undefined'){
			$.scoreData.type = type;	
		}
		toggleScoreboardSave(true);
	}

	/*$.ajax({
      type: "POST",
      url: 'saveResults.php',
      data: {score:score},
      success: function (result) {
          console.log(result);
      }
    });*/
}

/*!
 * 
 * BUILD PLAYERS - This is the function that runs to build players
 * 
 */
function buildPlayers(){
	for(var n=0; n<2; n++){
		$.players['gameIconContainer'+ n].removeAllChildren();

		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {

		}else{
			if(n == 1){
				if(gameData.ai){
					$.players['gamePlayer'+ 1].text = textDisplay.computer;
				}else{
					$.players['gamePlayer'+ 1].text = textDisplay.player2;
				}
			}
		}

		addUserIcon(n, "p");
		$.players['gameTurn'+ n].text = '';
		$.players['gameTimer'+ n].text = millisecondsToTimeGame(0);
		$.players['gamePlayerHistory'+ n].text = "";
	}

	playerData.score = boardSettings.score;
	playerData.opponentScore = boardSettings.score;
}

function addUserIcon(n, type){
	$.players['gameIconContainer'+ n].removeAllChildren();
	
	var iconID = 'icon'+gameData.icon+gameData.icons[n]+type;
	var iconShadowID = 'icon'+gameData.icon+"shadow";
	$.players['gameIcon'+ n] = new createjs.Bitmap(loader.getResult(iconID));
	centerReg($.players['gameIcon'+ n]);
	$.players['gameIcon'+ n].regY = $.players['gameIcon'+ n].image.naturalHeight - (boardSettings.width/2);
	$.players['gameIcon'+ n].y = -45 + iconsArr[gameData.icon].iconY;;

	$.players['gameIconShadow'+ n] = new createjs.Bitmap(loader.getResult(iconShadowID));
	centerReg($.players['gameIconShadow'+ n]);
	$.players['gameIconShadow'+ n].x = $.players['gameIcon'+ n].x;
	$.players['gameIconShadow'+ n].y = $.players['gameIcon'+ n].y;

	$.players['gameIconContainer'+ n].addChild($.players['gameIconShadow'+ n], $.players['gameIcon'+ n]);
}

/*!
 * 
 * BUILD BOARD - This is the function that runs to build board
 * 
 */
function buildBoard(){
	gameData.chess = new Chess();

	var config = {
		pieceTheme: 'assets/themes/01/{piece}.png',
		position: 'start'
	};
	gameData.chessboard = ChessBoard('board', config);

	//gameData.chess.load('5k1r/P6p/1Np5/3n3P/4p3/5ppP/3K1P2/2B2B2 w - - 1 26');
	//gameData.chess.load('rnb1kbnr/pppp1ppp/8/4p3/5PPq/8/PPPPP2P/RNBQKBNR w KQkq - 1 3');
	//gameData.chess.load('Q6r/4k2p/1Np5/3n3P/8/4pp1P/2K1BPp1/2B5 w - - 0 29');
	//gameData.chess.load('3k4/7Q/2p5/3n3P/N4P2/4p2P/2K5/2B1q1q1 w - - 0 33');
	//gameData.chess.load('3k4/7Q/n3qP2/2p3BP/7P/8/3K4/q7 w - - 1 41');
	
	gameData.chessboard.position(gameData.chess.fen());
	gameData.player = gameData.chess.turn() == "w" ? 0 : 1;
	
	playSound('soundStart');
	statusContainer.alpha = 0;

	boardDesignContainer.removeAllChildren();
	boardIconContainer.removeAllChildren();

	gameData.complete = false;
	gameData.aiMove = false;
	gameData.board = [];
	gameData.moves = [];
	gameData.piece = [];
	gameData.pieceIndex = -1;
	gameData.removePiece = null;
	gameData.mustJump = false;

	var bgWidth = (boardSettings.width + (boardSettings.outerBorder/2)) * gameData.settings.size;
	var bgHeight = (boardSettings.width + (boardSettings.outerBorder/2)) * gameData.settings.size;
	bgWidth += boardSettings.outerBorder/2;
	bgHeight += boardSettings.outerBorder/2;
	var bgBoard = new createjs.Shape();
	bgBoard.graphics.beginFill(boardSettings.borderColor).drawRoundRectComplex(-(bgWidth/2), -(bgHeight/2), bgWidth, bgHeight, boardSettings.outerRadius, boardSettings.outerRadius, boardSettings.outerRadius, boardSettings.outerRadius);
	boardDesignContainer.addChild(bgBoard);

	var positionData = {x:0, y:0, sX:0, sY:0};
	positionData.sX = -((boardSettings.width * (gameData.settings.size-1))/2);
	positionData.sY = -((boardSettings.width * (gameData.settings.size-1))/2);
	positionData.x = positionData.sX;
	positionData.y = positionData.sY;

	var totalCount = 0;
	for(var r=0; r<gameData.settings.size; r++){
		gameData.board.push([]);
		gameData.moves.push([]);
		for(var c=0; c<gameData.settings.size; c++){
			var bgMoveA = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+gameData.icons[0]+'h'));
			centerReg(bgMoveA);
			var bgMoveB = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+gameData.icons[1]+'h'));
			centerReg(bgMoveB);
			bgMoveA.visible = bgMoveB.visible = false;
			
			gameData.moves[r][c] = new createjs.Shape();
			gameData.board[r][c] = new createjs.Shape();
			gameData.board[r][c].x = gameData.moves[r][c].x = bgMoveA.x = bgMoveB.x = positionData.x;
			gameData.board[r][c].y = gameData.moves[r][c].y = bgMoveA.y = bgMoveB.y = positionData.y;
			positionData.x += boardSettings.width;

			var bgColor = 0;
			if ((r + c) % 2 == 0) {
				bgColor = 1;
			}

			if(boardSettings.border > 0){
				gameData.board[r][c].graphics.setStrokeStyle(boardSettings.border).beginStroke(boardSettings.borderColor).beginFill(boardSettings.boardColor[bgColor]).drawRoundRectComplex(-(boardSettings.width/2), -(boardSettings.width/2), boardSettings.width, boardSettings.width, boardSettings.radius, boardSettings.radius, boardSettings.radius, boardSettings.radius);
			}else{
				gameData.board[r][c].graphics.beginFill(boardSettings.boardColor[bgColor]).drawRoundRectComplex(-(boardSettings.width/2), -(boardSettings.width/2), boardSettings.width, boardSettings.width, boardSettings.radius, boardSettings.radius, boardSettings.radius, boardSettings.radius);
			}
			gameData.board[r][c].bgMoveA = bgMoveA;
			gameData.board[r][c].bgMoveB = bgMoveB;
			boardDesignContainer.addChild(gameData.board[r][c], bgMoveA, bgMoveB);

			gameData.moves[r][c].visible = false;
			gameData.moves[r][c].hitArea = new createjs.Shape(new createjs.Graphics().beginFill("#000").beginFill(boardSettings.boardColor[bgColor]).drawRect(-(boardSettings.width/2), -(boardSettings.width/2), boardSettings.width, boardSettings.width));
			boardMovesContainer.addChild(gameData.moves[r][c]);

			gameData.moves[r][c].row = r;
			gameData.moves[r][c].column = c;
			gameData.moves[r][c].id = totalCount;
			gameData.moves[r][c].icon = null;

			gameData.moves[r][c].cursor = "pointer";
			gameData.moves[r][c].addEventListener("click", function(evt) {
				if(gameData.paused || gameData.complete || gameData.moving){
					return;
				}

				if(gameData.ai){
					if(gameData.player == 1){
						return;
					}
					gameData.aiMove = true;
				}

				if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
					if(!socketData.turn){
						return;
					}
				}

				if(gameData.moves[evt.target.row][evt.target.column].visible){
					if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
						postSocketUpdate('moveplayer', {row:evt.target.row, column:evt.target.column, pieceIndex:gameData.pieceIndex, darg:gameData.drag});
					}else{
						movePlayer(evt.target.row, evt.target.column);
					}
				}
			});

			totalCount++;
		}

		positionData.x = positionData.sX;
		positionData.y += boardSettings.width;
	}

	//guide
	var numberCount = gameData.settings.size;
	var alphaCount = 0;
	if(gameData.iconSwitch){
		numberCount = 1;
		alphaCount = gameData.settings.size-1;
	}
	for(var r=0; r<gameData.settings.size; r++){
		for(var c=0; c<gameData.settings.size; c++){
			if(c == 0){
				var numberTxt = new createjs.Text();
				numberTxt.font = "20px bpreplaybold";
				numberTxt.color = boardSettings.guideColor;
				numberTxt.textAlign = "center";
				numberTxt.textBaseline='middle';
				numberTxt.text = numberCount;
				numberTxt.x = gameData.moves[r][c].x - (boardSettings.width / 1.1);
				numberTxt.y = gameData.moves[r][c].y;
				
				boardGuideContainer.addChild(numberTxt);
				if(gameData.iconSwitch){
					numberCount++;
				}else{
					numberCount--;
				}
			}

			if(r == gameData.settings.size-1){
				var alphaTxt = new createjs.Text();
				alphaTxt.font = "20px bpreplaybold";
				alphaTxt.color = boardSettings.guideColor;
				alphaTxt.textAlign = "center";
				alphaTxt.textBaseline='middle';
				alphaTxt.text = gameData.square[alphaCount];
				alphaTxt.x = gameData.moves[r][c].x;
				alphaTxt.y = gameData.moves[r][c].y + (boardSettings.width / 1.1);
				
				boardGuideContainer.addChild(alphaTxt);
				if(gameData.iconSwitch){
					alphaCount--;
				}else{
					alphaCount++;
				}
			}
		}
	}
	
	if(gameData.iconSwitch){
		gameData.chessboard.orientation("flip");
		gameData.player = gameData.player == 1 ? 0 : 1;
	}
	placePieces();
	
	statusContainer.y = (bgHeight/2) + 10;
	boardContainer.scaleX = boardContainer.scaleY = 1;
	var minBoardHeight = 520;
	if(bgHeight > minBoardHeight){
		var boardScale = minBoardHeight/bgHeight;
		boardContainer.scaleX = boardContainer.scaleY = boardScale;
	}

	if(gameData.iconSwitch){
		boardFlipContainer.rotation = 180;
	}

	if(gameData.player == 1 && gameData.ai){
		TweenMax.to(boardContainer, 1, {overwrite:true, onComplete:function(){
			moveAI();
		}});
	}
	displayPlayerTurn();
	//nextPlayerTurn();
}

/*!
 * 
 * RESET PIECE - This is the function that runs to highlight reset piece
 * 
 */
function resetPieces(){
	for(var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		thisPiece.highlight.alpha = 0;
		TweenMax.killTweensOf(thisPiece.highlight);

		if(!gameData.inCheck){
			thisPiece.check.alpha = 0;
			TweenMax.killTweensOf(thisPiece.check);
		}
	}
}

/*!
 * 
 * HIGHLIGHT CHECK PIECE - This is the function that runs to highlight check piece
 * 
 */
function highlightInCheck(){
	if(!boardSettings.showInCheck){
		return;
	}

	var oppColor = gameData.player == 0 ? 1 : 0;
	var kingR = 0;
	var kingC = 0;
	for (var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		if(thisPiece.type == "k" && thisPiece.color == gameData.icons[oppColor]){
			thisPiece.check.alpha = 1;
			kingR = thisPiece.r;
			kingC = thisPiece.c;
		}
	}

	swapChessTurn();
	for (var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		if(thisPiece.color == gameData.icons[gameData.player]){
			var square = convertSquare(thisPiece.r, thisPiece.c);
			var moves = gameData.chess.moves({
				legal: false,
				square: square,
				verbose: true
			});

			for(var m=0; m<moves.length; m++){
				var c = gameData.square.indexOf(moves[m].to.substring(0,1));
				var r = 8 - Number(moves[m].to.substring(1,2));
				if(kingR == r && kingC == c){
					thisPiece.check.alpha = 1;
				}
			}
		}
	}
	swapChessTurn();
	sortIconDepth();
}

function swapChessTurn() {
	var tokens = gameData.chess.fen().split(" ");
	tokens[1] = gameData.chess.turn() === "b" ? "w" : "b";
	tokens[3] = "-";
	gameData.chess.load(tokens.join(" "));
}

/*!
 * 
 * FIND VALID MOVE - This is the function that runs to find valid move
 * 
 */
function findValidMove(piece){
	resetValidMove();

	var square = convertSquare(piece.r, piece.c);
	var moves = gameData.chess.moves({
        square: square,
        verbose: true
    });

	for(var n=0; n<moves.length; n++){
		var c = gameData.square.indexOf(moves[n].to.substring(0,1));
		var r = 8 - Number(moves[n].to.substring(1,2));
		gameData.moves[r][c].visible = true;

		if(boardSettings.showPlayerMove){
			var targetMove = gameData.player == 0 ? gameData.board[r][c].bgMoveA : gameData.board[r][c].bgMoveB;
			targetMove.visible = true;
			animatePlayerMove(targetMove);
		}
	}
}

function resetValidMove(){
	for(var r=0; r<gameData.settings.size; r++){
		for(var c=0; c<gameData.settings.size; c++){
			gameData.moves[r][c].visible = false;

			gameData.board[r][c].bgMoveA.visible = false;
			gameData.board[r][c].bgMoveB.visible = false;
			TweenMax.killTweensOf(gameData.board[r][c].bgMoveA);
			TweenMax.killTweensOf(gameData.board[r][c].bgMoveB);
		}
	}
}

function animatePlayerMove(obj){
	obj.alpha = 0;
	var tweenSpeed = .5;
	TweenMax.to(obj, tweenSpeed, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {alpha:0, overwrite:true, onComplete:animatePlayerMove, onCompleteParams:[obj]});
	}});
}

function convertSquare(r,c){
	return gameData.square[c] + (8 - r);
}

/*!
 * 
 * MOVE PIECE - This is the function that runs to move piece
 * 
 */
function movePlayer(r,c){
	gameData.moving = true;
	gameData.oldBoard = gameData.chess.board();

	resetValidMove();
	hidePlayerTurn();
	
	var thisPiece = gameData.piece[gameData.pieceIndex];
	var move = gameData.chess.move({
        from: convertSquare(thisPiece.r,thisPiece.c),
        to: convertSquare(r,c),
		promotion: "q"
    });

	if(move != null){
		var animate = boardSettings.pieceDrag == true ? false : true;
		checkBoardDiff(animate, 0);
	}
}

/*!
 * 
 * NEXT PLAYER TURN - This is the function that runs to check result and next player
 * 
 */
function nextPlayerTurn() {
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		postSocketUpdate('checkboardresult', socketData.gameIndex);
	}

	displayPlayerHistory();
	gameData.chessboard.position(gameData.chess.fen());

	var gameComplete = false;
	showGameStatus("");
	hidePlayerTurn();

	if(gameData.chess.in_check()){
		gameData.inCheck = true;
		highlightInCheck();
		showGameStatus("check");
		playSound("soundInCheck");
	}
	
	var resultDelay = 0;
    if(gameData.chess.in_draw()){
		gameComplete = true;
		showGameStatus('draw');
		playSound("soundDraw");
	}else if(gameData.chess.game_over()){
		gameComplete = true;
		if(gameData.chess.in_checkmate()){
			resultDelay = 3;
			gameData.winner = gameData.player;
			showGameStatus("checkmate");
		}
	}

	if(gameComplete){
		toggleGameTimer(false);
		gameData.complete = true;
		TweenMax.to(boardContainer, resultDelay, {overwrite:true, onComplete:function(){
			if(gameData.winner != -1){
				playSound("soundComplete");
				if(gameData.player == 0){
					playerData.opponentScore = 0;
				}else{
					playerData.score = 0;
				}
				showGameStatus('win', $.players['gamePlayer'+ gameData.player].text);
			}
			endGame();
		}});
	}else{
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			
		}else{
			togglePlayer();
			displayPlayerTurn();
			gameData.moving = false;

			if(gameData.player == 1 && gameData.ai){
				TweenMax.to(boardContainer, 1, {overwrite:true, onComplete:function(){
					moveAI();
				}});
			}
		}
	}
}

/*!
 * 
 * ANIMATE PIECE - This is the function that runs to animate piece
 * 
 */
function animatePiece(delay,r,c,captured,promotion,next,animate){
	gameData.inCheck = false;
	
	var thisPiece = gameData.piece[gameData.pieceIndex];
	gameData.pieceIndex = -1;
	resetPieces();

	var iconX = gameData.board[r][c].x;
	var iconY = gameData.board[r][c].y;

	gameData.fall.toX = iconX;
	gameData.fall.toY = iconY;

	thisPiece.highlight.x = thisPiece.check.x = iconX;
	if(gameData.iconSwitch){
		thisPiece.highlight.y = thisPiece.check.y = iconY + .1;
	}else{
		thisPiece.highlight.y = thisPiece.check.y = iconY - .1;
	}
	thisPiece.r = r;
	thisPiece.c = c;
	
	if(!animate){
		playSound('soundDrop');
		thisPiece.shadow.x = iconX;
		thisPiece.shadow.y = iconY;
		thisPiece.x = iconX;
		thisPiece.y = iconY;

		changePieceIcon(promotion);
		sortIconDepth();
		hidePlayerTurn();
		if(captured != null || captured != undefined){
			removePiece(thisPiece);
		}
		if(next)
			nextPlayerTurn();
	}else{
		var removed = false;
		if(boardSettings.pieceMoveAnimation){
			var centerPos = getCenterPosition(thisPiece.x, thisPiece.y, iconX, iconY);
			var distance = getDistance(thisPiece.x, thisPiece.y, iconX, iconY);
			var jumpTweenSpeed = (distance * 0.008) * boardSettings.tweenJumpSpeed;
			var oriScaleX = thisPiece.scaleX;
			var oriScaleY = thisPiece.scaleY;
			var jumpScaleX = thisPiece.scaleX < 0 ? -boardSettings.tweenJumpScale : boardSettings.tweenJumpScale;
			var jumpScaleY = thisPiece.scaleY < 0 ? -boardSettings.tweenJumpScale : boardSettings.tweenJumpScale;
			console.log(oriScaleX, oriScaleY);
			TweenMax.to(thisPiece.shadow, jumpTweenSpeed, {delay:delay, x:centerPos.x, y:centerPos.y, ease:Sine.easeIn, overwrite:true});
			TweenMax.to(thisPiece, jumpTweenSpeed, {delay:delay, x:centerPos.x, y:centerPos.y, scaleX:jumpScaleX, scaleY:jumpScaleY, ease:Sine.easeIn, overwrite:true, onComplete:function(){
				TweenMax.to(thisPiece.shadow, jumpTweenSpeed, {x:iconX, y:iconY, ease:Sine.easeOut, overwrite:true});
				TweenMax.to(thisPiece, jumpTweenSpeed, {x:iconX, y:iconY, scaleX:oriScaleX, scaleY:oriScaleY, overwrite:true, ease:Sine.easeOut, onStart:function(){
					boardIconContainer.setChildIndex(thisPiece, boardIconContainer.numChildren-1);
				}, onUpdate:function(){
					if(captured != null || captured != undefined){
						if(!removed){
							var distance = getDistance(thisPiece.x, thisPiece.y, iconX, iconY);
							if(distance < boardSettings.width/2){
								removed = true;
								removePiece(thisPiece);
							}
						}
					}
				}, onComplete:function(){
					playSound("soundDrop");
					changePieceIcon(promotion);
					sortIconDepth();
					hidePlayerTurn();
					if(next)
						nextPlayerTurn();
				}});
			}});
		}else{
			TweenMax.to(thisPiece.shadow, boardSettings.tweenSlideSpeed, {delay:delay, x:iconX, y:iconY, overwrite:true});
			TweenMax.to(thisPiece, boardSettings.tweenSlideSpeed, {delay:delay, x:iconX, y:iconY, overwrite:true, onStart:function(){
				boardIconContainer.setChildIndex(thisPiece, boardIconContainer.numChildren-1);
				playSound('soundSlide');
			}, onUpdate:function(){
				sortIconDepth();
				if(captured != null || captured != undefined){
					if(!removed){
						var distance = getDistance(thisPiece.x, thisPiece.y, iconX, iconY);
						if(distance < boardSettings.width/2){
							removed = true;
							removePiece(thisPiece);
						}
					}
				}
			}, onComplete:function(){
				changePieceIcon(promotion);
				sortIconDepth();
				hidePlayerTurn();
				if(next)
					nextPlayerTurn();
			}});
		}
	}
}

function changePieceIcon(promotion){
	if(promotion == -1){
		return;
	}

	playSound("soundFall");
	var thisPiece = gameData.piece[promotion]
	placePiece(thisPiece.r, thisPiece.c, thisPiece.type, thisPiece.color);
	boardIconContainer.removeChild(thisPiece, thisPiece.shadow, thisPiece.highlight, thisPiece.check);
	gameData.piece.splice(promotion, 1);
}

function removePiece(piece) {
    for (var i = 0; i < gameData.piece.length; i++){
		var getRemovePiece = gameData.piece[i];
        if (piece != getRemovePiece && piece.r == getRemovePiece.r && piece.c == getRemovePiece.c) {
			playSound("soundFall");

			var wideRangeX = boardSettings.width * 1.5;
			var wideRangeY = boardSettings.width;
			var distanceX = randomIntFromInterval(wideRangeX/2.5,wideRangeX);
			var distanceY = randomIntFromInterval(wideRangeY/2.5,wideRangeY);
			var rotate = randomIntFromInterval(80,100);
			if(gameData.fall.fromX > gameData.fall.toX){
				rotate = -(rotate);
				distanceX = -(distanceX);
			}

			if(gameData.fall.fromY > gameData.fall.toY){
				distanceY = -(distanceY);
			}

			distanceX = getRemovePiece.x + distanceX;
			distanceY = getRemovePiece.y + distanceY;

			getRemovePiece.shadow.visible = false;
			TweenMax.to(getRemovePiece, boardSettings.tweenFallSpeed, {x:distanceX, y:distanceY});
			TweenMax.to(getRemovePiece, boardSettings.tweenFallSpeed, {rotation:rotate, ease:Bounce.easeOut, onUpdate:function(){
				sortIconDepth();
			},onComplete:function(){
				boardIconContainer.removeChild(getRemovePiece, getRemovePiece.shadow, getRemovePiece.highlight, getRemovePiece.check);
            	gameData.piece.splice(i, 1);
			}});
            return;
        }
    }
}

/*!
 * 
 * DISPLAY PLAYER TURN - This is the function that runs to display playter turn
 * 
 */
function displayPlayerTurn(){
	for(var n=0; n<2; n++){
		var userTurn = '';
		if(n == gameData.player && !gameData.complete){
			userTurn = textDisplay.userTurn;

			if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
				if(socketData.host){
					userTurn = n == 1 ? textDisplay.playerTurn.replace('[NAME]', $.players['gamePlayer'+ n].text) : userTurn;
				}else{
					userTurn = n == 0 ? textDisplay.playerTurn.replace('[NAME]', $.players['gamePlayer'+ n].text) : userTurn;
				}
			}else{
				if(n == 1 && gameData.ai){
					userTurn = textDisplay.computerTurn;
				}
			}
		}

		$.players['gameTurn'+ n].text = userTurn;

		TweenMax.killTweensOf($.players['gameTurn'+ n]);
		if(userTurn != ''){
			animatePlayerTurn($.players['gameTurn'+ n]);
		}
	}

	togglePlayerTimer();
}

function displayPlayerStatus(index){
	var statusText;
	statusText = textDisplay.gameWin.replace('[PLAYER]', $.players['gamePlayer'+ index].text);
	
	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		if(socketData.host){
			statusText = index == 1 ? textDisplay.gameWin.replace('[PLAYER]', $.players['gamePlayer'+ index].text) : statusText;
		}else{
			statusText = index == 0 ? textDisplay.gameWin.replace('[PLAYER]', $.players['gamePlayer'+ index].text) : statusText;
		}
	}
	$.players['gameTurn'+ index].text = statusText;

	TweenMax.killTweensOf($.players['gameTurn'+ index]);
	animatePlayerTurn($.players['gameTurn'+ index]);
}

function hidePlayerTurn(){
	for(var n=0; n<2; n++){
		$.players['gameTurn'+ n].text = "";
		TweenMax.killTweensOf($.players['gameTurn'+ n]);
	}
}

function animatePlayerTurn(obj){
	obj.alpha = .3;
	var tweenSpeed = .2;
	TweenMax.to(obj, tweenSpeed, {alpha:1, overwrite:true, onComplete:function(){
		TweenMax.to(obj, tweenSpeed, {alpha:.3, overwrite:true, onComplete:animatePlayerTurn, onCompleteParams:[obj]});
	}});
}

/*!
 * 
 * GAME STATUS - This is the function that runs to show game status
 * 
 */
function showGameStatus(con, player){
	if(con == 'win'){
		statusTxt.text = textDisplay.gameWin.replace("[PLAYER]", player);
	}else if(con == 'check'){
		statusTxt.text = textDisplay.check;
	}else if(con == 'checkmate'){
		statusTxt.text = textDisplay.checkmate;
	}else if(con == 'draw'){
		statusTxt.text = textDisplay.draw;
	}else{
		statusTxt.text = "";
	}

	var statusShape = {color:"#fff", stroke:"#000", space:80, strokeNum:7, radius:25, w:0, h:50};
	statusShape.w = statusTxt.getMeasuredWidth() + statusShape.space;
	itemStatus.graphics.clear().setStrokeStyle(statusShape.strokeNum).beginStroke(statusShape.stroke).beginFill(statusShape.color).drawRoundRectComplex(-(statusShape.w/2), -(statusShape.h/2), statusShape.w, statusShape.h, statusShape.radius, statusShape.radius, statusShape.radius, statusShape.radius);

	statusContainer.alpha = 0;
	TweenMax.killTweensOf(statusContainer);
	if(statusTxt.text != ""){
		TweenMax.to(statusContainer, .5, {alpha:1, overwrite:true, onComplete:function(){
			//TweenMax.to(statusContainer, .5, {delay:3, alpha:0, overwrite:true});
		}});
	}
}

/*!
 * 
 * DISPLAY PLAYER HISTORY - This is the function that runs to display player history
 * 
 */
function displayPlayerHistory(){
	var history = gameData.chess.history({verbose:true});
	if(history.length > 0){
		$.players['gamePlayerHistory'+ gameData.player].text = history[history.length-1].san;
		addUserIcon(gameData.player, history[history.length-1].piece);
	}
}

/*!
 * 
 * GET SELECT PIECE - This is the function that runs to get select piece
 * 
 */
function getCurrentPiece(piece){
	var colorIndex = gameData.player;
	var newPieceIndex = -1;
	for(var n=0; n<gameData.piece.length; n++){
		var thisPiece = gameData.piece[n];
		if(thisPiece == piece && thisPiece.color == gameData.icons[colorIndex]){
			newPieceIndex = n;
		}
	}
	
	if(newPieceIndex == -1){
		playSound("soundError");
		return;
	}

	playSound("soundSelect");
	if(gameData.pieceIndex == -1 || gameData.pieceIndex != newPieceIndex){
		gameData.pieceIndex = newPieceIndex;
		resetPieces();
		var thisPiece = gameData.piece[gameData.pieceIndex];
		gameData.fall.fromX = thisPiece.x;
		gameData.fall.fromY = thisPiece.y;
		if(boardSettings.showPlayerHighlight && !boardSettings.pieceDrag){
			thisPiece.highlight.visible = true;
			thisPiece.highlight.alpha = 1;
		}

		findValidMove(thisPiece);
	}else if(newPieceIndex == gameData.pieceIndex){
		gameData.pieceIndex = -1;
		resetPieces();
		resetValidMove();
	}
}

/*!
 * 
 * PLACE PIECE - This is the function that runs to create piece
 * 
 */
function placePieces(){
	var getBoard = gameData.chess.board();	
	for(var r=0; r<getBoard.length; r++){
		for(var c=0; c<getBoard[r].length; c++){
			if(getBoard[r][c] != null){
				placePiece(r,c,getBoard[r][c].type,getBoard[r][c].color);
			}
		}
	}
	sortIconDepth();
}
function placePiece(r,c,type,color){
	var colorIndex = color == "b" ? 1 : 0;
	if(gameData.iconSwitch){
		colorIndex = colorIndex == 1 ? 0 : 1;
	}
	var iconID = 'icon'+gameData.icon+gameData.icons[colorIndex]+type;
	var newIcon = new createjs.Bitmap(loader.getResult(iconID));
	centerReg(newIcon);
	newIcon.regY = newIcon.image.naturalHeight - (boardSettings.width/2);
	var newIconShadow = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'shadow'));
	centerReg(newIconShadow);
	var newIconHighlight = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'highlight'));
	centerReg(newIconHighlight);
	var newIconCheck = new createjs.Bitmap(loader.getResult('icon'+gameData.icon+'check'));
	centerReg(newIconCheck);

	newIcon.x = gameData.board[r][c].x;
	newIcon.y = gameData.board[r][c].y;
	newIcon.color = color;
	newIcon.type = type;
	newIcon.r = r;
	newIcon.c = c;
	newIconShadow.x = gameData.board[r][c].x;
	newIconShadow.y = gameData.board[r][c].y;
	newIconHighlight.x = gameData.board[r][c].x;
	newIconHighlight.y = gameData.board[r][c].y;
	newIconHighlight.alpha = 0;
	newIconCheck.x = gameData.board[r][c].x;
	newIconCheck.y = gameData.board[r][c].y;
	newIconCheck.alpha = 0;
	
	newIcon.shadow = newIconShadow;
	newIcon.highlight = newIconHighlight;
	newIcon.check = newIconCheck;

	if(gameData.iconSwitch){
		newIcon.scaleY = newIconHighlight.scaleY = newIconShadow.scaleY = -1;
		newIcon.scaleX = newIconHighlight.scaleX = newIconShadow.scaleX = -1;
	}

	boardIconContainer.addChild(newIconCheck, newIconHighlight, newIconShadow, newIcon);
	gameData.piece.push(newIcon);

	newIcon.cursor = "pointer";
	if(boardSettings.pieceDrag){
		newIcon.addEventListener("mousedown", function(evt) {
			togglePieceDragEvent(evt, 'drag')
		});
		newIcon.addEventListener("pressmove", function(evt) {
			togglePieceDragEvent(evt, 'move')
		});
		newIcon.addEventListener("pressup", function(evt) {
			togglePieceDragEvent(evt, 'drop')
		});
	}else{
		newIcon.addEventListener("click", function(evt) {
			if(gameData.paused || gameData.complete || gameData.moving){
				return;
			}
	
			if(gameData.ai){
				if(gameData.player == 1){
					return;
				}
				gameData.aiMove = true;
			}
	
			if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
				if(!socketData.turn){
					return;
				}
			}
			
			getCurrentPiece(evt.currentTarget);
		});
	}

	newIcon.addEventListener("mouseover", function(evt) {
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			if(!socketData.turn){
				return;
			}
		}

		if(gameData.ai){
			if(gameData.player == 1){
				return;
			}
		}

		if(boardSettings.mouseOverPlayerMove && !gameData.drag.status){
			findValidMove(evt.currentTarget);
		}
	});

	newIcon.addEventListener("mouseout", function(evt) {
		if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
			if(!socketData.turn){
				return;
			}
		}

		if(boardSettings.mouseOverPlayerMove && !gameData.drag.status){
			resetValidMove();
		}
	});
}

function togglePieceDragEvent(obj, con){
	if(gameData.paused || gameData.complete || gameData.moving){
		return;
	}

	if(gameData.ai){
		if(gameData.player == 1){
			return;
		}
		gameData.aiMove = true;
	}

	if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
		if(!socketData.turn){
			return;
		}
	}
	
	switch(con){
		case 'drag':
			obj.target.offset = {x:obj.target.x-(obj.stageX), y:obj.target.y-(obj.stageY)};
			getCurrentPiece(obj.currentTarget);
			if(gameData.pieceIndex != -1){
				gameData.drag.status = true;
				gameData.drag.x = obj.target.x;
				gameData.drag.y = obj.target.y;

				boardIconContainer.setChildIndex(obj.target, boardIconContainer.numChildren-1);
			}
		break;
		
		case 'move':
			if(gameData.drag.status){
				var moveX = ((obj.stageX) + obj.target.offset.x);
				var moveY = ((obj.stageY) + obj.target.offset.y);
				obj.target.x = moveX;
				obj.target.y = moveY;
				obj.target.shadow.x = moveX;
				obj.target.shadow.y = moveY;

				if(gameData.iconSwitch){
					obj.target.x = gameData.drag.x + (gameData.drag.x - moveX);
					obj.target.y = gameData.drag.y + (gameData.drag.y - moveY);
					obj.target.shadow.x = gameData.drag.x + (gameData.drag.x - moveX);
					obj.target.shadow.y = gameData.drag.y + (gameData.drag.y - moveY);
				}
			}
		break;
		
		case 'drop':
			var foundDropZone = false;
			for(var r=0; r<gameData.settings.size; r++){
				for(var c=0; c<gameData.settings.size; c++){
					var thisMovable = gameData.moves[r][c];
					if(thisMovable.visible){
						if(obj.target.x >= thisMovable.x - (boardSettings.width/2) && obj.target.x <= thisMovable.x + (boardSettings.width/2)){
							if(obj.target.y >= thisMovable.y - (boardSettings.width/2) && obj.target.y <= thisMovable.y + (boardSettings.width/2)){
								foundDropZone = true;

								if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
									postSocketUpdate('moveplayer', {row:thisMovable.row, column:thisMovable.column, pieceIndex:gameData.pieceIndex});
								}else{
									movePlayer(thisMovable.row, thisMovable.column);
								}
							}
						}
					}
				}
			}

			if(!foundDropZone && gameData.drag.status){
				playSound("soundDropBack");
				gameData.pieceIndex = -1;
				resetPieces();
				resetValidMove();
				
				obj.target.x = gameData.drag.x;
				obj.target.y = gameData.drag.y;
				obj.target.shadow.x = gameData.drag.x;
				obj.target.shadow.y = gameData.drag.y;
				sortIconDepth();
			}

			gameData.drag.status = false;
		break;
	}
}

function sortIconDepth(){
	if(gameData.iconSwitch){
		boardIconContainer.sortChildren(sortReverseFunction);
	}else{
		boardIconContainer.sortChildren(sortFunction);
	}
}

var sortFunction = function(obj1, obj2, options) {
	if (obj1.y > obj2.y) { return 1; }
	if (obj1.y < obj2.y) { return -1; }
	return 0;
}

var sortReverseFunction = function(obj1, obj2, options) {
	if (obj1.y < obj2.y) { return 1; }
	if (obj1.y > obj2.y) { return -1; }
	return 0;
}

/*!
 * 
 * TOGGLE PLAYER - This is the function that runs to toggle player
 * 
 */
function togglePlayer(){
	gameData.player = gameData.player == 0 ? 1 : 0;
}

function setPlayerPieceEvents(){
	for(var n=0; n<gameData.piece.length; n++){
		togglePieceEvents(gameData.piece[n], false);
		if(gameData.piece[n].color == gameData.icons[gameData.player]){
			togglePieceEvents(gameData.piece[n], true);
		}
	}
}

/*!
 * 
 * AI MOVE - This is the function that runs to move AI
 * 
 */
function moveAI() {
	gameData.moving = true;

	gameData.oldBoard = gameData.chess.board();
	var bestMove = getBestMove(gameData.chess);
	gameData.chess.move(bestMove);
	
	checkBoardDiff(true, .5);
}

/*!
 * 
 * COMPARE BOARD - This is the function that runs to compare old to new board for animation
 * 
 */
function checkBoardDiff(animate, delay){
	var history = gameData.chess.history({verbose:true});
	var captured = history[history.length-1].captured;
	var promotion = -1;

	if(history[history.length-1].promotion != undefined){
		if(gameData.aiMove){
			var c = gameData.square.indexOf(history[history.length-1].from.substring(0,1));
			var r = 8 - Number(history[history.length-1].from.substring(1,2));
			for (var n=0; n<gameData.piece.length; n++){
				if(gameData.piece[n].r == r && gameData.piece[n].c == c){
					gameData.pieceIndex = n;
				}
			}
		}

		promotion = gameData.pieceIndex;
		var thisPiece = gameData.piece[gameData.pieceIndex];
		thisPiece.type = history[history.length-1].promotion;
		gameData.oldBoard[thisPiece.r][thisPiece.c].type = history[history.length-1].promotion;
	}

	var oldArr = [];
	var newArr = [];
	var replaceArr = [];
	var getBoard = gameData.chess.board();
	for(var r=0; r<gameData.oldBoard.length; r++){
		for(var c=0; c<gameData.oldBoard[r].length; c++){
			if(gameData.oldBoard[r][c] != null){
				if(getBoard[r][c] == null){
					oldArr.push({r:r,c:c,type:gameData.oldBoard[r][c].type,color:gameData.oldBoard[r][c].color});
				}
			}

			if(getBoard[r][c] != null){
				if(gameData.oldBoard[r][c] == null){
					newArr.push({r:r,c:c,type:getBoard[r][c].type,color:getBoard[r][c].color});
				}
			}

			if(getBoard[r][c] != null){
				if(gameData.oldBoard[r][c] != null){
					if(gameData.oldBoard[r][c].color != getBoard[r][c].color){
						replaceArr.push({r:r,c:c,type:getBoard[r][c].type,color:getBoard[r][c].color});
					}
				}
			}
		}
	}

	for(var o=0; o<oldArr.length; o++){
		var turn = o == 0 ? true : false;
		for(var p=0; p<gameData.piece.length; p++){
			var thisPiece = gameData.piece[p];
			if(thisPiece.r == oldArr[o].r && thisPiece.c == oldArr[o].c && thisPiece.type == oldArr[o].type && thisPiece.color == oldArr[o].color){
				gameData.pieceIndex = p;
				if(gameData.ai && gameData.player == 1){
					var thisPiece = gameData.piece[gameData.pieceIndex];
					gameData.fall.fromX = thisPiece.x;
					gameData.fall.fromY = thisPiece.y;
				}
				p = gameData.piece.length;
			}
		}

		for(var n=0; n<newArr.length; n++){
			if(oldArr[o].type == newArr[n].type && oldArr[o].color == newArr[n].color){
				animatePiece(delay,newArr[n].r,newArr[n].c,captured,promotion,turn,animate);
			}
		}

		for(var n=0; n<replaceArr.length; n++){
			if(oldArr[o].type == replaceArr[n].type && oldArr[o].color == replaceArr[n].color){
				animatePiece(delay,replaceArr[n].r,replaceArr[n].c,captured,promotion,turn,animate);
			}
		}
	}
}


/*!
 * 
 * BOARD FUNC - This is the function that runs for board func
 * 
 */

var pawnEvalWhite =
    [
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
        [5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0,  5.0],
        [1.0,  1.0,  2.0,  3.0,  3.0,  2.0,  1.0,  1.0],
        [0.5,  0.5,  1.0,  2.5,  2.5,  1.0,  0.5,  0.5],
        [0.0,  0.0,  0.0,  2.0,  2.0,  0.0,  0.0,  0.0],
        [0.5, -0.5, -1.0,  0.0,  0.0, -1.0, -0.5,  0.5],
        [0.5,  1.0, 1.0,  -2.0, -2.0,  1.0,  1.0,  0.5],
        [0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0]
    ];

var pawnEvalBlack = reverseArray(pawnEvalWhite);

var knightEval =
    [
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0],
        [-4.0, -2.0,  0.0,  0.0,  0.0,  0.0, -2.0, -4.0],
        [-3.0,  0.0,  1.0,  1.5,  1.5,  1.0,  0.0, -3.0],
        [-3.0,  0.5,  1.5,  2.0,  2.0,  1.5,  0.5, -3.0],
        [-3.0,  0.0,  1.5,  2.0,  2.0,  1.5,  0.0, -3.0],
        [-3.0,  0.5,  1.0,  1.5,  1.5,  1.0,  0.5, -3.0],
        [-4.0, -2.0,  0.0,  0.5,  0.5,  0.0, -2.0, -4.0],
        [-5.0, -4.0, -3.0, -3.0, -3.0, -3.0, -4.0, -5.0]
    ];

var bishopEvalWhite = [
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  1.0,  1.0,  0.5,  0.0, -1.0],
    [ -1.0,  0.5,  0.5,  1.0,  1.0,  0.5,  0.5, -1.0],
    [ -1.0,  0.0,  1.0,  1.0,  1.0,  1.0,  0.0, -1.0],
    [ -1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0, -1.0],
    [ -1.0,  0.5,  0.0,  0.0,  0.0,  0.0,  0.5, -1.0],
    [ -2.0, -1.0, -1.0, -1.0, -1.0, -1.0, -1.0, -2.0]
];

var bishopEvalBlack = reverseArray(bishopEvalWhite);

var rookEvalWhite = [
    [  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0],
    [  0.5,  1.0,  1.0,  1.0,  1.0,  1.0,  1.0,  0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [ -0.5,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -0.5],
    [  0.0,   0.0, 0.0,  0.5,  0.5,  0.0,  0.0,  0.0]
];

var rookEvalBlack = reverseArray(rookEvalWhite);

var evalQueen =
    [
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0],
    [ -1.0,  0.0,  0.0,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -0.5,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [  0.0,  0.0,  0.5,  0.5,  0.5,  0.5,  0.0, -0.5],
    [ -1.0,  0.5,  0.5,  0.5,  0.5,  0.5,  0.0, -1.0],
    [ -1.0,  0.0,  0.5,  0.0,  0.0,  0.0,  0.0, -1.0],
    [ -2.0, -1.0, -1.0, -0.5, -0.5, -1.0, -1.0, -2.0]
];

var kingEvalWhite = [

    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -3.0, -4.0, -4.0, -5.0, -5.0, -4.0, -4.0, -3.0],
    [ -2.0, -3.0, -3.0, -4.0, -4.0, -3.0, -3.0, -2.0],
    [ -1.0, -2.0, -2.0, -2.0, -2.0, -2.0, -2.0, -1.0],
    [  2.0,  2.0,  0.0,  0.0,  0.0,  0.0,  2.0,  2.0 ],
    [  2.0,  3.0,  1.0,  0.0,  0.0,  1.0,  3.0,  2.0 ]
];

var kingEvalBlack = reverseArray(kingEvalWhite);

function getBestMove(game) {
    gameData.positionCount = 0;
    var depth = parseInt(gameData.depth);
    var bestMove = minimaxRoot(depth, game, true);
    return bestMove;
};

function minimaxRoot(depth, game, isMaximisingPlayer) {
    var newGameMoves = game.moves({verbose:true});
    var bestMove = -9999;
    var bestMoveFound;

    for(var i = 0; i < newGameMoves.length; i++) {
        var newGameMove = newGameMoves[i]
        game.move(newGameMove);
        var value = minimax(depth - 1, game, -10000, 10000, !isMaximisingPlayer);
        game.undo();
        if(value >= bestMove) {
            bestMove = value;
            bestMoveFound = newGameMove;
        }
    }
    return bestMoveFound;
};

function minimax(depth, game, alpha, beta, isMaximisingPlayer) {
    gameData.positionCount++;
    if (depth === 0) {
        return -evaluateBoard(game.board());
    }

    var newGameMoves = game.moves({verbose:true});
    if (isMaximisingPlayer) {
        var bestMove = -9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.max(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            alpha = Math.max(alpha, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    } else {
        var bestMove = 9999;
        for (var i = 0; i < newGameMoves.length; i++) {
            game.move(newGameMoves[i]);
            bestMove = Math.min(bestMove, minimax(depth - 1, game, alpha, beta, !isMaximisingPlayer));
            game.undo();
            beta = Math.min(beta, bestMove);
            if (beta <= alpha) {
                return bestMove;
            }
        }
        return bestMove;
    }
};

function evaluateBoard(board) {
    var totalEvaluation = 0;
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            totalEvaluation = totalEvaluation + getPieceValue(board[i][j], i ,j);
        }
    }
    return totalEvaluation;
};

function reverseArray(array) {
    return array.slice().reverse();

};

function getPieceValue(piece, x, y) {
    if (piece === null) {
        return 0;
    }
    function getAbsoluteValue(piece, isWhite, x ,y) {
        if (piece.type === 'p') {
            return 10 + ( isWhite ? pawnEvalWhite[y][x] : pawnEvalBlack[y][x] );
        } else if (piece.type === 'r') {
            return 50 + ( isWhite ? rookEvalWhite[y][x] : rookEvalBlack[y][x] );
        } else if (piece.type === 'n') {
            return 30 + knightEval[y][x];
        } else if (piece.type === 'b') {
            return 30 + ( isWhite ? bishopEvalWhite[y][x] : bishopEvalBlack[y][x] );
        } else if (piece.type === 'q') {
            return 90 + evalQueen[y][x];
        } else if (piece.type === 'k') {
            return 900 + ( isWhite ? kingEvalWhite[y][x] : kingEvalBlack[y][x] );
        }
        throw "Unknown piece type: " + piece.type;
    };

    var absoluteValue = getAbsoluteValue(piece, piece.color === 'w', x ,y);
    return piece.color === 'w' ? absoluteValue : -absoluteValue;
};

/*!
 * 
 * GAME TIMER - This is the function that runs for game timer
 * 
 */
function toggleGameTimer(con){
	if(con){
		timeData.startDate = new Date();
	}
	timeData.enable = con;
}

function togglePlayerTimer(){
	timeData.startDate = new Date();
	if(gameData.player == 0){
		timeData.opponentAccumulate = timeData.opponentTimer;
	}else{
		timeData.playerAccumulate = timeData.playerTimer;
	}
}

/*!
 * 
 * UPDATE GAME - This is the function that runs to loop game update
 * 
 */
function updateGame(){
	if(!gameData.paused){
		if(timeData.enable){
			timeData.nowDate = new Date();
			timeData.elapsedTime = Math.floor((timeData.nowDate.getTime() - timeData.startDate.getTime()));
			timeData.timer = Math.floor(timeData.elapsedTime);

			if(gameData.player == 0){
				timeData.playerTimer = Math.floor(timeData.elapsedTime + timeData.playerAccumulate);
			}else{
				timeData.opponentTimer = Math.floor(timeData.elapsedTime + timeData.opponentAccumulate);	
			}

			if ( typeof initSocket == 'function' && multiplayerSettings.enable && socketData.online) {
				postSocketUpdate('updatetimer', {playerTimer:timeData.playerTimer, opponentTimer:timeData.opponentTimer});
			}else{
				updateTimer();
			}
		}
	}
}

function updateTimer(){
	//timerTxt.text = millisecondsToTimeGame(timeData.timer);
	$.players['gameTimer'+ 0].text = millisecondsToTimeGame(timeData.playerTimer);
	$.players['gameTimer'+ 1].text = millisecondsToTimeGame(timeData.opponentTimer);
	playerData.score = boardSettings.score - timeData.playerTimer;
	playerData.opponentScore = boardSettings.score - timeData.opponentTimer;

	playerData.score = playerData.score < 0 ? 0 : playerData.score;
	playerData.opponentScore = playerData.opponentScore < 0 ? 0 : playerData.opponentScore;
}


/*!
 * 
 * END GAME - This is the function that runs for game end
 * 
 */
function endGame(){
	gameData.paused = true;
	toggleGameTimer(false);

	TweenMax.to(gameContainer, 4, {overwrite:true, onComplete:function(){
		goPage('result')
	}});
}

/*!
 * 
 * MILLISECONDS CONVERT - This is the function that runs to convert milliseconds to time
 * 
 */
function millisecondsToTimeGame(milli) {
	var milliseconds = milli % 1000;
	var seconds = Math.floor((milli / 1000) % 60);
	var minutes = Math.floor((milli / (60 * 1000)) % 60);
	
	if(seconds<10){
		seconds = '0'+seconds;  
	}
	
	if(minutes<10){
		minutes = '0'+minutes;  
	}
	
	return minutes+':'+seconds;
}

/*!
 * 
 * OPTIONS - This is the function that runs to toggle options
 * 
 */

function toggleOption(){
	if(optionsContainer.visible){
		optionsContainer.visible = false;
	}else{
		optionsContainer.visible = true;
	}
}


/*!
 * 
 * OPTIONS - This is the function that runs to mute and fullscreen
 * 
 */
function toggleGameMute(con){
	buttonSoundOff.visible = false;
	buttonSoundOn.visible = false;
	toggleMute(con);
	if(con){
		buttonSoundOn.visible = true;
	}else{
		buttonSoundOff.visible = true;	
	}
}

function toggleFullScreen() {
  if (!document.fullscreenElement &&    // alternative standard method
      !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen();
    } else if (document.documentElement.msRequestFullscreen) {
      document.documentElement.msRequestFullscreen();
    } else if (document.documentElement.mozRequestFullScreen) {
      document.documentElement.mozRequestFullScreen();
    } else if (document.documentElement.webkitRequestFullscreen) {
      document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
    }
  } else {
    if (document.eritFullscreen) {
      document.eritFullscreen();
    } else if (document.msEritFullscreen) {
      document.msEritFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitEritFullscreen) {
      document.webkitEritFullscreen();
    }
  }
}

/*!
 * 
 * SHARE - This is the function that runs to open share url
 * 
 */
function share(action){
	gtag('event','click',{'event_category':'share','event_label':action});
	
	var loc = location.href
	loc = loc.substring(0, loc.lastIndexOf("/") + 1);
	
	var title = '';
	var text = '';
	
	title = shareTitle.replace("[SCORE]", addCommas(playerData.score));
	text = shareMessage.replace("[SCORE]", addCommas(playerData.score));
	
	var shareurl = '';
	
	if( action == 'twitter' ) {
		shareurl = 'https://twitter.com/intent/tweet?url='+loc+'&text='+text;
	}else if( action == 'facebook' ){
		shareurl = 'https://www.facebook.com/sharer/sharer.php?u='+encodeURIComponent(loc+'share.php?desc='+text+'&title='+title+'&url='+loc+'&thumb='+loc+'share.jpg&width=590&height=300');
	}else if( action == 'google' ){
		shareurl = 'https://plus.google.com/share?url='+loc;
	}else if( action == 'whatsapp' ){
		shareurl = "whatsapp://send?text=" + encodeURIComponent(text) + " - " + encodeURIComponent(loc);
	}
	
	window.open(shareurl);
}