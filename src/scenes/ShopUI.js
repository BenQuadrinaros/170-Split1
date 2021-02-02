let shopS;
let menu = undefined;
let pointer ;
let shopInventory = {
    "Seeds": {
        "Green": {"amount": 2, "img": "bearBee", "cost":5},
        "Red":{"amount": 3, "img": "PlayerIcon", "cost": 20}
    },
    "Hives":{
        "Blue":{"amount": 3, "img": "bearBee","cost":55},
        "Yellow":{"amount": 0, "img": "player","cost":15}
    }
}
let shopCosts = {
};
class ShopUI extends Phaser.Scene {
    constructor() {
        super({
            key: "shopUIScene"
        });
        shopS = this;
        this.selectedItem = undefined;


    }

    preload(){
        console.log("in ShopUI Scene")
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);

        this.print = this.add.text(0, 0, "Money: " + playerVariables.money);
        this.print2 = this.add.text(0,20, "Green Flowers: " + playerVariables.inventory["Green"])


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
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                table: {
                    width: 250,
                    height: 400,

                    cellWidth: 120,
                    cellHeight: 60,
                    columns: 2,
                    mask: {
                        padding: 2,
                    },
                },

                slider: {
                    track: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_DARK),
                    thumb: this.rexUI.add.roundRectangle(0, 0, 0, 0, 13, COLOR_LIGHT),
                },

                // scroller: true,

                createCellContainerCallback: function (cell) {
                    var scene = cell.scene,
                        width = cell.width,
                        height = cell.height,
                        item = cell.item,
                        index = cell.index;
                    return scene.rexUI.add.label({
                        width: width,
                        height: height,

                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(2, COLOR_DARK),
                        icon: scene.add.image(0,0, item.img).setScale(.45,.45),
                        text: scene.add.text(0, 0, item.id + ":" + item.amt),

                        space: {
                            icon: 10,
                            left: 15
                        }
                    });
                },
            }),

            leftButtons: [
                createButton(this, 2, 'Seeds'),
                createButton(this, 2, 'Hives'),
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
                    .simplesort('id', {
                        desc: (this._prevSortButton.text === '-') // sort descending
                    })
                    .data();
                this.getElement('panel').setItems(items).scrollToTop();
            }, tabs);

        // Grid table
        tabs.getElement('panel')
            .on('cell.click', function (cellContainer, cellIndex) {
                //create popup menu for confirmation
                let item = cellContainer.text.split(/[ :]+/);
                let name = item[0];
                let stock = item[1];
                let cost = shopCosts[name];
                let costText = "Buy for " + cost + " ?"
                confirmBuy[0] = {name: costText}
                if (menu === undefined) {
                    menu = createMenu(this, 550, 350, confirmBuy, function (button) {
                        if (button.text === costText){

                            if (cost > playerVariables.money){

                            } else {
                                console.log("Added cell " + cellIndex + " which contains " + cellContainer.text +
                                    " to player inventory");
                                playerVariables.inventory[name]+=1;
                                console.log(playerVariables.inventory[name])
                                playerVariables.money-=cost;
                                let newStock = parseInt(stock)-1
                                cellContainer.text = name +":"+ newStock;
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
                    .setStrokeStyle(2, COLOR_LIGHT)
                    .setDepth(1);
            }, this)
            .on('cell.out', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(2, COLOR_DARK)
                    .setDepth(0);
            }, this);

        tabs.emitButtonClick('left', 0).emitButtonClick('right', 0);

    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyESCAPE)){
            console.log("escape")
            this.scene.start("shopScene");
        }
        this.print.text = "Money: " + playerVariables.money;
        this.print2.text =  "Green Flowers: " + playerVariables.inventory["Green"];
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
                type:tab,
                id:item,
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
        height:40,
        background: scene.rexUI.add.roundRectangle(0, 0, 50, 50, radius, COLOR_DARK),
        text: scene.add.text(0, 0, text, {
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
            console.log('popup.complete')
        })
        .on('scaledown.complete', function () {
            console.log('scaledown.complete')
        })

    return menu;
}