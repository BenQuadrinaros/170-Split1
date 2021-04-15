class Hive {
    constructor(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
        this.type = "Beehive";
    }

    collect() {
        //console.log("hive at ",this.gridx,this.gridy);
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
                            console.log("collecting from flower at: " + col+', '+row);
                            if(type != "none") {
                                collectedPollen[type] += 1;
                                totalPollen += 1;
                            }
                        }
                    }
                }
            }
        }
        console.log("honey",collectedPollen,"and",totalPollen);
        playerVariables.inventory.honey["total"] += totalPollen;
        if (collectedPollen["colorless"] / totalPollen > .45) {
            playerVariables.inventory.honey["yellow"] += totalPollen;
        } else if ((collectedPollen["blue"] + collectedPollen["colorless"]) / totalPollen > .8) {
            playerVariables.inventory.honey["blue"] += totalPollen;
        } else if ((collectedPollen["purple"] + collectedPollen["colorless"]) / totalPollen > .8) {
            playerVariables.inventory.honey["purple"] += totalPollen;
        } else if ((collectedPollen["pink"] + collectedPollen["colorless"]) / totalPollen > .8) {
            playerVariables.inventory.honey["pink"] += totalPollen;
        } else {
            playerVariables.inventory.honey["yellow"] += totalPollen;
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