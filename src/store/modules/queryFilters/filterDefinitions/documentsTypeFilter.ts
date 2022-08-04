import { filterDefinition } from "./filterDefinitionInterface";

export const documentsTypeFilterDefinition: filterDefinition = {
  label: "File Type",
  slug: "doc-type",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: "Any",
      apiValue: undefined,
    },
    {
      title: "pdf",
      apiValue: "application/pdf",
    },
    {
      title: "Office Documents",
      apiValue:
        "(" +
        [
          // Open Office et al.
          "application/vnd.oasis.opendocument.text",
          "application/vnd.sun.xml.writer",
          "application/vnd.stardivision.writer",
          "application/x-starwriter",
          // MS Word
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        ].join(" OR ") +
        ")",
    },
    {
      title: "Presentations",
      apiValue:
        "(" +
        [
          "application/vnd.ms-powerpoint",
          "application/vnd.openxmlformats-officedocument.presentationml.presentation",
          "application/vnd.oasis.opendocument.presentation",
        ].join(" OR ") +
        ")",
    },
    {
      title: "Spreadsheets",
      apiValue:
        "(" +
        [
          "application/vnd.ms-excel",
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.oasis.opendocument.spreadsheet",
          "text/csv",
        ].join(" OR ") +
        ")",
    },
    {
      title: "Ebook",
      apiValue:
        "(\
        application/x-mobipocket-ebook OR \
        application/vnd.amazon.ebook \
        )",
    },
    {
      title: "ePub",
      apiValue: "application/epub+zip",
    },
    {
      title: "Html",
      apiValue: "(text/html* OR text/x-html*)",
    },
    {
      title: "Plaintext (txt)",
      apiValue: "text/plain*",
    },
    {
      title: "Markdown (md)",
      apiValue: "text/*markdown*",
    },
    {
      title: "Postscript (ps/ai)",
      apiValue: "application/postscript",
    },
    {
      title: "Rich Text Format (rtf)",
      apiValue: "application/rtf",
    },
  ],
};
