class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");
    }

    preload() {
        //load audio files
    }
    
    create() {
        let menuConfig = {
            fontFamily: "Courier", 
            fontSize: "26px",
            backgroundColor: "#F3B141",
            color: "#843605",
            align: "right",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 64;

        this.add.text(centerX, centerY - textSpacer, "ROCKET PATROL", menuConfig).setOrigin(.5);
        this.add.text(centerX, centerY, "Use <- -> arrows to move and (F) to Fire", menuConfig).setOrigin(.5);
        menuConfig.backgroundColor = "#00FF00";
        menuConfig.color = "#000";
        this.add.text(centerX, centerY + textSpacer, "Press <- for Easy and  -> for Hard", menuConfig).setOrigin(.5);

        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);

        //launches next scene
        //this.scene.start("playScene");
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyLEFT)) {
            this.sound.play("sfx_select");
            this.scene.start("playScene");
        }
    }
}
