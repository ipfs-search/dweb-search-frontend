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
    state.type = type;
  },
  setPage(state, page) {
    state.page = page;
  },
  setLastSeenFilter(state, lastSeen) {
    state.filters.lastSeen = lastSeen;
  },
  setSizeFilter(state, size) {
    state.filters.size = size;
  },
};

const state = () => ({ ...initialQuery }); // Copy fields, prevent reference.

export default {
  namespaced: true,
  state,
  getters,
  mutations,
};
