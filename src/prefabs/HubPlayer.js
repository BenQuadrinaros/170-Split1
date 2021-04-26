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
        this.createAnimations();
        this.startedMoving = false;
        this.movingUp = false;
        this.slow = false;
    }

    update(){
        if (keyUP.isDown || keyW.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            if (this.y > 150){
                if(this.slow) {
                    this.y -= this.yMoveRate/2;
                } else {
                    this.y -= this.yMoveRate;
                }
            }
            this.startedMoving = true;
            this.movingUp = true;
        }
        else{
            this.movingUp = false;
        }

        if (keyLEFT.isDown || keyA.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            this.flipX = true;
            if (this.x > 0){
                if(this.slow) {
                    this.x -= this.xMoveRate/2;
                } else {
                    this.x -= this.xMoveRate;
                }
            }
            this.startedMoving = true;
        }

        if (keyRIGHT.isDown || keyD.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            this.flipX = false;
            if (this.x < this.maxWidth){
                if(this.slow) {
                    this.x += this.xMoveRate/2;
                } else {
                    this.x += this.xMoveRate;
                }
            }
            this.startedMoving = true;
        }
        

        if (keyDOWN.isDown || keyS.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            //this.setFrame(2);
            
            if (this.y < this.maxHeight){
                if(this.slow) {
                    this.y += this.yMoveRate/2;
                } else {
                    this.y += this.yMoveRate;
                }
            }
            this.startedMoving = true;
            this.movingUp = false;
        }

        this.chooseAnimation();

    }

    moveTo(clickedX, clickedY) {
        /*
        var deltaX = Math.abs(this.x - clickedX);
        var deltaY = Math.abs(this.y - clickedY);
        var greaterDistance = Math.max(deltaX, deltaY);
        this.startedMoving = true;
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
        });*/
    }

    createAnimations(){
        //Establish its animations
        this.scene.anims.create({
            key: 'playerBackIdle',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('player', {start: 4, end: 5}),
            frameRate: 2
        });
        this.scene.anims.create({
            key: 'playerFrontIdle',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('player', {start: 2, end: 3}),
            frameRate: 2
        });
        this.scene.anims.create({
            key: 'playerWalkBack',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('player', {start: 0, end: 1}),
            frameRate: 3
        });
        this.scene.anims.create({
            key: 'playerWalkFront',
            repeat: -1,
            frames: this.scene.anims.generateFrameNumbers('player', {start: 6, end: 7}),
            frameRate: 3
        });
    }

    chooseAnimation(){
        if(this.startedMoving){
            if(this.movingUp){
                this.anims.play("playerWalkBack", true);
            }
            else{
                this.anims.play("playerWalkFront", true);
            }
            this.startedMoving = false;
        }
        else{
            if(this.movingUp){
                this.anims.play("playerBackIdle", true);
            }
            else{
                this.anims.play("playerFrontIdle", true);
            }
        }
    }

}