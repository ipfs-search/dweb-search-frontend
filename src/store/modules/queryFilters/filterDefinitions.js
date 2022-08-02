import { TypeListNames, Types } from "@/helpers/typeHelper";
import { languages } from "@cospired/i18n-iso-languages/langs/en.json";

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

export const typeFilterDefinition = {
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

export const documentsSubTypeFilter = {
  label: "Type",
  slug: "doc-subtype",
  apiKey: "metadata.Content-Type",
  items: [
    {
      title: "any",
      apiValue: [],
    },
    {
      title: "pdf",
      apiValue: "application/pdf",
    },
    {
      title: "openoffice documents",
      apiValue:
        "(" +
        // Open Office et al.
        "application/vnd.oasis.opendocument.text OR " +
        "application/vnd.sun.xml.writer OR " +
        "application/vnd.stardivision.writer OR " +
        "application/x-starwriter" +
        ")",
    },
    {
      title: "ms office documents",
      apiValue:
        "(" +
        // MS Word
        "application/msword OR " +
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document OR " +
        ")",
    },
    {
      title: "presentations",
      apiValue:
        "(" +
        "application/vnd.ms-powerpoint OR " +
        "application/vnd.openxmlformats-officedocument.presentationml.presentation OR " +
        "application/vnd.oasis.opendocument.presentation" +
        ")",
    },
    {
      title: "spreadsheets",
      apiValue:
        "(" +
        "application/vnd.ms-excel OR " +
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet OR " +
        "application/vnd.oasis.opendocument.spreadsheet" +
        ")",
    },
    {
      title: "ebook",
      apiValue:
        "(\
        application/x-mobipocket-ebook OR \
        application/epub+zip OR \
        application/vnd.amazon.ebook \
        )",
    },
    {
      title: "html",
      apiValue: "text/html*",
    },
    {
      title: "plaintext (txt)",
      apiValue: "text/plain*",
    },
    {
      title: "markdown (md)",
      apiValue: "text/*markdown*",
    },
    {
      title: "postscript (ps/ai)",
      apiValue: "application/postscript",
    },
    {
      title: "rich text format (rtf)",
      apiValue: "application/rtf",
    },
    {
      title: "abiword (abw)",
      apiValue: "application/x-abiword",
    },
  ],
};

const languageOptions = Object.entries(languages)
  .map(([alpha2, name]) => ({
    title: name,
    value: alpha2,
    apiValue: alpha2,
  }))
  .sort((a, b) => a.title < b.title); // alphabetize

export const languageFilterDefinition = {
  label: "Language",
  slug: "language",
  apiKey: "language.language",
  items: [...languageOptions],
};

export const sizeFilterDefinition = {
  label: "Size",
  slug: "size",
  apiKey: "size",
  items: [
    {
      value: "0-10mb",
      apiValue: ["<=10485760"],
    },
    {
      value: "10-100mb",
      apiValue: [">10485760", "<=104857600"],
    },
    {
      value: "100mb-1gb",
      apiValue: [">104857600", "<=1073741824"],
    },
    {
      title: "1gb+",
      value: ">1gb",
      apiValue: [">1073741824"],
    },
    {
      value: "Any",
      apiValue: [],
      default: true,
    },
  ],
};

export const lastSeenFilterDefinition = {
  label: "Last seen",
  slug: "last_seen",
  apiKey: "last-seen",
  items: [
    {
      value: "<24hr",
      apiValue: "[ now-24h/h TO *]",
    },
    {
      value: "<7d",
      apiValue: "[ now/h-7d TO *]",
      default: true,
    },
    {
      value: "<30d",
      apiValue: "[ now/d-30d TO *]",
    },
    {
      value: "Any",
      apiValue: "*",
    },
  ],
};
