import filterDefinitions from './filterDefinitions';

const searchApiQuery = (state) => Object.values(state)
  .map((filter) => filter.searchApiQuerySnippet)
  .join(' ');

const mutations = {
  setRouteParams(state, routeParams) {
    // map query parameters to state
    Object.values(state)
      .forEach((filter) => {
        filter.select(routeParams[filter.slug]);
      });
  },
};

const filterWidgetsGetter = (state) => {
  switch (state.typeFilter.value) {
    case 'text':
      return [
        state.languageFilter,
        state.typeFilter,
        state.lastSeenFilter,
      ];
    default:
      return [
        state.typeFilter,
        state.lastSeenFilter,
      ];
  }
};

export default {
  namespaced: true,
  state: filterDefinitions,
  mutations,
  getters: {
    filtersWidgets: filterWidgetsGetter,
    typeFilter: (state) => state.typeFilter,
    searchApiQuery,
  },
};
