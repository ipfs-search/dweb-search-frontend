import Vue from 'vue';
import Vuex from 'vuex';
import player from '@/store/modules/player.module';
import SearchQuery from './modules/SearchQuery';
import SearchResults from './modules/SearchResults';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    // TOOD: Use central helper listing types, create store
    // for each dynimcally.
    player,
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
