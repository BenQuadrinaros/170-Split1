class BGMManager {
    constructor(scene){
        this.scene = scene;
        this.currentSong = null;
        this.volume = 1;
    }

    setVolume(newValue){
        this.volume = newValue;
    }

    stop(){
        this.musicPlayer.stop();
    }

    //plays a song immediately
    playSong(fileName, loop){
        var config = {
            mute: false,
            volume: this.volume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: loop,
            delay: 0
        }
        this.currentSong = fileName;
        this.musicPlayer = this.scene.sound.add(fileName);
        this.musicPlayer.play(config);
        //this.scene.sound.play(fileName, config);
    }

    //plays a song when the current one finishes, if the song hasn't changed
    queueSong(fileName, loop){
        var currPlayingSong = this.currentSong;
        this.musicPlayer.on('complete', () => {
            console.log("Song has completed")
            //If the song has already changed, ignore the queued song
            if(currPlayingSong != this.currentSong){
                console.log("Song has changed, returning");
                return;
            }
            //Otherwise, play it
            var config = {
                mute: false,
                volume: this.volume,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: loop,
                delay: 0
            }
            this.currentSong = fileName;
            //this.scene.sound.play(fileName, config);
            this.musicPlayer = this.scene.sound.add(fileName);
            this.musicPlayer.play(config);
        });
    }

    //Transitions the current song to a new song
    transitionSong(fileName, loop){
        //if it wants to transition from the current song to the current song, don't
        if(fileName == this.currentSong){
            return;
        }

        //update the current song to the one that will be played
        this.currentSong = fileName;

        console.log("Tween about to be created");
        //Create tween
        this.fadeOut = this.scene.tweens.add({
            targets: this.musicPlayer,
            volume: 0,
            ease: 'Sine.easeInOut',
            duration: 2500,
            delay: 0,
            repeat: 0
        });

        //Once it has faded out, fade back in
        this.fadeOut.on('complete', () => {
            console.log("Tween completed");
            var config = {
                mute: false,
                volume: 0,
                rate: 1,
                detune: 0,
                seek: 0,
                loop: loop,
                delay: 0
            }
            this.musicPlayer = this.scene.sound.add(fileName);
            this.musicPlayer.play(config);
            this.fadeOut = this.scene.tweens.add({
                targets: this.musicPlayer,
                volume: this.volume,
                ease: 'Sine.easeInOut',
                duration: 3500,
                delay: 0,
                repeat: 0
            });
        });

    }
    
}
