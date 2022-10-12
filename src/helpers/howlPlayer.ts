import { IAudio } from "@/interfaces/audioInterfaces";
import { IFile } from "@/interfaces/IFile";
import { HowlOptions } from "howler";
import getResourceURL from "@/helpers/resourceURL";
import { updateMediaSession } from "@/composables/audioControls";

export const errorCode = {
  "1": "User aborted request",
  "2": "Network error",
  "3": "Decoding error",
  "4": "Resource unsuitable/unavailable",
};

let interval: number;

export const howlOptions = (
  context: IAudio,
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
    context.reportError(file.hash, `Load Error: ${errorCode[message as 1 | 2 | 3 | 4]}`);
  },
  onload: () => {
    context.loading = false;
    context.loaded = true;
    context.duration = context.player?.duration() || 0;
  },
  onplay: () => {
    context.playing = true;
    interval = setInterval(() => {
      context.time = context.player?.seek();
      updateMediaSession(context);
    }, 1000);
  },
  onpause: () => {
    context.playing = false;
    clearInterval(interval);
  },
  onend: () => {
    context.playing = false;
    clearInterval(interval);
  },
  ...options,
});
