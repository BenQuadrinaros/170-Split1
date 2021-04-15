class WateringCan {
    constructor() {
        this.waterMax = 4;
        this.water = this.waterMax;
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, "water", 0);
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
    }

    destroy() {
        this.image.destroy();
    }
}