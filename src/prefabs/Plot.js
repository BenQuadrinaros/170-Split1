class Plot {
    constructor(gridx, gridy) {
        //Positions
        this.gridx = gridx;
        this.gridy = gridy;

        //States
        this.dug = false;
        this.water = false;
        this.mulchAmt = 0;
        this.item = null;

        //Images
        this.dirt = null;
        this.mulch = null;
        this.spot = null;
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
            this.dirt.setOrigin(.5, .5).setScale(.25, .25);
            scene.add.existing(this.dirt);
            this.dirt.depth = this.dirt.y/10 - 20;
        }
        /*if(this.mulchAmt > 0) {
            this.mulch = scene.add.image(spotx, spoty, "mulch");
            this.mulch.setOrigin(.5, .5).setScale(.35, .35);
            scene.add.existing(this.mulch);
            this.mulch.depth = this.mulch.y/10 - 18;
        }*/
        if(this.item) {
            console.log("putting",this.item,"at",spotx," ",spoty);
            this.spot = this.item.addToScene(scene, spotx, spoty);
        } 
    }

    destroyImages() {
        if(this.dirt) {
            this.dirt.destroy();
        }
        if(this.mulch) {
            this.mulch.destroy();
        }
        if(this.spot) {
            this.spot.destroy();
        }
    }
}