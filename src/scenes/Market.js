class Market extends Phaser.Scene {
    constructor() {
        super("marketScene");
    }

    init(data) { }

    create() {
        this.cameras.main.setBackgroundColor(0x000000);
        //REPLACE with actual background
        this.background = this.add.image(config.width/2, config.height/2, 'background').setOrigin(0.5, 0.5).setScale(0.5, 0.5);

        //bike propped up on stand
        this.bike = this.add.image(game.config.width / 6, 5 * game.config.height / 10, 'bike');
        this.bike.setOrigin(.5, .5).setScale(.5, .5);
        this.bike.depth = 35;

        //bear in costume selling honey
        this.bear = this.add.image(game.config.width / 2.5, 7 * game.config.height / 10, 'bearBee');
        this.bear.setOrigin(.5, .5).setScale(9, 9);
        this.bear.depth = 50;

        //Text config without a background, which blends better with the background
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

        //UI texts for resources
        this.honeyText = this.add.text(game.config.width / 10, game.config.height / 10 - 25, "Honey: ", this.textConfig).setOrigin(.5, .5);
        this.honeyText.depth = 100;
        this.moneyText = this.add.text(game.config.width / 10, game.config.height / 10, "Money: ", this.textConfig).setOrigin(.5, .5);
        this.moneyText.depth = 100;
        this.timeText = this.add.text(game.config.width / 10, game.config.height / 10 + 25, "Time Remaining: ", this.textConfig).setOrigin(.5, .5);
        this.timeText.depth = 100;
        this.timeUpText = this.add.text(game.config.width / 10, game.config.height / 10 - 25, 
            "TIME'S UP\nPress Down to go to the Map", this.textConfig).setOrigin(.5, .5);
        this.timeUpText.depth = 100;
        this.timeUpText.alpha = 0;
        this.timeUp = false;

        //establish controls for gameplay
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);

        //background music for the hub
        //CHNAGE SONG FOR MARKET
        this.music = this.sound.add("hubMusic");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();

        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        });

        //Start the timer for the selling portion
        this.timer = this.time.addEvent({
            delay: 90000,
            callback: () => {
                this.honeyText.alpha = 0;
                this.moneyText.alpha = 0;
                this.timeText.alpha = 0;
                this.timeUpText.alpha = 1;
                this.timeUp = true;
            },
            loop: false,
            callbackScope: this
        });
    }

    update() {
        //update text UIs
        this.moneyText.text = "Money: " + playerVariables.money;
        this.honeyText.text = "Honey: " + playerVariables.honey;
        let currTime = Math.floor((this.timer.delay - this.timer.getElapsed())/1000);
        this.timeText.text = "Time Remaining: " + Math.floor(currTime/60) + ":" + Math.floor((currTime%60)/10) + currTime%10;

        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", { previousScene: "hubScene" });
        }
        else {
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        }
        if(this.timeUp) {
            if(Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                //go to map
                //ADD HERE
            }
        } else {
            //Occasional bear wiggle
            this.bear.x += .25 * Math.sin(currTime/2);
            this.bear.y += .1 * Math.sin(currTime/4 + 1);

            //Patrons come and go
            //Ocassionally ask for honey
            //FILL IN
        }
    }
}