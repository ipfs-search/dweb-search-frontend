import { reactive, Ref, ref } from "vue";
import { Module } from "vuex";
import { IPlaylist } from "@/interfaces/IPlaylist";
import { IFile } from "../../interfaces/IFile";
import { Audio } from "../../composables/audioPlayer";

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
      fillAudioBank(playlist.entries);
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
  },
  getters: {
    getPlaylist(state, getters, rootState: any): IPlaylist {
      return state.playlists?.[state.activePlaylist || 0] ?? rootState.localStorage.playlist;
    },
  },
};

// audioBank is used to make single Howl instances for audio files,
// even when there are duplicates in the list
interface dictionary {
  [key: string]: Audio;
}
export const audioBank = reactive<dictionary>({});
const fillAudioBank = (entries: IFile[], purge = true) => {
  for (const entry of entries) {
    if (!audioBank[entry.hash]) audioBank[entry.hash] = new Audio(entry);
  }
  if (!purge) return;
  const keys = new Set(entries.map((entry) => entry.hash));
  for (const hash in audioBank.value) {
    if (!keys.has(hash)) delete audioBank[hash];
  }
};
