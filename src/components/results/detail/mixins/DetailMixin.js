import getResourceURL from '@/helpers/resourceURL';

export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    resourceURL() { return getResourceURL(this.file.hash); },
  },
};
