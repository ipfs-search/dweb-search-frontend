import { apiSearch } from '@/helpers/ApiHelper';

const initialResults = {
  total: 0,
  max_score: 0.0,
  hits: [],
};

const mutations = {
  // Mutations relating to search results
  setLoading(state, loading = true) {
    state.loading = loading;
  },
  setError(state, error) {
    state.loading = false;
    state.error = error;
  },
  setResults(state, { results, index }) {
    state.loading = false;
    const { hits } = state.results;

    // splice behaves weird beyond the length of the array, so if needed, lengthen it
    if (index >= hits.length) hits[index] = undefined;
    hits.splice(index, results.hits.length, ...results.hits);

    state.results = {
      ...results,
      hits,
    };
  },
};

const getters = {
  getPage: (state) => (page, pageSize = 15) => {
    const pageResults = state.results?.hits?.slice(page * pageSize, (page + 1) * pageSize);
    return pageResults;
  },
};

export default (fileType) => ({
  namespaced: true,
  state: () => ({
    error: false,
    loading: false,
    results: initialResults,
  }),
  mutations,
  getters,
  actions: {
    async fetchPage({ state, commit, rootGetters }, { page = 0, pageSize = 15 }) {
      let pageResults = state.results?.hits?.slice(page * pageSize, (page + 1) * pageSize);

      if (pageResults === undefined
        || pageResults?.length === 0
        || pageResults?.includes(undefined)) {
        commit('setLoading');

        const apiQueryString = rootGetters['query/apiQueryString'];

        await apiSearch(apiQueryString, fileType, page, pageSize)
          .then((results) => {
            commit('setResults', { results, index: page * pageSize });
            pageResults = results.hits;
          })
          .catch((error) => {
            commit('setError', { error, page, pageSize });
          });
      }

      return pageResults;
    },
  },
});
