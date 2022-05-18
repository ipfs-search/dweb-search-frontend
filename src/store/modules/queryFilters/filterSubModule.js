import { Types } from '@/helpers/typeHelper';
import {
  typeFilterDefinition,
  languageFilterDefinition,
  sizeFilterDefinition,
  lastSeenFilterDefinition,
} from '@/store/modules/queryFilters/filterDefinitions';

import {
  selectFilter,
  multipleSelectFilter, typeFilter,
} from '@/store/modules/queryFilters/filterModuleGenerators';

const TYPE = typeFilterDefinition.slug;
const LANGUAGE = languageFilterDefinition.slug;
const SIZE = sizeFilterDefinition.slug;
const LASTSEEN = lastSeenFilterDefinition.slug;

export const searchApiQuery = (state, getters) => Object.keys(state)
  .flatMap((filter) => getters[`${filter}/toSearchApi`])
  .filter((el) => !!el) // remove empty/undefined values before the join to avoid double spaces
  .join(' ');

const mutations = {
  /**
   * set the values of the filters to the given url query parameters. N.b., can not be unittested,
   * due to limitations of vuex.
   * @param state
   * @param routeParams
   */
  setRouteParams(state, routeParams) {
    // map query parameters to state
    Object.keys(state)
      .forEach((filterSlug) => {
        this.commit(`query/filters/${filterSlug}/setValue`, routeParams[filterSlug]);
      });
  },
};

/**
 * define which filter widgets are available in which conditions. Can be infinitely expanded
 * @param state
 * @param getters
 * @returns {[undefined, undefined]|[undefined, undefined, undefined]}
 */
const filterWidgetsGetter = (state, getters) => {
  switch (state.type.value) {
    case Types.text:
      return [
        getters[`${LANGUAGE}/toProps`],
        getters[`${SIZE}/toProps`],
        getters[`${LASTSEEN}/toProps`],
      ];
    default:
      return [
        getters[`${SIZE}/toProps`],
        getters[`${LASTSEEN}/toProps`],
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
    [TYPE]: typeFilter(typeFilterDefinition),
    [LANGUAGE]: multipleSelectFilter(languageFilterDefinition),
    [SIZE]: selectFilter(sizeFilterDefinition),
    [LASTSEEN]: selectFilter(lastSeenFilterDefinition),
  },
};
