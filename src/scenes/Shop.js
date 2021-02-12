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

        vars["Cosmo"] = this.add.image(10000,100000,"PlayerIcon").setOrigin(.5,.5);
        //Initialize images
        this.background = this.add.image(config.width/2, config.height/2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-10);
        this.player = new HubPlayer(this, 'player', 0, config.width / 2, config.height / 2).setDepth(-10);

        //Initialize image animation variables
        this.bounceFactor = .1;
        this.counter = 0;

        //add timing aspect for hub actions
        this.fadeMessage;
        this.fadeTimer = null;
        this.counter = 0;

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
                this.scene.pause('shopScene');
                this.scene.launch("backpackUI");
        });

        //create shop text
        this.shopText = this.add.text(config.width/4,config.height/2, "SHOP", this.textConfig).setOrigin(.5,.5).setVisible(true);
        this.shopTextInteract = this.add.text(config.width/4,(config.height/2)-20, "Space to interact with shop", this.textConfig).setOrigin(.5,.5).setVisible(false);

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyO = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.O);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }
    update(){
        this.player.update();
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
        if (Math.abs(Phaser.Math.Distance.Between(this.shopText.x,this.shopText.y, this.player.x,this.player.y)) < 100){
        this.shopTextInteract.setVisible(true);
            if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
                this.scene.pause('shopScene');
                this.scene.launch("shopUIScene");
            }
        } else {
            this.shopTextInteract.setVisible(false);
        }


    }
}