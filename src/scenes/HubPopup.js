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
            this.pauseMenu = this.add.image(scrollX + config.width/2, scrollY + config.height/2, "pauseEmpty").setOrigin(0.5);
        }

        //Create settings frames
        this.settings = this.add.image(scrollX + config.width/2 - 160, scrollY + config.height/3- 75, "settingsPause")
                        .setOrigin(.5, .5).setAngle(8).setInteractive().setScale(0.55);
        this.settings.on('pointerover', () => this.settings.setFrame(1));
        this.settings.on("pointerout", () => this.settings.setFrame(0));
        this.settings.on('pointerup', () => {
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
        this.add.text(scrollX + 3*config.width/5 + 50, scrollY + config.height/5 , currentDay, this.textConfig).setOrigin(.5, .5).setAngle(-5);

        //Display ecology score below
        textSpacer += 58.5;
        let grades = ["F", "D", "C", "B", "A", "A+"];
        let grade = 0;
        for(let i = 0; i < 5; i++) {
            //Checklist of tasks needed to win
            textSpacer += 40.5;
            if(playerVariables.score[i]) {
                //Put in a filled star
                this.add.image(scrollX + config.width/2  - 54 + 3*i, scrollY + config.height/3 - 60 + textSpacer, "pauseCheckmark").setScale(.5).setAngle(-5);
                grade++;
            }
        }
        //Could replace this with a more stylized stamp image
        this.textConfig.fontSize = "20px";
        this.add.text(this.cameras.main.scrollX + config.width/2 + 77, this.cameras.main.scrollY + config.height/5 + 45, grades[grade], this.textConfig).setOrigin(.5, .5).setAngle(-5);
        

        //Money spent on watering
        if(deltaMoney > 0) {
            textSpacer += 20;
            this.add.text(scrollX + config.width/2 - 88, scrollY + config.height/3- 22, deltaMoney, this.textConfig).setOrigin(.5, .5).setAngle(8);
        }

        //Display a random unused tool tip along the bottom of the card
        let rand = Phaser.Math.Between(0, toolTips.length-1);
        this.add.text(scrollX + 2*config.width/3 + 10, scrollY + 4*config.height/5 - 23,(rand+1)+"/"+toolTips.length, this.textConfig).setOrigin(.5, .5).setAngle(-5);
        this.textConfig.fontSize = "12px";
        this.add.text(scrollX + config.width/2 + 95, scrollY + 4*config.height/5 + 15, "\n" + toolTips[rand], this.textConfig).setOrigin(.5, .5).setAngle(-5);
        //If from tutorial, extra text
        if(this.fromTutorial) {
            this.createFromTutorialText();
        }
    }

    update(){
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(this.keyESC)){
            console.log("Resuming Hub Activities");
            this.scene.resume(this.prevScene);
            this.scene.stop();
        }
        if(this.fromTutorial && Phaser.Input.Keyboard.JustDown(keySPACE)){
            if(this.currDialogSelection === 1){
                this.tutorialDialog.text =
`We were also able to collect an extra few jars to give
you a head start. We look forward to working with you
as you restore this garden. *B*ee you around!`;
                this.currDialogSelection = 2;
            }
            else if(this.currDialogSelection === 2){
                this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.spaceContinue.setVisible(false);
                this.currDialogSelection = 3;
            }
            else{
                console.log("Resuming Hub Activities");
                this.scene.resume(this.prevScene);
                this.scene.stop();
            }
        }
        else if(Phaser.Input.Keyboard.JustDown(keySPACE)){
            console.log("Resuming Hub Activities");
            this.scene.resume(this.prevScene);
            this.scene.stop();
        }
    }

    createFromTutorialText(){
        this.tutorialTextBackdrop = this.add.image(0, 0, 'tutorialDialogBox')
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
`You can collect your first jar of honey from the hive.
Otherwise, you should be good to go. You can sell jars
of honey at the farmer's market in town.`;
    }
}