<template>
  <v-sheet
    height="100%"
    tile
    :light="!$vuetify.theme.dark"
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
                <MediaHeader :file="file" />
                <!-- Text -->
                <v-row>
                  <v-col>
                    <PdfViewer
                      v-if="true"
                      :src="`https://gateway.ipfs.io/ipfs/${file.hash}`"
                    />
                  </v-col>
                </v-row>

                <!-- Meta data -->
                <v-row>
                  <v-col>
                    <div class="text-body-1 mt-n3">
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

import MediaHeader from '@/components/results/detail/MediaHeader.vue';
import PdfViewer from '@/components/results/detail/documentViewers/PdfViewer.vue';

export default {
  components: {
    MediaHeader,
    PdfViewer,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
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

</style>
