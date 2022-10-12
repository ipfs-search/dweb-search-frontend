<script setup>
import DetailHeader from "@/components/detailViewComponents/subcomponents/DetailHeader.vue";
import MetaDataPanel from "@/components/detailViewComponents/subcomponents/MetaDataPanel.vue";

import { useDisplay } from "vuetify";
const { mdAndUp } = useDisplay();

defineProps({
  file: {
    type: Object,
    required: true,
  },
  narrow: {
    type: Boolean,
    default: false,
  },
  metaExpand: {
    type: Boolean,
    default: true,
  },
  active: {
    type: Boolean,
    required: false,
  },
});
</script>

<template>
  <v-sheet :light="!$vuetify.theme.dark" class="overflow-y-auto h-100" tile>
    <v-row class="fill-height ma-0 pa-0">
      <v-col class="inline-block h-100 overflow-y-auto">
        <v-container>
          <v-row>
            <v-col
              cols="12"
              :md="narrow ? 10 : undefined"
              :offset-md="narrow ? 1 : undefined"
              xl="8"
              offset-xl="2"
              :class="mdAndUp ? 'mb-16' : ''"
            >
              <DetailHeader :file="file" />
              <slot :active="active" />
              <MetaDataPanel :file="file" :expanded="metaExpand" />
            </v-col>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-sheet>
</template>
