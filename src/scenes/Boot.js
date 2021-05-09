class Boot extends Phaser.Scene {
    constructor() {
        super("bootScene");
    }

    preload() {
        //Take actions based on local storage
        this.storesLocally;
        // check for local storage browser support
        if(window.localStorage) {
            console.log('Local storage supported');
            this.storesLocally = true;
            this.takeLocalStorageActions();
        } else {
            console.log('Local storage not supported');
            this.storesLocally = false;
        }
        
        //Load images
            //For gardenScene
            this.load.image("extraLargeGrass", "./assets/sprites/background/massiveGrassbackdrop.png")
            this.load.image("gardenBackground", "./assets/sprites/background/3xEmpty.png");
            this.load.image("exit", "./assets/sprites/background/LeftArrowGREEN.png");
            this.load.image("dirtDry", "./assets/sprites/spritesheetFrames/plotDry.png");
            this.load.image("dirtWet", "./assets/sprites/spritesheetFrames/plotWet.png");
            this.load.image("hive", "./assets/sprites/background/hive.png");
            this.load.image("bearBee", "./assets/sprites/character/beeTiny.png");
            this.load.image("largeBee", "./assets/sprites/character/bee.png");
            this.load.image("tempLavender", "./assets/sprites/background/lavTest.png");
            this.load.image('sprinkler', './assets/sprites/background/sprinkler.png');
            this.load.image('sprinklerHighlight', './assets/sprites/old/blue.png');
            this.load.image('hiveHighlight', './assets/sprites/old/orange.png');
            this.load.image('water4','./assets/img/wateringcannew1.png');
            this.load.image('water3','./assets/img/wateringcannew2.png');
            this.load.image('water2','./assets/img/wateringcannew3.png');
            this.load.image('water1','./assets/img/wateringcannew4.png');
            this.load.image('water0','./assets/img/wateringcannew5.png');
            this.load.image('spigot','./assets/img/spigot.png');
            this.load.image('weed','./assets/spritesheets/old/Capture.PNG');
            this.load.image('bramble','./assets/img/bramb.png');
            this.load.image('clipper','./assets/img/clippers.png');
            //Flower stages for Garden
            this.load.image("seedling", "./assets/sprites/spritesheetFrames/uni0.png");
            this.load.image("sprout", "./assets/sprites/spritesheetFrames/uni1.png");
            this.load.image("flowerWhite2", "./assets/sprites/spritesheetFrames/white2.png");
            this.load.image("flowerWhite3", "./assets/sprites/spritesheetFrames/white3.png");
            this.load.image("flowerWhite4", "./assets/sprites/spritesheetFrames/white4.png");
            this.load.image("flowerWhite5", "./assets/sprites/spritesheetFrames/white5.png");
            this.load.image("flowerBlue2", "./assets/sprites/spritesheetFrames/blue2.png");
            this.load.image("flowerBlue3", "./assets/sprites/spritesheetFrames/blue3.png");
            this.load.image("flowerBlue4", "./assets/sprites/spritesheetFrames/blue4.png");
            this.load.image("flowerBlue5", "./assets/sprites/spritesheetFrames/blue5.png");
            this.load.image("flowerRed2", "./assets/sprites/spritesheetFrames/red2.png");
            this.load.image("flowerRed3", "./assets/sprites/spritesheetFrames/red3.png");
            this.load.image("flowerRed4", "./assets/sprites/spritesheetFrames/red4.png");
            this.load.image("flowerRed5", "./assets/sprites/spritesheetFrames/red5.png");
            this.load.image("flowerPurple2", "./assets/sprites/spritesheetFrames/purple2.png");
            this.load.image("flowerPurple3", "./assets/sprites/spritesheetFrames/purple3.png");
            this.load.image("flowerPurple4", "./assets/sprites/spritesheetFrames/purple4.png");
            this.load.image("flowerPurple5", "./assets/sprites/spritesheetFrames/purple5.png");
            //For hubScene
            this.load.image('background', './assets/sprites/background/garden_base.png');
            this.load.image('dialogbox', './assets/img/dialogbox.png');
            this.load.image('playerWealthTracker', './assets/sprites/UI/moneyhoney.png');
            this.load.image('filledStar', './assets/sprites/old/orange.png');
            this.load.image('emptyStar', './assets/sprites/old/blue.png');
            this.load.image('simpleBox','./assets/sprites/UI/box_80x80.png');
            //For shop
            this.load.image('toadLeckman', './assets/sprites/character/mrleckman_510x300.png');
            this.load.image('townBackground', './assets/img/TOWNTEST.png');
            //For market price setting
            this.load.image('chalkboard', './assets/sprites/UI/chalkboardBlank.png');
            this.load.image('brickFence', './assets/sprites/background/brickFence.png');
            //For Market
            this.load.image('basicDogNPC', './assets/sprites/character/dognpc_275x458.png');
            this.load.image('dalmationDogNPC', './assets/sprites/character/dalmatian.png');
            this.load.image('dobermanDogNPC', './assets/sprites/character/dobberman.png');
            this.load.image('huskyDogNPC', './assets/sprites/character/husky.png');
            this.load.image('spotDogNPC', './assets/sprites/character/spotdog.png');
            this.load.image('basicBunNPC', './assets/sprites/character/bunnynpc_251x546.png');
            this.load.image('secondBunNPC', './assets/sprites/character/bunnynpc_253x558.png');
            this.load.image('albinoBunNPC', './assets/sprites/character/albinobunny.png');
            this.load.image('bluegreyBunNPC', './assets/sprites/character/bluegreybunny.png');
            this.load.image('brownBunNPC', './assets/sprites/character/brownbunny.png');
            this.load.image('pinkBunNPC', './assets/sprites/character/pinkbunny.png');
            this.load.image('whiteCatNPC', './assets/sprites/character/catnpcWH_246x456.png');
            this.load.image('orangeCatNPC', './assets/sprites/character/catnpcOR_246x456.png');
            this.load.image('marketSky', './assets/sprites/background/sky.png');
            this.load.image('marketBackground', './assets/sprites/background/marketbg.png');
            this.load.image('booth', './assets/sprites/background/boothTall.png');
            this.load.image('cloth', './assets/sprites/background/boothTallCurtain.png');
            this.load.image('honeyYellow', './assets/sprites/background/honeyPlain.png');
            this.load.image('honeyPink', './assets/sprites/background/honeyPink.png');
            this.load.image('honeyBlue', './assets/sprites/background/honeyBlue.png');
            this.load.image('honeyPurple', './assets/sprites/background/honeyPurple.png');
            this.load.image('redIcon','./assets/sprites/UI/redIcon.png');
            this.load.image('blueIcon','./assets/sprites/UI/blueIcon.png');
            this.load.image('purpleIcon','./assets/sprites/UI/purpleIcon.png');
            this.load.image('pinkIcon','./assets/sprites/UI/pinkIcon.png');
            //this.load.image('redMinus', './assets/sprites/UI/minusRed_240.png');
            this.load.image('greenMinus', './assets/sprites/UI/minusGreen_240.png');
            //this.load.image('greenPlus', './assets/sprites/UI/plusGreen_240.png');
            this.load.image('plusRed', './assets/sprites/UI/plusRed_240.png');
            this.load.image('sellYes', './assets/sprites/UI/sellYes.png');
            this.load.image('sellNo', './assets/sprites/UI/sellNo.png');
            this.load.image('angry', './assets/img/angry.png');
            this.load.image('displeased', './assets/img/displeased.png');
            this.load.image('ecstatic', './assets/img/ecstatic.png');
            this.load.image('happy', './assets/img/happy.png');
            this.load.image('neutral', './assets/img/neutral.png');
            this.load.image('pleased', './assets/img/pleased.png');
            this.load.image('sad', './assets/img/sad.png');
            this.load.image('satisfied', './assets/img/satisfied.png');
            this.load.image('bearbucks','./assets/sprites/UI/bearbucks.png');
            this.load.image('emptyBox','./assets/sprites/UI/box120x120.png');
            this.load.image('emptyBoxTwo', './assets/sprites/UI/haggleBox.png')
            this.load.image('noBuy', './assets/img/noBuy.png');
            this.load.image('barterIcon','./assets/sprites/UI/barterIcon.png');
            this.load.image('barterBlank','./assets/sprites/UI/barterBlank.png');
            //For pricehistory scene
            this.load.image('notebookBG', './assets/sprites/UI/notebookHalfLined.png');
            this.load.image('noteBook','./assets/sprites/UI/notebookIcon.png');
            //For mapScene
            this.load.image('TownMap', './assets/sprites/background/WhiteBackground.png');
            this.load.image('PlayerIcon', './assets/sprites/character/playerMapIcon.png');
            //For menuScene
            this.load.image('titleScreen1', './assets/sprites/background/title_screen_illust1.png');
            this.load.image('titleScreen2', './assets/sprites/background/title_screen_illust2.png');
            this.load.image('titleScreen3', './assets/sprites/background/title_screen_illust3.png');
            //For playScene
            this.load.image("Player", "./assets/sprites/character/bearOnBike.png");
            this.load.image("Road", "./assets/sprites/background/roadFullEX-02.png");
            this.load.image("Obstacle_1", './assets/sprites/character/playerMapIcon.png');
            //For pauseScene
            this.load.image("TempPause", "./assets/sprites/background/tempPause.png");
            //For settingsScene
            this.load.image("TempSettingsScreen", "./assets/img/TempSettings3_3_21.png");
            //For creditsScene
            this.load.image("TempCreditsScreen", "./assets/img/TempCredits3_3_21.png");
            //For tutorialScene
            this.load.image("TempTutorialScreen", "./assets/img/TempTutorial3_3_21.png");
            //For player Inventory
            this.load.image("tempBackpackIcon", "./assets/sprites/UI/backpack_lightest.png");


        //Load Spritesheets
            //For gardenScene
            //this.load.spritesheet('flowerSheet', './assets/spritesheets/flowerStages.png', { frameWidth: 407, frameHeight: 456, startFrame: 0, endFrame: 4 });
            //For hubScene
            //this.load.spritesheet('player', './assets/spritesheets/bearFrontBack.png', {frameWidth:40, frameHeight:72, startFrame:0, endFrame:1});
            this.load.spritesheet('player', './assets/spritesheets/bearAnims.png', {frameWidth: 140, frameHeight:247, startFrame:0, endFrame:7});
            this.load.spritesheet('backpackFrames', "./assets/spritesheets/backpackSheet.png", {frameWidth: 120, frameHeight:121, startFrame:0, endFrame:1});
            //For menuScene
            this.load.spritesheet('Play','./assets/spritesheets/title_text_CONT_1730x115.png',{frameWidth: 865, frameHeight: 115, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Settings','./assets/spritesheets/title_text_SET_1084x175.png',{frameWidth: 542, frameHeight: 175, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Tutorial', './assets/spritesheets/title_text_NEW_1194x115.png', {frameWidth: 597, frameHeight: 115, startFrame:0 , endFrame: 1});
            this.load.spritesheet('Credits', './assets/spritesheets/title_text_CRED_936x115.png', {frameWidth: 468, frameHeight: 115, startFrame:0 , endFrame: 1});
            //For settingsScene
            this.load.spritesheet('Back', './assets/spritesheets/BackInitial.png', {frameWidth: 114, frameHeight: 36, startFrame: 0, endFrame: 1});
            //For marketScene
            this.load.spritesheet('bearBackFrames', './assets/spritesheets/LARGE_anim_idle_back_1000x875.png', {frameWidth: 500, frameHeight: 875, startFrame: 0, endFrame: 1});
            this.load.spritesheet('greenPlus', './assets/spritesheets/plusGreenFrames.png', {frameWidth: 80, frameHeight:80, startFrame: 0, endFrame:1});
            this.load.spritesheet('redMinus', './assets/spritesheets/minusRedFrames.png', {frameWidth: 80, frameHeight:80, startFrame: 0, endFrame:1});
            this.load.spritesheet('wateringCanFrames', './assets/spritesheets/wateringCanFrames.png', {frameWidth: 120, frameHeight:120, startFrame: 0, endFrame:3});

        //Load Music
            //For hubScene
            this.load.audio("hubMusic", "./assets/audio/music/bear_full.mp3");
            this.load.audio("ranchMusic", "./assets/audio/music/ranch.mp3");
            //For mapScene
            this.load.audio("mapMusic", "./assets/audio/music/honeybear.wav");
            //For menuScene
            this.load.audio("menuMusic", "./assets/audio/music/honeybear_2.wav");
            //For shopScene
            this.load.audio("shopMusicFull", "./assets/audio/music/toad_shop_theme_full_intro.mp3");
            this.load.audio("shopMusicShort", "./assets/audio/music/toad_shop_theme_short_intro.mp3");
            //For marketScene
            this.load.audio("marketMusic", "./assets/audio/music/market.mp3");
            this.load.audio("bedtimeMusic", "./assets/audio/music/Bedtime.mp3");

        //Load SFX
            //For hubScene and marketScene
            this.load.audio("hubMarketTransition", "./assets/audio/sfx/settingupstall.mp3");
            this.load.audio("backpackOpen", "./assets/audio/sfx/backpack_open.mp3");
            this.load.audio("shopSelect", "./assets/audio/sfx/shopselect(loud).mp3");
            this.load.audio("shopMistake", "./assets/audio/sfx/mistake.mp3");
            this.load.audio("mapTransition", "./assets/audio/sfx/closemap.mp3");
            this.load.audio("buyFlowers", "./assets/audio/sfx/buyflowers(loud).mp3");
            this.load.audio("successfulSell", "./assets/audio/sfx/successful_sell(loud).mp3");
            this.load.audio("mapFlip", "./assets/audio/sfx/mapflip.mp3");
            //New
            this.load.audio("clipperCut", "./assets/audio/sfx/clipper_cut.mp3");
            this.load.audio("dig", "./assets/audio/sfx/dig.mp3");
            this.load.audio("failtosell", "./assets/audio/sfx/failtosellnew.mp3");
            this.load.audio("waterFlowers", "./assets/audio/sfx/newwaterflowers.mp3");
            this.load.audio("notebook", "./assets/audio/sfx/notebook.mp3");
            this.load.audio("placeItem", "./assets/audio/sfx/placeitem.mp3");

    
        //Load Fonts
            //For hubScene
            this.load.bitmapFont('gem_font', './assets/font/gem.png', './assets/font/gem.xml');



        //Load dialogue
        this.load.json('dialog', './assets/json/dialog.json');






        //Make the background for the loading bar
        //credit to https://gamedevacademy.org/creating-a-preloading-screen-in-phaser-3/
        var progressBar = this.add.graphics();
        var progressBox = this.add.graphics();
        progressBox.fillStyle(0x222222, 0.8);
        progressBox.fillRect(config.width/2 -160, 270, 320, 50);
        
        //Whenever progress is made
        this.load.on('progress', function (value) {
          console.log(value);
          progressBar.clear();
          progressBar.fillStyle(0xffffff, 1);
          progressBar.fillRect(config.width/2 -150, 280, 300 * value, 30);
        });
                
        //Whenever a file is loaded
        this.load.on('fileprogress', function (file) {
          console.log(file.src);
        });
       
        //When all files are loaded
        this.load.on('complete', function () {
          console.log('complete');
          progressBar.destroy();
          progressBox.destroy();
        });
    }

    create(){
        // go to Title scene
        this.scene.start('menuScene');
    }

    takeLocalStorageActions(){
        //Check Version Number
        var storedVersion = localStorage.getItem("versionNumber");
        console.log("Stored Version: " + storedVersion);
        console.log("Game Version: " + VERSION_NUMBER);
        if(storedVersion === VERSION_NUMBER){
            console.log("The versions match");
        }
        else{
            console.log("The versions do not match");
            return;
        }
    }
}