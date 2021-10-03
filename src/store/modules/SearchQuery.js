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

  return {
    q: state.user_query,
    last_seen: state.filters.lastSeen,
    size: state.filters.size,
    type: state.type,
    page: state.page,
  };
}

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
  return [...lastSeenFilters, ...sizeFilters];
}

function apiQueryString(state) {
  return [state.user_query, ...getFilters(state.filters)].join(' ');
}

const getters = {
  stateToQueryParams,
  apiQueryString,
};

const mutations = {
  // Mutations relating to query composition
  setRouteParams(state, params) {
    // Inverse of getters.queryParams
    state.user_query = params.q || initialQuery.user_query;
    state.type = params.type || initialQuery.type;
    state.page = Number(params.page) || initialQuery.page;
    state.filters = {
      lastSeen: params.last_seen || initialQuery.filters.lastSeen,
      size: params.size || initialQuery.filters.size,
    };
  },
  setUserQuery(state, q) {
    state.user_query = q;
  },
  setType(state, type) {
    if (state.type !== type) state.page = 0;
    state.type = type;
  },
  setPage(state, page) {
    state.page = page;
  },
  incrementPage(state) {
    state.page += 1;
  },
  decrementPage(state) {
    if (state.page >= 1) {
      // Never decrease below 0
      state.page -= 1;
    }
  },
  setLastSeenFilter(state, lastSeen) {
    state.filters.lastSeen = lastSeen;
  },
  setSizeFilter(state, size) {
    state.filters.size = size;
  },
};

const actions = {
  /**
   * sets the page and changes the results for this filetype (i.e. jump to page)
   * @param rootState
   * @param commit
   * @param dispatch
   * @param page: zero-based page index
   */
  setPage({
    rootState, state, commit, dispatch,
  }, page = 0) {
    // eslint-disable-next-line camelcase
    const { page_count } = rootState.results[state.type].results;
    // eslint-disable-next-line camelcase
    if (page_count > page) {
      dispatch(`results/${state.type}/resetResults`, null, { root: true });
      commit('setPage', page);
      dispatch(`results/${state.type}/getResults`, null, { root: true });
    }
  },
  /**
   * increments the page and fetches and appends the results for this page (for infinite scrolling)
   * @param rootState
   * @param state
   * @param commit
   * @param dispatch
   */
  incrementPage({
    rootState, state, commit, dispatch,
  }) {
    // eslint-disable-next-line camelcase
    const { hits, page_count, page_size } = rootState.results[state.type].results;
    // eslint-disable-next-line camelcase
    if (page_count > state.page + 1) {
      commit('incrementPage');
      // eslint-disable-next-line camelcase
      if (hits.length / page_size <= state.page) {
        dispatch(`results/${state.type}/getResults`, null, { root: true });
      }
    }
  },
};
const state = () => ({ ...initialQuery }); // Copy fields, prevent reference.

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
