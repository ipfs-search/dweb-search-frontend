const initialQuery = {
  searchPhrase: '',
  type: 'any',
  page: 1,
  filters: {
    lastSeen: '[ now/d-30d TO *]',
    size: [],
  },
};

/**
 * Return query params for consumption by $router.push({query})
 * Inverse of setQueryFromParams()
 * @param state
 * @returns {{q: (*|string), last_seen: Function, size: Function, page, type}}
 */
function stateToQueryParams(state) {
  return {
    q: state.searchPhrase,
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

/**
 * flatten query and filters into a string, but not the page or the filetype
 * @param state
 * @returns {string}
 */
function apiQueryString(state) {
  return [state.searchPhrase, ...getFilters(state.filters)].join(' ');
}

const getters = {
  stateToQueryParams,
  apiQueryString,
};

const mutations = {
  // Mutations relating to query composition
  setRouteParams(state, params) {
    // Inverse of getters.queryParams
    state.searchPhrase = params.q || initialQuery.searchPhrase;
    state.type = params.type || initialQuery.type;
    state.page = Number(params.page) || initialQuery.page;
    state.filters = {
      lastSeen: params.last_seen || initialQuery.filters.lastSeen,
      size: params.size || initialQuery.filters.size,
    };
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
      commit('setPage', page);
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
