import { audioPlayer } from '@/plugins/howler.js';

export default {
  data() {
    return {
      error: null,
      player: audioPlayer,
    };
  },
  methods: {
    loadSoundFile(soundFile) {
      try {
        audioPlayer.sound = soundFile;
        audioPlayer.on('loaderror', (source, message) => this.soundError(message));
        audioPlayer.on('playerror', (source, message) => this.soundError(message));
      } catch (e) {
        this.soundError(e);
      }
    },
    soundError(error) {
      console.error('Sound error:', error, this.sourceFile);
      this.$data.error = error;
    },
    play() {
      audioPlayer.play();
    },
    pause() {
      audioPlayer.pause();
    },
    stop() {
      audioPlayer.stop();
    },
    closePlayer() {
      audioPlayer.close();
    },
    /**
     * strictly speaking this is a helper/static function, not a component method.
     * @param secs
     * @returns {string}
     */
    formatTime(secs) {
      if (secs === undefined) return '-';
      const minutes = Math.floor(secs / 60) || 0;
      const seconds = Math.floor(secs - minutes * 60) || 0;

      return `${minutes} : ${(seconds < 10 ? '0' : '')}${seconds}`;
    },
  },
  computed: {
    playerActive() {
      return audioPlayer.sourceFile && audioPlayer.sound;
    },
    timer() {
      return this.formatTime(audioPlayer.time);
    },
    duration() {
      return this.formatTime(audioPlayer.duration);
    },
    progress: {
      get() {
        return (audioPlayer.time / audioPlayer.duration) * 100;
      },
      set(percentage) {
        if (audioPlayer.loaded) {
          audioPlayer.seek((percentage * audioPlayer.duration) / 100);
        }
      },
    },
    loading: () => audioPlayer.loading,
    playing: () => audioPlayer.playing,
    loaded: () => audioPlayer.loaded,
    sourceFile: () => audioPlayer.sourceFile,
  },
  beforeDestroy() {
    audioPlayer.close();
  },
};
