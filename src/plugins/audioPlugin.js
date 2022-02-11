import { Howl, Howler } from 'howler';
import { getFileExtension } from '@/helpers/fileHelper';
import MidiPlayer from 'midi-player-js';
import Soundfont from 'soundfont-player';

let midiPlayer;
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
      const patchBay = [];
      const trackNames = [];
      const instrumentList = [
        'ocarina',
        'electric_piano_1',
        'bright_acoustic_piano',
        'marimba',
        'electric_guitar_clean',
        'lead_6_voice',
        'pan_flute',
        'electric_guitar_jazz',
        'choir_aahs',
        'cello',
        'woodblock',
        'synth_drum',
      ];
      Promise.all(
        [
          fetch(`https://gateway.ipfs.io/ipfs/${file.hash}`),
          ...instrumentList.map((instrument) => Soundfont.instrument(audioContext, instrument)),
        ],
      )
        .then(([response, ...instruments]) => {
          response.arrayBuffer()
            .then((buffer) => {
              midiPlayer?.stop();
              midiPlayer = new MidiPlayer.Player((event) => {
                // console.log(event, patchBay);
                if (event.name === 'Sequence/Track Name') {
                  trackNames[event.track] = event.string?.toLowerCase();
                } else if (event.name === 'Note on' && event.velocity > 0) {
                  if (!patchBay[event.track]) {
                    // eslint-disable-next-line no-nested-ternary
                    patchBay[event.track] = trackNames[event.track]?.includes('drum')
                      ? instrumentList.length - 1
                      : trackNames[event.track]?.includes('percussion')
                        ? instrumentList.length - 2
                        : Math.floor(Math.random() * (instrumentList.length - 2));
                  }
                  // if (!patchBay.includes(event.track)) patchBay.push(event.track);
                  instruments[patchBay[event.track]]?.play(
                    event.noteName, audioContext.currentTime, { gain: event.velocity / 100 },
                  );
                } else if (event.name === 'Note off'
                || (event.name === 'Note on' && event.velocity === 0)) {
                  instruments[patchBay[event.track]]?.stop();
                }
              });
              midiPlayer.loadArrayBuffer(buffer);
              midiPlayer.play();
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
