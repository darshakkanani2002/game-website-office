import Info from './Info.js';
import Tile from './Tile.js'

export default class Grid {

    constructor(scene, x, y, gridXLen, gridYLen) {
        this.scene = scene;
        this.x = x;
        this.y = y;
        this.gridXLen = gridXLen;
        this.gridYLen = gridYLen;

       
        this.padding = 23;

       
        this.image = scene.add.image(x, y, 'grid');

      
        this.grid = [...Array(gridXLen)].map(e => Array(gridYLen).fill(null));

        for (let i = 0; i < gridXLen; i++) {
            for (let j = 0; j < gridYLen; j++) {
                this.addTile(i, j);
            }
        }
    }

    findNeighbors(i, j, color) {
       
        if (this.grid[i][j] !== null) {
            if (this.grid[i][j].color === color) {
                
                let t = this.grid[i][j];
                this.tilesToBurn.push(t);
                this.grid[i][j] = null;

                
                if (i > 0) {
                    this.findNeighbors(i - 1, j, color);
                }
                if (i < this.grid.length - 1) {
                    this.findNeighbors(i + 1, j, color);
                }
                if (j > 0) {
                    this.findNeighbors(i, j - 1, color);
                }
                if (j < this.grid[i].length - 1) {
                    this.findNeighbors(i, j + 1, color);
                }
            }
        }
    }

    fillGrid() {
       
        for (let i = 0; i < this.grid.length; i++) {
            if (this.grid[i][0] === null) {
                let t = this.addTile(i, 0);
            }
        }
    }

    makeTilesFall() {
        

        
        for (let i = 0; i < this.grid.length; i++) {
            for (let j = this.grid[i].length - 2; j >= 0; j--) {

                
                if (this.grid[i][j] !== null && this.grid[i][j + 1] === null) {

                    
                    let fallingLen = 1;

                    while (true) {
                        if (j + fallingLen < this.grid[i].length - 1) {
                           

                            if (this.grid[i][j + fallingLen + 1] === null) {
                                fallingLen += 1;
                            }
                            
                            else {
                                break;
                            }
                        }
                        
                        else {
                            break;
                        }
                    }

                    
                    this.grid[i][j + fallingLen] = this.grid[i][j];
                    this.grid[i][j + fallingLen].setGridPos(i, j + fallingLen);
                    this.grid[i][j] = null;
                    this.grid[i][j + fallingLen].moveTo(this.grid[i][j + fallingLen].sprite.x,
                        this.y - (192 + this.padding) * (this.grid[i].length / 2 - 1 / 2) + (192 + this.padding) * (j + fallingLen));

                }
            }
        }
    }

    blast(t) {
       
        this.scene.sounds.blast.play();

        for (let q = t.gridPosX - 2; q < t.gridPosX + 3; q++) {
            for (let w = t.gridPosY - 2; w < t.gridPosY + 3; w++) {
                if (q >= 0 && q < this.gridXLen && w >= 0 && w < this.gridYLen) {
                    
                    let t = this.grid[q][w];
                    this.tilesToBurn.push(t);
                    this.grid[q][w] = null;
                }
            }
        }
       
        this.scene.score += this.tilesToBurn.length;
        this.scene.panel.addScore(this.tilesToBurn.length);

        
        this.scene.stepsLeft -= 1;
        this.scene.panel.moveMade();

       
        for (let k of this.tilesToBurn) {
            k.burn();
        }
    }

    addTile(i, j) {
       
        let t = new Tile(this.scene, this.x - (171 + this.padding) * (this.gridXLen / 2 - 1 / 2) + (171 + this.padding) * i,
            this.y - (192 + this.padding) * (this.gridYLen / 2 - 1 / 2) + (192 + this.padding) * j);
        t.setGridPos(i, j);
        t.sprite
            .setInteractive() 
            .on('pointerdown', () => {
                
                if (this.scene.stepsLeft > 0) {
                    if (t.type === 'blast') {
                        
                        this.tilesToBurn = [];

                        
                        this.blast(t);
                    } else {
                        
                        this.tilesToBurn = [];

                       
                        this.findNeighbors(t.gridPosX, t.gridPosY, t.color);

                        if (this.tilesToBurn.length > 1) {
                            
                            let scoreToAdd = this.tilesToBurn.length;
                            this.scene.score += scoreToAdd;
                            this.scene.panel.addScore(scoreToAdd);

                            
                            this.scene.stepsLeft -= 1;
                            this.scene.panel.moveMade();

                           
                            for (let k of this.tilesToBurn) {
                                if (k != t) 
                                {
                                    k.burn();
                                } else {
                                    
                                    if (this.tilesToBurn.length >= 5) {
                                        k.makeTileBlast();
                                        this.grid[t.gridPosX][t.gridPosY] = k;
                                    }
                                   
                                    else {
                                        k.burn();
                                    }
                                }
                            }
                        } else {
                           
                            for (let k of this.tilesToBurn) {
                                this.grid[k.gridPosX][k.gridPosY] = k;
                            }
                        }

                        if (this.tilesToBurn.length > 1 && this.tilesToBurn.length < 5) {
                           
                            this.scene.sounds.tilesCollected.play();
                        } else if (this.tilesToBurn.length >= 5) {
                           
                            this.scene.sounds.manyTilesCollected.play();
                        }
                    }


                    
                    this.fillGridTillFull();
                }

               
                if (this.scene.stepsLeft <= 0) {
                   
                    for (let q = 0; q < this.gridXLen; q++) {
                        for (let w = 0; w < this.gridYLen; w++) {
                            this.grid[q][w].sprite.disableInteractive();
                        }
                    }

                   
                    if (this.scene.score < 100) {
                        
                        new Info(this.scene, 0, 0, 'oh, the moves are over...');
                        this.scene.sounds.lost.play();
                    } else {
                       
                        new Info(this.scene, 0, 0, 'Victory!');
                        this.scene.sounds.win.play();
                    }
                }

            }, this);

        
        this.grid[i][j] = t;
    }

    fillGridTillFull() {
        
        while (true) {
           
            this.makeTilesFall();

            
            this.fillGrid();

            
            let continueFilling = false;
            for (let i = 0; i < this.gridXLen; i++) {
                for (let j = 0; j < this.gridYLen; j++) {
                    if (this.grid[i][j] === null) {
                        continueFilling = true;
                    }
                }
            }
            
            if (!continueFilling) {
                break;
            }
        }
    }


}