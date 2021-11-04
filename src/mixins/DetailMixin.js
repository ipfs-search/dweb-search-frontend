import { resourceURL } from '@/helpers/resourceHelper';

export default {
  beforeCreate() {
    this.resourceURL = resourceURL;
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    fileResource() {
      return resourceURL(this.file.hash);
    },
  },
};
