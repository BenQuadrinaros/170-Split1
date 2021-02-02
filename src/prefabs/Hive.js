class Hive extends Phaser.GameObjects.Sprite{
    constructor(scene, initx, inity, texture, frame, gridx, gridy){
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        this.setPosition(initx, inity);

        this.gridx = gridx;
        this.gridy = gridy;
    }
}