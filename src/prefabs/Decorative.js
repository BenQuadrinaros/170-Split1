class Decorative {
    constructor(type) {
        this.type = type;
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity + 15, this.type, 0);
        this.image.setOrigin(.5, .5).setScale(.25, .25);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    destroy() {
        this.image.destroy();
    }
}