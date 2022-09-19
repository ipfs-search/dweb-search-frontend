<script setup lang="ts">
import { computed } from "vue";
import store from "@/store";
import {
  audioPlayer,
  playlistVisible,
  startPlaylist,
  showAudioDetail,
  audioDetailPopup,
} from "@/composables/audioControls";
import { mdiCircleSmall, mdiPlay, mdiDisc } from "@mdi/js";
import { useDisplay } from "vuetify";
const { smAndUp } = useDisplay();
import { picsum } from "@/helpers/picsum";

import { fileTitle, fileAuthor } from "@/helpers/fileHelper";

const playlistEntries = computed(() => store.getters["playlist/getPlaylist"].entries);
import BlinkBlink from "../shared/BlinkBlink.vue";
import VMarquee from "@/components/shared/VMarquee.vue";
</script>

<template>
  <v-fade-transition class="overflow-y-scroll vh-100">
    <v-card
      v-if="playlistVisible"
      position="fixed"
      width="100%"
      class="overflow-y-auto"
      style="z-index: 100000"
      color="black"
      rounded="0"
      flat
    >
      <v-list bg-color="black" class="">
        <v-hover
          v-for="(entry, index) in playlistEntries"
          :key="index"
          v-slot="{ isHovering, props }"
        >
          <v-list-item
            color="black"
            :active="isHovering"
            active-color="white"
            v-bind="props"
            @dblclick="startPlaylist(index)"
          >
            <template #prepend>
              <v-list-item-avatar
                rounded="0"
                :style="{ cursor: entry.audio?.error ? 'default' : 'pointer' }"
                @click="startPlaylist(index)"
              >
                <v-img
                  aspect-ratio="1"
                  bac
                  :src="
                    picsum({
                      width: 75,
                      height: 75,
                      seed: entry.hash,
                      grayscale: !!entry.audio?.error,
                    })
                  "
                >
                  <blink-blink
                    v-if="entry.hash === audioPlayer?.file?.hash && audioPlayer?.loading"
                  >
                    <v-icon
                      style="
                        opacity: 0.9;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                      "
                      color="white"
                      :icon="mdiCircleSmall"
                    />
                  </blink-blink>
                  <blink-blink
                    v-else
                    :blink="entry.hash === audioPlayer?.file?.hash && audioPlayer?.playing"
                  >
                    <v-icon
                      v-if="!entry.audio?.error"
                      size="42"
                      color="white"
                      style="
                        opacity: 0.9;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%);
                      "
                      :icon="mdiPlay"
                    />
                  </blink-blink>
                </v-img>
              </v-list-item-avatar>
            </template>
            <v-row>
              <v-col :class="entry.audio?.error ? 'text-grey-darken-1' : ''">
                <v-marquee :active="isHovering" speed="6">
                  <v-list-item-title class="d-flex">
                    <span v-sane-html="fileTitle(entry)" class="mx-1" />
                    <v-icon :icon="mdiDisc" @click="showAudioDetail(entry)" />
                  </v-list-item-title>
                </v-marquee>
              </v-col>
            </v-row>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-card>
  </v-fade-transition>
</template>

<style scoped>
.vh-100 {
  height: 100vh;
}

.overflow-y-scroll {
  overflow-y: scroll;
}
</style>
