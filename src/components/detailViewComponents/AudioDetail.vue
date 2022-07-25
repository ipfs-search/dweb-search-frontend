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
const image = (file, width, height) => file?.src || picsum({ width, height, seed: file.hash });
const imgSrc = computed(() => image(props.file, 400, 300));
</script>

<template>
  <generic-detail :file="file" narrow>
    <v-img
      max-height="40%"
      cover
      :src="imgSrc"
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
        title="Pause"
        :icon="mdiPause"
        @click="audioControls.pause"
      />
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer"
        title="Play"
        :icon="mdiPlay"
        @click="audioControls.play"
      />
      <AudioDetailButton v-else title="Play" :icon="mdiPlay" @click="audioControls.load(file)" />
    </v-img>
  </generic-detail>
</template>
