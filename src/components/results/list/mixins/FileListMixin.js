import ListBase from '@/components/results/list/ListBase.vue';
import store from '@/store';
import getResourceURL from '@/helpers/resourceURL';
import { batchSize } from '@/helpers/ApiHelper';
import { enterSearchQuery } from '@/helpers/routerHelper';

const resultsTotalMax = 10000;

// TODO: refactor this and turn into composition-api module
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
      const error = store.getters[`results/${this.fileType}/error`];
      if (error) console.error('Error loading results', error);
      return error;
    },
    resultsTotal() {
      const total = store.getters[`results/${this.fileType}/resultsTotal`];
      if (total === resultsTotalMax) {
        return '10000+';
      }
      return total;
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
      return Math.ceil(store.getters[`results/${this.fileType}/resultsTotal`] / batchSize);
    },
    queryPage: {
      get() { return Number(this.$route.query.page); },
      set(value) { enterSearchQuery(this.$route.query, value); },
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

    /**
     * specific for paginated file lists
     * @param query
     */
    handleQueryChange() {
      store.dispatch(`results/${this.fileType}/fetchPage`, { page: this.queryPage || 1 });
    },
  },
  watch: {
    '$route.query': {
      /**
       * get/update data from the cache; note that the handler is different for infinite scrolling.
       * @param query
       * @param lastQuery
       */
      handler(query) {
        this.handleQueryChange(query);
      },
      immediate: true,
    },
  },
};
