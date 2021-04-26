class WateringCan {
    constructor() {
        this.waterMax = 4;
        this.water = this.waterMax;
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, "water"+this.water, 0);
        this.image.setScale(.75, .75);
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
    }

    pour() {
        this.water--;
        if(this.water == 0) {
            return true;
        } else {
            this.image.destroy();
            return false;
        }
    }

    destroy() {
        this.image.destroy();
    }
}