class Settings extends Phaser.Scene {
    constructor() {
        super("settingsScene");
        this.COLOR_PRIMARY = 0x4e342e;
        this.COLOR_LIGHT = 0x7b5e57;
        this.COLOR_DARK = 0x260e04;
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });

    }

    create() {
        let centerX = game.config.width / 2;
        let centerY = game.config.height / 2;
        let textSpacer = 64;
        
        //Creating interactable images
        let settings = this.add.image(centerX, centerY, 'TempSettingsScreen').setOrigin(0.5);
        //let back = this.add.image(centerX / 2, centerY + textSpacer * 2, 'Back').setOrigin(0.5);
        this.continueBackground = this.add.rectangle(config.width - 125, config.height - 50, 150, 75, 0xffffff, .5).setOrigin(0.5, 0.5).setInteractive()
        .on("pointerover", () => {
            this.continueText.alpha = 1;
            this.continueBackground.alpha = 1;
        })
        .on("pointerout", () => {
            this.continueText.alpha = .5;
            this.continueBackground.alpha = .5;
        })
        .on("pointerdown", () => {
            this.scene.resume(this.prevScene);
            this.scene.stop();
        });


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

        this.continueText = this.add.text(config.width - 125, config.height - 50, "Apply", this.textConfig).setOrigin(0.5, 0.5).setDepth(5);
        this.continueText.setAlpha(.5);
        let musicText = this.add.text(centerX, centerY/3, "Background Music Volume", this.textConfig).setOrigin(0.5, 0.5);
        this.slider = this.rexUI.add.slider({
            x: centerX,
            y: centerY/3 + textSpacer,
            width: 200,
            height: 20,
            orientation: 'x',
            value: config.volume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, this.COLOR_DARK),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.COLOR_LIGHT),

            valuechangeCallback: function (value) {
                console.log("value of slider? " + value );
                config.volume = value;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        }).layout();

        let sfxText = this.add.text(centerX, centerY/3 + 2*textSpacer, "Sound Effects Volume", this.textConfig).setOrigin(0.5, 0.5);
        this.sfxSlider = this.rexUI.add.slider({
            x: centerX,
            y: centerY/3 + 3*textSpacer,
            width: 200,
            height: 20,
            orientation: 'x',
            value: sfxVolume,

            track: this.rexUI.add.roundRectangle(0, 0, 0, 0, 6, this.COLOR_DARK),
            thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.COLOR_LIGHT),

            valuechangeCallback: function (value) {
                console.log("value of slider? " + value );
                sfxVolume = value;
            },
            space: {
                top: 4,
                bottom: 4
            },
            input: 'drag', // 'drag'|'click'
        }).layout();
    }

    update() {

    }

}