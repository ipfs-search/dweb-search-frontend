import { DefaultApi } from 'ipfs-search-client';
import store from '../store';
import router from '../router';

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

/**
 * gets metadata from api and normalizes it to the format from the search API
 * @param hash
 * @returns {Promise<{author: *, mimetype: *, creation_date: *, title, hash: *}>}
 */
export function apiMetadataQuery(hash) {
// TODO: better normalization. Might be better to do at the API side.
// TODO: consistent file-data format throughout frontend code
  return api.metadatahashGet(hash)
    .then(({ metadata }) => {
      console.debug('received metadata:', metadata);
      return {
        hash,
        author: metadata.Author[0],
        title: metadata.title[0] || metadata.resourceName[0],
        mimetype: metadata['Content-Type'][0],
        creation_date: metadata['Creation-Date'][0],
      };
    });
}

/**
 * perform search query on the API. Note that page is 0-based
 * @param query
 * @param type
 * @param page: 0 based page number
 * @returns {Promise<never>|Promise<SearchResultList>}
 */
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

/**
 * shorthand function for api search on the querystring from the query store
 *
 * @param fileType
 * @param page
 * @returns {Promise<never>|Promise<SearchResultList>}
 */
export function apiSearchQueryString(page = undefined) {
  return apiSearch(
    store.getters['query/apiQueryString'],
    router.currentRoute.params.fileType,
    page ?? (Number(router.currentRoute?.query?.page) || 0),
  );
}

export default {
  maxPages,
  api,
  legacyTypeFilter,
  legacyTypes,
  apiMetadataQuery,
  apiSearch,
  apiSearchQueryString,
};
