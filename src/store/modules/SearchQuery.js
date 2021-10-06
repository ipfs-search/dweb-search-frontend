const initialQuery = {
  // TODO: rename user_query to something consistent, non-snake_case, and less confusing
  // such as 'q' or searchPhrase
  user_query: '',
  type: 'any',
  page: 1,
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
   * @param page: one-based page index
   */
  setPage({
    rootState, state, commit,
  }, page = 1) {
    // eslint-disable-next-line camelcase
    const { page_count } = rootState.results[state.type].results;
    // eslint-disable-next-line camelcase
    if (page_count > page) {
      // dispatch(`results/${state.type}/resetResults`, null, { root: true });
      commit('setPage', page);
      // dispatch(`results/${state.type}/getResults`, page, { root: true });
    }
  },
  /**
   * increments the page and fetches and appends the results for this page (for infinite scrolling)
   * TODO: move incrementPage logic out of searchQuery module
   * - the change of the query should be implied from route change by watch function
   * - that would leave only the fetching of the results, which is not the query module logic
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
        dispatch(`results/${state.type}/getResults`, state.page, { root: true });
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
