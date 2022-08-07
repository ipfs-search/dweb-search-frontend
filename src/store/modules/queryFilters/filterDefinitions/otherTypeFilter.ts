import { filterDefinition } from "./filterDefinitionInterface";

export const otherTypeFilterDefinition: filterDefinition = {
  label: "File Type",
  slug: "other-type",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: "Any",
      apiValue: undefined,
    },
    {
      title: "Binary data",
      apiValue: "application/octet-stream",
    },
    {
      title: "Archives",
      apiValue:
        "(" +
        [
          "application/x-bzip*",
          "application/gzip",
          "application/vnd.rar",
          "application/x-tar",
          "application/zip",
          "application/x-zip",
          "application/x-zip-compressed",
          "application/x-7z-compressed",
          "application/gnutar",
          "application/x-compressed",
        ].join(" OR ") +
        ")",
    },
    {
      title: "Executables (programs)",
      apiValue:
        "(" +
        [
          "application/vnd.microsoft.portable-executable",
          "application/vnd.android.package-archive",
          "application/x-ios-app",
          "application/vnd.apple.installer+xml",
        ].join(" OR ") +
        ")",
    },
    {
      title: "Code",
      apiValue:
        "(" +
        [
          "text/javascript",
          "application/*javascript",
          "application/*json",
          "application/x-sh",
          "text/x-java-source",
          "text/x-asm",
          "text/x-fortran",
          "text/x-script.phyton",
        ].join(" OR ") +
        ")",
    },
    {
      title: "Calendars",
      apiValue: "text/calendar",
    },
    {
      title: "Fonts",
      apiValue: "(font/* OR application/*font*)",
    },
  ],
};
