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

        this.load.image("grass", "./assets/baseGrass-01.png");
        this.load.image("exit", "./assets/LeftArrowGREEN.png");
        this.load.image("dirt", "./assets/intialDirt.png");
        this.load.image("hive", "./assets/hubHive.png");
        this.load.spritesheet('flower', './assets/tempFlower1.png', { frameWidth: 128, frameHeight: 128, startFrame: 0, endFrame: 4 });

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
        this.background = this.add.image(config.width / 2, config.height / 4, "grass").setOrigin(0.5, 0.5);
        this.exit = this.add.image(config.width / 7, config.height / 8, "exit").setOrigin(0.5, 0.5);

        //Create hive for bees
        this.hive = this.add.image(config.width - 75, config.height - 75, "hive").setOrigin(.5).setScale(.15,.15);

        //Load in Flowers
        let flowerPadding = 200; //distance between flowers

        this.dirt0 = this.add.image(flowerPadding, flowerPadding, "dirt").setOrigin(0.5);
        let flower0 = this.add.image(flowerPadding, flowerPadding, "flower").setOrigin(0.5);
        this.dirt1 = this.add.image(2 * flowerPadding, flowerPadding, "dirt").setOrigin(0.5);
        let flower1 = this.add.image(2 * flowerPadding, flowerPadding, "flower").setOrigin(0.5);
        this.dirt2 = this.add.image(flowerPadding, 2 * flowerPadding, "dirt").setOrigin(0.5);
        let flower2 = this.add.image(flowerPadding, 2 * flowerPadding, "flower").setOrigin(0.5);
        this.dirt3 = this.add.image(2 * flowerPadding, 2 * flowerPadding, "dirt").setOrigin(0.5);
        let flower3 = this.add.image(2 * flowerPadding, 2 * flowerPadding, "flower").setOrigin(0.5);
        this.flowerBox = [
            flower0, flower1, flower2, flower3
        ];
        this.updateFlowerImages();

        //Create player
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 3);

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