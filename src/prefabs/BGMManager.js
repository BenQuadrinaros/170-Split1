class BGMManager {
    constructor(scene){
        this.scene = scene;
        this.currentSong = null;
        this.currentSFX = null;
        this.volume = config.volume;
        this.sfxVolume = sfxVolume;
    }

    setVolume(newValue){
        this.volume = newValue;
        this.musicPlayer.volume = this.volume;
        console.log("volume changed to " + this.volume);
    }

    setSFXVolume(newValue){
        this.sfxVolume = newValue;
        this.sfxPlayer.volume = this.sfxVolume;
        console.log("volume changed to " + this.sfxVolume);
    }

    stop(){
        this.musicPlayer.stop();
    }

    stopSFX(){
        this.sfxPlayer.stop();
    }

    //plays a song immediately
    playSong(fileName, loop, startTime = 0){
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
        if(startTime > 0){
            this.musicPlayer.setSeek(startTime);
        }
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
            duration: 1500,
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

    resumeBetweenScenes(){
        if(this.musicPlayer && this.musicPlayer.isPlaying){
            return;
        }
        else{
            this.playSong(currPlayingSongKey, true, currMusicPlaybackTime);
            this.setVolume(config.volume);
        }
    }

    pauseSong(){
        this.musicPlayer.pause();
    }

    pauseBetweenScenes(){
        currPlayingSongKey = this.currentSong;
        currMusicPlaybackTime = this.getPlaybackTime();
        this.stop();
    }

    resumeSong(playbackTime = 0){
        if(playbackTime > 0){
            this.musicPlayer.setSeek(playbackTime);
        }
        this.musicPlayer.resume();
    }

    getPlaybackTime(){
        return this.musicPlayer.seek;
    }

    playSFX(fileName){
        var config = {
            mute: false,
            volume: this.sfxVolume,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: 0,
            delay: 0
        }
        this.currentSFX = fileName;
        this.sfxPlayer = this.scene.sound.add(fileName);
        this.sfxPlayer.play(config);
    }
    
}
