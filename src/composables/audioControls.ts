import { ref } from "vue";
import { IFile } from "../interfaces/IFile";

import store from "@/store";
import { Howl, Howler } from "howler";
import { getFileExtension } from "@/helpers/fileHelper";
import getResourceURL from "@/helpers/resourceURL";

const abortController = new AbortController();

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
  reportError: (hash: string | undefined, message: string) => void;
  load: (file?: IFile, options?: object) => Promise<IAudio>;
  play: (file?: IFile, options?: object) => Promise<IAudio>;
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
  reportError(hash, message) {
    this.error = message;
    this.loading = false;
    console.error("Audio Error:", message, this, hash);
    store.commit("playlist/setAudioError", {
      hash,
      error: message,
    });
  },
  /**
   * returns promise which resolves when the file has loaded
   */
  load(file?: IFile, options = {}): Promise<IAudio> {
    return new Promise((resolve, reject) => {
      abortController.signal.addEventListener("abort", () => {
        reject();
      });
      if (file) {
        this.initialize(file, options);
      }
      if (this.loaded) return resolve(this);
      this.player?.once("loaderror", () => {
        reject();
      });
      this.player?.once("load", () => resolve(this));
      if (!this.loading) {
        this.loading = true;
        this.player?.load();
      }
    });
  },

  /**
   * returns promise which resolves once the audiofile reaches the end
   */
  play(file?: IFile, options = {}): Promise<IAudio> {
    return new Promise((resolve, reject) => {
      abortController.signal.addEventListener("abort", () => {
        reject();
      });
      this.load(file, options)
        .then((audio) => {
          this.player?.once("playerror", (source, message) => {
            this.reportError(
              this.file?.hash,
              `Playback Error: ${errorCode[message as 1 | 2 | 3 | 4]}`
            );
            reject();
          });
          this.player?.once("end", () => {
            resolve(this);
          });
          audio.player?.play();
        })
        .catch((message) => {
          // no need for reporting, because this is handled in a hook set in initialize
          resolve(this);
        });
    });
  },

  pause() {
    if (!this.player) return;
    this.player.pause();
  },

  initialize(file: IFile, options = {}) {
    const fileExtension = getFileExtension(file);
    if (!Howler.codecs(fileExtension)) {
      this.reportError(file.hash, `Unsupported/undetected file type: '${fileExtension}'`);
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
        this.reportError(file.hash, `Load Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
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
      onend: () => {
        this.playing = false;
        clearInterval(interval);
      },
      ...options,
    });
  },

  cleanUp() {
    abortController.abort();
    this.player?.off();
    this.player?.unload();
    this.file = undefined;
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

export const setPlaylist = (entries: IFile[], autoPlay = true) => {
  store.commit("playlist/setPlaylist", { entries });
  if (autoPlay) startPlaylist(0);
};

export const enqueue = (entries: IFile[]) =>
  setPlaylist(store.getters["playlist/getPlaylist"].entries.concat(entries), false);

export const clearPlaylist = () => {
  store.commit("playlist/setPlaylist", { entries: [] });
};

let playlistIndex = 0;
const loop = ref(false);
export const toggleLoop = () => {
  loop.value = !loop.value;
};
export const startPlaylist = async (index?: number) => {
  if (index !== undefined) playlistIndex = index;
  while (playlistIndex < store.getters["playlist/getPlaylist"].entries.length) {
    if (!store.getters["playlist/getPlaylist"].entries[playlistIndex].audio?.error) {
      await playAudioFile(store.getters["playlist/getPlaylist"].entries[playlistIndex]);
    }
    playlistIndex++;
  }
};
export const previousPlaylistEntry = () => {
  if (playlistIndex === 0) {
    if (loop.value) return store.getters["playlist/getPlaylist"].entries.length - 1;
    return undefined;
  }
  return playlistIndex - 1;
};
export const playlistSkipPrevious = () => {
  startPlaylist(previousPlaylistEntry());
};
export const nextPlaylistEntry = () => {
  if (playlistIndex === store.getters["playlist/getPlaylist"].entries.length - 1) {
    if (loop.value) return 0;
    return undefined;
  }
  return playlistIndex + 1;
};
export const playlistSkipNext = () => {
  startPlaylist(nextPlaylistEntry());
};

export const playAudioFile = (file: IFile) => {
  abortController.abort();
  return new Promise((resolve, reject) => {
    if (file.audio?.error) reject(file.audio.error);
    audioPlayer.value.play(file).then(resolve).catch(reject);
  });
};

export const pauseAudio = () => {
  audioPlayer.value?.pause();
};

export const cleanUpAudioPlayer = () => {
  audioPlayer.value?.cleanUp();
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