var canvas = document.getElementById('game');
var stage = new createjs.Stage(canvas);

createjs.Ticker.on('tick', tick);
createjs.Ticker.setFPS(60);

function tick(){
	stage.update();
}

var boxs;
var txtQuestion;
var txtScore;
var score = 0;
var bestScore = 0;

var sound = true;
var music = true;

var operator; //Store math operators
var randNum1; //First number
var randNum2; //Second number
var correctAnswer;
var question; // 1+1=?
var txtAnswer;
var timerbarMask;
var timer = 32;
var gameOver = false;
var subtractTimer = 200; //Substract time if answer is wrong
var addTimer = 100; //Add more time if answer is correct
var fontSheet; //Store BitmapText/Spritefont
var fontBlackSheet; //Store BitmapText/Spritefont

function load(){
	var bg = new createjs.Bitmap('assets/img/bgMenu.png');

	var title = new createjs.Bitmap('assets/img/gameTitle.png');
	title.setTransform(360, 380);
	title.regX = 235;
	title.regY = 150;

	var timerbar = new createjs.Bitmap('assets/img/timerbar.png');
	timerbar.setTransform(364, 705);
	timerbar.regX = 346;
	timerbar.regY = 43;

	loadBar = new createjs.Bitmap('assets/img/timer.png');
	loadBar.setTransform(-295, 697);
	loadBar.regX = 327;
	loadBar.regY = 24;	

	timerbarMask = new createjs.Shape();
	timerbarMask.graphics.drawRoundRect(0,0,655, 48, 8);
	timerbarMask.setTransform(timer, loadBar.y);
	timerbarMask.regY = 48/2;

	stage.addChild(bg, title, timerbar,loadBar, timerbarMask);

	loadBar.mask = timerbarMask;

	//Load all game assets
	manifest = [
		{src:'img/bgGame.png', id:'bg'},
		{src:'img/bgMenu.png', id:'bgMenu'},
		{src:'img/header.png', id:'header'},
		{src:'img/headerMenu.png', id:'headerMenu'},
		{src:'img/btnMenu.png', id:'btnMenu'},
		{src:'img/btnMenu2.png', id:'btnMenu2'},
		{src:'img/btnPlay.png', id:'btnPlay'},
		{src:'img/btnRestart.png', id:'btnRestart'},
		{src:'img/btnSound.png', id:'btnSound'},
		{src:'img/btnMusic.png', id:'btnMusic'},
		{src:'img/timerbar.png', id:'timerbar'},
		{src:'img/timerMask.png', id:'timerMask'},
		{src:'img/gameTitle.png', id:'gameTitle'},
		{src:'img/timer.png', id:'timer'},
		{src:'img/popup.png', id:'popup'},
		{src:'img/box1.png', id:'box1'},
		{src:'img/box2.png', id:'box2'},
		{src:'img/box3.png', id:'box3'},
		//Spritefont
		{src:'font/font.png', id:'font'},
		{src:'font/fontBlack.png', id:'fontBlack'},
		//Preload Audio
		{src:'audio/click2.ogg', id:'click'},
		{src:'audio/click.ogg', id:'playClick'},
		{src:'audio/gameover.ogg', id:'gameover'},
		{src:'audio/correct.ogg', id:'correct'},
		{src:'audio/wrong.ogg', id:'wrong'},
		{src:'audio/music.ogg', id:'music'},
	];

	preload = new createjs.LoadQueue(true);
	preload.installPlugin(createjs.Sound);
	preload.loadManifest(manifest, true, 'assets/');
	preload.on('complete', loadComplete);
	preload.on('progress', loading);
	createjs.Sound.alternateExtensions = ["m4a"];
}

function loading(){
	loadBar.x = -295+(655*preload.progress);
}

