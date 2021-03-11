class Win extends Phaser.Scene {
    constructor() {
        super("winScene");
    }

    create() {
        this.textConfig = {
            fontFamily: font,
            fontSize: "14px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        let text = this.add.text(config.width / 2, config.height / 2, "You win!\nEnjoy your bear-tirement.\n" +
            "Press Down to return\nto the main menu.", this.textConfig).setOrigin(.5, .5);
            
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
            //reset the game state
            let flow0 = new Flower(2, 3, "Cosmos");
            let flow1 = new Flower(2, 3, "Cosmos");
            let hive = new Hive(2, 5);
            let sprink = new Sprinkler(3, 5);
            //more flowers for testing purposes
            let gardenGrid = [ // 10 x 8 grid for garden generating
                //Starting placements for intial garden
                [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
                [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
                [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
                [null,    null,   null,   null,   null,   null,   null,   null,   null,   null],
                [null,    null,   null,  flow1,   null,   null,   null,   null,   null,   null],
                [null,    null,   hive, sprink,   null,   null,   null,   null,   null,   null],
                [null,   flow0,   null,   null,   null,   null,   null,   null,   null,   null],
                [null,    null,   null,   null,   null,   null,   null,   null,   null,   null]
            ];
            let mulch = {};
            for(row = 0; row < gardenGrid.length; row++) {
                for(col = 0; col < gardenGrid[0].length; col++) {
                    mulch[[row, col]] = 0;
                }
            }
            let wateredTiles = {};
            for(row = 0; row < gardenGrid.length; row++) {
                for(col = 0; col < gardenGrid[0].length; col++) {
                    wateredTiles[[row, col]] = false;
                }
            }

            //reset the player inventory
            playerVariables = {
                money: 10.00,
                //actions: 4,
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
                        "Cosmos": 2,
                        "Bluebonnet": 0,
                        "Lavender": 0,
                        "Tulip": 0,
                        "Orchid": 0
                    }
                }
            }
        }
    }
}