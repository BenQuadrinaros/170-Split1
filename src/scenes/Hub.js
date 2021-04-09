
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
        //Initialize various global variables
        this.worldWidth = 2000; //Set the width of the scene
        this.worldHeight = 1500; //Set the height of the scene
        this.heldImg = 0; //Determines which item is being held by the player
        this.bounceFactor = .1; //Constant for images bouncing
        this.counter = 0; //A generic counter
        this.fadeTimer = null; //A tracker for whether a message needs to fade
        this.pointerCurrentlyOver = ""; //Tracks which interactable object the cursor is over
        this.popupVisited = false; //Tracks whether the scene was paused for a popup scene

        //background music for the hub
        this.music = new BGMManager(this);
        this.music.playSong("hubMusic", true);
        this.music.setVolume(config.volume);
        
        //Initialize Controls
        this.createControls();
        //Initialize Background Elements
        this.createBackgroundImages();

        //If coming from the menu or the market, advance to the next day
        if(this.previousScene === "menuScene" || this.previousScene === "marketScene" || this.previousScene === "hubScene"){
            //Advance to the next day
            this.advanceDay();    
        }

        //If coming from the menu, load data
        if(this.previousScene === "menuScene"){
            this.loadData();
        }
        else{
            this.saveData();
        }

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

        //Check for special cases
        if(playerVariables.money >= 100) {
            console.log("here");
            this.scene.pause();
            this.music.stop();
            this.scene.start("winScene");
        } else if((this.previousScene === "marketScene" || this.previousScene === "hubScene") && !this.popupVisited){
            console.log("Sending to popup");
            //isPaused = true;
            this.popupVisited = true;
            this.scene.pause();
            this.scene.launch("hubPopupScene", { previousScene: "hubScene", initialHoney: this.startingHoneyForPopup});
        }
    }

    update() {
        //Check if the pause menu should be activated
        this.updateCheckPause();

        //Move the backpack icon to be be relative to the player
        this.updateMoveBackpackIcon();
        
        //if the player is holding an object, render it and move it alongside the player
        if (heldItem !== undefined) {
            this.updateHeldItemBehavior();
        }

        //Check various keyboard inputs
        this.updateCheckMiscKeyboard();
        
        //Check if the player is near any interactable zones
        this.updateCheckNearLocation();

        //Place flower text over nearest spot for interaction
        this.textHover();

        //Put highlight over objects if standing near them
        this.updateMoveHighlight();

        //Update other things existing in the scene
        this.updateSwarm();

        //Update player movement and location
        this.player.update();
        this.player.depth = this.player.y / 10 + 3;

        //Misc Updates
        this.counter++;
        if (this.counter % 60 === 0) {
            this.bounceFactor = -this.bounceFactor;
        }
    }

    advanceDay(){
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

        //All sprinklers water surroundings
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                if(gardenGrid[row][col].item instanceof Sprinkler) {
                    gardenGrid[row][col].item.watering();
                    //console.log("found sprinkler at "+col+', '+row);
                }
            }
        }

        //Update all Flowers for the day
        //Retrieve list of Hives for random collection
        let beehives = [];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                //console.log("["+col+","+row+"]");
                if (gardenGrid[row][col].item instanceof Hive) {
                    beehives.push([row, col]);
                    //console.log("found beehive at "+col+', '+row);
                } else if(gardenGrid[row][col].item instanceof Flower) {
                    gardenGrid[row][col].item.advance();
                    //console.log("found flower at "+col+', '+row);
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

        console.log("Honey increases to " + playerVariables.inventory.honey["total"]);

        //Refresh Shop
        shopInventory["Seeds"]["Cosmos"]["amount"] = 2;
        shopInventory["Seeds"]["Bluebonnet"]["amount"] = 3;
        shopInventory["Seeds"]["Lavender"]["amount"] = 3;
        shopInventory["Seeds"]["Tulip"]["amount"] = 3;
        shopInventory["Items"]["Beehive"]["amount"] = 2;
        shopInventory["Items"]["Sprinkler"]["amount"] = 2;
    }

    createControls(){
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
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyH = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.H);
        keyJ = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.J);
        keyK = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.K);
        keyL = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.L);
    }

    createPlayer(){
        //Establish the sprite
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2, this.worldWidth, this.worldHeight);
        this.player.depth = this.player.y / 10;
        
        //Establish its animations
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
    }

    createCamera(){
        //Provide basic controls
        this.cameras.main.setBackgroundColor(0x000000);
        this.cameras.main.setBounds(0, 0, this.worldWidth, this.worldHeight);
        this.cameras.main.setZoom(1.15);
        //this.cameras.main.setTint(0x000000);
        //Have it track the player
        // startFollow(target [, roundPixels] [, lerpX] [, lerpY] [, offsetX] [, offsetY])
        this.cameras.main.startFollow(this.player, true, 0.4, 0.4);
    }

    createBackgroundImages(){
        this.extraGrassBackdrop = this.add.image(0, 0, "extraLargeGrass").setOrigin(0, 0).setScale(0.5);
        this.background = this.add.image(config.width / 2, config.height / 2, 'background').setOrigin(0.5, 0.5).setScale(0.5);
        this.sunsetTint= this.add.rectangle(0, 0, 2*this.worldWidth, 2*this.worldHeight, 0xFD5E53, 0.25);
        this.sunsetTint.alpha = 0;
        if(hasSoldForDay){
            this.sunsetTint.alpha = 1;
            this.sunsetTint.depth = 1000;
        }
    }

    createUIElements(){
        //Create some overlays for displaying ranges
        this.plotHighlight = this.add.ellipse(0, 0, config.width/13, config.height/13, 0xD3D3D3);
        this.plotHighlight.alpha = 0;
        this.highlightOpacity = .4;
        this.sprinklerHighlight = this.add.image(0, 0, 'sprinklerHighlight');
        this.sprinklerHighlight.setOrigin(0.5, 0.5).setScale(12.5, 9.5);
        this.sprinklerHighlight.alpha = 0;
        this.hiveHighlight = this.add.image(0, 0, 'hiveHighlight');
        this.hiveHighlight.setOrigin(0.5, 0.5).setScale(12.5, 9.5);
        this.hiveHighlight.alpha = 0;
        this.sprinklerHighlightHold = this.add.image(0, 0, 'sprinklerHighlight');
        this.sprinklerHighlightHold.setOrigin(0.5, 0.5).setScale(12.5, 9.5);
        this.sprinklerHighlightHold.alpha = 0;
        this.hiveHighlightHold = this.add.image(0, 0, 'hiveHighlight');
        this.hiveHighlightHold.setOrigin(0.5, 0.5).setScale(12.5, 9.5);
        this.hiveHighlightHold.alpha = 0;

        //create interactible backpack image
        this.backpack = this.add.image(config.width- config.width/6, config.height/6, 'tempBackpackIcon')
            .setInteractive().setAlpha(.5).setScale(.15)
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
                this.music.playSFX("backpackOpen");
                this.scene.pause('hubScene');
                this.scene.launch("backpackUI", {previousScene:"hubScene"});
            });
        this.backpack.depth = 200;
    }

    createText(){
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

        //Text that starts visible
        this.moveText = this.add.text(this.player.x, this.player.y - config.height / 9, "Use the arrowkeys to move", this.textConfig).setOrigin(.5, .5);
        this.moveText.depth = 100;
        this.turnText = this.add.text(6 * game.config.width / 7, game.config.height / 4, "Turns Remaining: ", this.textConfig).setOrigin(.5);
        this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        this.turnText.depth = 100;
        this.townAccess = this.add.text(config.width/5, 2*config.height/5, "Path to Town", this.textConfig).setOrigin(0.5,0.5);
        

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
        if(hasSoldForDay){
            this.caveText.text = "Press SPACE to rest until morning";
        }
        //If the player has not sold yet, only show the text if they go over it
        else{
            this.caveText.text = "Press SPACE to end the day early";
            this.caveText.setVisible(false);
        }

        //UI Text elements
        this.fadeMessage = this.add.text(this.player.x, this.player.y, "Nada", this.textConfig);
        this.fadeMessage.setOrigin(0.5).setVisible(false);
        this.fadeMessage.depth = 200;
    }

    createEvents(){
        //Make sure the escape keybinding isn't consumed by the backpack UI
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.setVolume(config.volume);
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
    }

    createGarden(){
        // Build out Garden below main Hub area
        this.path = [];    //Path for the bees to follow
        this.mulchInScene = [   //This array will let us track local changes and update images
            [null*10], [null*10], [null*10], [null*10], [null*10], [null*10], [null*10], [null*10]
        ];
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                let plot = gardenGrid[row][col];
                let coords = this.gridToCoord(col, row);
                plot.renderPlot(this, coords);
                if(plot.item instanceof Hive || plot.item instanceof Flower) {
                    this.path.push([coords[0], coords[1] - 25]);
                }
            }
        }

        //create water bucket for manual watering
        this.waterBucket = this.add.image(.8 * config.width, .55 * config.height, "water");
        this.waterBucket.setOrigin(.5, .5).setScale(1.5, 1.5);
        this.waterBucket.depth = this.waterBucket.y / 10;
        this.waterHeld = new WateringCan();
    }

    createBees(){
        //Create bee swarm for simulated pollination
        this.swarm = [];
        let numBees = 3 + 2 * this.numHives;     //5 seems to be a good base for flower following to look decent
        for (let i = 0; i < numBees; ++i) {
            let temp = new Bee(this, 'bearBee', 0, game.config.width/2,3 * game.config.height/2);
            temp.setOrigin(.5).setScale(.25, .25).setVisible(true);
            temp.depth = 200;
            this.swarm.push(temp);
        }
    }

    updateCheckPause(){
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", { previousScene: "hubScene" });
        }
    }

    updateMoveBackpackIcon(){
        //move backpack icon alongside player and camera
        var backpackUIMinX = config.width- 5*config.width/24;
        var backpackUIMaxX = this.worldWidth - config.width/8;
        var backpackPlayerRelativeX = this.player.x+14*config.width/40;
        this.backpack.x = Math.min(backpackUIMaxX, Math.max(backpackUIMinX, backpackPlayerRelativeX));
        var backpackUIMinY = config.height/9;
        var backpackUIMaxY = this.worldHeight - config.height + 2*config.height/9;
        var backpackPlayerRelativeY = this.player.y-9*config.height/27;
        this.backpack.y = Math.min(backpackUIMaxY, Math.max(backpackUIMinY, backpackPlayerRelativeY));
    }

    updateHeldItemBehavior(){
        if (this.heldImg < 1) {
            heldItem.addToScene(this, this.player.x, this.player.y);
            this.heldImg = 1;
            if(!(heldItem instanceof WateringCan)) {
                heldItem.image.setScale(.2, .2);
            }
        }
        //Always update location
        heldItem.image.x = this.player.x;
        heldItem.image.y = this.player.y;
        heldItem.image.depth = this.player.depth + 1;

        //Also update highlight
        if(heldItem instanceof Sprinkler) {
            this.sprinklerHighlightHold.alpha = this.highlightOpacity;
            this.sprinklerHighlightHold.x = this.player.x;
            this.sprinklerHighlightHold.y = this.player.y+35;
            this.sprinklerHighlightHold.depth = this.sprinklerHighlightHold.y / 10 - 5;
            this.hiveHighlightHold.alpha = 0;
        } else if(heldItem instanceof Hive) {
            this.hiveHighlightHold.alpha = this.highlightOpacity;
            this.hiveHighlightHold.x = this.player.x;
            this.hiveHighlightHold.y = this.player.y+35;
            this.hiveHighlightHold.depth = this.hiveHighlightHold.y / 10 - 5;
            this.sprinklerHighlightHold.alpha = 0;
        } else {
            this.sprinklerHighlightHold.alpha = 0;
            this.hiveHighlightHold.alpha = 0;
        }

        //Input to place item in backpack
        if (Phaser.Input.Keyboard.JustDown(keyB)) {
            console.log(heldItem)
            if (heldItem instanceof Flower) {
                console.log(`Storing held flower ${heldItem.type} in inventory.`)
                console.log(`before storage ${playerVariables.inventory.flowers[heldItem.type]}`)
                playerVariables.inventory.flowers[heldItem.type] +=1;
                console.log(`after storage ${playerVariables.inventory.flowers[heldItem.type]}`)
            } else if(heldItem instanceof Sprinkler) {
                //If item has highlight, hide that as well
                playerVariables.inventory.items["Sprinkler"] +=1;
                this.sprinklerHighlightHold.alpha = 0;
            } else if(heldItem instanceof Hive) {
                playerVariables.inventory.items["Beehive"] +=1;
                this.hiveHighlightHold.alpha = 0;
            }
                
            heldItem.destroy();
            heldItem = undefined;
            this.heldImg = 0;
        }
    }

    updateCheckMiscKeyboard(){
        //If the player press B open the backpack
        if (Phaser.Input.Keyboard.JustDown(keyB)){
            this.music.playSFX("backpackOpen");
            this.scene.pause('hubScene');
            this.scene.launch("backpackUI", {previousScene: "hubScene"});
        }

        //When the player starts to move, get rid of the instructions
        if (this.moveText != null) {
            if (keyLEFT.isDown || keyRIGHT.isDown || keyUP.isDown || keyDOWN.isDown) {
                this.moveText.text = "";
                this.moveText = null;
            }
        }

        // -------------------------------------------
        // Quick day advancement for testing purposes
        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.advanceDay();
            this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        }
        if (Phaser.Input.Keyboard.JustDown(keyO)) {
            playerVariables.money += 10;
            this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        }
        if (Phaser.Input.Keyboard.JustDown(keyH)) {
            playerVariables.inventory.honey["yellow"] += 3;
            playerVariables.inventory.honey["total"] += 3;
            this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        }
        if (Phaser.Input.Keyboard.JustDown(keyJ)) {
            playerVariables.inventory.honey["blue"] += 3;
            playerVariables.inventory.honey["total"] += 3;
            this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        }
        if (Phaser.Input.Keyboard.JustDown(keyK)) {
            playerVariables.inventory.honey["pink"] += 3;
            playerVariables.inventory.honey["total"] += 3;
            this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        }
        if (Phaser.Input.Keyboard.JustDown(keyL)) {
            playerVariables.inventory.honey["purple"] += 3;
            playerVariables.inventory.honey["total"] += 3;
            this.turnText.text = "Honey: " + playerVariables.inventory.honey["total"] + "\nMoney: " + playerVariables.money;
        }
        // -------------------------------------------
    }

    updateCheckNearLocation(){
        //Check if the player is close enough to the way to town
        if (Math.abs(Phaser.Math.Distance.Between(this.townAccess.x, this.townAccess.y,
            this.player.x, this.player.y)) < 100) {
            this.interactText.text = "'SPACE' to go shopping";
            this.interactText.x = this.townAccess.x;
            this.interactText.y = this.townAccess.y + 20;
            this.interactText.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //-1 to indicate that it just left the hub
                this.music.stop();
                this.music.playSFX("mapTransition");
                //this.scene.start('mapScene', { arrivingAt: -1 }) //for going to biking map
                this.time.delayedCall(300, () => {
                    this.music.stop();
                    this.scene.start('shopScene');
                });
                
            }
        }
        //Check if the player is close enough to the cave to rest
        else if(Math.abs(Phaser.Math.Distance.Between(this.caveText.x, this.caveText.y,
            this.player.x, this.player.y)) < 100){
            if(!hasSoldForDay){
                this.caveText.setVisible(true);
            }
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //Go to hub and start next day
                this.music.transitionSong("bedtimeMusic", false);
                this.cameras.main.fadeOut(3000, 0, 0, 0);
                this.time.delayedCall(8000, () => {
                    this.music.stop();
                    this.scene.restart({previousScene:"hubScene"});
                });
            }
        }
        //If not near any locations
        else {
            if(!hasSoldForDay){
                this.caveText.setVisible(false);
            }
            this.interactText.setVisible(false);
        }
    }

    updateSwarm() {
        for(let i = 0; i < this.swarm.length; i++) {
            this.swarm[i].update();
            this.swarm[i].flock(this.swarm, this.path, this.player);
        }
    }

    fadeText(message) {
        if (this.fadeTimer != null) {
            this.fadeTimer.callback = () => { };
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

    reenableEsc() {
        console.log("ReenableEsc called");
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    updateMoveHighlight(){
        let loc = this.closestPlot();
        if(loc != null) {
            if(gardenGrid[loc[0]][loc[1]].item instanceof Hive) {
                this.hiveHighlight.alpha = this.highlightOpacity;
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.hiveHighlight.x = coords[0];
                this.hiveHighlight.y = coords[1]+35;
                this.hiveHighlight.depth = this.hiveHighlight.y / 10 - 5;
                this.sprinklerHighlight.alpha = 0;
            } else if (gardenGrid[loc[0]][loc[1]].item instanceof Sprinkler) {
                this.sprinklerHighlight.alpha = this.highlightOpacity;
                let coords = this.gridToCoord(loc[1], loc[0]);
                this.sprinklerHighlight.x = coords[0];
                this.sprinklerHighlight.y = coords[1]+35;
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
        //If close to water bucket
        if(Math.sqrt(Math.pow(this.waterBucket.x - this.player.x,2) + 
            Math.pow(this.waterBucket.y - this.player.y,2)) < 75) {
            //Move display to this spot
            this.plotHighlight.alpha = 1;
            this.plotHighlight.x = this.waterBucket.x;
            this.plotHighlight.y = this.waterBucket.y + 25;
            //Logic for if player presses space near water bucket
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                //If the player is not holding an item
                if (heldItem == undefined) {
                    //Put water in hands
                    heldItem = this.waterHeld;
                }
            }
        } else if(plot == null) {
            //If closest plot is far away, clear highlight
            this.plotHighlight.alpha = 0;
        } else {
            //Else, move highlight to that location
            this.plotHighlight.alpha = 1;
            let coords = this.gridToCoord(plot[1], plot[0]);
            this.plotHighlight.x = coords[0];
            this.plotHighlight.y = coords[1]+40;
            //Logic for if player presses space near a plot
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                let row = plot[0];
                let col = plot[1];
                //If player holding the watering can
                if(heldItem instanceof WateringCan) {
                    let spot = gardenGrid[row][col];
                    if(spot.item instanceof Flower) {
                        //Water flower if present
                        this.music.playSFX("waterFlowers");
                        spot.item.addWater();
                    }
                    //Then wet the spot and reload
                    spot.water = true;
                    spot.renderPlot(this, this.gridToCoord(col, row));
                    //clear image of item held
                    heldItem.image.destroy();
                    heldItem = undefined;
                    //set the held image to nothing
                    this.heldImg = 0;
                }
                //If the player is holding an item, modify garden plots and add image to scene
                else if (heldItem !== undefined){
                    //If that spot is empty, place item there
                    if(gardenGrid[row][col].item == null) {
                        //console.log(heldItem);
                        //place held object in the spot
                        let loc = gardenGrid[row][col];
                        loc.item = heldItem;
                        //clear image of item held
                        heldItem.image.destroy();
                        heldItem = undefined;
                        //clear highlights
                        if(loc.item instanceof Sprinkler) { 
                            this.sprinklerHighlightHold.alpha = 0;
                            loc.item.setPos(col, row);
                        } else if(loc.item instanceof Hive) {
                            this.hiveHighlightHold.alpha = 0;
                            loc.item.setPos(col, row);
                        } else if (loc.item instanceof Flower) {
                            loc.dug = true;
                            if(loc.water) {
                                loc.item.addWater();
                            }
                        }
                        loc.renderPlot(this, this.gridToCoord(col, row));
                        //If a flower or hive, add to bee path
                        if(loc.item instanceof Hive || loc.item instanceof Flower) {
                            this.path.push([loc.spot.x, loc.spot.y - 25]);
                        }
                        //set the held image to nothing
                        this.heldImg = 0;
                    } else {
                        this.fadeText("This plot is\noccupied");
                    }
                } else {
                    //if the player is attempting to interact with a flower or item, pick it up for now
                    let loc = gardenGrid[row][col];
                    let obj = loc.item;
                    loc.item = null;
                    if (obj instanceof Flower || obj instanceof Hive || obj instanceof Sprinkler) {
                        //If on the bee path, remove it
                        if(obj instanceof Flower || obj instanceof Hive) {
                            this.path = this.removeFromPath(obj.image, this.path);
                            loc.dug = false;
                        }
                        heldItem = obj;
                        //recreate the plot
                        loc.renderPlot(this, this.gridToCoord(col, row));
                    }
                }
            }
        }
    }

    closestPlot() {
        // Helper function to find closest plot, if any within 65 units
        let closestXY = [];
        let closestDist = 65;
        for (let row = 0; row < gardenGrid.length; row++) {
            for (let col = 0; col < gardenGrid[0].length; col++) {
                let coords = this.gridToCoord(col, row);
                if(Math.sqrt(Math.pow(coords[0] - this.player.x,2) + 
                    Math.pow(coords[1] - this.player.y -  this.player.height/5,2)) < closestDist) {
                        closestDist = Math.sqrt(Math.pow(coords[0] - this.player.x,2) + 
                            Math.pow(coords[1] - this.player.y - this.player.height/5,2));
                        closestXY = [row, col];
                    }
            }
        }
        if(closestDist == 65) {
            //If closest plot is far away, return null
            return null;
        } else {
            //else, return plot coords [row, col]
            return closestXY;
        }
    }

    removeFromPath(object, path) {
        let coords;
        for(let i = 0; i < path.length; i++) {
            coords = path[i];
            if(Math.abs(object.x - coords[0]) < 1 && Math.abs(object.y - 25 - coords[1] < 1)) {
                path.splice(i, 1);
                break;
            }
        }
        return path;
    }

    gridToCoord(gridx, gridy) {
        return [(1 + gridx) * game.config.width / 12, (8 + gridy) * (game.config.height - 50) / 8 + 15];
    }

    loadData(){
        //TODO:: Load data as needed

        //Check Garden Grid

        //Check Player Variables

        //Check Shop Inventory

        //Check Price Map
    }

    saveData(){
        //TODO:: save data when previous scene is not the menu
    }
}