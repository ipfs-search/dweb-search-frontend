// Mixin providing querystring-based navigation for search based on store.

import store from '@/store';

function dispatchSearch() {
  // TODO: Move to store, perhaps.
  // This logic might belong in store.
  switch (store.state.query.type) {
    // TODO: Use modular/centralised type list here!
    case 'text':
      store.dispatch('results/text/getResults');
      break;
    case 'images':
      store.dispatch('results/images/getResults');
      break;
    case 'audio':
      store.dispatch('results/audio/getResults');
      break;
    case 'video':
      store.dispatch('results/video/getResults');
      break;
    case 'directories':
      store.dispatch('results/video/getResults');
      break;
    default:
      // 'any'
      store.dispatch('results/text/getResults');
      store.dispatch('results/images/getResults');
      store.dispatch('results/audio/getResults');
      store.dispatch('results/video/getResults');
      store.dispatch('results/directories/getResults');
  }
}

export default {
  // TODO: fix the search and navigation flow of this app
  // There is redundancy across the query in vuex and in the route
  // new searches are dispatched at all kinds of moments; in mounted, in navigation, where else?
  // there are a bunch of unnecessary mixins (such as this one)
  // better would be:
  // have each of the filetypes-list take care of their own api calls
  // add search hooks to changing of the query, not on every route update
  // remove the query from the vuex store
  // clear separation between the modules of the store

  // less bugs, less maintenance

  mounted() {
    // Set vuex query from route query parameters
    store.commit('query/setRouteParams', this.$route.query);
    dispatchSearch();
  },

  beforeRouteEnter(to, from, next) {
    // Perform search after update
    // N.b. this is not the ideal moment to load everything!
    dispatchSearch();
    next();
  },
};
