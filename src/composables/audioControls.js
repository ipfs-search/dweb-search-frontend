import { ref, computed } from "vue";
import { getFileExtension } from "@/helpers/fileHelper";
import { Howl, Howler } from "howler";
import getResourceURL from "@/helpers/resourceURL";

let audioPlayer;
let interval;
const emptyObject = {};

const errorCode = {
  1: "User aborted request",
  2: "Network error",
  3: "Decoding error",
  4: "Resource unsuitable/unavailable",
};

export const audioError = ref("");
export const loading = ref(false);
export const playing = ref(false);
export const loaded = ref(false);
export const sourceFile = ref(emptyObject);
export const time = ref(0);
export const formattedTime = computed(() => formatTime(time.value));
export const duration = ref(0);
export const formattedDuration = computed(() => formatTime(duration.value));

const howlSettings = {
  html5: true,
  preload: "metadata",
  autoplay: true,
  onend: () => (playing.value = false),
  onstop: () => (playing.value = false),
  onpause: () => (playing.value = false),
  onplay: () => (playing.value = true),
  onload: () => {
    loading.value = false;
    loaded.value = true;
    interval = setInterval(() => {
      time.value = audioPlayer.seek();
    }, 100);
    duration.value = audioPlayer.duration();
  },
  onloaderror: (source, message) => soundError(`Loading Error: ${errorCode[message]}`),
  onplayerror: (source, message) => soundError(`Playback Error: ${errorCode[message]}`),
};

/**
 * load a sound file from ipfs into the Howl audio player and attach necessary hooks.
 *
 * @param file: required object {hash, ...}
 * @param options: optional extra options to pass to howl player or overrides.
 */
export function load(file, options) {
  if (!file || !file.hash) {
    throw Error("No proper file specified");
  }
  // FIXME: Howler plans to implement accepting mimetype parameter in the future... since 2015
  // https://github.com/goldfire/howler.js/issues/411
  const fileExtension = getFileExtension(file);
  if (!Howler.codecs(fileExtension)) {
    throw Error(`Unsupported/undetected file type: '${fileExtension}'`);
  }

  close(); // unregister any hooks
  loading.value = true;
  sourceFile.value = file;

  audioPlayer = new Howl({
    ...howlSettings,
    src: [getResourceURL(file.hash)],
    format: [fileExtension],
    ...options,
  });
}

function soundError(errorMessage) {
  console.error(`Audio Player ${errorMessage}`);
  audioError.value = errorMessage;
}

export const playerActive = computed(() => Object.keys(sourceFile.value).length && audioPlayer);

export const progress = computed({
  get() {
    return (time.value / duration.value) * 100;
  },
  set(percentage) {
    if (loaded.value) {
      audioPlayer.seek((percentage * duration.value) / 100);
    }
  },
});

export function loadSoundFile(soundFile) {
  try {
    load(soundFile);
  } catch (e) {
    soundError(e);
  }
}

export function play() {
  if (audioPlayer && loaded.value) audioPlayer.play();
}

export function pause() {
  if (audioPlayer && loaded.value) audioPlayer.pause();
}

export function stop() {
  if (audioPlayer && loaded.value) audioPlayer.stop();
}

export function close() {
  if (audioPlayer) {
    audioError.value = "";
    audioPlayer.off();
    audioPlayer.unload();
    playing.value = false;
    loading.value = false;
    loaded.value = false;
    time.value = 0;
    duration.value = 0;
    sourceFile.value = emptyObject;
  }
  clearInterval(interval);
}

/**
 * @param secs
 * @returns {string}
 */
export function formatTime(secs, spaced = true) {
  if (secs === undefined) return "-";
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs - minutes * 60) || 0;
  return `${minutes}${spaced ? " " : ""}:${spaced ? " " : ""}${seconds < 10 ? "0" : ""}${seconds}`;
}
