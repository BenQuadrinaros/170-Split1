class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio files
        this.load.audio("menuMusic", "./assets/honeybear_2.wav");

        //load images
        this.load.image('TitleScreen', './assets/TempTitle.png');
        this.load.spritesheet('Play','./assets/PlayInitial.png',{frameWidth: 130, frameHeight: 66, startFrame:0 , endFrame: 1});
        this.load.spritesheet('Settings','./assets/SettingsInitial.png',{frameWidth: 158, frameHeight: 50, startFrame:0 , endFrame: 1});
    }
    
    create() {

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        //Setting controls
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Setting Background
        this.menu = this.add.image(centerX, centerY, 'TitleScreen').setOrigin(0.5);
        //Creating interactable images
        let play = this.add.image(centerX/2, centerY + textSpacer, 'Play').setOrigin(0.5);
        let settings = this.add.image(centerX/2, centerY + textSpacer * 2, 'Settings').setOrigin(0.5);
        //Making images interactable
        play.setInteractive();
        settings.setInteractive();
        //Setting interactive behaviors
        play.on('pointerover', () => play.setFrame(1));
        play.on("pointerout", () => play.setFrame(0));
        play.on('pointerup', () => {
            this.music.stop();
            this.scene.start('hubScene');
        });
        settings.on('pointerover', () => settings.setFrame(1));
        settings.on("pointerout", () => settings.setFrame(0));
        settings.on('pointerup', () => {
            this.music.stop();
            this.scene.start('settingsScene');
        });

        //background music for the menu
        this.music = this.sound.add("menuMusic");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();
    }

    update() {
    }
}
