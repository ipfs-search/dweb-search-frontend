<script setup>
import { mdiPlaylistMusic, mdiPlaylistMusicOutline, mdiMagnifyExpand } from "@mdi/js";
import CardContent from "@/components/searchViewComponents/subcomponents/genericCardContent.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { Types, TypeListNames } from "@/helpers/typeHelper";
import { useFileListComposable } from "@/composables/useFileListComposable";
import { computed, onBeforeMount } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import Hyperlink from "@/components/shared/HyperLink.vue";
import { enterSearchQuery } from "@/router";
import { batchSize, maxPages } from "@/helpers/ApiHelper";
import { useDisplay } from "vuetify";
import { useStore } from "vuex";
const store = useStore();

const infiniteScrollMargin = 200;
const route = useRoute();
const { smAndDown } = useDisplay();

const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
});

const { anyFileType, loading, loadedPages, infinite, slicedHits, pageHits } =
  useFileListComposable(props);

import { togglePlaylist, setPlaylist, enqueue } from "@/composables/audioControls.ts";

const error = computed(() => {
  const error = store.getters[`results/${props.fileType}/error`];
  if (error) console.error("Error loading results", error);
  return error;
});

const resultsTotal = computed(() => {
  const resultsTotalMax = 10000;
  const total = store.getters[`results/${props.fileType}/resultsTotal`];
  if (total === resultsTotalMax) {
    return "10000+";
  }
  return total;
});

const pageCount = computed(
  () => Math.min(Math.ceil(store.getters[`results/${props.fileType}/resultsTotal`] / batchSize)),
  maxPages
);

/**
 * See if the the page scrolled so far down that empty space opens up at the bottom.
 * Also update the url
 * used by ImageList
 */
const infiniteScroll = () => {
  if (!infinite.value) return;
  const { scrollTop, scrollHeight } = document.documentElement;
  // calculate, which page is currently in view
  const scrollPage = Math.floor(loadedPages.value * (scrollTop / scrollHeight)) + 1;
  // if needed, change the page in the URL
  if (store.state.query.page !== scrollPage) {
    enterSearchQuery(route.query, scrollPage, "replace");
  }
  const nearBottom = window.innerHeight + infiniteScrollMargin > scrollHeight - scrollTop;
  if (nearBottom && !loading.value) {
    return store.dispatch(`results/${props.fileType}/fetchPage`, { page: loadedPages.value + 1 });
  }
};

/**
 * scroll down to the page from the query
 */
const scrollDown = () => {
  const scrollQueryPage = Number(route.query.page);
  const { scrollHeight } = document.documentElement;
  let top = 0;
  if (scrollQueryPage > 1) {
    top = ((scrollHeight - window.innerHeight) / loadedPages.value) * (scrollQueryPage + 1);
  }
  window.scrollTo({
    top,
    left: 0,
    behavior: "smooth",
  });
};

function handleQueryChange(query = route.query) {
  if (infinite.value) {
    // if (query.type === fileType) {
    //   document.addEventListener('scroll', infiniteScroll, true);
    // } else {
    //   document.removeEventListener('scroll', infiniteScroll, true);
    // }
    return Promise.all(
      Array.from({ length: Math.min(store.state.query.page + 1, maxPages) }, (_, i) =>
        store.dispatch(`results/${props.fileType}/fetchPage`, { page: i + 1 })
      )
    );
  }
  return store.dispatch(`results/${props.fileType}/fetchPage`, { page: query.page || 1 });
}

function getResultsOnMount() {
  if (infinite.value) {
    handleQueryChange().then(scrollDown).then(infiniteScroll);
  } else {
    handleQueryChange();
  }
}

onBeforeMount(getResultsOnMount);

// replaces watch on route.query
onBeforeRouteUpdate(({ query }, from, next) => {
  handleQueryChange(query);
  next();
});

const queryPage = computed({
  get() {
    return Number(route.query.page);
  },
  set(value) {
    enterSearchQuery(route.query, value);
  },
});
</script>

<template>
  <v-container v-scroll="infiniteScroll" class="overflow-y-hidden">
    <v-row dense>
      <v-col cols="12" xl="8" offset-xl="2">
        <v-card flat>
          <div class="justify-space-between d-flex flex-row">
            <hyperlink
              v-if="anyFileType"
              :to="{ ...route, query: { ...route.query, type: fileType } }"
            >
              <v-btn color="ipfsPrimary-lighten-1">
                <span> {{ TypeListNames[fileType] }} ({{ resultsTotal }}) </span>
                <template #prepend>
                  <v-icon size="28" :icon="mdiMagnifyExpand" color="white" />
                </template>
              </v-btn>
            </hyperlink>
            <v-btn v-else variant="outlined" disabled color="ipfsPrimary-lighten-1">
              <span> {{ TypeListNames[fileType] }} ({{ resultsTotal }}) </span>
            </v-btn>
            <div
              v-if="fileType === Types.audio"
              class="flex-row d-flex justify-end"
              style="column-gap: 5px"
            >
              <v-btn
                color="ipfsPrimary-lighten-1"
                @click="
                  setPlaylist(pageHits);
                  togglePlaylist();
                "
              >
                Play all
                <template #prepend>
                  <v-icon size="28" :icon="mdiPlaylistMusic" color="white" />
                </template>
              </v-btn>
              <v-btn color="ipfsPrimary-lighten-1" @click="enqueue(pageHits)">
                Enqueue all
                <template #prepend>
                  <v-icon size="28" :icon="mdiPlaylistMusicOutline" color="white" />
                </template>
              </v-btn>
            </div>
          </div>
        </v-card>
      </v-col>
    </v-row>

    <v-row v-if="error">
      <v-col cols="12" xl="8" offset-xl="2">
        <v-alert border="left" color="red lighten-2">
          <i>Error loading results...</i>
        </v-alert>
      </v-col>
    </v-row>
    <v-row v-if="resultsTotal !== 0" dense>
      <slot>
        <v-col v-for="(hit, index) in slicedHits(3)" :key="index" cols="12" xl="8" offset-xl="2">
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <CardContent :hit="hit" />
          </hover-card>
        </v-col>
      </slot>
    </v-row>
    <v-row v-if="loading" dense justify="center">
      <v-progress-circular color="ipfsPrimary" indeterminate />
    </v-row>
    <!--     PAGINATION -->
    <!-- TODO: pagination panel falls behind social media bar without margin-bottom -->
    <div v-if="!anyFileType && !infinite" class="my-16" style="margin-bottom: 135px !important">
      <v-pagination v-model="queryPage" :length="pageCount" :total-visible="smAndDown ? 3 : 9" />
    </div>
  </v-container>
</template>
