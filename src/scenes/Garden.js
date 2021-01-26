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
        this.background = this.add.image(config.width / 2, config.height / 2, "gardenBackground").setOrigin(0.5, 0.5).setScale(.5, .5);
        this.exit = this.add.image(config.width / 7, config.height / 8, "exit").setOrigin(0.5, 0.5);
        this.exit.depth = 100;

        //Create hive for bees
        this.hive = this.add.image(8 * config.width / 10 - 15, config.height/3 - 5, "hive").setOrigin(.5).setScale(.1,.1).setAlpha(0);

        //Load in Flowers
        //More randomized flower placement
        this.dirt0 = this.add.image(.125*config.width, .35*config.height, "dirt").setOrigin(0.5).setScale(.66);
        this.dirt0.depth = this.dirt0.y / 10 - 1;
        let flower0 = this.add.image(.125*config.width, .35*config.height, "flower").setOrigin(0.5).setScale(.25);
        flower0.depth = flower0.y / 10;
        this.dirt1 = this.add.image(.435*config.width, .595*config.height, "dirt").setOrigin(0.5).setScale(.66);
        this.dirt1.depth = this.dirt1.y / 10 - 1;
        let flower1 = this.add.image(.435*config.width, .595*config.height, "flower").setOrigin(0.5).setScale(.25);
        flower1.depth = flower1.y / 10;
        this.dirt2 = this.add.image(.2*config.width, .84*config.height, "dirt").setOrigin(0.5).setScale(.66);
        this.dirt2.depth = this.dirt2.y / 10 - 1;
        let flower2 = this.add.image(.2*config.width, .84*config.height, "flower").setOrigin(0.5).setScale(.25);
        flower2.depth = flower2.y / 10;
        this.dirt3 = this.add.image(.795*config.width, .84*config.height, "dirt").setOrigin(0.5).setScale(.66);
        this.dirt3.depth = this.dirt3.y / 10 - 1;
        let flower3 = this.add.image(.795*config.width, .84*config.height, "flower").setOrigin(0.5).setScale(.25);
        flower3.depth = flower3.y / 10;
        this.flowerBox = [
            flower0, flower1, flower2, flower3
        ];
        this.updateFlowerImages();

        //Create player
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 3);
        this.player.depth = this.player.y / 10;

        //Create default movement behavior of bees
        this.whatFollow = 'scout';
        //Create bool to know when scout has reached the hive
        this.beeReceived = false;
        this.scoutFinished = false;
        this.flowPath = [];

        //Create scout bee(s)
        this.swarm = [];
        let numBees = 1;                    //Single scout takes a while
        for(let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, Phaser.Math.Between(this.hive.x - 10, this.hive.x + 10),
                Phaser.Math.Between(this.hive.y - 10, this.hive.y + 10));
            temp.setOrigin(.5).setScale(.25,.25).setVisible(true);
            temp.depth = 100;
            this.swarm.push(temp);
        }

        //Create path for bees to follow
        this.path = [];
        this.path.push([this.hive.x, this.hive.y]);
        if(plants[3] > 0) {
            this.path.push([flower3.x, flower3.y - 25]);
        }
        if(plants[2] > 0) {
            this.path.push([flower2.x, flower2.y - 25]);
        }
        if(plants[0] > 0) {
            this.path.push([flower0.x, flower0.y - 25]);
        }
        if(plants[1] > 0) {
            this.path.push([flower1.x, flower1.y - 25]);
        }

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
        let flow0Text = this.add.text(this.dirt0.x, this.dirt0.y, "Press SPACE to interact",
            this.textConfig).setOrigin(0.5).setVisible(false);
        flow0Text.depth = 100;
        let flow1Text = this.add.text(this.dirt1.x, this.dirt1.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        flow1Text.depth = 100;
        let flow2Text = this.add.text(this.dirt2.x, this.dirt2.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        flow2Text.depth = 100;
        let flow3Text = this.add.text(this.dirt3.x, this.dirt3.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        flow3Text.depth = 100;
        this.flowerText = [
            flow0Text, flow1Text, flow2Text, flow3Text
        ];

    }

    update() {
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(keyESCAPE)){
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene:"gardenScene"});
        }

        //Check if the player is close to any of the flowers
        this.checkNearbyFlower(this.dirt0, 0);
        this.checkNearbyFlower(this.dirt1, 1);
        this.checkNearbyFlower(this.dirt2, 2);
        this.checkNearbyFlower(this.dirt3, 3);

        //Update all bees in the swarm
        for(let i = 0; i < this.swarm.length; i++) {
            this.swarm[i].scoutOrGather = this.whatFollow;
            this.swarm[i].flock(this.swarm, this.path, this.player);
            this.swarm[i].update();

            if(this.swarm[i].hiveNeighbors.length == this.path.length - 1 && !(this.beeReceived)){
                this.whatFollow = 'BackToHive';
                //Once it's back at the hive stop showing
                let distBackToHive = Math.abs(this.swarm[i].position.x - this.hive.x) + Math.abs(this.swarm[i].position.y - this.hive.y);

                if(distBackToHive < 10){
                    this.flowPath = this.swarm[i].hiveNeighbors;
                    this.flowPath.push([this.hive.x, this.hive.y]);
                    //here is where we make the bee disappear once it reaches the hive
                    this.clearBee();
                    this.scoutFinished = true; 
                    this.path = this.flowPath;
                }
            }

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

        this.player.update();
        this.player.depth = this.player.y / 10;
        this.updateFlowerImages();
        this.turnText.text = "Turns Remaining: " + playerVariables.turnsRemaining + "\nHoney: " + 
            playerVariables.honey + "\nMoney: " + playerVariables.money;
    }

    checkNearbyFlower(currDirt, i) {
        if (Math.abs(Phaser.Math.Distance.Between(currDirt.x, currDirt.y, this.player.x, this.player.y)) < 100) {
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

    updateFlowerImages() {
        //Determine current state of flowers
        for (let i = 0; i < plants.length; ++i) {
            this.flowerBox[i].setFrame(Math.ceil(plants[i]) + 1);
        }
    }

    clearBee(){        
        //Reset Boids
        this.swarm[0].destroy();
        this.swarm = [];
        let numBees = 5;                    //5 seems to be max for flower following to look decent
        for(let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, Phaser.Math.Between(this.hive.x - 10, this.hive.x + 10),
                Phaser.Math.Between(this.hive.y - 10, this.hive.y + 10));
            temp.setOrigin(.5).setScale(.25,.25).setVisible(true);
            temp.depth = 100;
            this.swarm.push(temp);
        }

        this.beeReceived = true;
        //console.log("Path: ", path.pointPath, "\n Neighbors: ", path.neighbors, "\n Hive Neighbors: ", path.hiveNeighbors);
        this.whatFollow = 'gather';
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