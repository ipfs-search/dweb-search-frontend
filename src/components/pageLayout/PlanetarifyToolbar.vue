<script setup lang="ts">
import { mdiRepeatVariant, mdiRepeatOff, mdiClose } from "@mdi/js";
import { toggleLoop, loop, togglePlaylist } from "@/composables/audioControls";
import { useDisplay } from "vuetify";
const { smAndUp } = useDisplay();
</script>

<template>
  <div class="d-flex flex-row justify-space-between align-center flex-grow-1 mr-auto ml-0">
    <v-card
      rounded="rounded"
      color="planetarifyDark"
      :class="{ 'flex-grow-1': true }"
      class="d-flex justify-start align-center pl-3"
    >
      <v-app-bar-title v-if="true" color="white" class="flex-grow-1">
        Planetarify Pro
      </v-app-bar-title>
      <v-btn :prepend-icon="loop ? mdiRepeatVariant : mdiRepeatOff" @click="toggleLoop">
        {{ smAndUp ? (loop ? "loop" : "no loop") : "" }}
      </v-btn>
      <v-btn icon @click="togglePlaylist">
        <v-icon :icon="mdiClose" />
      </v-btn>
    </v-card>
  </div>
</template>
