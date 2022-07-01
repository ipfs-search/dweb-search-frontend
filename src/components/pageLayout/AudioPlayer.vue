<script setup>
import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()

import { audioPlayer } from '@/plugins/audioPlugin';
import {
  audioData,
  playerActive,
  closePlayer,
  loading,
  progress,
  sourceFile,
  timer,
  duration,
  playing,
  play,
  pause,
} from '@/composables/AudioControlsModule';
import { onBeforeUnmount } from 'vue';

const audioError = audioData.audioError;

onBeforeUnmount(() => {
  audioPlayer.close();
})
</script>

<template>
  <v-footer
    v-if="playerActive"
    dark
    :height="100"
    fixed
    padless
    style="z-index: 10000;"
  >
    <v-card
      class="audio-player-card"
      tile
      width="100%"
      height="100"
    >
      <div class="small-viewer">
        <v-progress-linear
          v-if="!loading"
          v-model="progress"
          color="white"
          class="progress-bar"
          height="3"
        />

        <v-menu transition="scroll-y-reverse-transition">
          <v-list>
            <v-list-item
              dark
            >
              <v-list-item-avatar
                tile
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
                  >
                    mdi-music
                  </v-icon>
                </v-img>
              </v-list-item-avatar>
              <!--                <v-search-item-content>-->
              <v-list-item-title v-html="sourceFile.title" />
              <v-list-item-subtitle>
                <span v-html="sourceFile.author" />
                <span>{{ timer }} / {{ duration }}</span>
              </v-list-item-subtitle>
              <!--                </v-search-item-content>-->

              <div
                style="height: 100%;"
              >
                <v-list-item-icon
                  :class="{ 'mx-5': mdAndUp }"
                >
                  <v-icon
                    v-if="audioError"
                    :title="audioError"
                  >
                    mdi-alert
                  </v-icon>
                  <v-btn
                    v-else-if="loading"
                    icon
                    loading
                  />
                  <v-btn
                    v-else-if="playing"
                    icon
                    @click="pause"
                  >
                    <v-icon>
                      mdi-pause
                    </v-icon>
                  </v-btn>
                  <v-btn
                    v-else
                    icon
                    @click="play"
                  >
                    <v-icon>
                      mdi-play
                    </v-icon>
                  </v-btn>
                </v-list-item-icon>

                <v-list-item-icon
                  class="ml-0"
                  :class="{ 'mr-3': mdAndUp }"
                >
                  <v-btn
                    icon
                    @click="closePlayer"
                  >
                    <v-icon>mdi-close</v-icon>
                  </v-btn>
                </v-list-item-icon>
              </div>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-card>
  </v-footer>
</template>

<style lang="scss" scoped>
.progress-bar {
  cursor: pointer
}
.audio-player-card {
  transition: all 500ms ease-in-out;
}
</style>
