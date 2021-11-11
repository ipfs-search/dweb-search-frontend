<template>
  <v-app
    dark
    hidden
  >
    <AudioPlayer />

    <v-main>
      <router-view />
    </v-main>

    <!-- This is a replacement for the footer, it'll dissapear on scroll -->
    <v-app-bar
      padless
      color="white"
      bottom
      fixed
      class="hidden-xs-and-down"
      hide-on-scroll
      scroll-threshold="300"
      height="105"
      v-if="!(this.$route.name === 'Detail')"
    >
      <v-card
        flat
        tile
        class="lighten-1 text-center"
        width="100%"
      >
        <v-card-text
          class="py-1"
        >
          <v-btn
            v-for="(link, i) in footer_links"
            :key="i"
            :href="link.href"
            class="mx-4"
            icon
          >
            <v-icon size="24px">
              {{ link.icon }}
            </v-icon>
          </v-btn>
        </v-card-text>
        <v-card-text
          class="ipfsPrimary lighten-1 white--text py-4 text-center text-caption"
        >
          Funded through the
          <a
            href="https://nlnet.nl/project/IPFS-search/"
          >
            NLNet/NGI0 Discovery Fund
          </a>
          and proudly sponsered by
          <a
            href="https://redpencil.io/"
          >
            redpencil.io
          </a>
        </v-card-text>
      </v-card>
    </v-app-bar>
  </v-app>
</template>

<script>
import AudioPlayer from '@/components/AudioPlayer';

export default {
  components: { AudioPlayer },
  $el: '#app',

  data: () => ({
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

  methods: {
    setDefaultTheme() {
      const isDark = window.matchMedia('(prefers-color-scheme:dark)').matches;
      this.$vuetify.theme.dark = isDark;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.$el.removeAttribute('hidden');
      this.setDefaultTheme();
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
