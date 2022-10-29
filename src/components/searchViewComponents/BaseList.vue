<script setup>
import { mdiPlaylistPlay, mdiPlaylistPlus, mdiDotsHorizontal } from "@mdi/js";
import CardContent from "@/components/searchViewComponents/subcomponents/genericCardContent.vue";
import HoverCard from "./subcomponents/HoverCard.vue";
import { Types, TypeListNames, TypeIcons } from "@/helpers/typeHelper";
import { useFileListComposable } from "@/composables/useFileListComposable";
import { computed, onBeforeMount } from "vue";
import { onBeforeRouteUpdate, useRoute } from "vue-router";
import Hyperlink from "@/components/shared/HyperLink.vue";
import { enterSearchQuery } from "@/router";
import { batchSize, maxPages } from "@/helpers/ApiHelper";
import { useDisplay } from "vuetify";
import { useStore } from "vuex";
const store = useStore();

const route = useRoute();
const { smAndDown, smAndUp } = useDisplay();

const props = defineProps({
  fileType: {
    type: String,
    required: true,
  },
});

const { anyFileType, loading, loadedPages, infinite, slicedHits, pageHits, infiniteScroll } =
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

const viewAllTo = computed(() => {
  return { ...route, query: { ...route.query, type: props.fileType } };
});

const hasResults = computed(() => resultsTotal.value !== 0);

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
  <v-container class="overflow-y-hidden" style="max-width: 1200px">
    <div class="flex-row justify-space-between d-flex mb-3" style="gap: 5px">
      <hyperlink :disabled="!anyFileType" :to="viewAllTo" class="flex-grow-1">
        <!-- Note: v-btn has a "to" prop as well, which should eliminate the need for hyperlink here. However, it causes the btn to be rendered as 'tonal', overriding the text variant here -->
        <v-btn
          class="justify-start"
          style="opacity: initial"
          block
          variant="text"
          :prepend-icon="TypeIcons[fileType]"
          :disabled="!anyFileType"
        >
          {{ TypeListNames[fileType] }} ({{ resultsTotal }})
        </v-btn>
      </hyperlink>
      <div
        v-if="fileType === Types.audio && pageHits.length"
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
          <span v-if="smAndUp">Play all</span>
          <v-icon v-else size="28" :icon="mdiPlaylistPlay" color="white" />
          <template v-if="smAndUp" #prepend>
            <v-icon size="28" :icon="mdiPlaylistPlay" color="white" />
          </template>
        </v-btn>

        <v-btn color="ipfsPrimary-lighten-1" @click="enqueue(pageHits)">
          <span v-if="smAndUp">Enqueue all</span>
          <v-icon v-else size="28" :icon="mdiPlaylistPlus" color="white" />
          <template v-if="smAndUp" #prepend>
            <v-icon size="28" :icon="mdiPlaylistPlus" color="white" />
          </template>
        </v-btn>
      </div>
    </div>

    <v-row v-if="error">
      <v-col cols="12" xl="8" offset-xl="2">
        <v-alert border="left" color="red lighten-2">
          <i>Error loading results...</i>
        </v-alert>
      </v-col>
    </v-row>

    <slot v-if="hasResults">
      <v-row dense>
        <v-col v-for="(hit, index) in slicedHits(3)" :key="index" cols="12">
          <hover-card :hit="hit" :index="index" :file-type="fileType">
            <CardContent :hit="hit" />
          </hover-card>
        </v-col>
      </v-row>
    </slot>

    <v-row v-if="hasResults && anyFileType" justify="center" class="mt-2 mb-1">
      <v-col cols="12" sm="2" md="1">
        <v-btn block rounded="pill" variant="text" :to="viewAllTo" :icon="mdiDotsHorizontal" />
      </v-col>
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
