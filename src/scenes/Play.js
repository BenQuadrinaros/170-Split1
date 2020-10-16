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
        this.cameras.main.setBackgroundColor("#222");

        this.meter = this.add.image(game.config.width/2, 7 * game.config.height / 8, "rhythm meter").setOrigin(.5);
    }

    update() {
        
    }

}
