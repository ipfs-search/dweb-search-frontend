import ListBase from '@/components/results/list/ListBase';
import store from '@/store';

const infiniteScrollMargin = 200;
/**
 * this mixin makes file lists load their results and allows navigation
 */
export default {
  components: {
    ListBase,
  },
  computed: {
    results() {
      return store.state.results[this.$data.fileType].results;
    },
    showedHits() {
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
        props: {
          infinite: this.infinite,
        },
      });
    },
    // infinite
    appendNextPage() {
      // TODO: bring appendNextPage logic out of query store module
      store.dispatch('query/incrementPage');

      this.$router.replace({
        ...this.$route,
        query: store.getters['query/stateToQueryParams'],
      });
    },
    /**
     * Issues w/ infinite scrolling:
     * FIXME - duplicate results from API
     * FIXME - async; on scroll gets registered and fires some pageloads at once; make async/blocking
     * TODO - occasional CORS errors from API - setup local proxy or something,
     *      (unclear why it is occasional only)
     */
    // infinite
    onScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const nearBottom = window.innerHeight + infiniteScrollMargin > offsetHeight - scrollTop;

      if (nearBottom) {
        this.appendNextPage();
      }
    },
  },
  watch: {
    /**
     * when route changes due to inpage navigation, update the event listeners for the filelist
     */
    // infinite
    '$route.query.type': {
      handler(next, previous) {
        if (previous === this.fileType && this.infinite) {
          document.removeEventListener('scroll', this.onScroll, true);
        }
        if (next === this.fileType && this.infinite) {
          document.addEventListener('scroll', this.onScroll, true);
        }
      },
      immediate: true,
    },
    '$store.state.query': {
      handler(query, previousQuery) {
        console.debug('receiving results for updated query', query, previousQuery);
        if ((query.page !== previousQuery.page && !this.infinite) || Number(query.page) === 1) {
          store.dispatch(`results/${this.fileType}/resetResults`);
        }
        store.dispatch(`results/${this.fileType}/getResults`, query.page);
      },
      deep: true,
    },
  },
  mounted() {
    const { page } = store.state.query;
    // const { onScroll, fileType } = this;

    const scrollDown = () => window.scrollTo({
      top: document.documentElement.offsetHeight - window.innerHeight - infiniteScrollMargin,
      left: 0,
      behavior: 'smooth',
    });
    /**
     * get all pages of results up to the query parameter page
     * TODO: make multipage fetching parallel;
     * N.b.: not possible now because of getResults design;
     * results would not be commited in consistent order
     * @param pager
     */
    this.recursiveGetResults = function (pager = 1) {
      store.dispatch(`results/${this.fileType}/getResults`, pager)
        .then(() => {
          if (pager === page) {
            this.onScroll();
            scrollDown();
          } else (this.recursiveGetResults(pager + 1));
        });
    };
    // store.dispatch(`results/${this.fileType}/resetResults`);
    if (this.infinite) {
      const { results } = store.state.results[this.fileType];
      const loadedPages = Math.ceil(results.hits.length / (results.page_size || 1));
      console.debug(this.fileType, results, loadedPages);
      if (page > loadedPages) {
        this.recursiveGetResults(loadedPages + 1);
      } else {
        scrollDown();
      }
    } else {
      store.dispatch(`results/${this.fileType}/getResults`, store.state.query.page || 1);
    }
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll, true);
  },
};
