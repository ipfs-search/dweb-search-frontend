<template>
  <v-footer
    v-if="!($route.name === 'Detail') && !playerActive"
    fixed
    padless
    :class="{ 'footer--hidden': !showFooter }"
  >
    <v-card
      flat
      tile
      class="lighten-1 text-center"
      width="100%"
    >
      <v-card-text
        class="ipfsPrimary lighten-1 py-1"
      >
        <v-btn
          v-for="(link, i) in footer_links"
          :key="i"
          :href="link.href"
          :class="$vuetify.breakpoint.smAndUp ? 'mx-4' : 'mx-1'"
          icon
        >
          <v-icon
            :size="$vuetify.breakpoint.smAndUp ? 24 : 18"
            color="white"
          >
            {{ link.icon }}
          </v-icon>
        </v-btn>
      </v-card-text>
      <v-divider
        class="ipfsPrimary lighten-4"
      />
      <v-card-text
        class="ipfsPrimary lighten-1 white--text text-center text-caption py-7"
        style="margin: auto;"
      >
        <div
          :style="$vuetify.breakpoint.smAndUp ? 'margin-top: -7px;' : 'margin-top: -14px;'"
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
  </v-footer>
</template>

<script>
import { audioPlayer } from '@/plugins/audioPlugin';

export default {
  data: () => ({
    audioPlayer,
    lastScrollPosition: 0,
    showFooter: true,
    footer_links: [
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
    ],
  }),

  computed: {
    playerActive() {
      return this.audioPlayer.sourceFile && this.audioPlayer.sound;
    },
  },

  mounted() {
    this.$nextTick(() => {
      window.addEventListener('scroll', this.onScroll);
    });
  },

  beforeUnmount() {
    window.removeEventListener('scroll', this.onScroll);
  },

  methods: {
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;
      if (currentScrollPosition < 0) {
        return;
      }
      // Scroll threshold
      if (Math.abs(currentScrollPosition - this.lastScrollPosition) < 300) {
        return;
      }
      this.showFooter = currentScrollPosition < this.lastScrollPosition;
      this.lastScrollPosition = currentScrollPosition;
    },
  },
};
</script>

<style lang="scss" scoped>
  .v-footer {
    transform: translate3d(0, 0, 0);
    transition: 200ms all ease-in-out;
    &.footer--hidden {
      transform: translate3d(0, 100%, 0);
    }
  }
</style>
