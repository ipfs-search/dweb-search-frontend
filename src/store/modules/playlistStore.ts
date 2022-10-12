import { Module } from "vuex";
import { IPlaylist } from "@/interfaces/audioInterfaces";
import { IFile } from "@/interfaces/IFile";

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
    toggleLoop(state) {
      state.playlists[state.activePlaylist || 0].loop =
        !state.playlists[state.activePlaylist || 0].loop;
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      this.commit("localStorage/setPlaylist", state.playlists[state.activePlaylist || 0]);
    },
  },
  getters: {
    getPlaylist(state): IPlaylist {
      return state.playlists?.[state.activePlaylist || 0];
    },
    loopState(state): boolean {
      return state.playlists?.[state.activePlaylist || 0].loop ?? false;
    },
    getLength(state): number {
      return state.playlists?.[state.activePlaylist || 0].entries.length;
    },
    getEntries(state): IFile[] {
      return state.playlists?.[state.activePlaylist || 0].entries;
    },
  },
};
