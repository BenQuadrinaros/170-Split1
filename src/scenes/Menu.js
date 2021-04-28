class Menu extends Phaser.Scene {
    constructor() {
        super("menuScene");

        this.currSelected = -1;
    }


    
    create() {

        let centerX = game.config.width/2;
        let centerY = game.config.height/2;
        let textSpacer = 44;

        //Setting controls
        keyUP = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.UP);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        this.keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);

        //Setting Background
        this.screen1 = this.add.image(centerX, centerY, 'titleScreen1').setScale(0.5).setDepth(-3);
        this.screen2 = this.add.image(centerX, centerY, 'titleScreen2').setScale(0.5).setDepth(-2).setAlpha(0);
        this.screen3 = this.add.image(centerX, centerY, 'titleScreen3').setScale(0.5).setDepth(-1).setAlpha(0);
        this.createRotatingScreens();
        //Creating interactable images
        this.play = this.add.image(centerX/2, centerY + textSpacer, 'Play').setOrigin(0.5);
        this.tutorial = this.add.image(centerX/2, centerY + textSpacer * 2, 'Tutorial').setOrigin(0.5);
        this.settings = this.add.image(centerX/2, centerY + textSpacer * 3, 'Settings').setOrigin(0.5);
        this.credits = this.add.image(centerX/2, centerY + textSpacer * 4, 'Credits').setOrigin(0.5);
        
        //Create selection change event
        this.events.on("selectionChange", this.selectionUpdated, this);

        //Making images interactable
        this.play.setInteractive();
        this.tutorial.setInteractive();
        this.settings.setInteractive();
        this.credits.setInteractive();
        //Setting interactive behaviors
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.setVolume(config.volume);
        });

        this.play.on('pointerover', () => {
            this.currSelected = 1;
            this.events.emit("selectionChange");
        });
        this.play.on("pointerout", () => {
            this.currSelected = -1;
            this.events.emit("selectionChange");
        });
        this.play.on('pointerup', () => {
            //this.music.stop();
            //this.scene.start('hubScene');
            this.moveToNewScene(1);
        });

        this.tutorial.on('pointerover', () => {
            this.currSelected = 2;
            this.events.emit("selectionChange");
        });
        this.tutorial.on("pointerout", () => {
            this.currSelected = -1;
            this.events.emit("selectionChange");
        });
        this.tutorial.on('pointerup', () => {
            //this.music.stop();
            //this.scene.start('settingsScene');
            this.moveToNewScene(2);
        });

        this.settings.on('pointerover', () => {
            this.currSelected = 3;
            this.events.emit("selectionChange");
        });
        this.settings.on("pointerout", () => {
            this.currSelected = -1;
            this.events.emit("selectionChange");
        });
        this.settings.on('pointerup', () => {
            //this.music.stop();
            //this.scene.start('settingsScene');
            this.moveToNewScene(3);
        });

        this.credits.on('pointerover', () => {
            this.currSelected = 4;
            this.events.emit("selectionChange");
        });
        this.credits.on("pointerout", () => {
            this.currSelected = -1;
            this.events.emit("selectionChange");
        });
        this.credits.on('pointerup', () => {
            //this.music.stop();
            //this.scene.start('settingsScene');
            this.moveToNewScene(4);
        });

        //background music for the menu
        this.music = new BGMManager(this);
        this.music.playSong("menuMusic", true);
        this.music.setVolume(config.volume);
    }

    update() {
        //Using T for test and debug scene
        if (Phaser.Input.Keyboard.JustDown(keyT)) {
            this.scene.start("shopScene")
        }

        if (Phaser.Input.Keyboard.JustDown(keyUP)) {
            if(this.currSelected === -1){
                this.currSelected = 1;
                this.events.emit("selectionChange");
            }
            else{
                this.currSelected -= 1;
                if(this.currSelected === 0){
                    this.currSelected = 4;
                }
                this.events.emit("selectionChange");
            }
        }

        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            if(this.currSelected === -1){
                this.currSelected = 1;
                this.events.emit("selectionChange");
            }
            else{
                this.currSelected += 1;
                if(this.currSelected === 5){
                    this.currSelected = 1;
                }
                this.events.emit("selectionChange");
            }
        }

        if(Phaser.Input.Keyboard.JustDown(this.keyENTER)){
            if(this.currSelected === -1){
                //No effect if nothing selected
            }
            else{
                this.moveToNewScene(this.currSelected);
            }
        }

        console.log('t1A: ' + this.screen1.alpha + ", t2A: " + this.screen2.alpha + ", t3A: " + this.screen3.alpha);
    }

    selectionUpdated(){
        //For each option, set the frame properly
        console.log("Selection Updated: " + this.currSelected);
        //Play
        if(this.currSelected === 1){
            this.play.setFrame(1);
        }
        else{
            this.play.setFrame(0);
        }

        //Tutorial
        if(this.currSelected === 2){
            this.tutorial.setFrame(1);
        }
        else{
            this.tutorial.setFrame(0);
        }

        //Settings
        if(this.currSelected === 3){
            this.settings.setFrame(1);
        }
        else{
            this.settings.setFrame(0);
        }

        //Credits
        if(this.currSelected === 4){
            this.credits.setFrame(1);
        }
        else{
            this.credits.setFrame(0);
        }
    }

    moveToNewScene(newScene){
        //Play is being pressed
        if(newScene === 1) {
            this.music.stop();
            this.scene.start('hubScene', {previousScene: "menuScene"});
        }
        //Tutorial is being pressed
        else if(newScene === 2) {
            this.music.stop();
            this.scene.stop();
            this.scene.launch("tutorialScene", {previousScene: "menuScene"});
        }
        //Settings is being pressed
        else if(newScene === 3) {
            this.scene.pause();
            this.scene.launch("settingsScene", {previousScene: "menuScene"});
        }
        //Credits is being pressed
        else if(newScene === 4) {
            this.scene.pause();
            this.scene.launch("creditsScene", {previousScene: "menuScene"});
        }
        //Other result
        else{
            console.log("Invalid Scene selected: " + newScene);
        }
    }

    createRotatingScreens(){
        //Create tweens for the first screen
        this.titleScreen1FadeIn = this.tweens.add({
            targets: this.screen1,
            alpha: 1,
            ease: 'Linear',
            duration: 3000,
            delay: 42000,
            loop: -1,
            loopDelay: 42000
        });
        this.titleScreen1FadeOut = this.tweens.add({
            targets: this.screen1,
            alpha: 0,
            ease: 'Linear',
            duration: 3000,
            delay: 12000,
            loop: -1,
            loopDelay: 42000
        });
        //Create tweens for the second screen
        this.titleScreen2FadeIn = this.tweens.add({
            targets: this.screen2,
            alpha: 1,
            ease: 'Linear',
            duration: 3000,
            delay: 12000,
            loop: -1,
            loopDelay: 42000
        });
        this.titleScreen2FadeOut = this.tweens.add({
            targets: this.screen2,
            alpha: 0,
            ease: 'Linear',
            duration: 3000,
            delay: 27000,
            loop: -1,
            loopDelay: 42000
        });
        //Create tweens for the first screen
        this.titleScreen3FadeIn = this.tweens.add({
            targets: this.screen3,
            alpha: 1,
            ease: 'Linear',
            duration: 3000,
            delay: 27000,
            loop: -1,
            loopDelay: 42000
        });
        this.titleScreen3FadeOut = this.tweens.add({
            targets: this.screen3,
            alpha: 0,
            ease: 'Linear',
            duration: 3000,
            delay: 42000,
            loop: -1,
            loopDelay: 42000
        });

        //Check title 1 alpha
        /*this.titleScreen1FadeIn.on('onComplete', function () {
            console.log('t1FI: ' + this.screen1.alpha);
          });
          this.titleScreen1FadeOut.on('onComplete', function () {
            console.log('t1FO: ' + this.screen1.alpha);
          });
          this.titleScreen2FadeIn.on('onComplete', function () {
            console.log('t2FI: ' + this.screen1.alpha);
          });
          this.titleScreen2FadeOut.on('onComplete', function () {
            console.log('t2FO: ' + this.screen1.alpha);
          });
          this.titleScreen3FadeIn.on('onComplete', function () {
            console.log('t3FI: ' + this.screen1.alpha);
          });
          this.titleScreen3FadeOut.on('onComplete', function () {
            console.log('t3FO: ' + this.screen1.alpha);
          });*/
    }
}
