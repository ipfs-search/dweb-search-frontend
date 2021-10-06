// import { mapState } from 'vuex';

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
    /**
     * push new route query and execute search lookup with page=0
     * should be called when a change to the search parameters is requested
     * @param newQuery
     */
    search(newQuery, page = 1) {
      this.$router.push({
        name: 'Search',
        query: {
          ...this.$route.query,
          ...newQuery,
          page,
        },
      });
    },
  },

};
