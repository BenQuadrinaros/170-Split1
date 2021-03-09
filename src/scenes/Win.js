class Win extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    create() {
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

        let text = this.add.text(config.width / 2, config.height / 2, "You win!\nEnjoy your bear-tirement.\n" +
            "Press Down to return\nto the main menu.", this.textConfig).setOrigin(.5, .5);
            
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
        }
    }
}