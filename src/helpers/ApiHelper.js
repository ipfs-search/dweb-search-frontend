import { DefaultApi } from "ipfs-search-client";

export const api = new DefaultApi();

// the page limit of the API
export const maxPages = 100;
export const batchSize = 15;

/**
 * gets metadata from api and normalizes it to the format from the search API
 * @param hash
 * @returns {Promise<{author: *, mimetype: *, creation_date: *, title, hash: *}>}
 */
export function apiMetadataQuery(hash) {
  // TODO: better normalization. Examine format returning from API
  // TODO: consistent file-data format throughout frontend code
  return api.metadatahashGet(hash).then(({ metadata }) => {
    console.debug("received metadata:", metadata);
    return {
      hash,
      author: metadata.Author?.[0],
      title: metadata.title?.[0] || metadata.resourceName?.[0],
      mimetype: metadata["Content-Type"]?.[0],
      creation_date: metadata["Creation-Date"]?.[0],
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
export function apiSearch(query, type, batch = 0) {
  if (batch && batch > maxPages) return Promise.reject(Error("API error: Page limit exceeded"));

  // Legacy API workaround; only accepts file and directory
  const apiType = type === "directories" ? "directory" : "file";

  return api
    .searchGet(query, apiType, batch)
    .then((results) => {
      results.hits.forEach((hit) => {
        if (hit.type !== "directory") {
          api.metadatahashGet(hit.hash).then((metadata) => {
            // eslint-disable-next-line no-param-reassign
            hit.metadata = metadata;
          });
        }
      });
      return results;
    })
    .catch((err) => {
      console.error("API error from searchApi.searchGet", err);
      throw err;
    });
}

/**
 * How to make elastic search queries:
 * Keys and values need to be escaped for reserved 'special' characters, using a prefix backslash.
 * These are the reserved characters: + - = && || > < ! ( ) { } [ ] ^ " ~ * ? : \ /
 * N.b., we don't escape the colons between keys and values, i.e. 'album:(exodus OR survival)',
 * and we don't escape wildcard characters: '*' and '?'.
 * Finally, if a string is placed between (double) quotes, it doesn't need to be escaped, and
 * wildcards don't work.
 * https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-query-string-query.html#_reserved_characters
 * @param s
 */
export const elasticSearchEscape = (s) => s.replace(/([/:])/, (_, c) => `\\${c}`);

export default {
  maxPages,
  batchSize,
  api,
  apiMetadataQuery,
  apiSearch,
};
