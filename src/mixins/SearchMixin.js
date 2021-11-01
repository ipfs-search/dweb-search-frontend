export default {
  methods: {
    /**
     * // TODO: move this file to helper and remove this file
     * push new route query and execute search lookup with page=0
     * should be called when a change to the search parameters is requested
     * @param newQuery
     */
    search(newQuery, page = 1) {
      console.log('router', this.$router);
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
