//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, Settings, Map, Hub],
    volume: .7
};

let game = new Phaser.Game(config);

//reserve some keyboard variables
let keyP, keyESCAPE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE;

let upgrades = {"bike": 0, "bee": 0, "tools": 0}

