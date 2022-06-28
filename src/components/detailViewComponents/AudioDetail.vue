<script setup>
import GenericDetail from '@/components/detailViewComponents/GenericDetail.vue';
import AudioDetailButton from './SubComponents/AudioDetailButton.vue';
import { ref, computed } from 'vue';

import { picsum } from '@/helpers/picsum';

import { detailProps } from '@/composables/useDetail';
const props = defineProps(detailProps)

import {
  loading, playing, loadSoundFile, play, pause, audioData,
} from '@/composables/AudioControlsModule';

const currentlyLoadedInPlayer = computed(
  () => props.file.hash === audioData.audioPlayer.sourceFile?.hash,
);
const audioError = ref(audioData.audioError)
</script>

<template>
  <generic-detail :file="file" narrow>
    <!-- Left - video or preview image with title and subcaption above -->
    <v-img
      :src="picsum()"
      gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
    >
      <AudioDetailButton
        v-if="audioError"
        :title="audioError"
      >
        mdi-alert
      </AudioDetailButton>
      <AudioDetailButton
        v-else-if="!currentlyLoadedInPlayer"
        @click="loadSoundFile(file)"
      >
        mdi-play
      </AudioDetailButton>
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer && loading"
        loading
      />
      <AudioDetailButton
        v-else-if="currentlyLoadedInPlayer && playing"
        @click="pause"
      >
        mdi-pause
      </AudioDetailButton>
      <AudioDetailButton
        v-else
        @click="play"
      >
        mdi-play
      </AudioDetailButton>
    </v-img>
  </generic-detail>
</template>
