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

export default (type) => ({
  namespaced: true,
  state,
  actions: {
    getResults({ rootState, rootGetters, commit }) {
      commit('setLoading');

      // console.log(rootState.query.apiQueryString);

      api.searchGet(
        rootGetters['query/apiQueryString'],
        type,
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
