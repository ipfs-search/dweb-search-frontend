import ListBase from '@/components/results/list/ListBase';
import store from '@/store';
import { apiSearchQueryString } from '@/helpers/ApiHelper';
import getResourceURL from '@/helpers/resourceURL';

/**
 * this mixin makes file lists load their results and allows navigation
 */
export default {
  components: {
    ListBase,
  },
  data() {
    return {
      loading: false,
    };
  },
  computed: {
    loadingError() {
      return this.$store.state.results[this.fileType].error;
    },
    results() {
      return store.state.results[this.$data.fileType].results;
    },
    shownHits() {
      if (this.$route.query.type === this.$data.fileType) {
        return this.results.hits;
      }
      return this.results.hits.slice(0, this.shortList);
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
       * This watcher retrieves new data for the query, and gets triggered on
       * a change of one of the search parameters
       * @param query
       * @param lastQuery
       */
      // TODO: inject/override logic for infinite scrolling
      handler(query, lastQuery) {
        // if (lastQuery
        //   && Object.keys(query).filter((key) => key !== 'page')
        //     .every((key) => query[key] === lastQuery[key])
        //   && Object.keys(lastQuery).filter((key) => key !== 'page')
        //     .every((key) => query[key] === lastQuery[key])
        //   && this.infinite && query.page !== lastQuery.page
        // ) {
        //   return;
        // }

        console.debug('FileListMixin watch stateQuery: receiving new query parameters', query, lastQuery);
        store.commit(`results/${this.fileType}/clearResults`);

        // if (this.infinite) {
        //   this.getInfiniteResults()
        //     .then(this.infiniteScroll)
        //     .then(this.scrollDown);
        // } else {
        this.loading = true;
        apiSearchQueryString({ type: this.fileType })
          .then((results) => {
            store.commit(`results/${this.fileType}/appendResults`, results);
            this.loading = false;
          })
          .catch(console.error);
        // }
      },
      immediate: true,
    },
  },
};
