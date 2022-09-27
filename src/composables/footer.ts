import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import { playlistVisible, audioPlayer, audioDetailPopup } from "@/composables/audioControls";
export const _footerVisible = ref(true);

export const useFooter = () => {
  const route = useRoute();

  const footerVisible = computed(() => {
    if (audioPlayer.value.file || playlistVisible.value || audioDetailPopup.value) return false;
    if (route.name === "Home") return true;
    return _footerVisible.value && route.name === "Search";
  });

  const hideFooter = () => {
    _footerVisible.value = false;
  };

  const adjustFooterPadding = computed(() => {
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
