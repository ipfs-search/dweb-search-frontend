<template>
  <v-app dark hidden>
    <slot name="header"></slot>
    <!-- <v-app-bar
      app
      color="white"
      height="58"
      light
    >
      <v-container
        class="px-0"
      >
        <v-row>
          <v-col
            cols="12"
            xl="8"
            offset-xl="2"
            class="d-flex justify-space-between align-center"
          >
            <div class="d-flex align-center">
              <v-img
                alt="DWEB Search Logo"
                class="pl-1 mr-2"
                contain
                src="./assets/logo_primary.svg"
                width="32"
                height="32"
              />
              <h2 class="">DWEB <span>SEARCH</span></h2>
            </div>
            <v-spacer />
            <v-btn

              v-for="link in links"
              :key="link"
              text
              small
              class="my-2 mx-1 hidden-sm-and-down"
            >
              {{ link }}
            </v-btn>

            <v-menu
              bottom
              left
              class=""
            >
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  icon
                  v-bind="attrs"
                  class="my-2 mx-1 hidden-md-and-up"
                  v-on="on"
                >
                  <v-icon>mdi-dots-vertical</v-icon>
                </v-btn>
              </template>

              <v-list>
                <v-list-item
                  v-for="(link, i) in links"
                  :key="i"
                >
                  <v-list-item-title>{{ link }}</v-list-item-title>
                </v-list-item>
              </v-list>
            </v-menu>

          </v-col>
        </v-row>
      </v-container>
    </v-app-bar> -->
    <v-main>
      <router-view/>
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
        <!-- <v-btn
          v-for="link in links"
          :key="link"
          small
          class="my-2 mx-1"
        >
          {{ link }}
        </v-btn> -->
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

  // eslint-disable-next-line
  mounted:function () {
    this.$nextTick(function () {
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
