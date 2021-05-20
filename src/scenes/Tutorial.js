class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
        this.COLOR_PRIMARY = 0x4e342e;
        this.COLOR_LIGHT = 0x7b5e57;
        this.COLOR_DARK = 0x260e04;
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    /*create() {
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        //Setting Background

        //Creating interactable images
        let tutorial = this.add.image(centerX, centerY, 'TempTutorialScreen').setOrigin(0.5);
        let back = this.add.image(centerX / 6, 9*config.height/10, 'Back').setOrigin(0.5).setScale(0.85);
        //Making images interactable
        back.setInteractive();
        //Setting interactive behaviors
        back.on('pointerover', () => back.setFrame(1));
        back.on("pointerout", () => back.setFrame(0));
        back.on('pointerup', () => {
            this.scene.resume(this.prevScene);
            this.scene.stop();
        });

        console.log(this);
    }*/

    create() {

        //Tutorial Dialog
        this.tutorialConfig = {
            fontFamily: font,
            fontSize: "24px",
            color: "#ffffff",
            align: "left",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tempText = this.add.text(-100, -100, "Load the damn font", this.tutorialConfig);

        console.log("Garden Grid:");
        console.log(gardenGrid);

        this.setTutorialGlobalVars();
        this.setTutorialFlags();

        //Initialize various global variables
        this.worldWidth = 960; //Set the width of the scene
        this.worldHeight = 640; //Set the height of the scene
        this.heldImg = 0; //Determines which item is being held by the player
        this.bounceFactor = .1; //Constant for images bouncing
        this.counter = 0; //A generic counter
        this.fadeTimer = null; //A tracker for whether a message needs to fade
        this.pointerCurrentlyOver = ""; //Tracks which interactable object the cursor is over

        //background music for the hub
        this.music = new BGMManager(this);
        this.music.playSong("hubMusic", true);
        this.music.setVolume(config.volume);

        //Initialize Controls
        this.createControls();

        //Initialize Background Elements
        this.createBackgroundImages();

        //Initialize Player
        this.createPlayer();
        //Initialize Camera Stuff
        this.createCamera();
        //Initialize UI Elements
        this.createUIElements();
        //Initialize Text Objects
        this.createText();
        //Initialize Miscellanious Events
        this.createEvents();
        //Initialize Garden
        this.createGarden();
        //Initialize Bee Swarms
        this.createBees();
        //Prep the animations
        this.createAnimations();

        this.advanceTutorial();
    }

    update() {
        //Check if the pause menu should be activated
        this.updateCheckPause();

        //Move the backpack icon to be be relative to the player
        this.updateMoveUI();

        //if the player is holding an object, render it and move it alongside the player
        if (heldItem !== undefined) {
            this.updateHeldItemBehavior();
        }

        //Check various keyboard inputs
        this.updateCheckMiscKeyboard();
        //If the player is currently in the middle of a dialog, stop update here
        if(this.playerIsInDialog){
            return;
        }

        //Check if the player is near any interactable zones
        this.updateCheckNearLocation();

        //Place flower text over nearest spot for interaction
        this.textHover();

        //Put highlight over objects if standing near them
        this.updateMoveHighlight();

        //Update other things existing in the scene
        this.updateSwarm();

        //Update player movement and location
        this.previousPlayerPosition = [this.player.x, this.player.y];
        //Make sure the player cannot move while watering
        if(!(this.wateringEmitter.on)) { this.player.update(); }
        this.player.depth = this.player.y / 10 + 3;
        this.updateCheckCollisions();

        //Misc Updates
        this.counter++;
        if (this.counter % 60 === 0) {
            this.bounceFactor = -this.bounceFactor;
        }

        //Go to the next section of the tutorial
        this.advanceTutorial();

        //Misc updates
        if(playerInventoryUpdated){
            this.backpack.setFrame(1);
        }
    }

    advanceDay() {
        currentDay += 1;
        hasSoldForDay = false;
        this.sunsetTint.alpha = 0;
        console.log("Advancing to day " + currentDay);
        //If you are returning to the hub
        console.log("Welcome back. Honey was " + playerVariables.inventory.honey["total"]);
        this.startingHoneyForPopup = {
            "yellow": playerVariables.inventory.honey["yellow"],
            "blue": playerVariables.inventory.honey["blue"],
            "purple": playerVariables.inventory.honey["purple"],
            "pink": playerVariables.inventory.honey["pink"]
        };

        //Dry out all plots
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                gardenGrid[row][col].water = false;
            }
        }

        //All sprinklers water surroundings
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                let loc = gardenGrid[row][col];
                if (loc.item instanceof Sprinkler) {
                    loc.item.watering();
                    //console.log("found sprinkler at "+col+', '+row);
                }
            }
        }

        //Update all Flowers for the day
        //Retrieve list of Hives & Weeds for random collection
        let beehives = [];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                //console.log("["+col+","+row+"]");
                let loc = gardenGrid[row][col];
                if (loc.item instanceof Hive) {
                    beehives.push([row, col]);
                    //console.log("found beehive at "+col+', '+row);
                } else if (loc.item instanceof Flower) {
                    if(loc.item.advance()) {
                        loc.spot.destroy();
                        loc.item = null;
                    }
                    //console.log("found flower at "+col+', '+row);
                } else if (loc.item instanceof Weed) {
                    //Mark existing weeds to spread
                    loc.item.spreader = true;
                }
            }
        }
        this.numHives = beehives.length;

        //Assess Beehives in a random order
        while (beehives.length > 0) {
            let rand = Phaser.Math.Between(0, beehives.length - 1);
            //console.log("selecting beehive #"+rand);
            //console.log("accessing "+beehives[rand][0]+", "+beehives[rand][1]);
            gardenGrid[beehives[rand][0]][beehives[rand][1]].item.collect();
            beehives.splice(rand, 1);
        }

        //Spread weeds from existing weeds
        let growth = [];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                //console.log("["+col+","+row+"]");
                let loc = gardenGrid[row][col];
                if (loc.item instanceof Weed) {
                    growth = loc.item.spread();
                    //console.log("received growth for",growth);
                    for(let coords of growth) {
                        //console.log("weed spread to",coords);
                        gardenGrid[coords[0]][coords[1]].item = new Weed(coords[1], coords[0]);
                    }
                    //console.log("found beehive at "+col+', '+row);
                }
            }
        }
        //Spawn new weeds in possible spots
        growth = [];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                //console.log("location: "+col+', '+row);
                let loc = gardenGrid[row][col];
                //If there is nothing in the plot
                if(loc.item == null) {
                    growth.push([row, col]);
                    //console.log("putting weed at: "+col+', '+row+");
                }
            }
        }
        //Determine how many to spawn
        let toSpread = Phaser.Math.Between(1, 3);
        while(growth.length > toSpread) {
            growth.splice(Phaser.Math.Between(0, growth.length-1), 1);
        }
        for(let coords of growth) {
            //console.log("creating new weed at",coords);
            let loc = gardenGrid[coords[0]][coords[1]];
            loc.item = new Weed(coords[1], coords[0]);
        }

        //Render all plots
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                gardenGrid[row][col].renderPlot(this, this.gridToCoord(row, col));
            }
        }

        console.log("Honey increases to " + playerVariables.inventory.honey["total"]);

        //Refresh Shop
        shopInventory["Seeds"]["Daisy"]["amount"] = 2;
        shopInventory["Seeds"]["Delphinium"]["amount"] = 3;
        shopInventory["Seeds"]["Lavender"]["amount"] = 3;
        shopInventory["Seeds"]["Tulip"]["amount"] = 3;
        shopInventory["Items"]["Beehive"]["amount"] = 2;
        shopInventory["Items"]["Sprinkler"]["amount"] = 2;
    }

    setTutorialGlobalVars(){
        //Empty player's honey
        playerVariables.inventory.honey["total"] = 0;
        playerVariables.inventory.honey["yellow"] = 0;
        playerVariables.inventory.seeds["Daisy"] = 0;
        playerVariables.inventory.items["Clipper"] = 0;
        //Destroy the default garden items
        gardenGrid[0][5].item = null; //Make sure the player doesn't spawn in a bramble
        gardenGrid[1][4].item = null;
        gardenGrid[1][6].item = null;
        gardenGrid[2][5].item = null;
    }

    createControls() {
        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    createPlayer() {
        //Establish the sprite
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2, this.worldWidth, this.worldHeight, [[game.config.width+50, 115]]);
        this.player.depth = this.player.y / 10;
    }

    createCamera() {
        //Provide basic controls
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        //this.cameras.main.setZoom(1);
        this.cameras.main.setZoom(1.15);
        //this.cameras.main.setTint(0x000000);
        //Have it track the player
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.player, true, 0.4, 0.4);
    }

    createBackgroundImages() {
        //this.extraGrassBackdrop = this.add.image(0, 0, "extraLargeGrass").setOrigin(0, 0).setScale(0.5);
        this.background = this.add.image(0, 0, 'gardenBackground').setOrigin(0, 0).setScale(0.5);
        //this.talkingBee = this.add.image(config.width, 3*config.height/5, 'largeBee').setOrigin(0.5).setScale(1, 1);
        //this.talkingBee.alpha = 0;
        //this.talkingBee.depth = 120;
    }

    createUIElements() {
        //Create some overlays for displaying ranges
        this.plotHighlight = this.add.ellipse(0, 0, config.width / 13, config.height / 13, 0xD3D3D3);
        this.plotHighlight.alpha = 0;
        this.highlightOpacity = .4;
        this.sprinklerHighlight = this.add.rectangle(0, 0, this.worldWidth/4, .75*this.worldWidth/4, 0x1535D3);
        this.sprinklerHighlight.alpha = 0;
        this.hiveHighlight = this.add.rectangle(0, 0, 5*this.worldWidth/12, .75*5*this.worldWidth/12, 0xD38515);
        this.hiveHighlight.alpha = 0;
        this.sprinklerHighlightHold = this.add.rectangle(0, 0, this.worldWidth/4, .75*this.worldWidth/4, 0x1535D3);
        this.sprinklerHighlightHold.alpha = 0;
        this.hiveHighlightHold = this.add.rectangle(0, 0, 5*this.worldWidth/12, .75*5*this.worldWidth/12, 0xD38515);
        this.hiveHighlightHold.alpha = 0;
        this.tutorialTextBackdrop = this.add.image(this.cameras.main.scrollX, this.cameras.main.scrollY,
            'tutorialDialogBox').setOrigin(0, 0).setScale(0.435);
        this.tutorialTextBackdrop.alpha = 0;
        this.tutorialTextBackdrop.depth = 150;

        //create interactible backpack image
        this.backpack = this.add.image(this.cameras.main.scrollX + config.width - 122, this.cameras.main.scrollY + config.height/5 - 10, 'backpackFrames')
            .setInteractive().setAlpha(.9).setScale(.87)
            .on('pointerover', () => {
                this.backpack.setAlpha(1);
                this.pointerCurrentlyOver = "backpack";
                console.log("Just set pointer as over backpack");
            })
            .on('pointerout', () => {
                this.backpack.setAlpha(.9);
                this.pointerCurrentlyOver = "";
                console.log("Just set pointer as over ''");
            })
            .on('pointerdown', () => {
                console.log("clicked backpack");
                if(this.playerIsInDialog){
                    console.log("In dialog, can't access backpack");
                    return;
                }
                this.music.playSFX("backpackOpen");
                this.placeHeldItemInBag();
                this.backpack.setFrame(0);
                this.backpack.setAlpha(0);
                playerInventoryUpdated = false;
                this.scene.pause('tutorialScene');
                this.scene.launch("backpackUI", {previousScene: "tutorialScene"});
            });
        this.backpack.depth = 200;

        this.infoDisplay = new InfoDisplay(this, "infoBox", 0, "Hub");
    }

    createText() {
        //Text config without a background, which blends better with the background
        this.textConfig = {
            font: font,
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

        //Text that starts invisible
        this.interactText = this.add.text(this.player.x, this.player.y, "'SPACE' to interact", this.textConfig).setOrigin(.5, .5).setVisible(false);
        this.interactText.depth = 100;
        this.fadeMessage = this.add.text(0, 0, "", this.textConfig).setOrigin(.5, .5);
        this.fadeMessage.depth = 100;
        this.fadeMessage.setVisible(false);

        //Text of variable visibility
        this.caveText = this.add.text(5 * game.config.width / 7, (game.config.height / 4) + 25, "", this.textConfig).setOrigin(.5);
        this.caveText.depth = 100;
        this.caveText.text = "Press SPACE to go to sleep";
        this.caveText.setVisible(false);

        //UI Text elements
        this.fadeMessage = this.add.text(0, 0, "Nada", this.textConfig);
        this.fadeMessage.setOrigin(0.5).setVisible(false);
        this.fadeMessage.depth = 200;

        //Tutorial Dialog
        this.tutorialConfig = {
            fontFamily: 'realize_my_passionregular',
            fontSize: "24px",
            color: "#000000",
            align: "left",
            stroke: "#000000",
            strokeThickness: 1,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tutorialDialog = this.add.text(75, this.player.y, "", this.tutorialConfig);
        this.tutorialDialog.setOrigin(0, 0).setVisible(false);
        this.tutorialDialog.depth = 200;
        //Dialog popup metadata
        this.tutorialConfig.fontSize = "14px";
        this.spaceContinue = this.add.text(0, 0, "SPACE to continue", this.tutorialConfig).setVisible(false);
        this.spaceContinue.depth = 205;
    }

    createEvents() {
        //Make sure the escape keybinding isn't consumed by the backpack UI
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.setVolume(config.volume);
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
            keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
            if(!this.playerHasEquippedFirstSeed && (playerVariables.inventory.seeds["Daisy"] === 0)){
                this.playerHasEquippedFirstSeed = true;
            } else if(this.playerHasWateredFirstSeed && !this.playerHasEquippedFullFlower && (playerVariables.inventory.flowers["Daisy"] === 0)){
                this.playerHasEquippedFullFlower = true;
            }
            this.backpack.setAlpha(0.9);
        });

        //Have player move towards the mouse on pointer down
        this.input.on('pointerdown', function (pointer) {
            console.log("Pointer is currently over: " + this.pointerCurrentlyOver);
            if (this.pointerCurrentlyOver === "backpack") {
                console.log("Pointer currently over backpack");
            } else {
                console.log("Pointer currently not over anything interactable");
                //If they are on the last section of dialog, stop the dialog
                if(this.currDialogSection === this.currDialogMaximum){
                    this.concludeTutorialDialog();
                    ++this.currDialogSection;
                }
                else if(this.currDialogSection < this.currDialogMaximum){
                    ++this.currDialogSection;
                    this.advanceTutorialDialog(this.currDialogSection);
                }
            }
        }, this);
    }

    createGarden() {
        // Build out Garden below main Hub area
        this.path = [];    //Path for the bees to follow
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                let plot = gardenGrid[row][col];
                let coords = this.gridToCoord(col, row);
                plot.renderPlot(this, coords);
                if (plot.item instanceof Hive || plot.item instanceof Flower) {
                    this.path.push([coords[0], coords[1] - 25]);
                }
            }
        }

        //create water bucket for manual watering
        this.spigot = this.add.image(.925 * config.width, .525 * config.height, "spigot");
        this.spigot.setOrigin(.5, .5).setScale(.75, .75);
        this.spigot.depth = this.spigot.y / 10;
        this.waterHeld = null;


        //Timed events for watering animations
        this.wateringRotate = null;
        //Particle emitter
        this.wateringParticle = this.add.particles('droplet');
        this.wateringEmitter = this.wateringParticle.createEmitter();
        this.wateringEmitter.setLifespan(200);
        this.wateringEmitter.setGravityY(800);
        this.wateringEmitter.setScale(.025);
        this.wateringEmitter.setSpeed({min: 125, max: 350});
        this.wateringEmitter.on = false;

    }

    createBees() {
        //Create bee swarm for simulated pollination
        this.swarm = [];
        let numBees = 3 + 2 * this.numHives;     //5 seems to be a good base for flower following to look decent
        for (let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, game.config.width / 2, 3 * game.config.height / 2);
            temp.setOrigin(.5).setScale(.25, .25).setVisible(true);
            temp.depth = 200;
            this.swarm.push(temp);
        }
    }

    createAnimations() {
        //Timed events for watering animations
        this.wateringRotate = null;
        this.tempCan = null;

        //Particle emitter for Watering Can
        this.wateringParticle = this.add.particles('droplet');
        this.wateringEmitter = this.wateringParticle.createEmitter();
        this.wateringEmitter.setLifespan(200);
        this.wateringEmitter.setGravityY(800);
        this.wateringEmitter.setScale(.025);
        this.wateringEmitter.setSpeed({min: 125, max: 350});
        this.wateringEmitter.on = false;

        //Particle emitter for Spigot
        this.spigotEmitter = this.wateringParticle.createEmitter();
        this.spigotEmitter.setLifespan(120);
        this.spigotEmitter.setGravityY(800);
        this.spigotEmitter.setScale(.025);
        this.spigotEmitter.setSpeed({min: 125, max: 350});
        this.spigotEmitter.on = false;
    }

    updateCheckPause() {
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            //this.scene.launch("pauseScene", {previousScene: "tutorialScene"});
            this.scene.launch("hubPopupScene", {previousScene: "tutorialScene",
                                                    fromTutorial:false});
        }
    }

    updateMoveUI() {
        //move backpack icon alongside player and camera
        this.backpack.x = this.cameras.main.scrollX + config.width - 122;
        this.backpack.y = this.cameras.main.scrollY + config.height/5 - 10;
        this.infoDisplay.update(this.cameras.main.scrollX + config.width * .145, 
            this.cameras.main.scrollY + config.height * .185, 
            playerVariables.money, playerVariables.inventory.honey["total"]);
    }

    updateHeldItemBehavior() {
        if (this.heldImg == 0) {
            console.log("setting image for",heldItem);
            heldItem.addToScene(this, this.player.x, this.player.y);
            if(heldItem instanceof Flower && heldItem.age == 0) {
                heldItem.image.destroy();
                heldItem.image = null;
                heldItem.image = this.add.image(this.player.x, this.player.y, heldItem.type+"Seeds");
                heldItem.image.setScale(.35, .35);
            } 
            this.heldImg = 1;
            this.imageFlip = false;
        } else if (this.heldImg == -1) {
            heldItem.addToScene(this, this.player.x, this.player.y);
            heldItem.image.flipX = this.imageFlip;
            this.heldImg = 1;
            this.wateringAnimate();
            this.imageFlip = false;
        }
        //Always update location
        heldItem.image.x = this.player.x;
        heldItem.image.y = this.player.y;
        heldItem.image.flipX = this.player.flipX;
        if(this.player.movingUp) { heldItem.image.depth = this.player.depth - 1; }
        else { heldItem.image.depth = this.player.depth + 1; }

        //Also update highlight
        if (heldItem instanceof Sprinkler) {
            this.sprinklerHighlightHold.alpha = this.highlightOpacity;
            this.sprinklerHighlightHold.x = this.player.x;
            this.sprinklerHighlightHold.y = this.player.y + 35;
            this.sprinklerHighlightHold.depth = this.sprinklerHighlightHold.y / 10 - 5;
            this.hiveHighlightHold.alpha = 0;
        } else if (heldItem instanceof Hive) {
            this.hiveHighlightHold.alpha = this.highlightOpacity;
            this.hiveHighlightHold.x = this.player.x;
            this.hiveHighlightHold.y = this.player.y + 35;
            this.hiveHighlightHold.depth = this.hiveHighlightHold.y / 10 - 5;
            this.sprinklerHighlightHold.alpha = 0;
        } else {
            this.sprinklerHighlightHold.alpha = 0;
            this.hiveHighlightHold.alpha = 0;
        }

        //Input to place item in backpack
        if (Phaser.Input.Keyboard.JustDown(keyB)  || Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyI)) {
            if(this.wateringRotate == null) {
                console.log("Backpack keyboard shortcut");
                if(this.playerIsInDialog){
                    console.log("In dialog, can't access backpack");
                    return;
                }
                this.music.playSFX("backpackOpen");
                this.placeHeldItemInBag();
                this.backpack.setFrame(0);
                this.backpack.setAlpha(0);
                playerInventoryUpdated = false;
                this.scene.pause('tutorialScene');
                this.scene.launch("backpackUI", {previousScene: "tutorialScene"});
            }
        }
    }

    updateCheckMiscKeyboard() {
        //If the player is in dialog, do not check the rest of the keyboard inputs
        if(this.playerIsInDialog){
            
            //If the player presses Space to advance dialog
            if (Phaser.Input.Keyboard.JustDown(keySPACE) || Phaser.Input.Keyboard.JustDown(keyENTER)){
                //If they are on the last section of dialog, stop the dialog
                if(this.currDialogSection === this.currDialogMaximum){
                    this.concludeTutorialDialog();
                    ++this.currDialogSection;
                }
                else if(this.currDialogSection < this.currDialogMaximum){
                    ++this.currDialogSection;
                    this.advanceTutorialDialog(this.currDialogSection);
                }
            }
            return;
        }
        

        //If the player press B open the backpack
        if (Phaser.Input.Keyboard.JustDown(keyB) || Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyI)) {
            console.log("Pressing B");
            this.music.playSFX("backpackOpen");
            this.scene.pause('tutorialScene');
            this.scene.launch("backpackUI", {previousScene: "tutorialScene"});
        }

        // -------------------------------------------
        // Quick day advancement for testing purposes
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.advanceTutorialDialog(this.currDialogMaximum);
            this.currDialogMaximum += 1;
        }
    }

    updateCheckNearLocation() {
        //Check if the player is close enough to the cave to rest
        if ((Math.abs(Phaser.Math.Distance.Between(this.caveText.x, this.caveText.y,
            this.player.x, this.player.y)) < 100) && this.playerHasPlacedBeehive) {
            if (!hasSoldForDay) {
                this.caveText.setVisible(true);
            }
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //Go to hub and start next day
                this.music.transitionSong("bedtimeMusic", false);
                this.cameras.main.fadeOut(5000, 0, 0, 0);
                this.time.delayedCall(5250, () => {
                    //Give the player some clippers
                    playerVariables.inventory.items["Clipper"] += 3;
                    playerVariables.inventory.honey["total"] = 3;
                    playerVariables.inventory.honey["yellow"] = 3;
                    inventoryTabsUpdated["honey"] = true;
                    playerInventoryUpdated = true;
                    this.music.stop();
                    this.scene.stop();
                    this.placeHeldItemInBag()
                    this.scene.launch("hubScene", {previousScene: "tutorialScene"});
                });
            }
        }
        //If not near any locations
        else {
            if (!hasSoldForDay) {
                this.caveText.setVisible(false);
            }
            this.interactText.setVisible(false);
        }
    }

    updateCheckCollisions(){
        let coords = this.closestPlot();
        if(coords) {
            let obj = gardenGrid[coords[0]][coords[1]].item;
            if(obj instanceof Bramble) {
                obj = obj.image;
                if(this.player.x + this.player.width/2 < obj.x + 120 
                    && this.player.x - this.player.width/2 > obj.x - 120
                    && this.player.y + this.player.height/3 < obj.y + 50) {
                    //Overlapping significantly
                    this.player.x = this.previousPlayerPosition[0];
                    this.player.y = this.previousPlayerPosition[1];
                    if(gardenGrid[coords[0]][coords[1]].item instanceof Bramble) {
                        this.player.slow = true;
                        this.fadeText("Ow! Those are\nprickly brambles.");
                    }
                }
            } else {
                this.player.slow = false;
            }
        }
    }

    updateSwarm() {
        for (let i = 0; i < this.swarm.length; i++) {
            this.swarm[i].update();
            this.swarm[i].flock(this.swarm, this.path, this.player);
        }
    }

    fadeText(message) {
        if (this.fadeTimer != null) {
            this.fadeTimer.callback = () => {
            };
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

    wateringAnimate() {
        if(this.wateringRotate != null) {
            //Reset rotate
            this.wateringRotate.callback = () => {};
            this.wateringRotate.delay = 0;
            this.wateringRotate = null;
        }

        //Set the angle to the proper tilt
        let angle = 60;
        if(heldItem.image.flipX) { angle = -60; }
        heldItem.image.angle = angle;

        //Start a particle effect with a slight delay
        this.time.addEvent({
            delay: 150,
            callback: () => {
                //Set the particles to the apporpriate depth
                this.wateringParticle.setDepth(heldItem.image.depth+1);
                //Place emitter and activate it
                let xPos = heldItem.image.x;
                if(heldItem.image.flipX) { xPos -= 25; }
                else { xPos += 25; }
                if(angle != 60) { angle += 180; }
                this.wateringEmitter.setPosition({min: xPos-5, max: xPos+5}, 
                    {min: heldItem.image.y+20, max: heldItem.image.y+30});
                this.wateringEmitter.setAngle(angle);
                this.wateringEmitter.on = true;

                //After a short delay, stop the emitter
                this.time.addEvent({
                    delay: 500,
                    callback: () => {
                        this.wateringEmitter.on = false;
                    },
                    loop: false,
                    callbackScope: this
                });
            },
            loop: false,
            callbackScope: this
        });

        //Set a timer to tilt back from angle
        this.wateringRotate = this.time.addEvent({
            delay: 750,
            callback: () => {
                heldItem.image.angle = 0;
                this.wateringRotate = null;
            },
            loop: false,
            callbackScope: this
        });

    }

    spigotAnimate() {
        if(this.tempCan) { this.tempCan.destroy(); }
        this.tempCan = this.add.image(this.spigot.x - 25, this.spigot.y + this.spigot.height/4, "redwater"+playerVariables.water);
        this.tempCan.flipX = true;
        this.tempCan.depth = this.spigot.depth+1;
        this.tempCan.setScale(.75, .75);

        //Set the particles to the appropriate depth
        this.wateringParticle.setDepth(this.spigot.depth+1);
        //Place emitter and activate it
        this.spigotEmitter.setPosition(this.spigot.x-20, this.spigot.y-20);
        this.spigotEmitter.setAngle({min: 75, max: 105});
        this.spigotEmitter.on = true;

        //After a short delay, stop the emitter
        this.time.addEvent({
            delay: 1000 - playerVariables.water * 250,
            callback: () => {
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        this.tempCan.destroy();
                        this.tempCan = null;
                    },
                    loop: false,
                    callbackScope: this
                });
                this.spigotEmitter.on = false;
            },
            loop: false,
            callbackScope: this
        });
    }

    reenableEsc() {
        console.log("ReenableEsc called");
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        this.backpack.setAlpha(0.9);
    }

    updateMoveHighlight() {
        let loc = this.closestPlot();
        if (loc != null) {
            if (gardenGrid[loc[0]][loc[1]].item instanceof Hive) {
                this.hiveHighlight.alpha = this.highlightOpacity;
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.hiveHighlight.x = coords[0];
                this.hiveHighlight.y = coords[1] + 35;
                this.hiveHighlight.depth = this.hiveHighlight.y / 10 - 5;
                this.sprinklerHighlight.alpha = 0;
            } else if (gardenGrid[loc[0]][loc[1]].item instanceof Sprinkler) {
                this.sprinklerHighlight.alpha = this.highlightOpacity;
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.sprinklerHighlight.x = coords[0];
                this.sprinklerHighlight.y = coords[1] + 35;
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
    }

    textHover() {
        //find the closest interactable point
        let plot = this.closestPlot();
        //If close to water spigot
        if (Math.sqrt(Math.pow(this.spigot.x - this.player.x, 2) +
            Math.pow(this.spigot.y - this.player.y - this.player.height/5, 2)) < 65) {
            //Move display to this spot
            this.plotHighlight.alpha = 1;
            this.plotHighlight.x = this.spigot.x;
            this.plotHighlight.y = this.spigot.y + 25;
            //Logic for if player presses space near water spigot
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //If the player is holding the can
                if(heldItem instanceof WateringCan) {
                    if(playerVariables.water == 4) {
                        //If the can is already full
                        this.fadeText("My watering can\nis already full.");
                    } else if(playerVariables.money >= .25) {
                         //If the player can afford to buy water
                         playerVariables.money -= .25;
                         //Play fill animation
                         heldItem.destroy();
                         this.spigotAnimate();
                         //Create a new Watering Can
                         this.time.addEvent({
                             delay: 1250 - playerVariables.water * 250,
                             callback: () => {
                                 playerVariables.water = 4;
                                 heldItem = new WateringCan();
                                 heldType = "items";
                                 this.heldImg = 0;
                             },
                             loop: false,
                             callbackScope: this
                         });
                    } else {
                        //If player does not have enough money
                        this.fadeText("Not enough money!\nCosts $0.25 to water.");
                    }
                } else if(heldItem == undefined && playerVariables.inventory.items["Watering Can"]) {
                    //If player has can in inventory, pull it out
                    playerVariables.inventory.items["Watering Can"] = 0;
                    if(playerVariables.money >= .25) {
                        //If the player can afford to buy water
                        playerVariables.money -= .25;
                        //Play fill animation
                        this.spigotAnimate();
                        //Create a new Watering Can
                        this.time.addEvent({
                            delay: 1250 - playerVariables.water * 250,
                            callback: () => {
                                playerVariables.water = 4;
                                heldItem = new WateringCan();
                                heldType = "items";
                                this.heldImg = 0;
                            },
                            loop: false,
                            callbackScope: this
                        });
                    } else {
                        //If player does not have enough money
                        this.fadeText("Not enough money!\nCosts $0.25 to water.");
                        //Give them an empty can
                    }
                    heldItem = new WateringCan();
                    this.heldImg = 0;
                } else {
                    this.fadeText("I need something to\nhold the water.");
                }
            }
        } else if (plot == null) {
            //If closest plot is far away, clear highlight
            this.plotHighlight.alpha = 0;
        } else {
            //Else, move highlight to that location
            this.plotHighlight.alpha = 1;
            let coords = this.gridToCoord(plot[1], plot[0]);
            this.plotHighlight.x = coords[0];
            this.plotHighlight.y = coords[1] + 40;
            //Logic for if player presses space near a plot
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                let row = plot[0];
                let col = plot[1];
                //If the space is a weed, remove it
                if(gardenGrid[row][col].item instanceof Weed && this.playerHasPlantedFullFlower){
                    console.log("Player has planted full flower: " + this.playerHasPlantedFullFlower);
                    this.music.playSFX("dig");
                    gardenGrid[row][col].item = null;
                    //recreate the plot
                    gardenGrid[row][col].dug = true;
                    gardenGrid[row][col].renderPlot(this, this.gridToCoord(col, row));
                    if(!this.playerHasDealtWithWeeds){this.playerHasDealtWithWeeds = true; console.log("Player has dealt with weeds.")}
                    return;
                }
                //If player holding the watering can
                if (heldItem instanceof WateringCan && gardenGrid[row][col].item instanceof Flower) {
                    let spot = gardenGrid[row][col];
                    if(playerVariables.water > 0) {
                        this.music.playSFX("waterFlowers");
                        spot.item.addWater();
                        if(!this.playerHasWateredFirstSeed){
                            console.log("Player has watered the first seed");
                            this.playerHasWateredFirstSeed = true;
                        }
                        //Then wet the spot and reduce water
                        spot.water = true;
                        playerVariables.water--;
                        this.imageFlip = heldItem.image.flipX;
                        //clear image of item held so it can be rerendered
                        heldItem.image.destroy();
                        this.heldImg = -1;
                        spot.renderPlot(this, this.gridToCoord(col, row));
                    } else {
                        this.fadeText("I need to go refill\nmy watering can.")
                    }
                }
                //If the player is holding an item, modify garden plots and add image to scene
                else if (heldItem !== undefined) {
                    //If that spot is empty, place item there
                    if (gardenGrid[row][col].item == null || heldItem instanceof Clipper) {
                        //console.log(heldItem);
                        //place held object in the spot
                        this.placeItemHandler(row, col);
                    } else {
                        this.fadeText("This plot is\noccupied");
                    }
                } else {
                    //if the player is attempting to interact with a flower or item, pick it up for now
                    let loc = gardenGrid[row][col];
                    let obj = loc.item;

                    if (!(obj instanceof Bramble) && !(obj instanceof Hive && obj.hasStock())) {
                        //Make sure weed can't be removed too early
                        if(obj instanceof Weed){
                            if(!this.playerHasDealtWithWeeds && this.playerHasPlantedFullFlower){
                                loc.item = null; 
                                console.log("plot is now",gardenGrid[row][col].item);
                                this.playerHasDealtWithWeeds = true;
                                console.log("Player has dealt with weeds.");
                            }
                        }
                        else{
                            loc.item = null; 
                            console.log("plot is now",gardenGrid[row][col].item);
                        }
                    }
                    if(obj instanceof Hive && obj.hasStock()) {
                        //If there is honey to collect from this Hive
                        let message = "";
                        for(let honey in obj.stock) {
                            let jars = Math.floor(obj.stock[honey]);
                            if(jars > 0) {
                                playerVariables.inventory.honey[honey] += jars;
                                playerVariables.inventory.honey["total"] += jars;
                                obj.stock[honey] -= jars;
                                message += "You got "+jars+" jar(s) of "+honey+" honey.\n";
                            }
                        }
                        message += "From "+obj.weeksSinceCollection+" week(s) of production.";
                        obj.weeksSinceCollection = 0;
                        if(loc.honeyIndicator !== null) {  loc.honeyIndicator.destroy(); loc.honeyIndicator = null; }
                        this.fadeText(message);
                    } else {
                        if (obj instanceof Flower || obj instanceof Hive || obj instanceof Sprinkler 
                            || obj instanceof WateringCan) {
                            //If on the bee path, remove it
                            if (obj instanceof Flower || obj instanceof Hive) {
                                this.path = this.removeFromPath(obj.image, this.path);
                            }
                            heldItem = obj;
                            this.heldImg = 0;
                        } else if(obj == null && loc.dug) {
                            this.music.playSFX("dig");
                            loc.dug = false;
                        } else {
                            this.music.playSFX("dig");
                            loc.dug = true;
                        }
                        if(heldItem instanceof Hive || heldItem instanceof Sprinkler || heldItem instanceof WateringCan) {
                            heldType = "items";
                        } else if (heldItem instanceof Flower) {
                            heldType = "flowers";
                        }
                        //recreate the plot
                        loc.renderPlot(this, this.gridToCoord(col, row));
                        console.log("plot rendered as",loc);
                    }
                }
            }
        }
    }

    placeItemHandler(row, col){
        let loc = gardenGrid[row][col];
        //Set the location's item to a new item
        if(heldItem instanceof Clipper) {
            if(loc.item instanceof Bramble) {
                this.music.playSFX("clipperCut");
                loc.item.destroy();
                loc.item = null;
                loc.dug = true;
                loc.renderPlot(this, this.gridToCoord(col, row));
                heldItem.image.destroy(); //Clear the ghost image
            } else {
                return;
            }
        } else {
            if(heldItem instanceof Hive){
                loc.item = new Hive(col, row);
                //clear highlight
                this.hiveHighlightHold.alpha = 0;
                if(!this.playerHasPlacedBeehive){
                    this.music.playSFX("placeItem");
                    console.log("Player has placed beehive");
                    this.playerHasPlacedBeehive = true;
                }
            } else if(heldItem instanceof Sprinkler){
                this.music.playSFX("placeItem");
                loc.item = new Sprinkler(col, row);
                loc.dug = true;
                //clear highlight
                this.sprinklerHighlightHold.alpha = 0;
            } else if(heldItem instanceof WateringCan){
                this.music.playSFX("placeItem");
                loc.item = new WateringCan();
            } else{
                this.music.playSFX("placeItem");
                loc.item = new Flower(heldItem.age, heldItem.water, heldItem.type);
                loc.dug = true;
                if (loc.water) {
                    loc.item.addWater();
                }
                if(!this.playerHasPlantedFirstSeed){
                    this.playerHasPlantedFirstSeed = true;
                    console.log("Player has placed first seed");
                } else if(!this.playerHasPlantedFirstFlower && this.playerHasEquippedFullFlower){
                    console.log("Player has planted full flower");
                    this.playerHasPlantedFullFlower = true;
                }
            }
            heldItem.image.destroy(); //Clear the ghost image
            loc.renderPlot(this, this.gridToCoord(col, row));

            //If a flower or hive, add to bee path
            if (loc.item instanceof Hive || loc.item instanceof Flower) {
                this.path.push([loc.spot.x, loc.spot.y - 25]);
            }
        }

        //check to see if holding stack of seeds
        if (playerVariables.inventory[heldType][heldItem.type] > 0) {
            //if yes, repopulate hand
            console.log("holding another " + heldItem.type);
            this.heldImg = 0;
            playerVariables.inventory[heldType][heldItem.type]--;
            if(heldItem instanceof Hive) {
                heldItem = new Hive(-1, -1);
            } else if(heldItem instanceof Sprinkler) {
                heldItem = new Sprinkler(-1, -1);
            } else if(heldItem instanceof Clipper) {
                heldItem = new Clipper();
            } else if(heldType === "flowers"){
                this.playerHasEquippedFullFlower = true;
                heldItem = new Flower(5, 5, heldItem.type);
            } else {
                heldItem = new Flower(0, 5, heldItem.type);
            }
            console.log(heldItem);
        } else {
            //if not, empty hand
            console.log("No more " + heldItem.type + " to hold")
            //heldItem.image.destroy();
            heldItem = undefined;
            plantingSeeds = false;
            this.heldImg = 0;
        }
    }

    closestPlot() {
        // Helper function to find closest plot, if any within 65 units
        let closestXY = [];
        let closestDist = 65;
        let offsetX = 0;
        let offsetY = 0;
        if(this.player.movingDirection == "up") { 
            offsetY = -15;
        } else if(this.player.movingDirection == "right") {
            offsetX = 45;
        } else if(this.player.movingDirection == "left") {
            offsetX = -45;
        } else if(this.player.movingDirection == "down") {
            offsetY = 20;
        }
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                let coords = this.gridToCoord(col, row);
                if (Math.sqrt(Math.pow(coords[0] - (this.player.x + offsetX), 2) +
                    Math.pow(coords[1] - (this.player.y + this.player.height / 4 + offsetY), 2)) < closestDist) {
                    closestDist = Math.sqrt(Math.pow(coords[0] - (this.player.x + offsetX), 2) +
                        Math.pow(coords[1] - (this.player.y + this.player.height / 4 + offsetY), 2));
                    closestXY = [row, col];
                }
            }
        }
        if (closestDist == 65) {
            //If closest plot is far away, return null
            return null;
        } else {
            //else, return plot coords [row, col]
            return closestXY;
        }
    }

    removeFromPath(object, path) {
        let coords;
        for (let i = 0; i < path.length; i++) {
            coords = path[i];
            if (Math.abs(object.x - coords[0]) < 1 && Math.abs(object.y - 25 - coords[1] < 1)) {
                path.splice(i, 1);
                break;
            }
        }
        return path;
    }

    gridToCoord(gridx, gridy) {
        return [(1 + gridx) * game.config.width / 12, (6 + gridy) * game.config.height / 9 + 15];
    }

    placeHeldItemInBag(){
        console.log(heldItem)
        if (heldItem instanceof Flower) {
            if(heldItem.age <= 1){
                playerVariables.inventory.seeds[heldItem.type] += 1;
            } else{
                playerVariables.inventory.flowers[heldItem.type] += 1;
            }
        } else if (heldItem instanceof Sprinkler) {
            //If item has highlight, hide that as well
            playerVariables.inventory.items["Sprinkler"] += 1;
            this.sprinklerHighlightHold.alpha = 0;
        } else if (heldItem instanceof Hive) {
            playerVariables.inventory.items["Beehive"] += 1;
            this.hiveHighlightHold.alpha = 0;
        } else if (heldItem instanceof WateringCan) {
            playerVariables.inventory.items["Watering Can"] += 1;
        }
         else {
            return;
        }

        heldItem.destroy();
        heldItem = undefined;
        this.heldImg = 0;
    }
    
    setTutorialFlags(){
        this.playerHasEquippedFirstSeed = false;
        this.playerHasPlantedFirstSeed = false;
        this.playerHasWateredFirstSeed = false;
        this.playerHasEquippedFullFlower = false;
        this.playerHasPlantedFirstFlower = false;
        this.playerHasDealtWithWeeds = false;
        this.playerHasPlacedBeehive = false;
        this.currDialogMaximum = -1;
        this.currDialogSection = 1;
        this.playerIsInDialog = false;
        this.tutorialWeedCreated = false;
    }

    advanceTutorial(){
        if(!this.playerHasEquippedFirstSeed){
            if(this.currDialogMaximum != -1){
                return;
            }
            this.advanceTutorialDialog(1);
            this.currDialogMaximum = 3;
            playerVariables.inventory.seeds["Daisy"] += 1;
            playerInventoryUpdated = true;
            inventoryTabsUpdated["seeds"] = true;
        }
        else if(!this.playerHasPlantedFirstSeed){
            if(this.currDialogMaximum != 3){
                console.log("Not planted first seed, dialog max is" + this.currDialogMaximum);
                return;
            }
            this.advanceTutorialDialog(4);
            this.currDialogMaximum = 4;
        }
        else if(!this.playerHasWateredFirstSeed){
            if(this.currDialogMaximum != 4){
                return;
            }
            this.advanceTutorialDialog(5);
            this.currDialogMaximum = 6;
        }
        else if(!this.playerHasPlantedFullFlower){
            if(this.currDialogMaximum != 6){
                return;
            }
            this.advanceTutorialDialog(7);
            this.currDialogMaximum = 8;
            playerVariables.inventory.flowers["Daisy"] += 2;
            playerInventoryUpdated = true;
            inventoryTabsUpdated["flowers"] = true;
        }
        else if(!this.playerHasDealtWithWeeds){
            if(!this.tutorialWeedCreated){
                let idealRow = 0;
                let idealCol = 10;
                console.log("About to look at grid [", idealRow, ", ", idealCol, "], which has ", gardenGrid[idealRow][idealCol].item);
                if(gardenGrid[idealRow][idealCol].item != null){
                    let colOffset = 0;
                    let rowOffset = 0;
                    let satisfied = false;
                    while(!satisfied){
                        colOffset += 1;
                        console.log("About to look at grid [", idealRow, ", ", idealCol, "], which has ", gardenGrid[idealRow][idealCol].item);
                        if(gardenGrid[idealRow + rowOffset][idealCol - colOffset].item == null){
                            satisfied = true;
                            idealRow += rowOffset;
                            idealCol -= colOffset;
                        }
                        else if(colOffset %3 == 0 && colOffset != 0){
                            colOffset = -1;
                            rowOffset += 1;
                        }
                    }
                }
                let tempWeedLoc = this.gridToCoord(idealCol, idealRow);
                gardenGrid[idealRow][idealCol].item = new Weed(tempWeedLoc[0], tempWeedLoc[1]);
                gardenGrid[idealRow][idealCol].renderPlot(this, tempWeedLoc);
                this.tutorialWeedCreated = true;
            }
            if(this.currDialogMaximum != 8){
                return;
            }
            this.advanceTutorialDialog(9);
            this.currDialogMaximum = 9;
        }
        else if(!this.playerHasPlacedBeehive){
            if(this.currDialogMaximum != 9){
                return;
            }
            this.advanceTutorialDialog(10);
            this.currDialogMaximum = 10;
            playerVariables.inventory.items["Beehive"] = 1;
            playerInventoryUpdated = true;
            inventoryTabsUpdated["items"] = true;
        }
        else if(this.playerHasPlacedBeehive){
            if(this.currDialogMaximum != 10){
                return;
            }
            this.advanceTutorialDialog(11);
            this.currDialogMaximum = 15;
        }
    }

    advanceTutorialDialog(num){
        //Place the text and backdrop
        this.tutorialTextBackdrop.x = this.cameras.main.scrollX + 62;
        this.tutorialTextBackdrop.y = this.cameras.main.scrollY + 32;
        console.log("Tutorial Text: [", this.tutorialTextBackdrop.x, ", ", this.tutorialTextBackdrop.y, "]");
        this.tutorialTextBackdrop.alpha = 1;
        this.spaceContinue.x = this.cameras.main.scrollX + 4*config.width/5 - 15;
        this.spaceContinue.y = this.cameras.main.scrollY + 4*config.height/5 + 8;
        this.spaceContinue.setVisible(true);
        this.tutorialDialog.x = this.cameras.main.scrollX + 220;
        this.tutorialDialog.y = this.cameras.main.scrollY + 3.25*config.height/5 - 40;
        this.tutorialDialog.setVisible(true);
        //this.talkingBee.alpha = 1;
        //this.talkingBee.x = this.cameras.main.scrollX + config.width/3;
        //this.talkingBee.y = this.cameras.main.scrollY + config.height/3;
        this.playerIsInDialog = true;

        //Set the current text
        switch(num){
            case 1:
                this.tutorialDialog.text =
`Hi, I'm Beetholomew, your local honey making helper. Thank
you for agreeing to help us restore this garden.`;
                break;
            case 2:
                this.tutorialDialog.text =
`First things first, if you want to make honey to fundraise, you
are going to need some flowers. Open your inventory and
equip a daisy seed.`;
                break;
            case 3:
                this.tutorialDialog.text =
`You can open your inventory by clicking on the backpack icon,
or by pressing I. This will also put away whatever you are
currently holding.`;
                break;
            case 4:
                this.tutorialDialog.text =
`Great. Now find a nice plot of dirt to plant it in. You can use
SPACE to use whatever is in your hands, or to interact with
things that are nearby.`;
                break;
            case 5:
                this.tutorialDialog.text =
`Of course, to make it grow, it will need some water. Go and
grab the watering can and water it.`;
                break;
            case 6:
                this.tutorialDialog.text =
`It does cost 25 cents to fill the watering can, so you'll need to
make sure you always save a little extra for the plants.`;
                break;
            case 7:
                this.tutorialDialog.text =
`Some flowers are more expensive and take longer to grow,
but people want their honey more. Here are a few fully
grown daisies to make sure we can make some honey for you
by next week.`;
                break;
            case 8:
                this.tutorialDialog.text =
`If you want to dig up a patch of dirt, or cover one with
grass, all you have to do is interact with it.`;
                break;
            case 9:
                this.tutorialDialog.text =
`Weeds interfere with the ability of nearby flowers to make
pollen. Luckily, all you have to do to get rid of a weed is to
interact with it. Could you deal with the one by the spigot?`;
                break;
            
            case 10:
                this.tutorialDialog.text =
`Now, to actually make some delicious honey, you are going to
need a few friends like me to help. Here's a beehive for you
to place.`;
                break;
            case 11:
                this.tutorialDialog.text =
`Beehives only collect pollen from nearby flowers, and make
honey based on what the most populous type around it is. If
you want to control that, you can pick up and move your
flowers and seedlings.`;
                break;
            case 12:
                this.tutorialDialog.text =
`As the number of flowers around a beehive increases, the
harder it becomes for us to turn all of the pollen into honey,
so flowers do have some diminishing returns.`;
                break;
            case 13:
                this.tutorialDialog.text = 
`Getting multiple beehives will help with making more honey. If
a beehive is mostly collecting from one type of flower, it will
create that type of honey.`;
                break;
            case 14:
                this.tutorialDialog.text =
`To deal with all of those brambles cluttering up the place,
you are going to need some clippers. We have some coming
for you next week, but you can also get more in town if
you need.`;
                break;
            case 15:
                this.tutorialDialog.text =
`That's all for today. Before you go to sleep at your cave,
make sure to water that new flower. See you next week!`;
                break;
            default:
                console.log("Supposedly unreachable tutorial dialog reached");
        }
    }

    concludeTutorialDialog(){
        this.tutorialTextBackdrop.alpha = 0;
        this.tutorialDialog.setVisible(false);
        this.spaceContinue.setVisible(false);
        //this.talkingBee.alpha = 0;
        this.playerIsInDialog = false;
    }
}