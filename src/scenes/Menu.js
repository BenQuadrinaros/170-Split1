class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

        this.currSelected = -1;
    }


    
    create() {

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //Setting controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);

        //Setting Background
        this.menu = this.add.image(centerX, centerY, 'TitleScreen').setOrigin(0.5);
        //Creating interactable images
        this.play = this.add.image(centerX/2, centerY + textSpacer, 'Play').setOrigin(0.5);
        this.settings = this.add.image(centerX/2, centerY + textSpacer * 2, 'Settings').setOrigin(0.5);
        
        //Create selection change event
        this.events.on("selectionChange", this.selectionUpdated, this);

        //Making images interactable
        this.play.setInteractive();
        this.settings.setInteractive();
        //Setting interactive behaviors
        this.play.on('pointerover', () => {
            this.currSelected = 1;
            this.events.emit("selectionChange");
        });
        this.play.on("pointerout", () => {
            this.currSelected = -1;
            this.events.emit("selectionChange");
        });
            
        this.play.on('pointerup', () => {
            //this.music.stop();
            //this.scene.start('hubScene');
            this.moveToNewScene(1);
        });
        this.settings.on('pointerover', () => {
            this.currSelected = 2;
            this.events.emit("selectionChange");
        });
        this.settings.on("pointerout", () => {
            this.currSelected = -1;
            this.events.emit("selectionChange");
        });
        this.settings.on('pointerup', () => {
            //this.music.stop();
            //this.scene.start('settingsScene');
            this.moveToNewScene(2);
        });

        //background music for the menu
        this.music = this.sound.add("menuMusic");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            if(this.currSelected === -1){
                this.currSelected = 1;
                this.events.emit("selectionChange");
            }
            else{
                this.currSelected -= 1;
                if(this.currSelected === 0){
                    this.currSelected = 2;
                }
                this.events.emit("selectionChange");
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if(this.currSelected === -1){
                this.currSelected = 1;
                this.events.emit("selectionChange");
            }
            else{
                this.currSelected += 1;
                if(this.currSelected === 3){
                    this.currSelected = 1;
                }
                this.events.emit("selectionChange");
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyENTER)){
            if(this.currSelected === -1){
                //No effect if nothing selected
            }
            else{
                this.moveToNewScene(this.currSelected);
            }
        }
    }

    selectionUpdated(){
        //For each option, set the frame properly
        console.log("Selection Updated: " + this.currSelected);
        //Play
        if(this.currSelected === 1){
            this.play.setFrame(1);
        }
        else{
            this.play.setFrame(0);
        }

        //Settings
        if(this.currSelected === 2){
            this.settings.setFrame(1);
        }
        else{
            this.settings.setFrame(0);
        }
    }

    moveToNewScene(newScene){
        this.music.stop();
        //Play is being pressed
        if(newScene === 1){
            this.scene.start('hubScene');
        }
        //Settings is being pressed
        else if(newScene === 2){
            this.scene.start('settingsScene');
        }
        //Other result
        else{
            console.log("Invalid Scene selected: " + newScene);
        }
    }
}
