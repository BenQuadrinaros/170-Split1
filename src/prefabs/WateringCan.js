class WateringCan {
    constructor() {
        this.type = "Watering Can";
    }

    addToScene(scene, initx, inity) {
        let color = "red";
        if(playerVariables.waterLvl == 1) { color = "blue"; }
        else if(playerVariables.waterLvl == 2) { color = "purple"; }
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, color+"water"+playerVariables.water);
        console.log("got image " + color+"water"+playerVariables.water);
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