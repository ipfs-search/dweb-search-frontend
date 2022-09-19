<script setup>
import { useRoute } from "vue-router";
const route = useRoute();
import { audioPlayer, playlistVisible } from "@/composables/audioControls";

import { useDisplay } from "vuetify";
const { mdAndUp, smAndUp } = useDisplay();
import { mdiMastodon, mdiTwitter, mdiGithub, mdiHandCoin, mdiEmail } from "@mdi/js";

import { footerVisible } from "@/composables/footer";

const footer_links = [
  {
    icon: mdiMastodon,
    href: "https://mastodon.social/@ipfssearch",
  },
  {
    icon: mdiTwitter,
    href: "https://twitter.com/SearchIpfs",
  },
  {
    icon: mdiGithub,
    href: "https://github.com/ipfs-search",
  },
  {
    icon: mdiHandCoin,
    href: "https://opencollective.com/ipfs-search#category-CONTRIBUTE",
  },
  {
    icon: mdiEmail,
    href: "mailto:info@ipfs-search.com",
  },
];
</script>

<template>
  <v-card
    :class="{
      'footer--hidden':
        route.name !== 'Home' && (!footerVisible || audioPlayer.file || playlistVisible),
    }"
    position="fixed"
    variant="flat"
    tile
    class="footer bg-ipfsPrimary-lighten-1 text-center"
    rounded="0"
    width="101%"
    height="120px"
  >
    <v-card-text class="ipfsPrimary-lighten-1 justify-center d-flex flex-row text-caption py-1">
      <v-btn
        v-for="(link, i) in footer_links"
        :key="i"
        :href="link.href"
        :class="smAndUp ? 'mx-4' : 'mx-1'"
        icon
        flat
        class="text-white bg-transparent"
      >
        <v-icon :size="smAndUp ? 24 : 18" class="ipfsPrimary-lighten-1" :icon="link.icon" />
      </v-btn>
    </v-card-text>
    <v-divider color="ipfsPrimary-lighten-4" length="100%" />
    <v-card-text
      class="ipfsPrimary-lighten-1 text-white text-center text-caption py-7"
      style="margin: auto"
    >
      <div :style="smAndUp ? 'margin-top: -7px;' : 'margin-top: -14px;'">
        Funded through the
        <a href="https://nlnet.nl/project/IPFS-search/"> NLNet/NGI0 Discovery Fund </a>
        and&nbsp;proudly&nbsp;sponsered&nbsp;by&nbsp;<a href="https://redpencil.io/"
          >redpencil.io</a
        >
      </div>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    lastScrollPosition: 0,
  }),
};
</script>

<style lang="scss" scoped>
.footer {
  transition: 200ms all ease-in-out;
  bottom: 0;
}
.footer:not(.footer--hidden) {
  transform: translate3d(0, 0, 0);
}
.footer--hidden {
  transform: translate3d(0, 100%, 0);
}
.v-card-text a {
  color: #78909c;
}
</style>
