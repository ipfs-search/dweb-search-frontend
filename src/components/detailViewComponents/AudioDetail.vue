<script setup>
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import AudioDetailButton from "./subcomponents/AudioDetailButton.vue";
import { mdiAlert, mdiPlay, mdiPause } from "@mdi/js";
import { computed } from "vue";

import { picsum } from "@/helpers/picsum";

import { detailProps } from "@/composables/useDetail";
const props = defineProps(detailProps);

import * as audioControls from "@/composables/audioControls";

const currentlyLoadedInPlayer = computed(
  () => props.file.hash === audioControls.sourceFile.value.hash
);
</script>

<template>
  <generic-detail :file="file" narrow>
    <v-img
      style="max-height: 100%"
      :src="picsum({ width: 400, height: 200 })"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <AudioDetailButton
        v-if="currentlyLoadedInPlayer && audioControls.audioError.value"
        :title="audioControls.audioError.value"
        :icon="mdiAlert"
      />
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer && audioControls.loading.value"
        loading
      />
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer && audioControls.playing.value"
        @click="audioControls.pause"
        title="Pause"
        :icon="mdiPause"
      />
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer"
        @click="audioControls.play"
        title="Play"
        :icon="mdiPlay"
      />
      <AudioDetailButton v-else @click="audioControls.load(file)" title="Play" :icon="mdiPlay" />
    </v-img>
  </generic-detail>
</template>
