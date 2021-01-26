class HubPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, initX, initY) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPosition(initX, initY);
        this.setScale(2.0, 2.0);

        //For moving to a clicked location
        this.clickedX = this.x;
        this.clickedY = this.y;
    }


    update(){
        if (keyLEFT.isDown){
            this.flipX = true;
            if (this.x > 0){
                this.x -= game.config.width / 800;
                this.clickedX = this.x;
            }
        }

        if (keyRIGHT.isDown){
            this.flipX = false;
            if (this.x < config.width){
                this.x += game.config.width / 800;
                this.clickedX = this.x;
            }
        }

        if (keyUP.isDown){
            this.setFrame(1);
            if (this.y > 0){
                this.y -= game.config.height / 450;
                this.clickedY = this.y;
            }
        }
        else { //Remove this once we have multiple frames
            this.setFrame(0);
        }
        

        if (keyDOWN.isDown){
            this.setFrame(0);
            if (this.y < config.height){
                this.y += game.config.height / 450;
                this.clickedY = this.y;
            }
        }

        //move to clicked coordinates
        if(Math.abs(this.x - this.clickedX) < (2*(game.config.width/800))){
            //is in place
        }
        else if(this.x < this.clickedX){
            this.x += game.config.width / 800;
        }
        else if(this.x > this.clickedX){
            this.x -= game.config.width / 800;
        }

        if(Math.abs(this.y - this.clickedY) < (2*(game.config.height/450))){
            //is in place
        }
        if(this.y < this.clickedY){
            this.y += game.config.height / 450;
        }
        else if(this.y > this.clickedY){
            this.y -= game.config.height / 450;
        }

    }

    moveTo(clickedX, clickedY){
        this.clickedX = clickedX;
        this.clickedY = clickedY;
    }

}