class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, initx = 2 * game.config.width / 3, inity = 4 * game.config.height / 7,
        texture = 'basicDogNPC', frame = 0, name = "Unnamed", personality = "easy",
        voiceLines = [["Hullo", "Good day"], ["Thanks", "Bye"]]){
        
        
        if(name === "Unnamed"){ //If a random npc was requested
            let idNum = Math.floor(11 * Math.random());
            let generatedTexture = generateNPCSprite(idNum);
            let variation = Phaser.Math.Between(25, 75);
            super(scene, initx, inity + variation, generatedTexture, frame);
            this.setPosition(initx, inity + variation);
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
        this.scene.tweens.add({
            targets: this,
            x: this.x + config.width/5,
            ease: 'Sine.easeOut',
            duration: 1500,
            delay: 0,
            repeat: 0
        });
        this.scene.tweens.add({
            targets: this,
            y: 4 * game.config.height / 7,
            ease: 'Power2',
            yoyo: true,
            duration: 250,
            delay: 0,
            repeat: 2
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
            repeat: 0,
            onComplete:function (){
                console.log("done leaving")
            }
        });
    }

    generateNPCCharacteristics(idNum){
        
        this.name = NPCTable[idNum].name;
        this.personality = NPCTable[idNum].personality;
        this.voiceLines = NPCTable[idNum].voiceLines;
        this.type = npcTypes[this.personality];

        return NPCTable[idNum].texture;
    }
}

let NPCTable = [
    {
        name: "Bagel",
        texture: "basicDogNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Dolly Mation",
        texture: "dalmationDogNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Dobby",
        texture: "dobermanDogNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Huskgrid",
        texture: "huskyDogNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Spot",
        texture: "spotDogNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Bunderson",
        texture: "basicBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Harriet",
        texture: "secondBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Bonabell",
        texture: "pinkBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Jacob",
        texture: "brownBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Robert",
        texture: "bluegreyBunNPC",
        personality: "A",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    },
    {
        name: "Ra Bitcoin",
        texture: "albinoBunNPC",
        personality: "A",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]]
    }
];
//Npc types to determine range for each npc
let npcTypes = {
    A:{
        yellow:[2, 3],
        purple:[3, 4],
        blue:[3.5, 4.5],
        pink:[4, 5]
    },
    B: {
        yellow: [2.5, 3.5],
        purple:[3.5, 4.5],
        blue:[4, 5],
        pink:[4.5, 5.5]
    },
    C: {
        yellow: [3,4],
        purple:[4, 5],
        blue:[4.5, 5.5],
        pink:[5, 6]
    }
}
function generateNPCSprite(idNum){
    return NPCTable[idNum].texture;
}