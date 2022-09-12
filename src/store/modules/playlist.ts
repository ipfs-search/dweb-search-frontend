import { StoreOptions } from "vuex";
import { IFile } from "../../interfaces/IFile";
import { IPlaylist } from "../../interfaces/IPlaylist";

export interface IPlaylistStoreState {
  // Currently we use 1 playlist; playlists[0]
  playlists: IPlaylist[];
}

const defaultPlaylist = { entries: [] };

// Can not use explicit type, it messes with cross-module calls
export default <StoreOptions<any>>{
  namespaced: true,
  state: (): IPlaylistStoreState => {
    try {
      return {
        playlists: [JSON.parse(localStorage.playlist ?? null) ?? defaultPlaylist],
      };
    } catch (e) {
      return { playlists: [defaultPlaylist] };
    }
  },
  mutations: {
    setPlaylist(state, playlist: IPlaylist) {
      state.playlists[0] = playlist;
      this.commit("localStorage/setPlaylist", state.playlists[0]);
    },
    enqueue(state, entries: IFile | IFile[]) {
      state.playlists[0].entries = state.playlists[0].entries.concat(entries);
      this.commit("localStorage/setPlaylist", state.playlists[0]);
    },
  },
  getters: {
    getPlaylist(state, getters, rootState) {
      return state.playlists?.[0] ?? rootState.localStorage.playlist;
    },
  },
};
