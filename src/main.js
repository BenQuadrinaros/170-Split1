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

//reserve some keyboard variables
let keyP, keyO, keyESCAPE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE, keyY, keyN;

//colors for ui elements
const COLOR_PRIMARY = 0x4e342e;
const COLOR_LIGHT = 0x7b5e57;
const COLOR_DARK = 0x260e04;
const Random = Phaser.Math.Between;

let upgrades = { "bike": 0, "bee": 0, "tools": 0 };
//Starting garden state
let flow0 = new Flower("yellow", 1, 3, "Cosmo");
let flow1 = new Flower("yellow", 2, 2, "Cosmo");
let flow2 = new Flower("yellow", 0, 3, "Cosmo");
let gardenGrid = [ // 10 x 8 grid for garden generating
    //Starting placements for intial garden
    [null,   flow0,   null,   null,   null,   null,   null,   null,   null,   null],
    [flow1, "hive",  flow2,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
    [null,    null,   null,   null,   null,   null,   null,   null,   null,   null]
];

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
            "total": 10,
            "yellow": 10,
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