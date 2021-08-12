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
    state.results = initialResults;
    state.loading = true;
    state.error = false;
  },
  setError(state) {
    state.loading = false;
    state.error = true;
  },
  setResults(state, results) {
    state.loading = false;
    state.results = results;
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
    getResults({ rootState, rootGetters, commit }) {
      commit('setLoading');

      const typeFilter = type === 'directories' ? '' : legacyTypeFilter(legacyTypes[type]);

      api.searchGet(
        rootGetters['query/apiQueryString'] + typeFilter,
        type === 'directories' ? 'directory' : 'file', // Legacy API workaround; only accepts file and directory
        rootState.query.page,
      ).then((results) => {
        commit('setResults', results);
      }).catch((err) => {
        commit('setError');
        console.error('Error from searchApi.searchGet', err);
      });
    },
  },
  mutations,
});
