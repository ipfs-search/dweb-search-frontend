import { Types } from '@/helpers/typeHelper';

export const legacyTypes = {
  [Types.text]: [
    // eBook types
    'application/x-mobipocket-ebook',
    'application/epub+zip',
    'application/vnd.amazon.ebook',
    // Scanned documents
    'image/vnd.djvu',
    'application/pdf',
    // HTML/plain text
    'text/html',
    'text/plain',
    // Text editors
    'application/postscript',
    'application/rtf',
    // Open Office et al.
    'application/vnd.oasis.opendocument.text',
    'application/vnd.sun.xml.writer',
    'application/vnd.stardivision.writer',
    'application/x-starwriter',
    // MS Word
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    // Misc
    'application/x-abiword',
  ],
  [Types.audio]: [
    'audio*',
    // 'application/ogg',
  ],
  [Types.video]: [
    'video*',
    // 'application/mp4'
  ],
  [Types.images]: [
    'image*',
  ],
};

export const extensions = {
  [Types.text]: [
    {
      text: 'pdf',
      value: 'pdf',
      apiEntry: ['*.pdf'],
    },
    {
      text: 'doc',
      value: 'doc',
      apiEntry: ['*.doc', '*.docx'],
    },
    {
      text: 'epub',
      value: 'epub',
      apiEntry: ['*.epub'],
    },
  ],
  [Types.audio]: [
    {
      text: 'mp3',
      value: 'mp3',
      apiEntry: ['*.mp3'],
    },
    {
      text: 'flac',
      value: 'flac',
      apiEntry: ['*.flac'],
    },
    {
      text: 'midi',
      value: 'midi',
      apiEntry: ['*.mid', '*.midi'],
    },
  ],
  [Types.video]: [
  ],
  [Types.images]: [
    {
      text: 'jpeg',
      value: 'jpeg',
      apiEntry: ['*.jpeg', '*.jpg', '*.jfif', '*.pjpeg', '*.pjp'],
    },
    {
      text: 'png',
      value: 'png',
      apiEntry: ['*.png'],
    },
    {
      text: 'gif',
      value: 'gif',
      apiEntry: ['*.gif'],
    },
    {
      text: 'svg',
      value: 'svg',
      apiEntry: ['*.svg'],
    },
    {
      text: 'WebP',
      value: 'WebP',
      apiEntry: ['*.webp'],
    },
    {
      text: 'Ico',
      value: 'Ico',
      apiEntry: ['*.ico', '*.cur'],
    },
    {
      text: 'Tiff',
      value: 'Tiff',
      apiEntry: ['*.tiff', '*.tif'],
    },
    {
      text: 'bmp',
      value: 'bmp',
      apiEntry: ['*.bmp'],
    },
  ],
};

export default [
  {
    label: 'Type',
    // this is put as 'multiple', because then the api uses an 'OR' operator.
    // It's a hack, using the fact that the type filter isn't used with the v-select component
    // otherwise a piece of data+logic is needed to make the choice for the API.
    multiple: true,
    queryParam: 'type',
    apiKey: 'metadata.Content-Type',
    items: Object.entries(legacyTypes).map(([type, values]) => ({
      text: type,
      value: type,
      apiEntry: values,
    })),
  },
  {
    label: 'File extensions',
    queryParam: 'extensions',
    apiKey: 'references.name',
    multiple: true,
    items: [],
  },
  {
    label: 'Size',
    queryParam: 'size',
    apiKey: 'size',
    items: [
      {
        text: '0-10mb',
        value: '0-10mb',
        apiEntry: ['<=10485760'],
      },
      {
        text: '10-100mb',
        value: '10-100mb',
        apiEntry: ['>10485760', '<=104857600'],
      },
      {
        text: '100mb-1gb',
        value: '100mb-1gb',
        apiEntry: ['>104857600', '<=1073741824'],
      },
      {
        text: '1gb+',
        value: '>1gb',
        apiEntry: ['>1073741824'],
      },
      {
        text: 'any',
        value: 'any',
        apiEntry: [],
        initial: true,
      },
    ],
  },
  {
    label: 'Last seen',
    queryParam: 'last_seen',
    apiKey: 'last-seen',
    items: [
      {
        text: '<24hr',
        value: '<24hr',
        apiEntry: '[ now-24h/h TO *]',
      },
      {
        text: '<7d',
        value: '<7d',
        apiEntry: '[ now/h-7d TO *]',
      },
      {
        text: '<30d',
        value: '<30d',
        apiEntry: '[ now/d-30d TO *]',
        initial: true,
      },
      {
        text: 'any',
        value: 'any',
        apiEntry: '*',
      },
    ],
  },
];
