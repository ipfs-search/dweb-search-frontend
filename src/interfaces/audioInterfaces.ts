import { IFile } from "./IFile";

export interface IPlaylist {
  index?: number | undefined;
  entries: IFile[];
}

export interface IExternalPlayer {
  duration: () => number;
  load: () => void;
  play: () => void;
  pause: () => void;
  seek: (progress?: number) => number;
  off: () => void;
  unload: () => void;
  once: (event: string, callback: (source?: unknown, message?: string | number) => void) => void;
}

export interface IAudio {
  file?: IFile;
  error: string;
  loaded: boolean;
  loading: boolean;
  playing: boolean;
  duration: number;
  time: number | undefined;
  player?: IExternalPlayer;
  reportError: (hash: string | undefined, message: string) => void;
  load: (file?: IFile, options?: object) => Promise<IAudio>;
  play: (file?: IFile, options?: object) => Promise<IAudio>;
  pause: () => void;
  initialize: (file: IFile, options?: object) => void;
  cleanUp: () => void;
}
