let selectedTab = "seeds"
let lineWidth = 2;

class BackPackUI extends Phaser.Scene {
    constructor() {
        super({
            key: "backpackUI"
        });

    }

    preload() {
        this.load.scenePlugin({
            key: 'rexuiplugin',
            url: 'https://raw.githubusercontent.com/rexrainbow/phaser3-rex-notes/master/dist/rexuiplugin.min.js',
            sceneKey: 'rexUI'
        });
    }

    create() {

        uiScene = this;
        keyESCAPE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC);
        //Text config without a background, which blends better with the background
        this.textConfig = {
            fontFamily: "Courier",
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
        this.backpack = this.add.image(config.width - config.width / 6, config.height / 6, 'PlayerIcon')
            .setInteractive().setAlpha(.5)
            .on('pointerover', () => {
                this.backpack.setAlpha(1)
            })
            .on('pointerout', () => {
                this.backpack.setAlpha(.5)
            })
            .on('pointerdown', () => {
                this.scene.stop('backpackUI')
                this.scene.resume(previousScene.scene.key)
            });
        this.add.text(this.backpack.x, this.backpack.y, "EXIT").setOrigin(.5, .5)
        var db = createDataBaseInventory(5);


        var tabs = this.rexUI.add.tabs({
            x: 400,
            y: 300,

            panel: this.rexUI.add.gridTable({
                background: this.rexUI.add.roundRectangle(0, 0, 20, 10, 10, COLOR_PRIMARY),

                table: {
                    width: 475,
                    height: 300,

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
                        index = cell.index;
                    return scene.rexUI.add.label({
                        width: width,
                        height: height,
                        background: scene.rexUI.add.roundRectangle(0, 0, 20, 20, 0).setStrokeStyle(lineWidth, COLOR_DARK),
                        icon: scene.add.image(0, 0, 'PlayerIcon').setScale(.45, .45),
                        text: scene.add.text(0, 0, item.id),

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
                let item = uiScene.selectedItem;
                //console.log(`item ${item} in tab ${uiScene.selectedTab}`)
                let amount = playerVariables.inventory[uiScene.selectedTab][item];
                //console.log(`amount of item ${item} is ${amount}`)
                if (amount > 0) {
                    if (menu === undefined) {
                        menu = createMenu(this, 675, 350, itemOptions, function (button) {

                            if (button.text === "Hold") {
                                //console.log(`holding a flower ${cellContainer.text}`)
                                heldItem = new Flower(2, 2, cellContainer.text);
                                playerVariables.inventory[uiScene.selectedTab][item] -= 1;

                            }
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
                            uiScene.scene.resume("hubScene");
                            uiScene.scene.stop("backpackUI")

                        });
                    } else if (!menu.isInTouching(pointer)) {
                        menu.collapse();
                        menu = undefined;
                    }
                }
            }, this)
            .on('cell.over', function (cellContainer, cellIndex) {
                cellContainer.getElement('background')
                    .setStrokeStyle(lineWidth, COLOR_LIGHT)
                    .setDepth(1);

                uiScene.selectedItem = cellContainer.text;
                //console.log(cellContainer.text);
                let amt = playerVariables.inventory[uiScene.selectedTab][uiScene.selectedItem];
                cellContainer.text = uiScene.selectedItem + ":" + amt;

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
        if (Phaser.Input.Keyboard.JustDown(keyESCAPE)) {
            //console.log("escape")
            this.scene.resume(previousScene.scene.key);
            this.scene.stop("backpackUI")
        }

    }
}

var createDataBaseInventory = function (count) {
    var TYPE = ['Seeds', 'Items', 'Honey', 'Flowers'];
    // Create the database
    var db = new loki();
    // Create a collection
    var items = db.addCollection('items');
    // Insert documents

    for (const [tab, inv] of Object.entries(playerVariables.inventory)) {
        for (const [item, info] of Object.entries(inv)) {
            //console.log(`item ${item}: info ${info} tab ${tab} inv ${inv}`);
            items.insert({
                id: item,
                type: tab
            });
            shopCosts[item] = info.cost;
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
            //console.log('popup.complete')
        })
        .on('scaledown.complete', function () {
            //console.log('scaledown.complete')
        })

    return menu;
}