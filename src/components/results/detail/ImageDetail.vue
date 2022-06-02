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
                <!-- Content -->
                <div>
                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                      offset-md="1"
                    >
                      <MediaHeader
                        :file="$props.file"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                      offset-md="1"
                    >
                      <div
                        :class="{ blurExplicit: blurExplicit(file)}"
                        class="image-wrapper"
                        :style="{'background-image': `url(${resourceURL})`}"
                      />
                      <MetaDataPanel
                        class="mt-2"
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
import MediaHeader from '@/components/results/detail/helpers/MediaHeader';
import MetaDataPanel from '@/components/results/detail/helpers/MetaDataPanel';
import { blurExplicit } from '@/mixins/BlurExplicitImagesModule';
import DetailMixin from './mixins/DetailMixin';

export default {
  setup() {
    return { blurExplicit };
  },
  mixins: [
    DetailMixin,
  ],
  components: {
    MetaDataPanel,
    MediaHeader,
  },
};
</script>

<style lang="scss" scoped>
@import '@/scss/blurExplicitImages';

.image-wrapper {
  width: 100% !important;
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center center;
}
.image-wrapper:after {
  content: "";
  display: block;
  padding-bottom: 100%;
}
</style>
