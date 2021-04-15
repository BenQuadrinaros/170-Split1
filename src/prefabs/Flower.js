class Flower {
    constructor(age, water, type) {
        this.ref = flowerTypes[type];
        this.water = Math.min(water, this.ref["water"]); //Int between 0 and its max, only produces Honey when fully grown
        this.age = Math.min(age, this.ref["grow"]);     //Int between 0 and its max, only produces Honey above 0
        this.collected = false;                          //Can only produce pollen once a day
        this.type = type;                                //Cosmo, Lavender, Blue Bonnet, Tulip, Orchid
    }

    addToScene(scene, initx, inity) {
        this.image = this.updateImg(scene);
        this.image.x = initx;
        this.image.y = inity;
        this.image.setOrigin(.5, .5).setScale(.2, .2);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    addWater() {
        if (this.water < this.ref["water"]) {
            this.water += 1;
        }
    }

    advance() {
        this.water -= 1;
        if (this.water > 0 && this.age < this.ref["grow"]) {
            this.age += 1;
        } else if(this.water < 0) {
            return true;
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

    isFullyGrown() { return !(this.age < this.ref["grow"]); }

    updateImg(scene) {
        //If there is an image, clear it
        if(this.image) {
            this.image.destroy();
        }
        //Change the texture depending on the age and water level of the Flower
        let sprites = this.ref["sprites"];
        let waterLvl = this.water / this.ref["water"];
        let texture = "";
        if(this.age == 0) {
            //Level 0 - Seedling
            texture = sprites[0];
        } else if (this.age / this.ref["grow"] < .5) {
            //Level 1 - Sprout
            console.log("mid grow " + this.age + " of type " + this.type);
            texture = sprites[1];
        } else if (!this.isFullyGrown()) {
            //Level 2 - Growing
            texture = sprites[2];
        } else if (waterLvl > .5) {
            //Level 3 - Full
            texture = sprites[3];
        } else if (waterLvl > 0) {
            //Level 4 - Decaying
            texture = sprites[4];
        } else {
            //Level 5 - Dead
            texture = sprites[5];
        }
        return scene.add.image(0, 0, texture);
    }
}