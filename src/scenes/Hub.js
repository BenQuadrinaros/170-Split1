class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    init(data){
        //track the current amounts of honey and money that the player has
        this.honey = data.currentHoney;
        this.money = data.currentMoney;
        //if either was undefined, give it the default value
        if(typeof this.honey == 'undefined'){
            console.log("Honey was undefined");
            this.honey = 10;
        } else {
            //if you are returning to the hub, get made honey based off of bee upgrades
            console.log("Welcome back. Honey was " + this.honey);
            this.honey += 2 + upgrades['bee'];
            console.log("Honey increases to " + this.honey);
        }
        if(typeof this.money == 'undefined'){
            console.log("Money was undefined");
            this.money = 0;
        }
    }

    // Load all needed assets for main hub scene. Player/walls/npcs
    preload() {
        this.load.image("player", './assets/HubPlayer.png')
        this.load.image('background', './assets/hubBackground.jpg')
        this.load.image('map','./assets/hubMap.jpg');
        this.load.image('bee','./assets/hubBee.jpg');
        this.load.image('bike','./assets/bike.png');
        this.load.image('bikeShed', './assets/bikeShed.jpg');
        this.load.image('toolShed','./assets/shed.jpg');
        this.load.image('tools','./assets/tools.jpg');

        this.load.audio("hubMusic", "./assets/bear_full.mp3");
    }

    create() {
        this.cameras.main.setBackgroundColor(0x000000)
        this.background1 = this.add.image(10, 10, 'background').setOrigin(0,0);
        this.background2 = this.add.image(config.width/2, 10, 'background').setOrigin(0,0);
        this.bikeShed = this.add.image(config.width/5, 3*config.height/4,'bikeShed').setScale(.3,.3);
        this.toolShed = this.add.image(4*config.width/5, 3*config.height/4,'toolShed').setScale(.3,.3);
        this.bee = this.add.image(2*config.width/3, config.height/4, 'bee').setOrigin(.5,.5).setScale(.01,.01);
        this.map = this.add.image(config.width/5, config.height/4,'map').setOrigin(.5,.5).setScale(.2,.2);
        this.bike = this.add.image(config.width/5, 3*config.height/4,'bike').setOrigin(.5,.5).setScale(.2,.2);
        this.tools = this.add.image(4*config.width/5, 3*config.height/4,'tools').setOrigin(.5,.5).setScale(.09,.09);
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2).setScale(.2,.2);
        this.bounceFactor = .1;
        this.counter = 0;

        //add timing aspect for hub actions
        this.turnsRemaining = 2;
        this.fadeMessage;
        this.fadeTimer = null;

        this.scoreConfig = {
            fontFamily: "Courier",
            fontSize: "14px",
            color: "#ffffff",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.interactText = this.add.text(this.player.x,this.player.y, "'SPACE' to interact", this.scoreConfig).setOrigin(.5,.5);
        this.interactText.setVisible(false);
        this.moveText = this.add.text(this.player.x, this.player.y+config.height/3, "Use the arrowkeys to move", this.scoreConfig).setOrigin(.5,.5);
        this.turnText = this.add.text(game.config.width / 2, game.config.height / 8, "Turn Remaining: ", this.scoreConfig).setOrigin(.5);
        this.fadeMessage = this.add.text(0,0, "", this.scoreConfig).setOrigin(.5,.5);
        this.fadeMessage.depth = 5;
        this.fadeMessage.setVisible(false);
        this.beeUpgrades = this.add.text(this.bee.x,this.bee.y - 20, "Your bees are at level:" + upgrades.bee,this.scoreConfig).setOrigin(.5,.5).setVisible(false);
        this.bikeUpgrades = this.add.text(this.bike.x,this.bike.y + 20, "Your bike is at level:" + upgrades.bike, this.scoreConfig).setOrigin(.5,.5).setVisible(false);
        this.toolUpgrades = this.add.text(this.tools.x,this.tools.y + 20, "Your tools are at level:" + upgrades.tools, this.scoreConfig).setOrigin(.5,.5).setVisible(false);

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //background music for the hub
        this.music = this.sound.add("hubMusic");
        this.music.volume = .7;
        this.music.loop = true;
        this.music.play();
    }

    update() {
        if (this.counter % 60 === 0){
            this.bounceFactor = -this.bounceFactor;
        }
        //Check if the player is close enough to the map
        if (Math.abs(Phaser.Math.Distance.Between(this.map.x,this.map.y, this.player.x,this.player.y)) < 100){
            this.map.y += this.bounceFactor;
            this.interactText.x = this.map.x;
            this.interactText.y = this.map.y;
            this.interactText.setVisible(true)
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                //-1 to indicate that it just left the hub
                this.music.stop();
                this.scene.start('mapScene', { arrivingAt:-1, currentHoney:this.honey, currentMoney:this.money })
            }
        } else {
            this.interactText.setVisible(false);
        }

        // Checking if the player is close enough to the bee upgrade
        if (Math.abs(Phaser.Math.Distance.Between(this.bee.x,this.bee.y, this.player.x,this.player.y)) < 100){
            this.bee.y += this.bounceFactor;
            this.interactText.x = this.bee.x;
            this.interactText.y = this.bee.y;
            this.interactText.setVisible(true);
            this.beeUpgrades.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                if(this.turnsRemaining > 0) {
                    this.turnsRemaining -= 1;
                    this.fadeText("Your bees are happier. :)");
                    upgrades.bee += 1;
                    this.beeUpgrades.text = "Your bees are at level:" + upgrades.bee;
                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            }
        } else {
            this.beeUpgrades.setVisible(false);
        }
        // Check if player is near the bikeshed
        if (Math.abs(Phaser.Math.Distance.Between(this.bike.x,this.bike.y, this.player.x,this.player.y)) < 100){
            this.bike.y += this.bounceFactor;
            this.interactText.x = this.bike.x;
            this.interactText.y = this.bike.y;
            this.interactText.setVisible(true)
            this.bikeUpgrades.setVisible(true)
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                if (this.turnsRemaining > 0) {
                    this.turnsRemaining -= 1;
                    this.fadeText("Your bike is sturdier. :)");
                    upgrades.bike += 1;
                    this.bikeUpgrades.text = "Your bike is at level:" + upgrades.bike;
                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            }
        } else {
            this.bikeUpgrades.setVisible(false);
        }


        // Check if player is near the tools
        if (Math.abs(Phaser.Math.Distance.Between(this.tools.x,this.tools.y, this.player.x,this.player.y)) < 100) {
            this.tools.y += this.bounceFactor;
            this.interactText.x = this.tools.x;
            this.interactText.y = this.tools.y;
            this.interactText.setVisible(true)
            this.toolUpgrades.setVisible(true)
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (this.turnsRemaining > 0) {
                    this.turnsRemaining -= 1;
                    this.fadeText("Your tools are tool-ier. :)");
                    upgrades.tools += 1;
                    this.toolUpgrades.text = "Your tools are at level:" + upgrades.tools;
                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            } else {
                this.toolUpgrades.setVisible(false);
            }
        }

        this.player.update();
        this.counter++;
        this.turnText.text = "Turns Remaining: " + this.turnsRemaining;
    }

    fadeText(message) {
        if(this.fadeTimer != null) {
            this.fadeTimer.callback = () => {};
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