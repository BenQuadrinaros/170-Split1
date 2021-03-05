
class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    init(data) {
        //See where you are returning from
        this.previousScene = data.previousScene;
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
        this.worldHeight = 2000;
        this.heldImg = 0;

        //If coming from the menu or the market, advance to the next day
        if(this.previousScene === "menuScene" || this.previousScene === "marketScene"){
            //Advance to the next day
            currentDay += 1;
            console.log("Advancing to day " + currentDay);
            //If you are returning to the hub
            console.log("Welcome back. Honey was " + playerVariables.inventory.honey["total"]);
            this.startingHoneyForPopup = {
                "yellow": playerVariables.inventory.honey["yellow"],
                "blue": playerVariables.inventory.honey["blue"],
                "purple": playerVariables.inventory.honey["purple"],
                "pink": playerVariables.inventory.honey["pink"]
            };

            //All sprinklers water surroundings
            for (let row = 0; row < gardenGrid.length; row++) {
                for (let col = 0; col < gardenGrid[0].length; col++) {
                    if(gardenGrid[row][col] instanceof Sprinkler) {
                        gardenGrid[row][col].watering();
                        //console.log("found sprinkler at "+col+', '+row);
                    }
                }
            }

            //Update all Flowers for the day
            //Retrieve list of Hives for random collection
            let beehives = []
            for (let row = 0; row < gardenGrid.length; row++) {
                for (let col = 0; col < gardenGrid[0].length; col++) {
                    //console.log("["+col+","+row+"]");
                    if (gardenGrid[row][col] instanceof Hive) {
                        beehives.push([row, col]);
                        //console.log("found beehive at "+col+', '+row);
                    } else if(gardenGrid[row][col] instanceof Flower) {
                        gardenGrid[row][col].advance();
                        //console.log("found flower at "+col+', '+row);
                    } 
                }
            }

            //Assess Beehives in a random order
            while (beehives.length > 0) {
                let rand = Phaser.Math.Between(0, beehives.length - 1);
                //console.log("selecting beehive #"+rand);
                //console.log("accessing "+beehives[rand][0]+", "+beehives[rand][1]);
                gardenGrid[beehives[rand][0]][beehives[rand][1]].collect();
                beehives.splice(rand, 1);
            }

            console.log("Honey increases to " + playerVariables.inventory.honey["total"]);
        }

