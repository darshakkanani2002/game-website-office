import Grid from './Grid.js'
import Panel from './Panel.js'
import Button from './Button.js'
import Info from './Info.js'
import {
    shuffle
} from './functions.js'

export default class PlayScene extends Phaser.Scene {

    constructor() {
        super("PlayScene");
    }

    init() {
        //parameters inside the game, points, number of moves, number of shuffles
        this.score = 0;
        this.stepsLeft = 10;
        this.shufflesLeft = 3;
    }

    preload() {

    }

    create() {
      // center the camera in the center
        this.cameras.main.centerOn(0, 0);

        // create sounds
        this.createSounds();

        //create a playing field and a panel with information
        this.grid = new Grid(this, -700, 0, 8, 8);
        this.panel = new Panel(this, 1000, -300, this.stepsLeft, this.score);

        //create menu exit and shuffle buttons
        this.createButtons();
    }

    createSounds() {
        //button click sounds, music, etc.
        this.sounds = {
            click: this.sound.add('click', {
                volume: 1,
            }),
            tilesCollected: this.sound.add("tilesCollected", {
                volume: 1,
            }),
            manyTilesCollected: this.sound.add("manyTilesCollected", {
                volume: 1,
            }),
            win: this.sound.add("win", {
                volume: 1,
            }),
            lost: this.sound.add("lost", {
                volume: 1,
            }),
            blast: this.sound.add("blast", {
                volume: 1,
            }),
        };
    }

    createButtons() {

        //кнопка выхода в меню
        this.menuButton = new Button(this, -1280 * 3 / 2 + 170, -720 * 3 / 2 + 170, () => {
            this.scene.start('Menu');
        }, 'menu');



       
        this.shuffleButton = new Button(this, 1000, 550, () => {

           
            if (this.shufflesLeft > 0) {
               
                let temporaryTileStorage = [];
                for (let i = 0; i < this.grid.grid.length; i++) {
                    for (let j = 0; j < this.grid.grid[i].length; j++) {
                        temporaryTileStorage.push(this.grid.grid[i][j]);
                    }
                }

                
                temporaryTileStorage = shuffle(temporaryTileStorage);

               
                for (let i = 0; i < this.grid.grid.length; i++) {
                    for (let j = 0; j < this.grid.grid[i].length; j++) {
                        this.grid.grid[i][j] = temporaryTileStorage.pop();
                        this.grid.grid[i][j].setGridPos(i, j);
                        this.grid.grid[i][j].moveTo(this.grid.x - (171 + this.grid.padding) * (this.grid.gridXLen / 2 - 1 / 2) + (171 + this.grid.padding) * i,
                            this.grid.y - (192 + this.grid.padding) * (this.grid.gridYLen / 2 - 1 / 2) + (192 + this.grid.padding) * j);
                    }
                }

                
                this.shufflesLeft -= 1;
                this.shuffleButton.setButtonText('Mix! x' + String(this.shufflesLeft));

                
                if (this.shufflesLeft === 0) {
                    this.tweens.add({
                        targets: this.shuffleButton.container,
                        x: this.shuffleButton.container.x + 3000,
                        duration: 700,
                        ease: 'Back.In',
                        onComplete: () => {
                            this.shuffleButton.destroy();
                        }
                    });
                }
            }
        }, 'button', 'Mix! x' + String(this.shufflesLeft));
    }

    update() {

    }
}