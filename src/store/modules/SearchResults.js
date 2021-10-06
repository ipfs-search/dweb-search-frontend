import { DefaultApi } from 'ipfs-search-client';

const api = new DefaultApi();

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
  setResults(state, results) {
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
     * receive results and append them to the state
     * @param rootState
     * @param rootGetters
     * @param commit
     */
    getResults({ rootGetters, commit }, page = 1) {
      commit('setLoading');

      const typeFilter = type === 'directories' ? '' : legacyTypeFilter(legacyTypes[type]);

      return api.searchGet(
        rootGetters['query/apiQueryString'] + typeFilter,
        type === 'directories' ? 'directory' : 'file', // Legacy API workaround; only accepts file and directory
        page - 1,
      ).then((results) => {
        if (results.error) throw results.error;
        commit('setResults', results);
      }).catch((err) => {
        commit('setError');
        console.error('Error from searchApi.searchGet', err);
      });
    },
  },
  mutations,
});
