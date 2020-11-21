class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    init(data){
        //track the current amounts of honey and money that the player has
        this.honey = data.currentHoney;
        this.money = data.currentMoney;
        this.turnsRemaining = data.turnsRemaining;
        this.wasVisiting = data.wasVisiting;
        //if any are undefined, give it the default value
        if(typeof this.honey == 'undefined'){
            console.log("Honey was undefined");
            this.honey = 10;
        } else if(typeof this.turnsRemaining != 'undefined'){
            //Dont make honey if the player was just visiting another part of the hub
            console.log("Player was visiting " + this.wasVisiting);
        } else {
            //if you are returning to the hub, get made honey based off of bee upgrades
            console.log("Welcome back. Honey was " + this.honey);
            this.honey += 2 + upgrades['bee'];
            for(let i = 0; i < plants.length; ++i){
                if(plants[i] > 1){
                    this.honey += 1;
                }
                if(plants[i] > 0)
                plants[i] -= 0.5;
            }
            console.log(plants);
            console.log("Honey increases to " + this.honey);
        }
        if(typeof this.money == 'undefined'){
            console.log("Money was undefined");
            this.money = 10;
        }
        if(typeof this.turnsRemaining == 'undefined'){
            console.log("Turns remaining was undefined");
            this.turnsRemaining = 3;
        }
    }

    // Load all needed assets for main hub scene. Player/walls/npcs
    preload() {
        //this.load.image("player", './assets/bearFrontBack.png');
        this.load.image('background', './assets/garden_base.png');
        this.load.image('bee','./assets/hubBee.jpg');
        this.load.image('bike','./assets/bike.png');
        this.load.image('bikeShed', './assets/tempBikeUpgrade.png');
        this.load.image('gardeningShed','./assets/tempGardeningSupplies.png');
        this.load.spritesheet('player', './assets/bearFrontBack.png', {frameWidth:40, frameHeight:72, startFrame:0, endFrame:1});

        this.load.audio("hubMusic", "./assets/bear_full.mp3");
    }

    create() {
        //Initialize images
        this.cameras.main.setBackgroundColor(0x000000);
        this.background = this.add.image(config.width/2, config.height/2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        this.bike = this.add.image(config.width/6, config.height/4,'bike').setOrigin(0.5, 0.5).setScale(0.35, 0.35);
        this.bike.flipX = true;
        this.bee = this.add.image(config.width/2, config.height/4, 'bee').setOrigin(0.5, 0.5).setScale(.01,.01);
        this.bikeShed = this.add.image(config.width/5, 3*config.height/4,'bikeShed').setScale(0.9, 0.9);
        this.gardeningShed = this.add.image(4*config.width/5, 3*config.height/4,'gardeningShed').setScale(1.2, 1.2);
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2);

        //Initialize image animation variables
        this.bounceFactor = .1;
        this.counter = 0;

        //add timing aspect for hub actions
        this.fadeMessage;
        this.fadeTimer = null;

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

        //Text that starts visible
        this.moveText = this.add.text(this.player.x, this.player.y-config.height/9, "Use the arrowkeys to move", this.textConfig).setOrigin(.5,.5);
        this.turnText = this.add.text(6*game.config.width / 7, game.config.height / 4, "Turns Remaining: ", this.textConfig).setOrigin(.5);
 
        //Text that starts invisible
        this.interactText = this.add.text(this.player.x,this.player.y, "'SPACE' to interact", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.fadeMessage = this.add.text(0,0, "", this.textConfig).setOrigin(.5,.5);
        this.fadeMessage.depth = 5;
        this.fadeMessage.setVisible(false);
        this.beeUpgrades = this.add.text(this.bee.x,this.bee.y - 35, "Your bees are at level:" + upgrades.bee + "\nThe next upgrade will cost $" + (5*upgrades.bee +10),this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.bikeUpgrades = this.add.text(this.bikeShed.x,this.bikeShed.y - 35, "Your bike is at level:" + upgrades.bike, this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.toolUpgrades = this.add.text(this.gardeningShed.x,this.gardeningShed.y -35, "Your tools are at level:" + upgrades.tools, this.textConfig).setOrigin(.5,.5).setVisible(false);

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
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();
    }

    update() {
        if (this.counter % 60 === 0){
            this.bounceFactor = -this.bounceFactor;
        }
        //Check if the player is close enough to the bike to head to the world map
        if (Math.abs(Phaser.Math.Distance.Between(this.bike.x,this.bike.y, this.player.x,this.player.y)) < 100){
            this.bike.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to make deliveries";
            this.interactText.x = this.bike.x;
            this.interactText.y = this.bike.y;
            this.interactText.setVisible(true);
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
            this.interactText.text = "'SPACE' to upgrade";
            this.interactText.x = this.bee.x;
            this.interactText.y = this.bee.y;
            this.interactText.setVisible(true);
            this.beeUpgrades.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)){
                console.log("Bee Upgrades: " + upgrades.bee);
                let upgradeCost = 5*upgrades.bee + 10;
                if(this.turnsRemaining > 0 && this.money >= upgradeCost) {
                    this.turnsRemaining -= 1;
                    this.money -= upgradeCost;
                    this.fadeText("Your bees are happier. :)");
                    upgrades.bee += 1;
                    this.beeUpgrades.text = "Your bees are at level:" + upgrades.bee + "\nThe next upgrade will cost $" + upgradeCost;
                } else if(this.money < upgradeCost){
                    this.fadeText("You do not have enough money");
                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            }
        } else {
            this.beeUpgrades.setVisible(false);
        }

        // Check if player is near the bikeshed
        if (Math.abs(Phaser.Math.Distance.Between(this.bikeShed.x,this.bikeShed.y, this.player.x,this.player.y)) < 100){
            this.bikeShed.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to upgrade bike";
            this.interactText.x = this.bikeShed.x;
            this.interactText.y = this.bikeShed.y;
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
        if (Math.abs(Phaser.Math.Distance.Between(this.gardeningShed.x,this.gardeningShed.y, this.player.x,this.player.y)) < 100) {
            this.gardeningShed.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to garden";
            this.interactText.x = this.gardeningShed.x;
            this.interactText.y = this.gardeningShed.y;
            this.interactText.setVisible(true);
            this.toolUpgrades.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (this.turnsRemaining > 0) {
                    //this.turnsRemaining -= 1;
                    //this.fadeText("Your tools are tool-ier. :)");
                    //upgrades.tools += 1;
                    //this.toolUpgrades.text = "Your tools are at level:" + upgrades.tools;
                    this.music.stop();
                    this.scene.start('gardenScene', { turnsRemaining:this.turnsRemaining, currentHoney:this.honey, currentMoney:this.money });

                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            } 
        } else {
                this.toolUpgrades.setVisible(false);
        }

        //When the player starts to move, get rid of the instructions
        if(this.moveText != null){
            if(keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown){
                this.moveText.text = "";
                this.moveText = null;
            }

        }

        this.player.update();
        this.counter++;
        this.turnText.text = "Turns Remaining: " + this.turnsRemaining + "\nHoney: " + this.honey + "\nMoney: " + this.money;
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