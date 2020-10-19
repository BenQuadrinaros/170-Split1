class Note extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, side, keyValue, tempo = 2) {
        if(side == "left") {
            super(scene, scene.meter.x - (scene.meter.width/2), scene.meter.y, texture, frame);
        } else {
            super(scene, scene.meter.x + (scene.meter.width/2), scene.meter.y, texture, frame);
        }
        scene.add.existing(this);
        this.setScale(.75, .75);
        this.setOrigin(.5);

        this.depth = 3;
        this.scene = scene;
        this.side = side;
        this.keyValue = keyValue;
        this.tempo = tempo;
    }

    update() {
        if(this.side == "left") {
            this.x += this.tempo;
            
        } else {
            this.x -= this.tempo;
        }
    }

    destroy() {
        super.destroy();
    }
}