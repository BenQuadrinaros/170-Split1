class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, initx, inity, texture, frame, name, personality, voiceLines){
        super(scene, initx, inity, texture, frame);
        scene.add.existing(this);
        this.scene = scene;
        this.setPosition(initx, inity);
        this.name = name;
        this.personality = personality;
        this.voiceLines = voiceLines;
    }

    approach(){
        console.log("NPC has been asked to approach");
        this.setScale(0, 0);
        this.approachTween = this.scene.tweens.add({
            targets: this,
            depth: 90,
            scale: 1,
            ease: 'Sine.easeOut',
            duration: 1500,
            delay: 0,
            repeat: 0
        });
    }

    leave(){
        console.log("NPC has been asked to leave");
        this.leaveTween = this.scene.tweens.add({
            targets: this,
            depth: 1,
            scale: 0,
            ease: 'Sine.easeOut',
            duration: 1500,
            delay: 0,
            repeat: 0
        });
    }
}