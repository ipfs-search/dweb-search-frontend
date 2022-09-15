<script setup lang="ts">
import { computed } from "vue";
import store from "@/store";
import { IFile } from "../../interfaces/IFile";
import { mdiCircleSmall, mdiPlay, mdiDotsVertical } from "@mdi/js";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
import { picsum } from "@/helpers/picsum";

import { fileTitle, fileAuthor } from "@/helpers/fileHelper";

const playlistEntries = computed(() => store.getters["playlist/getPlaylist"].entries);
import { playlistVisible, playPlaylistEntry } from "@/composables/audioControls";
import BlinkBlink from "../shared/BlinkBlink.vue";
const cursor = (entry: IFile) => (entry.audio?.error ? "default" : "pointer");
</script>

<template>
  <v-fade-transition class="overflow-y-scroll vh-100">
    <v-card
      v-if="playlistVisible"
      position="fixed"
      width="100%"
      class="overflow-y-auto"
      style="z-index: 1000"
      color="black"
      rounded="0"
      flat
    >
      <v-card-title>Playlist</v-card-title>
      <v-list bg-color="black">
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
            @dblclick="playPlaylistEntry(entry)"
          >
            <template #prepend>
              <v-icon :icon="mdiDotsVertical" />
              <v-list-item-avatar
                rounded="0"
                :style="{ cursor: cursor(entry) }"
                @click="playPlaylistEntry(entry)"
              >
                <v-img
                  aspect-ratio="1"
                  bac
                  gradient="to bottom, rgba(255,255,255,.1), rgba(255,255,255,.5)"
                  :src="entry.src || picsum({ width: 75, height: 75, seed: entry.hash })"
                >
                  <v-icon
                    v-if="!entry.audio?.error"
                    size="42"
                    color="white"
                    style="
                      opacity: 0.6;
                      position: absolute;
                      top: 50%;
                      left: 50%;
                      transform: translate(-50%, -50%);
                    "
                    :icon="mdiPlay"
                  />
                </v-img>
              </v-list-item-avatar>
            </template>
            <v-row>
              <v-col cols="6" :class="entry.audio?.error ? 'text-grey-darken-1' : ''">
                <v-list-item-title class="d-flex">
                  <v-span v-sane-html="entry.title" class="mx-1" />
                  <blink-blink :blink="entry.audio?.loading" :off="!entry.audio.loading">
                    <v-icon v-if="!entry.audio.error" color="white" :icon="mdiCircleSmall" />
                  </blink-blink>
                </v-list-item-title>
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
