const searchApi = require('ipfs-search-client').DefaultApi();

const initialResults = {
  total: 0,
  max_score: 0.0,
  hits: [],
};

const initialQuery = {
  user_query: '',
  type: 'any',
  page: 0,
  filters: {
    lastSeen: null,
    size: null,
  },
};

const getters = {

};

function getLastSeenFilter(lastSeen) {
  if (lastSeen) {
    return `last-seen:${lastSeen}`;
  }

  return '';
}

function getSizeFilter(size) {
  if (size) {
    return `size:${size}`;
  }

  return '';
}

function getFilters(filters) {
  return `${getLastSeenFilter(filters.lastSeen)} ${getSizeFilter(filters.size)}`;
}

const actions = {
  search({ state, commit }) {
    commit('setLoading');

    // Compose querystring query
    const query = `${state.query.user_query} ${getFilters(state.query.filters)}`;

    searchApi.searchGet(query, state.query.type, state.query.page).then((results) => {
      commit('setResults', results);
    }).catch((err) => {
      commit('setError');
      console.error('Error from searchApi.searchGet', err);
    });
  },
};

const mutations = {
  // Mutations relating to query composition
  setUserQuery(state, q) {
    state.query.user_query = q;
  },
  setType(state, type) {
    state.query.type = type;
  },
  incrementPage(state) {
    state.query.page += 1;
  },
  decrementPage(state) {
    if (state.query.page >= 1) {
      // Never decrease below 0
      state.query.page -= 1;
    }
  },
  setLastSeenFilter(state, lastSeen) {
    state.query.filters.lastSeen = lastSeen;
  },
  setSizeFilter(state, size) {
    state.query.filters.size = size;
  },

  // Mutations relating to search queries
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
  // Initial query values; to be set by $router.query.params from view.
  // Note that these are raw values, the labels for options and the options are
  // not (currently) managed here.
  query: initialQuery,
  loading: false,
  error: false,
  results: initialResults,
});

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
