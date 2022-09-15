import { Audio } from "../composables/audioPlayer";
export interface IReference {
  name: string;
  parent_hash: string;
}
export interface IFileMetadata {
  ipfs_tika_version: string;
  language?: {
    confidence: string;
    language: string;
    rawScore: number;
  };
  metadata?: object;
}
export interface IFile {
  hash: string;
  "first-seen": string;
  "last-seen": string;
  title?: string;
  size?: number;
  mimetype?: string;
  references: IReference[] | null;
  metadata?: IFileMetadata;
  audio?: Audio;
}
