import { Types } from "@/helpers/typeHelper";
import {
  typeFilterDefinition,
  documentsSubTypeFilter,
  audioSubTypeFilter,
  languageFilterDefinition,
  sizeFilterDefinition,
  lastSeenFilterDefinition,
  imagesSubTypeFilter,
} from "@/store/modules/queryFilters/filterDefinitions";

import {
  selectFilterModule,
  typeFilterModule,
} from "@/store/modules/queryFilters/filterVuexModuleGenerators";

const TYPE = typeFilterDefinition.slug;
const DOCTYPE = documentsSubTypeFilter.slug;
const AUDIOTYPE = audioSubTypeFilter.slug;
const IMAGETYPE = imagesSubTypeFilter.slug;
const LANGUAGE = languageFilterDefinition.slug;
const SIZE = sizeFilterDefinition.slug;
const LASTSEEN = lastSeenFilterDefinition.slug;

const mutations = {
  /**
   * set the values of the filters to the given url query parameters. N.b., can not be unittested,
   * due to limitations of vuex.
   * @param state
   * @param routeParams
   */
  setRouteParams(state, routeParams) {
    // map query parameters to state
    Object.keys(state).forEach((filterSlug) => {
      this.commit(`query/filters/${filterSlug}/setValue`, routeParams[filterSlug]);
    });
  },
};

export default {
  namespaced: true,
  mutations,
  getters: {
    applicableFilters: (state) => {
      switch (state.type.value) {
        case Types.audio:
          return [AUDIOTYPE, SIZE, LASTSEEN];
        case Types.images:
          return [IMAGETYPE, SIZE, LASTSEEN];
        case Types.text:
          return [DOCTYPE, LANGUAGE, SIZE, LASTSEEN];
        default:
          return [SIZE, LASTSEEN];
      }
    },
    filterWidgets: (state, getters) =>
      getters.applicableFilters.map((filter) => getters[`${filter}/toProps`]),
  },
  modules: {
    [TYPE]: typeFilterModule(typeFilterDefinition),
    [DOCTYPE]: selectFilterModule(documentsSubTypeFilter),
    [AUDIOTYPE]: selectFilterModule(audioSubTypeFilter),
    [IMAGETYPE]: selectFilterModule(imagesSubTypeFilter),
    [LANGUAGE]: selectFilterModule(languageFilterDefinition),
    [SIZE]: selectFilterModule(sizeFilterDefinition),
    [LASTSEEN]: selectFilterModule(lastSeenFilterDefinition),
  },
};
