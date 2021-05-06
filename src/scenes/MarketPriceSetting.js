class MarketPriceSetting extends Phaser.Scene {
    constructor() {
        super("marketPriceSettingScene");
    }

    init(data) {
    }

    create() {
        this.createControls();
        this.createBackgroundImages();
        this.createText();
        this.createPriceChanging();

        this.music = new BGMManager(this);
        this.music.playSong("marketMusic", true);
    }

    update(){
        this.updateCheckPause();
        this.updateCheckContinue();
    }

    createControls(){
        //establish controls for gameplay
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    createBackgroundImages(){
        this.brickFenceBackground = this.add.image(config.width/2, config.height/2, "brickFence").setScale(0.5);
        this.backgroundChalkboard = this.add.image(config.width/2, config.height/2, "chalkboard").setScale(.65);
        //this.playerWealthTracker = this.add.image(config.width/2, config.height/3.5, "playerWealthTracker").setOrigin(0.5, .5);
    }

    createText(){
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "42px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        //UI texts for resources
        //this.moneyText = this.add.text(game.config.width / 2 + 15, (game.config.height /3.5) - 35, playerVariables.money, this.textConfig).setOrigin(.5, .5);
        //this.moneyText.depth = 100;
        //this.honeyText = this.add.text(game.config.width / 2 + 15, (game.config.height /3.5) + 40, playerVariables.inventory.honey["total"], this.textConfig).setOrigin(.5, .5);
        //this.honeyText.depth = 100;
        this.priceTitle = this.add.text(game.config.width/2, game.config.height/5.5 - 55, "PRICE", this.textConfig).setOrigin(.5, .5);
        this.textConfig.fontSize = "28px";
        this.continueText = this.add.text(config.width - 125, config.height - 50, "Continue", this.textConfig).setOrigin(0.5, 0.5).setDepth(5);
        this.continueBackground = this.add.rectangle(config.width - 125, config.height - 50, 150, 75, 0xffffff, .5).setOrigin(0.5, 0.5).setInteractive()
        .on("pointerover", () => {
            this.continueText.alpha = 1;
            this.continueBackground.alpha = 1;
        })
        .on("pointerout", () => {
            this.continueText.alpha = .5;
            this.continueBackground.alpha = .5;
        })
        .on("pointerdown", () => {
            this.music.stop();
            this.scene.launch("marketScene", {previousScene: "marketPriceSettingScene"});
            this.scene.stop();
        });
        this.continueText.setAlpha(.5);
    }


    createPriceChanging(){
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "24px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            lineSpacing: -1,
        };

        let typesUsed = 0;

        //Price Setting Yellow
        if(playerVariables.inventory.honey["yellow"]){
            var yellowCenter = config.width/2;
            var yellowHeight = .75 * config.height/2 - 85;
            typesUsed++; //Let other honey types know the first slot was used
            this.yellowPlus = this.add.image(yellowCenter + 130, yellowHeight, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.yellowPlus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.yellowPlus.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["yellow"] += .25;
                    //let tempPrice = priceMap["yellow"];
                    this.yellowPriceText.text = "$" + priceMap["yellow"].toFixed(2) + "\n" + playerVariables.inventory.honey["yellow"] + " jars";
                    this.yellowPlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.yellowPlus.setFrame(0);
                });
            this.yellowMinus = this.add.image(yellowCenter + 85, yellowHeight, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.yellowMinus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.yellowMinus.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["yellow"] > 0){
                        priceMap["yellow"] -= .25;
                    }
                    //tempPrice = priceMap["yellow"];
                    this.yellowPriceText.text = "$" + priceMap["yellow"].toFixed(2) + "\n" + playerVariables.inventory.honey["yellow"] + " jars";
                    this.yellowMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.yellowMinus.setFrame(0);
                });
            this.yellowPriceText = this.add.text(yellowCenter, yellowHeight,
                "$" + priceMap["yellow"].toFixed(2) + "\n" + playerVariables.inventory.honey["yellow"] + " jars", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(1);

            //Add a yellow honey jar
            this.yellowHoneyJar = this.add.image(yellowCenter - 95, yellowHeight, "honeyPlain", 0);
        }
        //Price Setting Blue
        if(playerVariables.inventory.honey["blue"]){
            var blueCenter = config.width/2;
            var blueHeight = .75 * config.height/2 - 85 + 115*typesUsed;
            typesUsed++; //Let other honey types know that a slot was used
            this.bluePlus = this.add.image(blueCenter + 130, blueHeight, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.bluePlus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.bluePlus.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["blue"] += .25;
                    this.bluePriceText.text = "$" + priceMap["blue"].toFixed(2) + "\n" + playerVariables.inventory.honey["blue"] + " jars";
                    this.bluePlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.bluePlus.setFrame(0);
                });
            this.blueMinus = this.add.image(blueCenter + 85, blueHeight, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.blueMinus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.blueMinus.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["blue"] > 0){
                        priceMap["blue"] -= .25;
                    }
                    this.bluePriceText.text = "$" + priceMap["blue"].toFixed(2) + "\n" + playerVariables.inventory.honey["blue"] + " jars";
                    this.blueMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.blueMinus.setFrame(0);
                });
            this.bluePriceText = this.add.text(blueCenter, blueHeight,
                "$" + priceMap["blue"].toFixed(2) + "\n" + playerVariables.inventory.honey["blue"] + " jars", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(1);
            //Add a blue honey jar
            this.blueHoneyJar = this.add.image(blueCenter - 95, blueHeight, "honeyBlue", 0);
        }
        //Price Setting Pink
        if(playerVariables.inventory.honey["pink"]){
            var pinkCenter = config.width/2;
            var pinkHeight = .75 * config.height/2 - 85 + 115*typesUsed;
            typesUsed++; //Let other honey types know that a slot was used
            //create plus and minus icon with events for pink price
            this.pinkPlus = this.add.image(pinkCenter + 130, pinkHeight, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.pinkPlus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.pinkPlus.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["pink"] += .25;
                    this.pinkPriceText.text = "$" + priceMap["pink"].toFixed(2) + "\n" + playerVariables.inventory.honey["pink"] + " jars";
                    this.pinkPlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.pinkPlus.setFrame(0);
                });

            this.pinkMinus = this.add.image(pinkCenter + 85, pinkHeight, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.pinkMinus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.pinkMinus.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["pink"]){
                        priceMap["pink"] -= .25;
                    }
                    this.pinkPriceText.text = "$" + priceMap["pink"].toFixed(2) + "\n" + playerVariables.inventory.honey["pink"] + " jars";
                    this.pinkMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.pinkMinus.setFrame(0);
                });
            this.pinkPriceText = this.add.text(pinkCenter, pinkHeight,
                "$" + priceMap["pink"].toFixed(2) + "\n" + playerVariables.inventory.honey["pink"] + " jars", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(1);
            //Add a pink honey jar
            this.pinkHoneyJar = this.add.image(pinkCenter - 95, pinkHeight, "honeyPink", 0);
        }
        //Price Setting Purple
        if(playerVariables.inventory.honey["purple"]){
            var purpleCenter = config.width/2;
            var purpleHeight = .75 * config.height/2 - 85 + 115*typesUsed;
            typesUsed++; //Let other honey types know that a slot was used
            this.purplePlus = this.add.image(purpleCenter + 130, purpleHeight, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.purplePlus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.purplePlus.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["purple"] += .25;
                    this.purplePriceText.text = "$" + priceMap["purple"].toFixed(2) + "\n" + playerVariables.inventory.honey["purple"] + " jars";
                    this.purplePlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.purplePlus.setFrame(0);
                });

            this.purpleMinus = this.add.image(purpleCenter + 85, purpleHeight, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.5, .5).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.purpleMinus.alpha = 1;
                })
                .on("pointerout", () => {
                    this.purpleMinus.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["purple"] > 0){
                        priceMap["purple"] -= .25;
                    }
                    this.purplePriceText.text = "$" + priceMap["purple"].toFixed(2) + "\n" + playerVariables.inventory.honey["purple"] + " jars";
                    this.purpleMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.purpleMinus.setFrame(0);
                });
            //default purple price
            this.purplePriceText = this.add.text(purpleCenter, purpleHeight,
                "$" + priceMap["purple"].toFixed(2) + "\n" + playerVariables.inventory.honey["purple"] + " jars", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(.9);
            //Add a purple honey jar
            this.purpleHoneyJar = this.add.image(purpleCenter - 95, purpleHeight, "honeyPurple", 0);
        }
    }

    updateCheckPause(){
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene: "marketPriceSettingScene"});
        }
    }

    updateCheckContinue(){
        //Check if they hit enter
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.launch("marketScene", {previousScene: "marketPriceSettingScene"});
            this.scene.stop();
        }
    }
}