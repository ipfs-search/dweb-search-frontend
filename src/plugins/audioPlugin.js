import { Howl, Howler } from 'howler';
import { getFileExtension } from '@/helpers/fileHelper';
import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';

/**
 * abstract from howl player, to make properties observable for Vue.
 * N.b. to make these properties observable, they must have public setters.
 * This can be spoofed, but it gets a bit hacky.
 */
class AudioPlayer {
  loading = false;

  loaded = false;

  playing = false;

  duration = 0;

  time = 0;

  sourceFile;

  #howl;

  #interval;

  /**
   * load a sound file from ipfs into the Howl audio player and attach necessary hooks.
   *
   * @param file: required object {hash, ...}
   * @param options: optional extra options to pass to howl player or overrides.
   */
  load(file, options) {
    console.debug('registering new howl player for ', file);
    if (!file || !file.hash) {
      throw Error('No proper file specified');
    }
    const fileExtension = getFileExtension(file);

    if (fileExtension === 'mid') {
      console.log('midi player starting');
      const audioContext = new AudioContext();
      const patchbay = [];
      Promise.all(
        [
          'ocarina',
          'bright_acoustic_piano',
          'marimba',
          'electric_guitar_muted',
          'steel_drums',
          'tubular_bells',
        ]
          .map((instrument) => Soundfont.instrument(audioContext, instrument)),
      )
        .then((instruments) => {
          fetch(`https://gateway.ipfs.io/ipfs/${file.hash}`)
            .then((response) => response.arrayBuffer())
            .then((buffer) => {
              const player = new MidiPlayer.Player((event) => {
                console.log(event);
                if (event.name === 'Note on' && event.velocity > 0) {
                  if (!patchbay.includes(event.track)) patchbay.push(event.track);
                  instruments[patchbay.indexOf(event.track)]?.play(
                    event.noteName, audioContext.currentTime, { gain: event.velocity / 100 },
                  );
                } else if (event.name === 'Note off'
                  || (event.name === 'Note on' && event.velocity === 0)) {
                  instruments[patchbay.indexOf(event.track)]?.stop();
                }
              });
              player.loadArrayBuffer(buffer);
              player.play();
            });
        });
    }

    if (!Howler.codecs(fileExtension)) {
      throw Error(`Unsupported/undetected file type ${fileExtension}`);
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
      autoplay: true,
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
      ...options,
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

  /**
   * destructor method
   */
  close() {
    console.debug('closing the audio player');
    this.unregister();
    clearInterval(this.#interval);
  }
}
export const audioPlayer = new AudioPlayer();
export default { audioPlayer };
