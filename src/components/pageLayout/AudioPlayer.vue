<script setup lang="ts">
import { computed } from "vue";
import VMarquee from "@/components/shared/VMarquee.vue";
import {
  mdiMusic,
  mdiPlay,
  mdiPause,
  mdiAlert,
  mdiStop,
  mdiSkipNext,
  mdiSkipPrevious,
} from "@mdi/js";
import { useDisplay } from "vuetify";
const { smAndUp, mdAndUp } = useDisplay();
import { picsum } from "@/helpers/picsum";

import {
  audioPlayer,
  formatTime,
  pauseAudio,
  resumeAudio,
  cleanUpAudioPlayer,
  previousPlaylistEntry,
  playlistSkipPrevious,
  nextPlaylistEntry,
  playlistSkipNext,
} from "@/composables/audioControls";

const progress = computed({
  get() {
    if (audioPlayer.value.duration) {
      return ((audioPlayer.value.time || 0) / audioPlayer.value.duration) * 100;
    } else {
      return 0;
    }
  },
  set(percentage) {
    if (audioPlayer.value.loaded) {
      audioPlayer.value.player?.seek((percentage * audioPlayer.value.duration) / 100);
    }
  },
});

import { fileTitle, fileAuthor } from "@/helpers/fileHelper";
</script>

<template>
  <v-fade-transition class="audio-player-card">
    <v-card
      v-if="audioPlayer.file"
      position="fixed"
      location="bottom"
      color="planetarifyDark"
      class="d-flex"
      flat
      rounded="0"
      width="100%"
      height="100"
    >
      <v-progress-linear
        v-model="progress"
        active
        style="position: absolute"
        color="ipfsPrimary-lighten-4"
        class="bg-ipfsPrimary progress-bar"
        height="5"
        clickable
      />
      <v-row class="w-100">
        <v-col cols="12" xl="8" offset-xl="2" class="d-flex w-100">
          <v-avatar v-if="mdAndUp" class="my-auto ml-4" rounded="0" size="75">
            <v-img
              aspect-ratio="1"
              bac
              gradient="to bottom, rgba(255,255,255,.1), rgba(255,255,255,.5)"
              :src="picsum({ width: 75, height: 75, seed: audioPlayer.file?.hash })"
            >
            </v-img>
            <v-icon
              size="42"
              color="white"
              style="
                opacity: 0.6;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
              "
              :icon="mdiMusic"
            />
          </v-avatar>
          <div class="flex-column my-auto mx-4 align-center w-100" style="min-width: 0">
            <v-marquee>
              <v-card-title class="font-weight-default d-flex px-0">
                <span v-sane-html="fileTitle(audioPlayer.file)" />
              </v-card-title>
            </v-marquee>
            <v-marquee>
              <v-card-subtitle class="d-flex py-2 px-0">
                <span v-sane-html="fileAuthor(audioPlayer.file)" />
              </v-card-subtitle>
            </v-marquee>
          </div>
          <div
            class="h-100 d-flex align-center my-auto"
            :class="smAndUp ? 'flex-row ml-auto' : 'flex-column'"
          >
            <v-card-title :style="{ fontSize: mdAndUp ? '20px' : '16px' }"
              >{{ formatTime(audioPlayer.time)?.join(" : ") }} /
              {{ formatTime(audioPlayer.duration)?.join(" : ") }}</v-card-title
            >
            <div class="d-inline-flex flex-row">
              <v-btn
                class="bg-ipfsPrimary-lighten-1 ml-2"
                :size="mdAndUp ? 'large' : 'default'"
                :icon="mdiSkipPrevious"
                :disabled="previousPlaylistEntry() === undefined"
                title="Pause"
                @click="playlistSkipPrevious"
              />
              <v-btn
                v-if="audioPlayer.error"
                class="bg-ipfsPrimary-lighten-1 ml-2"
                :size="mdAndUp ? 'large' : 'default'"
                :title="audioPlayer.error"
                :icon="mdiAlert"
              />
              <v-btn
                v-else-if="audioPlayer.loading"
                class="bg-ipfsPrimary-lighten-1 ml-2"
                :size="mdAndUp ? 'large' : 'default'"
                icon
                title="Loading"
                loading
              />
              <v-btn
                v-else-if="audioPlayer.playing"
                class="bg-ipfsPrimary-lighten-1 ml-2"
                :size="mdAndUp ? 'large' : 'default'"
                :icon="mdiPause"
                title="Pause"
                @click="pauseAudio"
              />
              <v-btn
                v-else
                class="bg-ipfsPrimary-lighten-1 ml-2"
                :size="mdAndUp ? 'large' : 'default'"
                :icon="mdiPlay"
                title="Play"
                @click="resumeAudio"
              />
              <v-btn
                class="bg-ipfsPrimary-lighten-1 ml-2"
                :size="mdAndUp ? 'large' : 'default'"
                :icon="mdiSkipNext"
                :disabled="nextPlaylistEntry() === undefined"
                title="Pause"
                @click="playlistSkipNext"
              />
              <v-btn
                class="bg-ipfsPrimary-lighten-1 ml-2 mr-2"
                :size="mdAndUp ? 'large' : 'default'"
                :icon="mdiStop"
                title="Close"
                @click="cleanUpAudioPlayer"
              />
            </div>
          </div>
        </v-col>
      </v-row>
    </v-card>
  </v-fade-transition>
</template>

<style lang="scss" scoped>
.progress-bar {
  cursor: pointer;
}
.audio-player-card {
  transition: all 300ms ease-in-out;
}
</style>
