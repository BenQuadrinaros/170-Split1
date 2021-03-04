class Tutorial extends Phaser.Scene {
    constructor() {
        super("tutorialScene");
        this.COLOR_PRIMARY = 0x4e342e;
        this.COLOR_LIGHT = 0x7b5e57;
        this.COLOR_DARK = 0x260e04;
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
    }

    preload() {

    }

    create() {
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;

        //Setting controls
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //Setting Background

        //Creating interactable images
        let tutorial = this.add.image(centerX, centerY, 'TempTutorialScreen').setOrigin(0.5);
        let back = this.add.image(centerX / 6, 9*config.height/10, 'Back').setOrigin(0.5).setScale(0.85);
        //Making images interactable
        back.setInteractive();
        //Setting interactive behaviors
        back.on('pointerover', () => back.setFrame(1));
        back.on("pointerout", () => back.setFrame(0));
        back.on('pointerup', () => {
            this.scene.resume(this.prevScene);
            this.scene.stop();
        });

        console.log(this);
    }

    update() {

    }

}