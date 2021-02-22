class Market extends Phaser.Scene {
    constructor() {
        super("marketScene");
    }

    init(data) { }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        //REPLACE with actual background
        //this.background = this.add.image(config.width / 2, config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        //bike propped up on stand
        this.bike = this.add.image(game.config.width / 6, 8 * game.config.height / 10, 'bike');
        this.bike.setOrigin(.5, .5).setScale(.75, .75);
        this.bike.depth = 75;

        //stand for visual space
        this.stand = this.add.image(4 * game.config.width / 7, game.config.height / 2, 'booth');
        this.stand.setOrigin(.5, .5).setScale(.5, .5);
        this.stand.depth = 95;
        this.cloth = this.add.image(4 * game.config.width / 7, game.config.height / 2, 'cloth');
        this.cloth.setOrigin(.5, .5).setScale(.5, .5);
        this.cloth.depth = 98;

        //populate in jars of honey
        this.plainStock = [];
        for(let i = 0; i < Math.min(20, playerVariables.inventory.honey["yellow"]); i++) {
            let temp = this.add.image(game.config.width - ((i+2) * game.config.width / 27),
                64 * game.config.height / 100, "honeyPlain");
            temp.setOrigin(.5, .5).setScale(.5, .5);
            temp.depth = 97;
            this.plainStock.push(temp);
        }
        this.blueStock = [];
        for(let i = 0; i < Math.min(20, playerVariables.inventory.honey["blue"]); i++) {
            let temp = this.add.image(game.config.width - ((i+2) * game.config.width / 27),
                74 * game.config.height / 100, "honeyBlue");
            temp.setOrigin(.5, .5).setScale(.5, .5);
            temp.depth = 97;
            this.blueStock.push(temp);
        }
        this.purpleStock = [];
        for(let i = 0; i < Math.min(20, playerVariables.inventory.honey["purple"]); i++) {
            let temp = this.add.image(game.config.width - ((i+2) * game.config.width / 27),
                84 * game.config.height / 100, "honeyPurple");
            temp.setOrigin(.5, .5).setScale(.5, .5);
            temp.depth = 97;
            this.purpleStock.push(temp);
        }
        this.pinkStock = [];
        for(let i = 0; i < Math.min(20, playerVariables.inventory.honey["pink"]); i++) {
            let temp = this.add.image(game.config.width - ((i+2) * game.config.width / 27),
                94 * game.config.height / 100, "honeyPink");
            temp.setOrigin(.5, .5).setScale(.5, .5);
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
            frameRate: 24
        });
        this.bear.anims.play('playerBackIdle', true);

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

        //UI texts for resources
        this.honeyText = this.add.text(game.config.width / 10, game.config.height / 10 - 25, "Honey: ", this.textConfig).setOrigin(.5, .5);
        this.honeyText.depth = 100;
        this.moneyText = this.add.text(game.config.width / 10, game.config.height / 10, "Money: ", this.textConfig).setOrigin(.5, .5);
        this.moneyText.depth = 100;
        this.timeText = this.add.text(game.config.width / 10, game.config.height / 10 + 25, "Time Remaining: ", this.textConfig).setOrigin(.5, .5);
        this.timeText.depth = 100;
        this.timeUpText = this.add.text(game.config.width / 10, game.config.height / 10 - 25,
            "TIME'S UP\nPress Down to go to the Map", this.textConfig).setOrigin(.5, .5);
        this.timeUpText.depth = 100;
        this.timeUpText.alpha = 0;
        this.timeUp = false;

        //UI text for transactions
        this.transactionText = this.add.text(7 * game.config.width / 8, game.config.height / 2, "Hi! I want honey.",
            this.textConfig).setOrigin(.5, .5);
        this.transactionText.depth = 100;
        this.transactionText.alpha = 0;

        //establish controls for gameplay
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);

        //background music for the hub
        //CHNAGE SONG FOR MARKET
        this.music = new BGMManager(this);
        this.music.playSong("hubMusic", true);
        this.music.setVolume(config.volume);

        this.events.on("resume", () => {
            console.log("ReenableEsc called");
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
            this.scene.launch("pauseScene", { previousScene: "hubScene" });
        }
        else {
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }
        if (this.timeUp) {
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                //go to map
                //ADD HERE
                this.music.stop();
                this.scene.start('hubScene', {wasVisiting: "market"});
            }
        } else {
            if (this.state == "waiting") { //Patrons come and go

                //Constant bear wiggle
                this.bear.x += .25 * Math.sin(currTime / 2);
                this.bear.y += .1 * Math.sin(currTime / 4 + 1);

                if (playerVariables.inventory.honey.total > 0 && Phaser.Math.Between(0, 1000) > 985) {
                    this.state = "approaching";
                    this.npc = new NPC(this, 2 * game.config.width / 3, 4 * game.config.height / 7, 'basicDogNPC', 0, "Bearington", "easy",
                        [["Hullo"], ["Thanks", "Bye"]]);
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
                            if(rand > 0) {
                                rand -= playerVariables.inventory.honey["blue"] / playerVariables.inventory.honey.total;
                                if( rand > 0) {
                                    rand -= playerVariables.inventory.honey["purple"] / playerVariables.inventory.honey.total;
                                    if( rand > 0) {
                                        this.typeToBuy = "pink"
                                    } else {
                                        this.typeToBuy = "purple";
                                    }
                                } else {
                                    this.typeToBuy = "blue";
                                }
                            } else {
                                this.typeToBuy = "plain";
                            }
                            //Could be a call to NPC characteristics
                            this.npcAmount = Math.min(Phaser.Math.Between(1, 4) + Phaser.Math.Between(1, 3), playerVariables.inventory.honey.total);
                            this.npcPrice = 0;
                            if(this.typeToBuy == "plain") {
                                //plain price range $2 - $4, average $3
                                this.npcPrice = (1.5 + Phaser.Math.FloatBetween(.25, 1.5) + Phaser.Math.FloatBetween(.25, 1)) 
                                    * this.npcAmount;
                            } else {
                                //non-plain price range $3 - $7, average $5
                                this.npcPrice = (2 + Phaser.Math.FloatBetween(.5, 3) + Phaser.Math.FloatBetween(.5, 2)) 
                                    * this.npcAmount;
                            }
                            this.transactionText.text = this.npc.name + ": " + this.npc.voiceLines[0][Phaser.Math.Between(0, 
                                this.npc.voiceLines[0].length-1)] + "\nI would like to buy " + this.npcAmount + 
                                " jars\nof " + this.typeToBuy + " honey for $" + Math.floor(this.npcPrice) + "." + 
                                Math.floor((this.npcPrice * 10)%10)+ Math.floor((this.npcPrice * 100)%10) +
                                "\n[Y]es  /   [N]o";
                            this.transactionText.alpha = 1;
                        },
                        loop: false,
                        callbackScope: this
                    });
                } else if (playerVariables.inventory.honey.total == 0) {
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
                if (Phaser.Input.Keyboard.JustDown(keyY)) {
                    this.state = "leaving";
                    this.transactionText.alpha = 0;
                    playerVariables.money += Math.floor(this.npcPrice * 100) / 100;
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
                }
                if (Phaser.Input.Keyboard.JustDown(keyN)) {
                    this.state = "leaving";
                    this.transactionText.alpha = 0;
                    this.time.addEvent({
                        delay: 1500,
                        callback: () => {
                            this.npc.destroy();
                            this.state = "waiting";
                        },
                        loop: false,
                        callbackScope: this
                    });
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
    }

    reduceStock(type, amount) {
        playerVariables.inventory.honey.total -= amount;
        if(type == "plain") {
            playerVariables.inventory.honey["yellow"] -= amount;
            while(this.plainStock.length > playerVariables.inventory.honey["yellow"]) {
                this.plainStock.pop().destroy();
            }
        } else if(type == "blue") {
            playerVariables.inventory.honey["blue"] -= amount;
            while(this.blueStock.length > playerVariables.inventory.honey["blue"]) {
                this.blueStock.pop().destroy();
            }
        } else if(type == "purple") {
            playerVariables.inventory.honey["purple"] -= amount;
            while(this.purpleStock.length > playerVariables.inventory.honey["purple"]) {
                this.purpleStock.pop().destroy();
            }
        } else {
            playerVariables.inventory.honey["pink"] -= amount;
            while(this.pinkStock.length > playerVariables.inventory.honey["pink"]) {
                this.pinkStock.pop().destroy();
            }
        }
    }
}
