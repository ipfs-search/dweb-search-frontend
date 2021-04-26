// Mixin providing querystring-based navigation for search based on store.

import store from '@/store';

export default {
  mounted() {
    // Set vuex query from route query parameters
    store.commit('query/setRouteParams', this.$route.query);
  },

  beforeRouteUpdate(to, from, next) {
    // Perform search after update
    // BUG: Doesn't get called on first page load
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

    next();
  },
};
