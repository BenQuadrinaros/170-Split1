class HowToPlay extends Phaser.Scene{
    constructor() {
        super({
            key:"HowToPlayScene"
        });

        this.textConfiguration = {
            fontFamily: font,
            fontSize: "20px",
            color: "#000000",
            align: "center",
            stroke: "#000000",
            strokeThickness: 1,
            padding: {
                top: 5,
                bottom: 5
            },
        };
    }

    init(data){
        this.previousScene = data.previousScene;
        this.previousSceneDone = data.previousSceneDone;
    }

    

    create(){
        console.log("Entered how to play");
        //console.log(priceHistory);
        //uiScene = this;
        this.music = new BGMManager(this);
        this.music.resumeBetweenScenes();
        this.bg = this.add.image(config.width/2,config.height/2,'notebookBG').setScale(.5,.5).setOrigin(.5,.5);
        this.h2p1 = this.add.image(config.width/2, config.height/2, "howToPlay1").setScale(0.5, 0.5).setOrigin(.5,.5);
        this.h2p2 = this.add.image(config.width/2, config.height/2, "howToPlay2").setScale(0.5, 0.5).setOrigin(.5,.5).setVisible(false);
        this.h2p3 = this.add.image(config.width/2, config.height/2, "howToPlay3").setScale(0.5, 0.5).setOrigin(.5,.5).setVisible(false);

        this.currentPage = 0;

        this.pages = [this.h2p1, this.h2p2, this.h2p3];

        this.createBackIcon();
        this.createPageTurningIcons();

        this.textConfiguration = {
            fontFamily: font,
            fontSize: "16px",
            color: "#000000",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        if(this.previousSceneDone !== "false"){
            this.priceTitle = this.add.text(game.config.width/2 + 120, (10 * (config.height / 12 - 9)) + 90, this.previousSceneDone, this.textConfiguration).setOrigin(.5, .5).setAngle(25);
        }
        this.textConfiguration.fontSize = "28px";
        this.continueText = this.add.text(config.width - 125, config.height - 50, "Continue", this.textConfiguration).setOrigin(0.5, 0.5).setDepth(5);
        this.continueBackground = this.add.rectangle(config.width - 125, config.height - 50, 150, 75, 0xffffff, 1).setOrigin(0.5, 0.5).setInteractive().setAlpha(0.5)
        .on("pointerover", () => {
            this.continueText.alpha = 1;
            this.continueBackground.alpha = 1;
        })
        .on("pointerout", () => {
            this.continueText.alpha = .5;
            this.continueBackground.alpha = .5;
        })
        .on("pointerdown", () => {
            this.endScene();
        });
        this.continueText.setAlpha(.5);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            this.endScene();
        }
    }

    createPageTurningIcons(){
        this.add.image(this.bg.x-140,this.bg.y-188,'arrowLeft')
            .setOrigin(.5,.5).setScale(.5,.5).setInteractive()
            .on('pointerdown', () => {
                console.log("clicked minus")
                if (this.currentPage <= 0){
                    return ;
                } else {
                    this.music.playSFX("notebook");
                    this.pages[this.currentPage].setVisible(false);
                    this.currentPage -=1;
                    this.pages[this.currentPage].setVisible(true);
                }
            });

        this.add.image(this.bg.x+140,this.bg.y-188,'arrowRight')
            .setOrigin(.5,.5).setScale(.5,.5).setInteractive()
            .on('pointerdown', () => {
                console.log("clicked plus")
                if (this.currentPage >= currentDay){
                    return ;
                } else {
                    this.music.playSFX("notebook");
                    this.pages[this.currentPage].setVisible(false);
                    this.currentPage +=1;
                    this.pages[this.currentPage].setVisible(true);
                }
            });;
    }


    createBackIcon(){
        this.priceHistory = this.add.image(80, 4*config.height / 5 + 50, 'noteBook', 0)
            .setDepth(100).setScale(.125,.125).setOrigin(.5, .5).setAlpha(.9).setInteractive()
            .on('pointerover', () => {
                this.priceHistory.alpha = 1;
            })
            .on('pointerout', () => {
                this.priceHistory.alpha = .9;
            })
            .on('pointerdown', () => {
                this.endScene();
            });
    }

    endScene(){
        this.music.playSFX("notebook");
        this.music.pauseBetweenScenes();
        console.log("resuming market...");
        console.log(this.previousScene);
        this.scene.stop();
        if(this.previousSceneDone === "false"){
            this.scene.resume(this.previousScene);
        }
        else{
            this.scene.stop(this.previousScene);
            this.scene.start("shopScene", {previousScene: "marketScene"});
        }
        
        
    }
    endDayEarly(){
        console.log(this.previousScene);
        hasSoldForDay = true;
        this.scene.stop(this.previousScene);
        this.scene.stop();
        this.scene.start("shopScene", {previousScene: "marketScene"});
    }
}