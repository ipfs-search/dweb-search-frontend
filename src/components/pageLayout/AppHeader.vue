<script setup>
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import SettingsMenu from "@/components/pageLayout/SettingsMenu.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { useStore } from "vuex";
const store = useStore();

import { mdiClose, mdiMusic } from "@mdi/js";

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();

import { useTheme } from "vuetify";
import Hyperlink from "@/components/shared/HyperLink.vue";
const theme = useTheme();

const whiteLogo = computed(() => theme.current.value.dark || route.name === "Search");

import { togglePlaylist } from "@/composables/audioControls.ts";
</script>

<template>
  <v-app-bar
    app
    class="px-4"
    height="56"
    theme="route.name === Search ? 'dark' : 'light'"
    :color="route.name === 'Search' ? 'ipfsPrimary-lighten-1' : 'toolbar-light'"
  >
    <v-container fluid class="px-0 align-start">
      <v-row>
        <v-col cols="12" class="px-0 d-flex justify-space-between align-center">
          <div class="ml-2">
            <hyperlink to="/" class="d-flex align-center">
              <v-img
                v-if="mdAndUp || route.name === 'Detail'"
                alt="ipfs-search.com logo"
                contain
                :src="`/assets/logo-${whiteLogo ? 'white' : 'black'}.svg`"
                width="168"
                height="28"
                :aspect-ratio="6.00840336"
              />
              <v-img
                v-else
                alt="ipfs-search.com logo"
                contain
                :src="`/assets/logo-hexagon-${whiteLogo ? 'white' : 'black'}.svg`"
                width="28"
                height="28"
              />
            </hyperlink>
          </div>

          <div v-if="route.name === 'Search'" class="flex-grow-1">
            <SearchBar />
          </div>
          <div v-if="route.name === 'Search'" class="d-none d-lg-block" style="min-width: 200px" />
          <v-spacer v-else />

          <v-btn v-if="store.getters['playlist/getPlaylist']" icon @click="togglePlaylist">
            <v-icon :icon="mdiMusic" />
          </v-btn>

          <settings-menu />

          <hyperlink
            v-if="route.name === 'Detail'"
            :to="{ name: 'Search', query: route.query }"
            replace
          >
            <v-btn icon>
              <v-icon :icon="mdiClose" />
            </v-btn>
          </hyperlink>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
