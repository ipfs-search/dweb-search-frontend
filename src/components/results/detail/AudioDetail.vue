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
        style="
          position: absolute;
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
                <!-- Content -->
                <div>
                  <v-row>
                    <v-col
                      cols="12"
                      md="8"
                      offset-md="2"
                    >
                      <MediaHeader
                        :file="$props.file"
                      />
                    </v-col>
                  </v-row>

                  <v-row test-class="audiovisual">
                    <!-- Left - video or preview image with title and subcaption above -->
                    <v-col
                      cols="12"
                      md="8"
                      offset-md="2"
                    >
                      <v-row>
                        <v-col>
                          <v-img
                            src="https://picsum.photos/510?random"
                            aspect-ratio="1"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                          >
                            <AudioDetailButton
                              v-if="$data.error"
                              :title="$data.error"
                            >
                              mdi-alert
                            </AudioDetailButton>
                            <AudioDetailButton
                              v-else-if="!currentlyLoadedInPlayer"
                              @click="loadSoundFile($props.file)"
                            >
                              mdi-play
                            </AudioDetailButton>
                            <AudioDetailButton
                              v-else-if="currentlyLoadedInPlayer && loading"
                              loading
                            />
                            <AudioDetailButton
                              v-else-if="currentlyLoadedInPlayer && playing"
                              @click="pause"
                            >
                              mdi-pause
                            </AudioDetailButton>
                            <AudioDetailButton
                              v-else
                              @click="play"
                            >
                              mdi-play
                            </AudioDetailButton>
                          </v-img>
                        </v-col>
                      </v-row>

                      <MetaDataPanel
                        :file="$props.file"
                        test-class="metadatapanel"
                      />
                    </v-col>
                  </v-row>
                </div>
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>

<script>
import MediaHeader from '@/components/results/detail/MediaHeader';
import MetaDataPanel from '@/components/results/detail/MetaDataPanel';
import AudioDetailButton from '@/components/helpers/AudioDetailButton';
import AudioControlsMixin from '../../../mixins/AudioControlsMixin';
import DetailMixin from '@/mixins/DetailMixin';

export default {
  mixins: [
    DetailMixin,
    AudioControlsMixin,
  ],
  components: {
    AudioDetailButton,
    MetaDataPanel,
    MediaHeader,
  },
  props: {
    file: {
      type: Object,
      required: true,
    },
  },
  computed: {
    currentlyLoadedInPlayer() {
      return this.$props.file.hash === this.sourceFile?.hash;
    },
  },
};
</script>

<style lang="scss" scoped>
.highlight {
  background: rgba(100, 100, 100, 0.1);
  // border: 1px solid lighten(grey, 10);
}
</style>
