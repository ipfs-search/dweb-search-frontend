// import { mapState } from 'vuex';

import store from '@/store';

// Mixin providing attributes and search() from the store.

export default {
  computed: {
    // ...mapState([
    //   'results',
    // ]),
    // https://vuex.vuejs.org/guide/forms.html#two-way-computed-property
    // page: {
    //   get() {
    //     return store.state.query.page;
    //   },
    //   set(value) {
    //     store.commit('query/setPage', value);
    //     this.search();
    //   },
    // },
  },

  methods: {
    // Perform navigation upon calling search().
    search() {
      this.$router.push({
        ...this.$route,
        query: store.getters['query/stateToQueryParams'],
      });
    },
  },

};
