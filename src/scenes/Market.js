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
        this.bike = this.add.image(game.config.width / 6, 5 * game.config.height / 10, 'bike');
        this.bike.setOrigin(.5, .5).setScale(.5, .5);
        this.bike.depth = 35;

        //bear in costume selling honey
        this.bear = this.add.image(game.config.width / 2.5, 7 * game.config.height / 10, 'bearBee');
        this.bear.setOrigin(.5, .5).setScale(9, 9);
        this.bear.depth = 50;

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
        this.music = this.sound.add("hubMusic");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();

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
        this.honeyText.text = "Honey: " + playerVariables.honey;
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
            }
        } else {
            if (this.state == "waiting") { //Patrons come and go

                //Constant bear wiggle
                this.bear.x += .25 * Math.sin(currTime / 2);
                this.bear.y += .1 * Math.sin(currTime / 4 + 1);

                if (playerVariables.honey > 0 && Phaser.Math.Between(0, 1000) > 985) {
                    this.state = "approaching";
                    this.npc = new NPC(this, 2 * game.config.width / 3, game.config.height / 2, 'PlayerIcon', 0, "Bearington", "easy",
                        [["Hullo"], ["Thanks", "Bye"]]);
                    this.closeness = .1;
                    this.npc.depth = 0;
                    this.npc.setScale(this.closeness, this.closeness);
                    //play walk up animation
                    this.time.addEvent({
                        delay: 1500,
                        callback: () => {
                            this.state = "bargaining";
                            //Could be a call to NPC characteristics
                            this.npcAmount = Math.min(Phaser.Math.Between(1, 4) + Phaser.Math.Between(1, 3), playerVariables.honey);
                            this.npcPrice = (1 + Phaser.Math.FloatBetween(.1, 1) + Phaser.Math.FloatBetween(.1, .5)) * this.npcAmount;
                            this.transactionText.text = this.npc.name + ": " + this.npc.voiceLines[0][Phaser.Math.Between(0, 
                                this.npc.voiceLines[0].length-1)] + "\nI would like to buy " + this.npcAmount + " jars\nof honey for $" + 
                                Math.floor(this.npcPrice) + "." + Math.floor((this.npcPrice * 10)%10)+ Math.floor((this.npcPrice * 100)%10) +
                                "\n[Y]es  /   [N]o";
                            this.transactionText.alpha = 1;
                        },
                        loop: false,
                        callbackScope: this
                    });
                }
            } else if (this.state == "approaching") { //NPC approaches the stand

                //Constant bear wiggle
                this.bear.x += .25 * Math.sin(currTime / 2);
                this.bear.y += .1 * Math.sin(currTime / 4 + 1);

                this.closeness += .05;
                this.npc.setScale(this.closeness, this.closeness);
                this.depth = this.closeness / .05;
            } else if (this.state == "bargaining") { //Ask for honey at price
                if (Phaser.Input.Keyboard.JustDown(keyY)) {
                    this.state = "leaving";
                    this.transactionText.alpha = 0;
                    playerVariables.honey -= this.npcAmount;
                    playerVariables.money += Math.floor(this.npcPrice * 100) / 100;
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

                this.closeness -= .05;
                this.npc.setScale(this.closeness, this.closeness);
                this.depth = this.closeness / .05;
            }
        }
    }
}