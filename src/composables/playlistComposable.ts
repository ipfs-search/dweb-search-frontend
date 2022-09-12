import { ref } from "vue";

export const usePlaylist = () => {
  const playlistVisible = ref(false);
  return {
    playlistVisible,
    togglePlaylist: () => (playlistVisible.value = !playlistVisible.value),
  };
};
