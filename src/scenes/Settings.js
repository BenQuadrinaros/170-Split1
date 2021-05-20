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
        
        //Create general background
        this.whiteSquare = this.add.rectangle(0, 0, config.width+50, config.height+50, 0xffffff, 1).setOrigin(0, 0);

        //Creating interactable images
        //let settings = this.add.image(centerX, centerY, 'TempSettingsScreen').setOrigin(0.5);
        //let back = this.add.image(centerX / 2, centerY + textSpacer * 2, 'Back').setOrigin(0.5);
        this.continueBackground = this.add.rectangle(config.width - 250, config.height - 100, 250, 100, 0xffffff, .5).setOrigin(0.5, 0.5).setInteractive()
        .on("pointerover", () => {
            this.continueText.alpha = 1;
            this.continueBackground.alpha = 1;
        })
        .on("pointerout", () => {
            this.continueText.alpha = .75;
            this.continueBackground.alpha = .5;
        })
        .on("pointerdown", () => {
            this.scene.resume(this.prevScene);
            this.scene.stop();
        });


        this.textConfig = {
            fontFamily: font,
            fontSize: "48px",
            color: "#000000",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        this.continueText = this.add.text(config.width - 250, config.height - 100, "Apply", this.textConfig).setOrigin(0.5, 0.5).setDepth(5);
        this.continueText.setAlpha(.75);

        this.textConfig.fontSize = "24px";

        let musicText = this.add.text(centerX, centerY/3 + textSpacer/2, "Background Music Volume", this.textConfig).setOrigin(0.5, 0.5);
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

        let sfxText = this.add.text(centerX, centerY/3 + 5*textSpacer/2, "Sound Effects Volume", this.textConfig).setOrigin(0.5, 0.5);
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

        let beeBumpText = this.add.text(centerX, centerY/3 + 9*textSpacer/2, "Bee Bump Collisions:\nOFF", 
            this.textConfig).setOrigin(.5, .5).setAlpha(.75);
        beeBumpText.setInteractive();
        beeBumpText.on('pointerover', () => {
            beeBumpText.setAlpha(1);
        });
        beeBumpText.on("pointerout", () => {
            beeBumpText.setAlpha(.75);
        });
        beeBumpText.on('pointerup', () => {
            playerVariables.beeBump = !(playerVariables.beeBump);
            if(playerVariables.beeBump) { beeBumpText.text = "Bee Bump Collisions:\nON"; }
            else { beeBumpText.text = "Bee Bump Collisions:\nON"; }
        })

        this.textConfig.fontSize = "28px";
        let sceneNameText = this.add.text(centerX, centerY/5, "Settings", this.textConfig).setOrigin(0.5, 0.5);
    }

    update() {

    }

}