function loadComplete(){
	//Set spritefont
	fontSheet = new createjs.SpriteSheet({
		'images': [img('font')],
		'animations': {
			'B': {frames: [0]},
			'E': {frames: [1]},
			'S': {frames: [2]},
			'T': {frames: [3]},
			':': {frames: [4]},
			'0': {frames: [5]},
			'1': {frames: [6]},
			'2': {frames: [7]},
			'3': {frames: [8]},
			'4': {frames: [9]},
			'5': {frames: [10]},
			'6': {frames: [11]},
			'7': {frames: [12]},
			'8': {frames: [13]},
			'9': {frames: [14]},
			'-': {frames: [15]},
		},
		'frames': {'width': 58, 'height': 70, 'regX': 29, 'regY': 35},
	});

	fontBlackSheet = new createjs.SpriteSheet({
		'images': [img('fontBlack')],
		'animations': {
			'0': {frames: [0]},
			'1': {frames: [1]},
			'2': {frames: [2]},
			'3': {frames: [3]},
			'4': {frames: [4]},
			'5': {frames: [5]},
			'6': {frames: [6]},
			'7': {frames: [7]},
			'8': {frames: [8]},
			'9': {frames: [9]},
			'+': {frames: [10]},
			'-': {frames: [11]},
			'x': {frames: [12]},
			'/': {frames: [13]},
			'=': {frames: [14]},
			'?': {frames: [15]},
		},
		'frames': {'width': 81, 'height': 105, 'regX': 40, 'regY': 52},
	});

	//checking saved highscore
	var storage = localStorage.getItem('best');
	if(storage > 0){
		bestScore = storage;
	}

	stage.removeAllChildren(); //Clear all game objects
	menu(); //Draw menu
}

function img(e){
	return preload.getResult(e);
}

function menu(){
	if(music == true){
		createjs.Sound.stop('music');
		playMusic();
	}
	
	var bg = new createjs.Bitmap(img('bgMenu'));

	var header = new createjs.Bitmap(img('headerMenu'));

	var bMusic = new createjs.Bitmap(img('btnMusic'));
	bMusic.setTransform(552, 54);
	bMusic.regX = bMusic.getBounds().width/2;
	bMusic.regY = bMusic.getBounds().height/2;
	//Checking if music disable or enable
	if(music == false){
		bMusic.alpha = 0.5;
	}

	var bSound = new createjs.Bitmap(img('btnSound'));
	bSound.setTransform(652, 54);
	bSound.regX = bSound.getBounds().width/2;
	bSound.regY = bSound.getBounds().height/2;
	//Checking if music disable or enable
	if(sound == false){
		bSound.alpha = 0.5;
	}

	var bestScoreText = new createjs.BitmapText(bestScore.toString(), fontSheet);
	bestScoreText.setTransform(275, 52);
	bestScoreText.regX = bestScoreText.getBounds().width/6; //Set regX to center
	bestScoreText.scaleX = bestScoreText.scaleY = 0.6; //Set scale to 0.6

	var title = new createjs.Bitmap(img('gameTitle'));
	title.setTransform(360, 380);
	title.regX = title.getBounds().width/2;
	title.regY = title.getBounds().height/2;
	title.scaleX = title.scaleY = 0.5;

	var bPlay = new createjs.Bitmap(img('btnPlay'));
	bPlay.setTransform(364, 720);
	bPlay.regX = bPlay.getBounds().width/2;
	bPlay.regY = bPlay.getBounds().height/2;

	stage.addChild(bg, header, bMusic, bSound, bestScoreText, title, bPlay);

	//Animate gameTitle on start
	createjs.Tween.get(title).to({scaleX:1, scaleY:1},800, createjs.Ease.backOut);

	bMusic.on('click', function(){
		playSound('click');
		createjs.Tween.get(bMusic)
			.to({scaleX:0.85, scaleY:0.85}, 150)
			.to({scaleX:1, scaleY:1}, 150)
			.call(function(){
				if(music == true){
					music = false;
					bMusic.alpha = 0.5;
					createjs.Sound.stop('music'); //Stop music
				}
				else if(music == false){
					music = true;
					bMusic.alpha = 1;
					playMusic();
				}
			})
	})

	bSound.on('click', function(){
		playSound('click');
		createjs.Tween.get(bSound)
			.to({scaleX:0.85, scaleY:0.85}, 150)
			.to({scaleX:1, scaleY:1}, 150)
			.call(function(){
				if(sound == true){
					sound = false;
					bSound.alpha = 0.5;
				}
				else if(sound == false){
					sound = true;
					bSound.alpha = 1;
				}
			})
	})

	//Button play on clicked
	bPlay.on('click', function(){
		playSound('playClick');
		createjs.Tween.get(bPlay)
			.to({scaleX:0.9, scaleY:0.9}, 150)
			.to({scaleX:1, scaleY:1}, 150)
			.call(function(){
				stage.removeAllChildren(); //Clear all game objects
				game(); //Draw game
			})
	})
}

