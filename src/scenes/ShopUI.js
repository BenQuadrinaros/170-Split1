let menu = undefined;
let pointer;

let shopCosts = {};
let idImages = {
    "Daisy": ["flowerWhite3", .125],
    "Delphinium": ["flowerBlue3", .125],
    "Tulip": ["flowerRed3", .25],
    "Lavender": ["flowerPurple3", .125],
    "Sprinkler": ["sprinkler", .125],
    "Beehive": ["hive", .125],
    "Clipper": ["clipper", .75],
    "Watering Can": ["water1", .375],
    "Bench": ["Bench", .25],
    "yellow": ["honeyYellow", .5],
    "blue": ["honeyBlue", .5],
    "pink": ["honeyPink", .5],
    "purple": ["honeyPurple", .5]
};

class ShopUI extends Phaser.Scene {
    constructor() {
        super({
            key: "shopUIScene"
        });

        this.selectedItem = undefined;
        this.selectedTab = "Seeds";
        this.prevText = undefined;


    }

    init(data) {
        //See where you are returning from
        this.previousScene = data.previousScene;
    }

    preload() {
        console.log("in ShopUI Scene")
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        //Background Toad
        this.backgroundToad = this.add.image(config.width/2, config.height/10 + 21, 'toadLeckman').setScale(0.4).setDepth(100);

        uiScene = this;
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        let music = new BGMManager(this);
        //eventDispacher.add(this.heardEvent ,this);

        this.backpack = this.add.image(this.cameras.main.scrollX + config.width - 68, this.cameras.main.scrollY + config.height/5 - 36, 'PlayerIcon')
            .setInteractive().setAlpha(.5)
            .on('pointerover', () => {
                this.backpack.setAlpha(1);
            })
            .on('pointerout', () => {
                this.backpack.setAlpha(.5);
            })
            .on('pointerdown', () => {
                console.log("Previous scene key: " + this.previousScene);
                menu = undefined;
                this.scene.resume(this.previousScene);
                this.scene.stop("shopUIScene");
            });

        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: 'realize_my_passionregular',
            fontSize: "24px",
            color: "#ffffff",
            align: "center",
            stroke: "#000000",
            strokeThickness: 4,
            padding: {
                top: 5,
                bottom: 5
            },
        };

        this.add.text(this.backpack.x, this.backpack.y, "EXIT").setOrigin(.5, .5);
        this.textConfig.fontSize = "16px";

        //Tracker for Money and total Honey
        this.infoDisplay = new InfoDisplay(this, "infoBox", 0, "Shop");

        this.selectedTab = "Seeds";

        var db = createDataBase(5);


        var confirmBuy = [
            {
                name: 'Buy for ',
            },
            {
                name: 'Cancel',
            },
        ];

