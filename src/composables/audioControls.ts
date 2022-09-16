import { ref } from "vue";
import { IFile } from "../interfaces/IFile";

import store from "@/store";
import { Howl, Howler } from "howler";
import { getFileExtension } from "@/helpers/fileHelper";
import getResourceURL from "@/helpers/resourceURL";

const errorCode = {
  "1": "User aborted request",
  "2": "Network error",
  "3": "Decoding error",
  "4": "Resource unsuitable/unavailable",
};

export interface IAudio {
  file?: IFile;
  error: string;
  loaded: boolean;
  loading: boolean;
  playing: boolean;
  duration: number;
  time: number | undefined;
  player?: Howl;
  reportError: (message: string) => void;
  load: (file?: IFile, options?: object) => Promise<unknown>;
  play: (file?: IFile, options?: object) => Promise<unknown>;
  pause: () => void;
  initialize: (file: IFile, options?: object) => void;
  cleanUp: () => void;
}

let interval: number;

export const audioPlayer = ref<IAudio>({
  error: "",
  loaded: false,
  loading: false,
  playing: false,
  duration: 0,
  time: 0,
  reportError(message) {
    this.error = message;
    this.loading = false;
    console.error("Audio Error:", message);
    store.commit("playlist/setAudioError", {
      hash: this.file?.hash,
      error: message,
    });
  },
  /**
   * returns promise which resolves when the file has loaded
   */
  load(file?: IFile, options = {}) {
    return new Promise((resolve, reject) => {
      // For debugging mainly; cause an error after 10s
      if (file) {
        console.log("Loading audio file in player", file);
        this.initialize(file, options);
      }
      if (this.loaded) return resolve(undefined);
      this.player?.once("loaderror", () => {
        reject();
      });
      this.player?.once("load", () => resolve(undefined));
      if (!this.loading) {
        this.loading = true;
        this.player?.load();
      }
    });
  },

  /**
   * returns promise which resolves once the audiofile reaches the end
   */
  play(file?: IFile, options = {}) {
    return new Promise((resolve, reject) => {
      this.player?.once("playerror", (source, message) => {
        this.reportError(`Playback Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
        reject();
      });
      this.player?.once("end", () => {
        resolve(undefined);
      });
      this.load(file, options)
        .then(() => {
          this.player?.play();
        })
        .catch((message) => {
          this.reportError(message);
        });
    });
  },

  pause() {
    if (!this.player) return;
    this.player?.pause();
  },

  initialize(file: IFile, options = {}) {
    const fileExtension = getFileExtension(file);
    if (!Howler.codecs(fileExtension)) {
      this.reportError(`Unsupported/undetected file type: '${fileExtension}'`);
      return;
    }
    this.cleanUp();
    this.file = file;
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
      },
      onplay: () => {
        this.playing = true;
        interval = setInterval(() => {
          this.time = this.player?.seek();
        }, 100);
      },
      onpause: () => {
        this.playing = false;
        clearInterval(interval);
      },
      onstop: () => {
        this.playing = false;
        clearInterval(interval);
      },
      onend: () => {
        this.playing = false;
        clearInterval(interval);
      },
      ...options,
    });
  },

  cleanUp() {
    this.player?.off();
    this.player?.unload();
    this.error = "";
    this.loaded = false;
    this.loading = false;
    this.playing = false;
    this.duration = 0;
    this.time = 0;
  },
});

export const playlistVisible = ref(false);
export const togglePlaylist = () => {
  playlistVisible.value = !playlistVisible.value;
};

export const setPlaylist = (entries: IFile[]) => {
  store.commit("playlist/setPlaylist", { entries });
};

export const enqueue = (entries: IFile[]) =>
  setPlaylist(store.getters["playlist/getPlaylist"].entries.concat(entries));

export const clearPlaylist = () => {
  store.commit("playlist/setPlaylist", { entries: [] });
};

export const playAudioFile = (file: IFile) => {
  !file.audio?.error && audioPlayer.value.play(file);
};
/**
 * @param secs
 * @returns [string, string]
 */
export function formatTime(secs: number): [string, string] | undefined {
  if (secs === undefined) return;
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs - minutes * 60) || 0;
  return [`${minutes}`, `${seconds < 10 ? "0" : ""}${seconds}`];
}
