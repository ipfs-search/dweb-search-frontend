import filters from '@/components/helpers/filters';

const initialQuery = {
  searchPhrase: '',
  type: 'any',
  page: 1,
  // map filters to initial values using fancy reducer
  filters: filters.reduce(
    (p, { handle, items }) => ({ ...p, [handle]: items.find((i) => i.initial).value }),
    {},
  ),
};

/**
 * Return query params for consumption by $router.push({query})
 * Inverse of setQueryFromParams()
 * @param state
 * @returns {{q: (*|string), 'last-seen': Function, size: Function, page, type}}
 */
function stateToQueryParams({ searchPhrase, ...otherParams }) {
  return {
    q: searchPhrase,
    ...otherParams,
  };
}

/**
 * get array of API keys for a filters value(s)
 * @param handle
 * @param value
 * @returns {string[]|*[]|*}
 */
function mapFilterValuesToApiQueryKeys(handle, value) {
  if (!value) return [];
  if (Array.isArray(value)) {
    return value.map((v) => `${handle}:${v}`);
  }
  // Singular value
  return [`${handle}:${value}`];
}

/**
 * get array of API keys for all filters
 * @param filterState
 * @returns {unknown[]}
 */
function getFilters(filterState) {
  return Object.entries(filterState)
    .flatMap(([...filter]) => mapFilterValuesToApiQueryKeys(...filter));
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
    // map query parameters to state to state
    state.filters = filters.reduce(
      (p, { handle }) => ({ ...p, [handle]: params[handle] || initialQuery.filters[handle] }),
      {},
    );
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
