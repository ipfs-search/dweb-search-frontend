import { Module } from "vuex";
import { IPlaylist } from "@/interfaces/IPlaylist";

export interface IPlaylistStoreState {
  activePlaylist?: number | undefined;
  playlists: IPlaylist[];
}

const defaultPlaylist = { entries: [] };

export default <Module<any, unknown>>{
  namespaced: true,
  state: (): IPlaylistStoreState => {
    try {
      return {
        activePlaylist: 0,
        playlists: [JSON.parse(localStorage.playlist ?? null) ?? defaultPlaylist],
      };
    } catch (e) {
      return { playlists: [defaultPlaylist] };
    }
  },
  mutations: {
    setPlaylist(state, playlist: IPlaylist) {
      state.playlists[state.activePlaylist || 0] = playlist;
      this.commit("localStorage/setPlaylist", state.playlists[state.activePlaylist || 0]);
    },
    setActivePlaylist(state, playlist: number) {
      state.activePlaylist = playlist;
    },
    setCurrentlyPlaying(state, index: number | undefined) {
      state.playlists[state.activePlaylist || 0].index = index;
      return index === undefined
        ? undefined
        : state.playlists[state.activePlaylist || 0].entries[index];
    },
  },
  getters: {
    getPlaylist(state, getters, rootState: any) {
      return state.playlists?.[state.activePlaylist || 0] ?? rootState.localStorage.playlist;
    },
  },
};
