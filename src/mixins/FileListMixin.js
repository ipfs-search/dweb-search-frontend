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
  },
  // props: {
  //   results: {
  //     type: Object,
  //     required: true,
  //   },
  // },
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
  },
};
