import ListBase from '@/components/results/list/ListBase.vue';

export default {
  components: {
    ListBase,
  },
  props: {
    results: {
      type: Object,
      required: true,
    },
  },
  methods: {
    goToDetailPage(hash) {
      this.$router.push({
        name: 'Detail',
        params: {
          fileType: this.fileType,
        },
        query: this.$route.query,
        hash: `#${hash}`,
      });
    },
  },
};
