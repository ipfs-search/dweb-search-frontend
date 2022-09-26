import { IFile } from "./IFile";

export interface IPlaylist {
  index?: number | undefined;
  entries: IFile[];
}

export type MediaPlayerEvent = "playerror" | "loaderror" | "end" | "load" | "play" | "pause";

// TODO: expand this to a more generic player interface (now it is a shadow of the Howl player)
export interface IMediaPlayer {
  load: () => void;
  play: () => void;
  pause: () => void;
  seek: (progress?: number) => number | undefined;
  off: () => void;
  unload: () => void;
  on: (event: MediaPlayerEvent, callback: (...args: unknown[]) => void) => void;
  once: (event: MediaPlayerEvent, callback: (...args: unknown[]) => void) => void;
  duration: () => number;
}

export interface IAudio {
  file?: IFile;
  error: string;
  loaded: boolean;
  loading: boolean;
  playing: boolean;
  duration: number;
  time: number | undefined;
  player?: IMediaPlayer;
  reportError: (hash: string | undefined, message: string) => void;
  load: (file?: IFile, options?: object) => Promise<IAudio>;
  play: (file?: IFile, options?: object) => Promise<IAudio>;
  pause: () => void;
  initialize: (file: IFile, options?: object) => void;
  cleanUp: () => void;
}
