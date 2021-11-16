import store from '@/store';
import { apiSearch, maxPages } from '@/helpers/ApiHelper';

const infiniteScrollMargin = 200;

export default {
  methods: {
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
      return apiSearch(store.getters['query/apiQueryString'], this.fileType, this.loadedPages)
        .then((results) => {
          store.commit(`results/${this.fileType}/clearResults`);
          store.commit(`results/${this.fileType}/appendResults`, results);
          this.loadingNextPage = false;
          if (results?.hits?.length > 0) {
            this.loadedPages += 1;
          }
          return Promise.resolve(results);
        })
        .catch(console.error);
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
    '$store.state.query.type': {
      handler(next, previous) {
        if (previous === this.fileType) {
          document.removeEventListener('scroll', this.infiniteScroll, true);
        }
        if (next === this.fileType) {
          document.addEventListener('scroll', this.infiniteScroll, true);
        }
      },
      immediate: true,
    },
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.infiniteScroll, true);
  },
};
