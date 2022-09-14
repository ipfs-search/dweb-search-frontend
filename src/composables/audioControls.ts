import { ref } from "vue";
import { IFile } from "../interfaces/IFile";
import { Audio } from "./audioPlayer";

import store from "@/store";

export const audioPlayer = ref<Audio | undefined>(undefined);

export const audio = (file: IFile) => new Audio(file);
export const loadAudioPlayer = (audio: Audio) => {
  console.log("Loading audio player", audio);
  audioPlayer.value = audio;
};

export const playlistVisible = ref(false);
export const togglePlaylist = () => {
  playlistVisible.value = !playlistVisible.value;
};
const audioBank = new Map<string, Audio>();

export const setPlaylist = (entries: IFile[]) => {
  store.commit("playlist/setPlaylist", { entries });
  for (const entry of entries) {
    if (!audioBank.has(entry.hash)) audioBank.set(entry.hash, new Audio(entry));
  }
};

export const enqueue = (entries: IFile[]) =>
  setPlaylist(store.getters["playlist/getPlaylist"].entries.concat(entries));

export const clearPlaylist = () => {
  store.commit("playlist/setPlaylist", { entries: [] });
};

export const playPlaylistEntry = (entry: IFile) => {
  const audio = audioBank.get(entry.hash);
  audio && loadAudioPlayer(audio);
};
/**
 * @param secs
 * @returns [string, string]
 */
export function formatTime(secs: number): [string, string] | undefined {
  if (secs === undefined) return;
  const minutes = Math.floor(secs / 60) || 0;
  const seconds = Math.floor(secs - minutes * 60) || 0;
  return [`${minutes}`, `${seconds < 10 ? "0" : ""}${seconds}`];
}
