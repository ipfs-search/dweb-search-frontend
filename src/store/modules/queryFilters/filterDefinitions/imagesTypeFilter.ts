import { filterDefinition } from "./filterDefinitionInterface";

export const imagesTypeFilterDefinition: filterDefinition = {
  label: "File Type",
  slug: "image-type",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: "Any",
      apiValue: undefined,
    },
    {
      title: "jpeg",
      apiValue: "image/jpeg",
    },
    {
      title: "gif",
      apiValue: "image/gif",
    },
    {
      title: "png",
      apiValue: "image/png",
    },
    {
      title: "svg",
      apiValue: "image/svg+xml",
    },
    {
      title: "tiff",
      apiValue: "image/tiff",
    },
    {
      title: "heic",
      apiValue: "image/heic",
    },
    {
      title: "bmp",
      apiValue: "image/*bmp",
    },
    {
      title: "ico",
      apiValue: "image/vnd.microsoft.icon",
    },
    {
      title: "avif",
      apiValue: "image/avif",
    },
  ],
};
