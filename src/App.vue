<!-- 
SPDX-FileCopyrightText: 2022 Mathijs de Bruin <mathijs@visualspace.nl>
SPDX-FileCopyrightText: 2022 Dweb-search-frontend

SPDX-License-Identifier: AGPL-3.0-only

Dweb-search-frontend
-->


<template>
  <v-app
    dark
    hidden
  >
    <AudioPlayer />

    <v-main>
      <router-view />
    </v-main>

    <AppFooter />
  </v-app>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer';
import AppFooter from '@/components/AppFooter';

export default {
  components: {
    AudioPlayer,
    AppFooter,
  },
  $el: '#app',

  mounted() {
    this.$nextTick(() => {
      this.$el.removeAttribute('hidden');
    });
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
</style>

<style lang="scss">
  /*
    This is due to a bug with the application height in Safari on IPhone
    https://stackoverflow.com/questions/62167456/use-of-v-app-bar-causes-v-content-to-always-have-an-overflow-identical-to-the-he
  */
  @supports (-webkit-touch-callout: none) {
    /* CSS specific to iOS devices */
    div.v-application--wrap {
      min-height:calc(100vh - 56px) !important;
    }
  }
</style>
