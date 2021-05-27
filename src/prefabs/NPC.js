class NPC extends Phaser.GameObjects.Sprite{
    constructor(scene, initx = 2 * game.config.width / 3, inity = game.config.height,
        texture = 'basicDogNPC', frame = 0, name = "Unnamed", personality = "easy",
        voiceLines = [["Hullo", "Good day"], ["Thanks", "Bye"]]){
        
        
        if(name === "Unnamed"){ //If a random npc was requested
            let idNum = Phaser.Math.Between(0, NPCTable.length -1);
            let generatedTexture = generateNPCSprite(idNum);
            super(scene, initx, inity, generatedTexture, frame);
            this.setPosition(initx, inity + 10);
            this.generateNPCCharacteristics(idNum);
        }
        else{ //If a specific npc was requested
            super(scene, initx, inity, texture, frame, hop);
            this.setPosition(initx, inity);
            this.name = name;
            this.personality = personality;
            this.voiceLines = voiceLines;
            this.hopHeight = hop;
        }

        //Flip the cats
        if(this.name === "Catlico" || this.name === "Cougar"){
            this.flipX = true;
        }

        this.setOrigin(1, 1);
        //Add to the scene
        scene.add.existing(this);
        this.scene = scene;

    }

    generateNPCValues(){

    }

    approach(animDelay = 0){
        console.log("NPC has been asked to approach",this.hopHeight,"hop height");
        this.scene.time.delayedCall(animDelay, () => {
            this.scene.tweens.add({
                targets: this,
                x: this.x + config.width/5 + 30,
                ease: 'Sine.easeOut',
                duration: 1500,
                delay: 0,
                repeat: 0
            });
            this.scene.tweens.add({
                targets: this,
                y: this.y - this.hopHeight,
                ease: 'Power2',
                yoyo: true,
                duration: 250,
                delay: 0,
                repeat: 2
            });
        });
    }

    leave(){
        console.log("NPC has been asked to leave");
        this.scene.tweens.add({
            targets: this,
            x: this.x + 1.5*config.width/5,
            ease: 'Sine.easeOut',
            duration: 1500,
            delay: 0,
            repeat: 0
        });
        this.scene.tweens.add({
            targets: this,
            y: this.y - this.hopHeight,
            ease: 'Power2',
            yoyo: true,
            duration: 250,
            delay: 0,
            repeat: 2
        });
    }

    generateNPCCharacteristics(idNum){
        
        this.name = NPCTable[idNum].name;
        this.personality = NPCTable[idNum].personality;
        this.voiceLines = NPCTable[idNum].voiceLines;
        this.type = npcTypes[this.personality];
        this.hopHeight = NPCTable[idNum].hopHeight;

        return NPCTable[idNum].texture;
    }
}

let NPCTable = [
    {
        name: "Bagel",
        texture: "basicDogNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 50
    },
    {
        name: "Dolly Mation",
        texture: "dalmationDogNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 35
    },
    {
        name: "Dobby",
        texture: "dobermanDogNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 50
    },
    {
        name: "Huskgrid",
        texture: "huskyDogNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 35
    },
    {
        name: "Spot",
        texture: "spotDogNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 35
    },
    {
        name: "Bunderson",
        texture: "basicBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 65
    },
    {
        name: "Bonabell",
        texture: "pinkBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 75
    },
    {
        name: "Jacob",
        texture: "brownBunNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 65
    },
    {
        name: "Robert",
        texture: "bluegreyBunNPC",
        personality: "A",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 65
    },
    {
        name: "Ra Bitcoin",
        texture: "albinoBunNPC",
        personality: "A",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 80
    },
    {
        name: "Catlico",
        texture: "whiteCatNPC",
        personality: "C",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 25
    },
    {
        name: "Cougar",
        texture: "orangeCatNPC",
        personality: "B",
        voiceLines: [["Hullo", "Good day"], ["Thanks", "Bye"]],
        hopHeight: 35
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