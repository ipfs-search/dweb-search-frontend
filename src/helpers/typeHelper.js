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
  text: 'text',
  images: 'images',
  audio: 'audio',
  video: 'video',
  directories: 'directories',
};

export default {
  fileTypes,
  searchTypes,
  Types,
};
