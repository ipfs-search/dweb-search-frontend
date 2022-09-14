import { getFileExtension } from "@/helpers/fileHelper";
import { Howl, Howler, HowlErrorCallback } from "howler";
import getResourceURL from "@/helpers/resourceURL";
import { IFile } from "../interfaces/IFile";

const errorCode = {
  "1": "User aborted request",
  "2": "Network error",
  "3": "Decoding error",
  "4": "Resource unsuitable/unavailable",
};

export class Audio {
  constructor(file: IFile, options = {}) {
    this.file = file;
    const fileExtension = getFileExtension(file);
    if (!Howler.codecs(fileExtension)) {
      this.reportError(`Unsupported/undetected file type: '${fileExtension}'`);
      return;
    }

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
        console.log("loaded audio:", this.file);
        this.loading = false;
        this.loaded = true;
        this.duration = this.player.duration() || 0;
      },
      onplay: () => {
        this.playing = true;
        this.interval = setInterval(() => {
          this.time = this.player.seek();
        }, 100);
      },
      onpause: () => {
        this.playing = false;
        clearInterval(this.interval);
      },
      onstop: () => {
        this.playing = false;
        clearInterval(this.interval);
      },
      onend: () => {
        this.playing = false;
        clearInterval(this.interval);
      },
      ...options,
    });

    this.initialized = true;
  }

  private interval: number | undefined;
  initialized = false;

  error = "";
  loaded = false;
  loading = false;
  playing = false;
  duration = 0;
  time: number | undefined;

  file: IFile;
  player: Howl = {} as Howl;

  get progress() {
    if (this.duration && this.time) {
      return (this.time / this.duration) * 100;
    } else {
      return 0;
    }
  }

  set progress(percentage) {
    if (this.loaded) {
      this.player.seek((percentage * this.duration) / 100);
    }
  }

  private reportError(message: string) {
    console.error(message);
    this.error = message;
  }

  /**
   * returns promise which resolves when the file has loaded
   */
  load() {
    return new Promise((resolve, reject) => {
      if (!this.initialized) return reject("Error: Audio player has not been initialized");
      if (this.loaded) return resolve(undefined);
      this.player.once("loaderror", () => {
        reject();
      });
      this.player.once("load", () => resolve(undefined));
      if (!this.loading) {
        this.loading = true;
        this.player.load();
      }
    });
  }

  /**
   * returns promise which resolves once the audiofile reaches the end
   */
  play() {
    return new Promise((resolve, reject) => {
      if (!this.initialized) return reject("Error: Audio player has not been initialized");
      this.player.once("playerror", (source, message) => {
        this.reportError(`Playback Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
        reject();
      });
      this.player.once("end", () => {
        resolve(undefined);
      });
      this.player.play();
    });
  }

  pause() {
    if (!this.initialized) return;
    this.player.pause();
  }

  cleanUp() {
    clearInterval(this.interval);
    this.player.off();
    this.player.unload();
    this.error = "";
    this.loaded = false;
    this.loading = false;
    this.playing = false;
    this.duration = 0;
    this.time = undefined;
  }
}
