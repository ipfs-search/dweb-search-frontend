<script setup>
import SearchFilters from "@/components/searchViewComponents/subcomponents/SearchFilters.vue";
import GenericList from "@/components/searchViewComponents/BaseList.vue";
import ImageList from "@/components/searchViewComponents/ImageList.vue";
import AudioList from "@/components/searchViewComponents/AudioList.vue";
import VideoList from "@/components/searchViewComponents/VideoList.vue";

import { useRoute } from "vue-router";
import { Types } from "@/helpers/typeHelper";

const route = useRoute();

function listType(t) {
  return [t, Types.any, undefined].includes(route.query.type);
}
</script>

<template>
  <div>
    <SearchFilters />

    <GenericList :file-type="Types.text" v-if="listType(Types.text)" />
    <AudioList v-if="listType(Types.audio)" />
    <ImageList v-if="listType(Types.images)" />
    <VideoList v-if="listType(Types.video)" />
    <GenericList :file-type="Types.directories" v-if="listType(Types.directories)" />
    <GenericList :file-type="Types.other" v-if="listType(Types.other)" />
  </div>
</template>

<style lang="scss" scoped>
h2 {
  font-size: 120%;
  letter-spacing: 0.09em;
  font-weight: 500;
  span {
    font-weight: 500;
  }
}

.searchbar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
}
</style>
