class HubPopup extends Phaser.Scene {
    constructor(){
        super("hubPopupScene");
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
        this.initialHoney = data.initialHoney;
        this.fromTutorial = data.fromTutorial;
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
        var textSpacer = 35;
        this.mainText = this.add.text(config.width/2, config.height/3, "This week, you collected:", this.textConfig).setOrigin(.5, .5);
        var deltaYellow = playerVariables.inventory.honey["yellow"] - this.initialHoney["yellow"];
        if(deltaYellow > 0){
            this.mainText = this.add.text(config.width/2, config.height/3 + textSpacer, "Regular Honey: " + deltaYellow + " jars", this.textConfig).setOrigin(.5, .5);
            textSpacer += 35;
        }
        else {
            console.log("Delta yellow was " + playerVariables.inventory.honey["yellow"] + " - " + this.initialHoney["yellow"]);
        }
        var deltaBlue = playerVariables.inventory.honey["blue"] - this.initialHoney["blue"];
        if(deltaBlue > 0){
            this.mainText = this.add.text(config.width/2, config.height/3 + textSpacer, "Blue Honey: " + deltaBlue + " jars", this.textConfig).setOrigin(.5, .5);
            textSpacer += 35;
        }
        else {
            console.log("Delta blue was " + playerVariables.inventory.honey["blue"] + " - " + this.initialHoney["blue"]);
        }
        var deltaPurple = playerVariables.inventory.honey["purple"] - this.initialHoney["purple"];
        if(deltaPurple > 0){
            this.mainText = this.add.text(config.width/2, config.height/3 + textSpacer, "Purple Honey: " + deltaPurple + " jars", this.textConfig).setOrigin(.5, .5);
            textSpacer += 35;
        }
        else {
            console.log("Delta purple was " + playerVariables.inventory.honey["purple"] + " - " + this.initialHoney["purple"]);
        }
        var deltaPink = playerVariables.inventory.honey["pink"] - this.initialHoney["pink"];
        if(deltaPink > 0){
            this.mainText = this.add.text(config.width/2, config.height/3 + textSpacer, "Pink Honey: " + deltaPink + " jars", this.textConfig).setOrigin(.5, .5);
        }
        else {
            console.log("Delta pink was " + playerVariables.inventory.honey["pink"] + " - " + this.initialHoney["pink"]);
        }

        if(this.fromTutorial){
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
`We hope your plan to revitalize the area goes
well! See you around!`;
                this.currDialogSelection = 2;
            }
            else if(this.currDialogSelection === 2){
                this.tutorialTextBackdrop.alpha = 0;
                this.tutorialDialog.setVisible(false);
                this.talkingBee.alpha = 0;
            }
        }
    }

    createFromTutorialText(){
        this.tutorialTextBackdrop = this.add.rectangle(0, this.cameras.main.scrollY + 3.5*config.height/5, config.width, config.height/2, 0x000000).setOrigin(0, 0);
        this.tutorialTextBackdrop.depth = 150;
        this.tutorialConfig = {
            fontFamily: font,
            fontSize: "28px",
            color: "#ffffff",
            align: "left",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.tutorialDialog = this.add.text(20, this.cameras.main.scrollY + 3.25*config.height/5 + 30, "", this.tutorialConfig);
        this.tutorialDialog.setOrigin(0, 0);
        this.tutorialDialog.depth = 200;
        this.talkingBee = this.add.image(config.width, 3*config.height/5, 'bearBee').setOrigin(0.5).setScale(3, 3);
        this.talkingBee.x = this.cameras.main.scrollX + config.width/3;
        this.talkingBee.y = this.cameras.main.scrollY + config.height/3;
        this.talkingBee.depth = 120;
        this.currDialogSelection = 1;


        this.tutorialDialog.text =
`Now that you have your first jar of honey, you should be
good to go. You can sell jars of honey at the farmer's
market in town, and buy new stuff from Toad Leckman.`;
    }
}