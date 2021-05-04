class HubPopup extends Phaser.Scene {
    constructor(){
        super("hubPopupScene");
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
        this.initialHoney = data.initialHoney;
        this.fromTutorial = data.fromTutorial;
        this.money = data.money;
        console.log("From Tutorial: " + this.fromTutorial);
    }

    create(){
        //Enable escape key
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keySPACE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

        //Create a pause menu image
        this.pauseMenu = this.add.image(config.width/2, config.height/2, "TempPause").setOrigin(0.5).setScale(0.75);

        //Create the text with the info
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "14px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        var textSpacer = -15;

        //Each color of Honey delta
        /*this.add.text(config.width/2, config.height/3, "This week, you collected:", 
            this.textConfig).setOrigin(.5, .5);
        var deltaYellow = playerVariables.inventory.honey["yellow"] - this.initialHoney["yellow"];
        if(deltaYellow > 0) {
            textSpacer += 20;
            this.add.text(config.width/2, config.height/3 + textSpacer, "Regular Honey: " 
                + deltaYellow + " jars", this.textConfig).setOrigin(.5, .5);
        }
        var deltaBlue = playerVariables.inventory.honey["blue"] - this.initialHoney["blue"];
        if(deltaBlue > 0) {
            textSpacer += 20;
            this.add.text(config.width/2, config.height/3 + textSpacer, "Blue Honey: " 
                + deltaBlue + " jars", this.textConfig).setOrigin(.5, .5);
        }
        var deltaPurple = playerVariables.inventory.honey["purple"] - this.initialHoney["purple"];
        if(deltaPurple > 0) {
            textSpacer += 20;
            this.add.text(config.width/2, config.height/3 + textSpacer, "Purple Honey: " 
                + deltaPurple + " jars", this.textConfig).setOrigin(.5, .5);
        }
        var deltaPink = playerVariables.inventory.honey["pink"] - this.initialHoney["pink"];
        if(deltaPink > 0) {
            textSpacer += 20;
            this.add.text(config.width/2, config.height/3 + textSpacer, "Pink Honey: " 
                + deltaPink + " jars", this.textConfig).setOrigin(.5, .5);
        }
        textSpacer += 20;*/
        this.add.text(config.width/2, config.height/3 + textSpacer, "Results from week " + currentDay + ":\n" + 
            "Visit your hives to collect honey!", this.textConfig).setOrigin(.5, .5);
        
        //Money spent on watering
        var deltaMoney = this.money - playerVariables.money;
        if(deltaMoney > 0) {
            textSpacer += 20;
            this.add.text(config.width/2, config.height/3 + textSpacer, "You spent $" 
                + deltaMoney + " watering with Sprinklers.", this.textConfig).setOrigin(.5, .5);
        }

        //Display ecology score below
        textSpacer += 30;
        this.add.text(config.width/2, config.height/3 + textSpacer, "Happy Honey Association Score:", 
            this.textConfig).setOrigin(.5, .5);
        let grades = ["F", "D", "C", "B", "A", "A+"];
        let grade = 0;
        let gradeHeight = config.height/3 + textSpacer;
        for(let i = 0; i < 5; i++) {
            //Checklist of tasks needed to win
            textSpacer += 35;
            if(playerVariables.score[i]) {
                //Put in a filled star
                this.add.image(config.width/3 + 35, config.height/3 + textSpacer, "filledStar");
                grade++;
            } else {
                //Put in an empty star
                this.add.image(config.width/3 + 35, config.height/3 + textSpacer, "emptyStar");
            }
            if(i == 0) {
                this.add.text(config.width/3 + 65, config.height/3 + textSpacer, "Have at least 15 Flowers.", 
                    this.textConfig).setOrigin(0, .5);
            } else if (i == 1) {
                this.add.text(config.width/3 + 65, config.height/3 + textSpacer, "Have at least 3 types of Flowers.", 
                    this.textConfig).setOrigin(0, .5);
            } else if (i == 2) {
                this.add.text(config.width/3 + 65, config.height/3 + textSpacer, "Have at least 3 Beehives.", 
                    this.textConfig).setOrigin(0, .5);
            } else if (i == 3) {
                this.add.text(config.width/3 + 65, config.height/3 + textSpacer, "Clear all Brambles.", 
                    this.textConfig).setOrigin(0, .5);
            } else {
                this.add.text(config.width/3 + 65, config.height/3 + textSpacer, "Have less than 3 Weeds.", 
                    this.textConfig).setOrigin(0, .5);
            }
        }
        //Could replace this with a more stylized stamp image
        this.textConfig.fontSize = "22px";
        this.add.text(config.width/2 + 125, gradeHeight, grades[grade], this.textConfig).setOrigin(.5, .5);
        this.textConfig.fontSize = "14px";

        //Display a random unused tool tip along the bottom of the card
        let rand = Phaser.Math.Between(0, toolTips.length-1);
        this.add.text(config.width/2, 4*config.height/5 - 20, "Gardening Tips #"+(rand+1)+"/"+toolTips.length+":\n"
            +toolTips[rand], this.textConfig).setOrigin(.5, .5);
        
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
                this.talkingBee.alpha = 0;
            }
        }
    }

    createFromTutorialText(){
        this.tutorialTextBackdrop = this.add.rectangle(0, this.cameras.main.scrollY + 3.5*config.height/5, config.width, config.height/2, 0x000000).setOrigin(0, 0);
        this.tutorialTextBackdrop.depth = 150;
        this.tutorialConfig = {
            fontFamily: font,
            fontSize: "32px",
            color: "#ffffff",
            align: "left",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tutorialDialog = this.add.text(17, this.cameras.main.scrollY + 3.25*config.height/5 + 30, "", this.tutorialConfig);
        this.tutorialDialog.setOrigin(0, 0);
        this.tutorialDialog.depth = 200;
        this.talkingBee = this.add.image(config.width, 3*config.height/5, 'largeBee').setOrigin(0.5);
        this.talkingBee.x = this.cameras.main.scrollX + config.width/3;
        this.talkingBee.y = this.cameras.main.scrollY + config.height/3;
        this.talkingBee.depth = 120;
        this.currDialogSelection = 1;
        this.spaceContinue = this.add.text(0, 0, "SPACE to continue", this.textConfig);
        this.spaceContinue.depth = 205
        this.spaceContinue.x = this.cameras.main.scrollX + 4*config.width/5 - 15;
        this.spaceContinue.y = this.cameras.main.scrollY + 4*config.height/5 + 65;
        


        this.tutorialDialog.text =
`You can collect your first jar of honey from the hive.
Otherwise, you should be good to go. You can sell jars
of honey at the farmer's market in town.`;
    }
}