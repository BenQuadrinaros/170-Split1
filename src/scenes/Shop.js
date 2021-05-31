class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: "shopScene"
        });
    }

    init(data) {
        //See where you are returning from
        this.previousScene = data.previousScene;
    }

    preload(){
        console.log("in ShopUI Scene")
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create(){
        //Misc Setup
        vars["Cosmo"] = this.add.image(10000,100000,"PlayerIcon").setOrigin(.5,.5);
        this.pointerCurrentlyOver = ""; //Tracks if the cursor is over an interactable object
        this.leaving = false;           //Makes sure player can't overlap leaving

        //create the background music manager
        this.music = new BGMManager(this);
        this.music.playSong("shopMusicShort", true);

        //Initialize images
        this.createBackgroundImages();
        this.player;
        console.log("Previous scene was :", this.previousScene);
        if(this.previousScene === "hubScene"){
            this.player = new HubPlayer(this, 'player', 0, 4*config.width/5, 5*config.height/6, game.config.width + 100, game.config.height, [[135, 330], [380, 295], [game.config.width+200, 350]]).setDepth(-1);
        }
        else{
            this.player = new HubPlayer(this, 'player', 0, config.width/3, 3*config.height/4, game.config.width + 100, game.config.height, [[135, 330], [380, 295], [game.config.width+200, 350]]).setDepth(-1);
        }
        this.player.setScale(0.65);
        this.player.shadow.setScale(0.65);
        if(hasSoldForDay) { 
            this.player.shadow.alpha = .35;
            this.player.shadow.setScale(1.25, .5);
         }

        //Create the text around the scene
        this.createText();

        //establish controls for gameplay
        this.createControls();

        //establish various events
        this.createEvents();

        //Create UI Elements
        this.createUI();
    }

    update(){
        //Scroll clouds
        this.sky.tilePositionX += 0.08;
        
        //Pause Game
        this.updateCheckPause();

        //Update the player
        this.player.update();
        this.player.shadow.y = this.player.shadow.y - 25;
        if(hasSoldForDay) { this.player.shadow.x = this.player.x - 35; }
        
        //Check if the player is near any locations
        this.updateCheckNearLocation();

        //Create behavior around held items
        this.updateHeldItem();

        //Check other various keyboard
        this.updateCheckMiscKeyboard();

        //Misc updates
        if(playerInventoryUpdated){
            this.backpack.setFrame(1);   
        }

        //Update UI
        this.infoDisplay.update(this.cameras.main.scrollX + config.width * .1, 
            this.cameras.main.scrollY + config.height * .15, 
            playerVariables.money, playerVariables.inventory.honey["total"]);

        if(this.snapshot) {
            this.snapshot.x = this.infoDisplay.x + 125;
            this.snapshot.y = this.infoDisplay.y;
        }

    }

    createControls(){
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        keyW = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyD = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
    }

    createBackgroundImages(){
        let timeMod = "";
        if(hasSoldForDay){
            timeMod = "Evening";

            this.sunsetTint = this.add.image(0, 0, "townEveningOverlay")
            .setOrigin(0, 0).setScale(0.5).setDepth(100);
        }

        this.skyBox = this.add.image(0, 0, "townSky" + timeMod)
        .setOrigin(0, 0).setScale(0.5, 0.5).setDepth(-20);

        this.sky = this.add.tileSprite(0, 0, config.width, config.height, 'townClouds').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-15);

        this.background = this.add.image(0, 0, 'townBackground' + timeMod)
        this.background.setOrigin(0, 0).setScale(0.5, 0.5).setDepth(-10);
        
        
        this.toadLeckman = this.add.image(2*config.width/3,2*config.height/3, 'toadLeckman')
        this.toadLeckman.setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-5);
        this.toadLeckman.alpha = 0;

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

        //create shop text
        this.townExit = this.add.text(5*config.width/6 + 85, 9*config.height/10 + 5, "Path to Garden", this.textConfig).setOrigin(.5,.5).setVisible(true);
        this.toadTextInteract = this.add.text(this.toadLeckman.x,this.toadLeckman.y, "Space to interact with the shop", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.marketEntrance = this.add.text(280, 389, "Farmer's Market Entrance", this.textConfig).setOrigin(.5,.5).setVisible(true);
    }

    createEvents(){
        //Make sure the escape keybinding isn't consumed by the backpack UI
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.setVolume(config.volume);
            this.backpack.setAlpha(0.9);
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
            keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
            keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
            keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
            keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
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

    createUI(){
        //create interactible backpack image
        this.backpack = this.add.image(this.cameras.main.scrollX + config.width - 68, this.cameras.main.scrollY + config.height/5 - 36, 'backpackFrames')
            .setInteractive().setAlpha(.9)
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
            .on('pointerdown', () =>{
                console.log("clicked backpack");
                this.music.playSFX("backpackOpen");
                this.backpack.setFrame(0);
                this.backpack.setAlpha(0);
                playerInventoryUpdated = false;
                this.scene.pause('shopScene');
                this.scene.launch("backpackUI", {previousScene:"shopScene"});
            });
        this.backpack.setFrame(0);
        this.backpack.setDepth(300);

        //Tracker for Money and total Honey
        this.infoDisplay = new InfoDisplay(this, "infoBox", 0, "Shop");

        //Camera button for snapshots
        if(playerVariables.gotCamera) {
            this.snapshot = this.add.image(this.infoDisplay.x + 125, this.infoDisplay.y, "snapshot");
            this.snapshot.setAlpha(.9).setDepth(200).setScale(.275, .275).setInteractive();
            this.snapshot.on('pointerover', () => {
                    console.log("over camera");
                    this.snapshot.setAlpha(1);
                    this.pointerCurrentlyOver = "snapshot";
                })
                .on('pointerout', () => {
                    this.snapshot.setAlpha(.9);
                    this.pointerCurrentlyOver = "";
                })
                .on('pointerdown', () => {
                    //Take snapshot
                    game.renderer.snapshotArea(this.cameras.main.scrollX, this.cameras.main.scrollY,
                        config.width, config.height, function (image) {
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
                }
            );
        }
    }

    updateCheckPause(){
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            //this.scene.launch("pauseScene", { previousScene: "shopScene" });
            this.scene.launch("hubPopupScene", {previousScene: "shopScene",
                                                    fromTutorial:false});
        }
        else{
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }
    }

    updateCheckNearLocation(){
        if (this.player.x - config.width > 50) {
            if(!this.leaving) {
                this.leaving = true;
                console.log("returning to hub");
                this.music.stop();
                this.music.playSFX("mapTransition");
                this.time.delayedCall(300, () => {
                    this.music.stop();
                    this.scene.start("hubScene", {previousScene: "shopScene"});
                });
            }
        }

        if (!this.leaving && Math.abs(Phaser.Math.Distance.Between(this.toadLeckman.x,this.toadLeckman.y, 
                this.player.x,this.player.y)) < 120) {
            this.toadTextInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.backpack.setAlpha(0.0);
                console.log("launching shop ui");
                this.scene.pause('shopScene');
                this.scene.launch("shopUIScene", {previousScene:"shopScene"});
            }
        } else {
            this.toadTextInteract.setVisible(false);
        }

        //Check if the player is close enough to the bike to head to the world map
        if (Math.abs(Phaser.Math.Distance.Between(this.marketEntrance.x, this.marketEntrance.y, this.player.x, this.player.y)) < 100) {
            if(!hasSoldForDay){
                this.marketEntrance.text = "Farmer's Market Entrance\nSPACE to sell for today";
            }
            else{
                this.marketEntrance.text = "Come back tomorrow when it is earlier";
            }
            if (!hasSoldForDay && !this.leaving) {
                    if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                    this.leaving = true;
                    //Play the transition song
                    this.music.transitionSong("hubMarketTransition", false);
                    //Fade to black
                    this.cameras.main.fadeOut(5000, 0, 0, 0);
                    this.time.delayedCall(7250, () => {
                        //this.scene.start('mapScene', { arrivingAt: -1 }) //for going to biking map
                        this.music.stop();
                        this.scene.start('marketPriceSettingScene');
                    });
                }
            }
        }
        else {
            if(hasSoldForDay){
                this.marketEntrance.text = "";
            }
            else{
                this.marketEntrance.text = "Farmer's Market Entrance";
            }
        }
    }

    updateHeldItem(){
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            heldItem = undefined;

        }

        if (heldItem !== undefined){
            vars[heldItem].x = this.player.x;
            vars[heldItem].y = this.player.y;
        }
    }

    updateCheckMiscKeyboard(){
        //If the player press B open the backpack
        if (Phaser.Input.Keyboard.JustDown(keyB)  || Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyI)){
            this.music.playSFX("backpackOpen");
            this.scene.pause('shopScene');
            this.scene.launch("backpackUI", {previousScene: "shopScene"});
        }
    }
}