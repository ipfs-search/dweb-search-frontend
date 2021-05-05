<template>
  <v-app
    dark
    hidden
  >
    <slot name="header" />

    <v-main>
      <router-view />
    </v-main>

    <v-footer
      app
      padless
      color="white"
      fixed
      class="hidden-sm-and-down"
    >
      <v-row
        justify="center"
        no-gutters
      >
        <v-col
          class="primary lighten-1 white--text py-4 text-center text-caption"
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
