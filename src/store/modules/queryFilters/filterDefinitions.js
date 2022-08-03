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

export const imagesTypesFilter = {
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

export const videoTypesFilter = {
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
      title: "WEBM",
      apiValue: "video/webm",
    },
    {
      title: "3gp",
      apiValue: "video/3gp*",
    },
  ],
};

export const otherTypesFilter = {
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

export const audioTypesFilter = {
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
  items: [
    {
      title: "Any",
      apiValue: undefined,
      default: true,
    },
    ...languageOptions,
  ],
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
    },
    {
      value: "<30d",
      apiValue: "[ now/d-30d TO *]",
      default: true,
    },
    {
      value: "Any",
      apiValue: "*",
    },
  ],
};
