
//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Boot, Hub, Garden, Map, Market, Play, Menu, Settings, Talking, Pause, OldRhythm, Shop],
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

let upgrades = {"bike": 0, "bee": 0, "tools": 0};
let gardenGrid = [
    [null,         null,        null, ["flower", "yellow", 2], null,        null,         null,         null,         null,     ["hive"]],
    [null,         null,         null,         null,          null,         null,         null,         null,         null,         null],
    [null,         null,     ["hive"],         null,          null,         null,         null,         null,         null,         null],
    [null,         null,         null,         null,          null,         null,        null, ["flower", "yellow", 4], null,       null],
    [null,       null, ["flower", "yellow", 1], null,         null,         null,         null,         null,         null,         null],
    [null,         null,         null,         null,          null,         null,         null,         null,     ["hive"],         null],
    [null,         null,         null,         null,          null,         null,         null,         null,         null,         null],
    [["hive"],     null,         null,         null,         null,          null,         null,         null,         null,         null]
];
let cursors = null;
let dialogueSection = 0;
//let isPaused = false;

//Player variables so we dont have to pass them around forever
let playerVariables = {
    money: 10.00,
    honey: 10,
    actions: 3,
    inventory: []
}