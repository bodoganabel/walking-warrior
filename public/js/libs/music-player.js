
class MusicPlayer {
    constructor() {
        this.tracks = {};
        this.nowPlaying = null;
    }

    addAudio(key, fileName) {
        this.tracks[key] = new Audio(fileName);
    }

    playAudio(key) {
        if (key == this.nowPlaying) {
            return;
        }

        if (this.nowPlaying !== null) {
            this.tracks[this.nowPlaying].pause();
        }

        this.tracks[key].play();

        this.nowPlaying = key;
    }
}