import filterDefinitions from '@/components/helpers/filterDefinitions';

const initialQuery = {
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
 * @param param
 * @param value
 * @returns {string[]|*[]|*}
 */
function mapFilterValuesToApiQueryKeys(param, value) {
  if (!value) return [];
  const { multiple, apiKey } = filterDefinitions.find(({ queryParam }) => queryParam === param);
  if (multiple) {
    return `${apiKey}:("${value.flat().join('" OR "')}")`;
  }
  if (Array.isArray(value)) {
    return value.map((v) => `${apiKey}:${v}`);
  }
  // Singular value
  return [`${apiKey}:${value}`];
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
    // map query parameters to state
    // Inverse of getters.queryParams
    state.searchPhrase = params.q || initialQuery.searchPhrase;
    state.type = params.type || initialQuery.type;
    state.page = Number(params.page) || initialQuery.page;
    state.filters = filterDefinitions.reduce(
      (p, { queryParam, multiple }) => (
        {
          ...p,
          // mapping of multiple-select values is complex.
          // todo: consider using item.text as the queryParam in stead of the item.value
          // because some values are arrays and these make mapping code more complex
          // eslint-disable-next-line no-nested-ternary
          [queryParam]: (multiple
            ? (typeof params[queryParam] === 'string'
              ? [params[queryParam].split(',')]
              : params[queryParam].map((value) => (typeof value === 'string'
                ? value.split(',') : value)))
            : params[queryParam]) || initialQuery.filters[queryParam],
        }
      ),
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
