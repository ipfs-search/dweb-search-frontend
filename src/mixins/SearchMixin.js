import { mapState } from 'vuex';

import store from '@/store';

// Mixin providing attributes and search() from the store.

export default {
  computed: {
    ...mapState('search', [
      'results',
      'query',
    ]),
    // https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    lastSeenFilter: {
      get() {
        return store.state.search.query.filters.lastSeen;
      },
      set(value) {
        store.commit('search/setLastSeenFilter', value);
        this.search();
      },
    },
    sizeFilter: {
      get() {
        return store.state.search.query.filters.size;
      },
      set(value) {
        console.log('doedoooo', value);
        store.commit('search/setSizeFilter', value);
        this.search();
      },
    },
    page: {
      get() {
        return store.state.search.query.page;
      },
      set(value) {
        store.commit('search/setPage', value);
        this.search();
      },
    },
    // https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    type: {
      get() {
        return store.state.search.query.type;
      },
      set(value) {
        store.commit('search/setType', value);
        this.search();
      },
    },
    query: {
      get() {
        return store.state.search.query.user_query;
      },
      set(value) {
        store.commit('search/setUserQuery', value);
        // Note that we don't search every time query changes!
      },
    },
  },

  methods: {
    // Perform navigation upon calling search().
    search() {
      this.$router.push({
        path: '/search',
        query: store.getters['search/stateToQueryParams'],
      });
    },
  },

};
