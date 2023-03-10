<script setup>
import { useRoute } from "vue-router";
import Hyperlink from "@/components/shared/HyperLink.vue";
import getResourceURL from "@/helpers/resourceURL";
const route = useRoute();

defineProps({
  fileType: {
    type: String,
    required: true,
  },
  index: {
    type: Number,
    required: true,
  },
  hit: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <v-hover v-slot="{ isHovering, props }">
    <a 
      v-if="route.query.noDetailPage!==undefined && noDetailPage !== 'false'"
      :href="getResourceURL(hit.hash)"
      >
      <v-card v-if="hit" width="100%" v-bind="props" :elevation="isHovering ? 12 : 2">
        <slot />
      </v-card>
    </a> 
    <hyperlink
      v-else
      :to="{
        ...route,
        name: 'Detail',
        params: {
          fileType,
          fileHash: hit.hash,
          selectedIndex: Number(index),
        },
      }"
    >
      <v-card v-if="hit" width="100%" v-bind="props" :elevation="isHovering ? 12 : 2">
        <slot />
      </v-card>
    </hyperlink>
  </v-hover>
</template>
