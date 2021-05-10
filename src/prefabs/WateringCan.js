class WateringCan {
    constructor() {
        this.type = "Watering Can";
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, "water"+playerVariables.water);
        this.image.setScale(.75, .75);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    destroy() {
        this.image.destroy();
    }
}