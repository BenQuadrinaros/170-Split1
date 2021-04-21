class Clipper {
    constructor() {
        this.type = "Clipper";
        this.clipMax = 4;
        this.clip = this.clipMax;
    }

    addToScene(scene, initx, inity) {
        this.image = scene.add.image(initx, inity+15, "clipper");
        this.image.setOrigin(.5, .5).setScale(.55, .55);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    destroy() {
        this.image.destroy();
    }
}