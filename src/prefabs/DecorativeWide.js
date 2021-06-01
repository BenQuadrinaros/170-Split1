class DecorativeWide {
    constructor(type, isLeft) {
        this.type = type;
        this.isLeft = isLeft;
    }

    addToScene(scene, initx, inity) {
        if(this.isLeft) {       
            this.image = new Phaser.GameObjects.Sprite(scene, initx + 40, inity + 15, this.type, 0);
            this.image.setOrigin(.5, .5).setScale(.6, .6);
            this.image.depth = this.image.y/10 - 2;
            scene.add.existing(this.image);
            this.image.setPosition(initx + 40, inity);
            return this.image;
        } else { return null; }
    }

    destroy() {
        this.image.destroy();
    }
}