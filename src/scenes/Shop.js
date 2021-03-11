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
        previousScene = this;
        vars["Cosmo"] = this.add.image(10000,100000,"PlayerIcon").setOrigin(.5,.5);
        //Initialize images
        this.background = this.add.image(config.width/2, config.height/2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-10);
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2).setDepth(-10);
        this.toadLeckman = this.add.image(config.width/4,config.height/2, 'toadLeckman').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        //Initialize image animation variables
        this.bounceFactor = .1;
        this.counter = 0;

        //add timing aspect for hub actions
        this.fadeMessage;
        this.fadeTimer = null;
        this.counter = 0;

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
        this.shopExit = this.add.text(4*config.width/5, 2*config.height/3, "STORE EXIT", this.textConfig).setOrigin(.5,.5).setVisible(true);
        this.shopExitInteract = this.add.text(4*config.width/5, (2*config.height/3)-20, "Space to go back to the hub", this.textConfig).setOrigin(.5,.5).setVisible(false);
        this.toadTextInteract = this.add.text(this.toadLeckman.x,this.toadLeckman.y, "Space to interact with the shop", this.textConfig).setOrigin(.5,.5).setVisible(false);

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Misc setup variables
        this.pointerCurrentlyOver = ""; 

        //create the background music manager
        this.music = new BGMManager(this);
        this.music.playSong("shopMusicFull", false);
        this.music.queueSong("shopMusicShort", true);

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
    update(){
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", { previousScene: "shopScene" });
        }
        else{
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }

        this.player.update();
        if (Math.abs(Phaser.Math.Distance.Between(this.shopExit.x,this.shopExit.y, this.player.x,this.player.y)) < 100){
            this.shopExitInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log("returning to hub");
                this.music.stop();
                this.scene.start("hubScene", {previousScene: "shopScene"});
            }
        } else {
            this.shopExitInteract.setVisible(false);
        }
        if (Math.abs(Phaser.Math.Distance.Between(this.toadLeckman.x,this.toadLeckman.y, this.player.x,this.player.y)) < 100){
            this.toadTextInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                console.log("launching shop ui");
                this.scene.pause('shopScene');
                this.scene.launch("shopUIScene");
            }
        } else {
            this.toadTextInteract.setVisible(false);
        }
        if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            heldItem = undefined;

        }

        if (heldItem !== undefined){
            vars[heldItem].x = this.player.x;
            vars[heldItem].y = this.player.y;
        }
        if (this.counter % 60 === 0){
            this.bounceFactor = -this.bounceFactor;
        }



    }
}