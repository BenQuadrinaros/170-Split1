class WateringCan {
    constructor() {
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