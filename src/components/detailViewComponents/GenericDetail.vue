<script setup>
import DetailHeader from '@/components/detailViewComponents/SubComponents/DetailHeader.vue';
import MetaDataPanel from '@/components/detailViewComponents/SubComponents/MetaDataPanel.vue';

import { useDisplay } from 'vuetify'
const { mdAndUp } = useDisplay()

import { detailProps } from '@/composables/useDetail';
const props = defineProps({
  ...detailProps,
  expandMeta: {
    type: Boolean,
    default: false,
  },
  narrow: {
    type: Boolean,
    default: false,
  }
})
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
      <div style="position: absolute;top: 0;left: 0;bottom: 0;right: 0;">
        <div
          class="inline-block"
          style="height: 100% !important; overflow-y: auto !important;"
        >
          <v-container>
            <v-row>
              <v-col
                cols="12"
                :md="narrow ? 8 : undefined"
                :offset-md="narrow ? 2 : undefined"
                xl="8"
                offset-xl="2"
                :class="mdAndUp ? 'mb-16' : ''"
              >
                <DetailHeader :file="file" />
                <slot/>
                <MetaDataPanel
                  :file="file"
                  :expanded="expandMeta"
                />
              </v-col>
            </v-row>
          </v-container>
        </div>
      </div>
    </v-row>
  </v-sheet>
</template>
