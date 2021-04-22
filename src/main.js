//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Boot, Hub, Garden, Map, Market, MarketPriceSetting, Play, Menu, Credits, Talking,
        OldRhythm,  Shop, ShopUI, Tutorial, BackPackUI, HubPopup, Pause, Settings, Win, PriceHistory],
    volume: .7,
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

let sfxVolume = .7;
let game = new Phaser.Game(config);
let previousScene = null;
const VERSION_NUMBER = "0.3.6";
//reserve some keyboard variables
let keyP, keyO, keyESCAPE, keyENTER, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE,
    keyY, keyN, keyT, keyB, keyW, keyA, keyS, keyD, keyH, keyJ, keyK, keyL;

//colors for ui elements
let uiScene; // global variable for current active ui scene
const COLOR_PRIMARY = 0x808ADE;
const COLOR_LIGHT = 0x684ADE;
const COLOR_DARK = 0x80DECB;
const Random = Phaser.Math.Between;
const font = 'helvetica';

let currentDay = 0;
let hasSoldForDay = false;

let upgrades = { "bike": 0 };
//Starting garden state
let flow0 = new Flower(2, 3, "Cosmos");
let flow1 = new Flower(2, 3, "Cosmos");
let hive = new Hive(5, 2);
//more flowers for testing purposes
let gardenGrid = [ // 11 x 11 grid for garden generating
    //Starting placements for intial garden
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,  flow0,   null,  flow1,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   hive,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null]
];
//Assign plots to each spot on the grid
for(let row = 0; row < gardenGrid.length; row++) {
    for(let col = 0; col < gardenGrid[0].length; col++) {
        let temp = new Plot(col, row);
        let loc = gardenGrid[row][col];
        if(loc instanceof Flower || loc instanceof Sprinkler) {
            temp.dug = true;
        }
        if(loc == null) {
            //Populate in Brambles with higher denisty towards the bottom
            let rand = Math.random();
            if(rand + Math.sqrt((row - 3) / 15) > .85) {
                gardenGrid[row][col] = new Bramble(col, row);
            }
        }
        temp.item = gardenGrid[row][col];
        gardenGrid[row][col] = temp;
    }
}

let cursors = null;
let dialogueSection = 0;
//let isPaused = false;
let heldItem = undefined;
let heldType = undefined;
let plantingSeeds = false;
let vars = {};

//Player variables so we dont have to pass them around forever
let playerVariables = {
    money: 10.00,
    reputation: 0,
    name: "Bearry",
    inventory: {
        honey: {
            "total": 3,
            "yellow": 3,
            "blue": 0,
            "purple": 0,
            "pink": 0,
            "Leftover Yellow": 0,
            "Leftover Blue": 0,
            "Leftover Purple": 0,
            "Leftover Pink": 0
        },
        items: {
            "Beehive": 0,
            "Sprinkler": 0,
            "Clipper": 3,
            "Mulch": 0
        },
        flowers: {
            "Cosmos": 0,
            "Bluebonnet": 0,
            "Lavender": 0,
            "Tulip": 0,
            "Orchid": 0
        },
        seeds: {
            //Daisy, Delphinium, Lavender, Tulip
            "Cosmos": 2,
            "Bluebonnet": 0,
            "Lavender": 0,
            "Tulip": 0,
            "Orchid": 0
        }
    }
}
let shopInventory = {
    "Seeds": {
        "Cosmos": {"amount": 2,"cost":2},
        "Lavender":{"amount": 3,"cost": 3},
        //"Orchid":{"amount": 3,"cost": 3},
        "Bluebonnet":{"amount": 3,"cost": 4},
        "Tulip":{"amount": 3,"cost": 4}
    },
    "Items":{
        "Sprinkler":{"amount": 2,"cost":15},
        "Beehive":{"amount": 2,"cost":12},
        "Clipper":{"amount":4,"cost":3}
        //,        "Fertilizer":{"amount": 5,"cost": 4}
    }
}

let itemOptions = [
    {
        name: 'Plant',
    },
    {
        name: 'Cancel',
    },
];
let rangeDialogue = {
    low: [0,1],
    mid: [2,3],
    high: [4,5],
    goodbyes: [6, 7],
    angry:[8]

}

let dialogGlobal = undefined;
let dialogSlice = undefined;
let dialogEnded = false;
let dialogActive = false;

let sellChoice = undefined;
let bartering = false;

let priceMap = {
    "yellow": 0,
    "blue": 0,
    "purple": 0,
    "pink": 0
}
let moodMap = {
    0:"happy",
    1:"pleased",
    2:"neutral",
    3:"displeased"
}

let priceHistory = [];