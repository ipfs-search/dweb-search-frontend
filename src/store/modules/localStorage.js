export default {
  namespaced: true,
  state: {
    blurGraphicContent: localStorage.blurGraphicContent !== 'false',
  },
  mutations: {
    setBlurGraphicContent(state, value) {
      state.blurGraphicContent = value;
      localStorage.blurGraphicContent = value;
    },
  },
};
