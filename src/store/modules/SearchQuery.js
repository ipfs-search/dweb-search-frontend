import filters from '@/store/modules/filterSubModule';

const defaultQuery = {
  searchPhrase: '',
  // todo: remove after properly arranging filter definitions
  type: 'any',
  page: 1,
};

/**
 * flatten query and filters into a string, but not the page or the filetype
 * @param state
 * @returns {string}
 */
function apiQueryString(state) {
  return [state.searchPhrase, ...state.filters.getters.mapFiltersToApi(state.filters)].join(' ');
}

const getters = {
  apiQueryString,
};

const mutations = {
  // Mutations relating to query composition
  setRouteParams(state, routeParams) {
    // map query parameters to state
    // Inverse of getters.queryParams
    state.searchPhrase = routeParams.q || defaultQuery.searchPhrase;
    // todo: remove after properly arranging filer definitions
    state.type = routeParams.type || defaultQuery.type;
    state.page = Number(routeParams.page) || defaultQuery.page;
    Object.keys(state.filters).forEach((filter) => {
      state.filters[filter].select(routeParams);
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
  modules: {
    filters,
  },
};
