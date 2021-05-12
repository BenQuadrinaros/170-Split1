class Market extends Phaser.Scene {
    constructor() {
        super("marketScene");
    }

    init(data) {
    }

    create() {
        previousScene = this;
        this.sold = false;
        this.cameras.main.setBackgroundColor(0x000000);
        this.stage = -1;

        this.imgMap = {
            yellow:"honeyYellow",
            blue:"honeyBlue",
            pink:"honeyPink",
            purple:"honeyPurple"

        }
        this.createControls(); //Sets the various controls
        this.createBackground(); //Creates backdrop
        this.createPopulatedTable(); //Create table and fill with jars of honey
        this.createPlayer(); //Creates player prefab
        this.createCustomersInLine();
        this.createPlayerAnims(); //Creates animations associated with player
        this.createText(); //Creates text objects
        this.createPriceChanging(); //Creates UI for changing prices
        this.createEvents(); //Creates misc events that occur during the scene
        this.createSellOptions(); //Create popup sell dialogue options
        this.createPriceHistoryIcon(); //Create icon for accessing price history.
        this.createBarterPool();

        this.standardPrices = {
            yellow:3,
            blue:4,
            purple:4.5,
            pink:5
        }

        //background music for the hub
        //CHNAGE SONG FOR MARKET
        this.music = new BGMManager(this);
        this.music.playSong("marketMusic", true);

        //Start the timer for the selling portion
        this.timer = this.time.addEvent({
            delay: 9000000,
            callback: () => {
                /*this.honeyText.alpha = 0;
                this.moneyText.alpha = 0;
                this.customerText.alpha = 0;
                if(playerVariables.inventory.honey["total"] === 0){
                    this.timeUpText.text = "ALL SOLD OUT\nPress Down/S to go\nback to town";
                }
                else{
                    this.timeUpText.text = "NO MORE CUSTOMERS\nPress Down/S to go\nback to town";
                }
                this.timeUpText.alpha = 1;
                this.timeUp = true;*/
                //Go to hub and start next day
                hasSoldForDay = true;
                this.music.stop();
                this.music.playSFX("mapTransition");
                if(playerVariables.inventory.honey["total"] === 0){
                    this.scene.launch('priceHistory', {previousScene: "marketScene", previousSceneDone:"SOLD OUT"});
                }
                else{
                    this.scene.launch('priceHistory', {previousScene: "marketScene", previousSceneDone:"NO MORE CUSTOMERS"});
                }
            },
            loop: false,
            callbackScope: this
        });
        this.state = "waiting";
    }



    update() {
        //Scroll clouds
        this.sky.tilePositionX += 0.08;

        this.updateText(); //Updates text as player takes actions
        this.updateCheckPause(); //Checks if the game needs to pause

        if (this.timeUp) {
            this.updateTimeUp();
            return;
        }
        if (this.state === "waiting") { //Patrons come and go

            this.updateBearShuffle();

            if (playerVariables.inventory.honey.total > 0 && this.customersInLine.length > 0) {
                this.state = "approaching";

                if(this.customersInLine.length > 1){
                    /*let previousXPos = 640;
                    for(let i = 0; i < this.customersInLine.length; ++i){
                        console.log("Customer ", i, " x is: ", this.customersInLine[i].x, ", difference from prevX is", (previousXPos - this.customersInLine[i].x));
                        previousXPos = this.customersInLine[i].x;
                    }*/
                    for(let i = 1; i < this.customersInLine.length; i++) {
                        this.customersInLine[i].approach(500*(i+1));
                        /*let tempRef = this.createCustomersInLine[i];
                        this.time.delayedCall(500*(i+1), () => {
                            /*console.log("Telling to approach 1:", this.createCustomersInLine[i]);
                            this.customersInLine[i].approach();*/
                          //  tempRef.approach();
                        //}, [tempRef]);*/
                        /*if(i == this.customersInLine.length - 1) {
                            this.time.delayedCall(500*(i+1) + 50, () => {
                                this.customersInLine.splice(0, 1);
                            });
                        }*/
                    }
                
                    this.npcRef = this.npc;
                    this.npc = this.customersInLine[0]; //Get next NPC
                    console.log("Telling to approach 2:", this.npc);
                    this.npc.approach();
                    this.customersInLine.splice(0, 1);
                }
                //When you get to the last customer, don't break
                else{
                    this.npc = this.customersInLine[0]; //Get next NPC
                    console.log("Telling to approach 3:", this.npc);
                    this.npc.approach();
                    this.customersInLine.splice(0, 1);
                }

                this.time.addEvent({
                    delay: 1500,
                    callback: () => {
                        this.state = "bargaining";
                        this.updatePrepareInteraction();
                    },
                    loop: false,
                    callbackScope: this
                });

            } else if (playerVariables.inventory.honey.total <= 0 || this.customersInLine.length <= 0) {
                this.timer.delay = 0;
            }
        } else if (this.state === "approaching") { //NPC approaches the stand
            //Constant bear wiggle
            this.updateBearShuffle();

        } else if (this.state === "bargaining") { //Ask for honey at price
            if (this.stage === -1) {
                this.stage = 0;
                console.log("stage is 0");

                this.initiateRequest();

            } else if (this.stage === 1) { //Npc will check price to see if it is acceptable
                console.log("stage is 1")
                this.exchange = this.iniatiatePriceCheck(this.npcAmount, this.npcPrice);
            } else if (this.stage === 2){ //Npc will react to player price and take action.
                console.log(`exchange is ${this.exchange}`);
                let percent = this.exchange[1];
                let mood = this.exchange[0];
                if (this.moodPopUp !== undefined){
                    this.moodPopUp.destroy();
                }
                this.createMoodPopup(mood);
                this.initiateNPCDecision(percent,mood);

            }
            //console.log("stage is " + this.stage)
        } else if (this.state === "leaving") {
            //Constant bear wiggle
            this.updateBearShuffle();

            this.npc.leave();
            //this.customersInLine.splice(0, 1);

        }

    }

    reduceStock(type, amount) {
        playerVariables.inventory.honey.total -= amount;
        if (type == "yellow") {
            playerVariables.inventory.honey["yellow"] -= amount;
            while (this.yellowStock.length > playerVariables.inventory.honey["yellow"]) {
                this.yellowStock.pop().destroy();
            }
        } else if (type == "blue") {
            playerVariables.inventory.honey["blue"] -= amount;
            while (this.blueStock.length > playerVariables.inventory.honey["blue"]) {
                this.blueStock.pop().destroy();
            }
        } else if (type == "purple") {
            playerVariables.inventory.honey["purple"] -= amount;
            while (this.purpleStock.length > playerVariables.inventory.honey["purple"]) {
                this.purpleStock.pop().destroy();
            }
        } else {
            playerVariables.inventory.honey["pink"] -= amount;
            while (this.pinkStock.length > playerVariables.inventory.honey["pink"]) {
                this.pinkStock.pop().destroy();
            }
        }
    }

    makeTransaction(type, amount, mood){
        console.log(`Money made from ${amount} ${type} honey is ${amount*priceMap[type]}`)
        priceHistory.unshift({
            type:type,
            price:priceMap[type],
            mood: mood,
            mode: "money"
        });
        let bearBucks = this.add.image(this.npc.x,this.moneyText.y,'bearbucks')
            .setScale(.5,.5).setDepth(100);
        this.tweens.add({
            targets: bearBucks,
            alpha: {from: 1, to: 0},
            x: '-=200',
            ease: 'Sine.easeInOut',
            duration: 1500,
            repeat: 0,
            yoyo: false,
            hold: 0,
            onComplete: function () {
                //console.log("done tweening mood");
                bearBucks.destroy();
            },
            onCompleteScope: this
        });
        this.reduceStock(type, amount);
        playerVariables.money += amount*priceMap[type];

    }

    //Check price against npc internal budget and return percent and mood accordingly
    iniatiatePriceCheck(amt, proposedPrice) {
        console.log(`${amt} at price of ${proposedPrice}`)
        //Prices moved to global
        let setPrice = amt * priceMap[this.typeToBuy]
        console.log("transaction price = " + setPrice);
        let propUnitPrice = proposedPrice / amt;
        let setUnitPrice = setPrice / amt;
        console.log(`prop: ${propUnitPrice} ; set ${setUnitPrice}`)
        let percent = this.calcPercent(propUnitPrice,setUnitPrice);
        console.log(`percent for mood is ${percent}`);
        let mood = undefined;
        if (percent <= .55){
            mood =  "ecstatic";
        } else if (.55 < percent && percent <= .6){
            mood = "happy";
        } else if (.6 < percent && percent <= .65){
            mood = "pleased";
        } else if (.65 < percent && percent <= .7){
            mood = "satisfied";
        } else if (.7 < percent && percent <= .75){
            mood = "neutral";
        } else if (.75 < percent && percent <= .8){
            mood = "sad"
        } else if (.8 < percent && percent <=.95){
            mood = "displeased"
        } else if (.95 < percent && percent <= 1){
            mood = "angry"
        } else if (percent > 1){
            mood = "noBuy"
        } else {
            mood = "idk man"
        }
        console.log(`mood is ${mood}`);
        this.stage = 2;
        return [mood, percent];
    }

    //Function to handle creation of npc request ui, honey type, amt, and event handlers.
    initiateRequest() {
        let type = this.typeToBuy;
        let amt = this.npcAmount;
        if (this.stage === 0) {
            console.log("stage is 0");
            console.log("initiating request.");
            console.log(`npc wants to buy ${amt} jars of ${type}`);
            //Create icons for npc asking to make purchase
            this.initiatePrice = this.add.image(this.npc.x+50, this.npc.y - 300, 'emptyBox')
                .setDepth(100).setOrigin(.5, .5).setScale(.075, .075);
            this.honeyIMG = this.add.image(this.initiatePrice.x+10,this.initiatePrice.y-5, this.imgMap[type])
                .setDepth(125).setOrigin(.5,.5).setScale(.5,.5);
            this.honeyAmtText = this.add.text(this.initiatePrice.x-20,this.initiatePrice.y-5,amt.toString(), this.textConfig)
                .setDepth(125).setOrigin(.5,.5);
            this.decline = this.add.image(this.initiatePrice.x - 40, this.initiatePrice.y + 60, 'sellNo',0)
                .setDepth(100).setOrigin(.5, .5).setScale(.35, .35).setAlpha(.9).setInteractive()
                .on('pointerover', () => {
                    this.decline.alpha = 1;
                })
                .on('pointerout', () => {
                    this.decline.alpha = .9;
                })
                .on('pointerdown', () => {
                    this.initiatePrice.destroy();
                    this.decline.destroy();
                    this.accept.destroy();
                    this.honeyAmtText.destroy();
                    this.honeyIMG.destroy();
                    this.resetStage();

                });


            this.accept = this.add.image(this.initiatePrice.x + 40, this.initiatePrice.y + 60, 'sellYes',0)
                .setDepth(100).setOrigin(.5, .5).setAlpha(.9).setScale(.35, .35).setInteractive()
                .on('pointerover', () => {
                    this.accept.alpha = 1;
                })
                .on('pointerout', () => {
                    this.accept.alpha = .9;
                })
                .on('pointerdown', () => {
                    //proceed to price checking
                    console.log("clicked on yes");
                    this.initiatePrice.destroy();
                    this.decline.destroy();
                    this.accept.destroy();
                    this.honeyAmtText.destroy();
                    this.honeyIMG.destroy();
                    this.stage = 1;
                });
        }

    }

    initiateNPCDecision(percent, mood){ //Npc will decide how to act based on the percent of set price/total budget
        if (percent > 1){ //above 1, "high" price, npc will either leave or haggle
            if (Math.random() <= .5){ //npc just leaves
                playerVariables.reputation -=1;
                this.resetStage();
            }
            else { //npc will ask to barter or lower price
                console.log("npc is asking to lower price");
                //this.stage = 5;
                //this.initiateHaggle();
                this.initiateBarter();
            }

        } else if (percent < .80){ //"Good" price falls below 80%, npc will buy and player's reputation will increase
            playerVariables.reputation+=1;
            this.makeTransaction(this.typeToBuy, this.npcAmount, mood);
            this.resetStage();
        }else if (.8 <= percent && percent < 1){ //between 80% and 100%, npc will accept or haggle (75/25) respectively
            if (Math.random() <= .75){
                //this.stage = 5;
                //this.initiateHaggle();
                this.initiateBarter(); //Swap bartering for haggling for now.
            } else {
                playerVariables.reputation -=1;
                this.makeTransaction(this.typeToBuy, this.npcAmount, mood);
                this.resetStage();
            }
        } else {
            this.resetStage();
        }
    }

    //Function to handle Haggling or lowering the price of honey
    initiateHaggle(){
        this.stage = 999; //lock stage until proceding.
        this.initiatePrice = this.add.image(this.npc.x - 100, this.npc.y - 200, 'emptyBoxTwo')
            .setDepth(100).setOrigin(.5, .5).setScale(.075, .075);
        this.decline = this.add.image(this.initiatePrice.x - 40, this.initiatePrice.y + 60, 'sellNo',0)
            .setDepth(100).setOrigin(.5, .5).setScale(.25, .25).setAlpha(.5).setInteractive()
            .on('pointerover', () => {
                this.decline.alpha = 1;
            })
            .on('pointerout', () => {
                this.decline.alpha = .5;
            })
            .on('pointerdown', () => {
                this.initiatePrice.destroy();
                this.decline.destroy();
                this.accept.destroy();
                this.stage = 1;
            });


        this.accept = this.add.image(this.initiatePrice.x + 40, this.initiatePrice.y + 60, 'sellYes',0)
            .setDepth(100).setOrigin(.5, .5).setAlpha(.5).setScale(.25, .25).setInteractive()
            .on('pointerover', () => {
                this.accept.alpha = 1;
            })
            .on('pointerout', () => {
                this.accept.alpha = .5;
            })
            .on('pointerdown', () => {
                //proceed to price checking
                console.log("clicked on to lower price");
                this.initiatePrice.destroy();
                this.decline.destroy();
                this.accept.destroy();
                this.stage = 1;
            });
    }

    initiateBarter(){
        this.stage = 999; //lock stage until proceding
        let barterValue = this.npcAmount * this.standardPrices[this.typeToBuy];
        let offer = this.generateBarterOffer(barterValue);
        let img = offer.img;
        let item = offer.item;
        let amt = Math.floor(offer.amt);
        let scale = offer.scale;
        let category = offer.category;
        console.log(`NPC barter value ${barterValue} and are offering ${amt} ${item} `);
        let barterBox = this.add.image(this.npc.x +50, this.npc.y - 300,'barterBlank')
            .setDepth(100).setOrigin(.5, .5).setScale(.3,.3);
        let offerImg = this.add.image(barterBox.x+15,barterBox.y,img)
            .setOrigin(.5,.5).setDepth(100).setScale(scale,scale);
        let offerText = this.add.text(offerImg.x+25,offerImg.y, amt.toString(), this.textConfig)
            .setDepth(100).setOrigin(.5,.5);
        let honeyImg = this.add.image(barterBox.x-30,barterBox.y-30,this.imgMap[this.typeToBuy])
            .setOrigin(.5,.5).setDepth(100).setScale(.35,.35);
        let honeyText = this.add.text(honeyImg.x+20,honeyImg.y,this.npcAmount.toString(),this.textConfig)
            .setDepth(100).setOrigin(.5,.5);
        let decline = this.add.image(barterBox.x - 40, barterBox.y + 60, 'sellNo',0)
            .setDepth(100).setOrigin(.5, .5).setScale(.25, .25).setAlpha(.75).setInteractive()
            .on('pointerover', () => {
                decline.alpha = 1;
            })
            .on('pointerout', () => {
                decline.alpha = .75;
            })
            .on('pointerdown', () => {
                barterBox.destroy();
                decline.destroy();
                accept.destroy();
                offerImg.destroy();
                offerText.destroy();
                honeyImg.destroy();
                honeyText.destroy();
                this.resetStage();
            });


        let accept = this.add.image(barterBox.x + 40, barterBox.y + 60, 'sellYes',0)
            .setDepth(100).setOrigin(.5, .5).setAlpha(.75).setScale(.25, .25).setInteractive()
            .on('pointerover', () => {
                accept.alpha = 1;
            })
            .on('pointerout', () => {
                accept.alpha = .75;
            })
            .on('pointerdown', () => {
                console.log("before changing player inv is " + playerVariables.inventory[category][item]);
                playerVariables.inventory[category][item] += amt;
                console.log("after changing player inv is " + playerVariables.inventory[category][item]);
                this.reduceStock(this.typeToBuy, this.npcAmount);
                let tempimg = this.add.image(this.npc.x-100, this.npc.y-100, img).setScale(scale, scale)
                    .setDepth(100);
                let txt = this.add.text(tempimg.x+10,tempimg.y,"+" + amt.toString(), this.textConfig)
                    .setDepth(100);
                this.logBarter(offer, this.typeToBuy, this.npcAmount);
                this.tweens.add({
                    targets: [tempimg, txt],
                    alpha: {from: 1, to: 0},
                    y: '-=200',
                    ease: 'Sine.easeInOut',
                    duration: 1500,
                    repeat: 0,
                    yoyo: false,
                    hold: 0,
                    onComplete: function () {
                        //console.log("done tweening mood");
                        tempimg.destroy();
                        txt.destroy();
                    },
                    onCompleteScope: this
                });
                barterBox.destroy();
                decline.destroy();
                accept.destroy();
                offerImg.destroy();
                offerText.destroy();
                honeyImg.destroy();
                honeyText.destroy();
                this.resetStage();
            });

    }
    logBarter(offer, hType, typeBought){
     priceHistory.unshift({
         mode: "barter",
         type: hType,
         item: offer.item,
         amt: Math.floor(offer.amt),
         scale: offer.scale,
         img: offer.img,
         bought: typeBought
     })
    }

    //reset market state to no customers, allowing one to approacj
    resetStage(){
        this.state = "leaving";
        this.npcRef = this.npc;
        this.time.addEvent({
            delay: 1500,
            callback: () => {
                this.npcRef.destroy();
                this.state = "waiting";
                this.stage = -1;
            },
            loop: false,
            callbackScope: this
        });
    }

    //calculate percent of budget set price is for npc
    calcPercent(propUnitPrice, setUnitPrice) {
        let npcRange = this.npc.type[this.typeToBuy];
        console.log(`npc range is ${npcRange}`);
        let percentOfBudget = Phaser.Math.Between(npcRange[0], npcRange[1]);
        console.log(`seventy five percent of budget is ${percentOfBudget}`);
        let budget = percentOfBudget/.75;
        console.log(`budget is ${budget}`);
        let percent = setUnitPrice/budget;
        console.log(`percent is ${percent}`)
        return percent;

    }

    createMoodPopup(mood) {
        //Previous x: this.npc.x+100
        //Previous y: this.npc.y-150
        //Alpha: from .6
        //this.npc.x, this.npc.y - 200
        //Scale from .3 to .25
        this.moodPopUp = this.add.image(this.npc.x, this.npc.y - 200, mood).setAlpha(0).setDepth(100).setScale(0.235);
        let basicTween = this.tweens.add({
            targets: this.moodPopUp,
            alpha: {from: .6, to: 1},
            scale: {from: 0.235, to: 0.18},
            ease: 'Sine.easeInOut',
            duration: 650,
            repeat: 1,
            yoyo: true,
            hold: 0,
            onComplete: function () {
                console.log("done tweening mood");
                this.moodPopUp.destroy();
            },
            onCompleteScope: this
        });
    }
    createCustomersInLine() {
        let amt = Math.max(2, playerVariables.reputation / 2 + 6);
        this.customersInLine = [];
        console.log(`Creating ${amt} customers in line...`);
        for (let i = 0; i < amt; i++) {
            this.customersInLine.push(this.generateNPC((2*config.width/3) - ((i) * config.width/5) - 15));
            this.customersInLine[i].setVisible(true);
            this.customersInLine[i].depth = 90 - i;
            console.log(`creating npc ${i}...`);
            console.log(this.customersInLine[i]);
        }
        console.log(`Done creating ${amt} npcs`);
    }

    createBarterPool(){
    this.barterPool = {
        Daisy:{
            val:2,
            img:"whiteIcon",
            scale:.125,
            category:"seeds"
        },
        Lavender:{
            val:2,
            img:"purpleIcon",
            scale:.125,
            category:"seeds"
        },
        Delphinium:{
            val:2,
            img:"blueIcon",
            scale:.125,
            category:"seeds"
        },
        Tulip:{
            val:3,
            img:"redIcon",
            scale:.125,
            category:"seeds"
        },
        Beehive:{
            val:8,
            img:"hive",
            scale:.075,
            category:"items"
        },
        Clipper:{
            val:3,
            img:"clipper",
            scale:.75,
            category:"items"
        },
        Sprinkler:{
            val:11,
            img:"sprinkler",
            scale:1,
            category:"items"
        }
    }
    }

    createControls() {
        //establish controls for gameplay
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
        keyS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        keyY = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Y);
        keyN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.N);
    }

    createPriceHistoryIcon() {
        this.priceHistory = this.add.image(110, 4*config.height / 5 + 15, 'noteBook', 0)
            .setDepth(100).setScale(.125, .125).setOrigin(.5, .5).setAlpha(.9).setInteractive()
            .on('pointerover', () => {
                this.priceHistory.alpha = 1;
            })
            .on('pointerout', () => {
                this.priceHistory.alpha = .9;
            })
            .on('pointerdown', () => {
                this.music.playSFX("notebook");
                this.scene.pause();
                this.priceHistory.alpha = 0.9;
                this.scene.launch('priceHistory', {previousScene: "marketScene", previousSceneDone: "false"});
            });
    }

    createBackground() {
        //background
        this.sky = this.add.tileSprite(config.width/2, config.height/2, 2*config.width, 2*config.height, 'marketSky').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-5);
        this.background = this.add.image(config.width / 2, config.height / 2, 'marketBackground').setOrigin(0.5, 0.5).setScale(0.5, 0.5).setDepth(-1);
    }

    createPopulatedTable() {
        //stand for visual space
        this.stand = this.add.image(game.config.width / 2, game.config.height / 2, 'booth');
        this.stand.setOrigin(.5, .5).setScale(.5, .5);
        this.stand.depth = 95;
        this.cloth = this.add.image(game.config.width / 2, game.config.height / 2, 'cloth');
        this.cloth.setOrigin(.5, .5).setScale(.5, .5);
        this.cloth.depth = 98;

        //populate in jars of honey
        this.yellowStock = [];
        for (let i = 0; i < Math.min(7, playerVariables.inventory.honey["yellow"]); i++) {
            let temp;
            if(i < 3) {
                temp = this.add.image(2*game.config.width/3 - (i * game.config.width / 45), 
                    72 * game.config.height / 100 - 15 * (i % 2),
                    "honeyYellow");
            } else if(i < 5) {
                temp = this.add.image(2*game.config.width/3 - 10 - ((i-3) * game.config.width / 22),
                    88 * game.config.height / 100, "honeyYellow");
            } else {
                temp = this.add.image(2*game.config.width/3 + 5 - ((i-5) * game.config.width / 22),
                    87.5 * game.config.height / 100, "honeyYellow");
            }
            temp.setOrigin(.5, .5).setScale(.675, .675);
            if(i == 1 || i > 4) { temp.depth = 96; }
            else { temp.depth = 97; }
            this.yellowStock.push(temp);
        }
        this.blueStock = [];
        for (let i = 0; i < Math.min(7, playerVariables.inventory.honey["blue"]); i++) {
            let temp;
            if(i < 3) {
                temp = this.add.image(2*game.config.width/3 + 85 - (i * game.config.width / 45), 
                    72 * game.config.height / 100 - 15 * (i % 2),
                    "honeyBlue");
            } else if(i < 5) {
                temp = this.add.image(2*game.config.width/3 + 75 - ((i-3) * game.config.width / 22),
                    88 * game.config.height / 100, "honeyBlue");
            } else {
                temp = this.add.image(2*game.config.width/3 + 90 - ((i-5) * game.config.width / 22),
                    87.5 * game.config.height / 100, "honeyBlue");
            }
            temp.setOrigin(.5, .5).setScale(.675, .675);
            if(i == 1 || i > 4) { temp.depth = 96; }
            else { temp.depth = 97; }
            this.blueStock.push(temp);
        }
        this.purpleStock = [];
        for (let i = 0; i < Math.min(20, playerVariables.inventory.honey["purple"]); i++) {
            let temp;
            if(i < 3) {
                temp = this.add.image(2*game.config.width/3 + 170 - (i * game.config.width / 45), 
                    72 * game.config.height / 100 - 15 * (i % 2),
                    "honeyPurple");
            } else if(i < 5) {
                temp = this.add.image(2*game.config.width/3 + 160 - ((i-3) * game.config.width / 22),
                    88 * game.config.height / 100, "honeyPurple");
            } else {
                temp = this.add.image(2*game.config.width/3 + 175 - ((i-5) * game.config.width / 22),
                    87.5 * game.config.height / 100, "honeyPurple");
            }
            temp.setOrigin(.5, .5).setScale(.675, .675);
            if(i == 1 || i > 4) { temp.depth = 96; }
            else { temp.depth = 97; }
            this.purpleStock.push(temp);
        }
        this.pinkStock = [];
        for (let i = 0; i < Math.min(20, playerVariables.inventory.honey["pink"]); i++) {
            let temp;
            if(i < 3) {
                temp = this.add.image(2*game.config.width/3 + 255 - (i * game.config.width / 45), 
                    72 * game.config.height / 100 - 15 * (i % 2),
                    "honeyPink");
            } else if(i < 5) {
                temp = this.add.image(2*game.config.width/3 + 245 - ((i-3) * game.config.width / 22),
                    88 * game.config.height / 100, "honeyPink");
            } else {
                temp = this.add.image(2*game.config.width/3 + 260 - ((i-5) * game.config.width / 22),
                    87.5 * game.config.height / 100, "honeyPink");
            }
            temp.setOrigin(.5, .5).setScale(.675, .675);
            if(i == 1 || i > 4) { temp.depth = 96; }
            else { temp.depth = 97; }
            this.pinkStock.push(temp);
        }
    }

    createPlayer() {
        //bear in costume selling honey
        this.bear = this.add.sprite(game.config.width / 2.5, 7 * game.config.height / 10, 'bearBackFrames', 0);
        this.bear.setOrigin(.5, .5).setScale(0.75, 0.75);
        this.bear.depth = 99;
    }

    createPlayerAnims() {
        //Create player idle animation
        this.anims.create({
            key: 'bearBackIdle',
            repeat: -1,
            frames: this.anims.generateFrameNumbers('bearBackFrames', {start: 0, end: 1}),
            frameRate: 3
        });
        this.bear.anims.play('bearBackIdle', true);
    }

    createText() {
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: font,
            fontSize: "18px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        //UI texts for resources
        this.honeyText = this.add.text(game.config.width / 8, game.config.height / 8 - 25, "Honey: ", this.textConfig).setOrigin(.5, .5);
        this.honeyText.depth = 100;
        this.moneyText = this.add.text(game.config.width / 8, game.config.height / 8, "Money: ", this.textConfig).setOrigin(.5, .5);
        this.moneyText.depth = 100;
        //this.timeText = this.add.text(game.config.width / 8, game.config.height / 8 + 25, "Time Remaining: ", this.textConfig).setOrigin(.5, .5);
        //this.timeText.depth = 100;
        this.timeUpText = this.add.text(game.config.width / 2, game.config.height / 2,
            "TIME'S UP\nPress Down/S to go\nback to town", this.textConfig).setOrigin(.5, .5);
        this.timeUpText.depth = 100;
        this.timeUpText.alpha = 0;
        this.timeUp = false;
        this.customerText = this.add.text(game.config.width / 8, game.config.height / 8 + 25, "Customers Remaining: ", this.textConfig).setOrigin(.5, .5);
        this.customerText.depth = 100;
        //UI text for transactions
        this.transactionText = this.add.text(6 * game.config.width / 8, game.config.height / 2, "Hi! I want honey.",
            this.textConfig).setOrigin(.5, .5);
        this.transactionText.depth = 100;
        this.transactionText.alpha = 0;
    }

    createPriceChanging() {
        //Create a spacer for different types
        let typesUsed = 0;
        //Price Setting Yellow
        if (playerVariables.inventory.honey["yellow"]) {
            typesUsed += 1;
            this.yellowPlus = this.add.image(config.width / 5, (0.75 + 0.5*typesUsed) * config.height / 5, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.yellowPlus.alpha = 1;
                    this.yellowPriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.yellowPlus.alpha = .75;
                    this.yellowPriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["yellow"] += .25;
                    this.yellowPriceText.text = "\tYellow\n" + "\t" + priceMap["yellow"].toFixed(2) + "$/Jar";
                    this.yellowPlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.yellowPlus.setFrame(0);
                });
            this.yellowMinus = this.add.image((config.width / 5) - 150, (0.75 + 0.5*typesUsed) * config.height / 5, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.yellowMinus.alpha = 1;
                    this.yellowPriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.yellowMinus.alpha = .75;
                    this.yellowPriceText.alpha = .75;

                })
                .on("pointerdown", () => {
                    if(priceMap["yellow"] > 0){
                        priceMap["yellow"] -= .25;
                    }
                    this.yellowPriceText.text = "\tYellow\n" + "\t" + priceMap["yellow"].toFixed(2) + "$/Jar";
                    this.yellowMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.yellowMinus.setFrame(0);
                });
            this.yellowPriceText = this.add.text((config.width / 5) - 75, (0.75 + 0.5*typesUsed) * config.height / 5,
                "\tYellow\n" + "\t" + priceMap["yellow"].toFixed(2) + "$/Jar", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(.75);
        }
        //Price Setting Blue
        if (playerVariables.inventory.honey["blue"]) {
            ++typesUsed;
            this.bluePlus = this.add.image(config.width / 5, (0.75 + 0.5*typesUsed) * config.height / 5, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.bluePlus.alpha = 1;
                    this.bluePriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.bluePlus.alpha = .75;
                    this.bluePriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["blue"] += .25;
                    this.bluePriceText.text = "\tBlue\n" + "\t" + priceMap["blue"].toFixed(2) + "$/Jar";
                    this.bluePlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.bluePlus.setFrame(0);
                });
            this.blueMinus = this.add.image((config.width / 5) - 150, (0.75 + 0.5*typesUsed) * config.height / 5, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.blueMinus.alpha = 1;
                    this.bluePriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.blueMinus.alpha = .75;
                    this.bluePriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["blue"] > 0){
                        priceMap["blue"] -= .25;
                    }
                    this.bluePriceText.text = "\tBlue\n" + "\t" + priceMap["blue"].toFixed(2) + "$/Jar";
                    this.blueMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.blueMinus.setFrame(0);
                });
            this.bluePriceText = this.add.text((config.width / 5) - 75, (0.75 + 0.5*typesUsed) * config.height / 5,
                "Blue\n" + "\t" + priceMap["blue"].toFixed(2) + "$/Jar", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(.75);
        }
        //Price Setting Pink
        if (playerVariables.inventory.honey["pink"]) {
            ++typesUsed;
            //create plus and minus icon with events for pink price
            this.pinkPlus = this.add.image(config.width / 5, (0.75 + 0.5*typesUsed) * config.height / 5, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.pinkPlus.alpha = 1;
                    this.pinkPriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.pinkPlus.alpha = .75;
                    this.pinkPriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["pink"] += .25;
                    this.pinkPriceText.text = "\tPink\n" + "\t" + priceMap["pink"].toFixed(2) + "$/Jar";
                    this.pinkPlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.pinkPlus.setFrame(0);
                });

            this.pinkMinus = this.add.image((config.width / 5) - 150, (0.75 + 0.5*typesUsed) * config.height / 5, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.pinkMinus.alpha = 1;
                    this.pinkPriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.pinkMinus.alpha = .75;
                    this.pinkPriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["pink"] > 0){
                        priceMap["pink"] -= .25;
                    }
                    this.pinkPriceText.text = "\tPink\n" + "\t" + priceMap["pink"].toFixed(2) + "$/Jar";
                    this.pinkMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.pinkMinus.setFrame(0);
                });
            this.pinkPriceText = this.add.text((config.width / 5) - 75, (0.75 + 0.5*typesUsed) * config.height / 5,
                "Pink\n" + "\t" + priceMap["pink"].toFixed(2) + "$/Jar", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(.75);
        }
        //Price Setting Purple
        if (playerVariables.inventory.honey["purple"]) {
            ++typesUsed;
            this.purplePlus = this.add.image(config.width / 5, (0.75 + 0.5*typesUsed) * config.height / 5, 'greenPlus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.purplePlus.alpha = 1;
                    this.purplePriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.purplePlus.alpha = .75;
                    this.purplePriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    priceMap["purple"] += .25;
                    this.purplePriceText.text = "\tPurple\n" + "\t" + priceMap["purple"].toFixed(2) + "$/Jar";
                    this.purplePlus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.purplePlus.setFrame(0);
                });

            this.purpleMinus = this.add.image((config.width / 5) - 150, (0.75 + 0.5*typesUsed) * config.height / 5, 'redMinus', 0)
                .setOrigin(.5, .5).setDepth(100).setScale(.45, .45).setAlpha(.75).setInteractive()
                .on("pointerover", () => {
                    this.purpleMinus.alpha = 1;
                    this.purplePriceText.alpha = 1;
                })
                .on("pointerout", () => {
                    this.purpleMinus.alpha = .75;
                    this.purplePriceText.alpha = .75;
                })
                .on("pointerdown", () => {
                    if(priceMap["purple"] > 0){
                        priceMap["purple"] -= .25;
                    }
                    this.purplePriceText.text = "\tPurple\n" + "\t" + priceMap["purple"].toFixed(2) + "$/Jar";
                    this.purpleMinus.setFrame(1);
                })
                .on("pointerup", () => {
                    this.purpleMinus.setFrame(0);
                });
            //default purple price
            this.purplePriceText = this.add.text((config.width / 5) - 75, (0.75 + 0.5*typesUsed) * config.height / 5,
                "Purple\n" + "\t" + priceMap["purple"].toFixed(2) + "$/Jar", this.textConfig)
                .setOrigin(.5, .5).setDepth(100).setAlpha(.75);
        }

    }

    createSellOptions() {

        this.sellYes = this.add.image(this.bear.x + 150, this.bear.y - 200, 'sellYes', 0).setDepth(100).setAlpha(0);
        this.sellNo = this.add.image(this.bear.x - 150, this.bear.y - 200, 'sellNo', 0).setDepth(100).setAlpha(0);
        console.log(this.sellNo);
    }

    createEvents() {
        //Rebinds escape
        this.events.on("resume", () => {
            console.log("ReenableEsc called");
            this.music.setVolume(config.volume);
            keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        });
    }

    updateText() {
        //update text UIs
        this.moneyText.text = "Money: $" + Math.floor(playerVariables.money) + "." + 
            Math.floor(playerVariables.money * 10) % 10 + Math.floor(playerVariables.money * 100) % 10;
        this.honeyText.text = "Honey: " + playerVariables.inventory.honey.total;
        this.currTime = Math.floor((this.timer.delay - this.timer.getElapsed()) / 1000);
        //this.timeText.text = "Time Remaining: " + Math.floor(this.currTime / 60) + ":" + Math.floor((this.currTime % 60) / 10) + this.currTime % 10;
        this.customerText.text = "Customers Remaining: " + this.customersInLine.length;
    }

    updateCheckPause() {
        //Pause Game
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("Pausing Game");
            //isPaused = true;
            this.scene.pause();
            this.scene.launch("pauseScene", {previousScene: "marketScene"});
        }
    }

    updateTimeUp() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN) || Phaser.Input.Keyboard.JustDown(keyS)) {
            //Go to hub and start next day
            hasSoldForDay = true;
            this.music.stop();
            this.music.playSFX("mapTransition");
            if(playerVariables.inventory.honey["total"] === 0){
                this.scene.launch('priceHistory', {previousScene: "marketScene", previousSceneDone:"SOLD OUT"});
            }
            else{
                this.scene.launch('priceHistory', {previousScene: "marketScene", previousSceneDone:"NO MORE CUSTOMERS"});
            }
            
        }
    }

    updateBearShuffle() {
        //Constant bear hustle
        this.bear.x += .25 * Math.sin(this.currTime / 2);
        this.bear.y += .1 * Math.sin(this.currTime / 4 + 1);
    }

    updatePrepareInteraction() {
        //determine what type of honey to buy
        //proportions depend on how much of each you have
        let rand = Math.random();
        rand -= playerVariables.inventory.honey["yellow"] / playerVariables.inventory.honey.total;
        if (rand > 0) {
            rand -= playerVariables.inventory.honey["blue"] / playerVariables.inventory.honey.total;
            if (rand > 0) {
                rand -= playerVariables.inventory.honey["purple"] / playerVariables.inventory.honey.total;
                if (rand > 0) {
                    this.typeToBuy = "pink"
                } else {
                    this.typeToBuy = "purple";
                }
            } else {
                this.typeToBuy = "blue";
            }
        } else {
            this.typeToBuy = "yellow";
        }
        //Could be a call to NPC characteristics
        this.npcAmount = 1;
        let random = Math.random();
        if (random > .9) {
            this.npcAmount = Math.min(3, playerVariables.inventory.honey[this.typeToBuy]);
        } else if (random > .65) {
            this.npcAmount = Math.min(2, playerVariables.inventory.honey[this.typeToBuy]);
        }
        this.npcPrice = 0;
        if (this.typeToBuy == "yellow") {
            //yellow price range $2 - $4, average $3
            this.npcPrice = (1.5 + Phaser.Math.FloatBetween(.25, 1.5) + Phaser.Math.FloatBetween(.25, 1))
                * this.npcAmount;
        } else {
            //non-yellow price range $3 - $7, average $5
            this.npcPrice = (2 + Phaser.Math.FloatBetween(.5, 3) + Phaser.Math.FloatBetween(.5, 2))
                * this.npcAmount;
        }
        this.transactionText.text = this.npc.name + ": " + this.npc.voiceLines[0][Phaser.Math.Between(0,
            this.npc.voiceLines[0].length - 1)] + "\nI would like to buy " + this.npcAmount +
            " jars\nof " + this.typeToBuy + " honey for $" + Math.floor(this.npcPrice) + "." +
            Math.floor((this.npcPrice * 10) % 10) + Math.floor((this.npcPrice * 100) % 10) +
            "\n[Y]es  /   [N]o";
    }

    generateNPC(placeX) {
        var randNPC = new NPC(this, placeX);
        return randNPC;
    }


    generateBarterOffer(price){
        let barterOffer = {};
        let poolOfOptions = [];
        for (var [obj, info] of Object.entries(this.barterPool)) {
            //console.log(`obj ${obj} and info ${info}`);
            if (price >= info.val){
                //console.log(`obj ${obj} with price ${price} and val ${info.val}`);
                poolOfOptions.push([obj, info]);
            }
        }
        let item = poolOfOptions[Math.floor(Math.random() * poolOfOptions.length)];
        let offerAmt = price/item[1].val
        //console.log(`NPC will offer ${offerAmt} ${item[0]}`);
        barterOffer.amt = offerAmt;
        barterOffer.item = item[0];
        barterOffer.img = item[1].img;
        barterOffer.scale = item[1].scale;
        barterOffer.category = item[1].category;
        return barterOffer;
    }
}
