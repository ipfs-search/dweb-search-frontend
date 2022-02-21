export const fileTypes = [
  'text',
  'audio',
  'images',
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
  audio: 'audio',
  images: 'images',
  video: 'video',
  directories: 'directories',
};

export default {
  fileTypes,
  searchTypes,
  Types,
};
