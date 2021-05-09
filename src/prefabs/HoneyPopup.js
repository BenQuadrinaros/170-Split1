class HoneyPopup extends Phaser.GameObjects.Sprite {

    constructor(scene, initX, initY, amount, color) {
        super(scene, initX, initY + 15, "simpleBox");
        scene.add.existing(this);
        this.setScale(.95,.75);
        this.depth = 200;
        this.scene = scene;

        let textConfig = {
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

        this.amountText = scene.add.text(initX - 25, initY, amount+"x", textConfig);
        this.amountText.depth = 200;
        this.honeyJar = scene.add.image(initX + 25, initY, "honey"+color);
        this.honeyJar.setScale(.5,.5);
        this.honeyJar.depth = 200;

        this.visibility(false);
    }

    setAmount(amount) {
        this.amountText.text = amount+"x";
    }

    changePosition(initX, initY) {
        this.x = initX;
        this.y = initY;
        this.amountText.x = initX - 30;
        this.amountText.y = initY - 10;
        this.honeyJar.x = initX + 15;
        this.honeyJar.y = initY;
    }

    visibility(bool) {
        this.setVisible(bool);
        this.amountText.setVisible(bool);
        this.honeyJar.setVisible(bool);
    }
}