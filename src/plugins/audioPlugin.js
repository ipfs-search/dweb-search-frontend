import { Howl, Howler } from 'howler';
import { getFileExtension } from '@/helpers/fileHelper';

/**
 * abstract from howl player, to make properties observable for Vue
 */
class AudioPlayer {
  loading = false;

  loaded = false;

  playing = false;

  duration = 0;

  time = 0;

  sourceFile;

  autoPlay = true;

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
      onend: () => { this.playing = false; },
      onstop: () => { this.playing = false; },
      onpause: () => { this.playing = false; },
      onplay: () => { this.playing = true; },
      onload: () => {
        this.loading = false;
        this.loaded = true;
        this.#interval = setInterval(() => {
          this.time = this.#howl.seek();
        }, 100);
        this.duration = this.#howl.duration();
      },
    });
  }

  get sound() {
    return this.#howl;
  }

  play() {
    if (this.#howl && this.loaded) {
      this.#howl.play();
    }
  }

  pause() {
    if (this.#howl && this.loaded) {
      this.#howl.pause();
    }
  }

  stop() {
    if (this.#howl && this.loaded) {
      this.#howl.stop();
    }
  }

  seek(progress) {
    if (this.#howl && this.loaded) {
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
      this.time = 0;
      this.duration = 0;
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
