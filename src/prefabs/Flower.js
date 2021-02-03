class Flower{
    constructor(color, age, water) {
        this.color = color;   //What color honey is produced (img is not tied to this)
        this.age = age;       //Int between 1 and 4, amount of honey produced and durability
        this.water = water;   //Float between 0.0 and 1.0 for how well watered it is
    }

    addToScene(scene, initx, inity, texture, frame) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, texture, frame);
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
    }

    water() { this.water += .5; }

    advance() {
        this.water -= (5 - this.age) / 10;
        if(this.water > 0) { return this.age * this.water; }
        else { return 0; }
    }

    destroy() {
        this.image.destroy();
    }
}