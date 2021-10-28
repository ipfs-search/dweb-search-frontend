import { Howl } from 'howler';

/**
 * abstract from howl player, to make properties observable for Vue
 */
class AudioPlayer {
  loading = false;

  loaded = false;

  playing = false;

  duration;

  time;

  #howl;

  #interval;

  set sound(values) {
    console.debug('registering new howl player for ', values);
    this.unregister();// unregister any hooks
    clearInterval(this.#interval);
    this.loading = true;
    this.#howl = new Howl({
      html5: true,
      preload: 'metadata',
      autoplay: true,
      ...values,
    });
    this.#howl.on('load', () => {
      this.loading = false;
      this.loaded = true;
      this.#interval = setInterval(() => {
        this.time = this.#howl.seek();
      }, 100);
      this.duration = this.#howl.duration();
    });
    this.#howl.on('pause', () => {
      this.playing = false;
    });
    this.#howl.on('stop', () => {
      this.playing = false;
    });
    this.#howl.on('play', () => {
      this.playing = true;
    });
  }

  get sound() {
    return this.#howl;
  }

  play() {
    if (this.#howl && this.loading === false) {
      this.#howl.play();
    }
  }

  pause() {
    if (this.#howl && this.loading === false) {
      this.#howl.pause();
    }
  }

  stop() {
    if (this.#howl && this.loading === false) {
      this.#howl.stop();
    }
  }

  seek(progress) {
    if (this.#howl && this.loading === false) {
      this.#howl.seek(progress);
    }
  }

  unregister() {
    if (this.#howl) {
      this.#howl.off();
      this.#howl.unload();
      this.loading = false;
      this.loaded = false;
      this.duration = null;
    }
  }

  on(...args) {
    if (this.#howl) {
      this.#howl.on(...args);
    }
  }

  close() {
    this.unregister();
    clearInterval(this.#interval);
  }
}
export const audioPlayer = new AudioPlayer();
export default { audioPlayer };
