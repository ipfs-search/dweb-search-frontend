import { filterDefinition } from "./filterDefinitionInterface";

export const audioTypeFilterDefinition: filterDefinition = {
  label: "File Type",
  slug: "audio-type",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: "Any",
      apiValue: undefined,
    },
    {
      title: "mp3 (mpeg)",
      apiValue: "(audio/mp3 OR audio/mpeg)",
    },
    {
      title: "midi",
      apiValue: "audio/*midi",
    },
    {
      title: "ogg vorbis",
      apiValue: "audio/ogg",
    },
    {
      title: "opus",
      apiValue: "audio/opus",
    },
    {
      title: "wav",
      apiValue: "audio/*wav*",
    },
    {
      title: "flac",
      apiValue: "audio/*flac",
    },
    {
      title: "mp4",
      apiValue: "audio/mp4",
    },
    {
      title: "wma",
      apiValue: "audio/x-ms-wma",
    },
    {
      title: "aif",
      apiValue: "audio/*aiff",
    },
    {
      title: "3gp",
      apiValue: "audio/3gp*",
    },
  ],
};
