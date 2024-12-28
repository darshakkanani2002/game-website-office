export default class Tile {

    constructor(scene, x, y) {
        this.scene = scene;

        
        this.gridPosX = x;
        this.gridPosY = y;

        
        this.type = 'normal';

        
        let colors = [0xff0000, 0xf6ff00, 0x00ff3c, 0x1500ff, 0xff00dd];

        
        this.color = colors[Math.floor(colors.length * Math.random())];

        
        this.sprite = scene.add.sprite(x, y, 'tile')
            .setTint(this.color)
            .on('animationcomplete', () => {
                
                this.sprite.destroy();
            })
            .setScale(0);

        
        this.scene.tweens.add({
            targets: this.sprite,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: 'Linear'
        });

        
        scene.anims.create({
            key: "burn",
            frameRate: 20,
            frames: scene.anims.generateFrameNumbers("tile", {
                start: 0,
                end: 5
            }),
        });
    }

    makeTileBlast() {
        
        this.type = 'blast';
        this.color = 0x6effee;
        this.sprite
            .setTint(this.color)
            .setScale(0);

        
        this.scene.tweens.add({
            targets: this.sprite,
            scaleX: 1,
            scaleY: 1,
            duration: 300,
            ease: 'Linear',
            onComplete: () => {
                this.scene.tweens.add({
                    targets: this.sprite,
                    scaleX: 1.1,
                    scaleY: 1.1,
                    duration: 3000,
                    yoyo: true,
                    repeat: -1,
                });
            }
        });
    }

    setGridPos(x, y) {
        
        this.gridPosX = x;
        this.gridPosY = y;
    }


    burn() {
        
        this.sprite
            .play('burn')
            .setTint(20)
            .setDepth(10)
            .disableInteractive();
        
        this.scene.tweens.add({
            targets: this.sprite,
            alpha: 0,
            scaleX: 1.4,
            scaleY: 1.4,
            duration: 500,
            ease: 'Linear'
        });
    }

    moveTo(x, y) {
        
        this.scene.tweens.add({
            targets: this.sprite,
            x: x,
            y: y,
            duration: 300,
            ease: 'Quart.Out'
        });
    }

}