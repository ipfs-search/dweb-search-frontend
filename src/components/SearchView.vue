<script setup lang="ts">
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";
import GenericList from "@/components/searchViewComponents/BaseList.vue";
import ImageList from "@/components/searchViewComponents/ImageList.vue";
import AudioList from "@/components/searchViewComponents/AudioList.vue";
import VideoList from "@/components/searchViewComponents/VideoList.vue";
import SearchFilterMenu from "@/components/searchViewComponents/subcomponents/SearchFilterMenu.vue";
import { Types } from "@/helpers/typeHelper";
import { useDisplay } from "vuetify";
import { playlistVisible } from "@/composables/audioControls";
import { useFooter } from "@/composables/footer";
import { useFileListComposable } from "@/composables/useFileListComposable";
import { useRoute } from "vue-router";

const route = useRoute();

const { smAndDown } = useDisplay();

const { infinite, infiniteScroll } = useFileListComposable({ fileType: route.query.type });

function listType(t: string) {
  return [t, Types.all, undefined].includes(route.query.type as string);
}
const { hideFooter } = useFooter();
const onScroll = () => {
  hideFooter();
  if (infinite.value) {
    infiniteScroll();
  }
};
</script>

<template>
  <div v-if="!playlistVisible" id="search-view" data-id="search-view" class="h-100 overflow-y-auto" @scroll="onScroll">
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
