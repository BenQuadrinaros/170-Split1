class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, initx, inity, texture, frame, speed) {
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = speed;
        this.setPosition(initx, inity);
        this.lane = 'None'
        this.startPoint = initx;
    }



    update(){
        this.x -= this.speed;
        //console.log("I am an obstale at : " + this.x)
        if (this.x < -10){
            this.x = this.startPoint;
        }
    }
}