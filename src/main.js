//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Boot, Hub, Garden, Map, Market, Play, Menu, Settings, Talking, Pause, OldRhythm,  Shop, ShopUI, BackPackUI],
    volume: .7,
    physics: {
        default: 'arcade',
        arcade: {
            debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    }
};

let game = new Phaser.Game(config);
let previousScene = null;

//reserve some keyboard variables
let keyP, keyO, keyESCAPE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE, keyY, keyN,keyT;

//colors for ui elements
let uiScene; // global variable for current active ui scene
const COLOR_PRIMARY = 0x808ADE;
const COLOR_LIGHT = 0x684ADE;
const COLOR_DARK = 0x80DECB;
const Random = Phaser.Math.Between;

let upgrades = { "bike": 0, "bee": 0, "tools": 0 };
//Starting garden state
let flow0 = new Flower(2, 3, "Cosmo");
let flow1 = new Flower(2, 3, "Cosmo");
let hive = new Hive(2, 5);
//more flowers for testing purposes
let flow2 = new Flower(0, 3, "Cosmo");
let flow3 = new Flower(1, 3, "Cosmo");
let flow4 = new Flower(2, 2, "Cosmo");
let flow5 = new Flower(2, 1, "Cosmo");
let gardenGrid = [ // 10 x 8 grid for garden generating
    //Starting placements for intial garden
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,  flow2,   flow3,  flow4,  flow5,  null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   flow1,  null,   null,   null,   null,   null,   null],
    [null,    null,   hive,   null,   null,   null,   null,   null,   null,   null],
    [null,    flow0,  null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null]
];
let mulch = {};
for(row = 0; row < gardenGrid.length; row++) {
    for(col = 0; col < gardenGrid[0].length; col++) {
        mulch[[row, col]] = 0;
    }
}

let cursors = null;
let dialogueSection = 0;
//let isPaused = false;
let heldItem = undefined;
let vars = {}

//Player variables so we dont have to pass them around forever
let playerVariables = {
    money: 10.00,
    actions: 4,
    inventory: {
        honey: {
            "total": 8,
            "yellow": 8,
            "blue": 0,
            "purple": 0,
            "pink": 0
        },
        items: {
            "Beehive": 0,
            "Sprinkler": 0,
            "Mulch": 0
        },
        flowers: {
            "Cosmo": 0,
            "Blue Bonnet": 0,
            "Lavender": 0,
            "Tulip": 0,
            "Orchid": 0
        },
        seeds: {
            "Cosmo": 2,
            "Blue Bonnet": 1,
            "Lavender": 1,
            "Tulip": 1,
            "Orchid": 0
        }
    }
}
let shopInventory = {
    "Seeds": {
        "Cosmo": {"amount": 2, "img": "bearBee", "cost":2},
        "Lavender":{"amount": 3, "img": "PlayerIcon", "cost": 3},
        "Orchid":{"amount": 3, "img": "PlayerIcon", "cost": 3},
        "Blue Bonnet":{"amount": 3, "img": "PlayerIcon", "cost": 4},
        "Tulip":{"amount": 3, "img": "PlayerIcon", "cost": 4}
    },
    "Items":{
        "Sprinkler":{"amount": 2, "img": "bearBee","cost":15},
        "Beehive":{"amount": 2, "img": "PlayerIcon","cost":12},
        "Fertilizer":{"amount": 5, "img": "PlayerIcon", "cost": 4}
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
