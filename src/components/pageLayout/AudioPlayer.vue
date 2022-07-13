<script setup>
import { mdiMusic, mdiPlay, mdiPause, mdiAlert, mdiClose } from  '@mdi/js'
import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()

import {
  playerActive,
  play,
  pause,
  close,
  audioError,
  loading,
  playing,
  sourceFile,
  formattedTime as time,
  formattedDuration as duration,
  progress } from '@/composables/audioControls';

import { onBeforeUnmount } from 'vue';
onBeforeUnmount(() => {
  close();
})
</script>

<template>
  <v-card
    v-if="playerActive"
    transition="scroll-y-reverse-transition"
    style="z-index: 10000"
    position="fixed"
    location="bottom"
    color="black"
    class="d-flex audio-player-card"
    tile
    width="101%"
    height="100"
  >
    <v-progress-linear
      v-if="!loading"
      v-model="progress"
      color="ipfsPrimary-lighten-4"
      class="progress-bar"
      height="3"
      clickable
    />
    <v-avatar
      rounded="0"
      size="60"
    >
      <v-img
        height="60"
        aspect-ratio="1"
        bac
        gradient="to bottom, rgba(255,255,255,.1), rgba(255,255,255,.5)"
        :src="sourceFile.src"
      >
        <v-icon
          size="32"
          color="white"
          style="opacity: 0.3;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);"
          :icon="mdiMusic"
        />
      </v-img>
    </v-avatar>


    <v-card-title
      class="font-weight-regular"
      style="font-size: 16px;"
      v-html="sourceFile.title"
    />
    <v-card-subtitle>
      <span v-html="sourceFile.author" />
      <span>{{ time }} / {{ duration }}</span>
    </v-card-subtitle>

    <div
      class="h-100"
    >
      <v-icon
        :class="{ 'mx-5': mdAndUp }"
        class="bg-transparent ml-0"
        v-if="audioError"
        :title="audioError"
        :icon="mdiAlert"
      />
      <v-btn
        v-else-if="loading"
        class="bg-transparent ml-0"
        icon
        loading
      />
      <v-btn
        v-else-if="playing"
        class="bg-transparent ml-0"
        :icon="mdiPause"
        @click="pause"
      />
      <v-btn
        v-else
        class="bg-transparent ml-0"
        :icon="mdiPlay"
        @click="play"
      />
      <v-btn
        class="bg-transparent ml-0"
        :class="{ 'mr-3': mdAndUp }"
        :icon="mdiClose"
        @click="close"
      />
    </div>
  </v-card>
</template>

<style lang="scss" scoped>
.progress-bar {
  cursor: pointer
}
.audio-player-card {
  transition: all 500ms ease-in-out;
}
</style>
