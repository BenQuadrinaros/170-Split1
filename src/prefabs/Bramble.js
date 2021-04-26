class Bramble {
    constructor(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.type = "Bramble";
    }

    addToScene(scene, initx, inity) {
        this.image = scene.add.image(initx, inity+15, "bramble");
        this.image.setOrigin(.5, .5).setScale(.2, .2);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    destroy() {
        this.image.destroy();
    }
}