class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, initx, inity, texture, frame, name, personality, voiceLines){
        super(scene, initx, inity, texture, frame);
        this.name = name;
        this.personality = personality;
        this.voiceLines = voiceLines;
    }

}