function game(){
	generate(); //Generate math question

	boxs = new createjs.Container();
	txtAnswer  = new createjs.Container()

	var bg = new createjs.Bitmap(img('bg'));
	stage.addChild(bg, boxs);

	var header = new createjs.Bitmap(img('header'));
	stage.addChild(header);

	var scoreText = new createjs.BitmapText(score.toString(), fontSheet);
	scoreText.setTransform(275, 52);
	scoreText.regX = scoreText.getBounds().width/6; //Set regX to center
	scoreText.scaleX = scoreText.scaleY = 0.6; //Set scale to 0.6
	stage.addChild(scoreText);

	var btnMenu = new createjs.Bitmap(img('btnMenu'));
	btnMenu.setTransform(652, 54);
	btnMenu.regX = btnMenu.getBounds().width/2;
	btnMenu.regY = btnMenu.getBounds().height/2;
	stage.addChild(btnMenu);

	btnMenu.on('click', function(){
		playSound('click');
		createjs.Tween.get(btnMenu)
			.to({scaleX:0.85, scaleY:0.85}, 150)
			.to({scaleX:1, scaleY:1}, 150)
			.call(function(){
				stage.removeAllChildren();
				timer = 32; //Reset timer
				gameOver = false;
				score = 0;
				menu();
			})
	});

	//Timer background (red)
	var timerbar = new createjs.Bitmap(img('timerbar'));
	timerbar.setTransform(364, 205);
	timerbar.regX = timerbar.getBounds().width/2;
	timerbar.regY = timerbar.getBounds().height/2;
	stage.addChild(timerbar);

	//Timer progress
	var timerWhite = new createjs.Bitmap(img('timer'));
	timerWhite.setTransform(360, 197);
	timerWhite.regX = timerWhite.getBounds().width/2;
	timerWhite.regY = timerWhite.getBounds().height/2;
	stage.addChild(timerWhite);

	//Timer mask
	timerbarMask = new createjs.Shape();
	timerbarMask.graphics.drawRoundRect(0,0,655, 48, 8);
	timerbarMask.setTransform(timer, 197);
	timerbarMask.regY = 48/2;

	stage.addChild(timerbarMask);

	timerWhite.mask = timerbarMask;

	timerbarMask.on('tick', function(){
		if(gameOver == false){
			if(timerbarMask.x > -623){
				timerbarMask.x -= 1;
				timer = timerbarMask.x;
			}
			else {
				gameOver = true;
				gameover();
			}
		}
	})

	//Answers box
	var box1 = new createjs.Bitmap(img('box1'));
	box1.setTransform(136, 864);

	var box2 = new createjs.Bitmap(img('box2'));
	box2.setTransform(360, 864);

	var box3 = new createjs.Bitmap(img('box3'));
	box3.setTransform(584, 864);

	boxs.addChild(box1, box2, box3);

	var boxCount = boxs.children.length;
	//Set all boxs point to center.
	for(i=0; i<boxCount; i++){
		var child = boxs.getChildAt(i);
		child.index = i;

		child.regX = child.getBounds().width/2;
		child.regY = child.getBounds().height/2;
	}

	boxs.on('click', function(e){
		if(gameOver == false){
			checkAnswer(e.target.value);
		}
	});

	txtQuestion = new createjs.BitmapText(question.toString(), fontBlackSheet);
	txtQuestion.setTransform(360, 504);
	txtQuestion.regX = txtQuestion.getBounds().width/2.5;
	stage.addChild(txtQuestion, txtAnswer);

	generateAnswer(); //Generate answers choice (Answers box)
}

