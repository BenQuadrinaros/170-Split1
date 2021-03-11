class Sprinkler {
    constructor(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
    }

    watering() {
        //console.log("watering");
        for (let row = this.gridy - 2; row <= this.gridy + 2; row++) {
            if (row > -1 && row < gardenGrid.length) {
                for (let col = this.gridx - 2; col <= this.gridx + 2; col++) {
                    if (col > -1 && col < gardenGrid[0].length) {
                        //console.log("location: "+col+', '+row);
                        wateredTiles[[row, col]] = true;
                        try {
                            gardenGrid[row][col].addWater();
                            //console.log("watering flower at: "+col+', '+row+"\nwater: "+gardenGrid[row][col].water);
                        } catch(error) { null; }
                    }
                }
            }
        }
    }

    addToScene(scene, initx, inity) {
        this.image = new Phaser.GameObjects.Sprite(scene, initx, inity, "sprinkler", 0);
        scene.add.existing(this.image);
        this.image.setPosition(initx, inity);
    }

    setPos(gridx, gridy) {
        this.gridx = gridx;
        this.gridy = gridy;
    }

    destroy() {
        this.image.destroy();
    }
}