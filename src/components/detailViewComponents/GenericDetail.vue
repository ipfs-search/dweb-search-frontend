<script setup>
import DetailHeader from "@/components/detailViewComponents/subcomponents/DetailHeader.vue";
import MetaDataPanel from "@/components/detailViewComponents/subcomponents/MetaDataPanel.vue";

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();

import { detailProps } from "@/composables/useDetail";
const props = defineProps({
  ...detailProps,
  expandMeta: {
    type: Boolean,
    default: false,
  },
  narrow: {
    type: Boolean,
    default: false,
  },
  bla: {
    type: Boolean,
    default: true,
  },
});
console.log(props);
</script>

<template>
  <v-sheet :light="!$vuetify.theme.dark" class="h-100" tile>
    <v-row class="fill-height ma-0 pa-0">
      <v-col
        style="position: absolute; top: 0; left: 0; bottom: 0; right: 0"
        class="inline-block h-100 overflow-y-auto"
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
              <slot />
              <MetaDataPanel :file="file" :expanded="expandMeta || bla" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-sheet>
</template>
