let selectedTab = "seeds"
let lineWidth = 2;
let music;

class BackPackUI extends Phaser.Scene {
    constructor() {
        super({
            key: "backpackUI"
        });

    }

    init(data){
        this.previousScene = data.previousScene;
    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: './lib/rexUI.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        music = new BGMManager(this);

        uiScene = this;
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        keyB = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.B);
        keyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E);
        keyI = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.I);
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: 'realize_my_passionregular',
            fontSize: "16px",
            color: "#ffffff",
            align: "center",
            stroke: "#ffffff",
            strokeThickness: 0.5,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        //different things the player can do with objekt
        itemOptions = [
            {
                name: 'Hold',
            },
            {
                name: 'Cancel',
            },
        ];
        this.selectedItem = undefined;
        this.selectedTab = "seeds";
        //create backpack icon

        //Create exclamation marks
        this.updatedMarks = {
            'honey': null,
            'items': null,
            'flowers': null,
            'seeds': null,
            'decorations': null,
            'outfits': null,
        };
        this.createExclamationMarks();
        
        this.backpack = this.add.image(this.cameras.main.scrollX + config.width - 68,
            this.cameras.main.scrollY + config.height/5 - 36, 'openBackpack')
            .setInteractive().setAlpha(.9)
            .on('pointerover', () => {
                this.backpack.setAlpha(1);
            })
            .on('pointerout', () => {
                this.backpack.setAlpha(.9);
            })
            .on('pointerdown', () => {
                console.log("Previous scene key: " + this.previousScene);
                music.playSFX("backpackOpen");
                this.scene.resume(this.previousScene);
                inventoryTabsUpdated["seeds"] = false;
                this.scene.stop();
            });
        this.textConfig.fontSize = "24px";
        this.add.text(this.backpack.x, this.backpack.y, "EXIT", this.textConfig).setOrigin(.5, .5);
        this.textConfig.fontSize = "16px";
        var db = createDataBaseInventory(5);


        var tabs = this.rexUI.add.tabs({
            x: 400,
            y: 300,

            panel: this.rexUI.add.gridTable({
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                table: {
                    width: 475,
                    height: 350,

                    cellWidth: 230,
                    cellHeight: 150,
                    columns: 2,
                    mask: {
                        padding: 2,
                    },
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: uiScene.add.image(0, 0, "PlayerIcon").setScale(.5, .5),
                },

                // scroller: true,

                createCellContainerCallback: function (cell) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index,
                        img = "PlayerIcon",
                        scale = .45;
                    //console.log("item id " + item.id);
                    if(item.id in idImages) {
                        img = idImages[item.id][0];
                        scale = idImages[item.id][1];
                    }

                    return scene.rexUI.add.label({
                        width: width,
                        height: height,
                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(lineWidth, COLOR_DARK),
                        icon: scene.add.image(0, 0, img).setScale(scale, scale),
                        text: scene.add.text(0, 0, item.id + ": " + item.amt, uiScene.textConfig),

                        space: {
                            icon: 10,
                            left: 15
                        }
                    });
                },
            }),

            leftButtons: [
                createButton(this, 2, 'seeds'),
                createButton(this, 2, 'items'),
                createButton(this, 2, 'honey'),
                createButton(this, 2, 'flowers'),
                createButton(this, 2, 'decorations'),
                createButton(this, 2, 'outfits'),
            ],

            rightButtons: [
                createButton(this, 0, '+'),
                createButton(this, 0, '-'),
            ],

            space: {
                leftButtonsOffset: 20,
                rightButtonsOffset: 30,

                leftButton: 1,
            },
        })
            .layout()
        //.drawBounds(this.add.graphics(), 0xff0000);

        tabs
            .on('button.click', function (button, groupName, index) {

                switch (groupName) {
                    case 'left':
                        // Highlight button
                        if (this._prevTypeButton) {
                            this._prevTypeButton.getElement('background').setFillStyle(COLOR_DARK)
                        }
                        button.getElement('background').setFillStyle(COLOR_PRIMARY);
                        this._prevTypeButton = button;
                        if (this._prevSortButton === undefined) {
                            return;
                        }
                        //console.log("selected tab " + button.text);
                        uiScene.selectedTab = button.text;
                        console.log(uiScene.updatedMarks);
                        //Remove exclamation mark
                        uiScene.updatedMarks[uiScene.selectedTab.toString()].setAlpha(0);
                        inventoryTabsUpdated[uiScene.selectedTab.toString()] = false;
                        break;

                    case 'right':
                        // Highlight button
                        if (this._prevSortButton) {
                            this._prevSortButton.getElement('background').setFillStyle(COLOR_DARK)
                        }
                        button.getElement('background').setFillStyle(COLOR_PRIMARY);
                        this._prevSortButton = button;
                        if (this._prevTypeButton === undefined) {
                            return;
                        }
                        break;
                }

                // Load items into grid table
                var items = db
                    .chain()
                    .find({
                        type: this._prevTypeButton.text
                    })
                    .simplesort('amt', {
                        desc: (this._prevSortButton.text === '-') // sort descending
                    })
                    .data();
                this.getElement('panel').setItems(items).scrollToTop();
            }, tabs);

        // Grid table
        tabs.getElement('panel')
            .on('cell.click', function (cellContainer, cellIndex) {
                //If the user tries to hold an item in the shop it crashes, removing functionality for now.
                //TODO: Fix crash ?
                if (uiScene.previousScene === "shopScene"){
                    return ;
                }
                let item = uiScene.selectedItem.substring(0, uiScene.selectedItem.indexOf(":"));
                //console.log(`item ${item} in tab ${uiScene.selectedTab}`)
                let amount = playerVariables.inventory[uiScene.selectedTab][item];
                //console.log(`amount of item ${item} is ${amount}`)
                if (amount > 0) {
                    
                    /*if (menu === undefined) {
                        menu = createMenu(this, 675, 350, itemOptions, function (button) {

                            if (button.text === "Hold") {*/
                                //console.log(`holding a flower ${cellContainer.text}`)
                                if(uiScene.selectedTab == "seeds") {
                                    heldType = "seeds";
                                    plantingSeeds = true;
                                    heldItem = new Flower(0, 5, item.substring(0,item.length-6));
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if(uiScene.selectedTab == "flowers") {
                                    heldType = "flowers";
                                    heldItem = new Flower(5, 5, item);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if(item == "Beehive") {
                                    heldType = "items";
                                    heldItem = new Hive(-1, -1);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if(item == "Sprinkler") {
                                    heldType = "items";
                                    heldItem = new Sprinkler(-1, -1);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if(item == "Clipper") {
                                    heldType = "items";
                                    heldItem = new Clipper();
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if (item == "Watering Can") {
                                    heldType = "items";
                                    heldItem = new WateringCan();
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if(item == "Camera") {
                                    heldType = "items";
                                    heldItem = new Camera();
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if (item == "Bench") {
                                    heldType = "decorations";
                                    heldItem = new DecorativeWide("Bench", true);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if (item == "Bush") {
                                    heldType = "decorations";
                                    heldItem = new Decorative("Bush", true);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if (item == "Hedge") {
                                    heldType = "decorations";
                                    heldItem = new Decorative("Hedge", true);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if (item == "Fence") {
                                    heldType = "decorations";
                                    heldItem = new Decorative("Fence", true);
                                    playerVariables.inventory[uiScene.selectedTab][item] -= 1;
                                } else if (item == "Back\nNo Trees") {
                                    playerVariables.hubBackgroundTrees = false;
                                } else if (item == "Back\nTrees") {
                                    playerVariables.hubBackgroundTrees = true;
                                } else if (item == "Back\nWooden\nFence") {
                                    playerVariables.hubIronFence = false;
                                } else if (item == "Back\nIron\nFence") {
                                    playerVariables.hubIronFence = true;
                                } else if (item == "Brick\nPath") {
                                    playerVariables.hubBrickPath = true;
                                } else if (item == "Dirt Path") {
                                    playerVariables.hubBrickPath = false;
                                } else if(uiScene.selectedTab == "outfits"){
                                    if(item === "Regular"){
                                        playerVariables.currentOutfit = "";
                                    }
                                    else{
                                        playerVariables.currentOutfit = item;
                                    }
                                    console.log("Curr outfit", playerVariables.currentOutfit);
                                } else {
                                    console.log("Holding invalid object");
                                }
                                music.playSFX("backpackOpen");
                                uiScene.scene.resume(uiScene.previousScene);
                                inventoryTabsUpdated["seeds"] = false;
                                uiScene.scene.stop();

                            /*}
                            menu.collapse();
                            menu = undefined;
                            itemOptions = [
                                {
                                    name: 'Plant',
                                },
                                {
                                    name: 'Cancel',
                                },
                            ];
                            music.playSFX("backpackOpen");
                            uiScene.scene.resume(this.previousScene);
                            uiScene.scene.stop("backpackUI");

                        });
                    } else if (!menu.isInTouching(pointer)) {
                        menu.collapse();
                        menu = undefined;
                    }*/
                }
            }, this)
            .on('cell.over', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(lineWidth, COLOR_LIGHT)
                    .setDepth(1);

                uiScene.selectedItem = cellContainer.text;
                //console.log(cellContainer.text);
                let amt = playerVariables.inventory[uiScene.selectedTab][uiScene.selectedItem];
                cellContainer.text = uiScene.selectedItem;

            }, this)
            .on('cell.out', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(lineWidth, COLOR_DARK)
                    .setDepth(0);
                cellContainer.text = uiScene.selectedItem;
            }, this);

        tabs.emitButtonClick('left', 0).emitButtonClick('right', 0);


    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE) || Phaser.Input.Keyboard.JustDown(keyB) || Phaser.Input.Keyboard.JustDown(keyE) || Phaser.Input.Keyboard.JustDown(keyI)) {
            //console.log("escape")
            music.playSFX("backpackOpen");
            this.scene.resume(this.previousScene);
            inventoryTabsUpdated["seeds"] = false;
            this.scene.stop();
        }

    }

    createExclamationMarks(){
        this.updatedMarks['seeds'] = this.add.image(60, 165, "!").setDepth(80).setAngle(350).setAlpha(0);
        if(inventoryTabsUpdated['seeds']){ this.updatedMarks['seeds'].setAlpha(1); }
        this.updatedMarks['items'] = this.add.image(60, 208, "!").setDepth(80).setAngle(350).setAlpha(0);
        if(inventoryTabsUpdated['items']){ this.updatedMarks['items'].setAlpha(1); }
        this.updatedMarks['honey'] = this.add.image(60, 251, "!").setDepth(80).setAngle(350).setAlpha(0);
        if(inventoryTabsUpdated['honey']){ this.updatedMarks['honey'].setAlpha(1); }
        this.updatedMarks['flowers'] = this.add.image(60, 294, "!").setDepth(80).setAngle(350).setAlpha(0);
        if(inventoryTabsUpdated['flowers']){ this.updatedMarks['flowers'].setAlpha(1); }
        this.updatedMarks['decorations'] = this.add.image(60, 337, "!").setDepth(80).setAngle(350).setAlpha(0);
        if(inventoryTabsUpdated['decorations']){ this.updatedMarks['decorations'].setAlpha(1); }
        this.updatedMarks['outfits'] = this.add.image(60, 380, "!").setDepth(80).setAngle(350).setAlpha(0);
        if(inventoryTabsUpdated['outfits']){ this.updatedMarks['outfits'].setAlpha(1); }
    }
}

var createDataBaseInventory = function (count) {
    var TYPE = ['Seeds', 'Items', 'Honey', 'Flowers'];
    // Create the database
    var db = new loki();
    // Create a collection
    var items = db.addCollection('items');
    // Insert documents

    for (var [tab, inv] of Object.entries(playerVariables.inventory)) {
        for (var [item, info] of Object.entries(inv)) {
            //console.log(`${info}`);
            if (info > 0) {
                if (item !== "total") {
                    items.insert({
                        id: item,
                        type: tab,
                        amt:info
                    });
                }
            }
        }

    }
    //console.log(items)
    return items;
};

var createButton = function (scene, direction, text) {
    var radius;
    switch (direction) {
        case 0: // Right
            radius = {
                tr: 20,
                br: 20
            }
            break;
        case 2: // Left
            radius = {
                tl: 20,
                bl: 20
            }
            break;
    }
    return scene.rexUI.add.label({
        width: 50,
        height: 40,
        background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, radius, COLOR_DARK),
        text: scene.add.text(0, 0, text, {
            fontFamily: 'realize_my_passionregular',
            fontSize: '18pt'
        }),
        space: {
            left: 10
        }
    });
}

var createMenu = function (scene, x, y, items, onClick) {
    var exapndOrientation = 'y';
    var easeOrientation = 'y';

    var menu = scene.rexUI.add.menu({
        x: x,
        y: y,
        orientation: exapndOrientation,
        // subMenuSide: 'right',

        items: items,
        createButtonCallback: function (item, i) {
            return scene.rexUI.add.label({
                background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, COLOR_PRIMARY),
                text: scene.add.text(0, 0, item.name, {
                    fontFamily: 'realize_my_passionregular',
                    fontSize: '20px'
                }),
                icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, COLOR_DARK),
                space: {
                    left: 10,
                    right: 10,
                    top: 10,
                    bottom: 10,
                    icon: 10
                }
            })
        },

        // easeIn: 500,
        easeIn: {
            duration: 500,
            orientation: easeOrientation
        },

        // easeOut: 100,
        easeOut: {
            duration: 100,
            orientation: easeOrientation
        }

        // expandEvent: 'button.over'
    });

    menu
        .on('button.over', function (button) {
            button.getElement('background').setStrokeStyle(1, 0xffffff);
        })
        .on('button.out', function (button) {
            button.getElement('background').setStrokeStyle();
        })
        .on('button.click', function (button) {
            onClick(button);
        })
        .on('popup.complete', function (subMenu) {
            //console.log('popup.complete')
        })
        .on('scaledown.complete', function () {
            //console.log('scaledown.complete')
        })

    return menu;
}