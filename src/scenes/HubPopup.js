class HubPopup extends Phaser.Scene {
    constructor(){
        super("hubPopupScene");
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
        this.fromTutorial = data.fromTutorial;
        console.log("From Tutorial: " + this.fromTutorial);
    }

    create(){
        this.music = new BGMManager(this);
        this.music.resumeBetweenScenes();

        this.pointerCurrentlyOver = "";


        let scrollX = this.cameras.main.scrollX;
        let scrollY = this.cameras.main.scrollY;
        //Enable escape key
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Create a pause menu image
        var deltaMoney = dailySprinklerCost;
        if(deltaMoney > 0) {
            this.pauseMenu = this.add.image(scrollX + config.width/2, scrollY + config.height/2, "pauseBilled").setOrigin(0.5);
        }
        else{
            this.pauseMenu = this.add.image(scrollX + config.width/2, scrollY + config.height/2, 'pauseEmpty').setOrigin(0.5);
        }

        //Create settings frames
        this.settings = this.add.image(scrollX + config.width/2 - 210, scrollY + config.height/3- 75, "settingsPause")
                        .setOrigin(.5, .5).setAngle(8).setInteractive().setScale(0.55);
        this.settings.on('pointerover', () => {this.settings.setFrame(1); this.pointerCurrentlyOver = "Settings"});
        this.settings.on("pointerout", () => {this.settings.setFrame(0); this.pointerCurrentlyOver = ""});
        this.settings.on('pointerup', () => {
            this.music.pauseBetweenScenes();
            this.scene.pause();
            this.scene.launch("settingsScene", {previousScene: "hubPopupScene"});
        });

        //Create the text with the info
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "30px",
            color: "#000000",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0.5,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        var textSpacer = -15;

        //Current Week
        this.add.text(scrollX + 3*config.width/5 + 10, scrollY + config.height/5 , currentDay, this.textConfig)
            .setOrigin(.5, .5).setAngle(-5);

        this.createPriceHistoryTab();
        this.createHowToPlayTab();
        //Display ecology score below
        textSpacer += 58.5;
        let grades = ["F", "D", "C", "B", "A", "A+"];
        let grade = 0;

        //Create an emitter system
        this.beeParticle = this.add.particles('bearBee');
        this.beeEmitter = this.beeParticle.createEmitter();
        this.beeEmitter.setLifespan(1500).setGravityY(300).setScale(.5).setSpeed({min: 125, max: 350})
            .setAngle({min: 0, max: 360});
        this.beeEmitter.on = false;
        for(let i = 0; i < 5; i++) {
            //Checklist of tasks needed to win
            if(playerVariables.score[i]) {
                grade++;
                // Move down the list slapping on checks and bursting bees
                this.time.delayedCall(250 * (i+1), () => {
                    let a = this.add.image(scrollX + config.width/2  - 105 + 3*i, scrollY + config.height/3 - 60
                        + textSpacer + (i+1) * 40.5, "pauseCheckmark").setScale(.5).setAngle(-5);
                    // Slap down the check
                    this.tweens.add({
                        targets: a,
                        alpha: {from: .7, to: 1},
                        scale: {from: .8, to :.5},
                        ease: 'Sine.easeInOut',
                        duration: 500,
                        repeat: 0,
                        yoyo: false,
                        hold: 0
                    });
                    // Spew some bees
                    this.beeEmitter.setPosition(a.x, a.y);
                    this.beeEmitter.on = true;
                    console.log("bees on",i);
                    this.time.delayedCall(225, () => { this.beeEmitter.on = false;console.log("bees off",i); });

                });
            }
        }
        //Could replace this with a more stylized stamp image
        this.textConfig.fontSize = "20px";
        this.add.text(this.cameras.main.scrollX + config.width/2 + 30, this.cameras.main.scrollY + config.height/5 + 45, grades[grade], this.textConfig).setOrigin(.5, .5).setAngle(-5);
        
        this.tutorialTextBackdrop = null;

        //Money spent on watering
        if(deltaMoney > 0) {
            //textSpacer += 20;
            this.textConfig.fontSize = "40px";
            this.add.text(scrollX + config.width/2 - 208, scrollY + 2*config.height/3 + 32, deltaMoney, this.textConfig).setOrigin(.5, .5).setAngle(-2);
            this.textConfig.fontSize = "30px";
        }

        //Display a random unused tool tip along the bottom of the card
        let rand = Phaser.Math.Between(0, toolTips.length-1);
        this.add.text(scrollX + 2*config.width/3-30, scrollY + 4*config.height/5 - 23,(rand+1)+"/"+toolTips.length, this.textConfig).setOrigin(.5, .5).setAngle(-5);
        this.textConfig.fontSize = "12px";
        this.add.text(scrollX + config.width/2 + 35, scrollY + 4*config.height/5 + 15, "\n" + toolTips[rand], this.textConfig).setOrigin(.5, .5).setAngle(-5);
        //If from tutorial, extra text
        if(this.fromTutorial) {
            this.createFromTutorialText();
        } else if (!(playerVariables.gotCamera)) {
            let points = 0;
            for(let score of playerVariables.score) { if(score) { points++; } }
            if(points >= 3) {
                this.getCameraDialogue();
            }
        }

        this.createEvents();
    }

    update(){
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(this.keyESC)){
            console.log("Resuming Hub Activities");
            this.music.pauseBetweenScenes();
            this.scene.resume(this.prevScene);
            this.scene.stop();
        }
        if(this.fromTutorial && Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.currDialogSelection === 1){
                this.tutorialBakedText.setTexture("day1Dialog2");
                /*this.tutorialDialog.text =
`We were able to collect a few extra jars to give you a head
start. We’re looking forward to working with you!
Bee you around!`;*/
                this.currDialogSelection = 2;
            }
            else if(this.currDialogSelection === 2){
                this.tutorialBakedText.setVisible(false);
                /*this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.spaceContinue.setVisible(false);*/
                this.currDialogSelection = 3;
            }
            else{
                console.log("Resuming Hub Activities");
                this.music.pauseBetweenScenes();
                this.scene.resume(this.prevScene);
                this.scene.stop();
            }
        }
        else if(playerVariables.gotCamera && Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.currDialogSelection === 1){
                this.tutorialBakedText.setVisible(false);
                /*this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.spaceContinue.setVisible(false);*/
                this.currDialogSelection = 2;
            }
            else{
                console.log("Resuming Hub Activities");
                this.music.pauseBetweenScenes();
                this.scene.resume(this.prevScene);
                this.scene.stop();
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            console.log("Resuming Hub Activities");
            this.music.pauseBetweenScenes();
            this.scene.resume(this.prevScene);
            this.scene.stop();
        }
    }

    createEvents(){
        //When leaving the settings page, just leave
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            if(!this.fromTutorial || this.currDialogSelection === 3){
                // console.log("Resuming Hub Activities");
                // this.scene.resume(this.prevScene);
                // this.scene.stop();
                this.pauseMenu.setVisible(true);
                this.priceHistoryTabText.setVisible(true);
                this.howToPlayTabText.setVisible(true);
                this.settings.setVisible(true);
                this.music.resumeBetweenScenes();
            }
        });

        this.input.on('pointerdown', function (pointer) {
                    if((!this.tutorialBakedText || !this.tutorialBakedText.visible)
                      && this.pointerCurrentlyOver === ""){
                        console.log("Resuming Hub Activities");
                        this.music.pauseBetweenScenes();
                        this.scene.resume(this.prevScene);
                        this.scene.stop();
                    }
                    else{
                        console.log("Tutorial Text Backdrop exists or over something");
                    }
                }, this);
    }
    createPriceHistoryTab(){
        this.priceHistoryTabText = this.add.image(scrollX + config.width/2 + 268, scrollY + config.height/5 - 2, "popupPriceHistory")
            .setOrigin(.5, .5).setAngle(2).setScale(0.5).setInteractive()
            .on("pointerover", () => {
              this.priceHistoryTabText.setFrame(1);
              this.pointerCurrentlyOver = "Price History";
              console.log("over price history tab");
            })
            .on("pointerout", () => {
                this.priceHistoryTabText.setFrame(0);
                this.pointerCurrentlyOver = "";
            })
            .on("pointerdown", () => {
                this.music.pauseBetweenScenes();
                this.music.playSFX("notebook");
                this.pauseMenu.setVisible(false);
                this.priceHistoryTabText.setVisible(false);
                this.howToPlayTabText.setVisible(false);
                this.settings.setVisible(false);
                this.scene.pause();
                this.scene.launch('priceHistory', {previousScene: "hubPopupScene", previousSceneDone: "false"});
            });


    }

    createHowToPlayTab(){
        this.howToPlayTabText = this.add.image(scrollX + config.width/2 + 265, scrollY + config.height/5 + 69, "popupHowToPlay")
            .setOrigin(.5, .5).setAngle(2).setScale(0.5).setInteractive()
            .on("pointerover", () => {
              this.howToPlayTabText.setFrame(1);
              this.pointerCurrentlyOver = "Price History";
              console.log("over price history tab");
            })
            .on("pointerout", () => {
                this.howToPlayTabText.setFrame(0);
                this.pointerCurrentlyOver = "";
            })
            .on("pointerdown", () => {
                this.music.pauseBetweenScenes();
                this.music.playSFX("notebook");
                this.pauseMenu.setVisible(false);
                this.howToPlayTabText.setVisible(false);
                this.priceHistoryTabText.setVisible(false);
                this.settings.setVisible(false);
                console.log("About to enter how to play scene");
                this.scene.pause();
                this.scene.launch('HowToPlayScene', {previousScene: "hubPopupScene", previousSceneDone: "false"});
            });


    }

    createFromTutorialText(){
        this.tutorialBakedText = this.add.image(0, 0, "day1Dialog1").setOrigin(0, 0).setScale(0.5).setDepth(150);
        /*this.tutorialTextBackdrop = this.add.image(0, 0, 'tutorialDialogBox')
                                            .setOrigin(0, 0).setScale(0.5);
        this.tutorialTextBackdrop.depth = 150;
        this.tutorialConfig = {
            fontFamily: font,
            fontSize: "27.5px",
            color: "#000000",
            align: "left",
            stroke: "#000000",
            strokeThickness: 1,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tutorialDialog = this.add.text(0,0, "", this.tutorialConfig);
        this.tutorialDialog.setOrigin(0, 0);
        this.tutorialDialog.depth = 200;
        this.tutorialDialog.x = this.cameras.main.scrollX + 185;
        this.tutorialDialog.y = this.cameras.main.scrollY + 3.25*config.height/5 - 25;
        this.currDialogSelection = 1;
        this.tutorialConfig.fontSize = "16px";
        this.spaceContinue = this.add.text(0, 0, "SPACE to continue", this.tutorialConfig);
        this.spaceContinue.depth = 205;
        this.spaceContinue.x = this.cameras.main.scrollX + 4*config.width/5 - 15;
        this.spaceContinue.y = this.cameras.main.scrollY + 4*config.height/5 + 35;

        this.tutorialDialog.text =
`Your first jar of honey is ready to collect! Don’t worry
if the number of jars changes a little from week to week —
we save any excess honey from the previous week, and
sometimes that means there will be enough for an extra jar!`;*/

        this.currDialogSelection = 1;

        this.input.on('pointerdown', function (pointer) {
            if(this.currDialogSelection === 1){
                this.tutorialBakedText.setTexture("day1Dialog2");
                /*this.tutorialDialog.text =
`We were able to collect a few extra jars to give you a head
start. We’re looking forward to working with you!
Bee you around!`;*/
                this.currDialogSelection = 2;
            }
            else if(this.currDialogSelection === 2){
                this.tutorialBakedText.setVisible(false);
                /*this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.spaceContinue.setVisible(false);*/
                this.currDialogSelection = 3;
            }
            else{
                console.log("Resuming Hub Activities");
                this.music.pauseBetweenScenes();
                this.scene.resume(this.prevScene);
                this.scene.stop();
            }
        }, this);
    }

    getCameraDialogue() {
        /*this.tutorialTextBackdrop = this.add.image(0, 0, 'tutorialDialogBox')
                .setOrigin(0, 0).setScale(0.5);
        this.tutorialTextBackdrop.depth = 150;
        let tutorialConfig = {
            fontFamily: font,
            fontSize: "27.5px",
            color: "#000000",
            align: "left",
            stroke: "#000000",
            strokeThickness: 1,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tutorialDialog = this.add.text(0,0, "", tutorialConfig);
        this.tutorialDialog.setOrigin(0, 0);
        this.tutorialDialog.depth = 200;
        this.tutorialDialog.x = this.cameras.main.scrollX + 185;
        this.tutorialDialog.y = this.cameras.main.scrollY + 3.25*config.height/5 - 25;
        tutorialConfig.fontSize = "16px";
        this.spaceContinue = this.add.text(0, 0, "SPACE to continue", tutorialConfig);
        this.spaceContinue.depth = 205;
        this.spaceContinue.x = this.cameras.main.scrollX + 4*config.width/5 - 15;
        this.spaceContinue.y = this.cameras.main.scrollY + 4*config.height/5 + 35;

        this.tutorialDialog.text =
`We are very impressed with your progress so far. We
all chipped in to get you this camera. Feel free to
take some pics of the garden and share them!`;*/

        this.tutorialBakedText = this.add.image(0, 0, "cameraDialog").setOrigin(0, 0).setScale(0.5).setDepth(150);
        this.currDialogSelection = 1;
        
                this.input.on('pointerdown', function (pointer) {
                    if(this.tutorialBakedText.visible){
                        console.log("Resuming Hub Activities");
                        this.music.pauseBetweenScenes();
                        this.scene.resume(this.prevScene);
                        this.scene.stop();
                    }
                    else{
                        this.tutorialBakedText.setVisible(false);
                        /*this.tutorialTextBackdrop.alpha = 0;
                        this.tutorialDialog.setVisible(false);
                        this.spaceContinue.setVisible(false);*/
                    }

                }, this);
        playerVariables.gotCamera = true;
        playerVariables.inventory.items["Camera"] = 1;
        inventoryTabsUpdated["items"] = true;
        playerInventoryUpdated = true;
    }
}