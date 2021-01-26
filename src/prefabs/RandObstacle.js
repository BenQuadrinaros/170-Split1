class RandObstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, initx, inity, texture, frame, speed) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = speed;
        this.setPosition(initx, inity);
        this.startPoint = initx;
    }



    update(){
        this.x -= this.speed;
        //console.log("I am a random obstale at : " + this.x + " " + this.y);
        if (this.x < -25){
            let row = Phaser.Math.Between(1, 3);
            this.y =  (1 + row) * game.config.height / 5;
            this.x = game.config.width + Phaser.Math.Between(50, 250);
        }
    }
}