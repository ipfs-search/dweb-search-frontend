import filters from '@/store/modules/filterSubModule';

const defaultQuery = {
  searchPhrase: '',
  page: 1,
};

/**
 * flatten query and filters into a string, but not the page or the filetype
 * @param state
 * @returns {string}
 */
function apiQueryString(state, getters) {
  return [state.searchPhrase, ...getters['filters/mapFiltersToApi']].join(' ');
}

const getters = {
  apiQueryString,
};

const mutations = {
  setRouteParams(state, routeParams) {
    // map query parameters to state
    state.searchPhrase = routeParams.q || defaultQuery.searchPhrase;
    state.page = Number(routeParams.page) || defaultQuery.page;
    Object.entries(state.filters).forEach(([slug, filter]) => {
      filter.select(routeParams[slug]);
    });
  },
};

const state = () => ({ ...defaultQuery }); // Copy fields, prevent reference.

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  modules: {
    filters,
  },
};
