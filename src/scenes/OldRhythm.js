class OldRhythm extends Phaser.Scene {
    constructor() {
        super("oldRythmScene");
    }

    init(data) {
        this.songName = data.song[0];
        this.timeSigniture = data.song[1];
        this.bpm = data.song[2];
        this.tempo = data.song[3];
        this.allSongNotes = data.song[4];
        this.destination = data.destination;
        this.honey = data.currentHoney;
        this.money = data.currentMoney;
        this.honeyDemand = data.honeyDemand;
    }

    preload() {
        //load images
        this.load.image("rhythm meter", "./assets/RhythmMeterORG.png");
        this.load.image("LeftArrow", "./assets/LeftArrowGREEN.png");
        this.load.image("RightArrow", "./assets/RightArrowBLUE.png");
        this.load.image("Player", "./assets/bearOnBike.png");
        this.load.image("Road", "./assets/roadFullEX-02.png");

        //load audio files
        this.load.audio("music", "./assets/"+this.songName);
    }

    create() {
        this.cameras.main.setBackgroundColor("#999");

        //Scrolling Background
        this.townRoad = this.add.tileSprite(0,0,1920,1080,'Road').setOrigin(0,0).setScale(.35, .35);

        //Player Icon
        this.player = this.add.image(game.config.width/2, game.config.height/2 + 50, "Player");

        //meter and tilting factors
        this.meter = this.add.image(game.config.width / 2, 7 * game.config.height / 8, "rhythm meter").setOrigin(.5);
        this.tiltFactor = 0;
        this.tiltLimit = 45;
        this.missedNotes = 0;
        this.missTreshold = 5;

        this.textConfig = {
            fontFamily: font,
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

        //start up music for rhythm game
        this.music = this.sound.add("music");
        this.music.volume = config.volume;
        this.music.play();

        //song for level
        let newSong = new Song(this.allSongNotes, this.timeSigniture, this.bpm);

        let songIndex = 0;
        this.songNotes = this.time.addEvent({
            delay: 1000 * newSong.output[songIndex],
            callback: () => {
                if (songIndex % 2 == 0) {
                    this.allNotes.push(new Note(this, "LeftArrow", 0, "left", "left", this.tempo));
                } else {
                    this.allNotes.push(new Note(this, "RightArrow", 0, "right", "right", this.tempo));
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

        //Move Background
        this.townRoad.tilePositionX += 6; 

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

            if (this.songNotes.loop == false && this.allNotes.length == 0) {
                this.music.stop();
                this.cache.audio.remove("music");
                this.scene.start('mapScene', { arrivingAt:this.destination, currentHoney:this.honey, currentMoney:this.money, honeyDemand:this.honeyDemand });
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
            if (this.paused) {
                this.music.pause();
            } else {
                this.music.resume();
            }
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
