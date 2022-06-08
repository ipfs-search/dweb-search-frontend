import createStore from 'vuex';
import localStorage from '@/store/modules/localStorage';
import { Types } from '@/helpers/typeHelper';
import query from './modules/query';
import SearchResults from './modules/SearchResults';

const storeConfiguration = {
  modules: {
    localStorage,
    query,
    // TODO: Rename 'results' to 'search' to cleanup weird results.results.
    results: {
      namespaced: true,
      modules: {
        [Types.text]: SearchResults(Types.text),
        [Types.images]: SearchResults(Types.images),
        [Types.audio]: SearchResults(Types.audio),
        [Types.video]: SearchResults(Types.video),
        [Types.directories]: SearchResults(Types.directories),
        [Types.other]: SearchResults(Types.other),
      },
    },
  },
  // https://v3.vuex.vuejs.org/guide/strict.html#development-vs-production
  // N.b. this won't work with vite
  strict: !import.meta.env.PROD,
};

export const store = createStore(storeConfiguration);
