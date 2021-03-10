class Market extends Phaser.Scene {
    constructor() {
        super("marketScene");
    }

    init(data) {
    }

    create() {
        previousScene = this;
        this.sold = false;
        this.cameras.main.setBackgroundColor(0x000000);
        //REPLACE with actual background
        //this.background = this.add.image(config.width / 2, config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        //background
        this.background = this.add.image(config.width / 2, config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        //bike propped up on stand
        this.bike = this.add.image(game.config.width / 6, 8 * game.config.height / 10, 'bike');
        this.bike.setOrigin(.5, .5).setScale(.75, .75);
        this.bike.depth = 75;

        //stand for visual space
        this.stand = this.add.image(game.config.width / 2, game.config.height / 2, 'booth');
        this.stand.setOrigin(.5, .5).setScale(.675, .675);
        this.stand.depth = 95;
        this.cloth = this.add.image(game.config.width / 2, 6 * game.config.height / 10, 'cloth');
        this.cloth.setOrigin(.5, .5).setScale(.675, .675);
        this.cloth.depth = 98;

        //populate in jars of honey
        this.yellowStock = [];
        for (let i = 0; i < Math.min(20, playerVariables.inventory.honey["yellow"]); i++) {
            let temp = this.add.image(game.config.width - ((i % 10 + 1) * game.config.width / 22) +
                15 * Math.floor(i / 10), 62 * game.config.height / 100 + 15 * Math.floor(i / 10),
                "honeyPlain");
            temp.setOrigin(.5, .5).setScale(.675, .675);
            temp.depth = 97;
            this.yellowStock.push(temp);
        }
        this.blueStock = [];
        for (let i = 0; i < Math.min(10, playerVariables.inventory.honey["blue"]); i++) {
            let temp = this.add.image(((i % 5 + 1) * game.config.width / 22) -
                15 * Math.floor(i / 5), 62 * game.config.height / 100 + 15 * Math.floor(i / 5),
                "honeyBlue");
            temp.setOrigin(.5, .5).setScale(.675, .675);
            temp.depth = 97;
            this.blueStock.push(temp);
        }
        this.purpleStock = [];
        for (let i = 0; i < Math.min(20, playerVariables.inventory.honey["purple"]); i++) {
            let temp = this.add.image(game.config.width - ((i + 1) * game.config.width / 22),
                79 * game.config.height / 100, "honeyPurple");
            temp.setOrigin(.5, .5).setScale(.675, .675);
            temp.depth = 97;
            this.purpleStock.push(temp);
        }
        this.pinkStock = [];
        for (let i = 0; i < Math.min(20, playerVariables.inventory.honey["pink"]); i++) {
            let temp = this.add.image(game.config.width - ((i + 1) * game.config.width / 22),
                93 * game.config.height / 100, "honeyPink");
            temp.setOrigin(.5, .5).setScale(.675, .675);
            temp.depth = 97;
            this.pinkStock.push(temp);
        }

        //bear in costume selling honey
        this.bear = this.add.sprite(game.config.width / 2.5, 7 * game.config.height / 10, 'player', 0);
        this.bear.setOrigin(.5, .5).setScale(2.5, 2.5);
        this.bear.depth = 99;

        //Create player idle animation
        this.anims.create({
            key: 'playerBackIdle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 2
        });
        this.bear.anims.play('playerBackIdle', true);

        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "18px",
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
        this.honeyText = this.add.text(game.config.width / 8, game.config.height / 8 - 25, "Honey: ", this.textConfig).setOrigin(.5, .5);
        this.honeyText.depth = 100;
        this.moneyText = this.add.text(game.config.width / 8, game.config.height / 8, "Money: ", this.textConfig).setOrigin(.5, .5);
        this.moneyText.depth = 100;
        this.timeText = this.add.text(game.config.width / 8, game.config.height / 8 + 25, "Time Remaining: ", this.textConfig).setOrigin(.5, .5);
        this.timeText.depth = 100;
        this.timeUpText = this.add.text(game.config.width / 8, game.config.height / 8 - 25,
            "TIME'S UP\nPress Down to sleep\nand end the day", this.textConfig).setOrigin(.5, .5);
        this.timeUpText.depth = 100;
        this.timeUpText.alpha = 0;
        this.timeUp = false;

        //UI text for transactions
        this.transactionText = this.add.text(6 * game.config.width / 8, game.config.height / 2, "Hi! I want honey.",
            this.textConfig).setOrigin(.5, .5);
        this.transactionText.depth = 100;
        this.transactionText.alpha = 0;

        //Price Setting Yellow
        this.yellowPlus = this.add.image(config.width / 5, 1.25 * config.height / 5, 'greenPlus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.yellowPlus.alpha = 1;
                this.yellowPriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.yellowPlus.alpha = .5;
                this.yellowPriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["yellow"] += .25;
                this.yellowPriceText.text = "\tYellow\n" + "\t" + priceMap["yellow"] + "$/Jar";
            });
        this.yellowMinus = this.add.image((config.width / 5) - 150, 1.25 * config.height / 5, 'redMinus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.yellowMinus.alpha = 1;
                this.yellowPriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.yellowMinus.alpha = .5;
                this.yellowPriceText.alpha = .5;

            })
            .on("pointerdown", () => {
                priceMap["yellow"] -= .25;
                this.yellowPriceText.text = "\tYellow\n" + "\t" + priceMap["yellow"] + "$/Jar";
            });
        this.yellowPriceText = this.add.text((config.width / 5) - 75, 1.25 * config.height / 5,
            "\tYellow\n" + "\t" + priceMap["yellow"] + "$/Jar", this.textConfig)
            .setOrigin(.5, .5).setDepth(100).setAlpha(.5);

        //Price Setting Blue
        this.bluePlus = this.add.image(config.width / 5, 1.75 * config.height / 5, 'greenPlus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.bluePlus.alpha = 1;
                this.bluePriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.bluePlus.alpha = .5;
                this.bluePriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["blue"] += .25;
                this.bluePriceText.text = "\tBlue\n" + "\t" + priceMap["blue"] + "$/Jar";
            });
        this.blueMinus = this.add.image((config.width / 5) - 150, 1.75 * config.height / 5, 'redMinus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.blueMinus.alpha = 1;
                this.bluePriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.blueMinus.alpha = .5;
                this.bluePriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["blue"] -= .25;
                this.bluePriceText.text = "\tBlue\n" + "\t" + priceMap["blue"] + "$/Jar";
            });
        this.bluePriceText = this.add.text((config.width / 5) - 75, 1.75 * config.height / 5,
            "Blue\n" + "\t" + priceMap["blue"] + "$/Jar", this.textConfig)
            .setOrigin(.5, .5).setDepth(100).setAlpha(.5);

        //Price Setting Pink
        //create plus and minus icon with events for pink price
        this.pinkPlus = this.add.image(config.width / 5, 2.25 * config.height / 5, 'greenPlus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.pinkPlus.alpha = 1;
                this.pinkPriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.pinkPlus.alpha = .5;
                this.pinkPriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["pink"] += .25;
                this.pinkPriceText.text = "\tPink\n" + "\t" + priceMap["pink"] + "$/Jar";
            });

        this.pinkMinus = this.add.image((config.width / 5) - 150, 2.25 * config.height / 5, 'redMinus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.pinkMinus.alpha = 1;
                this.pinkPriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.pinkMinus.alpha = .5;
                this.pinkPriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["pink"] -= .25;
                this.pinkPriceText.text = "\tPink\n" + "\t" + priceMap["pink"] + "$/Jar";
            });
        this.pinkPriceText = this.add.text((config.width / 5) - 75, 2.25 * config.height / 5,
            "Pink\n" + "\t" + priceMap["pink"] + "$/Jar", this.textConfig)
            .setOrigin(.5, .5).setDepth(100).setAlpha(.5);

        //Price Setting Purple
        this.purplePlus = this.add.image(config.width / 5, 2.75 * config.height / 5, 'greenPlus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.purplePlus.alpha = 1;
                this.purplePriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.purplePlus.alpha = .5;
                this.purplePriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["purple"] += .25;
                this.purplePriceText.text = "\tPurple\n" + "\t" + priceMap["purple"] + "$/Jar";
            });

        this.purpleMinus = this.add.image((config.width / 5) - 150, 2.75 * config.height / 5, 'redMinus', 0)
            .setOrigin(.5, .5).setDepth(100).setScale(.125, .125).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.purpleMinus.alpha = 1;
                this.purplePriceText.alpha = 1;
            })
            .on("pointerout", () => {
                this.purpleMinus.alpha = .5;
                this.purplePriceText.alpha = .5;
            })
            .on("pointerdown", () => {
                priceMap["purple"] -= .25;
                this.purplePriceText.text = "\tPurple\n" + "\t" + priceMap["purple"] + "$/Jar";
            });
        //default purple price
        this.purplePriceText = this.add.text((config.width / 5) - 75, 2.75 * config.height / 5,
            "Purple\n" + "\t" + priceMap["purple"] + "$/Jar", this.textConfig)
            .setOrigin(.5, .5).setDepth(100).setAlpha(.5);

        //establish controls for gameplay
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        //background music for the hub
        //CHNAGE SONG FOR MARKET
        this.music = new BGMManager(this);
        this.music.playSong("marketMusic", true);
        this.music.setVolume(config.volume);

        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.setVolume(config.volume);
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        });

        //Start the timer for the selling portion
        this.timer = this.time.addEvent({
            delay: 90000,
            callback: () => {
                this.honeyText.alpha = 0;
                this.moneyText.alpha = 0;
                this.timeText.alpha = 0;
                this.timeUpText.alpha = 1;
                this.timeUp = true;
            },
            loop: false,
            callbackScope: this
        });
        this.state = "waiting";
    }

    update() {
        //update text UIs
        this.moneyText.text = "Money: $" + Math.floor(playerVariables.money) + "." + Math.floor(playerVariables.money * 10) % 10 +
            Math.floor(playerVariables.money * 100) % 10;
        this.honeyText.text = "Honey: " + playerVariables.inventory.honey.total;
        let currTime = Math.floor((this.timer.delay - this.timer.getElapsed()) / 1000);
        this.timeText.text = "Time Remaining: " + Math.floor(currTime / 60) + ":" + Math.floor((currTime % 60) / 10) + currTime % 10;


        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene: "marketScene"});
        }
        if (this.timeUp) {
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                //Go to hub and start next day
                this.music.transitionSong("bedtimeMusic", false);
                this.cameras.main.fadeOut(3000, 0, 0, 0);
                this.time.delayedCall(8000, () => {
                    this.music.stop();
                    this.scene.start('hubScene', {previousScene: "marketScene"});
                });
            }
        } else {
            if (this.state == "waiting") { //Patrons come and go

                //Constant bear hustle
                this.bear.x += .25 * Math.sin(currTime / 2);
                this.bear.y += .1 * Math.sin(currTime / 4 + 1);

                if (playerVariables.inventory.honey.total > 0 && Phaser.Math.Between(0, 1000) > 985) {
                    this.state = "approaching";
                    this.npc = new NPC(this, 2 * game.config.width / 3, 4 * game.config.height / 7, 'basicDogNPC',
                        0, "Bagel", "easy", [["Hullo", "Good day"], ["Thanks", "Bye"]]);
                    this.closeness = .1;
                    this.npc.depth = 0;
                    this.npc.setScale(this.closeness, this.closeness);
                    //play walk up animation
                    this.time.addEvent({
                        delay: 1500,
                        callback: () => {
                            this.state = "bargaining";
                            //determine what type of honey to buy
                            //proportions depend on how much of each you have
                            let rand = Math.random();
                            rand -= playerVariables.inventory.honey["yellow"] / playerVariables.inventory.honey.total;
                            if (rand > 0) {
                                rand -= playerVariables.inventory.honey["blue"] / playerVariables.inventory.honey.total;
                                if (rand > 0) {
                                    rand -= playerVariables.inventory.honey["purple"] / playerVariables.inventory.honey.total;
                                    if (rand > 0) {
                                        this.typeToBuy = "pink"
                                    } else {
                                        this.typeToBuy = "purple";
                                    }
                                } else {
                                    this.typeToBuy = "blue";
                                }
                            } else {
                                this.typeToBuy = "yellow";
                            }
                            //Could be a call to NPC characteristics
                            this.npcAmount = 1;
                            let random = Math.random();
                            if(random > .9) {
                                this.npcAmount = Math.min(3, playerVariables.inventory.honey[this.typeToBuy]);
                            } else if(random > .65) {
                                this.npcAmount = Math.min(2, playerVariables.inventory.honey[this.typeToBuy]);
                            }
                            this.npcPrice = 0;
                            if (this.typeToBuy == "yellow") {
                                //yellow price range $2 - $4, average $3
                                this.npcPrice = (1.5 + Phaser.Math.FloatBetween(.25, 1.5) + Phaser.Math.FloatBetween(.25, 1))
                                    * this.npcAmount;
                            } else {
                                //non-yellow price range $3 - $7, average $5
                                this.npcPrice = (2 + Phaser.Math.FloatBetween(.5, 3) + Phaser.Math.FloatBetween(.5, 2))
                                    * this.npcAmount;
                            }
                            this.transactionText.text = this.npc.name + ": " + this.npc.voiceLines[0][Phaser.Math.Between(0,
                                this.npc.voiceLines[0].length - 1)] + "\nI would like to buy " + this.npcAmount +
                                " jars\nof " + this.typeToBuy + " honey for $" + Math.floor(this.npcPrice) + "." +
                                Math.floor((this.npcPrice * 10) % 10) + Math.floor((this.npcPrice * 100) % 10) +
                                "\n[Y]es  /   [N]o";
                        },
                        loop: false,
                        callbackScope: this
                    });
                } else if (playerVariables.inventory.honey.total <= 0) {
                    this.timer.delay = 0;
                }
            } else if (this.state == "approaching") { //NPC approaches the stand

                //Constant bear wiggle
                this.bear.x += .25 * Math.sin(currTime / 2);
                this.bear.y += .1 * Math.sin(currTime / 4 + 1);

                this.closeness += .01;
                this.npc.setScale(this.closeness, this.closeness);
                this.depth = this.closeness / .05;
            } else if (this.state == "bargaining") { //Ask for honey at price
                if (!dialogActive) {
                    dialogActive = true;
                    dialogGlobal = this.cache.json.get('dialog');
                    this.exchange = this.priceRange(this.npcAmount, this.npcPrice);
                }
            } else if (this.state == "leaving") {
                //Constant bear wiggle
                this.bear.x += .25 * Math.sin(currTime / 2);
                this.bear.y += .1 * Math.sin(currTime / 4 + 1);

                this.closeness -= .01;
                this.npc.setScale(this.closeness, this.closeness);
                this.depth = this.closeness / .05;
            }
        }
        if (dialogEnded){
            dialogEnded = false;
            if (sellChoice === "no"){
                dialogActive = false;
                this.state = "leaving";
                this.time.addEvent({
                    delay: 1500,
                    callback: () => {
                        this.npc.destroy();
                        this.state = "waiting";
                    },
                    loop: false,
                    callbackScope: this
                });
                sellChoice = undefined;
            } else {
                if (this.sold) {
                    dialogActive = false;
                    this.state = "leaving";
                    playerVariables.money += Math.floor(this.exchange * 100) / 100;
                    console.log(this.npcAmount)
                    this.reduceStock(this.typeToBuy, this.npcAmount);
                    this.time.addEvent({
                        delay: 1500,
                        callback: () => {
                            this.npc.destroy();
                            this.state = "waiting";
                        },
                        loop: false,
                        callbackScope: this
                    });
                } else {
                    if (sellChoice === "yes") {
                        sellChoice = undefined;
                        this.time.addEvent({
                            delay: 3000,
                            callback: () => {
                                console.log("yes im lowering the price")
                                this.exchange = this.priceRange(this.npcAmount, this.npcPrice);
                            }
                        });
                    }
                }
            }

        }
    }

    reduceStock(type, amount) {
        playerVariables.inventory.honey.total -= amount;
        if (type == "yellow") {
            playerVariables.inventory.honey["yellow"] -= amount;
            while (this.yellowStock.length > playerVariables.inventory.honey["yellow"]) {
                this.yellowStock.pop().destroy();
            }
        } else if (type == "blue") {
            playerVariables.inventory.honey["blue"] -= amount;
            while (this.blueStock.length > playerVariables.inventory.honey["blue"]) {
                this.blueStock.pop().destroy();
            }
        } else if (type == "purple") {
            playerVariables.inventory.honey["purple"] -= amount;
            while (this.purpleStock.length > playerVariables.inventory.honey["purple"]) {
                this.purpleStock.pop().destroy();
            }
        } else {
            playerVariables.inventory.honey["pink"] -= amount;
            while (this.pinkStock.length > playerVariables.inventory.honey["pink"]) {
                this.pinkStock.pop().destroy();
            }
        }
    }

    priceRange(amt, proposedPrice) {
        console.log(`${amt} at price of ${proposedPrice}`)
        //Prices moved to global
        let setPrice = amt * priceMap[this.typeToBuy]
        console.log("transaction price = "+setPrice);
        let propUnitPrice = proposedPrice / amt;
        let setUnitPrice = setPrice / amt;
        console.log(`prop: ${propUnitPrice} ; set ${setUnitPrice}`)
        let dif = propUnitPrice - setUnitPrice;
        console.log(`${dif} dif between prop price and set price`)
        let bart = "Hello, I would like to buy " + amt + " " + this.typeToBuy + " honey."
        let response = "Certainly. That would be " + setUnitPrice * amt + "$ for "
            + amt + " jars of " + this.typeToBuy + " honey.";
        
        let barter = [
            {
                "speaker": "",
                "dialog": bart,
                "newSpeaker": "true"
            },
            {
                "speaker": "",
                "dialog": response,
                "newSpeaker": "true"
            }
        ]


        if (dif < -1) {
            //too high
            console.log("dif to high for customer");
            dialogueSection = rangeDialogue['high'][0];
            bartering = true;
            this.sold = false;
        } else {
            dialogueSection = rangeDialogue['mid'][0];
            this.sold = true;
            bartering = false;
        }

        dialogSlice = dialogGlobal[dialogueSection];
        dialogGlobal[dialogueSection] = barter.concat(dialogGlobal[dialogueSection]);
        if (this.sold) {
            dialogGlobal[dialogueSection].push(dialogGlobal[rangeDialogue["goodbyes"][0]][0])
        }
        console.log("launching dialog from bartering")
        this.scene.launch('talkingScene');
        
        return setUnitPrice * amt;
    }
}
