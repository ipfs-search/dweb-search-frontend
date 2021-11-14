// import { apiSearch } from '../../helpers/ApiHelper';

// TODO: keep track in store of which page(s) have been loaded, and logic to prevent reloading
const initialResults = {
  total: 0,
  max_score: 0.0,
  hits: [],
};

const mutations = {
  // Mutations relating to search results
  setError(state) {
    state.error = true;
  },
  clearResults(state) {
    state.results = initialResults;
  },
  prependResults(state, results) {
    state.results = {
      ...results,
      hits: [
        ...results.hits,
        ...state.results.hits,
      ],
    };
  },
  appendResults(state, results) {
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
  error: false,
  results: initialResults,
});

export default () => ({
  namespaced: true,
  state,
  actions: {
    /**
     * receive results and append (or prepend) them to the state
     * @Deprecated
     * TODO: seperate concerns for getResults action; API call should live somewhere else
     * - that way, the code is more flexible in choosing what to do with the retrieved results
     * @param {rootGetters, commit}
     * @param options/page: page number or {page, prepend}
     */
    /*
    getResults({ rootGetters, commit }, options = 1) {
      // I am phasing out the loading state because it may lead to mutex issues (there is no lock).
      // also I don't think it is actually being used anywhere
      // commit('setLoading');

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

     */
  },
  mutations,
});
