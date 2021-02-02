class Garden extends Phaser.Scene {
    constructor() {
        super("gardenScene");
    }

    create() {
        //Setting controls
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Create Images
        //this.background = this.add.image(config.width / 2, config.height / 2, "gardenBackground").setOrigin(0.5, 0.5).setScale(.5, .5);
        this.exit = this.add.image(config.width / 7, config.height / 8, "exit").setOrigin(0.5, 0.5);
        this.exit.depth = 100;

        //Load in Flowers
        //More randomized flower placement
        /*
        this.dirt0 = this.add.image(.125*config.width, .35*config.height, "dirt").setOrigin(0.5).setScale(.66);
        this.dirt0.depth = this.dirt0.y / 10 - 1;
        let flower0 = this.add.image(.125*config.width, .35*config.height, "flower").setOrigin(0.5).setScale(.25);
        flower0.depth = flower0.y / 10;
        this.updateFlowerImages();
        */
        this.inScene = [
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null],
            [null, null, null, null, null, null, null, null, null, null]
        ];
        this.path = [];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                if (gardenGrid[row][col] == null) {
                    this.inScene[row][col] = new Hive(this, (1 + col) * game.config.width / 11, (1 + row) * (game.config.height - 50) /
                        10, "dirt", 0, row, col);
                } else if (gardenGrid[row][col][0] == "hive") {
                    this.inScene[row][col] = new Hive(this, (1 + col) * game.config.width / 11, (1 + row) * (game.config.height - 50) /
                        10 + 50, "hive", 0, row, col);
                    this.inScene[row][col].setScale(.1, .1);
                } else if (gardenGrid[row][col][0] == "flower") {
                    this.inScene[row][col] = new Flower(this, (1 + col) * game.config.width / 11, (1 + row) * (game.config.height - 50) /
                        10 + 50, "flower", 0, row, col, gardenGrid[row][col][1], gardenGrid[row][col][2]);
                    this.path.push([(1 + col) * game.config.width / 11, (1 + row) * (game.config.height - 50) / 10 + 50]);
                    this.inScene[row][col].setScale(.25, .25);
                }
            }
        }

        //creat bee swarm for simulated pollination
        this.swarm = [];
        let numBees = 5;                    //5 seems to be max for flower following to look decent
        for (let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, game.config.width/2,game.config.height/2);
            temp.setOrigin(.5).setScale(.25, .25).setVisible(true);
            temp.depth = 100;
            this.swarm.push(temp);
        }

        //Create player
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 3);
        this.player.depth = this.player.y / 10;

        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: "Courier",
            fontSize: "14px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        //Create Text
        this.turnText = this.add.text(game.config.width / 2, game.config.height / 12, "Turns Remaining: ",
            this.textConfig).setOrigin(.5);
        this.turnText.depth = 100;
        this.fadeMessage = this.add.text(this.player.x, this.player.y, "Nada", this.textConfig).setOrigin(0.5).setVisible(false);
        this.fadeMessage.depth = 100;
        this.exitText = this.add.text(this.exit.x, this.exit.y, "Press SPACE to return to the cave",
            this.textConfig).setOrigin(0.5).setVisible(false);
        this.exitText.depth = 101;
        let flowerText = this.add.text(0, 0, "Press SPACE to interact",
            this.textConfig).setOrigin(0.5).setVisible(false);
        flowerText.depth = 100;

        //Have player move towards the mouse on pointer down
        this.input.on('pointerdown', function (pointer) {

            if (pointer.isDown) {
                this.player.moveTo(pointer.x, pointer.y);
            }

        }, this);

    }

    update() {
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", { previousScene: "gardenScene" });
        }

        //Update all bees in the swarm
        for (let i = 0; i < this.swarm.length; i++) {
            this.swarm[i].flock(this.swarm, this.path, this.player);
            this.swarm[i].update();
        }

        //Check if player is close to the exit
        if (Math.abs(Phaser.Math.Distance.Between(this.exit.x, this.exit.y, this.player.x, this.player.y)) < 50) {
            this.exitText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //-1 to indicate that it just left the hub
                //this.music.stop();
                this.scene.start('hubScene', { wasVisiting: "garden" });
            }
        } else {
            this.exitText.setVisible(false);
        }
        
        //Place flower text over nearest spot for interaction

        this.player.update();
        this.player.depth = this.player.y / 10;
        this.turnText.text = "Turns Remaining: " + playerVariables.turnsRemaining + "\nHoney: " +
            playerVariables.honey + "\nMoney: " + playerVariables.money;
    }

    checkNearbyFlower(currDirt, i) {
        if (Math.abs(Phaser.Math.Distance.Between(currDirt.x, currDirt.y, this.player.x, this.player.y)) < 45) {
            //If the flower isnt purchased or is dead
            if (plants[i] == -1 || plants[i] == 0) {
                this.flowerText[i].text = "'SPACE' to buy a new flower\nCost: $6";
            } else {
                this.flowerText[i].text = "'SPACE' to water flower";
            }
            this.flowerText[i].x = currDirt.x;
            this.flowerText[i].y = currDirt.y;
            this.flowerText[i].setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //If the plant is not purchased
                if (plants[i] == -1 || plants[i] == 0) {
                    //if the player has sufficient funds
                    if (playerVariables.money >= 6 && this.turnsRemaining >= 1) {
                        playerVariables.money -= 6;
                        plants[i] = 3;
                        playerVariables.turnsRemaining -= 1;
                        this.path.push([currDirt.x, currDirt.y - 25]);
                        this.fadeText("Congratulations! You have a\nnew flower for your garden")
                    }
                    //else if not enough actions
                    else if (playerVariables.turnsRemaining < 1) {
                        this.fadeText("You have insufficient actions.");
                    }
                    else {
                        this.fadeText("You cannot afford another flower");
                    }
                }
                else {
                    if (playerVariables.turnsRemaining >= 1) {
                        plants[i] = Math.min(3, plants[i] + 1);
                        playerVariables.turnsRemaining -= 1;
                        if (plants[i] == 3) {
                            this.fadeText("Your flower looks perfectly healthy");
                            this.updateFlower()
                        } else if (plants[i] > 1) {
                            this.fadeText("Your flower could use more attention");
                        } else {
                            this.fadeText("This flower will die soon");
                        }
                    }
                    else {
                        this.fadeText("You have insufficient actions");
                    }
                }

            }
        } else {

            this.flowerText[i].setVisible(false);
        }
    }

    updateFlower(flower, x, y) {
        //Update image at that spot along with the logic for both this scene and the main variable
        
    }

    fadeText(message) {
        if (this.fadeTimer != null) {
            this.fadeTimer.callback = () => { };
            this.fadeTimer.delay = 0;
            this.fadeTimer = null;
        }
        this.fadeMessage.x = this.player.x;
        this.fadeMessage.y = this.player.y;
        this.fadeMessage.text = message;
        this.fadeMessage.setVisible(true);
        this.fadeTimer = this.time.addEvent({
            delay: 2500,
            callback: () => {
                this.fadeMessage.setVisible(false);
                this.fadeTimer = null;
            },
            loop: false,
            callbackScope: this
        });
    }
}