<script setup>
import { useDisplay } from 'vuetify';

const { smAndUp } = useDisplay()
const footer_links = [
  {
    icon: 'mdi-mastodon',
    href: 'https://mastodon.social/@ipfssearch',
  },
  {
    icon: 'mdi-twitter',
    href: 'https://twitter.com/SearchIpfs',
  },
  {
    icon: 'mdi-github',
    href: 'https://github.com/ipfs-search/ipfs-search',
  },
  {
    icon: 'mdi-hand-coin',
    href: 'https://opencollective.com/ipfs-search#category-CONTRIBUTE',
  },
  {
    icon: 'mdi-email',
    href: 'mailto:info@ipfs-search.com',
  },
]
</script>

<template>
    <v-card
      v-scroll="onScroll"
      :class="{ 'footer--hidden': hideFooter }"
      position="fixed"
      variant="flat"
      tile
      class="footer bg-ipfsPrimary-lighten-1 text-center"
      rounded="0"
      width="101%"
    >
      <v-card-text
        class="ipfsPrimary-lighten-1 justify-center d-flex flex-row text-caption py-1"
      >
        <v-btn
          v-for="(link, i) in footer_links"
          :key="i"
          :href="link.href"
          :class="smAndUp ? 'mx-4' : 'mx-1'"
          icon
          flat
          class="text-white bg-transparent"
        >
          <v-icon
            :size="smAndUp ? 24 : 18"
            class="ipfsPrimary-lighten-1"
          >
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider
        color="ipfsPrimary-lighten-4"
        length="100%"
      />
      <v-card-text
        class="ipfsPrimary-lighten-1 text-white text-center text-caption py-7"
        style="margin: auto;"
      >
        <div
          :style="smAndUp ? 'margin-top: -7px;' : 'margin-top: -14px;'"
        >
          Funded through the
          <a
            href="https://nlnet.nl/project/IPFS-search/"
          >
            NLNet/NGI0 Discovery Fund
          </a>
          and&nbsp;proudly&nbsp;sponsered&nbsp;by&nbsp;<a
            href="https://redpencil.io/"
          >redpencil.io</a>
        </div>
      </v-card-text>
    </v-card>
</template>

<script>
import { audioPlayer } from '@/plugins/audioPlugin';

export default {
  data: () => ({
    audioPlayer,
    lastScrollPosition: 0,
    hideFooter : false,
  }),

  computed: {
    playerActive() {
      return this.audioPlayer.sourceFile && this.audioPlayer.sound;
    },
  },
  methods: {
    onScroll() {
      const { scrollTop } = document.documentElement;
      this.hideFooter = (scrollTop > 300) && (scrollTop > this.lastScrollPosition);
      this.lastScrollPosition = document.documentElement.scrollTop;
    },
  },
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
