class PriceHistory extends Phaser.Scene{
    constructor() {
        super({
            key:"priceHistory"
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
        //console.log(priceHistory);
        //uiScene = this;
        this.music = new BGMManager(this);
        this.bg = this.add.image(config.width/2,config.height/2,'notebookBG').setScale(.5,.5).setOrigin(.5,.5);
        this.currentPage = currentDay;
        this.imgMap = {
            yellow:"honeyYellow",
            blue:"honeyBlue",
            pink:"honeyPink",
            purple:"honeyPurple"

        }
        this.entries = [];
        this.createPriceHistory(currentDay);
        this.createBackIcon();
        this.createPageTurningIcons();
        //this.createTicks(1,1);

        this.textConfiguration = {
            fontFamily: font,
            fontSize: "16px",
            color: "#000000",
            align: "center",
            stroke: "#000000",
            strokeThickness: .5,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        this.music = new BGMManager(this);

        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        if(this.previousSceneDone !== "false"){
            this.priceTitle = this.add.text(game.config.width/2 + 120, (10 * (config.height / 12 - 9)) + 90, this.previousSceneDone, this.textConfiguration).setOrigin(.5, .5).setAngle(25);
        }
        this.textConfiguration.fontSize = "28px";
        this.continueText = this.add.text(config.width - 125, config.height - 50, "Continue", this.textConfiguration).setOrigin(0.5, 0.5).setDepth(5);
        this.continueBackground = this.add.rectangle(config.width - 125, config.height - 50, 150, 75, 0xffffff, .5).setOrigin(0.5, 0.5).setInteractive()
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


        this.textConfiguration.fontSize = "20px";
        //this.endDayText = this.add.text( this.bg.x, this.bg.y+180, "End day \nearly", this.textConfiguration).setOrigin(0.5, 0.5).setDepth(5);
        //this.endDayBackground = this.add.rectangle(  this.bg.x, this.bg.y+180, 150, 75, 0xffffff, .5).setOrigin(0.5, 0.5).setInteractive();
        this.endDayText = this.add.text( this.bg.x, this.bg.y+190, "End day \nearly", this.textConfiguration).setOrigin(0.5, 0.5)
            .setDepth(5).setAlpha(.5).setInteractive()
            .on("pointerover", () => {
                this.endDayText.alpha = 1;
                //this.endDayBackground.alpha = 1;
            })
            .on("pointerout", () => {
                this.endDayText.alpha = .5;
                //this.endDayBackground.alpha = .5;
            })
            .on("pointerdown", () => {
                //console.log("ending early")
                hasSoldForDay = true;
                this.music.playSFX("mapTransition");
                this.endDayEarly();
            });

    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            this.endScene();
        }
    }

    createPageTurningIcons(){
        this.weekText = this.add.text(this.bg.x,this.bg.y-175,"Week : " + currentDay,this.textConfiguration).setOrigin(.5,.5);

        this.add.image(this.bg.x-60,this.bg.y-175,'arrowLeft')
            .setOrigin(.5,.5).setScale(.5,.5).setInteractive()
            .on('pointerdown', () => {
                console.log("clicked minus")
                if (this.currentPage <= 0){
                    return ;
                } else {
                    this.music.playSFX("notebook");
                    this.currentPage -=1;
                    this.clearPage();
                    this.createPriceHistory(this.currentPage);
                    this.weekText.text = "Week : " + this.currentPage;
                }
            });

        this.add.image(this.bg.x+60,this.bg.y-175,'arrowRight')
            .setOrigin(.5,.5).setScale(.5,.5).setInteractive()
            .on('pointerdown', () => {
                console.log("clicked plus")
                if (this.currentPage >= currentDay){
                    return ;
                } else {
                    this.music.playSFX("notebook");
                    this.currentPage +=1;
                    this.clearPage();
                    this.createPriceHistory(this.currentPage);
                    this.weekText.text = "Week : " + this.currentPage;
                }
            });;
    }
    createPriceHistory(week){
        // console.log("creating price history;");
        // console.log("Text Config: ", this.textConfiguration);
        let amt = 9;
        let pArr = pHistory[week];
        if (!pArr){
            amt = 0;
        } else {
            if (pArr.length < 10) {
                amt = pArr.length;
            }
        }
        for (let i = 1; i <= amt; i++){
            let entry = pArr[i-1]
            //console.log("HEAD FOR ENTRY IS " + entry.head);
            if (entry.mode === "money") {
                //console.log(this.imgMap[entry.type]);
                //create mood image
                this.entries.push(this.add.image((2 * config.width / 5) + 225, (i * (config.height / 12 - 9)) + 90, entry.mood,).setScale(.09, .09).setOrigin(.5, .5));
                //create Price text per honey
                this.entries.push(this.add.text((2 * config.width / 5) + 90, (i * (config.height / 12 - 9)) + 90, "$" + entry.price.toFixed(2) , this.textConfiguration)
                    .setOrigin(.5, .5));
                //create honey type image
                this.entries.push(this.add.image((2 * config.width / 5)+150, (i * (config.height / 12 - 9)) + 90, this.imgMap[entry.type]).setOrigin(.5, .5).setScale(.35, .35));
                //create text for amount sold
                this.entries.push(this.add.text((2 * config.width / 5) + 175, (i * (config.height / 12 - 9)) + 90, entry.amt + "x", this.textConfiguration)
                    .setOrigin(.5, .5));
                //create slash
                this.entries.push(this.add.text((2 * config.width / 5) + 130, (i * (config.height / 12 - 9)) + 90, "/", this.textConfiguration)
                    .setOrigin(.5, .5));
                //create npc head
                this.entries.push(this.add.image((2 * config.width / 5)+20, (i * (config.height / 12 - 9)) + 105, entry.head).setOrigin(.5, 1).setScale(.2, .2));
            } else if (entry.mode === "barter"){
                // console.log("** ** logging barter ** **");
                // console.log(entry);
                this.entries.push(this.add.image((2 * config.width / 5) + 100, (i * (config.height / 12 - 9)) + 90, entry.img)
                    .setScale(entry.scale, entry.scale).setOrigin(.5, .5));
                this.entries.push(this.add.image((2 * config.width / 5) + 225, (i * (config.height / 12 - 9)) + 90, 'pleased',).setScale(.09, .09).setOrigin(.5, .5));
                this.entries.push(this.add.text((2 * config.width / 5) + 175, (i * (config.height / 12 - 9)) + 90, entry.bought+"x", this.textConfiguration).setOrigin(.5, .5));
                this.entries.push(this.add.text((2 * config.width / 5) + 70, (i * (config.height / 12 - 9)) + 90, entry.amt+"x", this.textConfiguration).setOrigin(.5, .5));
                this.entries.push(this.add.text((2 * config.width / 5) + 130, (i * (config.height / 12 - 9)) + 90, "/", this.textConfiguration)
                    .setOrigin(.5, .5));
                this.entries.push(this.add.image((2 * config.width / 5)+150, (i * (config.height / 12 - 9)) + 90, this.imgMap[entry.type]).setOrigin(.5, .5).setScale(.35, .35));
                this.entries.push(this.add.image((2 * config.width / 5)+20, (i * (config.height / 12 - 9)) + 105, entry.head).setOrigin(.5, 1).setScale(.2, .2));

            }
            // .log("entries")
            // console.log(this.entries);
        }
    }
    clearPage(){

        for (let i = 0; i < this.entries.length; i ++){
            this.entries[i].destroy();
        }
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