class HubPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, initX, initY, sceneWidth = game.config.width, sceneHeight = game.config.height) {
        super(scene, initX, initY, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.setPosition(initX, initY);
        this.setScale(0.85, 0.85);
        this.currScene = scene;
        this.maxWidth = sceneWidth;
        this.maxHeight = sceneHeight;
        this.xMoveRate = game.config.width / 400;
        this.yMoveRate = game.config.height / 225;
    }

    update(){
        if (keyLEFT.isDown){
            this.flipX = true;
            if (this.x > 0){
                this.x -= this.xMoveRate;
            }
        }

        if (keyRIGHT.isDown){
            this.flipX = false;
            if (this.x < this.maxWidth){
                this.x += this.xMoveRate;
            }
        }

        if (keyUP.isDown){
            //this.setFrame(0);
            this.anims.play("playerBackIdle", true);
            if (this.y > 0){
                this.y -= this.yMoveRate;
            }
        }
        else { //Remove this once we have multiple frames
            //this.setFrame(2);
            this.anims.play("playerFrontIdle", true);
        }
        

        if (keyDOWN.isDown){
            //this.setFrame(2);
            this.anims.play("playerFrontIdle", true);
            if (this.y < this.maxHeight){
                this.y += this.yMoveRate;
            }
        }

    }

    moveTo(clickedX, clickedY){
        var deltaX = Math.abs(this.x - clickedX);
        var deltaY = Math.abs(this.y - clickedY);
        var greaterDistance = Math.max(deltaX, deltaY);
        //make the tweens
        this.scene.tweens.killTweensOf(this); //kills other ongoing tweens so no accidental teleportation happens
        this.xAxisMovementTween = this.scene.tweens.add({
            targets: this,
            x: clickedX,
            y: clickedY,
            ease: 'Sine.easeOut',
            duration: greaterDistance*6,
            delay: 0,
            repeat: 0
        });
    }

}