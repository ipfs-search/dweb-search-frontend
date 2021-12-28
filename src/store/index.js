import Vue from 'vue';
import Vuex from 'vuex';
import localStorage from '@/store/modules/localStorage';
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
        text: SearchResults('text'),
        images: SearchResults('images'),
        audio: SearchResults('audio'),
        video: SearchResults('video'),
        directories: SearchResults('directories'),
      },
    },
  },
  strict: true,
});
