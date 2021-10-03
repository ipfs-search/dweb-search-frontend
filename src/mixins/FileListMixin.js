import ListBase from '@/components/results/list/ListBase';
import store from '@/store';

export default {
  components: {
    ListBase,
  },
  computed: {
    results() {
      return store.state.results[this.$data.fileType].results;
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
    page: {
      get: () => store.state.query.page + 1,
      set(value) {
        store.dispatch('query/setPage', value - 1);
        this.$router.push({
          ...this.$route,
          query: store.getters['query/stateToQueryParams'],
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
    setType() {
      this.queryFileType = this.$data.fileType;
    },
    appendNextPage() {
      store.dispatch('query/incrementPage');

      this.$router.replace({
        ...this.$route,
        query: store.getters['query/stateToQueryParams'],
      });
    },
    /**
     * TODO FIXME: Issues w/ infinite scrolling:
     * - async; on scroll gets registered and fires 10 pageloads at once; make async/blocking
     * - duplicate results
     * - deeplink page N, load N pages - and scroll to position
     * -> history navigation is messed up
     * - occasional CORS errors from API - setup local proxy or something
     */
    onScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const nearBottom = window.innerHeight + 200 > offsetHeight - scrollTop;

      if (nearBottom) {
        this.appendNextPage();
      }
    },
  },
  watch: {
    queryFileType(next, previous) {
      if (previous === this.fileType && this.infinite) {
        document.removeEventListener('scroll', this.onScroll, true);
      }
      if (next === this.fileType && this.infinite) {
        document.addEventListener('scroll', this.onScroll, true);
      }
    },
    results() {
      // make sure that after loading the results, the page is filled until the bottom, if possible
      if (this.fileType === this.queryFileType && this.infinite) this.onScroll();
    },
  },
  mounted() {
    store.dispatch(`results/${this.fileType}/resetResults`);
    store.dispatch(`results/${this.fileType}/getResults`);
  },
  beforeDestroy() {
    document.removeEventListener('scroll', this.onScroll, true);
  },
};
