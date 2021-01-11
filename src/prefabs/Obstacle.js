class Obstacle extends Phaser.GameObjects.Sprite {
    constructor(scene, initx, inity, texture, frame, speed) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.speed = speed;
        this.setPosition(initX, initY);
    }



    update(){
        this.x += this.speed;
    }
}