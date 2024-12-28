var $jscomp=$jscomp||{};$jscomp.scope={};$jscomp.ASSUME_ES5=!1;$jscomp.ASSUME_NO_NATIVE_MAP=!1;$jscomp.ASSUME_NO_NATIVE_SET=!1;$jscomp.SIMPLE_FROUND_POLYFILL=!1;$jscomp.objectCreate=$jscomp.ASSUME_ES5||"function"==typeof Object.create?Object.create:function(b){var f=function(){};f.prototype=b;return new f};$jscomp.underscoreProtoCanBeSet=function(){var b={a:!0},f={};try{return f.__proto__=b,f.a}catch(h){}return!1};
$jscomp.setPrototypeOf="function"==typeof Object.setPrototypeOf?Object.setPrototypeOf:$jscomp.underscoreProtoCanBeSet()?function(b,f){b.__proto__=f;if(b.__proto__!==f)throw new TypeError(b+" is not extensible");return b}:null;
$jscomp.inherits=function(b,f){b.prototype=$jscomp.objectCreate(f.prototype);b.prototype.constructor=b;if($jscomp.setPrototypeOf){var h=$jscomp.setPrototypeOf;h(b,f)}else for(h in f)if("prototype"!=h)if(Object.defineProperties){var n=Object.getOwnPropertyDescriptor(f,h);n&&Object.defineProperty(b,h,n)}else b[h]=f[h];b.superClass_=f.prototype};var first_play=1,Game=function(){return Phaser.Scene.call(this,"game")||this};$jscomp.inherits(Game,Phaser.Scene);
Game.prototype.create=function(){function b(){if(u.length)return!1;if(J())m="gameover",e.time.delayedCall(200,C);else{var a=e.add.sprite(92+134*D,282,"tiles");a.setFrame(x);a.setScale(.4);a.alpha=0;u.push(a);e.tweens.add({targets:a,alpha:1,scaleX:1,scaleY:1,ease:"Back.easeOut",duration:300,onComplete:function(){m="play"}});x=Math.round(Math.random()*v);z.setFrame(x)}}function f(a,d){d=void 0===d?0:d;D=a;if(u.length){var c=u[0];c.x=92+134*a;c.pos={x:a,y:0};u.pop()}else c=e.add.sprite(92+134*a,316+
134*d,"tiles"),c.setFrame(0),c.pos={x:a,y:0};q.x=92+134*a;q.setTint(K[c.frame.name]);E(!0);l.push(c);g[d][a].type=c.frame.name+1;g[1][a].type?(m="gameover",e.time.delayedCall(200,C)):(play_sound("drop",e),h())}function h(){for(var a=0,d=0;5>d;d++)for(var c=0,r=6;0<=r;r--)0===g[r][d].type?c++:c&&(a++,n(d,r).shift=c);d=l.length;var f=0;if(a){var h=[];m="drop";c={};for(r=0;r<d;c={$jscomp$loop$prop$tile$3$22:c.$jscomp$loop$prop$tile$3$22},r++)c.$jscomp$loop$prop$tile$3$22=l[r],c.$jscomp$loop$prop$tile$3$22.shift&&
(g[c.$jscomp$loop$prop$tile$3$22.pos.y][c.$jscomp$loop$prop$tile$3$22.pos.x].type=0,c.$jscomp$loop$prop$tile$3$22.pos.y+=c.$jscomp$loop$prop$tile$3$22.shift,e.tweens.add({targets:c.$jscomp$loop$prop$tile$3$22,y:316+134*c.$jscomp$loop$prop$tile$3$22.pos.y,duration:60*c.$jscomp$loop$prop$tile$3$22.shift,onComplete:function(c){return function(){f++;c.$jscomp$loop$prop$tile$3$22.shift=0;try{g[c.$jscomp$loop$prop$tile$3$22.pos.y][c.$jscomp$loop$prop$tile$3$22.pos.x].type=c.$jscomp$loop$prop$tile$3$22.frame.name+
1}catch(M){console.error(c.$jscomp$loop$prop$tile$3$22)}A(c.$jscomp$loop$prop$tile$3$22.pos.x,c.$jscomp$loop$prop$tile$3$22.pos.y)&&h.push(c.$jscomp$loop$prop$tile$3$22);f===a&&(E(!1),h.length?F(h):b())}}(c)}))}else b()}function n(a,d){for(var c=l.length,b=0;b<c;b++)if(l[b].pos.x===a&&l[b].pos.y===d)return l[b]}function A(a,d){if(6>d&&0===g[d+1][a].type||15===g[d][a].type)return!1;var c=[],b=g[d][a].type;0<a&&g[d][a-1].type===b&&c.push({x:a-1,y:d});4>a&&g[d][a+1].type===b&&c.push({x:a+1,y:d});0<d&&
g[d-1][a].type===b&&c.push({x:a,y:d-1});6>d&&g[d+1][a].type===b&&c.push({x:a,y:d+1});return c.length?c:!1}function F(a){play_sound("combine",e);for(var d=a.length,c=0;c<d;c++){var b=a[c];if(b){var f=A(b.pos.x,b.pos.y);f&&L(b.pos,f)}}e.time.delayedCall(240,function(){if(w.length){var c=[];w.forEach(function(a){c.push(n(a.x,a.y))});w=[];F(c)}else w=[],h()})}function E(a){a?e.tweens.add({targets:q,alpha:1,duration:100,ease:"Sine.easeOut"}):0!=q.alpha&&e.tweens.add({targets:q,alpha:0,duration:100,ease:"Sine.easeOut"})}
function L(a,b){var c=n(a.x,a.y);if(!c)return!1;m="combine";var d=c.frame.name+1;t+=d;c.setBlendMode(Phaser.BlendModes.ADD);for(a={$jscomp$loop$prop$j$25:0};a.$jscomp$loop$prop$j$25<b.length;a={$jscomp$loop$prop$tile$24:a.$jscomp$loop$prop$tile$24,$jscomp$loop$prop$j$25:a.$jscomp$loop$prop$j$25},a.$jscomp$loop$prop$j$25++)a.$jscomp$loop$prop$tile$24=n(b[a.$jscomp$loop$prop$j$25].x,b[a.$jscomp$loop$prop$j$25].y),g[a.$jscomp$loop$prop$tile$24.pos.y][a.$jscomp$loop$prop$tile$24.pos.x].type=0,g[c.pos.y][c.pos.x].type=
-1,a.$jscomp$loop$prop$tile$24.setBlendMode(Phaser.BlendModes.ADD),e.tweens.add({targets:a.$jscomp$loop$prop$tile$24,duration:140,x:92+134*c.pos.x,y:316+134*c.pos.y,onComplete:function(a){return function(){c.setBlendMode(0);t+=d;t>bestscore&&(bestscore=t,G.setText(bestscore));H.setText(t);g[a.$jscomp$loop$prop$tile$24.pos.y][a.$jscomp$loop$prop$tile$24.pos.x].type=0;g[c.pos.y][c.pos.x].type=d+1;for(var e=l.length-1;0<=e;e--)l[e].pos.x===a.$jscomp$loop$prop$tile$24.pos.x&&l[e].pos.y===a.$jscomp$loop$prop$tile$24.pos.y&&
l.splice(e,1);a.$jscomp$loop$prop$tile$24.destroy(!0,!0);c.setFrame(d);c.frame.name>v&&(v=c.frame.name,12<v&&(v=12));a.$jscomp$loop$prop$j$25===b.length-1&&A(c.pos.x,c.pos.y)&&w.push(c.pos)}}(a)})}function J(){for(var a=1;7>a;a++)for(var b=0;5>b;b++)if(!g[a][b].type)return!1;return!0}function C(){play_sound("gameover",e);localStorage.setItem("rf.drop_n_merge",bestscore);m="gameover";var a=e.add.rectangle(0,0,config.width,config.height,0).setOrigin(0);a.setInteractive();a.alpha=.5;e.add.sprite(360,
630,"popup_gameover");e.add.sprite(360,369,"txt_gameover");draw_button(360,755,"restart",e);draw_button(360,870,"menu",e);e.add.text(473,521,t,{fontFamily:"vanilla",fontSize:35,align:"right",color:"#FFFFFF"}).setOrigin(1,.5);e.add.text(473,632,bestscore,{fontFamily:"vanilla",fontSize:35,align:"right",color:"#FFFFFF"}).setOrigin(1,.5)}var B=this,e=this;this.add.sprite(config.width/2,config.height/2,"bg_game");var I=this.add.group(),v=4,m="play",t=0,D=2,x=0,u=[],g=[],l=[],K=[16017692,14004226,11135232,
5552896,125821,254957,5608180,10623731,14359794,16004285,14820434,15011856,16740608,10139575,1063354];draw_button(652,75,"pause",this);var k=draw_button(65,75,"sound_on",this);k.name="sound";check_audio(k);this.add.sprite(237,68,"score_bar");this.add.sprite(482,67,"best_bar");var H=this.add.text(320,69,t,{fontFamily:"vanilla",fontSize:26,align:"right",color:"#FFFFFF"});H.setOrigin(1,.5);var G=this.add.text(563,69,bestscore,{fontFamily:"vanilla",fontSize:26,align:"right",color:"#FFFFFF"});G.setOrigin(1,
.5);this.add.sprite(config.width/2,160,"next_tile_bar");this.add.sprite(config.width/2,208,"board_top").setOrigin(.5,0);this.add.sprite(config.width/2,378,"board").setOrigin(.5,0);var q=this.add.sprite(92,388,"blend");q.setOrigin(.5,0);q.setBlendMode(Phaser.BlendModes.ADD);q.alpha=0;if(first_play){first_play=0;var y=this.add.sprite(config.width/2,700,"hand");e.tweens.add({targets:y,scaleX:.9,scaleY:.9,yoyo:!0,duration:300,loop:-1})}for(k=0;5>k;k++){var p=this.add.rectangle(92+134*k,249,124,938,16777215);
p.setOrigin(.5,0);p.setInteractive();p.alpha=.05;p.type=k;p.rect=!0}for(k=0;7>k;k++)for(g[k]=[],p=0;5>p;p++)g[k][p]={type:0};var z=this.add.sprite(config.width/2+35,159,"tiles");z.setFrame(x);z.setScale(.5);this.input.on("gameobjectdown",function(a,b){b.rect&&"play"===m&&(y&&(y.destroy(!0,!0),y=null),f(b.type));b.button&&(play_sound("click",B),B.tweens.add({targets:b,scaleX:.9,scaleY:.9,yoyo:!0,ease:"Linear",duration:100,onComplete:function(){if("play"===m){if("pause"===b.name){m="paused";var a=e.add.rectangle(0,
0,config.width,config.height,0).setOrigin(0);a.setInteractive();a.alpha=.5;var d=e.add.sprite(360,670,"popup_pause"),f=e.add.sprite(360,382,"txt_pause"),g=draw_button(360,624,"resume",e),h=draw_button(360,736,"restart",e),k=draw_button(360,848,"menu",e),l=draw_button(631,310,"close",e);I.addMultiple([a,d,f,g,h,k,l])}}else if("resume"===b.name||"close"===b.name)m="play",I.clear(!0,!0);"sound"===b.name?switch_audio(b):"restart"===b.name?e.scene.restart():("menu"===b.name||"back"===b.name)&&e.scene.start("menu")}},
B))});var w=[]};function play_sound(b,f){game_settings.sound&&f.sound.play(b)}function switch_audio(b){game_settings[b.name]?(game_settings[b.name]=!1,b.setTexture("btn_sound_off")):(game_settings[b.name]=!0,b.setTexture("btn_sound_on"))}function check_audio(b){game_settings[b.name]?b.setTexture("btn_sound_on"):b.setTexture("btn_sound_off")}function draw_button(b,f,h,n){b=n.add.sprite(b,f,"btn_"+h).setInteractive();b.button=!0;b.name=h;return b}
var config={type:Phaser.AUTO,width:720,height:1280,scale:{mode:Phaser.Scale.FIT,parent:"game_content",autoCenter:Phaser.Scale.CENTER_BOTH},scene:[Boot,Load,Menu,Game]},game=new Phaser.Game(config);
