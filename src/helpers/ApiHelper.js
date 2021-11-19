import { DefaultApi } from 'ipfs-search-client';

export const api = new DefaultApi();

// the page limit of the API
export const maxPages = 100;
export const batchSize = 15;

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

/**
 * gets metadata from api and normalizes it to the format from the search API
 * @param hash
 * @returns {Promise<{author: *, mimetype: *, creation_date: *, title, hash: *}>}
 */
export function apiMetadataQuery(hash) {
// TODO: better normalization. Examine format returning from API
// TODO: consistent file-data format throughout frontend code
  return api.metadatahashGet(hash)
    .then(({ metadata }) => {
      console.debug('received metadata:', metadata);
      return {
        hash,
        author: metadata.Author?.[0],
        title: metadata.title?.[0] || metadata.resourceName?.[0],
        mimetype: metadata['Content-Type']?.[0],
        creation_date: metadata['Creation-Date']?.[0],
      };
    });
}

/**
 * perform search query on the API. Note that batch is 0-based
 * @param query
 * @param type
 * @param batch: 0 based page number
 * @param perBatch: forward compatible parameter, currently unused
 * @returns {Promise<never>|Promise<SearchResultList>}
 */
// eslint-disable-next-line no-unused-vars
export function apiSearch(query, type, batch = 0, perBatch = batchSize) {
  if (batch && batch > maxPages) return Promise.reject(Error('API error: Page limit exceeded'));

  const typeFilter = type === 'directories' ? '' : legacyTypeFilter(legacyTypes[type]);

  // Legacy API workaround; only accepts file and directory
  const apiType = type === 'directories' ? 'directory' : 'file';

  return api.searchGet(
    query + typeFilter,
    apiType,
    batch,
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
  batchSize,
  api,
  legacyTypeFilter,
  legacyTypes,
  apiMetadataQuery,
  apiSearch,
};
