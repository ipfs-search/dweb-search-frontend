export const Types = {
  all: "all",
  text: "text",
  audio: "audio",
  images: "images",
  video: "video",
  directories: "directories",
  other: "other",
  unfiltered: "any",
};

export const TypeListNames = {
  all: "All types",
  text: "Documents",
  audio: "Audio",
  images: "Images",
  video: "Video",
  directories: "Directories",
  other: "Other",
  unfiltered: "Any",
};

export const searchTypes = Object.entries(TypeListNames);
export const listName = (type) =>
  TypeListNames[Object.keys(Types).find((key) => Types[key] === type)];

export default {
  searchTypes,
  Types,
};
