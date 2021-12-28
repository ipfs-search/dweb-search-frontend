export default {
  computed: {
    blurGraphicContent: {
      get() {
        return this.$store.state.localStorage.blurGraphicContent;
      },
      set(value) {
        this.$store.commit('localStorage/setBlurGraphicContent', value);
      },
    },
  },
};
