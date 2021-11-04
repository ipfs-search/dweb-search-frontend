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
                :class="$vuetify.breakpoint.mdAndUp ? 'mb-16' : ''"
              >
                <MediaHeader :file="$props.file" />
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

                <MetaDataPanel
                  :file="$props.file"
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
import VideoPlayer from '@/components/VideoPlayer';
import MediaHeader from '@/components/results/detail/MediaHeader';
import MetaDataPanel from '@/components/results/detail/MetaDataPanel';
import DetailMixin from '@/mixins/DetailMixin';

export default {
  mixins: [
    DetailMixin,
  ],
  components: {
    MetaDataPanel,
    MediaHeader,
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

<style lang="scss" scoped>
@import '~video.js/dist/video-js.css';
</style>
