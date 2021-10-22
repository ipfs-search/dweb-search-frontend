import { DefaultApi } from 'ipfs-search-client';
import { maxPages } from '@/helpers/ApiHelper';

const api = new DefaultApi();

// TODO: keep track in store of which page(s) have been loaded, and logic to prevent reloading
const initialResults = {
  total: 0,
  max_score: 0.0,
  hits: [],
};

const mutations = {
  // Mutations relating to search results
  setLoading(state) {
    state.loading = true;
    state.error = false;
  },
  setError(state) {
    state.loading = false;
    state.error = true;
  },
  clearResults(state) {
    state.results = initialResults;
  },
  prependResults(state, results) {
    state.loading = false;
    state.results = {
      ...results,
      hits: [
        ...results.hits,
        ...state.results.hits,
      ],
    };
  },
  appendResults(state, results) {
    state.loading = false;
    state.results = {
      ...results,
      hits: [
        ...state.results.hits,
        ...results.hits,
      ],
    };
  },
};

const state = () => ({
  loading: false,
  error: false,
  results: initialResults,
});

const legacyTypes = {
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

function legacyTypeFilter(typeList) {
  // Add quotes for literals, leave wildcards as-is
  const t = typeList.map((x) => (x.includes('*') && x) || `"${x}"`).join(' OR ');
  return ` metadata.Content-Type:(${t})`;
}

export default (type) => ({
  namespaced: true,
  state,
  actions: {
    /**
     * flush results and set initial results
     * @param commit
     */
    resetResults({ commit }) {
      commit('clearResults');
    },
    /**
     * receive results and append (or prepend) them to the state
     * TODO: seperate concerns for getResults action; API call should live somewhere else
     * - that way, the code is more flexible in choosing what to do with the retrieved results
     * @param rootState
     * @param rootGetters
     * @param commit
     */
    getResults({ rootGetters, commit }, options = 1) {
      commit('setLoading');

      const page = (typeof options === 'object') ? options.page : options;
      const prepend = (typeof options === 'object') ? options.prepend : false;

      const typeFilter = type === 'directories' ? '' : legacyTypeFilter(legacyTypes[type]);

      if (page && page > maxPages) return Promise.reject(Error('API error: Page limit exceeded'));

      return api.searchGet(
        rootGetters['query/apiQueryString'] + typeFilter,
        // Legacy API workaround; only accepts file and directory
        type === 'directories' ? 'directory' : 'file',
        page - 1,
      ).then((results) => {
        if (results.error) throw results.error;
        if (prepend) {
          commit('prependResults', results);
        } else {
          commit('appendResults', results);
        }
        return results;
      }).catch((err) => {
        commit('setError');
        console.error('Error from searchApi.searchGet', err);
      });
    },
  },
  mutations,
});
