class Flower {
    constructor(age, water, type) {
        this.age = age;       //Int between 0 and its max, only produces Honey when fully grown
        this.water = water;   //Float between 0.0 and 1.0 for how well watered it is
        this.ref = flowerTypes[type];
        this.collected = false;
    }

    addToScene(scene, initx, inity, texture, frame) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, texture, frame);
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
    }

    water() {
        this.water += 1;
        if (this.water > this.ref["water"]) {
            this.water = this.ref["water"];
        }
    }

    advance() {
        this.water -= 1;
        if (this.water > 0 && this.age < this.ref["grow"]) {
            this.age += 1;
        }
        this.collected = false;
    }

    getPollen() {
        if (!this.collected && this.water > 0 && !(this.age < this.ref["grow"])) {
            this.collected = true;
            return this.ref["pollen"];
        } else {
            return "none";
        }
    }

    destroy() {
        this.image.destroy();
    }

    isFlower() { return true; }

    isFullyGrown() { return !(this.age < this.ref["grow"]); }

    updateImg() {
        //used to change the frame depending on the water level of the Flower
        let waterLvl = this.water / this.ref["water"];
        if (waterLvl > .65) {
            this.image.frame = 0;
        } else if (waterLvl > .3) {
            this.image.frame = 0;
        } else if (waterLvl > 0) {
            this.image.frame = 0;
        } else {
            this.image.frame = 0;
        }
    }
}