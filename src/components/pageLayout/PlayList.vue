<script setup>
import { useStore } from "vuex";
const store = useStore();
import VMarquee from "@/components/shared/VMarquee.vue";
import { mdiMusic, mdiPlay, mdiPause, mdiAlert, mdiClose, mdiDotsVertical } from "@mdi/js";
import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();
import { picsum } from "@/helpers/picsum";

import { fileTitle, fileAuthor } from "@/helpers/fileHelper";

const playlistEntries = store.getters["playlist/getPlaylist"].entries;
import { playlistVisible, loadAudioPlayer, playPlaylistEntry } from "@/composables/audioControls";
</script>

<template>
  <v-fade-transition class="audio-player-card">
    <v-card
      v-if="playlistVisible"
      position="fixed"
      width="100%"
      height="80%"
      class="mt-14 pb-6 overflow-y-auto"
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
                style="cursor: pointer"
                @click="playPlaylistEntry(entry)"
              >
                <v-img
                  aspect-ratio="1"
                  bac
                  gradient="to bottom, rgba(255,255,255,.1), rgba(255,255,255,.5)"
                  :src="entry.src || picsum({ width: 75, height: 75, seed: entry.hash })"
                >
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
                    :icon="mdiPlay"
                  />
                </v-img>
              </v-list-item-avatar>
            </template>
            <v-row>
              <v-col cols="6">
                <v-list-item-title v-sane-html="fileTitle(entry)" />
              </v-col>
            </v-row>
          </v-list-item>
        </v-hover>
      </v-list>
    </v-card>
  </v-fade-transition>
</template>

<style lang="scss" scoped>
.audio-player-card {
  transition: all 300ms ease-in-out;
}
</style>
