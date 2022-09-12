import { StoreOptions } from "vuex";
import { IPlaylist } from "../../interfaces/IPlaylist";

export interface IPlaylistStoreState {
  // Currently we use 1 playlist; playlists[0]
  playlists: IPlaylist[];
}

// Can not use explicit type, it messes with cross-module calls
export default <StoreOptions<any>>{
  namespaced: true,
  state: {
    playlists: [],
  },
  mutations: {
    setPlaylist(state, playlist: IPlaylist): void {
      state.playlists[0] = playlist;
      this.commit("localStorage/setPlaylist", state.playlists[0]);
    },
  },
  getters: {
    getPlaylist(state, getters, rootState) {
      return state.playlists?.[0] ?? rootState.localStorage.playlist;
    },
  },
};
