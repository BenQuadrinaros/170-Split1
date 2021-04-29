class PriceHistory extends Phaser.Scene{
    constructor() {
        super({
            key:"priceHistory"
        });
    }

    create(){
        console.log(priceHistory);
        uiScene = this;
        this.bg = this.add.image(config.width/2,config.height/2,'notebookBG').setScale(.5,.5).setOrigin(.5,.5);
        this.imgMap = {
            yellow:"honeyPlain",
            blue:"honeyBlue",
            pink:"honeyPink",
            purple:"honeyPurple"

        }
        this.createPriceHistory();
        this.createBackIcon();
        //this.createTicks(1,1);

        this.textConfig = {
            fontFamily: font,
            fontSize: "20px",
            color: "#85bb65",
            align: "center",
            stroke: "#000000",
            strokeThickness: 0,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        this.music = new BGMManager(this);

        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
    }

    init(data){
        this.previousScene = data.previousScene;
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            this.endScene();
        }
    }

    createPriceHistory(){
        console.log("creating price history;")
        let amt = 8;
        if (priceHistory.length < 8){
            amt = priceHistory.length;
        }
        for (let i = 1; i <= amt; i++){
            let entry = priceHistory[i-1]
            console.log(this.imgMap[entry.type]);
            this.add.image((2*config.width/5)+200,(i*config.height/12)+ 45,entry.mood).setScale(.1,.1).setOrigin(.5,.5);
            this.add.text((2*config.width/5)+100,(i*config.height/12)+ 45,entry.price + " $/jar", this.textConfig).setOrigin(.5,.5);
            this.add.image((2*config.width/5),(i*config.height/12)+ 45,this.imgMap[entry.type]).setOrigin(.5,.5).setScale(.35,.35);
        }
    }



    createBackIcon(){
        this.priceHistory = this.add.image(110, 4*config.height / 5 + 15, 'noteBook', 0)
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
        this.music.playSFX("mapFlip");
        console.log("resuming market...")
        console.log(uiScene.previousScene);
        uiScene.scene.resume(uiScene.previousScene);
        uiScene.scene.stop();
    }
}