        var tabs = this.rexUI.add.tabs({
            x: 400,
            y: 300,

            panel: this.rexUI.add.gridTable({
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, SHOP_PRIMARY),

                table: {
                    width: 350,
                    height: 400,

                    cellWidth: 175,
                    cellHeight: 90,
                    columns: 2,
                    mask: {
                        padding: 2,
                    },
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, SHOP_DARK),
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
                        scale = .45
                    //console.log("item id " + item.id);
                    if (item.id in idImages) {
                        img = idImages[item.id][0];
                        scale = idImages[item.id][1];
                    }

                    return scene.rexUI.add.label({
                        width: width,
                        height: height,

                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, SHOP_DARK),
                        icon: scene.add.image(0, 0, img).setScale(scale, scale),
                        text: scene.add.text(0, 0, item.id+'\n'+"$"+item.cost, uiScene.textConfig),

                        space: {
                            icon: 10,
                            left: 15
                        }
                    });
                },
            }),

            leftButtons: [
                createButton(this, 2, 'Seeds'),
                createButton(this, 2, 'Items'),
                createButton(this, 2, 'Decorations'),
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
                            this._prevTypeButton.getElement('background').setFillStyle(SHOP_DARK)
                        }
                        button.getElement('background').setFillStyle(SHOP_PRIMARY);
                        this._prevTypeButton = button;
                        if (this._prevSortButton === undefined) {
                            return;
                        }

                        uiScene.selectedTab = button.text;
                        console.log("selected tab " + uiScene.selectedTab);
                        break;

                    case 'right':
                        // Highlight button
                        if (this._prevSortButton) {
                            this._prevSortButton.getElement('background').setFillStyle(SHOP_DARK)
                        }
                        button.getElement('background').setFillStyle(SHOP_PRIMARY);
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
                    .simplesort('id', {
                        desc: (this._prevSortButton.text === '-') // sort descending
                    })
                    .data();
                this.getElement('panel').setItems(items).scrollToTop();
            }, tabs);

        // Grid table
        tabs.getElement('panel')
            .on('cell.click', function (cellContainer, cellIndex) {
                //if (uiScene.previousScene === "shopScene"){
                    //return ;
                //}
                //create popup menu for confirmation
                let item = uiScene.selectedItem;
                let tab = uiScene.selectedTab.toLowerCase();
                let stock = shopInventory[uiScene.selectedTab][uiScene.selectedItem].amount;
                let cost = shopInventory[uiScene.selectedTab][uiScene.selectedItem].cost;
                let costText = "Buy for " + cost + "$ ?"

                confirmBuy[0] = {name: costText}
                console.log("Before buying item text is " + cellContainer.text)
                if (stock <= 0) {
                    console.log("Out of stock");
                    return;
                }
                if (menu === undefined) {
                    console.log("Selected item is " + uiScene.selectedItem + " in group " + tab +
                        " which has stock " + shopInventory[uiScene.selectedTab][uiScene.selectedItem].amount);
                    music.playSFX("shopSelect");
                    menu = createMenu(this, 600, 350, confirmBuy, function (button) {
                        if (button.text === costText) {
                            if (cost > playerVariables.money) {
                                console.log("Not enough money...");
                                music.playSFX("failtosell");
                                //eventDispatcher.dispatch("failedPurchase");
                            } else {
                                if (shopInventory[uiScene.selectedTab][item] === undefined) {
                                    return;
                                }
                                console.log("Added cell " + cellIndex + " which contains " + item +
                                    " to player inventory");
                                console.log(`before changing inv, ${playerVariables.inventory[tab][item]}`)
                                if(item == "Clipper") {
                                    playerVariables.inventory[tab][item] += 3 + Math.floor(currentDay / 4);
                                } else {
                                    playerVariables.inventory[tab][item] += 1;
                                }
                                inventoryTabsUpdated[tab.toString()] = true;
                                console.log(`after changing inv, ${playerVariables.inventory[tab][item]}`)
                                playerVariables.money -= cost;
                                let newStock = parseInt(stock) - 1;
                                playerInventoryUpdated = true;
                                music.playSFX("buyFlowers");
                                //eventDispatcher.dispatch("successfulPurchase");
                                shopInventory[uiScene.selectedTab][item].amount = newStock;
                            }
                        }
                        menu.collapse();
                        menu = undefined;
                    });
                } else if (!menu.isInTouching(pointer)) {
                    menu.collapse();
                    menu = undefined;
                }
            }, this)
            .on('cell.over', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, SHOP_LIGHT)
                    .setDepth(1);
                let item = cellContainer.text.split("\n")[0];
                uiScene.selectedItem = item;
                uiScene.prevText = cellContainer.text;
                let available = shopInventory[uiScene.selectedTab][uiScene.selectedItem].amount;
                if (available <= 0) {
                    cellContainer.text = "OUT OF \nSTOCK";
                } else {
                    cellContainer.text = "Stock:" + available;
                }
            }, this)
            .on('cell.out', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, SHOP_DARK)
                    .setDepth(0);
                cellContainer.text = uiScene.prevText;
            }, this);

        tabs.emitButtonClick('left', 0).emitButtonClick('right', 0);

    }

    update() {
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            console.log("escape");
            menu = undefined;
            this.scene.resume(this.previousScene);
            this.scene.stop("shopUIScene");
        }
        
        //Update infor tracker
        this.infoDisplay.update(this.backpack.x - 125, this.backpack.y, playerVariables.money, 
            playerVariables.inventory.honey["total"]);
    }
}

var createDataBase = function (count) {
    var TYPE = ['Seeds', 'Hives'];
    // Create the database
    var db = new loki();
    // Create a collection
    var items = db.addCollection('items');
    // Insert documents
    for (const [tab, inv] of Object.entries(shopInventory)) {
        for (const [item, info] of Object.entries(inv)) {
            console.log(`${item}: ${info}`);
            items.insert({
                type: tab,
                id: item,
                color: Random(0, 0xffffff),
                img: info.img,
                amt: info.amount,
                cost: info.cost
            });
            shopCosts[item] = info.cost;
        }

    }
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
        background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, radius, SHOP_DARK),
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
                background: scene.rexUI.add.roundRectangle(0, 0, 2, 2, 0, SHOP_PRIMARY),
                text: scene.add.text(0, 0, item.name, {
                    fontFamily: 'realize_my_passionregular',
                    fontSize: '20px'
                }),
                icon: scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, SHOP_DARK),
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