export default {
  props: {
  },
  methods: {
    closeDetail() {
      const {query} = this.$route;
      delete query.detailType;
      this.$router.replace({
        name: 'Search',
        query,
      });
    },
  },
};
