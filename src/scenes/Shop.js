class Shop extends Phaser.Scene {
    constructor() {
        super({
            key: "shopScene"
        });
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
        this.player = new HubPlayer(this, 'player', 0, config.width/2, 3*config.height/4, game.config.width, game.config.height, [[135, 305], [380, 270], [game.config.width+50, 335]]).setDepth(-1);
        this.player.setScale(0.65);

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
        //Pause Game
        this.updateCheckPause();

        //Update the player
        this.player.update();
        
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
    }

    createBackgroundImages(){
        this.background = this.add.image(config.width/2, config.height/2, 'townBackground')
        this.background.setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-10);
        this.toadLeckman = this.add.image(2*config.width/3,2*config.height/3, 'toadLeckman')
        this.toadLeckman.setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-5);
        this.toadLeckman.alpha = 0;
        if(hasSoldForDay){
            this.sunsetTint = this.add.rectangle(0, 0, 2000, 2000, 0xFD5E53, 0.25);
            this.sunsetTint.depth = 1000;
        }
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
        this.townExit = this.add.text(5*config.width/6 + 65, 9*config.height/10 + 5, "Path to Cave", this.textConfig).setOrigin(.5,.5).setVisible(true);
        this.toadTextInteract = this.add.text(this.toadLeckman.x,this.toadLeckman.y, "Space to interact with the shop", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.marketEntrance = this.add.text(280, 389, "Farmer's Market Entrance", this.textConfig).setOrigin(.5,.5).setVisible(true);
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
                playerInventoryUpdated = false;
                this.scene.pause('shopScene');
                this.scene.launch("backpackUI", {previousScene:"shopScene"});
            });
        this.backpack.setFrame(0);
    }

    updateCheckPause(){
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", { previousScene: "shopScene" });
        }
        else{
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }
    }

    updateCheckNearLocation(){
        if (Math.abs(Phaser.Math.Distance.Between(this.townExit.x,this.townExit.y, this.player.x,this.player.y)) < 75) {
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
                this.player.x,this.player.y)) < 100) {
            this.toadTextInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
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
        if (Phaser.Input.Keyboard.JustDown(keyB)){
            this.music.playSFX("backpackOpen");
            this.scene.pause('shopScene');
            this.scene.launch("backpackUI", {previousScene: "shopScene"});
        }
    }
}