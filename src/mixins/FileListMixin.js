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
      console.log(hash);
      this.$router.push({
        name: 'Detail',
        query: {
          ...this.$route.query,
          type: this.fileType,
        },
        hash: `#${hash}`,
      });
    },
  },
};
