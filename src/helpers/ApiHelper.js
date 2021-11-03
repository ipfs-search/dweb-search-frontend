import { DefaultApi } from 'ipfs-search-client';

export const api = new DefaultApi();
// the page limit of the API
export const maxPages = 100;

export const legacyTypes = {
  text: [
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
  audio: [
    'audio*',
    // 'application/ogg',
  ],
  video: [
    'video*',
    // 'application/mp4'
  ],
  images: [
    'image*',
  ],
};

export function legacyTypeFilter(typeList) {
  // Add quotes for literals, leave wildcards as-is
  const t = typeList.map((x) => (x.includes('*') && x) || `"${x}"`).join(' OR ');
  return ` metadata.Content-Type:(${t})`;
}

export function apiSearch(query, type, page = 0) {
  if (page && page > maxPages) return Promise.reject(Error('API error: Page limit exceeded'));

  const typeFilter = type === 'directories' ? '' : legacyTypeFilter(legacyTypes[type]);
  const apiType = type === 'directories' ? 'directory' : 'file'; // Legacy API workaround; only accepts file and directory

  return api.searchGet(
    query + typeFilter,
    apiType,
    page,
  ).then((results) => {
    // fixme: the API sometimes responds with an error with response code 200. This catches that.
    if (results.error) throw results.error;
    return results;
  }).catch((err) => {
    console.error('API error from searchApi.searchGet', err);
    throw err;
  });
}

export default {
  maxPages,
  api,
  legacyTypeFilter,
  legacyTypes,
  apiSearch,
};
