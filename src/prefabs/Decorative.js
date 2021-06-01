class Decorative {
    constructor(type) {
        this.type = type;
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity + 15, this.type, 0);
        if(this.type == "Bush" && hasSoldForDay) { this.image.flipX = true; }
        this.image.setOrigin(.5, .5).setScale(.5, .5);
        this.image.depth = this.image.y/10 - 4;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    destroy() {
        this.image.destroy();
    }
}