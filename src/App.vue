<template>
  <v-app
    dark
    hidden
  >
    <v-main>
      <router-view />
    </v-main>

    <v-footer
      app
      padless
      color="white"
      fixed
      class="hidden-sm-and-down"
      v-if="!(this.$route.name === 'Detail')"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="ipfsPrimary lighten-1 white--text py-4 text-center text-caption"
          cols="12"
        >
          Funded through the <a href="https://nlnet.nl/project/IPFS-search/">NLNet/NGI0 Discovery Fund</a> and proudly sponsered by <a href="https://redpencil.io/">redpencil.io</a>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  $el: '#app',

  data: () => ({
    links: [
      'Snapshots',
      'API',
      'Code',
      'Contact',
    ],
  }),

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
