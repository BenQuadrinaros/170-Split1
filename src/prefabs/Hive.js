class Hive {
    constructor(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.type = "Beehive";
        this.stock = {
            "yellow": 0,
            "blue": 0,
            "purple": 0,
            "pink": 0
        };
        this.weeksSinceCollection = 0;
        this.honeyIndicator = null; //scene.add.ellipse(initx, inity + 40, config.width / 10, config.height / 10, 0xE5A515);
        //this.honeyIndicator.alpha = 0;
    }

    collect() {
        //console.log("hive at ",this.gridx,this.gridy);
        this.weeksSinceCollection++;
        let collectedPollen = {
            "colorless": 0,
            "blue": 0,
            "purple": 0,
            "pink": 0
        };
        let totalPollen = 0;
        for (let row = this.gridy - 2; row <= this.gridy + 2; row++) {
            if (row > -1 && row < gardenGrid.length) {
                for (let col = this.gridx - 2; col <= this.gridx + 2; col++) {
                    if (col > -1 && col < gardenGrid[0].length) {
                        //console.log("location: "+col+', '+row);
                        let loc = gardenGrid[row][col];
                        if(loc.item instanceof Flower) {
                            let type = loc.item.getPollen();
                            //console.log("collecting good pollen from flower at: " + col+', '+row);
                            if(type [0] > 0) {
                                collectedPollen[type[1]] += type[0];
                                totalPollen += type[0];
                            }
                        }
                    }
                }
            }
        }
        //console.log("honey",collectedPollen,"and",totalPollen);
        totalPollen = Math.max(totalPollen, 0);  //Make sure you cannot lose honey
        let honeyProduced = Math.sqrt(totalPollen);
        if (collectedPollen["colorless"] / totalPollen > .45) {
            this.stock["yellow"] += honeyProduced;
        } else if ((collectedPollen["blue"] + collectedPollen["colorless"]) / totalPollen > .74) {
            this.stock["blue"] += honeyProduced;
        } else if ((collectedPollen["purple"] + collectedPollen["colorless"]) / totalPollen > .74) {
            this.stock["purple"] += honeyProduced;
        } else if ((collectedPollen["pink"] + collectedPollen["colorless"]) / totalPollen > .74) {
            this.stock["pink"] += honeyProduced;
        } else {
            this.stock["yellow"] += honeyProduced;
        }

        if(this.hasStock() && (this.honeyIndicator !== null)) {
            console.log("Setting honey indicator to not be transparent");
            //this.honeyIndicator = scene.add.ellipse(initx, inity + 40, config.width / 10, config.height / 10, 0xE5A515);
            this.honeyIndicator.alpha = .75;
        } else{
            if(!this.hasStock()){
                console.log("this.beehive does not have stock or");
            }
            else if(!(this.honeyIndicator !== null)){
                console.log("honey indicator is null");
            }
            else{
                console.log("no fucking clue");
            }
        }
    }

    hasStock() {
        for(let pollen in this.stock) {
            if(this.stock[pollen] >= 1) { return true; }
        }
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity + 15, "hive", 0);
        this.image.setOrigin(.5, .5).setScale(.25, .25);
        this.image.depth = this.image.y/10 - 3;
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
        return this.image;
    }

    setPos(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
    }

    destroy() {
        this.image.destroy();
    }
}