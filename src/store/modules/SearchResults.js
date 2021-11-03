import { apiSearch } from '../../helpers/ApiHelper';

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
     * @param {rootGetters, commit}
     * @param options/page: page number or {page, prepend}
     */
    getResults({ rootGetters, commit }, options = 1) {
      commit('setLoading');

      const page = (typeof options === 'object') ? options.page : options;
      const prepend = (typeof options === 'object') ? options.prepend : false;

      apiSearch(rootGetters['query/apiQueryString'], type, page - 1)
        .then((results) => {
          if (prepend) {
            commit('prependResults', results);
          } else {
            commit('appendResults', results);
          }
        })
        .catch(() => {
          commit('setError');
        });
    },
  },
  mutations,
});
