// eslint-disable-next-line import/no-named-as-default
import filters from '@/store/modules/filterSubModule';

const defaultQuery = {
  searchPhrase: '',
  page: 1,
};

const mutations = {
  setRouteParams(state, routeParams) {
    // map query parameters to state
    state.searchPhrase = routeParams.q || defaultQuery.searchPhrase;
    state.page = Number(routeParams.page) || defaultQuery.page;
    this.commit('query/filters/setRouteParams', routeParams);
  },
};

const state = () => ({ ...defaultQuery }); // Copy fields, prevent reference.

export default {
  namespaced: true,
  state,
  mutations,
  modules: {
    filters,
  },
};
