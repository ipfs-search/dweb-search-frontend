import { ref } from "vue";

const playlistVisible = ref(false);
const togglePlaylist = () => {
  playlistVisible.value = !playlistVisible.value;
};

export function usePlaylist() {
  return {
    playlistVisible,
    togglePlaylist,
  };
}
