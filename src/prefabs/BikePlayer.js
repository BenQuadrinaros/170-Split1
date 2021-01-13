class BikePlayer extends Phaser.GameObjects.Sprite {
    constructor(scene, initX, initY, texture, frame) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPosition(initX, initY);

        this.lane = "middle";
    }



    update(){
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) && this.lane != "top") {
            this.y += game.config.height / 5;
            if(this.lane == "middle") {
                this.lane = "top";
            } else {
                this.lane = "middle";
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyUP) && this.lane != "bottom") {
            this.y -= game.config.height / 5;
            if(this.lane == "middle") {
                this.lane = "bottom";
            } else {
                this.lane = "middle";
            }
        }
    }
}