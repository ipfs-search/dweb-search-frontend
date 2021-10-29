import { Howl, Howler } from 'howler';
import { getFileExtension } from '@/helpers/fileHelper';

/**
 * abstract from howl player, to make properties observable for Vue
 */
class AudioPlayer {
  autoPlay = true;

  loading = false;

  loaded = false;

  playing = false;

  duration;

  time;

  sourceFile;

  #howl;

  #interval;

  set sound(file) {
    console.debug('registering new howl player for ', file);
    if (!file || !file.hash) {
      throw Error('No proper file specified');
    }
    const fileExtension = getFileExtension(file);
    if (!Howler.codecs(fileExtension)) {
      throw Error('Unsupported/undetected file type');
    }

    this.unregister();// unregister any hooks
    clearInterval(this.#interval);
    this.loading = true;
    this.sourceFile = file;

    this.#howl = new Howl({
      src: [`https://gateway.ipfs.io/ipfs/${file.hash}`],
      format: [fileExtension],
      html5: true,
      preload: 'metadata',
      autoplay: this.autoPlay,
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
    return this.#howl;
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
      this.playing = false;
      this.loading = false;
      this.loaded = false;
      this.duration = null;
      this.sourceFile = null;
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