function generate(){
	operator = getOperator(); //Get random operators (+-x:)
	randNum1 = randomNumb(); //Get random numbers

	//Avoid decimal answer
	if(operator == '/'){
		randNum2 = 2;
		if(randNum1 % randNum2 != 0){
			randNum1++;
		}
	}
	else {
		randNum2 = randomNumb(); //Generate second number
	}

	correctAnswer = result();
	question = randNum1+operator+randNum2+'=?';
}

function getOperator(){
	if(score < 6){ //If score less than 6, only generate '+' and '-' operators
		var random = Math.round(Math.random()*1);
		if(random == 0){
			return '+';
		}
		else {
			return '-';
		}
	}
	else if(score >= 6 && score < 15){ //If score between 6 and 15, generate '+', '-', and 'x' operators
		var random = Math.round(Math.random()*2);
		if(random == 0){
			return '+';
		}
		else if(random == 1){
			return '-';
		}
		else if(random == 2){
			return 'x';
		}
	}
	else { //Generate all operator if score greather than 15
		var random = Math.round(Math.random()*3);
		if(random == 0){
			return '+';
		}
		else if(random == 1){
			return '-';
		}
		else if(random == 2){
			return 'x';
		}
		else if(random == 3){
			return '/';
		}
	}
}

function randomNumb(){
	var num = Math.round(Math.random()*8+2);
	return num;
}

//Generate correct answer
function result(){
	if(operator == '+'){
		return randNum1+randNum2;
	}
	else if(operator == '-'){
		return randNum1-randNum2;
	}
	else if(operator == 'x'){
		return randNum1*randNum2;
	}
	else if(operator == '/'){
		return randNum1/randNum2;
	}
}

function generateAnswer(){
	var num = boxs.children.length;
	var randx = Math.round(Math.random()*(num-1));

	for(i=0; i<num; i++){
		var box = boxs.getChildAt(i);
		var value = getValue(i, randx);
		box.value = value;
		
		var txt = new createjs.BitmapText(value.toString(), fontSheet);
		txt.setTransform(box.x, box.y);
		if(value >= 0 && value < 10){
			txt.regX = (txt.getBounds().width/4)-20;
		}
		else {
			txt.regX = (txt.getBounds().width/4);
		}
		txtAnswer.addChild(txt);
	}

	//Checking duplicated value (answer), to avoid duplicated answer
	for(i=0; i<num; i++){
		var box = boxs.getChildAt(i);
		if(i > 0){
			if(i<2){
				//If value duplicated
				if(box.value == boxs.getChildAt(i+1).value || box.value == boxs.getChildAt(i-1).value){
					box.value -= i*2; //Substract value if duplicated another value (answer)
					txtAnswer.getChildAt(i).text = box.value.toString();
				}
			}
			else {
				//If value duplicated
				if(box.value == boxs.getChildAt(i-1).value || box.value == boxs.getChildAt(i-2).value){
					box.value -= i*2; //Substract value if duplicated another value (answer)
					txtAnswer.getChildAt(i).text = box.value.toString();
				}
			}
		}
	}
}

function getValue(i, randx){
	var min = correctAnswer/2;
	var max = correctAnswer*1.5;
	if(i == randx){
		return correctAnswer;
	}
	else {
		var val = Math.round(Math.random()*max+min);
		if(val == correctAnswer){
			return val-(Math.round(Math.random()*4+1));
		}
		else {
			return val;
		}
	}
}

