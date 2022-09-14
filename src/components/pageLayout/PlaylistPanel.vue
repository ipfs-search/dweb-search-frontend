<script setup>
import { useStore } from "vuex";
const store = useStore();

import { playlistVisible } from "@/composables/audioControls.ts";
</script>

<template>
  <v-fade-transition class="audio-player-card">
    <v-card
      v-if="playlistVisible"
      position="fixed"
      location="center"
      width="100%"
      height="100%"
      color="black"
    >
      <v-list>
        <v-list-item
          v-for="entry in store.getters('playlist/getPlaylist')?.entries"
          :key="entry.hash"
        >
          <v-list-item-title>{{ entry.title }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-card>
  </v-fade-transition>
</template>
