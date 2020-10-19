//Ben Rowland

let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [Menu, Play, Settings]
};

//hi
let testSong = [[0,0,1,0],
                [1,[0,1],0,0]];

let newSong = new Song(testSong,[4,4],60);
let game = new Phaser.Game(config);

//reserve some keyboard variables
let keyP, keyESCAPE, keyLEFT, keyRIGHT;