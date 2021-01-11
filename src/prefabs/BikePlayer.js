class BikePlayer extends Phaser.GameObjects.Sprite {
    constructor(scene, initx, inity, texture, frame) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPosition(initX, initY);
    }



    update(){
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.y+= 50;
        }

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            this.y+= 50;
        }
    }
}