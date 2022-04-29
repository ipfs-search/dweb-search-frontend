import { Types } from '@/helpers/typeHelper';
import filterDefinitions from './filterDefinitions';

export const searchApiQuery = (state) => Object.values(state)
  .flatMap((filter) => filter.searchApiQuerySnippet)
  .filter((el) => !!el) // remove empty strings before the join
  .join(' ');

const mutations = {
  setRouteParams(state, routeParams) {
    // map query parameters to state
    Object.keys(state)
      .forEach((filter) => {
        this.commit(`query/filters/${filter}/setValue`, routeParams[filter]);
      });
  },
};

const filterWidgetsGetter = (state) => {
  switch (state.typeFilter.value) {
    case Types.text:
      return [
        state.languageFilter,
        state.sizeFilter,
        state.lastSeenFilter,
      ];
    default:
      return [
        state.sizeFilter,
        state.lastSeenFilter,
      ];
  }
};

export default {
  namespaced: true,
  mutations,
  getters: {
    filterWidgets: filterWidgetsGetter,
    searchApiQuery,
  },
  modules: {
    type: filterDefinitions.typeFilter,
    language: filterDefinitions.languageFilter,
    size: filterDefinitions.sizeFilter,
    lastSeen: filterDefinitions.lastSeenFilter,
  },
};
