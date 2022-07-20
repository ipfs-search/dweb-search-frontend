<script setup>
import Marquee from '@/components/shared/Marquee.vue';
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
  <v-fade-transition class="audio-player-card">
    <v-card
      v-if="playerActive"
      transition="fade-transition"
      style="z-index: 10000"
      position="fixed"
      location="bottom"
      color="black"
      class="d-flex"
      tile
      width="101%"
      height="100"
    >
      <v-progress-linear
        active
        style="position: absolute"
        v-if="!loading"
        v-model="progress"
        color="ipfsPrimary-lighten-4"
        class="bg-ipfsPrimary progress-bar"
        height="3"
        clickable
      />
      <div class="d-flex w-100">
        <v-avatar
          v-if="mdAndUp"
          class="my-auto ml-4"
          rounded="0"
          size="75"
        >
          <v-img
            aspect-ratio="1"
            bac
            gradient="to bottom, rgba(255,255,255,.1), rgba(255,255,255,.5)"
            style="filter: blur(2px);"
            :src="sourceFile.src"
          >
          </v-img>
          <v-icon
            size="42"
            color="white"
            style="opacity: 0.3;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);"
            :icon="mdiMusic"
          />
        </v-avatar>
        <div class="flex-column my-auto mx-4 align-center w-100" style="min-width: 0px">
          <marquee>
            <v-card-title
              class="font-weight-default d-flex px-0"
              style="font-size: 16px"
            >
              <span v-html="sourceFile.title"/>
            </v-card-title>
          </marquee>
          <marquee>
            <v-card-subtitle
              class="d-flex py-2 px-0"
            >
              <span v-html="sourceFile.author" />
            </v-card-subtitle>
          </marquee>
        </div>
        <div
          class="h-100 d-flex align-center my-auto"
          :class="mdAndUp ? 'flex-row ml-auto': 'flex-column'"
        >
          <v-card-title
            :style="{fontSize: mdAndUp ? '20px' : '16px'}"
          >{{ time }} / {{ duration }}</v-card-title>
          <div class="d-inline-flex flex-row">
            <v-btn
              v-if="audioError"
              class="bg-ipfsPrimary-lighten-1 ml-2"
              :size="mdAndUp ? 'large' : 'default'"
              :title="audioError"
              :icon="mdiAlert"
            />
            <v-btn
              v-else-if="loading"
              class="bg-ipfsPrimary-lighten-1 ml-2"
              :size="mdAndUp ? 'large' : 'default'"
              icon
              title="Loading"
              loading
            />
            <v-btn
              v-else-if="playing"
              class="bg-ipfsPrimary-lighten-1 ml-2"
              :size="mdAndUp ? 'large' : 'default'"
              :icon="mdiPause"
              title="Pause"
              @click="pause"
            />
            <v-btn
              v-else
              class="bg-ipfsPrimary-lighten-1 ml-2"
              :size="mdAndUp ? 'large' : 'default'"
              :icon="mdiPlay"
              title="Play"
              @click="play"
            />
            <v-btn
              class="bg-ipfsPrimary-lighten-1 ml-2"
              :class="{ 'mr-3': mdAndUp }"
              :size="mdAndUp ? 'large' : 'default'"
              :icon="mdiClose"
              title="Close"
              @click="close"
            />
          </div>
        </div>
      </div>
    </v-card>
  </v-fade-transition>
</template>

<style lang="scss" scoped>
.progress-bar {
  cursor: pointer
}
.audio-player-card {
  transition: all 500ms ease-in-out;
}
</style>
