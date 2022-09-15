import { Module } from "vuex";
import { IPlaylist } from "@/interfaces/IPlaylist";
import { IFile } from "../../interfaces/IFile";
import { IAudio, Audio } from "../../composables/audioPlayer";

export interface IPlaylistStoreState {
  activePlaylist?: number | undefined;
  playlists: IPlaylist[];
  audioBank: Record<string, IAudio>;
}

const defaultPlaylist: IPlaylist = { entries: [] };

export default <Module<any, unknown>>{
  namespaced: true,
  state: (): IPlaylistStoreState => {
    try {
      const playlist: IPlaylist = JSON.parse(localStorage.playlist ?? null) ?? defaultPlaylist;
      fillAudioBank(playlist.entries);
      return {
        activePlaylist: 0,
        playlists: [playlist],
        audioBank: fillAudioBank(playlist.entries),
      };
    } catch (e) {
      return { playlists: [defaultPlaylist], audioBank: {} };
    }
  },
  mutations: {
    setPlaylist(state, playlist: IPlaylist) {
      state.playlists[state.activePlaylist || 0] = playlist;
      state.audioBank = fillAudioBank(playlist.entries);
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
    setAudioState(state, { hash, ...audio }) {
      state.audioBank[hash] = {
        ...state.audioBank[hash],
        ...audio,
      };
    },
  },
  getters: {
    getPlaylist(state): IPlaylist {
      const playlist = state.playlists?.[state.activePlaylist || 0];
      return {
        ...playlist,
        entries: playlist.entries.map((entry: IFile) => ({
          ...entry,
          audio: state.audioBank[entry.hash],
        })),
      };
    },
  },
};

// audioBank is used to make single Howl instances for audio files,
// even when there are duplicates in the list
const fillAudioBank = (entries: IFile[], purge = true) => {
  const audioBank: Record<string, IAudio> = {};
  for (const entry of entries) {
    if (!audioBank[entry.hash]) audioBank[entry.hash] = new Audio(entry);
  }
  if (purge) {
    const keys = new Set(entries.map((entry) => entry.hash));
    for (const hash in audioBank.value) {
      if (!keys.has(hash)) delete audioBank[hash];
    }
  }
  return audioBank;
};
