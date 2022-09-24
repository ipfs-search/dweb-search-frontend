import { IAudio } from "@/interfaces/audioInterfaces";
import { IFile } from "@/interfaces/IFile";
import { HowlOptions } from "howler";
import getResourceURL from "@/helpers/resourceURL";

export const errorCode = {
  "1": "User aborted request",
  "2": "Network error",
  "3": "Decoding error",
  "4": "Resource unsuitable/unavailable",
};

let interval: number;

export const howlOptions = (
  audio: IAudio,
  file: IFile,
  fileExtension: string,
  options: object
): HowlOptions => ({
  html5: true,
  preload: "metadata",
  autoplay: false,
  src: [getResourceURL(file.hash)],
  format: [fileExtension],
  onloaderror: (source: unknown, message: unknown) => {
    audio.reportError(file.hash, `Load Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
  },
  onload: () => {
    audio.loading = false;
    audio.loaded = true;
    audio.duration = audio.player?.duration() || 0;
  },
  onplay: () => {
    audio.playing = true;
    interval = setInterval(() => {
      audio.time = audio.player?.seek();
    }, 100);
  },
  onpause: () => {
    audio.playing = false;
    clearInterval(interval);
  },
  onend: () => {
    audio.playing = false;
    clearInterval(interval);
  },
  ...options,
});
