import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import { batchSize } from "@/helpers/ApiHelper";

import prettyBytes from "pretty-bytes";
import durationToColor from "@/helpers/durationToColor";
import mime from "mime";
import { Types } from "@/helpers/typeHelper";
import getResourceURL from "@/helpers/resourceURL";

export const useFileListComposable = ({ fileType }) => {
  const route = useRoute();
  const store = useStore();
  // Computed properties
  const pageHits = computed(() =>
    store.getters[`results/${fileType}/pageResults`](Number(route.query.page) || 1)
  );

  const loading = computed(() => store.getters[`results/${fileType}/loading`]);

  const anyFileType = computed(() => {
    return [Types.all, undefined].includes(route.query.type);
  });

  const infinite = computed(
    () => route.query.type === Types.images || route.query.type === Types.video
  );

  const loadedPages = computed(() =>
    Math.ceil(store.getters[`results/${fileType}/hits`].length / batchSize)
  );

  /**
   * used by: AudioList, BaseList, imageList, VideoList
   * uses: pageHits, infinite, anyFileType
   * @param slice
   * @returns {*}
   */
  function slicedHits(slice = 3) {
    if (anyFileType.value) {
      return pageHits.value.slice(0, slice);
    }
    if (infinite.value) {
      return store.getters[`results/${fileType}/hits`];
    }
    return pageHits.value;
  }

  return {
    pageHits,
    loading,
    anyFileType,
    infinite,
    loadedPages,
    slicedHits,
  };
};

export const imports = {
  mime,
  durationToColor,
  prettyBytes,
  getResourceURL,
};
