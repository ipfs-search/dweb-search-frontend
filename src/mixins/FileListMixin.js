import ListBase from '@/components/results/list/ListBase';
import store from '@/store';

const infiniteScrollMargin = 200;
/**
 * this mixin makes file lists load their results and allows navigation
 */
export default {
  beforeCreate() {
    /**
     * get all pages of results up to the query parameter page
     * @param pager
     */
    this.getInfiniteResults = async function () {
      const { page } = store.state.query;
      this.loadedPages = Math.ceil(this.results.hits.length / (this.results.page_size || 1)) || 0;

      while (this.loadedPages < page && (!this.results.page_count || this.loadedPages < this.results.page_count)) {
        // eslint-disable-next-line no-await-in-loop
        await this.appendNextPage();
      }
      // TODO: Error handling in multiple page loading
    };
    const scrollQueryPage = this.$route.query.page;
    this.scrollDown = () => window.scrollTo({
      top: scrollQueryPage > 1 ? Math.floor((document.documentElement.offsetHeight / this.loadedPages) * scrollQueryPage) : 0,
      left: 0,
      behavior: 'smooth',
    });
  },
  created() {
    console.debug('FileListMixin created: committing route query to store', this.$route.query);
    store.commit('query/setRouteParams', this.$route.query);
  },
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
    appendNextPage() {
      // Naive page loaded tracker; note that it does not guarantee correct order of loaded pages
      // it has some protection against loading pages before another page load finished
      // Also does not deal well with errors coming back from API
      // It assumes they all come back properly and counts the pages
      if (this.loadingNextPage || (this.results.page_count && this.loadedPages >= this.results.page_count)) return null;

      this.loadingNextPage = true;
      return store.dispatch(`results/${this.fileType}/getResults`, {
        page: this.loadedPages + 1,
      })
        .then((results) => {
          if (results.hits && results.hits.length > 0) {
            this.loadedPages += 1;
            console.debug('now we have loadedPages', this.loadedPages);
          }
          console.debug('appendNextPage success for page', this.loadedPages, results);
          this.loadingNextPage = false;
          return results;
        });
    },
    /**
     * See if the the page scrolled so far down that empty space opens up at the bottom, and trigger
     * appendPage if this is the case;
     *
     * FIXME - duplicate results from API
     * TODO - occasional CORS errors from API - setup local proxy or something,
     *      (unclear why it is occasional only)
     * TODO: split infinite scrolling logic and paged into 2 different mixins
     */
    infiniteScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const nearBottom = window.innerHeight + infiniteScrollMargin > offsetHeight - scrollTop;

      const scrollPage = Math.floor(this.loadedPages * (scrollTop / offsetHeight)) + 1;
      if (store.state.query.page !== scrollPage) {
        this.$router.replace({
          ...this.$route,
          query: {
            ...this.$route.query,
            page: scrollPage,
          },
        });
      }
      if (nearBottom && !this.loadingNextPage) {
        return this.appendNextPage();
      }
      return null;
    },
  },
  watch: {
    /**
     * when route changes due to inpage navigation, update the event listeners for the filelist
     */
    // infinite
    '$store.state.query.type': {
      handler(next, previous) {
        if (previous === this.fileType && this.infinite) {
          document.removeEventListener('scroll', this.infiniteScroll, true);
        }
        if (next === this.fileType && this.infinite) {
          document.addEventListener('scroll', this.infiniteScroll, true);
        }
      },
      immediate: true,
    },
    stateQuery: {
      /**
       * this watcher gets triggered on a change of one of the search parameters, other than the page
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
        store.dispatch(`results/${this.fileType}/resetResults`);

        if (this.infinite) {
          this.getInfiniteResults()
            .then(this.infiniteScroll)
            .then(this.scrollDown);
        } else {
          store.dispatch(`results/${this.fileType}/getResults`, store.state.query.page || 1);
        }
      },
    },
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.infiniteScroll, true);
  },
};
