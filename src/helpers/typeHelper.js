import VideoDetail from '@/components/results/detail/VideoDetail';
import DocumentDetail from '@/components/results/detail/DocumentDetail';
import AudioDetail from '@/components/results/detail/AudioDetail';
import DirectoryDetail from '@/components/results/detail/DirectoryDetail';
import ImageDetail from '@/components/results/detail/ImageDetail';

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

const DetailTypes = {
  [Types.video]: VideoDetail,
  [Types.text]: DocumentDetail,
  [Types.images]: ImageDetail,
  [Types.directories]: DirectoryDetail,
  [Types.audio]: AudioDetail,
};

export default {
  fileTypes,
  searchTypes,
  Types,
  DetailTypes,
};
