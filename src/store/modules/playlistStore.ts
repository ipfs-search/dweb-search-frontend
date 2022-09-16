import { Module } from "vuex";
import { IPlaylist } from "@/interfaces/IPlaylist";
import { IFile } from "../../interfaces/IFile";

export interface IPlaylistStoreState {
  activePlaylist?: number | undefined;
  playlists: IPlaylist[];
}

const defaultPlaylist: IPlaylist = { entries: [] };

export default <Module<any, unknown>>{
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
      for (const playlist of state.playlists) {
        for (const entry of playlist.entries) {
          if (entry.hash === hash) {
            entry.audio = {
              error,
            };
          }
        }
      }
    },
  },
  getters: {
    getPlaylist(state): IPlaylist {
      const playlist = state.playlists?.[state.activePlaylist || 0];
      return playlist;
    },
  },
};

// audioBank is used to make single Howl instances for audio files,
// even when there are duplicates in the list
// const fillAudioBank = (entries: IFile[], purge = true) => {
//   const audioBank: Record<string, IAudio> = {};
//   for (const entry of entries) {
//     if (!audioBank[entry.hash]) audioBank[entry.hash] = new Audio(entry);
//   }
//   if (purge) {
//     const keys = new Set(entries.map((entry) => entry.hash));
//     for (const hash in audioBank.value) {
//       if (!keys.has(hash)) delete audioBank[hash];
//     }
//   }
//   return audioBank;
// };
