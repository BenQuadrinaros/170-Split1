//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, Settings, Map, Hub]
};

let game = new Phaser.Game(config);

//reserve some keyboard variables


let keyP, keyESCAPE, keyLEFT, keyRIGHT, keyDOWN, keyUP, keySPACE;

