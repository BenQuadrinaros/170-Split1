class Flower extends Phaser.GameObjects.Sprite{
    constructor(scene, initx, inity, texture, frame, gridx, gridy, color, age){
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        this.setPosition(initx, inity);

        this.gridx = gridx;
        this.gridy = gridy;
        this.color = color;
        this.age = age;
    }
}