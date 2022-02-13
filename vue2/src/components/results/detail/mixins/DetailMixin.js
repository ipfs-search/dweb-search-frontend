import getResourceURL from '@/helpers/resourceURL';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    resourceURL() { return getResourceURL(this.file.hash); },
  },
};
