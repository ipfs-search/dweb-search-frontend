// Mixin providing querystring-based navigation for search based on store.

import store from '@/store';

export default {
  mounted() {
    // Set vuex query from route query parameters
    store.commit('search/setRouteParams', this.$route.query);
    store.dispatch('search/search');
  },

  beforeRouteUpdate(to, from, next) {
    // Perform search after update
    store.dispatch('search/search');
    next();
  },
};
