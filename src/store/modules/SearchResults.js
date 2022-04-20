import Vue from 'vue';
import { apiSearch, batchSize } from '@/helpers/ApiHelper';
import { classify } from '@/helpers/nsfwClassifier';
import { Types } from '@/helpers/typeHelper';

const baseState = {
  error: false,
  loading: false,
  queryString: '',
  results: {},
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
      hits: [],
    };
  },
  setResults(state, { results, index }) {
    state.loading = false;
    const { hits } = state.results;

    // splice behaves funny when splicing beyond the length of an array
    // this 'hack' lengthens the array so splice can put results there
    if (results?.hits?.length > 0 && index >= hits.length) hits[index] = {};
    hits.splice(index, results.hits.length, ...results.hits);

    state.results = {
      ...results,
      hits,
    };
  },

  setNsfw(state, { index, classification }) {
    if (!classification) return;
    if (!state.results?.hits?.[index]) return;
    // Add actual classification for debugging purposes
    Vue.set(state.results.hits[index], 'nsfwClassification', classification);
  },
};

const getters = {
  /**
   * retrieve cached results (synchronously). N.b. page is 1-based;
   * @param state
   * @returns {function(*, *=)}
   */
  pageResults: (state) => (page, perPage = batchSize) => {
    const batch = page - 1;
    const pageResults = state.results?.hits?.slice(batch * perPage, (batch + 1) * perPage);
    return pageResults || [];
  },
  loading: (state) => state.loading,
  error: (state) => state.error,
  resultsTotal: (state) => state.results.total || 0,
  hits: (state) => state.results.hits || [],
};

function cleanUpResults({ state, commit, apiQueryString }) {
  if (state.queryString !== apiQueryString) {
    commit('clearResults');
    commit('setQuery', apiQueryString);
  }
}

function apiSearchPage({
  commit, apiQueryString, fileType, batch, perPage,
}) {
  commit('setLoading');

  return apiSearch(apiQueryString, fileType, batch, perPage)
    .then((results) => {
      commit('setResults', { results, index: batch * perPage });
      if (fileType === Types.images) {
        results.hits.forEach((hit, index) => {
          classify(hit)
            .then(({ classification }) => {
              commit('setNsfw', { index: index + batch * perPage, classification });
            });
        });
      }
      return results.hits;
    })
    .catch((error) => {
      commit('setError', { error, batch, perPage });
    });
}

export default (fileType) => ({
  namespaced: true,
  state: () => ({
    ...baseState,
  }),
  mutations,
  getters,
  actions: {
    /**
     * fetch the page from cache or from API for current query from url
     * @param state
     * @param commit
     * @param rootGetters
     * @param page: 1-based page
     * @param perPage
     * @returns {Promise<*>}
     */
    async fetchPage({
      state, commit, rootGetters, rootState,
    }, {
      page = 1, perPage = batchSize,
    }) {
      const batch = page - 1;

      const apiQueryString = [
        rootState.query.searchPhrase,
        rootGetters['query/filters/searchApiQuery'],
      ].join(' ');
      cleanUpResults({ state, commit, apiQueryString });

      if (state.results?.total <= batch * perPage) return [];

      // if results are already present, just return them.
      const pageResults = state.results?.hits?.slice(batch * perPage, (batch + 1) * perPage);
      if (pageResults?.length > 0 && !pageResults.includes(undefined)) {
        return pageResults;
      }

      // otherwise do api lookup
      return apiSearchPage({
        commit, apiQueryString, fileType, batch, perPage,
      });
    },
  },
});
