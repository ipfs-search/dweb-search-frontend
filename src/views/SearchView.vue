<script setup>
import SearchBar from '@/components/SearchBar.vue';
import SearchFilters from '@/components/SearchFilters.vue';
import SettingsMenu from '@/components/SettingsMenu.vue';
import GenericList from '@/components/results/list/GenericList.vue';
import ImageList from '@/components/results/list/ImageList.vue';
import AudioList from '@/components/results/list/AudioList.vue';
import VideoList from '@/components/results/list/VideoList.vue';
import OtherList from '@/components/results/list/OtherList.vue';

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
      color="ipfsPrimary lighten-1"
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
              <div
                class="d-flex align-center"
                style="cursor: pointer;"
                @click="goHome"
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
              </div>
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
    <AudioList :file-type="Types.audio" v-if="listType(Types.audio)" />
    <ImageList :file-type="Types.images" v-if="listType(Types.images)" />
    <VideoList :file-type="Types.video" v-if="listType(Types.video)" />
    <GenericList :file-type="Types.directories" v-if="listType(Types.directories)" />
    <GenericList :file-type="Types.other" v-if="listType(Types.other)" />
  </div>
</template>

<script>

export default {
  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
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
