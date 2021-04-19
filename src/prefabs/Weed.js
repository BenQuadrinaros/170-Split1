class Weed {
    constructor(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.type = "Weed";
        this.spreader = false;
    }

    addToScene(scene, initx, inity) {
        this.image = scene.add.image(initx, inity+15, "weed");
        this.image.setOrigin(.5, .5).setScale(.55, .55);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    spread() {
        //Determine where can spawn from this one
        //console.log("I am at " + this.gridy + " " + this.gridx);
        let newWeeds = [];
        let range = 1;
        if(this.spreader) {
            for (let row = this.gridy - range; row <= this.gridy + range; row++) {
                if (row > -1 && row < gardenGrid.length) {
                    for (let col = this.gridx - range; col <= this.gridx + range; col++) {
                        if (col > -1 && col < gardenGrid[0].length) {
                            //console.log("location: "+col+', '+row);
                            let loc = gardenGrid[row][col];
                            //If there is nothing in the plot
                            if(loc.item == null) {
                                newWeeds.push([row, col]);
                                //console.log("putting weed at: "+col+', '+row);
                            }
                        }
                    }
                }
            }
            this.spreader = false;
        }
        //Determine how many to spawn
        let toSpread = Phaser.Math.Between(1, 2);
        while(newWeeds.length > toSpread) {
            newWeeds.splice(Phaser.Math.Between(0, newWeeds.length-1), 1);
        }
        //console.log("spawn at",newWeeds);
        return newWeeds;
    }

    destroy() {
        this.image.destroy();
    }
}