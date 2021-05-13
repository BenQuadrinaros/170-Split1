class InfoDisplay extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, sceneName) {
        super(scene, 0, 0, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.depth = 200;

        let textConfig;
        if(sceneName == "Shop") {
            textConfig = {
                fontFamily: font,
                fontSize: "20.5px",
                color: "#ffffff",
                align: "center",
                stroke: "#000000",
                strokeThickness: 4,
                padding: {
                    top: 5,
                    bottom: 5
                },
            };
            this.setScale(0.575, 0.575);
        } else {
            textConfig = {
                fontFamily: font,
                fontSize: "18px",
                color: "#ffffff",
                align: "center",
                stroke: "#000000",
                strokeThickness: 4,
                padding: {
                    top: 5,
                    bottom: 5
                },
            };
            this.setScale(0.5, 0.5);
        }

        this.moneyText = scene.add.text(0, 0, "X", textConfig);
        this.moneyText.depth = 201;
        this.honeyText = scene.add.text(0, 0, "O", textConfig);
        this.honeyText.depth = 201;
    }

    update(spotX, spotY, money, honey){
        this.x = spotX;
        this.y = spotY;

        this.moneyText.x = this.x - 5;
        this.moneyText.y = this.y - 37;

        this.honeyText.x = this.x - 5;
        this.honeyText.y = this.y + 2;

        this.moneyText.text = Math.floor(money) + "." + (Math.floor(money*10)%10) + (Math.floor(money*100)%10);
        this.honeyText.text = honey + " jars";
    }
}