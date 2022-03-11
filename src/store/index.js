import Vue from 'vue';
import Vuex from 'vuex';
import localStorage from '@/store/modules/localStorage';
import { Types } from '@/helpers/typeHelper';
import SearchQuery from './modules/SearchQuery';
import SearchResults from './modules/SearchResults';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    localStorage,
    query: SearchQuery,
    // TODO: Rename 'results' to 'search' to cleanup weird results.results.
    results: {
      namespaced: true,
      modules: {
        [Types.text]: SearchResults(Types.text),
        [Types.images]: SearchResults(Types.images),
        [Types.audio]: SearchResults(Types.audio),
        [Types.video]: SearchResults(Types.video),
        [Types.directories]: SearchResults(Types.directories),
      },
    },
  },
  strict: true,
});
