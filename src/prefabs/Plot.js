class Plot {
    constructor(gridx, gridy) {
        //Positions
        this.gridx = gridx;
        this.gridy = gridy;

        //States
        this.dug = false;
        this.water = false;
        this.item = null;

        //Images
        this.dirt = null;
        this.spot = null;
        this.shadow = null;

        //Interaction Markers
        this.honeyIndicator = null;
        this.exclamation = null;
    }

    renderPlot(scene, coords) {
        this.destroyImages();
        let img = "";
        let spotx = coords[0];
        let spoty = coords[1];
        if(this.dug) {
            img = "dirtDry";
            if(this.water) { img = "dirtWet"}
            this.dirt = scene.add.image(spotx, spoty, img);
            this.dirt.setOrigin(.5, .5).setScale(.45, .45);
            scene.add.existing(this.dirt);
            this.dirt.depth = this.dirt.y/10 - 20;
        }
        if(this.item) {
            //console.log("putting",this.item,"at",spotx," ",spoty);
            if(this.item instanceof Flower) {
                // If Flower, give swayDelay proportional to position in garden
                this.spot = this.item.addToScene(scene, spotx, spoty, 2*spotx + spoty/10);
            } else if (this.item instanceof Decorative && (this.item.type == "Bush" || this.item.type == "Hedge")){
                this.spot = this.item.addToScene(scene, spotx, spoty+12);
            } else if (this.item instanceof Decorative && this.item.type == "Fence"){
                this.spot = this.item.addToScene(scene, spotx, spoty-6);
            } else {
                this.spot = this.item.addToScene(scene, spotx, spoty);
            }
            if(this.item instanceof Hive && this.item.hasStock() && !this.honeyIndicator) {
                let hexColor = 0xF9D55C;
                let stock = this.item.stock;
                let exclamationKey = "!";
                if(stock['blue']>stock['yellow']+stock['pink']+stock['purple']) { hexColor = 0x4E6FD3; exclamationKey = "!blue"; }
                if(stock['purple']>stock['yellow']+stock['pink']+stock['blue']) { hexColor = 0xB58FC2; exclamationKey = "!purple"; }
                if(stock['pink']>stock['yellow']+stock['blue']+stock['purple']) { hexColor = 0xDC715D; exclamationKey = "!pink"; }
                this.honeyIndicator = scene.add.ellipse(spotx, spoty + 40, config.width / 10,
                    config.height / 10, hexColor);
                this.honeyIndicator.depth = this.spot.depth - 1;
                this.exclamation = scene.add.image(spotx + 25, spoty - 45, exclamationKey);
                this.exclamation.depth = this.spot.depth + 1;
            } else if(this.item instanceof Bramble || (this.item instanceof Decorative && this.item.type == "Bush")) {
                this.shadow = scene.add.image(spotx, spoty + 39, "bearShadow");
                this.shadow.setScale(.5,.5).setDepth(this.spot.depth-1).setAlpha(.9);
            }
        } 
        
    }

    setTransparency(alpha) {
        if(this.spot) {
            this.spot.setAlpha(alpha);
        }
    }

    destroyImages() {
        if(this.dirt) {
            this.dirt.destroy();
            this.dirt = null;
        }
        if(this.spot) {
            this.spot.destroy();
            this.spot = null;
        }
        if(this.honeyIndicator) {
            this.honeyIndicator.destroy();
            this.honeyIndicator = null;
            this.exclamation.destroy();
            this.exclamation = null;
        }
        if(this.shadow) {
            this.shadow.destroy();
            this.shadow = null;
        }
    }
}

function objToPlot(obj){
    let plot = new Plot();
    plot.gridx = obj.gridx;
    plot.gridy = obj.gridy;

    //States
    plot.dug = obj.dug;
    plot.water = obj.water;
    plot.mulchAmt = obj.mulchAmt;

    //plot.item
    if(obj.item){
        //console.log("obj.item.type: ", obj.item.type);
        switch(obj.item.type){
            case "Daisy":
            case "Delphinium":
            case "Lavender":
            case "Tulip":
                plot.item = new Flower(obj.item.age, obj.item.water, obj.item.type);
                break;
            case "Beehive":
                plot.item = new Hive(plot.gridx, plot.gridy);
                plot.item.stock = {
                    "yellow": obj.item.stock["yellow"],
                    "blue": obj.item.stock["blue"],
                    "purple": obj.item.stock["purple"],
                    "pink": obj.item.stock["pink"]
                };
                break;
            case "Bramble":
                plot.item = new Bramble(plot.gridx, plot.gridy);
                break;
            case "Sprinkler":
                plot.item = new Sprinkler(plot.gridx, plot.gridy);
                break;
            case "Watering Can":
                plot.item = new WateringCan();
                break;
            case "Weed":
                plot.item = new Weed(plot.gridx, plot.gridy);
                break;
            case "Bench":
                plot.item = new DecorativeWide("Bench", obj.item.isLeft);
                break;
            case "Bush":
                plot.item = new Decorative("Bush");
                break;
            case "Hedge":
                plot.item = new Decorative("Hedge");
                break;
            case "Fence":
                plot.item = new Decorative("Fence");
                break;
            default:
                plot.item = null;
                break;
        }
        //plot.spot = this.item.addToScene(scene, spotx, spoty);
    }
    else{
        plot.item = obj.item;
    }

    //Images
    plot.dirt = null;
    plot.mulch = null;
    //plot.spot = null;
    plot.honeyIndicator = null;

    return plot;
}