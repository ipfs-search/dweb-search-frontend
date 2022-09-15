<script setup>
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";
import GenericList from "@/components/searchViewComponents/BaseList.vue";
import ImageList from "@/components/searchViewComponents/ImageList.vue";
import AudioList from "@/components/searchViewComponents/AudioList.vue";
import VideoList from "@/components/searchViewComponents/VideoList.vue";

import { useRoute } from "vue-router";
import { Types } from "@/helpers/typeHelper";
import { useDisplay } from "vuetify";
import SearchFilterMenu from "@/components/searchViewComponents/subcomponents/SearchFilterMenu.vue";
const { smAndDown } = useDisplay();

const route = useRoute();

function listType(t) {
  return [t, Types.all, undefined].includes(route.query.type);
}

import { footerVisible } from "@/composables/footer.js";
const onScroll = () => (footerVisible.value = false);
</script>

<template>
  <div data-id="search-view" class="overflow-y-scroll vh-100" @scroll="onScroll">
    <div class="bottom-space">
      <search-filter-menu v-if="smAndDown" />
      <SearchFilters v-else />
      <GenericList v-if="listType(Types.text)" :file-type="Types.text" />
      <AudioList v-if="listType(Types.audio)" />
      <ImageList v-if="listType(Types.images)" />
      <VideoList v-if="listType(Types.video)" />
      <GenericList v-if="listType(Types.directories)" :file-type="Types.directories" />
      <GenericList v-if="listType(Types.other)" :file-type="Types.other" />
      <GenericList v-if="route.query.type == Types.unfiltered" :file-type="Types.unfiltered" />
    </div>
  </div>
</template>

<style scoped>
.bottom-space {
  padding-bottom: 118px;
}
.vh-100 {
  height: 100vh;
}

.overflow-y-scroll {
  overflow-y: scroll;
}
</style>
