class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images
        this.load.image("rhythm meter", "./assets/RhythmMeter.png");

        //load audio files
    }

    create() {
        this.cameras.main.setBackgroundColor("#AAA");

        this.meter = this.add.image(game.config.width / 2, 7 * game.config.height / 8, "rhythm meter").setOrigin(.5);
        this.tiltFactor = 0;
        this.tiltLimit = 45;
        this.textConfig = {
            fontFamily: "Ariel",
            fontSize: "20px",
            color: "#000",
            align: "center",
            padding: {
                top: 5,
                bottom: 5
            },
            fixedWidth: 0
        };
        this.tiltText = this.add.text(.5 * game.config.width, game.config.height / 8, "Tilt angle: " + this.tiltFactor,
            this.textConfig).setOrigin(.5);

        this.allNotes = [];

        this.paused = false;
        this.gameOver = false;

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESCAPE);
    }

    update() {
        if (this.gameOver) {

        } else if (this.paused) {

        } else {
            if (Phaser.Input.Keyboard.JustDown(keyLEFT)) {
                this.checkKey("left")
            }
            if (Phaser.Input.Keyboard.JustDown(keyRIGHT)) {
                this.checkKey("right")
            }

            for (let i = 0; i < this.allNotes.length; i++) {
                allNotes[i].update();
            }
            
            this.tiltText.text = "Tilt angle: " + this.tiltFactor;

            if (Math.abs(this.tiltFactor) >= this.tiltLimit) {
                this.gameOver = true;
                this.gameOverText = this.add.text(.5 * game.config.width, game.config.height / 2, "GAME OVER",
                this.textConfig).setOrigin(.5);
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyP) || Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            this.paused = !this.paused;
        }

    }

    checkKey(key) {
        let tiltChange
        for (let i = 0; i < this.allNotes.length; i--) {
            if (this.allNotes[i].keyValue == key) {
                tiltChange = (allNotes[i].x - this.meter.x) / 50;
                if (tiltChange > 5) { tiltChange = 5; }
                if (tiltChange < -5) { tiltChange = -5; }
                this.tiltFactor += tiltChange;
                this.allNotes[i].destroy();
                return;
            }
        }
        if (this.allNotes.length == 0) {
            if (key == "left") { tiltChange = -5; }
            else { tiltChange = 5; }
        } else {
            tiltChange = (this.allNotes[0].x - this.meter.x) / 50;
        }
        if (tiltChange < 0) { this.tiltFactor -= 5; }
        else { this.tiltFactor += 5; }
    }

}
