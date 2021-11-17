import { apiSearch, pageSize } from '@/helpers/ApiHelper';

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

    // splice behaves weird beyond the length of the array
    // this 'hack' lengthens the array so splice can put results there
    if (index >= hits.length) hits[index] = {};
    hits.splice(index, results.hits.length, ...results.hits);

    state.results = {
      ...results,
      hits,
    };
  },
};

const getters = {
  pageResults: (state) => (page, perPage = pageSize) => {
    const pageResults = state.results?.hits?.slice(page * perPage, (page + 1) * perPage);
    return pageResults;
  },
  loading: (state) => state.loading,
  error: (state) => state.error,
  resultsTotal: (state) => state.results.total,
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
    async fetchPage({ state, commit, rootGetters }, {
      page = 0,
      perPage = pageSize,
    }) {
      let pageResults = state.results?.hits?.slice(page * perPage, (page + 1) * perPage);

      if (pageResults === undefined
        || pageResults?.length === 0
        || pageResults?.includes(undefined)) {
        commit('setLoading');

        const apiQueryString = rootGetters['query/apiQueryString'];

        await apiSearch(apiQueryString, fileType, page, perPage)
          .then((results) => {
            commit('setResults', { results, index: page * perPage });
            pageResults = results.hits;
          })
          .catch((error) => {
            commit('setError', { error, page, perPage });
          });
      }

      return pageResults;
    },
  },
});
