
//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Boot, Hub, Garden, Map, Market, Play, Menu, Settings, Talking, Pause, OldRhythm, ShopUI , Shop],
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

let upgrades = {"bike": 0, "bee": 0, "tools": 0};
//Starting garden state
let flow0 = new Flower("yellow", 2, 1);
let flow1 = new Flower("yellow", 4, .5);
let flow2 = new Flower("yellow", 1, 1);
let gardenGrid = [ // 8 x 6 grid for garden generating
    [null,       null,       null,      flow0,        null,       null,       null,     "hive"],
    [null,       null,       null,       null,        null,       null,       null,       null],
    [null,       null,     "hive",       null,        null,       null,       null,       null],
    [null,       null,       null,       null,        null,      flow1,       null,       null],
    [null,       null,      flow2,       null,        null,       null,       null,       null],
    ["hive",     null,       null,       null,        null,       null,     "hive",       null]
];
let cursors = null;
let dialogueSection = 0;
//let isPaused = false;

//Player variables so we dont have to pass them around forever
let playerVariables = {
    money: 10.00,
    honey: 10,
    actions: 3,
    inventory: {

            "Green":0,
            "Red":0,
            "Blue":0,
            "Yellow":0

    }
}