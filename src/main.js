//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 960,
    height: 540,
    scene: [Boot, Hub, Garden, Map, Play, Menu, Settings, Talking, Pause, OldRhythm],
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
let keyP, keyO, keyESCAPE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE;

let upgrades = {"bike": 0, "bee": 0, "tools": 0};
let plants = [3, -1, 3, -1]; //-1 is unbought, 0 is dead, 0.5 and 1 are poor, 1.5 and 2 are good, 2.5 and 3 are great
let cursors = null;
let dialogueSection = 0;
//let isPaused = false;