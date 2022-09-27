<script setup>
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";
import GenericList from "@/components/searchViewComponents/BaseList.vue";
import ImageList from "@/components/searchViewComponents/ImageList.vue";
import AudioList from "@/components/searchViewComponents/AudioList.vue";
import VideoList from "@/components/searchViewComponents/VideoList.vue";
import SearchFilterMenu from "@/components/searchViewComponents/subcomponents/SearchFilterMenu.vue";

import { useRoute } from "vue-router";
const route = useRoute();

import { Types } from "@/helpers/typeHelper";
import { useDisplay } from "vuetify";
const { smAndDown } = useDisplay();

import { playlistVisible } from "@/composables/audioControls";

import { useFileListComposable } from "@/composables/useFileListComposable";
const { infinite, infiniteScroll } = useFileListComposable({ fileType: route.query.type });

function listType(t) {
  return [t, Types.all, undefined].includes(route.query.type);
}
import { useFooter } from "@/composables/footer";
const { hideFooter } = useFooter();
const onScroll = () => {
  hideFooter();
  if (infinite.value) {
    infiniteScroll();
  }
};
</script>

<template>
  <div
    v-if="!playlistVisible"
    id="search-view"
    data-id="search-view"
    class="h-100 overflow-y-auto"
    @scroll="onScroll"
  >
    <search-filter-menu v-if="smAndDown" />
    <SearchFilters v-else />
    <GenericList v-if="listType(Types.text)" :file-type="Types.text" />
    <AudioList v-if="listType(Types.audio)" />
    <ImageList v-if="listType(Types.images)" />
    <VideoList v-if="listType(Types.video)" />
    <GenericList v-if="listType(Types.directories)" :file-type="Types.directories" />
    <GenericList v-if="listType(Types.other)" :file-type="Types.other" />
    <GenericList v-if="route.query.type === Types.unfiltered" :file-type="Types.unfiltered" />
  </div>
</template>