        //Initialize images
        this.cameras.main.setBackgroundColor(0x000000);
        this.extraGrassBackdrop = this.add.image(0, 0, "extraLargeGrass");
        this.background = this.add.image(config.width / 2, config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);
        this.bikeShed = this.add.image(config.width / 5, 3 * config.height / 4, 'bikeShed').setScale(0.9, 0.9);
        this.bikeShed.depth = this.bikeShed.y / 10;
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2, this.worldWidth, this.worldHeight);
        this.player.depth = this.player.y / 10;

        //Create some overlays for displaying ranges
        this.highlightOpacity = .4;
        this.sprinklerHighlight = this.add.image(0, 0, 'sprinklerHighlight');
        this.sprinklerHighlight.setOrigin(0.5, 0.5).setScale(16.32, 9.18);
        this.sprinklerHighlight.alpha = 0;
        this.hiveHighlight = this.add.image(0, 0, 'hiveHighlight');
        this.hiveHighlight.setOrigin(0.5, 0.5).setScale(16.32, 9.18);
        this.hiveHighlight.alpha = 0;
        this.sprinklerHighlightHold = this.add.image(0, 0, 'sprinklerHighlight');
        this.sprinklerHighlightHold.setOrigin(0.5, 0.5).setScale(16.32, 9.18);
        this.sprinklerHighlightHold.alpha = 0;
        this.hiveHighlightHold = this.add.image(0, 0, 'hiveHighlight');
        this.hiveHighlightHold.setOrigin(0.5, 0.5).setScale(16.32, 9.18);
        this.hiveHighlightHold.alpha = 0;

        //Create player animations
        this.anims.create({
            key: 'playerBackIdle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 2
        });
        this.anims.create({
            key: 'playerFrontIdle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('player', {start: 2, end: 3}),
            frameRate: 2
        });
                
        //Restore all actions
        playerVariables.actions = 4;

        //Initialize image animation variables
        this.bounceFactor = .1;
        this.counter = 0;

        //Camera Stuff
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        this.cameras.main.setZoom(1.15);
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.player, true, 0.4, 0.4);

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
        this.marketEntrance = this.add.text(config.width/5, 4*config.height/5-25, "The Farmer's Market", this.textConfig).setOrigin(0.5, 0.5);
        this.marketEntrance.depth = this.marketEntrance.y*10;
        this.toadLeckman = this.add.text(config.width/5, 2*config.height/5, "Toad Leckman's Shop", this.textConfig).setOrigin(0.5,0.5);
        this.toadLeckman.depth = this.toadLeckman.y*10;

        //Text that starts invisible
        this.interactText = this.add.text(this.player.x, this.player.y, "'SPACE' to interact", this.textConfig).setOrigin(.5, .5).setVisible(false);
        this.interactText.depth = 100;
        this.fadeMessage = this.add.text(0, 0, "", this.textConfig).setOrigin(.5, .5);
        this.fadeMessage.depth = 100;
        this.fadeMessage.setVisible(false);
        /*
        this.bikeUpgrades = this.add.text(this.bikeShed.x, this.bikeShed.y - 35, "Your bike's durability: " + upgrades.bike, this.textConfig).setOrigin(.5, .5).setVisible(false);
        this.bikeUpgrades.depth = 100;
        */

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);

        //Misc setup variables
        this.pointerCurrentlyOver = "";
        this.popupVisited = false;

        //background music for the hub
        this.music = new BGMManager(this);
        this.music.playSong("hubMusic", true);
        this.music.setVolume(config.volume);

        //Make sure the escape keybinding isn't consumed by the backpack UI
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        });

       //Have player move towards the mouse on pointer down
       this.input.on('pointerdown', function (pointer) {
        console.log("Pointer is currently over: " + this.pointerCurrentlyOver);
        if(this.pointerCurrentlyOver === "backpack"){
            console.log("Pointer currently over backpack");
        }
        else{
            console.log("Pointer currently not over anything interactable");
            this.player.moveTo(pointer.worldX, pointer.worldY, this.pointerCurrentlyOver);
        }
    }, this);

    //create interactible backpack image
    this.backpack = this.add.image(config.width- config.width/6, config.height/6, 'PlayerIcon')
        .setInteractive().setAlpha(.5)
        .on('pointerover', () => {
            this.backpack.setAlpha(1);
            this.pointerCurrentlyOver = "backpack";
            console.log("Just set pointer as over backpack");
        })
        .on('pointerout', () => {
            this.backpack.setAlpha(.5);
            this.pointerCurrentlyOver = "";
            console.log("Just set pointer as over ''");
        })
        .on('pointerdown', () =>{
            console.log("clicked backpack");
            this.scene.pause('hubScene');
            this.scene.launch("backpackUI", {previousScene:"hubScene"});
        });
        this.backpack.depth = 200;
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
                        (9 + row) * (game.config.height - 50) / 8 + 50 /*+ Phaser.Math.Between(-7,7)*/, "dirtDry");
                    temp.setOrigin(.5,.5).setScale(.35, .35);
                    temp.depth = temp.y / 10 - 20;
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
                    let temp = gardenGrid[row][col];
                    temp.addToScene(this, (1 + col) * game.config.width / 9 /*+ Phaser.Math.Between(-7,7)*/,
                        (9 + row) * (game.config.height - 50) / 8 + 85 /*+ Phaser.Math.Between(-7,7)*/);
                    temp.image.setOrigin(.5,.5).setScale(.2, .2);
                    temp.image.depth = temp.image.y / 10;
                    this.inScene[row][col] = temp;
                    if(gardenGrid[row][col] instanceof Hive || gardenGrid[row][col] instanceof Flower) {
                        this.path.push([temp.image.x, temp.image.y]);
                    }
                }
            }
        }
        
        //Create bee swarm for simulated pollination
        this.swarm = [];
        let numBees = 5;                    //5 seems to be max for flower following to look decent
        for (let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, game.config.width/2,3 * game.config.height/2);
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
        if(this.previousScene === "marketScene" && !this.popupVisited){
            console.log("Sending to popup");
            //isPaused = true;
            this.popupVisited = true;
            this.scene.pause();
            this.scene.launch("hubPopupScene", { previousScene: "hubScene", initialHoney: this.startingHoneyForPopup});
        }

        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", { previousScene: "hubScene" });
        }

        //move backpack icon alongside player and camera
        var backpackUIMinX = 4*config.width/5;
        var backpackUIMaxX = this.worldWidth - config.width/8;
        var backpackPlayerRelativeX = this.player.x+15*config.width/40;
        this.backpack.x = Math.min(backpackUIMaxX, Math.max(backpackUIMinX, backpackPlayerRelativeX));
        var backpackUIMinY = config.height/9;
        var backpackUIMaxY = this.worldHeight - config.height + 2*config.height/9;
        var backpackPlayerRelativeY = this.player.y-9*config.height/27;
        this.backpack.y = Math.min(backpackUIMaxY, Math.max(backpackUIMinY, backpackPlayerRelativeY));

        //if the player is holding an object, render it and move it alongside the player
        if (heldItem !== undefined) {
            if (this.heldImg < 1) {
                heldItem.addToScene(this, this.player.x /*+ Phaser.Math.Between(-7,7)*/,
                    this.player.y /*+ Phaser.Math.Between(-7,7)*/);
                this.heldImg = 1;
                heldItem.image.setScale(.2, .2);
            }
            //Always update location
            heldItem.image.x = this.player.x;
            heldItem.image.y = this.player.y;
            heldItem.image.depth = this.player.depth + 1;

            //Also update highlight
            if(heldItem instanceof Sprinkler) {
                this.sprinklerHighlightHold.alpha = this.highlightOpacity;
                this.sprinklerHighlightHold.x = this.player.x;
                this.sprinklerHighlightHold.y = this.player.y + 25;
                this.sprinklerHighlightHold.depth = this.sprinklerHighlightHold.y / 10 - 5;
                this.hiveHighlightHold.alpha = 0;
            } else if(heldItem instanceof Hive) {
                this.hiveHighlightHold.alpha = this.highlightOpacity;
                this.hiveHighlightHold.x = this.player.x;
                this.hiveHighlightHold.y = this.player.y + 25;
                this.hiveHighlightHold.depth = this.hiveHighlightHold.y / 10 - 5;
                this.sprinklerHighlightHold.alpha = 0;
            } else {
                this.sprinklerHighlightHold.alpha = 0;
                this.hiveHighlightHold.alpha = 0;
            }

            //Input to place item in backpack
            if (Phaser.Input.Keyboard.JustDown(keyB)) {
                //console.log(heldItem)
                if (heldItem instanceof Flower) {
                    console.log(`Storing held flower ${heldItem.type} in inventory.`)
                    console.log(`before storage ${playerVariables.inventory.flowers[heldItem.type]}`)
                    playerVariables.inventory.flowers[heldItem.type] +=1;
                    console.log(`after storage ${playerVariables.inventory.flowers[heldItem.type]}`)
                } else if(heldItem instanceof Sprinkler) {
                    //If item has highlight, hide that as well
                    playerVariables.inventory.items["Sprinkler"] +=1;
                    this.sprinklerHighlightHold.alpha = 0;
                } else if (heldItem instanceof Hive) {
                    playerVariables.inventory.items["Beehive"] +=1;
                    this.hiveHighlightHold.alpha = 0;
                }
                    
                heldItem.destroy();
                heldItem = undefined
                this.heldImg = 0;
            }
        }
        //If the player press B open the backpack
        if (Phaser.Input.Keyboard.JustDown(keyB)){
            this.scene.pause('hubScene');
            this.scene.launch("backpackUI");
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
        if (Math.abs(Phaser.Math.Distance.Between(this.marketEntrance.x, this.marketEntrance.y, this.player.x, this.player.y)) < 100) {
            this.marketEntrance.y += this.bounceFactor;
            this.interactText.text = "'SPACE' to end day by selling your honey";
            this.interactText.x = this.marketEntrance.x;
            this.interactText.y = this.marketEntrance.y + 20;
            this.interactText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //-1 to indicate that it just left the hub
                //this.music.stop();
                this.music.transitionSong("hubMarketTransition", false);
                this.cameras.main.fadeOut(3000, 0, 0, 0);
                this.time.delayedCall(9500, () => {
                    //this.scene.start('mapScene', { arrivingAt: -1 }) //for going to biking map
                    this.music.stop();
                    this.scene.start('marketScene');
                });
            }
        }
        //Check if the player is close enough to the bike to Toad Leckman to shop
        else if (Math.abs(Phaser.Math.Distance.Between(this.toadLeckman.x, this.toadLeckman.y, this.player.x, this.player.y)) < 100) {
            this.interactText.text = "'SPACE' to go shopping";
            this.interactText.x = this.toadLeckman.x;
            this.interactText.y = this.toadLeckman.y + 20;
            this.interactText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //-1 to indicate that it just left the hub
                this.music.stop();
                //this.scene.start('mapScene', { arrivingAt: -1 }) //for going to biking map
                this.scene.start('shopScene');
            }
        }

        else {

            this.interactText.setVisible(false);
        }

        //When the player starts to move, get rid of the instructions
        if (this.moveText != null) {
            if (keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown) {
                this.moveText.text = "";
                this.moveText = null;
            }
        }

        //Place flower text over nearest spot for interaction
        this.textHover();

        //Put highlight over objects if standing near them
        let loc = this.closestPlot();
        if(loc != null) {
            if(gardenGrid[loc[0]][loc[1]] instanceof Hive) {
                this.hiveHighlight.alpha = this.highlightOpacity;
                this.hiveHighlight.x = (1 + loc[1]) * game.config.width / 9;
                this.hiveHighlight.y = (9 + loc[0]) * (game.config.height - 50) / 8 + 105;
                this.hiveHighlight.depth = this.hiveHighlight.y / 10 - 5;
                this.sprinklerHighlight.alpha = 0;
            } else if (gardenGrid[loc[0]][loc[1]] instanceof Sprinkler) {
                this.sprinklerHighlight.alpha = this.highlightOpacity;
                this.sprinklerHighlight.x = (1 + loc[1]) * game.config.width / 9;
                this.sprinklerHighlight.y = (9 + loc[0]) * (game.config.height - 50) / 8 + 105;
                this.sprinklerHighlight.depth = this.sprinklerHighlight.y / 10 - 5;
                this.hiveHighlight.alpha = 0;
            } else {
                this.hiveHighlight.alpha = 0;
                this.sprinklerHighlight.alpha = 0;
            }
        } else {
            this.hiveHighlight.alpha = 0;
            this.sprinklerHighlight.alpha = 0;
        }

        for(let i = 0; i < this.swarm.length; i++) {
            this.swarm[i].update();
            this.swarm[i].flock(this.swarm, this.path, this.player);
        }

        //Misc updates for player and UI
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
                    //If that spot is empty, place item there
                    if(gardenGrid[row][col] == null) {
                        //console.log(heldItem);
                        //destroy the image of whatever is in the spot
                        this.inScene[row][col].destroy();
                        //place held object in the spot
                        this.inScene[row][col] = heldItem;
                        gardenGrid[row][col] = heldItem;
                        //clear image of item held
                        heldItem.image.destroy();
                        heldItem = undefined;
                        //Get the right image
                        let spot = gardenGrid[row][col];
                         if(spot instanceof Sprinkler) { 
                            this.sprinklerHighlightHold.alpha = 0;
                            spot.setPos(col, row);
                        } else if(spot instanceof Hive) {
                            this.hiveHighlightHold.alpha = 0;
                            spot.setPos(col, row);
                        }
                        this.inScene[row][col].addToScene(this, (1 + col) * game.config.width / 9,
                            (9 + row) * (game.config.height - 50) / 8 + 80);
                        this.inScene[row][col].image.setScale(.2,.2).setOrigin(.5,.5);
                        this.inScene[row][col].image.depth = this.inScene[row][col].image.y / 10;
                        //set the held image to nothing
                        this.heldImg = 0;
                    } else {
                        //Display something like "You cannot do this"
                    }
                } else {
                    //if the player is attempting to interact with a flower, pick it up for now.
                    if (this.inScene[row][col] instanceof Flower || this.inScene[row][col] instanceof Hive ||
                        this.inScene[row][col] instanceof Sprinkler){
                        heldItem = this.inScene[row][col];
                        //let texture = this.inScene[row][col].image.texture;
                        //remove the flower from the scene
                        this.inScene[row][col].destroy();
                        //create a dirt image and place it in the spot
                        let temp = this.add.image((1 + col) * game.config.width / 9 /*+ Phaser.Math.Between(-7,7)*/,
                            (9 + row) * (game.config.height - 50) / 8 + 50 /*+ Phaser.Math.Between(-7,7)*/, "dirtDry");
                        temp.setOrigin(.5,.5).setScale(.35, .35);
                        temp.depth = temp.y / 10 - 20;
                        this.inScene[row][col] = temp;
                        gardenGrid[row][col] = null;
                    }
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
            //else, return plot coords [row, col]
            return closestXY;
        }
    }
}