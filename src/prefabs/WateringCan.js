class WateringCan {
    constructor() {
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, "water"+Math.min(playerVariables.water+1, 4), 0);
        this.image.setScale(.75, .75);
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    destroy() {
        this.image.destroy();
    }
}