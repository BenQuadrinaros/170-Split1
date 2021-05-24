class HubPlayer extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, initX, initY, sceneWidth = game.config.width, sceneHeight = game.config.height, 
            verticalLimit = [[config.width, 135]]) {
        super(scene, initX, initY, texture + playerVariables.currentOutfit, frame);
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
        this.movingDirection = "right";
        //Vertical limit: [(x, y)], x is rightmost bound at the height, y is the height
        this.verticalLimits = verticalLimit;
        this.currentOutfit = playerVariables.currentOutfit;
        console.log("Curr")

        //Add shadow under player
        this.shadow = scene.add.image(this.x, this.y + this.height/3, "bearShadow");
        this.shadow.setOrigin(.5, .5).setScale(.75, .75);
    }

    update(){
        if (keyUP.isDown || keyW.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            if (this.withinVerticalLimits()){
                if(this.slow) {
                    this.y -= this.yMoveRate/2;
                } else {
                    this.y -= this.yMoveRate;
                }
            }
            this.startedMoving = true;
            this.movingUp = true;
            this.movingDirection = "up";
        } else {
            this.movingUp = false;
        }

        if (keyLEFT.isDown || keyA.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            this.flipX = true;
            if (this.x > 0 && this.notCrossingVerticalSides(true)){
                if(this.slow) {
                    this.x -= this.xMoveRate/2;
                } else {
                    this.x -= this.xMoveRate;
                }
                this.movingDirection = "left";
            }
            this.startedMoving = true;
        }

        if (keyRIGHT.isDown || keyD.isDown) {
            this.scene.tweens.killTweensOf(this); //Kills any click movement if it is occurring
            this.flipX = false;
            if (this.x < this.maxWidth && this.notCrossingVerticalSides(false)){
                if(this.slow) {
                    this.x += this.xMoveRate/2;
                } else {
                    this.x += this.xMoveRate;
                }
                this.movingDirection = "right";
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
            this.movingDirection = "down";
        }

        this.chooseAnimation();

        //Update shadow
        this.shadow.x = this.x;
        this.shadow.y = this.y + this.height/2.5;
        this.shadow.depth = this.depth - 1;

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
            //Create the regular outfit anims
            this.scene.anims.create({
                key: 'playerBackIdle',
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + playerVariables.currentOutfit, {start: 4, end: 5}),
                frameRate: 2
            });
            this.scene.anims.create({
                key: 'playerFrontIdle',
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + playerVariables.currentOutfit, {start: 2, end: 3}),
                frameRate: 2
            });
            this.scene.anims.create({
                key: 'playerWalkBack',
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + playerVariables.currentOutfit, {start: 0, end: 1}),
                frameRate: 3
            });
            this.scene.anims.create({
                key: 'playerWalkFront',
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + playerVariables.currentOutfit, {start: 6, end: 7}),
                frameRate: 3
            });
        
        //Create anims for other outfits
        let outfits = ["Bee", "Flower", "Helicopter", "Legacy", "Sunhat", "Tophat"];
        for(let i = 0; i < outfits.length; ++i){
            this.scene.anims.create({
                key: 'playerBackIdle' + outfits[i],
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + outfits[i], {start: 2, end: 3}),
                frameRate: 2
            });
            this.scene.anims.create({
                key: 'playerFrontIdle' + outfits[i],
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + outfits[i], {start: 0, end: 1}),
                frameRate: 2
            });
            this.scene.anims.create({
                key: 'playerWalkBack' + outfits[i],
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + outfits[i], {start: 6, end: 7}),
                frameRate: 3
            });
            this.scene.anims.create({
                key: 'playerWalkFront' + outfits[i],
                repeat: -1,
                frames: this.scene.anims.generateFrameNumbers('player' + outfits[i], {start: 4, end: 5}),
                frameRate: 3
            });
        }
        
    }

    chooseAnimation(){
        if(this.startedMoving){
            if(this.movingUp){
                this.anims.play("playerWalkBack" + playerVariables.currentOutfit, true);
            }
            else{
                this.anims.play("playerWalkFront" + playerVariables.currentOutfit, true);
            }
            this.startedMoving = false;
        }
        else{
            if(this.movingUp){
                this.anims.play("playerBackIdle" + playerVariables.currentOutfit, true);
            }
            else{
                this.anims.play("playerFrontIdle" + playerVariables.currentOutfit, true);
            }
        }
    }

    withinVerticalLimits(){
        let returnVal = true;
        let foundRightBound = false;
        for(var elem of this.verticalLimits){
            //console.log("withinVerticalLimits: checking", elem);
            //Is this the correct segment
            if(this.x <= elem[0] && !foundRightBound){
                foundRightBound = true;
                //Is this at the vertical bound
                if(this.y <= elem[1]){
                    returnVal = false;
                }
            }
        }
        return returnVal;
    }

    //Checks that the player isn't crossing from one vertical bound to another
    notCrossingVerticalSides(checkLeft){
        let returnVal = true;
        let foundVerticalSegment = false;
        for(let i = 0; i < this.verticalLimits.length; ++i){
            if(this.x <= this.verticalLimits[i][0] && !foundVerticalSegment){
                foundVerticalSegment = true;

                //Check left side, don't worry if we are already at the left edge of the screen
                if(i > 0 && checkLeft){
                    let leftBound = this.verticalLimits[i-1];
                    //if you are within a move of it, stop if also above vertical limit
                    if((this.x <= (leftBound[0]+ 3*this.xMoveRate)) &&
                       (this.y <= leftBound[1])){
                           console.log("Colliding with left side");
                        returnVal = false;
                    }
                }
                //Check right side, don't worry if we are at the rightmost edge
                if(i < (this.verticalLimits.length -1) && !checkLeft){
                    console.log("checking right side");
                    let rightBound = this.verticalLimits[i];
                    //if you are within a move of it, stop if also above vertical limit
                    if((this.x >= (rightBound[0] - 3*this.xMoveRate)) &&
                       (this.y <= this.verticalLimits[i+1][1])){
                           console.log("Colliding with right side");
                        returnVal = false;
                    }
                    else{
                        console.log("x (" + this.x + ") does not collide with " + (rightBound[0] - 5*this.xMoveRate));
                    }
                }

            }
        }
        return returnVal;
    }

}