<script setup>
import MediaHeader from '@/components/detailViewComponents/SubComponents/MediaHeader.vue';
import MetaDataPanel from '@/components/detailViewComponents/SubComponents/MetaDataPanel.vue';

import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()

import { useDetail, detailProps } from '@/composables/useDetail';
const props = defineProps(detailProps)
const { resourceURL, file } = useDetail(props)

import { useBlurExplicit } from '@/composables/BlurExplicitImagesComposable';
const { blurExplicit } = useBlurExplicit();
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
                <!-- Content -->
                <div>
                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                      offset-md="1"
                    >
                      <MediaHeader
                        :file="file"
                      />
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col
                      cols="12"
                      md="10"
                      offset-md="1"
                      :class="{ blurExplicit: blurExplicit(file)}"
                    >
                      <img
                        :src="resourceURL"
                        class="image-wrapper"
                      >
                      <MetaDataPanel
                        class="mt-2"
                        :file="file"
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

<style lang="scss" scoped>

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
