import { getFileExtension } from "@/helpers/fileHelper";
import { Howl, Howler } from "howler";
import getResourceURL from "@/helpers/resourceURL";
import { IFile } from "../interfaces/IFile";
import store from "@/store";

const errorCode = {
  "1": "User aborted request",
  "2": "Network error",
  "3": "Decoding error",
  "4": "Resource unsuitable/unavailable",
};

export interface IAudio {
  hash: string;
  error: string;
  loaded: boolean;
  loading: boolean;
  playing: boolean;
  duration: number;
  time: number | undefined;
  interval?: number | undefined;
  player?: Howl;
}

export class Audio implements IAudio {
  constructor(file: IFile, options = {}) {
    const fileExtension = getFileExtension(file);
    if (!Howler.codecs(fileExtension)) {
      this.reportError(`Unsupported/undetected file type: '${fileExtension}'`);
      return;
    }
    this.hash = file.hash;
    this.loading = true;
    this.player = new Howl({
      html5: true,
      preload: "metadata",
      autoplay: false,
      src: [getResourceURL(file.hash)],
      format: [fileExtension],
      onloaderror: (source, message) => {
        this.reportError(`Load Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
      },
      onload: () => {
        this.loading = false;
        this.loaded = true;
        this.duration = this.player?.duration() || 0;
        this.commit();
      },
      onplay: () => {
        this.playing = true;
        this.commit();
        this.interval = setInterval(() => {
          this.time = this.player?.seek();
          this.commit();
        }, 100);
      },
      onpause: () => {
        this.playing = false;
        clearInterval(this.interval);
        this.commit();
      },
      onstop: () => {
        this.playing = false;
        clearInterval(this.interval);
        this.commit();
      },
      onend: () => {
        this.playing = false;
        clearInterval(this.interval);
        this.commit();
      },
      ...options,
    });
  }

  interval: number | undefined;

  hash = "";
  error = "";
  loaded = false;
  loading = false;
  playing = false;
  duration = 0;
  time: number | undefined;

  player;

  get progress() {
    if (this.duration && this.time) {
      return (this.time / this.duration) * 100;
    } else {
      return 0;
    }
  }

  set progress(percentage) {
    if (this.loaded) {
      this.player?.seek((percentage * this.duration) / 100);
    }
  }

  reportError(message: string) {
    this.error = message;
    this.loading = false;
    console.error("Audio Error:", message);
    this.commit();
  }

  /**
   * returns promise which resolves when the file has loaded
   */
  load() {
    return new Promise((resolve, reject) => {
      if (!this.player) return reject("Error: Audio player has not been initialized");
      if (this.loaded) return resolve(undefined);
      this.player?.once("loaderror", () => {
        reject();
      });
      this.player?.once("load", () => resolve(undefined));
      if (!this.loading) {
        this.loading = true;
        this.player?.load();
        this.commit();
      }
    });
  }

  /**
   * returns promise which resolves once the audiofile reaches the end
   */
  play() {
    return new Promise((resolve, reject) => {
      if (!this.player) return reject("Error: Audio player has not been initialized");
      this.player?.once("playerror", (source, message) => {
        this.reportError(`Playback Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
        reject();
      });
      this.player?.once("end", () => {
        resolve(undefined);
      });
      this.player?.play();
    });
  }

  pause() {
    if (!this.player) return;
    this.player?.pause();
  }

  cleanUp() {
    this.interval && clearInterval(this.interval);
    this.player?.off();
    this.player?.unload();
    this.error = "";
    this.loaded = false;
    this.loading = false;
    this.playing = false;
    this.duration = 0;
    this.time = undefined;
    this.commit();
  }

  commit() {
    const { hash, error, loaded, loading, playing, duration, time } = this;
    const payload = { hash, error, loaded, loading, playing, duration, time };
    store.commit("playlist/setAudioState", payload);
  }
}
