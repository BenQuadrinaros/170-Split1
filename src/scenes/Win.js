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

        this.add.text(config.width / 2, config.height / 2, "You win!\nEnjoy your bear-tirement.\n" +
            "Press Down to return\nto the main menu.", this.textConfig).setOrigin(.5, .5);
            
        keyDOWN = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.DOWN);
    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyDOWN)) {
            this.scene.start("menuScene");
            //reset the game state
            //Starting garden state
            let flow0 = new Flower(2, 3, "Cosmos");
            let flow1 = new Flower(2, 3, "Cosmos");
            let hive = new Hive(5, 2);
            //more flowers for testing purposes
            gardenGrid = [ // 11 x 11 grid for garden generating
                //Starting placements for intial garden
                [null,    null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
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
                        if(rand + Math.sqrt((row - 3) / 15) > .85) {
                            gardenGrid[row][col] = new Bramble(col, row);
                        }
                    }
                    temp.item = gardenGrid[row][col];
                    gardenGrid[row][col] = temp;
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
                        "pink": 0,
                        "Leftover Yellow": 0,
                        "Leftover Blue": 0,
                        "Leftover Purple": 0,
                        "Leftover Pink": 0
                    },
                    items: {
                        "Beehive": 0,
                        "Sprinkler": 0,
                        "Clipper": 3,
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