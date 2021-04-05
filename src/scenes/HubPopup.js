class HubPopup extends Phaser.Scene {
    constructor(){
        super("hubPopupScene");
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
        this.initialHoney = data.initialHoney;
    }

    create(){
        //Enable escape key
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

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
        this.mainText = this.add.text(config.width/2, config.height/3, "This morning, you collected:", this.textConfig).setOrigin(.5, .5);
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
    }

    update(){
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(this.keyESC)){
            console.log("Resuming Hub Activities");
            this.scene.resume(this.prevScene);
            this.scene.stop();
        }
    }
}