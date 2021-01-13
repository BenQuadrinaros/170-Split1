class Play extends Phaser.Scene {
    constructor() {
        super("playScene");
    }

    init(data) {
        this.destination = data.destination;
        this.honey = data.currentHoney;
        this.money = data.currentMoney;
        this.honeyDemandData = data.honeyDemand;
        this.honeyDemand = data.honeyDemand[0][this.destination];
        this.remainHoney = this.honeyDemand;
    }

    preload() {
        //load images
        this.load.image("Player", "./assets/bearOnBike.png");
        this.load.image("Road", "./assets/roadFullEX-02.png");

        //load audio
        let audioRoulette = ["BackgroundMusic.wav", "castle_theme_loop.mp3", "happy_thing_that_i_got_bored_with.mp3", "thing.mp3"];
        let chance = Phaser.Math.Between(0, audioRoulette.length-1);
        this.load.audio("music", "./assets/"+audioRoulette[chance]);
    }

    create() {
        this.cameras.main.setBackgroundColor("#999");

        //Scrolling Background
        this.townRoad = this.add.tileSprite(0,0,1920,1080,'Road').setOrigin(0,0).setScale(.5, .5);

        //Player Prefab
        this.player = new BikePlayer(this, game.config.width / 4, 3 * game.config.height / 5, "Player", 0);

        //Misc Set Up
        this.paused = false;
        this.gameOver = false;
        this.distanceToTravel = 1000;
        this.distanceTraveled = 0;

        //UI Text Configurations
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

        //UI Text for Top of Screen
        this.totalHoneyText = this.add.text(.5 * game.config.width, game.config.height / 8 - 20, "Max jars to deliver: " + 
            this.honeyDemand, this.textConfig).setOrigin(.5);
        this.remainHoneyText = this.add.text(.5 * game.config.width, game.config.height / 8, "Remaining jars: " + 
            this.honeyDemand, this.textConfig).setOrigin(.5);
        this.distanceText = this.add.text(.5 * game.config.width, game.config.height / 8 + 20, "Remaining distance: " + 
            this.distanceToTravel, this.textConfig).setOrigin(.5);

        //Overlays for Pause & Game Over
        this.textConfig.fontSize = "32px";
        this.pauseText = this.add.text(.5 * game.config.width, game.config.height / 2, "PAUSED",
            this.textConfig).setOrigin(.5);
        this.pauseText.alpha = 0;
        this.gameOverText = this.add.text(.5 * game.config.width, game.config.height / 2, "GAME OVER",
            this.textConfig).setOrigin(.5);
        this.gameOverText.alpha = 0;

        //Reserve Keys
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.P);

        //Start Up Music
        this.music = this.sound.add("music");
        this.music.volume = config.volume;
        this.music.loop = true;
        this.music.play();
    }

    update() {
        //Possible Game States
        if (this.gameOver) { //Game is over

            //DEV TOOLS
            if (Phaser.Input.Keyboard.JustDown(keyUP)) {
                this.gameOverText.alpha = 0;
                this.remainHoney = this.honeyDemand;
                this.remainHoneyText.text = "Remaining jars: " + this.honeyDemand;
                this.gameOver = false;
            }
            if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
                this.music.stop();
                this.cache.audio.remove("music");
                //ADD HERE
                //COMPENSATE FOR MISSING HONEY
                this.scene.start('mapScene', { arrivingAt:this.destination, currentHoney:this.honey, currentMoney:this.money, honeyDemand:this.honeyDemandData });
            }
            //REMOVE IN FINAL VERSION

        } else if (this.paused) { //Game is paused
            if (Phaser.Input.Keyboard.JustDown(keyP)) {
                this.pauseText.alpha = 0;
                this.music.setVolume(config.volume);
                this.paused = false;
            }
        } else { //Game is running
            //Move Background
            this.townRoad.tilePositionX += 6;

            this.distanceTraveled += 1;
            this.distanceText.text = "Remaining distance: " + (this.distanceToTravel - this.distanceTraveled);

            this.player.update();
            this.player.depth = this.player.y / 10;

            if (Phaser.Input.Keyboard.JustDown(keyP)) {
                this.paused = true;
                this.pauseText.alpha = 1;
                this.music.setVolume(config.volume / 4);
            }
            
            if (this.distanceTraveled >= this.distanceToTravel) {
                this.music.stop();
                this.cache.audio.remove("music");
                //ADD HERE
                //COMPENSATE FOR MISSING HONEY
                this.scene.start('mapScene', { arrivingAt:this.destination, currentHoney:this.honey, currentMoney:this.money, honeyDemand:this.honeyDemandData });
            }
        }
        
    }
}