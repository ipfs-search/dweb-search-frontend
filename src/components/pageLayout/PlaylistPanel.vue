<script setup>
import { useStore } from "vuex";
const store = useStore();
</script>

<template>
  <v-container>
    <v-list>
      <v-list-item
        v-for="entry in store.getters('playlist/getPlaylist')?.entries"
        :key="entry.hash"
      >
        <v-list-item-title>{{ entry.title }}</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-container>
</template>
