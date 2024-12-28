import Button from './Button.js'

export default class Info {
    constructor(scene, x, y, text) {
        this.scene = scene;
        this.x = x;
        this.y = y;

        
        this.image = scene.add.image(x, y, 'info')
            .setDepth(100);
        this.infoText = scene.add.text(x, y - 310, text, {
                font: "100px ComicHelvetic"
            })
            .setOrigin(0.5)
            .setDepth(100);

       
        this.restartButton = new Button(this.scene, x, y + 200, () => {
            this.scene.scene.restart();
        }, 'button', 'Start over!');
    }

}