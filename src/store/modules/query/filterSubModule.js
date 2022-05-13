import { Types } from '@/helpers/typeHelper';
import {
  typeFilterDefinition,
  languageFilterDefinition,
  sizeFilterDefinition,
  lastSeenFilterDefinition,
} from '@/store/modules/query/filterDefinitions';

import {
  selectFilter,
  multipleSelectFilter,
  typeFilter,
} from '@/store/modules/query/filterModuleGenerators';

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

const filterWidgetsGetter = (state, getters) => {
  console.log(state);
  switch (state.type.value) {
    case Types.text:
      return [
        getters['language/toComponentProps'],
        getters['size/toComponentProps'],
        getters['lastSeen/toComponentProps'],
      ];
    default:
      return [
        getters['size/toComponentProps'],
        getters['lastSeen/toComponentProps'],
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
    type: typeFilter(typeFilterDefinition),
    language: multipleSelectFilter(languageFilterDefinition),
    size: selectFilter(sizeFilterDefinition),
    lastSeen: selectFilter(lastSeenFilterDefinition),
  },
};
