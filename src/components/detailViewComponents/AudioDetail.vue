<script setup>
import GenericDetail from "@/components/detailViewComponents/GenericDetail.vue";
import AudioDetailButton from "./subcomponents/AudioDetailButton.vue";
import { mdiAlert, mdiPlay, mdiPause } from "@mdi/js";
import { computed } from "vue";

import { picsum } from "@/helpers/picsum";

import { detailProps } from "@/composables/useDetail";
const props = defineProps(detailProps);

import { audioPlayer, playAudioFile, pauseAudio } from "@/composables/audioControls";

const currentlyLoadedInPlayer = computed(() => props.file.hash === audioPlayer.value?.file?.hash);
const image = (file, width, height) => file?.src || picsum({ width, height, seed: file.hash });
const imgSrc = computed(() => image(props.file, 400, 300));
</script>

<template>
  <generic-detail :file="file" expand-meta narrow meta-expand>
    <v-img
      aspect-ratio="3"
      cover
      :src="imgSrc"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <AudioDetailButton
        v-if="currentlyLoadedInPlayer && audioPlayer.error"
        :title="audioPlayer.error"
        :icon="mdiAlert"
      />
      <AudioDetailButton v-else-if="currentlyLoadedInPlayer && audioPlayer.loading" loading />
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer && audioPlayer.playing"
        title="Pause"
        :icon="mdiPause"
        @click="pauseAudio"
      />
      <AudioDetailButton v-else title="Play" :icon="mdiPlay" @click="playAudioFile(file)" />
    </v-img>
  </generic-detail>
</template>
