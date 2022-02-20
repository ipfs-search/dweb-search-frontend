import nsfwClassifier from '@/helpers/nsfwClassifier';

export default {
  computed: {
    blurExplicitImages: {
      get() {
        return this.$store.state.localStorage.blurExplicitImages;
      },
      set(value) {
        this.$store.commit('localStorage/setBlurExplicitImages', value);
      },
    },
  },
  methods: {
    blurExplicit(hit) {
      return this.blurExplicitImages && nsfwClassifier.nsfw(hit.nsfwClassification);
    },
  },
};
