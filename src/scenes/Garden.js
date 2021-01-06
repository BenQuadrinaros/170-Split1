class Garden extends Phaser.Scene {
    constructor() {
        super("gardenScene");
    }

    init(data) {
        this.honey = data.currentHoney;
        this.money = data.currentMoney;
        this.turnsRemaining = data.turnsRemaining;
        //if any are undefined, give a default value

    }

    preload() {
        //Load images and spritesheets

        //Used for AI testing
        this.load.spritesheet('player', './assets/bearFrontBack.png', {frameWidth:40, frameHeight:72, startFrame:0, endFrame:1});
        this.money = 25;
        this.honey = 15;
        this.turnsRemaining = 3;

        this.load.image("gardenBackground", "./assets/sampleGarden-01.png");
        this.load.image("exit", "./assets/LeftArrowGREEN.png");
        this.load.image("dirt", "./assets/dirt-04.png");
        this.load.image("hive", "./assets/hubHive.png");
        this.load.spritesheet('flower', './assets/flowerStages.png', { frameWidth: 407, frameHeight: 456, startFrame: 0, endFrame: 4 });
        this.load.image("bee", "./assets/bearBee.png");

    }

    create() {
        //Setting controls
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Create Images
        this.background = this.add.image(config.width / 2, config.height / 2, "gardenBackground").setOrigin(0.5, 0.5).setScale(.5, .5);
        this.exit = this.add.image(config.width / 7, config.height / 8, "exit").setOrigin(0.5, 0.5);

        //Create hive for bees
        this.hive = this.add.image(config.width -75, config.height/3, "hive").setOrigin(.5).setScale(.15,.15).setAlpha(0);

        //Load in Flowers
        //More randomized flower placement
        this.dirt0 = this.add.image(.125*config.width, .35*config.height, "dirt").setOrigin(0.5).setScale(.66);
        let flower0 = this.add.image(.125*config.width, .35*config.height, "flower").setOrigin(0.5).setScale(.25);
        this.dirt1 = this.add.image(.435*config.width, .595*config.height, "dirt").setOrigin(0.5).setScale(.66);
        let flower1 = this.add.image(.435*config.width, .595*config.height, "flower").setOrigin(0.5).setScale(.25);
        this.dirt2 = this.add.image(.2*config.width, .84*config.height, "dirt").setOrigin(0.5).setScale(.66);
        let flower2 = this.add.image(.2*config.width, .84*config.height, "flower").setOrigin(0.5).setScale(.25);
        this.dirt3 = this.add.image(.795*config.width, .84*config.height, "dirt").setOrigin(0.5).setScale(.66);
        let flower3 = this.add.image(.795*config.width, .84*config.height, "flower").setOrigin(0.5).setScale(.25);
        this.flowerBox = [
            flower0, flower1, flower2, flower3
        ];
        this.updateFlowerImages();

        //Create player
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 3);

        //Create default movement behavior of bees
        this.whatFollow = 'scout';

        //Create bool to know when scout has reached the hive
        this.beeReceived = false;

        this.scoutFinished = false;

        this.flowPath = [];

        //Create bees
        this.swarm = [];
        let numBees = 1;                    //5 seems to be max for flower following to look decent
        for(let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bee', 0, Phaser.Math.Between(this.hive.x - 10, this.hive.x + 10),
                Phaser.Math.Between(this.hive.y - 10, this.hive.y + 10)).setOrigin(.5).setScale(.25,.25).setVisible(true);
            temp.depth = 10;
            this.swarm.push(temp);
        }

        //Create path for bees to follow
        this.path = [];
        this.path.push([this.hive.x - 25, this.hive.y + 15]);
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
        this.turnText = this.add.text(game.config.width / 2, game.config.height / 12, "Turns Remaining: ", this.textConfig).setOrigin(.5);
        this.fadeMessage = this.add.text(this.player.x, this.player.y, "Nada", this.textConfig).setOrigin(0.5).setVisible(false);
        this.exitText = this.add.text(this.exit.x, this.exit.y, "Press SPACE to return to the cave", this.textConfig).setOrigin(0.5).setVisible(false);
        let flow0Text = this.add.text(this.dirt0.x, this.dirt0.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        let flow1Text = this.add.text(this.dirt1.x, this.dirt1.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        let flow2Text = this.add.text(this.dirt2.x, this.dirt2.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        let flow3Text = this.add.text(this.dirt3.x, this.dirt3.y, "Press SPACE to interact", this.textConfig).setOrigin(0.5).setVisible(false);
        this.flowerText = [
            flow0Text, flow1Text, flow2Text, flow3Text
        ];

    }

    update() {
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
                let distBackToHive = Math.abs(this.swarm[i].position.x - 540) + Math.abs(this.swarm[i].position.y - 420);

                if(distBackToHive < 10){
                    this.flowPath = this.swarm[i].hiveNeighbors;
                    this.flowPath.push([540, 420]);
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
                this.scene.start('hubScene', { wasVisiting: "garden", turnsRemaining: this.turnsRemaining, currentHoney: this.honey, currentMoney: this.money });
            }
        } else {

            this.exitText.setVisible(false);
        }

        this.player.update();
        this.updateFlowerImages();
        this.turnText.text = "Turns Remaining: " + this.turnsRemaining + "\nHoney: " + this.honey + "\nMoney: " + this.money;
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
                    if (this.money >= 6 && this.turnsRemaining >= 1) {
                        this.money -= 6;
                        plants[i] = 3;
                        this.turnsRemaining -= 1;
                        this.path.push([currDirt.x, currDirt.y - 25]);
                        this.fadeText("Congratulations! You have a\nnew flower for your garden")
                    }
                    //else if not enough actions
                    else if (this.turnsRemaining < 1) {
                        this.fadeText("You have insufficient actions.");
                    }
                    else {
                        this.fadeText("You cannot afford another flower");
                    }
                } 
                else {
                    if (this.turnsRemaining >= 1) {
                        plants[i] = Math.min(3, plants[i] + 1);
                        this.turnsRemaining -= 1;
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
            let temp = new Bee(this, 'bee', 0, Phaser.Math.Between(this.hive.x - 10, this.hive.x + 10),
                Phaser.Math.Between(this.hive.y - 10, this.hive.y + 10)).setOrigin(.5).setScale(.25,.25).setVisible(true);
            temp.depth = 10;
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