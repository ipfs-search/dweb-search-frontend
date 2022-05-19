import filters from '@/store/modules/queryFilters/filterSubModule';

const baseState = {
  searchPhrase: '',
  page: 1,
};

export default {
  namespaced: true,
  state: {
    ...baseState,
  },
  mutations: {
    setRouteParams(state, routeParams) {
      // map query parameters to state
      state.searchPhrase = routeParams.q || baseState.searchPhrase;
      state.page = Number(routeParams.page) || baseState.page;
      this.commit('query/filters/setRouteParams', routeParams);
    },
  },
  getters: {
    apiQueryString: (state, getters) => (fileType) => {
      const filterQuery = Object.keys(state.filters)
        .filter((filter) => getters['filters/applicableFilters'].includes(filter))
        .map((filter) => getters[`filters/${filter}/toSearchQuery`])
        .filter((el) => !!el); // remove empty/undefined values before the join to avoid double spaces

      return [
        state.searchPhrase,
        getters['filters/type/toSearchQuery'](fileType),
        ...filterQuery,
      ].join(' ');
    },
  },
  modules: {
    filters,
  },
};
