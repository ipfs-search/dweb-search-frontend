import { filterDefinition } from "./filterDefinitionInterface";

export const videoTypeFilterDefinition: filterDefinition = {
  label: "File Type",
  slug: "video-type",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: "Any",
      apiValue: undefined,
    },
    {
      title: "mp4",
      apiValue: "video/mp4",
    },
    {
      title: "mpeg",
      apiValue: "video/mpeg",
    },
    {
      title: "avi",
      apiValue: "video/x-msvideo",
    },
    {
      title: "wma / asf",
      apiValue: "video/x-ms-asf",
    },
    {
      title: "Quicktime",
      apiValue: "video/quicktime",
    },
    {
      title: "h264",
      apiValue: "video/h264",
    },
    {
      title: "Matroska (mkv)",
      apiValue: "video/x-matroska",
    },
    {
      title: "WEBM",
      apiValue: "video/webm",
    },
    {
      title: "3gp",
      apiValue: "video/3gp*",
    },
  ],
};
