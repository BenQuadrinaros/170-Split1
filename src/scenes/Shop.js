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

        //create the background music manager
        this.music = new BGMManager(this);
        this.music.playSong("shopMusicFull", false);
        this.music.queueSong("shopMusicShort", true);

        //Initialize images
        this.createBackgroundImages();
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2).setDepth(-1);

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
    }

    createBackgroundImages(){
        this.background = this.add.image(config.width/2, config.height/2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-10);
        this.toadLeckman = this.add.image(config.width/2,config.height/4, 'toadLeckman').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-5);
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
        this.townExit = this.add.text(4*config.width/5, 2*config.height/3, "Path to Cave", this.textConfig).setOrigin(.5,.5).setVisible(true);
        this.townExitInteract = this.add.text(4*config.width/5, (2*config.height/3)-20, "Space to go back to the cave", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.toadTextInteract = this.add.text(this.toadLeckman.x,this.toadLeckman.y, "Space to interact with the shop", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.marketEntrance = this.add.text(config.width/5, 2*config.height/3, "Farmer's Market Entrance", this.textConfig).setOrigin(.5,.5).setVisible(true);
        this.marketEntranceInteract = this.add.text(config.width/5, (2*config.height/3)-20, "Space to set up your stall", this.textConfig).setOrigin(.5,.5).setVisible(false);
        if(hasSoldForDay){
            this.marketEntranceInteract.text = "Come back tomorrow when it is earlier";
        }
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
                this.scene.pause('shopScene');
                this.scene.launch("backpackUI", {previousScene:"shopScene"});
            });
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
        if (Math.abs(Phaser.Math.Distance.Between(this.townExit.x,this.townExit.y, this.player.x,this.player.y)) < 100){
            this.townExitInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log("returning to hub");
                this.music.stop();
                this.scene.start("hubScene", {previousScene: "shopScene"});
            }
        } else {
            this.townExitInteract.setVisible(false);
        }

        if (Math.abs(Phaser.Math.Distance.Between(this.toadLeckman.x,this.toadLeckman.y, this.player.x,this.player.y)) < 100){
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
            this.marketEntranceInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE) && !hasSoldForDay) {
                //Play the transition song
                this.music.transitionSong("hubMarketTransition", false);
                //Fade to black
                this.cameras.main.fadeOut(3000, 0, 0, 0);
                this.time.delayedCall(9500, () => {
                    //this.scene.start('mapScene', { arrivingAt: -1 }) //for going to biking map
                    this.music.stop();
                    this.scene.start('marketScene');
                });
            }
        }
        else{
            this.marketEntranceInteract.setVisible(false);
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
}