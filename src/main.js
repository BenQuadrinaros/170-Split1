//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Boot, Hub, Garden, Map, Market, MarketPriceSetting, Play, Menu, Credits, Talking,
        OldRhythm,  Shop, ShopUI, Tutorial, BackPackUI, HubPopup, Pause, Settings, Win, PriceHistory],
    volume: .25,
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

let sfxVolume = .5;
let game = new Phaser.Game(config);
let previousScene = null;
const VERSION_NUMBER = "0.3.6";
//reserve some keyboard variables
let keyP, keyO, keyESCAPE, keyENTER, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE,
    keyY, keyN, keyT, keyB, keyW, keyA, keyS, keyD, keyH, keyJ, keyK, keyL, keyE, keyI;

//colors for ui elements
let uiScene; // global variable for current active ui scene
const COLOR_PRIMARY = 0x506092;
const SHOP_PRIMARY = 0x543d3d;
const COLOR_LIGHT = 0xf1eeaf;
const SHOP_LIGHT = 0x8cb05a;
const COLOR_DARK = 0xf1b55f;
const SHOP_DARK = 0x658442;
const Random = Phaser.Math.Between;
const font =  'realize_my_passionregular';

let currentDay = 0;
let hasSoldForDay = false;
let dailySprinklerCost = 0.0;

//Starting garden state
let flow0 = new Flower(2, 3, "Daisy");
let flow1 = new Flower(2, 3, "Daisy");
let hive = new Hive(5, 2);
let can = new WateringCan();
//more flowers for testing purposes
let gardenGrid = [ // 11 x 11 grid for garden generating
    //Starting placements for intial garden
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,    can],
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
            //Modifier for chance per plot in each row += 4% per row;
            //  Starting at -20% (top row), ending at +20% (bottom row)
            if(rand + ((row - 5) / 25) > .775) {
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
let playerInventoryUpdated = false;

//Player variables so we dont have to pass them around forever
let playerVariables = {
    money: 10.00,
    reputation: 0,
    water: 0,
    waterLvl: 0,
    beeBump: false,
    hasWon: false,
    name: "Bearry",
    score: [false, false, false, false, false],
    inventory: {
        honey: {
            "total": 3,
            "yellow": 3,
            "blue": 0,
            "purple": 0,
            "pink": 0
        },
        items: {
            "Beehive": 0,
            "Sprinkler": 0,
            "Clipper": 3,
            "Watering Can": 0
        },
        flowers: {
            "Daisy": 0,
            "Delphinium": 0,
            "Lavender": 0,
            "Tulip": 0
        },
        seeds: {
            "Daisy": 2,
            "Delphinium": 0,
            "Lavender": 0,
            "Tulip": 0
        },
        decorations: {
            "Bench": 0,
            "Bush": 0,
            "Fence": 0
        }
    }
}

let inventoryTabsUpdated = {
    'honey': false,
    'items': false,
    'flowers': false,
    'seeds': false,
    'decorations': false
}

let shopInventory = {
    "Seeds": {
        "Daisy": {"amount": 2,"cost":2},
        "Lavender":{"amount": 3,"cost": 3},
        "Delphinium":{"amount": 3,"cost": 4},
        "Tulip":{"amount": 3,"cost": 4}
    },
    "Items":{
        "Sprinkler":{"amount": 2,"cost":11},
        "Beehive":{"amount": 2,"cost":12},
        "Clipper":{"amount":2,"cost":3},
        "Blue Can":{"amount":1,"cost":7.50},
        "Purple Can":{"amount":0,"cost":12.75}
    },
    "Decorations":{
        "Bench":{"amount": 4,"cost":7}
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
    "yellow": 2.75,
    "blue": 3.75,
    "purple": 3.75,
    "pink": 4.5
}
let moodMap = {
    0:"happy",
    1:"pleased",
    2:"neutral",
    3:"displeased"
}

let priceHistory = [];
let pHistory = {};

function calculateEcologyScore() {
    // amount of flowers, variety of flowers, number of hives, number of brambles, number of weeds
    let flowerTotal = 0;
    let flowerVariety = {
        "Daisy": false,
        "Delphinium": false,
        "Lavender": false,
        "Tulip": false
    };
    let totalHives = 0;
    let totalBrambles = 0;
    let totalWeeds = -3;
    gardenGrid.forEach(row => {
        row.forEach(plot => {
            if(plot.item instanceof Flower) {
                flowerTotal++;
                flowerVariety[plot.item.type] = true;
            } else if(plot.item instanceof Hive) {
                totalHives++;
            } else if(plot.item instanceof Bramble) {
                totalBrambles++;
            } else if (plot.item instanceof Weed) {
                totalWeeds++;
            }
        })
    });
    let score = [false, false, false, false, false];
    if(totalWeeds <= 0) { score[0] = true; }
    let variety = 0;
    for(let flow in flowerVariety) {
        if(flowerVariety[flow]) { variety++; }
    };
    if(variety > 2) { score[1] = true; }
    if(totalHives > 2) { score[2] = true; }
    if(flowerTotal > 15) { score[3] = true; }
    if(totalBrambles == 0) { score[4] = true; }
    
    return score;
}