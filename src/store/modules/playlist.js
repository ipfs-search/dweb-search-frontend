export default {
  namespaced: true,
  state: {
    playlists: [],
  },
  mutations: {
    setPlaylist(state, { entries }) {
      state.playlists[0] = {
        entries,
      };
    },
  },
  getters: {
    getPlaylist(state) {
      return state.playlists[0];
    },
  },
};
