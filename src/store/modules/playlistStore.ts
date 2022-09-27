import { Module } from "vuex";
import { IPlaylist } from "@/interfaces/audioInterfaces";

export interface IPlaylistStoreState {
  activePlaylist?: number | undefined;
  playlists: IPlaylist[];
}

const defaultPlaylist: IPlaylist = { entries: [] };

export default <Module<IPlaylistStoreState, unknown>>{
  namespaced: true,
  state: (): IPlaylistStoreState => {
    try {
      const playlist: IPlaylist = JSON.parse(localStorage.playlist ?? null) ?? defaultPlaylist;
      return {
        activePlaylist: 0,
        playlists: [playlist],
      };
    } catch (e) {
      return { playlists: [defaultPlaylist] };
    }
  },
  mutations: {
    setPlaylist(state, playlist: IPlaylist) {
      state.playlists[state.activePlaylist || 0] = playlist;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
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
    setAudioError(state, { hash, error }) {
      state.playlists.forEach((playlist) => {
        playlist.entries
          .filter((entry) => entry.hash === hash)
          .forEach((entry) => (entry.audio = { error }));
      });
    },
  },
  getters: {
    getPlaylist(state): IPlaylist {
      return state.playlists?.[state.activePlaylist || 0];
    },
  },
};
