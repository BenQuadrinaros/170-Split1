class Song {
    constructor(song, timeSigniture, bpm) {
        this.song = song;
        this.timeSigniture = timeSigniture;
        this.bpm = bpm;
        this.output = [];

        let beatsPerSecond = this.bpm / 60;
        let time = 0;

        for (let bar = 0; bar < this.song.length; bar++) {
            for (let beat = 0; beat < this.song[bar].length; beat++) {
                if (Array.isArray( this.song[bar][beat]) ){
                    for (let eighthNote = 0; eighthNote < this.song[bar][beat].length; eighthNote++){
                        if (this.song[bar][beat][eighthNote] === 1){
                            this.output.push(time)
                        }
                        time += beatsPerSecond/2
                    }
                } else {
                    if (this.song[bar][beat] === 1) {
                        this.output.push(time)
                    }
                    time += beatsPerSecond
                }
            }

        }
    }
}