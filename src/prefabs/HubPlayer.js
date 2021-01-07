class HubPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, initX, initY) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        this.setPosition(initX, initY);
        this.setScale(2.0, 2.0);
    }


    update(){
        if (keyLEFT.isDown){
            this.flipX = true;
            if (this.x > 0){
                this.x -= game.config.width / 800;
            }
        }

        if (keyRIGHT.isDown){
            this.flipX = false;
            if (this.x < config.width){
                this.x += game.config.width / 800;
            }
        }

        if (keyUP.isDown){
            this.setFrame(1);
            if (this.y > 0){
                this.y -= game.config.height / 450;
            }
        }
        else { //Remove this once we have multiple frames
            this.setFrame(0);
        }
        

        if (keyDOWN.isDown){
            this.setFrame(0);
            if (this.y < config.height){
                this.y += game.config.height / 450;
            }
        }

    }

}