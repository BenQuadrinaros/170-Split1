class Clipper {
    constructor() {
        this.type = "Clipper";
    }

    addToScene(scene, initx, inity) {
        this.image = scene.add.image(initx, inity+15, "clipper");
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