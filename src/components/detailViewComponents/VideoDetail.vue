<script setup>
import MediaHeader from '@/components/detailViewComponents/SubComponents/MediaHeader.vue';
import MetaDataPanel from '@/components/detailViewComponents/SubComponents/MetaDataPanel.vue';
import 'video.js/dist/video-js.css';

import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()

import { useDetail, detailProps } from '@/composables/useDetail';
const props = defineProps(detailProps)
const { resourceUrl, file, active } = useDetail(props)
</script>

<template>
  <v-sheet
    :light="!$vuetify.theme.dark"
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
                :class="mdAndUp ? 'mb-16' : ''"
              >
                <MediaHeader :file="file" />
                <!-- Video -->
                <v-row>
                  <v-col>
                    <div
                      class="text-body-1"
                    >
                      <video-player
                        :options="videoOptions"
                      />
                    </div>
                  </v-col>
                </v-row>

                <MetaDataPanel
                  :file="file"
                  test-class="metadatapanel"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>

<script>
import VideoPlayer from '@/components/detailViewComponents/SubComponents/VideoPlayer.vue';

export default {
  components: {
    VideoPlayer,
  },
  computed: {
    videoOptions() {
      return {
        controls: true,
        sources: [
          {
            src: this.resourceURL,
            type: this.file.mimetype,
          },
        ],
        fluid: true,
      };
    },
  },
};
</script>
