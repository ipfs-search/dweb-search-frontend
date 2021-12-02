import DocumentDetail from '@/components/results/detail/DocumentDetail';
import ImageDetail from '@/components/results/detail/ImageDetail';
import VideoDetail from '@/components/results/detail/VideoDetail';
import AudioDetail from '@/components/results/detail/AudioDetail';
import DirectoryDetail from '@/components/results/detail/DirectoryDetail';

export const fileTypes = [
  'text',
  'images',
  'audio',
  'video',
  'directories',
];

export const searchTypes = [
  'any',
  ...fileTypes,
];

export const Types = {
  any: 'any',
  text: 'text',
  images: 'images',
  audio: 'audio',
  video: 'video',
  directories: 'directories',
};

export const ComponentDetailTypes = {
  text: DocumentDetail,
  images: ImageDetail,
  audio: AudioDetail,
  video: VideoDetail,
  directories: DirectoryDetail,
};

export default {
  fileTypes,
  searchTypes,
  Types,
};
