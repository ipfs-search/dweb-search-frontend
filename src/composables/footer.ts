import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { playlistVisible, audioPlayer } from "@/composables/audioControls";
export const _footerVisible = ref(true);

export const useFooter = () => {
  const route = useRoute();
  const footerVisible = computed(() => {
    if (audioPlayer.value.file || playlistVisible.value) return false;
    if (route.name === "Home") return true;
    return _footerVisible.value && route.name === "Search";
  });
  const hideFooter = () => {
    _footerVisible.value = false;
  };
  const adjustFooterPadding = computed(() => {
    if (route.name === "Home" && !playlistVisible.value) return "0px";
    if (audioPlayer.value.file) return "100px";
    if (footerVisible.value) return "120px";
    return "0px";
  });
  return {
    footerVisible,
    hideFooter,
    adjustFooterPadding,
  };
};
