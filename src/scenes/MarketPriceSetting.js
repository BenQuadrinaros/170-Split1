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
        this.createEvents();

        if(!playerVariables.completedMarketTutorial){
            this.createTutorialDialogText();
        }    

        this.music = new BGMManager(this);
        this.music.playSong("marketMusic", true);
    }

    update(){
        this.updateCheckPause();
        this.updateCheckContinue();

        //Update info tracker
        this.infoDisplay.update(this.cameras.main.scrollX + config.width * .1, 
            this.cameras.main.scrollY + config.height * .15, 
            playerVariables.money, playerVariables.inventory.honey["total"]);

        if(!playerVariables.completedMarketTutorial && Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.currDialogSelection < 2){
                ++this.currDialogSelection;
                this.tutorialDialog.text = this.getNextDialogSection(this.currDialogSelection);
            }
            else {
                playerVariables.completedMarketTutorial = true;
                this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.spaceContinue.setVisible(false);
            }
        }
    }

    createControls(){
        //establish controls for gameplay
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    createBackgroundImages(){
        this.sky = this.add.tileSprite(config.width/2, config.height/2, 2*config.width, 2*config.height, 'marketSky').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-5);
        this.background = this.add.image(config.width / 2, config.height / 2, 'marketBackground').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-1);
        this.backgroundChalkboard = this.add.image(config.width/2, config.height/2, "chalkboard").setScale(.5,.65);
        //this.playerWealthTracker = this.add.image(config.width/2, config.height/3.5, "playerWealthTracker").setOrigin(0.5, .5);
    }
    
    createEvents() {
        //Rebinds escape
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.resumeBetweenScenes();
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        });
    }

    createText(){
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "42px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0,
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
        this.priceTitle = this.add.text(game.config.width/2, game.config.height/5.5 - 45, "PRICE", this.textConfig).setOrigin(.5, .5);
        this.textConfig.fontSize = "28px";
        this.textConfig.color = "#000000";
        this.continueText = this.add.text(config.width - 125, config.height - 50, "Continue", this.textConfig).setOrigin(0.5, 0.5).setDepth(5);
        this.continueBackground = this.add.rectangle(config.width - 125, config.height - 50, 150, 75, 0xffffff, 1).setOrigin(0.5, 0.5).setInteractive().setAlpha(0.5)
        .on("pointerover", () => {
            this.continueText.alpha = 1;
            this.continueBackground.alpha = 1;
        })
        .on("pointerout", () => {
            this.continueText.alpha = .5;
            this.continueBackground.alpha = .5;
        })
        .on("pointerdown", () => {
            this.music.pauseBetweenScenes();
            this.scene.launch("marketScene", {previousScene: "marketPriceSettingScene"});
            this.scene.stop();
        });
        this.continueText.setAlpha(.5);
        
        //Tracker for Money and total Honey
        this.infoDisplay = new InfoDisplay(this, "infoBox", 0, "MarketPriceSetting");
    }


    createPriceChanging(){
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "24px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0,
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
                    if(priceMap["yellow"] < 18.00){
                        priceMap["yellow"] += .25;
                    }
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
            this.yellowHoneyJar = this.add.image(yellowCenter - 95, yellowHeight, "honeyYellow", 0).setScale(.8);
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
                    if(priceMap["blue"] < 18.00){
                        priceMap["blue"] += .25;
                    }
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
            this.blueHoneyJar = this.add.image(blueCenter - 95, blueHeight, "honeyBlue", 0).setScale(.8);;
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
                    if(priceMap["pink"] < 18.00){
                        priceMap["pink"] += .25;
                    }
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
            this.pinkHoneyJar = this.add.image(pinkCenter - 95, pinkHeight, "honeyPink", 0).setScale(.8);;
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
                    if(priceMap["purple"] < 18.00){
                        priceMap["purple"] += .25;
                    }
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
            this.purpleHoneyJar = this.add.image(purpleCenter - 95, purpleHeight, "honeyPurple", 0).setScale(.8);;
        }
    }

    updateCheckPause(){
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.music.pauseBetweenScenes();
            this.scene.pause();
            //this.scene.launch("pauseScene", {previousScene: "marketPriceSettingScene"});
            this.scene.launch("hubPopupScene", {previousScene: "marketPriceSettingScene",
                                                    fromTutorial:false});
        }
    }

    updateCheckContinue(){
        //Check if they hit enter
        if (Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.music.pauseBetweenScenes();
            this.scene.launch("marketScene", {previousScene: "marketPriceSettingScene"});
            this.scene.stop();
        }
    }

    createTutorialDialogText(){
        this.tutorialTextBackdrop = this.add.image(0, 0, 'tutorialDialogBox')
                                            .setOrigin(0, 0).setScale(0.5);
        this.tutorialTextBackdrop.depth = 150;
        this.tutorialConfig = {
            fontFamily: font,
            fontSize: "25.5px",
            color: "#000000",
            align: "left",
            stroke: "#000000",
            strokeThickness: 1,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tutorialDialog = this.add.text(0,0, "", this.tutorialConfig);
        this.tutorialDialog.setOrigin(0, 0);
        this.tutorialDialog.depth = 200;
        this.tutorialDialog.x = this.cameras.main.scrollX + 185;
        this.tutorialDialog.y = this.cameras.main.scrollY + 3.25*config.height/5 - 25;
        this.currDialogSelection = 0;
        this.tutorialConfig.fontSize = "16px";
        this.spaceContinue = this.add.text(0, 0, "SPACE to continue", this.tutorialConfig);
        this.spaceContinue.depth = 205;
        this.spaceContinue.x = this.cameras.main.scrollX + 4*config.width/5 - 15;
        this.spaceContinue.y = this.cameras.main.scrollY + 4*config.height/5 + 35;
        
        this.tutorialDialog.text = this.getNextDialogSection(this.currDialogSelection);



        this.input.on('pointerdown', function (pointer) {
            if(this.currDialogSelection < 2){
                ++this.currDialogSelection;
                this.tutorialDialog.text = this.getNextDialogSection(this.currDialogSelection);
            }
            else {
                this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.spaceContinue.setVisible(false);
                playerVariables.completedMarketTutorial = true;
            }
        }, this);
    }

    getNextDialogSection(num){
        let text = "";
        switch(num){
            case 0:
                text =
`Welcome to the Farmer's Market! This is where you can sell
the honey we've been making.`;
                break;
            case 1:
                text = 
`I took a guess at a fair price, but I can’t say I buy honey
very often, so you might want to play around with the price a
bit and see what works. You can change your prices
whenever you like.`;
                break;
            case 2:
                text = 
`Each customer is going to be different than the one before —
some are frugal, and some have money to spare, so don’t be
surprised if customers have different reactions to the same price.
But be careful! If you have a reputation for prices that are too
high, you run the risk of driving customers away.`;
                break;
            default:
                console.log("No dialog of matching section");
        }

        return text;
    }
}