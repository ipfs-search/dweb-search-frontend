import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { computed } from "vue";
import { batchSize } from "@/helpers/ApiHelper";

import prettyBytes from "pretty-bytes";
import durationToColor from "@/helpers/durationToColor";
import mime from "mime";
import { Types } from "@/helpers/typeHelper";
import getResourceURL from "@/helpers/resourceURL";
import { enterSearchQuery } from "@/router";

const infiniteScrollMargin = 200;

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

  const infinite = computed(() => route.query.type === Types.images);

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

  /**
   * See if the the page scrolled so far down that empty space opens up at the bottom.
   * Also update the url
   * used by ImageList
   */
  const infiniteScroll = () => {
    const { scrollTop, scrollHeight } = document.getElementById("search-view");
    // calculate, which page is currently in view
    const scrollPage = Math.floor(loadedPages.value * (scrollTop / scrollHeight)) + 1;
    // if needed, change the page in the URL
    if (store.state.query.page !== scrollPage) {
      enterSearchQuery(route.query, scrollPage, "replace");
    }
    const nearBottom = window.innerHeight + infiniteScrollMargin > scrollHeight - scrollTop;
    if (nearBottom && !loading.value) {
      return store.dispatch(`results/${fileType}/fetchPage`, { page: loadedPages.value + 1 });
    }
  };

  return {
    pageHits,
    loading,
    anyFileType,
    infinite,
    loadedPages,
    slicedHits,
    infiniteScroll,
  };
};
