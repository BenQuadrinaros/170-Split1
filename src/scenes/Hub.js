class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    init(data) {
        //See where you are returning from
        this.wasVisiting = data.wasVisiting;
    }

    preload(){
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        //Initialize world details
        this.worldWidth = 5000;
        this.worldHeight = 5000;
        this.heldImg = 0;

        //If you are returning to the hub
        console.log("Welcome back. Honey was " + playerVariables.inventory.honey["total"]);

        //Gain a flat amount of yellow Honey
        //playerVariables.inventory.honey["total"] += 2 + upgrades['bee'];
        //playerVariables.inventory.honey["yellow"] += 2 + upgrades['bee'];

        //Update all Flowers for the day
        //Retrieve list of Hives for random collection
        let beehives = []
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                //console.log("["+col+","+row+"]");
                try {
                    if (gardenGrid[row][col].isHive()) {
                        beehives.push([row, col]);
                        //console.log("found beehive at "+col+', '+row);
                    }
                } catch (error) { null; }
                try {
                    gardenGrid[row][col].advance();
                    //console.log("found flower at "+col+', '+row);
                } catch (error) { null; }
            }
        }
        //console.log("found beehives: " + beehives);



        //Assess Beehives in a random order
        while (beehives.length > 0) {
            let rand = Phaser.Math.Between(0, beehives.length - 1);
            //console.log("selecting beehive #"+rand);
            //console.log("accessing "+beehives[rand][0]+", "+beehives[rand][1]);
            gardenGrid[beehives[rand][0]][beehives[rand][1]].collect();
            beehives.splice(rand, 1);
        }

        console.log("Honey increases to " + playerVariables.inventory.honey["total"]);

        //Initialize images
        this.cameras.main.setBackgroundColor(0x000000);
        this.background = this.add.image(config.width / 2, config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        this.bike = this.add.image(config.width / 6, config.height / 4, 'bike').setOrigin(0.5, 0.5).setScale(0.35, 0.35);
        this.bike.depth = this.bike.y / 10;
        this.bike.flipX = true;
        this.bee = this.add.image(config.width / 2, config.height / 4, 'bee').setOrigin(0.5, 0.5).setScale(.01, .01);
        this.bee.depth = this.bee.y / 10;
        this.bikeShed = this.add.image(config.width / 5, 3 * config.height / 4, 'bikeShed').setScale(0.9, 0.9);
        this.bikeShed.depth = this.bikeShed.y / 10;
        this.gardeningShed = this.add.image(4 * config.width / 5, 3 * config.height / 4, 'gardeningShed').setScale(1.2, 1.2);
        this.gardeningShed.depth = this.gardeningShed.y / 10;
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2, this.worldWidth, this.worldHeight);
        this.player.depth = this.player.y / 10;
                
        //Restore all actions
        playerVariables.actions = 4;

        //Initialize image animation variables
        this.bounceFactor = .1;
        this.counter = 0;

        //Camera Stuff
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        this.cameras.main.setZoom(1.15);
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

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
        this.moveText = this.add.text(this.player.x, this.player.y - config.height / 9, "Use the arrowkeys to move", this.textConfig).setOrigin(.5, .5);
        this.moveText.depth = 100;
        this.turnText = this.add.text(6 * game.config.width / 7, game.config.height / 4, "Turns Remaining: ", this.textConfig).setOrigin(.5);
        this.turnText.depth = 100;

        //Text that starts invisible
        this.interactText = this.add.text(this.player.x, this.player.y, "'SPACE' to interact", this.textConfig).setOrigin(.5, .5).setVisible(false);
        this.interactText.depth = 100;
        this.fadeMessage = this.add.text(0, 0, "", this.textConfig).setOrigin(.5, .5);
        this.fadeMessage.depth = 100;
        this.fadeMessage.setVisible(false);
        this.beeUpgrades = this.add.text(this.bee.x, this.bee.y - 35, "You have " + upgrades.bee + 1 + " beehive.\nThe next beehive will cost $" + (5 * upgrades.bee + 10), this.textConfig).setOrigin(.5, .5).setVisible(false);
        this.beeUpgrades.depth = 100;
        this.bikeUpgrades = this.add.text(this.bikeShed.x, this.bikeShed.y - 35, "Your bike's durability: " + upgrades.bike, this.textConfig).setOrigin(.5, .5).setVisible(false);
        this.bikeUpgrades.depth = 100;
        this.toolUpgrades = this.add.text(this.gardeningShed.x, this.gardeningShed.y - 35, "Grab your tools and\nhead out to the garden?", this.textConfig).setOrigin(.5, .5).setVisible(false);
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

        //Have player move towards the mouse on pointer down
        this.input.on('pointerdown', function (pointer) {

            if (pointer.isDown) {
                this.player.moveTo(pointer.worldX, pointer.worldY);
            }

        }, this);

        //create interactible backpack image
        this.backpack = this.add.image(config.width- config.width/6, config.height/6, 'PlayerIcon')
            .setInteractive().setAlpha(.5)
            .on('pointerover', () => {
                this.backpack.setAlpha(1)
            })
            .on('pointerout', () => {
                this.backpack.setAlpha(.5)
            })
            .on('pointerdown', () =>{
                console.log("clicked backpack");
                this.scene.pause('hubScene');
                this.scene.launch("backpackUI");
            });
        // Build out Garden below main Hub area
        this.path = [];    //Path for the bees to follow
        this.inScene = [   //This array will let us track local changes and update images
            [null*10], [null*10], [null*10], [null*10], [null*10], [null*10], [null*10], [null*10]
        ];
        this.mulchInScene = [   //This array will let us track local changes and update images
            [null*10], [null*10], [null*10], [null*10], [null*10], [null*10], [null*10], [null*10]
        ];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                if (gardenGrid[row][col] == null) {
                    // blank plots to be interacted with
                    let temp = this.add.image((1 + col) * game.config.width / 9 /*+ Phaser.Math.Between(-7,7)*/,
                        (9 + row) * (game.config.height - 50) / 8 + 50 /*+ Phaser.Math.Between(-7,7)*/, "dirt");
                    temp.setOrigin(.5,.5).setScale(.5, .75);
                    temp.depth = temp.y / 10;
                    this.inScene[row][col] = temp;

                    //mulch to be added
                    /*
                    if(mulch[[row,col]] > 0) {
                        let temp = this.add.image((1 + col) * game.config.width / 9 + Phaser.Math.Between(-7,7),
                        (9 + row) * (game.config.height - 50) / 8 + 50 + Phaser.Math.Between(-7,7), "mulch");
                        temp.setOrigin(.5,.5).setScale(.5, .75);
                        temp.depth = temp.y / 10;
                        this.inScene[row][col] = temp
                    }
                    */
                } else { //its not blank
                    try{ //check if hive
                        if(gardenGrid[row][col].isHive()) {
                            let temp = gardenGrid[row][col];
                            temp.addToScene(this, (1 + col) * game.config.width / 9 /*+ Phaser.Math.Between(-7,7)*/,
                                (9 + row) * (game.config.height - 50) / 8 + 100 /*+ Phaser.Math.Between(-7,7)*/, "hive", 0);
                            temp.image.setOrigin(.5,.5).setScale(.1, .1);
                            this.path.push([temp.image.x, temp.image.y]);
                            temp.image.depth = temp.image.y / 10;
                            this.inScene[row][col] = temp;
                        }
                    } catch(error) { null; }
                    try{ // check if flower
                        if(gardenGrid[row][col].isFlower()) {
                            let temp = gardenGrid[row][col];
                            temp.addToScene(this, (1 + col) * game.config.width / 9 /*+ Phaser.Math.Between(-7,7)*/,
                                (9 + row) * (game.config.height - 50) / 8 + 90 /*+ Phaser.Math.Between(-7,7)*/, "flower", 0);
                            temp.image.setOrigin(.5,.5).setScale(.15, .15);
                            this.path.push([temp.image.x, temp.image.y]);
                            temp.image.depth = temp.image.y / 10;
                            this.inScene[row][col] = temp;
                        } 
                    } catch(error) { null; }
                }
            }
        }
        
        //Create bee swarm for simulated pollination
        this.swarm = [];
        let numBees = 5;                    //5 seems to be max for flower following to look decent
        for (let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, game.config.width/2,game.config.height/2);
            temp.setOrigin(.5).setScale(.25, .25).setVisible(true);
            temp.depth = 200;
            this.swarm.push(temp);
        }

        //UI Text elements
        this.fadeMessage = this.add.text(this.player.x, this.player.y, "Nada", this.textConfig);
        this.fadeMessage.setOrigin(0.5).setVisible(false);
        this.fadeMessage.depth = 200;
        this.flowerText = this.add.text(0, 0, "Press SPACE\nto interact", this.textConfig).setOrigin(0.5);
        this.flowerText.depth = 200;
    }

    update() {
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

        //move backpack icon alongside player and camera
        this.backpack.x = this.player.x+config.width/3;
        this.backpack.y = this.player.y-config.width/5;

        //if the player is holding an object, render it and move it alongside the player
        if (heldItem !== undefined){
            if (this.heldImg < 1) {
                heldItem.addToScene(this, this.player.x /*+ Phaser.Math.Between(-7,7)*/,
                    this.player.y /*+ Phaser.Math.Between(-7,7)*/, "flower", 0);
                this.heldImg = 1;
                heldItem.image.setScale(.15,.15)
                heldItem.image.depth = 100;
            }
            heldItem.image.x = this.player.x;
            heldItem.image.y = this.player.y;

        }

        // -------------------------------------------
        // Quick day advancement for testing purposes
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.music.stop();
            this.scene.start("hubScene");
        }
        if (Phaser.Input.Keyboard.JustDown(keyO)) {
            playerVariables.money += 10;
        }
        // -------------------------------------------

        if (this.counter % 60 === 0) {
            this.bounceFactor = -this.bounceFactor;
        }
        //Check if the player is close enough to the bike to head to the world map
        if (Math.abs(Phaser.Math.Distance.Between(this.bike.x, this.bike.y, this.player.x, this.player.y)) < 100) {
            this.bike.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to make deliveries";
            this.interactText.x = this.bike.x;
            this.interactText.y = this.bike.y;
            this.interactText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //-1 to indicate that it just left the hub
                this.music.stop();
                this.scene.start('mapScene', { arrivingAt: -1 })
            }
        } else {

            this.interactText.setVisible(false);
        }

        // Checking if the player is close enough to the bee upgrade
        if (Math.abs(Phaser.Math.Distance.Between(this.bee.x, this.bee.y, this.player.x, this.player.y)) < 100) {
            this.bee.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to upgrade";
            this.interactText.x = this.bee.x;
            this.interactText.y = this.bee.y;
            this.interactText.setVisible(true);
            this.beeUpgrades.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log("Bee Upgrades: " + upgrades.bee);
                let upgradeCost = 5 * upgrades.bee + 10;
                if (playerVariables.actions > 0 && this.money >= upgradeCost) {
                    playerVariables.actions -= 1;
                    playerVariables.money -= upgradeCost;
                    this.fadeText("Your bees are happier. :)");
                    upgrades.bee += 1;
                    this.beeUpgrades.text = "You have " + upgrades.bee + 1 + " beehive.\nThe next beehive will cost $" + upgradeCost;
                    dialogueSection = 1;
                    this.scene.pause();
                    this.scene.launch('talkingScene', { previousScene: "hubScene" });
                } else if (playerVariables.money < upgradeCost) {
                    this.fadeText("You do not have enough money");
                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            }
        } else {
            this.beeUpgrades.setVisible(false);
        }

        // Check if player is near the bikeshed
        if (Math.abs(Phaser.Math.Distance.Between(this.bikeShed.x, this.bikeShed.y, this.player.x, this.player.y)) < 100) {
            this.bikeShed.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to upgrade bike";
            this.interactText.x = this.bikeShed.x;
            this.interactText.y = this.bikeShed.y;
            this.interactText.setVisible(true)
            this.bikeUpgrades.setVisible(true)
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (playerVariables.actions > 0) {
                    playerVariables.actions -= 1;
                    this.bikeUpgrades.text = "Your bike's durability: " + upgrades.bike;
                    //launch dialog
                    dialogueSection = 0;
                    this.scene.launch('talkingScene', { previousScene: "hubScene" });
                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            }
        } else {
            this.bikeUpgrades.setVisible(false);
        }


        // Check if player is near the tools
        // Now extraneous cause everything in same scene
        /*
        if (Math.abs(Phaser.Math.Distance.Between(this.gardeningShed.x, this.gardeningShed.y, this.player.x, this.player.y)) < 100) {
            this.gardeningShed.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to garden";
            this.interactText.x = this.gardeningShed.x;
            this.interactText.y = this.gardeningShed.y;
            this.interactText.setVisible(true);
            this.toolUpgrades.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                if (playerVariables.actions > 0) {
                    this.music.stop();
                    this.scene.start('gardenScene');

                } else {
                    this.fadeText("You are out of time today.\nMake your deliveries.");
                }
            }
        } else {
            this.toolUpgrades.setVisible(false);
        }
        */

        //When the player starts to move, get rid of the instructions
        if (this.moveText != null) {
            if (keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown) {
                this.moveText.text = "";
                this.moveText = null;
            }
        }

        //Place flower text over nearest spot for interaction
        this.textHover();

        this.player.update();
        this.player.depth = this.player.y / 10 + 3;
        this.counter++;
        this.turnText.text = "Actions Remaining: " + playerVariables.actions + "\nHoney: " +
            playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
    }

    fadeText(message) {
        if (this.fadeTimer != null) {
            this.fadeTimer.callback = () => { };
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

    reenableEsc() {
        console.log("ReenableEsc called");
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    textHover() {
        //find the closest interactable point
        let plot = this.closestPlot();
        if(plot == null) {
            //If closestplot is far away, clear text
            this.flowerText.alpha = 0;
        } else {
            //Else, move text to that location
            this.flowerText.alpha = 1;
            this.flowerText.x = (1 + plot[1]) * game.config.width / 9;
            this.flowerText.y = (9 + plot[0]) * (game.config.height - 50) / 8 + 80;
            //Logic for if player presses space near a plot
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                let row = plot[0];
                let col = plot[1];
                //console.log(this.inScene[row][col])
                //If the player is holding an item, modify garden plots and add image to scene.
                if (heldItem !== undefined){
                    //console.log(heldItem);
                    this.inScene[row][col] = heldItem;
                    gardenGrid[row][col] = heldItem;
                    heldItem.image.destroy()
                    heldItem = undefined;
                    this.inScene[row][col].addToScene(this, (1 + col) * game.config.width / 9 /*+ Phaser.Math.Between(-7,7)*/,
                         (9 + row) * (game.config.height - 50) / 8 + 90 /*+ Phaser.Math.Between(-7,7)*/, "flower", 0);
                    this.inScene[row][col].image.setScale(.15,.15).setOrigin(.5,.5);

                    this.heldImg = 0;
                }else {
                    //if the player is attempting to interact with a flower, pick it up for now.
                    if (this.inScene[row][col] instanceof Flower){
                        heldItem = this.inScene[row][col];
                        let texture = this.inScene[row][col].image.texture;
                        this.inScene[row][col].destroy();
                        this.inScene[row][col] = null;
                        gardenGrid[row][col] = null;


                    }
                    // if (this.inScene[row][col] instanceof Flower) {
                    //     console.log("Flower in plot");
                    //     let flower = this.inScene[row][col].image;
                    //     let options = [
                    //         {
                    //             name: 'Pick Up',
                    //         },
                    //         {
                    //             name: 'Cancel',
                    //         },
                    //     ];
                    //     if (menu === undefined){
                    //         console.log(flower.x + " " + flower.y)
                    //         menu = createMenu(this,flower.x,flower.y, options,function (button){
                    //
                    //         });
                    //     } else if (!menu.isInTouching(pointer)) {
                    //         menu.collapse();
                    //         menu = undefined;
                    //     }
                    //
                    //
                    // }
                }
            }
        }
    }

    closestPlot() {
        // Helper function to find closest plot, if any within 100 units
        let closestXY = [];
        let closestDist = 100;
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                if(Math.sqrt(Math.pow((1 + col) * game.config.width / 9 - this.player.x,2) + 
                    Math.pow((9 + row) * (game.config.height - 50) / 8 + 50 - this.player.y,2)) < closestDist) {
                        closestDist = Math.sqrt(Math.pow((1 + col) * game.config.width / 9 - this.player.x,2) + 
                            Math.pow((9 + row) * (game.config.height - 50) / 8 + 50 - this.player.y,2));
                        closestXY = [row, col];
                    }
            }
        }
        if(closestDist >= 100) {
            //If closest plot is far away, return null
            return null;
        } else {
            //else, return plot coords
            return closestXY;
        }
    }
}