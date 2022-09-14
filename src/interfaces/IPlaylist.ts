import { IFile } from "./IFile";

export interface IPlaylist {
  index?: number | undefined;
  entries: IFile[];
}
