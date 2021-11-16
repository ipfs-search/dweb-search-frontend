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
  computed: {
    loadingError() {
      return this.$store.state.results[this.fileType].error;
    },
    loading() {
      return this.$store.state.results[this.fileType].loading;
    },
    stateQuery() {
      const {
        // eslint-disable-next-line camelcase
        filters, type, user_query, page,
      } = store.state.query;
      return {
        ...filters.size,
        lastSeen: filters.lastSeen,
        type,
        user_query,
        page,
      };
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
    // finite
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
    stateQuery: {
      /**
       * This watcher gets triggered on a change of one of the search parameters,
       * other than the page.
       * @param query
       * @param lastQuery
       */
      handler(query, lastQuery) {
        if (lastQuery
          && Object.keys(query).filter((key) => key !== 'page')
            .every((key) => query[key] === lastQuery[key])
          && Object.keys(lastQuery).filter((key) => key !== 'page')
            .every((key) => query[key] === lastQuery[key])
          && this.infinite && query.page !== lastQuery.page
        ) {
          return;
        }

        console.debug('FileListMixin watch stateQuery: receiving new query parameters', query, lastQuery);
        store.commit(`results/${this.fileType}/clearResults`);

        if (this.infinite) {
          this.getInfiniteResults()
            .then(this.infiniteScroll)
            .then(this.scrollDown);
        } else {
          apiSearchQueryString({ type: this.fileType })
            .then((results) => {
              store.commit(`results/${this.fileType}/appendResults`, results);
            })
            .catch(console.error);
        }
      },
      immediate: true,
    },
  },
};
