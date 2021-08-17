import { mapState } from 'vuex';

import store from '@/store';

// Mixin providing attributes and search() from the store.

export default {
  computed: {
    ...mapState([
      'results',
    ]),
    // https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    lastSeenFilter: {
      get() {
        return store.state.query.filters.lastSeen;
      },
      set(value) {
        store.commit('query/setLastSeenFilter', value);
        this.search();
      },
    },
    sizeFilter: {
      get() {
        return store.state.query.filters.size;
      },
      set(value) {
        store.commit('query/setSizeFilter', value);
        this.search();
      },
    },
    page: {
      get() {
        return store.state.query.page;
      },
      set(value) {
        store.commit('query/setPage', value);
        this.search();
      },
    },
    type: {
      get() {
        return store.state.query.type;
      },
      set(value) {
        store.commit('query/setType', value);
        this.search();
      },
    },
    query: {
      get() {
        return store.state.query.user_query;
      },
      set(value) {
        store.commit('query/setUserQuery', value);
        // Note that we don't search every time query changes!
      },
    },
  },

  methods: {
    // Perform navigation upon calling search().
    search() {
      this.$router.push({
        path: '/search',
        query: store.getters['query/stateToQueryParams'],
      });
    },
  },

};
