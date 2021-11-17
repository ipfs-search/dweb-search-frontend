import { apiSearch, pageSize } from '@/helpers/ApiHelper';

const baseState = {
  error: false,
  loading: false,
  queryString: '',
  results: {
    total: 0,
    max_score: 0.0,
    hits: [],
  },
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
  setQuery(state, queryString) {
    state.queryString = queryString;
  },
  clearResults(state) {
    state.error = false;
    state.loading = false;
    state.results = {
      total: 0,
      hits: [],
    };
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
    ...baseState,
  }),
  mutations,
  getters,
  actions: {
    /**
     * fetch the page from cache, if possible. Otherwise make an API call.
     * @param state
     * @param commit
     * @param rootGetters
     * @param page: 0-based page
     * @param perPage
     * @returns {Promise<*>}
     */
    async fetchPage({ state, commit, rootGetters }, {
      page = 0,
      perPage = pageSize,
    }) {
      const apiQueryString = rootGetters['query/apiQueryString'];
      if (state.queryString !== apiQueryString) {
        commit('clearResults');
        commit('setQuery', apiQueryString);
      }

      let pageResults = state.results?.hits?.slice(page * perPage, (page + 1) * perPage);

      if (pageResults === undefined
        || pageResults?.length === 0
        || pageResults?.includes(undefined)) {
        commit('setLoading');

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
