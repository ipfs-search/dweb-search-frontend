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
};
