class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    init(data){
        //track the current amounts of honey and money that the player has
        this.turnsRemaining = data.turnsRemaining;
        this.wasVisiting = data.wasVisiting;
        if(typeof this.turnsRemaining != 'undefined'){
            //Dont make honey if the player was just visiting another part of the hub
            console.log("Player was visiting " + this.wasVisiting);
        } else {
            //if you are returning to the hub, get made honey based off of bee upgrades
            console.log("Welcome back. Honey was " + playerVariables.honey);
            playerVariables.honey += 2 + upgrades['bee'];
            for(let i = 0; i < plants.length; ++i){
                if(plants[i] > 1){
                    playerVariables.honey += 1;
                }
                if(plants[i] > 0)
                plants[i] -= 0.5;
            }
            console.log(plants);
            console.log("Honey increases to " + playerVariables.honey);
        }
        if(typeof this.turnsRemaining == 'undefined'){
            console.log("Turns remaining was undefined");
            this.turnsRemaining = 3;
        }
    }



    create() {
        //Initialize images
        this.cameras.main.setBackgroundColor(0x000000);
        this.background = this.add.image(config.width/2, config.height/2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        this.bike = this.add.image(config.width/6, config.height/4,'bike').setOrigin(0.5, 0.5).setScale(0.35, 0.35);
        this.bike.depth = this.bike.y / 10;
        this.bike.flipX = true;
        this.bee = this.add.image(config.width/2, config.height/4, 'bee').setOrigin(0.5, 0.5).setScale(.01,.01);
        this.bee.depth = this.bee.y / 10;
        this.bikeShed = this.add.image(config.width/5, 3*config.height/4,'bikeShed').setScale(0.9, 0.9);
        this.bikeShed.depth = this.bikeShed.y / 10;
        this.gardeningShed = this.add.image(4*config.width/5, 3*config.height/4,'gardeningShed').setScale(1.2, 1.2);
        this.gardeningShed.depth = this.gardeningShed.y / 10;
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2);
        this.player.depth = this.player.y / 10;

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
        this.moveText.depth = 100;
        this.turnText = this.add.text(6*game.config.width / 7, game.config.height / 4, "Turns Remaining: ", this.textConfig).setOrigin(.5);
        this.turnText.depth = 100;
 
        //Text that starts invisible
        this.interactText = this.add.text(this.player.x,this.player.y, "'SPACE' to interact", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.interactText.depth = 100;
        this.fadeMessage = this.add.text(0,0, "", this.textConfig).setOrigin(.5,.5);
        this.fadeMessage.depth = 100;
        this.fadeMessage.setVisible(false);
        this.beeUpgrades = this.add.text(this.bee.x,this.bee.y - 35, "You have " + upgrades.bee+1 + " beehive.\nThe next beehive will cost $" + (5*upgrades.bee +10),this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.beeUpgrades.depth = 100;
        this.bikeUpgrades = this.add.text(this.bikeShed.x,this.bikeShed.y - 35, "Your bike's durability: " + upgrades.bike, this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.bikeUpgrades.depth = 100;
        this.toolUpgrades = this.add.text(this.gardeningShed.x,this.gardeningShed.y -35, "Grab your tools and\nhead out to the garden?", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.toolUpgrades.depth = 100;

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //background music for the hub
        this.music = this.sound.add("hubMusic");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();

        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        });
    }

    update() {
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(keyESCAPE)){
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene:"hubScene"});
        }
        else{
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }

        // Quick day advancement for testing purposes
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.music.stop();
            this.scene.start("hubScene");
        }
        if(Phaser.Input.Keyboard.JustDown(keyO)) {
            playerVariables.money += 10;
        }

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
                this.scene.start('mapScene', { arrivingAt:-1 })
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
                    playerVariables.money -= upgradeCost;
                    this.fadeText("Your bees are happier. :)");
                    upgrades.bee += 1;
                    this.beeUpgrades.text = "You have " + upgrades.bee+1 + " beehive.\nThe next beehive will cost $" + upgradeCost;
                    dialogueSection = 1;
                    this.scene.pause();
                    this.scene.launch('talkingScene', {previousScene:"hubScene"});
                } else if(playerVariables.money < upgradeCost){
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
                    this.bikeUpgrades.text = "Your bike's durability: " + upgrades.bike;
                    //launch dialog
                    dialogueSection = 0;
                    this.scene.launch('talkingScene', {previousScene:"hubScene"});                } else {
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
                    this.music.stop();
                    this.scene.start('gardenScene', { turnsRemaining:this.turnsRemaining });

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
        this.player.depth = this.player.y / 10;
        this.counter++;
        this.turnText.text = "Turns Remaining: " + this.turnsRemaining + "\nHoney: " + playerVariables.honey + 
            "\nMoney: " + playerVariables.money;
    }

    fadeText(message) {
        if(this.fadeTimer != null) {
            this.fadeTimer.callback = () => {};
            this.fadeTimer.delay = 0;
            this.fadeTimer = null;
        }
        this.fadeMessage.x = this.player.x;
        this.fadeMessage.y = this.player.y + this.player.height / 4;
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

    reenableEsc(){
        console.log("ReenableEsc called");
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }
}