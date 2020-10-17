class Settings extends Phaser.Scene {
    constructor() {
        super("settingsScene");
    }

    preload() {
        //load images/tile sprite
        this.load.spritesheet('Settings','./assets/SettingsInitial.png',{frameWidth: 158, frameHeight: 50, startFrame:0 , endFrame: 1});
        this.load.spritesheet('Back','./assets/BackInitial.png',{frameWidth: 114, frameHeight: 36, startFrame:0 , endFrame: 1});

        //load audio files
    }
    
    create() {
        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //Setting controls
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Setting Background

        //Creating interactable images
        let settings = this.add.image(centerX, textSpacer, 'Settings').setOrigin(0.5);
        let back = this.add.image(centerX/2, centerY + textSpacer*2, 'Back').setOrigin(0.5);
        //Making images interactable
        back.setInteractive();
        //Setting interactive behaviors
        back.on('pointerover', () => back.setFrame(1));
        back.on("pointerout", () => back.setFrame(0));
        back.on('pointerup', () => {this.scene.start('menuScene');});

        console.log(this);
    }

    update() {
        
    }

}