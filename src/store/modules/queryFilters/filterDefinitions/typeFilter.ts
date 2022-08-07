import { TypeListNames, Types } from "@/helpers/typeHelper.js";
import { filterDefinition } from "./filterDefinitionInterface";

const mainFileTypes = {
  [Types.directories]: [],
  [Types.text]: [
    // eBook types
    "application/x-mobipocket-ebook",
    "application/epub+zip",
    "application/vnd.amazon.ebook",
    // Scanned documents
    "image/vnd.djvu",
    "application/pdf",
    // HTML/plain text
    "text/html*",
    "text/x-html*",
    "text/plain*",
    "text/*markdown*",
    // Text editors
    "application/postscript",
    "application/rtf",
    // Open Office et al.
    "application/vnd.oasis.opendocument.text",
    "application/vnd.sun.xml.writer",
    "application/vnd.stardivision.writer",
    "application/x-starwriter",
    // MS Word
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    // presentations
    "application/vnd.ms-powerpoint",
    "application/vnd.openxmlformats-officedocument.presentationml.presentation",
    "application/vnd.oasis.opendocument.presentation",
    // spreadsheets
    "application/vnd.ms-excel",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    "application/vnd.oasis.opendocument.spreadsheet",
    "text/csv",
    // Misc
    "application/x-abiword",
  ],
  [Types.audio]: [
    "audio*",
    // 'application/ogg',
  ],
  [Types.video]: [
    "video*",
    // 'application/mp4'
  ],
  [Types.images]: ["image*"],
};

export const typeFilterDefinition: filterDefinition = {
  label: "Type",
  slug: "type",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: TypeListNames.all,
      value: Types.all,
      default: true,
      apiValue: [],
    },
    ...Object.entries(mainFileTypes).map(([type, values]) => ({
      title: type,
      apiValue: values,
    })),
    {
      title: TypeListNames.other,
      value: Types.other,
      apiValue: Object.values(mainFileTypes).flat(), // gets negated
    },
    {
      title: TypeListNames.unfiltered,
      value: Types.unfiltered,
      apiValue: [],
    },
  ],
};
