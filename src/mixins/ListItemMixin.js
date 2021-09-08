import ThumbnailMixin from '@/mixins/ThumbnailMixin';
import durationToColor from '@/filters/durationToColor';

export default {
  mixins: [ThumbnailMixin],
  filters: {
    durationToColor,
  },
  props: {
    item: {
      required: true,
      type: Object,
    },
  },
  methods: {
    goToDetailPage() {
      this.$router.push({ path: '/search/detail' });
    },
  },
};
