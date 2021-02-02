class HubPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, initX, initY, sceneWidth = game.config.width, sceneHeight = game.config.height) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setPosition(initX, initY);
        this.setScale(2.0, 2.0);
        this.currScene = scene;
        this.maxWidth = sceneWidth;
        this.maxHeight = sceneHeight;
        //For moving to a clicked location
        this.clickedX = this.x;
        this.xMoveRate = 0;
        this.clickedY = this.y;
        this.yMoveRate = 0;
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
            if (this.x < this.maxWidth){
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
            if (this.y < this.maxHeight){
                this.y += game.config.height / 450;
                this.clickedY = this.y;
            }
        }

        //move to clicked coordinates
        if(Math.abs(this.x - this.clickedX) < (2*(this.xMoveRate))){
            //is in place
        }
        else if(this.x < this.clickedX){
            this.x += this.xMoveRate;
        }
        else if(this.x > this.clickedX){
            this.x -= this.xMoveRate;
        }

        if(Math.abs(this.y - this.clickedY) < (2*(this.yMoveRate))){
            //is in place
        }
        if(this.y < this.clickedY){
            this.y += this.yMoveRate;
        }
        else if(this.y > this.clickedY){
            this.y -= this.yMoveRate;
        }

    }

    moveTo(clickedX, clickedY){
        console.log(Math.abs(this.x - clickedX) + "/" + Math.abs(this.y - clickedY));
        var XoverYRatio = Math.abs(this.x - clickedX)/Math.abs(this.y - clickedY);
        this.clickedX = clickedX;
        this.xMoveRate = XoverYRatio*game.config.width/800;
        this.clickedY = clickedY;
        this.yMoveRate = game.config.height/450;
        console.log("Ratio: " + XoverYRatio);
        console.log("clickedX: " + this.clickedX);
        console.log("xMoveRate: " + this.xMoveRate);
        console.log("clickedY: " + this.clickedY);
        console.log("yMoveRate: " + this.yMoveRate);
    }

}