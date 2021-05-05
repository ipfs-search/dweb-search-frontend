import { DefaultApi } from 'ipfs-search-client';

// Causal chain for query: URL -> route -> store -> results view -> search()

const api = new DefaultApi();

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

function stateToQueryParams(state) {
  // Return query params for consumption by $router.push({query})
  // Inverse of setQueryFromParams()

  const { query } = state;

  return {
    q: query.user_query,
    last_seen: query.filters.lastSeen,
    size: query.filters.size,
    type: query.type,
    page: query.page,
  };
}

function queryParamsToState(params) {
  // Inverse of getters.queryParams
  return {
    user_query: params.q || initialQuery.user_query,
    type: params.type || initialQuery.type,
    page: Number(params.page) || initialQuery.page,
    filters: {
      lastSeen: params.last_seen || initialQuery.filters.lastSeen,
      size: params.size || initialQuery.filters.size,
    },
  };
}

const getters = {
  stateToQueryParams,
};

function getLastSeenFilters(lastSeen) {
  if (lastSeen) {
    return [`last-seen:${lastSeen}`];
  }

  return [];
}

function getSizeFilters(size) {
  if (size) {
    if (Array.isArray(size)) {
      return size.map((value) => `size:${value}`);
    }

    // Singular value
    return [`size:${size}`];
  }

  return [];
}

function getFilters(filters) {
  const lastSeenFilters = getLastSeenFilters(filters.lastSeen);
  const sizeFilters = getSizeFilters(filters.size);
  const fl = [...lastSeenFilters, ...sizeFilters];
  return fl.join(' ');
}

const actions = {
  search({ state, commit }) {
    commit('setLoading');

    // Compose querystring query
    const query = `${state.query.user_query} ${getFilters(state.query.filters)}`;

    api.searchGet(query, state.query.type, state.query.page).then((results) => {
      commit('setResults', results);
    }).catch((err) => {
      commit('setError');
      console.error('Error from searchApi.searchGet', err);
    });
  },
};

const mutations = {
  // Mutations relating to query composition
  setRouteParams(state, params) {
    state.query = queryParamsToState(params);
  },
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
  // Initial query values; to be set from $router.query.params from view.
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
