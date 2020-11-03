class HubPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, initX, initY) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this)
        this.setPosition(initX, initY)
    }


    update(){
        if (keyLEFT.isDown){
            this.flipX = false;
            if (this.x > 0){
                this.x -= 1;
            }
        }

        if (keyRIGHT.isDown){
            this.flipX = true;
            if (this.x < config.width){
                this.x += 1;
            }
        }

        if (keyUP.isDown){
            if (this.y > 0){
                this.y -= 1;
            }
        }

        if (keyDOWN.isDown){
            if (this.y < config.height){
                this.y += 1;
            }
        }

    }

}