//Checking player answer
function checkAnswer(answer){
	//If correct
	if(answer == correctAnswer){

		timer += addTimer;
		if(timer > 32){
			timer = 32;
		}

		updateScore();

		stage.removeAllChildren();
		game();
		playSound('correct');
	}
	//If incorrect
	else {
		timer -= subtractTimer;
		if(timer < -623){
			timer = -623;
		}

		stage.removeAllChildren();
		game();
		playSound('wrong');
	}
}

function updateScore(){
	score++;
}

function gameover(){

	playSound('gameover');

	if(score > bestScore){
		bestScore = score;
		localStorage.setItem('best', bestScore);
	}

	var popup = new createjs.Bitmap(img('popup'));
	popup.setTransform(368, 548);
	popup.regX = popup.getBounds().width/2;
	popup.regY = popup.getBounds().height/2;

	var bRestart = new createjs.Bitmap(img('btnRestart'));
	bRestart.setTransform(624, 728);
	bRestart.regX = bRestart.getBounds().width/2;
	bRestart.regY = bRestart.getBounds().height/2;

	var bMenu2 = new createjs.Bitmap(img('btnMenu2'));
	bMenu2.setTransform(108, 728);
	bMenu2.regX = bMenu2.getBounds().width/2;
	bMenu2.regY = bMenu2.getBounds().height/2;

	var bestScoreText = new createjs.BitmapText('BEST:'+bestScore.toString(), fontSheet);
	bestScoreText.setTransform(360, 627);
	bestScoreText.regX = bestScoreText.getBounds().width/2;
	bestScoreText.scaleX = bestScoreText.scaleY = 0.4;

	var yourScore = new createjs.BitmapText(score.toString(), fontBlackSheet);
	yourScore.setTransform(360, 544);
	yourScore.regX = (yourScore.getBounds().width/2)-30;
	yourScore.scaleX = yourScore.scaleY = 0.6;
	yourScore.alpha = 0.6; //Set opacity

	stage.addChild(popup, bRestart, bMenu2, bestScoreText, yourScore);

	bRestart.on('click', function(){
		playSound('click');
		createjs.Tween.get(bRestart)
			.to({scaleX:0.85, scaleY:0.85}, 150)
			.to({scaleX:1, scaleY:1}, 150)
			.call(function(){
				stage.removeAllChildren();
				timer = 32; //Reset timer
				gameOver = false;
				score = 0;
				game();
			})
	});

	bMenu2.on('click', function(){
		playSound('click');
		createjs.Tween.get(bMenu2)
			.to({scaleX:0.85, scaleY:0.85}, 150)
			.to({scaleX:1, scaleY:1}, 150)
			.call(function(){
				stage.removeAllChildren();
				timer = 32; //Reset timer
				gameOver = false;
				score = 0;
				menu();
			})
	});
}

function playSound(id){
	if(sound == true){
		createjs.Sound.play(id);
	}
}

function playMusic(){
	createjs.Sound.play('music', {loop:-1});
}

//Resize canvas (letterbox scale)
(function () {
  
  var game = {
	  element: canvas,
	  width: canvas.width,
	  height: canvas.height
  },
  
  resizeGame = function () {
		
	  var viewport, newGameWidth, newGameHeight, newGameX, newGameY;
				
	  // Get the dimensions of the viewport
	  viewport = {
		  width: window.innerWidth,
		  height: window.innerHeight
	  };
	  
	  // Determine game size
	  if (game.height / game.width > viewport.height / viewport.width) {
		newGameHeight = viewport.height;
		newGameWidth = newGameHeight * game.width / game.height;  
	  } else {
		newGameWidth = viewport.width;
		newGameHeight = newGameWidth * game.height / game.width;		 
	  }
  
	  game.element.style.width = newGameWidth + "px";
	  game.element.style.height = newGameHeight + "px";
	  
	  newGameX = (viewport.width - newGameWidth) / 2;
	  newGameY = (viewport.height - newGameHeight) / 2;

	  // Set the new padding of the game so it will be centered
	  game.element.style.padding = newGameY + "px " + newGameX + "px";
  };
  
  window.addEventListener("resize", resizeGame);
  resizeGame();
}())