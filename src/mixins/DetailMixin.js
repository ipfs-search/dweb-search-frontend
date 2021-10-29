export default {
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    resourceURL() { return `https://gateway.ipfs.io/ipfs/${this.file.hash}`; },
  },
};
