<script setup>
import MediaHeader from '@/components/results/detail/SubComponents/MediaHeader.vue';
import MetaDataPanel from '@/components/results/detail/SubComponents/MetaDataPanel.vue';

import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()

import { useDetail, detailProps } from '@/components/results/detail/useDetail';
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
                <MetaDataPanel
                  :file="file"
                  :expanded="true"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>
