<script setup>
import SearchBar from "@/components/pageLayout/SearchBar.vue";
import SettingsMenu from "@/components/pageLayout/SettingsMenu.vue";
import { computed } from "vue";
import { useRoute } from "vue-router";
const route = useRoute();
import { useStore } from "vuex";
const store = useStore();

import { mdiClose, mdiPlaylistMusic, mdiDotsVertical } from "@mdi/js";

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();

import { useTheme } from "vuetify";
import Hyperlink from "@/components/shared/HyperLink.vue";
const theme = useTheme();

const whiteLogo = computed(() => theme.current.value.dark || route.name === "Search");

import {
  togglePlaylist,
  playlistVisible,
  audioDetailPopup,
  showAudioDetail,
} from "@/composables/audioControls.ts";
import PlanetarifyToolbar from "@/components/pageLayout/PlanetarifyToolbar.vue";

const links = [
  {
    title: "Donate",
    href: "https://opencollective.com/ipfs-search#category-CONTRIBUTE",
  },
  {
    title: "Blog",
    href: "https://blog.ipfs-search.com/",
  },
  {
    title: "API",
    href: "https://api.ipfs-search.com/",
  },
  {
    title: "Docs",
    href: "https://ipfs-search.readthedocs.io/en/latest/",
  },
  {
    title: "Code",
    href: "https://github.com/ipfs-search/",
  },
  {
    title: "Contact",
    href: "mailto:info@ipfs-search.com",
  },
];
</script>

<template>
  <v-app-bar
    v-if="route.name !== 'Home' || audioDetailPopup"
    class="px-4"
    height="56"
    :color="route.name !== 'Detail' ? 'ipfsPrimary-lighten-1' : 'toolbar-light'"
  >
    <v-container fluid class="px-0 align-start">
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2" class="d-flex justify-space-between align-center">
          <div class="ml-2">
            <hyperlink to="/" class="d-flex align-center" @click="playlistVisible = false">
              <v-img
                v-if="mdAndUp || route.name === 'Detail' || audioDetailPopup"
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

          <div
            v-if="route.name === 'Search' && !audioDetailPopup"
            :class="{ 'flex-grow-1': !playlistVisible }"
          >
            <SearchBar />
          </div>
          <!--          <div v-if="route.name === 'Search'" class="d-none d-lg-block" style="min-width: 200px" />-->
          <!--          <v-spacer v-else />-->

          <planetarify-toolbar v-if="playlistVisible" />

          <div v-else id="end-buttons" class="d-flex flex-row justify-end">
            <v-btn icon @click="togglePlaylist">
              <v-icon :icon="mdiPlaylistMusic" />
            </v-btn>

            <settings-menu />

            <hyperlink
              v-if="route.name === 'Detail' || audioDetailPopup"
              :to="{ name: 'Search', query: route.query }"
              replace
              :disabled="audioDetailPopup"
            >
              <v-btn icon @click="showAudioDetail(undefined)">
                <v-icon :icon="mdiClose" />
              </v-btn>
            </hyperlink>
          </div>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
  <!--  home page app bar-->
  <!--  Todo: combine the two versions into 1 generic appbar-->
  <v-app-bar v-else app height="56" class="px-4 bg-ipfsPrimary" elevate-on-scroll theme="dark">
    <v-container class="px-0">
      <v-row>
        <v-col cols="12" xl="8" offset-xl="2" class="d-flex justify-space-between align-center">
          <div
            class="d-flex align-center"
            @click="
              playlistVisible = false;
              audioDetailPopup = undefined;
            "
          >
            <v-img
              v-if="mdAndUp || !playlistVisible"
              alt="ipfs-search.com logo"
              contain
              src="/assets/logo-white.svg"
              width="168"
              :aspect-ratio="6.00840336"
            />
            <v-img
              v-else
              alt="ipfs-search.com logo"
              contain
              src="/assets/logo-hexagon-white.svg"
              width="28"
              height="28"
            />
          </div>
          <v-spacer v-if="!playlistVisible" />

          <planetarify-toolbar v-if="playlistVisible" class="ml-3" />
          <v-btn
            v-for="(link, i) in links"
            v-else
            :key="i"
            :href="link.href"
            :text="link.title"
            size="small"
            class="my-2 mx-1 hidden-sm-and-down"
          />

          <v-menu v-if="!playlistVisible" bottom left>
            <template #activator="{ props }">
              <v-btn
                v-bind="props"
                class="my-2 mx-0 mr-n2 hidden-md-and-up"
                :icon="mdiDotsVertical"
              />
            </template>

            <v-list>
              <v-list-item v-for="(link, i) in links" :key="i" :href="link.href">
                <v-list-item-title>
                  {{ link.title }}
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>

          <v-btn
            v-if="store.getters['playlist/getPlaylist'] && !playlistVisible"
            icon
            @click="togglePlaylist"
          >
            <v-icon :icon="playlistVisible ? mdiClose : mdiPlaylistMusic" />
          </v-btn>

          <settings-menu v-if="!playlistVisible" />
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
