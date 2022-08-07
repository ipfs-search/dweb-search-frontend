import { Types } from "@/helpers/typeHelper";
import { typeFilterDefinition } from "./filterDefinitions/typeFilter";
import { documentsTypeFilterDefinition } from "./filterDefinitions/documentsTypeFilter";
import { imagesTypeFilterDefinition } from "./filterDefinitions/imagesTypeFilter";
import { audioTypeFilterDefinition } from "./filterDefinitions/audioTypeFilter";
import { videoTypeFilterDefinition } from "./filterDefinitions/videoTypeFilter";
import { otherTypeFilterDefinition } from "./filterDefinitions/otherTypeFilter";
import { languageFilterDefinition } from "./filterDefinitions/languageFilter";
import { sizeFilterDefinition } from "./filterDefinitions/sizeFilter";
import { lastSeenFilterDefinition } from "./filterDefinitions/lastSeenFilter";
import {
  selectFilterModule,
  typeFilterModule,
} from "@/store/modules/queryFilters/filterVuexModuleGenerators";

const TYPE = typeFilterDefinition.slug;
const DOCTYPE = documentsTypeFilterDefinition.slug;
const AUDIOTYPE = audioTypeFilterDefinition.slug;
const VIDEOTYPE = videoTypeFilterDefinition.slug;
const IMAGETYPE = imagesTypeFilterDefinition.slug;
const OTHERTYPE = otherTypeFilterDefinition.slug;
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
        case Types.text:
          return [DOCTYPE, LANGUAGE, SIZE, LASTSEEN];
        case Types.audio:
          return [AUDIOTYPE, SIZE, LASTSEEN];
        case Types.video:
          return [VIDEOTYPE, SIZE, LASTSEEN];
        case Types.images:
          return [IMAGETYPE, SIZE, LASTSEEN];
        case Types.other:
          return [OTHERTYPE, SIZE, LASTSEEN];
        default:
          return [SIZE, LASTSEEN];
      }
    },
    filterWidgets: (state, getters) =>
      getters.applicableFilters.map((filter) => getters[`${filter}/toProps`]),
    anyFiltersApplied: (state, getters) =>
      getters.applicableFilters.some((filter) => !getters[`${filter}/toProps`].isDefault),
  },
  modules: {
    [TYPE]: typeFilterModule(typeFilterDefinition),
    [DOCTYPE]: selectFilterModule(documentsTypeFilterDefinition),
    [AUDIOTYPE]: selectFilterModule(audioTypeFilterDefinition),
    [VIDEOTYPE]: selectFilterModule(videoTypeFilterDefinition),
    [IMAGETYPE]: selectFilterModule(imagesTypeFilterDefinition),
    [OTHERTYPE]: selectFilterModule(otherTypeFilterDefinition),
    [LANGUAGE]: selectFilterModule(languageFilterDefinition),
    [SIZE]: selectFilterModule(sizeFilterDefinition),
    [LASTSEEN]: selectFilterModule(lastSeenFilterDefinition),
  },
};
