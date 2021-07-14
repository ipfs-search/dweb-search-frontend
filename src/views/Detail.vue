<template>
  <div>
    <v-app-bar
      app
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
                  v-if="$vuetify.theme.dark"
                  alt="ipfs-search.com logo"
                  contain
                  src="../assets/logo-white.svg"
                  width="168"
                  :aspect-ratio="6.00840336"
                />
                <v-img
                  v-else
                  alt="ipfs-search.com logo"
                  contain
                  src="../assets/logo-black.svg"
                  width="168"
                  :aspect-ratio="6.00840336"
                />
              </div>
            </div>
            <v-spacer />
            <v-btn
              icon
              @click="$router.go(-1)"
            >
              <v-icon>
                mdi-close
              </v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <div
      class="detail"
      style="position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;"
    >
      <v-carousel
        v-model="model"
        height="100%"
        hide-delimiters
        hide-delimiter-background
      >
        <v-carousel-item>
          <v-sheet
            height="100%"
            tile
            :light="$vuetify.theme.dark ? false : true"
          >
            <v-row
              class="fill-height ma-0 pa-0"
            >
              <div
                style="position: absolute;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;"
              >
                <div
                  class="inline-block"
                  style="height: 100% !important; overflow-y: auto !important;"
                >
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        xl="8"
                        offset-xl="2"
                        :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
                      >
                        <text-detail />
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item>
          <v-sheet
            :light="$vuetify.theme.dark ? false : true"
            height="100%"
            tile
          >
            <v-row
              class="fill-height ma-0 pa-0"
            >
              <div
                style="position: absolute;
                  top: 0;
                  left: 0;
                  bottom: 0;
                  right: 0;"
              >
                <div
                  class="inline-block"
                  style="height: 100% !important; overflow-y: auto !important;"
                >
                  <v-container>
                    <v-row>
                      <v-col
                        cols="12"
                        xl="8"
                        offset-xl="2"
                        :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
                      >
                        <video-detail />
                      </v-col>
                    </v-row>
                  </v-container>
                </div>
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>

        <v-carousel-item
          v-for="(color, i) in colors"
          :key="color"
        >
          <v-sheet
            :color="color"
            height="100%"
            tile
          >
            <v-row
              class="fill-height ma-0 pa-0"
              align="center"
              justify="center"
            >
              <div class="text-h2">
                Slide {{ i + 1 }}
              </div>
            </v-row>
          </v-sheet>
        </v-carousel-item>
      </v-carousel>
    </div>
  </div>
</template>

<script>
import VideoDetail from '@/components/results/detail/VideoDetail.vue';
import TextDetail from '@/components/results/detail/TextDetail.vue';

export default {
  components: {
    VideoDetail,
    TextDetail,
  },

  data: () => ({
    model: 0,
    colors: [
      'primary',
      'secondary',
      'yellow darken-2',
      'red',
      'orange',
    ],
  }),

  methods: {
    goHome() {
      this.$router.push({ path: '/' });
    },
  },
};
</script>

<style lang="scss">

</style>
