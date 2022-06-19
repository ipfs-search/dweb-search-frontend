export const Types = {
  any: 'any',
  text: 'text',
  audio: 'audio',
  images: 'images',
  video: 'video',
  directories: 'directories',
  other: 'other',
};

export const TypeListNames = {
  any: 'Any',
  text: 'Documents',
  audio: 'Audio',
  images: 'Images',
  video: 'Video',
  directories: 'Directories',
  other: 'Other',
};

export const searchTypes = Object.values(Types);

export default {
  searchTypes,
  Types,
};
