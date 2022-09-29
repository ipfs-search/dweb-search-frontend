<script setup lang="ts">
import { computed } from "vue";
import store from "@/store";
import {
  audioPlayer,
  playlistVisible,
  startPlaylist,
  showAudioDetail,
  removePlaylistEntry,
} from "@/composables/audioControls";
import {
  mdiAlert,
  mdiMusic,
  mdiCircleSmall,
  mdiPlay,
  mdiFileFind,
  mdiTrashCanOutline,
} from "@mdi/js";

import { fileTitle, fileAuthor, fileAlbum, fileCover } from "@/helpers/fileHelper";

const playlistEntries = computed(() => store.getters["playlist/getPlaylist"].entries);
import BlinkBlink from "../shared/BlinkBlink.vue";
</script>

<template>
  <v-fade-transition>
    <v-card
      v-if="playlistVisible"
      width="100%"
      class="overflow-y-auto h-100"
      style="z-index: 10000"
      color="planetarifyDark"
      rounded="0"
      flat
    >
      <v-row class="w-100">
        <v-col cols="12" xl="8" offset-xl="2">
          <v-list
            v-if="playlistEntries.length"
            bg-color="planetarifyDark"
            lines="2"
            style="margin-left: 8px; margin-right: -24px"
          >
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
                  <v-avatar
                    rounded="0"
                    :style="{ cursor: entry.audio?.error ? 'default' : 'pointer' }"
                    @click="startPlaylist(index)"
                  >
                    <v-img
                      aspect-ratio="1"
                      bac
                      :src="fileCover(entry, 85, 85, { grayscale: !!entry.audio?.error })"
                    >
                      <v-icon
                        v-if="entry.audio && entry.audio.error"
                        style="
                          opacity: 0.9;
                          stroke: black;
                          stroke-width: 0.3px;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        "
                        :icon="mdiAlert"
                        color="planetarifyLight"
                      />
                      <blink-blink
                        v-else-if="entry.hash === audioPlayer?.file?.hash && audioPlayer?.loading"
                      >
                        <v-icon
                          style="
                            opacity: 0.6;
                            stroke: black;
                            stroke-width: 0.3px;
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                          "
                          size="35"
                          color="white"
                          :icon="mdiCircleSmall"
                        />
                      </blink-blink>
                      <v-icon
                        v-else-if="entry.hash === audioPlayer?.file?.hash && audioPlayer?.playing"
                        size="36"
                        color="white"
                        style="
                          opacity: 0.6;
                          stroke: black;
                          stroke-width: 0.3px;
                          position: absolute;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        "
                        :icon="mdiMusic"
                      />
                      <v-icon
                        v-else
                        size="42"
                        color="white"
                        style="
                          position: absolute;
                          opacity: 0.6;
                          stroke: black;
                          stroke-width: 0.3px;
                          top: 50%;
                          left: 50%;
                          transform: translate(-50%, -50%);
                        "
                        :icon="mdiPlay"
                      />
                    </v-img>
                  </v-avatar>
                </template>
                <template #append>
                  <div class="d-flex flex-row">
                    <v-icon :icon="mdiFileFind" @click="showAudioDetail(entry)" />
                    <v-icon :icon="mdiTrashCanOutline" @click="removePlaylistEntry(index)" />
                  </div>
                </template>
                <div
                  :class="{ 'text-grey-darken-1': entry.audio?.error }"
                  class="mr-auto v-list-item-title"
                >
                  <v-list-item-title>
                    <span v-sane-html="fileTitle(entry)" class="mx-1" />
                  </v-list-item-title>
                  <v-list-item-subtitle>
                    <span
                      v-sane-html="
                        [fileAuthor(entry), fileAlbum(entry)].filter((e) => !!e).join(' - ')
                      "
                      class="mx-1"
                    />
                  </v-list-item-subtitle>
                </div>
              </v-list-item>
            </v-hover>
          </v-list>
          <v-card-title
            v-else
            class="d-flex justify-center align-center mt-10"
            style="white-space: break-spaces !important"
          >
            <span>Search for some audio files to add to your personal playlist</span>
          </v-card-title>
        </v-col>
      </v-row>
    </v-card>
  </v-fade-transition>
</template>
