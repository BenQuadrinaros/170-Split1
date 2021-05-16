class InfoDisplay extends Phaser.GameObjects.Sprite {

    constructor(scene, texture, frame, sceneName) {
        super(scene, 0, 0, texture, frame);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.scene = scene;
        this.depth = 0;

        let textConfig = {
            fontFamily: font,
            fontSize: "23px",
            color: "#000",
            align: "right",
            stroke: "#000000",
            strokeThickness: 1,
            padding: {
                top: 5,
                bottom: 5
            },
        };
        this.setScale(0.575, 0.575);
        if(sceneName == "Market") { this.depth = 201; }
        if(sceneName == "Hub") {
            this.setScale(0.5, 0.5);
            textConfig.fontSize = "20px";
            this.depth = 200;
        }

        this.moneyText = scene.add.text(0, 0, "X", textConfig);
        this.moneyText.depth = 201;
        this.moneyText.setOrigin(1, 0);
        this.honeyText = scene.add.text(0, 0, "O", textConfig);
        this.honeyText.depth = 201;
        this.honeyText.setOrigin(1, 0);
    }

    update(spotX, spotY, money, honey){
        this.x = spotX;
        this.y = spotY;

        this.moneyText.x = this.x + 40;
        this.moneyText.y = this.y - 40;

        this.honeyText.x = this.x + 40;
        this.honeyText.y = this.y;

        this.moneyText.text = Math.floor(money) + "." + (Math.floor(money*10)%10) + (Math.floor(money*100)%10);
        this.honeyText.text = honey;
    }
}