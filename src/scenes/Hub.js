class Hub extends Phaser.Scene {
    constructor() {
        super("hubScene");
    }

    init(data) {
        //See where you are returning from
        this.previousScene = data.previousScene;
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        //Initialize various global variables
        this.worldWidth = 960; //Set the width of the scene
        this.worldHeight = 1080; //Set the height of the scene
        this.heldImg = 0; //Determines which item is being held by the player
        this.bounceFactor = .1; //Constant for images bouncing
        this.counter = 0; //A generic counter
        this.fadeTimer = null; //A tracker for whether a message needs to fade
        this.pointerCurrentlyOver = ""; //Tracks which interactable object the cursor is over
        this.popupVisited = false; //Tracks whether the scene was paused for a popup scene

        //If coming from the menu, load data
        if (this.previousScene === "menuScene") {
            this.loadData();
        } else {
            this.saveData();
        }

        //If coming from the menu or the market, advance to the next day
        if (this.previousScene === "hubScene" || this.previousScene === "marketScene" 
         || this.previousScene === "tutorialScene") {
            //Advance to the next day
            this.advanceDay();
        }

        //Initialize Controls
        this.createControls();
        //Initialize Background Elements
        this.createBackgroundImages();

        //background music for the hub
        this.music = new BGMManager(this);
        if(hasSoldForDay){
            this.music.playSong("ranchMusic", true);
        }
        else{
            this.music.playSong("hubMusic", true);
        }
        this.music.setVolume(config.volume);

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
        //Initialize Animations
        this.createAnimations();

        //Check for special cases
        if ((this.previousScene === "hubScene" || this.previousScene === "tutorialScene") && !(this.popupVisited)) {
            playerVariables.score = calculateEcologyScore();
            let hasWon = true;
            for(let star of playerVariables.score) { if(!star) { hasWon = false; break; } }
            if(!(playerVariables.hasWon) && hasWon && this.previousScene === "hubScene") {
                this.popupVisited = true;
                playerVariables.hasWon = true;
                this.music.pauseBetweenScenes();
                this.scene.pause();
                this.music.stop();
                this.scene.start("winScene");
            } else {
                this.popupVisited = true;
                this.music.pauseBetweenScenes();
                this.scene.pause();
                dailySprinklerCost = this.startingMoneyForPopup - playerVariables.money;
                if(this.previousScene === "tutorialScene"){
                    this.scene.launch("hubPopupScene", {previousScene: "hubScene",
                                                        fromTutorial:true});
                } else {
                    this.scene.launch("hubPopupScene", {previousScene: "hubScene",
                                                        fromTutorial:false});
                }
            }
        } 

        //Check for benches
        this.benchList = [];
        this.createListOfBenches();
        this.sittingNPCS = this.createSittingNPCS();
        console.log("Sitting NPCS :", this.sittingNPCS);

        //Check to see if an NPC should sit
    }

    update() {
        //Check if the pause menu should be activated
        this.updateCheckPause();

        //Scroll clouds
        this.sky.tilePositionX += 0.08;

        //Move the backpack icon to be be relative to the player
        this.updateMoveUI();

        //if the player is holding an object, render it and move it alongside the player
        if (heldItem !== undefined) {
            this.updateHeldItemBehavior();
        }

        //Check various keyboard inputs
        this.updateCheckMiscKeyboard();

        //Check if the player is near any interactable zones
        this.updateCheckNearLocation();

        //Place flower text over nearest spot for interaction
        this.textHover(false);

        //Put highlight over objects if standing near them
        this.updateMoveHighlight();

        //Update other things existing in the scene
        this.updateSwarm();

        //Update player movement and location
        this.previousPlayerPosition = [this.player.x, this.player.y];
        //Make sure the player cannot move while watering
        if(!(this.wateringEmitter.on || this.tempCan)) { 
            this.player.update();
            if(hasSoldForDay) { this.player.shadow.x = this.player.x - 35; }
        }
        this.player.depth = this.player.y / 10 + 3;
        this.updateCheckCollisions();

        //Misc Updates
        this.counter++;
        if (this.counter % 60 === 0) {
            this.bounceFactor = -this.bounceFactor;
        }
        if(playerInventoryUpdated){
            this.backpack.setFrame(1);   
        }
    }

    advanceDay() {
        currentDay += 1;
        hasSoldForDay = false;
        //console.log("Advancing to day " + currentDay);
        //If you are returning to the hub
        //console.log("Welcome back. Honey was " + playerVariables.inventory.honey["total"]);
        this.startingHoneyForPopup = {
            "yellow": playerVariables.inventory.honey["yellow"],
            "blue": playerVariables.inventory.honey["blue"],
            "purple": playerVariables.inventory.honey["purple"],
            "pink": playerVariables.inventory.honey["pink"]
        };
        this.startingMoneyForPopup = playerVariables.money;

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
        let toSpread = Phaser.Math.Between(0, 2);
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
                //console.log("Curr Plot", gardenGrid[row][col]);
                gardenGrid[row][col].renderPlot(this, this.gridToCoord(col, row));
            }
        }

        //console.log("Honey increases to " + playerVariables.inventory.honey["total"]);

        //Refresh Shop
        shopInventory["Seeds"]["Daisy\nSeeds"]["amount"] = 2;
        shopInventory["Seeds"]["Delphinium\nSeeds"]["amount"] = 3;
        shopInventory["Seeds"]["Lavender\nSeeds"]["amount"] = 3;
        shopInventory["Seeds"]["Tulip\nSeeds"]["amount"] = 3;
        shopInventory["Items"]["Beehive"]["amount"] = 2;
        shopInventory["Items"]["Sprinkler"]["amount"] = 2;
        shopInventory["Items"]["Clipper"]["amount"] = 4 + Math.floor(currentDay/4);
        shopInventory["Items"]["Clipper"]["cost"] = Math.max(2, 3 - .25* Math.floor(currentDay/6));
        if(playerVariables.waterLvl == 1) { shopInventory["Items"]["Purple Can"]["amount"] = 1; }
        shopInventory["Decorations"]["Bench"]["amount"] = 1;
        shopInventory["Decorations"]["Bush"]["amount"] = 2;
        shopInventory["Decorations"]["Hedge"]["amount"] = 2;
        shopInventory["Decorations"]["Fence"]["amount"] = 4;
    }

    createControls() {
        //establish controls for gameplay
        this.pointer = this.input.activePointer;

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
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
        keyZ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    }

    createPlayer() {
        //Establish the sprite
        if(this.previousScene === "shopScene"){
            this.player = new HubPlayer(this, 'player', 0, config.width / 5, config.height / 3, this.worldWidth, this.worldHeight, [[game.config.width + 50, 115]]);
        }
        else{
            this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 3, this.worldWidth, this.worldHeight, [[game.config.width + 50, 115]]);
        }
        this.player.depth = this.player.y / 10;
        this.player.setLowerLeftLimit(2 * config.height / 5 + 65);
        
        if(hasSoldForDay) { 
            this.player.shadow.alpha = .35;
            this.player.shadow.setScale(1.25, .5);
         }
    }

    createCamera() {
        //Provide basic controls
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.setBounds(0, -240, this.worldWidth, this.worldHeight +240);
        this.cameras.main.setZoom(1);
        this.cameras.main.setZoom(1.15);
        //this.cameras.main.setTint(0x000000);
        //Have it track the player
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.player, true, 0.4, 0.4);
    }

    createBackgroundImages() {
        //If the player has sold for day, load evening sprites instead
        let timeMod = "";
        if(hasSoldForDay){
            timeMod = "Evening";
            this.skybox = this.add.image(0, -245, "hubEveningBandaid").setOrigin(0, 0).setScale(0.5).setDepth(1);
        }

        //Load the sky
        this.skybox = this.add.image(0, -241.5, "hubSky" + timeMod).setOrigin(0, 0).setScale(0.5).setDepth(-5);

        //Load the clouds
        this.sky = this.add.tileSprite(0, -241.5 - 85, 0, 0, 'hubClouds').setOrigin(0, 0).setScale(0.5, 0.5).setDepth(-4);
        //Load back trees if desired
        this.backTrees = null;
        this.loadBackTrees(timeMod);
        
        //Load the fence/sign
        this.backgroundFence = null;
        this.loadFence();

        //Load the background
        this.background = this.add.image(0, -241.5, 'gardenBackground' + timeMod).setOrigin(0, 0).setScale(0.5).setDepth(-1);

        //Load the path
        this.backgroundTrail = null;
        this.loadTrail();

        //Load the shadows
        this.backgroundShadows = null;
        this.loadShadows(timeMod);

        this.sunsetTint = this.add.image(0, -241.5, "hubEveningOverlay").setOrigin(0, 0).setScale(0.5).setDepth(288);
        this.sunsetTint.alpha = 0;
        if (hasSoldForDay) {
            this.sunsetTint.alpha = 1;
        }
    }

    loadBackTrees(timeMod){
        this.backTrees = null;
        if(playerVariables.hubBackgroundTrees){
            this.backTrees = this.add.image(0, -241.5, "hubBackTrees" + timeMod)
            .setOrigin(0, 0).setScale(0.5).setDepth(-3);
            if(!hasSoldForDay){
                this.daytimeBandaid = this.add.image(0, -245, "hubDaytimeBandaid").setOrigin(0, 0).setScale(0.5).setDepth(1);
            }
        }
    }

    loadFence(){
        let fenceKey = "hubFenceWood";
        if(playerVariables.hubIronFence){
            fenceKey = "hubFenceIron";
        }
        this.backgroundFence = this.add.image(0, -241.5, fenceKey)
        .setOrigin(0, 0).setScale(0.5).setDepth(-2);
    }

    loadTrail(){
        let trailStyleKey = "hubTrail";

        //Set the path's type
        if(playerVariables.hubBrickPath){
            trailStyleKey += "Brick";
        }
        else{
            trailStyleKey += "Dirt";
        }

        this.backgroundTrail = this.add.image(0, -243.5, trailStyleKey)
        .setOrigin(0, 0).setScale(0.5).setDepth(0);
    }

    loadShadows(timeMod){
        let shadowKey = "hubShadows";

        //Check back trees
        if(playerVariables.hubBackgroundTrees){
            shadowKey += "BackTrees";
        }

        //Check fence
        if(playerVariables.hubIronFence){
            shadowKey += "IronFence";
        }
        else{
            shadowKey += "WoodFence";
        }

        //Add in time
        shadowKey += timeMod;

        this.backgroundShadows = this.add.image(0, 0, shadowKey).setOrigin(0, 0).setScale(0.5).setDepth(1);
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

        //create interactible backpack image
        this.backpack = this.add.image(this.cameras.main.scrollX + config.width - 122, 
            this.cameras.main.scrollY + config.height/5 - 10, 'backpackFrames')
            .setInteractive().setAlpha(.9).setScale(.87).setDepth(300);
        this.backpack.on('pointerover', () => {
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
                this.music.playSFX("backpackOpen");
                this.placeHeldItemInBag();
                this.backpack.setFrame(0);
                this.backpack.setAlpha(0);
                playerInventoryUpdated = false;
                this.scene.pause('hubScene');
                this.scene.launch("backpackUI", {previousScene: "hubScene"});
            });

        //Tracker for Money and total Honey
        this.infoDisplay = new InfoDisplay(this, "infoBox", 0, "Hub");
        this.infoDisplay.setDepth(295);


        //Popups under the backpack for collecting Honey
        this.popupTimers = {
            "yellow": null,
            "blue": null,
            "purple": null,
            "pink": null
        };
        this.popupImages = {
            "yellow": new HoneyPopup(this, 0, 0, 0, "Yellow"),
            "blue": new HoneyPopup(this, 0, 0, 0, "Blue"),
            "purple": new HoneyPopup(this, 0, 0, 0, "Purple"),
            "pink": new HoneyPopup(this, 0, 0, 0, "Pink")
        };
    }

    createText() {
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
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
        //If the player has already sold for the day, display text openly
        if (hasSoldForDay) {
            this.caveText.text = "Press SPACE to rest\nuntil next week";
        }
        //If the player has not sold yet, only show the text if they go over it
        else {
            this.caveText.text = "Press SPACE to end the week early";
            this.caveText.setVisible(false);
        }

        //Popups to fade out
        this.fadeMessage = this.add.text(this.player.x, this.player.y, "Nada", this.textConfig);
        this.fadeMessage.setOrigin(0.5).setVisible(false);
        this.fadeMessage.depth = 200;
    }

    createEvents() {
        //Make sure the escape keybinding isn't consumed by the backpack UI
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.resumeBetweenScenes();
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
            keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
            this.backpack.setAlpha(.9);
        });

        //Simulate a space press on pointer input
        this.input.on('pointerdown', function (pointer) {
            console.log("Pointer is currently over: " + this.pointerCurrentlyOver);
            if (this.pointerCurrentlyOver === "backpack") {
                console.log("Pointer currently over backpack");
            } else {
                console.log("Pointer currently not over anything interactable");
                //this.player.moveTo(pointer.worldX, pointer.worldY, this.pointerCurrentlyOver);
                this.textHover(true);
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
                if(plot.item instanceof Flower){
                    plot.item.waveStart = false;
                }
                plot.renderPlot(this, coords);
                if(plot.item instanceof Hive || (plot.item instanceof Flower && plot.item.isFullyGrown())) {
                    this.path.push([coords[0], coords[1] - 25]);
                }
            }
        }

        //Create water spigot to refill Watering Can
        this.spigot = this.add.image(.925 * config.width, .525 * config.height, "spigot");
        this.spigot.setOrigin(.5, .5).setScale(.75, .75);
        this.spigot.depth = this.spigot.y / 10;
        this.waterHeld = null;
    }

    createBees() {
        //Create bee swarm for simulated pollination
        console.log("makin some beeeeeees");
        this.swarm = [];
        let numBees = 3 + 2 * this.numHives;     //5 seems to be a good base for flower following to look decent
        for (let i = 0; i < numBees; ++i) {
            let temp;
            if(this.path.length > 0) {
                let rand = Phaser.Math.Between(0, this.path.length-1);
                temp = new Bee(this, 'bearBee', 0, this.path[rand][0], this.path[rand][1]);
            } else {
                temp = new Bee(this, 'bearBee', 0, this.worldWidth/2 + Phaser.Math.Between(-15, 15), this.worldHeight);
            }
            temp.setOrigin(.5).setScale(.25, .25).setVisible(true);
            temp.depth = 101;
            this.swarm.push(temp);
        }
    }

    createListOfBenches(){
        let skipNext = false;
        for(let row = 0; row < gardenGrid.length; row++) {
            for(let col = 0; col < gardenGrid[0].length; col++) {
                if(skipNext){
                    skipNext = false;
                } else{
                    let loc = gardenGrid[row][col].item;
                    if(loc instanceof DecorativeWide && loc.type === "Bench") {
                        console.log("Found a bench at [", col, ", ", row, "]");
                        this.benchList.push([col, row]);
                        skipNext = true;
                    }
                }
            }
        }
    }

    createSittingNPCS(){
        let usedNPCs = [];
        let scoreModifier = 0;
        for(let elem = 0; elem < 5; ++elem){
            if(playerVariables.score[elem]){
                ++scoreModifier;
            }
        }
        for(let i = 0; i < this.benchList.length; ++i){
            let npcChance = Phaser.Math.Between(0, 12);
            npcChance += scoreModifier;
            if(npcChance > 8){
                console.log("An npc has been selected to sit here");
                console.log("Getting world pos of [", this.benchList[i][0], ", ", this.benchList[i][1], "]");
                let leftLoc = this.gridToCoord(this.benchList[i][0], this.benchList[i][1]);
                let currNPC = new NPC(this, leftLoc[0] + 75, leftLoc[1] + 45);
                currNPC.setScale(0.35, 0.35);
                currNPC.depth = (leftLoc[1] - 30)/10  + 5;
                usedNPCs.push(currNPC);
                //Give 'em a shadow
                this.add.image(currNPC.x - 35, currNPC.y - 10, "bearShadow")
                    .setScale(.5,.5).setDepth(currNPC.depth-1).setAlpha(.9);
            }
            else{
                usedNPCs.push(null);
            }

        }
        return usedNPCs;
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
            this.music.pauseBetweenScenes();
            this.scene.pause();
            this.scene.launch("hubPopupScene", {previousScene: "hubScene",
                                                    fromTutorial:false});
            //this.scene.launch("pauseScene", {previousScene: "hubScene"});
        }
    }

    updateMoveUI() {
        //move backpack icon alongside player and camera
        this.backpack.x = this.cameras.main.scrollX + config.width - 122;
        this.backpack.y = this.cameras.main.scrollY + config.height/5 - 10;
        for(let honeyType in this.popupImages) {
            this.popupImages[honeyType].changePosition(this.backpack.x, this.backpack.y + 75);
        }
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
            let loc = this.closestPlot();
            this.sprinklerHighlightHold.alpha = this.highlightOpacity;
            if(loc != null) {
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.sprinklerHighlightHold.x = coords[0];
                this.sprinklerHighlightHold.y = coords[1] + 35;
            } else {
                this.sprinklerHighlightHold.x = this.player.x;
                this.sprinklerHighlightHold.y = this.player.y + 35;
            }
            this.sprinklerHighlightHold.depth = this.sprinklerHighlightHold.y / 10 + 5;
            this.hiveHighlightHold.alpha = 0;
        } else if (heldItem instanceof Hive) {
            let loc = this.closestPlot();
            this.hiveHighlightHold.alpha = this.highlightOpacity;
            if(loc != null) {
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.hiveHighlightHold.x = coords[0];
                this.hiveHighlightHold.y = coords[1] + 35;
            } else {
                this.hiveHighlightHold.x = this.player.x;
                this.hiveHighlightHold.y = this.player.y + 35;
            }
            this.hiveHighlightHold.depth = this.hiveHighlightHold.y / 10 + 5;
            this.sprinklerHighlightHold.alpha = 0;
        } else {
            this.sprinklerHighlightHold.alpha = 0;
            this.hiveHighlightHold.alpha = 0;
        }

        //Input to place item in backpack
        if (Phaser.Input.Keyboard.JustDown(keyB) || Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyI)) {
            if(this.wateringRotate == null) {
                this.placeHeldItemInBag();
                playerInventoryUpdated = true;
            }
        }
    }

    updateCheckMiscKeyboard() {
        //If the player press B open the backpack
        if (Phaser.Input.Keyboard.JustDown(keyB) || Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyI)) {
            this.music.playSFX("backpackOpen");
            this.scene.pause('hubScene');
            this.scene.launch("backpackUI", {previousScene: "hubScene"});
        }

        // -------------------------------------------
        // Quick day advancement for testing purposes
        if (Phaser.Input.Keyboard.JustDown(keyP) && Phaser.Input.Keyboard.JustDown(keyZ)) {
            this.advanceDay();
        }
        if (Phaser.Input.Keyboard.JustDown(keyO) && Phaser.Input.Keyboard.JustDown(keyZ)) {
            playerVariables.money += 10;
        }
        if (Phaser.Input.Keyboard.JustDown(keyH) && Phaser.Input.Keyboard.JustDown(keyZ)) {
            playerVariables.inventory.honey["yellow"] += 3;
            playerVariables.inventory.honey["total"] += 3;
        }
        if (Phaser.Input.Keyboard.JustDown(keyJ) && Phaser.Input.Keyboard.JustDown(keyZ)) {
            playerVariables.inventory.honey["blue"] += 3;
            playerVariables.inventory.honey["total"] += 3;
        }
        if (Phaser.Input.Keyboard.JustDown(keyK) && Phaser.Input.Keyboard.JustDown(keyZ)) {
            playerVariables.inventory.honey["pink"] += 3;
            playerVariables.inventory.honey["total"] += 3;
        }
        if (Phaser.Input.Keyboard.JustDown(keyL) && Phaser.Input.Keyboard.JustDown(keyZ)) {
            playerVariables.inventory.honey["purple"] += 3;
            playerVariables.inventory.honey["total"] += 3;
        }
        // -------------------------------------------
    }

    updateCheckNearLocation() {
        //Check if the player is close enough to the cave to rest
        if (Math.abs(Phaser.Math.Distance.Between(this.caveText.x, this.caveText.y,
            this.player.x, this.player.y)) < 100) {
            if (!hasSoldForDay) {
                this.caveText.setVisible(true);
            }
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //Go to hub and start next day
                this.placeHeldItemInBag();
                this.music.transitionSong("bedtimeMusic", false);
                this.cameras.main.fadeOut(5000, 0, 0, 0);
                this.time.delayedCall(5250, () => {
                    this.placeHeldItemInBag();
                    this.music.stop();
                    this.scene.start('hubScene', {previousScene: "hubScene"});
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

    updateSwarm() {
        for (let i = 0; i < this.swarm.length; i++) {
            this.swarm[i].update();
            if(this.path.length) { this.swarm[i].flock(this.swarm, this.path, this.player); }
            else { this.swarm[i].flock(this.swarm, [[this.player.x, this.player.y]], this.player); }
        }
    }

    fadeText(message) {
        if (this.fadeTimer != null) {
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

    honeyFadePopup(honeyType, amount) {
        if(this.popupTimers[honeyType] != null) {
            this.popupTimers[honeyType].callback = () => {};
            this.popupTimers[honeyType].delay = 0;
            this.popupTimers[honeyType] = null;
        }
        this.popupImages[honeyType].setAmount(amount);
        this.popupImages[honeyType].visibility(true);
        this.popupTimers[honeyType] = this.time.addEvent({
            delay: 1750,
            callback: () => {
                //console.log("turning invisible",this.popupTimers[honeyType]);
                this.popupImages[honeyType].visibility(false);
                this.popupTimers[honeyType] = null;
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
                //Set the particles to the appropriate depth
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
        let color = "red";
        if(playerVariables.waterLvl == 1) { color = "blue"; }
        else if(playerVariables.waterLvl == 2) { color = "purple"; }
        this.tempCan = this.add.image(this.spigot.x - 25, this.spigot.y + this.spigot.height/4, color+"water"+playerVariables.water);
        this.tempCan.flipX = true;
        this.tempCan.depth = this.spigot.depth+1;
        this.tempCan.setScale(.75, .75);

        //Set the particles to the appropriate depth
        this.wateringParticle.setDepth(this.spigot.depth+1);
        //Place emitter and activate it
        this.spigotEmitter.setPosition(this.spigot.x-20, this.spigot.y-20);
        this.spigotEmitter.setAngle({min: 75, max: 105});
        this.spigotEmitter.on = true;

        this.music.playSFX("spigotFill");

        //After a scaling delay, stop the emitter
        this.time.addEvent({
            delay: 250 + (250 * (4 + playerVariables.waterLvl)) - (playerVariables.water * 250),
            callback: () => {
                this.time.addEvent({
                    delay: 250,
                    callback: () => {
                        this.tempCan.destroy();
                        this.tempCan = null;
                        this.music.stopSFX();
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
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    }

    updateMoveHighlight() {
        let loc = this.closestPlot();
        if (loc != null) {
            if (gardenGrid[loc[0]][loc[1]].item instanceof Hive) {
                this.hiveHighlight.alpha = this.highlightOpacity;
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.hiveHighlight.x = coords[0];
                this.hiveHighlight.y = coords[1] + 35;
                this.hiveHighlight.depth = this.hiveHighlight.y / 10 + 5;
                this.sprinklerHighlight.alpha = 0;
            } else if (gardenGrid[loc[0]][loc[1]].item instanceof Sprinkler) {
                this.sprinklerHighlight.alpha = this.highlightOpacity;
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.sprinklerHighlight.x = coords[0];
                this.sprinklerHighlight.y = coords[1] + 35;
                this.sprinklerHighlight.depth = this.sprinklerHighlight.y / 10 + 5;
                this.hiveHighlight.alpha = 0;
            } else {
                this.hiveHighlight.alpha = 0;
                this.sprinklerHighlight.alpha = 0;
            }
            for(let row = loc[0]; row <= loc[0] + 2; row++) {
                if(row >= 0 && row < gardenGrid.length) {
                    for(let col = loc[1] - 2; col <= loc[1] + 2; col++) {
                        if(col >= 0 && col < gardenGrid[0].length) {
                            gardenGrid[row][col].setTransparency(1);
                        }
                    }
                }
            }
            if(loc[0] + 1 > 0 && loc[0] + 1 < gardenGrid.length) {
                for(let col = loc[1] - 1; col <= loc[1] + 1; col++) {
                    if(col >= 0 && col < gardenGrid[0].length) {
                        gardenGrid[loc[0]+1][col].setTransparency(playerVariables.frontAlpha);
                    }
                }
            }
        } else {
            this.hiveHighlight.alpha = 0;
            this.sprinklerHighlight.alpha = 0;
            for(let i = 0; i < gardenGrid[0].length; i++) {
                for(let j = 0; j < gardenGrid.length; j++) {
                    gardenGrid[j][i].setTransparency(1);
                }
            }
            this.player.slow = false;
        }
    }

    updateCheckCollisions() {
        //Check if the player is close enough to the way to town
        if (this.player.x < -35 && this.player.x > -300) {
            this.music.stop();
            this.music.playSFX("mapTransition");
            this.player.x -= 500;
            this.time.delayedCall(300, () => {
                this.music.stop();
                this.placeHeldItemInBag();
                this.scene.start('shopScene', {previousScene: "hubScene"});
                this.scene.stop();
            });
        }
        let coords = this.closestPlot();
        if(coords) {
            let obj = gardenGrid[coords[0]][coords[1]].item;
            if(obj instanceof Bramble || obj instanceof Hive) {
                obj = obj.image;
                if(this.player.x + this.player.width/2 < obj.x + 120 
                    && this.player.x - this.player.width/2 > obj.x - 120
                    && this.player.y + this.player.height/3 > obj.y) {
                    //Overlapping significantly
                    this.player.x = this.previousPlayerPosition[0];
                    this.player.y = this.previousPlayerPosition[1];
                    if(gardenGrid[coords[0]][coords[1]].item instanceof Bramble) {
                        this.player.slow = true;
                        this.fadeText("Ow! Those are\nprickly brambles.");
                    }
                }
            } else if(obj instanceof DecorativeWide){
                if(!this.moodPopUp){
                    if(this.checkBenchOccupied(coords[0], coords[1])){
                        let popUpX = this.gridToCoord(coords[1], coords[0])[0] + 5;
                        if(obj.isLeft){
                            popUpX += 80
                        }
                        this.moodPopUp = this.add.image(popUpX, this.gridToCoord(coords[1], coords[0])[1] - 85, "happy").setDepth(100).setScale(.2);
                        this.time.delayedCall(4750, () => {
                            this.moodPopUp.destroy();
                            this.moodPopUp = null;
                        });
                    }
                    else {
                        //console.log("Bench is empty");
                    }
                }
            } else {
                this.player.slow = false;
            }
        }
    }

    checkBenchOccupied(row, col){
        for(let currBench = 0; currBench < this.benchList.length; ++currBench){
            //console.log("For currBench, comparing [", this.benchList[currBench][1], ", ", this.benchList[currBench][0], "] to [", row, ", ", col, "] and [", row, ", ", (col-1), "]");
            if(this.benchList[currBench][1] == row &&
                (this.benchList[currBench][0] == col || this.benchList[currBench][0] == (col -1))){
                if(this.sittingNPCS[currBench] != null){
                    //console.log("There was an npc on the bench: ", this.sittingNPCS[currBench]);
                    return true;
                }
                else{
                    //console.log("THere was not an npc on the bench: ",this.sittingNPCS[currBench]);
                    return false;
                }
            }
        }
        return false;
    }

    textHover(receivedMouseInput) {
        if(heldItem instanceof Camera &&
            (Phaser.Input.Keyboard.JustDown(keySPACE) || receivedMouseInput)) {
            //Take a picture of the garden
            if(!(this.flash) || this.flash.alpha <= 0.1) {
                //Flicker UI to hide from snapshot
                if(playerVariables.snapshotHideUI) {
                    this.backpack.alpha = 0;
                    this.infoDisplay.setTransparency(0);
                    this.plotHighlight.alpha = 0;
                }

                this.cameras.main.setZoom(.5);

                game.renderer.snapshotArea(0, 0, this.worldWidth/2, this.worldHeight, function (image) {
                    //Code taken from https://phaser.discourse.group/t/save-canvas-using-phaser3/2786
                    var MIME_TYPE = "image/png";
                    var imgURL = image.src;
                    var dlLink = document.createElement('a');
                    dlLink.download = "HoneybearSnapshot";
                    dlLink.href = imgURL;
                    dlLink.dataset.downloadurl = [MIME_TYPE, dlLink.download, dlLink.href].join(':');
                    document.body.appendChild(dlLink);
                    dlLink.click();
                    document.body.removeChild(dlLink);
                });
                

                this.time.addEvent({
                    delay: 350,
                    callback: () => {
                        this.cameras.main.setZoom(1.15);
                        if(playerVariables.snapshotHideUI) {
                            this.backpack.alpha = .9;
                            this.infoDisplay.setTransparency(1);
                            this.plotHighlight.alpha = 1;
                        }

                        //Create a flash to visually represent camera flash
                        this.flash = this.add.rectangle(this.worldWidth/2, this.worldHeight/2, this.worldWidth,
                            this.worldHeight, 0xFFFFFF);
                        this.flash.depth = 1000;

                        this.flashFade = this.time.addEvent({
                            delay: 100,
                            callback: () => {
                                if(this.flash.alpha >= 0) {
                                    this.flash.alpha -= .05;
                                }
                            },
                            loop: true,
                            callbackScope: this
                        });
                    },
                    loop: false,
                    callbackScope: this
                });

                

            } else {
                //Camera animation is currently happening
                //Do nothing
            }
        } else {
            //find the closest interactable point
            let plot = this.closestPlot();
            //If close to water spigot
            if (Math.sqrt(Math.pow(this.spigot.x - this.player.x, 2) +
                Math.pow(this.spigot.y - this.player.y - this.player.height/5, 2)) < 65) {
                //Move display to this spot
                this.plotHighlight.alpha = 1;
                this.plotHighlight.x = this.spigot.x;
                this.plotHighlight.y = this.spigot.y + this.spigot.height/3;
                //Logic for if player presses space near water spigot
                if (Phaser.Input.Keyboard.JustDown(keySPACE) || receivedMouseInput) {
                    if(this.tempCan) {
                        //Spigot animation is currently happening
                        //Do nothing
                    } else if(heldItem instanceof WateringCan) {
                        //If the player is holding the can
                        if(playerVariables.water == 4 + playerVariables.waterLvl) {
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
                                delay: 500 + (250 * (4 + playerVariables.waterLvl)) - (playerVariables.water * 250),
                                callback: () => {
                                    playerVariables.water = 4 + playerVariables.waterLvl;
                                    heldItem = new WateringCan();
                                    heldType = "items";
                                    this.heldImg = 0;
                                },
                                loop: false,
                                callbackScope: this
                            });
                        } else {
                            //If player does not have enough money
                            this.fadeText("Not enough money!\nCosts $0.25 to fill.");
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
                                delay: 500 + (250 * (4 + playerVariables.waterLvl)) - (playerVariables.water * 250),
                                callback: () => {
                                    playerVariables.water = 4 + playerVariables.waterLvl;
                                    heldItem = new WateringCan();
                                    heldType = "items";
                                    this.heldImg = 0;
                                },
                                loop: false,
                                callbackScope: this
                            });
                        } else {
                            //If player does not have enough money
                            this.fadeText("Not enough money!\nCosts $0.25 to fill.");
                            //Give them an empty can
                            heldItem = new WateringCan();
                            heldType = "items";
                            this.heldImg = 0;
                        }
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
                if (Phaser.Input.Keyboard.JustDown(keySPACE) || receivedMouseInput) {
                    let row = plot[0];
                    let col = plot[1];
                    //If the space is a weed, remove it
                    if(gardenGrid[row][col].item instanceof Weed){
                        this.music.playSFX("dig");
                        gardenGrid[row][col].item = null;
                        //recreate the plot
                        gardenGrid[row][col].dug = true;
                        gardenGrid[row][col].renderPlot(this, this.gridToCoord(col, row));

                        return;
                    }
                    //If player holding the watering can
                    if (heldItem instanceof WateringCan && gardenGrid[row][col].item instanceof Flower) {
                        let spot = gardenGrid[row][col];
                        if(this.wateringEmitter.on) {
                            //Watering animation is currently happening
                            //Do nothing
                        } else if(playerVariables.water > 0) {
                            this.music.playSFX("waterFlowers");
                            spot.item.addWater();
                            //Then wet the spot and reduce water
                            spot.water = true;
                            playerVariables.water--;
                            //clear image of item held so it can be rerendered
                            this.imageFlip = heldItem.image.flipX;
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

                        if (!(obj instanceof Bramble) && !(obj instanceof Hive && obj.hasStock()) 
                            && !(obj instanceof DecorativeWide && this.checkBenchOccupied(row, col))) { 
                            loc.item = null; 
                            //console.log("plot is now",gardenGrid[row][col].item);
                        }
                        if(obj instanceof Hive && obj.hasStock()) {
                            //If there is honey to collect from this Hive
                            let i = 0;
                            for(let honey in obj.stock) {
                                let jars = Math.floor(obj.stock[honey]);
                                if(jars > 0) {
                                    playerVariables.inventory.honey[honey] += jars;
                                    playerVariables.inventory.honey["total"] += jars;
                                    obj.stock[honey] -= jars;
                                    this.time.delayedCall(250*(i), () => {
                                        this.honeyFadePopup(honey, jars);
                                    });
                                    i++;
                                }
                            }
                            obj.weeksSinceCollection = 0;
                            loc.renderPlot(this, this.gridToCoord(col, row));
                        } else {
                            //If able to pick up this item
                            if (!(obj == null || obj instanceof Weed || obj instanceof Bramble)) {
                                if(obj instanceof DecorativeWide) {
                                    //Special case, picking up double wide decorative
                                    if(!this.checkBenchOccupied(row, col)){
                                        if(obj.isLeft) {
                                            //Clear spot to the right
                                            console.log("picking up left side",obj,gardenGrid[row][col+1].item);
                                            gardenGrid[row][col+1].item = null;
                                            heldItem = obj;
                                            this.heldImg = 0;
                                        } else {
                                            //Clear spot to the left
                                            console.log("picking up right side",gardenGrid[row][col-1].item,obj);
                                            gardenGrid[row][col-1].item = null;
                                            gardenGrid[row][col-1].renderPlot(this, this.gridToCoord(col-1, row));
                                            heldItem = obj;
                                            heldItem.isLeft = true;
                                            this.heldImg = 0;
                                        }
                                    }
                                    else{
                                        console.log("Bench was occupied");
                                    }
                                } else {
                                    //If on the bee path, remove it
                                    if ((obj instanceof Flower && obj.isFullyGrown()) || obj instanceof Hive) {
                                        this.path = this.removeFromPath(obj.image, this.path);
                                    }
                                    heldItem = obj;
                                    this.heldImg = 0;
                                }
                            } else if(obj == null && loc.dug) {
                                this.music.playSFX("dig");
                                loc.dug = false;
                            } else if(!(obj instanceof Bramble)) {
                                this.music.playSFX("dig");
                                loc.dug = true;
                            }
                            if(heldItem instanceof Hive || heldItem instanceof Sprinkler || heldItem instanceof WateringCan) {
                                heldType = "items";
                            } else if (heldItem instanceof Flower) {
                                heldType = "flowers";
                            } else if (heldItem instanceof DecorativeWide || heldItem instanceof Decorative) {
                                heldType = "decorations";
                            }
                            //recreate the plot
                            loc.renderPlot(this, this.gridToCoord(col, row));
                        }
                    }
                }
            }
        }
    }

    placeItemHandler(row, col){
        let loc = gardenGrid[row][col];
        if(heldItem instanceof Clipper) {
            //If you have a Clipper, special case
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
            //Set the location's item to a new item of the same type
            console.log("placing a",typeof heldItem);
            if(heldItem instanceof Hive) {
                this.music.playSFX("placeItem");
                loc.item = new Hive(col, row);
                //clear highlight
                this.hiveHighlightHold.alpha = 0;
            } else if(heldItem instanceof Sprinkler) {
                this.music.playSFX("placeItem");
                loc.item = new Sprinkler(col, row);
                loc.dug = true;
                //clear highlight
                this.sprinklerHighlightHold.alpha = 0;
            } else if(heldItem instanceof WateringCan) {
                this.music.playSFX("placeItem");
                loc.item = new WateringCan();
            } else if(heldItem instanceof Decorative) {
                this.music.playSFX("placeItem");
                loc.item = new Decorative(heldItem.type);
            } else if(heldItem instanceof DecorativeWide) {
                if(col < gardenGrid[0].length-1 && gardenGrid[row][col+1].item == null) {
                    this.music.playSFX("placeItem");
                    loc.item = new DecorativeWide(heldItem.type, true);
                    gardenGrid[row][col+1].item = new DecorativeWide(heldItem.type, false);
                } else {
                    this.fadeText("There is not enough room\nfor this decoration.");
                    playerVariables.inventory.decorations["Bench"] += 1;
                }
            } else {
                console.log("got here");
                this.music.playSFX("placeItem");
                loc.item = new Flower(heldItem.age, heldItem.water, heldItem.type);
                loc.dug = true;
                if (loc.water) {
                    loc.item.addWater();
                }
            }
            heldItem.image.destroy(); //Clear the ghost image
            loc.renderPlot(this, this.gridToCoord(col, row));

            //If a flower or hive, add to bee path
            if (loc.item instanceof Hive || (loc.item instanceof Flower && loc.item.isFullyGrown())) {
                this.path.push([loc.spot.x, loc.spot.y - 25]);
            }
        }

        //check to see if holding stack of seeds
        console.log(playerVariables.inventory[heldType]);
        console.log(heldItem.type);
        let addition = "";
        if(heldItem instanceof Flower && heldItem.age <= 1) { addition = "\nSeeds"; }
        if (playerVariables.inventory[heldType][heldItem.type+addition] > 0) {
            //if yes, repopulate hand
            //console.log("holding another " + heldItem.type);
            this.heldImg = 0;
            playerVariables.inventory[heldType][heldItem.type+addition]--;
            if(heldItem instanceof Hive) {
                heldItem = new Hive(-1, -1);
            } else if(heldItem instanceof Sprinkler) {
                heldItem = new Sprinkler(-1, -1);
            } else if(heldItem instanceof Clipper) {
                heldItem = new Clipper();
            } else if(heldType === "flowers"){
                heldItem = new Flower(5, 5, heldItem.type);
            } else if(heldItem instanceof Decorative) {
                heldItem = new Decorative(heldItem.type);
            } else if(heldItem instanceof DecorativeWide) {
                heldItem = new DecorativeWide(heldItem.type, true);
            } else {
                heldItem = new Flower(0, 5, heldItem.type);
            }
            //console.log(heldItem);
        } else {
            //if not, empty hand
            //console.log("No more " + heldItem.type + " to hold")
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
        //takes grid coords and returns world coords in [x, y]
        return [(1 + gridx) * game.config.width / 12, (6 + gridy) * game.config.height / 9 + 40];
    }

    placeHeldItemInBag(){
        //console.log(heldItem);
        if (heldItem instanceof Flower) {
            //console.log(`Storing held flower ${heldItem.type} in inventory.`)
            //console.log(`before storage ${playerVariables.inventory.flowers[heldItem.type]}`)
            if(heldItem.age <= 1){
                playerVariables.inventory.seeds[heldItem.type+"\nSeeds"] += 1;
            } else{
                playerVariables.inventory.flowers[heldItem.type] += 1;
            }
            //console.log(`after storage ${playerVariables.inventory.flowers[heldItem.type]}`)
        } else if (heldItem instanceof Sprinkler) {
            //If item has highlight, hide that as well
            playerVariables.inventory.items["Sprinkler"] += 1;
            this.sprinklerHighlightHold.alpha = 0;
        } else if (heldItem instanceof Hive) {
            playerVariables.inventory.items["Beehive"] += 1;
            this.hiveHighlightHold.alpha = 0;
        } else if(heldItem instanceof Clipper) {
            playerVariables.inventory.items["Clipper"] += 1;
        } else if (heldItem instanceof WateringCan) {
            playerVariables.inventory.items["Watering Can"] += 1;
        } else if (heldItem instanceof Camera) {
            playerVariables.inventory.items["Camera"] += 1;
        } else if (heldItem instanceof Decorative || heldItem instanceof DecorativeWide) {
            playerVariables.inventory.decorations[heldItem.type] += 1;
        } 
         else {
             //Nothing special to do, but we don't want to reach the normal else case
            return;
        }

        heldItem.destroy();
        heldItem = undefined;
        this.heldImg = 0;
    }

    loadData() {
        //TODO:: Load data as needed
        var loadedData = JSON.parse(localStorage.getItem('saveData'));
        console.log("Loaded Data:");
        console.log(loadedData);

        //Check if there is any save data
        if(!loadedData){
            console.log("No save data found");
            return;
        }

        //Check version number
        console.log("Save Data Version: " + loadedData.version);
        if(loadedData.version !== "1.0.0"){
            console.log("Invalid Version Number");
            return;
        }

        gardenGrid = loadedData.garden;
        //console.log("gardenGrid: ", gardenGrid);
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                gardenGrid[row][col] = objToPlot(gardenGrid[row][col]);
            }
        }
        console.log("gardenGrid: ", gardenGrid);
        currentDay = loadedData.currDay;
        console.log("currDay: " + currentDay);
        hasSoldForDay = loadedData.hasSold;
        console.log("hasSoldForDay: " + hasSoldForDay);
        playerVariables = loadedData.playerVars;
        console.log("playerVariables: " + playerVariables);
        shopInventory = loadedData.shopInv;
        console.log("shopInventory: " + shopInventory);
        priceMap = loadedData.bucksMap;
        console.log("priceMap: " + priceMap);
        pHistory = loadedData.bucksHist;
        console.log("priceHistory: " + pHistory);     
        
        if(playerVariables.waterLvl == 1) {
            idImages["Watering Can"][0] = "bluewater0";
        } else if (playerVariables.waterLvl == 2) {
            idImages["Watering Can"][0] = "purplewater0";
        }

        //Retrieve list of Hives & Weeds for random collection
        let beehives = [];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                if (gardenGrid[row][col].item instanceof Hive) {
                    beehives.push([row, col]);
                }
            }
        }
        this.numHives = beehives.length;
    }

    saveData() {
        //TODO:: save data when previous scene is not the menu
        var saveData = {
            version: "1.0.0",
            garden: gardenGrid,
            currDay: currentDay,
            hasSold: hasSoldForDay,
            playerVars: playerVariables,
            shopInv: shopInventory,
            bucksMap: priceMap,
            bucksHist: pHistory
        };
        /*//Save garden
        saveData.playerVars.push({'name': 'gardenGrid', 'value': gardenGrid});

        //Save player vars
        saveData.playerVars.push({'name': 'currentDay', 'value': currentDay});
        saveData.playerVars.push({'name': 'hasSoldForDay', 'value': hasSoldForDay});
        saveData.playerVars.push({'name': 'playerVariables', 'value': playerVariables});
        
        //Save shop inventory
        saveData.shopInventory.push({'name': 'shopInventory', 'value': shopInventory});

        //Save priceMap
        saveData.priceData.push({'name': 'priceMap', 'value': priceMap});
        saveData.priceData.push({'name': 'priceHistory', 'value': priceHistory});*/

        //Set data into browser
        localStorage.setItem('saveData', JSON.stringify(saveData));
        console.log("Just saved: " + JSON.stringify(saveData));
    }
}