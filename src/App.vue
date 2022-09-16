<script setup>
//TODO: make AppHeader generic also for homeview
import AppHeader from "@/components/pageLayout/AppHeader.vue";
import { useRoute } from "vue-router";
import PlayList from "./components/pageLayout/PlayList.vue";

const route = useRoute();
</script>

<template>
  <v-app dark hidden>
    <app-header v-if="route.name !== 'Home'" />

    <v-main>
      <play-list />
      <router-view />
    </v-main>

    <AudioPlayer />
    <AppFooter />
  </v-app>
</template>

<script>
import AudioPlayer from "@/components/pageLayout/AudioPlayer.vue";
import AppFooter from "@/components/pageLayout/AppFooter.vue";

export default {
  components: {
    AudioPlayer,
    AppFooter,
  },
  $el: "#app",

  mounted() {
    this.$nextTick(() => {
      this.$el.removeAttribute("hidden");
    });
  },
};
</script>

<style lang="scss" scoped>
/*
    This is due to a bug with the application height in Safari on IPhone
    https://stackoverflow.com/questions/62167456/use-of-v-app-bar-causes-v-content-to-always-have-an-overflow-identical-to-the-he
  */
@supports (-webkit-touch-callout: none) {
  /* CSS specific to iOS devices */
  div.v-application--wrap {
    min-height: calc(100vh - 56px) !important;
  }
}

//#main {
//  position: absolute;
//  top: 0;
//  left: 0;
//  bottom: 0;
//  right: 0;
//}
</style>
