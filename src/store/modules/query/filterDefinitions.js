import { Types } from '@/helpers/typeHelper';
import { languages } from '@cospired/i18n-iso-languages/langs/en.json';
import { SelectFilter, MultipleSelectFilter } from './filterClasses';

const legacyTypes = {
  [Types.directories]: [],
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

const typeFilterDefinition = {
  label: 'Type',
  apiKey: 'metadata.Content-Type',
  options: [
    {
      label: 'Any',
      default: true,
      apiValue: [],
    },
    ...Object.entries(legacyTypes).map(([type, values]) => ({
      label: type,
      apiValue: values,
    })),
  ],
};

const languageOptions = Object.entries(languages).map(([alpha2, name]) => (
  {
    label: name,
    slug: alpha2,
    apiValue: alpha2,
  })).sort((a, b) => a.label < b.label); // alphabetize

const languageFilterDefinition = {
  label: 'Language',
  apiKey: 'language.language',
  options: [
    {
      label: 'Any',
      apiValue: '',
      default: true,
    },
    ...languageOptions,
  ],
};

const sizeFilterDefinition = {
  label: 'Size',
  apiKey: 'size',
  options: [
    {
      label: '0-10mb',
      apiValue: ['<=10485760'],
    },
    {
      label: '10-100mb',
      apiValue: ['>10485760', '<=104857600'],
    },
    {
      label: '100mb-1gb',
      apiValue: ['>104857600', '<=1073741824'],
    },
    {
      label: '1gb+',
      slug: '>1gb',
      apiValue: ['>1073741824'],
    },
    {
      label: 'Any',
      apiValue: [],
      default: true,
    },
  ],
};
const lastSeenFilterDefinition = {
  label: 'Last seen',
  slug: 'last_seen',
  apiKey: 'last-seen',
  options: [
    {
      label: '<24hr',
      apiValue: '[ now-24h/h TO *]',
    },
    {
      label: '<7d',
      apiValue: '[ now/h-7d TO *]',
    },
    {
      label: '<30d',
      apiValue: '[ now/d-30d TO *]',
      default: true,
    },
    {
      label: 'any',
      apiValue: '*',
    },
  ],
};

export default {
  typeFilter: new MultipleSelectFilter(typeFilterDefinition),
  languageFilter: new MultipleSelectFilter(languageFilterDefinition),
  sizeFilter: new SelectFilter(sizeFilterDefinition),
  lastSeenFilter: new SelectFilter(lastSeenFilterDefinition),
};
