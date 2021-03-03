class Pause extends Phaser.Scene {
    constructor(){
        super("pauseScene");
    }

    init(data){
        console.log("Previous Scene: " + data.previousScene);
        this.prevScene = data.previousScene;
    }

    create(){
        //Enable escape key
        this.keyESC = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        //Create a pause menu image
        this.pauseMenu = this.add.image(config.width/2, config.height/2, "TempPause").setOrigin(0.5).setScale(0.75);
        //Create a settings menu image
        let settings = this.add.image(config.width/ 2, config.height/2, 'Settings').setOrigin(0.5);
        //Making images interactable
        settings.setInteractive();
        //Setting interactive behaviors
        settings.on('pointerover', () => settings.setFrame(1));
        settings.on("pointerout", () => settings.setFrame(0));
        settings.on('pointerup', () => {
            this.scene.pause();
            this.scene.launch("settingsScene", {previousScene: "pauseScene"});
        });
    }

    update(){
        console.log("In Pause");
        //Pause Game
        if(Phaser.Input.Keyboard.JustDown(this.keyESC)){
            console.log("Unpausing Game");
            this.scene.resume(this.prevScene);
            this.scene.stop();
        }
    }
}