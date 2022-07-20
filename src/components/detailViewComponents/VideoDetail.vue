<script setup>
import VideoPlayer from "@/components/detailViewComponents/subcomponents/VideoPlayer.vue";
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import "video.js/dist/video-js.css";

import { useDetail, detailProps } from "@/composables/useDetail";
const props = defineProps(detailProps);
const { videoOptions } = useDetail(props);
</script>

<template>
  <generic-detail :file="file">
    <!-- Video -->
    <v-row>
      <v-col>
        <div class="text-body-1">
          <video-player :options="videoOptions" />
        </div>
      </v-col>
    </v-row>
  </generic-detail>
</template>
