class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    preload() {
        //load images
        this.load.image("rhythm meter", "./assets/RhythmMeter.png");
        this.load.image("noteTemp", "./assets/white.png");

        //load audio files
    }

    create() {
        this.cameras.main.setBackgroundColor("#AAA");

        //meter and tilting factors
        this.meter = this.add.image(game.config.width / 2, 7 * game.config.height / 8, "rhythm meter").setOrigin(.5);
        this.tiltFactor = 0;
        this.tiltLimit = 45;
        this.missedNotes = 0;
        this.missTreshold = 5;

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
        this.tiltText = this.add.text(.5 * game.config.width, game.config.height / 8, "Tilt angle: " + this.tiltFactor + " °",
            this.textConfig).setOrigin(.5);
        this.missText = this.add.text(.5 * game.config.width, game.config.height / 6, "Missed notes: " + this.missedNotes,
            this.textConfig).setOrigin(.5);
        this.textConfig.fontSize = "48px";
        this.pauseText = this.add.text(.5 * game.config.width, game.config.height / 2, "PAUSED",
            this.textConfig).setOrigin(.5);
        this.pauseText.alpha = 0;

        //misc set up
        this.allNotes = [];
        this.paused = false;
        this.gameOver = false;

        //establish controls for gameplay
        keyLEFT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT);
        keyRIGHT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //song for level
        //CHANGE TO LEVEL PARAMETER FOR FINAL LEVELS
        let testSong = [[0, 0, 1, 0],
        [1, [0, 1], 0, 1],
        [0, 1, [1, 1], 1],
        [0, 0, 1, 1]];

        this.tempo = 2;
        let newSong = new Song(testSong, [4, 4], 60);

        let songIndex = 0;
        this.songNotes = this.time.addEvent({
            delay: 1000 * newSong.output[songIndex],
            callback: () => {
                if (songIndex % 2 == 0) {
                    this.allNotes.push(new Note(this, "noteTemp", 0, "left", "left", this.tempo));
                } else {
                    this.allNotes.push(new Note(this, "noteTemp", 0, "right", "right", this.tempo));
                }
                songIndex++;
                this.songNotes.delay = 1000 * (newSong.output[songIndex] - newSong.output[songIndex - 1]);
                if (songIndex >= newSong.output.length) { this.songNotes.loop = false; }
            },
            loop: true,
            callbackScope: this
        });
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
                this.allNotes[i].update();
                this.allNotes[i].setTempo(this.tempo);
                if (this.allNotes[i].side == "left" && this.allNotes[i].x > this.meter.x + 15) {
                    this.missedNotes++;
                    this.tiltFactor -= 5;
                    this.allNotes[i].destroy();
                    this.allNotes.splice(i, 1);
                } else if (this.allNotes[i].side == "right" && this.allNotes[i].x < this.meter.x - 15) {
                    this.missedNotes++;
                    this.tiltFactor += 5;
                    this.allNotes[i].destroy();
                    this.allNotes.splice(i, 1);
                }
            }

            this.tiltFactor *= 1.001;
            this.tiltText.text = "Tilt angle: " + this.tiltFactor.toFixed(0) + " °";
            this.missText.text = "Missed notes: " + this.missedNotes;

            if (Math.abs(this.tiltFactor) >= this.tiltLimit || this.missedNotes >= this.missTreshold) {
                this.gameOver = true;
                this.gameOverText = this.add.text(.5 * game.config.width, game.config.height / 2, "GAME OVER",
                    this.textConfig).setOrigin(.5);
                this.songNotes.paused = !this.songNotes.paused;
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyP)) {
            this.paused = !this.paused;
            if (this.pauseText.alpha == 0) {
                this.pauseText.alpha = 1;
            } else {
                this.pauseText.alpha = 0;
            }
            this.songNotes.paused = !this.songNotes.paused;
        }

    }

    checkKey(key) {
        let tiltChange;
        for (let i = 0; i < this.allNotes.length; i++) {
            if (this.allNotes[i].keyValue == key) {
                tiltChange = (this.allNotes[i].x - this.meter.x) / 25;
                if (tiltChange > 5) { tiltChange = 5; }
                if (tiltChange < -5) { tiltChange = -5; }
                this.tiltFactor += tiltChange;
                this.allNotes[i].destroy();
                this.allNotes.splice(i, 1);
                return;
            }
        }
        if (key == "left") { tiltChange = -5; }
        else { tiltChange = 5; }
        this.tiltFactor += tiltChange;
    }

}
