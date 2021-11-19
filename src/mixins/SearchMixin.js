import store from '@/store';

export default {
  methods: {
    // TODO: Make method less hacky and better/less ubiquitous name
    /**
     * push new route query and execute search lookup with page=0
     * should be called when a change to the search parameters is requested
     * @param newQuery
     * @param page? 1-based page number.
     * @param method? either 'push' or 'replace', to set router behavior.
     */
    search(newQuery, page = 1, method = 'push') {
      this.$router[method]({
        name: 'Search',
        query: {
          ...this.$route.query,
          ...newQuery,
          page,
        },
      });
      store.commit('query/setRouteParams', this.$route.query);
    },
  },

};
