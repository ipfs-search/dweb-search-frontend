<template>
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
                <!-- Subheader -->
                <v-row>
                  <v-col>
                    <div class="text-caption mb-n8 text-truncate">
                      <span class="">Last seen 1 day ago</span>
                      <span> | Size 478mb</span><span> | Mimetype text/html</span>
                    </div>
                  </v-col>
                </v-row>

                <!-- Title -->
                <v-row>
                  <v-col>
                    <div class="text-h6 font-weight-regular">
                      Unlimited Music Now
                    </div>
                  </v-col>
                </v-row>

                <!-- Video -->
                <v-row>
                  <v-col>
                    <div class="text-body-1">
                      <video-player
                        :options="videoOptions"
                      />
                    </div>
                  </v-col>
                </v-row>

                <!-- Meta data -->
                <v-row>
                  <v-col>
                    <div class="text-body-1">
                      <v-expansion-panels>
                        <v-expansion-panel>
                          <v-expansion-panel-header>
                            <template v-slot:default="{ open }">
                              <div>
                                {{ `${open ? 'Hide' : 'Show'}` }} meta data
                              </div>
                            </template>
                          </v-expansion-panel-header>
                          <v-expansion-panel-content class="ml-n2 mr-0">
                            <v-simple-table>
                              <template v-slot:default>
                                <thead>
                                  <tr>
                                    <th class="text-left">
                                      Name
                                    </th>
                                    <th class="text-left">
                                      Calories
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr
                                    v-for="item in desserts"
                                    :key="item.name"
                                  >
                                    <td>{{ item.name }}</td>
                                    <td>{{ item.calories }}</td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                          </v-expansion-panel-content>
                        </v-expansion-panel>
                      </v-expansion-panels>
                    </div>
                  </v-col>
                </v-row>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>

<script>
import VideoPlayer from '@/components/VideoPlayer.vue';

export default {
  components: {
    VideoPlayer,
  },

  data() {
    return {
      sheet: false,
      videoOptions: {
        controls: true,
        sources: [
          {
            src: '//vjs.zencdn.net/v/oceans.mp4',
            type: 'video/mp4',
          },
        ],
        fluid: true,
      },
      desserts: [
        {
          name: 'Frozen Yogurt',
          calories: 159,
        },
        {
          name: 'Ice cream sandwich',
          calories: 237,
        },
        {
          name: 'Eclair',
          calories: 262,
        },
        {
          name: 'Cupcake',
          calories: 305,
        },
        {
          name: 'Gingerbread',
          calories: 356,
        },
        {
          name: 'Jelly bean',
          calories: 375,
        },
        {
          name: 'Lollipop',
          calories: 392,
        },
        {
          name: 'Honeycomb',
          calories: 408,
        },
        {
          name: 'Donut',
          calories: 452,
        },
        {
          name: 'KitKat',
          calories: 518,
        },
      ],
    };
  },
};
</script>

<style lang="scss" scoped>
@import '~video.js/dist/video-js.css';
</style>
