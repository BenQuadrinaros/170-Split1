class Hive extends Phaser.GameObjects.Sprite {
    constructor(scene, initx, inity, texture, frame, gridx, gridy) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        this.setPosition(initx, inity);

        this.gridx = gridx;
        this.gridy = gridy;
    }

    collect() {
        let collectedPollen = {
            "colorless": 0,
            "blue": 0,
            "purple": 0,
            "pink": 0
        };
        let totalPollen = 0;
        for (let row = this.gridy - 2; row < this.gridy + 2; row++) {
            if (row > -1 && row < gardenGrid.length) {
                for (let col = this.gridx - 2; col < this.gridx + 2; col++) {
                    if (col > -1 && col < gardenGrid[0].length) {
                        try {
                            let type = gardenGrid[row][col].getPollen();
                            if(type != "none") {
                                collectedPollen[type] += 1;
                                totalPollen += 1;
                            }
                        } catch(error) {
                            null;
                        }
                    }
                }
            }
        }
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

    isHive() {
        return true;
    }
}