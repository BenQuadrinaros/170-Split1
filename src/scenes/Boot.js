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
            this.load.image("gardenBackground", "./assets/sprites/background/caveGrassDaytime.png");
            this.load.image("gardenBackgroundEvening", "./assets/sprites/background/caveGrassEvening.png");

            this.load.image("hubBackTrees", "./assets/sprites/background/backtreesDaytime.png");
            this.load.image("hubBackTreesEvening", "./assets/sprites/background/backtreesEvening.png");

            this.load.image("hubClouds", "./assets/sprites/background/clouds.png");
            this.load.image("hubSky", "./assets/sprites/background/skyDaytime.png");
            this.load.image("hubSkyEvening", "./assets/sprites/background/skyEvening.png");

            this.load.image("hubEveningOverlay", "./assets/sprites/background/eveningOverlay.png");

            this.load.image("hubFenceIron", "./assets/sprites/background/fenceIron.png");
            this.load.image("hubFenceWood", "./assets/sprites/background/fenceWood.png");

            this.load.image("hubTrailBrick", "./assets/sprites/background/pathBrickGray.png");
            this.load.image("hubTrailDirt", "./assets/sprites/background/pathDirt.png");

            this.load.image("hubShadowsBackTreesIronFence", "./assets/sprites/background/sh_backtreesIronDaytime.png");
            this.load.image("hubShadowsBackTreesIronFenceEvening", "./assets/sprites/background/sh_backtreesIronEvening.png");
            this.load.image("hubShadowsBackTreesWoodFence", "./assets/sprites/background/sh_backtreesWoodDaytime.png");
            this.load.image("hubShadowsBackTreesWoodFenceEvening", "./assets/sprites/background/sh_backtreesWoodEvening.png");
            this.load.image("hubShadowsIronFence", "./assets/sprites/background/sh_ironDaytime.png");
            this.load.image("hubShadowsIronFenceEvening", "./assets/sprites/background/sh_ironEvening.png");
            this.load.image("hubShadowsWoodFence", "./assets/sprites/background/sh_woodDaytime.png");
            this.load.image("hubShadowsWoodFenceEvening", "./assets/sprites/background/sh_woodEvening.png");

            this.load.image('Bench', './assets/img/bench.png');
            this.load.image("Bush","./assets/img/circlebushsmallrecolor.png");
            this.load.image("Hedge","./assets/img/hedgerecolor.png");
            this.load.image("Fence","./assets/img/fencetall.png");
            
            
            this.load.image("exit", "./assets/sprites/background/LeftArrowGREEN.png");
            this.load.image("dirtDry", "./assets/img/dirtDry.png");
            this.load.image("dirtWet", "./assets/img/dirtWet.png");
            this.load.image("hive", "./assets/sprites/background/hive.png");
            this.load.image("bearBee", "./assets/sprites/character/beeTiny.png");
            this.load.image("largeBee", "./assets/sprites/character/bee.png");
            this.load.image("tempLavender", "./assets/sprites/background/lavTest.png");
            this.load.image('sprinkler', './assets/sprites/background/sprinkler.png');
            this.load.image('sprinklerHighlight', './assets/sprites/old/blue.png');
            this.load.image('droplet','./assets/img/droplet.png');
            this.load.image('hiveHighlight', './assets/sprites/old/orange.png');
            this.load.image('spigot','./assets/img/spigot.png');
            this.load.image('weed','./assets/sprites/spritesheetFrames/weed.png');
            this.load.image('bramble','./assets/img/bramb.png');
            this.load.image('clipper','./assets/img/clippers.png');
            this.load.image("!blue", "./assets/sprites/UI/exclamationBlue.png");
            this.load.image("!purple", "./assets/sprites/UI/exclamationPurple.png");
            this.load.image("!pink", "./assets/sprites/UI/exclamationPink.png");
            //All the different Watering Can frames
            this.load.image('redwater4','./assets/img/WateringCanFrames/wateringcannew1.png');
            this.load.image('redwater3','./assets/img/WateringCanFrames/wateringcannew2.png');
            this.load.image('redwater2','./assets/img/WateringCanFrames/wateringcannew3.png');
            this.load.image('redwater1','./assets/img/WateringCanFrames/wateringcannew4.png');
            this.load.image('redwater0','./assets/img/WateringCanFrames/wateringcannew5.png');
            this.load.image('bluewater5','./assets/img/WateringCanFrames/bluewateringcan1.png');
            this.load.image('bluewater4','./assets/img/WateringCanFrames/bluewateringcan2.png');
            this.load.image('bluewater3','./assets/img/WateringCanFrames/bluewateringcan3.png');
            this.load.image('bluewater2','./assets/img/WateringCanFrames/bluewateringcan4.png');
            this.load.image('bluewater1','./assets/img/WateringCanFrames/bluewateringcan5.png');
            this.load.image('bluewater0','./assets/img/WateringCanFrames/bluewateringcan6.png');
            this.load.image('purplewater6','./assets/img/WateringCanFrames/purplewateringcan1.png');
            this.load.image('purplewater5','./assets/img/WateringCanFrames/purplewateringcan2.png');
            this.load.image('purplewater4','./assets/img/WateringCanFrames/purplewateringcan3.png');
            this.load.image('purplewater3','./assets/img/WateringCanFrames/purplewateringcan4.png');
            this.load.image('purplewater2','./assets/img/WateringCanFrames/purplewateringcan5.png');
            this.load.image('purplewater1','./assets/img/WateringCanFrames/purplewateringcan6.png');
            this.load.image('purplewater0','./assets/img/WateringCanFrames/purplewateringcan7.png');
            //Flower stages for Garden
            this.load.image("TulipSeeds","./assets/img/tulipSeeds.png");
            this.load.image("DaisySeeds","./assets/img/daisySeeds.png");
            this.load.image("LavenderSeeds","./assets/img/lavenderSeeds.png");
            this.load.image("DelphiniumSeeds","./assets/img/delphiniumSeeds.png");
            this.load.image("seedling", "./assets/sprites/spritesheetFrames/uni0.png");
            this.load.image("sprout", "./assets/sprites/spritesheetFrames/uni1.png");
            this.load.image("flowerWhite2", "./assets/sprites/spritesheetFrames/daisy2.png");
            this.load.image("flowerWhite3", "./assets/sprites/spritesheetFrames/daisy3.png");
            this.load.image("flowerWhite4", "./assets/sprites/spritesheetFrames/daisy4.png");
            this.load.image("flowerWhite5", "./assets/sprites/spritesheetFrames/daisy5.png");
            this.load.image("flowerBlue1", "./assets/sprites/spritesheetFrames/delphinium1.png");
            this.load.image("flowerBlue2", "./assets/sprites/spritesheetFrames/delphinium2.png");
            this.load.image("flowerBlue3", "./assets/sprites/spritesheetFrames/delphinium3.png");
            this.load.image("flowerBlue4", "./assets/sprites/spritesheetFrames/delphinium4.png");
            this.load.image("flowerBlue5", "./assets/sprites/spritesheetFrames/delphinium5.png");
            this.load.image("flowerRed1", "./assets/sprites/spritesheetFrames/tulip1.png");
            this.load.image("flowerRed2", "./assets/sprites/spritesheetFrames/tulip2.png");
            this.load.image("flowerRed3", "./assets/sprites/spritesheetFrames/tulip3.png");
            this.load.image("flowerRed4", "./assets/sprites/spritesheetFrames/tulip4.png");
            this.load.image("flowerRed5", "./assets/sprites/spritesheetFrames/tulip5.png");
            this.load.image("flowerPurple1", "./assets/sprites/spritesheetFrames/lavender1.png");
            this.load.image("flowerPurple2", "./assets/sprites/spritesheetFrames/lavender2.png");
            this.load.image("flowerPurple3", "./assets/sprites/spritesheetFrames/lavender3.png");
            this.load.image("flowerPurple4", "./assets/sprites/spritesheetFrames/lavender4.png");
            this.load.image("flowerPurple5", "./assets/sprites/spritesheetFrames/lavender5.png");
            //For hubScene
            this.load.image('dialogbox', './assets/img/dialogbox.png');
            this.load.image('tutorialDialogBox', './assets/sprites/UI/beeboxTut.png');
            this.load.image('filledStar', './assets/sprites/old/orange.png');
            this.load.image('emptyStar', './assets/sprites/old/blue.png');
            this.load.image('simpleBox','./assets/sprites/UI/box_80x80.png');
            this.load.image('infoBox','./assets/sprites/UI/moneyhoney.png');
            this.load.image('snapshot','./assets/sprites/UI/camera.png');
            //for hub start of day
            this.load.image('pauseBilled', './assets/sprites/background/pauseBILLED.png');
            this.load.image('pauseEmpty', './assets/sprites/background/pauseEMPTY.png');
            this.load.image('pauseCheckmark', './assets/sprites/UI/checkmark_85x85.png');
            //For shop
            this.load.image('toadLeckman', './assets/sprites/character/mrleckman_510x300.png');
            this.load.image('toadLeckmanHead', './assets/sprites/UI/mrleckmanHEAD_285x180.png')
            this.load.image('townBackground', './assets/img/TOWNTEST.png');
            this.load.image("townBackgroundEvening", "./assets/sprites/background/townEvening.png");

            this.load.image("townClouds", "./assets/sprites/background/townClouds.png");
            this.load.image("townSky", "./assets/sprites/background/townDaytimeSky.png");
            this.load.image("townSkyEvening", "./assets/sprites/background/townEveningSky.png");
            this.load.image("townEveningOverlay", "./assets/sprites/background/townEveningOverlay.png");

            this.load.image("ironFenceDisplay","./assets/img/iron_fence_display.png");
            this.load.image("woodFenceDisplay","./assets/img/wooden_fence_display.png");
            this.load.image("backgroundTreesDisplay","./assets/img/background_trees_display.png");
            this.load.image("dirtPathDisplay","./assets/img/dirt_path_display.png");
            this.load.image("brickPathDisplay","./assets/img/brick_path_display.png");


            //For market price setting
            this.load.image('chalkboard', './assets/sprites/UI/chalkboardBlank.png');
            this.load.image('brickFence', './assets/sprites/background/brickFence.png');
            //For Market
            this.load.image('priceboardShort', './assets/sprites/UI/priceBoardShort.png');
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
        //npc heads
            this.load.image("albinoBunnyHead",'./assets/sprites/UI/albinobunnyHEAD.png');
            this.load.image("blueGreyBunnyHead",'./assets/sprites/UI/bluegreybunnyHEAD.png');
            this.load.image("brownBunnyHead",'./assets/sprites/UI/brownbunnyHEAD.png');
            this.load.image("bunnyHead",'./assets/sprites/UI/bunnynpcHEAD.png');
            this.load.image("catOrangeHead",'./assets/sprites/UI/catnpcORhead.png');
            this.load.image("catWhiteHead",'./assets/sprites/UI/catnpcWHhead.png');
            this.load.image("dalmationHead",'./assets/sprites/UI/dalmatianHEAD.png');
            this.load.image("dobbermanHead",'./assets/sprites/UI/dobbermanHEAD.png');
            this.load.image("dogHead",'./assets/sprites/UI/dognpcHEAD.png');
            this.load.image("huskeyHead",'./assets/sprites/UI/huskyHEAD.png');
            this.load.image("pinkBunnyHead",'./assets/sprites/UI/pinkbunnyHEAD.png');
            this.load.image("spotDogHead",'./assets/sprites/UI/spotdogHEAD.png');
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
            this.load.image('whiteIcon','./assets/sprites/UI/whiteIcon.png');
            this.load.image('greenMinus', './assets/sprites/UI/minusGreen_240.png');
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
            this.load.image('marketBubble','./assets/sprites/UI/marketBubble.png');
            this.load.image('barterArrows','./assets/sprites/UI/barterArrows.png');
            this.load.image('plus','./assets/sprites/UI/plus.png');
            this.load.image('minus','./assets/sprites/UI/minus.png');
            this.load.image('arrowRight','./assets/sprites/UI/arrowRight.png');
            this.load.image('arrowLeft','./assets/sprites/UI/arrowLeft.png');
            //For pricehistory scene
            this.load.image('notebookBG', './assets/sprites/UI/notebookHalfLined.png');
            this.load.image('noteBook','./assets/sprites/UI/notebookIcon.png');
            //For mapScene
            this.load.image('TownMap', './assets/sprites/background/WhiteBackground.png');
            this.load.image('PlayerIcon', './assets/sprites/character/playerMapIcon.png');
            //For menuScene
            this.load.image('titleScreenBG', './assets/sprites/background/titleBG.png');
            this.load.image('titleScreen1', './assets/sprites/background/title1.png');
            this.load.image('titleScreen2', './assets/sprites/background/title2.png');
            this.load.image('titleScreen3', './assets/sprites/background/title3.png');
            //For playScene
            this.load.image("Player", "./assets/sprites/character/bearOnBike.png");
            this.load.image("Obstacle_1", './assets/sprites/character/playerMapIcon.png');
            //For settingsScene
            this.load.image("TempSettingsScreen", "./assets/img/TempSettings3_3_21.png");
            //For creditsScene
            this.load.image("TempCreditsScreen", "./assets/img/TempCredits5_17_21.png");
            //For tutorialScene
            this.load.image("TempTutorialScreen", "./assets/img/TempTutorial3_3_21.png");
            //For player Inventory
            this.load.image("tempBackpackIcon", "./assets/sprites/UI/backpack_lightest.png");
            this.load.image("openBackpack", "./assets/sprites/UI/backpackopen.png");
            this.load.image("!", "./assets/sprites/UI/exclamationMark.png");

        //Load Spritesheets
            //For gardenScene
            //this.load.spritesheet('flowerSheet', './assets/spritesheets/flowerStages.png', { frameWidth: 407, frameHeight: 456, startFrame: 0, endFrame: 4 });
            //For hubScene
            //this.load.spritesheet('player', './assets/spritesheets/bearFrontBack.png', {frameWidth:40, frameHeight:72, startFrame:0, endFrame:1});
            this.load.spritesheet('player', './assets/spritesheets/bearAnims.png', {frameWidth: 139.5, frameHeight:248, startFrame:0, endFrame:7});
            this.load.spritesheet('playerBee', './assets/spritesheets/beecostume.png', {frameWidth: 139.5, frameHeight:250, startFrame:0, endFrame:7});
            this.load.spritesheet('playerFlower', './assets/spritesheets/flowercrown.png', {frameWidth: 139.5, frameHeight:288, startFrame:0, endFrame:7});
            this.load.spritesheet('playerHelicopter', './assets/spritesheets/helicopterhat.png', {frameWidth: 139.5, frameHeight:254, startFrame:0, endFrame:7});
            this.load.spritesheet('playerLegacy', './assets/spritesheets/legacyhat.png', {frameWidth: 139.5, frameHeight:248, startFrame:0, endFrame:7});
            this.load.spritesheet('playerSunhat', './assets/spritesheets/sunhat.png', {frameWidth: 139.5, frameHeight:288, startFrame:0, endFrame:7});
            this.load.spritesheet('playerTophat', './assets/spritesheets/tophat.png', {frameWidth: 139.5, frameHeight:288, startFrame:0, endFrame:7});
            
            this.load.image("bearShadow", "./assets/img/bearShadow.png");
            this.load.spritesheet('backpackFrames', "./assets/spritesheets/backpackSheet.png", {frameWidth: 120, frameHeight:121, startFrame:0, endFrame:1});
            //For start of day
            this.load.spritesheet("settingsPause", './assets/spritesheets/settingsPAUSE_342x51.png', {frameWidth:171, frameHeight: 51, startFrame: 0, endFrame: 1});
            //For menuScene
            this.load.spritesheet('Play','./assets/spritesheets/title_text_CONT_1770x115.png',{frameWidth: 885, frameHeight: 115, startFrame:0 , endFrame: 1});
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
            this.load.audio("spigotFill", "./assets/audio/sfx/spigotfill.mp3");
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
        var realizeMyPassionRegular = new FontFace('realize_my_passionregular',
                'url(/styles/RealizeMyPassion.ttf)',
                {
                    style: 'normal',
                    weight: 'normal'
                });
        document.fonts.add(realizeMyPassionRegular);
        realizeMyPassionRegular.load();
        realizeMyPassionRegular.loaded.then((fontFace) => {
            console.log("Font loaded");
            //Create some temp text to load the font
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

            var tempText = this.add.text(-100, -100, "This is a test", this.textConfig);

            // go to Title scene
            this.scene.start('menuScene');
            //font =  'realize_my_passionregular';

        }, (fontFace) => {
            console.error("Font current status: ", realizeMyPassionRegular.status);
            // go to Title scene
            this.scene.start('menuScene');
        });
        
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