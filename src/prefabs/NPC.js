class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, initx = 2 * game.config.width / 3, inity = 4 * game.config.height / 7,
        texture = 'basicDogNPC', frame = 0, name = "Unnamed", personality = "easy",
        voiceLines = [["Hullo", "Good day"], ["Thanks", "Bye"]]){
        
        
        if(name === "Unnamed"){ //If a random npc was requested
            let idNum = Math.floor(11 * Math.random());
            let generatedTexture = generateNPCSprite(idNum);
            super(scene, initx, inity, generatedTexture, frame);
            this.setPosition(initx, inity);
            this.generateNPCCharacteristics(idNum);
        }
        else{ //If a specific npc was requested
            super(scene, initx, inity, texture, frame);
            this.setPosition(initx, inity);
            this.name = name;
            this.personality = personality;
            this.voiceLines = voiceLines;
        }

        //Add to the scene
        scene.add.existing(this);
        this.scene = scene;

    }

    generateNPCValues(){

    }

    approach(){
        console.log("NPC has been asked to approach");
        this.setScale(0, 0);
        this.approachTween = this.scene.tweens.add({
            targets: this,
            depth: 90,
            scale: 1,
            ease: 'Sine.easeOut',
            duration: 1500,
            delay: 0,
            repeat: 0
        });
    }

    leave(){
        console.log("NPC has been asked to leave");
        this.leaveTween = this.scene.tweens.add({
            targets: this,
            depth: 1,
            scale: 0,
            ease: 'Sine.easeOut',
            duration: 1500,
            delay: 0,
            repeat: 0
        });
    }

    generateNPCCharacteristics(idNum){
        
        this.name = NPCTable[idNum].name;
        this.personality = NPCTable[idNum].personality;
        this.voiceLines = NPCTable[idNum].voiceLines;

        let npcType = npcTypes.types[Math.floor(npcTypes.amt * Math.random())];
        this.barterChance = npcType.barterChance;
        this.priceRange = npcType.priceRange;

        return NPCTable[idNum].texture;
    }
}

let NPCTable = [
    {
        name: "Bagel",
        texture: "basicDogNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Dolly Mation",
        texture: "dalmationDogNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Dobby",
        texture: "dobermanDogNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Huskgrid",
        texture: "huskyDogNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Spot",
        texture: "spotDogNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Bunderson",
        texture: "basicBunNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Harriet",
        texture: "secondBunNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Bonabell",
        texture: "pinkBunNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Jacob",
        texture: "brownBunNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Robert",
        texture: "bluegreyBunNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Ra Bitcoin",
        texture: "albinoBunNPC",
        personality: "easy",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    }
];

let npcTypes = {
    amt: 2,
    types:[
        {
            type:"cheap",
            priceRange:[-2,1],
            barterChance:60
    },
        {
            type:"agreeable",
            priceRange:[-1.5, 1],
            barterChance:20
    },
    ]
}

function generateNPCSprite(idNum){
    return NPCTable[idNum].texture;
}