class Win extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    create() {
        //Background image
        this.backdrop = this.add.image(config.width/2, config.height/2, "titleScreenBG").setScale(0.5);
        this.backdropBear = this.add.image(config.width/2, config.height/2, "titleScreen3").setScale(0.5);

        this.textConfig = {
            fontFamily: font,
            fontSize: "18px",
            color: "#000000",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        this.add.text(config.width / 5, 7*config.height / 10, "You've restored the garden\nto amazing health!\n" +
            "Enjoy your bear-tirement.\n\nPress Down to return to the main menu.\n\nPress SPACE to return to your garden.", 
            this.textConfig).setOrigin(.5, .5);
            
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
        }

        if (Phaser.Input.Keyboard.JustDown(keySPACE)) {
            this.scene.start("hubScene");
        }
    }
}