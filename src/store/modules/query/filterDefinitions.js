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

const languageOptions = Object.entries(languages).map(([alpha2, name]) => (
  {
    label: name,
    slug: alpha2,
    apiValue: alpha2,
  })).sort((a, b) => a.label < b.label); // alphabetize

const typeFilterDefinition = {
  label: 'Type',
  slug: 'type',
  apiKey: 'metadata.Content-Type',
  options: [
    {
      label: 'Any',
      slug: 'any',
      default: true,
      apiValue: [],
    },
    ...Object.entries(legacyTypes).map(([type, values]) => ({
      label: type,
      slug: type,
      apiValue: values,
    })),
  ],
};

const languageFilterDefinition = {
  label: 'Language',
  slug: 'language',
  apiKey: 'language.language',
  options: [
    {
      label: 'Any',
      slug: 'any',
      apiValue: '',
      default: true,
    },
    ...languageOptions,
  ],
};

const sizeFilterDefinition = {
  label: 'Size',
  slug: 'size',
  apiKey: 'size',
  options: [
    {
      label: '0-10mb',
      slug: '0-10mb',
      apiValue: ['<=10485760'],
    },
    {
      label: '10-100mb',
      slug: '10-100mb',
      apiValue: ['>10485760', '<=104857600'],
    },
    {
      label: '100mb-1gb',
      slug: '100mb-1gb',
      apiValue: ['>104857600', '<=1073741824'],
    },
    {
      label: '1gb+',
      slug: '>1gb',
      apiValue: ['>1073741824'],
    },
    {
      label: 'any',
      slug: 'any',
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
      slug: '<24hr',
      apiValue: '[ now-24h/h TO *]',
    },
    {
      label: '<7d',
      slug: '<7d',
      apiValue: '[ now/h-7d TO *]',
    },
    {
      label: '<30d',
      slug: '<30d',
      apiValue: '[ now/d-30d TO *]',
      default: true,
    },
    {
      label: 'any',
      slug: 'any',
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
