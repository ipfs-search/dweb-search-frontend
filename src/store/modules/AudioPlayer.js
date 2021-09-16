const AudioPlayer = {
  // namespaced: true,
  state: () => ({
    selectedAudioFile: undefined,
  }),
  mutations: {
    /*
    * fileObject: {
    *   title: String, required
    *   hash: String, required
    *   ...
    * }
     */
    selectAudioFile(state, fileObject) {
      // `state` is the local module state
      state.selectedAudioFile = fileObject;
    },
  },
  actions: {
    selectAudioFile({ commit }, fileObject) {
      commit('selectAudioFile', fileObject);
    },
  },
};

export default AudioPlayer;
