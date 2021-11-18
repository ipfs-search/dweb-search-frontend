import ListBase from '@/components/results/list/ListBase';
import store from '@/store';
import getResourceURL from '@/helpers/resourceURL';
import { batchSize } from '@/helpers/ApiHelper';

/**
 * this mixin makes file lists load their results and allows navigation
 */
export default {
  components: {
    ListBase,
  },
  computed: {
    // N.b. mapGetters does not work here because of dynamic module loading (this.$data.fileType)
    loading() {
      return store.getters[`results/${this.fileType}/loading`];
    },
    error() {
      return store.getters[`results/${this.fileType}/error`];
    },
    resultsTotal() {
      return store.getters[`results/${this.fileType}/resultsTotal`];
    },
    results() {
      const pageResults = store.getters[`results/${this.fileType}/pageResults`];
      return pageResults(Number(this.$route.query.page) || 1);
    },
    shownHits() {
      if (this.$route.query.type === this.$data.fileType) {
        return this.results;
      }
      return this.results.slice(0, this.shortList);
    },
    pageCount() {
      return Math.ceil(this.resultsTotal / batchSize);
    },
    page: {
      get() { return Number(this.$route.query.page); },
      set(value) {
        this.$router.push({
          ...this.$route,
          query: {
            ...this.$route.query,
            page: value,
          },
        });
      },
    },
  },
  methods: {
    getResourceURL,
    goToDetailPage(index) {
      this.$router.push({
        name: 'Detail',
        params: {
          fileType: this.$data.fileType,
          fileHash: this.shownHits[index].hash,
          selectedIndex: index,
        },
        query: this.$route.query,
      });
    },

  },
  watch: {
    '$route.query': {
      /**
       * get/update data from the cache
       * @param query
       * @param lastQuery
       */
      handler(query) {
        store.dispatch(`results/${this.fileType}/fetchPage`,
          { page: Number(query.page) || 1 })
          .catch(console.error);
        // }
      },
      immediate: true,
    },
  },
};
