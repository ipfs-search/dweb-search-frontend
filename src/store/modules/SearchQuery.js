import filterDefinitions from '@/components/helpers/filterDefinitions';

const defaultQuery = {
  searchPhrase: '',
  type: 'any',
  page: 1,
  // map filters to initial values using fancy reducer
  filters: filterDefinitions.reduce(
    (p, { queryParam, items }) => ({ ...p, [queryParam]: items.find((i) => i.initial)?.value }),
    {},
  ),
};

/**
 * get array of API keys for a filters value(s)
 * @param param
 * @param value
 * @returns {string[]}
 */
function mapFilterValuesToApiQueryKeys(param, value) {
  if (!value) return [];
  const { multiple, apiKey, items } = filterDefinitions.find(({ queryParam }) => queryParam === param);
  const apiEntries = items
    .filter((item) => (multiple ? value.includes(item.value) : value === item.value))
    .flatMap(({ apiEntry }) => apiEntry);
  console.log(param, value, apiEntries);
  // multiple means: or
  if (multiple) {
    return [`${apiKey}:("${apiEntries.join('" OR "')}")`];
  }
  return apiEntries.map((apiEntry) => `${apiKey}:${apiEntry}`);
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
  apiQueryString,
};

const mutations = {
  // Mutations relating to query composition
  setRouteParams(state, params) {
    // map query parameters to state
    // Inverse of getters.queryParams
    state.searchPhrase = params.q || defaultQuery.searchPhrase;
    state.type = params.type || defaultQuery.type;
    state.page = Number(params.page) || defaultQuery.page;
    filterDefinitions.forEach(({ queryParam }) => {
      state.filters[queryParam] = params[queryParam] ?? defaultQuery.filters[queryParam];
    });
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

const state = () => ({ ...defaultQuery }); // Copy fields, prevent reference.

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
