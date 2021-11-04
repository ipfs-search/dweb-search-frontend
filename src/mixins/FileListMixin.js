import ListBase from '@/components/results/list/ListBase';
import store from '@/store';
import { maxPages } from '@/helpers/ApiHelper';
import getResourceURL from '@/helpers/resourceURL';

const infiniteScrollMargin = 200;
/**
 * this mixin makes file lists load their results and allows navigation
 * TODO: split infinite scrolling logic and paged into 2 different mixins
 */
export default {
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
    getResourceURL,
    goToDetailPage(hash) {
      this.$router.push({
        name: 'Detail',
        params: {
          fileType: this.$data.fileType,
          fileHash: hash,
        },
        query: this.$route.query,
      });
    },

    /**
     * get all pages of results up to the query parameter page
     * @param pager
     */
    async getInfiniteResults() {
      const { page } = store.state.query;
      this.loadedPages = Math.ceil(this.results.hits.length / (this.results.page_size || 1)) || 0;

      let errorCounter = 100;
      while (
        this.loadedPages < page
        // prevent loading the total amount of pages:
        && (!this.results.page_count || this.loadedPages < this.results.page_count)
        // prevent loading beyond API limit:
        && this.loadedPages < maxPages
        && errorCounter
      ) {
        let error = false;
        // eslint-disable-next-line no-await-in-loop
        await this.appendNextPage()
          .catch((e) => {
            console.error(e);
            error = true;
          });
        if (error) errorCounter -= 1;
      }
      if (errorCounter === 0) {
        console.error('Error limit reached in loading infinite results');
      }
    },

    scrollDown() {
      // Scroll down to the current page.
      const scrollQueryPage = this.$route.query.page;

      function getTop() {
        const { offsetHeight } = document.documentElement;

        if (scrollQueryPage > 1) {
          return Math.floor((offsetHeight / this.loadedPages) * scrollQueryPage);
        }

        return 0;
      }

      window.scrollTo({
        top: getTop(),
        left: 0,
        behavior: 'smooth',
      });
    },

    appendNextPage() {
      // Naive page loaded tracker; note that it does not guarantee correct order of loaded pages
      // it has some protection against loading pages before another page load finished
      // Also does not deal well with errors coming back from API
      // It assumes they all come back properly and counts the pages
      if (this.loadingNextPage) {
        return Promise.reject(Error('Already loading next page'));
      }
      if (this.loadedPages >= this.results?.page_count) {
        return Promise.reject(Error('No more pages to load'));
      }
      this.loadingNextPage = true;
      return store.dispatch(`results/${this.fileType}/getResults`, {
        page: this.loadedPages + 1,
      })
        .then((results, error) => {
          this.loadingNextPage = false;
          if (results?.hits?.length > 0) {
            this.loadedPages += 1;
          } else {
            throw Error('Error loading files', error);
          }
          return Promise.resolve(results);
        });
    },

    /**
     * See if the the page scrolled so far down that empty space opens up at the bottom, and trigger
     * appendPage if this is the case;
     *
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

        console.debug(
          'FileListMixin watch stateQuery: receiving new query parameters', query, lastQuery,
        );
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
