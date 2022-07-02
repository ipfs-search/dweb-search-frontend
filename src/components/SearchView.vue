<script setup>
import SearchBar from '@/components/pageLayout/SearchBar.vue';
import SearchFilters from '@/components/searchViewComponents/subcomponents/SearchFilters.vue';
import SettingsMenu from '@/components/pageLayout/SettingsMenu.vue';
import GenericList from '@/components/searchViewComponents/BaseList.vue';
import ImageList from '@/components/searchViewComponents/ImageList.vue';
import AudioList from '@/components/searchViewComponents/AudioList.vue';
import VideoList from '@/components/searchViewComponents/VideoList.vue';

import { Types } from '@/helpers/typeHelper';

import { useDisplay } from 'vuetify'
const { smAndDown, mdAndUp } = useDisplay()
</script>

<template>
  <div class="result">
    <!-- App bar with nested container, row and col component
      for layout logo and search bar using flex-->
    <v-app-bar
      app
      class="px-4"
      color="ipfsPrimary-lighten-1"
      height="56"
    >
      <v-container
        fluid
        class="px-0 align-start"
      >
        <v-row>
          <v-col
            cols="12"
            class="px-0 d-flex justify-space-between align-center"
          >
            <div
              class="ml-2"
            >
              <router-link
                to="/"
                class="d-flex align-center"
                style="cursor: pointer;"
              >
                <v-img
                  v-if="mdAndUp"
                  alt="ipfs-search.com logo"
                  contain
                  src="/assets/logo-white.svg"
                  width="168"
                  height="28"
                  :aspect-ratio="6.00840336"
                />
                <v-img
                  v-if="smAndDown"
                  alt="ipfs-search.com logo"
                  contain
                  src="/assets/logo-hexagon-white.svg"
                  width="28"
                  height="28"
                />
              </router-link>
            </div>
            <div class="flex-grow-1">
              <SearchBar />
            </div>
            <div
              class="d-none d-lg-block"
              style="min-width: 200px"
            />
            <settings-menu />
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <SearchFilters />

    <GenericList :file-type="Types.text" v-if="listType(Types.text)" />
    <AudioList :short-list=6 v-if="listType(Types.audio)" />
    <ImageList :short-list=6 v-if="listType(Types.images)" />
    <VideoList v-if="listType(Types.video)" />
    <GenericList :file-type="Types.directories" v-if="listType(Types.directories)" />
    <GenericList :file-type="Types.other" v-if="listType(Types.other)" />
  </div>
</template>

<script>

export default {
  methods: {
    listType(t) {
      return [t, 'any', undefined].includes(this.$route.query.type);
    },
  },
};
</script>

<style lang="scss" scoped>
  h2 {
    font-size: 120%;
    letter-spacing: 0.09em;
    font-weight: 500;
    span {
      font-weight: 500;
    }
  }

  .searchbar {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom:0;
  }
</style>
