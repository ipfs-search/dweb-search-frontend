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
  metadata?: Record<string, string[]>;
}
export interface IFile {
  hash: string;
  "first-seen": string;
  "last-seen": string;
  title?: string;
  author?: string;
  size?: number;
  mimetype?: string;
  references: IReference[] | null;
  metadata?: IFileMetadata;
  audio?: {
    error: string;
  };
}
