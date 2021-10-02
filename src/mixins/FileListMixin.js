import ListBase from '@/components/results/list/ListBase';
import store from '@/store';

export default {
  components: {
    ListBase,
  },
  computed: {
    results() {
      return this.$store.state.results[this.$data.fileType].results;
    },
    queryFileType: {
      get() {
        return store.state.query.type;
      },
      set(value) {
        store.commit('query/setType', value);
        this.$router.push({
          path: '/search',
          query: store.getters['query/stateToQueryParams'],
        });
      },
    },
    showedHits() {
      if (this.queryFileType === this.$data.fileType) {
        return this.results.hits;
      }
      return this.results.hits.slice(0, this.shortList);
    },
  },
  methods: {
    goToDetailPage(hash) {
      this.$router.push({
        name: 'Detail',
        params: {
          fileType: this.$data.fileType,
        },
        query: this.$route.query,
        hash: `#${hash}`,
      });
    },
    setType() {
      this.queryFileType = this.$data.fileType;
    },
    loadMore() {
      this.$store.dispatch('query/incrementPage');

      this.$router.replace({
        ...this.$route,
        query: this.$store.getters['query/stateToQueryParams'],
      });
    },
  },
};
